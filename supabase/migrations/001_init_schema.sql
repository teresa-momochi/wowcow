-- ============================================================
-- WOWCOW Schema v3 — 正式定案版
-- 對應開發要件定義 V1.0 + Schema討論全部定案內容
-- 共 9 張資料表
-- ============================================================
-- 使用方式：
-- 1. 打開 Supabase 專案 → 左側選單 SQL Editor
-- 2. 貼上這整份檔案的內容
-- 3. 點擊 Run 執行
-- ============================================================

-- 啟用 UUID 產生功能（Supabase 預設通常已啟用，此行確保萬一沒有也會自動補上）
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUM 型別定義
-- ============================================================

create type creation_mode_enum as enum ('ai_auto', 'manual');
create type sentence_mode_enum as enum ('ai', 'custom', 'skip');
create type image_status_enum as enum ('draft', 'processing', 'completed');
create type sentence_source_enum as enum ('ai_leveled', 'custom_single', 'none');
create type sentence_level_enum as enum ('beginner', 'intermediate', 'advanced');
create type audio_segment_type_enum as enum ('word', 'beginner', 'intermediate', 'advanced', 'custom');
create type audio_status_enum as enum ('generating', 'ready', 'failed');

-- ============================================================
-- 1. users
-- 對應 Supabase Auth 的 auth.users，id 直接共用，
-- 這裡存放 WOWCOW 業務上需要的額外欄位（display_name 等）。
-- ============================================================

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  google_id text unique,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.users is 'WOWCOW使用者資料，id對應auth.users.id（Google OAuth登入）';

-- ============================================================
-- 2. interactive_images
-- ============================================================

create table public.interactive_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  image_url text not null,
  creation_mode creation_mode_enum not null,
  sentence_mode sentence_mode_enum not null,
  status image_status_enum not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.interactive_images is '互動圖片（教材製作系統的來源實體）';
comment on column public.interactive_images.sentence_mode is '例句方式：套用於本張圖片所有單字，對應設計稿「例句設定」';

create index idx_interactive_images_user_id on public.interactive_images(user_id);

-- ============================================================
-- 3. word_cards
-- 注意：不含 interactive_image_id 欄位（v2已確認移除，維持獨立性，
-- 與InteractiveImage的關聯唯一透過Hotspot表達）
-- ============================================================

create table public.word_cards (
  id uuid primary key default gen_random_uuid(),
  chinese_name text not null,
  english_word text not null,
  phonetic text,
  sentence_beginner text,
  sentence_intermediate text,
  sentence_advanced text,
  custom_sentence text,
  sentence_source sentence_source_enum not null,
  language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.word_cards is 'WordCard是獨立的學習內容單位，可在InteractiveImage與My WordCards兩個系統之間流動，不直接綁定來源圖片';
comment on column public.word_cards.sentence_source is 'ai_leveled=模式一二三級例句 / custom_single=模式三單句 / none=模式四無例句';

-- ============================================================
-- 4. hotspots
-- ============================================================

create table public.hotspots (
  id uuid primary key default gen_random_uuid(),
  interactive_image_id uuid not null references public.interactive_images(id) on delete cascade,
  word_card_id uuid not null unique references public.word_cards(id) on delete restrict,
  coord_x numeric not null,
  coord_y numeric not null,
  coord_width numeric not null,
  coord_height numeric not null,
  order_index int not null,
  created_at timestamptz not null default now()
);

comment on table public.hotspots is 'InteractiveImage上的互動熱點，與WordCard 1對1對應。座標為相對百分比(0~1)，非絕對px';

create index idx_hotspots_interactive_image_id on public.hotspots(interactive_image_id);
create index idx_hotspots_word_card_id on public.hotspots(word_card_id);

-- 業務規則：一張InteractiveImage最多10個Hotspot
-- 這是DB層的最後防線（trigger），主要檢查仍在應用層先做
create or replace function public.check_hotspot_limit()
returns trigger as $$
begin
  if (select count(*) from public.hotspots where interactive_image_id = new.interactive_image_id) >= 10 then
    raise exception '一張互動圖片最多只能建立10個學習物件';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_check_hotspot_limit
  before insert on public.hotspots
  for each row execute function public.check_hotspot_limit();

-- ============================================================
-- 5. word_card_audio
-- ============================================================

create table public.word_card_audio (
  id uuid primary key default gen_random_uuid(),
  word_card_id uuid not null references public.word_cards(id) on delete cascade,
  segment_type audio_segment_type_enum not null,
  audio_url text,
  status audio_status_enum not null default 'generating',
  generation_started_at timestamptz,
  text_snapshot text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (word_card_id, segment_type)
);

comment on table public.word_card_audio is 'Lazy TTS音訊資源，每段獨立管理生命週期。segment_type對應：word→english_word, beginner/intermediate/advanced→對應三級例句, custom→custom_sentence';

create index idx_word_card_audio_word_card_id on public.word_card_audio(word_card_id);

-- ============================================================
-- 6. saved_word_cards
-- ============================================================

create table public.saved_word_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  word_card_id uuid not null references public.word_cards(id) on delete restrict,
  selected_sentence_level sentence_level_enum,
  created_at timestamptz not null default now(),
  unique (user_id, word_card_id)
);

comment on table public.saved_word_cards is 'User與WordCard的收藏關聯（My WordCards個人學習系統的入口），不複製WordCard內容。selected_sentence_level僅sentence_source=ai_leveled時有值';

create index idx_saved_word_cards_user_id on public.saved_word_cards(user_id);
create index idx_saved_word_cards_word_card_id on public.saved_word_cards(word_card_id);

-- ============================================================
-- 7. word_groups
-- ============================================================

create table public.word_groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.word_groups is '使用者建立的單字群分類';

create index idx_word_groups_user_id on public.word_groups(user_id);

-- ============================================================
-- 8. word_group_word_cards
-- 注意：連的是 saved_word_card_id，不是 word_card_id
-- 因為必須先加入我的單字卡，才能加入單字群
-- ============================================================

create table public.word_group_word_cards (
  id uuid primary key default gen_random_uuid(),
  word_group_id uuid not null references public.word_groups(id) on delete cascade,
  saved_word_card_id uuid not null references public.saved_word_cards(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (word_group_id, saved_word_card_id)
);

comment on table public.word_group_word_cards is 'WordGroup與SavedWordCard的多對多關聯，結構性強制「必須先收藏才能分類」';

create index idx_wgwc_word_group_id on public.word_group_word_cards(word_group_id);
create index idx_wgwc_saved_word_card_id on public.word_group_word_cards(saved_word_card_id);

-- ============================================================
-- 9. user_color_preferences
-- ============================================================

create table public.user_color_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  color_scheme text not null default 'fresh_blue',
  updated_at timestamptz not null default now()
);

comment on table public.user_color_preferences is 'A4字卡配色，一位使用者一筆全域設定，可隨時更換，不屬於WordCard學習內容';

-- ============================================================
-- updated_at 自動更新（工程實作的通用輔助，非產品規格）
-- ============================================================

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at before update on public.users
  for each row execute function public.set_updated_at();
create trigger trg_interactive_images_updated_at before update on public.interactive_images
  for each row execute function public.set_updated_at();
create trigger trg_word_cards_updated_at before update on public.word_cards
  for each row execute function public.set_updated_at();
create trigger trg_word_card_audio_updated_at before update on public.word_card_audio
  for each row execute function public.set_updated_at();
create trigger trg_word_groups_updated_at before update on public.word_groups
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security（僅owner可讀寫，MVP不做分享）
-- ============================================================

alter table public.users enable row level security;
alter table public.interactive_images enable row level security;
alter table public.word_cards enable row level security;
alter table public.hotspots enable row level security;
alter table public.word_card_audio enable row level security;
alter table public.saved_word_cards enable row level security;
alter table public.word_groups enable row level security;
alter table public.word_group_word_cards enable row level security;
alter table public.user_color_preferences enable row level security;

-- users：只能看/改自己
create policy "users_select_own" on public.users
  for select using (auth.uid() = id);
create policy "users_update_own" on public.users
  for update using (auth.uid() = id);
create policy "users_insert_own" on public.users
  for insert with check (auth.uid() = id);

-- interactive_images：僅owner
create policy "interactive_images_all_own" on public.interactive_images
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- hotspots：透過interactive_images反查owner
create policy "hotspots_all_via_image_owner" on public.hotspots
  for all using (
    exists (
      select 1 from public.interactive_images ii
      where ii.id = hotspots.interactive_image_id and ii.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.interactive_images ii
      where ii.id = hotspots.interactive_image_id and ii.user_id = auth.uid()
    )
  );

-- word_cards：透過hotspot(來源圖片owner) 或 saved_word_cards(收藏owner) 任一成立即可存取
create policy "word_cards_all_via_owner" on public.word_cards
  for all using (
    exists (
      select 1 from public.hotspots h
      join public.interactive_images ii on ii.id = h.interactive_image_id
      where h.word_card_id = word_cards.id and ii.user_id = auth.uid()
    )
    or exists (
      select 1 from public.saved_word_cards swc
      where swc.word_card_id = word_cards.id and swc.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.hotspots h
      join public.interactive_images ii on ii.id = h.interactive_image_id
      where h.word_card_id = word_cards.id and ii.user_id = auth.uid()
    )
    or exists (
      select 1 from public.saved_word_cards swc
      where swc.word_card_id = word_cards.id and swc.user_id = auth.uid()
    )
  );

-- word_card_audio：透過word_cards的owner邏輯
create policy "word_card_audio_all_via_word_card_owner" on public.word_card_audio
  for all using (
    exists (
      select 1 from public.word_cards wc
      where wc.id = word_card_audio.word_card_id
      and (
        exists (
          select 1 from public.hotspots h
          join public.interactive_images ii on ii.id = h.interactive_image_id
          where h.word_card_id = wc.id and ii.user_id = auth.uid()
        )
        or exists (
          select 1 from public.saved_word_cards swc
          where swc.word_card_id = wc.id and swc.user_id = auth.uid()
        )
      )
    )
  );

-- saved_word_cards：僅本人
create policy "saved_word_cards_all_own" on public.saved_word_cards
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- word_groups：僅本人
create policy "word_groups_all_own" on public.word_groups
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- word_group_word_cards：透過word_groups的owner
create policy "wgwc_all_via_group_owner" on public.word_group_word_cards
  for all using (
    exists (
      select 1 from public.word_groups wg
      where wg.id = word_group_word_cards.word_group_id and wg.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.word_groups wg
      where wg.id = word_group_word_cards.word_group_id and wg.user_id = auth.uid()
    )
  );

-- user_color_preferences：僅本人
create policy "user_color_preferences_all_own" on public.user_color_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- 完成
-- ============================================================

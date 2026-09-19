# WOWCOW

互動圖片學習系統 — Turn Pictures into Knowledge

## 專案結構

```
wowcow/
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql   ← Schema v3 建表腳本（9張表）
├── src/
│   ├── lib/
│   │   └── supabaseClient.js     ← Supabase連線設定
│   ├── pages/                    ← 之後各Task的頁面會放這裡
│   ├── components/                ← 之後共用元件會放這裡
│   ├── App.jsx                   ← 目前為Task 01連線驗證畫面
│   ├── main.jsx
│   └── index.css
├── .env.example                  ← 環境變數範本
├── package.json
└── vite.config.js
```

## 開發階段記錄

- Task 01：資料庫Schema v3（9張表）+ 專案骨架 ✅
- Task 02：首頁（對應設計稿 01歡迎頁.png）✅
  - ⚠️ 待補正式資產：WOWCOW Logo原始檔、右側情境照片、精確色票
  - 目前這兩處使用明顯標示的佔位內容，不是最終樣式
- 補充：Netlify部署設定（netlify.toml）✅
- 補充：正式Logo資產（public/assets/logo-icon.png、logo-full.png）✅
  - 來源：Amy提供的品牌規範圖，經去背裁切處理，非原始向量檔
  - TopNav已改用真實牛頭圖示
- 補充：首頁咖啡廳情境照片（public/assets/hero-cafe.jpg）✅
  - 六個hotspot標籤（cat/flower/coffee/book/cake/phone）位置已依實際照片物件座標校正

## 資料庫Schema

詳見 `supabase/migrations/001_init_schema.sql`，對應開發要件定義 V1.0 與後續Schema討論定案內容：

- User / InteractiveImage / Hotspot / WordCard / WordCardAudio / SavedWordCard / WordGroup / WordGroup_WordCard / UserColorPreference
- WordCard雙系統生命週期（教材系統 InteractiveImage ↔ 個人學習系統 My WordCards）
- Lazy TTS音訊策略（WordCardAudio獨立管理每段音訊）
- RLS權限：MVP僅owner可讀寫，不含分享功能

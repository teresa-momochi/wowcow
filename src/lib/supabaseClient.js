import { createClient } from '@supabase/supabase-js'

// 這兩個值來自 .env 檔案（.env.example 有說明如何設定）
// 不需要手動填寫在這裡，Vite會自動從 .env 讀取
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[WOWCOW] Supabase環境變數尚未設定，請確認專案根目錄有 .env 檔案，並填入 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

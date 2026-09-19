import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { supabase } from './lib/supabaseClient'
import './index.css'

// 開發階段的Supabase連線檢查，只印在瀏覽器Console，不影響畫面。
// 之後真正串接登入/資料功能時，各頁面會有自己的錯誤處理，這裡僅作最初步的健檢。
supabase
  .from('users')
  .select('id')
  .limit(1)
  .then(({ error }) => {
    if (error && error.message?.includes('Failed to fetch')) {
      console.warn('[WOWCOW] Supabase連線失敗，請確認.env設定是否正確')
    } else {
      console.info('[WOWCOW] Supabase連線正常')
    }
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

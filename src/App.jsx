import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

// 這是Task 01的骨架驗證頁，用來確認Supabase連線是否成功。
// 之後的Task 02（首頁）會取代這個畫面。
function App() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    async function checkConnection() {
      const { error } = await supabase.from('users').select('id').limit(1)
      // RLS政策下，未登入時查詢會被拒絕屬於正常現象（代表連線+RLS都有作用）
      // 只有網路/設定錯誤（例如URL打錯）才會是真正的連線失敗
      if (error && error.message?.includes('Failed to fetch')) {
        setStatus('failed')
      } else {
        setStatus('connected')
      }
    }
    checkConnection()
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
      <h1>WOWCOW</h1>
      <p>Turn Pictures into Knowledge</p>
      <p>
        Supabase 連線狀態：
        {status === 'checking' && '檢查中...'}
        {status === 'connected' && '✅ 已連線'}
        {status === 'failed' && '❌ 連線失敗，請確認 .env 設定'}
      </p>
    </div>
  )
}

export default App

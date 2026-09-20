import { useState } from 'react'
import { Outlet } from 'react-router-dom'

/**
 * AI 生圖小幫手（Task 04）共用資料容器。
 * 四個子頁面（1/4～4/4）透過 useOutletContext() 讀寫同一份資料，
 * 讓「上一步」「編輯」回到 1/4 時，剛剛填過的內容不會消失。
 * 這裡不掛 WOWCOW 現有的 TopNav——五張正式設計稿本身都沒有出現主站頂部列，
 * 依「不自行增加 UI」原則，這四頁維持設計稿本身呈現、不外加共用導覽列。
 */
export default function AiHelperFlow() {
  const [data, setData] = useState({
    objects: Array(10).fill(''),
    styleId: 'realistic',
    scene: '',
    prompt: '',
  })

  return (
    <div className="ai-helper-flow">
      <Outlet context={{ data, setData }} />
    </div>
  )
}

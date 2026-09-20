import { useNavigate } from 'react-router-dom'
import TopNav from './TopNav'
import StepIndicator from './StepIndicator'
import './FlowTopBar.css'

/**
 * Task 03 三個畫面（選擇圖片 / 選擇製作方式 / AI產生中）共用的頂部區塊：
 * 沿用既有 TopNav（不修改其檔案），下方加上「返回」與三步驟指示器。
 * @param {number} step - 目前步驟 1|2|3
 * @param {string} backTo - 返回按鈕要導向的路徑；預設瀏覽器上一頁
 */
export default function FlowTopBar({ step, backTo }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backTo) navigate(backTo)
    else navigate(-1)
  }

  return (
    <div className="flow-topbar">
      <TopNav />
      <div className="flow-topbar__row">
        <button type="button" className="flow-topbar__back" onClick={handleBack}>
          <span aria-hidden="true">←</span> 返回
        </button>
        <StepIndicator current={step} />
        <span className="flow-topbar__spacer" aria-hidden="true" />
      </div>
    </div>
  )
}

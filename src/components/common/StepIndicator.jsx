import './StepIndicator.css'

/**
 * 三步驟指示器（放入圖片 / 選擇製作方式 / 建立學習內容）
 * Task 03 三個畫面（選擇圖片、選擇製作方式、AI產生中）共用同一份文字與樣式。
 * @param {number} current - 目前所在步驟（1、2 或 3）
 */
const STEPS = ['放入圖片', '選擇製作方式', '建立學習內容']

export default function StepIndicator({ current }) {
  return (
    <ol className="step-indicator">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1
        const isActive = stepNum === current
        return (
          <li key={label} className="step-indicator__item">
            {idx > 0 && <span className="step-indicator__dash" aria-hidden="true" />}
            <span className={`step-indicator__bubble${isActive ? ' step-indicator__bubble--active' : ''}`}>
              {stepNum}
            </span>
            <span className={`step-indicator__label${isActive ? ' step-indicator__label--active' : ''}`}>
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

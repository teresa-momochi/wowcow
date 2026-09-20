import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlowTopBar from '../components/common/FlowTopBar'
import './SelectMode.css'

// TODO(Auth Task)：正式規則是按下「AI 幫我完成」時檢查登入狀態，
// 未登入需先跳轉 Google OAuth，登入完成後才繼續。
// Google OAuth 尚未串接，此處先保留接點、預設視為「已登入」，
// 不自行製作假登入頁，待 Auth Task 再替換為真正的登入檢查。
function isLoggedIn() {
  return true
}

export default function SelectMode() {
  const navigate = useNavigate()
  const location = useLocation()
  const { imageUrl, imageName } = location.state || {}

  useEffect(() => {
    if (!imageUrl) navigate('/upload', { replace: true })
  }, [imageUrl, navigate])

  if (!imageUrl) return null

  const handleAiAuto = () => {
    if (!isLoggedIn()) {
      // TODO(Auth Task)：導向 Google OAuth 登入流程
      return
    }
    navigate('/generating', { state: { imageUrl, imageName } })
  }

  const handleManualSelect = () => {
    // TODO(Task 06)：手動選取物件正式畫面尚未建立，先保留流程接點。
  }

  return (
    <div className="mode-page">
      <img className="mode-page__bg" src={imageUrl} alt="" aria-hidden="true" />
      <div className="mode-page__wash" />

      <FlowTopBar step={2} backTo="/upload" />

      <main className="mode-content">
        <section className="mode-left">
          <p className="mode-left__ready">✓ 你的圖片已準備好！</p>
          <div className="mode-left__frame">
            <img src={imageUrl} alt={imageName || '已選擇的圖片'} />
          </div>
          <div className="mode-tip">
            <span className="mode-tip__icon" aria-hidden="true">💡</span>
            <div>
              <p className="mode-tip__title">小提示</p>
              <p className="mode-tip__text">
                這張圖片包含了很多可以學習的物件！
                <br />
                你可以選擇 AI 自動產生，或手動選取你想學的內容。
              </p>
            </div>
          </div>
        </section>

        <section className="mode-right">
          <h1 className="mode-right__title">
            這張圖片，你想<span className="mode-right__title--pink">怎麼製作？</span>
          </h1>
          <p className="mode-right__subtitle">選擇最適合你的方式，讓 WOWCOW 幫你把圖片變成互動的學習內容！</p>

          <div className="mode-cards">
            <div className="mode-card mode-card--pink">
              <span className="mode-card__icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <rect x="6" y="24" width="26" height="8" rx="4" transform="rotate(-45 6 24)" fill="#ef4470" />
                  <circle cx="34" cy="10" r="2.5" fill="#ffd166" />
                  <circle cx="39" cy="16" r="1.6" fill="#ffd166" />
                  <circle cx="30" cy="5" r="1.6" fill="#ffd166" />
                </svg>
              </span>
              <h2>AI 自動產生互動圖片</h2>
              <p>
                交給 WOWCOW 幫你找出圖片中的有用物件，
                自動建立單字、例句與語音，快速完成！
              </p>
              <button type="button" className="mode-card__btn mode-card__btn--pink" onClick={handleAiAuto}>
                AI 幫我完成 →
              </button>
            </div>

            <div className="mode-card mode-card--blue">
              <span className="mode-card__icon" aria-hidden="true">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path d="M18 6v18M18 6l-6 6M18 6l6 6" stroke="#5b8def" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8" y="26" width="20" height="12" rx="3" fill="#5b8def" opacity="0.15" />
                </svg>
              </span>
              <h2>手動選取物件</h2>
              <p>
                自己決定圖片裡要學什麼，點選想學的物件，
                再決定要建立哪些內容，完全依照你的需求！
              </p>
              <button type="button" className="mode-card__btn mode-card__btn--blue" onClick={handleManualSelect}>
                自己選取 →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

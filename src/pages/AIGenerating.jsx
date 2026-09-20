import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FlowTopBar from '../components/common/FlowTopBar'
import './AIGenerating.css'

// Task 03 範圍：僅前端模擬進度動畫，不呼叫任何真正的 AI API。
// 真正的圖片分析／單字建立／發音例句／互動內容整理留待正式 AI 流程 Task 處理。
const STEPS = [
  { label: '找出圖片中的物件', desc: '辨識圖片中的重要元素', threshold: 25 },
  { label: '建立學習單字', desc: '產生適合的英文單字', threshold: 55 },
  { label: '產生發音與例句', desc: '為每個單字建立發音與例句', threshold: 85 },
  { label: '整理互動內容', desc: '完成你的學習圖片', threshold: 100 },
]

export default function AIGenerating() {
  const navigate = useNavigate()
  const location = useLocation()
  const { imageUrl, imageName } = location.state || {}
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!imageUrl) {
      navigate('/upload', { replace: true })
      return
    }
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(100, p + 2)
      })
    }, 90)
    return () => clearInterval(timer)
  }, [imageUrl, navigate])

  if (!imageUrl) return null

  const stepStatus = (threshold, idx) => {
    const prevThreshold = idx === 0 ? 0 : STEPS[idx - 1].threshold
    if (progress >= threshold) return 'done'
    if (progress >= prevThreshold) return 'active'
    return 'pending'
  }

  return (
    <div className="gen-page">
      <img className="gen-page__bg" src={imageUrl} alt="" aria-hidden="true" />
      <div className="gen-page__wash" />

      <FlowTopBar step={3} backTo="/select-mode" />

      <main className="gen-content">
        <section className="gen-left">
          <div className="gen-left__frame">
            <img src={imageUrl} alt={imageName || '已選擇的圖片'} />
          </div>
          <div className="gen-left__file">
            <span>🖼️ {imageName || '我的圖片.jpg'}</span>
            <button type="button" onClick={() => navigate('/upload')}>
              🔄 重新選擇圖片
            </button>
          </div>
        </section>

        <section className="gen-right">
          <div className="gen-right__headline">
            <div>
              <p className="gen-right__eyebrow">WOWCOW 正在為你製作</p>
              <h1>
                專屬的<span className="gen-right__title--pink">學習圖片</span>
              </h1>
              <p className="gen-right__subtitle">請稍候，精彩的內容馬上就好！</p>
            </div>
            <div className="gen-mascot">
              <img src="/assets/mascot-cow.png" alt="WOWCOW 魔法牛" />
              <p className="gen-mascot__note">
                讓每一張圖片
                <br />
                都變成學習的魔法！
              </p>
            </div>
          </div>

          <div className="gen-progress">
            <div className="gen-progress__track">
              <div className="gen-progress__fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="gen-progress__pct">{progress}%</span>
          </div>

          <ul className="gen-steps">
            {STEPS.map((step, idx) => {
              const status = stepStatus(step.threshold, idx)
              return (
                <li key={step.label} className={`gen-step gen-step--${status}`}>
                  <span className="gen-step__icon" aria-hidden="true">
                    {status === 'done' && '✔'}
                    {status === 'active' && <span className="gen-step__spinner" />}
                    {status === 'pending' && ''}
                  </span>
                  <span>
                    <p className="gen-step__label">{step.label}</p>
                    <p className="gen-step__desc">{step.desc}</p>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="gen-tip">
            <span aria-hidden="true">💡</span>
            <div>
              <p className="gen-tip__title">小提醒</p>
              <p className="gen-tip__text">這不會花很久，WOWCOW 正在用魔法讓你完成！</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

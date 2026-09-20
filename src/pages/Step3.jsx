import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './AiHelperCommon.css'
import './Step3.css'

const STEPS = [
  {
    img: '/assets/aihelper-p3-phone1.png',
    title: '打開你正在使用的 AI',
    desc: '例如 Gemini、ChatGPT、Midjourney 或其他 AI 生圖工具。',
  },
  {
    img: '/assets/aihelper-p3-phone2.png',
    title: '貼上剛剛複製的提示詞',
    desc: '長按貼上，或使用 Ctrl + V，然後按「送出」。',
  },
  {
    img: '/assets/aihelper-p3-phone3.png',
    title: '等待 AI 產生圖片',
    desc: '送出後，AI 會依照提示詞生成包含你想學物件的圖片！',
  },
]

export default function Step3() {
  const { data } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data.prompt) navigate('/ai-helper/step1', { replace: true })
  }, [data.prompt, navigate])

  if (!data.prompt) return null

  return (
    <div className="ah-page step3-page">
      <div className="ah-header">
        <div className="ah-header__left">
          <span className="ah-badge">3/4</span>
          <div className="ah-heading">
            <h1>貼到你正在使用的 AI，產生圖片</h1>
            <p>將剛剛複製的提示詞，貼到你常用的 AI 生圖工具中，送出後就會產生包含所有物件的學習圖片！</p>
          </div>
        </div>
        <div className="ah-note">你可以使用你習慣的 AI 工具，把想學的物件變成一張好看的圖片！ 🙂</div>
      </div>

      <div className="step3-row">
        {STEPS.map((s, idx) => (
          <div className="step3-item" key={s.title}>
            <div className="step3-phonewrap">
              <img src={s.img} alt={s.title} />
            </div>
            {idx < STEPS.length - 1 && <span className="step3-arrow" aria-hidden="true">➜</span>}
          </div>
        ))}
      </div>

      <div className="step3-captions">
        {STEPS.map((s, idx) => (
          <div className="step3-caption" key={s.title}>
            <span className="step3-caption__num">{idx + 1}</span>
            <div>
              <p className="step3-caption__title">{s.title}</p>
              <p className="step3-caption__desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="step3-tip">
        <p className="step3-tip__title">💡 小提醒：</p>
        <ul>
          <li>✔ 不一定要使用 Gemini！你可以使用自己熟悉的 AI 生圖工具。</li>
          <li>✔ 除了 Gemini，也可以使用 ChatGPT、Midjourney、DALL·E、Leonardo、Adobe Firefly 等。</li>
          <li>✔ WOWCOW 提供的是「生圖提示詞」，圖片由你選擇的 AI 工具來產生。</li>
          <li>✔ 生成圖片後，請先將圖片儲存到手機，下一步我們會教你如何存到 Google 相簿。</li>
        </ul>
      </div>

      <div className="ah-navrow">
        <button type="button" className="ah-btn-back" onClick={() => navigate('/ai-helper/step2')}>
          ← 上一步
        </button>
        <div className="ah-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={i === 2 ? 'is-active' : ''} />
          ))}
        </div>
        <button type="button" className="ah-btn-primary" onClick={() => navigate('/ai-helper/step4')}>
          下一步 →
        </button>
      </div>
    </div>
  )
}

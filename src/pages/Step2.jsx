import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { STYLE_OPTIONS } from './promptTemplate'
import './AiHelperCommon.css'
import './Step2.css'

const GEMINI_URL = 'https://gemini.google.com/app'

export default function Step2() {
  const { data } = useOutletContext()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!data.prompt) navigate('/ai-helper/step1', { replace: true })
  }, [data.prompt, navigate])

  if (!data.prompt) return null

  const styleInfo = STYLE_OPTIONS.find((s) => s.id === data.styleId) || STYLE_OPTIONS[0]
  const objectCount = data.objects.filter((v) => v.trim()).length

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // 瀏覽器不支援剪貼簿 API 時，靜默失敗即可，不影響其他流程
    }
  }

  return (
    <div className="ah-page step2-page">
      <div className="ah-header">
        <div className="ah-header__left">
          <span className="ah-badge">2/4</span>
          <div className="ah-heading">
            <h1>確認內容，取得 AI 生圖提示詞</h1>
            <p>我們已根據你填寫的單字、圖片風格和場景，為你整理好一段完整的 AI 生圖提示詞。</p>
          </div>
        </div>
        <div className="ah-note">這段提示詞已經幫你包含所有需求，可以直接複製去你常用的 AI 生圖工具了！ 🙂</div>
      </div>

      <div className="step2-scene">
        <img className="step2-plant" src="/assets/aihelper-p2-plant.png" alt="" aria-hidden="true" />
        <img className="step2-books" src="/assets/aihelper-p2-books.png" alt="" aria-hidden="true" />

        <div className="step2-laptop">
          <div className="step2-laptop__cam" aria-hidden="true" />
          <div className="step2-laptop__screen">
            {/* 教學示意用的 5 階段進度條，純視覺呈現，不是可點擊的真實導覽 */}
            <ol className="step2-stagebar" aria-hidden="true">
              {['輸入單字', '取得提示詞', '生成圖片', '儲存圖片', '回到 WOWCOW'].map((label, i) => (
                <li key={label} className={i === 1 ? 'is-current' : ''}>
                  <span className="step2-stagebar__dot">{i + 1}</span>
                  <span className="step2-stagebar__label">{label}</span>
                </li>
              ))}
            </ol>

            <div className="step2-panels">
              <div className="step2-panel step2-panel--left">
                <div className="step2-panel__head">
                  <span aria-hidden="true">📄</span>
                  <h2>你的生圖需求</h2>
                  <button type="button" className="step2-edit" onClick={() => navigate('/ai-helper/step1')}>
                    ✏️ 編輯
                  </button>
                </div>

                <div className="step2-need">
                  <p className="step2-need__label">📖 想學的物件（{objectCount} 個）</p>
                  <ul className="step2-need__list">
                    {data.objects.filter((v) => v.trim()).map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>

                <div className="step2-need">
                  <p className="step2-need__label">🎨 圖片風格</p>
                  <div className="step2-style-chip">
                    <img src={styleInfo.thumb} alt="" />
                    <span>{styleInfo.label}</span>
                  </div>
                </div>

                <div className="step2-need">
                  <p className="step2-need__label">📍 場景</p>
                  <p className="step2-need__scene">{data.scene?.trim() || '（由 AI 自動安排）'}</p>
                </div>
              </div>

              <div className="step2-panel step2-panel--right">
                <div className="step2-panel__head">
                  <span aria-hidden="true">✨</span>
                  <h2>AI 生圖提示詞</h2>
                  <span className="step2-readytag">這就是為你準備的提示詞！</span>
                </div>

                <pre className="step2-promptbox">{data.prompt}</pre>

                <div className="step2-actions">
                  <button type="button" className="step2-copybtn" onClick={handleCopy}>
                    📋 {copied ? '已複製 ✓' : '複製提示詞'}
                  </button>
                  <a
                    className="step2-geminibtn"
                    href={GEMINI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 前往 Gemini 生圖 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="step2-laptop__base" aria-hidden="true" />
      </div>

      <div className="step2-tip">
        <p className="step2-tip__title">💡 小提醒：</p>
        <ul>
          <li>✔ 你可以使用自己習慣的 AI 生圖工具。</li>
          <li>✔ 除了 Gemini，也可以使用 ChatGPT、Midjourney、DALL·E 或其他工具。</li>
          <li>✔ 複製提示詞後，貼上即可開始生成圖片！</li>
        </ul>
        <div className="step2-toollist">
          <span>✨ Gemini</span>
          <span>🟢 ChatGPT</span>
          <span>⛵ Midjourney</span>
          <span>◆ DALL·E</span>
          <span className="step2-toollist__more">或其他 AI 工具...</span>
        </div>
      </div>

      <div className="ah-navrow">
        <button type="button" className="ah-btn-back" onClick={() => navigate('/ai-helper/step1')}>
          ← 上一步
        </button>
        <div className="ah-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={i === 1 ? 'is-active' : ''} />
          ))}
        </div>
        <button type="button" className="ah-btn-primary" onClick={() => navigate('/ai-helper/step3')}>
          下一步 →
        </button>
      </div>
    </div>
  )
}

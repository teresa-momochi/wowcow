import { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { STYLE_OPTIONS, SUGGESTED_SCENES, buildPrompt } from './promptTemplate'
import './AiHelperCommon.css'
import './Step1.css'

const PLACEHOLDERS = ['筆電', '化妝品', '台燈', '香水', '鏡子', '植物', '馬克杯', '手機', '鍵盤', '書本']

export default function Step1() {
  const { data, setData } = useOutletContext()
  const navigate = useNavigate()

  const filledCount = useMemo(() => data.objects.filter((v) => v.trim()).length, [data.objects])
  const canSubmit = filledCount >= 1 && !!data.styleId

  const handleObjectChange = (idx, value) => {
    const next = [...data.objects]
    next[idx] = value
    setData({ ...data, objects: next })
  }

  const handleSceneChip = (scene) => {
    setData({ ...data, scene })
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    const objects = data.objects.map((v) => v.trim()).filter(Boolean)
    const prompt = buildPrompt({ objects, styleId: data.styleId, scene: data.scene })
    setData({ ...data, prompt })
    navigate('/ai-helper/step2')
  }

  return (
    <div className="ah-page step1-page">
      <img className="step1-plant" src="/assets/aihelper-p1-plant.png" alt="" aria-hidden="true" />

      <div className="ah-header">
        <div className="ah-header__left">
          <span className="ah-badge">1/4</span>
          <div className="ah-heading">
            <h1>輸入你想學的物件</h1>
            <p>
              在下方填入你想放在圖片中的物件，我們會為你生成一段完整的 AI 生圖提示詞，
              你可以複製提示詞，貼到 Gemini 或其他 AI 工具，產生好看的學習圖片。
            </p>
          </div>
        </div>
        <div className="ah-note">用你想學的單字，創造一張獨一無二的學習圖片！ 🙂</div>
      </div>

      <section className="step1-card step1-card--blue">
        <div className="step1-card__head">
          <span className="step1-card__num">1</span>
          <h2>輸入你想學的物件 <span className="step1-tag step1-tag--required">必填</span></h2>
          <p className="step1-card__sub">請輸入 1～10 個物件，每個物件一個名稱。</p>
          <span className="step1-count">
            已輸入 <b>{filledCount}</b> / 10 個
          </span>
        </div>
        <div className="step1-grid">
          {data.objects.map((val, idx) => (
            <label key={idx} className="step1-field">
              <span className="step1-field__num">{idx + 1}</span>
              <input
                type="text"
                value={val}
                maxLength={20}
                placeholder={`例如：${PLACEHOLDERS[idx]}`}
                onChange={(e) => handleObjectChange(idx, e.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="step1-card step1-card--purple">
        <div className="step1-card__head">
          <span className="step1-card__num step1-card__num--purple">2</span>
          <h2>選擇圖片風格 <span className="step1-tag step1-tag--required">必填</span></h2>
          <p className="step1-card__sub">選擇一種你喜歡的圖片風格。</p>
        </div>
        <div className="step1-styles">
          {STYLE_OPTIONS.map((s) => (
            <button
              type="button"
              key={s.id}
              className={`step1-style${data.styleId === s.id ? ' step1-style--active' : ''}`}
              onClick={() => setData({ ...data, styleId: s.id })}
            >
              <span className="step1-style__imgwrap">
                <img src={s.thumb} alt={s.label} />
                {data.styleId === s.id && <span className="step1-style__check">✓</span>}
              </span>
              <span className="step1-style__label">{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="step1-card step1-card--green">
        <div className="step1-card__head">
          <span className="step1-card__num step1-card__num--green">3</span>
          <h2>設定場景 (選填) <span className="step1-tag step1-tag--optional">選填</span></h2>
          <p className="step1-card__sub">告訴我們你想要的圖片場景，或直接選擇建議場景。若不填寫，AI 會自動安排合適的場景。</p>
        </div>
        <div className="step1-scene-row">
          <input
            type="text"
            className="step1-scene-input"
            value={data.scene}
            placeholder="例如：書桌、臥室、客廳、廚房、咖啡廳、火車站、超市 ..."
            onChange={(e) => setData({ ...data, scene: e.target.value })}
          />
          <div className="step1-scene-chips">
            <span className="step1-scene-arrow">→ 建議場景：</span>
            <div className="step1-scene-chips__grid">
              {SUGGESTED_SCENES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`step1-chip${data.scene === s ? ' step1-chip--active' : ''}`}
                  onClick={() => handleSceneChip(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="step1-bottom">
        <div className="step1-tip">
          <span aria-hidden="true">💡</span>
          <div>
            <p className="step1-tip__title">小提醒：</p>
            <ul>
              <li>建議輸入 5～10 個物件，圖片會更豐富，學習效果更好！</li>
              <li>物件名稱越具體，生成的圖片越準確。</li>
            </ul>
          </div>
        </div>

        <div className="step1-cta">
          <button type="button" className="ah-btn-primary step1-generate" disabled={!canSubmit} onClick={handleSubmit}>
            ✨ 生成提示詞 →
          </button>
          <p className="step1-cta__hint">填好後，點擊按鈕，我們會為你自動產生完整的 AI 生圖提示詞！</p>
        </div>

        <img className="step1-tagimg" src="/assets/aihelper-p1-tag.png" alt="讓學習，從一張圖片開始！" />
      </div>
    </div>
  )
}

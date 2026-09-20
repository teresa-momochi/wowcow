import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import '../../pages/ai-helper/AiHelperCommon.css'
import './Step4.css'

export default function Step4() {
  const { data } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data.prompt) navigate('/ai-helper/step1', { replace: true })
  }, [data.prompt, navigate])

  if (!data.prompt) return null

  return (
    <div className="ah-page step4-page">
      <div className="ah-header">
        <div className="ah-header__left">
          <span className="ah-badge ah-badge--blue">4/4</span>
          <div className="ah-heading">
            <h1>把 AI 生成的圖片存下來</h1>
            <p>先把 Gemini 生成的圖片儲存到你的裝置。儲存後，回到 WOWCOW 選取這張圖片，就可以開始製作互動教材。</p>
          </div>
        </div>
        <div className="ah-note">儲存完成後，回到 WOWCOW 選取圖片，開始製作你的學習教材！ 🙂</div>
      </div>

      <div className="step4-columns">
        <section className="step4-col step4-col--pink">
          <div className="step4-col__head">
            <span className="step4-col__icon">📱</span>
            <div>
              <h2>手機版 (iPhone / Android)</h2>
              <p>長按圖片，儲存到手機相簿（Google 相簿）。</p>
            </div>
          </div>
          <div className="step4-steps">
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--pink">1</span>
              <p>在 Gemini<br />生成圖片</p>
              <img src="/assets/aihelper-p4-phone1.png" alt="在 Gemini 生成圖片" />
            </div>
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--pink">2</span>
              <p>長按圖片<br />會出現選單點「儲存」</p>
              <img src="/assets/aihelper-p4-phone2.png" alt="長按圖片點儲存" />
            </div>
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--pink">3</span>
              <p>儲存完成<br />回到 WOWCOW 選取圖片</p>
              <img className="step4-smallicon" src="/assets/aihelper-p4-googlephotos.png" alt="已儲存到 Google 相簿" />
              <p className="step4-savedtext">已儲存到<br />Google 相簿</p>
              <div className="step4-donebox">✅ 現在回到 WOWCOW 選取這張圖片！</div>
            </div>
          </div>
        </section>

        <section className="step4-col step4-col--blue">
          <div className="step4-col__head">
            <span className="step4-col__icon">💻</span>
            <div>
              <h2>電腦版 (Windows / Mac)</h2>
              <p>點右上角「⋮」，下載圖片到電腦。</p>
            </div>
          </div>
          <div className="step4-steps">
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--blue">1</span>
              <p>在 Gemini<br />生成圖片</p>
              <img src="/assets/aihelper-p4-computer1.png" alt="在 Gemini 生成圖片" />
            </div>
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--blue">2</span>
              <p>點圖片右上角「⋮」<br />選擇「下載圖片」</p>
              <img src="/assets/aihelper-p4-computer2.png" alt="點下載圖片" />
            </div>
            <div className="step4-step">
              <span className="step4-step__num step4-step__num--blue">3</span>
              <p>下載完成<br />回到 WOWCOW 選取圖片</p>
              <img className="step4-smallicon" src="/assets/aihelper-p4-folder.png" alt="下載資料夾" />
              <p className="step4-savedtext">下載資料夾</p>
              <div className="step4-donebox step4-donebox--blue">✅ 現在回到 WOWCOW 選取這張圖片！</div>
            </div>
          </div>
        </section>
      </div>

      <div className="step4-tip">
        <span aria-hidden="true">💡</span>
        <div>
          <p className="step4-tip__title">小提醒：</p>
          <p>不用找資料夾，也不用拖曳圖片。只要把圖片存下來，回到 WOWCOW 選取圖片即可！</p>
        </div>
      </div>

      <div className="ah-navrow">
        <button type="button" className="ah-btn-back" onClick={() => navigate('/ai-helper/step3')}>
          ← 上一步
        </button>
        <button type="button" className="ah-btn-primary" onClick={() => navigate('/upload')}>
          回到開始創作 →
        </button>
      </div>
    </div>
  )
}

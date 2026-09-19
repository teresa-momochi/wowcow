import TopNav from '../components/common/TopNav'
import './Home.css'

/**
 * Task 02 — 首頁
 * 對應設計稿：01歡迎頁.png
 *
 * ⚠️ 待補正式資產（見PR說明）：
 * 1. WOWCOW Logo（目前TopNav使用文字佔位）
 * 2. 右側情境照片（目前使用灰底佔位區塊）
 * 3. 精確色碼（目前為估算值，非設計稿原始色票）
 */

const STEPS = [
  { num: 1, title: '放入圖片', desc: '上傳你的圖片或照片', color: 'purple' },
  { num: 2, title: '點選物件', desc: '點一下照片中的東西', color: 'blue' },
  { num: 3, title: '看、聽、學、玩', desc: '單字、發音、例句、錄音', color: 'pink' },
]

const FEATURES = [
  { icon: '🌐', title: '支援多種語言', desc: '英文・日文・其他語言' },
  { icon: '♾️', title: '隨時隨地學習', desc: '照片就是最好的教材' },
  { icon: '❤️', title: '學習更生活化', desc: '從你的世界出發' },
]

export default function Home() {
  return (
    <div className="home">
      <TopNav />

      <main className="home__hero">
        {/* 左側：文案與CTA */}
        <section className="home__left">
          <div className="home__badge">✨ AI × 圖片 × 學習</div>

          <h1 className="home__headline">
            將圖片、照片
            <br />
            轉化成<span className="home__headline--accent">你的知識庫</span>
          </h1>

          <p className="home__subtext">
            點選圖片中的物件，建立單字、發音、例句與語音內容。
            <br />
            讓你用自己的照片，輕鬆學習、長久累積。
          </p>

          <ol className="home__steps">
            {STEPS.map((step, i) => (
              <li key={step.num} className="home__step-item">
                <div className={`home__step-num home__step-num--${step.color}`}>{step.num}</div>
                <div className="home__step-text">
                  <div className="home__step-title">{step.title}</div>
                  <div className="home__step-desc">{step.desc}</div>
                </div>
                {i < STEPS.length - 1 && <span className="home__step-arrow">›</span>}
              </li>
            ))}
          </ol>

          <button type="button" className="home__cta">
            馬上創作
          </button>

          <p className="home__footnote">把生活中的每一張照片，變成你的專屬教材！</p>
        </section>

        {/* 右側：情境照片 */}
        <section className="home__right" aria-label="產品情境示意：咖啡廳窗邊，貓、雛菊、拿鐵、蛋糕、書與手機">
          <img
            src="/assets/hero-cafe.jpg"
            alt="咖啡廳窗邊情境：貓咪趴在桌上，一旁有雛菊花瓶、拿鐵咖啡、起司蛋糕、疊放的書本與手機，窗外是山景與湖景"
            className="home__hero-image"
          />
          {/* 互動標籤範例（僅示意排版，實際互動邏輯於Task 09完成頁實作） */}
          <div className="home__hotspot-tag" style={{ top: '29%', left: '19%' }}>cat</div>
          <div className="home__hotspot-tag" style={{ top: '13%', left: '41%' }}>flower</div>
          <div className="home__hotspot-tag" style={{ top: '53%', right: '5%' }}>book</div>
          <div className="home__hotspot-tag" style={{ top: '71%', left: '8%' }}>cake</div>
          <div className="home__hotspot-tag" style={{ bottom: '11%', right: '19%' }}>phone</div>

          <div className="home__word-card-demo" style={{ top: '46%', left: '37%', bottom: 'auto', right: 'auto' }}>
            <div className="home__word-card-demo-head">
              <span className="home__word-card-demo-icon">☕</span>
              <div>
                <div className="home__word-card-demo-word">coffee</div>
                <div className="home__word-card-demo-phonetic">/ˈkɒf.i/</div>
              </div>
              <span className="home__word-card-demo-speaker">🔊</span>
            </div>
            <div className="home__word-card-demo-cn">我喜歡咖啡。</div>
            <div className="home__word-card-demo-row">
              <span className="home__level-badge home__level-badge--beginner">Beginner</span>
              <span>I like coffee.</span>
            </div>
            <div className="home__word-card-demo-row">
              <span className="home__level-badge home__level-badge--intermediate">Intermediate</span>
              <span>I usually drink coffee in the morning.</span>
            </div>
            <div className="home__word-card-demo-row">
              <span className="home__level-badge home__level-badge--advanced">Advanced</span>
              <span>A good cup of coffee always makes me feel relaxed.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="home__features">
        {FEATURES.map((f) => (
          <div key={f.title} className="home__feature">
            <span className="home__feature-icon">{f.icon}</span>
            <div>
              <div className="home__feature-title">{f.title}</div>
              <div className="home__feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </footer>
    </div>
  )
}

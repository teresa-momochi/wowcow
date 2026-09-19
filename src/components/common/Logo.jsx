/**
 * WOWCOW Logo
 *
 * 圖示來源：Amy提供的品牌規範圖（簡易版：只有牛頭），
 * 經去背裁切處理為透明背景PNG，存放於 public/assets/logo-icon.png。
 *
 * 這裡採「圖示+程式碼文字」組合，而非整張圖一起使用，
 * 原因：文字大小需要依不同頁面情境（頁首/頁尾/行動版）彈性縮放，
 * 若整張圖含文字，縮放會受限且文字銳利度會打折扣。
 *
 * ⚠️ 這是從點陣圖裁切去背而來，非原始向量檔（SVG/AI）。
 * 網頁使用沒有問題，但若未來有印刷或超大尺寸需求，
 * 建議跟設計端索取原始向量檔以取得最佳品質。
 */
export default function Logo({ size = 'md' }) {
  const iconSize = size === 'md' ? 40 : 32
  const fontSize = size === 'md' ? '22px' : '18px'

  return (
    <div className="wowcow-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/assets/logo-icon.png"
        alt="WOWCOW"
        style={{ width: iconSize, height: 'auto', flexShrink: 0 }}
      />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: fontSize, fontWeight: 800, letterSpacing: '0.5px', color: '#1a1a1a' }}>
          WOWCOW
        </div>
        {size === 'md' && (
          <div style={{ fontSize: '11px', color: '#666' }}>Turn Pictures into Knowledge</div>
        )}
      </div>
    </div>
  )
}

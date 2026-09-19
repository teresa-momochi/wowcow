/**
 * WOWCOW Logo — 暫時佔位元件
 *
 * ⚠️ 重要：這不是正式Logo。
 * 依文件0-2條，WOWCOW Logo是LOCKED ASSET，工程端不得自行繪製或生成。
 * 這裡用純文字造型暫代，等產品方提供正式Logo檔案（SVG/PNG透明背景）後，
 * 請將本檔案替換為 <img src="/assets/logo.svg" ... /> 的形式，
 * 並移除下方的 placeholder 樣式。
 */
export default function Logo({ size = 'md' }) {
  const fontSize = size === 'md' ? '22px' : '18px'

  return (
    <div className="wowcow-logo" title="Logo佔位，待替換為正式資產" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: size === 'md' ? 40 : 32,
          height: size === 'md' ? 40 : 32,
          borderRadius: '50%',
          background: '#1a1a1a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        W
      </div>
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

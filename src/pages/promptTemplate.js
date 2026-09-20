// Task 04：AI 生圖提示詞 — 純前端字串樣板套版，不呼叫任何 LLM/AI API。
// 依照使用者輸入的物件／風格／場景，組合成固定格式的生圖提示詞文字。

export const STYLE_OPTIONS = [
  { id: 'realistic', label: '寫實照片', thumb: '/assets/style-realistic.png' },
  { id: 'handdrawn', label: '手繪風格', thumb: '/assets/style-handdrawn.png' },
  { id: 'illustration', label: '插畫風格', thumb: '/assets/style-illustration.png' },
  { id: 'watercolor', label: '水彩風格', thumb: '/assets/style-watercolor.png' },
]

export const SUGGESTED_SCENES = [
  '書桌', '臥室', '客廳', '廚房', '咖啡廳',
  '火車站', '超市', '公園', '海邊', '教室',
]

function styleLabel(styleId) {
  return STYLE_OPTIONS.find((s) => s.id === styleId)?.label || '寫實照片'
}

/**
 * 依固定模板組合 AI 生圖提示詞。
 * @param {{objects: string[], styleId: string, scene: string}} input
 * @returns {string}
 */
export function buildPrompt({ objects, styleId, scene }) {
  const list = objects.filter(Boolean)
  const sceneText = scene?.trim() ? scene.trim() : null
  const sceneLine = sceneText
    ? `請在同一個${sceneText}場景中清楚呈現以下物件：`
    : `請在同一個合適的場景中清楚呈現以下物件：`

  return [
    '請生成一張適合英文學習使用的圖片。',
    `圖片風格：${styleLabel(styleId)}。`,
    `${sceneLine}`,
    `${list.join('、')}。`,
    '請讓每個物件清楚可辨識，避免互相遮擋，方便後續建立獨立的互動區域。',
    '可以加入少量自然的背景元素（例如：植物、杯子、椅子），但不要加入大量容易與學習物件混淆的物品。',
    '圖片中不要出現任何文字、標籤、箭頭、字母或說明。',
    '請確保以上指定的所有物件都出現在圖片中。',
  ].join('\n')
}

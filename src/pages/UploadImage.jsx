import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlowTopBar from '../components/common/FlowTopBar'
import './UploadImage.css'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/heif']

export default function UploadImage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const acceptFile = (file) => {
    if (!file) return
    // 副檔名或型別粗略檢查；HEIC 在部分瀏覽器 type 可能為空字串，仍允許使用者選取。
    const isAccepted =
      ACCEPTED_TYPES.includes(file.type) ||
      /\.(jpg|jpeg|png|heic|heif)$/i.test(file.name)
    if (!isAccepted) return

    if (imageUrl) URL.revokeObjectURL(imageUrl)
    const url = URL.createObjectURL(file)
    setImageFile(file)
    setImageUrl(url)
  }

  const handleInputChange = (e) => {
    acceptFile(e.target.files?.[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    acceptFile(e.dataTransfer.files?.[0])
  }

  const handleNext = () => {
    if (!imageFile || !imageUrl) return
    navigate('/select-mode', {
      state: { imageUrl, imageName: imageFile.name },
    })
  }

  return (
    <div className="upload-page">
      <div className="upload-page__bg" />
      <img className="decor decor--cat" src="/assets/decor-cat.png" alt="" aria-hidden="true" />
      <img className="decor decor--mountain" src="/assets/decor-mountain.png" alt="" aria-hidden="true" />
      <img className="decor decor--daisy" src="/assets/decor-daisy.png" alt="" aria-hidden="true" />
      <img className="decor decor--latte" src="/assets/decor-latte.png" alt="" aria-hidden="true" />
      <img className="decor decor--cake" src="/assets/decor-cake.png" alt="" aria-hidden="true" />
      <img className="decor decor--books" src="/assets/decor-books.png" alt="" aria-hidden="true" />

      <FlowTopBar step={1} backTo="/" />

      <main className="upload-card-wrap">
        <div className="upload-card-frame">
          <p className="upload-card__note">
            一張照片，
            <br />
            開啟無限的學習可能！
          </p>
          <div className="upload-card">
          <div className="upload-card__head">
            <div>
              <h1 className="upload-card__title">
                選擇<span className="upload-card__title--pink">一張圖片</span>
              </h1>
              <p className="upload-card__subtitle">可以用手機照片，也可以用電腦裡的圖片檔。</p>
            </div>
          </div>

          <div
            className={`upload-dropzone${isDragOver ? ' upload-dropzone--over' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
          >
            {imageUrl ? (
              <img className="upload-dropzone__preview" src={imageUrl} alt="已選擇的圖片預覽" />
            ) : (
              <>
                <span className="upload-dropzone__icon" aria-hidden="true">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <rect x="4" y="8" width="40" height="32" rx="6" fill="#fff" stroke="#8b7cf6" strokeWidth="2.5" />
                    <circle cx="16" cy="20" r="4" fill="#ffd166" />
                    <path d="M4 34L18 22L28 30L36 24L44 32V34a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6Z" fill="#8bd3a0" />
                    <circle cx="42" cy="38" r="10" fill="#8b7cf6" />
                    <path d="M42 33v10M37 38h10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="upload-dropzone__title">點這裡加入圖片</p>
                <p className="upload-dropzone__subtitle">支援手機相片與一般圖片檔</p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.heic,.heif,image/jpeg,image/png,image/heic,image/heif"
              onChange={handleInputChange}
              hidden
            />
          </div>

          <div className="upload-hints">
            <span>🖼️ 可拖曳圖片到這裡</span>
            <span className="upload-hints__divider">|</span>
            <span>支援 JPG・PNG・HEIC 等格式</span>
          </div>

          <div className="upload-extra-row">
            <button type="button" className="upload-link" onClick={() => navigate('/ai-helper/step1')}>
              ✨ 沒有合適的圖片？用 AI 生圖小幫手
            </button>
            <button type="button" className="upload-outline-btn" onClick={() => navigate('/ai-helper/step1')}>
              📖 開啟 AI 生圖教學
            </button>
          </div>

          <button
            type="button"
            className="upload-next-btn"
            disabled={!imageFile}
            onClick={handleNext}
          >
            下一步
          </button>
          </div>
        </div>
      </main>
    </div>
  )
}

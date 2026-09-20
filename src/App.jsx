import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UploadImage from './pages/UploadImage'
import SelectMode from './pages/SelectMode'
import AIGenerating from './pages/AIGenerating'

/**
 * 路由入口。
 * Task 02：首頁（'/'）— 維持不變。
 * Task 03：新增選擇圖片（'/upload'）、選擇製作方式（'/select-mode'）、
 *          AI產生中（'/generating'）三個畫面，串成互動圖片建立流程的前三步。
 * 之後每完成一個 Task，會依序在這裡新增對應路徑，不會更動既有路徑。
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/select-mode" element={<SelectMode />} />
        <Route path="/generating" element={<AIGenerating />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

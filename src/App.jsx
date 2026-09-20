import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UploadImage from './pages/UploadImage'
import SelectMode from './pages/SelectMode'
import AIGenerating from './pages/AIGenerating'
import AiHelperFlow from './pages/ai-helper/AiHelperFlow'
import Step1 from './pages/ai-helper/Step1'
import Step2 from './pages/ai-helper/Step2'
import Step3 from './pages/ai-helper/Step3'
import Step4 from './pages/ai-helper/Step4'

/**
 * 路由入口。
 * Task 02：首頁（'/'）— 維持不變。
 * Task 03：選擇圖片（'/upload'）、選擇製作方式（'/select-mode'）、
 *          AI產生中（'/generating'）三個畫面，串成互動圖片建立流程的前三步。
 * Task 04：AI 生圖小幫手（'/ai-helper/step1'~'step4'），從 /upload 的兩個入口
 *          進入，最後一頁「回到開始創作」導回 /upload，讓使用者把生成的圖片
 *          放回主流程。四頁共用同一份表單資料（AiHelperFlow 用 Outlet context 提供）。
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
        <Route path="/ai-helper" element={<AiHelperFlow />}>
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
          <Route path="step4" element={<Step4 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

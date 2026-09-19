import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

/**
 * 路由入口。
 * Task 02 目前只有首頁（'/'）。
 * 之後每完成一個Task（Task 03上傳圖片、Task 04選擇製作方式...），
 * 會依序在這裡新增對應路徑，不會更動既有路徑。
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import Logo from './Logo'
import './TopNav.css'

/**
 * 頂部導覽列
 * 依 A5 規則：未登入時只顯示「登入」按鈕，
 * 之後登入狀態的顯示（TERESA + 下拉選單）會在 Task 02 之後、
 * 實際串接Google OAuth時再實作。
 */
export default function TopNav() {
  return (
    <header className="topnav">
      <Logo size="md" />
      <nav className="topnav__links">
        <a href="#" className="topnav__link">方案</a>
        <a href="#" className="topnav__link">分享</a>
        <button className="topnav__login-btn" type="button">登入</button>
      </nav>
    </header>
  )
}

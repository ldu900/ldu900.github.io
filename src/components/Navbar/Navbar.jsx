import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrolledNavbar } from '../../hooks/useScrolledNavbar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const scrolled = useScrolledNavbar(50);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const close = () => setIsOpen(false);

  const goToTab = (tab) => {
    navigate(`/project?tab=${tab}`);
    close();
  };

  // 모바일 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <>
      {/* 데스크탑 Nav */}
      <nav className={scrolled ? styles.scrolled : ''}>
        <Link to="/" className={styles.logo} onClick={close}>
          <img src="/assets/logo/logo.svg" alt="Moldoo STUDIO Logo" />
        </Link>

        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={isActive('/') ? styles.active : ''}>HOME</Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? styles.active : ''}>ABOUT</Link>
          </li>
          <li className={styles.dropdown}>
            <Link to="/project" className={isActive('/project') ? styles.active : ''}>PROJECT</Link>
            <ul className={styles.dropdownMenu}>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); goToTab('film'); }}>FILM</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); goToTab('design'); }}>DESIGN</a>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? styles.active : ''}>CONTACT</Link>
          </li>
        </ul>
      </nav>

      {/* 모바일 바텀 시트 Nav */}
      <div className={`${styles.bottomSheet}${isOpen ? ` ${styles.bottomSheetOpen}` : ''}`}>
        {/* 핸들 영역 — 탭하면 열기/닫기 */}
        <button
          className={styles.sheetToggle}
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span className={styles.handlePill} />
          <span className={styles.handleRow}>
            <img src="/assets/logo/logo.svg" alt="Moldoo STUDIO" className={styles.sheetLogo} />
            <span className={`${styles.chevron}${isOpen ? ` ${styles.chevronUp}` : ''}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 11.5L9 6.5L14 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </span>
        </button>

        {/* 메뉴 항목 */}
        <ul className={styles.sheetLinks}>
          <li>
            <Link to="/" onClick={close} className={isActive('/') ? styles.active : ''}>HOME</Link>
          </li>
          <li>
            <Link to="/about" onClick={close} className={isActive('/about') ? styles.active : ''}>ABOUT</Link>
          </li>
          <li>
            <Link to="/project" onClick={close} className={isActive('/project') ? styles.active : ''}>PROJECT</Link>
          </li>
          <li>
            <Link to="/contact" onClick={close} className={isActive('/contact') ? styles.active : ''}>CONTACT</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

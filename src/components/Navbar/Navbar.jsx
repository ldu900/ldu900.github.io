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

  // 메뉴 열릴 때 스크롤 방지
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

        <button
          className={`${styles.menuBtn}${isOpen ? ` ${styles.menuBtnOpen}` : ''}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="메뉴"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* 모바일 풀스크린 메뉴 */}
      <div className={`${styles.mobileMenu}${isOpen ? ` ${styles.mobileMenuOpen}` : ''}`}>
        <ul className={styles.mobileLinks}>
          <li><Link to="/" onClick={close} className={isActive('/') ? styles.active : ''}>HOME</Link></li>
          <li><Link to="/about" onClick={close} className={isActive('/about') ? styles.active : ''}>ABOUT</Link></li>
          <li><Link to="/project" onClick={close} className={isActive('/project') ? styles.active : ''}>PROJECT</Link></li>
          <li><Link to="/contact" onClick={close} className={isActive('/contact') ? styles.active : ''}>CONTACT</Link></li>
        </ul>
      </div>
    </>
  );
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrolledNavbar } from '../../hooks/useScrolledNavbar';
import styles from './Navbar.module.css';

export default function Navbar() {
  const scrolled = useScrolledNavbar(50);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => pathname === path;

  const goToTab = (tab) => {
    navigate(`/project?tab=${tab}`);
  };

  return (
    <nav className={scrolled ? styles.scrolled : ''}>
      <Link to="/" className={styles.logo}>
        <img src="/assets/logo/logo.svg" alt="Moldoo STUDIO Logo" />
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/" className={isActive('/') ? styles.active : ''}>
            HOME
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about') ? styles.active : ''}>
            ABOUT
          </Link>
        </li>
        <li className={styles.dropdown}>
          <Link to="/project" className={isActive('/project') ? styles.active : ''}>
            PROJECT
          </Link>
          <ul className={styles.dropdownMenu}>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToTab('film');
                }}
              >
                FILM
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  goToTab('design');
                }}
              >
                DESIGN
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact" className={isActive('/contact') ? styles.active : ''}>
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  );
}

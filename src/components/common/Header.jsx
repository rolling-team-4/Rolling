import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import Button from '../common/Button'; 
// 1. useLocation 추가
import { Link, useNavigate, useLocation } from 'react-router-dom'; 

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // 2. 현재 위치 정보 가져오기

  const handleBtnClick = () => {
    navigate('/post');
  };

  // 3. 모바일에서 헤더를 보여줄 페이지들 (메인, 리스트)
  // 여기에 포함되지 않은 페이지(상세페이지 등)는 모바일에서 헤더가 숨겨집니다.
  const mobileVisiblePaths = ['/', '/list'];
  const isMobileVisible = mobileVisiblePaths.includes(location.pathname);

  return (
    // 4. 조건부 클래스 추가: 모바일에서 안 보여야 할 상황이면 hideOnMobile 클래스 추가
    <header className={`${styles.header} ${!isMobileVisible ? styles.hideOnMobile : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrapper}>
          <img src={logo} alt="Rolling Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Rolling</span>
        </Link>
        <div className={styles.action}>
          <Button onClick={handleBtnClick}>롤링 페이퍼 만들기</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
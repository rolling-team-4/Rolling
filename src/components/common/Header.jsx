import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import Button from '../common/Button'; 
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate('/post');
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrapper}>
          <img src={logo} alt="" className={styles.logoImg} />
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
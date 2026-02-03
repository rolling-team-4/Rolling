import { Link } from 'react-router-dom';
import styles from './MainPage.module.css';
import Button from '../components/common/Button';
import mainImg01 from '../assets/main_01.svg';
import mainImg02 from '../assets/main_02.png';
import mainImg01_m from '../assets/main_01_mobile.svg';

function MainPage() {
  return (
    <main className={styles.mainContainer}>
    
      <section className={styles.section}>
        <div className={styles.textGroup}>
          <span className={styles.pointBadge}>Point. 01</span>
          <h2 className={styles.title}>
            누구나 손쉽게, 온라인<br/>
            롤링 페이퍼를 만들 수 있어요
          </h2>
          <p className={styles.description}>
            로그인 없이 자유롭게 만들어요.
          </p>
        </div>
        <div className={styles.imageWrapper}>
          <img src={mainImg01} alt="롤링페이퍼" className={styles.imgPC} />
          <img src={mainImg01_m} alt="롤링페이퍼 모바일" className={styles.imgMobile}/> 
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.imageWrapper}>
           <img src={mainImg02} alt="롤링페이퍼" className={styles.sectionImage} />
        </div>
        <div className={styles.textGroup}>
          <span className={styles.pointBadge}>Point. 02</span>
          <h2 className={styles.title}>
            서로에게 이모지로 감정을<br />
            표현해보세요
          </h2>
          <p className={styles.description}>
            롤링 페이퍼에 이모지를 추가할 수 있어요.
          </p>
        </div>
      </section>

   
      <div className={styles.buttonContainer}>
        <Link to="/list">
          <Button className={styles.ctaBtn}>
            구경해보기
          </Button> 
        </Link>
      </div>

    </main>
  );
}

export default MainPage;
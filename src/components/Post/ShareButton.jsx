import { useState } from 'react';
import styles from './ShareButton.module.css';
import shareIcon from '../../assets/share_24.svg';
import shareIconMobile from '../../assets/share_20.svg';
import Toast from '../common/Toast.jsx';
import { shareKakao } from '../../utils/share.js';


const TOAST_DURATION = 3000;

function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleShareKakao = () => {
    // 배포 주소 + 페이지 경로(ID포함)
    const realUrl = "https://rolling-pi-lemon.vercel.app" + window.location.pathname;
    console.log("공유될 주소:", realUrl);
    shareKakao(realUrl);
  };

  const handleCopyUrl = () => {
    const realUrl = "https://rolling-pi-lemon.vercel.app" + window.location.pathname;

    navigator.clipboard.writeText(realUrl)
      .then(() => {
        setShowToast(true); 
        setIsOpen(false); 

        // 5초 뒤에 자동으로 사라지게
        setTimeout(() => {
          setShowToast(false);
        }, TOAST_DURATION);
      })
      .catch((err) => {
        console.error('URL 복사 실패:', err);
        alert('URL 복사에 실패했습니다.');
      });
  };

  

  return (
    <div className={styles.container}>

      <button className={styles.shareButton} onClick={handleToggle}>
        <img src={shareIcon} alt="share" className={styles.iconDesktop} />
        <img src={shareIconMobile} alt="share" className={styles.iconMobile} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.optionButton} onClick={handleShareKakao}>
            <span>카카오톡 공유</span>
          </button>
          
          <button className={styles.optionButton} onClick={handleCopyUrl}>
            <span>URL 공유</span>
          </button>
        </div>
      )}

      {showToast && (
        <Toast 
          message="URL이 복사 되었습니다." 
          onClose={() => setShowToast(false)} 
        />
      )}


    </div>
  );
}

export default ShareButton;

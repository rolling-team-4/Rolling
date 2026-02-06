import styles from './Toast.module.css';
import checkIcon from '../../assets/Subtract.svg'; 
import closeIcon from '../../assets/close.svg'; 

function Toast({ message, onClose }) {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.content}>
        <img src={checkIcon} alt="success" className={styles.checkIcon} />
        <span className={styles.message}>{message}</span>
      </div>
      
      <button className={styles.closeButton} onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </button>
    </div>
  );
}

export default Toast;
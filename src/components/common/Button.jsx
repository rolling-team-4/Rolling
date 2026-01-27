import styles from './Button.module.css';

function Button({ children, disabled, onClick, ...props }) {
  return (
    <button 
      className={styles.primary} 
      disabled={disabled} 
      onClick={onClick}
      {...props} // Button 가져가서 속성(style등등) 변경할때 여기서 처리 
    >
      {children}
    </button>
  );
}

export default Button;
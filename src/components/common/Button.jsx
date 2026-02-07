import styles from './Button.module.css';

function Button({ children, disabled, onClick, ...props }) {
  return (
    <button 
      className={styles.primary} 
      disabled={disabled} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
import styles from './Input.module.css';

function Input({ id, label, value, isError, onChange, placeholder, ...props }) {

  let inputClassName = styles.inputBox;

  if (isError) {
    inputClassName += ` ${styles.error}`;
  }
  
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
        </label>
      )}
      <input 
        className={inputClassName}
        id={id}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {isError && <p className={styles.errorMessage}>값을 입력해 주세요.</p>}
    </div>
  );
}

export default Input;
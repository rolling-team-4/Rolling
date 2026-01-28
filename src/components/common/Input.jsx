import styles from './Input.module.css';

function Input({ id, label, value, onChange, placeholder, ...props }) {
  
  return (
    <div className={styles.inputContainer}>
      {label && (
        <label htmlFor={id} className={styles.inputLabel}>
          {label}
        </label>
      )}
      <input 
        className={styles.inputBox}
        id={id}
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
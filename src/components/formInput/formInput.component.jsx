import React from 'react';


import styles from './formInput.module.scss';

function FormInput({ label, name, type, required, id, handleChange} ) {
  return (
    <div className={styles.Group}>
      <input
        name={name}
        required={required}
        type={type}
        className={styles.FormInput}
        id={id}
        onChange={handleChange}
      />
      {label && (
        <label htmlFor={id} className={styles.FormInputLabel}>
          {label}
        </label>
      )}
    </div>
  );
}

export default FormInput;

import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, title }) => {
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};

export default Card;
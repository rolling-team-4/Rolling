import React from 'react';
import styles from './PostHeader.module.css';
import Reaction from './Reaction';
import ShareButton from './ShareButton'; 

function PostHeader({ recipientName, messageCount = 0, recentMessages = [] }) {
  
  const displayAvatars = recentMessages.slice(0, 3);
  const remainingCount = messageCount - 3;

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContent}>
        
      
        <div className={styles.recipientInfo}>
          <span className={styles.to}>To.</span>
          <span className={styles.name}>{recipientName}</span>
        </div>

      
        <div className={styles.actions}>
          
         
          <div className={styles.writerInfo}>
            <div className={styles.avatarGroup}>
              {displayAvatars.map((message, index) => (
                <img 
                  key={message.id || index}
                  src={message.profileImageURL} 
                  alt="작성자 프로필" 
                  className={styles.avatar} 
                />
              ))}
              {remainingCount > 0 && (
                <div className={styles.avatarMore}>+{remainingCount}</div>
              )}
            </div>
            <span className={styles.countText}>
              {messageCount}명이 작성했어요!
            </span>
          </div>


          <div className={`${styles.divider} ${styles.pcOnly}`}></div>
          
      
          <div className={styles.rightActions}>
            <Reaction />
            <div className={styles.divider}></div> 
            <ShareButton />
          </div>
          
        </div>
      </header>
    </div>
  );
}

export default PostHeader;
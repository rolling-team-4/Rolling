import React from 'react';
import styles from './PostHeader.module.css';
import Reaction from './Reaction';
import ShareButton from './ShareButton'; 

function PostHeader({ recipientName = "수신자", messageCount = 0 }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        
        <div className={styles.recipientInfo}>
          <span className={styles.to}>To.</span>
          <span className={styles.name}>{recipientName}</span>
        </div>

        <div className={styles.actions}>
          
          <div className={styles.writerInfo}>
            <div className={styles.avatarGroup}>
              <img src="https://picsum.photos/id/1005/50/50" alt="" className={styles.avatar} />
              <img src="https://picsum.photos/id/1011/50/50" alt="" className={styles.avatar} />
              <img src="https://picsum.photos/id/1025/50/50" alt="" className={styles.avatar} />
              <div className={styles.avatarMore}>+6</div>
            </div>
            <span className={styles.countText}>
              {messageCount}명이 작성했어요!
            </span>
          </div>

          <div className={styles.divider}></div>
          <Reaction />
           <div className={styles.divider}></div> 
          <ShareButton />
        
          
        </div>

      </div>
    </header>
  );
}

export default PostHeader;
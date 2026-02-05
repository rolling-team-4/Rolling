import React from 'react';
import styles from './PostHeader.module.css';
import Reaction from './Reaction';
import ShareButton from './ShareButton'; 

function PostHeader({ recipientName, messageCount = 0, recentMessages = [] }) {
  
  // 프로필 이미지는 최대 3개까지
  const displayAvatars = recentMessages.slice(0, 3);
  
  // 3명을 제외하고 남은 사람 수 계산
  const remainingCount = messageCount - 3;

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.recipientInfo}>
          <span className={styles.to}>To.</span>
          <span className={styles.name}>{recipientName}</span>
        </div>

        <div className={styles.actions}>
          
          {/* 작성자 목록 */}
          <div className={styles.writerInfo}>
            <div className={styles.avatarGroup}>
              {displayAvatars.map((message, index) => (
                <img 
                  key={message.id || index} // 고유 key 값 설정
                  src={message.profileImageURL} 
                  alt="작성자 프로필" 
                  className={styles.avatar} 
                />
              ))}
              
              {/* 3명보다 많을 때만 '+n' 표시 */}
              {remainingCount > 0 && (
                <div className={styles.avatarMore}>+{remainingCount}</div>
              )}
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
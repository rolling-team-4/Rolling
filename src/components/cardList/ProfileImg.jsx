import React from "react";
import styles from './CardList.module.css';


function ProfileImg({ msgCnt , profile}) {

  // 최대 표시할 이미지 수 = 3
  const maxShow = 3;

  // 보여줄 이미지 인덱스 리스트 (0부터 msgCnt까지)
  const showCount = Math.min(msgCnt, maxShow);

  // 3개 초과 시 +n 값
  const extraCount = msgCnt > maxShow ? msgCnt - maxShow : 0;

  return (
    <div className={styles.imgContainer}>
      {Array.from({ length: showCount }).map((_, idx) => (
        <div key={idx} className={styles.imgBox}>
          <img
            src={profile[idx]?.profileImageURL}
            alt={`profile-${idx}`}
          />
        </div>
      ))}

      {extraCount > 0 && (
        <div className={styles.extra}>
          <span>+</span>
          <span>{extraCount}</span>
        </div>
      )}
    </div>
  );
}

export default ProfileImg;

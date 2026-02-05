import trashIcon from '../../assets/trash.svg';
import styles from './MessageCard.module.css';

function MessageCard({ message, isEditMode, onDelete, onClick }) {
  // 관계 문자열을 CSS 클래스명으로 바꿔주는 매핑 객체
  const relationshipClassMap = {
    '친구': styles.friend,
    '동료': styles.colleague,
    '가족': styles.family,
    '지인': styles.acquaintance,
  };

  return (
    <div className={styles.messageCard} onClick={onClick}>
      {/* 편집 모드일 때만 쓰레기통 버튼 노출 */}
      {isEditMode && (
        <button 
          className={styles.deleteIconButton} 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message.id);
          }}
        >
          <img src={trashIcon} alt="삭제" />
        </button>
      )}
      <div className={styles.profileSection}>
        {message.profileImageURL ? (
          <img src={message.profileImageURL} className={styles.profileImage} alt="프로필" />
        ) : (
          <div className={styles.profileImagePlaceholder} />
        )}
        <div className={styles.senderInfo}>
          <div className={styles.nameBox}>
            <span>From.</span>
            <span className={styles.name}>{message.sender}</span>
          </div>
          <span className={`${styles.relationshipBadge} ${relationshipClassMap[message.relationship]}`}>
            {message.relationship}
          </span>
        </div>
      </div>
      <p className={styles.content} style={{ fontFamily: message.font }}>
        {message.content}
      </p>
      <span className={styles.date}>
        {new Date(message.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

export default MessageCard;
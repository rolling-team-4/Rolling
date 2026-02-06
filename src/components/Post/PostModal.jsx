import { createPortal } from "react-dom";
import styles from './PostModal.module.css';
import Button from "../common/Button";

function PostModal({ message, onClose }) {
  const relationshipClassMap = {
    '친구': styles.friend,
    '동료': styles.colleague,
    '가족': styles.family,
    '지인': styles.acquaintance,
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        {/* 프로필 섹션 */}
        <div className={styles.profileSection}>
          <img 
            src={message.profileImageURL || 'https://via.placeholder.com/56'} 
            className={styles.profileImage} 
            alt="프로필" 
          />
          <div className={styles.senderInfo}>
            <div className={styles.nameBox}>
              <span>From.</span>
              <span className={styles.name}>{message.sender}</span>
            </div>
            <span className={`${styles.relationshipBadge} ${relationshipClassMap[message.relationship]}`}>
              {message.relationship}
            </span>
          </div>
          <span className={styles.date}>
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>
        {/* 본문 내용 */}
        <div className={styles.content} style={{ fontFamily: message.font }}>
          {message.content}
        </div>
        {/* 하단 확인 버튼 */}
        <div className={styles.buttonWrapper}>
          <Button 
            onClick={onClose} 
          >
            확인
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default PostModal;
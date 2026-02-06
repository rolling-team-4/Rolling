import MessageCard from "./MessageCard";
import Button from "../common/Button";
import styles from './EditGrid.module.css';

const BG_COLORS = {
  beige: 'var(--orange-200)',
  purple: 'var(--purple-200)',
  blue: 'var(--blue-200)',
  green: 'var(--green-200)',
};

function EditGrid({ recipientData, messages, onDeleteMessage, onDeleteRecipient, onGoBack }) {
  if (!recipientData) {
    return null;
  }

  const { backgroundColor, backgroundImageURL } = recipientData;

  const containerStyle = backgroundImageURL
    ? { backgroundImage: `url(${backgroundImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: BG_COLORS[backgroundColor] || 'var(--surface)' };

  return (
    <div className={styles.container} style={containerStyle}>
      {/* 롤링페이퍼 전체 삭제 버튼 영역 */}
      <div className={styles.deleteBtnWrapper}>
        <div className={styles.buttonGroup}>
          <Button onClick={onGoBack} color="secondary">뒤로가기</Button>
          <Button onClick={onDeleteRecipient}>롤링페이퍼 삭제</Button>
        </div>
      </div>

      <div className={styles.cardList}>
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            className={styles.messageCard}
            message={message}
            isEditMode={true} // 💡 편집 그리드이므로 항상 true
            onDelete={onDeleteMessage}
          />
        ))}
      </div>
    </div>
  );
}

export default EditGrid;
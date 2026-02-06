import MessageCard from "./MessageCard";
import Button from "../common/Button";
import styles from './EditGrid.module.css';

const BG_COLORS = {
  beige: 'var(--orange-200)',
  purple: 'var(--purple-200)',
  blue: 'var(--blue-200)',
  green: 'var(--green-200)',
};

function EditGrid({ recipientData, messages, onDeleteMessage, onDeleteRecipient, onGoBack, isLoading }) {

  // 로딩 중일 때 보여줄 가짜 카드 배열
  const skeletonCards = Array(6).fill(0);

  // 로딩 중에는 데이터가 null일 수 있으므로 기본값 설정
  const backgroundColor = recipientData?.backgroundColor || 'beige';
  const backgroundImageURL = recipientData?.backgroundImageURL;

  const containerStyle = backgroundImageURL
    ? { backgroundImage: `url(${backgroundImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: BG_COLORS[backgroundColor] || 'var(--surface)' };

  return (
    <div className={styles.container} style={containerStyle}>
      
      <div className={styles.deleteBtnWrapper}>
        <div className={styles.buttonGroup}>
          <Button onClick={onGoBack} color="secondary">뒤로가기</Button>
          <Button onClick={onDeleteRecipient}>롤링페이퍼 삭제</Button>
        </div>
      </div>

      <div className={styles.cardList}>
        {/* 로딩 상태에 따른 분기 처리 */}
        {isLoading ? (
          skeletonCards.map((_, idx) => (
            <div key={idx} className={styles.skeletonCard} />
          ))
        ) : (
          messages.map((message) => (
            <MessageCard
              key={message.id}
              className={styles.messageCard}
              message={message}
              isEditMode={true}
              onDelete={onDeleteMessage}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default EditGrid;
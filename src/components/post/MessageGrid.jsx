import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageCard from './MessageCard'; 
import PostModal from './PostModal';
import Button from '../common/Button'; 
import styles from './MessageGrid.module.css';

// 배경 스타일 설정
const BG_COLORS = {
  beige: 'var(--orange-200)',
  purple: 'var(--purple-200)',
  blue: 'var(--blue-200)',
  green: 'var(--green-200)',
};

function MessageGrid({ recipientData, messages, isLoading }) { 
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMessage, setSelectedMessage] = useState(null);

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
        <Button onClick={() => navigate(`/post/${id}/edit`)}>
          삭제하기
        </Button>
      </div>

      <div className={styles.cardList}>
        {/* 데이터 로딩 중에는 추가 버튼을 숨긴다. */}
        {!isLoading && (
          <div className={styles.addButtonCard}>
            <div className={styles.addButton} onClick={() => navigate(`/post/${id}/message`)}></div>
          </div>
        )}
        
        {/* 로딩 상태에 따른 분기 처리 */}
        {isLoading ? (
          skeletonCards.map((_, idx) => (
            <div key={idx} className={styles.skeletonCard} />
          ))
        ) : (
          messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              isEditMode={false}
              onClick={() => setSelectedMessage(message)}
            />
          ))
        )}
      </div>

      {selectedMessage && (
        <PostModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}

export default MessageGrid;
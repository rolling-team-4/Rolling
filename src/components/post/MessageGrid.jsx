import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import MessageCard from './MessageCard'; 
import PostModal from './PostModal';
import styles from './MessageGrid.module.css';
import PostHeader from './PostHeader.jsx'; 
import Button from '../common/Button'; 

// 배경 스타일 설정
const BG_COLORS = {
  beige: 'var(--orange-200)',
  purple: 'var(--purple-200)',
  blue: 'var(--blue-200)',
  green: 'var(--green-200)',
};

function MessageGrid({ recipientData, messages }) { 
  const navigate = useNavigate();
  const { id } = useParams();

  // 상태 관리
  const [selectedMessage, setSelectedMessage] = useState(null);

  if (!recipientData) {
    return null;
  }

  const { backgroundColor, backgroundImageURL } = recipientData;

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
        <div className={styles.addButtonCard}>
          <div
            className={styles.addButton}
            onClick={() => navigate(`/post/${id}/message`)}
          ></div>
      </div>
        
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            isEditMode={false}
            className={styles.messageCard}
            onClick={() => setSelectedMessage(message)}
          />
        ))}
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
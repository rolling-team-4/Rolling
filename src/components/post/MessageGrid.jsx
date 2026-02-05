import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import MessageCard from './MessageCard'; 
import PostModal from './PostModal';
import styles from './MessageGrid.module.css';
import PostHeader from './PostHeader.jsx'; 
import Button from '../common/Button'; 

function MessageGrid({ isEditMode }) { 
  const navigate = useNavigate();
  const { id } = useParams();

  // 상태 관리
  const [recipientData, setRecipientData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [background, setBackground] = useState({ color: '', image: '' });
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 데이터 불러오기 함수
  const fetchMessages = async () => {
    try {
      const response = await api.get(`recipients/${id}/messages/?limit=100`);
      setMessages(response.data.results);
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다.", error);
    }
  };

  // 대상 정보(배경) 가져오기
  const fetchRecipient = async () => {
    try {
      const response = await api.get(`recipients/${id}/`);
     setRecipientData(response.data);
    } catch (error) {
      console.error("대상 정보를 가져오는데 실패했습니다.", error);
    }
  };


  // 롤링페이퍼 전체 삭제 함수
  const handleDeleteRecipient = async () => {
    if (!window.confirm("이 롤링페이퍼를 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`recipients/${id}/`);
      navigate('/list');
    } catch (error) {
      console.error("전체 삭제 실패", error);
    }
  };

  // 메시지 삭제 함수
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("이 메시지를 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`messages/${messageId}/`);
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("메시지 삭제 실패", error);
    }
  };

  useEffect(() => {
    fetchRecipient();
    fetchMessages();
  }, [id]);

  // 데이터가 아직 안 왔으면 로딩 중 처리 (에러 방지)
  if (!recipientData) return <div>로딩 중...</div>;

  // 배경 스타일 설정
  const bgColors = {
    beige: 'var(--orange-200)',
    purple: 'var(--purple-200)',
    blue: 'var(--blue-200)',
    green: 'var(--green-200)',
  };
  const { backgroundColor, backgroundImageURL } = recipientData;

  const containerStyle = backgroundImageURL
    ? { backgroundImage: `url(${backgroundImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: bgColors[backgroundColor] || 'var(--surface)' };

  return (
    <>
      <PostHeader 
        recipientName={recipientData.name} 
        messageCount={recipientData.messageCount}
        recentMessages={recipientData.recentMessages} // writerInfo
      />

      <div className={styles.container} style={containerStyle}>
        <div className={styles.deleteBtnWrapper}>
          <Button
            onClick={isEditMode ? handleDeleteRecipient : () => navigate(`/post/${id}/edit`)}
          >
            {isEditMode ? "롤링페이퍼 삭제" : "삭제하기"}
          </Button>
        </div>

        <div className={styles.cardList}>
          {!isEditMode && (
             <div className={styles.addButtonCard}>
             <div
               className={styles.addButton}
               onClick={() => navigate(`/post/${id}/message`)}
             ></div>
           </div>
          )}

    
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              isEditMode={isEditMode}
              onDelete={handleDeleteMessage}
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
    </>
  );
}

export default MessageGrid;
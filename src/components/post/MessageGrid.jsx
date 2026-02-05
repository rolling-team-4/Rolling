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
  const [messages, setMessages] = useState([]);
  const [background, setBackground] = useState({ color: '', image: '' });
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 데이터 불러오기 함수
  const fetchMessages = async () => {
    try {
      const response = await api.get(`recipients/${id}/messages/`);
      setMessages(response.data.results);
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다.", error);
    }
  };

  // 대상 정보(배경) 가져오기
  const fetchBackground = async () => {
    try {
      const response = await api.get(`recipients/${id}/`);
      setBackground({
        color: response.data.backgroundColor,
        image: response.data.backgroundImageURL,
      });
    } catch (error) {
      console.error("배경 데이터를 가져오는데 실패했습니다.", error);
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
    fetchBackground();
    fetchMessages();
  }, [id]);

  // 배경 스타일 설정
  const bgColors = {
    beige: 'var(--orange-200)',
    purple: 'var(--purple-200)',
    blue: 'var(--blue-200)',
    green: 'var(--green-200)',
  };

  const containerStyle = background.image
    ? { backgroundImage: `url(${background.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: bgColors[background.color] || 'var(--surface)' };

  return (
    <>
      <PostHeader />

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
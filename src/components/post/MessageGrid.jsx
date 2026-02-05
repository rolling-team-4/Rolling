import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import MessageCard from './MessageCard';
import PostModal from './PostModal';
import styles from './MessageGrid.module.css';

function MessageGrid() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 상태 관리
  // 서버에서 받아온 메시지 객체들을 모아두는 배열
  const [messages, setMessages] = useState([]);
  // 현재 상세 페이지의 배경 설정 값 (배경색이나 이미지 주소)
  const [background, setBackground] = useState({ color: '', image: '' });
  // 현재 클릭해서 모달로 보여주고 있는 메시지 데이터
  const [selectedMessage, setSelectedMessage] = useState(null);

  // 데이터 불러오기 함수
  const fetchMessages = async () => {
    try {
      const response = await api.get(`recipients/${id}/messages/`); // baseURL 뒤에 붙을 세부 주소
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

  // 컴포넌트가 마운트될 때 실행
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

  // 이미지가 있다면 backgroundImage, 없다면 backgroundColor 스타일 적용
  const containerStyle = background.image
    ? { backgroundImage: `url(${background.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: bgColors[background.color] || 'var(--surface)' };

  return (
    <>
      {/* PostHeader 부분 */}
      <div className={styles.container} style={containerStyle}>
        <div className={styles.cardList}>
          {/* 추가 버튼 카드 */}
          <div className={styles.addButtonCard}>
            <div 
              className={styles.addButton} 
              onClick={() => navigate(`/post/${id}/message`)}
            ></div>
          </div>
          {/* 메시지 카드 리스트 */}
          {messages.map((message) => (
            <MessageCard 
              key={message.id} 
              message={message} 
              onClick={() => setSelectedMessage(message)} 
            />
          ))}
        </div>
        {/* 모달 렌더링 (selectedMessage가 있을 때만 띄움) */}
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
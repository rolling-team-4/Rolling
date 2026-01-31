import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import styles from './MessageGrid.module.css';

function MessageGrid() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 서버에서 받아온 메시지들을 담을 상태
  const [messages, setMessages] = useState([]);
  const [background, setBackground] = useState({ color: '', image: '' }); // 배경 상태 추가

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

  // 관계 문자열을 CSS 클래스명으로 바꿔주는 매핑 객체
  const relationshipClassMap = {
    '친구': styles.friend,
    '동료': styles.colleague,
    '가족': styles.family,
    '지인': styles.acquaintance,
  };

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
          <div key={message.id} className={styles.messageCard}>
            <div className={styles.profileSection}>
              {/* 프로필 이미지가 있을 때만 렌더링, 없으면 플레이스홀더 */}
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
        ))}
      </div>
    </div>
  );
}

export default MessageGrid;
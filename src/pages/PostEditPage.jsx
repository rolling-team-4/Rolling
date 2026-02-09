import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import PostHeader from '../components/Post/PostHeader.jsx'; 
import EditGrid from '../components/Post/EditGrid.jsx'; 

function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipientData, setRecipientData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resRecipient, resMessages] = await Promise.all([
          api.get(`recipients/${id}/`),
          api.get(`recipients/${id}/messages/?limit=100`)
        ]);
        setRecipientData(resRecipient.data);
        setMessages(resMessages.data.results);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  // 롤링페이퍼 전체 삭제 함수
  const handleDeleteRecipient = async () => {
    if (!window.confirm("이 롤링페이퍼를 삭제하시겠습니까?")) {
      return;
    }
    try {
      await api.delete(`recipients/${id}/`);
      navigate('/list');
    } catch (error) {
      console.error("롤링페이퍼 삭제 실패", error);
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
    } catch (error) {
      console.error("메시지 삭제 실패", error);
    }
  };

  // 💡 뒤로가기 (조회 페이지로 돌아가기)
  const handleGoBack = () => {
    navigate(`/post/${id}`);
  };

  // 로딩 중일 때 처리
  if (!isLoading && !recipientData) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 데이터를 불러오는 중(recipientData가 null)일 때 에러가 나지 않도록 빈값 설정 */}
      <PostHeader 
        recipientName={recipientData?.name || ""} 
        messageCount={recipientData?.messageCount || 0}
        recentMessages={recipientData?.recentMessages || []}
      />

      <EditGrid 
        recipientData={recipientData} 
        messages={messages} 
        onDeleteMessage={handleDeleteMessage}
        onDeleteRecipient={handleDeleteRecipient}
        onGoBack={handleGoBack}
        isLoading={isLoading}
      />
    </div>
  );
}

export default PostEditPage;

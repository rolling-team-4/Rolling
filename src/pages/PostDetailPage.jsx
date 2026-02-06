import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import PostHeader from '../components/post/PostHeader.jsx';
import MessageGrid from '../components/post/MessageGrid.jsx';

function PostDetailPage() {
  const { id } = useParams();

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

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '100px' }}>로딩 중...</div>;
  }
  
  if (!recipientData) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <PostHeader 
        recipientName={recipientData.name} 
        messageCount={recipientData.messageCount}
        recentMessages={recipientData.recentMessages}
      />

      <MessageGrid 
        recipientData={recipientData} 
        messages={messages} 
      />
    </>
  );
}

export default PostDetailPage;
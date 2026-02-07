import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import EmojiPicker from 'emoji-picker-react';
import api from '../../api/axios';
import styles from './Reaction.module.css';
import arrowIcon from '../../assets/arrow_down.svg';
import addIcon from '../../assets/add_24.svg';
import addIconMobile from '../../assets/add_20.svg';

function Reaction() {
  const { id } = useParams(); 
  const [reactions, setReactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

 
  const fetchReactions = async () => {
    if (!id) return; // ID가 없으면 실행하지 않음
    try {
      const response = await api.get(`recipients/${id}/reactions/?limit=20`);
      setReactions(response.data.results);
    } catch (error) {
      console.error("리액션 불러오기 실패:", error);
    }
  };


  useEffect(() => {
    fetchReactions();
  }, [id]);

  const visibleReactions = reactions.slice(0, 3);

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
    setShowPicker(false);
  };

  const handleAddClick = () => {
    setShowPicker(!showPicker);
    setIsOpen(false);
  };


  const handleEmojiClick = async (emojiObject) => {
    const newEmoji = emojiObject.emoji;
    setShowPicker(false); // 피커 닫기

    try {
      // 서버에 저장 요청
      await api.post(`recipients/${id}/reactions/`, {
        emoji: newEmoji,
        type: 'increase',
      });
      
      // 저장 성공 후 목록 다시 불러오기 
      await fetchReactions();
      
    } catch (error) {
      console.error("이모지 추가 실패:", error);
      alert("이모지 추가에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.fixedGroup}>
        <div className={styles.badgeList}>
          {visibleReactions.map((reaction) => (
            <div key={reaction.id} className={styles.badge}>
              <span>{reaction.emoji}</span>
              <span className={styles.count}>{reaction.count}</span>
            </div>
          ))}
        </div>

        <button className={styles.arrowButton} onClick={handleArrowClick}>
          <img src={arrowIcon} alt="arrow" className={isOpen ? styles.arrowOpen : ''} />
        </button>
      </div>

      <button className={styles.addButton} onClick={handleAddClick}>
        <img src={addIcon} alt="add" className={styles.iconDesktop} />
        <img src={addIconMobile} alt="add" className={styles.iconMobile} />
        <span className={styles.addText}>추가</span>
      </button>

      {/* 펼쳐진 목록 */}
      {isOpen && (
        <div className={styles.expandedContainer}>
          {reactions.map((reaction) => (
            <div key={reaction.id} className={styles.badge}>
              <span>{reaction.emoji}</span>
              <span className={styles.count}>{reaction.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* 이모지 피커 */}
      {showPicker && (
        <div className={styles.pickerPopover}>
          <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} />
        </div>
      )}
    </div>
  );
}

export default Reaction;
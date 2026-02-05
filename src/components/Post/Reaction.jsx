import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from './Reaction.module.css';
import arrowIcon from '../../assets/arrow_down.svg';
import addIcon from '../../assets/add_24.svg';
import addIconMobile from '../../assets/add_20.svg';

function Reaction() {
  const [reactions, setReactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 애로우 눌렀을 때 (하얀박스)
  const [showPicker, setShowPicker] = useState(false); // 추가 눌렀을 때 (이모지피커)

  const visibleReactions = reactions.slice(0, 3);

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
    setShowPicker(false); 
  };

  
  const handleAddClick = () => {
    setShowPicker(!showPicker);
    setIsOpen(false); 
  };

  const handleEmojiClick = (emojiObject) => {
    const newEmoji = emojiObject.emoji;
    const existingReaction = reactions.find(r => r.emoji === newEmoji);

    if (existingReaction) {
      setReactions(reactions.map(r => 
        r.emoji === newEmoji ? { ...r, count: r.count + 1 } : r
      ));
    } else {
      const newReaction = { id: Date.now(), emoji: newEmoji, count: 1 };
      setReactions([...reactions, newReaction]);
    }
    setShowPicker(false);
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
       <img src={arrowIcon} alt="arrow" />
      </button>
</div>
        
      <button className={styles.addButton} onClick={handleAddClick}>
        <img src={addIcon} alt="add" className={styles.iconDesktop}/>
        <img src={addIconMobile} alt="add" className={styles.iconMobile} />
        <span className={styles.addText}>추가</span>
      </button>
        
      {/* 펼쳐진 하얀 박스 */}
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
import { useState } from 'react';
import Button from '../components/common/Button';
import styles from "./PostCreatePage.module.css";
import Input from '../components/common/Input';

function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [selectedButton, setSelectedButton] = useState('color');

  const colors = ["orange", "purple", "blue", "green"];
  const images = [
    "",
    "",
    "",
    "",
  ];

  const getButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#fff' : '#ccc',
    border: isSelected ? '2px solid #9935FF' : '2px solid transparent',
    color: isSelected ? '#9935FF' : '#666',
    cursor: 'pointer'
  });

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <Input
          id='to'
          label='To.'
          type='text'
          placeholder='받는 사람 이름을 입력해 주세요'
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.textBox}>
        <h1 className={styles.titleText}>배경화면을 선택해 주세요.</h1>
        <p className={styles.subText}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
      </div>
      <div className={styles.buttonBox}>
        <Button
          style={getButtonStyle(selectedButton === 'color')}
          onClick={() => setSelectedButton("color")}
        >
          컬러
        </Button>
        <Button
          style={getButtonStyle(selectedButton === 'image')}
          onClick={() => setSelectedButton("image")}
        >
          이미지
        </Button>
      </div>
      {/* 리스트 영역 */}
      <ul className={styles.list}>
        {selectedButton === "color" &&
          colors.map((color) => (
            <li key={color} className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              />
            </li>
          ))
        }

        {selectedButton === "image" &&
          images.map((src, idx) => (
            <li key={idx} className={styles.imageItem}>
              <img src={src} alt="" />
            </li>
          ))
        }
      </ul>
      <div>
        <Button>생성하기</Button>
      </div>
    </div>
  );
}

export default PostCreatePage;
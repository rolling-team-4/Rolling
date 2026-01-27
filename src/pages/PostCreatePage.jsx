import { useState } from 'react';
import Button from '../components/common/Button';
import styles from "./PostCreatePage.module.css";

function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [view, setView] = useState('color');

  const colors = ["orange", "purple", "blue", "green"];
  const images = [
    "",
    "",
    "",
    "",
  ];

  const isSelected = (key) => view === key;

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <p>To.</p>
      <input 
        type='text'
        placeholder='받는 사람 이름을 입력해 주세요'
        value={title}
        onChange={handleChange}
      />
      <h1>배경화면을 선택해 주세요.</h1>
      <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
      <div className={styles.buttonArea}>
        <Button
          className={isSelected("color") ? "selected" : ""}
          onClick={() => setView("color")}
        >
          컬러
        </Button>
        <Button
          className={isSelected("image") ? "selected" : ""}
          onClick={() => setView("image")}
        >
          이미지
        </Button>
      </div>
      {/* 리스트 영역 */}
      <ul className={styles.list}>
        {view === "color" &&
          colors.map((color) => (
            <li key={color} className={styles.colorItem}>
              <div
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              />
            </li>
          ))}

        {view === "image" &&
          images.map((src, idx) => (
            <li key={idx} className={styles.imageItem}>
              <img src={src} alt="" />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default PostCreatePage;
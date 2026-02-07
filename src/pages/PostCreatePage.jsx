import { useState } from 'react';
import Button from '../components/common/Button';
import styles from "./PostCreatePage.module.css";
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const colorMap = {
  "#FFE2AD": "beige",
  "#ECD9FF": "purple",
  "#B1E4FF": "blue",
  "#D0F5C3": "green"
};
const colors = Object.keys(colorMap);

const images = [
  "https://picsum.photos/id/100/3840/2160",
  "https://picsum.photos/id/24/3840/2160",
  "https://picsum.photos/id/153/3840/2160",
  "https://picsum.photos/id/1051/3840/2160"
];

function PostCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [selectedButton, setSelectedButton] = useState('color');
  const [selectedItem, setSelectedItem] = useState(colors[0]);

  const isButtonDisabled = title.trim() === '';
  const isTitleError = isTouched && title.trim() === '';

  const handleSubmit = async () => {
    console.log("선택된 아이템:", selectedItem);
    console.log("보낼 이미지 URL:", images[selectedItem]);
    const postData = {
      name: title,
      backgroundColor: selectedButton === 'color' ? colorMap[selectedItem] : 'beige',
      backgroundImageURL: selectedButton === 'image' ? selectedItem : null,
    };

    try {
      const response = await axios.post(
        'https://rolling-api.vercel.app/22-4/recipients/', 
        postData
      );
      
      const { id } = response.data;
      navigate(`/post/${id}`);
      
    } catch (error) {
      console.error("생성 중 에러 발생:", error);
      alert("롤링페이퍼 생성에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const getItemClassName = (type, value) => {
    const baseClass = type === 'color' ? styles.colorItem : styles.imageItem;
    if (selectedItem === value) {
      return baseClass + " " + styles.activeItem;
    }
    return baseClass;
  };

  const handleTabChange = (tab) => {
    setSelectedButton(tab);
    
    if (tab === "color") {
      setSelectedItem(colors[0]);
    } else if (tab === "image") {
      setSelectedItem(images[0]);
    }
  };

  const getButtonClass = (prop) => {
    return `${styles.baseButton} ${selectedButton === prop ? styles.selected : styles.unselected}`;
  };

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
          onBlur={() => setIsTouched(true)} 
          isError={isTitleError}
        />
      </div>
      <div className={styles.textBox}>
        <h1 className={styles.titleText}>배경화면을 선택해 주세요.</h1>
        <p className={styles.subText}>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
      </div>
      <div className={styles.buttonBox}>
        <Button
          className={getButtonClass("color")}
          onClick={() => handleTabChange("color")}
        >
          컬러
        </Button>
        <Button
          className={getButtonClass("image")}
          onClick={() => handleTabChange("image")}
        >
          이미지
        </Button>
      </div>
      {/* 리스트 영역 */}
      <ul className={styles.list}>
        {selectedButton === "color" &&
          colors.map((color) => (
            <li 
              key={color} 
              className={getItemClassName("color", color)}
              onClick={() => setSelectedItem(color)}
            >
              <div
                className={styles.colorBox}
                style={{ backgroundColor: color}}
              />
            </li>
          ))
        }

        {selectedButton === "image" &&
          images.map((src, idx) => (
            <li 
              key={idx} 
              className={getItemClassName("image", src)}
              onClick={() => setSelectedItem(src)}
            >
              <img src={src} alt={`이미지 ${idx + 1}`} />
            </li>
          ))
        }
      </ul>
      <div className={styles.createButton}>
        <Button 
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}

export default PostCreatePage;
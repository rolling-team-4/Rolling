import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import styles from './MessageWritePage.module.css';
import Input from '../components/common/Input';
import arrowIcon from '../assets/arrow.svg';
import Button from '../components/common/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const images = [
  { id: 1, url: 'https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png', title: '메인 사진' },
  { id: 2, url: 'https://picsum.photos/id/101/600/400', title: '건물' },
  { id: 3, url: 'https://picsum.photos/id/102/600/400', title: '과일' },
  { id: 4, url: 'https://picsum.photos/id/103/600/400', title: '들판' },
  { id: 5, url: 'https://picsum.photos/id/152/600/400', title: '보라색 꽃' },
  { id: 6, url: 'https://picsum.photos/id/111/600/400', title: '자동차' },
  { id: 7, url: 'https://picsum.photos/id/171/600/400', title: '빗 방울' },
  { id: 8, url: 'https://picsum.photos/id/112/600/400', title: '갈대' },
  { id: 9, url: 'https://picsum.photos/id/122/600/400', title: '밤 대교' },
  { id: 10, url: 'https://picsum.photos/id/135/600/400', title: '바다' },
];

const relClass = ['지인', '동료', '가족', '친구'];
const fontClass = ['Noto Sans', 'Pretendard', '나눔명조', '나눔손글씨 손편지체'];

const fontStyleMapping = {
  'Noto Sans': "'Noto Sans KR', sans-serif",
  'Pretendard': "Pretendard, -apple-system, sans-serif",
  '나눔명조': "'Nanum Myeongjo', serif",
  '나눔손글씨 손편지체': "'NanumHandwriting', cursive"
};

function MessageWritePage() {
  const [title, setTitle] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected1, setSelected1] = useState(relClass[0]);
  const [selected2, setSelected2] = useState(fontClass[0]);
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const recipientId = params.id;
  
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }]
    ],
  };
  const formats = [
    'bold', 'italic', 'underline',
    'align', 'list', 'bullet',
    'color' 
  ];
  
  const handleCreate = async () => {
    const contentText = new DOMParser().parseFromString(content, 'text/html').body.textContent || "";
    const postData = {
      sender: title,
      relationship: selected1,
      content: contentText,
      font: selected2,
      profileImageURL: selectedImg.url
    };

    try {
      const response = await axios.post(
        `https://rolling-api.vercel.app/22-4/recipients/${recipientId}/messages/`,
        postData
      );

      if (response.status === 201) {
        navigate(`/post/${recipientId}`);
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("메시지를 저장하지 못했습니다.");
    }
  };

  const isContentEmpty = (htmlContent) => {
    const d = new DOMParser().parseFromString(htmlContent, 'text/html');
    return doc.body.textContent.trim().length === 0;
  };

  const isButtonDisabled = title.trim() === '' || isContentEmpty(content);
  const isTitleError = isTouched && title.trim() === '';

  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);

  const handleSelect1 = (item) => {
    setSelected1(item);
    setIsOpen1(false);
  };
  const handleSelect2 = (item) => {
    setSelected2(item);
    setIsOpen2(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <Input
          id='from'
          label='From.'
          type='text'
          placeholder='이름을 입력해 주세요'
          value={title}
          onChange={handleChange}
          onBlur={() => setIsTouched(true)} 
          isError={isTitleError}
        />
      </div>
      <div className={styles.profile}>
        <p className={styles.mainText}>프로필 이미지</p>
        <div className={styles.profileBox}>
          <div className={styles.profileMainImage}>
            <img 
              src={selectedImg.url} 
              alt={selectedImg.title} 
            />
          </div>
          <div className={styles.imageListBox}>
            <p className={styles.subText}>프로필 이미지를 선택해주세요!</p>
            <div className={styles.imageList}>
              {images.map((img) => (
                <div 
                  key={img.id}
                  className={`${styles.item} ${selectedImg.id === img.id ? 'selected' : ''}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.relationship}>
        <p className={styles.mainText}>상대와의 관계</p>
        <button 
          type="button" 
          className={styles.relationshipButton}
          onClick={toggleDropdown1}
        >
          <p>{selected1}</p>
          <img src={arrowIcon} alt="화살표" className={`${styles.arrow} ${isOpen1 ? styles.rotate : ''}`} />
        </button>
        {isOpen1 && (
          <div className={styles.relationshipList}>
            {relClass.map((item, index) => (
              <p 
                key={index} 
                className={styles.relationshipItem} 
                onClick={() => handleSelect1(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={styles.textArea}>
        <p className={styles.mainText}>내용을 입력해 주세요</p>
        <div 
          className={styles.editor} 
          style={{ fontFamily: fontStyleMapping[selected2] }}
        >
          <ReactQuill 
            theme="snow" 
            modules={modules}
            formats={formats}
            value={content} 
            onChange={setContent} 
          />
        </div>
      </div>
      <div className={styles.fontSelect}>
        <p className={styles.mainText}>폰트 선택</p>
        <button 
          type="button" 
          className={styles.fontSelectButton}
          onClick={toggleDropdown2}
        >
          <p>{selected2}</p>
          <img src={arrowIcon} alt="화살표" className={`${styles.arrow} ${isOpen2 ? styles.rotate : ''}`} />
        </button>
        {isOpen2 && (
          <div className={styles.fontSelectList}>
            {fontClass.map((item, index) => (
              <p 
                key={index} 
                className={styles.fontSelectItem} 
                onClick={() => handleSelect2(item)}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={styles.createButton}>
        <Button 
          disabled={isButtonDisabled}
          onClick={handleCreate}
        >
          생성하기
        </Button>
      </div>
    </div>
  );
}

export default MessageWritePage;
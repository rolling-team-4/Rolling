import { useState } from 'react';

function PostCreatePage() {
  const [title, setTitle] = useState('');

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
    </div>
  );
}

export default PostCreatePage;
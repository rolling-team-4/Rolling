import React from 'react';
import MessageGrid from '../components/post/MessageGrid';

function PostEditPage() {
  return (
    <div>
      <MessageGrid isEditMode={true} />
    </div>
  );
}

export default PostEditPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';

import CardList from '../components/CardList/CardList.jsx';
import Button from '../components/common/Button';
import styles from './ListPage.module.css';
import CardContext from '../components/CardList/CardContext.js';
import { responseData } from '../components/CardList/getApiData.js';

const data = await responseData();

function ListPage() {
  const navigate = useNavigate();

  const popularList = [...data.results].sort(
    (a, b) => b.messageCount - a.messageCount
  );

  const recentList = [...data.results].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <CardContext.Provider value={data}>
      <div className={styles.listPage}>
          <h1 className={styles.title}>인기 롤링 페이퍼 🔥</h1>
          <CardList results={popularList}></CardList>
          <h1 className={styles.title}>최근에 만든 롤링 페이퍼 ⭐</h1>
          <CardList results={recentList}></CardList>
          <div className={styles.btnBox}><Button disabled={false} onClick={() => navigate('/post')}>나도 만들어보기</Button></div>
      </div>
    </CardContext.Provider>
  );
}

export default ListPage;
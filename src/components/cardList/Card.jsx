import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardList.module.css';
import ProfileImg from './ProfileImg.jsx';


function Card ({data}){
  const msgCnt = data.messageCount;
  const bgColor = data.backgroundColor;
  const bgUrl = data.backgroundImageURL;
  const bgCover = bgUrl? `linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1))`: '';
  const emoji = data["topReactions"];
  const profile = data.recentMessages;

  const bgList = {
    'beige' : styles.beige,
    'blue' : styles.blue,
    'purple' : styles.purple,
    'green' : styles.green,
  }

  return (
    <Link  
        to={`/post/${data.id}`} 
        className={`${styles.cardLink} ${bgList[bgColor]} ${bgUrl ? styles.hasImage : ""}`}
        style={{
            backgroundImage: `${bgCover}, url(${bgUrl})`,
            // backgroundColor: bgList[bgColor],
            color: bgUrl ? "#fff":"#000",
        }}
    >
        <div className={styles.card}>
            <p className={styles.cardTo}>To. {data.name}</p>
            <ProfileImg msgCnt={msgCnt} profile={profile}></ProfileImg>
            <p className={styles.totaltxt}><span>{msgCnt}</span>명이 작성했어요!</p>
            <div className={styles.reactions}>
                {emoji && emoji.length > 0 && (
                    <>
                    {emoji[0]?.count > 0 && (
                        <div className={styles.reactionBox}>
                        <span className={styles.emoji}>{emoji[0].emoji}</span>
                        {emoji[0].count}
                        </div>
                    )}
                    {emoji[1]?.count > 0 && (
                        <div className={styles.reactionBox}>
                        <span className={styles.emoji}>{emoji[1].emoji}</span>
                        {emoji[1].count}
                        </div>
                    )}
                    {emoji[2]?.count > 0 && (
                        <div className={styles.reactionBox}>
                        <span className={styles.emoji}>{emoji[2].emoji}</span>
                        {emoji[2].count}
                        </div>
                    )}
                    </>
                )}
            </div>
        </div>
    </Link>
  )
}


export default Card;
import { useState, useRef, useLayoutEffect } from "react";

import styles from "./CardList.module.css";
import Card from "./Card";

const SLIDES_PER_VIEW = 4;

function CardList({ results }) {
  const containerRef = useRef(null);

  const [scrollDistance, setScrollDistance] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // 초기 스크롤거리 계산
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    
    const card = container.querySelector(`.${styles.cardList} > *`);
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const cardListEl = container.querySelector(`.${styles.cardList}`);
    const cardListStyle = getComputedStyle(cardListEl);
    const gapPx = parseFloat(cardListStyle.gap) || 0;

    const distance = cardWidth * SLIDES_PER_VIEW + gapPx * SLIDES_PER_VIEW ;

    setScrollDistance(distance);

    const totalScroll = container.scrollWidth - container.clientWidth;
    setMaxScroll(totalScroll);

    setShowButtons(container.scrollWidth > container.clientWidth);

    // 초기 버튼 상태
    setIsAtStart(container.scrollLeft === 0);
    setIsAtEnd(container.scrollLeft >= totalScroll - 1);

    // 스크롤 이벤트로 연동
    const onScroll = () => {
      const current = container.scrollLeft;
      setIsAtStart(current <= 0);
      setIsAtEnd(current >= totalScroll - 1);
    };
    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, [results]);

  // 버튼 누르면 이동
  const handlePrev = () => {
    const container = containerRef.current;
    if (!container) return;

    const newPos = Math.max(container.scrollLeft - scrollDistance, 0);
    container.scrollTo({ left: newPos, behavior: "smooth" });
  };

  const handleNext = () => {
    const container = containerRef.current;
    if (!container) return;

    const newPos = Math.min(container.scrollLeft + scrollDistance, maxScroll);
    container.scrollTo({ left: newPos, behavior: "smooth" });
  };

  return (
    <div className={styles.cardListWrapper}>
      {showButtons && (
        <button
          className={`${styles.sldBtn} ${styles.prev}`}
          onClick={handlePrev}
          disabled={isAtStart}
        />
      )}
      
      <div className={styles.cardListCont} ref={containerRef}>
        <div className={styles.cardList}>
          {results.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      </div>

      {showButtons && (
        <button
          className={`${styles.sldBtn} ${styles.next}`}
          onClick={handleNext}
          disabled={isAtEnd}
        />
      )}
    </div>
  );
}

export default CardList;

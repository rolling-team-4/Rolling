const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY;

export const shareKakao = (realUrl) => {
  if (!window.Kakao) {
    alert("카카오톡 SDK가 로드되지 않았습니다.");
    return;
  }

  const kakao = window.Kakao;


  if (!kakao.isInitialized()) {
    kakao.init(KAKAO_KEY);
  }

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "롤링 페이퍼가 도착했어요! 🎁",
      description: "친구들이 남긴 소중한 메시지를 확인해보세요.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png", // 임시
      link: {
        mobileWebUrl: realUrl,
        webUrl: realUrl,
      },
    },
    buttons: [
      {
        title: "보러 가기",
        link: {
          mobileWebUrl: realUrl,
          webUrl: realUrl,
        },
      },
    ],
  });
};

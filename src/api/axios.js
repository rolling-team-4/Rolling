import axios from 'axios';

const instance = axios.create({
  // 기본 주소
  baseURL: 'https://rolling-api.vercel.app/22-4/', 
  // 타임아웃 설정 (5초 동안 응답 없으면 에러 처리)
  timeout: 5000,
});

export default instance;
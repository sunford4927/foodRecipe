import { useEffect } from "react";

// 새로고침 방지 함수
export const usePreventRefresh = () => {
    const preventClose = (e: any) => {
      e.preventDefault();
      e.returnValue = '';
    };
  
    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    useEffect(() => {
      (() => {
        window.addEventListener('beforeunload', preventClose);
      })();
  
      return () => {
        window.removeEventListener('beforeunload', preventClose);
      };
    });
  };
import { useState, useEffect } from 'react';

// const mediaQuery = useMediaQuery('(min-width: 600px)');

// 这个函数接收一个表示需要匹配设备屏幕尺寸的媒体查询字符串。
function useMediaQuery(query: string): Boolean {
  // 检查媒体查询是否与当前设备屏幕大小匹配，并将它存储在 initMatches 常量中。

  // const initMatches = window.matchMedia(query).matches;

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      console.log('handleChange');
      // setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  // 返回 "matches" state 变量，该变量保存了媒体查询导致的当前设备屏幕大小的结果。
  return matches;
}

export default useMediaQuery;

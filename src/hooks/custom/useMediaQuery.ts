import { useState, useEffect } from "react";

// 这个函数接收一个表示需要匹配设备屏幕尺寸的媒体查询字符串。
function useMediaQuery(query: string): Boolean {
  const initMatches = window.matchMedia(query).matches;
  console.log("initMatches:", initMatches);

  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      console.log("handleChange:", event.matches);
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);

  // 返回 "matches" state 变量，该变量保存了媒体查询导致的当前设备屏幕大小的结果。
  return matches;
}

export default useMediaQuery;

import {
  useTheme,
  // useMediaQuery
} from '@mui/material';
import useMediaQuery from '../custom/useMediaQuery';

export function useMedia() {
  const {
    breakpoints: {
      down,
      between,
      values: { lg, md, sm, xl, xs },
    },
  } = useTheme();

  // mui的实现
  // down(sm): @media (max-width:599.95px)
  const isXs = useMediaQuery(down(sm));
  const isSm = useMediaQuery(between(sm, md));
  const isMd = useMediaQuery(between(md, lg));
  const isLg = useMediaQuery(between(lg, xl));
  const isMobile = useMediaQuery(down(md));
  const isDesktop = !isMobile;

  // 自己的实现
  // const isXs = useMediaQuery('(max-width: 400px)');
  // const isSm = useMediaQuery(between(sm, md));
  // const isMd = useMediaQuery(between(md, lg));
  // const isLg = useMediaQuery(between(lg, xl));

  // const isMobile = useMediaQuery(down(md));

  return {
    isXs,
    isSm,
    isMd,
    isLg,
    isMobile,
    isDesktop,
  };
}

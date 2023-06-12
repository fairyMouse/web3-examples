import NextLink from 'next/link';
import { alpha, SxProps, Theme } from '@mui/material/styles';
import { Link, List, Paper, ListItem } from '@mui/material';
// @types
import { ParentItemProps, MegaMenuItemProps } from './types';

import Iconify from '../iconify';
import { StyledIcon } from './styles';
import { useRouter } from 'next/router';

const PARENT_ITEM_HEIGHT = 60;

type Props = {
  data: MegaMenuItemProps[];
  sx?: SxProps<Theme>;
};

export default function MenuDesktopVertical({ data, ...other }: Props) {
  return (
    <List disablePadding {...other}>
      {data.map(item => (
        <ParentItem
          key={item.title}
          title={item.title}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </List>
  );
}

function ParentItem({
  path = '',
  title,
  icon,
  isActive,
  hasSub,
  ...other
}: ParentItemProps) {
  const router = useRouter();

  const pathname = router.pathname || '/';
  const match = pathname.match(new RegExp(`^${path}$`));

  const activeStyle = {
    color: 'primary.main',
    bgcolor: (theme: Theme) =>
      alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
  };

  return (
    <ListItem
      // @ts-ignore
      href={path}
      component={NextLink}
      sx={{
        height: PARENT_ITEM_HEIGHT,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'text.primary',
        typography: 'subtitle1',
        textTransform: 'capitalize',
        transition: theme => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(match && activeStyle),
      }}
      {...other}
    >
      {icon && <StyledIcon>{icon}</StyledIcon>}
      {title}

      {hasSub && <Iconify icon="eva:chevron-right-fill" sx={{ ml: 1 }} />}
    </ListItem>
  );
}

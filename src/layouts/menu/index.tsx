import Logo from "@/src/components/logo/Logo";
import MenuDesktopVertical from "@/src/components/menu/MenuDesktopVertical";
import { Box, Stack, Typography } from "@mui/material";
import menuConfig from "./config";
import { NAV } from "@/src/constants/layouts";

const Menu = () => {
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: NAV.W_DASHBOARD,
      }}
    >
      <Stack
        sx={{
          height: "100%",
          bgcolor: "background.default",
          position: "fixed",
          left: 0,
          top: 0,
          width: NAV.W_DASHBOARD,
        }}
      >
        <Box
          sx={{
            py: 3,
            px: 2.5,
          }}
        >
          <Logo />
        </Box>
        <MenuDesktopVertical data={menuConfig} />
      </Stack>
    </Box>
  );
};

export default Menu;

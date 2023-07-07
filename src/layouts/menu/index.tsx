import Logo from "@/src/components/logo/Logo";
import MenuDesktopVertical from "@/src/components/menu/MenuDesktopVertical";
import { Stack, Typography } from "@mui/material";
import menuConfig from "./config";
import { NAV } from "@/src/constants/layouts";

const Menu = () => {
  return (
    <Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          py: 3,
          px: 2.5,
        }}
      >
        <Logo />
      </Stack>
      <MenuDesktopVertical data={menuConfig} sx={{ width: NAV.W_DASHBOARD }} />
    </Stack>
  );
};

export default Menu;

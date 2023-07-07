import { HEADER, NAV } from "@/src/constants/layouts";
import { AppBar, Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      sx={{
        height: HEADER.H_MAIN_DESKTOP,
        px: 5,
        width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
      }}
    >
      <Stack
        sx={{ height: "100%" }}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack flexDirection={"row"}></Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;

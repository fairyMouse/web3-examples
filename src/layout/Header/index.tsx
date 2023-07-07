import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Fade from "@mui/material/Fade";
const menu = [
  {
    path: "/",
    name: "NFT",
  },
];

export default function Header(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href={"/"}>
              <span style={{ width: "200px", cursor: "grabbing" }}>
                NFT全栈开发
              </span>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menu.map(m => (
              <Link href={m.path} key={m.name}>
                <Button sx={{ color: "#fff" }}>{m.name}</Button>
              </Link>
            ))}
            <Button
              sx={{ color: "#fff" }}
              onClick={() => window.open("https://qdwds.github.io/nftdocs/#/")}
            >
              docs
            </Button>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "white" }}
            >
              课程地址
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem
                onClick={() =>
                  window.open("https://learnblockchain.cn/course/31")
                }
              >
                登链社区
              </MenuItem>
              <MenuItem
                onClick={() =>
                  window.open("https://edu.51cto.com/course/33566.html")
                }
              >
                51cto（可开发票）
              </MenuItem>
              <MenuItem
                onClick={() =>
                  window.open(
                    "https://m.qlchat.com/api/gos?target=%2Fwechat%2Fpage%2Fchannel-intro%3FchannelId%3D2000019546152808%26ch_r%3DshareR1%26shareKey%3D32092306e23644dc8f74d65ceaf42031free%26sourceNo%3Dlink&pre=%2Fwechat%2Fpage%2Flive%2F2000019546239707%3FisBackFromShare%3DY%26wcl%3Dmiddlepage"
                  )
                }
              >
                千聊
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ marginLeft: 6 }}>{/* <ConnectButton /> */}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { Link } from "react-router-dom";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import WatchIcon from "@mui/icons-material/Watch";

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="d-flex flex-sm-column flex-row justify-content-center flex-wrap">
      <Link to="/category/0" className="mt-3 no-style p-3">
        <div className="d-flex text-center justify-content-around">
          گوشی
          <SmartphoneIcon />
        </div>
      </Link>
      <Link to="/category/2" className="mt-3 no-style p-3">
        <div className="d-flex text-center justify-content-around">
          لباس
          <CheckroomIcon />
        </div>
      </Link>
      <Link to="/category/1" className="mt-3 no-style p-3">
        <div className="d-flex text-center justify-content-around">
          ساعت
          <WatchIcon />
        </div>
      </Link>
      <Link to="/category/3" className="mt-3 no-style p-3">
        <div className="d-flex text-center justify-content-around">
          لپتاپ
          <LaptopMacIcon />
        </div>
      </Link>
    </div>
  );
}

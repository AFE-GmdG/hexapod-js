import React from "react";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";

const PageHeader: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLButtonElement>(null);

  const handleHamburgerMenuButtonClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
    },
    [],
  );

  const handleHamburgerMenuClose = React.useCallback(
    () => {
      setAnchorElement(null);
    },
    [],
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleHamburgerMenuButtonClick}
        >
          <MenuTwoToneIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hexapod
        </Typography>
      </Toolbar>
      <Menu
        id="hamburger-menu"
        anchorEl={anchorElement}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleHamburgerMenuClose}
      >
        <MenuItem>MenuItem #1</MenuItem>
        <MenuItem>MenuItem #2</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default PageHeader;

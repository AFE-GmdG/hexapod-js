import React from "react";

import { styled } from "@mui/material/styles";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";

const StyledBreadcrumbs = styled(Breadcrumbs)({
}, props => ({
  marginTop: props.theme.spacing(2),
}));

const MenuButton = styled(IconButton)({
}, props => ({
  color: props.theme.palette.getContrastText(props.theme.palette.primary.main),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "&:hover,&:active": {
    color: props.theme.palette.secondary.main,
  },
}));

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
    <header>
      <StyledBreadcrumbs
        separator={
          <ChevronRightTwoToneIcon />
        }
      >
        <MenuButton onClick={handleHamburgerMenuButtonClick}>
          <MenuTwoToneIcon />
        </MenuButton>
      </StyledBreadcrumbs>
      <Menu
        id="hamburger-menu"
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleHamburgerMenuClose}
      >
        <MenuItem>MenuItem #1</MenuItem>
        <MenuItem>MenuItem #2</MenuItem>
      </Menu>
    </header>
  );
};

export default PageHeader;

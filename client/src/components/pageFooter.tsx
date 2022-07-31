import React from "react";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const FlexFooter = styled<React.JSXElementConstructor<{ children: React.ReactNode }>>((props) => (
  <footer {...props}>
    {props.children}
  </footer>
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "row",
}));

const CopyrightBox = styled(Box)(({ theme }) => ({
  flex: "1 0 0px",
  padding: theme.spacing(1, 2),
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const PageFooter: React.FC = () => {
  return (
    <FlexFooter>
      <CopyrightBox>
        <Typography variant="body2">
          {"© 2022 - "}
          <Link
            href="https://afe-gmdg.de"
            target="_blank"
            rel="noreferrer"
            color="secondary"
          >
            AFE-GmdG
          </Link>
          {` - Hexapod Version: ${process.env.VERSION}`}
        </Typography>
      </CopyrightBox>
    </FlexFooter>
  );
};

export default PageFooter;

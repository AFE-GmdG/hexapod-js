import React from "react";

import { styled } from "@mui/material/styles";

import Led from "../components/hexapod/led";

import hexapodImageSource from "../assets/spider.png";

const LayoutGrid = styled<React.JSXElementConstructor<{ children: React.ReactNode }>>((props) => (
  <div {...props}>
    {props.children}
  </div>
))(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "600px 1fr",
  gridTemplateRows: "auto 1fr",
  gap: theme.spacing(1),
}));

const HexapodImage = styled((props) => (
  <img
    {...props}
    src={hexapodImageSource}
    alt="Hexapod"
    tabIndex={-1}
  />
))({
  gridColumn: "1",
  gridRow: "1",
  width: "100%",
});

const HexapodLed = styled(Led)({
  gridColumn: "2",
  gridRow: "1",
  alignSelf: "start",
  justifySelf: "start",
});

const Slash: React.FC = () => {
  return (
    <LayoutGrid>
      <HexapodImage />
      <HexapodLed />
    </LayoutGrid>
  );
};

export default Slash;

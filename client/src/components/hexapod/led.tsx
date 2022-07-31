import React from "react";

import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";

type LedLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const LedLayout = styled<React.JSXElementConstructor<LedLayoutProps>>((props) => (
  <div {...props}>
    {props.children}
  </div>
))(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "150px 120px",
  gridTemplateRows: "auto auto auto",
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const OnOffButton = styled(Button)({
  gridColumn: 2,
  grodRow: 1,
});

type LedProps = {
  className?: string;
};

const Led: React.FC<LedProps> = ({
  className = "",
}) => {
  const [isOn, setIsOn] = React.useState(false);

  const handleOnOffClick = () => {
    setIsOn((current) => !current);
  };

  return (
    <LedLayout className={className}>
      Led
      <OnOffButton
        variant="contained"
        color={isOn ? "success" : "error"}
        onClick={handleOnOffClick}
      >
        {isOn ? "Switch Off" : "Switch On"}
      </OnOffButton>
    </LedLayout>
  );
};

export default Led;

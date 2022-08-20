import React from "react";

type AppProps = {
  name: string;
};

const App: React.FC<AppProps> = ({
  name,
}) => {
  return (
    <box width={17} height="100%">
      {`Hello, ${name}!`}
    </box>
  );
}

export default App;

import React, {useState} from "react";
import HookedApp from "./HookedMarketDataApp";
import HooklessApp from "./HooklessMarketDataApp";

function useToggler(isInitiallyOn) {
  const [on, setOn] = useState(isInitiallyOn);
  const toggleOnOff = () => setOn(!on);
  return [on, toggleOnOff];
}

function App() {
  const [showFirstOption, toggleOption] = useToggler(false);

  return(
    <div>
      <button style={{display: "inline-block"}} onClick={toggleOption}>Change React App Type</button>
       {showFirstOption
      ? <HookedApp />
      : <HooklessApp />
      }
    </div>
  );
}

export default App;
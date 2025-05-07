import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useCurrentTab } from "../contexts/CurrentTabContext";
const ToggleButtons = () => {
  const { currentTab, setCurrentTab } = useCurrentTab();
  const handleToggleMenuGroup = (event) => {
    const value = event.target.value;
    setCurrentTab(value);
  };

  return (
    <>
      <ToggleButtonGroup
        value={currentTab}
        exclusive
        onChange={handleToggleMenuGroup}
        aria-label="text alignment"
        style={{ direction: "ltr", display: "" }}
      >
        <ToggleButton value="non-completed">غير منجز</ToggleButton>
        <ToggleButton value="completed">منجز</ToggleButton>
        <ToggleButton value="all">الكل</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleButtons;

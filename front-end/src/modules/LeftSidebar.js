import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AddBox from "@material-ui/icons/AddBox";
import Menubar from "./MenuBar";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    // 상,하 Drawer에서 사용
    width: "auto",
  },
});

// 왼쪽 사이드바 module
export default function LeftSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    anchor: "left",
  });

  // 상,하 Drawer에서 적용
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // 컨텐츠
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Menubar />
    </div>
  );

  return (
    <div>
      <React.Fragment key={state.anchor}>
        <Button
          onClick={toggleDrawer(state.anchor, true)}
          startIcon={<AddBox />}
          color="inherit"
          size="large"
        ></Button>
        <Drawer
          anchor={state.anchor}
          open={state[state.anchor]}
          onClose={toggleDrawer(state.anchor, false)}
        >
          {list(state.anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

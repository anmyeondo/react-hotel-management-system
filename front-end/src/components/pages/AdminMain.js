import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "./Header";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
    border: "3px solid black",
  },
  tablecelling: {
    align: "center",
  },
});

class AdminMain extends React.Component {
  render() {
    return (
       <div>
        <Header checkPermission={this.props.checkPermission} idx={0} />
        <img src="https://ifh.cc/g/waBuix.jpg" alt="Image" style={{width: "1920px", height: "901px"}}/>
      </div>
    );
  }
}

export default withStyles(styles)(AdminMain);

import React from "react";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
// import RestaurantModifyDialog from './RestaurantModifyDialog';
// import RestaurantMoreInfoDialog from './RestaurantMoreInfoDialog';
// import RestaurantDeleteBtn from './RestaurantDeleteBtn';

const Styles = theme => ({
  thirdary: {
    // This is green.A700 as hex.
    main: '#81c784',
  },
});

class RestaurantInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MoreInfoisOpen: false,
      RestaurantModifyisOpen: false,
    };
    this.closeMoreInfoDialog = this.closeMoreInfoDialog.bind(this);
    this.InfoRestaurantBtnOnclick = this.InfoRestaurantBtnOnclick.bind(this);
    this.ModifyRestaurantBtnOnclick = this.ModifyRestaurantBtnOnclick.bind(this);
    this.closeRestaurantModifyDialog = this.closeRestaurantModifyDialog.bind(this);
  }

  //Info
  closeMoreInfoDialog = () => {
    console.log("값이 변경됨");
    this.setState({ RestaurantMoreInfoisOpen: false });
    console.log(this.state);
  };

  InfoRestaurantBtnOnclick = () => {
    this.setState({ RestaurantMoreInfoisOpen: true });
    console.log(this.state);
  };

  //Modify
  ModifyRestaurantBtnOnclick = () => {
    console.log("test");
    this.setState({ RestaurantModifyisOpen: true });
    console.log(this.state);
  };

  closeRestaurantModifyDialog = () => {
    console.log("값이 변경됨");
    this.setState({ RestaurantModifyisOpen: false });
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.HOTEL_Name}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Restaurant_Name}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Open_Time.slice(undefined, 5)}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
          <strong style={{ textJustify: "center" }}>
            {this.props.data.Close_Time.slice(undefined, 5)}
          </strong>
        </TableCell>
        <TableCell className={classes.tablecelling}>
        <Button onClick={this.InfoReservationBtnOnclick} color="primary" variant="contained" >
            상세 정보
          </Button>
          </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(Styles)(RestaurantInfoRow);

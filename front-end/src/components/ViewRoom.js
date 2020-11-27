import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  paper: {
    backgroundColor: 'white',
    border: '1px solid rgba(0, 0, 0, 0.20)',
    borderRadius: '8px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.20)',
  },
  header: {
      borderRadius: '5px 5px 0px 0px',
      overflow: 'hidden',
      height: "20px",
  },
  footer: {
    margin: '20px',
  },
});

const room_state = [
  { background: 'red',},
  { background: 'green',},
  { background: 'yellow',},
]


const inRange = (pday, fday) => {
  var today = new Date();
  var past = new Date(pday);
  var future = new Date(fday);

  return past <= today && today <= future;
}

class ViewRoom extends Component {
  constructor(props){
    super(props)
  }
  render() {
    var statue = 'checkout'
    for(var i=0; i < this.props.reservation.length; i++){
      if(this.props.reservation[i].Room_Num !== this.props.data.Room_Num)
        continue;
      else {
        if(inRange(this.props.reservation[i].Check_In, this.props.reservation[i].Check_Out) && this.props.data.Occupied){
          statue = 'occupied';
        } else if(inRange(this.props.reservation[i].Check_In, this.props.reservation[i].Check_Out) && !this.props.data.Occupied){
          statue = 'unoccupied';
        }
      }
    }
    console.log(this.props.data.Room_Num, room_state)
    const { classes } = this.props;
    return (
        <Paper className={classes.paper}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              {statue === 'occupied' && <div className={classes.header} style={room_state[0]}></div>}
              {statue === 'checkout' && <div className={classes.header} style={room_state[1]}></div>}
              {statue === 'unoccupied' && <div className={classes.header} style={room_state[2]}></div>}
            </Grid >
            <Grid item xs={12} sm container>
              <Grid item  container direction="column" spacing={2} className={classes.footer}>
                <Grid item xs>
                  <Typography align='center' gutterBottom variant="subtitle1">
                    {this.props.data.Room_Num}
                  </Typography>
                  <Typography align='center' variant="body2" gutterBottom >
                    {this.props.data.Room_Type}
                  </Typography>
                </Grid>
                <Grid item container justify="center">
                  <Button variant="outlined" color="primary">
                    상세 정보
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
    );
  }
}

export default withStyles(styles)(ViewRoom);
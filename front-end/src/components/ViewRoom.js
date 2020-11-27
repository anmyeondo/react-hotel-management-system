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
      borderRadius: '8px 8px 0px 0px',
      overflow: 'hidden',
      height: "20px",
  },
  footer: {
    margin: '20px',
  },
});
  
class ViewRoom extends Component {
    constructor(props){
        super(props)    
    }
    render() {
        const { classes } = this.props;
        const red = { background: 'red',}
        const green = { background: 'green',}

        return (
            <Paper className={classes.paper}>
              <Grid container spacing={2} direction='column'>
                <Grid item >
                  <div className={classes.header} style={this.props.data.Is_Available ? green : red }></div>
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
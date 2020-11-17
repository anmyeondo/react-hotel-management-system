import React, {useState, useEffect} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Stafftest from './components/Stafftest'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  root: {
  width: "100%",
  marginTop: theme.spacing.unit * 3,
  overflowX: "auto"
  },
  table: {
  minWidth: 1080
  }
});
  
const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/48/48/1',
  'name': '엄태호',
  'birthday': '961222',
  'gender': '남자',
  'job': '응원단장'
  },
  {
  'id': 2,
  'image': 'https://placeimg.com/48/48/2',
  'name': '김승현',
  'birthday': '960508',
  'gender': '남자',
  'job': '백엔드'
  },
  {
  'id': 3,
  'image': 'https://placeimg.com/48/48/3',
  'name': '김재훈',
  'birthday': '961127',
  'gender': '남자',
  'job': '프론트'
  }
]
  
class Customer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header idx={1}/>
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="조회"/>
          <Tab textColor="inherit" label="배정" />
          <Tab  textColor="inherit" label="추가" />
        </Tabs>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {customers.map(c => {
              return <Stafftest key={c.id } id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Customer);
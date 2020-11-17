import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StaffDeleteBtn from './StaffDeleteBtn'

class StaffInfoRow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <TableRow>
            <TableCell>{this.props.Hotel_ID}</TableCell>
            <TableCell>{this.props.Code}</TableCell>
            <TableCell>{this.props.Inform_ID}</TableCell>
            <TableCell>{this.props.Rank}</TableCell>
            <TableCell>{this.props.Bank}</TableCell>
            <TableCell>{this.props.Account}</TableCell>
            <TableCell>{this.props.Salary}</TableCell>
            <TableCell>{this.props.RegDate}</TableCell>
            <TableCell align='center'><StaffDeleteBtn ID={this.props.ID} refreshTable={this.props.refreshTable}/></TableCell>
        </TableRow>
        )
    }
}

export default StaffInfoRow;

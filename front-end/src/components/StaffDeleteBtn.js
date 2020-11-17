import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class StaffDeleteBtn extends React.Component {
    constructor(props){
        super(props);
    }

deleteStaff = async (id) =>{
    await axios ({
        method: "get",
        url: "/staffs/del",
        params: {
            id: id,
        }
    });
    this.props.refreshTable();
}

render() {
    return (
        <Button onClick={(e) => {this.deleteStaff(this.props.ID)}} color="secondary" variant="contained" >삭제</Button>
    )
    }
}

export default StaffDeleteBtn;
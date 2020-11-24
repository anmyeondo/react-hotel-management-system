import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class CustomerDeleteBtn extends React.Component {

    deleteCustomer = async (customerID, infoID) =>{
        await axios ({
            method: "get",
            url: "/customers/del",
            params: {
                customerID: customerID,
                infoID: infoID,
            }
        }).then(() => {
            this.props.refreshTable();
        });
    }

    render() {
        return (
            <Button onClick={(e) => {this.deleteCustomer(this.props.customerID, this.props.infoID)}} color="secondary" variant="contained" >삭제</Button>
        )
    }
}

export default CustomerDeleteBtn;
import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class OrderDeleteBtn extends React.Component {

    deleteOrder = async (orderID) =>{
        await axios ({
            method: "get",
            url: "/orders/del",
            params: {
                orderID: orderID,
            }
        }).then(() => {
            this.props.refreshTable();
        });
    }

    render() {
        return (
            <Button onClick={(e) => {this.deleteOrder(this.props.orderID)}} color="secondary" variant="contained" >삭제</Button>
        )
        }
    }

export default OrderDeleteBtn;
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

class ListOrderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders : [],
            currentPage : 1,
            maxResults: 10
        }
    }

    addOrder(){
        this.props.history.push('/add-order')
    }

    render(){
        return(
            <div>
                <h3 className="text">Orders</h3>
                <div className="row">
                    <div>
                        <Button variant="primary" style={{float : 'right'}} onClick={() => this.addOrder()}>Create Order</Button>
                    </div>
                </div>
                <br></br>
                <table className="table table-bordered">
                    <thead> 
                        <tr className="table-active">
                            <th className="text-center">Consumer</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(order =>
                                <tr key={order.id}>
                                    <td className="text-center">{order.consumer}</td>
                                    <td className="text-center">{order.status}</td>
                                    <td className="text-center">{order.date}</td>
                                    <td className="text-center">{order.totalAmount}</td>
                                    <td className="text-center">
                                        <Button variant="link" style={{textDecoration : "unset" }} onClick={() => this.editProduct(order.id)}> Edit</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    
                </table>

            </div>
        )
    }

}
export default ListOrderComponent;
import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";
import Select from 'react-select'
import ProductService from '../../service/ProductService';


class AddOrderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            costumer: '',
            status: '',
            date: '',
            totalAmount: '',
            subtotal: '',
            cityTax: '',
            countryTax: '',
            stateTax: '',
            federalTax: '',
            taxTotal: '',
            totalAmount: '',
            products: [],
            productsActive: [{ "value": 0, "label": '' }],
            isOpen: false,
            data: '',
            productId: '',
            productName: '',
            quantity: '',
            cost: '',
            unitPrice: '',
            nameProduct: ''
        }
    }

    openModal = () => {
        this.setState({ isOpen: true })
        this.state.productsActive = []
        this.loadProductList();
    };
    closeModal = () => {
        this.setState({ isOpen: false });
    };

    loadProductList() {
        ProductService.getListProductActive()
            .then((res) => {
                const options = res.data.products.map(c => ({
                    "value": c.id,
                    "label": c.name,
                    "unitPrice" : c.unitPrice
                }))
                this.setState({ productsActive: options })
            })
            .catch((error) => {

            })
    }

    handleChange(e) {
        this.setState({ productId: e.value, productName: e.label, unitPrice : e.unitPrice })

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        
        
    calcular(){
        if(this.state.unitPrice>0 &&  this.state.quantity > 0){
            this.setState({ cost : this.state.unitPrice * this.state.quantity}) 
        }  
    }

    render() {
        return (
            <div>
                <h3 className='text'>Order N° </h3>
                <br />
                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className='col-sm-6'>
                                <div className='row'>
                                    <div className="col-sm-4">
                                        <label className="col-form-label">Customer</label>
                                    </div>
                                    <div className="col-sm-8" style={{ float: "right" }}>
                                        <input type="text" name="customer" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <div className="row">
                            <div className='col-sm-6'>
                                <div className='row'>
                                    <div className="col-sm-4">
                                        <label className="col-form-label">Status</label>
                                    </div>
                                    <div className="col-sm-8" style={{ float: "right" }}>
                                        <input type="text" name="status" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <div className="row">
                            <div className='col-sm-6'>
                                <div className='row'>
                                    <div className="col-sm-4">
                                        <label className="col-form-label">Date</label>
                                    </div>
                                    <div className="col-sm-8" style={{ float: "right" }}>
                                        <input type="text" name="date" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <table className="table table-bordered">
                        <thead>
                            <tr className="table-active">
                                <th className="text-center">Name</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Unit Price</th>
                                <th className="text-center">Cost</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(product =>
                                    <tr key={product.id}>
                                        <td className="text-center">{product.name}</td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="text-center">{product.unitPrice}</td>
                                        <td className="text-center">{product.cost}</td>
                                        <td className="text-center">
                                            <Button variant="link" style={{ textDecoration: "unset" }} onClick={() => this.deleteProduct(product.id)}> Delete</Button>
                                            <Button variant="link" style={{ textDecoration: "unset" }} onClick={() => this.editProduct(product.id)}> Edit</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <div className="row">
                        <div>
                            <Button variant="primary" style={{ float: 'right' }} onClick={this.openModal}>Add Item</Button>
                            <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <div className="form-group">
                                            <label>Product</label>
                                            <Select options={this.state.productsActive} onChange={this.handleChange.bind(this)}></Select>
                                        </div>
                                        <div className="form-group">
                                            <label>Unit price</label>
                                            <input disabled type="text" name="unitPrice" className="form-control" defaultValue={this.state.unitPrice} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="text" name="quantity" className="form-control" defaultValue={this.state.quantity} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Cost</label>
                                            <input type="text" disabled name="cost" className="form-control" value={this.state.cost}></input>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => this.closeModal()}>
                                        Add Product
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>

                </form>

                <div className='row'>
                    <div className='col-sm-8'>
                    </div>
                    <div className='col-sm-4'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ fontWeight: "bold" }}>Subtotal</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ fontWeight: "bold" }}>Taxes</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ paddingLeft: '10px' }}>Total City Tax</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ paddingLeft: '10px' }}>Total Country Tax</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ paddingLeft: '10px' }}>Total State Tax</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ paddingLeft: '10px' }}>Total Federal Tax</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ fontWeight: "bold" }}>Total Taxes</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <label className="col-form-label" style={{ fontWeight: "bold" }}>Total</label>
                            </div>
                            <div className='col-sm-6'>
                                <label className="col-form-label"></label>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default AddOrderComponent;
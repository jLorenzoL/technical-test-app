import React, { Component } from 'react'
import Select from 'react-select'
import ProductService from '../../service/ProductService'
import DropdownComponent from '../../share/DropdownComponent'

class AddProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            category : '',
            unitPrice : '',
            status : '',
            listCategory : [],
            id: '',
            value : ''
        }
        this.saveProduct = this.saveProduct.bind(this);
    }

    componentDidMount(){
        this.loadCategoryList();
    }

    async loadCategoryList(){
        const data = [ 
            {
                "id" : 1,
                "description" : "Cookies"
            },
            {
                "id" : 2,
                "description" : "Candies"
            },
            {
                "id" : 3,
                "description" : "Cakes"
            },
            {
                "id" : 4,
                "description" : "Desserts"
            },
            {
                "id" : 5,
                "description" : "Drinks"
            }
        ]

        const options = data.map(c=>({
            "value" : c.id,
            "label" : c.description
        }))
        this.setState({listCategory: options})
    }

    saveProduct = (e) => {
        e.preventDefault();
        let product = {
            name : this.state.name,
            unitPrice : this.state.unitPrice,
            state : this.state.state,
            category : this.state.category
        }
        ProductService.addProduct(product)
                        .then((res) => {
                            this.setState({message : 'Product has been added successfully.'});
                            this.props.history.push('/products')
                        })
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleChange(e){
        this.setState({category:e.value})
        }

    render(){
        return(
            <div>
                <h3 className="text">New Product</h3>
                <form>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="name" className="form-control" defaultValue={this.state.name} onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Category</label>
                        <Select options={this.state.listCategory} onChange={this.handleChange.bind(this)}></Select> 
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" name="unitPrice" className="form-control" value={this.state.unitPrice} onChange={this.onChange}/>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Status</label>
                        <input type="text" name="salary" className="form-control" value={this.state.status} onChange={this.onChange}/>
                    </div>
                    <br/>
                    <button className="btn btn-success" onClick={this.saveProduct}>Save</button>
                </form>
            </div>
        );
    }
}

export default AddProductComponent;
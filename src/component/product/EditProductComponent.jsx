import React, { Component } from 'react'
import ProductService from "../../service/ProductService";
import Select from 'react-select'

class EditProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            unitPrice : '',
            category : '',
            status : '',
            listCategory : [],
            listState : []
        }
        //this.saveProduct = this.saveProduct.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount(){
        this.loadCategoryList();
        this.loadStateList()
        this.loadProduct();
        
    }

    loadProduct(){
        ProductService.getProductById(window.localStorage.getItem("id"))
                      .then((res) => {
                          let product = res.data.product;
                          this.setState({
                              id : product.id,
                              name : product.name,
                              unitPrice : product.unitPrice,
                              state : product.state,
                              category : product.category
                          })

                          


                      })
                      
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

    loadStateList(){
        const data = [ 
            {
                "id" : 0,
                "description" : "Incative"
            },
            {
                "id" : 1,
                "description" : "Active"
            }
        ]

        const options = data.map(c=>({
            "value" : c.id,
            "label" : c.description
        }))
        this.setState({listState: options})
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    handleChange(e){
        this.setState({category:e.value, description:e.label})
    }
    
    updateProduct = (e) => {
        e.preventDefault();
        let product = {
            id : this.state.id,
            name : this.state.name,
            unitPrice : this.state.unitPrice,
            state : this.state.state,
            category : this.state.category
        }
        ProductService.updateProduct(product)
                        .then((res) => {
                            this.setState({message : 'Product modified successfully.'});
                            localStorage.clear();
                            this.props.history.push('/products')
                        })
    }



    render(){
        return (
            <div>
                <h2 className="text-center">Edit Product</h2>
                <form>

                    <div className="form-group">
                        <label>Product Name:</label>
                        <input type="text" name="name" className="form-control" defaultValue={this.state.name} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <Select options={this.state.listCategory} onChange={this.handleChange.bind(this)}></Select> 
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" name="unitPrice" className="form-control" value={this.state.unitPrice} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Status:</label>
                        {/* <input type="text" name="salary" className="form-control" value={this.state.status} onChange={this.onChange}/> */}
                        <Select options={this.state.listState} onChange={this.handleChange.bind(this)}></Select> 
                    </div>
                    <br/>
                    <button className="btn btn-success " onClick={this.updateProduct}>Update</button>
                </form>
            </div>
        )
    }

}

export default EditProductComponent;
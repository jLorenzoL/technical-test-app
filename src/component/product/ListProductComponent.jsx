import React, { Component } from "react";
import ProductService from "../../service/ProductService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";
class ListProductComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            currentPage: 1,
            maxResults: 10
        }
        this.reloadProductList = this.reloadProductList.bind(this);
    }

    componentDidMount() {
        this.findAllProducts(this.state.currentPage);
    }

    reloadProductList() {
        ProductService.fetchProducts()
            .then((res) => {
                this.setState({products: res.data.result.products})
            });
    }

    findAllProducts(currentPage){
        currentPage -= 1;
        ProductService.fetchProducts(this.state.maxResults, currentPage, true)
                      .then((res) => {
                        this.setState({
                            products : res.data.result.products,
                            totalPages : res.data.totalPages,
                            totalElements : res.data.totalElements,
                            //currentPage : currentPage+1
                        })
                      })
                      .catch((error) => {

                      })
    }

    editProduct(id) {
        window.localStorage.setItem("id", id);
        this.props.history.push('/edit-product');
    }

    deleteProduct(id){
        ProductService.deleteProduct(id)
            .then(res => {
                this.setState({message : 'Product deleted successfully.'});
                this.setState({products: this.state.products.filter(product => product.id !== id)});
            })
    }

    addProduct(){
        window.localStorage.removeItem("id");
        this.props.history.push('/add-product')
    }

    returnCategoryDescription(category){
        switch(category){
            case 1:
                return 'Cookie'
            case 2:
                return 'Candies'
            case 3:
                return 'Cakes'
            case 4:
                return 'Desserts'
            case 5:
                return 'Drinks'
            return;
            break;
        }
    }

    render(){
        return(
            <div>
                <h3 className="text">Products</h3>
                <div className="row">
                    <div>
                        <Button variant="primary" style={{float : 'right'}} onClick={() => this.addProduct()}>Create Product</Button>
                    </div>
                </div>
                <br></br>
                <Table className="table table-bordered">
                    <thead> 
                        <tr className="table-active">
                            <th className="text-center">N°</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map(
                        product =>
                                    <tr key={product.id}>
                                        <td className="text-center">{this.state.products.indexOf(product) + 1}</td>
                                        <td className="text-center">{product.name}</td>
                                        <td className="text-center">{this.returnCategoryDescription(product.category)}</td>
                                        <td className="text-center">{'$ ' +  product.unitPrice}</td>
                                        <td className="text-center">{product.state == true ? 'Active' : 'Inactive' }</td>
                                        <td className="text-center">
                                            <Button variant="link" style={{textDecoration : "unset" }} onClick={() => this.deleteProduct(product.id)}> Delete</Button>
                                            <Button variant="link" style={{textDecoration : "unset" }} onClick={() => this.editProduct(product.id)}> Edit</Button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                    {/* <tfoot>
                        <nav aria-label="...">
                            <ul class="pagination">
                                <li class="page-item disabled">
                                <span class="page-link">Previous</span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item active" aria-current="page">
                                <span class="page-link">2</span>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </tfoot> */}
                </Table>

            </div>
        )
    }
}

export default ListProductComponent;
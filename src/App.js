import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar'
import ListProductComponent from './component/product/ListProductComponent';
import EditProductComponent from './component/product/EditProductComponent';
import AddProductComponent from './component/product/AddProductComponent';
import { Container, Nav } from 'react-bootstrap';
import ListOrderComponent from './component/order/ListOrderComponent'
import AddOrderComponent from './component/order/AddOrderComponent';

function App() {

  return (
    <div className='p-2'>
      <div className="container mt-3">

        <Router>
          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand href="/">BLAZE</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <br />
          <Switch>
            <Route path="/orders" component={ListOrderComponent} />
            <Route path="/add-order" component={AddOrderComponent} />
            <Route path="/" exact component={ListProductComponent} />
            <Route path="/products" component={ListProductComponent} />
            <Route path="/edit-product" component={EditProductComponent} />
            <Route path="/add-product" component={AddProductComponent} />
          </Switch>
        </Router>

      </div>
    </div>
  )

}

export default App;

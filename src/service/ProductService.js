import axios from 'axios';

const USER_API_BASE_URL = 'http://technicaltestfractal-env.eba-hwpk66ap.us-east-1.elasticbeanstalk.com/';

class ApiService {

    fetchProducts(maxResults, page, state) {
        
        return axios.post(USER_API_BASE_URL + 'products', 
        {maxResults : maxResults, page : page, paginate: state});
    }

    getProductById(productId){
        return axios.get(USER_API_BASE_URL + 'product' + '/' + productId)
    }

    fetchUserById(userId) {
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateProduct(product){
        return axios.post(USER_API_BASE_URL + 'update', 
                { 
                    id : product.id,
                    name : product.name,
                    category : product.category,
                    state : product.state,
                    unitPrice : product.unitPrice
                });
    }

    deleteProduct(id){
        return axios.post(USER_API_BASE_URL + 'delete', { id: id});
    }

    addProduct(product){
        return axios.post(USER_API_BASE_URL + 'saveProduct', product);
    }

    getListProductActive(){
        return axios.post(USER_API_BASE_URL + 'listProductActive');
    }

}

export default new ApiService();
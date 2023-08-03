import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/products";
const userToken = localStorage.getItem('userToken');
//pretvori u async

export const getAllProducts = async(pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
    if(searchValue === '') {
        return await axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return await axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getAllProductsByBrand = async(pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string, brandName: string) => {
    if(searchValue === '') {
        return await axios.get(API_URL + "/brand/" + brandName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return await axios.get(API_URL + "/brand/" + brandName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getAllProductsByCategory = async(pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string, categoryName: string) => {
    if(searchValue === '') {
        return await axios.get(API_URL + "/category/" + categoryName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return await axios.get(API_URL + "/category/" + categoryName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getProductStatistics = async (productId:string) => {
    return await axios.get(API_URL + "/product-information/" + productId, {headers: { Authorization: `${userToken}` }});
}

export const createNewProduct = async(newProduct: any ) => {
    return await axios.post(API_URL, newProduct, { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}

export const getProductById = async (productId: string) => {
    return await axios.get(API_URL + "/" + productId, { headers: { Authorization: `${userToken}` } });
}

export const deleteProduct = async(productId: string) => {
    return await axios.delete(API_URL + "/" + productId, { headers: { Authorization: `${userToken}` } });
}

export const updateProduct = async(newProduct: any) => {
    return await axios.put(API_URL + "/" + newProduct.id, newProduct , { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}


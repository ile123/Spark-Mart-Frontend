import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/products";
const userToken = localStorage.getItem('userToken');
//pretvori u async

export const getAllProducts = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
    if(searchValue === '') {
        return axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getAllProductsByBrand = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string, brandName: string) => {
    if(searchValue === '') {
        return axios.get(API_URL + "/brand/" + brandName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return axios.get(API_URL + "/brand/" + brandName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getAllProductsByCategory = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string, categoryName: string) => {
    if(searchValue === '') {
        return axios.get(API_URL + "/category/" + categoryName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return axios.get(API_URL + "/category/" + categoryName + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const createNewProduct = (newProduct: any ) => {
    return axios.post(API_URL, newProduct, { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}

export const getProductById = (productId: string) => {
    return axios.get(API_URL + "/" + productId, { headers: { Authorization: `${userToken}` } });
}

export const deleteProduct = (productId: string) => {
    return axios.delete(API_URL + "/" + productId, { headers: { Authorization: `${userToken}` } });
}

export const updateProduct = (newProduct: any) => {
    return axios.put(API_URL + "/" + newProduct.id, newProduct , { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}
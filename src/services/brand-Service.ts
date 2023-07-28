import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/brands";
const userToken = localStorage.getItem('userToken');
//pretvori u async

export const getAllBrands = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
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

export const createNewBrand = (newBrand: any ) => {
    return axios.post(API_URL, newBrand, { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}

export const getBrandById = (brandId: string) => {
    return axios.get(API_URL + "/" + brandId, { headers: { Authorization: `${userToken}` } });
}

export const deleteBrand = (brandId: string) => {
    return axios.delete(API_URL + "/" + brandId, { headers: { Authorization: `${userToken}` } });
}

export const updateBrand = (newBrand: any) => {
    return axios.put(API_URL + "/" + newBrand.id, newBrand , { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}
import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/brands";
const userToken = localStorage.getItem('userToken');
//pretvori u async

export const getAllBrands = async(pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
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

export const createNewBrand = async(newBrand: any ) => {
    return await axios.post(API_URL, newBrand, { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}

export const getBrandById = async(brandId: string) => {
    return await axios.get(API_URL + "/" + brandId, { headers: { Authorization: `${userToken}` } });
}

export const deleteBrand = async(brandId: string) => {
    return await axios.delete(API_URL + "/" + brandId, { headers: { Authorization: `${userToken}` } });
}

export const updateBrand = async(newBrand: any) => {
    return await axios.put(API_URL + "/" + newBrand.id, newBrand , { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}
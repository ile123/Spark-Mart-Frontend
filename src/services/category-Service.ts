import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/categories";
const userToken = localStorage.getItem('userToken');
//pretvori u async

export const getAllCategories = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
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

export const createNewCategory = (newCategory: any ) => {
    return axios.post(API_URL, newCategory, { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}

export const getCategoryById = (categoryId: string) => {
    return axios.get(API_URL + "/" + categoryId, { headers: { Authorization: `${userToken}` } });
}

export const deleteCategory = (categoryId: string) => {
    return axios.delete(API_URL + "/" + categoryId, { headers: { Authorization: `${userToken}` } });
}

export const updateCategory = (newCategory: any) => {
    return axios.put(API_URL + "/" + newCategory.id, newCategory , { headers: { Authorization: `${userToken}`, 'Content-Type': 'multipart/form-data' } });
}
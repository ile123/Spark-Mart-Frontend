import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/addresses";
const userToken = localStorage.getItem('userToken');

export const getAllAddresses = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
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

export const getAddressById = (addressId: string) => {
    return axios.get(API_URL + "/" + addressId, { headers: { Authorization: `${userToken}` } });
}

export const createNewAddress = (newAddress: any) => {
    return axios.post(API_URL, newAddress, { headers: { Authorization: `${userToken}` } });
}

export const getAllUsersByAddress = (id: string, pageNum: number, pageSize: number, sortBy: string, sortDir: string) => {
    return axios.get(API_URL + "/" + "get-all-users-by-address" + "/" + id + '?page=' + pageNum 
        + '&pageSize=' + pageSize 
        + '&sortBy=' + sortBy 
        + '&sortDir=' + sortDir
        , { headers: { Authorization: `${userToken}` } });
    }
    
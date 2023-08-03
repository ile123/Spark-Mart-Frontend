import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/addresses";
const userToken = localStorage.getItem('userToken');

export const getAllAddresses = async (pageNum: number, pageSize: number, sortBy: string, sortDir: string, searchValue: string) => {
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

export const getAddressById = async(addressId: string) => {
    return await axios.get(API_URL + "/" + addressId, { headers: { Authorization: `${userToken}` } });
}

export const createNewAddress = async(newAddress: any) => {
    return await axios.post(API_URL, newAddress, { headers: { Authorization: `${userToken}` } });
}

export const getAllUsersByAddress = async(id: string, pageNum: number, pageSize: number, sortBy: string, sortDir: string) => {
    return await axios.get(API_URL + "/" + "get-all-users-by-address" + "/" + id + '?page=' + pageNum 
        + '&pageSize=' + pageSize 
        + '&sortBy=' + sortBy 
        + '&sortDir=' + sortDir
        , { headers: { Authorization: `${userToken}` } });
    }
    
import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/customer";
const userToken = localStorage.getItem('userToken');

export const saveOrRemoveUserWishlist = async (params: any) => {
    return await axios.post(API_URL + "/wishlist", params, { headers: { Authorization: `${userToken}` } });
}

export const checkIfAddedToWishlist = async (params: any) => {
    return await axios.post(API_URL + "/addedToWishlist", params, { headers: { Authorization: `${userToken}` } });
}

export const purchaseProducts = async (params:any) => {
    return await axios.post(API_URL + "/purchase", params, { headers: { Authorization: `${userToken}` } })
}

export const getAllOrdersByUser = async (userId: string, pageNum: number, pageSize: number, sortBy: string, sortDir: string) => {
        return axios.get(API_URL + "/orders/" + userId + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
    
}

export const getAllWishlistsByUser = async (userId: string, pageNum: number, pageSize: number, sortBy: string, sortDir: string) => {
    return axios.get(API_URL + "/wishlists/" + userId + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            , { headers: { Authorization: `${userToken}` } });
}
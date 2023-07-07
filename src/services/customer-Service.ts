import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/customer";
const userToken = localStorage.getItem('userToken');

export const saveOrRemoveUserWishlist = async (params: any) => {
    return await axios.post(API_URL + "/wishlist", params, { headers: { Authorization: `${userToken}` } });
}

export const checkIfAddedToWishlist = async (params: any) => {
    return await axios.post(API_URL + "/addedToWishlist", params, { headers: { Authorization: `${userToken}` } });
}
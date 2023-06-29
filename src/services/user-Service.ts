import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/users";
const userToken = localStorage.getItem('userToken');

export const getAllUsers = (pageNum: number, pageSize: number, sortBy: string, sortDir: string, userType: string, searchValue: string) => {
    if(searchValue === '') {
        return axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + "&userType=" + userType
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + "&userType=" + userType
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getUserById = (userId: string) => {
    return axios.get(API_URL + '/' + userId, { headers: { Authorization: `${userToken}` } });
}

export const updateUser = (userId: string, userInformation: any) => {
    return axios.put(API_URL + '/update-user/' + userId, userInformation, { headers: { Authorization: `${userToken}` } });
}

export const changeUserPassword = (userId: string, password: any) => {
    return axios.patch(API_URL + '/change-password/' + userId, {
        newPassword: password
    }, { headers: { Authorization: `${userToken}` } })
}

export const changeUserAddress = (userId: string, addressInformation: any) => {
    return axios.put(API_URL + '/change-address/' + userId, addressInformation, { headers: { Authorization: `${userToken}` } });
}

export const deleteUser = (userId: string) => {
    return axios.delete(API_URL + '/' + userId, { headers: { Authorization: `${userToken}` } });
}

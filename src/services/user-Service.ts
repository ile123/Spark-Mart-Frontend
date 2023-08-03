import axios from "axios";

const API_URL = "http://localhost:8080/spark-mart/api/users";
const userToken = localStorage.getItem('userToken');

export const getAllUsers = async(pageNum: number, pageSize: number, sortBy: string, sortDir: string, userType: string, searchValue: string) => {
    if(searchValue === '') {
        return await axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + "&userType=" + userType
            , { headers: { Authorization: `${userToken}` } });
    } else {
        return await axios.get(API_URL + '?page=' + pageNum 
            + '&pageSize=' + pageSize 
            + '&sortBy=' + sortBy 
            + '&sortDir=' + sortDir
            + "&userType=" + userType
            + '&keyword=' + searchValue
            , { headers: { Authorization: `${userToken}` } });
    }
    
}

export const getUserById = async(userId: string) => {
    return await axios.get(API_URL + '/' + userId, { headers: { Authorization: `${userToken}` } });
}

export const updateUser = async(userId: string, userInformation: any) => {
    return await axios.put(API_URL + '/update-user/' + userId, userInformation, { headers: { Authorization: `${userToken}` } });
}

export const changeUserPassword = async(userId: string, password: any) => {
    return await axios.patch(API_URL + '/change-password/' + userId, {
        newPassword: password
    }, { headers: { Authorization: `${userToken}` } })
}

export const changeUserAddress = async(userId: string, addressInformation: any) => {
    return await axios.put(API_URL + '/change-address/' + userId, addressInformation, { headers: { Authorization: `${userToken}` } });
}

export const deleteUser = async(userId: string) => {
    return await axios.delete(API_URL + '/' + userId, { headers: { Authorization: `${userToken}` } });
}

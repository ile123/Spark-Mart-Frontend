import { Routes, Route } from "react-router-dom";
import Users from "../Pages/Users/Users";
import AddUser from "../Pages/Users/AddUser/AddUser";
import ViewUser from "../Pages/Users/ViewUser/ViewUser";
import EditUser from "../Pages/Users/EditUser/EditUser";

export default function UserRoutes() {
    return(
        <>
            <Routes>
                <Route path='/users' element={<Users/>}>
                    <Route path='newUser' element={<AddUser/>}/>
                    <Route path='viewUser/:id' element={<ViewUser/>}/>
                    <Route path='editUser/:id' element={<EditUser/>}/>
                </Route>
            </Routes>
        </>
    );
}
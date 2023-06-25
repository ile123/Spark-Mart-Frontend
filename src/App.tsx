import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fonts/Technology/Technology.ttf";

import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import RegistrationPage from "./components/Pages/RegistrationPage/RegistrationPage";
import NotFound from "./components/Pages/Errors/NotFound/NotFound";
import UserProfile from "./components/Pages/Users/Profile/Profile";
import Users from "./components/Pages/Users/Users";
import AddUser from "./components/Pages/Users/AddUser/AddUser";
import ViewUser from "./components/Pages/Users/ViewUser/ViewUser";
import EditUser from "./components/Pages/Users/EditUser/EditUser";
import ProtectedRoute from "./components/Pages/Users/ProtectedRoute/ProtectedRoute";
import EditAddress from "./components/Pages/Addresses/EditAddress/EditAddress";
import ChangePassword from "./components/Pages/ChangePassword/ChangePassword";
import Addresses from "./components/Pages/Addresses/Addresses";
import AddAddress from "./components/Pages/Addresses/AddAddress/AddAddress";
import AllUsersByAddress from "./components/Pages/Addresses/AllUsersByAddress/AllUsersByAddress";
import Products from "./components/Pages/Products/Products";
import Brands from "./components/Pages/Brands/Brands";
import Categories from "./components/Pages/Categories/Categories";
import AddBrand from "./components/Pages/Brands/AddBrand/AddBrand";
import EditBrand from "./components/Pages/Brands/EditBrand/EditBrand";

//korist combineReducer u auth(ili u store/store.ts) ako triba dodat jos redux stvari
//nadi nacin da grupiras sve ove putanje(postoji nesto zaboravia sam kako se radi)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path="/users/:type" element={<Outlet />}>
        <Route index element={<Users />} />
        <Route path="newUser" element={<AddUser />} />
        <Route path="viewUser" element={<ViewUser />} />
      </Route>
      <Route path="/addresses" element={<Outlet />}>
        <Route index element={<Addresses />} />
        <Route path="newAddress" element={<AddAddress />} />
        <Route path="getAllUsersByAddress/:id" element={<AllUsersByAddress />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Outlet />}>
          <Route index element={<UserProfile />} />
        </Route>
        <Route path="/editUserInformation" element={<EditUser />} />
        <Route path="/editUserAddress" element={<EditAddress />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
      <Route path="/products" element={<Outlet />}>
        <Route index element={<Products />} />
        {/* Add later */}
      </Route>
      <Route path="/brands" element={<Outlet />}>
        <Route index element={<Brands />} />
        <Route path="newBrand" element={<AddBrand />} />
        <Route path="editBrand" element={<EditBrand />} />
      </Route>
      <Route path="/categories" element={<Outlet />}>
        <Route index element={<Categories />} />
        {/* Add rest later */}
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

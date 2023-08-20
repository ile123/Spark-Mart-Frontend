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
import AddCategory from "./components/Pages/Categories/AddCategory/AddCategory";
import EditCategory from "./components/Pages/Categories/EditCategory/EditCategory";
import AddProduct from "./components/Pages/Products/AddProduct/AddProduct";
import EditProduct from "./components/Pages/Products/EditProduct/EditProduct";
import CustomerBrand from "./components/Pages/Customer/CustomerBrand/CustomerBrand";
import AllProductsByBrand from "./components/Pages/Customer/CustomerBrand/AllProductsByBrand/AllProductsByBrand";
import CustomerCategories from "./components/Pages/Customer/CustomerCategories/CustomerCategories";
import AllProductsByCategory from "./components/Pages/Customer/CustomerCategories/AllProductsByCategory/AllProductsByCategory";
import ProductInformation from "./components/Pages/Customer/ProductInformation/ProductInformation";
import ShoppingCart from "./components/Pages/Customer/ShoppingCart/ShoppingCart";
import UserWishlists from "./components/Pages/Users/UserWishlists/UserWishlists";
import UserOrders from "./components/Pages/Users/UserOrders/UserOrders";
import Orders from "./components/Pages/Customer/Orders/Orders";
import Wishlist from "./components/Pages/Customer/Wishlist/Wishlist";
import AllProductsByOrder from "./components/Pages/Customer/AllProductsByOrder/AllProductsByOrder";
import ProductStatistics from "./components/Pages/Products/ProductStatistics/ProductStatistics";
import "chart.js/auto";
import ProductsByBrands from "./components/Pages/Brands/ProductsByBrands/ProductsByBrands";
import ProductsByCategories from "./components/Pages/Categories/ProductsByCategories/ProductsByCategories";
import CustomerProducts from "./components/Pages/Customer/CustomerProducts/CustomerProducts";
import AboutUs from "./components/Pages/AboutUs/AboutUs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path="/users/:type" element={<Outlet />}>
        <Route index element={<Users />} />
        <Route path="newUser" element={<AddUser />} />
        <Route path="viewUser" element={<ViewUser />} />
        <Route path="viewUserOrders" element={<UserOrders />} />
        <Route path="viewUserWishlists" element={<UserWishlists />} />
      </Route>
      <Route path="/addresses" element={<Outlet />}>
        <Route index element={<Addresses />} />
        <Route path="newAddress" element={<AddAddress />} />
        <Route
          path="getAllUsersByAddress/:id"
          element={<AllUsersByAddress />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Outlet />}>
          <Route index element={<UserProfile />} />
        </Route>
        <Route path="/editUserInformation" element={<EditUser />} />
        <Route path="/editUserAddress" element={<EditAddress />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Route>
      <Route path="/adminProducts" element={<Outlet />}>
        <Route index element={<Products />} />
        <Route path="newProduct" element={<AddProduct />} />
        <Route path="editProduct/:id" element={<EditProduct />} />
        <Route path="productStatictics/:id" element={<ProductStatistics />} />
      </Route>
      <Route path="/adminBrands" element={<Outlet />}>
        <Route index element={<Brands />} />
        <Route path="newBrand" element={<AddBrand />} />
        <Route path="editBrand" element={<EditBrand />} />
        <Route path="allProducts/:brand" element={<ProductsByBrands />} />
      </Route>
      <Route path="/adminCategories" element={<Outlet />}>
        <Route index element={<Categories />} />
        <Route path="newCategory" element={<AddCategory />} />
        <Route path="editCategory" element={<EditCategory />} />
        <Route
          path="allProducts/:category"
          element={<ProductsByCategories />}
        />
      </Route>
      <Route path="/brands" element={<Outlet />}>
        <Route index element={<CustomerBrand />} />
        <Route path="allProducts/:brand" element={<AllProductsByBrand />} />
      </Route>
      <Route path="/categories" element={<Outlet />}>
        <Route index element={<CustomerCategories />} />
        <Route
          path="allProducts/:category"
          element={<AllProductsByCategory />}
        />
      </Route>
      <Route path="/products" element={<CustomerProducts />} />
      <Route path="/product/:product" element={<ProductInformation />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/orders" element={<Outlet />}>
        <Route index element={<Orders />} />
        <Route
          path="allProductsByOrder/:orderId"
          element={<AllProductsByOrder />}
        />
      </Route>
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/wishlists" element={<Wishlist />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

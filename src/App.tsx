import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/fonts/Technology/Technology.ttf'

import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './components/Pages/Home/Home';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import RegistrationPage from './components/Pages/RegistrationPage/RegistrationPage';
import NotFound from './components/Pages/Errors/NotFound/NotFound';
import UserProfile from './components/Pages/Users/Profile/Profile';
import Users from './components/Pages/Users/Users';
import AddUser from './components/Pages/Users/AddUser/AddUser';
import ViewUser from './components/Pages/Users/ViewUser/ViewUser';
import EditUser from './components/Pages/Users/EditUser/EditUser';
import ProtectedRoute from './components/Pages/Users/ProtectedRoute/ProtectedRoute';
import EditAddress from './components/Pages/Addresses/EditAddress/EditAddress';
import ChangePassword from './components/Pages/ChangePassword/ChangePassword';

//korist combineReducer u auth(ili u store/store.ts) ako triba dodat jos redux stvari
//nadi nacin da grupiras sve ove putanje(postoji nesto zaboravia sam kako se radi)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path='/users' element={<Outlet />}>
        <Route index element={<Users />}/>
          <Route path='newUser' element={<AddUser/>}/>
          <Route path='viewUser/:id' element={<ViewUser/>}/>
          <Route path='editUser/:id' element={<EditUser/>}/>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/profile' element={<Outlet />}>
          <Route index element={<UserProfile />} />
          <Route path='editUserInformation' element={<EditUser />} />
          <Route path='editUserAddress' element={<EditAddress />} />
        </Route>
        <Route path='changePassword' element={<ChangePassword />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

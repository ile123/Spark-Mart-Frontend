import './App.css'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Pages/Home/Home';
import LoginPage from './components/Pages/LoginPage/LoginPage';
import RegistrationPage from './components/Pages/RegistrationPage/RegistrationPage';
import NotFound from './components/Pages/Errors/NotFound/NotFound';
import UserRoutes from './components/Routes/UserRoutes';
import Layout from './components/UI/Layout/Layout';
import Users from './components/Pages/Users/Users';
import AddUser from './components/Pages/Users/AddUser/AddUser';
import ViewUser from './components/Pages/Users/ViewUser/ViewUser';
import EditUser from './components/Pages/Users/EditUser/EditUser';
//korist combineReducer u auth(ili u store/store.ts) ako triba dodat jos redux stvari
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path='/users' element={<Outlet />}>
        <Route index element={<Users />}/>
          <Route path='newUser' element={<AddUser/>}/>
          <Route path='viewUser/:id' element={<ViewUser/>}/>
          <Route path='editUser/:id' element={<EditUser/>}/>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

{/* <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/users/*' element={<UserRoutes/>}/>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes> */}
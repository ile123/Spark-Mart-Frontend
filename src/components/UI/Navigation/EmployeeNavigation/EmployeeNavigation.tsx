import { useDispatch, useSelector } from 'react-redux';
import styles from './EmployeeNavigation.module.css'
import { Link } from 'react-router-dom'
import { useGetUserDetailsQuery } from '../../../../auth/authService';
import { setCredentials } from '../../../../auth/authSlice';
import { useEffect } from 'react';

export default function Navigation() {

    return(
        <>
            <nav id={styles.navigation}>
                <Link to="/" className='btn btn-primary'>Home</Link>
                <Link to="/users" className='btn btn-secondary'>Users</Link>
                <a href="#" className='btn btn-danger'>Addresses</a>
                <a href="#" className='btn btn-warning'>Orders</a>
                <a href="#" className='btn btn-secondary'>Products</a>
            </nav>
        </>
    );
}
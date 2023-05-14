import { useDispatch, useSelector } from 'react-redux';
import styles from './EmployeeNavigation.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

export default function EmployeeNavigation() {

    return(
        <>
            <nav id={styles.navigation}>
                <Link to="/" className={styles.button}>Home</Link>
                <Link to="/users" className={styles.button}>Users</Link>
                <a href="#" className={styles.button}>Addresses</a>
                <a href="#" className={styles.button}>Orders</a>
                <a href="#" className={styles.button}>Products</a>
            </nav>
        </>
    );
}
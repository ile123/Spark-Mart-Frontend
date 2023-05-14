import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import CustomerNavigation from '../Navigation/CustomerNavigation/CustomerNavigation';
import { logout } from '../../../auth/authSlice';
import { useEffect, useState } from 'react';
import EmployeeNavigation from '../Navigation/EmployeeNavigation/EmployeeNavigation';

export default function Header() {
  
    const { userInfo, userToken } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
//Object.keys(userInfo).length !== 0
    return(
        <>
            <header id={styles.header}>
                <div id={styles.grid}>
                    <div className={styles.item}>
                        <h3 id={styles.sparkmart}>SPARK MART</h3>
                    </div>
                    <div className={styles.item}>
                        {(userToken !== null) ? (userInfo.role !== "CUSTOMER" ? <EmployeeNavigation /> : <CustomerNavigation />) : <CustomerNavigation />}
                    </div>
                    <div className={styles.item}>
                        {(userToken !== null) ? 
                        (
                            <div className={styles.login}>
                                <Link to='/profile' className={styles.button}>Profile</Link>
                                <Link to="" className={styles.button} onClick={() => dispatch(logout())}>
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.login}>
                                <Link to='/login' className={styles.button}>Login</Link>
                                <Link to='/register' className={styles.button}>Register</Link>
                            </div>
                        ) }
                    </div>
                </div>
            </header>
        </>
    );
}
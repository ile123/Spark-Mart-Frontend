import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import CustomerNavigation from '../Navigation/CustomerNavigation/CustomerNavigation';
import { logout } from '../../../auth/authSlice';
import { useEffect, useState } from 'react';
import EmployeeNavigation from '../Navigation/EmployeeNavigation/EmployeeNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faL } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  
    const { userInfo, loading } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    return(
        <>
            <header id={styles.header}>
                <div id={styles.grid}>
                    <div className={styles.item}>
                        <h3 id={styles.sparkmart}>SPARK MART</h3>
                    </div>
                    <div className={styles.item}>
                        {(JSON.stringify(userInfo) !== '{}') ? (userInfo.role !== "CUSTOMER" ? <EmployeeNavigation /> : <CustomerNavigation />) : <CustomerNavigation />}
                    </div>
                    <div className={styles.item}>
                        {loading === true ? 
                            <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="2x" />
                            :
                        (JSON.stringify(userInfo) !== '{}') ? 
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
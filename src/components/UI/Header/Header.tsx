import Navigation from '../Navigation/EmployeeNavigation/EmployeeNavigation';
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from '../../../auth/authService';
import { useEffect } from 'react';
import { setCredentials } from '../../../auth/authSlice';

export default function Header() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();


    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
    });

    useEffect(() => {
        if (data) dispatch(setCredentials(data))
    }, [data, dispatch]);

    return(
        <>
            <header id={styles.header}>
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <h3 id={styles.sparkmart}>SPARK MART</h3>
                        </div>
                        <div className="col">
                            <Navigation />
                        </div>
                        <div className="col-sm-1">
                            <h5 id={styles.login}>
                                <Link to='/login' className='btn btn-outline-primary'>Login</Link>
                                <Link to='/register' className='btn btn-outline-secondary'>Register</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
import { Card } from 'react-bootstrap';
import styles from './LoginPage.module.css'
import Button from '../../UI/Button/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userLogin } from '../../../auth/authActions';

export default function LoginPage() {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { loading, userInfo, error, userToken } = useSelector((state: any) => state.auth);
    const submitHandler = (data: any) => {
        const userData = {
            email: data.email.toLowerCase(),
            password: data.password
        }
        //@ts-ignore
        dispatch(userLogin(userData));
        navigate('/', { replace: true });
    }

    useEffect(() => {
        if (userInfo) {
          navigate('/')
        }
      }, [navigate, userInfo]);

    return(
        <>
        <form onSubmit={handleSubmit(submitHandler)}>
            <Card id={styles.card}>
                <Card.Title id={styles.pageName}>LOGIN</Card.Title>
                <Card.Body>
                    <h3 className={styles.label}>Email</h3>
                    <input type="email" placeholder='Enter email...' className={styles.input} {...register("email")}/>
                    <h3 className={styles.label}>Password</h3>
                    <input type="password" placeholder='Enter password...' className={styles.input} {...register("password")}/>
                    <br />
                    <Button buttonStyle={styles.button} type={"submit"}>Submit</Button>
                </Card.Body>
            </Card>
        </form>
        </>
    );
}
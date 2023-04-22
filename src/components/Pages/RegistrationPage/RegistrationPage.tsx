import { Card } from 'react-bootstrap';
import styles from './RegistrationPage.module.css'
import Button from '../../UI/Button/Button';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../auth/authActions';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

export default function RegistrationPage() {

    const [formIsValid, setFormIsValid] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const { loading, userInfo, error, success } = useSelector(
        (state: any) => state.auth
    );
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = (data: any) => {
        console.log(data)
        /* if (data.password !== repeatPassword) {
          alert("Password mismatch!");
          return;
        }
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email.toLowerCase(),
            password: data.password,
            role: 'CUSTOMER'
        }
        //@ts-ignore
        dispatch(registerUser(userData));
        navigate('/', { replace: true }); */
    }

    const handleError = (errors: any) => {
        console.log(errors);
        const errorArray:string[] = [];
        if(errors.email) {
            if(errors.email.type === "required") {
                errorArray.push("ERROR: Email is required!");
            } else {
                errorArray.push("ERROR: Invalid email!");
            }
        }
        if(errors.phoneNumber) {
            if(errors.phoneNumber.type === "required") {
                errorArray.push("ERROR: Phone number is required!");
            } else {
                errorArray.push("ERROR: Invalid phone number!");
            }
        }
        if(errors.password) {
            if(errors.password.type === "required") {
                errorArray.push("ERROR: Password is required!");
            } else {
                errorArray.push("ERROR: Invalid password(It has to have 1 upper letter, 1 lower letter and a number)!");
            }
        }
        if(errors.firstName) errorArray.push("ERROR: First name is required!");
        if(errors.lastName) errorArray.push("ERROR: Last name is required!");
        console.log(errorArray);
    };

    return(
        <>
        {showErrorModal && <ErrorModal show={showErrorModal} errors={formErrors} /> }
        <form onSubmit={handleSubmit(submitForm, handleError)}>
            <Card id={styles.card}>
                <Card.Title id={styles.pageName}>REGISTER</Card.Title>
                <Card.Body>
                    <h3 className={styles.label}>Email</h3>
                    <input
                        type="email"
                        className={styles.input}
                        {...register('email', 
                        { required: true,
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                    />
                    <h3 className={styles.label}>Phone Number</h3>
                    <input type="text" className={styles.input} {...register("phoneNumber", { 
                       required: true, pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g})} />
                    <div className='row'>
                        <div className='col'>
                            <h3 className={styles.label}>First Name</h3>
                            <input type="text" className={styles.input} {...register("firstName", { required: true })} />
                        </div>
                        <div className='col'>
                            <h3 className={styles.label}>Last Name</h3>
                            <input type="text" className={styles.input} {...register("lastName", { required: true })} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <h3 className={styles.label}>Password</h3>
                            <input type="password" className={styles.input} {...register("password", { required: true, pattern: /^[A-Za-z]\w{7,14}$/ })}/>
                        </div>
                        <div className='col'>
                            <h3 className={styles.label}>Repeat Password</h3>
                            <input type="password" className={styles.input} onChange={e => setRepeatPassword(e.target.value)}/>
                        </div>
                    </div>
                    <Button buttonStyle={styles.button} type={"submit"}>Submit</Button>
                </Card.Body>
            </Card>
        </form>
        </>
    );
}
import Layout from '../../UI/Layout/Layout'
import Forbidden from '../Errors/Forbidden/Forbidden';
import styles from './Users.module.css'
import { useSelector } from 'react-redux';


export default function Users() {

    const { userInfo } = useSelector((state: any) => state.auth)

    if(userInfo.role === "CUSTOMER") { return <Forbidden /> }
    else {
        return(
            <>
            <Layout>
                <h1 id={styles.users}>USERS</h1>
            </Layout>
            </>
        );
    }
}
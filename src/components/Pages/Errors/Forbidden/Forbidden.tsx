import Layout from '../../../UI/Layout/Layout';
import styles from './Forbidden.module.css'

export default function Forbidden() {

    return(
        <>
            <Layout>
                <h1 id={styles.forbidden}>You are forbidden from accesing this page!</h1>
            </Layout>
        </>
    );
}
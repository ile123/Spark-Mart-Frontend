import styles from './NotFound.module.css'
import Layout from '../../../UI/Layout/Layout';

export default function NotFound() {
    return(
        <>
            <Layout>
                <h1 id={styles.notFound}>Page not found!</h1>
            </Layout>
        </>
    );
}
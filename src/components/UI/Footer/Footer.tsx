import ThunderBolt from '../SVG/ThunderBolt';
import styles from './Footer.module.css'

export default function Footer() {
    return(
        <>
            <footer id={styles.footer}>
                <div className='container text-center'>
                    <div className='row'>
                        <div className='col-md-3 mt-4'>
                            <h5>Email: ib47425@oss.unist.hr</h5>
                        </div>
                        <div className='col-md-6 mt-4'>
                            <ThunderBolt height={"3rem"} width={"3rem"}/>
                        </div>
                        <div className='col mt-4'>
                            <h6>&copy; Copyright {new Date().getFullYear()}, SparkMart. <p>All rights reserved.</p></h6>
                        </div>  
                    </div>
                </div>
            </footer>
        </>
    );
}
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header'

export default function Layout(props: any) {
    return(
        <>
            <Header/>
                <main><Outlet /></main>
            <Footer/>
        </>
    );
}
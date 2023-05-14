import styles from './UserProfile.module.css'
import { useSelector } from 'react-redux'

export default function UserProfile() {
    const { userInfo } = useSelector((state: any) => state.auth)
    console.log(userInfo);
    return (
        <>
        <figure>Roko</figure>
        <span>
            Welcome <strong>Koko!</strong> You can view this page
            because you're logged in
        </span>
        </>
    );
}
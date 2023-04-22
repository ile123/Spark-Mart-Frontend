import styles from './Error.module.css'

export default function Error(props: any) {

    return(
        <>
            <li>{props.message}</li>
        </>
    );
}
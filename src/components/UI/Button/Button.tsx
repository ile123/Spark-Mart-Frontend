import styles from './Button.module.css'

export default function Button(props: any) {
    return <button id={props.buttonStyle} 
        type={props.type} 
        onClick={props.buttonOnClick}
        >{props.children}</button>
}
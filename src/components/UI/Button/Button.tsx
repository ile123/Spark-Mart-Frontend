import styles from './Button.module.css'

export default function Button(props: any) {
    return <button 
        id={props.style}
        type={props.type || 'button'}
        onClick={props.onClick}
    >{props.children}</button>
}
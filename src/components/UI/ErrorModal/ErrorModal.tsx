import ReactDOM from "react-dom";
import Button from "../Button/Button";
import styles from "./ErrorModal.module.css";
import { Card } from "react-bootstrap";

const Backdrop = (props: any) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props: any) => {
  return (
    <Card className={styles.modal}>
      <Card.Header className={styles.header}>
        <h2>ERROR</h2>
      </Card.Header>
      <div className={styles.content}>
        <ul id={styles.errorList}>
          {props.errors.map((error: string, index: number) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
      <Card.Footer className={styles.actions}>
        <Button style={styles.button} onClick={props.onConfirm} type={"button"}>
          Close
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default function ErrorModal(props: any) {
  const backdropRoot: any = document.getElementById("backdrop-root");
  const overlayRoot: any = document.getElementById("overlay-root");

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        backdropRoot
      )}
      {ReactDOM.createPortal(
        <ModalOverlay errors={props.errors} onConfirm={props.onConfirm} />,
        overlayRoot
      )}
    </>
  );
}

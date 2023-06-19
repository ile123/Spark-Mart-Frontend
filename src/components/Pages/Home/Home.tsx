import Layout from "../../UI/Layout/Layout";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <Layout>
      <h3 id={styles.welcome}>Welcome to Spark Mart!</h3>
    </Layout>
  );
}

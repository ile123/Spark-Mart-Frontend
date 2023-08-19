import Layout from "../../UI/Layout/Layout";
import styles from "./Home.module.css";
import { useSelector } from "react-redux";

export default function Home() {
  const { userInfo, loading } = useSelector((state: any) => state.auth);

  return (
    <Layout>
      {(JSON.stringify(userInfo) === '{}' || userInfo.role === 'CUSTOMER') ? (
        <div id={styles.videoContainer}>
          <video autoPlay muted loop id={styles.video}>
            <source src="src/assets/videos/sprark_mart_home_page_looping_video_2.mp4" type="video/mp4" />
          </video>
          <div id={styles.videoText}>
            <h1>Welcome to Spark Mart</h1>
          </div>
        </div>
      ) : (
        <div>
          <h3 id={styles.welcome}>Welcome to Spark Mart Admin Panel!</h3>
        </div>
      )}
    </Layout>
  );
}

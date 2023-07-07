import ThunderBolt from "../SVG/ThunderBolt";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer id={styles.footer}>
        <div id={styles.grid}>
          <div className={styles.item}>
            <h5 id={styles.email}>Email: ib47425@oss.unist.hr</h5>
          </div>
          <div className={styles.item}>
            <ThunderBolt
              height={"3rem"}
              width={"3rem"}
              id={styles.thunderbolt}
            />
          </div>
          <div className={styles.item}>
            <h6 id={styles.copyright}>
              &copy; Copyright {new Date().getFullYear()}, SparkMart.{" "}
              <p>All rights reserved.</p>
            </h6>
          </div>
        </div>
      </footer>
    </>
  );
}

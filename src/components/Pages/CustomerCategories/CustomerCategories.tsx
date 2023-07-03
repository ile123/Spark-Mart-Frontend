import { useEffect, useState } from "react";
import Layout from "../../UI/Layout/Layout";
import styles from "./CustomerCategories.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DisplayCategory } from "../../../types/DisplayCategory";
import axios from "axios";
import { getAllCategories } from "../../../services/category-service";
import DisplayCategoryItem from "../../UI/Items/DisplayCategoryItem/DisplayCategoryItem";
import { Category } from "../../../types/Category";

export default function CustomerCategories() {
  const { userInfo, loading } = useSelector((state: any) => state.auth);
  const [list, setList] = useState<Category[]>([]);

  useEffect(() => {
      getAllCategories(0, 1000, "name", "asc", "")
        .then((result: any) => setList(result.data.content))
        .catch((error: any) => console.log(error));
  }, []);

  return (
    <Layout>
      {((JSON.stringify(userInfo) === '{}') || (userInfo.role === 'CUSTOMER' && list.length !== 0)) ? (
        <div className={styles.grid}>
          {list.map((category: DisplayCategory, index: number) => {
            return <DisplayCategoryItem 
              key={index} 
              name={category.name} 
              imageName={category.imageName} />
          })}
        </div>
      ) : (
        <h3 id={styles.welcome}>Welcome to Spark Mart!</h3>
      )}
    </Layout>
  );
}

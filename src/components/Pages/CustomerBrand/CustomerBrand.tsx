import { useEffect, useState } from "react";
import styles from "./CustomerBrand.module.css";
import { useLocation } from "react-router-dom";
import { DisplayCategory } from "../../../types/DisplayCategory";
import { DisplayBrand } from "../../../types/DisplayBrand";
import { getAllBrands } from "../../../services/brand-Service";
import Layout from "../../UI/Layout/Layout";
import BrandItem from "./BrandItem/BrandItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CustomerBrand() {

  const { userInfo } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const [list, setList] = useState<DisplayBrand[]>([]);

  useEffect(() => {
      getAllBrands(0, 1000, "name", "asc", "")
        .then((result: any) => setList( result.data.content))
        .catch((error: any) => console.log(error));
  }, []);

  if (list.length === 0) {
    return (
      <FontAwesomeIcon id={styles.loading} icon={faCog} pulse size="10x" />
    );
  }

  if (JSON.stringify(userInfo) === "{}") navigate("/");

  return (
    <>
      <Layout>
          <div className={styles.grid}>
            {list.map((brand: DisplayBrand, index: number) => {
              return (
                <BrandItem
                  key={index}
                  keyId={index}
                  id={brand.id}
                  name={brand.name}
                  imageName={brand.imageName}
                />
              );
            })}
          </div>
      </Layout>
    </>
  );
}

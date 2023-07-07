import { useEffect, useState } from "react";
import styles from "./CustomerBrand.module.css";
import { DisplayBrand } from "../../../../types/DisplayBrand";
import { getAllBrands } from "../../../../services/brand-Service";
import Layout from "../../../UI/Layout/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import DisplayBrandItem from "../../../UI/Items/DisplayBrandItem/DisplayBrandItem";

export default function CustomerBrand() {

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

  return (
    <>
      <Layout>
          <div className={styles.grid}>
            {list.map((brand: DisplayBrand, index: number) => {
              return (
                <DisplayBrandItem 
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

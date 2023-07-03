import { useParams } from 'react-router-dom';
import styles from './ProductInformation.module.css'
import { useEffect, useState } from 'react';
import { getProductById } from '../../../../services/product-Service';
import { Product } from '../../../../types/Product';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../UI/Button/Button';

export default function ProductInformation() {

    const { product } = useParams();

    const [productDisplay, setProductDisplay] = useState<Product>();
    const [imagePath, setImagePath] = useState(null);
    const [specifications, setSpecifications] = useState();

    const getImageUrl = async () => {
        try {
        const response = await fetch(
            `http://localhost:8080/spark-mart/api/images/product/${productDisplay?.picture}`
        );
        const blob = await response.blob();
        const imageUrl: any = URL.createObjectURL(blob);
        setImagePath(imageUrl);
        } catch (error) {
        console.error("Error retrieving image:", error);
        }
    };

  if (imagePath === null && productDisplay?.picture !== undefined) {
    getImageUrl();
  }

    useEffect(() => {
        getProductById(product)
            .then((result: any) => {
                setSpecifications(JSON.parse(result.data.specifications))
                setProductDisplay(result.data)
            })
            .catch((error: any) => console.log(error));
    }, []);

    return(
        <>
            {productDisplay ? (<Card id={styles.card}>
                <div id={styles.upper_left}>
                {imagePath ? (
                    <Card.Img variant="top" src={imagePath} height={320} />
                    ) : (
                    <FontAwesomeIcon icon={faCog} id={styles.loading} size="10x"/>
                )}
                </div>
                <div id={styles.upper_right}>
                    <h4 id={styles.name}>{productDisplay?.name}</h4>
                    <h4 id={styles.description}>{productDisplay?.description}</h4>
                    <div className={styles.grid}>
                        <div>
                            <Button style={styles.addToWishList}>
                                Add To Wishlist
                            </Button>
                        </div>
                        <div>
                            <Button style={styles.addToCart}>
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>
                <div id={styles.bottom}>
                    <div id={styles.specifications}>
                    {Object.keys(specifications).map((specification: any, index: number) => (
                        <div key={index}>
                            <p>{specification}</p>
                            <p>{specifications[specification]}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </Card>) : (<FontAwesomeIcon icon={faCog} size='2xl' id={styles.pageLoad}/>) }
        </>
    );
}
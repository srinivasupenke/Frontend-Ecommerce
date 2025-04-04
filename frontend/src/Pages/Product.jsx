import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrums from "../Components/BreadCrums/BreadCrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import GlobalLoader from "../Components/Loader/Loader";

const Product = () => {
  const { all_products } = useContext(ShopContext);

  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Wait for all_products to load and find the product
    if (all_products && all_products.length > 0) {
      const foundProduct = all_products.find(
        (item) => item.id === Number(productId)
      );
      setProduct(foundProduct);
    }
  }, [all_products, productId]);

  if (!product) {
    return <GlobalLoader />; // Show a loader while fetching product
  }

  console.log(product);
  return (
    <div className="products-category">
      <BreadCrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts product={product} />
    </div>
  );
};

export default Product;

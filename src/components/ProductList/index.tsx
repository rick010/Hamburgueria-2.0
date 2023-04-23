import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext } from "../../providers/CartContext";
import { IProduct } from "../../providers/CartContext";

export const ProductList = ( ) => {
  const { cartList, productList, count } = useContext(CartContext);

  return productList?.map((product) => (
    <StyledProductList key={product.id}>
      <ProductCard  product={product}/>
    </StyledProductList>
  ));
};

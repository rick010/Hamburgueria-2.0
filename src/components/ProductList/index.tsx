import { useContext } from "react";
import { ProductCard } from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext } from "../../providers/CartContext";

export const ProductList = () => {
  const { productList, filter } = useContext(CartContext);

  const currentFilterList = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(filter) ||
      product.category.toLowerCase().includes(filter)
  );
  console.log(currentFilterList)
  const currentProductList =
    filter !== "" && filter !== undefined ? currentFilterList : productList;

  return (
    <StyledProductList>
      {currentProductList?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      ;
    </StyledProductList>
  );
};

import { MdDelete } from "react-icons/md";
import { IProductCard } from "../../../ProductList/ProductCard";
import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../../providers/CartContext";

export const CartProductCard: React.FC<IProductCard> = ({ product }) => {
  const { removeCardToList, count } = useContext(CartContext);
  let num = 0;
  if (count?.length > 0) {
    count.forEach((element) => {
      if (element.id == product.id) {
        num++;
      }
    });
  }
  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src="https://i.imgur.com/Vng6VzV.png" alt="Hamburguer" />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
          {num > 1 ? <span> ({num}x)</span> : <span></span>}
        </StyledTitle>
        <button
          onClick={() => removeCardToList(product.id)}
          type="button"
          aria-label="Remover"
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

import { CartProductCard } from "./CartProductCard";
import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../providers/CartContext";
import { currencyFormatBR } from "../../ProductList/ProductCard";

export const CartProductList = ({}) => {
  const { cartList, removeAllCardToList, count } = useContext(CartContext);

  let value = 0;
  if (count?.length > 0) {
    const valueTotal = count.reduce((ant, current) => {
      return ant + current.price;
    }, value);
    value = valueTotal;
  }
  const valueBr = currencyFormatBR(value)
  return (
    <StyledCartProductList>
      <ul>
        {cartList?.map((product) => (
          <CartProductCard key={product.id} product={product} />
        ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          {valueBr}
        </StyledParagraph>
      </div>
      <StyledButton
        onClick={() => removeAllCardToList()}
        $buttonSize="default"
        $buttonStyle="gray"
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

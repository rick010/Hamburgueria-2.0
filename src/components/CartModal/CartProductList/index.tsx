import { CartProductCard } from "./CartProductCard";
import { currencyFormatBR } from "../../ProductList/ProductCard";
import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { IProduct } from "../../../providers/CartContext";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../providers/CartContext";

export const CartProductList = ({}) => {
  const { cartList, removeAllCardToList, count } = useContext(CartContext);
//  const countLocalStore = JSON.parse(localStorage.getItem('@COUNT'))
 
  let valueBr:number = 0;
 
  if(count?.length > 0){
    const valueTotal = count.reduce((ant, current) => {
      return ant + current.price;
    }, valueBr);
    valueBr = currencyFormatBR(valueTotal);
  }

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
          { isNaN(valueBr) ? valueBr : "0,00"}
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

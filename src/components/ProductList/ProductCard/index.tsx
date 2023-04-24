import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { CartContext, IProduct } from "../../../providers/CartContext";
import React, { useContext } from "react";

export interface IProductCard {
  product: IProduct;
}

export const currencyFormatBR = (value: number) => {
  const currencyFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const valueFormated = currencyFormated.format(value);
  return valueFormated;
};

export const ProductCard: React.FC<IProductCard> = ({ product }) => {
  const { addCardToList } = useContext(CartContext);
  const valueFormated = currencyFormatBR(product.price);

  function setLoadingAndCart (prod: IProduct ) {
    addCardToList(prod);
  }

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src="https://i.imgur.com/Vng6VzV.png" alt="Hamburguer" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">{valueFormated}</StyledParagraph>
        <StyledButton
          onClick={() => setLoadingAndCart(product)}
          $buttonSize="medium"
          $buttonStyle="green"
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

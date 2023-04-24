import { MdClose } from "react-icons/md";
import { CartProductList } from "./CartProductList";
import { StyledCartModalBox } from "./style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../providers/CartContext";

export const CartModal = () => {
  const { loading, setLoading, cartList } = useContext(CartContext);

  return (
    <StyledCartModalBox className={loading ? "show" : "hidden"}>
      <dialog>
        <header>
          <StyledTitle tag="h2" $fontSize="three">
            Carrinho de compras
          </StyledTitle>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setLoading(!loading)}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className="cartBox">
          {cartList?.length > 0 ? <CartProductList /> : <></>}
          <div className={cartList?.length > 0 ? "hidden" : "emptyBox"}>
            <StyledTitle tag="h3" $fontSize="three" textAlign="center">
              Sua sacola está vazia
            </StyledTitle>
            <StyledParagraph textAlign="center">Adicione itens</StyledParagraph>
          </div>
        </div>
      </dialog>
    </StyledCartModalBox>
  );
};

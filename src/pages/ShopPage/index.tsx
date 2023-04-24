import { StyledShopPage } from "./style";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { StyledContainer } from "../../styles/grid";
import { ProductList } from "../../components/ProductList";

export const ShopPage = () => {
  return (
    <StyledShopPage>
      <CartModal />
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

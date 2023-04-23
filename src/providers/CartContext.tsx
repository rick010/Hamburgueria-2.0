import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAxiosError, UserContext } from "./UserContext";
import { boolean } from "zod";

interface ICartProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  productList: IProduct[];
  cartList: IProduct[];
  loading: boolean;
  setCartList: React.FunctionComponent;
  removeCardToList: React.FunctionComponentElement<number>;
  removeAllCardToList: React.FunctionComponent;
  count: IProduct[];
}

interface IUseStateLoading {
  loading: boolean;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const { user } = useContext(UserContext);
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState<IProduct[]>([]);
  const [count, setCount] = useState<IProduct[]>([]);
  const currentListCart = JSON.parse(localStorage.getItem(`@CARTLIST:${user?.email}`));
  const currentCountList = JSON.parse(localStorage.getItem(`@COUNT:${user?.email}`));

  useEffect(() => {
    if(currentListCart){
      setCartList(currentListCart);
      setCount(currentCountList);
    }
    console.log(`currentLisCart do localDtorage: ${currentListCart}`)
    console.log(`currentCountList do localDtorage: ${currentCountList}`)
  }, []);

  const addCardToList = (newProduct: IProduct) => {
    console.log(newProduct);
    const checkIdToList = cartList?.find((card) => card.id == newProduct.id);
    console.log(checkIdToList);
    if (cartList?.length > 0) {
      console.log("dentro do 1º if cart > 0");
      cartList.forEach((card) => {
        if (checkIdToList) {
          console.log(`dentro do if ID igual = ${newProduct.id}`);
          setCount([...count, newProduct]);
          localStorage.setItem(
            `@COUNT:${user?.email}`,
            JSON.stringify([...count, newProduct])
          );
        } else {
          console.log(
            `dentro do else do card ID diferente =(newProduct ${newProduct.id})/(newProduct ${card.id})`
          );
          setCartList([...cartList, newProduct]);
          setCount([...count, newProduct]);
          localStorage.setItem(
            `@CARTLIST:${user?.email}`,
            JSON.stringify([...cartList, newProduct])
          );
          localStorage.setItem(
            `@COUNT:${user?.email}`,
            JSON.stringify([...count, newProduct])
          );
        }
      });
    } else {
      console.log("else");
      setCartList([...cartList, newProduct]);
      setCount([...count, newProduct]);
      localStorage.setItem(
        `@CARTLIST:${user?.email}`,
        JSON.stringify([...cartList, newProduct])
      );
      localStorage.setItem(`@COUNT:${user?.email}`, JSON.stringify([...count, newProduct]));
      console.log(cartList);
    }
  };

  const removeCardToList = (idProduct: number) => {
    const checkIdToList = count.filter((card) => card.id === idProduct);

    console.log(checkIdToList);
    setCount((count) => {
      const indexCount = count.findIndex((element) => element.id === idProduct);
      const indexCartList = cartList.findIndex(
        (element) => element.id === idProduct
      );
      console.log(indexCount);
      if (indexCount !== -1) {
        const upDateCount = [...count];
        const upDateCartList = [...cartList];
        console.log(upDateCount);
        console.log(upDateCartList);
        if (checkIdToList.length > 1) {
          // const newCartList = cartList.filter((card) => card.id !== idProduct);
          // console.log(newCartList)
          upDateCount.splice(indexCount, 1);
          // upDateCartList.splice(indexCartList, 1);
          // setCartList(upDateCartList);
          localStorage.setItem(`@COUNT:${user?.email}`, JSON.stringify(upDateCount));
          return upDateCount;
        } else {
          upDateCount.splice(indexCount, 1);
          upDateCartList.splice(indexCartList, 1);
          setCartList(upDateCartList);
          localStorage.setItem(`@CARTLIST:${user?.email}`, JSON.stringify([upDateCartList]));
          localStorage.setItem(`@COUNT:${user?.email}`, JSON.stringify([upDateCount]));
          return upDateCount;
        }
      }
      // const newCartList = cartList.filter((card) => card.id !== idProduct);
      // setCartList(newCartList);
      return count;
    });

    // const newCartList = cartList.filter((card) => card.id !== idProduct);
    // setCartList(newCartList);
    // toast.success("Produto removido com sucesso!");
    // localStorage.setItem("@CARTLIST", JSON.stringify(newCartList));
  };

  const removeAllCardToList = () => {
    setCartList([]);
    setCount([]);
    toast.success("Todos os Produtos removidos com sucesso!");
    localStorage.removeItem(`@CARTLIST:${user?.email}`);
    localStorage.removeItem(`@COUNT:${user?.email}`);
  };

  useEffect(() => {
    const listProductLoad = async () => {
      const token = localStorage.getItem("@TOKEN");
      try {
        const response = await api.get<IProduct[]>(`/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductList(response.data);
      } catch (error) {
        // const Ierror = error as IAxiosError;
        // toast.error(Ierror.message)
        console.log(error);
      }
    };
    listProductLoad();
  }, []);

  return (
    <CartContext.Provider
      value={{
        productList,
        loading,
        setLoading,
        cartList,
        addCardToList,
        removeCardToList,
        removeAllCardToList,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IAxiosError, UserContext } from "./UserContext";

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
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  productList: IProduct[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cartList: IProduct[];
  addCardToList: (newProduct: IProduct) => void;
  count: IProduct[];
  removeCardToList: (idProduct: number) => void;
  removeAllCardToList: () => void;
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProviderProps) => {
  const { user } = useContext(UserContext);
  const [filter, setFilter] = useState("");
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState<IProduct[]>([]);
  const [count, setCount] = useState<IProduct[]>([]);

  useEffect(() => {
    try {
      const currentListCart = JSON.parse(
        localStorage.getItem(`@CARTLIST:${user?.email}`) as string
        );
        const currentCountList = JSON.parse(
          localStorage.getItem(`@COUNT:${user?.email}`)as string
        );
      if (currentListCart) {
        setCartList(currentListCart);
        setCount(currentCountList);
      }  
    } catch (error) {
      const Ierror = error as IAxiosError;
        console.log(Ierror);
    }
  }, []);

  const addCardToList = (newProduct: IProduct) => {
    const checkIdToList = cartList?.find((card) => card.id == newProduct.id);
    if (cartList?.length > 0) {
      cartList.forEach((card) => {
        if (checkIdToList) {
          setCount([...count, newProduct]);
          localStorage.setItem(
            `@COUNT:${user?.email}`,
            JSON.stringify([...count, newProduct])
          );
        } else {
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
  };

  const removeCardToList = (idProduct: number) => {
    const checkIdToList = count.filter((card) => card.id === idProduct);
    setCount((count) => {
      const indexCount = count.findIndex((element) => element.id === idProduct);
      const indexCartList = cartList.findIndex(
        (element) => element.id === idProduct
      );
      if (indexCount !== -1) {
        const upDateCount = [...count];
        const upDateCartList = [...cartList];
        if (checkIdToList.length > 1) {
          upDateCount.splice(indexCount, 1);
          localStorage.setItem(
            `@COUNT:${user?.email}`,
            JSON.stringify(upDateCount)
          );
          return upDateCount;
        } else {
          upDateCount.splice(indexCount, 1);
          upDateCartList.splice(indexCartList, 1);
          setCartList(upDateCartList);
          localStorage.setItem(
            `@CARTLIST:${user?.email}`,
            JSON.stringify([upDateCartList])
          );
          localStorage.setItem(
            `@COUNT:${user?.email}`,
            JSON.stringify([upDateCount])
          );
          return upDateCount;
        }
      }
      return count;
    });
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
        console.log(response);
        setProductList(response.data);
      } catch (error) {
        const Ierror = error as IAxiosError;
        console.log(Ierror);
      }
    };
    listProductLoad();
  }, []);

  return (
    <CartContext.Provider
      value={{
        filter,
        setFilter,
        productList,
        loading,
        setLoading,
        cartList,
        addCardToList,
        count,
        removeCardToList,
        removeAllCardToList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

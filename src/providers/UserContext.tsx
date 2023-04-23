import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/Form/LoginForm/loginFormSchema";
import { TRegisterFormValues } from "../components/Form/RegisterForm/registerFormSchema";
import { api } from "../services/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { any, string } from "zod";
import { isAxiosError } from "axios";

interface IUserProviderProps {
   children: React.ReactNode;
}

interface IUserContext {
   user: IUser | null;
   userLogin: (formData: TLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
   userRegister: (formData: TRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
   userLogout: () => void;
}

interface IUser {
   email: string;
   name: string;
   id?: string;
}

interface IUserLoginResponse {
   accessToken: string;
   user: IUser;
}

interface IUserRegisterResponse {
   accessToken: string;
   user: IUser;
}

export interface IAxiosError {
  message: string;
  response?: {
    data: string;
  };
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
   const [user, setUser] = useState<IUser | null>(null);

   useEffect(() => {
      const token = localStorage.getItem("@TOKEN");
      const userId = localStorage.getItem("@USERID");

      const userAutoLogin = async () => {
         try {
            const {data} = await api.get<IUser>(`/users/${userId}`, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            setUser(data);
            navigate('/shop');
         } catch (error) {
          const Ierror = error as IAxiosError;
            console.log(Ierror);
            localStorage.removeItem("@TOKEN");
            localStorage.removeItem("@USERID");
         }
      }

      if(token && userId){
         userAutoLogin();
      }
   }, [])

   const navigate = useNavigate();
   

   const userLogin = async (formData: TLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         const { data } = await api.post<IUserLoginResponse>("/login", formData);
         localStorage.setItem("@TOKEN", data.accessToken);
         localStorage.setItem("@USERID", JSON.stringify(data.user.id));
         setUser(data.user);
         navigate("/shop");
      } catch (error){
        const Ierror = error as IAxiosError;
      toast.error(Ierror.message);
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const userRegister = async (formData: TRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         console.log(formData)
         await api.post<IUserRegisterResponse>("/users", formData);
         console.log("Cadastro efetuado com sucesso");
      } catch (error) {
        const Ierror = error as IAxiosError;
         console.log(Ierror);
      } finally {
         setLoading(false);
      }
   };

   const userLogout = () => {
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@USERID");
      setUser(null);
      navigate("/");
   };

   return (
      <UserContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
         {children}
      </UserContext.Provider>
   );
};

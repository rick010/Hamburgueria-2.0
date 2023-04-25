import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import React, { SetStateAction, SyntheticEvent, useContext, useState } from "react";
import { CartContext } from "../../../providers/CartContext";

export const SearchForm: React.FC = () => {
  const { setFilter } = useContext(CartContext);
  const [searchInput, setSearchInput] = useState("");
  const searchToUpperCase = searchInput.toLowerCase();
  
  const submit = (event: SyntheticEvent | any) => {
    event.preventDefault();
    setFilter(searchToUpperCase);
    setSearchInput("");
  };

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        type="text"
        value={searchInput}
        placeholder="Digitar pesquisa"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

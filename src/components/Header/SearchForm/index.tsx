import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { SyntheticEvent, useContext, useState } from "react";
import { CartContext } from "../../../providers/CartContext";
import { SubmitHandler } from "react-hook-form";

export const SearchForm = () => {
  const { setFilter } = useContext(CartContext);
  const [searchInput, setSearchInput] = useState("");

  const submit = (event: SyntheticEvent | any) => {
    event.preventDefault();
    setFilter([searchInput.toLowerCase()]);
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

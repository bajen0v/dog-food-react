import "./styles.css";

import { ReactComponent as CloseIcon } from "./assets/ic-close-input.svg";
import { ReactComponent as SeachIcon } from "./assets/ic-search.svg";


export function Search({ handleFormSubmit, handleInputChange }) {

  function handleSearch(e) {
    if(e.target.tagName !== 'INPUT'){
      e.target.parentElement.parentElement.parentElement[0].className = 'search__input'
      e.target.parentElement.parentElement.parentElement[1].className = 'search__btn search__btn-hidden'
    } else {
      e.target.parentElement[1].className = 'search__btn'
      e.target.parentElement[0].className += ' search__input-active'
    }
  }

  return (
    <form className="search" onSubmit={handleFormSubmit} onClick={handleSearch}>
      <input
        type="text"
        className="search__input"
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}

        placeholder="Поиск"
      />
      <button className="search__btn search__btn-hidden">
        <SeachIcon />
        <CloseIcon />
      </button>
    </form>
  );
}

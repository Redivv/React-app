import { Dropdown, Form, Button } from "react-bootstrap";
import classesLink from "./MenuLink.module.css";
import classesDropdown from "./MenuDropdown.module.css";
import { useState, useContext } from "react";
import OrderContext from "../../../../store/order-context";
import React from "react";

const SearchLink = () => {
  const [searchState, setSearchState] = useState<{
    searchString: string | null;
    typingTimeout: NodeJS.Timeout | null;
  }>({
    searchString: "",
    typingTimeout: null,
  });
  const [isSearching, setIsSearching] = useState(false);
  const orderContext = useContext(OrderContext);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    orderContext.setOrdersAreBeingLoaded();
    if (searchState.typingTimeout) {
      clearTimeout(searchState.typingTimeout);
    }
    setSearchState({
      searchString: event.target.value,
      typingTimeout: setTimeout(function () {
        orderContext.searchOrders(event.target.value);
        if (event.target.value !== "") {
          setIsSearching(true);
        }
      }, 1000),
    });
  };

  const handleClearSearch = () => {
    orderContext.setOrdersAreBeingLoaded();
    setIsSearching(false);
    setTimeout(function () {
      orderContext.getAllCurrentOrders();
    }, 1000);
  };

  return (
    <Dropdown drop="end">
      <Dropdown.Toggle
        className={
          (isSearching ? classesLink.active : "") + " " + classesLink.menuLink
        }
        id="dropdown-basic"
      >
        <i className="fas fa-search"></i>
        <span>Order Search</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classesDropdown.menuDropdown}>
        <Form>
          <Form.Control
            type="text"
            placeholder="Search by order title or client"
            onChange={handleSearchInput}
          />
          <Button type="reset" onClick={handleClearSearch} variant="primary">
            Clear Search
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchLink;

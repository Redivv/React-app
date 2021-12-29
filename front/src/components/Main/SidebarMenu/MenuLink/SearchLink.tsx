import { Dropdown, Form, Button } from "react-bootstrap";
import classesLink from "./MenuLink.module.css";
import classesDropdown from "./MenuDropdown.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import OrderContext from "../../../../store/order-context";
import React from "react";

const SearchLink = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchState, setSearchState] = useState<{
    searchString: string | null;
    typingTimeout: NodeJS.Timeout | null;
  }>({
    searchString: "",
    typingTimeout: null,
  });
  const orderContext = useContext(OrderContext);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    orderContext.setOrdersAreBeingLoaded();
    if (searchState.typingTimeout) {
      clearTimeout(searchState.typingTimeout);
    }
    setSearchState({
      searchString: event.target.value,
      typingTimeout: setTimeout(function () {
        orderContext.searchOrders(event.target.value, false, false);
      }, 1000),
    });
  };

  const focusDropdownInput = () => {
    setTimeout(function () {
      inputRef.current?.focus();
    }, 50);
  };

  const handleClearSearch = () => {
    orderContext.setOrdersAreBeingLoaded();
    setTimeout(function () {
      orderContext.searchOrders(null, false, false);
    }, 1000);
  };

  useEffect(() => {}, [orderContext.searchString]);

  return (
    <Dropdown drop="end" onClick={focusDropdownInput}>
      <Dropdown.Toggle
        className={
          (orderContext.searchString ? classesLink.active : "") +
          " " +
          classesLink.menuLink
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
            ref={inputRef}
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

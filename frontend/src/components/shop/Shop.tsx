import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import "./Shop.scss";
import storeImg from "./store.png";

export default function Shop() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsShown(!isShown);
    
  };

  return (
    <div>
      <button id="btnShop" onClick={handleClick}>
        <img src={storeImg} id="imgShop" />
        Shop
      </button>

      {isShown && (
        <>
          <div className="header">
            <p className="headText">Tickets & passes</p>
            <div className="headerTicketPasses">
              {/* TICKET and PASSES - will switch accordingy */}
              <a className="tickets">TICKETS</a>
              <a className="passes">PASSES</a>
            </div>
          </div>
          {/* addToCartTicketField - data is a hardCoded field at this stage */}
          <div className="addToCartTicketField">
            <p className="ticketDescription">One day ticket</p>
            <p className="ticketValidityTimeDescription">
              You can use this ticket for 24 hours
            </p>
            <p className="ticketPrice">900 Ft</p>
            <p className="ticketValidityTime">24 h</p>
            <button className="btnAddToCart">Add to cart</button>
          </div>
        </>
      )}
    </div>
  );
}

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import './Cart.scss';
import shopIcon from "./shopicon.png";

export default function Cart() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (e:any) => {
  e.preventDefault();
  setIsShown(!isShown);

};

return (
  <div>
    <button id="btnCart" onClick={handleClick}><img src={shopIcon} id="imgCart"/>
      Cart <p>0</p>
    </button>

    {isShown && (
      <>
      <div className="cartField">
        <p className="myCart" >My cart</p>
        <div className="listOfTicketAndPass">
          <p className="ticketOrPassName">One day ticket or Pass</p>
          <p className="quantity">1</p>
          <button className="btnRemoveTicketPass">Remove</button>
        </div>
        <div className="fieldBuyAndReset">
          <button className="btnBuy">Buy</button>
          <button className="btnReset">Reset</button>
        </div>
      </div>
      </>
    )}
   
  </div>
);
  }
  
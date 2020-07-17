import React, { useEffect } from "react";
import Filter from "../components/Filter";
import Products from "../components/Products";
import Cart from "../components/Cart";
import { FaShoppingBag } from 'react-icons/fa';


const HomeScreen = () => {

  const calDepth = () => {
    var element = document.getElementById("sticky");
    if (document.documentElement.scrollTop > 100) {
      if (element) {
        element.style.visibility = "visible";
        element.style.position = "sticky";
      }
    } else if (document.documentElement.scrollTop < 100) {
      if (element) {
        element.style.visibility = "hidden";
        element.style.position = "absolute";
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', calDepth)
  })

  return (
    <div>
      <div id="sticky" onClick={() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }} >
        <FaShoppingBag />
      </div>
      <div className="content">

        <div className="main">
          <Filter></Filter>
          <Products></Products>
        </div>
        <div className="sidebar">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen 

import React from "react";
import "../header.css";

function Header() {
  return (
    <header className="header-banner">
      <div className="overlay">
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>
          Masa madre he ingredientes seleccionados a mano. ¡explosion de sabor
          en tu boca!
        </p>
      </div>
      <hr />
    </header>
  );
}

export default Header;

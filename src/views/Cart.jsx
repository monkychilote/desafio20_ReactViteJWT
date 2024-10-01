import React, { useContext, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { formatCurrency } from "../helpers/format";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import "./Cart.css";
import Swal from "sweetalert2";

const Cart = () => {
  const { amount, increaseQuantity, decreaseQuantity, cart, deleteElementCart, clearCart } = useContext(CartContext); // Incluir clearCart
  const { token } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCheckout = async () => {
    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "Debes iniciar sesión para poder realizar el pago",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      if (response.ok) {
        setSuccessMessage('¡Compra realizada con éxito!');
        clearCart(); // Vaciar el carrito después de la compra exitosa
        Swal.fire({
          title: 'Success',
          text: '¡Compra realizada con éxito!',
          icon: 'success',
          confirmButtonText: 'Cerrar',
        });
      } else {
        console.error('Error en el checkout');
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema con el pago. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      }
    } catch (error) {
      console.error('Error al enviar el carrito:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center cart-container">
        <Card border="danger" className="cart-card">
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title className="text-center pb-3 pt-3">
              <strong>Carrito de compras</strong>
            </Card.Title>
            {cart.map((c) => (
              <Card className="cart-item-card" key={c.pizzaId}>
                <div className="row g-0 border border-warning rounded">
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <Card.Img className="pt-4" src={c.pizzaImg} />
                  </div>
                  <div className="col-md-8 pt-3">
                    <Card.Body>
                      <Card.Text className="text-center">{c.pizzaName}</Card.Text>
                      <Card.Text className="text-center">{formatCurrency(c.pizzaPrice)}</Card.Text>
                      <div className="cart-item-controls">
                        <div className="d-flex gap-3 align-items-center">
                          <motion.button
                            className="border"
                            variant="light"
                            onClick={() => decreaseQuantity(c.pizzaId)}
                            whileTap={{ scale: 2.2 }}
                          >
                            -
                          </motion.button>
                          <motion.span whileHover={{ scale: 2.2 }} transition={{ duration: 0.2 }}>
                            {c.quantity}
                          </motion.span>
                          <motion.button
                            className="border"
                            variant="light"
                            onClick={() => increaseQuantity(c.pizzaId)}
                            whileTap={{ scale: 2.2 }}
                          >
                            +
                          </motion.button>
                        </div>
                        <strong>Total: $ {formatCurrency(c.pizzaPrice * c.quantity)}</strong>
                        <motion.button
                          className="btn btn-danger"
                          onClick={() => deleteElementCart(c.pizzaId)}
                          whileHover={{ scale: 1.1 }}
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            ))}
            <div className="cart-total">
              <h3>Total carrito: ${formatCurrency(amount)}</h3>
              <Button
                variant="warning"
                className="mt-2"
                onClick={handleCheckout} // Llamar a la función de checkout al hacer clic
              >
                Pagar
              </Button>
            </div>
            <div className="cart-buttons">
              <Button as={Link} to="/" variant="dark">
                Seguir comprando
              </Button>
            </div>
            {successMessage && <p className="text-success mt-2">{successMessage}</p>}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Cart;

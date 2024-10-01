import { createContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => { 
    calculateAmount();
  }, [cart]);

  const addToCart = (pizza) => {
    const findPizzaIndex = cart.findIndex((p) => p.pizzaId === pizza.pizzaId);

    if (findPizzaIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[findPizzaIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const addNewElement = [...cart, pizza];
      setCart(addNewElement);
    }
    toast.success("Pizza agregada al carrito", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const calculateAmount = () => {
    const newAmount = cart.reduce(
      (acc, product) => acc + product.pizzaPrice * product.quantity,
      0
    );
    setAmount(newAmount);
  };

  const increaseQuantity = (id) => {
    const data = [...cart];
    const index = data.findIndex((p) => p.pizzaId == id);
    const newQuantity = Number(data[index].quantity) + 1;
    data[index].quantity = newQuantity;
    setCart(data);
    return;
  };

  const decreaseQuantity = (id) => {
    const data = [...cart];
    const index = data.findIndex((p) => p.pizzaId == id);
    const newQuantity = Number(data[index].quantity) - 1;
    if (newQuantity === 0) {
      data.splice(index, 1);
    } else {
      data[index].quantity = newQuantity;
    }
    setCart(data);
  };

  const deleteElementCart = (id) => {
    const data = [...cart];
    const index = data.findIndex((p) => p.pizzaId == id);
    data.splice(index, 1);
    setCart(data);
    toast.error("Pizza eliminada del carrito", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return;
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]); // Vacía el carrito
    setAmount(0); // Resetea el total a 0
    toast.info("El carrito ha sido vaciado", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <CartContext.Provider
      value={{
        amount,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        cart,
        deleteElementCart,
        clearCart, // Añadir clearCart al contexto
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

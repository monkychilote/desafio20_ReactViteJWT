import Header from "../componentes/Header";
import CardPizza from "../componentes/CardPizza";
import { useEffect, useState } from "react";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    getPizzas();
  }, []);

  const getPizzas = async () => {
    const res = await fetch("http://localhost:5000/api/pizzas");
    const pizzas = await res.json();

    setPizzas(pizzas);
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {pizzas.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <CardPizza
                img={p.img}
                ingredients={p.ingredients}
                name={p.name}
                price={p.price}
                isHome={true}
                id={p.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default Home;

import Item from "../Items/Item.jsx";
import "./Popular.css";
import popular_products from "../Assets/data.js";

const Popular = () => (
  <div className="popular">
    <h1>POPULAR IN WOMEN</h1>
    <hr />
    <div className="popular-items">
      {popular_products.map((item, i) => {
        return (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        );
      })}
    </div>
  </div>
);

export default Popular;

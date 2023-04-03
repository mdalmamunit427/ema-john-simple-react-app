import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    // console.log('Products----',products)
    const storedCart = getShoppingCart();
    const savedCart = [];
    // console.log(storedCart)
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);

      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
      setCart(savedCart);
    }
  }, [products]);

  // console.log(products);
  const handleAddtoCart = (product) => {
    // console.log(product);
    let newCart = [];
    // const newCart = [...cart, product];
    //if product doesn't exist in cart, set quantity = 1;
    //else, update quantity by 1;
    const exists = cart.find(pd => pd.id === product.id)
    if(!exists){
        product.quantity = 1;
        newCart = [...cart, product]
    }
    else{
        exists.quantity = exists.quantity + 1;
        const remaining = cart.filter(pd => pd.id !== product.id);
        newCart = [...remaining, exists]
    }
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddtoCart={handleAddtoCart}
          ></Product>
        ))}
      </div>

      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;

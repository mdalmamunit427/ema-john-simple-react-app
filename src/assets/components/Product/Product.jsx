import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";

const Product = (props) => {
//   console.log(props);
  const { name, img, price, seller, quantity, ratings } = props.product;
    const handleAddtoCart = props.handleAddtoCart;
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-info">
        <h6 className="product-name">{name}</h6>
        <p>Price: ${price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Ratings: {ratings} stars</p>
      </div>
      <button onClick={() => handleAddtoCart(props.product)} className="btn-cart">
        Add to Cart <FontAwesomeIcon icon={faCartPlus} />
        </button>
    </div>
  );
};

export default Product;

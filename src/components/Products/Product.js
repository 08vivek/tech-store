import React from "react";
import { Link } from "react-router-dom";
import imgd from "../../assets/mainBcg.jpeg";
import PropTypes from "prop-types";

export default function Product({ image, title, id, price }) {
  const url = image.url || imgd;
  return (
    <article className="product">
      <div className="img-container">
        <img src={url} alt={title || 'default title'} />
        <Link to={`products/${id}`} className="btn btn-primary product-link">
          details
        </Link>
      </div>
      <div className="product-footer">
        <p className="product-title">{title || 'default title'}</p>
        <p className="product-price">${price || 0}</p>
      </div>
    </article>
  );
}

Product.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};
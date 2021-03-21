import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {product,handleAddProduct}= props

    const {img, name,seller,stock,price, key}= product
    return (
        <div className="product">
             <div>
                <img src={img} alt=""/>
           </div>
             <div>
                <h1 className='product-name'><Link to={'/product/'+key}>{name}</Link> </h1>
                <br/>
                <p><small>By : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock</small></p>


            { props.showAddCart && <button className='main-button' onClick={()=>{handleAddProduct(product)}}>
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>}
            </div>
        </div> 
    );
};

export default Product;
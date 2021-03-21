import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart, setCart]= useState([]);

    const [orderPlaced, setOrderPlaced]= useState(false)

    const history = useHistory()

    const handlePlrocceedCheckout=()=>{
        // setCart([])
        // setOrderPlaced(true) 
        // processOrder()
        history.push('/shipment')
    }


    const removeProduct =(productKey)=> {
        // console.log('remover clicked ', productKey);
         const newCart = cart.filter(pd=> pd.key !== productKey);
         setCart(newCart);
         removeFromDatabaseCart(productKey)
    }
    useEffect(()=>{
        // cart er data 
        const savedCart= getDatabaseCart();
        const productKeys= Object.keys(savedCart)
        const cartProducts = productKeys.map(key =>{
            const product= fakeData.find(pd=> pd.key === key);
            product.quantity = savedCart[key]
            return product
        })
        setCart(cartProducts);

    },[])
let thankYou;
if(orderPlaced){
    thankYou= <img src={happyImage} alt='photo'/>
} 
    return (
        <div className='twin-container'>         
            <div className='product-container'>
                {/* <h3>this is  review component</h3>
                <h3>carts Items {cart.length}</h3> */}
                {
                    cart.map(pd=> <ReviewItem 
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div> 
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handlePlrocceedCheckout} className='main-button'> Procceed Checkout</button>
                </Cart>
            </div>         
        </div>
    );
};

export default Review;
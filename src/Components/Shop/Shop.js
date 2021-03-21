import React, { useState , useEffect} from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart , getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10= fakeData.slice(0,10);

    const [products, setProducts]= useState(first10);
    const [cart,setCart]= useState([]);

        useEffect(()=>{
            const savedCart= getDatabaseCart();
            const productKeys= Object.keys(savedCart);
            const previousCart= productKeys.map(existingKey =>{
                const product = fakeData.find(pd=> pd.key ===existingKey);
                product.quantity= savedCart[existingKey]
                return product;
            })
            setCart(previousCart)
        },[])

    const handleAddProduct= (product)=>{
        // console.log('button clicked',product);

        const toBeAdded= product.key;
        const sameProduct = cart.find(pd=> pd.key===toBeAdded);
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +  1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=> pd.key !==toBeAdded)
            newCart= [...others, sameProduct]
        }
        else{
            product.quantity=1;
            newCart= [...cart, product];
        }
        // const newCart = [...cart ,product]
        setCart(newCart)
      
        // const count = sameProduct.length
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="products-container">
            <ul>
               {
                   products.map(pd=> <Product
                     showAddCart={true} 
                     key={pd.key}
                     product={pd}
                      handleAddProduct={handleAddProduct}>
                     </Product>)                 
               }
           </ul>
            </div> 
            <div className="cart-container">
              <Cart cart={cart}>
                <Link to='/review'>
                    <button className='main-button'>Review Order</button>
                </Link>
              </Cart>
            </div>          
        </div>
    );
};

export default Shop;
import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}= props.product;
    const styles={
        border:'1px solid lightgray',
        marginBotton: '8px',
        paddingBotton: '8px',
        marginLeft: '200px'
    }
    return (
        <div style={styles}>
            <h4> {name}</h4>
            <h4> Prodct quantity : {quantity}</h4>
            <p><small>$ {price}</small></p>
            <button
            onClick={()=> props.removeProduct(key)}
            className="main-button">Remove
            </button>
        </div>
    );
};

export default ReviewItem;
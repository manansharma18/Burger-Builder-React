import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../Burger/Button/Button';
const orderSummary = (props) =>{
    const ingredients = Object.keys(props.ingredients)
    .map(igKey =>{
    return(<li key ={igKey}> <span style ={{textTransform : 'capitalize'}}>
        {igKey}</span>: {props.ingredients[igKey]} </li>);
    });
    return (
        <Aux>
            <p>Your order summary is </p>
            {ingredients}
            <h3>Want to Checkout?</h3>
            <Button btnType = "Danger" clicked = {props.purchaseRemove}>CANCEL</Button>
            <Button btnType = "Success" clicked = {props.purchaseContinue}> CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;
import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
const priceIngredient = {
    salad : 2,
            cheese : 2,
            meat : 3,
            bacon : 4
}

class BurgerBuilder extends Component{


    state ={
        ingredients :{
            salad : 0,
            cheese : 0,
            meat : 0,
            bacon : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing: false
        
    };
    
updatePurchasable =(updatedIngredients) =>{

    const sum = Object.keys(updatedIngredients)
   .map(igKey =>{return updatedIngredients[igKey]})
   .reduce((sum,el)=>{
        return sum + el;
    },0);
    this.setState({purchasable : sum>0});
}

addedIngredientHandler = (type)=>{
    const oldQuantity = this.state.ingredients[type];
    const newQuantity = oldQuantity+1;

    const updatedIngredient = {...this.state.ingredients};

    updatedIngredient[type]=newQuantity;

    const oldPrice = this.state.totalPrice;
    const priceAddition = priceIngredient[type];
    const newPrice = oldPrice+priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredient});
    this.updatePurchasable(updatedIngredient);

};

removedIngredientHandler = (type)=>{
    const oldQuantity = this.state.ingredients[type];
    if(oldQuantity<=0){
        return;
    }
    const newQuantity = oldQuantity-1;

    const updatedIngredient = {...this.state.ingredients};

    updatedIngredient[type]=newQuantity;

    const oldPrice = this.state.totalPrice;
    const priceDeletion = priceIngredient[type];
    const newPrice = oldPrice-priceDeletion;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredient});
    this.updatePurchasable(updatedIngredient);


};

purchaseHandler= ()=>{

    this.setState({purchasing:true});
}

purchaseRemoveHandler = ()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler = ()=>{
    alert('Purchase complete');
}


    render(){

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
                <Aux>
                    <Backdrop show = {this.state.purchasing} cancel = {this.purchaseRemoveHandler}/>
                    <Modal show = {this.state.purchasing}>
                        <OrderSummary 
                        purchaseRemove = {this.purchaseRemoveHandler}
                        purchaseContinue = {this.purchaseContinueHandler}
                        ingredients = {this.state.ingredients}/>
                        </Modal>
                    <Burger ingredients = {this.state.ingredients}/>
                   <BuildControls 
                   added = {this.addedIngredientHandler}
                   removed = {this.removedIngredientHandler}
                   price = {this.state.totalPrice}
                   disabled={disabledInfo}
                   purchasable = {this.state.purchasable}
                   ordered = {this.purchaseHandler}
                   />
               
                </Aux>
        );
    }
}

export default BurgerBuilder;
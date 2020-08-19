import React ,{Component} from 'react';
//import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
//class Burger extends Component{}

const Burger = (props)=>{

    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientsKey =>{
        return [...Array(props.ingredients [ingredientsKey])].map ((_,index) =>{
            console.log(ingredientsKey);
            return <BurgerIngredient key = {ingredientsKey+index} type={ingredientsKey} />
        }
        )
    }).reduce((arr,el)=>{
       return arr.concat(el);
    },[])
        if (transformedIngredients.length ===0){
            transformedIngredients = <p>Please start adding ingredients</p>
        }
    return(<div className ={classes.Burger}>
            <BurgerIngredient type ="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
            
    </div>);
}
export default Burger;
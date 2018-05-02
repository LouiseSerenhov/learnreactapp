import React from "react";
import {formatPrice} from "../helpers";

class Fish extends React.Component {
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    render() {
        const image = this.props.details.image;
        const name = this.props.details.name;
        const price = this.props.details.price;
        const desc = this.props.details.desc;
        const status = this.props.details.status;
        const isAvailable = status === "available";
        return (
            <li className = "menu-fish">
                <img src = {image} alt = ""/>
                <h3 className = "fish-name">
                {name}
                <span className = "price">{formatPrice(price)}</span>
                </h3>  
                <p className = "desc">{desc}</p>
                <button disabled ={!isAvailable} onClick = {this.handleClick}>
                    {isAvailable ? "Add to Order" : "Sold out!"}
                    </button>
            </li>
        )
    }
}

export default Fish;
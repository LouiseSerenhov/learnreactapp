import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import  Fish from "./Fish";
import base from "../base"
import PropTypes from "prop-types";

class App extends React.Component {
state = {
    fishes: {},
    order: {}
};

static propTypes = {
    match: PropTypes.object
}


componentDidMount(){
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
        this.setState({ order: JSON.parse(localStorageRef) });
      }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: "fishes"
    });
}

componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }


componentWillUnmount () {
    base.removeBinding(this.ref);
};

addFish = fish => {
    //kopia av exsisterande state
    const fishes = { ...this.state.fishes};
    // lägg till ny fisk till fishes variablen
    fishes[`fish${Date.now()}`] = fish;
    // sätt nya fishes objektet till state
    // this.setState { fishes: fishes });
    this.setState ({fishes});
}

updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes: fishes})
}

deleteFish = (key) => {
    const fishes = {...this.state.fishes}
    fishes[key] = null;
    this.setState({fishes})
}

loadSampleFishes = () => {
    this.setState({fishes: sampleFishes });
};

addToOrder = (key) => {
    //kopia av exsisterande state
    const order = { ...this.state.order};
    //lägg till i order eller uppdatera numret av ordern
    order[key] = order[key] + 1 || 1;
    //anropa seState för att uppdatera state objektet
    //kan också skriva this.setState ({order: order})
    this.setState({order});
}

removeFromOrder = (key) => {
    const order = { ...this.state.order};
    delete order[key];
    this.setState({order})
}

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                <Header tagline = "Lollo Is Cool" />
                <ul className = "fishes">
                    {Object.keys(this.state.fishes).map(key => 
                    <Fish 
                    key = {key} 
                    index = {key}
                    details = {this.state.fishes[key]} 
                    addToOrder = {this.addToOrder}
                    />
                    )}
                </ul>
                </div>
                <Order 
                fishes = {this.state.fishes} 
                order = {this.state.order}
                removeFromOrder = {this.removeFromOrder}
                />
                <Inventory 
                addFish = {this.addFish} 
                updateFish = {this.updateFish}
                deleteFish = {this.deleteFish}
                loadSampleFishes = {this.loadSampleFishes}
                fishes = {this.state.fishes}
                storeId = {this.props.match.params.storeId}
                />

            </div>

        )
    }
}

export default App;
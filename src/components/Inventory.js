import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import firebase from "firebase";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
    static propTypes = {
        fishhes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null, 
        owner: null
    }

componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.authHandler({user});
        }
    })
}

authHandler = async authData => {
    //look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this})
    console.log(store);
    //claim it if there is no owner
    if (!store.owner){
        await base.post(`${this.props.storeId}/owner`, {
            data: authData.user.uid
        })
    }
    //save it as your own
    //Set the state of the inventory component to reflect the current user
    this.setState({
        uid: authData.user.uid,
        owner: store.owner || authData.user.uid
    })
};

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null});
    }

    render() {
        const logout = <button onClick = {this.logout}> Log out! </button>

        // Check if there is a logged in user 
        if (!this.state.uid){
            return <Login authenticate = {this.authenticate} />;
        }
        // Check if they are the owner of the store
        if (this.state.uid !== this.state.owner){
            return <div>
                <p>Sorry you are not the owner to this store! </p>
                {logout}
                </div>
        } 
        //they must be the owner, just render the inventory 
        return (
            <div className = "inventory">
                <h2>Inventory!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => 
                <EditFishForm 
                key = {key} 
                index = {key}
                fish = {this.props.fishes[key]} 
                updateFish = {this.props.updateFish}
                deleteFish = {this.props.deleteFish}
                />
                )}
                <AddFishForm addFish = {this.props.addFish}/>
                <button onClick = {this.props.loadSampleFishes}>
                    Load sample Fishes! 
                </button>
            </div>
      
        );
    }
}

export default Inventory;
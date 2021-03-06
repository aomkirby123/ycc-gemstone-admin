import React from 'react'
import ReactDOM from 'react-dom'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import "./assets/css/gem.css"
import "./assets/material-icon/material-icons.css"
import { selector } from 'postcss-selector-parser';

let config = {
    apiKey: "AIzaSyD69fVmX1N539fYPjj4X2mu7hDR4LYAnL8",
    authDomain: "ycccamp.firebaseapp.com",
    databaseURL: "https://ycccamp.firebaseio.com",
    projectId: "ycccamp",
    storageBucket: "ycccamp.appspot.com",
    messagingSenderId: "191460697180"
};
firebase.initializeApp(config);
let firestore = firebase.firestore();

class App extends React.Component {
    state = {
        auth: undefined,
        data: undefined,
        password: "",
        loginBorder: "grey",
        targetUID: "",
        point: 0,
        type: undefined
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if(user) return this.setState({ auth: user.uid });
            this.setState({ auth:false });
        });
    }

    login(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword("gemstone@ycc.in.th",this.state.password).then(user => {
            this.setState({
                auth: user.uid
            })
        }).catch(err => {
            this.setState({
                loginBorder: "red"
            });
            setTimeout(_ => { this.setState({ loginBorder: "grey"}) },3000)
        });
    }

    logout(){
        firebase.auth().signOut();
        this.setState({
            auth: false
        })
    }

    selectPlus(e){
        e.preventDefault();
        this.setState({
            type: "increase"
        })
    }

    selectMinus(e){
        e.preventDefault();
        this.setState({
            type: "decrease"
        })
    }

    updateScore(e){
        e.preventDefault();
    }

    render(){
        if(this.state.auth === undefined){
            return(
                <div id="gemstone">
                    <div id="loadscreen">
                        <div className="loader">
                            <svg className="circular" viewBox="25 25 50 50">
                                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                            </svg>
                            <svg className="circular circular-shadow" viewBox="25 25 50 50">
                                <circle className="path path-shadow" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                            </svg>
                        </div>
                    </div>
                </div>
            )
        } else if(this.state.auth){
            return(
                <div id="gemstone">
                    <div id="card-wrapper">
                        <div id='card-icon-wrapper'>
                            <i className="material-icons" id="card-icon">
                                settings
                            </i>
                        </div>
                        <form id='card-body'>
                            <h1 id="card-title">Admin</h1>
                            <input
                                className="input-text"
                                placeholder="UID"
                                type="text"
                                onChange={e => this.setState({ targetUID: e.target.value })}
                                value={this.state.targetUID}
                            />
                            <input
                                className="input-text" 
                                placeholder="point"
                                type="number"
                                onChange={e => this.setState({ point: e.target.value })}
                            />
                            <div id="number-type">
                                <button 
                                    onClick={e => selectPlus(e)} className="number-option">
                                    +
                                </button>
                                { this.state.type === "decrease" ?
                                    <button
                                        onClick={e => selectMinus(e) } className="number-option active">
                                        -
                                    </button>
                                    :
                                    <button
                                        onClick={e => selectMinus(e) } className="number-option">
                                        -
                                    </button>
                                }
                            </div>
                            <button id="login-button">
                                Magic
                            </button>
                        </form>
                    </div>
                    <div id="logout" onClick={() => this.logout()}>Logout</div>
                </div>
            )
        } else {
            return(
                <div id="gemstone">
                    <div id="card-wrapper">
                        <div id='card-icon-wrapper'>
                            <i className="material-icons" id="card-icon">
                                settings
                            </i>
                        </div>
                        <form id='card-body' onSubmit={e => this.login(e)}>
                            <h1 id="card-title">Admin</h1>
                            <input 
                                id="password"
                                style={{borderColor: this.state.loginBorder }}
                                type="password"
                                placeholder="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                value={this.state.password}
                            />
                            <button id="login-button">Login</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
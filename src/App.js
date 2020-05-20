import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component  {
  // no longer needed as we used redux store and dispatcher
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
   
      // check to see if a user is sign in, if they are we get back a userRef object from the
      // userAuth object if there is no object we will create one in firebase.utils
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // here we subscribe / listen to any changes to the userRef object, and will get back
        // the first state of that data 'snapShot' and with that we will set the local state
        // of our local app js, with the snapShot.id and ...snapShot.data()
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

        });
      } else {
        // if the user ever logs out we will set the currenUser to userAuth which is the null
        // we get back from the auth library
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/shop' component={ShopPage}></Route>
          <Route path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


// passing in null as we don't need a mapStateToProps in App
export default connect(null, mapDispatchToProps)(App);

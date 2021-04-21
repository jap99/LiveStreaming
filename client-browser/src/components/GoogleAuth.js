import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {  // This component w/ interact w/ Redux

    componentDidMount() {   // by the time componentDidMount is called, we've already rendered the UI onto the screen
        // AUTH - after the user authenticates be sure to update the screen; we'll use COMPONENT LEVEL STATE to manage their auth state w/ this.setState & when its updated the UI rerenders
        // If u don’t write 'window.' it’ll give a not defined error. also, window is to ensure the variable is available in our window scope in our browser
        // load up the client:auth2 library & use a callback for when the additional JS is downloaded from the google server; we'll use an arrow function as a 2nd arg.
        window.gapi.load('client:auth2', () => {   // arrow function's invoked after client:auth2 library's loaded into the gAPI 
            window.gapi.client.init({              // after u load the client library, pass in an object that has clientId & scope to init (list the scopes u want to load) // init is an async request
                clientId:'240503795177-vdph9f63rbfbcbi190r3ne52enir46kf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => { // FIND OUT IF USER IS SIGNED IN
                this.auth = window.gapi.auth2.getAuthInstance();    // getAuthInstance() returns a google auth instance that lets us see if a user's signed in, & to sign them in/out
                // dispatch an action when we finish init to indicate if user's signed in/out
                // updates auth state in our redux store
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    // it's an arrow fcn since it's a callback & we want its context bound to our component
    onAuthChange = (isSignedIn) => {      
        if (isSignedIn) {
            // pass the user's google ID to the signIn action creator
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
           this.props.signOut();
        };
    };

    onSignInClick = () => {
        this.auth.signIn();             // invokes GAPI Auth2's signIn method
    };

    onSignOutClick = () => {
        this.auth.signOut();             // invokes GAPI Auth2's signOut method
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            // no paranthesis on the onClick method names so they don't get invoked immediately when comp renders
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign In with Google
                </button>
            );
        }
    };

    render() {
        return <div> { this.renderAuthButton() } </div>;
    };

};


const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

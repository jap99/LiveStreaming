import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        // window is to ensure the variable is available in our window scope in our browser
        window.gapi.load('client:auth2', () => {   // arrow function's invoked after client:auth2 library's loaded into the API 
            window.gapi.client.init({     
                clientId:'240503795177-vdph9f63rbfbcbi190r3ne52enir46kf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
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
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
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

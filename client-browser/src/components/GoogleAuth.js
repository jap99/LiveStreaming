import React from 'react';

class GoogleAuth extends React.Component {
  
    state = { isSignedIn: null };

    componentDidMount() {
        // window is to ensure the variable is available in our window scope in our browser
        window.gapi.load('client:auth2', () => {   // arrow function's invoked after client:auth2 library's loaded into the API 
            window.gapi.client.init({     
                clientId:'240503795177-vdph9f63rbfbcbi190r3ne52enir46kf.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = () => {      // it's an arrow fcn since it's a callback & we want its context bound to our component
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    }

    onSignIn = () => {
        this.auth.signIn();
    };

    onSignOut = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            // no paranthesis on the onClick method names so they don't get invoked immediately when comp renders
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                <i className="google icon" />
                Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
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

export default GoogleAuth;

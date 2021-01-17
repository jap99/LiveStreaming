import React from 'react';

class GoogleAuth extends React.Component {
  
    componentDidMount() {
        // window is to ensure the variable is available in our window scope in our browser
        window.gapi.load('client:auth2', () => {   // arrow function's invoked after client:auth2 library's loaded into the API 
            window.gapi.client.init({     
                clientId:'240503795177-vdph9f63rbfbcbi190r3ne52enir46kf.apps.googleusercontent.com',
                scope: 'email'
            });
        });
    };

    render() {
        return <div>Google Auth</div>;
    };
};

export default GoogleAuth;

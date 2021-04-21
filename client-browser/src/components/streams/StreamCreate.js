import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

  onSubmit = (formValues) => {  // if the inputs are valid this onSubmit is invoked
    this.props.createStream(formValues) // onSubmit calls our action creator createStream
  };

  render() { 
    return ( 
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={ this.onSubmit } />
      </div>
    );
  };
};

export default connect(null, { createStream })(StreamCreate);




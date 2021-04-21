import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  };

  onSubmit = (formValues) => {  // this callback receives formValues from StreamForm
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return ( 
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={ _.pick(this.props.stream, 'title', 'description') } // title & description were set in StreamForm render's Field elements
          onSubmit={ this.onSubmit }/>
      </div>
    );
  };

};

// we want this function still so we can get initial values for the form
const mapStateToProps = (state, ownProps) => {  // ownProps is a ref to the props that shows up in StreamEdit since it's rendered by a Route in App.js so we get the props from RR
  return { stream: state.streams[ownProps.match.params.id] }  // take the streams from the redux store & find the stream we need to edit; then access it in StreamEdit as this.props.stream
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

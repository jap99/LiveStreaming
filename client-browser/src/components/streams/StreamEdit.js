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
    console.log(formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return ( 
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm 
          initialValues={ _.pick(this.props.stream, 'title', 'description') }
          onSubmit={ this.onSubmit }/>
      </div>
    );
  };

};

// we want this function still so we can get initial values for the form
const mapStateToProps = (state, ownProps) => {  // ownProps is the props that shows up in StreamEdit comp
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

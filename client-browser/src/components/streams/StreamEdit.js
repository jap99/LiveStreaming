import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  };

  onSubmit = (formValues) => {  // receives formValues from StreamForm
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
          initialValues={ _.pick(this.props.stream, 'title', 'description') }
          onSubmit={ this.onSubmit }/>
      </div>
    );
  };

};

// gets initial values for the form:
const mapStateToProps = (state, ownProps) => {  // ownProps are the props that show up in StreamEdit
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);

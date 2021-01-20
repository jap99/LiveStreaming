import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  };

  render() {
    console.log(this.props);
    return (
      <div> 
        Stream Edit 
      </div>
    );
  };

};

const mapStateToProps = (state, ownProps) => {  // ownProps is the props that shows up in StreamEdit comp
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamEdit);

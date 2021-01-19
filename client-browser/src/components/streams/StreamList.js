import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {      // class based so we can call action creator in componentDidMount

  componentDidMount() {
    this.props.fetchStreams();  // calling the action creator (since we only want to fetch our streams 1 time)
  };

  render() {
    return (
      <div>Stream List</div>
    );
  };

};

export default connect(null, { fetchStreams })(StreamList);

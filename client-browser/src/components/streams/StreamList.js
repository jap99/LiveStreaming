import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {      // class based so we can call action creator in componentDidMount

  componentDidMount() {
    this.props.fetchStreams();  // calling the action creator (since we only want to fetch our streams 1 time)
  };

  renderDeleteAndEditButtons(stream) {
    if (stream.userID === this.props.currentUsersID) {
      return <div>EDIT/DELETE</div>
    }
  };

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            { stream.title }
            <div className="description"> {stream.description} </div>
          </div>
          { this.renderDeleteAndEditButtons(stream) }
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">
          { this.renderList() }
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  // Object.values takes all the values of an object & puts them in an array
  return {  
    streams: Object.values(state.streams),
    currentUsersID: state.auth.userID
  }
};


export default connect(mapStateToProps, { fetchStreams })(StreamList);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {    

  componentDidMount() {
    this.props.fetchStreams();  // calling the action creator (we only want to fetch our streams 1 time)
  };

  renderDeleteAndEditButtons(stream) {  // TODO --- also add server side to prevents hackers modifying other people's streams
    if (stream.userID === this.props.currentUsersID) {
      return (
        <div className="right floated content">
          <Link 
            to={`/streams/edit/${stream.id}`} 
            className="ui button primary">
            EDIT
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    };
  };

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderDeleteAndEditButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  renderCreateButton() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    };
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list"> { this.renderList() } </div>
        { this.renderCreateButton() }
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  // Object.values puts an object's values in an array
  return {  
    streams: Object.values(state.streams),
    currentUsersID: state.auth.userID,
    isSignedIn: state.auth.isSignedIn
  };
};


export default connect(mapStateToProps, { fetchStreams })(StreamList);

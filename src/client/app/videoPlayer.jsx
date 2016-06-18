import React from 'react';
import {render} from 'react-dom';
import Request from 'reqwest';
import YouTube from 'react-youtube';


class VideoPlayer extends React.Component {
  render() {
    const opts = {
      height: '600',
      width: '800',
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <YouTube
        videoId= {this.props.videoId}
      />
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default VideoPlayer

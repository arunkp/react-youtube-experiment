import React from 'react';
import {render} from 'react-dom';
import Request from 'reqwest';

class ListItem extends React.Component{
	constructor(props){
		super(props);
	}

	selectedItem(e){
		var selectedVideo = this.props.data.id.videoId;
		this.props.loadVideo(selectedVideo);
		$(".suggestions").hide();
	}

	render(){
		return <a className="video-thumb" data-id={this.props.data.id.videoId} onClick={this.selectedItem.bind(this)}><img src={this.props.data.snippet.thumbnails.high.url} /></a>
	}
}
export default ListItem;
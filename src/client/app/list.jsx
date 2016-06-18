import React from 'react';
import {render} from 'react-dom';
import Request from 'reqwest';
import ListItem from './listitem.jsx';

class List extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		// console.log(this.props);
		var self = this;
		var list = this.props.data.map(function(item, index){
			return <ListItem data={item} key={index} loadVideo={self.props.loadVideo}/>;
		});
		return <div>
		{list}
		</div>
	}
}
export default List;
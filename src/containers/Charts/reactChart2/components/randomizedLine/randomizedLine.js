import React from 'react';
import {Line} from 'react-chartjs-2';
import { initialData } from './randomizedConfig';

class Graph extends React.Component {
	componentDidServerRender(){
		this.setState(initialData);
	}
	componentDidMount(){
		const _this = this;
		setInterval(() => {
			const { datasets } = _this.state;
			let newData = [];
			let newData2 = [];
			for(let x=0; x< _this.state.labels.length; x++){
				newData.push(Math.floor(Math.random() * 100));
				newData2.push(Math.floor(Math.random() * 100));
			}
			datasets[0].data = newData;
			datasets[1].data = newData2;
			_this.setState({ datasets });
		}, 3000);
	}
	render() {
		return (
			<Line data={this.state} />
		);
	}
};

class RandomLine extends React.Component {
  render() {
    return (
 			<Graph />
    );
  }
};

export default RandomLine;

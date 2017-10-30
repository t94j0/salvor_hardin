import React, { Component } from 'react';
const { sendConnect } = require('../ipcAPI');

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			ip: ''
		}

		this.handleIPChange = this.handleIPChange.bind(this);
		this.handleAggregatorChange = this.handleAggregatorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleIPChange(event) {
		this.setState({ ip: event.target.value });
	}

	handleAggregatorChange(event) {
		this.setState({ type: event.target.value });
	}

	handleSubmit(event) {
		sendConnect(this.state);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Data Aggregator:</label>
				<br/>
				<select value={this.state.value} onChange={this.handleAggregatorChange}>
					<option value="elasticsearch">Elasticsearch</option>
					<option value="splunk">Splunk</option>
				</select>
				<br/>
				<label>IP:</label>
				<br/>
				<input type="text" onChange={this.handleIPChange}></input>
				<br/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

export default Welcome;

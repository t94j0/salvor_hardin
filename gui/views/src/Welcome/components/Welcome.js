import React, { Component } from 'react';
import store from '../../store';
import { addClient } from '../action-creators/clients';
import elasticsearch from 'elasticsearch';

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'elasticsearch',
			ip: 'localhost:9200',
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
		store.dispatch();

		event.preventDefault();
	}

	render() {
		return (
			<div>
			<p>{this.state.error}</p>
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
			</div>
		);
	}
}

export default Welcome;

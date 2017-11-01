import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { addClient } from '../../data/action-creators/clients';
import elasticsearch from 'elasticsearch';

const AddClient = (
			<div>
			<form onSubmit={ this.props.handleSubmit(this.state) }>
				<label>Data Aggregator:</label>
				<br/>
				<select value={ this.state.value } onChange={ this.props.handleAggregatorChange }>
					<option value="elasticsearch">Elasticsearch</option>
					<option value="splunk">Splunk</option>
				</select>
				<br/>
				<label>IP:</label>
				<br/>
				<input type="text" onChange={ this.props.handleAggregatorChange }></input>
				<br/>
				<button type="submit">Submit</button>
			</form>
			</div>
);

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'elasticsearch',
			ip: 'localhost:9200',
		}

		console.log(this.props);
	}

	render() {
		return <AddClient
			handleSubmit={ this.props.handleSubmit }
			handleAggregatorChange={ this.props.handleAggregatorChange }
			handleIPChange={ this.props.handleIPChange }
		/>;
	}
}

const mapDispatch = dispatch => ({
	handleSubmit: state => event => {
		console.log(JSON.stringify(state));
		//dispatch(addClient());
		dispatch(push('/dashboard'))
		event.preventDefault();
	},
	handleAggregatorChange: (event) => {
		this.state.type = event.target.value;
	},
	handleIPChange: (event) => {
		this.state.ip = event.target.ip;
	}
})

export default connect(null, mapDispatch)(Welcome);

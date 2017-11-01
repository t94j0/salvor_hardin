import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import { addClient } from '../../data/action-creators/clients';
// import elasticsearch from 'elasticsearch';

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'elasticsearch',
			ip: '',
		}

		this.handleAggregatorChange = this.handleAggregatorChange.bind(this);
		this.handleIPChange = this.handleIPChange.bind(this);
	}

	handleAggregatorChange(event) {
		this.setState({ type: event.target.value });
	}

	handleIPChange(event) {
		this.setState({ ip: event.target.value });
	}

	render() {
		return (
			<form onSubmit={ this.props.handleSubmit(this.state) }>
				<label>Data Aggregator:</label>
				<br/>
				<select value={ this.state.type } onChange={ this.handleAggregatorChange }>
					<option value="elasticsearch">Elasticsearch</option>
					<option value="splunk">Splunk</option>
				</select>
				<br/>
				<label>IP:</label>
				<br/>
				<input type="text" value={ this.state.ip } onChange={ this.handleIPChange }></input>
				<br/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapDispatch = dispatch => ({
	handleSubmit: state => event => {
		console.log(JSON.stringify(state));
		//dispatch(addClient());
		dispatch(push('/dashboard'))
		event.preventDefault();
	}
})

export default connect(null, mapDispatch)(Welcome);

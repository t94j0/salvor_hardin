import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClient } from '../data/action-creators/clients';

class AddClientContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'elasticsearch',
			ip: ''
		};

		this.updateAggregator = this.updateAggregator.bind(this);
		this.updateIP = this.updateIP.bind(this);
	}

	updateAggregator(event) {
		this.setState({ type: event.target.value });
	}
	updateIP(event) {
		this.setState({ ip: event.target.value });
	}

	render() {
		return (
			<form onSubmit={this.props.submitForm(this.state)}>
				<label>Aggregator Type</label>
				<br />
				<select onChange={this.updateAggregator} >
					<option value="elasticsearch">Elasticsearch</option>
					<option value="Splunk">Splunk</option>
				</select>
				<br />
				<label>Aggregator IP:</label>
				<br />
				<input type="text" onChange={this.updateIP} placeholder="127.0.0.1:9200"/>
				<br />
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

const mapDispatch = dispatch => {
	return {
		submitForm: state => event => {
			console.log(addClient(state.type, state.ip));
			event.preventDefault();
		}
	}
}

export default connect(null, mapDispatch)(AddClientContainer);

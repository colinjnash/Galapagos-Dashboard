import React, { Component } from 'react';
import './Welcome.css';

const styles = {

	input: {

		height: '70px',
		outline: 'none',
		background: 'transparent',
		border:'none',
		borderBottom: '5px solid white',
		width: '50vw',
		margin: '0px auto',
		display: 'block',
		fontSize: '70px',
		color: 'inherit',
		textAlign: 'center'
	}
};


class Welcome extends Component {

	render() {

	return	<form onSubmit={this.props.onSubmit} id="askname" className="askName" placeholder="What's your name?">
	<p> What is your name? </p>
		<input type="text" style={styles.input}/>
		</form>;
		
	}

}

export default Welcome;
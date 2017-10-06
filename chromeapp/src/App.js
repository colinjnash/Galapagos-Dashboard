import React from 'react';
import './App.css';
import Welcome from './Welcome';
import View from 'react-flexbox';


let imgUrl = 'https://goo.gl/wHSrKi';

	const styles = {

		background: {
		background: 'url(' + imgUrl + ')',
		backgroundSize: 'cover',
		width: '100vw',
		height: '100vh',
		

}
	};







const App = () => {



  return (
  <div className="App" style={styles.background}>


    <div className="container">
	<Welcome />
	</div>
</div>
	);
};

export default App;


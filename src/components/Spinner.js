import React from 'react'
import '../css/spinner.css';

const Spinner = (props) => (
	<div className="center">
		<div className="lds-hourglass"></div>
		<p>Loading</p>
  </div>
)

export default Spinner
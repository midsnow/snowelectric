import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import Debug from 'debug'
import Gab from './common/gab'
// add the context menu
import './common/contextMenu';

let debug = Debug('snowstreams:app:listen');

export default (Component) => {
		
	class Listeners extends React.Component {
		constructor(props){
			super(props)
			this.displayName = 'Page Template'
			const clean = props.location.pathname
			this.state = { 
				route: clean,
				prev: clean,
				paths: {clean}
			}
			this._update = false
			this._limiters = {}
		}
		render() {
			// return React.cloneElement(Component, this.props)
			return  <Component {...this.props} {...this.state} />
		}
		componentWillReceiveProps(props) {
			const clean = props.location.pathname
			if(clean !== this.state.route) {
				this.setState({
					route: clean,
					prev: this.state.route
				});
				this._update = true;
			}
		}
		componentDidUpdate() {
			if(this._update) {
				this.onUpdate();
			}
		}
		componentDidMount() {
			this.onMount();
			this.onUpdate();
		}
		onUpdate() {
			let thisComponent = this;
			this._update = false;
			//debug('update listeners')
			window.scrollTo(0,0);
		
			 		
		} // end onUpdate
		onMount() {
			let thisComponent = this;
				
		} // end onMount		
	}

	Listeners.propTypes = {};

	return Listeners
}




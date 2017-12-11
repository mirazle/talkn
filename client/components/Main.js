import React, { Component, PropTypes } from "react"

export default class Main extends Component {

 	render() {
		const{ state, talknAPI } = this.props;
    const { app, user, style } = state;

		return (
      <main style={ style.main.self }>
        <div>
          <header>
          </header>
          <ol>
          </ol>
        </div>

        <div>
          <header>
          </header>
          <ol>
          </ol>
        </div>

        <div>
          <header>
          </header>
          <ol>
          </ol>
        </div>
      </main>
		);
 	}
}

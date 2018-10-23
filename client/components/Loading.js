import React, { Component } from "react"
import conf from 'common/conf';
import LoadingStyle from 'client/style/Loading'

export default class Loading extends Component {
 	render() {
    return (
      <img
        data-component-name={this.constructor.name}
        style={LoadingStyle.getSelf()}
        src={`https://${conf.assetsURL}/img/loading.svg`}
      />
    );
  }
}

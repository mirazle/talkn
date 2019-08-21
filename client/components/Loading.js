import React, { Component } from "react"
import Style from 'client/components/Style';
import LoadingStyle from 'client/style/Loading'
import conf from 'common/conf';

export default class Loading extends Component {
 	render() {
     /*
    return (
      <div style={{width: "inherit", height: "inherit"}}>
        <Style {...this.props} />
        <div className={"Logo"} />
      </div>
    );
    */

    return (
      <img
        data-component-name={"Loading"}
        style={LoadingStyle.getSelf()}
        src={`https://${conf.assetsURL}/img/loading.svg`}
      />
    );
  }
}

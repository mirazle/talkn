import React, { Component } from "react"
import Style from 'client/components/Style';
import LoadingStyle from 'client/style/Loading'
import conf from 'common/conf';

export default class Loading extends Component {
 	render() {
/*
    return (
      <div className={"LogoScreen"}>
        <Style {...this.props} />
        <div className={"LogoWrap1"}>
          <div className={"Logo"} />
        </div>
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

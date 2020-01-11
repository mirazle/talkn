import React, { Component } from "react";
import Style from "client/components/Style";

export default class Loading extends Component {
  render() {
    console.log(this.props);
    const ch = location.href
      .replace("https:/", "")
      .replace("http:/", "")
      .replace("/localhost:8080", "")
      .replace("/localhost", "")
      .replace("/talkn.io", "");
    return (
      <div className={"LogoScreen"}>
        <Style {...this.props} />
        {/*<div className={"LogoCircle"} />*/}
        <div className={"LogoWrap1"}>
          <div className={"Logo"} />
        </div>
        {/*        <div className={"LogoCh"}>Tune : {ch}</div> */}
      </div>
    );
    /*
    return (
      <img
        data-component-name={"Loading"}
        style={LoadingStyle.getSelf()}
        src={`https://${conf.assetsURL}/img/loading.svg`}
      />
    );
*/
  }
}

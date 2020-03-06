import React from "react";
import TalknComponent from "client/components/TalknComponent";
import Style from "client/components/Style";
import conf from "common/conf";

export default class LoadingLogo extends TalknComponent<{}, {}> {
  render() {
    return (
      <div className={"LogoScreen"}>
        <Style {...this.props} />
        {/*<div className={"LogoCircle"} />*/}
        <div className={"LogoWrap1"} />
        <img className={"Logo"} src={`//${conf.assetsImgPath}/talkn_logo2.svg`} />
        {/*        <div className={"LogoCh"}>Tune : {ch}</div> */}
      </div>
    );
  }
}

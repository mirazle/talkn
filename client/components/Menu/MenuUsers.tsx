import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import Marquee from "client/container/util/Marquee";

interface Props {
  clientState: ClientState;
}

export default class MenuUsers extends TalknComponent<Props, {}> {
  renderFriendLiLabel(name, icon, ch) {
    const { style } = this.props.clientState;
    const href = `/${ch}`;
    const label = ch ? (
      <div style={style.menuUsers.namesAddCh}>
        <Marquee text={name} loop={true} hoverToStop={false} trailing={0} leading={0} />
        <Marquee text={ch} loop={true} hoverToStop={false} trailing={0} leading={0} />
      </div>
    ) : (
      <div style={style.menuUsers.names}>
        <br />
        {name}
      </div>
    );

    return (
      <a style={style.menuUsers.wrap} href={href} data-li-a>
        <div style={style.menuUsers.imgWrap}>
          <img style={style.menuUsers.img} src={icon} />
        </div>
        {label}
      </a>
    );
  }

  render() {
    const { style } = this.props.clientState;
    return (
      <div data-component-name={"MenuUsers"} style={style.menuUsers.self}>
        <ol style={style.menuUsers.columns}></ol>
      </div>
    );
  }
}

import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
  }

  handleOnClickchildrenThreadView(){
    const{ user } = this.props.state;
    const childrenThreadView = user.childrenThreadView ? false : true ;
    this.props.onClickChildrenThreadView( childrenThreadView );
  }

 	render() {
    const { style, user, setting } = this.props.state;
    const childrenThreadViewLabel = user.childrenThreadView ? 'ON' : 'OFF';
		return (
      <div style={ style.detail.self }>
        <header style={ style.detail.header }></header>
        <div style={ style.detail.ol } >
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
          ACTION5<br />
          ACTION6<br />
          ACTION7<br />
          ACTION8<br />
          ACTION9<br />
          ACTION0<br />
          ACTION1<br />
          ACTION2<br />
          ACTION3<br />
          ACTION4<br />
        </div>
        <footer style={ style.detail.footer }>
          <div style={ style.detail.footerChild }>ハート</div>
          <div style={ style.detail.footerChild }>シェア</div>
          <div style={ style.detail.footerChild }>投げ銭</div>
        </footer>
      </div>
		);
 	}
}

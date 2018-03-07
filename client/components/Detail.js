import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';
import Icon from './Icon';

export default class Setting extends Component {

  constructor(props) {
    super(props);
  }

 	render() {
    const { style } = this.props.state;
    const { icon } = style;
    const HeartIcon = Icon.getHeart( icon.heart );
    const ShareIcon = Icon.getShare( icon.share );
    const MoneyIcon = Icon.getMoney( icon.money );

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
          <div style={ style.detail.footerChild }>
            { HeartIcon }
            <div>LIKE</div>
          </div>
          <div style={ style.detail.footerChild }>
            { ShareIcon }
            <div>SHARE</div>
          </div>
          <div style={ style.detail.footerChild }>
            { MoneyIcon }
            <div>MONEY</div>
          </div>
        </footer>
      </div>
		);
 	}
}

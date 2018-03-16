import React, { Component, PropTypes } from "react"
import User from 'common/schemas/state/User';

export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.handleOnClickchildrenThreadView = this.handleOnClickchildrenThreadView.bind(this);
    this.handleOnClickLoginTwitter = this.handleOnClickLoginTwitter.bind(this);
  }

  handleOnClickchildrenThreadView(){
    const{ control } = this.props.state;
    const childrenThreadView = control.childrenThreadView ? false : true ;

    if( control.isOpenNotif ){
      this.props.closeNotif();
    }

    talknAPI.onClickChildrenThreadView( childrenThreadView );
  }

  handleOnClickLoginTwitter(){
    talknAPI.login( 'twitter' );
  }

 	render() {
    const { style, control, user, thread } = this.props.state;
    const childrenThreadViewLabel = control.childrenThreadView ? 'ON' : 'OFF';

    const img1 = {...style.setting.img, backgroundImage: 'url( https://pbs.twimg.com/profile_images/927155774937186304/8I_6Wp0c_bigger.jpg )'};

		return (
      <div style={ style.setting.self } >
        <div style={ style.setting.scroll } >

          <br />
          <ol style={ style.setting.columns }>
            <li style={ style.setting.column }>
              { thread.connection  }
            </li>
            <li style={ style.setting.columnLast } onClick={ this.handleOnClickchildrenThreadView }>
              Children thread view: {childrenThreadViewLabel}
            </li>
          </ol>

          <br />
          <ol style={ style.setting.columns }>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/1725640801/baba_bigger.png' />
                <span style={ style.setting.names } >mirazle<br />/news.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/927155774937186304/8I_6Wp0c_bigger.jpg' />
                <span style={ style.setting.names } >fukuty.sho<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/890932897170898944/yIEPHR9C_bigger.jpg' />
                <span style={ style.setting.names } >自由になりたいあなたへ<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/946122762396999680/zOCsFkrw_bigger.jpg' />
                <span style={ style.setting.names } >古谷 沙綾香<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/855356315551449088/UMsYHYKZ_bigger.jpg' />
                <span style={ style.setting.names } >りゅう＠のんびりパパ<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/589975861878661121/yPshjOKb_bigger.jpg' />
                <span style={ style.setting.names } >ベンチャータイムス<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/930011731174109184/8FcK1ARX_bigger.jpg' />
                <span style={ style.setting.names } >中田真広<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/753595099590762497/u3y4bddq_bigger.jpg' />
                <span style={ style.setting.names } >ｎａｈｏ<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/815378347618205697/d9qS-g6z_bigger.jpg' />
                <span style={ style.setting.names } >takayukii<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/753735960316121088/8_Pf8eTu_bigger.jpg' />
                <span style={ style.setting.names } >柳本　顕<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/378800000561520910/39aa6d3e3e119c25136ed1de40705294_bigger.jpeg' />
                <span style={ style.setting.names } >yukki<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/913411791287345152/BWboXDW2_bigger.jpg' />
                <span style={ style.setting.names } >さくら剛<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/1519836653/EAAD6F43-D430-476B-916A-2EBF05114616_bigger' />
                <span style={ style.setting.names } >南野真太郎(MTRo)<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.column }>
              <div style={ style.setting.wrap }>
                <img style={ style.setting.img } src='https://pbs.twimg.com/profile_images/27767372/e__-1_bigger.png' />
                <span style={ style.setting.names } >sk<br />/www.yahoo.co.jp</span>
              </div>
            </li>
            <li style={ style.setting.columnLast } onClick={this.handleOnClickLoginTwitter}>
              → LOGIN
            </li>
          </ol>
          <br />
        </div>
      </div>
		);
 	}
}

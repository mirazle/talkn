import React, { Component } from "react"
import { connect } from 'react-redux';
import define from 'common/define';
import App from 'common/schemas/state/App';
import Loading from 'client/components/Loading';
import Style from 'client/components/Style';
import Main from 'client/components/Main';
import handles from 'client/actions/handles';
import callbacks from 'client/actions/callbacks';
import Footer from 'client/components/Footer';
import mapToStateToProps from 'client/mapToStateToProps/';

class Container extends Component {

  componentWillMount(){
    const { state, talknAPI } = this.props;
    const { thread } = state;
    talknAPI.find( thread.connection );
    talknAPI.findMenuIndex( thread.connection );
    this.handleOnClickToggleMain = this.handleOnClickToggleMain.bind(this);
  }

  handleOnClickToggleMain( e ){
    const { onClickToggleMain, onClickOpenLockMenu, state} = this.props;
    const { app } = state;

    if( app.type ===  define.APP_TYPES.EXTENSION ){
      app.isOpenMain = app.isOpenMain ? false : true;
      app.isOpenNotif = false;
      
      onClickToggleMain( {app} );

      if(app.openLockMenu !== App.openLockMenuLabelNo){
        onClickOpenLockMenu(App.openLockMenuLabelNo);
      }
      talknAPI.extension("toggleIframe");
    }
  }

  renderFooter(){
    const { app } = this.props.state;
    if( app.type ===  define.APP_TYPES.EXTENSION){
      return <Footer {...this.props} handleOnClickToggleMain={this.handleOnClickToggleMain }/>;
    }else{
      switch( app.screenMode ){
      case App.screenModeSmallLabel :
        return null;
      case App.screenModeMiddleLabel : 
      case App.screenModeLargeLabel : 
      return <Footer {...this.props} handleOnClickToggleMain={this.handleOnClickToggleMain }/>;
      }
    }
  }

 	render() {
    const { style, app } = this.props.state;
    if( style && style.container && style.container.self && app.connectioned ){
      return (
  			<div data-component-type={this.constructor.name} style={ style.container.self }>
          <Style {...this.props} />
          <Main {...this.props} handleOnClickToggleMain={this.handleOnClickToggleMain } />
          {this.renderFooter()}
  			</div>
  		);
    }else{
      return <Loading />;
    }
 	}
}

export default connect(
	mapToStateToProps,
	{...handles, ...callbacks}
)( Container )

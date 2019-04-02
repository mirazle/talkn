import React from "react"
import define from 'common/define';
import Notif from 'client/components/Notif';

export default ( self ) => {
    const { props } = self;
    const { state } = props;
    const actionName = state.actionLog[0] ;
    const { name: constructorName } = self.constructor;

    if( componentDidUpdates[ constructorName ] ){
        if( componentDidUpdates[ constructorName ][ actionName ] ){
            componentDidUpdates[ constructorName ][ actionName ]( self );
        }
    }
}

const componentDidUpdates = {
    Container: {
        'OPEN_NOTIF': ( self ) => {
            const { app } = self.props.state;

            if( app.type === define.APP_TYPES.EXTENSION ){
                const { handleOnClickToggleMain, state } = self.props;
                const { style, thread } = state;
                const posts = state[ `posts${app.dispThreadType}` ];
                const lastPost = posts[posts.length - 1];

                if( lastPost && !app.isOpenMain ){
            
                    self.props.createNotif();

                    self.setState({
                        notifs: self.state.notifs.concat(
                            <Notif
                                key={lastPost._id}
                                app={app}
                                style={style}
                                thread={thread}
                                post={lastPost}
                                handleOnClickToggleMain={handleOnClickToggleMain}
                            />
                        )
                    });
                }
            }
        }
    },
    Posts: {
        'SERVER_TO_CLIENT[EMIT]:find': ( self ) => {
            const { app } = self.props.state;
            if( app.type !== define.APP_TYPES.EXTENSION ){
                talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
            }
        },
        'SERVER_TO_CLIENT[EMIT]:changeThread': ( self ) => {
            console.log( "CHANGE A" );
            const { app } = self.props.state;
            if( app.type !== define.APP_TYPES.EXTENSION ){
                console.log( "CHANGE B" );
                window.scrollTo(0, 9999999);
            }
        },
        'SERVER_TO_CLIENT[BROADCAST]:post': ( self ) => {
            const { app } = self.props.state;
            if( app.type === define.APP_TYPES.EXTENSION ){
                const { isScrollBottom } = self.state;
                if( app.isOpenMain && isScrollBottom ){
                    self.animateScrollTo(
                      self.refs.thread,
                      self.refs.thread.scrollHeight,
                      400,
                      self.props.endAnimateScrollTo
                    );
                }
                if( app.isOpenMain ){
                    self.props.openNewPost();
                }
            }else{
                talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
                if( app.isOpenMain && talknWindow.isScrollBottom ){
                    talknWindow.animateScrollTo(
                        talknWindow.threadHeight,
                        400,
                        self.props.endAnimateScrollTo
                    );
                }
                if( app.isOpenMain ){
                    self.props.openNewPost();
                }
            }
        },
        'SERVER_TO_CLIENT[EMIT]:getMore': ( self ) => {
            const { app } = self.props.state;
            if( app.type === define.APP_TYPES.EXTENSION ){
                self.refs.thread.scrollTop = self.refs.thread.scrollHeight - self.state.scrollHeight;
            }else{
                const threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
                window.scrollTo(0, threadHeight - talknWindow.threadHeight);
                talknWindow.threadHeight = threadHeight;
            }
            updateThreadServerMetas( self );
        }
    }
}

const updateThreadServerMetas = ( self ) => {
    const { thread } = self.props.state;
    if(thread.isSelfConnection){

        // TODO talknWindowに移動する
        const clientMetas = document.querySelectorAll('meta');
        if( Object.keys( thread.serverMetas ).length !== clientMetas.length ){
            let serverMetas = {};
            for( let i = 0; i < clientMetas.length; i++ ){
                const item = clientMetas[ i ];
                let key = i;
                let content = '';
                if( item.getAttribute('name') ){
                    key = item.getAttribute('name');
                    content = item.getAttribute('content');
                }else if( item.getAttribute('property') ){
                    key = item.getAttribute('property');
                    content = item.getAttribute('content');
                }else if( item.getAttribute('chaset') ){
                    key = 'charset';
                    content = item.getAttribute('chaset');
                }else if( item.getAttribute('http-equiv') ){
                    key = item.getAttribute('http-equiv');
                    content = item.getAttribute('content');
                }

                if( !serverMetas[ key ] ){
                    serverMetas[ key ] = content;
                }
          }
          talknAPI.updateThreadServerMetas(serverMetas);
        }
    }
}
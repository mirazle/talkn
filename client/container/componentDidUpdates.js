import React from "react"
import define from 'common/define';
import Notif from 'client/components/Notif';

export default ( self, props ) => {
    const { state } = props;
    const actionName = self.props.state.actionLog[0] ;
    const { name: constructorName } = self.constructor;
    if( componentDidUpdates[ constructorName ] ){
        if( componentDidUpdates[ constructorName ][ actionName ] ){
            componentDidUpdates[ constructorName ][ actionName ]( self, state, props );
        }
    }
}

const componentDidUpdates = {
    Container: {
        'SERVER_TO_CLIENT[EMIT]:find': ( self, state, props ) => {
            talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
        },
        'SERVER_TO_CLIENT[BROADCAST]:post': ( self, state, props ) => {
            const { app } = props.state;
            talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
            if( app.isOpenMain && talknWindow.isScrollBottom ){
              talknWindow.animateScrollTo(
                talknWindow.threadHeight,
                400,
                self.props.endAnimateScrollTo
              );
            }else{
                if( app.isOpenMain ){
                    self.props.openNewPost();
                }
            }
        },
        'SERVER_TO_CLIENT[EMIT]:getMore': ( self, state, props ) => {
            const threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
            window.scrollTo(0, threadHeight - talknWindow.threadHeight);
            talknWindow.threadHeight = threadHeight;
            updateThreadServerMetas( self, state, props );
        },
        'SERVER_TO_CLIENT[EMIT]:changeThread': ( self, state, props ) => {
            window.scrollTo(0, 9999999);
        },
        'OPEN_NOTIF': ( self, state, props ) => {
            const { handleOnClickToggleMain } = props;
            const { app, style, thread } = props.state;
            const posts = state[ `posts${app.dispThreadType}` ];
            const lastPost = posts[posts.length - 1];
            if(
                lastPost &&
                app.type === define.APP_TYPES.EXTENSION &&
                !app.isOpenMain
            ){
        
                props.createNotif();
console.log(self.state);
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
    },
    Posts: {
        'SERVER_TO_CLIENT[BROADCAST]:post': ( self, state, props ) => {
            const { app } = state;
            const { isScrollBottom } = self.state;
            if( app.isOpenMain && isScrollBottom ){
                self.animateScrollTo(
                  self.refs.thread,
                  self.refs.thread.scrollHeight,
                  400,
                  self.props.endAnimateScrollTo
                );
            }
        },
        'SERVER_TO_CLIENT[EMIT]:getMore': ( self, state, props ) => {
            self.refs.thread.scrollTop = self.refs.thread.scrollHeight - self.state.scrollHeight;
            updateThreadServerMetas( self, state, props );
        }
    }
}

const updateThreadServerMetas = ( self, state, props ) => {
    const { thread } = state;
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
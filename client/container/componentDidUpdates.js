import React from "react"
import define from 'common/define';
import Notif from 'client/components/Notif';
import TalknWindow from 'client/operations/TalknWindow';

export default ( self, constructorName ) => {
    const { props } = self;
    const { actionLog } = props.state;
    const actionName = actionLog[0] ;
    if( componentDidUpdates[ constructorName ] ){
        if( componentDidUpdates[ constructorName ][ actionName ] ){
            componentDidUpdates[ constructorName ][ actionName ]( self );
        }
    }
}

const componentDidUpdates = {
    Container: {
        'SERVER_TO_CLIENT[EMIT]:find': ( self ) => {
            const { app } = self.props.state;
            app.postsHeight += TalknWindow.getPostsHeight();
            self.props.updatePostsHeight(app.postsHeight);
        },
        'ON_TRANSITION_END': ( self ) => {
            const { app } = self.props.state;
            app.postsHeight += TalknWindow.getPostsHeight();
            self.props.updatePostsHeight(app.postsHeight);
        },
        'OPEN_NOTIF': ( self ) => {
            const { app } = self.props.state;

            if( app.type === define.APP_TYPES.EXTENSION ){
                const { handleOnClickToggleMain, state } = self.props;
                const { style, thread } = state;
                const posts = state[ `posts${app.dispThreadType}` ];
                const lastPost = posts[posts.length - 1];

                if( lastPost && !app.isOpenPosts ){
            
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
        },
        'CLOSE_NOTIF': ( self ) => {
            if( self.state.notifs.length > 0 ){
                self.setState({notifs: []});
            }
        },
        'ON_CLICK_TOGGLE_MAIN': ( self ) => {
            const { app } = self.props.state;
            if( app.type === define.APP_TYPES.EXTENSION ){
                
                talknAPI.extension("getClientMetas");
            }
        },
        'GET_CLIENT_METAS': ( self ) => {
            const { serverMetas } = self.props.state.thread;
            
            talknAPI.updateThreadServerMetas(serverMetas);
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
            const { app } = self.props.state;
            if( app.type !== define.APP_TYPES.EXTENSION ){
                window.scrollTo(0, 9999999);
            }
        },
        'SERVER_TO_CLIENT[BROADCAST]:post': ( self ) => {
            const { app } = self.props.state;
            console.log("@@@- " + app.type );
            app.postsHeight += TalknWindow.getLastPostHeight();
            self.props.updatePostsHeight(app.postsHeight);
            if( app.type === define.APP_TYPES.EXTENSION ){
                const { isScrollBottom } = self.state;
                if( app.isOpenPosts && isScrollBottom ){
                    self.animateScrollTo(
                      self.refs.thread,
                      self.refs.thread.scrollHeight,
                      400,
                      self.props.endAnimateScrollTo
                    );
                }
                if( app.isOpenPosts ){
                    self.props.openNewPost();
                }
            }else{
                console.log("A " + app.isOpenPosts + " && " + talknWindow.isScrollBottom );
                talknWindow.threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
                if( app.isOpenPosts && talknWindow.isScrollBottom ){
                    console.log("B");
                    talknWindow.animateScrollTo(
                        talknWindow.threadHeight,
                        400,
                        self.props.endAnimateScrollTo
                    );
                }
                if( app.isOpenPosts ){
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
        }
    }
}

const updateThreadServerMetas = ( self ) => {
    
    const { thread } = self.props.state;

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

            console.log( key + " = " + content );

            //if( !serverMetas[ key ] ){
                serverMetas[ key ] = content;
            //}
        }
        
        talknAPI.updateThreadServerMetas(serverMetas);
    }
}
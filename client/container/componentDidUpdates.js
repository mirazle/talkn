import React from "react"
import App from 'common/schemas/state/App';
import Notif from 'client/components/Notif';
import TalknWindow from 'client/operations/TalknWindow';
import TalknMedia from 'client/operations/TalknMedia';
import storage from 'client/mapToStateToProps/storage';

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

            const { app, thread } = self.props.state;
            const Posts = document.querySelector("[data-component-name=Posts]");
            const connection = thread.connection;
            app.postsHeight += TalknWindow.getPostsHeight();
            self.props.updatePostsHeight(app.postsHeight);

            if( app.extensionMode === "NONE" && Posts ){

                window.scrollTo(0, 9999999);

                talknWindow.threadHeight = Posts.clientHeight;

                if( app.dispThreadType === App.dispThreadTypeTimeline){
                    TalknMedia.init("FIND");
                    const timeline = storage.getStoragePostsTimeline( connection );
                    const media = TalknMedia.getMedia( thread );
                    window.talknMedia = new TalknMedia();
                    window.talknMedia.setTimeline( timeline );
                    window.talknMedia.startMedia( media );
                }
            }

            if( !app.isOpenLinks ){
                talknAPI.closeLinks();
            }

            talknWindow.parentTo("find", self.props.state);
        },
        'SERVER_TO_CLIENT[BROADCAST]:find': ( self ) => {},
        'SERVER_TO_CLIENT[EMIT]:changeThreadDetail': ( self ) => {
            const { app, threadDetail, thread } = self.props.state;
            if( !app.isOpenDetail ){
                app.isOpenDetail = true;
                talknAPI.onClickToggleDispDetail( {threadDetail, thread, app} );
            }
        },
        'ON_TRANSITION_END': ( self ) => {
            const { app } = self.props.state;
            app.postsHeight += TalknWindow.getPostsHeight();
            self.props.updatePostsHeight(app.postsHeight);
        },
        'OPEN_NOTIF': ( self ) => {
            const { app } = self.props.state;
            if(
                app.extensionMode === App.extensionModeExtBottomLabel ||
                app.extensionMode === App.extensionModeExtIncludeLabel ||
                app.extensionMode === App.extensionModeExtModalLabel
            ){
                const { handleOnClickToggleMain, props } = self;
                const { style, thread } = props.state;
                const posts = props.state[ `posts${app.dispThreadType}` ];
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
        'ON_CHANGE_FIND_TYPE': ( self ) => {
            const { connection } = self.props.state.thread;
            talknAPI.findMenuIndex( connection );
        },
        'CLOSE_NOTIF': ( self ) => {
            if( self.state.notifs.length > 0 ){
                self.setState({notifs: []});
            }
        },
        'DELEGATE_POST': ( self ) => {
            talknAPI.post();
            talknAPI.onChangeInputPost('');
            talknAPI.closeDispPostsSupporter();
        },
        'GET_CLIENT_METAS': ( self ) => {
            const { app, thread } = self.props.state;
            const { serverMetas } = thread;
            if( !app.isLinkConnection ){
                talknAPI.updateThreadServerMetas(serverMetas);
            }
        },
        'ON_CLICK_TOGGLE_DISP_DETAIL': (self) => {
            const { app } = self.props.state;
            if(
                app.extensionMode === App.extensionModeExtModalLabel ||
                app.extensionMode === App.extensionModeExtIncludeLabel
            ){
                talknWindow.parentTo("getClientMetas");
            }
        },
        'RESIZE_END_WINDOW': ( self ) => {
            const Posts = document.querySelector("[data-component-name=Posts]");
            talknWindow.threadHeight = Posts.clientHeight;
            changeLockMode( self, "Container" );
        },
    },
    Posts: {
        'SERVER_TO_CLIENT[BROADCAST]:find': ( self ) => {
            changeLockMode( self, "Posts" );
        },
        'RESIZE_END_WINDOW': ( self ) => {
            changeLockMode( self, "Posts" );
        },
        'NEXT_POSTS_TIMELINE': post,
        'SERVER_TO_CLIENT[BROADCAST]:post': post,
        'SERVER_TO_CLIENT[EMIT]:getMore': ( self ) => {
            const { app } = self.props.state;
            const Posts = document.querySelector("[data-component-name=Posts]");

            // ADJUSTMENT GET MORE SCROLL VOLUME
            if(
                app.extensionMode === App.extensionModeExtBottomLabel ||
                app.extensionMode === App.extensionModeExtIncludeLabel ||
                app.extensionMode === App.extensionModeExtModalLabel
            ){
                Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
            }else{
                
                if( app.screenMode === App.screenModeLargeLabel ){
                    Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
                    console.log( "POSTS " + Posts.scrollTop + " = " + Posts.scrollHeight + " - " + self.state.scrollHeight );
                }else{
                    const scrollTo = Posts.clientHeight - talknWindow.threadHeight;
                    console.log( "WINDOW " + scrollTo + " = " + Posts.clientHeight + " - " + talknWindow.threadHeight );
                    window.scrollTo(0, scrollTo );
                    talknWindow.threadHeight = Posts.clientHeight;    
                }
            }
        }
    }
}

function changeLockMode( self, called ){
    const { app, actionLog } = self.props.state;
    if( app.extensionMode === App.extensionModeExtNoneLabel ){
        if( app.screenMode === App.screenModeLargeLabel ){

            if( called === "Posts" ){
                if( actionLog[ 0 ] === "SERVER_TO_CLIENT[BROADCAST]:find" ){
                    self.refs.thread.scrollTop = 99999;
                }else{

                }
            }else{
                console.log( self );
                if( actionLog[ 0 ] === "SERVER_TO_CLIENT[EMIT]:find" ){

                }else{
                    
                }
            }
/*
            self.props.animateScrollTo(
                9999999,
                0
            );
*/
            talknWindow.lockWindow({});
        }else{
            
            window.scrollTo(0, 9999999);
            talknWindow.unlockWindow({});
        }
    }
}

function post( self ){
    const { app } = self.props.state;
    const Posts = document.querySelector("[data-component-name=Posts]");
    app.postsHeight += TalknWindow.getLastPostHeight();

    if( app.extensionMode === "NONE" ){

        talknWindow.threadHeight = Posts.clientHeight;
        if( app.isOpenPosts && talknWindow.isScrollBottom ){
            talknWindow.animateScrollTo(
                talknWindow.threadHeight,
                400,
                self.props.endAnimateScrollTo
            );
        }
        if( app.isOpenPosts ){
            self.props.openNewPost();
        }

    }else{
        if( app.isOpenPosts && talknWindow.isScrollBottom ){
            self.animateScrollTo(
              Posts,
              Posts.scrollHeight,
              400,
              self.props.endAnimateScrollTo
            );
        }
        if( app.isOpenPosts ){
            self.props.openNewPost();
        }
    }
}
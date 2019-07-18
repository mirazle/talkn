import React from "react"
import App from 'common/schemas/state/App';
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
            const { app, thread } = self.props.state;
            app.postsHeight += TalknWindow.getPostsHeight();
            self.props.updatePostsHeight(app.postsHeight);

            if( app.dispThreadType === App.dispThreadTypeTimeline){
                const src = thread.getMediaSrc();
                const tagType = thread.getMediaTagType();
                talknWindow.setupPostsTimeline(app.rootConnection, src, tagType);
            }

            if( app.extensionMode === "NONE"){
                window.scrollTo(0, 9999999);
            }else{
                const Posts = document.querySelector("[data-component-name=Posts]");
                self.animateScrollTo(
                    Posts,
                    Posts.scrollHeight,
                    0,
                    9999999
                );
            }
        },
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
            const { serverMetas } = self.props.state.thread;
            talknAPI.updateThreadServerMetas(serverMetas);
        },
        'ON_CLICK_TOGGLE_DISP_DETAIL': (self) => {
            const { app } = self.props.state;
            if(
                app.extensionMode === App.extensionModeExtModalLabel ||
                app.extensionMode === App.extensionModeExtIncludeLabel
            ){
                talknWindow.parentTo("getClientMetas");
            }
        }
    },
    Posts: {
        'SERVER_TO_CLIENT[EMIT]:find': ( self ) => {
            const { app } = self.props.state;
            const Posts = document.querySelector("[data-component-name=Posts]");
            talknWindow.threadHeight = Posts.clientHeight;
        },
        'NEXT_POSTS_TIMELINE': post,
        'SERVER_TO_CLIENT[BROADCAST]:post': post,
        'SERVER_TO_CLIENT[EMIT]:getMore': ( self ) => {
            const { app } = self.props.state;
            const Posts = document.querySelector("[data-component-name=Posts]");
            if(
                app.extensionMode === App.extensionModeExtBottomLabel ||
                app.extensionMode === App.extensionModeExtIncludeLabel ||
                app.extensionMode === App.extensionModeExtModalLabel
            ){
                Posts.scrollTop = Posts.scrollHeight - self.state.scrollHeight;
            }else{
                const scrollTo = Posts.clientHeight - talknWindow.threadHeight;
                window.scrollTo(0, scrollTo );
                talknWindow.threadHeight = Posts.clientHeight;
            }
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
        const { isScrollBottom } = self.state;
        if( app.isOpenPosts && isScrollBottom ){
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
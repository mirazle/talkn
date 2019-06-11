export default {
    getMore: ( app ) => {
        const { app } = self.props.state;
        const threadHeight = document.querySelector("[data-component-name=Posts]");
        if(
            app.extensionMode === App.extensionModeExtBottomLabel ||
            app.extensionMode === App.extensionModeExtIncludeLabel ||
            app.extensionMode === App.extensionModeExtModalLabel
        ){
            self.refs.thread.scrollTop = self.refs.thread.scrollHeight - self.state.scrollHeight;
        }else{  
            const threadHeight = document.querySelector("[data-component-name=Posts]").clientHeight;
            window.scrollTo(0, threadHeight - talknWindow.threadHeight);
            talknWindow.threadHeight = threadHeight;
        }
    },
    scrollTo: ( app, point, duration ) => {

    }
}
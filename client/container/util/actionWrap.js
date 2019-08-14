import Schema from 'common/schemas/Schema';
import App from 'common/schemas/state/App';
import Thread from 'common/schemas/state/Thread';
import handles from 'client/actions/handles';

export default {
    onClickConnection: ( toConnection, overWriteHasSlash, called ) => {
        let { app, thread, menuIndex, setting } = window.talknAPI.store.getState();

        thread.connection = toConnection;
        if( Schema.isSet( overWriteHasSlash ) ){
            thread.hasSlash = overWriteHasSlash;
        }
        const isLinkConnection = app.isLinkConnection;
        const threadStatus = Thread.getStatus( thread, app, setting );
        let { app: updatedApp, stepTo } = App.getStepToDispThreadType( {app, menuIndex}, threadStatus, toConnection, called );

        if( !isLinkConnection && updatedApp.isLinkConnection ){
        talknAPI.onCatchConnectionAPI( toConnection );
        }

        if( isLinkConnection && !updatedApp.isLinkConnection ){
        talknAPI.offCatchConnectionAPI( beforeConnection );
        }

        app = updatedApp;

        switch(stepTo){
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeChild}`:
        case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeChild}`:
        case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeChild}`:
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeChild}`:
            handles.onClickToChildThread( toConnection, {app, thread} );
            talknAPI.changeThread( toConnection, { app, thread } );
        break;
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeMulti}`:
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeMulti}`:
            handles.onClickToMultiThread( toConnection, {app, thread} );
            talknAPI.changeThread( toConnection, { app, thread } );
        break;
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeSingle}`:
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeSingle}`:
            handles.onClickToSingleThread( toConnection, {app, thread} );
            talknAPI.changeThread( toConnection, { app, thread } );
        break;
        case `${App.dispThreadTypeMulti} to ${App.dispThreadTypeTimeline}`:
        case `${App.dispThreadTypeSingle} to ${App.dispThreadTypeTimeline}`:
        case `${App.dispThreadTypeChild} to ${App.dispThreadTypeTimeline}`:
        case `${App.dispThreadTypeTimeline} to ${App.dispThreadTypeTimeline}`:
            handles.onClickToTimelineThread( toConnection, {app, thread} );
            talknAPI.changeThread( toConnection, { app, thread } );
        break;
        }

    }
}
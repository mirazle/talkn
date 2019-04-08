import define from 'common/define';
import App from 'common/schemas/state/App';
import TalknSession from 'client/operations/TalknSession';

export default {
    "SERVER_TO_CLIENT[EMIT]:getMore": ( state, props ) => {
        return {state, props}
    }
}
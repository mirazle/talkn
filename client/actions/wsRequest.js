
export function initClientState( state ) {
	return { [ "INIT_CLIENT_STATE" ]: state };
}

export function post( params ) {
	return { [ "POST" ]: params };
}

export function find( params ) {
	return { [ "FIND" ]: params };
}

export function setCallback( params ) {
	return { [ "SET_CALLBACK" ]: params };
}

export function changeThread( params ) {
	return { [ "CHANGE_THREAD" ]: params };
}

export function preDeleteIndex( params ) {
	return {
		type: "PRE_DELETE_INDEX",
		talknIndex: params.talknIndex,
		connection: params.connection
	}
}

export function deleteIndex( params ) {
	return { [ "DELETE_INDEX" ]: params };
}

export function getApiMeta( params ) {
	return { [ "GET_API_META" ]: params };
}

export function getApiAnalyze( params ) {
	return { [ "GET_API_ANALYZE" ]: params };
}

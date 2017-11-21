export function initAction( params ) {
	return {
		type: 'INIT_ACTION',
		talknIndex: params.talknIndex,
		styles: params.styles
	}
}


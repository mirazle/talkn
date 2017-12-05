export function catchResponse( response ) {
	return { type: "CATCH_RESPONSE", ...response };
}

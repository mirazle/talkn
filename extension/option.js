const cacheKey = "talknExtensionOptions";
const defaultCacheValues = {
	mode: "MODAL",
	selector: "#talkn",
	position: "static",
	top: "0px",
	right: "0px",
	bottom: "0px",
	left: "0px",
	width: "280px",
	height: "420px",
	zIndex: 2147483647
}

window.onload = () => {
	let cache = getCache();
	const save = document.querySelector("#save");
	const reset = document.querySelector("#reset");
	const modes = document.querySelectorAll("#selectMode div");

	modes.forEach( (div) => {
		if( div.id === cache.mode ){
			div.classList.add( "active" );
			switch( div.id ){
			case "MODAL":
				document.querySelector("#includeModeProperties").style.height = "0px";
				break;
			case "INCLUDE":
				document.querySelector("#includeModeProperties").style.height = "auto";
				break;
			}
		 }else{
			div.classList.remove( "active" );
		 }

		div.addEventListener("click" , (e) => {

			modes.forEach( div => div.classList.remove( "active" ));

			if( e.target.id === "MODAL"){
				document.querySelector("#MODAL").classList.add("active");
				document.querySelector("#includeModeProperties").style.height = "0px";
			}

			if( e.target.id === "INCLUDE"){
				document.querySelector("#INCLUDE").classList.add("active");
				document.querySelector("#includeModeProperties").style.height = "auto";
			}

			cache.mode = e.target.id;
		} );
	} );

	Object.keys( defaultCacheValues ).forEach( ( key ) => {
		const elm = document.querySelector( `#${key}` );
		if( elm && cache[ key ] && cache[ key ] !== "" ){
			elm.value = cache[ key ];
		}else if( elm ){
			elm.value = defaultCacheValues[ key ];
		}
	} );

	save.addEventListener("click", () => {
		const inputs = document.querySelectorAll(".input");
		const notifWrap = document.querySelector("#notifWrap");

		inputs.forEach( (input) => {
			console.log( input.id + " = " + input.value );
			cache[ input.id ] = input.value
		});

		setCache( cache );
		fadeNotif( "SAVED", notifWrap );
	});

	reset.addEventListener("click", () => {
		const notifWrap = document.querySelector("#notifWrap");

		Object.keys( defaultCacheValues ).forEach( ( key ) => {
			if( key === "mode" ){
				modes.forEach( div => div.classList.remove( "active" ));
				document.querySelector(`#${defaultCacheValues[ key ]}`).classList.add("active");
			}else{
				console.log( key );
				document.querySelector(`#${key}`).value = defaultCacheValues[ key ];
			}
		});

		fadeNotif( "RESET", notifWrap );
	});
}


function setCache( value ){
	const cache = JSON.stringify( value );
	localStorage.setItem( cacheKey, cache );
}

function getCache(){
	const cache = localStorage.getItem(cacheKey);
	console.log( cache );
	return cache && typeof JSON.parse( cache ) === "object" ?
		JSON.parse( cache ) : defaultCacheValues;
}

function fadeNotif( value = "SAVED", notifWrap ){

	const notif = document.querySelector("#notifWrap #notif");
	notif.innerText = value;
	notifWrap.style.display = "flex";

	setTimeout( ()=>{
		notifWrap.style.opacity = 1;
		setTimeout( ()=>{
			notifWrap.style.opacity = 0;
			setTimeout( () => {
				notifWrap.style.display = "none";
			},1000);
		}, 2000 );
	}, 10 );
}
const cacheKey = "talknExtensionSetting";
const defaultCacheValues = {
	mode: "modal",
	selector: "#talkn",
	position: "relative",
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
		div.id === cache.mode ? div.classList.add( "active" ) : div.classList.remove( "active" );

		div.addEventListener("click" , (e) => {

			modes.forEach( div => div.classList.remove( "active" ));

			if( e.target.id === "modal"){
				document.querySelector("#modal").classList.add("active");
			}

			if( e.target.id === "include"){
				document.querySelector("#include").classList.add("active");
			}

			cache.mode = e.target.id;
		} );
	} );

	Object.keys( cache ).forEach( ( key ) => {
		const elm = document.querySelector( `input#${key}` );
		if( elm && cache[ key ] && cache[ key ] !== "" ){
			elm.value = cache[ key ];
		}
	} );

	save.addEventListener("click", () => {
		const inputs = document.querySelectorAll("input");
		const notifWrap = document.querySelector("#notifWrap");

		inputs.forEach( input => cache[ input.id ] = input.value );

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
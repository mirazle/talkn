import conf from 'client/conf';

export default class TalknMedia {

	static getMedia( thread ){
		const src = thread.getMediaSrc();
		const tagType = thread.getMediaTagType();
		return document.querySelector(`${tagType}[src='${src}']`)
	}

	static init( called ){
		if( !window.talknMedia ){
			window.talknMedia = this;
		}

		window.talknMedia.timeline = [];
		window.talknMedia.timelineBase = [];
		window.talknMedia.intervalId = null;
	}

	constructor(){
		this.intervalId = null;
		this.currentTime = 0;
		this.started = false;
		this.tasking = false;
		this.timeline = [];
		this.timelineBase = [];

		this.setTimeline = this.setTimeline.bind( this );
		this.startMedia = this.startMedia.bind( this );
		this.proccess = this.proccess.bind( this );
		this.endedFunc = this.endedFunc.bind( this );
		//if( !window.talknMedia ) window.talknMedia = this;
	}

	setTimeline( timeline = [] ){
		this.timeline = timeline;
		this.timelineBase = [ ...timeline ];	
	}

	startMedia( media ){
		media.addEventListener( "ended", this.endedFunc );

		this.intervalId = setInterval( () => { 
			if( media && !media.paused ){
				this.proccess( media.currentTime );
			}
		}, conf.mediaSecondInterval );
	}

	getCurrentTime( currentTime, base = 10 ){
		return Math.floor( currentTime * base ) / base;
	}

	endedFunc(){
		const currentTime =  Number.MAX_SAFE_INTEGER;
		const timeline = this.timeline;
		const length = this.timeline.length;
		console.log("END FUNC");
		for( let i = 0; i < length; i++ ){
			if( timeline[ i ] && timeline[ i ].currentTime <= currentTime ){
				talknAPI.nextPostsTimeline([ timeline[ i ] ]);
			}else{
				break;
			}
		}
	}

	/**
	* メディアファイルの投稿を管理するメソッド
	* パラメータを与えて直接実行も可能(拡張機能から間接的に実行する)
	*/
	proccess( _currentTime = 0 ){

		const log = true;
		const currentTime = this.getCurrentTime( _currentTime );

		if( this.tasking ){
			if( log ) console.log( "Tasking: " + currentTime);
			return false;
		}

		const timelineLength = this.timeline.length;

		this.started = true;
		this.tasking = true

		if( log ) console.log("@ PROCCESS " + this.currentTime + " <= " + currentTime );

		// Timeline is next.
		if( this.currentTime <= currentTime ){

			this.currentTime = currentTime;

			if( log ) console.log("START WHILE " + this.currentTime );
			if( log && this.timeline && this.timeline[0] && timelineLength > 0 ) console.log( this.timeline[ 0 ].currentTime );

			while( this.tasking ){
				if( timelineLength === 0 ){
					this.tasking = false;
				}else if( this.timeline[ 0 ] && this.timeline[ 0 ].currentTime <= currentTime ){
					const addPost = this.timeline.shift();
					this.currentTime = addPost.currentTime;
					if(log) console.log( addPost.post );
					talknWindow.talknAPI.nextPostsTimeline([ addPost ]);
				}else{
					this.tasking = false;
					break;
				}
			}

		// Timeline is prev.
		}else{
			if(log) console.log( "BACK " + currentTime );


			if( this.tasking  ){

				const { postsTimeline } = window.talknAPI.store.getState();

				if(log) console.log( "BACK PROCCESS " + currentTime );
				if(log) console.log( postsTimeline );
				if(log) alert( "BACK PROCCESS " + currentTime );

				this.currentTime = currentTime;

				// 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
				talknWindow.talknAPI.clearPostsTimeline(currentTime);

				// これから表示するpost一覧を保持
				//loopPostsTimeline = postsTimelineBase.filter( (pt) => pt.currentTime > currentTime);

				this.timeline = postsTimeline.concat( this.timelineBase ).filter( (pt, index, self) => {
					if(self.indexOf(pt) === index){
						if( pt.currentTime > currentTime ){
							return true;
						}
					}
					return false;
				});
				
				if(log) console.log( this.timeline );
				this.tasking = false;
			}
		}
	}
}

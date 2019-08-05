
export default class Media {
	getMediaCurrentTime( mediaCurrentTime, base = 10 ){
		return Math.floor( mediaCurrentTime * base ) / base;
	}

	getMediaEnded( media, loopPostsTimeline ){
		this.mediaCurrentTime = this.getMediaCurrentTime( media.currentTime );
		const length = loopPostsTimeline.length;
		for( let i = 0; i < length; i++ ){
			if( loopPostsTimeline[ i ] && loopPostsTimeline[ i ].currentTime <= this.mediaCurrentTime ){
				this.talknAPI.nextPostsTimeline([ loopPostsTimeline[ i ] ]);
			}else{
				break;
			}
		}
	}

	/**
	* メディアファイルの投稿を管理するメソッド
	* @param {Element} media メディアファイル自体
	* @param {Array} loopPostsTimeline 実際の制御に使用される投稿済みの一覧
	* @param {Array} postsTimelineBase 実際の制御には使用しない投稿済みの一覧
	*/
	getMediaInterval( media, loopPostsTimeline, postsTimelineBase, log = false ){

		if( media && media.paused ){
			if( log ) console.log("Media Pause");
			if( log ) console.log( media );
			return false;
		}

		if( this.mediaTasking ){
			if( log ) console.log("Tasking");
			return false;
		}


		const loopPostsTimelineLength = loopPostsTimeline.length;

		// Get current time.
		const mediaCurrentTime = this.getMediaCurrentTime( media.currentTime );
		this.mediaTasking = true

		// Timeline is next.
		if(
			this.mediaCurrentTime === mediaCurrentTime ||
			this.mediaCurrentTime < mediaCurrentTime
		){
			this.mediaCurrentTime = mediaCurrentTime;

			if( log ) console.log("START WHILE " + this.mediaCurrentTime );
			if( log && loopPostsTimeline && loopPostsTimeline[0] && loopPostsTimelineLength > 0 ) console.log( loopPostsTimeline[ 0 ].currentTime );

			while( this.mediaTasking ){
				if( loopPostsTimelineLength === 0 ){
					this.mediaTasking = false;
				}else if( loopPostsTimeline[ 0 ] && loopPostsTimeline[ 0 ].currentTime <= mediaCurrentTime ){
					const addPost = loopPostsTimeline.shift();
					this.mediaCurrentTime = addPost.currentTime;
					if(log) console.log( addPost.post );
					this.talknAPI.nextPostsTimeline([ addPost ]);
				}else{
					this.mediaTasking = false;
					break;
				}
			}

		// Timeline is prev.
		}else{
			if( this.mediaTasking  ){

				const { postsTimeline } = window.talknAPI.store.getState();

				this.mediaCurrentTime = mediaCurrentTime;

				// 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
				this.talknAPI.clearPostsTimeline(mediaCurrentTime);

				if(log) console.log( "BACK " + mediaCurrentTime );
				if(log) console.log( postsTimeline );

				// これから表示するpost一覧を保持
				//loopPostsTimeline = postsTimelineBase.filter( (pt) => pt.currentTime > mediaCurrentTime);

				loopPostsTimeline = postsTimeline.concat( postsTimelineBase ).filter( (pt, index, self) => {
					if(self.indexOf(pt) === index){
						if( pt.currentTime > mediaCurrentTime ){
							return true;
						}
					}
					return false;
				});
				
				if(log) console.log( loopPostsTimeline );
				this.mediaTasking = false;
			}
		}
	}

	setupPostsTimeline( postsTimelineBase, media ){
		if( media === null ){
			console.log( document.querySelector("video") );
			return false;
		}

		const log = false;
		let loopPostsTimeline = [ ...postsTimelineBase ];

		media.addEventListener( "ended", () => {
			this.getMediaEnded( media, loopPostsTimeline )
		} );

		setInterval( () => {
			this.getMediaInterval( media, loopPostsTimeline, postsTimelineBase, log );
		}, conf.mediaSecondInterval );
    }
}
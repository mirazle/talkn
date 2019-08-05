import React, { Component, PropTypes } from "react"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import timeago from 'timeago.js';
import define from 'common/define';
import conf from 'client/conf';
import Schema from 'common/schemas/Schema';
import App from 'common/schemas/state/App';
import State from 'common/schemas/state';
import BootOption from 'common/schemas/state/BootOption';
import TalknSession from 'client/operations/TalknSession';
import TalknAPI from 'client/operations/TalknAPI';
import configureStore from 'client/store/configureStore'
import Container from 'client/container/';
import storage from 'client/mapToStateToProps/storage';

export default class TalknMedia {

	constructor( timeline, media ){
		if( timeline && timeline.length > 0 && media !== null ){

			this.log = false;
			this.timeline = timeline;
			this.timelineBase = [ ...timeline ];	
			this.media = media;
			this.currentTime = 0;
			this.tasking = false;

			this.proccess = this.proccess.bind( this );
			this.getEnded = this.getEnded.bind( this );

			media.addEventListener( "ended", this.getEnded );
	
			setInterval( () => {
				this.proccess();
			}, conf.mediaSecondInterval );
		}
	}

	getCurrentTime( base = 10 ){
		return Math.floor( this.media.currentTime * base ) / base;
	}

	getEnded(){
		this.currentTime = this.getCurrentTime();
		const length = this.timeline.length;
		for( let i = 0; i < length; i++ ){
			if( timeline[ i ] && timeline[ i ].currentTime <= this.currentTime ){
				talknAPI.nextPostsTimeline([ timeline[ i ] ]);
			}else{
				break;
			}
		}
	}

	/**
	* メディアファイルの投稿を管理するメソッド
	*/
	proccess(){

		const log = false;

		if( this.media && this.media.paused ){
			if( log ) console.log("Media Pause");
			if( log ) console.log( this.media );
			return false;
		}

		if( this.tasking ){
			if( log ) console.log("Tasking");
			return false;
		}


		const timelineLength = this.timeline.length;

		// Get current time.
		const currentTime = this.getCurrentTime();
		this.tasking = true

		// Timeline is next.
		if(
			this.currentTime === currentTime ||
			this.currentTime < currentTime
		){
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
			if( this.tasking  ){

				const { postsTimeline } = window.talknAPI.store.getState();

				this.currentTime = currentTime;

				// 指定した秒数を経過しているPostをreducerでdispFlgをfalseにしてPostをUnmountする
				talknWindow.talknAPI.clearPostsTimeline(currentTime);

				if(log) console.log( "BACK " + currentTime );
				if(log) console.log( postsTimeline );

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

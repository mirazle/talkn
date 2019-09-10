import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import Emotions from 'common/emotions/index';
import EmotionGraphStyle from 'client/style/EmotionGraph';

const calcRate = 1000000;
const emotions = new Emotions();
const russellSimple = new emotions.model.RussellSimple();

export default class EmotionGraph extends Component {

  constructor(props){
    super(props);
    const emotionModelKey = Emotions.defaultModelKey;
    const { thread } = props.state;
    const { emotions } = thread; 
    const emotionKeys = Object.keys( emotions[ emotionModelKey ] );
    const emotionKeyLength = emotionKeys.length;
    const log = true;
    let graphType = "within5";
    let totalNum = 0;
    let maxNum = 0;
    let graphMaxNum = 0;
    let rateMax = 0;
    let rateOne = 0;
    let rateMap = {};
    let graphRateMap = [];
    let data = [];

    emotionKeys.forEach( ( emotionKey ) => {
      const num = emotions[ emotionModelKey ][ emotionKey ];
      if( maxNum < num ) maxNum = num;
      if( num > 5 ) graphType = "over5";
      rateMap[ emotionKey ] = {num, rate: 0, graphNum: 0}; 
      totalNum = totalNum + num;
    } );

    if( graphType === "within5" ){
      emotionKeys.forEach( ( emotionKey ) => {
        const num = emotions[ emotionModelKey ][ emotionKey ];
        data.push( num );
      } );
    }else{
      
      emotionKeys.forEach( ( emotionKey ) => {
        const { num } = rateMap[ emotionKey ];
        rateMap[ emotionKey ].rate = Math.round( num / totalNum * calcRate ) / calcRate;
      });
  
      graphMaxNum = Emotions.getGraphMaxNum( emotionModelKey, totalNum, true );
      rateMax = Math.round( maxNum / totalNum * calcRate ) / calcRate;
      rateOne = rateMax / graphMaxNum;
      rateOne = Math.round( rateOne * calcRate ) / calcRate;
  
      for(
        let ratePointLimit = rateOne;
        ( Math.round( ratePointLimit * 1000 ) / 1000 ) <= rateMax;
        ratePointLimit = ratePointLimit + rateOne
      ){
        graphRateMap.push(ratePointLimit);
      }
      if( graphRateMap.length < graphMaxNum ){
        graphRateMap.push( rateMax );
      }
  
      emotionKeys.forEach( ( emotionKey ) => {
        const { rate } = rateMap[ emotionKey ];
        for(let graphIndex = 0; graphIndex < graphMaxNum; graphIndex++ ){
          const graphRate = graphRateMap[ graphIndex ];
          if( rate < graphRate ){
            rateMap[ emotionKey ].graphNum = graphIndex;
            data.push( graphIndex );
            break;
          }
        }
      }); 
    }

    if( log ){
      console.log( "RESULT @@@@@@@@@@@@@@@@@@@@ " + graphType );
      console.log( "totalNum " + totalNum );
      console.log( "maxNum " + maxNum );
      console.log( "graphMaxNum " + graphMaxNum );
      console.log( "rateMax " + rateMax );
      console.log( "rateOne " + rateOne );
      console.log( "rateMap " );
      console.log( rateMap );
      console.log( "graphRateMap " );
      console.log( graphRateMap );
      console.log( "russellSimple ");
      console.log( emotions.russellSimple );
      console.log( "data " );
      console.log( data );
    }

    this.state = {
      emotionModelKey,
      totalNum,
      data: {
        labels: russellSimple.typesArray,
        datasets: [ {...EmotionGraphStyle.datasetsBase, data} ]
      },
      options: EmotionGraphStyle.optionsBase
    }
  }

  componentDidMount(){
  }

  componentWillReceiveProps(props){
    if( props.state.app.actioned === "SERVER_TO_CLIENT[BROADCAST]:post" ){
      const { emotionModelKey } = this.state;
      const { emotions } = props.state.thread;  
      let totalNum = 0;

      Object.keys( emotions[ emotionModelKey ] ).forEach( ( emotionKey ) => {
        totalNum = totalNum + emotions[ emotionModelKey ][ emotionKey ];
      } );

      this.setState({
        totalNum
      });
    }
  }

  componentDidUpdate(){
  }

  render() {
    const { totalNum, data, options } = this.state;
    const { thread, style } = this.props.state; 
    const { emotions } = thread;

    if(
      data &&
      data.datasets && 
      data.datasets.length > 0 &&
      data.datasets[0].data.length > 0
    ){

      return (
        <div style={ style.emotionGraph.self }>
          <Radar data={data} options={options} width={200} />
        </div>
      );
    }else{
      return null;
    }
 	}
}

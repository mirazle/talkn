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
    this.getGraphDatas = this.getGraphDatas.bind(this);

    const { emotionModelKey, totalNum, data } = this.getGraphDatas(props);

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

  getGraphDatas(props){
    const emotionModelKey = Emotions.defaultModelKey;
    const { threadDetail } = props.state;
    const { emotions } = threadDetail;
    const emotionKeys = Object.keys( emotions[ emotionModelKey ] );
    const log = false;
    let graphType = "within5";
    let totalNum = 0;
    let maxNum = 0;
    let graphMaxNum = 0;
    let rateMax = 0;
    let rateOne = 0;
    let rateMap = {};
    let graphRateMap = [];
    let data = [];

    // 合計数と各指標の数値を取得
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

      // 合計数と各指標の数値の割合を算出
      emotionKeys.forEach( ( emotionKey ) => {
        const { num } = rateMap[ emotionKey ];
        rateMap[ emotionKey ].rate = Math.round( num / totalNum * calcRate ) / calcRate;
      });
  
      // グラフの表示最上値を取得
      graphMaxNum = Emotions.getGraphMaxNum( emotionModelKey, totalNum, true );
      rateMax = Math.round( maxNum / totalNum * calcRate ) / calcRate;
      rateOne = rateMax / graphMaxNum;
      rateOne = Math.round( rateOne * calcRate ) / calcRate;
  
      for(
        let ratePointLimit = rateOne;
        ratePointLimit <= rateMax;
        ratePointLimit = ( Math.round( ( ratePointLimit + rateOne ) * calcRate ) / calcRate )
      ){
        graphRateMap.push(ratePointLimit);
      }

      if( graphRateMap.length < graphMaxNum ){
        graphRateMap.push( rateMax );
      }
  
      emotionKeys.forEach( ( emotionKey ) => {
        const { rate } = rateMap[ emotionKey ];
        let assignedFlg = false;
        for(let graphIndex = 0; graphIndex < graphMaxNum; graphIndex++ ){
          const graphRate = graphRateMap[ graphIndex ];

          if( rate < graphRate ){
            rateMap[ emotionKey ].graphNum = graphIndex;
            data.push( graphIndex );
            assignedFlg = true;
            break;
          }

          if( graphIndex === graphMaxNum - 1 ){

            if( !assignedFlg ){
              data.push( graphIndex );
            }
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

    return { emotionModelKey, totalNum, data } ;
  }

  componentWillReceiveProps(nextProps){
    if(
      nextProps.state.app.actioned === "SERVER_TO_CLIENT[BROADCAST]:post" ||
      nextProps.state.app.actioned === "SERVER_TO_CLIENT[EMIT]:find" ||
      nextProps.state.app.actioned === "SERVER_TO_CLIENT[EMIT]:changeThreadDetail"
    ){

      const { emotionModelKey, totalNum, data } = this.getGraphDatas(nextProps);

      this.setState({
        emotionModelKey,
        totalNum,
        data: {
          labels: russellSimple.typesArray,
          datasets: [ {...EmotionGraphStyle.datasetsBase, data} ]
        },
        options: EmotionGraphStyle.optionsBase
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

import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2';
import Emotions from 'common/emotions/index';
import EmotionGraphStyle from 'client/style/EmotionGraph';

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
    let totalNum = 0;
    let maxNum = 0;
    let maxGraphNum = 0;
    let rateOne = 0;
    let rateMap = {};

    emotionKeys.forEach( ( emotionKey ) => {
      const num = emotions[ emotionModelKey ][ emotionKey ];
      if( maxNum < num ) maxNum = num;
      rateMap[ emotionKey ] = {num, rate: 0}; 
      totalNum = totalNum + num;
    } );

    maxGraphNum = Emotions.getGraphMaxNum( emotionModelKey, totalNum );
    rateOne = Math.round( maxNum / totalNum * 10000 ) / 10000
    emotionKeys.forEach( ( emotionKey ) => {
      //console.log( rateMap[ emotionKey ]);
    } );
    // 小数第一位を基準とした方法


    this.state = {
      emotionModelKey,
      totalNum,
      data: {
        labels: russellSimple.typesArray,
        datasets: EmotionGraphStyle.datasetsBase
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

    console.log( data );
    console.log( options );

    if( data.length > 0 ){
      return (
        <div style={ style.emotionGraph.self }>
          <Radar data={data} options={options} width={200} />
    {/*
          TOTAL: { totalNum }<br />
          ------<br />
          EXCITE: { emotions.russellSimple.Excite }<br />
          HAPPY: { emotions.russellSimple.Happy }<br />
          JOY: { emotions.russellSimple.Joy }<br />
          RELAX: { emotions.russellSimple.Relax }<br />
          SLACK: { emotions.russellSimple.Slack }<br />
          MELANCHOLY: { emotions.russellSimple.Melancholy }<br />
          ANGER: { emotions.russellSimple.Anger }<br />
          WORRY_FEAR: { emotions.russellSimple['Worry&Fear'] }<br />
  */}
        </div>
      );
    }else{
      return null;
    }
 	}
}

import React, { Component } from 'react'
import Emotions from 'common/emotions/index';
console.log( Emotions.TOTAL_POST_LIMITS() );
export default class EmotionGraph extends Component {

  constructor(props){
    super(props);
    const { emotions } = props.state.thread; 
    let totalNums = {};

    Object.keys( emotions ).forEach( ( emotionModelKey ) => {
      totalNums[ emotionModelKey ] = 0;
      Object.keys( emotions[ emotionModelKey ] ).forEach( ( emotionKey ) => {
        totalNums[ emotionModelKey ] = totalNums[ emotionModelKey ] + emotions[ emotionModelKey ][ emotionKey ];
      } );
    } );

    this.state = {
      emotionModelKey: "russellSimple",
      totalNums,
      graphParams:[]
    }
  }

  componentDidMount(){
  }

  componentWillReceiveProps(props){
    
    console.log(props.state.app.actioned);

    if( props.state.app.actioned === "SERVER_TO_CLIENT[BROADCAST]:post" ){
      const { emotions } = props.state.thread;  
      let totalNums = {};

      Object.keys( emotions ).forEach( ( emotionModelKey ) => {
        totalNums[ emotionModelKey ] = 0;
        Object.keys( emotions[ emotionModelKey ] ).forEach( ( emotionKey ) => {
          totalNums[ emotionModelKey ] = totalNums[ emotionModelKey ] + emotions[ emotionModelKey ][ emotionKey ];
        } );
      } );

      this.state = {
        totalNums
      }
    }
  }

  componentDidUpdate(){
  }

  render() {

    const { emotions } = this.props.state.thread; 
    return (
      <div>
        LIKE: { emotions.plain.Like }<br />
        ------<br />
        EXCITE: { emotions.russellSimple.Excite }<br />
        HAPPY: { emotions.russellSimple.Happy }<br />
        JOY: { emotions.russellSimple.Joy }<br />
        RELAX: { emotions.russellSimple.Relax }<br />
        SLACK: { emotions.russellSimple.Slack }<br />
        MELANCHOLY: { emotions.russellSimple.Melancholy }<br />
        ANGER: { emotions.russellSimple.Anger }<br />
        WORRY_FEAR: { emotions.russellSimple['Worry&Fear'] }<br />
      </div>
    );
 	}
}

import Style from './index';
import Container from './Container';

export default class EmotionGraph {

  static get datasetsBase(){
    return {
        backgroundColor: 'rgba(124, 166, 158, 0.2)',
        borderColor: 'rgba(124, 166, 158, 0.8)',
        pointBackgroundColor: 'rgba(124, 166, 158, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124, 166, 158,1)',
        data: []
      };
  }

  static get optionsBase(){
    return {
      responsive: true,
      responsiveAnimationDuration: 0,
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      scale: {
        ticks: {
            beginAtZero: true,
            max: 5,
            min: 0,
            stepSize: 1
        },
        pointLabels: {
            fontSize: 14,
            fontColor: Container.fontBaseRGB
        }
      }
    }
  }

  constructor( params ){
    const self = EmotionGraph.getSelf( params );
    return {
      self
    }
  }

  static getSelf( params ){
    const layout = Style.getLayoutFlex({
      marginBottom: "40px",
      flexDirection: "column"
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({layout, content, animation});
  }
}

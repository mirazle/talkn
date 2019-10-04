import Style from "./index";
import Container from "./Container";

export default class EmotionGraph {
  static get datasetsBase() {
    return {
      backgroundColor: "rgba(240, 100, 195, 0.2 )",
      borderCapStyle: "square",
      borderColor: "rgba(240, 100, 195, 0.8 )",
      borderWidth: "4",
      pointBackgroundColor: "rgba(240, 100, 195, 0.8 )",
      pointBorderColor: "rgba(240, 100, 195, 0 )",
      pointHoverBackgroundColor: "rgba(255, 255, 255, 0.8 )",
      pointHoverBorderColor: "rgba(240, 100, 195, 0.8 )",
      pointHoverBorderWidth: "4",
      data: []
    };
  }

  static get optionsBase() {
    return {
      responsive: true,
      responsiveAnimationDuration: 0,
      elements: {
        point: {
          backgroundColor: "rgba(79, 174, 159, 0.6)",
          borderAlign: "left",
          borderColor: "rgba(79, 174, 159, 0.6)",
          borderWidth: 100
        },
        line: {
          tension: 0.1, //0.000001
          backgroundColor: "rgba(79, 174, 159, 0.6)",
          borderWidth: "10",
          borderColor: "rgba(79, 174, 159, 0.6)",
          borderCapStyle: "square",
          borderDash: []
        }
      },
      // グラフ外部の指標のタイトル
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
        intersect: true,
        backgroundColor: "rgba(240, 100, 195, 0.7 )",
        callbacks: {
          label: (tooltipItem, data) => {
            let label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (label) {
              label += ": ";
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            return label !== "0" ? label : null;
          },
          title: (tooltipItem, data) => {
            return tooltipItem.map(item => data.labels[item.index]);
          }
        }
      },
      scale: {
        ticks: {
          fontSize: 17,
          fontColor: Container.fontBaseRGB,
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
    };
  }

  constructor(params) {
    const self = EmotionGraph.getSelf(params);
    return {
      self
    };
  }

  static getSelf(params) {
    const layout = Style.getLayoutFlex({
      marginBottom: "40px",
      flexDirection: "column"
    });
    const content = Style.getContentBase({});
    const animation = Style.getAnimationBase({});
    return Style.get({ layout, content, animation });
  }
}

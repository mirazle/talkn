"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const Container_1 = __importDefault(require("./Container"));
class EmotionGraph {
    constructor(params) {
        const self = EmotionGraph.getSelf(params);
        return {
            self
        };
    }
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
                    tension: 0.1,
                    backgroundColor: "rgba(79, 174, 159, 0.6)",
                    borderWidth: "10",
                    borderColor: "rgba(79, 174, 159, 0.6)",
                    borderCapStyle: "square",
                    borderDash: []
                }
            },
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
                    fontColor: Container_1.default.fontBaseRGB,
                    backdropColor: "rgba(255,255,255,0)",
                    beginAtZero: true,
                    max: 5,
                    min: 0,
                    stepSize: 1
                },
                pointLabels: {
                    fontSize: 14,
                    fontColor: Container_1.default.fontBaseRGB
                }
            }
        };
    }
    static getSelf(params) {
        const layout = index_1.default.getLayoutFlex({
            marginBottom: "40px",
            flexDirection: "column"
        });
        const content = index_1.default.getContentBase({});
        const animation = index_1.default.getAnimationBase({});
        return index_1.default.get({ layout, content, animation });
    }
}
exports.default = EmotionGraph;
//# sourceMappingURL=EmotionGraph.js.map
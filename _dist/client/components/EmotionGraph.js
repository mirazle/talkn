"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TalknComponent_1 = __importDefault(require("client/components/TalknComponent"));
const react_chartjs_2_1 = require("react-chartjs-2");
const index_1 = __importDefault(require("common/emotions/index"));
const EmotionGraph_1 = __importDefault(require("client/style/EmotionGraph"));
const calcRate = 1000000;
const emotions = new index_1.default();
const russellSimple = new emotions.model.RussellSimple();
class EmotionGraph extends TalknComponent_1.default {
    constructor(props) {
        super(props);
        this.getGraphDatas = this.getGraphDatas.bind(this);
        const { emotionModelKey, totalNum, data } = this.getGraphDatas(props);
        this.state = {
            emotionModelKey,
            totalNum,
            data: {
                labels: russellSimple.typesArray,
                datasets: [{ ...EmotionGraph_1.default.datasetsBase, data }],
            },
            options: EmotionGraph_1.default.optionsBase,
        };
    }
    getGraphDatas(props) {
        const emotionModelKey = index_1.default.defaultModelKey;
        const { threadDetail } = props.state;
        const { emotions } = threadDetail;
        const emotionKeys = emotions && emotions[emotionModelKey] ? Object.keys(emotions[emotionModelKey]) : [];
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
        emotionKeys.forEach((emotionKey) => {
            const num = emotions[emotionModelKey][emotionKey];
            if (maxNum < num)
                maxNum = num;
            if (num > 5)
                graphType = "over5";
            rateMap[emotionKey] = { num, rate: 0, graphNum: 0 };
            totalNum = totalNum + num;
        });
        if (graphType === "within5") {
            emotionKeys.forEach((emotionKey) => {
                const num = emotions[emotionModelKey][emotionKey];
                data.push(num);
            });
        }
        else {
            emotionKeys.forEach((emotionKey) => {
                const { num } = rateMap[emotionKey];
                rateMap[emotionKey].rate = Math.round((num / totalNum) * calcRate) / calcRate;
            });
            graphMaxNum = index_1.default.getGraphMaxNum(emotionModelKey, totalNum, true);
            rateMax = Math.round((maxNum / totalNum) * calcRate) / calcRate;
            rateOne = rateMax / graphMaxNum;
            rateOne = Math.round(rateOne * calcRate) / calcRate;
            for (let ratePointLimit = rateOne; ratePointLimit <= rateMax; ratePointLimit = Math.round((ratePointLimit + rateOne) * calcRate) / calcRate) {
                graphRateMap.push(ratePointLimit);
            }
            if (graphRateMap.length < graphMaxNum) {
                graphRateMap.push(rateMax);
            }
            emotionKeys.forEach((emotionKey) => {
                const { rate } = rateMap[emotionKey];
                let assignedFlg = false;
                for (let graphIndex = 0; graphIndex < graphMaxNum; graphIndex++) {
                    const graphRate = graphRateMap[graphIndex];
                    if (rate < graphRate) {
                        rateMap[emotionKey].graphNum = graphIndex;
                        data.push(graphIndex);
                        assignedFlg = true;
                        break;
                    }
                    if (graphIndex === graphMaxNum - 1) {
                        if (!assignedFlg) {
                            data.push(graphIndex);
                        }
                    }
                }
            });
        }
        if (log) {
            console.log("RESULT @@@@@@@@@@@@@@@@@@@@@ " + graphType);
            console.log("totalNum " + totalNum);
            console.log("maxNum " + maxNum);
            console.log("graphMaxNum " + graphMaxNum);
            console.log("rateMax " + rateMax);
            console.log("rateOne " + rateOne);
            console.log("rateMap ");
            console.log(rateMap);
            console.log("graphRateMap ");
            console.log(graphRateMap);
            console.log("russellSimple ");
            console.log(emotions.russellSimple);
            console.log("data ");
            console.log(data);
        }
        return { emotionModelKey, totalNum, data };
    }
    componentWillReceiveProps(nextProps) {
        const clientState = this.clientState;
        if (clientState.actionLog[0] === "API_TO_CLIENT[EMIT]:tune" ||
            clientState.actionLog[0] === "API_TO_CLIENT[BROADCAST]:post" ||
            clientState.actionLog[0] === "ON_CLICK_TOGGLE_DISP_DETAIL" ||
            clientState.actionLog[0] === "API_TO_CLIENT[EMIT]:changeThreadDetail") {
            const { emotionModelKey, totalNum, data } = this.getGraphDatas(nextProps);
            const datasets = [{ ...EmotionGraph_1.default.datasetsBase, data }];
            this.setState({
                emotionModelKey,
                totalNum,
                data: {
                    labels: russellSimple.typesArray,
                    datasets,
                },
                options: EmotionGraph_1.default.optionsBase,
            });
        }
    }
    componentDidUpdate() { }
    render() {
        const { totalNum, data, options } = this.state;
        const { style, thread } = this.props.state;
        const { emotions } = thread;
        if (data && data.datasets && data.datasets.length > 0 && data.datasets[0].data.length > 0) {
            return (react_1.default.createElement("div", { "data-component-name": "Detail-emotions-graph", style: style.emotionGraph.self },
                react_1.default.createElement(react_chartjs_2_1.Radar, { data: data, options: options, width: 200 })));
        }
        else {
            return null;
        }
    }
}
exports.default = EmotionGraph;
//# sourceMappingURL=EmotionGraph.js.map
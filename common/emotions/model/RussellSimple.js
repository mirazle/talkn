import Emotions from '~/common/emotions/index';

export default class RussellSimple {
    static get DATAS(){
        return [
            Emotions.EXCITE,
            Emotions.HAPPY,
            Emotions.JOY,
            Emotions.RELAX,
            Emotions.SLACK,
            Emotions.MELANCHOLY,
            Emotions.ANGER,
            Emotions.WORRY_FEAR
        ];
    }

    static getSchemas(){
        let schemas = {};
        RussellSimple.DATAS.forEach( ( obj, i ) => {
            schemas[ obj.LABEL ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
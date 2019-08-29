import Emotions from '~/common/emotions/index';

export default class RussellSimple {
    static get DATAS(){
        return [
            Emotions.TYPES_EXCITE,
            Emotions.TYPES_HAPPY,
            Emotions.TYPES_JOY,
            Emotions.TYPES_RELAX,
            Emotions.TYPES_SLACK,
            Emotions.TYPES_MELANCHOLY,
            Emotions.TYPES_ANGER,
            Emotions.TYPES_WORRY_FEAR
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
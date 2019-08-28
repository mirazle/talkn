import Emotions from '~/common/emotions/index';

export default class RussellSimple {
    static get LABELS(){
        return [
            Emotions.LABEL_EXCITE,
            Emotions.LABEL_HAPPY,
            Emotions.LABEL_JOY,
            Emotions.LABEL_RELAX,
            Emotions.LABEL_SLACK,
            Emotions.LABEL_MELANCHOLY,
            Emotions.LABEL_ANGRY,
            Emotions.LABEL_WORRY_FEAR
        ];
    }

    static getSchemas(){
        let schemas = {};
        RussellSimple.LABELS.forEach( ( label, i ) => {
            schemas[ label ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
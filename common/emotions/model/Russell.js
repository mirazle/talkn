import Emotions from '~/common/emotions/index';

export default class Russell {

    static get LABELS(){
        return [
            Emotions.LABEL_SUPRISE,
            Emotions.LABEL_EXCITE,
            Emotions.LABEL_HAPPY,
            Emotions.LABEL_JOY,
            Emotions.LABEL_GLAD,
            Emotions.LABEL_SATISFACTION,
            Emotions.LABEL_COMFORT,
            Emotions.LABEL_RELAX,
            Emotions.LABEL_TIRED,
            Emotions.LABEL_SLEEPY,
            Emotions.LABEL_SLACK,
            Emotions.LABEL_BORING,
            Emotions.LABEL_MELANCHOLY,
            Emotions.LABEL_SAD,
            Emotions.LABEL_UNPLEASANT,
            Emotions.LABEL_FRUSTRATED,
            Emotions.LABEL_DISSATISFIED,
            Emotions.LABEL_ANGER,
            Emotions.LABEL_WORRY,
            Emotions.LABEL_FEAR
        ];
    }

    static getSchemas(){
        let schemas = {};
        Russell.LABELS.forEach( ( label, i ) => {
            schemas[ label ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
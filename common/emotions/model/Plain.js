import Emotions from '~/common/emotions/index';

export default class Plain {

    static get DATAS(){
        return [
            Emotions.TYPES_LIKE
        ];
    }

    static getBalance( stampId ){
        return {
            1: [{ [ Emotions.TYPES_LIKE.ID ]: 1 }],
        }

    }

    static getSchemas(){
        let schemas = {};
        Russell.DATAS.forEach( ( obj, i ) => {
            schemas[ obj.LABEL ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
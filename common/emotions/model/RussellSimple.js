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

    static getSaveBalance( stampId ){
        return {
        
            // Suprise(Posi1)
            1001: [{ [ Emotions.TYPES_EXCITE.ID ]: 1 }],
            1002: [{ [ Emotions.TYPES_EXCITE.ID ]: 1 }],
    
            // Excite(Posi1)
            1101: [{ [ Emotions.TYPES_EXCITE.ID ]: 1 }],
            1102: [{ [ Emotions.TYPES_EXCITE.ID ]: 1 }],
            1103: [{ [ Emotions.TYPES_EXCITE.ID ]: 1 }],
    
            // Happy(Posi2)
            1201: [{ [ Emotions.TYPES_HAPPY.ID ]: 1 }],
            1202: [{ [ Emotions.TYPES_HAPPY.ID ]: 1 }],
            1203: [{ [ Emotions.TYPES_HAPPY.ID ]: 1 }],
            1204: [{ [ Emotions.TYPES_HAPPY.ID ]: 1 }],
    
            // Joy(Posi2)
            1301: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1302: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1303: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1304: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1305: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1306: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1307: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
    
            // Glad(Posi3)
            1401: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1402: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
    
            // Satisfaction(Posi3)
            1501: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1502: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1503: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
            1504: [{ [ Emotions.TYPES_JOY.ID ]: 1 }],
    
            // Comfort(Posi4)
            1601: [{ [ Emotions.TYPES_RELAX.ID ]: 1 }],
            1602: [{ [ Emotions.TYPES_RELAX.ID ]: 1 }],

            // Relax(Posi4)
            1701: [{ [ Emotions.TYPES_RELAX.ID ]: 1 }],
            1702: [{ [ Emotions.TYPES_RELAX.ID ]: 1 }],
            1703: [{ [ Emotions.TYPES_RELAX.ID ]: 1 }],
    
            // Tired(Posi4)
            1801: [{ [ Emotions.TYPES_TIRED.ID ]: 1 }],
            1802: [{ [ Emotions.TYPES_TIRED.ID ]: 1 }],
            1803: [{ [ Emotions.TYPES_TIRED.ID ]: 1 }],
    
            // Slack(Nega4)
            2001: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
            2002: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
            2003: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
            2004: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
    
            // Boring(Nega4)
            2101: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
            2102: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
            2103: [{ [ Emotions.TYPES_SLACK.ID ]: 1 }],
    
            // Melancholy(Nega4)
            2201: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2202: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2203: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2204: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2205: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
    
            // Sad(Nega3)
            2301: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2302: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2303: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],

            // Unpleasant(Nega3)
            2401: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2402: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2403: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2404: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],

            // frustrated(Nega3)
            2501: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2502: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],
            2503: [{ [ Emotions.TYPES_MELANCHOLY.ID ]: 1 }],

            // dissatisfied(Nega2)
            2601: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2602: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
    
            // Anger(Nega2)
            2701: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2702: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2703: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2704: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2705: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
            2706: [{ [ Emotions.TYPES_ANGER.ID ]: 1 }],
    
            // Worry(Nega1)
            2801: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2802: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2803: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2804: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2805: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2806: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2807: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
    
            // Fear(Nega1)
            2901: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2902: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2903: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2904: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2905: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
            2906: [{ [ Emotions.TYPES_WORRY_FEAR.ID ]: 1 }],
        };
    }

    static getSchemas(){
        let schemas = {};
        RussellSimple.DATAS.forEach( ( obj, i ) => {
            schemas[ obj.LABEL ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
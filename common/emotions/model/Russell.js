import Emotions from '~/common/emotions/index';

export default class Russell {

    static get DATAS(){
        return [
            Emotions.SUPRISE,
            Emotions.EXCITE,
            Emotions.HAPPY,
            Emotions.JOY,
            Emotions.GLAD,
            Emotions.SATISFACTION,
            Emotions.COMFORT,
            Emotions.RELAX,
            Emotions.TIRED,
            Emotions.SLEEPY,
            Emotions.SLACK,
            Emotions.BORING,
            Emotions.MELANCHOLY,
            Emotions.SAD,
            Emotions.UNPLEASANT,
            Emotions.FRUSTRATED,
            Emotions.DISSATISFIED,
            Emotions.ANGER,
            Emotions.WORRY,
            Emotions.FEAR
        ];
    }

    static getBalance( stampId ){
        return {
        
            // Suprise(Posi1)
            1001: [{ 10001: 1 }],
            1002: [{ 10001: 1 }],
    
            // Excite(Posi1)
            1101: [{ 1001: 1 }],
            1102: [{ 1001: 1 }],
            1103: [{ 1001: 1 }],
    
            // Happy(Posi2)
            1201: [{ 10003: 1 }],
            1202: [{ 10003: 1 }],
            1203: [{ 10003: 1 }],
            1204: [{ 10003: 1 }],
    
            // Joy(Posi2)
            1301: [{ 10004: 1 }],
            1302: [{ 10004: 1 }],
            1303: [{ 10004: 1 }],
            1304: [{ 10004: 1 }],
            1305: [{ 10004: 1 }],
            1306: [{ 10004: 1 }],
            1307: [{ 10004: 1 }],
    
            // Glad(Posi3)
            1401: [{ 20001: 1 }],
            1402: [{ 20001: 1 }],
    
            // Satisfaction(Posi3)
            1501: [{ 20002: 1 }],
            1502: [{ 20002: 1 }],
            1503: [{ 20002: 1 }],
            1504: [{ 20002: 1 }],
    
            // Comfort(Posi4)
            1601: [{ 30001: 1 }],
            1602: [{ 30001: 1 }],

            // Relax(Posi4)
            1701: [{ 30002: 1 }],
            1702: [{ 30002: 1 }],
            1703: [{ 30002: 1 }],
    
            // Tired(Posi4)
            1801: [{ 30003: 1 }],
            1802: [{ 30003: 1 }],
            1803: [{ 30003: 1 }],
    
            // Slack(Nega4)
            2001: [{ 60001: 1 }],
            2002: [{ 60001: 1 }],
            2003: [{ 60001: 1 }],
            2004: [{ 60001: 1 }],
    
            // Boring(Nega4)
            2101: [{ 60002: 1 }],
            2102: [{ 60002: 1 }],
            2103: [{ 60002: 1 }],
    
            // Melancholy(Nega4)
            2201: [{ 70001: 2 }],
            2202: [{ 70001: 1 }],
            2203: [{ 70001: 1 }],
            2204: [{ 70001: 1 }],
            2205: [{ 70001: 1 }],
    
            // Sad(Nega3)
            2301: [{ 70002: 1}],
            2302: [{ 70002: 1 }],
            2303: [{ 70002: 1 }],

            // Unpleasant(Nega3)
            2401: [{ 70003: 1 }],
            2402: [{ 70003: 1 }],
            2403: [{ 70003: 1 }],
            2404: [{ 70003: 1 }],

            // frustrated(Nega3)
            2501: [{ 70004: 1 }],
            2502: [{ 70004: 1 }],
            2503: [{ 70004: 1 }],

            // dissatisfied(Nega2)
            2601: [{ 80001: 1 }],
            2602: [{ 80001: 1 }],
    
            // Anger(Nega2)
            2701: [{ 80002: 1 }],
            2702: [{ 80002: 1 }],
            2703: [{ 80002: 1 }],
            2704: [{ 80002: 1 }],
            2705: [{ 80002: 1 }],
            2706: [{ 80002: 1 }],
    
            // Worry(Nega1)
            2801: [{ 80003: 1 }],
            2802: [{ 80003: 1 }],
            2803: [{ 80003: 1 }],
            2804: [{ 80003: 1 }],
            2805: [{ 80003: 1 }],
            2806: [{ 80003: 1 }],
            2807: [{ 80003: 1 }],
    
            // Fear(Nega1)
            2901: [{ 80004: 1 }],
            2902: [{ 80004: 1 }],
            2903: [{ 80004: 1 }],
            2904: [{ 80004: 1 }],
            2905: [{ 80004: 1 }],
            2906: [{ 80004: 1 }]
        };
    }

    static getSchemas(){
        let schemas = {};
        Russell.DATAS.forEach( ( obj, i ) => {
            schemas[ obj.LABEL ] = { type: Number, default: 0, min: 0};
        });
        return schemas;
    }
}
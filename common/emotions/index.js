import Plain from '~/common/emotions/model/Plain';
import Russell from '~/common/emotions/model/Russell';
import RussellSimple from '~/common/emotions/model/RussellSimple';

export default class Emotions {

    static TOTAL_POST_LIMITS( totalPostCnt, isHarf = false ){
        if( isHarf ){
            return {
                5: 2,
                30: 4,
                100: 6,
                500: 8,
                1000: 10
            };
        }else{
            return {
                1: 1,
                5: 2,
                10: 3,
                30: 4,
                70: 5,
                100: 6,
                250: 7,
                500: 8,
                750: 9, 
                1000: 10
            };
        }
    }

    static get TYPES(){
        return {
            LIKE: { ID: 1, LABEL: 'Like' },
            INTEREST: { ID: 1002, LABEL: 'Interest' },
            DISCOVERY: { ID: 1003, LABEL: 'Discovery' },
            SUNNY: { ID: 1004, LABEL: 'Sunny' },
            PEACE: { ID: 1005, LABEL: 'Peace' },
            CHEER: { ID: 1006, LABEL: 'Cheer' },
            MONEY: { ID: 1007, LABEL: 'Money' },
            UNLIKE: { ID: 2001, LABEL: 'Unlike' },
            LOVE: { ID: 3000, LABEL: 'Love' },
            SUPRISE: { ID: 10001, LABEL: 'Surprise' },
            EXCITE: { ID: 10002, LABEL: "Excite" },
            HAPPY: { ID: 10003, LABEL: "Happy" },
            JOY: { ID: 10004, LABEL: "Joy" },
            GLAD: { ID: 20001, LABEL: "Glad" },
            SATISFACTION: { ID: 20002, LABEL: 'Satisfaction' },
            COMFORT: { ID: 30001, LABEL: 'Comfort' },
            RELAX: { ID: 30002, LABEL: 'Relax' },
            TIRED: { ID: 30003, LABEL: 'Tired' },
            SLEEPY: { ID: 50001, LABEL: 'Sleepy' },
            SLACK: { ID: 60001, LABEL: 'Slack' } ,
            BORING: { ID: 60002, LABEL: 'Boring' },
            MELANCHOLY: { ID: 70001, LABEL: 'Melancholy' },
            SAD: { ID: 70002, LABEL: 'Sad' },
            UNPLEASANT: { ID: 70003, LABEL: 'Unpleasant' },
            FRUSTRATED: { ID: 70004, LABEL: 'Frustrated' },
            DISSATISFIED: { ID: 80001, LABEL: 'Dissatisfied' },
            ANGER: { ID: 80002, LABEL: 'Anger' },
            WORRY: { ID: 80003, LABEL: 'Worry' },
            FEAR: { ID: 80004, LABEL: 'Fear' },
            WORRY_FEAR: { ID: 80005, LABEL: "Worry&Fear" }
        };
    }

    constructor( type ){
        this.belongCoverTypes = {};
        this.idKeyTypes = {};

        Object.keys( Emotions.inputs ).forEach( ( label ) => {
            Emotions.inputs[ label ].forEach( ( stampId ) => {
                this.belongCoverTypes[ stampId ] = label;
            });
        });

        Object.keys( Emotions.TYPES ).forEach( ( key ) => {
            const obj = Emotions.TYPES[ key ];
            this.idKeyTypes[ obj.ID ] = obj.LABEL;
        });

        this.balances = {
            plain: Plain.getSaveBalance,
            russell: Russell.getSaveBalance,
            russellSimple: RussellSimple.getSaveBalance
        }
    }

    static get inputs(){
        return {
            [ Emotions.TYPES.LIKE.LABEL ]: [ 1, 2, 3, 4, 5],
            [ Emotions.TYPES.MONEY.LABEL ]: [ 100 ],

            [ Emotions.TYPES.EXCITE.LABEL ]: [ 1101, 1102, 1103, 1001, 1002 ],
            [ Emotions.TYPES.HAPPY.LABEL ]: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
            [ Emotions.TYPES.JOY.LABEL ]: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
            [ Emotions.TYPES.RELAX.LABEL ]: [ 1601, 1602, 1603, 1701, 1702, 1703, 1801, 1802, 1803 ],

            [ Emotions.TYPES.SLACK.LABEL ]: [ 2001, 2002, 2003, 2004, 2005, 2101, 2102, 2103 ],
            [ Emotions.TYPES.MELANCHOLY.LABEL ]: [ 2301, 2302, 2303, 2201, 2202, 2203, 2204, 2205, 2401, 2402, 2403, 2404, 2501, 2502, 2503 ],
            [ Emotions.TYPES.ANGER.LABEL ]: [ 2701, 2702, 2703, 2704, 2705, 2706, 2601, 2602 ],
            [ Emotions.TYPES.WORRY_FEAR.LABEL ]: [ 2904, 2905, 2906, 2801, 2802, 2803, 2804, 2805, 2806, 2901, 2903 ],
        }
    }
    
    static get map(){
        return {
        
          // Flat like
          1: '👍',
          2: '✌️',
          3: '👀',
          4: '💡',
          5: '💪',
          10: '',
          100: '💵',
    
          // Suprise(Posi1)
          1001: '😳',
          1002: '😵',
    
          // Excite(Posi1)
          1101: '🤣',
          1102: '😆',
          1103: '🤩',
    
          // Happy(Posi2)
          1201: '💓',
          1202: '🥰',
          1203: '😍',
          1204: '😻',
    
          // Joy(Posi2)
          1301: '😄',
          1302: '✨',
          1303: '😁',
          1304: '🍺',
          1305: '😊',
          1306: '😘',
          1307: '🌟',
    
          // Glad(Posi3)
          1401: '🥳',
          1402: '😃',
    
          // Satisfaction(Posi3)
          1501: '😋',
          1502: '🎂',
          1503: '🍰',
          1504: '🧁',
    
          // Comfort(Posi4)
          1601: '😌',
          1602: '🤤',
          1603: '😉',

          // Relax(Posi4)
          1701: '🙂',
          1702: '☕️',
          1703: '🍵',
    
          // Tired(Posi4)
          1801: '😐',
          1802: '😮',
          1803: '😯',
    
          // Slack(Nega4)
          2001: '😅',
          2002: '💦',
          2003: '🥺',
          2004: '😲',
          2005: '🙄',
    
          // Boring(Nega4)
          2101: '😒',
          2102: '😑',
          2103: '😕',
    
          // Melancholy(Nega4)
          2201: '😩',
          2202: '😞',
          2203: '😔',
          2204: '😟',
          2205: '🤢',
    
          // Sad(Nega3)
          2301: '😭',
          2302: '😥',
          2303: '😿',

          // Unpleasant(Nega3)
          2401: '🤕',
          2402: '🤒',
          2403: '😷',
          2404: '🤧',

          // frustrated(Nega3)
          2501: '🧐',
          2502: '🤔',
          2503: '🤨',

          // dissatisfied(Nega2)
          2601: '😠',
          2602: '😾',
     
          // Anger(Nega2)
          2701: '😡',
          2702: '🤬',
          2703: '💔',
          2704: '💢',
          2705: '😤',
          2706: '👿',
    
          // Worry(Nega1)
          2801: '😣',
          2802: '😫',
          2803: '😓',
          2804: '😖',
          2805: '😨',
          2806: '😰',
    
          // Fear(Nega1)
          2901: '🥶',
          2902: '🤮',
          2903: '🥵',
          2904: '😱',
          2905: '🙀',
          2906: '💀'

        }
    }
}
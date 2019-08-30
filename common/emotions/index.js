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

    static get TYPES_LIKE(){return { ID: 1, LABEL: 'Like' } }
    static get TYPES_INTEREST(){return { ID: 1002, LABEL: 'Interest' } }
    static get TYPES_DISCOVERY(){return { ID: 1003, LABEL: 'Discovery' } }
    static get TYPES_SUNNY(){return { ID: 1004, LABEL: 'Sunny' } }
    static get TYPES_PEACE(){return { ID: 1005, LABEL: 'Peace' } }
    static get TYPES_CHEER(){return { ID: 1006, LABEL: 'Cheer' } }
    static get TYPES_MONEY(){return { ID: 1007, LABEL: 'Money' } }
    static get TYPES_UNLIKE(){return { ID: 2001, LABEL: 'Unlike' } }
    static get TYPES_LOVE(){return { ID: 3000, LABEL: 'Love' } }

    static get TYPES_SUPRISE(){return { ID: 10001, LABEL: 'Surprise' } }
    static get TYPES_EXCITE(){return { ID: 10002, LABEL: "Excite" } }
    static get TYPES_HAPPY(){return { ID: 10003, LABEL: "Happy" } }

    static get TYPES_JOY(){return { ID: 10004, LABEL: "Joy" } }
    static get TYPES_GLAD(){return { ID: 20001, LABEL: "Glad" } }
    static get TYPES_SATISFACTION(){return { ID: 20002, LABEL: 'Satisfaction' } }
    static get TYPES_COMFORT(){return {ID: 30001, LABEL: 'Comfort' } }
    static get TYPES_RELAX(){return { ID: 30002, LABEL: 'Relax' } }
    static get TYPES_TIRED(){return { ID: 30003, LABEL: 'Tired' } }
    static get TYPES_SLEEPY(){return { ID: 50001, LABEL: 'Sleepy' } }
    static get TYPES_SLACK(){return { ID: 60001, LABEL: 'Slack' } }
    static get TYPES_BORING(){return { ID: 60002, LABEL: 'Boring' } }
    static get TYPES_MELANCHOLY(){return { ID: 70001, LABEL: 'Melancholy' } }
    static get TYPES_SAD(){return { ID: 70002, LABEL: 'Sad' } }
    static get TYPES_UNPLEASANT(){return { ID: 70003, LABEL: 'Unpleasant' } }
    static get TYPES_FRUSTRATED(){return { ID: 70004, LABEL: 'Frustrated' } }
    static get TYPES_DISSATISFIED(){return { ID: 80001, LABEL: 'Dissatisfied' } }
    static get TYPES_ANGER(){return { ID: 80002, LABEL: 'Anger' } }
    static get TYPES_WORRY(){return { ID: 80003, LABEL: 'Worry' } }
    static get TYPES_FEAR(){return { ID: 80004, LABEL: 'Fear' } }
    static get TYPES_WORRY_FEAR(){return { ID: 80005, LABEL: "Worry&Fear" } }

    constructor( type ){
      this.belongCoverTypes = {};
      Object.keys( Emotions.inputs ).forEach( ( label ) => {
        Emotions.inputs[ label ].forEach( ( stampId ) => {
          this.belongCoverTypes[ stampId ] = label;
        });
      });
    }

    static get inputs(){
        return {
            [ Emotions.TYPES_LIKE.LABEL ]: [ 1, 2, 3, 4, 5],
            [ Emotions.TYPES_MONEY.LABEL ]: [ 100 ],

            [ Emotions.TYPES_EXCITE.LABEL ]: [ 1101, 1102, 1103, 1001, 1002 ],
            [ Emotions.TYPES_HAPPY.LABEL ]: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
            [ Emotions.TYPES_JOY.LABEL ]: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
            [ Emotions.TYPES_RELAX.LABEL ]: [ 1601, 1602, 1603, 1701, 1702, 1703, 1801, 1802, 1803 ],

            [ Emotions.TYPES_SLACK.LABEL ]: [ 2001, 2002, 2003, 2004, 2005, 2101, 2102, 2103 ],
            [ Emotions.TYPES_MELANCHOLY.LABEL ]: [ 2301, 2302, 2303, 2201, 2202, 2203, 2204, 2205, 2401, 2402, 2403, 2404, 2501, 2502, 2503 ],
            [ Emotions.TYPES_ANGER.LABEL ]: [ 2701, 2702, 2703, 2704, 2705, 2706, 2601, 2602 ],
            [ Emotions.TYPES_WORRY_FEAR.LABEL ]: [ 2904, 2905, 2906, 2801, 2802, 2803, 2804, 2805, 2806, 2901, 2903 ],
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
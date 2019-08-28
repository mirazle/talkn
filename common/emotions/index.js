import Russell from '~/common/emotions/model/Russell';
import RussellSimple from '~/common/emotions/model/RussellSimple';

export default class Emotions {

    static get LIKE(){return { ID: 1001, LABEL: 'Like' } }
    static get INTEREST(){return { ID: 1002, LABEL: 'Interest' } }
    static get DISCOVERY(){return { ID: 1003, LABEL: 'Discovery' } }
    static get SUNNY(){return { ID: 1004, LABEL: 'Sunny' } }
    static get PEACE(){return { ID: 1005, LABEL: 'Peace' } }
    static get CHEER(){return { ID: 1006, LABEL: 'Cheer' } }
    static get MONEY(){return { ID: 1007, LABEL: 'Money' } }
    static get LOVE(){return { ID: 3000, LABEL: 'Love' } }
    static get UNLIKE(){return { ID: 2002, LABEL: 'Unlike' } }

    static get SUPRISE(){return { ID: 10001, LABEL: 'Surprise' } }
    static get EXCITE(){return { ID: 10002, LABEL: "Excite" } }
    static get HAPPY(){return { ID: 10003, LABEL: "Happy" } }

    static get JOY(){return { ID: 10004, LABEL: "Joy" } }
    static get GLAD(){return { ID: 20001, LABEL: "Glad" } }
    static get SATISFACTION(){return { ID: 20002, LABEL: 'Satisfaction' } }
    static get COMFORT(){return {ID: 30001, LABEL: 'Comfort' } }
    static get RELAX(){return { ID: 30002, LABEL: 'Relax' } }
    static get TIRED(){return { ID: 30003, LABEL: 'Tired' } }
    static get SLEEPY(){return { ID: 50001, LABEL: 'Sleepy' } }
    static get SLACK(){return { ID: 60001, LABEL: 'Slack' } }
    static get BORING(){return { ID: 60002, LABEL: 'Boring' } }
    static get MELANCHOLY(){return { ID: 70001, LABEL: 'Melancholy' } }
    static get SAD(){return { ID: 70002, LABEL: 'Sad' } }
    static get UNPLEASANT(){return { ID: 70003, LABEL: 'Unpleasant' } }
    static get FRUSTRATED(){return { ID: 70004, LABEL: 'Frustrated' } }
    static get DISSATISFIED(){return { ID: 80001, LABEL: 'Dissatisfied' } }
    static get ANGER(){return { ID: 80002, LABEL: 'Anger' } }
    static get WORRY(){return { ID: 80003, LABEL: 'Worry' } }
    static get FEAR(){return { ID: 80004, LABEL: 'Fear' } }
    static get WORRY_FEAR(){return { ID: 80005, LABEL: "Worry&Fear" } }

    constructor( type ){
      this.belongCoverTypes = {};
      Object.keys( Emotions.emojis ).forEach( ( dispKey ) => {
        Emotions.emojis[ dispKey ].forEach( ( stampId ) => {
          this.belongCoverTypes[ stampId ] = dispKey;
        });
      });
    }

    static get covers(){
        return {
          1:   {dispKey: Emotions.LIKE.LABEL},
          100: {dispKey: Emotions.MONEY.LABEL},
    
          1101: {dispKey: Emotions.EXCITE.LABEL},
          1201: {dispKey: Emotions.HAPPY.LABEL},
          1401: {dispKey: Emotions.JOY.LABEL},
          1601: {dispKey: Emotions.RELAX.LABEL},
    
          2001: {dispKey: Emotions.SLACK.LABEL},
          2301: {dispKey: Emotions.MELANCHOLY.LABEL},
          2701: {dispKey: Emotions.ANGER.LABEL},
          2904: {dispKey: Emotions.WORRY_FEAR.LABEL},
        }
    }
    
    static get datas(){
        return {
    
          // Flat like
          1001: Emotions.LIKE.LABEL,
          1002: Emotions.INTEREST.LABEL,
          1003: Emotions.DISCOVERY.LABEL,
          1004: Emotions.SUNNY.LABEL,
          1005: Emotions.PEACE.LABEL,
          1006: Emotions.CHEER.LABEL,
          1007: Emotions.LOL.LABEL,

          2002: Emotions.UNLIKE.LABEL,

          3000: Emotions.LOVE.LABEL,
    
          // Money
          5000: Emotions.MONEY.LABEL,

          // Positive(high)
          10001: Emotions.SUPRISE.LABEL,
          10002: Emotions.EXCITE.LABEL,
          10003: Emotions.HAPPY.LABEL,
          10004: Emotions.JOY.LABEL,
    
          // Positive(middle)
          20001: Emotions.GLAD.LABEL,
          20002: Emotions.SATISFACTION.LABEL,
    
          // Positive(low)
          30001: Emotions.COMFORT.LABEL,
          30002: Emotions.RELAX.LABEL,
          30003: Emotions.TIRED.LABEL,
    
          // Negatie(low)
          50001: Emotions.SLEEPY.LABEL,
          
          60001: Emotions.SLACK.LABEL,
          60002: Emotions.BORING.LABEL,
    
          // Negatie(middle)
          70001: Emotions.MELANCHOLY.LABEL,
          70002: Emotions.SAD.LABEL,
          70003: Emotions.UNPLEASANT.LABEL,
          70004: Emotions.FRUSTRATED.LABEL,
    
          // Negatie(high)
          80001: Emotions.DISSATISFIED.LABEL,
          80002: Emotions.ANGER.LABEL,
          80003: Emotions.WORRY.LABEL,
          80004: Emotions.FEAR.LABEL,
        }
    }
    
    static get map(){
        return {
    
          // Flat like
          1: '👍',
          2: '😉',
          4: '✌️',
          5: '👀',
          3: '💡',
          6: '💪',
    
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
          2003: '😲',
          2004: '🙄',
    
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
          2802: '🥺',
          2803: '😫',
          2804: '😓',
          2805: '😖',
          2806: '😨',
          2807: '😰',
    
          // Fear(Nega1)
          2901: '🥶',
          2902: '🤮',
          2903: '🥵',
          2904: '😱',
          2905: '🙀',
          2906: '💀'

        }
    }
    
    static get emojis(){
        return {
            [ Emotions.LIKE.LABEL ]: [ 1, 2, 3, 4, 5, 6 ],
            [ Emotions.MONEY.LABEL]: [ 100 ],
            [ Emotions.EXCITE.LABEL ]: [ 1101, 1102, 1103, 1001, 1002 ],
            [ Emotions.HAPPY.LABEL ]: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
            [ Emotions.JOY.LABEL ]: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
            [ Emotions.RELAX.LABEL ]: [ 1601, 1602, 1701, 1702, 1703, 1801, 1802, 1803 ],
        
            [ Emotions.SLACK.LABEL ]: [ 2001, 2002, 2003, 2004, 2101, 2102, 2103 ],
            [ Emotions.MELANCHOLY.LABEL ]: [ 2301, 2302, 2303, 2201, 2202, 2203, 2204, 2205, 2401, 2402, 2403, 2404, 2501, 2502, 2503 ],
            [ Emotions.ANGER.LABEL ]: [ 2701, 2702, 2703, 2704, 2705, 2706, 2601, 2602 ],
            [ Emotions.WORRY_FEAR.LABEL ]: [ 2904, 2905, 2906, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2901, 2903 ]
        }
    }
}
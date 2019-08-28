import Russell from '~/common/emotions/model/Russell';
import RussellSimple from '~/common/emotions/model/RussellSimple';

export default class Emotions {

    static get LABEL_LIKE(){return 'Like'}
    static get LABEL_INTEREST(){return 'Interest'}
    static get LABEL_DISCOVERY(){return 'Discovery'}
    static get LABEL_SUNNY(){return 'Sunny'}
    static get LABEL_PEACE(){return 'Peace'}
    static get LABEL_CHEER(){return 'Cheer'}
    static get LABEL_MONEY(){return 'Money'}
    static get LABEL_LOVE(){return 'Love'}
    static get LABEL_LOVE(){return 'Unlike'}

    static get LABEL_SUPRISE(){return 'Surprise'}
    static get LABEL_EXCITE(){return 'Excite'}
    static get LABEL_HAPPY(){return 'Happy'}
    static get LABEL_JOY(){return 'Joy'}
    static get LABEL_GLAD(){return 'Glad'}
    static get LABEL_SATISFACTION(){return 'Satisfaction'}
    static get LABEL_COMFORT(){return 'Comfort'}
    static get LABEL_RELAX(){return 'Relax'}
    static get LABEL_TIRED(){return 'Tired'}
    static get LABEL_SLEEPY(){return 'Sleepy'}
    static get LABEL_SLACK(){return 'Slack'}
    static get LABEL_BORING(){return 'Boring'}
    static get LABEL_MELANCHOLY(){return 'Melancholy'}
    static get LABEL_SAD(){return 'Sad'}
    static get LABEL_UNPLEASANT(){return 'Unpleasant'}
    static get LABEL_FRUSTRATED(){return 'Frustrated'}
    static get LABEL_DISSATISFIED(){return 'Dissatisfied'}
    static get LABEL_ANGER(){return 'Anger'}
    static get LABEL_WORRY(){return 'Worry'}
    static get LABEL_FEAR(){return 'Fear'}
    static get LABEL_WORRY_FEAR(){return "Worry&Fear"}

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
          1:   {dispKey: Emotions.LABEL_LIKE},
          100: {dispKey: Emotions.LABEL_MONEY},
    
          1101: {dispKey: Emotions.LABEL_EXCITE},
          1201: {dispKey: Emotions.LABEL_HAPPY},
          1401: {dispKey: Emotions.LABEL_JOY},
          1601: {dispKey: Emotions.LABEL_RELAX},
    
          2001: {dispKey: Emotions.LABEL_SLACK},
          2301: {dispKey: Emotions.LABEL_MELANCHOLY},
          2701: {dispKey: Emotions.LABEL_ANGER},
          2904: {dispKey: Emotions.LABEL_WORRY_FEAR},
        }
    }
    
    static get datas(){
        return {
    
          // Flat like
          1001: Emotions.LABEL_LIKE,
          1002: Emotions.LABEL_INTEREST,
          1003: Emotions.LABEL_DISCOVERY,
          1004: Emotions.LABEL_SUNNY,
          1005: Emotions.LABEL_PEACE,
          1006: Emotions.LABEL_CHEER,
          1007: Emotions.LABEL_MONEY,
    
          3000: Emotions.LABEL_LOEV,
    
          2002: Emotions.LABEL_UNLIKE,
    
          // Positive(high)
          10001: Emotions.LABEL_SUPRISE,
          10002: Emotions.LABEL_EXCITE,
          10003: Emotions.LABEL_HAPPY,
          10004: Emotions.LABEL_JOY,
    
          // Positive(middle)
          20001: Emotions.LABEL_GLAD,
          20002: Emotions.LABEL_SATISFACTION,
    
          // Positive(low)
          30001: Emotions.LABEL_COMFORT,
          30002: Emotions.LABEL_RELAX,
          30003: Emotions.LABEL_TIRED,
    
          // Negatie(low)
          50001: Emotions.LABEL_SLEEPY,
          
          60001: Emotions.LABEL_SLACK,
          60002: Emotions.LABEL_BORING,
    
          // Negatie(middle)
          70001: Emotions.LABEL_MELANCHOLY,
          70002: Emotions.LABEL_SAD,
          70003: Emotions.LABEL_UNPLEASANT,
          70004: Emotions.LABEL_FRUSTRATED,
    
          // Negatie(high)
          80001: Emotions.LABEL_DISSATISFIED,
          80002: Emotions.LABEL_ANGER,
          80003: Emotions.LABEL_WORRY,
          80004: Emotions.LABEL_FEAR,
        }
    }
    
    static get map(){
        return {
    
          // Flat like
          1: { emoji: '👍', balance: [{ 1001: 1 }]},
          2: { emoji: '😉', balance: [{ 1001: 1 }]},
          3: { emoji: '💡', balance: [{ 1003: 1 }]},
          4: { emoji: '✌️', balance: [{ 1001: 1 }]},
          5: { emoji: '👀', balance: [{ 1002: 1 }]},
          6: { emoji: '💪', balance: [{ 1006: 1 }]},
    
          100: { emoji: '💵', balance: [{ 1007: 1 }]},
    
          // Suprise(Posi1)
          1001: { emoji: '😳', balance: [{ 10001: 1 }]},
          1002: { emoji: '😵', balance: [{ 10001: 1 }]},
    
          // Excite(Posi1)
          1101: { emoji: '🤣', balance: [{ 10002: 1 }]},
          1102: { emoji: '😆', balance: [{ 10002: 1 }]},
          1103: { emoji: '🤩', balance: [{ 10002: 1 }]},
    
          // Happy(Posi2)
          1201: { emoji: '💓', balance: [{ 10003: 1 }]},
          1202: { emoji: '🥰', balance: [{ 10003: 1 }]},
          1203: { emoji: '😍', balance: [{ 10003: 1 }]},
          1204: { emoji: '😻', balance: [{ 10003: 1 }]},
    
          // Joy(Posi2)
          1301: { emoji: '😄', balance: [{ 10004: 1 }]},
          1302: { emoji: '✨', balance: [{ 10004: 1 }]},
          1303: { emoji: '😁', balance: [{ 10004: 1 }]},
          1304: { emoji: '🍺', balance: [{ 10004: 1 }]},
          1305: { emoji: '😊', balance: [{ 10004: 1 }]},
          1306: { emoji: '😘', balance: [{ 10004: 1 }]},
          1307: { emoji: '🌟', balance: [{ 10004: 1 }]},
    
          // Glad(Posi3)
          1401: { emoji: '🥳', balance: [{ 20001: 1 }]},
          1402: { emoji: '😃', balance: [{ 20002: 1 }]},
    
          // Satisfaction(Posi3)
          1501: { emoji: '😋', balance: [{ 20003: 1 }]},
          1502: { emoji: '🎂', balance: [{ 20003: 1 }]},
          1503: { emoji: '🍰', balance: [{ 20003: 1 }]},
          1504: { emoji: '🧁', balance: [{ 20003: 1 }]},
    
          // Comfort(Posi4)
          1601: { emoji: '😌', balance: [{ 30001: 1 }]},
          1602: { emoji: '🤤', balance: [{ 30001: 1 }]},

          // Relax(Posi4)
          1701: { emoji: '🙂', balance: [{ 30002: 1 }]},
          1702: { emoji: '☺️', balance: [{ 30002: 1 }]},   
          1703: { emoji: '☕️', balance: [{ 30002: 1 }]},
          1704: { emoji: '🍵', balance: [{ 30002: 1 }]},
    
          // Tired(Posi4)
          1801: { emoji: '😐', balance: [{ 30003: 1 }]},
          1802: { emoji: '😮', balance: [{ 30003: 1 }]},
          1803: { emoji: '😯', balance: [{ 30003: 1 }]},
    
          // Slack(Nega4)
          2001: { emoji: '😅', balance: [{ 60001: 1 }]},
          2002: { emoji: '💦', balance: [{ 60001: 1 }]},
          2003: { emoji: '😲', balance: [{ 60001: 1 }]},
          2004: { emoji: '🙄', balance: [{ 60001: 1 }]},
    
          // Boring(Nega4)
          2101: { emoji: '😒', balance: [{ 60002: 1 }]},
          2102: { emoji: '😑', balance: [{ 60002: 1 }]},
          2103: { emoji: '😕', balance: [{ 60002: 1 }]},
    
          // Melancholy(Nega4)
          2201: { emoji: '😩', balance: [{ 70001: 1 }]},
          2202: { emoji: '😞', balance: [{ 70001: 1 }]},
          2203: { emoji: '😔', balance: [{ 70001: 1 }]},
          2204: { emoji: '😟', balance: [{ 70001: 1 }]},
          2205: { emoji: '🤢', balance: [{ 70001: 1 }]},
    
          // Sad(Nega3)
          2301: { emoji: '😭', balance: [{ 70002: 1 }]},
          2302: { emoji: '😥', balance: [{ 70002: 1 }]},
    
          // Unpleasant(Nega3)
          2401: { emoji: '🤕', balance: [{ 70003: 1 }]},
          2402: { emoji: '🤒', balance: [{ 70003: 1 }]},
          2403: { emoji: '😷', balance: [{ 70003: 1 }]},
          2404: { emoji: '🤧', balance: [{ 70003: 1 }]},
    
          // frustrated(Nega3)
          2501: { emoji: '🧐', balance: [{ 70004: 1 }]},
          2502: { emoji: '🤔', balance: [{ 70004: 1 }]},
          2503: { emoji: '🤨', balance: [{ 70004: 1 }]},
    
          // dissatisfied(Nega2)
          2601: { emoji: '😠', balance: [{ 80001: 1 }]},
          2602: { emoji: '😾', balance: [{ 80001: 1 }]},
     
          // Anger(Nega2)
          2701: { emoji: '😡', balance: [{ 80002: 1 }]},
          2702: { emoji: '🤬', balance: [{ 80002: 1 }]},
          2703: { emoji: '💔', balance: [{ 80002: 1 }]},
          2704: { emoji: '💢', balance: [{ 80002: 1 }]},
          2705: { emoji: '😤', balance: [{ 80002: 1 }]},
          2706: { emoji: '👿', balance: [{ 80002: 1 }]},
    
          // Worry(Nega1)
          2801: { emoji: '😣', balance: [{ 80003: 1 }]},
          2802: { emoji: '🥺', balance: [{ 80003: 1 }]},
          2803: { emoji: '😫', balance: [{ 80003: 1 }]},
          2804: { emoji: '😓', balance: [{ 80003: 1 }]},
          2805: { emoji: '😖', balance: [{ 80003: 1 }]},
          2806: { emoji: '😨', balance: [{ 80003: 1 }]},
          2807: { emoji: '😰', balance: [{ 80003: 1 }]},
          2808: { emoji: '😿', balance: [{ 80003: 1 }]},
    
          // Fear(Nega1)
          2901: { emoji: '🥶', balance: [{ 80004: 1 }]},
          2902: { emoji: '🤮', balance: [{ 80004: 1 }]},
          2903: { emoji: '🥵', balance: [{ 80004: 1 }]},
          2904: { emoji: '😱', balance: [{ 80004: 1 }]},
          2905: { emoji: '🙀', balance: [{ 80004: 1 }]},
          2906: { emoji: '💀', balance: [{ 80004: 1 }]}

        }
    }
    
    static get emojis(){
        return {
            [ Emotions.LABEL_LIKE ]: [ 1, 2, 3, 4, 5, 6 ],
            [ Emotions.LABEL_MONEY ]: [ 100 ],
            [ Emotions.LABEL_EXCITE ]: [ 1101, 1102, 1103, 1001, 1002 ],
            [ Emotions.LABEL_HAPPY ]: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
            [ Emotions.LABEL_JOY ]: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
            [ Emotions.LABEL_RELAX ]: [ 1601, 1602, 1701, 1702, 1703, 1704, 1801, 1802, 1803 ],
        
            [ Emotions.LABEL_SLACK ]: [ 2001, 2002, 2003, 2004, 2101, 2102, 2103 ],
            [ Emotions.LABEL_MELANCHOLY ]: [ 2301, 2302, 2201, 2202, 2203, 2204, 2205, 2401, 2402, 2403, 2404, 2501, 2502, 2503 ],
            [ Emotions.LABEL_ANGER ]: [ 2701, 2702, 2703, 2704, 2705, 2706, 2601, 2602 ],
            [ Emotions.LABEL_WORRY_FEAR ]: [ 2904, 2905, 2906, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2901, 2903 ]
        }
    }
}
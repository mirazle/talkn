export default class Emotions {

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
      1:   {dispKey: "Like"},
      100: {dispKey: "Money"},

      1001: {dispKey: "Excite"},
      1201: {dispKey: "Happy"},
      1401: {dispKey: "Joy"},
      1601: {dispKey: "Relax"},

      2001: {dispKey: "Slack"},
      2401: {dispKey: "Melancholy"},
      2601: {dispKey: "Dissat"},
      2801: {dispKey: "Angry&Fear"}
    };
  }

  static get datas(){
    return {

      // Flat like
      1001: 'like',
      1002: 'interest',
      1003: 'discovery',
      1004: 'sunny',
      1005: 'peace',
      1006: 'cheer',
      1007: 'money',

      3000: 'love',

      2002: 'unlike',

      // Positive(high)
      10001: 'surprise',
      10002: 'excite',
      10003: 'happy',
      10004: 'joy',

      // Positive(middle)
      20001: 'glad',
      20002: 'satisfaction',

      // Positive(low)
      30001: 'comfort',
      30002: 'relax',
      30003: 'tired',

      // Negatie(low)
      50001: 'sleepy',
      
      60001: 'slack',
      60002: 'boring',

      // Negatie(middle)
      70001: 'melancholy',
      70002: 'sad',
      70003: 'unpleasant',
      70004: 'frustrated',

      // Negatie(high)
      80001: 'dissatisfied',
      80002: 'anger',
      80003: 'worry',
      80004: 'fear',
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
      2401: { emoji: '🤮', balance: [{ 70003: 1 }]},
      2402: { emoji: '🤕', balance: [{ 70003: 1 }]},
      2403: { emoji: '🤒', balance: [{ 70003: 1 }]},
      2404: { emoji: '😷', balance: [{ 70003: 1 }]},
      2405: { emoji: '🤧', balance: [{ 70003: 1 }]},

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
      2902: { emoji: '🥵', balance: [{ 80004: 1 }]},
      2903: { emoji: '😱', balance: [{ 80004: 1 }]},
      2904: { emoji: '🙀', balance: [{ 80004: 1 }]},
      2905: { emoji: '💀', balance: [{ 80004: 1 }]}
    }
  }

  static get emojis(){
    return {
      Like: [ 1, 2, 3, 4, 5, 6 ],
      Money: [ 100 ],
      Excite: [ 1001, 1002, 1101, 1102, 1103 ],
      Happy: [ 1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1305, 1306, 1307 ],
      Joy: [ 1401, 1402, 1501, 1502, 1503, 1504 ],
      Relax: [ 1601, 1602, 1701, 1801, 1802, 1803 ],

      Slack: [ 2001, 2002, 2003, 2004, 2101, 2102, 2103, 2201, 2202, 2203, 2204, 2205, 2301, 2302 ],
      Melancholy: [ 2401, 2402, 2403, 2404, 2405, 2501, 2502, 2503 ],
      Dissat: [ 2601, 2602, 2701, 2702, 2703, 2704, 2705, 2706 ],
      'Angry&Fear': [ 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2901, 2902, 2903, 2904, 2905 ]
    }
  }
}

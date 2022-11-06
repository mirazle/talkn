import conf from 'common/conf';

export default {
  email: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: 'No Name',
  },
  languages: {
    type: Array,
    default: ['1'],
  },
  sexes: {
    type: Array,
    default: ['1', '2'],
  },
  birthday: {
    type: Number,
    default: conf.defaultBirthdayUnixtime,
  },
  icon: {
    type: String,
    default: 'icon.jpg',
  },
  bg: {
    type: String,
    default: 'bg.jpg',
  },
  hasSelfTags: {
    investor: {
      type: Boolean,
      default: false,
    },
    founder: {
      type: Boolean,
      default: false,
    },
    member: {
      type: Boolean,
      default: false,
    },
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
};

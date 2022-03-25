const profileType = {
  name: {
    type: String,
    default: 'No Set',
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
    type: String,
    default: '2000-01-01',
  },
  icon: {
    type: String,
    default: '',
  },
  bg: {
    type: String,
    default: '',
  },
};

const tagType = {
  investor: {
    type: Array,
    default: [],
  },
  founder: {
    type: Array,
    default: [],
  },
  member: {
    type: Array,
    default: [],
  },
};

export default {
  email: { type: String, default: '' },
  profile: profileType,
  self: tagType,
  relation: tagType,
  story: { type: Array, default: [] },
};

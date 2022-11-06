import conf from 'common/conf';

export default {
  userId: { type: String, default: '' },
  tagParentType: { type: String, default: '' },
  tagType: { type: String, default: '' },
  index: { type: String, default: '' },
  industoryParentId: { type: String, default: '' },
  industoryId: { type: String, default: '' },
  jobParentId: { type: String, default: '' },
  jobCategoryId: { type: String, default: '' },
  jobId: { type: String, default: '' },
  startupSeriesId: { type: String, default: '' },
  storyId: { type: String, default: '' },
  year: { type: Number, default: 0 },
  sexes: { type: Array, default: [] },
  languages: { type: Array, default: [] },
  birthday: { type: Number, default: conf.defaultBirthdayUnixtime },
};

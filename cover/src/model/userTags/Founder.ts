import conf from 'common/conf';

export type FixFounderValuesType = {
  sexes: string[];
  languages: string[];
  birthday: number;
  industoryParentId: string;
  industoryId: string;
  startupSeriesId: string;
  year: number;
};

export const fixFounderValuesInit: FixFounderValuesType = {
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
  industoryParentId: '',
  industoryId: '',
  startupSeriesId: '',
  year: 0,
};

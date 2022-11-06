import conf from 'common/conf';

export type FixInvestorValuesType = {
  sexes: string[];
  languages: string[];
  birthday: number;
  industoryParentId: string;
  industoryId: string;
  startupSeriesId: string;
  year: number;
};

export const fixInvestorValuesInit: FixInvestorValuesType = {
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
  industoryParentId: '',
  industoryId: '',
  startupSeriesId: '',
  year: 0,
};

import conf from 'common/conf';

export type FixMemberValuesType = {
  sexes: string[];
  languages: string[];
  birthday: number;
  industoryParentId: string;
  industoryId: string;
  jobParentId: string;
  jobId: string;
  year: number;
};

export const fixMemberValuesInit: FixMemberValuesType = {
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
  industoryParentId: '',
  industoryId: '',
  jobParentId: '',
  jobId: '',
  year: 0,
};

import conf from 'common/conf';

export type UserHasSelfTagsType = {
  investor: boolean;
  founder: boolean;
  member: boolean;
};

export default class User {
  id: string;
  name: string;
  email: string;
  bg: string;
  icon: string;
  birthday: number;
  languages: string[];
  sexes: string[];
  hasSelfTags: UserHasSelfTagsType;
  constructor(props: User) {
    this.id = props.id ? props.id : '';
    this.name = props.name ? props.name : '';
    this.email = props.email ? props.email : '';
    this.bg = props.bg ? props.bg : '';
    this.icon = props.icon ? props.icon : '';
    this.birthday = props.birthday ? props.birthday : conf.defaultBirthdayUnixtime;
    this.languages = props.languages ? props.languages : [];
    this.sexes = props.sexes ? props.sexes : [];
    this.hasSelfTags = props.hasSelfTags ? props.hasSelfTags : userHasSelfTagsInit;
  }
}

export type UserType = {
  _id: string;
  name: string;
  email: string;
  bg: string;
  icon: string;
  birthday: number;
  languages: string[];
  sexes: string[];
  hasSelfTags: UserHasSelfTagsType;
};

export const userHasSelfTagsInit = {
  investor: false,
  founder: false,
  member: false,
};

export const userInit: UserType = {
  _id: '',
  name: '',
  email: '',
  bg: '',
  icon: '',
  birthday: conf.defaultBirthdayUnixtime,
  languages: [],
  sexes: [],
  hasSelfTags: userHasSelfTagsInit,
};

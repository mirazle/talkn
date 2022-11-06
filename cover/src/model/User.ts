import conf from 'common/conf';

import CommonModel from './Common';

export type UserHasSelfTagsType = {
  investor: boolean;
  founder: boolean;
  member: boolean;
};

export default class User extends CommonModel {
  public id: string;
  public name: string;
  public email: string;
  public bg: string;
  public icon: string;
  public snsIcon: string;
  public birthday: number;
  public languages: string[];
  public sexes: string[];
  public description: string;
  public hasSelfTags: UserHasSelfTagsType;
  constructor(props?: User) {
    super();
    this.id = this.resolveId(props);
    this.name = props && props.name ? props.name : '';
    this.email = props && props.email ? props.email : '';
    this.bg = props && props.bg ? props.bg : '';
    this.icon = props && props.icon ? props.icon : '';
    this.snsIcon = props && props.snsIcon ? props.snsIcon : '';
    this.birthday = props && props.birthday ? props.birthday : conf.defaultBirthdayUnixtime;
    this.languages = props && props.languages ? props.languages : [];
    this.sexes = props && props.sexes ? props.sexes : [];
    this.description = props && props.description ? props.description : 'Self Introduction Text......';
    this.hasSelfTags = props && props.hasSelfTags ? props.hasSelfTags : userHasSelfTagsInit;
  }

  resolveId(props) {
    if (props) {
      if (props.id) return props.id;
      if (props._id) return props._id;
    }
    return '';
  }
}

export const userInit = new User();

export const userHasSelfTagsInit = {
  investor: false,
  founder: false,
  member: false,
};

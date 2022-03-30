import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';

import conf from 'common/conf';

import H from 'cover/components/atoms/H';
import { tagParentSelf } from 'cover/components/organisms/Contents/Profile';
import { Profiles, ModalFooter, getIsDisabled, TagId } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import SelectIndustory from 'cover/components/organisms/Contents/Profile/modal/children/SelectIndustory';
import SelectStartupSeries from 'cover/components/organisms/Contents/Profile/modal/children/SelectStartupSeries';
import Modal from 'cover/components/organisms/Modal';
import { UserType, UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  sexes: string[];
  languages: string[];
  birthday: number;
  industoryParentId: string;
  industoryId: string;
  startupSeriesId: string;
  year: number;
};

export const fixValuesInit: FixValuesType = {
  sexes: [],
  languages: [],
  birthday: conf.defaultBirthdayUnixtime,
  industoryParentId: '',
  industoryId: '',
  startupSeriesId: '',
  year: 0,
};

type Props = {
  show: boolean;
  user: UserType;
  userTags: UserTagsType;
  userModalOptions: UserModalOptionType;
  onClickPositive: (userModalOptions: UserModalOptionType, fixValues: FixValuesType) => void;
  onCancel: () => void;
};

const Component: FunctionComponent<Props> = ({ show, user, userModalOptions, onClickPositive, onCancel }: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [disableButtonOk, setDisableButtonOk] = useState(false);
  const [initValues, setInitValues] = useState<FixValuesType>(fixValuesInit);
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const isEditable = userModalOptions.isEditable;

  const handleOnChangeBirthday = (birthday) => {
    console.log('handleOnChangeBirthday');
    setFixValues({ ...fixValues, birthday });
  };

  const handleOnChangeLanguages = (languages) => {
    console.log('handleOnChangeLanguages');
    setFixValues({ ...fixValues, languages });
  };

  const handleOnChangeSexes = (sexes) => {
    console.log('handleOnChangeSexes');
    setFixValues({ ...fixValues, sexes });
  };

  const handleOnChangeIndustory = (industoryParentId, industoryId) => {
    console.log('handleOnChangeIndustory');
    setFixValues({ ...fixValues, industoryParentId, industoryId });
  };

  const handleOnChangeStartupSeries = (startupSeriesId) => {
    console.log('handleOnChangeStartupSeries');
    setFixValues({ ...fixValues, startupSeriesId });
  };

  const handleOnChangeYear = (year) => {
    console.log('handleOnChangeYear');
    setFixValues({ ...fixValues, year });
  };

  const handleOnClose = () => {
    setFixValues({ ...initValues });
    onCancel();
  };

  useEffect(() => {
    if (show) {
      if (didMount) {
        setDisableButtonOk(getIsDisabled(fixValues));
      } else {
        setDidMount(true);
      }
    }
  }, [show, fixValues]);

  useEffect(() => {
    const values = {
      ...fixValues,
      languages: userModalOptions.languages,
      sexes: userModalOptions.sexes,
      birthday: userModalOptions.birthday,
      industoryParentId: userModalOptions.industoryParentId,
      industoryId: userModalOptions.industoryId,
      startupSeriesId: userModalOptions.startupSeriesId,
      year: userModalOptions.year,
    };
    setFixValues(values);
    setInitValues(values);
  }, [userModalOptions]);

  return (
    <Modal.Structure
      show={show}
      closeModal={handleOnClose}
      flow="column nowrap"
      header={
        <H.Five>
          {userModalOptions.tagParentType} - {userModalOptions.tagType}
          {isEditable && '(Edit)'}
        </H.Five>
      }
      content={
        <>
          <Profiles
            type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
            userModalOptions={
              userModalOptions.tagParentType === tagParentSelf ? { ...userModalOptions, isEditable: false } : userModalOptions
            }
            handleOnChangeLanguages={handleOnChangeLanguages}
            handleOnChangeSexes={handleOnChangeSexes}
            handleOnChangeBirthday={handleOnChangeBirthday}
            underline
          />
          <SelectIndustory
            type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
            isEditable={isEditable}
            industoryParentId={fixValues.industoryParentId}
            industoryId={fixValues.industoryId}
            onChange={handleOnChangeIndustory}
          />
          <SelectStartupSeries
            type={`${userModalOptions.tagParentType}_${userModalOptions.tagType}`}
            isEditable={isEditable}
            startupSeriesId={fixValues.startupSeriesId}
            year={fixValues.year}
            onChangeStartupSeriesId={handleOnChangeStartupSeries}
            onChangeYear={handleOnChangeYear}
          />
          <br />
          <TagId>ID: {userModalOptions._id && userModalOptions._id !== '' ? userModalOptions._id : '-'}</TagId>
        </>
      }
      footer={
        <ModalFooter
          userModalOptions={userModalOptions}
          positiveDisabeld={disableButtonOk}
          onClickPositive={() => onClickPositive(userModalOptions, fixValues)}
          handleOnClose={handleOnClose}
        />
      }
      upperPadding
      sidePadding
      bottomPadding
    />
  );
};

export default Component;

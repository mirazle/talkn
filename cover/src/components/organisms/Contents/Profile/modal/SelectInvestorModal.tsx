import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';

import H from 'cover/components/atoms/H';
import { TagParentType, TagType } from 'cover/components/organisms/Contents/Profile';
import { Profiles, ModalFooter, handleOnSearch } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import SelectIndustory from 'cover/components/organisms/Contents/Profile/modal/children/SelectIndustory';
import SelectStartupSeries from 'cover/components/organisms/Contents/Profile/modal/children/SelectStartupSeries';
import Modal from 'cover/components/organisms/Modal';
import { UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  sexes: string[];
  languages: string[];
  birthday: string;
  industoryParentId: string;
  industoryId: string;
  startupSeriesId: string;
  year: string;
};

export const fixValuesInit: FixValuesType = {
  sexes: [],
  languages: [],
  birthday: '',
  industoryParentId: '',
  industoryId: '',
  startupSeriesId: '',
  year: '',
};

type Props = {
  show: boolean;
  userTags: UserTagsType;
  userModalOptions: UserModalOptionType;
  onCancel: () => void;
  onOk: (tagParentType: TagParentType | '', tagType: TagType | '', fixValues: FixValuesType, index: number) => void;
};

const Component: FunctionComponent<Props> = ({ show, userModalOptions, onOk, onCancel }: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [disableButtonOk, setDisableButtonOk] = useState(false);
  const [initValues, setInitValues] = useState<FixValuesType>(fixValuesInit);
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const isEditable = userModalOptions.isEditable;

  const handleOnChangeBirthday = (birthday) => {
    setFixValues({ ...fixValues, birthday });
  };

  const handleOnChangeLanguages = (languages) => {
    setFixValues({ ...fixValues, languages });
  };

  const handleOnChangeSexes = (sexes) => {
    setFixValues({ ...fixValues, sexes });
  };

  const handleOnChangeIndustory = (industoryParentId, industoryId) => {
    setFixValues({ ...fixValues, industoryParentId, industoryId });
  };

  const handleOnChangeStartupSeries = (startupSeriesId) => {
    setFixValues({ ...fixValues, startupSeriesId });
  };

  const handleOnChangeYear = (year) => {
    setFixValues({ ...fixValues, year });
  };

  const handleOnClose = () => {
    setFixValues({ ...initValues });
    onCancel();
  };

  useEffect(() => {
    if (show) {
      if (didMount) {
        setDisableButtonOk(
          Boolean(
            Object.keys(fixValues).find((key) => {
              switch (typeof fixValues[key]) {
                case 'object':
                  return fixValues[key].length === 0;
                case 'string':
                  return fixValues[key] === '';
                default:
                  console.warn(`Confirm type ${key} ${fixValues[key]} ${typeof fixValues[key]}`);
                  return true;
              }
            })
          )
        );
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
      year: userModalOptions.years,
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
            userModalOptions={userModalOptions}
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
        </>
      }
      footer={
        <ModalFooter
          isEditable={isEditable}
          rightButtonDisabeld={disableButtonOk}
          onClickRightButton={() =>
            isEditable
              ? onOk(userModalOptions.tagParentType, userModalOptions.tagType, fixValues, userModalOptions.index)
              : handleOnSearch(userModalOptions)
          }
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

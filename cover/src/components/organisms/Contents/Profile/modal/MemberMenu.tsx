import React from 'react';

import { Profiles } from 'cover/components/organisms/Contents/Profile/common';
import SelectIndustory from 'cover/components/organisms/Contents/Profile/modal/children/SelectIndustory';
import SelectJob from 'cover/components/organisms/Contents/Profile/modal/children/SelectJob';
import { FixMemberValuesType } from 'cover/model/userTags/Member';

type Props = {
  type: string;
  fixValues: FixMemberValuesType;
  setFixValues: React.Dispatch<React.SetStateAction<FixMemberValuesType>>;
  isEditable?: boolean;
};

const Component: React.FC<Props> = ({ type, isEditable = false, fixValues, setFixValues }: Props) => {
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

  const handleOnChangeJob = (jobParentId, jobId) => {
    setFixValues({ ...fixValues, jobParentId, jobId });
  };

  const handleOnChangeYear = (year) => {
    setFixValues({ ...fixValues, year: Number(year) });
  };

  return (
    <>
      <Profiles
        type={type}
        isEditable={isEditable}
        isHorizon
        sexes={fixValues.sexes}
        languages={fixValues.languages}
        birthday={fixValues.birthday}
        handleOnChangeLanguages={handleOnChangeLanguages}
        handleOnChangeSexes={handleOnChangeSexes}
        handleOnChangeBirthday={handleOnChangeBirthday}
        underline
      />
      <SelectIndustory
        type={type}
        isEditable={isEditable}
        industoryParentId={fixValues.industoryParentId}
        industoryId={fixValues.industoryId}
        onChange={handleOnChangeIndustory}
      />
      <SelectJob
        type={type}
        isEditable={isEditable}
        jobParentId={fixValues.jobParentId}
        jobId={fixValues.jobId}
        year={fixValues.year}
        onChangeJob={handleOnChangeJob}
        onChangeYear={handleOnChangeYear}
      />
    </>
  );
};

export default Component;

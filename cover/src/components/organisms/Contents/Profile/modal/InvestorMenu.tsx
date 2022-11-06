import React from 'react';

import { Profiles } from 'cover/components/organisms/Contents/Profile/common';
import SelectIndustory from 'cover/components/organisms/Contents/Profile/modal/children/SelectIndustory';
import SelectStartupSeries from 'cover/components/organisms/Contents/Profile/modal/children/SelectStartupSeries';
import { FixValuesType } from 'cover/model/userTags';
import { FixInvestorValuesType } from 'cover/model/userTags/Investor';

type Props = {
  type: string;
  fixValues: FixInvestorValuesType;
  setFixValues: React.Dispatch<React.SetStateAction<FixValuesType>>;
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

  const handleOnChangeStartupSeries = (startupSeriesId) => {
    setFixValues({ ...fixValues, startupSeriesId });
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
      <SelectStartupSeries
        type={type}
        isEditable={isEditable}
        startupSeriesId={fixValues.startupSeriesId}
        year={fixValues.year}
        onChangeStartupSeriesId={handleOnChangeStartupSeries}
        onChangeYear={handleOnChangeYear}
      />
    </>
  );
};

export default Component;

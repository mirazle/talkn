import React, { useEffect, useState } from 'react';

import Flex from 'cover/components/atoms/Flex';
import Label from 'cover/components/atoms/Label';
import Select from 'cover/components/atoms/select';
import SelectYear from 'cover/components/organisms/Contents/Profile/modal/children/SelectYear';

type Props = {
  type: string;
  isEditable: boolean;
  startupSeriesId: string;
  year: number;
  onChangeStartupSeriesId: (startupSeriesId: string) => void;
  onChangeYear: (startupSeriesId: string) => void;
};

const Component: React.FC<Props> = ({
  type,
  isEditable,
  startupSeriesId: _sartupSeriesId,
  year: _year,
  onChangeStartupSeriesId,
  onChangeYear,
}: Props) => {
  const [startupSeriesId, setStartupSeriesId] = useState(_sartupSeriesId);
  const [year, setYear] = useState(_year);

  const handleOnChange = (value) => {
    setStartupSeriesId(value);
    onChangeStartupSeriesId(value);
  };

  const handleOnChangeYear = (value) => {
    setYear(value);
    onChangeYear(value);
  };

  useEffect(() => {
    setStartupSeriesId(_sartupSeriesId);
  }, [_sartupSeriesId]);

  useEffect(() => {
    setYear(_year);
  }, [_year]);

  return (
    <Flex flow="column nowrap">
      <Label bottomMargin>Phase</Label>
      <Flex flow="row wrap" alignItems="center">
        <Select.Single onChange={handleOnChange} disabled={!isEditable} name={'startupSeries[]'} value={startupSeriesId} noSelectOption>
          {window.talknStaticTags.startupSeries.map((tag) => (
            <Select.Option key={`StartupSeries_${tag.uniqueId}`} value={tag.uniqueId}>
              {tag.ja}
            </Select.Option>
          ))}
        </Select.Single>
        <SelectYear type={type} isEditable={isEditable} year={year} onChange={handleOnChangeYear} />
      </Flex>
    </Flex>
  );
};

export default Component;

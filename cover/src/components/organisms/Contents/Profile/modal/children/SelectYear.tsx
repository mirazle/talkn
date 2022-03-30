import React, { useEffect, useState } from 'react';

import Select from 'cover/components/atoms/select';

type Props = {
  type: string;
  isEditable: boolean;
  year: number;
  onChange: (year: number) => void;
};

export const defaultYears = [
  { uniqueId: '1', ja: 1 },
  { uniqueId: '2', ja: 2 },
  { uniqueId: '3', ja: 3 },
  { uniqueId: '4', ja: 4 },
  { uniqueId: '5', ja: 5 },
  { uniqueId: '6', ja: 6 },
  { uniqueId: '7', ja: 7 },
  { uniqueId: '8', ja: 8 },
  { uniqueId: '9', ja: 9 },
  { uniqueId: '10', ja: 10 },
  { uniqueId: '11', ja: 11 },
  { uniqueId: '12', ja: 12 },
  { uniqueId: '13', ja: 13 },
  { uniqueId: '14', ja: 14 },
  { uniqueId: '15', ja: 15 },
  { uniqueId: '16', ja: 16 },
  { uniqueId: '17', ja: 17 },
  { uniqueId: '18', ja: 18 },
  { uniqueId: '19', ja: 19 },
  { uniqueId: '20', ja: 20 },
];

const Component: React.FC<Props> = ({ type, isEditable, year: _year, onChange }: Props) => {
  const [year, setYear] = useState(_year);
  const handleOnChange = (value) => {
    setYear(value);
    onChange(value);
  };
  useEffect(() => {
    setYear(_year);
  }, [_year]);
  return (
    <Select.Single name={type} disabled={!isEditable} onChange={handleOnChange} value={String(year)} noSelectOption>
      {defaultYears.map((tag) => (
        <Select.Option key={`Year_${type}_${tag.uniqueId}`} value={String(tag.uniqueId)}>
          {String(tag.ja)}
        </Select.Option>
      ))}
    </Select.Single>
  );
};

export default Component;

import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';

import util from 'common/util';

type Props = {
  value: string;
};

const getConvertValue = (value): string => {
  return value;
};

const Component: React.FC<Props> = ({ value: _value }) => {
  const [value, setValue] = useState(_value);
  useEffect(() => {
    setTimeout(() => {
      const convertValue = getConvertValue(value);
      setValue(convertValue);
    }, 1000);
  }, [value]);

  return <TimeAgo date={value} formatter={(value, unit, suffix) => util.timeAgoFormatter(value, unit, suffix)} />;
};

export default Component;

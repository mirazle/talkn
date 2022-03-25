import React from 'react';

import Option from './Option';
import Single from './Single';

export const noSelectOptionLabel = '-';

export const getNoSelectOption = (): React.ReactNode => {
  return <option value={undefined}>{noSelectOptionLabel}</option>;
};

export default {
  Single,
  Option,
};

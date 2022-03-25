import React from 'react';

type Props = {
  value: string;
  children: string;
};

const Component: React.FC<Props> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default Component;

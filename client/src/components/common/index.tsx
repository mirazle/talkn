import React from 'react';

import { LabelStyle } from 'client/style/common';

type LabelProps = {
  htmlFor: string;
};

export const Label: React.FC<LabelProps> = (props: LabelProps) => <label style={LabelStyle} htmlFor={props.htmlFor} />;

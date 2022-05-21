import React from 'react';

import { GoogleSessionType } from 'cover/model/Google';

type Props = {
  session: GoogleSessionType;
  setSession: React.Dispatch<React.SetStateAction<GoogleSessionType>>;
};

const Components: React.FC<Props> = () => {
  return <>TOP!</>;
};

export default Components;

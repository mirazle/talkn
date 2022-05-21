import React, { useContext, useEffect, useState } from 'react';

import { GoogleSessionType, googleSessionInit } from 'cover/model/Google';
import styles from 'cover/styles';

export type FlexesContextType = {
  innerWidth: number;
  innerHeight: number;
  isScrollTop: boolean;
  isSpLayout: boolean;
  isSpLayoutStrict: boolean;
  isTransition: boolean;
};

export const flexesContextinit = {
  innerWidth: 0,
  innerHeight: 0,
  isScrollTop: false,
  isSpLayout: false,
  isSpLayoutStrict: false,
  isTransition: true,
};

export const FlexesContext = React.createContext(flexesContextinit);

export const useFlexesContext = () => {
  return useContext(FlexesContext);
};

export const getFlexesValue = () => {
  const [flexesContext, setFlexesContext] = useState(flexesContextinit);

  useEffect(() => {
    const handleFlexesAction = () => {
      setFlexesContext({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        isScrollTop: window.scrollY === 0,
        isSpLayout: window.innerWidth <= styles.spLayoutWidth,
        isSpLayoutStrict: window.innerWidth <= styles.spLayoutStrictWidth,
        isTransition: false,
      });
    };
    window.addEventListener('resize', handleFlexesAction);
    window.addEventListener('scroll', handleFlexesAction);
    handleFlexesAction();
    return () => {
      window.removeEventListener('resize', handleFlexesAction);
      window.removeEventListener('scroll', handleFlexesAction);
    };
  }, []);

  return flexesContext;
};

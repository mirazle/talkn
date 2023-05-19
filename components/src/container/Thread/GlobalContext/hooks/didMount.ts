import { HookProps } from 'components/container/Thread/GlobalContext';
import styles from 'components/styles';

export const didMount = ({ root, setLayout }: HookProps) => {
  const handleWindowAction = () => {
    setLayout({
      innerWidth: root.offsetWidth,
      innerHeight: root.offsetHeight,
      isSpLayout: root.offsetWidth < styles.layouts.breakSpWidth,
      isTabLayout: root.offsetWidth < styles.layouts.breakTabWidth,
      isSmallPcLayout: root.offsetWidth < styles.layouts.breakSmallPcWidth,
      isFullScreen: window.outerHeight === root.offsetWidth && window.outerHeight === root.offsetHeight,
    });
  };
  window.addEventListener('resize', handleWindowAction);
  handleWindowAction();
  return () => {
    root.removeEventListener('resize', handleWindowAction);
  };
};

export default didMount;

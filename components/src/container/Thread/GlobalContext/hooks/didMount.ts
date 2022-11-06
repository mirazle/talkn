import { HookProps } from 'components/container/Thread/GlobalContext';
import styles from 'components/styles';

export const didMount = ({ root, setLayout }: HookProps) => {
  const handleWindowAction = () => {
    /*
    console.log('@@@@@@@@@@@@@@');
    console.log(window.outerWidth, window.innerWidth, window.outerHeight, window.innerHeight);
    console.log(
      document.body.clientWidth,
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.body.clientHeight,
      document.body.scrollHeight,
      document.body.offsetHeight
    );
    console.log(root.clientWidth, root.scrollWidth, root.offsetWidth, root.clientHeight, root.scrollHeight, root.offsetHeight);
*/
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

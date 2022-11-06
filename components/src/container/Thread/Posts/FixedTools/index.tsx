import React from 'react';

import bootOption from 'api/reducers/bootOption';

import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';

import DetailModal from './DetailModal';
import Footer from './Footer';
import Media from './Media';
import NotifTip from './NotifTip';
import PostPictogram from './PostPictogram';
import TuneModal from './TuneModal';

type Props = {
  handleOnClickToggleTuneModal: () => void;
} & AppProps;

const Component: React.FC<Props> = (props) => {
  const { api, root, state, bootOption, handleOnClickToggleTuneModal } = props;
  const { app, thread } = state;
  const { uiTimeMarker, bools, menuMode, layout } = useGlobalContext();

  return (
    <>
      <NotifTip.TimeMarker
        className="FixTimeMarker"
        isFixed
        label={uiTimeMarker.now.label}
        isOpenFooter={bools.openFooter}
        isMediaCh={app.isMediaCh}
        isLoading={bools.loading}
      />

      <Media ch={thread.ch} findType={thread.findType} {...props} />

      <NotifTip.NewPost isOpenNewPost={bools.openNewPost} isOpenFooter={bools.openFooter} />
      <PostPictogram api={api} />

      <TuneModal ch={thread.ch} root={root} state={state} bootOption={bootOption} api={api} menuMode={menuMode} />
      <Footer api={api} icon={thread.favicon} />
      {layout.isSpLayout && <DetailModal {...props} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />}
    </>
  );
};

export default Component;

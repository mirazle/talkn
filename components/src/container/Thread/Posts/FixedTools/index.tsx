import React, { useEffect, useState } from 'react';

import { Props as AppProps } from 'components/container/Thread/App';
import { useGlobalContext } from 'components/container/Thread/GlobalContext';

import DetailModal from './DetailModal';
import Footer from './Footer';
import Media from './Media';
import NotifTip from './NotifTip';
import PostPictogram from './PostPictogram';

type Props = {
  handleOnClickToggleTuneModal: () => void;
  screenRef: any;
  postsRef: any;
  postTextareaRef: any;
} & AppProps;

const Component: React.FC<Props> = (props) => {
  const { api, root, state, bootOption, postTextareaRef, screenRef, postsRef, handleOnClickToggleTuneModal } = props;
  const { app, thread } = state;
  const { uiTimeMarker, bools, menuMode, layout } = useGlobalContext();
  const [label, setLabel] = useState(uiTimeMarker.now.label);

  useEffect(() => {
    setLabel(uiTimeMarker.now.label);
  }, [uiTimeMarker.now.label]);

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

      <Footer api={api} icon={thread.favicon} postTextareaRef={postTextareaRef} />
      {layout.isSpLayout && <DetailModal {...props} handleOnClickToggleTuneModal={handleOnClickToggleTuneModal} />}
    </>
  );
};

export default Component;

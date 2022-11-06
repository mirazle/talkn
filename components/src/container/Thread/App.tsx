import emotionNormalize from 'emotion-normalize';
import React from 'react';
import { connect } from 'react-redux';

import BootOption from 'common/BootOption';
import mapToStateToProps from 'common/clientState/mapToStateToProps/';

import AppStore from 'api/store/App';

import handles from 'client/actions/handles';

import Thread from 'components/container/Thread';
import { GlobalContext, useGlobalProviderValue } from 'components/container/Thread/GlobalContext';

export type StateType = {
  clientLog: string[];
  apiLog: string[];
  ranks: any; //ArticleType[];
  app: AppStore;
  thread: any;
  threadDetail: any;
  posts: any;
  postsTimeline: any;
  postsTimelineStock: any;
  ui: any;
  uiTimeMarker: any;
  tuneCh: any;
};

export type Props = {
  bootOption: BootOption;
  api: any;
  state: StateType;
  root: HTMLElement;
};

const App: React.FC<Props> = ({ bootOption, api, state, root }) => {
  return (
    <GlobalContext.Provider value={useGlobalProviderValue({ bootOption, api, state, root })}>
      <style type="text/css">{emotionNormalize.styles}</style>
      <Thread bootOption={bootOption} api={api} state={state} root={root} />
    </GlobalContext.Provider>
  );
};

export default connect(mapToStateToProps, { ...handles })(App);

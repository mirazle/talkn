import storage from "client/mapToStateToProps/storage";
import scroll from "client/mapToStateToProps/scroll";

export default (clientState, _props) => {
  let props = _props;
  let uiResults: any = {};
  const apiState = window.talknWindow.stores.api.getState();
  if (scroll[clientState.actionLog[0]]) {
    uiResults = scroll[clientState.actionLog[0]](clientState, apiState, _props);
    clientState = uiResults.state;
    props = uiResults.props;
  }
  return { clientState };
};

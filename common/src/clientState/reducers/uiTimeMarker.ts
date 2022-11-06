import UiTimeMarker from 'common/clientState/store/UiTimeMarker';

export default (state = new UiTimeMarker(), action) => {
  return action.uiTimeMarker ? { ...action.uiTimeMarker } : state;
};

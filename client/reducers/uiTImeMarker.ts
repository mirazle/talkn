import UiTimeMarker from "client/store/UiTimeMarker";

export default (state = new UiTimeMarker(), action) => {
  return action.uiTimeMarker ? { ...action.uiTimeMarker } : state;
};

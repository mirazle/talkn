import UiTimeMarker from "common/schemas/state/UiTimeMarker";

export default (state = new UiTimeMarker(), action) => {
  return action.uiTimeMarker ? { ...action.uiTimeMarker } : state;
};

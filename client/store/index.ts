import Ui from "./Ui";
import ComponentDidMounts from "./ComponentDidMounts";
import UiTimeMarker from "./UiTimeMarker";
import Setting from "./Setting";
import Style from "./Style";
import ActionLog from "./ActionLogs";

export default class ClientState {
  ui: Ui;
  componentDidMounts: ComponentDidMounts;
  uiTimeMarker: UiTimeMarker;
  style: Style;
  setting: Setting;
  actionLog: ActionLog;
  constructor(params) {
    this.ui = new Ui(params.ui);
    this.componentDidMounts = new ComponentDidMounts(params.componentDidMounts);
    this.uiTimeMarker = new UiTimeMarker(params.uiTimeMarker);
    this.style = new Style({ ...params, ui: this.ui });
    this.actionLog = new ActionLog();
  }
}

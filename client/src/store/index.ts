import ActionLog from './ActionLogs';
import ComponentDidMounts from './ComponentDidMounts';
import Setting from './Setting';
import Style from './Style';
import Ui from './Ui';
import UiTimeMarker from './UiTimeMarker';

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
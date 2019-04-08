import 'babel-polyfill';
import TalknWindow from 'client/operations/TalknWindow';
import TalknSetupJs from 'client/operations/TalknSetupJs';



TalknSetupJs.setupMath();

const talknIndex = window.talknIndex ? window.talknIndex + 1 : 1;
const talknWindow = new TalknWindow( talknIndex );

if( !window.talknWindow ) window.talknWindow = talknWindow;
if( !window.__talknWindow__ ) window.__talknWindow__ = [];
if( !window.__talknWindow__[ talknIndex ] ) window.__talknWindow__[ talknIndex ] = talknWindow;

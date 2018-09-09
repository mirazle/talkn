export default {
  storageFilter: store => next => action => {
    switch( action.type ){
    case 'SERVER_TO_CLIENT[EMIT]:find':
      break;
    }
    next(action);
  }
};

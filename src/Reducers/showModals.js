const initialState = {
    showNotificationModal: false,
    showOptionModal: false,
    icon: '',
    buttonName: '',
    primaryText: '',
    secondaryText: '',
  };
  
  const showModals = (state = initialState, action = {}) => {
    switch (action.type) {
      case 'SHOW_NOTIFICATION_MODAL':
        return {
          ...state,
          showNotificationModal: true,
          icon: action.payload.icon,
          buttonName: action.payload.buttonName,
          primaryText: action.payload.primaryText,
          secondaryText: action.payload.secondaryText,
  
        };
      case 'SHOW_OPTION_MODAL':
        return {
          ...state,
          showOptionModal: true,
          icon: action.payload.icon,
          buttonName: action.payload.buttonName,
          primaryText: action.payload.primaryText,
          secondaryText: action.payload.secondaryText,
        };
  
      case 'HIDE_NOTIFICATION_MODAL':
        return {
          ...state,
          showNotificationModal: false,
        };
      case 'HIDE_OPTION_MODAL':
        return {
          ...state,
          showOptionModal: false,
        };
  
      default:
        return state;
    }
  };
  
  export default showModals;
  
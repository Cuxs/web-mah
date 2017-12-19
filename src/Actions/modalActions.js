export const showNotificationModal = (
  icon,
  buttonName,
  primaryText,
  secondaryText
) => ({
  type: "SHOW_NOTIFICATION_MODAL",
  payload: { icon, buttonName, primaryText, secondaryText }
});

export const hideNotificationModal = () => ({
  type: "HIDE_NOTIFICATION_MODAL"
});

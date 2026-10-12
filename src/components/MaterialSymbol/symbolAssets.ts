import accountTreeAsset from "@material-symbols/svg-400/outlined/account_tree.svg?url";
import addAsset from "@material-symbols/svg-400/outlined/add.svg?url";
import alternateEmailAsset from "@material-symbols/svg-400/outlined/alternate_email.svg?url";
import arrowBackAsset from "@material-symbols/svg-400/outlined/arrow_back.svg?url";
import arrowForwardAsset from "@material-symbols/svg-400/outlined/arrow_forward.svg?url";
import calendarMonthAsset from "@material-symbols/svg-400/outlined/calendar_month.svg?url";
import checkCircleAsset from "@material-symbols/svg-400/outlined/check_circle.svg?url";
import chevronLeftAsset from "@material-symbols/svg-400/outlined/chevron_left.svg?url";
import chevronRightAsset from "@material-symbols/svg-400/outlined/chevron_right.svg?url";
import closeAsset from "@material-symbols/svg-400/outlined/close.svg?url";
import contentCopyAsset from "@material-symbols/svg-400/outlined/content_copy.svg?url";
import darkModeAsset from "@material-symbols/svg-400/outlined/dark_mode.svg?url";
import deleteAsset from "@material-symbols/svg-400/outlined/delete.svg?url";
import editAsset from "@material-symbols/svg-400/outlined/edit.svg?url";
import errorAsset from "@material-symbols/svg-400/outlined/error.svg?url";
import groupsAsset from "@material-symbols/svg-400/outlined/groups.svg?url";
import homeAsset from "@material-symbols/svg-400/outlined/home.svg?url";
import infoAsset from "@material-symbols/svg-400/outlined/info.svg?url";
import lightModeAsset from "@material-symbols/svg-400/outlined/light_mode.svg?url";
import lockAsset from "@material-symbols/svg-400/outlined/lock.svg?url";
import logoutAsset from "@material-symbols/svg-400/outlined/logout.svg?url";
import menuAsset from "@material-symbols/svg-400/outlined/menu.svg?url";
import moreHorizAsset from "@material-symbols/svg-400/outlined/more_horiz.svg?url";
import notificationsAsset from "@material-symbols/svg-400/outlined/notifications.svg?url";
import openInNewAsset from "@material-symbols/svg-400/outlined/open_in_new.svg?url";
import passwordAsset from "@material-symbols/svg-400/outlined/password.svg?url";
import personAsset from "@material-symbols/svg-400/outlined/person.svg?url";
import radioButtonUncheckedAsset from "@material-symbols/svg-400/outlined/radio_button_unchecked.svg?url";
import refreshAsset from "@material-symbols/svg-400/outlined/refresh.svg?url";
import searchAsset from "@material-symbols/svg-400/outlined/search.svg?url";
import settingsAsset from "@material-symbols/svg-400/outlined/settings.svg?url";
import shieldAsset from "@material-symbols/svg-400/outlined/shield.svg?url";
import todayAsset from "@material-symbols/svg-400/outlined/today.svg?url";
import visibilityAsset from "@material-symbols/svg-400/outlined/visibility.svg?url";
import visibilityOffAsset from "@material-symbols/svg-400/outlined/visibility_off.svg?url";
import warningAsset from "@material-symbols/svg-400/outlined/warning.svg?url";
import workspacePremiumAsset from "@material-symbols/svg-400/outlined/workspace_premium.svg?url";

export const symbolAssets = {
  account_tree: accountTreeAsset,
  add: addAsset,
  alternate_email: alternateEmailAsset,
  arrow_back: arrowBackAsset,
  arrow_forward: arrowForwardAsset,
  calendar_month: calendarMonthAsset,
  check_circle: checkCircleAsset,
  chevron_left: chevronLeftAsset,
  chevron_right: chevronRightAsset,
  close: closeAsset,
  content_copy: contentCopyAsset,
  dark_mode: darkModeAsset,
  delete: deleteAsset,
  edit: editAsset,
  error: errorAsset,
  groups: groupsAsset,
  home: homeAsset,
  info: infoAsset,
  light_mode: lightModeAsset,
  lock: lockAsset,
  logout: logoutAsset,
  menu: menuAsset,
  more_horiz: moreHorizAsset,
  notifications: notificationsAsset,
  open_in_new: openInNewAsset,
  password: passwordAsset,
  person: personAsset,
  radio_button_unchecked: radioButtonUncheckedAsset,
  refresh: refreshAsset,
  search: searchAsset,
  settings: settingsAsset,
  shield: shieldAsset,
  today: todayAsset,
  visibility: visibilityAsset,
  visibility_off: visibilityOffAsset,
  warning: warningAsset,
  workspace_premium: workspacePremiumAsset,
} as const;

export type MaterialSymbolName = keyof typeof symbolAssets;

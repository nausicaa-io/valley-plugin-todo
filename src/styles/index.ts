import { tokensCss } from "./tokens"
import { panelCss } from "./panel"
import { swipeCss } from "./swipe"
import { rowsCss } from "./rows"
import { rowFieldsCss } from "./rowFields"
import { tagsCss } from "./tags"
import { pageCss } from "./page"
import { detailCss } from "./detail"
import { editSheetCss } from "./editSheet"
import { sidebarTreeCss } from "./sidebarTree"
import { groupPopoversCss } from "./groupPopovers"
import { filtersCss } from "./filters"
import { settingsCss } from "./settings"
import { sidebarRowsCss } from "./sidebarRows"
import { tableCss } from "./table"
import { taskCardCss } from "./taskCard"

const STYLES =
  tokensCss +
  panelCss +
  swipeCss +
  rowsCss +
  rowFieldsCss +
  tagsCss +
  pageCss +
  detailCss +
  editSheetCss +
  sidebarTreeCss +
  groupPopoversCss +
  filtersCss +
  settingsCss +
  sidebarRowsCss +
  tableCss +
  taskCardCss

const STYLE_ID = "notes-todo-styles"

/** Inject (or refresh, on hot reload) the plugin stylesheet. */
export function injectStyles(): () => void {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement("style")
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = STYLES
  return () => {
    if (document.getElementById(STYLE_ID) === el) el.remove()
  }
}

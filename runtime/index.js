var to="valley";var Yc=`.${to}`,Xc=`app.${to}`;function _s(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Fs=/^[a-zA-Z]:/;function _r(e){if(typeof e!="string")return"";let o=_s(e);return!o||o==="."||Fs.test(o)||o.split("/").some(r=>r==="..")?"":o}function nt(e){if(typeof e=="string")return _r(e)||void 0}var Fe=`.${to}`,zs="plugins",Ao=`${Fe}/${zs}`,Gs="external",Qc=`${Ao}/${Gs}`,eu=`${Ao}/data`;var tu=`${Ao}/plugin.json`,ou=`${Ao}/config.json`,In=`${Fe}/state`,Pt=`${Fe}/settings`,Eo=`${Fe}/app`,Co=`${Fe}/accounts`,ru=`${Co}/providers`,nu=`${Co}/providers.lock.json`,au=`${Fe}/trash`,Fr=`${Fe}/cache`,iu=`${Fr}/accounts`,$s=`${Fr}/search`,su=`${Fr}/providers`;var du=`${Eo}/logs`,lu=`${Eo}/whats-new`,cu=`${Eo}/setup.json`,uu=`${$s}/index.jsonl`,pu=`${In}/journal`,fu=`${In}/txjournal`;var Do="design";var mu={app:`${Eo}/app.json`,appearance:`${Fe}/${Do}/appearance.json`,pallette:`${Fe}/${Do}/pallette.json`,group:`${Fe}/${Do}/group.json`,metadata:`${Pt}/metadata.json`,notification:`${Pt}/notification.json`,preferences:`${Pt}/preferences.json`,markdown:`${Pt}/markdown.json`,files:`${Pt}/files.json`,search:`${Pt}/search.json`,design:`${Fe}/${Do}/appearance.json`,accounts:`${Co}/accounts.json`},gu=`${Co}/secrets.json`;var Ln=to,Pn="open";var Mn=["http:","https:","mailto:","obsidian:"];var yu=[Fe,`${Fe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Rs=new Map;function me(e,o,r,n,a,i,s,l,u="owner"){let p=Object.freeze({id:e,kind:o,version:r,cardinality:n,validate:a,identities:i,identityScope:u,serviceCalls:s,serviceMetadata:l});return Rs.set(`${o}:${e}@${r}`,p),p}function Fn(e){let o=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=o.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var V=e=>!!e&&typeof e=="object"&&!Array.isArray(e),pe=(e,o)=>typeof e[o]=="function",vt=e=>e===void 0,Mt=e=>typeof e=="boolean",K=e=>typeof e=="string",Le=e=>e===void 0||K(e),Vs=e=>e===void 0||typeof e=="number",Hs=e=>e===void 0||typeof e=="boolean",ae=(e,o)=>e.length===o.length&&o.every((r,n)=>r(e[n])),we=e=>V(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),On=e=>V(e),Us=e=>V(e)&&K(e.id)&&K(e.title)&&K(e.date)&&(e.documentRef===void 0||V(e.documentRef)&&K(e.documentRef.pluginId)&&K(e.documentRef.sourceId)&&K(e.documentRef.itemId)),js=e=>V(e)&&K(e.date)&&Le(e.startTime)&&Le(e.endTime)&&Le(e.sourceId)&&Le(e.itemId),Bs=e=>V(e)&&K(e.url)&&Le(e.title)&&Hs(e.newTab),qs=e=>V(e)&&K(e.query),zn=e=>V(e)&&K(e.name)&&Le(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ws=e=>Array.isArray(e)&&e.every(zn),Ys=e=>e===null||zn(e),Xs=e=>e===void 0||V(e)&&Le(e.approvalToken)&&(e.cancellation===void 0||V(e.cancellation)),Zs=e=>typeof e=="string"||V(e)&&typeof e.text=="string",Js=e=>V(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&V(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Le(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Gn=e=>V(e)&&K(e.id)&&K(e.label)&&Le(e.labelKey)&&Le(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Gn)),Qs={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Us)},create:{args:e=>ae(e,[K,On]),result:Mt},update:{args:e=>ae(e,[K,On]),result:Mt},remove:{args:e=>ae(e,[K]),result:Mt},open:{args:e=>ae(e,[K]),result:vt},configure:{args:e=>e.length===0,result:vt},actions:{args:e=>ae(e,[K]),result:e=>Array.isArray(e)&&e.every(Gn)},runAction:{args:e=>ae(e,[K,K]),result:Mt}},ed=e=>V(e)&&K(e.name)&&K(e.version)&&Le(e.description)&&Le(e.author)&&(e.localized===void 0||V(e.localized)&&Object.values(e.localized).every(o=>V(o)&&K(o.name)&&Le(o.description))),No=me("calendar.itemSource","service","1.3.0","many",e=>V(e)&&pe(e,"list")&&(e.integration===void 0||ed(e.integration)),void 0,Qs,e=>e.integration),Io=me("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),$n=me("calendar.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"openDate"),void 0,{openDate:{args:e=>ae(e,[js]),result:vt}}),zr=me("calendar.panelSelection","state","1.0.0","one",e=>V(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Mu=me("web.activeContext","state","1.0.0","one",e=>V(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function _n(e){return V(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(o=>V(o)&&typeof o.address=="string"&&(o.label===void 0||typeof o.label=="string"))}var Ou=me("contacts.directory","service","1.0.0","one",e=>V(e)&&["search","resolveEmails","open"].every(o=>pe(e,o)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(_n)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(o=>typeof o=="string"&&o.length<=1e3),result:e=>Array.isArray(e)&&e.every(o=>V(o)&&typeof o.address=="string"&&Array.isArray(o.contacts)&&o.contacts.every(_n))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||V(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:vt}}),_u=me("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Fu=me("web.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"open"),void 0,{open:{args:e=>ae(e,[Bs]),result:vt}}),zu=me("selection.textAction","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&pe(e,"run"),e=>[e.id]),Lo=me("geo.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"open"),void 0,{open:{args:e=>ae(e,[qs]),result:vt}}),Gu=me("geo.search","service","1.0.0","one",e=>V(e)&&pe(e,"search")&&pe(e,"reverse"),void 0,{search:{args:e=>ae(e,[K]),result:Ws},reverse:{args:e=>ae(e,[o=>Number.isFinite(o),o=>Number.isFinite(o)]),result:Ys}}),Kn=me("agent.toolProvider","service","1.0.0","many",e=>V(e)&&Array.isArray(e.tools)&&e.tools.every(Js)&&pe(e,"execute"),e=>e.tools.map(o=>o.name),{execute:{args:e=>ae(e,[K,V,Xs]),result:Zs}},e=>({tools:e.tools}),"global"),$u=me("guard.runtime","service","1.0.0","one",e=>V(e)&&["resolve","requestApproval","consumeToken","audit"].every(o=>pe(e,o)),void 0,{resolve:{args:e=>ae(e,[V]),result:V},requestApproval:{args:e=>ae(e,[V]),result:Mt},consumeToken:{args:e=>e.length>=1&&e.length<=2&&K(e[0])&&Le(e[1]),result:Mt},audit:{args:e=>ae(e,[V]),result:vt}}),Ku=me("browser.automation","service","1.0.0","one",e=>V(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(o=>pe(e,o)),void 0,{list:{args:e=>e.length===0,result:we},open:{args:e=>ae(e,[K]),result:we},switch:{args:e=>ae(e,[K]),result:we},close:{args:e=>ae(e,[K]),result:we},snapshot:{args:e=>ae(e,[K]),result:we},readText:{args:e=>e.length>=1&&e.length<=2&&K(e[0])&&Vs(e[1]),result:we},readHtml:{args:e=>ae(e,[K]),result:we},screenshot:{args:e=>ae(e,[K]),result:we},click:{args:e=>ae(e,[K,o=>typeof o=="number"]),result:we},type:{args:e=>e.length>=3&&e.length<=4&&K(e[0])&&typeof e[1]=="number"&&K(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:we},select:{args:e=>ae(e,[K,o=>typeof o=="number",K]),result:we},scroll:{args:e=>ae(e,[K,o=>typeof o=="number",o=>typeof o=="number"]),result:we},pressKey:{args:e=>ae(e,[K,K]),result:we},navigate:{args:e=>ae(e,[K,K]),result:we},back:{args:e=>ae(e,[K]),result:we},forward:{args:e=>ae(e,[K]),result:we},reload:{args:e=>ae(e,[K]),result:we}}),Ru=me("fileTree.contextItem","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Le(e.labelKey)&&pe(e,"run"),e=>[e.id]),Vu=me("newTab.entry","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"run"),e=>[e.id]),Rn=me("search.resultCard","extension","1.0.0","many",e=>V(e)&&typeof e.cardKind=="string"&&pe(e,"render")&&pe(e,"open"),e=>[e.cardKind]),Gr=me("metadataPanel.segment","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"render"),e=>[e.id]),Vn=me("workspace.surface","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&pe(e,"getSnapshot")&&pe(e,"subscribe")&&pe(e,"restore"),e=>[e.id]),Hu=me("metadata.plugin","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"facts"),e=>[e.id]),Uu=me("workspace.viewState","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&pe(e,"capture")&&pe(e,"restore")&&pe(e,"subscribe"),e=>[e.id]);var t,m,Po=new Map;function Hn(e,o){let r=Po.get(e)??new Set;return r.add(o),Po.set(e,r),()=>{r.delete(o),r.size||Po.delete(e)}}function Un(e){m=e,t=e.React}var td=1800;function Ot(e){let o=at();t.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},l=f=>{i=f.nonce,f.mode==="edit"&&(o.clear(),e(f.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,w=()=>{if(r=null,i!==f.nonce)return;let T=[...Po.get(f.todoId)??[]].find(h=>h.isConnected);if(!T){Date.now()<g?r=setTimeout(w,40):o.get()?.nonce===f.nonce&&o.clear();return}T.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),T.classList.add("todo-reveal-target"),a=T,n=setTimeout(s,td),o.get()?.nonce===f.nonce&&o.clear()};r=setTimeout(w,0)},u=o.subscribe(()=>{let f=o.get();f&&l(f)}),p=o.get();return p&&l(p),()=>{u(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[o,e])}function at(){return m.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,o=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},o()},clear:()=>{r.value&&(r.value=null,o())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}var od=`
/* \u2500\u2500 Status & view palette \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Aliases onto the app's default palette, scoped to this plugin's roots \u2014
   never added to the global token set. A status is a semantic scale like a
   traffic light: if it followed the *accent*, In Progress and the selected
   sidebar row would be the same colour and neither would mean anything. It
   does follow the theme, and a user's .valley/design/*.css override, because
   these point at --color-* rather than restating a hex. The mapping is declared
   in statuses.ts / views.ts; this is its CSS mirror. */
.todo-panel,
.todo-page,
.todo-detail-body,
.ctx-menu,
.ctx-popover {
  --todo-st-open: var(--color-gray);
  --todo-st-inprogress: var(--color-primary-blue);
  --todo-st-waiting: var(--color-yellow);
  --todo-st-onhold: var(--color-orange);
  --todo-st-delegated: var(--color-mint);
  --todo-st-deferred: var(--color-violet);
  --todo-st-completed: var(--color-green);
  --todo-st-canceled: var(--color-red);
  /* One indent step. 22px keeps a 5-deep row readable at 245px of sidebar. */
  --todo-indent: 22px;
}

/* \u2500\u2500 Todo panel (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 0;
  color: var(--text-color);
}

/* shared small icon button (header + menu trigger) */
.todo-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  outline: none;
}

.todo-header-actions .todo-menu-btn svg {
  width: 16px;
  height: 16px;
}

.todo-menu-btn:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-menu-btn.active {
  background: var(--hover-bg);
  color: var(--accent-color);
}

.todo-header-actions .todo-menu-btn.active {
  color: var(--title-color);
}

.todo-header-actions .todo-status-menu-btn.active {
  color: var(--accent-color);
}

.todo-sort-menu-btn {
  width: auto;
  gap: 2px;
  padding: 0 5px;
}

.todo-sort-menu-btn svg {
  width: 16px;
  height: 16px;
}

/* A group with todos still in it: refused, but hoverable so the hint reads. */
.todo-group-blocked {
  cursor: not-allowed;
  opacity: 0.55;
}

.todo-group-blocked:hover {
  background: transparent;
  color: inherit;
}

.todo-focus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  flex-shrink: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease;
}
.todo-focus-btn svg {
  width: 13px;
  height: 13px;
}
.todo-row:hover .todo-focus-btn {
  opacity: 1;
}
.todo-focus-btn:hover {
  background: var(--hover-bg);
  color: var(--accent-color);
}
.todo-focus-btn:disabled {
  opacity: 0;
  cursor: default;
}

.todo-header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  -webkit-app-region: no-drag;
}

.todo-completed-toggle {
  height: 26px;
  padding: 0 5px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
  cursor: pointer;
}

.todo-completed-toggle:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

.todo-completed-toggle:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

/* horizontally scrollable due-date filter chips (mode="all") */
.todo-due-chips {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-2) 0;
  overflow-x: auto;
  flex-shrink: 0;
  scrollbar-width: none;
}

.todo-due-chips::-webkit-scrollbar {
  display: none;
}

.todo-due-chip {
  flex-shrink: 0;
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--border-light);
  border-radius: 999px;
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: var(--small-font-size);
  white-space: nowrap;
  cursor: pointer;
}

.todo-smart-chip,
.todo-date-chip,
.todo-status-chip {
  box-sizing: border-box;
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--border-light);
  border-radius: 999px;
  font-size: var(--small-font-size);
}

.todo-due-chip:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-due-chip.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--title-color);
}

/* compact rows \u2014 title + meta only; notes and tags are dropped in the markup */
.todo-row.compact {
  padding-top: 5px;
  padding-bottom: 5px;
}

.todo-row.compact .todo-view-meta {
  margin-top: 2px;
}

/* three-dots dropdown */
.todo-menu-wrap {
  position: relative;
  flex-shrink: 0;
}

/* filter bar (mode="all") */
.todo-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2) 5px 0;
  flex-shrink: 0;
}

/* create input */
.todo-create {
  padding: var(--space-2) var(--space-2);
  border-bottom: 1px solid var(--border-light);
  flex-shrink: 0;
}

/* sort row (shared .flagged-notes-sort), scoped narrower for the todo panel */
.todo-panel .flagged-notes-sort {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.todo-create input {
  width: 100%;
  min-width: 0;
  height: 28px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
}

.todo-create input:focus {
  border-color: var(--border-medium);
}

/* list */
/* Calendar-day filter chip: text + a clear (\xD7) icon. */
.todo-date-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.todo-date-chip svg {
  width: 12px;
  height: 12px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  padding: var(--space-1) 0 64px;
}

/* The \uFF0B-summoned create row. Sits at the top of the list rather than above it,
   so nothing occupies a row of the column while it is closed. */
.todo-compose {
  display: flex;
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--border-light);
}

.todo-compose input {
  flex: 1;
  min-width: 0;
  padding: 5px 7px;
  border: 1px solid var(--accent-color);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  outline: none;
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  color: var(--text-color);
}

.todo-compose input::placeholder {
  color: var(--text-tertiary);
}

/* \u2500\u2500 Swipe \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Right-swipe reveals when (a contextual reschedule tray), left-swipe reveals
   what (Flag \xB7 Details \xB7 Delete). The trays sit *behind* the row and the row
   translates over them, so nothing reflows mid-gesture \u2014 a tray that pushed
   the row would relayout the whole list on every pointer frame.

   Every width here comes from JS (swipeModel.ts) rather than a container query.
   The gesture needs the same numbers for its detents, and a breakpoint written
   in both places is exactly how the old 40px reserve drifted from its CSS twin. */
.todo-swipe {
  position: relative;
  overflow: hidden;
  /* The gesture owns horizontal movement; the list keeps the vertical axis. */
  touch-action: pan-y;
  overscroll-behavior-x: contain;
}

.todo-swipe-surface {
  position: relative;
  z-index: 1;
  background: var(--container-color);
}

/* Only attachment-linked task surfaces become true black in the dark theme.
   The panel canvas, left sidebar, other themes, and main workspace are untouched. */
[data-theme='dark'] .note-tasks-panel .todo-swipe-surface {
  background: #000;
}

/* Only a row that is actually moving gets promoted \u2014 a whole list of permanently
   layered rows costs memory for nothing. There is deliberately no transition on
   the transform: the settle is a JS spring seeded with the release velocity, and
   a CSS transition would make the row lag the pointer mid-drag. */
.todo-swipe.open .todo-swipe-surface {
  will-change: transform;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
}

.todo-swipe-tray {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: 0;
  overflow: hidden;
}

.todo-swipe-tray-left { left: 0; }
.todo-swipe-tray-right { right: 0; }

.todo-swipe-tray[aria-hidden='true'] {
  visibility: hidden;
  pointer-events: none;
}

.todo-swipe-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex: 1 1 0;
  width: auto;
  min-width: 0;
  padding: 0 var(--space-2);
  border: none;
  border-radius: 0;
  background: var(--todo-swipe-bg, var(--container-color-light));
  /* White on every tray but Flag, whose yellow needs the palette's own paired
     foreground \u2014 white on yellow is unreadable at any size. */
  color: var(--todo-swipe-fg, #fff);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  line-height: 1.1;
  text-align: center;
  cursor: pointer;
  transition:
    flex var(--duration-fast) var(--ease-out),
    padding var(--duration-fast) var(--ease-out),
    opacity var(--duration-fast) var(--ease-out);
}

.todo-swipe-action svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.todo-swipe-action span {
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
}

.todo-swipe-action:hover {
  filter: brightness(1.1);
}

/* Labels or icons, decided in swipeModel.ts by measuring the labels themselves.
   A button is only ever wide enough to spell its label in full; when three of
   them will not fit, every button drops to its icon and the name lives on
   title/aria-label \u2014 the same trade the JSON viewer toolbar makes. A clipped
   "This w\u2026" says less than the icon it replaced. */
.todo-swipe-tray.icons .todo-swipe-action { padding: 0; gap: 0; }
.todo-swipe-tray.icons .todo-swipe-action span { display: none; }
.todo-swipe-tray.icons .todo-swipe-action svg { width: 18px; height: 18px; }

/* Past the commit point the outermost action takes the whole row, live, so the
   commitment is visible before the finger lifts \u2014 the part of the iOS gesture
   people actually recognise. At full width there is room for the label even in
   the icon tier, and side by side reads better than stacked in a wide bar. */
.todo-swipe-tray.committed .todo-swipe-action {
  flex: 0 0 0;
  padding: 0;
  opacity: 0;
}

.todo-swipe-tray-left.committed .todo-swipe-action:first-child,
.todo-swipe-tray-right.committed .todo-swipe-action:last-child {
  flex: 1 1 100%;
  flex-direction: row;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  opacity: 1;
}

.todo-swipe-tray-left.committed .todo-swipe-action:first-child span,
.todo-swipe-tray-right.committed .todo-swipe-action:last-child span {
  display: block;
}

/* Stands in for the haptic tick the web has no way to fire. */
.todo-swipe-tray-left.committed .todo-swipe-action:first-child svg,
.todo-swipe-tray-right.committed .todo-swipe-action:last-child svg {
  animation: todo-swipe-pop var(--duration-base) var(--ease-out);
}

@keyframes todo-swipe-pop {
  0% { transform: scale(1); }
  45% { transform: scale(1.18); }
  100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .todo-swipe-action { transition: none; }
  .todo-swipe-tray-left.committed .todo-swipe-action:first-child svg,
  .todo-swipe-tray-right.committed .todo-swipe-action:last-child svg { animation: none; }
}

/* Reschedule reads as one family in the accent; the trailing actions are
   colour-coded by consequence: yellow flags, grey informs, red destroys. */
.todo-swipe-tomorrow { --todo-swipe-bg: var(--accent-color); }
.todo-swipe-weekend { --todo-swipe-bg: color-mix(in srgb, var(--accent-color) 72%, var(--title-color)); }
.todo-swipe-flag {
  --todo-swipe-bg: var(--color-yellow);
  --todo-swipe-fg: var(--color-yellow-on);
}
.todo-swipe-pick,
.todo-swipe-details { --todo-swipe-bg: color-mix(in srgb, var(--text-secondary) 45%, var(--container-color-light)); }
.todo-swipe-delete { --todo-swipe-bg: var(--negative-color-highlight); }

.todo-swipe-datepick {
  padding: var(--space-2);
}

/* \u2500\u2500 Nesting \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A child is a step of the todo above it. The guide is one hairline at the
   parent's rail so five tiers stay legible without five stacked borders. */
.todo-list-rows {
  display: flex;
  flex-direction: column;
}

.todo-row.nested::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--space-3) + var(--todo-indent) * (var(--todo-depth, 1) - 1) + 8px);
  width: 1px;
  background: var(--border-light);
}

.todo-row[data-depth='1'] { --todo-depth: 1; }
.todo-row[data-depth='2'] { --todo-depth: 2; }
.todo-row[data-depth='3'] { --todo-depth: 3; }
.todo-row[data-depth='4'] { --todo-depth: 4; }
.todo-row[data-depth='5'] { --todo-depth: 5; }

/* A row arrived at from somewhere else \u2014 the Calendar's "Open in To-Do". The
   pulse is what tells you which of forty rows the click meant; without it the
   panel just appears, scrolled, and you have to find the todo yourself. */
@keyframes todo-reveal-pulse {
  0%, 44%, 90%, 100% { background-color: transparent; }
  12%, 32%, 58%, 78% { background-color: color-mix(in srgb, var(--accent-color) 18%, transparent); }
}

.todo-row.todo-reveal-target {
  animation: todo-reveal-pulse 1.8s var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
  .todo-row.todo-reveal-target {
    animation: none;
    background-color: color-mix(in srgb, var(--accent-color) 18%, transparent);
    outline: 2px solid var(--accent-color);
    outline-offset: -2px;
  }
}

/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Flat, not cards: a check, a text column, an action cluster. The separator
   is indented to the text column (Reminders/Mail idiom) so the checks read
   as one vertical rail rather than each row as its own box. Per-row borders
   made a dense sidebar look like a stack of receipts. */
.todo-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  column-gap: var(--space-2);
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3);
  position: relative;
  border: none;
  background: transparent;
  /* The rows used to inherit whatever font the surrounding surface carried,
     which in a note context is the monospace editor stack. */
  font-family: var(--interface-font);
}

/* Full-bleed rule: edge to edge, so the list reads as one column of lines
   rather than a stack of indented fragments. Keyed off the swipe wrapper \u2014
   rows are no longer DOM siblings, each one sits inside its own gesture host. */
.todo-swipe + .todo-swipe .todo-row::before,
.todo-row + .todo-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-light);
}

.todo-panel .todo-list-rows > .todo-swipe:last-child .todo-row {
  box-shadow: inset 0 -1px 0 var(--border-light);
}

.todo-row:hover {
  background: var(--hover-bg);
}

.todo-row.drop-target {
  background: var(--accent-tint-bg);
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.todo-row-navigable {
  cursor: pointer;
}

.todo-row .todo-title-md {
  cursor: grab;
}

.todo-row .todo-title-md:active {
  cursor: grabbing;
}

.todo-row.completed h4,
.todo-row.completed .todo-notes {
  color: var(--text-tertiary);
}

.todo-row.completed h4 {
  text-decoration: line-through;
}

/* \u2500\u2500 The round check \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A real <input type=checkbox>, painted: it keeps the accessible name, the
   click semantics and the 450 ms press-and-hold status menu that hangs off
   the element. Modelled on the reading view's markdown task checkbox
   (MarkdownTab.css) with a full radius. */
.todo-check-wrap {
  position: relative;
  display: inline-grid;
  width: 18px;
  height: 19px;
}

.todo-check {
  grid-area: 1 / 1;
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  margin: 1px 0 0;
  flex-shrink: 0;
  display: inline-grid;
  place-content: center;
  border: 1.5px solid color-mix(in srgb, var(--text-secondary) 55%, transparent);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}

.todo-check:hover:not(:disabled) {
  border-color: var(--accent-color);
}

.todo-check:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.todo-check:checked {
  border-color: var(--accent-color);
  background: var(--accent-color);
}

/* Completed is the only status the box itself paints \u2014 a filled disc with a
   tick. Every other non-open status hands the square to its glyph (below),
   which is why the box goes transparent rather than picking up a colour of its
   own: two coloured shapes stacked read as an error. */
.todo-check[data-status='completed'] {
  border-color: var(--accent-color);
  background: var(--accent-color);
}

.todo-check[data-status='inprogress'],
.todo-check[data-status='waiting'],
.todo-check[data-status='onhold'],
.todo-check[data-status='delegated'],
.todo-check[data-status='deferred'],
.todo-check[data-status='canceled'] {
  border-color: transparent;
  background: transparent;
}

.todo-check[data-status='completed']::after {
  content: '';
  width: 10px;
  height: 10px;
  background: var(--title-color);
  clip-path: polygon(14% 47%, 5% 58%, 39% 90%, 96% 22%, 85% 12%, 37% 69%);
}

.todo-check:disabled {
  opacity: 0.5;
  cursor: default;
}

.todo-check-glyph {
  grid-area: 1 / 1;
  place-self: center;
  z-index: 1;
  margin-top: 1px;
  pointer-events: none;
  display: grid;
  place-items: center;
  font-size:1.125rem;
  line-height: 0;
}

/* The glyph takes the disc's whole footprint, so the row keeps one 18px rail
   whatever state it is in. */
.todo-check-glyph .todo-status-menu-svg {
  width: 18px;
  height: 18px;
}

.todo-row-main {
  min-width: 0;
}

.todo-row-main h4 {
  margin: 0;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.todo-title-md :is(strong, em, code, a, .hashtag) {
  font: inherit;
}

.todo-title-md code {
  padding: 0 3px;
  border-radius: 3px;
  background: var(--surface-color);
}

.todo-title-md a,
.todo-title-md .hashtag {
  color: var(--accent-color);
}

/* Actions sit on the baseline of the title, and only the flag is always on:
   the rest appear on hover so a resting list is just text. */
.todo-row-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: -1px;
}

.todo-flag-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  font-size:0.9375rem;
  cursor: pointer;
}

.todo-flag-mark {
  color: var(--neutral-color);
  cursor: default;
}

/* priority symbol inline before title text */
.todo-priority-inline {
  font-weight: 700;
  letter-spacing: 0.02em;
}

.todo-priority-low    { color: var(--text-tertiary); }
.todo-priority-medium { color: var(--neutral-color); }
.todo-priority-high   { color: var(--negative-color); }

.todo-notes {
  margin: 2px 0 0;
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  line-height: 1.4;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.todo-notes :is(p, ul, ol, blockquote, pre) {
  margin-top: 0;
  margin-bottom: 0;
}

.todo-notes ul,
.todo-notes ol {
  padding-left: 18px;
}

.todo-notes li {
  margin: 0;
}

.todo-notes a,
.todo-notes .hashtag {
  color: var(--accent-color);
}

.todo-notes code {
  font-family: var(--mono-font);
  font-size: 0.92em;
  padding: 0 3px;
  border-radius: 3px;
  background: var(--surface-color);
}

.todo-view-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 10px;
  row-gap: 3px;
  margin-top: 3px;
}

/* One line of plain text. No pills, no chips, no outlined badges: a box inside
   a row competes with the row for structure, and at sidebar width that reads as
   clutter. Each item leads with its own glyph instead \u2014 the icon separates the
   items *and* names what the value is, which an interpunct never did (a bare
   "15:00\u201316:00 \xB7 Moscone Center" left the reader to infer both). */
.todo-date,
.todo-clock-text,
.todo-tag-text,
.todo-group-text,
.todo-priority-text,
.todo-status-text,
.todo-status-badge,
.todo-attach-count,
.todo-time-badge,
.todo-location-meta,
.todo-meta-glyph {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  line-height: 1.3;
  white-space: nowrap;
}

/* The glyph takes its item's colour \u2014 an overdue date's alarm and a group's
   palette entry carry through to the icon rather than stopping at the words. */
.todo-meta-icon {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.todo-meta-icon svg {
  width: 11px;
  height: 11px;
}

.todo-view-meta .todo-status-menu-svg,
.todo-view-meta .todo-status-menu-dot {
  width: 11px;
  height: 11px;
}

/* A group's mark is its colour, so a plain dot says more than any glyph. */
.todo-group-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: currentColor;
}

.todo-view-meta > .todo-tag-text + .todo-tag-text {
  margin-left: -4px;
}

.todo-status-text {
  font-weight: var(--font-medium);
  text-transform: none;
  letter-spacing: 0;
}

.todo-priority-text {
  font-weight: var(--font-medium);
}

.todo-date {
  gap: 5px;
}

/* A row's date is a button into the Calendar; the search card's is plain text,
   so only the button says so. */
button.todo-date {
  cursor: pointer;
}

button.todo-date:hover .todo-date-day {
  text-decoration: underline;
}

.todo-date-full {
  color: var(--text-tertiary);
}

.todo-date-full::before {
  content: '(';
}

.todo-date-full::after {
  content: ')';
}

/* An overdue date is the one thing in the line that should carry alarm. */
.todo-date.is-overdue {
  color: var(--negative-color);
  font-weight: var(--font-medium);
}

.todo-tag-text {
  color: var(--accent-color);
}

/* The group in a row: its colour, set inline from the group's palette entry, and
   a medium weight so it reads as the row's owner. Still text \u2014 never a chip. */
.todo-group-text {
  font-weight: var(--font-medium);
}

.todo-meta-glyph {
  color: var(--text-tertiary);
}

.todo-meta-glyph svg {
  width: 12px;
  height: 12px;
}

/* Status keeps its colour, but as coloured text \u2014 the outlined uppercase badge
   is gone with every other box in the row. One class per status, shared by the
   meta line, the menu glyphs and the search card. */
.todo-st-open       { color: var(--todo-st-open); }
.todo-st-inprogress { color: var(--todo-st-inprogress); }
.todo-st-waiting    { color: var(--todo-st-waiting); }
.todo-st-onhold     { color: var(--todo-st-onhold); }
.todo-st-delegated  { color: var(--todo-st-delegated); }
.todo-st-deferred   { color: var(--todo-st-deferred); }
.todo-st-completed  { color: var(--todo-st-completed); }
.todo-st-canceled   { color: var(--todo-st-canceled); }

.todo-status-text {
  font-weight: var(--font-medium);
}

.todo-file-list {
  display: flex;
  flex-direction: column;
  grid-column: 2 / -1;
  gap: 4px;
  width: 100%;
  min-width: 0;
  margin-top: 4px;
}

.todo-file-card {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  align-items: center;
  gap: 7px;
  width: 100%;
  min-width: 0;
  padding: 4px 6px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color);
  color: var(--text-color);
  font-family: var(--interface-font);
  text-align: left;
  cursor: pointer;
}

.todo-file-card:hover {
  background: var(--hover-bg);
}

.todo-file-card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--accent-color);
}

.todo-file-card-icon svg {
  width: 12px;
  height: 12px;
}

.todo-file-card-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1px;
}

.todo-file-card-name,
.todo-file-card-kind {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.15;
}

.todo-file-card-name {
  color: var(--title-color);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
}

.todo-file-card-kind {
  color: var(--text-tertiary);
  font-size:0.625rem;
}

/* The overflow card carries a count rather than a file, so it reads as the
   quieter of the two \u2014 it opens the rest of the list, it is not one of the
   entries. Its chevron points down while there is more to show and flips once
   the list is open, which is also the only affordance saying it is a toggle. */
.todo-file-card-more .todo-file-card-name {
  color: var(--text-secondary);
  font-weight: 400;
}

.todo-file-card-more .todo-file-card-icon {
  color: var(--text-tertiary);
}

.todo-file-card-more svg {
  transition: transform 120ms ease;
}

.todo-file-card-more.open svg {
  transform: rotate(180deg);
}

.todo-menu-action-icon {
  width: 14px;
  height: 14px;
}

.todo-status-menu-dot {
  display: inline-grid;
  place-content: center;
  box-sizing: border-box;
  width: 13px;
  height: 13px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  color: var(--text-tertiary);
  background: transparent;
}

/* "open" is the only status drawn as a dot; every other one has a glyph, so
   there is no filled-dot variant left to special-case. */

.todo-status-menu-svg {
  width: 13px;
  height: 13px;
  flex: 0 0 auto;
}

/* edit mode */
.todo-edit {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-width: 0;
  padding-top: var(--space-1);
}

/* stacked field: small label above a full-width control */
.todo-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
/* two stacked fields side by side (Status | Priority) */
.todo-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  min-width: 0;
}
.todo-field-label {
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  color: var(--text-tertiary);
}
.todo-field-control {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  width: 100%;
  min-width: 0;
}
/* full-width Due badge inside a stacked field */
.todo-field .todo-date-badge {
  flex: 1;
  text-align: left;
}

/* full-width section (label stacked above the control) */
.todo-edit-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}
.todo-edit-section-label {
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

/* status / priority dropdowns */
/* The shared SelectField draws its own frame and chevron; this only tightens it
   to the compact row height these paired fields use. */
.todo-select.select-field {
  width: 100%;
  height: 28px;
  font-size: var(--small-font-size);
}
/* Tint the status label by its meaning, off the --todo-st-* scale above rather
   than the semantic tokens \u2014 on those, In Progress took the accent and
   Delegated and Completed collapsed onto one green, so the modal disagreed with
   every dot and badge elsewhere about what a status looks like.
   The hook sits on the wrapping field because the select's own class is shared. */
.todo-detail-field[data-status="inprogress"] .select-field-value { color: var(--todo-st-inprogress); }
.todo-detail-field[data-status="waiting"]    .select-field-value { color: var(--todo-st-waiting); }
.todo-detail-field[data-status="onhold"]     .select-field-value { color: var(--todo-st-onhold); }
.todo-detail-field[data-status="delegated"]  .select-field-value { color: var(--todo-st-delegated); }
.todo-detail-field[data-status="deferred"]   .select-field-value { color: var(--todo-st-deferred); }
.todo-detail-field[data-status="canceled"]   .select-field-value { color: var(--todo-st-canceled); }
.todo-detail-field[data-status="completed"]  .select-field-value { color: var(--todo-st-completed); }

/* "More details" disclosure */
.todo-more-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
  border: none;
  background: none;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
  outline: none;
}
.todo-more-toggle:hover { color: var(--title-color); }
.todo-more-toggle:disabled { opacity: 0.6; cursor: default; }
.todo-more-toggle svg {
  width: 14px;
  height: 14px;
  color: var(--text-tertiary);
  transition: transform 0.15s ease;
}
.todo-more-toggle.open svg { transform: rotate(180deg); }
.todo-more-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-light);
}

.todo-title-input,
.todo-time-row input,
.todo-row textarea {
  width: 100%;
  min-width: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
}

.todo-title-input,
.todo-time-row input {
  height: 26px;
  padding: 0 var(--space-2);
}

.todo-row textarea {
  min-height: 38px;
  padding: var(--space-1) var(--space-2);
  resize: vertical;
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
}

.todo-title-input:focus,
.todo-time-row input:focus,
.todo-row textarea:focus {
  border-color: var(--border-medium);
}

/* date badge \u2014 opens the native picker; sized to match the dropdowns */
.todo-date-badge {
  height: 28px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  white-space: nowrap;
  cursor: pointer;
}

.todo-date-badge:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-date-hidden {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}

/* est + actual */
.todo-time-row {
  display: flex;
  gap: var(--space-1);
  flex: 1;
  min-width: 0;
}

.todo-edit-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.todo-save-btn,
.todo-cancel-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  cursor: pointer;
}

.todo-save-btn {
  border: none;
  background: var(--accent-color);
  color: #fff;
}

.todo-save-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.todo-cancel-btn {
  border: 1px solid var(--border-light);
  background: transparent;
  color: var(--text-secondary);
}

.todo-cancel-btn:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* \u2500\u2500 Todo: confirm delete \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-confirm-delete {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 4px 0 2px;
  font-size: var(--smaller-font-size);
  color: var(--text-secondary);
}

.todo-confirm-delete span {
  flex: 1;
}

.todo-confirm-yes,
.todo-confirm-no {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--smaller-font-size);
  cursor: pointer;
}

.todo-confirm-yes {
  border: none;
  background: var(--negative-color);
  color: #fff;
}

.todo-confirm-yes:disabled {
  opacity: 0.5;
  cursor: default;
}

.todo-confirm-no {
  border: 1px solid var(--border-light);
  background: transparent;
  color: var(--text-secondary);
}

.todo-confirm-no:hover {
  background: var(--hover-bg);
}

/* \u2500\u2500 Todo: tag input & pills \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-tag-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  min-height: 24px;
}

.todo-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 24px;
  padding: 0 8px 0 9px;
  border-radius: 12px;
  background: var(--surface-color-alt);
  color: var(--accent-color);
  font-size: var(--small-font-size);
  white-space: nowrap;
}

.todo-tag-remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 0;
  font-size:0.5625rem;
}

.todo-tag-remove:hover {
  color: var(--title-color);
}

.todo-tag-input {
  flex: 1;
  min-width: 60px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
  padding: 0 2px;
}

.todo-tag-input::placeholder {
  color: var(--text-tertiary);
}

/* \u2500\u2500 Todo: tag view pills (read mode) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-tags-view {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 2px;
}

.todo-tag-view-pill {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  background: var(--surface-color-alt);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
}


/* \u2500\u2500 Todo clock badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.todo-clock-badge {
  font-size: var(--small-font-size);
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
  padding: 0 6px;
  border-radius: var(--radius-sm);
  background: var(--hover-bg);
}
.todo-clock-row { display: flex; align-items: center; gap: var(--space-1); min-width: 0; }
.todo-clock-row .time-field {
  flex: 1;
  min-width: 0;
  font-size: var(--small-font-size);
}
.todo-clock-dash { color: var(--text-tertiary); flex-shrink: 0; }


.todo-detail-link-input {
  box-sizing: border-box;
  flex: 1;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font-size: var(--small-font-size);
  min-width: 0;
  min-height: var(--control-min-height);
  outline: none;
}
.todo-detail-link-input:focus { border-color: var(--accent-color); }

/* \u2500\u2500 To-Do page (main_workspace \u2014 Things-style sections) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.todo-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--surface-color-alt);
  color: var(--text-color);
}
.todo-page-appbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: var(--app-bar-height);
  box-sizing: border-box;
  flex: 0 0 auto;
  padding: 0 10px;
  border-bottom: 1px solid var(--border-light);
  background: var(--surface-color-alt);
}
.todo-page-appbar-actions {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 2px;
}
.todo-page-appbar-actions { margin-left: auto; }
.todo-page-appbar-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}
.todo-page-appbar-btn:hover:not(:disabled) {
  background: var(--hover-bg);
  color: var(--text-color);
}
.todo-page-appbar-btn svg { width: 15px; height: 15px; }
.todo-page-appbar-title {
  position: absolute;
  left: 50%;
  max-width: max(0px, calc(100% - 180px));
  overflow: hidden;
  transform: translateX(-50%);
  font-size: var(--small-font-size);
  font-weight: var(--font-semibold);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-page-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
.todo-page-column {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--space-6, 24px) var(--space-5, 20px) 120px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4, 16px);
}
.todo-page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1, 4px);
}
/* The view's name, large and in its own colour: in a full-width surface the
   first thing that has to be true is *which list is this*, and a 13px "To-Do"
   beside a stat line never answered it. The colour is set inline from
   SMART_LISTS / the group palette. */
.todo-page-view-title {
  margin: 0;
  font-family: var(--interface-font);
  font-size: 2rem;
  font-weight: var(--font-bold, 700);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.todo-page-view-sub {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-variant-numeric: tabular-nums;
}

/* A text link, not a button: it sits on the same baseline as the tally and a
   box there would out-weigh the title above it. */
.todo-page-view-toggle {
  padding: 0;
  border: none;
  background: none;
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  cursor: pointer;
}

.todo-page-view-toggle:hover {
  text-decoration: underline;
}

.todo-page-view-toggle:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  border-radius: 3px;
}

/* \u2500\u2500 Date sections \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Scheduled and Today read as days, so the date moves out of every row and
   onto one line above the group \u2014 in a date-ordered list the row was
   repeating what the header already said. */
.todo-page-days {
  display: flex;
  flex-direction: column;
}

.todo-day-head {
  margin: 0;
  padding: var(--space-3) var(--space-2) var(--space-1) var(--space-3);
  border-top: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.todo-day-head.is-overdue {
  color: var(--negative-color);
}

.todo-page-days:first-of-type .todo-day-head {
  border-top: none;
}

/* Morning \xB7 Afternoon \xB7 Tonight inside Today. Quieter than a day header \u2014 it
   divides one day rather than naming a new one, and Today already said which
   day this is. */
.todo-timeofday-head {
  margin: 0;
  padding: var(--space-3) var(--space-2) var(--space-1) var(--space-3);
  border-top: 1px solid var(--border-light);
  color: var(--text-tertiary);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  letter-spacing: 0.02em;
}

/* A month roll-up: one collapsed row standing in for a wall of day headers
   nobody is reading yet. Closed by default; the chevron matches the page
   sections' so the two disclosures read as one control. */
.todo-month-head {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-3) var(--space-2) var(--space-3) var(--space-3);
  border: none;
  border-top: 1px solid var(--border-light);
  background: none;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--normal-font-size);
  font-weight: var(--font-semi-bold);
  text-align: left;
  cursor: pointer;
}

.todo-month-head:hover {
  background: var(--hover-bg);
}

.todo-month-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-month.collapsed .todo-page-section-chevron {
  transform: rotate(-90deg);
}

.todo-month .todo-day-head {
  padding-left: var(--space-5);
}

.todo-schedule-block {
  display: flex;
  flex-direction: column;
}

.todo-schedule-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: 1.1rem;
  font-weight: var(--font-bold, 700);
}

.todo-schedule-overdue {
  color: var(--negative-color);
}

.todo-schedule-today {
  color: var(--accent-color);
}

.todo-schedule-completed {
  color: var(--text-secondary);
}

.todo-schedule-block .todo-day-head {
  border-top: none;
  padding-top: var(--space-2);
}

.todo-page-quickadd {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  padding: var(--space-3, 12px) var(--space-3, 12px);
  background: var(--container-color);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
}
.todo-page-quickadd:focus-within { border-color: var(--accent-color); }
.todo-page-quickadd-icon { width: 16px; height: 16px; color: var(--text-tertiary); flex-shrink: 0; }
.todo-page-quickadd input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--title-color);
  font-size: var(--font-size, 14px);
}
.todo-page-quickadd input::placeholder { color: var(--text-tertiary); }

.todo-page-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  flex-wrap: wrap;
}
.todo-page-toolbar .todo-search-wrap { flex: 1; min-width: 0; }

.todo-page-section { display: flex; flex-direction: column; }
.todo-page-section-head {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  width: 100%;
  padding: var(--space-2, 8px) 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  text-align: left;
}
.todo-page-section-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.15s ease;
  color: var(--text-tertiary);
}
.todo-page-section.collapsed .todo-page-section-chevron { transform: rotate(-90deg); }
.todo-page-section-label {
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold, 600);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.todo-page-section-overdue { color: var(--negative-color); }
.todo-page-section-today { color: var(--accent-color); }
.todo-page-section-count {
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
}
.todo-page-section-body {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.todo-page-section-empty {
  padding: var(--space-2, 8px) var(--space-1, 4px);
  color: var(--text-tertiary);
  font-size: var(--small-font-size);
  font-style: italic;
}
/* Every workspace view uses the same continuous section card. Scheduled and
   Today previously dropped their date-group rows straight onto the black page,
   while All wrapped them; the list itself is now the shared card boundary. */
.todo-page-section-body {
  overflow: visible;
}
.todo-page .todo-list-rows {
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color);
  overflow: hidden;
}
.todo-page-section-body .todo-row {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}
.todo-page-section-body .todo-row + .todo-row::before {
  left: calc(var(--space-3) + 18px + var(--space-2));
}

/* \u2500\u2500 The \uFF0B button \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Anchored to the surface, not the scroller, so it stays put while the list
   moves under it. Above the focus dock, which shares the bottom edge. */
.todo-panel,
.todo-page {
  position: relative;
}

.todo-fab {
  position: absolute;
  right: var(--space-3);
  bottom: var(--space-3);
  z-index: var(--z-fixed);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: var(--accent-color);
  color: #fff;
  font-size:1.375rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
  transition: transform var(--duration-fast) var(--ease-out),
              filter var(--duration-fast) var(--ease-out);
}

.todo-fab:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.todo-fab:active:not(:disabled) {
  transform: translateY(0) scale(0.96);
}

.todo-fab:disabled {
  opacity: 0.5;
  cursor: default;
}

.todo-fab svg {
  width: 22px;
  height: 22px;
  stroke-width: 2.4;
}

@media (prefers-reduced-motion: reduce) {
  .todo-fab { transition: none; }
}

/* \u2500\u2500 Detail modal body (api.ui.Modal, bodyClassName) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The host owns the frame, the backdrop, the header and the footer (.modal);
   this only lays out the body. Two columns \u2014 what the todo says on the left,
   what it is on the right \u2014 collapsing to one when the modal is narrow. */
.todo-detail-body {
  gap: var(--space-3);
  font-size: var(--small-font-size);
}

.todo-detail-cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: var(--space-3) var(--space-5);
  align-items: start;
}

.todo-detail-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-width: 0;
}

/* The rail's fields are label-left / control-right in a 260px column; below the
   breakpoint they stack under the notes and the same rule still reads. */
@media (max-width: 720px) {
  .todo-detail-cols {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* The first section in each column is under the title row, not under another
   section \u2014 its hairline would draw a second rule right below the title. */
.todo-detail-col > .todo-detail-block:first-child {
  padding-top: 0;
  border-top: none;
}

.todo-detail-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* The group editors are still popovers (api.ui.openPopover), so they draw their
   own header and their own dismiss button \u2014 a modal gets both from the host. */
.todo-detail-head {
  display: flex;
  align-items: flex-start;
  gap: var(--space-1);
}

.todo-detail-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}

.todo-detail-close:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* Left of the primary action: this is the destructive one, and the footer's
   flex-end would otherwise park it next to Done. */
.todo-detail-delete {
  margin-right: auto;
}

/* The title is the modal's real subject \u2014 the host header names the action. */
/* The field draws its box at rest, not on hover or focus. It is the one thing
   in the modal that is always editable, and a borderless title read as a
   heading \u2014 people looked for somewhere else to type. */
.todo-detail-title {
  flex: 1;
  min-width: 0;
  height: 34px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font: inherit;
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
  outline: none;
}

.todo-detail-title:hover {
  border-color: var(--border-medium);
}

.todo-detail-title:focus {
  border-color: var(--accent-color);
}

.todo-detail-flag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}

.todo-detail-flag:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-detail-flag.on {
  border-color: var(--neutral-color);
  color: var(--neutral-color);
}

.todo-detail-notes .sidenote-editor {
  min-height: 180px;
  max-height: 320px;
  overflow-y: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--body-color);
}

/* The shared markdown editor ships the monospace editor stack; notes on a task
   are prose, so they read in the interface face like everything else here. */
.todo-detail-notes .sidenote-editor,
.todo-detail-notes .cm-editor,
.todo-detail-notes .cm-content,
.todo-detail-notes .cm-line {
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
}

.todo-detail-row-end {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

/* Hairline-separated groups, mirroring the settings kit's Section rhythm. */
.todo-detail-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-light);
}

.todo-detail-group-label {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.todo-detail-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.todo-detail-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  min-height: 26px;
}

.todo-detail-label {
  flex-shrink: 0;
  color: var(--text-secondary);
}

/* In the 260px rail every control takes the room the label leaves, so the
   select, the combo and the date field line up on one right edge. */
.todo-detail-rail .todo-detail-field,
.todo-detail-rail .todo-detail-row {
  min-height: 30px;
}

.todo-detail-rail .todo-detail-field > :not(.todo-detail-label) {
  flex: 1;
  min-width: 0;
  max-width: 170px;
}

/* Two time inputs plus a dash do not fit the rail's control column beside a
   label; this one field takes the whole width with the label above it. */
.todo-detail-rail .todo-detail-field-stack {
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-1);
}

.todo-detail-rail .todo-detail-field-stack > :not(.todo-detail-label) {
  max-width: none;
}

/* Layout only \u2014 .combo-field owns the frame, padding and caret. */
.todo-detail-combo {
  min-width: 0;
  font-size: var(--small-font-size);
}

.todo-detail-inline-input {
  min-width: 0;
  height: 26px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
  outline: none;
}

.todo-detail-inline-input:focus {
  border-color: var(--border-medium);
}

/* Layout only \u2014 .date-field owns the frame, padding and glyph, the same rule
   .todo-select.select-field follows. Never restate the border here. */
.todo-detail-inline-date {
  min-width: 0;
  max-width: 150px;
  min-height: 26px;
  font-size: var(--small-font-size);
}

/* URL and linked-file controls share the same computed frame dimensions. */
.todo-detail-url {
  flex: 1;
  width: 100%;
}

/* Location: the query field, its two actions, and the geocoder's hits below.
   The hit list is inline rather than a portaled popover on purpose \u2014 it lives
   inside a modal that already scrolls, and an anchored layer would have to
   track that scroll for no gain. */
.todo-location {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.todo-location-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.todo-location-input {
  flex: 1;
  min-width: 0;
}

.todo-location-hits {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius);
  background: var(--container-color);
}

.todo-location-hit {
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  padding: 5px var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}

.todo-location-hit:hover {
  background: var(--hover-bg);
}

.todo-location-hit-context {
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}

/* The row's inline location, beside the date on the meta line. It shares the
   plain-text reset above \u2014 as a button it otherwise kept the default surface,
   which drew the one chip on a line the whole design says has none. */
.todo-location-meta {
  gap: 3px;
  cursor: pointer;
}

.todo-location-meta:hover {
  text-decoration: underline;
}

.todo-location-meta svg {
  width: 11px;
  height: 11px;
}

/* One row per link: the link itself takes the space, its remove sits at the end
   \u2014 the attachment list's shape, so the two blocks read as one pattern. */
.todo-detail-url-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.todo-detail-url-open {
  flex: 1;
  min-width: 0;
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-detail-hint {
  margin: 0;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  line-height: 1.4;
}

.todo-detail-add {
  display: flex;
  align-items: center;
  gap: 5px;
  align-self: flex-start;
  padding: 4px var(--space-2);
  border: 1px dashed var(--border-medium);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
}

.todo-detail-add:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

/* \u2500\u2500 Attachment cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The one place a box is right: an attachment is a discrete object, not a row
   of text. Generous radius, a raised fill, name over "Kind \xB7 Size", thumbnail
   on the right behind a round disclosure. */
.todo-attach-card {
  position: relative;
  display: flex;
  align-items: stretch;
}

.todo-attach-open {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: 14px;
  background: var(--surface-color-alt);
  color: var(--text-color);
  font-family: var(--interface-font);
  text-align: left;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.todo-attach-open:hover {
  background: var(--hover-bg);
}

.todo-attach-copy {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}

.todo-attach-name {
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-bold, 700);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.todo-attach-meta {
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
}

.todo-attach-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
  background: transparent;
  color: var(--text-tertiary);
  font-size:1.125rem;
}

.todo-attach-open:hover .todo-attach-thumb { color: var(--text-secondary); }

.todo-attach-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Revealed on hover so a resting list of attachments is just the cards. */
.todo-attach-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid var(--border-medium);
  border-radius: 50%;
  background: var(--container-color);
  color: var(--text-tertiary);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.todo-attach-card:hover .todo-attach-remove,
.todo-attach-remove:focus-visible {
  opacity: 1;
}

.todo-attach-remove:hover {
  color: var(--negative-color);
  border-color: var(--negative-color);
}

.todo-attach-remove svg {
  width: 12px;
  height: 12px;
}

/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The five smart lists, then the groups behind a disclosure. Replaces the
   horizontal chip bar, which asked "which list" and "which due window" as one
   question with one answer and cost up to three wrapped rows of chrome above
   the first todo at 245px. A column has room for counts and cannot wrap.

   Ported from the Contacts panel (contacts/src/styles.ts) \u2014 copied, never
   imported: a plugin may not reach into another plugin, and the two panels
   looking alike is the point. */

.todo-tree-search {
  width: auto;
  flex: none;
  margin: var(--space-2) var(--space-1);
}

.todo-tree {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
  padding: 2px 5px 8px;
}

.todo-smart-strip {
  display: flex;
  flex-direction: row;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px;
  scrollbar-width: none;
}
.todo-smart-strip::-webkit-scrollbar { display: none; }

.todo-active-navigation {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 2px 7px 12px;
}

.todo-smart-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7px;
}

.todo-smart-grid .todo-smart-chip {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  grid-template-rows: 28px auto;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 8px 9px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--surface-color-alt);
}

.todo-smart-grid .todo-tree-icon {
  grid-column: 1;
  grid-row: 1;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--todo-chip-color, var(--text-tertiary));
  color: var(--todo-chip-on, var(--title-color));
}

.todo-smart-grid .todo-tree-icon svg { width: 16px; height: 16px; }

.todo-smart-grid .todo-tree-count {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-weight: var(--font-semibold);
}

.todo-smart-grid .todo-tree-label {
  grid-column: 1 / -1;
  grid-row: 2;
  color: inherit;
  font-size: var(--normal-font-size);
  font-weight: var(--font-semibold);
  line-height: 1.15;
}

.todo-navigation-groups {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 18px;
}

.todo-navigation-groups-title {
  padding: 0 7px 6px;
  color: var(--text-tertiary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semibold);
}

.todo-navigation-groups .todo-tree-row {
  min-height: 34px;
  padding-inline: 7px;
}

.todo-tree-group {
  display: flex;
  flex-direction: column;
}

.todo-tree-row {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}

/* Both chip strips take the pill geometry of .todo-due-chip, so a selectable
   tag reads the same everywhere in this plugin. */
.todo-smart-chip,
.todo-smart-chip .todo-tree-label {
  flex: 0 1 auto;
  max-width: none;
}
.todo-smart-chip {
  width: auto;
  flex: 0 0 auto;
  background: var(--surface-color-alt);
  font-weight: var(--font-regular);
  line-height: 1;
}

/* Each smart list carries its own colour as --todo-chip-color, set inline from
   SMART_LISTS. Idle only tints the icon; selected fills the pill, which is what
   makes five lists distinguishable at a glance instead of five identical blue
   chips. --todo-chip-on is the palette's paired foreground: Flagged is yellow
   and All is grey, and one fixed text colour cannot stay legible on both. */
.todo-smart-strip .todo-smart-chip .todo-tree-icon {
  color: var(--todo-chip-color, var(--text-tertiary));
}

.todo-tree-row:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

/* Declared after :hover on purpose \u2014 the selected list keeps its tint while
   the pointer is over it, rather than reverting to grey. */
.todo-tree-row.active {
  background: var(--accent-tint-bg);
  color: var(--accent-color);
  font-weight: var(--font-medium);
}

.todo-smart-chip.active {
  background: var(--todo-chip-color, var(--accent-color));
  border-color: var(--todo-chip-color, var(--accent-color));
  color: var(--todo-chip-on, var(--title-color));
  font-weight: var(--font-regular);
}

.todo-calendar-selection-chip {
  max-width: 100%;
}

.todo-chip-clear {
  display: grid;
  place-items: center;
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
}

.todo-chip-clear svg {
  width: 12px;
  height: 12px;
}

.todo-status-chip .todo-chip-clear {
  width: 16px;
  height: 16px;
  margin-left: auto;
  flex-basis: 16px;
}

.todo-status-chip .todo-chip-clear svg {
  width: 16px;
  height: 16px;
}

.todo-smart-chip.active .todo-tree-icon,
.todo-smart-chip.active .todo-tree-count {
  color: inherit;
}

.todo-smart-grid .todo-smart-chip.active .todo-tree-icon {
  background: var(--todo-chip-on, var(--title-color));
  color: var(--todo-chip-color, var(--accent-color));
}

.todo-tree-row:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.todo-tree-icon {
  display: grid;
  place-items: center;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  font-size:0.9375rem;
  line-height: 0;
  color: var(--text-tertiary);
}

.todo-tree-row.active .todo-tree-icon {
  color: inherit;
}

.todo-tree-dot {
  width: 8px;
  height: 8px;
  margin: 0 3px;
  border-radius: 50%;
  flex-shrink: 0;
}

.todo-tree-label {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.todo-tree-count {
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
}

.todo-tree-row.active .todo-tree-count {
  color: inherit;
}

.todo-tree-disclosure {
  margin-top: var(--space-1);
  color: var(--text-tertiary);
}

.todo-tree-disclosure .todo-tree-label {
  font-weight: var(--font-medium);
}

.todo-tree-chevron {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin-left: auto;
  flex-shrink: 0;
  color: var(--text-tertiary);
  transition: transform var(--duration-fast) var(--ease-out);
}

.todo-tree-chevron.open {
  transform: rotate(90deg);
}

.todo-tree-chevron svg {
  width: 13px;
  height: 13px;
}

.todo-tree-groups {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 1px 0 5px;
}

/* \u2500\u2500 Group editor popovers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-group-popover {
  width: 300px;
  max-width: 92vw;
}

.todo-group-editor {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* .todo-detail-head is built around a flex:1 title *input*; a plain label has no
   flex of its own, so the close button crowds it instead of sitting far right. */
.todo-group-editor .todo-detail-head {
  align-items: center;
}

.todo-group-editor .todo-detail-head > .todo-detail-group-label {
  flex: 1;
  min-width: 0;
}

.todo-group-name-input {
  width: 100%;
  min-width: 0;
}

.todo-group-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* 245px is the narrowest sidebar, so every row wraps rather than pushing the
   card past the panel edge. */
.todo-group-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  min-width: 0;
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--border-light);
}

/* A row that comes from Preferences is shared with every other plugin \u2014 the tag
   says so, because editing it changes the group everywhere. */
.todo-group-scope {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}

.todo-group-row .todo-group-name-input {
  flex: 1;
  min-width: 90px;
  width: auto;
}

.todo-group-confirm {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.todo-group-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

/* Non-destructive dialog buttons. .todo-confirm-yes paints --negative-color and
   belongs to the delete confirmation only. (No backticks in this file: the whole
   stylesheet is one JS template literal.) */
.todo-group-btn {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--space-3);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--smaller-font-size);
  cursor: pointer;
}

.todo-group-btn:hover {
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-group-btn--primary {
  border-color: var(--accent-color);
  background: var(--accent-color);
  color: #fff;
}

.todo-group-btn--primary:hover {
  background: var(--accent-color);
  color: #fff;
  opacity: 0.9;
}

.todo-group-error {
  margin: var(--space-1) 0 0;
  color: var(--negative-color);
  font-size: var(--smaller-font-size);
}

/* \u2500\u2500 Configurable statuses and filter surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-status-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-smart-list-settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-smart-list-setting-row {
  position: relative;
  display: grid;
  grid-template-columns: 24px 24px minmax(0, 1fr) 30px;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 3px var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color);
}

.todo-smart-list-setting-glyph {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  color: var(--text-secondary);
}

.todo-smart-list-setting-glyph svg { width: 16px; height: 16px; }

.todo-smart-list-setting-row.drop-before::before,
.todo-smart-list-setting-row.drop-after::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: var(--drop-knob);
  margin-top: var(--drop-indicator-inset);
  margin-bottom: var(--drop-indicator-inset);
  background: var(--drop-indicator-fill);
  pointer-events: none;
}

.todo-smart-list-setting-row.drop-before::before { top: 0; }
.todo-smart-list-setting-row.drop-after::before { bottom: 0; }

.todo-smart-list-hidden {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.todo-smart-list-hidden-title {
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.todo-smart-list-hidden-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 3px var(--space-2);
  border-radius: var(--radius);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
}

.todo-status-settings-desc {
  margin: 0 0 var(--space-1);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
}

.todo-status-visibility-title {
  margin-top: var(--space-1);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
}

.todo-status-visibility-zone {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-height: 34px;
  border-radius: var(--radius);
}

.todo-status-visibility-zone.accepts-drop {
  outline: 1px solid var(--accent-color);
  outline-offset: 3px;
}

.todo-status-visibility-empty {
  display: flex;
  align-items: center;
  min-height: 34px;
  padding: 0 var(--space-2);
  color: var(--text-tertiary);
  font-size: var(--small-font-size);
}

.todo-date-breakdown-select { width: 150px; }

.todo-status-setting-row {
  position: relative;
  display: grid;
  grid-template-columns: 24px 22px minmax(0, 1fr) 34px 28px;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 3px var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color);
}

.todo-status-setting-row.locked {
  background: var(--surface-color-alt);
}

.todo-status-setting-handle,
.todo-status-setting-glyph,
.todo-status-setting-action {
  display: grid;
  place-items: center;
}

button.todo-status-setting-handle {
  width: 24px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: grab;
}

button.todo-status-setting-handle:active { cursor: grabbing; }
.todo-status-setting-handle svg { width: 16px; height: 16px; }
.todo-status-setting-row.locked .todo-status-setting-handle { color: var(--text-tertiary); }
.todo-status-setting-glyph { width: 22px; height: 22px; }
.todo-status-setting-glyph svg { width: 16px; height: 16px; }
.todo-status-setting-name { min-width: 0; color: var(--text-color); }

.todo-status-setting-row.drop-before::before,
.todo-status-setting-row.drop-after::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: var(--drop-knob);
  margin-top: var(--drop-indicator-inset);
  margin-bottom: var(--drop-indicator-inset);
  background: var(--drop-indicator-fill);
  pointer-events: none;
}
.todo-status-setting-row.drop-before::before { top: 0; }
.todo-status-setting-row.drop-after::before { bottom: 0; }

.todo-filter-popover {
  width: 264px;
  padding: var(--space-2);
}

.todo-sort-popover {
  width: 240px;
  padding: var(--space-2);
}

.todo-sort-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-1);
}

.todo-sort-option {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  height: 30px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
}

.todo-sort-option:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

.todo-sort-option.active {
  border-color: var(--border-medium);
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-sort-option svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.todo-sort-directions {
  display: flex;
  gap: var(--space-1);
}

.todo-sort-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  color: var(--text-color);
  font-size: var(--small-font-size);
}

.todo-sort-direction {
  display: grid;
  place-items: center;
  width: 28px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  cursor: pointer;
}

.todo-sort-direction:hover,
.todo-sort-direction.active {
  border-color: var(--border-medium);
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-sort-direction svg {
  width: 14px;
  height: 14px;
}

.todo-completed-choices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-1);
  width: 100%;
}

.todo-completed-row {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: var(--space-1);
  min-height: 30px;
  color: var(--text-color);
  font-size: var(--small-font-size);
}

.todo-completed-choice {
  min-width: 0;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  white-space: nowrap;
  cursor: pointer;
}

.todo-completed-choice:hover,
.todo-completed-choice.active {
  border-color: var(--border-medium);
  background: var(--hover-bg);
  color: var(--title-color);
}

.todo-filter-popover-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.todo-filter-control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 30px;
  color: var(--text-color);
  font-size: var(--small-font-size);
}

.todo-filter-control-row.status {
  align-items: stretch;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-filter-divider {
  height: 1px;
  background: var(--border-light);
}

.todo-filter-direction,
.todo-status-filter-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  min-width: 0;
  height: 28px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--control-bg);
  color: var(--text-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  cursor: pointer;
}

.todo-status-filter-select svg { width: 13px; height: 13px; flex-shrink: 0; }
.todo-filter-direction:hover,
.todo-status-filter-select:hover { background: var(--hover-bg); }
.todo-page-toolbar .todo-status-filter-select { min-width: 112px; }

.todo-status-filter-popover {
  width: 224px;
  padding: var(--space-1);
}

.todo-status-filter-menu {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.todo-status-filter-option {
  display: grid;
  grid-template-columns: 16px 18px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  min-height: 30px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}

.todo-status-filter-option.all { grid-template-columns: 16px minmax(0, 1fr); }
.todo-status-filter-option:hover { background: var(--hover-bg); }
.todo-status-filter-check { color: var(--accent-color); font-weight: var(--font-semi-bold); }
.todo-status-filter-glyph { display: grid; place-items: center; }
.todo-status-filter-glyph svg { width: 14px; height: 14px; }

@media (max-width: 760px) {
  .todo-status-setting-row { grid-template-columns: 24px 22px minmax(0, 1fr) 34px 28px; }
}

/* \u2500\u2500 Tasks in this note (right sidebar) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   A separate surface from the todo list: these rows describe lines in a file,
   so they carry no due date, no priority and no \u24D8 \u2014 there is nothing to edit
   here that the editor does not do better. */

.note-tasks-count {
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
}

.note-task-row {
  cursor: default;
}

.note-task-row:hover {
  background: transparent;
}

/* Header group filter. The popover remains open while rows toggle so
   several groups can be selected in one visit. */
.todo-groups-popover {
  width: min(244px, calc(100vw - 16px));
  padding: var(--space-1);
  border-color: var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--container-color);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
}
.todo-group-filter-popover { display: flex; flex-direction: column; }
.todo-group-filter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  padding: 0 var(--space-2) var(--space-1);
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
}
.todo-group-filter-title {
  padding: 2px 4px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--accent-color);
  font: inherit;
  font-weight: var(--font-semi-bold);
  cursor: pointer;
}
.todo-group-filter-title:hover { background: var(--hover-bg); }
.todo-group-filter-all {
  padding: 2px 4px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  font: inherit;
  font-size: var(--smaller-font-size);
  cursor: pointer;
}
.todo-group-filter-all:hover { background: var(--hover-bg); color: var(--title-color); }
.todo-group-filter-list {
  display: flex;
  flex-direction: column;
  padding-top: var(--space-1);
  overflow-y: auto;
}
.todo-group-filter-row {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  min-height: 28px;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-group-filter-row:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-group-filter-row.active {
  border-radius: 0;
  background: var(--hover-bg);
  color: var(--title-color);
}
.todo-group-filter-row.active.selection-run-start {
  border-top-left-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
}
.todo-group-filter-row.active.selection-run-end {
  border-bottom-right-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}
.todo-group-filter-row.active:hover {
  background: color-mix(in srgb, var(--title-color) 14%, transparent);
}
.todo-group-filter-row.active:has(+ .todo-group-filter-row:hover),
.todo-group-filter-row:hover:has(+ .todo-group-filter-row.active) {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.todo-group-filter-row.active + .todo-group-filter-row:hover,
.todo-group-filter-row:hover + .todo-group-filter-row.active {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.todo-group-filter-check {
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: var(--font-semi-bold);
}
.todo-group-filter-row .todo-tree-count { color: var(--text-tertiary); }
.todo-group-filter-row .todo-tree-dot.no-group { background: var(--text-tertiary); }

.todo-group-filter-item + .todo-group-filter-item {
  border-top: 1px solid var(--border-light);
}
.todo-group-filter-item > .props-info-row {
  align-items: center;
}

.todo-status-groups {
  margin-top: var(--space-2);
  border-top: 1px solid var(--border-light);
}
.todo-status-group + .todo-status-group {
  border-top: 1px solid var(--border-light);
}
.todo-status-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  width: 100%;
  min-height: 32px;
  padding: 4px var(--space-3);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--smaller-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-status-group-header:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}
.todo-status-group-name,
.todo-status-group-meta {
  display: flex;
  align-items: center;
}
.todo-status-group-name {
  min-width: 0;
}
.todo-status-group-meta {
  gap: var(--space-1);
  flex: 0 0 auto;
  color: var(--text-color);
  font-variant-numeric: tabular-nums;
}
.todo-status-group-meta svg {
  width: 13px;
  height: 13px;
  color: var(--text-tertiary);
  transform: rotate(-90deg);
  transition: transform 0.12s ease;
}
.todo-status-group.expanded .todo-status-group-meta svg {
  transform: none;
}
.todo-group-status-breakdown {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 1px var(--space-3) 8px;
}
.todo-group-status-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  min-width: 0;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}
.todo-group-status-row > span:first-child {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-group-status-row > span:last-child {
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

/* Date organization shared by both narrow panels. */
.todo-panel-date-sections {
  display: flex;
  flex-direction: column;
}
.todo-list:has(> .todo-panel-date-sections) { padding-top: 0; }
.todo-panel-date-section { min-width: 0; }
.todo-panel-date-head {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 6px 10px 5px;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  background: var(--body-color);
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.todo-panel-date-section:first-child .todo-panel-date-head { border-top: none; }

/* Distinct compact URL cards: smaller than attachments, but equally tangible. */
.todo-linked-file-control {
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
}
.todo-detail-url-card {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 34px;
  border-radius: var(--radius-sm);
  background: var(--surface-color-alt);
}
.todo-detail-url-card:hover { background: var(--hover-bg); }
.todo-detail-url-open {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
  min-width: 0;
  padding: 7px 32px 7px 9px;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-detail-url-open svg { width: 14px; height: 14px; flex-shrink: 0; color: var(--text-tertiary); }
.todo-detail-url-open span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-detail-url-remove {
  position: absolute;
  right: 6px;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-detail-url-remove:hover { background: var(--container-color); color: var(--negative-color); }
.todo-detail-url-remove svg { width: 12px; height: 12px; }

.todo-activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.todo-activity-list li { display: flex; flex-direction: column; gap: 2px; color: var(--text-color); font-size: var(--small-font-size); }
.todo-activity-list time { color: var(--text-tertiary); font-size: var(--smaller-font-size); }

.todo-detail-row-end .time-field { max-width: 126px; }

.todo-detail-footer { display:flex; gap:var(--space-2); margin-top:var(--space-3); }
`,$r="notes-todo-styles";function jn(){let e=document.getElementById($r);return e||(e=document.createElement("style"),e.id=$r,document.head.appendChild(e)),e.textContent=od,()=>{document.getElementById($r)===e&&e.remove()}}function De(e,o=""){return typeof e=="string"?e:o}function Mo(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kr(e){let o=De(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(o)?o:void 0}function Bn(e){let o=De(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(o)?o:void 0}var rd=16384,nd=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function ad(e){if(!e||e.length>rd||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let o=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(o),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function id(e){try{let o=new URL(e);if(o.protocol!==`${Ln}:`||o.hostname!==Pn)return null;let r=_r(o.searchParams.get("file"));if(r)return{kind:"file",relPath:r};let n=o.searchParams.get("plugin")??"";if(!nd.test(n))return null;let a=ad(o.searchParams.get("state")??""),i=o.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let s=o.searchParams.get("instance");return s&&s.length>512?null:a?{kind:"plugin",pluginId:n,state:a,...i?{surface:i}:{},...s?{instanceId:s}:{}}:null}catch{return null}}function _t(e){let o=id(e);return o?.kind==="file"?o.relPath:null}function qn(e){try{return Mn.includes(new URL(e).protocol)}catch{return!1}}var M="#12120f",L="#ffffff",Vr=[{id:"green",family:"semantic",labelKey:"color.green",light:"#247a52",reading:"#667a46",dark:"#65e6ad",onLight:L,onReading:L,onDark:M},{id:"red",family:"semantic",labelKey:"color.red",light:"#c93445",reading:"#a65a4a",dark:"#ff6b7a",onLight:L,onReading:L,onDark:M},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#a85e00",reading:"#8c5900",dark:"#ffc45c",onLight:L,onReading:L,onDark:M},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",reading:"#2c69a3",dark:"#90cfff",onLight:L,onReading:L,onDark:M},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#9b9000",reading:"#8a8215",dark:"#f2e664",onLight:M,onReading:M,onDark:M},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",reading:"#9b4801",dark:"#fc8c50",onLight:L,onReading:L,onDark:M},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",reading:"#7a4c97",dark:"#c095fc",onLight:L,onReading:L,onDark:M},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c33e78",reading:"#a85068",dark:"#ff9ec4",onLight:L,onReading:L,onDark:M},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",reading:"#6d4619",dark:"#c7925c",onLight:L,onReading:L,onDark:M},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",reading:"#1c1712",dark:"#3a3a3c",onLight:L,onReading:L,onDark:L},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",reading:"#fdf8ee",dark:"#f4f4f6",onLight:M,onReading:M,onDark:M},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",reading:"#736e66",dark:"#c3cbd5",onLight:L,onReading:L,onDark:M},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",reading:"#76397c",dark:"#c17fde",onLight:L,onReading:L,onDark:M},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",reading:"#008282",dark:"#68dfed",onLight:M,onReading:L,onDark:M},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",reading:"#983f6c",dark:"#ec7bc0",onLight:L,onReading:L,onDark:M},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",reading:"#583f94",dark:"#9b97f7",onLight:L,onReading:L,onDark:M},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",reading:"#4f6148",dark:"#99ccaa",onLight:L,onReading:L,onDark:M},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",reading:"#8b5b4f",dark:"#e4a197",onLight:L,onReading:L,onDark:M},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",reading:"#7a6b3a",dark:"#ddce93",onLight:M,onReading:L,onDark:M},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",reading:"#5f7390",dark:"#84acd6",onLight:M,onReading:L,onDark:M},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",reading:"#7a5d80",dark:"#c7aade",onLight:L,onReading:L,onDark:M},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",reading:"#4b5fb0",dark:"#90b7ff",onLight:L,onReading:L,onDark:M},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",reading:"#006b55",dark:"#5dcdbf",onLight:L,onReading:L,onDark:M},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",reading:"#94711f",dark:"#d8b262",onLight:L,onReading:L,onDark:M},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",reading:"#762843",dark:"#dd7aa1",onLight:L,onReading:L,onDark:M},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",reading:"#661e1b",dark:"#e66d71",onLight:L,onReading:L,onDark:M},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",reading:"#ba6742",dark:"#ffad90",onLight:M,onReading:M,onDark:M},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",reading:"#967b5a",dark:"#f2d6b1",onLight:M,onReading:M,onDark:M},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",reading:"#63611b",dark:"#b0be60",onLight:L,onReading:L,onDark:M},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",reading:"#597f27",dark:"#a8eb7a",onLight:M,onReading:L,onDark:M},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",reading:"#355828",dark:"#6caa71",onLight:L,onReading:L,onDark:M},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#2d9e87",reading:"#438e71",dark:"#a4f0dc",onLight:M,onReading:M,onDark:M},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",reading:"#4985b1",dark:"#aae0ff",onLight:M,onReading:M,onDark:M},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",reading:"#333c77",dark:"#6f92e5",onLight:L,onReading:L,onDark:M},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",reading:"#9a5a90",dark:"#f1a6ee",onLight:L,onReading:L,onDark:M},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",reading:"#4e586b",dark:"#aab9cc",onLight:L,onReading:L,onDark:M}],sd=["semantic","muted","accent","categorical"];var op=new Map(Vr.map(e=>[e.id,e])),dd={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},ld=new Map(Vr.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,o=>o.toUpperCase())])),cd=/^[a-z][a-z0-9-]{0,47}$/,ud={version:4,families:sd.map(e=>({id:e,name:dd[e]})),colors:Vr.map(e=>({id:e.id,familyId:e.family,name:ld.get(e.id)??e.id,light:e.light,reading:e.reading,dark:e.dark})),archived:[]},pd=e=>({version:4,families:e.families.map(o=>({...o})),colors:e.colors.map(o=>({...o})),archived:e.archived.map(o=>({...o}))});var fd=pd(ud);function Wn(){return fd}var Rr=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Oo="palette:",md=/^#[0-9a-f]{6}$/i;function _o(e){return e.startsWith(Oo)&&cd.test(e.slice(Oo.length))}function be(e){return`${Oo}${e}`}function oo(e){return _o(e)?e.slice(Oo.length):void 0}function Yn(e){if(typeof e!="string")return;let o=e.trim();return _o(o)?o:md.test(o)?o.toLowerCase():void 0}function Ae(e){let o=oo(e);return o?`var(--color-${o})`:e}function Xn(e){let o=oo(e);return o?`var(--color-${o}-on)`:"var(--title-color)"}function Zn(e){let o=new Set(e.map(r=>oo(r)??r.toLowerCase()));return be(Rr.find(r=>!o.has(r))??Rr[0])}function Jn(e){let o=0;for(let n=0;n<e.length;n+=1)o=o*31+e.charCodeAt(n)|0;let r=Rr;return be(r[Math.abs(o)%r.length])}function Q(e){return e.trim().toLowerCase()}function gd(e,o,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=Q(i);!s||s===Q(o)||r.has(s)||(r.add(s),n.push(i))}return n}function Qn(e){return`group_${Q(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function ro(e){if(!Array.isArray(e))return[];let o=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=Q(i);if(!i||r.has(s))continue;r.add(s);let l=typeof a.id=="string"&&a.id.trim()?a.id.trim():Qn(i),u=Yn(a.color)??Zn(o.map(f=>f.color)),p=gd(a.aliases,i,r);o.push({id:l,name:i,color:u,...p.length?{aliases:p}:{}})}return o}function no(e,o){let r=Q(o??"");if(r)return e.find(n=>Q(n.name)===r||(n.aliases??[]).some(a=>Q(a)===r))}function Fo(e,o){return no(o,e)?.name}function Pe(e,o){let r=Q(e??"");return r?no(o,e)?.color??Jn(r):be("primary-blue")}function Hr(e){let o={};for(let r of e){let n=Q(r??"");n&&(o[n]=(o[n]??0)+1)}return o}var ea={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0a8adac9d6d5":"Schedule","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.1d41bafdd3cb":"To-Do: Add a subtask","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.73d64a823b7d":"Add tag\u2026","auto.76411cef59a3":"To-Do: Complete a subtask","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, nested subtasks, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.parentId":"Parent task","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Reorder the To-Do navigation or hide lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are fixed but can be recolored. Reorder or recolor optional statuses, and drag them between Show and Hide.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.tree.indent":"Indent","todo.tree.noParent":"No parent task","todo.tree.outdent":"Outdent","todo.tree.subtaskOf":"Subtask of","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show"};var ta={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0a8adac9d6d5":"Zeitplan","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.1d41bafdd3cb":"To-Do: Eine Teilaufgabe hinzuf\xFCgen","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.76411cef59a3":"To-Do: Eine Teilaufgabe erledigen","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"Aufgaben: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.parentId":"\xDCbergeordnete Aufgabe","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Ordne die To-Do-Navigation neu oder blende nicht verwendete Listen aus.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind fixiert, k\xF6nnen aber eingef\xE4rbt werden. Optionale Status k\xF6nnen neu angeordnet, eingef\xE4rbt und zwischen Einblenden und Ausblenden verschoben werden.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.tree.indent":"Einr\xFCcken","todo.tree.noParent":"Keine \xFCbergeordnete Aufgabe","todo.tree.outdent":"Ausr\xFCcken","todo.tree.subtaskOf":"Teilaufgabe von","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden"};var oa={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0a8adac9d6d5":"Horario","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.1d41bafdd3cb":"To-Do: agregar una subtarea","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.76411cef59a3":"To-Do: completar una subtarea","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"Tareas: Editar campos de la tarea","todo.command.get":"Tareas: Obtener tarea","todo.command.openTask":"Tareas: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.parentId":"Tarea principal","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Reordena la navegaci\xF3n de tareas u oculta las listas que no utilices.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado son fijos, pero sus colores se pueden cambiar. Reordena o cambia el color de los estados opcionales y arr\xE1stralos entre Mostrar y Ocultar.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.tree.indent":"Aumentar sangr\xEDa","todo.tree.noParent":"Sin tarea principal","todo.tree.outdent":"Reducir sangr\xEDa","todo.tree.subtaskOf":"Subtarea de","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar"};var ra={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0a8adac9d6d5":"Horaire","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.1d41bafdd3cb":"To-Do: Ajouter une sous-t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.76411cef59a3":"To-Do: terminer une sous-t\xE2che","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"T\xE2ches : Modifier les champs d\u2019une t\xE2che","todo.command.get":"T\xE2ches : Lire une t\xE2che","todo.command.openTask":"T\xE2ches : Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.parentId":"T\xE2che parente","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"R\xE9ordonnez la navigation To-Do ou masquez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont fixes, mais leur couleur reste modifiable. R\xE9ordonnez ou recolorez les statuts facultatifs et faites-les glisser entre Afficher et Masquer.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.tree.indent":"Indenter","todo.tree.noParent":"Aucune t\xE2che parente","todo.tree.outdent":"D\xE9sindenter","todo.tree.subtaskOf":"Sous-t\xE2che de","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB\xA0{{title}}\xA0\xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher"};var na={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0a8adac9d6d5":"\u65F6\u95F4\u8868","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.1d41bafdd3cb":"To-Do\uFF1A\u6DFB\u52A0\u5B50\u4EFB\u52A1","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.76411cef59a3":"To-Do\uFF1A\u5B8C\u6210\u5B50\u4EFB\u52A1","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.parentId":"\u7236\u4EFB\u52A1","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u91CD\u65B0\u6392\u5E8F\u5F85\u529E\u5BFC\u822A\u6216\u9690\u85CF\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u72B6\u6001\u56FA\u5B9A\u542F\u7528\uFF0C\u4F46\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3002\u53EF\u91CD\u65B0\u6392\u5E8F\u6216\u66F4\u6539\u53EF\u9009\u72B6\u6001\u7684\u989C\u8272\uFF0C\u5E76\u5728\u663E\u793A\u548C\u9690\u85CF\u4E4B\u95F4\u62D6\u52A8\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.tree.indent":"\u589E\u52A0\u7F29\u8FDB","todo.tree.noParent":"\u65E0\u4E0A\u7EA7\u4EFB\u52A1","todo.tree.outdent":"\u51CF\u5C11\u7F29\u8FDB","todo.tree.subtaskOf":"\u5B50\u4EFB\u52A1\u5F52\u5C5E","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A"};var aa={en:ea,de:ta,es:oa,fr:ra,"zh-CN":na};function ia(e,o){return(aa.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(o?.[a]??""))}var sa=ia;function da(e){e.ui.registerCatalogs(aa),sa=(o,r)=>{let n=e.ui.t(o,r);return n===o?ia(o,r):n}}function d(e,o){return sa(e,o)}var xd={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Td={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},kd={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"};function it(e,o=""){if(e===null||e==="open")return d("todo.status.todo");let r=xd[e];return r?d(r):o||e}function la(e){return d(Td[e])}function ca(e){return d(kd[e])}var ua="statuses",Qe=[{id:"open",labelKey:"todo.status.todo",color:be("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:be("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:be("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:be("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:be("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:be("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:be("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:be("red"),done:!0,cls:"todo-st-canceled",locked:!1}],Ur=Qe,pa=Qe.map(e=>e.id),ao=Qe.filter(e=>!e.locked).map(e=>e.id),wt=Qe.filter(e=>e.done).map(e=>e.id),fa=new Map(Qe.map(e=>[e.id,e])),Sd=new Set(ao);function Dd(e){if(typeof e!="string"||!_o(e))return!1;let o=oo(e);if(!o)return!1;let r=Wn();return r.colors.some(n=>n.id===o)||r.archived.some(n=>n.id===o)}function ma(e){let o=e&&typeof e=="object"?e:{},r=Array.isArray(o.active)?o.active:ao,n=[];for(let s of r)typeof s!="string"||!Sd.has(s)||n.includes(s)||n.push(s);let a=o.colors&&typeof o.colors=="object"?o.colors:{},i=Object.fromEntries(pa.map(s=>{let l=fa.get(s).color;return[s,Dd(a[s])?a[s]:l]}));return{active:n,colors:i}}function Ft(){return ma(m?.settings.get()[ua])}function ga(e){m.settings.set(ua,ma(e))}function Me(e){let o=e&&fa.get(e)||Qe[0];return{...o,color:Ft().colors[o.id]}}function zo(){let e=Ft();return[Qe[0],Qe[1],...e.active.map(o=>Me(o))]}function st(){return zo().map(e=>e.id)}function ha(e){return e==="open"||e==="completed"||Ft().active.includes(e)}function dt(){let[e,o]=t.useState(zo);return t.useEffect(()=>m.settings.subscribe(()=>o(zo())),[]),e}function zt(e,o=st()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=o.filter(a=>r.includes(a));return n.length?n:"all"}function Gt(e,o){return o==="all"||o.includes(Ee(e))}function $t(e){if(typeof e=="string")return pa.includes(e)?e:void 0}function Ee(e){return e.status??(e.completed?"completed":"open")}function Ce(e){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:wt.includes(e),status:e}}function Kt(){return zo().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,cls:e.cls}))}function Ad(){return Qe.map(e=>{let o=Me(e.id),r=Ae(o.color);return`.${o.cls}{color:${r}}.todo-detail-field[data-status="${o.id}"] .select-field-value{color:${r}}`}).join("")}function ba(){let e="notes-todo-status-palette",o=document.getElementById(e);o||(o=document.createElement("style"),o.id=e,document.head.appendChild(o)),o.dataset.todoStatusPalette="true";let r=()=>{o.textContent=Ad()};r();let n=m.settings.subscribe(r);return()=>{n(),document.getElementById(e)===o&&o.remove()}}var io="todo.tasks",$o="todo.task_tags",Ko="todo.task_links",Ro="todo.task_attachments",Vo="todo.focus_sessions",Ho="todo.status_history",jr=[io,$o,Ko,Ro],va=[...jr,Vo,Ho];function lt(e){let o=va.map(r=>m.data.dataset(r).subscribe(e));return()=>o.forEach(r=>r())}function wa(e){let o=jr.map(r=>m.data.dataset(r).subscribe(e));return()=>o.forEach(r=>r())}var Ed=["normal","low","medium","high"];function ya(e){return e===!0}function Cd(e){return typeof e=="string"&&Ed.includes(e)?e:"normal"}function Go(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Nd(e){return Array.isArray(e)?e.filter(o=>Mo(o)).map(o=>({startedAt:De(o.startedAt),endedAt:De(o.endedAt),activeMinutes:Go(o.activeMinutes)??0,pauseMinutes:Go(o.pauseMinutes)??0})).filter(o=>o.startedAt&&o.endedAt):[]}function Id(e){return Array.isArray(e)?e.filter(o=>Mo(o)).map(o=>({from:$t(o.from),to:$t(o.to),changedAt:De(o.changedAt)})).filter(o=>!!o.from&&!!o.to&&!!o.changedAt&&o.from!==o.to):[]}function Ld(e){if(typeof e!="string")return;let o=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(o)?o:void 0}function Br(e){if(typeof e!="string")return;let o=e.trim();if(o)return _t(o)||qn(o)?o:void 0}function xa(e){let o=Array.isArray(e)?e:[],r=[...new Set(o.map(n=>Br(n)).filter(n=>!!n))];return r.length?r:void 0}function Ta(e){if(!Array.isArray(e))return;let o=[...new Set(e.map(r=>nt(r)).filter(r=>!!r))];return o.length?o:void 0}function Pd(e){if(!Mo(e))return;let o=De(e.name).trim();if(!o)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:o,lng:r,lat:n}:{name:o}}function Uo(e){let o=new Date().toISOString(),r=De(e.id,`todo_${Date.now().toString(36)}`),n=De(e.createdAt,o),a=Nd(e.history),i=Id(e.statusHistory),s=$t(e.status);return{id:r,title:De(e.title).trim(),completed:ya(e.completed)||s==="completed"||s==="canceled",priority:Cd(e.priority),dueDate:De(e.dueDate),startTime:Kr(e.startTime),endTime:Kr(e.endTime),color:Bn(e.color),note:De(e.note),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],estimatedMinutes:Go(e.estimatedMinutes),actualMinutes:Go(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:nt(e.filePath),group:De(e.group).trim()||void 0,flagged:ya(e.flagged)||void 0,parentId:(()=>{let l=De(e.parentId).trim();return l&&l!==r?l:void 0})(),urls:xa(e.urls),attachments:Ta(e.attachments),location:Pd(e.location),remindAt:Ld(e.remindAt),reminderFiredAt:De(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:De(e.updatedAt,n)}}function ka(e){return{...e,filePath:nt(e.filePath),urls:xa(e.urls),attachments:Ta(e.attachments)}}function Sa(e){return{id:e.id,title:e.title,completed:e.completed,priority:e.priority,dueDate:e.dueDate,startTime:e.startTime??null,endTime:e.endTime??null,color:e.color??null,note:e.note,estimatedMinutes:e.estimatedMinutes??null,actualMinutes:e.actualMinutes??null,status:e.status??null,filePath:e.filePath??null,group:e.group??null,flagged:e.flagged??null,parentId:e.parentId??null,location:e.location??null,remindAt:e.remindAt??null,reminderFiredAt:e.reminderFiredAt??null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function Rt(e,o){let r=[],n;do{let a=await m.data.dataset(e).query({where:o,limit:1e3,cursor:n});r.push(...a.rows),n=a.cursor}while(n);return r}async function Da(e,o=!0,r=!0){let n=e?{taskId:e}:void 0,[a,i,s,l,u]=await Promise.all([r?Rt($o,n):[],Rt(Ko,n),Rt(Ro,n),o?Rt(Vo,n):[],o?Rt(Ho,n):[]]);return{tags:a,links:i,attachments:s,sessions:l,statusHistory:u}}function Aa(e,o=!0){return[...o?e.tags.map(r=>({dataset:$o,operation:"insert",values:{taskId:e.id,tag:r}})):[],...(e.urls??[]).map((r,n)=>({dataset:Ko,operation:"insert",values:{taskId:e.id,position:n,url:r}})),...(e.attachments??[]).map((r,n)=>({dataset:Ro,operation:"insert",values:{taskId:e.id,position:n,path:r}})),...(e.history??[]).map((r,n)=>({dataset:Vo,operation:"insert",values:{taskId:e.id,position:n,...r}})),...(e.statusHistory??[]).map((r,n)=>({dataset:Ho,operation:"insert",values:{taskId:e.id,position:n,...r}}))]}function Md(e,o){return[...o.tags.map(r=>({dataset:$o,operation:"delete",key:{taskId:e,tag:String(r.tag)}})),...o.links.map(r=>({dataset:Ko,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...o.attachments.map(r=>({dataset:Ro,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...o.sessions.map(r=>({dataset:Vo,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...o.statusHistory.map(r=>({dataset:Ho,operation:"delete",key:{taskId:e,position:Number(r.position)}}))]}async function Od(e){let[o,r]=await Promise.all([Rt(io),Da(void 0,e)]),n=ro(m.getState().groups),a=(f,g=!1)=>{let w=new Map;for(let T of f){let h=w.get(T.taskId);h?h.push(T):w.set(T.taskId,[T])}if(g)for(let T of w.values())T.sort((h,I)=>Number(h.position)-Number(I.position));return w},i=a(r.tags),s=a(r.links,!0),l=a(r.attachments,!0),u=a(r.sessions,!0),p=a(r.statusHistory,!0);return o.map(f=>Uo({...f,tags:(i.get(f.id)??[]).map(g=>g.tag),urls:(s.get(f.id)??[]).map(g=>g.url),attachments:(l.get(f.id)??[]).map(g=>g.path),history:u.get(f.id)??[],statusHistory:p.get(f.id)??[]})).map(f=>({...f,group:Fo(f.group,n)??f.group})).filter(f=>f.title)}function Ea(e){let o=m.runtime.getOrCreate(e?"todo.fullRead":"todo.calendarRead",()=>{let r={revision:0,pending:null};for(let n of e?va:jr)m.data.dataset(n).subscribe(()=>{r.revision++});return r});return o.pending||(o.pending=(async()=>{for(;;){let r=o.revision,n=await Od(e);if(r===o.revision)return n}})().finally(()=>{o.pending=null})),o.pending}function oe(){return Ea(!0)}function Ca(){return Ea(!1)}async function _d(e){let o=ka(e);try{return await m.data.transaction([{dataset:io,operation:"insert",values:Sa(o)},...Aa(o)]),!0}catch{return!1}}async function Fd(e,o,r,n){try{let a={pluginId:m.pluginId,sourceId:"tasks",itemId:e},i=await m.documents.read(a);if(!i)return!1;let s=(await oe()).find(I=>I.id===e);if(!s||r!==void 0&&s.updatedAt!==r)return!1;let l={...o,id:e},u=Ee(s),p=Ee(l),f=[...s.statusHistory??[]];u!==p&&f.push({from:u,to:p,changedAt:new Date().toISOString()}),l={...l,statusHistory:f.length?f:void 0};let g=ka(l),w=await Da(e,!0,!1),T=Sa(g);delete T.id,delete T.note;let h=await m.documents.update(a,{expectedRevision:n?.expectedRevision??i.revision,vaultGeneration:n?.vaultGeneration??i.vaultGeneration,body:g.note,explicitTags:g.tags??[],operations:[{dataset:io,operation:"update",key:{id:e},values:T},...Md(e,w),...Aa(g,!1)]});return n&&Object.assign(n,{expectedRevision:h.revision,vaultGeneration:h.vaultGeneration}),!0}catch{return!1}}async function zd(e){try{return(await m.data.dataset(io).delete({id:e})).affected>0}catch{return!1}}var $e=_d,Ve=Fd,Ye=zd;async function jo(e){if(!e.id||!e.title.trim())return!1;let o=await $e(e);return o&&m.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Ye(e.id)}),redo:async()=>({ok:await $e(e)})}),o}async function Vt(e,o,r,n){if(!e||!o.title.trim())return!1;let a=(await oe()).find(s=>s.id===e),i=await Ve(e,o,r,n);return i&&a&&m.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Ve(e,a)}),redo:async()=>({ok:await Ve(e,o)})}),i}async function Na(e){let o=(await oe()).find(n=>n.id===e),r=await Ye(e);return r&&o&&m.undo.push({label:d("todo.undo.delete",{title:o.title}),undo:async()=>({ok:await $e(o)}),redo:async()=>({ok:await Ye(e)})}),r}async function Ia(e,o){let r=[...new Set(e)];if(!r.length)return!1;let n=(await oe()).filter(i=>r.includes(i.id));if(n.length!==r.length)return!1;let a=[];for(let i of r){if(!await Ye(i)){for(let l of a.reverse())await $e(l);return!1}let s=n.find(l=>l.id===i);s&&a.push(s)}return m.undo.push({label:d("todo.undo.delete",{title:o}),undo:async()=>{for(let i of n)if(!await $e(i))return{ok:!1};return{ok:!0}},redo:async()=>{for(let i of r)if(!await Ye(i))return{ok:!1};return{ok:!0}}}),!0}async function so(e,o){await m.ui.confirm({title:d("todo.delete.title"),message:t.createElement("span",null,t.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await o(e.id)}async function La(e){let o=(await oe()).find(n=>n.id===e);if(!o||o.reminderFiredAt)return!1;let r=new Date().toISOString();return Ve(e,{...o,reminderFiredAt:r,updatedAt:r})}function Gd(e){let o=[],r=e.replace(/#(\S+)/g,(n,a)=>(o.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:o,text:r}}function xt(e,o,...r){let n=Gd(e);if(!n.tags.length&&!n.text)return!0;let a=o.map(i=>i.toLowerCase());for(let i of n.tags)if(!a.some(s=>s.startsWith(i)))return!1;return!(n.text&&!r.map(s=>s.toLowerCase()).some(s=>s.includes(n.text)))}function xe(e=[]){return e.map(o=>Fo(o.name,e)??o.name)}function $d(){return ro(m.getState().groups)}function Ge(){return $d()}function Pa(e){return m.subscribe(e)}function He(){let[e,o]=t.useState(Ge);return t.useEffect(()=>m.subscribe(()=>o(Ge())),[]),e}function Ma(){let e=!1,o=()=>{oe().then(n=>{e||m.workspace.reportGroupUsage(Hr(n.map(a=>a.group)))})};o();let r=lt(o);return()=>{e=!0,r(),m.workspace.reportGroupUsage({})}}function Kd(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Rd(e){let o=e.toLowerCase();return Kd(o)?o:"yyyy-mm-dd"}function Oa(e,o){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Rd(o).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Vd="ddd d mmm",Hd=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Ud(e){let o=e.trim().toLowerCase().match(/[a-z]+/g);if(!o||o.some(s=>!Hd.has(s)))return!1;let r=o.filter(s=>s==="d"||s==="dd"),n=o.filter(s=>s==="ddd"||s==="dddd"),a=o.filter(s=>s==="mmm"||s==="mmmm"),i=o.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(o).size===o.length}function jd(e){let o=e.trim().toLowerCase().replace(/\s+/g," ");return Ud(o)?o:Vd}function _a(e,o,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,l=new Date(Number(a),Number(i)-1,Number(s),12),u={d:String(Number(s)),dd:s,ddd:new Intl.DateTimeFormat(r,{weekday:"short"}).format(l),dddd:new Intl.DateTimeFormat(r,{weekday:"long"}).format(l),mmm:new Intl.DateTimeFormat(r,{month:"short"}).format(l),mmmm:new Intl.DateTimeFormat(r,{month:"long"}).format(l),yyyy:a};return jd(o).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>u[p])}var je=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Tt={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},Bo={high:3,medium:2,low:1,normal:0};function Ht(e,o){return e.title.localeCompare(o.title,void 0,{sensitivity:"base"})}function Bd(e,o,r){if(r==="name")return Ht(e,o);if(r==="priority"){let i=Bo[o.priority]-Bo[e.priority];return i!==0?i:Ue(e,o)}if(r==="flagged"){let i=+!!o.flagged-+!!e.flagged;return i!==0?i:Ue(e,o)}if(r==="due"){let i=e.dueDate||"",s=o.dueDate||"";if(!i&&!s)return Ue(e,o);if(!i)return-1;if(!s)return 1;let l=i.localeCompare(s);return l!==0?l:Ue(e,o)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(o[n]);return a!==0?a:Ht(e,o)}function qr(e,o){let r=Bo[o.priority]-Bo[e.priority];return r!==0?r:Ht(e,o)}function Ue(e,o){let r=e.startTime||"",n=o.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return qr(e,o)}function Ut(e,o,r){return[...e].sort((n,a)=>{if(o==="due"&&r==="desc"){let s=n.dueDate||"",l=a.dueDate||"";if(!s&&!l)return Ue(n,a);if(!s)return-1;if(!l)return 1;let u=l.localeCompare(s);return u!==0?u:Ue(n,a)}let i=Bd(n,a,o);return r==="asc"?i:-i})}function ze(e,o="dd-mm-yyyy"){return e?Oa(e,o):""}function Te(e){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function qo(e){let[o,r,n]=e.split("-").map(i=>parseInt(i,10));if(!o||!r||!n)return null;let a=new Date(o,r-1,n);return a.setHours(0,0,0,0),a}function jt(e,o){let r=qo(e);return r?(r.setDate(r.getDate()+o),Te(r)):e}function et(e,o,r="ddd d mmm"){return _a(e.slice(0,10),r,o)}function Fa(e,o,r={}){let n=qo(`${e}-01`);if(!n)return e;let a=r.now??new Date,i=n.getFullYear()===a.getFullYear(),s=n.toLocaleDateString(o,i?{month:"long"}:{month:"long",year:"numeric"});return r.partial&&r.restOfLabel?r.restOfLabel.replace("{{p0}}",s):s}function za(e,o,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===o)return r.today;let[s,l,u]=i.split("-").map(Number),[p,f,g]=o.split("-").map(Number);if(!s||!l||!u||!p||!f||!g)return ze(e,a);let w=new Date(s,l-1,u),T=new Date(p,f-1,g),h=Math.round((w.getTime()-T.getTime())/864e5);return h===1?r.tomorrow:h===-1?r.yesterday:h>1&&h<7?w.toLocaleDateString(n,{weekday:"long"}):ze(e,a)}function qd(e,o,r){let n=o.get(e)?.parentId;if(!n||!r.has(n))return null;let a=new Set([e]),i=n;for(;i;){if(a.has(i))return null;if(a.add(i),i=o.get(i)?.parentId,i&&!r.has(i))break}return n}function Ga(e){let o=new Map(e.map(l=>[l.id,l])),r=new Set(o.keys()),n=new Map,a=[];for(let l of e){let u=qd(l.id,o,r);if(u===null){a.push(l);continue}let p=n.get(u);p?p.push(l):n.set(u,[l])}let i=[],s=(l,u)=>{let p=n.get(l.id)??[];i.push({todo:l,depth:Math.min(u,5),hasChildren:p.length>0});for(let f of p)s(f,u+1)};for(let l of a)s(l,0);return i}function Ke(e,o){let r=new Map;for(let s of e){if(!s.parentId)continue;let l=r.get(s.parentId);l?l.push(s.id):r.set(s.parentId,[s.id])}let n=[],a=new Set([o]),i=s=>{for(let l of r.get(s)??[])a.has(l)||(a.add(l),n.push(l),i(l))};return i(o),n}function Wd(e,o){let r=new Map(e.map(s=>[s.id,s])),n=new Set([o]),a=0,i=r.get(o)?.parentId;for(;i&&!n.has(i)&&r.has(i);)n.add(i),a++,i=r.get(i)?.parentId;return Math.min(a,5)}function Yd(e,o){let r=new Map;for(let s of e){if(!s.parentId)continue;let l=r.get(s.parentId);l?l.push(s.id):r.set(s.parentId,[s.id])}let n=new Set([o]),a=0,i=(s,l)=>{for(let u of r.get(s)??[])n.has(u)||(n.add(u),a=Math.max(a,l),i(u,l+1))};return i(o,1),a}function Bt(e,o,r){return r?o===r||Ke(e,o).includes(r)?!1:Wd(e,r)+1+Yd(e,o)<=5:!0}function Xd(e,o){let r=e[o];if(!r||o<=0||r.depth>=5)return null;let n=r.depth;for(let a=o+1;a<e.length&&e[a].depth>r.depth;a++)n=Math.max(n,e[a].depth);for(let a=o-1;a>=0;a--){let i=e[a];if(i.depth<=r.depth){let s=i.depth+1-r.depth;return n+s<=5?i.todo:null}}return null}function $a(e,o){let r=Xd(e,o);return r?{parentId:r.id}:null}function Wr(e,o){let r=new Map(e.map(i=>[i.id,i])),n=r.get(o)?.parentId;return n?{parentId:r.get(n)?.parentId||void 0}:null}function Ka(e,o){return Wr(e,o)!==null}var Bp=new Date(2023,0,1,12);var Zd={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Yr(e){return Zd[e??""]??1}function Ra(e){let o=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=o.getUTCDay()||7;o.setUTCDate(o.getUTCDate()+4-r);let n=new Date(Date.UTC(o.getUTCFullYear(),0,1));return Math.ceil(((o.getTime()-n.getTime())/864e5+1)/7)}function Jd(e,o){return(e.getDay()-o+7)%7}function Va(e,o){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Jd(e,o))}function lo(e){let[o,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(o,(r||1)-1,n||1)}var qt=["overdue","today","upcoming","someday","completed"],ja={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function Re(e=new Date){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function co(e,o=Re()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<o?r.overdue.push(a):i===o?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||Ue(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(Ue),r.someday.sort(qr),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Ht(a,i)),r}function Ba(e,o=Re()){let r=new Map,n=new Map(e.map(s=>[s.id,s])),a=e.filter(s=>!s.parentId||!n.has(s.parentId));for(let s of a){let l=s.dueDate?.slice(0,10)??"";r.set(s.id,l);for(let u of Ke(e,s.id))r.set(u,l)}let i=new Map;for(let s of e){let l=r.get(s.id)??s.dueDate?.slice(0,10)??"",u=i.get(l);u?u.push(s):i.set(l,[s])}return[...i.entries()].sort(([s],[l])=>s===""?1:l===""?-1:s.localeCompare(l)).map(([s,l])=>({key:s,overdue:!!s&&s<o,todos:l.sort(Ue)}))}function kt(e){return[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Xr(e){let o=new Date(e);return Number.isNaN(o.getTime())?e.slice(0,10):Re(o)}function qa(e){let o=[...e].sort((n,a)=>kt(a).localeCompare(kt(n))||Ht(n,a)),r=new Map;for(let n of o){let a=Xr(kt(n)),i=r.get(a);i?i.push(n):r.set(a,[n])}return[...r.entries()].sort(([n],[a])=>a.localeCompare(n)).map(([n,a])=>({key:n,kind:"daily",todos:a}))}function Zr(e,o,r=1,n){let a=n?.dateOf??(p=>p.dueDate?.slice(0,10)??""),i=new Map(e.map(p=>[p.id,p])),s=new Map;if(n?.inheritRoot!==!1)for(let p of e.filter(f=>!f.parentId||!i.has(f.parentId))){let f=a(p);s.set(p.id,f);for(let g of Ke(e,p.id))s.set(g,f)}let l=p=>p?o==="monthly"?p.slice(0,7):o==="daily"?p:Re(Va(lo(p),r)):"",u=new Map;for(let p of e){let f=l(s.get(p.id)??a(p)),g=u.get(f);g?g.push(p):u.set(f,[p])}return[...u.entries()].sort(([p],[f])=>p===""?-1:f===""?1:f.localeCompare(p)).map(([p,f])=>({key:p,kind:p?o:"none",todos:f}))}var Qd=["untimed","morning","afternoon","tonight"],Wa={untimed:"",morning:"todo.timeOfDay.morning",afternoon:"todo.timeOfDay.afternoon",tonight:"todo.timeOfDay.tonight"};function Ha(e){if(!e)return"untimed";let o=Number(e.slice(0,2));return Number.isFinite(o)?o<12?"morning":o<18?"afternoon":"tonight":"untimed"}function Ya(e){let o=new Map(e.map(a=>[a.id,a])),r=new Map;for(let a of e.filter(i=>!i.parentId||!o.has(i.parentId))){let i=Ha(a.startTime);r.set(a.id,i);for(let s of Ke(e,a.id))r.set(s,i)}let n=new Map;for(let a of e){let i=r.get(a.id)??Ha(a.startTime),s=n.get(i);s?s.push(a):n.set(i,[a])}return Qd.filter(a=>n.has(a)).map(a=>({id:a,todos:n.get(a).sort(Ue)}))}var el=14;function Ua(e){return e.slice(0,7)}function Xa(e,o,r=el){let n=tl(o,r),a=[],i=[];for(let p of e)!p.key||p.key<=n?a.push(p):i.push(p);let s=new Map;for(let p of i){let f=Ua(p.key),g=s.get(f);g?g.push(p):s.set(f,[p])}let l=Ua(o),u=[...s.entries()].sort(([p],[f])=>p.localeCompare(f)).map(([p,f])=>({key:p,days:f,partial:p===l}));return{near:a,months:u}}function tl(e,o){let[r,n,a]=e.split("-").map(Number),i=new Date(r,(n||1)-1,(a||1)+o);return Re(i)}function Za(e,o=Re()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,u)=>{let p=u.toLowerCase();if(p==="today")r=o;else if(p==="tomorrow"){let f=new Date(`${o}T00:00:00`);f.setDate(f.getDate()+1),r=Re(f)}else r=u;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,u)=>(n=u.length>=3?"high":u.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var fe=e=>typeof e=="string"?e:"",oi=e=>fe(e?.query).trim(),Xo=["normal","low","medium","high"];function ct(){return new Date().toISOString()}function Ja(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Qa(e){let o=e.trim();if(!o)return;let r=no(Ge(),o);if(!r)throw new Error(`Unknown group "${o}". Create it in Settings \u2192 Appearance \u2192 Groups first.`);return r.name}function ei(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return Ja();if(e.toLowerCase()==="tomorrow"){let o=new Date;return o.setDate(o.getDate()+1),Ja(o)}return e}function ol(e){return typeof e=="string"?e.split(",").map(o=>o.trim()).filter(Boolean):[]}function rl(e,o){let r=new Map(e.map(s=>[s.id,s])),n=new Set([o]),a=0,i=r.get(o)?.parentId;for(;i&&!n.has(i)&&a<=5;)n.add(i),a++,i=r.get(i)?.parentId;return a}function Wo(e){let o=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${o} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function uo(e,o){let r=o.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var Yo={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let o=oi(e);if(!o)throw new Error("Expected a todo id or title.");return{query:o}},fromCli:e=>({query:e.join(" ").trim()})};async function Wt(e,o,r){let n=uo(await oe(),e),a=o(n);if(!await Ve(n.id,a,n.updatedAt))throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{await Ve(n.id,n)},reapply:async()=>{await Ve(n.id,a)}}}}async function ti(e){return Wt(e,o=>({...o,completed:!0,status:"completed",updatedAt:ct()}),o=>`Complete \u201C${o.title}\u201D`)}var St={type:"string"},ri={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","parentId","remindAt"].map(e=>[e,St])),priority:{type:"string",enum:Xo},status:{type:"string",enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:St}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:St,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function nl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let o=e;for(let[r,n]of Object.entries(o)){if(!(r in ri.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof o.title=="string"&&!o.title.trim())throw new Error("A task title cannot be empty.");if(o.priority!==void 0&&!Xo.includes(o.priority))throw new Error("Invalid priority.");if(o.status!==void 0&&!st().includes(o.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(o[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(o[r])))throw new Error("Invalid task time.");if(o.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(o.remindAt)))throw new Error("Invalid reminder date.");return o}async function al(e,o,r){let n=await oe(),a=n.find(s=>s.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(o.parentId!==void 0&&(o.parentId&&!n.some(s=>s.id===o.parentId)||!Bt(n,e,o.parentId)))throw new Error("This parent would create an invalid task tree.");if(o.group&&!xe(Ge()).includes(o.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=Uo({...a,...o,...o.status?Ce(o.status):o.completed!==void 0?Ce(o.completed?"completed":"open"):{},...o.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:ct()});if(o.filePath&&i.filePath!==o.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(o[s]?.some(l=>!i[s]?.includes(l)))throw new Error(`Invalid task ${s}.`);if(!await Ve(e,i,a.updatedAt))throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await Ve(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Ve(e,i))throw new Error("Could not reapply the task edit.")}}}}async function Be(e){let o=e??{},r=o.id??o.query,n={groups:Ge(),statuses:st()};if(!r)return n;let a=await oe(),i=uo(a,r),s=new Set([i.id,...Ke(a,i.id)]);for(let l=i.parentId;l&&!s.has(l);l=a.find(u=>u.id===l)?.parentId)s.add(l);for(let l=o.values?.parentId;l&&!s.has(l);l=a.find(u=>u.id===l)?.parentId)s.add(l);return{...n,records:a.filter(l=>s.has(l.id)).sort((l,u)=>l.id.localeCompare(u.id))}}function ni(e){let o=[e.commands.register({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:St},required:["id"],additionalProperties:!1},parse:r=>{let n=fe(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=(await oe()).find(a=>a.id===r);if(!n)throw new Error("The task no longer exists. Open To-Do to choose another task.");return e.workspace.openMainTab(),at().request(r,"edit"),n}}),e.commands.register({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:St},required:["id"],additionalProperties:!1},parse:r=>{let n=fe(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=(await oe()).find(a=>a.id===r);if(!n)throw new Error("The task no longer exists.");return n}}),e.commands.register({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:St,values:ri,expectedUpdatedAt:St},required:["id","values"],additionalProperties:!1},parse:r=>{let n=r,a=fe(n?.id).trim();if(!a||n.expectedUpdatedAt!==void 0&&typeof n.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:a,values:nl(n.values),expectedUpdatedAt:n.expectedUpdatedAt}}},run:({id:r,values:n,expectedUpdatedAt:a})=>al(r,n,a),revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"open-page",label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>{e.workspace.openMainTab()},formatCli:()=>"Opened To-Do page."}),e.commands.register({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.title).trim();if(!a)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:a,due:fe(n.due),priority:fe(n.priority),status:fe(n.status),note:fe(n.note),group:fe(n.group)}},fromCli:(r,n)=>({title:r.join(" ").trim(),due:n.due,priority:n.priority,status:n.status,note:n.note,group:n.group})},run:async({title:r,due:n,priority:a,status:i,note:s,group:l})=>{let u=st();if(i&&!u.includes(i))throw new Error(`Status "${i}" is not enabled. One of: ${u.join(", ")}`);let p=Uo({title:r,priority:a||"normal",status:i||void 0,dueDate:ei(n),note:s,group:Qa(l)});if(!await $e(p))throw new Error("Failed to add todo.");return{value:p,revert:{label:`Add todo \u201C${p.title}\u201D`,run:async()=>{await Ye(p.id)},reapply:async()=>{await $e(p)}}}},formatCli:r=>`Added: ${Wo(r)}`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Yo,run:({query:r})=>ti(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Yo,run:({query:r})=>ti(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=oi(r);if(!n)throw new Error('Usage: todo search "<query>"');return{query:n}},fromCli:r=>({query:r.join(" ").trim()})},run:async({query:r})=>(await oe()).filter(n=>xt(r,n.tags,n.title,n.note)).slice(0,20),formatCli:r=>r.length?r.map(Wo).join(`
`):"No matching todos."}),e.commands.register({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Yo,run:({query:r})=>Wt(r,n=>({...n,completed:!1,status:"open",updatedAt:ct()}),n=>`Reopen \u201C${n.title}\u201D`),formatCli:r=>`Reopened: ${r.title}`,revision:r=>Be(r),preview:r=>({changes:r})}),...["cancel","pause"].map(r=>e.commands.register({id:r,label:`To-Do: ${r==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Yo,run:({query:n})=>{let a=r==="cancel"?"canceled":"onhold";if(!ha(a))throw new Error(`Status "${a}" is disabled in To-Do settings.`);return Wt(n,i=>({...i,...Ce(a),updatedAt:ct()}),i=>`${r==="cancel"?"Cancel":"Hold"} \u201C${i.title}\u201D`)},formatCli:n=>`${r==="cancel"?"Canceled":"On hold"}: ${n.title}`,revision:n=>Be(n),preview:n=>({changes:n})})),e.commands.register({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.query).trim(),i=fe(n.status),s=st();if(!a||!s.includes(i))throw new Error(`Usage: todo status "<id or title>" <${s.join("|")}>`);return{query:a,status:i}},fromCli:r=>({query:r.slice(0,-1).join(" "),status:r.at(-1)})},run:({query:r,status:n})=>Wt(r,a=>({...a,...Ce(n),updatedAt:ct()}),a=>`Set status for \u201C${a.title}\u201D`),formatCli:r=>`${r.title} \u2192 ${r.status}`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.query).trim(),i=fe(n.priority);if(!a)throw new Error("Expected a todo id or title.");if(i&&!Xo.includes(i))throw new Error(`Invalid priority "${i}". One of: ${Xo.join(", ")}`);return{query:a,title:typeof n.title=="string"?n.title:void 0,priority:i||void 0,due:typeof n.due=="string"?n.due:void 0,note:typeof n.note=="string"?n.note:void 0,tags:typeof n.tags=="string"?ol(n.tags):void 0,group:typeof n.group=="string"?n.group:void 0}},fromCli:(r,n)=>({query:r.join(" "),title:n.title,priority:n.priority,due:n.due,note:n.note,tags:n.tag,group:n.group})},run:({query:r,title:n,priority:a,due:i,note:s,tags:l,group:u})=>Wt(r,p=>({...p,title:n??p.title,priority:a??p.priority,dueDate:i===void 0?p.dueDate:ei(i),note:s??p.note,tags:l??p.tags,group:u===void 0?p.group:Qa(u),updatedAt:ct()}),p=>`Edit \u201C${p.title}\u201D`),formatCli:r=>`Edited: ${Wo(r)}`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.query).trim();if(!a)throw new Error("Expected a todo id or title.");return{query:a,confirm:n.confirm===!0||n.confirm==="true"}},fromCli:(r,n)=>({query:r.join(" "),confirm:n.confirm})},run:async({query:r,confirm:n})=>{let a=await oe(),i=uo(a,r);if(!n)return{value:{deleted:!1,todo:i,deletedCount:0},revert:null};let s=[...Ke(a,i.id).reverse(),i.id],l=a.filter(p=>s.includes(p.id)),u=[];for(let p of s){if(!await Ye(p)){for(let g of u)await $e(g);throw new Error("Failed to delete todo.")}let f=l.find(g=>g.id===p);f&&u.push(f)}return{value:{deleted:!0,todo:i,deletedCount:l.length},revert:{label:`Delete \u201C${i.title}\u201D`,run:async()=>{for(let p of l)await $e(p)},reapply:async()=>{for(let p of s)await Ye(p)}}}},formatCli:({deleted:r,todo:n,deletedCount:a})=>r?`Deleted: ${n.title}${a>1?` (${a} tasks)`:""}`:`Would delete "${n.title}" [${n.id}]. Re-run with --confirm to delete.`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"subtask-add",label:"To-Do: Add a subtask",labelKey:"auto.1d41bafdd3cb",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"}},required:["query","title"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.query).trim(),i=fe(n.title).trim();if(!a||!i)throw new Error('Usage: todo subtask-add "<parent>" "<title>"');return{query:a,title:i}},fromCli:r=>({query:r[0],title:r.slice(1).join(" ")})},run:async({query:r,title:n})=>{let a=await oe(),i=uo(a,r);if(rl(a,i.id)>=5)throw new Error(`\u201C${i.title}\u201D is already ${5} levels deep.`);let s=ct(),l={id:`todo_${Date.now().toString(36)}_${Math.floor(Math.random()*1e6).toString(36)}`,title:n,completed:!1,priority:"normal",dueDate:i.dueDate,note:"",tags:[],parentId:i.id,group:i.group,createdAt:s,updatedAt:s};if(!await $e(l))throw new Error("Could not add the subtask.");return{value:{parent:i,child:l},revert:{label:`Add subtask to \u201C${i.title}\u201D`,run:async()=>{await Ye(l.id)},reapply:async()=>{await $e(l)}}}},formatCli:({parent:r,child:n})=>`Added subtask "${n.title}" to "${r.title}"`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"subtask-done",label:"To-Do: Complete a subtask",labelKey:"auto.76411cef59a3",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},subtask:{type:"string"}},required:["query","subtask"],additionalProperties:!1},parse:r=>{let n=r??{},a=fe(n.query).trim(),i=fe(n.subtask).trim();if(!a||!i)throw new Error('Usage: todo subtask-done "<parent>" "<title>"');return{query:a,subtask:i}},fromCli:r=>({query:r[0],subtask:r.slice(1).join(" ")})},run:async({query:r,subtask:n})=>{let a=await oe(),i=uo(a,r),s=Ke(a,i.id).map(p=>a.find(f=>f.id===p)).filter(p=>p.title.toLowerCase().includes(n.toLowerCase()));if(s.length!==1)throw new Error(s.length?"Multiple subtasks match.":`No subtask matching "${n}".`);let l=s[0],u=await Wt(l.id,p=>({...p,...Ce("completed"),updatedAt:ct()}),()=>`Complete subtask \u201C${l.title}\u201D`);return{...u,value:{todo:u.value,subtask:l}}},formatCli:({subtask:r})=>`Completed subtask "${r.title}"`,revision:r=>Be(r),preview:r=>({changes:r})}),e.commands.register({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:r=>{let n=r??{};return{section:fe(n.section),q:fe(n.q)}},fromCli:(r,n)=>({section:fe(n.section),q:fe(n.q??n.search)})},run:async({section:r,q:n})=>{let a=await oe();return n&&(a=a.filter(i=>xt(n,i.tags,i.title,i.note))),r&&qt.includes(r)?co(a)[r]:a},formatCli:r=>r.length===0?"No matching todos.":r.map(Wo).join(`
`)}),e.commands.register({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let r=await oe(),n=Ge();return xe(n).map(a=>({name:a,count:r.filter(i=>Q(i.group??"")===Q(a)).length}))},formatCli:r=>r.length?r.map(n=>`${n.name} (${n.count})`).join(`
`):"No groups."})];return()=>o.forEach(r=>r())}var ai={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var sl=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,dl=/^-\s+(.*)$/,ll=/^[A-Za-z][\w+.-]*:\/\//;function ii(e){let o={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(dl);if(i){r?o.lists[r].push(i[1].trim()):o.bare===null&&(o.bare=i[1].trim());continue}let s=ll.test(a)?null:a.match(sl);if(s){let l=s[1].trim().toLowerCase(),u=s[2].trim();u===""?(r=l,o.lists[l]=o.lists[l]??[]):(r=null,o.values[l]=u);continue}r=null,o.bare===null&&(o.bare=a)}return o}function si(e,o,r=500){let n=e.values[o];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Qr="notes-todo-fence-styles";function cl(){if(document.getElementById(Qr))return;let e=document.createElement("style");e.id=Qr,e.textContent=`
.todo-fence { margin: 0.75em 0; border: 1px solid var(--border-light); border-radius: var(--radius); background: var(--container-color); overflow: hidden; }
.todo-fence-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--border-light); cursor: pointer; }
.todo-fence-head .t { font-weight: 600; color: var(--title-color); }
.todo-fence-head .c { font-size: var(--small-font-size); color: var(--text-secondary); }
.todo-fence-row { display: flex; align-items: center; gap: 8px; padding: 6px 12px; }
.todo-fence-row:hover { background: var(--hover-bg); }
/* The same painted round check as the panel rows \u2014 the fence has its own
   stylesheet, so this is a deliberate port, not inheritance. */
.todo-fence-row input[type='checkbox'] {
  appearance: none; -webkit-appearance: none; box-sizing: border-box;
  flex: none; width: 16px; height: 16px;
  display: inline-grid; place-content: center;
  border: 1.5px solid color-mix(in srgb, var(--text-secondary) 55%, transparent);
  border-radius: 50%; background: transparent; cursor: pointer;
}
.todo-fence-row input[type='checkbox']:hover { border-color: var(--accent-color); }
.todo-fence-row input[type='checkbox']:checked { border-color: var(--accent-color); background: var(--accent-color); }
.todo-fence-row input[type='checkbox']:checked::after {
  content: ''; width: 9px; height: 9px; background: #fff;
  clip-path: polygon(14% 47%, 5% 58%, 39% 90%, 96% 22%, 85% 12%, 37% 69%);
}
.todo-fence-row .t { flex: 1; min-width: 0; color: var(--text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.todo-fence-row.done .t { text-decoration: line-through; color: var(--text-secondary); }
.todo-fence-row .pri { flex: none; font-weight: 700; }
.todo-fence-row .pri-low { color: var(--text-tertiary); }
.todo-fence-row .pri-medium { color: var(--neutral-color); }
.todo-fence-row .pri-high { color: var(--negative-color); }
.todo-fence-row .due { flex: none; font-size: var(--small-font-size); color: var(--text-secondary); }
.todo-fence-row .due.overdue { color: var(--negative-color); }
.todo-fence-row .tag { flex: none; font-size:0.6875rem; padding: 0 6px; border-radius: 999px; background: var(--accent-tint-bg); color: var(--accent-tint-text); }
.todo-fence-empty { padding: 10px 12px; color: var(--text-secondary); font-size: var(--small-font-size); }
`,document.head.appendChild(e)}var di=()=>{let e=new Date,o=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())}`},ul=e=>{let o=new Date;o.setDate(o.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${o.getFullYear()}-${r(o.getMonth()+1)}-${r(o.getDate())}`};function pl(e,o){let r=di(),n=ul(7),a=o.tag?o.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(o.status==="open"&&i.completed||o.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||o.due==="today"&&i.dueDate!==r||o.due==="week"&&(!i.dueDate||i.dueDate>n)||o.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,o.limit)}var fl=({code:e})=>{let[o,r]=t.useState(null);t.useEffect(()=>{let f=!0,g=()=>{oe().then(T=>{f&&r(T)})};g();let w=lt(g);return()=>{f=!1,w()}},[]);let n=ii(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:si(n,"limit",100)??10};if(!o)return t.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=pl(o,s),u=di(),p=f=>{let g={...f,completed:!f.completed,status:f.completed?"open":"completed"};r(w=>w&&w.map(T=>T.id===f.id?g:T)),Vt(f.id,g)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"todo-fence-head",onClick:f=>m.workspace.openMainTab({newTab:m.ui.hasModKey(f)}),title:d("auto.edbe7ad07b4a")},t.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),t.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&t.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(f=>t.createElement("div",{key:f.id,className:`todo-fence-row ${f.completed?"done":""}`},t.createElement("input",{type:"checkbox",checked:f.completed,onChange:()=>p(f),"aria-label":f.title}),f.priority!=="normal"&&t.createElement("span",{className:`pri pri-${f.priority}`},je.find(g=>g.id===f.priority)?.symbol),t.createElement("span",{className:"t"},f.title),f.tags.slice(0,2).map(g=>t.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),f.dueDate&&t.createElement("span",{className:`due ${!f.completed&&f.dueDate<u?"overdue":""}`},f.dueDate))))};function li(){let e=m.markdown.registerCodeBlockRenderer("todo",(o,r)=>(cl(),r.classList.add("todo-fence"),m.ui.renderReact(r,t.createElement(fl,{code:o}))),{examples:ai.todo});return()=>{e(),document.getElementById(Qr)?.remove()}}var j=e=>t.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),ut=e=>t.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),ml=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),gl=e=>t.createElement(ut,{...e,viewBox:"2 2 20 20"},t.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),t.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),hl=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),bl=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),yl=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),vl=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),wl=e=>t.createElement(ut,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),xl={inprogress:hl,waiting:bl,onhold:gl,delegated:yl,deferred:vl,completed:wl,canceled:ml},ye=({status:e,dotCls:o})=>{let r=e?xl[e]:void 0;return r?t.createElement(r,{className:`todo-status-menu-svg ${o}`}):t.createElement("span",{className:`todo-status-menu-dot ${o}`})},qe=e=>t.createElement(j,{...e},t.createElement("path",{d:"M12 5v14M5 12h14"})),Zo=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"11",cy:"11",r:"8"}),t.createElement("path",{d:"m21 21-4.3-4.3"})),Ne=e=>t.createElement(j,{...e},t.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Jo=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"9",cy:"6",r:"1"}),t.createElement("circle",{cx:"15",cy:"6",r:"1"}),t.createElement("circle",{cx:"9",cy:"12",r:"1"}),t.createElement("circle",{cx:"15",cy:"12",r:"1"}),t.createElement("circle",{cx:"9",cy:"18",r:"1"}),t.createElement("circle",{cx:"15",cy:"18",r:"1"})),ci=e=>t.createElement(j,{...e},t.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),t.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),ui=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"1"}),t.createElement("circle",{cx:"19",cy:"12",r:"1"}),t.createElement("circle",{cx:"5",cy:"12",r:"1"})),pi=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 11v5M12 8h.01"})),Qo=e=>t.createElement(j,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),er=e=>t.createElement(j,{...e},t.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),t.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),po=e=>t.createElement(j,{...e},t.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),fo=e=>t.createElement(j,{...e},t.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),fi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),t.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),mi=e=>t.createElement(j,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),t.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),gi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),tt=e=>t.createElement(j,{...e},t.createElement("path",{d:"m6 9 6 6 6-6"})),Oe=e=>t.createElement(j,{...e},t.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),t.createElement("path",{d:"M4 22v-7"})),hi=e=>t.createElement(ut,{...e,viewBox:"0 0 192 512"},t.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),bi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M12 20h9"}),t.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),tr=e=>t.createElement(j,{...e},t.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),t.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),We=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"m8 12 3 3 5-6"})),or=e=>t.createElement(j,{...e},t.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),t.createElement("path",{d:"M10 11v6M14 11v6"})),yi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),t.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),rr=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 7v5l3 2"})),nr=e=>t.createElement(j,{...e},t.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),ot=e=>t.createElement(j,{...e},t.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),t.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),vi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),t.createElement("circle",{cx:"12",cy:"12",r:"3"})),Yt=e=>t.createElement(j,{...e},t.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),t.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),t.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),wi=e=>t.createElement(j,{...e},t.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),ar=e=>t.createElement(j,{...e},t.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),t.createElement("circle",{cx:"12",cy:"10",r:"3"})),Dt=e=>t.createElement(j,{...e},t.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),ir=e=>t.createElement(j,{...e},t.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),t.createElement("path",{d:"M14 2v6h6"})),xi=e=>t.createElement(j,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),t.createElement("circle",{cx:"9",cy:"9",r:"2"}),t.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Ti=e=>t.createElement(j,{...e},t.createElement("path",{d:"M9 18V5l12-2v13"}),t.createElement("circle",{cx:"6",cy:"18",r:"3"}),t.createElement("circle",{cx:"18",cy:"16",r:"3"})),ki=e=>t.createElement(j,{...e},t.createElement("path",{d:"m22 8-6 4 6 4V8z"}),t.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),mo=e=>t.createElement(j,{...e},t.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"18",cy:"18",r:"4"}),t.createElement("path",{d:"M18 16.5V18l1 1"})),go=e=>t.createElement(j,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),pt=e=>t.createElement(j,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),sr=e=>t.createElement(j,{...e},t.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),t.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),ho=e=>t.createElement(j,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),dr=e=>t.createElement(j,{...e},t.createElement("path",{d:"M3 18h18"}),t.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),t.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),t.createElement("path",{d:"M4 21v-3M20 21v-3"})),Si=e=>t.createElement(j,{...e},t.createElement("path",{d:"M21 6H11M21 12H11M21 18H11"}),t.createElement("path",{d:"m3 8 4 4-4 4"})),Di=e=>t.createElement(j,{...e},t.createElement("path",{d:"M21 6H11M21 12H11M21 18H11"}),t.createElement("path",{d:"m7 8-4 4 4 4"}));function bo(e){let o=m.interop.services.providers(Lo)[0];if(!o)return;let r=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;o.invoke("open",[{query:r}]).then(n=>{n.ok||console.warn(`[todo] Failed to open location: ${n.error.message}`)})}var Ai=({value:e,onChange:o})=>{let r=m.ui.ResourcePicker;return t.createElement("div",{className:"todo-location"},t.createElement("div",{className:"todo-location-row"},t.createElement(r,{className:"todo-detail-inline-input todo-location-input",value:e?.name??"",placeholder:d("todo.locationPlaceholder"),ariaLabel:d("todo.location"),kinds:["place"],allowCustom:!0,onChange:(n,a)=>{let i=Number(a?.metadata?.longitude),s=Number(a?.metadata?.latitude);o(n?{name:n,...Number.isFinite(i)&&Number.isFinite(s)?{lng:i,lat:s}:{}}:void 0)}}),e&&t.createElement(t.Fragment,null,t.createElement("button",{className:"todo-menu-btn",type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>bo(e)},t.createElement(wi,null)),t.createElement("button",{className:"todo-menu-btn",type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onClick:()=>{o(void 0)}},t.createElement(Ne,null)))))};var ve={kind:"smart",id:"all"},lr=[{id:"scheduled",labelKey:"todo.view.scheduled",color:be("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:be("primary-blue"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:be("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:be("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:be("green"),dated:!1}],Ei=lr.map(e=>e.id);function en(e){let o=e&&typeof e=="object"?e:{},r=[];for(let i of Array.isArray(o.order)?o.order:[])typeof i=="string"&&Ei.includes(i)&&!r.includes(i)&&r.push(i);for(let i of Ei)r.includes(i)||r.push(i);let n=Array.isArray(o.hidden)?o.hidden:[],a=r.filter(i=>n.includes(i));return a.length===r.length&&a.shift(),{order:r,hidden:a}}function Ci(e){return e.order.filter(o=>!e.hidden.includes(o)).map(o=>mt(o))}function mt(e){return lr.find(o=>o.id===e)??lr[3]}function Ni(e,o,r=Te(new Date)){if(o.kind==="groups")return e.group?new Set(o.names.map(Q)).has(Q(e.group)):o.includeUngrouped===!0;if(o.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===o.name.toLowerCase());if(o.kind==="nogroup")return!e.group;switch(o.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function cr(e,o,r,n=Te(new Date)){return Ni(e,o,n)?o.kind==="smart"&&o.id==="completed"?e.completed:r||!e.completed:!1}function Ii(e,o,r=Te(new Date)){return e.filter(n=>{if(!n.completed)return!1;if(o.kind==="groups")return Ni(n,o,r);if(o.kind==="tag")return(n.tags??[]).some(a=>a.replace(/^#/,"").toLowerCase()===o.name.toLowerCase());if(o.kind==="nogroup")return!n.group;switch(o.id){case"scheduled":return!!n.dueDate;case"today":return!!n.dueDate&&n.dueDate.slice(0,10)<=r;case"flagged":return!!n.flagged;default:return!0}}).length}function Li(e,o=Te(new Date)){let r={scheduled:0,today:0,flagged:0,all:0,completed:0};for(let n of e){if(n.completed){r.completed++;continue}r.all++,n.flagged&&r.flagged++;let a=n.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=o&&r.today++)}return r}function ur(e,o){let r=o===null?null:Q(o);return e.filter(n=>!n.completed&&(r===null?!n.group:Q(n.group??"")===r)).length}function ft(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Tl=lr.map(e=>e.id);function tn(e){if(typeof e!="string")return ve;let o=e.trim();if(o==="nogroup")return{kind:"nogroup"};if(o.startsWith("tag:")){let r=o.slice(4).trim();return r?{kind:"tag",name:r}:ve}if(o.startsWith("group:")){let r=o.slice(6).trim();return r?{kind:"groups",names:[r]}:ve}if(o.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(o.slice(7)));if(!r||typeof r!="object")return ve;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:ve}catch{return ve}return Tl.includes(o)?{kind:"smart",id:o}:o.startsWith("due:")?{kind:"smart",id:o==="due:today"?"today":"scheduled"}:ve}function pr(e,o){return ft(e)===ft(o)}var kl="todo.view",Sl="todo.showCompleted",Dl="todo.statusFilter",Al="todo.search",El="todo.pageSort",an="panelChip",Mi="pageShowCompleted",on="statusFilter",sn="dateBreakdown",Oi="smartLists",yo="pageSearch",_i="pageSort",Cl={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Fi=["due","priority","flagged","updated","created","name"];function Pi(e){let o=e&&typeof e=="object"?e:{};return{compact:o.compact!==!1,sortField:Fi.includes(o.sortField)?o.sortField:"due",sortDir:o.sortDir==="asc"?"asc":"desc",showCompleted:o.showCompleted===!0,statusFilter:zt(o.statusFilter),groupNames:Array.isArray(o.groupNames)?[...new Set(o.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:o.includeUngrouped===!0}}function gr(e){let o=Cl[e],r=t.useCallback(()=>Pi(m.settings.get()[o]),[o]),[n,a]=t.useState(r);t.useEffect(()=>m.settings.subscribe(()=>a(r())),[r]);let i=t.useCallback(s=>{a(l=>{let u=Pi({...l,...s});return m.settings.set(o,u),u})},[o]);return[n,i]}function fr(){let e=m.settings.get()[sn];return e==="weekly"||e==="daily"?e:"monthly"}function hr(){let[e,o]=t.useState(fr);return t.useEffect(()=>m.settings.subscribe(()=>o(fr())),[]),e}function Xt(){return m.runtime.getOrCreate(kl,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function br(){return m.runtime.getOrCreate(Sl,()=>({show:null,listeners:new Set}))}function yr(){return m.runtime.getOrCreate(Dl,()=>({filter:null,listeners:new Set}))}function vo(){return m.runtime.getOrCreate(Al,()=>({query:null,listeners:new Set}))}function vr(){return m.runtime.getOrCreate(El,()=>({value:null,listeners:new Set}))}function At(){let e=Xt();return e.view||(e.view=tn(m.settings.get()[an]),e.history=[e.view],e.historyIndex=0),e.view}function _e(e){let o=Xt();if(At(),o.view&&pr(o.view,e))return;let r=o.history.slice(0,o.historyIndex+1);o.history=[...r,e].slice(-20),o.historyIndex=o.history.length-1,o.view=e,m.settings.set(an,ft(e));for(let n of o.listeners)n(e)}function wr(){let e=Xt();return At(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function Zt(e){let o=Xt();At();let r=o.historyIndex+e;if(!(r<0||r>=o.history.length)){o.historyIndex=r,o.view=o.history[r],m.settings.set(an,ft(o.view));for(let n of o.listeners)n(o.view)}}function dn(e){let o=Xt();return o.listeners.add(e),()=>{o.listeners.delete(e)}}function zi(){let e=Xt();e.view=null,e.history=[],e.historyIndex=-1,br().show=null,yr().filter=null,vo().query=null,vr().value=null}function wo(){return en(m.settings.get()[Oi])}function Gi(e){m.settings.set(Oi,en(e))}function $i(){let[e,o]=t.useState(wo);return t.useEffect(()=>m.settings.subscribe(()=>o(wo())),[]),e}function Ki(e){let o=vo(),r=e.slice(0,500);if(o.query!==r){o.query=r,m.settings.set(yo,r);for(let n of o.listeners)n(r)}}function xr(){let e=()=>{let n=vo();return n.query===null&&(n.query=typeof m.settings.get()[yo]=="string"?String(m.settings.get()[yo]).slice(0,500):""),n.query},[o,r]=t.useState(e);return t.useEffect(()=>{let n=vo();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[o,Ki]}function ln(e){let o=e&&typeof e=="object"?e:{};return{field:o.field==="auto"||Fi.includes(o.field)?o.field:"auto",dir:o.dir==="desc"?"desc":"asc"}}function Ri(){let e=vr();return e.value||(e.value=ln(m.settings.get()[_i])),e.value}function Vi(e){let o=vr(),r=ln(e);if(!(o.value?.field===r.field&&o.value.dir===r.dir)){o.value=r,m.settings.set(_i,r);for(let n of o.listeners)n(r)}}function Hi(){let[e,o]=t.useState(Ri);return t.useEffect(()=>{let r=vr();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,Vi]}function Tr(){return{v:1,view:ft(At()),showCompleted:nn(),statusFilter:mr(),search:vo().query??(typeof m.settings.get()[yo]=="string"?String(m.settings.get()[yo]).slice(0,500):""),sort:Ri()}}function kr(e){return e.v!==1?!1:(_e(tn(e.view)),Nt(e.showCompleted===!0),rn(zt(e.statusFilter)),Ki(typeof e.search=="string"?e.search:""),Vi(ln(e.sort)),!0)}function mr(){let e=yr();if(e.filter===null){let o=m.settings.get()[on];e.filter=zt(o),typeof o=="string"&&o!=="all"&&e.filter!=="all"&&m.settings.set(on,e.filter)}return e.filter}function rn(e){let o=yr(),r=zt(e),n=o.filter??mr();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){o.filter=r,m.settings.set(on,r);for(let a of o.listeners)a(r)}}function Et(){let[e,o]=t.useState(mr);return t.useEffect(()=>{let r=yr();r.listeners.add(o);let n=m.settings.subscribe(()=>{let a=zt(r.filter??mr());rn(a)});return()=>{r.listeners.delete(o),n()}},[]),[e,rn]}function Ct(){let[e,o]=t.useState(At);return t.useEffect(()=>dn(o),[]),e}function nn(){let e=br();return e.show===null&&(e.show=m.settings.get()[Mi]===!0),e.show}function Nt(e){let o=br();if(o.show!==e){o.show=e,m.settings.set(Mi,e);for(let r of o.listeners)r(e)}}function gt(){let[e,o]=t.useState(nn);return t.useEffect(()=>{let r=br();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,()=>Nt(!nn())]}function Sr(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Nl=["normal","low","medium","high"];function ji(e,o){return e&&Nl.includes(e)?e:o}function Il(e){let o=[];return e.filePath&&o.push("note"),e.attachments?.length&&o.push("attachment"),e.urls?.length&&o.push("link"),e.location&&o.push("location"),o.length>0?o:void 0}function Ll(e,o){return e.dueDate?{badges:Il(e),icon:"list-todo",id:e.id,documentRef:{pluginId:m.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Pe(e.group,o)}:{}}:null}function Pl(e,o){return{...e,title:o.title?.trim()||e.title,dueDate:o.date??e.dueDate,startTime:"startTime"in o?o.startTime:e.startTime,endTime:"endTime"in o?o.endTime:e.endTime,note:"note"in o?o.note??"":e.note,location:"location"in o?o.location:e.location,urls:"urls"in o?o.urls:e.urls,attachments:"attachments"in o?o.attachments:e.attachments,group:"group"in o?o.group:e.group,tags:o.tags??e.tags,priority:ji(o.priority,e.priority),filePath:"filePath"in o?o.filePath:e.filePath,completed:o.completed??e.completed,updatedAt:new Date().toISOString()}}async function Dr(e){return(await oe()).find(o=>o.id===e)??null}function Ui(e){let o=e.lastIndexOf("/");return o===-1?e:e.slice(o+1)}var cn="attachment:",un="url:";function Ml(){try{return!!m.interop.services.providers(Lo)[0]}catch{return!1}}function Ol(e){let o=[{id:"open-todo",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Ui(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${cn}${i}`,label:Ui(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${un}${i}`,label:i,icon:"link"}))}),e.location&&Ml()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&o.push(...r),o}async function _l(e,o){if(o.startsWith(cn)){let r=o.slice(cn.length);return(e.attachments??[]).includes(r)?(m.workspace.openFile(r),!0):!1}if(o.startsWith(un)){let r=o.slice(un.length);if(!(e.urls??[]).includes(r))return!1;let n=_t(r);return n?m.workspace.openFile(n):m.files.openExternalUrl(r),!0}switch(o){case"open-todo":case"edit":return await m.workspace.revealOwnPanel("left_sidebar"),_e(e.completed?{kind:"smart",id:"completed"}:ve),at().request(e.id,o==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(m.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(bo(e.location),!0):!1;default:return!1}}function Bi(){let e={integration:{name:"To-Do",version:"2.0.0",author:"Yanik",description:"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, nested subtasks, attachment-linked panels, and timestamped activity.",localized:{de:{name:"To-Do",description:"Strukturierter Aufgabenmanager mit intelligenten Listen, Mehrfach-Gruppenfiltern, Status, Wischaktionen, verschachtelten Unteraufgaben, an Anh\xE4nge gebundenen Bereichen und Aktivit\xE4ten mit Zeitstempel."},es:{name:"To-Do",description:"Gestor de tareas estructurado con listas inteligentes, filtros de varios grupos, estados, gestos, subtareas anidadas, paneles vinculados a adjuntos y actividad con fecha y hora."},fr:{name:"To-Do",description:"Gestionnaire de t\xE2ches structur\xE9 avec listes intelligentes, filtres multigroupes, statuts, gestes, sous-t\xE2ches imbriqu\xE9es, panneaux li\xE9s aux pi\xE8ces jointes et activit\xE9 horodat\xE9e."},"zh-CN":{name:"To-Do",description:"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\u5668\uFF0C\u652F\u6301\u667A\u80FD\u5217\u8868\u3001\u591A\u5206\u7EC4\u7B5B\u9009\u3001\u72B6\u6001\u3001\u6ED1\u52A8\u64CD\u4F5C\u3001\u5D4C\u5957\u5B50\u4EFB\u52A1\u3001\u9644\u4EF6\u5173\u8054\u9762\u677F\u548C\u5E26\u65F6\u95F4\u6233\u7684\u6D3B\u52A8\u8BB0\u5F55\u3002"}}},list:async()=>{let s=Ge();return(await Ca()).map(l=>Ll(l,s)).filter(l=>!!l)},create:async(s,l)=>{let u=l.title?.trim();if(!u)return!1;let p=new Date().toISOString();return jo({id:Sr("todo"),title:u,completed:l.completed??!1,priority:ji(l.priority,"normal"),dueDate:s,startTime:l.startTime,endTime:l.endTime,note:l.note??"",location:l.location,urls:l.urls,attachments:l.attachments,group:l.group,tags:l.tags??[],filePath:l.filePath,createdAt:p,updatedAt:p})},update:async(s,l)=>{let u=await Dr(s);return u?Vt(u.id,Pl(u,l),u.updatedAt):!1},remove:s=>Na(s),open:async s=>{let l=await Dr(s);await m.workspace.revealOwnPanel("left_sidebar"),l&&(_e(l.completed?{kind:"smart",id:"completed"}:ve),at().request(l.id,"focus"))},configure:()=>m.workspace.openOwnSettings(),actions:async s=>{let l=await Dr(s);return l?Ol(l):[]},runAction:async(s,l)=>{let u=await Dr(s);return u?_l(u,l):!1}},o=0,r=()=>{m.interop.state.publish(Io,++o)};m.interop.state.publish(Io,o);let n=wa(r),a=Pa(r),i=m.interop.services.provide(No,e);return()=>{n(),a(),i(),m.interop.state.publish(Io,null)}}function qi(e,o,r){let n=new Date().toISOString();return{id:Sr("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:o,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function pn(e){if(e==null)return"";if(e<60)return`${e}m`;let o=Math.floor(e/60),r=e%60;return r===0?`${o}h`:`${o}:${String(r).padStart(2,"0")}`}function Wi(e,o){let r=e.trim();if(!r)return;let n=o.trim();return n?`${r}T${n}`:r}function Yi(e){let o=e.split("/"),r=o[o.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}var Xe=e=>typeof e=="string"?e:"",Xi=e=>e===!0,Zi=e=>typeof e=="number"&&Number.isFinite(e)?e:void 0,fn=e=>Array.isArray(e)?e.filter(o=>typeof o=="string"):[];function Ji(e){let o=Xe(e).replace(/\\/g,"/").replace(/^\.\//,"");return o===".valley"||o.startsWith(".valley/")?"":o}function Fl({record:e,ctx:o}){let{compact:r}=o,n=Xi(e.completed),a=Xe(e.title)||o.title,i=Xe(e.priority),s=je.find(N=>N.id===i)?.symbol,l=Xe(e.note),u=[...new Set([...fn(e.tags),...o.tags])],p=Xe(e.dueDate),f=Zi(e.estimatedMinutes),g=Zi(e.actualMinutes),w=$t(e.status),T=w&&w!=="open"?Me(w):void 0,h=Xe(e.filePath),I=Xe(e.group),z=Xi(e.flagged),q=fn(e.urls).length,k=fn(e.attachments).length,E=!!(p||I||k||q||f!==void 0||!r&&g!==void 0||T);return t.createElement("article",{className:`todo-row search-card${n?" completed":""}${h?" todo-row-linked":""}${r?" compact":""}${z?" flagged":""}`,onClick:N=>o.onOpen({newTab:m.ui.hasModKey(N)})},t.createElement("input",{className:"todo-check",type:"checkbox",checked:n,readOnly:!0,tabIndex:-1,"aria-hidden":!0}),t.createElement("div",{className:"todo-row-main"},t.createElement("h4",null,s&&t.createElement("span",{className:`todo-priority-inline todo-priority-${i}`},s," "),a),!r&&l.trim()&&t.createElement(m.ui.MarkdownView,{className:"todo-notes",value:l,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:Xe(e.id)},sourcePath:h||void 0}}),!r&&u.length>0&&t.createElement("div",{className:"todo-tags-view"},u.map(N=>t.createElement("span",{key:N,className:"todo-tag-view-pill"},"#",N))),E&&t.createElement("div",{className:"todo-view-meta"},I&&t.createElement("span",{className:"todo-group-text",style:{color:Ae(Pe(I,Ge()))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),I),T&&t.createElement("span",{className:`todo-status-badge ${T.cls}`},t.createElement(ye,{status:w??null,dotCls:T.cls}),it(w)),p&&t.createElement("span",{className:"todo-date"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(pt,null)),ze(p,m.getState().dateFormat)),k>0&&t.createElement("span",{className:"todo-attach-count"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Dt,null)),k),!!q&&t.createElement("span",{className:"todo-meta-glyph"},t.createElement(ot,null)),f!==void 0&&t.createElement("span",{className:"todo-time-badge"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(rr,null)),t.createElement("span",{className:"todo-time-label"},m.ui.t("todo.estimated"))," ",pn(f)),!r&&g!==void 0&&t.createElement("span",{className:"todo-time-badge"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(We,null)),t.createElement("span",{className:"todo-time-label"},m.ui.t("todo.actual"))," ",pn(g)))),t.createElement("div",{className:"todo-row-actions"},z&&t.createElement("span",{className:"todo-flag-mark"},t.createElement(Oe,null))))}function Qi(e){let o={cardKind:"todo",render:(r,n)=>t.createElement(Fl,{record:r,ctx:n}),open:async(r,n)=>{if(Xe(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:Xe(r.id)}),!0;let a=Ji(r.filePath)||Ji(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(Rn,o)}function ht(){return t.useSyncExternalStore(m.subscribe,m.getState,m.getState)}function Ar(){let e=t.useCallback(i=>m.interop.state.subscribe(zr,i),[]),o=t.useCallback(()=>m.interop.state.get(zr),[]),r=t.useSyncExternalStore(e,o,o),n=r?.rangeStart??null,a=r?.rangeEnd??null;return t.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function es(){let[e,o]=t.useState(new Set),r=t.useRef(new Set),n=t.useCallback((i,s)=>{let l=new Set(r.current);s?l.add(i):l.delete(i),r.current=l,o(l)},[]),a=t.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var zl="todo.sharedTodos";function mn(){return m.runtime.getOrCreate(zl,()=>({todos:[],listeners:new Set}))}function ge(){return mn().todos}function rt(e){let o=mn();o.todos=e;for(let r of o.listeners)r(e)}function bt(e){let o=mn();return o.listeners.add(e),()=>{o.listeners.delete(e)}}function Ze(){return m.workspace.openSettings("groups"),Promise.resolve()}var ts=[Ur.find(e=>e.id==="completed"),...Ur.filter(e=>e.id!=="completed")];function It(){return m.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function os(){for(let e of It().listeners)e()}function gn(e){It().actions=e,os()}function hn(e,o){e?It().selected.set(o,e):It().selected.delete(o),os()}function Gl(e){let o=Tr(),r=ge().find(n=>n.id===It().selected.get(e));return{title:d("manifest.name"),view:o,actions:It().actions??[],...r?{item:{id:r.id,title:r.title,state:{...o,todoId:r.id}}}:{},navigation:{...wr(),goBack:()=>Zt(-1),goForward:()=>Zt(1)}}}function $l(e){let o=It().listeners;o.add(e);let r=bt(e),n=dn(e),a=m.settings.subscribe(e);return()=>{o.delete(e),r(),n(),a()}}async function Kl(e,o,r=!1){if(typeof e.todoId=="string"&&!(await oe()).some(n=>n.id===e.todoId))throw new Error("The bookmarked task no longer exists.");if(!kr(e))throw new Error("Unsupported To-Do bookmark.");hn(typeof e.todoId=="string"?e.todoId:null,o),!r&&typeof e.todoId=="string"&&at().request(e.todoId,"focus")}function Rl({label:e,color:o,todos:r}){let[n,a]=t.useState(!1);return t.createElement("section",{className:`todo-status-group${n?" expanded":""}`},t.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},t.createElement("span",{className:"todo-status-group-name"},t.createElement("span",{className:"props-info-dot",style:{background:o}}),e),t.createElement("span",{className:"todo-status-group-meta"},t.createElement("span",null,r.length),t.createElement(tt,null))),n&&t.createElement("div",{className:"todo-group-status-breakdown"},ts.map(i=>t.createElement("div",{className:"todo-group-status-row",key:i.id},t.createElement("span",null,d(i.labelKey)),t.createElement("span",null,r.filter(s=>Ee(s)===i.id).length)))))}function Vl(){let e=t.useSyncExternalStore(bt,ge,ge),o=He(),r=Ct(),n=r.kind==="smart"?d(mt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return t.createElement("div",{className:"right-panel-body props-info"},t.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...ts.map(a=>[d(a.labelKey),e.filter(i=>Ee(i)===a.id).length])].map(([a,i])=>t.createElement("div",{className:"props-info-row",key:a},t.createElement("dt",{className:"props-info-key"},a),t.createElement("dd",{className:"props-info-value"},i)))),t.createElement("div",{className:"todo-status-groups"},[...xe(o),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(l=>a===null?!l.group:Q(l.group??"")===Q(a)),s=a??d("todo.chip.noGroup");return t.createElement(Rl,{key:a??"ungrouped",label:s,color:a?Ae(Pe(a,o)):"var(--text-tertiary)",todos:i})})))}function Hl(){let e=t.useSyncExternalStore(bt,ge,ge),o=He(),r=Ct();return t.createElement("div",{className:"right-panel-body props-info"},t.createElement(xo,{embedded:!0,todos:e,groups:o,names:xe(o),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>_e(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:ve),onOpenSettings:Ze}))}function rs(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>e.interop.extensions.provide(Vn,{id:`todo.${n}`,surface:n,getSnapshot:()=>Gl(n),subscribe:$l,restore:(a,i,s)=>Kl(a,n,s?.background)}));return r.push(e.interop.extensions.provide(Gr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=(await oe()).find(i=>i.id===n?.item?.id);return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>t.createElement(Vl,null)})),r.push(e.interop.extensions.provide(Gr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>Ge().map(n=>({id:n.id,label:n.name,value:ge().filter(a=>Q(a.group??"")===Q(n.name)).length,readOnly:!0})),render:()=>t.createElement(Hl,null)})),()=>r.forEach(n=>n())}function Jt(e,o,r="main_workspace"){let[n,a]=t.useState(ge()),[i,s]=t.useState(null),[l,u]=t.useState(null),[p,f]=t.useState(null),[g,w]=t.useState(!0),[T,h]=t.useState(0),[I,z]=t.useState(!1),{pendingIds:q,isPending:k,setPending:E}=es(),N=t.useRef(!1),S=t.useRef(0),U=t.useRef({sortField:e,sortDir:o});U.current={sortField:e,sortDir:o};let G=t.useRef([]),te=t.useMemo(()=>{let _=new Map(n.map(R=>[R.id,R])),B=[];for(let R of G.current){let F=_.get(R);F&&B.push(F)}for(let R of n)G.current.includes(R.id)||B.push(R);return B},[n,T]),re=t.useCallback(_=>{let B=++S.current;_&&w(!0),oe().then(R=>{if(B===S.current){if(_){let{sortField:F,sortDir:X}=U.current;G.current=Ut(R,F,X).map(J=>J.id)}else{let F=new Set(R.map(O=>O.id)),X=G.current.filter(O=>F.has(O)),J=new Set(X),{sortField:c,sortDir:v}=U.current,A=Ut(R.filter(O=>!J.has(O.id)),c,v).map(O=>O.id);G.current=[...A,...X]}rt(R),w(!1)}}).catch(()=>{B===S.current&&w(!1)})},[]);t.useEffect(()=>{re(!0)},[re]),t.useEffect(()=>lt(()=>re(!1)),[re]);let x=t.useRef(!0);t.useEffect(()=>{if(x.current){x.current=!1;return}G.current=Ut(ge(),e,o).map(_=>_.id),h(_=>_+1)},[e,o]),t.useEffect(()=>bt(_=>a(_)),[]);let W=t.useCallback(()=>s(null),[]),Y=t.useCallback(_=>{hn(_,r),f(_)},[r]),ie=t.useCallback(()=>f(null),[]),ke=t.useCallback(async(_,B,R)=>{if(N.current)return null;let F=_.trim();if(!F)return null;let X={...qi(F,B),...R?.patch};N.current=!0,z(!0),G.current=[X.id,...G.current],rt([X,...ge()]),s(X.id);let J=()=>{G.current=G.current.filter(c=>c!==X.id),rt(ge().filter(c=>c.id!==X.id)),s(c=>c===X.id?null:c)};try{let c=await jo(X);return c||J(),c?X:null}catch{return J(),null}finally{N.current=!1,z(!1)}},[]),le=t.useCallback(async(_,B,R)=>{if(k(_))return!1;let F=ge().find(J=>J.id===_);if(!F)return!1;let X={...F,...B,updatedAt:new Date().toISOString()};E(_,!0),rt(ge().map(J=>J.id===_?X:J));try{return await Vt(_,X,F.updatedAt,R)?!0:(rt(ge().map(c=>c.id===_?F:c)),!1)}catch{return rt(ge().map(J=>J.id===_?F:J)),!1}finally{E(_,!1)}},[k,E]),ee=t.useCallback(async(_,B,R)=>{let F=await le(_,B,R);if(!F||B.completed!==!0)return F;let X=ge();for(let J of Ke(X,_))X.find(c=>c.id===J)?.completed||await le(J,{completed:!0,status:B.status??"completed"});return!0},[le]),Ie=t.useCallback(async _=>{let B=ge(),R=B.find(c=>c.id===_);if(!R)return;let F=[...Ke(B,_).reverse(),_];if(F.some(c=>k(c)))return;let X=B.filter(c=>F.includes(c.id));for(let c of F)E(c,!0);G.current=G.current.filter(c=>!F.includes(c)),rt(B.filter(c=>!F.includes(c.id))),s(c=>F.includes(c??"")?null:c),F.includes(p??"")&&f(null);let J=()=>{G.current=[...G.current,...X.map(v=>v.id).filter(v=>!G.current.includes(v))];let c=ge();rt([...c,...X.filter(v=>!c.some(A=>A.id===v.id))])};try{await Ia(F,R.title)||J()}catch{J()}finally{for(let c of F)E(c,!1)}},[p,k,E]);return{todos:n,loading:g,ordered:te,lastCreatedId:i,clearLastCreated:W,menuId:l,setMenuId:u,editingId:p,openDetail:Y,closeDetail:ie,pendingIds:q,creating:I,create:ke,patchTodo:ee,removeTodo:Ie}}function bn({value:e,onChange:o,disabled:r}){let n=m.ui.ResourcePicker;return t.createElement(n,{value:e,onChange:o,kinds:["attachment"],placeholder:d("auto.e7de9576dc00"),disabled:r,ariaLabel:d("auto.8410192cbb1f"),allowCustom:!1})}var Ul=[".csv"],jl=[".base"],Bl=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],ql=[".pdf"],Wl=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Yl=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Xl=[".stl",".obj",".glb",".gltf"];function yn(e){let o=e.split("/").pop()??e,r=o.lastIndexOf(".");return r>0?o.slice(r).toLowerCase():""}var Zl={type:"core",id:"valley"},Z=(e,o,r,n,a={})=>({kind:e,icon:o,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Zl,...a});function Jl(e){let o={};for(let[r,n]of e)for(let a of r)o[a]=n;return o}var Ql=Jl([[[".md",".markdown"],Z("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],Z("text","text","text","notes")],[[".json"],Z("json","json","json","data",{editable:!0})],[[".jsonl"],Z("json","json","jsonl","data",{editable:!0})],[Ul,Z("csv","csv","csv","data",{editable:!0})],[jl,Z("base","base","fallback","data")],[Bl,Z("image","image","image","media",{information:["identity","dimensions","exif"]})],[ql,Z("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Wl,Z("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Yl,Z("video","video","video","media",{information:["identity","media","video-codec"]})],[Xl,Z("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],Z("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],Z("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],Z("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],Z("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],Z("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],Z("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],Z("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],Z("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],Z("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],Z("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],Z("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],Z("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],Z("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],Z("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],Z("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],Z("code","code","code","code",{codeLanguage:"Go"})],[[".java"],Z("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],Z("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],Z("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],Z("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],Z("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],Z("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],Z("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],Z("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],Z("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),ec=Z("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function tc(e){return Ql[yn(e)]??ec}function vn(e){return tc(e).kind}var ns="valley-vault",as="asset";function is(e){return`${ns}://${as}/${encodeURIComponent(e)}`}var oc={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function rc(e){if(!Number.isFinite(e)||e<0)return"";let o=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<o.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${o[n]}`}function wn(e){let o=oc[vn(e)];if(o)return d(o);let r=yn(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var nc={image:xi,audio:Ti,video:ki},ss=({relPath:e,onRemove:o})=>{let[r,n]=t.useState(null),a=vn(e),i=e.split("/").pop()??e,s=nc[a]??ir;t.useEffect(()=>{let f=!1;return m.vault.fileInfo(e).then(g=>{f||n(g?.size??null)}),()=>{f=!0}},[e]);let[l,u]=t.useState(0);t.useEffect(()=>m.vault.onChanged(()=>u(f=>f+1)),[]);let p=a==="image"?`${is(e)}?v=${l}`:null;return t.createElement("div",{className:"todo-attach-card"},t.createElement("button",{className:"todo-attach-open",type:"button",onClick:f=>m.workspace.openFile(e,void 0,{newTab:m.ui.hasModKey(f)}),title:e},t.createElement("span",{className:"todo-attach-copy"},t.createElement("span",{className:"todo-attach-name"},i),t.createElement("span",{className:"todo-attach-meta"},wn(e),r!==null&&` \xB7 ${rc(r)}`)),t.createElement("span",{className:"todo-attach-thumb"},p?t.createElement("img",{src:p,alt:"",loading:"lazy"}):t.createElement(s,null))),o&&t.createElement("button",{className:"todo-attach-remove",type:"button",onClick:o,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},t.createElement(Ne,null)))};function xn(e,o=500,r){let n=t.useRef(e);n.current=e;let a=t.useRef(null),i=t.useRef(!1),s=t.useRef(null),l=t.useRef(0),u=t.useRef(r);u.current=r;let p=t.useCallback(async()=>{if(i.current)return;let f=a.current;if(f!==null){a.current=null,i.current=!0;try{let g=await n.current(f);!g&&a.current===null&&(a.current=f),g?l.current=0:l.current+=1}catch{a.current===null&&(a.current=f),l.current+=1}finally{i.current=!1,a.current!==null&&l.current<3?s.current=window.setTimeout(()=>{p()},250):a.current!==null&&u.current?.()}}},[]);return t.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),p()},[p]),t.useCallback(f=>{a.current=f,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,p()},o)},[p,o])}function ac({value:e,onCommit:o,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,l]=t.useState(e),u=t.useRef(!1);t.useEffect(()=>{u.current||l(e)},[e]);let p=()=>{s!==e&&o(s)};return t.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{u.current=!0},onChange:f=>l(f.target.value),onBlur:()=>{u.current=!1,p()},onKeyDown:f=>{f.key==="Enter"&&f.currentTarget.blur(),f.key==="Escape"&&(l(e),f.currentTarget.blur())}})}function ic(e){let o=m.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=o.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},o.set(e,r)),r}var sc=({todoId:e,c:o,indexEntries:r,close:n})=>{let{Toggle:a,SelectField:i,Segmented:s,DateField:l,TimeField:u}=m.ui.settings,[p,f]=t.useState(ge);t.useEffect(()=>bt(f),[]);let g=p.find(c=>c.id===e),w=He(),[T,h]=t.useState(!1),[I,z]=t.useState(""),[q,k]=t.useState(!1),[E,N]=t.useState(""),S=ic(e),U=t.useSyncExternalStore(t.useCallback(c=>(S.listeners.add(c),()=>{S.listeners.delete(c)}),[S]),()=>S.value,()=>S.value),G=t.useCallback(c=>{S.value={...S.value,...c};for(let v of S.listeners)v()},[S]),te=U.title,re=c=>G({title:c}),x=()=>G({error:d("todo.error.saveDraft")});t.useEffect(()=>{S.revision||S.loadingRevision||(S.loadingRevision=m.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(c=>{c&&!S.revision&&(S.revision={expectedRevision:c.revision,vaultGeneration:c.vaultGeneration})}).catch(()=>{G({error:d("todo.error.saveDraft")})}).finally(()=>{S.loadingRevision=void 0}))},[S,e,G]);let W=async c=>(S.revision||await S.loadingRevision,S.revision?o.patchTodo(e,c,S.revision):!1),Y=xn(async c=>{let v=c.trim()?await W({title:c}):!0;return v&&S.value.title===c&&G({title:null,error:""}),v},500,x),ie=xn(async c=>{let v=await W({note:c});return v&&S.value.note===c&&G({note:null,error:""}),v},500,x),ke=xn(async c=>{let v=JSON.parse(c),A=await W({tags:v});return A&&JSON.stringify(S.value.tags)===c&&G({tags:null,error:""}),A},0,x),le=t.useMemo(()=>p.filter(c=>c.title.trim()&&Bt(p,e,c.id)).map(c=>({value:c.id,label:c.title})),[p,e]);if(t.useEffect(()=>{g||n()},[g,n]),!g)return null;let ee=c=>{W(c).then(v=>{v||x()})},Ie=c=>{G({tags:c}),ke(JSON.stringify(c))},ue=c=>ee({attachments:c.length?c:void 0}),_=c=>ee({urls:c.length?c:void 0}),B=g.remindAt?.slice(0,10)??"",R=g.remindAt?.slice(11,16)??"",F=(c,v)=>ee({remindAt:Wi(c,v),reminderFiredAt:void 0}),X=xe(w),J=g.parentId?p.find(c=>c.id===g.parentId)?.title??"":"";return t.createElement(m.ui.Modal,{title:d("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:n,footer:t.createElement(t.Fragment,null,t.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{so(g,o.removeTodo)}},d("auto.f6fdbe48dc54")),t.createElement("button",{type:"button",className:"btn-primary",onClick:n},d("todo.edit.done")))},U.error&&t.createElement("p",{role:"alert"},U.error),t.createElement("div",{className:"todo-detail-title-row"},t.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:te??g.title,"aria-label":d("auto.c5e8306a511f"),onChange:c=>{re(c.target.value),Y(c.target.value)},onBlur:()=>{te===g.title&&re(null)},onKeyDown:c=>{c.key==="Enter"&&n()}}),t.createElement("button",{className:`todo-detail-flag${g.flagged?" on":""}`,type:"button",onClick:()=>ee({flagged:g.flagged?void 0:!0}),"aria-pressed":!!g.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},t.createElement(Oe,null))),t.createElement("div",{className:"todo-detail-cols"},t.createElement("div",{className:"todo-detail-col"},t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.notes")),t.createElement("div",{className:"todo-detail-notes"},t.createElement(m.ui.NoteInput,{value:U.note??g.note,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:g.id},sourcePath:g.filePath},tags:U.tags??g.tags??[],onTagsChange:Ie,onRevisionChange:c=>{(!S.revision||S.value.note===null&&S.value.title===null&&S.value.tags===null||c.expectedRevision<S.revision.expectedRevision)&&(S.revision=c)},onChange:c=>{G({note:c}),ie(c)},onSave:n,onCancel:n}))),t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.tags")),t.createElement(m.ui.TagInput,{value:U.tags??g.tags??[],onChange:Ie})),t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},t.createElement(Dt,null)," ",d("todo.attachments")),(g.attachments??[]).map(c=>t.createElement(ss,{key:c,relPath:c,onRemove:()=>ue((g.attachments??[]).filter(v=>v!==c))})),T?t.createElement(bn,{value:I,onChange:c=>{z(c),r.some(v=>v.relPath===c)&&((g.attachments??[]).includes(c)||ue([...g.attachments??[],c]),z(""),h(!1))},indexEntries:r}):t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>h(!0)},t.createElement(qe,null)," ",d("todo.addAttachment"))),t.createElement("div",{className:"todo-detail-block todo-detail-links-block"},t.createElement("div",{className:"todo-detail-group-label"},t.createElement(ot,null)," ",d("todo.links")),t.createElement("label",{className:"todo-linked-file-control"},t.createElement("span",null,d("todo.linkedFile")),t.createElement(bn,{value:g.filePath??"",onChange:c=>ee({filePath:c.trim()||void 0}),indexEntries:r})),(g.urls??[]).map(c=>t.createElement("div",{className:"todo-detail-url-card",key:c},t.createElement("button",{className:"todo-detail-url-open",type:"button",title:c,onClick:v=>{let A=_t(c);A?m.workspace.openFile(A,void 0,{newTab:m.ui.hasModKey(v)}):m.files.openExternalUrl(c)}},t.createElement(ot,null),t.createElement("span",null,c)),t.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:c}),onClick:()=>_((g.urls??[]).filter(v=>v!==c))},t.createElement(Ne,null)))),q?t.createElement(ac,{className:"todo-detail-link-input todo-detail-url",value:E,onCommit:c=>{let v=Br(c);v&&!(g.urls??[]).includes(v)&&_([...g.urls??[],v]),N(""),k(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")}):t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>k(!0)},t.createElement(qe,null)," ",d("todo.addWebAppLink")))),t.createElement("div",{className:"todo-detail-col todo-detail-rail"},t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.properties")),t.createElement("label",{className:"todo-detail-field","data-status":Ee(g)},t.createElement("span",{className:"todo-detail-label"},d("auto.bae7d5be7082")),t.createElement(i,{className:"todo-select",value:Ee(g),onChange:c=>ee(Ce(c==="open"?null:c)),ariaLabel:d("auto.bae7d5be7082"),options:st().map(c=>({value:c,label:it(c)}))})),t.createElement("label",{className:"todo-detail-field"},t.createElement("span",{className:"todo-detail-label"},d("auto.886cbff9d9df")),t.createElement(s,{value:g.priority,onChange:c=>ee({priority:c}),ariaLabel:d("auto.886cbff9d9df"),options:je.map(c=>({value:c.id,label:c.symbol||d("todo.priorityNone")}))})),t.createElement("label",{className:"todo-detail-field"},t.createElement("span",{className:"todo-detail-label"},d("todo.edit.group")),t.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:g.group??"",onChange:c=>ee({group:c.trim()||void 0}),options:X.map(c=>({value:c,label:c})),ariaLabel:d("todo.edit.group"),clearLabel:d("todo.chip.noGroup"),allowCustom:!1})),t.createElement("label",{className:"todo-detail-field"},t.createElement("span",{className:"todo-detail-label"},d("todo.tree.subtaskOf")),t.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:J,onChange:c=>{let v=c.trim(),A=le.find(O=>O.label===v);ee({parentId:A?.value||void 0})},options:le,ariaLabel:d("todo.tree.subtaskOf"),clearLabel:d("todo.tree.noParent")}))),t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.schedule")),t.createElement("label",{className:"todo-detail-field"},t.createElement("span",{className:"todo-detail-label"},d("auto.145caf292855")),t.createElement(l,{className:"todo-detail-inline-date",value:g.dueDate,ariaLabel:d("auto.4c1aeebc433b"),onChange:c=>ee({dueDate:c})})),t.createElement("label",{className:"todo-detail-field todo-detail-field-stack"},t.createElement("span",{className:"todo-detail-label"},d("auto.0a8adac9d6d5")),t.createElement("span",{className:"todo-clock-row"},t.createElement(u,{value:g.startTime??"",ariaLabel:d("auto.88d8206d586a"),onChange:c=>ee({startTime:c||void 0})}),t.createElement("span",{className:"todo-clock-dash"},"\u2013"),t.createElement(u,{value:g.endTime??"",ariaLabel:d("auto.cd7800da7f4f"),onChange:c=>ee({endTime:c||void 0})})))),t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.remindMe")),t.createElement("div",{className:"todo-detail-row"},t.createElement("span",{className:"todo-detail-label"},d("todo.onADay")),t.createElement("span",{className:"todo-detail-row-end"},B&&t.createElement(l,{className:"todo-detail-inline-date",value:B,ariaLabel:d("todo.remindDate"),clearable:!1,onChange:c=>F(c,R)}),t.createElement(a,{checked:!!B,onChange:c=>F(c?g.dueDate||dc():"",c?R:""),label:d("todo.onADay")}))),t.createElement("div",{className:"todo-detail-row"},t.createElement("span",{className:"todo-detail-label"},d("todo.atATime")),t.createElement("span",{className:"todo-detail-row-end"},R&&t.createElement(u,{className:"todo-detail-inline-input",value:R,ariaLabel:d("todo.remindTime"),clearable:!1,onChange:c=>F(B,c)}),t.createElement(a,{checked:!!R,disabled:!B,onChange:c=>F(B,c?"09:00":""),label:d("todo.atATime")}))),B&&t.createElement("p",{className:"todo-detail-hint"},d("todo.reminderAppOpenHint"))),t.createElement("div",{className:"todo-detail-block"},t.createElement("div",{className:"todo-detail-group-label"},t.createElement(ar,null)," ",d("todo.location")),t.createElement(Ai,{value:g.location,onChange:c=>ee({location:c})})),t.createElement("div",{className:"todo-detail-block todo-activity-block"},t.createElement("div",{className:"todo-detail-group-label"},d("todo.activity")),(g.statusHistory??[]).length?t.createElement("ol",{className:"todo-activity-list"},[...g.statusHistory??[]].reverse().map((c,v)=>t.createElement("li",{key:`${c.changedAt}:${v}`},t.createElement("span",null,it(c.from)," \u2192 ",it(c.to)),t.createElement("time",{dateTime:c.changedAt},new Date(c.changedAt).toLocaleString(m.ui.language()))))):t.createElement("p",{className:"todo-detail-hint"},d("todo.activity.empty"))))))};function dc(){let e=new Date,o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}var Qt=({c:e,indexEntries:o})=>e.editingId?t.createElement(sc,{key:e.editingId,todoId:e.editingId,c:e,indexEntries:o,close:e.closeDetail}):null;function ds(e){return m.markdown.render(e,{inline:!0})}var lc={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},cc=["tomorrow","weekend","pick"];function uc(e=Te(new Date)){let o=qo(e);if(!o)return e;let r=o.getDay(),n=r===6?1:(6-r+7)%7||7;return jt(e,n)}function Er(e,o=Te(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?jt(o,1):s==="weekend"?uc(o):null,a=new Set,i=[];for(let s of cc){let l=n(s);if(l!==null){if(l===r||a.has(l))continue;a.add(l)}i.push({id:s,labelKey:lc[s],date:l})}return i}var ls=({todo:e,groupNames:o,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1,canIndent:l=!1,canOutdent:u=!1,onIndent:p,onOutdent:f})=>{let g=Ee(e);return t.createElement("div",{className:"todo-menu-wrap"},t.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:w=>{w.stopPropagation(),r(e.id);let T=Er(e.dueDate??"",Te(new Date));m.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:t.createElement(We,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Kt().map(h=>({label:d(h.labelKey),icon:t.createElement(ye,{status:h.status,dotCls:h.cls}),type:"radio",checked:h.status===null?g==="open":g===h.status,onSelect:()=>a(Ce(h.status))}))},{label:d("todo.menu.reschedule"),icon:t.createElement(pt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:T.filter(h=>h.date).map(h=>({label:d(h.labelKey),icon:h.id==="tomorrow"?t.createElement(ho,{className:"todo-menu-action-icon"}):h.id==="weekend"?t.createElement(dr,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:h.date})}))},{label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:t.createElement(Oe,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:()=>a({flagged:e.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:t.createElement(hi,{className:"todo-menu-action-icon"}),enabled:!s,submenu:je.map(h=>({label:la(h.id),type:"radio",checked:e.priority===h.id,onSelect:()=>a({priority:h.id})}))},{label:d("todo.menu.moveGroup"),icon:t.createElement(tr,{className:"todo-menu-action-icon"}),enabled:!s,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>a({group:void 0})},...o.map(h=>({label:h,type:"radio",checked:e.group===h,onSelect:()=>a({group:h})}))]},{type:"separator"},{label:d("todo.tree.indent"),icon:t.createElement(Si,{className:"todo-menu-action-icon"}),enabled:!s&&l&&!!p,onSelect:()=>p?.()},{label:d("todo.tree.outdent"),icon:t.createElement(Di,{className:"todo-menu-action-icon"}),enabled:!s&&u&&!!f,onSelect:()=>f?.()},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:t.createElement(bi,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:n},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:t.createElement(or,{className:"todo-menu-action-icon"}),enabled:!s,danger:!0,onSelect:i}],{anchor:w.currentTarget,align:"end"}).finally(()=>r(null))}},t.createElement(ui,null)))};function pc(e,o,r=.55){return o<=0?0:e*o*r/(o+r*Math.abs(e))}function fc(e,o=.998){return e/1e3*o/(1-o)}function cs(e,o=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=o));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function us(e,o,r){if(o<=0)return 0;let n=Math.abs(e);if(n<=o)return e;let a=Math.max(20,r-o);return Math.sign(e)*(o+pc(n-o,a,.2))}function ps(e){if(e.committed)return{target:0,commit:!0};let o=e.openWidth;if(o<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-o,Math.min(o,fc(e.velocity*r))),i=n+a;return{target:Math.abs(i-o)<Math.abs(i)?r*o:0,commit:!1}}function fs(e,o,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/a)**2,u=2*i*Math.sqrt(l),p=o+(-l*(e-r)-u*o)*s,f=e+p*s,g=Math.abs(f-r)<.5&&Math.abs(p)<20;return{value:g?r:f,velocity:g?0:p,done:g}}function Tn(e,o,r){let n=o.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...o))+22),l=n*s<=i+(r?24:0),u=l?s:48,p=Math.min(n*u,Math.max(i,n*32)),f=a?Math.min(Math.max(e*.8,p+56),e-24):p+56;return{buttonWidth:u,labelled:l,openWidth:p,commitPoint:f}}var ms=.22,gs=.18,mc=.8,Cr=.9,gc=400,hc=80,bc=10,yc=5,vc=4,wc=3,xc=.5,Tc=6,kc=["left","right"],hs={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Sc(e,o,r,n,a,i){return{kind:e,pointerId:o,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function Dc(e,o){let r={today:t.createElement(ho,null),tomorrow:t.createElement(ho,null),weekend:t.createElement(dr,null),pick:t.createElement(pt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?o.reschedule(n.date):o.pickDate(a)}}))}var ko=null;function bs(e){if(ko===e)return;let o=ko;ko=e,o?.close()}function ys(e){ko===e&&(ko=null)}var eo;function vs(e,o){if(eo===void 0)try{eo=document.createElement("canvas").getContext("2d")}catch{eo=null}return eo?(eo.font=o,eo.measureText(e).width):e.length*7}var Ac=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,To=e=>e>0?"left":e<0?"right":null,ws=({todo:e,disabled:o,actions:r,onEngage:n,children:a})=>{let i=t.useRef(null),s=t.useRef(null),l=t.useRef({left:null,right:null}),u=t.useRef(0),p=t.useRef(null),f=t.useRef(null),g=t.useRef([]),w=t.useRef(!1),T=t.useRef(null),h=t.useRef(null),I=t.useRef({velocity:0,target:0,response:ms,damping:Cr}),z=t.useRef({left:"",right:""}),q=t.useMemo(()=>Dc(Er(e.dueDate??"",Te(new Date)),r),[e.dueDate,r]),k=t.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:t.createElement(Oe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:t.createElement(pi,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:t.createElement(or,null),run:()=>r.remove()}],[r,e.flagged]),E={left:q,right:k},[N,S]=t.useState(()=>({rowWidth:0,left:hs,right:hs})),U=t.useRef(N);U.current=N;let G=()=>{let c=i.current?.querySelector(".todo-swipe-action");if(!c||typeof getComputedStyle!="function")return"13px sans-serif";let v=getComputedStyle(c);return`${v.fontWeight} ${v.fontSize} ${v.fontFamily}`},te=()=>{let c=i.current?.clientWidth??0,v=G(),A=U.current,O={rowWidth:c,left:Tn(c,q.map(C=>vs(C.label,v)),A.left.labelled),right:Tn(c,k.map(C=>vs(C.label,v)),A.right.labelled)};U.current=O;let y=C=>A[C].openWidth!==O[C].openWidth||A[C].labelled!==O[C].labelled;return(A.rowWidth!==c||y("left")||y("right"))&&S(O),O},re=t.useRef(te);re.current=te,t.useEffect(()=>{re.current()},[q,k]);let x=c=>{let v=To(c);return!v||v!==f.current?!1:Math.abs(c)>=U.current[v].commitPoint},W=(c,v=!1)=>{u.current=c,v&&c!==0?bs(ee.current):c===0&&ys(ee.current);let A=i.current,O=s.current;if(!A||!O)return;O.style.transform=c?`translate3d(${c}px, 0, 0)`:"";let y=To(c),C=U.current,se=x(c);A.classList.toggle("open",c!==0),A.classList.toggle("committed",se);for(let de of kc){let $=l.current[de];if(!$)continue;let ce=y===de;$.classList.toggle("committed",ce&&se);let D=ce?se?"100%":`${Math.max(C[de].openWidth,Math.abs(c))}px`:`${c===0?C[de].openWidth:0}px`,H=`${D}|${ce}`;z.current[de]!==H&&(z.current[de]=H,$.style.width=D,$.setAttribute("aria-hidden",String(!ce)))}};t.useLayoutEffect(()=>W(u.current));let Y=()=>{T.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(T.current),T.current=null},ie=(c,v,A,O)=>{if(Y(),c!==0&&bs(ee.current),u.current===c||Ac()||typeof requestAnimationFrame!="function"){W(c);return}I.current={velocity:v,target:c,response:A,damping:O};let y=0,C=se=>{let de=y?(se-y)/1e3:.016666666666666666;y=se;let $=I.current,ce=fs(u.current,$.velocity,$.target,de,$.response,$.damping);$.velocity=ce.velocity,W(ce.value),T.current=ce.done?null:requestAnimationFrame(C)};T.current=requestAnimationFrame(C)},ke=t.useRef(()=>{});ke.current=()=>{p.current=null,ie(0,0,gs,Cr)};let le=t.useCallback(()=>ke.current(),[]),ee=t.useRef({close:()=>ke.current()}),Ie=()=>{Y(),p.current=null,h.current!=null&&window.clearTimeout(h.current),h.current=null,W(0)},ue=t.useRef(Ie);ue.current=Ie;let _=c=>{let v=U.current,A=To(c);if(!A)return 0;let O=p.current?.origin;if(O&&A!==O)return 0;let y=v[A],C=A===f.current?y.commitPoint:y.openWidth;return us(c,C,v.rowWidth)},B=(c,v,A,O,y)=>{Y(),te();let C=u.current,se=To(C),de=Math.abs(C)>8?se:null;f.current=se&&Math.abs(C)>=U.current[se].openWidth-1?se:null,p.current=Sc(c,v,A,O,C,de),g.current=[{x:C,t:y}]},R=(c,v)=>{let A=p.current;!A||A.ended||(A.live||(A.live=!0,Y(),n?.()),g.current.push({x:c,t:v}),g.current.length>Tc&&g.current.shift(),W(_(c),!0),x(u.current)&&(A.crossed=!0))},F=c=>{let v=p.current;if(!v||v.ended)return;if(v.ended=!0,!v.live){p.current=null;return}let A=()=>{v.kind==="pointer"&&(p.current=null)},O=cs(g.current),y=u.current,C=To(y);if(!C){A(),W(0);return}let se=U.current[C],de=c&&x(y),$=ps({offset:y,velocity:O,openWidth:se.openWidth,committed:de});if(A(),$.commit){let ce=C==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",D=i.current?.querySelector(ce),H=E[C],he=C==="left"?H[0]:H[H.length-1];ie(0,O,gs,Cr),he?.run(D??i.current);return}ie($.target,O,ms,Math.abs(O)>gc?mc:Cr)};t.useEffect(()=>le(),[e.dueDate,e.flagged,le]),t.useEffect(()=>{let c=ee.current;return()=>{Y(),h.current!=null&&window.clearTimeout(h.current),ys(c)}},[]),t.useEffect(()=>{let c=i.current,v=c?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!c||!v)return;let A=0,O=new v(()=>{let y=c.clientWidth,C=A!==y;A=y,re.current(),C&&u.current!==0&&ue.current()});return O.observe(c),()=>O.disconnect()},[]);let X=t.useRef({disabled:o,begin:B,move:R,end:F});X.current={disabled:o,begin:B,move:R,end:F},t.useEffect(()=>{let c=i.current;if(!c)return;let v=()=>{h.current!=null&&window.clearTimeout(h.current),h.current=null},A=()=>{h.current=null,p.current?.kind==="wheel"&&(X.current.end(!0),p.current=null)},O=y=>{let C=X.current;if(C.disabled||Math.abs(y.deltaX)<=Math.abs(y.deltaY)||y.deltaX===0)return;y.preventDefault();let se=y.deltaMode===WheelEvent.DOM_DELTA_LINE?16:y.deltaMode===WheelEvent.DOM_DELTA_PAGE?c.clientWidth:1,de=-y.deltaX*se,$=p.current;(!$||$.kind!=="wheel")&&(C.begin("wheel",-1,0,0,y.timeStamp),$=p.current),v(),h.current=window.setTimeout(A,hc);let ce=Math.abs(de),D=$.previous;$.previous=ce;let H=$.live&&($.ended||$.origin!==null&&u.current===0),he=ce>=D+yc,b=$.distance!==0&&Math.sign(de)!==Math.sign($.distance)&&ce>=vc;if(H&&(he||b)&&(C.end(!1),C.begin("wheel",-1,0,0,y.timeStamp),$=p.current,$.previous=ce),$.ended)return;if($.decay=ce<D?$.decay+1:0,$.peak=Math.max($.peak,ce),$.distance+=de,$.live&&$.peak>=bc&&$.decay>=wc&&ce<$.peak*xc){C.end($.crossed);return}!$.live&&Math.abs($.distance)<8||C.move($.base+$.distance,y.timeStamp)};return c.addEventListener("wheel",O,{passive:!1}),()=>{c.removeEventListener("wheel",O),v()}},[]);let J=(c,v)=>t.createElement("div",{ref:A=>{l.current[c]=A},className:`todo-swipe-tray todo-swipe-tray-${c} ${N[c].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${N[c].openWidth}px`}},v.map(A=>t.createElement("button",{key:A.key,type:"button",className:A.cls,tabIndex:-1,title:A.label,"aria-label":A.label,onClick:O=>{O.stopPropagation(),le(),A.run(O.currentTarget)}},A.icon,t.createElement("span",null,A.label))));return t.createElement("div",{ref:i,className:"todo-swipe",onPointerDown:c=>{o||c.pointerType==="mouse"&&c.button!==0||c.target.closest(".todo-swipe-tray")||B("pointer",c.pointerId,c.clientX,c.clientY,c.timeStamp)},onPointerMove:c=>{let v=p.current;if(!v||v.kind!=="pointer"||v.pointerId!==c.pointerId)return;let A=c.clientX-v.originX,O=c.clientY-v.originY;if(!v.live){if(Math.abs(O)>Math.abs(A)){c.currentTarget.hasPointerCapture?.(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),p.current=null;return}if(Math.abs(A)<8)return;w.current=!0,c.currentTarget.setPointerCapture?.(c.pointerId)}c.preventDefault(),R(v.base+A,c.timeStamp)},onPointerUp:c=>{let v=p.current;!v||v.kind!=="pointer"||v.pointerId!==c.pointerId||(c.currentTarget.hasPointerCapture?.(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),v.live&&R(v.base+(c.clientX-v.originX),c.timeStamp),F(!0))},onPointerCancel:c=>{let v=p.current;!v||v.kind!=="pointer"||v.pointerId!==c.pointerId||(c.currentTarget.hasPointerCapture?.(c.pointerId)&&c.currentTarget.releasePointerCapture(c.pointerId),le())},onClickCapture:c=>{let v=!!c.target.closest(".todo-swipe-tray");if(v&&(w.current=!1),w.current&&!v){w.current=!1,c.stopPropagation(),c.preventDefault();return}u.current&&!v&&(c.stopPropagation(),c.preventDefault(),le())}},q.length>0&&J("left",q),t.createElement("div",{ref:s,className:"todo-swipe-surface"},a),k.length>0&&J("right",k))};function xs(e,o,r){let n=Ee(o);m.ui.openMenu(Kt().map(a=>({label:d(a.labelKey),icon:t.createElement(ye,{status:a.status,dotCls:a.cls}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ce(a.status))})),{anchor:e})}var Ec=2,Ts=({todo:e,groups:o,compact:r,c:n,depth:a=0,hideDate:i=!1,canIndent:s=!1,canOutdent:l=!1,onIndent:u,onOutdent:p,onMoveFocus:f,draggable:g=!1,dropTarget:w=!1,onDragStart:T,onDragOver:h,onDragLeave:I,onDrop:z,onDragEnd:q})=>{let[k,E]=t.useState("");t.useEffect(()=>{let y=!0;return E(""),ds(e.title).then(C=>{y&&E(C)}).catch(()=>{y&&E("")}),()=>{y=!1}},[e.title]);let N=(y,C)=>m.workspace.openFile(y,void 0,{newTab:C}),S=je.find(y=>y.id===e.priority)??je[0],U=xe(o),G=Ee(e),te=[e.filePath,...e.attachments??[]].filter(y=>!!y),[re,x]=t.useState(!1),W=re?te:te.slice(0,Ec),Y=te.length-W.length,ie=e.urls?.length??0,ke=r&&te.length>0,le=!!(e.dueDate&&!i||e.startTime||e.remindAt||e.location||e.group||ie>0||ke||e.status&&e.status!=="open"&&!Me(e.status).done||e.priority!=="normal"),ee=n.pendingIds.has(e.id),Ie=Te(new Date),ue=e.dueDate&&!i?za(e.dueDate,Ie,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},m.ui.language(),m.getState().dateFormat):"",_=e.dueDate?ze(e.dueDate,m.getState().dateFormat):"",B=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<Ie,R=t.useRef(null),F=t.useRef(null);t.useEffect(()=>F.current?Hn(e.id,F.current):void 0,[e.id]);let X=t.useRef(null),J=t.useRef(!1),c=t.useCallback(()=>{X.current!=null&&(window.clearTimeout(X.current),X.current=null)},[]);t.useEffect(()=>c,[c]);let v=()=>{let y=e.dueDate?.slice(0,10);if(!y)return;let C=m.interop.services.providers($n)[0];if(!C)return;let se=m.interop.services.providers(No).find(de=>de.owner===m.pluginId)?.providerId;C.invoke("openDate",[{date:y,startTime:e.startTime,endTime:e.endTime,sourceId:se,itemId:e.id}])},A=y=>n.patchTodo(e.id,y),O=t.useMemo(()=>({reschedule:y=>{n.patchTodo(e.id,{dueDate:y})},pickDate:y=>{let{DateField:C}=m.ui.settings;m.ui.openPopover(se=>t.createElement("div",{className:"todo-swipe-datepick"},t.createElement(C,{value:e.dueDate,ariaLabel:d("todo.swipe.date"),onChange:de=>{n.patchTodo(e.id,{dueDate:de}),se.close()}})),{anchor:y},{ariaLabel:d("todo.swipe.date")})},setStatus:y=>xs(y,e,A),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{so(e,n.removeTodo)}}),[e,n]);return t.createElement(ws,{todo:e,disabled:ee,actions:O,onEngage:c},t.createElement("article",{ref:F,className:`todo-row${e.dueDate?" todo-row-navigable":""}${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}${a?" nested":""}${w?" drop-target":""}`,"data-todo-id":e.id,"data-depth":a||void 0,style:a?{paddingLeft:`calc(var(--todo-indent) * ${a})`}:void 0,tabIndex:0,onDragStart:y=>{if(y.target.closest("input, button, a, textarea")){y.preventDefault();return}T?.(y)},onDragOver:h,onDragLeave:I,onDrop:z,onDragEnd:q,onKeyDown:y=>{if(y.target===y.currentTarget){if(y.key==="ArrowDown"||y.key==="ArrowUp"){y.preventDefault(),f?.(y.key==="ArrowDown"?1:-1);return}if(y.key==="Escape"){y.currentTarget.blur();return}if(y.key==="Tab"){let C=y.shiftKey?p:u,se=y.shiftKey?l:s;if(!C||!se)return;y.preventDefault(),C();return}y.key==="Enter"&&(y.preventDefault(),n.openDetail(e.id))}},onClick:y=>{y.target.closest("input, button, a, .todo-row-actions")||y.detail>1||v()},onDoubleClick:y=>{y.target.closest("input, button, a, .todo-row-actions")||n.openDetail(e.id)}},t.createElement("span",{className:"todo-check-wrap"},t.createElement("input",{ref:R,className:"todo-check","data-status":G,type:"checkbox",checked:G==="completed",disabled:ee,onPointerDown:()=>{ee||(J.current=!1,c(),X.current=window.setTimeout(()=>{J.current=!0;let y=R.current;y&&m.ui.openMenu(Kt().map(C=>({label:d(C.labelKey),icon:t.createElement(ye,{status:C.status,dotCls:C.cls}),type:"radio",checked:C.status===null?G==="open":C.status===G,enabled:!ee,onSelect:()=>n.patchTodo(e.id,Ce(C.status))})),{anchor:y})},450))},onPointerUp:c,onPointerLeave:c,onClick:y=>{J.current&&(y.preventDefault(),J.current=!1)},onChange:y=>{n.patchTodo(e.id,Ce(y.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),G!=="open"&&G!=="completed"&&t.createElement("span",{className:"todo-check-glyph"},t.createElement(ye,{status:G,dotCls:Me(G).cls}))),t.createElement("div",{className:"todo-row-main"},t.createElement("h4",null,S.symbol&&t.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},S.symbol," "),k?t.createElement("span",{className:"todo-title-md",draggable:g,dangerouslySetInnerHTML:{__html:k}}):t.createElement("span",{className:"todo-title-md",draggable:g},e.title)),!r&&e.note.trim()&&t.createElement(m.ui.MarkdownView,{className:"todo-notes",value:e.note,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:e.id},sourcePath:e.filePath},onChange:y=>{n.patchTodo(e.id,{note:y})}}),(le||!r&&!!e.tags?.length)&&t.createElement("div",{className:"todo-view-meta"},e.group&&t.createElement("span",{className:"todo-group-text",style:{color:Ae(Pe(e.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Me(e.status).done&&t.createElement("span",{className:`todo-status-text ${Me(e.status).cls}`},t.createElement(ye,{status:e.status,dotCls:Me(e.status).cls}),it(e.status)),e.priority!=="normal"&&t.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},t.createElement("span",{className:"todo-meta-icon"},t.createElement(nr,null)),ca(e.priority)),ue&&t.createElement("button",{className:`todo-date${B?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:_||ue}),onClick:y=>{y.stopPropagation(),v()}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(pt,null)),t.createElement("span",{className:"todo-date-day"},ue),_&&_!==ue&&t.createElement("span",{className:"todo-date-full"},_)),e.startTime&&t.createElement("span",{className:"todo-clock-text"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(rr,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&t.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:y=>{y.stopPropagation(),bo(e.location)}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(ar,null)),e.location.name),ke&&t.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Dt,null)),te.length),ie>0&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},t.createElement(ot,null),ie>1&&ie),e.remindAt&&!e.reminderFiredAt&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},t.createElement(yi,null),e.remindAt.slice(11,16)),!r&&e.tags?.map(y=>t.createElement("span",{key:y,className:"todo-tag-text"},"#",y)))),t.createElement("div",{className:"todo-row-actions"},e.flagged&&t.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},t.createElement(Oe,null)),t.createElement(ls,{todo:e,groupNames:U,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:A,onRequestDelete:()=>so(e,n.removeTodo),disabled:ee,canIndent:s,canOutdent:l,onIndent:u,onOutdent:p})),!r&&te.length>0&&t.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},W.map(y=>t.createElement("button",{key:y,className:"todo-file-card",title:y,onClick:C=>{C.stopPropagation(),N(y,m.ui.hasModKey(C))},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},y===e.filePath?t.createElement(ir,null):t.createElement(Dt,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},Yi(y)),t.createElement("span",{className:"todo-file-card-kind"},wn(y))))),(Y>0||re)&&t.createElement("button",{className:`todo-file-card todo-file-card-more${re?" open":""}`,title:re?d("todo.fewerFiles"):d("todo.moreFiles",{p0:Y}),"aria-expanded":re,onClick:y=>{y.stopPropagation(),x(C=>!C)},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},t.createElement(tt,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},re?d("todo.fewerFiles"):d("todo.moreFiles",{p0:Y})))))))};var Je=({todos:e,groups:o,compact:r,hideDate:n=!1,c:a})=>{let i=t.useMemo(()=>Ga(e),[e]),s=t.useRef(null),[l,u]=t.useState(null),[p,f]=t.useState(null),g=t.useCallback(()=>{u(null),f(null)},[]),w=t.useCallback(k=>!!l&&l!==k&&Bt(a.todos,l,k),[a.todos,l]),T=t.useCallback((k,E)=>{u(k),E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",k)},[]),h=t.useCallback((k,E)=>{w(k)&&(E.preventDefault(),E.dataTransfer.dropEffect="move",f(k))},[w]),I=t.useCallback((k,E)=>{E.currentTarget.contains(E.relatedTarget)||p===k&&f(null)},[p]),z=t.useCallback((k,E)=>{E.preventDefault(),w(k)&&l&&a.patchTodo(l,{parentId:k}),g()},[a,w,g,l]),q=t.useCallback((k,E)=>{let N=s.current?.querySelectorAll(".todo-row");if(!N?.length)return;N[Math.max(0,Math.min(N.length-1,k+E))]?.focus()},[]);return t.createElement("div",{className:"todo-list-rows",ref:s},i.map((k,E)=>{let N=$a(i,E);return t.createElement(Ts,{key:k.todo.id,todo:k.todo,groups:o,compact:r,c:a,depth:k.depth,hideDate:n,canIndent:!!N,canOutdent:Ka(e,k.todo.id),onIndent:N?()=>{a.patchTodo(k.todo.id,N)}:void 0,onOutdent:()=>{let S=Wr(e,k.todo.id);S&&a.patchTodo(k.todo.id,S)},onMoveFocus:S=>q(E,S),draggable:!0,dropTarget:p===k.todo.id,onDragStart:S=>T(k.todo.id,S),onDragOver:S=>h(k.todo.id,S),onDragLeave:S=>I(k.todo.id,S),onDrop:S=>z(k.todo.id,S),onDragEnd:g})}))};function Cc(e,o,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return lo(`${o}-01`).toLocaleDateString(void 0,{month:"long",year:"numeric"});if(e==="weekly"){let i=lo(o),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:Ra(i),p0:`${et(o,a,n)} \u2013 ${et(Re(s),a,n)}`})}return o===jt(r,-1)?d("todo.due.yesterday"):o===r?d("todo.due.today"):o===jt(r,1)?d("todo.due.tomorrow"):et(o,a,n)}function Nr({todos:e,groups:o,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let l=Re(),{shortDateFormat:u}=ht(),p=m.ui.language(),f=t.useMemo(()=>{if(!s)return Zr(e,a,Yr(i));let g=[...e].sort((w,T)=>kt(T).localeCompare(kt(w)));return Zr(g,a,Yr(i),{dateOf:w=>Xr(kt(w)),inheritRoot:!1})},[a,s,e,i]);return t.createElement("div",{className:"todo-panel-date-sections"},f.map(g=>t.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},t.createElement("div",{className:"todo-panel-date-head"},Cc(g.kind,g.key,l,u,p)),t.createElement(Je,{todos:g.todos,groups:o,compact:r,c:n}))))}function Nc(e,o){return e==="all"?o:e.filter(r=>o.includes(r))}function ks(e,o,r){let n=Nc(e,o);return r?n:n.filter(a=>!wt.includes(a))}function Ic(){let[e,o]=Et(),[r]=gt(),n=dt(),a=n.map(l=>l.id),i=ks(e,a,r),s=l=>{let u=i.includes(l)?i.filter(p=>p!==l):a.filter(p=>i.includes(p)||p===l);u.length&&(Nt(u.some(p=>wt.includes(p))),o(u.length===a.length?"all":u))};return t.createElement("div",{className:"todo-status-filter-menu"},t.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":i.length===a.length,onClick:()=>{Nt(!0),o("all")}},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},i.length===a.length?"\u2713":""),t.createElement("span",null,d("todo.chip.all"))),t.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let u=i.includes(l.id);return t.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":u,key:l.id,onClick:()=>s(l.id)},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(ye,{status:l.id==="open"?null:l.id,dotCls:l.cls})),t.createElement("span",null,d(l.labelKey)))}))}function Ir({filter:e,className:o=""}){let[r]=gt(),n=dt(),a=n.map(l=>l.id),i=ks(e,a,r),s=e==="all"&&r?d("todo.chip.all"):i.length===1?d(n.find(l=>l.id===i[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:i.length});return t.createElement("button",{type:"button",className:"todo-status-filter-select "+o,"aria-label":d("todo.filters.statuses"),onClick:l=>{m.ui.openPopover(()=>t.createElement(Ic,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.filters.statuses")})}},t.createElement("span",null,s),t.createElement(tt,null))}function Lr(e){return e==="flagged"?t.createElement(Oe,null):e==="priority"?t.createElement(nr,null):e==="due"?t.createElement(mo,null):e==="updated"?t.createElement(fi,null):e==="created"?t.createElement(mi,null):t.createElement(gi,null)}function Lc(){let[e]=gt(),[o,r]=Et(),a=dt().map(s=>s.id),i=s=>{if(o!=="all"){let l=o.filter(f=>a.includes(f)),u=s?a.filter(f=>l.includes(f)||f==="completed"):l.filter(f=>!wt.includes(f)),p=u.length?u:a.filter(f=>!wt.includes(f));r(p.length===a.length?"all":p)}Nt(s)};return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-completed-row"},t.createElement("span",null,d("todo.filters.completed")),t.createElement("div",{className:"todo-completed-choices"},t.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,"aria-pressed":!e,onClick:()=>i(!1)},d("todo.completed.hide")),t.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,"aria-pressed":e,onClick:()=>i(!0)},d("todo.completed.showAll")))),t.createElement("div",{className:"todo-filter-control-row status"},t.createElement("span",null,d("todo.filters.statuses")),t.createElement(Ir,{filter:o})))}function Sn({sortField:e,setSortField:o,sortDir:r,setSortDir:n}){let[a,i]=t.useState(e),[s,l]=t.useState(r),u=Object.entries(Tt);return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-sort-heading"},t.createElement("span",null,d("todo.filters.sort")),t.createElement("div",{className:"todo-sort-directions"},t.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},t.createElement(fo,null)),t.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},t.createElement(po,null)))),t.createElement("div",{className:"todo-sort-options"},u.map(([p,f])=>t.createElement("button",{key:p,type:"button",className:`todo-sort-option${a===p?" active":""}`,"aria-pressed":a===p,onClick:()=>{i(p),o(p)}},Lr(p),t.createElement("span",null,d(f))))))}function xo({todos:e,groups:o,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:l,embedded:u=!1}){let[p,f]=t.useState(a),[g,w]=t.useState(i),T=u?a:p,h=u?i:g,I=T.length===r.length&&(!n||h),z=[...r.map(N=>T.some(S=>S.toLowerCase()===N.toLowerCase())),...n?[h]:[]],q=(N,S)=>N?` active${z[S-1]?"":" selection-run-start"}${z[S+1]?"":" selection-run-end"}`:"",k=(N,S)=>{f(N),w(S),s(N,S)},E=N=>{let S=e.filter(te=>N===null?!te.group:Q(te.group??"")===Q(N)),U=N??d("todo.chip.noGroup"),G=N===null?h:T.some(te=>Q(te)===Q(N));return t.createElement("div",{className:"todo-group-filter-item",key:N??"ungrouped"},t.createElement("div",{className:"props-info-row"},t.createElement("dt",{className:"props-info-key"},N&&t.createElement("span",{className:"props-info-dot",style:{background:Ae(Pe(N,o))}}),U),t.createElement("dd",{className:"props-info-value props-info-filter-value"},t.createElement("span",null,S.length),t.createElement(m.ui.settings.Toggle,{label:U,checked:G,onChange:()=>k(N===null?T:G?T.filter(te=>Q(te)!==Q(N)):[...T,N],N===null?!h:h)}))))};return u?t.createElement("div",{className:"props-info"},t.createElement("div",{className:"props-info-actions"},t.createElement("button",{type:"button",onClick:l},d("todo.properties.manageGroups")),(r.length>0||n)&&t.createElement("button",{type:"button",onClick:()=>k(I?[]:r,I?!1:n)},d(I?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("dl",{className:"props-info-table"},r.map(N=>E(N)),n&&E(null))):t.createElement("div",{className:"todo-group-filter-popover"},t.createElement("div",{className:"todo-group-filter-head"},t.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),t.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>k(I?[]:r,I?!1:n)},d(I?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("div",{className:"todo-group-filter-list"},r.map((N,S)=>{let U=z[S];return t.createElement("button",{key:N,type:"button",className:`todo-group-filter-row${q(U,S)}`,"aria-pressed":U,onClick:()=>k(U?p.filter(G=>G.toLowerCase()!==N.toLowerCase()):[...p,N],g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},U?"\u2713":""),t.createElement("span",{className:"todo-tree-dot",style:{background:Ae(Pe(N,o))}}),t.createElement("span",{className:"todo-tree-label"},N),t.createElement("span",{className:"todo-tree-count"},ur(e,N)))}),n&&t.createElement("button",{type:"button",className:`todo-group-filter-row${q(g,r.length)}`,"aria-pressed":g,onClick:()=>k(p,!g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),t.createElement("span",{className:"todo-tree-dot no-group"}),t.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),t.createElement("span",{className:"todo-tree-count"},ur(e,null)))))}var Ss={scheduled:()=>t.createElement(mo,null),today:()=>t.createElement(go,null),flagged:()=>t.createElement(Oe,null),all:()=>t.createElement(sr,null),completed:()=>t.createElement(We,null)},Pc=()=>{let{activePluginTab:e,indexEntries:o,dateFormat:r}=ht(),{selectedDate:n,selectedDateRange:a}=Ar(),i=He(),s=Ct(),[l,u]=t.useState(""),[p,f]=t.useState(!1),[g,w]=xr(),[T]=gt(),[h,I]=gr("todo"),{sortField:z,sortDir:q,compact:k}=h,[E,N]=Et(),S=dt(),U=hr(),G=$i(),te=t.useMemo(()=>Ci(G),[G]),re=e?.pluginId===m.pluginId,x=t.useRef(null),W=t.useRef(null),Y=Jt(z,q,"left_sidebar");Ot(Y.openDetail);let ie=Te(new Date),ke=t.useMemo(()=>Li(Y.todos,ie),[Y.todos,ie]),le=t.useMemo(()=>xe(i),[i]),ee=t.useMemo(()=>Y.todos.some(D=>!D.group),[Y.todos]),Ie=s.kind==="groups"?s.names:le,ue=s.kind==="groups"?s.includeUngrouped===!0:ee,_=Ie.length===le.length&&(!ee||ue),B=t.useMemo(()=>{let D=Y.ordered.filter(H=>cr(H,s,T,ie));return E!=="all"&&(D=D.filter(H=>Gt(H,E))),g.trim()&&(D=D.filter(H=>xt(g,H.tags??[],H.title,H.note,H.group??""))),a?D=D.filter(H=>{let he=H.dueDate?.slice(0,10);return!!he&&he>=a.start&&he<=a.end}):n&&(D=D.filter(H=>H.dueDate?.slice(0,10)===n)),D},[Y.ordered,s,T,E,g,n,a,ie]),R=s.kind==="groups"&&s.names.length===1&&!s.includeUngrouped?s.names[0]:void 0,F=async()=>{let D=l.trim();if(!D){J();return}let H=R;if(s.kind==="groups"&&s.names.length+(s.includeUngrouped?1:0)>1){let P=await m.ui.openMenu([...s.names.map((ne,Se)=>({id:`group:${Se}`,label:ne})),...s.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:x.current??W.current,align:"start"});if(P===null)return;H=P.startsWith("group:")?s.names[Number(P.slice(6))]:void 0}u("");let he={...H?{group:H}:{}};s.kind==="smart"&&s.id==="today"&&(he.dueDate=ie),s.kind==="smart"&&s.id==="flagged"&&(he.flagged=!0),await Y.create(D,void 0,{patch:he})?x.current?.focus():u(D)},X=()=>{f(!0),window.setTimeout(()=>x.current?.focus(),0)},J=()=>{u(""),f(!1)},c=D=>{m.ui.openPopover(()=>t.createElement(Lc,null),{anchor:D,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},v=D=>{m.ui.openPopover(()=>t.createElement(Sn,{sortField:z,setSortField:H=>I({sortField:H}),sortDir:q,setSortDir:H=>I({sortDir:H})}),{anchor:D,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},A=D=>{m.ui.openPopover(({close:H})=>t.createElement(xo,{todos:Y.todos,groups:i,names:le,hasUngrouped:ee,selected:Ie,includeUngrouped:ue,onChange:(he,b)=>_e(he.length===le.length&&(!ee||b)?ve:{kind:"groups",names:he,includeUngrouped:b}),onOpenSettings:()=>{H(),Ze()}}),{anchor:D,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},O=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},y=(D,H,he,b,P,ne,Se)=>{let yt=pr(s,H),Lt=H.kind==="groups"&&H.names.length===1&&!H.includeUngrouped&&s.kind==="groups"?s.names.some(Or=>Q(Or)===Q(H.names[0])):yt;return t.createElement("button",{key:ft(H),type:"button",className:`todo-tree-row${P?" nested":""}${ne?` todo-${ne}-chip`:""}${Lt?" active":""}`,"aria-current":yt?"true":void 0,"aria-pressed":H.kind==="groups"?Lt:void 0,style:Se?{"--todo-chip-color":Ae(Se),"--todo-chip-on":Xn(Se)}:void 0,onClick:()=>_e(H)},b&&t.createElement("span",{className:"todo-tree-icon"},b),P&&t.createElement("span",{className:"todo-tree-dot",style:{background:Ae(P)},"aria-hidden":"true"}),t.createElement("span",{className:"todo-tree-label"},D),t.createElement("span",{className:"todo-tree-count"},he))},se=!!(g||n||a||E!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),de=a?`${ze(a.start,r)} \u2013 ${ze(a.end,r)}`:n?ze(n,r):null,$=E==="all"?null:`${d("auto.bae7d5be7082")}: ${E.length===1?d(S.find(D=>D.id===E[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:E.length})}`,ce=d("todo.fab.newTodo");return t.createElement("div",{className:"todo-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),t.createElement("div",{className:"todo-header-actions"},!re&&t.createElement(t.Fragment,null,t.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${_?"":" active"}`,"aria-label":d("todo.view.groups"),title:d("todo.view.groups"),type:"button",onClick:D=>A(D.currentTarget)},t.createElement(Yt,null)),t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${T||E!=="all"?" active":""}`,"aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),type:"button",onClick:D=>c(D.currentTarget)},t.createElement(We,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":k,title:k?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>I({compact:!k})},k?t.createElement(Qo,null):t.createElement(er,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${q==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Tt[z])}`,type:"button",onClick:D=>v(D.currentTarget)},q==="asc"?t.createElement(po,null):t.createElement(fo,null),Lr(z))),t.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>m.workspace.openMainTab()}))),t.createElement("div",{className:"todo-tree-search search-field"},t.createElement(Zo,{className:"search-field-icon"}),t.createElement("input",{className:"search-field-input",value:g,onChange:D=>w(D.target.value),onKeyDown:D=>{D.key==="Escape"&&w("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),g&&t.createElement("button",{className:"search-field-action",onClick:()=>w(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},t.createElement(Ne,null))),re?t.createElement("div",{className:"todo-tree todo-active-navigation"},t.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},te.map(D=>y(d(D.labelKey),{kind:"smart",id:D.id},ke[D.id],Ss[D.id](),void 0,"smart",D.color))),t.createElement("div",{className:"todo-navigation-groups"},t.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),le.map(D=>y(D,{kind:"groups",names:[D]},ur(Y.todos,D),void 0,Pe(D,i))))):t.createElement(t.Fragment,null,!g&&t.createElement("div",{className:"todo-tree"},t.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},de?t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:O},t.createElement("span",{className:"todo-tree-icon"},t.createElement(go,null)),t.createElement("span",{className:"todo-tree-label"},de),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(Ne,null))):te.map(D=>y(d(D.labelKey),{kind:"smart",id:D.id},ke[D.id],Ss[D.id](),void 0,"smart",D.color))),$&&t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>N("all")},t.createElement("span",{className:"todo-tree-label"},$),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(Ne,null)))),t.createElement("div",{className:"todo-list"},p&&t.createElement("form",{className:"todo-compose",onSubmit:D=>{D.preventDefault(),F()}},t.createElement("input",{ref:x,value:l,onChange:D=>u(D.target.value),onKeyDown:D=>{D.key==="Escape"&&J()},onBlur:()=>{l.trim()||f(!1)},placeholder:R?d("todo.newTodoIn",{p0:R}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:Y.creating})),Y.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):B.length?t.createElement(Nr,{todos:B,groups:i,compact:k,controller:Y,mode:U,weekStart:m.getState().weekStart,timeline:s.kind==="smart"&&s.id==="completed"}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,se))),t.createElement("button",{ref:W,className:"todo-fab",type:"button","aria-label":ce,title:ce,disabled:Y.creating,onClick:()=>p?void F():X()},t.createElement(qe,null))),t.createElement(Qt,{c:Y,indexEntries:o}))},Ds=()=>t.createElement(Pc,null);function Mc({showCompleted:e,setShowCompleted:o,filter:r,setFilter:n}){let a=dt(),i=a.map(u=>u.id),s=r==="all"?i:r,l=u=>{let p=s.includes(u)?s.filter(f=>f!==u):i.filter(f=>s.includes(f)||f===u);p.length&&n(p.length===i.length?"all":p)};return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-completed-row"},t.createElement("span",null,d("todo.filters.completed")),t.createElement("div",{className:"todo-completed-choices"},t.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,onClick:()=>o(!1)},d("todo.completed.hide")),t.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,onClick:()=>o(!0)},d("todo.completed.showAll")))),t.createElement("div",{className:"todo-status-filter-menu local"},a.map(u=>t.createElement("button",{key:u.id,type:"button",className:"todo-status-filter-option","aria-pressed":s.includes(u.id),onClick:()=>l(u.id)},t.createElement("span",{className:"todo-status-filter-check"},s.includes(u.id)?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(ye,{status:u.id==="open"?null:u.id,dotCls:u.cls})),t.createElement("span",null,d(u.labelKey))))))}var As=()=>{let{activePath:e,indexEntries:o,weekStart:r}=ht(),n=nt(e)??"",a=He(),i=hr(),[s,l]=gr("attachment"),{showCompleted:u,statusFilter:p,compact:f,sortField:g,sortDir:w,groupNames:T,includeUngrouped:h}=s,I=x=>l({showCompleted:x}),z=x=>l({statusFilter:x}),q=x=>l({sortField:x}),k=x=>l({sortDir:x}),E=Jt(g,w,"right_sidebar");Ot(E.openDetail);let N=t.useMemo(()=>xe(a),[a]),S=t.useMemo(()=>E.todos.some(x=>!x.group),[E.todos]),U=t.useMemo(()=>E.ordered.filter(x=>!(nt(x.filePath)===n||(x.attachments??[]).some(Y=>nt(Y)===n))||!u&&x.completed||(T.length||h)&&(!x.group&&!h||x.group&&!new Set(T.map(Q)).has(Q(x.group)))?!1:Gt(x,p)),[E.ordered,n,u,p,T,h]),G=x=>{m.ui.openPopover(({close:W})=>t.createElement(xo,{todos:E.todos,groups:a,names:N,hasUngrouped:S,selected:T,includeUngrouped:h,onChange:(Y,ie)=>l({groupNames:Y,includeUngrouped:ie}),onOpenSettings:()=>{W(),Ze()}}),{anchor:x,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},te=x=>{m.ui.openPopover(()=>t.createElement(Mc,{showCompleted:u,setShowCompleted:I,filter:p,setFilter:z}),{anchor:x,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},re=x=>{m.ui.openPopover(()=>t.createElement(Sn,{sortField:g,setSortField:q,sortDir:w,setSortDir:k}),{anchor:x,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return t.createElement("div",{className:"todo-panel note-tasks-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),t.createElement("div",{className:"todo-header-actions"},t.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${T.length||h?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:x=>G(x.currentTarget)},t.createElement(Yt,null)),t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${u||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:x=>te(x.currentTarget)},t.createElement(We,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":f,"aria-label":d("auto.e3719eae891e"),onClick:()=>l({compact:!f})},f?t.createElement(Qo,null):t.createElement(er,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${w==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Tt[g])}`,onClick:x=>re(x.currentTarget)},w==="asc"?t.createElement(po,null):t.createElement(fo,null),Lr(g)))),t.createElement("div",{className:"todo-list"},E.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):n?U.length?t.createElement(Nr,{todos:U,groups:a,compact:f,controller:E,mode:i,weekStart:r}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.none"))):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.noFile")))),t.createElement(Qt,{c:E,indexEntries:o}))};var Dn="pageCollapsed";function Oc(){let e=m.settings.get()[Dn];return Array.isArray(e)?new Set(e.filter(o=>qt.includes(o))):new Set(["completed"])}var Es=({navigation:e})=>{let{indexEntries:o,dateFormat:r,shortDateFormat:n}=ht(),{selectedDate:a,selectedDateRange:i}=Ar(),{SelectField:s}=m.ui.settings,l=He(),u=Ct(),p=wr();t.useEffect(()=>(e.setController({canGoBack:p.canGoBack,canGoForward:p.canGoForward,goBack:()=>Zt(-1),goForward:()=>Zt(1)}),()=>e.setController(null)),[e,p.canGoBack,p.canGoForward]);let[f,g]=t.useState(""),[w,T]=xr(),[h,I]=Hi(),{field:z,dir:q}=h,[k,E]=t.useState(Oc),[N,S]=t.useState(new Set),[U,G]=gt(),[te]=Et(),re=t.useRef(null),x=Jt("due","asc");Ot(x.openDetail),t.useEffect(()=>{if(!x.loading)if(u.kind==="groups"){let b=new Set(xe(l));!u.includeUngrouped&&!u.names.some(P=>b.has(P))&&_e(ve)}else u.kind==="tag"&&(x.todos.some(b=>b.tags?.includes(u.name))||_e(ve))},[x.loading,x.todos,l,u]),t.useEffect(()=>{U&&E(b=>{if(!b.has("completed"))return b;let P=new Set(b);return P.delete("completed"),m.settings.set(Dn,[...P]),P})},[U]);let W=Re(),Y=u.kind==="smart"?mt(u.id):null,ie=!!Y?.dated,ke=u.kind==="groups"?u.names.length===1&&!u.includeUngrouped?u.names[0]:d("todo.view.selectedGroups",{count:u.names.length+(u.includeUngrouped?1:0)}):u.kind==="tag"?`#${u.name}`:u.kind==="nogroup"?d("todo.chip.noGroup"):d(Y.labelKey),le=u.kind==="groups"?u.names.length===1&&!u.includeUngrouped?Ae(Pe(u.names[0],l)):"var(--accent-color)":u.kind==="tag"?"var(--accent-color)":u.kind==="nogroup"?"var(--text-color)":Ae(Y.color)||"var(--text-color)",ee=t.useMemo(()=>{let b=x.todos.filter(P=>cr(P,u,U,W));return te!=="all"&&(b=b.filter(P=>Gt(P,te))),w.trim()&&(b=b.filter(P=>xt(w,P.tags??[],P.title,P.note,P.group??""))),i?b=b.filter(P=>{let ne=P.dueDate?.slice(0,10);return!!ne&&ne>=i.start&&ne<=i.end}):a&&(b=b.filter(P=>P.dueDate?.slice(0,10)===a)),b},[x.todos,u,U,te,w,a,i,W]),Ie=t.useMemo(()=>Ii(x.todos,u,W),[x.todos,u,W]),ue=ee,_=t.useMemo(()=>ie?Ba(ue.filter(b=>!b.completed),W):[],[ie,ue,W]),B=_.filter(b=>!!b.key&&b.key<W),R=_.find(b=>b.key===W),F=ie?ue.filter(b=>b.completed):[],X=t.useMemo(()=>R?Ya(R.todos):[],[R]),{near:J,months:c}=t.useMemo(()=>Xa(_.filter(b=>!b.key||b.key>W),W),[_,W]),v=t.useMemo(()=>{if(ie)return null;let b=co(ue,W);if(z!=="auto")for(let P of qt)b[P]=Ut(b[P],z,q);return b},[ie,ue,W,z,q]),A=t.useMemo(()=>u.kind==="smart"&&u.id==="completed"?qa(ue):null,[u,ue]),O=x.lastCreatedId?ue.find(b=>b.id===x.lastCreatedId)??x.todos.find(b=>b.id===x.lastCreatedId):void 0,y=b=>{S(P=>{let ne=new Set(P);return ne.has(b)?ne.delete(b):ne.add(b),ne})},C=b=>{E(P=>{let ne=new Set(P);return ne.has(b)?ne.delete(b):ne.add(b),m.settings.set(Dn,[...ne]),ne})},se=u.kind==="groups"&&u.names.length===1&&!u.includeUngrouped?u.names[0]:void 0,de=async b=>{let P=Za(f,W);if(!P.title){re.current?.focus();return}let ne=b?.group??se;if(!b?.group&&u.kind==="groups"&&u.names.length+(u.includeUngrouped?1:0)>1){let Lt=await m.ui.openMenu([...u.names.map((Or,Ps)=>({id:`group:${Ps}`,label:Or})),...u.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:re.current,align:"start"});if(Lt===null)return;ne=Lt.startsWith("group:")?u.names[Number(Lt.slice(6))]:void 0}g("");let Se=P.dueDate||(u.kind==="smart"&&u.id==="today"?W:""),yt=await x.create(P.title,void 0,{patch:{dueDate:Se,priority:P.priority,...ne?{group:ne}:{},...u.kind==="smart"&&u.id==="flagged"?{flagged:!0}:{}}});if(!yt){g(f);return}b?.openDetail&&x.openDetail(yt.id)},$=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},ce=xe(l),D=[{label:d("todo.fab.newTodo"),icon:t.createElement(qe,null),onSelect:()=>re.current?.focus()},...ce.length?[{label:d("todo.fab.newTodoIn"),icon:t.createElement(tr,null),submenu:ce.map(b=>({label:b,onSelect:()=>{_e({kind:"groups",names:[b]}),re.current?.focus()}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:t.createElement(Yt,null),onSelect:()=>{Ze()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:t.createElement(ot,null),onSelect:()=>{navigator.clipboard.writeText(m.workspace.buildOwnLink(Tr()))}},{label:d("auto.c7f73bb54d92"),icon:t.createElement(vi,null),onSelect:()=>m.workspace.openOwnSettings()}],H=b=>{m.ui.openMenu(D,{anchor:b,align:"end"})};t.useEffect(()=>{gn(D)}),t.useEffect(()=>()=>gn(null),[]);let he=f.trim()||x.creating?d("auto.9c0410f3884e"):d("todo.fab.menu");return t.createElement("div",{className:"todo-page"},t.createElement("div",{className:"todo-page-appbar"},t.createElement("div",{className:"todo-page-appbar-title",style:{color:le}},ke)),t.createElement("div",{className:"todo-page-scroll hidescrollbar"},t.createElement("div",{className:"todo-page-column"},t.createElement("header",{className:"todo-page-header"},t.createElement("h1",{className:"todo-page-view-title",style:{color:le}},ke),t.createElement("div",{className:"todo-page-view-sub"},t.createElement("span",null,d("todo.page.completedCount",{count:Ie})),t.createElement("button",{type:"button",className:"todo-page-view-toggle",style:{color:le},"aria-pressed":U,onClick:G},d(U?"todo.completed.hide":"todo.completed.showAll")))),t.createElement("form",{className:"todo-page-quickadd",onSubmit:b=>{b.preventDefault(),de()}},t.createElement(qe,{className:"todo-page-quickadd-icon"}),t.createElement("input",{ref:re,value:f,onChange:b=>g(b.target.value),placeholder:se?d("todo.newTodoIn",{p0:se}):d("auto.d0e6e1dca756"),"aria-label":d("auto.81df98734775"),disabled:x.creating})),t.createElement("div",{className:"todo-page-toolbar"},t.createElement("div",{className:"todo-search-wrap search-field"},t.createElement(Zo,{className:"search-field-icon"}),t.createElement("input",{className:"search-field-input",value:w,onChange:b=>T(b.target.value),placeholder:d("auto.f4ade25164a5"),"aria-label":d("auto.e0345e9d3092")}),w&&t.createElement("button",{className:"search-field-action",type:"button",onClick:()=>T(""),"aria-label":d("auto.67300d0fed7c")},t.createElement(Ne,null))),t.createElement(s,{className:"flagged-notes-sort-select",value:z,ariaLabel:d("auto.63e08dc2a4e3"),onChange:b=>I({...h,field:b}),options:[{value:"auto",label:d("auto.c614ba7c453c")},...Object.entries(Tt).map(([b,P])=>({value:b,label:d(P)}))]}),z!=="auto"&&t.createElement("button",{className:"flagged-notes-sort-dir",type:"button","aria-label":d("auto.44b8af7351fe",{p0:q==="asc"?"descending":"ascending"}),onClick:()=>I({...h,dir:q==="asc"?"desc":"asc"})},q==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")),t.createElement(Ir,{filter:te}),(i||a)&&t.createElement("button",{type:"button",className:"todo-due-chip active todo-date-chip",title:d("auto.f93fb4b1ab19"),onClick:$},i?`${ze(i.start,r)} \u2013 ${ze(i.end,r)}`:ze(a,r)," ",t.createElement(Ne,null))),x.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):A?A.length?t.createElement("div",{className:"todo-completed-timeline"},A.map(b=>t.createElement("section",{className:"todo-schedule-block",key:b.key},t.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},t.createElement("span",null,et(b.key,m.ui.language(),n)),t.createElement("span",{className:"todo-page-section-count"},b.todos.length)),t.createElement(Je,{todos:b.todos,groups:l,compact:!1,c:x})))):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.cec28cbe4204"))):ie?_.length||F.length?t.createElement(t.Fragment,null,F.length>0&&t.createElement("section",{className:"todo-schedule-block"},t.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},t.createElement("span",null,d("todo.view.completed")),t.createElement("span",{className:"todo-page-section-count"},F.length)),t.createElement(Je,{todos:F,groups:l,compact:!1,c:x})),B.length>0&&t.createElement("section",{className:"todo-schedule-block"},t.createElement("h2",{className:"todo-schedule-head todo-schedule-overdue"},t.createElement("span",null,d("todo.due.overdue")),t.createElement("span",{className:"todo-page-section-count"},B.reduce((b,P)=>b+P.todos.length,0))),B.map(b=>t.createElement("div",{key:b.key,className:"todo-page-days"},t.createElement("h3",{className:"todo-day-head is-overdue"},et(b.key,m.ui.language(),n)),t.createElement(Je,{todos:b.todos,groups:l,compact:!1,hideDate:!0,c:x})))),R&&t.createElement("section",{className:"todo-schedule-block"},t.createElement("h2",{className:"todo-schedule-head todo-schedule-today"},t.createElement("span",null,d("todo.due.today")),t.createElement("span",{className:"todo-page-section-count"},R.todos.length)),X.map(b=>t.createElement("div",{key:b.id,className:"todo-page-days"},b.id!=="untimed"&&t.createElement("h3",{className:"todo-timeofday-head"},d(Wa[b.id])),t.createElement(Je,{todos:b.todos,groups:l,compact:!1,hideDate:!0,c:x})))),J.map(b=>t.createElement("section",{key:b.key||"nodate",className:"todo-page-days"},t.createElement("h2",{className:"todo-day-head"},b.key?et(b.key,m.ui.language(),n):d("todo.due.noDeadline")),t.createElement(Je,{todos:b.todos,groups:l,compact:!1,hideDate:!0,c:x}))),c.map(b=>{let P=!N.has(b.key),ne=b.days.reduce((Se,yt)=>Se+yt.todos.length,0);return t.createElement("section",{key:b.key,className:`todo-month${P?" collapsed":""}`},t.createElement("button",{type:"button",className:"todo-month-head","aria-expanded":!P,onClick:()=>y(b.key)},t.createElement(tt,{className:"todo-page-section-chevron"}),t.createElement("span",{className:"todo-month-label"},Fa(b.key,m.ui.language(),{partial:b.partial,restOfLabel:d("todo.month.restOf")})),t.createElement("span",{className:"todo-page-section-count"},ne)),!P&&b.days.map(Se=>t.createElement("div",{key:Se.key,className:"todo-page-days"},t.createElement("h3",{className:"todo-day-head"},et(Se.key,m.ui.language(),n)),t.createElement(Je,{todos:Se.todos,groups:l,compact:!1,hideDate:!0,c:x}))))})):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.cec28cbe4204"))):qt.map(b=>{let P=v[b];O&&!P.some(Se=>Se.id===O.id)&&co([O],W)[b].length&&(P=[O,...P]);let ne=k.has(b);return!P.length&&b!=="today"?null:t.createElement("section",{key:b,className:`todo-page-section${ne?" collapsed":""}`},t.createElement("button",{type:"button",className:"todo-page-section-head","aria-expanded":!ne,onClick:()=>C(b)},t.createElement(tt,{className:"todo-page-section-chevron"}),t.createElement("span",{className:`todo-page-section-label todo-page-section-${b}`},d(ja[b])),t.createElement("span",{className:"todo-page-section-count"},P.length)),!ne&&t.createElement("div",{className:"todo-page-section-body"},P.length?t.createElement(Je,{todos:P,groups:l,compact:!1,c:x}):t.createElement("div",{className:"todo-page-section-empty"},d("auto.346d73d6f5b6"))))}))),t.createElement("button",{className:"todo-fab",type:"button","aria-label":he,title:he,disabled:x.creating,onClick:b=>{f.trim()?de({openDetail:!0}):H(b.currentTarget)}},t.createElement(qe,null)),t.createElement(Qt,{c:x,indexEntries:o}))};var Cs={scheduled:()=>t.createElement(mo,null),today:()=>t.createElement(go,null),flagged:()=>t.createElement(Oe,null),all:()=>t.createElement(sr,null),completed:()=>t.createElement(We,null)};function _c(){let{Button:e,IconButton:o,useReorderDrag:r}=m.ui.settings,[n,a]=t.useState(wo);t.useEffect(()=>m.settings.subscribe(()=>a(wo())),[]);let i=f=>{a(f),Gi(f)},s=n.order.filter(f=>!n.hidden.includes(f)),l=s.map(mt),u=r({items:l,getId:f=>f.id,getLabel:f=>d(f.labelKey),onReorder:f=>{let g=f.map(T=>T.id),w=0;i({...n,order:n.order.map(T=>n.hidden.includes(T)?T:g[w++])})}}),p=f=>{if(s.length<=1)return;let g={...n,hidden:[...n.hidden,f]};i(g);let w=At();if(w.kind==="smart"&&w.id===f){let T=g.order.find(h=>!g.hidden.includes(h));_e({kind:"smart",id:T})}};return t.createElement(m.ui.settings.Section,{title:d("todo.settings.smartLists")},t.createElement("div",{className:"todo-smart-list-settings"},t.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.smartListsDesc")),l.map(f=>{let g=u.getHandleProps(f);return t.createElement("div",{className:"todo-smart-list-setting-row"+(u.overId===f.id?" drop-"+(u.dropPosition??"before"):""),key:f.id,...u.getItemProps(f)},t.createElement("button",{...g,className:(g.className??"")+" todo-status-setting-handle",title:d("todo.settings.smartListReorder")},t.createElement(Jo,null)),t.createElement("span",{className:"todo-smart-list-setting-glyph"},Cs[f.id]()),t.createElement("span",{className:"todo-status-setting-name"},d(f.labelKey)),t.createElement(o,{onClick:()=>p(f.id),disabled:s.length<=1,ariaLabel:d("todo.settings.smartListHide",{p0:d(f.labelKey)}),title:d("todo.settings.smartListHide",{p0:d(f.labelKey)})},t.createElement(Ne,null)))}),n.hidden.length>0&&t.createElement("div",{className:"todo-smart-list-hidden"},t.createElement("span",{className:"todo-smart-list-hidden-title"},d("todo.settings.smartListsHidden")),n.hidden.map(f=>{let g=mt(f);return t.createElement("div",{className:"todo-smart-list-hidden-row",key:f},t.createElement("span",{className:"todo-smart-list-setting-glyph"},Cs[f]()),t.createElement("span",null,d(g.labelKey)),t.createElement(e,{onClick:()=>i({...n,hidden:n.hidden.filter(w=>w!==f)})},d("todo.settings.smartListRestore")))})),u.liveRegion))}function Fc(){let{ColorField:e,IconButton:o,useReorderDrag:r}=m.ui.settings,[n,a]=t.useState(Ft);t.useEffect(()=>m.settings.subscribe(()=>a(Ft())),[]);let i=h=>{a(h),ga(h)},s=n.active.map(h=>Me(h)),l=ao.filter(h=>!n.active.includes(h)).map(h=>Me(h)),u=[...s,...l],p=r({items:u,getId:h=>h.id,getLabel:h=>d(h.labelKey),onReorder:(h,I)=>{let z=n.active.includes(I.activeId),q=n.active.includes(I.overId);if(z&&q){let k=new Set(n.active);i({...n,active:h.filter(E=>k.has(E.id)).map(E=>E.id)})}else if(z)i({...n,active:n.active.filter(k=>k!==I.activeId)});else if(q){let k=[...n.active],E=k.indexOf(I.overId);k.splice(E+(I.position==="after"?1:0),0,I.activeId),i({...n,active:k})}}}),f=h=>{i({...n,active:n.active.filter(I=>I!==h)})},g=h=>{n.active.includes(h)||i({...n,active:[...n.active,h]})},w=(h,I)=>{let z=I.target.closest(".todo-status-setting-row");if(z&&!z.classList.contains("locked"))return;let q=I.dataTransfer.getData("text/plain");ao.includes(q)&&(I.preventDefault(),h==="show"?g(q):f(q),p.cancel())},T=[Me("open"),Me("completed")];return t.createElement(m.ui.settings.Section,{title:d("todo.settings.statuses")},t.createElement("div",{className:"todo-status-settings"},t.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.statusesDesc")),t.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesShow")),t.createElement("div",{className:`todo-status-visibility-zone todo-status-show${p.activeId&&!n.active.includes(p.activeId)?" accepts-drop":""}`,onDragOver:h=>{h.preventDefault(),h.dataTransfer.dropEffect="move"},onDrop:h=>w("show",h)},T.map(h=>t.createElement("div",{className:"todo-status-setting-row locked",key:h.id},t.createElement("span",{className:"todo-status-setting-handle",title:d("todo.settings.statusLocked")},t.createElement(ci,null)),t.createElement("span",{className:"todo-status-setting-glyph"},t.createElement(ye,{status:h.id==="open"?null:h.id,dotCls:h.cls})),t.createElement("span",{className:"todo-status-setting-name"},d(h.labelKey)),t.createElement(e,{value:n.colors[h.id],onChange:I=>i({...n,colors:{...n.colors,[h.id]:I}}),ariaLabel:d("todo.settings.statusColor",{p0:d(h.labelKey)}),allowCustom:!1}),t.createElement("span",{className:"todo-status-setting-action","aria-hidden":"true"}))),s.map(h=>{let I=p.getHandleProps(h);return t.createElement("div",{className:"todo-status-setting-row"+(p.overId===h.id?" drop-"+(p.dropPosition??"before"):""),key:h.id,...p.getItemProps(h)},t.createElement("button",{...I,draggable:!0,className:(I.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:z=>{I.onDragStart?.(z),z.dataTransfer.setData("text/plain",h.id)}},t.createElement(Jo,null)),t.createElement("span",{className:"todo-status-setting-glyph"},t.createElement(ye,{status:h.id,dotCls:h.cls})),t.createElement("span",{className:"todo-status-setting-name"},d(h.labelKey)),t.createElement(e,{value:n.colors[h.id],onChange:z=>i({...n,colors:{...n.colors,[h.id]:z}}),ariaLabel:d("todo.settings.statusColor",{p0:d(h.labelKey)}),allowCustom:!1}),t.createElement(o,{className:"todo-status-setting-action",onClick:()=>f(h.id),ariaLabel:d("todo.settings.statusHide",{p0:d(h.labelKey)}),title:d("todo.settings.statusHide",{p0:d(h.labelKey)})},t.createElement(Ne,null)))})),t.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesHide")),t.createElement("div",{className:`todo-status-visibility-zone todo-status-hide${p.activeId&&n.active.includes(p.activeId)?" accepts-drop":""}`,onDragOver:h=>{h.preventDefault(),h.dataTransfer.dropEffect="move"},onDrop:h=>w("hide",h)},l.map(h=>{let I=p.getHandleProps(h);return t.createElement("div",{className:"todo-status-setting-row hidden"+(p.overId===h.id?" drop-"+(p.dropPosition??"before"):""),key:h.id,...p.getItemProps(h)},t.createElement("button",{...I,draggable:!0,className:(I.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:z=>{I.onDragStart?.(z),z.dataTransfer.setData("text/plain",h.id)}},t.createElement(Jo,null)),t.createElement("span",{className:"todo-status-setting-glyph"},t.createElement(ye,{status:h.id,dotCls:h.cls})),t.createElement("span",{className:"todo-status-setting-name"},d(h.labelKey)),t.createElement(e,{value:n.colors[h.id],onChange:z=>i({...n,colors:{...n.colors,[h.id]:z}}),ariaLabel:d("todo.settings.statusColor",{p0:d(h.labelKey)}),allowCustom:!1}),t.createElement(o,{className:"todo-status-setting-action",onClick:()=>g(h.id),ariaLabel:d("todo.settings.statusShow",{p0:d(h.labelKey)}),title:d("todo.settings.statusShow",{p0:d(h.labelKey)})},t.createElement(qe,null)))}),!l.length&&t.createElement("span",{className:"todo-status-visibility-empty"},d("todo.settings.statusesHideEmpty"))),p.liveRegion))}function Ns(){let{Button:e,Row:o,Section:r,SelectField:n}=m.ui.settings,[a,i]=t.useState(fr);return t.createElement(t.Fragment,null,t.createElement(r,{title:d("todo.settings.display")},t.createElement(o,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},t.createElement(n,{className:"todo-date-breakdown-select",value:a,onChange:s=>{let l=s;i(l),m.settings.set(sn,l)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),t.createElement(_c,null),t.createElement(r,{title:d("todo.settings.groups")},t.createElement(o,{title:d("todo.settings.groups"),description:d("todo.settings.groupsDesc")},t.createElement(e,{onClick:()=>{Ze()}},d("todo.settings.groups")))),t.createElement(Fc,null))}var Mr="reminder:",zc=3600*1e3,Gc=e=>`${Mr}${e}`;function $c(e){if(!e.remindAt||e.reminderFiredAt||e.completed)return null;let o=/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(e.remindAt);if(!o)return null;let[,r,n,a,i,s]=o,l=new Date(Number(r),Number(n)-1,Number(a),i?Number(i):0,s?Number(s):0,0,0);return Number.isNaN(l.getTime())?null:l.getTime()}function Kc(e,o){let r=[],n=[];for(let a of e){let i=$c(a);i!==null&&(i<=o?r.push(a):n.push({todo:a,at:i}))}return{settled:r,upcoming:n}}function Rc(e){return{title:e.title,body:e.note.trim().split(`
`)[0]||d("todo.reminderBody")}}var Pr=null,So=!1;async function An(){if(So)return;let e=await oe().catch(()=>[]);if(So)return;let{settled:o,upcoming:r}=Kc(e,Date.now());if(await m.notifications.cancelAll(Mr),!So){for(let{todo:n,at:a}of r)m.notifications.schedule(Gc(n.id),[a],{eventId:"reminder",...Rc(n)});for(let n of o)La(n.id)}}function Is(){So=!1,An();let e=lt(()=>{An()}),o=m.notifications.onAction(({key:r,action:n})=>{if(n!=="click"||!r.startsWith(Mr))return;let a=r.slice(Mr.length);oe().then(i=>{let s=i.find(l=>l.id===a);s?.filePath?m.workspace.openFile(s.filePath):m.commands.executeOwn("open-page",{})}).catch(()=>{})});return Pr=window.setInterval(()=>{An()},zc),()=>{So=!0,e(),o(),Pr!=null&&window.clearInterval(Pr),Pr=null}}var En=(e,o=[])=>({type:"object",properties:e,required:o,additionalProperties:!1}),Cn=e=>({type:"string",description:e});async function Nn(e,o,r,n){let a=await e.commands.executeOwn(o,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Ls(e){return Fn([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:En({}),sideEffect:"read",commandId:"list",run:async(o,r)=>{let a=(await Nn(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:En({title:Cn("Task title"),due:Cn("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(o,r)=>{let n=String(o.title??"");return`Added todo "${(await Nn(e,"add",{title:n,due:String(o.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:En({id:Cn("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(o,r)=>{let n=String(o.id??"");return`Completed "${(await Nn(e,"complete",{query:n},r)).title||n}".`}}])}function Vc(e){da(e),Un(e);let o=jn(),r=ba();zi();let n=e.workspace.onOpenOwnLink(w=>{kr(w)});e.registerView("todo.panel",Ds),e.registerView("todo.file",As),e.registerView("todo.page",Es),e.registerView("todo.settings",Ns);let a=ni(e),i=rs(e),s=e.interop.services.provide(Kn,Ls(e)),l=li(),u=Bi(),p=Qi(e),f=Is(),g=Ma();return()=>{a(),i(),s(),l(),u(),p(),f(),g(),n(),r(),o()}}var Hc={register:Vc},$b=Hc;export{$b as default,Vc as register};

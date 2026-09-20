var td=new Map;function me(e,t,r,n,a,i,s,d,f="owner"){let u=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:f,serviceCalls:s,serviceMetadata:d});return td.set(`${t}:${e}@${r}`,u),u}var Wr=256;function Yr(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var U=e=>!!e&&typeof e=="object"&&!Array.isArray(e),pe=(e,t)=>typeof e[t]=="function",St=e=>e===void 0,Ft=e=>typeof e=="boolean",q=e=>typeof e=="string",Ne=e=>e===void 0||q(e),od=e=>e===void 0||typeof e=="number",rd=e=>e===void 0||typeof e=="boolean",se=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),xe=e=>U(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Bn=e=>U(e),Wn=e=>U(e)&&q(e.id)&&q(e.title)&&q(e.date)&&(e.documentRef===void 0||U(e.documentRef)&&q(e.documentRef.pluginId)&&q(e.documentRef.sourceId)&&q(e.documentRef.itemId)),nd=e=>U(e)&&q(e.date)&&Ne(e.startTime)&&Ne(e.endTime)&&Ne(e.sourceId)&&Ne(e.itemId),ad=e=>U(e)&&q(e.url)&&Ne(e.title)&&rd(e.newTab),id=e=>U(e)&&q(e.query),Yn=e=>U(e)&&q(e.name)&&Ne(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),sd=e=>Array.isArray(e)&&e.every(Yn),dd=e=>e===null||Yn(e),ld=e=>e===void 0||U(e)&&Ne(e.approvalToken)&&(e.cancellation===void 0||U(e.cancellation)),cd=e=>typeof e=="string"||U(e)&&typeof e.text=="string",ud=e=>U(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&U(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ne(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Xn=e=>U(e)&&q(e.id)&&q(e.label)&&Ne(e.labelKey)&&Ne(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Xn)),Zn={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Wn)},create:{args:e=>se(e,[q,Bn]),result:Ft},update:{args:e=>se(e,[q,Bn]),result:Ft},remove:{args:e=>se(e,[q]),result:Ft},open:{args:e=>se(e,[q]),result:St},configure:{args:e=>e.length===0,result:St},actions:{args:e=>se(e,[q]),result:e=>Array.isArray(e)&&e.every(Xn)},runAction:{args:e=>se(e,[q,q]),result:Ft}},Jn=e=>U(e)&&q(e.name)&&q(e.version)&&Ne(e.description)&&Ne(e.author)&&(e.localized===void 0||U(e.localized)&&Object.values(e.localized).every(t=>U(t)&&q(t.name)&&Ne(t.description))),pd=me("calendar.itemSource","service","1.3.0","many",e=>U(e)&&pe(e,"list")&&(e.integration===void 0||Jn(e.integration)),void 0,Zn,e=>e.integration),$o=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,qr=e=>typeof e=="string"&&e.length>0&&e.length<=8192,fd=e=>U(e)&&$o(e.startDate)&&$o(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=Wr&&(e.cursor===void 0||qr(e.cursor)),md=e=>U(e)&&qr(e.revision)&&(e.cursor===void 0||qr(e.cursor))&&Array.isArray(e.items)&&e.items.length<=Wr&&e.items.every(t=>Wn(t)&&$o(t.date)&&(t.endDate===void 0||$o(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,uo=me("calendar.itemSource","service","2.0.0","many",e=>U(e)&&pe(e,"list")&&(e.integration===void 0||Jn(e.integration)),void 0,{...Zn,list:{args:e=>se(e,[fd]),result:md}},e=>e.integration),po=me("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Xr=me("calendar.navigator","service","1.0.0","one",e=>U(e)&&pe(e,"openDate"),void 0,{openDate:{args:e=>se(e,[nd]),result:St}}),Ko=me("calendar.panelSelection","state","1.0.0","one",e=>U(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),gd=me("web.activeContext","state","1.0.0","one",e=>U(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function qn(e){return U(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>U(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var hd=me("contacts.directory","service","1.0.0","one",e=>U(e)&&["search","resolveEmails","open"].every(t=>pe(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(qn)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>U(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(qn))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||U(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:St}}),bd=me("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),yd=me("web.navigator","service","1.0.0","one",e=>U(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[ad]),result:St}}),vd=me("selection.textAction","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&pe(e,"run"),e=>[e.id]),fo=me("geo.navigator","service","1.0.0","one",e=>U(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[id]),result:St}}),wd=me("geo.search","service","1.0.0","one",e=>U(e)&&pe(e,"search")&&pe(e,"reverse"),void 0,{search:{args:e=>se(e,[q]),result:sd},reverse:{args:e=>se(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:dd}}),Zr=me("agent.toolProvider","service","1.0.0","many",e=>U(e)&&Array.isArray(e.tools)&&e.tools.every(ud)&&pe(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>se(e,[q,U,ld]),result:cd}},e=>({tools:e.tools}),"global"),xd=me("guard.runtime","service","1.0.0","one",e=>U(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>pe(e,t)),void 0,{resolve:{args:e=>se(e,[U]),result:U},requestApproval:{args:e=>se(e,[U]),result:Ft},consumeToken:{args:e=>e.length>=1&&e.length<=2&&q(e[0])&&Ne(e[1]),result:Ft},audit:{args:e=>se(e,[U]),result:St}}),Td=me("browser.automation","service","1.0.0","one",e=>U(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>pe(e,t)),void 0,{list:{args:e=>e.length===0,result:xe},open:{args:e=>se(e,[q]),result:xe},switch:{args:e=>se(e,[q]),result:xe},close:{args:e=>se(e,[q]),result:xe},snapshot:{args:e=>se(e,[q]),result:xe},readText:{args:e=>e.length>=1&&e.length<=2&&q(e[0])&&od(e[1]),result:xe},readHtml:{args:e=>se(e,[q]),result:xe},screenshot:{args:e=>se(e,[q]),result:xe},click:{args:e=>se(e,[q,t=>typeof t=="number"]),result:xe},type:{args:e=>e.length>=3&&e.length<=4&&q(e[0])&&typeof e[1]=="number"&&q(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:xe},select:{args:e=>se(e,[q,t=>typeof t=="number",q]),result:xe},scroll:{args:e=>se(e,[q,t=>typeof t=="number",t=>typeof t=="number"]),result:xe},pressKey:{args:e=>se(e,[q,q]),result:xe},navigate:{args:e=>se(e,[q,q]),result:xe},back:{args:e=>se(e,[q]),result:xe},forward:{args:e=>se(e,[q]),result:xe},reload:{args:e=>se(e,[q]),result:xe}}),kd=me("fileTree.contextItem","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ne(e.labelKey)&&pe(e,"run"),e=>[e.id]),Sd=me("newTab.entry","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"run"),e=>[e.id]),Jr=me("search.resultCard","extension","1.0.0","many",e=>U(e)&&typeof e.cardKind=="string"&&pe(e,"render")&&pe(e,"open"),e=>[e.cardKind]),Vo=me("metadataPanel.segment","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"render"),e=>[e.id]),Qr=me("workspace.surface","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&pe(e,"getSnapshot")&&pe(e,"subscribe")&&pe(e,"restore"),e=>[e.id]),Dd=me("metadata.plugin","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"facts"),e=>[e.id]),Ed=me("workspace.viewState","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&pe(e,"capture")&&pe(e,"restore")&&pe(e,"subscribe"),e=>[e.id]);var mo="valley";var ju=`.${mo}`,Uu=`app.${mo}`;function Ad(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Cd=/^[a-zA-Z]:/;function en(e){if(typeof e!="string")return"";let t=Ad(e);return!t||t==="."||Cd.test(t)||t.split("/").some(r=>r==="..")?"":t}function dt(e){if(typeof e=="string")return en(e)||void 0}var Oe=`.${mo}`,Nd="plugins",jo=`${Oe}/${Nd}`,Id="external",Wu=`${jo}/${Id}`,Yu=`${jo}/data`;var Xu=`${jo}/plugin.json`,Zu=`${jo}/config.json`,Ju=`${Oe}/state`,zt=`${Oe}/settings`,Gt=`${Oe}/app`,Uo=`${Oe}/accounts`,Qu=`${Uo}/providers`,ep=`${Uo}/providers.lock.json`,tp=`${Oe}/trash`,tn=`${Oe}/cache`,op=`${tn}/accounts`,Ld=`${tn}/search`,rp=`${tn}/providers`;var np=`${Gt}/logs`,ap=`${Gt}/whats-new`,ip=`${Gt}/setup.json`,sp=`${Ld}/index.jsonl`,dp=`${Gt}/recovery/drafts`,lp=`${Gt}/recovery/transactions`;var Ho="design";var cp={app:`${Gt}/app.json`,appearance:`${Oe}/${Ho}/appearance.json`,pallette:`${Oe}/${Ho}/pallette.json`,group:`${Oe}/${Ho}/group.json`,metadata:`${zt}/metadata.json`,notification:`${zt}/notification.json`,preferences:`${zt}/preferences.json`,markdown:`${zt}/markdown.json`,files:`${zt}/files.json`,search:`${zt}/search.json`,design:`${Oe}/${Ho}/appearance.json`,accounts:`${Uo}/accounts.json`},up=`${Uo}/secrets.json`;var Qn=mo,ea="open";var ta=["http:","https:","mailto:","obsidian:"];var mp=[Oe,`${Oe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var o,m,Bo=new Map,qo;function be(){return qo}function oa(e,t){let r=Bo.get(e)??new Set;return r.add(t),Bo.set(e,r),()=>{r.delete(t),r.size||Bo.delete(e)}}function ra(e){qo?.dispose(),m=e,o=e.React;let t=!0,r=new Set;return qo={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},qo.dispose}var Md=1800;function Rt(e){let t=Re();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},d=c=>{i=c.nonce,c.mode==="edit"&&(t.clear(),e(c.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,w=()=>{if(r=null,i!==c.nonce)return;let T=[...Bo.get(c.todoId)??[]].find(h=>h.isConnected);if(!T){Date.now()<g?r=setTimeout(w,40):t.get()?.nonce===c.nonce&&t.clear();return}T.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),T.classList.add("todo-reveal-target"),a=T,n=setTimeout(s,Md),t.get()?.nonce===c.nonce&&t.clear()};r=setTimeout(w,0)},f=t.subscribe(()=>{let c=t.get();c&&d(c)}),u=t.get();return u&&d(u),()=>{f(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function Re(){return m.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}var Od=`
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
  width: var(--todo-filter-width, 264px);
  padding: calc(var(--space-3) / 2);
}

.todo-sort-popover {
  width: var(--todo-sort-width, 240px);
  padding: calc(var(--space-3) / 2);
}

.todo-sort-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-1);
}

.todo-sort-option {
  display: flex;
  align-items: center;
  gap: var(--space-button);
  min-width: 0;
  min-height: var(--menu-item-height);
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
  width: var(--menu-item-height);
  height: var(--menu-item-height);
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
  min-height: var(--menu-item-height);
  padding: var(--space-1) var(--space-2);
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
  gap: var(--space-3);
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
  padding: calc(var(--space-3) / 2);
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
  padding: calc(var(--space-3) / 2);
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
`,on="notes-todo-styles";function na(){let e=document.getElementById(on);return e||(e=document.createElement("style"),e.id=on,document.head.appendChild(e)),e.textContent=Od,()=>{document.getElementById(on)===e&&e.remove()}}function Se(e,t=""){return typeof e=="string"?e:t}function Wo(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rn(e){let t=Se(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function aa(e){let t=Se(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var _d=16384,Fd=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function zd(e){if(!e||e.length>_d||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function Gd(e){try{let t=new URL(e);if(t.protocol!==`${Qn}:`||t.hostname!==ea)return null;let r=en(t.searchParams.get("file"));if(r)return{kind:"file",relPath:r};let n=t.searchParams.get("plugin")??"";if(!Fd.test(n))return null;let a=zd(t.searchParams.get("state")??""),i=t.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let s=t.searchParams.get("instance");return s&&s.length>512?null:a?{kind:"plugin",pluginId:n,state:a,...i?{surface:i}:{},...s?{instanceId:s}:{}}:null}catch{return null}}function $t(e){let t=Gd(e);return t?.kind==="file"?t.relPath:null}function ia(e){try{return ta.includes(new URL(e).protocol)}catch{return!1}}var Y="#12120f",ce="#ffffff",an=[{id:"green",family:"semantic",labelKey:"color.green",light:"#247a52",dark:"#65e6ad",onLight:ce,onDark:Y},{id:"red",family:"semantic",labelKey:"color.red",light:"#c93445",dark:"#ff6b7a",onLight:ce,onDark:Y},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#a85e00",dark:"#ffc45c",onLight:ce,onDark:Y},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ce,onDark:Y},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#9b9000",dark:"#f2e664",onLight:Y,onDark:Y},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ce,onDark:Y},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ce,onDark:Y},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c33e78",dark:"#ff9ec4",onLight:ce,onDark:Y},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ce,onDark:Y},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ce,onDark:ce},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:Y,onDark:Y},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ce,onDark:Y},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ce,onDark:Y},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:Y,onDark:Y},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ce,onDark:Y},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ce,onDark:Y},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ce,onDark:Y},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ce,onDark:Y},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:Y,onDark:Y},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:Y,onDark:Y},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ce,onDark:Y},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ce,onDark:Y},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ce,onDark:Y},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ce,onDark:Y},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ce,onDark:Y},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ce,onDark:Y},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:Y,onDark:Y},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:Y,onDark:Y},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ce,onDark:Y},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:Y,onDark:Y},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ce,onDark:Y},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#2d9e87",dark:"#a4f0dc",onLight:Y,onDark:Y},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:Y,onDark:Y},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ce,onDark:Y},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ce,onDark:Y},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ce,onDark:Y}],Rd=["semantic","muted","accent","categorical"];var Zp=new Map(an.map(e=>[e.id,e])),$d={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Kd=new Map(an.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Vd=/^[a-z][a-z0-9-]{0,47}$/,Hd={version:4,families:Rd.map(e=>({id:e,name:$d[e]})),colors:an.map(e=>({id:e.id,familyId:e.family,name:Kd.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},jd=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var Ud=jd(Hd);function sa(){return Ud}var nn=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Yo="palette:",Bd=/^#[0-9a-f]{6}$/i;function Xo(e){return e.startsWith(Yo)&&Vd.test(e.slice(Yo.length))}function ye(e){return`${Yo}${e}`}function go(e){return Xo(e)?e.slice(Yo.length):void 0}function da(e){if(typeof e!="string")return;let t=e.trim();return Xo(t)?t:Bd.test(t)?t.toLowerCase():void 0}function De(e){let t=go(e);return t?`var(--color-${t})`:e}function la(e){let t=go(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function ca(e){let t=new Set(e.map(r=>go(r)??r.toLowerCase()));return ye(nn.find(r=>!t.has(r))??nn[0])}function ua(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=nn;return ye(r[Math.abs(t)%r.length])}function oe(e){return e.trim().toLowerCase()}function qd(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=oe(i);!s||s===oe(t)||r.has(s)||(r.add(s),n.push(i))}return n}function pa(e){return`group_${oe(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Kt(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=oe(i);if(!i||r.has(s))continue;r.add(s);let d=typeof a.id=="string"&&a.id.trim()?a.id.trim():pa(i),f=da(a.color)??ca(t.map(c=>c.color)),u=qd(a.aliases,i,r);t.push({id:d,name:i,color:f,...u.length?{aliases:u}:{}})}return t}function ho(e,t){let r=oe(t??"");if(r)return e.find(n=>oe(n.name)===r||(n.aliases??[]).some(a=>oe(a)===r))}function Zo(e,t){return ho(t,e)?.name}function Ie(e,t){let r=oe(e??"");return r?ho(t,e)?.color??ua(r):ye("primary-blue")}function sn(e){let t={};for(let r of e){let n=oe(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var fa="statuses",ot=[{id:"open",labelKey:"todo.status.todo",color:ye("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ye("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ye("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ye("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ye("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ye("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ye("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ye("red"),done:!0,cls:"todo-st-canceled",locked:!1}],dn=ot,Qo=ot.map(e=>e.id),bo=ot.filter(e=>!e.locked).map(e=>e.id),Dt=ot.filter(e=>e.done).map(e=>e.id),ma=new Map(ot.map(e=>[e.id,e])),Wd=new Set(bo);function Yd(e){if(typeof e!="string"||!Xo(e))return!1;let t=go(e);if(!t)return!1;let r=sa();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function ga(e){let t=e&&typeof e=="object"?e:{},r=Array.isArray(t.active)?t.active:bo,n=[];for(let s of r)typeof s!="string"||!Wd.has(s)||n.includes(s)||n.push(s);let a=t.colors&&typeof t.colors=="object"?t.colors:{},i=Object.fromEntries(Qo.map(s=>{let d=ma.get(s).color;return[s,Yd(a[s])?a[s]:d]}));return{active:n,colors:i}}function Vt(){return ga(m?.settings.get()[fa])}function ha(e){m.settings.set(fa,ga(e))}function Le(e){let t=e&&ma.get(e)||ot[0];return{...t,color:Vt().colors[t.id]}}function Jo(){let e=Vt();return[ot[0],ot[1],...e.active.map(t=>Le(t))]}function lt(){return Jo().map(e=>e.id)}function ba(e){return e==="open"||e==="completed"||Vt().active.includes(e)}function ct(){let[e,t]=o.useState(Jo);return o.useEffect(()=>m.settings.subscribe(()=>t(Jo())),[]),e}function Ht(e,t=lt()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function jt(e,t){return t==="all"||t.includes(Ee(e))}function Ut(e){if(typeof e=="string")return Qo.includes(e)?e:void 0}function Ee(e){return e.status??(e.completed?"completed":"open")}function Ae(e){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:Dt.includes(e),status:e}}function Bt(){return Jo().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,cls:e.cls}))}function Xd(){return ot.map(e=>{let t=Le(e.id),r=De(t.color);return`.${t.cls}{color:${r}}.todo-detail-field[data-status="${t.id}"] .select-field-value{color:${r}}`}).join("")}function ya(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Xd()};r();let n=m.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function va(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let s=t.slice(i,i+20),d=new Map;for(;s.length;){r();let f=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(c=>({to:c,from:{in:Qo.filter(g=>g!==c)}})),...d.size?{and:[{or:s.map(c=>({taskId:c,position:{lt:d.get(c)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!f.length)break;let u=await a.query({select:["taskId","changedAt"],where:{or:f.map(c=>({taskId:c.taskId,position:c.position}))},limit:20});r(),s=[];for(let c of u.rows){let g=String(c.taskId);if(typeof c.changedAt=="string"&&c.changedAt)n.set(g,{changedAt:c.changedAt});else{let w=f.find(T=>T.taskId===g)?.position;if(typeof w!="number"||!Number.isInteger(w))throw new Error("Invalid completion position");d.set(g,w),s.push(g)}}}}return n}function qt(e){return"historyLoaded"in e&&e.historyLoaded===!1}var wa={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0a8adac9d6d5":"Schedule","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.1d41bafdd3cb":"To-Do: Add a subtask","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.73d64a823b7d":"Add tag\u2026","auto.76411cef59a3":"To-Do: Complete a subtask","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, nested subtasks, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.parentId":"Parent task","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Reorder the To-Do navigation or hide lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are fixed but can be recolored. Reorder or recolor optional statuses, and drag them between Show and Hide.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.tree.indent":"Indent","todo.tree.noParent":"No parent task","todo.tree.outdent":"Outdent","todo.tree.subtaskOf":"Subtask of","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show"};var xa={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0a8adac9d6d5":"Zeitplan","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.1d41bafdd3cb":"To-Do: Eine Teilaufgabe hinzuf\xFCgen","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.76411cef59a3":"To-Do: Eine Teilaufgabe erledigen","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"Aufgaben: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.parentId":"\xDCbergeordnete Aufgabe","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Ordne die To-Do-Navigation neu oder blende nicht verwendete Listen aus.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind fixiert, k\xF6nnen aber eingef\xE4rbt werden. Optionale Status k\xF6nnen neu angeordnet, eingef\xE4rbt und zwischen Einblenden und Ausblenden verschoben werden.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.tree.indent":"Einr\xFCcken","todo.tree.noParent":"Keine \xFCbergeordnete Aufgabe","todo.tree.outdent":"Ausr\xFCcken","todo.tree.subtaskOf":"Teilaufgabe von","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden"};var Ta={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0a8adac9d6d5":"Horario","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.1d41bafdd3cb":"To-Do: agregar una subtarea","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.76411cef59a3":"To-Do: completar una subtarea","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"Tareas: Editar campos de la tarea","todo.command.get":"Tareas: Obtener tarea","todo.command.openTask":"Tareas: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.parentId":"Tarea principal","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Reordena la navegaci\xF3n de tareas u oculta las listas que no utilices.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado son fijos, pero sus colores se pueden cambiar. Reordena o cambia el color de los estados opcionales y arr\xE1stralos entre Mostrar y Ocultar.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.tree.indent":"Aumentar sangr\xEDa","todo.tree.noParent":"Sin tarea principal","todo.tree.outdent":"Reducir sangr\xEDa","todo.tree.subtaskOf":"Subtarea de","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar"};var ka={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0a8adac9d6d5":"Horaire","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.1d41bafdd3cb":"To-Do: Ajouter une sous-t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.76411cef59a3":"To-Do: terminer une sous-t\xE2che","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"T\xE2ches : Modifier les champs d\u2019une t\xE2che","todo.command.get":"T\xE2ches : Lire une t\xE2che","todo.command.openTask":"T\xE2ches : Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.parentId":"T\xE2che parente","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"R\xE9ordonnez la navigation To-Do ou masquez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont fixes, mais leur couleur reste modifiable. R\xE9ordonnez ou recolorez les statuts facultatifs et faites-les glisser entre Afficher et Masquer.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.tree.indent":"Indenter","todo.tree.noParent":"Aucune t\xE2che parente","todo.tree.outdent":"D\xE9sindenter","todo.tree.subtaskOf":"Sous-t\xE2che de","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB\xA0{{title}}\xA0\xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher"};var Sa={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0a8adac9d6d5":"\u65F6\u95F4\u8868","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.1d41bafdd3cb":"To-Do\uFF1A\u6DFB\u52A0\u5B50\u4EFB\u52A1","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.76411cef59a3":"To-Do\uFF1A\u5B8C\u6210\u5B50\u4EFB\u52A1","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.parentId":"\u7236\u4EFB\u52A1","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u91CD\u65B0\u6392\u5E8F\u5F85\u529E\u5BFC\u822A\u6216\u9690\u85CF\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u72B6\u6001\u56FA\u5B9A\u542F\u7528\uFF0C\u4F46\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3002\u53EF\u91CD\u65B0\u6392\u5E8F\u6216\u66F4\u6539\u53EF\u9009\u72B6\u6001\u7684\u989C\u8272\uFF0C\u5E76\u5728\u663E\u793A\u548C\u9690\u85CF\u4E4B\u95F4\u62D6\u52A8\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.tree.indent":"\u589E\u52A0\u7F29\u8FDB","todo.tree.noParent":"\u65E0\u4E0A\u7EA7\u4EFB\u52A1","todo.tree.outdent":"\u51CF\u5C11\u7F29\u8FDB","todo.tree.subtaskOf":"\u5B50\u4EFB\u52A1\u5F52\u5C5E","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A"};var Da={en:wa,de:xa,es:Ta,fr:ka,"zh-CN":Sa};function Ea(e,t){return(Da.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var Aa=Ea;function Ca(e){e.ui.registerCatalogs(Da),Aa=(t,r)=>{let n=e.ui.t(t,r);return n===t?Ea(t,r):n}}function l(e,t){return Aa(e,t)}var ol={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},rl={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},nl={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"};function ut(e,t=""){if(e===null||e==="open")return l("todo.status.todo");let r=ol[e];return r?l(r):t||e}function Na(e){return l(rl[e])}function Ia(e){return l(nl[e])}var Wt="todo.tasks",yo="todo.task_tags",vo="todo.task_links",wo="todo.task_attachments",tr="todo.focus_sessions",ft="todo.status_history",xo=[Wt,yo,vo,wo],al=[...xo,tr,ft],Oa=[...xo,ft];function il(e,t){let r=be(),n=e.map(s=>r.api.data.dataset(s).subscribe(t)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function mt(e){return il(Oa,e)}function _a(e){let t=xo.map(r=>m.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}var sl=["normal","low","medium","high"];function La(e){return e===!0}function dl(e){return typeof e=="string"&&sl.includes(e)?e:"normal"}function er(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function ll(e){return Array.isArray(e)?e.filter(t=>Wo(t)).map(t=>({startedAt:Se(t.startedAt),endedAt:Se(t.endedAt),activeMinutes:er(t.activeMinutes)??0,pauseMinutes:er(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function Fa(e){return Array.isArray(e)?e.filter(t=>Wo(t)).map(t=>({from:Ut(t.from),to:Ut(t.to),changedAt:Se(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function cl(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function ln(e){if(typeof e!="string")return;let t=e.trim();if(t)return $t(t)||ia(t)?t:void 0}function za(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>ln(n)).filter(n=>!!n))];return r.length?r:void 0}function Ga(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>dt(r)).filter(r=>!!r))];return t.length?t:void 0}function ul(e){if(!Wo(e))return;let t=Se(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function or(e){let t=new Date().toISOString(),r=Se(e.id,`todo_${Date.now().toString(36)}`),n=Se(e.createdAt,t),a=ll(e.history),i=Fa(e.statusHistory),s=Ut(e.status);return{id:r,title:Se(e.title).trim(),completed:La(e.completed)||s==="completed"||s==="canceled",priority:dl(e.priority),dueDate:Se(e.dueDate),startTime:rn(e.startTime),endTime:rn(e.endTime),color:aa(e.color),note:Se(e.note),tags:Array.isArray(e.tags)?e.tags.filter(d=>typeof d=="string"&&!!d.trim()).map(d=>d.trim()):[],estimatedMinutes:er(e.estimatedMinutes),actualMinutes:er(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:dt(e.filePath),group:Se(e.group).trim()||void 0,flagged:La(e.flagged)||void 0,parentId:(()=>{let d=Se(e.parentId).trim();return d&&d!==r?d:void 0})(),urls:za(e.urls),attachments:Ga(e.attachments),location:ul(e.location),remindAt:cl(e.remindAt),reminderFiredAt:Se(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Se(e.updatedAt,n)}}function Ra(e){return{...e,filePath:dt(e.filePath),urls:za(e.urls),attachments:Ga(e.attachments)}}function $a(e){return{id:e.id,title:e.title,completed:e.completed,priority:e.priority,dueDate:e.dueDate,startTime:e.startTime??null,endTime:e.endTime??null,color:e.color??null,note:e.note,estimatedMinutes:e.estimatedMinutes??null,actualMinutes:e.actualMinutes??null,status:e.status??null,filePath:e.filePath??null,group:e.group??null,flagged:e.flagged??null,parentId:e.parentId??null,location:e.location??null,remindAt:e.remindAt??null,reminderFiredAt:e.reminderFiredAt??null,createdAt:e.createdAt,updatedAt:e.updatedAt}}async function pt(e,t,r=be()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function Ka(e,t=!0,r=!0,n=be()){let a=e?{taskId:e}:void 0,i=await Promise.allSettled([r?pt(yo,a,n):[],pt(vo,a,n),pt(wo,a,n),t?pt(tr,a,n):[],t?pt(ft,a,n):[]]),[s,d,f,u,c]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:s,links:d,attachments:f,sessions:u,statusHistory:c}}function Va(e,t=!0){return[...t?e.tags.map(r=>({dataset:yo,operation:"insert",values:{taskId:e.id,tag:r}})):[],...(e.urls??[]).map((r,n)=>({dataset:vo,operation:"insert",values:{taskId:e.id,position:n,url:r}})),...(e.attachments??[]).map((r,n)=>({dataset:wo,operation:"insert",values:{taskId:e.id,position:n,path:r}})),...(e.history??[]).map((r,n)=>({dataset:tr,operation:"insert",values:{taskId:e.id,position:n,...r}})),...(e.statusHistory??[]).map((r,n)=>({dataset:ft,operation:"insert",values:{taskId:e.id,position:n,...r}}))]}function pl(e,t){return[...t.tags.map(r=>({dataset:yo,operation:"delete",key:{taskId:e,tag:String(r.tag)}})),...t.links.map(r=>({dataset:vo,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...t.attachments.map(r=>({dataset:wo,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...t.sessions.map(r=>({dataset:tr,operation:"delete",key:{taskId:e,position:Number(r.position)}})),...t.statusHistory.map(r=>({dataset:ft,operation:"delete",key:{taskId:e,position:Number(r.position)}}))]}async function Ha(e,t,r){let[n,a]=await Promise.allSettled([pt(Wt,r?{id:r}:void 0,e),Ka(r,t,!0,e)]);if(n.status==="rejected")throw n.reason;if(a.status==="rejected")throw a.reason;return e.assertActive(),ja(n.value,a.value,Kt(e.api.getState().groups))}function ja(e,t,r){let n=(u,c=!1)=>{let g=new Map;for(let w of u){let T=g.get(w.taskId);T?T.push(w):g.set(w.taskId,[w])}if(c)for(let w of g.values())w.sort((T,h)=>Number(T.position)-Number(h.position));return g},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),d=n(t.sessions,!0),f=n(t.statusHistory,!0);return e.map(u=>or({...u,tags:(a.get(u.id)??[]).map(c=>c.tag),urls:(i.get(u.id)??[]).map(c=>c.url),attachments:(s.get(u.id)??[]).map(c=>c.path),history:d.get(u.id)??[],statusHistory:f.get(u.id)??[]})).map(u=>({...u,group:Zo(u.group,r)??u.group})).filter(u=>u.title)}var Pa=new WeakMap;function rr(e,t,r,n,a){try{e.assertActive()}catch(f){return Promise.reject(f)}let i=Pa.get(e);i||(i=new Map,Pa.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let f=s,u=r.map(c=>e.api.data.dataset(c).subscribe(()=>{f.revision++}));e.onDispose(()=>{u.forEach(c=>c()),i.clear()}),i.set(t,s)}let d=s.pending.get(n);return d||(d=(async()=>{for(await Promise.resolve();;){e.assertActive();let f=s.revision,u=await a();if(e.assertActive(),f===s.revision)return u}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,d)),d}function Ua(e,t){let r=be();return rr(r,e?"full":"calendar",e?al:xo,t??"",()=>Ha(r,e,t))}function rt(e=be()){return rr(e,"list",Oa,"",async()=>{let t=await Ha(e,!1),r=await va(e.api,t.map(n=>n.id),e.assertActive);return t.map(n=>({...n,historyLoaded:!1,completionSummary:r.get(n.id)??null}))})}var Ma=new WeakMap,fl=0;function ml(e,t){let r=Ma.get(e);r||(r=new Map,Ma.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++fl),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function gl(e,t,r){return rr(e,"statusHistory",[ft],r.key,async()=>{let n=await pt(ft,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Fa(n)})}function Ba(e){let t=be(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=ml(t,e),s=0,d=!1,f=()=>{let w=++s;gl(t,e,a).then(T=>{!d&&w===s&&n({scope:t,id:e,history:T})}).catch(()=>{})},u=t.api.data.dataset(ft).subscribe(w=>{(!w.keys||w.keys.some(T=>T.taskId===e))&&f()}),c=()=>{d=!0,u(),i()},g=t.onDispose(c);return f(),()=>{g(),c()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function Ue(){return Ua(!0)}async function Ke(e){return e?(await Ua(!0,e))[0]??null:null}function qa(e,t,r,n){let a=be();return rr(a,"calendarPage",xo,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(Wt).query({where:{dueDate:{gte:e,lt:`${t}\uFFFF`}},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let w=[];for(let T=0;T<i.rows.length;T+=100)w.push(...await pt(g,{taskId:{in:i.rows.slice(T,T+100).map(h=>String(h.id))}},a));return w},d=await Promise.allSettled([s(yo),s(vo),s(wo)]),[f,u,c]=d.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:ja(i.rows,{tags:f,links:u,attachments:c,sessions:[],statusHistory:[]},Kt(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function hl(e){let t=Ra(e);try{return await m.data.transaction([{dataset:Wt,operation:"insert",values:$a(t)},...Va(t)]),!0}catch{return!1}}async function bl(e,t,r,n){try{let a={pluginId:m.pluginId,sourceId:"tasks",itemId:e},i=await m.documents.read(a);if(!i)return!1;let s=await Ke(e);if(!s||r!==void 0&&s.updatedAt!==r)return!1;let d={...t,id:e,history:qt(t)&&t.history===void 0?s.history:t.history},f=Ee(s),u=Ee(d),c=[...s.statusHistory??[]];f!==u&&c.push({from:f,to:u,changedAt:new Date().toISOString()}),d={...d,statusHistory:c.length?c:void 0};let g=Ra(d),w=await Ka(e,!0,!1),T=$a(g);delete T.id,delete T.note;let h=await m.documents.update(a,{expectedRevision:n?.expectedRevision??i.revision,vaultGeneration:n?.vaultGeneration??i.vaultGeneration,body:g.note,explicitTags:g.tags??[],operations:[{dataset:Wt,operation:"update",key:{id:e},values:T},...pl(e,w),...Va(g,!1)]});return n&&Object.assign(n,{expectedRevision:h.revision,vaultGeneration:h.vaultGeneration}),!0}catch{return!1}}async function yl(e){try{return(await m.data.dataset(Wt).delete({id:e})).affected>0}catch{return!1}}var $e=hl,je=bl,Je=yl;async function nr(e){if(!e.id||!e.title.trim())return!1;let t=await $e(e);return t&&m.undo.push({label:l("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Je(e.id)}),redo:async()=>({ok:await $e(e)})}),t}async function Yt(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await Ke(e),i=qt(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;qt(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await je(e,i,r,n);return s&&a&&m.undo.push({label:l("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await je(e,a)}),redo:async()=>({ok:await je(e,i)})}),s}async function Wa(e){let t=await Ke(e),r=await Je(e);return r&&t&&m.undo.push({label:l("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await $e(t)}),redo:async()=>({ok:await Je(e)})}),r}async function Ya(e,t){let r=[...new Set(e)];if(!r.length)return!1;let n=(await Ue()).filter(i=>r.includes(i.id));if(n.length!==r.length)return!1;let a=[];for(let i of r){if(!await Je(i)){for(let d of a.reverse())await $e(d);return!1}let s=n.find(d=>d.id===i);s&&a.push(s)}return m.undo.push({label:l("todo.undo.delete",{title:t}),undo:async()=>{for(let i of n)if(!await $e(i))return{ok:!1};return{ok:!0}},redo:async()=>{for(let i of r)if(!await Je(i))return{ok:!1};return{ok:!0}}}),!0}async function To(e,t){await m.ui.confirm({title:l("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${l("todo.delete.message")}`),actions:[{label:l("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:l("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await t(e.id)}async function Xa(e){let t=await Ke(e);if(!t||t.reminderFiredAt)return!1;let r=new Date().toISOString();return je(e,{...t,reminderFiredAt:r,updatedAt:r})}function vl(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Et(e,t,...r){let n=vl(e);if(!n.tags.length&&!n.text)return!0;let a=t.map(i=>i.toLowerCase());for(let i of n.tags)if(!a.some(s=>s.startsWith(i)))return!1;return!(n.text&&!r.map(s=>s.toLowerCase()).some(s=>s.includes(n.text)))}function Te(e=[]){return e.map(t=>Zo(t.name,e)??t.name)}function wl(){return Kt(m.getState().groups)}function Ge(){return wl()}function Za(e){return m.subscribe(e)}function Be(){let[e,t]=o.useState(Ge);return o.useEffect(()=>m.subscribe(()=>t(Ge())),[]),e}function Ja(){let e=be(),t=!1,r=()=>{rt(e).then(a=>{e.assertActive(),t||e.api.workspace.reportGroupUsage(sn(a.map(i=>i.group)))}).catch(()=>{})};r();let n=mt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function xl(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Tl(e){let t=e.toLowerCase();return xl(t)?t:"yyyy-mm-dd"}function Qa(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Tl(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var kl="ddd d mmm",Sl=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Dl(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!Sl.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function El(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return Dl(t)?t:kl}function ei(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,d=new Date(Number(a),Number(i)-1,Number(s),12),f={d:String(Number(s)),dd:s,ddd:new Intl.DateTimeFormat(r,{weekday:"short"}).format(d),dddd:new Intl.DateTimeFormat(r,{weekday:"long"}).format(d),mmm:new Intl.DateTimeFormat(r,{month:"short"}).format(d),mmmm:new Intl.DateTimeFormat(r,{month:"long"}).format(d),yyyy:a};return El(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,u=>f[u])}var We=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var At={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},ar={high:3,medium:2,low:1,normal:0};function Xt(e,t){return e.title.localeCompare(t.title,void 0,{sensitivity:"base"})}function Al(e,t,r){if(r==="name")return Xt(e,t);if(r==="priority"){let i=ar[t.priority]-ar[e.priority];return i!==0?i:qe(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:qe(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return qe(e,t);if(!i)return-1;if(!s)return 1;let d=i.localeCompare(s);return d!==0?d:qe(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Xt(e,t)}function cn(e,t){let r=ar[t.priority]-ar[e.priority];return r!==0?r:Xt(e,t)}function qe(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return cn(e,t)}function Zt(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",d=a.dueDate||"";if(!s&&!d)return qe(n,a);if(!s)return-1;if(!d)return 1;let f=d.localeCompare(s);return f!==0?f:qe(n,a)}let i=Al(n,a,t);return r==="asc"?i:-i})}function _e(e,t="dd-mm-yyyy"){return e?Qa(e,t):""}function ke(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function ir(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function Jt(e,t){let r=ir(e);return r?(r.setDate(r.getDate()+t),ke(r)):e}function nt(e,t,r="ddd d mmm"){return ei(e.slice(0,10),r,t)}function ti(e,t,r={}){let n=ir(`${e}-01`);if(!n)return e;let a=r.now??new Date,i=n.getFullYear()===a.getFullYear(),s=n.toLocaleDateString(t,i?{month:"long"}:{month:"long",year:"numeric"});return r.partial&&r.restOfLabel?r.restOfLabel.replace("{{p0}}",s):s}function oi(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,d,f]=i.split("-").map(Number),[u,c,g]=t.split("-").map(Number);if(!s||!d||!f||!u||!c||!g)return _e(e,a);let w=new Date(s,d-1,f),T=new Date(u,c-1,g),h=Math.round((w.getTime()-T.getTime())/864e5);return h===1?r.tomorrow:h===-1?r.yesterday:h>1&&h<7?w.toLocaleDateString(n,{weekday:"long"}):_e(e,a)}function Cl(e,t,r){let n=t.get(e)?.parentId;if(!n||!r.has(n))return null;let a=new Set([e]),i=n;for(;i;){if(a.has(i))return null;if(a.add(i),i=t.get(i)?.parentId,i&&!r.has(i))break}return n}function ri(e){let t=new Map(e.map(d=>[d.id,d])),r=new Set(t.keys()),n=new Map,a=[];for(let d of e){let f=Cl(d.id,t,r);if(f===null){a.push(d);continue}let u=n.get(f);u?u.push(d):n.set(f,[d])}let i=[],s=(d,f)=>{let u=n.get(d.id)??[];i.push({todo:d,depth:Math.min(f,5),hasChildren:u.length>0});for(let c of u)s(c,f+1)};for(let d of a)s(d,0);return i}function Ve(e,t){let r=new Map;for(let s of e){if(!s.parentId)continue;let d=r.get(s.parentId);d?d.push(s.id):r.set(s.parentId,[s.id])}let n=[],a=new Set([t]),i=s=>{for(let d of r.get(s)??[])a.has(d)||(a.add(d),n.push(d),i(d))};return i(t),n}function Nl(e,t){let r=new Map(e.map(s=>[s.id,s])),n=new Set([t]),a=0,i=r.get(t)?.parentId;for(;i&&!n.has(i)&&r.has(i);)n.add(i),a++,i=r.get(i)?.parentId;return Math.min(a,5)}function Il(e,t){let r=new Map;for(let s of e){if(!s.parentId)continue;let d=r.get(s.parentId);d?d.push(s.id):r.set(s.parentId,[s.id])}let n=new Set([t]),a=0,i=(s,d)=>{for(let f of r.get(s)??[])n.has(f)||(n.add(f),a=Math.max(a,d),i(f,d+1))};return i(t,1),a}function Qt(e,t,r){return r?t===r||Ve(e,t).includes(r)?!1:Nl(e,r)+1+Il(e,t)<=5:!0}function Ll(e,t){let r=e[t];if(!r||t<=0||r.depth>=5)return null;let n=r.depth;for(let a=t+1;a<e.length&&e[a].depth>r.depth;a++)n=Math.max(n,e[a].depth);for(let a=t-1;a>=0;a--){let i=e[a];if(i.depth<=r.depth){let s=i.depth+1-r.depth;return n+s<=5?i.todo:null}}return null}function ni(e,t){let r=Ll(e,t);return r?{parentId:r.id}:null}function un(e,t){let r=new Map(e.map(i=>[i.id,i])),n=r.get(t)?.parentId;return n?{parentId:r.get(n)?.parentId||void 0}:null}function ai(e,t){return un(e,t)!==null}var Uf=new Date(2023,0,1,12);var Pl={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function pn(e){return Pl[e??""]??1}function ii(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Ml(e,t){return(e.getDay()-t+7)%7}function si(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Ml(e,t))}function ko(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var eo=["overdue","today","upcoming","someday","completed"],ci={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function He(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function So(e,t=He()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||qe(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(qe),r.someday.sort(cn),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Xt(a,i)),r}function ui(e,t=He()){let r=new Map,n=new Map(e.map(s=>[s.id,s])),a=e.filter(s=>!s.parentId||!n.has(s.parentId));for(let s of a){let d=s.dueDate?.slice(0,10)??"";r.set(s.id,d);for(let f of Ve(e,s.id))r.set(f,d)}let i=new Map;for(let s of e){let d=r.get(s.id)??s.dueDate?.slice(0,10)??"",f=i.get(d);f?f.push(s):i.set(d,[s])}return[...i.entries()].sort(([s],[d])=>s===""?1:d===""?-1:s.localeCompare(d)).map(([s,d])=>({key:s,overdue:!!s&&s<t,todos:d.sort(qe)}))}function Ct(e){return qt(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function fn(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):He(t)}function pi(e){let t=[...e].sort((n,a)=>Ct(a).localeCompare(Ct(n))||Xt(n,a)),r=new Map;for(let n of t){let a=fn(Ct(n)),i=r.get(a);i?i.push(n):r.set(a,[n])}return[...r.entries()].sort(([n],[a])=>a.localeCompare(n)).map(([n,a])=>({key:n,kind:"daily",todos:a}))}function mn(e,t,r=1,n){let a=n?.dateOf??(u=>u.dueDate?.slice(0,10)??""),i=new Map(e.map(u=>[u.id,u])),s=new Map;if(n?.inheritRoot!==!1)for(let u of e.filter(c=>!c.parentId||!i.has(c.parentId))){let c=a(u);s.set(u.id,c);for(let g of Ve(e,u.id))s.set(g,c)}let d=u=>u?t==="monthly"?u.slice(0,7):t==="daily"?u:He(si(ko(u),r)):"",f=new Map;for(let u of e){let c=d(s.get(u.id)??a(u)),g=f.get(c);g?g.push(u):f.set(c,[u])}return[...f.entries()].sort(([u],[c])=>u===""?-1:c===""?1:c.localeCompare(u)).map(([u,c])=>({key:u,kind:u?t:"none",todos:c}))}var Ol=["untimed","morning","afternoon","tonight"],fi={untimed:"",morning:"todo.timeOfDay.morning",afternoon:"todo.timeOfDay.afternoon",tonight:"todo.timeOfDay.tonight"};function di(e){if(!e)return"untimed";let t=Number(e.slice(0,2));return Number.isFinite(t)?t<12?"morning":t<18?"afternoon":"tonight":"untimed"}function mi(e){let t=new Map(e.map(a=>[a.id,a])),r=new Map;for(let a of e.filter(i=>!i.parentId||!t.has(i.parentId))){let i=di(a.startTime);r.set(a.id,i);for(let s of Ve(e,a.id))r.set(s,i)}let n=new Map;for(let a of e){let i=r.get(a.id)??di(a.startTime),s=n.get(i);s?s.push(a):n.set(i,[a])}return Ol.filter(a=>n.has(a)).map(a=>({id:a,todos:n.get(a).sort(qe)}))}var _l=14;function li(e){return e.slice(0,7)}function gi(e,t,r=_l){let n=Fl(t,r),a=[],i=[];for(let u of e)!u.key||u.key<=n?a.push(u):i.push(u);let s=new Map;for(let u of i){let c=li(u.key),g=s.get(c);g?g.push(u):s.set(c,[u])}let d=li(t),f=[...s.entries()].sort(([u],[c])=>u.localeCompare(c)).map(([u,c])=>({key:u,days:c,partial:u===d}));return{near:a,months:f}}function Fl(e,t){let[r,n,a]=e.split("-").map(Number),i=new Date(r,(n||1)-1,(a||1)+t);return He(i)}function hi(e,t=He()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,d,f)=>{let u=f.toLowerCase();if(u==="today")r=t;else if(u==="tomorrow"){let c=new Date(`${t}T00:00:00`);c.setDate(c.getDate()+1),r=He(c)}else r=f;return d}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,d,f)=>(n=f.length>=3?"high":f.length===2?"medium":"low",d)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var ge=e=>typeof e=="string"?e:"",xi=e=>ge(e?.query).trim(),lr=["normal","low","medium","high"];function gt(){return new Date().toISOString()}function bi(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function yi(e){let t=e.trim();if(!t)return;let r=ho(Ge(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in Settings \u2192 Appearance \u2192 Groups first.`);return r.name}function vi(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return bi();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),bi(t)}return e}function zl(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function Gl(e,t){let r=new Map(e.map(s=>[s.id,s])),n=new Set([t]),a=0,i=r.get(t)?.parentId;for(;i&&!n.has(i)&&a<=5;)n.add(i),a++,i=r.get(i)?.parentId;return a}function sr(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Do(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var dr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=xi(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function to(e,t,r){let n=Do(await Ue(),e),a=t(n);if(!await je(n.id,a,n.updatedAt))throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{await je(n.id,n)},reapply:async()=>{await je(n.id,a)}}}}async function wi(e){return to(e,t=>({...t,completed:!0,status:"completed",updatedAt:gt()}),t=>`Complete \u201C${t.title}\u201D`)}var Nt={type:"string"},Ti={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","parentId","remindAt"].map(e=>[e,Nt])),priority:{type:"string",enum:lr},status:{type:"string",enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Nt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Nt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Rl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in Ti.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!lr.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!lt().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function $l(e,t,r){let n=await Ue(),a=n.find(s=>s.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.parentId!==void 0&&(t.parentId&&!n.some(s=>s.id===t.parentId)||!Qt(n,e,t.parentId)))throw new Error("This parent would create an invalid task tree.");if(t.group&&!Te(Ge()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=or({...a,...t,...t.status?Ae(t.status):t.completed!==void 0?Ae(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:gt()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(t[s]?.some(d=>!i[s]?.includes(d)))throw new Error(`Invalid task ${s}.`);if(!await je(e,i,a.updatedAt))throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await je(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await je(e,i))throw new Error("Could not reapply the task edit.")}}}}async function Ye(e){let t=e??{},r=t.id??t.query,n={groups:Ge(),statuses:lt()};if(!r)return n;let a=await Ue(),i=Do(a,r),s=new Set([i.id,...Ve(a,i.id)]);for(let d=i.parentId;d&&!s.has(d);d=a.find(f=>f.id===d)?.parentId)s.add(d);for(let d=t.values?.parentId;d&&!s.has(d);d=a.find(f=>f.id===d)?.parentId)s.add(d);return{...n,records:a.filter(d=>s.has(d.id)).sort((d,f)=>d.id.localeCompare(f.id))}}function ki(e){let t=[e.commands.register({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Nt},required:["id"],additionalProperties:!1},parse:r=>{let n=ge(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=await Ke(r);if(!n)throw new Error("The task no longer exists. Open To-Do to choose another task.");return e.workspace.openMainTab(),Re().request(r,"edit"),n}}),e.commands.register({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Nt},required:["id"],additionalProperties:!1},parse:r=>{let n=ge(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=await Ke(r);if(!n)throw new Error("The task no longer exists.");return n}}),e.commands.register({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Nt,values:Ti,expectedUpdatedAt:Nt},required:["id","values"],additionalProperties:!1},parse:r=>{let n=r,a=ge(n?.id).trim();if(!a||n.expectedUpdatedAt!==void 0&&typeof n.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:a,values:Rl(n.values),expectedUpdatedAt:n.expectedUpdatedAt}}},run:({id:r,values:n,expectedUpdatedAt:a})=>$l(r,n,a),revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"open-page",label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>{e.workspace.openMainTab()},formatCli:()=>"Opened To-Do page."}),e.commands.register({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.title).trim();if(!a)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:a,due:ge(n.due),priority:ge(n.priority),status:ge(n.status),note:ge(n.note),group:ge(n.group)}},fromCli:(r,n)=>({title:r.join(" ").trim(),due:n.due,priority:n.priority,status:n.status,note:n.note,group:n.group})},run:async({title:r,due:n,priority:a,status:i,note:s,group:d})=>{let f=lt();if(i&&!f.includes(i))throw new Error(`Status "${i}" is not enabled. One of: ${f.join(", ")}`);let u=or({title:r,priority:a||"normal",status:i||void 0,dueDate:vi(n),note:s,group:yi(d)});if(!await $e(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Je(u.id)},reapply:async()=>{await $e(u)}}}},formatCli:r=>`Added: ${sr(r)}`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:dr,run:({query:r})=>wi(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:dr,run:({query:r})=>wi(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=xi(r);if(!n)throw new Error('Usage: todo search "<query>"');return{query:n}},fromCli:r=>({query:r.join(" ").trim()})},run:async({query:r})=>(await Ue()).filter(n=>Et(r,n.tags,n.title,n.note)).slice(0,20),formatCli:r=>r.length?r.map(sr).join(`
`):"No matching todos."}),e.commands.register({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:dr,run:({query:r})=>to(r,n=>({...n,completed:!1,status:"open",updatedAt:gt()}),n=>`Reopen \u201C${n.title}\u201D`),formatCli:r=>`Reopened: ${r.title}`,revision:r=>Ye(r),preview:r=>({changes:r})}),...["cancel","pause"].map(r=>e.commands.register({id:r,label:`To-Do: ${r==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:dr,run:({query:n})=>{let a=r==="cancel"?"canceled":"onhold";if(!ba(a))throw new Error(`Status "${a}" is disabled in To-Do settings.`);return to(n,i=>({...i,...Ae(a),updatedAt:gt()}),i=>`${r==="cancel"?"Cancel":"Hold"} \u201C${i.title}\u201D`)},formatCli:n=>`${r==="cancel"?"Canceled":"On hold"}: ${n.title}`,revision:n=>Ye(n),preview:n=>({changes:n})})),e.commands.register({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.query).trim(),i=ge(n.status),s=lt();if(!a||!s.includes(i))throw new Error(`Usage: todo status "<id or title>" <${s.join("|")}>`);return{query:a,status:i}},fromCli:r=>({query:r.slice(0,-1).join(" "),status:r.at(-1)})},run:({query:r,status:n})=>to(r,a=>({...a,...Ae(n),updatedAt:gt()}),a=>`Set status for \u201C${a.title}\u201D`),formatCli:r=>`${r.title} \u2192 ${r.status}`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.query).trim(),i=ge(n.priority);if(!a)throw new Error("Expected a todo id or title.");if(i&&!lr.includes(i))throw new Error(`Invalid priority "${i}". One of: ${lr.join(", ")}`);return{query:a,title:typeof n.title=="string"?n.title:void 0,priority:i||void 0,due:typeof n.due=="string"?n.due:void 0,note:typeof n.note=="string"?n.note:void 0,tags:typeof n.tags=="string"?zl(n.tags):void 0,group:typeof n.group=="string"?n.group:void 0}},fromCli:(r,n)=>({query:r.join(" "),title:n.title,priority:n.priority,due:n.due,note:n.note,tags:n.tag,group:n.group})},run:({query:r,title:n,priority:a,due:i,note:s,tags:d,group:f})=>to(r,u=>({...u,title:n??u.title,priority:a??u.priority,dueDate:i===void 0?u.dueDate:vi(i),note:s??u.note,tags:d??u.tags,group:f===void 0?u.group:yi(f),updatedAt:gt()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:r=>`Edited: ${sr(r)}`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.query).trim();if(!a)throw new Error("Expected a todo id or title.");return{query:a,confirm:n.confirm===!0||n.confirm==="true"}},fromCli:(r,n)=>({query:r.join(" "),confirm:n.confirm})},run:async({query:r,confirm:n})=>{let a=await Ue(),i=Do(a,r);if(!n)return{value:{deleted:!1,todo:i,deletedCount:0},revert:null};let s=[...Ve(a,i.id).reverse(),i.id],d=a.filter(u=>s.includes(u.id)),f=[];for(let u of s){if(!await Je(u)){for(let g of f)await $e(g);throw new Error("Failed to delete todo.")}let c=d.find(g=>g.id===u);c&&f.push(c)}return{value:{deleted:!0,todo:i,deletedCount:d.length},revert:{label:`Delete \u201C${i.title}\u201D`,run:async()=>{for(let u of d)await $e(u)},reapply:async()=>{for(let u of s)await Je(u)}}}},formatCli:({deleted:r,todo:n,deletedCount:a})=>r?`Deleted: ${n.title}${a>1?` (${a} tasks)`:""}`:`Would delete "${n.title}" [${n.id}]. Re-run with --confirm to delete.`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"subtask-add",label:"To-Do: Add a subtask",labelKey:"auto.1d41bafdd3cb",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"}},required:["query","title"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.query).trim(),i=ge(n.title).trim();if(!a||!i)throw new Error('Usage: todo subtask-add "<parent>" "<title>"');return{query:a,title:i}},fromCli:r=>({query:r[0],title:r.slice(1).join(" ")})},run:async({query:r,title:n})=>{let a=await Ue(),i=Do(a,r);if(Gl(a,i.id)>=5)throw new Error(`\u201C${i.title}\u201D is already ${5} levels deep.`);let s=gt(),d={id:`todo_${Date.now().toString(36)}_${Math.floor(Math.random()*1e6).toString(36)}`,title:n,completed:!1,priority:"normal",dueDate:i.dueDate,note:"",tags:[],parentId:i.id,group:i.group,createdAt:s,updatedAt:s};if(!await $e(d))throw new Error("Could not add the subtask.");return{value:{parent:i,child:d},revert:{label:`Add subtask to \u201C${i.title}\u201D`,run:async()=>{await Je(d.id)},reapply:async()=>{await $e(d)}}}},formatCli:({parent:r,child:n})=>`Added subtask "${n.title}" to "${r.title}"`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"subtask-done",label:"To-Do: Complete a subtask",labelKey:"auto.76411cef59a3",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},subtask:{type:"string"}},required:["query","subtask"],additionalProperties:!1},parse:r=>{let n=r??{},a=ge(n.query).trim(),i=ge(n.subtask).trim();if(!a||!i)throw new Error('Usage: todo subtask-done "<parent>" "<title>"');return{query:a,subtask:i}},fromCli:r=>({query:r[0],subtask:r.slice(1).join(" ")})},run:async({query:r,subtask:n})=>{let a=await Ue(),i=Do(a,r),s=Ve(a,i.id).map(u=>a.find(c=>c.id===u)).filter(u=>u.title.toLowerCase().includes(n.toLowerCase()));if(s.length!==1)throw new Error(s.length?"Multiple subtasks match.":`No subtask matching "${n}".`);let d=s[0],f=await to(d.id,u=>({...u,...Ae("completed"),updatedAt:gt()}),()=>`Complete subtask \u201C${d.title}\u201D`);return{...f,value:{todo:f.value,subtask:d}}},formatCli:({subtask:r})=>`Completed subtask "${r.title}"`,revision:r=>Ye(r),preview:r=>({changes:r})}),e.commands.register({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:r=>{let n=r??{};return{section:ge(n.section),q:ge(n.q)}},fromCli:(r,n)=>({section:ge(n.section),q:ge(n.q??n.search)})},run:async({section:r,q:n})=>{let a=await Ue();return n&&(a=a.filter(i=>Et(n,i.tags,i.title,i.note))),r&&eo.includes(r)?So(a)[r]:a},formatCli:r=>r.length===0?"No matching todos.":r.map(sr).join(`
`)}),e.commands.register({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let r=await Ue(),n=Ge();return Te(n).map(a=>({name:a,count:r.filter(i=>oe(i.group??"")===oe(a)).length}))},formatCli:r=>r.length?r.map(n=>`${n.name} (${n.count})`).join(`
`):"No groups."})];return()=>t.forEach(r=>r())}var Si={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var Vl=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Hl=/^-\s+(.*)$/,jl=/^[A-Za-z][\w+.-]*:\/\//;function Di(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(Hl);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=jl.test(a)?null:a.match(Vl);if(s){let d=s[1].trim().toLowerCase(),f=s[2].trim();f===""?(r=d,t.lists[d]=t.lists[d]??[]):(r=null,t.values[d]=f);continue}r=null,t.bare===null&&(t.bare=a)}return t}function Ei(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var hn="notes-todo-fence-styles";function Ul(){if(document.getElementById(hn))return;let e=document.createElement("style");e.id=hn,e.textContent=`
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
`,document.head.appendChild(e)}var Ai=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},Bl=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function ql(e,t){let r=Ai(),n=Bl(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Wl=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let c=be(),g=!0,w=()=>{rt(c).then(h=>{c.assertActive(),g&&r(h)}).catch(()=>{})};w();let T=mt(w);return()=>{g=!1,T()}},[]);let n=Di(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:Ei(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},l("auto.33ce417454bf"));let d=ql(t,s),f=Ai(),u=c=>{let g={...c,completed:!c.completed,status:c.completed?"open":"completed"};r(w=>w&&w.map(T=>T.id===c.id?g:T)),Yt(c.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:c=>m.workspace.openMainTab({newTab:m.ui.hasModKey(c)}),title:l("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},d.length,s.due?` \xB7 ${s.due}`:"")),d.length===0&&o.createElement("div",{className:"todo-fence-empty"},l("auto.a93c9cdad41c")),d.map(c=>o.createElement("div",{key:c.id,className:`todo-fence-row ${c.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:c.completed,onChange:()=>u(c),"aria-label":c.title}),c.priority!=="normal"&&o.createElement("span",{className:`pri pri-${c.priority}`},We.find(g=>g.id===c.priority)?.symbol),o.createElement("span",{className:"t"},c.title),c.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),c.dueDate&&o.createElement("span",{className:`due ${!c.completed&&c.dueDate<f?"overdue":""}`},c.dueDate))))};function Ci(){let e=m.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Ul(),r.classList.add("todo-fence"),m.ui.renderReact(r,o.createElement(Wl,{code:t}))),{examples:Si.todo});return()=>{e(),document.getElementById(hn)?.remove()}}var Q=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),ht=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Yl=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Xl=e=>o.createElement(ht,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),Zl=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Jl=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Ql=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),ec=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),tc=e=>o.createElement(ht,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),oc={inprogress:Zl,waiting:Jl,onhold:Xl,delegated:Ql,deferred:ec,completed:tc,canceled:Yl},ve=({status:e,dotCls:t})=>{let r=e?oc[e]:void 0;return r?o.createElement(r,{className:`todo-status-menu-svg ${t}`}):o.createElement("span",{className:`todo-status-menu-dot ${t}`})},Xe=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),cr=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Ce=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),ur=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),Ni=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Ii=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Li=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),pr=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),fr=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Eo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Ao=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Pi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),Mi=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),Oi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),at=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Pe=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),_i=e=>o.createElement(ht,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Fi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),mr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),Ze=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),gr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),zi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),hr=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),br=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),it=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Gi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),oo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Ri=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),yr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),It=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),vr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),$i=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Ki=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),Vi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Co=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),No=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),bt=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),wr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Io=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),xr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),Hi=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21 6H11M21 12H11M21 18H11"}),o.createElement("path",{d:"m3 8 4 4-4 4"})),ji=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21 6H11M21 12H11M21 18H11"}),o.createElement("path",{d:"m7 8-4 4 4 4"}));function Lo(e){let t=m.interop.services.providers(fo)[0];if(!t)return;let r=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;t.invoke("open",[{query:r}]).then(n=>{n.ok||console.warn(`[todo] Failed to open location: ${n.error.message}`)})}var Ui=({value:e,onChange:t})=>{let r=m.ui.ResourcePicker;return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement(r,{className:"todo-detail-inline-input todo-location-input",value:e?.name??"",placeholder:l("todo.locationPlaceholder"),ariaLabel:l("todo.location"),kinds:["place"],allowCustom:!0,onChange:(n,a)=>{let i=Number(a?.metadata?.longitude),s=Number(a?.metadata?.latitude);t(n?{name:n,...Number.isFinite(i)&&Number.isFinite(s)?{lng:i,lat:s}:{}}:void 0)}}),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",type:"button",title:l("todo.openLocation"),"aria-label":l("todo.openLocationOf",{p0:e.name}),onClick:()=>Lo(e)},o.createElement(Ri,null)),o.createElement("button",{className:"todo-menu-btn",type:"button",title:l("todo.removeLocation"),"aria-label":l("todo.removeLocation"),onClick:()=>{t(void 0)}},o.createElement(Ce,null)))))};var we={kind:"smart",id:"all"},Tr=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ye("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ye("primary-blue"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ye("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ye("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ye("green"),dated:!1}],Bi=Tr.map(e=>e.id);function bn(e){let t=e&&typeof e=="object"?e:{},r=[];for(let i of Array.isArray(t.order)?t.order:[])typeof i=="string"&&Bi.includes(i)&&!r.includes(i)&&r.push(i);for(let i of Bi)r.includes(i)||r.push(i);let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(i=>n.includes(i));return a.length===r.length&&a.shift(),{order:r,hidden:a}}function qi(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>vt(t))}function vt(e){return Tr.find(t=>t.id===e)??Tr[3]}function Wi(e,t,r=ke(new Date)){if(t.kind==="groups")return e.group?new Set(t.names.map(oe)).has(oe(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function kr(e,t,r,n=ke(new Date)){return Wi(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Yi(e,t,r=ke(new Date)){return e.filter(n=>{if(!n.completed)return!1;if(t.kind==="groups")return Wi(n,t,r);if(t.kind==="tag")return(n.tags??[]).some(a=>a.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!n.group;switch(t.id){case"scheduled":return!!n.dueDate;case"today":return!!n.dueDate&&n.dueDate.slice(0,10)<=r;case"flagged":return!!n.flagged;default:return!0}}).length}function Xi(e,t=ke(new Date)){let r={scheduled:0,today:0,flagged:0,all:0,completed:0};for(let n of e){if(n.completed){r.completed++;continue}r.all++,n.flagged&&r.flagged++;let a=n.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=t&&r.today++)}return r}function Sr(e,t){let r=t===null?null:oe(t);return e.filter(n=>!n.completed&&(r===null?!n.group:oe(n.group??"")===r)).length}function yt(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var rc=Tr.map(e=>e.id);function yn(e){if(typeof e!="string")return we;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:we}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:we}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return we;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:we}catch{return we}return rc.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:we}function Dr(e,t){return yt(e)===yt(t)}var nc="todo.view",ac="todo.showCompleted",ic="todo.statusFilter",sc="todo.search",dc="todo.pageSort",Tn="panelChip",Ji="pageShowCompleted",vn="statusFilter",kn="dateBreakdown",Qi="smartLists",Po="pageSearch",es="pageSort",lc={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},ts=["due","priority","flagged","updated","created","name"];function Zi(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:ts.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Ht(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function Cr(e){let t=lc[e],r=o.useCallback(()=>Zi(m.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>m.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(d=>{let f=Zi({...d,...s});return m.settings.set(t,f),f})},[t]);return[n,i]}function Er(){let e=m.settings.get()[kn];return e==="weekly"||e==="daily"?e:"monthly"}function Nr(){let[e,t]=o.useState(Er);return o.useEffect(()=>m.settings.subscribe(()=>t(Er())),[]),e}function ro(){return m.runtime.getOrCreate(nc,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function Ir(){return m.runtime.getOrCreate(ac,()=>({show:null,listeners:new Set}))}function Lr(){return m.runtime.getOrCreate(ic,()=>({filter:null,listeners:new Set}))}function Mo(){return m.runtime.getOrCreate(sc,()=>({query:null,listeners:new Set}))}function Pr(){return m.runtime.getOrCreate(dc,()=>({value:null,listeners:new Set}))}function Lt(){let e=ro();return e.view||(e.view=yn(m.settings.get()[Tn]),e.history=[e.view],e.historyIndex=0),e.view}function Me(e){let t=ro();if(Lt(),t.view&&Dr(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,m.settings.set(Tn,yt(e));for(let n of t.listeners)n(e)}function Mr(){let e=ro();return Lt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function no(e){let t=ro();Lt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],m.settings.set(Tn,yt(t.view));for(let n of t.listeners)n(t.view)}}function Sn(e){let t=ro();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function os(){let e=ro();e.view=null,e.history=[],e.historyIndex=-1,Ir().show=null,Lr().filter=null,Mo().query=null,Pr().value=null}function Oo(){return bn(m.settings.get()[Qi])}function rs(e){m.settings.set(Qi,bn(e))}function ns(){let[e,t]=o.useState(Oo);return o.useEffect(()=>m.settings.subscribe(()=>t(Oo())),[]),e}function as(e){let t=Mo(),r=e.slice(0,500);if(t.query!==r){t.query=r,m.settings.set(Po,r);for(let n of t.listeners)n(r)}}function Or(){let e=()=>{let n=Mo();return n.query===null&&(n.query=typeof m.settings.get()[Po]=="string"?String(m.settings.get()[Po]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=Mo();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,as]}function Dn(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||ts.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function is(){let e=Pr();return e.value||(e.value=Dn(m.settings.get()[es])),e.value}function ss(e){let t=Pr(),r=Dn(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,m.settings.set(es,r);for(let n of t.listeners)n(r)}}function ds(){let[e,t]=o.useState(is);return o.useEffect(()=>{let r=Pr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,ss]}function _r(){return{v:1,view:yt(Lt()),showCompleted:xn(),statusFilter:Ar(),search:Mo().query??(typeof m.settings.get()[Po]=="string"?String(m.settings.get()[Po]).slice(0,500):""),sort:is()}}function Fr(e){return e.v!==1?!1:(Me(yn(e.view)),Ot(e.showCompleted===!0),wn(Ht(e.statusFilter)),as(typeof e.search=="string"?e.search:""),ss(Dn(e.sort)),!0)}function Ar(){let e=Lr();if(e.filter===null){let t=m.settings.get()[vn];e.filter=Ht(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&m.settings.set(vn,e.filter)}return e.filter}function wn(e){let t=Lr(),r=Ht(e),n=t.filter??Ar();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,m.settings.set(vn,r);for(let a of t.listeners)a(r)}}function Pt(){let[e,t]=o.useState(Ar);return o.useEffect(()=>{let r=Lr();r.listeners.add(t);let n=m.settings.subscribe(()=>{let a=Ht(r.filter??Ar());wn(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,wn]}function Mt(){let[e,t]=o.useState(Lt);return o.useEffect(()=>Sn(t),[]),e}function xn(){let e=Ir();return e.show===null&&(e.show=m.settings.get()[Ji]===!0),e.show}function Ot(e){let t=Ir();if(t.show!==e){t.show=e,m.settings.set(Ji,e);for(let r of t.listeners)r(e)}}function wt(){let[e,t]=o.useState(xn);return o.useEffect(()=>{let r=Ir();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Ot(!xn())]}function _o(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var cc=["normal","low","medium","high"];function cs(e,t){return e&&cc.includes(e)?e:t}function uc(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function pc(e,t){return e.dueDate?{badges:uc(e),icon:"list-todo",id:e.id,documentRef:{pluginId:m.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Ie(e.group,t)}:{}}:null}function fc(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:cs(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,completed:t.completed??e.completed,updatedAt:new Date().toISOString()}}async function zr(e){return Ke(e)}function ls(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var En="attachment:",An="url:";function mc(){try{return!!m.interop.services.providers(fo)[0]}catch{return!1}}function gc(e){let t=[{id:"open-todo",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:ls(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${En}${i}`,label:ls(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${An}${i}`,label:i,icon:"link"}))}),e.location&&mc()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function hc(e,t){if(t.startsWith(En)){let r=t.slice(En.length);return(e.attachments??[]).includes(r)?(m.workspace.openFile(r),!0):!1}if(t.startsWith(An)){let r=t.slice(An.length);if(!(e.urls??[]).includes(r))return!1;let n=$t(r);return n?m.workspace.openFile(n):m.files.openExternalUrl(r),!0}switch(t){case"open-todo":case"edit":return await m.workspace.revealOwnPanel("left_sidebar"),Me(e.completed?{kind:"smart",id:"completed"}:we),Re().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(m.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Lo(e.location),!0):!1;default:return!1}}function us(){let e=be(),t=_o("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"Yanik",description:"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, nested subtasks, attachment-linked panels, and timestamped activity.",localized:{de:{name:"To-Do",description:"Strukturierter Aufgabenmanager mit intelligenten Listen, Mehrfach-Gruppenfiltern, Status, Wischaktionen, verschachtelten Unteraufgaben, an Anh\xE4nge gebundenen Bereichen und Aktivit\xE4ten mit Zeitstempel."},es:{name:"To-Do",description:"Gestor de tareas estructurado con listas inteligentes, filtros de varios grupos, estados, gestos, subtareas anidadas, paneles vinculados a adjuntos y actividad con fecha y hora."},fr:{name:"To-Do",description:"Gestionnaire de t\xE2ches structur\xE9 avec listes intelligentes, filtres multigroupes, statuts, gestes, sous-t\xE2ches imbriqu\xE9es, panneaux li\xE9s aux pi\xE8ces jointes et activit\xE9 horodat\xE9e."},"zh-CN":{name:"To-Do",description:"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\u5668\uFF0C\u652F\u6301\u667A\u80FD\u5217\u8868\u3001\u591A\u5206\u7EC4\u7B5B\u9009\u3001\u72B6\u6001\u3001\u6ED1\u52A8\u64CD\u4F5C\u3001\u5D4C\u5957\u5B50\u4EFB\u52A1\u3001\u9644\u4EF6\u5173\u8054\u9762\u677F\u548C\u5E26\u65F6\u95F4\u6233\u7684\u6D3B\u52A8\u8BB0\u5F55\u3002"}}},list:async({startDate:u,endDate:c,limit:g,cursor:w})=>{let T,h=()=>`${t}:${r}`;if(w){let P;try{P=JSON.parse(w)}catch{throw new Error("Invalid Calendar source cursor.")}if(!P||P.startDate!==u||P.endDate!==c||P.limit!==g||P.revision!==h()||typeof P.cursor!="string"||!P.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");T=P.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let S=h(),_=await qa(u,c,g,T);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(w&&S!==h())throw new Error("Calendar source cursor is stale; restart the range.");let z=Ge(),D=h();return{items:_.todos.map(P=>pc(P,z)).filter(P=>!!P),revision:D,..._.cursor?{cursor:JSON.stringify({startDate:u,endDate:c,limit:g,revision:D,cursor:_.cursor})}:{}}},create:async(u,c)=>{if(c.endDate&&c.endDate!==u)return!1;let g=c.title?.trim();if(!g)return!1;let w=new Date().toISOString();return nr({id:_o("todo"),title:g,completed:c.completed??!1,priority:cs(c.priority,"normal"),dueDate:u,startTime:c.startTime,endTime:c.endTime,note:c.note??"",location:c.location,urls:c.urls,attachments:c.attachments,group:c.group,tags:c.tags??[],filePath:c.filePath,createdAt:w,updatedAt:w})},update:async(u,c)=>{let g=await zr(u);return g&&c.endDate&&c.endDate!==(c.date??g.dueDate)?!1:g?Yt(g.id,fc(g,c),g.updatedAt):!1},remove:u=>Wa(u),open:async u=>{let c=await zr(u);await m.workspace.revealOwnPanel("left_sidebar"),c&&(Me(c.completed?{kind:"smart",id:"completed"}:we),Re().request(c.id,"focus"))},configure:()=>m.workspace.openOwnSettings(),actions:async u=>{let c=await zr(u);return c?gc(c):[]},runAction:async(u,c)=>{let g=await zr(u);return g?hc(g,c):!1}},i=()=>{m.interop.state.publish(po,++r)};m.interop.state.publish(po,r);let s=_a(i),d=Za(i),f=m.interop.services.provide(uo,a);return()=>{n=!1,s(),d(),f(),m.interop.state.publish(po,null)}}function ps(e,t,r){let n=new Date().toISOString();return{id:_o("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function Cn(e){if(e==null)return"";if(e<60)return`${e}m`;let t=Math.floor(e/60),r=e%60;return r===0?`${t}h`:`${t}:${String(r).padStart(2,"0")}`}function fs(e,t){let r=e.trim();if(!r)return;let n=t.trim();return n?`${r}T${n}`:r}function ms(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}var Qe=e=>typeof e=="string"?e:"",gs=e=>e===!0,hs=e=>typeof e=="number"&&Number.isFinite(e)?e:void 0,Nn=e=>Array.isArray(e)?e.filter(t=>typeof t=="string"):[];function bs(e){let t=Qe(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function bc({record:e,ctx:t}){let{compact:r}=t,n=gs(e.completed),a=Qe(e.title)||t.title,i=Qe(e.priority),s=We.find(M=>M.id===i)?.symbol,d=Qe(e.note),f=[...new Set([...Nn(e.tags),...t.tags])],u=Qe(e.dueDate),c=hs(e.estimatedMinutes),g=hs(e.actualMinutes),w=Ut(e.status),T=w&&w!=="open"?Le(w):void 0,h=Qe(e.filePath),S=Qe(e.group),_=gs(e.flagged),z=Nn(e.urls).length,D=Nn(e.attachments).length,P=!!(u||S||D||z||c!==void 0||!r&&g!==void 0||T);return o.createElement("article",{className:`todo-row search-card${n?" completed":""}${h?" todo-row-linked":""}${r?" compact":""}${_?" flagged":""}`,onClick:M=>t.onOpen({newTab:m.ui.hasModKey(M)})},o.createElement("input",{className:"todo-check",type:"checkbox",checked:n,readOnly:!0,tabIndex:-1,"aria-hidden":!0}),o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,s&&o.createElement("span",{className:`todo-priority-inline todo-priority-${i}`},s," "),a),!r&&d.trim()&&o.createElement(m.ui.MarkdownView,{className:"todo-notes",value:d,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:Qe(e.id)},sourcePath:h||void 0}}),!r&&f.length>0&&o.createElement("div",{className:"todo-tags-view"},f.map(M=>o.createElement("span",{key:M,className:"todo-tag-view-pill"},"#",M))),P&&o.createElement("div",{className:"todo-view-meta"},S&&o.createElement("span",{className:"todo-group-text",style:{color:De(Ie(S,Ge()))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),S),T&&o.createElement("span",{className:`todo-status-badge ${T.cls}`},o.createElement(ve,{status:w??null,dotCls:T.cls}),ut(w)),u&&o.createElement("span",{className:"todo-date"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(bt,null)),_e(u,m.getState().dateFormat)),D>0&&o.createElement("span",{className:"todo-attach-count"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(It,null)),D),!!z&&o.createElement("span",{className:"todo-meta-glyph"},o.createElement(it,null)),c!==void 0&&o.createElement("span",{className:"todo-time-badge"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(hr,null)),o.createElement("span",{className:"todo-time-label"},m.ui.t("todo.estimated"))," ",Cn(c)),!r&&g!==void 0&&o.createElement("span",{className:"todo-time-badge"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Ze,null)),o.createElement("span",{className:"todo-time-label"},m.ui.t("todo.actual"))," ",Cn(g)))),o.createElement("div",{className:"todo-row-actions"},_&&o.createElement("span",{className:"todo-flag-mark"},o.createElement(Pe,null))))}function ys(e){let t={cardKind:"todo",render:(r,n)=>o.createElement(bc,{record:r,ctx:n}),open:async(r,n)=>{if(Qe(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:Qe(r.id)}),!0;let a=bs(r.filePath)||bs(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(Jr,t)}function xt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>m.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,m.getState,m.getState)}function Gr(){let e=o.useCallback(i=>m.interop.state.subscribe(Ko,i),[]),t=o.useCallback(()=>m.interop.state.get(Ko),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function vs(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let d=new Set(r.current);s?d.add(i):d.delete(i),r.current=d,t(d)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var yc="todo.sharedTodos";function In(){return m.runtime.getOrCreate(yc,()=>({todos:[],listeners:new Set}))}function he(){return In().todos}function st(e){let t=In();t.todos=e;for(let r of t.listeners)r(e)}function Tt(e){let t=In();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function et(){return m.workspace.openSettings("groups"),Promise.resolve()}var ws=[dn.find(e=>e.id==="completed"),...dn.filter(e=>e.id!=="completed")];function _t(){return m.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function xs(){for(let e of _t().listeners)e()}function Ln(e){_t().actions=e,xs()}function Pn(e,t){e?_t().selected.set(t,e):_t().selected.delete(t),xs()}function vc(e){let t=_r(),r=he().find(n=>n.id===_t().selected.get(e));return{title:l("manifest.name"),view:t,actions:_t().actions??[],...r?{item:{id:r.id,title:r.title,state:{...t,todoId:r.id}}}:{},navigation:{...Mr(),goBack:()=>no(-1),goForward:()=>no(1)}}}function wc(e){let t=_t().listeners;t.add(e);let r=Tt(e),n=Sn(e),a=m.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function xc(e,t,r=!1){if(typeof e.todoId=="string"&&!await Ke(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Fr(e))throw new Error("Unsupported To-Do bookmark.");Pn(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Re().request(e.todoId,"focus")}function Tc({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(at,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},ws.map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,l(i.labelKey)),o.createElement("span",null,r.filter(s=>Ee(s)===i.id).length)))))}function kc(){let e=o.useSyncExternalStore(Tt,he,he),t=Be(),r=Mt(),n=r.kind==="smart"?l(vt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[l("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:l("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[l("todo.properties.view"),n],[l("todo.properties.tasks"),e.length],...ws.map(a=>[l(a.labelKey),e.filter(i=>Ee(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...Te(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(d=>a===null?!d.group:oe(d.group??"")===oe(a)),s=a??l("todo.chip.noGroup");return o.createElement(Tc,{key:a??"ungrouped",label:s,color:a?De(Ie(a,t)):"var(--text-tertiary)",todos:i})})))}function Sc(){let e=o.useSyncExternalStore(Tt,he,he),t=Be(),r=Mt();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(Fo,{embedded:!0,todos:e,groups:t,names:Te(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>Me(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:we),onOpenSettings:et}))}function Ts(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>e.interop.extensions.provide(Qr,{id:`todo.${n}`,surface:n,getSnapshot:()=>vc(n),subscribe:wc,restore:(a,i,s)=>xc(a,n,s?.background)}));return r.push(e.interop.extensions.provide(Vo,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Ke(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:l(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(kc,null)})),r.push(e.interop.extensions.provide(Vo,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>Ge().map(n=>({id:n.id,label:n.name,value:he().filter(a=>oe(a.group??"")===oe(n.name)).length,readOnly:!0})),render:()=>o.createElement(Sc,null)})),()=>r.forEach(n=>n())}function ao(e,t,r="main_workspace"){let n=o.useRef(be()).current,[a,i]=o.useState(he()),[s,d]=o.useState(null),[f,u]=o.useState(null),[c,g]=o.useState(null),[w,T]=o.useState(!0),[h,S]=o.useState(0),[_,z]=o.useState(!1),{pendingIds:D,isPending:P,setPending:M}=vs(),N=o.useRef(!1),I=o.useRef(0),E=o.useRef({sortField:e,sortDir:t});E.current={sortField:e,sortDir:t};let G=o.useRef([]),x=o.useMemo(()=>{let O=new Map(a.map(F=>[F.id,F])),X=new Set(G.current),Z=[];for(let F of G.current){let K=O.get(F);K&&Z.push(K)}for(let F of a)X.has(F.id)||Z.push(F);return Z},[a,h]),ee=o.useCallback(O=>{let X=++I.current;O&&T(!0),rt(n).then(Z=>{if(n.assertActive(),X===I.current){if(O){let{sortField:F,sortDir:K}=E.current;G.current=Zt(Z,F,K).map(p=>p.id)}else{let F=new Set(Z.map(v=>v.id)),K=G.current.filter(v=>F.has(v)),p=new Set(K),{sortField:b,sortDir:A}=E.current,j=Zt(Z.filter(v=>!p.has(v.id)),b,A).map(v=>v.id);G.current=[...j,...K]}st(Z),T(!1)}}).catch(()=>{X===I.current&&T(!1)})},[n]);o.useEffect(()=>(ee(!0),()=>{I.current++}),[ee]),o.useEffect(()=>mt(()=>ee(!1)),[ee]);let W=o.useRef(!0);o.useEffect(()=>{if(W.current){W.current=!1;return}G.current=Zt(he(),e,t).map(O=>O.id),S(O=>O+1)},[e,t]),o.useEffect(()=>Tt(O=>i(O)),[]);let ae=o.useCallback(()=>d(null),[]),C=o.useCallback(O=>{Pn(O,r),g(O)},[r]),$=o.useCallback(()=>g(null),[]),re=o.useCallback(async(O,X,Z)=>{if(N.current)return null;let F=O.trim();if(!F)return null;let K={...ps(F,X),...Z?.patch};N.current=!0,z(!0),G.current=[K.id,...G.current],st([K,...he()]),d(K.id);let p=()=>{G.current=G.current.filter(b=>b!==K.id),st(he().filter(b=>b.id!==K.id)),d(b=>b===K.id?null:b)};try{let b=await nr(K);return b||p(),b?K:null}catch{return p(),null}finally{N.current=!1,z(!1)}},[]),V=o.useCallback(async(O,X,Z)=>{if(P(O))return!1;let F=he().find(p=>p.id===O);if(!F)return!1;let K={...F,...X,updatedAt:new Date().toISOString()};M(O,!0),st(he().map(p=>p.id===O?K:p));try{return await Yt(O,K,F.updatedAt,Z)?!0:(st(he().map(b=>b.id===O?F:b)),!1)}catch{return st(he().map(p=>p.id===O?F:p)),!1}finally{M(O,!1)}},[P,M]),H=o.useCallback(async(O,X,Z)=>{let F=await V(O,X,Z);if(!F||X.completed!==!0)return F;let K=he();for(let p of Ve(K,O))K.find(b=>b.id===p)?.completed||await V(p,{completed:!0,status:X.status??"completed"});return!0},[V]),ne=o.useCallback(async O=>{let X=he(),Z=X.find(b=>b.id===O);if(!Z)return;let F=[...Ve(X,O).reverse(),O];if(F.some(b=>P(b)))return;let K=X.filter(b=>F.includes(b.id));for(let b of F)M(b,!0);G.current=G.current.filter(b=>!F.includes(b)),st(X.filter(b=>!F.includes(b.id))),d(b=>F.includes(b??"")?null:b),F.includes(c??"")&&g(null);let p=()=>{G.current=[...G.current,...K.map(A=>A.id).filter(A=>!G.current.includes(A))];let b=he();st([...b,...K.filter(A=>!b.some(j=>j.id===A.id))])};try{await Ya(F,Z.title)||p()}catch{p()}finally{for(let b of F)M(b,!1)}},[c,P,M]);return{todos:a,loading:w,ordered:x,lastCreatedId:s,clearLastCreated:ae,menuId:f,setMenuId:u,editingId:c,openDetail:C,closeDetail:$,pendingIds:D,creating:_,create:re,patchTodo:H,removeTodo:ne}}function Mn({value:e,onChange:t,disabled:r}){let n=m.ui.ResourcePicker;return o.createElement(n,{value:e,onChange:t,kinds:["attachment"],placeholder:l("auto.e7de9576dc00"),disabled:r,ariaLabel:l("auto.8410192cbb1f"),allowCustom:!1})}var Dc=[".csv"],Ec=[".base"],Ac=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Cc=[".pdf"],Nc=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Ic=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Lc=[".stl",".obj",".glb",".gltf"];function On(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Pc={type:"core",id:"valley"},te=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Pc,...a});function Mc(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Oc=Mc([[[".md",".markdown"],te("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],te("text","text","text","notes")],[[".json"],te("json","json","json","data",{editable:!0})],[[".jsonl"],te("json","json","jsonl","data",{editable:!0})],[Dc,te("csv","csv","csv","data",{editable:!0})],[Ec,te("base","base","fallback","data")],[Ac,te("image","image","image","media",{information:["identity","dimensions","exif"]})],[Cc,te("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Nc,te("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Ic,te("video","video","video","media",{information:["identity","media","video-codec"]})],[Lc,te("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".docx"],te("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".pptx"],te("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".ts",".mts",".cts"],te("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],te("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],te("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],te("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],te("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],te("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],te("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],te("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],te("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],te("code","code","code","code",{codeLanguage:"TOML"})],[[".xml"],te("code","code","code","code",{codeLanguage:"XML"})],[[".swift"],te("code","code","code","code",{codeLanguage:"Swift"})],[[".rs"],te("code","code","code","code",{codeLanguage:"Rust"})],[[".go"],te("code","code","code","code",{codeLanguage:"Go"})],[[".java"],te("code","code","code","code",{codeLanguage:"Java"})],[[".c",".h",".cpp"],te("code","code","code","code",{codeLanguage:"C++"})],[[".canvas"],te("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],te("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".doc"],te("unsupported","word","fallback","documents",{preview:"metadata",editable:!1})],[[".xlsx"],te("csv","excel","csv","data",{preview:"full",editable:!1})],[[".xls"],te("unsupported","excel","fallback","data",{preview:"metadata",editable:!1})],[[".ppt"],te("unsupported","powerpoint","fallback","documents",{preview:"metadata",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],te("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),_c=te("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Fc(e){return Oc[On(e)]??_c}function _n(e){return Fc(e).kind}var ks="valley-vault",Ss="asset";function Ds(e){return`${ks}://${Ss}/${encodeURIComponent(e)}`}var zc={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function Gc(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function Fn(e){let t=zc[_n(e)];if(t)return l(t);let r=On(e).replace(".","").toUpperCase();return r?l("todo.fileKind.generic",{p0:r}):l("todo.fileKind.file")}var Rc={image:$i,audio:Ki,video:Vi},Es=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=_n(e),i=e.split("/").pop()??e,s=Rc[a]??vr;o.useEffect(()=>{let c=!1;return m.vault.fileInfo(e).then(g=>{c||n(g?.size??null)}),()=>{c=!0}},[e]);let[d,f]=o.useState(0);o.useEffect(()=>m.vault.onChanged(()=>f(c=>c+1)),[]);let u=a==="image"?`${Ds(e)}?v=${d}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:c=>m.workspace.openFile(e,void 0,{newTab:m.ui.hasModKey(c)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},Fn(e),r!==null&&` \xB7 ${Gc(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},u?o.createElement("img",{src:u,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:l("todo.removeAttachment"),"aria-label":l("todo.removeAttachmentOf",{p0:i})},o.createElement(Ce,null)))};function zn(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),d=o.useRef(0),f=o.useRef(r);f.current=r;let u=o.useCallback(async()=>{if(i.current)return;let c=a.current;if(c!==null){a.current=null,i.current=!0;try{let g=await n.current(c);!g&&a.current===null&&(a.current=c),g?d.current=0:d.current+=1}catch{a.current===null&&(a.current=c),d.current+=1}finally{i.current=!1,a.current!==null&&d.current<3?s.current=window.setTimeout(()=>{u()},250):a.current!==null&&f.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),u()},[u]),o.useCallback(c=>{a.current=c,d.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,u()},t)},[u,t])}function $c({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,d]=o.useState(e),f=o.useRef(!1);o.useEffect(()=>{f.current||d(e)},[e]);let u=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{f.current=!0},onChange:c=>d(c.target.value),onBlur:()=>{f.current=!1,u()},onKeyDown:c=>{c.key==="Enter"&&c.currentTarget.blur(),c.key==="Escape"&&(d(e),c.currentTarget.blur())}})}function Kc(e){let t=m.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Vc=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,Segmented:i,DateField:s,TimeField:d}=m.ui.settings,[f,u]=o.useState(he);o.useEffect(()=>Tt(u),[]);let c=f.find(p=>p.id===e),g=Ba(e),w=Be(),[T,h]=o.useState(!1),[S,_]=o.useState(""),[z,D]=o.useState(!1),[P,M]=o.useState(""),N=Kc(e),I=o.useSyncExternalStore(o.useCallback(p=>(N.listeners.add(p),()=>{N.listeners.delete(p)}),[N]),()=>N.value,()=>N.value),E=o.useCallback(p=>{N.value={...N.value,...p};for(let b of N.listeners)b()},[N]),G=I.title,x=p=>E({title:p}),ee=()=>E({error:l("todo.error.saveDraft")});o.useEffect(()=>{N.revision||N.loadingRevision||(N.loadingRevision=m.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(p=>{p&&!N.revision&&(N.revision={expectedRevision:p.revision,vaultGeneration:p.vaultGeneration})}).catch(()=>{E({error:l("todo.error.saveDraft")})}).finally(()=>{N.loadingRevision=void 0}))},[N,e,E]);let W=async p=>(N.revision||await N.loadingRevision,N.revision?t.patchTodo(e,p,N.revision):!1),ae=zn(async p=>{let b=p.trim()?await W({title:p}):!0;return b&&N.value.title===p&&E({title:null,error:""}),b},500,ee),C=zn(async p=>{let b=await W({note:p});return b&&N.value.note===p&&E({note:null,error:""}),b},500,ee),$=zn(async p=>{let b=JSON.parse(p),A=await W({tags:b});return A&&JSON.stringify(N.value.tags)===p&&E({tags:null,error:""}),A},0,ee),re=o.useMemo(()=>f.filter(p=>p.title.trim()&&Qt(f,e,p.id)).map(p=>({value:p.id,label:p.title})),[f,e]);if(o.useEffect(()=>{c||r()},[c,r]),!c)return null;let V=p=>{W(p).then(b=>{b||ee()})},H=p=>{E({tags:p}),$(JSON.stringify(p))},ne=p=>V({attachments:p.length?p:void 0}),le=p=>V({urls:p.length?p:void 0}),O=c.remindAt?.slice(0,10)??"",X=c.remindAt?.slice(11,16)??"",Z=(p,b)=>V({remindAt:fs(p,b),reminderFiredAt:void 0}),F=Te(w),K=c.parentId?f.find(p=>p.id===c.parentId)?.title??"":"";return o.createElement(m.ui.Modal,{title:l("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:r,footer:o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{To(c,t.removeTodo)}},l("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},l("todo.edit.done")))},I.error&&o.createElement("p",{role:"alert"},I.error),o.createElement("div",{className:"todo-detail-title-row"},o.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:G??c.title,"aria-label":l("auto.c5e8306a511f"),onChange:p=>{x(p.target.value),ae(p.target.value)},onBlur:()=>{G===c.title&&x(null)},onKeyDown:p=>{p.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-detail-flag${c.flagged?" on":""}`,type:"button",onClick:()=>V({flagged:c.flagged?void 0:!0}),"aria-pressed":!!c.flagged,title:l("todo.flag"),"aria-label":l("todo.flag")},o.createElement(Pe,null))),o.createElement("div",{className:"todo-detail-cols"},o.createElement("div",{className:"todo-detail-col"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.edit.notes")),o.createElement("div",{className:"todo-detail-notes"},o.createElement(m.ui.NoteInput,{value:I.note??c.note,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:c.id},sourcePath:c.filePath},tags:I.tags??c.tags??[],onTagsChange:H,onRevisionChange:p=>{(!N.revision||N.value.note===null&&N.value.title===null&&N.value.tags===null||p.expectedRevision<N.revision.expectedRevision)&&(N.revision=p)},onChange:p=>{E({note:p}),C(p)},onSave:r,onCancel:r}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.edit.tags")),o.createElement(m.ui.TagInput,{value:I.tags??c.tags??[],onChange:H})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(It,null)," ",l("todo.attachments")),(c.attachments??[]).map(p=>o.createElement(Es,{key:p,relPath:p,onRemove:()=>ne((c.attachments??[]).filter(b=>b!==p))})),T?o.createElement(Mn,{value:S,onChange:p=>{_(p),p&&((c.attachments??[]).includes(p)||ne([...c.attachments??[],p]),_(""),h(!1))}}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>h(!0)},o.createElement(Xe,null)," ",l("todo.addAttachment"))),o.createElement("div",{className:"todo-detail-block todo-detail-links-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(it,null)," ",l("todo.links")),o.createElement("label",{className:"todo-linked-file-control"},o.createElement("span",null,l("todo.linkedFile")),o.createElement(Mn,{value:c.filePath??"",onChange:p=>V({filePath:p.trim()||void 0})})),(c.urls??[]).map(p=>o.createElement("div",{className:"todo-detail-url-card",key:p},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:p,onClick:b=>{let A=$t(p);A?m.workspace.openFile(A,void 0,{newTab:m.ui.hasModKey(b)}):m.files.openExternalUrl(p)}},o.createElement(it,null),o.createElement("span",null,p)),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:l("todo.removeUrl"),"aria-label":l("todo.removeUrlOf",{p0:p}),onClick:()=>le((c.urls??[]).filter(b=>b!==p))},o.createElement(Ce,null)))),z?o.createElement($c,{className:"todo-detail-link-input todo-detail-url",value:P,onCommit:p=>{let b=ln(p);b&&!(c.urls??[]).includes(b)&&le([...c.urls??[],b]),M(""),D(!1)},placeholder:l("todo.urlPlaceholder"),ariaLabel:l("todo.url")}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>D(!0)},o.createElement(Xe,null)," ",l("todo.addWebAppLink")))),o.createElement("div",{className:"todo-detail-col todo-detail-rail"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.edit.properties")),o.createElement("label",{className:"todo-detail-field","data-status":Ee(c)},o.createElement("span",{className:"todo-detail-label"},l("auto.bae7d5be7082")),o.createElement(a,{className:"todo-select",value:Ee(c),onChange:p=>V(Ae(p==="open"?null:p)),ariaLabel:l("auto.bae7d5be7082"),options:lt().map(p=>({value:p,label:ut(p)}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},l("auto.886cbff9d9df")),o.createElement(i,{value:c.priority,onChange:p=>V({priority:p}),ariaLabel:l("auto.886cbff9d9df"),options:We.map(p=>({value:p.id,label:p.symbol||l("todo.priorityNone")}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},l("todo.edit.group")),o.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:c.group??"",onChange:p=>V({group:p.trim()||void 0}),options:F.map(p=>({value:p,label:p})),ariaLabel:l("todo.edit.group"),clearLabel:l("todo.chip.noGroup"),allowCustom:!1})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},l("todo.tree.subtaskOf")),o.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:K,onChange:p=>{let b=p.trim(),A=re.find(j=>j.label===b);V({parentId:A?.value||void 0})},options:re,ariaLabel:l("todo.tree.subtaskOf"),clearLabel:l("todo.tree.noParent")}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.edit.schedule")),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},l("auto.145caf292855")),o.createElement(s,{className:"todo-detail-inline-date",value:c.dueDate,ariaLabel:l("auto.4c1aeebc433b"),onChange:p=>V({dueDate:p})})),o.createElement("label",{className:"todo-detail-field todo-detail-field-stack"},o.createElement("span",{className:"todo-detail-label"},l("auto.0a8adac9d6d5")),o.createElement("span",{className:"todo-clock-row"},o.createElement(d,{value:c.startTime??"",ariaLabel:l("auto.88d8206d586a"),onChange:p=>V({startTime:p||void 0})}),o.createElement("span",{className:"todo-clock-dash"},"\u2013"),o.createElement(d,{value:c.endTime??"",ariaLabel:l("auto.cd7800da7f4f"),onChange:p=>V({endTime:p||void 0})})))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.remindMe")),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},l("todo.onADay")),o.createElement("span",{className:"todo-detail-row-end"},O&&o.createElement(s,{className:"todo-detail-inline-date",value:O,ariaLabel:l("todo.remindDate"),clearable:!1,onChange:p=>Z(p,X)}),o.createElement(n,{checked:!!O,onChange:p=>Z(p?c.dueDate||Hc():"",p?X:""),label:l("todo.onADay")}))),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},l("todo.atATime")),o.createElement("span",{className:"todo-detail-row-end"},X&&o.createElement(d,{className:"todo-detail-inline-input",value:X,ariaLabel:l("todo.remindTime"),clearable:!1,onChange:p=>Z(O,p)}),o.createElement(n,{checked:!!X,disabled:!O,onChange:p=>Z(O,p?"09:00":""),label:l("todo.atATime")}))),O&&o.createElement("p",{className:"todo-detail-hint"},l("todo.reminderAppOpenHint"))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(yr,null)," ",l("todo.location")),o.createElement(Ui,{value:c.location,onChange:p=>V({location:p})})),o.createElement("div",{className:"todo-detail-block todo-activity-block"},o.createElement("div",{className:"todo-detail-group-label"},l("todo.activity")),g.length?o.createElement("ol",{className:"todo-activity-list"},[...g].reverse().map((p,b)=>o.createElement("li",{key:`${p.changedAt}:${b}`},o.createElement("span",null,ut(p.from)," \u2192 ",ut(p.to)),o.createElement("time",{dateTime:p.changedAt},new Date(p.changedAt).toLocaleString(m.ui.language()))))):o.createElement("p",{className:"todo-detail-hint"},l("todo.activity.empty"))))))};function Hc(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var io=({c:e})=>e.editingId?o.createElement(Vc,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function jc(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Uc(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let f=i+s>>>1;e[f].start+e[f].height<n?i=f+1:s=f}let d=i;for(s=e.length;i<s;){let f=i+s>>>1;e[f].start<=a?i=f+1:s=f}return[d,i]}function Rr(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,d=e.useRef(null),f=e.useRef(new Map),[u,c]=e.useReducer(C=>C+1,0),[g,w]=e.useState({top:0,height:600}),[T,h]=e.useState(null),[S,_]=e.useState(null),z=e.useRef(null),D=e.useRef(null),P=e.useMemo(()=>{let C=0;return r.map(($,re)=>{let V=f.current.get($)??(typeof n=="number"?n:n($,re)),H={id:$,height:V,start:C};return C+=V,H})},[r,n,u]),M=P.length?P[P.length-1].start+P[P.length-1].height:0,N=e.useRef({rows:P,viewport:g});N.current={rows:P,viewport:g};let I=e.useCallback(()=>{let C=d.current,$=z.current;if(!C||!$)return;let re=C.getBoundingClientRect(),V=$.getBoundingClientRect(),H=$.clientHeight||V.height||600,ne=$===C?$.scrollTop:V.top-re.top;w(le=>le.top===ne&&le.height===H?le:{top:ne,height:H})},[]),E=e.useCallback(()=>{D.current===null&&(D.current=requestAnimationFrame(()=>{D.current=null,I()}))},[I]);e.useLayoutEffect(()=>{let C=d.current;if(!C||!s)return;let $=jc(C);z.current=$;let re=C.style.overflowAnchor;C.style.overflowAnchor="none";let V=!0,H=()=>{if(!V)return;let X=C.ownerDocument.activeElement,Z=X instanceof HTMLElement?X:null;for(;Z&&Z.parentElement!==C;)Z=Z.parentElement;h(Z?.dataset.visibleKey??null)},ne=()=>{queueMicrotask(H)};$.addEventListener("scroll",E,{passive:!0}),window.addEventListener("resize",E),C.addEventListener("focusin",H),C.addEventListener("focusout",ne);let le=C.clientWidth,O=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{C.clientWidth!==le&&(le=C.clientWidth,f.current.clear(),c()),E()});return O?.observe($),$!==C&&O?.observe(C),I(),()=>{V=!1,C.style.overflowAnchor==="none"&&(C.style.overflowAnchor=re),$.removeEventListener("scroll",E),window.removeEventListener("resize",E),C.removeEventListener("focusin",H),C.removeEventListener("focusout",ne),O?.disconnect(),D.current!==null&&cancelAnimationFrame(D.current),D.current=null,z.current=null}},[s,I,E]),e.useLayoutEffect(()=>{let C=new Set(r);for(let $ of f.current.keys())C.has($)||f.current.delete($);I()},[r,I]),e.useLayoutEffect(()=>{f.current.clear(),c()},[i]),e.useLayoutEffect(()=>{let C=d.current;if(!C||!s)return;let $=H=>{let ne=0,le=!1,{rows:O,viewport:X}=N.current,Z=new Map(O.map(F=>[F.id,F]));for(let F of H){let K=F.dataset.visibleKey,p=K?Z.get(K):void 0,b=F.getBoundingClientRect().height;!K||!p||b<=0||Math.abs(b-p.height)<.5||(f.current.set(K,b),p.start+p.height<=X.top&&(ne+=b-p.height),le=!0)}if(le){let F=z.current,K=C.closest('[data-visible-sections="true"]'),p=C;for(;p&&p.parentElement!==K;)p=p.parentElement;let b=K&&K!==C&&p&&F&&p.getBoundingClientRect().bottom<=F.getBoundingClientRect().top;ne&&F&&!b&&(F.scrollTop+=ne),c(),E()}},re=Array.from(C.children).filter(H=>H.hasAttribute("data-visible-key")),V=typeof ResizeObserver>"u"?void 0:new ResizeObserver(H=>$(H.map(ne=>ne.target)));return re.forEach(H=>V?.observe(H)),$(re),()=>V?.disconnect()}),e.useLayoutEffect(()=>{if(!S)return;let C=Array.from(d.current?.children??[]).find($=>$.dataset.visibleKey===S.id);C&&(C.scrollIntoView?.({block:"nearest"}),S.selector&&(C.matches(S.selector)?C:C.querySelector(S.selector))?.focus(),I(),_(null))},[S,P,I]);let G=e.useCallback((C,$)=>{_({id:C,selector:$})},[]),[x,ee]=s?Uc(P,g):[0,P.length],W=new Set;for(let C=x;C<ee;C++)W.add(C);let ae=new Set([...a,T,S?.id].filter(Boolean));return ae.size&&P.forEach((C,$)=>{ae.has(C.id)&&W.add($)}),{ref:d,show:G,render(C){let $=[],re=0;for(let V of[...W].sort((H,ne)=>H-ne)){let H=P[V];H.start>re&&$.push(e.createElement("div",{key:`space:${H.id}`,"aria-hidden":!0,style:{height:H.start-re,flex:"0 0 auto",pointerEvents:"none"}})),$.push(e.createElement(e.Fragment,{key:H.id},C(V))),re=H.start+H.height}return M>re&&$.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:M-re,flex:"0 0 auto",pointerEvents:"none"}})),$}}}function As(e){return m.markdown.render(e,{inline:!0})}var Bc={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},qc=["tomorrow","weekend","pick"];function Wc(e=ke(new Date)){let t=ir(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return Jt(e,n)}function $r(e,t=ke(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?Jt(t,1):s==="weekend"?Wc(t):null,a=new Set,i=[];for(let s of qc){let d=n(s);if(d!==null){if(d===r||a.has(d))continue;a.add(d)}i.push({id:s,labelKey:Bc[s],date:d})}return i}var Cs=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1,canIndent:d=!1,canOutdent:f=!1,onIndent:u,onOutdent:c})=>{let g=Ee(e);return o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":l("auto.047d10fd5b0e"),title:l("auto.6bf5da9c080b"),disabled:s,onClick:w=>{w.stopPropagation(),r(e.id);let T=$r(e.dueDate??"",ke(new Date));m.ui.openMenu([{label:l("auto.bae7d5be7082"),icon:o.createElement(Ze,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Bt().map(h=>({label:l(h.labelKey),icon:o.createElement(ve,{status:h.status,dotCls:h.cls}),type:"radio",checked:h.status===null?g==="open":g===h.status,onSelect:()=>a(Ae(h.status))}))},{label:l("todo.menu.reschedule"),icon:o.createElement(bt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:T.filter(h=>h.date).map(h=>({label:l(h.labelKey),icon:h.id==="tomorrow"?o.createElement(Io,{className:"todo-menu-action-icon"}):h.id==="weekend"?o.createElement(xr,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:h.date})}))},{label:l(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Pe,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:()=>a({flagged:e.flagged?void 0:!0})},{label:l("auto.886cbff9d9df"),icon:o.createElement(_i,{className:"todo-menu-action-icon"}),enabled:!s,submenu:We.map(h=>({label:Na(h.id),type:"radio",checked:e.priority===h.id,onSelect:()=>a({priority:h.id})}))},{label:l("todo.menu.moveGroup"),icon:o.createElement(mr,{className:"todo-menu-action-icon"}),enabled:!s,submenu:[{label:l("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>a({group:void 0})},...t.map(h=>({label:h,type:"radio",checked:e.group===h,onSelect:()=>a({group:h})}))]},{type:"separator"},{label:l("todo.tree.indent"),icon:o.createElement(Hi,{className:"todo-menu-action-icon"}),enabled:!s&&d&&!!u,onSelect:()=>u?.()},{label:l("todo.tree.outdent"),icon:o.createElement(ji,{className:"todo-menu-action-icon"}),enabled:!s&&f&&!!c,onSelect:()=>c?.()},{type:"separator"},{label:l("auto.5301648dcf6b"),icon:o.createElement(Fi,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:n},{type:"separator"},{label:l("auto.f6fdbe48dc54"),icon:o.createElement(gr,{className:"todo-menu-action-icon"}),enabled:!s,danger:!0,onSelect:i}],{anchor:w.currentTarget,align:"end"}).finally(()=>r(null))}},o.createElement(Ii,null)))};function Yc(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Xc(e,t=.998){return e/1e3*t/(1-t)}function Ns(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function Is(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+Yc(n-t,a,.2))}function Ls(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,Xc(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function Ps(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),d=(2*Math.PI/a)**2,f=2*i*Math.sqrt(d),u=t+(-d*(e-r)-f*t)*s,c=e+u*s,g=Math.abs(c-r)<.5&&Math.abs(u)<20;return{value:g?r:c,velocity:g?0:u,done:g}}function Gn(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),d=n*s<=i+(r?24:0),f=d?s:48,u=Math.min(n*f,Math.max(i,n*32)),c=a?Math.min(Math.max(e*.8,u+56),e-24):u+56;return{buttonWidth:f,labelled:d,openWidth:u,commitPoint:c}}var Ms=.22,Os=.18,Zc=.8,Kr=.9,Jc=400,Qc=80,eu=10,tu=5,ou=4,ru=3,nu=.5,au=6,iu=["left","right"],_s={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function su(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function du(e,t){let r={today:o.createElement(Io,null),tomorrow:o.createElement(Io,null),weekend:o.createElement(xr,null),pick:o.createElement(bt,null)};return e.map(n=>({key:n.id,label:l(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var Go=null;function Fs(e){if(Go===e)return;let t=Go;Go=e,t?.close()}function zs(e){Go===e&&(Go=null)}var so;function Gs(e,t){if(so===void 0)try{so=document.createElement("canvas").getContext("2d")}catch{so=null}return so?(so.font=t,so.measureText(e).width):e.length*7}var lu=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,zo=e=>e>0?"left":e<0?"right":null,Rs=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),d=o.useRef({left:null,right:null}),f=o.useRef(0),u=o.useRef(null),c=o.useRef(null),g=o.useRef([]),w=o.useRef(!1),T=o.useRef(null),h=o.useRef(null),S=o.useRef({velocity:0,target:0,response:Ms,damping:Kr}),_=o.useRef({left:"",right:""}),z=o.useMemo(()=>du($r(e.dueDate??"",ke(new Date)),r),[e.dueDate,r]),D=o.useMemo(()=>[{key:"flag",label:l(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Pe,null),run:()=>r.toggleFlag()},{key:"details",label:l("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(Li,null),run:()=>r.openDetails()},{key:"delete",label:l("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(gr,null),run:()=>r.remove()}],[r,e.flagged]),P={left:z,right:D},[M,N]=o.useState(()=>({rowWidth:0,left:_s,right:_s})),I=o.useRef(M);I.current=M;let E=()=>{let p=i.current?.querySelector(".todo-swipe-action");if(!p||typeof getComputedStyle!="function")return"13px sans-serif";let b=getComputedStyle(p);return`${b.fontWeight} ${b.fontSize} ${b.fontFamily}`},G=()=>{let p=i.current?.clientWidth??0,b=E(),A=I.current,j={rowWidth:p,left:Gn(p,z.map(L=>Gs(L.label,b)),A.left.labelled),right:Gn(p,D.map(L=>Gs(L.label,b)),A.right.labelled)};I.current=j;let v=L=>A[L].openWidth!==j[L].openWidth||A[L].labelled!==j[L].labelled;return(A.rowWidth!==p||v("left")||v("right"))&&N(j),j},x=o.useRef(G);x.current=G,o.useEffect(()=>{x.current()},[z,D]);let ee=p=>{let b=zo(p);return!b||b!==c.current?!1:Math.abs(p)>=I.current[b].commitPoint},W=(p,b=!1)=>{f.current=p,b&&p!==0?Fs(V.current):p===0&&zs(V.current);let A=i.current,j=s.current;if(!A||!j)return;j.style.transform=p?`translate3d(${p}px, 0, 0)`:"";let v=zo(p),L=I.current,de=ee(p);A.classList.toggle("open",p!==0),A.classList.toggle("committed",de);for(let ue of iu){let B=d.current[ue];if(!B)continue;let k=v===ue;B.classList.toggle("committed",k&&de);let J=k?de?"100%":`${Math.max(L[ue].openWidth,Math.abs(p))}px`:`${p===0?L[ue].openWidth:0}px`,fe=`${J}|${k}`;_.current[ue]!==fe&&(_.current[ue]=fe,B.style.width=J,B.setAttribute("aria-hidden",String(!k)))}};o.useLayoutEffect(()=>W(f.current));let ae=()=>{T.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(T.current),T.current=null},C=(p,b,A,j)=>{if(ae(),p!==0&&Fs(V.current),f.current===p||lu()||typeof requestAnimationFrame!="function"){W(p);return}S.current={velocity:b,target:p,response:A,damping:j};let v=0,L=de=>{let ue=v?(de-v)/1e3:.016666666666666666;v=de;let B=S.current,k=Ps(f.current,B.velocity,B.target,ue,B.response,B.damping);B.velocity=k.velocity,W(k.value),T.current=k.done?null:requestAnimationFrame(L)};T.current=requestAnimationFrame(L)},$=o.useRef(()=>{});$.current=()=>{u.current=null,C(0,0,Os,Kr)};let re=o.useCallback(()=>$.current(),[]),V=o.useRef({close:()=>$.current()}),H=()=>{ae(),u.current=null,h.current!=null&&window.clearTimeout(h.current),h.current=null,W(0)},ne=o.useRef(H);ne.current=H;let le=p=>{let b=I.current,A=zo(p);if(!A)return 0;let j=u.current?.origin;if(j&&A!==j)return 0;let v=b[A],L=A===c.current?v.commitPoint:v.openWidth;return Is(p,L,b.rowWidth)},O=(p,b,A,j,v)=>{ae(),G();let L=f.current,de=zo(L),ue=Math.abs(L)>8?de:null;c.current=de&&Math.abs(L)>=I.current[de].openWidth-1?de:null,u.current=su(p,b,A,j,L,ue),g.current=[{x:L,t:v}]},X=(p,b)=>{let A=u.current;!A||A.ended||(A.live||(A.live=!0,ae(),n?.()),g.current.push({x:p,t:b}),g.current.length>au&&g.current.shift(),W(le(p),!0),ee(f.current)&&(A.crossed=!0))},Z=p=>{let b=u.current;if(!b||b.ended)return;if(b.ended=!0,!b.live){u.current=null;return}let A=()=>{b.kind==="pointer"&&(u.current=null)},j=Ns(g.current),v=f.current,L=zo(v);if(!L){A(),W(0);return}let de=I.current[L],ue=p&&ee(v),B=Ls({offset:v,velocity:j,openWidth:de.openWidth,committed:ue});if(A(),B.commit){let k=L==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",J=i.current?.querySelector(k),fe=P[L],Fe=L==="left"?fe[0]:fe[fe.length-1];C(0,j,Os,Kr),Fe?.run(J??i.current);return}C(B.target,j,Ms,Math.abs(j)>Jc?Zc:Kr)};o.useEffect(()=>re(),[e.dueDate,e.flagged,re]),o.useEffect(()=>{let p=V.current;return()=>{ae(),h.current!=null&&window.clearTimeout(h.current),zs(p)}},[]),o.useEffect(()=>{let p=i.current,b=p?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!p||!b)return;let A=0,j=new b(()=>{let v=p.clientWidth,L=A!==v;A=v,x.current(),L&&f.current!==0&&ne.current()});return j.observe(p),()=>j.disconnect()},[]);let F=o.useRef({disabled:t,begin:O,move:X,end:Z});F.current={disabled:t,begin:O,move:X,end:Z},o.useEffect(()=>{let p=i.current;if(!p)return;let b=()=>{h.current!=null&&window.clearTimeout(h.current),h.current=null},A=()=>{h.current=null,u.current?.kind==="wheel"&&(F.current.end(!0),u.current=null)},j=v=>{let L=F.current;if(L.disabled||Math.abs(v.deltaX)<=Math.abs(v.deltaY)||v.deltaX===0)return;v.preventDefault();let de=v.deltaMode===WheelEvent.DOM_DELTA_LINE?16:v.deltaMode===WheelEvent.DOM_DELTA_PAGE?p.clientWidth:1,ue=-v.deltaX*de,B=u.current;(!B||B.kind!=="wheel")&&(L.begin("wheel",-1,0,0,v.timeStamp),B=u.current),b(),h.current=window.setTimeout(A,Qc);let k=Math.abs(ue),J=B.previous;B.previous=k;let fe=B.live&&(B.ended||B.origin!==null&&f.current===0),Fe=k>=J+tu,y=B.distance!==0&&Math.sign(ue)!==Math.sign(B.distance)&&k>=ou;if(fe&&(Fe||y)&&(L.end(!1),L.begin("wheel",-1,0,0,v.timeStamp),B=u.current,B.previous=k),B.ended)return;if(B.decay=k<J?B.decay+1:0,B.peak=Math.max(B.peak,k),B.distance+=ue,B.live&&B.peak>=eu&&B.decay>=ru&&k<B.peak*nu){L.end(B.crossed);return}!B.live&&Math.abs(B.distance)<8||L.move(B.base+B.distance,v.timeStamp)};return p.addEventListener("wheel",j,{passive:!1}),()=>{p.removeEventListener("wheel",j),b()}},[]);let K=(p,b)=>o.createElement("div",{ref:A=>{d.current[p]=A},className:`todo-swipe-tray todo-swipe-tray-${p} ${M[p].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${M[p].openWidth}px`}},b.map(A=>o.createElement("button",{key:A.key,type:"button",className:A.cls,tabIndex:-1,title:A.label,"aria-label":A.label,onClick:j=>{j.stopPropagation(),re(),A.run(j.currentTarget)}},A.icon,o.createElement("span",null,A.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:p=>{t||p.pointerType==="mouse"&&p.button!==0||p.target.closest(".todo-swipe-tray")||O("pointer",p.pointerId,p.clientX,p.clientY,p.timeStamp)},onPointerMove:p=>{let b=u.current;if(!b||b.kind!=="pointer"||b.pointerId!==p.pointerId)return;let A=p.clientX-b.originX,j=p.clientY-b.originY;if(!b.live){if(Math.abs(j)>Math.abs(A)){p.currentTarget.hasPointerCapture?.(p.pointerId)&&p.currentTarget.releasePointerCapture(p.pointerId),u.current=null;return}if(Math.abs(A)<8)return;w.current=!0,p.currentTarget.setPointerCapture?.(p.pointerId)}p.preventDefault(),X(b.base+A,p.timeStamp)},onPointerUp:p=>{let b=u.current;!b||b.kind!=="pointer"||b.pointerId!==p.pointerId||(p.currentTarget.hasPointerCapture?.(p.pointerId)&&p.currentTarget.releasePointerCapture(p.pointerId),b.live&&X(b.base+(p.clientX-b.originX),p.timeStamp),Z(!0))},onPointerCancel:p=>{let b=u.current;!b||b.kind!=="pointer"||b.pointerId!==p.pointerId||(p.currentTarget.hasPointerCapture?.(p.pointerId)&&p.currentTarget.releasePointerCapture(p.pointerId),re())},onClickCapture:p=>{let b=!!p.target.closest(".todo-swipe-tray");if(b&&(w.current=!1),w.current&&!b){w.current=!1,p.stopPropagation(),p.preventDefault();return}f.current&&!b&&(p.stopPropagation(),p.preventDefault(),re())}},z.length>0&&K("left",z),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),D.length>0&&K("right",D))};function $s(e,t,r){let n=Ee(t);m.ui.openMenu(Bt().map(a=>({label:l(a.labelKey),icon:o.createElement(ve,{status:a.status,dotCls:a.cls}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ae(a.status))})),{anchor:e})}var cu=2,Ks=({todo:e,groups:t,compact:r,c:n,depth:a=0,hideDate:i=!1,canIndent:s=!1,canOutdent:d=!1,onIndent:f,onOutdent:u,onMoveFocus:c,draggable:g=!1,dropTarget:w=!1,onDragStart:T,onDragOver:h,onDragLeave:S,onDrop:_,onDragEnd:z})=>{let[D,P]=o.useState("");o.useEffect(()=>{let v=!0;return P(""),As(e.title).then(L=>{v&&P(L)}).catch(()=>{v&&P("")}),()=>{v=!1}},[e.title]);let M=(v,L)=>m.workspace.openFile(v,void 0,{newTab:L}),N=We.find(v=>v.id===e.priority)??We[0],I=Te(t),E=Ee(e),G=[e.filePath,...e.attachments??[]].filter(v=>!!v),[x,ee]=o.useState(!1),W=x?G:G.slice(0,cu),ae=G.length-W.length,C=e.urls?.length??0,$=r&&G.length>0,re=!!(e.dueDate&&!i||e.startTime||e.remindAt||e.location||e.group||C>0||$||e.status&&e.status!=="open"&&!Le(e.status).done||e.priority!=="normal"),V=n.pendingIds.has(e.id),H=ke(new Date),ne=e.dueDate&&!i?oi(e.dueDate,H,{today:l("todo.due.today"),tomorrow:l("todo.due.tomorrow"),yesterday:l("todo.due.yesterday")},m.ui.language(),m.getState().dateFormat):"",le=e.dueDate?_e(e.dueDate,m.getState().dateFormat):"",O=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<H,X=o.useRef(null),Z=o.useRef(null);o.useEffect(()=>Z.current?oa(e.id,Z.current):void 0,[e.id]);let F=o.useRef(null),K=o.useRef(!1),p=o.useCallback(()=>{F.current!=null&&(window.clearTimeout(F.current),F.current=null)},[]);o.useEffect(()=>p,[p]);let b=()=>{let v=e.dueDate?.slice(0,10);if(!v)return;let L=m.interop.services.providers(Xr)[0];if(!L)return;let de=m.interop.services.providers(uo).find(ue=>ue.owner===m.pluginId)?.providerId;L.invoke("openDate",[{date:v,startTime:e.startTime,endTime:e.endTime,sourceId:de,itemId:e.id}])},A=v=>n.patchTodo(e.id,v),j=o.useMemo(()=>({reschedule:v=>{n.patchTodo(e.id,{dueDate:v})},pickDate:v=>{let{DateField:L}=m.ui.settings;m.ui.openPopover(de=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(L,{value:e.dueDate,ariaLabel:l("todo.swipe.date"),onChange:ue=>{n.patchTodo(e.id,{dueDate:ue}),de.close()}})),{anchor:v},{ariaLabel:l("todo.swipe.date")})},setStatus:v=>$s(v,e,A),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{To(e,n.removeTodo)}}),[e,n]);return o.createElement(Rs,{todo:e,disabled:V,actions:j,onEngage:p},o.createElement("article",{ref:Z,className:`todo-row${e.dueDate?" todo-row-navigable":""}${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}${a?" nested":""}${w?" drop-target":""}`,"data-todo-id":e.id,"data-depth":a||void 0,style:a?{paddingLeft:`calc(var(--todo-indent) * ${a})`}:void 0,tabIndex:0,onDragStart:v=>{if(v.target.closest("input, button, a, textarea")){v.preventDefault();return}T?.(v)},onDragOver:h,onDragLeave:S,onDrop:_,onDragEnd:z,onKeyDown:v=>{if(v.target===v.currentTarget){if(v.key==="ArrowDown"||v.key==="ArrowUp"){v.preventDefault(),c?.(v.key==="ArrowDown"?1:-1);return}if(v.key==="Escape"){v.currentTarget.blur();return}if(v.key==="Tab"){let L=v.shiftKey?u:f,de=v.shiftKey?d:s;if(!L||!de)return;v.preventDefault(),L();return}v.key==="Enter"&&(v.preventDefault(),n.openDetail(e.id))}},onClick:v=>{v.target.closest("input, button, a, .todo-row-actions")||v.detail>1||b()},onDoubleClick:v=>{v.target.closest("input, button, a, .todo-row-actions")||n.openDetail(e.id)}},o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:X,className:"todo-check","data-status":E,type:"checkbox",checked:E==="completed",disabled:V,onPointerDown:()=>{V||(K.current=!1,p(),F.current=window.setTimeout(()=>{K.current=!0;let v=X.current;v&&m.ui.openMenu(Bt().map(L=>({label:l(L.labelKey),icon:o.createElement(ve,{status:L.status,dotCls:L.cls}),type:"radio",checked:L.status===null?E==="open":L.status===E,enabled:!V,onSelect:()=>n.patchTodo(e.id,Ae(L.status))})),{anchor:v})},450))},onPointerUp:p,onPointerLeave:p,onClick:v=>{K.current&&(v.preventDefault(),K.current=!1)},onChange:v=>{n.patchTodo(e.id,Ae(v.target.checked?"completed":null))},"aria-label":l("auto.13816aca9c25",{p0:e.title})}),E!=="open"&&E!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(ve,{status:E,dotCls:Le(E).cls}))),o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,N.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},N.symbol," "),D?o.createElement("span",{className:"todo-title-md",draggable:g,dangerouslySetInnerHTML:{__html:D}}):o.createElement("span",{className:"todo-title-md",draggable:g},e.title)),!r&&e.note.trim()&&o.createElement(m.ui.MarkdownView,{className:"todo-notes",value:e.note,context:{ref:{pluginId:"todo",sourceId:"tasks",itemId:e.id},sourcePath:e.filePath},onChange:v=>{n.patchTodo(e.id,{note:v})}}),(re||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:De(Ie(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Le(e.status).done&&o.createElement("span",{className:`todo-status-text ${Le(e.status).cls}`},o.createElement(ve,{status:e.status,dotCls:Le(e.status).cls}),ut(e.status)),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(br,null)),Ia(e.priority)),ne&&o.createElement("button",{className:`todo-date${O?" is-overdue":""}`,type:"button",title:l("todo.openInCalendar",{p0:le||ne}),onClick:v=>{v.stopPropagation(),b()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(bt,null)),o.createElement("span",{className:"todo-date-day"},ne),le&&le!==ne&&o.createElement("span",{className:"todo-date-full"},le)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(hr,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:l("todo.openLocationOf",{p0:e.location.name}),onClick:v=>{v.stopPropagation(),Lo(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(yr,null)),e.location.name),$&&o.createElement("span",{className:"todo-attach-count",title:l("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(It,null)),G.length),C>0&&o.createElement("span",{className:"todo-meta-glyph",title:l("todo.url")},o.createElement(it,null),C>1&&C),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:l("todo.reminderSet")},o.createElement(zi,null),e.remindAt.slice(11,16)),!r&&e.tags?.map(v=>o.createElement("span",{key:v,className:"todo-tag-text"},"#",v)))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:l("todo.flagged")},o.createElement(Pe,null)),o.createElement(Cs,{todo:e,groupNames:I,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:A,onRequestDelete:()=>To(e,n.removeTodo),disabled:V,canIndent:s,canOutdent:d,onIndent:f,onOutdent:u})),!r&&G.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":l("auto.c509ffcf5b5c")},W.map(v=>o.createElement("button",{key:v,className:"todo-file-card",title:v,onClick:L=>{L.stopPropagation(),M(v,m.ui.hasModKey(L))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},v===e.filePath?o.createElement(vr,null):o.createElement(It,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},ms(v)),o.createElement("span",{className:"todo-file-card-kind"},Fn(v))))),(ae>0||x)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${x?" open":""}`,title:x?l("todo.fewerFiles"):l("todo.moreFiles",{p0:ae}),"aria-expanded":x,onClick:v=>{v.stopPropagation(),ee(L=>!L)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(at,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},x?l("todo.fewerFiles"):l("todo.moreFiles",{p0:ae})))))))};var tt=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=o.useMemo(()=>ri(e),[e]),[s,d]=o.useState(null),[f,u]=o.useState(null),c=Re(),g=o.useSyncExternalStore(c.subscribe,c.get,c.get),w=o.useMemo(()=>i.map(I=>I.todo.id),[i]),T=Rr(o,{ids:w,estimate:r?52:84,enabled:a.todos.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,s,f,a.lastCreatedId,g?.todoId]}),h=T.show;o.useLayoutEffect(()=>{g&&w.includes(g.todoId)&&h(g.todoId)},[g,w,h]);let S=o.useCallback(()=>{d(null),u(null)},[]),_=o.useCallback(I=>!!s&&s!==I&&Qt(a.todos,s,I),[a.todos,s]),z=o.useCallback((I,E)=>{d(I),E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",I)},[]),D=o.useCallback((I,E)=>{_(I)&&(E.preventDefault(),E.dataTransfer.dropEffect="move",u(I))},[_]),P=o.useCallback((I,E)=>{E.currentTarget.contains(E.relatedTarget)||f===I&&u(null)},[f]),M=o.useCallback((I,E)=>{E.preventDefault(),_(I)&&s&&a.patchTodo(s,{parentId:I}),S()},[a,_,S,s]),N=o.useCallback((I,E)=>{let G=i[Math.max(0,Math.min(i.length-1,I+E))];G&&h(G.todo.id,".todo-row")},[i,h]);return o.createElement("div",{className:"todo-list-rows",ref:T.ref},T.render(I=>{let E=i[I],G=ni(i,I);return o.createElement(Ks,{key:E.todo.id,todo:E.todo,groups:t,compact:r,c:a,depth:E.depth,hideDate:n,canIndent:!!G,canOutdent:ai(e,E.todo.id),onIndent:G?()=>{a.patchTodo(E.todo.id,G)}:void 0,onOutdent:()=>{let x=un(e,E.todo.id);x&&a.patchTodo(E.todo.id,x)},onMoveFocus:x=>N(I,x),draggable:!0,dropTarget:f===E.todo.id,onDragStart:x=>z(E.todo.id,x),onDragOver:x=>D(E.todo.id,x),onDragLeave:x=>P(E.todo.id,x),onDrop:x=>M(E.todo.id,x),onDragEnd:S})}))};function lo({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let d=Re(),f=o.useSyncExternalStore(d.subscribe,d.get,d.get),u=o.useMemo(()=>e.map(z=>z.key),[e]),[c,g]=o.useState(null),w=new Set([t.editingId,t.menuId,t.lastCreatedId,f?.todoId,c].filter(Boolean)),T=e.filter(z=>z.todos.some(D=>w.has(D.id))).map(z=>z.key),h=o.useCallback((z,D)=>a?.(e[D])??32+e[D].todos.length*(r?52:84),[e,r,a]),S=Rr(o,{ids:u,estimate:h,pinned:T,layoutKey:i??r}),_=S.show;return o.useLayoutEffect(()=>{if(!f)return;let z=e.find(D=>D.todos.some(P=>P.id===f.todoId));z&&_(z.key)},[f,e,_]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:S.ref,onDragStartCapture:z=>g(z.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},S.render(z=>o.cloneElement(s(e[z]),{"data-visible-key":u[z]})))}function uu(e,t,r,n,a){if(e==="none")return l("todo.breakdown.noDate");if(e==="monthly")return ko(`${t}-01`).toLocaleDateString(void 0,{month:"long",year:"numeric"});if(e==="weekly"){let i=ko(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return l("todo.breakdown.weekLabel",{count:ii(i),p0:`${nt(t,a,n)} \u2013 ${nt(He(s),a,n)}`})}return t===Jt(r,-1)?l("todo.due.yesterday"):t===r?l("todo.due.today"):t===Jt(r,1)?l("todo.due.tomorrow"):nt(t,a,n)}function Vr({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let d=He(),{shortDateFormat:f}=xt("shortDateFormat"),u=m.ui.language(),c=o.useMemo(()=>{if(!s)return mn(e,a,pn(i));let g=[...e].sort((w,T)=>Ct(T).localeCompare(Ct(w)));return mn(g,a,pn(i),{dateOf:w=>fn(Ct(w)),inheritRoot:!1})},[a,s,e,i]);return o.createElement(lo,{className:"todo-panel-date-sections",sections:c,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},uu(g.kind,g.key,d,f,u)),o.createElement(tt,{todos:g.todos,groups:t,compact:r,c:n})))}function pu(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function Vs(e,t,r){let n=pu(e,t);return r?n:n.filter(a=>!Dt.includes(a))}function fu(){let[e,t]=Pt(),[r]=wt(),n=ct(),a=n.map(d=>d.id),i=Vs(e,a,r),s=d=>{let f=i.includes(d)?i.filter(u=>u!==d):a.filter(u=>i.includes(u)||u===d);f.length&&(Ot(f.some(u=>Dt.includes(u))),t(f.length===a.length?"all":f))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":i.length===a.length,onClick:()=>{Ot(!0),t("all")}},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},i.length===a.length?"\u2713":""),o.createElement("span",null,l("todo.chip.all"))),o.createElement("div",{className:"todo-filter-divider"}),n.map(d=>{let f=i.includes(d.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":f,key:d.id,onClick:()=>s(d.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},f?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(ve,{status:d.id==="open"?null:d.id,dotCls:d.cls})),o.createElement("span",null,l(d.labelKey)))}))}function Hr({filter:e,className:t=""}){let[r]=wt(),n=ct(),a=n.map(d=>d.id),i=Vs(e,a,r),s=e==="all"&&r?l("todo.chip.all"):i.length===1?l(n.find(d=>d.id===i[0])?.labelKey??"todo.chip.all"):l("todo.filters.statusCount",{count:i.length});return o.createElement("button",{type:"button",className:"todo-status-filter-select "+t,"aria-label":l("todo.filters.statuses"),onClick:d=>{m.ui.openPopover(()=>o.createElement(fu,null),{anchor:d.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:l("todo.filters.statuses")})}},o.createElement("span",null,s),o.createElement(at,null))}function jr(e){return e==="flagged"?o.createElement(Pe,null):e==="priority"?o.createElement(br,null):e==="due"?o.createElement(Co,null):e==="updated"?o.createElement(Pi,null):e==="created"?o.createElement(Mi,null):o.createElement(Oi,null)}function mu(){let[e]=wt(),[t,r]=Pt(),a=ct().map(s=>s.id),i=s=>{if(t!=="all"){let d=t.filter(c=>a.includes(c)),f=s?a.filter(c=>d.includes(c)||c==="completed"):d.filter(c=>!Dt.includes(c)),u=f.length?f:a.filter(c=>!Dt.includes(c));r(u.length===a.length?"all":u)}Ot(s)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,l("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,"aria-pressed":!e,onClick:()=>i(!1)},l("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,"aria-pressed":e,onClick:()=>i(!0)},l("todo.completed.showAll")))),o.createElement("div",{className:"todo-filter-control-row status"},o.createElement("span",null,l("todo.filters.statuses")),o.createElement(Hr,{filter:t})))}function $n({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,d]=o.useState(r),f=Object.entries(At);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,l("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":l("auto.01e635f27ec2"),title:l("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{d("desc"),n("desc")}},o.createElement(Ao,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":l("auto.4fee0a06b6e4"),title:l("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{d("asc"),n("asc")}},o.createElement(Eo,null)))),o.createElement("div",{className:"todo-sort-options"},f.map(([u,c])=>o.createElement("button",{key:u,type:"button",className:`todo-sort-option${a===u?" active":""}`,"aria-pressed":a===u,onClick:()=>{i(u),t(u)}},jr(u),o.createElement("span",null,l(c))))))}function Fo({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:d,embedded:f=!1}){let[u,c]=o.useState(a),[g,w]=o.useState(i),T=f?a:u,h=f?i:g,S=T.length===r.length&&(!n||h),_=[...r.map(M=>T.some(N=>N.toLowerCase()===M.toLowerCase())),...n?[h]:[]],z=(M,N)=>M?` active${_[N-1]?"":" selection-run-start"}${_[N+1]?"":" selection-run-end"}`:"",D=(M,N)=>{c(M),w(N),s(M,N)},P=M=>{let N=e.filter(G=>M===null?!G.group:oe(G.group??"")===oe(M)),I=M??l("todo.chip.noGroup"),E=M===null?h:T.some(G=>oe(G)===oe(M));return o.createElement("div",{className:"todo-group-filter-item",key:M??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},M&&o.createElement("span",{className:"props-info-dot",style:{background:De(Ie(M,t))}}),I),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,N.length),o.createElement(m.ui.settings.Toggle,{label:I,checked:E,onChange:()=>D(M===null?T:E?T.filter(G=>oe(G)!==oe(M)):[...T,M],M===null?!h:h)}))))};return f?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:d},l("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>D(S?[]:r,S?!1:n)},l(S?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(M=>P(M)),n&&P(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:d},l("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>D(S?[]:r,S?!1:n)},l(S?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((M,N)=>{let I=_[N];return o.createElement("button",{key:M,type:"button",className:`todo-group-filter-row${z(I,N)}`,"aria-pressed":I,onClick:()=>D(I?u.filter(E=>E.toLowerCase()!==M.toLowerCase()):[...u,M],g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},I?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:De(Ie(M,t))}}),o.createElement("span",{className:"todo-tree-label"},M),o.createElement("span",{className:"todo-tree-count"},Sr(e,M)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${z(g,r.length)}`,"aria-pressed":g,onClick:()=>D(u,!g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},l("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Sr(e,null)))))}var Hs={scheduled:()=>o.createElement(Co,null),today:()=>o.createElement(No,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(wr,null),completed:()=>o.createElement(Ze,null)},gu=()=>{let{activePluginTab:e,dateFormat:t}=xt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Gr(),a=Be(),i=Mt(),[s,d]=o.useState(""),[f,u]=o.useState(!1),[c,g]=Or(),[w]=wt(),[T,h]=Cr("todo"),{sortField:S,sortDir:_,compact:z}=T,[D,P]=Pt(),M=ct(),N=Nr(),I=ns(),E=o.useMemo(()=>qi(I),[I]),G=e?.pluginId===m.pluginId,x=o.useRef(null),ee=o.useRef(null),W=ao(S,_,"left_sidebar");Rt(W.openDetail);let ae=ke(new Date),C=o.useMemo(()=>Xi(W.todos,ae),[W.todos,ae]),$=o.useMemo(()=>Te(a),[a]),re=o.useMemo(()=>W.todos.some(k=>!k.group),[W.todos]),V=i.kind==="groups"?i.names:$,H=i.kind==="groups"?i.includeUngrouped===!0:re,ne=V.length===$.length&&(!re||H),le=o.useMemo(()=>{let k=W.ordered.filter(J=>kr(J,i,w,ae));return D!=="all"&&(k=k.filter(J=>jt(J,D))),c.trim()&&(k=k.filter(J=>Et(c,J.tags??[],J.title,J.note,J.group??""))),n?k=k.filter(J=>{let fe=J.dueDate?.slice(0,10);return!!fe&&fe>=n.start&&fe<=n.end}):r&&(k=k.filter(J=>J.dueDate?.slice(0,10)===r)),k},[W.ordered,i,w,D,c,r,n,ae]),O=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,X=async()=>{let k=s.trim();if(!k){F();return}let J=O;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let y=await m.ui.openMenu([...i.names.map((R,ie)=>({id:`group:${ie}`,label:R})),...i.includeUngrouped?[{id:"ungrouped",label:l("todo.chip.noGroup")}]:[]],{anchor:x.current??ee.current,align:"start"});if(y===null)return;J=y.startsWith("group:")?i.names[Number(y.slice(6))]:void 0}d("");let fe={...J?{group:J}:{}};i.kind==="smart"&&i.id==="today"&&(fe.dueDate=ae),i.kind==="smart"&&i.id==="flagged"&&(fe.flagged=!0),await W.create(k,void 0,{patch:fe})?x.current?.focus():d(k)},Z=()=>{u(!0),window.setTimeout(()=>x.current?.focus(),0)},F=()=>{d(""),u(!1)},K=k=>{m.ui.openPopover(()=>o.createElement(mu,null),{anchor:k,align:"end"},{className:"todo-filter-popover",ariaLabel:l("todo.filters.statusAndCompleted")})},p=k=>{m.ui.openPopover(()=>o.createElement($n,{sortField:S,setSortField:J=>h({sortField:J}),sortDir:_,setSortDir:J=>h({sortDir:J})}),{anchor:k,align:"end"},{className:"todo-sort-popover",ariaLabel:l("auto.63e08dc2a4e3")})},b=k=>{m.ui.openPopover(({close:J})=>o.createElement(Fo,{todos:W.todos,groups:a,names:$,hasUngrouped:re,selected:V,includeUngrouped:H,onChange:(fe,Fe)=>Me(fe.length===$.length&&(!re||Fe)?we:{kind:"groups",names:fe,includeUngrouped:Fe}),onOpenSettings:()=>{J(),et()}}),{anchor:k,align:"end"},{className:"todo-groups-popover",ariaLabel:l("todo.view.groups")})},A=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},j=(k,J,fe,Fe,y,R,ie)=>{let ze=Dr(i,J),kt=J.kind==="groups"&&J.names.length===1&&!J.includeUngrouped&&i.kind==="groups"?i.names.some(co=>oe(co)===oe(J.names[0])):ze;return o.createElement("button",{key:yt(J),type:"button",className:`todo-tree-row${y?" nested":""}${R?` todo-${R}-chip`:""}${kt?" active":""}`,"aria-current":ze?"true":void 0,"aria-pressed":J.kind==="groups"?kt:void 0,style:ie?{"--todo-chip-color":De(ie),"--todo-chip-on":la(ie)}:void 0,onClick:()=>Me(J)},Fe&&o.createElement("span",{className:"todo-tree-icon"},Fe),y&&o.createElement("span",{className:"todo-tree-dot",style:{background:De(y)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},k),o.createElement("span",{className:"todo-tree-count"},fe))},L=!!(c||r||n||D!=="all")?l("auto.006b85a57ddf"):l("auto.cec28cbe4204"),de=n?`${_e(n.start,t)} \u2013 ${_e(n.end,t)}`:r?_e(r,t):null,ue=D==="all"?null:`${l("auto.bae7d5be7082")}: ${D.length===1?l(M.find(k=>k.id===D[0])?.labelKey??"todo.chip.all"):l("todo.filters.statusCount",{count:D.length})}`,B=l("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},l("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!G&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${ne?"":" active"}`,"aria-label":l("todo.view.groups"),title:l("todo.view.groups"),type:"button",onClick:k=>b(k.currentTarget)},o.createElement(oo,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${w||D!=="all"?" active":""}`,"aria-label":l("todo.filters.statusAndCompleted"),title:l("todo.filters.statusAndCompleted"),type:"button",onClick:k=>K(k.currentTarget)},o.createElement(Ze,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":l("auto.e3719eae891e"),"aria-pressed":z,title:z?l("auto.e3719eae891e"):l("auto.d2f76731e1e1"),type:"button",onClick:()=>h({compact:!z})},z?o.createElement(pr,null):o.createElement(fr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":l("auto.63e08dc2a4e3"),title:`${_==="asc"?l("auto.4fee0a06b6e4"):l("auto.01e635f27ec2")} \xB7 ${l(At[S])}`,type:"button",onClick:k=>p(k.currentTarget)},_==="asc"?o.createElement(Eo,null):o.createElement(Ao,null),jr(S))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":l("auto.25097a85052b"),title:l("auto.25097a85052b"),onClick:()=>m.workspace.openMainTab()}))),o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(cr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:c,onChange:k=>g(k.target.value),onKeyDown:k=>{k.key==="Escape"&&g("")},placeholder:l("auto.7be377261c61"),"aria-label":l("auto.e0345e9d3092")}),c&&o.createElement("button",{className:"search-field-action",onClick:()=>g(""),"aria-label":l("auto.67300d0fed7c"),type:"button"},o.createElement(Ce,null))),G?o.createElement("div",{className:"todo-tree todo-active-navigation"},o.createElement("nav",{className:"todo-smart-grid","aria-label":l("auto.fdebf6672120")},E.map(k=>j(l(k.labelKey),{kind:"smart",id:k.id},C[k.id],Hs[k.id](),void 0,"smart",k.color))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},l("todo.view.myLists")),$.map(k=>j(k,{kind:"groups",names:[k]},Sr(W.todos,k),void 0,Ie(k,a))))):o.createElement(o.Fragment,null,!c&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":l("auto.fdebf6672120")},de?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:l("auto.f93fb4b1ab19"),onClick:A},o.createElement("span",{className:"todo-tree-icon"},o.createElement(No,null)),o.createElement("span",{className:"todo-tree-label"},de),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Ce,null))):E.map(k=>j(l(k.labelKey),{kind:"smart",id:k.id},C[k.id],Hs[k.id](),void 0,"smart",k.color))),ue&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>P("all")},o.createElement("span",{className:"todo-tree-label"},ue),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Ce,null)))),o.createElement("div",{className:"todo-list"},f&&o.createElement("form",{className:"todo-compose",onSubmit:k=>{k.preventDefault(),X()}},o.createElement("input",{ref:x,value:s,onChange:k=>d(k.target.value),onKeyDown:k=>{k.key==="Escape"&&F()},onBlur:()=>{s.trim()||u(!1)},placeholder:O?l("todo.newTodoIn",{p0:O}):l("auto.c274dabfd0fe"),"aria-label":l("auto.184c39d1837f"),disabled:W.creating})),W.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("auto.b5868978587a"))):le.length?o.createElement(Vr,{todos:le,groups:a,compact:z,controller:W,mode:N,weekStart:m.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,L))),o.createElement("button",{ref:ee,className:"todo-fab",type:"button","aria-label":B,title:B,disabled:W.creating,onClick:()=>f?void X():Z()},o.createElement(Xe,null))),o.createElement(io,{c:W}))},js=()=>o.createElement(gu,null);function hu({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=ct(),i=a.map(f=>f.id),s=r==="all"?i:r,d=f=>{let u=s.includes(f)?s.filter(c=>c!==f):i.filter(c=>s.includes(c)||c===f);u.length&&n(u.length===i.length?"all":u)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,l("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,onClick:()=>t(!1)},l("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,onClick:()=>t(!0)},l("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(f=>o.createElement("button",{key:f.id,type:"button",className:"todo-status-filter-option","aria-pressed":s.includes(f.id),onClick:()=>d(f.id)},o.createElement("span",{className:"todo-status-filter-check"},s.includes(f.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(ve,{status:f.id==="open"?null:f.id,dotCls:f.cls})),o.createElement("span",null,l(f.labelKey))))))}var Us=()=>{let{activePath:e,weekStart:t}=xt("activePath","weekStart"),r=dt(e)??"",n=Be(),a=Nr(),[i,s]=Cr("attachment"),{showCompleted:d,statusFilter:f,compact:u,sortField:c,sortDir:g,groupNames:w,includeUngrouped:T}=i,h=x=>s({showCompleted:x}),S=x=>s({statusFilter:x}),_=x=>s({sortField:x}),z=x=>s({sortDir:x}),D=ao(c,g,"right_sidebar");Rt(D.openDetail);let P=o.useMemo(()=>Te(n),[n]),M=o.useMemo(()=>D.todos.some(x=>!x.group),[D.todos]),N=o.useMemo(()=>D.ordered.filter(x=>!(dt(x.filePath)===r||(x.attachments??[]).some(W=>dt(W)===r))||!d&&x.completed||(w.length||T)&&(!x.group&&!T||x.group&&!new Set(w.map(oe)).has(oe(x.group)))?!1:jt(x,f)),[D.ordered,r,d,f,w,T]),I=x=>{m.ui.openPopover(({close:ee})=>o.createElement(Fo,{todos:D.todos,groups:n,names:P,hasUngrouped:M,selected:w,includeUngrouped:T,onChange:(W,ae)=>s({groupNames:W,includeUngrouped:ae}),onOpenSettings:()=>{ee(),et()}}),{anchor:x,align:"end"},{className:"todo-groups-popover",ariaLabel:l("todo.view.groups")})},E=x=>{m.ui.openPopover(()=>o.createElement(hu,{showCompleted:d,setShowCompleted:h,filter:f,setFilter:S}),{anchor:x,align:"end"},{className:"todo-filter-popover",ariaLabel:l("todo.filters.statusAndCompleted")})},G=x=>{m.ui.openPopover(()=>o.createElement($n,{sortField:c,setSortField:_,sortDir:g,setSortDir:z}),{anchor:x,align:"end"},{className:"todo-sort-popover",ariaLabel:l("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},l("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${w.length||T?" active":""}`,type:"button","aria-label":l("todo.view.groups"),title:l("todo.view.groups"),onClick:x=>I(x.currentTarget)},o.createElement(oo,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${d||f!=="all"?" active":""}`,type:"button","aria-label":l("todo.filters.statusAndCompleted"),title:l("todo.filters.statusAndCompleted"),onClick:x=>E(x.currentTarget)},o.createElement(Ze,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":u,"aria-label":l("auto.e3719eae891e"),onClick:()=>s({compact:!u})},u?o.createElement(pr,null):o.createElement(fr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":l("auto.63e08dc2a4e3"),title:`${g==="asc"?l("auto.4fee0a06b6e4"):l("auto.01e635f27ec2")} \xB7 ${l(At[c])}`,onClick:x=>G(x.currentTarget)},g==="asc"?o.createElement(Eo,null):o.createElement(Ao,null),jr(c)))),o.createElement("div",{className:"todo-list"},D.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("auto.b5868978587a"))):r?N.length?o.createElement(Vr,{todos:N,groups:n,compact:u,controller:D,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("todo.attachmentTasks.noFile")))),o.createElement(io,{c:D}))};var Kn="pageCollapsed";function bu(){let e=m.settings.get()[Kn];return Array.isArray(e)?new Set(e.filter(t=>eo.includes(t))):new Set(["completed"])}var Bs=({navigation:e})=>{let{dateFormat:t,shortDateFormat:r}=xt("dateFormat","shortDateFormat"),{selectedDate:n,selectedDateRange:a}=Gr(),{SelectField:i}=m.ui.settings,s=Be(),d=Mt(),f=Mr();o.useEffect(()=>(e.setController({canGoBack:f.canGoBack,canGoForward:f.canGoForward,goBack:()=>no(-1),goForward:()=>no(1)}),()=>e.setController(null)),[e,f.canGoBack,f.canGoForward]);let[u,c]=o.useState(""),[g,w]=Or(),[T,h]=ds(),{field:S,dir:_}=T,[z,D]=o.useState(bu),[P,M]=o.useState(new Set),[N,I]=wt(),[E]=Pt(),G=o.useRef(null),x=ao("due","asc");Rt(x.openDetail),o.useEffect(()=>{if(!x.loading)if(d.kind==="groups"){let y=new Set(Te(s));!d.includeUngrouped&&!d.names.some(R=>y.has(R))&&Me(we)}else d.kind==="tag"&&(x.todos.some(y=>y.tags?.includes(d.name))||Me(we))},[x.loading,x.todos,s,d]),o.useEffect(()=>{N&&D(y=>{if(!y.has("completed"))return y;let R=new Set(y);return R.delete("completed"),m.settings.set(Kn,[...R]),R})},[N]);let ee=He(),W=d.kind==="smart"?vt(d.id):null,ae=!!W?.dated,C=d.kind==="groups"?d.names.length===1&&!d.includeUngrouped?d.names[0]:l("todo.view.selectedGroups",{count:d.names.length+(d.includeUngrouped?1:0)}):d.kind==="tag"?`#${d.name}`:d.kind==="nogroup"?l("todo.chip.noGroup"):l(W.labelKey),$=d.kind==="groups"?d.names.length===1&&!d.includeUngrouped?De(Ie(d.names[0],s)):"var(--accent-color)":d.kind==="tag"?"var(--accent-color)":d.kind==="nogroup"?"var(--text-color)":De(W.color)||"var(--text-color)",re=o.useMemo(()=>{let y=x.todos.filter(R=>kr(R,d,N,ee));return E!=="all"&&(y=y.filter(R=>jt(R,E))),g.trim()&&(y=y.filter(R=>Et(g,R.tags??[],R.title,R.note,R.group??""))),a?y=y.filter(R=>{let ie=R.dueDate?.slice(0,10);return!!ie&&ie>=a.start&&ie<=a.end}):n&&(y=y.filter(R=>R.dueDate?.slice(0,10)===n)),y},[x.todos,d,N,E,g,n,a,ee]),V=o.useMemo(()=>Yi(x.todos,d,ee),[x.todos,d,ee]),H=re,ne=o.useMemo(()=>ae?ui(H.filter(y=>!y.completed),ee):[],[ae,H,ee]),le=ne.filter(y=>!!y.key&&y.key<ee),O=ne.find(y=>y.key===ee),X=ae?H.filter(y=>y.completed):[],Z=o.useMemo(()=>O?mi(O.todos):[],[O]),{near:F,months:K}=o.useMemo(()=>gi(ne.filter(y=>!y.key||y.key>ee),ee),[ne,ee]),p=o.useMemo(()=>K.map(y=>({...y,todos:y.days.flatMap(R=>R.todos)})),[K]),b=o.useMemo(()=>{if(ae)return null;let y=So(H,ee);if(S!=="auto")for(let R of eo)y[R]=Zt(y[R],S,_);return y},[ae,H,ee,S,_]),A=o.useMemo(()=>d.kind==="smart"&&d.id==="completed"?pi(H):null,[d,H]),j=x.lastCreatedId?H.find(y=>y.id===x.lastCreatedId)??x.todos.find(y=>y.id===x.lastCreatedId):void 0,v=y=>{M(R=>{let ie=new Set(R);return ie.has(y)?ie.delete(y):ie.add(y),ie})},L=y=>{D(R=>{let ie=new Set(R);return ie.has(y)?ie.delete(y):ie.add(y),m.settings.set(Kn,[...ie]),ie})},de=d.kind==="groups"&&d.names.length===1&&!d.includeUngrouped?d.names[0]:void 0,ue=async y=>{let R=hi(u,ee);if(!R.title){G.current?.focus();return}let ie=y?.group??de;if(!y?.group&&d.kind==="groups"&&d.names.length+(d.includeUngrouped?1:0)>1){let co=await m.ui.openMenu([...d.names.map((Zs,Js)=>({id:`group:${Js}`,label:Zs})),...d.includeUngrouped?[{id:"ungrouped",label:l("todo.chip.noGroup")}]:[]],{anchor:G.current,align:"start"});if(co===null)return;ie=co.startsWith("group:")?d.names[Number(co.slice(6))]:void 0}c("");let ze=R.dueDate||(d.kind==="smart"&&d.id==="today"?ee:""),kt=await x.create(R.title,void 0,{patch:{dueDate:ze,priority:R.priority,...ie?{group:ie}:{},...d.kind==="smart"&&d.id==="flagged"?{flagged:!0}:{}}});if(!kt){c(u);return}y?.openDetail&&x.openDetail(kt.id)},B=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},k=Te(s),J=[{label:l("todo.fab.newTodo"),icon:o.createElement(Xe,null),onSelect:()=>G.current?.focus()},...k.length?[{label:l("todo.fab.newTodoIn"),icon:o.createElement(mr,null),submenu:k.map(y=>({label:y,onSelect:()=>{Me({kind:"groups",names:[y]}),G.current?.focus()}}))}]:[],{type:"separator"},{label:l("todo.group.manage"),icon:o.createElement(oo,null),onSelect:()=>{et()}},{type:"separator"},{label:l("auto.fb3a16f382f8"),icon:o.createElement(it,null),onSelect:()=>{navigator.clipboard.writeText(m.workspace.buildOwnLink(_r()))}},{label:l("auto.c7f73bb54d92"),icon:o.createElement(Gi,null),onSelect:()=>m.workspace.openOwnSettings()}],fe=y=>{m.ui.openMenu(J,{anchor:y,align:"end"})};o.useEffect(()=>{Ln(J)}),o.useEffect(()=>()=>Ln(null),[]);let Fe=u.trim()||x.creating?l("auto.9c0410f3884e"):l("todo.fab.menu");return o.createElement("div",{className:"todo-page"},o.createElement("div",{className:"todo-page-appbar"},o.createElement("div",{className:"todo-page-appbar-title",style:{color:$}},C)),o.createElement("div",{className:"todo-page-scroll hidescrollbar"},o.createElement("div",{className:"todo-page-column"},o.createElement("header",{className:"todo-page-header"},o.createElement("h1",{className:"todo-page-view-title",style:{color:$}},C),o.createElement("div",{className:"todo-page-view-sub"},o.createElement("span",null,l("todo.page.completedCount",{count:V})),o.createElement("button",{type:"button",className:"todo-page-view-toggle",style:{color:$},"aria-pressed":N,onClick:I},l(N?"todo.completed.hide":"todo.completed.showAll")))),o.createElement("form",{className:"todo-page-quickadd",onSubmit:y=>{y.preventDefault(),ue()}},o.createElement(Xe,{className:"todo-page-quickadd-icon"}),o.createElement("input",{ref:G,value:u,onChange:y=>c(y.target.value),placeholder:de?l("todo.newTodoIn",{p0:de}):l("auto.d0e6e1dca756"),"aria-label":l("auto.81df98734775"),disabled:x.creating})),o.createElement("div",{className:"todo-page-toolbar"},o.createElement("div",{className:"todo-search-wrap search-field"},o.createElement(cr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:g,onChange:y=>w(y.target.value),placeholder:l("auto.f4ade25164a5"),"aria-label":l("auto.e0345e9d3092")}),g&&o.createElement("button",{className:"search-field-action",type:"button",onClick:()=>w(""),"aria-label":l("auto.67300d0fed7c")},o.createElement(Ce,null))),o.createElement(i,{className:"flagged-notes-sort-select",value:S,ariaLabel:l("auto.63e08dc2a4e3"),onChange:y=>h({...T,field:y}),options:[{value:"auto",label:l("auto.c614ba7c453c")},...Object.entries(At).map(([y,R])=>({value:y,label:l(R)}))]}),S!=="auto"&&o.createElement("button",{className:"flagged-notes-sort-dir",type:"button","aria-label":l("auto.44b8af7351fe",{p0:_==="asc"?"descending":"ascending"}),onClick:()=>h({...T,dir:_==="asc"?"desc":"asc"})},_==="asc"?l("auto.4fee0a06b6e4"):l("auto.01e635f27ec2")),o.createElement(Hr,{filter:E}),(a||n)&&o.createElement("button",{type:"button",className:"todo-due-chip active todo-date-chip",title:l("auto.f93fb4b1ab19"),onClick:B},a?`${_e(a.start,t)} \u2013 ${_e(a.end,t)}`:_e(n,t)," ",o.createElement(Ce,null))),x.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("auto.b5868978587a"))):A?A.length?o.createElement(lo,{className:"todo-completed-timeline",sections:A,c:x},y=>o.createElement("section",{className:"todo-schedule-block",key:y.key},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,nt(y.key,m.ui.language(),r)),o.createElement("span",{className:"todo-page-section-count"},y.todos.length)),o.createElement(tt,{todos:y.todos,groups:s,compact:!1,c:x}))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("auto.cec28cbe4204"))):ae?ne.length||X.length?o.createElement(o.Fragment,null,X.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,l("todo.view.completed")),o.createElement("span",{className:"todo-page-section-count"},X.length)),o.createElement(tt,{todos:X,groups:s,compact:!1,c:x})),le.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-overdue"},o.createElement("span",null,l("todo.due.overdue")),o.createElement("span",{className:"todo-page-section-count"},le.reduce((y,R)=>y+R.todos.length,0))),o.createElement(lo,{sections:le,c:x},y=>o.createElement("div",{key:y.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head is-overdue"},nt(y.key,m.ui.language(),r)),o.createElement(tt,{todos:y.todos,groups:s,compact:!1,hideDate:!0,c:x})))),O&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-today"},o.createElement("span",null,l("todo.due.today")),o.createElement("span",{className:"todo-page-section-count"},O.todos.length)),Z.map(y=>o.createElement("div",{key:y.id,className:"todo-page-days"},y.id!=="untimed"&&o.createElement("h3",{className:"todo-timeofday-head"},l(fi[y.id])),o.createElement(tt,{todos:y.todos,groups:s,compact:!1,hideDate:!0,c:x})))),F.map(y=>o.createElement("section",{key:y.key||"nodate",className:"todo-page-days"},o.createElement("h2",{className:"todo-day-head"},y.key?nt(y.key,m.ui.language(),r):l("todo.due.noDeadline")),o.createElement(tt,{todos:y.todos,groups:s,compact:!1,hideDate:!0,c:x}))),o.createElement(lo,{sections:p,c:x,layoutKey:P,estimate:y=>P.has(y.key)?48+y.days.length*32+y.todos.length*84:48},y=>{let R=!P.has(y.key),ie=y.days.reduce((ze,kt)=>ze+kt.todos.length,0);return o.createElement("section",{key:y.key,className:`todo-month${R?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-month-head","aria-expanded":!R,onClick:()=>v(y.key)},o.createElement(at,{className:"todo-page-section-chevron"}),o.createElement("span",{className:"todo-month-label"},ti(y.key,m.ui.language(),{partial:y.partial,restOfLabel:l("todo.month.restOf")})),o.createElement("span",{className:"todo-page-section-count"},ie)),!R&&y.days.map(ze=>o.createElement("div",{key:ze.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head"},nt(ze.key,m.ui.language(),r)),o.createElement(tt,{todos:ze.todos,groups:s,compact:!1,hideDate:!0,c:x}))))})):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,l("auto.cec28cbe4204"))):eo.map(y=>{let R=b[y];j&&!R.some(ze=>ze.id===j.id)&&So([j],ee)[y].length&&(R=[j,...R]);let ie=z.has(y);return!R.length&&y!=="today"?null:o.createElement("section",{key:y,className:`todo-page-section${ie?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-page-section-head","aria-expanded":!ie,onClick:()=>L(y)},o.createElement(at,{className:"todo-page-section-chevron"}),o.createElement("span",{className:`todo-page-section-label todo-page-section-${y}`},l(ci[y])),o.createElement("span",{className:"todo-page-section-count"},R.length)),!ie&&o.createElement("div",{className:"todo-page-section-body"},R.length?o.createElement(tt,{todos:R,groups:s,compact:!1,c:x}):o.createElement("div",{className:"todo-page-section-empty"},l("auto.346d73d6f5b6"))))}))),o.createElement("button",{className:"todo-fab",type:"button","aria-label":Fe,title:Fe,disabled:x.creating,onClick:y=>{u.trim()?ue({openDetail:!0}):fe(y.currentTarget)}},o.createElement(Xe,null)),o.createElement(io,{c:x}))};var qs={scheduled:()=>o.createElement(Co,null),today:()=>o.createElement(No,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(wr,null),completed:()=>o.createElement(Ze,null)};function yu(){let{Button:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Oo);o.useEffect(()=>m.settings.subscribe(()=>a(Oo())),[]);let i=c=>{a(c),rs(c)},s=n.order.filter(c=>!n.hidden.includes(c)),d=s.map(vt),f=r({items:d,getId:c=>c.id,getLabel:c=>l(c.labelKey),onReorder:c=>{let g=c.map(T=>T.id),w=0;i({...n,order:n.order.map(T=>n.hidden.includes(T)?T:g[w++])})}}),u=c=>{if(s.length<=1)return;let g={...n,hidden:[...n.hidden,c]};i(g);let w=Lt();if(w.kind==="smart"&&w.id===c){let T=g.order.find(h=>!g.hidden.includes(h));Me({kind:"smart",id:T})}};return o.createElement(m.ui.settings.Section,{title:l("todo.settings.smartLists")},o.createElement("div",{className:"todo-smart-list-settings"},o.createElement("p",{className:"todo-status-settings-desc"},l("todo.settings.smartListsDesc")),d.map(c=>{let g=f.getHandleProps(c);return o.createElement("div",{className:"todo-smart-list-setting-row"+(f.overId===c.id?" drop-"+(f.dropPosition??"before"):""),key:c.id,...f.getItemProps(c)},o.createElement("button",{...g,className:(g.className??"")+" todo-status-setting-handle",title:l("todo.settings.smartListReorder")},o.createElement(ur,null)),o.createElement("span",{className:"todo-smart-list-setting-glyph"},qs[c.id]()),o.createElement("span",{className:"todo-status-setting-name"},l(c.labelKey)),o.createElement(t,{onClick:()=>u(c.id),disabled:s.length<=1,ariaLabel:l("todo.settings.smartListHide",{p0:l(c.labelKey)}),title:l("todo.settings.smartListHide",{p0:l(c.labelKey)})},o.createElement(Ce,null)))}),n.hidden.length>0&&o.createElement("div",{className:"todo-smart-list-hidden"},o.createElement("span",{className:"todo-smart-list-hidden-title"},l("todo.settings.smartListsHidden")),n.hidden.map(c=>{let g=vt(c);return o.createElement("div",{className:"todo-smart-list-hidden-row",key:c},o.createElement("span",{className:"todo-smart-list-setting-glyph"},qs[c]()),o.createElement("span",null,l(g.labelKey)),o.createElement(e,{onClick:()=>i({...n,hidden:n.hidden.filter(w=>w!==c)})},l("todo.settings.smartListRestore")))})),f.liveRegion))}function vu(){let{ColorField:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Vt);o.useEffect(()=>m.settings.subscribe(()=>a(Vt())),[]);let i=h=>{a(h),ha(h)},s=n.active.map(h=>Le(h)),d=bo.filter(h=>!n.active.includes(h)).map(h=>Le(h)),f=[...s,...d],u=r({items:f,getId:h=>h.id,getLabel:h=>l(h.labelKey),onReorder:(h,S)=>{let _=n.active.includes(S.activeId),z=n.active.includes(S.overId);if(_&&z){let D=new Set(n.active);i({...n,active:h.filter(P=>D.has(P.id)).map(P=>P.id)})}else if(_)i({...n,active:n.active.filter(D=>D!==S.activeId)});else if(z){let D=[...n.active],P=D.indexOf(S.overId);D.splice(P+(S.position==="after"?1:0),0,S.activeId),i({...n,active:D})}}}),c=h=>{i({...n,active:n.active.filter(S=>S!==h)})},g=h=>{n.active.includes(h)||i({...n,active:[...n.active,h]})},w=(h,S)=>{let _=S.target.closest(".todo-status-setting-row");if(_&&!_.classList.contains("locked"))return;let z=S.dataTransfer.getData("text/plain");bo.includes(z)&&(S.preventDefault(),h==="show"?g(z):c(z),u.cancel())},T=[Le("open"),Le("completed")];return o.createElement(m.ui.settings.Section,{title:l("todo.settings.statuses")},o.createElement("div",{className:"todo-status-settings"},o.createElement("p",{className:"todo-status-settings-desc"},l("todo.settings.statusesDesc")),o.createElement("span",{className:"todo-status-visibility-title"},l("todo.settings.statusesShow")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-show${u.activeId&&!n.active.includes(u.activeId)?" accepts-drop":""}`,onDragOver:h=>{h.preventDefault(),h.dataTransfer.dropEffect="move"},onDrop:h=>w("show",h)},T.map(h=>o.createElement("div",{className:"todo-status-setting-row locked",key:h.id},o.createElement("span",{className:"todo-status-setting-handle",title:l("todo.settings.statusLocked")},o.createElement(Ni,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ve,{status:h.id==="open"?null:h.id,dotCls:h.cls})),o.createElement("span",{className:"todo-status-setting-name"},l(h.labelKey)),o.createElement(e,{value:n.colors[h.id],onChange:S=>i({...n,colors:{...n.colors,[h.id]:S}}),ariaLabel:l("todo.settings.statusColor",{p0:l(h.labelKey)}),allowCustom:!1}),o.createElement("span",{className:"todo-status-setting-action","aria-hidden":"true"}))),s.map(h=>{let S=u.getHandleProps(h);return o.createElement("div",{className:"todo-status-setting-row"+(u.overId===h.id?" drop-"+(u.dropPosition??"before"):""),key:h.id,...u.getItemProps(h)},o.createElement("button",{...S,draggable:!0,className:(S.className??"")+" todo-status-setting-handle",title:l("todo.settings.statusReorder"),onDragStart:_=>{S.onDragStart?.(_),_.dataTransfer.setData("text/plain",h.id)}},o.createElement(ur,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ve,{status:h.id,dotCls:h.cls})),o.createElement("span",{className:"todo-status-setting-name"},l(h.labelKey)),o.createElement(e,{value:n.colors[h.id],onChange:_=>i({...n,colors:{...n.colors,[h.id]:_}}),ariaLabel:l("todo.settings.statusColor",{p0:l(h.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>c(h.id),ariaLabel:l("todo.settings.statusHide",{p0:l(h.labelKey)}),title:l("todo.settings.statusHide",{p0:l(h.labelKey)})},o.createElement(Ce,null)))})),o.createElement("span",{className:"todo-status-visibility-title"},l("todo.settings.statusesHide")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-hide${u.activeId&&n.active.includes(u.activeId)?" accepts-drop":""}`,onDragOver:h=>{h.preventDefault(),h.dataTransfer.dropEffect="move"},onDrop:h=>w("hide",h)},d.map(h=>{let S=u.getHandleProps(h);return o.createElement("div",{className:"todo-status-setting-row hidden"+(u.overId===h.id?" drop-"+(u.dropPosition??"before"):""),key:h.id,...u.getItemProps(h)},o.createElement("button",{...S,draggable:!0,className:(S.className??"")+" todo-status-setting-handle",title:l("todo.settings.statusReorder"),onDragStart:_=>{S.onDragStart?.(_),_.dataTransfer.setData("text/plain",h.id)}},o.createElement(ur,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ve,{status:h.id,dotCls:h.cls})),o.createElement("span",{className:"todo-status-setting-name"},l(h.labelKey)),o.createElement(e,{value:n.colors[h.id],onChange:_=>i({...n,colors:{...n.colors,[h.id]:_}}),ariaLabel:l("todo.settings.statusColor",{p0:l(h.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>g(h.id),ariaLabel:l("todo.settings.statusShow",{p0:l(h.labelKey)}),title:l("todo.settings.statusShow",{p0:l(h.labelKey)})},o.createElement(Xe,null)))}),!d.length&&o.createElement("span",{className:"todo-status-visibility-empty"},l("todo.settings.statusesHideEmpty"))),u.liveRegion))}function Ws(){let{Button:e,Row:t,Section:r,SelectField:n}=m.ui.settings,[a,i]=o.useState(Er);return o.createElement(o.Fragment,null,o.createElement(r,{title:l("todo.settings.display")},o.createElement(t,{title:l("todo.settings.dateBreakdown"),description:l("todo.settings.dateBreakdownDesc")},o.createElement(n,{className:"todo-date-breakdown-select",value:a,onChange:s=>{let d=s;i(d),m.settings.set(kn,d)},ariaLabel:l("todo.settings.dateBreakdown"),options:[{value:"monthly",label:l("todo.breakdown.monthly")},{value:"weekly",label:l("todo.breakdown.weekly")},{value:"daily",label:l("todo.breakdown.daily")}]}))),o.createElement(yu,null),o.createElement(r,{title:l("todo.settings.groups")},o.createElement(t,{title:l("todo.settings.groups"),description:l("todo.settings.groupsDesc")},o.createElement(e,{onClick:()=>{et()}},l("todo.settings.groups")))),o.createElement(vu,null))}var Br="reminder:",wu=3600*1e3,xu=e=>`${Br}${e}`;function Tu(e){if(!e.remindAt||e.reminderFiredAt||e.completed)return null;let t=/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/.exec(e.remindAt);if(!t)return null;let[,r,n,a,i,s]=t,d=new Date(Number(r),Number(n)-1,Number(a),i?Number(i):0,s?Number(s):0,0,0);return Number.isNaN(d.getTime())?null:d.getTime()}function ku(e,t){let r=[],n=[];for(let a of e){let i=Tu(a);i!==null&&(i<=t?r.push(a):n.push({todo:a,at:i}))}return{settled:r,upcoming:n}}function Su(e){return{title:e.title,body:e.note.trim().split(`
`)[0]||l("todo.reminderBody")}}var Ur=null,Ro=!1;async function Vn(){if(Ro)return;let e=be(),t;try{t=await rt(e),e.assertActive()}catch{return}if(Ro)return;let{settled:r,upcoming:n}=ku(t,Date.now());await e.api.notifications.cancelAll(Br);try{e.assertActive()}catch{return}if(!Ro){for(let{todo:a,at:i}of n)e.api.notifications.schedule(xu(a.id),[i],{eventId:"reminder",...Su(a)});for(let a of r)Xa(a.id)}}function Ys(){let e=be();Ro=!1,Vn();let t=mt(()=>{Vn()}),r=m.notifications.onAction(({key:n,action:a})=>{if(a!=="click"||!n.startsWith(Br))return;let i=n.slice(Br.length);rt(e).then(s=>{e.assertActive();let d=s.find(f=>f.id===i);d?.filePath?e.api.workspace.openFile(d.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})});return Ur=window.setInterval(()=>{Vn()},wu),()=>{Ro=!0,t(),r(),Ur!=null&&window.clearInterval(Ur),Ur=null}}var Hn=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),jn=e=>({type:"string",description:e});async function Un(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Xs(e){return Yr([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Hn({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await Un(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Hn({title:jn("Task title"),due:jn("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Un(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Hn({id:jn("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Un(e,"complete",{query:n},r)).title||n}".`}}])}function Du(e){Ca(e);let t=ra(e),r=na(),n=ya();os();let a=e.workspace.onOpenOwnLink(T=>{Fr(T)});e.registerView("todo.panel",js),e.registerView("todo.file",Us),e.registerView("todo.page",Bs),e.registerView("todo.settings",Ws);let i=ki(e),s=Ts(e),d=e.interop.services.provide(Zr,Xs(e)),f=Ci(),u=us(),c=ys(e),g=Ys(),w=Ja();return()=>{t(),i(),s(),d(),f(),u(),c(),g(),w(),a(),n(),r()}}var Eu={register:Du},Uy=Eu;export{Uy as default,Du as register};

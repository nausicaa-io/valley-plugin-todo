var jt="valley";var Oh=`.${jt}`,Mh=`app.${jt}`;function gp(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var hp=/^[a-zA-Z]:/;function gr(e){if(typeof e!="string")return"";let t=gp(e);return!t||t==="."||hp.test(t)||t.split("/").some(r=>r==="..")?"":t}function so(e){if(typeof e=="string")return gr(e)||void 0}var Ae=`.${jt}`,bp="plugins",hr=`${Ae}/${bp}`,dn=`${hr}/packages`,Gh=`${dn}/core`,Rh=`${dn}/github`,Fh=`${dn}/local`,$h=`${dn}/community`,Uh=`${hr}/community.json`,jh=`${hr}/data`;var Kh=`${hr}/enabled.json`,Vh=`${hr}/sources.json`,Bh=`${Ae}/state`,Ne=`${Ae}/settings`,Ws=`${Ae}/data`,Qa=`${Ae}/recovery`;var ei=`${Ae}/accounts`,Oo=`${Ae}/ai`,Hh=`${Oo}/connections.json`,Wh=`${Oo}/defaults.json`,qh=`${Oo}/budgets.json`,Yh=`${Oo}/usage.sqlite`,Xh=`${Oo}/security/guards.json`,Zh=`${Oo}/security/activity.sqlite`,Jh=`${ei}/providers`,Qh=`${ei}/providers.lock.json`,yp=`${Ae}/trash`,eb=`${yp}/items`,ti=`${Ae}/cache`,tb=`${ti}/accounts`,wp=`${ti}/search`,ob=`${ti}/providers`;var rb=`${wp}/index.jsonl`,nb=`${Qa}/drafts`,ab=`${Qa}/transactions`,ib=`${Qa}/retired`;var Kt="design",vp="themes",qs=`${Ae}/${Kt}/${vp}`,sb=`${qs}/local`,db=`${qs}/community`;var lb={app:`${Ne}/app.json`,appearance:`${Ae}/${Kt}/appearance.json`,"icon-rail":`${Ae}/${Kt}/icon-rail.json`,"footer-rail":`${Ae}/${Kt}/footer-rail.json`,"plugin-startup":`${Ae}/${Kt}/right-sidebar-startup.json`,"new-tab":`${Ae}/${Kt}/new-tab.json`,pallette:`${Ae}/${Kt}/palette.json`,group:`${Ws}/groups.json`,units:`${Ws}/units.json`,metadata:`${Ne}/file-viewers.json`,notification:`${Ne}/notification-types.json`,"notification-settings":`${Ne}/notification.json`,preferences:`${Ne}/preferences.json`,"link-actions":`${Ne}/link-actions.json`,markdown:`${Ne}/markdown.json`,editor:`${Ne}/editor.json`,"editor-vim":`${Ne}/editor-vim.json`,"markdown-todo":`${Ne}/markdown-todo.json`,"markdown-codeblocks":`${Ne}/markdown-codeblocks.json`,"markdown-template":`${Ne}/markdown-template.json`,"markdown-embeed":`${Ne}/markdown-embeed.json`,files:`${Ne}/file.json`,"file-sorter":`${Ne}/file-sorter.json`,search:`${Ne}/search.json`,"search-tag":`${Ne}/search-tag.json`,"search-content":`${Ne}/search-content.json`,design:`${Ae}/${Kt}/appearance.json`,accounts:`${ei}/connections.json`};var Ys=jt,Xs="open";var xp=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Zs=16384;var Js=new Set(["__proto__","prototype","constructor"]);function Qs(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function ln(e){let t=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Qs(i)>Zs)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let c=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!c&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(h=>typeof h=="string"&&Js.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(c){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(m,w)=>{let v=u[String(w)];return v&&"value"in v?n(v.value,s+1)??null:null})}let g={};for(let h of Object.keys(u).sort()){if(Js.has(h))throw new Error("Invalid bookmark state key");let m=u[h];if(!m.enumerable||!("value"in m)){r++;continue}let w=n(m.value,s+1);w!==void 0&&(g[h]=w)}return g}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Qs(JSON.stringify(a))>Zs)throw new Error("Bookmark state is too large");return a}function od(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=gr(e);if(!t)throw new Error("Invalid bookmark path");return t}function oi(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function ed(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function ri(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!xp.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=ln(t.state);return r.path!==void 0&&(r.path=od(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Tp=/^[A-Za-z0-9_-]{1,64}$/;function td(e,t){if(typeof e!="string"||!Tp.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function rd(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=oi(t.title,512,"title"),n={...t.description===void 0?{}:{description:oi(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:oi(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:td(t.group,"group")};if(t.groupId!==void 0){let c=td(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(t.target!==void 0){let c={folderPath:"",title:r,target:ri(t.target),...n,...a};return{...c,searchText:ed(c)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:od(t.folderPath),title:r,...n,...a};return{...s,searchText:ed(s)}}function lo(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++t>2048||s>32||!r(i)||typeof i.type!="string")return!1;let c=(...p)=>Object.keys(i).every(l=>l==="type"||p.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,s+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,s+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,l])=>n(p)&&a(l,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function cn(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,c,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return c===null;if(s.type==="literal")return c===s.value;if(s.type==="union")return s.anyOf.some(l=>i(l,c,p+1));if(s.type==="number")return typeof c=="number"&&Number.isFinite(c);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof c===s.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return s.type==="array"?Array.isArray(c)&&c.length<=(s.maxItems??1e5)&&c.every(l=>i(s.items,l,p+1)):s.type==="tuple"?Array.isArray(c)&&c.length>=(s.minItems??s.items.length)&&c.length<=s.items.length&&c.every((l,u)=>i(s.items[u],l,p+1)):s.type==="object"?Array.isArray(c)||s.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,u])=>Object.hasOwn(s.properties,l)?i(s.properties[l],u,p+1):s.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,t,0)}var kp=new Map;function ge(e,t,r,n,a,i,s,c,p="owner"){let l=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:s,serviceMetadata:c});return kp.set(`${t}:${e}@${r}`,l),l}var ai=256;function ii(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var re=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ye=(e,t)=>typeof e[t]=="function",co=e=>e===void 0,Mo=e=>typeof e=="boolean",ae=e=>typeof e=="string",je=e=>e===void 0||ae(e),Sp=e=>e===void 0||typeof e=="number",Ap=e=>e===void 0||typeof e=="boolean",me=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),_e=e=>re(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),nd=e=>re(e),id=e=>re(e)&&ae(e.id)&&ae(e.title)&&ae(e.date)&&(e.documentRef===void 0||re(e.documentRef)&&ae(e.documentRef.pluginId)&&ae(e.documentRef.sourceId)&&ae(e.documentRef.itemId)),Ep=e=>re(e)&&ae(e.date)&&je(e.startTime)&&je(e.endTime)&&je(e.sourceId)&&je(e.itemId),Cp=e=>re(e)&&ae(e.url)&&je(e.title)&&Ap(e.newTab),Dp=e=>re(e)&&ae(e.query),sd=e=>re(e)&&ae(e.name)&&je(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ip=e=>Array.isArray(e)&&e.every(sd),Np=e=>e===null||sd(e),Lp=e=>e===void 0||re(e)&&je(e.approvalToken)&&(e.cancellation===void 0||re(e.cancellation)),Pp=e=>typeof e=="string"||re(e)&&typeof e.text=="string",Op=e=>re(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&re(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&je(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),dd=e=>re(e)&&ae(e.id)&&ae(e.label)&&je(e.labelKey)&&je(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(dd)),ld={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(id)},create:{args:e=>me(e,[ae,nd]),result:Mo},update:{args:e=>me(e,[ae,nd]),result:Mo},remove:{args:e=>me(e,[ae]),result:Mo},open:{args:e=>me(e,[ae]),result:co},configure:{args:e=>e.length===0,result:co},actions:{args:e=>me(e,[ae]),result:e=>Array.isArray(e)&&e.every(dd)},runAction:{args:e=>me(e,[ae,ae]),result:Mo}},cd=e=>re(e)&&ae(e.name)&&ae(e.version)&&je(e.description)&&je(e.author)&&(e.localized===void 0||re(e.localized)&&Object.values(e.localized).every(t=>re(t)&&ae(t.name)&&je(t.description))),Mp=ge("calendar.itemSource","service","1.3.0","many",e=>re(e)&&ye(e,"list")&&(e.integration===void 0||cd(e.integration)),void 0,ld,e=>e.integration),un=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,ni=e=>typeof e=="string"&&e.length>0&&e.length<=8192,_p=e=>re(e)&&un(e.startDate)&&un(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=ai&&(e.cursor===void 0||ni(e.cursor)),zp=e=>re(e)&&ni(e.revision)&&(e.cursor===void 0||ni(e.cursor))&&Array.isArray(e.items)&&e.items.length<=ai&&e.items.every(t=>id(t)&&un(t.date)&&(t.endDate===void 0||un(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,_o=ge("calendar.itemSource","service","2.0.0","many",e=>re(e)&&ye(e,"list")&&(e.integration===void 0||cd(e.integration)),void 0,{...ld,list:{args:e=>me(e,[_p]),result:zp}},e=>e.integration),br=ge("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Gp=ge("calendar.navigator","service","1.0.0","one",e=>re(e)&&ye(e,"openDate"),void 0,{openDate:{args:e=>me(e,[Ep]),result:co}}),pn=ge("calendar.panelSelection","state","1.0.0","one",e=>re(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Rp=ge("web.activeContext","state","1.0.0","one",e=>re(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function ad(e){return re(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>re(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Fp=ge("contacts.directory","service","1.0.0","one",e=>re(e)&&["search","resolveEmails","open"].every(t=>ye(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(ad)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>re(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(ad))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||re(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:co}}),$p=ge("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Up=ge("web.navigator","service","1.0.0","one",e=>re(e)&&ye(e,"open"),void 0,{open:{args:e=>me(e,[Cp]),result:co}}),jp=ge("selection.textAction","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&ye(e,"run"),e=>[e.id]),Kp=ge("geo.navigator","service","1.0.0","one",e=>re(e)&&ye(e,"open"),void 0,{open:{args:e=>me(e,[Dp]),result:co}}),Vp=ge("geo.search","service","1.0.0","one",e=>re(e)&&ye(e,"search")&&ye(e,"reverse"),void 0,{search:{args:e=>me(e,[ae]),result:Ip},reverse:{args:e=>me(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Np}}),si=ge("agent.toolProvider","service","1.0.0","many",e=>re(e)&&Array.isArray(e.tools)&&e.tools.every(Op)&&ye(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>me(e,[ae,re,Lp]),result:Pp}},e=>({tools:e.tools}),"global"),Bp=ge("guard.runtime","service","1.0.0","one",e=>re(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>ye(e,t)),void 0,{resolve:{args:e=>me(e,[re]),result:re},requestApproval:{args:e=>me(e,[re]),result:Mo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&ae(e[0])&&je(e[1]),result:Mo},audit:{args:e=>me(e,[re]),result:co}}),Hp=ge("browser.automation","service","1.0.0","one",e=>re(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>ye(e,t)),void 0,{list:{args:e=>e.length===0,result:_e},open:{args:e=>me(e,[ae]),result:_e},switch:{args:e=>me(e,[ae]),result:_e},close:{args:e=>me(e,[ae]),result:_e},snapshot:{args:e=>me(e,[ae]),result:_e},readText:{args:e=>e.length>=1&&e.length<=2&&ae(e[0])&&Sp(e[1]),result:_e},readHtml:{args:e=>me(e,[ae]),result:_e},screenshot:{args:e=>me(e,[ae]),result:_e},click:{args:e=>me(e,[ae,t=>typeof t=="number"]),result:_e},type:{args:e=>e.length>=3&&e.length<=4&&ae(e[0])&&typeof e[1]=="number"&&ae(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:_e},select:{args:e=>me(e,[ae,t=>typeof t=="number",ae]),result:_e},scroll:{args:e=>me(e,[ae,t=>typeof t=="number",t=>typeof t=="number"]),result:_e},pressKey:{args:e=>me(e,[ae,ae]),result:_e},navigate:{args:e=>me(e,[ae,ae]),result:_e},back:{args:e=>me(e,[ae]),result:_e},forward:{args:e=>me(e,[ae]),result:_e},reload:{args:e=>me(e,[ae]),result:_e}}),Wp=ge("fileTree.contextItem","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.label=="string"&&je(e.labelKey)&&ye(e,"run"),e=>[e.id]),qp=ge("newTab.entry","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ye(e,"run"),e=>[e.id]),di=ge("search.resultAction","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&ye(e,"open"),e=>[e.cardKind]),Yp=ge("search.resultCard","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&ye(e,"render")&&ye(e,"open"),e=>[e.cardKind]),li=ge("metadataPanel.segment","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ye(e,"render"),e=>[e.id]),ci=ge("workspace.surface","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&ye(e,"getSnapshot")&&ye(e,"subscribe")&&ye(e,"restore"),e=>[e.id]),Xp=ge("metadata.plugin","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ye(e,"facts"),e=>[e.id]),Zp=ge("workspace.viewState","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&ye(e,"capture")&&ye(e,"restore")&&ye(e,"subscribe"),e=>[e.id]);var mn=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},ui=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),ud=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),pd=e=>ui(e)&&typeof e.surface=="string"&&ud.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function yr(e){let t=mn(e);if(!pd(t))throw new Error("Invalid bookmark descriptor");let r=ri({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=rd({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function pi(e){try{let t=yr(e),r=mn(e);return JSON.stringify(t.state)===JSON.stringify(ln(r.state))}catch{return!1}}function Jp(e){try{let t=mn(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:yr(t.bookmark)}}catch{}return{status:"invalid"}}var Qp=e=>{try{let t=mn(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&pi(t.bookmark)}catch{return!1}},em=e=>ui(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),md=ge("workspace.bookmark","service","1.0.0","many",e=>ui(e)&&typeof e.id=="string"&&ud.has(String(e.surface))&&lo(e.stateSchema)&&(e.itemStateSchema===void 0||lo(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&pd(e[0]),result:Qp,sanitizeResult:Jp},restore:{args:e=>e.length===1&&pi(e[0]),result:em}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function mi(e,t,r){if(!lo(r.stateSchema)||r.itemStateSchema!==void 0&&!lo(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,u,g=!1)=>cn(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,u)),i=(l,u,g)=>{let h=g?void 0:r.primary?r.primary(l):l.item,m=ln(h?.state??l.view);if(!a(m,u,!!h))throw new Error("Invalid bookmark state");return yr({...u,title:h?.title??l.title,description:r.description(l,!!h),state:m,...h?{itemId:h.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=yr(l),!a(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(md,s),p;try{p=e.interop.extensions.provide(ci,{...t,getSnapshot(l){let u=t.getSnapshot(l),g={surface:t.surface,...l===void 0?{}:{instanceId:l}},h,m;try{h=i(u,g,!1)}catch{}try{m=i(u,g,!0)}catch{}return{...u,bookmark:h,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,p(),c()}}var wr=e=>!!e&&typeof e=="object"&&!Array.isArray(e),fd=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function gd(e){if(!wr(e)||!fd(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!wr(r)||!fd(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!wr(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!wr(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!wr(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var fi=ge("workspace.details","extension","1.0.0","many",gd,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Fb=[Ae,`${Ae}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var oy=1024*1024;var ay=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var iy=globalThis.Buffer;var om=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,fn=new Map,gn;function ve(){return gn}function hn(e,t){let r=fn.get(e)??new Set;return r.add(t),fn.set(e,r),()=>{r.delete(t),r.size||fn.delete(e)}}function hd(e){gn?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return gn={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},gn.dispose}var rm=1800;function zo(e){let t=ze();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=u=>{if(u.mode==="create")return;i=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,h=()=>{if(r=null,i!==u.nonce)return;let m=[...fn.get(u.todoId)??[]].find(w=>w.isConnected);if(!m){Date.now()<g?r=setTimeout(h,40):t.get()?.nonce===u.nonce&&t.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(s,rm),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(h,0)},p=t.subscribe(()=>{let u=t.get();u&&c(u)}),l=t.get();return l&&c(l),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function ze(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function bd(){ze().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var yd=`
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
}

`;var wd=`/* \u2500\u2500 Todo panel (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

.todo-compose {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr) 22px;
  gap: 4px 8px;
  margin: 8px;
  padding: 10px 10px 8px;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  min-width: 0;
}
.todo-compose-circle { width: 16px; height: 16px; border: 1.5px solid var(--text-tertiary); border-radius: 50%; margin-top: 5px; }
.todo-compose > input, .todo-compose > textarea, .todo-compose-tags > input {
  min-width: 0; width: 100%; padding: 3px 0; border: 0; outline: none;
  box-shadow: none; background: transparent; color: var(--text-color);
  font: inherit; font-size: var(--small-font-size); line-height: 1.4;
  border-radius: 0;
}
.todo-compose > input:focus, .todo-compose > textarea:focus, .todo-compose-tags > input:focus { outline: none !important; box-shadow: none !important; }
.todo-compose input::placeholder, .todo-compose textarea::placeholder { color: var(--text-tertiary); }
.todo-compose > .todo-compose-title { grid-column: 2; font-size: var(--font-size); }
.todo-compose-cancel { grid-column: 3; grid-row: 1; }
.todo-compose-note, .todo-compose-tags, .todo-compose-schedule, .todo-compose-controls, .todo-compose-location, .todo-compose-attachments, .todo-compose-error { grid-column: 1 / -1; min-width: 0; }
.todo-compose > .todo-compose-note { resize: none; overflow-y: auto; max-height: 100px; }
.todo-compose-tags, .todo-compose-attachments { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; }
.todo-compose-tags > input { flex: 1 1 80px; width: 80px; }
.todo-compose-token { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; min-height: 24px; box-sizing: border-box; padding: 3px 3px 3px 7px; border-radius: var(--radius-sm); background: var(--hover-bg); color: var(--text-secondary); font-size: var(--small-font-size); }
.todo-compose-token > span { min-width: 0; overflow-wrap: anywhere; }
.todo-compose-token > button { display: grid; place-items: center; flex: 0 0 18px; width: 18px; height: 18px; padding: 0; border: 0; border-radius: 3px; color: var(--text-tertiary); background: transparent; cursor: pointer; }
.todo-compose-token > button:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-compose-token svg { width: 12px; height: 12px; flex-shrink: 0; }
.todo-compose-attachment > span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.todo-compose-schedule { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 116px), 1fr)); gap: 6px; }
.todo-compose-date-field, .todo-compose-time-field { width: 100%; min-width: 0; height: 30px; border: 1px solid var(--border-light); background: transparent; border-radius: var(--radius-sm); box-sizing: border-box; }
.todo-compose-date-field .date-field-input, .todo-compose-time-field .time-field-input { min-width: 0; font-size: var(--small-font-size); }
.todo-compose-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 2px; margin-top: 4px; padding-top: 8px; border-top: 1px solid var(--border-light); }
/* Folded details: each chip shows its value once set and opens its field on click. */
.todo-compose-controls .todo-compose-chip { min-height: 26px; padding: 4px 6px; color: var(--text-tertiary); }
.todo-compose-controls .todo-compose-chip.has-value { color: var(--text-color); }
.todo-compose-controls .todo-compose-chip[aria-pressed='true']:not(.todo-compose-flag) { background: var(--hover-bg); color: var(--text-color); }
.todo-compose-controls .todo-compose-flag[aria-pressed='true'] { color: var(--color-yellow); background: transparent; }
.todo-compose-controls .todo-compose-chip > span { max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-compose-schedule, .todo-compose-location, .todo-compose-attachments { margin-top: 2px; }
.todo-compose-chip, .todo-compose-submit, .todo-compose-attach {
  min-height: 28px; padding: 5px 7px; display: inline-flex; gap: 5px; align-items: center; justify-content: center;
  border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary);
  font: inherit; font-size: var(--small-font-size); cursor: pointer;
}
.todo-compose-chip:hover, .todo-compose-attach:hover { background: var(--hover-bg); }
.todo-compose-chip svg, .todo-compose-attach svg { width: 14px; height: 14px; flex-shrink: 0; }
.todo-compose-chip[aria-pressed='true'] { color: var(--color-yellow); background: var(--hover-bg); }
.todo-compose-submit { margin-left: auto; padding-inline: 12px; background: var(--accent-color); color: var(--accent-button-text); }
.todo-compose button:disabled { opacity: 0.4; cursor: default; }
.todo-compose-error { color: var(--negative-color-highlight); font-size: var(--small-font-size); }
.todo-location-input-slot { flex: 1 1 0; min-width: 0; }
.todo-location-input.resource-picker { width: 100%; min-width: 0; }
.todo-location-input .resource-picker-field, .todo-compose-attachment-picker .resource-picker-field { min-height: 30px; box-sizing: border-box; padding: 0 8px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); background: transparent; gap: 6px; }
.todo-location-input .resource-picker-field input, .todo-compose-attachment-picker .resource-picker-field input,
.todo-location-input .resource-picker-field input:focus, .todo-compose-attachment-picker .resource-picker-field input:focus { width: 100%; min-width: 0; border: 0 !important; outline: 0 !important; box-shadow: none !important; background: transparent; padding: 4px 0; font: inherit; color: var(--text-color); }
.todo-location-input .resource-picker-field > svg, .todo-compose-attachment-picker .resource-picker-field > svg { width: 14px; height: 14px; flex-shrink: 0; }
.todo-active-navigation { padding-bottom: 64px; }

`;var vd=`/* \u2500\u2500 Swipe \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

.todo-list-rows {
  display: flex;
  flex-direction: column;
}

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

`;var xd=`/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Flat, not cards: a check, a text column, an action cluster. The separator
   is indented to the text column (Reminders/Mail idiom) so the checks read
   as one vertical rail rather than each row as its own box. Per-row borders
   made a dense sidebar look like a stack of receipts. */
.todo-row {
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
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

.todo-row:hover, .todo-swipe:has(:hover) .todo-row {
  background: var(--hover-bg);
}

.todo-row-navigable {
  cursor: pointer;
  user-select: none;
}

.todo-row.completed h4,
.todo-row.completed .todo-notes {
  color: var(--text-tertiary);
}

/* Which statuses strike their title through is a per-status setting; the
   rules come from startStatusVocabulary. */

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

.todo-check:hover:not([aria-disabled='true']) {
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

.todo-row-main { display: contents; }

.todo-row-main > * {
  grid-column: 2 / -1;
  min-width: 0;
}

.todo-row-main h4 {
  grid-column: 2;
  grid-row: 1;
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
  grid-column: 3;
  grid-row: 1;
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

.todo-notes .md-task-control { display: inline-flex; vertical-align: middle; }
.todo-notes .md-task-icon { display: none; }
.todo-notes .md-task-checkbox { accent-color: var(--accent-color); cursor: pointer; }
.todo-notes [data-task-strikethrough='true'] > .md-task-text { text-decoration: line-through; }
.todo-notes img { max-width: 100%; max-height: 64px; }

.todo-view-meta {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  row-gap: 4px;
  margin-top: 3px;
}

/* Fixed lines instead of one wrapping run: a wrapped run put the date, the
   group and the status somewhere else in every row. First line: date, time,
   reminder, group. Second: status, priority, place. Third: tags. Each line stays on one
   line; the items that can be long (group, place) give way with an ellipsis. */
.todo-meta-line {
  display: flex;
  align-items: center;
  column-gap: 10px;
  min-width: 0;
  overflow: clip;
  overflow-clip-margin: 3px;
}

.todo-meta-cluster {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  column-gap: 10px;
}

.todo-meta-cluster > .todo-date + .todo-clock-text {
  margin-left: -4px;
}

.todo-meta-ellipsis {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* The group follows the date on the first line and gives way with an ellipsis
   when a time and a reminder crowd it. */
.todo-meta-when > .todo-group-text {
  flex: 0 1 auto;
  min-width: 0;
}

.todo-meta-details > * {
  flex: 0 0 auto;
}

.todo-meta-details > .todo-location-meta {
  flex: 0 1 auto;
  min-width: 0;
}

.todo-meta-tags {
  flex-wrap: wrap;
  column-gap: 4px;
  row-gap: 4px;
  margin-top: 1px;
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

`;var Td=`/* edit mode */
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

`;var kd=`/* \u2500\u2500 Todo: confirm delete \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var Sd=`/* \u2500\u2500 To-Do page (main_workspace \u2014 Things-style sections) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
  gap: var(--space-2);
  height: var(--app-bar-height);
  box-sizing: border-box;
  flex: 0 0 auto;
  min-width: 0;
  /* No extra gap before the host \u22EF: its slot already carries the button spacing. */
  padding: 0 var(--plugin-actions-offset, 0px) 0 calc(var(--plugin-navigation-offset, 0px) + 10px);
  border-bottom: 1px solid var(--border-light);
  background: var(--surface-color-alt);
}
.todo-page-appbar-spacer { flex: 1 1 auto; min-width: 0; }
.todo-page-appbar-title {
  flex: 0 0 auto;
  min-width: 0;
  max-width: 30%;
  margin: 0 var(--space-1) 0 0;
  overflow: hidden;
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-semi-bold);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-page-appbar .todo-search-wrap {
  flex: 0 1 240px;
  min-width: 120px;
}
.todo-page-appbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
  flex-shrink: 0;
}
.todo-page-appbar-btn {
  display: grid;
  place-items: center;
  width: var(--search-field-height, 26px);
  height: var(--search-field-height, 26px);
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
.todo-page-appbar-btn.active {
  background: var(--accent-tint-bg);
  color: var(--title-color);
}
.todo-page-appbar-btn:focus-visible,
.todo-page-date-filter:focus-visible,
.todo-table-sort:focus-visible,
.todo-table-cell-btn:focus-visible,
.todo-table-page-btn:focus-visible,
.todo-table-page-size:focus-visible,
.todo-table-bulk:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -1px;
}
.todo-page-appbar-btn svg,
.todo-page-appbar-btn .todo-status-menu-svg { width: 16px; height: 16px; }

.todo-page-date-filter {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  flex-shrink: 0;
  height: var(--search-field-height, 26px);
  box-sizing: border-box;
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--accent-tint-bg);
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
  cursor: pointer;
}
.todo-page-date-filter svg { width: 13px; height: 13px; }
.todo-table-menu-label {
  padding: 4px var(--space-2);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
}
.todo-filter-clear { grid-template-columns: minmax(0, 1fr); justify-items: center; }

/* \u2500\u2500 Task table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.todo-table-shell {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
/* Edge to edge: the table is the page, not a card on it. It takes the free
   height so the footer bar stays on the bottom edge however few rows show. */
.todo-table-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}
.todo-table {
  width: 100%;
  min-width: 420px;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
}
.todo-table th {
  position: sticky;
  top: 0;
  z-index: 1;
  height: var(--app-bar-height);
  box-sizing: border-box;
  padding: 0 6px;
  border-bottom: 1px solid var(--border-light);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  text-align: left;
  white-space: nowrap;
}
/* A row is exactly 37px, its 1px line included. */
.todo-table td {
  height: 37px;
  box-sizing: border-box;
  padding: 0 6px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
  white-space: nowrap;
}
.todo-table th:first-child,
.todo-table td:first-child { padding-left: 10px; }
.todo-table th:last-child,
.todo-table td:last-child { padding-right: 6px; }
.todo-table-row { cursor: default; outline: none; user-select: none; }
.todo-table-row:hover td { background: var(--hover-bg); }
.todo-table-row.selected td { background: var(--accent-tint-bg); }
.todo-table-row:focus-visible td { box-shadow: inset 0 1px 0 var(--accent-color), inset 0 -1px 0 var(--accent-color); }
.todo-table-row.todo-reveal-target td { animation: todo-reveal-pulse 1.8s var(--ease-out); }

.todo-table-select { width: 34px; padding-right: 0 !important; }
.todo-table-note { width: 30%; }
.todo-table-group { width: 124px; }
.todo-table-status { width: 124px; }
.todo-table-priority { width: 100px; }
.todo-table-due { width: 140px; }
.todo-table-location { width: 140px; }
.todo-table-tags { width: 120px; }
.todo-table-actions { width: 52px; text-align: right; }
.todo-table-select .todo-check-wrap { display: grid; height: 18px; }
.todo-table-select .todo-check,
.todo-table-select .todo-check-glyph { margin: 0; }

.todo-table-sort {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  max-width: calc(100% + 12px);
  height: 24px;
  margin-left: -6px;
  padding: 0 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.todo-table-sort > span { overflow: hidden; text-overflow: ellipsis; }
.todo-table-sort:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-table-sort.active { color: var(--title-color); }
.todo-table-sort svg { flex-shrink: 0; width: 12px; height: 12px; }
.todo-table-sort:not(.active) > svg { opacity: 0.35; }
.todo-table-sort:not(.active):hover > svg { opacity: 0.8; }

.todo-table-title-text,
.todo-table-note-text,
.todo-table-group-name {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-table-title-text {
  color: var(--title-color, var(--text-color));
  font-weight: var(--font-medium);
}
.todo-table-note-text {
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
}
.todo-table-title-text p { display: inline; margin: 0; }
.todo-table-row.completed .todo-table-title-text { color: var(--text-secondary); }
.todo-table-group .todo-group-text { max-width: 100%; }
.todo-table-tags { text-overflow: ellipsis; }
.todo-table .todo-table-tags .todo-table-edit-btn { display: block; line-height: 28px; text-overflow: ellipsis; }
.todo-table-tag {
  margin-right: var(--space-1);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
}
.todo-table-flag {
  display: inline-grid;
  margin-right: 2px;
  color: var(--color-orange);
  vertical-align: middle;
}
.todo-table-flag svg { width: 13px; height: 13px; }

.todo-table-cell-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100% + 12px);
  height: 24px;
  margin-left: -6px;
  padding: 0 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font-family: inherit;
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: pointer;
}
.todo-table-cell-btn > span { overflow: hidden; text-overflow: ellipsis; }
/* The row and cell an open editor belongs to, so it is clear what the popover edits. */
/* Editing an existing row uses the new row's blue, so a row being edited always looks the same. */
.todo-table-row.is-editing td { background: color-mix(in srgb, var(--accent-color) 6%, transparent); }
.todo-table td.is-editing { box-shadow: inset 0 0 0 1px var(--accent-color); border-radius: 0; }
.todo-table-placeholder { display: inline-flex; align-items: center; gap: 6px; min-width: 0; color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-placeholder svg { flex: 0 0 auto; width: 13px; height: 13px; }
.todo-table-placeholder > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-table-cell-btn:disabled { cursor: default; opacity: 0.6; }
.todo-table-cell-btn.is-overdue { color: var(--negative-color); }
.todo-table-cell-btn svg,
.todo-table-cell-btn .todo-status-menu-dot { flex-shrink: 0; }
.todo-table-cell-btn svg { width: 13px; height: 13px; }
.todo-table-cell-btn .todo-status-menu-svg,
.todo-table-priority-icon { width: 14px; height: 14px; }
/* Normal priority is the absence of one: nothing at rest, a target on hover. */
.todo-table-cell-btn.muted { color: var(--text-tertiary); opacity: 0; }
.todo-table-row:hover .todo-table-cell-btn.muted,
.todo-table-cell-btn.muted:focus-visible { opacity: 1; }
.todo-table-time { color: var(--text-secondary); }
.todo-table-actions .todo-menu-wrap { display: inline-flex; vertical-align: middle; }
.todo-table-actions .todo-menu-btn { width: 24px; height: 24px; opacity: 0; }
.todo-table-row:hover .todo-menu-btn,
.todo-table-row:focus-within .todo-menu-btn,
.todo-table-actions .todo-menu-btn.active { opacity: 1; }
.todo-table-empty {
  height: 96px !important;
  color: var(--text-tertiary);
  text-align: center;
}

/* The bottom bar mirrors the header grid: 37px content + a 1px line. Plain
   text and ghost icons, like the rest of Valley's bars. */
.todo-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex: 0 0 auto;
  height: var(--app-bar-height);
  box-sizing: border-box;
  padding: 0 6px 0 10px;
  border-top: 1px solid var(--border-light);
  background: var(--surface-color-alt);
  overflow: hidden;
  white-space: nowrap;
  color: var(--text-secondary);
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
}
.todo-table-selection {
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  gap: var(--space-1);
  min-width: 0;
}
.todo-table-bulk {
  height: 24px;
  padding: 0 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  cursor: pointer;
}
.todo-table-bulk:hover { background: var(--hover-bg); }
.todo-table-bulk.danger { color: var(--negative-color); }
.todo-table-pagination {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}
.todo-table-page-size {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 24px;
  box-sizing: border-box;
  padding: 0 var(--space-1) 0 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.todo-table-page-size:hover { background: var(--hover-bg); }
.todo-table-page-size svg { width: 12px; height: 12px; color: var(--text-tertiary); }
.todo-table-page { font-variant-numeric: tabular-nums; }
.todo-table-pager { display: flex; }
.todo-table-page-btn {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}
.todo-table-page-btn svg { width: 14px; height: 14px; }
.todo-table-page-btn:hover:not(:disabled) { background: var(--hover-bg); color: var(--title-color); }
.todo-table-page-btn:disabled { opacity: 0.4; cursor: default; }

@media (max-width: 640px) {
  .todo-page-appbar .todo-search-wrap { flex-basis: 140px; min-width: 96px; }
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

`;var Ad=`/* \u2500\u2500 Detail modal body (api.ui.Modal, bodyClassName) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The host owns the frame, the backdrop, the header and the footer (.modal);
   this only lays out the body. Two columns \u2014 what the todo says on the left,
   what it is on the right \u2014 collapsing to one when the modal is narrow. */
.todo-detail-content { display: flex; flex-direction: column; gap: var(--space-3); min-width: 0; overflow-anchor: none; font-size: var(--small-font-size); }
.todo-detail-footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-2); width: 100%; }
.todo-detail-footer > button { min-height: 30px; padding: 5px 12px; border: 0; border-radius: var(--radius-sm); font: inherit; font-size: var(--small-font-size); cursor: pointer; }
.todo-detail-footer > .btn-primary { background: var(--accent-color); color: var(--accent-button-text); }
.todo-detail-footer > .todo-detail-delete { background: transparent; color: var(--negative-color-highlight); }
.todo-detail-footer > .todo-detail-delete:hover { background: var(--hover-bg); }

.todo-detail-cols {
  flex-shrink: 0;
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
  flex-shrink: 0;
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

.todo-detail-note-input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 140px;
  padding: 10px;
  resize: vertical;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: var(--body-color);
  color: var(--text-color);
  font: inherit;
  line-height: 1.5;
  outline: none;
}
.todo-detail-note-input:focus { border-color: var(--border-medium); box-shadow: none; }


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

.todo-detail-rail .todo-detail-field,
.todo-detail-rail .todo-detail-row {
  min-height: 30px;
}

.todo-detail-rail .todo-detail-field {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 10px;
}

.todo-detail-rail .todo-detail-field > :not(.todo-detail-label) {
  min-width: 0;
  width: 100%;
  max-width: 100%;
}

.todo-detail-select.select-field,
.todo-detail-combo.combo-field,
.todo-detail-inline-date.date-field,
.todo-detail-time-input.time-field {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  min-height: 30px;
  font-size: var(--small-font-size);
}

.todo-detail-priority {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  height: 30px;
  overflow: hidden;
  border: 1px solid var(--control-border);
  border-radius: var(--control-radius);
  background: var(--control-bg);
}
.todo-detail-priority > button {
  min-width: 0;
  padding: 0 5px;
  border: 0;
  border-right: 1px solid var(--control-border);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  cursor: pointer;
}
.todo-detail-priority > button:last-child { border-right: 0; }
.todo-detail-priority > button:hover { background: var(--hover-bg); }
.todo-detail-priority > button[aria-pressed="true"] { background: var(--accent-soft-bg); color: var(--accent-color); }
.todo-detail-priority > button:focus-visible { outline: 2px solid var(--accent-color); outline-offset: -2px; }
.todo-detail-times {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.todo-detail-time {
  display: grid;
  gap: 6px;
  min-width: 0;
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

.todo-location-hit:hover,
.todo-location-hit.is-active {
  background: var(--hover-bg);
}
.todo-location-hit-name { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
.todo-location-hit-name svg { flex: 0 0 auto; width: 12px; height: 12px; color: var(--text-tertiary); }
.todo-location-hit-context { padding-left: 18px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-location-status { padding: 5px var(--space-2); color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-location-field {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  gap: 6px;
  min-width: 0;
  min-height: 30px;
  padding: 0 8px;
  box-sizing: border-box;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
}
.todo-location-field:focus-within { border-color: var(--accent-color); }
.todo-location-field-icon { flex: 0 0 auto; width: 14px; height: 14px; color: var(--text-tertiary); }
.todo-location-field-input,
.todo-location-field-input:focus,
.todo-location-field-input:focus-visible {
  appearance: none;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  padding: 4px 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
}
.todo-location-field-input::placeholder { color: var(--control-placeholder); }

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
  padding: 4px 6px;
  margin-left: -6px;
  border: none;
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
.todo-detail-add svg { width: 13px; height: 13px; }
`;var Ed=`/* \u2500\u2500 Edit sheet: one column, title, notes, then every property as a chip \u2500\u2500 */
.todo-sheet { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.todo-sheet-head { display: flex; align-items: center; gap: 10px; }
.todo-sheet-status {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.todo-sheet-status .todo-status-menu-svg, .todo-sheet-status .todo-status-menu-dot { width: 20px; height: 20px; }
.todo-sheet-status:hover { background: var(--hover-bg); }
.todo-sheet-title,
.todo-sheet-title:focus,
.todo-sheet-title:focus-visible {
  flex: 1 1 auto;
  min-width: 0;
  padding: 2px 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: var(--title-color);
  font: inherit;
  font-size: 1.15rem;
  font-weight: var(--font-semibold, 600);
}
.todo-sheet-flag {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-sheet-flag:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-sheet-flag.on { color: var(--color-orange); }
.todo-sheet-flag svg { width: 15px; height: 15px; }
.todo-sheet-notes,
.todo-sheet-notes:focus,
.todo-sheet-notes:focus-visible {
  field-sizing: content;
  box-sizing: border-box;
  width: 100%;
  min-height: 56px;
  max-height: 260px;
  margin: 0;
  padding: 0 0 0 34px;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  line-height: 1.55;
  resize: none;
}
.todo-sheet-notes::placeholder { color: var(--text-tertiary); }
.todo-sheet .todo-detail-note-links { margin: 0; padding-left: 34px; }
.todo-sheet-chips { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 4px; border-top: 1px solid var(--border-light); padding-top: 12px; }
.todo-sheet-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 28px;
  padding: 0 10px;
  border: none;
  border-radius: 14px;
  background: var(--hover-bg);
  color: var(--text-color);
  font: inherit;
  font-size: var(--smaller-font-size);
  white-space: nowrap;
  cursor: pointer;
}
.todo-sheet-chip:hover { background: var(--active-bg, var(--hover-bg)); color: var(--title-color); }
.todo-sheet-chip > span:last-child { overflow: hidden; text-overflow: ellipsis; }
.todo-sheet-chip svg, .todo-sheet-chip .todo-status-menu-svg { flex: 0 0 auto; width: 14px; height: 14px; }
.todo-sheet-chip.is-empty { background: transparent; color: var(--text-tertiary); box-shadow: inset 0 0 0 1px var(--border-light); }
.todo-sheet-chip.is-empty:hover { color: var(--text-color); background: var(--hover-bg); box-shadow: none; }
.todo-sheet-chip.is-overdue { color: var(--negative-color); }
.todo-sheet-dot { flex: 0 0 auto; width: 8px; height: 8px; border-radius: 50%; background: var(--text-tertiary); }
.todo-tags-input.is-bare { min-height: 0; padding: 0; border: none; background: transparent; }
.todo-sheet-section { display: flex; flex-direction: column; gap: 6px; }
.todo-sheet-adds { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 8px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.todo-sheet-adds .todo-detail-add { margin-left: 0; }
.todo-sheet-activity { margin-left: auto !important; }
.todo-notes.is-plain { white-space: pre-wrap; overflow-wrap: anywhere; }
.todo-sheet-cancel { margin-left: auto; background: transparent !important; color: var(--text-color); box-shadow: inset 0 0 0 1px var(--border-medium); }
.todo-sheet-cancel:hover { background: var(--hover-bg) !important; }
.todo-sheet-notes-wrap { position: relative; }
.todo-sheet-notes-view { min-height: 24px; padding: 0 36px 0 34px; font-size: var(--small-font-size); cursor: text; }
.todo-sheet-notes-view .todo-notes { color: var(--text-color); }
.todo-sheet-notes-view .todo-notes img { max-width: 100%; border-radius: var(--radius-sm); }
.todo-sheet-notes-wrap .todo-sheet-notes { padding-right: 36px; }
.todo-sheet-notes-toggle {
  position: absolute;
  top: -2px;
  right: 0;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-sheet-notes-toggle:hover, .todo-sheet-notes-toggle.on { background: var(--hover-bg); color: var(--text-color); }
.todo-sheet-notes-toggle svg { width: 14px; height: 14px; }
.todo-sheet-muted { margin-left: auto; color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-sheet-delete {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid color-mix(in srgb, var(--negative-color) 45%, transparent);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--negative-color) 10%, transparent);
  color: var(--negative-color);
  font: inherit;
  font-size: var(--small-font-size);
  cursor: pointer;
}
.todo-sheet-delete:hover { background: var(--negative-color); border-color: var(--negative-color); color: #fff; }
.todo-sheet-delete svg { width: 14px; height: 14px; }
.todo-file-search { display: flex; flex-direction: column; gap: 4px; }
.todo-file-search-cancel { display: inline-grid; place-items: center; flex: 0 0 auto; width: 22px; height: 22px; padding: 0; border: none; border-radius: var(--radius-sm); background: transparent; color: var(--text-tertiary); cursor: pointer; }
.todo-file-search-cancel:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-file-search-cancel svg { width: 12px; height: 12px; }
.todo-file-search-hits { display: flex; flex-direction: column; margin: 0; padding: 2px; list-style: none; border: 1px solid var(--border-light); border-radius: var(--radius-sm); }
.todo-file-search-hit { display: flex; align-items: center; gap: 8px; width: 100%; padding: 5px 8px; border: none; border-radius: var(--radius-sm); background: none; color: var(--title-color); font: inherit; text-align: left; cursor: pointer; }
.todo-file-search-hit:hover, .todo-file-search-hit.is-active { background: var(--hover-bg); }
.todo-file-search-glyph { flex: 0 0 auto; width: 15px; height: 15px; color: var(--text-tertiary); }
.todo-file-search-text { display: flex; flex-direction: column; min-width: 0; }
.todo-file-search-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--small-font-size); }
.todo-file-search-folder { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-tertiary); font-size: var(--smaller-font-size); }
/* Attachments as compact two-column tiles: thumbnail or glyph first, name over kind. */
.todo-sheet-attachments { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 6px; }
.todo-sheet-attachments .todo-attach-open { flex-direction: row-reverse; justify-content: flex-end; gap: 10px; padding: 6px 8px; border-radius: var(--radius); }
.todo-sheet-attachments .todo-attach-thumb { width: 30px; height: 30px; border-radius: 4px; }
.todo-sheet-attachments .todo-attach-name { font-size: var(--small-font-size); }
.todo-sheet-attachments .todo-attach-meta { font-size: var(--smaller-font-size); }
.todo-sheet-attachments > .todo-file-search { grid-column: 1 / -1; }
/* In the tiles the remove button sits inside the tile, at its right, so the sheet never clips it. */
.todo-sheet-attachments .todo-attach-open { padding-right: 34px; }
.todo-sheet-attachments .todo-attach-remove {
  top: 50%;
  right: 6px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  transform: translateY(-50%);
}
.todo-sheet-attachments .todo-attach-remove:hover { background: var(--hover-bg); color: var(--negative-color); }
.todo-sheet-attachments .todo-attach-remove svg { width: 12px; height: 12px; }
.todo-sheet .todo-detail-url-card .todo-detail-url-open > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-detail-footer > .todo-sheet-delete { margin-right: auto; }
.todo-detail-footer > .todo-sheet-cancel { margin-left: 0; }
.todo-sheet-times { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.todo-cell-editor > [data-plugin-widget], .todo-sheet-times > [data-plugin-widget] { width: 100% !important; }
/* Links the note points at, as quiet chips under the notes. */
.todo-detail-note-links { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
.todo-detail-note-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  height: 24px;
  padding: 0 8px;
  border: none;
  border-radius: 12px;
  background: var(--hover-bg);
  color: var(--accent-color);
  font: inherit;
  font-size: var(--smaller-font-size);
  cursor: pointer;
}
.todo-detail-note-link:hover { color: var(--title-color); }
.todo-detail-note-link svg { flex: 0 0 auto; width: 12px; height: 12px; }
.todo-detail-note-link > span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-detail-location { align-items: start; }
.todo-detail-location > .todo-detail-label { display: flex; align-items: center; min-height: 30px; }
.todo-detail-location > .todo-location { flex: 1 1 auto; min-width: 0; }

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

`;var Cd=`/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   The five smart lists, then the groups behind a disclosure. Replaces the
   horizontal chip bar, which asked "which list" and "which due window" as one
   question with one answer and cost up to three wrapped rows of chrome above
   the first todo at 245px. A column has room for counts and cannot wrap.

   Ported from the Contacts panel (contacts/src/styles.ts) \u2014 copied, never
   imported: a plugin may not reach into another plugin, and the two panels
   looking alike is the point. */


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
  font-weight: var(--font-semi-bold);
}

.todo-smart-grid .todo-tree-label {
  grid-column: 1 / -1;
  grid-row: 2;
  color: inherit;
  font-size: var(--normal-font-size);
  font-weight: var(--font-semi-bold);
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
  font-weight: var(--font-semi-bold);
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
  color: var(--title-color);
}
.todo-tree-row.active .todo-tree-count { color: var(--title-color); }

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


/* A subgroup sits indented under its group, in My Lists and the group filter. */
.todo-tree-row.todo-subgroup .todo-tree-dot,
.todo-group-filter-row.todo-subgroup .todo-tree-dot {
  margin-left: 14px;
}

/* A row of the sidebar's Groups list. The row is its own drag handle. Every row
   keeps a slot for the fold chevron at its left, inside the row and its hover,
   so the dots of groups with and without subgroups line up; a subgroup sits one
   step further in. The insertion line is the shared one, centred in the 2px row
   gap and indented when the group lands as a subgroup. */
.todo-group-nav-row {
  position: relative;
}
.todo-navigation-groups .todo-group-nav-row .todo-tree-row {
  padding-left: 24px;
}
.todo-group-toggle {
  position: absolute;
  top: 50%;
  left: 4px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: var(--text-tertiary);
  transform: translateY(-50%);
  cursor: pointer;
}
/* The chevron lies over the row, so hovering it lights the whole row like the rest of it. */
.todo-group-toggle:hover { color: var(--title-color); }
.todo-group-nav-row:has(.todo-group-toggle:hover) > .todo-tree-row:not(.active) {
  background: var(--hover-bg);
  color: var(--text-color);
}
.todo-group-toggle svg { width: 14px; height: 14px; }
/* The title with expand all / collapse all at the far end, like the Files header. */
.todo-navigation-groups-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  min-height: var(--shell-control-toolbar);
  padding: 0 2px 4px 7px;
}
.todo-navigation-groups-head .todo-navigation-groups-title {
  padding: 0;
}
.todo-group-nav-row.drop-before::before,
.todo-group-nav-row.drop-after::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  height: var(--drop-knob);
  margin: 0;
  background: var(--drop-indicator-fill);
  pointer-events: none;
}
.todo-group-nav-row.drop-before::before { top: -1px; transform: translateY(-50%); }
.todo-group-nav-row.drop-after::before { bottom: -1px; transform: translateY(50%); }
.todo-group-nav-row.drop-nested::before { left: 38px; }
`;var Dd=`/* \u2500\u2500 Group editor popovers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var Id=`/* \u2500\u2500 Filter surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.todo-date-breakdown-select { width: 150px; }

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
.todo-filter-direction:hover { background: var(--hover-bg); }

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
  grid-template-columns: 16px minmax(0, 1fr) 14px;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 30px;
  padding: 0 8px 0 6px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}

.todo-status-filter-option.all { grid-template-columns: minmax(0, 1fr) 14px; }
.todo-status-filter-option:hover { background: var(--hover-bg); }
.todo-status-filter-option:focus-visible { outline: none; background: var(--hover-bg); }
/* The icon leads at the edge; the tick sits at the end of the row. */
.todo-status-filter-check { order: 99; justify-self: end; color: var(--accent-color); font-weight: var(--font-semi-bold); }
.todo-status-filter-glyph { display: grid; place-items: center; }
.todo-status-filter-glyph svg { width: 14px; height: 14px; }


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

/* The Groups tab of the right sidebar fills the panel; its ScrollPanel scrolls the list. */
.todo-properties-frame { display: flex; flex-direction: column; flex: 1; height: 100%; min-height: 0; min-width: 0; }
.todo-status-groups {
  border-bottom: 1px solid var(--border-light);
}
/* A subgroup sits one step in under its group. */
.todo-status-subgroup .todo-status-group-header {
  padding-left: calc(var(--space-3) + 14px);
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
`;var Nd=`/* \u2500\u2500 Settings: one bordered list per section, rows split by hairlines \u2500\u2500\u2500\u2500\u2500
   Replaces the stack of individually boxed rows and the Show/Hide drop zones:
   a switch says "shown" more plainly than which box a row sits in. */
.todo-settings-desc {
  margin: 0 0 var(--space-2);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  line-height: 1.45;
}
.todo-settings-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--container-color);
  overflow: visible;
}
.todo-settings-item {
  position: relative;
  display: grid;
  grid-template-columns: 24px 24px minmax(0, 1fr) auto auto;
  align-items: center;
  column-gap: var(--space-2);
  min-height: 40px;
  padding: 4px var(--space-2) 4px 4px;
  font-size: var(--small-font-size);
}
.todo-settings-item + .todo-settings-item { border-top: 1px solid var(--border-light); }
.todo-status-settings .todo-settings-item {
  grid-template-columns: 24px 30px minmax(0, 1fr) 30px 34px 30px 40px 30px;
}
.todo-settings-icon-btn { display: inline-grid; place-items: center; width: 28px; height: 28px; padding: 0; border: none; border-radius: var(--radius-sm); background: transparent; cursor: pointer; }
.todo-settings-icon-btn:hover { background: var(--hover-bg); }
.todo-settings-icon-btn .todo-status-menu-svg, .todo-settings-icon-btn .todo-status-menu-dot { width: 16px; height: 16px; }
.todo-status-asset { display: inline-grid; width: 1em; height: 1em; }
.todo-status-asset > svg { width: 100%; height: 100%; }
.todo-icon-picker { display: flex; flex-direction: column; gap: 8px; padding: 4px; }
.todo-icon-picker-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(34px, 1fr)); gap: 4px; max-height: 220px; overflow: auto; }
.todo-icon-picker-item { display: inline-grid; place-items: center; height: 34px; padding: 0; border: none; border-radius: var(--radius-sm); background: transparent; color: var(--text-color); cursor: pointer; }
.todo-icon-picker-item:hover { background: var(--hover-bg); }
.todo-icon-picker-item.is-active { background: var(--accent-tint-bg); color: var(--title-color); }
.todo-icon-picker-svg { display: inline-grid; width: 18px; height: 18px; }
.todo-icon-picker-svg > svg { width: 100%; height: 100%; }
.todo-icon-picker-hint { margin: 0; color: var(--text-tertiary); font-size: var(--smaller-font-size); line-height: 1.4; overflow-wrap: anywhere; }
.todo-status-restore { margin-top: 6px; }
.todo-settings-row-actions { display: flex; align-items: center; justify-content: flex-end; gap: 2px; }
.todo-settings-row-actions svg { width: 15px; height: 15px; }
.todo-settings-name-field { min-width: 0; }
.todo-settings-text { box-sizing: border-box; width: 100%; min-width: 0; }
.todo-status-add { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-2); }
.todo-status-add > :first-child { flex: 1 1 auto; min-width: 0; }
.todo-settings-head-glyph { display: inline-grid; place-items: center; }
.todo-settings-head-glyph svg { width: 14px; height: 14px; }
/* Same pressed look as the Markdown task strikethrough toggles. */
.todo-settings-strike[aria-pressed='true'] { background: var(--accent-tint-bg); color: var(--title-color); }
.todo-settings-strike[aria-pressed='false'] { color: var(--text-tertiary); }
.todo-settings-strike svg { width: 15px; height: 15px; }
.todo-smart-list-settings .todo-settings-item {
  grid-template-columns: 24px 24px minmax(0, 1fr) 34px 104px 40px;
}
.todo-settings-head {
  min-height: 30px;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
}
.todo-settings-head > span:nth-child(n + 5) { justify-self: center; }
.todo-smart-list-settings .todo-settings-head > span:nth-child(n + 4) { justify-self: center; }
.todo-settings-item.is-off .todo-settings-glyph,
.todo-settings-item.is-off .todo-settings-chip,
.todo-settings-item.is-off .todo-settings-preview { opacity: 0.45; }
/* A switched-off status keeps its name readable, so only the add row's field looks empty. */
.todo-settings-item.is-off .todo-settings-name input { color: var(--text-secondary); }
.todo-settings-handle {
  display: grid;
  place-items: center;
  width: 24px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
}
button.todo-settings-handle { cursor: grab; }
button.todo-settings-handle:hover { background: var(--hover-bg); color: var(--text-color); }
button.todo-settings-handle:active { cursor: grabbing; }
[data-reorder-active="true"] > .todo-settings-handle { outline: none; }
.todo-settings-handle svg { width: 15px; height: 15px; }
.todo-settings-glyph { display: grid; place-items: center; width: 22px; height: 22px; }
.todo-settings-glyph svg { width: 16px; height: 16px; }
.todo-settings-chip {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.todo-settings-chip svg { width: 13px; height: 13px; }
.todo-settings-name {
  min-width: 0;
  overflow: hidden;
  color: var(--text-color);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-settings-preview { display: flex; min-width: 0; }
.todo-settings-text-select { width: 104px; min-width: 0; }
.todo-settings-item > :nth-child(n + 5) { justify-self: center; }
.todo-smart-list-settings .todo-settings-item > :nth-child(n + 4) { justify-self: center; }
.todo-settings-end { display: flex; flex: 1 1 auto; justify-content: flex-end; min-width: 0; margin-left: auto; }
.todo-settings-end > [data-plugin-widget] { flex: 0 0 auto; width: var(--todo-segmented-width, 100%) !important; }
.todo-settings-item.drop-before::before,
.todo-settings-item.drop-after::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  height: var(--drop-knob);
  margin: 0;
  background: var(--drop-indicator-fill);
  pointer-events: none;
}
.todo-settings-item.drop-before::before { top: 0; transform: translateY(-50%); }
.todo-settings-item.drop-after::before { bottom: 0; transform: translateY(50%); }
@container (max-width: 560px) {
  .todo-status-settings .todo-settings-item { grid-template-columns: 24px 30px minmax(0, 1fr) 30px 34px 30px 40px 30px; }
  .todo-status-settings .todo-settings-preview { display: none; }
}

.todo-reminder-offsets { display: flex; flex-direction: column; align-items: stretch; gap: 6px; width: 290px; max-width: 100%; }
.todo-reminder-mode { width: 100%; }
.todo-reminder-time { box-sizing: border-box; width: 96px; font-variant-numeric: tabular-nums; text-align: center; }
.todo-reminder-time.invalid { border-color: var(--negative-color); }
.todo-reminder-line {
  display: grid;
  grid-template-columns: 80px 170px 28px;
  align-items: center;
  gap: 6px;
}
.todo-reminder-line > * { min-width: 0; }
.todo-reminder-number-frame, .todo-reminder-number, .todo-reminder-unit { width: 100%; min-width: 0; box-sizing: border-box; }
.todo-reminder-add { align-self: flex-end; }
.todo-reminder-note { color: var(--text-secondary); font-size: var(--smaller-font-size); }
.todo-reminder-note.is-error { color: var(--negative-color); }
.todo-detail .todo-reminder-offsets { width: auto; }
.todo-detail .todo-reminder-line { grid-template-columns: 80px minmax(0, 1fr) 28px; }
.todo-detail .todo-reminder-mode { width: auto; }
.todo-detail .todo-reminder-add { align-self: flex-start; }

/* The reorder hook's announcement is for screen readers only. */
.settings-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

`;var Ld=`/* \u2500\u2500 Status badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.todo-status-pill {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 18px;
  padding: 0 7px;
  overflow: hidden;
  border-radius: 999px;
  font-family: var(--interface-font);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-view-meta .todo-status-pill { height: 16px; padding: 0 6px; line-height: 16px; }

/* \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Rendered Markdown carries its own line breaks; pre-wrap turned the
   newlines between its blocks into empty lines. */
.todo-notes.is-rendered { white-space: normal; }
.todo-notes.is-rendered > :is(p, ul, ol, blockquote, pre) + :is(p, ul, ol, blockquote, pre) { margin-top: 2px; }
/* Calmer rows: tags recede, notes stop at two lines, \u22EF waits for hover. */
/* Tags are the one bubble in a row: each is a button that searches for itself. */
.todo-row .todo-tag-text {
  height: 18px;
  padding: 0 7px;
  border-radius: 9px;
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-weight: var(--font-regular);
  cursor: pointer;
}
.todo-row .todo-tag-text:hover { color: var(--title-color); }
.todo-row .todo-tag-text:focus-visible { outline: 1px solid var(--accent-color); outline-offset: 1px; }
.todo-row .todo-tag-more { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-row .todo-notes { -webkit-line-clamp: 2; margin-top: 3px; }
.todo-row .todo-view-meta { margin-top: 5px; }
.todo-row .todo-row-actions .todo-menu-btn { opacity: 0; transition: opacity var(--duration-fast) var(--ease-out); }
/* Flag and \u22EF share one spot at the row's right edge: the flag at rest, the \u22EF on hover. */
/* The cluster is one title line tall and its 28px buttons overhang it evenly,
   so a one-line title sits as close to its details as a wrapped one. */
.todo-row .todo-row-actions { display: grid; grid-template-rows: minmax(0, 1fr); height: calc(var(--small-font-size) * 1.35); margin-top: 0; margin-right: -4px; }
.todo-row .todo-row-actions > * { grid-area: 1 / 1; justify-self: end; align-self: center; }
.todo-row .todo-row-actions .todo-flag-mark { width: 28px; height: 28px; justify-content: center; transition: opacity var(--duration-fast) var(--ease-out); }
.todo-row:hover .todo-row-actions .todo-flag-mark,
.todo-row:focus-within .todo-row-actions .todo-flag-mark,
.todo-row .todo-row-actions:has(.todo-menu-btn.active) .todo-flag-mark { opacity: 0; }
.todo-row:hover .todo-row-actions .todo-menu-btn,
.todo-row:focus-within .todo-row-actions .todo-menu-btn,
.todo-row .todo-row-actions .todo-menu-btn.active { opacity: 1; }
.todo-view-meta > .todo-tag-text + .todo-tag-text { margin-left: 0; }


.todo-smart-grid .todo-smart-chip { height: 62px; padding: 7px 9px; }
.todo-smart-grid .todo-smart-chip:not(.active):hover { background: var(--hover-bg); }
.todo-smart-grid .todo-smart-chip.active .todo-tree-icon {
  background: var(--todo-chip-on, var(--title-color));
  color: var(--todo-chip-color, var(--accent-color));
}
.todo-smart-grid .todo-smart-chip.active .todo-tree-count { color: inherit; }

.todo-filter-popover-stack { display: flex; flex-direction: column; gap: var(--space-2); }
.todo-filter-popover-stack .todo-group-filter-popover { margin: 0; }
.todo-filter-popover-stack { gap: var(--space-2); }
.todo-filter-section-label {
  padding: 0 2px;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
}
/* Lists in the filter: same row as every other menu \u2014 dot first, tick last. */
.todo-filter-popover-stack .todo-group-filter-head { padding: 0 2px 4px; border-bottom: none; }
.todo-filter-popover-stack .todo-group-filter-title {
  padding: 0;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
}
.todo-filter-popover-stack .todo-group-filter-title:hover { background: transparent; color: var(--text-color); }
.todo-filter-popover-stack .todo-group-filter-list { padding-top: 0; }
.todo-filter-popover-stack .todo-group-filter-row { gap: 8px; min-height: 30px; padding: 0 8px 0 6px; }
.todo-filter-popover-stack .todo-group-filter-row .todo-tree-count { margin-left: auto; }
.todo-filter-popover-stack .todo-group-filter-check { order: 99; }

`;var Pd=`/* \u2500\u2500 Main table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.todo-table-scroll { display: flex; flex-direction: column; }
.todo-table-scroll > .todo-table { flex: 0 0 auto; }
.todo-table-empty-state {
  display: grid;
  flex: 1 1 auto;
  place-items: center;
  min-height: 120px;
  padding: var(--space-4);
  color: var(--text-tertiary);
  font-size: var(--small-font-size);
}
.todo-table-status-filter {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-left: -2px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-table-status-filter:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-table-status-filter.active { background: var(--accent-tint-bg); color: var(--title-color); }
.todo-table-status-filter svg { width: 16px; height: 16px; }

/* The empty row + adds at the top of the table: type a task or paste several lines. */
.todo-table-new-row:not(.is-idle) td { background: color-mix(in srgb, var(--accent-color) 6%, transparent); }
.todo-table-new-circle {
  display: block;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 1.5px dashed color-mix(in srgb, var(--text-secondary) 55%, transparent);
  border-radius: 50%;
}
.todo-table-new-input {
  width: 100%;
  height: 26px;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: var(--title-color);
  font: inherit;
  font-size: var(--small-font-size);
}
.todo-table-new-input:focus,
.todo-table-new-input:focus-visible { border: none; outline: none; box-shadow: none; }
.todo-table-new-input::placeholder { color: var(--text-tertiary); }
.todo-table-new-hint { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-new-row:not(.is-idle) .todo-table-cell-btn.muted,
.todo-table-new-row:not(.is-idle) .todo-table-flag-btn:not(.on) { opacity: 1; }
.todo-table-new-row.is-idle .todo-table-new-hint { visibility: hidden; }
.todo-table-new-status { display: inline-grid; place-items: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: 50%; background: transparent; cursor: pointer; }
.todo-table-new-status:hover:not(:disabled) .todo-table-new-circle { border-color: var(--text-secondary); }
.todo-table-new-row.is-idle .todo-table-new-circle { border-style: solid; }
.todo-calendar { display: flex; flex-direction: column; gap: 4px; user-select: none; }
.todo-calendar-head { display: flex; align-items: center; gap: 2px; padding: 0 2px 2px; }
.todo-calendar-title { flex: 1 1 auto; font-weight: 600; font-size: var(--font-ui-small, 13px); color: var(--text-color); }
.todo-calendar-nav { display: inline-grid; place-items: center; width: 24px; height: 24px; padding: 0; border: none; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary); cursor: pointer; }
.todo-calendar-nav:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-calendar-nav svg { width: 14px; height: 14px; }
.todo-calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.todo-calendar-weekday { display: grid; place-items: center; height: 22px; font-size: var(--smaller-font-size); color: var(--text-tertiary); }
.todo-calendar-day { display: grid; place-items: center; height: 28px; padding: 0; border: none; border-radius: var(--radius-sm); background: transparent; color: var(--text-color); font: inherit; font-size: var(--smaller-font-size); font-variant-numeric: tabular-nums; cursor: pointer; }
.todo-calendar-day:hover { background: var(--hover-bg); }
.todo-calendar-day.is-outside { color: var(--text-tertiary); }
.todo-calendar-day.is-today { color: var(--accent-color); font-weight: 600; }
.todo-calendar-day.is-selected { background: var(--accent-color); color: var(--text-on-accent, #fff); font-weight: 600; }
.todo-calendar-day:focus-visible, .todo-calendar-nav:focus-visible, .todo-calendar-link:focus-visible { outline: 2px solid var(--accent-color); outline-offset: -2px; }
.todo-calendar-foot { display: flex; justify-content: space-between; padding: 4px 2px 0; border-top: 1px solid var(--border-color); }
.todo-calendar-link { padding: 2px 4px; border: none; border-radius: var(--radius-sm); background: transparent; color: var(--accent-color); font: inherit; font-size: var(--smaller-font-size); cursor: pointer; }
.todo-calendar-link:hover:not(:disabled) { background: var(--hover-bg); }
.todo-calendar-link:disabled { color: var(--text-tertiary); cursor: default; }
.todo-clock-input { box-sizing: border-box; width: 100%; min-width: 0; font-variant-numeric: tabular-nums; }
.todo-clock-input.is-invalid { border-color: var(--text-error, var(--color-red)); }

/* Headers drag to reorder: the drop lands on the shared insertion line. */
.todo-table th[draggable='true'] { cursor: grab; }
.todo-table th[draggable='true']:active { cursor: grabbing; }
.todo-table th.col-drop-before::after,
.todo-table th.col-drop-after::after {
  content: '';
  position: absolute;
  top: 7px;
  bottom: 7px;
  z-index: 5;
  width: 2px;
  border-radius: 2px;
  background: var(--accent-color);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-color) 22%, transparent);
  pointer-events: none;
}
.todo-table th.col-drop-before::after { left: -1px; }
.todo-table th.col-drop-after::after { right: -1px; }
/* The column being dragged fades, header and cells, so the gap reads clearly. */
.todo-table[data-dragging-col='title'] .todo-table-title,
.todo-table[data-dragging-col='note'] .todo-table-note,
.todo-table[data-dragging-col='group'] .todo-table-group,
.todo-table[data-dragging-col='status'] .todo-table-status,
.todo-table[data-dragging-col='priority'] .todo-table-priority,
.todo-table[data-dragging-col='due'] .todo-table-due,
.todo-table[data-dragging-col='flagged'] .todo-table-flagged,
.todo-table[data-dragging-col='location'] .todo-table-location,
.todo-table[data-dragging-col='tags'] .todo-table-tags {
  opacity: 0.35;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.todo-table th.is-dragging { opacity: 0.35; }
/* The chip that follows the pointer while a header is dragged. */
.todo-col-drag-chip {
  position: fixed;
  top: -200px;
  left: -200px;
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 12px;
  border: 1px solid var(--border-medium);
  border-radius: 8px;
  background: var(--surface-color-alt);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
  color: var(--title-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  white-space: nowrap;
  pointer-events: none;
}
.todo-column-option.is-locked .todo-column-toggle { cursor: default; color: var(--text-secondary); }

/* Column splits: invisible until hovered, then a thin line; drag to resize. */
.todo-col-resize {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  width: 7px;
  cursor: col-resize;
  touch-action: none;
}
.todo-col-resize::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 0;
  bottom: 8px;
  width: 1px;
  background: var(--accent-color);
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}
.todo-col-resize:hover::after,
.todo-col-resize.is-dragging::after { opacity: 1; }
.todo-table th { overflow: visible; }

/* Priority and column menus size to their rows instead of the wide status menu. */
.todo-status-filter-popover.todo-compact-popover { width: max-content; min-width: 150px; max-width: 220px; }

/* Status filter quick picks: one segmented row above the list. */
.todo-status-quick {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2px;
  padding: 2px;
  border-radius: var(--radius-sm);
  background: var(--hover-bg);
}
.todo-status-quick-btn {
  min-width: 0;
  height: calc(var(--menu-item-height) - 4px);
  padding: 0 var(--space-2);
  overflow: hidden;
  border: none;
  border-radius: calc(var(--radius-sm) - 1px);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: var(--small-font-size);
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.todo-status-quick-btn:hover { color: var(--text-color); }
.todo-status-quick-btn.active { background: var(--accent-tint-bg); color: var(--title-color); }
.todo-status-quick-btn:focus-visible { outline: none; color: var(--text-color); }

/* Column picker: grip, check, name; the shared insertion line between rows. */
.todo-column-option {
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: center;
  min-height: var(--menu-item-height);
  border-radius: var(--radius-sm);
}
.todo-column-option.locked {
  grid-template-columns: 22px minmax(0, 1fr) 14px;
  gap: var(--space-button);
  padding-right: var(--space-2);
  color: var(--text-secondary);
  font-size: var(--small-font-size);
}
.todo-column-option:not(.locked):hover { background: var(--hover-bg); }
.todo-column-option.is-dragging { opacity: 0.45; }
.todo-column-grip {
  display: grid;
  place-items: center;
  width: 22px;
  height: 100%;
  color: var(--text-tertiary);
  cursor: grab;
}
.todo-column-grip.is-static { cursor: default; }
.todo-column-grip:active { cursor: grabbing; }
.todo-column-grip svg { width: 14px; height: 14px; }
.todo-column-grip:focus-visible { outline: none; color: var(--text-color); }
.todo-column-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 14px;
  align-items: center;
  gap: var(--space-button);
  min-width: 0;
  min-height: var(--menu-item-height);
  padding: 0 8px 0 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-column-toggle:focus-visible { outline: none; }
.todo-column-option.locked { padding-right: 8px; }
.todo-column-option.drop-before::before,
.todo-column-option.drop-after::before {
  content: '';
  position: absolute;
  left: 4px;
  right: 4px;
  z-index: 2;
  height: var(--drop-knob);
  margin: 0;
  background: var(--drop-indicator-fill);
  pointer-events: none;
}
.todo-column-option.drop-before::before { top: 0; transform: translateY(-50%); }
.todo-column-option.drop-after::before { bottom: 0; transform: translateY(50%); }

/* Search: an icon until wanted, then a plain field in the title's place. */
.todo-page-search {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--space-1);
  min-width: 0;
  height: var(--search-field-height, 26px);
}
.todo-page-search-icon { flex: 0 0 auto; width: 15px; height: 15px; color: var(--text-tertiary); }
.todo-page-search-input {
  flex: 1 1 auto;
  min-width: 0;
  height: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
}
.todo-page-search-input:focus,
.todo-page-search-input:focus-visible { border: none; outline: none; box-shadow: none; }
.todo-page-appbar-title { max-width: none; flex: 0 1 auto; }
/* Focus after a click or a closed popover is a soft fill, never a blue ring. */
.todo-table-sort:focus-visible,
.todo-page-appbar-btn:focus-visible,
.todo-table-status-filter:focus-visible {
  outline: none;
  background: var(--hover-bg);
}
.todo-table-shell { container-type: inline-size; }
.todo-table th {
  position: sticky;
  top: 0;
  z-index: 3;
  background: var(--pane-bg, var(--body-color));
}
.todo-table-note-text { color: var(--text-tertiary); }
.todo-table-section td {
  box-sizing: border-box;
  height: 37px;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom: 1px solid var(--border-light);
  background: var(--surface-color-alt);
  vertical-align: middle;
}
.todo-table-section td.todo-table-select { position: relative; overflow: visible; }
.todo-table-section-text {
  position: absolute;
  top: 50%;
  left: 10px;
  z-index: 1;
  display: inline-flex;
  align-items: baseline;
  transform: translateY(-50%);
  white-space: nowrap;
}
.todo-table-section-label {
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-semi-bold);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.todo-table-section-overdue .todo-table-section-label { color: var(--negative-color); }
.todo-table-section-count {
  margin-left: 8px;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
}
.todo-table-group-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  max-width: 100%;
  height: 20px;
  padding: 0 8px 0 7px;
  overflow: hidden;
  border-radius: 999px;
  background: color-mix(in srgb, var(--todo-group-color) 16%, transparent);
  color: var(--todo-group-color);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  white-space: nowrap;
}
.todo-table-status .todo-table-cell-btn { padding-left: 2px; }
.todo-table-status .todo-table-cell-btn:hover:not(:disabled) { background: transparent; }
.todo-table-status .todo-table-cell-btn:hover:not(:disabled) .todo-status-pill { filter: brightness(1.08); }
.todo-table-due .todo-table-cell-btn.is-overdue { font-weight: var(--font-medium); }
.todo-table-row.completed .todo-table-note-text,
.todo-table-row.completed .todo-table-group-pill,
.todo-table-row.completed .todo-status-pill { opacity: 0.6; }
/* Fixed widths; the title takes the rest. A narrow pane scrolls sideways
   (the table carries a min-width) instead of squeezing the title away. */
.todo-table .todo-table-note { width: 22%; }
.todo-table .todo-table-group { width: 132px; }
.todo-table .todo-table-status { width: 112px; }
.todo-table .todo-table-priority { width: var(--todo-priority-width, 104px); }
.todo-table .todo-table-due { width: var(--todo-due-width, 156px); }
.todo-table-due-text { min-width: 40px; min-height: 24px; }
/* Every cell is a button into its editor, drawn exactly like the plain cell it replaces. */
.todo-table .todo-table-edit-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 28px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: none;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  color: inherit;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}
.todo-table .todo-table-edit-btn:focus-visible { outline: none; }
.todo-table .todo-table-edit-btn:disabled { cursor: default; }
.todo-table .todo-table-title-btn { color: var(--title-color); }
.todo-table-title-input { height: 28px; }
.todo-cell-editor { display: flex; flex-direction: column; gap: var(--space-2); padding: 2px; }
/* Tags: one field, chips flowing inline before the text input, like the composer. */
.todo-tags-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  min-height: 32px;
  padding: 4px 6px;
  box-sizing: border-box;
  border: 1px solid var(--control-border);
  border-radius: var(--control-radius);
  background: var(--control-bg);
  cursor: text;
}
.todo-tags-input:focus-within { border-color: var(--accent-color); }
.todo-tags-chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  max-width: 100%;
  height: 22px;
  padding: 0 2px 0 7px;
  box-sizing: border-box;
  border-radius: 11px;
  background: var(--hover-bg);
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
}
.todo-tags-chip > span { overflow: hidden; text-overflow: ellipsis; }
.todo-tags-chip-remove {
  display: inline-grid;
  place-items: center;
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-tags-chip-remove:hover { color: var(--text-color); }
.todo-tags-chip-remove:focus-visible { outline: none; color: var(--text-color); background: var(--hover-bg); }
.todo-tags-chip-remove svg { width: 10px; height: 10px; }
.todo-tags-field {
  appearance: none;
  flex: 1 1 80px;
  min-width: 80px;
  height: 22px;
  padding: 0 2px;
  border: none;
  outline: none;
  background: transparent;
  box-shadow: none;
  color: var(--text-color);
  font: inherit;
  font-size: var(--smaller-font-size);
}
.todo-tags-field::placeholder { color: var(--control-placeholder); }
.todo-tags-input .todo-tags-field:focus,
.todo-tags-input .todo-tags-field:focus-visible { border: none; outline: none; box-shadow: none; background: transparent; }
.todo-cell-notes {
  box-sizing: border-box;
  width: 100%;
  min-height: 140px;
  padding: 8px;
  resize: vertical;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-size: var(--small-font-size);
  line-height: 1.45;
}
.todo-cell-notes:focus { outline: none; border-color: var(--border-medium); }
.todo-table-done-count { color: var(--text-tertiary); }
.todo-table-done-count::before { content: '\xB7'; margin-right: 8px; color: var(--text-tertiary); }
.todo-table .todo-table-flagged { width: var(--todo-flagged-width, 92px); }
.todo-table-flag-btn {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-left: -5px;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
}
.todo-table-flag-btn svg { width: 14px; height: 14px; }
.todo-table-flag-btn:not(.on) { opacity: 0; }
.todo-table-row:hover .todo-table-flag-btn,
.todo-table-flag-btn:focus-visible { opacity: 1; }
.todo-table-flag-btn:hover:not(:disabled) { background: var(--hover-bg); color: var(--text-color); }
.todo-table-flag-btn.on { color: var(--neutral-color); }
.todo-table-flag-btn:focus-visible { outline: none; background: var(--hover-bg); }
.todo-table .todo-table-location { width: 140px; }
.todo-table .todo-table-tags { width: 140px; }
/* The trailing column holds only the flag of a row whose Flagged column is hidden. It scrolls with the table and has
   no surface of its own, so it never covers the last column and takes the row's hover, selection and editing colour. */
.todo-table .todo-table-actions { width: 24px; }
.todo-status-plain { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-row:not(:hover) .todo-status-plain { opacity: 0; }

`;var nm=yd+wd+vd+xd+Td+kd+Sd+Ad+Ed+Cd+Dd+Id+Nd+Ld+Pd,gi="notes-todo-styles";function Od(){let e=document.getElementById(gi);return e||(e=document.createElement("style"),e.id=gi,document.head.appendChild(e)),e.textContent=nm,()=>{document.getElementById(gi)===e&&e.remove()}}var ie="#12120f",he="#ffffff",bi=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ie,onDark:ie},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:he,onDark:he},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ie,onDark:ie},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:he,onDark:ie},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ie,onDark:ie},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:he,onDark:ie},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:he,onDark:ie},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:he,onDark:ie},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:he,onDark:ie},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:he,onDark:he},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ie,onDark:ie},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:he,onDark:ie},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:he,onDark:ie},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ie,onDark:ie},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:he,onDark:ie},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:he,onDark:ie},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:he,onDark:ie},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:he,onDark:ie},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ie,onDark:ie},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ie,onDark:ie},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:he,onDark:ie},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:he,onDark:ie},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:he,onDark:ie},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:he,onDark:ie},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:he,onDark:ie},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:he,onDark:ie},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ie,onDark:ie},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ie,onDark:ie},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:he,onDark:ie},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ie,onDark:ie},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:he,onDark:ie},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:he,onDark:ie},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ie,onDark:ie},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:he,onDark:ie},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:he,onDark:ie},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:he,onDark:ie}],am=["semantic","muted","accent","categorical"];var Aw=new Map(bi.map(e=>[e.id,e])),im={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},sm=new Map(bi.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),dm=/^[a-z][a-z0-9-]{0,47}$/,lm={version:4,families:am.map(e=>({id:e,name:im[e]})),colors:bi.map(e=>({id:e.id,familyId:e.family,name:sm.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},cm=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var um=cm(lm);function yi(){return um}var hi=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],bn="palette:",pm=/^#[0-9a-f]{6}$/i;function yn(e){return e.startsWith(bn)&&dm.test(e.slice(bn.length))}function we(e){return`${bn}${e}`}function vr(e){return yn(e)?e.slice(bn.length):void 0}function Md(e){if(typeof e!="string")return;let t=e.trim();return yn(t)?t:pm.test(t)?t.toLowerCase():void 0}function Ee(e){let t=vr(e);return t?`var(--color-${t})`:e}function Vt(e){let t=vr(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function wi(e){let t=new Set(e.map(r=>vr(r)??r.toLowerCase()));return we(hi.find(r=>!t.has(r))??hi[0])}function _d(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=hi;return we(r[Math.abs(t)%r.length])}function Q(e){return e.trim().toLowerCase()}function mm(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=Q(i);!s||s===Q(t)||r.has(s)||(r.add(s),n.push(i))}return n}function fm(e){return`group_${Q(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Xe(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=Q(i);if(!i||r.has(s))continue;r.add(s);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():fm(i),p=Md(a.color)??wi(t.map(g=>g.color)),l=mm(a.aliases,i,r),u=typeof a.parent=="string"?a.parent.trim():"";t.push({id:c,name:i,color:p,...l.length?{aliases:l}:{},...u?{parent:u}:{}})}return Go(t)}function Go(e){let t=new Map;for(let i of e)t.has(i.id)||t.set(i.id,i);let r=i=>{let s=i.parent?t.get(i.parent):void 0;return s&&s.id!==i.id?s:void 0},n=i=>{let s=r(i);return s!==void 0&&r(s)===void 0},a=[];for(let i of e)if(!n(i)){if(i.parent===void 0)a.push(i);else{let{parent:s,...c}=i;a.push(c)}for(let s of e)s.parent===i.id&&s.id!==i.id&&n(s)&&a.push(s)}return a}function vi(e,t){return e.filter(r=>r.parent===t)}function xi(e,t){return[t,...vi(e,t.id)]}function Ro(e,t,r,n,a){let i=Go(e);if(!i.find(P=>P.id===t))return null;let c=i.some(P=>P.parent===t),p=i.filter(P=>P.id!==t&&P.parent!==t),l=p.findIndex(P=>P.id===r);if(l<0)return null;let u=n==="before"?l:l+1,g=p[u-1],h=p[u],m=g?g.parent??g.id:null,w=m!==null&&h?.parent===m;return!c&&m!==null&&(w||a)?{parent:m,before:w?h.id:null}:{parent:null,before:p.slice(u).find(P=>P.parent===void 0)?.id??null}}function xr(e,t,r){let n=Go(e),a=n.find(g=>g.id===t);if(!a)throw new Error("Group no longer exists");let i=n.filter(g=>g.id===t||g.parent===t),s=n.filter(g=>g.id!==t&&g.parent!==t),{parent:c,...p}=a;if(r.parent!==null){let g=s.find(P=>P.id===r.parent);if(!g||g.parent!==void 0||i.length>1)throw new Error("A subgroup cannot have subgroups");let h=s.filter(P=>P.parent===g.id),m=r.before===null?void 0:h.find(P=>P.id===r.before);if(r.before!==null&&!m)throw new Error("Groups changed; refresh before moving");let w=m??s[s.indexOf(h.at(-1)??g)+1],v=w?s.indexOf(w):s.length;return[...s.slice(0,v),{...p,parent:g.id},...s.slice(v)]}let l=r.before===null?void 0:s.find(g=>g.id===r.before&&g.parent===void 0);if(r.before!==null&&!l)throw new Error("Groups changed; refresh before moving");let u=l?s.indexOf(l):s.length;return[...s.slice(0,u),p,...i.slice(1),...s.slice(u)]}function zd(e,t,r,n){let a=Go(e),i=a.find(u=>u.id===t);if(!i)return null;let s=a.filter(u=>u.parent===i.parent),c=s.indexOf(i),p=r==="before"?n?0:c-1:n?s.length-1:c+1;if(p===c||p<0||p>=s.length)return null;let l=s.filter(u=>u.id!==t);return{parent:i.parent??null,before:l[p]?.id??null}}function gt(e,t){let r=Q(t??"");if(r)return e.find(n=>Q(n.name)===r||(n.aliases??[]).some(a=>Q(a)===r))}function Fo(e,t){return gt(t,e)?.name}function Gd(e,t){let r=Q(e??"");return r?gt(t,e)?.color??_d(r):we("primary-blue")}function $o(e){return wi(e.map(t=>t.color))}function Ti(e){let t={};for(let r of e){let n=Q(r??"");n&&(t[n]=(t[n]??0)+1)}return t}function Rd(e,t){return new Set(xi(e,t).flatMap(r=>[r.name,...r.aliases??[]]).map(Q))}function Ke(e,t=""){return typeof e=="string"?e:t}function wn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vn(e){let t=Ke(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function Fd(e){let t=Ke(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var gm=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],Lw=Object.fromEntries(gm.map(e=>[e,{destination:"ask",recognize:!0}]));var hm=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",jt]);function bm(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function ki(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=bm(e);if(!t||hm.has(t)||t.startsWith(`${jt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var ym=16384,wm=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function vm(e){if(!e||e.length>ym||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function xm(e){try{let t=new URL(e);if(t.protocol!==`${Ys}:`||t.hostname!==Xs)return null;let r=t.searchParams.get("realm")??"",n=gr(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!wm.test(a))return null;let i=vm(t.searchParams.get("state")??""),s=t.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let c=t.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function Uo(e){let t=xm(e);return t?.kind==="file"?t.relPath:null}function $d(e){return ki(e)!==null}function uo(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Si=["auto","white","black"],Tr=40,Ko=40;var Ud=["completed","canceled"],xn="statuses",kr=[{id:"open",labelKey:"todo.status.todo",color:we("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:we("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:we("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:we("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:we("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:we("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:we("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:we("red"),done:!0,cls:"todo-st-canceled",locked:!1}],Tn=we("teal"),Ai=kr,Vo=kr.map(e=>e.id),po=kr.filter(e=>!e.locked).map(e=>e.id),Tm=kr.filter(e=>e.done).map(e=>e.id),jo=new Map(kr.map(e=>[e.id,e])),Ei=new Set(po);function ct(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function Ci(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function kn(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Ko):"";if(!(!ct(a.id)||t.has(a.id)||!i)&&(t.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=Tr))break}return r}function Di(e,t){return jo.has(e)?t.done?.[e]??jo.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function Sr(e){if(typeof e=="string")return Vo.includes(e)||ct(e)?e:void 0}function Le(e){return e.status??(e.completed?"completed":"open")}function jd(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:Di(e,t),status:e}}var Tt="todo.tasks",Bt="todo.task_tags",mo="todo.task_links",fo="todo.task_attachments",Bo="todo.focus_sessions",ut="todo.status_history";async function Sn(e,t,r={},n){let a=[],i=r.cursor;do{n?.();let s=await e.data.dataset(t).query(r.select?{select:r.select,where:r.where,limit:1e3,cursor:i}:{where:r.where,limit:1e3,cursor:i});n?.(),a.push(...s.rows),i=s.cursor}while(i);return a}var km=200;function Kd(e,t=Tt){let r=e?.keys;if(!Array.isArray(r)||!r.length||r.length>km)return null;let n=t===Tt?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var go=["normal","low","medium","high"];function An(e){return typeof e=="string"&&go.includes(e)}function Vd(e){return/^([01]\d|2[0-3]):[0-5]\d$/.test(e)}function Bd(e){return e===!0}function Sm(e){return An(e)?e:"normal"}function En(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Am(e){return Array.isArray(e)?e.filter(t=>wn(t)).map(t=>({startedAt:Ke(t.startedAt),endedAt:Ke(t.endedAt),activeMinutes:En(t.activeMinutes)??0,pauseMinutes:En(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function Ii(e){return Array.isArray(e)?e.filter(t=>wn(t)).map(t=>({from:Sr(t.from),to:Sr(t.to),changedAt:Ke(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Em(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function Ni(e){if(typeof e!="string")return;let t=e.trim();if(t)return Uo(t)||$d(t)?t:void 0}function Cm(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>Ni(n)).filter(n=>!!n))];return r.length?r:void 0}function Dm(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>so(r)).filter(r=>!!r))];return t.length?t:void 0}function Im(e){if(!wn(e))return;let t=Ke(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function Cn(e){let t=e,r=new Date().toISOString(),n=Ke(t.id,uo("todo")),a=Ke(t.createdAt,r),i=Am(t.history),s=Ii(t.statusHistory),c=Sr(ct(t.customStatus)?t.customStatus:t.status);return{id:n,title:Ke(t.title).trim(),completed:Bd(t.completed)||c==="completed"||c==="canceled",priority:Sm(t.priority),dueDate:Ke(t.dueDate),reminderOffsets:Array.isArray(t.reminderOffsets)?t.reminderOffsets:void 0,reminderTime:vn(t.reminderTime),startTime:vn(t.startTime),endTime:vn(t.endTime),color:Fd(t.color),note:Ke(t.note),tags:Array.isArray(t.tags)?t.tags.filter(p=>typeof p=="string"&&!!p.trim()).map(p=>p.trim()):[],estimatedMinutes:En(t.estimatedMinutes),actualMinutes:En(t.actualMinutes),history:i.length?i:void 0,statusHistory:s.length?s:void 0,status:c,filePath:so(t.filePath),group:Ke(t.group).trim()||void 0,flagged:Bd(t.flagged)||void 0,urls:Cm(t.urls),attachments:Dm(t.attachments),location:Im(t.location),remindAt:Em(t.remindAt),reminderFiredAt:Ke(t.reminderFiredAt)||void 0,createdAt:a,updatedAt:Ke(t.updatedAt,a)}}function Ht(e,t,r){let n=(l,u=!1)=>{let g=new Map;for(let h of l){let m=g.get(h.taskId);m?m.push(h):g.set(h.taskId,[h])}if(u)for(let h of g.values())h.sort((m,w)=>Number(m.position)-Number(w.position));return g},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),c=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(l=>Cn({...l,tags:(a.get(l.id)??[]).map(u=>u.tag),urls:(i.get(l.id)??[]).map(u=>u.url),attachments:(s.get(l.id)??[]).map(u=>u.path),history:c.get(l.id)??[],statusHistory:p.get(l.id)??[]})).map(l=>({...l,group:Fo(l.group,r)??l.group})).filter(l=>l.title)}var Ar=[Tt,Bt,mo,fo],Nm=[...Ar,Bo,ut],Dn=Ar;function Lm(e,t){let r=ve(),n=!0,a=!1,i=()=>{a||(a=!0,queueMicrotask(()=>{a=!1,n&&t()}))},s=e.map(l=>r.api.data.dataset(l).subscribe(i)),c=()=>{n=!1,s.forEach(l=>l())},p=r.onDispose(c);return()=>{p(),c()}}function Wt(e){return Lm(Dn,e)}function qd(e){let t=Ar.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}function Li(e,t,r=ve(),n){return Sn(r.api,e,{where:t,cursor:n},r.assertActive)}var Pm=e=>!!e&&typeof e=="object"&&"code"in e&&e.code==="limit-exceeded";async function Om(e,t){let r=e.map(()=>[]),n=e.map((a,i)=>({...a,index:i,cursor:void 0}));for(;n.length;){t.assertActive();let a=n.map(s=>({operation:"query",dataset:s.dataset,query:{where:s.where,limit:1e3,cursor:s.cursor}})),i;try{i=(await t.api.data.snapshot(a)).values}catch(s){if(!Pm(s))throw s;(await Promise.allSettled(n.map(p=>Li(p.dataset,p.where,t,p.cursor)))).forEach((p,l)=>{if(p.status==="rejected")throw p.reason;r[n[l].index].push(...p.value)});break}t.assertActive(),n=n.flatMap((s,c)=>{r[s.index].push(...i[c].rows);let p=i[c].cursor;return p?[{...s,cursor:p}]:[]})}return r}async function Pi(e,t,r){let n=r?typeof r=="string"?r:{in:r}:void 0,a=n===void 0?void 0:{taskId:n},i=[mo,fo,...t?[Bo,ut]:[]],[s,c,p,l,u=[],g=[]]=await Om([{dataset:Tt,where:n===void 0?void 0:{id:n}},{dataset:Bt,where:a},...i.map(h=>({dataset:h,where:a}))],e);return e.assertActive(),{tasks:s,relations:{tags:c,links:p,attachments:l,sessions:u,statusHistory:g}}}async function Mm(e,t,r){let{tasks:n,relations:a}=await Pi(e,t,r);return Ht(n,a,Xe(e.api.getState().groups))}var Hd=new WeakMap;function Er(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=Hd.get(e);i||(i=new Map,Hd.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let p=s,l=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{l.forEach(u=>u()),i.clear()}),i.set(t,s)}let c=s.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,l=await a();if(e.assertActive(),p===s.revision)return l}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,c)),c}function Yd(e,t){let r=ve();return Er(r,e?"full":"calendar",e?Nm:Ar,t??"",()=>Mm(r,e,t))}var Wd=new WeakMap,_m=0;function zm(e,t){let r=Wd.get(e);r||(r=new Map,Wd.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++_m),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function Gm(e,t,r){return Er(e,"statusHistory",[ut],r.key,async()=>{let n=await Li(ut,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Ii(n)})}function Xd(e){let t=ve(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=zm(t,e),s=0,c=!1,p=()=>{let h=++s;Gm(t,e,a).then(m=>{!c&&h===s&&n({scope:t,id:e,history:m})}).catch(()=>{})},l=t.api.data.dataset(ut).subscribe(h=>{(!h.keys||h.keys.some(m=>m.taskId===e))&&p()}),u=()=>{c=!0,l(),i()},g=t.onDispose(u);return p(),()=>{g(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function Oi(){return Yd(!0)}async function ot(e){return e?(await Yd(!0,e))[0]??null:null}function Zd(e,t,r,n){let a=ve();return Er(a,"calendarPage",Ar,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(Tt).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let h=[];for(let m=0;m<i.rows.length;m+=100)h.push(...await Li(g,{taskId:{in:i.rows.slice(m,m+100).map(w=>String(w.id))}},a));return h},c=await Promise.allSettled([s(Bt),s(mo),s(fo)]),[p,l,u]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:Ht(i.rows,{tags:p,links:l,attachments:u,sessions:[],statusHistory:[]},Xe(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function qt(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function Mi(e,t,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i:null}catch{return null}}async function _i(e,t,r,n,a=!1){let i=await Mi(e,t,r,n,a);return i?i.record??t:null}async function zi(e,t,r,n){return await _i(e,t,r,n)!==null}function Gi(e,t,r){return _i(e,t,r)}async function Cr(e,t){return await _i(e,t,void 0,void 0,!0)!==null}async function Yt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}function Dr(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Ri(e){let t=Dr(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}var Jd=new WeakMap;function Rm(e){let t=Jd.get(e);if(!t){let r=e.title.toLowerCase(),n=e.note.toLowerCase();t={tags:(e.tags??[]).map(a=>a.toLowerCase()),withGroup:[r,n,(e.group??"").toLowerCase()],withoutGroup:[r,n]},Jd.set(e,t)}return t}function In(e,t=!0){let r=Dr(e);return!r.tags.length&&!r.text?()=>!0:n=>{let a=Rm(n);for(let i of r.tags)if(!a.tags.some(s=>s.startsWith(i)))return!1;return!r.text||(t?a.withGroup:a.withoutGroup).some(i=>i.includes(r.text))}}var Fi=100;function Xt(e,t,r,n,a){return Sn(e,t,{select:r,where:n},a)}var Fm={tags:[],links:[],attachments:[],sessions:[],statusHistory:[]};async function Qd(e,t,r){let[n,a]=await Promise.all([Xt(e,Tt,t,r.where,r.assertActive),r.withTags?Xt(e,Bt,["taskId","tag"],void 0,r.assertActive):[]]);return Ht(n,{...Fm,tags:a},r.groups)}async function el(e,t,r){let n=[...new Set(t)],a=new Map;for(let i=0;i<n.length;i+=Fi){let s=n.slice(i,i+Fi),c={taskId:{in:s}},[p,l,u,g,h,m]=await Promise.all([Xt(e,Tt,void 0,{id:{in:s}},r.assertActive),Xt(e,Bt,void 0,c,r.assertActive),Xt(e,mo,void 0,c,r.assertActive),Xt(e,fo,void 0,c,r.assertActive),Xt(e,Bo,void 0,c,r.assertActive),Xt(e,ut,void 0,c,r.assertActive)]);for(let w of Ht(p,{tags:l,links:u,attachments:g,sessions:h,statusHistory:m},r.groups))a.set(w.id,w)}return n.flatMap(i=>a.get(i)??[])}var tl=Fi;function ke(e=[]){return e.map(t=>Fo(t.name,e)??t.name)}var ol=()=>[];function rl(e){ol=e}var nl=()=>[],al=0,Ir=null;function il(e){nl=e,Nn()}function Nn(){Ir=null,al++}function sl(){return al}function kt(e){if(!Ir){Ir=new Map;let r=nl();for(let n of r){if(n.parent||!r.some(i=>i.parent===n.id))continue;let a=Rd(r,n);for(let i of[n.name,...n.aliases??[]])Ir.set(Q(i),a)}}let t=Q(e);return Ir.get(t)??new Set([t])}function Ln(e,t){return gt(t,e)?.parent!==void 0}function Pe(e,t){return Gd(e,gt(t,e)?t:ol())}async function dl(e,t,r,n){let a=new Map,i=e.data.dataset(ut);for(let s=0;s<t.length;s+=20){let c=t.slice(s,s+20),p=new Map;for(;c.length;){r();let l=await i.aggregate({where:{taskId:{in:c},or:["completed","canceled"].map(g=>({to:g,from:{in:n().filter(h=>h!==g)}})),...p.size?{and:[{or:c.map(g=>({taskId:g,position:{lt:p.get(g)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!l.length)break;let u=await i.query({select:["taskId","changedAt"],where:{or:l.map(g=>({taskId:g.taskId,position:g.position}))},limit:20});r(),c=[];for(let g of u.rows){let h=String(g.taskId);if(typeof g.changedAt=="string"&&g.changedAt)a.set(h,{changedAt:g.changedAt});else{let m=l.find(w=>w.taskId===h)?.position;if(typeof m!="number"||!Number.isInteger(m))throw new Error("Invalid completion position");p.set(h,m),c.push(h)}}}}return a}function Pn(e){return"historyLoaded"in e&&e.historyLoaded===!1}var ll={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"Groups","todo.view.expandGroup":"Show the subgroups of {{p0}}","todo.view.collapseGroup":"Hide the subgroups of {{p0}}","todo.view.expandAllGroups":"Expand all groups","todo.view.collapseAllGroups":"Collapse all groups","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists and statuses","todo.settings.section.groups":"Groups","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do-only groups","todo.settings.localGroupsDesc":"Private to To-Do: create, rename, colour and reorder them here.","todo.settings.useSharedGroups":"Shared groups","todo.settings.useSharedGroupsDesc":"Groups that Calendar, Contacts and Workspace use too. A change here changes them everywhere.","todo.settings.useLocalGroups":"To-Do-only groups","todo.settings.useLocalGroupsDesc":"Groups that exist only in To-Do. No other plugin sees them.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupRemove":"Remove group","todo.settings.localGroupRemoveBlocked":"Still used by {{count}} tasks \u2014 move them to another group to delete it","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.settings.collapsedGroupsSetting":"Collapsed sidebar groups","todo.settings.groupOrderSetting":"Order of the sidebar groups","todo.settings.localGroupUsage":"{{count}} tasks use this group","todo.settings.localGroupNewColor":"Color of the new group","todo.settings.localGroupDuplicate":"A group with that name already exists.","todo.settings.localSubgroupAdd":"Add subgroup","todo.settings.localSubgroupAddTo":"Add subgroup to {{p0}}","todo.settings.localSubgroupNew":"New subgroup","todo.settings.localGroupRemoveSubgroups":"Still has subgroups \u2014 remove or move them first","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Today to do","todo.info.todayCompleted":"Today completed","todo.info.weekTodo":"This week to do","todo.info.weekCompleted":"This week completed","todo.info.allTodo":"All to do","todo.info.allCompleted":"All completed","todo.info.list":"List","todo.info.tasks":"Tasks","todo.info.open":"Open","todo.info.completed":"Done","todo.info.overdue":"Overdue","todo.info.dueToday":"Due today","todo.info.next7":"Next 7 days","todo.info.noDate":"No date","todo.info.flagged":"Flagged","todo.info.reminder":"With reminder","todo.info.priority":"Priority","todo.info.groups":"Groups","todo.info.tags":"Tags","todo.info.estimated":"Estimated time","todo.info.nextDue":"Next due","todo.info.lastCompleted":"Last completed","todo.info.lastChange":"Last change","todo.info.created":"Created","todo.info.minutes":"{{minutes}} min","todo.info.hours":"{{hours}} h","todo.info.hoursMinutes":"{{hours}} h {{minutes}} min"};var cl={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Gruppen","todo.view.expandGroup":"Untergruppen von {{p0}} einblenden","todo.view.collapseGroup":"Untergruppen von {{p0}} ausblenden","todo.view.expandAllGroups":"Alle Gruppen ausklappen","todo.view.collapseAllGroups":"Alle Gruppen einklappen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen und Status","todo.settings.section.groups":"Gruppen","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.localGroupsDesc":"Geh\xF6ren nur zu Aufgaben: hier erstellen, umbenennen, einf\xE4rben und neu ordnen.","todo.settings.useSharedGroups":"Gemeinsame Gruppen","todo.settings.useSharedGroupsDesc":"Gruppen, die auch Kalender, Kontakte und Arbeitsbereiche verwenden. Eine \xC4nderung hier \xE4ndert sie \xFCberall.","todo.settings.useLocalGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.useLocalGroupsDesc":"Gruppen, die es nur in Aufgaben gibt. Kein anderes Plugin sieht sie.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupRemove":"Gruppe entfernen","todo.settings.localGroupRemoveBlocked":"Wird noch von {{count}} Aufgaben verwendet \u2014 Aufgaben zuerst in eine andere Gruppe verschieben","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.settings.collapsedGroupsSetting":"Eingeklappte Gruppen in der Seitenleiste","todo.settings.groupOrderSetting":"Reihenfolge der Gruppen in der Seitenleiste","todo.settings.localGroupUsage":"{{count}} Aufgaben verwenden diese Gruppe","todo.settings.localGroupNewColor":"Farbe der neuen Gruppe","todo.settings.localGroupDuplicate":"Eine Gruppe mit diesem Namen existiert bereits.","todo.settings.localSubgroupAdd":"Untergruppe hinzuf\xFCgen","todo.settings.localSubgroupAddTo":"Untergruppe zu {{p0}} hinzuf\xFCgen","todo.settings.localSubgroupNew":"Neue Untergruppe","todo.settings.localGroupRemoveSubgroups":"Hat noch Untergruppen \u2014 zuerst entfernen oder verschieben","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59).","todo.info.todayTodo":"Heute offen","todo.info.todayCompleted":"Heute erledigt","todo.info.weekTodo":"Diese Woche offen","todo.info.weekCompleted":"Diese Woche erledigt","todo.info.allTodo":"Alle offen","todo.info.allCompleted":"Alle erledigt","todo.info.list":"Liste","todo.info.tasks":"Aufgaben","todo.info.open":"Offen","todo.info.completed":"Erledigt","todo.info.overdue":"\xDCberf\xE4llig","todo.info.dueToday":"Heute f\xE4llig","todo.info.next7":"N\xE4chste 7 Tage","todo.info.noDate":"Ohne Datum","todo.info.flagged":"Markiert","todo.info.reminder":"Mit Erinnerung","todo.info.priority":"Priorit\xE4t","todo.info.groups":"Gruppen","todo.info.tags":"Tags","todo.info.estimated":"Gesch\xE4tzte Zeit","todo.info.nextDue":"N\xE4chste F\xE4lligkeit","todo.info.lastCompleted":"Zuletzt abgeschlossen","todo.info.lastChange":"Letzte \xC4nderung","todo.info.created":"Erstellt","todo.info.minutes":"{{minutes}} min","todo.info.hours":"{{hours}} h","todo.info.hoursMinutes":"{{hours}} h {{minutes}} min"};var ul={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Grupos","todo.view.expandGroup":"Mostrar los subgrupos de {{p0}}","todo.view.collapseGroup":"Ocultar los subgrupos de {{p0}}","todo.view.expandAllGroups":"Desplegar todos los grupos","todo.view.collapseAllGroups":"Plegar todos los grupos","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas y estados","todo.settings.section.groups":"Grupos","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos solo de Tareas","todo.settings.localGroupsDesc":"Privados de Tareas: cr\xE9alos, ren\xF3mbralos, color\xE9alos y reord\xE9nalos aqu\xED.","todo.settings.useSharedGroups":"Grupos compartidos","todo.settings.useSharedGroupsDesc":"Grupos que tambi\xE9n usan Calendario, Contactos y Espacios de trabajo. Un cambio aqu\xED los cambia en todas partes.","todo.settings.useLocalGroups":"Grupos solo de Tareas","todo.settings.useLocalGroupsDesc":"Grupos que solo existen en Tareas. Ning\xFAn otro plugin los ve.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupRemove":"Quitar grupo","todo.settings.localGroupRemoveBlocked":"Todav\xEDa lo usan {{count}} tareas: mu\xE9velas a otro grupo para eliminarlo","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.settings.collapsedGroupsSetting":"Grupos plegados de la barra lateral","todo.settings.groupOrderSetting":"Orden de los grupos de la barra lateral","todo.settings.localGroupUsage":"{{count}} tareas usan este grupo","todo.settings.localGroupNewColor":"Color del nuevo grupo","todo.settings.localGroupDuplicate":"Ya existe un grupo con ese nombre.","todo.settings.localSubgroupAdd":"A\xF1adir subgrupo","todo.settings.localSubgroupAddTo":"A\xF1adir subgrupo a {{p0}}","todo.settings.localSubgroupNew":"Nuevo subgrupo","todo.settings.localGroupRemoveSubgroups":"A\xFAn tiene subgrupos \u2014 elim\xEDnalos o mu\xE9velos primero","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Hoy por hacer","todo.info.todayCompleted":"Hoy completadas","todo.info.weekTodo":"Esta semana por hacer","todo.info.weekCompleted":"Esta semana completadas","todo.info.allTodo":"Todas por hacer","todo.info.allCompleted":"Todas completadas","todo.info.list":"Lista","todo.info.tasks":"Tareas","todo.info.open":"Abiertas","todo.info.completed":"Hechas","todo.info.overdue":"Vencidas","todo.info.dueToday":"Vencen hoy","todo.info.next7":"Pr\xF3ximos 7 d\xEDas","todo.info.noDate":"Sin fecha","todo.info.flagged":"Marcadas","todo.info.reminder":"Con recordatorio","todo.info.priority":"Prioridad","todo.info.groups":"Grupos","todo.info.tags":"Etiquetas","todo.info.estimated":"Tiempo estimado","todo.info.nextDue":"Pr\xF3ximo vencimiento","todo.info.lastCompleted":"\xDAltima completada","todo.info.lastChange":"\xDAltimo cambio","todo.info.created":"Creaci\xF3n","todo.info.minutes":"{{minutes}} min","todo.info.hours":"{{hours}} h","todo.info.hoursMinutes":"{{hours}} h {{minutes}} min"};var pl={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Groupes","todo.view.expandGroup":"Afficher les sous-groupes de {{p0}}","todo.view.collapseGroup":"Masquer les sous-groupes de {{p0}}","todo.view.expandAllGroups":"D\xE9plier tous les groupes","todo.view.collapseAllGroups":"Replier tous les groupes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes et statuts","todo.settings.section.groups":"Groupes","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.localGroupsDesc":"R\xE9serv\xE9s \xE0 T\xE2ches : cr\xE9ez-les, renommez-les, colorez-les et r\xE9organisez-les ici.","todo.settings.useSharedGroups":"Groupes partag\xE9s","todo.settings.useSharedGroupsDesc":"Groupes qu\u2019utilisent aussi Calendrier, Contacts et Espaces de travail. Une modification ici les modifie partout.","todo.settings.useLocalGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.useLocalGroupsDesc":"Groupes qui n\u2019existent que dans T\xE2ches. Aucun autre plugin ne les voit.","todo.settings.localGroupName":"Nom","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupRemove":"Supprimer le groupe","todo.settings.localGroupRemoveBlocked":"Encore utilis\xE9 par {{count}} t\xE2ches \u2014 d\xE9placez-les dans un autre groupe pour le supprimer","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.settings.collapsedGroupsSetting":"Groupes repli\xE9s de la barre lat\xE9rale","todo.settings.groupOrderSetting":"Ordre des groupes de la barre lat\xE9rale","todo.settings.localGroupUsage":"{{count}} t\xE2ches utilisent ce groupe","todo.settings.localGroupNewColor":"Couleur du nouveau groupe","todo.settings.localGroupDuplicate":"Un groupe portant ce nom existe d\xE9j\xE0.","todo.settings.localSubgroupAdd":"Ajouter un sous-groupe","todo.settings.localSubgroupAddTo":"Ajouter un sous-groupe \xE0 {{p0}}","todo.settings.localSubgroupNew":"Nouveau sous-groupe","todo.settings.localGroupRemoveSubgroups":"Contient encore des sous-groupes \u2014 supprimez-les ou d\xE9placez-les d\u2019abord","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Aujourd\u2019hui \xE0 faire","todo.info.todayCompleted":"Aujourd\u2019hui termin\xE9es","todo.info.weekTodo":"Cette semaine \xE0 faire","todo.info.weekCompleted":"Cette semaine termin\xE9es","todo.info.allTodo":"Toutes \xE0 faire","todo.info.allCompleted":"Toutes termin\xE9es","todo.info.list":"Liste","todo.info.tasks":"T\xE2ches","todo.info.open":"Ouvertes","todo.info.completed":"Faites","todo.info.overdue":"En retard","todo.info.dueToday":"Pour aujourd'hui","todo.info.next7":"7 prochains jours","todo.info.noDate":"Sans date","todo.info.flagged":"Marqu\xE9es","todo.info.reminder":"Avec rappel","todo.info.priority":"Priorit\xE9","todo.info.groups":"Groupes","todo.info.tags":"\xC9tiquettes","todo.info.estimated":"Dur\xE9e estim\xE9e","todo.info.nextDue":"Prochaine \xE9ch\xE9ance","todo.info.lastCompleted":"Derni\xE8re termin\xE9e","todo.info.lastChange":"Derni\xE8re modification","todo.info.created":"Cr\xE9ation","todo.info.minutes":"{{minutes}} min","todo.info.hours":"{{hours}} h","todo.info.hoursMinutes":"{{hours}} h {{minutes}} min"};var ml={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u5206\u7EC4","todo.view.expandGroup":"\u663E\u793A {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.collapseGroup":"\u9690\u85CF {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.expandAllGroups":"\u5C55\u5F00\u6240\u6709\u5206\u7EC4","todo.view.collapseAllGroups":"\u6298\u53E0\u6240\u6709\u5206\u7EC4","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868\u548C\u72B6\u6001","todo.settings.section.groups":"\u5206\u7EC4","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5C5E\u4E8E\u5F85\u529E\u4E8B\u9879\uFF1A\u5728\u6B64\u521B\u5EFA\u3001\u91CD\u547D\u540D\u3001\u7740\u8272\u548C\u6392\u5E8F\u3002","todo.settings.useSharedGroups":"\u5171\u4EAB\u5206\u7EC4","todo.settings.useSharedGroupsDesc":"\u65E5\u5386\u3001\u8054\u7CFB\u4EBA\u548C\u5DE5\u4F5C\u533A\u4E5F\u4F1A\u4F7F\u7528\u7684\u5206\u7EC4\u3002\u5728\u6B64\u5904\u7684\u66F4\u6539\u4F1A\u540C\u6B65\u5230\u6240\u6709\u5730\u65B9\u3002","todo.settings.useLocalGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.useLocalGroupsDesc":"\u4EC5\u5B58\u5728\u4E8E\u5F85\u529E\u4E8B\u9879\u4E2D\u7684\u5206\u7EC4\u3002\u5176\u4ED6\u63D2\u4EF6\u90FD\u770B\u4E0D\u5230\u5B83\u4EEC\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupRemove":"\u79FB\u9664\u5206\u7EC4","todo.settings.localGroupRemoveBlocked":"\u4ECD\u6709 {{count}} \u4E2A\u4EFB\u52A1\u5728\u4F7F\u7528 \u2014 \u5C06\u5B83\u4EEC\u79FB\u5230\u5176\u4ED6\u5206\u7EC4\u540E\u624D\u80FD\u5220\u9664","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.settings.collapsedGroupsSetting":"\u4FA7\u8FB9\u680F\u4E2D\u6298\u53E0\u7684\u5206\u7EC4","todo.settings.groupOrderSetting":"\u4FA7\u8FB9\u680F\u5206\u7EC4\u7684\u987A\u5E8F","todo.settings.localGroupUsage":"{{count}} \u4E2A\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4","todo.settings.localGroupNewColor":"\u65B0\u5206\u7EC4\u7684\u989C\u8272","todo.settings.localGroupDuplicate":"\u5DF2\u5B58\u5728\u540C\u540D\u5206\u7EC4\u3002","todo.settings.localSubgroupAdd":"\u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupAddTo":"\u4E3A {{p0}} \u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupNew":"\u65B0\u5B50\u5206\u7EC4","todo.settings.localGroupRemoveSubgroups":"\u4ECD\u6709\u5B50\u5206\u7EC4 \u2014 \u8BF7\u5148\u79FB\u9664\u6216\u79FB\u52A8\u5B83\u4EEC","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002","todo.info.todayTodo":"\u4ECA\u5929\u5F85\u529E","todo.info.todayCompleted":"\u4ECA\u5929\u5DF2\u5B8C\u6210","todo.info.weekTodo":"\u672C\u5468\u5F85\u529E","todo.info.weekCompleted":"\u672C\u5468\u5DF2\u5B8C\u6210","todo.info.allTodo":"\u5168\u90E8\u5F85\u529E","todo.info.allCompleted":"\u5168\u90E8\u5DF2\u5B8C\u6210","todo.info.list":"\u5217\u8868","todo.info.tasks":"\u4EFB\u52A1","todo.info.open":"\u672A\u5B8C\u6210","todo.info.completed":"\u5B8C\u6210","todo.info.overdue":"\u5DF2\u903E\u671F","todo.info.dueToday":"\u4ECA\u5929\u5230\u671F","todo.info.next7":"\u672A\u6765 7 \u5929","todo.info.noDate":"\u65E0\u65E5\u671F","todo.info.flagged":"\u5DF2\u6807\u8BB0","todo.info.reminder":"\u6709\u63D0\u9192","todo.info.priority":"\u4F18\u5148\u7EA7","todo.info.groups":"\u5206\u7EC4","todo.info.tags":"\u6807\u7B7E","todo.info.estimated":"\u9884\u8BA1\u65F6\u95F4","todo.info.nextDue":"\u4E0B\u4E00\u4E2A\u5230\u671F","todo.info.lastCompleted":"\u6700\u8FD1\u5B8C\u6210","todo.info.lastChange":"\u6700\u8FD1\u66F4\u6539","todo.info.created":"\u521B\u5EFA\u65F6\u95F4","todo.info.minutes":"{{minutes}} \u5206\u949F","todo.info.hours":"{{hours}} \u5C0F\u65F6","todo.info.hoursMinutes":"{{hours}} \u5C0F\u65F6 {{minutes}} \u5206\u949F"};var fl={en:ll,de:cl,es:ul,fr:pl,"zh-CN":ml};function $i(e,t){return(fl.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var gl=$i,hl=$i;function bl(e){e.ui.registerCatalogs(fl),hl=(t,r)=>{let n=e.ui.t(t,r);return n===t?$i(t,r):n}}function d(e,t){return hl(e,t)}var yl={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Bm={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},Hm={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},wl=()=>{};function vl(e){wl=e}function xl(e){let t=yl[e];return t?d(t):e}function pt(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=wl(e);if(r)return r;let n=yl[e];return n?d(n):t||e}function Ve(e){return d(Bm[e])}function Tl(e){return d(Hm[e])}function Wm(e){if(typeof e!="string"||!yn(e))return!1;let t=vr(e);if(!t)return!1;let r=yi();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function Mn(e){let t=e&&typeof e=="object"?e:{},r=kn(t.custom),n=new Set(r.map(A=>A.id)),a=Array.isArray(t.active)?t.active:po,i=[];for(let A of a)typeof A!="string"||!(Ei.has(A)||n.has(A))||i.includes(A)||i.push(A);let s=[...Vo,...r.map(A=>A.id)],c=A=>A&&typeof A=="object"?A:{},p=c(t.colors),l=Object.fromEntries(s.map(A=>{let H=jo.get(A)?.color??Tn;return[A,Wm(p[A])?p[A]:H]})),u=c(t.textColors),g=Object.fromEntries(s.map(A=>[A,Si.includes(u[A])?u[A]:"auto"])),h=c(t.strikethrough),m=Object.fromEntries(s.map(A=>[A,typeof h[A]=="boolean"?h[A]:Ud.includes(A)||r.some(H=>H.id===A&&H.done)])),w="text",v=(A,H)=>typeof A=="string"?A.replace(/[\u0000-\u001f]/g," ").trim().slice(0,H):"",P=(Array.isArray(t.removed)?t.removed:[]).filter(A=>typeof A=="string"&&Ei.has(A)),O=Object.fromEntries(s.map(A=>[A,v(c(t.labels)[A],Ko)]).filter(([,A])=>A)),M=Object.fromEntries(s.filter(A=>A!=="open"&&A!=="completed").map(A=>[A,v(c(t.icons)[A],80)]).filter(([,A])=>A&&/^[^/\\]+$/.test(A))),N=Object.fromEntries(po.map(A=>[A,c(t.done)[A]]).filter(([A,H])=>typeof H=="boolean"&&H!==jo.get(A)?.done));return{active:i.filter(A=>!P.includes(A)),custom:r,colors:l,textColors:g,strikethrough:m,style:w,labels:O,icons:M,done:N,removed:[...new Set(P)]}}var Nr=null;function Ge(){let e=f?.settings.get()[xn],t=yi();if(Nr&&Nr.raw===e&&Nr.palette===t)return Nr.value;let r=Mn(e);return Nr={raw:e,palette:t,value:r},r}function kl(e){f.settings.set(xn,Mn(e))}vl(e=>{let t=Ge();return t.labels[e]??t.custom.find(r=>r.id===e)?.label});function ho(e=Ge()){return[...Vo,...e.custom.map(t=>t.id)]}function Zt(e,t=Ge()){return Di(e,t)}function De(e,t){return jd(e,t??Ge())}function qm(e){return`todo-st-${e}`}function Ym(e,t=Ge()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":Vt(t.colors[e]??Tn)}function Ce(e,t=Ge()){let r=e&&ct(e)?t.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??Tn,done:r.done,cls:qm(r.id),locked:!1,custom:!0};let n=e&&jo.get(e)||Ai[0];return{...n,label:t.labels[n.id]??pt(n.id),done:t.done[n.id]??n.done,color:t.colors[n.id],custom:!1}}function On(e=Ge()){return[Ce("open",e),Ce("completed",e),...e.active.map(t=>Ce(t,e))]}function bo(){return On().map(e=>e.id)}function Sl(e){return e==="open"||e==="completed"||Ge().active.includes(e)}function St(){let[e,t]=o.useState(()=>On());return o.useEffect(()=>f.settings.subscribe(()=>t(On())),[]),e}function Ho(e,t=bo()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function Wo(e,t){return t==="all"||t.includes(Le(e))}function At(){return On().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:Ee(e.color)}))}function Xm(){let e=Ge();return ho(e).map(t=>{let r=Ce(t,e),n=Ee(r.color),a=Ym(t,e),i=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${a}}`+i}).join("")}function Al(){let[e,t]=o.useState(()=>Ge().style);return o.useEffect(()=>f.settings.subscribe(()=>t(Ge().style)),[]),e}function El(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Xm()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}var Zm=200,Ui=new WeakMap;function Jm(e){let t=Ui.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=Dn.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=Kd(i,a);if(!s){r.full=!0,r.dirty.clear();return}for(let c of s)r.dirty.add(c);r.dirty.size>Zm&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Ui.delete(e)}),Ui.set(e,r),t=r,t}var _n=new WeakMap;function Qm(e){let t=_n.get(e);if(!t){let r=e.api.backend.call("records.completionReady").then(n=>n===!0,()=>!1);r.then(n=>{!n&&_n.get(e)===r&&_n.delete(e)}),_n.set(e,r),t=r}return t}async function Cl(e,t,r){let n=[],a=new Map,i=Xe(e.api.getState().groups);for(let p=0;p<(r?.length??1);p+=100){let{tasks:l,relations:u}=await Pi(e,!1,r?.slice(p,p+100));for(let g of l)typeof g.completedAt=="string"&&g.completedAt&&a.set(String(g.id),g.completedAt);n.push(...Ht(l,u,i))}let s=t?[]:n.filter(p=>!a.has(p.id)).map(p=>p.id),c=s.length?await dl(e.api,s,e.assertActive,()=>ho()):new Map;return n.map(p=>{let l=a.get(p.id);return{...p,historyLoaded:!1,completionSummary:l?{changedAt:l}:c.get(p.id)??null}})}function rt(e=ve()){try{e.assertActive()}catch(t){return Promise.reject(t)}return Qm(e).then(t=>ef(e,t))}function ef(e,t){let r=Jm(e);return Er(e,"list",Dn,"",async()=>{let n=JSON.stringify(Xe(e.api.getState().groups));if(r.full||!r.value||r.groups!==n){r.full=!1,r.dirty.clear();try{r.value=await Cl(e,t),r.groups=n}catch(l){throw r.full=!0,l}return r.value}if(!r.dirty.size)return r.value;let a=[...r.dirty];r.dirty.clear();let i;try{i=await Cl(e,t,a)}catch(l){for(let u of a)r.dirty.add(u);throw l}let s=new Map(i.map(l=>[l.id,l])),c=new Set(a),p=[];for(let l of r.value)if(!c.has(l.id))p.push(l);else{let u=s.get(l.id);u&&(p.push(u),s.delete(l.id))}return p.push(...s.values()),r.value=p,p})}var ji="localGroups",Lr=200,Yo=60,qo=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function Ki(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Vi(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(i=>[i.name,...i.aliases??[]]).map(Q)),n=new Set,a=[];for(let i of e){if(!i||typeof i!="object")continue;let s=i,c=qo(s.id,64),p=qo(s.name,Yo),l=qo(s.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(c)||n.has(c)||!p||r.has(Q(p))||!l)continue;let u=Array.isArray(s.aliases)?[...new Set(s.aliases.map(h=>qo(h,Yo)).filter(h=>h&&Q(h)!==Q(p)&&!r.has(Q(h))))].slice(0,20):[];n.add(c),r.add(Q(p)),u.forEach(h=>r.add(Q(h)));let g=qo(s.parent,64);if(a.push({id:c,name:p,color:l,...u.length?{aliases:u}:{},.../^local-[a-z0-9]{1,32}$/.test(g)?{parent:g}:{}}),a.length>=Lr)break}return Go(a)}function Dl(e,t){let r=qo(t,Yo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>Q(a)!==Q(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Bi(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{},...r.parent?{parent:r.parent}:{}}))]}var Xi="useSharedGroups",Zi="useLocalGroups";function Wi(){let e=f?.settings.get()??{};return{shared:e[Xi]!==!1,local:e[Zi]!==!1}}function zn(){return Xe(f?.getState().groups)}function Xo(){return Vi(f?.settings.get()[ji],zn())}async function Ji(e){await f.settings.set(ji,Vi(e,zn()))}var Nl="groupOrder";function Ll(e){let t=f?.settings.get()[Nl],r=Array.isArray(t)?t.filter(a=>typeof a=="string"):[];if(!r.length)return e;let n=new Map(r.map((a,i)=>[a,i]));return e.filter(a=>a.parent===void 0).map((a,i)=>({group:a,at:n.get(a.id)??r.length+i})).sort((a,i)=>a.at-i.at).flatMap(({group:a})=>[a,...e.filter(i=>i.parent===a.id)])}function yo(){return Ll(Bi(zn(),Xo()))}function nt(){let e=Wi();return Ll(Bi(e.shared?zn():[],e.local?Xo():[]))}rl(yo);var Il;il(()=>(f&&Il!==f&&(Il=f,f.subscribe(Nn),f.settings.subscribe(Nn)),f?yo():[]));function Pr(e){let t=f.subscribe(e),r=f.settings.subscribe(e);return()=>{t(),r()}}function ht(){let[e,t]=o.useState(nt);return o.useEffect(()=>Pr(()=>t(nt())),[]),e}function Pl(){let[e,t]=o.useState(yo);return o.useEffect(()=>Pr(()=>t(yo())),[]),e}function Ol(){let[e,t]=o.useState(Wi);return o.useEffect(()=>f.settings.subscribe(()=>t(Wi())),[]),e}function Ml(){let[e,t]=o.useState(Xo);return o.useEffect(()=>Pr(()=>t(Xo())),[]),e}var qi="collapsedGroups";function Hi(){let e=f?.settings.get()[qi];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _l(){let[e,t]=o.useState(Hi);o.useEffect(()=>f.settings.subscribe(()=>t(a=>{let i=Hi();return i.length===a.length&&i.every((s,c)=>s===a[c])?a:i})),[]);let r=o.useCallback(a=>{let i=Hi(),s=i.includes(a)?i.filter(c=>c!==a):[...i,a];t(s),f.settings.set(qi,s)},[]),n=o.useCallback(a=>{t(a),f.settings.set(qi,a)},[]);return[o.useMemo(()=>new Set(e),[e]),r,n]}var Yi=e=>/^local-[a-z0-9]{1,32}$/.test(e);function zl(e,t,r,n,a=!1){let i=nt(),s=i.find(h=>h.id===e);if(!s)return null;let c=n>0||n===0&&s.parent!==void 0,p=a&&r==="after"?i.filter(h=>h.parent===t).at(-1):void 0,l=p?Ro(i,e,p.id,"after",!1):Ro(i,e,t,r,c);if(!l||l.parent===null||Yi(l.parent)===Yi(e))return l;let u=i.filter(h=>h.id!==e&&h.parent!==e);return{parent:null,before:u.slice(u.findIndex(h=>h.id===l.parent)+1).find(h=>h.parent===void 0)?.id??null}}async function Qi(e,t){let r=async s=>{Yi(e)?await Ji(xr(Xo(),e,s)):await f.sharedState.mutateGroup({kind:"move",id:e,...s})};if(t.parent!==null){await r(t);return}let n=yo(),a=n.filter(s=>s.parent===void 0&&s.id!==e).map(s=>s.id),i=t.before===null?-1:a.indexOf(t.before);a.splice(i<0?a.length:i,0,e),await f.settings.set(Nl,a),n.find(s=>s.id===e)?.parent!==void 0&&await r({parent:null,before:null})}function Gl(){let e=ve(),t=!1,r=()=>{rt(e).then(a=>{if(e.assertActive(),t)return;let i=new Set(Xo().flatMap(s=>[s.name,...s.aliases??[]]).map(Q));e.api.workspace.reportGroupUsage(Ti(a.map(s=>s.group).filter(s=>!s||!i.has(Q(s)))))}).catch(()=>{})};r();let n=Wt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function tf(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function of(e){let t=e.toLowerCase();return tf(t)?t:"yyyy-mm-dd"}function Rl(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return of(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var rf="ddd d mmm",nf=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function af(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!nf.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function sf(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return af(t)?t:rf}var Or=new Map;function df(e,t,r){let n=`${r??""}:${t}`,a=Or.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Or.size>=64&&Or.delete(Or.keys().next().value),Or.set(n,a)),a.format(e)}function Fl(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,c=new Date(Number(a),Number(i)-1,Number(s),12);return sf(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?a:df(c,p,r))}function ce(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Gn(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function Et(e,t){let r=Gn(e);return r?(r.setDate(r.getDate()+t),ce(r)):e}var Ze=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}],Mr={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},Rn={high:3,medium:2,low:1,normal:0},$l=new Intl.Collator(void 0,{sensitivity:"base"});function wo(e,t){return $l.compare(e.title,t.title)}function lf(e,t,r){if(r==="name")return wo(e,t);if(r==="priority"){let i=Rn[t.priority]-Rn[e.priority];return i!==0?i:Ct(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:Ct(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return Ct(e,t);if(!i)return-1;if(!s)return 1;let c=i.localeCompare(s);return c!==0?c:Ct(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:wo(e,t)}function es(e,t){let r=Rn[t.priority]-Rn[e.priority];return r!==0?r:wo(e,t)}function Ct(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return es(e,t)}function Ul(e,t,r){let n=new Map(e.map(i=>[i,t(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,s)=>{let c=n.get(i),p=n.get(s);if(a(c)!==a(p))return a(c)?1:-1;let l=0;return!a(c)&&!a(p)&&(l=typeof c=="number"&&typeof p=="number"?c-p:$l.compare(String(c),String(p))),l!==0?r==="asc"?l:-l:wo(i,s)})}function Zo(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",c=a.dueDate||"";if(!s&&!c)return Ct(n,a);if(!s)return-1;if(!c)return 1;let p=c.localeCompare(s);return p!==0?p:Ct(n,a)}let i=lf(n,a,t);return r==="asc"?i:-i})}function Be(e,t="dd-mm-yyyy"){return e?Rl(e,t):""}function Fn(e,t,r="ddd d mmm"){return Fl(e.slice(0,10),r,t)}function at(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,c,p]=i.split("-").map(Number),[l,u,g]=t.split("-").map(Number);if(!s||!c||!p||!l||!u||!g)return Be(e,a);let h=new Date(s,c-1,p),m=new Date(l,u-1,g),w=Math.round((h.getTime()-m.getTime())/864e5);return w===1?r.tomorrow:w===-1?r.yesterday:w>1&&w<7?h.toLocaleDateString(n,{weekday:"long"}):Be(e,a)}var sx=new Date(2023,0,1,12);var cf={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function _r(e){return cf[e??""]??1}function jl(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function uf(e,t){return(e.getDay()-t+7)%7}function Kl(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-uf(e,t))}function vo(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var zr=["overdue","today","upcoming","someday","completed"],Vl={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"},bt=(e=new Date)=>ce(e);function $n(e,t=bt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||Ct(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(Ct),r.someday.sort(es),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||wo(a,i)),r}function ts(e){return Pn(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function os(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):bt(t)}function Bl(e){let t=new Map(e.map(a=>[a,ts(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||wo(a,i)),n=new Map;for(let a of r){let i=os(t.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function rs(e,t,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?t==="monthly"?c.slice(0,7):t==="daily"?c:bt(Kl(vo(c),r)):"",s=new Map;for(let c of e){let p=i(a(c)),l=s.get(p);l?l.push(c):s.set(p,[c])}return[...s.entries()].sort(([c],[p])=>c===""?-1:p===""?1:p.localeCompare(c)).map(([c,p])=>({key:c,kind:c?t:"none",todos:p}))}function Un(e,t=bt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,c,p)=>{let l=p.toLowerCase();if(l==="today")r=t;else if(l==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=bt(u)}else r=p;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,c,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var He={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},Hl={open:He,get:He,"edit-fields":He,add:He,complete:He,done:He,reopen:He,cancel:He,pause:He,status:He,edit:He,"open-page":{type:"null"},search:{type:"array",items:He,maxItems:20},list:{type:"array",items:He,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:He,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Jt={type:"string"},ns={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Jt])),priority:{type:"string",enum:go},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Jt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Jt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Wl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in ns.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!go.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!bo().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!Vd(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}var Ie=e=>typeof e=="string"?e:"",Zl=e=>Ie(e?.query).trim();function Jo(){return new Date().toISOString()}function ql(e){let t=e.trim();if(!t)return;let r=gt(nt(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function Yl(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return ce();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),ce(t)}return e}function pf(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function jn(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function mf(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}function Vn(){let e=ve(),t={groups:Xe(e.api.getState().groups),assertActive:e.assertActive};return{light:(r,n={})=>Qd(e.api,r,{...t,...n}),byIds:r=>el(e.api,r,t)}}async function as(e){let t=e.trim();if(!t)throw new Error("Expected a todo id or title.");let r=Vn(),n=await r.light(["id","title"],{where:{id:t}}),a=mf(n.length?n:await r.light(["id","title"]),e),[i]=await r.byIds([a.id]);if(!i)throw new Error(`No todo matching "${t}".`);return i}var Kn={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=Zl(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Gr(e,t,r){let n=await as(e),a=t(n),i=await Gi(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await Cr(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Cr(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function Xl(e){return Gr(e,t=>({...t,completed:!0,status:"completed",updatedAt:Jo()}),t=>`Complete \u201C${t.title}\u201D`)}async function ff(e,t,r){let n=await ot(e);if(!n)throw new Error("The task no longer exists.");if(r!==void 0&&n.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&t.group!==n.group&&!ke(nt()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let a=Cn({...n,...t,...t.status?De(t.status):t.completed!==void 0?De(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:Jo()});if(t.filePath&&a.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(t[s]?.some(c=>!a[s]?.includes(c)))throw new Error(`Invalid task ${s}.`);let i=await Gi(e,a,n.updatedAt);if(!i)throw new Error("Could not save the task.");return{value:a,revert:{label:`Edit \u201C${n.title}\u201D`,run:async()=>{if(!await Cr(e,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Cr(e,i))throw new Error("Could not reapply the task edit.")}}}}async function Dt(e){let t=e??{},r=t.id??t.query,n={groups:nt(),statuses:bo()};if(!r)return n;let a=await as(r);return{...n,records:[a]}}function Jl(e){let t=n=>{let a=Hl[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Jt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Ie(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await ot(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),ze().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Jt},required:["id"],additionalProperties:!1},parse:n=>{let a=Ie(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await ot(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Jt,values:ns,expectedUpdatedAt:Jt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Ie(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:Wl(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>ff(n,a,i),revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Ie(a.due),priority:Ie(a.priority),status:Ie(a.status),note:Ie(a.note),group:Ie(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:c,group:p})=>{let l=bo();if(s&&!l.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${l.join(", ")}`);let u=Cn({title:n,priority:i||"normal",status:s||void 0,dueDate:Yl(a),note:c,group:ql(p)});if(!await qt(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Yt(u.id)},reapply:async()=>{await qt(u)}}}},formatCli:n=>`Added: ${jn(n)}`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Kn,run:({query:n})=>Xl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Kn,run:({query:n})=>Xl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=Zl(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=Ri(n),i=Vn(),s=await i.light(["id","title","note"],{withTags:Dr(n).tags.length>0});return i.byIds(s.filter(c=>a(c.tags,c.title,c.note)).slice(0,20).map(c=>c.id))},formatCli:n=>n.length?n.map(jn).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Kn,run:({query:n})=>Gr(n,a=>({...a,completed:!1,status:"open",updatedAt:Jo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>Dt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Kn,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!Sl(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return Gr(a,s=>({...s,...De(i),updatedAt:Jo()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>Dt(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim(),s=Ie(a.status),c=bo();if(!i||!c.includes(s))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>Gr(n,i=>({...i,...De(a),updatedAt:Jo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim(),s=Ie(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!go.includes(s))throw new Error(`Invalid priority "${s}". One of: ${go.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?pf(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:c,tags:p,group:l})=>Gr(n,u=>({...u,title:a??u.title,priority:i??u.priority,dueDate:s===void 0?u.dueDate:Yl(s),note:c??u.note,tags:p??u.tags,group:l===void 0?u.group:ql(l),updatedAt:Jo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${jn(n)}`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await as(n);if(!a)return{value:{deleted:!1,todo:i,deletedCount:0},revert:null};if(!await Yt(i.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:i,deletedCount:1},revert:{label:`Delete \u201C${i.title}\u201D`,run:async()=>{await qt(i)},reapply:async()=>{await Yt(i.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>Dt(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Ie(a.section),q:Ie(a.q)}},fromCli:(n,a)=>({section:Ie(a.section),q:Ie(a.q??a.search)})},run:async({section:n,q:a})=>{let i;if(a){let s=Ri(a),c=Dr(a);if(c.tags.length||c.text){let p=Vn(),l=(await p.light(["id","title","note"],{withTags:c.tags.length>0})).filter(u=>s(u.tags,u.title,u.note)).map(u=>u.id);l.length<=tl&&(i=await p.byIds(l))}i??(i=(await Oi()).filter(p=>s(p.tags,p.title,p.note)))}return i??(i=await Oi()),n&&zr.includes(n)?$n(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(jn).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Vn().light(["id","title","group"]),a=nt();return ke(a).map(i=>({name:i,count:n.filter(s=>kt(i).has(Q(s.group??""))).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var Ql={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var hf=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,bf=/^-\s+(.*)$/,yf=/^[A-Za-z][\w+.-]*:\/\//;function ec(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(bf);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=yf.test(a)?null:a.match(hf);if(s){let c=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=c,t.lists[c]=t.lists[c]??[]):(r=null,t.values[c]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function tc(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}async function Bn(e){if(!e.id||!e.title.trim())return!1;let t=await qt(e);return t&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Yt(e.id)}),redo:async()=>({ok:await qt(e)})}),t}async function xo(e,t,r,n){if(!e||!t.title.trim())return!1;let a=Pn(t),i=a?{...t}:t;a&&(delete i.historyLoaded,delete i.completionSummary);let s=await Mi(e,i,r,n),c=s?.previous,p=c?.title?{...c,group:Fo(c.group,Xe(f.getState().groups))??c.group}:null,l=a?{...i,history:t.history===void 0?p?.history:t.history}:t,u=s!==null;return u&&p&&f.undo.push({label:d("todo.undo.edit",{title:p.title}),undo:async()=>({ok:await zi(e,p)}),redo:async()=>({ok:await zi(e,l)})}),u}async function Hn(e){let t=await ot(e),r=await Yt(e);return r&&t&&f.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await qt(t)}),redo:async()=>({ok:await Yt(e)})}),r}async function Qt(e,t){return await f.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function is(e,t){let r=await ot(e);return r?xo(e,{...r,...De(t),updatedAt:new Date().toISOString()}):!1}var ss="notes-todo-fence-styles";function wf(){if(document.getElementById(ss))return;let e=document.createElement("style");e.id=ss,e.textContent=`
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
`,document.head.appendChild(e)}var oc=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},vf=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function xf(e,t){let r=oc(),n=vf(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Tf=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=ve(),g=!0,h=()=>{rt(u).then(w=>{u.assertActive(),g&&r(w)}).catch(()=>{})};h();let m=Wt(h);return()=>{g=!1,m()}},[]);let n=ec(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:tc(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let c=xf(t,s),p=oc(),l=u=>{let g={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(h=>h&&h.map(m=>m.id===u.id?g:m)),xo(u.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>f.workspace.openMainTab({newTab:f.ui.hasModKey(u)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},c.length,s.due?` \xB7 ${s.due}`:"")),c.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),c.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>l(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},Ze.find(g=>g.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function rc(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(wf(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(Tf,{code:t}))),{examples:Ql.todo});return()=>{e(),document.getElementById(ss)?.remove()}}var ls=".valley/assets/icons/todo-icon",kf=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),Sf=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function Af(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let t=new DOMParser().parseFromString(e,"image/svg+xml"),r=t.documentElement;if(r.localName!=="svg"||t.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!kf.has(n.tagName)){n.remove();continue}for(let a of[...n.attributes])(!Sf.has(a.name)||/url\s*\(|javascript:|expression\s*\(/i.test(a.value))&&n.removeAttribute(a.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function Ef(e,t){let n=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;for(let c of n.querySelectorAll("*"))for(let p of["stroke","fill"]){let l=c.getAttribute(p);l&&l!=="none"&&c.setAttribute(p,"#000")}let a=n.getAttribute("fill")==="none"?"none":"#000",i=[...n.childNodes].map(c=>new XMLSerializer().serializeToString(c)).join(""),s=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${a}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${i}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${s})"/></svg>`}function Wn(){return f.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function ds(){let e=Wn();return e.pending||(e.pending=f.backend.call("taskIcons",{}).then(t=>{let r={};for(let[n,a]of Object.entries(t?.icons??{})){let i=Af(a);i&&(r[n]=Ef(n,i))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function nc(){return Wn().revision}function ac(e){return e?Wn().icons[e]:void 0}function qn(){let e=Wn();return o.useEffect(()=>{e.loaded||ds()},[e]),o.useSyncExternalStore(o.useCallback(t=>(e.listeners.add(t),()=>{e.listeners.delete(t)}),[e]),()=>e.revision),e.icons}function ic(){ds();let e,t=f.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${ls}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{ds()},150))});return()=>{window.clearTimeout(e),t()}}function sc(e){let r=f?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var Z=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),eo=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Cf=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Df=e=>o.createElement(eo,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),If=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Nf=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Lf=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Pf=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Of=e=>o.createElement(eo,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Mf={inprogress:If,waiting:Nf,onhold:Df,delegated:Lf,deferred:Pf,completed:Of,canceled:Cf},xe=({status:e,dotCls:t,color:r})=>{let n=r?{color:r}:void 0,a=ac(sc(e??"open"));if(a)return o.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${t}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:a}});let i=e?Mf[e]:void 0;return i?o.createElement(i,{className:`todo-status-menu-svg ${t}`,style:n}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:n})},to=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),It=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Te=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Qo=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),dc=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),lc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),cc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Yn=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),Xn=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Rr=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Fr=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),uc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),pc=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),mc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),er=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Oe=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),fc=e=>o.createElement(eo,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),gc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Zn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),hc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"})),We=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),oo=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),bc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),yc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),To=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),ko=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),wc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),Jn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),vc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Je=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),ro=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),Nt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),Qn=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),ea=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),ta=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),$r=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Ur=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),yt=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),jr=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Kr=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),oa=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),xc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m7 20 5-5 5 5M7 4l5 5 5-5"})),tr=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),ra=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),na=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),Tc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),aa=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),or=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),kc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Sc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"})),Ac=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Ec=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 12h14"})),Cc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),ia=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),sa=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"}));function Vr(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var rr=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let a=o.useRef(null),[i,s]=o.useState([]),[c,p]=o.useState("idle"),[l,u]=o.useState(-1),[g,h]=o.useState(!1),m=o.useRef(null),w=o.useRef(0),v=o.useRef(!1);o.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),o.useEffect(()=>{n&&a.current?.focus()},[n]);let P=N=>{m.current!==null&&window.clearTimeout(m.current);let A=++w.current;if(N.trim().length<2){s([]),p("idle"),h(!1);return}h(!0),p("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:N.trim(),kinds:["place"],limit:8}).then(H=>{A===w.current&&(s(H),u(H.length?0:-1),p("done"))},()=>{A===w.current&&(s([]),u(-1),p("failed"))})},250)},O=N=>{let A=Number(N.metadata?.longitude),H=Number(N.metadata?.latitude),ee=(N.value??N.label).trim();v.current=!0,w.current++,a.current&&(a.current.value=ee),h(!1),s([]),t({name:ee,...Number.isFinite(A)&&Number.isFinite(H)?{lng:A,lat:H}:{}})},M=()=>{let N=a.current?.value.trim()??"";if(w.current++,h(!1),v.current){v.current=!1;return}N!==(e?.name??"")&&t(N?{name:N}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(It,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:N=>{v.current=!1,P(N.currentTarget.value)},onFocus:N=>{N.currentTarget.value.trim().length>=2&&i.length&&h(!0)},onBlur:M,onKeyDown:N=>{N.nativeEvent.isComposing||(N.key==="ArrowDown"&&i.length?(N.preventDefault(),h(!0),u(A=>(A+1)%i.length)):N.key==="ArrowUp"&&i.length?(N.preventDefault(),u(A=>A<=0?i.length-1:A-1)):N.key==="Enter"?(N.preventDefault(),g&&i[l]?O(i[l]):M()):N.key==="Escape"&&g&&(N.preventDefault(),N.stopPropagation(),w.current++,h(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>Vr(e)},o.createElement(vc,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:N=>N.preventDefault(),onClick:()=>{w.current++,a.current&&(a.current.value=""),s([]),h(!1),t(void 0)}},o.createElement(Te,null)))),g&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},c==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),c==="failed"&&o.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),i.map((N,A)=>o.createElement("li",{key:N.id,role:"option","aria-selected":A===l},o.createElement("button",{type:"button",className:"todo-location-hit"+(A===l?" is-active":""),onMouseDown:H=>H.preventDefault(),onMouseEnter:()=>u(A),onClick:()=>O(N)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(Je,null),N.label),N.description&&o.createElement("span",{className:"todo-location-hit-context"},N.description))))))};function _f(){try{return _r(f?.getState().weekStart)}catch{return 1}}function Ic(e,t=_f()){let r=vo(e).getDay();return Et(e,6-(r-t+7)%7)}var Fe={kind:"smart",id:"all"},da=[{id:"scheduled",labelKey:"todo.view.scheduled",color:we("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:we("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:we("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:we("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:we("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:we("green"),dated:!1}],Br=da.map(e=>e.id);function cs(e){let t=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(t.order)?t.order:[])typeof l=="string"&&Br.includes(l)&&!r.includes(l)&&r.push(l);Br.forEach((l,u)=>{if(r.includes(l))return;let g=Br.slice(0,u).reverse().find(h=>r.includes(h));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=t.colors&&typeof t.colors=="object"?t.colors:{},s={};for(let l of Br){let u=i[l];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(s[l]=u)}let c=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let l of Br){let u=c[l];(u==="white"||u==="black")&&(p[l]=u)}return{order:r,hidden:a,colors:s,textColors:p}}function Nc(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>So(t,e))}function So(e,t){let r=da.find(i=>i.id===e)??da.find(i=>i.id==="all"),n=t?.colors[r.id],a=t?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function Hr(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}var Dc=new WeakMap;function zf(e){let t=Dc.get(e),r=sl();if(t&&t.names===e.names&&t.count===e.names.length&&t.revision===r)return t.keys;let n=new Set(e.names.flatMap(a=>[...kt(a)]));return Dc.set(e,{names:e.names,count:e.names.length,revision:r,keys:n}),n}function us(e,t,r=ce(new Date)){if(t.kind==="groups")return e.group?zf(t).has(Q(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=Ic(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function la(e,t,r,n=ce(new Date)){return us(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Lc(e,t=ce(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=Ic(t);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++,i<=n&&r.week++)}return r}function ps(e,t=!0){let r=new Map,n=0;for(let a of e){if(t&&a.completed)continue;let i=Q(a.group??"");r.set(i,(r.get(i)??0)+1),a.group||n++}return{byKey:r,ungrouped:n}}function ca(e,t){if(t===null)return e.ungrouped;let r=0;for(let n of kt(t))r+=e.byKey.get(n)??0;return r}function it(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Gf=da.map(e=>e.id);function Wr(e){if(typeof e!="string")return Fe;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Fe}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Fe}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Fe;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Fe}catch{return Fe}return Gf.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Fe}function ua(e,t){return it(e)===it(t)}var Rf=300,Ff=["group","notes","status","location","tags"],$f="todo.view",Uf="todo.showCompleted",jf="todo.statusFilter",Kf="todo.search",Vf="todo.pageSort",hs="panelChip",Oc="pageShowCompleted",ms="statusFilter",bs="dateBreakdown",Mc="smartLists",nr="pageSearch",_c="pageSort",Bf={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},zc=["due","priority","flagged","updated","created","name"];function Pc(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:zc.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Ho(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function ha(e){let t=Bf[e],r=o.useCallback(()=>Pc(f.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(c=>{let p=Pc({...c,...s});return f.settings.set(t,p),p})},[t]);return[n,i]}function pa(){let e=f.settings.get()[bs];return e==="weekly"||e==="daily"?e:"monthly"}function ba(){let[e,t]=o.useState(pa);return o.useEffect(()=>f.settings.subscribe(()=>t(pa())),[]),e}function ir(){return f.runtime.getOrCreate($f,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function ya(){return f.runtime.getOrCreate(Uf,()=>({show:null,listeners:new Set}))}function wa(){return f.runtime.getOrCreate(jf,()=>({filter:null,listeners:new Set}))}function ar(){return f.runtime.getOrCreate(Kf,()=>({query:null,listeners:new Set}))}function va(){return f.runtime.getOrCreate(Vf,()=>({value:null,listeners:new Set}))}function Lt(){let e=ir();return e.view||(e.view=Wr(f.settings.get()[hs]),e.history=[e.view],e.historyIndex=0),e.view}function st(e){let t=ir();if(Lt(),t.view&&ua(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(hs,it(e));for(let n of t.listeners)n(e)}function xa(){let e=ir();return Lt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function sr(e){let t=ir();Lt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(hs,it(t.view));for(let n of t.listeners)n(t.view)}}function qr(e){let t=ir();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function Gc(){fa();let e=ir();e.view=null,e.history=[],e.historyIndex=-1,ya().show=null,wa().filter=null,ar().query=null,va().value=null}function ma(){return cs(f.settings.get()[Mc])}function Rc(e){f.settings.set(Mc,cs(e))}function Ta(){let[e,t]=o.useState(ma);return o.useEffect(()=>f.settings.subscribe(()=>t(ma())),[]),e}function fa(){let e=ar(),t=e.pending;t&&(e.pending=void 0,clearTimeout(t.timer),t.forget(),e.query!==null&&t.write(e.query))}function ka(e){let t=ar(),r=e.slice(0,500);if(t.query===r)return;t.query=r;for(let s of t.listeners)s(r);if(r===""){t.pending&&(clearTimeout(t.pending.timer),t.pending.forget(),t.pending=void 0),f.settings.set(nr,r);return}t.pending&&clearTimeout(t.pending.timer);let n=f,a=s=>{n.settings.set(nr,s).catch(()=>{})},i=t.pending?.forget??ve()?.onDispose(fa)??(()=>{});t.pending={timer:setTimeout(fa,Rf),write:a,forget:i}}function Sa(){let e=()=>{let n=ar();return n.query===null&&(n.query=typeof f.settings.get()[nr]=="string"?String(f.settings.get()[nr]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=ar();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,ka]}function ys(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||Ff.includes(t.field)||zc.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function Fc(){let e=va();return e.value||(e.value=ys(f.settings.get()[_c])),e.value}function $c(e){let t=va(),r=ys(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(_c,r);for(let n of t.listeners)n(r)}}function Uc(){let[e,t]=o.useState(Fc);return o.useEffect(()=>{let r=va();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,$c]}function Aa(e=Lt()){return{v:1,view:it(e),showCompleted:gs(),statusFilter:ga(),search:ar().query??(typeof f.settings.get()[nr]=="string"?String(f.settings.get()[nr]).slice(0,500):""),sort:Fc()}}function Ea(e,t=!1){return e.v!==1?!1:(t||st(Wr(e.view)),Ot(e.showCompleted===!0),fs(Ho(e.statusFilter)),ka(typeof e.search=="string"?e.search:""),fa(),$c(ys(e.sort)),!0)}function ga(){let e=wa();if(e.filter===null){let t=f.settings.get()[ms];e.filter=Ho(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(ms,e.filter)}return e.filter}function fs(e){let t=wa(),r=Ho(e),n=t.filter??ga();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,f.settings.set(ms,r);for(let a of t.listeners)a(r)}}function Pt(){let[e,t]=o.useState(ga);return o.useEffect(()=>{let r=wa();r.listeners.add(t);let n=f.settings.subscribe(()=>{let a=Ho(r.filter??ga());fs(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,fs]}function Ca(){let[e,t]=o.useState(Lt);return o.useEffect(()=>qr(t),[]),e}function gs(){let e=ya();return e.show===null&&(e.show=f.settings.get()[Oc]===!0),e.show}function Ot(e){let t=ya();if(t.show!==e){t.show=e,f.settings.set(Oc,e);for(let r of t.listeners)r(e)}}function Mt(){let[e,t]=o.useState(gs);return o.useEffect(()=>{let r=ya();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Ot(!gs())]}function Kc(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(_o).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}function Vc(e,t){return An(e)?e:t}function Hf(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Wf(e,t){return e.dueDate?{badges:Hf(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Pe(e.group,t)}:{}}:null}function qf(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Vc(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:De(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Da(e){return ot(e)}function jc(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var ws="attachment:",vs="url:";function Yf(){return!0}function Xf(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:jc(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${ws}${i}`,label:jc(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${vs}${i}`,label:i,icon:"link"}))}),e.location&&Yf()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Zf(e,t){if(t.startsWith(ws)){let r=t.slice(ws.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(vs)){let r=t.slice(vs.length);if(!(e.urls??[]).includes(r))return!1;let n=Uo(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),st(e.completed?{kind:"smart",id:"completed"}:Fe),ze().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Vr(e.location),!0):!1;default:return!1}}function Bc(){let e=ve(),t=uo("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:u,limit:g,cursor:h})=>{let m,w=()=>`${t}:${r}`;if(h){let N;try{N=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!N||N.startDate!==l||N.endDate!==u||N.limit!==g||N.revision!==w()||typeof N.cursor!="string"||!N.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=N.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let v=w(),P=await Zd(l,u,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&v!==w())throw new Error("Calendar source cursor is stale; restart the range.");let O=nt(),M=w();return{items:P.todos.map(N=>Wf(N,O)).filter(N=>!!N),revision:M,...P.cursor?{cursor:JSON.stringify({startDate:l,endDate:u,limit:g,revision:M,cursor:P.cursor})}:{}}},create:async(l,u)=>{if(u.endDate&&u.endDate!==l)return!1;let g=u.title?.trim();if(!g)return!1;let h=new Date().toISOString();return Bn({id:uo("todo"),title:g,completed:u.completed??!1,priority:Vc(u.priority,"normal"),dueDate:l,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:h,updatedAt:h})},update:async(l,u)=>{let g=await Da(l);return g&&u.endDate&&u.endDate!==(u.date??g.dueDate)?!1:g?xo(g.id,qf(g,u),g.updatedAt):!1},remove:l=>Hn(l),open:async l=>{let u=await Da(l);await f.workspace.revealOwnPanel("left_sidebar"),u&&(st(u.completed?{kind:"smart",id:"completed"}:Fe),ze().request(u.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let u=await Da(l);return u?Xf(u):[]},runAction:async(l,u)=>{let g=await Da(l);return g?Zf(g,u):!1}},i=()=>{f.interop.state.publish(br,++r)};f.interop.state.publish(br,r);let s=qd(i),c=Pr(i),p=f.interop.services.provide(_o,a);return()=>{n=!1,s(),c(),p(),f.interop.state.publish(br,null)}}var xs=e=>typeof e=="string"?e:"";function Hc(e){let t=xs(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Wc(e){let t={cardKind:"todo",open:async(r,n)=>{if(xs(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:xs(r.id)}),!0;let a=Hc(r.filePath)||Hc(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(di,t)}function wt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>f.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function Ia(){let e=o.useCallback(i=>f.interop.state.subscribe(pn,i),[]),t=o.useCallback(()=>f.interop.state.get(pn),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function qc(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let c=new Set(r.current);s?c.add(i):c.delete(i),r.current=c,t(c)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var Jf="todo.sharedTodos";function Ts(){return f.runtime.getOrCreate(Jf,()=>({todos:[],listeners:new Set}))}function Se(){return Ts().todos}function _t(e){let t=Ts();t.todos=e;for(let r of t.listeners)r(e)}function zt(e){let t=Ts();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var ks="list:",Na=e=>f.ui.hasModKey(e)||e.button===1,Qf=e=>`${ks}${it(e)}`;function Ao(e){return e?.startsWith(ks)?Wr(e.slice(ks.length)):null}var Yc=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function La(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(So(e.id).labelKey)}function dr(e,t){f.workspace.openMainTab({instanceId:Qf(e),title:La(e),newTab:t})}function Yr(e,t=!1){t||Ao(Yc(f.getState().activePluginTab))?dr(e,t):st(e)}function Xc(){let e=Ca(),{activePluginTab:t}=wt("activePluginTab"),r=Yc(t);return o.useMemo(()=>Ao(r),[r])??e}function Zc(){let e=t=>f.workspace.setMainTabTitle(La(t));return e(Lt()),qr(e)}var Jc=[{id:"today",view:{kind:"smart",id:"today"}},{id:"week",view:{kind:"smart",id:"week"}},{id:"all",view:null}],eg=Jc.flatMap(e=>[`${e.id}Todo`,`${e.id}Completed`]),tg=e=>({id:e,label:gl(`todo.info.${e}`),labelKey:`todo.info.${e}`,kind:"text"});function og(e,t){let r={};for(let n of Jc){let a=n.view?e.filter(s=>us(s,n.view,t)):e,i=a.filter(s=>s.completed).length;for(let[s,c]of[[`${n.id}Todo`,a.length-i],[`${n.id}Completed`,i]])r[s]={text:`${d(`todo.info.${s}`)} \xB7 ${c}`,value:c}}return r}function Qc(){let e=new Set,t={id:"todo.details",label:"To-Do",labelKey:"manifest.name",pluginViews:!0,items:[{id:"title",label:"Title",labelKey:"details.item.title",kind:"text"},...eg.map(tg)],defaultItems:["title"],subscribe:i=>(e.add(i),()=>{e.delete(i)}),getSnapshot:()=>({items:og(Se(),ce())})},r=f.interop.extensions.provide(fi,t),n=()=>{for(let i of[...e])i()},a=[zt(n),f.subscribeState(["activePluginTab"],n)];return()=>{for(let i of a)i();r(),e.clear()}}var Ss={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function rg(){return["completed",...ho().filter(t=>t!=="completed")].map(t=>Ce(t))}function Eo(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function eu(){for(let e of Eo().listeners)e()}function As(e,t=""){let r=Eo();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,eu())}function Es(e,t){e?Eo().selected.set(t,e):Eo().selected.delete(t),eu()}function ng(e,t){let r=e==="main_workspace"?Ao(t):null,n=Aa(r??void 0),a=Se().find(i=>i.id===Eo().selected.get(e));return{title:d("manifest.name"),view:n,actions:Eo().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...xa(),goBack:()=>sr(-1),goForward:()=>sr(1)}}}}function ag(e){let t=Eo().listeners;t.add(e);let r=zt(e),n=qr(e),a=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function ig(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await ot(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Ea(e,t==="main_workspace"&&Ao(n)!==null))throw new Error("Unsupported To-Do bookmark.");Es(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&ze().request(e.todoId,"focus")}function sg({label:e,color:t,todos:r,sub:n}){let[a,i]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" todo-status-subgroup":""}${a?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":a,onClick:()=>i(s=>!s)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(er,null))),a&&o.createElement("div",{className:"todo-group-status-breakdown"},rg().map(s=>o.createElement("div",{className:"todo-group-status-row",key:s.id},o.createElement("span",null,s.label),o.createElement("span",null,r.filter(c=>Le(c)===s.id).length)))))}function dg(){let e=o.useSyncExternalStore(zt,Se,Se),t=ht();return o.createElement("div",{className:"todo-properties-frame","data-plugin-widget-layout":"fill"},o.createElement(f.ui.ScrollPanel,{fill:!0},o.createElement("div",{className:"right-panel-body props-info todo-groups-properties"},o.createElement("div",{className:"todo-status-groups"},[...ke(t),...e.some(r=>!r.group)?[null]:[]].map(r=>{let n=e.filter(i=>r===null?!i.group:kt(r).has(Q(i.group??""))),a=r??d("todo.chip.noGroup");return o.createElement(sg,{key:r??"ungrouped",label:a,sub:r!==null&&Ln(r,t),color:r?Ee(Pe(r,t)):"var(--text-tertiary)",todos:n})})))))}function tu(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>mi(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>ng(n,a),subscribe:ag,restore:(a,i,s)=>ig(a,n,s?.background,i)},{stateSchema:Ss,itemStateSchema:{...Ss,required:[...Ss.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(li,{id:"todo.properties",label:"Groups",labelKey:"todo.view.myLists",icon:"group",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await ot(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(dg,null)})),r.push(Qc()),()=>r.forEach(n=>n())}function ou(e,t,r){let n=new Date().toISOString();return{id:uo("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function ru(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function lr(e,t,r="main_workspace"){let n=o.useRef(ve()).current,[a,i]=o.useState(Se()),[s,c]=o.useState(null),[p,l]=o.useState(null),[u,g]=o.useState(null),h=o.useRef(u);h.current=u;let[m,w]=o.useState(!0),[v,P]=o.useState(0),[O,M]=o.useState(!1),{pendingIds:N,isPending:A,setPending:H}=qc(),ee=o.useRef(!1),q=o.useRef(0),te=o.useRef({sortField:e,sortDir:t});te.current={sortField:e,sortDir:t};let I=o.useRef([]),z=o.useMemo(()=>{let K=new Map(a.map(C=>[C.id,C])),_=new Set(I.current),ne=[];for(let C of I.current){let G=K.get(C);G&&ne.push(G)}for(let C of a)_.has(C.id)||ne.push(C);return ne},[a,v]),j=o.useCallback(K=>{let _=++q.current;K&&w(!0),rt(n).then(ne=>{if(n.assertActive(),_===q.current){if(K){let{sortField:C,sortDir:G}=te.current;I.current=Zo(ne,C,G).map(y=>y.id)}else{let C=new Set(ne.map(k=>k.id)),G=I.current.filter(k=>C.has(k)),y=new Set(G),{sortField:L,sortDir:$}=te.current,b=Zo(ne.filter(k=>!y.has(k.id)),L,$).map(k=>k.id);I.current=[...b,...G]}_t(ne),w(!1)}}).catch(()=>{_===q.current&&w(!1)})},[n]);o.useEffect(()=>(j(!0),()=>{q.current++}),[j]),o.useEffect(()=>Wt(()=>j(!1)),[j]);let B=o.useRef(!0);o.useEffect(()=>{if(B.current){B.current=!1;return}I.current=Zo(Se(),e,t).map(K=>K.id),P(K=>K+1)},[e,t]),o.useEffect(()=>zt(K=>i(K)),[]);let S=o.useCallback(()=>c(null),[]),x=o.useCallback(K=>{Es(K,r),g(K)},[r]),R=o.useCallback(()=>g(null),[]),F=o.useCallback(async(K,_,ne)=>{if(ee.current)return null;let C=K.trim();if(!C)return null;let G={...ou(C,_),...ne?.patch};ee.current=!0,M(!0),I.current=[G.id,...I.current],_t([G,...Se()]),c(G.id);let y=()=>{I.current=I.current.filter(L=>L!==G.id),_t(Se().filter(L=>L.id!==G.id)),c(L=>L===G.id?null:L)};try{let L=await Bn(G);return L||y(),L?G:null}catch{return y(),null}finally{ee.current=!1,M(!1)}},[]),E=o.useCallback(async(K,_,ne)=>{if(A(K))return!1;let C=Se().find(y=>y.id===K);if(!C)return!1;let G={...C,..._,updatedAt:new Date().toISOString()};H(K,!0),_t(Se().map(y=>y.id===K?G:y));try{return await xo(K,G,C.updatedAt,ne)?!0:(_t(Se().map(L=>L.id===K?C:L)),!1)}catch{return _t(Se().map(y=>y.id===K?C:y)),!1}finally{H(K,!1)}},[A,H]),D=o.useCallback(async K=>{if(A(K))return;let _=Se().find(C=>C.id===K);if(!_)return;H(K,!0),I.current=I.current.filter(C=>C!==K),_t(Se().filter(C=>C.id!==K)),c(C=>C===K?null:C),h.current===K&&g(null);let ne=()=>{I.current.includes(K)||I.current.push(K),Se().some(C=>C.id===K)||_t([...Se(),_])};try{await Hn(K)||ne()}catch{ne()}finally{H(K,!1)}},[A,H]),Y=o.useMemo(()=>({patchTodo:E,removeTodo:D,openDetail:x,setMenuId:l}),[E,D,x]);return o.useMemo(()=>({todos:a,loading:m,ordered:z,lastCreatedId:s,clearLastCreated:S,menuId:p,setMenuId:l,editingId:u,openDetail:x,closeDetail:R,pendingIds:N,creating:O,create:F,patchTodo:E,removeTodo:D,actions:Y}),[a,m,z,s,S,p,u,x,R,N,O,F,E,D,Y])}var lg={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},cg=["tomorrow","weekend","pick"];function ug(e=ce(new Date)){let t=Gn(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return Et(e,n)}function Pa(e,t=ce(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?Et(t,1):s==="weekend"?ug(t):null,a=new Set,i=[];for(let s of cg){let c=n(s);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:s,labelKey:lg[s],date:c})}return i}function Gt(e,t,r){let n=new Set(e.map(Q)),a=t.filter(s=>n.has(Q(s.name)));return[...a.filter(s=>!s.parent||!a.some(c=>c.id===s.parent)).map(s=>{let c=r(s.name),p=a.filter(u=>u.parent===s.id).map(u=>r(u.name));if(!p.length)return c;let l=[c,...p];return{label:s.name,..."color"in c?{color:c.color}:{},...c.type==="radio"?{type:"radio",checked:l.some(u=>u.checked===!0)}:{},submenu:l}}),...e.filter(s=>!gt(t,s)).map(r)]}function nu(e,{todo:t,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:s,disabled:c=!1}){let p=Le(t);n(t.id);let l=Pa(t.dueDate??"",ce(new Date));return f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(We,{className:"todo-menu-action-icon"}),enabled:!c,submenu:At().map(u=>({label:u.label,icon:o.createElement(xe,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>i(De(u.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(yt,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(u=>u.date).map(u=>({label:d(u.labelKey),icon:u.id==="tomorrow"?o.createElement(Kr,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(oa,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:u.date})}))},{label:d(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Oe,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:t.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(fc,{className:"todo-menu-action-icon"}),enabled:!c,submenu:Ze.map(u=>({label:Ve(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>i({priority:u.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Zn,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>i({group:void 0})},...Gt(r,nt(),u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>i({group:u})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(gc,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(oo,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function Oa(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),nu({x:e.clientX,y:e.clientY},t))}var au=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:c=>{c.stopPropagation(),nu({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s})}},o.createElement(lc,null)));var pg=[".ttf",".otf",".woff",".woff2"],mg=[".csv"],fg=[".base"],gg=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],hg=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],bg=[...gg,...hg,".ico",".flavicon"];var yg=[".pdf"],wg=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus",".m4b",".mka",".weba",".3ga"],vg=[".mp4",".mov",".m4v",".mkv",".webm",".ogv",".3gp",".3g2",".f4v"],xg=[".srt",".vtt",".ass"],Tg=[".stl",".obj",".glb",".gltf"],kg=[".bin",".mtl"];function Cs(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Sg={type:"core",id:"valley"},X=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Sg,...a});function Ag(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Eg=Ag([[[".mermaid",".mmd"],X("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],X("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],X("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],X("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],X("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[pg,X("font","font","font","media")],[[".epub",".mobi",".azw3"],X("ebook","ebook","ebook","documents")],[[".djvu"],X("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],X("comic","comic","comic","documents")],[[".md",".markdown"],X("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],X("text","text","text","notes")],[[".json"],X("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],X("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[mg,X("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[fg,X("base","base","fallback","data")],[bg,X("image","image","image","media",{information:["identity","dimensions","exif"]})],[yg,X("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[wg,X("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[vg,X("video","video","video","media",{information:["identity","media","video-codec"]})],[xg,X("text","subtitle","text","media")],[Tg,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[kg,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],X("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],X("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],X("docx","word","opendocument","documents")],[[".ods"],X("csv","excel","opendocument","data")],[[".odp"],X("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],X("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],X("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],X("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],X("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],X("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],X("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],X("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],X("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],X("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],X("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],X("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],X("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],X("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],X("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],X("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],X("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],X("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],X("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],X("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],X("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],X("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],X("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],X("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],X("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],X("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],X("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],X("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Cg=X("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Dg(e){return Eg[Cs(e)]??Cg}function Xr(e){return Dg(e).kind}var iu="valley-realm",su="asset";function du(e){return`${iu}://${su}/${encodeURIComponent(e)}`}var Ig={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function Ng(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function Ds(e){let t=Ig[Xr(e)];if(t)return d(t);let r=Cs(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var Lg={image:Qn,audio:ea,video:ta},lu=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=Xr(e),i=e.split("/").pop()??e,s=Lg[a]??Nt;o.useEffect(()=>{let u=!1;return f.realm.fileInfo(e).then(g=>{u||n(g?.size??null)}),()=>{u=!0}},[e]);let[c,p]=o.useState(0);o.useEffect(()=>f.realm.onChanged(()=>p(u=>u+1)),[]);let l=a==="image"?`${du(e)}?v=${c}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},Ds(e),r!==null&&` \xB7 ${Ng(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},l?o.createElement("img",{src:l,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},o.createElement(Te,null)))};var Pg={image:Qn,audio:ea,video:ta};function Is({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let a=o.useRef(null),[i,s]=o.useState([]),[c,p]=o.useState(0),[l,u]=o.useState("idle"),g=o.useRef(null),h=o.useRef(0);o.useEffect(()=>{n&&a.current?.focus()},[n]),o.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=v=>{g.current!==null&&window.clearTimeout(g.current);let P=++h.current;if(!v.trim()){s([]),u("idle");return}u("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:v.trim(),kinds:["attachment"],limit:6}).then(O=>{P===h.current&&(s(O),p(0),u("done"))},()=>{P===h.current&&(s([]),u("done"))})},150)},w=v=>(v.value??v.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(It,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:v=>m(v.currentTarget.value),onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="ArrowDown"&&i.length?(v.preventDefault(),p(P=>(P+1)%i.length)):v.key==="ArrowUp"&&i.length?(v.preventDefault(),p(P=>P<=0?i.length-1:P-1)):v.key==="Enter"?(v.preventDefault(),i[c]&&e(w(i[c]))):v.key==="Escape"&&(v.preventDefault(),v.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:t},o.createElement(Te,null))),l!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},l==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),i.map((v,P)=>{let O=w(v),M=Pg[Xr(O)]??Nt,N=O.includes("/")?O.slice(0,O.lastIndexOf("/")):"";return o.createElement("li",{key:v.id,role:"option","aria-selected":P===c},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(P===c?" is-active":""),onMouseDown:A=>A.preventDefault(),onMouseEnter:()=>p(P),onClick:()=>e(O)},o.createElement(M,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},v.label||O.split("/").pop()),N&&o.createElement("span",{className:"todo-file-search-folder"},N))))})))}var Og=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],cu=e=>{let[t,r]=(e||ce(new Date)).split("-").map(Number);return new Date(t,r-1,1)};function no({value:e,onChange:t}){let[r,n]=o.useState(()=>cu(e)),a=f.ui.language(),i=Math.max(0,Og.indexOf(String(f.getState().weekStart??"monday").toLowerCase())),s=ce(new Date),c=r.getFullYear(),p=r.getMonth(),l=(new Date(c,p,1).getDay()-i+7)%7,u=Array.from({length:42},(w,v)=>new Date(c,p,1-l+v)),g=Array.from({length:7},(w,v)=>new Intl.DateTimeFormat(a,{weekday:"narrow"}).format(new Date(2024,0,7+(i+v)%7))),h=new Intl.DateTimeFormat(a,{month:"long",year:"numeric"}).format(r),m=w=>n(new Date(c,p+w,1));return o.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},o.createElement("div",{className:"todo-calendar-head"},o.createElement("span",{className:"todo-calendar-title"},h),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>m(-1)},o.createElement(aa,null)),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>m(1)},o.createElement(or,null))),o.createElement("div",{className:"todo-calendar-grid"},g.map((w,v)=>o.createElement("span",{key:`w${v}`,className:"todo-calendar-weekday"},w)),u.map(w=>{let v=ce(w),P=w.getMonth()!==p;return o.createElement("button",{key:v,type:"button",className:"todo-calendar-day"+(P?" is-outside":"")+(v===s?" is-today":"")+(v===e?" is-selected":""),"aria-pressed":v===e,"aria-label":new Intl.DateTimeFormat(a,{dateStyle:"full"}).format(w),onClick:()=>t(v)},w.getDate())})),o.createElement("div",{className:"todo-calendar-foot"},o.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>t("")},d("todo.calendar.clear")),o.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(cu(s)),t(s)}},d("todo.due.today"))))}function Mg(e){let t=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(t);if(!r)return null;let n=Number(r[1]),a=Number(r[2]);return n>23||a>59?null:`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Zr({value:e,onChange:t,ariaLabel:r,placeholder:n,disabled:a}){let[i,s]=o.useState(e),[c,p]=o.useState(!1);o.useEffect(()=>{s(e),p(!1)},[e]);let l=()=>{if(!i.trim()){p(!1),e&&t("");return}let u=Mg(i);if(!u){p(!0);return}p(!1),s(u),u!==e&&t(u)};return o.createElement("input",{className:"settings-control todo-clock-input"+(c?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:i,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":c||void 0,title:c?d("todo.time.invalid"):void 0,disabled:a,autoComplete:"off",spellCheck:!1,onChange:u=>{let g=u.currentTarget.value.replace(/[^\d:]/g,""),h=g.indexOf(":");s(h<0?g:g.slice(0,h+1)+g.slice(h+1).replace(/:/g,"")),p(!1)},onBlur:l,onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),l())}})}function Ma({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=o.useRef(null),s=c=>{let p=c.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),l=[...e];for(let u of p)l.some(g=>g.toLowerCase()===u.toLowerCase())||l.push(u);return l.length===e.length?!1:(t(l),!0)};return o.useEffect(()=>{r&&i.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),i.current?.focus())}},e.map(c=>o.createElement("span",{key:c,className:"todo-tags-chip"},o.createElement("span",null,"#",c),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:c}),title:d("todo.compose.removeTag",{tag:c}),onClick:()=>{t(e.filter(p=>p!==c)),i.current?.focus()}},o.createElement(Te,null)))),o.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let p=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&p.value.trim()?(c.preventDefault(),s(p.value)&&(p.value="")):c.key==="Backspace"&&!p.value&&e.length&&(c.preventDefault(),t(e.slice(0,-1))))},onBlur:c=>{s(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let p=c.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(c.preventDefault(),s(c.currentTarget.value+p),c.currentTarget.value="")}}))}var mt=({priority:e})=>o.createElement(e==="high"?ra:e==="medium"?Tc:e==="low"?na:Ec,{className:`todo-table-priority-icon todo-priority-${e}`});function uu({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(no,{value:r,onChange:s=>{n(s),s||i(""),t(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(Zr,{value:a,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{i(s),t({startTime:s||void 0})}}))}function _a({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function za({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Ma,{value:r,autoFocus:!0,onChange:a=>{n(a),t({tags:a})}}))}function Ga({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(rr,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function cr(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}function _g(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function zg(e,t=.998){return e/1e3*t/(1-t)}function pu(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function mu(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+_g(n-t,a,.2))}function fu(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,zg(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function gu(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,p=2*i*Math.sqrt(c),l=t+(-c*(e-r)-p*t)*s,u=e+l*s,g=Math.abs(u-r)<.5&&Math.abs(l)<20;return{value:g?r:u,velocity:g?0:l,done:g}}function Ns(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),c=n*s<=i+(r?24:0),p=c?s:48,l=Math.min(n*p,Math.max(i,n*32)),u=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:p,labelled:c,openWidth:l,commitPoint:u}}var hu=.22,bu=.18,Gg=.8,Ra=.9,Rg=400,Fg=80,$g=10,Ug=5,jg=4,Kg=3,Vg=.5,Bg=6,Hg=["left","right"],yu={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Wg(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function qg(e,t){let r={today:o.createElement(Kr,null),tomorrow:o.createElement(Kr,null),weekend:o.createElement(oa,null),pick:o.createElement(yt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var Qr=null;function wu(e){if(Qr===e)return;let t=Qr;Qr=e,t?.close()}function vu(e){Qr===e&&(Qr=null)}var ur;function xu(e,t){if(ur===void 0)try{ur=document.createElement("canvas").getContext("2d")}catch{ur=null}return ur?(ur.font=t,ur.measureText(e).width):e.length*7}var Yg=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,Jr=e=>e>0?"left":e<0?"right":null,Tu=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),c=o.useRef({left:null,right:null}),p=o.useRef(0),l=o.useRef(null),u=o.useRef(null),g=o.useRef([]),h=o.useRef(!1),m=o.useRef(null),w=o.useRef(null),v=o.useRef({velocity:0,target:0,response:hu,damping:Ra}),P=o.useRef({left:"",right:""}),O=o.useMemo(()=>qg(Pa(e.dueDate??"",ce(new Date)),r),[e.dueDate,r]),M=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Oe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(cc,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(oo,null),run:()=>r.remove()}],[r,e.flagged]),N={left:O,right:M},[A,H]=o.useState(()=>({rowWidth:0,left:yu,right:yu})),ee=o.useRef(A);ee.current=A;let q=()=>{let y=i.current?.querySelector(".todo-swipe-action");if(!y||typeof getComputedStyle!="function")return"13px sans-serif";let L=getComputedStyle(y);return`${L.fontWeight} ${L.fontSize} ${L.fontFamily}`},te=()=>{let y=i.current?.clientWidth??0,L=q(),$=ee.current,b={rowWidth:y,left:Ns(y,O.map(V=>xu(V.label,L)),$.left.labelled),right:Ns(y,M.map(V=>xu(V.label,L)),$.right.labelled)};ee.current=b;let k=V=>$[V].openWidth!==b[V].openWidth||$[V].labelled!==b[V].labelled;return($.rowWidth!==y||k("left")||k("right"))&&H(b),b},I=o.useRef(te);I.current=te,o.useEffect(()=>{I.current()},[O,M]);let z=y=>{let L=Jr(y);return!L||L!==u.current?!1:Math.abs(y)>=ee.current[L].commitPoint},j=(y,L=!1)=>{p.current=y,L&&y!==0?wu(F.current):y===0&&vu(F.current);let $=i.current,b=s.current;if(!$||!b)return;b.style.transform=y?`translate3d(${y}px, 0, 0)`:"";let k=Jr(y),V=ee.current,de=z(y);$.classList.toggle("open",y!==0),$.classList.toggle("committed",de);for(let le of Hg){let oe=c.current[le];if(!oe)continue;let fe=k===le;oe.classList.toggle("committed",fe&&de);let Qe=fe?de?"100%":`${Math.max(V[le].openWidth,Math.abs(y))}px`:`${y===0?V[le].openWidth:0}px`,qe=`${Qe}|${fe}`;P.current[le]!==qe&&(P.current[le]=qe,oe.style.width=Qe,oe.setAttribute("aria-hidden",String(!fe)))}};o.useLayoutEffect(()=>j(p.current));let B=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},S=(y,L,$,b)=>{if(B(),y!==0&&wu(F.current),p.current===y||Yg()||typeof requestAnimationFrame!="function"){j(y);return}v.current={velocity:L,target:y,response:$,damping:b};let k=0,V=de=>{let le=k?(de-k)/1e3:.016666666666666666;k=de;let oe=v.current,fe=gu(p.current,oe.velocity,oe.target,le,oe.response,oe.damping);oe.velocity=fe.velocity,j(fe.value),m.current=fe.done?null:requestAnimationFrame(V)};m.current=requestAnimationFrame(V)},x=o.useRef(()=>{});x.current=()=>{l.current=null,S(0,0,bu,Ra)};let R=o.useCallback(()=>x.current(),[]),F=o.useRef({close:()=>x.current()}),E=()=>{B(),l.current=null,w.current!=null&&window.clearTimeout(w.current),w.current=null,j(0)},D=o.useRef(E);D.current=E;let Y=y=>{let L=ee.current,$=Jr(y);if(!$)return 0;let b=l.current?.origin;if(b&&$!==b)return 0;let k=L[$],V=$===u.current?k.commitPoint:k.openWidth;return mu(y,V,L.rowWidth)},K=(y,L,$,b,k)=>{B(),te();let V=p.current,de=Jr(V),le=Math.abs(V)>8?de:null;u.current=de&&Math.abs(V)>=ee.current[de].openWidth-1?de:null,l.current=Wg(y,L,$,b,V,le),g.current=[{x:V,t:k}]},_=(y,L)=>{let $=l.current;!$||$.ended||($.live||($.live=!0,B(),n?.()),g.current.push({x:y,t:L}),g.current.length>Bg&&g.current.shift(),j(Y(y),!0),z(p.current)&&($.crossed=!0))},ne=y=>{let L=l.current;if(!L||L.ended)return;if(L.ended=!0,!L.live){l.current=null;return}let $=()=>{L.kind==="pointer"&&(l.current=null)},b=pu(g.current),k=p.current,V=Jr(k);if(!V){$(),j(0);return}let de=ee.current[V],le=y&&z(k),oe=fu({offset:k,velocity:b,openWidth:de.openWidth,committed:le});if($(),oe.commit){let fe=V==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Qe=i.current?.querySelector(fe),qe=N[V],ft=V==="left"?qe[0]:qe[qe.length-1];S(0,b,bu,Ra),ft?.run(Qe??i.current);return}S(oe.target,b,hu,Math.abs(b)>Rg?Gg:Ra)};o.useEffect(()=>R(),[e.dueDate,e.flagged,R]),o.useEffect(()=>{let y=F.current;return()=>{B(),w.current!=null&&window.clearTimeout(w.current),vu(y)}},[]),o.useEffect(()=>{let y=i.current,L=y?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!y||!L)return;let $=0,b=new L(()=>{let k=y.clientWidth,V=$!==k;$=k,I.current(),V&&p.current!==0&&D.current()});return b.observe(y),()=>b.disconnect()},[]);let C=o.useRef({disabled:t,begin:K,move:_,end:ne});C.current={disabled:t,begin:K,move:_,end:ne},o.useEffect(()=>{let y=i.current;if(!y)return;let L=()=>{w.current!=null&&window.clearTimeout(w.current),w.current=null},$=()=>{w.current=null,l.current?.kind==="wheel"&&(C.current.end(!0),l.current=null)},b=k=>{let V=C.current;if(V.disabled||Math.abs(k.deltaX)<=Math.abs(k.deltaY)||k.deltaX===0)return;k.preventDefault();let de=k.deltaMode===WheelEvent.DOM_DELTA_LINE?16:k.deltaMode===WheelEvent.DOM_DELTA_PAGE?y.clientWidth:1,le=-k.deltaX*de,oe=l.current;(!oe||oe.kind!=="wheel")&&(V.begin("wheel",-1,0,0,k.timeStamp),oe=l.current),L(),w.current=window.setTimeout($,Fg);let fe=Math.abs(le),Qe=oe.previous;oe.previous=fe;let qe=oe.live&&(oe.ended||oe.origin!==null&&p.current===0),ft=fe>=Qe+Ug,Ft=oe.distance!==0&&Math.sign(le)!==Math.sign(oe.distance)&&fe>=jg;if(qe&&(ft||Ft)&&(V.end(!1),V.begin("wheel",-1,0,0,k.timeStamp),oe=l.current,oe.previous=fe),oe.ended)return;if(oe.decay=fe<Qe?oe.decay+1:0,oe.peak=Math.max(oe.peak,fe),oe.distance+=le,oe.live&&oe.peak>=$g&&oe.decay>=Kg&&fe<oe.peak*Vg){V.end(oe.crossed);return}!oe.live&&Math.abs(oe.distance)<8||V.move(oe.base+oe.distance,k.timeStamp)};return y.addEventListener("wheel",b,{passive:!1}),()=>{y.removeEventListener("wheel",b),L()}},[]);let G=(y,L)=>o.createElement("div",{ref:$=>{c.current[y]=$},className:`todo-swipe-tray todo-swipe-tray-${y} ${A[y].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${A[y].openWidth}px`}},L.map($=>o.createElement("button",{key:$.key,type:"button",className:$.cls,tabIndex:-1,title:$.label,"aria-label":$.label,onClick:b=>{b.stopPropagation(),R(),$.run(b.currentTarget)}},$.icon,o.createElement("span",null,$.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:y=>{t||y.pointerType==="mouse"&&y.button!==0||y.target.closest(".todo-swipe-tray")||K("pointer",y.pointerId,y.clientX,y.clientY,y.timeStamp)},onPointerMove:y=>{let L=l.current;if(!L||L.kind!=="pointer"||L.pointerId!==y.pointerId)return;let $=y.clientX-L.originX,b=y.clientY-L.originY;if(!L.live){if(Math.abs(b)>Math.abs($)){y.currentTarget.hasPointerCapture?.(y.pointerId)&&y.currentTarget.releasePointerCapture(y.pointerId),l.current=null;return}if(Math.abs($)<8)return;h.current=!0,y.currentTarget.setPointerCapture?.(y.pointerId)}y.preventDefault(),_(L.base+$,y.timeStamp)},onPointerUp:y=>{let L=l.current;!L||L.kind!=="pointer"||L.pointerId!==y.pointerId||(y.currentTarget.hasPointerCapture?.(y.pointerId)&&y.currentTarget.releasePointerCapture(y.pointerId),L.live&&_(L.base+(y.clientX-L.originX),y.timeStamp),ne(!0))},onPointerCancel:y=>{let L=l.current;!L||L.kind!=="pointer"||L.pointerId!==y.pointerId||(y.currentTarget.hasPointerCapture?.(y.pointerId)&&y.currentTarget.releasePointerCapture(y.pointerId),R())},onClickCapture:y=>{let L=!!y.target.closest(".todo-swipe-tray");if(L&&(h.current=!1),h.current&&!L){h.current=!1,y.stopPropagation(),y.preventDefault();return}p.current&&!L&&(y.stopPropagation(),y.preventDefault(),R())}},O.length>0&&G("left",O),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),M.length>0&&G("right",M))};function en(e,t,r){let n=Le(t);f.ui.openMenu(At().map(a=>({label:a.label,icon:o.createElement(xe,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(De(a.status))})),{anchor:e})}function Ps(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),c=o.useRef(0),p=o.useRef(r);p.current=r;let l=o.useCallback(async()=>{if(i.current)return;let u=a.current;if(u!==null){a.current=null,i.current=!0;try{let g=await n.current(u);!g&&a.current===null&&(a.current=u),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=u),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?s.current=window.setTimeout(()=>{l()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),l()},[l]),o.useCallback(u=>{a.current=u,c.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,l()},t)},[l,t])}function Xg({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,c]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||c(e)},[e]);let l=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>c(u.target.value),onBlur:()=>{p.current=!1,l()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(c(e),u.currentTarget.blur())}})}function Zg(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Jg=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=f.ui.settings,[c,p]=o.useState(Se);o.useEffect(()=>zt(p),[]);let l=c.find(b=>b.id===e),u=Xd(e),g=ht(),[h,m]=o.useState(!1),[w,v]=o.useState(!1),[P,O]=o.useState(!1),[M,N]=o.useState(!1),A=o.useRef(null),[H,ee]=o.useState(""),q=Zg(e),te=o.useSyncExternalStore(o.useCallback(b=>(q.listeners.add(b),()=>{q.listeners.delete(b)}),[q]),()=>q.value,()=>q.value),I=o.useCallback(b=>{q.value={...q.value,...b};for(let k of q.listeners)k()},[q]),z=te.title,j=b=>I({title:b}),B=()=>I({error:d("todo.error.saveDraft")});o.useEffect(()=>{q.revision||q.loadingRevision||(q.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(b=>{b&&!q.revision&&(q.revision={expectedRevision:b.revision,realmGeneration:b.realmGeneration})}).catch(()=>{I({error:d("todo.error.saveDraft")})}).finally(()=>{q.loadingRevision=void 0}))},[q,e,I]);let S=async b=>(q.revision||await q.loadingRevision,q.revision?t.patchTodo(e,b,q.revision):!1),x=Ps(async b=>{let k=b.trim()?await S({title:b}):!0;return k&&q.value.title===b&&I({title:null,error:""}),k},500,B),R=Ps(async b=>{let k=await S({note:b});return k&&q.value.note===b&&I({note:null,error:""}),k},500,B),F=Ps(async b=>{let k=JSON.parse(b),V=await S({tags:k});return V&&JSON.stringify(q.value.tags)===b&&I({tags:null,error:""}),V},0,B);if(o.useEffect(()=>{!l&&!t.loading&&r()},[l,t.loading,r]),!l)return null;let E=b=>{S(b).then(k=>{k||B()})},D=b=>{I({tags:b}),F(JSON.stringify(b))},Y=b=>E({attachments:b.length?b:void 0}),K=b=>E({urls:b.length?b:void 0}),_=ke(g);A.current||(A.current=structuredClone(l));let ne=()=>{let b=A.current;b&&(x(b.title),R(b.note),E({tags:b.tags,status:b.status,completed:b.completed,priority:b.priority,dueDate:b.dueDate,startTime:b.startTime,endTime:b.endTime,group:b.group,location:b.location,flagged:b.flagged,attachments:b.attachments,urls:b.urls,filePath:b.filePath})),I({title:null,note:null,tags:null,error:""}),r()},C=Le(l),G=ce(),y=l.dueDate?`${at(l.dueDate.slice(0,10),G,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${l.startTime?` \xB7 ${l.startTime}${l.endTime?`\u2013${l.endTime}`:""}`:""}`:"",L=(b,k,V,de=300)=>{f.ui.openPopover(V,{anchor:b,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:k,width:de})},$=(b,k,V,de,le,oe="")=>o.createElement("button",{key:b,type:"button",className:`todo-sheet-chip${V?"":" is-empty"}${oe?` ${oe}`:""}`,"aria-label":V?`${de}: ${V}`:de,title:b==="place"&&l.location?l.location.name:void 0,onClick:fe=>le(fe.currentTarget)},k,o.createElement("span",null,V||de));return o.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),Qt(l,t.removeTodo).then(b=>{b||t.openDetail(l.id)})}},o.createElement(oo,null),d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:ne},d("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},te.error&&o.createElement("p",{role:"alert"},te.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":C,title:pt(C),"aria-label":`${d("auto.bae7d5be7082")}: ${pt(C)}`,onClick:b=>en(b.currentTarget,l,k=>E(k))},o.createElement(xe,{status:C==="open"?null:C,dotCls:Ce(C).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:z??l.title,"aria-label":d("auto.c5e8306a511f"),onChange:b=>{j(b.target.value),x(b.target.value)},onBlur:()=>{z===l.title&&j(null)},onKeyDown:b=>{b.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${l.flagged?" on":""}`,type:"button",onClick:()=>E({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(Oe,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:te.note??l.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:b=>{let k=b.target.value;I({note:k}),R(k)}}),o.createElement("div",{className:"todo-sheet-chips"},$("status",o.createElement(xe,{status:C==="open"?null:C,dotCls:Ce(C).cls}),C==="open"?"":pt(C),d("auto.bae7d5be7082"),b=>en(b,l,k=>E(k))),$("due",o.createElement(yt,null),y,d("todo.sheet.date"),b=>L(b,d("todo.edit.schedule"),()=>o.createElement(Qg,{todo:l,onPatch:E}),280),l.dueDate&&l.dueDate.slice(0,10)<G&&!l.completed?"is-overdue":""),$("group",o.createElement("span",{className:"todo-sheet-dot",style:l.group?{background:Ee(Pe(l.group,g))}:void 0}),l.group??"",d("todo.edit.group"),b=>{f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>E({group:void 0})},...Gt(_,g,k=>({label:k,type:"radio",checked:l.group===k,color:Pe(k,g),onSelect:()=>E({group:k})}))],{anchor:b,align:"start"})}),$("place",o.createElement(Je,null),l.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),b=>L(b,d("todo.location"),()=>o.createElement(eh,{todo:l,onPatch:E}),320)),$("priority",o.createElement(mt,{priority:l.priority}),l.priority==="normal"?"":Ve(l.priority),d("auto.886cbff9d9df"),b=>{f.ui.openMenu(Ze.map(k=>({label:Ve(k.id),icon:o.createElement(mt,{priority:k.id}),type:"radio",checked:l.priority===k.id,onSelect:()=>E({priority:k.id})})),{anchor:b,align:"start"})})),o.createElement(Ma,{value:te.tags??l.tags??[],onChange:D,bare:!0}),((l.attachments??[]).length>0||h)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(l.attachments??[]).map(b=>o.createElement(lu,{key:b,relPath:b,onRemove:()=>Y((l.attachments??[]).filter(k=>k!==b))})),h&&o.createElement(Is,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:b=>{(l.attachments??[]).includes(b)||Y([...l.attachments??[],b]),m(!1)}})),((l.urls??[]).length>0||w||l.filePath||P)&&o.createElement("div",{className:"todo-sheet-section"},l.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:l.filePath,onClick:b=>f.workspace.openFile(l.filePath,void 0,{newTab:f.ui.hasModKey(b)})},o.createElement(Nt,null),o.createElement("span",null,l.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>E({filePath:void 0})},o.createElement(Te,null))),P&&!l.filePath&&o.createElement(Is,{placeholder:d("todo.file.searchLinked"),onCancel:()=>O(!1),onPick:b=>{E({filePath:b}),O(!1)}}),(l.urls??[]).map(b=>o.createElement("div",{className:"todo-detail-url-card",key:b},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:b,onClick:k=>{let V=Uo(b);V?f.workspace.openFile(V,void 0,{newTab:f.ui.hasModKey(k)}):f.files.openExternalUrl(b)}},o.createElement(ko,null),o.createElement("span",null,th(b))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:b}),onClick:()=>K((l.urls??[]).filter(k=>k!==b))},o.createElement(Te,null)))),w&&o.createElement(Xg,{className:"todo-detail-link-input todo-detail-url",value:H,onCommit:b=>{let k=Ni(b);k&&!(l.urls??[]).includes(k)&&K([...l.urls??[],k]),ee(""),v(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),M&&u.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...u].reverse().map((b,k)=>o.createElement("li",{key:`${b.changedAt}:${k}`},o.createElement("span",null,pt(b.from)," \u2192 ",pt(b.to)),o.createElement("time",{dateTime:b.changedAt},new Date(b.changedAt).toLocaleString(f.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(ro,null)," ",d("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>v(!0)},o.createElement(ko,null)," ",d("todo.sheet.link")),!l.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>O(!0)},o.createElement(Nt,null)," ",d("todo.linkedFile")),u.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":M,onClick:()=>N(b=>!b)},d("todo.activity")," (",u.length,")"))))};function Qg({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??""),[s,c]=o.useState(e.endTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(no,{value:r,onChange:p=>{n(p),p||(i(""),c("")),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(Zr,{value:a,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:p=>{i(p),t({startTime:p||void 0,...p?{}:{endTime:void 0}}),p||c("")}}),o.createElement(Zr,{value:s,disabled:!a,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:p=>{if(p&&a&&p<=a){c(s);return}c(p),t({endTime:p||void 0})}})))}function eh({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(rr,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function th(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}var pr=({c:e})=>e.editingId?o.createElement(Jg,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function oh(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function rh(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let p=i+s>>>1;e[p].start+e[p].height<n?i=p+1:s=p}let c=i;for(s=e.length;i<s;){let p=i+s>>>1;e[p].start<=a?i=p+1:s=p}return[c,i]}function Fa(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,c=e.useRef(null),p=e.useRef(new Map),[l,u]=e.useReducer(x=>x+1,0),[g,h]=e.useState({top:0,height:600}),[m,w]=e.useState(null),[v,P]=e.useState(null),O=e.useRef(null),M=e.useRef(null),N=e.useRef(null),A=e.useMemo(()=>{let x=0;return r.map((R,F)=>{let E=p.current.get(R)??(typeof n=="number"?n:n(R,F)),D={id:R,height:E,start:x};return x+=E,D})},[r,n,l]),H=A.length?A[A.length-1].start+A[A.length-1].height:0,ee=e.useRef({rows:A,viewport:g});ee.current={rows:A,viewport:g};let q=e.useCallback(()=>{let x=c.current,R=O.current;if(!x||!R)return;let F=x.getBoundingClientRect(),E=R.getBoundingClientRect(),D=R.clientHeight||E.height||600,Y=R===x?R.scrollTop:E.top-F.top;h(K=>K.top===Y&&K.height===D?K:{top:Y,height:D})},[]),te=e.useCallback(()=>{M.current===null&&(M.current=(N.current??window).requestAnimationFrame(()=>{M.current=null,q()}))},[q]);e.useLayoutEffect(()=>{let x=c.current;if(!x||!s)return;let R=oh(x);O.current=R;let F=x.ownerDocument.defaultView??window;N.current=F;let E=x.style.overflowAnchor;x.style.overflowAnchor="none";let D=!0,Y=()=>{if(!D)return;let C=x.ownerDocument.activeElement,G=C instanceof HTMLElement?C:null;for(;G&&G.parentElement!==x;)G=G.parentElement;w(G?.dataset.visibleKey??null)},K=()=>{queueMicrotask(Y)};R.addEventListener("scroll",te,{passive:!0}),F.addEventListener("resize",te),x.addEventListener("focusin",Y),x.addEventListener("focusout",K);let _=x.clientWidth,ne=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{x.clientWidth!==_&&(_=x.clientWidth,p.current.clear(),u()),te()});return ne?.observe(R),R!==x&&ne?.observe(x),q(),()=>{D=!1,x.style.overflowAnchor==="none"&&(x.style.overflowAnchor=E),R.removeEventListener("scroll",te),F.removeEventListener("resize",te),x.removeEventListener("focusin",Y),x.removeEventListener("focusout",K),ne?.disconnect(),M.current!==null&&F.cancelAnimationFrame(M.current),M.current=null,O.current=null,N.current=null}},[s,q,te]),e.useLayoutEffect(()=>{let x=new Set(r);for(let R of p.current.keys())x.has(R)||p.current.delete(R);q()},[r,q]),e.useLayoutEffect(()=>{p.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let x=c.current;if(!x||!s)return;let R=D=>{let Y=0,K=!1,{rows:_,viewport:ne}=ee.current,C=new Map(_.map(G=>[G.id,G]));for(let G of D){let y=G.dataset.visibleKey,L=y?C.get(y):void 0,$=G.getBoundingClientRect().height;!y||!L||$<=0||Math.abs($-L.height)<.5||(p.current.set(y,$),L.start+L.height<=ne.top&&(Y+=$-L.height),K=!0)}if(K){let G=O.current,y=x.closest('[data-visible-sections="true"]'),L=x;for(;L&&L.parentElement!==y;)L=L.parentElement;let $=y&&y!==x&&L&&G&&L.getBoundingClientRect().bottom<=G.getBoundingClientRect().top;Y&&G&&!$&&(G.scrollTop+=Y),u(),te()}},F=Array.from(x.children).filter(D=>D.hasAttribute("data-visible-key")),E=typeof ResizeObserver>"u"?void 0:new ResizeObserver(D=>R(D.map(Y=>Y.target)));return F.forEach(D=>E?.observe(D)),R(F),()=>E?.disconnect()}),e.useLayoutEffect(()=>{if(!v)return;let x=Array.from(c.current?.children??[]).find(R=>R.dataset.visibleKey===v.id);x&&(x.scrollIntoView?.({block:"nearest"}),v.selector&&(x.matches(v.selector)?x:x.querySelector(v.selector))?.focus(),q(),P(null))},[v,A,q]);let I=e.useCallback((x,R)=>{P({id:x,selector:R})},[]),[z,j]=s?rh(A,g):[0,A.length],B=new Set;for(let x=z;x<j;x++)B.add(x);let S=new Set([...a,m,v?.id].filter(Boolean));return S.size&&A.forEach((x,R)=>{S.has(x.id)&&B.add(R)}),{ref:c,show:I,render(x){let R=[],F=0;for(let E of[...B].sort((D,Y)=>D-Y)){let D=A[E];D.start>F&&R.push(e.createElement("div",{key:`space:${D.id}`,"aria-hidden":!0,style:{height:D.start-F,flex:"0 0 auto",pointerEvents:"none"}})),R.push(e.createElement(e.Fragment,{key:D.id},x(E))),F=D.start+D.height}return H>F&&R.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:H-F,flex:"0 0 auto",pointerEvents:"none"}})),R}}}function ku(e){return f.markdown.render(e,{inline:!0})}function nh({status:e,style:t}){let r=Ce(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},pt(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(xe,{status:e==="open"?null:e,dotCls:r.cls}),pt(e))}function Su({status:e}){return o.createElement(nh,{status:e,style:Al()})}var ah=2;function $a(){let e=ce(new Date),t=f.getState().dateFormat,r=f.ui.language(),n=Ge(),a=nc(),i=JSON.stringify(yo());return o.useMemo(()=>({today:e,dateFormat:t,language:r,statuses:n,icons:a,groupColors:i}),[e,t,r,n,a,i])}function Os(e){let t=new WeakMap;return r=>{let n=t.get(o)??o.memo(e);return t.set(o,n),o.createElement(n,r)}}function Ua(e){let t=o.useRef(null);if(t.current?.value===e)return t.current.value;let r=JSON.stringify(e);return t.current?.json!==r&&(t.current={value:e,json:r}),t.current.value}var ih=500;function Eu(){return f.runtime.getOrCreate("todo.titleHtml",()=>({html:new Map,pending:new Map}))}function Au(e){let t=Eu().html,r=t.get(e);if(r!==void 0)return t.delete(e),t.set(e,r),r}function sh(e){let t=Eu(),r=t.pending.get(e);return r||(r=ku(e).then(n=>(t.html.set(e,n),t.html.size>ih&&t.html.delete(t.html.keys().next().value),n)).finally(()=>{t.pending.delete(e)}),t.pending.set(e,r)),r}function Ms(e){let[t,r]=o.useState(()=>Au(e)??"");return o.useEffect(()=>{let n=Au(e);if(n!==void 0){r(n);return}let a=!0;return r(""),sh(e).then(i=>{a&&r(i)}).catch(()=>{a&&r("")}),()=>{a=!1}},[e]),t}function _s(e,t,r){let n=Le(e),a=o.useRef(null),i=o.useRef(null),s=o.useRef(!1),c=o.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return o.useEffect(()=>c,[c]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:a,className:"todo-check","data-status":n,type:"checkbox",checked:n==="completed","aria-disabled":t||void 0,onPointerDown:()=>{t||(s.current=!1,c(),i.current=window.setTimeout(()=>{s.current=!0;let l=a.current;l&&f.ui.openMenu(At().map(u=>({label:u.label,icon:o.createElement(xe,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?n==="open":u.status===n,enabled:!t,onSelect:()=>r(e.id,De(u.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{s.current&&l.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:l=>{if(s.current){s.current=!1;return}r(e.id,De(l.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),n!=="open"&&n!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(xe,{status:n,dotCls:Ce(n).cls}))),cancelHold:c}}var Cu=Os(function({todo:t,groups:r,compact:n,actions:a,pending:i,env:s,hideDate:c=!1,onMoveFocus:p}){let l=o.useRef(null);o.useEffect(()=>()=>{l.current&&clearTimeout(l.current)},[]);let u=Ms(t.title),g=(_,ne)=>f.workspace.openFile(_,void 0,{newTab:ne}),h=Ze.find(_=>_.id===t.priority)??Ze[0],m=ke(r),w=Le(t),v=[t.filePath,...t.attachments??[]].filter(_=>!!_),[P,O]=o.useState(!1),M=P?v:v.slice(0,ah),N=v.length-M.length,A=t.urls?.length??0,H=n&&v.length>0,ee=!!t.remindAt&&!t.reminderFiredAt,q=!!t.status&&t.status!=="open"&&!Ce(t.status,s.statuses).done,te=t.tags?.length??0,I=s.today,z=t.dueDate&&!c?at(t.dueDate,I,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,s.dateFormat):"",j=t.dueDate?Be(t.dueDate,s.dateFormat):"",B=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<I,S=!!(z||t.startTime||ee||t.group),x=!!(q||t.priority!=="normal"||t.location||A>0||H),R=o.useRef(null);o.useEffect(()=>R.current?hn(t.id,R.current):void 0,[t.id]);let{check:F,cancelHold:E}=_s(t,i,a.patchTodo),D=()=>{Kc(t)||a.openDetail(t.id)},Y=_=>a.patchTodo(t.id,_),K=o.useMemo(()=>({reschedule:_=>{a.patchTodo(t.id,{dueDate:_})},pickDate:_=>{f.ui.openPopover(ne=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(no,{value:t.dueDate?.slice(0,10)??"",onChange:C=>{a.patchTodo(t.id,{dueDate:C}),ne.close()}})),{anchor:_},{ariaLabel:d("todo.swipe.date")})},setStatus:_=>en(_,t,Y),toggleFlag:()=>{a.patchTodo(t.id,{flagged:!t.flagged})},openDetails:()=>a.openDetail(t.id),remove:()=>{Qt(t,a.removeTodo)}}),[t,a]);return o.createElement(Tu,{todo:t,disabled:i,actions:K,onEngage:E},o.createElement("article",{ref:R,className:`todo-row todo-row-navigable${t.completed?" completed":""}${n?" compact":""}${t.flagged?" flagged":""}`,"data-todo-id":t.id,"data-status":w,tabIndex:0,onContextMenu:_=>Oa(_,{todo:t,groupNames:m,setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:Y,onRequestDelete:()=>Qt(t,a.removeTodo),disabled:i}),onKeyDown:_=>{if(_.target===_.currentTarget){if(_.key==="ArrowDown"||_.key==="ArrowUp"){_.preventDefault(),p?.(t.id,_.key==="ArrowDown"?1:-1);return}if(_.key==="Escape"){_.currentTarget.blur();return}_.key==="Enter"&&(_.preventDefault(),a.openDetail(t.id))}},onClick:_=>{_.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||_.detail>1||(l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{l.current=null,D()},220))},onDoubleClick:_=>{l.current&&(clearTimeout(l.current),l.current=null),!_.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&a.openDetail(t.id)}},F,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,h.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${t.priority}`},h.symbol," "),u?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:u}}):o.createElement("span",{className:"todo-title-md"},t.title)),!n&&t.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},t.note),(S||x||!n&&te>0)&&o.createElement("div",{className:"todo-view-meta"},S&&o.createElement("div",{className:"todo-meta-line todo-meta-when"},o.createElement("span",{className:"todo-meta-cluster"},z&&o.createElement("button",{className:`todo-date${B?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:j||z}),onClick:_=>{_.stopPropagation(),D()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(yt,null)),o.createElement("span",{className:"todo-date-day"},z),j&&j!==z&&o.createElement("span",{className:"todo-date-full"},j)),t.startTime&&o.createElement("span",{className:"todo-clock-text"},!z&&o.createElement("span",{className:"todo-meta-icon"},o.createElement(yc,null)),t.startTime,t.endTime?`\u2013${t.endTime}`:""),ee&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(bc,null),t.remindAt.slice(11,16))),t.group&&o.createElement("span",{className:"todo-group-text",title:t.group,style:{color:Ee(Pe(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-meta-ellipsis"},t.group))),x&&o.createElement("div",{className:"todo-meta-line todo-meta-details"},q&&o.createElement(Su,{status:t.status}),t.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${t.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(To,null)),Tl(t.priority)),t.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:t.location.name}),onClick:_=>{_.stopPropagation(),Vr(t.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Je,null)),o.createElement("span",{className:"todo-meta-ellipsis"},t.location.name)),H&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ro,null)),v.length),A>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(ko,null),A>1&&A)),!n&&te>0&&o.createElement("div",{className:"todo-meta-line todo-meta-tags"},t.tags.slice(0,3).map(_=>o.createElement("button",{key:_,className:"todo-tag-text",type:"button",onClick:ne=>{ne.stopPropagation(),ka(`#${_}`)}},"#",_)),te>3&&o.createElement("span",{className:"todo-tag-more",title:t.tags.slice(3).map(_=>`#${_}`).join(" ")},"+",te-3)))),o.createElement("div",{className:"todo-row-actions"},t.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(Oe,null)),o.createElement(au,{todo:t,groupNames:m,setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:Y,onRequestDelete:()=>Qt(t,a.removeTodo),disabled:i})),!n&&v.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},M.map(_=>o.createElement("button",{key:_,className:"todo-file-card",title:_,onClick:ne=>{ne.stopPropagation(),g(_,f.ui.hasModKey(ne))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},_===t.filePath?o.createElement(Nt,null):o.createElement(ro,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},ru(_)),o.createElement("span",{className:"todo-file-card-kind"},Ds(_))))),(N>0||P)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${P?" open":""}`,title:P?d("todo.fewerFiles"):d("todo.moreFiles",{p0:N}),"aria-expanded":P,onClick:_=>{_.stopPropagation(),O(ne=>!ne)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(er,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},P?d("todo.fewerFiles"):d("todo.moreFiles",{p0:N})))))))});var Du=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=ze(),s=o.useSyncExternalStore(i.subscribe,i.get,i.get),c=o.useMemo(()=>e.map(w=>w.id),[e]),p=Fa(o,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),l=p.show;o.useLayoutEffect(()=>{s&&c.includes(s.todoId)&&l(s.todoId)},[s,c,l]);let u=$a(),g=Ua(t),h=o.useRef(e);h.current=e;let m=o.useCallback((w,v)=>{let P=h.current,O=P.findIndex(N=>N.id===w),M=P[Math.max(0,Math.min(P.length-1,O+v))];M&&l(M.id,".todo-row")},[l]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(w=>o.createElement(Cu,{key:e[w].id,todo:e[w],groups:g,compact:r,actions:a.actions,pending:a.pendingIds.has(e[w].id),env:u,hideDate:n,onMoveFocus:m})))};function Iu({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let c=ze(),p=o.useSyncExternalStore(c.subscribe,c.get,c.get),l=o.useMemo(()=>e.map(O=>O.key),[e]),[u,g]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),m=e.filter(O=>O.todos.some(M=>h.has(M.id))).map(O=>O.key),w=o.useCallback((O,M)=>a?.(e[M])??32+e[M].todos.length*(r?52:84),[e,r,a]),v=Fa(o,{ids:l,estimate:w,pinned:m,layoutKey:i??r}),P=v.show;return o.useLayoutEffect(()=>{if(!p)return;let O=e.find(M=>M.todos.some(N=>N.id===p.todoId));O&&P(O.key)},[p,e,P]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:v.ref,onDragStartCapture:O=>g(O.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},v.render(O=>o.cloneElement(s(e[O]),{"data-visible-key":l[O]})))}function dh(e,t,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return vo(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=vo(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:jl(i),p0:`${Fn(t,a,n)} \u2013 ${Fn(bt(s),a,n)}`})}return t===Et(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===Et(r,1)?d("todo.due.tomorrow"):Fn(t,a,n)}function ja({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let c=bt(),{shortDateFormat:p}=wt("shortDateFormat"),l=f.ui.language(),u=o.useMemo(()=>{if(!s)return rs(e,a,_r(i));let g=new Map(e.map(m=>[m,ts(m)])),h=[...e].sort((m,w)=>g.get(w).localeCompare(g.get(m)));return rs(h,a,_r(i),{dateOf:m=>os(g.get(m))})},[a,s,e,i]);return o.createElement(Iu,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},dh(g.kind,g.key,c,p,l)),o.createElement(Du,{todos:g.todos,groups:t,compact:r,c:n})))}function Nu(e){return e.kind==="groups"?{names:e.names,includeUngrouped:e.includeUngrouped===!0}:{names:[],includeUngrouped:e.kind==="nogroup"}}function Lu(e){return e.names.length||e.includeUngrouped?{kind:"groups",names:e.names,includeUngrouped:e.includeUngrouped}:Fe}function Pu(e,t){return e.some(r=>Q(r)===Q(t))?e.filter(r=>Q(r)!==Q(t)):[...e,t]}function lh(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function mr(e,t,r){let n=lh(e,t);return r?n:n.filter(a=>!Zt(a))}function ch(){let[e,t]=Pt(),[r]=Mt(),a=St().map(u=>u.id),i=mr(e,a,r),s=a.filter(u=>!Zt(u)),c=a.filter(u=>Zt(u)),p=u=>u.length===i.length&&u.every(g=>i.includes(g)),l=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:i.length===a.length,select:()=>{Ot(!0),t("all")}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:p(c),select:()=>{Ot(!0),t(c)}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:p(s),select:()=>{Ot(!1),t(s)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},l.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Ou(){let[e,t]=Pt(),[r]=Mt(),n=St(),a=n.map(c=>c.id),i=mr(e,a,r),s=c=>{let p=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);p.length&&(Ot(p.some(l=>Zt(l))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(ch,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let p=i.includes(c.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:c.id,onClick:()=>s(c.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(xe,{status:c.id==="open"?null:c.id,dotCls:c.cls})),o.createElement("span",null,c.label))}))}function Ka(e){return e==="flagged"?o.createElement(Oe,null):e==="priority"?o.createElement(To,null):e==="due"?o.createElement($r,null):e==="updated"?o.createElement(uc,null):e==="created"?o.createElement(pc,null):o.createElement(mc,null)}function zs({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,c]=o.useState(r),p=Object.entries(Mr);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{c("desc"),n("desc")}},o.createElement(Fr,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{c("asc"),n("asc")}},o.createElement(Rr,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([l,u])=>o.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),t(l)}},Ka(l),o.createElement("span",null,d(u))))))}function _u({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:c}){let[p,l]=o.useState(a),[u,g]=o.useState(i),h=p.length===r.length&&(!n||u),m=[...r.map(O=>p.some(M=>M.toLowerCase()===O.toLowerCase())),...n?[u]:[]],w=(O,M)=>O?` active${m[M-1]?"":" selection-run-start"}${m[M+1]?"":" selection-run-end"}`:"",v=o.useMemo(()=>ps(e),[e]),P=(O,M)=>{l(O),g(M),s(O,M)};return o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>P(h?[]:r,h?!1:n)},d(h?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((O,M)=>{let N=m[M];return o.createElement("button",{key:O,type:"button",className:`todo-group-filter-row${Ln(O,t)?" todo-subgroup":""}${w(N,M)}`,"aria-pressed":N,onClick:()=>P(N?p.filter(A=>A.toLowerCase()!==O.toLowerCase()):[...p,O],u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},N?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Ee(Pe(O,t))}}),o.createElement("span",{className:"todo-tree-label"},O),o.createElement("span",{className:"todo-tree-count"},ca(v,O)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${w(u,r.length)}`,"aria-pressed":u,onClick:()=>P(p,!u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},ca(v,null)))))}var Mu={scheduled:()=>o.createElement($r,null),today:()=>o.createElement(Ur,null),week:()=>o.createElement(ia,null),flagged:()=>o.createElement(Oe,null),all:()=>o.createElement(jr,null),completed:()=>o.createElement(We,null)},uh=()=>{let{activePluginTab:e,dateFormat:t}=wt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Ia(),a=ht(),i=Xc(),[s,c]=o.useState(""),[p,l]=o.useState(""),[u,g]=o.useState(""),[h,m]=o.useState({}),[w,v]=o.useState(!1),[P,O]=o.useState(!0),[M,N]=o.useState(!1),[A,H]=o.useState(!1),{DateField:ee,TimeField:q}=f.ui.settings,[te,I]=o.useState(!1),[z,j]=Sa(),[B]=Mt(),[S,x]=ha("todo"),{sortField:R,sortDir:F,compact:E}=S,[D,Y]=Pt(),K=St(),_=ba(),ne=Ta(),C=o.useMemo(()=>Nc(ne),[ne]),G=e?.pluginId===f.pluginId,y=o.useRef(null),L=o.useRef(null),$=o.useRef(null),b=lr(R,F,"left_sidebar");zo(b.openDetail);let k=ce(new Date),V=o.useMemo(()=>Lc(b.todos,k),[b.todos,k]),de=o.useMemo(()=>ps(b.todos),[b.todos]),le=o.useMemo(()=>ke(a),[a]),oe=o.useMemo(()=>b.todos.some(T=>!T.group),[b.todos]),[fe,Qe,qe]=_l(),ft=o.useMemo(()=>a.filter(T=>a.some(W=>W.parent===T.id)).map(T=>T.id),[a]),Ft=ft.length>0&&ft.every(T=>fe.has(T)),dt=o.useRef(null),$t=o.useRef(null),[vt,Ut]=o.useState(null),an=o.useMemo(()=>{let T=b.ordered.filter(W=>la(W,i,B,k));return D!=="all"&&(T=T.filter(W=>Wo(W,D))),z.trim()&&(T=T.filter(In(z))),n?T=T.filter(W=>{let pe=W.dueDate?.slice(0,10);return!!pe&&pe>=n.start&&pe<=n.end}):r&&(T=T.filter(W=>W.dueDate?.slice(0,10)===r)),T},[b.ordered,i,B,D,z,r,n,k]),sn=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Xa=async()=>{if(b.creating)return;let T=Un(s,k),W=T.title;if(!W){No();return}let pe=sn;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let $e=await f.ui.openMenu([...i.names.map((ao,ue)=>({id:`group:${ue}`,label:ao})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:y.current??$.current,align:"start"});if($e===null)return;pe=$e.startsWith("group:")?i.names[Number($e.slice(6))]:void 0}H(!1);let Ye={note:p.trim(),tags:[...new Set([...h.tags??[],...u.split(/[\s,]+/).map($e=>$e.replace(/^#+/,"")).filter(Boolean)])],priority:T.priority,...pe?{group:pe}:{}};i.kind==="smart"&&i.id==="flagged"&&(Ye.flagged=!0),Object.assign(Ye,{...h,tags:Ye.tags}),T.dueDate&&(Ye.dueDate=T.dueDate),await b.create(W,void 0,{patch:Ye})?(H(!1),c(""),l(""),g(""),m({}),v(!1),O(!0),N(!1),y.current?.focus()):H(!0)},fr=()=>{I(!0),window.setTimeout(()=>y.current?.focus(),0)},No=()=>{c(""),I(!1),l(""),g(""),m({}),v(!1),O(!0),N(!1),H(!1)},U=ze(),J=o.useSyncExternalStore(U.subscribe,U.get,U.get);o.useEffect(()=>{J?.mode==="create"&&(I(!0),U.clear())},[J,U]),o.useEffect(()=>{te&&!b.creating&&y.current?.focus()},[te,G,b.creating]),o.useLayoutEffect(()=>{L.current&&(L.current.style.height="auto",L.current.style.height=`${L.current.scrollHeight}px`)},[p,te]);let se=h.dueDate??"",be=te&&o.createElement("form",{className:"todo-compose",onSubmit:T=>{T.preventDefault(),Xa()},onKeyDown:T=>{T.key==="Escape"&&!T.defaultPrevented&&!b.creating&&(T.preventDefault(),No())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:y,className:"todo-compose-title",value:s,onChange:T=>c(T.target.value),placeholder:sn?d("todo.newTodoIn",{p0:sn}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:b.creating}),o.createElement("textarea",{ref:L,className:"todo-compose-note",rows:1,value:p,onChange:T=>l(T.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:b.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(T=>o.createElement("span",{className:"todo-compose-token",key:T},o.createElement("span",null,"#",T),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:T}),disabled:b.creating,onClick:()=>m(W=>({...W,tags:W.tags?.filter(pe=>pe!==T)}))},o.createElement(Te,null)))),o.createElement("input",{value:u,onChange:T=>{let W=T.target.value;if(!("isComposing"in T.nativeEvent&&T.nativeEvent.isComposing)&&/[\s,]/.test(W)){let pe=W.split(/[\s,]+/),Ye=pe.pop()??"";m(tt=>({...tt,tags:[...new Set([...tt.tags??[],...pe.map($e=>$e.replace(/^#+/,"")).filter(Boolean)])]})),g(Ye)}else g(W)},onKeyDown:T=>{T.nativeEvent.isComposing||(T.key==="Enter"&&u.trim()&&(T.preventDefault(),m(W=>({...W,tags:[...new Set([...W.tags??[],u.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),T.key==="Backspace"&&!u&&m(W=>({...W,tags:W.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:b.creating})),P&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(ee,{className:"todo-compose-date-field",value:se,onChange:T=>m(W=>({...W,dueDate:T})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:b.creating}),o.createElement(q,{className:"todo-compose-time-field",value:h.startTime??"",onChange:T=>m(W=>({...W,startTime:T||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:b.creating})),M&&o.createElement("div",{className:"todo-compose-location"},o.createElement(rr,{value:h.location,disabled:b.creating,onChange:T=>m(W=>({...W,location:T}))})),(w||!!h.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(T=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:T,title:T},o.createElement(ro,null),o.createElement("span",null,T.split("/").pop()),o.createElement("button",{type:"button",disabled:b.creating,"aria-label":`${d("todo.removeAttachment")}: ${T}`,onClick:()=>m(W=>({...W,attachments:W.attachments?.filter(pe=>pe!==T)}))},o.createElement(Te,null)))),w&&o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:b.creating,onChange:T=>{T&&(m(W=>({...W,attachments:[...new Set([...W.attachments??[],T])]})),v(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${se?" has-value":""}`,"aria-pressed":P,disabled:b.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>O(T=>!T)},o.createElement(yt,null),se&&o.createElement("span",null,at(se,k,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),t),h.startTime?` ${h.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${h.location?" has-value":""}`,"aria-pressed":M,disabled:b.creating,"aria-label":d("todo.compose.addPlace"),title:h.location?.name??d("todo.compose.addPlace"),onClick:()=>N(T=>!T)},o.createElement(Je,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${h.attachments?.length?" has-value":""}`,"aria-pressed":w,disabled:b.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>v(T=>!T)},o.createElement(ro,null),!!h.attachments?.length&&o.createElement("span",null,h.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${h.priority&&h.priority!=="normal"?" has-value":""}`,disabled:b.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async T=>{let W=await f.ui.openMenu(Ze.map(pe=>({id:pe.id,label:d(pe.labelKey),checked:pe.id===(h.priority??"normal")})),{anchor:T.currentTarget,align:"start"});W&&m(pe=>({...pe,priority:W}))}},o.createElement(To,null),h.priority&&h.priority!=="normal"&&o.createElement("span",null,d(`todo.priority.${h.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(T=>({...T,flagged:!(T.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":h.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:b.creating},o.createElement(Oe,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||b.creating},d("todo.group.add"))),A&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:No,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:b.creating},o.createElement(Te,null))),et=K.map(T=>T.id),Lo=mr(D,et,B),xt=et.filter(T=>Zt(T)),Za=T=>T.length===Lo.length&&T.every(W=>Lo.includes(W)),Po=Za(et)?"all":Za(xt)?"completed":Za(et.filter(T=>!Zt(T)))?"todo":null,Ks={all:o.createElement(jr,null),completed:o.createElement(We,null),todo:o.createElement(hc,null)},Vs={all:d("todo.chip.all"),completed:d("todo.view.completed"),todo:d("todo.status.todo")},cp=T=>{f.ui.openMenu(["all","completed","todo"].map(W=>({label:Vs[W],icon:Ks[W],type:"radio",checked:Po===W,onSelect:()=>{Ot(W!=="todo"),Y(W==="completed"&&xt.length?xt:"all")}})),{anchor:T,align:"end"})},up=T=>{f.ui.openPopover(()=>o.createElement(zs,{sortField:R,setSortField:W=>x({sortField:W}),sortDir:F,setSortDir:W=>x({sortDir:W})}),{anchor:T,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},pp=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},mp=(T,W)=>{if(W.shiftKey){let pe=Nu(i);Yr(Lu({...pe,names:Pu(pe.names,T)}))}else Yr({kind:"groups",names:[T]})},Ja=(T,W,pe,Ye,tt,$e,ao,ue,Me)=>{let Re=ua(i,W),Ue=W.kind==="groups"&&W.names.length===1&&!W.includeUngrouped&&i.kind==="groups"?i.names.some(lt=>Q(lt)===Q(W.names[0])):Re;return o.createElement("button",{key:it(W),type:"button",className:`todo-tree-row${tt?" nested":""}${Me?" todo-subgroup":""}${$e?` todo-${$e}-chip`:""}${Ue?" active":""}`,"aria-current":Re?"true":void 0,"aria-label":$e?`${T} ${pe}`:void 0,title:$e?T:void 0,"aria-pressed":W.kind==="groups"?Ue:void 0,style:ao?{"--todo-chip-color":Ee(ao),"--todo-chip-on":ue??Vt(ao)}:void 0,onClick:lt=>{Na(lt)||W.kind!=="groups"||W.names.length!==1?Yr(W,Na(lt)):mp(W.names[0],lt)},onAuxClick:lt=>{lt.button===1&&(lt.preventDefault(),Yr(W,!0))}},Ye&&o.createElement("span",{className:"todo-tree-icon"},Ye),tt&&o.createElement("span",{className:"todo-tree-dot",style:{background:Ee(tt)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},T),o.createElement("span",{className:"todo-tree-count"},pe))},fp=!!(z||r||n||D!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),Bs=n?`${Be(n.start,t)} \u2013 ${Be(n.end,t)}`:r?Be(r,t):null,Hs=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!G&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${Po==="todo"?"":" active"}`,"aria-label":d("todo.filters.title"),"aria-haspopup":"menu",title:Po?`${d("todo.filters.title")}: ${Vs[Po]}`:d("todo.filters.title"),type:"button",onClick:T=>cp(T.currentTarget)},Po?Ks[Po]:o.createElement(Cc,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":E,title:E?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>x({compact:!E})},E?o.createElement(Yn,null):o.createElement(Xn,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${F==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Mr[R])}`,type:"button",onClick:T=>up(T.currentTarget)},F==="asc"?o.createElement(Rr,null):o.createElement(Fr,null),Ka(R))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:T=>Na(T)?dr(i,!0):f.workspace.openMainTab(),onAuxClick:T=>{T.button===1&&(T.preventDefault(),dr(i,!0))}}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(It,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:z,onChange:T=>j(T.target.value),onKeyDown:T=>{T.key==="Escape"&&j("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),z&&o.createElement("button",{className:"search-field-action",onClick:()=>j(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(Te,null)))),G?o.createElement("div",{className:"todo-tree todo-active-navigation"},be,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},C.map(T=>Ja(d(T.labelKey),{kind:"smart",id:T.id},V[T.id],Mu[T.id](),void 0,"smart",T.color,Hr(T,Vt)))),o.createElement("div",{className:"todo-navigation-groups",onDragOver:T=>{dt.current&&$t.current&&T.preventDefault()},onDrop:T=>{let W=dt.current,pe=$t.current;dt.current=null,$t.current=null,Ut(null),!(!W||!pe)&&(T.preventDefault(),Qi(W.id,pe).catch(()=>{}))}},o.createElement("div",{className:"todo-navigation-groups-head"},o.createElement("span",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),ft.length>0&&o.createElement("button",{type:"button",className:"panel-tool-btn todo-groups-fold-all","aria-label":d(Ft?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),title:d(Ft?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),onClick:()=>qe(Ft?[]:ft)},Ft?o.createElement(tr,null):o.createElement(xc,null))),a.filter(T=>!(T.parent&&fe.has(T.parent))).map((T,W,pe)=>{let Ye=a.some(ue=>ue.parent===T.id),tt=Ye&&fe.has(T.id),$e=(ue,Me)=>{let Re=ue.currentTarget.getBoundingClientRect(),Ue=(Number.isFinite(ue.clientX)?ue.clientX:Me.x)-Me.x;return zl(Me.id,T.id,ue.clientY<Re.top+Re.height/2?"before":"after",Ue>20?1:Ue<-20?-1:0,tt)},ao=(ue,Me)=>{let Re=pe.filter(io=>io.id!==Me&&io.parent!==Me),Ue=ue.parent!==null&&!fe.has(ue.parent);if(ue.before!==null&&Re.some(io=>io.id===ue.before))return{id:ue.before,position:"before",nested:Ue};let lt=ue.parent===null?Re.at(-1):Re.filter(io=>io.id===ue.parent||io.parent===ue.parent).at(-1);return lt?{id:lt.id,position:"after",nested:Ue}:null};return o.createElement("div",{key:T.id,className:`todo-group-nav-row${vt?.id===T.id?` drop-${vt.position}${vt.nested?" drop-nested":""}`:""}`,draggable:!0,onDragStart:ue=>{dt.current={id:T.id,x:Number.isFinite(ue.clientX)?ue.clientX:0},ue.dataTransfer.effectAllowed="move",ue.dataTransfer.setData("text/plain",T.id)},onDragOver:ue=>{let Me=dt.current;if(!Me)return;let Re=$e(ue,Me),Ue=Re?ao(Re,Me.id):null;if($t.current=Ue?Re:null,!Ue){vt&&Ut(null);return}ue.preventDefault(),ue.dataTransfer.dropEffect="move",(vt?.id!==Ue.id||vt.position!==Ue.position||vt.nested!==Ue.nested)&&Ut(Ue)},onDrop:ue=>{let Me=dt.current,Re=Me?$e(ue,Me):null;dt.current=null,$t.current=null,Ut(null),ue.stopPropagation(),!(!Me||!Re)&&(ue.preventDefault(),Qi(Me.id,Re).catch(()=>{}))},onDragEnd:()=>{dt.current=null,$t.current=null,Ut(null)}},Ye&&o.createElement("button",{type:"button",className:"todo-group-toggle","aria-expanded":!tt,"aria-label":d(tt?"todo.view.expandGroup":"todo.view.collapseGroup",{p0:T.name}),onClick:()=>Qe(T.id)},tt?o.createElement(or,null):o.createElement(er,null)),Ja(T.name,{kind:"groups",names:[T.name]},ca(de,T.name),void 0,Pe(T.name,a),void 0,void 0,void 0,T.parent!==void 0))}))):o.createElement(o.Fragment,null,!z&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},Bs?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:pp},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Ur,null)),o.createElement("span",{className:"todo-tree-label"},Bs),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Te,null))):C.map(T=>Ja(d(T.labelKey),{kind:"smart",id:T.id},V[T.id],Mu[T.id](),void 0,"smart",T.color,Hr(T,Vt))))),o.createElement("div",{className:"todo-list"},be,b.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):an.length?o.createElement(ja,{todos:an,groups:a,compact:E,controller:b,mode:_,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,fp)))),!te&&o.createElement("button",{ref:$,className:"todo-fab",type:"button","aria-label":Hs,title:Hs,disabled:b.creating,onClick:fr},o.createElement(to,null)),o.createElement(pr,{c:b}))},zu=()=>o.createElement(uh,null);function Va(){return f.workspace.openOwnSettings("groups"),Promise.resolve()}function ph({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=St(),[i,s]=o.useState(e),[c,p]=o.useState(r),l=a.map(m=>m.id),u=c==="all"?l:c,g=m=>{s(m),t(m)},h=m=>{let w=u.includes(m)?u.filter(P=>P!==m):l.filter(P=>u.includes(P)||P===m);if(!w.length)return;let v=w.length===l.length?"all":w;p(v),n(v)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>o.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(m.id),onClick:()=>h(m.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(m.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(xe,{status:m.id==="open"?null:m.id,dotCls:m.cls})),o.createElement("span",null,m.label)))))}var Gu=()=>{let{activePath:e,weekStart:t}=wt("activePath","weekStart"),r=so(e)??"",n=ht(),a=ba(),[i,s]=ha("attachment"),{showCompleted:c,statusFilter:p,compact:l,sortField:u,sortDir:g,groupNames:h,includeUngrouped:m}=i,w=I=>s({showCompleted:I}),v=I=>s({statusFilter:I}),P=I=>s({sortField:I}),O=I=>s({sortDir:I}),M=lr(u,g,"right_sidebar");zo(M.openDetail);let N=o.useMemo(()=>ke(n),[n]),A=o.useMemo(()=>M.todos.some(I=>!I.group),[M.todos]),H=o.useMemo(()=>M.ordered.filter(I=>!(so(I.filePath)===r||(I.attachments??[]).some(j=>so(j)===r))||!c&&I.completed||(h.length||m)&&(!I.group&&!m||I.group&&!h.some(j=>kt(j).has(Q(I.group??""))))?!1:Wo(I,p)),[M.ordered,r,c,p,h,m]),ee=I=>{f.ui.openPopover(({close:z})=>o.createElement(_u,{todos:M.todos,groups:n,names:N,hasUngrouped:A,selected:h,includeUngrouped:m,onChange:(j,B)=>s({groupNames:j,includeUngrouped:B}),onOpenSettings:()=>{z(),Va()}}),{anchor:I,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},q=I=>{f.ui.openPopover(()=>o.createElement(ph,{showCompleted:c,setShowCompleted:w,filter:p,setFilter:v}),{anchor:I,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},te=I=>{f.ui.openPopover(()=>o.createElement(zs,{sortField:u,setSortField:P,sortDir:g,setSortDir:O}),{anchor:I,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||m?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:I=>ee(I.currentTarget)},o.createElement(Jn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:I=>q(I.currentTarget)},o.createElement(We,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!l})},l?o.createElement(Yn,null):o.createElement(Xn,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${g==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Mr[u])}`,onClick:I=>te(I.currentTarget)},g==="asc"?o.createElement(Rr,null):o.createElement(Fr,null),Ka(u)))),o.createElement("div",{className:"todo-list"},M.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?H.length?o.createElement(ja,{todos:H,groups:n,compact:l,controller:M,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(pr,{c:M}))};var Ru=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],mh=["title","due","priority","group","note"],Ba=[10,20,30,40,50,100,200,500],Rt=Ze.map(e=>e.id).reverse(),Gs=Ru.map(e=>e.id),Io={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function Co(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var Do=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Fu(e){let[t,r]=o.useState({due:Io.due,priority:Io.priority,flagged:Io.flagged,mins:{...tn}}),n=f.getState().dateFormat,a=f.ui.language();return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let s=ce(new Date),c={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},p=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(v,P)=>at(`2030-${String(P+1).padStart(2,"0")}-28`,s,c,a,n))],l=Math.max(...p.map(v=>Co(i,"todo-table-cell-btn is-overdue",`<span>${Do(v)}</span><span class="todo-table-time">23:59</span>`)),Co(i,"todo-table-sort active",`<span>${Do(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...Rt.map(v=>Co(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${Do(Ve(v))}</span>`)),Co(i,"todo-table-sort active",`<span>${Do(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=Co(i,"todo-table-sort active",`<span>${Do(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),h=v=>Co(i,"todo-table-sort active",`<span>${Do(d(v))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(Ya.map(v=>[v,Math.max(tn[v],h(v==="title"?"todo.table.title":Ha[v]))])),w={due:Math.max(l+10,96),priority:Math.max(u+10,72),flagged:Math.max(g+10,48),mins:m};r(v=>JSON.stringify(v)===JSON.stringify(w)?v:w)},[e,n,a]),t}var fh=360;function $u(e,t){let[r,n]=o.useState(Io.tags),a=o.useMemo(()=>[...new Set(t.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],[t]),i=a.join("\0");return o.useLayoutEffect(()=>{let s=e.current;if(!s)return;let c=Math.max(0,...a.map(p=>Co(s,"",p.split(`
`).map(l=>`<span class="todo-table-tag">#${Do(l)}</span>`).join(""))));n(Math.min(fh,Math.max(Io.tags,c+12)))},[e,i]),r}var Uu=240,ju=82,Ha=Object.fromEntries(Ru.map(e=>[e.id,e.labelKey]));function gh(e){if(!Array.isArray(e))return mh;let t=[...new Set(e)].filter(r=>r==="title"||Gs.includes(r));return t.includes("title")?t:["title",...t]}function hh(e){return Array.isArray(e)?Rt.filter(t=>e.includes(t)):[]}function Ku(e){return Ba.includes(e)?e:Ba[0]}function on(e,t){let[r,n]=o.useState(()=>t(f.settings.get()[e]));o.useEffect(()=>f.settings.subscribe(()=>{let i=t(f.settings.get()[e]);n(s=>JSON.stringify(s)===JSON.stringify(i)?s:i)}),[e,t]);let a=o.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var Wa=()=>on("pageColumns",gh),qa=e=>e==="title"?"todo.table.title":Ha[e],rn=()=>on("pagePriorityFilter",hh),Ya=["title","note","group","location","tags"],tn={title:180,note:120,group:104,location:104,tags:96},Rs=900;function Vu(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of Ya){let a=t[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(Rs,Math.max(tn[n],a))))}return r}function bh({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function Bu(){let[e]=Pt(),[t]=Mt(),n=St().map(c=>c.id),a=mr(e,n,t),i=e!=="all"&&a.length!==n.length,s=d("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":s,title:s,onClick:c=>{f.ui.openPopover(()=>o.createElement(Ou,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},o.createElement(We,null))}function yh(){let[e,t]=rn();return o.createElement("div",{className:"todo-status-filter-menu"},Rt.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):Rt.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(mt,{priority:r})),o.createElement("span",null,Ve(r)))}))}function Hu(){let[e]=rn();return o.createElement(bh,{label:d("todo.table.priority"),active:e.length>0,icon:o.createElement(To,null),onOpen:t=>{f.ui.openPopover(()=>o.createElement(yh,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function wh(){let[e,t]=Wa(),r=[...e,...Gs.filter(p=>!e.includes(p))],[n,a]=o.useState(null),[i,s]=o.useState(null),c=(p,l,u)=>{if(p===l)return;let g=r.filter(h=>h!==p);g.splice(g.indexOf(l)+(u?1:0),0,p),t(g.filter(h=>e.includes(h)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),s(null)}},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,l)=>{let u=e.includes(p),g=p==="title",h=d(qa(p));return o.createElement("div",{key:p,className:`todo-column-option${g?" is-locked":""}${n===p?" is-dragging":""}${i?.id===p?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let w=m.currentTarget.getBoundingClientRect();s({id:p,after:m.clientY>w.top+w.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),s(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:h}),title:d("todo.table.reorderColumn",{p0:h}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",p);let w=m.currentTarget.parentElement;w&&m.dataTransfer.setDragImage(w,12,w.offsetHeight/2),a(p)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let w=r[l+(m.key==="ArrowUp"?-1:1)];w&&c(p,w,m.key==="ArrowDown")}},o.createElement(Qo,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:g,onClick:()=>t(r.filter(m=>m===p?!u:e.includes(m)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,h)))}))}function Wu(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>o.createElement(wh,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},o.createElement(Ac,null))}function Fs({field:e,label:t,className:r,sort:n,onSort:a,width:i,resize:s,thProps:c}){let p=n.field===e,l=p?n.dir==="asc"?ra:na:tr;return o.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>a(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(l,null)),s)}function qu({id:e,label:t,min:r,onDrag:n,onCommit:a,onReset:i}){let s=o.useRef(null),c=p=>Math.round(Math.min(Rs,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:t}),title:d("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),i(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let l=p.currentTarget.parentElement,u=l?l.getBoundingClientRect().width:tn[e];s.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!s.current)return;let l=c(s.current.startWidth+p.clientX-s.current.startX);s.current.width=l,n(e,l)},onPointerUp:p=>{s.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),a(e,s.current.width),s.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),s.current=null}})}var Yu='input, button, a, textarea, [contenteditable="true"]',Xu=Os(function({todo:t,groups:r,columns:n,actions:a,pending:i,env:s,selected:c,onPick:p}){let l=o.useRef(null);o.useEffect(()=>l.current?hn(t.id,l.current):void 0,[t.id]);let u=Ms(t.title),g=cr(t.note),{check:h}=_s(t,i,a.patchTodo),m=Le(t),w=E=>a.patchTodo(t.id,E),v=s.today,P=s.dateFormat,O=t.dueDate?at(t.dueDate,v,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,P):"",M=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<v,[N,A]=o.useState(!1),H=o.useRef(null);o.useEffect(()=>()=>{H.current&&clearTimeout(H.current)},[]);let[ee,q]=o.useState(t.title),te=()=>{let E=ee.trim();A(!1),E&&E!==t.title&&w({title:E})},[I,z]=o.useState(null),j=(E,D)=>{z(E),D.catch(()=>{}).finally(()=>z(Y=>Y===E?null:Y))},B=(E,D,Y,K,_=260)=>{j(E,f.ui.openPopover(K,{anchor:D,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:Y,width:_}))},S=(E,D,Y)=>I===E?o.createElement("span",{className:"todo-table-placeholder"},D,o.createElement("span",null,Y)):null,x=E=>`todo-table-${E}${I===E?" is-editing":""}`,R=E=>{let D=t.note,Y=()=>{D!==t.note&&w({note:D})};z("note"),f.ui.openPopover(({close:K})=>o.createElement(_a,{initial:t.note,onInput:_=>{D=_},onDone:()=>{Y(),K()}}),{anchor:E,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(Y(),!0)}).catch(()=>{}).finally(()=>z(K=>K==="note"?null:K))},F=E=>{switch(E){case"note":return o.createElement("td",{className:x("note"),title:g||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:D=>R(D.currentTarget)},g?o.createElement("span",{className:"todo-table-note-text"},g):S("note",null,d("todo.table.note"))));case"group":return o.createElement("td",{className:x("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:D=>j("group",f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>w({group:void 0})},...Gt(ke(r),r,Y=>({label:Y,type:"radio",checked:t.group===Y,color:Pe(Y,r),onSelect:()=>w({group:Y})}))],{anchor:D.currentTarget,align:"start"}))},t.group?o.createElement("span",{className:"todo-table-group-pill",title:t.group,style:{"--todo-group-color":Ee(Pe(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},t.group)):S("group",null,d("todo.table.group"))));case"priority":return o.createElement("td",{className:x("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${t.priority==="normal"?" muted":""}`,disabled:i,title:d("todo.table.priority"),onClick:D=>j("priority",f.ui.openMenu(Rt.map(Y=>({label:Ve(Y),icon:o.createElement(mt,{priority:Y}),type:"radio",checked:t.priority===Y,onSelect:()=>w({priority:Y})})),{anchor:D.currentTarget}))},o.createElement(mt,{priority:t.priority}),o.createElement("span",null,Ve(t.priority))));case"due":return o.createElement("td",{className:x("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${M?" is-overdue":""}`,disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:t.dueDate?Be(t.dueDate,P):d("todo.field.dueDate"),onClick:D=>B("due",D.currentTarget,d("todo.field.dueDate"),()=>o.createElement(uu,{todo:t,onPatch:Y=>{w(Y)}}),240)},o.createElement("span",null,O),t.startTime&&o.createElement("span",{className:"todo-table-time"},t.startTime)));case"flagged":return o.createElement("td",{className:x("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${t.flagged?" on":""}`,"aria-pressed":!!t.flagged,disabled:i,"aria-label":d("todo.flag"),title:d(t.flagged?"todo.flagged":"todo.flag"),onClick:()=>w({flagged:!t.flagged})},o.createElement(Oe,null)));case"location":return o.createElement("td",{className:x("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:t.location?.name??d("todo.field.location"),onClick:D=>B("location",D.currentTarget,d("todo.field.location"),()=>o.createElement(Ga,{todo:t,onPatch:Y=>{w(Y)}}),300)},t.location?o.createElement(o.Fragment,null,o.createElement(Je,null),o.createElement("span",null,t.location.name)):S("location",o.createElement(Je,null),d("todo.field.location"))));case"tags":return o.createElement("td",{className:x("tags"),title:t.tags?.map(D=>`#${D}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:D=>B("tags",D.currentTarget,d("todo.edit.tags"),()=>o.createElement(za,{todo:t,onPatch:Y=>{w(Y)}}),280)},t.tags?.length?t.tags.map(D=>o.createElement("span",{key:D,className:"todo-table-tag"},"#",D)):S("tags",null,d("todo.table.tags"))))}};return o.createElement("tr",{ref:l,className:`todo-table-row${t.completed?" completed":""}${c?" selected":""}${I||N?" is-editing":""}`,"data-todo-id":t.id,"data-status":m,"aria-selected":c,tabIndex:0,onContextMenu:E=>Oa(E,{todo:t,groupNames:ke(r),setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:w,onRequestDelete:()=>Qt(t,a.removeTodo),disabled:i}),onKeyDown:E=>{if(E.target===E.currentTarget)if(E.key==="ArrowDown"||E.key==="ArrowUp"){E.preventDefault();let D=E.key==="ArrowDown"?E.currentTarget.nextElementSibling:E.currentTarget.previousElementSibling;for(;D&&!D.classList.contains("todo-table-row");)D=E.key==="ArrowDown"?D.nextElementSibling:D.previousElementSibling;D?.focus()}else E.key==="Enter"?(E.preventDefault(),a.openDetail(t.id)):E.key===" "?(E.preventDefault(),p(t.id,!1)):E.key==="Escape"&&E.currentTarget.blur()},onClick:E=>{E.target.closest(Yu)||(f.ui.hasModKey(E)||E.shiftKey)&&p(t.id,E.shiftKey)},onDoubleClick:E=>{let D=!!E.target.closest(".todo-table-title-btn");D&&H.current&&(clearTimeout(H.current),H.current=null),!(!D&&E.target.closest(Yu)||f.ui.hasModKey(E)||E.shiftKey)&&a.openDetail(t.id)}},o.createElement("td",{className:"todo-table-select"},h),n.map(E=>o.createElement(o.Fragment,{key:E},E==="title"?o.createElement("td",{className:"todo-table-title"},N?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:ee,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:D=>q(D.target.value),onBlur:te,onKeyDown:D=>{D.nativeEvent.isComposing||(D.key==="Enter"?(D.preventDefault(),te()):D.key==="Escape"&&(D.preventDefault(),q(t.title),A(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:i,"aria-label":d("todo.table.editTitle",{p0:t.title}),onClick:D=>{if(f.ui.hasModKey(D)||D.shiftKey){p(t.id,D.shiftKey);return}D.detail>1||(H.current&&clearTimeout(H.current),H.current=setTimeout(()=>{H.current=null,q(t.title),A(!0)},220))}},u?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:u}}):o.createElement("span",{className:"todo-table-title-text"},t.title))):F(E))),o.createElement("td",{className:"todo-table-actions"}))});function vh(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Zu({order:e,groups:t,c:r,newTaskPatch:n,active:a,onActivate:i,onRemove:s}){let[c,p]=o.useState(""),[l,u]=o.useState({}),g=o.useRef(null),h=o.useRef(null),m=o.useRef(!1),[w,v]=o.useState(!0);o.useEffect(()=>{let I=()=>{let j=g.current;j&&(!j.ownerDocument.hasFocus()&&!/jsdom/i.test(navigator.userAgent)&&j.ownerDocument.defaultView?.focus(),j.focus())};I();let z=window.setTimeout(I,60);return()=>window.clearTimeout(z)},[]);let P=async I=>{let z=ce(new Date);for(let j of I){let B=Un(j,z);if(!B.title)continue;let S=B.dueDate||l.dueDate;await r.create(B.title,void 0,{patch:{...n?.(),priority:B.priority!=="normal"?B.priority:l.priority??B.priority,...S?{dueDate:S}:{},...l.group?{group:l.group}:{},...l.flagged?{flagged:!0}:{},...l.note?.trim()?{note:l.note}:{},...l.location?{location:l.location}:{},...l.tags?.length?{tags:l.tags}:{},...l.status?De(l.status):{}}})}p(""),g.current?.focus()},O=s,M=!c.trim(),N=()=>{window.setTimeout(()=>{let I=h.current?.ownerDocument;m.current||!I||!I.hasFocus()||h.current?.contains(I.activeElement)||(M?O():v(!1))},0)};o.useEffect(()=>{let I=j=>{m.current||h.current?.contains(j.target)||(M?O():v(!1))},z=h.current?.ownerDocument;return z?.addEventListener("pointerdown",I,!0),()=>z?.removeEventListener("pointerdown",I,!0)});let A=o.useRef(a);o.useEffect(()=>{A.current&&!a&&(M?O():v(!1)),A.current=a});let H=I=>{m.current=!0,I.catch(()=>{}).finally(()=>{m.current=!1,g.current?.focus()})},ee=I=>{switch(I){case"due":{let z=l.dueDate,j=z?at(z,ce(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"";return o.createElement("td",{key:I,className:"todo-table-due"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:B=>H(f.ui.openPopover(({close:S})=>o.createElement("div",{className:"todo-cell-editor"},o.createElement(no,{value:z??"",onChange:x=>{u(R=>({...R,dueDate:x||void 0})),S()}})),{anchor:B.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},j?o.createElement("span",null,j):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let z=l.priority??"normal";return o.createElement("td",{key:I,className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${z==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:j=>H(f.ui.openMenu(Rt.map(B=>({label:Ve(B),icon:o.createElement(mt,{priority:B}),type:"radio",checked:z===B,onSelect:()=>u(S=>({...S,priority:B}))})),{anchor:j.currentTarget}))},o.createElement(mt,{priority:z}),o.createElement("span",null,Ve(z))))}case"group":return o.createElement("td",{key:I,className:"todo-table-group"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:z=>H(f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>u(j=>({...j,group:void 0}))},...Gt(ke(t),t,j=>({label:j,type:"radio",checked:l.group===j,color:Pe(j,t),onSelect:()=>u(B=>({...B,group:j}))}))],{anchor:z.currentTarget,align:"start"}))},l.group?o.createElement("span",{className:"todo-table-group-pill",title:l.group,style:{"--todo-group-color":Ee(Pe(l.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},l.group)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return o.createElement("td",{key:I,className:"todo-table-flagged"},o.createElement("button",{type:"button",className:`todo-table-flag-btn${l.flagged?" on":""}`,"aria-pressed":!!l.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>u(z=>({...z,flagged:!z.flagged||void 0}))},o.createElement(Oe,null)));case"note":return o.createElement("td",{key:I,className:"todo-table-note",title:l.note||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:z=>{let j=l.note??"",B=()=>u(S=>({...S,note:j||void 0}));H(f.ui.openPopover(({close:S})=>o.createElement(_a,{initial:l.note??"",onInput:x=>{j=x},onDone:()=>{B(),S()}}),{anchor:z.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(B(),!0)}))}},l.note?o.createElement("span",{className:"todo-table-note-text"},cr(l.note)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return o.createElement("td",{key:I,className:"todo-table-location"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:z=>H(f.ui.openPopover(()=>o.createElement(Ga,{todo:{location:l.location},onPatch:j=>u(B=>({...B,location:j.location}))}),{anchor:z.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},l.location?o.createElement(o.Fragment,null,o.createElement(Je,null),o.createElement("span",null,l.location.name)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return o.createElement("td",{key:I,className:"todo-table-tags"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:z=>H(f.ui.openPopover(()=>o.createElement(za,{todo:{tags:l.tags??[]},onPatch:j=>u(B=>({...B,tags:j.tags}))}),{anchor:z.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},l.tags?.length?l.tags.map(z=>o.createElement("span",{key:z,className:"todo-table-tag"},"#",z)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return o.createElement("td",{key:I,className:`todo-table-${I}`})}},q=l.status?At().find(I=>I.status===l.status):void 0,te=I=>H(f.ui.openMenu(At().map(z=>({label:z.label,icon:o.createElement(xe,{status:z.status,dotCls:z.cls,color:z.color}),type:"radio",checked:z.status===null?!l.status:z.status===l.status,onSelect:()=>u(j=>({...j,status:z.status}))})),{anchor:I}));return o.createElement("tr",{className:"todo-table-new-row"+(w&&a?"":" is-idle"),ref:h,onBlur:N,onFocus:()=>{v(!0),i()}},o.createElement("td",{className:"todo-table-select"},o.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:q?.label??d("todo.table.status"),onClick:I=>te(I.currentTarget)},q?o.createElement(xe,{status:q.status,dotCls:q.cls}):o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),e.map(I=>I==="title"?o.createElement("td",{key:I,className:"todo-table-title"},o.createElement("input",{ref:g,className:"todo-table-new-input",value:c,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:z=>p(z.target.value),onKeyDown:z=>{z.nativeEvent.isComposing||(z.key==="Enter"?(z.preventDefault(),c.trim()?P([c]):O()):z.key==="Escape"&&(z.preventDefault(),O()))},onPaste:z=>{let j=z.clipboardData.getData("text/plain");/\r?\n/.test(j.trim())&&(z.preventDefault(),P(vh(`${c}${j}`)))}})):ee(I)),o.createElement("td",{className:"todo-table-actions"}))}function Ju({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:s,sectionOf:c,composeSignal:p=0,newTaskPatch:l}){let[u,g]=Wa(),h=u.filter(U=>U!=="title"),[m,w]=o.useState(null),[v,P]=o.useState(null),O=U=>({className:`${m===U?" is-dragging":""}${v?.id===U?v.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:J=>{if(J.target.closest(".todo-col-resize")){J.preventDefault();return}J.dataTransfer.effectAllowed="move",J.dataTransfer.setData("text/plain",U);let se=J.currentTarget.ownerDocument,be=se.createElement("div");be.className="todo-col-drag-chip",be.textContent=d(qa(U)),se.body.appendChild(be),J.dataTransfer.setDragImage?.(be,Math.round(be.offsetWidth/2),Math.round(be.offsetHeight/2)),window.setTimeout(()=>be.remove(),0),w(U)},onDragOver:J=>{if(!m||m===U)return;J.preventDefault(),J.dataTransfer.dropEffect="move";let se=J.currentTarget.getBoundingClientRect();P({id:U,after:J.clientX>se.left+se.width/2})},onDrop:J=>{if(J.preventDefault(),m&&v&&m!==v.id){let se=u.filter(be=>be!==m);se.splice(se.indexOf(v.id)+(v.after?1:0),0,m),g(se)}w(null),P(null)},onDragEnd:()=>{w(null),P(null)}}}),M=o.useRef(null),N=Fu(M),[A,H]=on("pageColumnWidths",Vu),[ee,q]=o.useState({}),te=$u(M,e),I=Object.fromEntries(Object.entries({tags:te,...A,...ee}).map(([U,J])=>[U,Math.max(J,N.mins[U])])),z=U=>U==="due"?N.due:U==="priority"?N.priority:U==="flagged"?N.flagged:I[U]??Io[U],[j,B]=on("pageRowsPerPage",Ku),[S,x]=o.useState([]),[R,F]=o.useState(null),E=o.useRef(1),D=o.useRef(null);o.useEffect(()=>{if(!p)return;let U=E.current++;x(J=>[U,...J]),F(U),_(0),D.current?.scrollTo?.({top:0})},[p]);let Y=U=>x(J=>J.filter(se=>se!==U)),[K,_]=o.useState(0),[ne,C]=o.useState(i);ne!==i&&(C(i),_(0));let[G,y]=o.useState(()=>new Set),L=o.useRef(null),$=Math.max(1,Math.ceil(e.length/j)),b=Math.min(K,$-1),k=e.slice(b*j,(b+1)*j),V=o.useMemo(()=>e.filter(U=>G.has(U.id)),[e,G]),de=o.useMemo(()=>e.reduce((U,J)=>U+(J.completed?1:0),0),[e]),le=ze(),oe=o.useSyncExternalStore(le.subscribe,le.get,le.get),fe=o.useCallback(U=>{let J=e.findIndex(se=>se.id===U);J>=0&&_(Math.floor(J/j))},[e,j]);o.useLayoutEffect(()=>{oe?.todoId&&fe(oe.todoId)},[oe,fe]),o.useLayoutEffect(()=>{r.editingId&&fe(r.editingId)},[r.editingId]);let Qe=(U,J)=>{y(se=>{let be=new Set(se);for(let et of U)J?be.add(et):be.delete(et);return be})},qe=o.useRef({rows:k,selection:G});qe.current={rows:k,selection:G};let ft=o.useCallback((U,J)=>{let{rows:se,selection:be}=qe.current,et=se.findIndex(xt=>xt.id===U),Lo=J?se.findIndex(xt=>xt.id===L.current):-1;Lo>=0?Qe(se.slice(Math.min(Lo,et),Math.max(Lo,et)+1).map(xt=>xt.id),!0):Qe([U],!be.has(U)),L.current=U},[]),Ft=$a(),dt=Ua(t),$t=()=>{for(let U of V)r.patchTodo(U.id,De("completed"));y(new Set)},vt=async()=>{let U=V.map(se=>se.id);await f.ui.confirm({title:d("todo.table.deleteTitle",{count:U.length}),message:d("todo.table.deleteMessage",{count:U.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(U.map(se=>r.removeTodo(se))),y(new Set))},Ut=(U,J)=>o.createElement(qu,{id:U,label:J,min:N.mins[U],onDrag:(se,be)=>q(et=>({...et,[se]:be})),onCommit:(se,be)=>{q({}),H({...A,[se]:be})},onReset:se=>{q({});let be={...A};delete be[se],H(be)}}),an=U=>{let J=d(Ha[U]),se=Ya.includes(U);return o.createElement(Fs,{field:U==="note"?"notes":U,label:J,className:`todo-table-${U}${O(U).className}`,thProps:O(U).props,sort:n,onSort:a,width:se?I[U]:void 0,resize:se?Ut(U,J):void 0})},sn=3+h.length,Xa=o.useMemo(()=>{if(!c)return null;let U=new Map;for(let J of e){let se=c(J);U.set(se,(U.get(se)??0)+1)}return U},[e,c]),fr=[],No=null;for(let U of k){let J=c?.(U)??null;J&&J!==No&&fr.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${J}`,key:`section:${J}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},d(Vl[J])),o.createElement("span",{className:"todo-table-section-count"},Xa?.get(J)??0))),u.map(se=>o.createElement("td",{key:se,className:`todo-table-${se}`})),o.createElement("td",{className:"todo-table-actions"}))),No=J,fr.push(o.createElement(Xu,{key:U.id,todo:U,groups:dt,columns:u,actions:r.actions,pending:r.pendingIds.has(U.id),env:Ft,selected:G.has(U.id),onPick:ft}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:D},o.createElement("table",{ref:M,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:ju+(I.title??Uu)+h.reduce((U,J)=>U+z(J),0),"--todo-due-width":`${N.due}px`,"--todo-priority-width":`${N.priority}px`,"--todo-flagged-width":`${N.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(Bu,null)),u.map(U=>o.createElement(o.Fragment,{key:U},U==="title"?o.createElement(Fs,{field:"name",label:d("todo.table.title"),className:`todo-table-title${O("title").className}`,thProps:O("title").props,sort:n,onSort:a,width:I.title,resize:Ut("title",d("todo.table.title"))}):an(U))),o.createElement("th",{className:"todo-table-actions",style:I.title?{width:"auto",minWidth:24}:void 0}))),o.createElement("tbody",null,S.map(U=>o.createElement(Zu,{key:U,order:u,groups:t,c:r,newTaskPatch:l,active:R===U,onActivate:()=>F(U),onRemove:()=>Y(U)})),fr)),!k.length&&!S.length&&o.createElement("div",{className:"todo-table-empty-state"},s)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,V.length?d("todo.table.selectedCount",{count:V.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!V.length&&o.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:de})),V.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:$t},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{vt()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:U=>{f.ui.openMenu(Ba.map(J=>({label:String(J),type:"radio",checked:J===j,onSelect:()=>{B(J),_(0)}})),{anchor:U.currentTarget,align:"start"})}},o.createElement("span",null,j),o.createElement(tr,null)),$>1&&o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:b+1,pages:$})),$>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>_(0)},o.createElement(kc,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>_(b-1)},o.createElement(aa,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b>=$-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>_(b+1)},o.createElement(or,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b>=$-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>_($-1)},o.createElement(Sc,null))))))}var xh={group:e=>e.group??void 0,notes:e=>cr(e.note)||void 0,status:e=>ho().indexOf(Le(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},Qu=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=wt("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=Ia(),s=ht(),c=Ca(),p=o.useMemo(()=>Ao(t),[t]),l=p??c,u=n?.pluginId===f.pluginId&&n.instanceId===t,g=xa();o.useEffect(()=>{if(!p)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>sr(-1),goForward:()=>sr(1)}),()=>e.setController(null)},[e,p,g.canGoBack,g.canGoForward]);let[h,m]=Sa(),[w,v]=o.useState(()=>!!h.trim()),P=o.useRef(null),O=()=>{v(!0),window.setTimeout(()=>P.current?.focus(),0)},M=()=>{m(""),v(!1)},[N,A]=Uc(),{field:H,dir:ee}=N,[q]=Mt(),[te,I]=Pt(),[z,j]=rn(),B=lr("due","asc");zo(B.openDetail),o.useEffect(()=>{if(!(B.loading||p))if(l.kind==="groups"){let k=new Set(ke(s));!l.includeUngrouped&&!l.names.some(V=>k.has(V))&&st(Fe)}else l.kind==="tag"&&(B.todos.some(k=>k.tags?.includes(l.name))||st(Fe))},[B.loading,B.todos,s,l,p]);let S=bt(),x=Ta(),R=l.kind==="smart"?So(l.id,x):null,F=La(l);o.useEffect(()=>{f.workspace.setMainTabTitle(F,t)},[F,t]);let E=o.useMemo(()=>{let k=B.todos.filter(V=>la(V,l,q,S));return te!=="all"&&(k=k.filter(V=>Wo(V,te))),z.length&&(k=k.filter(V=>z.includes(V.priority))),h.trim()&&(k=k.filter(In(h))),i?k=k.filter(V=>{let de=V.dueDate?.slice(0,10);return!!de&&de>=i.start&&de<=i.end}):a&&(k=k.filter(V=>V.dueDate?.slice(0,10)===a)),k},[B.todos,l,q,te,z,h,a,i,S]),{ordered:D,sectionOf:Y}=o.useMemo(()=>{let k=xh[H];if(k)return{ordered:Ul(E,k,ee),sectionOf:void 0};if(H!=="auto")return{ordered:Zo(E,H,ee),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:Bl(E).flatMap(le=>le.todos),sectionOf:void 0};let V=$n(E,S),de=new Map;for(let le of zr)for(let oe of V[le])de.set(oe.id,le);return{ordered:zr.flatMap(le=>V[le]),sectionOf:le=>de.get(le.id)??"someday"}},[E,H,ee,l,S]),K=[it(l),h,JSON.stringify(te),z.join(),q,H,ee,a??"",i?.start??"",i?.end??""].join("|"),_=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[ne,C]=o.useState(0),G=()=>C(k=>k+1),y=()=>{let k={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(k.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(k.dueDate=S),l.kind==="smart"&&l.id==="flagged"&&(k.flagged=!0),k},L=ke(s),$=[{label:d("todo.fab.newTodo"),icon:o.createElement(to,null),onSelect:G},...L.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Zn,null),submenu:Gt(L,s,k=>({label:k,onSelect:V=>{let de={kind:"groups",names:[k]};V?.newTab||p?(dr(de,V?.newTab===!0),bd()):(st(de),G())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(Jn,null),onSelect:()=>{Va()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(ko,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Aa(l)))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(wc,null),onSelect:()=>f.workspace.openOwnSettings()}],b=t??"";return o.useEffect(()=>{(u||n?.pluginId!==f.pluginId)&&As($,b)}),o.useEffect(()=>()=>As(null,b),[b]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${w?" is-searching":""}`},w?o.createElement("div",{className:"todo-page-search"},o.createElement(It,{className:"todo-page-search-icon"}),o.createElement("input",{ref:P,className:"todo-page-search-input",value:h,onChange:k=>m(k.target.value),onKeyDown:k=>{k.key==="Escape"&&(k.preventDefault(),M())},onBlur:()=>{h.trim()||v(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):o.createElement("span",{className:"todo-page-appbar-spacer","aria-hidden":"true"}),(i||a)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:_},o.createElement("span",null,i?`${Be(i.start,r)} \u2013 ${Be(i.end,r)}`:Be(a,r)),o.createElement(Te,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!w&&h.trim()?" active":""}`,"aria-label":w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:k=>{w&&k.preventDefault()},onClick:w?M:O},w?o.createElement(Te,null):o.createElement(It,null)),o.createElement(Hu,null),o.createElement(Wu,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:G},o.createElement(to,null)))),B.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(Ju,{todos:D,groups:s,c:B,sort:N,onSort:A,resetKey:K,empty:d("todo.table.empty"),sectionOf:Y,composeSignal:ne,newTaskPatch:y}),o.createElement(pr,{c:B}))};var op=10080;function ep(e){let t=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!t)return null;let r=Number(t[1])*60+Number(t[2]);return r<=op?r:null}function tp(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function rp(){let e=()=>{let m=f.settings.get().reminderOffsets;return Array.isArray(m)?m.filter(w=>Number.isInteger(w)&&w>=0&&w<=op).slice(0,1):[10]},[t,r]=o.useState(e);o.useEffect(()=>f.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:a,SelectField:i}=f.ui.settings,s=t.length?"custom":"off",[c,p]=o.useState(()=>tp(t[0]??10)),[l,u]=o.useState(!1);o.useEffect(()=>{t.length&&(p(tp(t[0])),u(!1))},[t[0]]);let g=m=>{r(m),f.settings.set("reminderOffsets",m)},h=()=>{let m=ep(c);if(m===null){u(!0);return}u(!1),m!==t[0]&&g([m])};return o.createElement(a,{title:d("reminders.title")},o.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},o.createElement(i,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:m=>g(m==="off"?[]:[ep(c)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&o.createElement(n,{title:d("reminders.timeBefore"),description:l?o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},o.createElement("input",{className:`settings-control todo-reminder-time${l?" invalid":""}`,type:"text",inputMode:"numeric",value:c,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":l||void 0,maxLength:6,onChange:m=>{p(m.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),u(!1)},onBlur:h,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),h())}})))}var Th={scheduled:()=>o.createElement($r,null),today:()=>o.createElement(Ur,null),week:()=>o.createElement(ia,null),flagged:()=>o.createElement(Oe,null),all:()=>o.createElement(jr,null),completed:()=>o.createElement(We,null)};function ap(e){let[t,r]=o.useState(e);return o.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[t,r]}function kh(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,s]=ap(ma),c=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],p=m=>{s(m),Rc(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,u=i.order.map(m=>So(m,i)),g=a({items:u,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>d(m.labelKey),onReorder:m=>p({...i,order:m.map(w=>w.id)})}),h=(m,w)=>{if(w){p({...i,hidden:i.hidden.filter(O=>O!==m)});return}if(l<=1)return;let v={...i,hidden:[...i.hidden,m]};p(v);let P=Lt();P.kind==="smart"&&P.id===m&&st({kind:"smart",id:v.order.find(O=>!v.hidden.includes(O))})};return o.createElement(t,{title:d("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.colText")),o.createElement("span",null,d("todo.settings.colShow"))),u.map((m,w)=>{let v=i.hidden.includes(m.id),P=`${m.id}@${w}`,O=g.getHandleProps(m),M=d(m.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(v?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},o.createElement("button",{...O,className:(O.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},o.createElement(Qo,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:Ee(m.color),color:Hr(m,Vt)},"aria-hidden":"true"},Th[m.id]()),o.createElement("span",{className:"todo-settings-name"},M),o.createElement(e,{key:`color:${P}`,value:m.color,onChange:N=>p({...i,colors:{...i.colors,[m.id]:N}}),ariaLabel:d("todo.settings.smartListColor",{p0:M}),allowCustom:!1}),o.createElement(r,{key:`text:${P}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:d("todo.settings.statusText",{p0:M}),onChange:N=>{let A={...i.textColors};N==="auto"?delete A[m.id]:A[m.id]=N,p({...i,textColors:A})}}),o.createElement(n,{key:`show:${P}`,checked:!v,disabled:!v&&l<=1,label:d("todo.settings.smartListShow",{p0:M}),onChange:N=>h(m.id,N)}))})),g.liveRegion)}function nn({initial:e,onCommit:t,onType:r,onEnter:n,placeholder:a,ariaLabel:i,disabled:s,className:c="todo-settings-text",invalid:p}){let l=o.useRef(!1);return o.createElement("input",{className:`settings-control ${c}${p?" invalid":""}`,"aria-invalid":p||void 0,type:"text",defaultValue:e,placeholder:a,"aria-label":i,disabled:s,autoComplete:"off",spellCheck:!1,onChange:u=>r?.(u.currentTarget.value),onBlur:u=>{if(l.current){l.current=!1;return}t(u.currentTarget.value)},onKeyDown:u=>{if(u.key==="Enter"){if(u.preventDefault(),n){t(u.currentTarget.value),n();return}u.currentTarget.blur()}else u.key==="Escape"&&(u.preventDefault(),u.currentTarget.value=e,r?.(e),l.current=!0,u.currentTarget.blur())}})}function Sh({name:e}){let t=qn(),r=e?t[e]:void 0;return r?o.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):o.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function np({current:e,onPick:t}){let r=qn(),n=Object.keys(r).sort((a,i)=>a.localeCompare(i));return o.createElement("div",{className:"todo-icon-picker"},o.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(a=>o.createElement("button",{key:a,type:"button",role:"option","aria-selected":e===a,className:`todo-icon-picker-item${e===a?" is-active":""}`,title:a,"aria-label":a,onClick:()=>t(e===a?void 0:a)},o.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[a]}})))),o.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:ls})))}function Ah(){let{Button:e,ColorField:t,IconButton:r,Section:n,Toggle:a,useReorderDrag:i}=f.ui.settings,[s,c]=ap(Ge);qn();let p=o.useRef(""),[l,u]=o.useState(0),[g,h]=o.useState(!1),m=S=>{let x=Mn(S);c(x),kl(x)},w=s.active.map(S=>Ce(S,s)),v=i({items:w,indicatorOnly:!0,getId:S=>S.id,getLabel:S=>S.label,onReorder:S=>m({...s,active:S.map(x=>x.id)})}),P=(S,x)=>{x!==s.active.includes(S)&&m({...s,active:x?[...s.active,S]:s.active.filter(R=>R!==S)})},O=S=>S.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Ko),[M,N]=o.useState({strike:!1,color:we("teal"),done:!1,show:!0}),A=()=>{let S=O(p.current);if(!S||s.custom.length>=Tr)return;let x=Ci();m({...s,custom:[...s.custom,{id:x,label:S,done:M.done}],active:M.show?[...s.active,x]:s.active,strikethrough:{...s.strikethrough,[x]:M.strike},colors:{...s.colors,[x]:M.color},icons:M.icon?{...s.icons,[x]:M.icon}:s.icons}),p.current="",h(!1),N({strike:!1,color:we("teal"),done:!1,show:!0}),u(R=>R+1)},H=(S,x)=>{let R=O(x);if(ct(S)){if(!R)return;m({...s,custom:s.custom.map(F=>F.id===S?{...F,label:R}:F)})}else{let F={...s.labels};R&&R!==xl(S)?F[S]=R:delete F[S],m({...s,labels:F})}},ee=async(S,x)=>{ct(S)?m({...s,custom:s.custom.map(F=>F.id===S?{...F,done:x}:F)}):m({...s,done:{...s.done,[S]:x}});let R=(await rt()).filter(F=>F.status===S);await Promise.all(R.map(F=>is(F.id,S)))},q=(S,x)=>{let R=Ge(),F={...R.icons};x?F[S]=x:delete F[S],m({...R,icons:F})},te=(S,x)=>{f.ui.openPopover(({close:R})=>o.createElement(np,{current:s.icons[x],onPick:F=>{q(x,F),R()}}),{anchor:S,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},I=async S=>{let x=Ce(S,s).label,R=(await rt()).filter(D=>D.status===S);if(await f.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:x}),message:R.length?d("todo.settings.statusDeleteMoves",{count:R.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(R.map(D=>is(D.id,"open")));let E=Ge();ct(S)?m({...E,custom:E.custom.filter(D=>D.id!==S),active:E.active.filter(D=>D!==S)}):m({...E,removed:[...E.removed,S],active:E.active.filter(D=>D!==S)})},z=(S,x,R)=>{let F=S.id,E=`${F}@${R}`,D=S.label,Y=x==="shown"?v.getHandleProps(S):null,K=x==="locked";return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(K?" locked":"")+(x==="off"?" is-off":"")+(x==="shown"&&v.overId===F?" drop-"+(v.dropPosition??"before"):""),key:F,...x==="shown"?v.getItemProps(S):{}},Y?o.createElement("button",{...Y,className:(Y.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},o.createElement(Qo,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:K?d("todo.settings.statusLocked"):void 0},K&&o.createElement(dc,null)),K?o.createElement("span",{className:`todo-settings-glyph ${S.cls}`},o.createElement(xe,{status:F==="open"?null:F,dotCls:S.cls})):o.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${S.cls}`,title:d("todo.settings.statusIconOf",{p0:D}),"aria-label":d("todo.settings.statusIconOf",{p0:D}),onClick:_=>te(_.currentTarget,F)},o.createElement(xe,{status:F,dotCls:S.cls})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(nn,{key:`name:${E}:${D}`,initial:D,ariaLabel:d("todo.settings.statusName"),onCommit:_=>H(F,_)})),o.createElement(r,{key:`strike:${E}`,className:"todo-settings-strike",pressed:s.strikethrough[F],"aria-pressed":s.strikethrough[F],ariaLabel:d("todo.settings.statusStrike",{p0:D}),title:d("todo.settings.statusStrike",{p0:D}),onClick:()=>m({...s,strikethrough:{...s.strikethrough,[F]:!s.strikethrough[F]}})},o.createElement(sa,null)),o.createElement(t,{key:`color:${E}`,value:s.colors[F],onChange:_=>m({...s,colors:{...s.colors,[F]:_}}),ariaLabel:d("todo.settings.statusColor",{p0:D}),allowCustom:!1}),o.createElement(r,{key:`done:${E}`,className:"todo-settings-strike",pressed:S.done,"aria-pressed":S.done,disabled:K,ariaLabel:d("todo.settings.statusDone",{p0:D}),title:d("todo.settings.statusDone",{p0:D}),onClick:()=>{K||ee(F,!S.done)}},o.createElement(We,null)),K?o.createElement("span",null):o.createElement(a,{key:`show:${E}`,checked:x!=="off",label:d("todo.settings.statusShow",{p0:D}),onChange:_=>P(F,_)}),K?o.createElement("span",null):o.createElement(r,{key:`delete:${E}`,ariaLabel:d("todo.settings.statusDelete",{p0:D}),title:d("todo.settings.statusDelete",{p0:D}),onClick:()=>{I(F)}},o.createElement(oo,null)))},j=[...po.filter(S=>!s.active.includes(S)&&!s.removed.includes(S)),...s.custom.map(S=>S.id).filter(S=>!s.active.includes(S))].map(S=>Ce(S,s)),B=s.custom.length>=Tr;return o.createElement(n,{title:d("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null,d("todo.settings.colIcon")),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},o.createElement(sa,null)),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},o.createElement(We,null)),o.createElement("span",null,d("todo.settings.colShow")),o.createElement("span",null)),z(Ce("open",s),"locked",0),z(Ce("completed",s),"locked",1),w.map((S,x)=>z(S,"shown",2+x)),j.map((S,x)=>z(S,"off",2+w.length+x)),o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},o.createElement("span",{className:"todo-settings-handle is-static"}),o.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:Ee(M.color)},disabled:B,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:S=>{f.ui.openPopover(({close:x})=>o.createElement(np,{current:M.icon,onPick:R=>{N(F=>({...F,icon:R})),x()}}),{anchor:S.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},o.createElement(Sh,{name:M.icon})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(nn,{key:`add:${l}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:B,onType:S=>{p.current=S,!!O(S)!==g&&h(!g)},onCommit:S=>{p.current=S},onEnter:A})),o.createElement(r,{className:"todo-settings-strike",pressed:M.strike,"aria-pressed":M.strike,disabled:B,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>N(S=>({...S,strike:!S.strike}))},o.createElement(sa,null)),o.createElement(t,{key:`add-color:${l}`,value:M.color,onChange:S=>N(x=>({...x,color:S})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),o.createElement(r,{className:"todo-settings-strike",pressed:M.done,"aria-pressed":M.done,disabled:B,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>N(S=>({...S,done:!S.done}))},o.createElement(We,null)),o.createElement(a,{key:`add-show:${l}`,checked:M.show,disabled:B,label:d("todo.settings.colShow"),onChange:S=>N(x=>({...x,show:S}))}),o.createElement(r,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:B||!g,onClick:A},o.createElement(to,null)))),v.liveRegion,s.removed.length>0&&o.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>m({...s,removed:[],active:[...s.active,...s.removed]})},d("todo.settings.statusRestore",{count:s.removed.length})))}function Eh(){let{Row:e,Section:t,SelectField:r}=f.ui.settings,[n,a]=o.useState(pa);return o.createElement(o.Fragment,null,o.createElement(t,{title:d("todo.settings.display")},o.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let s=i;a(s),f.settings.set(bs,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(rp,null))}function Ch(){let{Button:e,ColorField:t,IconButton:r,Section:n,useReorderDrag:a}=f.ui.settings,i=Ml(),s=Pl(),c=Ih(),p=o.useRef(""),[l,u]=o.useState(0),[g,h]=o.useState(()=>$o(s)),[m,w]=o.useState(!1),v=(C,G)=>s.some(y=>y.id!==G&&[y.name,...y.aliases??[]].some(L=>Q(L)===Q(C))),P=C=>{Ji(C)},O=C=>{let G=new Set([C.name,...C.aliases??[]].map(Q));return c.filter(y=>G.has(Q(y))).length},M=C=>xi(i,C).reduce((G,y)=>G+O(y),0),N=28,[A,H]=o.useState(!1),[ee,q]=o.useState(null),[te,I]=o.useState(()=>$o(s)),[z,j]=o.useState(!1),B=o.useRef(null);o.useEffect(()=>{ee&&B.current?.querySelector("input")?.focus()},[ee]);let S=(C,G)=>{if(!G)return;let y;try{y=xr(i,C,G)}catch{return}y.every((L,$)=>L.id===i[$]?.id&&L.parent===i[$]?.parent)||P(y)},x=a({items:i,indicatorOnly:!0,getId:C=>C.id,getLabel:C=>C.name,onReorder:(C,G)=>{let y=G.position==="before"?i[0]?.id:i.at(-1)?.id;S(G.activeId,zd(i,G.activeId,G.position,G.overId===y))}}),R=C=>C.clientX>C.currentTarget.getBoundingClientRect().left+N,F=C=>{let G=x.getItemProps(C);return{...G,onDragOver:y=>{G.onDragOver?.(y),H(R(y))},onDrop:y=>{let L=x.activeId??y.dataTransfer.getData("text/plain");if(!L)return;y.preventDefault();let $=y.currentTarget.getBoundingClientRect();S(L,Ro(i,L,C.id,y.clientY<$.top+$.height/2?"before":"after",R(y))),x.cancel()}}},E=x.activeId&&x.overId&&x.dropPosition?Ro(i,x.activeId,x.overId,x.dropPosition,A):null,D=(C,G)=>{if(!E)return"";let y=E.parent!==null?" drop-nested":"";return E.before!==null?E.before===C.id?" drop-before"+y:"":((E.parent===null?i:i.filter(b=>b.id===E.parent||b.parent===E.parent)).filter(b=>b.id!==x.activeId&&b.parent!==x.activeId).at(-1)??i[G]).id===C.id?" drop-after"+y:""},Y=()=>{j(!1),I($o(s))},K=C=>{let G=C.trim().slice(0,Yo);if(!ee||!G||i.length>=Lr){q(null);return}if(v(G)){j(!0);return}let y={id:Ki(),name:G,color:te};try{P(xr([...i,y],y.id,{parent:ee,before:null}))}catch{}q(null)},_=()=>{let C=p.current.trim().slice(0,Yo);if(!C||i.length>=Lr)return;if(v(C)){w(!0);return}let G={id:Ki(),name:C,color:g};P([...i,G]),p.current="",w(!1),h($o([...s,G])),u(y=>y+1)},ne=(C,G)=>{!G.trim()||G.trim()===C.name||v(G,C.id)||P(i.map(y=>y.id===C.id?Dl(y,G):y))};return o.createElement(n,null,o.createElement("div",{className:"settings-path-row settings-groups-row"},o.createElement("span",{className:"settings-toggle-text"},o.createElement("span",{className:"settings-toggle-title"},d("todo.settings.localGroups")),o.createElement("span",{className:"settings-toggle-desc"},d("todo.settings.localGroupsDesc"))),o.createElement("div",{className:"settings-colorrules settings-groups todo-local-groups",role:"list","aria-label":d("todo.settings.localGroups")},i.map((C,G)=>{let y=`${C.id}@${G}`,L=x.getHandleProps(C),$=vi(i,C.id).length,b=C.parent?O(C):M(C),k=b>0||$>0,V=ee!==null&&(i[G+1]?.parent??null)!==ee&&(C.id===ee||C.parent===ee);return o.createElement(o.Fragment,{key:C.id},o.createElement("div",{role:"listitem",className:"settings-colorrule-row"+(C.parent?" settings-group-sub":"")+D(C,G),...F(C)},o.createElement("button",{...L,className:(L.className??"")+" settings-colorrule-grip"},o.createElement(Qo,null)),o.createElement(nn,{key:`name:${C.id}:${C.name}`,className:"settings-colorrule-key",initial:C.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:de=>ne(C,de)}),o.createElement(t,{key:`color:${y}`,value:C.color,onChange:de=>P(i.map(le=>le.id===C.id?{...le,color:de}:le)),ariaLabel:d("todo.settings.localGroupColor",{p0:C.name})}),C.parent?o.createElement("span",{"aria-hidden":"true"}):o.createElement(r,{key:`addsub:${y}`,className:"settings-group-addsub",ariaLabel:d("todo.settings.localSubgroupAddTo",{p0:C.name}),title:d("todo.settings.localSubgroupAdd"),onClick:()=>{Y(),q(C.id)}},o.createElement(to,null)),o.createElement("span",{className:"settings-group-usage","aria-label":d("todo.settings.localGroupUsage",{count:b}),title:d("todo.settings.localGroupUsage",{count:b})},b),o.createElement(r,{key:`remove:${y}`,className:"settings-colormap-remove","aria-disabled":k||void 0,ariaLabel:d("todo.settings.localGroupDelete",{p0:C.name}),title:b>0?d("todo.settings.localGroupRemoveBlocked",{count:b}):$>0?d("todo.settings.localGroupRemoveSubgroups"):d("todo.settings.localGroupRemove"),onClick:()=>{k||P(i.filter(de=>de.id!==C.id))}},o.createElement(Te,null))),V&&o.createElement("div",{ref:B,className:"settings-colorrule-row settings-group-sub"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(nn,{className:"settings-colorrule-key",initial:"",invalid:z,placeholder:d("todo.settings.localSubgroupNew"),ariaLabel:d("todo.settings.localSubgroupNew"),onType:()=>j(!1),onCommit:K}),o.createElement(t,{key:`sub-color:${ee}`,value:te,onChange:I,ariaLabel:d("todo.settings.localGroupNewColor")})))}),x.liveRegion,o.createElement("div",{className:"settings-colorrule-row settings-colorrule-add"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(nn,{key:`add:${l}`,className:"settings-colorrule-key",initial:"",invalid:m,placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:C=>{p.current=C,w(!1)},onCommit:C=>{p.current=C},onEnter:_}),o.createElement(t,{key:`add-color:${l}`,value:g,onChange:h,ariaLabel:d("todo.settings.localGroupNewColor")}),o.createElement("span",{"aria-hidden":"true"}),o.createElement("span",{className:"settings-colorrule-add-action"},o.createElement("span",{className:"settings-button settings-button--medium settings-colorrule-add-sizer","aria-hidden":"true"},d("todo.settings.localGroupAdd")),o.createElement(e,{type:"button",className:"settings-colormap-add-btn",disabled:i.length>=Lr,onClick:_},d("todo.settings.localGroupAdd")))),(m||z)&&o.createElement("span",{className:"settings-empty-text"},d("todo.settings.localGroupDuplicate")))))}function Dh(){let{GroupsEditor:e,Row:t,Section:r,Toggle:n}=f.ui.settings,a=Ol();return o.createElement(o.Fragment,null,o.createElement(r,null,o.createElement(t,{title:d("todo.settings.useSharedGroups"),description:d("todo.settings.useSharedGroupsDesc")},o.createElement(n,{checked:a.shared,label:d("todo.settings.useSharedGroups"),onChange:i=>{f.settings.set(Xi,i)}})),o.createElement(t,{title:d("todo.settings.useLocalGroups"),description:d("todo.settings.useLocalGroupsDesc")},o.createElement(n,{checked:a.local,label:d("todo.settings.useLocalGroups"),onChange:i=>{f.settings.set(Zi,i)}}))),a.shared&&o.createElement(r,null,o.createElement(e,null)),a.local&&o.createElement(Ch,null))}function Ih(){let[e,t]=o.useState([]);return o.useEffect(()=>{let r=!0,n=()=>{rt().then(i=>{r&&t(i.flatMap(s=>s.group?[s.group]:[]))}).catch(()=>{})};n();let a=Wt(n);return()=>{r=!1,a()}},[]),e}function ip({section:e}){return e==="lists"?o.createElement(o.Fragment,null,o.createElement(kh,null),o.createElement(Ah,null)):e==="groups"?o.createElement(Dh,null):o.createElement(Eh,null)}var sp="reminder:";function dp(){let e=ve();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(sp))return;let a=n??t.slice(sp.length).split(":")[0];rt(e).then(i=>{e.assertActive();let s=i.find(c=>c.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var $s=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Us=e=>({type:"string",description:e});async function js(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function lp(e){return ii([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:$s({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await js(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:$s({title:Us("Task title"),due:Us("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await js(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:$s({id:Us("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await js(e,"complete",{query:n},r)).title||n}".`}}])}function Nh(e){bl(e);let t=hd(e),r=Od(),n=El(),a=ic(),i=Zc(),s=!1,c=e.backend.on("records.eventDeliveryFailed",()=>{s||(s=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{s=!1}))});Gc();let p=e.workspace.onOpenOwnLink(M=>{Ea(M)});e.registerView("todo.panel",zu),e.registerView("todo.file",Gu),e.registerView("todo.page",Qu),e.registerView("todo.settings",ip);let l=Jl(e),u=tu(e),g=e.interop.services.provide(si,lp(e)),h=rc(),m=Bc(),w=e.interop.services.subscribe(_o,()=>{}),v=Wc(e),P=dp(),O=Gl();return()=>{c(),t(),l(),u(),g(),h(),m(),w(),v(),P(),O(),p(),n(),a(),i(),r()}}var Lh={register:Nh},aC=Lh;export{aC as default,Nh as register};

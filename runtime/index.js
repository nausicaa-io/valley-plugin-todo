var vt="valley";var ff=`.${vt}`,gf=`app.${vt}`;function Xl(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Zl=/^[a-zA-Z]:/;function No(e){if(typeof e!="string")return"";let t=Xl(e);return!t||t==="."||Zl.test(t)||t.split("/").some(r=>r==="..")?"":t}function Ot(e){if(typeof e=="string")return No(e)||void 0}var Se=`.${vt}`,Jl="plugins",Lo=`${Se}/${Jl}`,yr=`${Lo}/packages`,yf=`${yr}/core`,wf=`${yr}/github`,vf=`${yr}/local`,xf=`${yr}/community`,kf=`${Lo}/community.json`,Tf=`${Lo}/data`;var Sf=`${Lo}/enabled.json`,Af=`${Lo}/sources.json`,Ef=`${Se}/state`,Ee=`${Se}/settings`,Ni=`${Se}/data`,Yn=`${Se}/recovery`;var Xn=`${Se}/accounts`,io=`${Se}/ai`,Df=`${io}/connections.json`,Cf=`${io}/defaults.json`,If=`${io}/budgets.json`,Nf=`${io}/usage.sqlite`,Lf=`${io}/security/guards.json`,Pf=`${io}/security/activity.sqlite`,Of=`${Xn}/providers`,Mf=`${Xn}/providers.lock.json`,Ql=`${Se}/trash`,_f=`${Ql}/items`,Zn=`${Se}/cache`,zf=`${Zn}/accounts`,ec=`${Zn}/search`,Ff=`${Zn}/providers`;var Gf=`${ec}/index.jsonl`,Rf=`${Yn}/drafts`,$f=`${Yn}/transactions`,jf=`${Yn}/retired`;var xt="design",tc="themes",Li=`${Se}/${xt}/${tc}`,Kf=`${Li}/local`,Uf=`${Li}/community`,Vf={app:`${Ee}/app.json`,appearance:`${Se}/${xt}/appearance.json`,"icon-rail":`${Se}/${xt}/icon-rail.json`,"footer-rail":`${Se}/${xt}/footer-rail.json`,"plugin-startup":`${Se}/${xt}/right-sidebar-startup.json`,"new-tab":`${Se}/${xt}/new-tab.json`,pallette:`${Se}/${xt}/palette.json`,group:`${Ni}/groups.json`,units:`${Ni}/units.json`,metadata:`${Ee}/file-viewers.json`,notification:`${Ee}/notification.json`,"notification-settings":`${Ee}/notification-settings.json`,preferences:`${Ee}/preferences.json`,"link-actions":`${Ee}/link-actions.json`,markdown:`${Ee}/markdown.json`,editor:`${Ee}/editor.json`,"editor-vim":`${Ee}/editor-vim.json`,"markdown-todo":`${Ee}/markdown-todo.json`,"markdown-codeblocks":`${Ee}/markdown-codeblocks.json`,"markdown-template":`${Ee}/markdown-template.json`,"markdown-embeed":`${Ee}/markdown-embeed.json`,files:`${Ee}/file.json`,"file-sorter":`${Ee}/file-sorter.json`,"file-sym-link":`${Ee}/file-sym-link.json`,search:`${Ee}/search.json`,"search-tag":`${Ee}/search-tag.json`,"search-content":`${Ee}/search-content.json`,design:`${Se}/${xt}/appearance.json`,accounts:`${Xn}/connections.json`};var Pi=vt,Oi="open";var oc=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Mi=16384;var _i=new Set(["__proto__","prototype","constructor"]);function zi(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function wr(e){let t=new WeakSet,r=0,n=(i,d)=>{if(++r>8192||d>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(zi(i)>Mi)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let c=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!c&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(b=>typeof b=="string"&&_i.has(b)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(c){let b=u.length?.value;if(!Number.isSafeInteger(b)||b>8192)throw new Error("Bookmark state is too complex");return Array.from({length:b},(m,A)=>{let v=u[String(A)];return v&&"value"in v?n(v.value,d+1)??null:null})}let g={};for(let b of Object.keys(u).sort()){if(_i.has(b))throw new Error("Invalid bookmark state key");let m=u[b];if(!m.enumerable||!("value"in m)){r++;continue}let A=n(m.value,d+1);A!==void 0&&(g[b]=A)}return g}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(zi(JSON.stringify(a))>Mi)throw new Error("Bookmark state is too large");return a}function Ri(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=No(e);if(!t)throw new Error("Invalid bookmark path");return t}function Jn(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Fi(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function Qn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!oc.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=wr(t.state);return r.path!==void 0&&(r.path=Ri(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var rc=/^[A-Za-z0-9_-]{1,64}$/;function Gi(e,t){if(typeof e!="string"||!rc.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function $i(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=Jn(t.title,512,"title"),n={...t.description===void 0?{}:{description:Jn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:Jn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:Gi(t.group,"group")};if(t.groupId!==void 0){let c=Gi(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(t.target!==void 0){let c={folderPath:"",title:r,target:Qn(t.target),...n,...a};return{...c,searchText:Fi(c)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let d={folderPath:Ri(t.folderPath),title:r,...n,...a};return{...d,searchText:Fi(d)}}function Mt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,d)=>{if(++t>2048||d>32||!r(i)||typeof i.type!="string")return!1;let c=(...p)=>Object.keys(i).every(l=>l==="type"||p.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,d+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,d+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,d+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,l])=>n(p)&&a(l,d+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function vr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(d,c,p)=>{if(--n<0||p>64)return!1;if(d.type==="unknown")return!0;if(d.type==="null")return c===null;if(d.type==="literal")return c===d.value;if(d.type==="union")return d.anyOf.some(l=>i(l,c,p+1));if(d.type==="number")return typeof c=="number"&&Number.isFinite(c);if(d.type==="string"||d.type==="boolean"||d.type==="function")return typeof c===d.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return d.type==="array"?Array.isArray(c)&&c.length<=(d.maxItems??1e5)&&c.every(l=>i(d.items,l,p+1)):d.type==="tuple"?Array.isArray(c)&&c.length>=(d.minItems??d.items.length)&&c.length<=d.items.length&&c.every((l,u)=>i(d.items[u],l,p+1)):d.type==="object"?Array.isArray(c)||d.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,u])=>Object.hasOwn(d.properties,l)?i(d.properties[l],u,p+1):d.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,t,0)}var nc=new Map;function fe(e,t,r,n,a,i,d,c,p="owner"){let l=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:d,serviceMetadata:c});return nc.set(`${t}:${e}@${r}`,l),l}var ta=256;function oa(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var Z=e=>!!e&&typeof e=="object"&&!Array.isArray(e),he=(e,t)=>typeof e[t]=="function",_t=e=>e===void 0,so=e=>typeof e=="boolean",te=e=>typeof e=="string",Ge=e=>e===void 0||te(e),ac=e=>e===void 0||typeof e=="number",ic=e=>e===void 0||typeof e=="boolean",me=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Oe=e=>Z(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),ji=e=>Z(e),Ui=e=>Z(e)&&te(e.id)&&te(e.title)&&te(e.date)&&(e.documentRef===void 0||Z(e.documentRef)&&te(e.documentRef.pluginId)&&te(e.documentRef.sourceId)&&te(e.documentRef.itemId)),sc=e=>Z(e)&&te(e.date)&&Ge(e.startTime)&&Ge(e.endTime)&&Ge(e.sourceId)&&Ge(e.itemId),dc=e=>Z(e)&&te(e.url)&&Ge(e.title)&&ic(e.newTab),lc=e=>Z(e)&&te(e.query),Vi=e=>Z(e)&&te(e.name)&&Ge(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),cc=e=>Array.isArray(e)&&e.every(Vi),uc=e=>e===null||Vi(e),pc=e=>e===void 0||Z(e)&&Ge(e.approvalToken)&&(e.cancellation===void 0||Z(e.cancellation)),mc=e=>typeof e=="string"||Z(e)&&typeof e.text=="string",fc=e=>Z(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&Z(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ge(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Bi=e=>Z(e)&&te(e.id)&&te(e.label)&&Ge(e.labelKey)&&Ge(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Bi)),Hi={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ui)},create:{args:e=>me(e,[te,ji]),result:so},update:{args:e=>me(e,[te,ji]),result:so},remove:{args:e=>me(e,[te]),result:so},open:{args:e=>me(e,[te]),result:_t},configure:{args:e=>e.length===0,result:_t},actions:{args:e=>me(e,[te]),result:e=>Array.isArray(e)&&e.every(Bi)},runAction:{args:e=>me(e,[te,te]),result:so}},Wi=e=>Z(e)&&te(e.name)&&te(e.version)&&Ge(e.description)&&Ge(e.author)&&(e.localized===void 0||Z(e.localized)&&Object.values(e.localized).every(t=>Z(t)&&te(t.name)&&Ge(t.description))),gc=fe("calendar.itemSource","service","1.3.0","many",e=>Z(e)&&he(e,"list")&&(e.integration===void 0||Wi(e.integration)),void 0,Hi,e=>e.integration),xr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,ea=e=>typeof e=="string"&&e.length>0&&e.length<=8192,hc=e=>Z(e)&&xr(e.startDate)&&xr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=ta&&(e.cursor===void 0||ea(e.cursor)),bc=e=>Z(e)&&ea(e.revision)&&(e.cursor===void 0||ea(e.cursor))&&Array.isArray(e.items)&&e.items.length<=ta&&e.items.every(t=>Ui(t)&&xr(t.date)&&(t.endDate===void 0||xr(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,zt=fe("calendar.itemSource","service","2.0.0","many",e=>Z(e)&&he(e,"list")&&(e.integration===void 0||Wi(e.integration)),void 0,{...Hi,list:{args:e=>me(e,[hc]),result:bc}},e=>e.integration),Po=fe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),yc=fe("calendar.navigator","service","1.0.0","one",e=>Z(e)&&he(e,"openDate"),void 0,{openDate:{args:e=>me(e,[sc]),result:_t}}),kr=fe("calendar.panelSelection","state","1.0.0","one",e=>Z(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),wc=fe("web.activeContext","state","1.0.0","one",e=>Z(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Ki(e){return Z(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>Z(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var vc=fe("contacts.directory","service","1.0.0","one",e=>Z(e)&&["search","resolveEmails","open"].every(t=>he(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Ki)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>Z(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Ki))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||Z(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:_t}}),xc=fe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),kc=fe("web.navigator","service","1.0.0","one",e=>Z(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[dc]),result:_t}}),Tc=fe("selection.textAction","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&he(e,"run"),e=>[e.id]),Sc=fe("geo.navigator","service","1.0.0","one",e=>Z(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[lc]),result:_t}}),Ac=fe("geo.search","service","1.0.0","one",e=>Z(e)&&he(e,"search")&&he(e,"reverse"),void 0,{search:{args:e=>me(e,[te]),result:cc},reverse:{args:e=>me(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:uc}}),ra=fe("agent.toolProvider","service","1.0.0","many",e=>Z(e)&&Array.isArray(e.tools)&&e.tools.every(fc)&&he(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>me(e,[te,Z,pc]),result:mc}},e=>({tools:e.tools}),"global"),Ec=fe("guard.runtime","service","1.0.0","one",e=>Z(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>he(e,t)),void 0,{resolve:{args:e=>me(e,[Z]),result:Z},requestApproval:{args:e=>me(e,[Z]),result:so},consumeToken:{args:e=>e.length>=1&&e.length<=2&&te(e[0])&&Ge(e[1]),result:so},audit:{args:e=>me(e,[Z]),result:_t}}),Dc=fe("browser.automation","service","1.0.0","one",e=>Z(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>he(e,t)),void 0,{list:{args:e=>e.length===0,result:Oe},open:{args:e=>me(e,[te]),result:Oe},switch:{args:e=>me(e,[te]),result:Oe},close:{args:e=>me(e,[te]),result:Oe},snapshot:{args:e=>me(e,[te]),result:Oe},readText:{args:e=>e.length>=1&&e.length<=2&&te(e[0])&&ac(e[1]),result:Oe},readHtml:{args:e=>me(e,[te]),result:Oe},screenshot:{args:e=>me(e,[te]),result:Oe},click:{args:e=>me(e,[te,t=>typeof t=="number"]),result:Oe},type:{args:e=>e.length>=3&&e.length<=4&&te(e[0])&&typeof e[1]=="number"&&te(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Oe},select:{args:e=>me(e,[te,t=>typeof t=="number",te]),result:Oe},scroll:{args:e=>me(e,[te,t=>typeof t=="number",t=>typeof t=="number"]),result:Oe},pressKey:{args:e=>me(e,[te,te]),result:Oe},navigate:{args:e=>me(e,[te,te]),result:Oe},back:{args:e=>me(e,[te]),result:Oe},forward:{args:e=>me(e,[te]),result:Oe},reload:{args:e=>me(e,[te]),result:Oe}}),Cc=fe("fileTree.contextItem","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ge(e.labelKey)&&he(e,"run"),e=>[e.id]),Ic=fe("newTab.entry","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"run"),e=>[e.id]),na=fe("search.resultAction","extension","1.0.0","many",e=>Z(e)&&typeof e.cardKind=="string"&&he(e,"open"),e=>[e.cardKind]),Nc=fe("search.resultCard","extension","1.0.0","many",e=>Z(e)&&typeof e.cardKind=="string"&&he(e,"render")&&he(e,"open"),e=>[e.cardKind]),Tr=fe("metadataPanel.segment","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"render"),e=>[e.id]),aa=fe("workspace.surface","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&he(e,"getSnapshot")&&he(e,"subscribe")&&he(e,"restore"),e=>[e.id]),Lc=fe("metadata.plugin","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"facts"),e=>[e.id]),Pc=fe("workspace.viewState","extension","1.0.0","many",e=>Z(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&he(e,"capture")&&he(e,"restore")&&he(e,"subscribe"),e=>[e.id]);var Sr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},ia=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),qi=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Yi=e=>ia(e)&&typeof e.surface=="string"&&qi.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Oo(e){let t=Sr(e);if(!Yi(t))throw new Error("Invalid bookmark descriptor");let r=Qn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=$i({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function sa(e){try{let t=Oo(e),r=Sr(e);return JSON.stringify(t.state)===JSON.stringify(wr(r.state))}catch{return!1}}function Oc(e){try{let t=Sr(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:Oo(t.bookmark)}}catch{}return{status:"invalid"}}var Mc=e=>{try{let t=Sr(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&sa(t.bookmark)}catch{return!1}},_c=e=>ia(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Xi=fe("workspace.bookmark","service","1.0.0","many",e=>ia(e)&&typeof e.id=="string"&&qi.has(String(e.surface))&&Mt(e.stateSchema)&&(e.itemStateSchema===void 0||Mt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Yi(e[0]),result:Mc,sanitizeResult:Oc},restore:{args:e=>e.length===1&&sa(e[0]),result:_c}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function da(e,t,r){if(!Mt(r.stateSchema)||r.itemStateSchema!==void 0&&!Mt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,u,g=!1)=>vr(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,u)),i=(l,u,g)=>{let b=g?void 0:r.primary?r.primary(l):l.item,m=wr(b?.state??l.view);if(!a(m,u,!!b))throw new Error("Invalid bookmark state");return Oo({...u,title:b?.title??l.title,description:r.description(l,!!b),state:m,...b?{itemId:b.id}:{}})},d={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=Oo(l),!a(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(Xi,d),p;try{p=e.interop.extensions.provide(aa,{...t,getSnapshot(l){let u=t.getSnapshot(l),g={surface:t.surface,...l===void 0?{}:{instanceId:l}},b,m;try{b=i(u,g,!1)}catch{}try{m=i(u,g,!0)}catch{}return{...u,bookmark:b,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,p(),c()}}var Mo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Zi=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Ji(e){if(!Mo(e)||!Zi(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!Mo(r)||!Zi(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!Mo(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!Mo(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!Mo(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var zc=fe("workspace.details","extension","1.0.0","many",Ji,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var vg=[Se,`${Se}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Mg=1024*1024;var Fg=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var Gg=globalThis.Buffer;var Gc=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,Ar=new Map,Er;function Ie(){return Er}function Dr(e,t){let r=Ar.get(e)??new Set;return r.add(t),Ar.set(e,r),()=>{r.delete(t),r.size||Ar.delete(e)}}function Qi(e){Er?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return Er={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},Er.dispose}var Rc=1800;function lo(e){let t=Me();o.useEffect(()=>{let r=null,n=null,a=null,i=0,d=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=u=>{if(u.mode==="create")return;i=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,b=()=>{if(r=null,i!==u.nonce)return;let m=[...Ar.get(u.todoId)??[]].find(A=>A.isConnected);if(!m){Date.now()<g?r=setTimeout(b,40):t.get()?.nonce===u.nonce&&t.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),d(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(d,Rc),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(b,0)},p=t.subscribe(()=>{let u=t.get();u&&c(u)}),l=t.get();return l&&c(l),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),d()}},[t,e])}function Me(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function es(){Me().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var $c=`
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

/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
.todo-table-row.is-editing td { background: var(--hover-bg); }
.todo-table td.is-editing { box-shadow: inset 0 0 0 1px var(--accent-color); border-radius: var(--radius-sm); }
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

/* \u2500\u2500 Detail modal body (api.ui.Modal, bodyClassName) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
/* \u2500\u2500 Edit sheet: one column, title, notes, then every property as a chip \u2500\u2500 */
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

/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

/* \u2500\u2500 Filter surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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
/* \u2500\u2500 Settings: one bordered list per section, rows split by hairlines \u2500\u2500\u2500\u2500\u2500
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
  grid-template-columns: 24px 22px minmax(0, 1fr) minmax(0, 120px) 30px 34px 104px 40px 60px;
}
.todo-local-groups .todo-settings-item { grid-template-columns: 40px minmax(0, 1fr) minmax(0, 200px) 32px; }
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
.todo-settings-item.is-off .todo-settings-name,
.todo-settings-item.is-off .todo-settings-glyph,
.todo-settings-item.is-off .todo-settings-chip,
.todo-settings-item.is-off .todo-settings-preview { opacity: 0.45; }
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
  .todo-status-settings .todo-settings-item { grid-template-columns: 24px 22px minmax(0, 1fr) 30px 34px 96px 40px 60px; }
  .todo-status-settings .todo-settings-preview { display: none; }
}

.todo-reminder-offsets { display: flex; flex-direction: column; align-items: stretch; gap: 6px; width: 290px; max-width: 100%; }
.todo-reminder-mode { width: 100%; }
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

/* \u2500\u2500 Status badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
.todo-view-meta { column-gap: 8px; row-gap: 4px; }
/* Calmer rows: tags recede, notes stop at two lines, \u22EF waits for hover. */
.todo-row .todo-tag-text { color: var(--text-tertiary); font-weight: var(--font-regular); }
.todo-row .todo-tag-more { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-row .todo-notes { -webkit-line-clamp: 2; margin-top: 3px; }
.todo-row .todo-view-meta { margin-top: 5px; }
.todo-row .todo-row-actions .todo-menu-btn { opacity: 0; transition: opacity var(--duration-fast) var(--ease-out); }
/* Flag and \u22EF share one spot at the row's right edge: the flag at rest, the \u22EF on hover. */
.todo-row .todo-row-actions { display: grid; margin-right: -4px; }
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

/* \u2500\u2500 Main table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
.todo-table-new-row td { background: color-mix(in srgb, var(--accent-color) 6%, transparent); }
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
.todo-table .todo-table-actions { width: 48px; }
/* The \u22EF column stays on the right edge while a wide table scrolls sideways.
   It paints the row's own background so nothing shows through it. */
.todo-table td.todo-table-actions {
  position: sticky;
  right: 0;
  z-index: 2;
  background: var(--surface-color-alt);
}
.todo-table th.todo-table-actions { right: 0; z-index: 4; }
.todo-table-row:hover td.todo-table-actions { background: linear-gradient(var(--hover-bg), var(--hover-bg)), var(--surface-color-alt); }
.todo-table-row.selected td.todo-table-actions { background: linear-gradient(var(--accent-tint-bg), var(--accent-tint-bg)), var(--surface-color-alt); }
.todo-table-section td.todo-table-actions { background: var(--surface-color-alt); }
.todo-status-plain { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-row:not(:hover) .todo-status-plain { opacity: 0; }

`,la="notes-todo-styles";function ts(){let e=document.getElementById(la);return e||(e=document.createElement("style"),e.id=la,document.head.appendChild(e)),e.textContent=$c,()=>{document.getElementById(la)===e&&e.remove()}}var ne="#12120f",ge="#ffffff",ua=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ne,onDark:ne},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ge,onDark:ge},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ne,onDark:ne},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ge,onDark:ne},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ne,onDark:ne},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ge,onDark:ne},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ge,onDark:ne},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ge,onDark:ne},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ge,onDark:ne},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ge,onDark:ge},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ne,onDark:ne},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ge,onDark:ne},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ge,onDark:ne},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ne,onDark:ne},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ge,onDark:ne},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ge,onDark:ne},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ge,onDark:ne},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ge,onDark:ne},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ne,onDark:ne},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ne,onDark:ne},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ge,onDark:ne},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ge,onDark:ne},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ge,onDark:ne},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ge,onDark:ne},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ge,onDark:ne},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ge,onDark:ne},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ne,onDark:ne},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ne,onDark:ne},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ge,onDark:ne},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ne,onDark:ne},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ge,onDark:ne},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ge,onDark:ne},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ne,onDark:ne},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ge,onDark:ne},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ge,onDark:ne},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ge,onDark:ne}],jc=["semantic","muted","accent","categorical"];var Eh=new Map(ua.map(e=>[e.id,e])),Kc={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Uc=new Map(ua.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Vc=/^[a-z][a-z0-9-]{0,47}$/,Bc={version:4,families:jc.map(e=>({id:e,name:Kc[e]})),colors:ua.map(e=>({id:e.id,familyId:e.family,name:Uc.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},Hc=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var Wc=Hc(Bc);function os(){return Wc}var ca=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Cr="palette:",qc=/^#[0-9a-f]{6}$/i;function Ir(e){return e.startsWith(Cr)&&Vc.test(e.slice(Cr.length))}function ve(e){return`${Cr}${e}`}function _o(e){return Ir(e)?e.slice(Cr.length):void 0}function rs(e){if(typeof e!="string")return;let t=e.trim();return Ir(t)?t:qc.test(t)?t.toLowerCase():void 0}function xe(e){let t=_o(e);return t?`var(--color-${t})`:e}function kt(e){let t=_o(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function pa(e){let t=new Set(e.map(r=>_o(r)??r.toLowerCase()));return ve(ca.find(r=>!t.has(r))??ca[0])}function ns(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=ca;return ve(r[Math.abs(t)%r.length])}function Y(e){return e.trim().toLowerCase()}function Yc(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",d=Y(i);!d||d===Y(t)||r.has(d)||(r.add(d),n.push(i))}return n}function as(e){return`group_${Y(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Ft(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",d=Y(i);if(!i||r.has(d))continue;r.add(d);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():as(i),p=rs(a.color)??pa(t.map(u=>u.color)),l=Yc(a.aliases,i,r);t.push({id:c,name:i,color:p,...l.length?{aliases:l}:{}})}return t}function zo(e,t){let r=Y(t??"");if(r)return e.find(n=>Y(n.name)===r||(n.aliases??[]).some(a=>Y(a)===r))}function Nr(e,t){return zo(t,e)?.name}function De(e,t){let r=Y(e??"");return r?zo(t,e)?.color??ns(r):ve("primary-blue")}function ma(e){return pa(e.map(t=>t.color))}function fa(e){let t={};for(let r of e){let n=Y(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var is={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists","todo.settings.section.statuses":"Statuses","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do groups","todo.settings.localGroupsDesc":"Groups only To-Do uses, beside the shared groups above. Put one under a shared group to include its tasks in that group.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Under shared group","todo.settings.localGroupParentOf":"Shared group of {{p0}}","todo.settings.localGroupNoParent":"None","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupDeleteTitle":"Delete the group \u201C{{p0}}\u201D?","todo.settings.localGroupDeleteMoves":"{{count}} tasks in this group will have no group.","todo.settings.localGroupDeleteUnused":"No task uses this group.","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add group","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files."};var ss={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen","todo.settings.section.statuses":"Status","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"To-Do-Gruppen","todo.settings.localGroupsDesc":"Gruppen nur f\xFCr To-Do, neben den geteilten Gruppen oben. Unter einer geteilten Gruppe z\xE4hlen ihre Aufgaben zu dieser Gruppe.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Unter geteilter Gruppe","todo.settings.localGroupParentOf":"Geteilte Gruppe von {{p0}}","todo.settings.localGroupNoParent":"Keine","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupDeleteTitle":"Gruppe \u201E{{p0}}\u201C l\xF6schen?","todo.settings.localGroupDeleteMoves":"{{count}} Aufgaben dieser Gruppe haben danach keine Gruppe.","todo.settings.localGroupDeleteUnused":"Keine Aufgabe verwendet diese Gruppe.","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Gruppe hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien."};var ds={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas","todo.settings.section.statuses":"Estados","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos de To-Do","todo.settings.localGroupsDesc":"Grupos solo de To-Do, junto a los grupos compartidos de arriba. Bajo un grupo compartido, sus tareas cuentan en ese grupo.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupParent":"Bajo el grupo compartido","todo.settings.localGroupParentOf":"Grupo compartido de {{p0}}","todo.settings.localGroupNoParent":"Ninguno","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupDeleteTitle":"\xBFEliminar el grupo \xAB{{p0}}\xBB?","todo.settings.localGroupDeleteMoves":"{{count}} tareas de este grupo quedar\xE1n sin grupo.","todo.settings.localGroupDeleteUnused":"Ninguna tarea usa este grupo.","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir grupo","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes."};var ls={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes","todo.settings.section.statuses":"Statuts","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes To-Do","todo.settings.localGroupsDesc":"Groupes propres \xE0 To-Do, \xE0 c\xF4t\xE9 des groupes partag\xE9s ci-dessus. Plac\xE9 sous un groupe partag\xE9, un groupe y ajoute ses t\xE2ches.","todo.settings.localGroupName":"Nom","todo.settings.localGroupParent":"Sous le groupe partag\xE9","todo.settings.localGroupParentOf":"Groupe partag\xE9 de {{p0}}","todo.settings.localGroupNoParent":"Aucun","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupDeleteTitle":"Supprimer le groupe \xAB {{p0}} \xBB ?","todo.settings.localGroupDeleteMoves":"{{count}} t\xE2ches de ce groupe n\u2019auront plus de groupe.","todo.settings.localGroupDeleteUnused":"Aucune t\xE2che n\u2019utilise ce groupe.","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter un groupe","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant."};var cs={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868","todo.settings.section.statuses":"\u72B6\u6001","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5F85\u529E\u4F7F\u7528\u7684\u5206\u7EC4\uFF0C\u4E0E\u4E0A\u65B9\u7684\u5171\u4EAB\u5206\u7EC4\u5E76\u5217\u3002\u653E\u5728\u67D0\u4E2A\u5171\u4EAB\u5206\u7EC4\u4E0B\uFF0C\u5176\u4EFB\u52A1\u4E5F\u4F1A\u8BA1\u5165\u8BE5\u5206\u7EC4\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupParent":"\u6240\u5C5E\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupParentOf":"{{p0}} \u7684\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupNoParent":"\u65E0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupDeleteTitle":"\u5220\u9664\u5206\u7EC4\u201C{{p0}}\u201D\uFF1F","todo.settings.localGroupDeleteMoves":"\u6B64\u5206\u7EC4\u4E2D\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u4E0D\u518D\u5C5E\u4E8E\u4EFB\u4F55\u5206\u7EC4\u3002","todo.settings.localGroupDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4\u3002","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0\u5206\u7EC4","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002"};var us={en:is,de:ss,es:ds,fr:ls,"zh-CN":cs};function ps(e,t){return(us.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var ms=ps;function fs(e){e.ui.registerCatalogs(us),ms=(t,r)=>{let n=e.ui.t(t,r);return n===t?ps(t,r):n}}function s(e,t){return ms(e,t)}var tu={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},ou={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},ru={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},gs=()=>{};function hs(e){gs=e}function Je(e,t=""){if(e===null||e==="open")return s("todo.status.todo");let r=tu[e];return r?s(r):gs(e)??(t||e)}function ot(e){return s(ou[e])}function bs(e){return s(ru[e])}var nu=["auto","white","black"],Or=40,ga=40,au=["completed","canceled"],ys="statuses",Fo=[{id:"open",labelKey:"todo.status.todo",color:ve("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ve("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ve("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ve("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ve("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ve("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ve("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ve("red"),done:!0,cls:"todo-st-canceled",locked:!1}],ha=ve("teal");var ba=Fo.map(e=>e.id),Mr=Fo.filter(e=>!e.locked).map(e=>e.id),Vh=Fo.filter(e=>e.done).map(e=>e.id),Lr=new Map(Fo.map(e=>[e.id,e])),iu=new Set(Mr);function Gt(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function ws(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function su(e){if(typeof e!="string"||!Ir(e))return!1;let t=_o(e);if(!t)return!1;let r=os();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function du(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,ga):"";if(!(!Gt(a.id)||t.has(a.id)||!i)&&(t.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=Or))break}return r}function _r(e){let t=e&&typeof e=="object"?e:{},r=du(t.custom),n=new Set(r.map(v=>v.id)),a=Array.isArray(t.active)?t.active:Mr,i=[];for(let v of a)typeof v!="string"||!(iu.has(v)||n.has(v))||i.includes(v)||i.push(v);let d=[...ba,...r.map(v=>v.id)],c=v=>v&&typeof v=="object"?v:{},p=c(t.colors),l=Object.fromEntries(d.map(v=>{let N=Lr.get(v)?.color??ha;return[v,su(p[v])?p[v]:N]})),u=c(t.textColors),g=Object.fromEntries(d.map(v=>[v,nu.includes(u[v])?u[v]:"auto"])),b=c(t.strikethrough),m=Object.fromEntries(d.map(v=>[v,typeof b[v]=="boolean"?b[v]:au.includes(v)||r.some(N=>N.id===v&&N.done)])),A=t.style==="text"?"text":"filled";return{active:i,custom:r,colors:l,textColors:g,strikethrough:m,style:A}}function Ve(){return _r(f?.settings.get()[ys])}function vs(e){f.settings.set(ys,_r(e))}hs(e=>Ve().custom.find(t=>t.id===e)?.label);function Rt(e=Ve()){return[...ba,...e.custom.map(t=>t.id)]}function co(e,t=Ve()){return Lr.has(e)?Lr.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function lu(e){return`todo-st-${e}`}function cu(e,t=Ve()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":kt(t.colors[e]??ha)}function ke(e,t=Ve()){let r=e&&Gt(e)?t.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??ha,done:r.done,cls:lu(r.id),locked:!1,custom:!0};let n=e&&Lr.get(e)||Fo[0];return{...n,label:Je(n.id),color:t.colors[n.id],custom:!1}}function Pr(e=Ve()){return[ke("open",e),ke("completed",e),...e.active.map(t=>ke(t,e))]}function uo(){return Pr().map(e=>e.id)}function xs(e){return e==="open"||e==="completed"||Ve().active.includes(e)}function dt(){let[e,t]=o.useState(()=>Pr());return o.useEffect(()=>f.settings.subscribe(()=>t(Pr())),[]),e}function po(e,t=uo()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function mo(e,t){return t==="all"||t.includes(_e(e))}function zr(e){if(typeof e=="string")return ba.includes(e)||Gt(e)?e:void 0}function _e(e){return e.status??(e.completed?"completed":"open")}function Ne(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:co(e,t),status:e}}function fo(){return Pr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:xe(e.color)}))}function uu(){let e=Ve();return Rt(e).map(t=>{let r=ke(t,e),n=xe(r.color),a=cu(t,e),i=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${a}}`+i}).join("")}function ks(){let[e,t]=o.useState(()=>Ve().style);return o.useEffect(()=>f.settings.subscribe(()=>t(Ve().style)),[]),e}function Ts(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=uu()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function Ss(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let d=t.slice(i,i+20),c=new Map;for(;d.length;){r();let p=await a.aggregate({where:{taskId:{in:d},or:["completed","canceled"].map(u=>({to:u,from:{in:Rt().filter(g=>g!==u)}})),...c.size?{and:[{or:d.map(u=>({taskId:u,position:{lt:c.get(u)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let l=await a.query({select:["taskId","changedAt"],where:{or:p.map(u=>({taskId:u.taskId,position:u.position}))},limit:20});r(),d=[];for(let u of l.rows){let g=String(u.taskId);if(typeof u.changedAt=="string"&&u.changedAt)n.set(g,{changedAt:u.changedAt});else{let b=p.find(m=>m.taskId===g)?.position;if(typeof b!="number"||!Number.isInteger(b))throw new Error("Invalid completion position");c.set(g,b),d.push(g)}}}}return n}function Go(e){return"historyLoaded"in e&&e.historyLoaded===!1}function Re(e,t=""){return typeof e=="string"?e:t}function Fr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Gr(e){let t=Re(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function As(e){let t=Re(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var pu=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],Xh=Object.fromEntries(pu.map(e=>[e,{destination:"ask",recognize:!0}]));var mu=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",vt]);function fu(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function ya(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=fu(e);if(!t||mu.has(t)||t.startsWith(`${vt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var gu=16384,hu=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function bu(e){if(!e||e.length>gu||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function yu(e){try{let t=new URL(e);if(t.protocol!==`${Pi}:`||t.hostname!==Oi)return null;let r=t.searchParams.get("realm")??"",n=No(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!hu.test(a))return null;let i=bu(t.searchParams.get("state")??""),d=t.searchParams.get("surface");if(d&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(d))return null;let c=t.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...d?{surface:d}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function go(e){let t=yu(e);return t?.kind==="file"?t.relPath:null}function Es(e){return ya(e)!==null}function $t(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var wu=["normal","low","medium","high"];function Ds(e){return e===!0}function vu(e){return typeof e=="string"&&wu.includes(e)?e:"normal"}function Rr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Cs(e){return Array.isArray(e)?e.filter(t=>Fr(t)).map(t=>({startedAt:Re(t.startedAt),endedAt:Re(t.endedAt),activeMinutes:Rr(t.activeMinutes)??0,pauseMinutes:Rr(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function wa(e){return Array.isArray(e)?e.filter(t=>Fr(t)).map(t=>({from:zr(t.from),to:zr(t.to),changedAt:Re(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function xu(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function $r(e){if(typeof e!="string")return;let t=e.trim();if(t)return go(t)||Es(t)?t:void 0}function ku(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>$r(n)).filter(n=>!!n))];return r.length?r:void 0}function Tu(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>Ot(r)).filter(r=>!!r))];return t.length?t:void 0}function Su(e){if(!Fr(e))return;let t=Re(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function Ro(e){let t=new Date().toISOString(),r=Re(e.id,$t("todo")),n=Re(e.createdAt,t),a=Cs(e.history),i=wa(e.statusHistory),d=zr(Gt(e.customStatus)?e.customStatus:e.status);return{id:r,title:Re(e.title).trim(),completed:Ds(e.completed)||d==="completed"||d==="canceled",priority:vu(e.priority),dueDate:Re(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:Gr(e.reminderTime),startTime:Gr(e.startTime),endTime:Gr(e.endTime),color:As(e.color),note:Re(e.note),tags:Array.isArray(e.tags)?e.tags.filter(c=>typeof c=="string"&&!!c.trim()).map(c=>c.trim()):[],estimatedMinutes:Rr(e.estimatedMinutes),actualMinutes:Rr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:d,filePath:Ot(e.filePath),group:Re(e.group).trim()||void 0,flagged:Ds(e.flagged)||void 0,urls:ku(e.urls),attachments:Tu(e.attachments),location:Su(e.location),remindAt:xu(e.remindAt),reminderFiredAt:Re(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Re(e.updatedAt,n)}}function va(e,t,r){let n=(l,u=!1)=>{let g=new Map;for(let b of l){let m=g.get(b.taskId);m?m.push(b):g.set(b.taskId,[b])}if(u)for(let b of g.values())b.sort((m,A)=>Number(m.position)-Number(A.position));return g},a=n(t.tags),i=n(t.links,!0),d=n(t.attachments,!0),c=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(l=>Ro({...l,tags:(a.get(l.id)??[]).map(u=>u.tag),urls:(i.get(l.id)??[]).map(u=>u.url),attachments:(d.get(l.id)??[]).map(u=>u.path),history:c.get(l.id)??[],statusHistory:p.get(l.id)??[]})).map(l=>({...l,group:Nr(l.group,r)??l.group})).filter(l=>l.title)}var jr="todo.tasks",Sa="todo.task_tags",Aa="todo.task_links",Ea="todo.task_attachments",Ps="todo.focus_sessions",ho="todo.status_history",$o=[jr,Sa,Aa,Ea],Au=[...$o,Ps,ho],Da=[...$o,ho];function Eu(e,t){let r=Ie(),n=e.map(d=>r.api.data.dataset(d).subscribe(t)),a=()=>n.forEach(d=>d()),i=r.onDispose(a);return()=>{i(),a()}}function bo(e){return Eu(Da,e)}function Os(e){let t=$o.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function Tt(e,t,r=Ie()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function Du(e,t=!0,r=!0,n=Ie()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?Tt(Sa,a,n):[],Tt(Aa,a,n),Tt(Ea,a,n),t?Tt(Ps,a,n):[],t?Tt(ho,a,n):[]]),[d,c,p,l,u]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:d,links:c,attachments:p,sessions:l,statusHistory:u}}async function Ta(e,t,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([Tt(jr,n,e),Du(r,t,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),va(a.value,i.value,Ft(e.api.getState().groups))}var Is=new WeakMap;function Kr(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=Is.get(e);i||(i=new Map,Is.set(e,i));let d=i.get(t);if(!d){d={revision:0,pending:new Map};let p=d,l=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{l.forEach(u=>u()),i.clear()}),i.set(t,d)}let c=d.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=d.revision,l=await a();if(e.assertActive(),p===d.revision)return l}})().finally(()=>{d.pending.delete(n)}),d.pending.set(n,c)),c}function Ms(e,t){let r=Ie();return Kr(r,e?"full":"calendar",e?Au:$o,t??"",()=>Ta(r,e,t))}var _s=200;function Cu(e,t){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>_s)return null;let n=t===jr?"id":"taskId",a=[];for(let i of r){let d=i?.[n];if(typeof d!="string"||!d)return null;a.push(d)}return a}var xa=new WeakMap;function Iu(e){let t=xa.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=Da.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let d=i?Cu(i,a):null;if(!d){r.full=!0,r.dirty.clear();return}for(let c of d)r.dirty.add(c);r.dirty.size>_s&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),xa.delete(e)}),xa.set(e,r),t=r,t}async function Ns(e,t){let r;if(!t)r=await Ta(e,!1);else{r=[];for(let a=0;a<t.length;a+=100)r.push(...await Ta(e,!1,t.slice(a,a+100)))}let n=await Ss(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function Ye(e=Ie()){let t=Iu(e);return Kr(e,"list",Da,"",async()=>{let r=JSON.stringify(Ft(e.api.getState().groups));if(t.full||!t.value||t.groups!==r){t.full=!1,t.dirty.clear();try{t.value=await Ns(e),t.groups=r}catch(p){throw t.full=!0,p}return t.value}if(!t.dirty.size)return t.value;let n=[...t.dirty];t.dirty.clear();let a;try{a=await Ns(e,n)}catch(p){for(let l of n)t.dirty.add(l);throw p}let i=new Map(a.map(p=>[p.id,p])),d=new Set(n),c=[];for(let p of t.value)if(!d.has(p.id))c.push(p);else{let l=i.get(p.id);l&&(c.push(l),i.delete(p.id))}return c.push(...i.values()),t.value=c,c})}var Ls=new WeakMap,Nu=0;function Lu(e,t){let r=Ls.get(e);r||(r=new Map,Ls.set(e,r));let n=r.get(t);if(!n){let d={users:0,key:String(++Nu),scope:{...e,assertActive:()=>{if(e.assertActive(),!d.users)throw new Error("To-Do selection disposed")}}};n=d,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function Pu(e,t,r){return Kr(e,"statusHistory",[ho],r.key,async()=>{let n=await Tt(ho,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),wa(n)})}function zs(e){let t=Ie(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=Lu(t,e),d=0,c=!1,p=()=>{let b=++d;Pu(t,e,a).then(m=>{!c&&b===d&&n({scope:t,id:e,history:m})}).catch(()=>{})},l=t.api.data.dataset(ho).subscribe(b=>{(!b.keys||b.keys.some(m=>m.taskId===e))&&p()}),u=()=>{c=!0,l(),i()},g=t.onDispose(u);return p(),()=>{g(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function St(){return Ms(!0)}async function Xe(e){return e?(await Ms(!0,e))[0]??null:null}function Fs(e,t,r,n){let a=Ie();return Kr(a,"calendarPage",$o,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(jr).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let d=async g=>{let b=[];for(let m=0;m<i.rows.length;m+=100)b.push(...await Tt(g,{taskId:{in:i.rows.slice(m,m+100).map(A=>String(A.id))}},a));return b},c=await Promise.allSettled([d(Sa),d(Aa),d(Ea)]),[p,l,u]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:va(i.rows,{tags:p,links:l,attachments:u,sessions:[],statusHistory:[]},Ft(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function jt(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function Ca(e,t,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??t:null}catch{return null}}async function ka(e,t,r,n){return await Ca(e,t,r,n)!==null}function Ia(e,t,r){return Ca(e,t,r)}async function jo(e,t){return await Ca(e,t,void 0,void 0,!0)!==null}async function Kt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function Ur(e){if(!e.id||!e.title.trim())return!1;let t=await jt(e);return t&&f.undo.push({label:s("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Kt(e.id)}),redo:async()=>({ok:await jt(e)})}),t}async function At(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await Xe(e),i=Go(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;Go(i)&&(delete i.historyLoaded,delete i.completionSummary);let d=await ka(e,i,r,n);return d&&a&&f.undo.push({label:s("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await ka(e,a)}),redo:async()=>({ok:await ka(e,i)})}),d}async function Vr(e){let t=await Xe(e),r=await Kt(e);return r&&t&&f.undo.push({label:s("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await jt(t)}),redo:async()=>({ok:await Kt(e)})}),r}async function lt(e,t){return await f.ui.confirm({title:s("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${s("todo.delete.message")}`),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function Na(e,t){let r=await Xe(e);return r?At(e,{...r,...Ne(t),updatedAt:new Date().toISOString()}):!1}async function Gs(e,t){let r=await Xe(e);return r?At(e,{...r,group:t,updatedAt:new Date().toISOString()}):!1}function Ou(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Ut(e){let t=Ou(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}function Te(e=[]){return e.map(t=>Nr(t.name,e)??t.name)}var Rs=e=>[e];function $s(e){Rs=e}function rt(e){return new Set(e.flatMap(t=>Rs(t)).map(t=>Y(t)))}var La="localGroups",Br=200,Uo=60,Ko=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function js(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Pa(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(d=>[d.name,...d.aliases??[]]).map(Y)),n=new Set(t.map(d=>d.id)),a=new Set,i=[];for(let d of e){if(!d||typeof d!="object")continue;let c=d,p=Ko(c.id,64),l=Ko(c.name,Uo),u=Ko(c.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(p)||a.has(p)||!l||r.has(Y(l))||!u)continue;let g=Array.isArray(c.aliases)?[...new Set(c.aliases.map(m=>Ko(m,Uo)).filter(m=>m&&Y(m)!==Y(l)&&!r.has(Y(m))))].slice(0,20):[],b=typeof c.parent=="string"&&n.has(c.parent)?c.parent:void 0;if(a.add(p),r.add(Y(l)),g.forEach(m=>r.add(Y(m))),i.push({id:p,name:l,color:u,...g.length?{aliases:g}:{},...b?{parent:b}:{}}),i.length>=Br)break}return i}function Ks(e,t){let r=Ko(t,Uo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>Y(a)!==Y(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Us(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}function Vs(e,t,r){let n=t.find(a=>Y(a.name)===Y(e)||(a.aliases??[]).some(i=>Y(i)===Y(e)));return n?[e,...r.filter(a=>a.parent===n.id).flatMap(a=>[a.name,...a.aliases??[]])]:[e]}function Hr(){return Ft(f.getState().groups)}function Vt(){return Pa(f?.settings.get()[La],Hr())}async function Bs(e){await f.settings.set(La,Pa(e,Hr()))}function Qe(){return Us(Hr(),Vt())}$s(e=>Vs(e,Hr(),Vt()));function Wr(e){let t=f.subscribe(e),r=f.settings.subscribe(e);return()=>{t(),r()}}function Be(){let[e,t]=o.useState(Qe);return o.useEffect(()=>Wr(()=>t(Qe())),[]),e}function Hs(){let[e,t]=o.useState(Vt);return o.useEffect(()=>Wr(()=>t(Vt())),[]),e}function Ws(){let e=Ie(),t=!1,r=()=>{Ye(e).then(a=>{if(e.assertActive(),t)return;let i=new Set(Vt().flatMap(d=>[d.name,...d.aliases??[]]).map(Y));e.api.workspace.reportGroupUsage(fa(a.map(d=>d.group).filter(d=>!d||!i.has(Y(d)))))}).catch(()=>{})};r();let n=bo(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function Mu(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function _u(e){let t=e.toLowerCase();return Mu(t)?t:"yyyy-mm-dd"}function qs(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return _u(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var zu="ddd d mmm",Fu=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Gu(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(d=>!Fu.has(d)))return!1;let r=t.filter(d=>d==="d"||d==="dd"),n=t.filter(d=>d==="ddd"||d==="dddd"),a=t.filter(d=>d==="mmm"||d==="mmmm"),i=t.filter(d=>d==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function Ru(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return Gu(t)?t:zu}var Vo=new Map;function $u(e,t,r){let n=`${r??""}:${t}`,a=Vo.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Vo.size>=64&&Vo.delete(Vo.keys().next().value),Vo.set(n,a)),a.format(e)}function Ys(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,d]=n,c=new Date(Number(a),Number(i)-1,Number(d),12);return Ru(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(d)):p==="dd"?d:p==="yyyy"?a:$u(c,p,r))}var He=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Bo={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},qr={high:3,medium:2,low:1,normal:0},Xs=new Intl.Collator(void 0,{sensitivity:"base"});function Bt(e,t){return Xs.compare(e.title,t.title)}function ju(e,t,r){if(r==="name")return Bt(e,t);if(r==="priority"){let i=qr[t.priority]-qr[e.priority];return i!==0?i:ct(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:ct(e,t)}if(r==="due"){let i=e.dueDate||"",d=t.dueDate||"";if(!i&&!d)return ct(e,t);if(!i)return-1;if(!d)return 1;let c=i.localeCompare(d);return c!==0?c:ct(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Bt(e,t)}function Oa(e,t){let r=qr[t.priority]-qr[e.priority];return r!==0?r:Bt(e,t)}function ct(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Oa(e,t)}function Zs(e,t,r){let n=new Map(e.map(i=>[i,t(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,d)=>{let c=n.get(i),p=n.get(d);if(a(c)!==a(p))return a(c)?1:-1;let l=0;return!a(c)&&!a(p)&&(l=typeof c=="number"&&typeof p=="number"?c-p:Xs.compare(String(c),String(p))),l!==0?r==="asc"?l:-l:Bt(i,d)})}function yo(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let d=n.dueDate||"",c=a.dueDate||"";if(!d&&!c)return ct(n,a);if(!d)return-1;if(!c)return 1;let p=c.localeCompare(d);return p!==0?p:ct(n,a)}let i=ju(n,a,t);return r==="asc"?i:-i})}function $e(e,t="dd-mm-yyyy"){return e?qs(e,t):""}function Ae(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Ma(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function Et(e,t){let r=Ma(e);return r?(r.setDate(r.getDate()+t),Ae(r)):e}function Yr(e,t,r="ddd d mmm"){return Ys(e.slice(0,10),r,t)}function ut(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[d,c,p]=i.split("-").map(Number),[l,u,g]=t.split("-").map(Number);if(!d||!c||!p||!l||!u||!g)return $e(e,a);let b=new Date(d,c-1,p),m=new Date(l,u-1,g),A=Math.round((b.getTime()-m.getTime())/864e5);return A===1?r.tomorrow:A===-1?r.yesterday:A>1&&A<7?b.toLocaleDateString(n,{weekday:"long"}):$e(e,a)}var Rb=new Date(2023,0,1,12);var Ku={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Ho(e){return Ku[e??""]??1}function Js(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Uu(e,t){return(e.getDay()-t+7)%7}function Qs(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Uu(e,t))}function Ht(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var Wo=["overdue","today","upcoming","someday","completed"],ed={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function nt(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Xr(e,t=nt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||ct(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(ct),r.someday.sort(Oa),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Bt(a,i)),r}function _a(e){return Go(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function za(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):nt(t)}function td(e){let t=new Map(e.map(a=>[a,_a(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||Bt(a,i)),n=new Map;for(let a of r){let i=za(t.get(a)),d=n.get(i);d?d.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function Fa(e,t,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?t==="monthly"?c.slice(0,7):t==="daily"?c:nt(Qs(Ht(c),r)):"",d=new Map;for(let c of e){let p=i(a(c)),l=d.get(p);l?l.push(c):d.set(p,[c])}return[...d.entries()].sort(([c],[p])=>c===""?-1:p===""?1:p.localeCompare(c)).map(([c,p])=>({key:c,kind:c?t:"none",todos:p}))}function Zr(e,t=nt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(d,c,p)=>{let l=p.toLowerCase();if(l==="today")r=t;else if(l==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=nt(u)}else r=p;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(d,c,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var je={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},Vu={open:je,get:je,"edit-fields":je,add:je,complete:je,done:je,reopen:je,cancel:je,pause:je,status:je,edit:je,"open-page":{type:"null"},search:{type:"array",items:je,maxItems:20},list:{type:"array",items:je,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:je,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Ce=e=>typeof e=="string"?e:"",id=e=>Ce(e?.query).trim(),en=["normal","low","medium","high"];function wo(){return new Date().toISOString()}function od(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function rd(e){let t=e.trim();if(!t)return;let r=zo(Qe(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function nd(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return od();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),od(t)}return e}function Bu(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function Jr(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Ga(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,d)=>`  ${d+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var Qr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=id(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function qo(e,t,r){let n=Ga(await St(),e),a=t(n),i=await Ia(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await jo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await jo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function ad(e){return qo(e,t=>({...t,completed:!0,status:"completed",updatedAt:wo()}),t=>`Complete \u201C${t.title}\u201D`)}var Wt={type:"string"},sd={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Wt])),priority:{type:"string",enum:en},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Wt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Wt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Hu(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in sd.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!en.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!uo().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function Wu(e,t,r){let a=(await St()).find(c=>c.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!Te(Qe()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=Ro({...a,...t,...t.status?Ne(t.status):t.completed!==void 0?Ne(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:wo()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let c of["urls","attachments"])if(t[c]?.some(p=>!i[c]?.includes(p)))throw new Error(`Invalid task ${c}.`);let d=await Ia(e,i,a.updatedAt);if(!d)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await jo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await jo(e,d))throw new Error("Could not reapply the task edit.")}}}}async function pt(e){let t=e??{},r=t.id??t.query,n={groups:Qe(),statuses:uo()};if(!r)return n;let a=await St(),i=Ga(a,r);return{...n,records:[i]}}function dd(e){let t=n=>{let a=Vu[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Wt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Ce(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Xe(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Me().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Wt},required:["id"],additionalProperties:!1},parse:n=>{let a=Ce(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Xe(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Wt,values:sd,expectedUpdatedAt:Wt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Ce(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:Hu(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>Wu(n,a,i),revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Ce(a.due),priority:Ce(a.priority),status:Ce(a.status),note:Ce(a.note),group:Ce(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:d,note:c,group:p})=>{let l=uo();if(d&&!l.includes(d))throw new Error(`Status "${d}" is not enabled. One of: ${l.join(", ")}`);let u=Ro({title:n,priority:i||"normal",status:d||void 0,dueDate:nd(a),note:c,group:rd(p)});if(!await jt(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Kt(u.id)},reapply:async()=>{await jt(u)}}}},formatCli:n=>`Added: ${Jr(n)}`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Qr,run:({query:n})=>ad(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Qr,run:({query:n})=>ad(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=id(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=Ut(n);return(await St()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(Jr).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Qr,run:({query:n})=>qo(n,a=>({...a,completed:!1,status:"open",updatedAt:wo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>pt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Qr,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!xs(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return qo(a,d=>({...d,...Ne(i),updatedAt:wo()}),d=>`${n==="cancel"?"Cancel":"Hold"} \u201C${d.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>pt(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim(),d=Ce(a.status),c=uo();if(!i||!c.includes(d))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:d}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>qo(n,i=>({...i,...Ne(a),updatedAt:wo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim(),d=Ce(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(d&&!en.includes(d))throw new Error(`Invalid priority "${d}". One of: ${en.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:d||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?Bu(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:d,note:c,tags:p,group:l})=>qo(n,u=>({...u,title:a??u.title,priority:i??u.priority,dueDate:d===void 0?u.dueDate:nd(d),note:c??u.note,tags:p??u.tags,group:l===void 0?u.group:rd(l),updatedAt:wo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${Jr(n)}`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await St(),d=Ga(i,n);if(!a)return{value:{deleted:!1,todo:d,deletedCount:0},revert:null};if(!await Kt(d.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:d,deletedCount:1},revert:{label:`Delete \u201C${d.title}\u201D`,run:async()=>{await jt(d)},reapply:async()=>{await Kt(d.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>pt(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Ce(a.section),q:Ce(a.q)}},fromCli:(n,a)=>({section:Ce(a.section),q:Ce(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await St();if(a){let d=Ut(a);i=i.filter(c=>d(c.tags,c.title,c.note))}return n&&Wo.includes(n)?Xr(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(Jr).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await St(),a=Qe();return Te(a).map(i=>({name:i,count:n.filter(d=>Y(d.group??"")===Y(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var ld={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var Yu=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Xu=/^-\s+(.*)$/,Zu=/^[A-Za-z][\w+.-]*:\/\//;function cd(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(Xu);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let d=Zu.test(a)?null:a.match(Yu);if(d){let c=d[1].trim().toLowerCase(),p=d[2].trim();p===""?(r=c,t.lists[c]=t.lists[c]??[]):(r=null,t.values[c]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function ud(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Ra="notes-todo-fence-styles";function Ju(){if(document.getElementById(Ra))return;let e=document.createElement("style");e.id=Ra,e.textContent=`
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
`,document.head.appendChild(e)}var pd=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},Qu=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function ep(e,t){let r=pd(),n=Qu(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(d=>d.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,d)=>(i.dueDate||"9999").localeCompare(d.dueDate||"9999")).slice(0,t.limit)}var tp=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=Ie(),g=!0,b=()=>{Ye(u).then(A=>{u.assertActive(),g&&r(A)}).catch(()=>{})};b();let m=bo(b);return()=>{g=!1,m()}},[]);let n=cd(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),d={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:ud(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},s("auto.33ce417454bf"));let c=ep(t,d),p=pd(),l=u=>{let g={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(b=>b&&b.map(m=>m.id===u.id?g:m)),At(u.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>f.workspace.openMainTab({newTab:f.ui.hasModKey(u)}),title:s("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",d.tag?` \xB7 #${d.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},c.length,d.due?` \xB7 ${d.due}`:"")),c.length===0&&o.createElement("div",{className:"todo-fence-empty"},s("auto.a93c9cdad41c")),c.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>l(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},He.find(g=>g.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function md(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Ju(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(tp,{code:t}))),{examples:ld.todo});return()=>{e(),document.getElementById(Ra)?.remove()}}var X=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Dt=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),op=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),rp=e=>o.createElement(Dt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),np=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),ap=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),ip=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),sp=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),dp=e=>o.createElement(Dt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),lp={inprogress:np,waiting:ap,onhold:rp,delegated:ip,deferred:sp,completed:dp,canceled:op},Le=({status:e,dotCls:t,color:r})=>{let n=e?lp[e]:void 0,a=r?{color:r}:void 0;return n?o.createElement(n,{className:`todo-status-menu-svg ${t}`,style:a}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:a})};var Yo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),mt=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),be=e=>o.createElement(X,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Xo=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),fd=e=>o.createElement(X,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),gd=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),hd=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),tn=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),on=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Zo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Jo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),bd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),yd=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),wd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),rn=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),ze=e=>o.createElement(X,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),vd=e=>o.createElement(Dt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),xd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),nn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),et=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),ft=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),kd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),Td=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),qt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Yt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Sd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),an=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Ad=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),tt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),Ct=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),gt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),sn=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),dn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),ln=e=>o.createElement(X,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Qo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),er=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),at=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),cn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),tr=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),un=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),$a=e=>o.createElement(X,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),ja=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),Ka=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),Ed=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),Dd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),Cd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),Id=e=>o.createElement(X,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Nd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"}));var Ld=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Pd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14"})),Od=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),pn=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),Ua=e=>o.createElement(X,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),Md=e=>o.createElement(X,{...e},o.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function or(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var vo=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let a=o.useRef(null),[i,d]=o.useState([]),[c,p]=o.useState("idle"),[l,u]=o.useState(-1),[g,b]=o.useState(!1),m=o.useRef(null),A=o.useRef(0),v=o.useRef(!1);o.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),o.useEffect(()=>{n&&a.current?.focus()},[n]);let N=w=>{m.current!==null&&window.clearTimeout(m.current);let T=++A.current;if(w.trim().length<2){d([]),p("idle"),b(!1);return}b(!0),p("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:w.trim(),kinds:["place"],limit:8}).then(_=>{T===A.current&&(d(_),u(_.length?0:-1),p("done"))},()=>{T===A.current&&(d([]),u(-1),p("failed"))})},250)},D=w=>{let T=Number(w.metadata?.longitude),_=Number(w.metadata?.latitude),H=(w.value??w.label).trim();v.current=!0,A.current++,a.current&&(a.current.value=H),b(!1),d([]),t({name:H,...Number.isFinite(T)&&Number.isFinite(_)?{lng:T,lat:_}:{}})},O=()=>{let w=a.current?.value.trim()??"";if(A.current++,b(!1),v.current){v.current=!1;return}w!==(e?.name??"")&&t(w?{name:w}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(mt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:s("todo.locationPlaceholder"),"aria-label":s("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:w=>{v.current=!1,N(w.currentTarget.value)},onFocus:w=>{w.currentTarget.value.trim().length>=2&&i.length&&b(!0)},onBlur:O,onKeyDown:w=>{w.nativeEvent.isComposing||(w.key==="ArrowDown"&&i.length?(w.preventDefault(),b(!0),u(T=>(T+1)%i.length)):w.key==="ArrowUp"&&i.length?(w.preventDefault(),u(T=>T<=0?i.length-1:T-1)):w.key==="Enter"?(w.preventDefault(),g&&i[l]?D(i[l]):O()):w.key==="Escape"&&g&&(w.preventDefault(),w.stopPropagation(),A.current++,b(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:s("todo.openLocation"),"aria-label":s("todo.openLocationOf",{p0:e.name}),onClick:()=>or(e)},o.createElement(Ad,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:s("todo.removeLocation"),"aria-label":s("todo.removeLocation"),onMouseDown:w=>w.preventDefault(),onClick:()=>{A.current++,a.current&&(a.current.value=""),d([]),b(!1),t(void 0)}},o.createElement(be,null)))),g&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":s("todo.location")},c==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},s("todo.location.searching")),c==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},s("todo.location.noResults")),c==="failed"&&o.createElement("li",{className:"todo-location-status"},s("todo.location.failed")),i.map((w,T)=>o.createElement("li",{key:w.id,role:"option","aria-selected":T===l},o.createElement("button",{type:"button",className:"todo-location-hit"+(T===l?" is-active":""),onMouseDown:_=>_.preventDefault(),onMouseEnter:()=>u(T),onClick:()=>D(w)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(tt,null),w.label),w.description&&o.createElement("span",{className:"todo-location-hit-context"},w.description))))))};function cp(){try{return Ho(f?.getState().weekStart)}catch{return 1}}function _d(e,t=cp()){let r=Ht(e).getDay();return Et(e,6-(r-t+7)%7)}var Pe={kind:"smart",id:"all"},mn=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ve("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ve("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:ve("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ve("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ve("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ve("green"),dated:!1}],rr=mn.map(e=>e.id);function Va(e){let t=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(t.order)?t.order:[])typeof l=="string"&&rr.includes(l)&&!r.includes(l)&&r.push(l);rr.forEach((l,u)=>{if(r.includes(l))return;let g=rr.slice(0,u).reverse().find(b=>r.includes(b));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=t.colors&&typeof t.colors=="object"?t.colors:{},d={};for(let l of rr){let u=i[l];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(d[l]=u)}let c=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let l of rr){let u=c[l];(u==="white"||u==="black")&&(p[l]=u)}return{order:r,hidden:a,colors:d,textColors:p}}function zd(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>ht(t,e))}function ht(e,t){let r=mn.find(i=>i.id===e)??mn.find(i=>i.id==="all"),n=t?.colors[r.id],a=t?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function nr(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}function up(e,t,r=Ae(new Date)){if(t.kind==="groups")return e.group?rt(t.names).has(Y(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=_d(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function fn(e,t,r,n=Ae(new Date)){return up(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Fd(e,t=Ae(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=_d(t);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++,i<=n&&r.week++)}return r}function gn(e,t){let r=t===null?null:rt([t]);return e.filter(n=>!n.completed&&(r===null?!n.group:r.has(Y(n.group??"")))).length}function Ze(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var pp=mn.map(e=>e.id);function ar(e){if(typeof e!="string")return Pe;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Pe}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Pe}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Pe;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(d=>typeof d=="string"&&!!d.trim()).map(d=>d.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Pe}catch{return Pe}return pp.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Pe}function hn(e,t){return Ze(e)===Ze(t)}var mp=["group","notes","status","location","tags"],fp="todo.view",gp="todo.showCompleted",hp="todo.statusFilter",bp="todo.search",yp="todo.pageSort",qa="panelChip",Rd="pageShowCompleted",Ba="statusFilter",Ya="dateBreakdown",$d="smartLists",ir="pageSearch",jd="pageSort",wp={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Kd=["due","priority","flagged","updated","created","name"];function Gd(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Kd.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:po(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function vn(e){let t=wp[e],r=o.useCallback(()=>Gd(f.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(d=>{a(c=>{let p=Gd({...c,...d});return f.settings.set(t,p),p})},[t]);return[n,i]}function bn(){let e=f.settings.get()[Ya];return e==="weekly"||e==="daily"?e:"monthly"}function xn(){let[e,t]=o.useState(bn);return o.useEffect(()=>f.settings.subscribe(()=>t(bn())),[]),e}function xo(){return f.runtime.getOrCreate(fp,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function kn(){return f.runtime.getOrCreate(gp,()=>({show:null,listeners:new Set}))}function Tn(){return f.runtime.getOrCreate(hp,()=>({filter:null,listeners:new Set}))}function sr(){return f.runtime.getOrCreate(bp,()=>({query:null,listeners:new Set}))}function Sn(){return f.runtime.getOrCreate(yp,()=>({value:null,listeners:new Set}))}function Xt(){let e=xo();return e.view||(e.view=ar(f.settings.get()[qa]),e.history=[e.view],e.historyIndex=0),e.view}function Ke(e){let t=xo();if(Xt(),t.view&&hn(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(qa,Ze(e));for(let n of t.listeners)n(e)}function An(){let e=xo();return Xt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function ko(e){let t=xo();Xt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(qa,Ze(t.view));for(let n of t.listeners)n(t.view)}}function Xa(e){let t=xo();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function Ud(){let e=xo();e.view=null,e.history=[],e.historyIndex=-1,kn().show=null,Tn().filter=null,sr().query=null,Sn().value=null}function yn(){return Va(f.settings.get()[$d])}function Vd(e){f.settings.set($d,Va(e))}function En(){let[e,t]=o.useState(yn);return o.useEffect(()=>f.settings.subscribe(()=>t(yn())),[]),e}function Bd(e){let t=sr(),r=e.slice(0,500);if(t.query!==r){t.query=r,f.settings.set(ir,r);for(let n of t.listeners)n(r)}}function Dn(){let e=()=>{let n=sr();return n.query===null&&(n.query=typeof f.settings.get()[ir]=="string"?String(f.settings.get()[ir]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=sr();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,Bd]}function Za(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||mp.includes(t.field)||Kd.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function Hd(){let e=Sn();return e.value||(e.value=Za(f.settings.get()[jd])),e.value}function Wd(e){let t=Sn(),r=Za(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(jd,r);for(let n of t.listeners)n(r)}}function qd(){let[e,t]=o.useState(Hd);return o.useEffect(()=>{let r=Sn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,Wd]}function Cn(e=Xt()){return{v:1,view:Ze(e),showCompleted:Wa(),statusFilter:wn(),search:sr().query??(typeof f.settings.get()[ir]=="string"?String(f.settings.get()[ir]).slice(0,500):""),sort:Hd()}}function In(e,t=!1){return e.v!==1?!1:(t||Ke(ar(e.view)),Zt(e.showCompleted===!0),Ha(po(e.statusFilter)),Bd(typeof e.search=="string"?e.search:""),Wd(Za(e.sort)),!0)}function wn(){let e=Tn();if(e.filter===null){let t=f.settings.get()[Ba];e.filter=po(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(Ba,e.filter)}return e.filter}function Ha(e){let t=Tn(),r=po(e),n=t.filter??wn();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,f.settings.set(Ba,r);for(let a of t.listeners)a(r)}}function bt(){let[e,t]=o.useState(wn);return o.useEffect(()=>{let r=Tn();r.listeners.add(t);let n=f.settings.subscribe(()=>{let a=po(r.filter??wn());Ha(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,Ha]}function Nn(){let[e,t]=o.useState(Xt);return o.useEffect(()=>Xa(t),[]),e}function Wa(){let e=kn();return e.show===null&&(e.show=f.settings.get()[Rd]===!0),e.show}function Zt(e){let t=kn();if(t.show!==e){t.show=e,f.settings.set(Rd,e);for(let r of t.listeners)r(e)}}function yt(){let[e,t]=o.useState(Wa);return o.useEffect(()=>{let r=kn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Zt(!Wa())]}function Xd(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(zt).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var vp=["normal","low","medium","high"];function Zd(e,t){return e&&vp.includes(e)?e:t}function xp(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function kp(e,t){return e.dueDate?{badges:xp(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:De(e.group,t)}:{}}:null}function Tp(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Zd(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ne(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Ln(e){return Xe(e)}function Yd(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var Ja="attachment:",Qa="url:";function Sp(){return!0}function Ap(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Yd(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${Ja}${i}`,label:Yd(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${Qa}${i}`,label:i,icon:"link"}))}),e.location&&Sp()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Ep(e,t){if(t.startsWith(Ja)){let r=t.slice(Ja.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(Qa)){let r=t.slice(Qa.length);if(!(e.urls??[]).includes(r))return!1;let n=go(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Ke(e.completed?{kind:"smart",id:"completed"}:Pe),Me().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(or(e.location),!0):!1;default:return!1}}function Jd(){let e=Ie(),t=$t("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:u,limit:g,cursor:b})=>{let m,A=()=>`${t}:${r}`;if(b){let w;try{w=JSON.parse(b)}catch{throw new Error("Invalid Calendar source cursor.")}if(!w||w.startDate!==l||w.endDate!==u||w.limit!==g||w.revision!==A()||typeof w.cursor!="string"||!w.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=w.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let v=A(),N=await Fs(l,u,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(b&&v!==A())throw new Error("Calendar source cursor is stale; restart the range.");let D=Qe(),O=A();return{items:N.todos.map(w=>kp(w,D)).filter(w=>!!w),revision:O,...N.cursor?{cursor:JSON.stringify({startDate:l,endDate:u,limit:g,revision:O,cursor:N.cursor})}:{}}},create:async(l,u)=>{if(u.endDate&&u.endDate!==l)return!1;let g=u.title?.trim();if(!g)return!1;let b=new Date().toISOString();return Ur({id:$t("todo"),title:g,completed:u.completed??!1,priority:Zd(u.priority,"normal"),dueDate:l,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:b,updatedAt:b})},update:async(l,u)=>{let g=await Ln(l);return g&&u.endDate&&u.endDate!==(u.date??g.dueDate)?!1:g?At(g.id,Tp(g,u),g.updatedAt):!1},remove:l=>Vr(l),open:async l=>{let u=await Ln(l);await f.workspace.revealOwnPanel("left_sidebar"),u&&(Ke(u.completed?{kind:"smart",id:"completed"}:Pe),Me().request(u.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let u=await Ln(l);return u?Ap(u):[]},runAction:async(l,u)=>{let g=await Ln(l);return g?Ep(g,u):!1}},i=()=>{f.interop.state.publish(Po,++r)};f.interop.state.publish(Po,r);let d=Os(i),c=Wr(i),p=f.interop.services.provide(zt,a);return()=>{n=!1,d(),c(),p(),f.interop.state.publish(Po,null)}}var ei=e=>typeof e=="string"?e:"";function Qd(e){let t=ei(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function el(e){let t={cardKind:"todo",open:async(r,n)=>{if(ei(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ei(r.id)}),!0;let a=Qd(r.filePath)||Qd(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(na,t)}function it(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>f.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function Pn(){let e=o.useCallback(i=>f.interop.state.subscribe(kr,i),[]),t=o.useCallback(()=>f.interop.state.get(kr),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function tl(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,d)=>{let c=new Set(r.current);d?c.add(i):c.delete(i),r.current=c,t(c)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var Dp="todo.sharedTodos";function ti(){return f.runtime.getOrCreate(Dp,()=>({todos:[],listeners:new Set}))}function we(){return ti().todos}function wt(e){let t=ti();t.todos=e;for(let r of t.listeners)r(e)}function It(e){let t=ti();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var oi="list:",ol=e=>f.ui.hasModKey(e)||e.button===1,Cp=e=>`${oi}${Ze(e)}`;function Jt(e){return e?.startsWith(oi)?ar(e.slice(oi.length)):null}var rl=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function ri(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:s("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?s("todo.chip.noGroup"):s(ht(e.id).labelKey)}function ni(e,t){f.workspace.openMainTab({instanceId:Cp(e),title:ri(e),newTab:t})}function dr(e,t=!1){t||Jt(rl(f.getState().activePluginTab))?ni(e,t):Ke(e)}function lr(){let e=Nn(),{activePluginTab:t}=it("activePluginTab"),r=rl(t);return o.useMemo(()=>Jt(r),[r])??e}function Nt(){return f.workspace.openOwnSettings(),Promise.resolve()}var ai={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function nl(){return["completed",...Rt().filter(t=>t!=="completed")].map(t=>ke(t))}function Qt(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function al(){for(let e of Qt().listeners)e()}function ii(e,t=""){let r=Qt();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,al())}function si(e,t){e?Qt().selected.set(t,e):Qt().selected.delete(t),al()}function Ip(e,t){let r=e==="main_workspace"?Jt(t):null,n=Cn(r??void 0),a=we().find(i=>i.id===Qt().selected.get(e));return{title:s("manifest.name"),view:n,actions:Qt().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...An(),goBack:()=>ko(-1),goForward:()=>ko(1)}}}}function Np(e){let t=Qt().listeners;t.add(e);let r=It(e),n=Xa(e),a=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function Lp(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Xe(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!In(e,t==="main_workspace"&&Jt(n)!==null))throw new Error("Unsupported To-Do bookmark.");si(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Me().request(e.todoId,"focus")}function Pp({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(rn,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},nl().map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,i.label),o.createElement("span",null,r.filter(d=>_e(d)===i.id).length)))))}function Op(){let e=o.useSyncExternalStore(It,we,we),t=Be(),r=lr(),n=r.kind==="smart"?s(ht(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[s("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:s("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[s("todo.properties.view"),n],[s("todo.properties.tasks"),e.length],...nl().map(a=>[a.label,e.filter(i=>_e(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...Te(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(c=>a===null?!c.group:rt([a]).has(Y(c.group??""))),d=a??s("todo.chip.noGroup");return o.createElement(Pp,{key:a??"ungrouped",label:d,color:a?xe(De(a,t)):"var(--text-tertiary)",todos:i})})))}function Mp(){let e=o.useSyncExternalStore(It,we,we),t=Be(),r=lr();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(cr,{embedded:!0,todos:e,groups:t,names:Te(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>dr(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Pe),onOpenSettings:Nt}))}function il(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>da(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>Ip(n,a),subscribe:Np,restore:(a,i,d)=>Lp(a,n,d?.background,i)},{stateSchema:ai,itemStateSchema:{...ai,required:[...ai.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:s(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Tr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Xe(n.item.id):null;return a?Object.entries(a).map(([i,d])=>({id:i,label:s(`todo.field.${i}`),value:d??null,readOnly:!0})):[]},render:()=>o.createElement(Op,null)})),r.push(e.interop.extensions.provide(Tr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>Qe().map(n=>({id:n.id,label:n.name,value:we().filter(a=>rt([n.name]).has(Y(a.group??""))).length,readOnly:!0})),render:()=>o.createElement(Mp,null)})),()=>r.forEach(n=>n())}function sl(e,t,r){let n=new Date().toISOString();return{id:$t("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function dl(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function To(e,t,r="main_workspace"){let n=o.useRef(Ie()).current,[a,i]=o.useState(we()),[d,c]=o.useState(null),[p,l]=o.useState(null),[u,g]=o.useState(null),[b,m]=o.useState(!0),[A,v]=o.useState(0),[N,D]=o.useState(!1),{pendingIds:O,isPending:w,setPending:T}=tl(),_=o.useRef(!1),H=o.useRef(0),F=o.useRef({sortField:e,sortDir:t});F.current={sortField:e,sortDir:t};let j=o.useRef([]),$=o.useMemo(()=>{let I=new Map(a.map(K=>[K.id,K])),ae=new Set(j.current),de=[];for(let K of j.current){let J=I.get(K);J&&de.push(J)}for(let K of a)ae.has(K.id)||de.push(K);return de},[a,A]),oe=o.useCallback(I=>{let ae=++H.current;I&&m(!0),Ye(n).then(de=>{if(n.assertActive(),ae===H.current){if(I){let{sortField:K,sortDir:J}=F.current;j.current=yo(de,K,J).map(Q=>Q.id)}else{let K=new Set(de.map(h=>h.id)),J=j.current.filter(h=>K.has(h)),Q=new Set(J),{sortField:S,sortDir:M}=F.current,G=yo(de.filter(h=>!Q.has(h.id)),S,M).map(h=>h.id);j.current=[...G,...J]}wt(de),m(!1)}}).catch(()=>{ae===H.current&&m(!1)})},[n]);o.useEffect(()=>(oe(!0),()=>{H.current++}),[oe]),o.useEffect(()=>bo(()=>oe(!1)),[oe]);let se=o.useRef(!0);o.useEffect(()=>{if(se.current){se.current=!1;return}j.current=yo(we(),e,t).map(I=>I.id),v(I=>I+1)},[e,t]),o.useEffect(()=>It(I=>i(I)),[]);let re=o.useCallback(()=>c(null),[]),ce=o.useCallback(I=>{si(I,r),g(I)},[r]),k=o.useCallback(()=>g(null),[]),L=o.useCallback(async(I,ae,de)=>{if(_.current)return null;let K=I.trim();if(!K)return null;let J={...sl(K,ae),...de?.patch};_.current=!0,D(!0),j.current=[J.id,...j.current],wt([J,...we()]),c(J.id);let Q=()=>{j.current=j.current.filter(S=>S!==J.id),wt(we().filter(S=>S.id!==J.id)),c(S=>S===J.id?null:S)};try{let S=await Ur(J);return S||Q(),S?J:null}catch{return Q(),null}finally{_.current=!1,D(!1)}},[]),y=o.useCallback(async(I,ae,de)=>{if(w(I))return!1;let K=we().find(Q=>Q.id===I);if(!K)return!1;let J={...K,...ae,updatedAt:new Date().toISOString()};T(I,!0),wt(we().map(Q=>Q.id===I?J:Q));try{return await At(I,J,K.updatedAt,de)?!0:(wt(we().map(S=>S.id===I?K:S)),!1)}catch{return wt(we().map(Q=>Q.id===I?K:Q)),!1}finally{T(I,!1)}},[w,T]),x=o.useCallback(async I=>{if(w(I))return;let ae=we().find(K=>K.id===I);if(!ae)return;T(I,!0),j.current=j.current.filter(K=>K!==I),wt(we().filter(K=>K.id!==I)),c(K=>K===I?null:K),u===I&&g(null);let de=()=>{j.current.includes(I)||j.current.push(I),we().some(K=>K.id===I)||wt([...we(),ae])};try{await Vr(I)||de()}catch{de()}finally{T(I,!1)}},[u,w,T]);return{todos:a,loading:b,ordered:$,lastCreatedId:d,clearLastCreated:re,menuId:p,setMenuId:l,editingId:u,openDetail:ce,closeDetail:k,pendingIds:O,creating:N,create:L,patchTodo:y,removeTodo:x}}var _p=[".ttf",".otf",".woff",".woff2"],zp=[".csv"],Fp=[".base"],Gp=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Rp=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],$p=[...Gp,...Rp,".ico",".flavicon"];var jp=[".pdf"],Kp=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Up=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Vp=[".srt",".vtt",".ass"],Bp=[".stl",".obj",".glb",".gltf"],Hp=[".bin",".mtl"];function di(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Wp={type:"core",id:"valley"},q=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Wp,...a});function qp(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Yp=qp([[[".mermaid",".mmd"],q("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],q("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],q("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],q("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],q("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[_p,q("font","font","font","media")],[[".epub",".mobi",".azw3"],q("ebook","ebook","ebook","documents")],[[".djvu"],q("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],q("comic","comic","comic","documents")],[[".md",".markdown"],q("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],q("text","text","text","notes")],[[".json"],q("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],q("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[zp,q("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Fp,q("base","base","fallback","data")],[$p,q("image","image","image","media",{information:["identity","dimensions","exif"]})],[jp,q("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Kp,q("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Up,q("video","video","video","media",{information:["identity","media","video-codec"]})],[Vp,q("text","subtitle","text","media")],[Bp,q("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[Hp,q("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],q("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],q("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],q("docx","word","opendocument","documents")],[[".ods"],q("csv","excel","opendocument","data")],[[".odp"],q("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],q("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],q("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],q("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],q("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],q("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],q("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],q("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],q("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],q("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],q("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],q("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],q("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],q("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],q("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],q("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],q("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],q("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],q("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],q("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],q("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],q("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],q("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],q("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],q("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],q("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],q("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],q("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Xp=q("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Zp(e){return Yp[di(e)]??Xp}function ur(e){return Zp(e).kind}var ll="valley-realm",cl="asset";function ul(e){return`${ll}://${cl}/${encodeURIComponent(e)}`}var Jp={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function Qp(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function li(e){let t=Jp[ur(e)];if(t)return s(t);let r=di(e).replace(".","").toUpperCase();return r?s("todo.fileKind.generic",{p0:r}):s("todo.fileKind.file")}var em={image:sn,audio:dn,video:ln},pl=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=ur(e),i=e.split("/").pop()??e,d=em[a]??gt;o.useEffect(()=>{let u=!1;return f.realm.fileInfo(e).then(g=>{u||n(g?.size??null)}),()=>{u=!0}},[e]);let[c,p]=o.useState(0);o.useEffect(()=>f.realm.onChanged(()=>p(u=>u+1)),[]);let l=a==="image"?`${ul(e)}?v=${c}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},li(e),r!==null&&` \xB7 ${Qp(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},l?o.createElement("img",{src:l,alt:"",loading:"lazy"}):o.createElement(d,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:s("todo.removeAttachment"),"aria-label":s("todo.removeAttachmentOf",{p0:i})},o.createElement(be,null)))};var tm={image:sn,audio:dn,video:ln};function ci({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let a=o.useRef(null),[i,d]=o.useState([]),[c,p]=o.useState(0),[l,u]=o.useState("idle"),g=o.useRef(null),b=o.useRef(0);o.useEffect(()=>{n&&a.current?.focus()},[n]),o.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=v=>{g.current!==null&&window.clearTimeout(g.current);let N=++b.current;if(!v.trim()){d([]),u("idle");return}u("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:v.trim(),kinds:["attachment"],limit:6}).then(D=>{N===b.current&&(d(D),p(0),u("done"))},()=>{N===b.current&&(d([]),u("done"))})},150)},A=v=>(v.value??v.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(mt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:v=>m(v.currentTarget.value),onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="ArrowDown"&&i.length?(v.preventDefault(),p(N=>(N+1)%i.length)):v.key==="ArrowUp"&&i.length?(v.preventDefault(),p(N=>N<=0?i.length-1:N-1)):v.key==="Enter"?(v.preventDefault(),i[c]&&e(A(i[c]))):v.key==="Escape"&&(v.preventDefault(),v.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":s("auto.77dfd2135f4d"),title:s("auto.77dfd2135f4d"),onClick:t},o.createElement(be,null))),l!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},l==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},s("todo.location.searching")),l==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},s("todo.file.noResults")),i.map((v,N)=>{let D=A(v),O=tm[ur(D)]??gt,w=D.includes("/")?D.slice(0,D.lastIndexOf("/")):"";return o.createElement("li",{key:v.id,role:"option","aria-selected":N===c},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(N===c?" is-active":""),onMouseDown:T=>T.preventDefault(),onMouseEnter:()=>p(N),onClick:()=>e(D)},o.createElement(O,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},v.label||D.split("/").pop()),w&&o.createElement("span",{className:"todo-file-search-folder"},w))))})))}function On(e){return f.markdown.render(e,{inline:!0})}var om={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},rm=["tomorrow","weekend","pick"];function nm(e=Ae(new Date)){let t=Ma(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return Et(e,n)}function Mn(e,t=Ae(new Date)){let r=e.slice(0,10),n=d=>d==="tomorrow"?Et(t,1):d==="weekend"?nm(t):null,a=new Set,i=[];for(let d of rm){let c=n(d);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:d,labelKey:om[d],date:c})}return i}function ml(e,{todo:t,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:d,disabled:c=!1}){let p=_e(t);n(t.id);let l=Mn(t.dueDate??"",Ae(new Date));return f.ui.openMenu([{label:s("auto.bae7d5be7082"),icon:o.createElement(et,{className:"todo-menu-action-icon"}),enabled:!c,submenu:fo().map(u=>({label:u.label,icon:o.createElement(Le,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>i(Ne(u.status))}))},{label:s("todo.menu.reschedule"),icon:o.createElement(at,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(u=>u.date).map(u=>({label:s(u.labelKey),icon:u.id==="tomorrow"?o.createElement(tr,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(un,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:u.date})}))},{label:s(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(ze,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:t.flagged?void 0:!0})},{label:s("auto.886cbff9d9df"),icon:o.createElement(vd,{className:"todo-menu-action-icon"}),enabled:!c,submenu:He.map(u=>({label:ot(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>i({priority:u.id})}))},{label:s("todo.menu.moveGroup"),icon:o.createElement(nn,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:s("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>i({group:void 0})},...r.map(u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>i({group:u})}))]},{type:"separator"},{label:s("auto.5301648dcf6b"),icon:o.createElement(xd,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:s("auto.f6fdbe48dc54"),icon:o.createElement(ft,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:d}],e).then(()=>{}).finally(()=>n(null))}function _n(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),ml({x:e.clientX,y:e.clientY},t))}var zn=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:d=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":s("auto.047d10fd5b0e"),title:s("auto.6bf5da9c080b"),disabled:d,onClick:c=>{c.stopPropagation(),ml({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:d})}},o.createElement(gd,null)));function am(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function im(e,t=.998){return e/1e3*t/(1-t)}function fl(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function gl(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+am(n-t,a,.2))}function hl(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,im(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function bl(e,t,r,n,a,i){let d=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,p=2*i*Math.sqrt(c),l=t+(-c*(e-r)-p*t)*d,u=e+l*d,g=Math.abs(u-r)<.5&&Math.abs(l)<20;return{value:g?r:u,velocity:g?0:l,done:g}}function ui(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,d=Math.max(56,Math.ceil(Math.max(...t))+22),c=n*d<=i+(r?24:0),p=c?d:48,l=Math.min(n*p,Math.max(i,n*32)),u=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:p,labelled:c,openWidth:l,commitPoint:u}}var yl=.22,wl=.18,sm=.8,Fn=.9,dm=400,lm=80,cm=10,um=5,pm=4,mm=3,fm=.5,gm=6,hm=["left","right"],vl={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function bm(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function ym(e,t){let r={today:o.createElement(tr,null),tomorrow:o.createElement(tr,null),weekend:o.createElement(un,null),pick:o.createElement(at,null)};return e.map(n=>({key:n.id,label:s(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var mr=null;function xl(e){if(mr===e)return;let t=mr;mr=e,t?.close()}function kl(e){mr===e&&(mr=null)}var So;function Tl(e,t){if(So===void 0)try{So=document.createElement("canvas").getContext("2d")}catch{So=null}return So?(So.font=t,So.measureText(e).width):e.length*7}var wm=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,pr=e=>e>0?"left":e<0?"right":null,Sl=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),d=o.useRef(null),c=o.useRef({left:null,right:null}),p=o.useRef(0),l=o.useRef(null),u=o.useRef(null),g=o.useRef([]),b=o.useRef(!1),m=o.useRef(null),A=o.useRef(null),v=o.useRef({velocity:0,target:0,response:yl,damping:Fn}),N=o.useRef({left:"",right:""}),D=o.useMemo(()=>ym(Mn(e.dueDate??"",Ae(new Date)),r),[e.dueDate,r]),O=o.useMemo(()=>[{key:"flag",label:s(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(ze,null),run:()=>r.toggleFlag()},{key:"details",label:s("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(hd,null),run:()=>r.openDetails()},{key:"delete",label:s("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(ft,null),run:()=>r.remove()}],[r,e.flagged]),w={left:D,right:O},[T,_]=o.useState(()=>({rowWidth:0,left:vl,right:vl})),H=o.useRef(T);H.current=T;let F=()=>{let S=i.current?.querySelector(".todo-swipe-action");if(!S||typeof getComputedStyle!="function")return"13px sans-serif";let M=getComputedStyle(S);return`${M.fontWeight} ${M.fontSize} ${M.fontFamily}`},j=()=>{let S=i.current?.clientWidth??0,M=F(),G=H.current,h={rowWidth:S,left:ui(S,D.map(V=>Tl(V.label,M)),G.left.labelled),right:ui(S,O.map(V=>Tl(V.label,M)),G.right.labelled)};H.current=h;let C=V=>G[V].openWidth!==h[V].openWidth||G[V].labelled!==h[V].labelled;return(G.rowWidth!==S||C("left")||C("right"))&&_(h),h},$=o.useRef(j);$.current=j,o.useEffect(()=>{$.current()},[D,O]);let oe=S=>{let M=pr(S);return!M||M!==u.current?!1:Math.abs(S)>=H.current[M].commitPoint},se=(S,M=!1)=>{p.current=S,M&&S!==0?xl(y.current):S===0&&kl(y.current);let G=i.current,h=d.current;if(!G||!h)return;h.style.transform=S?`translate3d(${S}px, 0, 0)`:"";let C=pr(S),V=H.current,le=oe(S);G.classList.toggle("open",S!==0),G.classList.toggle("committed",le);for(let U of hm){let R=c.current[U];if(!R)continue;let ie=C===U;R.classList.toggle("committed",ie&&le);let ye=ie?le?"100%":`${Math.max(V[U].openWidth,Math.abs(S))}px`:`${S===0?V[U].openWidth:0}px`,Fe=`${ye}|${ie}`;N.current[U]!==Fe&&(N.current[U]=Fe,R.style.width=ye,R.setAttribute("aria-hidden",String(!ie)))}};o.useLayoutEffect(()=>se(p.current));let re=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},ce=(S,M,G,h)=>{if(re(),S!==0&&xl(y.current),p.current===S||wm()||typeof requestAnimationFrame!="function"){se(S);return}v.current={velocity:M,target:S,response:G,damping:h};let C=0,V=le=>{let U=C?(le-C)/1e3:.016666666666666666;C=le;let R=v.current,ie=bl(p.current,R.velocity,R.target,U,R.response,R.damping);R.velocity=ie.velocity,se(ie.value),m.current=ie.done?null:requestAnimationFrame(V)};m.current=requestAnimationFrame(V)},k=o.useRef(()=>{});k.current=()=>{l.current=null,ce(0,0,wl,Fn)};let L=o.useCallback(()=>k.current(),[]),y=o.useRef({close:()=>k.current()}),x=()=>{re(),l.current=null,A.current!=null&&window.clearTimeout(A.current),A.current=null,se(0)},P=o.useRef(x);P.current=x;let I=S=>{let M=H.current,G=pr(S);if(!G)return 0;let h=l.current?.origin;if(h&&G!==h)return 0;let C=M[G],V=G===u.current?C.commitPoint:C.openWidth;return gl(S,V,M.rowWidth)},ae=(S,M,G,h,C)=>{re(),j();let V=p.current,le=pr(V),U=Math.abs(V)>8?le:null;u.current=le&&Math.abs(V)>=H.current[le].openWidth-1?le:null,l.current=bm(S,M,G,h,V,U),g.current=[{x:V,t:C}]},de=(S,M)=>{let G=l.current;!G||G.ended||(G.live||(G.live=!0,re(),n?.()),g.current.push({x:S,t:M}),g.current.length>gm&&g.current.shift(),se(I(S),!0),oe(p.current)&&(G.crossed=!0))},K=S=>{let M=l.current;if(!M||M.ended)return;if(M.ended=!0,!M.live){l.current=null;return}let G=()=>{M.kind==="pointer"&&(l.current=null)},h=fl(g.current),C=p.current,V=pr(C);if(!V){G(),se(0);return}let le=H.current[V],U=S&&oe(C),R=hl({offset:C,velocity:h,openWidth:le.openWidth,committed:U});if(G(),R.commit){let ie=V==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",ye=i.current?.querySelector(ie),Fe=w[V],st=V==="left"?Fe[0]:Fe[Fe.length-1];ce(0,h,wl,Fn),st?.run(ye??i.current);return}ce(R.target,h,yl,Math.abs(h)>dm?sm:Fn)};o.useEffect(()=>L(),[e.dueDate,e.flagged,L]),o.useEffect(()=>{let S=y.current;return()=>{re(),A.current!=null&&window.clearTimeout(A.current),kl(S)}},[]),o.useEffect(()=>{let S=i.current,M=S?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!S||!M)return;let G=0,h=new M(()=>{let C=S.clientWidth,V=G!==C;G=C,$.current(),V&&p.current!==0&&P.current()});return h.observe(S),()=>h.disconnect()},[]);let J=o.useRef({disabled:t,begin:ae,move:de,end:K});J.current={disabled:t,begin:ae,move:de,end:K},o.useEffect(()=>{let S=i.current;if(!S)return;let M=()=>{A.current!=null&&window.clearTimeout(A.current),A.current=null},G=()=>{A.current=null,l.current?.kind==="wheel"&&(J.current.end(!0),l.current=null)},h=C=>{let V=J.current;if(V.disabled||Math.abs(C.deltaX)<=Math.abs(C.deltaY)||C.deltaX===0)return;C.preventDefault();let le=C.deltaMode===WheelEvent.DOM_DELTA_LINE?16:C.deltaMode===WheelEvent.DOM_DELTA_PAGE?S.clientWidth:1,U=-C.deltaX*le,R=l.current;(!R||R.kind!=="wheel")&&(V.begin("wheel",-1,0,0,C.timeStamp),R=l.current),M(),A.current=window.setTimeout(G,lm);let ie=Math.abs(U),ye=R.previous;R.previous=ie;let Fe=R.live&&(R.ended||R.origin!==null&&p.current===0),st=ie>=ye+um,Co=R.distance!==0&&Math.sign(U)!==Math.sign(R.distance)&&ie>=pm;if(Fe&&(st||Co)&&(V.end(!1),V.begin("wheel",-1,0,0,C.timeStamp),R=l.current,R.previous=ie),R.ended)return;if(R.decay=ie<ye?R.decay+1:0,R.peak=Math.max(R.peak,ie),R.distance+=U,R.live&&R.peak>=cm&&R.decay>=mm&&ie<R.peak*fm){V.end(R.crossed);return}!R.live&&Math.abs(R.distance)<8||V.move(R.base+R.distance,C.timeStamp)};return S.addEventListener("wheel",h,{passive:!1}),()=>{S.removeEventListener("wheel",h),M()}},[]);let Q=(S,M)=>o.createElement("div",{ref:G=>{c.current[S]=G},className:`todo-swipe-tray todo-swipe-tray-${S} ${T[S].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${T[S].openWidth}px`}},M.map(G=>o.createElement("button",{key:G.key,type:"button",className:G.cls,tabIndex:-1,title:G.label,"aria-label":G.label,onClick:h=>{h.stopPropagation(),L(),G.run(h.currentTarget)}},G.icon,o.createElement("span",null,G.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:S=>{t||S.pointerType==="mouse"&&S.button!==0||S.target.closest(".todo-swipe-tray")||ae("pointer",S.pointerId,S.clientX,S.clientY,S.timeStamp)},onPointerMove:S=>{let M=l.current;if(!M||M.kind!=="pointer"||M.pointerId!==S.pointerId)return;let G=S.clientX-M.originX,h=S.clientY-M.originY;if(!M.live){if(Math.abs(h)>Math.abs(G)){S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),l.current=null;return}if(Math.abs(G)<8)return;b.current=!0,S.currentTarget.setPointerCapture?.(S.pointerId)}S.preventDefault(),de(M.base+G,S.timeStamp)},onPointerUp:S=>{let M=l.current;!M||M.kind!=="pointer"||M.pointerId!==S.pointerId||(S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),M.live&&de(M.base+(S.clientX-M.originX),S.timeStamp),K(!0))},onPointerCancel:S=>{let M=l.current;!M||M.kind!=="pointer"||M.pointerId!==S.pointerId||(S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),L())},onClickCapture:S=>{let M=!!S.target.closest(".todo-swipe-tray");if(M&&(b.current=!1),b.current&&!M){b.current=!1,S.stopPropagation(),S.preventDefault();return}p.current&&!M&&(S.stopPropagation(),S.preventDefault(),L())}},D.length>0&&Q("left",D),o.createElement("div",{ref:d,className:"todo-swipe-surface"},a),O.length>0&&Q("right",O))};function fr(e,t,r){let n=_e(t);f.ui.openMenu(fo().map(a=>({label:a.label,icon:o.createElement(Le,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ne(a.status))})),{anchor:e})}function mi({status:e,style:t}){let r=ke(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},Je(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(Le,{status:e==="open"?null:e,dotCls:r.cls}),Je(e))}function Al({status:e}){return o.createElement(mi,{status:e,style:ks()})}var vm=2;function fi(e,t){let r=_e(e),n=t.pendingIds.has(e.id),a=o.useRef(null),i=o.useRef(null),d=o.useRef(!1),c=o.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return o.useEffect(()=>c,[c]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:a,className:"todo-check","data-status":r,type:"checkbox",checked:r==="completed","aria-disabled":n||void 0,onPointerDown:()=>{n||(d.current=!1,c(),i.current=window.setTimeout(()=>{d.current=!0;let l=a.current;l&&f.ui.openMenu(fo().map(u=>({label:u.label,icon:o.createElement(Le,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?r==="open":u.status===r,enabled:!n,onSelect:()=>t.patchTodo(e.id,Ne(u.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{d.current&&l.preventDefault()},onKeyDown:()=>{d.current=!1},onChange:l=>{if(d.current){d.current=!1;return}t.patchTodo(e.id,Ne(l.target.checked?"completed":null))},"aria-label":s("auto.13816aca9c25",{p0:e.title})}),r!=="open"&&r!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(Le,{status:r,dotCls:ke(r).cls}))),cancelHold:c}}var El=({todo:e,groups:t,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let d=o.useRef(null);o.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]);let[c,p]=o.useState("");o.useEffect(()=>{let y=!0;return p(""),On(e.title).then(x=>{y&&p(x)}).catch(()=>{y&&p("")}),()=>{y=!1}},[e.title]);let l=(y,x)=>f.workspace.openFile(y,void 0,{newTab:x}),u=He.find(y=>y.id===e.priority)??He[0],g=Te(t),b=_e(e),m=[e.filePath,...e.attachments??[]].filter(y=>!!y),[A,v]=o.useState(!1),N=A?m:m.slice(0,vm),D=m.length-N.length,O=e.urls?.length??0,w=r&&m.length>0,T=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||O>0||w||e.status&&e.status!=="open"&&!ke(e.status).done||e.priority!=="normal"),_=n.pendingIds.has(e.id),H=Ae(new Date),F=e.dueDate&&!a?ut(e.dueDate,H,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",j=e.dueDate?$e(e.dueDate,f.getState().dateFormat):"",$=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<H,oe=o.useRef(null);o.useEffect(()=>oe.current?Dr(e.id,oe.current):void 0,[e.id]);let{check:se,cancelHold:re}=fi(e,n),ce=()=>{Xd(e)||n.openDetail(e.id)},k=y=>n.patchTodo(e.id,y),L=o.useMemo(()=>({reschedule:y=>{n.patchTodo(e.id,{dueDate:y})},pickDate:y=>{let{DateField:x}=f.ui.settings;f.ui.openPopover(P=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(x,{value:e.dueDate,ariaLabel:s("todo.swipe.date"),onChange:I=>{n.patchTodo(e.id,{dueDate:I}),P.close()}})),{anchor:y},{ariaLabel:s("todo.swipe.date")})},setStatus:y=>fr(y,e,k),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{lt(e,n.removeTodo)}}),[e,n]);return o.createElement(Sl,{todo:e,disabled:_,actions:L,onEngage:re},o.createElement("article",{ref:oe,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,"data-status":b,tabIndex:0,onContextMenu:y=>_n(y,{todo:e,groupNames:g,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:k,onRequestDelete:()=>lt(e,n.removeTodo),disabled:_}),onKeyDown:y=>{if(y.target===y.currentTarget){if(y.key==="ArrowDown"||y.key==="ArrowUp"){y.preventDefault(),i?.(y.key==="ArrowDown"?1:-1);return}if(y.key==="Escape"){y.currentTarget.blur();return}y.key==="Enter"&&(y.preventDefault(),n.openDetail(e.id))}},onClick:y=>{y.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||y.detail>1||(d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{d.current=null,ce()},220))},onDoubleClick:y=>{d.current&&(clearTimeout(d.current),d.current=null),!y.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},se,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,u.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},u.symbol," "),c?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:c}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},e.note),(T||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:xe(De(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!ke(e.status).done&&o.createElement(Al,{status:e.status}),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(qt,null)),bs(e.priority)),F&&o.createElement("button",{className:`todo-date${$?" is-overdue":""}`,type:"button",title:s("todo.openInCalendar",{p0:j||F}),onClick:y=>{y.stopPropagation(),ce()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(at,null)),o.createElement("span",{className:"todo-date-day"},F),j&&j!==F&&o.createElement("span",{className:"todo-date-full"},j)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Td,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:s("todo.openLocationOf",{p0:e.location.name}),onClick:y=>{y.stopPropagation(),or(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(tt,null)),e.location.name),w&&o.createElement("span",{className:"todo-attach-count",title:s("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Ct,null)),m.length),O>0&&o.createElement("span",{className:"todo-meta-glyph",title:s("todo.url")},o.createElement(Yt,null),O>1&&O),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:s("todo.reminderSet")},o.createElement(kd,null),e.remindAt.slice(11,16)),!r&&e.tags?.slice(0,3).map(y=>o.createElement("span",{key:y,className:"todo-tag-text"},"#",y)),!r&&(e.tags?.length??0)>3&&o.createElement("span",{className:"todo-tag-more",title:e.tags.slice(3).map(y=>`#${y}`).join(" ")},"+",e.tags.length-3))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:s("todo.flagged")},o.createElement(ze,null)),o.createElement(zn,{todo:e,groupNames:g,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:k,onRequestDelete:()=>lt(e,n.removeTodo),disabled:_})),!r&&m.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":s("auto.c509ffcf5b5c")},N.map(y=>o.createElement("button",{key:y,className:"todo-file-card",title:y,onClick:x=>{x.stopPropagation(),l(y,f.ui.hasModKey(x))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},y===e.filePath?o.createElement(gt,null):o.createElement(Ct,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},dl(y)),o.createElement("span",{className:"todo-file-card-kind"},li(y))))),(D>0||A)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${A?" open":""}`,title:A?s("todo.fewerFiles"):s("todo.moreFiles",{p0:D}),"aria-expanded":A,onClick:y=>{y.stopPropagation(),v(x=>!x)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(rn,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},A?s("todo.fewerFiles"):s("todo.moreFiles",{p0:D})))))))};function Gn({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=o.useRef(null),d=c=>{let p=c.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),l=[...e];for(let u of p)l.some(g=>g.toLowerCase()===u.toLowerCase())||l.push(u);return l.length===e.length?!1:(t(l),!0)};return o.useEffect(()=>{r&&i.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),i.current?.focus())}},e.map(c=>o.createElement("span",{key:c,className:"todo-tags-chip"},o.createElement("span",null,"#",c),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":s("todo.compose.removeTag",{tag:c}),title:s("todo.compose.removeTag",{tag:c}),onClick:()=>{t(e.filter(p=>p!==c)),i.current?.focus()}},o.createElement(be,null)))),o.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":s("todo.compose.addTags"),"aria-label":s("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let p=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&p.value.trim()?(c.preventDefault(),d(p.value)&&(p.value="")):c.key==="Backspace"&&!p.value&&e.length&&(c.preventDefault(),t(e.slice(0,-1))))},onBlur:c=>{d(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let p=c.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(c.preventDefault(),d(c.currentTarget.value+p),c.currentTarget.value="")}}))}function xm(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function Rn(e,t,r){let n=xm(e,t);return r?n:n.filter(a=>!co(a))}function gi(){let[e,t]=bt(),[r]=yt(),a=dt().map(u=>u.id),i=Rn(e,a,r),d=a.filter(u=>!co(u)),c=a.filter(u=>co(u)),p=u=>u.length===i.length&&u.every(g=>i.includes(g)),l=[{id:"all",label:s("todo.chip.all"),title:s("todo.filters.quickAll"),active:i.length===a.length,select:()=>{Zt(!0),t("all")}},{id:"open",label:s("todo.status.todo"),title:s("todo.filters.quickOpen"),active:p(d),select:()=>{Zt(!1),t(d)}},{id:"done",label:s("todo.status.completed"),title:s("todo.filters.quickDone"),active:p(c),select:()=>{Zt(!0),t(c)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":s("todo.filters.statuses")},l.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Dl(){let[e,t]=bt(),[r]=yt(),n=dt(),a=n.map(c=>c.id),i=Rn(e,a,r),d=c=>{let p=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);p.length&&(Zt(p.some(l=>co(l))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(gi,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let p=i.includes(c.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:c.id,onClick:()=>d(c.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Le,{status:c.id==="open"?null:c.id,dotCls:c.cls})),o.createElement("span",null,c.label))}))}var Nl=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],km=["title","due","priority","group","note"],hi=[10,20,30,40,50,100,200,500],gr=He.map(e=>e.id).reverse(),Ll=Nl.map(e=>e.id),Ao={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function eo(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var to=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Tm(e){let[t,r]=o.useState({due:Ao.due,priority:Ao.priority,flagged:Ao.flagged,mins:{...jn}}),n=f.getState().dateFormat,a=f.ui.language();return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let d=Ae(new Date),c={today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},p=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(v,N)=>ut(`2030-${String(N+1).padStart(2,"0")}-28`,d,c,a,n))],l=Math.max(...p.map(v=>eo(i,"todo-table-cell-btn is-overdue",`<span>${to(v)}</span><span class="todo-table-time">23:59</span>`)),eo(i,"todo-table-sort active",`<span>${to(s("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...gr.map(v=>eo(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${to(ot(v))}</span>`)),eo(i,"todo-table-sort active",`<span>${to(s("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=eo(i,"todo-table-sort active",`<span>${to(s("todo.flagged"))}</span><svg width="12" height="12"></svg>`),b=v=>eo(i,"todo-table-sort active",`<span>${to(s(v))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(yi.map(v=>[v,Math.max(jn[v],b(v==="title"?"todo.table.title":bi[v]))])),A={due:Math.max(l+10,96),priority:Math.max(u+10,72),flagged:Math.max(g+10,48),mins:m};r(v=>JSON.stringify(v)===JSON.stringify(A)?v:A)},[e,n,a]),t}var Sm=360;function Am(e,t){let[r,n]=o.useState(Ao.tags),a=[...new Set(t.map(d=>(d.tags??[]).join(`
`)).filter(Boolean))],i=a.join("\0");return o.useLayoutEffect(()=>{let d=e.current;if(!d)return;let c=Math.max(0,...a.map(p=>eo(d,"",p.split(`
`).map(l=>`<span class="todo-table-tag">#${to(l)}</span>`).join(""))));n(Math.min(Sm,Math.max(Ao.tags,c+12)))},[e,i]),r}var Em=240,Dm=82,bi=Object.fromEntries(Nl.map(e=>[e.id,e.labelKey]));function Cm(e){if(!Array.isArray(e))return km;let t=[...new Set(e)].filter(r=>r==="title"||Ll.includes(r));return t.includes("title")?t:["title",...t]}function Im(e){return Array.isArray(e)?gr.filter(t=>e.includes(t)):[]}function Nm(e){return hi.includes(e)?e:hi[0]}function $n(e,t){let[r,n]=o.useState(()=>t(f.settings.get()[e]));o.useEffect(()=>f.settings.subscribe(()=>n(t(f.settings.get()[e]))),[e,t]);let a=o.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var Pl=()=>$n("pageColumns",Cm),Ol=e=>e==="title"?"todo.table.title":bi[e],Kn=()=>$n("pagePriorityFilter",Im),Eo=({priority:e})=>o.createElement(e==="high"?ja:e==="medium"?Ed:e==="low"?Ka:Pd,{className:`todo-table-priority-icon todo-priority-${e}`});function Lm({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function Pm(){let[e]=bt(),[t]=yt(),n=dt().map(c=>c.id),a=Rn(e,n,t),i=e!=="all"&&a.length!==n.length,d=s("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":d,title:d,onClick:c=>{f.ui.openPopover(()=>o.createElement(Dl,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d})}},o.createElement(et,null))}function Om(){let[e,t]=Kn();return o.createElement("div",{className:"todo-status-filter-menu"},gr.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):gr.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Eo,{priority:r})),o.createElement("span",null,ot(r)))}))}function Ml(){let[e]=Kn();return o.createElement(Lm,{label:s("todo.table.priority"),active:e.length>0,icon:o.createElement(qt,null),onOpen:t=>{f.ui.openPopover(()=>o.createElement(Om,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:s("todo.table.priority"),width:168})}})}function Mm(){let[e,t]=Pl(),r=[...e,...Ll.filter(p=>!e.includes(p))],[n,a]=o.useState(null),[i,d]=o.useState(null),c=(p,l,u)=>{if(p===l)return;let g=r.filter(b=>b!==p);g.splice(g.indexOf(l)+(u?1:0),0,p),t(g.filter(b=>e.includes(b)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),d(null)}},o.createElement("div",{className:"todo-table-menu-label"},s("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,l)=>{let u=e.includes(p),g=p==="title",b=s(Ol(p));return o.createElement("div",{key:p,className:`todo-column-option${g?" is-locked":""}${n===p?" is-dragging":""}${i?.id===p?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let A=m.currentTarget.getBoundingClientRect();d({id:p,after:m.clientY>A.top+A.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),d(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":s("todo.table.reorderColumn",{p0:b}),title:s("todo.table.reorderColumn",{p0:b}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",p);let A=m.currentTarget.parentElement;A&&m.dataTransfer.setDragImage(A,12,A.offsetHeight/2),a(p)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let A=r[l+(m.key==="ArrowUp"?-1:1)];A&&c(p,A,m.key==="ArrowDown")}},o.createElement(Xo,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:g,onClick:()=>t(r.filter(m=>m===p?!u:e.includes(m)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,b)))}))}function _l(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":s("todo.table.toggleColumns"),title:s("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>o.createElement(Mm,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:s("todo.table.toggleColumns"),width:196})}},o.createElement(Ld,null))}function Cl({field:e,label:t,className:r,sort:n,onSort:a,width:i,resize:d,thProps:c}){let p=n.field===e,l=p?n.dir==="asc"?ja:Ka:$a;return o.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>a(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(l,null)),d)}var yi=["title","note","group","location","tags"],jn={title:180,note:120,group:104,location:104,tags:96},zl=900;function _m(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of yi){let a=t[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(zl,Math.max(jn[n],a))))}return r}function zm({id:e,label:t,min:r,onDrag:n,onCommit:a,onReset:i}){let d=o.useRef(null),c=p=>Math.round(Math.min(zl,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":s("todo.table.resizeColumn",{p0:t}),title:s("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),i(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let l=p.currentTarget.parentElement,u=l?l.getBoundingClientRect().width:jn[e];d.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!d.current)return;let l=c(d.current.startWidth+p.clientX-d.current.startX);d.current.width=l,n(e,l)},onPointerUp:p=>{d.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),a(e,d.current.width),d.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),d.current=null}})}function Fm({todo:e,onPatch:t}){let{DateField:r,TimeField:n}=f.ui.settings,[a,i]=o.useState(e.dueDate?.slice(0,10)??""),[d,c]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(r,{value:a,ariaLabel:s("todo.field.dueDate"),onChange:p=>{i(p),p||c(""),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(n,{value:d,disabled:!a,ariaLabel:s("todo.field.startTime"),onChange:p=>{c(p),t({startTime:p||void 0})}}))}function Gm({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":s("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Rm({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Gn,{value:r,autoFocus:!0,onChange:a=>{n(a),t({tags:a})}}))}function $m({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}var Il='input, button, a, textarea, [contenteditable="true"]';function wi(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}function jm({todo:e,groups:t,columns:r,c:n,selected:a,onPick:i}){let d=o.useRef(null);o.useEffect(()=>d.current?Dr(e.id,d.current):void 0,[e.id]);let[c,p]=o.useState("");o.useEffect(()=>{let y=!0;return p(""),On(e.title).then(x=>{y&&p(x)}).catch(()=>{y&&p("")}),()=>{y=!1}},[e.title]);let l=wi(e.note),{check:u}=fi(e,n),g=_e(e),b=n.pendingIds.has(e.id),m=y=>n.patchTodo(e.id,y),A=Ae(new Date),v=f.getState().dateFormat,N=e.dueDate?ut(e.dueDate,A,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),v):"",D=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<A,[O,w]=o.useState(!1),T=o.useRef(null);o.useEffect(()=>()=>{T.current&&clearTimeout(T.current)},[]);let[_,H]=o.useState(e.title),F=()=>{let y=_.trim();w(!1),y&&y!==e.title&&m({title:y})},[j,$]=o.useState(null),oe=(y,x)=>{$(y),x.catch(()=>{}).finally(()=>$(P=>P===y?null:P))},se=(y,x,P,I,ae=260)=>{oe(y,f.ui.openPopover(I,{anchor:x,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:P,width:ae}))},re=(y,x,P)=>j===y?o.createElement("span",{className:"todo-table-placeholder"},x,o.createElement("span",null,P)):null,ce=y=>`todo-table-${y}${j===y?" is-editing":""}`,k=y=>{let x=e.note,P=()=>{x!==e.note&&m({note:x})};$("note"),f.ui.openPopover(({close:I})=>o.createElement(Gm,{initial:e.note,onInput:ae=>{x=ae},onDone:()=>{P(),I()}}),{anchor:y,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:s("todo.edit.notes"),width:360,beforeDismiss:()=>(P(),!0)}).catch(()=>{}).finally(()=>$(I=>I==="note"?null:I))},L=y=>{switch(y){case"note":return o.createElement("td",{className:ce("note"),title:l||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":s("todo.table.editCell",{p0:s("todo.table.note")}),onClick:x=>k(x.currentTarget)},l?o.createElement("span",{className:"todo-table-note-text"},l):re("note",null,s("todo.table.note"))));case"group":return o.createElement("td",{className:ce("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":s("todo.table.editCell",{p0:s("todo.table.group")}),onClick:x=>oe("group",f.ui.openMenu([{label:s("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>m({group:void 0})},...Te(t).map(P=>({label:P,type:"radio",checked:e.group===P,color:De(P,t),onSelect:()=>m({group:P})}))],{anchor:x.currentTarget,align:"start"}))},e.group?o.createElement("span",{className:"todo-table-group-pill",title:e.group,style:{"--todo-group-color":xe(De(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},e.group)):re("group",null,s("todo.table.group"))));case"priority":return o.createElement("td",{className:ce("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:b,title:s("todo.table.priority"),onClick:x=>oe("priority",f.ui.openMenu(gr.map(P=>({label:ot(P),icon:o.createElement(Eo,{priority:P}),type:"radio",checked:e.priority===P,onSelect:()=>m({priority:P})})),{anchor:x.currentTarget}))},o.createElement(Eo,{priority:e.priority}),o.createElement("span",null,ot(e.priority))));case"due":return o.createElement("td",{className:ce("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${D?" is-overdue":""}`,disabled:b,"aria-label":s("todo.table.editCell",{p0:s("todo.table.due")}),title:e.dueDate?$e(e.dueDate,v):s("todo.field.dueDate"),onClick:x=>se("due",x.currentTarget,s("todo.field.dueDate"),()=>o.createElement(Fm,{todo:e,onPatch:P=>{m(P)}}),240)},o.createElement("span",null,N),e.startTime&&o.createElement("span",{className:"todo-table-time"},e.startTime)));case"flagged":return o.createElement("td",{className:ce("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${e.flagged?" on":""}`,"aria-pressed":!!e.flagged,disabled:b,"aria-label":s("todo.flag"),title:s(e.flagged?"todo.flagged":"todo.flag"),onClick:()=>m({flagged:!e.flagged})},o.createElement(ze,null)));case"location":return o.createElement("td",{className:ce("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:b,"aria-label":s("todo.table.editCell",{p0:s("todo.table.location")}),title:e.location?.name??s("todo.field.location"),onClick:x=>se("location",x.currentTarget,s("todo.field.location"),()=>o.createElement($m,{todo:e,onPatch:P=>{m(P)}}),300)},e.location?o.createElement(o.Fragment,null,o.createElement(tt,null),o.createElement("span",null,e.location.name)):re("location",o.createElement(tt,null),s("todo.field.location"))));case"tags":return o.createElement("td",{className:ce("tags"),title:e.tags?.map(x=>`#${x}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":s("todo.table.editCell",{p0:s("todo.table.tags")}),onClick:x=>se("tags",x.currentTarget,s("todo.edit.tags"),()=>o.createElement(Rm,{todo:e,onPatch:P=>{m(P)}}),280)},e.tags?.length?e.tags.map(x=>o.createElement("span",{key:x,className:"todo-table-tag"},"#",x)):re("tags",null,s("todo.table.tags"))))}};return o.createElement("tr",{ref:d,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}${j?" is-editing":""}`,"data-todo-id":e.id,"data-status":g,"aria-selected":a,tabIndex:0,onContextMenu:y=>_n(y,{todo:e,groupNames:Te(t),setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>lt(e,n.removeTodo),disabled:b}),onKeyDown:y=>{if(y.target===y.currentTarget)if(y.key==="ArrowDown"||y.key==="ArrowUp"){y.preventDefault();let x=y.key==="ArrowDown"?y.currentTarget.nextElementSibling:y.currentTarget.previousElementSibling;for(;x&&!x.classList.contains("todo-table-row");)x=y.key==="ArrowDown"?x.nextElementSibling:x.previousElementSibling;x?.focus()}else y.key==="Enter"?(y.preventDefault(),n.openDetail(e.id)):y.key===" "?(y.preventDefault(),i(!1)):y.key==="Escape"&&y.currentTarget.blur()},onClick:y=>{y.target.closest(Il)||(f.ui.hasModKey(y)||y.shiftKey)&&i(y.shiftKey)},onDoubleClick:y=>{let x=!!y.target.closest(".todo-table-title-btn");x&&T.current&&(clearTimeout(T.current),T.current=null),!(!x&&y.target.closest(Il)||f.ui.hasModKey(y)||y.shiftKey)&&n.openDetail(e.id)}},o.createElement("td",{className:"todo-table-select"},u),r.map(y=>o.createElement(o.Fragment,{key:y},y==="title"?o.createElement("td",{className:"todo-table-title"},O?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:_,autoFocus:!0,"aria-label":s("todo.table.title"),onChange:x=>H(x.target.value),onBlur:F,onKeyDown:x=>{x.nativeEvent.isComposing||(x.key==="Enter"?(x.preventDefault(),F()):x.key==="Escape"&&(x.preventDefault(),H(e.title),w(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:b,"aria-label":s("todo.table.editTitle",{p0:e.title}),onClick:x=>{if(f.ui.hasModKey(x)||x.shiftKey){i(x.shiftKey);return}x.detail>1||(T.current&&clearTimeout(T.current),T.current=setTimeout(()=>{T.current=null,H(e.title),w(!0)},220))}},c?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:c}}):o.createElement("span",{className:"todo-table-title-text"},e.title))):L(y))),o.createElement("td",{className:"todo-table-actions"},e.flagged&&!r.includes("flagged")&&o.createElement("span",{className:"todo-table-flag",title:s("todo.flagged")},o.createElement(ze,null)),o.createElement(zn,{todo:e,groupNames:Te(t),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>lt(e,n.removeTodo),disabled:b})))}function Km(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Fl({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:d,sectionOf:c,composeSignal:p=0,newTaskPatch:l}){let[u,g]=Pl(),b=u.filter(z=>z!=="title"),[m,A]=o.useState(null),[v,N]=o.useState(null),D=z=>({className:`${m===z?" is-dragging":""}${v?.id===z?v.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:B=>{if(B.target.closest(".todo-col-resize")){B.preventDefault();return}B.dataTransfer.effectAllowed="move",B.dataTransfer.setData("text/plain",z);let ee=B.currentTarget.ownerDocument,ue=ee.createElement("div");ue.className="todo-col-drag-chip",ue.textContent=s(Ol(z)),ee.body.appendChild(ue),B.dataTransfer.setDragImage?.(ue,Math.round(ue.offsetWidth/2),Math.round(ue.offsetHeight/2)),window.setTimeout(()=>ue.remove(),0),A(z)},onDragOver:B=>{if(!m||m===z)return;B.preventDefault(),B.dataTransfer.dropEffect="move";let ee=B.currentTarget.getBoundingClientRect();N({id:z,after:B.clientX>ee.left+ee.width/2})},onDrop:B=>{if(B.preventDefault(),m&&v&&m!==v.id){let ee=u.filter(ue=>ue!==m);ee.splice(ee.indexOf(v.id)+(v.after?1:0),0,m),g(ee)}A(null),N(null)},onDragEnd:()=>{A(null),N(null)}}}),O=o.useRef(null),w=Tm(O),[T,_]=$n("pageColumnWidths",_m),[H,F]=o.useState({}),j=Am(O,e),$=Object.fromEntries(Object.entries({tags:j,...T,...H}).map(([z,B])=>[z,Math.max(B,w.mins[z])])),oe=z=>z==="due"?w.due:z==="priority"?w.priority:z==="flagged"?w.flagged:$[z]??Ao[z],[se,re]=$n("pageRowsPerPage",Nm),[ce,k]=o.useState(!1),[L,y]=o.useState(""),x=o.useRef(null),P=o.useRef(null);o.useEffect(()=>{p&&(k(!0),K(0),P.current?.scrollTo?.({top:0}),window.setTimeout(()=>x.current?.focus(),0))},[p]);let I=async z=>{let B=Ae(new Date);for(let ee of z){let ue=Zr(ee,B);ue.title&&await r.create(ue.title,void 0,{patch:{...l?.(),priority:ue.priority,...ue.dueDate?{dueDate:ue.dueDate}:{}}})}y(""),x.current?.focus()},ae=()=>{y(""),k(!1)},[de,K]=o.useState(0),[J,Q]=o.useState(i);J!==i&&(Q(i),K(0));let[S,M]=o.useState(()=>new Set),G=o.useRef(null),h=Math.max(1,Math.ceil(e.length/se)),C=Math.min(de,h-1),V=e.slice(C*se,(C+1)*se),le=o.useMemo(()=>e.filter(z=>S.has(z.id)),[e,S]),U=o.useMemo(()=>e.reduce((z,B)=>z+(B.completed?1:0),0),[e]),R=Me(),ie=o.useSyncExternalStore(R.subscribe,R.get,R.get),ye=o.useCallback(z=>{let B=e.findIndex(ee=>ee.id===z);B>=0&&K(Math.floor(B/se))},[e,se]);o.useLayoutEffect(()=>{ie?.todoId&&ye(ie.todoId)},[ie,ye]),o.useLayoutEffect(()=>{r.editingId&&ye(r.editingId)},[r.editingId]);let Fe=(z,B)=>{M(ee=>{let ue=new Set(ee);for(let We of z)B?ue.add(We):ue.delete(We);return ue})},st=(z,B)=>{let ee=V.findIndex(We=>We.id===z),ue=B?V.findIndex(We=>We.id===G.current):-1;ue>=0?Fe(V.slice(Math.min(ue,ee),Math.max(ue,ee)+1).map(We=>We.id),!0):Fe([z],!S.has(z)),G.current=z},Co=()=>{for(let z of le)r.patchTodo(z.id,Ne("completed"));M(new Set)},hr=async()=>{let z=le.map(ee=>ee.id);await f.ui.confirm({title:s("todo.table.deleteTitle",{count:z.length}),message:s("todo.table.deleteMessage",{count:z.length}),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(z.map(ee=>r.removeTodo(ee))),M(new Set))},oo=(z,B)=>o.createElement(zm,{id:z,label:B,min:w.mins[z],onDrag:(ee,ue)=>F(We=>({...We,[ee]:ue})),onCommit:(ee,ue)=>{F({}),_({...T,[ee]:ue})},onReset:ee=>{F({});let ue={...T};delete ue[ee],_(ue)}}),Lt=z=>{let B=s(bi[z]),ee=yi.includes(z);return o.createElement(Cl,{field:z==="note"?"notes":z,label:B,className:`todo-table-${z}${D(z).className}`,thProps:D(z).props,sort:n,onSort:a,width:ee?$[z]:void 0,resize:ee?oo(z,B):void 0})},Wn=3+b.length,ro=o.useMemo(()=>{if(!c)return null;let z=new Map;for(let B of e){let ee=c(B);z.set(ee,(z.get(ee)??0)+1)}return z},[e,c]),no=[],br=null;for(let z of V){let B=c?.(z)??null;B&&B!==br&&no.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${B}`,key:`section:${B}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},s(ed[B])),o.createElement("span",{className:"todo-table-section-count"},ro?.get(B)??0))),u.map(ee=>o.createElement("td",{key:ee,className:`todo-table-${ee}`})),o.createElement("td",{className:"todo-table-actions"}))),br=B,no.push(o.createElement(jm,{key:z.id,todo:z,groups:t,columns:u,c:r,selected:S.has(z.id),onPick:ee=>st(z.id,ee)}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:P},o.createElement("table",{ref:O,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:Dm+($.title??Em)+b.reduce((z,B)=>z+oe(B),0),"--todo-due-width":`${w.due}px`,"--todo-priority-width":`${w.priority}px`,"--todo-flagged-width":`${w.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(Pm,null)),u.map(z=>o.createElement(o.Fragment,{key:z},z==="title"?o.createElement(Cl,{field:"name",label:s("todo.table.title"),className:`todo-table-title${D("title").className}`,thProps:D("title").props,sort:n,onSort:a,width:$.title,resize:oo("title",s("todo.table.title"))}):Lt(z))),o.createElement("th",{className:"todo-table-actions",style:$.title?{width:"auto",minWidth:48}:void 0}))),o.createElement("tbody",null,ce&&o.createElement("tr",{className:"todo-table-new-row"},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"})),u.map(z=>z==="title"?o.createElement("td",{key:z,className:"todo-table-title"},o.createElement("input",{ref:x,className:"todo-table-new-input",value:L,disabled:r.creating,placeholder:s("todo.table.newRow"),"aria-label":s("auto.184c39d1837f"),onChange:B=>y(B.target.value),onKeyDown:B=>{B.nativeEvent.isComposing||(B.key==="Enter"?(B.preventDefault(),L.trim()?I([L]):ae()):B.key==="Escape"&&(B.preventDefault(),ae()))},onPaste:B=>{let ee=B.clipboardData.getData("text/plain");/\r?\n/.test(ee.trim())&&(B.preventDefault(),I(Km(`${L}${ee}`)))},onBlur:()=>{L.trim()||k(!1)}})):o.createElement("td",{key:z,className:`todo-table-${z}`})),o.createElement("td",{className:"todo-table-actions"})),no)),!V.length&&!ce&&o.createElement("div",{className:"todo-table-empty-state"},d)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,le.length?s("todo.table.selectedCount",{count:le.length}):s(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!le.length&&o.createElement("span",{className:"todo-table-done-count"},s("todo.table.completedCount",{count:U})),le.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:Co},s("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{hr()}},s("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},s("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":s("todo.table.rowsPerPage"),onClick:z=>{f.ui.openMenu(hi.map(B=>({label:String(B),type:"radio",checked:B===se,onSelect:()=>{re(B),K(0)}})),{anchor:z.currentTarget,align:"start"})}},o.createElement("span",null,se),o.createElement($a,null)),h>1&&o.createElement("span",{className:"todo-table-page"},s("todo.table.page",{page:C+1,pages:h})),h>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:C===0,"aria-label":s("todo.table.firstPage"),title:s("todo.table.firstPage"),onClick:()=>K(0)},o.createElement(Id,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:C===0,"aria-label":s("todo.table.previousPage"),title:s("todo.table.previousPage"),onClick:()=>K(C-1)},o.createElement(Dd,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:C>=h-1,"aria-label":s("todo.table.nextPage"),title:s("todo.table.nextPage"),onClick:()=>K(C+1)},o.createElement(Cd,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:C>=h-1,"aria-label":s("todo.table.lastPage"),title:s("todo.table.lastPage"),onClick:()=>K(h-1)},o.createElement(Nd,null))))))}function vi(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),d=o.useRef(null),c=o.useRef(0),p=o.useRef(r);p.current=r;let l=o.useCallback(async()=>{if(i.current)return;let u=a.current;if(u!==null){a.current=null,i.current=!0;try{let g=await n.current(u);!g&&a.current===null&&(a.current=u),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=u),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?d.current=window.setTimeout(()=>{l()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{d.current!=null&&window.clearTimeout(d.current),l()},[l]),o.useCallback(u=>{a.current=u,c.current=0,d.current!=null&&window.clearTimeout(d.current),d.current=window.setTimeout(()=>{d.current=null,l()},t)},[l,t])}function Um({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[d,c]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||c(e)},[e]);let l=()=>{d!==e&&t(d)};return o.createElement("input",{className:i,type:a,value:d,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>c(u.target.value),onBlur:()=>{p.current=!1,l()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(c(e),u.currentTarget.blur())}})}function Vm(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Bm=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:d}=f.ui.settings,[c,p]=o.useState(we);o.useEffect(()=>It(p),[]);let l=c.find(h=>h.id===e),u=zs(e),g=Be(),[b,m]=o.useState(!1),[A,v]=o.useState(!1),[N,D]=o.useState(!1),[O,w]=o.useState(!1),T=o.useRef(null),[_,H]=o.useState(""),F=Vm(e),j=o.useSyncExternalStore(o.useCallback(h=>(F.listeners.add(h),()=>{F.listeners.delete(h)}),[F]),()=>F.value,()=>F.value),$=o.useCallback(h=>{F.value={...F.value,...h};for(let C of F.listeners)C()},[F]),oe=j.title,se=h=>$({title:h}),re=()=>$({error:s("todo.error.saveDraft")});o.useEffect(()=>{F.revision||F.loadingRevision||(F.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(h=>{h&&!F.revision&&(F.revision={expectedRevision:h.revision,realmGeneration:h.realmGeneration})}).catch(()=>{$({error:s("todo.error.saveDraft")})}).finally(()=>{F.loadingRevision=void 0}))},[F,e,$]);let ce=async h=>(F.revision||await F.loadingRevision,F.revision?t.patchTodo(e,h,F.revision):!1),k=vi(async h=>{let C=h.trim()?await ce({title:h}):!0;return C&&F.value.title===h&&$({title:null,error:""}),C},500,re),L=vi(async h=>{let C=await ce({note:h});return C&&F.value.note===h&&$({note:null,error:""}),C},500,re),y=vi(async h=>{let C=JSON.parse(h),V=await ce({tags:C});return V&&JSON.stringify(F.value.tags)===h&&$({tags:null,error:""}),V},0,re);if(o.useEffect(()=>{!l&&!t.loading&&r()},[l,t.loading,r]),!l)return null;let x=h=>{ce(h).then(C=>{C||re()})},P=h=>{$({tags:h}),y(JSON.stringify(h))},I=h=>x({attachments:h.length?h:void 0}),ae=h=>x({urls:h.length?h:void 0}),de=Te(g);T.current||(T.current=structuredClone(l));let K=()=>{let h=T.current;h&&(k(h.title),L(h.note),x({tags:h.tags,status:h.status,completed:h.completed,priority:h.priority,dueDate:h.dueDate,startTime:h.startTime,endTime:h.endTime,group:h.group,location:h.location,flagged:h.flagged,attachments:h.attachments,urls:h.urls,filePath:h.filePath})),$({title:null,note:null,tags:null,error:""}),r()},J=_e(l),Q=Ym(),S=l.dueDate?`${ut(l.dueDate.slice(0,10),Q,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${l.startTime?` \xB7 ${l.startTime}${l.endTime?`\u2013${l.endTime}`:""}`:""}`:"",M=(h,C,V,le=300)=>{f.ui.openPopover(V,{anchor:h,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:C,width:le})},G=(h,C,V,le,U,R="")=>o.createElement("button",{key:h,type:"button",className:`todo-sheet-chip${V?"":" is-empty"}${R?` ${R}`:""}`,"aria-label":V?`${le}: ${V}`:le,title:h==="place"&&l.location?l.location.name:void 0,onClick:ie=>U(ie.currentTarget)},C,o.createElement("span",null,V||le));return o.createElement(f.ui.Modal,{title:s("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),lt(l,t.removeTodo).then(h=>{h||t.openDetail(l.id)})}},o.createElement(ft,null),s("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:K},s("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},s("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},j.error&&o.createElement("p",{role:"alert"},j.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":J,title:Je(J),"aria-label":`${s("auto.bae7d5be7082")}: ${Je(J)}`,onClick:h=>fr(h.currentTarget,l,C=>x(C))},o.createElement(Le,{status:J==="open"?null:J,dotCls:ke(J).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:oe??l.title,"aria-label":s("auto.c5e8306a511f"),onChange:h=>{se(h.target.value),k(h.target.value)},onBlur:()=>{oe===l.title&&se(null)},onKeyDown:h=>{h.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${l.flagged?" on":""}`,type:"button",onClick:()=>x({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:s("todo.flag"),"aria-label":s("todo.flag")},o.createElement(ze,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:j.note??l.note,"aria-label":s("todo.edit.notes"),placeholder:s("todo.sheet.notesPlaceholder"),rows:3,onChange:h=>{let C=h.target.value;$({note:C}),L(C)}}),o.createElement("div",{className:"todo-sheet-chips"},G("status",o.createElement(Le,{status:J==="open"?null:J,dotCls:ke(J).cls}),J==="open"?"":Je(J),s("auto.bae7d5be7082"),h=>fr(h,l,C=>x(C))),G("due",o.createElement(at,null),S,s("todo.sheet.date"),h=>M(h,s("todo.edit.schedule"),()=>o.createElement(Hm,{todo:l,onPatch:x}),280),l.dueDate&&l.dueDate.slice(0,10)<Q&&!l.completed?"is-overdue":""),G("group",o.createElement("span",{className:"todo-sheet-dot",style:l.group?{background:xe(De(l.group,g))}:void 0}),l.group??"",s("todo.edit.group"),h=>{f.ui.openMenu([{label:s("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>x({group:void 0})},...de.map(C=>({label:C,type:"radio",checked:l.group===C,color:De(C,g),onSelect:()=>x({group:C})}))],{anchor:h,align:"start"})}),G("place",o.createElement(tt,null),l.location?.name.split(",")[0].trim()??"",s("todo.sheet.place"),h=>M(h,s("todo.location"),()=>o.createElement(Wm,{todo:l,onPatch:x}),320)),G("priority",o.createElement(Eo,{priority:l.priority}),l.priority==="normal"?"":ot(l.priority),s("auto.886cbff9d9df"),h=>{f.ui.openMenu(He.map(C=>({label:ot(C.id),icon:o.createElement(Eo,{priority:C.id}),type:"radio",checked:l.priority===C.id,onSelect:()=>x({priority:C.id})})),{anchor:h,align:"start"})})),o.createElement(Gn,{value:j.tags??l.tags??[],onChange:P,bare:!0}),((l.attachments??[]).length>0||b)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(l.attachments??[]).map(h=>o.createElement(pl,{key:h,relPath:h,onRemove:()=>I((l.attachments??[]).filter(C=>C!==h))})),b&&o.createElement(ci,{placeholder:s("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:h=>{(l.attachments??[]).includes(h)||I([...l.attachments??[],h]),m(!1)}})),((l.urls??[]).length>0||A||l.filePath||N)&&o.createElement("div",{className:"todo-sheet-section"},l.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:l.filePath,onClick:h=>f.workspace.openFile(l.filePath,void 0,{newTab:f.ui.hasModKey(h)})},o.createElement(gt,null),o.createElement("span",null,l.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},s("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:s("todo.sheet.unlinkFile"),"aria-label":s("todo.sheet.unlinkFile"),onClick:()=>x({filePath:void 0})},o.createElement(be,null))),N&&!l.filePath&&o.createElement(ci,{placeholder:s("todo.file.searchLinked"),onCancel:()=>D(!1),onPick:h=>{x({filePath:h}),D(!1)}}),(l.urls??[]).map(h=>o.createElement("div",{className:"todo-detail-url-card",key:h},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:h,onClick:C=>{let V=go(h);V?f.workspace.openFile(V,void 0,{newTab:f.ui.hasModKey(C)}):f.files.openExternalUrl(h)}},o.createElement(Yt,null),o.createElement("span",null,qm(h))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:s("todo.removeUrl"),"aria-label":s("todo.removeUrlOf",{p0:h}),onClick:()=>ae((l.urls??[]).filter(C=>C!==h))},o.createElement(be,null)))),A&&o.createElement(Um,{className:"todo-detail-link-input todo-detail-url",value:_,onCommit:h=>{let C=$r(h);C&&!(l.urls??[]).includes(C)&&ae([...l.urls??[],C]),H(""),v(!1)},placeholder:s("todo.urlPlaceholder"),ariaLabel:s("todo.url")})),O&&u.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...u].reverse().map((h,C)=>o.createElement("li",{key:`${h.changedAt}:${C}`},o.createElement("span",null,Je(h.from)," \u2192 ",Je(h.to)),o.createElement("time",{dateTime:h.changedAt},new Date(h.changedAt).toLocaleString(f.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(Ct,null)," ",s("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>v(!0)},o.createElement(Yt,null)," ",s("todo.sheet.link")),!l.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>D(!0)},o.createElement(gt,null)," ",s("todo.linkedFile")),u.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":O,onClick:()=>w(h=>!h)},s("todo.activity")," (",u.length,")"))))};function Hm({todo:e,onPatch:t}){let{DateField:r,TimeField:n}=f.ui.settings,[a,i]=o.useState(e.dueDate?.slice(0,10)??""),[d,c]=o.useState(e.startTime??""),[p,l]=o.useState(e.endTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(r,{value:a,placeholder:s("todo.detail.noDate"),ariaLabel:s("todo.field.dueDate"),onChange:u=>{i(u),u||(c(""),l("")),t(u?{dueDate:u}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(n,{value:d,disabled:!a,ariaLabel:s("auto.88d8206d586a"),onChange:u=>{c(u),t({startTime:u||void 0,...u?{}:{endTime:void 0}}),u||l("")}}),o.createElement(n,{value:p,disabled:!d,ariaLabel:s("auto.cd7800da7f4f"),onChange:u=>{l(u),t({endTime:u||void 0})}})))}function Wm({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function qm(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}function Ym(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var Do=({c:e})=>e.editingId?o.createElement(Bm,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function Xm(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Zm(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,d=e.length;for(;i<d;){let p=i+d>>>1;e[p].start+e[p].height<n?i=p+1:d=p}let c=i;for(d=e.length;i<d;){let p=i+d>>>1;e[p].start<=a?i=p+1:d=p}return[c,i]}function Un(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,d=t.enabled??r.length>80,c=e.useRef(null),p=e.useRef(new Map),[l,u]=e.useReducer(k=>k+1,0),[g,b]=e.useState({top:0,height:600}),[m,A]=e.useState(null),[v,N]=e.useState(null),D=e.useRef(null),O=e.useRef(null),w=e.useRef(null),T=e.useMemo(()=>{let k=0;return r.map((L,y)=>{let x=p.current.get(L)??(typeof n=="number"?n:n(L,y)),P={id:L,height:x,start:k};return k+=x,P})},[r,n,l]),_=T.length?T[T.length-1].start+T[T.length-1].height:0,H=e.useRef({rows:T,viewport:g});H.current={rows:T,viewport:g};let F=e.useCallback(()=>{let k=c.current,L=D.current;if(!k||!L)return;let y=k.getBoundingClientRect(),x=L.getBoundingClientRect(),P=L.clientHeight||x.height||600,I=L===k?L.scrollTop:x.top-y.top;b(ae=>ae.top===I&&ae.height===P?ae:{top:I,height:P})},[]),j=e.useCallback(()=>{O.current===null&&(O.current=(w.current??window).requestAnimationFrame(()=>{O.current=null,F()}))},[F]);e.useLayoutEffect(()=>{let k=c.current;if(!k||!d)return;let L=Xm(k);D.current=L;let y=k.ownerDocument.defaultView??window;w.current=y;let x=k.style.overflowAnchor;k.style.overflowAnchor="none";let P=!0,I=()=>{if(!P)return;let J=k.ownerDocument.activeElement,Q=J instanceof HTMLElement?J:null;for(;Q&&Q.parentElement!==k;)Q=Q.parentElement;A(Q?.dataset.visibleKey??null)},ae=()=>{queueMicrotask(I)};L.addEventListener("scroll",j,{passive:!0}),y.addEventListener("resize",j),k.addEventListener("focusin",I),k.addEventListener("focusout",ae);let de=k.clientWidth,K=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{k.clientWidth!==de&&(de=k.clientWidth,p.current.clear(),u()),j()});return K?.observe(L),L!==k&&K?.observe(k),F(),()=>{P=!1,k.style.overflowAnchor==="none"&&(k.style.overflowAnchor=x),L.removeEventListener("scroll",j),y.removeEventListener("resize",j),k.removeEventListener("focusin",I),k.removeEventListener("focusout",ae),K?.disconnect(),O.current!==null&&y.cancelAnimationFrame(O.current),O.current=null,D.current=null,w.current=null}},[d,F,j]),e.useLayoutEffect(()=>{let k=new Set(r);for(let L of p.current.keys())k.has(L)||p.current.delete(L);F()},[r,F]),e.useLayoutEffect(()=>{p.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let k=c.current;if(!k||!d)return;let L=P=>{let I=0,ae=!1,{rows:de,viewport:K}=H.current,J=new Map(de.map(Q=>[Q.id,Q]));for(let Q of P){let S=Q.dataset.visibleKey,M=S?J.get(S):void 0,G=Q.getBoundingClientRect().height;!S||!M||G<=0||Math.abs(G-M.height)<.5||(p.current.set(S,G),M.start+M.height<=K.top&&(I+=G-M.height),ae=!0)}if(ae){let Q=D.current,S=k.closest('[data-visible-sections="true"]'),M=k;for(;M&&M.parentElement!==S;)M=M.parentElement;let G=S&&S!==k&&M&&Q&&M.getBoundingClientRect().bottom<=Q.getBoundingClientRect().top;I&&Q&&!G&&(Q.scrollTop+=I),u(),j()}},y=Array.from(k.children).filter(P=>P.hasAttribute("data-visible-key")),x=typeof ResizeObserver>"u"?void 0:new ResizeObserver(P=>L(P.map(I=>I.target)));return y.forEach(P=>x?.observe(P)),L(y),()=>x?.disconnect()}),e.useLayoutEffect(()=>{if(!v)return;let k=Array.from(c.current?.children??[]).find(L=>L.dataset.visibleKey===v.id);k&&(k.scrollIntoView?.({block:"nearest"}),v.selector&&(k.matches(v.selector)?k:k.querySelector(v.selector))?.focus(),F(),N(null))},[v,T,F]);let $=e.useCallback((k,L)=>{N({id:k,selector:L})},[]),[oe,se]=d?Zm(T,g):[0,T.length],re=new Set;for(let k=oe;k<se;k++)re.add(k);let ce=new Set([...a,m,v?.id].filter(Boolean));return ce.size&&T.forEach((k,L)=>{ce.has(k.id)&&re.add(L)}),{ref:c,show:$,render(k){let L=[],y=0;for(let x of[...re].sort((P,I)=>P-I)){let P=T[x];P.start>y&&L.push(e.createElement("div",{key:`space:${P.id}`,"aria-hidden":!0,style:{height:P.start-y,flex:"0 0 auto",pointerEvents:"none"}})),L.push(e.createElement(e.Fragment,{key:P.id},k(x))),y=P.start+P.height}return _>y&&L.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:_-y,flex:"0 0 auto",pointerEvents:"none"}})),L}}}var Gl=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=Me(),d=o.useSyncExternalStore(i.subscribe,i.get,i.get),c=o.useMemo(()=>e.map(g=>g.id),[e]),p=Un(o,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,d?.todoId]}),l=p.show;o.useLayoutEffect(()=>{d&&c.includes(d.todoId)&&l(d.todoId)},[d,c,l]);let u=o.useCallback((g,b)=>{let m=e[Math.max(0,Math.min(e.length-1,g+b))];m&&l(m.id,".todo-row")},[e,l]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(g=>o.createElement(El,{key:e[g].id,todo:e[g],groups:t,compact:r,c:a,hideDate:n,onMoveFocus:b=>u(g,b)})))};function Rl({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:d}){let c=Me(),p=o.useSyncExternalStore(c.subscribe,c.get,c.get),l=o.useMemo(()=>e.map(D=>D.key),[e]),[u,g]=o.useState(null),b=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),m=e.filter(D=>D.todos.some(O=>b.has(O.id))).map(D=>D.key),A=o.useCallback((D,O)=>a?.(e[O])??32+e[O].todos.length*(r?52:84),[e,r,a]),v=Un(o,{ids:l,estimate:A,pinned:m,layoutKey:i??r}),N=v.show;return o.useLayoutEffect(()=>{if(!p)return;let D=e.find(O=>O.todos.some(w=>w.id===p.todoId));D&&N(D.key)},[p,e,N]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:v.ref,onDragStartCapture:D=>g(D.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},v.render(D=>o.cloneElement(d(e[D]),{"data-visible-key":l[D]})))}function Jm(e,t,r,n,a){if(e==="none")return s("todo.breakdown.noDate");if(e==="monthly")return Ht(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=Ht(t),d=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return s("todo.breakdown.weekLabel",{count:Js(i),p0:`${Yr(t,a,n)} \u2013 ${Yr(nt(d),a,n)}`})}return t===Et(r,-1)?s("todo.due.yesterday"):t===r?s("todo.due.today"):t===Et(r,1)?s("todo.due.tomorrow"):Yr(t,a,n)}function Vn({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:d=!1}){let c=nt(),{shortDateFormat:p}=it("shortDateFormat"),l=f.ui.language(),u=o.useMemo(()=>{if(!d)return Fa(e,a,Ho(i));let g=new Map(e.map(m=>[m,_a(m)])),b=[...e].sort((m,A)=>g.get(A).localeCompare(g.get(m)));return Fa(b,a,Ho(i),{dateOf:m=>za(g.get(m))})},[a,d,e,i]);return o.createElement(Rl,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},Jm(g.kind,g.key,c,p,l)),o.createElement(Gl,{todos:g.todos,groups:t,compact:r,c:n})))}function Bn(e){return e==="flagged"?o.createElement(ze,null):e==="priority"?o.createElement(qt,null):e==="due"?o.createElement(Qo,null):e==="updated"?o.createElement(bd,null):e==="created"?o.createElement(yd,null):o.createElement(wd,null)}function Qm(){return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-filter-section-label"},s("todo.filters.show")),o.createElement(gi,null))}function xi({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[d,c]=o.useState(r),p=Object.entries(Bo);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,s("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${d==="desc"?" active":""}`,type:"button","aria-label":s("auto.01e635f27ec2"),title:s("auto.01e635f27ec2"),"aria-pressed":d==="desc",onClick:()=>{c("desc"),n("desc")}},o.createElement(Jo,null)),o.createElement("button",{className:`todo-sort-direction${d==="asc"?" active":""}`,type:"button","aria-label":s("auto.4fee0a06b6e4"),title:s("auto.4fee0a06b6e4"),"aria-pressed":d==="asc",onClick:()=>{c("asc"),n("asc")}},o.createElement(Zo,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([l,u])=>o.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),t(l)}},Bn(l),o.createElement("span",null,s(u))))))}function cr({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:d,onOpenSettings:c,embedded:p=!1}){let[l,u]=o.useState(a),[g,b]=o.useState(i),m=p?a:l,A=p?i:g,v=m.length===r.length&&(!n||A),N=[...r.map(T=>m.some(_=>_.toLowerCase()===T.toLowerCase())),...n?[A]:[]],D=(T,_)=>T?` active${N[_-1]?"":" selection-run-start"}${N[_+1]?"":" selection-run-end"}`:"",O=(T,_)=>{u(T),b(_),d(T,_)},w=T=>{let _=e.filter(j=>T===null?!j.group:rt([T]).has(Y(j.group??""))),H=T??s("todo.chip.noGroup"),F=T===null?A:m.some(j=>Y(j)===Y(T));return o.createElement("div",{className:"todo-group-filter-item",key:T??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},T&&o.createElement("span",{className:"props-info-dot",style:{background:xe(De(T,t))}}),H),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,_.length),o.createElement(f.ui.settings.Toggle,{label:H,checked:F,onChange:()=>O(T===null?m:F?m.filter(j=>Y(j)!==Y(T)):[...m,T],T===null?!A:A)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:c},s("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>O(v?[]:r,v?!1:n)},s(v?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(T=>w(T)),n&&w(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},s("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>O(v?[]:r,v?!1:n)},s(v?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((T,_)=>{let H=N[_];return o.createElement("button",{key:T,type:"button",className:`todo-group-filter-row${D(H,_)}`,"aria-pressed":H,onClick:()=>O(H?l.filter(F=>F.toLowerCase()!==T.toLowerCase()):[...l,T],g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},H?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:xe(De(T,t))}}),o.createElement("span",{className:"todo-tree-label"},T),o.createElement("span",{className:"todo-tree-count"},gn(e,T)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${D(g,r.length)}`,"aria-pressed":g,onClick:()=>O(l,!g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},s("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},gn(e,null)))))}var $l={scheduled:()=>o.createElement(Qo,null),today:()=>o.createElement(er,null),week:()=>o.createElement(pn,null),flagged:()=>o.createElement(ze,null),all:()=>o.createElement(cn,null),completed:()=>o.createElement(et,null)},ef=()=>{let{activePluginTab:e,dateFormat:t}=it("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Pn(),a=Be(),i=lr(),[d,c]=o.useState(""),[p,l]=o.useState(""),[u,g]=o.useState(""),[b,m]=o.useState({}),[A,v]=o.useState(!1),[N,D]=o.useState(!1),[O,w]=o.useState(!1),[T,_]=o.useState(!1),{DateField:H,TimeField:F}=f.ui.settings,[j,$]=o.useState(!1),[oe,se]=Dn(),[re]=yt(),[ce,k]=vn("todo"),{sortField:L,sortDir:y,compact:x}=ce,[P,I]=bt(),ae=dt(),de=xn(),K=En(),J=o.useMemo(()=>zd(K),[K]),Q=e?.pluginId===f.pluginId,S=o.useRef(null),M=o.useRef(null),G=o.useRef(null),h=To(L,y,"left_sidebar");lo(h.openDetail);let C=Ae(new Date),V=o.useMemo(()=>Fd(h.todos,C),[h.todos,C]),le=o.useMemo(()=>Te(a),[a]),U=o.useMemo(()=>h.todos.some(E=>!E.group),[h.todos]),R=i.kind==="groups"?i.names:le,ie=i.kind==="groups"?i.includeUngrouped===!0:U,ye=R.length===le.length&&(!U||ie),Fe=o.useMemo(()=>{let E=h.ordered.filter(W=>fn(W,i,re,C));if(P!=="all"&&(E=E.filter(W=>mo(W,P))),oe.trim()){let W=Ut(oe);E=E.filter(pe=>W(pe.tags??[],pe.title,pe.note,pe.group??""))}return n?E=E.filter(W=>{let pe=W.dueDate?.slice(0,10);return!!pe&&pe>=n.start&&pe<=n.end}):r&&(E=E.filter(W=>W.dueDate?.slice(0,10)===r)),E},[h.ordered,i,re,P,oe,r,n,C]),st=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Co=async()=>{if(h.creating)return;let E=Zr(d,C),W=E.title;if(!W){oo();return}let pe=st;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let qe=await f.ui.openMenu([...i.names.map((Io,qn)=>({id:`group:${qn}`,label:Io})),...i.includeUngrouped?[{id:"ungrouped",label:s("todo.chip.noGroup")}]:[]],{anchor:S.current??G.current,align:"start"});if(qe===null)return;pe=qe.startsWith("group:")?i.names[Number(qe.slice(6))]:void 0}_(!1);let Ue={note:p.trim(),tags:[...new Set([...b.tags??[],...u.split(/[\s,]+/).map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])],priority:E.priority,...pe?{group:pe}:{}};i.kind==="smart"&&i.id==="flagged"&&(Ue.flagged=!0),Object.assign(Ue,{...b,tags:Ue.tags}),E.dueDate&&(Ue.dueDate=E.dueDate),await h.create(W,void 0,{patch:Ue})?(_(!1),c(""),l(""),g(""),m({}),v(!1),D(!1),w(!1),S.current?.focus()):_(!0)},hr=()=>{$(!0),window.setTimeout(()=>S.current?.focus(),0)},oo=()=>{c(""),$(!1),l(""),g(""),m({}),v(!1),D(!1),w(!1),_(!1)},Lt=Me(),Wn=o.useSyncExternalStore(Lt.subscribe,Lt.get,Lt.get);o.useEffect(()=>{Wn?.mode==="create"&&($(!0),Lt.clear())},[Wn,Lt]),o.useEffect(()=>{j&&!h.creating&&S.current?.focus()},[j,Q,h.creating]),o.useLayoutEffect(()=>{M.current&&(M.current.style.height="auto",M.current.style.height=`${M.current.scrollHeight}px`)},[p,j]);let ro=b.dueDate??"",no=j&&o.createElement("form",{className:"todo-compose",onSubmit:E=>{E.preventDefault(),Co()},onKeyDown:E=>{E.key==="Escape"&&!E.defaultPrevented&&!h.creating&&(E.preventDefault(),oo())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:S,className:"todo-compose-title",value:d,onChange:E=>c(E.target.value),placeholder:st?s("todo.newTodoIn",{p0:st}):s("auto.c274dabfd0fe"),"aria-label":s("auto.184c39d1837f"),disabled:h.creating}),o.createElement("textarea",{ref:M,className:"todo-compose-note",rows:1,value:p,onChange:E=>l(E.target.value),placeholder:s("todo.edit.notes"),"aria-label":s("todo.edit.notes"),disabled:h.creating}),o.createElement("div",{className:"todo-compose-tags"},(b.tags??[]).map(E=>o.createElement("span",{className:"todo-compose-token",key:E},o.createElement("span",null,"#",E),o.createElement("button",{type:"button","aria-label":s("todo.compose.removeTag",{tag:E}),disabled:h.creating,onClick:()=>m(W=>({...W,tags:W.tags?.filter(pe=>pe!==E)}))},o.createElement(be,null)))),o.createElement("input",{value:u,onChange:E=>{let W=E.target.value;if(!("isComposing"in E.nativeEvent&&E.nativeEvent.isComposing)&&/[\s,]/.test(W)){let pe=W.split(/[\s,]+/),Ue=pe.pop()??"";m(Pt=>({...Pt,tags:[...new Set([...Pt.tags??[],...pe.map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])]})),g(Ue)}else g(W)},onKeyDown:E=>{E.nativeEvent.isComposing||(E.key==="Enter"&&u.trim()&&(E.preventDefault(),m(W=>({...W,tags:[...new Set([...W.tags??[],u.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),E.key==="Backspace"&&!u&&m(W=>({...W,tags:W.tags?.slice(0,-1)})))},placeholder:s("todo.compose.addTags"),"aria-label":s("todo.edit.tags"),disabled:h.creating})),N&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(H,{className:"todo-compose-date-field",value:ro,onChange:E=>m(W=>({...W,dueDate:E})),placeholder:s("todo.compose.addDate"),ariaLabel:s("todo.field.dueDate"),disabled:h.creating}),o.createElement(F,{className:"todo-compose-time-field",value:b.startTime??"",onChange:E=>m(W=>({...W,startTime:E||void 0})),placeholder:s("todo.compose.time"),ariaLabel:s("todo.field.startTime"),disabled:h.creating})),O&&o.createElement("div",{className:"todo-compose-location"},o.createElement(vo,{value:b.location,disabled:h.creating,onChange:E=>m(W=>({...W,location:E}))})),(A||!!b.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(b.attachments??[]).map(E=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:E,title:E},o.createElement(Ct,null),o.createElement("span",null,E.split("/").pop()),o.createElement("button",{type:"button",disabled:h.creating,"aria-label":`${s("todo.removeAttachment")}: ${E}`,onClick:()=>m(W=>({...W,attachments:W.attachments?.filter(pe=>pe!==E)}))},o.createElement(be,null)))),A&&o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:s("todo.addAttachment"),placeholder:s("todo.addAttachment"),disabled:h.creating,onChange:E=>{E&&(m(W=>({...W,attachments:[...new Set([...W.attachments??[],E])]})),v(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${ro?" has-value":""}`,"aria-pressed":N,disabled:h.creating,"aria-label":s("todo.compose.addDate"),title:s("todo.compose.addDate"),onClick:()=>D(E=>!E)},o.createElement(at,null),ro&&o.createElement("span",null,ut(ro,C,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),t),b.startTime?` ${b.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${b.location?" has-value":""}`,"aria-pressed":O,disabled:h.creating,"aria-label":s("todo.compose.addPlace"),title:b.location?.name??s("todo.compose.addPlace"),onClick:()=>w(E=>!E)},o.createElement(tt,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${b.attachments?.length?" has-value":""}`,"aria-pressed":A,disabled:h.creating,"aria-label":s("todo.addAttachment"),title:s("todo.addAttachment"),onClick:()=>v(E=>!E)},o.createElement(Ct,null),!!b.attachments?.length&&o.createElement("span",null,b.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${b.priority&&b.priority!=="normal"?" has-value":""}`,disabled:h.creating,"aria-label":s("todo.field.priority"),title:s("todo.field.priority"),onClick:async E=>{let W=await f.ui.openMenu(He.map(pe=>({id:pe.id,label:s(pe.labelKey),checked:pe.id===(b.priority??"normal")})),{anchor:E.currentTarget,align:"start"});W&&m(pe=>({...pe,priority:W}))}},o.createElement(qt,null),b.priority&&b.priority!=="normal"&&o.createElement("span",null,s(`todo.priority.${b.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(E=>({...E,flagged:!(E.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":s("todo.flag"),title:s("todo.flag"),"aria-pressed":b.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:h.creating},o.createElement(ze,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!d.trim()||h.creating},s("todo.group.add"))),T&&o.createElement("div",{className:"todo-compose-error",role:"alert"},s("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:oo,"aria-label":s("todo.group.cancel"),title:s("todo.group.cancel"),disabled:h.creating},o.createElement(be,null))),br=E=>{f.ui.openPopover(({close:W})=>o.createElement("div",{className:"todo-filter-popover-stack"},o.createElement(Qm,null),(le.length>0||U)&&o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-filter-divider"}),o.createElement(cr,{todos:h.todos,groups:a,names:le,hasUngrouped:U,selected:R,includeUngrouped:ie,onChange:(pe,Ue)=>Ke(pe.length===le.length&&(!U||Ue)?Pe:{kind:"groups",names:pe,includeUngrouped:Ue}),onOpenSettings:()=>{W(),Nt()}}))),{anchor:E,align:"end"},{className:"todo-filter-popover",ariaLabel:s("todo.filters.title"),width:248})},z=E=>{f.ui.openPopover(()=>o.createElement(xi,{sortField:L,setSortField:W=>k({sortField:W}),sortDir:y,setSortDir:W=>k({sortDir:W})}),{anchor:E,align:"end"},{className:"todo-sort-popover",ariaLabel:s("auto.63e08dc2a4e3")})},B=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},ee=(E,W,pe,Ue,Pt,qe,Io,qn)=>{let Ci=hn(i,W),Ii=W.kind==="groups"&&W.names.length===1&&!W.includeUngrouped&&i.kind==="groups"?i.names.some(ao=>Y(ao)===Y(W.names[0])):Ci;return o.createElement("button",{key:Ze(W),type:"button",className:`todo-tree-row${Pt?" nested":""}${qe?` todo-${qe}-chip`:""}${Ii?" active":""}`,"aria-current":Ci?"true":void 0,"aria-label":qe?`${E} ${pe}`:void 0,title:qe?E:void 0,"aria-pressed":W.kind==="groups"?Ii:void 0,style:Io?{"--todo-chip-color":xe(Io),"--todo-chip-on":qn??kt(Io)}:void 0,onClick:ao=>dr(W,ol(ao)),onAuxClick:ao=>{ao.button===1&&(ao.preventDefault(),dr(W,!0))}},Ue&&o.createElement("span",{className:"todo-tree-icon"},Ue),Pt&&o.createElement("span",{className:"todo-tree-dot",style:{background:xe(Pt)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},E),o.createElement("span",{className:"todo-tree-count"},pe))},We=!!(oe||r||n||P!=="all")?s("auto.006b85a57ddf"):s("auto.cec28cbe4204"),Ai=n?`${$e(n.start,t)} \u2013 ${$e(n.end,t)}`:r?$e(r,t):null,Ei=P==="all"?null:`${s("auto.bae7d5be7082")}: ${P.length===1?ae.find(E=>E.id===P[0])?.label??s("todo.chip.all"):s("todo.filters.statusCount",{count:P.length})}`,Di=s("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},s("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!Q&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${re||P!=="all"||!ye?" active":""}`,"aria-label":s("todo.filters.title"),title:s("todo.filters.title"),type:"button",onClick:E=>br(E.currentTarget)},o.createElement(Od,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":s("auto.e3719eae891e"),"aria-pressed":x,title:x?s("auto.e3719eae891e"):s("auto.d2f76731e1e1"),type:"button",onClick:()=>k({compact:!x})},x?o.createElement(tn,null):o.createElement(on,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":s("auto.63e08dc2a4e3"),title:`${y==="asc"?s("auto.4fee0a06b6e4"):s("auto.01e635f27ec2")} \xB7 ${s(Bo[L])}`,type:"button",onClick:E=>z(E.currentTarget)},y==="asc"?o.createElement(Zo,null):o.createElement(Jo,null),Bn(L))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":s("auto.25097a85052b"),title:s("auto.25097a85052b"),onClick:()=>f.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(mt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:oe,onChange:E=>se(E.target.value),onKeyDown:E=>{E.key==="Escape"&&se("")},placeholder:s("auto.7be377261c61"),"aria-label":s("auto.e0345e9d3092")}),oe&&o.createElement("button",{className:"search-field-action",onClick:()=>se(""),"aria-label":s("auto.67300d0fed7c"),type:"button"},o.createElement(be,null)))),Q?o.createElement("div",{className:"todo-tree todo-active-navigation"},no,o.createElement("nav",{className:"todo-smart-grid","aria-label":s("auto.fdebf6672120")},J.map(E=>ee(s(E.labelKey),{kind:"smart",id:E.id},V[E.id],$l[E.id](),void 0,"smart",E.color,nr(E,kt)))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},s("todo.view.myLists")),le.map(E=>ee(E,{kind:"groups",names:[E]},gn(h.todos,E),void 0,De(E,a))))):o.createElement(o.Fragment,null,!oe&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":s("auto.fdebf6672120")},Ai?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:s("auto.f93fb4b1ab19"),onClick:B},o.createElement("span",{className:"todo-tree-icon"},o.createElement(er,null)),o.createElement("span",{className:"todo-tree-label"},Ai),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(be,null))):J.map(E=>ee(s(E.labelKey),{kind:"smart",id:E.id},V[E.id],$l[E.id](),void 0,"smart",E.color,nr(E,kt)))),Ei&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>I("all")},o.createElement("span",{className:"todo-tree-label"},Ei),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(be,null)))),o.createElement("div",{className:"todo-list"},no,h.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):Fe.length?o.createElement(Vn,{todos:Fe,groups:a,compact:x,controller:h,mode:de,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,We)))),!j&&o.createElement("button",{ref:G,className:"todo-fab",type:"button","aria-label":Di,title:Di,disabled:h.creating,onClick:hr},o.createElement(Yo,null)),o.createElement(Do,{c:h}))},jl=()=>o.createElement(ef,null);function tf({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=dt(),[i,d]=o.useState(e),[c,p]=o.useState(r),l=a.map(m=>m.id),u=c==="all"?l:c,g=m=>{d(m),t(m)},b=m=>{let A=u.includes(m)?u.filter(N=>N!==m):l.filter(N=>u.includes(N)||N===m);if(!A.length)return;let v=A.length===l.length?"all":A;p(v),n(v)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,s("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},s("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},s("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>o.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(m.id),onClick:()=>b(m.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(m.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Le,{status:m.id==="open"?null:m.id,dotCls:m.cls})),o.createElement("span",null,m.label)))))}var Kl=()=>{let{activePath:e,weekStart:t}=it("activePath","weekStart"),r=Ot(e)??"",n=Be(),a=xn(),[i,d]=vn("attachment"),{showCompleted:c,statusFilter:p,compact:l,sortField:u,sortDir:g,groupNames:b,includeUngrouped:m}=i,A=$=>d({showCompleted:$}),v=$=>d({statusFilter:$}),N=$=>d({sortField:$}),D=$=>d({sortDir:$}),O=To(u,g,"right_sidebar");lo(O.openDetail);let w=o.useMemo(()=>Te(n),[n]),T=o.useMemo(()=>O.todos.some($=>!$.group),[O.todos]),_=o.useMemo(()=>O.ordered.filter($=>!(Ot($.filePath)===r||($.attachments??[]).some(se=>Ot(se)===r))||!c&&$.completed||(b.length||m)&&(!$.group&&!m||$.group&&!rt(b).has(Y($.group)))?!1:mo($,p)),[O.ordered,r,c,p,b,m]),H=$=>{f.ui.openPopover(({close:oe})=>o.createElement(cr,{todos:O.todos,groups:n,names:w,hasUngrouped:T,selected:b,includeUngrouped:m,onChange:(se,re)=>d({groupNames:se,includeUngrouped:re}),onOpenSettings:()=>{oe(),Nt()}}),{anchor:$,align:"end"},{className:"todo-groups-popover",ariaLabel:s("todo.view.groups")})},F=$=>{f.ui.openPopover(()=>o.createElement(tf,{showCompleted:c,setShowCompleted:A,filter:p,setFilter:v}),{anchor:$,align:"end"},{className:"todo-filter-popover",ariaLabel:s("todo.filters.statusAndCompleted")})},j=$=>{f.ui.openPopover(()=>o.createElement(xi,{sortField:u,setSortField:N,sortDir:g,setSortDir:D}),{anchor:$,align:"end"},{className:"todo-sort-popover",ariaLabel:s("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},s("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${b.length||m?" active":""}`,type:"button","aria-label":s("todo.view.groups"),title:s("todo.view.groups"),onClick:$=>H($.currentTarget)},o.createElement(an,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||p!=="all"?" active":""}`,type:"button","aria-label":s("todo.filters.statusAndCompleted"),title:s("todo.filters.statusAndCompleted"),onClick:$=>F($.currentTarget)},o.createElement(et,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":s("auto.e3719eae891e"),onClick:()=>d({compact:!l})},l?o.createElement(tn,null):o.createElement(on,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":s("auto.63e08dc2a4e3"),title:`${g==="asc"?s("auto.4fee0a06b6e4"):s("auto.01e635f27ec2")} \xB7 ${s(Bo[u])}`,onClick:$=>j($.currentTarget)},g==="asc"?o.createElement(Zo,null):o.createElement(Jo,null),Bn(u)))),o.createElement("div",{className:"todo-list"},O.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):r?_.length?o.createElement(Vn,{todos:_,groups:n,compact:l,controller:O,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("todo.attachmentTasks.noFile")))),o.createElement(Do,{c:O}))};var of={group:e=>e.group??void 0,notes:e=>wi(e.note)||void 0,status:e=>Rt().indexOf(_e(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},Ul=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=it("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=Pn(),d=Be(),c=Nn(),p=o.useMemo(()=>Jt(t),[t]),l=p??c,u=n?.pluginId===f.pluginId&&n.instanceId===t,g=An();o.useEffect(()=>{if(!p)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>ko(-1),goForward:()=>ko(1)}),()=>e.setController(null)},[e,p,g.canGoBack,g.canGoForward]);let[b,m]=Dn(),[A,v]=o.useState(()=>!!b.trim()),N=o.useRef(null),D=()=>{v(!0),window.setTimeout(()=>N.current?.focus(),0)},O=()=>{m(""),v(!1)},[w,T]=qd(),{field:_,dir:H}=w,[F]=yt(),[j,$]=bt(),[oe,se]=Kn(),re=To("due","asc");lo(re.openDetail),o.useEffect(()=>{if(!(re.loading||p))if(l.kind==="groups"){let U=new Set(Te(d));!l.includeUngrouped&&!l.names.some(R=>U.has(R))&&Ke(Pe)}else l.kind==="tag"&&(re.todos.some(U=>U.tags?.includes(l.name))||Ke(Pe))},[re.loading,re.todos,d,l,p]);let ce=nt(),k=En(),L=l.kind==="smart"?ht(l.id,k):null,y=ri(l),x=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?xe(De(l.names[0],d)):"var(--accent-color)":l.kind==="tag"?"var(--accent-color)":l.kind==="nogroup"?"var(--text-color)":xe(L.color)||"var(--text-color)",P=o.useMemo(()=>{let U=re.todos.filter(R=>fn(R,l,F,ce));if(j!=="all"&&(U=U.filter(R=>mo(R,j))),oe.length&&(U=U.filter(R=>oe.includes(R.priority))),b.trim()){let R=Ut(b);U=U.filter(ie=>R(ie.tags??[],ie.title,ie.note,ie.group??""))}return i?U=U.filter(R=>{let ie=R.dueDate?.slice(0,10);return!!ie&&ie>=i.start&&ie<=i.end}):a&&(U=U.filter(R=>R.dueDate?.slice(0,10)===a)),U},[re.todos,l,F,j,oe,b,a,i,ce]),{ordered:I,sectionOf:ae}=o.useMemo(()=>{let U=of[_];if(U)return{ordered:Zs(P,U,H),sectionOf:void 0};if(_!=="auto")return{ordered:yo(P,_,H),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:td(P).flatMap(ye=>ye.todos),sectionOf:void 0};let R=Xr(P,ce),ie=new Map;for(let ye of Wo)for(let Fe of R[ye])ie.set(Fe.id,ye);return{ordered:Wo.flatMap(ye=>R[ye]),sectionOf:ye=>ie.get(ye.id)??"someday"}},[P,_,H,l,ce]),de=!!b.trim()||oe.length>0||j!=="all",K=()=>{m(""),se([]),$("all")},J=[Ze(l),b,JSON.stringify(j),oe.join(),F,_,H,a??"",i?.start??"",i?.end??""].join("|"),Q=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[S,M]=o.useState(0),G=()=>M(U=>U+1),h=()=>{let U={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(U.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(U.dueDate=ce),l.kind==="smart"&&l.id==="flagged"&&(U.flagged=!0),U},C=Te(d),V=[{label:s("todo.fab.newTodo"),icon:o.createElement(Yo,null),onSelect:G},...C.length?[{label:s("todo.fab.newTodoIn"),icon:o.createElement(nn,null),submenu:C.map(U=>({label:U,onSelect:R=>{let ie={kind:"groups",names:[U]};R?.newTab||p?(ni(ie,R?.newTab===!0),es()):(Ke(ie),G())}}))}]:[],{type:"separator"},{label:s("todo.group.manage"),icon:o.createElement(an,null),onSelect:()=>{Nt()}},{type:"separator"},{label:s("auto.fb3a16f382f8"),icon:o.createElement(Yt,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Cn(l)))}},{label:s("auto.c7f73bb54d92"),icon:o.createElement(Sd,null),onSelect:()=>f.workspace.openOwnSettings()}],le=t??"";return o.useEffect(()=>{(u||n?.pluginId!==f.pluginId)&&ii(V,le)}),o.useEffect(()=>()=>ii(null,le),[le]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${A?" is-searching":""}`},A?o.createElement("div",{className:"todo-page-search"},o.createElement(mt,{className:"todo-page-search-icon"}),o.createElement("input",{ref:N,className:"todo-page-search-input",value:b,onChange:U=>m(U.target.value),onKeyDown:U=>{U.key==="Escape"&&(U.preventDefault(),O())},onBlur:()=>{b.trim()||v(!1)},placeholder:s("todo.table.filterPlaceholder"),"aria-label":s("auto.e0345e9d3092")})):o.createElement("h1",{className:"todo-page-appbar-title",style:{color:x}},y),(i||a)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:s("auto.f93fb4b1ab19"),onClick:Q},o.createElement("span",null,i?`${$e(i.start,r)} \u2013 ${$e(i.end,r)}`:$e(a,r)),o.createElement(be,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!A&&b.trim()?" active":""}`,"aria-label":A?s("auto.67300d0fed7c"):s("auto.e0345e9d3092"),title:A?s("auto.67300d0fed7c"):s("auto.e0345e9d3092"),onMouseDown:U=>{A&&U.preventDefault()},onClick:A?O:D},A?o.createElement(be,null):o.createElement(mt,null)),o.createElement(Ml,null),de&&o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":s("todo.table.reset"),title:s("todo.table.reset"),onClick:K},o.createElement(Md,null)),o.createElement(_l,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":s("todo.fab.newTodo"),title:s("todo.fab.newTodo"),onClick:G},o.createElement(Yo,null)))),re.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):o.createElement(Fl,{todos:I,groups:d,c:re,sort:w,onSort:T,resetKey:J,empty:s("todo.table.empty"),sectionOf:ae,composeSignal:S,newTaskPatch:h}),o.createElement(Do,{c:re}))};function rf({value:e,onChange:t,timed:r=!0,time:n="",onTimeChange:a,defaults:i=!1}){let{NumberField:d,SelectField:c,Button:p,IconButton:l,TimeField:u}=f.ui.settings,[g,b]=o.useState({}),[m,A]=o.useState(!1),v=e===void 0?"default":e.length?"custom":"off",N=D=>{let O=D.some(w=>!Number.isInteger(w)||w<0||w>10080)||new Set(D).size!==D.length;A(O),O||t(D)};return o.createElement("div",{className:"todo-reminder-offsets"},o.createElement(c,{className:"todo-reminder-mode",ariaLabel:s("reminders.title"),value:v,onChange:D=>{A(!1),b({}),t(D==="off"?[]:D==="default"?void 0:[10])},options:[...i?[]:[{value:"default",label:s("reminders.default")}],{value:"off",label:s("reminders.off")},{value:"custom",label:s("reminders.custom")}]}),e?.map((D,O)=>{let w=g[O]??(D>0&&D%60===0);return o.createElement("div",{key:O,className:"todo-reminder-line"},o.createElement(d,{className:"todo-reminder-number",frameClassName:"todo-reminder-number-frame",min:0,max:w?168:10080,value:w?D/60:D,ariaLabel:s(w?"reminders.hours":"reminders.minutes"),onChange:T=>{T!==null&&N(e.map((_,H)=>H===O?T*(w?60:1):_))}}),o.createElement(c,{className:"todo-reminder-unit",value:w?"hours":"minutes",ariaLabel:s("reminders.title"),options:[{value:"minutes",label:s("reminders.minutes")},{value:"hours",label:s("reminders.hours")}],onChange:T=>{b(_=>({..._,[O]:T==="hours"})),N(e.map((_,H)=>H===O?(w?D/60:D)*(T==="hours"?60:1):_))}}),o.createElement(l,{onClick:()=>{b({}),N(e.filter((T,_)=>_!==O))},ariaLabel:s("reminders.remove"),title:s("reminders.remove")},o.createElement(be,null)))}),v==="custom"&&(e?.length??0)<16&&o.createElement(p,{className:"todo-reminder-add",onClick:()=>{let D=10;for(;e?.includes(D);)D+=5;N([...e??[],D])}},s("reminders.add")),!r&&v!=="off"&&a&&o.createElement(u,{value:n,onChange:a,ariaLabel:s("reminders.time")}),!r&&!n&&v!=="off"&&o.createElement("span",{className:"todo-reminder-note"},s("reminders.timeRequired")),m&&o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},s("reminders.invalid")))}function Vl(){let[e,t]=o.useState(()=>f.settings.get().reminderOffsets??[10]);o.useEffect(()=>f.settings.subscribe(()=>t(f.settings.get().reminderOffsets??[10])),[]);let{Row:r,Section:n}=f.ui.settings;return o.createElement(n,{title:s("reminders.title")},o.createElement(r,{title:s("reminders.defaultTitle"),description:s("reminders.defaultDesc")},o.createElement(rf,{value:e,defaults:!0,onChange:a=>{f.settings.set("reminderOffsets",a??[10])}})))}function nf(e){let t=af(e);return t?{"--todo-segmented-width":`${t}px`}:void 0}function af(e){let t=getComputedStyle(document.documentElement),r=t.getPropertyValue("--interface-font").trim()||getComputedStyle(document.body).fontFamily,n=document.createElement("canvas").getContext("2d");if(!n)return 0;let a=(parseFloat(t.fontSize)||16)*.75,i=Math.max(...[r,"system-ui, -apple-system, sans-serif"].map(d=>(n.font=`${a}px ${d}`,e.reduce((c,p)=>c+n.measureText(p).width,0))));return Math.ceil(i+e.length*20+(e.length-1)+2)+4}var sf={scheduled:()=>o.createElement(Qo,null),today:()=>o.createElement(er,null),week:()=>o.createElement(pn,null),flagged:()=>o.createElement(ze,null),all:()=>o.createElement(cn,null),completed:()=>o.createElement(et,null)};function Bl(e){let[t,r]=o.useState(e);return o.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[t,r]}function df(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,d]=Bl(yn),c=[{value:"auto",label:s("todo.settings.textAuto")},{value:"white",label:s("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:s("todo.settings.textBlack"),color:"#000000"}],p=m=>{d(m),Vd(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,u=i.order.map(m=>ht(m,i)),g=a({items:u,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>s(m.labelKey),onReorder:m=>p({...i,order:m.map(A=>A.id)})}),b=(m,A)=>{if(A){p({...i,hidden:i.hidden.filter(D=>D!==m)});return}if(l<=1)return;let v={...i,hidden:[...i.hidden,m]};p(v);let N=Xt();N.kind==="smart"&&N.id===m&&Ke({kind:"smart",id:v.order.find(D=>!v.hidden.includes(D))})};return o.createElement(t,{title:s("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},s("todo.settings.colList")),o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.colText")),o.createElement("span",null,s("todo.settings.colShow"))),u.map((m,A)=>{let v=i.hidden.includes(m.id),N=`${m.id}@${A}`,D=g.getHandleProps(m),O=s(m.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(v?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},o.createElement("button",{...D,className:(D.className??"")+" todo-settings-handle",title:s("todo.settings.smartListReorder")},o.createElement(Xo,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:xe(m.color),color:nr(m,kt)},"aria-hidden":"true"},sf[m.id]()),o.createElement("span",{className:"todo-settings-name"},O),o.createElement(e,{key:`color:${N}`,value:m.color,onChange:w=>p({...i,colors:{...i.colors,[m.id]:w}}),ariaLabel:s("todo.settings.smartListColor",{p0:O}),allowCustom:!1}),o.createElement(r,{key:`text:${N}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:s("todo.settings.statusText",{p0:O}),onChange:w=>{let T={...i.textColors};w==="auto"?delete T[m.id]:T[m.id]=w,p({...i,textColors:T})}}),o.createElement(n,{key:`show:${N}`,checked:!v,disabled:!v&&l<=1,label:s("todo.settings.smartListShow",{p0:O}),onChange:w=>b(m.id,w)}))})),g.liveRegion)}function Hn({initial:e,onCommit:t,onType:r,placeholder:n,ariaLabel:a,disabled:i}){let d=o.useRef(!1);return o.createElement("input",{className:"settings-control todo-settings-text",type:"text",defaultValue:e,placeholder:n,"aria-label":a,disabled:i,autoComplete:"off",spellCheck:!1,onChange:c=>r?.(c.currentTarget.value),onBlur:c=>{if(d.current){d.current=!1;return}t(c.currentTarget.value)},onKeyDown:c=>{c.key==="Enter"?(c.preventDefault(),c.currentTarget.blur()):c.key==="Escape"&&(c.preventDefault(),c.currentTarget.value=e,d.current=!0,c.currentTarget.blur())}})}function lf(){let{Button:e,ColorField:t,IconButton:r,Row:n,Section:a,Segmented:i,SelectField:d,Toggle:c,useReorderDrag:p}=f.ui.settings,[l,u]=Bl(Ve),g=o.useRef(""),[b,m]=o.useState(0),[A,v]=o.useState(!1),N=k=>{let L=_r(k);u(L),vs(L)},D=l.active.map(k=>ke(k,l)),O=p({items:D,indicatorOnly:!0,getId:k=>k.id,getLabel:k=>k.label,onReorder:k=>N({...l,active:k.map(L=>L.id)})}),w=(k,L)=>{L!==l.active.includes(k)&&N({...l,active:L?[...l.active,k]:l.active.filter(y=>y!==k)})},T=k=>k.replace(/[\u0000-\u001f]/g," ").trim().slice(0,ga),_=()=>{let k=T(g.current);if(!k||l.custom.length>=Or)return;let L=ws();N({...l,custom:[...l.custom,{id:L,label:k,done:!1}],active:[...l.active,L]}),g.current="",v(!1),m(y=>y+1)},H=(k,L)=>{let y=T(L);y&&N({...l,custom:l.custom.map(x=>x.id===k?{...x,label:y}:x)})},F=async(k,L)=>{N({...l,custom:l.custom.map(x=>x.id===k?{...x,done:L}:x)});let y=(await Ye()).filter(x=>x.status===k);await Promise.all(y.map(x=>Na(x.id,k)))},j=async k=>{let L=ke(k,l).label,y=(await Ye()).filter(I=>I.status===k);if(await f.ui.confirm({title:s("todo.settings.statusDeleteTitle",{p0:L}),message:y.length?s("todo.settings.statusDeleteMoves",{count:y.length,p0:s("todo.status.todo")}):s("todo.settings.statusDeleteUnused"),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(y.map(I=>Na(I.id,"open")));let P=Ve();N({...P,custom:P.custom.filter(I=>I.id!==k),active:P.active.filter(I=>I!==k)})},$=[{value:"auto",label:s("todo.settings.textAuto")},{value:"white",label:s("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:s("todo.settings.textBlack"),color:"#000000"}],oe=(k,L,y)=>{let x=k.id,P=`${x}@${y}`,I=k.label,ae=L==="shown"?O.getHandleProps(k):null,de=Gt(x)?x:null;return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(L==="locked"?" locked":"")+(L==="off"?" is-off":"")+(L==="shown"&&O.overId===x?" drop-"+(O.dropPosition??"before"):""),key:x,...L==="shown"?O.getItemProps(k):{}},ae?o.createElement("button",{...ae,className:(ae.className??"")+" todo-settings-handle",title:s("todo.settings.statusReorder")},o.createElement(Xo,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:L==="locked"?s("todo.settings.statusLocked"):void 0},L==="locked"&&o.createElement(fd,null)),o.createElement("span",{className:"todo-settings-glyph"},o.createElement(Le,{status:x==="open"?null:x,dotCls:k.cls})),de?o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(Hn,{key:`name:${P}:${I}`,initial:I,ariaLabel:s("todo.settings.statusName"),onCommit:K=>H(de,K)})):o.createElement("span",{className:"todo-settings-name"},I),o.createElement("span",{className:"todo-settings-preview"},o.createElement(mi,{status:x,style:l.style})),o.createElement(r,{key:`strike:${P}`,className:"todo-settings-strike",pressed:l.strikethrough[x],"aria-pressed":l.strikethrough[x],ariaLabel:s("todo.settings.statusStrike",{p0:I}),title:s("todo.settings.statusStrike",{p0:I}),onClick:()=>N({...l,strikethrough:{...l.strikethrough,[x]:!l.strikethrough[x]}})},o.createElement(Ua,null)),o.createElement(t,{key:`color:${P}`,value:l.colors[x],onChange:K=>N({...l,colors:{...l.colors,[x]:K}}),ariaLabel:s("todo.settings.statusColor",{p0:I}),allowCustom:!1}),o.createElement(d,{key:`text:${P}`,className:"todo-settings-text-select",value:l.textColors[x],options:$,disabled:l.style!=="filled",ariaLabel:s("todo.settings.statusText",{p0:I}),onChange:K=>N({...l,textColors:{...l.textColors,[x]:K}})}),o.createElement(c,{key:`show:${P}`,checked:L!=="off",disabled:L==="locked",label:s(de?"todo.settings.statusShowCustom":"todo.settings.statusShow",{p0:I}),onChange:K=>w(x,K)}),o.createElement("span",{className:"todo-settings-row-actions"},de&&o.createElement(o.Fragment,null,o.createElement(r,{key:`done:${P}`,className:"todo-settings-strike",pressed:k.done,"aria-pressed":k.done,ariaLabel:s("todo.settings.statusDone",{p0:I}),title:s("todo.settings.statusDone",{p0:I}),onClick:()=>{F(de,!k.done)}},o.createElement(et,null)),o.createElement(r,{key:`delete:${P}`,ariaLabel:s("todo.settings.statusDelete",{p0:I}),title:s("todo.settings.statusDelete",{p0:I}),onClick:()=>{j(de)}},o.createElement(ft,null)))))},se=[...Mr.filter(k=>!l.active.includes(k)),...l.custom.map(k=>k.id).filter(k=>!l.active.includes(k))].map(k=>ke(k,l)),re=[{value:"filled",label:s("todo.settings.styleFilled")},{value:"text",label:s("todo.settings.styleText")}],ce=l.custom.length>=Or;return o.createElement(o.Fragment,null,o.createElement(a,{title:s("todo.settings.statusAppearance")},o.createElement(n,{title:s("todo.settings.statusStyle"),description:s("todo.settings.statusStyleDesc")},o.createElement("div",{className:"todo-settings-end",style:nf(re.map(k=>k.label))},o.createElement(i,{value:l.style,ariaLabel:s("todo.settings.statusStyle"),options:re,onChange:k=>N({...l,style:k})})))),o.createElement(a,{title:s("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.statusesDescCustom")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},s("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-preview"},s("todo.settings.colPreview")),o.createElement("span",{className:"todo-settings-head-glyph",title:s("todo.settings.colStrike")},o.createElement(Ua,null)),o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.colText")),o.createElement("span",null,s("todo.settings.colShow")),o.createElement("span",null)),oe(ke("open",l),"locked",0),oe(ke("completed",l),"locked",1),D.map((k,L)=>oe(k,"shown",2+L)),se.map((k,L)=>oe(k,"off",2+D.length+L))),O.liveRegion,o.createElement("div",{className:"todo-status-add"},o.createElement(Hn,{key:`add:${b}`,initial:"",placeholder:s("todo.settings.statusNewPlaceholder"),ariaLabel:s("todo.settings.statusNew"),disabled:ce,onType:k=>{g.current=k,!!T(k)!==A&&v(!A)},onCommit:k=>{g.current=k}}),o.createElement(e,{type:"button",disabled:ce||!A,onClick:_},s("todo.settings.statusAdd")))))}function cf(){let{Row:e,Section:t,SelectField:r}=f.ui.settings,[n,a]=o.useState(bn);return o.createElement(o.Fragment,null,o.createElement(t,{title:s("todo.settings.display")},o.createElement(e,{title:s("todo.settings.dateBreakdown"),description:s("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let d=i;a(d),f.settings.set(Ya,d)},ariaLabel:s("todo.settings.dateBreakdown"),options:[{value:"monthly",label:s("todo.breakdown.monthly")},{value:"weekly",label:s("todo.breakdown.weekly")},{value:"daily",label:s("todo.breakdown.daily")}]}))),o.createElement(Vl,null))}function uf(){let{Button:e,ColorField:t,IconButton:r,Section:n,SelectField:a}=f.ui.settings,i=Hs(),d=Be(),c=d.filter(w=>!i.some(T=>T.id===w.id)),p=o.useRef(""),[l,u]=o.useState(0),[g,b]=o.useState(""),m=(w,T)=>d.some(_=>_.id!==T&&[_.name,..._.aliases??[]].some(H=>Y(H)===Y(w))),A=w=>{Bs(w)},v=()=>{let w=p.current.trim().slice(0,Uo);!w||m(w)||i.length>=Br||(A([...i,{id:js(),name:w,color:ma(d)}]),p.current="",b(""),u(T=>T+1))},N=(w,T)=>{!T.trim()||T.trim()===w.name||m(T,w.id)||A(i.map(_=>_.id===w.id?Ks(_,T):_))},D=async w=>{let T=new Set([w.name,...w.aliases??[]].map(Y)),_=(await Ye()).filter(F=>F.group&&T.has(Y(F.group)));await f.ui.confirm({title:s("todo.settings.localGroupDeleteTitle",{p0:w.name}),message:_.length?s("todo.settings.localGroupDeleteMoves",{count:_.length}):s("todo.settings.localGroupDeleteUnused"),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(_.map(F=>Gs(F.id,void 0))),A(Vt().filter(F=>F.id!==w.id)))},O=[{value:"",label:s("todo.settings.localGroupNoParent")},...c.map(w=>({value:w.id,label:w.name,color:w.color}))];return o.createElement(n,{title:s("todo.settings.localGroups")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.localGroupsDesc")),i.length>0&&o.createElement("div",{className:"todo-settings-list todo-local-groups",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.localGroupName")),o.createElement("span",null,s("todo.settings.localGroupParent")),o.createElement("span",null)),i.map(w=>o.createElement("div",{role:"listitem",className:"todo-settings-item",key:w.id},o.createElement(t,{value:w.color,onChange:T=>A(i.map(_=>_.id===w.id?{..._,color:T}:_)),ariaLabel:s("todo.settings.localGroupColor",{p0:w.name})}),o.createElement(Hn,{key:`name:${w.id}:${w.name}`,initial:w.name,ariaLabel:s("todo.settings.localGroupName"),onCommit:T=>N(w,T)}),o.createElement(a,{value:w.parent??"",options:O,ariaLabel:s("todo.settings.localGroupParentOf",{p0:w.name}),onChange:T=>A(i.map(_=>{if(_.id!==w.id)return _;let{parent:H,...F}=_;return T?{...F,parent:T}:F}))}),o.createElement(r,{ariaLabel:s("todo.settings.localGroupDelete",{p0:w.name}),title:s("todo.settings.localGroupDelete",{p0:w.name}),onClick:()=>{D(w)}},o.createElement(ft,null))))),o.createElement("div",{className:"todo-status-add"},o.createElement(Hn,{key:`add:${l}`,initial:"",placeholder:s("todo.settings.localGroupNew"),ariaLabel:s("todo.settings.localGroupNew"),onType:w=>{p.current=w;let T=w.trim();T!==g&&(!T||!g)&&b(T)},onCommit:w=>{p.current=w,b(w.trim())}}),o.createElement(e,{type:"button",disabled:!g||i.length>=Br,onClick:v},s("todo.settings.localGroupAdd"))))}function Hl({section:e}){return e==="statuses"?o.createElement(lf,null):e==="lists"?o.createElement(o.Fragment,null,o.createElement(df,null),o.createElement(f.ui.settings.Section,null,o.createElement(f.ui.settings.GroupsEditor,null)),o.createElement(uf,null)):o.createElement(cf,null)}var Wl="reminder:";function ql(){let e=Ie();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(Wl))return;let a=n??t.slice(Wl.length).split(":")[0];Ye(e).then(i=>{e.assertActive();let d=i.find(c=>c.id===a);d?.filePath?e.api.workspace.openFile(d.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var ki=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ti=e=>({type:"string",description:e});async function Si(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Yl(e){return oa([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:ki({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await Si(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:ki({title:Ti("Task title"),due:Ti("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Si(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:ki({id:Ti("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Si(e,"complete",{query:n},r)).title||n}".`}}])}function pf(e){fs(e);let t=Qi(e),r=ts(),n=Ts(),a=!1,i=e.backend.on("records.eventDeliveryFailed",()=>{a||(a=!0,e.ui.confirm({title:s("workflow.delivery.title"),message:s("workflow.delivery.message"),actions:[{label:s("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{a=!1}))});Ud();let d=e.workspace.onOpenOwnLink(D=>{In(D)});e.registerView("todo.panel",jl),e.registerView("todo.file",Kl),e.registerView("todo.page",Ul),e.registerView("todo.settings",Hl);let c=dd(e),p=il(e),l=e.interop.services.provide(ra,Yl(e)),u=md(),g=Jd(),b=e.interop.services.subscribe(zt,()=>{}),m=e.interop.services.subscribe(zt,()=>{}),A=el(e),v=ql(),N=Ws();return()=>{i(),t(),c(),p(),l(),u(),g(),b(),m(),A(),v(),N(),d(),n(),r()}}var mf={register:pf},Pk=mf;export{Pk as default,pf as register};

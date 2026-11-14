var It="valley";var $g=`.${It}`,Ug=`app.${It}`;function Au(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Eu=/^[a-zA-Z]:/;function qo(e){if(typeof e!="string")return"";let t=Au(e);return!t||t==="."||Eu.test(t)||t.split("/").some(r=>r==="..")?"":t}function Wt(e){if(typeof e=="string")return qo(e)||void 0}var Ae=`.${It}`,Cu="plugins",Yo=`${Ae}/${Cu}`,Br=`${Yo}/packages`,Vg=`${Br}/core`,Bg=`${Br}/github`,Hg=`${Br}/local`,Wg=`${Br}/community`,qg=`${Yo}/community.json`,Yg=`${Yo}/data`;var Xg=`${Yo}/enabled.json`,Zg=`${Yo}/sources.json`,Jg=`${Ae}/state`,De=`${Ae}/settings`,ks=`${Ae}/data`,ja=`${Ae}/recovery`;var Ka=`${Ae}/accounts`,wo=`${Ae}/ai`,Qg=`${wo}/connections.json`,eh=`${wo}/defaults.json`,th=`${wo}/budgets.json`,oh=`${wo}/usage.sqlite`,rh=`${wo}/security/guards.json`,nh=`${wo}/security/activity.sqlite`,ah=`${Ka}/providers`,ih=`${Ka}/providers.lock.json`,Du=`${Ae}/trash`,sh=`${Du}/items`,Va=`${Ae}/cache`,dh=`${Va}/accounts`,Iu=`${Va}/search`,lh=`${Va}/providers`;var ch=`${Iu}/index.jsonl`,uh=`${ja}/drafts`,ph=`${ja}/transactions`,mh=`${ja}/retired`;var Nt="design",Nu="themes",Ss=`${Ae}/${Nt}/${Nu}`,fh=`${Ss}/local`,gh=`${Ss}/community`,hh={app:`${De}/app.json`,appearance:`${Ae}/${Nt}/appearance.json`,"icon-rail":`${Ae}/${Nt}/icon-rail.json`,"footer-rail":`${Ae}/${Nt}/footer-rail.json`,"plugin-startup":`${Ae}/${Nt}/right-sidebar-startup.json`,"new-tab":`${Ae}/${Nt}/new-tab.json`,pallette:`${Ae}/${Nt}/palette.json`,group:`${ks}/groups.json`,units:`${ks}/units.json`,metadata:`${De}/file-viewers.json`,notification:`${De}/notification.json`,"notification-settings":`${De}/notification-settings.json`,preferences:`${De}/preferences.json`,"link-actions":`${De}/link-actions.json`,markdown:`${De}/markdown.json`,editor:`${De}/editor.json`,"editor-vim":`${De}/editor-vim.json`,"markdown-todo":`${De}/markdown-todo.json`,"markdown-codeblocks":`${De}/markdown-codeblocks.json`,"markdown-template":`${De}/markdown-template.json`,"markdown-embeed":`${De}/markdown-embeed.json`,files:`${De}/file.json`,"file-sorter":`${De}/file-sorter.json`,"file-sym-link":`${De}/file-sym-link.json`,search:`${De}/search.json`,"search-tag":`${De}/search-tag.json`,"search-content":`${De}/search-content.json`,design:`${Ae}/${Nt}/appearance.json`,accounts:`${Ka}/connections.json`};var As=It,Es="open";var Lu=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Cs=16384;var Ds=new Set(["__proto__","prototype","constructor"]);function Is(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function Hr(e){let t=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Is(i)>Cs)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let c=Array.isArray(i),u=Object.getPrototypeOf(i);if(!(!c&&u!==null&&(Object.getPrototypeOf(u)!==null||typeof Object.getOwnPropertyDescriptor(u,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(u,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(h=>typeof h=="string"&&Ds.has(h)))throw new Error("Invalid or excessive bookmark state keys");let p=Object.getOwnPropertyDescriptors(i);if(c){let h=p.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(m,y)=>{let w=p[String(y)];return w&&"value"in w?n(w.value,s+1)??null:null})}let g={};for(let h of Object.keys(p).sort()){if(Ds.has(h))throw new Error("Invalid bookmark state key");let m=p[h];if(!m.enumerable||!("value"in m)){r++;continue}let y=n(m.value,s+1);y!==void 0&&(g[h]=y)}return g}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Is(JSON.stringify(a))>Cs)throw new Error("Bookmark state is too large");return a}function Ps(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=qo(e);if(!t)throw new Error("Invalid bookmark path");return t}function Ba(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Ns(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function Ha(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Lu.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=Hr(t.state);return r.path!==void 0&&(r.path=Ps(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Pu=/^[A-Za-z0-9_-]{1,64}$/;function Ls(e,t){if(typeof e!="string"||!Pu.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Os(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=Ba(t.title,512,"title"),n={...t.description===void 0?{}:{description:Ba(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:Ba(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:Ls(t.group,"group")};if(t.groupId!==void 0){let c=Ls(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(t.target!==void 0){let c={folderPath:"",title:r,target:Ha(t.target),...n,...a};return{...c,searchText:Ns(c)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:Ps(t.folderPath),title:r,...n,...a};return{...s,searchText:Ns(s)}}function qt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++t>2048||s>32||!r(i)||typeof i.type!="string")return!1;let c=(...u)=>Object.keys(i).every(l=>l==="type"||u.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(u=>a(u,s+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(u=>a(u,s+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([u,l])=>n(u)&&a(l,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(u=>typeof u=="string"&&Object.hasOwn(i.properties,u)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Wr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,c,u)=>{if(--n<0||u>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return c===null;if(s.type==="literal")return c===s.value;if(s.type==="union")return s.anyOf.some(l=>i(l,c,u+1));if(s.type==="number")return typeof c=="number"&&Number.isFinite(c);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof c===s.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return s.type==="array"?Array.isArray(c)&&c.length<=(s.maxItems??1e5)&&c.every(l=>i(s.items,l,u+1)):s.type==="tuple"?Array.isArray(c)&&c.length>=(s.minItems??s.items.length)&&c.length<=s.items.length&&c.every((l,p)=>i(s.items[p],l,u+1)):s.type==="object"?Array.isArray(c)||s.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,p])=>Object.hasOwn(s.properties,l)?i(s.properties[l],p,u+1):s.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,t,0)}var Ou=new Map;function me(e,t,r,n,a,i,s,c,u="owner"){let l=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:u,serviceCalls:s,serviceMetadata:c});return Ou.set(`${t}:${e}@${r}`,l),l}var qa=256;function Ya(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var ne=e=>!!e&&typeof e=="object"&&!Array.isArray(e),he=(e,t)=>typeof e[t]=="function",Yt=e=>e===void 0,vo=e=>typeof e=="boolean",ie=e=>typeof e=="string",Re=e=>e===void 0||ie(e),Mu=e=>e===void 0||typeof e=="number",_u=e=>e===void 0||typeof e=="boolean",pe=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Me=e=>ne(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Ms=e=>ne(e),zs=e=>ne(e)&&ie(e.id)&&ie(e.title)&&ie(e.date)&&(e.documentRef===void 0||ne(e.documentRef)&&ie(e.documentRef.pluginId)&&ie(e.documentRef.sourceId)&&ie(e.documentRef.itemId)),zu=e=>ne(e)&&ie(e.date)&&Re(e.startTime)&&Re(e.endTime)&&Re(e.sourceId)&&Re(e.itemId),Fu=e=>ne(e)&&ie(e.url)&&Re(e.title)&&_u(e.newTab),Ru=e=>ne(e)&&ie(e.query),Fs=e=>ne(e)&&ie(e.name)&&Re(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Gu=e=>Array.isArray(e)&&e.every(Fs),$u=e=>e===null||Fs(e),Uu=e=>e===void 0||ne(e)&&Re(e.approvalToken)&&(e.cancellation===void 0||ne(e.cancellation)),ju=e=>typeof e=="string"||ne(e)&&typeof e.text=="string",Ku=e=>ne(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&ne(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Re(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Rs=e=>ne(e)&&ie(e.id)&&ie(e.label)&&Re(e.labelKey)&&Re(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Rs)),Gs={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(zs)},create:{args:e=>pe(e,[ie,Ms]),result:vo},update:{args:e=>pe(e,[ie,Ms]),result:vo},remove:{args:e=>pe(e,[ie]),result:vo},open:{args:e=>pe(e,[ie]),result:Yt},configure:{args:e=>e.length===0,result:Yt},actions:{args:e=>pe(e,[ie]),result:e=>Array.isArray(e)&&e.every(Rs)},runAction:{args:e=>pe(e,[ie,ie]),result:vo}},$s=e=>ne(e)&&ie(e.name)&&ie(e.version)&&Re(e.description)&&Re(e.author)&&(e.localized===void 0||ne(e.localized)&&Object.values(e.localized).every(t=>ne(t)&&ie(t.name)&&Re(t.description))),Vu=me("calendar.itemSource","service","1.3.0","many",e=>ne(e)&&he(e,"list")&&(e.integration===void 0||$s(e.integration)),void 0,Gs,e=>e.integration),qr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,Wa=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Bu=e=>ne(e)&&qr(e.startDate)&&qr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=qa&&(e.cursor===void 0||Wa(e.cursor)),Hu=e=>ne(e)&&Wa(e.revision)&&(e.cursor===void 0||Wa(e.cursor))&&Array.isArray(e.items)&&e.items.length<=qa&&e.items.every(t=>zs(t)&&qr(t.date)&&(t.endDate===void 0||qr(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,xo=me("calendar.itemSource","service","2.0.0","many",e=>ne(e)&&he(e,"list")&&(e.integration===void 0||$s(e.integration)),void 0,{...Gs,list:{args:e=>pe(e,[Bu]),result:Hu}},e=>e.integration),Xo=me("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Wu=me("calendar.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"openDate"),void 0,{openDate:{args:e=>pe(e,[zu]),result:Yt}}),Yr=me("calendar.panelSelection","state","1.0.0","one",e=>ne(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),qu=me("web.activeContext","state","1.0.0","one",e=>ne(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function _s(e){return ne(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>ne(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Yu=me("contacts.directory","service","1.0.0","one",e=>ne(e)&&["search","resolveEmails","open"].every(t=>he(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(_s)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>ne(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(_s))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||ne(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Yt}}),Xu=me("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Zu=me("web.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"open"),void 0,{open:{args:e=>pe(e,[Fu]),result:Yt}}),Ju=me("selection.textAction","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&he(e,"run"),e=>[e.id]),Qu=me("geo.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"open"),void 0,{open:{args:e=>pe(e,[Ru]),result:Yt}}),ep=me("geo.search","service","1.0.0","one",e=>ne(e)&&he(e,"search")&&he(e,"reverse"),void 0,{search:{args:e=>pe(e,[ie]),result:Gu},reverse:{args:e=>pe(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:$u}}),Xa=me("agent.toolProvider","service","1.0.0","many",e=>ne(e)&&Array.isArray(e.tools)&&e.tools.every(Ku)&&he(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>pe(e,[ie,ne,Uu]),result:ju}},e=>({tools:e.tools}),"global"),tp=me("guard.runtime","service","1.0.0","one",e=>ne(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>he(e,t)),void 0,{resolve:{args:e=>pe(e,[ne]),result:ne},requestApproval:{args:e=>pe(e,[ne]),result:vo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&ie(e[0])&&Re(e[1]),result:vo},audit:{args:e=>pe(e,[ne]),result:Yt}}),op=me("browser.automation","service","1.0.0","one",e=>ne(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>he(e,t)),void 0,{list:{args:e=>e.length===0,result:Me},open:{args:e=>pe(e,[ie]),result:Me},switch:{args:e=>pe(e,[ie]),result:Me},close:{args:e=>pe(e,[ie]),result:Me},snapshot:{args:e=>pe(e,[ie]),result:Me},readText:{args:e=>e.length>=1&&e.length<=2&&ie(e[0])&&Mu(e[1]),result:Me},readHtml:{args:e=>pe(e,[ie]),result:Me},screenshot:{args:e=>pe(e,[ie]),result:Me},click:{args:e=>pe(e,[ie,t=>typeof t=="number"]),result:Me},type:{args:e=>e.length>=3&&e.length<=4&&ie(e[0])&&typeof e[1]=="number"&&ie(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Me},select:{args:e=>pe(e,[ie,t=>typeof t=="number",ie]),result:Me},scroll:{args:e=>pe(e,[ie,t=>typeof t=="number",t=>typeof t=="number"]),result:Me},pressKey:{args:e=>pe(e,[ie,ie]),result:Me},navigate:{args:e=>pe(e,[ie,ie]),result:Me},back:{args:e=>pe(e,[ie]),result:Me},forward:{args:e=>pe(e,[ie]),result:Me},reload:{args:e=>pe(e,[ie]),result:Me}}),rp=me("fileTree.contextItem","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Re(e.labelKey)&&he(e,"run"),e=>[e.id]),np=me("newTab.entry","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"run"),e=>[e.id]),Za=me("search.resultAction","extension","1.0.0","many",e=>ne(e)&&typeof e.cardKind=="string"&&he(e,"open"),e=>[e.cardKind]),ap=me("search.resultCard","extension","1.0.0","many",e=>ne(e)&&typeof e.cardKind=="string"&&he(e,"render")&&he(e,"open"),e=>[e.cardKind]),Xr=me("metadataPanel.segment","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"render"),e=>[e.id]),Ja=me("workspace.surface","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&he(e,"getSnapshot")&&he(e,"subscribe")&&he(e,"restore"),e=>[e.id]),ip=me("metadata.plugin","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"facts"),e=>[e.id]),sp=me("workspace.viewState","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&he(e,"capture")&&he(e,"restore")&&he(e,"subscribe"),e=>[e.id]);var Zr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},Qa=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Us=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),js=e=>Qa(e)&&typeof e.surface=="string"&&Us.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Zo(e){let t=Zr(e);if(!js(t))throw new Error("Invalid bookmark descriptor");let r=Ha({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Os({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function ei(e){try{let t=Zo(e),r=Zr(e);return JSON.stringify(t.state)===JSON.stringify(Hr(r.state))}catch{return!1}}function dp(e){try{let t=Zr(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:Zo(t.bookmark)}}catch{}return{status:"invalid"}}var lp=e=>{try{let t=Zr(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&ei(t.bookmark)}catch{return!1}},cp=e=>Qa(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Ks=me("workspace.bookmark","service","1.0.0","many",e=>Qa(e)&&typeof e.id=="string"&&Us.has(String(e.surface))&&qt(e.stateSchema)&&(e.itemStateSchema===void 0||qt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&js(e[0]),result:lp,sanitizeResult:dp},restore:{args:e=>e.length===1&&ei(e[0]),result:cp}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function ti(e,t,r){if(!qt(r.stateSchema)||r.itemStateSchema!==void 0&&!qt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,p,g=!1)=>Wr(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,p)),i=(l,p,g)=>{let h=g?void 0:r.primary?r.primary(l):l.item,m=Hr(h?.state??l.view);if(!a(m,p,!!h))throw new Error("Invalid bookmark state");return Zo({...p,title:h?.title??l.title,description:r.description(l,!!h),state:m,...h?{itemId:h.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};let p;try{if(p=Zo(l),!a(p.state,p,p.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(p.state,p.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(Ks,s),u;try{u=e.interop.extensions.provide(Ja,{...t,getSnapshot(l){let p=t.getSnapshot(l),g={surface:t.surface,...l===void 0?{}:{instanceId:l}},h,m;try{h=i(p,g,!1)}catch{}try{m=i(p,g,!0)}catch{}return{...p,bookmark:h,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,u(),c()}}var Jo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Vs=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Bs(e){if(!Jo(e)||!Vs(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!Jo(r)||!Vs(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!Jo(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!Jo(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!Jo(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var up=me("workspace.details","extension","1.0.0","many",Bs,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Hh=[Ae,`${Ae}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var ib=1024*1024;var lb=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var cb=globalThis.Buffer;var mp=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,Jr=new Map,Qr;function xe(){return Qr}function en(e,t){let r=Jr.get(e)??new Set;return r.add(t),Jr.set(e,r),()=>{r.delete(t),r.size||Jr.delete(e)}}function Hs(e){Qr?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return Qr={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},Qr.dispose}var fp=1800;function To(e){let t=_e();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=p=>{if(p.mode==="create")return;i=p.nonce,p.mode==="edit"&&(t.clear(),e(p.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,h=()=>{if(r=null,i!==p.nonce)return;let m=[...Jr.get(p.todoId)??[]].find(y=>y.isConnected);if(!m){Date.now()<g?r=setTimeout(h,40):t.get()?.nonce===p.nonce&&t.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(s,fp),t.get()?.nonce===p.nonce&&t.clear()};r=setTimeout(h,0)},u=t.subscribe(()=>{let p=t.get();p&&c(p)}),l=t.get();return l&&c(l),()=>{u(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function _e(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function Ws(){_e().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var qs=`
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

`;var Ys=`/* \u2500\u2500 Todo panel (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var Xs=`/* \u2500\u2500 Swipe \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var Zs=`/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var Js=`/* edit mode */
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

`;var Qs=`/* \u2500\u2500 Todo: confirm delete \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var ed=`/* \u2500\u2500 To-Do page (main_workspace \u2014 Things-style sections) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

`;var td=`/* \u2500\u2500 Detail modal body (api.ui.Modal, bodyClassName) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`;var od=`/* \u2500\u2500 Edit sheet: one column, title, notes, then every property as a chip \u2500\u2500 */
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

`;var rd=`/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var nd=`/* \u2500\u2500 Group editor popovers \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var ad=`/* \u2500\u2500 Filter surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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
`;var id=`/* \u2500\u2500 Settings: one bordered list per section, rows split by hairlines \u2500\u2500\u2500\u2500\u2500
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

`;var sd=`/* \u2500\u2500 Status badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

`;var dd=`/* \u2500\u2500 Main table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
/* The editing blue reaches the right edge: the sticky column layers it over its own opaque surface. */
.todo-table-new-row:not(.is-idle) td.todo-table-actions,
.todo-table-row.is-editing td.todo-table-actions { background: linear-gradient(color-mix(in srgb, var(--accent-color) 6%, transparent), color-mix(in srgb, var(--accent-color) 6%, transparent)), var(--surface-color-alt); }
.todo-status-plain { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-row:not(:hover) .todo-status-plain { opacity: 0; }

`;var ld=`/* Groups lists: the shared Groups editor and every plugin's own-group editor.
   One grid holds the rows and the add row, so their columns line up: grip, name,
   colour, usage count, remove. The add row's action spans the usage and
   remove columns, so its edges meet theirs whatever the label's length. The grip
   hangs 5px into the gutter like every reorder handle in Settings, so its column
   is 11px and the name keeps its place. */
.settings-colorrules.settings-groups {
  display: grid;
  grid-template-columns: 11px minmax(0, 1fr) 20px minmax(calc(2.2 * var(--smaller-font-size)), auto) 28px;
  gap: var(--space-2);
  align-items: center;
  margin-top: var(--space-2);
}

/* The list owns its whole row: title and description above, the list below. */
.settings-path-row.settings-groups-row {
  display: block;
}

.settings-groups > * {
  grid-column: 1 / -1;
}

.settings-groups > .settings-colorrule-row {
  position: relative;
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;
}

.settings-groups > .settings-colorrule-add {
  margin-top: var(--space-1);
}

.settings-groups > .settings-colorrule-row > .settings-colorrule-grip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  max-width: none;
  height: 20px;
  min-height: 0;
  margin: 0 0 0 -5px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--text-tertiary);
  font-size: 0.875rem;
  cursor: grab;
}

.settings-groups > .settings-colorrule-row > .settings-colorrule-grip:active {
  cursor: grabbing;
}

.settings-groups > .settings-colorrule-row > .settings-colorrule-grip-placeholder {
  visibility: hidden;
  cursor: default;
}

.settings-groups > .settings-colorrule-row > :is(.settings-colorrule-key, .settings-input-stack) {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

.settings-groups .settings-group-usage {
  min-width: 2.2em;
  color: var(--text-tertiary);
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.settings-groups .settings-colormap-remove {
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  font-size: 1.1rem;
  cursor: pointer;
}

/* A plugin's glyph is mirrored into the host button as its own box: an inline
   svg leaves descender space under it and sits above the centre. */
.settings-colormap-remove svg {
  display: block;
}

.settings-groups > .settings-colorrule-row > .settings-colorrule-add-action {
  display: grid;
  grid-column: span 2;
  min-width: 0;
}

/* One cell: a host-drawn button's placeholder in a plugin has no width of its own,
   so a hidden copy of the label (\`.settings-colorrule-add-sizer\`, a medium
   \`.settings-button\`) sizes the column for languages with a longer label. */
.settings-groups .settings-colorrule-add-action > * {
  grid-area: 1 / 1;
  min-width: 0;
}

.settings-groups .settings-colorrule-add-sizer {
  visibility: hidden;
  pointer-events: none;
}

.settings-groups .settings-colormap-add-btn {
  width: 100%;
}

/* Host-drawn fields inside a group row fill their column. */
.settings-colorrule-row > #plugin-widget-root > :is(.select-field, .settings-path-input, .settings-input-stack) {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.settings-groups > .settings-colorrule-row.drop-before::before {
  top: calc(var(--space-2) / -2);
  margin: 0;
  transform: translateY(-50%);
}

.settings-groups > .settings-colorrule-row.drop-after::before {
  bottom: calc(var(--space-2) / -2);
  margin: 0;
  transform: translateY(50%);
}
`;var gp=qs+Ys+Xs+Zs+Js+Qs+ed+td+od+rd+nd+ad+id+sd+dd+ld,oi="notes-todo-styles";function cd(){let e=document.getElementById(oi);return e||(e=document.createElement("style"),e.id=oi,document.head.appendChild(e)),e.textContent=gp,()=>{document.getElementById(oi)===e&&e.remove()}}var de="#12120f",fe="#ffffff",ni=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:de,onDark:de},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:fe,onDark:fe},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:de,onDark:de},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:fe,onDark:de},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:de,onDark:de},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:fe,onDark:de},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:fe,onDark:de},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:fe,onDark:de},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:fe,onDark:de},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:fe,onDark:fe},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:de,onDark:de},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:fe,onDark:de},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:fe,onDark:de},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:de,onDark:de},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:fe,onDark:de},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:fe,onDark:de},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:fe,onDark:de},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:fe,onDark:de},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:de,onDark:de},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:de,onDark:de},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:fe,onDark:de},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:fe,onDark:de},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:fe,onDark:de},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:fe,onDark:de},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:fe,onDark:de},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:fe,onDark:de},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:de,onDark:de},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:de,onDark:de},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:fe,onDark:de},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:de,onDark:de},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:fe,onDark:de},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:fe,onDark:de},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:de,onDark:de},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:fe,onDark:de},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:fe,onDark:de},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:fe,onDark:de}],hp=["semantic","muted","accent","categorical"];var Ny=new Map(ni.map(e=>[e.id,e])),bp={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},yp=new Map(ni.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),wp=/^[a-z][a-z0-9-]{0,47}$/,vp={version:4,families:hp.map(e=>({id:e,name:bp[e]})),colors:ni.map(e=>({id:e.id,familyId:e.family,name:yp.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},xp=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var Tp=xp(vp);function ai(){return Tp}var ri=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],tn="palette:",kp=/^#[0-9a-f]{6}$/i;function on(e){return e.startsWith(tn)&&wp.test(e.slice(tn.length))}function ye(e){return`${tn}${e}`}function Qo(e){return on(e)?e.slice(tn.length):void 0}function ud(e){if(typeof e!="string")return;let t=e.trim();return on(t)?t:kp.test(t)?t.toLowerCase():void 0}function Se(e){let t=Qo(e);return t?`var(--color-${t})`:e}function Lt(e){let t=Qo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function ii(e){let t=new Set(e.map(r=>Qo(r)??r.toLowerCase()));return ye(ri.find(r=>!t.has(r))??ri[0])}function pd(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=ri;return ye(r[Math.abs(t)%r.length])}function re(e){return e.trim().toLowerCase()}function Sp(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=re(i);!s||s===re(t)||r.has(s)||(r.add(s),n.push(i))}return n}function md(e){return`group_${re(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function He(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=re(i);if(!i||r.has(s))continue;r.add(s);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():md(i),u=ud(a.color)??ii(t.map(p=>p.color)),l=Sp(a.aliases,i,r);t.push({id:c,name:i,color:u,...l.length?{aliases:l}:{}})}return t}function Xt(e,t){let r=re(t??"");if(r)return e.find(n=>re(n.name)===r||(n.aliases??[]).some(a=>re(a)===r))}function ko(e,t){return Xt(t,e)?.name}function fd(e,t){let r=re(e??"");return r?Xt(t,e)?.color??pd(r):ye("primary-blue")}function rn(e){return ii(e.map(t=>t.color))}function si(e){let t={};for(let r of e){let n=re(r??"");n&&(t[n]=(t[n]??0)+1)}return t}function Ge(e,t=""){return typeof e=="string"?e:t}function nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function an(e){let t=Ge(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function gd(e){let t=Ge(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var Ap=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],zy=Object.fromEntries(Ap.map(e=>[e,{destination:"ask",recognize:!0}]));var Ep=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",It]);function Cp(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function di(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=Cp(e);if(!t||Ep.has(t)||t.startsWith(`${It}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Dp=16384,Ip=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Np(e){if(!e||e.length>Dp||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function Lp(e){try{let t=new URL(e);if(t.protocol!==`${As}:`||t.hostname!==Es)return null;let r=t.searchParams.get("realm")??"",n=qo(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!Ip.test(a))return null;let i=Np(t.searchParams.get("state")??""),s=t.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let c=t.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function So(e){let t=Lp(e);return t?.kind==="file"?t.relPath:null}function hd(e){return di(e)!==null}function Zt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var li=["auto","white","black"],er=40,Eo=40;var bd=["completed","canceled"],sn="statuses",tr=[{id:"open",labelKey:"todo.status.todo",color:ye("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ye("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ye("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ye("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ye("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ye("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ye("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ye("red"),done:!0,cls:"todo-st-canceled",locked:!1}],dn=ye("teal"),ci=tr,Co=tr.map(e=>e.id),Jt=tr.filter(e=>!e.locked).map(e=>e.id),Pp=tr.filter(e=>e.done).map(e=>e.id),Ao=new Map(tr.map(e=>[e.id,e])),ui=new Set(Jt);function tt(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function pi(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function ln(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Eo):"";if(!(!tt(a.id)||t.has(a.id)||!i)&&(t.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=er))break}return r}function mi(e,t){return Ao.has(e)?t.done?.[e]??Ao.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function or(e){if(typeof e=="string")return Co.includes(e)||tt(e)?e:void 0}function Ie(e){return e.status??(e.completed?"completed":"open")}function yd(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:mi(e,t),status:e}}var ut="todo.tasks",Pt="todo.task_tags",Qt="todo.task_links",eo="todo.task_attachments",Do="todo.focus_sessions",ot="todo.status_history";async function cn(e,t,r={},n){let a=[],i=r.cursor;do{n?.();let s=await e.data.dataset(t).query(r.select?{select:r.select,where:r.where,limit:1e3,cursor:i}:{where:r.where,limit:1e3,cursor:i});n?.(),a.push(...s.rows),i=s.cursor}while(i);return a}var Op=200;function wd(e,t=ut){let r=e?.keys;if(!Array.isArray(r)||!r.length||r.length>Op)return null;let n=t===ut?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var to=["normal","low","medium","high"];function un(e){return typeof e=="string"&&to.includes(e)}function vd(e){return/^([01]\d|2[0-3]):[0-5]\d$/.test(e)}function xd(e){return e===!0}function Mp(e){return un(e)?e:"normal"}function pn(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function _p(e){return Array.isArray(e)?e.filter(t=>nn(t)).map(t=>({startedAt:Ge(t.startedAt),endedAt:Ge(t.endedAt),activeMinutes:pn(t.activeMinutes)??0,pauseMinutes:pn(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function fi(e){return Array.isArray(e)?e.filter(t=>nn(t)).map(t=>({from:or(t.from),to:or(t.to),changedAt:Ge(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function zp(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function gi(e){if(typeof e!="string")return;let t=e.trim();if(t)return So(t)||hd(t)?t:void 0}function Fp(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>gi(n)).filter(n=>!!n))];return r.length?r:void 0}function Rp(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>Wt(r)).filter(r=>!!r))];return t.length?t:void 0}function Gp(e){if(!nn(e))return;let t=Ge(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function mn(e){let t=e,r=new Date().toISOString(),n=Ge(t.id,Zt("todo")),a=Ge(t.createdAt,r),i=_p(t.history),s=fi(t.statusHistory),c=or(tt(t.customStatus)?t.customStatus:t.status);return{id:n,title:Ge(t.title).trim(),completed:xd(t.completed)||c==="completed"||c==="canceled",priority:Mp(t.priority),dueDate:Ge(t.dueDate),reminderOffsets:Array.isArray(t.reminderOffsets)?t.reminderOffsets:void 0,reminderTime:an(t.reminderTime),startTime:an(t.startTime),endTime:an(t.endTime),color:gd(t.color),note:Ge(t.note),tags:Array.isArray(t.tags)?t.tags.filter(u=>typeof u=="string"&&!!u.trim()).map(u=>u.trim()):[],estimatedMinutes:pn(t.estimatedMinutes),actualMinutes:pn(t.actualMinutes),history:i.length?i:void 0,statusHistory:s.length?s:void 0,status:c,filePath:Wt(t.filePath),group:Ge(t.group).trim()||void 0,flagged:xd(t.flagged)||void 0,urls:Fp(t.urls),attachments:Rp(t.attachments),location:Gp(t.location),remindAt:zp(t.remindAt),reminderFiredAt:Ge(t.reminderFiredAt)||void 0,createdAt:a,updatedAt:Ge(t.updatedAt,a)}}function Ot(e,t,r){let n=(l,p=!1)=>{let g=new Map;for(let h of l){let m=g.get(h.taskId);m?m.push(h):g.set(h.taskId,[h])}if(p)for(let h of g.values())h.sort((m,y)=>Number(m.position)-Number(y.position));return g},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),c=n(t.sessions,!0),u=n(t.statusHistory,!0);return e.map(l=>mn({...l,tags:(a.get(l.id)??[]).map(p=>p.tag),urls:(i.get(l.id)??[]).map(p=>p.url),attachments:(s.get(l.id)??[]).map(p=>p.path),history:c.get(l.id)??[],statusHistory:u.get(l.id)??[]})).map(l=>({...l,group:ko(l.group,r)??l.group})).filter(l=>l.title)}var rr=[ut,Pt,Qt,eo],$p=[...rr,Do,ot],fn=rr;function Up(e,t){let r=xe(),n=!0,a=!1,i=()=>{a||(a=!0,queueMicrotask(()=>{a=!1,n&&t()}))},s=e.map(l=>r.api.data.dataset(l).subscribe(i)),c=()=>{n=!1,s.forEach(l=>l())},u=r.onDispose(c);return()=>{u(),c()}}function Mt(e){return Up(fn,e)}function Sd(e){let t=rr.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}function hi(e,t,r=xe(),n){return cn(r.api,e,{where:t,cursor:n},r.assertActive)}var jp=e=>!!e&&typeof e=="object"&&"code"in e&&e.code==="limit-exceeded";async function Kp(e,t){let r=e.map(()=>[]),n=e.map((a,i)=>({...a,index:i,cursor:void 0}));for(;n.length;){t.assertActive();let a=n.map(s=>({operation:"query",dataset:s.dataset,query:{where:s.where,limit:1e3,cursor:s.cursor}})),i;try{i=(await t.api.data.snapshot(a)).values}catch(s){if(!jp(s))throw s;(await Promise.allSettled(n.map(u=>hi(u.dataset,u.where,t,u.cursor)))).forEach((u,l)=>{if(u.status==="rejected")throw u.reason;r[n[l].index].push(...u.value)});break}t.assertActive(),n=n.flatMap((s,c)=>{r[s.index].push(...i[c].rows);let u=i[c].cursor;return u?[{...s,cursor:u}]:[]})}return r}async function bi(e,t,r){let n=r?typeof r=="string"?r:{in:r}:void 0,a=n===void 0?void 0:{taskId:n},i=[Qt,eo,...t?[Do,ot]:[]],[s,c,u,l,p=[],g=[]]=await Kp([{dataset:ut,where:n===void 0?void 0:{id:n}},{dataset:Pt,where:a},...i.map(h=>({dataset:h,where:a}))],e);return e.assertActive(),{tasks:s,relations:{tags:c,links:u,attachments:l,sessions:p,statusHistory:g}}}async function Vp(e,t,r){let{tasks:n,relations:a}=await bi(e,t,r);return Ot(n,a,He(e.api.getState().groups))}var Td=new WeakMap;function nr(e,t,r,n,a){try{e.assertActive()}catch(u){return Promise.reject(u)}let i=Td.get(e);i||(i=new Map,Td.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let u=s,l=r.map(p=>e.api.data.dataset(p).subscribe(()=>{u.revision++}));e.onDispose(()=>{l.forEach(p=>p()),i.clear()}),i.set(t,s)}let c=s.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let u=s.revision,l=await a();if(e.assertActive(),u===s.revision)return l}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,c)),c}function Ad(e,t){let r=xe();return nr(r,e?"full":"calendar",e?$p:rr,t??"",()=>Vp(r,e,t))}var kd=new WeakMap,Bp=0;function Hp(e,t){let r=kd.get(e);r||(r=new Map,kd.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++Bp),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function Wp(e,t,r){return nr(e,"statusHistory",[ot],r.key,async()=>{let n=await hi(ot,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),fi(n)})}function Ed(e){let t=xe(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=Hp(t,e),s=0,c=!1,u=()=>{let h=++s;Wp(t,e,a).then(m=>{!c&&h===s&&n({scope:t,id:e,history:m})}).catch(()=>{})},l=t.api.data.dataset(ot).subscribe(h=>{(!h.keys||h.keys.some(m=>m.taskId===e))&&u()}),p=()=>{c=!0,l(),i()},g=t.onDispose(p);return u(),()=>{g(),p()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function yi(){return Ad(!0)}async function Ze(e){return e?(await Ad(!0,e))[0]??null:null}function Cd(e,t,r,n){let a=xe();return nr(a,"calendarPage",rr,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(ut).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let h=[];for(let m=0;m<i.rows.length;m+=100)h.push(...await hi(g,{taskId:{in:i.rows.slice(m,m+100).map(y=>String(y.id))}},a));return h},c=await Promise.allSettled([s(Pt),s(Qt),s(eo)]),[u,l,p]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:Ot(i.rows,{tags:u,links:l,attachments:p,sessions:[],statusHistory:[]},He(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function _t(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function wi(e,t,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i:null}catch{return null}}async function vi(e,t,r,n,a=!1){let i=await wi(e,t,r,n,a);return i?i.record??t:null}async function xi(e,t,r,n){return await vi(e,t,r,n)!==null}function Ti(e,t,r){return vi(e,t,r)}async function ar(e,t){return await vi(e,t,void 0,void 0,!0)!==null}async function zt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}function ir(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function ki(e){let t=ir(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}var Dd=new WeakMap;function qp(e){let t=Dd.get(e);if(!t){let r=e.title.toLowerCase(),n=e.note.toLowerCase();t={tags:(e.tags??[]).map(a=>a.toLowerCase()),withGroup:[r,n,(e.group??"").toLowerCase()],withoutGroup:[r,n]},Dd.set(e,t)}return t}function gn(e,t=!0){let r=ir(e);return!r.tags.length&&!r.text?()=>!0:n=>{let a=qp(n);for(let i of r.tags)if(!a.tags.some(s=>s.startsWith(i)))return!1;return!r.text||(t?a.withGroup:a.withoutGroup).some(i=>i.includes(r.text))}}var Si=100;function Ft(e,t,r,n,a){return cn(e,t,{select:r,where:n},a)}var Yp={tags:[],links:[],attachments:[],sessions:[],statusHistory:[]};async function Id(e,t,r){let[n,a]=await Promise.all([Ft(e,ut,t,r.where,r.assertActive),r.withTags?Ft(e,Pt,["taskId","tag"],void 0,r.assertActive):[]]);return Ot(n,{...Yp,tags:a},r.groups)}async function Nd(e,t,r){let n=[...new Set(t)],a=new Map;for(let i=0;i<n.length;i+=Si){let s=n.slice(i,i+Si),c={taskId:{in:s}},[u,l,p,g,h,m]=await Promise.all([Ft(e,ut,void 0,{id:{in:s}},r.assertActive),Ft(e,Pt,void 0,c,r.assertActive),Ft(e,Qt,void 0,c,r.assertActive),Ft(e,eo,void 0,c,r.assertActive),Ft(e,Do,void 0,c,r.assertActive),Ft(e,ot,void 0,c,r.assertActive)]);for(let y of Ot(u,{tags:l,links:p,attachments:g,sessions:h,statusHistory:m},r.groups))a.set(y.id,y)}return n.flatMap(i=>a.get(i)??[])}var Ld=Si;function we(e=[]){return e.map(t=>ko(t.name,e)??t.name)}var Pd=()=>[];function Od(e){Pd=e}function Ne(e,t){return fd(e,Xt(t,e)?t:Pd())}async function Md(e,t,r,n){let a=new Map,i=e.data.dataset(ot);for(let s=0;s<t.length;s+=20){let c=t.slice(s,s+20),u=new Map;for(;c.length;){r();let l=await i.aggregate({where:{taskId:{in:c},or:["completed","canceled"].map(g=>({to:g,from:{in:n().filter(h=>h!==g)}})),...u.size?{and:[{or:c.map(g=>({taskId:g,position:{lt:u.get(g)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!l.length)break;let p=await i.query({select:["taskId","changedAt"],where:{or:l.map(g=>({taskId:g.taskId,position:g.position}))},limit:20});r(),c=[];for(let g of p.rows){let h=String(g.taskId);if(typeof g.changedAt=="string"&&g.changedAt)a.set(h,{changedAt:g.changedAt});else{let m=l.find(y=>y.taskId===h)?.position;if(typeof m!="number"||!Number.isInteger(m))throw new Error("Invalid completion position");u.set(h,m),c.push(h)}}}}return a}function hn(e){return"historyLoaded"in e&&e.historyLoaded===!1}var _d={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists and statuses","todo.settings.section.groups":"Groups","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do-only groups","todo.settings.localGroupsDesc":"Private to To-Do: create, rename, colour and reorder them here.","todo.settings.useSharedGroups":"Shared groups","todo.settings.useSharedGroupsDesc":"Groups that Calendar, Contacts and Workspace use too. A change here changes them everywhere.","todo.settings.useLocalGroups":"To-Do-only groups","todo.settings.useLocalGroupsDesc":"Groups that exist only in To-Do. No other plugin sees them.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupRemove":"Remove group","todo.settings.localGroupRemoveBlocked":"Still used by {{count}} tasks \u2014 move them to another group to delete it","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.settings.localGroupUsage":"{{count}} tasks use this group","todo.settings.localGroupNewColor":"Color of the new group","todo.settings.localGroupDuplicate":"A group with that name already exists.","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59)."};var zd={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen und Status","todo.settings.section.groups":"Gruppen","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.localGroupsDesc":"Geh\xF6ren nur zu Aufgaben: hier erstellen, umbenennen, einf\xE4rben und neu ordnen.","todo.settings.useSharedGroups":"Gemeinsame Gruppen","todo.settings.useSharedGroupsDesc":"Gruppen, die auch Kalender, Kontakte und Arbeitsbereiche verwenden. Eine \xC4nderung hier \xE4ndert sie \xFCberall.","todo.settings.useLocalGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.useLocalGroupsDesc":"Gruppen, die es nur in Aufgaben gibt. Kein anderes Plugin sieht sie.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupRemove":"Gruppe entfernen","todo.settings.localGroupRemoveBlocked":"Wird noch von {{count}} Aufgaben verwendet \u2014 Aufgaben zuerst in eine andere Gruppe verschieben","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.settings.localGroupUsage":"{{count}} Aufgaben verwenden diese Gruppe","todo.settings.localGroupNewColor":"Farbe der neuen Gruppe","todo.settings.localGroupDuplicate":"Eine Gruppe mit diesem Namen existiert bereits.","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59)."};var Fd={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas y estados","todo.settings.section.groups":"Grupos","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos solo de Tareas","todo.settings.localGroupsDesc":"Privados de Tareas: cr\xE9alos, ren\xF3mbralos, color\xE9alos y reord\xE9nalos aqu\xED.","todo.settings.useSharedGroups":"Grupos compartidos","todo.settings.useSharedGroupsDesc":"Grupos que tambi\xE9n usan Calendario, Contactos y Espacios de trabajo. Un cambio aqu\xED los cambia en todas partes.","todo.settings.useLocalGroups":"Grupos solo de Tareas","todo.settings.useLocalGroupsDesc":"Grupos que solo existen en Tareas. Ning\xFAn otro plugin los ve.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupRemove":"Quitar grupo","todo.settings.localGroupRemoveBlocked":"Todav\xEDa lo usan {{count}} tareas: mu\xE9velas a otro grupo para eliminarlo","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.settings.localGroupUsage":"{{count}} tareas usan este grupo","todo.settings.localGroupNewColor":"Color del nuevo grupo","todo.settings.localGroupDuplicate":"Ya existe un grupo con ese nombre.","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59)."};var Rd={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes et statuts","todo.settings.section.groups":"Groupes","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.localGroupsDesc":"R\xE9serv\xE9s \xE0 T\xE2ches : cr\xE9ez-les, renommez-les, colorez-les et r\xE9organisez-les ici.","todo.settings.useSharedGroups":"Groupes partag\xE9s","todo.settings.useSharedGroupsDesc":"Groupes qu\u2019utilisent aussi Calendrier, Contacts et Espaces de travail. Une modification ici les modifie partout.","todo.settings.useLocalGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.useLocalGroupsDesc":"Groupes qui n\u2019existent que dans T\xE2ches. Aucun autre plugin ne les voit.","todo.settings.localGroupName":"Nom","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupRemove":"Supprimer le groupe","todo.settings.localGroupRemoveBlocked":"Encore utilis\xE9 par {{count}} t\xE2ches \u2014 d\xE9placez-les dans un autre groupe pour le supprimer","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.settings.localGroupUsage":"{{count}} t\xE2ches utilisent ce groupe","todo.settings.localGroupNewColor":"Couleur du nouveau groupe","todo.settings.localGroupDuplicate":"Un groupe portant ce nom existe d\xE9j\xE0.","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59)."};var Gd={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868\u548C\u72B6\u6001","todo.settings.section.groups":"\u5206\u7EC4","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5C5E\u4E8E\u5F85\u529E\u4E8B\u9879\uFF1A\u5728\u6B64\u521B\u5EFA\u3001\u91CD\u547D\u540D\u3001\u7740\u8272\u548C\u6392\u5E8F\u3002","todo.settings.useSharedGroups":"\u5171\u4EAB\u5206\u7EC4","todo.settings.useSharedGroupsDesc":"\u65E5\u5386\u3001\u8054\u7CFB\u4EBA\u548C\u5DE5\u4F5C\u533A\u4E5F\u4F1A\u4F7F\u7528\u7684\u5206\u7EC4\u3002\u5728\u6B64\u5904\u7684\u66F4\u6539\u4F1A\u540C\u6B65\u5230\u6240\u6709\u5730\u65B9\u3002","todo.settings.useLocalGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.useLocalGroupsDesc":"\u4EC5\u5B58\u5728\u4E8E\u5F85\u529E\u4E8B\u9879\u4E2D\u7684\u5206\u7EC4\u3002\u5176\u4ED6\u63D2\u4EF6\u90FD\u770B\u4E0D\u5230\u5B83\u4EEC\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupRemove":"\u79FB\u9664\u5206\u7EC4","todo.settings.localGroupRemoveBlocked":"\u4ECD\u6709 {{count}} \u4E2A\u4EFB\u52A1\u5728\u4F7F\u7528 \u2014 \u5C06\u5B83\u4EEC\u79FB\u5230\u5176\u4ED6\u5206\u7EC4\u540E\u624D\u80FD\u5220\u9664","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupUsage":"{{count}} \u4E2A\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4","todo.settings.localGroupNewColor":"\u65B0\u5206\u7EC4\u7684\u989C\u8272","todo.settings.localGroupDuplicate":"\u5DF2\u5B58\u5728\u540C\u540D\u5206\u7EC4\u3002","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002"};var $d={en:_d,de:zd,es:Fd,fr:Rd,"zh-CN":Gd};function Ud(e,t){return($d.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var jd=Ud;function Kd(e){e.ui.registerCatalogs($d),jd=(t,r)=>{let n=e.ui.t(t,r);return n===t?Ud(t,r):n}}function d(e,t){return jd(e,t)}var Vd={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},tm={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},om={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},Bd=()=>{};function Hd(e){Bd=e}function Wd(e){let t=Vd[e];return t?d(t):e}function rt(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=Bd(e);if(r)return r;let n=Vd[e];return n?d(n):t||e}function $e(e){return d(tm[e])}function qd(e){return d(om[e])}function rm(e){if(typeof e!="string"||!on(e))return!1;let t=Qo(e);if(!t)return!1;let r=ai();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function yn(e){let t=e&&typeof e=="object"?e:{},r=ln(t.custom),n=new Set(r.map(v=>v.id)),a=Array.isArray(t.active)?t.active:Jt,i=[];for(let v of a)typeof v!="string"||!(ui.has(v)||n.has(v))||i.includes(v)||i.push(v);let s=[...Co,...r.map(v=>v.id)],c=v=>v&&typeof v=="object"?v:{},u=c(t.colors),l=Object.fromEntries(s.map(v=>{let C=Ao.get(v)?.color??dn;return[v,rm(u[v])?u[v]:C]})),p=c(t.textColors),g=Object.fromEntries(s.map(v=>[v,li.includes(p[v])?p[v]:"auto"])),h=c(t.strikethrough),m=Object.fromEntries(s.map(v=>[v,typeof h[v]=="boolean"?h[v]:bd.includes(v)||r.some(C=>C.id===v&&C.done)])),y="text",w=(v,C)=>typeof v=="string"?v.replace(/[\u0000-\u001f]/g," ").trim().slice(0,C):"",_=(Array.isArray(t.removed)?t.removed:[]).filter(v=>typeof v=="string"&&ui.has(v)),F=Object.fromEntries(s.map(v=>[v,w(c(t.labels)[v],Eo)]).filter(([,v])=>v)),P=Object.fromEntries(s.filter(v=>v!=="open"&&v!=="completed").map(v=>[v,w(c(t.icons)[v],80)]).filter(([,v])=>v&&/^[^/\\]+$/.test(v))),D=Object.fromEntries(Jt.map(v=>[v,c(t.done)[v]]).filter(([v,C])=>typeof C=="boolean"&&C!==Ao.get(v)?.done));return{active:i.filter(v=>!_.includes(v)),custom:r,colors:l,textColors:g,strikethrough:m,style:y,labels:F,icons:P,done:D,removed:[...new Set(_)]}}var sr=null;function ze(){let e=f?.settings.get()[sn],t=ai();if(sr&&sr.raw===e&&sr.palette===t)return sr.value;let r=yn(e);return sr={raw:e,palette:t,value:r},r}function Yd(e){f.settings.set(sn,yn(e))}Hd(e=>{let t=ze();return t.labels[e]??t.custom.find(r=>r.id===e)?.label});function oo(e=ze()){return[...Co,...e.custom.map(t=>t.id)]}function dr(e,t=ze()){return mi(e,t)}function Ce(e,t){return yd(e,t??ze())}function nm(e){return`todo-st-${e}`}function am(e,t=ze()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":Lt(t.colors[e]??dn)}function Ee(e,t=ze()){let r=e&&tt(e)?t.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??dn,done:r.done,cls:nm(r.id),locked:!1,custom:!0};let n=e&&Ao.get(e)||ci[0];return{...n,label:t.labels[n.id]??rt(n.id),done:t.done[n.id]??n.done,color:t.colors[n.id],custom:!1}}function bn(e=ze()){return[Ee("open",e),Ee("completed",e),...e.active.map(t=>Ee(t,e))]}function ro(){return bn().map(e=>e.id)}function Xd(e){return e==="open"||e==="completed"||ze().active.includes(e)}function pt(){let[e,t]=o.useState(()=>bn());return o.useEffect(()=>f.settings.subscribe(()=>t(bn())),[]),e}function Io(e,t=ro()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function No(e,t){return t==="all"||t.includes(Ie(e))}function mt(){return bn().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:Se(e.color)}))}function im(){let e=ze();return oo(e).map(t=>{let r=Ee(t,e),n=Se(r.color),a=am(t,e),i=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${a}}`+i}).join("")}function Zd(){let[e,t]=o.useState(()=>ze().style);return o.useEffect(()=>f.settings.subscribe(()=>t(ze().style)),[]),e}function Jd(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=im()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}var sm=200,Ai=new WeakMap;function dm(e){let t=Ai.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=fn.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=wd(i,a);if(!s){r.full=!0,r.dirty.clear();return}for(let c of s)r.dirty.add(c);r.dirty.size>sm&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Ai.delete(e)}),Ai.set(e,r),t=r,t}var wn=new WeakMap;function lm(e){let t=wn.get(e);if(!t){let r=e.api.backend.call("records.completionReady").then(n=>n===!0,()=>!1);r.then(n=>{!n&&wn.get(e)===r&&wn.delete(e)}),wn.set(e,r),t=r}return t}async function Qd(e,t,r){let n=[],a=new Map,i=He(e.api.getState().groups);for(let u=0;u<(r?.length??1);u+=100){let{tasks:l,relations:p}=await bi(e,!1,r?.slice(u,u+100));for(let g of l)typeof g.completedAt=="string"&&g.completedAt&&a.set(String(g.id),g.completedAt);n.push(...Ot(l,p,i))}let s=t?[]:n.filter(u=>!a.has(u.id)).map(u=>u.id),c=s.length?await Md(e.api,s,e.assertActive,()=>oo()):new Map;return n.map(u=>{let l=a.get(u.id);return{...u,historyLoaded:!1,completionSummary:l?{changedAt:l}:c.get(u.id)??null}})}function Je(e=xe()){try{e.assertActive()}catch(t){return Promise.reject(t)}return lm(e).then(t=>cm(e,t))}function cm(e,t){let r=dm(e);return nr(e,"list",fn,"",async()=>{let n=JSON.stringify(He(e.api.getState().groups));if(r.full||!r.value||r.groups!==n){r.full=!1,r.dirty.clear();try{r.value=await Qd(e,t),r.groups=n}catch(l){throw r.full=!0,l}return r.value}if(!r.dirty.size)return r.value;let a=[...r.dirty];r.dirty.clear();let i;try{i=await Qd(e,t,a)}catch(l){for(let p of a)r.dirty.add(p);throw l}let s=new Map(i.map(l=>[l.id,l])),c=new Set(a),u=[];for(let l of r.value)if(!c.has(l.id))u.push(l);else{let p=s.get(l.id);p&&(u.push(p),s.delete(l.id))}return u.push(...s.values()),r.value=u,u})}var Ei="localGroups",vn=200,cr=60,lr=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function el(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ci(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(i=>[i.name,...i.aliases??[]]).map(re)),n=new Set,a=[];for(let i of e){if(!i||typeof i!="object")continue;let s=i,c=lr(s.id,64),u=lr(s.name,cr),l=lr(s.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(c)||n.has(c)||!u||r.has(re(u))||!l)continue;let p=Array.isArray(s.aliases)?[...new Set(s.aliases.map(g=>lr(g,cr)).filter(g=>g&&re(g)!==re(u)&&!r.has(re(g))))].slice(0,20):[];if(n.add(c),r.add(re(u)),p.forEach(g=>r.add(re(g))),a.push({id:c,name:u,color:l,...p.length?{aliases:p}:{}}),a.length>=vn)break}return a}function tl(e,t){let r=lr(t,cr);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>re(a)!==re(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Di(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}var Ni="useSharedGroups",Li="useLocalGroups";function Ii(){let e=f?.settings.get()??{};return{shared:e[Ni]!==!1,local:e[Li]!==!1}}function xn(){return He(f?.getState().groups)}function ur(){return Ci(f?.settings.get()[Ei],xn())}async function ol(e){await f.settings.set(Ei,Ci(e,xn()))}function pr(){return Di(xn(),ur())}function nt(){let e=Ii();return Di(e.shared?xn():[],e.local?ur():[])}Od(pr);function mr(e){let t=f.subscribe(e),r=f.settings.subscribe(e);return()=>{t(),r()}}function at(){let[e,t]=o.useState(nt);return o.useEffect(()=>mr(()=>t(nt())),[]),e}function rl(){let[e,t]=o.useState(pr);return o.useEffect(()=>mr(()=>t(pr())),[]),e}function nl(){let[e,t]=o.useState(Ii);return o.useEffect(()=>f.settings.subscribe(()=>t(Ii())),[]),e}function al(){let[e,t]=o.useState(ur);return o.useEffect(()=>mr(()=>t(ur())),[]),e}function il(){let e=xe(),t=!1,r=()=>{Je(e).then(a=>{if(e.assertActive(),t)return;let i=new Set(ur().flatMap(s=>[s.name,...s.aliases??[]]).map(re));e.api.workspace.reportGroupUsage(si(a.map(s=>s.group).filter(s=>!s||!i.has(re(s)))))}).catch(()=>{})};r();let n=Mt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function um(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function pm(e){let t=e.toLowerCase();return um(t)?t:"yyyy-mm-dd"}function sl(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return pm(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var mm="ddd d mmm",fm=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function gm(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!fm.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function hm(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return gm(t)?t:mm}var fr=new Map;function bm(e,t,r){let n=`${r??""}:${t}`,a=fr.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),fr.size>=64&&fr.delete(fr.keys().next().value),fr.set(n,a)),a.format(e)}function dl(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,c=new Date(Number(a),Number(i)-1,Number(s),12);return hm(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,u=>u==="d"?String(Number(s)):u==="dd"?s:u==="yyyy"?a:bm(c,u,r))}function ue(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Tn(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function ft(e,t){let r=Tn(e);return r?(r.setDate(r.getDate()+t),ue(r)):e}var We=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}],gr={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},kn={high:3,medium:2,low:1,normal:0},ll=new Intl.Collator(void 0,{sensitivity:"base"});function no(e,t){return ll.compare(e.title,t.title)}function ym(e,t,r){if(r==="name")return no(e,t);if(r==="priority"){let i=kn[t.priority]-kn[e.priority];return i!==0?i:gt(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:gt(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return gt(e,t);if(!i)return-1;if(!s)return 1;let c=i.localeCompare(s);return c!==0?c:gt(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:no(e,t)}function Pi(e,t){let r=kn[t.priority]-kn[e.priority];return r!==0?r:no(e,t)}function gt(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Pi(e,t)}function cl(e,t,r){let n=new Map(e.map(i=>[i,t(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,s)=>{let c=n.get(i),u=n.get(s);if(a(c)!==a(u))return a(c)?1:-1;let l=0;return!a(c)&&!a(u)&&(l=typeof c=="number"&&typeof u=="number"?c-u:ll.compare(String(c),String(u))),l!==0?r==="asc"?l:-l:no(i,s)})}function Lo(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",c=a.dueDate||"";if(!s&&!c)return gt(n,a);if(!s)return-1;if(!c)return 1;let u=c.localeCompare(s);return u!==0?u:gt(n,a)}let i=ym(n,a,t);return r==="asc"?i:-i})}function Ue(e,t="dd-mm-yyyy"){return e?sl(e,t):""}function Sn(e,t,r="ddd d mmm"){return dl(e.slice(0,10),r,t)}function Qe(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,c,u]=i.split("-").map(Number),[l,p,g]=t.split("-").map(Number);if(!s||!c||!u||!l||!p||!g)return Ue(e,a);let h=new Date(s,c-1,u),m=new Date(l,p-1,g),y=Math.round((h.getTime()-m.getTime())/864e5);return y===1?r.tomorrow:y===-1?r.yesterday:y>1&&y<7?h.toLocaleDateString(n,{weekday:"long"}):Ue(e,a)}var cv=new Date(2023,0,1,12);var wm={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function hr(e){return wm[e??""]??1}function ul(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function vm(e,t){return(e.getDay()-t+7)%7}function pl(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-vm(e,t))}function ao(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var br=["overdue","today","upcoming","someday","completed"],ml={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"},dt=(e=new Date)=>ue(e);function An(e,t=dt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||gt(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(gt),r.someday.sort(Pi),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||no(a,i)),r}function Oi(e){return hn(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Mi(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):dt(t)}function fl(e){let t=new Map(e.map(a=>[a,Oi(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||no(a,i)),n=new Map;for(let a of r){let i=Mi(t.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function _i(e,t,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?t==="monthly"?c.slice(0,7):t==="daily"?c:dt(pl(ao(c),r)):"",s=new Map;for(let c of e){let u=i(a(c)),l=s.get(u);l?l.push(c):s.set(u,[c])}return[...s.entries()].sort(([c],[u])=>c===""?-1:u===""?1:u.localeCompare(c)).map(([c,u])=>({key:c,kind:c?t:"none",todos:u}))}function En(e,t=dt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,c,u)=>{let l=u.toLowerCase();if(l==="today")r=t;else if(l==="tomorrow"){let p=new Date(`${t}T00:00:00`);p.setDate(p.getDate()+1),r=dt(p)}else r=u;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,c,u)=>(n=u.length>=3?"high":u.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var je={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},gl={open:je,get:je,"edit-fields":je,add:je,complete:je,done:je,reopen:je,cancel:je,pause:je,status:je,edit:je,"open-page":{type:"null"},search:{type:"array",items:je,maxItems:20},list:{type:"array",items:je,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:je,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Rt={type:"string"},zi={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Rt])),priority:{type:"string",enum:to},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Rt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Rt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function hl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in zi.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!to.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!ro().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!vd(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}var Le=e=>typeof e=="string"?e:"",vl=e=>Le(e?.query).trim();function Po(){return new Date().toISOString()}function bl(e){let t=e.trim();if(!t)return;let r=Xt(nt(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function yl(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return ue();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),ue(t)}return e}function xm(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function Cn(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Tm(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}function In(){let e=xe(),t={groups:He(e.api.getState().groups),assertActive:e.assertActive};return{light:(r,n={})=>Id(e.api,r,{...t,...n}),byIds:r=>Nd(e.api,r,t)}}async function Fi(e){let t=e.trim();if(!t)throw new Error("Expected a todo id or title.");let r=In(),n=await r.light(["id","title"],{where:{id:t}}),a=Tm(n.length?n:await r.light(["id","title"]),e),[i]=await r.byIds([a.id]);if(!i)throw new Error(`No todo matching "${t}".`);return i}var Dn={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=vl(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function yr(e,t,r){let n=await Fi(e),a=t(n),i=await Ti(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await ar(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await ar(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function wl(e){return yr(e,t=>({...t,completed:!0,status:"completed",updatedAt:Po()}),t=>`Complete \u201C${t.title}\u201D`)}async function km(e,t,r){let n=await Ze(e);if(!n)throw new Error("The task no longer exists.");if(r!==void 0&&n.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&t.group!==n.group&&!we(nt()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let a=mn({...n,...t,...t.status?Ce(t.status):t.completed!==void 0?Ce(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:Po()});if(t.filePath&&a.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(t[s]?.some(c=>!a[s]?.includes(c)))throw new Error(`Invalid task ${s}.`);let i=await Ti(e,a,n.updatedAt);if(!i)throw new Error("Could not save the task.");return{value:a,revert:{label:`Edit \u201C${n.title}\u201D`,run:async()=>{if(!await ar(e,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await ar(e,i))throw new Error("Could not reapply the task edit.")}}}}async function ht(e){let t=e??{},r=t.id??t.query,n={groups:nt(),statuses:ro()};if(!r)return n;let a=await Fi(r);return{...n,records:[a]}}function xl(e){let t=n=>{let a=gl[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Rt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Le(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Ze(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),_e().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Rt},required:["id"],additionalProperties:!1},parse:n=>{let a=Le(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Ze(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Rt,values:zi,expectedUpdatedAt:Rt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Le(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:hl(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>km(n,a,i),revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Le(a.due),priority:Le(a.priority),status:Le(a.status),note:Le(a.note),group:Le(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:c,group:u})=>{let l=ro();if(s&&!l.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${l.join(", ")}`);let p=mn({title:n,priority:i||"normal",status:s||void 0,dueDate:yl(a),note:c,group:bl(u)});if(!await _t(p))throw new Error("Failed to add todo.");return{value:p,revert:{label:`Add todo \u201C${p.title}\u201D`,run:async()=>{await zt(p.id)},reapply:async()=>{await _t(p)}}}},formatCli:n=>`Added: ${Cn(n)}`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Dn,run:({query:n})=>wl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Dn,run:({query:n})=>wl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=vl(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=ki(n),i=In(),s=await i.light(["id","title","note"],{withTags:ir(n).tags.length>0});return i.byIds(s.filter(c=>a(c.tags,c.title,c.note)).slice(0,20).map(c=>c.id))},formatCli:n=>n.length?n.map(Cn).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Dn,run:({query:n})=>yr(n,a=>({...a,completed:!1,status:"open",updatedAt:Po()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Dn,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!Xd(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return yr(a,s=>({...s,...Ce(i),updatedAt:Po()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>ht(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim(),s=Le(a.status),c=ro();if(!i||!c.includes(s))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>yr(n,i=>({...i,...Ce(a),updatedAt:Po()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim(),s=Le(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!to.includes(s))throw new Error(`Invalid priority "${s}". One of: ${to.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?xm(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:c,tags:u,group:l})=>yr(n,p=>({...p,title:a??p.title,priority:i??p.priority,dueDate:s===void 0?p.dueDate:yl(s),note:c??p.note,tags:u??p.tags,group:l===void 0?p.group:bl(l),updatedAt:Po()}),p=>`Edit \u201C${p.title}\u201D`),formatCli:n=>`Edited: ${Cn(n)}`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await Fi(n);if(!a)return{value:{deleted:!1,todo:i,deletedCount:0},revert:null};if(!await zt(i.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:i,deletedCount:1},revert:{label:`Delete \u201C${i.title}\u201D`,run:async()=>{await _t(i)},reapply:async()=>{await zt(i.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>ht(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Le(a.section),q:Le(a.q)}},fromCli:(n,a)=>({section:Le(a.section),q:Le(a.q??a.search)})},run:async({section:n,q:a})=>{let i;if(a){let s=ki(a),c=ir(a);if(c.tags.length||c.text){let u=In(),l=(await u.light(["id","title","note"],{withTags:c.tags.length>0})).filter(p=>s(p.tags,p.title,p.note)).map(p=>p.id);l.length<=Ld&&(i=await u.byIds(l))}i??(i=(await yi()).filter(u=>s(u.tags,u.title,u.note)))}return i??(i=await yi()),n&&br.includes(n)?An(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(Cn).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await In().light(["id","title","group"]),a=nt();return we(a).map(i=>({name:i,count:n.filter(s=>re(s.group??"")===re(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var Tl={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var Am=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Em=/^-\s+(.*)$/,Cm=/^[A-Za-z][\w+.-]*:\/\//;function kl(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(Em);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=Cm.test(a)?null:a.match(Am);if(s){let c=s[1].trim().toLowerCase(),u=s[2].trim();u===""?(r=c,t.lists[c]=t.lists[c]??[]):(r=null,t.values[c]=u);continue}r=null,t.bare===null&&(t.bare=a)}return t}function Sl(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}async function Nn(e){if(!e.id||!e.title.trim())return!1;let t=await _t(e);return t&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await zt(e.id)}),redo:async()=>({ok:await _t(e)})}),t}async function io(e,t,r,n){if(!e||!t.title.trim())return!1;let a=hn(t),i=a?{...t}:t;a&&(delete i.historyLoaded,delete i.completionSummary);let s=await wi(e,i,r,n),c=s?.previous,u=c?.title?{...c,group:ko(c.group,He(f.getState().groups))??c.group}:null,l=a?{...i,history:t.history===void 0?u?.history:t.history}:t,p=s!==null;return p&&u&&f.undo.push({label:d("todo.undo.edit",{title:u.title}),undo:async()=>({ok:await xi(e,u)}),redo:async()=>({ok:await xi(e,l)})}),p}async function Ln(e){let t=await Ze(e),r=await zt(e);return r&&t&&f.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await _t(t)}),redo:async()=>({ok:await zt(e)})}),r}async function bt(e,t){return await f.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function Ri(e,t){let r=await Ze(e);return r?io(e,{...r,...Ce(t),updatedAt:new Date().toISOString()}):!1}var Gi="notes-todo-fence-styles";function Dm(){if(document.getElementById(Gi))return;let e=document.createElement("style");e.id=Gi,e.textContent=`
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
`,document.head.appendChild(e)}var Al=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},Im=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function Nm(e,t){let r=Al(),n=Im(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Lm=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let p=xe(),g=!0,h=()=>{Je(p).then(y=>{p.assertActive(),g&&r(y)}).catch(()=>{})};h();let m=Mt(h);return()=>{g=!1,m()}},[]);let n=kl(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:Sl(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let c=Nm(t,s),u=Al(),l=p=>{let g={...p,completed:!p.completed,status:p.completed?"open":"completed"};r(h=>h&&h.map(m=>m.id===p.id?g:m)),io(p.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:p=>f.workspace.openMainTab({newTab:f.ui.hasModKey(p)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},c.length,s.due?` \xB7 ${s.due}`:"")),c.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),c.map(p=>o.createElement("div",{key:p.id,className:`todo-fence-row ${p.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:p.completed,onChange:()=>l(p),"aria-label":p.title}),p.priority!=="normal"&&o.createElement("span",{className:`pri pri-${p.priority}`},We.find(g=>g.id===p.priority)?.symbol),o.createElement("span",{className:"t"},p.title),p.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),p.dueDate&&o.createElement("span",{className:`due ${!p.completed&&p.dueDate<u?"overdue":""}`},p.dueDate))))};function El(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Dm(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(Lm,{code:t}))),{examples:Tl.todo});return()=>{e(),document.getElementById(Gi)?.remove()}}var Ui=".valley/assets/icons/todo-icon",Pm=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),Om=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function Mm(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let t=new DOMParser().parseFromString(e,"image/svg+xml"),r=t.documentElement;if(r.localName!=="svg"||t.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!Pm.has(n.tagName)){n.remove();continue}for(let a of[...n.attributes])(!Om.has(a.name)||/url\s*\(|javascript:|expression\s*\(/i.test(a.value))&&n.removeAttribute(a.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function _m(e,t){let n=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;for(let c of n.querySelectorAll("*"))for(let u of["stroke","fill"]){let l=c.getAttribute(u);l&&l!=="none"&&c.setAttribute(u,"#000")}let a=n.getAttribute("fill")==="none"?"none":"#000",i=[...n.childNodes].map(c=>new XMLSerializer().serializeToString(c)).join(""),s=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${a}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${i}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${s})"/></svg>`}function Pn(){return f.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function $i(){let e=Pn();return e.pending||(e.pending=f.backend.call("taskIcons",{}).then(t=>{let r={};for(let[n,a]of Object.entries(t?.icons??{})){let i=Mm(a);i&&(r[n]=_m(n,i))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function Cl(){return Pn().revision}function Dl(e){return e?Pn().icons[e]:void 0}function On(){let e=Pn();return o.useEffect(()=>{e.loaded||$i()},[e]),o.useSyncExternalStore(o.useCallback(t=>(e.listeners.add(t),()=>{e.listeners.delete(t)}),[e]),()=>e.revision),e.icons}function Il(){$i();let e,t=f.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${Ui}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{$i()},150))});return()=>{window.clearTimeout(e),t()}}function Nl(e){let r=f?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var oe=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Gt=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),zm=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Fm=e=>o.createElement(Gt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),Rm=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Gm=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),$m=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Um=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),jm=e=>o.createElement(Gt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Km={inprogress:Rm,waiting:Gm,onhold:Fm,delegated:$m,deferred:Um,completed:jm,canceled:zm},Te=({status:e,dotCls:t,color:r})=>{let n=r?{color:r}:void 0,a=Dl(Nl(e??"open"));if(a)return o.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${t}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:a}});let i=e?Km[e]:void 0;return i?o.createElement(i,{className:`todo-status-menu-svg ${t}`,style:n}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:n})},so=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),yt=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),ve=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Oo=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),Ll=e=>o.createElement(oe,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Pl=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Ol=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Mn=e=>o.createElement(oe,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),_n=e=>o.createElement(oe,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),wr=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),vr=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Ml=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),_l=e=>o.createElement(oe,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),zl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),zn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Pe=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),Fl=e=>o.createElement(Gt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Rl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Fn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),qe=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),$t=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),Gl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),$l=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),lo=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),co=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Ul=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),Rn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),jl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Ye=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),Ut=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),wt=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),Gn=e=>o.createElement(oe,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),$n=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),Un=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),xr=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Tr=e=>o.createElement(oe,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),lt=e=>o.createElement(oe,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),jn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),kr=e=>o.createElement(oe,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),Kn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),Vn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Bn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),Hn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),Kl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),Wn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),qn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),Vl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Bl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"})),Hl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Wl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M5 12h14"})),ql=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),Yn=e=>o.createElement(oe,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),Xn=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),Yl=e=>o.createElement(oe,{...e},o.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function Sr(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var Mo=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let a=o.useRef(null),[i,s]=o.useState([]),[c,u]=o.useState("idle"),[l,p]=o.useState(-1),[g,h]=o.useState(!1),m=o.useRef(null),y=o.useRef(0),w=o.useRef(!1);o.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),o.useEffect(()=>{n&&a.current?.focus()},[n]);let _=D=>{m.current!==null&&window.clearTimeout(m.current);let v=++y.current;if(D.trim().length<2){s([]),u("idle"),h(!1);return}h(!0),u("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:D.trim(),kinds:["place"],limit:8}).then(C=>{v===y.current&&(s(C),p(C.length?0:-1),u("done"))},()=>{v===y.current&&(s([]),p(-1),u("failed"))})},250)},F=D=>{let v=Number(D.metadata?.longitude),C=Number(D.metadata?.latitude),$=(D.value??D.label).trim();w.current=!0,y.current++,a.current&&(a.current.value=$),h(!1),s([]),t({name:$,...Number.isFinite(v)&&Number.isFinite(C)?{lng:v,lat:C}:{}})},P=()=>{let D=a.current?.value.trim()??"";if(y.current++,h(!1),w.current){w.current=!1;return}D!==(e?.name??"")&&t(D?{name:D}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(yt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:D=>{w.current=!1,_(D.currentTarget.value)},onFocus:D=>{D.currentTarget.value.trim().length>=2&&i.length&&h(!0)},onBlur:P,onKeyDown:D=>{D.nativeEvent.isComposing||(D.key==="ArrowDown"&&i.length?(D.preventDefault(),h(!0),p(v=>(v+1)%i.length)):D.key==="ArrowUp"&&i.length?(D.preventDefault(),p(v=>v<=0?i.length-1:v-1)):D.key==="Enter"?(D.preventDefault(),g&&i[l]?F(i[l]):P()):D.key==="Escape"&&g&&(D.preventDefault(),D.stopPropagation(),y.current++,h(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>Sr(e)},o.createElement(jl,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:D=>D.preventDefault(),onClick:()=>{y.current++,a.current&&(a.current.value=""),s([]),h(!1),t(void 0)}},o.createElement(ve,null)))),g&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},c==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),c==="failed"&&o.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),i.map((D,v)=>o.createElement("li",{key:D.id,role:"option","aria-selected":v===l},o.createElement("button",{type:"button",className:"todo-location-hit"+(v===l?" is-active":""),onMouseDown:C=>C.preventDefault(),onMouseEnter:()=>p(v),onClick:()=>F(D)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(Ye,null),D.label),D.description&&o.createElement("span",{className:"todo-location-hit-context"},D.description))))))};function Vm(){try{return hr(f?.getState().weekStart)}catch{return 1}}function Zl(e,t=Vm()){let r=ao(e).getDay();return ft(e,6-(r-t+7)%7)}var Oe={kind:"smart",id:"all"},Zn=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ye("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ye("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:ye("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ye("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ye("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ye("green"),dated:!1}],Ar=Zn.map(e=>e.id);function ji(e){let t=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(t.order)?t.order:[])typeof l=="string"&&Ar.includes(l)&&!r.includes(l)&&r.push(l);Ar.forEach((l,p)=>{if(r.includes(l))return;let g=Ar.slice(0,p).reverse().find(h=>r.includes(h));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=t.colors&&typeof t.colors=="object"?t.colors:{},s={};for(let l of Ar){let p=i[l];typeof p=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(p)&&(s[l]=p)}let c=t.textColors&&typeof t.textColors=="object"?t.textColors:{},u={};for(let l of Ar){let p=c[l];(p==="white"||p==="black")&&(u[l]=p)}return{order:r,hidden:a,colors:s,textColors:u}}function Jl(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>vt(t,e))}function vt(e,t){let r=Zn.find(i=>i.id===e)??Zn.find(i=>i.id==="all"),n=t?.colors[r.id],a=t?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function Er(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}var Xl=new WeakMap;function Bm(e){let t=Xl.get(e);if(t&&t.names===e.names&&t.count===e.names.length)return t.keys;let r=new Set(e.names.map(re));return Xl.set(e,{names:e.names,count:e.names.length,keys:r}),r}function Hm(e,t,r=ue(new Date)){if(t.kind==="groups")return e.group?Bm(t).has(re(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=Zl(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function Jn(e,t,r,n=ue(new Date)){return Hm(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Ql(e,t=ue(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=Zl(t);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++,i<=n&&r.week++)}return r}function Qn(e,t=!0){let r=new Map,n=0;for(let a of e){if(t&&a.completed)continue;let i=re(a.group??"");r.set(i,(r.get(i)??0)+1),a.group||n++}return{byKey:r,ungrouped:n}}function Cr(e,t){return t===null?e.ungrouped:e.byKey.get(re(t))??0}function et(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Wm=Zn.map(e=>e.id);function Dr(e){if(typeof e!="string")return Oe;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Oe}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Oe}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Oe;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Oe}catch{return Oe}return Wm.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Oe}function ea(e,t){return et(e)===et(t)}var qm=300,Ym=["group","notes","status","location","tags"],Xm="todo.view",Zm="todo.showCompleted",Jm="todo.statusFilter",Qm="todo.search",ef="todo.pageSort",Hi="panelChip",tc="pageShowCompleted",Ki="statusFilter",Wi="dateBreakdown",oc="smartLists",_o="pageSearch",rc="pageSort",tf={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},nc=["due","priority","flagged","updated","created","name"];function ec(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:nc.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Io(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function aa(e){let t=tf[e],r=o.useCallback(()=>ec(f.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(c=>{let u=ec({...c,...s});return f.settings.set(t,u),u})},[t]);return[n,i]}function ta(){let e=f.settings.get()[Wi];return e==="weekly"||e==="daily"?e:"monthly"}function ia(){let[e,t]=o.useState(ta);return o.useEffect(()=>f.settings.subscribe(()=>t(ta())),[]),e}function Fo(){return f.runtime.getOrCreate(Xm,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function sa(){return f.runtime.getOrCreate(Zm,()=>({show:null,listeners:new Set}))}function da(){return f.runtime.getOrCreate(Jm,()=>({filter:null,listeners:new Set}))}function zo(){return f.runtime.getOrCreate(Qm,()=>({query:null,listeners:new Set}))}function la(){return f.runtime.getOrCreate(ef,()=>({value:null,listeners:new Set}))}function xt(){let e=Fo();return e.view||(e.view=Dr(f.settings.get()[Hi]),e.history=[e.view],e.historyIndex=0),e.view}function Ke(e){let t=Fo();if(xt(),t.view&&ea(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(Hi,et(e));for(let n of t.listeners)n(e)}function ca(){let e=Fo();return xt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function Ro(e){let t=Fo();xt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(Hi,et(t.view));for(let n of t.listeners)n(t.view)}}function Ir(e){let t=Fo();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function ac(){ra();let e=Fo();e.view=null,e.history=[],e.historyIndex=-1,sa().show=null,da().filter=null,zo().query=null,la().value=null}function oa(){return ji(f.settings.get()[oc])}function ic(e){f.settings.set(oc,ji(e))}function ua(){let[e,t]=o.useState(oa);return o.useEffect(()=>f.settings.subscribe(()=>t(oa())),[]),e}function ra(){let e=zo(),t=e.pending;t&&(e.pending=void 0,clearTimeout(t.timer),t.forget(),e.query!==null&&t.write(e.query))}function pa(e){let t=zo(),r=e.slice(0,500);if(t.query===r)return;t.query=r;for(let s of t.listeners)s(r);if(r===""){t.pending&&(clearTimeout(t.pending.timer),t.pending.forget(),t.pending=void 0),f.settings.set(_o,r);return}t.pending&&clearTimeout(t.pending.timer);let n=f,a=s=>{n.settings.set(_o,s).catch(()=>{})},i=t.pending?.forget??xe()?.onDispose(ra)??(()=>{});t.pending={timer:setTimeout(ra,qm),write:a,forget:i}}function ma(){let e=()=>{let n=zo();return n.query===null&&(n.query=typeof f.settings.get()[_o]=="string"?String(f.settings.get()[_o]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=zo();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,pa]}function qi(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||Ym.includes(t.field)||nc.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function sc(){let e=la();return e.value||(e.value=qi(f.settings.get()[rc])),e.value}function dc(e){let t=la(),r=qi(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(rc,r);for(let n of t.listeners)n(r)}}function lc(){let[e,t]=o.useState(sc);return o.useEffect(()=>{let r=la();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,dc]}function fa(e=xt()){return{v:1,view:et(e),showCompleted:Bi(),statusFilter:na(),search:zo().query??(typeof f.settings.get()[_o]=="string"?String(f.settings.get()[_o]).slice(0,500):""),sort:sc()}}function ga(e,t=!1){return e.v!==1?!1:(t||Ke(Dr(e.view)),uo(e.showCompleted===!0),Vi(Io(e.statusFilter)),pa(typeof e.search=="string"?e.search:""),ra(),dc(qi(e.sort)),!0)}function na(){let e=da();if(e.filter===null){let t=f.settings.get()[Ki];e.filter=Io(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(Ki,e.filter)}return e.filter}function Vi(e){let t=da(),r=Io(e),n=t.filter??na();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,f.settings.set(Ki,r);for(let a of t.listeners)a(r)}}function Tt(){let[e,t]=o.useState(na);return o.useEffect(()=>{let r=da();r.listeners.add(t);let n=f.settings.subscribe(()=>{let a=Io(r.filter??na());Vi(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,Vi]}function ha(){let[e,t]=o.useState(xt);return o.useEffect(()=>Ir(t),[]),e}function Bi(){let e=sa();return e.show===null&&(e.show=f.settings.get()[tc]===!0),e.show}function uo(e){let t=sa();if(t.show!==e){t.show=e,f.settings.set(tc,e);for(let r of t.listeners)r(e)}}function kt(){let[e,t]=o.useState(Bi);return o.useEffect(()=>{let r=sa();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>uo(!Bi())]}function uc(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(xo).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}function pc(e,t){return un(e)?e:t}function of(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function rf(e,t){return e.dueDate?{badges:of(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Ne(e.group,t)}:{}}:null}function nf(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:pc(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ce(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function ba(e){return Ze(e)}function cc(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var Yi="attachment:",Xi="url:";function af(){return!0}function sf(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:cc(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${Yi}${i}`,label:cc(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${Xi}${i}`,label:i,icon:"link"}))}),e.location&&af()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function df(e,t){if(t.startsWith(Yi)){let r=t.slice(Yi.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(Xi)){let r=t.slice(Xi.length);if(!(e.urls??[]).includes(r))return!1;let n=So(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Ke(e.completed?{kind:"smart",id:"completed"}:Oe),_e().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Sr(e.location),!0):!1;default:return!1}}function mc(){let e=xe(),t=Zt("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:p,limit:g,cursor:h})=>{let m,y=()=>`${t}:${r}`;if(h){let D;try{D=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!D||D.startDate!==l||D.endDate!==p||D.limit!==g||D.revision!==y()||typeof D.cursor!="string"||!D.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=D.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let w=y(),_=await Cd(l,p,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&w!==y())throw new Error("Calendar source cursor is stale; restart the range.");let F=nt(),P=y();return{items:_.todos.map(D=>rf(D,F)).filter(D=>!!D),revision:P,..._.cursor?{cursor:JSON.stringify({startDate:l,endDate:p,limit:g,revision:P,cursor:_.cursor})}:{}}},create:async(l,p)=>{if(p.endDate&&p.endDate!==l)return!1;let g=p.title?.trim();if(!g)return!1;let h=new Date().toISOString();return Nn({id:Zt("todo"),title:g,completed:p.completed??!1,priority:pc(p.priority,"normal"),dueDate:l,startTime:p.startTime,endTime:p.endTime,note:p.note??"",location:p.location,urls:p.urls,attachments:p.attachments,group:p.group,tags:p.tags??[],filePath:p.filePath,createdAt:h,updatedAt:h})},update:async(l,p)=>{let g=await ba(l);return g&&p.endDate&&p.endDate!==(p.date??g.dueDate)?!1:g?io(g.id,nf(g,p),g.updatedAt):!1},remove:l=>Ln(l),open:async l=>{let p=await ba(l);await f.workspace.revealOwnPanel("left_sidebar"),p&&(Ke(p.completed?{kind:"smart",id:"completed"}:Oe),_e().request(p.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let p=await ba(l);return p?sf(p):[]},runAction:async(l,p)=>{let g=await ba(l);return g?df(g,p):!1}},i=()=>{f.interop.state.publish(Xo,++r)};f.interop.state.publish(Xo,r);let s=Sd(i),c=mr(i),u=f.interop.services.provide(xo,a);return()=>{n=!1,s(),c(),u(),f.interop.state.publish(Xo,null)}}var Zi=e=>typeof e=="string"?e:"";function fc(e){let t=Zi(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function gc(e){let t={cardKind:"todo",open:async(r,n)=>{if(Zi(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:Zi(r.id)}),!0;let a=fc(r.filePath)||fc(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(Za,t)}function ct(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>f.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function ya(){let e=o.useCallback(i=>f.interop.state.subscribe(Yr,i),[]),t=o.useCallback(()=>f.interop.state.get(Yr),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function hc(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let c=new Set(r.current);s?c.add(i):c.delete(i),r.current=c,t(c)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var lf="todo.sharedTodos";function Ji(){return f.runtime.getOrCreate(lf,()=>({todos:[],listeners:new Set}))}function ke(){return Ji().todos}function St(e){let t=Ji();t.todos=e;for(let r of t.listeners)r(e)}function jt(e){let t=Ji();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var Qi="list:",es=e=>f.ui.hasModKey(e)||e.button===1,cf=e=>`${Qi}${et(e)}`;function po(e){return e?.startsWith(Qi)?Dr(e.slice(Qi.length)):null}var bc=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function wa(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(vt(e.id).labelKey)}function Go(e,t){f.workspace.openMainTab({instanceId:cf(e),title:wa(e),newTab:t})}function Nr(e,t=!1){t||po(bc(f.getState().activePluginTab))?Go(e,t):Ke(e)}function Lr(){let e=ha(),{activePluginTab:t}=ct("activePluginTab"),r=bc(t);return o.useMemo(()=>po(r),[r])??e}function yc(){let e=t=>f.workspace.setMainTabTitle(wa(t));return e(xt()),Ir(e)}function Kt(){return f.workspace.openOwnSettings("groups"),Promise.resolve()}var ts={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function wc(){return["completed",...oo().filter(t=>t!=="completed")].map(t=>Ee(t))}function mo(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function vc(){for(let e of mo().listeners)e()}function os(e,t=""){let r=mo();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,vc())}function rs(e,t){e?mo().selected.set(t,e):mo().selected.delete(t),vc()}function uf(e,t){let r=e==="main_workspace"?po(t):null,n=fa(r??void 0),a=ke().find(i=>i.id===mo().selected.get(e));return{title:d("manifest.name"),view:n,actions:mo().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...ca(),goBack:()=>Ro(-1),goForward:()=>Ro(1)}}}}function pf(e){let t=mo().listeners;t.add(e);let r=jt(e),n=Ir(e),a=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function mf(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Ze(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!ga(e,t==="main_workspace"&&po(n)!==null))throw new Error("Unsupported To-Do bookmark.");rs(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&_e().request(e.todoId,"focus")}function ff({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(zn,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},wc().map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,i.label),o.createElement("span",null,r.filter(s=>Ie(s)===i.id).length)))))}function gf(){let e=o.useSyncExternalStore(jt,ke,ke),t=at(),r=Lr(),n=r.kind==="smart"?d(vt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...wc().map(a=>[a.label,e.filter(i=>Ie(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...we(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(c=>a===null?!c.group:re(c.group??"")===re(a)),s=a??d("todo.chip.noGroup");return o.createElement(ff,{key:a??"ungrouped",label:s,color:a?Se(Ne(a,t)):"var(--text-tertiary)",todos:i})})))}function hf(){let e=o.useSyncExternalStore(jt,ke,ke),t=at(),r=Lr();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(Pr,{embedded:!0,todos:e,groups:t,names:we(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>Nr(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Oe),onOpenSettings:Kt}))}function xc(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>ti(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>uf(n,a),subscribe:pf,restore:(a,i,s)=>mf(a,n,s?.background,i)},{stateSchema:ts,itemStateSchema:{...ts,required:[...ts.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Xr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Ze(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(gf,null)})),r.push(e.interop.extensions.provide(Xr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>nt().map(n=>({id:n.id,label:n.name,value:ke().filter(a=>re(a.group??"")===re(n.name)).length,readOnly:!0})),render:()=>o.createElement(hf,null)})),()=>r.forEach(n=>n())}function Tc(e,t,r){let n=new Date().toISOString();return{id:Zt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function kc(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function $o(e,t,r="main_workspace"){let n=o.useRef(xe()).current,[a,i]=o.useState(ke()),[s,c]=o.useState(null),[u,l]=o.useState(null),[p,g]=o.useState(null),h=o.useRef(p);h.current=p;let[m,y]=o.useState(!0),[w,_]=o.useState(0),[F,P]=o.useState(!1),{pendingIds:D,isPending:v,setPending:C}=hc(),$=o.useRef(!1),z=o.useRef(0),q=o.useRef({sortField:e,sortDir:t});q.current={sortField:e,sortDir:t};let k=o.useRef([]),N=o.useMemo(()=>{let K=new Map(a.map(X=>[X.id,X])),O=new Set(k.current),se=[];for(let X of k.current){let Q=K.get(X);Q&&se.push(Q)}for(let X of a)O.has(X.id)||se.push(X);return se},[a,w]),U=o.useCallback(K=>{let O=++z.current;K&&y(!0),Je(n).then(se=>{if(n.assertActive(),O===z.current){if(K){let{sortField:X,sortDir:Q}=q.current;k.current=Lo(se,X,Q).map(x=>x.id)}else{let X=new Set(se.map(M=>M.id)),Q=k.current.filter(M=>X.has(M)),x=new Set(Q),{sortField:L,sortDir:V}=q.current,b=Lo(se.filter(M=>!x.has(M.id)),L,V).map(M=>M.id);k.current=[...b,...Q]}St(se),y(!1)}}).catch(()=>{O===z.current&&y(!1)})},[n]);o.useEffect(()=>(U(!0),()=>{z.current++}),[U]),o.useEffect(()=>Mt(()=>U(!1)),[U]);let B=o.useRef(!0);o.useEffect(()=>{if(B.current){B.current=!1;return}k.current=Lo(ke(),e,t).map(K=>K.id),_(K=>K+1)},[e,t]),o.useEffect(()=>jt(K=>i(K)),[]);let S=o.useCallback(()=>c(null),[]),T=o.useCallback(K=>{rs(K,r),g(K)},[r]),R=o.useCallback(()=>g(null),[]),G=o.useCallback(async(K,O,se)=>{if($.current)return null;let X=K.trim();if(!X)return null;let Q={...Tc(X,O),...se?.patch};$.current=!0,P(!0),k.current=[Q.id,...k.current],St([Q,...ke()]),c(Q.id);let x=()=>{k.current=k.current.filter(L=>L!==Q.id),St(ke().filter(L=>L.id!==Q.id)),c(L=>L===Q.id?null:L)};try{let L=await Nn(Q);return L||x(),L?Q:null}catch{return x(),null}finally{$.current=!1,P(!1)}},[]),E=o.useCallback(async(K,O,se)=>{if(v(K))return!1;let X=ke().find(x=>x.id===K);if(!X)return!1;let Q={...X,...O,updatedAt:new Date().toISOString()};C(K,!0),St(ke().map(x=>x.id===K?Q:x));try{return await io(K,Q,X.updatedAt,se)?!0:(St(ke().map(L=>L.id===K?X:L)),!1)}catch{return St(ke().map(x=>x.id===K?X:x)),!1}finally{C(K,!1)}},[v,C]),A=o.useCallback(async K=>{if(v(K))return;let O=ke().find(X=>X.id===K);if(!O)return;C(K,!0),k.current=k.current.filter(X=>X!==K),St(ke().filter(X=>X.id!==K)),c(X=>X===K?null:X),h.current===K&&g(null);let se=()=>{k.current.includes(K)||k.current.push(K),ke().some(X=>X.id===K)||St([...ke(),O])};try{await Ln(K)||se()}catch{se()}finally{C(K,!1)}},[v,C]),Y=o.useMemo(()=>({patchTodo:E,removeTodo:A,openDetail:T,setMenuId:l}),[E,A,T]);return o.useMemo(()=>({todos:a,loading:m,ordered:N,lastCreatedId:s,clearLastCreated:S,menuId:u,setMenuId:l,editingId:p,openDetail:T,closeDetail:R,pendingIds:D,creating:F,create:G,patchTodo:E,removeTodo:A,actions:Y}),[a,m,N,s,S,u,p,T,R,D,F,G,E,A,Y])}var bf=[".ttf",".otf",".woff",".woff2"],yf=[".csv"],wf=[".base"],vf=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],xf=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],Tf=[...vf,...xf,".ico",".flavicon"];var kf=[".pdf"],Sf=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Af=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Ef=[".srt",".vtt",".ass"],Cf=[".stl",".obj",".glb",".gltf"],Df=[".bin",".mtl"];function ns(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var If={type:"core",id:"valley"},J=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:If,...a});function Nf(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Lf=Nf([[[".mermaid",".mmd"],J("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],J("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],J("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],J("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],J("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[bf,J("font","font","font","media")],[[".epub",".mobi",".azw3"],J("ebook","ebook","ebook","documents")],[[".djvu"],J("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],J("comic","comic","comic","documents")],[[".md",".markdown"],J("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],J("text","text","text","notes")],[[".json"],J("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],J("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[yf,J("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[wf,J("base","base","fallback","data")],[Tf,J("image","image","image","media",{information:["identity","dimensions","exif"]})],[kf,J("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Sf,J("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Af,J("video","video","video","media",{information:["identity","media","video-codec"]})],[Ef,J("text","subtitle","text","media")],[Cf,J("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[Df,J("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],J("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],J("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],J("docx","word","opendocument","documents")],[[".ods"],J("csv","excel","opendocument","data")],[[".odp"],J("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],J("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],J("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],J("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],J("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],J("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],J("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],J("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],J("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],J("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],J("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],J("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],J("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],J("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],J("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],J("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],J("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],J("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],J("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],J("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],J("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],J("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],J("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],J("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],J("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],J("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],J("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],J("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Pf=J("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Of(e){return Lf[ns(e)]??Pf}function Or(e){return Of(e).kind}var Sc="valley-realm",Ac="asset";function Ec(e){return`${Sc}://${Ac}/${encodeURIComponent(e)}`}var Mf={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function _f(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function as(e){let t=Mf[Or(e)];if(t)return d(t);let r=ns(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var zf={image:Gn,audio:$n,video:Un},Cc=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=Or(e),i=e.split("/").pop()??e,s=zf[a]??wt;o.useEffect(()=>{let p=!1;return f.realm.fileInfo(e).then(g=>{p||n(g?.size??null)}),()=>{p=!0}},[e]);let[c,u]=o.useState(0);o.useEffect(()=>f.realm.onChanged(()=>u(p=>p+1)),[]);let l=a==="image"?`${Ec(e)}?v=${c}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:p=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(p)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},as(e),r!==null&&` \xB7 ${_f(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},l?o.createElement("img",{src:l,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},o.createElement(ve,null)))};var Ff={image:Gn,audio:$n,video:Un};function is({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let a=o.useRef(null),[i,s]=o.useState([]),[c,u]=o.useState(0),[l,p]=o.useState("idle"),g=o.useRef(null),h=o.useRef(0);o.useEffect(()=>{n&&a.current?.focus()},[n]),o.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=w=>{g.current!==null&&window.clearTimeout(g.current);let _=++h.current;if(!w.trim()){s([]),p("idle");return}p("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:w.trim(),kinds:["attachment"],limit:6}).then(F=>{_===h.current&&(s(F),u(0),p("done"))},()=>{_===h.current&&(s([]),p("done"))})},150)},y=w=>(w.value??w.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(yt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:w=>m(w.currentTarget.value),onKeyDown:w=>{w.nativeEvent.isComposing||(w.key==="ArrowDown"&&i.length?(w.preventDefault(),u(_=>(_+1)%i.length)):w.key==="ArrowUp"&&i.length?(w.preventDefault(),u(_=>_<=0?i.length-1:_-1)):w.key==="Enter"?(w.preventDefault(),i[c]&&e(y(i[c]))):w.key==="Escape"&&(w.preventDefault(),w.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:t},o.createElement(ve,null))),l!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},l==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),i.map((w,_)=>{let F=y(w),P=Ff[Or(F)]??wt,D=F.includes("/")?F.slice(0,F.lastIndexOf("/")):"";return o.createElement("li",{key:w.id,role:"option","aria-selected":_===c},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(_===c?" is-active":""),onMouseDown:v=>v.preventDefault(),onMouseEnter:()=>u(_),onClick:()=>e(F)},o.createElement(P,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},w.label||F.split("/").pop()),D&&o.createElement("span",{className:"todo-file-search-folder"},D))))})))}var Rf=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],Dc=e=>{let[t,r]=(e||ue(new Date)).split("-").map(Number);return new Date(t,r-1,1)};function Vt({value:e,onChange:t}){let[r,n]=o.useState(()=>Dc(e)),a=f.ui.language(),i=Math.max(0,Rf.indexOf(String(f.getState().weekStart??"monday").toLowerCase())),s=ue(new Date),c=r.getFullYear(),u=r.getMonth(),l=(new Date(c,u,1).getDay()-i+7)%7,p=Array.from({length:42},(y,w)=>new Date(c,u,1-l+w)),g=Array.from({length:7},(y,w)=>new Intl.DateTimeFormat(a,{weekday:"narrow"}).format(new Date(2024,0,7+(i+w)%7))),h=new Intl.DateTimeFormat(a,{month:"long",year:"numeric"}).format(r),m=y=>n(new Date(c,u+y,1));return o.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},o.createElement("div",{className:"todo-calendar-head"},o.createElement("span",{className:"todo-calendar-title"},h),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>m(-1)},o.createElement(Wn,null)),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>m(1)},o.createElement(qn,null))),o.createElement("div",{className:"todo-calendar-grid"},g.map((y,w)=>o.createElement("span",{key:`w${w}`,className:"todo-calendar-weekday"},y)),p.map(y=>{let w=ue(y),_=y.getMonth()!==u;return o.createElement("button",{key:w,type:"button",className:"todo-calendar-day"+(_?" is-outside":"")+(w===s?" is-today":"")+(w===e?" is-selected":""),"aria-pressed":w===e,"aria-label":new Intl.DateTimeFormat(a,{dateStyle:"full"}).format(y),onClick:()=>t(w)},y.getDate())})),o.createElement("div",{className:"todo-calendar-foot"},o.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>t("")},d("todo.calendar.clear")),o.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(Dc(s)),t(s)}},d("todo.due.today"))))}function Gf(e){let t=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(t);if(!r)return null;let n=Number(r[1]),a=Number(r[2]);return n>23||a>59?null:`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Mr({value:e,onChange:t,ariaLabel:r,placeholder:n,disabled:a}){let[i,s]=o.useState(e),[c,u]=o.useState(!1);o.useEffect(()=>{s(e),u(!1)},[e]);let l=()=>{if(!i.trim()){u(!1),e&&t("");return}let p=Gf(i);if(!p){u(!0);return}u(!1),s(p),p!==e&&t(p)};return o.createElement("input",{className:"settings-control todo-clock-input"+(c?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:i,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":c||void 0,title:c?d("todo.time.invalid"):void 0,disabled:a,autoComplete:"off",spellCheck:!1,onChange:p=>{let g=p.currentTarget.value.replace(/[^\d:]/g,""),h=g.indexOf(":");s(h<0?g:g.slice(0,h+1)+g.slice(h+1).replace(/:/g,"")),u(!1)},onBlur:l,onKeyDown:p=>{p.key==="Enter"&&(p.preventDefault(),l())}})}function va({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=o.useRef(null),s=c=>{let u=c.split(/[\s,]+/).map(p=>p.trim().replace(/^#+/,"")).filter(Boolean),l=[...e];for(let p of u)l.some(g=>g.toLowerCase()===p.toLowerCase())||l.push(p);return l.length===e.length?!1:(t(l),!0)};return o.useEffect(()=>{r&&i.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),i.current?.focus())}},e.map(c=>o.createElement("span",{key:c,className:"todo-tags-chip"},o.createElement("span",null,"#",c),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:c}),title:d("todo.compose.removeTag",{tag:c}),onClick:()=>{t(e.filter(u=>u!==c)),i.current?.focus()}},o.createElement(ve,null)))),o.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let u=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&u.value.trim()?(c.preventDefault(),s(u.value)&&(u.value="")):c.key==="Backspace"&&!u.value&&e.length&&(c.preventDefault(),t(e.slice(0,-1))))},onBlur:c=>{s(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let u=c.clipboardData.getData("text/plain");/[\s,]/.test(u.trim())&&(c.preventDefault(),s(c.currentTarget.value+u),c.currentTarget.value="")}}))}var it=({priority:e})=>o.createElement(e==="high"?Bn:e==="medium"?Kl:e==="low"?Hn:Wl,{className:`todo-table-priority-icon todo-priority-${e}`});function Ic({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Vt,{value:r,onChange:s=>{n(s),s||i(""),t(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(Mr,{value:a,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{i(s),t({startTime:s||void 0})}}))}function xa({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Ta({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(va,{value:r,autoFocus:!0,onChange:a=>{n(a),t({tags:a})}}))}function ka({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Mo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function Uo(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}var $f={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Uf=["tomorrow","weekend","pick"];function jf(e=ue(new Date)){let t=Tn(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return ft(e,n)}function Sa(e,t=ue(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?ft(t,1):s==="weekend"?jf(t):null,a=new Set,i=[];for(let s of Uf){let c=n(s);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:s,labelKey:$f[s],date:c})}return i}function Kf(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Vf(e,t=.998){return e/1e3*t/(1-t)}function Nc(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function Lc(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+Kf(n-t,a,.2))}function Pc(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,Vf(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function Oc(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,u=2*i*Math.sqrt(c),l=t+(-c*(e-r)-u*t)*s,p=e+l*s,g=Math.abs(p-r)<.5&&Math.abs(l)<20;return{value:g?r:p,velocity:g?0:l,done:g}}function ss(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),c=n*s<=i+(r?24:0),u=c?s:48,l=Math.min(n*u,Math.max(i,n*32)),p=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:u,labelled:c,openWidth:l,commitPoint:p}}var Mc=.22,_c=.18,Bf=.8,Aa=.9,Hf=400,Wf=80,qf=10,Yf=5,Xf=4,Zf=3,Jf=.5,Qf=6,eg=["left","right"],zc={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function tg(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function og(e,t){let r={today:o.createElement(kr,null),tomorrow:o.createElement(kr,null),weekend:o.createElement(Kn,null),pick:o.createElement(lt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var zr=null;function Fc(e){if(zr===e)return;let t=zr;zr=e,t?.close()}function Rc(e){zr===e&&(zr=null)}var jo;function Gc(e,t){if(jo===void 0)try{jo=document.createElement("canvas").getContext("2d")}catch{jo=null}return jo?(jo.font=t,jo.measureText(e).width):e.length*7}var rg=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,_r=e=>e>0?"left":e<0?"right":null,$c=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),c=o.useRef({left:null,right:null}),u=o.useRef(0),l=o.useRef(null),p=o.useRef(null),g=o.useRef([]),h=o.useRef(!1),m=o.useRef(null),y=o.useRef(null),w=o.useRef({velocity:0,target:0,response:Mc,damping:Aa}),_=o.useRef({left:"",right:""}),F=o.useMemo(()=>og(Sa(e.dueDate??"",ue(new Date)),r),[e.dueDate,r]),P=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Pe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(Ol,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement($t,null),run:()=>r.remove()}],[r,e.flagged]),D={left:F,right:P},[v,C]=o.useState(()=>({rowWidth:0,left:zc,right:zc})),$=o.useRef(v);$.current=v;let z=()=>{let x=i.current?.querySelector(".todo-swipe-action");if(!x||typeof getComputedStyle!="function")return"13px sans-serif";let L=getComputedStyle(x);return`${L.fontWeight} ${L.fontSize} ${L.fontFamily}`},q=()=>{let x=i.current?.clientWidth??0,L=z(),V=$.current,b={rowWidth:x,left:ss(x,F.map(H=>Gc(H.label,L)),V.left.labelled),right:ss(x,P.map(H=>Gc(H.label,L)),V.right.labelled)};$.current=b;let M=H=>V[H].openWidth!==b[H].openWidth||V[H].labelled!==b[H].labelled;return(V.rowWidth!==x||M("left")||M("right"))&&C(b),b},k=o.useRef(q);k.current=q,o.useEffect(()=>{k.current()},[F,P]);let N=x=>{let L=_r(x);return!L||L!==p.current?!1:Math.abs(x)>=$.current[L].commitPoint},U=(x,L=!1)=>{u.current=x,L&&x!==0?Fc(G.current):x===0&&Rc(G.current);let V=i.current,b=s.current;if(!V||!b)return;b.style.transform=x?`translate3d(${x}px, 0, 0)`:"";let M=_r(x),H=$.current,Z=N(x);V.classList.toggle("open",x!==0),V.classList.toggle("committed",Z);for(let ae of eg){let W=c.current[ae];if(!W)continue;let ce=M===ae;W.classList.toggle("committed",ce&&Z);let Fe=ce?Z?"100%":`${Math.max(H[ae].openWidth,Math.abs(x))}px`:`${x===0?H[ae].openWidth:0}px`,Ve=`${Fe}|${ce}`;_.current[ae]!==Ve&&(_.current[ae]=Ve,W.style.width=Fe,W.setAttribute("aria-hidden",String(!ce)))}};o.useLayoutEffect(()=>U(u.current));let B=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},S=(x,L,V,b)=>{if(B(),x!==0&&Fc(G.current),u.current===x||rg()||typeof requestAnimationFrame!="function"){U(x);return}w.current={velocity:L,target:x,response:V,damping:b};let M=0,H=Z=>{let ae=M?(Z-M)/1e3:.016666666666666666;M=Z;let W=w.current,ce=Oc(u.current,W.velocity,W.target,ae,W.response,W.damping);W.velocity=ce.velocity,U(ce.value),m.current=ce.done?null:requestAnimationFrame(H)};m.current=requestAnimationFrame(H)},T=o.useRef(()=>{});T.current=()=>{l.current=null,S(0,0,_c,Aa)};let R=o.useCallback(()=>T.current(),[]),G=o.useRef({close:()=>T.current()}),E=()=>{B(),l.current=null,y.current!=null&&window.clearTimeout(y.current),y.current=null,U(0)},A=o.useRef(E);A.current=E;let Y=x=>{let L=$.current,V=_r(x);if(!V)return 0;let b=l.current?.origin;if(b&&V!==b)return 0;let M=L[V],H=V===p.current?M.commitPoint:M.openWidth;return Lc(x,H,L.rowWidth)},K=(x,L,V,b,M)=>{B(),q();let H=u.current,Z=_r(H),ae=Math.abs(H)>8?Z:null;p.current=Z&&Math.abs(H)>=$.current[Z].openWidth-1?Z:null,l.current=tg(x,L,V,b,H,ae),g.current=[{x:H,t:M}]},O=(x,L)=>{let V=l.current;!V||V.ended||(V.live||(V.live=!0,B(),n?.()),g.current.push({x,t:L}),g.current.length>Qf&&g.current.shift(),U(Y(x),!0),N(u.current)&&(V.crossed=!0))},se=x=>{let L=l.current;if(!L||L.ended)return;if(L.ended=!0,!L.live){l.current=null;return}let V=()=>{L.kind==="pointer"&&(l.current=null)},b=Nc(g.current),M=u.current,H=_r(M);if(!H){V(),U(0);return}let Z=$.current[H],ae=x&&N(M),W=Pc({offset:M,velocity:b,openWidth:Z.openWidth,committed:ae});if(V(),W.commit){let ce=H==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Fe=i.current?.querySelector(ce),Ve=D[H],Et=H==="left"?Ve[0]:Ve[Ve.length-1];S(0,b,_c,Aa),Et?.run(Fe??i.current);return}S(W.target,b,Mc,Math.abs(b)>Hf?Bf:Aa)};o.useEffect(()=>R(),[e.dueDate,e.flagged,R]),o.useEffect(()=>{let x=G.current;return()=>{B(),y.current!=null&&window.clearTimeout(y.current),Rc(x)}},[]),o.useEffect(()=>{let x=i.current,L=x?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!x||!L)return;let V=0,b=new L(()=>{let M=x.clientWidth,H=V!==M;V=M,k.current(),H&&u.current!==0&&A.current()});return b.observe(x),()=>b.disconnect()},[]);let X=o.useRef({disabled:t,begin:K,move:O,end:se});X.current={disabled:t,begin:K,move:O,end:se},o.useEffect(()=>{let x=i.current;if(!x)return;let L=()=>{y.current!=null&&window.clearTimeout(y.current),y.current=null},V=()=>{y.current=null,l.current?.kind==="wheel"&&(X.current.end(!0),l.current=null)},b=M=>{let H=X.current;if(H.disabled||Math.abs(M.deltaX)<=Math.abs(M.deltaY)||M.deltaX===0)return;M.preventDefault();let Z=M.deltaMode===WheelEvent.DOM_DELTA_LINE?16:M.deltaMode===WheelEvent.DOM_DELTA_PAGE?x.clientWidth:1,ae=-M.deltaX*Z,W=l.current;(!W||W.kind!=="wheel")&&(H.begin("wheel",-1,0,0,M.timeStamp),W=l.current),L(),y.current=window.setTimeout(V,Wf);let ce=Math.abs(ae),Fe=W.previous;W.previous=ce;let Ve=W.live&&(W.ended||W.origin!==null&&u.current===0),Et=ce>=Fe+Yf,Bt=W.distance!==0&&Math.sign(ae)!==Math.sign(W.distance)&&ce>=Xf;if(Ve&&(Et||Bt)&&(H.end(!1),H.begin("wheel",-1,0,0,M.timeStamp),W=l.current,W.previous=ce),W.ended)return;if(W.decay=ce<Fe?W.decay+1:0,W.peak=Math.max(W.peak,ce),W.distance+=ae,W.live&&W.peak>=qf&&W.decay>=Zf&&ce<W.peak*Jf){H.end(W.crossed);return}!W.live&&Math.abs(W.distance)<8||H.move(W.base+W.distance,M.timeStamp)};return x.addEventListener("wheel",b,{passive:!1}),()=>{x.removeEventListener("wheel",b),L()}},[]);let Q=(x,L)=>o.createElement("div",{ref:V=>{c.current[x]=V},className:`todo-swipe-tray todo-swipe-tray-${x} ${v[x].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${v[x].openWidth}px`}},L.map(V=>o.createElement("button",{key:V.key,type:"button",className:V.cls,tabIndex:-1,title:V.label,"aria-label":V.label,onClick:b=>{b.stopPropagation(),R(),V.run(b.currentTarget)}},V.icon,o.createElement("span",null,V.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:x=>{t||x.pointerType==="mouse"&&x.button!==0||x.target.closest(".todo-swipe-tray")||K("pointer",x.pointerId,x.clientX,x.clientY,x.timeStamp)},onPointerMove:x=>{let L=l.current;if(!L||L.kind!=="pointer"||L.pointerId!==x.pointerId)return;let V=x.clientX-L.originX,b=x.clientY-L.originY;if(!L.live){if(Math.abs(b)>Math.abs(V)){x.currentTarget.hasPointerCapture?.(x.pointerId)&&x.currentTarget.releasePointerCapture(x.pointerId),l.current=null;return}if(Math.abs(V)<8)return;h.current=!0,x.currentTarget.setPointerCapture?.(x.pointerId)}x.preventDefault(),O(L.base+V,x.timeStamp)},onPointerUp:x=>{let L=l.current;!L||L.kind!=="pointer"||L.pointerId!==x.pointerId||(x.currentTarget.hasPointerCapture?.(x.pointerId)&&x.currentTarget.releasePointerCapture(x.pointerId),L.live&&O(L.base+(x.clientX-L.originX),x.timeStamp),se(!0))},onPointerCancel:x=>{let L=l.current;!L||L.kind!=="pointer"||L.pointerId!==x.pointerId||(x.currentTarget.hasPointerCapture?.(x.pointerId)&&x.currentTarget.releasePointerCapture(x.pointerId),R())},onClickCapture:x=>{let L=!!x.target.closest(".todo-swipe-tray");if(L&&(h.current=!1),h.current&&!L){h.current=!1,x.stopPropagation(),x.preventDefault();return}u.current&&!L&&(x.stopPropagation(),x.preventDefault(),R())}},F.length>0&&Q("left",F),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),P.length>0&&Q("right",P))};function Fr(e,t,r){let n=Ie(t);f.ui.openMenu(mt().map(a=>({label:a.label,icon:o.createElement(Te,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ce(a.status))})),{anchor:e})}function ls(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),c=o.useRef(0),u=o.useRef(r);u.current=r;let l=o.useCallback(async()=>{if(i.current)return;let p=a.current;if(p!==null){a.current=null,i.current=!0;try{let g=await n.current(p);!g&&a.current===null&&(a.current=p),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=p),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?s.current=window.setTimeout(()=>{l()},250):a.current!==null&&u.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),l()},[l]),o.useCallback(p=>{a.current=p,c.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,l()},t)},[l,t])}function ng({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,c]=o.useState(e),u=o.useRef(!1);o.useEffect(()=>{u.current||c(e)},[e]);let l=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{u.current=!0},onChange:p=>c(p.target.value),onBlur:()=>{u.current=!1,l()},onKeyDown:p=>{p.key==="Enter"&&p.currentTarget.blur(),p.key==="Escape"&&(c(e),p.currentTarget.blur())}})}function ag(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var ig=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=f.ui.settings,[c,u]=o.useState(ke);o.useEffect(()=>jt(u),[]);let l=c.find(b=>b.id===e),p=Ed(e),g=at(),[h,m]=o.useState(!1),[y,w]=o.useState(!1),[_,F]=o.useState(!1),[P,D]=o.useState(!1),v=o.useRef(null),[C,$]=o.useState(""),z=ag(e),q=o.useSyncExternalStore(o.useCallback(b=>(z.listeners.add(b),()=>{z.listeners.delete(b)}),[z]),()=>z.value,()=>z.value),k=o.useCallback(b=>{z.value={...z.value,...b};for(let M of z.listeners)M()},[z]),N=q.title,U=b=>k({title:b}),B=()=>k({error:d("todo.error.saveDraft")});o.useEffect(()=>{z.revision||z.loadingRevision||(z.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(b=>{b&&!z.revision&&(z.revision={expectedRevision:b.revision,realmGeneration:b.realmGeneration})}).catch(()=>{k({error:d("todo.error.saveDraft")})}).finally(()=>{z.loadingRevision=void 0}))},[z,e,k]);let S=async b=>(z.revision||await z.loadingRevision,z.revision?t.patchTodo(e,b,z.revision):!1),T=ls(async b=>{let M=b.trim()?await S({title:b}):!0;return M&&z.value.title===b&&k({title:null,error:""}),M},500,B),R=ls(async b=>{let M=await S({note:b});return M&&z.value.note===b&&k({note:null,error:""}),M},500,B),G=ls(async b=>{let M=JSON.parse(b),H=await S({tags:M});return H&&JSON.stringify(z.value.tags)===b&&k({tags:null,error:""}),H},0,B);if(o.useEffect(()=>{!l&&!t.loading&&r()},[l,t.loading,r]),!l)return null;let E=b=>{S(b).then(M=>{M||B()})},A=b=>{k({tags:b}),G(JSON.stringify(b))},Y=b=>E({attachments:b.length?b:void 0}),K=b=>E({urls:b.length?b:void 0}),O=we(g);v.current||(v.current=structuredClone(l));let se=()=>{let b=v.current;b&&(T(b.title),R(b.note),E({tags:b.tags,status:b.status,completed:b.completed,priority:b.priority,dueDate:b.dueDate,startTime:b.startTime,endTime:b.endTime,group:b.group,location:b.location,flagged:b.flagged,attachments:b.attachments,urls:b.urls,filePath:b.filePath})),k({title:null,note:null,tags:null,error:""}),r()},X=Ie(l),Q=ue(),x=l.dueDate?`${Qe(l.dueDate.slice(0,10),Q,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${l.startTime?` \xB7 ${l.startTime}${l.endTime?`\u2013${l.endTime}`:""}`:""}`:"",L=(b,M,H,Z=300)=>{f.ui.openPopover(H,{anchor:b,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:M,width:Z})},V=(b,M,H,Z,ae,W="")=>o.createElement("button",{key:b,type:"button",className:`todo-sheet-chip${H?"":" is-empty"}${W?` ${W}`:""}`,"aria-label":H?`${Z}: ${H}`:Z,title:b==="place"&&l.location?l.location.name:void 0,onClick:ce=>ae(ce.currentTarget)},M,o.createElement("span",null,H||Z));return o.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),bt(l,t.removeTodo).then(b=>{b||t.openDetail(l.id)})}},o.createElement($t,null),d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:se},d("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},q.error&&o.createElement("p",{role:"alert"},q.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":X,title:rt(X),"aria-label":`${d("auto.bae7d5be7082")}: ${rt(X)}`,onClick:b=>Fr(b.currentTarget,l,M=>E(M))},o.createElement(Te,{status:X==="open"?null:X,dotCls:Ee(X).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:N??l.title,"aria-label":d("auto.c5e8306a511f"),onChange:b=>{U(b.target.value),T(b.target.value)},onBlur:()=>{N===l.title&&U(null)},onKeyDown:b=>{b.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${l.flagged?" on":""}`,type:"button",onClick:()=>E({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(Pe,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:q.note??l.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:b=>{let M=b.target.value;k({note:M}),R(M)}}),o.createElement("div",{className:"todo-sheet-chips"},V("status",o.createElement(Te,{status:X==="open"?null:X,dotCls:Ee(X).cls}),X==="open"?"":rt(X),d("auto.bae7d5be7082"),b=>Fr(b,l,M=>E(M))),V("due",o.createElement(lt,null),x,d("todo.sheet.date"),b=>L(b,d("todo.edit.schedule"),()=>o.createElement(sg,{todo:l,onPatch:E}),280),l.dueDate&&l.dueDate.slice(0,10)<Q&&!l.completed?"is-overdue":""),V("group",o.createElement("span",{className:"todo-sheet-dot",style:l.group?{background:Se(Ne(l.group,g))}:void 0}),l.group??"",d("todo.edit.group"),b=>{f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>E({group:void 0})},...O.map(M=>({label:M,type:"radio",checked:l.group===M,color:Ne(M,g),onSelect:()=>E({group:M})}))],{anchor:b,align:"start"})}),V("place",o.createElement(Ye,null),l.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),b=>L(b,d("todo.location"),()=>o.createElement(dg,{todo:l,onPatch:E}),320)),V("priority",o.createElement(it,{priority:l.priority}),l.priority==="normal"?"":$e(l.priority),d("auto.886cbff9d9df"),b=>{f.ui.openMenu(We.map(M=>({label:$e(M.id),icon:o.createElement(it,{priority:M.id}),type:"radio",checked:l.priority===M.id,onSelect:()=>E({priority:M.id})})),{anchor:b,align:"start"})})),o.createElement(va,{value:q.tags??l.tags??[],onChange:A,bare:!0}),((l.attachments??[]).length>0||h)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(l.attachments??[]).map(b=>o.createElement(Cc,{key:b,relPath:b,onRemove:()=>Y((l.attachments??[]).filter(M=>M!==b))})),h&&o.createElement(is,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:b=>{(l.attachments??[]).includes(b)||Y([...l.attachments??[],b]),m(!1)}})),((l.urls??[]).length>0||y||l.filePath||_)&&o.createElement("div",{className:"todo-sheet-section"},l.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:l.filePath,onClick:b=>f.workspace.openFile(l.filePath,void 0,{newTab:f.ui.hasModKey(b)})},o.createElement(wt,null),o.createElement("span",null,l.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>E({filePath:void 0})},o.createElement(ve,null))),_&&!l.filePath&&o.createElement(is,{placeholder:d("todo.file.searchLinked"),onCancel:()=>F(!1),onPick:b=>{E({filePath:b}),F(!1)}}),(l.urls??[]).map(b=>o.createElement("div",{className:"todo-detail-url-card",key:b},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:b,onClick:M=>{let H=So(b);H?f.workspace.openFile(H,void 0,{newTab:f.ui.hasModKey(M)}):f.files.openExternalUrl(b)}},o.createElement(co,null),o.createElement("span",null,lg(b))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:b}),onClick:()=>K((l.urls??[]).filter(M=>M!==b))},o.createElement(ve,null)))),y&&o.createElement(ng,{className:"todo-detail-link-input todo-detail-url",value:C,onCommit:b=>{let M=gi(b);M&&!(l.urls??[]).includes(M)&&K([...l.urls??[],M]),$(""),w(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),P&&p.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...p].reverse().map((b,M)=>o.createElement("li",{key:`${b.changedAt}:${M}`},o.createElement("span",null,rt(b.from)," \u2192 ",rt(b.to)),o.createElement("time",{dateTime:b.changedAt},new Date(b.changedAt).toLocaleString(f.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(Ut,null)," ",d("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>w(!0)},o.createElement(co,null)," ",d("todo.sheet.link")),!l.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>F(!0)},o.createElement(wt,null)," ",d("todo.linkedFile")),p.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":P,onClick:()=>D(b=>!b)},d("todo.activity")," (",p.length,")"))))};function sg({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??""),[s,c]=o.useState(e.endTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Vt,{value:r,onChange:u=>{n(u),u||(i(""),c("")),t(u?{dueDate:u}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(Mr,{value:a,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:u=>{i(u),t({startTime:u||void 0,...u?{}:{endTime:void 0}}),u||c("")}}),o.createElement(Mr,{value:s,disabled:!a,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:u=>{if(u&&a&&u<=a){c(s);return}c(u),t({endTime:u||void 0})}})))}function dg({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Mo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function lg(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}var Ko=({c:e})=>e.editingId?o.createElement(ig,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function cg(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function ug(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let u=i+s>>>1;e[u].start+e[u].height<n?i=u+1:s=u}let c=i;for(s=e.length;i<s;){let u=i+s>>>1;e[u].start<=a?i=u+1:s=u}return[c,i]}function Ea(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,c=e.useRef(null),u=e.useRef(new Map),[l,p]=e.useReducer(T=>T+1,0),[g,h]=e.useState({top:0,height:600}),[m,y]=e.useState(null),[w,_]=e.useState(null),F=e.useRef(null),P=e.useRef(null),D=e.useRef(null),v=e.useMemo(()=>{let T=0;return r.map((R,G)=>{let E=u.current.get(R)??(typeof n=="number"?n:n(R,G)),A={id:R,height:E,start:T};return T+=E,A})},[r,n,l]),C=v.length?v[v.length-1].start+v[v.length-1].height:0,$=e.useRef({rows:v,viewport:g});$.current={rows:v,viewport:g};let z=e.useCallback(()=>{let T=c.current,R=F.current;if(!T||!R)return;let G=T.getBoundingClientRect(),E=R.getBoundingClientRect(),A=R.clientHeight||E.height||600,Y=R===T?R.scrollTop:E.top-G.top;h(K=>K.top===Y&&K.height===A?K:{top:Y,height:A})},[]),q=e.useCallback(()=>{P.current===null&&(P.current=(D.current??window).requestAnimationFrame(()=>{P.current=null,z()}))},[z]);e.useLayoutEffect(()=>{let T=c.current;if(!T||!s)return;let R=cg(T);F.current=R;let G=T.ownerDocument.defaultView??window;D.current=G;let E=T.style.overflowAnchor;T.style.overflowAnchor="none";let A=!0,Y=()=>{if(!A)return;let X=T.ownerDocument.activeElement,Q=X instanceof HTMLElement?X:null;for(;Q&&Q.parentElement!==T;)Q=Q.parentElement;y(Q?.dataset.visibleKey??null)},K=()=>{queueMicrotask(Y)};R.addEventListener("scroll",q,{passive:!0}),G.addEventListener("resize",q),T.addEventListener("focusin",Y),T.addEventListener("focusout",K);let O=T.clientWidth,se=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{T.clientWidth!==O&&(O=T.clientWidth,u.current.clear(),p()),q()});return se?.observe(R),R!==T&&se?.observe(T),z(),()=>{A=!1,T.style.overflowAnchor==="none"&&(T.style.overflowAnchor=E),R.removeEventListener("scroll",q),G.removeEventListener("resize",q),T.removeEventListener("focusin",Y),T.removeEventListener("focusout",K),se?.disconnect(),P.current!==null&&G.cancelAnimationFrame(P.current),P.current=null,F.current=null,D.current=null}},[s,z,q]),e.useLayoutEffect(()=>{let T=new Set(r);for(let R of u.current.keys())T.has(R)||u.current.delete(R);z()},[r,z]),e.useLayoutEffect(()=>{u.current.clear(),p()},[i]),e.useLayoutEffect(()=>{let T=c.current;if(!T||!s)return;let R=A=>{let Y=0,K=!1,{rows:O,viewport:se}=$.current,X=new Map(O.map(Q=>[Q.id,Q]));for(let Q of A){let x=Q.dataset.visibleKey,L=x?X.get(x):void 0,V=Q.getBoundingClientRect().height;!x||!L||V<=0||Math.abs(V-L.height)<.5||(u.current.set(x,V),L.start+L.height<=se.top&&(Y+=V-L.height),K=!0)}if(K){let Q=F.current,x=T.closest('[data-visible-sections="true"]'),L=T;for(;L&&L.parentElement!==x;)L=L.parentElement;let V=x&&x!==T&&L&&Q&&L.getBoundingClientRect().bottom<=Q.getBoundingClientRect().top;Y&&Q&&!V&&(Q.scrollTop+=Y),p(),q()}},G=Array.from(T.children).filter(A=>A.hasAttribute("data-visible-key")),E=typeof ResizeObserver>"u"?void 0:new ResizeObserver(A=>R(A.map(Y=>Y.target)));return G.forEach(A=>E?.observe(A)),R(G),()=>E?.disconnect()}),e.useLayoutEffect(()=>{if(!w)return;let T=Array.from(c.current?.children??[]).find(R=>R.dataset.visibleKey===w.id);T&&(T.scrollIntoView?.({block:"nearest"}),w.selector&&(T.matches(w.selector)?T:T.querySelector(w.selector))?.focus(),z(),_(null))},[w,v,z]);let k=e.useCallback((T,R)=>{_({id:T,selector:R})},[]),[N,U]=s?ug(v,g):[0,v.length],B=new Set;for(let T=N;T<U;T++)B.add(T);let S=new Set([...a,m,w?.id].filter(Boolean));return S.size&&v.forEach((T,R)=>{S.has(T.id)&&B.add(R)}),{ref:c,show:k,render(T){let R=[],G=0;for(let E of[...B].sort((A,Y)=>A-Y)){let A=v[E];A.start>G&&R.push(e.createElement("div",{key:`space:${A.id}`,"aria-hidden":!0,style:{height:A.start-G,flex:"0 0 auto",pointerEvents:"none"}})),R.push(e.createElement(e.Fragment,{key:A.id},T(E))),G=A.start+A.height}return C>G&&R.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:C-G,flex:"0 0 auto",pointerEvents:"none"}})),R}}}function Uc(e){return f.markdown.render(e,{inline:!0})}function jc(e,{todo:t,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:s,disabled:c=!1}){let u=Ie(t);n(t.id);let l=Sa(t.dueDate??"",ue(new Date));return f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(qe,{className:"todo-menu-action-icon"}),enabled:!c,submenu:mt().map(p=>({label:p.label,icon:o.createElement(Te,{status:p.status,dotCls:p.cls,color:p.color}),type:"radio",checked:p.status===null?u==="open":u===p.status,onSelect:()=>i(Ce(p.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(lt,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(p=>p.date).map(p=>({label:d(p.labelKey),icon:p.id==="tomorrow"?o.createElement(kr,{className:"todo-menu-action-icon"}):p.id==="weekend"?o.createElement(Kn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:p.date})}))},{label:d(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Pe,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:t.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(Fl,{className:"todo-menu-action-icon"}),enabled:!c,submenu:We.map(p=>({label:$e(p.id),type:"radio",checked:t.priority===p.id,onSelect:()=>i({priority:p.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Fn,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>i({group:void 0})},...r.map(p=>({label:p,type:"radio",checked:t.group===p,onSelect:()=>i({group:p})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(Rl,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement($t,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function Ca(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),jc({x:e.clientX,y:e.clientY},t))}var Da=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:c=>{c.stopPropagation(),jc({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s})}},o.createElement(Pl,null)));function pg({status:e,style:t}){let r=Ee(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},rt(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(Te,{status:e==="open"?null:e,dotCls:r.cls}),rt(e))}function Kc({status:e}){return o.createElement(pg,{status:e,style:Zd()})}var mg=2;function Ia(){let e=ue(new Date),t=f.getState().dateFormat,r=f.ui.language(),n=ze(),a=Cl(),i=JSON.stringify(pr());return o.useMemo(()=>({today:e,dateFormat:t,language:r,statuses:n,icons:a,groupColors:i}),[e,t,r,n,a,i])}function cs(e){let t=new WeakMap;return r=>{let n=t.get(o)??o.memo(e);return t.set(o,n),o.createElement(n,r)}}function Na(e){let t=o.useRef(null);if(t.current?.value===e)return t.current.value;let r=JSON.stringify(e);return t.current?.json!==r&&(t.current={value:e,json:r}),t.current.value}var fg=500;function Bc(){return f.runtime.getOrCreate("todo.titleHtml",()=>({html:new Map,pending:new Map}))}function Vc(e){let t=Bc().html,r=t.get(e);if(r!==void 0)return t.delete(e),t.set(e,r),r}function gg(e){let t=Bc(),r=t.pending.get(e);return r||(r=Uc(e).then(n=>(t.html.set(e,n),t.html.size>fg&&t.html.delete(t.html.keys().next().value),n)).finally(()=>{t.pending.delete(e)}),t.pending.set(e,r)),r}function us(e){let[t,r]=o.useState(()=>Vc(e)??"");return o.useEffect(()=>{let n=Vc(e);if(n!==void 0){r(n);return}let a=!0;return r(""),gg(e).then(i=>{a&&r(i)}).catch(()=>{a&&r("")}),()=>{a=!1}},[e]),t}function ps(e,t,r){let n=Ie(e),a=o.useRef(null),i=o.useRef(null),s=o.useRef(!1),c=o.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return o.useEffect(()=>c,[c]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:a,className:"todo-check","data-status":n,type:"checkbox",checked:n==="completed","aria-disabled":t||void 0,onPointerDown:()=>{t||(s.current=!1,c(),i.current=window.setTimeout(()=>{s.current=!0;let l=a.current;l&&f.ui.openMenu(mt().map(p=>({label:p.label,icon:o.createElement(Te,{status:p.status,dotCls:p.cls,color:p.color}),type:"radio",checked:p.status===null?n==="open":p.status===n,enabled:!t,onSelect:()=>r(e.id,Ce(p.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{s.current&&l.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:l=>{if(s.current){s.current=!1;return}r(e.id,Ce(l.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),n!=="open"&&n!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(Te,{status:n,dotCls:Ee(n).cls}))),cancelHold:c}}var Hc=cs(function({todo:t,groups:r,compact:n,actions:a,pending:i,env:s,hideDate:c=!1,onMoveFocus:u}){let l=o.useRef(null);o.useEffect(()=>()=>{l.current&&clearTimeout(l.current)},[]);let p=us(t.title),g=(O,se)=>f.workspace.openFile(O,void 0,{newTab:se}),h=We.find(O=>O.id===t.priority)??We[0],m=we(r),y=Ie(t),w=[t.filePath,...t.attachments??[]].filter(O=>!!O),[_,F]=o.useState(!1),P=_?w:w.slice(0,mg),D=w.length-P.length,v=t.urls?.length??0,C=n&&w.length>0,$=!!t.remindAt&&!t.reminderFiredAt,z=!!t.status&&t.status!=="open"&&!Ee(t.status,s.statuses).done,q=t.tags?.length??0,k=s.today,N=t.dueDate&&!c?Qe(t.dueDate,k,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,s.dateFormat):"",U=t.dueDate?Ue(t.dueDate,s.dateFormat):"",B=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<k,S=!!(N||t.startTime||$||t.group),T=!!(z||t.priority!=="normal"||t.location||v>0||C),R=o.useRef(null);o.useEffect(()=>R.current?en(t.id,R.current):void 0,[t.id]);let{check:G,cancelHold:E}=ps(t,i,a.patchTodo),A=()=>{uc(t)||a.openDetail(t.id)},Y=O=>a.patchTodo(t.id,O),K=o.useMemo(()=>({reschedule:O=>{a.patchTodo(t.id,{dueDate:O})},pickDate:O=>{f.ui.openPopover(se=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(Vt,{value:t.dueDate?.slice(0,10)??"",onChange:X=>{a.patchTodo(t.id,{dueDate:X}),se.close()}})),{anchor:O},{ariaLabel:d("todo.swipe.date")})},setStatus:O=>Fr(O,t,Y),toggleFlag:()=>{a.patchTodo(t.id,{flagged:!t.flagged})},openDetails:()=>a.openDetail(t.id),remove:()=>{bt(t,a.removeTodo)}}),[t,a]);return o.createElement($c,{todo:t,disabled:i,actions:K,onEngage:E},o.createElement("article",{ref:R,className:`todo-row todo-row-navigable${t.completed?" completed":""}${n?" compact":""}${t.flagged?" flagged":""}`,"data-todo-id":t.id,"data-status":y,tabIndex:0,onContextMenu:O=>Ca(O,{todo:t,groupNames:m,setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:Y,onRequestDelete:()=>bt(t,a.removeTodo),disabled:i}),onKeyDown:O=>{if(O.target===O.currentTarget){if(O.key==="ArrowDown"||O.key==="ArrowUp"){O.preventDefault(),u?.(t.id,O.key==="ArrowDown"?1:-1);return}if(O.key==="Escape"){O.currentTarget.blur();return}O.key==="Enter"&&(O.preventDefault(),a.openDetail(t.id))}},onClick:O=>{O.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||O.detail>1||(l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{l.current=null,A()},220))},onDoubleClick:O=>{l.current&&(clearTimeout(l.current),l.current=null),!O.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&a.openDetail(t.id)}},G,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,h.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${t.priority}`},h.symbol," "),p?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:p}}):o.createElement("span",{className:"todo-title-md"},t.title)),!n&&t.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},t.note),(S||T||!n&&q>0)&&o.createElement("div",{className:"todo-view-meta"},S&&o.createElement("div",{className:"todo-meta-line todo-meta-when"},o.createElement("span",{className:"todo-meta-cluster"},N&&o.createElement("button",{className:`todo-date${B?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:U||N}),onClick:O=>{O.stopPropagation(),A()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(lt,null)),o.createElement("span",{className:"todo-date-day"},N),U&&U!==N&&o.createElement("span",{className:"todo-date-full"},U)),t.startTime&&o.createElement("span",{className:"todo-clock-text"},!N&&o.createElement("span",{className:"todo-meta-icon"},o.createElement($l,null)),t.startTime,t.endTime?`\u2013${t.endTime}`:""),$&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(Gl,null),t.remindAt.slice(11,16))),t.group&&o.createElement("span",{className:"todo-group-text",title:t.group,style:{color:Se(Ne(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-meta-ellipsis"},t.group))),T&&o.createElement("div",{className:"todo-meta-line todo-meta-details"},z&&o.createElement(Kc,{status:t.status}),t.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${t.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(lo,null)),qd(t.priority)),t.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:t.location.name}),onClick:O=>{O.stopPropagation(),Sr(t.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Ye,null)),o.createElement("span",{className:"todo-meta-ellipsis"},t.location.name)),C&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Ut,null)),w.length),v>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(co,null),v>1&&v)),!n&&q>0&&o.createElement("div",{className:"todo-meta-line todo-meta-tags"},t.tags.slice(0,3).map(O=>o.createElement("button",{key:O,className:"todo-tag-text",type:"button",onClick:se=>{se.stopPropagation(),pa(`#${O}`)}},"#",O)),q>3&&o.createElement("span",{className:"todo-tag-more",title:t.tags.slice(3).map(O=>`#${O}`).join(" ")},"+",q-3)))),o.createElement("div",{className:"todo-row-actions"},t.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(Pe,null)),o.createElement(Da,{todo:t,groupNames:m,setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:Y,onRequestDelete:()=>bt(t,a.removeTodo),disabled:i})),!n&&w.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},P.map(O=>o.createElement("button",{key:O,className:"todo-file-card",title:O,onClick:se=>{se.stopPropagation(),g(O,f.ui.hasModKey(se))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},O===t.filePath?o.createElement(wt,null):o.createElement(Ut,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},kc(O)),o.createElement("span",{className:"todo-file-card-kind"},as(O))))),(D>0||_)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${_?" open":""}`,title:_?d("todo.fewerFiles"):d("todo.moreFiles",{p0:D}),"aria-expanded":_,onClick:O=>{O.stopPropagation(),F(se=>!se)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(zn,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},_?d("todo.fewerFiles"):d("todo.moreFiles",{p0:D})))))))});var Wc=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=_e(),s=o.useSyncExternalStore(i.subscribe,i.get,i.get),c=o.useMemo(()=>e.map(y=>y.id),[e]),u=Ea(o,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),l=u.show;o.useLayoutEffect(()=>{s&&c.includes(s.todoId)&&l(s.todoId)},[s,c,l]);let p=Ia(),g=Na(t),h=o.useRef(e);h.current=e;let m=o.useCallback((y,w)=>{let _=h.current,F=_.findIndex(D=>D.id===y),P=_[Math.max(0,Math.min(_.length-1,F+w))];P&&l(P.id,".todo-row")},[l]);return o.createElement("div",{className:"todo-list-rows",ref:u.ref},u.render(y=>o.createElement(Hc,{key:e[y].id,todo:e[y],groups:g,compact:r,actions:a.actions,pending:a.pendingIds.has(e[y].id),env:p,hideDate:n,onMoveFocus:m})))};function qc({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let c=_e(),u=o.useSyncExternalStore(c.subscribe,c.get,c.get),l=o.useMemo(()=>e.map(F=>F.key),[e]),[p,g]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,u?.todoId,p].filter(Boolean)),m=e.filter(F=>F.todos.some(P=>h.has(P.id))).map(F=>F.key),y=o.useCallback((F,P)=>a?.(e[P])??32+e[P].todos.length*(r?52:84),[e,r,a]),w=Ea(o,{ids:l,estimate:y,pinned:m,layoutKey:i??r}),_=w.show;return o.useLayoutEffect(()=>{if(!u)return;let F=e.find(P=>P.todos.some(D=>D.id===u.todoId));F&&_(F.key)},[u,e,_]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:w.ref,onDragStartCapture:F=>g(F.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},w.render(F=>o.cloneElement(s(e[F]),{"data-visible-key":l[F]})))}function hg(e,t,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return ao(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=ao(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:ul(i),p0:`${Sn(t,a,n)} \u2013 ${Sn(dt(s),a,n)}`})}return t===ft(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===ft(r,1)?d("todo.due.tomorrow"):Sn(t,a,n)}function La({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let c=dt(),{shortDateFormat:u}=ct("shortDateFormat"),l=f.ui.language(),p=o.useMemo(()=>{if(!s)return _i(e,a,hr(i));let g=new Map(e.map(m=>[m,Oi(m)])),h=[...e].sort((m,y)=>g.get(y).localeCompare(g.get(m)));return _i(h,a,hr(i),{dateOf:m=>Mi(g.get(m))})},[a,s,e,i]);return o.createElement(qc,{className:"todo-panel-date-sections",sections:p,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},hg(g.kind,g.key,c,u,l)),o.createElement(Wc,{todos:g.todos,groups:t,compact:r,c:n})))}function bg(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function Pa(e,t,r){let n=bg(e,t);return r?n:n.filter(a=>!dr(a))}function ms(){let[e,t]=Tt(),[r]=kt(),a=pt().map(p=>p.id),i=Pa(e,a,r),s=a.filter(p=>!dr(p)),c=a.filter(p=>dr(p)),u=p=>p.length===i.length&&p.every(g=>i.includes(g)),l=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:i.length===a.length,select:()=>{uo(!0),t("all")}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:u(s),select:()=>{uo(!1),t(s)}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:u(c),select:()=>{uo(!0),t(c)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},l.map(p=>o.createElement("button",{key:p.id,type:"button",className:`todo-status-quick-btn${p.active?" active":""}`,"aria-pressed":p.active,"aria-label":p.title,title:p.title,onClick:p.select},p.label)))}function Yc(){let[e,t]=Tt(),[r]=kt(),n=pt(),a=n.map(c=>c.id),i=Pa(e,a,r),s=c=>{let u=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);u.length&&(uo(u.some(l=>dr(l))),t(u.length===a.length?"all":u))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(ms,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let u=i.includes(c.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":u,key:c.id,onClick:()=>s(c.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Te,{status:c.id==="open"?null:c.id,dotCls:c.cls})),o.createElement("span",null,c.label))}))}function Oa(e){return e==="flagged"?o.createElement(Pe,null):e==="priority"?o.createElement(lo,null):e==="due"?o.createElement(xr,null):e==="updated"?o.createElement(Ml,null):e==="created"?o.createElement(_l,null):o.createElement(zl,null)}function yg(){return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-filter-section-label"},d("todo.filters.show")),o.createElement(ms,null))}function fs({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,c]=o.useState(r),u=Object.entries(gr);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{c("desc"),n("desc")}},o.createElement(vr,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{c("asc"),n("asc")}},o.createElement(wr,null)))),o.createElement("div",{className:"todo-sort-options"},u.map(([l,p])=>o.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),t(l)}},Oa(l),o.createElement("span",null,d(p))))))}function Pr({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:c,embedded:u=!1}){let[l,p]=o.useState(a),[g,h]=o.useState(i),m=u?a:l,y=u?i:g,w=m.length===r.length&&(!n||y),_=[...r.map($=>m.some(z=>z.toLowerCase()===$.toLowerCase())),...n?[y]:[]],F=($,z)=>$?` active${_[z-1]?"":" selection-run-start"}${_[z+1]?"":" selection-run-end"}`:"",P=o.useMemo(()=>Qn(e),[e]),D=o.useMemo(()=>Qn(e,!1),[e]),v=($,z)=>{p($),h(z),s($,z)},C=$=>{let z=Cr(D,$),q=$??d("todo.chip.noGroup"),k=$===null?y:m.some(N=>re(N)===re($));return o.createElement("div",{className:"todo-group-filter-item",key:$??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},$&&o.createElement("span",{className:"props-info-dot",style:{background:Se(Ne($,t))}}),q),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,z),o.createElement(f.ui.settings.Toggle,{label:q,checked:k,onChange:()=>v($===null?m:k?m.filter(N=>re(N)!==re($)):[...m,$],$===null?!y:y)}))))};return u?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:c},d("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>v(w?[]:r,w?!1:n)},d(w?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map($=>C($)),n&&C(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>v(w?[]:r,w?!1:n)},d(w?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map(($,z)=>{let q=_[z];return o.createElement("button",{key:$,type:"button",className:`todo-group-filter-row${F(q,z)}`,"aria-pressed":q,onClick:()=>v(q?l.filter(k=>k.toLowerCase()!==$.toLowerCase()):[...l,$],g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},q?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Se(Ne($,t))}}),o.createElement("span",{className:"todo-tree-label"},$),o.createElement("span",{className:"todo-tree-count"},Cr(P,$)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${F(g,r.length)}`,"aria-pressed":g,onClick:()=>v(l,!g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Cr(P,null)))))}var Xc={scheduled:()=>o.createElement(xr,null),today:()=>o.createElement(Tr,null),week:()=>o.createElement(Yn,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(jn,null),completed:()=>o.createElement(qe,null)},wg=()=>{let{activePluginTab:e,dateFormat:t}=ct("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=ya(),a=at(),i=Lr(),[s,c]=o.useState(""),[u,l]=o.useState(""),[p,g]=o.useState(""),[h,m]=o.useState({}),[y,w]=o.useState(!1),[_,F]=o.useState(!1),[P,D]=o.useState(!1),[v,C]=o.useState(!1),{DateField:$,TimeField:z}=f.ui.settings,[q,k]=o.useState(!1),[N,U]=ma(),[B]=kt(),[S,T]=aa("todo"),{sortField:R,sortDir:G,compact:E}=S,[A,Y]=Tt(),K=pt(),O=ia(),se=ua(),X=o.useMemo(()=>Jl(se),[se]),Q=e?.pluginId===f.pluginId,x=o.useRef(null),L=o.useRef(null),V=o.useRef(null),b=$o(R,G,"left_sidebar");To(b.openDetail);let M=ue(new Date),H=o.useMemo(()=>Ql(b.todos,M),[b.todos,M]),Z=o.useMemo(()=>Qn(b.todos),[b.todos]),ae=o.useMemo(()=>we(a),[a]),W=o.useMemo(()=>b.todos.some(I=>!I.group),[b.todos]),ce=i.kind==="groups"?i.names:ae,Fe=i.kind==="groups"?i.includeUngrouped===!0:W,Ve=ce.length===ae.length&&(!W||Fe),Et=o.useMemo(()=>{let I=b.ordered.filter(te=>Jn(te,i,B,M));return A!=="all"&&(I=I.filter(te=>No(te,A))),N.trim()&&(I=I.filter(gn(N))),n?I=I.filter(te=>{let ge=te.dueDate?.slice(0,10);return!!ge&&ge>=n.start&&ge<=n.end}):r&&(I=I.filter(te=>te.dueDate?.slice(0,10)===r)),I},[b.ordered,i,B,A,N,r,n,M]),Bt=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Ur=async()=>{if(b.creating)return;let I=En(s,M),te=I.title;if(!te){Vo();return}let ge=Bt;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let Xe=await f.ui.openMenu([...i.names.map((Wo,Ua)=>({id:`group:${Ua}`,label:Wo})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:x.current??V.current,align:"start"});if(Xe===null)return;ge=Xe.startsWith("group:")?i.names[Number(Xe.slice(6))]:void 0}C(!1);let Be={note:u.trim(),tags:[...new Set([...h.tags??[],...p.split(/[\s,]+/).map(Xe=>Xe.replace(/^#+/,"")).filter(Boolean)])],priority:I.priority,...ge?{group:ge}:{}};i.kind==="smart"&&i.id==="flagged"&&(Be.flagged=!0),Object.assign(Be,{...h,tags:Be.tags}),I.dueDate&&(Be.dueDate=I.dueDate),await b.create(te,void 0,{patch:Be})?(C(!1),c(""),l(""),g(""),m({}),w(!1),F(!1),D(!1),x.current?.focus()):C(!0)},$a=()=>{k(!0),window.setTimeout(()=>x.current?.focus(),0)},Vo=()=>{c(""),k(!1),l(""),g(""),m({}),w(!1),F(!1),D(!1),C(!1)},Ct=_e(),jr=o.useSyncExternalStore(Ct.subscribe,Ct.get,Ct.get);o.useEffect(()=>{jr?.mode==="create"&&(k(!0),Ct.clear())},[jr,Ct]),o.useEffect(()=>{q&&!b.creating&&x.current?.focus()},[q,Q,b.creating]),o.useLayoutEffect(()=>{L.current&&(L.current.style.height="auto",L.current.style.height=`${L.current.scrollHeight}px`)},[u,q]);let Bo=h.dueDate??"",Kr=q&&o.createElement("form",{className:"todo-compose",onSubmit:I=>{I.preventDefault(),Ur()},onKeyDown:I=>{I.key==="Escape"&&!I.defaultPrevented&&!b.creating&&(I.preventDefault(),Vo())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:x,className:"todo-compose-title",value:s,onChange:I=>c(I.target.value),placeholder:Bt?d("todo.newTodoIn",{p0:Bt}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:b.creating}),o.createElement("textarea",{ref:L,className:"todo-compose-note",rows:1,value:u,onChange:I=>l(I.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:b.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(I=>o.createElement("span",{className:"todo-compose-token",key:I},o.createElement("span",null,"#",I),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:I}),disabled:b.creating,onClick:()=>m(te=>({...te,tags:te.tags?.filter(ge=>ge!==I)}))},o.createElement(ve,null)))),o.createElement("input",{value:p,onChange:I=>{let te=I.target.value;if(!("isComposing"in I.nativeEvent&&I.nativeEvent.isComposing)&&/[\s,]/.test(te)){let ge=te.split(/[\s,]+/),Be=ge.pop()??"";m(Ht=>({...Ht,tags:[...new Set([...Ht.tags??[],...ge.map(Xe=>Xe.replace(/^#+/,"")).filter(Boolean)])]})),g(Be)}else g(te)},onKeyDown:I=>{I.nativeEvent.isComposing||(I.key==="Enter"&&p.trim()&&(I.preventDefault(),m(te=>({...te,tags:[...new Set([...te.tags??[],p.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),I.key==="Backspace"&&!p&&m(te=>({...te,tags:te.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:b.creating})),_&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement($,{className:"todo-compose-date-field",value:Bo,onChange:I=>m(te=>({...te,dueDate:I})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:b.creating}),o.createElement(z,{className:"todo-compose-time-field",value:h.startTime??"",onChange:I=>m(te=>({...te,startTime:I||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:b.creating})),P&&o.createElement("div",{className:"todo-compose-location"},o.createElement(Mo,{value:h.location,disabled:b.creating,onChange:I=>m(te=>({...te,location:I}))})),(y||!!h.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(I=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:I,title:I},o.createElement(Ut,null),o.createElement("span",null,I.split("/").pop()),o.createElement("button",{type:"button",disabled:b.creating,"aria-label":`${d("todo.removeAttachment")}: ${I}`,onClick:()=>m(te=>({...te,attachments:te.attachments?.filter(ge=>ge!==I)}))},o.createElement(ve,null)))),y&&o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:b.creating,onChange:I=>{I&&(m(te=>({...te,attachments:[...new Set([...te.attachments??[],I])]})),w(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${Bo?" has-value":""}`,"aria-pressed":_,disabled:b.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>F(I=>!I)},o.createElement(lt,null),Bo&&o.createElement("span",null,Qe(Bo,M,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),t),h.startTime?` ${h.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${h.location?" has-value":""}`,"aria-pressed":P,disabled:b.creating,"aria-label":d("todo.compose.addPlace"),title:h.location?.name??d("todo.compose.addPlace"),onClick:()=>D(I=>!I)},o.createElement(Ye,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${h.attachments?.length?" has-value":""}`,"aria-pressed":y,disabled:b.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>w(I=>!I)},o.createElement(Ut,null),!!h.attachments?.length&&o.createElement("span",null,h.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${h.priority&&h.priority!=="normal"?" has-value":""}`,disabled:b.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async I=>{let te=await f.ui.openMenu(We.map(ge=>({id:ge.id,label:d(ge.labelKey),checked:ge.id===(h.priority??"normal")})),{anchor:I.currentTarget,align:"start"});te&&m(ge=>({...ge,priority:te}))}},o.createElement(lo,null),h.priority&&h.priority!=="normal"&&o.createElement("span",null,d(`todo.priority.${h.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(I=>({...I,flagged:!(I.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":h.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:b.creating},o.createElement(Pe,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||b.creating},d("todo.group.add"))),v&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:Vo,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:b.creating},o.createElement(ve,null))),Ho=I=>{f.ui.openPopover(({close:te})=>o.createElement("div",{className:"todo-filter-popover-stack"},o.createElement(yg,null),(ae.length>0||W)&&o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-filter-divider"}),o.createElement(Pr,{todos:b.todos,groups:a,names:ae,hasUngrouped:W,selected:ce,includeUngrouped:Fe,onChange:(ge,Be)=>Ke(ge.length===ae.length&&(!W||Be)?Oe:{kind:"groups",names:ge,includeUngrouped:Be}),onOpenSettings:()=>{te(),Kt()}}))),{anchor:I,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.title"),width:248})},Vr=I=>{f.ui.openPopover(()=>o.createElement(fs,{sortField:R,setSortField:te=>T({sortField:te}),sortDir:G,setSortDir:te=>T({sortDir:te})}),{anchor:I,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},j=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},ee=(I,te,ge,Be,Ht,Xe,Wo,Ua)=>{let xs=ea(i,te),Ts=te.kind==="groups"&&te.names.length===1&&!te.includeUngrouped&&i.kind==="groups"?i.names.some(yo=>re(yo)===re(te.names[0])):xs;return o.createElement("button",{key:et(te),type:"button",className:`todo-tree-row${Ht?" nested":""}${Xe?` todo-${Xe}-chip`:""}${Ts?" active":""}`,"aria-current":xs?"true":void 0,"aria-label":Xe?`${I} ${ge}`:void 0,title:Xe?I:void 0,"aria-pressed":te.kind==="groups"?Ts:void 0,style:Wo?{"--todo-chip-color":Se(Wo),"--todo-chip-on":Ua??Lt(Wo)}:void 0,onClick:yo=>Nr(te,es(yo)),onAuxClick:yo=>{yo.button===1&&(yo.preventDefault(),Nr(te,!0))}},Be&&o.createElement("span",{className:"todo-tree-icon"},Be),Ht&&o.createElement("span",{className:"todo-tree-dot",style:{background:Se(Ht)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},I),o.createElement("span",{className:"todo-tree-count"},ge))},be=!!(N||r||n||A!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),st=n?`${Ue(n.start,t)} \u2013 ${Ue(n.end,t)}`:r?Ue(r,t):null,bo=A==="all"?null:`${d("auto.bae7d5be7082")}: ${A.length===1?K.find(I=>I.id===A[0])?.label??d("todo.chip.all"):d("todo.filters.statusCount",{count:A.length})}`,Dt=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!Q&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${B||A!=="all"||!Ve?" active":""}`,"aria-label":d("todo.filters.title"),title:d("todo.filters.title"),type:"button",onClick:I=>Ho(I.currentTarget)},o.createElement(ql,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":E,title:E?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>T({compact:!E})},E?o.createElement(Mn,null):o.createElement(_n,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${G==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(gr[R])}`,type:"button",onClick:I=>Vr(I.currentTarget)},G==="asc"?o.createElement(wr,null):o.createElement(vr,null),Oa(R))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:I=>es(I)?Go(i,!0):f.workspace.openMainTab(),onAuxClick:I=>{I.button===1&&(I.preventDefault(),Go(i,!0))}}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(yt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:N,onChange:I=>U(I.target.value),onKeyDown:I=>{I.key==="Escape"&&U("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),N&&o.createElement("button",{className:"search-field-action",onClick:()=>U(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(ve,null)))),Q?o.createElement("div",{className:"todo-tree todo-active-navigation"},Kr,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},X.map(I=>ee(d(I.labelKey),{kind:"smart",id:I.id},H[I.id],Xc[I.id](),void 0,"smart",I.color,Er(I,Lt)))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),ae.map(I=>ee(I,{kind:"groups",names:[I]},Cr(Z,I),void 0,Ne(I,a))))):o.createElement(o.Fragment,null,!N&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},st?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:j},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Tr,null)),o.createElement("span",{className:"todo-tree-label"},st),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(ve,null))):X.map(I=>ee(d(I.labelKey),{kind:"smart",id:I.id},H[I.id],Xc[I.id](),void 0,"smart",I.color,Er(I,Lt)))),bo&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>Y("all")},o.createElement("span",{className:"todo-tree-label"},bo),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(ve,null)))),o.createElement("div",{className:"todo-list"},Kr,b.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):Et.length?o.createElement(La,{todos:Et,groups:a,compact:E,controller:b,mode:O,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,be)))),!q&&o.createElement("button",{ref:V,className:"todo-fab",type:"button","aria-label":Dt,title:Dt,disabled:b.creating,onClick:$a},o.createElement(so,null)),o.createElement(Ko,{c:b}))},Zc=()=>o.createElement(wg,null);function vg({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=pt(),[i,s]=o.useState(e),[c,u]=o.useState(r),l=a.map(m=>m.id),p=c==="all"?l:c,g=m=>{s(m),t(m)},h=m=>{let y=p.includes(m)?p.filter(_=>_!==m):l.filter(_=>p.includes(_)||_===m);if(!y.length)return;let w=y.length===l.length?"all":y;u(w),n(w)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>o.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":p.includes(m.id),onClick:()=>h(m.id)},o.createElement("span",{className:"todo-status-filter-check"},p.includes(m.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Te,{status:m.id==="open"?null:m.id,dotCls:m.cls})),o.createElement("span",null,m.label)))))}var Jc=()=>{let{activePath:e,weekStart:t}=ct("activePath","weekStart"),r=Wt(e)??"",n=at(),a=ia(),[i,s]=aa("attachment"),{showCompleted:c,statusFilter:u,compact:l,sortField:p,sortDir:g,groupNames:h,includeUngrouped:m}=i,y=k=>s({showCompleted:k}),w=k=>s({statusFilter:k}),_=k=>s({sortField:k}),F=k=>s({sortDir:k}),P=$o(p,g,"right_sidebar");To(P.openDetail);let D=o.useMemo(()=>we(n),[n]),v=o.useMemo(()=>P.todos.some(k=>!k.group),[P.todos]),C=o.useMemo(()=>P.ordered.filter(k=>!(Wt(k.filePath)===r||(k.attachments??[]).some(U=>Wt(U)===r))||!c&&k.completed||(h.length||m)&&(!k.group&&!m||k.group&&!new Set(h.map(re)).has(re(k.group)))?!1:No(k,u)),[P.ordered,r,c,u,h,m]),$=k=>{f.ui.openPopover(({close:N})=>o.createElement(Pr,{todos:P.todos,groups:n,names:D,hasUngrouped:v,selected:h,includeUngrouped:m,onChange:(U,B)=>s({groupNames:U,includeUngrouped:B}),onOpenSettings:()=>{N(),Kt()}}),{anchor:k,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},z=k=>{f.ui.openPopover(()=>o.createElement(vg,{showCompleted:c,setShowCompleted:y,filter:u,setFilter:w}),{anchor:k,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},q=k=>{f.ui.openPopover(()=>o.createElement(fs,{sortField:p,setSortField:_,sortDir:g,setSortDir:F}),{anchor:k,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||m?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:k=>$(k.currentTarget)},o.createElement(Rn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||u!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:k=>z(k.currentTarget)},o.createElement(qe,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!l})},l?o.createElement(Mn,null):o.createElement(_n,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${g==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(gr[p])}`,onClick:k=>q(k.currentTarget)},g==="asc"?o.createElement(wr,null):o.createElement(vr,null),Oa(p)))),o.createElement("div",{className:"todo-list"},P.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?C.length?o.createElement(La,{todos:C,groups:n,compact:l,controller:P,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(Ko,{c:P}))};var Qc=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],xg=["title","due","priority","group","note"],Ma=[10,20,30,40,50,100,200,500],At=We.map(e=>e.id).reverse(),gs=Qc.map(e=>e.id),ho={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function fo(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var go=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function eu(e){let[t,r]=o.useState({due:ho.due,priority:ho.priority,flagged:ho.flagged,mins:{...Rr}}),n=f.getState().dateFormat,a=f.ui.language();return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let s=ue(new Date),c={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},u=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(w,_)=>Qe(`2030-${String(_+1).padStart(2,"0")}-28`,s,c,a,n))],l=Math.max(...u.map(w=>fo(i,"todo-table-cell-btn is-overdue",`<span>${go(w)}</span><span class="todo-table-time">23:59</span>`)),fo(i,"todo-table-sort active",`<span>${go(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),p=Math.max(...At.map(w=>fo(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${go($e(w))}</span>`)),fo(i,"todo-table-sort active",`<span>${go(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=fo(i,"todo-table-sort active",`<span>${go(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),h=w=>fo(i,"todo-table-sort active",`<span>${go(d(w))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(Ra.map(w=>[w,Math.max(Rr[w],h(w==="title"?"todo.table.title":_a[w]))])),y={due:Math.max(l+10,96),priority:Math.max(p+10,72),flagged:Math.max(g+10,48),mins:m};r(w=>JSON.stringify(w)===JSON.stringify(y)?w:y)},[e,n,a]),t}var Tg=360;function tu(e,t){let[r,n]=o.useState(ho.tags),a=o.useMemo(()=>[...new Set(t.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],[t]),i=a.join("\0");return o.useLayoutEffect(()=>{let s=e.current;if(!s)return;let c=Math.max(0,...a.map(u=>fo(s,"",u.split(`
`).map(l=>`<span class="todo-table-tag">#${go(l)}</span>`).join(""))));n(Math.min(Tg,Math.max(ho.tags,c+12)))},[e,i]),r}var ou=240,ru=82,_a=Object.fromEntries(Qc.map(e=>[e.id,e.labelKey]));function kg(e){if(!Array.isArray(e))return xg;let t=[...new Set(e)].filter(r=>r==="title"||gs.includes(r));return t.includes("title")?t:["title",...t]}function Sg(e){return Array.isArray(e)?At.filter(t=>e.includes(t)):[]}function nu(e){return Ma.includes(e)?e:Ma[0]}function Gr(e,t){let[r,n]=o.useState(()=>t(f.settings.get()[e]));o.useEffect(()=>f.settings.subscribe(()=>{let i=t(f.settings.get()[e]);n(s=>JSON.stringify(s)===JSON.stringify(i)?s:i)}),[e,t]);let a=o.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var za=()=>Gr("pageColumns",kg),Fa=e=>e==="title"?"todo.table.title":_a[e],$r=()=>Gr("pagePriorityFilter",Sg),Ra=["title","note","group","location","tags"],Rr={title:180,note:120,group:104,location:104,tags:96},hs=900;function au(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of Ra){let a=t[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(hs,Math.max(Rr[n],a))))}return r}function Ag({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function iu(){let[e]=Tt(),[t]=kt(),n=pt().map(c=>c.id),a=Pa(e,n,t),i=e!=="all"&&a.length!==n.length,s=d("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":s,title:s,onClick:c=>{f.ui.openPopover(()=>o.createElement(Yc,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},o.createElement(qe,null))}function Eg(){let[e,t]=$r();return o.createElement("div",{className:"todo-status-filter-menu"},At.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):At.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(it,{priority:r})),o.createElement("span",null,$e(r)))}))}function su(){let[e]=$r();return o.createElement(Ag,{label:d("todo.table.priority"),active:e.length>0,icon:o.createElement(lo,null),onOpen:t=>{f.ui.openPopover(()=>o.createElement(Eg,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function Cg(){let[e,t]=za(),r=[...e,...gs.filter(u=>!e.includes(u))],[n,a]=o.useState(null),[i,s]=o.useState(null),c=(u,l,p)=>{if(u===l)return;let g=r.filter(h=>h!==u);g.splice(g.indexOf(l)+(p?1:0),0,u),t(g.filter(h=>e.includes(h)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),s(null)}},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((u,l)=>{let p=e.includes(u),g=u==="title",h=d(Fa(u));return o.createElement("div",{key:u,className:`todo-column-option${g?" is-locked":""}${n===u?" is-dragging":""}${i?.id===u?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let y=m.currentTarget.getBoundingClientRect();s({id:u,after:m.clientY>y.top+y.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),s(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:h}),title:d("todo.table.reorderColumn",{p0:h}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",u);let y=m.currentTarget.parentElement;y&&m.dataTransfer.setDragImage(y,12,y.offsetHeight/2),a(u)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let y=r[l+(m.key==="ArrowUp"?-1:1)];y&&c(u,y,m.key==="ArrowDown")}},o.createElement(Oo,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":p,disabled:g,onClick:()=>t(r.filter(m=>m===u?!p:e.includes(m)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",null,h)))}))}function du(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>o.createElement(Cg,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},o.createElement(Hl,null))}function bs({field:e,label:t,className:r,sort:n,onSort:a,width:i,resize:s,thProps:c}){let u=n.field===e,l=u?n.dir==="asc"?Bn:Hn:Vn;return o.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":u?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${u?" active":""}`,"aria-label":t,title:t,onClick:()=>a(u?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(l,null)),s)}function lu({id:e,label:t,min:r,onDrag:n,onCommit:a,onReset:i}){let s=o.useRef(null),c=u=>Math.round(Math.min(hs,Math.max(r,u)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:t}),title:d("todo.table.resizeColumn",{p0:t}),onClick:u=>u.stopPropagation(),onDoubleClick:u=>{u.stopPropagation(),i(e)},onPointerDown:u=>{if(u.button!==0)return;u.preventDefault(),u.stopPropagation();let l=u.currentTarget.parentElement,p=l?l.getBoundingClientRect().width:Rr[e];s.current={startX:u.clientX,startWidth:p,width:p},u.currentTarget.setPointerCapture?.(u.pointerId),u.currentTarget.classList.add("is-dragging")},onPointerMove:u=>{if(!s.current)return;let l=c(s.current.startWidth+u.clientX-s.current.startX);s.current.width=l,n(e,l)},onPointerUp:u=>{s.current&&(u.currentTarget.classList.remove("is-dragging"),u.currentTarget.releasePointerCapture?.(u.pointerId),a(e,s.current.width),s.current=null)},onPointerCancel:u=>{u.currentTarget.classList.remove("is-dragging"),s.current=null}})}var cu='input, button, a, textarea, [contenteditable="true"]',uu=cs(function({todo:t,groups:r,columns:n,actions:a,pending:i,env:s,selected:c,onPick:u}){let l=o.useRef(null);o.useEffect(()=>l.current?en(t.id,l.current):void 0,[t.id]);let p=us(t.title),g=Uo(t.note),{check:h}=ps(t,i,a.patchTodo),m=Ie(t),y=E=>a.patchTodo(t.id,E),w=s.today,_=s.dateFormat,F=t.dueDate?Qe(t.dueDate,w,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,_):"",P=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<w,[D,v]=o.useState(!1),C=o.useRef(null);o.useEffect(()=>()=>{C.current&&clearTimeout(C.current)},[]);let[$,z]=o.useState(t.title),q=()=>{let E=$.trim();v(!1),E&&E!==t.title&&y({title:E})},[k,N]=o.useState(null),U=(E,A)=>{N(E),A.catch(()=>{}).finally(()=>N(Y=>Y===E?null:Y))},B=(E,A,Y,K,O=260)=>{U(E,f.ui.openPopover(K,{anchor:A,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:Y,width:O}))},S=(E,A,Y)=>k===E?o.createElement("span",{className:"todo-table-placeholder"},A,o.createElement("span",null,Y)):null,T=E=>`todo-table-${E}${k===E?" is-editing":""}`,R=E=>{let A=t.note,Y=()=>{A!==t.note&&y({note:A})};N("note"),f.ui.openPopover(({close:K})=>o.createElement(xa,{initial:t.note,onInput:O=>{A=O},onDone:()=>{Y(),K()}}),{anchor:E,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(Y(),!0)}).catch(()=>{}).finally(()=>N(K=>K==="note"?null:K))},G=E=>{switch(E){case"note":return o.createElement("td",{className:T("note"),title:g||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:A=>R(A.currentTarget)},g?o.createElement("span",{className:"todo-table-note-text"},g):S("note",null,d("todo.table.note"))));case"group":return o.createElement("td",{className:T("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:A=>U("group",f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>y({group:void 0})},...we(r).map(Y=>({label:Y,type:"radio",checked:t.group===Y,color:Ne(Y,r),onSelect:()=>y({group:Y})}))],{anchor:A.currentTarget,align:"start"}))},t.group?o.createElement("span",{className:"todo-table-group-pill",title:t.group,style:{"--todo-group-color":Se(Ne(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},t.group)):S("group",null,d("todo.table.group"))));case"priority":return o.createElement("td",{className:T("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${t.priority==="normal"?" muted":""}`,disabled:i,title:d("todo.table.priority"),onClick:A=>U("priority",f.ui.openMenu(At.map(Y=>({label:$e(Y),icon:o.createElement(it,{priority:Y}),type:"radio",checked:t.priority===Y,onSelect:()=>y({priority:Y})})),{anchor:A.currentTarget}))},o.createElement(it,{priority:t.priority}),o.createElement("span",null,$e(t.priority))));case"due":return o.createElement("td",{className:T("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${P?" is-overdue":""}`,disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:t.dueDate?Ue(t.dueDate,_):d("todo.field.dueDate"),onClick:A=>B("due",A.currentTarget,d("todo.field.dueDate"),()=>o.createElement(Ic,{todo:t,onPatch:Y=>{y(Y)}}),240)},o.createElement("span",null,F),t.startTime&&o.createElement("span",{className:"todo-table-time"},t.startTime)));case"flagged":return o.createElement("td",{className:T("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${t.flagged?" on":""}`,"aria-pressed":!!t.flagged,disabled:i,"aria-label":d("todo.flag"),title:d(t.flagged?"todo.flagged":"todo.flag"),onClick:()=>y({flagged:!t.flagged})},o.createElement(Pe,null)));case"location":return o.createElement("td",{className:T("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:t.location?.name??d("todo.field.location"),onClick:A=>B("location",A.currentTarget,d("todo.field.location"),()=>o.createElement(ka,{todo:t,onPatch:Y=>{y(Y)}}),300)},t.location?o.createElement(o.Fragment,null,o.createElement(Ye,null),o.createElement("span",null,t.location.name)):S("location",o.createElement(Ye,null),d("todo.field.location"))));case"tags":return o.createElement("td",{className:T("tags"),title:t.tags?.map(A=>`#${A}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:i,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:A=>B("tags",A.currentTarget,d("todo.edit.tags"),()=>o.createElement(Ta,{todo:t,onPatch:Y=>{y(Y)}}),280)},t.tags?.length?t.tags.map(A=>o.createElement("span",{key:A,className:"todo-table-tag"},"#",A)):S("tags",null,d("todo.table.tags"))))}};return o.createElement("tr",{ref:l,className:`todo-table-row${t.completed?" completed":""}${c?" selected":""}${k||D?" is-editing":""}`,"data-todo-id":t.id,"data-status":m,"aria-selected":c,tabIndex:0,onContextMenu:E=>Ca(E,{todo:t,groupNames:we(r),setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:y,onRequestDelete:()=>bt(t,a.removeTodo),disabled:i}),onKeyDown:E=>{if(E.target===E.currentTarget)if(E.key==="ArrowDown"||E.key==="ArrowUp"){E.preventDefault();let A=E.key==="ArrowDown"?E.currentTarget.nextElementSibling:E.currentTarget.previousElementSibling;for(;A&&!A.classList.contains("todo-table-row");)A=E.key==="ArrowDown"?A.nextElementSibling:A.previousElementSibling;A?.focus()}else E.key==="Enter"?(E.preventDefault(),a.openDetail(t.id)):E.key===" "?(E.preventDefault(),u(t.id,!1)):E.key==="Escape"&&E.currentTarget.blur()},onClick:E=>{E.target.closest(cu)||(f.ui.hasModKey(E)||E.shiftKey)&&u(t.id,E.shiftKey)},onDoubleClick:E=>{let A=!!E.target.closest(".todo-table-title-btn");A&&C.current&&(clearTimeout(C.current),C.current=null),!(!A&&E.target.closest(cu)||f.ui.hasModKey(E)||E.shiftKey)&&a.openDetail(t.id)}},o.createElement("td",{className:"todo-table-select"},h),n.map(E=>o.createElement(o.Fragment,{key:E},E==="title"?o.createElement("td",{className:"todo-table-title"},D?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:$,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:A=>z(A.target.value),onBlur:q,onKeyDown:A=>{A.nativeEvent.isComposing||(A.key==="Enter"?(A.preventDefault(),q()):A.key==="Escape"&&(A.preventDefault(),z(t.title),v(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:i,"aria-label":d("todo.table.editTitle",{p0:t.title}),onClick:A=>{if(f.ui.hasModKey(A)||A.shiftKey){u(t.id,A.shiftKey);return}A.detail>1||(C.current&&clearTimeout(C.current),C.current=setTimeout(()=>{C.current=null,z(t.title),v(!0)},220))}},p?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:p}}):o.createElement("span",{className:"todo-table-title-text"},t.title))):G(E))),o.createElement("td",{className:"todo-table-actions"},t.flagged&&!n.includes("flagged")&&o.createElement("span",{className:"todo-table-flag",title:d("todo.flagged")},o.createElement(Pe,null)),o.createElement(Da,{todo:t,groupNames:we(r),setOpenId:a.setMenuId,onEdit:()=>a.openDetail(t.id),onPatch:y,onRequestDelete:()=>bt(t,a.removeTodo),disabled:i})))});function Dg(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function pu({order:e,groups:t,c:r,newTaskPatch:n,active:a,onActivate:i,onRemove:s}){let[c,u]=o.useState(""),[l,p]=o.useState({}),g=o.useRef(null),h=o.useRef(null),m=o.useRef(!1),[y,w]=o.useState(!0);o.useEffect(()=>{let k=()=>{let U=g.current;U&&(!U.ownerDocument.hasFocus()&&!/jsdom/i.test(navigator.userAgent)&&U.ownerDocument.defaultView?.focus(),U.focus())};k();let N=window.setTimeout(k,60);return()=>window.clearTimeout(N)},[]);let _=async k=>{let N=ue(new Date);for(let U of k){let B=En(U,N);if(!B.title)continue;let S=B.dueDate||l.dueDate;await r.create(B.title,void 0,{patch:{...n?.(),priority:B.priority!=="normal"?B.priority:l.priority??B.priority,...S?{dueDate:S}:{},...l.group?{group:l.group}:{},...l.flagged?{flagged:!0}:{},...l.note?.trim()?{note:l.note}:{},...l.location?{location:l.location}:{},...l.tags?.length?{tags:l.tags}:{},...l.status?Ce(l.status):{}}})}u(""),g.current?.focus()},F=s,P=!c.trim(),D=()=>{window.setTimeout(()=>{let k=h.current?.ownerDocument;m.current||!k||!k.hasFocus()||h.current?.contains(k.activeElement)||(P?F():w(!1))},0)};o.useEffect(()=>{let k=U=>{m.current||h.current?.contains(U.target)||(P?F():w(!1))},N=h.current?.ownerDocument;return N?.addEventListener("pointerdown",k,!0),()=>N?.removeEventListener("pointerdown",k,!0)});let v=o.useRef(a);o.useEffect(()=>{v.current&&!a&&(P?F():w(!1)),v.current=a});let C=k=>{m.current=!0,k.catch(()=>{}).finally(()=>{m.current=!1,g.current?.focus()})},$=k=>{switch(k){case"due":{let N=l.dueDate,U=N?Qe(N,ue(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"";return o.createElement("td",{key:k,className:"todo-table-due"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:B=>C(f.ui.openPopover(({close:S})=>o.createElement("div",{className:"todo-cell-editor"},o.createElement(Vt,{value:N??"",onChange:T=>{p(R=>({...R,dueDate:T||void 0})),S()}})),{anchor:B.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},U?o.createElement("span",null,U):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let N=l.priority??"normal";return o.createElement("td",{key:k,className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${N==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:U=>C(f.ui.openMenu(At.map(B=>({label:$e(B),icon:o.createElement(it,{priority:B}),type:"radio",checked:N===B,onSelect:()=>p(S=>({...S,priority:B}))})),{anchor:U.currentTarget}))},o.createElement(it,{priority:N}),o.createElement("span",null,$e(N))))}case"group":return o.createElement("td",{key:k,className:"todo-table-group"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:N=>C(f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>p(U=>({...U,group:void 0}))},...we(t).map(U=>({label:U,type:"radio",checked:l.group===U,color:Ne(U,t),onSelect:()=>p(B=>({...B,group:U}))}))],{anchor:N.currentTarget,align:"start"}))},l.group?o.createElement("span",{className:"todo-table-group-pill",title:l.group,style:{"--todo-group-color":Se(Ne(l.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},l.group)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return o.createElement("td",{key:k,className:"todo-table-flagged"},o.createElement("button",{type:"button",className:`todo-table-flag-btn${l.flagged?" on":""}`,"aria-pressed":!!l.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>p(N=>({...N,flagged:!N.flagged||void 0}))},o.createElement(Pe,null)));case"note":return o.createElement("td",{key:k,className:"todo-table-note",title:l.note||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:N=>{let U=l.note??"",B=()=>p(S=>({...S,note:U||void 0}));C(f.ui.openPopover(({close:S})=>o.createElement(xa,{initial:l.note??"",onInput:T=>{U=T},onDone:()=>{B(),S()}}),{anchor:N.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(B(),!0)}))}},l.note?o.createElement("span",{className:"todo-table-note-text"},Uo(l.note)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return o.createElement("td",{key:k,className:"todo-table-location"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:N=>C(f.ui.openPopover(()=>o.createElement(ka,{todo:{location:l.location},onPatch:U=>p(B=>({...B,location:U.location}))}),{anchor:N.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},l.location?o.createElement(o.Fragment,null,o.createElement(Ye,null),o.createElement("span",null,l.location.name)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return o.createElement("td",{key:k,className:"todo-table-tags"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:N=>C(f.ui.openPopover(()=>o.createElement(Ta,{todo:{tags:l.tags??[]},onPatch:U=>p(B=>({...B,tags:U.tags}))}),{anchor:N.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},l.tags?.length?l.tags.map(N=>o.createElement("span",{key:N,className:"todo-table-tag"},"#",N)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return o.createElement("td",{key:k,className:`todo-table-${k}`})}},z=l.status?mt().find(k=>k.status===l.status):void 0,q=k=>C(f.ui.openMenu(mt().map(N=>({label:N.label,icon:o.createElement(Te,{status:N.status,dotCls:N.cls,color:N.color}),type:"radio",checked:N.status===null?!l.status:N.status===l.status,onSelect:()=>p(U=>({...U,status:N.status}))})),{anchor:k}));return o.createElement("tr",{className:"todo-table-new-row"+(y&&a?"":" is-idle"),ref:h,onBlur:D,onFocus:()=>{w(!0),i()}},o.createElement("td",{className:"todo-table-select"},o.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:z?.label??d("todo.table.status"),onClick:k=>q(k.currentTarget)},z?o.createElement(Te,{status:z.status,dotCls:z.cls}):o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),e.map(k=>k==="title"?o.createElement("td",{key:k,className:"todo-table-title"},o.createElement("input",{ref:g,className:"todo-table-new-input",value:c,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:N=>u(N.target.value),onKeyDown:N=>{N.nativeEvent.isComposing||(N.key==="Enter"?(N.preventDefault(),c.trim()?_([c]):F()):N.key==="Escape"&&(N.preventDefault(),F()))},onPaste:N=>{let U=N.clipboardData.getData("text/plain");/\r?\n/.test(U.trim())&&(N.preventDefault(),_(Dg(`${c}${U}`)))}})):$(k)),o.createElement("td",{className:"todo-table-actions"}))}function mu({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:s,sectionOf:c,composeSignal:u=0,newTaskPatch:l}){let[p,g]=za(),h=p.filter(j=>j!=="title"),[m,y]=o.useState(null),[w,_]=o.useState(null),F=j=>({className:`${m===j?" is-dragging":""}${w?.id===j?w.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:ee=>{if(ee.target.closest(".todo-col-resize")){ee.preventDefault();return}ee.dataTransfer.effectAllowed="move",ee.dataTransfer.setData("text/plain",j);let le=ee.currentTarget.ownerDocument,be=le.createElement("div");be.className="todo-col-drag-chip",be.textContent=d(Fa(j)),le.body.appendChild(be),ee.dataTransfer.setDragImage?.(be,Math.round(be.offsetWidth/2),Math.round(be.offsetHeight/2)),window.setTimeout(()=>be.remove(),0),y(j)},onDragOver:ee=>{if(!m||m===j)return;ee.preventDefault(),ee.dataTransfer.dropEffect="move";let le=ee.currentTarget.getBoundingClientRect();_({id:j,after:ee.clientX>le.left+le.width/2})},onDrop:ee=>{if(ee.preventDefault(),m&&w&&m!==w.id){let le=p.filter(be=>be!==m);le.splice(le.indexOf(w.id)+(w.after?1:0),0,m),g(le)}y(null),_(null)},onDragEnd:()=>{y(null),_(null)}}}),P=o.useRef(null),D=eu(P),[v,C]=Gr("pageColumnWidths",au),[$,z]=o.useState({}),q=tu(P,e),k=Object.fromEntries(Object.entries({tags:q,...v,...$}).map(([j,ee])=>[j,Math.max(ee,D.mins[j])])),N=j=>j==="due"?D.due:j==="priority"?D.priority:j==="flagged"?D.flagged:k[j]??ho[j],[U,B]=Gr("pageRowsPerPage",nu),[S,T]=o.useState([]),[R,G]=o.useState(null),E=o.useRef(1),A=o.useRef(null);o.useEffect(()=>{if(!u)return;let j=E.current++;T(ee=>[j,...ee]),G(j),O(0),A.current?.scrollTo?.({top:0})},[u]);let Y=j=>T(ee=>ee.filter(le=>le!==j)),[K,O]=o.useState(0),[se,X]=o.useState(i);se!==i&&(X(i),O(0));let[Q,x]=o.useState(()=>new Set),L=o.useRef(null),V=Math.max(1,Math.ceil(e.length/U)),b=Math.min(K,V-1),M=e.slice(b*U,(b+1)*U),H=o.useMemo(()=>e.filter(j=>Q.has(j.id)),[e,Q]),Z=o.useMemo(()=>e.reduce((j,ee)=>j+(ee.completed?1:0),0),[e]),ae=_e(),W=o.useSyncExternalStore(ae.subscribe,ae.get,ae.get),ce=o.useCallback(j=>{let ee=e.findIndex(le=>le.id===j);ee>=0&&O(Math.floor(ee/U))},[e,U]);o.useLayoutEffect(()=>{W?.todoId&&ce(W.todoId)},[W,ce]),o.useLayoutEffect(()=>{r.editingId&&ce(r.editingId)},[r.editingId]);let Fe=(j,ee)=>{x(le=>{let be=new Set(le);for(let st of j)ee?be.add(st):be.delete(st);return be})},Ve=o.useRef({rows:M,selection:Q});Ve.current={rows:M,selection:Q};let Et=o.useCallback((j,ee)=>{let{rows:le,selection:be}=Ve.current,st=le.findIndex(Dt=>Dt.id===j),bo=ee?le.findIndex(Dt=>Dt.id===L.current):-1;bo>=0?Fe(le.slice(Math.min(bo,st),Math.max(bo,st)+1).map(Dt=>Dt.id),!0):Fe([j],!be.has(j)),L.current=j},[]),Bt=Ia(),Ur=Na(t),$a=()=>{for(let j of H)r.patchTodo(j.id,Ce("completed"));x(new Set)},Vo=async()=>{let j=H.map(le=>le.id);await f.ui.confirm({title:d("todo.table.deleteTitle",{count:j.length}),message:d("todo.table.deleteMessage",{count:j.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(j.map(le=>r.removeTodo(le))),x(new Set))},Ct=(j,ee)=>o.createElement(lu,{id:j,label:ee,min:D.mins[j],onDrag:(le,be)=>z(st=>({...st,[le]:be})),onCommit:(le,be)=>{z({}),C({...v,[le]:be})},onReset:le=>{z({});let be={...v};delete be[le],C(be)}}),jr=j=>{let ee=d(_a[j]),le=Ra.includes(j);return o.createElement(bs,{field:j==="note"?"notes":j,label:ee,className:`todo-table-${j}${F(j).className}`,thProps:F(j).props,sort:n,onSort:a,width:le?k[j]:void 0,resize:le?Ct(j,ee):void 0})},Bo=3+h.length,Kr=o.useMemo(()=>{if(!c)return null;let j=new Map;for(let ee of e){let le=c(ee);j.set(le,(j.get(le)??0)+1)}return j},[e,c]),Ho=[],Vr=null;for(let j of M){let ee=c?.(j)??null;ee&&ee!==Vr&&Ho.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${ee}`,key:`section:${ee}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},d(ml[ee])),o.createElement("span",{className:"todo-table-section-count"},Kr?.get(ee)??0))),p.map(le=>o.createElement("td",{key:le,className:`todo-table-${le}`})),o.createElement("td",{className:"todo-table-actions"}))),Vr=ee,Ho.push(o.createElement(uu,{key:j.id,todo:j,groups:Ur,columns:p,actions:r.actions,pending:r.pendingIds.has(j.id),env:Bt,selected:Q.has(j.id),onPick:Et}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:A},o.createElement("table",{ref:P,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:ru+(k.title??ou)+h.reduce((j,ee)=>j+N(ee),0),"--todo-due-width":`${D.due}px`,"--todo-priority-width":`${D.priority}px`,"--todo-flagged-width":`${D.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(iu,null)),p.map(j=>o.createElement(o.Fragment,{key:j},j==="title"?o.createElement(bs,{field:"name",label:d("todo.table.title"),className:`todo-table-title${F("title").className}`,thProps:F("title").props,sort:n,onSort:a,width:k.title,resize:Ct("title",d("todo.table.title"))}):jr(j))),o.createElement("th",{className:"todo-table-actions",style:k.title?{width:"auto",minWidth:48}:void 0}))),o.createElement("tbody",null,S.map(j=>o.createElement(pu,{key:j,order:p,groups:t,c:r,newTaskPatch:l,active:R===j,onActivate:()=>G(j),onRemove:()=>Y(j)})),Ho)),!M.length&&!S.length&&o.createElement("div",{className:"todo-table-empty-state"},s)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,H.length?d("todo.table.selectedCount",{count:H.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!H.length&&o.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:Z})),H.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:$a},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{Vo()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:j=>{f.ui.openMenu(Ma.map(ee=>({label:String(ee),type:"radio",checked:ee===U,onSelect:()=>{B(ee),O(0)}})),{anchor:j.currentTarget,align:"start"})}},o.createElement("span",null,U),o.createElement(Vn,null)),V>1&&o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:b+1,pages:V})),V>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>O(0)},o.createElement(Vl,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>O(b-1)},o.createElement(Wn,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b>=V-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>O(b+1)},o.createElement(qn,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:b>=V-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>O(V-1)},o.createElement(Bl,null))))))}var Ig={group:e=>e.group??void 0,notes:e=>Uo(e.note)||void 0,status:e=>oo().indexOf(Ie(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},fu=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=ct("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=ya(),s=at(),c=ha(),u=o.useMemo(()=>po(t),[t]),l=u??c,p=n?.pluginId===f.pluginId&&n.instanceId===t,g=ca();o.useEffect(()=>{if(!u)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>Ro(-1),goForward:()=>Ro(1)}),()=>e.setController(null)},[e,u,g.canGoBack,g.canGoForward]);let[h,m]=ma(),[y,w]=o.useState(()=>!!h.trim()),_=o.useRef(null),F=()=>{w(!0),window.setTimeout(()=>_.current?.focus(),0)},P=()=>{m(""),w(!1)},[D,v]=lc(),{field:C,dir:$}=D,[z]=kt(),[q,k]=Tt(),[N,U]=$r(),B=$o("due","asc");To(B.openDetail),o.useEffect(()=>{if(!(B.loading||u))if(l.kind==="groups"){let Z=new Set(we(s));!l.includeUngrouped&&!l.names.some(ae=>Z.has(ae))&&Ke(Oe)}else l.kind==="tag"&&(B.todos.some(Z=>Z.tags?.includes(l.name))||Ke(Oe))},[B.loading,B.todos,s,l,u]);let S=dt(),T=ua(),R=l.kind==="smart"?vt(l.id,T):null,G=wa(l);o.useEffect(()=>{f.workspace.setMainTabTitle(G,t)},[G,t]);let E=o.useMemo(()=>{let Z=B.todos.filter(ae=>Jn(ae,l,z,S));return q!=="all"&&(Z=Z.filter(ae=>No(ae,q))),N.length&&(Z=Z.filter(ae=>N.includes(ae.priority))),h.trim()&&(Z=Z.filter(gn(h))),i?Z=Z.filter(ae=>{let W=ae.dueDate?.slice(0,10);return!!W&&W>=i.start&&W<=i.end}):a&&(Z=Z.filter(ae=>ae.dueDate?.slice(0,10)===a)),Z},[B.todos,l,z,q,N,h,a,i,S]),{ordered:A,sectionOf:Y}=o.useMemo(()=>{let Z=Ig[C];if(Z)return{ordered:cl(E,Z,$),sectionOf:void 0};if(C!=="auto")return{ordered:Lo(E,C,$),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:fl(E).flatMap(ce=>ce.todos),sectionOf:void 0};let ae=An(E,S),W=new Map;for(let ce of br)for(let Fe of ae[ce])W.set(Fe.id,ce);return{ordered:br.flatMap(ce=>ae[ce]),sectionOf:ce=>W.get(ce.id)??"someday"}},[E,C,$,l,S]),K=!!h.trim()||N.length>0||q!=="all",O=()=>{m(""),U([]),k("all")},se=[et(l),h,JSON.stringify(q),N.join(),z,C,$,a??"",i?.start??"",i?.end??""].join("|"),X=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[Q,x]=o.useState(0),L=()=>x(Z=>Z+1),V=()=>{let Z={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(Z.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(Z.dueDate=S),l.kind==="smart"&&l.id==="flagged"&&(Z.flagged=!0),Z},b=we(s),M=[{label:d("todo.fab.newTodo"),icon:o.createElement(so,null),onSelect:L},...b.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Fn,null),submenu:b.map(Z=>({label:Z,onSelect:ae=>{let W={kind:"groups",names:[Z]};ae?.newTab||u?(Go(W,ae?.newTab===!0),Ws()):(Ke(W),L())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(Rn,null),onSelect:()=>{Kt()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(co,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(fa(l)))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(Ul,null),onSelect:()=>f.workspace.openOwnSettings()}],H=t??"";return o.useEffect(()=>{(p||n?.pluginId!==f.pluginId)&&os(M,H)}),o.useEffect(()=>()=>os(null,H),[H]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${y?" is-searching":""}`},y?o.createElement("div",{className:"todo-page-search"},o.createElement(yt,{className:"todo-page-search-icon"}),o.createElement("input",{ref:_,className:"todo-page-search-input",value:h,onChange:Z=>m(Z.target.value),onKeyDown:Z=>{Z.key==="Escape"&&(Z.preventDefault(),P())},onBlur:()=>{h.trim()||w(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):o.createElement("span",{className:"todo-page-appbar-spacer","aria-hidden":"true"}),(i||a)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:X},o.createElement("span",null,i?`${Ue(i.start,r)} \u2013 ${Ue(i.end,r)}`:Ue(a,r)),o.createElement(ve,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!y&&h.trim()?" active":""}`,"aria-label":y?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:y?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:Z=>{y&&Z.preventDefault()},onClick:y?P:F},y?o.createElement(ve,null):o.createElement(yt,null)),o.createElement(su,null),K&&o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.reset"),title:d("todo.table.reset"),onClick:O},o.createElement(Yl,null)),o.createElement(du,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:L},o.createElement(so,null)))),B.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(mu,{todos:A,groups:s,c:B,sort:D,onSort:v,resetKey:se,empty:d("todo.table.empty"),sectionOf:Y,composeSignal:Q,newTaskPatch:V}),o.createElement(Ko,{c:B}))};var bu=10080;function gu(e){let t=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!t)return null;let r=Number(t[1])*60+Number(t[2]);return r<=bu?r:null}function hu(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function yu(){let e=()=>{let m=f.settings.get().reminderOffsets;return Array.isArray(m)?m.filter(y=>Number.isInteger(y)&&y>=0&&y<=bu).slice(0,1):[10]},[t,r]=o.useState(e);o.useEffect(()=>f.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:a,SelectField:i}=f.ui.settings,s=t.length?"custom":"off",[c,u]=o.useState(()=>hu(t[0]??10)),[l,p]=o.useState(!1);o.useEffect(()=>{t.length&&(u(hu(t[0])),p(!1))},[t[0]]);let g=m=>{r(m),f.settings.set("reminderOffsets",m)},h=()=>{let m=gu(c);if(m===null){p(!0);return}p(!1),m!==t[0]&&g([m])};return o.createElement(a,{title:d("reminders.title")},o.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},o.createElement(i,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:m=>g(m==="off"?[]:[gu(c)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&o.createElement(n,{title:d("reminders.timeBefore"),description:l?o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},o.createElement("input",{className:`settings-control todo-reminder-time${l?" invalid":""}`,type:"text",inputMode:"numeric",value:c,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":l||void 0,maxLength:6,onChange:m=>{u(m.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),p(!1)},onBlur:h,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),h())}})))}var Ng={scheduled:()=>o.createElement(xr,null),today:()=>o.createElement(Tr,null),week:()=>o.createElement(Yn,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(jn,null),completed:()=>o.createElement(qe,null)};function vu(e){let[t,r]=o.useState(e);return o.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[t,r]}function Lg(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,s]=vu(oa),c=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],u=m=>{s(m),ic(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,p=i.order.map(m=>vt(m,i)),g=a({items:p,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>d(m.labelKey),onReorder:m=>u({...i,order:m.map(y=>y.id)})}),h=(m,y)=>{if(y){u({...i,hidden:i.hidden.filter(F=>F!==m)});return}if(l<=1)return;let w={...i,hidden:[...i.hidden,m]};u(w);let _=xt();_.kind==="smart"&&_.id===m&&Ke({kind:"smart",id:w.order.find(F=>!w.hidden.includes(F))})};return o.createElement(t,{title:d("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.colText")),o.createElement("span",null,d("todo.settings.colShow"))),p.map((m,y)=>{let w=i.hidden.includes(m.id),_=`${m.id}@${y}`,F=g.getHandleProps(m),P=d(m.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(w?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},o.createElement("button",{...F,className:(F.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},o.createElement(Oo,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:Se(m.color),color:Er(m,Lt)},"aria-hidden":"true"},Ng[m.id]()),o.createElement("span",{className:"todo-settings-name"},P),o.createElement(e,{key:`color:${_}`,value:m.color,onChange:D=>u({...i,colors:{...i.colors,[m.id]:D}}),ariaLabel:d("todo.settings.smartListColor",{p0:P}),allowCustom:!1}),o.createElement(r,{key:`text:${_}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:d("todo.settings.statusText",{p0:P}),onChange:D=>{let v={...i.textColors};D==="auto"?delete v[m.id]:v[m.id]=D,u({...i,textColors:v})}}),o.createElement(n,{key:`show:${_}`,checked:!w,disabled:!w&&l<=1,label:d("todo.settings.smartListShow",{p0:P}),onChange:D=>h(m.id,D)}))})),g.liveRegion)}function Ga({initial:e,onCommit:t,onType:r,onEnter:n,placeholder:a,ariaLabel:i,disabled:s,className:c="todo-settings-text",invalid:u}){let l=o.useRef(!1);return o.createElement("input",{className:`settings-control ${c}${u?" invalid":""}`,"aria-invalid":u||void 0,type:"text",defaultValue:e,placeholder:a,"aria-label":i,disabled:s,autoComplete:"off",spellCheck:!1,onChange:p=>r?.(p.currentTarget.value),onBlur:p=>{if(l.current){l.current=!1;return}t(p.currentTarget.value)},onKeyDown:p=>{if(p.key==="Enter"){if(p.preventDefault(),n){t(p.currentTarget.value),n();return}p.currentTarget.blur()}else p.key==="Escape"&&(p.preventDefault(),p.currentTarget.value=e,r?.(e),l.current=!0,p.currentTarget.blur())}})}function Pg({name:e}){let t=On(),r=e?t[e]:void 0;return r?o.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):o.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function wu({current:e,onPick:t}){let r=On(),n=Object.keys(r).sort((a,i)=>a.localeCompare(i));return o.createElement("div",{className:"todo-icon-picker"},o.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(a=>o.createElement("button",{key:a,type:"button",role:"option","aria-selected":e===a,className:`todo-icon-picker-item${e===a?" is-active":""}`,title:a,"aria-label":a,onClick:()=>t(e===a?void 0:a)},o.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[a]}})))),o.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:Ui})))}function Og(){let{Button:e,ColorField:t,IconButton:r,Section:n,Toggle:a,useReorderDrag:i}=f.ui.settings,[s,c]=vu(ze);On();let u=o.useRef(""),[l,p]=o.useState(0),[g,h]=o.useState(!1),m=S=>{let T=yn(S);c(T),Yd(T)},y=s.active.map(S=>Ee(S,s)),w=i({items:y,indicatorOnly:!0,getId:S=>S.id,getLabel:S=>S.label,onReorder:S=>m({...s,active:S.map(T=>T.id)})}),_=(S,T)=>{T!==s.active.includes(S)&&m({...s,active:T?[...s.active,S]:s.active.filter(R=>R!==S)})},F=S=>S.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Eo),[P,D]=o.useState({strike:!1,color:ye("teal"),done:!1,show:!0}),v=()=>{let S=F(u.current);if(!S||s.custom.length>=er)return;let T=pi();m({...s,custom:[...s.custom,{id:T,label:S,done:P.done}],active:P.show?[...s.active,T]:s.active,strikethrough:{...s.strikethrough,[T]:P.strike},colors:{...s.colors,[T]:P.color},icons:P.icon?{...s.icons,[T]:P.icon}:s.icons}),u.current="",h(!1),D({strike:!1,color:ye("teal"),done:!1,show:!0}),p(R=>R+1)},C=(S,T)=>{let R=F(T);if(tt(S)){if(!R)return;m({...s,custom:s.custom.map(G=>G.id===S?{...G,label:R}:G)})}else{let G={...s.labels};R&&R!==Wd(S)?G[S]=R:delete G[S],m({...s,labels:G})}},$=async(S,T)=>{tt(S)?m({...s,custom:s.custom.map(G=>G.id===S?{...G,done:T}:G)}):m({...s,done:{...s.done,[S]:T}});let R=(await Je()).filter(G=>G.status===S);await Promise.all(R.map(G=>Ri(G.id,S)))},z=(S,T)=>{let R=ze(),G={...R.icons};T?G[S]=T:delete G[S],m({...R,icons:G})},q=(S,T)=>{f.ui.openPopover(({close:R})=>o.createElement(wu,{current:s.icons[T],onPick:G=>{z(T,G),R()}}),{anchor:S,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},k=async S=>{let T=Ee(S,s).label,R=(await Je()).filter(A=>A.status===S);if(await f.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:T}),message:R.length?d("todo.settings.statusDeleteMoves",{count:R.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(R.map(A=>Ri(A.id,"open")));let E=ze();tt(S)?m({...E,custom:E.custom.filter(A=>A.id!==S),active:E.active.filter(A=>A!==S)}):m({...E,removed:[...E.removed,S],active:E.active.filter(A=>A!==S)})},N=(S,T,R)=>{let G=S.id,E=`${G}@${R}`,A=S.label,Y=T==="shown"?w.getHandleProps(S):null,K=T==="locked";return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(K?" locked":"")+(T==="off"?" is-off":"")+(T==="shown"&&w.overId===G?" drop-"+(w.dropPosition??"before"):""),key:G,...T==="shown"?w.getItemProps(S):{}},Y?o.createElement("button",{...Y,className:(Y.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},o.createElement(Oo,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:K?d("todo.settings.statusLocked"):void 0},K&&o.createElement(Ll,null)),K?o.createElement("span",{className:`todo-settings-glyph ${S.cls}`},o.createElement(Te,{status:G==="open"?null:G,dotCls:S.cls})):o.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${S.cls}`,title:d("todo.settings.statusIconOf",{p0:A}),"aria-label":d("todo.settings.statusIconOf",{p0:A}),onClick:O=>q(O.currentTarget,G)},o.createElement(Te,{status:G,dotCls:S.cls})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(Ga,{key:`name:${E}:${A}`,initial:A,ariaLabel:d("todo.settings.statusName"),onCommit:O=>C(G,O)})),o.createElement(r,{key:`strike:${E}`,className:"todo-settings-strike",pressed:s.strikethrough[G],"aria-pressed":s.strikethrough[G],ariaLabel:d("todo.settings.statusStrike",{p0:A}),title:d("todo.settings.statusStrike",{p0:A}),onClick:()=>m({...s,strikethrough:{...s.strikethrough,[G]:!s.strikethrough[G]}})},o.createElement(Xn,null)),o.createElement(t,{key:`color:${E}`,value:s.colors[G],onChange:O=>m({...s,colors:{...s.colors,[G]:O}}),ariaLabel:d("todo.settings.statusColor",{p0:A}),allowCustom:!1}),o.createElement(r,{key:`done:${E}`,className:"todo-settings-strike",pressed:S.done,"aria-pressed":S.done,disabled:K,ariaLabel:d("todo.settings.statusDone",{p0:A}),title:d("todo.settings.statusDone",{p0:A}),onClick:()=>{K||$(G,!S.done)}},o.createElement(qe,null)),K?o.createElement("span",null):o.createElement(a,{key:`show:${E}`,checked:T!=="off",label:d("todo.settings.statusShow",{p0:A}),onChange:O=>_(G,O)}),K?o.createElement("span",null):o.createElement(r,{key:`delete:${E}`,ariaLabel:d("todo.settings.statusDelete",{p0:A}),title:d("todo.settings.statusDelete",{p0:A}),onClick:()=>{k(G)}},o.createElement($t,null)))},U=[...Jt.filter(S=>!s.active.includes(S)&&!s.removed.includes(S)),...s.custom.map(S=>S.id).filter(S=>!s.active.includes(S))].map(S=>Ee(S,s)),B=s.custom.length>=er;return o.createElement(n,{title:d("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null,d("todo.settings.colIcon")),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},o.createElement(Xn,null)),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},o.createElement(qe,null)),o.createElement("span",null,d("todo.settings.colShow")),o.createElement("span",null)),N(Ee("open",s),"locked",0),N(Ee("completed",s),"locked",1),y.map((S,T)=>N(S,"shown",2+T)),U.map((S,T)=>N(S,"off",2+y.length+T)),o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},o.createElement("span",{className:"todo-settings-handle is-static"}),o.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:Se(P.color)},disabled:B,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:S=>{f.ui.openPopover(({close:T})=>o.createElement(wu,{current:P.icon,onPick:R=>{D(G=>({...G,icon:R})),T()}}),{anchor:S.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},o.createElement(Pg,{name:P.icon})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(Ga,{key:`add:${l}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:B,onType:S=>{u.current=S,!!F(S)!==g&&h(!g)},onCommit:S=>{u.current=S},onEnter:v})),o.createElement(r,{className:"todo-settings-strike",pressed:P.strike,"aria-pressed":P.strike,disabled:B,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>D(S=>({...S,strike:!S.strike}))},o.createElement(Xn,null)),o.createElement(t,{key:`add-color:${l}`,value:P.color,onChange:S=>D(T=>({...T,color:S})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),o.createElement(r,{className:"todo-settings-strike",pressed:P.done,"aria-pressed":P.done,disabled:B,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>D(S=>({...S,done:!S.done}))},o.createElement(qe,null)),o.createElement(a,{key:`add-show:${l}`,checked:P.show,disabled:B,label:d("todo.settings.colShow"),onChange:S=>D(T=>({...T,show:S}))}),o.createElement(r,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:B||!g,onClick:v},o.createElement(so,null)))),w.liveRegion,s.removed.length>0&&o.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>m({...s,removed:[],active:[...s.active,...s.removed]})},d("todo.settings.statusRestore",{count:s.removed.length})))}function Mg(){let{Row:e,Section:t,SelectField:r}=f.ui.settings,[n,a]=o.useState(ta);return o.createElement(o.Fragment,null,o.createElement(t,{title:d("todo.settings.display")},o.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let s=i;a(s),f.settings.set(Wi,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(yu,null))}function _g(){let{Button:e,ColorField:t,IconButton:r,Section:n,useReorderDrag:a}=f.ui.settings,i=al(),s=rl(),c=Fg(),u=o.useRef(""),[l,p]=o.useState(0),[g,h]=o.useState(()=>rn(s)),[m,y]=o.useState(!1),w=(C,$)=>s.some(z=>z.id!==$&&[z.name,...z.aliases??[]].some(q=>re(q)===re(C))),_=C=>{ol(C)},F=C=>{let $=new Set([C.name,...C.aliases??[]].map(re));return c.filter(z=>$.has(re(z))).length},P=a({items:i,indicatorOnly:!0,getId:C=>C.id,getLabel:C=>C.name,onReorder:C=>_(C)}),D=()=>{let C=u.current.trim().slice(0,cr);if(!C||i.length>=vn)return;if(w(C)){y(!0);return}let $={id:el(),name:C,color:g};_([...i,$]),u.current="",y(!1),h(rn([...s,$])),p(z=>z+1)},v=(C,$)=>{!$.trim()||$.trim()===C.name||w($,C.id)||_(i.map(z=>z.id===C.id?tl(z,$):z))};return o.createElement(n,null,o.createElement("div",{className:"settings-path-row settings-groups-row"},o.createElement("span",{className:"settings-toggle-text"},o.createElement("span",{className:"settings-toggle-title"},d("todo.settings.localGroups")),o.createElement("span",{className:"settings-toggle-desc"},d("todo.settings.localGroupsDesc"))),o.createElement("div",{className:"settings-colorrules settings-groups todo-local-groups",role:"list","aria-label":d("todo.settings.localGroups")},i.map((C,$)=>{let z=`${C.id}@${$}`,q=P.getHandleProps(C),k=F(C);return o.createElement("div",{role:"listitem",className:"settings-colorrule-row"+(P.overId===C.id?" drop-"+(P.dropPosition??"before"):""),key:C.id,...P.getItemProps(C)},o.createElement("button",{...q,className:(q.className??"")+" settings-colorrule-grip"},o.createElement(Oo,null)),o.createElement(Ga,{key:`name:${C.id}:${C.name}`,className:"settings-colorrule-key",initial:C.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:N=>v(C,N)}),o.createElement(t,{key:`color:${z}`,value:C.color,onChange:N=>_(i.map(U=>U.id===C.id?{...U,color:N}:U)),ariaLabel:d("todo.settings.localGroupColor",{p0:C.name})}),o.createElement("span",{className:"settings-group-usage","aria-label":d("todo.settings.localGroupUsage",{count:k}),title:d("todo.settings.localGroupUsage",{count:k})},k),o.createElement(r,{key:`remove:${z}`,className:"settings-colormap-remove","aria-disabled":k>0||void 0,ariaLabel:d("todo.settings.localGroupDelete",{p0:C.name}),title:k>0?d("todo.settings.localGroupRemoveBlocked",{count:k}):d("todo.settings.localGroupRemove"),onClick:()=>{k===0&&_(i.filter(N=>N.id!==C.id))}},o.createElement(ve,null)))}),P.liveRegion,o.createElement("div",{className:"settings-colorrule-row settings-colorrule-add"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(Ga,{key:`add:${l}`,className:"settings-colorrule-key",initial:"",invalid:m,placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:C=>{u.current=C,y(!1)},onCommit:C=>{u.current=C},onEnter:D}),o.createElement(t,{key:`add-color:${l}`,value:g,onChange:h,ariaLabel:d("todo.settings.localGroupNewColor")}),o.createElement("span",{className:"settings-colorrule-add-action"},o.createElement("span",{className:"settings-button settings-button--medium settings-colorrule-add-sizer","aria-hidden":"true"},d("todo.settings.localGroupAdd")),o.createElement(e,{type:"button",className:"settings-colormap-add-btn",disabled:i.length>=vn,onClick:D},d("todo.settings.localGroupAdd")))),m&&o.createElement("span",{className:"settings-empty-text"},d("todo.settings.localGroupDuplicate")))))}function zg(){let{GroupsEditor:e,Row:t,Section:r,Toggle:n}=f.ui.settings,a=nl();return o.createElement(o.Fragment,null,o.createElement(r,null,o.createElement(t,{title:d("todo.settings.useSharedGroups"),description:d("todo.settings.useSharedGroupsDesc")},o.createElement(n,{checked:a.shared,label:d("todo.settings.useSharedGroups"),onChange:i=>{f.settings.set(Ni,i)}})),o.createElement(t,{title:d("todo.settings.useLocalGroups"),description:d("todo.settings.useLocalGroupsDesc")},o.createElement(n,{checked:a.local,label:d("todo.settings.useLocalGroups"),onChange:i=>{f.settings.set(Li,i)}}))),a.shared&&o.createElement(r,null,o.createElement(e,null)),a.local&&o.createElement(_g,null))}function Fg(){let[e,t]=o.useState([]);return o.useEffect(()=>{let r=!0,n=()=>{Je().then(i=>{r&&t(i.flatMap(s=>s.group?[s.group]:[]))}).catch(()=>{})};n();let a=Mt(n);return()=>{r=!1,a()}},[]),e}function xu({section:e}){return e==="lists"?o.createElement(o.Fragment,null,o.createElement(Lg,null),o.createElement(Og,null)):e==="groups"?o.createElement(zg,null):o.createElement(Mg,null)}var Tu="reminder:";function ku(){let e=xe();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(Tu))return;let a=n??t.slice(Tu.length).split(":")[0];Je(e).then(i=>{e.assertActive();let s=i.find(c=>c.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var ys=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),ws=e=>({type:"string",description:e});async function vs(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Su(e){return Ya([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:ys({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await vs(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:ys({title:ws("Task title"),due:ws("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await vs(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:ys({id:ws("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await vs(e,"complete",{query:n},r)).title||n}".`}}])}function Rg(e){Kd(e);let t=Hs(e),r=cd(),n=Jd(),a=Il(),i=yc(),s=!1,c=e.backend.on("records.eventDeliveryFailed",()=>{s||(s=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{s=!1}))});ac();let u=e.workspace.onOpenOwnLink(P=>{ga(P)});e.registerView("todo.panel",Zc),e.registerView("todo.file",Jc),e.registerView("todo.page",fu),e.registerView("todo.settings",xu);let l=xl(e),p=xc(e),g=e.interop.services.provide(Xa,Su(e)),h=El(),m=mc(),y=e.interop.services.subscribe(xo,()=>{}),w=gc(e),_=ku(),F=il();return()=>{c(),t(),l(),p(),g(),h(),m(),y(),w(),_(),F(),u(),n(),a(),i(),r()}}var Gg={register:Rg},VA=Gg;export{VA as default,Rg as register};

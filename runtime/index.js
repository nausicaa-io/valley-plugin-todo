var Tt="valley";var Lf=`.${Tt}`,Pf=`app.${Tt}`;function uc(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var pc=/^[a-zA-Z]:/;function Lo(e){if(typeof e!="string")return"";let t=uc(e);return!t||t==="."||pc.test(t)||t.split("/").some(r=>r==="..")?"":t}function _t(e){if(typeof e=="string")return Lo(e)||void 0}var Ee=`.${Tt}`,mc="plugins",Po=`${Ee}/${mc}`,Ar=`${Po}/packages`,_f=`${Ar}/core`,zf=`${Ar}/github`,Ff=`${Ar}/local`,Gf=`${Ar}/community`,Rf=`${Po}/community.json`,$f=`${Po}/data`;var jf=`${Po}/enabled.json`,Kf=`${Po}/sources.json`,Uf=`${Ee}/state`,De=`${Ee}/settings`,Fi=`${Ee}/data`,ra=`${Ee}/recovery`;var na=`${Ee}/accounts`,io=`${Ee}/ai`,Vf=`${io}/connections.json`,Bf=`${io}/defaults.json`,Hf=`${io}/budgets.json`,Wf=`${io}/usage.sqlite`,qf=`${io}/security/guards.json`,Yf=`${io}/security/activity.sqlite`,Xf=`${na}/providers`,Zf=`${na}/providers.lock.json`,fc=`${Ee}/trash`,Jf=`${fc}/items`,aa=`${Ee}/cache`,Qf=`${aa}/accounts`,gc=`${aa}/search`,eg=`${aa}/providers`;var tg=`${gc}/index.jsonl`,og=`${ra}/drafts`,rg=`${ra}/transactions`,ng=`${ra}/retired`;var St="design",hc="themes",Gi=`${Ee}/${St}/${hc}`,ag=`${Gi}/local`,ig=`${Gi}/community`,sg={app:`${De}/app.json`,appearance:`${Ee}/${St}/appearance.json`,"icon-rail":`${Ee}/${St}/icon-rail.json`,"footer-rail":`${Ee}/${St}/footer-rail.json`,"plugin-startup":`${Ee}/${St}/right-sidebar-startup.json`,"new-tab":`${Ee}/${St}/new-tab.json`,pallette:`${Ee}/${St}/palette.json`,group:`${Fi}/groups.json`,units:`${Fi}/units.json`,metadata:`${De}/file-viewers.json`,notification:`${De}/notification.json`,"notification-settings":`${De}/notification-settings.json`,preferences:`${De}/preferences.json`,"link-actions":`${De}/link-actions.json`,markdown:`${De}/markdown.json`,editor:`${De}/editor.json`,"editor-vim":`${De}/editor-vim.json`,"markdown-todo":`${De}/markdown-todo.json`,"markdown-codeblocks":`${De}/markdown-codeblocks.json`,"markdown-template":`${De}/markdown-template.json`,"markdown-embeed":`${De}/markdown-embeed.json`,files:`${De}/file.json`,"file-sorter":`${De}/file-sorter.json`,"file-sym-link":`${De}/file-sym-link.json`,search:`${De}/search.json`,"search-tag":`${De}/search-tag.json`,"search-content":`${De}/search-content.json`,design:`${Ee}/${St}/appearance.json`,accounts:`${na}/connections.json`};var Ri=Tt,$i="open";var bc=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),ji=16384;var Ki=new Set(["__proto__","prototype","constructor"]);function Ui(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function Er(e){let t=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Ui(i)>ji)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let l=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let c=Reflect.ownKeys(i);if(c.length+r>8192||c.some(h=>typeof h=="string"&&Ki.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(l){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(m,x)=>{let k=u[String(x)];return k&&"value"in k?n(k.value,s+1)??null:null})}let g={};for(let h of Object.keys(u).sort()){if(Ki.has(h))throw new Error("Invalid bookmark state key");let m=u[h];if(!m.enumerable||!("value"in m)){r++;continue}let x=n(m.value,s+1);x!==void 0&&(g[h]=x)}return g}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Ui(JSON.stringify(a))>ji)throw new Error("Bookmark state is too large");return a}function Hi(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Lo(e);if(!t)throw new Error("Invalid bookmark path");return t}function ia(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Vi(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function sa(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!bc.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=Er(t.state);return r.path!==void 0&&(r.path=Hi(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var yc=/^[A-Za-z0-9_-]{1,64}$/;function Bi(e,t){if(typeof e!="string"||!yc.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Wi(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=ia(t.title,512,"title"),n={...t.description===void 0?{}:{description:ia(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:ia(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:Bi(t.group,"group")};if(t.groupId!==void 0){let l=Bi(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:sa(t.target),...n,...a};return{...l,searchText:Vi(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:Hi(t.folderPath),title:r,...n,...a};return{...s,searchText:Vi(s)}}function zt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++t>2048||s>32||!r(i)||typeof i.type!="string")return!1;let l=(...p)=>Object.keys(i).every(c=>c==="type"||p.includes(c));return["unknown","null","boolean","number","string","function"].includes(i.type)?l():i.type==="literal"?l("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?l("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?l("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,s+1)):i.type==="union"?l("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,s+1)):i.type==="object"?l("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,c])=>n(p)&&a(c,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Dr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,l,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return l===null;if(s.type==="literal")return l===s.value;if(s.type==="union")return s.anyOf.some(c=>i(c,l,p+1));if(s.type==="number")return typeof l=="number"&&Number.isFinite(l);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof l===s.type;if(!l||typeof l!="object"||a.has(l))return!1;a.add(l);try{return s.type==="array"?Array.isArray(l)&&l.length<=(s.maxItems??1e5)&&l.every(c=>i(s.items,c,p+1)):s.type==="tuple"?Array.isArray(l)&&l.length>=(s.minItems??s.items.length)&&l.length<=s.items.length&&l.every((c,u)=>i(s.items[u],c,p+1)):s.type==="object"?Array.isArray(l)||s.required?.some(c=>!Object.hasOwn(l,c))?!1:Object.entries(l).every(([c,u])=>Object.hasOwn(s.properties,c)?i(s.properties[c],u,p+1):s.additionalProperties===!0):!1}finally{a.delete(l)}};return i(e,t,0)}var wc=new Map;function me(e,t,r,n,a,i,s,l,p="owner"){let c=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:s,serviceMetadata:l});return wc.set(`${t}:${e}@${r}`,c),c}var la=256;function ca(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var re=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ge=(e,t)=>typeof e[t]=="function",Ft=e=>e===void 0,so=e=>typeof e=="boolean",ae=e=>typeof e=="string",Ge=e=>e===void 0||ae(e),vc=e=>e===void 0||typeof e=="number",xc=e=>e===void 0||typeof e=="boolean",pe=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),_e=e=>re(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),qi=e=>re(e),Xi=e=>re(e)&&ae(e.id)&&ae(e.title)&&ae(e.date)&&(e.documentRef===void 0||re(e.documentRef)&&ae(e.documentRef.pluginId)&&ae(e.documentRef.sourceId)&&ae(e.documentRef.itemId)),kc=e=>re(e)&&ae(e.date)&&Ge(e.startTime)&&Ge(e.endTime)&&Ge(e.sourceId)&&Ge(e.itemId),Tc=e=>re(e)&&ae(e.url)&&Ge(e.title)&&xc(e.newTab),Sc=e=>re(e)&&ae(e.query),Zi=e=>re(e)&&ae(e.name)&&Ge(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ac=e=>Array.isArray(e)&&e.every(Zi),Ec=e=>e===null||Zi(e),Dc=e=>e===void 0||re(e)&&Ge(e.approvalToken)&&(e.cancellation===void 0||re(e.cancellation)),Cc=e=>typeof e=="string"||re(e)&&typeof e.text=="string",Ic=e=>re(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&re(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ge(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ji=e=>re(e)&&ae(e.id)&&ae(e.label)&&Ge(e.labelKey)&&Ge(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ji)),Qi={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Xi)},create:{args:e=>pe(e,[ae,qi]),result:so},update:{args:e=>pe(e,[ae,qi]),result:so},remove:{args:e=>pe(e,[ae]),result:so},open:{args:e=>pe(e,[ae]),result:Ft},configure:{args:e=>e.length===0,result:Ft},actions:{args:e=>pe(e,[ae]),result:e=>Array.isArray(e)&&e.every(Ji)},runAction:{args:e=>pe(e,[ae,ae]),result:so}},es=e=>re(e)&&ae(e.name)&&ae(e.version)&&Ge(e.description)&&Ge(e.author)&&(e.localized===void 0||re(e.localized)&&Object.values(e.localized).every(t=>re(t)&&ae(t.name)&&Ge(t.description))),Nc=me("calendar.itemSource","service","1.3.0","many",e=>re(e)&&ge(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,Qi,e=>e.integration),Cr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,da=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Lc=e=>re(e)&&Cr(e.startDate)&&Cr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=la&&(e.cursor===void 0||da(e.cursor)),Pc=e=>re(e)&&da(e.revision)&&(e.cursor===void 0||da(e.cursor))&&Array.isArray(e.items)&&e.items.length<=la&&e.items.every(t=>Xi(t)&&Cr(t.date)&&(t.endDate===void 0||Cr(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,Gt=me("calendar.itemSource","service","2.0.0","many",e=>re(e)&&ge(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,{...Qi,list:{args:e=>pe(e,[Lc]),result:Pc}},e=>e.integration),Oo=me("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Oc=me("calendar.navigator","service","1.0.0","one",e=>re(e)&&ge(e,"openDate"),void 0,{openDate:{args:e=>pe(e,[kc]),result:Ft}}),Ir=me("calendar.panelSelection","state","1.0.0","one",e=>re(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Mc=me("web.activeContext","state","1.0.0","one",e=>re(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Yi(e){return re(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>re(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var _c=me("contacts.directory","service","1.0.0","one",e=>re(e)&&["search","resolveEmails","open"].every(t=>ge(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Yi)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>re(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Yi))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||re(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Ft}}),zc=me("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Fc=me("web.navigator","service","1.0.0","one",e=>re(e)&&ge(e,"open"),void 0,{open:{args:e=>pe(e,[Tc]),result:Ft}}),Gc=me("selection.textAction","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&ge(e,"run"),e=>[e.id]),Rc=me("geo.navigator","service","1.0.0","one",e=>re(e)&&ge(e,"open"),void 0,{open:{args:e=>pe(e,[Sc]),result:Ft}}),$c=me("geo.search","service","1.0.0","one",e=>re(e)&&ge(e,"search")&&ge(e,"reverse"),void 0,{search:{args:e=>pe(e,[ae]),result:Ac},reverse:{args:e=>pe(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Ec}}),ua=me("agent.toolProvider","service","1.0.0","many",e=>re(e)&&Array.isArray(e.tools)&&e.tools.every(Ic)&&ge(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>pe(e,[ae,re,Dc]),result:Cc}},e=>({tools:e.tools}),"global"),jc=me("guard.runtime","service","1.0.0","one",e=>re(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>ge(e,t)),void 0,{resolve:{args:e=>pe(e,[re]),result:re},requestApproval:{args:e=>pe(e,[re]),result:so},consumeToken:{args:e=>e.length>=1&&e.length<=2&&ae(e[0])&&Ge(e[1]),result:so},audit:{args:e=>pe(e,[re]),result:Ft}}),Kc=me("browser.automation","service","1.0.0","one",e=>re(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>ge(e,t)),void 0,{list:{args:e=>e.length===0,result:_e},open:{args:e=>pe(e,[ae]),result:_e},switch:{args:e=>pe(e,[ae]),result:_e},close:{args:e=>pe(e,[ae]),result:_e},snapshot:{args:e=>pe(e,[ae]),result:_e},readText:{args:e=>e.length>=1&&e.length<=2&&ae(e[0])&&vc(e[1]),result:_e},readHtml:{args:e=>pe(e,[ae]),result:_e},screenshot:{args:e=>pe(e,[ae]),result:_e},click:{args:e=>pe(e,[ae,t=>typeof t=="number"]),result:_e},type:{args:e=>e.length>=3&&e.length<=4&&ae(e[0])&&typeof e[1]=="number"&&ae(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:_e},select:{args:e=>pe(e,[ae,t=>typeof t=="number",ae]),result:_e},scroll:{args:e=>pe(e,[ae,t=>typeof t=="number",t=>typeof t=="number"]),result:_e},pressKey:{args:e=>pe(e,[ae,ae]),result:_e},navigate:{args:e=>pe(e,[ae,ae]),result:_e},back:{args:e=>pe(e,[ae]),result:_e},forward:{args:e=>pe(e,[ae]),result:_e},reload:{args:e=>pe(e,[ae]),result:_e}}),Uc=me("fileTree.contextItem","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ge(e.labelKey)&&ge(e,"run"),e=>[e.id]),Vc=me("newTab.entry","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ge(e,"run"),e=>[e.id]),pa=me("search.resultAction","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&ge(e,"open"),e=>[e.cardKind]),Bc=me("search.resultCard","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&ge(e,"render")&&ge(e,"open"),e=>[e.cardKind]),Nr=me("metadataPanel.segment","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ge(e,"render"),e=>[e.id]),ma=me("workspace.surface","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&ge(e,"getSnapshot")&&ge(e,"subscribe")&&ge(e,"restore"),e=>[e.id]),Hc=me("metadata.plugin","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ge(e,"facts"),e=>[e.id]),Wc=me("workspace.viewState","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&ge(e,"capture")&&ge(e,"restore")&&ge(e,"subscribe"),e=>[e.id]);var Lr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},fa=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),ts=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),os=e=>fa(e)&&typeof e.surface=="string"&&ts.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Mo(e){let t=Lr(e);if(!os(t))throw new Error("Invalid bookmark descriptor");let r=sa({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Wi({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function ga(e){try{let t=Mo(e),r=Lr(e);return JSON.stringify(t.state)===JSON.stringify(Er(r.state))}catch{return!1}}function qc(e){try{let t=Lr(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:Mo(t.bookmark)}}catch{}return{status:"invalid"}}var Yc=e=>{try{let t=Lr(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&ga(t.bookmark)}catch{return!1}},Xc=e=>fa(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),rs=me("workspace.bookmark","service","1.0.0","many",e=>fa(e)&&typeof e.id=="string"&&ts.has(String(e.surface))&&zt(e.stateSchema)&&(e.itemStateSchema===void 0||zt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&os(e[0]),result:Yc,sanitizeResult:qc},restore:{args:e=>e.length===1&&ga(e[0]),result:Xc}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function ha(e,t,r){if(!zt(r.stateSchema)||r.itemStateSchema!==void 0&&!zt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(c,u,g=!1)=>Dr(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,c,8192)&&(!r.validate||r.validate(c,u)),i=(c,u,g)=>{let h=g?void 0:r.primary?r.primary(c):c.item,m=Er(h?.state??c.view);if(!a(m,u,!!h))throw new Error("Invalid bookmark state");return Mo({...u,title:h?.title??c.title,description:r.description(c,!!h),state:m,...h?{itemId:h.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(c.instanceId),c,!1)}}catch{return{status:"invalid"}}},async restore(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=Mo(c),!a(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(rs,s),p;try{p=e.interop.extensions.provide(ma,{...t,getSnapshot(c){let u=t.getSnapshot(c),g={surface:t.surface,...c===void 0?{}:{instanceId:c}},h,m;try{h=i(u,g,!1)}catch{}try{m=i(u,g,!0)}catch{}return{...u,bookmark:h,bookmarkView:m}}})}catch(c){throw n=!1,l(),c}return()=>{n=!1,p(),l()}}var _o=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ns=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function as(e){if(!_o(e)||!ns(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!_o(r)||!ns(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!_o(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!_o(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!_o(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var Zc=me("workspace.details","extension","1.0.0","many",as,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Fg=[Ee,`${Ee}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Zg=1024*1024;var eh=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var th=globalThis.Buffer;var Qc=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,Pr=new Map,Or;function Ie(){return Or}function Mr(e,t){let r=Pr.get(e)??new Set;return r.add(t),Pr.set(e,r),()=>{r.delete(t),r.size||Pr.delete(e)}}function is(e){Or?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return Or={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},Or.dispose}var eu=1800;function lo(e){let t=ze();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},l=u=>{if(u.mode==="create")return;i=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,h=()=>{if(r=null,i!==u.nonce)return;let m=[...Pr.get(u.todoId)??[]].find(x=>x.isConnected);if(!m){Date.now()<g?r=setTimeout(h,40):t.get()?.nonce===u.nonce&&t.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(s,eu),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(h,0)},p=t.subscribe(()=>{let u=t.get();u&&l(u)}),c=t.get();return c&&l(c),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function ze(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function ss(){ze().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var tu=`
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
.todo-status-plain { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-row:not(:hover) .todo-status-plain { opacity: 0; }

`,ba="notes-todo-styles";function ds(){let e=document.getElementById(ba);return e||(e=document.createElement("style"),e.id=ba,document.head.appendChild(e)),e.textContent=tu,()=>{document.getElementById(ba)===e&&e.remove()}}var ie="#12120f",fe="#ffffff",wa=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ie,onDark:ie},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:fe,onDark:fe},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ie,onDark:ie},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:fe,onDark:ie},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ie,onDark:ie},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:fe,onDark:ie},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:fe,onDark:ie},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:fe,onDark:ie},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:fe,onDark:ie},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:fe,onDark:fe},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ie,onDark:ie},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:fe,onDark:ie},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:fe,onDark:ie},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ie,onDark:ie},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:fe,onDark:ie},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:fe,onDark:ie},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:fe,onDark:ie},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:fe,onDark:ie},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ie,onDark:ie},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ie,onDark:ie},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:fe,onDark:ie},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:fe,onDark:ie},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:fe,onDark:ie},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:fe,onDark:ie},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:fe,onDark:ie},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:fe,onDark:ie},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ie,onDark:ie},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ie,onDark:ie},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:fe,onDark:ie},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ie,onDark:ie},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:fe,onDark:ie},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:fe,onDark:ie},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ie,onDark:ie},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:fe,onDark:ie},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:fe,onDark:ie},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:fe,onDark:ie}],ou=["semantic","muted","accent","categorical"];var Uh=new Map(wa.map(e=>[e.id,e])),ru={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},nu=new Map(wa.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),au=/^[a-z][a-z0-9-]{0,47}$/,iu={version:4,families:ou.map(e=>({id:e,name:ru[e]})),colors:wa.map(e=>({id:e.id,familyId:e.family,name:nu.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},su=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var du=su(iu);function ls(){return du}var ya=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],_r="palette:",lu=/^#[0-9a-f]{6}$/i;function zr(e){return e.startsWith(_r)&&au.test(e.slice(_r.length))}function ke(e){return`${_r}${e}`}function zo(e){return zr(e)?e.slice(_r.length):void 0}function cs(e){if(typeof e!="string")return;let t=e.trim();return zr(t)?t:lu.test(t)?t.toLowerCase():void 0}function we(e){let t=zo(e);return t?`var(--color-${t})`:e}function At(e){let t=zo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function va(e){let t=new Set(e.map(r=>zo(r)??r.toLowerCase()));return ke(ya.find(r=>!t.has(r))??ya[0])}function us(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=ya;return ke(r[Math.abs(t)%r.length])}function Q(e){return e.trim().toLowerCase()}function cu(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=Q(i);!s||s===Q(t)||r.has(s)||(r.add(s),n.push(i))}return n}function ps(e){return`group_${Q(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Rt(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=Q(i);if(!i||r.has(s))continue;r.add(s);let l=typeof a.id=="string"&&a.id.trim()?a.id.trim():ps(i),p=cs(a.color)??va(t.map(u=>u.color)),c=cu(a.aliases,i,r);t.push({id:l,name:i,color:p,...c.length?{aliases:c}:{}})}return t}function Fo(e,t){let r=Q(t??"");if(r)return e.find(n=>Q(n.name)===r||(n.aliases??[]).some(a=>Q(a)===r))}function Fr(e,t){return Fo(t,e)?.name}function Te(e,t){let r=Q(e??"");return r?Fo(t,e)?.color??us(r):ke("primary-blue")}function xa(e){return va(e.map(t=>t.color))}function ka(e){let t={};for(let r of e){let n=Q(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var ms={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists","todo.settings.section.statuses":"Statuses","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do groups","todo.settings.localGroupsDesc":"Groups only To-Do uses, beside the shared groups above. Put one under a shared group to include its tasks in that group.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Under shared group","todo.settings.localGroupParentOf":"Shared group of {{p0}}","todo.settings.localGroupNoParent":"None","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupDeleteTitle":"Delete the group \u201C{{p0}}\u201D?","todo.settings.localGroupDeleteMoves":"{{count}} tasks in this group will have no group.","todo.settings.localGroupDeleteUnused":"No task uses this group.","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add group","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first and cannot be deleted. Every status can be renamed, given an icon and recoloured; the others can also be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 0:10 or 1:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59).","todo.settings.statusDoneFixed":"{{p0}} always keeps this setting"};var fs={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen","todo.settings.section.statuses":"Status","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"To-Do-Gruppen","todo.settings.localGroupsDesc":"Gruppen nur f\xFCr To-Do, neben den geteilten Gruppen oben. Unter einer geteilten Gruppe z\xE4hlen ihre Aufgaben zu dieser Gruppe.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Unter geteilter Gruppe","todo.settings.localGroupParentOf":"Geteilte Gruppe von {{p0}}","todo.settings.localGroupNoParent":"Keine","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupDeleteTitle":"Gruppe \u201E{{p0}}\u201C l\xF6schen?","todo.settings.localGroupDeleteMoves":"{{count}} Aufgaben dieser Gruppe haben danach keine Gruppe.","todo.settings.localGroupDeleteUnused":"Keine Aufgabe verwendet diese Gruppe.","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Gruppe hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen, mit einem Symbol versehen und umf\xE4rben; die \xFCbrigen lassen sich zudem als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 0:10 oder 1:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59).","todo.settings.statusDoneFixed":"{{p0}} beh\xE4lt diese Einstellung immer"};var gs={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas","todo.settings.section.statuses":"Estados","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos de To-Do","todo.settings.localGroupsDesc":"Grupos solo de To-Do, junto a los grupos compartidos de arriba. Bajo un grupo compartido, sus tareas cuentan en ese grupo.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupParent":"Bajo el grupo compartido","todo.settings.localGroupParentOf":"Grupo compartido de {{p0}}","todo.settings.localGroupNoParent":"Ninguno","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupDeleteTitle":"\xBFEliminar el grupo \xAB{{p0}}\xBB?","todo.settings.localGroupDeleteMoves":"{{count}} tareas de este grupo quedar\xE1n sin grupo.","todo.settings.localGroupDeleteUnused":"Ninguna tarea usa este grupo.","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir grupo","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero y no se pueden eliminar. Todos los estados se pueden renombrar, recibir un icono y cambiar de color; los dem\xE1s tambi\xE9n se pueden marcar como hechos, reordenar, desactivar o eliminar.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 0:10 o 1:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59).","todo.settings.statusDoneFixed":"{{p0}} siempre mantiene este ajuste"};var hs={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes","todo.settings.section.statuses":"Statuts","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes To-Do","todo.settings.localGroupsDesc":"Groupes propres \xE0 To-Do, \xE0 c\xF4t\xE9 des groupes partag\xE9s ci-dessus. Plac\xE9 sous un groupe partag\xE9, un groupe y ajoute ses t\xE2ches.","todo.settings.localGroupName":"Nom","todo.settings.localGroupParent":"Sous le groupe partag\xE9","todo.settings.localGroupParentOf":"Groupe partag\xE9 de {{p0}}","todo.settings.localGroupNoParent":"Aucun","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupDeleteTitle":"Supprimer le groupe \xAB {{p0}} \xBB ?","todo.settings.localGroupDeleteMoves":"{{count}} t\xE2ches de ce groupe n\u2019auront plus de groupe.","todo.settings.localGroupDeleteUnused":"Aucune t\xE2che n\u2019utilise ce groupe.","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter un groupe","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9, recevoir une ic\xF4ne et changer de couleur ; les autres peuvent aussi compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 0:10 ou 1:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59).","todo.settings.statusDoneFixed":"{{p0}} conserve toujours ce r\xE9glage"};var bs={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868","todo.settings.section.statuses":"\u72B6\u6001","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5F85\u529E\u4F7F\u7528\u7684\u5206\u7EC4\uFF0C\u4E0E\u4E0A\u65B9\u7684\u5171\u4EAB\u5206\u7EC4\u5E76\u5217\u3002\u653E\u5728\u67D0\u4E2A\u5171\u4EAB\u5206\u7EC4\u4E0B\uFF0C\u5176\u4EFB\u52A1\u4E5F\u4F1A\u8BA1\u5165\u8BE5\u5206\u7EC4\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupParent":"\u6240\u5C5E\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupParentOf":"{{p0}} \u7684\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupNoParent":"\u65E0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupDeleteTitle":"\u5220\u9664\u5206\u7EC4\u201C{{p0}}\u201D\uFF1F","todo.settings.localGroupDeleteMoves":"\u6B64\u5206\u7EC4\u4E2D\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u4E0D\u518D\u5C5E\u4E8E\u4EFB\u4F55\u5206\u7EC4\u3002","todo.settings.localGroupDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4\u3002","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0\u5206\u7EC4","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u3001\u8BBE\u7F6E\u56FE\u6807\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 0:10 \u6216 1:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002","todo.settings.statusDoneFixed":"{{p0}} \u59CB\u7EC8\u4FDD\u6301\u6B64\u8BBE\u7F6E"};var ys={en:ms,de:fs,es:gs,fr:hs,"zh-CN":bs};function ws(e,t){return(ys.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var vs=ws;function xs(e){e.ui.registerCatalogs(ys),vs=(t,r)=>{let n=e.ui.t(t,r);return n===t?ws(t,r):n}}function d(e,t){return vs(e,t)}var ks={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},hu={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},bu={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},Ts=()=>{};function Ss(e){Ts=e}function As(e){let t=ks[e];return t?d(t):e}function et(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=Ts(e);if(r)return r;let n=ks[e];return n?d(n):t||e}function qe(e){return d(hu[e])}function Es(e){return d(bu[e])}var yu=["auto","white","black"],Rr=40,$r=40,wu=["completed","canceled"],Cs="statuses",$o=[{id:"open",labelKey:"todo.status.todo",color:ke("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ke("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ke("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ke("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ke("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ke("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ke("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ke("red"),done:!0,cls:"todo-st-canceled",locked:!1}],Ta=ke("teal");var Sa=$o.map(e=>e.id),Go=$o.filter(e=>!e.locked).map(e=>e.id),sb=$o.filter(e=>e.done).map(e=>e.id),Ro=new Map($o.map(e=>[e.id,e])),Ds=new Set(Go);function ct(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function Is(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function vu(e){if(typeof e!="string"||!zr(e))return!1;let t=zo(e);if(!t)return!1;let r=ls();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function xu(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,$r):"";if(!(!ct(a.id)||t.has(a.id)||!i)&&(t.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=Rr))break}return r}function jr(e){let t=e&&typeof e=="object"?e:{},r=xu(t.custom),n=new Set(r.map(y=>y.id)),a=Array.isArray(t.active)?t.active:Go,i=[];for(let y of a)typeof y!="string"||!(Ds.has(y)||n.has(y))||i.includes(y)||i.push(y);let s=[...Sa,...r.map(y=>y.id)],l=y=>y&&typeof y=="object"?y:{},p=l(t.colors),c=Object.fromEntries(s.map(y=>{let P=Ro.get(y)?.color??Ta;return[y,vu(p[y])?p[y]:P]})),u=l(t.textColors),g=Object.fromEntries(s.map(y=>[y,yu.includes(u[y])?u[y]:"auto"])),h=l(t.strikethrough),m=Object.fromEntries(s.map(y=>[y,typeof h[y]=="boolean"?h[y]:wu.includes(y)||r.some(P=>P.id===y&&P.done)])),x="text",k=(y,P)=>typeof y=="string"?y.replace(/[\u0000-\u001f]/g," ").trim().slice(0,P):"",F=(Array.isArray(t.removed)?t.removed:[]).filter(y=>typeof y=="string"&&Ds.has(y)),M=Object.fromEntries(s.map(y=>[y,k(l(t.labels)[y],$r)]).filter(([,y])=>y)),z=Object.fromEntries(s.map(y=>[y,k(l(t.icons)[y],80)]).filter(([,y])=>y&&/^[^/\\]+$/.test(y))),v=Object.fromEntries(Go.map(y=>[y,l(t.done)[y]]).filter(([y,P])=>typeof P=="boolean"&&P!==Ro.get(y)?.done));return{active:i.filter(y=>!F.includes(y)),custom:r,colors:c,textColors:g,strikethrough:m,style:x,labels:M,icons:z,done:v,removed:[...new Set(F)]}}function Ue(){return jr(f?.settings.get()[Cs])}function Ns(e){f.settings.set(Cs,jr(e))}Ss(e=>{let t=Ue();return t.labels[e]??t.custom.find(r=>r.id===e)?.label});function $t(e=Ue()){return[...Sa,...e.custom.map(t=>t.id)]}function co(e,t=Ue()){return Ro.has(e)?t.done?.[e]??Ro.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function ku(e){return`todo-st-${e}`}function Tu(e,t=Ue()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":At(t.colors[e]??Ta)}function Se(e,t=Ue()){let r=e&&ct(e)?t.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??Ta,done:r.done,cls:ku(r.id),locked:!1,custom:!0};let n=e&&Ro.get(e)||$o[0];return{...n,label:t.labels[n.id]??et(n.id),done:t.done[n.id]??n.done,color:t.colors[n.id],custom:!1}}function Gr(e=Ue()){return[Se("open",e),Se("completed",e),...e.active.map(t=>Se(t,e))]}function uo(){return Gr().map(e=>e.id)}function Ls(e){return e==="open"||e==="completed"||Ue().active.includes(e)}function ut(){let[e,t]=o.useState(()=>Gr());return o.useEffect(()=>f.settings.subscribe(()=>t(Gr())),[]),e}function po(e,t=uo()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function mo(e,t){return t==="all"||t.includes(Fe(e))}function Kr(e){if(typeof e=="string")return Sa.includes(e)||ct(e)?e:void 0}function Fe(e){return e.status??(e.completed?"completed":"open")}function Ne(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:co(e,t),status:e}}function fo(){return Gr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:we(e.color)}))}function Su(){let e=Ue();return $t(e).map(t=>{let r=Se(t,e),n=we(r.color),a=Tu(t,e),i=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${a}}`+i}).join("")}function Ps(){let[e,t]=o.useState(()=>Ue().style);return o.useEffect(()=>f.settings.subscribe(()=>t(Ue().style)),[]),e}function Os(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Su()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function Ms(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let s=t.slice(i,i+20),l=new Map;for(;s.length;){r();let p=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(u=>({to:u,from:{in:$t().filter(g=>g!==u)}})),...l.size?{and:[{or:s.map(u=>({taskId:u,position:{lt:l.get(u)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let c=await a.query({select:["taskId","changedAt"],where:{or:p.map(u=>({taskId:u.taskId,position:u.position}))},limit:20});r(),s=[];for(let u of c.rows){let g=String(u.taskId);if(typeof u.changedAt=="string"&&u.changedAt)n.set(g,{changedAt:u.changedAt});else{let h=p.find(m=>m.taskId===g)?.position;if(typeof h!="number"||!Number.isInteger(h))throw new Error("Invalid completion position");l.set(g,h),s.push(g)}}}}return n}function jo(e){return"historyLoaded"in e&&e.historyLoaded===!1}function Re(e,t=""){return typeof e=="string"?e:t}function Ur(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Vr(e){let t=Re(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function _s(e){let t=Re(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var Au=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],mb=Object.fromEntries(Au.map(e=>[e,{destination:"ask",recognize:!0}]));var Eu=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",Tt]);function Du(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function Aa(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=Du(e);if(!t||Eu.has(t)||t.startsWith(`${Tt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Cu=16384,Iu=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Nu(e){if(!e||e.length>Cu||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function Lu(e){try{let t=new URL(e);if(t.protocol!==`${Ri}:`||t.hostname!==$i)return null;let r=t.searchParams.get("realm")??"",n=Lo(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!Iu.test(a))return null;let i=Nu(t.searchParams.get("state")??""),s=t.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let l=t.searchParams.get("instance");return l&&l.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...l?{instanceId:l}:{}}:null}catch{return null}}function go(e){let t=Lu(e);return t?.kind==="file"?t.relPath:null}function zs(e){return Aa(e)!==null}function jt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Pu=["normal","low","medium","high"];function Fs(e){return e===!0}function Ou(e){return typeof e=="string"&&Pu.includes(e)?e:"normal"}function Br(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Gs(e){return Array.isArray(e)?e.filter(t=>Ur(t)).map(t=>({startedAt:Re(t.startedAt),endedAt:Re(t.endedAt),activeMinutes:Br(t.activeMinutes)??0,pauseMinutes:Br(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function Ea(e){return Array.isArray(e)?e.filter(t=>Ur(t)).map(t=>({from:Kr(t.from),to:Kr(t.to),changedAt:Re(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Mu(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function Hr(e){if(typeof e!="string")return;let t=e.trim();if(t)return go(t)||zs(t)?t:void 0}function _u(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>Hr(n)).filter(n=>!!n))];return r.length?r:void 0}function zu(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>_t(r)).filter(r=>!!r))];return t.length?t:void 0}function Fu(e){if(!Ur(e))return;let t=Re(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function Ko(e){let t=new Date().toISOString(),r=Re(e.id,jt("todo")),n=Re(e.createdAt,t),a=Gs(e.history),i=Ea(e.statusHistory),s=Kr(ct(e.customStatus)?e.customStatus:e.status);return{id:r,title:Re(e.title).trim(),completed:Fs(e.completed)||s==="completed"||s==="canceled",priority:Ou(e.priority),dueDate:Re(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:Vr(e.reminderTime),startTime:Vr(e.startTime),endTime:Vr(e.endTime),color:_s(e.color),note:Re(e.note),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],estimatedMinutes:Br(e.estimatedMinutes),actualMinutes:Br(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:_t(e.filePath),group:Re(e.group).trim()||void 0,flagged:Fs(e.flagged)||void 0,urls:_u(e.urls),attachments:zu(e.attachments),location:Fu(e.location),remindAt:Mu(e.remindAt),reminderFiredAt:Re(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Re(e.updatedAt,n)}}function Da(e,t,r){let n=(c,u=!1)=>{let g=new Map;for(let h of c){let m=g.get(h.taskId);m?m.push(h):g.set(h.taskId,[h])}if(u)for(let h of g.values())h.sort((m,x)=>Number(m.position)-Number(x.position));return g},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(c=>Ko({...c,tags:(a.get(c.id)??[]).map(u=>u.tag),urls:(i.get(c.id)??[]).map(u=>u.url),attachments:(s.get(c.id)??[]).map(u=>u.path),history:l.get(c.id)??[],statusHistory:p.get(c.id)??[]})).map(c=>({...c,group:Fr(c.group,r)??c.group})).filter(c=>c.title)}var Wr="todo.tasks",La="todo.task_tags",Pa="todo.task_links",Oa="todo.task_attachments",Ks="todo.focus_sessions",ho="todo.status_history",Uo=[Wr,La,Pa,Oa],Gu=[...Uo,Ks,ho],Ma=[...Uo,ho];function Ru(e,t){let r=Ie(),n=e.map(s=>r.api.data.dataset(s).subscribe(t)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function bo(e){return Ru(Ma,e)}function Us(e){let t=Uo.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function Et(e,t,r=Ie()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function $u(e,t=!0,r=!0,n=Ie()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?Et(La,a,n):[],Et(Pa,a,n),Et(Oa,a,n),t?Et(Ks,a,n):[],t?Et(ho,a,n):[]]),[s,l,p,c,u]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:s,links:l,attachments:p,sessions:c,statusHistory:u}}async function Na(e,t,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([Et(Wr,n,e),$u(r,t,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),Da(a.value,i.value,Rt(e.api.getState().groups))}var Rs=new WeakMap;function qr(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=Rs.get(e);i||(i=new Map,Rs.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let p=s,c=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{c.forEach(u=>u()),i.clear()}),i.set(t,s)}let l=s.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,c=await a();if(e.assertActive(),p===s.revision)return c}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,l)),l}function Vs(e,t){let r=Ie();return qr(r,e?"full":"calendar",e?Gu:Uo,t??"",()=>Na(r,e,t))}var Bs=200;function ju(e,t){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Bs)return null;let n=t===Wr?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var Ca=new WeakMap;function Ku(e){let t=Ca.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=Ma.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=i?ju(i,a):null;if(!s){r.full=!0,r.dirty.clear();return}for(let l of s)r.dirty.add(l);r.dirty.size>Bs&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Ca.delete(e)}),Ca.set(e,r),t=r,t}async function $s(e,t){let r;if(!t)r=await Na(e,!1);else{r=[];for(let a=0;a<t.length;a+=100)r.push(...await Na(e,!1,t.slice(a,a+100)))}let n=await Ms(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function Ye(e=Ie()){let t=Ku(e);return qr(e,"list",Ma,"",async()=>{let r=JSON.stringify(Rt(e.api.getState().groups));if(t.full||!t.value||t.groups!==r){t.full=!1,t.dirty.clear();try{t.value=await $s(e),t.groups=r}catch(p){throw t.full=!0,p}return t.value}if(!t.dirty.size)return t.value;let n=[...t.dirty];t.dirty.clear();let a;try{a=await $s(e,n)}catch(p){for(let c of n)t.dirty.add(c);throw p}let i=new Map(a.map(p=>[p.id,p])),s=new Set(n),l=[];for(let p of t.value)if(!s.has(p.id))l.push(p);else{let c=i.get(p.id);c&&(l.push(c),i.delete(p.id))}return l.push(...i.values()),t.value=l,l})}var js=new WeakMap,Uu=0;function Vu(e,t){let r=js.get(e);r||(r=new Map,js.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++Uu),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function Bu(e,t,r){return qr(e,"statusHistory",[ho],r.key,async()=>{let n=await Et(ho,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Ea(n)})}function Hs(e){let t=Ie(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=Vu(t,e),s=0,l=!1,p=()=>{let h=++s;Bu(t,e,a).then(m=>{!l&&h===s&&n({scope:t,id:e,history:m})}).catch(()=>{})},c=t.api.data.dataset(ho).subscribe(h=>{(!h.keys||h.keys.some(m=>m.taskId===e))&&p()}),u=()=>{l=!0,c(),i()},g=t.onDispose(u);return p(),()=>{g(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function Dt(){return Vs(!0)}async function Xe(e){return e?(await Vs(!0,e))[0]??null:null}function Ws(e,t,r,n){let a=Ie();return qr(a,"calendarPage",Uo,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(Wr).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let h=[];for(let m=0;m<i.rows.length;m+=100)h.push(...await Et(g,{taskId:{in:i.rows.slice(m,m+100).map(x=>String(x.id))}},a));return h},l=await Promise.allSettled([s(La),s(Pa),s(Oa)]),[p,c,u]=l.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:Da(i.rows,{tags:p,links:c,attachments:u,sessions:[],statusHistory:[]},Rt(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function Kt(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function _a(e,t,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??t:null}catch{return null}}async function Ia(e,t,r,n){return await _a(e,t,r,n)!==null}function za(e,t,r){return _a(e,t,r)}async function Vo(e,t){return await _a(e,t,void 0,void 0,!0)!==null}async function Ut(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function Yr(e){if(!e.id||!e.title.trim())return!1;let t=await Kt(e);return t&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Ut(e.id)}),redo:async()=>({ok:await Kt(e)})}),t}async function Ct(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await Xe(e),i=jo(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;jo(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await Ia(e,i,r,n);return s&&a&&f.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Ia(e,a)}),redo:async()=>({ok:await Ia(e,i)})}),s}async function Xr(e){let t=await Xe(e),r=await Ut(e);return r&&t&&f.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await Kt(t)}),redo:async()=>({ok:await Ut(e)})}),r}async function pt(e,t){return await f.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function Fa(e,t){let r=await Xe(e);return r?Ct(e,{...r,...Ne(t),updatedAt:new Date().toISOString()}):!1}async function qs(e,t){let r=await Xe(e);return r?Ct(e,{...r,group:t,updatedAt:new Date().toISOString()}):!1}function Hu(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Vt(e){let t=Hu(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}function ve(e=[]){return e.map(t=>Fr(t.name,e)??t.name)}var Ys=e=>[e];function Xs(e){Ys=e}function nt(e){return new Set(e.flatMap(t=>Ys(t)).map(t=>Q(t)))}var Ga="localGroups",Zr=200,Ho=60,Bo=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function Zs(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ra(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(s=>[s.name,...s.aliases??[]]).map(Q)),n=new Set(t.map(s=>s.id)),a=new Set,i=[];for(let s of e){if(!s||typeof s!="object")continue;let l=s,p=Bo(l.id,64),c=Bo(l.name,Ho),u=Bo(l.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(p)||a.has(p)||!c||r.has(Q(c))||!u)continue;let g=Array.isArray(l.aliases)?[...new Set(l.aliases.map(m=>Bo(m,Ho)).filter(m=>m&&Q(m)!==Q(c)&&!r.has(Q(m))))].slice(0,20):[],h=typeof l.parent=="string"&&n.has(l.parent)?l.parent:void 0;if(a.add(p),r.add(Q(c)),g.forEach(m=>r.add(Q(m))),i.push({id:p,name:c,color:u,...g.length?{aliases:g}:{},...h?{parent:h}:{}}),i.length>=Zr)break}return i}function Js(e,t){let r=Bo(t,Ho);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>Q(a)!==Q(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Qs(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}function ed(e,t,r){let n=t.find(a=>Q(a.name)===Q(e)||(a.aliases??[]).some(i=>Q(i)===Q(e)));return n?[e,...r.filter(a=>a.parent===n.id).flatMap(a=>[a.name,...a.aliases??[]])]:[e]}function Jr(){return Rt(f.getState().groups)}function Bt(){return Ra(f?.settings.get()[Ga],Jr())}async function td(e){await f.settings.set(Ga,Ra(e,Jr()))}function tt(){return Qs(Jr(),Bt())}Xs(e=>ed(e,Jr(),Bt()));function Qr(e){let t=f.subscribe(e),r=f.settings.subscribe(e);return()=>{t(),r()}}function Ve(){let[e,t]=o.useState(tt);return o.useEffect(()=>Qr(()=>t(tt())),[]),e}function od(){let[e,t]=o.useState(Bt);return o.useEffect(()=>Qr(()=>t(Bt())),[]),e}function rd(){let e=Ie(),t=!1,r=()=>{Ye(e).then(a=>{if(e.assertActive(),t)return;let i=new Set(Bt().flatMap(s=>[s.name,...s.aliases??[]]).map(Q));e.api.workspace.reportGroupUsage(ka(a.map(s=>s.group).filter(s=>!s||!i.has(Q(s)))))}).catch(()=>{})};r();let n=bo(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function Wu(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function qu(e){let t=e.toLowerCase();return Wu(t)?t:"yyyy-mm-dd"}function nd(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return qu(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Yu="ddd d mmm",Xu=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Zu(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!Xu.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function Ju(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return Zu(t)?t:Yu}var Wo=new Map;function Qu(e,t,r){let n=`${r??""}:${t}`,a=Wo.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Wo.size>=64&&Wo.delete(Wo.keys().next().value),Wo.set(n,a)),a.format(e)}function ad(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,l=new Date(Number(a),Number(i)-1,Number(s),12);return Ju(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?a:Qu(l,p,r))}var Be=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var qo={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},en={high:3,medium:2,low:1,normal:0},id=new Intl.Collator(void 0,{sensitivity:"base"});function Ht(e,t){return id.compare(e.title,t.title)}function ep(e,t,r){if(r==="name")return Ht(e,t);if(r==="priority"){let i=en[t.priority]-en[e.priority];return i!==0?i:mt(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:mt(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return mt(e,t);if(!i)return-1;if(!s)return 1;let l=i.localeCompare(s);return l!==0?l:mt(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Ht(e,t)}function $a(e,t){let r=en[t.priority]-en[e.priority];return r!==0?r:Ht(e,t)}function mt(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return $a(e,t)}function sd(e,t,r){let n=new Map(e.map(i=>[i,t(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,s)=>{let l=n.get(i),p=n.get(s);if(a(l)!==a(p))return a(l)?1:-1;let c=0;return!a(l)&&!a(p)&&(c=typeof l=="number"&&typeof p=="number"?l-p:id.compare(String(l),String(p))),c!==0?r==="asc"?c:-c:Ht(i,s)})}function yo(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",l=a.dueDate||"";if(!s&&!l)return mt(n,a);if(!s)return-1;if(!l)return 1;let p=l.localeCompare(s);return p!==0?p:mt(n,a)}let i=ep(n,a,t);return r==="asc"?i:-i})}function $e(e,t="dd-mm-yyyy"){return e?nd(e,t):""}function he(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function ja(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function It(e,t){let r=ja(e);return r?(r.setDate(r.getDate()+t),he(r)):e}function tn(e,t,r="ddd d mmm"){return ad(e.slice(0,10),r,t)}function at(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,l,p]=i.split("-").map(Number),[c,u,g]=t.split("-").map(Number);if(!s||!l||!p||!c||!u||!g)return $e(e,a);let h=new Date(s,l-1,p),m=new Date(c,u-1,g),x=Math.round((h.getTime()-m.getTime())/864e5);return x===1?r.tomorrow:x===-1?r.yesterday:x>1&&x<7?h.toLocaleDateString(n,{weekday:"long"}):$e(e,a)}var oy=new Date(2023,0,1,12);var tp={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Yo(e){return tp[e??""]??1}function dd(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function op(e,t){return(e.getDay()-t+7)%7}function ld(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-op(e,t))}function Wt(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var Xo=["overdue","today","upcoming","someday","completed"],cd={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function it(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function on(e,t=it()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||mt(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(mt),r.someday.sort($a),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Ht(a,i)),r}function Ka(e){return jo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Ua(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):it(t)}function ud(e){let t=new Map(e.map(a=>[a,Ka(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||Ht(a,i)),n=new Map;for(let a of r){let i=Ua(t.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function Va(e,t,r=1,n){let a=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),i=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:it(ld(Wt(l),r)):"",s=new Map;for(let l of e){let p=i(a(l)),c=s.get(p);c?c.push(l):s.set(p,[l])}return[...s.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}function rn(e,t=it()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,p)=>{let c=p.toLowerCase();if(c==="today")r=t;else if(c==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=it(u)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var je={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},rp={open:je,get:je,"edit-fields":je,add:je,complete:je,done:je,reopen:je,cancel:je,pause:je,status:je,edit:je,"open-page":{type:"null"},search:{type:"array",items:je,maxItems:20},list:{type:"array",items:je,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:je,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Ce=e=>typeof e=="string"?e:"",hd=e=>Ce(e?.query).trim(),sn=["normal","low","medium","high"];function wo(){return new Date().toISOString()}function pd(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function md(e){let t=e.trim();if(!t)return;let r=Fo(tt(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function fd(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return pd();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),pd(t)}return e}function np(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function nn(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Ba(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var an={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=hd(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Zo(e,t,r){let n=Ba(await Dt(),e),a=t(n),i=await za(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await Vo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Vo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function gd(e){return Zo(e,t=>({...t,completed:!0,status:"completed",updatedAt:wo()}),t=>`Complete \u201C${t.title}\u201D`)}var qt={type:"string"},bd={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,qt])),priority:{type:"string",enum:sn},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:qt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:qt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function ap(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in bd.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!sn.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!uo().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function ip(e,t,r){let a=(await Dt()).find(l=>l.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!ve(tt()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=Ko({...a,...t,...t.status?Ne(t.status):t.completed!==void 0?Ne(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:wo()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let l of["urls","attachments"])if(t[l]?.some(p=>!i[l]?.includes(p)))throw new Error(`Invalid task ${l}.`);let s=await za(e,i,a.updatedAt);if(!s)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await Vo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Vo(e,s))throw new Error("Could not reapply the task edit.")}}}}async function ft(e){let t=e??{},r=t.id??t.query,n={groups:tt(),statuses:uo()};if(!r)return n;let a=await Dt(),i=Ba(a,r);return{...n,records:[i]}}function yd(e){let t=n=>{let a=rp[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:qt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Ce(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Xe(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),ze().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:qt},required:["id"],additionalProperties:!1},parse:n=>{let a=Ce(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Xe(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:qt,values:bd,expectedUpdatedAt:qt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Ce(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:ap(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>ip(n,a,i),revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Ce(a.due),priority:Ce(a.priority),status:Ce(a.status),note:Ce(a.note),group:Ce(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:l,group:p})=>{let c=uo();if(s&&!c.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${c.join(", ")}`);let u=Ko({title:n,priority:i||"normal",status:s||void 0,dueDate:fd(a),note:l,group:md(p)});if(!await Kt(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Ut(u.id)},reapply:async()=>{await Kt(u)}}}},formatCli:n=>`Added: ${nn(n)}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:an,run:({query:n})=>gd(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:an,run:({query:n})=>gd(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=hd(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=Vt(n);return(await Dt()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(nn).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:an,run:({query:n})=>Zo(n,a=>({...a,completed:!1,status:"open",updatedAt:wo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:an,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!Ls(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return Zo(a,s=>({...s,...Ne(i),updatedAt:wo()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>ft(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim(),s=Ce(a.status),l=uo();if(!i||!l.includes(s))throw new Error(`Usage: todo status "<id or title>" <${l.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>Zo(n,i=>({...i,...Ne(a),updatedAt:wo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim(),s=Ce(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!sn.includes(s))throw new Error(`Invalid priority "${s}". One of: ${sn.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?np(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:l,tags:p,group:c})=>Zo(n,u=>({...u,title:a??u.title,priority:i??u.priority,dueDate:s===void 0?u.dueDate:fd(s),note:l??u.note,tags:p??u.tags,group:c===void 0?u.group:md(c),updatedAt:wo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${nn(n)}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ce(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await Dt(),s=Ba(i,n);if(!a)return{value:{deleted:!1,todo:s,deletedCount:0},revert:null};if(!await Ut(s.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:s,deletedCount:1},revert:{label:`Delete \u201C${s.title}\u201D`,run:async()=>{await Kt(s)},reapply:async()=>{await Ut(s.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Ce(a.section),q:Ce(a.q)}},fromCli:(n,a)=>({section:Ce(a.section),q:Ce(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await Dt();if(a){let s=Vt(a);i=i.filter(l=>s(l.tags,l.title,l.note))}return n&&Xo.includes(n)?on(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(nn).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Dt(),a=tt();return ve(a).map(i=>({name:i,count:n.filter(s=>Q(s.group??"")===Q(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var wd={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var dp=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,lp=/^-\s+(.*)$/,cp=/^[A-Za-z][\w+.-]*:\/\//;function vd(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(lp);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=cp.test(a)?null:a.match(dp);if(s){let l=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function xd(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Ha="notes-todo-fence-styles";function up(){if(document.getElementById(Ha))return;let e=document.createElement("style");e.id=Ha,e.textContent=`
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
`,document.head.appendChild(e)}var kd=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},pp=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function mp(e,t){let r=kd(),n=pp(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var fp=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=Ie(),g=!0,h=()=>{Ye(u).then(x=>{u.assertActive(),g&&r(x)}).catch(()=>{})};h();let m=bo(h);return()=>{g=!1,m()}},[]);let n=vd(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:xd(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=mp(t,s),p=kd(),c=u=>{let g={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(h=>h&&h.map(m=>m.id===u.id?g:m)),Ct(u.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>f.workspace.openMainTab({newTab:f.ui.hasModKey(u)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>c(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},Be.find(g=>g.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function Td(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(up(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(fp,{code:t}))),{examples:wd.todo});return()=>{e(),document.getElementById(Ha)?.remove()}}var qa=".valley/assets/icons/todo-icon",gp=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),hp=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function bp(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let t=new DOMParser().parseFromString(e,"image/svg+xml"),r=t.documentElement;if(r.localName!=="svg"||t.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!gp.has(n.tagName)){n.remove();continue}for(let a of[...n.attributes])(!hp.has(a.name)||/url\s*\(|javascript:|expression\s*\(/i.test(a.value))&&n.removeAttribute(a.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function Ya(){return f.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function Wa(){let e=Ya();return e.pending||(e.pending=f.backend.call("taskIcons",{}).then(t=>{let r={};for(let[n,a]of Object.entries(t?.icons??{})){let i=bp(a);i&&(r[n]=i)}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function Sd(e){return e?Ya().icons[e]:void 0}function Xa(){let e=Ya();return o.useEffect(()=>{e.loaded||Wa()},[e]),o.useSyncExternalStore(o.useCallback(t=>(e.listeners.add(t),()=>{e.listeners.delete(t)}),[e]),()=>e.revision),e.icons}function Ad(){Wa();let e,t=f.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${qa}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{Wa()},150))});return()=>{window.clearTimeout(e),t()}}function Ed(e){let r=f?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var ee=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Nt=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),yp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),wp=e=>o.createElement(Nt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),vp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),xp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),kp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Tp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Sp=e=>o.createElement(Nt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Ap={inprogress:vp,waiting:xp,onhold:wp,delegated:kp,deferred:Tp,completed:Sp,canceled:yp},Le=({status:e,dotCls:t,color:r})=>{let n=r?{color:r}:void 0,a=Sd(Ed(e??"open"));if(a)return o.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${t}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:a}});let i=e?Ap[e]:void 0;return i?o.createElement(i,{className:`todo-status-menu-svg ${t}`,style:n}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:n})};var Jo=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),gt=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Ae=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Qo=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),Dd=e=>o.createElement(ee,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Cd=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Id=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),dn=e=>o.createElement(ee,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),ln=e=>o.createElement(ee,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),er=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),tr=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Nd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),Ld=e=>o.createElement(ee,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),Pd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),cn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Pe=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),Od=e=>o.createElement(Nt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Md=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),un=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),Ze=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),ht=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),_d=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),zd=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),Yt=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Xt=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Fd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),pn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Gd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),ot=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),Lt=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),bt=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),mn=e=>o.createElement(ee,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),fn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),gn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),or=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),rr=e=>o.createElement(ee,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),st=e=>o.createElement(ee,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),hn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),nr=e=>o.createElement(ee,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),bn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),Za=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Ja=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),Qa=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),Rd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),yn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),wn=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),$d=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),jd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"}));var Kd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Ud=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M5 12h14"})),Vd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),vn=e=>o.createElement(ee,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),ei=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),Bd=e=>o.createElement(ee,{...e},o.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function ar(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var vo=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let a=o.useRef(null),[i,s]=o.useState([]),[l,p]=o.useState("idle"),[c,u]=o.useState(-1),[g,h]=o.useState(!1),m=o.useRef(null),x=o.useRef(0),k=o.useRef(!1);o.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),o.useEffect(()=>{n&&a.current?.focus()},[n]);let F=v=>{m.current!==null&&window.clearTimeout(m.current);let y=++x.current;if(v.trim().length<2){s([]),p("idle"),h(!1);return}h(!0),p("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:v.trim(),kinds:["place"],limit:8}).then(P=>{y===x.current&&(s(P),u(P.length?0:-1),p("done"))},()=>{y===x.current&&(s([]),u(-1),p("failed"))})},250)},M=v=>{let y=Number(v.metadata?.longitude),P=Number(v.metadata?.latitude),Z=(v.value??v.label).trim();k.current=!0,x.current++,a.current&&(a.current.value=Z),h(!1),s([]),t({name:Z,...Number.isFinite(y)&&Number.isFinite(P)?{lng:y,lat:P}:{}})},z=()=>{let v=a.current?.value.trim()??"";if(x.current++,h(!1),k.current){k.current=!1;return}v!==(e?.name??"")&&t(v?{name:v}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(gt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:v=>{k.current=!1,F(v.currentTarget.value)},onFocus:v=>{v.currentTarget.value.trim().length>=2&&i.length&&h(!0)},onBlur:z,onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="ArrowDown"&&i.length?(v.preventDefault(),h(!0),u(y=>(y+1)%i.length)):v.key==="ArrowUp"&&i.length?(v.preventDefault(),u(y=>y<=0?i.length-1:y-1)):v.key==="Enter"?(v.preventDefault(),g&&i[c]?M(i[c]):z()):v.key==="Escape"&&g&&(v.preventDefault(),v.stopPropagation(),x.current++,h(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>ar(e)},o.createElement(Gd,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:v=>v.preventDefault(),onClick:()=>{x.current++,a.current&&(a.current.value=""),s([]),h(!1),t(void 0)}},o.createElement(Ae,null)))),g&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},l==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),l==="failed"&&o.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),i.map((v,y)=>o.createElement("li",{key:v.id,role:"option","aria-selected":y===c},o.createElement("button",{type:"button",className:"todo-location-hit"+(y===c?" is-active":""),onMouseDown:P=>P.preventDefault(),onMouseEnter:()=>u(y),onClick:()=>M(v)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(ot,null),v.label),v.description&&o.createElement("span",{className:"todo-location-hit-context"},v.description))))))};function Ep(){try{return Yo(f?.getState().weekStart)}catch{return 1}}function Hd(e,t=Ep()){let r=Wt(e).getDay();return It(e,6-(r-t+7)%7)}var Oe={kind:"smart",id:"all"},xn=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ke("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ke("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:ke("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ke("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ke("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ke("green"),dated:!1}],ir=xn.map(e=>e.id);function ti(e){let t=e&&typeof e=="object"?e:{},r=[];for(let c of Array.isArray(t.order)?t.order:[])typeof c=="string"&&ir.includes(c)&&!r.includes(c)&&r.push(c);ir.forEach((c,u)=>{if(r.includes(c))return;let g=ir.slice(0,u).reverse().find(h=>r.includes(h));r.splice(g?r.indexOf(g)+1:0,0,c)});let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(c=>n.includes(c));a.length===r.length&&a.shift();let i=t.colors&&typeof t.colors=="object"?t.colors:{},s={};for(let c of ir){let u=i[c];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(s[c]=u)}let l=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let c of ir){let u=l[c];(u==="white"||u==="black")&&(p[c]=u)}return{order:r,hidden:a,colors:s,textColors:p}}function Wd(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>yt(t,e))}function yt(e,t){let r=xn.find(i=>i.id===e)??xn.find(i=>i.id==="all"),n=t?.colors[r.id],a=t?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function sr(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}function Dp(e,t,r=he(new Date)){if(t.kind==="groups")return e.group?nt(t.names).has(Q(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=Hd(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function kn(e,t,r,n=he(new Date)){return Dp(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function qd(e,t=he(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=Hd(t);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++,i<=n&&r.week++)}return r}function Tn(e,t){let r=t===null?null:nt([t]);return e.filter(n=>!n.completed&&(r===null?!n.group:r.has(Q(n.group??"")))).length}function Je(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Cp=xn.map(e=>e.id);function dr(e){if(typeof e!="string")return Oe;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Oe}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Oe}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Oe;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Oe}catch{return Oe}return Cp.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Oe}function Sn(e,t){return Je(e)===Je(t)}var Ip=["group","notes","status","location","tags"],Np="todo.view",Lp="todo.showCompleted",Pp="todo.statusFilter",Op="todo.search",Mp="todo.pageSort",ai="panelChip",Xd="pageShowCompleted",oi="statusFilter",ii="dateBreakdown",Zd="smartLists",lr="pageSearch",Jd="pageSort",_p={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Qd=["due","priority","flagged","updated","created","name"];function Yd(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Qd.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:po(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function Cn(e){let t=_p[e],r=o.useCallback(()=>Yd(f.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(l=>{let p=Yd({...l,...s});return f.settings.set(t,p),p})},[t]);return[n,i]}function An(){let e=f.settings.get()[ii];return e==="weekly"||e==="daily"?e:"monthly"}function In(){let[e,t]=o.useState(An);return o.useEffect(()=>f.settings.subscribe(()=>t(An())),[]),e}function xo(){return f.runtime.getOrCreate(Np,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function Nn(){return f.runtime.getOrCreate(Lp,()=>({show:null,listeners:new Set}))}function Ln(){return f.runtime.getOrCreate(Pp,()=>({filter:null,listeners:new Set}))}function cr(){return f.runtime.getOrCreate(Op,()=>({query:null,listeners:new Set}))}function Pn(){return f.runtime.getOrCreate(Mp,()=>({value:null,listeners:new Set}))}function Zt(){let e=xo();return e.view||(e.view=dr(f.settings.get()[ai]),e.history=[e.view],e.historyIndex=0),e.view}function Ke(e){let t=xo();if(Zt(),t.view&&Sn(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(ai,Je(e));for(let n of t.listeners)n(e)}function On(){let e=xo();return Zt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function ko(e){let t=xo();Zt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(ai,Je(t.view));for(let n of t.listeners)n(t.view)}}function si(e){let t=xo();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function el(){let e=xo();e.view=null,e.history=[],e.historyIndex=-1,Nn().show=null,Ln().filter=null,cr().query=null,Pn().value=null}function En(){return ti(f.settings.get()[Zd])}function tl(e){f.settings.set(Zd,ti(e))}function Mn(){let[e,t]=o.useState(En);return o.useEffect(()=>f.settings.subscribe(()=>t(En())),[]),e}function ol(e){let t=cr(),r=e.slice(0,500);if(t.query!==r){t.query=r,f.settings.set(lr,r);for(let n of t.listeners)n(r)}}function _n(){let e=()=>{let n=cr();return n.query===null&&(n.query=typeof f.settings.get()[lr]=="string"?String(f.settings.get()[lr]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=cr();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,ol]}function di(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||Ip.includes(t.field)||Qd.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function rl(){let e=Pn();return e.value||(e.value=di(f.settings.get()[Jd])),e.value}function nl(e){let t=Pn(),r=di(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(Jd,r);for(let n of t.listeners)n(r)}}function al(){let[e,t]=o.useState(rl);return o.useEffect(()=>{let r=Pn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,nl]}function zn(e=Zt()){return{v:1,view:Je(e),showCompleted:ni(),statusFilter:Dn(),search:cr().query??(typeof f.settings.get()[lr]=="string"?String(f.settings.get()[lr]).slice(0,500):""),sort:rl()}}function Fn(e,t=!1){return e.v!==1?!1:(t||Ke(dr(e.view)),Jt(e.showCompleted===!0),ri(po(e.statusFilter)),ol(typeof e.search=="string"?e.search:""),nl(di(e.sort)),!0)}function Dn(){let e=Ln();if(e.filter===null){let t=f.settings.get()[oi];e.filter=po(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(oi,e.filter)}return e.filter}function ri(e){let t=Ln(),r=po(e),n=t.filter??Dn();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,f.settings.set(oi,r);for(let a of t.listeners)a(r)}}function wt(){let[e,t]=o.useState(Dn);return o.useEffect(()=>{let r=Ln();r.listeners.add(t);let n=f.settings.subscribe(()=>{let a=po(r.filter??Dn());ri(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,ri]}function Gn(){let[e,t]=o.useState(Zt);return o.useEffect(()=>si(t),[]),e}function ni(){let e=Nn();return e.show===null&&(e.show=f.settings.get()[Xd]===!0),e.show}function Jt(e){let t=Nn();if(t.show!==e){t.show=e,f.settings.set(Xd,e);for(let r of t.listeners)r(e)}}function vt(){let[e,t]=o.useState(ni);return o.useEffect(()=>{let r=Nn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Jt(!ni())]}function sl(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(Gt).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var zp=["normal","low","medium","high"];function dl(e,t){return e&&zp.includes(e)?e:t}function Fp(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Gp(e,t){return e.dueDate?{badges:Fp(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Te(e.group,t)}:{}}:null}function Rp(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:dl(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ne(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Rn(e){return Xe(e)}function il(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var li="attachment:",ci="url:";function $p(){return!0}function jp(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:il(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${li}${i}`,label:il(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${ci}${i}`,label:i,icon:"link"}))}),e.location&&$p()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Kp(e,t){if(t.startsWith(li)){let r=t.slice(li.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(ci)){let r=t.slice(ci.length);if(!(e.urls??[]).includes(r))return!1;let n=go(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Ke(e.completed?{kind:"smart",id:"completed"}:Oe),ze().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(ar(e.location),!0):!1;default:return!1}}function ll(){let e=Ie(),t=jt("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:c,endDate:u,limit:g,cursor:h})=>{let m,x=()=>`${t}:${r}`;if(h){let v;try{v=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!v||v.startDate!==c||v.endDate!==u||v.limit!==g||v.revision!==x()||typeof v.cursor!="string"||!v.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=v.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let k=x(),F=await Ws(c,u,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&k!==x())throw new Error("Calendar source cursor is stale; restart the range.");let M=tt(),z=x();return{items:F.todos.map(v=>Gp(v,M)).filter(v=>!!v),revision:z,...F.cursor?{cursor:JSON.stringify({startDate:c,endDate:u,limit:g,revision:z,cursor:F.cursor})}:{}}},create:async(c,u)=>{if(u.endDate&&u.endDate!==c)return!1;let g=u.title?.trim();if(!g)return!1;let h=new Date().toISOString();return Yr({id:jt("todo"),title:g,completed:u.completed??!1,priority:dl(u.priority,"normal"),dueDate:c,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:h,updatedAt:h})},update:async(c,u)=>{let g=await Rn(c);return g&&u.endDate&&u.endDate!==(u.date??g.dueDate)?!1:g?Ct(g.id,Rp(g,u),g.updatedAt):!1},remove:c=>Xr(c),open:async c=>{let u=await Rn(c);await f.workspace.revealOwnPanel("left_sidebar"),u&&(Ke(u.completed?{kind:"smart",id:"completed"}:Oe),ze().request(u.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async c=>{let u=await Rn(c);return u?jp(u):[]},runAction:async(c,u)=>{let g=await Rn(c);return g?Kp(g,u):!1}},i=()=>{f.interop.state.publish(Oo,++r)};f.interop.state.publish(Oo,r);let s=Us(i),l=Qr(i),p=f.interop.services.provide(Gt,a);return()=>{n=!1,s(),l(),p(),f.interop.state.publish(Oo,null)}}var ui=e=>typeof e=="string"?e:"";function cl(e){let t=ui(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function ul(e){let t={cardKind:"todo",open:async(r,n)=>{if(ui(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ui(r.id)}),!0;let a=cl(r.filePath)||cl(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(pa,t)}function dt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>f.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function $n(){let e=o.useCallback(i=>f.interop.state.subscribe(Ir,i),[]),t=o.useCallback(()=>f.interop.state.get(Ir),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function pl(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let l=new Set(r.current);s?l.add(i):l.delete(i),r.current=l,t(l)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var Up="todo.sharedTodos";function pi(){return f.runtime.getOrCreate(Up,()=>({todos:[],listeners:new Set}))}function xe(){return pi().todos}function xt(e){let t=pi();t.todos=e;for(let r of t.listeners)r(e)}function Pt(e){let t=pi();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var mi="list:",ml=e=>f.ui.hasModKey(e)||e.button===1,Vp=e=>`${mi}${Je(e)}`;function Qt(e){return e?.startsWith(mi)?dr(e.slice(mi.length)):null}var fl=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function fi(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(yt(e.id).labelKey)}function gi(e,t){f.workspace.openMainTab({instanceId:Vp(e),title:fi(e),newTab:t})}function ur(e,t=!1){t||Qt(fl(f.getState().activePluginTab))?gi(e,t):Ke(e)}function pr(){let e=Gn(),{activePluginTab:t}=dt("activePluginTab"),r=fl(t);return o.useMemo(()=>Qt(r),[r])??e}function Ot(){return f.workspace.openOwnSettings(),Promise.resolve()}var hi={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function gl(){return["completed",...$t().filter(t=>t!=="completed")].map(t=>Se(t))}function eo(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function hl(){for(let e of eo().listeners)e()}function bi(e,t=""){let r=eo();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,hl())}function yi(e,t){e?eo().selected.set(t,e):eo().selected.delete(t),hl()}function Bp(e,t){let r=e==="main_workspace"?Qt(t):null,n=zn(r??void 0),a=xe().find(i=>i.id===eo().selected.get(e));return{title:d("manifest.name"),view:n,actions:eo().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...On(),goBack:()=>ko(-1),goForward:()=>ko(1)}}}}function Hp(e){let t=eo().listeners;t.add(e);let r=Pt(e),n=si(e),a=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function Wp(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Xe(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Fn(e,t==="main_workspace"&&Qt(n)!==null))throw new Error("Unsupported To-Do bookmark.");yi(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&ze().request(e.todoId,"focus")}function qp({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(cn,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},gl().map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,i.label),o.createElement("span",null,r.filter(s=>Fe(s)===i.id).length)))))}function Yp(){let e=o.useSyncExternalStore(Pt,xe,xe),t=Ve(),r=pr(),n=r.kind==="smart"?d(yt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...gl().map(a=>[a.label,e.filter(i=>Fe(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...ve(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(l=>a===null?!l.group:nt([a]).has(Q(l.group??""))),s=a??d("todo.chip.noGroup");return o.createElement(qp,{key:a??"ungrouped",label:s,color:a?we(Te(a,t)):"var(--text-tertiary)",todos:i})})))}function Xp(){let e=o.useSyncExternalStore(Pt,xe,xe),t=Ve(),r=pr();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(mr,{embedded:!0,todos:e,groups:t,names:ve(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>ur(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Oe),onOpenSettings:Ot}))}function bl(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>ha(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>Bp(n,a),subscribe:Hp,restore:(a,i,s)=>Wp(a,n,s?.background,i)},{stateSchema:hi,itemStateSchema:{...hi,required:[...hi.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Nr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Xe(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(Yp,null)})),r.push(e.interop.extensions.provide(Nr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>tt().map(n=>({id:n.id,label:n.name,value:xe().filter(a=>nt([n.name]).has(Q(a.group??""))).length,readOnly:!0})),render:()=>o.createElement(Xp,null)})),()=>r.forEach(n=>n())}function yl(e,t,r){let n=new Date().toISOString();return{id:jt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function wl(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function To(e,t,r="main_workspace"){let n=o.useRef(Ie()).current,[a,i]=o.useState(xe()),[s,l]=o.useState(null),[p,c]=o.useState(null),[u,g]=o.useState(null),[h,m]=o.useState(!0),[x,k]=o.useState(0),[F,M]=o.useState(!1),{pendingIds:z,isPending:v,setPending:y}=pl(),P=o.useRef(!1),Z=o.useRef(0),R=o.useRef({sortField:e,sortDir:t});R.current={sortField:e,sortDir:t};let K=o.useRef([]),U=o.useMemo(()=>{let _=new Map(a.map(te=>[te.id,te])),le=new Set(K.current),ce=[];for(let te of K.current){let oe=_.get(te);oe&&ce.push(oe)}for(let te of a)le.has(te.id)||ce.push(te);return ce},[a,x]),se=o.useCallback(_=>{let le=++Z.current;_&&m(!0),Ye(n).then(ce=>{if(n.assertActive(),le===Z.current){if(_){let{sortField:te,sortDir:oe}=R.current;K.current=yo(ce,te,oe).map(ne=>ne.id)}else{let te=new Set(ce.map(b=>b.id)),oe=K.current.filter(b=>te.has(b)),ne=new Set(oe),{sortField:T,sortDir:L}=R.current,j=yo(ce.filter(b=>!ne.has(b.id)),T,L).map(b=>b.id);K.current=[...j,...oe]}xt(ce),m(!1)}}).catch(()=>{le===Z.current&&m(!1)})},[n]);o.useEffect(()=>(se(!0),()=>{Z.current++}),[se]),o.useEffect(()=>bo(()=>se(!1)),[se]);let D=o.useRef(!0);o.useEffect(()=>{if(D.current){D.current=!1;return}K.current=yo(xe(),e,t).map(_=>_.id),k(_=>_+1)},[e,t]),o.useEffect(()=>Pt(_=>i(_)),[]);let G=o.useCallback(()=>l(null),[]),W=o.useCallback(_=>{yi(_,r),g(_)},[r]),E=o.useCallback(()=>g(null),[]),$=o.useCallback(async(_,le,ce)=>{if(P.current)return null;let te=_.trim();if(!te)return null;let oe={...yl(te,le),...ce?.patch};P.current=!0,M(!0),K.current=[oe.id,...K.current],xt([oe,...xe()]),l(oe.id);let ne=()=>{K.current=K.current.filter(T=>T!==oe.id),xt(xe().filter(T=>T.id!==oe.id)),l(T=>T===oe.id?null:T)};try{let T=await Yr(oe);return T||ne(),T?oe:null}catch{return ne(),null}finally{P.current=!1,M(!1)}},[]),w=o.useCallback(async(_,le,ce)=>{if(v(_))return!1;let te=xe().find(ne=>ne.id===_);if(!te)return!1;let oe={...te,...le,updatedAt:new Date().toISOString()};y(_,!0),xt(xe().map(ne=>ne.id===_?oe:ne));try{return await Ct(_,oe,te.updatedAt,ce)?!0:(xt(xe().map(T=>T.id===_?te:T)),!1)}catch{return xt(xe().map(ne=>ne.id===_?te:ne)),!1}finally{y(_,!1)}},[v,y]),S=o.useCallback(async _=>{if(v(_))return;let le=xe().find(te=>te.id===_);if(!le)return;y(_,!0),K.current=K.current.filter(te=>te!==_),xt(xe().filter(te=>te.id!==_)),l(te=>te===_?null:te),u===_&&g(null);let ce=()=>{K.current.includes(_)||K.current.push(_),xe().some(te=>te.id===_)||xt([...xe(),le])};try{await Xr(_)||ce()}catch{ce()}finally{y(_,!1)}},[u,v,y]);return{todos:a,loading:h,ordered:U,lastCreatedId:s,clearLastCreated:G,menuId:p,setMenuId:c,editingId:u,openDetail:W,closeDetail:E,pendingIds:z,creating:F,create:$,patchTodo:w,removeTodo:S}}var Zp=[".ttf",".otf",".woff",".woff2"],Jp=[".csv"],Qp=[".base"],em=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],tm=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],om=[...em,...tm,".ico",".flavicon"];var rm=[".pdf"],nm=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],am=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],im=[".srt",".vtt",".ass"],sm=[".stl",".obj",".glb",".gltf"],dm=[".bin",".mtl"];function wi(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var lm={type:"core",id:"valley"},X=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:lm,...a});function cm(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var um=cm([[[".mermaid",".mmd"],X("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],X("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],X("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],X("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],X("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Zp,X("font","font","font","media")],[[".epub",".mobi",".azw3"],X("ebook","ebook","ebook","documents")],[[".djvu"],X("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],X("comic","comic","comic","documents")],[[".md",".markdown"],X("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],X("text","text","text","notes")],[[".json"],X("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],X("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Jp,X("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Qp,X("base","base","fallback","data")],[om,X("image","image","image","media",{information:["identity","dimensions","exif"]})],[rm,X("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[nm,X("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[am,X("video","video","video","media",{information:["identity","media","video-codec"]})],[im,X("text","subtitle","text","media")],[sm,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[dm,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],X("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],X("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],X("docx","word","opendocument","documents")],[[".ods"],X("csv","excel","opendocument","data")],[[".odp"],X("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],X("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],X("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],X("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],X("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],X("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],X("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],X("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],X("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],X("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],X("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],X("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],X("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],X("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],X("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],X("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],X("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],X("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],X("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],X("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],X("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],X("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],X("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],X("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],X("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],X("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],X("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],X("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),pm=X("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function mm(e){return um[wi(e)]??pm}function fr(e){return mm(e).kind}var vl="valley-realm",xl="asset";function kl(e){return`${vl}://${xl}/${encodeURIComponent(e)}`}var fm={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function gm(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function vi(e){let t=fm[fr(e)];if(t)return d(t);let r=wi(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var hm={image:mn,audio:fn,video:gn},Tl=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=fr(e),i=e.split("/").pop()??e,s=hm[a]??bt;o.useEffect(()=>{let u=!1;return f.realm.fileInfo(e).then(g=>{u||n(g?.size??null)}),()=>{u=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>f.realm.onChanged(()=>p(u=>u+1)),[]);let c=a==="image"?`${kl(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},vi(e),r!==null&&` \xB7 ${gm(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},c?o.createElement("img",{src:c,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},o.createElement(Ae,null)))};var bm={image:mn,audio:fn,video:gn};function xi({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let a=o.useRef(null),[i,s]=o.useState([]),[l,p]=o.useState(0),[c,u]=o.useState("idle"),g=o.useRef(null),h=o.useRef(0);o.useEffect(()=>{n&&a.current?.focus()},[n]),o.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=k=>{g.current!==null&&window.clearTimeout(g.current);let F=++h.current;if(!k.trim()){s([]),u("idle");return}u("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:k.trim(),kinds:["attachment"],limit:6}).then(M=>{F===h.current&&(s(M),p(0),u("done"))},()=>{F===h.current&&(s([]),u("done"))})},150)},x=k=>(k.value??k.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(gt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:k=>m(k.currentTarget.value),onKeyDown:k=>{k.nativeEvent.isComposing||(k.key==="ArrowDown"&&i.length?(k.preventDefault(),p(F=>(F+1)%i.length)):k.key==="ArrowUp"&&i.length?(k.preventDefault(),p(F=>F<=0?i.length-1:F-1)):k.key==="Enter"?(k.preventDefault(),i[l]&&e(x(i[l]))):k.key==="Escape"&&(k.preventDefault(),k.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:t},o.createElement(Ae,null))),c!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},c==="searching"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!i.length&&o.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),i.map((k,F)=>{let M=x(k),z=bm[fr(M)]??bt,v=M.includes("/")?M.slice(0,M.lastIndexOf("/")):"";return o.createElement("li",{key:k.id,role:"option","aria-selected":F===l},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(F===l?" is-active":""),onMouseDown:y=>y.preventDefault(),onMouseEnter:()=>p(F),onClick:()=>e(M)},o.createElement(z,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},k.label||M.split("/").pop()),v&&o.createElement("span",{className:"todo-file-search-folder"},v))))})))}var ym=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],Sl=e=>{let[t,r]=(e||he(new Date)).split("-").map(Number);return new Date(t,r-1,1)};function to({value:e,onChange:t}){let[r,n]=o.useState(()=>Sl(e)),a=f.ui.language(),i=Math.max(0,ym.indexOf(String(f.getState().weekStart??"monday").toLowerCase())),s=he(new Date),l=r.getFullYear(),p=r.getMonth(),c=(new Date(l,p,1).getDay()-i+7)%7,u=Array.from({length:42},(x,k)=>new Date(l,p,1-c+k)),g=Array.from({length:7},(x,k)=>new Intl.DateTimeFormat(a,{weekday:"narrow"}).format(new Date(2024,0,7+(i+k)%7))),h=new Intl.DateTimeFormat(a,{month:"long",year:"numeric"}).format(r),m=x=>n(new Date(l,p+x,1));return o.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},o.createElement("div",{className:"todo-calendar-head"},o.createElement("span",{className:"todo-calendar-title"},h),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>m(-1)},o.createElement(yn,null)),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>m(1)},o.createElement(wn,null))),o.createElement("div",{className:"todo-calendar-grid"},g.map((x,k)=>o.createElement("span",{key:`w${k}`,className:"todo-calendar-weekday"},x)),u.map(x=>{let k=he(x),F=x.getMonth()!==p;return o.createElement("button",{key:k,type:"button",className:"todo-calendar-day"+(F?" is-outside":"")+(k===s?" is-today":"")+(k===e?" is-selected":""),"aria-pressed":k===e,"aria-label":new Intl.DateTimeFormat(a,{dateStyle:"full"}).format(x),onClick:()=>t(k)},x.getDate())})),o.createElement("div",{className:"todo-calendar-foot"},o.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>t("")},d("todo.calendar.clear")),o.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(Sl(s)),t(s)}},d("todo.due.today"))))}function wm(e){let t=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(t);if(!r)return null;let n=Number(r[1]),a=Number(r[2]);return n>23||a>59?null:`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function gr({value:e,onChange:t,ariaLabel:r,placeholder:n,disabled:a}){let[i,s]=o.useState(e),[l,p]=o.useState(!1);o.useEffect(()=>{s(e),p(!1)},[e]);let c=()=>{if(!i.trim()){p(!1),e&&t("");return}let u=wm(i);if(!u){p(!0);return}p(!1),s(u),u!==e&&t(u)};return o.createElement("input",{className:"settings-control todo-clock-input"+(l?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:i,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":l||void 0,title:l?d("todo.time.invalid"):void 0,disabled:a,autoComplete:"off",spellCheck:!1,onChange:u=>{let g=u.currentTarget.value.replace(/[^\d:]/g,""),h=g.indexOf(":");s(h<0?g:g.slice(0,h+1)+g.slice(h+1).replace(/:/g,"")),p(!1)},onBlur:c,onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),c())}})}function jn(e){return f.markdown.render(e,{inline:!0})}var vm={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},xm=["tomorrow","weekend","pick"];function km(e=he(new Date)){let t=ja(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return It(e,n)}function Kn(e,t=he(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?It(t,1):s==="weekend"?km(t):null,a=new Set,i=[];for(let s of xm){let l=n(s);if(l!==null){if(l===r||a.has(l))continue;a.add(l)}i.push({id:s,labelKey:vm[s],date:l})}return i}function Al(e,{todo:t,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:s,disabled:l=!1}){let p=Fe(t);n(t.id);let c=Kn(t.dueDate??"",he(new Date));return f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(Ze,{className:"todo-menu-action-icon"}),enabled:!l,submenu:fo().map(u=>({label:u.label,icon:o.createElement(Le,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>i(Ne(u.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(st,{className:"todo-menu-action-icon"}),enabled:!l,submenu:c.filter(u=>u.date).map(u=>({label:d(u.labelKey),icon:u.id==="tomorrow"?o.createElement(nr,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(bn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:u.date})}))},{label:d(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Pe,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:()=>i({flagged:t.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(Od,{className:"todo-menu-action-icon"}),enabled:!l,submenu:Be.map(u=>({label:qe(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>i({priority:u.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(un,{className:"todo-menu-action-icon"}),enabled:!l,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>i({group:void 0})},...r.map(u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>i({group:u})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(Md,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:a},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(ht,{className:"todo-menu-action-icon"}),enabled:!l,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function Un(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),Al({x:e.clientX,y:e.clientY},t))}var Vn=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:l=>{l.stopPropagation(),Al({anchor:l.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s})}},o.createElement(Cd,null)));function Tm(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Sm(e,t=.998){return e/1e3*t/(1-t)}function El(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function Dl(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+Tm(n-t,a,.2))}function Cl(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,Sm(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function Il(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/a)**2,p=2*i*Math.sqrt(l),c=t+(-l*(e-r)-p*t)*s,u=e+c*s,g=Math.abs(u-r)<.5&&Math.abs(c)<20;return{value:g?r:u,velocity:g?0:c,done:g}}function ki(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*s<=i+(r?24:0),p=l?s:48,c=Math.min(n*p,Math.max(i,n*32)),u=a?Math.min(Math.max(e*.8,c+56),e-24):c+56;return{buttonWidth:p,labelled:l,openWidth:c,commitPoint:u}}var Nl=.22,Ll=.18,Am=.8,Bn=.9,Em=400,Dm=80,Cm=10,Im=5,Nm=4,Lm=3,Pm=.5,Om=6,Mm=["left","right"],Pl={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function _m(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function zm(e,t){let r={today:o.createElement(nr,null),tomorrow:o.createElement(nr,null),weekend:o.createElement(bn,null),pick:o.createElement(st,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var br=null;function Ol(e){if(br===e)return;let t=br;br=e,t?.close()}function Ml(e){br===e&&(br=null)}var So;function _l(e,t){if(So===void 0)try{So=document.createElement("canvas").getContext("2d")}catch{So=null}return So?(So.font=t,So.measureText(e).width):e.length*7}var Fm=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,hr=e=>e>0?"left":e<0?"right":null,zl=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),c=o.useRef(null),u=o.useRef(null),g=o.useRef([]),h=o.useRef(!1),m=o.useRef(null),x=o.useRef(null),k=o.useRef({velocity:0,target:0,response:Nl,damping:Bn}),F=o.useRef({left:"",right:""}),M=o.useMemo(()=>zm(Kn(e.dueDate??"",he(new Date)),r),[e.dueDate,r]),z=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Pe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(Id,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(ht,null),run:()=>r.remove()}],[r,e.flagged]),v={left:M,right:z},[y,P]=o.useState(()=>({rowWidth:0,left:Pl,right:Pl})),Z=o.useRef(y);Z.current=y;let R=()=>{let T=i.current?.querySelector(".todo-swipe-action");if(!T||typeof getComputedStyle!="function")return"13px sans-serif";let L=getComputedStyle(T);return`${L.fontWeight} ${L.fontSize} ${L.fontFamily}`},K=()=>{let T=i.current?.clientWidth??0,L=R(),j=Z.current,b={rowWidth:T,left:ki(T,M.map(Y=>_l(Y.label,L)),j.left.labelled),right:ki(T,z.map(Y=>_l(Y.label,L)),j.right.labelled)};Z.current=b;let I=Y=>j[Y].openWidth!==b[Y].openWidth||j[Y].labelled!==b[Y].labelled;return(j.rowWidth!==T||I("left")||I("right"))&&P(b),b},U=o.useRef(K);U.current=K,o.useEffect(()=>{U.current()},[M,z]);let se=T=>{let L=hr(T);return!L||L!==u.current?!1:Math.abs(T)>=Z.current[L].commitPoint},D=(T,L=!1)=>{p.current=T,L&&T!==0?Ol(w.current):T===0&&Ml(w.current);let j=i.current,b=s.current;if(!j||!b)return;b.style.transform=T?`translate3d(${T}px, 0, 0)`:"";let I=hr(T),Y=Z.current,ue=se(T);j.classList.toggle("open",T!==0),j.classList.toggle("committed",ue);for(let V of Mm){let B=l.current[V];if(!B)continue;let de=I===V;B.classList.toggle("committed",de&&ue);let be=de?ue?"100%":`${Math.max(Y[V].openWidth,Math.abs(T))}px`:`${T===0?Y[V].openWidth:0}px`,Me=`${be}|${de}`;F.current[V]!==Me&&(F.current[V]=Me,B.style.width=be,B.setAttribute("aria-hidden",String(!de)))}};o.useLayoutEffect(()=>D(p.current));let G=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},W=(T,L,j,b)=>{if(G(),T!==0&&Ol(w.current),p.current===T||Fm()||typeof requestAnimationFrame!="function"){D(T);return}k.current={velocity:L,target:T,response:j,damping:b};let I=0,Y=ue=>{let V=I?(ue-I)/1e3:.016666666666666666;I=ue;let B=k.current,de=Il(p.current,B.velocity,B.target,V,B.response,B.damping);B.velocity=de.velocity,D(de.value),m.current=de.done?null:requestAnimationFrame(Y)};m.current=requestAnimationFrame(Y)},E=o.useRef(()=>{});E.current=()=>{c.current=null,W(0,0,Ll,Bn)};let $=o.useCallback(()=>E.current(),[]),w=o.useRef({close:()=>E.current()}),S=()=>{G(),c.current=null,x.current!=null&&window.clearTimeout(x.current),x.current=null,D(0)},N=o.useRef(S);N.current=S;let _=T=>{let L=Z.current,j=hr(T);if(!j)return 0;let b=c.current?.origin;if(b&&j!==b)return 0;let I=L[j],Y=j===u.current?I.commitPoint:I.openWidth;return Dl(T,Y,L.rowWidth)},le=(T,L,j,b,I)=>{G(),K();let Y=p.current,ue=hr(Y),V=Math.abs(Y)>8?ue:null;u.current=ue&&Math.abs(Y)>=Z.current[ue].openWidth-1?ue:null,c.current=_m(T,L,j,b,Y,V),g.current=[{x:Y,t:I}]},ce=(T,L)=>{let j=c.current;!j||j.ended||(j.live||(j.live=!0,G(),n?.()),g.current.push({x:T,t:L}),g.current.length>Om&&g.current.shift(),D(_(T),!0),se(p.current)&&(j.crossed=!0))},te=T=>{let L=c.current;if(!L||L.ended)return;if(L.ended=!0,!L.live){c.current=null;return}let j=()=>{L.kind==="pointer"&&(c.current=null)},b=El(g.current),I=p.current,Y=hr(I);if(!Y){j(),D(0);return}let ue=Z.current[Y],V=T&&se(I),B=Cl({offset:I,velocity:b,openWidth:ue.openWidth,committed:V});if(j(),B.commit){let de=Y==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",be=i.current?.querySelector(de),Me=v[Y],rt=Y==="left"?Me[0]:Me[Me.length-1];W(0,b,Ll,Bn),rt?.run(be??i.current);return}W(B.target,b,Nl,Math.abs(b)>Em?Am:Bn)};o.useEffect(()=>$(),[e.dueDate,e.flagged,$]),o.useEffect(()=>{let T=w.current;return()=>{G(),x.current!=null&&window.clearTimeout(x.current),Ml(T)}},[]),o.useEffect(()=>{let T=i.current,L=T?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!T||!L)return;let j=0,b=new L(()=>{let I=T.clientWidth,Y=j!==I;j=I,U.current(),Y&&p.current!==0&&N.current()});return b.observe(T),()=>b.disconnect()},[]);let oe=o.useRef({disabled:t,begin:le,move:ce,end:te});oe.current={disabled:t,begin:le,move:ce,end:te},o.useEffect(()=>{let T=i.current;if(!T)return;let L=()=>{x.current!=null&&window.clearTimeout(x.current),x.current=null},j=()=>{x.current=null,c.current?.kind==="wheel"&&(oe.current.end(!0),c.current=null)},b=I=>{let Y=oe.current;if(Y.disabled||Math.abs(I.deltaX)<=Math.abs(I.deltaY)||I.deltaX===0)return;I.preventDefault();let ue=I.deltaMode===WheelEvent.DOM_DELTA_LINE?16:I.deltaMode===WheelEvent.DOM_DELTA_PAGE?T.clientWidth:1,V=-I.deltaX*ue,B=c.current;(!B||B.kind!=="wheel")&&(Y.begin("wheel",-1,0,0,I.timeStamp),B=c.current),L(),x.current=window.setTimeout(j,Dm);let de=Math.abs(V),be=B.previous;B.previous=de;let Me=B.live&&(B.ended||B.origin!==null&&p.current===0),rt=de>=be+Im,Qe=B.distance!==0&&Math.sign(V)!==Math.sign(B.distance)&&de>=Nm;if(Me&&(rt||Qe)&&(Y.end(!1),Y.begin("wheel",-1,0,0,I.timeStamp),B=c.current,B.previous=de),B.ended)return;if(B.decay=de<be?B.decay+1:0,B.peak=Math.max(B.peak,de),B.distance+=V,B.live&&B.peak>=Cm&&B.decay>=Lm&&de<B.peak*Pm){Y.end(B.crossed);return}!B.live&&Math.abs(B.distance)<8||Y.move(B.base+B.distance,I.timeStamp)};return T.addEventListener("wheel",b,{passive:!1}),()=>{T.removeEventListener("wheel",b),L()}},[]);let ne=(T,L)=>o.createElement("div",{ref:j=>{l.current[T]=j},className:`todo-swipe-tray todo-swipe-tray-${T} ${y[T].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${y[T].openWidth}px`}},L.map(j=>o.createElement("button",{key:j.key,type:"button",className:j.cls,tabIndex:-1,title:j.label,"aria-label":j.label,onClick:b=>{b.stopPropagation(),$(),j.run(b.currentTarget)}},j.icon,o.createElement("span",null,j.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:T=>{t||T.pointerType==="mouse"&&T.button!==0||T.target.closest(".todo-swipe-tray")||le("pointer",T.pointerId,T.clientX,T.clientY,T.timeStamp)},onPointerMove:T=>{let L=c.current;if(!L||L.kind!=="pointer"||L.pointerId!==T.pointerId)return;let j=T.clientX-L.originX,b=T.clientY-L.originY;if(!L.live){if(Math.abs(b)>Math.abs(j)){T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),c.current=null;return}if(Math.abs(j)<8)return;h.current=!0,T.currentTarget.setPointerCapture?.(T.pointerId)}T.preventDefault(),ce(L.base+j,T.timeStamp)},onPointerUp:T=>{let L=c.current;!L||L.kind!=="pointer"||L.pointerId!==T.pointerId||(T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),L.live&&ce(L.base+(T.clientX-L.originX),T.timeStamp),te(!0))},onPointerCancel:T=>{let L=c.current;!L||L.kind!=="pointer"||L.pointerId!==T.pointerId||(T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),$())},onClickCapture:T=>{let L=!!T.target.closest(".todo-swipe-tray");if(L&&(h.current=!1),h.current&&!L){h.current=!1,T.stopPropagation(),T.preventDefault();return}p.current&&!L&&(T.stopPropagation(),T.preventDefault(),$())}},M.length>0&&ne("left",M),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),z.length>0&&ne("right",z))};function yr(e,t,r){let n=Fe(t);f.ui.openMenu(fo().map(a=>({label:a.label,icon:o.createElement(Le,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ne(a.status))})),{anchor:e})}function Gm({status:e,style:t}){let r=Se(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},et(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(Le,{status:e==="open"?null:e,dotCls:r.cls}),et(e))}function Fl({status:e}){return o.createElement(Gm,{status:e,style:Ps()})}var Rm=2;function Si(e,t){let r=Fe(e),n=t.pendingIds.has(e.id),a=o.useRef(null),i=o.useRef(null),s=o.useRef(!1),l=o.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return o.useEffect(()=>l,[l]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:a,className:"todo-check","data-status":r,type:"checkbox",checked:r==="completed","aria-disabled":n||void 0,onPointerDown:()=>{n||(s.current=!1,l(),i.current=window.setTimeout(()=>{s.current=!0;let c=a.current;c&&f.ui.openMenu(fo().map(u=>({label:u.label,icon:o.createElement(Le,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?r==="open":u.status===r,enabled:!n,onSelect:()=>t.patchTodo(e.id,Ne(u.status))})),{anchor:c})},450))},onPointerUp:l,onPointerLeave:l,onClick:c=>{s.current&&c.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:c=>{if(s.current){s.current=!1;return}t.patchTodo(e.id,Ne(c.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),r!=="open"&&r!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(Le,{status:r,dotCls:Se(r).cls}))),cancelHold:l}}var Gl=({todo:e,groups:t,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let s=o.useRef(null);o.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[l,p]=o.useState("");o.useEffect(()=>{let w=!0;return p(""),jn(e.title).then(S=>{w&&p(S)}).catch(()=>{w&&p("")}),()=>{w=!1}},[e.title]);let c=(w,S)=>f.workspace.openFile(w,void 0,{newTab:S}),u=Be.find(w=>w.id===e.priority)??Be[0],g=ve(t),h=Fe(e),m=[e.filePath,...e.attachments??[]].filter(w=>!!w),[x,k]=o.useState(!1),F=x?m:m.slice(0,Rm),M=m.length-F.length,z=e.urls?.length??0,v=r&&m.length>0,y=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||z>0||v||e.status&&e.status!=="open"&&!Se(e.status).done||e.priority!=="normal"),P=n.pendingIds.has(e.id),Z=he(new Date),R=e.dueDate&&!a?at(e.dueDate,Z,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",K=e.dueDate?$e(e.dueDate,f.getState().dateFormat):"",U=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<Z,se=o.useRef(null);o.useEffect(()=>se.current?Mr(e.id,se.current):void 0,[e.id]);let{check:D,cancelHold:G}=Si(e,n),W=()=>{sl(e)||n.openDetail(e.id)},E=w=>n.patchTodo(e.id,w),$=o.useMemo(()=>({reschedule:w=>{n.patchTodo(e.id,{dueDate:w})},pickDate:w=>{f.ui.openPopover(S=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(to,{value:e.dueDate?.slice(0,10)??"",onChange:N=>{n.patchTodo(e.id,{dueDate:N}),S.close()}})),{anchor:w},{ariaLabel:d("todo.swipe.date")})},setStatus:w=>yr(w,e,E),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{pt(e,n.removeTodo)}}),[e,n]);return o.createElement(zl,{todo:e,disabled:P,actions:$,onEngage:G},o.createElement("article",{ref:se,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,"data-status":h,tabIndex:0,onContextMenu:w=>Un(w,{todo:e,groupNames:g,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:E,onRequestDelete:()=>pt(e,n.removeTodo),disabled:P}),onKeyDown:w=>{if(w.target===w.currentTarget){if(w.key==="ArrowDown"||w.key==="ArrowUp"){w.preventDefault(),i?.(w.key==="ArrowDown"?1:-1);return}if(w.key==="Escape"){w.currentTarget.blur();return}w.key==="Enter"&&(w.preventDefault(),n.openDetail(e.id))}},onClick:w=>{w.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||w.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,W()},220))},onDoubleClick:w=>{s.current&&(clearTimeout(s.current),s.current=null),!w.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},D,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,u.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},u.symbol," "),l?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:l}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},e.note),(y||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:we(Te(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Se(e.status).done&&o.createElement(Fl,{status:e.status}),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Yt,null)),Es(e.priority)),R&&o.createElement("button",{className:`todo-date${U?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:K||R}),onClick:w=>{w.stopPropagation(),W()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(st,null)),o.createElement("span",{className:"todo-date-day"},R),K&&K!==R&&o.createElement("span",{className:"todo-date-full"},K)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(zd,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:w=>{w.stopPropagation(),ar(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ot,null)),e.location.name),v&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Lt,null)),m.length),z>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(Xt,null),z>1&&z),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(_d,null),e.remindAt.slice(11,16)),!r&&e.tags?.slice(0,3).map(w=>o.createElement("span",{key:w,className:"todo-tag-text"},"#",w)),!r&&(e.tags?.length??0)>3&&o.createElement("span",{className:"todo-tag-more",title:e.tags.slice(3).map(w=>`#${w}`).join(" ")},"+",e.tags.length-3))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(Pe,null)),o.createElement(Vn,{todo:e,groupNames:g,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:E,onRequestDelete:()=>pt(e,n.removeTodo),disabled:P})),!r&&m.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},F.map(w=>o.createElement("button",{key:w,className:"todo-file-card",title:w,onClick:S=>{S.stopPropagation(),c(w,f.ui.hasModKey(S))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},w===e.filePath?o.createElement(bt,null):o.createElement(Lt,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},wl(w)),o.createElement("span",{className:"todo-file-card-kind"},vi(w))))),(M>0||x)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${x?" open":""}`,title:x?d("todo.fewerFiles"):d("todo.moreFiles",{p0:M}),"aria-expanded":x,onClick:w=>{w.stopPropagation(),k(S=>!S)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(cn,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},x?d("todo.fewerFiles"):d("todo.moreFiles",{p0:M})))))))};function Hn({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=o.useRef(null),s=l=>{let p=l.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),c=[...e];for(let u of p)c.some(g=>g.toLowerCase()===u.toLowerCase())||c.push(u);return c.length===e.length?!1:(t(c),!0)};return o.useEffect(()=>{r&&i.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:l=>{l.target===l.currentTarget&&(l.preventDefault(),i.current?.focus())}},e.map(l=>o.createElement("span",{key:l,className:"todo-tags-chip"},o.createElement("span",null,"#",l),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:l}),title:d("todo.compose.removeTag",{tag:l}),onClick:()=>{t(e.filter(p=>p!==l)),i.current?.focus()}},o.createElement(Ae,null)))),o.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:l=>{let p=l.currentTarget;l.nativeEvent.isComposing||(l.key==="Enter"||l.key===","||l.key===" "&&p.value.trim()?(l.preventDefault(),s(p.value)&&(p.value="")):l.key==="Backspace"&&!p.value&&e.length&&(l.preventDefault(),t(e.slice(0,-1))))},onBlur:l=>{s(l.currentTarget.value)&&(l.currentTarget.value="")},onPaste:l=>{let p=l.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(l.preventDefault(),s(l.currentTarget.value+p),l.currentTarget.value="")}}))}function $m(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function Wn(e,t,r){let n=$m(e,t);return r?n:n.filter(a=>!co(a))}function Ai(){let[e,t]=wt(),[r]=vt(),a=ut().map(u=>u.id),i=Wn(e,a,r),s=a.filter(u=>!co(u)),l=a.filter(u=>co(u)),p=u=>u.length===i.length&&u.every(g=>i.includes(g)),c=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:i.length===a.length,select:()=>{Jt(!0),t("all")}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:p(s),select:()=>{Jt(!1),t(s)}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:p(l),select:()=>{Jt(!0),t(l)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},c.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Rl(){let[e,t]=wt(),[r]=vt(),n=ut(),a=n.map(l=>l.id),i=Wn(e,a,r),s=l=>{let p=i.includes(l)?i.filter(c=>c!==l):a.filter(c=>i.includes(c)||c===l);p.length&&(Jt(p.some(c=>co(c))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(Ai,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=i.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>s(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Le,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,l.label))}))}var Kl=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],jm=["title","due","priority","group","note"],Ei=[10,20,30,40,50,100,200,500],Eo=Be.map(e=>e.id).reverse(),Ul=Kl.map(e=>e.id),Ao={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function oo(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var ro=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Km(e){let[t,r]=o.useState({due:Ao.due,priority:Ao.priority,flagged:Ao.flagged,mins:{...Yn}}),n=f.getState().dateFormat,a=f.ui.language();return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let s=he(new Date),l={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},p=[l.today,l.tomorrow,l.yesterday,...Array.from({length:12},(k,F)=>at(`2030-${String(F+1).padStart(2,"0")}-28`,s,l,a,n))],c=Math.max(...p.map(k=>oo(i,"todo-table-cell-btn is-overdue",`<span>${ro(k)}</span><span class="todo-table-time">23:59</span>`)),oo(i,"todo-table-sort active",`<span>${ro(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...Eo.map(k=>oo(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${ro(qe(k))}</span>`)),oo(i,"todo-table-sort active",`<span>${ro(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=oo(i,"todo-table-sort active",`<span>${ro(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),h=k=>oo(i,"todo-table-sort active",`<span>${ro(d(k))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(Ci.map(k=>[k,Math.max(Yn[k],h(k==="title"?"todo.table.title":Di[k]))])),x={due:Math.max(c+10,96),priority:Math.max(u+10,72),flagged:Math.max(g+10,48),mins:m};r(k=>JSON.stringify(k)===JSON.stringify(x)?k:x)},[e,n,a]),t}var Um=360;function Vm(e,t){let[r,n]=o.useState(Ao.tags),a=[...new Set(t.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],i=a.join("\0");return o.useLayoutEffect(()=>{let s=e.current;if(!s)return;let l=Math.max(0,...a.map(p=>oo(s,"",p.split(`
`).map(c=>`<span class="todo-table-tag">#${ro(c)}</span>`).join(""))));n(Math.min(Um,Math.max(Ao.tags,l+12)))},[e,i]),r}var Bm=240,Hm=82,Di=Object.fromEntries(Kl.map(e=>[e.id,e.labelKey]));function Wm(e){if(!Array.isArray(e))return jm;let t=[...new Set(e)].filter(r=>r==="title"||Ul.includes(r));return t.includes("title")?t:["title",...t]}function qm(e){return Array.isArray(e)?Eo.filter(t=>e.includes(t)):[]}function Ym(e){return Ei.includes(e)?e:Ei[0]}function qn(e,t){let[r,n]=o.useState(()=>t(f.settings.get()[e]));o.useEffect(()=>f.settings.subscribe(()=>n(t(f.settings.get()[e]))),[e,t]);let a=o.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var Vl=()=>qn("pageColumns",Wm),Bl=e=>e==="title"?"todo.table.title":Di[e],Xn=()=>qn("pagePriorityFilter",qm),Mt=({priority:e})=>o.createElement(e==="high"?Ja:e==="medium"?Rd:e==="low"?Qa:Ud,{className:`todo-table-priority-icon todo-priority-${e}`});function Xm({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function Zm(){let[e]=wt(),[t]=vt(),n=ut().map(l=>l.id),a=Wn(e,n,t),i=e!=="all"&&a.length!==n.length,s=d("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":s,title:s,onClick:l=>{f.ui.openPopover(()=>o.createElement(Rl,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},o.createElement(Ze,null))}function Jm(){let[e,t]=Xn();return o.createElement("div",{className:"todo-status-filter-menu"},Eo.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):Eo.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Mt,{priority:r})),o.createElement("span",null,qe(r)))}))}function Hl(){let[e]=Xn();return o.createElement(Xm,{label:d("todo.table.priority"),active:e.length>0,icon:o.createElement(Yt,null),onOpen:t=>{f.ui.openPopover(()=>o.createElement(Jm,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function Qm(){let[e,t]=Vl(),r=[...e,...Ul.filter(p=>!e.includes(p))],[n,a]=o.useState(null),[i,s]=o.useState(null),l=(p,c,u)=>{if(p===c)return;let g=r.filter(h=>h!==p);g.splice(g.indexOf(c)+(u?1:0),0,p),t(g.filter(h=>e.includes(h)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),s(null)}},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,c)=>{let u=e.includes(p),g=p==="title",h=d(Bl(p));return o.createElement("div",{key:p,className:`todo-column-option${g?" is-locked":""}${n===p?" is-dragging":""}${i?.id===p?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let x=m.currentTarget.getBoundingClientRect();s({id:p,after:m.clientY>x.top+x.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&l(n,i.id,i.after),a(null),s(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:h}),title:d("todo.table.reorderColumn",{p0:h}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",p);let x=m.currentTarget.parentElement;x&&m.dataTransfer.setDragImage(x,12,x.offsetHeight/2),a(p)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let x=r[c+(m.key==="ArrowUp"?-1:1)];x&&l(p,x,m.key==="ArrowDown")}},o.createElement(Qo,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:g,onClick:()=>t(r.filter(m=>m===p?!u:e.includes(m)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,h)))}))}function Wl(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>o.createElement(Qm,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},o.createElement(Kd,null))}function $l({field:e,label:t,className:r,sort:n,onSort:a,width:i,resize:s,thProps:l}){let p=n.field===e,c=p?n.dir==="asc"?Ja:Qa:Za;return o.createElement("th",{...l,className:r,style:i===void 0?void 0:{width:i},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>a(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(c,null)),s)}var Ci=["title","note","group","location","tags"],Yn={title:180,note:120,group:104,location:104,tags:96},ql=900;function ef(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of Ci){let a=t[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(ql,Math.max(Yn[n],a))))}return r}function tf({id:e,label:t,min:r,onDrag:n,onCommit:a,onReset:i}){let s=o.useRef(null),l=p=>Math.round(Math.min(ql,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:t}),title:d("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),i(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let c=p.currentTarget.parentElement,u=c?c.getBoundingClientRect().width:Yn[e];s.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!s.current)return;let c=l(s.current.startWidth+p.clientX-s.current.startX);s.current.width=c,n(e,c)},onPointerUp:p=>{s.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),a(e,s.current.width),s.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),s.current=null}})}function of({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(to,{value:r,onChange:s=>{n(s),s||i(""),t(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(gr,{value:a,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{i(s),t({startTime:s||void 0})}}))}function rf({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function nf({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Hn,{value:r,autoFocus:!0,onChange:a=>{n(a),t({tags:a})}}))}function af({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}var jl='input, button, a, textarea, [contenteditable="true"]';function Ii(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}function sf({todo:e,groups:t,columns:r,c:n,selected:a,onPick:i}){let s=o.useRef(null);o.useEffect(()=>s.current?Mr(e.id,s.current):void 0,[e.id]);let[l,p]=o.useState("");o.useEffect(()=>{let w=!0;return p(""),jn(e.title).then(S=>{w&&p(S)}).catch(()=>{w&&p("")}),()=>{w=!1}},[e.title]);let c=Ii(e.note),{check:u}=Si(e,n),g=Fe(e),h=n.pendingIds.has(e.id),m=w=>n.patchTodo(e.id,w),x=he(new Date),k=f.getState().dateFormat,F=e.dueDate?at(e.dueDate,x,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),k):"",M=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<x,[z,v]=o.useState(!1),y=o.useRef(null);o.useEffect(()=>()=>{y.current&&clearTimeout(y.current)},[]);let[P,Z]=o.useState(e.title),R=()=>{let w=P.trim();v(!1),w&&w!==e.title&&m({title:w})},[K,U]=o.useState(null),se=(w,S)=>{U(w),S.catch(()=>{}).finally(()=>U(N=>N===w?null:N))},D=(w,S,N,_,le=260)=>{se(w,f.ui.openPopover(_,{anchor:S,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:N,width:le}))},G=(w,S,N)=>K===w?o.createElement("span",{className:"todo-table-placeholder"},S,o.createElement("span",null,N)):null,W=w=>`todo-table-${w}${K===w?" is-editing":""}`,E=w=>{let S=e.note,N=()=>{S!==e.note&&m({note:S})};U("note"),f.ui.openPopover(({close:_})=>o.createElement(rf,{initial:e.note,onInput:le=>{S=le},onDone:()=>{N(),_()}}),{anchor:w,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(N(),!0)}).catch(()=>{}).finally(()=>U(_=>_==="note"?null:_))},$=w=>{switch(w){case"note":return o.createElement("td",{className:W("note"),title:c||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:S=>E(S.currentTarget)},c?o.createElement("span",{className:"todo-table-note-text"},c):G("note",null,d("todo.table.note"))));case"group":return o.createElement("td",{className:W("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:S=>se("group",f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>m({group:void 0})},...ve(t).map(N=>({label:N,type:"radio",checked:e.group===N,color:Te(N,t),onSelect:()=>m({group:N})}))],{anchor:S.currentTarget,align:"start"}))},e.group?o.createElement("span",{className:"todo-table-group-pill",title:e.group,style:{"--todo-group-color":we(Te(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},e.group)):G("group",null,d("todo.table.group"))));case"priority":return o.createElement("td",{className:W("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:h,title:d("todo.table.priority"),onClick:S=>se("priority",f.ui.openMenu(Eo.map(N=>({label:qe(N),icon:o.createElement(Mt,{priority:N}),type:"radio",checked:e.priority===N,onSelect:()=>m({priority:N})})),{anchor:S.currentTarget}))},o.createElement(Mt,{priority:e.priority}),o.createElement("span",null,qe(e.priority))));case"due":return o.createElement("td",{className:W("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${M?" is-overdue":""}`,disabled:h,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:e.dueDate?$e(e.dueDate,k):d("todo.field.dueDate"),onClick:S=>D("due",S.currentTarget,d("todo.field.dueDate"),()=>o.createElement(of,{todo:e,onPatch:N=>{m(N)}}),240)},o.createElement("span",null,F),e.startTime&&o.createElement("span",{className:"todo-table-time"},e.startTime)));case"flagged":return o.createElement("td",{className:W("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${e.flagged?" on":""}`,"aria-pressed":!!e.flagged,disabled:h,"aria-label":d("todo.flag"),title:d(e.flagged?"todo.flagged":"todo.flag"),onClick:()=>m({flagged:!e.flagged})},o.createElement(Pe,null)));case"location":return o.createElement("td",{className:W("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:h,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:e.location?.name??d("todo.field.location"),onClick:S=>D("location",S.currentTarget,d("todo.field.location"),()=>o.createElement(af,{todo:e,onPatch:N=>{m(N)}}),300)},e.location?o.createElement(o.Fragment,null,o.createElement(ot,null),o.createElement("span",null,e.location.name)):G("location",o.createElement(ot,null),d("todo.field.location"))));case"tags":return o.createElement("td",{className:W("tags"),title:e.tags?.map(S=>`#${S}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:S=>D("tags",S.currentTarget,d("todo.edit.tags"),()=>o.createElement(nf,{todo:e,onPatch:N=>{m(N)}}),280)},e.tags?.length?e.tags.map(S=>o.createElement("span",{key:S,className:"todo-table-tag"},"#",S)):G("tags",null,d("todo.table.tags"))))}};return o.createElement("tr",{ref:s,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}${K?" is-editing":""}`,"data-todo-id":e.id,"data-status":g,"aria-selected":a,tabIndex:0,onContextMenu:w=>Un(w,{todo:e,groupNames:ve(t),setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>pt(e,n.removeTodo),disabled:h}),onKeyDown:w=>{if(w.target===w.currentTarget)if(w.key==="ArrowDown"||w.key==="ArrowUp"){w.preventDefault();let S=w.key==="ArrowDown"?w.currentTarget.nextElementSibling:w.currentTarget.previousElementSibling;for(;S&&!S.classList.contains("todo-table-row");)S=w.key==="ArrowDown"?S.nextElementSibling:S.previousElementSibling;S?.focus()}else w.key==="Enter"?(w.preventDefault(),n.openDetail(e.id)):w.key===" "?(w.preventDefault(),i(!1)):w.key==="Escape"&&w.currentTarget.blur()},onClick:w=>{w.target.closest(jl)||(f.ui.hasModKey(w)||w.shiftKey)&&i(w.shiftKey)},onDoubleClick:w=>{let S=!!w.target.closest(".todo-table-title-btn");S&&y.current&&(clearTimeout(y.current),y.current=null),!(!S&&w.target.closest(jl)||f.ui.hasModKey(w)||w.shiftKey)&&n.openDetail(e.id)}},o.createElement("td",{className:"todo-table-select"},u),r.map(w=>o.createElement(o.Fragment,{key:w},w==="title"?o.createElement("td",{className:"todo-table-title"},z?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:P,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:S=>Z(S.target.value),onBlur:R,onKeyDown:S=>{S.nativeEvent.isComposing||(S.key==="Enter"?(S.preventDefault(),R()):S.key==="Escape"&&(S.preventDefault(),Z(e.title),v(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:h,"aria-label":d("todo.table.editTitle",{p0:e.title}),onClick:S=>{if(f.ui.hasModKey(S)||S.shiftKey){i(S.shiftKey);return}S.detail>1||(y.current&&clearTimeout(y.current),y.current=setTimeout(()=>{y.current=null,Z(e.title),v(!0)},220))}},l?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:l}}):o.createElement("span",{className:"todo-table-title-text"},e.title))):$(w))),o.createElement("td",{className:"todo-table-actions"},e.flagged&&!r.includes("flagged")&&o.createElement("span",{className:"todo-table-flag",title:d("todo.flagged")},o.createElement(Pe,null)),o.createElement(Vn,{todo:e,groupNames:ve(t),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>pt(e,n.removeTodo),disabled:h})))}function df(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Yl({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:s,sectionOf:l,composeSignal:p=0,newTaskPatch:c}){let[u,g]=Vl(),h=u.filter(A=>A!=="title"),[m,x]=o.useState(null),[k,F]=o.useState(null),M=A=>({className:`${m===A?" is-dragging":""}${k?.id===A?k.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:O=>{if(O.target.closest(".todo-col-resize")){O.preventDefault();return}O.dataTransfer.effectAllowed="move",O.dataTransfer.setData("text/plain",A);let H=O.currentTarget.ownerDocument,J=H.createElement("div");J.className="todo-col-drag-chip",J.textContent=d(Bl(A)),H.body.appendChild(J),O.dataTransfer.setDragImage?.(J,Math.round(J.offsetWidth/2),Math.round(J.offsetHeight/2)),window.setTimeout(()=>J.remove(),0),x(A)},onDragOver:O=>{if(!m||m===A)return;O.preventDefault(),O.dataTransfer.dropEffect="move";let H=O.currentTarget.getBoundingClientRect();F({id:A,after:O.clientX>H.left+H.width/2})},onDrop:O=>{if(O.preventDefault(),m&&k&&m!==k.id){let H=u.filter(J=>J!==m);H.splice(H.indexOf(k.id)+(k.after?1:0),0,m),g(H)}x(null),F(null)},onDragEnd:()=>{x(null),F(null)}}}),z=o.useRef(null),v=Km(z),[y,P]=qn("pageColumnWidths",ef),[Z,R]=o.useState({}),K=Vm(z,e),U=Object.fromEntries(Object.entries({tags:K,...y,...Z}).map(([A,O])=>[A,Math.max(O,v.mins[A])])),se=A=>A==="due"?v.due:A==="priority"?v.priority:A==="flagged"?v.flagged:U[A]??Ao[A],[D,G]=qn("pageRowsPerPage",Ym),[W,E]=o.useState(!1),[$,w]=o.useState(""),[S,N]=o.useState({}),_=o.useRef(null),le=o.useRef(null),ce=o.useRef(!1),[te,oe]=o.useState(!0),ne=o.useRef(null);o.useEffect(()=>{p&&(E(!0),V(0),ne.current?.scrollTo?.({top:0}),window.setTimeout(()=>_.current?.focus(),0))},[p]);let T=async A=>{let O=he(new Date);for(let H of A){let J=rn(H,O);if(!J.title)continue;let ye=J.dueDate||S.dueDate;await r.create(J.title,void 0,{patch:{...c?.(),priority:J.priority!=="normal"?J.priority:S.priority??J.priority,...ye?{dueDate:ye}:{},...S.group?{group:S.group}:{},...S.flagged?{flagged:!0}:{}}})}w(""),_.current?.focus()},L=()=>{w(""),N({}),oe(!0),E(!1)},j=!$.trim()&&!S.dueDate&&!S.priority&&!S.group&&!S.flagged,b=()=>{window.setTimeout(()=>{ce.current||!document.hasFocus()||le.current?.contains(document.activeElement)||(j?L():oe(!1))},0)},I=A=>{ce.current=!0,A.catch(()=>{}).finally(()=>{ce.current=!1,_.current?.focus()})},Y=A=>{switch(A){case"due":{let O=S.dueDate,H=O?at(O,he(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"";return o.createElement("td",{key:A,className:"todo-table-due"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:J=>I(f.ui.openPopover(({close:ye})=>o.createElement("div",{className:"todo-cell-editor"},o.createElement(to,{value:O??"",onChange:No=>{N(Sr=>({...Sr,dueDate:No||void 0})),ye()}})),{anchor:J.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},H?o.createElement("span",null,H):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let O=S.priority??"normal";return o.createElement("td",{key:A,className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${O==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:H=>I(f.ui.openMenu(Eo.map(J=>({label:qe(J),icon:o.createElement(Mt,{priority:J}),type:"radio",checked:O===J,onSelect:()=>N(ye=>({...ye,priority:J}))})),{anchor:H.currentTarget}))},o.createElement(Mt,{priority:O}),o.createElement("span",null,qe(O))))}case"group":return o.createElement("td",{key:A,className:"todo-table-group"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:O=>I(f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!S.group,onSelect:()=>N(H=>({...H,group:void 0}))},...ve(t).map(H=>({label:H,type:"radio",checked:S.group===H,color:Te(H,t),onSelect:()=>N(J=>({...J,group:H}))}))],{anchor:O.currentTarget,align:"start"}))},S.group?o.createElement("span",{className:"todo-table-group-pill",title:S.group,style:{"--todo-group-color":we(Te(S.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},S.group)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return o.createElement("td",{key:A,className:"todo-table-flagged"},o.createElement("button",{type:"button",className:`todo-table-flag-btn${S.flagged?" on":""}`,"aria-pressed":!!S.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>N(O=>({...O,flagged:!O.flagged||void 0}))},o.createElement(Pe,null)));default:return o.createElement("td",{key:A,className:`todo-table-${A}`})}},[ue,V]=o.useState(0),[B,de]=o.useState(i);B!==i&&(de(i),V(0));let[be,Me]=o.useState(()=>new Set),rt=o.useRef(null),Qe=Math.max(1,Math.ceil(e.length/D)),He=Math.min(ue,Qe-1),lt=e.slice(He*D,(He+1)*D),We=o.useMemo(()=>e.filter(A=>be.has(A.id)),[e,be]),wr=o.useMemo(()=>e.reduce((A,O)=>A+(O.completed?1:0),0),[e]),kt=ze(),no=o.useSyncExternalStore(kt.subscribe,kt.get,kt.get),Co=o.useCallback(A=>{let O=e.findIndex(H=>H.id===A);O>=0&&V(Math.floor(O/D))},[e,D]);o.useLayoutEffect(()=>{no?.todoId&&Co(no.todoId)},[no,Co]),o.useLayoutEffect(()=>{r.editingId&&Co(r.editingId)},[r.editingId]);let vr=(A,O)=>{Me(H=>{let J=new Set(H);for(let ye of A)O?J.add(ye):J.delete(ye);return J})},ta=(A,O)=>{let H=lt.findIndex(ye=>ye.id===A),J=O?lt.findIndex(ye=>ye.id===rt.current):-1;J>=0?vr(lt.slice(Math.min(J,H),Math.max(J,H)+1).map(ye=>ye.id),!0):vr([A],!be.has(A)),rt.current=A},Io=()=>{for(let A of We)r.patchTodo(A.id,Ne("completed"));Me(new Set)},_i=async()=>{let A=We.map(H=>H.id);await f.ui.confirm({title:d("todo.table.deleteTitle",{count:A.length}),message:d("todo.table.deleteMessage",{count:A.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(A.map(H=>r.removeTodo(H))),Me(new Set))},xr=(A,O)=>o.createElement(tf,{id:A,label:O,min:v.mins[A],onDrag:(H,J)=>R(ye=>({...ye,[H]:J})),onCommit:(H,J)=>{R({}),P({...y,[H]:J})},onReset:H=>{R({});let J={...y};delete J[H],P(J)}}),kr=A=>{let O=d(Di[A]),H=Ci.includes(A);return o.createElement($l,{field:A==="note"?"notes":A,label:O,className:`todo-table-${A}${M(A).className}`,thProps:M(A).props,sort:n,onSort:a,width:H?U[A]:void 0,resize:H?xr(A,O):void 0})},oa=3+h.length,Tr=o.useMemo(()=>{if(!l)return null;let A=new Map;for(let O of e){let H=l(O);A.set(H,(A.get(H)??0)+1)}return A},[e,l]),C=[],q=null;for(let A of lt){let O=l?.(A)??null;O&&O!==q&&C.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${O}`,key:`section:${O}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},d(cd[O])),o.createElement("span",{className:"todo-table-section-count"},Tr?.get(O)??0))),u.map(H=>o.createElement("td",{key:H,className:`todo-table-${H}`})),o.createElement("td",{className:"todo-table-actions"}))),q=O,C.push(o.createElement(sf,{key:A.id,todo:A,groups:t,columns:u,c:r,selected:be.has(A.id),onPick:H=>ta(A.id,H)}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:ne},o.createElement("table",{ref:z,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:Hm+(U.title??Bm)+h.reduce((A,O)=>A+se(O),0),"--todo-due-width":`${v.due}px`,"--todo-priority-width":`${v.priority}px`,"--todo-flagged-width":`${v.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(Zm,null)),u.map(A=>o.createElement(o.Fragment,{key:A},A==="title"?o.createElement($l,{field:"name",label:d("todo.table.title"),className:`todo-table-title${M("title").className}`,thProps:M("title").props,sort:n,onSort:a,width:U.title,resize:xr("title",d("todo.table.title"))}):kr(A))),o.createElement("th",{className:"todo-table-actions",style:U.title?{width:"auto",minWidth:48}:void 0}))),o.createElement("tbody",null,W&&o.createElement("tr",{className:"todo-table-new-row"+(te?"":" is-idle"),ref:le,onBlur:b,onFocus:()=>oe(!0)},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"})),u.map(A=>A==="title"?o.createElement("td",{key:A,className:"todo-table-title"},o.createElement("input",{ref:_,className:"todo-table-new-input",value:$,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:O=>w(O.target.value),onKeyDown:O=>{O.nativeEvent.isComposing||(O.key==="Enter"?(O.preventDefault(),$.trim()?T([$]):L()):O.key==="Escape"&&(O.preventDefault(),L()))},onPaste:O=>{let H=O.clipboardData.getData("text/plain");/\r?\n/.test(H.trim())&&(O.preventDefault(),T(df(`${$}${H}`)))}})):Y(A)),o.createElement("td",{className:"todo-table-actions"})),C)),!lt.length&&!W&&o.createElement("div",{className:"todo-table-empty-state"},s)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,We.length?d("todo.table.selectedCount",{count:We.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!We.length&&o.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:wr})),We.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:Io},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{_i()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:A=>{f.ui.openMenu(Ei.map(O=>({label:String(O),type:"radio",checked:O===D,onSelect:()=>{G(O),V(0)}})),{anchor:A.currentTarget,align:"start"})}},o.createElement("span",null,D),o.createElement(Za,null)),Qe>1&&o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:He+1,pages:Qe})),Qe>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:He===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>V(0)},o.createElement($d,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:He===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>V(He-1)},o.createElement(yn,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:He>=Qe-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>V(He+1)},o.createElement(wn,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:He>=Qe-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>V(Qe-1)},o.createElement(jd,null))))))}function Ni(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let c=o.useCallback(async()=>{if(i.current)return;let u=a.current;if(u!==null){a.current=null,i.current=!0;try{let g=await n.current(u);!g&&a.current===null&&(a.current=u),g?l.current=0:l.current+=1}catch{a.current===null&&(a.current=u),l.current+=1}finally{i.current=!1,a.current!==null&&l.current<3?s.current=window.setTimeout(()=>{c()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),c()},[c]),o.useCallback(u=>{a.current=u,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,c()},t)},[c,t])}function lf({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let c=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>l(u.target.value),onBlur:()=>{p.current=!1,c()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(l(e),u.currentTarget.blur())}})}function cf(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var uf=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=f.ui.settings,[l,p]=o.useState(xe);o.useEffect(()=>Pt(p),[]);let c=l.find(b=>b.id===e),u=Hs(e),g=Ve(),[h,m]=o.useState(!1),[x,k]=o.useState(!1),[F,M]=o.useState(!1),[z,v]=o.useState(!1),y=o.useRef(null),[P,Z]=o.useState(""),R=cf(e),K=o.useSyncExternalStore(o.useCallback(b=>(R.listeners.add(b),()=>{R.listeners.delete(b)}),[R]),()=>R.value,()=>R.value),U=o.useCallback(b=>{R.value={...R.value,...b};for(let I of R.listeners)I()},[R]),se=K.title,D=b=>U({title:b}),G=()=>U({error:d("todo.error.saveDraft")});o.useEffect(()=>{R.revision||R.loadingRevision||(R.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(b=>{b&&!R.revision&&(R.revision={expectedRevision:b.revision,realmGeneration:b.realmGeneration})}).catch(()=>{U({error:d("todo.error.saveDraft")})}).finally(()=>{R.loadingRevision=void 0}))},[R,e,U]);let W=async b=>(R.revision||await R.loadingRevision,R.revision?t.patchTodo(e,b,R.revision):!1),E=Ni(async b=>{let I=b.trim()?await W({title:b}):!0;return I&&R.value.title===b&&U({title:null,error:""}),I},500,G),$=Ni(async b=>{let I=await W({note:b});return I&&R.value.note===b&&U({note:null,error:""}),I},500,G),w=Ni(async b=>{let I=JSON.parse(b),Y=await W({tags:I});return Y&&JSON.stringify(R.value.tags)===b&&U({tags:null,error:""}),Y},0,G);if(o.useEffect(()=>{!c&&!t.loading&&r()},[c,t.loading,r]),!c)return null;let S=b=>{W(b).then(I=>{I||G()})},N=b=>{U({tags:b}),w(JSON.stringify(b))},_=b=>S({attachments:b.length?b:void 0}),le=b=>S({urls:b.length?b:void 0}),ce=ve(g);y.current||(y.current=structuredClone(c));let te=()=>{let b=y.current;b&&(E(b.title),$(b.note),S({tags:b.tags,status:b.status,completed:b.completed,priority:b.priority,dueDate:b.dueDate,startTime:b.startTime,endTime:b.endTime,group:b.group,location:b.location,flagged:b.flagged,attachments:b.attachments,urls:b.urls,filePath:b.filePath})),U({title:null,note:null,tags:null,error:""}),r()},oe=Fe(c),ne=gf(),T=c.dueDate?`${at(c.dueDate.slice(0,10),ne,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${c.startTime?` \xB7 ${c.startTime}${c.endTime?`\u2013${c.endTime}`:""}`:""}`:"",L=(b,I,Y,ue=300)=>{f.ui.openPopover(Y,{anchor:b,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:I,width:ue})},j=(b,I,Y,ue,V,B="")=>o.createElement("button",{key:b,type:"button",className:`todo-sheet-chip${Y?"":" is-empty"}${B?` ${B}`:""}`,"aria-label":Y?`${ue}: ${Y}`:ue,title:b==="place"&&c.location?c.location.name:void 0,onClick:de=>V(de.currentTarget)},I,o.createElement("span",null,Y||ue));return o.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),pt(c,t.removeTodo).then(b=>{b||t.openDetail(c.id)})}},o.createElement(ht,null),d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:te},d("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},K.error&&o.createElement("p",{role:"alert"},K.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":oe,title:et(oe),"aria-label":`${d("auto.bae7d5be7082")}: ${et(oe)}`,onClick:b=>yr(b.currentTarget,c,I=>S(I))},o.createElement(Le,{status:oe==="open"?null:oe,dotCls:Se(oe).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:se??c.title,"aria-label":d("auto.c5e8306a511f"),onChange:b=>{D(b.target.value),E(b.target.value)},onBlur:()=>{se===c.title&&D(null)},onKeyDown:b=>{b.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${c.flagged?" on":""}`,type:"button",onClick:()=>S({flagged:c.flagged?void 0:!0}),"aria-pressed":!!c.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(Pe,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:K.note??c.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:b=>{let I=b.target.value;U({note:I}),$(I)}}),o.createElement("div",{className:"todo-sheet-chips"},j("status",o.createElement(Le,{status:oe==="open"?null:oe,dotCls:Se(oe).cls}),oe==="open"?"":et(oe),d("auto.bae7d5be7082"),b=>yr(b,c,I=>S(I))),j("due",o.createElement(st,null),T,d("todo.sheet.date"),b=>L(b,d("todo.edit.schedule"),()=>o.createElement(pf,{todo:c,onPatch:S}),280),c.dueDate&&c.dueDate.slice(0,10)<ne&&!c.completed?"is-overdue":""),j("group",o.createElement("span",{className:"todo-sheet-dot",style:c.group?{background:we(Te(c.group,g))}:void 0}),c.group??"",d("todo.edit.group"),b=>{f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!c.group,onSelect:()=>S({group:void 0})},...ce.map(I=>({label:I,type:"radio",checked:c.group===I,color:Te(I,g),onSelect:()=>S({group:I})}))],{anchor:b,align:"start"})}),j("place",o.createElement(ot,null),c.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),b=>L(b,d("todo.location"),()=>o.createElement(mf,{todo:c,onPatch:S}),320)),j("priority",o.createElement(Mt,{priority:c.priority}),c.priority==="normal"?"":qe(c.priority),d("auto.886cbff9d9df"),b=>{f.ui.openMenu(Be.map(I=>({label:qe(I.id),icon:o.createElement(Mt,{priority:I.id}),type:"radio",checked:c.priority===I.id,onSelect:()=>S({priority:I.id})})),{anchor:b,align:"start"})})),o.createElement(Hn,{value:K.tags??c.tags??[],onChange:N,bare:!0}),((c.attachments??[]).length>0||h)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(c.attachments??[]).map(b=>o.createElement(Tl,{key:b,relPath:b,onRemove:()=>_((c.attachments??[]).filter(I=>I!==b))})),h&&o.createElement(xi,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:b=>{(c.attachments??[]).includes(b)||_([...c.attachments??[],b]),m(!1)}})),((c.urls??[]).length>0||x||c.filePath||F)&&o.createElement("div",{className:"todo-sheet-section"},c.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:c.filePath,onClick:b=>f.workspace.openFile(c.filePath,void 0,{newTab:f.ui.hasModKey(b)})},o.createElement(bt,null),o.createElement("span",null,c.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>S({filePath:void 0})},o.createElement(Ae,null))),F&&!c.filePath&&o.createElement(xi,{placeholder:d("todo.file.searchLinked"),onCancel:()=>M(!1),onPick:b=>{S({filePath:b}),M(!1)}}),(c.urls??[]).map(b=>o.createElement("div",{className:"todo-detail-url-card",key:b},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:b,onClick:I=>{let Y=go(b);Y?f.workspace.openFile(Y,void 0,{newTab:f.ui.hasModKey(I)}):f.files.openExternalUrl(b)}},o.createElement(Xt,null),o.createElement("span",null,ff(b))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:b}),onClick:()=>le((c.urls??[]).filter(I=>I!==b))},o.createElement(Ae,null)))),x&&o.createElement(lf,{className:"todo-detail-link-input todo-detail-url",value:P,onCommit:b=>{let I=Hr(b);I&&!(c.urls??[]).includes(I)&&le([...c.urls??[],I]),Z(""),k(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),z&&u.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...u].reverse().map((b,I)=>o.createElement("li",{key:`${b.changedAt}:${I}`},o.createElement("span",null,et(b.from)," \u2192 ",et(b.to)),o.createElement("time",{dateTime:b.changedAt},new Date(b.changedAt).toLocaleString(f.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(Lt,null)," ",d("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>k(!0)},o.createElement(Xt,null)," ",d("todo.sheet.link")),!c.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>M(!0)},o.createElement(bt,null)," ",d("todo.linkedFile")),u.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":z,onClick:()=>v(b=>!b)},d("todo.activity")," (",u.length,")"))))};function pf({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[a,i]=o.useState(e.startTime??""),[s,l]=o.useState(e.endTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(to,{value:r,onChange:p=>{n(p),p||(i(""),l("")),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(gr,{value:a,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:p=>{i(p),t({startTime:p||void 0,...p?{}:{endTime:void 0}}),p||l("")}}),o.createElement(gr,{value:s,disabled:!a,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:p=>{if(p&&a&&p<=a){l(s);return}l(p),t({endTime:p||void 0})}})))}function mf({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),t({location:a})}}))}function ff(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}function gf(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var Do=({c:e})=>e.editingId?o.createElement(uf,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function hf(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function bf(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let p=i+s>>>1;e[p].start+e[p].height<n?i=p+1:s=p}let l=i;for(s=e.length;i<s;){let p=i+s>>>1;e[p].start<=a?i=p+1:s=p}return[l,i]}function Zn(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[c,u]=e.useReducer(E=>E+1,0),[g,h]=e.useState({top:0,height:600}),[m,x]=e.useState(null),[k,F]=e.useState(null),M=e.useRef(null),z=e.useRef(null),v=e.useRef(null),y=e.useMemo(()=>{let E=0;return r.map(($,w)=>{let S=p.current.get($)??(typeof n=="number"?n:n($,w)),N={id:$,height:S,start:E};return E+=S,N})},[r,n,c]),P=y.length?y[y.length-1].start+y[y.length-1].height:0,Z=e.useRef({rows:y,viewport:g});Z.current={rows:y,viewport:g};let R=e.useCallback(()=>{let E=l.current,$=M.current;if(!E||!$)return;let w=E.getBoundingClientRect(),S=$.getBoundingClientRect(),N=$.clientHeight||S.height||600,_=$===E?$.scrollTop:S.top-w.top;h(le=>le.top===_&&le.height===N?le:{top:_,height:N})},[]),K=e.useCallback(()=>{z.current===null&&(z.current=(v.current??window).requestAnimationFrame(()=>{z.current=null,R()}))},[R]);e.useLayoutEffect(()=>{let E=l.current;if(!E||!s)return;let $=hf(E);M.current=$;let w=E.ownerDocument.defaultView??window;v.current=w;let S=E.style.overflowAnchor;E.style.overflowAnchor="none";let N=!0,_=()=>{if(!N)return;let oe=E.ownerDocument.activeElement,ne=oe instanceof HTMLElement?oe:null;for(;ne&&ne.parentElement!==E;)ne=ne.parentElement;x(ne?.dataset.visibleKey??null)},le=()=>{queueMicrotask(_)};$.addEventListener("scroll",K,{passive:!0}),w.addEventListener("resize",K),E.addEventListener("focusin",_),E.addEventListener("focusout",le);let ce=E.clientWidth,te=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{E.clientWidth!==ce&&(ce=E.clientWidth,p.current.clear(),u()),K()});return te?.observe($),$!==E&&te?.observe(E),R(),()=>{N=!1,E.style.overflowAnchor==="none"&&(E.style.overflowAnchor=S),$.removeEventListener("scroll",K),w.removeEventListener("resize",K),E.removeEventListener("focusin",_),E.removeEventListener("focusout",le),te?.disconnect(),z.current!==null&&w.cancelAnimationFrame(z.current),z.current=null,M.current=null,v.current=null}},[s,R,K]),e.useLayoutEffect(()=>{let E=new Set(r);for(let $ of p.current.keys())E.has($)||p.current.delete($);R()},[r,R]),e.useLayoutEffect(()=>{p.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let E=l.current;if(!E||!s)return;let $=N=>{let _=0,le=!1,{rows:ce,viewport:te}=Z.current,oe=new Map(ce.map(ne=>[ne.id,ne]));for(let ne of N){let T=ne.dataset.visibleKey,L=T?oe.get(T):void 0,j=ne.getBoundingClientRect().height;!T||!L||j<=0||Math.abs(j-L.height)<.5||(p.current.set(T,j),L.start+L.height<=te.top&&(_+=j-L.height),le=!0)}if(le){let ne=M.current,T=E.closest('[data-visible-sections="true"]'),L=E;for(;L&&L.parentElement!==T;)L=L.parentElement;let j=T&&T!==E&&L&&ne&&L.getBoundingClientRect().bottom<=ne.getBoundingClientRect().top;_&&ne&&!j&&(ne.scrollTop+=_),u(),K()}},w=Array.from(E.children).filter(N=>N.hasAttribute("data-visible-key")),S=typeof ResizeObserver>"u"?void 0:new ResizeObserver(N=>$(N.map(_=>_.target)));return w.forEach(N=>S?.observe(N)),$(w),()=>S?.disconnect()}),e.useLayoutEffect(()=>{if(!k)return;let E=Array.from(l.current?.children??[]).find($=>$.dataset.visibleKey===k.id);E&&(E.scrollIntoView?.({block:"nearest"}),k.selector&&(E.matches(k.selector)?E:E.querySelector(k.selector))?.focus(),R(),F(null))},[k,y,R]);let U=e.useCallback((E,$)=>{F({id:E,selector:$})},[]),[se,D]=s?bf(y,g):[0,y.length],G=new Set;for(let E=se;E<D;E++)G.add(E);let W=new Set([...a,m,k?.id].filter(Boolean));return W.size&&y.forEach((E,$)=>{W.has(E.id)&&G.add($)}),{ref:l,show:U,render(E){let $=[],w=0;for(let S of[...G].sort((N,_)=>N-_)){let N=y[S];N.start>w&&$.push(e.createElement("div",{key:`space:${N.id}`,"aria-hidden":!0,style:{height:N.start-w,flex:"0 0 auto",pointerEvents:"none"}})),$.push(e.createElement(e.Fragment,{key:N.id},E(S))),w=N.start+N.height}return P>w&&$.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:P-w,flex:"0 0 auto",pointerEvents:"none"}})),$}}}var Xl=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=ze(),s=o.useSyncExternalStore(i.subscribe,i.get,i.get),l=o.useMemo(()=>e.map(g=>g.id),[e]),p=Zn(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),c=p.show;o.useLayoutEffect(()=>{s&&l.includes(s.todoId)&&c(s.todoId)},[s,l,c]);let u=o.useCallback((g,h)=>{let m=e[Math.max(0,Math.min(e.length-1,g+h))];m&&c(m.id,".todo-row")},[e,c]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(g=>o.createElement(Gl,{key:e[g].id,todo:e[g],groups:t,compact:r,c:a,hideDate:n,onMoveFocus:h=>u(g,h)})))};function Zl({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let l=ze(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),c=o.useMemo(()=>e.map(M=>M.key),[e]),[u,g]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),m=e.filter(M=>M.todos.some(z=>h.has(z.id))).map(M=>M.key),x=o.useCallback((M,z)=>a?.(e[z])??32+e[z].todos.length*(r?52:84),[e,r,a]),k=Zn(o,{ids:c,estimate:x,pinned:m,layoutKey:i??r}),F=k.show;return o.useLayoutEffect(()=>{if(!p)return;let M=e.find(z=>z.todos.some(v=>v.id===p.todoId));M&&F(M.key)},[p,e,F]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:k.ref,onDragStartCapture:M=>g(M.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},k.render(M=>o.cloneElement(s(e[M]),{"data-visible-key":c[M]})))}function yf(e,t,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return Wt(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=Wt(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:dd(i),p0:`${tn(t,a,n)} \u2013 ${tn(it(s),a,n)}`})}return t===It(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===It(r,1)?d("todo.due.tomorrow"):tn(t,a,n)}function Jn({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let l=it(),{shortDateFormat:p}=dt("shortDateFormat"),c=f.ui.language(),u=o.useMemo(()=>{if(!s)return Va(e,a,Yo(i));let g=new Map(e.map(m=>[m,Ka(m)])),h=[...e].sort((m,x)=>g.get(x).localeCompare(g.get(m)));return Va(h,a,Yo(i),{dateOf:m=>Ua(g.get(m))})},[a,s,e,i]);return o.createElement(Zl,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},yf(g.kind,g.key,l,p,c)),o.createElement(Xl,{todos:g.todos,groups:t,compact:r,c:n})))}function Qn(e){return e==="flagged"?o.createElement(Pe,null):e==="priority"?o.createElement(Yt,null):e==="due"?o.createElement(or,null):e==="updated"?o.createElement(Nd,null):e==="created"?o.createElement(Ld,null):o.createElement(Pd,null)}function wf(){return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-filter-section-label"},d("todo.filters.show")),o.createElement(Ai,null))}function Li({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,l]=o.useState(r),p=Object.entries(qo);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(tr,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement(er,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([c,u])=>o.createElement("button",{key:c,type:"button",className:`todo-sort-option${a===c?" active":""}`,"aria-pressed":a===c,onClick:()=>{i(c),t(c)}},Qn(c),o.createElement("span",null,d(u))))))}function mr({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:l,embedded:p=!1}){let[c,u]=o.useState(a),[g,h]=o.useState(i),m=p?a:c,x=p?i:g,k=m.length===r.length&&(!n||x),F=[...r.map(y=>m.some(P=>P.toLowerCase()===y.toLowerCase())),...n?[x]:[]],M=(y,P)=>y?` active${F[P-1]?"":" selection-run-start"}${F[P+1]?"":" selection-run-end"}`:"",z=(y,P)=>{u(y),h(P),s(y,P)},v=y=>{let P=e.filter(K=>y===null?!K.group:nt([y]).has(Q(K.group??""))),Z=y??d("todo.chip.noGroup"),R=y===null?x:m.some(K=>Q(K)===Q(y));return o.createElement("div",{className:"todo-group-filter-item",key:y??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},y&&o.createElement("span",{className:"props-info-dot",style:{background:we(Te(y,t))}}),Z),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,P.length),o.createElement(f.ui.settings.Toggle,{label:Z,checked:R,onChange:()=>z(y===null?m:R?m.filter(K=>Q(K)!==Q(y)):[...m,y],y===null?!x:x)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:l},d("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>z(k?[]:r,k?!1:n)},d(k?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(y=>v(y)),n&&v(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>z(k?[]:r,k?!1:n)},d(k?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((y,P)=>{let Z=F[P];return o.createElement("button",{key:y,type:"button",className:`todo-group-filter-row${M(Z,P)}`,"aria-pressed":Z,onClick:()=>z(Z?c.filter(R=>R.toLowerCase()!==y.toLowerCase()):[...c,y],g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},Z?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:we(Te(y,t))}}),o.createElement("span",{className:"todo-tree-label"},y),o.createElement("span",{className:"todo-tree-count"},Tn(e,y)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${M(g,r.length)}`,"aria-pressed":g,onClick:()=>z(c,!g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Tn(e,null)))))}var Jl={scheduled:()=>o.createElement(or,null),today:()=>o.createElement(rr,null),week:()=>o.createElement(vn,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(hn,null),completed:()=>o.createElement(Ze,null)},vf=()=>{let{activePluginTab:e,dateFormat:t}=dt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=$n(),a=Ve(),i=pr(),[s,l]=o.useState(""),[p,c]=o.useState(""),[u,g]=o.useState(""),[h,m]=o.useState({}),[x,k]=o.useState(!1),[F,M]=o.useState(!1),[z,v]=o.useState(!1),[y,P]=o.useState(!1),{DateField:Z,TimeField:R}=f.ui.settings,[K,U]=o.useState(!1),[se,D]=_n(),[G]=vt(),[W,E]=Cn("todo"),{sortField:$,sortDir:w,compact:S}=W,[N,_]=wt(),le=ut(),ce=In(),te=Mn(),oe=o.useMemo(()=>Wd(te),[te]),ne=e?.pluginId===f.pluginId,T=o.useRef(null),L=o.useRef(null),j=o.useRef(null),b=To($,w,"left_sidebar");lo(b.openDetail);let I=he(new Date),Y=o.useMemo(()=>qd(b.todos,I),[b.todos,I]),ue=o.useMemo(()=>ve(a),[a]),V=o.useMemo(()=>b.todos.some(C=>!C.group),[b.todos]),B=i.kind==="groups"?i.names:ue,de=i.kind==="groups"?i.includeUngrouped===!0:V,be=B.length===ue.length&&(!V||de),Me=o.useMemo(()=>{let C=b.ordered.filter(q=>kn(q,i,G,I));if(N!=="all"&&(C=C.filter(q=>mo(q,N))),se.trim()){let q=Vt(se);C=C.filter(A=>q(A.tags??[],A.title,A.note,A.group??""))}return n?C=C.filter(q=>{let A=q.dueDate?.slice(0,10);return!!A&&A>=n.start&&A<=n.end}):r&&(C=C.filter(q=>q.dueDate?.slice(0,10)===r)),C},[b.ordered,i,G,N,se,r,n,I]),rt=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Qe=async()=>{if(b.creating)return;let C=rn(s,I),q=C.title;if(!q){lt();return}let A=rt;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let J=await f.ui.openMenu([...i.names.map((ye,No)=>({id:`group:${No}`,label:ye})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:T.current??j.current,align:"start"});if(J===null)return;A=J.startsWith("group:")?i.names[Number(J.slice(6))]:void 0}P(!1);let O={note:p.trim(),tags:[...new Set([...h.tags??[],...u.split(/[\s,]+/).map(J=>J.replace(/^#+/,"")).filter(Boolean)])],priority:C.priority,...A?{group:A}:{}};i.kind==="smart"&&i.id==="flagged"&&(O.flagged=!0),Object.assign(O,{...h,tags:O.tags}),C.dueDate&&(O.dueDate=C.dueDate),await b.create(q,void 0,{patch:O})?(P(!1),l(""),c(""),g(""),m({}),k(!1),M(!1),v(!1),T.current?.focus()):P(!0)},He=()=>{U(!0),window.setTimeout(()=>T.current?.focus(),0)},lt=()=>{l(""),U(!1),c(""),g(""),m({}),k(!1),M(!1),v(!1),P(!1)},We=ze(),wr=o.useSyncExternalStore(We.subscribe,We.get,We.get);o.useEffect(()=>{wr?.mode==="create"&&(U(!0),We.clear())},[wr,We]),o.useEffect(()=>{K&&!b.creating&&T.current?.focus()},[K,ne,b.creating]),o.useLayoutEffect(()=>{L.current&&(L.current.style.height="auto",L.current.style.height=`${L.current.scrollHeight}px`)},[p,K]);let kt=h.dueDate??"",no=K&&o.createElement("form",{className:"todo-compose",onSubmit:C=>{C.preventDefault(),Qe()},onKeyDown:C=>{C.key==="Escape"&&!C.defaultPrevented&&!b.creating&&(C.preventDefault(),lt())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:T,className:"todo-compose-title",value:s,onChange:C=>l(C.target.value),placeholder:rt?d("todo.newTodoIn",{p0:rt}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:b.creating}),o.createElement("textarea",{ref:L,className:"todo-compose-note",rows:1,value:p,onChange:C=>c(C.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:b.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(C=>o.createElement("span",{className:"todo-compose-token",key:C},o.createElement("span",null,"#",C),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:C}),disabled:b.creating,onClick:()=>m(q=>({...q,tags:q.tags?.filter(A=>A!==C)}))},o.createElement(Ae,null)))),o.createElement("input",{value:u,onChange:C=>{let q=C.target.value;if(!("isComposing"in C.nativeEvent&&C.nativeEvent.isComposing)&&/[\s,]/.test(q)){let A=q.split(/[\s,]+/),O=A.pop()??"";m(H=>({...H,tags:[...new Set([...H.tags??[],...A.map(J=>J.replace(/^#+/,"")).filter(Boolean)])]})),g(O)}else g(q)},onKeyDown:C=>{C.nativeEvent.isComposing||(C.key==="Enter"&&u.trim()&&(C.preventDefault(),m(q=>({...q,tags:[...new Set([...q.tags??[],u.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),C.key==="Backspace"&&!u&&m(q=>({...q,tags:q.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:b.creating})),F&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(Z,{className:"todo-compose-date-field",value:kt,onChange:C=>m(q=>({...q,dueDate:C})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:b.creating}),o.createElement(R,{className:"todo-compose-time-field",value:h.startTime??"",onChange:C=>m(q=>({...q,startTime:C||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:b.creating})),z&&o.createElement("div",{className:"todo-compose-location"},o.createElement(vo,{value:h.location,disabled:b.creating,onChange:C=>m(q=>({...q,location:C}))})),(x||!!h.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(C=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:C,title:C},o.createElement(Lt,null),o.createElement("span",null,C.split("/").pop()),o.createElement("button",{type:"button",disabled:b.creating,"aria-label":`${d("todo.removeAttachment")}: ${C}`,onClick:()=>m(q=>({...q,attachments:q.attachments?.filter(A=>A!==C)}))},o.createElement(Ae,null)))),x&&o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:b.creating,onChange:C=>{C&&(m(q=>({...q,attachments:[...new Set([...q.attachments??[],C])]})),k(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${kt?" has-value":""}`,"aria-pressed":F,disabled:b.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>M(C=>!C)},o.createElement(st,null),kt&&o.createElement("span",null,at(kt,I,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),t),h.startTime?` ${h.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${h.location?" has-value":""}`,"aria-pressed":z,disabled:b.creating,"aria-label":d("todo.compose.addPlace"),title:h.location?.name??d("todo.compose.addPlace"),onClick:()=>v(C=>!C)},o.createElement(ot,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${h.attachments?.length?" has-value":""}`,"aria-pressed":x,disabled:b.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>k(C=>!C)},o.createElement(Lt,null),!!h.attachments?.length&&o.createElement("span",null,h.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${h.priority&&h.priority!=="normal"?" has-value":""}`,disabled:b.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async C=>{let q=await f.ui.openMenu(Be.map(A=>({id:A.id,label:d(A.labelKey),checked:A.id===(h.priority??"normal")})),{anchor:C.currentTarget,align:"start"});q&&m(A=>({...A,priority:q}))}},o.createElement(Yt,null),h.priority&&h.priority!=="normal"&&o.createElement("span",null,d(`todo.priority.${h.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(C=>({...C,flagged:!(C.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":h.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:b.creating},o.createElement(Pe,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||b.creating},d("todo.group.add"))),y&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:lt,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:b.creating},o.createElement(Ae,null))),Co=C=>{f.ui.openPopover(({close:q})=>o.createElement("div",{className:"todo-filter-popover-stack"},o.createElement(wf,null),(ue.length>0||V)&&o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-filter-divider"}),o.createElement(mr,{todos:b.todos,groups:a,names:ue,hasUngrouped:V,selected:B,includeUngrouped:de,onChange:(A,O)=>Ke(A.length===ue.length&&(!V||O)?Oe:{kind:"groups",names:A,includeUngrouped:O}),onOpenSettings:()=>{q(),Ot()}}))),{anchor:C,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.title"),width:248})},vr=C=>{f.ui.openPopover(()=>o.createElement(Li,{sortField:$,setSortField:q=>E({sortField:q}),sortDir:w,setSortDir:q=>E({sortDir:q})}),{anchor:C,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},ta=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},Io=(C,q,A,O,H,J,ye,No)=>{let Sr=Sn(i,q),zi=q.kind==="groups"&&q.names.length===1&&!q.includeUngrouped&&i.kind==="groups"?i.names.some(ao=>Q(ao)===Q(q.names[0])):Sr;return o.createElement("button",{key:Je(q),type:"button",className:`todo-tree-row${H?" nested":""}${J?` todo-${J}-chip`:""}${zi?" active":""}`,"aria-current":Sr?"true":void 0,"aria-label":J?`${C} ${A}`:void 0,title:J?C:void 0,"aria-pressed":q.kind==="groups"?zi:void 0,style:ye?{"--todo-chip-color":we(ye),"--todo-chip-on":No??At(ye)}:void 0,onClick:ao=>ur(q,ml(ao)),onAuxClick:ao=>{ao.button===1&&(ao.preventDefault(),ur(q,!0))}},O&&o.createElement("span",{className:"todo-tree-icon"},O),H&&o.createElement("span",{className:"todo-tree-dot",style:{background:we(H)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},C),o.createElement("span",{className:"todo-tree-count"},A))},xr=!!(se||r||n||N!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),kr=n?`${$e(n.start,t)} \u2013 ${$e(n.end,t)}`:r?$e(r,t):null,oa=N==="all"?null:`${d("auto.bae7d5be7082")}: ${N.length===1?le.find(C=>C.id===N[0])?.label??d("todo.chip.all"):d("todo.filters.statusCount",{count:N.length})}`,Tr=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!ne&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${G||N!=="all"||!be?" active":""}`,"aria-label":d("todo.filters.title"),title:d("todo.filters.title"),type:"button",onClick:C=>Co(C.currentTarget)},o.createElement(Vd,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":S,title:S?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>E({compact:!S})},S?o.createElement(dn,null):o.createElement(ln,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${w==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(qo[$])}`,type:"button",onClick:C=>vr(C.currentTarget)},w==="asc"?o.createElement(er,null):o.createElement(tr,null),Qn($))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>f.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(gt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:se,onChange:C=>D(C.target.value),onKeyDown:C=>{C.key==="Escape"&&D("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),se&&o.createElement("button",{className:"search-field-action",onClick:()=>D(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(Ae,null)))),ne?o.createElement("div",{className:"todo-tree todo-active-navigation"},no,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},oe.map(C=>Io(d(C.labelKey),{kind:"smart",id:C.id},Y[C.id],Jl[C.id](),void 0,"smart",C.color,sr(C,At)))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),ue.map(C=>Io(C,{kind:"groups",names:[C]},Tn(b.todos,C),void 0,Te(C,a))))):o.createElement(o.Fragment,null,!se&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},kr?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:ta},o.createElement("span",{className:"todo-tree-icon"},o.createElement(rr,null)),o.createElement("span",{className:"todo-tree-label"},kr),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Ae,null))):oe.map(C=>Io(d(C.labelKey),{kind:"smart",id:C.id},Y[C.id],Jl[C.id](),void 0,"smart",C.color,sr(C,At)))),oa&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>_("all")},o.createElement("span",{className:"todo-tree-label"},oa),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Ae,null)))),o.createElement("div",{className:"todo-list"},no,b.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):Me.length?o.createElement(Jn,{todos:Me,groups:a,compact:S,controller:b,mode:ce,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,xr)))),!K&&o.createElement("button",{ref:j,className:"todo-fab",type:"button","aria-label":Tr,title:Tr,disabled:b.creating,onClick:He},o.createElement(Jo,null)),o.createElement(Do,{c:b}))},Ql=()=>o.createElement(vf,null);function xf({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=ut(),[i,s]=o.useState(e),[l,p]=o.useState(r),c=a.map(m=>m.id),u=l==="all"?c:l,g=m=>{s(m),t(m)},h=m=>{let x=u.includes(m)?u.filter(F=>F!==m):c.filter(F=>u.includes(F)||F===m);if(!x.length)return;let k=x.length===c.length?"all":x;p(k),n(k)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>o.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(m.id),onClick:()=>h(m.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(m.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Le,{status:m.id==="open"?null:m.id,dotCls:m.cls})),o.createElement("span",null,m.label)))))}var ec=()=>{let{activePath:e,weekStart:t}=dt("activePath","weekStart"),r=_t(e)??"",n=Ve(),a=In(),[i,s]=Cn("attachment"),{showCompleted:l,statusFilter:p,compact:c,sortField:u,sortDir:g,groupNames:h,includeUngrouped:m}=i,x=U=>s({showCompleted:U}),k=U=>s({statusFilter:U}),F=U=>s({sortField:U}),M=U=>s({sortDir:U}),z=To(u,g,"right_sidebar");lo(z.openDetail);let v=o.useMemo(()=>ve(n),[n]),y=o.useMemo(()=>z.todos.some(U=>!U.group),[z.todos]),P=o.useMemo(()=>z.ordered.filter(U=>!(_t(U.filePath)===r||(U.attachments??[]).some(D=>_t(D)===r))||!l&&U.completed||(h.length||m)&&(!U.group&&!m||U.group&&!nt(h).has(Q(U.group)))?!1:mo(U,p)),[z.ordered,r,l,p,h,m]),Z=U=>{f.ui.openPopover(({close:se})=>o.createElement(mr,{todos:z.todos,groups:n,names:v,hasUngrouped:y,selected:h,includeUngrouped:m,onChange:(D,G)=>s({groupNames:D,includeUngrouped:G}),onOpenSettings:()=>{se(),Ot()}}),{anchor:U,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},R=U=>{f.ui.openPopover(()=>o.createElement(xf,{showCompleted:l,setShowCompleted:x,filter:p,setFilter:k}),{anchor:U,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},K=U=>{f.ui.openPopover(()=>o.createElement(Li,{sortField:u,setSortField:F,sortDir:g,setSortDir:M}),{anchor:U,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||m?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:U=>Z(U.currentTarget)},o.createElement(pn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:U=>R(U.currentTarget)},o.createElement(Ze,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":c,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!c})},c?o.createElement(dn,null):o.createElement(ln,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${g==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(qo[u])}`,onClick:U=>K(U.currentTarget)},g==="asc"?o.createElement(er,null):o.createElement(tr,null),Qn(u)))),o.createElement("div",{className:"todo-list"},z.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?P.length?o.createElement(Jn,{todos:P,groups:n,compact:c,controller:z,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(Do,{c:z}))};var kf={group:e=>e.group??void 0,notes:e=>Ii(e.note)||void 0,status:e=>$t().indexOf(Fe(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},tc=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=dt("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=$n(),s=Ve(),l=Gn(),p=o.useMemo(()=>Qt(t),[t]),c=p??l,u=n?.pluginId===f.pluginId&&n.instanceId===t,g=On();o.useEffect(()=>{if(!p)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>ko(-1),goForward:()=>ko(1)}),()=>e.setController(null)},[e,p,g.canGoBack,g.canGoForward]);let[h,m]=_n(),[x,k]=o.useState(()=>!!h.trim()),F=o.useRef(null),M=()=>{k(!0),window.setTimeout(()=>F.current?.focus(),0)},z=()=>{m(""),k(!1)},[v,y]=al(),{field:P,dir:Z}=v,[R]=vt(),[K,U]=wt(),[se,D]=Xn(),G=To("due","asc");lo(G.openDetail),o.useEffect(()=>{if(!(G.loading||p))if(c.kind==="groups"){let V=new Set(ve(s));!c.includeUngrouped&&!c.names.some(B=>V.has(B))&&Ke(Oe)}else c.kind==="tag"&&(G.todos.some(V=>V.tags?.includes(c.name))||Ke(Oe))},[G.loading,G.todos,s,c,p]);let W=it(),E=Mn(),$=c.kind==="smart"?yt(c.id,E):null,w=fi(c),S=c.kind==="groups"?c.names.length===1&&!c.includeUngrouped?we(Te(c.names[0],s)):"var(--accent-color)":c.kind==="tag"?"var(--accent-color)":c.kind==="nogroup"?"var(--text-color)":we($.color)||"var(--text-color)",N=o.useMemo(()=>{let V=G.todos.filter(B=>kn(B,c,R,W));if(K!=="all"&&(V=V.filter(B=>mo(B,K))),se.length&&(V=V.filter(B=>se.includes(B.priority))),h.trim()){let B=Vt(h);V=V.filter(de=>B(de.tags??[],de.title,de.note,de.group??""))}return i?V=V.filter(B=>{let de=B.dueDate?.slice(0,10);return!!de&&de>=i.start&&de<=i.end}):a&&(V=V.filter(B=>B.dueDate?.slice(0,10)===a)),V},[G.todos,c,R,K,se,h,a,i,W]),{ordered:_,sectionOf:le}=o.useMemo(()=>{let V=kf[P];if(V)return{ordered:sd(N,V,Z),sectionOf:void 0};if(P!=="auto")return{ordered:yo(N,P,Z),sectionOf:void 0};if(c.kind==="smart"&&c.id==="completed")return{ordered:ud(N).flatMap(be=>be.todos),sectionOf:void 0};let B=on(N,W),de=new Map;for(let be of Xo)for(let Me of B[be])de.set(Me.id,be);return{ordered:Xo.flatMap(be=>B[be]),sectionOf:be=>de.get(be.id)??"someday"}},[N,P,Z,c,W]),ce=!!h.trim()||se.length>0||K!=="all",te=()=>{m(""),D([]),U("all")},oe=[Je(c),h,JSON.stringify(K),se.join(),R,P,Z,a??"",i?.start??"",i?.end??""].join("|"),ne=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[T,L]=o.useState(0),j=()=>L(V=>V+1),b=()=>{let V={};return c.kind==="groups"&&c.names.length===1&&!c.includeUngrouped&&(V.group=c.names[0]),c.kind==="smart"&&(c.id==="today"||c.id==="week")&&(V.dueDate=W),c.kind==="smart"&&c.id==="flagged"&&(V.flagged=!0),V},I=ve(s),Y=[{label:d("todo.fab.newTodo"),icon:o.createElement(Jo,null),onSelect:j},...I.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(un,null),submenu:I.map(V=>({label:V,onSelect:B=>{let de={kind:"groups",names:[V]};B?.newTab||p?(gi(de,B?.newTab===!0),ss()):(Ke(de),j())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(pn,null),onSelect:()=>{Ot()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(Xt,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(zn(c)))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(Fd,null),onSelect:()=>f.workspace.openOwnSettings()}],ue=t??"";return o.useEffect(()=>{(u||n?.pluginId!==f.pluginId)&&bi(Y,ue)}),o.useEffect(()=>()=>bi(null,ue),[ue]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${x?" is-searching":""}`},x?o.createElement("div",{className:"todo-page-search"},o.createElement(gt,{className:"todo-page-search-icon"}),o.createElement("input",{ref:F,className:"todo-page-search-input",value:h,onChange:V=>m(V.target.value),onKeyDown:V=>{V.key==="Escape"&&(V.preventDefault(),z())},onBlur:()=>{h.trim()||k(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):o.createElement("h1",{className:"todo-page-appbar-title",style:{color:S}},w),(i||a)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:ne},o.createElement("span",null,i?`${$e(i.start,r)} \u2013 ${$e(i.end,r)}`:$e(a,r)),o.createElement(Ae,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!x&&h.trim()?" active":""}`,"aria-label":x?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:x?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:V=>{x&&V.preventDefault()},onClick:x?z:M},x?o.createElement(Ae,null):o.createElement(gt,null)),o.createElement(Hl,null),ce&&o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.reset"),title:d("todo.table.reset"),onClick:te},o.createElement(Bd,null)),o.createElement(Wl,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:j},o.createElement(Jo,null)))),G.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(Yl,{todos:_,groups:s,c:G,sort:v,onSort:y,resetKey:oe,empty:d("todo.table.empty"),sectionOf:le,composeSignal:T,newTaskPatch:b}),o.createElement(Do,{c:G}))};var nc=10080;function oc(e){let t=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!t)return null;let r=Number(t[1])*60+Number(t[2]);return r<=nc?r:null}function rc(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function ac(){let e=()=>{let m=f.settings.get().reminderOffsets;return Array.isArray(m)?m.filter(x=>Number.isInteger(x)&&x>=0&&x<=nc).slice(0,1):[10]},[t,r]=o.useState(e);o.useEffect(()=>f.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:a,SelectField:i}=f.ui.settings,s=t.length?"custom":"off",[l,p]=o.useState(()=>rc(t[0]??10)),[c,u]=o.useState(!1);o.useEffect(()=>{t.length&&(p(rc(t[0])),u(!1))},[t[0]]);let g=m=>{r(m),f.settings.set("reminderOffsets",m)},h=()=>{let m=oc(l);if(m===null){u(!0);return}u(!1),m!==t[0]&&g([m])};return o.createElement(a,{title:d("reminders.title")},o.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},o.createElement(i,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:m=>g(m==="off"?[]:[oc(l)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&o.createElement(n,{title:d("reminders.timeBefore"),description:c?o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},o.createElement("input",{className:`settings-control todo-reminder-time${c?" invalid":""}`,type:"text",inputMode:"numeric",value:l,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":c||void 0,maxLength:6,onChange:m=>{p(m.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),u(!1)},onBlur:h,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),h())}})))}var Tf={scheduled:()=>o.createElement(or,null),today:()=>o.createElement(rr,null),week:()=>o.createElement(vn,null),flagged:()=>o.createElement(Pe,null),all:()=>o.createElement(hn,null),completed:()=>o.createElement(Ze,null)};function ic(e){let[t,r]=o.useState(e);return o.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[t,r]}function Sf(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,s]=ic(En),l=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],p=m=>{s(m),tl(m)},c=i.order.filter(m=>!i.hidden.includes(m)).length,u=i.order.map(m=>yt(m,i)),g=a({items:u,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>d(m.labelKey),onReorder:m=>p({...i,order:m.map(x=>x.id)})}),h=(m,x)=>{if(x){p({...i,hidden:i.hidden.filter(M=>M!==m)});return}if(c<=1)return;let k={...i,hidden:[...i.hidden,m]};p(k);let F=Zt();F.kind==="smart"&&F.id===m&&Ke({kind:"smart",id:k.order.find(M=>!k.hidden.includes(M))})};return o.createElement(t,{title:d("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.colText")),o.createElement("span",null,d("todo.settings.colShow"))),u.map((m,x)=>{let k=i.hidden.includes(m.id),F=`${m.id}@${x}`,M=g.getHandleProps(m),z=d(m.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(k?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},o.createElement("button",{...M,className:(M.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},o.createElement(Qo,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:we(m.color),color:sr(m,At)},"aria-hidden":"true"},Tf[m.id]()),o.createElement("span",{className:"todo-settings-name"},z),o.createElement(e,{key:`color:${F}`,value:m.color,onChange:v=>p({...i,colors:{...i.colors,[m.id]:v}}),ariaLabel:d("todo.settings.smartListColor",{p0:z}),allowCustom:!1}),o.createElement(r,{key:`text:${F}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:l,ariaLabel:d("todo.settings.statusText",{p0:z}),onChange:v=>{let y={...i.textColors};v==="auto"?delete y[m.id]:y[m.id]=v,p({...i,textColors:y})}}),o.createElement(n,{key:`show:${F}`,checked:!k,disabled:!k&&c<=1,label:d("todo.settings.smartListShow",{p0:z}),onChange:v=>h(m.id,v)}))})),g.liveRegion)}function ea({initial:e,onCommit:t,onType:r,placeholder:n,ariaLabel:a,disabled:i}){let s=o.useRef(!1);return o.createElement("input",{className:"settings-control todo-settings-text",type:"text",defaultValue:e,placeholder:n,"aria-label":a,disabled:i,autoComplete:"off",spellCheck:!1,onChange:l=>r?.(l.currentTarget.value),onBlur:l=>{if(s.current){s.current=!1;return}t(l.currentTarget.value)},onKeyDown:l=>{l.key==="Enter"?(l.preventDefault(),l.currentTarget.blur()):l.key==="Escape"&&(l.preventDefault(),l.currentTarget.value=e,s.current=!0,l.currentTarget.blur())}})}function Af({current:e,onPick:t}){let r=Xa(),n=Object.keys(r).sort((a,i)=>a.localeCompare(i));return o.createElement("div",{className:"todo-icon-picker"},o.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(a=>o.createElement("button",{key:a,type:"button",role:"option","aria-selected":e===a,className:`todo-icon-picker-item${e===a?" is-active":""}`,title:a,"aria-label":a,onClick:()=>t(e===a?void 0:a)},o.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[a]}})))),o.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:qa})))}function Ef(){let{Button:e,ColorField:t,IconButton:r,Section:n,Toggle:a,useReorderDrag:i}=f.ui.settings,[s,l]=ic(Ue);Xa();let p=o.useRef(""),[c,u]=o.useState(0),[g,h]=o.useState(!1),m=D=>{let G=jr(D);l(G),Ns(G)},x=s.active.map(D=>Se(D,s)),k=i({items:x,indicatorOnly:!0,getId:D=>D.id,getLabel:D=>D.label,onReorder:D=>m({...s,active:D.map(G=>G.id)})}),F=(D,G)=>{G!==s.active.includes(D)&&m({...s,active:G?[...s.active,D]:s.active.filter(W=>W!==D)})},M=D=>D.replace(/[\u0000-\u001f]/g," ").trim().slice(0,$r),z=()=>{let D=M(p.current);if(!D||s.custom.length>=Rr)return;let G=Is();m({...s,custom:[...s.custom,{id:G,label:D,done:!1}],active:[...s.active,G]}),p.current="",h(!1),u(W=>W+1)},v=(D,G)=>{let W=M(G);if(ct(D)){if(!W)return;m({...s,custom:s.custom.map(E=>E.id===D?{...E,label:W}:E)})}else{let E={...s.labels};W&&W!==As(D)?E[D]=W:delete E[D],m({...s,labels:E})}},y=async(D,G)=>{ct(D)?m({...s,custom:s.custom.map(E=>E.id===D?{...E,done:G}:E)}):m({...s,done:{...s.done,[D]:G}});let W=(await Ye()).filter(E=>E.status===D);await Promise.all(W.map(E=>Fa(E.id,D)))},P=(D,G)=>{let W={...s.icons};G?W[D]=G:delete W[D],m({...s,icons:W})},Z=(D,G)=>{f.ui.openPopover(({close:W})=>o.createElement(Af,{current:s.icons[G],onPick:E=>{P(G,E),W()}}),{anchor:D,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},R=async D=>{let G=Se(D,s).label,W=(await Ye()).filter(w=>w.status===D);if(await f.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:G}),message:W.length?d("todo.settings.statusDeleteMoves",{count:W.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(W.map(w=>Fa(w.id,"open")));let $=Ue();ct(D)?m({...$,custom:$.custom.filter(w=>w.id!==D),active:$.active.filter(w=>w!==D)}):m({...$,removed:[...$.removed,D],active:$.active.filter(w=>w!==D)})},K=(D,G,W)=>{let E=D.id,$=`${E}@${W}`,w=D.label,S=G==="shown"?k.getHandleProps(D):null,N=G==="locked";return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(N?" locked":"")+(G==="off"?" is-off":"")+(G==="shown"&&k.overId===E?" drop-"+(k.dropPosition??"before"):""),key:E,...G==="shown"?k.getItemProps(D):{}},S?o.createElement("button",{...S,className:(S.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},o.createElement(Qo,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:N?d("todo.settings.statusLocked"):void 0},N&&o.createElement(Dd,null)),o.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${D.cls}`,title:d("todo.settings.statusIconOf",{p0:w}),"aria-label":d("todo.settings.statusIconOf",{p0:w}),onClick:_=>Z(_.currentTarget,E)},o.createElement(Le,{status:E==="open"?null:E,dotCls:D.cls})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(ea,{key:`name:${$}:${w}`,initial:w,ariaLabel:d("todo.settings.statusName"),onCommit:_=>v(E,_)})),o.createElement(r,{key:`strike:${$}`,className:"todo-settings-strike",pressed:s.strikethrough[E],"aria-pressed":s.strikethrough[E],ariaLabel:d("todo.settings.statusStrike",{p0:w}),title:d("todo.settings.statusStrike",{p0:w}),onClick:()=>m({...s,strikethrough:{...s.strikethrough,[E]:!s.strikethrough[E]}})},o.createElement(ei,null)),o.createElement(t,{key:`color:${$}`,value:s.colors[E],onChange:_=>m({...s,colors:{...s.colors,[E]:_}}),ariaLabel:d("todo.settings.statusColor",{p0:w}),allowCustom:!1}),o.createElement(r,{key:`done:${$}`,className:"todo-settings-strike",pressed:D.done,"aria-pressed":D.done,disabled:N,ariaLabel:d("todo.settings.statusDone",{p0:w}),title:d(N?"todo.settings.statusDoneFixed":"todo.settings.statusDone",{p0:w}),onClick:()=>{y(E,!D.done)}},o.createElement(Ze,null)),o.createElement(a,{key:`show:${$}`,checked:G!=="off",disabled:N,label:d("todo.settings.statusShow",{p0:w}),onChange:_=>F(E,_)}),N?o.createElement("span",null):o.createElement(r,{key:`delete:${$}`,ariaLabel:d("todo.settings.statusDelete",{p0:w}),title:d("todo.settings.statusDelete",{p0:w}),onClick:()=>{R(E)}},o.createElement(ht,null)))},U=[...Go.filter(D=>!s.active.includes(D)&&!s.removed.includes(D)),...s.custom.map(D=>D.id).filter(D=>!s.active.includes(D))].map(D=>Se(D,s)),se=s.custom.length>=Rr;return o.createElement(n,{title:d("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null,d("todo.settings.colIcon")),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},o.createElement(ei,null)),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},o.createElement(Ze,null)),o.createElement("span",null,d("todo.settings.colShow")),o.createElement("span",null)),K(Se("open",s),"locked",0),K(Se("completed",s),"locked",1),x.map((D,G)=>K(D,"shown",2+G)),U.map((D,G)=>K(D,"off",2+x.length+G))),k.liveRegion,o.createElement("div",{className:"todo-status-add"},o.createElement(ea,{key:`add:${c}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:se,onType:D=>{p.current=D,!!M(D)!==g&&h(!g)},onCommit:D=>{p.current=D}}),o.createElement(e,{type:"button",disabled:se||!g,onClick:z},d("todo.settings.statusAdd"))),s.removed.length>0&&o.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>m({...s,removed:[],active:[...s.active,...s.removed]})},d("todo.settings.statusRestore",{count:s.removed.length})))}function Df(){let{Row:e,Section:t,SelectField:r}=f.ui.settings,[n,a]=o.useState(An);return o.createElement(o.Fragment,null,o.createElement(t,{title:d("todo.settings.display")},o.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let s=i;a(s),f.settings.set(ii,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(ac,null))}function Cf(){let{Button:e,ColorField:t,IconButton:r,Section:n,SelectField:a}=f.ui.settings,i=od(),s=Ve(),l=s.filter(v=>!i.some(y=>y.id===v.id)),p=o.useRef(""),[c,u]=o.useState(0),[g,h]=o.useState(""),m=(v,y)=>s.some(P=>P.id!==y&&[P.name,...P.aliases??[]].some(Z=>Q(Z)===Q(v))),x=v=>{td(v)},k=()=>{let v=p.current.trim().slice(0,Ho);!v||m(v)||i.length>=Zr||(x([...i,{id:Zs(),name:v,color:xa(s)}]),p.current="",h(""),u(y=>y+1))},F=(v,y)=>{!y.trim()||y.trim()===v.name||m(y,v.id)||x(i.map(P=>P.id===v.id?Js(P,y):P))},M=async v=>{let y=new Set([v.name,...v.aliases??[]].map(Q)),P=(await Ye()).filter(R=>R.group&&y.has(Q(R.group)));await f.ui.confirm({title:d("todo.settings.localGroupDeleteTitle",{p0:v.name}),message:P.length?d("todo.settings.localGroupDeleteMoves",{count:P.length}):d("todo.settings.localGroupDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(P.map(R=>qs(R.id,void 0))),x(Bt().filter(R=>R.id!==v.id)))},z=[{value:"",label:d("todo.settings.localGroupNoParent")},...l.map(v=>({value:v.id,label:v.name,color:v.color}))];return o.createElement(n,{title:d("todo.settings.localGroups")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.localGroupsDesc")),i.length>0&&o.createElement("div",{className:"todo-settings-list todo-local-groups",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.localGroupName")),o.createElement("span",null,d("todo.settings.localGroupParent")),o.createElement("span",null)),i.map(v=>o.createElement("div",{role:"listitem",className:"todo-settings-item",key:v.id},o.createElement(t,{value:v.color,onChange:y=>x(i.map(P=>P.id===v.id?{...P,color:y}:P)),ariaLabel:d("todo.settings.localGroupColor",{p0:v.name})}),o.createElement(ea,{key:`name:${v.id}:${v.name}`,initial:v.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:y=>F(v,y)}),o.createElement(a,{value:v.parent??"",options:z,ariaLabel:d("todo.settings.localGroupParentOf",{p0:v.name}),onChange:y=>x(i.map(P=>{if(P.id!==v.id)return P;let{parent:Z,...R}=P;return y?{...R,parent:y}:R}))}),o.createElement(r,{ariaLabel:d("todo.settings.localGroupDelete",{p0:v.name}),title:d("todo.settings.localGroupDelete",{p0:v.name}),onClick:()=>{M(v)}},o.createElement(ht,null))))),o.createElement("div",{className:"todo-status-add"},o.createElement(ea,{key:`add:${c}`,initial:"",placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:v=>{p.current=v;let y=v.trim();y!==g&&(!y||!g)&&h(y)},onCommit:v=>{p.current=v,h(v.trim())}}),o.createElement(e,{type:"button",disabled:!g||i.length>=Zr,onClick:k},d("todo.settings.localGroupAdd"))))}function sc({section:e}){return e==="statuses"?o.createElement(Ef,null):e==="lists"?o.createElement(o.Fragment,null,o.createElement(Sf,null),o.createElement(f.ui.settings.Section,null,o.createElement(f.ui.settings.GroupsEditor,null)),o.createElement(Cf,null)):o.createElement(Df,null)}var dc="reminder:";function lc(){let e=Ie();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(dc))return;let a=n??t.slice(dc.length).split(":")[0];Ye(e).then(i=>{e.assertActive();let s=i.find(l=>l.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var Pi=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Oi=e=>({type:"string",description:e});async function Mi(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function cc(e){return ca([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Pi({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await Mi(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Pi({title:Oi("Task title"),due:Oi("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Mi(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Pi({id:Oi("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Mi(e,"complete",{query:n},r)).title||n}".`}}])}function If(e){xs(e);let t=is(e),r=ds(),n=Os(),a=Ad(),i=!1,s=e.backend.on("records.eventDeliveryFailed",()=>{i||(i=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{i=!1}))});el();let l=e.workspace.onOpenOwnLink(z=>{Fn(z)});e.registerView("todo.panel",Ql),e.registerView("todo.file",ec),e.registerView("todo.page",tc),e.registerView("todo.settings",sc);let p=yd(e),c=bl(e),u=e.interop.services.provide(ua,cc(e)),g=Td(),h=ll(),m=e.interop.services.subscribe(Gt,()=>{}),x=e.interop.services.subscribe(Gt,()=>{}),k=ul(e),F=lc(),M=rd();return()=>{s(),t(),p(),c(),u(),g(),h(),m(),x(),k(),F(),M(),l(),n(),a(),r()}}var Nf={register:If},cT=Nf;export{cT as default,If as register};

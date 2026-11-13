var kt="valley";var Pf=`.${kt}`,Of=`app.${kt}`;function uc(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var pc=/^[a-zA-Z]:/;function Mo(e){if(typeof e!="string")return"";let o=uc(e);return!o||o==="."||pc.test(o)||o.split("/").some(r=>r==="..")?"":o}function zt(e){if(typeof e=="string")return Mo(e)||void 0}var Te=`.${kt}`,mc="plugins",_o=`${Te}/${mc}`,kr=`${_o}/packages`,zf=`${kr}/core`,Ff=`${kr}/github`,Gf=`${kr}/local`,$f=`${kr}/community`,Rf=`${_o}/community.json`,jf=`${_o}/data`;var Uf=`${_o}/enabled.json`,Kf=`${_o}/sources.json`,Vf=`${Te}/state`,Ee=`${Te}/settings`,Fi=`${Te}/data`,aa=`${Te}/recovery`;var ia=`${Te}/accounts`,so=`${Te}/ai`,Bf=`${so}/connections.json`,Hf=`${so}/defaults.json`,Wf=`${so}/budgets.json`,qf=`${so}/usage.sqlite`,Yf=`${so}/security/guards.json`,Xf=`${so}/security/activity.sqlite`,Zf=`${ia}/providers`,Jf=`${ia}/providers.lock.json`,fc=`${Te}/trash`,Qf=`${fc}/items`,sa=`${Te}/cache`,eg=`${sa}/accounts`,gc=`${sa}/search`,tg=`${sa}/providers`;var og=`${gc}/index.jsonl`,rg=`${aa}/drafts`,ng=`${aa}/transactions`,ag=`${aa}/retired`;var Tt="design",hc="themes",Gi=`${Te}/${Tt}/${hc}`,ig=`${Gi}/local`,sg=`${Gi}/community`,dg={app:`${Ee}/app.json`,appearance:`${Te}/${Tt}/appearance.json`,"icon-rail":`${Te}/${Tt}/icon-rail.json`,"footer-rail":`${Te}/${Tt}/footer-rail.json`,"plugin-startup":`${Te}/${Tt}/right-sidebar-startup.json`,"new-tab":`${Te}/${Tt}/new-tab.json`,pallette:`${Te}/${Tt}/palette.json`,group:`${Fi}/groups.json`,units:`${Fi}/units.json`,metadata:`${Ee}/file-viewers.json`,notification:`${Ee}/notification.json`,"notification-settings":`${Ee}/notification-settings.json`,preferences:`${Ee}/preferences.json`,"link-actions":`${Ee}/link-actions.json`,markdown:`${Ee}/markdown.json`,editor:`${Ee}/editor.json`,"editor-vim":`${Ee}/editor-vim.json`,"markdown-todo":`${Ee}/markdown-todo.json`,"markdown-codeblocks":`${Ee}/markdown-codeblocks.json`,"markdown-template":`${Ee}/markdown-template.json`,"markdown-embeed":`${Ee}/markdown-embeed.json`,files:`${Ee}/file.json`,"file-sorter":`${Ee}/file-sorter.json`,"file-sym-link":`${Ee}/file-sym-link.json`,search:`${Ee}/search.json`,"search-tag":`${Ee}/search-tag.json`,"search-content":`${Ee}/search-content.json`,design:`${Te}/${Tt}/appearance.json`,accounts:`${ia}/connections.json`};var $i=kt,Ri="open";var bc=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),ji=16384;var Ui=new Set(["__proto__","prototype","constructor"]);function Ki(e){let o=0;for(let r of e){let n=r.codePointAt(0);o+=n<=127?1:n<=2047?2:n<=65535?3:4}return o}function Tr(e){let o=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Ki(i)>ji)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||o.has(i))return;let c=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!c&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){o.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(b=>typeof b=="string"&&Ui.has(b)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(c){let b=u.length?.value;if(!Number.isSafeInteger(b)||b>8192)throw new Error("Bookmark state is too complex");return Array.from({length:b},(m,w)=>{let v=u[String(w)];return v&&"value"in v?n(v.value,s+1)??null:null})}let g={};for(let b of Object.keys(u).sort()){if(Ui.has(b))throw new Error("Invalid bookmark state key");let m=u[b];if(!m.enumerable||!("value"in m)){r++;continue}let w=n(m.value,s+1);w!==void 0&&(g[b]=w)}return g}finally{o.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Ki(JSON.stringify(a))>ji)throw new Error("Bookmark state is too large");return a}function Hi(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let o=Mo(e);if(!o)throw new Error("Invalid bookmark path");return o}function da(e,o,r){if(typeof e!="string"||e.length>o||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Vi(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function la(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let o=e;if(o.kind!=="plugin"||typeof o.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(o.pluginId)||!bc.has(o.surface))throw new Error("Invalid plugin bookmark target");if(o.instanceId!==void 0&&(typeof o.instanceId!="string"||o.instanceId.length>512))throw new Error("Invalid bookmark instance");if(o.itemId!==void 0&&(typeof o.itemId!="string"||!o.itemId||o.itemId.length>2048||/[\u0000-\u001f]/.test(o.itemId)))throw new Error("Invalid bookmark item");if(!o.state||typeof o.state!="object"||Array.isArray(o.state))throw new Error("Invalid bookmark state");let r=Tr(o.state);return r.path!==void 0&&(r.path=Hi(r.path)),{kind:"plugin",pluginId:o.pluginId,surface:o.surface,state:r,...o.instanceId===void 0?{}:{instanceId:o.instanceId},...o.itemId===void 0?{}:{itemId:o.itemId}}}var yc=/^[A-Za-z0-9_-]{1,64}$/;function Bi(e,o){if(typeof e!="string"||!yc.test(e))throw new Error(`Invalid bookmark ${o}`);return e}function Wi(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let o=e,r=da(o.title,512,"title"),n={...o.description===void 0?{}:{description:da(o.description,1024,"description")},...o.providerName===void 0?{}:{providerName:da(o.providerName,256,"provider name")},...typeof o.createdAt=="number"&&Number.isSafeInteger(o.createdAt)&&o.createdAt>=0?{createdAt:o.createdAt}:{}},a=o.group===void 0?{}:{group:Bi(o.group,"group")};if(o.groupId!==void 0){let c=Bi(o.groupId,"group id");if(!r||o.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(o.target!==void 0){let c={folderPath:"",title:r,target:la(o.target),...n,...a};return{...c,searchText:Vi(c)}}if(typeof o.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:Hi(o.folderPath),title:r,...n,...a};return{...s,searchText:Vi(s)}}function Ft(e){let o=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++o>2048||s>32||!r(i)||typeof i.type!="string")return!1;let c=(...p)=>Object.keys(i).every(l=>l==="type"||p.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,s+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,s+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,l])=>n(p)&&a(l,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Sr(e,o,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,c,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return c===null;if(s.type==="literal")return c===s.value;if(s.type==="union")return s.anyOf.some(l=>i(l,c,p+1));if(s.type==="number")return typeof c=="number"&&Number.isFinite(c);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof c===s.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return s.type==="array"?Array.isArray(c)&&c.length<=(s.maxItems??1e5)&&c.every(l=>i(s.items,l,p+1)):s.type==="tuple"?Array.isArray(c)&&c.length>=(s.minItems??s.items.length)&&c.length<=s.items.length&&c.every((l,u)=>i(s.items[u],l,p+1)):s.type==="object"?Array.isArray(c)||s.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,u])=>Object.hasOwn(s.properties,l)?i(s.properties[l],u,p+1):s.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,o,0)}var wc=new Map;function fe(e,o,r,n,a,i,s,c,p="owner"){let l=Object.freeze({id:e,kind:o,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:s,serviceMetadata:c});return wc.set(`${o}:${e}@${r}`,l),l}var ua=256;function pa(e){let o=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=o.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var ne=e=>!!e&&typeof e=="object"&&!Array.isArray(e),he=(e,o)=>typeof e[o]=="function",Gt=e=>e===void 0,lo=e=>typeof e=="boolean",se=e=>typeof e=="string",ze=e=>e===void 0||se(e),vc=e=>e===void 0||typeof e=="number",xc=e=>e===void 0||typeof e=="boolean",pe=(e,o)=>e.length===o.length&&o.every((r,n)=>r(e[n])),Oe=e=>ne(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),qi=e=>ne(e),Xi=e=>ne(e)&&se(e.id)&&se(e.title)&&se(e.date)&&(e.documentRef===void 0||ne(e.documentRef)&&se(e.documentRef.pluginId)&&se(e.documentRef.sourceId)&&se(e.documentRef.itemId)),kc=e=>ne(e)&&se(e.date)&&ze(e.startTime)&&ze(e.endTime)&&ze(e.sourceId)&&ze(e.itemId),Tc=e=>ne(e)&&se(e.url)&&ze(e.title)&&xc(e.newTab),Sc=e=>ne(e)&&se(e.query),Zi=e=>ne(e)&&se(e.name)&&ze(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ac=e=>Array.isArray(e)&&e.every(Zi),Ec=e=>e===null||Zi(e),Dc=e=>e===void 0||ne(e)&&ze(e.approvalToken)&&(e.cancellation===void 0||ne(e.cancellation)),Cc=e=>typeof e=="string"||ne(e)&&typeof e.text=="string",Ic=e=>ne(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&ne(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&ze(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ji=e=>ne(e)&&se(e.id)&&se(e.label)&&ze(e.labelKey)&&ze(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ji)),Qi={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Xi)},create:{args:e=>pe(e,[se,qi]),result:lo},update:{args:e=>pe(e,[se,qi]),result:lo},remove:{args:e=>pe(e,[se]),result:lo},open:{args:e=>pe(e,[se]),result:Gt},configure:{args:e=>e.length===0,result:Gt},actions:{args:e=>pe(e,[se]),result:e=>Array.isArray(e)&&e.every(Ji)},runAction:{args:e=>pe(e,[se,se]),result:lo}},es=e=>ne(e)&&se(e.name)&&se(e.version)&&ze(e.description)&&ze(e.author)&&(e.localized===void 0||ne(e.localized)&&Object.values(e.localized).every(o=>ne(o)&&se(o.name)&&ze(o.description))),Nc=fe("calendar.itemSource","service","1.3.0","many",e=>ne(e)&&he(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,Qi,e=>e.integration),Ar=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,ca=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Lc=e=>ne(e)&&Ar(e.startDate)&&Ar(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=ua&&(e.cursor===void 0||ca(e.cursor)),Pc=e=>ne(e)&&ca(e.revision)&&(e.cursor===void 0||ca(e.cursor))&&Array.isArray(e.items)&&e.items.length<=ua&&e.items.every(o=>Xi(o)&&Ar(o.date)&&(o.endDate===void 0||Ar(o.endDate)&&o.endDate>=o.date))&&new Set(e.items.map(o=>o.id)).size===e.items.length,$t=fe("calendar.itemSource","service","2.0.0","many",e=>ne(e)&&he(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,{...Qi,list:{args:e=>pe(e,[Lc]),result:Pc}},e=>e.integration),zo=fe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Oc=fe("calendar.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"openDate"),void 0,{openDate:{args:e=>pe(e,[kc]),result:Gt}}),Er=fe("calendar.panelSelection","state","1.0.0","one",e=>ne(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Mc=fe("web.activeContext","state","1.0.0","one",e=>ne(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Yi(e){return ne(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(o=>ne(o)&&typeof o.address=="string"&&(o.label===void 0||typeof o.label=="string"))}var _c=fe("contacts.directory","service","1.0.0","one",e=>ne(e)&&["search","resolveEmails","open"].every(o=>he(e,o)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Yi)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(o=>typeof o=="string"&&o.length<=1e3),result:e=>Array.isArray(e)&&e.every(o=>ne(o)&&typeof o.address=="string"&&Array.isArray(o.contacts)&&o.contacts.every(Yi))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||ne(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Gt}}),zc=fe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Fc=fe("web.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"open"),void 0,{open:{args:e=>pe(e,[Tc]),result:Gt}}),Gc=fe("selection.textAction","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&he(e,"run"),e=>[e.id]),$c=fe("geo.navigator","service","1.0.0","one",e=>ne(e)&&he(e,"open"),void 0,{open:{args:e=>pe(e,[Sc]),result:Gt}}),Rc=fe("geo.search","service","1.0.0","one",e=>ne(e)&&he(e,"search")&&he(e,"reverse"),void 0,{search:{args:e=>pe(e,[se]),result:Ac},reverse:{args:e=>pe(e,[o=>Number.isFinite(o),o=>Number.isFinite(o)]),result:Ec}}),ma=fe("agent.toolProvider","service","1.0.0","many",e=>ne(e)&&Array.isArray(e.tools)&&e.tools.every(Ic)&&he(e,"execute"),e=>e.tools.map(o=>o.name),{execute:{args:e=>pe(e,[se,ne,Dc]),result:Cc}},e=>({tools:e.tools}),"global"),jc=fe("guard.runtime","service","1.0.0","one",e=>ne(e)&&["resolve","requestApproval","consumeToken","audit"].every(o=>he(e,o)),void 0,{resolve:{args:e=>pe(e,[ne]),result:ne},requestApproval:{args:e=>pe(e,[ne]),result:lo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&se(e[0])&&ze(e[1]),result:lo},audit:{args:e=>pe(e,[ne]),result:Gt}}),Uc=fe("browser.automation","service","1.0.0","one",e=>ne(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(o=>he(e,o)),void 0,{list:{args:e=>e.length===0,result:Oe},open:{args:e=>pe(e,[se]),result:Oe},switch:{args:e=>pe(e,[se]),result:Oe},close:{args:e=>pe(e,[se]),result:Oe},snapshot:{args:e=>pe(e,[se]),result:Oe},readText:{args:e=>e.length>=1&&e.length<=2&&se(e[0])&&vc(e[1]),result:Oe},readHtml:{args:e=>pe(e,[se]),result:Oe},screenshot:{args:e=>pe(e,[se]),result:Oe},click:{args:e=>pe(e,[se,o=>typeof o=="number"]),result:Oe},type:{args:e=>e.length>=3&&e.length<=4&&se(e[0])&&typeof e[1]=="number"&&se(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Oe},select:{args:e=>pe(e,[se,o=>typeof o=="number",se]),result:Oe},scroll:{args:e=>pe(e,[se,o=>typeof o=="number",o=>typeof o=="number"]),result:Oe},pressKey:{args:e=>pe(e,[se,se]),result:Oe},navigate:{args:e=>pe(e,[se,se]),result:Oe},back:{args:e=>pe(e,[se]),result:Oe},forward:{args:e=>pe(e,[se]),result:Oe},reload:{args:e=>pe(e,[se]),result:Oe}}),Kc=fe("fileTree.contextItem","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.label=="string"&&ze(e.labelKey)&&he(e,"run"),e=>[e.id]),Vc=fe("newTab.entry","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"run"),e=>[e.id]),fa=fe("search.resultAction","extension","1.0.0","many",e=>ne(e)&&typeof e.cardKind=="string"&&he(e,"open"),e=>[e.cardKind]),Bc=fe("search.resultCard","extension","1.0.0","many",e=>ne(e)&&typeof e.cardKind=="string"&&he(e,"render")&&he(e,"open"),e=>[e.cardKind]),Dr=fe("metadataPanel.segment","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"render"),e=>[e.id]),ga=fe("workspace.surface","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&he(e,"getSnapshot")&&he(e,"subscribe")&&he(e,"restore"),e=>[e.id]),Hc=fe("metadata.plugin","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"facts"),e=>[e.id]),Wc=fe("workspace.viewState","extension","1.0.0","many",e=>ne(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&he(e,"capture")&&he(e,"restore")&&he(e,"subscribe"),e=>[e.id]);var Cr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let o=Object.getPrototypeOf(e);if(o!==null&&(Object.getPrototypeOf(o)!==null||typeof Object.getOwnPropertyDescriptor(o,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(o,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},ha=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),ts=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),os=e=>ha(e)&&typeof e.surface=="string"&&ts.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Fo(e){let o=Cr(e);if(!os(o))throw new Error("Invalid bookmark descriptor");let r=la({kind:"plugin",pluginId:"provider",surface:o.surface,instanceId:o.instanceId,itemId:o.itemId,state:o.state}),n=Wi({folderPath:"",title:o.title,description:o.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function ba(e){try{let o=Fo(e),r=Cr(e);return JSON.stringify(o.state)===JSON.stringify(Tr(r.state))}catch{return!1}}function qc(e){try{let o=Cr(e);if(o.status==="unavailable"||o.status==="invalid")return{status:o.status};if(o.status==="ready")return{status:"ready",bookmark:Fo(o.bookmark)}}catch{}return{status:"invalid"}}var Yc=e=>{try{let o=Cr(e);return o.status==="unavailable"||o.status==="invalid"||o.status==="ready"&&ba(o.bookmark)}catch{return!1}},Xc=e=>ha(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),rs=fe("workspace.bookmark","service","1.0.0","many",e=>ha(e)&&typeof e.id=="string"&&ts.has(String(e.surface))&&Ft(e.stateSchema)&&(e.itemStateSchema===void 0||Ft(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&os(e[0]),result:Yc,sanitizeResult:qc},restore:{args:e=>e.length===1&&ba(e[0]),result:Xc}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function ya(e,o,r){if(!Ft(r.stateSchema)||r.itemStateSchema!==void 0&&!Ft(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,u,g=!1)=>Sr(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,u)),i=(l,u,g)=>{let b=g?void 0:r.primary?r.primary(l):l.item,m=Tr(b?.state??l.view);if(!a(m,u,!!b))throw new Error("Invalid bookmark state");return Fo({...u,title:b?.title??l.title,description:r.description(l,!!b),state:m,...b?{itemId:b.id}:{}})},s={id:o.id,surface:o.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==o.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(o.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==o.surface)return{status:"unavailable"};let u;try{if(u=Fo(l),!a(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await o.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(rs,s),p;try{p=e.interop.extensions.provide(ga,{...o,getSnapshot(l){let u=o.getSnapshot(l),g={surface:o.surface,...l===void 0?{}:{instanceId:l}},b,m;try{b=i(u,g,!1)}catch{}try{m=i(u,g,!0)}catch{}return{...u,bookmark:b,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,p(),c()}}var Go=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ns=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function as(e){if(!Go(e)||!ns(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let o=new Set;for(let r of e.items){if(!Go(r)||!ns(r.id)||o.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;o.add(r.id)}if(e.automation!==void 0){if(!Go(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!Go(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!o.has(r)||!Go(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&o.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var Zc=fe("workspace.details","extension","1.0.0","many",as,e=>[`provider:${e.id}`,...e.items.map(o=>`item:${o.id}`)]);var Gg=[Te,`${Te}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Jg=1024*1024;var th=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var oh=globalThis.Buffer;var Qc=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var t,f,Ir=new Map,Nr;function Ne(){return Nr}function Lr(e,o){let r=Ir.get(e)??new Set;return r.add(o),Ir.set(e,r),()=>{r.delete(o),r.size||Ir.delete(e)}}function is(e){Nr?.dispose(),f=e,t=e.React;let o=!0,r=new Set;return Nr={api:e,assertActive:()=>{if(!o)throw new Error("To-Do read scope disposed")},onDispose:n=>(o?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(o){o=!1;for(let n of r)n();r.clear()}}},Nr.dispose}var eu=1800;function co(e){let o=Me();t.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=u=>{if(u.mode==="create")return;i=u.nonce,u.mode==="edit"&&(o.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,b=()=>{if(r=null,i!==u.nonce)return;let m=[...Ir.get(u.todoId)??[]].find(w=>w.isConnected);if(!m){Date.now()<g?r=setTimeout(b,40):o.get()?.nonce===u.nonce&&o.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(s,eu),o.get()?.nonce===u.nonce&&o.clear()};r=setTimeout(b,0)},p=o.subscribe(()=>{let u=o.get();u&&c(u)}),l=o.get();return l&&c(l),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[o,e])}function Me(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,o=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},o()},clear:()=>{r.value&&(r.value=null,o())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function ss(){Me().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var tu=`
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

`,ou=`/* Groups lists: the shared Groups editor and every plugin's own-group editor.
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
`,wa="notes-todo-styles";function ds(){let e=document.getElementById(wa);return e||(e=document.createElement("style"),e.id=wa,document.head.appendChild(e)),e.textContent=tu+ou,()=>{document.getElementById(wa)===e&&e.remove()}}var de="#12120f",ge="#ffffff",xa=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:de,onDark:de},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ge,onDark:ge},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:de,onDark:de},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ge,onDark:de},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:de,onDark:de},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ge,onDark:de},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ge,onDark:de},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ge,onDark:de},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ge,onDark:de},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ge,onDark:ge},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:de,onDark:de},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ge,onDark:de},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ge,onDark:de},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:de,onDark:de},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ge,onDark:de},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ge,onDark:de},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ge,onDark:de},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ge,onDark:de},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:de,onDark:de},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:de,onDark:de},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ge,onDark:de},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ge,onDark:de},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ge,onDark:de},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ge,onDark:de},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ge,onDark:de},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ge,onDark:de},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:de,onDark:de},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:de,onDark:de},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ge,onDark:de},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:de,onDark:de},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ge,onDark:de},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ge,onDark:de},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:de,onDark:de},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ge,onDark:de},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ge,onDark:de},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ge,onDark:de}],ru=["semantic","muted","accent","categorical"];var Vh=new Map(xa.map(e=>[e.id,e])),nu={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},au=new Map(xa.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,o=>o.toUpperCase())])),iu=/^[a-z][a-z0-9-]{0,47}$/,su={version:4,families:ru.map(e=>({id:e,name:nu[e]})),colors:xa.map(e=>({id:e.id,familyId:e.family,name:au.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},du=e=>({version:4,families:e.families.map(o=>({...o})),colors:e.colors.map(o=>({...o})),archived:e.archived.map(o=>({...o}))});var lu=du(su);function ls(){return lu}var va=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Pr="palette:",cu=/^#[0-9a-f]{6}$/i;function Or(e){return e.startsWith(Pr)&&iu.test(e.slice(Pr.length))}function ye(e){return`${Pr}${e}`}function $o(e){return Or(e)?e.slice(Pr.length):void 0}function cs(e){if(typeof e!="string")return;let o=e.trim();return Or(o)?o:cu.test(o)?o.toLowerCase():void 0}function Se(e){let o=$o(e);return o?`var(--color-${o})`:e}function St(e){let o=$o(e);return o?`var(--color-${o}-on)`:"var(--title-color)"}function ka(e){let o=new Set(e.map(r=>$o(r)??r.toLowerCase()));return ye(va.find(r=>!o.has(r))??va[0])}function us(e){let o=0;for(let n=0;n<e.length;n+=1)o=o*31+e.charCodeAt(n)|0;let r=va;return ye(r[Math.abs(o)%r.length])}function Q(e){return e.trim().toLowerCase()}function uu(e,o,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=Q(i);!s||s===Q(o)||r.has(s)||(r.add(s),n.push(i))}return n}function ps(e){return`group_${Q(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Rt(e){if(!Array.isArray(e))return[];let o=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=Q(i);if(!i||r.has(s))continue;r.add(s);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():ps(i),p=cs(a.color)??ka(o.map(u=>u.color)),l=uu(a.aliases,i,r);o.push({id:c,name:i,color:p,...l.length?{aliases:l}:{}})}return o}function Ro(e,o){let r=Q(o??"");if(r)return e.find(n=>Q(n.name)===r||(n.aliases??[]).some(a=>Q(a)===r))}function Mr(e,o){return Ro(o,e)?.name}function De(e,o){let r=Q(e??"");return r?Ro(o,e)?.color??us(r):ye("primary-blue")}function _r(e){return ka(e.map(o=>o.color))}function Ta(e){let o={};for(let r of e){let n=Q(r??"");n&&(o[n]=(o[n]??0)+1)}return o}var ms={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists","todo.settings.section.statuses":"Statuses","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do groups","todo.settings.localGroupsDesc":"Groups only To-Do uses, beside the shared groups above.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupRemove":"Remove group","todo.settings.localGroupRemoveBlocked":"Still used by {{count}} tasks \u2014 move them to another group to delete it","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.settings.localGroupUsage":"{{count}} tasks use this group","todo.settings.localGroupNewColor":"Color of the new group","todo.settings.localGroupDuplicate":"A group with that name already exists.","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59)."};var fs={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen","todo.settings.section.statuses":"Status","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"To-Do-Gruppen","todo.settings.localGroupsDesc":"Gruppen nur f\xFCr To-Do, neben den geteilten Gruppen oben.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupRemove":"Gruppe entfernen","todo.settings.localGroupRemoveBlocked":"Wird noch von {{count}} Aufgaben verwendet \u2014 Aufgaben zuerst in eine andere Gruppe verschieben","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.settings.localGroupUsage":"{{count}} Aufgaben verwenden diese Gruppe","todo.settings.localGroupNewColor":"Farbe der neuen Gruppe","todo.settings.localGroupDuplicate":"Eine Gruppe mit diesem Namen existiert bereits.","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59)."};var gs={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas","todo.settings.section.statuses":"Estados","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos de To-Do","todo.settings.localGroupsDesc":"Grupos solo de To-Do, junto a los grupos compartidos de arriba.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupRemove":"Quitar grupo","todo.settings.localGroupRemoveBlocked":"Todav\xEDa lo usan {{count}} tareas: mu\xE9velas a otro grupo para eliminarlo","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.settings.localGroupUsage":"{{count}} tareas usan este grupo","todo.settings.localGroupNewColor":"Color del nuevo grupo","todo.settings.localGroupDuplicate":"Ya existe un grupo con ese nombre.","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59)."};var hs={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes","todo.settings.section.statuses":"Statuts","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes To-Do","todo.settings.localGroupsDesc":"Groupes propres \xE0 To-Do, \xE0 c\xF4t\xE9 des groupes partag\xE9s ci-dessus.","todo.settings.localGroupName":"Nom","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupRemove":"Supprimer le groupe","todo.settings.localGroupRemoveBlocked":"Encore utilis\xE9 par {{count}} t\xE2ches \u2014 d\xE9placez-les dans un autre groupe pour le supprimer","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.settings.localGroupUsage":"{{count}} t\xE2ches utilisent ce groupe","todo.settings.localGroupNewColor":"Couleur du nouveau groupe","todo.settings.localGroupDuplicate":"Un groupe portant ce nom existe d\xE9j\xE0.","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59)."};var bs={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868","todo.settings.section.statuses":"\u72B6\u6001","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5F85\u529E\u4F7F\u7528\u7684\u5206\u7EC4\uFF0C\u4E0E\u4E0A\u65B9\u7684\u5171\u4EAB\u5206\u7EC4\u5E76\u5217\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupRemove":"\u79FB\u9664\u5206\u7EC4","todo.settings.localGroupRemoveBlocked":"\u4ECD\u6709 {{count}} \u4E2A\u4EFB\u52A1\u5728\u4F7F\u7528 \u2014 \u5C06\u5B83\u4EEC\u79FB\u5230\u5176\u4ED6\u5206\u7EC4\u540E\u624D\u80FD\u5220\u9664","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupUsage":"{{count}} \u4E2A\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4","todo.settings.localGroupNewColor":"\u65B0\u5206\u7EC4\u7684\u989C\u8272","todo.settings.localGroupDuplicate":"\u5DF2\u5B58\u5728\u540C\u540D\u5206\u7EC4\u3002","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002"};var ys={en:ms,de:fs,es:gs,fr:hs,"zh-CN":bs};function ws(e,o){return(ys.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(o?.[a]??""))}var vs=ws;function xs(e){e.ui.registerCatalogs(ys),vs=(o,r)=>{let n=e.ui.t(o,r);return n===o?ws(o,r):n}}function d(e,o){return vs(e,o)}var ks={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},bu={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},yu={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},Ts=()=>{};function Ss(e){Ts=e}function As(e){let o=ks[e];return o?d(o):e}function et(e,o=""){if(e===null||e==="open")return d("todo.status.todo");let r=Ts(e);if(r)return r;let n=ks[e];return n?d(n):o||e}function Ye(e){return d(bu[e])}function Es(e){return d(yu[e])}var wu=["auto","white","black"],Fr=40,Gr=40,vu=["completed","canceled"],Cs="statuses",Ko=[{id:"open",labelKey:"todo.status.todo",color:ye("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ye("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ye("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ye("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ye("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ye("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ye("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ye("red"),done:!0,cls:"todo-st-canceled",locked:!1}],Sa=ye("teal");var Aa=Ko.map(e=>e.id),jo=Ko.filter(e=>!e.locked).map(e=>e.id),db=Ko.filter(e=>e.done).map(e=>e.id),Uo=new Map(Ko.map(e=>[e.id,e])),Ds=new Set(jo);function dt(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function Is(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function xu(e){if(typeof e!="string"||!Or(e))return!1;let o=$o(e);if(!o)return!1;let r=ls();return r.colors.some(n=>n.id===o)||r.archived.some(n=>n.id===o)}function ku(e){if(!Array.isArray(e))return[];let o=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Gr):"";if(!(!dt(a.id)||o.has(a.id)||!i)&&(o.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=Fr))break}return r}function $r(e){let o=e&&typeof e=="object"?e:{},r=ku(o.custom),n=new Set(r.map(y=>y.id)),a=Array.isArray(o.active)?o.active:jo,i=[];for(let y of a)typeof y!="string"||!(Ds.has(y)||n.has(y))||i.includes(y)||i.push(y);let s=[...Aa,...r.map(y=>y.id)],c=y=>y&&typeof y=="object"?y:{},p=c(o.colors),l=Object.fromEntries(s.map(y=>{let D=Uo.get(y)?.color??Sa;return[y,xu(p[y])?p[y]:D]})),u=c(o.textColors),g=Object.fromEntries(s.map(y=>[y,wu.includes(u[y])?u[y]:"auto"])),b=c(o.strikethrough),m=Object.fromEntries(s.map(y=>[y,typeof b[y]=="boolean"?b[y]:vu.includes(y)||r.some(D=>D.id===y&&D.done)])),w="text",v=(y,D)=>typeof y=="string"?y.replace(/[\u0000-\u001f]/g," ").trim().slice(0,D):"",F=(Array.isArray(o.removed)?o.removed:[]).filter(y=>typeof y=="string"&&Ds.has(y)),_=Object.fromEntries(s.map(y=>[y,v(c(o.labels)[y],Gr)]).filter(([,y])=>y)),L=Object.fromEntries(s.filter(y=>y!=="open"&&y!=="completed").map(y=>[y,v(c(o.icons)[y],80)]).filter(([,y])=>y&&/^[^/\\]+$/.test(y))),A=Object.fromEntries(jo.map(y=>[y,c(o.done)[y]]).filter(([y,D])=>typeof D=="boolean"&&D!==Uo.get(y)?.done));return{active:i.filter(y=>!F.includes(y)),custom:r,colors:l,textColors:g,strikethrough:m,style:w,labels:_,icons:L,done:A,removed:[...new Set(F)]}}function $e(){return $r(f?.settings.get()[Cs])}function Ns(e){f.settings.set(Cs,$r(e))}Ss(e=>{let o=$e();return o.labels[e]??o.custom.find(r=>r.id===e)?.label});function jt(e=$e()){return[...Aa,...e.custom.map(o=>o.id)]}function uo(e,o=$e()){return Uo.has(e)?o.done?.[e]??Uo.get(e).done:o.custom.some(r=>r.id===e&&r.done)}function Tu(e){return`todo-st-${e}`}function Su(e,o=$e()){let r=o.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":St(o.colors[e]??Sa)}function Ae(e,o=$e()){let r=e&&dt(e)?o.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:o.colors[r.id]??Sa,done:r.done,cls:Tu(r.id),locked:!1,custom:!0};let n=e&&Uo.get(e)||Ko[0];return{...n,label:o.labels[n.id]??et(n.id),done:o.done[n.id]??n.done,color:o.colors[n.id],custom:!1}}function zr(e=$e()){return[Ae("open",e),Ae("completed",e),...e.active.map(o=>Ae(o,e))]}function po(){return zr().map(e=>e.id)}function Ls(e){return e==="open"||e==="completed"||$e().active.includes(e)}function lt(){let[e,o]=t.useState(()=>zr());return t.useEffect(()=>f.settings.subscribe(()=>o(zr())),[]),e}function mo(e,o=po()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=o.filter(a=>r.includes(a));return n.length?n:"all"}function fo(e,o){return o==="all"||o.includes(_e(e))}function Rr(e){if(typeof e=="string")return Aa.includes(e)||dt(e)?e:void 0}function _e(e){return e.status??(e.completed?"completed":"open")}function Ce(e,o){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:uo(e,o),status:e}}function ct(){return zr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:Se(e.color)}))}function Au(){let e=$e();return jt(e).map(o=>{let r=Ae(o,e),n=Se(r.color),a=Su(o,e),i=e.strikethrough[o]?`.todo-row[data-status="${o}"] h4 .todo-title-md,.todo-table-row[data-status="${o}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${o}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${o}"]{background:${n};color:${a}}`+i}).join("")}function Ps(){let[e,o]=t.useState(()=>$e().style);return t.useEffect(()=>f.settings.subscribe(()=>o($e().style)),[]),e}function Os(){let e="notes-todo-status-palette",o=document.getElementById(e);o||(o=document.createElement("style"),o.id=e,document.head.appendChild(o)),o.dataset.todoStatusPalette="true";let r=()=>{o.textContent=Au()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===o&&o.remove()}}async function Ms(e,o,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<o.length;i+=20){let s=o.slice(i,i+20),c=new Map;for(;s.length;){r();let p=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(u=>({to:u,from:{in:jt().filter(g=>g!==u)}})),...c.size?{and:[{or:s.map(u=>({taskId:u,position:{lt:c.get(u)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let l=await a.query({select:["taskId","changedAt"],where:{or:p.map(u=>({taskId:u.taskId,position:u.position}))},limit:20});r(),s=[];for(let u of l.rows){let g=String(u.taskId);if(typeof u.changedAt=="string"&&u.changedAt)n.set(g,{changedAt:u.changedAt});else{let b=p.find(m=>m.taskId===g)?.position;if(typeof b!="number"||!Number.isInteger(b))throw new Error("Invalid completion position");c.set(g,b),s.push(g)}}}}return n}function Vo(e){return"historyLoaded"in e&&e.historyLoaded===!1}function Fe(e,o=""){return typeof e=="string"?e:o}function jr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ur(e){let o=Fe(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(o)?o:void 0}function _s(e){let o=Fe(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(o)?o:void 0}var Eu=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],fb=Object.fromEntries(Eu.map(e=>[e,{destination:"ask",recognize:!0}]));var Du=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",kt]);function Cu(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function Ea(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let o=Cu(e);if(!o||Du.has(o)||o.startsWith(`${kt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(o)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(o)?"website":o==="mailto"?"email":["geo","maps"].includes(o)?"location":["tel","callto"].includes(o)?"phone":["sms","smsto"].includes(o)?"sms":["webcal","webcals"].includes(o)?"subscription":"app",value:e}}var Iu=16384,Nu=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Lu(e){if(!e||e.length>Iu||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let o=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(o),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function Pu(e){try{let o=new URL(e);if(o.protocol!==`${$i}:`||o.hostname!==Ri)return null;let r=o.searchParams.get("realm")??"",n=Mo(o.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=o.searchParams.get("plugin")??"";if(!Nu.test(a))return null;let i=Lu(o.searchParams.get("state")??""),s=o.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let c=o.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function go(e){let o=Pu(e);return o?.kind==="file"?o.relPath:null}function zs(e){return Ea(e)!==null}function Ut(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Ou=["normal","low","medium","high"];function Fs(e){return e===!0}function Mu(e){return typeof e=="string"&&Ou.includes(e)?e:"normal"}function Kr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Gs(e){return Array.isArray(e)?e.filter(o=>jr(o)).map(o=>({startedAt:Fe(o.startedAt),endedAt:Fe(o.endedAt),activeMinutes:Kr(o.activeMinutes)??0,pauseMinutes:Kr(o.pauseMinutes)??0})).filter(o=>o.startedAt&&o.endedAt):[]}function Da(e){return Array.isArray(e)?e.filter(o=>jr(o)).map(o=>({from:Rr(o.from),to:Rr(o.to),changedAt:Fe(o.changedAt)})).filter(o=>!!o.from&&!!o.to&&!!o.changedAt&&o.from!==o.to):[]}function _u(e){if(typeof e!="string")return;let o=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(o)?o:void 0}function Vr(e){if(typeof e!="string")return;let o=e.trim();if(o)return go(o)||zs(o)?o:void 0}function zu(e){let o=Array.isArray(e)?e:[],r=[...new Set(o.map(n=>Vr(n)).filter(n=>!!n))];return r.length?r:void 0}function Fu(e){if(!Array.isArray(e))return;let o=[...new Set(e.map(r=>zt(r)).filter(r=>!!r))];return o.length?o:void 0}function Gu(e){if(!jr(e))return;let o=Fe(e.name).trim();if(!o)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:o,lng:r,lat:n}:{name:o}}function Bo(e){let o=new Date().toISOString(),r=Fe(e.id,Ut("todo")),n=Fe(e.createdAt,o),a=Gs(e.history),i=Da(e.statusHistory),s=Rr(dt(e.customStatus)?e.customStatus:e.status);return{id:r,title:Fe(e.title).trim(),completed:Fs(e.completed)||s==="completed"||s==="canceled",priority:Mu(e.priority),dueDate:Fe(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:Ur(e.reminderTime),startTime:Ur(e.startTime),endTime:Ur(e.endTime),color:_s(e.color),note:Fe(e.note),tags:Array.isArray(e.tags)?e.tags.filter(c=>typeof c=="string"&&!!c.trim()).map(c=>c.trim()):[],estimatedMinutes:Kr(e.estimatedMinutes),actualMinutes:Kr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:zt(e.filePath),group:Fe(e.group).trim()||void 0,flagged:Fs(e.flagged)||void 0,urls:zu(e.urls),attachments:Fu(e.attachments),location:Gu(e.location),remindAt:_u(e.remindAt),reminderFiredAt:Fe(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Fe(e.updatedAt,n)}}function Ca(e,o,r){let n=(l,u=!1)=>{let g=new Map;for(let b of l){let m=g.get(b.taskId);m?m.push(b):g.set(b.taskId,[b])}if(u)for(let b of g.values())b.sort((m,w)=>Number(m.position)-Number(w.position));return g},a=n(o.tags),i=n(o.links,!0),s=n(o.attachments,!0),c=n(o.sessions,!0),p=n(o.statusHistory,!0);return e.map(l=>Bo({...l,tags:(a.get(l.id)??[]).map(u=>u.tag),urls:(i.get(l.id)??[]).map(u=>u.url),attachments:(s.get(l.id)??[]).map(u=>u.path),history:c.get(l.id)??[],statusHistory:p.get(l.id)??[]})).map(l=>({...l,group:Mr(l.group,r)??l.group})).filter(l=>l.title)}var Br="todo.tasks",Pa="todo.task_tags",Oa="todo.task_links",Ma="todo.task_attachments",Us="todo.focus_sessions",ho="todo.status_history",Ho=[Br,Pa,Oa,Ma],$u=[...Ho,Us,ho],_a=[...Ho,ho];function Ru(e,o){let r=Ne(),n=e.map(s=>r.api.data.dataset(s).subscribe(o)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function Et(e){return Ru(_a,e)}function Ks(e){let o=Ho.map(r=>f.data.dataset(r).subscribe(e));return()=>o.forEach(r=>r())}async function At(e,o,r=Ne()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:o,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function ju(e,o=!0,r=!0,n=Ne()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?At(Pa,a,n):[],At(Oa,a,n),At(Ma,a,n),o?At(Us,a,n):[],o?At(ho,a,n):[]]),[s,c,p,l,u]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:s,links:c,attachments:p,sessions:l,statusHistory:u}}async function La(e,o,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([At(Br,n,e),ju(r,o,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),Ca(a.value,i.value,Rt(e.api.getState().groups))}var $s=new WeakMap;function Hr(e,o,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=$s.get(e);i||(i=new Map,$s.set(e,i));let s=i.get(o);if(!s){s={revision:0,pending:new Map};let p=s,l=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{l.forEach(u=>u()),i.clear()}),i.set(o,s)}let c=s.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,l=await a();if(e.assertActive(),p===s.revision)return l}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,c)),c}function Vs(e,o){let r=Ne();return Hr(r,e?"full":"calendar",e?$u:Ho,o??"",()=>La(r,e,o))}var Bs=200;function Uu(e,o){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Bs)return null;let n=o===Br?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var Ia=new WeakMap;function Ku(e){let o=Ia.get(e);if(o)return o;let r={dirty:new Set,full:!0},n=_a.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=i?Uu(i,a):null;if(!s){r.full=!0,r.dirty.clear();return}for(let c of s)r.dirty.add(c);r.dirty.size>Bs&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Ia.delete(e)}),Ia.set(e,r),o=r,o}async function Rs(e,o){let r;if(!o)r=await La(e,!1);else{r=[];for(let a=0;a<o.length;a+=100)r.push(...await La(e,!1,o.slice(a,a+100)))}let n=await Ms(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function Xe(e=Ne()){let o=Ku(e);return Hr(e,"list",_a,"",async()=>{let r=JSON.stringify(Rt(e.api.getState().groups));if(o.full||!o.value||o.groups!==r){o.full=!1,o.dirty.clear();try{o.value=await Rs(e),o.groups=r}catch(p){throw o.full=!0,p}return o.value}if(!o.dirty.size)return o.value;let n=[...o.dirty];o.dirty.clear();let a;try{a=await Rs(e,n)}catch(p){for(let l of n)o.dirty.add(l);throw p}let i=new Map(a.map(p=>[p.id,p])),s=new Set(n),c=[];for(let p of o.value)if(!s.has(p.id))c.push(p);else{let l=i.get(p.id);l&&(c.push(l),i.delete(p.id))}return c.push(...i.values()),o.value=c,c})}var js=new WeakMap,Vu=0;function Bu(e,o){let r=js.get(e);r||(r=new Map,js.set(e,r));let n=r.get(o);if(!n){let s={users:0,key:String(++Vu),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(o,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(o))}}}function Hu(e,o,r){return Hr(e,"statusHistory",[ho],r.key,async()=>{let n=await At(ho,{taskId:o},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Da(n)})}function Hs(e){let o=Ne(),[r,n]=t.useState(null);return t.useEffect(()=>{let{reader:a,release:i}=Bu(o,e),s=0,c=!1,p=()=>{let b=++s;Hu(o,e,a).then(m=>{!c&&b===s&&n({scope:o,id:e,history:m})}).catch(()=>{})},l=o.api.data.dataset(ho).subscribe(b=>{(!b.keys||b.keys.some(m=>m.taskId===e))&&p()}),u=()=>{c=!0,l(),i()},g=o.onDispose(u);return p(),()=>{g(),u()}},[e,o]),r?.id===e&&r.scope===o?r.history:[]}function Dt(){return Vs(!0)}async function tt(e){return e?(await Vs(!0,e))[0]??null:null}function Ws(e,o,r,n){let a=Ne();return Hr(a,"calendarPage",Ho,JSON.stringify([e,o,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(Br).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${o}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let b=[];for(let m=0;m<i.rows.length;m+=100)b.push(...await At(g,{taskId:{in:i.rows.slice(m,m+100).map(w=>String(w.id))}},a));return b},c=await Promise.allSettled([s(Pa),s(Oa),s(Ma)]),[p,l,u]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:Ca(i.rows,{tags:p,links:l,attachments:u,sessions:[],statusHistory:[]},Rt(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function Kt(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function za(e,o,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:o,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??o:null}catch{return null}}async function Na(e,o,r,n){return await za(e,o,r,n)!==null}function Fa(e,o,r){return za(e,o,r)}async function Wo(e,o){return await za(e,o,void 0,void 0,!0)!==null}async function Vt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function Wr(e){if(!e.id||!e.title.trim())return!1;let o=await Kt(e);return o&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Vt(e.id)}),redo:async()=>({ok:await Kt(e)})}),o}async function Bt(e,o,r,n){if(!e||!o.title.trim())return!1;let a=await tt(e),i=Vo(o)?{...o,history:o.history===void 0?a?.history:o.history}:o;Vo(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await Na(e,i,r,n);return s&&a&&f.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Na(e,a)}),redo:async()=>({ok:await Na(e,i)})}),s}async function qr(e){let o=await tt(e),r=await Vt(e);return r&&o&&f.undo.push({label:d("todo.undo.delete",{title:o.title}),undo:async()=>({ok:await Kt(o)}),redo:async()=>({ok:await Vt(e)})}),r}async function ut(e,o){return await f.ui.confirm({title:d("todo.delete.title"),message:t.createElement("span",null,t.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await o(e.id),!0)}async function Ga(e,o){let r=await tt(e);return r?Bt(e,{...r,...Ce(o),updatedAt:new Date().toISOString()}):!1}function Wu(e){let o=[],r=e.replace(/#(\S+)/g,(n,a)=>(o.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:o,text:r}}function Ht(e){let o=Wu(e);return!o.tags.length&&!o.text?()=>!0:(r,...n)=>{for(let a of o.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!o.text||n.some(a=>a.toLowerCase().includes(o.text))}}function ve(e=[]){return e.map(o=>Mr(o.name,e)??o.name)}var $a="localGroups",Yr=200,Yo=60,qo=(e,o)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,o):"";function qs(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ra(e,o=[]){if(!Array.isArray(e))return[];let r=new Set(o.flatMap(i=>[i.name,...i.aliases??[]]).map(Q)),n=new Set,a=[];for(let i of e){if(!i||typeof i!="object")continue;let s=i,c=qo(s.id,64),p=qo(s.name,Yo),l=qo(s.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(c)||n.has(c)||!p||r.has(Q(p))||!l)continue;let u=Array.isArray(s.aliases)?[...new Set(s.aliases.map(g=>qo(g,Yo)).filter(g=>g&&Q(g)!==Q(p)&&!r.has(Q(g))))].slice(0,20):[];if(n.add(c),r.add(Q(p)),u.forEach(g=>r.add(Q(g))),a.push({id:c,name:p,color:l,...u.length?{aliases:u}:{}}),a.length>=Yr)break}return a}function Ys(e,o){let r=qo(o,Yo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>Q(a)!==Q(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Xs(e,o){return[...e,...o.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}function ja(){return Rt(f.getState().groups)}function Xr(){return Ra(f?.settings.get()[$a],ja())}async function Zs(e){await f.settings.set($a,Ra(e,ja()))}function ot(){return Xs(ja(),Xr())}function Zr(e){let o=f.subscribe(e),r=f.settings.subscribe(e);return()=>{o(),r()}}function Be(){let[e,o]=t.useState(ot);return t.useEffect(()=>Zr(()=>o(ot())),[]),e}function Js(){let[e,o]=t.useState(Xr);return t.useEffect(()=>Zr(()=>o(Xr())),[]),e}function Qs(){let e=Ne(),o=!1,r=()=>{Xe(e).then(a=>{if(e.assertActive(),o)return;let i=new Set(Xr().flatMap(s=>[s.name,...s.aliases??[]]).map(Q));e.api.workspace.reportGroupUsage(Ta(a.map(s=>s.group).filter(s=>!s||!i.has(Q(s)))))}).catch(()=>{})};r();let n=Et(r);return()=>{o=!0,n(),e.api.workspace.reportGroupUsage({})}}function qu(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Yu(e){let o=e.toLowerCase();return qu(o)?o:"yyyy-mm-dd"}function ed(e,o){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Yu(o).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Xu="ddd d mmm",Zu=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Ju(e){let o=e.trim().toLowerCase().match(/[a-z]+/g);if(!o||o.some(s=>!Zu.has(s)))return!1;let r=o.filter(s=>s==="d"||s==="dd"),n=o.filter(s=>s==="ddd"||s==="dddd"),a=o.filter(s=>s==="mmm"||s==="mmmm"),i=o.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(o).size===o.length}function Qu(e){let o=e.trim().toLowerCase().replace(/\s+/g," ");return Ju(o)?o:Xu}var Xo=new Map;function ep(e,o,r){let n=`${r??""}:${o}`,a=Xo.get(n);return a||(a=new Intl.DateTimeFormat(r,o[0]==="d"?{weekday:o==="ddd"?"short":"long"}:{month:o==="mmm"?"short":"long"}),Xo.size>=64&&Xo.delete(Xo.keys().next().value),Xo.set(n,a)),a.format(e)}function td(e,o,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,c=new Date(Number(a),Number(i)-1,Number(s),12);return Qu(o).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?a:ep(c,p,r))}var He=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Zo={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},Jr={high:3,medium:2,low:1,normal:0},od=new Intl.Collator(void 0,{sensitivity:"base"});function Wt(e,o){return od.compare(e.title,o.title)}function tp(e,o,r){if(r==="name")return Wt(e,o);if(r==="priority"){let i=Jr[o.priority]-Jr[e.priority];return i!==0?i:pt(e,o)}if(r==="flagged"){let i=+!!o.flagged-+!!e.flagged;return i!==0?i:pt(e,o)}if(r==="due"){let i=e.dueDate||"",s=o.dueDate||"";if(!i&&!s)return pt(e,o);if(!i)return-1;if(!s)return 1;let c=i.localeCompare(s);return c!==0?c:pt(e,o)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(o[n]);return a!==0?a:Wt(e,o)}function Ua(e,o){let r=Jr[o.priority]-Jr[e.priority];return r!==0?r:Wt(e,o)}function pt(e,o){let r=e.startTime||"",n=o.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Ua(e,o)}function rd(e,o,r){let n=new Map(e.map(i=>[i,o(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,s)=>{let c=n.get(i),p=n.get(s);if(a(c)!==a(p))return a(c)?1:-1;let l=0;return!a(c)&&!a(p)&&(l=typeof c=="number"&&typeof p=="number"?c-p:od.compare(String(c),String(p))),l!==0?r==="asc"?l:-l:Wt(i,s)})}function bo(e,o,r){return[...e].sort((n,a)=>{if(o==="due"&&r==="desc"){let s=n.dueDate||"",c=a.dueDate||"";if(!s&&!c)return pt(n,a);if(!s)return-1;if(!c)return 1;let p=c.localeCompare(s);return p!==0?p:pt(n,a)}let i=tp(n,a,o);return r==="asc"?i:-i})}function Re(e,o="dd-mm-yyyy"){return e?ed(e,o):""}function be(e){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function Ka(e){let[o,r,n]=e.split("-").map(i=>parseInt(i,10));if(!o||!r||!n)return null;let a=new Date(o,r-1,n);return a.setHours(0,0,0,0),a}function Ct(e,o){let r=Ka(e);return r?(r.setDate(r.getDate()+o),be(r)):e}function Qr(e,o,r="ddd d mmm"){return td(e.slice(0,10),r,o)}function rt(e,o,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===o)return r.today;let[s,c,p]=i.split("-").map(Number),[l,u,g]=o.split("-").map(Number);if(!s||!c||!p||!l||!u||!g)return Re(e,a);let b=new Date(s,c-1,p),m=new Date(l,u-1,g),w=Math.round((b.getTime()-m.getTime())/864e5);return w===1?r.tomorrow:w===-1?r.yesterday:w>1&&w<7?b.toLocaleDateString(n,{weekday:"long"}):Re(e,a)}var ry=new Date(2023,0,1,12);var op={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Jo(e){return op[e??""]??1}function nd(e){let o=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=o.getUTCDay()||7;o.setUTCDate(o.getUTCDate()+4-r);let n=new Date(Date.UTC(o.getUTCFullYear(),0,1));return Math.ceil(((o.getTime()-n.getTime())/864e5+1)/7)}function rp(e,o){return(e.getDay()-o+7)%7}function ad(e,o){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-rp(e,o))}function qt(e){let[o,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(o,(r||1)-1,n||1)}var Qo=["overdue","today","upcoming","someday","completed"],id={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function nt(e=new Date){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function en(e,o=nt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<o?r.overdue.push(a):i===o?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||pt(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(pt),r.someday.sort(Ua),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Wt(a,i)),r}function Va(e){return Vo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Ba(e){let o=new Date(e);return Number.isNaN(o.getTime())?e.slice(0,10):nt(o)}function sd(e){let o=new Map(e.map(a=>[a,Va(a)])),r=[...e].sort((a,i)=>o.get(i).localeCompare(o.get(a))||Wt(a,i)),n=new Map;for(let a of r){let i=Ba(o.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function Ha(e,o,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?o==="monthly"?c.slice(0,7):o==="daily"?c:nt(ad(qt(c),r)):"",s=new Map;for(let c of e){let p=i(a(c)),l=s.get(p);l?l.push(c):s.set(p,[c])}return[...s.entries()].sort(([c],[p])=>c===""?-1:p===""?1:p.localeCompare(c)).map(([c,p])=>({key:c,kind:c?o:"none",todos:p}))}function tn(e,o=nt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,c,p)=>{let l=p.toLowerCase();if(l==="today")r=o;else if(l==="tomorrow"){let u=new Date(`${o}T00:00:00`);u.setDate(u.getDate()+1),r=nt(u)}else r=p;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,c,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var je={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},np={open:je,get:je,"edit-fields":je,add:je,complete:je,done:je,reopen:je,cancel:je,pause:je,status:je,edit:je,"open-page":{type:"null"},search:{type:"array",items:je,maxItems:20},list:{type:"array",items:je,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:je,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Ie=e=>typeof e=="string"?e:"",pd=e=>Ie(e?.query).trim(),nn=["normal","low","medium","high"];function yo(){return new Date().toISOString()}function dd(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function ld(e){let o=e.trim();if(!o)return;let r=Ro(ot(),o);if(!r)throw new Error(`Unknown group "${o}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function cd(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return dd();if(e.toLowerCase()==="tomorrow"){let o=new Date;return o.setDate(o.getDate()+1),dd(o)}return e}function ap(e){return typeof e=="string"?e.split(",").map(o=>o.trim()).filter(Boolean):[]}function on(e){let o=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${o} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Wa(e,o){let r=o.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var rn={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let o=pd(e);if(!o)throw new Error("Expected a todo id or title.");return{query:o}},fromCli:e=>({query:e.join(" ").trim()})};async function er(e,o,r){let n=Wa(await Dt(),e),a=o(n),i=await Fa(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await Wo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Wo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function ud(e){return er(e,o=>({...o,completed:!0,status:"completed",updatedAt:yo()}),o=>`Complete \u201C${o.title}\u201D`)}var Yt={type:"string"},md={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Yt])),priority:{type:"string",enum:nn},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Yt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Yt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function ip(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let o=e;for(let[r,n]of Object.entries(o)){if(!(r in md.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof o.title=="string"&&!o.title.trim())throw new Error("A task title cannot be empty.");if(o.priority!==void 0&&!nn.includes(o.priority))throw new Error("Invalid priority.");if(o.status!==void 0&&!po().includes(o.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(o[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(o[r])))throw new Error("Invalid task time.");if(o.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(o.remindAt)))throw new Error("Invalid reminder date.");return o}async function sp(e,o,r){let a=(await Dt()).find(c=>c.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(o.group&&!ve(ot()).includes(o.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=Bo({...a,...o,...o.status?Ce(o.status):o.completed!==void 0?Ce(o.completed?"completed":"open"):{},...o.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:yo()});if(o.filePath&&i.filePath!==o.filePath)throw new Error("Invalid task file path.");for(let c of["urls","attachments"])if(o[c]?.some(p=>!i[c]?.includes(p)))throw new Error(`Invalid task ${c}.`);let s=await Fa(e,i,a.updatedAt);if(!s)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await Wo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Wo(e,s))throw new Error("Could not reapply the task edit.")}}}}async function mt(e){let o=e??{},r=o.id??o.query,n={groups:ot(),statuses:po()};if(!r)return n;let a=await Dt(),i=Wa(a,r);return{...n,records:[i]}}function fd(e){let o=n=>{let a=np[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[o({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Yt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Ie(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await tt(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Me().request(n,"edit"),i}}),o({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Yt},required:["id"],additionalProperties:!1},parse:n=>{let a=Ie(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await tt(n);if(!a)throw new Error("The task no longer exists.");return a}}),o({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Yt,values:md,expectedUpdatedAt:Yt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Ie(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:ip(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>sp(n,a,i),revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),o({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Ie(a.due),priority:Ie(a.priority),status:Ie(a.status),note:Ie(a.note),group:Ie(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:c,group:p})=>{let l=po();if(s&&!l.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${l.join(", ")}`);let u=Bo({title:n,priority:i||"normal",status:s||void 0,dueDate:cd(a),note:c,group:ld(p)});if(!await Kt(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Vt(u.id)},reapply:async()=>{await Kt(u)}}}},formatCli:n=>`Added: ${on(n)}`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:rn,run:({query:n})=>ud(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:rn,run:({query:n})=>ud(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=pd(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=Ht(n);return(await Dt()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(on).join(`
`):"No matching todos."}),o({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:rn,run:({query:n})=>er(n,a=>({...a,completed:!1,status:"open",updatedAt:yo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>mt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>o({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:rn,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!Ls(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return er(a,s=>({...s,...Ce(i),updatedAt:yo()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>mt(a),preview:a=>({changes:a})})),o({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim(),s=Ie(a.status),c=po();if(!i||!c.includes(s))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>er(n,i=>({...i,...Ce(a),updatedAt:yo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim(),s=Ie(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!nn.includes(s))throw new Error(`Invalid priority "${s}". One of: ${nn.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?ap(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:c,tags:p,group:l})=>er(n,u=>({...u,title:a??u.title,priority:i??u.priority,dueDate:s===void 0?u.dueDate:cd(s),note:c??u.note,tags:p??u.tags,group:l===void 0?u.group:ld(l),updatedAt:yo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${on(n)}`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Ie(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await Dt(),s=Wa(i,n);if(!a)return{value:{deleted:!1,todo:s,deletedCount:0},revert:null};if(!await Vt(s.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:s,deletedCount:1},revert:{label:`Delete \u201C${s.title}\u201D`,run:async()=>{await Kt(s)},reapply:async()=>{await Vt(s.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>mt(n),preview:n=>({changes:n})}),o({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Ie(a.section),q:Ie(a.q)}},fromCli:(n,a)=>({section:Ie(a.section),q:Ie(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await Dt();if(a){let s=Ht(a);i=i.filter(c=>s(c.tags,c.title,c.note))}return n&&Qo.includes(n)?en(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(on).join(`
`)}),o({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Dt(),a=ot();return ve(a).map(i=>({name:i,count:n.filter(s=>Q(s.group??"")===Q(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var gd={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var lp=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,cp=/^-\s+(.*)$/,up=/^[A-Za-z][\w+.-]*:\/\//;function hd(e){let o={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(cp);if(i){r?o.lists[r].push(i[1].trim()):o.bare===null&&(o.bare=i[1].trim());continue}let s=up.test(a)?null:a.match(lp);if(s){let c=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=c,o.lists[c]=o.lists[c]??[]):(r=null,o.values[c]=p);continue}r=null,o.bare===null&&(o.bare=a)}return o}function bd(e,o,r=500){let n=e.values[o];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var qa="notes-todo-fence-styles";function pp(){if(document.getElementById(qa))return;let e=document.createElement("style");e.id=qa,e.textContent=`
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
`,document.head.appendChild(e)}var yd=()=>{let e=new Date,o=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())}`},mp=e=>{let o=new Date;o.setDate(o.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${o.getFullYear()}-${r(o.getMonth()+1)}-${r(o.getDate())}`};function fp(e,o){let r=yd(),n=mp(7),a=o.tag?o.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(o.status==="open"&&i.completed||o.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||o.due==="today"&&i.dueDate!==r||o.due==="week"&&(!i.dueDate||i.dueDate>n)||o.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,o.limit)}var gp=({code:e})=>{let[o,r]=t.useState(null);t.useEffect(()=>{let u=Ne(),g=!0,b=()=>{Xe(u).then(w=>{u.assertActive(),g&&r(w)}).catch(()=>{})};b();let m=Et(b);return()=>{g=!1,m()}},[]);let n=hd(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:bd(n,"limit",100)??10};if(!o)return t.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let c=fp(o,s),p=yd(),l=u=>{let g={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(b=>b&&b.map(m=>m.id===u.id?g:m)),Bt(u.id,g)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"todo-fence-head",onClick:u=>f.workspace.openMainTab({newTab:f.ui.hasModKey(u)}),title:d("auto.edbe7ad07b4a")},t.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),t.createElement("span",{className:"c"},c.length,s.due?` \xB7 ${s.due}`:"")),c.length===0&&t.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),c.map(u=>t.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},t.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>l(u),"aria-label":u.title}),u.priority!=="normal"&&t.createElement("span",{className:`pri pri-${u.priority}`},He.find(g=>g.id===u.priority)?.symbol),t.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(g=>t.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),u.dueDate&&t.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function wd(){let e=f.markdown.registerCodeBlockRenderer("todo",(o,r)=>(pp(),r.classList.add("todo-fence"),f.ui.renderReact(r,t.createElement(gp,{code:o}))),{examples:gd.todo});return()=>{e(),document.getElementById(qa)?.remove()}}var Xa=".valley/assets/icons/todo-icon",hp=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),bp=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function yp(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let o=new DOMParser().parseFromString(e,"image/svg+xml"),r=o.documentElement;if(r.localName!=="svg"||o.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!hp.has(n.tagName)){n.remove();continue}for(let a of[...n.attributes])(!bp.has(a.name)||/url\s*\(|javascript:|expression\s*\(/i.test(a.value))&&n.removeAttribute(a.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function wp(e,o){let n=new DOMParser().parseFromString(o,"image/svg+xml").documentElement;for(let c of n.querySelectorAll("*"))for(let p of["stroke","fill"]){let l=c.getAttribute(p);l&&l!=="none"&&c.setAttribute(p,"#000")}let a=n.getAttribute("fill")==="none"?"none":"#000",i=[...n.childNodes].map(c=>new XMLSerializer().serializeToString(c)).join(""),s=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${a}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${i}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${s})"/></svg>`}function Za(){return f.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function Ya(){let e=Za();return e.pending||(e.pending=f.backend.call("taskIcons",{}).then(o=>{let r={};for(let[n,a]of Object.entries(o?.icons??{})){let i=yp(a);i&&(r[n]=wp(n,i))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function vd(e){return e?Za().icons[e]:void 0}function an(){let e=Za();return t.useEffect(()=>{e.loaded||Ya()},[e]),t.useSyncExternalStore(t.useCallback(o=>(e.listeners.add(o),()=>{e.listeners.delete(o)}),[e]),()=>e.revision),e.icons}function xd(){Ya();let e,o=f.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${Xa}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{Ya()},150))});return()=>{window.clearTimeout(e),o()}}function kd(e){let r=f?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var ee=e=>t.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),It=e=>t.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),vp=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),xp=e=>t.createElement(It,{...e,viewBox:"2 2 20 20"},t.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),t.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),kp=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Tp=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Sp=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Ap=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Ep=e=>t.createElement(It,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Dp={inprogress:kp,waiting:Tp,onhold:xp,delegated:Sp,deferred:Ap,completed:Ep,canceled:vp},xe=({status:e,dotCls:o,color:r})=>{let n=r?{color:r}:void 0,a=vd(kd(e??"open"));if(a)return t.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${o}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:a}});let i=e?Dp[e]:void 0;return i?t.createElement(i,{className:`todo-status-menu-svg ${o}`,style:n}):t.createElement("span",{className:`todo-status-menu-dot ${o}`,style:n})};var Xt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M12 5v14M5 12h14"})),ft=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"11",cy:"11",r:"8"}),t.createElement("path",{d:"m21 21-4.3-4.3"})),we=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),wo=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"9",cy:"6",r:"1"}),t.createElement("circle",{cx:"15",cy:"6",r:"1"}),t.createElement("circle",{cx:"9",cy:"12",r:"1"}),t.createElement("circle",{cx:"15",cy:"12",r:"1"}),t.createElement("circle",{cx:"9",cy:"18",r:"1"}),t.createElement("circle",{cx:"15",cy:"18",r:"1"})),Td=e=>t.createElement(ee,{...e},t.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),t.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Sd=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"1"}),t.createElement("circle",{cx:"19",cy:"12",r:"1"}),t.createElement("circle",{cx:"5",cy:"12",r:"1"})),Ad=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 11v5M12 8h.01"})),sn=e=>t.createElement(ee,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),dn=e=>t.createElement(ee,{...e},t.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),t.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),tr=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),or=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Ed=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),t.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),Dd=e=>t.createElement(ee,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),t.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),Cd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),ln=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m6 9 6 6 6-6"})),Le=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),t.createElement("path",{d:"M4 22v-7"})),Id=e=>t.createElement(It,{...e,viewBox:"0 0 192 512"},t.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Nd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M12 20h9"}),t.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),cn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),t.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),We=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"m8 12 3 3 5-6"})),Nt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),t.createElement("path",{d:"M10 11v6M14 11v6"})),Ld=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),t.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),Pd=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 7v5l3 2"})),Zt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Jt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),t.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Od=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),t.createElement("circle",{cx:"12",cy:"12",r:"3"})),un=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),t.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),t.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Md=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Ze=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),t.createElement("circle",{cx:"12",cy:"10",r:"3"})),Lt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),gt=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),t.createElement("path",{d:"M14 2v6h6"})),pn=e=>t.createElement(ee,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),t.createElement("circle",{cx:"9",cy:"9",r:"2"}),t.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),mn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M9 18V5l12-2v13"}),t.createElement("circle",{cx:"6",cy:"18",r:"3"}),t.createElement("circle",{cx:"18",cy:"16",r:"3"})),fn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m22 8-6 4 6 4V8z"}),t.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),rr=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"18",cy:"18",r:"4"}),t.createElement("path",{d:"M18 16.5V18l1 1"})),nr=e=>t.createElement(ee,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),at=e=>t.createElement(ee,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),gn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),t.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),ar=e=>t.createElement(ee,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),hn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 18h18"}),t.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),t.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),t.createElement("path",{d:"M4 21v-3M20 21v-3"})),Ja=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Qa=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),ei=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),_d=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),bn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m15 18-6-6 6-6"})),yn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m9 18 6-6-6-6"})),zd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Fd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"}));var Gd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),$d=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M5 12h14"})),Rd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),wn=e=>t.createElement(ee,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),vn=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),jd=e=>t.createElement(ee,{...e},t.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function ir(e){let o=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:o})}var vo=({value:e,onChange:o,disabled:r=!1,autoFocus:n=!1})=>{let a=t.useRef(null),[i,s]=t.useState([]),[c,p]=t.useState("idle"),[l,u]=t.useState(-1),[g,b]=t.useState(!1),m=t.useRef(null),w=t.useRef(0),v=t.useRef(!1);t.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),t.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),t.useEffect(()=>{n&&a.current?.focus()},[n]);let F=A=>{m.current!==null&&window.clearTimeout(m.current);let y=++w.current;if(A.trim().length<2){s([]),p("idle"),b(!1);return}b(!0),p("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:A.trim(),kinds:["place"],limit:8}).then(D=>{y===w.current&&(s(D),u(D.length?0:-1),p("done"))},()=>{y===w.current&&(s([]),u(-1),p("failed"))})},250)},_=A=>{let y=Number(A.metadata?.longitude),D=Number(A.metadata?.latitude),H=(A.value??A.label).trim();v.current=!0,w.current++,a.current&&(a.current.value=H),b(!1),s([]),o({name:H,...Number.isFinite(y)&&Number.isFinite(D)?{lng:y,lat:D}:{}})},L=()=>{let A=a.current?.value.trim()??"";if(w.current++,b(!1),v.current){v.current=!1;return}A!==(e?.name??"")&&o(A?{name:A}:void 0)};return t.createElement("div",{className:"todo-location"},t.createElement("div",{className:"todo-location-row"},t.createElement("div",{className:"todo-location-field"},t.createElement(ft,{className:"todo-location-field-icon"}),t.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:A=>{v.current=!1,F(A.currentTarget.value)},onFocus:A=>{A.currentTarget.value.trim().length>=2&&i.length&&b(!0)},onBlur:L,onKeyDown:A=>{A.nativeEvent.isComposing||(A.key==="ArrowDown"&&i.length?(A.preventDefault(),b(!0),u(y=>(y+1)%i.length)):A.key==="ArrowUp"&&i.length?(A.preventDefault(),u(y=>y<=0?i.length-1:y-1)):A.key==="Enter"?(A.preventDefault(),g&&i[l]?_(i[l]):L()):A.key==="Escape"&&g&&(A.preventDefault(),A.stopPropagation(),w.current++,b(!1)))}})),e&&t.createElement(t.Fragment,null,t.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>ir(e)},t.createElement(Md,null)),t.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:A=>A.preventDefault(),onClick:()=>{w.current++,a.current&&(a.current.value=""),s([]),b(!1),o(void 0)}},t.createElement(we,null)))),g&&t.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},c==="searching"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),c==="failed"&&t.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),i.map((A,y)=>t.createElement("li",{key:A.id,role:"option","aria-selected":y===l},t.createElement("button",{type:"button",className:"todo-location-hit"+(y===l?" is-active":""),onMouseDown:D=>D.preventDefault(),onMouseEnter:()=>u(y),onClick:()=>_(A)},t.createElement("span",{className:"todo-location-hit-name"},t.createElement(Ze,null),A.label),A.description&&t.createElement("span",{className:"todo-location-hit-context"},A.description))))))};function Cp(){try{return Jo(f?.getState().weekStart)}catch{return 1}}function Ud(e,o=Cp()){let r=qt(e).getDay();return Ct(e,6-(r-o+7)%7)}var Pe={kind:"smart",id:"all"},xn=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ye("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ye("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:ye("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ye("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ye("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ye("green"),dated:!1}],sr=xn.map(e=>e.id);function ti(e){let o=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(o.order)?o.order:[])typeof l=="string"&&sr.includes(l)&&!r.includes(l)&&r.push(l);sr.forEach((l,u)=>{if(r.includes(l))return;let g=sr.slice(0,u).reverse().find(b=>r.includes(b));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(o.hidden)?o.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=o.colors&&typeof o.colors=="object"?o.colors:{},s={};for(let l of sr){let u=i[l];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(s[l]=u)}let c=o.textColors&&typeof o.textColors=="object"?o.textColors:{},p={};for(let l of sr){let u=c[l];(u==="white"||u==="black")&&(p[l]=u)}return{order:r,hidden:a,colors:s,textColors:p}}function Kd(e){return e.order.filter(o=>!e.hidden.includes(o)).map(o=>ht(o,e))}function ht(e,o){let r=xn.find(i=>i.id===e)??xn.find(i=>i.id==="all"),n=o?.colors[r.id],a=o?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function dr(e,o){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":o(e.color)}function Ip(e,o,r=be(new Date)){if(o.kind==="groups")return e.group?new Set(o.names.map(Q)).has(Q(e.group)):o.includeUngrouped===!0;if(o.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===o.name.toLowerCase());if(o.kind==="nogroup")return!e.group;switch(o.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=Ud(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function kn(e,o,r,n=be(new Date)){return Ip(e,o,n)?o.kind==="smart"&&o.id==="completed"?e.completed:r||!e.completed:!1}function Vd(e,o=be(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=Ud(o);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=o&&r.today++,i<=n&&r.week++)}return r}function Tn(e,o){let r=o===null?null:Q(o);return e.filter(n=>!n.completed&&(r===null?!n.group:Q(n.group??"")===r)).length}function Je(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Np=xn.map(e=>e.id);function lr(e){if(typeof e!="string")return Pe;let o=e.trim();if(o==="nogroup")return{kind:"nogroup"};if(o.startsWith("tag:")){let r=o.slice(4).trim();return r?{kind:"tag",name:r}:Pe}if(o.startsWith("group:")){let r=o.slice(6).trim();return r?{kind:"groups",names:[r]}:Pe}if(o.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(o.slice(7)));if(!r||typeof r!="object")return Pe;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Pe}catch{return Pe}return Np.includes(o)?{kind:"smart",id:o}:o.startsWith("due:")?{kind:"smart",id:o==="due:today"?"today":"scheduled"}:Pe}function Sn(e,o){return Je(e)===Je(o)}var Lp=["group","notes","status","location","tags"],Pp="todo.view",Op="todo.showCompleted",Mp="todo.statusFilter",_p="todo.search",zp="todo.pageSort",ai="panelChip",Hd="pageShowCompleted",oi="statusFilter",ii="dateBreakdown",Wd="smartLists",cr="pageSearch",qd="pageSort",Fp={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Yd=["due","priority","flagged","updated","created","name"];function Bd(e){let o=e&&typeof e=="object"?e:{};return{compact:o.compact!==!1,sortField:Yd.includes(o.sortField)?o.sortField:"due",sortDir:o.sortDir==="asc"?"asc":"desc",showCompleted:o.showCompleted===!0,statusFilter:mo(o.statusFilter),groupNames:Array.isArray(o.groupNames)?[...new Set(o.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:o.includeUngrouped===!0}}function Cn(e){let o=Fp[e],r=t.useCallback(()=>Bd(f.settings.get()[o]),[o]),[n,a]=t.useState(r);t.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=t.useCallback(s=>{a(c=>{let p=Bd({...c,...s});return f.settings.set(o,p),p})},[o]);return[n,i]}function An(){let e=f.settings.get()[ii];return e==="weekly"||e==="daily"?e:"monthly"}function In(){let[e,o]=t.useState(An);return t.useEffect(()=>f.settings.subscribe(()=>o(An())),[]),e}function xo(){return f.runtime.getOrCreate(Pp,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function Nn(){return f.runtime.getOrCreate(Op,()=>({show:null,listeners:new Set}))}function Ln(){return f.runtime.getOrCreate(Mp,()=>({filter:null,listeners:new Set}))}function ur(){return f.runtime.getOrCreate(_p,()=>({query:null,listeners:new Set}))}function Pn(){return f.runtime.getOrCreate(zp,()=>({value:null,listeners:new Set}))}function bt(){let e=xo();return e.view||(e.view=lr(f.settings.get()[ai]),e.history=[e.view],e.historyIndex=0),e.view}function Ue(e){let o=xo();if(bt(),o.view&&Sn(o.view,e))return;let r=o.history.slice(0,o.historyIndex+1);o.history=[...r,e].slice(-20),o.historyIndex=o.history.length-1,o.view=e,f.settings.set(ai,Je(e));for(let n of o.listeners)n(e)}function On(){let e=xo();return bt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function ko(e){let o=xo();bt();let r=o.historyIndex+e;if(!(r<0||r>=o.history.length)){o.historyIndex=r,o.view=o.history[r],f.settings.set(ai,Je(o.view));for(let n of o.listeners)n(o.view)}}function pr(e){let o=xo();return o.listeners.add(e),()=>{o.listeners.delete(e)}}function Xd(){let e=xo();e.view=null,e.history=[],e.historyIndex=-1,Nn().show=null,Ln().filter=null,ur().query=null,Pn().value=null}function En(){return ti(f.settings.get()[Wd])}function Zd(e){f.settings.set(Wd,ti(e))}function Mn(){let[e,o]=t.useState(En);return t.useEffect(()=>f.settings.subscribe(()=>o(En())),[]),e}function _n(e){let o=ur(),r=e.slice(0,500);if(o.query!==r){o.query=r,f.settings.set(cr,r);for(let n of o.listeners)n(r)}}function zn(){let e=()=>{let n=ur();return n.query===null&&(n.query=typeof f.settings.get()[cr]=="string"?String(f.settings.get()[cr]).slice(0,500):""),n.query},[o,r]=t.useState(e);return t.useEffect(()=>{let n=ur();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[o,_n]}function si(e){let o=e&&typeof e=="object"?e:{};return{field:o.field==="auto"||Lp.includes(o.field)||Yd.includes(o.field)?o.field:"auto",dir:o.dir==="desc"?"desc":"asc"}}function Jd(){let e=Pn();return e.value||(e.value=si(f.settings.get()[qd])),e.value}function Qd(e){let o=Pn(),r=si(e);if(!(o.value?.field===r.field&&o.value.dir===r.dir)){o.value=r,f.settings.set(qd,r);for(let n of o.listeners)n(r)}}function el(){let[e,o]=t.useState(Jd);return t.useEffect(()=>{let r=Pn();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,Qd]}function Fn(e=bt()){return{v:1,view:Je(e),showCompleted:ni(),statusFilter:Dn(),search:ur().query??(typeof f.settings.get()[cr]=="string"?String(f.settings.get()[cr]).slice(0,500):""),sort:Jd()}}function Gn(e,o=!1){return e.v!==1?!1:(o||Ue(lr(e.view)),Qt(e.showCompleted===!0),ri(mo(e.statusFilter)),_n(typeof e.search=="string"?e.search:""),Qd(si(e.sort)),!0)}function Dn(){let e=Ln();if(e.filter===null){let o=f.settings.get()[oi];e.filter=mo(o),typeof o=="string"&&o!=="all"&&e.filter!=="all"&&f.settings.set(oi,e.filter)}return e.filter}function ri(e){let o=Ln(),r=mo(e),n=o.filter??Dn();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){o.filter=r,f.settings.set(oi,r);for(let a of o.listeners)a(r)}}function yt(){let[e,o]=t.useState(Dn);return t.useEffect(()=>{let r=Ln();r.listeners.add(o);let n=f.settings.subscribe(()=>{let a=mo(r.filter??Dn());ri(a)});return()=>{r.listeners.delete(o),n()}},[]),[e,ri]}function $n(){let[e,o]=t.useState(bt);return t.useEffect(()=>pr(o),[]),e}function ni(){let e=Nn();return e.show===null&&(e.show=f.settings.get()[Hd]===!0),e.show}function Qt(e){let o=Nn();if(o.show!==e){o.show=e,f.settings.set(Hd,e);for(let r of o.listeners)r(e)}}function wt(){let[e,o]=t.useState(ni);return t.useEffect(()=>{let r=Nn();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,()=>Qt(!ni())]}function ol(e){let o=e.dueDate?.slice(0,10);if(!o)return!1;let r=f.interop.services.providers($t).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:o,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var Gp=["normal","low","medium","high"];function rl(e,o){return e&&Gp.includes(e)?e:o}function $p(e){let o=[];return e.filePath&&o.push("note"),e.attachments?.length&&o.push("attachment"),e.urls?.length&&o.push("link"),e.location&&o.push("location"),o.length>0?o:void 0}function Rp(e,o){return e.dueDate?{badges:$p(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:De(e.group,o)}:{}}:null}function jp(e,o){return{...e,title:o.title?.trim()||e.title,dueDate:o.date??e.dueDate,startTime:"startTime"in o?o.startTime:e.startTime,endTime:"endTime"in o?o.endTime:e.endTime,note:"note"in o?o.note??"":e.note,location:"location"in o?o.location:e.location,urls:"urls"in o?o.urls:e.urls,attachments:"attachments"in o?o.attachments:e.attachments,group:"group"in o?o.group:e.group,tags:o.tags??e.tags,priority:rl(o.priority,e.priority),filePath:"filePath"in o?o.filePath:e.filePath,...o.completed===void 0?{}:Ce(o.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Rn(e){return tt(e)}function tl(e){let o=e.lastIndexOf("/");return o===-1?e:e.slice(o+1)}var di="attachment:",li="url:";function Up(){return!0}function Kp(e){let o=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:tl(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${di}${i}`,label:tl(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${li}${i}`,label:i,icon:"link"}))}),e.location&&Up()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&o.push(...r),o}async function Vp(e,o){if(o.startsWith(di)){let r=o.slice(di.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(o.startsWith(li)){let r=o.slice(li.length);if(!(e.urls??[]).includes(r))return!1;let n=go(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(o){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Ue(e.completed?{kind:"smart",id:"completed"}:Pe),Me().request(e.id,o==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(ir(e.location),!0):!1;default:return!1}}function nl(){let e=Ne(),o=Ut("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:u,limit:g,cursor:b})=>{let m,w=()=>`${o}:${r}`;if(b){let A;try{A=JSON.parse(b)}catch{throw new Error("Invalid Calendar source cursor.")}if(!A||A.startDate!==l||A.endDate!==u||A.limit!==g||A.revision!==w()||typeof A.cursor!="string"||!A.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=A.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let v=w(),F=await Ws(l,u,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(b&&v!==w())throw new Error("Calendar source cursor is stale; restart the range.");let _=ot(),L=w();return{items:F.todos.map(A=>Rp(A,_)).filter(A=>!!A),revision:L,...F.cursor?{cursor:JSON.stringify({startDate:l,endDate:u,limit:g,revision:L,cursor:F.cursor})}:{}}},create:async(l,u)=>{if(u.endDate&&u.endDate!==l)return!1;let g=u.title?.trim();if(!g)return!1;let b=new Date().toISOString();return Wr({id:Ut("todo"),title:g,completed:u.completed??!1,priority:rl(u.priority,"normal"),dueDate:l,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:b,updatedAt:b})},update:async(l,u)=>{let g=await Rn(l);return g&&u.endDate&&u.endDate!==(u.date??g.dueDate)?!1:g?Bt(g.id,jp(g,u),g.updatedAt):!1},remove:l=>qr(l),open:async l=>{let u=await Rn(l);await f.workspace.revealOwnPanel("left_sidebar"),u&&(Ue(u.completed?{kind:"smart",id:"completed"}:Pe),Me().request(u.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let u=await Rn(l);return u?Kp(u):[]},runAction:async(l,u)=>{let g=await Rn(l);return g?Vp(g,u):!1}},i=()=>{f.interop.state.publish(zo,++r)};f.interop.state.publish(zo,r);let s=Ks(i),c=Zr(i),p=f.interop.services.provide($t,a);return()=>{n=!1,s(),c(),p(),f.interop.state.publish(zo,null)}}var ci=e=>typeof e=="string"?e:"";function al(e){let o=ci(e).replace(/\\/g,"/").replace(/^\.\//,"");return o===".valley"||o.startsWith(".valley/")?"":o}function il(e){let o={cardKind:"todo",open:async(r,n)=>{if(ci(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ci(r.id)}),!0;let a=al(r.filePath)||al(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(fa,o)}function it(...e){let o=e.slice().sort().join("\0"),r=t.useMemo(()=>o.split("\0"),[o]),n=t.useCallback(a=>f.subscribeState(r,a),[r]);return t.useSyncExternalStore(n,f.getState,f.getState)}function jn(){let e=t.useCallback(i=>f.interop.state.subscribe(Er,i),[]),o=t.useCallback(()=>f.interop.state.get(Er),[]),r=t.useSyncExternalStore(e,o,o),n=r?.rangeStart??null,a=r?.rangeEnd??null;return t.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function sl(){let[e,o]=t.useState(new Set),r=t.useRef(new Set),n=t.useCallback((i,s)=>{let c=new Set(r.current);s?c.add(i):c.delete(i),r.current=c,o(c)},[]),a=t.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var Bp="todo.sharedTodos";function ui(){return f.runtime.getOrCreate(Bp,()=>({todos:[],listeners:new Set}))}function ke(){return ui().todos}function vt(e){let o=ui();o.todos=e;for(let r of o.listeners)r(e)}function Pt(e){let o=ui();return o.listeners.add(e),()=>{o.listeners.delete(e)}}var pi="list:",mi=e=>f.ui.hasModKey(e)||e.button===1,Hp=e=>`${pi}${Je(e)}`;function eo(e){return e?.startsWith(pi)?lr(e.slice(pi.length)):null}var dl=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function Un(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(ht(e.id).labelKey)}function To(e,o){f.workspace.openMainTab({instanceId:Hp(e),title:Un(e),newTab:o})}function mr(e,o=!1){o||eo(dl(f.getState().activePluginTab))?To(e,o):Ue(e)}function fr(){let e=$n(),{activePluginTab:o}=it("activePluginTab"),r=dl(o);return t.useMemo(()=>eo(r),[r])??e}function ll(){let e=o=>f.workspace.setMainTabTitle(Un(o));return e(bt()),pr(e)}function Ot(){return f.workspace.openOwnSettings(),Promise.resolve()}var fi={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function cl(){return["completed",...jt().filter(o=>o!=="completed")].map(o=>Ae(o))}function to(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function ul(){for(let e of to().listeners)e()}function gi(e,o=""){let r=to();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==o||(r.actions=e,r.actionsOwner=e?o:void 0,ul())}function hi(e,o){e?to().selected.set(o,e):to().selected.delete(o),ul()}function Wp(e,o){let r=e==="main_workspace"?eo(o):null,n=Fn(r??void 0),a=ke().find(i=>i.id===to().selected.get(e));return{title:d("manifest.name"),view:n,actions:to().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...On(),goBack:()=>ko(-1),goForward:()=>ko(1)}}}}function qp(e){let o=to().listeners;o.add(e);let r=Pt(e),n=pr(e),a=f.settings.subscribe(e);return()=>{o.delete(e),r(),n(),a()}}async function Yp(e,o,r=!1,n){if(typeof e.todoId=="string"&&!await tt(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Gn(e,o==="main_workspace"&&eo(n)!==null))throw new Error("Unsupported To-Do bookmark.");hi(typeof e.todoId=="string"?e.todoId:null,o),!r&&typeof e.todoId=="string"&&Me().request(e.todoId,"focus")}function Xp({label:e,color:o,todos:r}){let[n,a]=t.useState(!1);return t.createElement("section",{className:`todo-status-group${n?" expanded":""}`},t.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},t.createElement("span",{className:"todo-status-group-name"},t.createElement("span",{className:"props-info-dot",style:{background:o}}),e),t.createElement("span",{className:"todo-status-group-meta"},t.createElement("span",null,r.length),t.createElement(ln,null))),n&&t.createElement("div",{className:"todo-group-status-breakdown"},cl().map(i=>t.createElement("div",{className:"todo-group-status-row",key:i.id},t.createElement("span",null,i.label),t.createElement("span",null,r.filter(s=>_e(s)===i.id).length)))))}function Zp(){let e=t.useSyncExternalStore(Pt,ke,ke),o=Be(),r=fr(),n=r.kind==="smart"?d(ht(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return t.createElement("div",{className:"right-panel-body props-info"},t.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...cl().map(a=>[a.label,e.filter(i=>_e(i)===a.id).length])].map(([a,i])=>t.createElement("div",{className:"props-info-row",key:a},t.createElement("dt",{className:"props-info-key"},a),t.createElement("dd",{className:"props-info-value"},i)))),t.createElement("div",{className:"todo-status-groups"},[...ve(o),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(c=>a===null?!c.group:Q(c.group??"")===Q(a)),s=a??d("todo.chip.noGroup");return t.createElement(Xp,{key:a??"ungrouped",label:s,color:a?Se(De(a,o)):"var(--text-tertiary)",todos:i})})))}function Jp(){let e=t.useSyncExternalStore(Pt,ke,ke),o=Be(),r=fr();return t.createElement("div",{className:"right-panel-body props-info"},t.createElement(gr,{embedded:!0,todos:e,groups:o,names:ve(o),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>mr(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Pe),onOpenSettings:Ot}))}function pl(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>ya(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>Wp(n,a),subscribe:qp,restore:(a,i,s)=>Yp(a,n,s?.background,i)},{stateSchema:fi,itemStateSchema:{...fi,required:[...fi.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Dr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await tt(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>t.createElement(Zp,null)})),r.push(e.interop.extensions.provide(Dr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>ot().map(n=>({id:n.id,label:n.name,value:ke().filter(a=>Q(a.group??"")===Q(n.name)).length,readOnly:!0})),render:()=>t.createElement(Jp,null)})),()=>r.forEach(n=>n())}function ml(e,o,r){let n=new Date().toISOString();return{id:Ut("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:o,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function fl(e){let o=e.split("/"),r=o[o.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function So(e,o,r="main_workspace"){let n=t.useRef(Ne()).current,[a,i]=t.useState(ke()),[s,c]=t.useState(null),[p,l]=t.useState(null),[u,g]=t.useState(null),[b,m]=t.useState(!0),[w,v]=t.useState(0),[F,_]=t.useState(!1),{pendingIds:L,isPending:A,setPending:y}=sl(),D=t.useRef(!1),H=t.useRef(0),G=t.useRef({sortField:e,sortDir:o});G.current={sortField:e,sortDir:o};let B=t.useRef([]),E=t.useMemo(()=>{let U=new Map(a.map(te=>[te.id,te])),N=new Set(B.current),X=[];for(let te of B.current){let ie=U.get(te);ie&&X.push(ie)}for(let te of a)N.has(te.id)||X.push(te);return X},[a,w]),P=t.useCallback(U=>{let N=++H.current;U&&m(!0),Xe(n).then(X=>{if(n.assertActive(),N===H.current){if(U){let{sortField:te,sortDir:ie}=G.current;B.current=bo(X,te,ie).map(re=>re.id)}else{let te=new Set(X.map(h=>h.id)),ie=B.current.filter(h=>te.has(h)),re=new Set(ie),{sortField:T,sortDir:z}=G.current,K=bo(X.filter(h=>!re.has(h.id)),T,z).map(h=>h.id);B.current=[...K,...ie]}vt(X),m(!1)}}).catch(()=>{N===H.current&&m(!1)})},[n]);t.useEffect(()=>(P(!0),()=>{H.current++}),[P]),t.useEffect(()=>Et(()=>P(!1)),[P]);let j=t.useRef(!0);t.useEffect(()=>{if(j.current){j.current=!1;return}B.current=bo(ke(),e,o).map(U=>U.id),v(U=>U+1)},[e,o]),t.useEffect(()=>Pt(U=>i(U)),[]);let V=t.useCallback(()=>c(null),[]),k=t.useCallback(U=>{hi(U,r),g(U)},[r]),S=t.useCallback(()=>g(null),[]),$=t.useCallback(async(U,N,X)=>{if(D.current)return null;let te=U.trim();if(!te)return null;let ie={...ml(te,N),...X?.patch};D.current=!0,_(!0),B.current=[ie.id,...B.current],vt([ie,...ke()]),c(ie.id);let re=()=>{B.current=B.current.filter(T=>T!==ie.id),vt(ke().filter(T=>T.id!==ie.id)),c(T=>T===ie.id?null:T)};try{let T=await Wr(ie);return T||re(),T?ie:null}catch{return re(),null}finally{D.current=!1,_(!1)}},[]),x=t.useCallback(async(U,N,X)=>{if(A(U))return!1;let te=ke().find(re=>re.id===U);if(!te)return!1;let ie={...te,...N,updatedAt:new Date().toISOString()};y(U,!0),vt(ke().map(re=>re.id===U?ie:re));try{return await Bt(U,ie,te.updatedAt,X)?!0:(vt(ke().map(T=>T.id===U?te:T)),!1)}catch{return vt(ke().map(re=>re.id===U?te:re)),!1}finally{y(U,!1)}},[A,y]),C=t.useCallback(async U=>{if(A(U))return;let N=ke().find(te=>te.id===U);if(!N)return;y(U,!0),B.current=B.current.filter(te=>te!==U),vt(ke().filter(te=>te.id!==U)),c(te=>te===U?null:te),u===U&&g(null);let X=()=>{B.current.includes(U)||B.current.push(U),ke().some(te=>te.id===U)||vt([...ke(),N])};try{await qr(U)||X()}catch{X()}finally{y(U,!1)}},[u,A,y]);return{todos:a,loading:b,ordered:E,lastCreatedId:s,clearLastCreated:V,menuId:p,setMenuId:l,editingId:u,openDetail:k,closeDetail:S,pendingIds:L,creating:F,create:$,patchTodo:x,removeTodo:C}}var Qp=[".ttf",".otf",".woff",".woff2"],em=[".csv"],tm=[".base"],om=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],rm=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],nm=[...om,...rm,".ico",".flavicon"];var am=[".pdf"],im=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],sm=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],dm=[".srt",".vtt",".ass"],lm=[".stl",".obj",".glb",".gltf"],cm=[".bin",".mtl"];function bi(e){let o=e.split("/").pop()??e,r=o.lastIndexOf(".");return r>0?o.slice(r).toLowerCase():""}var um={type:"core",id:"valley"},J=(e,o,r,n,a={})=>({kind:e,icon:o,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:um,...a});function pm(e){let o={};for(let[r,n]of e)for(let a of r)o[a]=n;return o}var mm=pm([[[".mermaid",".mmd"],J("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],J("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],J("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],J("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],J("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Qp,J("font","font","font","media")],[[".epub",".mobi",".azw3"],J("ebook","ebook","ebook","documents")],[[".djvu"],J("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],J("comic","comic","comic","documents")],[[".md",".markdown"],J("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],J("text","text","text","notes")],[[".json"],J("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],J("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[em,J("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[tm,J("base","base","fallback","data")],[nm,J("image","image","image","media",{information:["identity","dimensions","exif"]})],[am,J("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[im,J("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[sm,J("video","video","video","media",{information:["identity","media","video-codec"]})],[dm,J("text","subtitle","text","media")],[lm,J("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[cm,J("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],J("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],J("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],J("docx","word","opendocument","documents")],[[".ods"],J("csv","excel","opendocument","data")],[[".odp"],J("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],J("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],J("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],J("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],J("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],J("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],J("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],J("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],J("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],J("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],J("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],J("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],J("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],J("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],J("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],J("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],J("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],J("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],J("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],J("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],J("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],J("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],J("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],J("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],J("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],J("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],J("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],J("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),fm=J("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function gm(e){return mm[bi(e)]??fm}function hr(e){return gm(e).kind}var gl="valley-realm",hl="asset";function bl(e){return`${gl}://${hl}/${encodeURIComponent(e)}`}var hm={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function bm(e){if(!Number.isFinite(e)||e<0)return"";let o=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<o.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${o[n]}`}function yi(e){let o=hm[hr(e)];if(o)return d(o);let r=bi(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var ym={image:pn,audio:mn,video:fn},yl=({relPath:e,onRemove:o})=>{let[r,n]=t.useState(null),a=hr(e),i=e.split("/").pop()??e,s=ym[a]??gt;t.useEffect(()=>{let u=!1;return f.realm.fileInfo(e).then(g=>{u||n(g?.size??null)}),()=>{u=!0}},[e]);let[c,p]=t.useState(0);t.useEffect(()=>f.realm.onChanged(()=>p(u=>u+1)),[]);let l=a==="image"?`${bl(e)}?v=${c}`:null;return t.createElement("div",{className:"todo-attach-card"},t.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(u)}),title:e},t.createElement("span",{className:"todo-attach-copy"},t.createElement("span",{className:"todo-attach-name"},i),t.createElement("span",{className:"todo-attach-meta"},yi(e),r!==null&&` \xB7 ${bm(r)}`)),t.createElement("span",{className:"todo-attach-thumb"},l?t.createElement("img",{src:l,alt:"",loading:"lazy"}):t.createElement(s,null))),o&&t.createElement("button",{className:"todo-attach-remove",type:"button",onClick:o,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},t.createElement(we,null)))};var wm={image:pn,audio:mn,video:fn};function wi({onPick:e,onCancel:o,placeholder:r,autoFocus:n=!0}){let a=t.useRef(null),[i,s]=t.useState([]),[c,p]=t.useState(0),[l,u]=t.useState("idle"),g=t.useRef(null),b=t.useRef(0);t.useEffect(()=>{n&&a.current?.focus()},[n]),t.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=v=>{g.current!==null&&window.clearTimeout(g.current);let F=++b.current;if(!v.trim()){s([]),u("idle");return}u("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:v.trim(),kinds:["attachment"],limit:6}).then(_=>{F===b.current&&(s(_),p(0),u("done"))},()=>{F===b.current&&(s([]),u("done"))})},150)},w=v=>(v.value??v.id).trim();return t.createElement("div",{className:"todo-file-search"},t.createElement("div",{className:"todo-location-field"},t.createElement(ft,{className:"todo-location-field-icon"}),t.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:v=>m(v.currentTarget.value),onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="ArrowDown"&&i.length?(v.preventDefault(),p(F=>(F+1)%i.length)):v.key==="ArrowUp"&&i.length?(v.preventDefault(),p(F=>F<=0?i.length-1:F-1)):v.key==="Enter"?(v.preventDefault(),i[c]&&e(w(i[c]))):v.key==="Escape"&&(v.preventDefault(),v.stopPropagation(),o?.()))}}),o&&t.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:o},t.createElement(we,null))),l!=="idle"&&t.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},l==="searching"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),i.map((v,F)=>{let _=w(v),L=wm[hr(_)]??gt,A=_.includes("/")?_.slice(0,_.lastIndexOf("/")):"";return t.createElement("li",{key:v.id,role:"option","aria-selected":F===c},t.createElement("button",{type:"button",className:"todo-file-search-hit"+(F===c?" is-active":""),onMouseDown:y=>y.preventDefault(),onMouseEnter:()=>p(F),onClick:()=>e(_)},t.createElement(L,{className:"todo-file-search-glyph"}),t.createElement("span",{className:"todo-file-search-text"},t.createElement("span",{className:"todo-file-search-name"},v.label||_.split("/").pop()),A&&t.createElement("span",{className:"todo-file-search-folder"},A))))})))}var vm=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],wl=e=>{let[o,r]=(e||be(new Date)).split("-").map(Number);return new Date(o,r-1,1)};function oo({value:e,onChange:o}){let[r,n]=t.useState(()=>wl(e)),a=f.ui.language(),i=Math.max(0,vm.indexOf(String(f.getState().weekStart??"monday").toLowerCase())),s=be(new Date),c=r.getFullYear(),p=r.getMonth(),l=(new Date(c,p,1).getDay()-i+7)%7,u=Array.from({length:42},(w,v)=>new Date(c,p,1-l+v)),g=Array.from({length:7},(w,v)=>new Intl.DateTimeFormat(a,{weekday:"narrow"}).format(new Date(2024,0,7+(i+v)%7))),b=new Intl.DateTimeFormat(a,{month:"long",year:"numeric"}).format(r),m=w=>n(new Date(c,p+w,1));return t.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},t.createElement("div",{className:"todo-calendar-head"},t.createElement("span",{className:"todo-calendar-title"},b),t.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>m(-1)},t.createElement(bn,null)),t.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>m(1)},t.createElement(yn,null))),t.createElement("div",{className:"todo-calendar-grid"},g.map((w,v)=>t.createElement("span",{key:`w${v}`,className:"todo-calendar-weekday"},w)),u.map(w=>{let v=be(w),F=w.getMonth()!==p;return t.createElement("button",{key:v,type:"button",className:"todo-calendar-day"+(F?" is-outside":"")+(v===s?" is-today":"")+(v===e?" is-selected":""),"aria-pressed":v===e,"aria-label":new Intl.DateTimeFormat(a,{dateStyle:"full"}).format(w),onClick:()=>o(v)},w.getDate())})),t.createElement("div",{className:"todo-calendar-foot"},t.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>o("")},d("todo.calendar.clear")),t.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(wl(s)),o(s)}},d("todo.due.today"))))}function xm(e){let o=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(o);if(!r)return null;let n=Number(r[1]),a=Number(r[2]);return n>23||a>59?null:`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function br({value:e,onChange:o,ariaLabel:r,placeholder:n,disabled:a}){let[i,s]=t.useState(e),[c,p]=t.useState(!1);t.useEffect(()=>{s(e),p(!1)},[e]);let l=()=>{if(!i.trim()){p(!1),e&&o("");return}let u=xm(i);if(!u){p(!0);return}p(!1),s(u),u!==e&&o(u)};return t.createElement("input",{className:"settings-control todo-clock-input"+(c?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:i,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":c||void 0,title:c?d("todo.time.invalid"):void 0,disabled:a,autoComplete:"off",spellCheck:!1,onChange:u=>{let g=u.currentTarget.value.replace(/[^\d:]/g,""),b=g.indexOf(":");s(b<0?g:g.slice(0,b+1)+g.slice(b+1).replace(/:/g,"")),p(!1)},onBlur:l,onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),l())}})}function Kn(e){return f.markdown.render(e,{inline:!0})}var km={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Tm=["tomorrow","weekend","pick"];function Sm(e=be(new Date)){let o=Ka(e);if(!o)return e;let r=o.getDay(),n=r===6?1:(6-r+7)%7||7;return Ct(e,n)}function Vn(e,o=be(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?Ct(o,1):s==="weekend"?Sm(o):null,a=new Set,i=[];for(let s of Tm){let c=n(s);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:s,labelKey:km[s],date:c})}return i}function vl(e,{todo:o,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:s,disabled:c=!1}){let p=_e(o);n(o.id);let l=Vn(o.dueDate??"",be(new Date));return f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:t.createElement(We,{className:"todo-menu-action-icon"}),enabled:!c,submenu:ct().map(u=>({label:u.label,icon:t.createElement(xe,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>i(Ce(u.status))}))},{label:d("todo.menu.reschedule"),icon:t.createElement(at,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(u=>u.date).map(u=>({label:d(u.labelKey),icon:u.id==="tomorrow"?t.createElement(ar,{className:"todo-menu-action-icon"}):u.id==="weekend"?t.createElement(hn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:u.date})}))},{label:d(o.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:t.createElement(Le,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:o.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:t.createElement(Id,{className:"todo-menu-action-icon"}),enabled:!c,submenu:He.map(u=>({label:Ye(u.id),type:"radio",checked:o.priority===u.id,onSelect:()=>i({priority:u.id})}))},{label:d("todo.menu.moveGroup"),icon:t.createElement(cn,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!o.group,onSelect:()=>i({group:void 0})},...r.map(u=>({label:u,type:"radio",checked:o.group===u,onSelect:()=>i({group:u})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:t.createElement(Nd,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:t.createElement(Nt,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function Bn(e,o){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),vl({x:e.clientX,y:e.clientY},o))}var Hn=({todo:e,groupNames:o,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>t.createElement("div",{className:"todo-menu-wrap"},t.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:c=>{c.stopPropagation(),vl({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:o,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s})}},t.createElement(Sd,null)));function Am(e,o,r=.55){return o<=0?0:e*o*r/(o+r*Math.abs(e))}function Em(e,o=.998){return e/1e3*o/(1-o)}function xl(e,o=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=o));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function kl(e,o,r){if(o<=0)return 0;let n=Math.abs(e);if(n<=o)return e;let a=Math.max(20,r-o);return Math.sign(e)*(o+Am(n-o,a,.2))}function Tl(e){if(e.committed)return{target:0,commit:!0};let o=e.openWidth;if(o<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-o,Math.min(o,Em(e.velocity*r))),i=n+a;return{target:Math.abs(i-o)<Math.abs(i)?r*o:0,commit:!1}}function Sl(e,o,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,p=2*i*Math.sqrt(c),l=o+(-c*(e-r)-p*o)*s,u=e+l*s,g=Math.abs(u-r)<.5&&Math.abs(l)<20;return{value:g?r:u,velocity:g?0:l,done:g}}function vi(e,o,r){let n=o.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...o))+22),c=n*s<=i+(r?24:0),p=c?s:48,l=Math.min(n*p,Math.max(i,n*32)),u=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:p,labelled:c,openWidth:l,commitPoint:u}}var Al=.22,El=.18,Dm=.8,Wn=.9,Cm=400,Im=80,Nm=10,Lm=5,Pm=4,Om=3,Mm=.5,_m=6,zm=["left","right"],Dl={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Fm(e,o,r,n,a,i){return{kind:e,pointerId:o,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function Gm(e,o){let r={today:t.createElement(ar,null),tomorrow:t.createElement(ar,null),weekend:t.createElement(hn,null),pick:t.createElement(at,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?o.reschedule(n.date):o.pickDate(a)}}))}var wr=null;function Cl(e){if(wr===e)return;let o=wr;wr=e,o?.close()}function Il(e){wr===e&&(wr=null)}var Ao;function Nl(e,o){if(Ao===void 0)try{Ao=document.createElement("canvas").getContext("2d")}catch{Ao=null}return Ao?(Ao.font=o,Ao.measureText(e).width):e.length*7}var $m=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,yr=e=>e>0?"left":e<0?"right":null,Ll=({todo:e,disabled:o,actions:r,onEngage:n,children:a})=>{let i=t.useRef(null),s=t.useRef(null),c=t.useRef({left:null,right:null}),p=t.useRef(0),l=t.useRef(null),u=t.useRef(null),g=t.useRef([]),b=t.useRef(!1),m=t.useRef(null),w=t.useRef(null),v=t.useRef({velocity:0,target:0,response:Al,damping:Wn}),F=t.useRef({left:"",right:""}),_=t.useMemo(()=>Gm(Vn(e.dueDate??"",be(new Date)),r),[e.dueDate,r]),L=t.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:t.createElement(Le,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:t.createElement(Ad,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:t.createElement(Nt,null),run:()=>r.remove()}],[r,e.flagged]),A={left:_,right:L},[y,D]=t.useState(()=>({rowWidth:0,left:Dl,right:Dl})),H=t.useRef(y);H.current=y;let G=()=>{let T=i.current?.querySelector(".todo-swipe-action");if(!T||typeof getComputedStyle!="function")return"13px sans-serif";let z=getComputedStyle(T);return`${z.fontWeight} ${z.fontSize} ${z.fontFamily}`},B=()=>{let T=i.current?.clientWidth??0,z=G(),K=H.current,h={rowWidth:T,left:vi(T,_.map(Y=>Nl(Y.label,z)),K.left.labelled),right:vi(T,L.map(Y=>Nl(Y.label,z)),K.right.labelled)};H.current=h;let M=Y=>K[Y].openWidth!==h[Y].openWidth||K[Y].labelled!==h[Y].labelled;return(K.rowWidth!==T||M("left")||M("right"))&&D(h),h},E=t.useRef(B);E.current=B,t.useEffect(()=>{E.current()},[_,L]);let P=T=>{let z=yr(T);return!z||z!==u.current?!1:Math.abs(T)>=H.current[z].commitPoint},j=(T,z=!1)=>{p.current=T,z&&T!==0?Cl(x.current):T===0&&Il(x.current);let K=i.current,h=s.current;if(!K||!h)return;h.style.transform=T?`translate3d(${T}px, 0, 0)`:"";let M=yr(T),Y=H.current,W=P(T);K.classList.toggle("open",T!==0),K.classList.toggle("committed",W);for(let ae of zm){let q=c.current[ae];if(!q)continue;let ce=M===ae;q.classList.toggle("committed",ce&&W);let Ge=ce?W?"100%":`${Math.max(Y[ae].openWidth,Math.abs(T))}px`:`${T===0?Y[ae].openWidth:0}px`,Ke=`${Ge}|${ce}`;F.current[ae]!==Ke&&(F.current[ae]=Ke,q.style.width=Ge,q.setAttribute("aria-hidden",String(!ce)))}};t.useLayoutEffect(()=>j(p.current));let V=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},k=(T,z,K,h)=>{if(V(),T!==0&&Cl(x.current),p.current===T||$m()||typeof requestAnimationFrame!="function"){j(T);return}v.current={velocity:z,target:T,response:K,damping:h};let M=0,Y=W=>{let ae=M?(W-M)/1e3:.016666666666666666;M=W;let q=v.current,ce=Sl(p.current,q.velocity,q.target,ae,q.response,q.damping);q.velocity=ce.velocity,j(ce.value),m.current=ce.done?null:requestAnimationFrame(Y)};m.current=requestAnimationFrame(Y)},S=t.useRef(()=>{});S.current=()=>{l.current=null,k(0,0,El,Wn)};let $=t.useCallback(()=>S.current(),[]),x=t.useRef({close:()=>S.current()}),C=()=>{V(),l.current=null,w.current!=null&&window.clearTimeout(w.current),w.current=null,j(0)},O=t.useRef(C);O.current=C;let U=T=>{let z=H.current,K=yr(T);if(!K)return 0;let h=l.current?.origin;if(h&&K!==h)return 0;let M=z[K],Y=K===u.current?M.commitPoint:M.openWidth;return kl(T,Y,z.rowWidth)},N=(T,z,K,h,M)=>{V(),B();let Y=p.current,W=yr(Y),ae=Math.abs(Y)>8?W:null;u.current=W&&Math.abs(Y)>=H.current[W].openWidth-1?W:null,l.current=Fm(T,z,K,h,Y,ae),g.current=[{x:Y,t:M}]},X=(T,z)=>{let K=l.current;!K||K.ended||(K.live||(K.live=!0,V(),n?.()),g.current.push({x:T,t:z}),g.current.length>_m&&g.current.shift(),j(U(T),!0),P(p.current)&&(K.crossed=!0))},te=T=>{let z=l.current;if(!z||z.ended)return;if(z.ended=!0,!z.live){l.current=null;return}let K=()=>{z.kind==="pointer"&&(l.current=null)},h=xl(g.current),M=p.current,Y=yr(M);if(!Y){K(),j(0);return}let W=H.current[Y],ae=T&&P(M),q=Tl({offset:M,velocity:h,openWidth:W.openWidth,committed:ae});if(K(),q.commit){let ce=Y==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Ge=i.current?.querySelector(ce),Ke=A[Y],st=Y==="left"?Ke[0]:Ke[Ke.length-1];k(0,h,El,Wn),st?.run(Ge??i.current);return}k(q.target,h,Al,Math.abs(h)>Cm?Dm:Wn)};t.useEffect(()=>$(),[e.dueDate,e.flagged,$]),t.useEffect(()=>{let T=x.current;return()=>{V(),w.current!=null&&window.clearTimeout(w.current),Il(T)}},[]),t.useEffect(()=>{let T=i.current,z=T?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!T||!z)return;let K=0,h=new z(()=>{let M=T.clientWidth,Y=K!==M;K=M,E.current(),Y&&p.current!==0&&O.current()});return h.observe(T),()=>h.disconnect()},[]);let ie=t.useRef({disabled:o,begin:N,move:X,end:te});ie.current={disabled:o,begin:N,move:X,end:te},t.useEffect(()=>{let T=i.current;if(!T)return;let z=()=>{w.current!=null&&window.clearTimeout(w.current),w.current=null},K=()=>{w.current=null,l.current?.kind==="wheel"&&(ie.current.end(!0),l.current=null)},h=M=>{let Y=ie.current;if(Y.disabled||Math.abs(M.deltaX)<=Math.abs(M.deltaY)||M.deltaX===0)return;M.preventDefault();let W=M.deltaMode===WheelEvent.DOM_DELTA_LINE?16:M.deltaMode===WheelEvent.DOM_DELTA_PAGE?T.clientWidth:1,ae=-M.deltaX*W,q=l.current;(!q||q.kind!=="wheel")&&(Y.begin("wheel",-1,0,0,M.timeStamp),q=l.current),z(),w.current=window.setTimeout(K,Im);let ce=Math.abs(ae),Ge=q.previous;q.previous=ce;let Ke=q.live&&(q.ended||q.origin!==null&&p.current===0),st=ce>=Ge+Lm,Io=q.distance!==0&&Math.sign(ae)!==Math.sign(q.distance)&&ce>=Pm;if(Ke&&(st||Io)&&(Y.end(!1),Y.begin("wheel",-1,0,0,M.timeStamp),q=l.current,q.previous=ce),q.ended)return;if(q.decay=ce<Ge?q.decay+1:0,q.peak=Math.max(q.peak,ce),q.distance+=ae,q.live&&q.peak>=Nm&&q.decay>=Om&&ce<q.peak*Mm){Y.end(q.crossed);return}!q.live&&Math.abs(q.distance)<8||Y.move(q.base+q.distance,M.timeStamp)};return T.addEventListener("wheel",h,{passive:!1}),()=>{T.removeEventListener("wheel",h),z()}},[]);let re=(T,z)=>t.createElement("div",{ref:K=>{c.current[T]=K},className:`todo-swipe-tray todo-swipe-tray-${T} ${y[T].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${y[T].openWidth}px`}},z.map(K=>t.createElement("button",{key:K.key,type:"button",className:K.cls,tabIndex:-1,title:K.label,"aria-label":K.label,onClick:h=>{h.stopPropagation(),$(),K.run(h.currentTarget)}},K.icon,t.createElement("span",null,K.label))));return t.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:T=>{o||T.pointerType==="mouse"&&T.button!==0||T.target.closest(".todo-swipe-tray")||N("pointer",T.pointerId,T.clientX,T.clientY,T.timeStamp)},onPointerMove:T=>{let z=l.current;if(!z||z.kind!=="pointer"||z.pointerId!==T.pointerId)return;let K=T.clientX-z.originX,h=T.clientY-z.originY;if(!z.live){if(Math.abs(h)>Math.abs(K)){T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),l.current=null;return}if(Math.abs(K)<8)return;b.current=!0,T.currentTarget.setPointerCapture?.(T.pointerId)}T.preventDefault(),X(z.base+K,T.timeStamp)},onPointerUp:T=>{let z=l.current;!z||z.kind!=="pointer"||z.pointerId!==T.pointerId||(T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),z.live&&X(z.base+(T.clientX-z.originX),T.timeStamp),te(!0))},onPointerCancel:T=>{let z=l.current;!z||z.kind!=="pointer"||z.pointerId!==T.pointerId||(T.currentTarget.hasPointerCapture?.(T.pointerId)&&T.currentTarget.releasePointerCapture(T.pointerId),$())},onClickCapture:T=>{let z=!!T.target.closest(".todo-swipe-tray");if(z&&(b.current=!1),b.current&&!z){b.current=!1,T.stopPropagation(),T.preventDefault();return}p.current&&!z&&(T.stopPropagation(),T.preventDefault(),$())}},_.length>0&&re("left",_),t.createElement("div",{ref:s,className:"todo-swipe-surface"},a),L.length>0&&re("right",L))};function vr(e,o,r){let n=_e(o);f.ui.openMenu(ct().map(a=>({label:a.label,icon:t.createElement(xe,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ce(a.status))})),{anchor:e})}function Rm({status:e,style:o}){let r=Ae(e);return o==="filled"?t.createElement("span",{className:"todo-status-pill","data-status":e},et(e)):t.createElement("span",{className:`todo-status-text ${r.cls}`},t.createElement(xe,{status:e==="open"?null:e,dotCls:r.cls}),et(e))}function Pl({status:e}){return t.createElement(Rm,{status:e,style:Ps()})}var jm=2;function ki(e,o){let r=_e(e),n=o.pendingIds.has(e.id),a=t.useRef(null),i=t.useRef(null),s=t.useRef(!1),c=t.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return t.useEffect(()=>c,[c]),{check:t.createElement("span",{className:"todo-check-wrap"},t.createElement("input",{ref:a,className:"todo-check","data-status":r,type:"checkbox",checked:r==="completed","aria-disabled":n||void 0,onPointerDown:()=>{n||(s.current=!1,c(),i.current=window.setTimeout(()=>{s.current=!0;let l=a.current;l&&f.ui.openMenu(ct().map(u=>({label:u.label,icon:t.createElement(xe,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?r==="open":u.status===r,enabled:!n,onSelect:()=>o.patchTodo(e.id,Ce(u.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{s.current&&l.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:l=>{if(s.current){s.current=!1;return}o.patchTodo(e.id,Ce(l.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),r!=="open"&&r!=="completed"&&t.createElement("span",{className:"todo-check-glyph"},t.createElement(xe,{status:r,dotCls:Ae(r).cls}))),cancelHold:c}}var Ol=({todo:e,groups:o,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let s=t.useRef(null);t.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[c,p]=t.useState("");t.useEffect(()=>{let N=!0;return p(""),Kn(e.title).then(X=>{N&&p(X)}).catch(()=>{N&&p("")}),()=>{N=!1}},[e.title]);let l=(N,X)=>f.workspace.openFile(N,void 0,{newTab:X}),u=He.find(N=>N.id===e.priority)??He[0],g=ve(o),b=_e(e),m=[e.filePath,...e.attachments??[]].filter(N=>!!N),[w,v]=t.useState(!1),F=w?m:m.slice(0,jm),_=m.length-F.length,L=e.urls?.length??0,A=r&&m.length>0,y=!!e.remindAt&&!e.reminderFiredAt,D=!!e.status&&e.status!=="open"&&!Ae(e.status).done,H=e.tags?.length??0,G=n.pendingIds.has(e.id),B=be(new Date),E=e.dueDate&&!a?rt(e.dueDate,B,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",P=e.dueDate?Re(e.dueDate,f.getState().dateFormat):"",j=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<B,V=!!(E||e.startTime||y||e.group),k=!!(D||e.priority!=="normal"||e.location||L>0||A),S=t.useRef(null);t.useEffect(()=>S.current?Lr(e.id,S.current):void 0,[e.id]);let{check:$,cancelHold:x}=ki(e,n),C=()=>{ol(e)||n.openDetail(e.id)},O=N=>n.patchTodo(e.id,N),U=t.useMemo(()=>({reschedule:N=>{n.patchTodo(e.id,{dueDate:N})},pickDate:N=>{f.ui.openPopover(X=>t.createElement("div",{className:"todo-swipe-datepick"},t.createElement(oo,{value:e.dueDate?.slice(0,10)??"",onChange:te=>{n.patchTodo(e.id,{dueDate:te}),X.close()}})),{anchor:N},{ariaLabel:d("todo.swipe.date")})},setStatus:N=>vr(N,e,O),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{ut(e,n.removeTodo)}}),[e,n]);return t.createElement(Ll,{todo:e,disabled:G,actions:U,onEngage:x},t.createElement("article",{ref:S,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,"data-status":b,tabIndex:0,onContextMenu:N=>Bn(N,{todo:e,groupNames:g,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:O,onRequestDelete:()=>ut(e,n.removeTodo),disabled:G}),onKeyDown:N=>{if(N.target===N.currentTarget){if(N.key==="ArrowDown"||N.key==="ArrowUp"){N.preventDefault(),i?.(N.key==="ArrowDown"?1:-1);return}if(N.key==="Escape"){N.currentTarget.blur();return}N.key==="Enter"&&(N.preventDefault(),n.openDetail(e.id))}},onClick:N=>{N.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||N.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,C()},220))},onDoubleClick:N=>{s.current&&(clearTimeout(s.current),s.current=null),!N.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},$,t.createElement("div",{className:"todo-row-main"},t.createElement("h4",null,u.symbol&&t.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},u.symbol," "),c?t.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:c}}):t.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&t.createElement("div",{className:"todo-notes is-plain"},e.note),(V||k||!r&&H>0)&&t.createElement("div",{className:"todo-view-meta"},V&&t.createElement("div",{className:"todo-meta-line todo-meta-when"},t.createElement("span",{className:"todo-meta-cluster"},E&&t.createElement("button",{className:`todo-date${j?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:P||E}),onClick:N=>{N.stopPropagation(),C()}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(at,null)),t.createElement("span",{className:"todo-date-day"},E),P&&P!==E&&t.createElement("span",{className:"todo-date-full"},P)),e.startTime&&t.createElement("span",{className:"todo-clock-text"},!E&&t.createElement("span",{className:"todo-meta-icon"},t.createElement(Pd,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),y&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},t.createElement(Ld,null),e.remindAt.slice(11,16))),e.group&&t.createElement("span",{className:"todo-group-text",title:e.group,style:{color:Se(De(e.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),t.createElement("span",{className:"todo-meta-ellipsis"},e.group))),k&&t.createElement("div",{className:"todo-meta-line todo-meta-details"},D&&t.createElement(Pl,{status:e.status}),e.priority!=="normal"&&t.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Zt,null)),Es(e.priority)),e.location&&t.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:N=>{N.stopPropagation(),ir(e.location)}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Ze,null)),t.createElement("span",{className:"todo-meta-ellipsis"},e.location.name)),A&&t.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Lt,null)),m.length),L>0&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},t.createElement(Jt,null),L>1&&L)),!r&&H>0&&t.createElement("div",{className:"todo-meta-line todo-meta-tags"},e.tags.slice(0,3).map(N=>t.createElement("button",{key:N,className:"todo-tag-text",type:"button",onClick:X=>{X.stopPropagation(),_n(`#${N}`)}},"#",N)),H>3&&t.createElement("span",{className:"todo-tag-more",title:e.tags.slice(3).map(N=>`#${N}`).join(" ")},"+",H-3)))),t.createElement("div",{className:"todo-row-actions"},e.flagged&&t.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},t.createElement(Le,null)),t.createElement(Hn,{todo:e,groupNames:g,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:O,onRequestDelete:()=>ut(e,n.removeTodo),disabled:G})),!r&&m.length>0&&t.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},F.map(N=>t.createElement("button",{key:N,className:"todo-file-card",title:N,onClick:X=>{X.stopPropagation(),l(N,f.ui.hasModKey(X))},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},N===e.filePath?t.createElement(gt,null):t.createElement(Lt,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},fl(N)),t.createElement("span",{className:"todo-file-card-kind"},yi(N))))),(_>0||w)&&t.createElement("button",{className:`todo-file-card todo-file-card-more${w?" open":""}`,title:w?d("todo.fewerFiles"):d("todo.moreFiles",{p0:_}),"aria-expanded":w,onClick:N=>{N.stopPropagation(),v(X=>!X)},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},t.createElement(ln,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},w?d("todo.fewerFiles"):d("todo.moreFiles",{p0:_})))))))};function qn({value:e,onChange:o,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=t.useRef(null),s=c=>{let p=c.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),l=[...e];for(let u of p)l.some(g=>g.toLowerCase()===u.toLowerCase())||l.push(u);return l.length===e.length?!1:(o(l),!0)};return t.useEffect(()=>{r&&i.current?.focus()},[r]),t.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),i.current?.focus())}},e.map(c=>t.createElement("span",{key:c,className:"todo-tags-chip"},t.createElement("span",null,"#",c),t.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:c}),title:d("todo.compose.removeTag",{tag:c}),onClick:()=>{o(e.filter(p=>p!==c)),i.current?.focus()}},t.createElement(we,null)))),t.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let p=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&p.value.trim()?(c.preventDefault(),s(p.value)&&(p.value="")):c.key==="Backspace"&&!p.value&&e.length&&(c.preventDefault(),o(e.slice(0,-1))))},onBlur:c=>{s(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let p=c.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(c.preventDefault(),s(c.currentTarget.value+p),c.currentTarget.value="")}}))}function Um(e,o){return e==="all"?o:e.filter(r=>o.includes(r))}function Yn(e,o,r){let n=Um(e,o);return r?n:n.filter(a=>!uo(a))}function Ti(){let[e,o]=yt(),[r]=wt(),a=lt().map(u=>u.id),i=Yn(e,a,r),s=a.filter(u=>!uo(u)),c=a.filter(u=>uo(u)),p=u=>u.length===i.length&&u.every(g=>i.includes(g)),l=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:i.length===a.length,select:()=>{Qt(!0),o("all")}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:p(s),select:()=>{Qt(!1),o(s)}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:p(c),select:()=>{Qt(!0),o(c)}}];return t.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},l.map(u=>t.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Ml(){let[e,o]=yt(),[r]=wt(),n=lt(),a=n.map(c=>c.id),i=Yn(e,a,r),s=c=>{let p=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);p.length&&(Qt(p.some(l=>uo(l))),o(p.length===a.length?"all":p))};return t.createElement("div",{className:"todo-status-filter-menu"},t.createElement(Ti,null),t.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let p=i.includes(c.id);return t.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:c.id,onClick:()=>s(c.id)},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(xe,{status:c.id==="open"?null:c.id,dotCls:c.cls})),t.createElement("span",null,c.label))}))}var Fl=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],Km=["title","due","priority","group","note"],Si=[10,20,30,40,50,100,200,500],Do=He.map(e=>e.id).reverse(),Gl=Fl.map(e=>e.id),Eo={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function ro(e,o,r){let n=e.ownerDocument.createElement("span");n.className=o,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var no=e=>e.replace(/[&<>"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[o]);function Vm(e){let[o,r]=t.useState({due:Eo.due,priority:Eo.priority,flagged:Eo.flagged,mins:{...Zn}}),n=f.getState().dateFormat,a=f.ui.language();return t.useLayoutEffect(()=>{let i=e.current;if(!i)return;let s=be(new Date),c={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},p=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(v,F)=>rt(`2030-${String(F+1).padStart(2,"0")}-28`,s,c,a,n))],l=Math.max(...p.map(v=>ro(i,"todo-table-cell-btn is-overdue",`<span>${no(v)}</span><span class="todo-table-time">23:59</span>`)),ro(i,"todo-table-sort active",`<span>${no(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...Do.map(v=>ro(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${no(Ye(v))}</span>`)),ro(i,"todo-table-sort active",`<span>${no(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=ro(i,"todo-table-sort active",`<span>${no(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),b=v=>ro(i,"todo-table-sort active",`<span>${no(d(v))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(Ei.map(v=>[v,Math.max(Zn[v],b(v==="title"?"todo.table.title":Ai[v]))])),w={due:Math.max(l+10,96),priority:Math.max(u+10,72),flagged:Math.max(g+10,48),mins:m};r(v=>JSON.stringify(v)===JSON.stringify(w)?v:w)},[e,n,a]),o}var Bm=360;function Hm(e,o){let[r,n]=t.useState(Eo.tags),a=[...new Set(o.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],i=a.join("\0");return t.useLayoutEffect(()=>{let s=e.current;if(!s)return;let c=Math.max(0,...a.map(p=>ro(s,"",p.split(`
`).map(l=>`<span class="todo-table-tag">#${no(l)}</span>`).join(""))));n(Math.min(Bm,Math.max(Eo.tags,c+12)))},[e,i]),r}var Wm=240,qm=82,Ai=Object.fromEntries(Fl.map(e=>[e.id,e.labelKey]));function Ym(e){if(!Array.isArray(e))return Km;let o=[...new Set(e)].filter(r=>r==="title"||Gl.includes(r));return o.includes("title")?o:["title",...o]}function Xm(e){return Array.isArray(e)?Do.filter(o=>e.includes(o)):[]}function Zm(e){return Si.includes(e)?e:Si[0]}function Xn(e,o){let[r,n]=t.useState(()=>o(f.settings.get()[e]));t.useEffect(()=>f.settings.subscribe(()=>n(o(f.settings.get()[e]))),[e,o]);let a=t.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var $l=()=>Xn("pageColumns",Ym),Rl=e=>e==="title"?"todo.table.title":Ai[e],Jn=()=>Xn("pagePriorityFilter",Xm),Mt=({priority:e})=>t.createElement(e==="high"?Qa:e==="medium"?_d:e==="low"?ei:$d,{className:`todo-table-priority-icon todo-priority-${e}`});function Jm({label:e,active:o,icon:r,onOpen:n}){return t.createElement("button",{type:"button",className:`todo-page-appbar-btn${o?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function Qm(){let[e]=yt(),[o]=wt(),n=lt().map(c=>c.id),a=Yn(e,n,o),i=e!=="all"&&a.length!==n.length,s=d("todo.filters.statuses");return t.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":s,title:s,onClick:c=>{f.ui.openPopover(()=>t.createElement(Ml,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},t.createElement(We,null))}function ef(){let[e,o]=Jn();return t.createElement("div",{className:"todo-status-filter-menu"},Do.map(r=>{let n=e.includes(r);return t.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>o(n?e.filter(a=>a!==r):Do.filter(a=>e.includes(a)||a===r))},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(Mt,{priority:r})),t.createElement("span",null,Ye(r)))}))}function jl(){let[e]=Jn();return t.createElement(Jm,{label:d("todo.table.priority"),active:e.length>0,icon:t.createElement(Zt,null),onOpen:o=>{f.ui.openPopover(()=>t.createElement(ef,null),{anchor:o,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function tf(){let[e,o]=$l(),r=[...e,...Gl.filter(p=>!e.includes(p))],[n,a]=t.useState(null),[i,s]=t.useState(null),c=(p,l,u)=>{if(p===l)return;let g=r.filter(b=>b!==p);g.splice(g.indexOf(l)+(u?1:0),0,p),o(g.filter(b=>e.includes(b)))};return t.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),s(null)}},t.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),t.createElement("div",{className:"todo-filter-divider"}),r.map((p,l)=>{let u=e.includes(p),g=p==="title",b=d(Rl(p));return t.createElement("div",{key:p,className:`todo-column-option${g?" is-locked":""}${n===p?" is-dragging":""}${i?.id===p?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let w=m.currentTarget.getBoundingClientRect();s({id:p,after:m.clientY>w.top+w.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),s(null)}},t.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:b}),title:d("todo.table.reorderColumn",{p0:b}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",p);let w=m.currentTarget.parentElement;w&&m.dataTransfer.setDragImage(w,12,w.offsetHeight/2),a(p)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let w=r[l+(m.key==="ArrowUp"?-1:1)];w&&c(p,w,m.key==="ArrowDown")}},t.createElement(wo,null)),t.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:g,onClick:()=>o(r.filter(m=>m===p?!u:e.includes(m)))},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),t.createElement("span",null,b)))}))}function Ul(){return t.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>t.createElement(tf,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},t.createElement(Gd,null))}function _l({field:e,label:o,className:r,sort:n,onSort:a,width:i,resize:s,thProps:c}){let p=n.field===e,l=p?n.dir==="asc"?Qa:ei:Ja;return t.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},t.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":o,title:o,onClick:()=>a(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},t.createElement("span",null,o),t.createElement(l,null)),s)}var Ei=["title","note","group","location","tags"],Zn={title:180,note:120,group:104,location:104,tags:96},Kl=900;function of(e){let o=e&&typeof e=="object"?e:{},r={};for(let n of Ei){let a=o[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(Kl,Math.max(Zn[n],a))))}return r}function rf({id:e,label:o,min:r,onDrag:n,onCommit:a,onReset:i}){let s=t.useRef(null),c=p=>Math.round(Math.min(Kl,Math.max(r,p)));return t.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:o}),title:d("todo.table.resizeColumn",{p0:o}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),i(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let l=p.currentTarget.parentElement,u=l?l.getBoundingClientRect().width:Zn[e];s.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!s.current)return;let l=c(s.current.startWidth+p.clientX-s.current.startX);s.current.width=l,n(e,l)},onPointerUp:p=>{s.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),a(e,s.current.width),s.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),s.current=null}})}function nf({todo:e,onPatch:o}){let[r,n]=t.useState(e.dueDate?.slice(0,10)??""),[a,i]=t.useState(e.startTime??"");return t.createElement("div",{className:"todo-cell-editor"},t.createElement(oo,{value:r,onChange:s=>{n(s),s||i(""),o(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),t.createElement(br,{value:a,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{i(s),o({startTime:s||void 0})}}))}function Vl({initial:e,onInput:o,onDone:r}){return t.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>o(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Bl({todo:e,onPatch:o}){let[r,n]=t.useState(e.tags??[]);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(qn,{value:r,autoFocus:!0,onChange:a=>{n(a),o({tags:a})}}))}function Hl({todo:e,onPatch:o}){let[r,n]=t.useState(e.location);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),o({location:a})}}))}var zl='input, button, a, textarea, [contenteditable="true"]';function Qn(e){return e.split(`
`).map(o=>o.trim()).find(Boolean)??""}function af({todo:e,groups:o,columns:r,c:n,selected:a,onPick:i}){let s=t.useRef(null);t.useEffect(()=>s.current?Lr(e.id,s.current):void 0,[e.id]);let[c,p]=t.useState("");t.useEffect(()=>{let x=!0;return p(""),Kn(e.title).then(C=>{x&&p(C)}).catch(()=>{x&&p("")}),()=>{x=!1}},[e.title]);let l=Qn(e.note),{check:u}=ki(e,n),g=_e(e),b=n.pendingIds.has(e.id),m=x=>n.patchTodo(e.id,x),w=be(new Date),v=f.getState().dateFormat,F=e.dueDate?rt(e.dueDate,w,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),v):"",_=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<w,[L,A]=t.useState(!1),y=t.useRef(null);t.useEffect(()=>()=>{y.current&&clearTimeout(y.current)},[]);let[D,H]=t.useState(e.title),G=()=>{let x=D.trim();A(!1),x&&x!==e.title&&m({title:x})},[B,E]=t.useState(null),P=(x,C)=>{E(x),C.catch(()=>{}).finally(()=>E(O=>O===x?null:O))},j=(x,C,O,U,N=260)=>{P(x,f.ui.openPopover(U,{anchor:C,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:O,width:N}))},V=(x,C,O)=>B===x?t.createElement("span",{className:"todo-table-placeholder"},C,t.createElement("span",null,O)):null,k=x=>`todo-table-${x}${B===x?" is-editing":""}`,S=x=>{let C=e.note,O=()=>{C!==e.note&&m({note:C})};E("note"),f.ui.openPopover(({close:U})=>t.createElement(Vl,{initial:e.note,onInput:N=>{C=N},onDone:()=>{O(),U()}}),{anchor:x,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(O(),!0)}).catch(()=>{}).finally(()=>E(U=>U==="note"?null:U))},$=x=>{switch(x){case"note":return t.createElement("td",{className:k("note"),title:l||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:C=>S(C.currentTarget)},l?t.createElement("span",{className:"todo-table-note-text"},l):V("note",null,d("todo.table.note"))));case"group":return t.createElement("td",{className:k("group")},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:C=>P("group",f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>m({group:void 0})},...ve(o).map(O=>({label:O,type:"radio",checked:e.group===O,color:De(O,o),onSelect:()=>m({group:O})}))],{anchor:C.currentTarget,align:"start"}))},e.group?t.createElement("span",{className:"todo-table-group-pill",title:e.group,style:{"--todo-group-color":Se(De(e.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),t.createElement("span",{className:"todo-table-group-name"},e.group)):V("group",null,d("todo.table.group"))));case"priority":return t.createElement("td",{className:k("priority")},t.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:b,title:d("todo.table.priority"),onClick:C=>P("priority",f.ui.openMenu(Do.map(O=>({label:Ye(O),icon:t.createElement(Mt,{priority:O}),type:"radio",checked:e.priority===O,onSelect:()=>m({priority:O})})),{anchor:C.currentTarget}))},t.createElement(Mt,{priority:e.priority}),t.createElement("span",null,Ye(e.priority))));case"due":return t.createElement("td",{className:k("due")},t.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${_?" is-overdue":""}`,disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:e.dueDate?Re(e.dueDate,v):d("todo.field.dueDate"),onClick:C=>j("due",C.currentTarget,d("todo.field.dueDate"),()=>t.createElement(nf,{todo:e,onPatch:O=>{m(O)}}),240)},t.createElement("span",null,F),e.startTime&&t.createElement("span",{className:"todo-table-time"},e.startTime)));case"flagged":return t.createElement("td",{className:k("flagged")},t.createElement("button",{type:"button",className:`todo-table-flag-btn${e.flagged?" on":""}`,"aria-pressed":!!e.flagged,disabled:b,"aria-label":d("todo.flag"),title:d(e.flagged?"todo.flagged":"todo.flag"),onClick:()=>m({flagged:!e.flagged})},t.createElement(Le,null)));case"location":return t.createElement("td",{className:k("location")},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:e.location?.name??d("todo.field.location"),onClick:C=>j("location",C.currentTarget,d("todo.field.location"),()=>t.createElement(Hl,{todo:e,onPatch:O=>{m(O)}}),300)},e.location?t.createElement(t.Fragment,null,t.createElement(Ze,null),t.createElement("span",null,e.location.name)):V("location",t.createElement(Ze,null),d("todo.field.location"))));case"tags":return t.createElement("td",{className:k("tags"),title:e.tags?.map(C=>`#${C}`).join(" ")||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:C=>j("tags",C.currentTarget,d("todo.edit.tags"),()=>t.createElement(Bl,{todo:e,onPatch:O=>{m(O)}}),280)},e.tags?.length?e.tags.map(C=>t.createElement("span",{key:C,className:"todo-table-tag"},"#",C)):V("tags",null,d("todo.table.tags"))))}};return t.createElement("tr",{ref:s,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}${B||L?" is-editing":""}`,"data-todo-id":e.id,"data-status":g,"aria-selected":a,tabIndex:0,onContextMenu:x=>Bn(x,{todo:e,groupNames:ve(o),setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>ut(e,n.removeTodo),disabled:b}),onKeyDown:x=>{if(x.target===x.currentTarget)if(x.key==="ArrowDown"||x.key==="ArrowUp"){x.preventDefault();let C=x.key==="ArrowDown"?x.currentTarget.nextElementSibling:x.currentTarget.previousElementSibling;for(;C&&!C.classList.contains("todo-table-row");)C=x.key==="ArrowDown"?C.nextElementSibling:C.previousElementSibling;C?.focus()}else x.key==="Enter"?(x.preventDefault(),n.openDetail(e.id)):x.key===" "?(x.preventDefault(),i(!1)):x.key==="Escape"&&x.currentTarget.blur()},onClick:x=>{x.target.closest(zl)||(f.ui.hasModKey(x)||x.shiftKey)&&i(x.shiftKey)},onDoubleClick:x=>{let C=!!x.target.closest(".todo-table-title-btn");C&&y.current&&(clearTimeout(y.current),y.current=null),!(!C&&x.target.closest(zl)||f.ui.hasModKey(x)||x.shiftKey)&&n.openDetail(e.id)}},t.createElement("td",{className:"todo-table-select"},u),r.map(x=>t.createElement(t.Fragment,{key:x},x==="title"?t.createElement("td",{className:"todo-table-title"},L?t.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:D,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:C=>H(C.target.value),onBlur:G,onKeyDown:C=>{C.nativeEvent.isComposing||(C.key==="Enter"?(C.preventDefault(),G()):C.key==="Escape"&&(C.preventDefault(),H(e.title),A(!1)))}}):t.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:b,"aria-label":d("todo.table.editTitle",{p0:e.title}),onClick:C=>{if(f.ui.hasModKey(C)||C.shiftKey){i(C.shiftKey);return}C.detail>1||(y.current&&clearTimeout(y.current),y.current=setTimeout(()=>{y.current=null,H(e.title),A(!0)},220))}},c?t.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:c}}):t.createElement("span",{className:"todo-table-title-text"},e.title))):$(x))),t.createElement("td",{className:"todo-table-actions"},e.flagged&&!r.includes("flagged")&&t.createElement("span",{className:"todo-table-flag",title:d("todo.flagged")},t.createElement(Le,null)),t.createElement(Hn,{todo:e,groupNames:ve(o),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>ut(e,n.removeTodo),disabled:b})))}function sf(e){return e.split(/\r?\n/).map(o=>o.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function df({order:e,groups:o,c:r,newTaskPatch:n,active:a,onActivate:i,onRemove:s}){let[c,p]=t.useState(""),[l,u]=t.useState({}),g=t.useRef(null),b=t.useRef(null),m=t.useRef(!1),[w,v]=t.useState(!0);t.useEffect(()=>{let E=()=>{let j=g.current;j&&(!j.ownerDocument.hasFocus()&&!/jsdom/i.test(navigator.userAgent)&&j.ownerDocument.defaultView?.focus(),j.focus())};E();let P=window.setTimeout(E,60);return()=>window.clearTimeout(P)},[]);let F=async E=>{let P=be(new Date);for(let j of E){let V=tn(j,P);if(!V.title)continue;let k=V.dueDate||l.dueDate;await r.create(V.title,void 0,{patch:{...n?.(),priority:V.priority!=="normal"?V.priority:l.priority??V.priority,...k?{dueDate:k}:{},...l.group?{group:l.group}:{},...l.flagged?{flagged:!0}:{},...l.note?.trim()?{note:l.note}:{},...l.location?{location:l.location}:{},...l.tags?.length?{tags:l.tags}:{},...l.status?Ce(l.status):{}}})}p(""),g.current?.focus()},_=s,L=!c.trim(),A=()=>{window.setTimeout(()=>{let E=b.current?.ownerDocument;m.current||!E||!E.hasFocus()||b.current?.contains(E.activeElement)||(L?_():v(!1))},0)};t.useEffect(()=>{let E=j=>{m.current||b.current?.contains(j.target)||(L?_():v(!1))},P=b.current?.ownerDocument;return P?.addEventListener("pointerdown",E,!0),()=>P?.removeEventListener("pointerdown",E,!0)});let y=t.useRef(a);t.useEffect(()=>{y.current&&!a&&(L?_():v(!1)),y.current=a});let D=E=>{m.current=!0,E.catch(()=>{}).finally(()=>{m.current=!1,g.current?.focus()})},H=E=>{switch(E){case"due":{let P=l.dueDate,j=P?rt(P,be(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"";return t.createElement("td",{key:E,className:"todo-table-due"},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:V=>D(f.ui.openPopover(({close:k})=>t.createElement("div",{className:"todo-cell-editor"},t.createElement(oo,{value:P??"",onChange:S=>{u($=>({...$,dueDate:S||void 0})),k()}})),{anchor:V.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},j?t.createElement("span",null,j):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let P=l.priority??"normal";return t.createElement("td",{key:E,className:"todo-table-priority"},t.createElement("button",{type:"button",className:`todo-table-cell-btn${P==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:j=>D(f.ui.openMenu(Do.map(V=>({label:Ye(V),icon:t.createElement(Mt,{priority:V}),type:"radio",checked:P===V,onSelect:()=>u(k=>({...k,priority:V}))})),{anchor:j.currentTarget}))},t.createElement(Mt,{priority:P}),t.createElement("span",null,Ye(P))))}case"group":return t.createElement("td",{key:E,className:"todo-table-group"},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:P=>D(f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>u(j=>({...j,group:void 0}))},...ve(o).map(j=>({label:j,type:"radio",checked:l.group===j,color:De(j,o),onSelect:()=>u(V=>({...V,group:j}))}))],{anchor:P.currentTarget,align:"start"}))},l.group?t.createElement("span",{className:"todo-table-group-pill",title:l.group,style:{"--todo-group-color":Se(De(l.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),t.createElement("span",{className:"todo-table-group-name"},l.group)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return t.createElement("td",{key:E,className:"todo-table-flagged"},t.createElement("button",{type:"button",className:`todo-table-flag-btn${l.flagged?" on":""}`,"aria-pressed":!!l.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>u(P=>({...P,flagged:!P.flagged||void 0}))},t.createElement(Le,null)));case"note":return t.createElement("td",{key:E,className:"todo-table-note",title:l.note||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:P=>{let j=l.note??"",V=()=>u(k=>({...k,note:j||void 0}));D(f.ui.openPopover(({close:k})=>t.createElement(Vl,{initial:l.note??"",onInput:S=>{j=S},onDone:()=>{V(),k()}}),{anchor:P.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(V(),!0)}))}},l.note?t.createElement("span",{className:"todo-table-note-text"},Qn(l.note)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return t.createElement("td",{key:E,className:"todo-table-location"},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:P=>D(f.ui.openPopover(()=>t.createElement(Hl,{todo:{location:l.location},onPatch:j=>u(V=>({...V,location:j.location}))}),{anchor:P.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},l.location?t.createElement(t.Fragment,null,t.createElement(Ze,null),t.createElement("span",null,l.location.name)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return t.createElement("td",{key:E,className:"todo-table-tags"},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:P=>D(f.ui.openPopover(()=>t.createElement(Bl,{todo:{tags:l.tags??[]},onPatch:j=>u(V=>({...V,tags:j.tags}))}),{anchor:P.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},l.tags?.length?l.tags.map(P=>t.createElement("span",{key:P,className:"todo-table-tag"},"#",P)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return t.createElement("td",{key:E,className:`todo-table-${E}`})}},G=l.status?ct().find(E=>E.status===l.status):void 0,B=E=>D(f.ui.openMenu(ct().map(P=>({label:P.label,icon:t.createElement(xe,{status:P.status,dotCls:P.cls,color:P.color}),type:"radio",checked:P.status===null?!l.status:P.status===l.status,onSelect:()=>u(j=>({...j,status:P.status}))})),{anchor:E}));return t.createElement("tr",{className:"todo-table-new-row"+(w&&a?"":" is-idle"),ref:b,onBlur:A,onFocus:()=>{v(!0),i()}},t.createElement("td",{className:"todo-table-select"},t.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:G?.label??d("todo.table.status"),onClick:E=>B(E.currentTarget)},G?t.createElement(xe,{status:G.status,dotCls:G.cls}):t.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),e.map(E=>E==="title"?t.createElement("td",{key:E,className:"todo-table-title"},t.createElement("input",{ref:g,className:"todo-table-new-input",value:c,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:P=>p(P.target.value),onKeyDown:P=>{P.nativeEvent.isComposing||(P.key==="Enter"?(P.preventDefault(),c.trim()?F([c]):_()):P.key==="Escape"&&(P.preventDefault(),_()))},onPaste:P=>{let j=P.clipboardData.getData("text/plain");/\r?\n/.test(j.trim())&&(P.preventDefault(),F(sf(`${c}${j}`)))}})):H(E)),t.createElement("td",{className:"todo-table-actions"}))}function Wl({todos:e,groups:o,c:r,sort:n,onSort:a,resetKey:i,empty:s,sectionOf:c,composeSignal:p=0,newTaskPatch:l}){let[u,g]=$l(),b=u.filter(R=>R!=="title"),[m,w]=t.useState(null),[v,F]=t.useState(null),_=R=>({className:`${m===R?" is-dragging":""}${v?.id===R?v.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:oe=>{if(oe.target.closest(".todo-col-resize")){oe.preventDefault();return}oe.dataTransfer.effectAllowed="move",oe.dataTransfer.setData("text/plain",R);let le=oe.currentTarget.ownerDocument,me=le.createElement("div");me.className="todo-col-drag-chip",me.textContent=d(Rl(R)),le.body.appendChild(me),oe.dataTransfer.setDragImage?.(me,Math.round(me.offsetWidth/2),Math.round(me.offsetHeight/2)),window.setTimeout(()=>me.remove(),0),w(R)},onDragOver:oe=>{if(!m||m===R)return;oe.preventDefault(),oe.dataTransfer.dropEffect="move";let le=oe.currentTarget.getBoundingClientRect();F({id:R,after:oe.clientX>le.left+le.width/2})},onDrop:oe=>{if(oe.preventDefault(),m&&v&&m!==v.id){let le=u.filter(me=>me!==m);le.splice(le.indexOf(v.id)+(v.after?1:0),0,m),g(le)}w(null),F(null)},onDragEnd:()=>{w(null),F(null)}}}),L=t.useRef(null),A=Vm(L),[y,D]=Xn("pageColumnWidths",of),[H,G]=t.useState({}),B=Hm(L,e),E=Object.fromEntries(Object.entries({tags:B,...y,...H}).map(([R,oe])=>[R,Math.max(oe,A.mins[R])])),P=R=>R==="due"?A.due:R==="priority"?A.priority:R==="flagged"?A.flagged:E[R]??Eo[R],[j,V]=Xn("pageRowsPerPage",Zm),[k,S]=t.useState([]),[$,x]=t.useState(null),C=t.useRef(1),O=t.useRef(null);t.useEffect(()=>{if(!p)return;let R=C.current++;S(oe=>[R,...oe]),x(R),X(0),O.current?.scrollTo?.({top:0})},[p]);let U=R=>S(oe=>oe.filter(le=>le!==R)),[N,X]=t.useState(0),[te,ie]=t.useState(i);te!==i&&(ie(i),X(0));let[re,T]=t.useState(()=>new Set),z=t.useRef(null),K=Math.max(1,Math.ceil(e.length/j)),h=Math.min(N,K-1),M=e.slice(h*j,(h+1)*j),Y=t.useMemo(()=>e.filter(R=>re.has(R.id)),[e,re]),W=t.useMemo(()=>e.reduce((R,oe)=>R+(oe.completed?1:0),0),[e]),ae=Me(),q=t.useSyncExternalStore(ae.subscribe,ae.get,ae.get),ce=t.useCallback(R=>{let oe=e.findIndex(le=>le.id===R);oe>=0&&X(Math.floor(oe/j))},[e,j]);t.useLayoutEffect(()=>{q?.todoId&&ce(q.todoId)},[q,ce]),t.useLayoutEffect(()=>{r.editingId&&ce(r.editingId)},[r.editingId]);let Ge=(R,oe)=>{T(le=>{let me=new Set(le);for(let Qe of R)oe?me.add(Qe):me.delete(Qe);return me})},Ke=(R,oe)=>{let le=M.findIndex(Qe=>Qe.id===R),me=oe?M.findIndex(Qe=>Qe.id===z.current):-1;me>=0?Ge(M.slice(Math.min(me,le),Math.max(me,le)+1).map(Qe=>Qe.id),!0):Ge([R],!re.has(R)),z.current=R},st=()=>{for(let R of Y)r.patchTodo(R.id,Ce("completed"));T(new Set)},Io=async()=>{let R=Y.map(le=>le.id);await f.ui.confirm({title:d("todo.table.deleteTitle",{count:R.length}),message:d("todo.table.deleteMessage",{count:R.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(R.map(le=>r.removeTodo(le))),T(new Set))},No=(R,oe)=>t.createElement(rf,{id:R,label:oe,min:A.mins[R],onDrag:(le,me)=>G(Qe=>({...Qe,[le]:me})),onCommit:(le,me)=>{G({}),D({...y,[le]:me})},onReset:le=>{G({});let me={...y};delete me[le],D(me)}}),Lo=R=>{let oe=d(Ai[R]),le=Ei.includes(R);return t.createElement(_l,{field:R==="note"?"notes":R,label:oe,className:`todo-table-${R}${_(R).className}`,thProps:_(R).props,sort:n,onSort:a,width:le?E[R]:void 0,resize:le?No(R,oe):void 0})},ao=3+b.length,xr=t.useMemo(()=>{if(!c)return null;let R=new Map;for(let oe of e){let le=c(oe);R.set(le,(R.get(le)??0)+1)}return R},[e,c]),xt=[],Po=null;for(let R of M){let oe=c?.(R)??null;oe&&oe!==Po&&xt.push(t.createElement("tr",{className:`todo-table-section todo-table-section-${oe}`,key:`section:${oe}`},t.createElement("td",{className:"todo-table-select"},t.createElement("span",{className:"todo-table-section-text"},t.createElement("span",{className:"todo-table-section-label"},d(id[oe])),t.createElement("span",{className:"todo-table-section-count"},xr?.get(oe)??0))),u.map(le=>t.createElement("td",{key:le,className:`todo-table-${le}`})),t.createElement("td",{className:"todo-table-actions"}))),Po=oe,xt.push(t.createElement(af,{key:R.id,todo:R,groups:o,columns:u,c:r,selected:re.has(R.id),onPick:le=>Ke(R.id,le)}))}return t.createElement("div",{className:"todo-table-shell"},t.createElement("div",{className:"todo-table-scroll",ref:O},t.createElement("table",{ref:L,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:qm+(E.title??Wm)+b.reduce((R,oe)=>R+P(oe),0),"--todo-due-width":`${A.due}px`,"--todo-priority-width":`${A.priority}px`,"--todo-flagged-width":`${A.flagged}px`}},t.createElement("thead",null,t.createElement("tr",null,t.createElement("th",{className:"todo-table-select"},t.createElement(Qm,null)),u.map(R=>t.createElement(t.Fragment,{key:R},R==="title"?t.createElement(_l,{field:"name",label:d("todo.table.title"),className:`todo-table-title${_("title").className}`,thProps:_("title").props,sort:n,onSort:a,width:E.title,resize:No("title",d("todo.table.title"))}):Lo(R))),t.createElement("th",{className:"todo-table-actions",style:E.title?{width:"auto",minWidth:48}:void 0}))),t.createElement("tbody",null,k.map(R=>t.createElement(df,{key:R,order:u,groups:o,c:r,newTaskPatch:l,active:$===R,onActivate:()=>x(R),onRemove:()=>U(R)})),xt)),!M.length&&!k.length&&t.createElement("div",{className:"todo-table-empty-state"},s)),t.createElement("div",{className:"todo-table-footer"},t.createElement("div",{className:"todo-table-selection"},t.createElement("span",null,Y.length?d("todo.table.selectedCount",{count:Y.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!Y.length&&t.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:W})),Y.length>0&&t.createElement(t.Fragment,null,t.createElement("button",{type:"button",className:"todo-table-bulk",onClick:st},d("todo.table.complete")),t.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{Io()}},d("auto.f6fdbe48dc54")))),t.createElement("div",{className:"todo-table-pagination"},t.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),t.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:R=>{f.ui.openMenu(Si.map(oe=>({label:String(oe),type:"radio",checked:oe===j,onSelect:()=>{V(oe),X(0)}})),{anchor:R.currentTarget,align:"start"})}},t.createElement("span",null,j),t.createElement(Ja,null)),K>1&&t.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:h+1,pages:K})),K>1&&t.createElement("div",{className:"todo-table-pager"},t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:h===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>X(0)},t.createElement(zd,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:h===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>X(h-1)},t.createElement(bn,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:h>=K-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>X(h+1)},t.createElement(yn,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:h>=K-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>X(K-1)},t.createElement(Fd,null))))))}function Di(e,o=500,r){let n=t.useRef(e);n.current=e;let a=t.useRef(null),i=t.useRef(!1),s=t.useRef(null),c=t.useRef(0),p=t.useRef(r);p.current=r;let l=t.useCallback(async()=>{if(i.current)return;let u=a.current;if(u!==null){a.current=null,i.current=!0;try{let g=await n.current(u);!g&&a.current===null&&(a.current=u),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=u),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?s.current=window.setTimeout(()=>{l()},250):a.current!==null&&p.current?.()}}},[]);return t.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),l()},[l]),t.useCallback(u=>{a.current=u,c.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,l()},o)},[l,o])}function lf({value:e,onCommit:o,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,c]=t.useState(e),p=t.useRef(!1);t.useEffect(()=>{p.current||c(e)},[e]);let l=()=>{s!==e&&o(s)};return t.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>c(u.target.value),onBlur:()=>{p.current=!1,l()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(c(e),u.currentTarget.blur())}})}function cf(e){let o=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=o.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},o.set(e,r)),r}var uf=({todoId:e,c:o,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=f.ui.settings,[c,p]=t.useState(ke);t.useEffect(()=>Pt(p),[]);let l=c.find(h=>h.id===e),u=Hs(e),g=Be(),[b,m]=t.useState(!1),[w,v]=t.useState(!1),[F,_]=t.useState(!1),[L,A]=t.useState(!1),y=t.useRef(null),[D,H]=t.useState(""),G=cf(e),B=t.useSyncExternalStore(t.useCallback(h=>(G.listeners.add(h),()=>{G.listeners.delete(h)}),[G]),()=>G.value,()=>G.value),E=t.useCallback(h=>{G.value={...G.value,...h};for(let M of G.listeners)M()},[G]),P=B.title,j=h=>E({title:h}),V=()=>E({error:d("todo.error.saveDraft")});t.useEffect(()=>{G.revision||G.loadingRevision||(G.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(h=>{h&&!G.revision&&(G.revision={expectedRevision:h.revision,realmGeneration:h.realmGeneration})}).catch(()=>{E({error:d("todo.error.saveDraft")})}).finally(()=>{G.loadingRevision=void 0}))},[G,e,E]);let k=async h=>(G.revision||await G.loadingRevision,G.revision?o.patchTodo(e,h,G.revision):!1),S=Di(async h=>{let M=h.trim()?await k({title:h}):!0;return M&&G.value.title===h&&E({title:null,error:""}),M},500,V),$=Di(async h=>{let M=await k({note:h});return M&&G.value.note===h&&E({note:null,error:""}),M},500,V),x=Di(async h=>{let M=JSON.parse(h),Y=await k({tags:M});return Y&&JSON.stringify(G.value.tags)===h&&E({tags:null,error:""}),Y},0,V);if(t.useEffect(()=>{!l&&!o.loading&&r()},[l,o.loading,r]),!l)return null;let C=h=>{k(h).then(M=>{M||V()})},O=h=>{E({tags:h}),x(JSON.stringify(h))},U=h=>C({attachments:h.length?h:void 0}),N=h=>C({urls:h.length?h:void 0}),X=ve(g);y.current||(y.current=structuredClone(l));let te=()=>{let h=y.current;h&&(S(h.title),$(h.note),C({tags:h.tags,status:h.status,completed:h.completed,priority:h.priority,dueDate:h.dueDate,startTime:h.startTime,endTime:h.endTime,group:h.group,location:h.location,flagged:h.flagged,attachments:h.attachments,urls:h.urls,filePath:h.filePath})),E({title:null,note:null,tags:null,error:""}),r()},ie=_e(l),re=gf(),T=l.dueDate?`${rt(l.dueDate.slice(0,10),re,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${l.startTime?` \xB7 ${l.startTime}${l.endTime?`\u2013${l.endTime}`:""}`:""}`:"",z=(h,M,Y,W=300)=>{f.ui.openPopover(Y,{anchor:h,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:M,width:W})},K=(h,M,Y,W,ae,q="")=>t.createElement("button",{key:h,type:"button",className:`todo-sheet-chip${Y?"":" is-empty"}${q?` ${q}`:""}`,"aria-label":Y?`${W}: ${Y}`:W,title:h==="place"&&l.location?l.location.name:void 0,onClick:ce=>ae(ce.currentTarget)},M,t.createElement("span",null,Y||W));return t.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:t.createElement("div",{className:"todo-detail-footer"},t.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),ut(l,o.removeTodo).then(h=>{h||o.openDetail(l.id)})}},t.createElement(Nt,null),d("auto.f6fdbe48dc54")),t.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:te},d("auto.77dfd2135f4d")),t.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},t.createElement("div",{className:"todo-sheet"},B.error&&t.createElement("p",{role:"alert"},B.error),t.createElement("div",{className:"todo-sheet-head"},t.createElement("button",{type:"button",className:"todo-sheet-status","data-status":ie,title:et(ie),"aria-label":`${d("auto.bae7d5be7082")}: ${et(ie)}`,onClick:h=>vr(h.currentTarget,l,M=>C(M))},t.createElement(xe,{status:ie==="open"?null:ie,dotCls:Ae(ie).cls})),t.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:P??l.title,"aria-label":d("auto.c5e8306a511f"),onChange:h=>{j(h.target.value),S(h.target.value)},onBlur:()=>{P===l.title&&j(null)},onKeyDown:h=>{h.key==="Enter"&&r()}}),t.createElement("button",{className:`todo-sheet-flag${l.flagged?" on":""}`,type:"button",onClick:()=>C({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},t.createElement(Le,null))),t.createElement("textarea",{className:"todo-sheet-notes",value:B.note??l.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:h=>{let M=h.target.value;E({note:M}),$(M)}}),t.createElement("div",{className:"todo-sheet-chips"},K("status",t.createElement(xe,{status:ie==="open"?null:ie,dotCls:Ae(ie).cls}),ie==="open"?"":et(ie),d("auto.bae7d5be7082"),h=>vr(h,l,M=>C(M))),K("due",t.createElement(at,null),T,d("todo.sheet.date"),h=>z(h,d("todo.edit.schedule"),()=>t.createElement(pf,{todo:l,onPatch:C}),280),l.dueDate&&l.dueDate.slice(0,10)<re&&!l.completed?"is-overdue":""),K("group",t.createElement("span",{className:"todo-sheet-dot",style:l.group?{background:Se(De(l.group,g))}:void 0}),l.group??"",d("todo.edit.group"),h=>{f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>C({group:void 0})},...X.map(M=>({label:M,type:"radio",checked:l.group===M,color:De(M,g),onSelect:()=>C({group:M})}))],{anchor:h,align:"start"})}),K("place",t.createElement(Ze,null),l.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),h=>z(h,d("todo.location"),()=>t.createElement(mf,{todo:l,onPatch:C}),320)),K("priority",t.createElement(Mt,{priority:l.priority}),l.priority==="normal"?"":Ye(l.priority),d("auto.886cbff9d9df"),h=>{f.ui.openMenu(He.map(M=>({label:Ye(M.id),icon:t.createElement(Mt,{priority:M.id}),type:"radio",checked:l.priority===M.id,onSelect:()=>C({priority:M.id})})),{anchor:h,align:"start"})})),t.createElement(qn,{value:B.tags??l.tags??[],onChange:O,bare:!0}),((l.attachments??[]).length>0||b)&&t.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(l.attachments??[]).map(h=>t.createElement(yl,{key:h,relPath:h,onRemove:()=>U((l.attachments??[]).filter(M=>M!==h))})),b&&t.createElement(wi,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:h=>{(l.attachments??[]).includes(h)||U([...l.attachments??[],h]),m(!1)}})),((l.urls??[]).length>0||w||l.filePath||F)&&t.createElement("div",{className:"todo-sheet-section"},l.filePath&&t.createElement("div",{className:"todo-detail-url-card"},t.createElement("button",{className:"todo-detail-url-open",type:"button",title:l.filePath,onClick:h=>f.workspace.openFile(l.filePath,void 0,{newTab:f.ui.hasModKey(h)})},t.createElement(gt,null),t.createElement("span",null,l.filePath.split("/").pop()),t.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),t.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>C({filePath:void 0})},t.createElement(we,null))),F&&!l.filePath&&t.createElement(wi,{placeholder:d("todo.file.searchLinked"),onCancel:()=>_(!1),onPick:h=>{C({filePath:h}),_(!1)}}),(l.urls??[]).map(h=>t.createElement("div",{className:"todo-detail-url-card",key:h},t.createElement("button",{className:"todo-detail-url-open",type:"button",title:h,onClick:M=>{let Y=go(h);Y?f.workspace.openFile(Y,void 0,{newTab:f.ui.hasModKey(M)}):f.files.openExternalUrl(h)}},t.createElement(Jt,null),t.createElement("span",null,ff(h))),t.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:h}),onClick:()=>N((l.urls??[]).filter(M=>M!==h))},t.createElement(we,null)))),w&&t.createElement(lf,{className:"todo-detail-link-input todo-detail-url",value:D,onCommit:h=>{let M=Vr(h);M&&!(l.urls??[]).includes(M)&&N([...l.urls??[],M]),H(""),v(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),L&&u.length>0&&t.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...u].reverse().map((h,M)=>t.createElement("li",{key:`${h.changedAt}:${M}`},t.createElement("span",null,et(h.from)," \u2192 ",et(h.to)),t.createElement("time",{dateTime:h.changedAt},new Date(h.changedAt).toLocaleString(f.ui.language()))))),t.createElement("div",{className:"todo-sheet-adds"},t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},t.createElement(Lt,null)," ",d("todo.sheet.attachment")),t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>v(!0)},t.createElement(Jt,null)," ",d("todo.sheet.link")),!l.filePath&&t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>_(!0)},t.createElement(gt,null)," ",d("todo.linkedFile")),u.length>0&&t.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":L,onClick:()=>A(h=>!h)},d("todo.activity")," (",u.length,")"))))};function pf({todo:e,onPatch:o}){let[r,n]=t.useState(e.dueDate?.slice(0,10)??""),[a,i]=t.useState(e.startTime??""),[s,c]=t.useState(e.endTime??"");return t.createElement("div",{className:"todo-cell-editor"},t.createElement(oo,{value:r,onChange:p=>{n(p),p||(i(""),c("")),o(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),t.createElement("div",{className:"todo-sheet-times"},t.createElement(br,{value:a,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:p=>{i(p),o({startTime:p||void 0,...p?{}:{endTime:void 0}}),p||c("")}}),t.createElement(br,{value:s,disabled:!a,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:p=>{if(p&&a&&p<=a){c(s);return}c(p),o({endTime:p||void 0})}})))}function mf({todo:e,onPatch:o}){let[r,n]=t.useState(e.location);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(vo,{value:r,autoFocus:!0,onChange:a=>{n(a),o({location:a})}}))}function ff(e){try{let o=new URL(e),r=`${o.pathname==="/"?"":o.pathname}${o.search}${o.hash}`;return`${o.hostname.replace(/^www\./,"")}${r}`}catch{return e}}function gf(){let e=new Date,o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}var Co=({c:e})=>e.editingId?t.createElement(uf,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function hf(e){for(let o=e;o;o=o.parentElement)if(/(auto|scroll)/.test(getComputedStyle(o).overflowY)&&(!o.clientHeight||o.scrollHeight>o.clientHeight+1))return o;return e.ownerDocument.scrollingElement??e}function bf(e,o,r=320){let n=o.top-r,a=o.top+o.height+r,i=0,s=e.length;for(;i<s;){let p=i+s>>>1;e[p].start+e[p].height<n?i=p+1:s=p}let c=i;for(s=e.length;i<s;){let p=i+s>>>1;e[p].start<=a?i=p+1:s=p}return[c,i]}function ea(e,o){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=o,s=o.enabled??r.length>80,c=e.useRef(null),p=e.useRef(new Map),[l,u]=e.useReducer(S=>S+1,0),[g,b]=e.useState({top:0,height:600}),[m,w]=e.useState(null),[v,F]=e.useState(null),_=e.useRef(null),L=e.useRef(null),A=e.useRef(null),y=e.useMemo(()=>{let S=0;return r.map(($,x)=>{let C=p.current.get($)??(typeof n=="number"?n:n($,x)),O={id:$,height:C,start:S};return S+=C,O})},[r,n,l]),D=y.length?y[y.length-1].start+y[y.length-1].height:0,H=e.useRef({rows:y,viewport:g});H.current={rows:y,viewport:g};let G=e.useCallback(()=>{let S=c.current,$=_.current;if(!S||!$)return;let x=S.getBoundingClientRect(),C=$.getBoundingClientRect(),O=$.clientHeight||C.height||600,U=$===S?$.scrollTop:C.top-x.top;b(N=>N.top===U&&N.height===O?N:{top:U,height:O})},[]),B=e.useCallback(()=>{L.current===null&&(L.current=(A.current??window).requestAnimationFrame(()=>{L.current=null,G()}))},[G]);e.useLayoutEffect(()=>{let S=c.current;if(!S||!s)return;let $=hf(S);_.current=$;let x=S.ownerDocument.defaultView??window;A.current=x;let C=S.style.overflowAnchor;S.style.overflowAnchor="none";let O=!0,U=()=>{if(!O)return;let ie=S.ownerDocument.activeElement,re=ie instanceof HTMLElement?ie:null;for(;re&&re.parentElement!==S;)re=re.parentElement;w(re?.dataset.visibleKey??null)},N=()=>{queueMicrotask(U)};$.addEventListener("scroll",B,{passive:!0}),x.addEventListener("resize",B),S.addEventListener("focusin",U),S.addEventListener("focusout",N);let X=S.clientWidth,te=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{S.clientWidth!==X&&(X=S.clientWidth,p.current.clear(),u()),B()});return te?.observe($),$!==S&&te?.observe(S),G(),()=>{O=!1,S.style.overflowAnchor==="none"&&(S.style.overflowAnchor=C),$.removeEventListener("scroll",B),x.removeEventListener("resize",B),S.removeEventListener("focusin",U),S.removeEventListener("focusout",N),te?.disconnect(),L.current!==null&&x.cancelAnimationFrame(L.current),L.current=null,_.current=null,A.current=null}},[s,G,B]),e.useLayoutEffect(()=>{let S=new Set(r);for(let $ of p.current.keys())S.has($)||p.current.delete($);G()},[r,G]),e.useLayoutEffect(()=>{p.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let S=c.current;if(!S||!s)return;let $=O=>{let U=0,N=!1,{rows:X,viewport:te}=H.current,ie=new Map(X.map(re=>[re.id,re]));for(let re of O){let T=re.dataset.visibleKey,z=T?ie.get(T):void 0,K=re.getBoundingClientRect().height;!T||!z||K<=0||Math.abs(K-z.height)<.5||(p.current.set(T,K),z.start+z.height<=te.top&&(U+=K-z.height),N=!0)}if(N){let re=_.current,T=S.closest('[data-visible-sections="true"]'),z=S;for(;z&&z.parentElement!==T;)z=z.parentElement;let K=T&&T!==S&&z&&re&&z.getBoundingClientRect().bottom<=re.getBoundingClientRect().top;U&&re&&!K&&(re.scrollTop+=U),u(),B()}},x=Array.from(S.children).filter(O=>O.hasAttribute("data-visible-key")),C=typeof ResizeObserver>"u"?void 0:new ResizeObserver(O=>$(O.map(U=>U.target)));return x.forEach(O=>C?.observe(O)),$(x),()=>C?.disconnect()}),e.useLayoutEffect(()=>{if(!v)return;let S=Array.from(c.current?.children??[]).find($=>$.dataset.visibleKey===v.id);S&&(S.scrollIntoView?.({block:"nearest"}),v.selector&&(S.matches(v.selector)?S:S.querySelector(v.selector))?.focus(),G(),F(null))},[v,y,G]);let E=e.useCallback((S,$)=>{F({id:S,selector:$})},[]),[P,j]=s?bf(y,g):[0,y.length],V=new Set;for(let S=P;S<j;S++)V.add(S);let k=new Set([...a,m,v?.id].filter(Boolean));return k.size&&y.forEach((S,$)=>{k.has(S.id)&&V.add($)}),{ref:c,show:E,render(S){let $=[],x=0;for(let C of[...V].sort((O,U)=>O-U)){let O=y[C];O.start>x&&$.push(e.createElement("div",{key:`space:${O.id}`,"aria-hidden":!0,style:{height:O.start-x,flex:"0 0 auto",pointerEvents:"none"}})),$.push(e.createElement(e.Fragment,{key:O.id},S(C))),x=O.start+O.height}return D>x&&$.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:D-x,flex:"0 0 auto",pointerEvents:"none"}})),$}}}var ql=({todos:e,groups:o,compact:r,hideDate:n=!1,c:a})=>{let i=Me(),s=t.useSyncExternalStore(i.subscribe,i.get,i.get),c=t.useMemo(()=>e.map(g=>g.id),[e]),p=ea(t,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),l=p.show;t.useLayoutEffect(()=>{s&&c.includes(s.todoId)&&l(s.todoId)},[s,c,l]);let u=t.useCallback((g,b)=>{let m=e[Math.max(0,Math.min(e.length-1,g+b))];m&&l(m.id,".todo-row")},[e,l]);return t.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(g=>t.createElement(Ol,{key:e[g].id,todo:e[g],groups:o,compact:r,c:a,hideDate:n,onMoveFocus:b=>u(g,b)})))};function Yl({sections:e,c:o,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let c=Me(),p=t.useSyncExternalStore(c.subscribe,c.get,c.get),l=t.useMemo(()=>e.map(_=>_.key),[e]),[u,g]=t.useState(null),b=new Set([o.editingId,o.menuId,o.lastCreatedId,p?.todoId,u].filter(Boolean)),m=e.filter(_=>_.todos.some(L=>b.has(L.id))).map(_=>_.key),w=t.useCallback((_,L)=>a?.(e[L])??32+e[L].todos.length*(r?52:84),[e,r,a]),v=ea(t,{ids:l,estimate:w,pinned:m,layoutKey:i??r}),F=v.show;return t.useLayoutEffect(()=>{if(!p)return;let _=e.find(L=>L.todos.some(A=>A.id===p.todoId));_&&F(_.key)},[p,e,F]),t.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:v.ref,onDragStartCapture:_=>g(_.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},v.render(_=>t.cloneElement(s(e[_]),{"data-visible-key":l[_]})))}function yf(e,o,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return qt(`${o}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=qt(o),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:nd(i),p0:`${Qr(o,a,n)} \u2013 ${Qr(nt(s),a,n)}`})}return o===Ct(r,-1)?d("todo.due.yesterday"):o===r?d("todo.due.today"):o===Ct(r,1)?d("todo.due.tomorrow"):Qr(o,a,n)}function ta({todos:e,groups:o,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let c=nt(),{shortDateFormat:p}=it("shortDateFormat"),l=f.ui.language(),u=t.useMemo(()=>{if(!s)return Ha(e,a,Jo(i));let g=new Map(e.map(m=>[m,Va(m)])),b=[...e].sort((m,w)=>g.get(w).localeCompare(g.get(m)));return Ha(b,a,Jo(i),{dateOf:m=>Ba(g.get(m))})},[a,s,e,i]);return t.createElement(Yl,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},g=>t.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},t.createElement("div",{className:"todo-panel-date-head"},yf(g.kind,g.key,c,p,l)),t.createElement(ql,{todos:g.todos,groups:o,compact:r,c:n})))}function oa(e){return e==="flagged"?t.createElement(Le,null):e==="priority"?t.createElement(Zt,null):e==="due"?t.createElement(rr,null):e==="updated"?t.createElement(Ed,null):e==="created"?t.createElement(Dd,null):t.createElement(Cd,null)}function wf(){return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-filter-section-label"},d("todo.filters.show")),t.createElement(Ti,null))}function Ci({sortField:e,setSortField:o,sortDir:r,setSortDir:n}){let[a,i]=t.useState(e),[s,c]=t.useState(r),p=Object.entries(Zo);return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-sort-heading"},t.createElement("span",null,d("todo.filters.sort")),t.createElement("div",{className:"todo-sort-directions"},t.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{c("desc"),n("desc")}},t.createElement(or,null)),t.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{c("asc"),n("asc")}},t.createElement(tr,null)))),t.createElement("div",{className:"todo-sort-options"},p.map(([l,u])=>t.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),o(l)}},oa(l),t.createElement("span",null,d(u))))))}function gr({todos:e,groups:o,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:c,embedded:p=!1}){let[l,u]=t.useState(a),[g,b]=t.useState(i),m=p?a:l,w=p?i:g,v=m.length===r.length&&(!n||w),F=[...r.map(y=>m.some(D=>D.toLowerCase()===y.toLowerCase())),...n?[w]:[]],_=(y,D)=>y?` active${F[D-1]?"":" selection-run-start"}${F[D+1]?"":" selection-run-end"}`:"",L=(y,D)=>{u(y),b(D),s(y,D)},A=y=>{let D=e.filter(B=>y===null?!B.group:Q(B.group??"")===Q(y)),H=y??d("todo.chip.noGroup"),G=y===null?w:m.some(B=>Q(B)===Q(y));return t.createElement("div",{className:"todo-group-filter-item",key:y??"ungrouped"},t.createElement("div",{className:"props-info-row"},t.createElement("dt",{className:"props-info-key"},y&&t.createElement("span",{className:"props-info-dot",style:{background:Se(De(y,o))}}),H),t.createElement("dd",{className:"props-info-value props-info-filter-value"},t.createElement("span",null,D.length),t.createElement(f.ui.settings.Toggle,{label:H,checked:G,onChange:()=>L(y===null?m:G?m.filter(B=>Q(B)!==Q(y)):[...m,y],y===null?!w:w)}))))};return p?t.createElement("div",{className:"props-info"},t.createElement("div",{className:"props-info-actions"},t.createElement("button",{type:"button",onClick:c},d("todo.properties.manageGroups")),(r.length>0||n)&&t.createElement("button",{type:"button",onClick:()=>L(v?[]:r,v?!1:n)},d(v?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("dl",{className:"props-info-table"},r.map(y=>A(y)),n&&A(null))):t.createElement("div",{className:"todo-group-filter-popover"},t.createElement("div",{className:"todo-group-filter-head"},t.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},d("todo.edit.group")),t.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>L(v?[]:r,v?!1:n)},d(v?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("div",{className:"todo-group-filter-list"},r.map((y,D)=>{let H=F[D];return t.createElement("button",{key:y,type:"button",className:`todo-group-filter-row${_(H,D)}`,"aria-pressed":H,onClick:()=>L(H?l.filter(G=>G.toLowerCase()!==y.toLowerCase()):[...l,y],g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},H?"\u2713":""),t.createElement("span",{className:"todo-tree-dot",style:{background:Se(De(y,o))}}),t.createElement("span",{className:"todo-tree-label"},y),t.createElement("span",{className:"todo-tree-count"},Tn(e,y)))}),n&&t.createElement("button",{type:"button",className:`todo-group-filter-row${_(g,r.length)}`,"aria-pressed":g,onClick:()=>L(l,!g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),t.createElement("span",{className:"todo-tree-dot no-group"}),t.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),t.createElement("span",{className:"todo-tree-count"},Tn(e,null)))))}var Xl={scheduled:()=>t.createElement(rr,null),today:()=>t.createElement(nr,null),week:()=>t.createElement(wn,null),flagged:()=>t.createElement(Le,null),all:()=>t.createElement(gn,null),completed:()=>t.createElement(We,null)},vf=()=>{let{activePluginTab:e,dateFormat:o}=it("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=jn(),a=Be(),i=fr(),[s,c]=t.useState(""),[p,l]=t.useState(""),[u,g]=t.useState(""),[b,m]=t.useState({}),[w,v]=t.useState(!1),[F,_]=t.useState(!1),[L,A]=t.useState(!1),[y,D]=t.useState(!1),{DateField:H,TimeField:G}=f.ui.settings,[B,E]=t.useState(!1),[P,j]=zn(),[V]=wt(),[k,S]=Cn("todo"),{sortField:$,sortDir:x,compact:C}=k,[O,U]=yt(),N=lt(),X=In(),te=Mn(),ie=t.useMemo(()=>Kd(te),[te]),re=e?.pluginId===f.pluginId,T=t.useRef(null),z=t.useRef(null),K=t.useRef(null),h=So($,x,"left_sidebar");co(h.openDetail);let M=be(new Date),Y=t.useMemo(()=>Vd(h.todos,M),[h.todos,M]),W=t.useMemo(()=>ve(a),[a]),ae=t.useMemo(()=>h.todos.some(I=>!I.group),[h.todos]),q=i.kind==="groups"?i.names:W,ce=i.kind==="groups"?i.includeUngrouped===!0:ae,Ge=q.length===W.length&&(!ae||ce),Ke=t.useMemo(()=>{let I=h.ordered.filter(Z=>kn(Z,i,V,M));if(O!=="all"&&(I=I.filter(Z=>fo(Z,O))),P.trim()){let Z=Ht(P);I=I.filter(ue=>Z(ue.tags??[],ue.title,ue.note,ue.group??""))}return n?I=I.filter(Z=>{let ue=Z.dueDate?.slice(0,10);return!!ue&&ue>=n.start&&ue<=n.end}):r&&(I=I.filter(Z=>Z.dueDate?.slice(0,10)===r)),I},[h.ordered,i,V,O,P,r,n,M]),st=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Io=async()=>{if(h.creating)return;let I=tn(s,M),Z=I.title;if(!Z){Lo();return}let ue=st;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let qe=await f.ui.openMenu([...i.names.map((Oo,na)=>({id:`group:${na}`,label:Oo})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:T.current??K.current,align:"start"});if(qe===null)return;ue=qe.startsWith("group:")?i.names[Number(qe.slice(6))]:void 0}D(!1);let Ve={note:p.trim(),tags:[...new Set([...b.tags??[],...u.split(/[\s,]+/).map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])],priority:I.priority,...ue?{group:ue}:{}};i.kind==="smart"&&i.id==="flagged"&&(Ve.flagged=!0),Object.assign(Ve,{...b,tags:Ve.tags}),I.dueDate&&(Ve.dueDate=I.dueDate),await h.create(Z,void 0,{patch:Ve})?(D(!1),c(""),l(""),g(""),m({}),v(!1),_(!1),A(!1),T.current?.focus()):D(!0)},No=()=>{E(!0),window.setTimeout(()=>T.current?.focus(),0)},Lo=()=>{c(""),E(!1),l(""),g(""),m({}),v(!1),_(!1),A(!1),D(!1)},ao=Me(),xr=t.useSyncExternalStore(ao.subscribe,ao.get,ao.get);t.useEffect(()=>{xr?.mode==="create"&&(E(!0),ao.clear())},[xr,ao]),t.useEffect(()=>{B&&!h.creating&&T.current?.focus()},[B,re,h.creating]),t.useLayoutEffect(()=>{z.current&&(z.current.style.height="auto",z.current.style.height=`${z.current.scrollHeight}px`)},[p,B]);let xt=b.dueDate??"",Po=B&&t.createElement("form",{className:"todo-compose",onSubmit:I=>{I.preventDefault(),Io()},onKeyDown:I=>{I.key==="Escape"&&!I.defaultPrevented&&!h.creating&&(I.preventDefault(),Lo())}},t.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),t.createElement("input",{ref:T,className:"todo-compose-title",value:s,onChange:I=>c(I.target.value),placeholder:st?d("todo.newTodoIn",{p0:st}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:h.creating}),t.createElement("textarea",{ref:z,className:"todo-compose-note",rows:1,value:p,onChange:I=>l(I.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:h.creating}),t.createElement("div",{className:"todo-compose-tags"},(b.tags??[]).map(I=>t.createElement("span",{className:"todo-compose-token",key:I},t.createElement("span",null,"#",I),t.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:I}),disabled:h.creating,onClick:()=>m(Z=>({...Z,tags:Z.tags?.filter(ue=>ue!==I)}))},t.createElement(we,null)))),t.createElement("input",{value:u,onChange:I=>{let Z=I.target.value;if(!("isComposing"in I.nativeEvent&&I.nativeEvent.isComposing)&&/[\s,]/.test(Z)){let ue=Z.split(/[\s,]+/),Ve=ue.pop()??"";m(_t=>({..._t,tags:[...new Set([..._t.tags??[],...ue.map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])]})),g(Ve)}else g(Z)},onKeyDown:I=>{I.nativeEvent.isComposing||(I.key==="Enter"&&u.trim()&&(I.preventDefault(),m(Z=>({...Z,tags:[...new Set([...Z.tags??[],u.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),I.key==="Backspace"&&!u&&m(Z=>({...Z,tags:Z.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:h.creating})),F&&t.createElement("div",{className:"todo-compose-schedule"},t.createElement(H,{className:"todo-compose-date-field",value:xt,onChange:I=>m(Z=>({...Z,dueDate:I})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:h.creating}),t.createElement(G,{className:"todo-compose-time-field",value:b.startTime??"",onChange:I=>m(Z=>({...Z,startTime:I||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:h.creating})),L&&t.createElement("div",{className:"todo-compose-location"},t.createElement(vo,{value:b.location,disabled:h.creating,onChange:I=>m(Z=>({...Z,location:I}))})),(w||!!b.attachments?.length)&&t.createElement("div",{className:"todo-compose-attachments"},(b.attachments??[]).map(I=>t.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:I,title:I},t.createElement(Lt,null),t.createElement("span",null,I.split("/").pop()),t.createElement("button",{type:"button",disabled:h.creating,"aria-label":`${d("todo.removeAttachment")}: ${I}`,onClick:()=>m(Z=>({...Z,attachments:Z.attachments?.filter(ue=>ue!==I)}))},t.createElement(we,null)))),w&&t.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:h.creating,onChange:I=>{I&&(m(Z=>({...Z,attachments:[...new Set([...Z.attachments??[],I])]})),v(!1))}})),t.createElement("div",{className:"todo-compose-controls"},t.createElement("button",{type:"button",className:`todo-compose-chip${xt?" has-value":""}`,"aria-pressed":F,disabled:h.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>_(I=>!I)},t.createElement(at,null),xt&&t.createElement("span",null,rt(xt,M,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),o),b.startTime?` ${b.startTime}`:"")),t.createElement("button",{type:"button",className:`todo-compose-chip${b.location?" has-value":""}`,"aria-pressed":L,disabled:h.creating,"aria-label":d("todo.compose.addPlace"),title:b.location?.name??d("todo.compose.addPlace"),onClick:()=>A(I=>!I)},t.createElement(Ze,null)),t.createElement("button",{type:"button",className:`todo-compose-chip${b.attachments?.length?" has-value":""}`,"aria-pressed":w,disabled:h.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>v(I=>!I)},t.createElement(Lt,null),!!b.attachments?.length&&t.createElement("span",null,b.attachments.length)),t.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${b.priority&&b.priority!=="normal"?" has-value":""}`,disabled:h.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async I=>{let Z=await f.ui.openMenu(He.map(ue=>({id:ue.id,label:d(ue.labelKey),checked:ue.id===(b.priority??"normal")})),{anchor:I.currentTarget,align:"start"});Z&&m(ue=>({...ue,priority:Z}))}},t.createElement(Zt,null),b.priority&&b.priority!=="normal"&&t.createElement("span",null,d(`todo.priority.${b.priority}`))),t.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(I=>({...I,flagged:!(I.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":b.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:h.creating},t.createElement(Le,null)),t.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||h.creating},d("todo.group.add"))),y&&t.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),t.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:Lo,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:h.creating},t.createElement(we,null))),R=I=>{f.ui.openPopover(({close:Z})=>t.createElement("div",{className:"todo-filter-popover-stack"},t.createElement(wf,null),(W.length>0||ae)&&t.createElement(t.Fragment,null,t.createElement("div",{className:"todo-filter-divider"}),t.createElement(gr,{todos:h.todos,groups:a,names:W,hasUngrouped:ae,selected:q,includeUngrouped:ce,onChange:(ue,Ve)=>Ue(ue.length===W.length&&(!ae||Ve)?Pe:{kind:"groups",names:ue,includeUngrouped:Ve}),onOpenSettings:()=>{Z(),Ot()}}))),{anchor:I,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.title"),width:248})},oe=I=>{f.ui.openPopover(()=>t.createElement(Ci,{sortField:$,setSortField:Z=>S({sortField:Z}),sortDir:x,setSortDir:Z=>S({sortDir:Z})}),{anchor:I,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},le=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},me=(I,Z,ue,Ve,_t,qe,Oo,na)=>{let _i=Sn(i,Z),zi=Z.kind==="groups"&&Z.names.length===1&&!Z.includeUngrouped&&i.kind==="groups"?i.names.some(io=>Q(io)===Q(Z.names[0])):_i;return t.createElement("button",{key:Je(Z),type:"button",className:`todo-tree-row${_t?" nested":""}${qe?` todo-${qe}-chip`:""}${zi?" active":""}`,"aria-current":_i?"true":void 0,"aria-label":qe?`${I} ${ue}`:void 0,title:qe?I:void 0,"aria-pressed":Z.kind==="groups"?zi:void 0,style:Oo?{"--todo-chip-color":Se(Oo),"--todo-chip-on":na??St(Oo)}:void 0,onClick:io=>mr(Z,mi(io)),onAuxClick:io=>{io.button===1&&(io.preventDefault(),mr(Z,!0))}},Ve&&t.createElement("span",{className:"todo-tree-icon"},Ve),_t&&t.createElement("span",{className:"todo-tree-dot",style:{background:Se(_t)},"aria-hidden":"true"}),t.createElement("span",{className:"todo-tree-label"},I),t.createElement("span",{className:"todo-tree-count"},ue))},cc=!!(P||r||n||O!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),Pi=n?`${Re(n.start,o)} \u2013 ${Re(n.end,o)}`:r?Re(r,o):null,Oi=O==="all"?null:`${d("auto.bae7d5be7082")}: ${O.length===1?N.find(I=>I.id===O[0])?.label??d("todo.chip.all"):d("todo.filters.statusCount",{count:O.length})}`,Mi=d("todo.fab.newTodo");return t.createElement("div",{className:"todo-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),t.createElement("div",{className:"todo-header-actions"},!re&&t.createElement(t.Fragment,null,t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${V||O!=="all"||!Ge?" active":""}`,"aria-label":d("todo.filters.title"),title:d("todo.filters.title"),type:"button",onClick:I=>R(I.currentTarget)},t.createElement(Rd,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":C,title:C?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>S({compact:!C})},C?t.createElement(sn,null):t.createElement(dn,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${x==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Zo[$])}`,type:"button",onClick:I=>oe(I.currentTarget)},x==="asc"?t.createElement(tr,null):t.createElement(or,null),oa($))),t.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:I=>mi(I)?To(i,!0):f.workspace.openMainTab(),onAuxClick:I=>{I.button===1&&(I.preventDefault(),To(i,!0))}}))),t.createElement("div",{className:"search-field-row"},t.createElement("div",{className:"todo-tree-search search-field"},t.createElement(ft,{className:"search-field-icon"}),t.createElement("input",{className:"search-field-input",value:P,onChange:I=>j(I.target.value),onKeyDown:I=>{I.key==="Escape"&&j("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),P&&t.createElement("button",{className:"search-field-action",onClick:()=>j(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},t.createElement(we,null)))),re?t.createElement("div",{className:"todo-tree todo-active-navigation"},Po,t.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},ie.map(I=>me(d(I.labelKey),{kind:"smart",id:I.id},Y[I.id],Xl[I.id](),void 0,"smart",I.color,dr(I,St)))),t.createElement("div",{className:"todo-navigation-groups"},t.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),W.map(I=>me(I,{kind:"groups",names:[I]},Tn(h.todos,I),void 0,De(I,a))))):t.createElement(t.Fragment,null,!P&&t.createElement("div",{className:"todo-tree"},t.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},Pi?t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:le},t.createElement("span",{className:"todo-tree-icon"},t.createElement(nr,null)),t.createElement("span",{className:"todo-tree-label"},Pi),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(we,null))):ie.map(I=>me(d(I.labelKey),{kind:"smart",id:I.id},Y[I.id],Xl[I.id](),void 0,"smart",I.color,dr(I,St)))),Oi&&t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>U("all")},t.createElement("span",{className:"todo-tree-label"},Oi),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(we,null)))),t.createElement("div",{className:"todo-list"},Po,h.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):Ke.length?t.createElement(ta,{todos:Ke,groups:a,compact:C,controller:h,mode:X,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,cc)))),!B&&t.createElement("button",{ref:K,className:"todo-fab",type:"button","aria-label":Mi,title:Mi,disabled:h.creating,onClick:No},t.createElement(Xt,null)),t.createElement(Co,{c:h}))},Zl=()=>t.createElement(vf,null);function xf({showCompleted:e,setShowCompleted:o,filter:r,setFilter:n}){let a=lt(),[i,s]=t.useState(e),[c,p]=t.useState(r),l=a.map(m=>m.id),u=c==="all"?l:c,g=m=>{s(m),o(m)},b=m=>{let w=u.includes(m)?u.filter(F=>F!==m):l.filter(F=>u.includes(F)||F===m);if(!w.length)return;let v=w.length===l.length?"all":w;p(v),n(v)};return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-completed-row"},t.createElement("span",null,d("todo.filters.completed")),t.createElement("div",{className:"todo-completed-choices"},t.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},d("todo.completed.hide")),t.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},d("todo.completed.showAll")))),t.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>t.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(m.id),onClick:()=>b(m.id)},t.createElement("span",{className:"todo-status-filter-check"},u.includes(m.id)?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(xe,{status:m.id==="open"?null:m.id,dotCls:m.cls})),t.createElement("span",null,m.label)))))}var Jl=()=>{let{activePath:e,weekStart:o}=it("activePath","weekStart"),r=zt(e)??"",n=Be(),a=In(),[i,s]=Cn("attachment"),{showCompleted:c,statusFilter:p,compact:l,sortField:u,sortDir:g,groupNames:b,includeUngrouped:m}=i,w=E=>s({showCompleted:E}),v=E=>s({statusFilter:E}),F=E=>s({sortField:E}),_=E=>s({sortDir:E}),L=So(u,g,"right_sidebar");co(L.openDetail);let A=t.useMemo(()=>ve(n),[n]),y=t.useMemo(()=>L.todos.some(E=>!E.group),[L.todos]),D=t.useMemo(()=>L.ordered.filter(E=>!(zt(E.filePath)===r||(E.attachments??[]).some(j=>zt(j)===r))||!c&&E.completed||(b.length||m)&&(!E.group&&!m||E.group&&!new Set(b.map(Q)).has(Q(E.group)))?!1:fo(E,p)),[L.ordered,r,c,p,b,m]),H=E=>{f.ui.openPopover(({close:P})=>t.createElement(gr,{todos:L.todos,groups:n,names:A,hasUngrouped:y,selected:b,includeUngrouped:m,onChange:(j,V)=>s({groupNames:j,includeUngrouped:V}),onOpenSettings:()=>{P(),Ot()}}),{anchor:E,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},G=E=>{f.ui.openPopover(()=>t.createElement(xf,{showCompleted:c,setShowCompleted:w,filter:p,setFilter:v}),{anchor:E,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},B=E=>{f.ui.openPopover(()=>t.createElement(Ci,{sortField:u,setSortField:F,sortDir:g,setSortDir:_}),{anchor:E,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return t.createElement("div",{className:"todo-panel note-tasks-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),t.createElement("div",{className:"todo-header-actions"},t.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${b.length||m?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:E=>H(E.currentTarget)},t.createElement(un,null)),t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:E=>G(E.currentTarget)},t.createElement(We,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!l})},l?t.createElement(sn,null):t.createElement(dn,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${g==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Zo[u])}`,onClick:E=>B(E.currentTarget)},g==="asc"?t.createElement(tr,null):t.createElement(or,null),oa(u)))),t.createElement("div",{className:"todo-list"},L.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):r?D.length?t.createElement(ta,{todos:D,groups:n,compact:l,controller:L,mode:a,weekStart:o}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.none"))):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.noFile")))),t.createElement(Co,{c:L}))};var kf={group:e=>e.group??void 0,notes:e=>Qn(e.note)||void 0,status:e=>jt().indexOf(_e(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},Ql=({navigation:e,instanceId:o})=>{let{dateFormat:r,activePluginTab:n}=it("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=jn(),s=Be(),c=$n(),p=t.useMemo(()=>eo(o),[o]),l=p??c,u=n?.pluginId===f.pluginId&&n.instanceId===o,g=On();t.useEffect(()=>{if(!p)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>ko(-1),goForward:()=>ko(1)}),()=>e.setController(null)},[e,p,g.canGoBack,g.canGoForward]);let[b,m]=zn(),[w,v]=t.useState(()=>!!b.trim()),F=t.useRef(null),_=()=>{v(!0),window.setTimeout(()=>F.current?.focus(),0)},L=()=>{m(""),v(!1)},[A,y]=el(),{field:D,dir:H}=A,[G]=wt(),[B,E]=yt(),[P,j]=Jn(),V=So("due","asc");co(V.openDetail),t.useEffect(()=>{if(!(V.loading||p))if(l.kind==="groups"){let W=new Set(ve(s));!l.includeUngrouped&&!l.names.some(ae=>W.has(ae))&&Ue(Pe)}else l.kind==="tag"&&(V.todos.some(W=>W.tags?.includes(l.name))||Ue(Pe))},[V.loading,V.todos,s,l,p]);let k=nt(),S=Mn(),$=l.kind==="smart"?ht(l.id,S):null,x=Un(l);t.useEffect(()=>{f.workspace.setMainTabTitle(x,o)},[x,o]);let C=t.useMemo(()=>{let W=V.todos.filter(ae=>kn(ae,l,G,k));if(B!=="all"&&(W=W.filter(ae=>fo(ae,B))),P.length&&(W=W.filter(ae=>P.includes(ae.priority))),b.trim()){let ae=Ht(b);W=W.filter(q=>ae(q.tags??[],q.title,q.note,q.group??""))}return i?W=W.filter(ae=>{let q=ae.dueDate?.slice(0,10);return!!q&&q>=i.start&&q<=i.end}):a&&(W=W.filter(ae=>ae.dueDate?.slice(0,10)===a)),W},[V.todos,l,G,B,P,b,a,i,k]),{ordered:O,sectionOf:U}=t.useMemo(()=>{let W=kf[D];if(W)return{ordered:rd(C,W,H),sectionOf:void 0};if(D!=="auto")return{ordered:bo(C,D,H),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:sd(C).flatMap(ce=>ce.todos),sectionOf:void 0};let ae=en(C,k),q=new Map;for(let ce of Qo)for(let Ge of ae[ce])q.set(Ge.id,ce);return{ordered:Qo.flatMap(ce=>ae[ce]),sectionOf:ce=>q.get(ce.id)??"someday"}},[C,D,H,l,k]),N=!!b.trim()||P.length>0||B!=="all",X=()=>{m(""),j([]),E("all")},te=[Je(l),b,JSON.stringify(B),P.join(),G,D,H,a??"",i?.start??"",i?.end??""].join("|"),ie=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[re,T]=t.useState(0),z=()=>T(W=>W+1),K=()=>{let W={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(W.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(W.dueDate=k),l.kind==="smart"&&l.id==="flagged"&&(W.flagged=!0),W},h=ve(s),M=[{label:d("todo.fab.newTodo"),icon:t.createElement(Xt,null),onSelect:z},...h.length?[{label:d("todo.fab.newTodoIn"),icon:t.createElement(cn,null),submenu:h.map(W=>({label:W,onSelect:ae=>{let q={kind:"groups",names:[W]};ae?.newTab||p?(To(q,ae?.newTab===!0),ss()):(Ue(q),z())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:t.createElement(un,null),onSelect:()=>{Ot()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:t.createElement(Jt,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Fn(l)))}},{label:d("auto.c7f73bb54d92"),icon:t.createElement(Od,null),onSelect:()=>f.workspace.openOwnSettings()}],Y=o??"";return t.useEffect(()=>{(u||n?.pluginId!==f.pluginId)&&gi(M,Y)}),t.useEffect(()=>()=>gi(null,Y),[Y]),t.createElement("div",{className:"todo-page"},t.createElement("div",{className:`todo-page-appbar${w?" is-searching":""}`},w?t.createElement("div",{className:"todo-page-search"},t.createElement(ft,{className:"todo-page-search-icon"}),t.createElement("input",{ref:F,className:"todo-page-search-input",value:b,onChange:W=>m(W.target.value),onKeyDown:W=>{W.key==="Escape"&&(W.preventDefault(),L())},onBlur:()=>{b.trim()||v(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):t.createElement("span",{className:"todo-page-appbar-spacer","aria-hidden":"true"}),(i||a)&&t.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:ie},t.createElement("span",null,i?`${Re(i.start,r)} \u2013 ${Re(i.end,r)}`:Re(a,r)),t.createElement(we,null)),t.createElement("div",{className:"todo-page-appbar-actions"},t.createElement("button",{type:"button",className:`todo-page-appbar-btn${!w&&b.trim()?" active":""}`,"aria-label":w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:W=>{w&&W.preventDefault()},onClick:w?L:_},w?t.createElement(we,null):t.createElement(ft,null)),t.createElement(jl,null),N&&t.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.reset"),title:d("todo.table.reset"),onClick:X},t.createElement(jd,null)),t.createElement(Ul,null),t.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:z},t.createElement(Xt,null)))),V.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):t.createElement(Wl,{todos:O,groups:s,c:V,sort:A,onSort:y,resetKey:te,empty:d("todo.table.empty"),sectionOf:U,composeSignal:re,newTaskPatch:K}),t.createElement(Co,{c:V}))};var oc=10080;function ec(e){let o=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!o)return null;let r=Number(o[1])*60+Number(o[2]);return r<=oc?r:null}function tc(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function rc(){let e=()=>{let m=f.settings.get().reminderOffsets;return Array.isArray(m)?m.filter(w=>Number.isInteger(w)&&w>=0&&w<=oc).slice(0,1):[10]},[o,r]=t.useState(e);t.useEffect(()=>f.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:a,SelectField:i}=f.ui.settings,s=o.length?"custom":"off",[c,p]=t.useState(()=>tc(o[0]??10)),[l,u]=t.useState(!1);t.useEffect(()=>{o.length&&(p(tc(o[0])),u(!1))},[o[0]]);let g=m=>{r(m),f.settings.set("reminderOffsets",m)},b=()=>{let m=ec(c);if(m===null){u(!0);return}u(!1),m!==o[0]&&g([m])};return t.createElement(a,{title:d("reminders.title")},t.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},t.createElement(i,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:m=>g(m==="off"?[]:[ec(c)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&t.createElement(n,{title:d("reminders.timeBefore"),description:l?t.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},t.createElement("input",{className:`settings-control todo-reminder-time${l?" invalid":""}`,type:"text",inputMode:"numeric",value:c,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":l||void 0,maxLength:6,onChange:m=>{p(m.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),u(!1)},onBlur:b,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),b())}})))}var Tf={scheduled:()=>t.createElement(rr,null),today:()=>t.createElement(nr,null),week:()=>t.createElement(wn,null),flagged:()=>t.createElement(Le,null),all:()=>t.createElement(gn,null),completed:()=>t.createElement(We,null)};function ac(e){let[o,r]=t.useState(e);return t.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[o,r]}function Sf(){let{ColorField:e,Section:o,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,s]=ac(En),c=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],p=m=>{s(m),Zd(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,u=i.order.map(m=>ht(m,i)),g=a({items:u,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>d(m.labelKey),onReorder:m=>p({...i,order:m.map(w=>w.id)})}),b=(m,w)=>{if(w){p({...i,hidden:i.hidden.filter(_=>_!==m)});return}if(l<=1)return;let v={...i,hidden:[...i.hidden,m]};p(v);let F=bt();F.kind==="smart"&&F.id===m&&Ue({kind:"smart",id:v.order.find(_=>!v.hidden.includes(_))})};return t.createElement(o,{title:d("todo.settings.smartLists")},t.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),t.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},t.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},t.createElement("span",null),t.createElement("span",null),t.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),t.createElement("span",null,d("todo.settings.colColor")),t.createElement("span",null,d("todo.settings.colText")),t.createElement("span",null,d("todo.settings.colShow"))),u.map((m,w)=>{let v=i.hidden.includes(m.id),F=`${m.id}@${w}`,_=g.getHandleProps(m),L=d(m.labelKey);return t.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(v?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},t.createElement("button",{..._,className:(_.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},t.createElement(wo,null)),t.createElement("span",{className:"todo-settings-chip",style:{background:Se(m.color),color:dr(m,St)},"aria-hidden":"true"},Tf[m.id]()),t.createElement("span",{className:"todo-settings-name"},L),t.createElement(e,{key:`color:${F}`,value:m.color,onChange:A=>p({...i,colors:{...i.colors,[m.id]:A}}),ariaLabel:d("todo.settings.smartListColor",{p0:L}),allowCustom:!1}),t.createElement(r,{key:`text:${F}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:d("todo.settings.statusText",{p0:L}),onChange:A=>{let y={...i.textColors};A==="auto"?delete y[m.id]:y[m.id]=A,p({...i,textColors:y})}}),t.createElement(n,{key:`show:${F}`,checked:!v,disabled:!v&&l<=1,label:d("todo.settings.smartListShow",{p0:L}),onChange:A=>b(m.id,A)}))})),g.liveRegion)}function ra({initial:e,onCommit:o,onType:r,onEnter:n,placeholder:a,ariaLabel:i,disabled:s,className:c="todo-settings-text",invalid:p}){let l=t.useRef(!1);return t.createElement("input",{className:`settings-control ${c}${p?" invalid":""}`,"aria-invalid":p||void 0,type:"text",defaultValue:e,placeholder:a,"aria-label":i,disabled:s,autoComplete:"off",spellCheck:!1,onChange:u=>r?.(u.currentTarget.value),onBlur:u=>{if(l.current){l.current=!1;return}o(u.currentTarget.value)},onKeyDown:u=>{if(u.key==="Enter"){if(u.preventDefault(),n){o(u.currentTarget.value),n();return}u.currentTarget.blur()}else u.key==="Escape"&&(u.preventDefault(),u.currentTarget.value=e,r?.(e),l.current=!0,u.currentTarget.blur())}})}function Af({name:e}){let o=an(),r=e?o[e]:void 0;return r?t.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):t.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function nc({current:e,onPick:o}){let r=an(),n=Object.keys(r).sort((a,i)=>a.localeCompare(i));return t.createElement("div",{className:"todo-icon-picker"},t.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(a=>t.createElement("button",{key:a,type:"button",role:"option","aria-selected":e===a,className:`todo-icon-picker-item${e===a?" is-active":""}`,title:a,"aria-label":a,onClick:()=>o(e===a?void 0:a)},t.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[a]}})))),t.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:Xa})))}function Ef(){let{Button:e,ColorField:o,IconButton:r,Section:n,Toggle:a,useReorderDrag:i}=f.ui.settings,[s,c]=ac($e);an();let p=t.useRef(""),[l,u]=t.useState(0),[g,b]=t.useState(!1),m=k=>{let S=$r(k);c(S),Ns(S)},w=s.active.map(k=>Ae(k,s)),v=i({items:w,indicatorOnly:!0,getId:k=>k.id,getLabel:k=>k.label,onReorder:k=>m({...s,active:k.map(S=>S.id)})}),F=(k,S)=>{S!==s.active.includes(k)&&m({...s,active:S?[...s.active,k]:s.active.filter($=>$!==k)})},_=k=>k.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Gr),[L,A]=t.useState({strike:!1,color:ye("teal"),done:!1,show:!0}),y=()=>{let k=_(p.current);if(!k||s.custom.length>=Fr)return;let S=Is();m({...s,custom:[...s.custom,{id:S,label:k,done:L.done}],active:L.show?[...s.active,S]:s.active,strikethrough:{...s.strikethrough,[S]:L.strike},colors:{...s.colors,[S]:L.color},icons:L.icon?{...s.icons,[S]:L.icon}:s.icons}),p.current="",b(!1),A({strike:!1,color:ye("teal"),done:!1,show:!0}),u($=>$+1)},D=(k,S)=>{let $=_(S);if(dt(k)){if(!$)return;m({...s,custom:s.custom.map(x=>x.id===k?{...x,label:$}:x)})}else{let x={...s.labels};$&&$!==As(k)?x[k]=$:delete x[k],m({...s,labels:x})}},H=async(k,S)=>{dt(k)?m({...s,custom:s.custom.map(x=>x.id===k?{...x,done:S}:x)}):m({...s,done:{...s.done,[k]:S}});let $=(await Xe()).filter(x=>x.status===k);await Promise.all($.map(x=>Ga(x.id,k)))},G=(k,S)=>{let $=$e(),x={...$.icons};S?x[k]=S:delete x[k],m({...$,icons:x})},B=(k,S)=>{f.ui.openPopover(({close:$})=>t.createElement(nc,{current:s.icons[S],onPick:x=>{G(S,x),$()}}),{anchor:k,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},E=async k=>{let S=Ae(k,s).label,$=(await Xe()).filter(O=>O.status===k);if(await f.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:S}),message:$.length?d("todo.settings.statusDeleteMoves",{count:$.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all($.map(O=>Ga(O.id,"open")));let C=$e();dt(k)?m({...C,custom:C.custom.filter(O=>O.id!==k),active:C.active.filter(O=>O!==k)}):m({...C,removed:[...C.removed,k],active:C.active.filter(O=>O!==k)})},P=(k,S,$)=>{let x=k.id,C=`${x}@${$}`,O=k.label,U=S==="shown"?v.getHandleProps(k):null,N=S==="locked";return t.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(N?" locked":"")+(S==="off"?" is-off":"")+(S==="shown"&&v.overId===x?" drop-"+(v.dropPosition??"before"):""),key:x,...S==="shown"?v.getItemProps(k):{}},U?t.createElement("button",{...U,className:(U.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},t.createElement(wo,null)):t.createElement("span",{className:"todo-settings-handle is-static",title:N?d("todo.settings.statusLocked"):void 0},N&&t.createElement(Td,null)),N?t.createElement("span",{className:`todo-settings-glyph ${k.cls}`},t.createElement(xe,{status:x==="open"?null:x,dotCls:k.cls})):t.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${k.cls}`,title:d("todo.settings.statusIconOf",{p0:O}),"aria-label":d("todo.settings.statusIconOf",{p0:O}),onClick:X=>B(X.currentTarget,x)},t.createElement(xe,{status:x,dotCls:k.cls})),t.createElement("span",{className:"todo-settings-name todo-settings-name-field"},t.createElement(ra,{key:`name:${C}:${O}`,initial:O,ariaLabel:d("todo.settings.statusName"),onCommit:X=>D(x,X)})),t.createElement(r,{key:`strike:${C}`,className:"todo-settings-strike",pressed:s.strikethrough[x],"aria-pressed":s.strikethrough[x],ariaLabel:d("todo.settings.statusStrike",{p0:O}),title:d("todo.settings.statusStrike",{p0:O}),onClick:()=>m({...s,strikethrough:{...s.strikethrough,[x]:!s.strikethrough[x]}})},t.createElement(vn,null)),t.createElement(o,{key:`color:${C}`,value:s.colors[x],onChange:X=>m({...s,colors:{...s.colors,[x]:X}}),ariaLabel:d("todo.settings.statusColor",{p0:O}),allowCustom:!1}),t.createElement(r,{key:`done:${C}`,className:"todo-settings-strike",pressed:k.done,"aria-pressed":k.done,disabled:N,ariaLabel:d("todo.settings.statusDone",{p0:O}),title:d("todo.settings.statusDone",{p0:O}),onClick:()=>{N||H(x,!k.done)}},t.createElement(We,null)),N?t.createElement("span",null):t.createElement(a,{key:`show:${C}`,checked:S!=="off",label:d("todo.settings.statusShow",{p0:O}),onChange:X=>F(x,X)}),N?t.createElement("span",null):t.createElement(r,{key:`delete:${C}`,ariaLabel:d("todo.settings.statusDelete",{p0:O}),title:d("todo.settings.statusDelete",{p0:O}),onClick:()=>{E(x)}},t.createElement(Nt,null)))},j=[...jo.filter(k=>!s.active.includes(k)&&!s.removed.includes(k)),...s.custom.map(k=>k.id).filter(k=>!s.active.includes(k))].map(k=>Ae(k,s)),V=s.custom.length>=Fr;return t.createElement(n,{title:d("todo.settings.statuses")},t.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),t.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},t.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},t.createElement("span",null),t.createElement("span",null,d("todo.settings.colIcon")),t.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),t.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},t.createElement(vn,null)),t.createElement("span",null,d("todo.settings.colColor")),t.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},t.createElement(We,null)),t.createElement("span",null,d("todo.settings.colShow")),t.createElement("span",null)),P(Ae("open",s),"locked",0),P(Ae("completed",s),"locked",1),w.map((k,S)=>P(k,"shown",2+S)),j.map((k,S)=>P(k,"off",2+w.length+S)),t.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},t.createElement("span",{className:"todo-settings-handle is-static"}),t.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:Se(L.color)},disabled:V,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:k=>{f.ui.openPopover(({close:S})=>t.createElement(nc,{current:L.icon,onPick:$=>{A(x=>({...x,icon:$})),S()}}),{anchor:k.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},t.createElement(Af,{name:L.icon})),t.createElement("span",{className:"todo-settings-name todo-settings-name-field"},t.createElement(ra,{key:`add:${l}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:V,onType:k=>{p.current=k,!!_(k)!==g&&b(!g)},onCommit:k=>{p.current=k},onEnter:y})),t.createElement(r,{className:"todo-settings-strike",pressed:L.strike,"aria-pressed":L.strike,disabled:V,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>A(k=>({...k,strike:!k.strike}))},t.createElement(vn,null)),t.createElement(o,{key:`add-color:${l}`,value:L.color,onChange:k=>A(S=>({...S,color:k})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),t.createElement(r,{className:"todo-settings-strike",pressed:L.done,"aria-pressed":L.done,disabled:V,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>A(k=>({...k,done:!k.done}))},t.createElement(We,null)),t.createElement(a,{key:`add-show:${l}`,checked:L.show,disabled:V,label:d("todo.settings.colShow"),onChange:k=>A(S=>({...S,show:k}))}),t.createElement(r,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:V||!g,onClick:y},t.createElement(Xt,null)))),v.liveRegion,s.removed.length>0&&t.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>m({...s,removed:[],active:[...s.active,...s.removed]})},d("todo.settings.statusRestore",{count:s.removed.length})))}function Df(){let{Row:e,Section:o,SelectField:r}=f.ui.settings,[n,a]=t.useState(An);return t.createElement(t.Fragment,null,t.createElement(o,{title:d("todo.settings.display")},t.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},t.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let s=i;a(s),f.settings.set(ii,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),t.createElement(rc,null))}function Cf(){let{Button:e,ColorField:o,IconButton:r,Section:n,useReorderDrag:a}=f.ui.settings,i=Js(),s=Be(),c=If(),p=t.useRef(""),[l,u]=t.useState(0),[g,b]=t.useState(()=>_r(s)),[m,w]=t.useState(!1),v=(D,H)=>s.some(G=>G.id!==H&&[G.name,...G.aliases??[]].some(B=>Q(B)===Q(D))),F=D=>{Zs(D)},_=D=>{let H=new Set([D.name,...D.aliases??[]].map(Q));return c.filter(G=>H.has(Q(G))).length},L=a({items:i,indicatorOnly:!0,getId:D=>D.id,getLabel:D=>D.name,onReorder:D=>F(D)}),A=()=>{let D=p.current.trim().slice(0,Yo);if(!D||i.length>=Yr)return;if(v(D)){w(!0);return}let H={id:qs(),name:D,color:g};F([...i,H]),p.current="",w(!1),b(_r([...s,H])),u(G=>G+1)},y=(D,H)=>{!H.trim()||H.trim()===D.name||v(H,D.id)||F(i.map(G=>G.id===D.id?Ys(G,H):G))};return t.createElement(n,null,t.createElement("div",{className:"settings-path-row settings-groups-row"},t.createElement("span",{className:"settings-toggle-text"},t.createElement("span",{className:"settings-toggle-title"},d("todo.settings.localGroups")),t.createElement("span",{className:"settings-toggle-desc"},d("todo.settings.localGroupsDesc"))),t.createElement("div",{className:"settings-colorrules settings-groups todo-local-groups",role:"list","aria-label":d("todo.settings.localGroups")},i.map((D,H)=>{let G=`${D.id}@${H}`,B=L.getHandleProps(D),E=_(D);return t.createElement("div",{role:"listitem",className:"settings-colorrule-row"+(L.overId===D.id?" drop-"+(L.dropPosition??"before"):""),key:D.id,...L.getItemProps(D)},t.createElement("button",{...B,className:(B.className??"")+" settings-colorrule-grip"},t.createElement(wo,null)),t.createElement(ra,{key:`name:${D.id}:${D.name}`,className:"settings-colorrule-key",initial:D.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:P=>y(D,P)}),t.createElement(o,{key:`color:${G}`,value:D.color,onChange:P=>F(i.map(j=>j.id===D.id?{...j,color:P}:j)),ariaLabel:d("todo.settings.localGroupColor",{p0:D.name})}),t.createElement("span",{className:"settings-group-usage","aria-label":d("todo.settings.localGroupUsage",{count:E}),title:d("todo.settings.localGroupUsage",{count:E})},E),t.createElement(r,{key:`remove:${G}`,className:"settings-colormap-remove","aria-disabled":E>0||void 0,ariaLabel:d("todo.settings.localGroupDelete",{p0:D.name}),title:E>0?d("todo.settings.localGroupRemoveBlocked",{count:E}):d("todo.settings.localGroupRemove"),onClick:()=>{E===0&&F(i.filter(P=>P.id!==D.id))}},t.createElement(we,null)))}),L.liveRegion,t.createElement("div",{className:"settings-colorrule-row settings-colorrule-add"},t.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),t.createElement(ra,{key:`add:${l}`,className:"settings-colorrule-key",initial:"",invalid:m,placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:D=>{p.current=D,w(!1)},onCommit:D=>{p.current=D},onEnter:A}),t.createElement(o,{key:`add-color:${l}`,value:g,onChange:b,ariaLabel:d("todo.settings.localGroupNewColor")}),t.createElement("span",{className:"settings-colorrule-add-action"},t.createElement("span",{className:"settings-button settings-button--medium settings-colorrule-add-sizer","aria-hidden":"true"},d("todo.settings.localGroupAdd")),t.createElement(e,{type:"button",className:"settings-colormap-add-btn",disabled:i.length>=Yr,onClick:A},d("todo.settings.localGroupAdd")))),m&&t.createElement("span",{className:"settings-empty-text"},d("todo.settings.localGroupDuplicate")))))}function If(){let[e,o]=t.useState([]);return t.useEffect(()=>{let r=!0,n=()=>{Xe().then(i=>{r&&o(i.flatMap(s=>s.group?[s.group]:[]))}).catch(()=>{})};n();let a=Et(n);return()=>{r=!1,a()}},[]),e}function ic({section:e}){return e==="statuses"?t.createElement(Ef,null):e==="lists"?t.createElement(t.Fragment,null,t.createElement(Sf,null),t.createElement(f.ui.settings.Section,null,t.createElement(f.ui.settings.GroupsEditor,null)),t.createElement(Cf,null)):t.createElement(Df,null)}var sc="reminder:";function dc(){let e=Ne();return f.notifications.onAction(({key:o,action:r,targetItemId:n})=>{if(r!=="click"||!o.startsWith(sc))return;let a=n??o.slice(sc.length).split(":")[0];Xe(e).then(i=>{e.assertActive();let s=i.find(c=>c.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var Ii=(e,o=[])=>({type:"object",properties:e,required:o,additionalProperties:!1}),Ni=e=>({type:"string",description:e});async function Li(e,o,r,n){let a=await e.commands.executeOwn(o,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function lc(e){return pa([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Ii({}),sideEffect:"read",commandId:"list",run:async(o,r)=>{let a=(await Li(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Ii({title:Ni("Task title"),due:Ni("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(o,r)=>{let n=String(o.title??"");return`Added todo "${(await Li(e,"add",{title:n,due:String(o.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Ii({id:Ni("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(o,r)=>{let n=String(o.id??"");return`Completed "${(await Li(e,"complete",{query:n},r)).title||n}".`}}])}function Nf(e){xs(e);let o=is(e),r=ds(),n=Os(),a=xd(),i=ll(),s=!1,c=e.backend.on("records.eventDeliveryFailed",()=>{s||(s=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{s=!1}))});Xd();let p=e.workspace.onOpenOwnLink(A=>{Gn(A)});e.registerView("todo.panel",Zl),e.registerView("todo.file",Jl),e.registerView("todo.page",Ql),e.registerView("todo.settings",ic);let l=fd(e),u=pl(e),g=e.interop.services.provide(ma,lc(e)),b=wd(),m=nl(),w=e.interop.services.subscribe($t,()=>{}),v=e.interop.services.subscribe($t,()=>{}),F=il(e),_=dc(),L=Qs();return()=>{c(),o(),l(),u(),g(),b(),m(),w(),v(),F(),_(),L(),p(),n(),a(),i(),r()}}var Lf={register:Nf},mT=Lf;export{mT as default,Nf as register};

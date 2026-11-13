var Et="valley";var Of=`.${Et}`,Mf=`app.${Et}`;function gc(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var hc=/^[a-zA-Z]:/;function Fo(e){if(typeof e!="string")return"";let o=gc(e);return!o||o==="."||hc.test(o)||o.split("/").some(r=>r==="..")?"":o}function $t(e){if(typeof e=="string")return Fo(e)||void 0}var Ce=`.${Et}`,bc="plugins",Go=`${Ce}/${bc}`,Dr=`${Go}/packages`,Ff=`${Dr}/core`,Gf=`${Dr}/github`,$f=`${Dr}/local`,Rf=`${Dr}/community`,jf=`${Go}/community.json`,Kf=`${Go}/data`;var Uf=`${Go}/enabled.json`,Vf=`${Go}/sources.json`,Bf=`${Ce}/state`,Ie=`${Ce}/settings`,Fi=`${Ce}/data`,sa=`${Ce}/recovery`;var da=`${Ce}/accounts`,po=`${Ce}/ai`,Hf=`${po}/connections.json`,Wf=`${po}/defaults.json`,qf=`${po}/budgets.json`,Yf=`${po}/usage.sqlite`,Xf=`${po}/security/guards.json`,Zf=`${po}/security/activity.sqlite`,Jf=`${da}/providers`,Qf=`${da}/providers.lock.json`,yc=`${Ce}/trash`,eg=`${yc}/items`,la=`${Ce}/cache`,tg=`${la}/accounts`,wc=`${la}/search`,og=`${la}/providers`;var rg=`${wc}/index.jsonl`,ng=`${sa}/drafts`,ag=`${sa}/transactions`,ig=`${sa}/retired`;var Dt="design",vc="themes",Gi=`${Ce}/${Dt}/${vc}`,sg=`${Gi}/local`,dg=`${Gi}/community`,lg={app:`${Ie}/app.json`,appearance:`${Ce}/${Dt}/appearance.json`,"icon-rail":`${Ce}/${Dt}/icon-rail.json`,"footer-rail":`${Ce}/${Dt}/footer-rail.json`,"plugin-startup":`${Ce}/${Dt}/right-sidebar-startup.json`,"new-tab":`${Ce}/${Dt}/new-tab.json`,pallette:`${Ce}/${Dt}/palette.json`,group:`${Fi}/groups.json`,units:`${Fi}/units.json`,metadata:`${Ie}/file-viewers.json`,notification:`${Ie}/notification.json`,"notification-settings":`${Ie}/notification-settings.json`,preferences:`${Ie}/preferences.json`,"link-actions":`${Ie}/link-actions.json`,markdown:`${Ie}/markdown.json`,editor:`${Ie}/editor.json`,"editor-vim":`${Ie}/editor-vim.json`,"markdown-todo":`${Ie}/markdown-todo.json`,"markdown-codeblocks":`${Ie}/markdown-codeblocks.json`,"markdown-template":`${Ie}/markdown-template.json`,"markdown-embeed":`${Ie}/markdown-embeed.json`,files:`${Ie}/file.json`,"file-sorter":`${Ie}/file-sorter.json`,"file-sym-link":`${Ie}/file-sym-link.json`,search:`${Ie}/search.json`,"search-tag":`${Ie}/search-tag.json`,"search-content":`${Ie}/search-content.json`,design:`${Ce}/${Dt}/appearance.json`,accounts:`${da}/connections.json`};var $i=Et,Ri="open";var xc=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),ji=16384;var Ki=new Set(["__proto__","prototype","constructor"]);function Ui(e){let o=0;for(let r of e){let n=r.codePointAt(0);o+=n<=127?1:n<=2047?2:n<=65535?3:4}return o}function Cr(e){let o=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Ui(i)>ji)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||o.has(i))return;let c=Array.isArray(i),u=Object.getPrototypeOf(i);if(!(!c&&u!==null&&(Object.getPrototypeOf(u)!==null||typeof Object.getOwnPropertyDescriptor(u,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(u,"constructor").value)!=="function Object() { [native code] }"))){o.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(b=>typeof b=="string"&&Ki.has(b)))throw new Error("Invalid or excessive bookmark state keys");let p=Object.getOwnPropertyDescriptors(i);if(c){let b=p.length?.value;if(!Number.isSafeInteger(b)||b>8192)throw new Error("Bookmark state is too complex");return Array.from({length:b},(m,k)=>{let T=p[String(k)];return T&&"value"in T?n(T.value,s+1)??null:null})}let g={};for(let b of Object.keys(p).sort()){if(Ki.has(b))throw new Error("Invalid bookmark state key");let m=p[b];if(!m.enumerable||!("value"in m)){r++;continue}let k=n(m.value,s+1);k!==void 0&&(g[b]=k)}return g}finally{o.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Ui(JSON.stringify(a))>ji)throw new Error("Bookmark state is too large");return a}function Hi(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let o=Fo(e);if(!o)throw new Error("Invalid bookmark path");return o}function ca(e,o,r){if(typeof e!="string"||e.length>o||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Vi(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function ua(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let o=e;if(o.kind!=="plugin"||typeof o.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(o.pluginId)||!xc.has(o.surface))throw new Error("Invalid plugin bookmark target");if(o.instanceId!==void 0&&(typeof o.instanceId!="string"||o.instanceId.length>512))throw new Error("Invalid bookmark instance");if(o.itemId!==void 0&&(typeof o.itemId!="string"||!o.itemId||o.itemId.length>2048||/[\u0000-\u001f]/.test(o.itemId)))throw new Error("Invalid bookmark item");if(!o.state||typeof o.state!="object"||Array.isArray(o.state))throw new Error("Invalid bookmark state");let r=Cr(o.state);return r.path!==void 0&&(r.path=Hi(r.path)),{kind:"plugin",pluginId:o.pluginId,surface:o.surface,state:r,...o.instanceId===void 0?{}:{instanceId:o.instanceId},...o.itemId===void 0?{}:{itemId:o.itemId}}}var kc=/^[A-Za-z0-9_-]{1,64}$/;function Bi(e,o){if(typeof e!="string"||!kc.test(e))throw new Error(`Invalid bookmark ${o}`);return e}function Wi(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let o=e,r=ca(o.title,512,"title"),n={...o.description===void 0?{}:{description:ca(o.description,1024,"description")},...o.providerName===void 0?{}:{providerName:ca(o.providerName,256,"provider name")},...typeof o.createdAt=="number"&&Number.isSafeInteger(o.createdAt)&&o.createdAt>=0?{createdAt:o.createdAt}:{}},a=o.group===void 0?{}:{group:Bi(o.group,"group")};if(o.groupId!==void 0){let c=Bi(o.groupId,"group id");if(!r||o.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(o.target!==void 0){let c={folderPath:"",title:r,target:ua(o.target),...n,...a};return{...c,searchText:Vi(c)}}if(typeof o.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:Hi(o.folderPath),title:r,...n,...a};return{...s,searchText:Vi(s)}}function Rt(e){let o=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++o>2048||s>32||!r(i)||typeof i.type!="string")return!1;let c=(...u)=>Object.keys(i).every(l=>l==="type"||u.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(u=>a(u,s+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(u=>a(u,s+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([u,l])=>n(u)&&a(l,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(u=>typeof u=="string"&&Object.hasOwn(i.properties,u)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Ir(e,o,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,c,u)=>{if(--n<0||u>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return c===null;if(s.type==="literal")return c===s.value;if(s.type==="union")return s.anyOf.some(l=>i(l,c,u+1));if(s.type==="number")return typeof c=="number"&&Number.isFinite(c);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof c===s.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return s.type==="array"?Array.isArray(c)&&c.length<=(s.maxItems??1e5)&&c.every(l=>i(s.items,l,u+1)):s.type==="tuple"?Array.isArray(c)&&c.length>=(s.minItems??s.items.length)&&c.length<=s.items.length&&c.every((l,p)=>i(s.items[p],l,u+1)):s.type==="object"?Array.isArray(c)||s.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,p])=>Object.hasOwn(s.properties,l)?i(s.properties[l],p,u+1):s.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,o,0)}var Tc=new Map;function fe(e,o,r,n,a,i,s,c,u="owner"){let l=Object.freeze({id:e,kind:o,version:r,cardinality:n,validate:a,identities:i,identityScope:u,serviceCalls:s,serviceMetadata:c});return Tc.set(`${o}:${e}@${r}`,l),l}var ma=256;function fa(e){let o=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=o.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var re=e=>!!e&&typeof e=="object"&&!Array.isArray(e),he=(e,o)=>typeof e[o]=="function",jt=e=>e===void 0,mo=e=>typeof e=="boolean",ie=e=>typeof e=="string",je=e=>e===void 0||ie(e),Sc=e=>e===void 0||typeof e=="number",Ac=e=>e===void 0||typeof e=="boolean",me=(e,o)=>e.length===o.length&&o.every((r,n)=>r(e[n])),_e=e=>re(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),qi=e=>re(e),Xi=e=>re(e)&&ie(e.id)&&ie(e.title)&&ie(e.date)&&(e.documentRef===void 0||re(e.documentRef)&&ie(e.documentRef.pluginId)&&ie(e.documentRef.sourceId)&&ie(e.documentRef.itemId)),Ec=e=>re(e)&&ie(e.date)&&je(e.startTime)&&je(e.endTime)&&je(e.sourceId)&&je(e.itemId),Dc=e=>re(e)&&ie(e.url)&&je(e.title)&&Ac(e.newTab),Cc=e=>re(e)&&ie(e.query),Zi=e=>re(e)&&ie(e.name)&&je(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Ic=e=>Array.isArray(e)&&e.every(Zi),Nc=e=>e===null||Zi(e),Lc=e=>e===void 0||re(e)&&je(e.approvalToken)&&(e.cancellation===void 0||re(e.cancellation)),Pc=e=>typeof e=="string"||re(e)&&typeof e.text=="string",Oc=e=>re(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&re(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&je(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ji=e=>re(e)&&ie(e.id)&&ie(e.label)&&je(e.labelKey)&&je(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ji)),Qi={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Xi)},create:{args:e=>me(e,[ie,qi]),result:mo},update:{args:e=>me(e,[ie,qi]),result:mo},remove:{args:e=>me(e,[ie]),result:mo},open:{args:e=>me(e,[ie]),result:jt},configure:{args:e=>e.length===0,result:jt},actions:{args:e=>me(e,[ie]),result:e=>Array.isArray(e)&&e.every(Ji)},runAction:{args:e=>me(e,[ie,ie]),result:mo}},es=e=>re(e)&&ie(e.name)&&ie(e.version)&&je(e.description)&&je(e.author)&&(e.localized===void 0||re(e.localized)&&Object.values(e.localized).every(o=>re(o)&&ie(o.name)&&je(o.description))),Mc=fe("calendar.itemSource","service","1.3.0","many",e=>re(e)&&he(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,Qi,e=>e.integration),Nr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,pa=e=>typeof e=="string"&&e.length>0&&e.length<=8192,_c=e=>re(e)&&Nr(e.startDate)&&Nr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=ma&&(e.cursor===void 0||pa(e.cursor)),zc=e=>re(e)&&pa(e.revision)&&(e.cursor===void 0||pa(e.cursor))&&Array.isArray(e.items)&&e.items.length<=ma&&e.items.every(o=>Xi(o)&&Nr(o.date)&&(o.endDate===void 0||Nr(o.endDate)&&o.endDate>=o.date))&&new Set(e.items.map(o=>o.id)).size===e.items.length,Kt=fe("calendar.itemSource","service","2.0.0","many",e=>re(e)&&he(e,"list")&&(e.integration===void 0||es(e.integration)),void 0,{...Qi,list:{args:e=>me(e,[_c]),result:zc}},e=>e.integration),$o=fe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Fc=fe("calendar.navigator","service","1.0.0","one",e=>re(e)&&he(e,"openDate"),void 0,{openDate:{args:e=>me(e,[Ec]),result:jt}}),Lr=fe("calendar.panelSelection","state","1.0.0","one",e=>re(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Gc=fe("web.activeContext","state","1.0.0","one",e=>re(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Yi(e){return re(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(o=>re(o)&&typeof o.address=="string"&&(o.label===void 0||typeof o.label=="string"))}var $c=fe("contacts.directory","service","1.0.0","one",e=>re(e)&&["search","resolveEmails","open"].every(o=>he(e,o)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Yi)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(o=>typeof o=="string"&&o.length<=1e3),result:e=>Array.isArray(e)&&e.every(o=>re(o)&&typeof o.address=="string"&&Array.isArray(o.contacts)&&o.contacts.every(Yi))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||re(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:jt}}),Rc=fe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),jc=fe("web.navigator","service","1.0.0","one",e=>re(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[Dc]),result:jt}}),Kc=fe("selection.textAction","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&he(e,"run"),e=>[e.id]),Uc=fe("geo.navigator","service","1.0.0","one",e=>re(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[Cc]),result:jt}}),Vc=fe("geo.search","service","1.0.0","one",e=>re(e)&&he(e,"search")&&he(e,"reverse"),void 0,{search:{args:e=>me(e,[ie]),result:Ic},reverse:{args:e=>me(e,[o=>Number.isFinite(o),o=>Number.isFinite(o)]),result:Nc}}),ga=fe("agent.toolProvider","service","1.0.0","many",e=>re(e)&&Array.isArray(e.tools)&&e.tools.every(Oc)&&he(e,"execute"),e=>e.tools.map(o=>o.name),{execute:{args:e=>me(e,[ie,re,Lc]),result:Pc}},e=>({tools:e.tools}),"global"),Bc=fe("guard.runtime","service","1.0.0","one",e=>re(e)&&["resolve","requestApproval","consumeToken","audit"].every(o=>he(e,o)),void 0,{resolve:{args:e=>me(e,[re]),result:re},requestApproval:{args:e=>me(e,[re]),result:mo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&ie(e[0])&&je(e[1]),result:mo},audit:{args:e=>me(e,[re]),result:jt}}),Hc=fe("browser.automation","service","1.0.0","one",e=>re(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(o=>he(e,o)),void 0,{list:{args:e=>e.length===0,result:_e},open:{args:e=>me(e,[ie]),result:_e},switch:{args:e=>me(e,[ie]),result:_e},close:{args:e=>me(e,[ie]),result:_e},snapshot:{args:e=>me(e,[ie]),result:_e},readText:{args:e=>e.length>=1&&e.length<=2&&ie(e[0])&&Sc(e[1]),result:_e},readHtml:{args:e=>me(e,[ie]),result:_e},screenshot:{args:e=>me(e,[ie]),result:_e},click:{args:e=>me(e,[ie,o=>typeof o=="number"]),result:_e},type:{args:e=>e.length>=3&&e.length<=4&&ie(e[0])&&typeof e[1]=="number"&&ie(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:_e},select:{args:e=>me(e,[ie,o=>typeof o=="number",ie]),result:_e},scroll:{args:e=>me(e,[ie,o=>typeof o=="number",o=>typeof o=="number"]),result:_e},pressKey:{args:e=>me(e,[ie,ie]),result:_e},navigate:{args:e=>me(e,[ie,ie]),result:_e},back:{args:e=>me(e,[ie]),result:_e},forward:{args:e=>me(e,[ie]),result:_e},reload:{args:e=>me(e,[ie]),result:_e}}),Wc=fe("fileTree.contextItem","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.label=="string"&&je(e.labelKey)&&he(e,"run"),e=>[e.id]),qc=fe("newTab.entry","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"run"),e=>[e.id]),ha=fe("search.resultAction","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&he(e,"open"),e=>[e.cardKind]),Yc=fe("search.resultCard","extension","1.0.0","many",e=>re(e)&&typeof e.cardKind=="string"&&he(e,"render")&&he(e,"open"),e=>[e.cardKind]),Pr=fe("metadataPanel.segment","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"render"),e=>[e.id]),ba=fe("workspace.surface","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&he(e,"getSnapshot")&&he(e,"subscribe")&&he(e,"restore"),e=>[e.id]),Xc=fe("metadata.plugin","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"facts"),e=>[e.id]),Zc=fe("workspace.viewState","extension","1.0.0","many",e=>re(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&he(e,"capture")&&he(e,"restore")&&he(e,"subscribe"),e=>[e.id]);var Or=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let o=Object.getPrototypeOf(e);if(o!==null&&(Object.getPrototypeOf(o)!==null||typeof Object.getOwnPropertyDescriptor(o,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(o,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},ya=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),ts=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),os=e=>ya(e)&&typeof e.surface=="string"&&ts.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Ro(e){let o=Or(e);if(!os(o))throw new Error("Invalid bookmark descriptor");let r=ua({kind:"plugin",pluginId:"provider",surface:o.surface,instanceId:o.instanceId,itemId:o.itemId,state:o.state}),n=Wi({folderPath:"",title:o.title,description:o.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function wa(e){try{let o=Ro(e),r=Or(e);return JSON.stringify(o.state)===JSON.stringify(Cr(r.state))}catch{return!1}}function Jc(e){try{let o=Or(e);if(o.status==="unavailable"||o.status==="invalid")return{status:o.status};if(o.status==="ready")return{status:"ready",bookmark:Ro(o.bookmark)}}catch{}return{status:"invalid"}}var Qc=e=>{try{let o=Or(e);return o.status==="unavailable"||o.status==="invalid"||o.status==="ready"&&wa(o.bookmark)}catch{return!1}},eu=e=>ya(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),rs=fe("workspace.bookmark","service","1.0.0","many",e=>ya(e)&&typeof e.id=="string"&&ts.has(String(e.surface))&&Rt(e.stateSchema)&&(e.itemStateSchema===void 0||Rt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&os(e[0]),result:Qc,sanitizeResult:Jc},restore:{args:e=>e.length===1&&wa(e[0]),result:eu}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function va(e,o,r){if(!Rt(r.stateSchema)||r.itemStateSchema!==void 0&&!Rt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,p,g=!1)=>Ir(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,p)),i=(l,p,g)=>{let b=g?void 0:r.primary?r.primary(l):l.item,m=Cr(b?.state??l.view);if(!a(m,p,!!b))throw new Error("Invalid bookmark state");return Ro({...p,title:b?.title??l.title,description:r.description(l,!!b),state:m,...b?{itemId:b.id}:{}})},s={id:o.id,surface:o.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==o.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(o.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==o.surface)return{status:"unavailable"};let p;try{if(p=Ro(l),!a(p.state,p,p.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await o.restore(p.state,p.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(rs,s),u;try{u=e.interop.extensions.provide(ba,{...o,getSnapshot(l){let p=o.getSnapshot(l),g={surface:o.surface,...l===void 0?{}:{instanceId:l}},b,m;try{b=i(p,g,!1)}catch{}try{m=i(p,g,!0)}catch{}return{...p,bookmark:b,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,u(),c()}}var jo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ns=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function as(e){if(!jo(e)||!ns(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let o=new Set;for(let r of e.items){if(!jo(r)||!ns(r.id)||o.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;o.add(r.id)}if(e.automation!==void 0){if(!jo(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!jo(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!o.has(r)||!jo(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&o.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var tu=fe("workspace.details","extension","1.0.0","many",as,e=>[`provider:${e.id}`,...e.items.map(o=>`item:${o.id}`)]);var $g=[Ce,`${Ce}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Qg=1024*1024;var oh=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var rh=globalThis.Buffer;var ru=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var t,f,Mr=new Map,_r;function Pe(){return _r}function zr(e,o){let r=Mr.get(e)??new Set;return r.add(o),Mr.set(e,r),()=>{r.delete(o),r.size||Mr.delete(e)}}function is(e){_r?.dispose(),f=e,t=e.React;let o=!0,r=new Set;return _r={api:e,assertActive:()=>{if(!o)throw new Error("To-Do read scope disposed")},onDispose:n=>(o?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(o){o=!1;for(let n of r)n();r.clear()}}},_r.dispose}var nu=1800;function fo(e){let o=ze();t.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=p=>{if(p.mode==="create")return;i=p.nonce,p.mode==="edit"&&(o.clear(),e(p.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,b=()=>{if(r=null,i!==p.nonce)return;let m=[...Mr.get(p.todoId)??[]].find(k=>k.isConnected);if(!m){Date.now()<g?r=setTimeout(b,40):o.get()?.nonce===p.nonce&&o.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(s,nu),o.get()?.nonce===p.nonce&&o.clear()};r=setTimeout(b,0)},u=o.subscribe(()=>{let p=o.get();p&&c(p)}),l=o.get();return l&&c(l),()=>{u(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[o,e])}function ze(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,o=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},o()},clear:()=>{r.value&&(r.value=null,o())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function ss(){ze().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var au=`
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
.todo-status-plain { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-row:not(:hover) .todo-status-plain { opacity: 0; }

`,xa="notes-todo-styles";function ds(){let e=document.getElementById(xa);return e||(e=document.createElement("style"),e.id=xa,document.head.appendChild(e)),e.textContent=au,()=>{document.getElementById(xa)===e&&e.remove()}}var de="#12120f",ge="#ffffff",Ta=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:de,onDark:de},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ge,onDark:ge},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:de,onDark:de},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ge,onDark:de},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:de,onDark:de},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ge,onDark:de},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ge,onDark:de},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ge,onDark:de},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ge,onDark:de},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ge,onDark:ge},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:de,onDark:de},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ge,onDark:de},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ge,onDark:de},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:de,onDark:de},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ge,onDark:de},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ge,onDark:de},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ge,onDark:de},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ge,onDark:de},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:de,onDark:de},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:de,onDark:de},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ge,onDark:de},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ge,onDark:de},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ge,onDark:de},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ge,onDark:de},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ge,onDark:de},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ge,onDark:de},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:de,onDark:de},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:de,onDark:de},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ge,onDark:de},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:de,onDark:de},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ge,onDark:de},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ge,onDark:de},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:de,onDark:de},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ge,onDark:de},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ge,onDark:de},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ge,onDark:de}],iu=["semantic","muted","accent","categorical"];var Bh=new Map(Ta.map(e=>[e.id,e])),su={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},du=new Map(Ta.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,o=>o.toUpperCase())])),lu=/^[a-z][a-z0-9-]{0,47}$/,cu={version:4,families:iu.map(e=>({id:e,name:su[e]})),colors:Ta.map(e=>({id:e.id,familyId:e.family,name:du.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},uu=e=>({version:4,families:e.families.map(o=>({...o})),colors:e.colors.map(o=>({...o})),archived:e.archived.map(o=>({...o}))});var pu=uu(cu);function ls(){return pu}var ka=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Fr="palette:",mu=/^#[0-9a-f]{6}$/i;function Gr(e){return e.startsWith(Fr)&&lu.test(e.slice(Fr.length))}function we(e){return`${Fr}${e}`}function Ko(e){return Gr(e)?e.slice(Fr.length):void 0}function cs(e){if(typeof e!="string")return;let o=e.trim();return Gr(o)?o:mu.test(o)?o.toLowerCase():void 0}function ve(e){let o=Ko(e);return o?`var(--color-${o})`:e}function Ct(e){let o=Ko(e);return o?`var(--color-${o}-on)`:"var(--title-color)"}function Sa(e){let o=new Set(e.map(r=>Ko(r)??r.toLowerCase()));return we(ka.find(r=>!o.has(r))??ka[0])}function us(e){let o=0;for(let n=0;n<e.length;n+=1)o=o*31+e.charCodeAt(n)|0;let r=ka;return we(r[Math.abs(o)%r.length])}function X(e){return e.trim().toLowerCase()}function fu(e,o,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=X(i);!s||s===X(o)||r.has(s)||(r.add(s),n.push(i))}return n}function ps(e){return`group_${X(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Ut(e){if(!Array.isArray(e))return[];let o=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=X(i);if(!i||r.has(s))continue;r.add(s);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():ps(i),u=cs(a.color)??Sa(o.map(p=>p.color)),l=fu(a.aliases,i,r);o.push({id:c,name:i,color:u,...l.length?{aliases:l}:{}})}return o}function Uo(e,o){let r=X(o??"");if(r)return e.find(n=>X(n.name)===r||(n.aliases??[]).some(a=>X(a)===r))}function $r(e,o){return Uo(o,e)?.name}function Se(e,o){let r=X(e??"");return r?Uo(o,e)?.color??us(r):we("primary-blue")}function Aa(e){return Sa(e.map(o=>o.color))}function Ea(e){let o={};for(let r of e){let n=X(r??"");n&&(o[n]=(o[n]??0)+1)}return o}var ms={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists","todo.settings.section.statuses":"Statuses","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do groups","todo.settings.localGroupsDesc":"Groups only To-Do uses, beside the shared groups above. Put one under a shared group to include its tasks in that group.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Under shared group","todo.settings.localGroupParentOf":"Shared group of {{p0}}","todo.settings.localGroupNoParent":"None","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupDeleteTitle":"Delete the group \u201C{{p0}}\u201D?","todo.settings.localGroupDeleteMoves":"{{count}} tasks in this group will have no group.","todo.settings.localGroupDeleteUnused":"No task uses this group.","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add group","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.detail.noDate":"No date","todo.detail.remindAt":"At a set date and time","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} reminders","todo.sheet.editNotes":"Edit notes","todo.sheet.viewNotes":"Show formatted notes","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59)."};var fs={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen","todo.settings.section.statuses":"Status","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"To-Do-Gruppen","todo.settings.localGroupsDesc":"Gruppen nur f\xFCr To-Do, neben den geteilten Gruppen oben. Unter einer geteilten Gruppe z\xE4hlen ihre Aufgaben zu dieser Gruppe.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Unter geteilter Gruppe","todo.settings.localGroupParentOf":"Geteilte Gruppe von {{p0}}","todo.settings.localGroupNoParent":"Keine","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupDeleteTitle":"Gruppe \u201E{{p0}}\u201C l\xF6schen?","todo.settings.localGroupDeleteMoves":"{{count}} Aufgaben dieser Gruppe haben danach keine Gruppe.","todo.settings.localGroupDeleteUnused":"Keine Aufgabe verwendet diese Gruppe.","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Gruppe hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.detail.noDate":"Kein Datum","todo.detail.remindAt":"Zu festem Datum und Zeit","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.reminderCount":"{{count}} Erinnerungen","todo.sheet.editNotes":"Notizen bearbeiten","todo.sheet.viewNotes":"Formatierte Notizen anzeigen","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59)."};var gs={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas","todo.settings.section.statuses":"Estados","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos de To-Do","todo.settings.localGroupsDesc":"Grupos solo de To-Do, junto a los grupos compartidos de arriba. Bajo un grupo compartido, sus tareas cuentan en ese grupo.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupParent":"Bajo el grupo compartido","todo.settings.localGroupParentOf":"Grupo compartido de {{p0}}","todo.settings.localGroupNoParent":"Ninguno","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupDeleteTitle":"\xBFEliminar el grupo \xAB{{p0}}\xBB?","todo.settings.localGroupDeleteMoves":"{{count}} tareas de este grupo quedar\xE1n sin grupo.","todo.settings.localGroupDeleteUnused":"Ninguna tarea usa este grupo.","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir grupo","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.detail.noDate":"Sin fecha","todo.detail.remindAt":"En una fecha y hora fijas","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.reminderCount":"{{count}} recordatorios","todo.sheet.editNotes":"Editar notas","todo.sheet.viewNotes":"Mostrar notas con formato","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59)."};var hs={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes","todo.settings.section.statuses":"Statuts","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes To-Do","todo.settings.localGroupsDesc":"Groupes propres \xE0 To-Do, \xE0 c\xF4t\xE9 des groupes partag\xE9s ci-dessus. Plac\xE9 sous un groupe partag\xE9, un groupe y ajoute ses t\xE2ches.","todo.settings.localGroupName":"Nom","todo.settings.localGroupParent":"Sous le groupe partag\xE9","todo.settings.localGroupParentOf":"Groupe partag\xE9 de {{p0}}","todo.settings.localGroupNoParent":"Aucun","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupDeleteTitle":"Supprimer le groupe \xAB {{p0}} \xBB ?","todo.settings.localGroupDeleteMoves":"{{count}} t\xE2ches de ce groupe n\u2019auront plus de groupe.","todo.settings.localGroupDeleteUnused":"Aucune t\xE2che n\u2019utilise ce groupe.","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter un groupe","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.detail.noDate":"Pas de date","todo.detail.remindAt":"\xC0 une date et une heure fixes","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.reminderCount":"{{count}} rappels","todo.sheet.editNotes":"Modifier les notes","todo.sheet.viewNotes":"Afficher les notes mises en forme","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59)."};var bs={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868","todo.settings.section.statuses":"\u72B6\u6001","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5F85\u529E\u4F7F\u7528\u7684\u5206\u7EC4\uFF0C\u4E0E\u4E0A\u65B9\u7684\u5171\u4EAB\u5206\u7EC4\u5E76\u5217\u3002\u653E\u5728\u67D0\u4E2A\u5171\u4EAB\u5206\u7EC4\u4E0B\uFF0C\u5176\u4EFB\u52A1\u4E5F\u4F1A\u8BA1\u5165\u8BE5\u5206\u7EC4\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupParent":"\u6240\u5C5E\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupParentOf":"{{p0}} \u7684\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupNoParent":"\u65E0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupDeleteTitle":"\u5220\u9664\u5206\u7EC4\u201C{{p0}}\u201D\uFF1F","todo.settings.localGroupDeleteMoves":"\u6B64\u5206\u7EC4\u4E2D\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u4E0D\u518D\u5C5E\u4E8E\u4EFB\u4F55\u5206\u7EC4\u3002","todo.settings.localGroupDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4\u3002","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0\u5206\u7EC4","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.detail.noDate":"\u65E0\u65E5\u671F","todo.detail.remindAt":"\u5728\u6307\u5B9A\u65E5\u671F\u548C\u65F6\u95F4","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.reminderCount":"{{count}} \u4E2A\u63D0\u9192","todo.sheet.editNotes":"\u7F16\u8F91\u5907\u6CE8","todo.sheet.viewNotes":"\u663E\u793A\u683C\u5F0F\u5316\u5907\u6CE8","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002"};var ys={en:ms,de:fs,es:gs,fr:hs,"zh-CN":bs};function ws(e,o){return(ys.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(o?.[a]??""))}var vs=ws;function xs(e){e.ui.registerCatalogs(ys),vs=(o,r)=>{let n=e.ui.t(o,r);return n===o?ws(o,r):n}}function d(e,o){return vs(e,o)}var ks={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},vu={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},xu={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},Ts=()=>{};function Ss(e){Ts=e}function As(e){let o=ks[e];return o?d(o):e}function nt(e,o=""){if(e===null||e==="open")return d("todo.status.todo");let r=Ts(e);if(r)return r;let n=ks[e];return n?d(n):o||e}function Ze(e){return d(vu[e])}function Es(e){return d(xu[e])}var ku=["auto","white","black"],jr=40,Kr=40,Tu=["completed","canceled"],Cs="statuses",Ho=[{id:"open",labelKey:"todo.status.todo",color:we("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:we("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:we("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:we("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:we("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:we("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:we("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:we("red"),done:!0,cls:"todo-st-canceled",locked:!1}],Da=we("teal");var Ca=Ho.map(e=>e.id),Vo=Ho.filter(e=>!e.locked).map(e=>e.id),lb=Ho.filter(e=>e.done).map(e=>e.id),Bo=new Map(Ho.map(e=>[e.id,e])),Ds=new Set(Vo);function ut(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function Is(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Su(e){if(typeof e!="string"||!Gr(e))return!1;let o=Ko(e);if(!o)return!1;let r=ls();return r.colors.some(n=>n.id===o)||r.archived.some(n=>n.id===o)}function Au(e){if(!Array.isArray(e))return[];let o=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Kr):"";if(!(!ut(a.id)||o.has(a.id)||!i)&&(o.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=jr))break}return r}function Ur(e){let o=e&&typeof e=="object"?e:{},r=Au(o.custom),n=new Set(r.map(w=>w.id)),a=Array.isArray(o.active)?o.active:Vo,i=[];for(let w of a)typeof w!="string"||!(Ds.has(w)||n.has(w))||i.includes(w)||i.push(w);let s=[...Ca,...r.map(w=>w.id)],c=w=>w&&typeof w=="object"?w:{},u=c(o.colors),l=Object.fromEntries(s.map(w=>{let M=Bo.get(w)?.color??Da;return[w,Su(u[w])?u[w]:M]})),p=c(o.textColors),g=Object.fromEntries(s.map(w=>[w,ku.includes(p[w])?p[w]:"auto"])),b=c(o.strikethrough),m=Object.fromEntries(s.map(w=>[w,typeof b[w]=="boolean"?b[w]:Tu.includes(w)||r.some(M=>M.id===w&&M.done)])),k="text",T=(w,M)=>typeof w=="string"?w.replace(/[\u0000-\u001f]/g," ").trim().slice(0,M):"",F=(Array.isArray(o.removed)?o.removed:[]).filter(w=>typeof w=="string"&&Ds.has(w)),_=Object.fromEntries(s.map(w=>[w,T(c(o.labels)[w],Kr)]).filter(([,w])=>w)),P=Object.fromEntries(s.filter(w=>w!=="open"&&w!=="completed").map(w=>[w,T(c(o.icons)[w],80)]).filter(([,w])=>w&&/^[^/\\]+$/.test(w))),x=Object.fromEntries(Vo.map(w=>[w,c(o.done)[w]]).filter(([w,M])=>typeof M=="boolean"&&M!==Bo.get(w)?.done));return{active:i.filter(w=>!F.includes(w)),custom:r,colors:l,textColors:g,strikethrough:m,style:k,labels:_,icons:P,done:x,removed:[...new Set(F)]}}function Ue(){return Ur(f?.settings.get()[Cs])}function Ns(e){f.settings.set(Cs,Ur(e))}Ss(e=>{let o=Ue();return o.labels[e]??o.custom.find(r=>r.id===e)?.label});function Vt(e=Ue()){return[...Ca,...e.custom.map(o=>o.id)]}function go(e,o=Ue()){return Bo.has(e)?o.done?.[e]??Bo.get(e).done:o.custom.some(r=>r.id===e&&r.done)}function Eu(e){return`todo-st-${e}`}function Du(e,o=Ue()){let r=o.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":Ct(o.colors[e]??Da)}function Ae(e,o=Ue()){let r=e&&ut(e)?o.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:o.colors[r.id]??Da,done:r.done,cls:Eu(r.id),locked:!1,custom:!0};let n=e&&Bo.get(e)||Ho[0];return{...n,label:o.labels[n.id]??nt(n.id),done:o.done[n.id]??n.done,color:o.colors[n.id],custom:!1}}function Rr(e=Ue()){return[Ae("open",e),Ae("completed",e),...e.active.map(o=>Ae(o,e))]}function ho(){return Rr().map(e=>e.id)}function Ls(e){return e==="open"||e==="completed"||Ue().active.includes(e)}function pt(){let[e,o]=t.useState(()=>Rr());return t.useEffect(()=>f.settings.subscribe(()=>o(Rr())),[]),e}function bo(e,o=ho()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=o.filter(a=>r.includes(a));return n.length?n:"all"}function yo(e,o){return o==="all"||o.includes(Fe(e))}function Vr(e){if(typeof e=="string")return Ca.includes(e)||ut(e)?e:void 0}function Fe(e){return e.status??(e.completed?"completed":"open")}function Ne(e,o){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:go(e,o),status:e}}function mt(){return Rr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:ve(e.color)}))}function Cu(){let e=Ue();return Vt(e).map(o=>{let r=Ae(o,e),n=ve(r.color),a=Du(o,e),i=e.strikethrough[o]?`.todo-row[data-status="${o}"] h4 .todo-title-md,.todo-table-row[data-status="${o}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${o}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${o}"]{background:${n};color:${a}}`+i}).join("")}function Ps(){let[e,o]=t.useState(()=>Ue().style);return t.useEffect(()=>f.settings.subscribe(()=>o(Ue().style)),[]),e}function Os(){let e="notes-todo-status-palette",o=document.getElementById(e);o||(o=document.createElement("style"),o.id=e,document.head.appendChild(o)),o.dataset.todoStatusPalette="true";let r=()=>{o.textContent=Cu()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===o&&o.remove()}}async function Ms(e,o,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<o.length;i+=20){let s=o.slice(i,i+20),c=new Map;for(;s.length;){r();let u=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(p=>({to:p,from:{in:Vt().filter(g=>g!==p)}})),...c.size?{and:[{or:s.map(p=>({taskId:p,position:{lt:c.get(p)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!u.length)break;let l=await a.query({select:["taskId","changedAt"],where:{or:u.map(p=>({taskId:p.taskId,position:p.position}))},limit:20});r(),s=[];for(let p of l.rows){let g=String(p.taskId);if(typeof p.changedAt=="string"&&p.changedAt)n.set(g,{changedAt:p.changedAt});else{let b=u.find(m=>m.taskId===g)?.position;if(typeof b!="number"||!Number.isInteger(b))throw new Error("Invalid completion position");c.set(g,b),s.push(g)}}}}return n}function Wo(e){return"historyLoaded"in e&&e.historyLoaded===!1}function Ke(e,o=""){return typeof e=="string"?e:o}function Br(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Hr(e){let o=Ke(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(o)?o:void 0}function _s(e){let o=Ke(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(o)?o:void 0}var Iu=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],gb=Object.fromEntries(Iu.map(e=>[e,{destination:"ask",recognize:!0}]));var Nu=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",Et]);function Lu(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function Ia(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let o=Lu(e);if(!o||Nu.has(o)||o.startsWith(`${Et}-`))return null;try{let n=new URL(e);if(["http","https"].includes(o)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(o)?"website":o==="mailto"?"email":["geo","maps"].includes(o)?"location":["tel","callto"].includes(o)?"phone":["sms","smsto"].includes(o)?"sms":["webcal","webcals"].includes(o)?"subscription":"app",value:e}}var Pu=16384,Ou=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Mu(e){if(!e||e.length>Pu||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let o=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(o),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function _u(e){try{let o=new URL(e);if(o.protocol!==`${$i}:`||o.hostname!==Ri)return null;let r=o.searchParams.get("realm")??"",n=Fo(o.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=o.searchParams.get("plugin")??"";if(!Ou.test(a))return null;let i=Mu(o.searchParams.get("state")??""),s=o.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let c=o.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function wo(e){let o=_u(e);return o?.kind==="file"?o.relPath:null}function zs(e){return Ia(e)!==null}function Bt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var zu=["normal","low","medium","high"];function Fs(e){return e===!0}function Fu(e){return typeof e=="string"&&zu.includes(e)?e:"normal"}function Wr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Gs(e){return Array.isArray(e)?e.filter(o=>Br(o)).map(o=>({startedAt:Ke(o.startedAt),endedAt:Ke(o.endedAt),activeMinutes:Wr(o.activeMinutes)??0,pauseMinutes:Wr(o.pauseMinutes)??0})).filter(o=>o.startedAt&&o.endedAt):[]}function Na(e){return Array.isArray(e)?e.filter(o=>Br(o)).map(o=>({from:Vr(o.from),to:Vr(o.to),changedAt:Ke(o.changedAt)})).filter(o=>!!o.from&&!!o.to&&!!o.changedAt&&o.from!==o.to):[]}function Gu(e){if(typeof e!="string")return;let o=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(o)?o:void 0}function qr(e){if(typeof e!="string")return;let o=e.trim();if(o)return wo(o)||zs(o)?o:void 0}function $u(e){let o=Array.isArray(e)?e:[],r=[...new Set(o.map(n=>qr(n)).filter(n=>!!n))];return r.length?r:void 0}function Ru(e){if(!Array.isArray(e))return;let o=[...new Set(e.map(r=>$t(r)).filter(r=>!!r))];return o.length?o:void 0}function ju(e){if(!Br(e))return;let o=Ke(e.name).trim();if(!o)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:o,lng:r,lat:n}:{name:o}}function qo(e){let o=new Date().toISOString(),r=Ke(e.id,Bt("todo")),n=Ke(e.createdAt,o),a=Gs(e.history),i=Na(e.statusHistory),s=Vr(ut(e.customStatus)?e.customStatus:e.status);return{id:r,title:Ke(e.title).trim(),completed:Fs(e.completed)||s==="completed"||s==="canceled",priority:Fu(e.priority),dueDate:Ke(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:Hr(e.reminderTime),startTime:Hr(e.startTime),endTime:Hr(e.endTime),color:_s(e.color),note:Ke(e.note),tags:Array.isArray(e.tags)?e.tags.filter(c=>typeof c=="string"&&!!c.trim()).map(c=>c.trim()):[],estimatedMinutes:Wr(e.estimatedMinutes),actualMinutes:Wr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:$t(e.filePath),group:Ke(e.group).trim()||void 0,flagged:Fs(e.flagged)||void 0,urls:$u(e.urls),attachments:Ru(e.attachments),location:ju(e.location),remindAt:Gu(e.remindAt),reminderFiredAt:Ke(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Ke(e.updatedAt,n)}}function La(e,o,r){let n=(l,p=!1)=>{let g=new Map;for(let b of l){let m=g.get(b.taskId);m?m.push(b):g.set(b.taskId,[b])}if(p)for(let b of g.values())b.sort((m,k)=>Number(m.position)-Number(k.position));return g},a=n(o.tags),i=n(o.links,!0),s=n(o.attachments,!0),c=n(o.sessions,!0),u=n(o.statusHistory,!0);return e.map(l=>qo({...l,tags:(a.get(l.id)??[]).map(p=>p.tag),urls:(i.get(l.id)??[]).map(p=>p.url),attachments:(s.get(l.id)??[]).map(p=>p.path),history:c.get(l.id)??[],statusHistory:u.get(l.id)??[]})).map(l=>({...l,group:$r(l.group,r)??l.group})).filter(l=>l.title)}var Yr="todo.tasks",_a="todo.task_tags",za="todo.task_links",Fa="todo.task_attachments",Ks="todo.focus_sessions",vo="todo.status_history",Yo=[Yr,_a,za,Fa],Ku=[...Yo,Ks,vo],Ga=[...Yo,vo];function Uu(e,o){let r=Pe(),n=e.map(s=>r.api.data.dataset(s).subscribe(o)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function xo(e){return Uu(Ga,e)}function Us(e){let o=Yo.map(r=>f.data.dataset(r).subscribe(e));return()=>o.forEach(r=>r())}async function It(e,o,r=Pe()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:o,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function Vu(e,o=!0,r=!0,n=Pe()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?It(_a,a,n):[],It(za,a,n),It(Fa,a,n),o?It(Ks,a,n):[],o?It(vo,a,n):[]]),[s,c,u,l,p]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:s,links:c,attachments:u,sessions:l,statusHistory:p}}async function Ma(e,o,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([It(Yr,n,e),Vu(r,o,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),La(a.value,i.value,Ut(e.api.getState().groups))}var $s=new WeakMap;function Xr(e,o,r,n,a){try{e.assertActive()}catch(u){return Promise.reject(u)}let i=$s.get(e);i||(i=new Map,$s.set(e,i));let s=i.get(o);if(!s){s={revision:0,pending:new Map};let u=s,l=r.map(p=>e.api.data.dataset(p).subscribe(()=>{u.revision++}));e.onDispose(()=>{l.forEach(p=>p()),i.clear()}),i.set(o,s)}let c=s.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let u=s.revision,l=await a();if(e.assertActive(),u===s.revision)return l}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,c)),c}function Vs(e,o){let r=Pe();return Xr(r,e?"full":"calendar",e?Ku:Yo,o??"",()=>Ma(r,e,o))}var Bs=200;function Bu(e,o){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Bs)return null;let n=o===Yr?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var Pa=new WeakMap;function Hu(e){let o=Pa.get(e);if(o)return o;let r={dirty:new Set,full:!0},n=Ga.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=i?Bu(i,a):null;if(!s){r.full=!0,r.dirty.clear();return}for(let c of s)r.dirty.add(c);r.dirty.size>Bs&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Pa.delete(e)}),Pa.set(e,r),o=r,o}async function Rs(e,o){let r;if(!o)r=await Ma(e,!1);else{r=[];for(let a=0;a<o.length;a+=100)r.push(...await Ma(e,!1,o.slice(a,a+100)))}let n=await Ms(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function Je(e=Pe()){let o=Hu(e);return Xr(e,"list",Ga,"",async()=>{let r=JSON.stringify(Ut(e.api.getState().groups));if(o.full||!o.value||o.groups!==r){o.full=!1,o.dirty.clear();try{o.value=await Rs(e),o.groups=r}catch(u){throw o.full=!0,u}return o.value}if(!o.dirty.size)return o.value;let n=[...o.dirty];o.dirty.clear();let a;try{a=await Rs(e,n)}catch(u){for(let l of n)o.dirty.add(l);throw u}let i=new Map(a.map(u=>[u.id,u])),s=new Set(n),c=[];for(let u of o.value)if(!s.has(u.id))c.push(u);else{let l=i.get(u.id);l&&(c.push(l),i.delete(u.id))}return c.push(...i.values()),o.value=c,c})}var js=new WeakMap,Wu=0;function qu(e,o){let r=js.get(e);r||(r=new Map,js.set(e,r));let n=r.get(o);if(!n){let s={users:0,key:String(++Wu),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(o,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(o))}}}function Yu(e,o,r){return Xr(e,"statusHistory",[vo],r.key,async()=>{let n=await It(vo,{taskId:o},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Na(n)})}function Hs(e){let o=Pe(),[r,n]=t.useState(null);return t.useEffect(()=>{let{reader:a,release:i}=qu(o,e),s=0,c=!1,u=()=>{let b=++s;Yu(o,e,a).then(m=>{!c&&b===s&&n({scope:o,id:e,history:m})}).catch(()=>{})},l=o.api.data.dataset(vo).subscribe(b=>{(!b.keys||b.keys.some(m=>m.taskId===e))&&u()}),p=()=>{c=!0,l(),i()},g=o.onDispose(p);return u(),()=>{g(),p()}},[e,o]),r?.id===e&&r.scope===o?r.history:[]}function Nt(){return Vs(!0)}async function Qe(e){return e?(await Vs(!0,e))[0]??null:null}function Ws(e,o,r,n){let a=Pe();return Xr(a,"calendarPage",Yo,JSON.stringify([e,o,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(Yr).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${o}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async g=>{let b=[];for(let m=0;m<i.rows.length;m+=100)b.push(...await It(g,{taskId:{in:i.rows.slice(m,m+100).map(k=>String(k.id))}},a));return b},c=await Promise.allSettled([s(_a),s(za),s(Fa)]),[u,l,p]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:La(i.rows,{tags:u,links:l,attachments:p,sessions:[],statusHistory:[]},Ut(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function Ht(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function $a(e,o,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:o,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??o:null}catch{return null}}async function Oa(e,o,r,n){return await $a(e,o,r,n)!==null}function Ra(e,o,r){return $a(e,o,r)}async function Xo(e,o){return await $a(e,o,void 0,void 0,!0)!==null}async function Wt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function Zr(e){if(!e.id||!e.title.trim())return!1;let o=await Ht(e);return o&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Wt(e.id)}),redo:async()=>({ok:await Ht(e)})}),o}async function Lt(e,o,r,n){if(!e||!o.title.trim())return!1;let a=await Qe(e),i=Wo(o)?{...o,history:o.history===void 0?a?.history:o.history}:o;Wo(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await Oa(e,i,r,n);return s&&a&&f.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Oa(e,a)}),redo:async()=>({ok:await Oa(e,i)})}),s}async function Jr(e){let o=await Qe(e),r=await Wt(e);return r&&o&&f.undo.push({label:d("todo.undo.delete",{title:o.title}),undo:async()=>({ok:await Ht(o)}),redo:async()=>({ok:await Wt(e)})}),r}async function ft(e,o){return await f.ui.confirm({title:d("todo.delete.title"),message:t.createElement("span",null,t.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await o(e.id),!0)}async function ja(e,o){let r=await Qe(e);return r?Lt(e,{...r,...Ne(o),updatedAt:new Date().toISOString()}):!1}async function qs(e,o){let r=await Qe(e);return r?Lt(e,{...r,group:o,updatedAt:new Date().toISOString()}):!1}function Xu(e){let o=[],r=e.replace(/#(\S+)/g,(n,a)=>(o.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:o,text:r}}function qt(e){let o=Xu(e);return!o.tags.length&&!o.text?()=>!0:(r,...n)=>{for(let a of o.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!o.text||n.some(a=>a.toLowerCase().includes(o.text))}}function xe(e=[]){return e.map(o=>$r(o.name,e)??o.name)}var Ys=e=>[e];function Xs(e){Ys=e}function it(e){return new Set(e.flatMap(o=>Ys(o)).map(o=>X(o)))}var Ka="localGroups",Qr=200,Jo=60,Zo=(e,o)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,o):"";function Zs(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ua(e,o=[]){if(!Array.isArray(e))return[];let r=new Set(o.flatMap(s=>[s.name,...s.aliases??[]]).map(X)),n=new Set(o.map(s=>s.id)),a=new Set,i=[];for(let s of e){if(!s||typeof s!="object")continue;let c=s,u=Zo(c.id,64),l=Zo(c.name,Jo),p=Zo(c.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(u)||a.has(u)||!l||r.has(X(l))||!p)continue;let g=Array.isArray(c.aliases)?[...new Set(c.aliases.map(m=>Zo(m,Jo)).filter(m=>m&&X(m)!==X(l)&&!r.has(X(m))))].slice(0,20):[],b=typeof c.parent=="string"&&n.has(c.parent)?c.parent:void 0;if(a.add(u),r.add(X(l)),g.forEach(m=>r.add(X(m))),i.push({id:u,name:l,color:p,...g.length?{aliases:g}:{},...b?{parent:b}:{}}),i.length>=Qr)break}return i}function Js(e,o){let r=Zo(o,Jo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>X(a)!==X(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Qs(e,o){return[...e,...o.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}function ed(e,o,r){let n=o.find(a=>X(a.name)===X(e)||(a.aliases??[]).some(i=>X(i)===X(e)));return n?[e,...r.filter(a=>a.parent===n.id).flatMap(a=>[a.name,...a.aliases??[]])]:[e]}function en(){return Ut(f.getState().groups)}function Yt(){return Ua(f?.settings.get()[Ka],en())}async function td(e){await f.settings.set(Ka,Ua(e,en()))}function at(){return Qs(en(),Yt())}Xs(e=>ed(e,en(),Yt()));function tn(e){let o=f.subscribe(e),r=f.settings.subscribe(e);return()=>{o(),r()}}function We(){let[e,o]=t.useState(at);return t.useEffect(()=>tn(()=>o(at())),[]),e}function od(){let[e,o]=t.useState(Yt);return t.useEffect(()=>tn(()=>o(Yt())),[]),e}function rd(){let e=Pe(),o=!1,r=()=>{Je(e).then(a=>{if(e.assertActive(),o)return;let i=new Set(Yt().flatMap(s=>[s.name,...s.aliases??[]]).map(X));e.api.workspace.reportGroupUsage(Ea(a.map(s=>s.group).filter(s=>!s||!i.has(X(s)))))}).catch(()=>{})};r();let n=xo(r);return()=>{o=!0,n(),e.api.workspace.reportGroupUsage({})}}function Zu(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Ju(e){let o=e.toLowerCase();return Zu(o)?o:"yyyy-mm-dd"}function nd(e,o){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Ju(o).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Qu="ddd d mmm",ep=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function tp(e){let o=e.trim().toLowerCase().match(/[a-z]+/g);if(!o||o.some(s=>!ep.has(s)))return!1;let r=o.filter(s=>s==="d"||s==="dd"),n=o.filter(s=>s==="ddd"||s==="dddd"),a=o.filter(s=>s==="mmm"||s==="mmmm"),i=o.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(o).size===o.length}function op(e){let o=e.trim().toLowerCase().replace(/\s+/g," ");return tp(o)?o:Qu}var Qo=new Map;function rp(e,o,r){let n=`${r??""}:${o}`,a=Qo.get(n);return a||(a=new Intl.DateTimeFormat(r,o[0]==="d"?{weekday:o==="ddd"?"short":"long"}:{month:o==="mmm"?"short":"long"}),Qo.size>=64&&Qo.delete(Qo.keys().next().value),Qo.set(n,a)),a.format(e)}function ad(e,o,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,c=new Date(Number(a),Number(i)-1,Number(s),12);return op(o).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,u=>u==="d"?String(Number(s)):u==="dd"?s:u==="yyyy"?a:rp(c,u,r))}var qe=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var er={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},on={high:3,medium:2,low:1,normal:0},id=new Intl.Collator(void 0,{sensitivity:"base"});function Xt(e,o){return id.compare(e.title,o.title)}function np(e,o,r){if(r==="name")return Xt(e,o);if(r==="priority"){let i=on[o.priority]-on[e.priority];return i!==0?i:gt(e,o)}if(r==="flagged"){let i=+!!o.flagged-+!!e.flagged;return i!==0?i:gt(e,o)}if(r==="due"){let i=e.dueDate||"",s=o.dueDate||"";if(!i&&!s)return gt(e,o);if(!i)return-1;if(!s)return 1;let c=i.localeCompare(s);return c!==0?c:gt(e,o)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(o[n]);return a!==0?a:Xt(e,o)}function Va(e,o){let r=on[o.priority]-on[e.priority];return r!==0?r:Xt(e,o)}function gt(e,o){let r=e.startTime||"",n=o.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Va(e,o)}function sd(e,o,r){let n=new Map(e.map(i=>[i,o(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,s)=>{let c=n.get(i),u=n.get(s);if(a(c)!==a(u))return a(c)?1:-1;let l=0;return!a(c)&&!a(u)&&(l=typeof c=="number"&&typeof u=="number"?c-u:id.compare(String(c),String(u))),l!==0?r==="asc"?l:-l:Xt(i,s)})}function ko(e,o,r){return[...e].sort((n,a)=>{if(o==="due"&&r==="desc"){let s=n.dueDate||"",c=a.dueDate||"";if(!s&&!c)return gt(n,a);if(!s)return-1;if(!c)return 1;let u=c.localeCompare(s);return u!==0?u:gt(n,a)}let i=np(n,a,o);return r==="asc"?i:-i})}function Ve(e,o="dd-mm-yyyy"){return e?nd(e,o):""}function be(e){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function Ba(e){let[o,r,n]=e.split("-").map(i=>parseInt(i,10));if(!o||!r||!n)return null;let a=new Date(o,r-1,n);return a.setHours(0,0,0,0),a}function Pt(e,o){let r=Ba(e);return r?(r.setDate(r.getDate()+o),be(r)):e}function rn(e,o,r="ddd d mmm"){return ad(e.slice(0,10),r,o)}function st(e,o,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===o)return r.today;let[s,c,u]=i.split("-").map(Number),[l,p,g]=o.split("-").map(Number);if(!s||!c||!u||!l||!p||!g)return Ve(e,a);let b=new Date(s,c-1,u),m=new Date(l,p-1,g),k=Math.round((b.getTime()-m.getTime())/864e5);return k===1?r.tomorrow:k===-1?r.yesterday:k>1&&k<7?b.toLocaleDateString(n,{weekday:"long"}):Ve(e,a)}var ny=new Date(2023,0,1,12);var ap={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function tr(e){return ap[e??""]??1}function dd(e){let o=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=o.getUTCDay()||7;o.setUTCDate(o.getUTCDate()+4-r);let n=new Date(Date.UTC(o.getUTCFullYear(),0,1));return Math.ceil(((o.getTime()-n.getTime())/864e5+1)/7)}function ip(e,o){return(e.getDay()-o+7)%7}function ld(e,o){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-ip(e,o))}function Zt(e){let[o,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(o,(r||1)-1,n||1)}var or=["overdue","today","upcoming","someday","completed"],cd={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function dt(e=new Date){let o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}function nn(e,o=dt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<o?r.overdue.push(a):i===o?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||gt(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(gt),r.someday.sort(Va),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Xt(a,i)),r}function Ha(e){return Wo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Wa(e){let o=new Date(e);return Number.isNaN(o.getTime())?e.slice(0,10):dt(o)}function ud(e){let o=new Map(e.map(a=>[a,Ha(a)])),r=[...e].sort((a,i)=>o.get(i).localeCompare(o.get(a))||Xt(a,i)),n=new Map;for(let a of r){let i=Wa(o.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function qa(e,o,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?o==="monthly"?c.slice(0,7):o==="daily"?c:dt(ld(Zt(c),r)):"",s=new Map;for(let c of e){let u=i(a(c)),l=s.get(u);l?l.push(c):s.set(u,[c])}return[...s.entries()].sort(([c],[u])=>c===""?-1:u===""?1:u.localeCompare(c)).map(([c,u])=>({key:c,kind:c?o:"none",todos:u}))}function an(e,o=dt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,c,u)=>{let l=u.toLowerCase();if(l==="today")r=o;else if(l==="tomorrow"){let p=new Date(`${o}T00:00:00`);p.setDate(p.getDate()+1),r=dt(p)}else r=u;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,c,u)=>(n=u.length>=3?"high":u.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var Be={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},sp={open:Be,get:Be,"edit-fields":Be,add:Be,complete:Be,done:Be,reopen:Be,cancel:Be,pause:Be,status:Be,edit:Be,"open-page":{type:"null"},search:{type:"array",items:Be,maxItems:20},list:{type:"array",items:Be,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:Be,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Le=e=>typeof e=="string"?e:"",hd=e=>Le(e?.query).trim(),ln=["normal","low","medium","high"];function To(){return new Date().toISOString()}function pd(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function md(e){let o=e.trim();if(!o)return;let r=Uo(at(),o);if(!r)throw new Error(`Unknown group "${o}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function fd(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return pd();if(e.toLowerCase()==="tomorrow"){let o=new Date;return o.setDate(o.getDate()+1),pd(o)}return e}function dp(e){return typeof e=="string"?e.split(",").map(o=>o.trim()).filter(Boolean):[]}function sn(e){let o=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${o} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Ya(e,o){let r=o.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var dn={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let o=hd(e);if(!o)throw new Error("Expected a todo id or title.");return{query:o}},fromCli:e=>({query:e.join(" ").trim()})};async function rr(e,o,r){let n=Ya(await Nt(),e),a=o(n),i=await Ra(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await Xo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Xo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function gd(e){return rr(e,o=>({...o,completed:!0,status:"completed",updatedAt:To()}),o=>`Complete \u201C${o.title}\u201D`)}var Jt={type:"string"},bd={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Jt])),priority:{type:"string",enum:ln},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Jt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Jt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function lp(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let o=e;for(let[r,n]of Object.entries(o)){if(!(r in bd.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof o.title=="string"&&!o.title.trim())throw new Error("A task title cannot be empty.");if(o.priority!==void 0&&!ln.includes(o.priority))throw new Error("Invalid priority.");if(o.status!==void 0&&!ho().includes(o.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(o[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(o[r])))throw new Error("Invalid task time.");if(o.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(o.remindAt)))throw new Error("Invalid reminder date.");return o}async function cp(e,o,r){let a=(await Nt()).find(c=>c.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(o.group&&!xe(at()).includes(o.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=qo({...a,...o,...o.status?Ne(o.status):o.completed!==void 0?Ne(o.completed?"completed":"open"):{},...o.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:To()});if(o.filePath&&i.filePath!==o.filePath)throw new Error("Invalid task file path.");for(let c of["urls","attachments"])if(o[c]?.some(u=>!i[c]?.includes(u)))throw new Error(`Invalid task ${c}.`);let s=await Ra(e,i,a.updatedAt);if(!s)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await Xo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Xo(e,s))throw new Error("Could not reapply the task edit.")}}}}async function ht(e){let o=e??{},r=o.id??o.query,n={groups:at(),statuses:ho()};if(!r)return n;let a=await Nt(),i=Ya(a,r);return{...n,records:[i]}}function yd(e){let o=n=>{let a=sp[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[o({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Jt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=Le(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Qe(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),ze().request(n,"edit"),i}}),o({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Jt},required:["id"],additionalProperties:!1},parse:n=>{let a=Le(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Qe(n);if(!a)throw new Error("The task no longer exists.");return a}}),o({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Jt,values:bd,expectedUpdatedAt:Jt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=Le(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:lp(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>cp(n,a,i),revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),o({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:Le(a.due),priority:Le(a.priority),status:Le(a.status),note:Le(a.note),group:Le(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:c,group:u})=>{let l=ho();if(s&&!l.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${l.join(", ")}`);let p=qo({title:n,priority:i||"normal",status:s||void 0,dueDate:fd(a),note:c,group:md(u)});if(!await Ht(p))throw new Error("Failed to add todo.");return{value:p,revert:{label:`Add todo \u201C${p.title}\u201D`,run:async()=>{await Wt(p.id)},reapply:async()=>{await Ht(p)}}}},formatCli:n=>`Added: ${sn(n)}`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:dn,run:({query:n})=>gd(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:dn,run:({query:n})=>gd(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=hd(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=qt(n);return(await Nt()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(sn).join(`
`):"No matching todos."}),o({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:dn,run:({query:n})=>rr(n,a=>({...a,completed:!1,status:"open",updatedAt:To()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>ht(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>o({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:dn,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!Ls(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return rr(a,s=>({...s,...Ne(i),updatedAt:To()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>ht(a),preview:a=>({changes:a})})),o({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim(),s=Le(a.status),c=ho();if(!i||!c.includes(s))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>rr(n,i=>({...i,...Ne(a),updatedAt:To()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim(),s=Le(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!ln.includes(s))throw new Error(`Invalid priority "${s}". One of: ${ln.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?dp(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:c,tags:u,group:l})=>rr(n,p=>({...p,title:a??p.title,priority:i??p.priority,dueDate:s===void 0?p.dueDate:fd(s),note:c??p.note,tags:u??p.tags,group:l===void 0?p.group:md(l),updatedAt:To()}),p=>`Edit \u201C${p.title}\u201D`),formatCli:n=>`Edited: ${sn(n)}`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=Le(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await Nt(),s=Ya(i,n);if(!a)return{value:{deleted:!1,todo:s,deletedCount:0},revert:null};if(!await Wt(s.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:s,deletedCount:1},revert:{label:`Delete \u201C${s.title}\u201D`,run:async()=>{await Ht(s)},reapply:async()=>{await Wt(s.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>ht(n),preview:n=>({changes:n})}),o({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:Le(a.section),q:Le(a.q)}},fromCli:(n,a)=>({section:Le(a.section),q:Le(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await Nt();if(a){let s=qt(a);i=i.filter(c=>s(c.tags,c.title,c.note))}return n&&or.includes(n)?nn(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(sn).join(`
`)}),o({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Nt(),a=at();return xe(a).map(i=>({name:i,count:n.filter(s=>X(s.group??"")===X(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var wd={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var pp=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,mp=/^-\s+(.*)$/,fp=/^[A-Za-z][\w+.-]*:\/\//;function vd(e){let o={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(mp);if(i){r?o.lists[r].push(i[1].trim()):o.bare===null&&(o.bare=i[1].trim());continue}let s=fp.test(a)?null:a.match(pp);if(s){let c=s[1].trim().toLowerCase(),u=s[2].trim();u===""?(r=c,o.lists[c]=o.lists[c]??[]):(r=null,o.values[c]=u);continue}r=null,o.bare===null&&(o.bare=a)}return o}function xd(e,o,r=500){let n=e.values[o];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Xa="notes-todo-fence-styles";function gp(){if(document.getElementById(Xa))return;let e=document.createElement("style");e.id=Xa,e.textContent=`
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
`,document.head.appendChild(e)}var kd=()=>{let e=new Date,o=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${o(e.getMonth()+1)}-${o(e.getDate())}`},hp=e=>{let o=new Date;o.setDate(o.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${o.getFullYear()}-${r(o.getMonth()+1)}-${r(o.getDate())}`};function bp(e,o){let r=kd(),n=hp(7),a=o.tag?o.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(o.status==="open"&&i.completed||o.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||o.due==="today"&&i.dueDate!==r||o.due==="week"&&(!i.dueDate||i.dueDate>n)||o.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,o.limit)}var yp=({code:e})=>{let[o,r]=t.useState(null);t.useEffect(()=>{let p=Pe(),g=!0,b=()=>{Je(p).then(k=>{p.assertActive(),g&&r(k)}).catch(()=>{})};b();let m=xo(b);return()=>{g=!1,m()}},[]);let n=vd(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:xd(n,"limit",100)??10};if(!o)return t.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let c=bp(o,s),u=kd(),l=p=>{let g={...p,completed:!p.completed,status:p.completed?"open":"completed"};r(b=>b&&b.map(m=>m.id===p.id?g:m)),Lt(p.id,g)};return t.createElement(t.Fragment,null,t.createElement("div",{className:"todo-fence-head",onClick:p=>f.workspace.openMainTab({newTab:f.ui.hasModKey(p)}),title:d("auto.edbe7ad07b4a")},t.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),t.createElement("span",{className:"c"},c.length,s.due?` \xB7 ${s.due}`:"")),c.length===0&&t.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),c.map(p=>t.createElement("div",{key:p.id,className:`todo-fence-row ${p.completed?"done":""}`},t.createElement("input",{type:"checkbox",checked:p.completed,onChange:()=>l(p),"aria-label":p.title}),p.priority!=="normal"&&t.createElement("span",{className:`pri pri-${p.priority}`},qe.find(g=>g.id===p.priority)?.symbol),t.createElement("span",{className:"t"},p.title),p.tags.slice(0,2).map(g=>t.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),p.dueDate&&t.createElement("span",{className:`due ${!p.completed&&p.dueDate<u?"overdue":""}`},p.dueDate))))};function Td(){let e=f.markdown.registerCodeBlockRenderer("todo",(o,r)=>(gp(),r.classList.add("todo-fence"),f.ui.renderReact(r,t.createElement(yp,{code:o}))),{examples:wd.todo});return()=>{e(),document.getElementById(Xa)?.remove()}}var Ja=".valley/assets/icons/todo-icon",wp=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),vp=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function xp(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let o=new DOMParser().parseFromString(e,"image/svg+xml"),r=o.documentElement;if(r.localName!=="svg"||o.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!wp.has(n.tagName)){n.remove();continue}for(let a of[...n.attributes])(!vp.has(a.name)||/url\s*\(|javascript:|expression\s*\(/i.test(a.value))&&n.removeAttribute(a.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function kp(e,o){let n=new DOMParser().parseFromString(o,"image/svg+xml").documentElement;for(let c of n.querySelectorAll("*"))for(let u of["stroke","fill"]){let l=c.getAttribute(u);l&&l!=="none"&&c.setAttribute(u,"#000")}let a=n.getAttribute("fill")==="none"?"none":"#000",i=[...n.childNodes].map(c=>new XMLSerializer().serializeToString(c)).join(""),s=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${a}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${i}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${s})"/></svg>`}function Qa(){return f.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function Za(){let e=Qa();return e.pending||(e.pending=f.backend.call("taskIcons",{}).then(o=>{let r={};for(let[n,a]of Object.entries(o?.icons??{})){let i=xp(a);i&&(r[n]=kp(n,i))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function Sd(e){return e?Qa().icons[e]:void 0}function cn(){let e=Qa();return t.useEffect(()=>{e.loaded||Za()},[e]),t.useSyncExternalStore(t.useCallback(o=>(e.listeners.add(o),()=>{e.listeners.delete(o)}),[e]),()=>e.revision),e.icons}function Ad(){Za();let e,o=f.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${Ja}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{Za()},150))});return()=>{window.clearTimeout(e),o()}}function Ed(e){let r=f?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var Z=e=>t.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),Ot=e=>t.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?t.createElement("title",null,e.title):null,e.children),Tp=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Sp=e=>t.createElement(Ot,{...e,viewBox:"2 2 20 20"},t.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),t.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),Ap=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Ep=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Dp=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Cp=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Ip=e=>t.createElement(Ot,{...e},t.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Np={inprogress:Ap,waiting:Ep,onhold:Sp,delegated:Dp,deferred:Cp,completed:Ip,canceled:Tp},ke=({status:e,dotCls:o,color:r})=>{let n=r?{color:r}:void 0,a=Sd(Ed(e??"open"));if(a)return t.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${o}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:a}});let i=e?Np[e]:void 0;return i?t.createElement(i,{className:`todo-status-menu-svg ${o}`,style:n}):t.createElement("span",{className:`todo-status-menu-dot ${o}`,style:n})};var Qt=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M12 5v14M5 12h14"})),bt=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"11",cy:"11",r:"8"}),t.createElement("path",{d:"m21 21-4.3-4.3"})),Ee=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),nr=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"9",cy:"6",r:"1"}),t.createElement("circle",{cx:"15",cy:"6",r:"1"}),t.createElement("circle",{cx:"9",cy:"12",r:"1"}),t.createElement("circle",{cx:"15",cy:"12",r:"1"}),t.createElement("circle",{cx:"9",cy:"18",r:"1"}),t.createElement("circle",{cx:"15",cy:"18",r:"1"})),Dd=e=>t.createElement(Z,{...e},t.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),t.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Cd=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"1"}),t.createElement("circle",{cx:"19",cy:"12",r:"1"}),t.createElement("circle",{cx:"5",cy:"12",r:"1"})),Id=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 11v5M12 8h.01"})),un=e=>t.createElement(Z,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),t.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),pn=e=>t.createElement(Z,{...e},t.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),t.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),ar=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),ir=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Nd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),t.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),Ld=e=>t.createElement(Z,{...e},t.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),t.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),Pd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),mn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m6 9 6 6 6-6"})),Oe=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),t.createElement("path",{d:"M4 22v-7"})),Od=e=>t.createElement(Ot,{...e,viewBox:"0 0 192 512"},t.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Md=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M12 20h9"}),t.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),fn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),t.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),Ye=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"m8 12 3 3 5-6"})),yt=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),t.createElement("path",{d:"M10 11v6M14 11v6"})),_d=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),t.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),zd=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"9"}),t.createElement("path",{d:"M12 7v5l3 2"})),eo=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),to=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),t.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Fd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),t.createElement("circle",{cx:"12",cy:"12",r:"3"})),gn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),t.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),t.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Gd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),et=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),t.createElement("circle",{cx:"12",cy:"10",r:"3"})),Mt=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),wt=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),t.createElement("path",{d:"M14 2v6h6"})),hn=e=>t.createElement(Z,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),t.createElement("circle",{cx:"9",cy:"9",r:"2"}),t.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),bn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M9 18V5l12-2v13"}),t.createElement("circle",{cx:"6",cy:"18",r:"3"}),t.createElement("circle",{cx:"18",cy:"16",r:"3"})),yn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m22 8-6 4 6 4V8z"}),t.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),sr=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"18",cy:"18",r:"4"}),t.createElement("path",{d:"M18 16.5V18l1 1"})),dr=e=>t.createElement(Z,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),lt=e=>t.createElement(Z,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),t.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),wn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),t.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),lr=e=>t.createElement(Z,{...e},t.createElement("circle",{cx:"12",cy:"12",r:"10"}),t.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),vn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 18h18"}),t.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),t.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),t.createElement("path",{d:"M4 21v-3M20 21v-3"})),ei=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),ti=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),oi=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),$d=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),xn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m15 18-6-6 6-6"})),kn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m9 18 6-6-6-6"})),Rd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),jd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"}));var Kd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Ud=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M5 12h14"})),Vd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),Tn=e=>t.createElement(Z,{...e},t.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),t.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),Sn=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),Bd=e=>t.createElement(Z,{...e},t.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function cr(e){let o=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:o})}var So=({value:e,onChange:o,disabled:r=!1,autoFocus:n=!1})=>{let a=t.useRef(null),[i,s]=t.useState([]),[c,u]=t.useState("idle"),[l,p]=t.useState(-1),[g,b]=t.useState(!1),m=t.useRef(null),k=t.useRef(0),T=t.useRef(!1);t.useEffect(()=>{a.current&&document.activeElement!==a.current&&(a.current.value=e?.name??"")},[e?.name]),t.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]),t.useEffect(()=>{n&&a.current?.focus()},[n]);let F=x=>{m.current!==null&&window.clearTimeout(m.current);let w=++k.current;if(x.trim().length<2){s([]),u("idle"),b(!1);return}b(!0),u("searching"),m.current=window.setTimeout(()=>{f.resources.search({query:x.trim(),kinds:["place"],limit:8}).then(M=>{w===k.current&&(s(M),p(M.length?0:-1),u("done"))},()=>{w===k.current&&(s([]),p(-1),u("failed"))})},250)},_=x=>{let w=Number(x.metadata?.longitude),M=Number(x.metadata?.latitude),Y=(x.value??x.label).trim();T.current=!0,k.current++,a.current&&(a.current.value=Y),b(!1),s([]),o({name:Y,...Number.isFinite(w)&&Number.isFinite(M)?{lng:w,lat:M}:{}})},P=()=>{let x=a.current?.value.trim()??"";if(k.current++,b(!1),T.current){T.current=!1;return}x!==(e?.name??"")&&o(x?{name:x}:void 0)};return t.createElement("div",{className:"todo-location"},t.createElement("div",{className:"todo-location-row"},t.createElement("div",{className:"todo-location-field"},t.createElement(bt,{className:"todo-location-field-icon"}),t.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":g,disabled:r,autoComplete:"off",spellCheck:!1,onChange:x=>{T.current=!1,F(x.currentTarget.value)},onFocus:x=>{x.currentTarget.value.trim().length>=2&&i.length&&b(!0)},onBlur:P,onKeyDown:x=>{x.nativeEvent.isComposing||(x.key==="ArrowDown"&&i.length?(x.preventDefault(),b(!0),p(w=>(w+1)%i.length)):x.key==="ArrowUp"&&i.length?(x.preventDefault(),p(w=>w<=0?i.length-1:w-1)):x.key==="Enter"?(x.preventDefault(),g&&i[l]?_(i[l]):P()):x.key==="Escape"&&g&&(x.preventDefault(),x.stopPropagation(),k.current++,b(!1)))}})),e&&t.createElement(t.Fragment,null,t.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>cr(e)},t.createElement(Gd,null)),t.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:x=>x.preventDefault(),onClick:()=>{k.current++,a.current&&(a.current.value=""),s([]),b(!1),o(void 0)}},t.createElement(Ee,null)))),g&&t.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},c==="searching"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),c==="failed"&&t.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),i.map((x,w)=>t.createElement("li",{key:x.id,role:"option","aria-selected":w===l},t.createElement("button",{type:"button",className:"todo-location-hit"+(w===l?" is-active":""),onMouseDown:M=>M.preventDefault(),onMouseEnter:()=>p(w),onClick:()=>_(x)},t.createElement("span",{className:"todo-location-hit-name"},t.createElement(et,null),x.label),x.description&&t.createElement("span",{className:"todo-location-hit-context"},x.description))))))};function Lp(){try{return tr(f?.getState().weekStart)}catch{return 1}}function Hd(e,o=Lp()){let r=Zt(e).getDay();return Pt(e,6-(r-o+7)%7)}var Me={kind:"smart",id:"all"},An=[{id:"scheduled",labelKey:"todo.view.scheduled",color:we("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:we("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:we("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:we("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:we("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:we("green"),dated:!1}],ur=An.map(e=>e.id);function ri(e){let o=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(o.order)?o.order:[])typeof l=="string"&&ur.includes(l)&&!r.includes(l)&&r.push(l);ur.forEach((l,p)=>{if(r.includes(l))return;let g=ur.slice(0,p).reverse().find(b=>r.includes(b));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(o.hidden)?o.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=o.colors&&typeof o.colors=="object"?o.colors:{},s={};for(let l of ur){let p=i[l];typeof p=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(p)&&(s[l]=p)}let c=o.textColors&&typeof o.textColors=="object"?o.textColors:{},u={};for(let l of ur){let p=c[l];(p==="white"||p==="black")&&(u[l]=p)}return{order:r,hidden:a,colors:s,textColors:u}}function Wd(e){return e.order.filter(o=>!e.hidden.includes(o)).map(o=>vt(o,e))}function vt(e,o){let r=An.find(i=>i.id===e)??An.find(i=>i.id==="all"),n=o?.colors[r.id],a=o?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function pr(e,o){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":o(e.color)}function Pp(e,o,r=be(new Date)){if(o.kind==="groups")return e.group?it(o.names).has(X(e.group)):o.includeUngrouped===!0;if(o.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===o.name.toLowerCase());if(o.kind==="nogroup")return!e.group;switch(o.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=Hd(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function En(e,o,r,n=be(new Date)){return Pp(e,o,n)?o.kind==="smart"&&o.id==="completed"?e.completed:r||!e.completed:!1}function qd(e,o=be(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=Hd(o);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=o&&r.today++,i<=n&&r.week++)}return r}function Dn(e,o){let r=o===null?null:it([o]);return e.filter(n=>!n.completed&&(r===null?!n.group:r.has(X(n.group??"")))).length}function tt(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Op=An.map(e=>e.id);function mr(e){if(typeof e!="string")return Me;let o=e.trim();if(o==="nogroup")return{kind:"nogroup"};if(o.startsWith("tag:")){let r=o.slice(4).trim();return r?{kind:"tag",name:r}:Me}if(o.startsWith("group:")){let r=o.slice(6).trim();return r?{kind:"groups",names:[r]}:Me}if(o.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(o.slice(7)));if(!r||typeof r!="object")return Me;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Me}catch{return Me}return Op.includes(o)?{kind:"smart",id:o}:o.startsWith("due:")?{kind:"smart",id:o==="due:today"?"today":"scheduled"}:Me}function Cn(e,o){return tt(e)===tt(o)}var Mp=["group","notes","status","location","tags"],_p="todo.view",zp="todo.showCompleted",Fp="todo.statusFilter",Gp="todo.search",$p="todo.pageSort",si="panelChip",Xd="pageShowCompleted",ni="statusFilter",di="dateBreakdown",Zd="smartLists",fr="pageSearch",Jd="pageSort",Rp={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Qd=["due","priority","flagged","updated","created","name"];function Yd(e){let o=e&&typeof e=="object"?e:{};return{compact:o.compact!==!1,sortField:Qd.includes(o.sortField)?o.sortField:"due",sortDir:o.sortDir==="asc"?"asc":"desc",showCompleted:o.showCompleted===!0,statusFilter:bo(o.statusFilter),groupNames:Array.isArray(o.groupNames)?[...new Set(o.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:o.includeUngrouped===!0}}function Pn(e){let o=Rp[e],r=t.useCallback(()=>Yd(f.settings.get()[o]),[o]),[n,a]=t.useState(r);t.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=t.useCallback(s=>{a(c=>{let u=Yd({...c,...s});return f.settings.set(o,u),u})},[o]);return[n,i]}function In(){let e=f.settings.get()[di];return e==="weekly"||e==="daily"?e:"monthly"}function On(){let[e,o]=t.useState(In);return t.useEffect(()=>f.settings.subscribe(()=>o(In())),[]),e}function Ao(){return f.runtime.getOrCreate(_p,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function Mn(){return f.runtime.getOrCreate(zp,()=>({show:null,listeners:new Set}))}function _n(){return f.runtime.getOrCreate(Fp,()=>({filter:null,listeners:new Set}))}function gr(){return f.runtime.getOrCreate(Gp,()=>({query:null,listeners:new Set}))}function zn(){return f.runtime.getOrCreate($p,()=>({value:null,listeners:new Set}))}function oo(){let e=Ao();return e.view||(e.view=mr(f.settings.get()[si]),e.history=[e.view],e.historyIndex=0),e.view}function He(e){let o=Ao();if(oo(),o.view&&Cn(o.view,e))return;let r=o.history.slice(0,o.historyIndex+1);o.history=[...r,e].slice(-20),o.historyIndex=o.history.length-1,o.view=e,f.settings.set(si,tt(e));for(let n of o.listeners)n(e)}function Fn(){let e=Ao();return oo(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function Eo(e){let o=Ao();oo();let r=o.historyIndex+e;if(!(r<0||r>=o.history.length)){o.historyIndex=r,o.view=o.history[r],f.settings.set(si,tt(o.view));for(let n of o.listeners)n(o.view)}}function li(e){let o=Ao();return o.listeners.add(e),()=>{o.listeners.delete(e)}}function el(){let e=Ao();e.view=null,e.history=[],e.historyIndex=-1,Mn().show=null,_n().filter=null,gr().query=null,zn().value=null}function Nn(){return ri(f.settings.get()[Zd])}function tl(e){f.settings.set(Zd,ri(e))}function Gn(){let[e,o]=t.useState(Nn);return t.useEffect(()=>f.settings.subscribe(()=>o(Nn())),[]),e}function ol(e){let o=gr(),r=e.slice(0,500);if(o.query!==r){o.query=r,f.settings.set(fr,r);for(let n of o.listeners)n(r)}}function $n(){let e=()=>{let n=gr();return n.query===null&&(n.query=typeof f.settings.get()[fr]=="string"?String(f.settings.get()[fr]).slice(0,500):""),n.query},[o,r]=t.useState(e);return t.useEffect(()=>{let n=gr();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[o,ol]}function ci(e){let o=e&&typeof e=="object"?e:{};return{field:o.field==="auto"||Mp.includes(o.field)||Qd.includes(o.field)?o.field:"auto",dir:o.dir==="desc"?"desc":"asc"}}function rl(){let e=zn();return e.value||(e.value=ci(f.settings.get()[Jd])),e.value}function nl(e){let o=zn(),r=ci(e);if(!(o.value?.field===r.field&&o.value.dir===r.dir)){o.value=r,f.settings.set(Jd,r);for(let n of o.listeners)n(r)}}function al(){let[e,o]=t.useState(rl);return t.useEffect(()=>{let r=zn();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,nl]}function Rn(e=oo()){return{v:1,view:tt(e),showCompleted:ii(),statusFilter:Ln(),search:gr().query??(typeof f.settings.get()[fr]=="string"?String(f.settings.get()[fr]).slice(0,500):""),sort:rl()}}function jn(e,o=!1){return e.v!==1?!1:(o||He(mr(e.view)),ro(e.showCompleted===!0),ai(bo(e.statusFilter)),ol(typeof e.search=="string"?e.search:""),nl(ci(e.sort)),!0)}function Ln(){let e=_n();if(e.filter===null){let o=f.settings.get()[ni];e.filter=bo(o),typeof o=="string"&&o!=="all"&&e.filter!=="all"&&f.settings.set(ni,e.filter)}return e.filter}function ai(e){let o=_n(),r=bo(e),n=o.filter??Ln();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){o.filter=r,f.settings.set(ni,r);for(let a of o.listeners)a(r)}}function xt(){let[e,o]=t.useState(Ln);return t.useEffect(()=>{let r=_n();r.listeners.add(o);let n=f.settings.subscribe(()=>{let a=bo(r.filter??Ln());ai(a)});return()=>{r.listeners.delete(o),n()}},[]),[e,ai]}function Kn(){let[e,o]=t.useState(oo);return t.useEffect(()=>li(o),[]),e}function ii(){let e=Mn();return e.show===null&&(e.show=f.settings.get()[Xd]===!0),e.show}function ro(e){let o=Mn();if(o.show!==e){o.show=e,f.settings.set(Xd,e);for(let r of o.listeners)r(e)}}function kt(){let[e,o]=t.useState(ii);return t.useEffect(()=>{let r=Mn();return r.listeners.add(o),()=>{r.listeners.delete(o)}},[]),[e,()=>ro(!ii())]}function sl(e){let o=e.dueDate?.slice(0,10);if(!o)return!1;let r=f.interop.services.providers(Kt).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:o,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var jp=["normal","low","medium","high"];function dl(e,o){return e&&jp.includes(e)?e:o}function Kp(e){let o=[];return e.filePath&&o.push("note"),e.attachments?.length&&o.push("attachment"),e.urls?.length&&o.push("link"),e.location&&o.push("location"),o.length>0?o:void 0}function Up(e,o){return e.dueDate?{badges:Kp(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Se(e.group,o)}:{}}:null}function Vp(e,o){return{...e,title:o.title?.trim()||e.title,dueDate:o.date??e.dueDate,startTime:"startTime"in o?o.startTime:e.startTime,endTime:"endTime"in o?o.endTime:e.endTime,note:"note"in o?o.note??"":e.note,location:"location"in o?o.location:e.location,urls:"urls"in o?o.urls:e.urls,attachments:"attachments"in o?o.attachments:e.attachments,group:"group"in o?o.group:e.group,tags:o.tags??e.tags,priority:dl(o.priority,e.priority),filePath:"filePath"in o?o.filePath:e.filePath,...o.completed===void 0?{}:Ne(o.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Un(e){return Qe(e)}function il(e){let o=e.lastIndexOf("/");return o===-1?e:e.slice(o+1)}var ui="attachment:",pi="url:";function Bp(){return!0}function Hp(e){let o=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:il(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${ui}${i}`,label:il(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${pi}${i}`,label:i,icon:"link"}))}),e.location&&Bp()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&o.push(...r),o}async function Wp(e,o){if(o.startsWith(ui)){let r=o.slice(ui.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(o.startsWith(pi)){let r=o.slice(pi.length);if(!(e.urls??[]).includes(r))return!1;let n=wo(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(o){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),He(e.completed?{kind:"smart",id:"completed"}:Me),ze().request(e.id,o==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(cr(e.location),!0):!1;default:return!1}}function ll(){let e=Pe(),o=Bt("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:p,limit:g,cursor:b})=>{let m,k=()=>`${o}:${r}`;if(b){let x;try{x=JSON.parse(b)}catch{throw new Error("Invalid Calendar source cursor.")}if(!x||x.startDate!==l||x.endDate!==p||x.limit!==g||x.revision!==k()||typeof x.cursor!="string"||!x.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=x.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let T=k(),F=await Ws(l,p,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(b&&T!==k())throw new Error("Calendar source cursor is stale; restart the range.");let _=at(),P=k();return{items:F.todos.map(x=>Up(x,_)).filter(x=>!!x),revision:P,...F.cursor?{cursor:JSON.stringify({startDate:l,endDate:p,limit:g,revision:P,cursor:F.cursor})}:{}}},create:async(l,p)=>{if(p.endDate&&p.endDate!==l)return!1;let g=p.title?.trim();if(!g)return!1;let b=new Date().toISOString();return Zr({id:Bt("todo"),title:g,completed:p.completed??!1,priority:dl(p.priority,"normal"),dueDate:l,startTime:p.startTime,endTime:p.endTime,note:p.note??"",location:p.location,urls:p.urls,attachments:p.attachments,group:p.group,tags:p.tags??[],filePath:p.filePath,createdAt:b,updatedAt:b})},update:async(l,p)=>{let g=await Un(l);return g&&p.endDate&&p.endDate!==(p.date??g.dueDate)?!1:g?Lt(g.id,Vp(g,p),g.updatedAt):!1},remove:l=>Jr(l),open:async l=>{let p=await Un(l);await f.workspace.revealOwnPanel("left_sidebar"),p&&(He(p.completed?{kind:"smart",id:"completed"}:Me),ze().request(p.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let p=await Un(l);return p?Hp(p):[]},runAction:async(l,p)=>{let g=await Un(l);return g?Wp(g,p):!1}},i=()=>{f.interop.state.publish($o,++r)};f.interop.state.publish($o,r);let s=Us(i),c=tn(i),u=f.interop.services.provide(Kt,a);return()=>{n=!1,s(),c(),u(),f.interop.state.publish($o,null)}}var mi=e=>typeof e=="string"?e:"";function cl(e){let o=mi(e).replace(/\\/g,"/").replace(/^\.\//,"");return o===".valley"||o.startsWith(".valley/")?"":o}function ul(e){let o={cardKind:"todo",open:async(r,n)=>{if(mi(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:mi(r.id)}),!0;let a=cl(r.filePath)||cl(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(ha,o)}function ct(...e){let o=e.slice().sort().join("\0"),r=t.useMemo(()=>o.split("\0"),[o]),n=t.useCallback(a=>f.subscribeState(r,a),[r]);return t.useSyncExternalStore(n,f.getState,f.getState)}function Vn(){let e=t.useCallback(i=>f.interop.state.subscribe(Lr,i),[]),o=t.useCallback(()=>f.interop.state.get(Lr),[]),r=t.useSyncExternalStore(e,o,o),n=r?.rangeStart??null,a=r?.rangeEnd??null;return t.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function pl(){let[e,o]=t.useState(new Set),r=t.useRef(new Set),n=t.useCallback((i,s)=>{let c=new Set(r.current);s?c.add(i):c.delete(i),r.current=c,o(c)},[]),a=t.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var qp="todo.sharedTodos";function fi(){return f.runtime.getOrCreate(qp,()=>({todos:[],listeners:new Set}))}function Te(){return fi().todos}function Tt(e){let o=fi();o.todos=e;for(let r of o.listeners)r(e)}function _t(e){let o=fi();return o.listeners.add(e),()=>{o.listeners.delete(e)}}var gi="list:",ml=e=>f.ui.hasModKey(e)||e.button===1,Yp=e=>`${gi}${tt(e)}`;function no(e){return e?.startsWith(gi)?mr(e.slice(gi.length)):null}var fl=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function hi(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(vt(e.id).labelKey)}function bi(e,o){f.workspace.openMainTab({instanceId:Yp(e),title:hi(e),newTab:o})}function hr(e,o=!1){o||no(fl(f.getState().activePluginTab))?bi(e,o):He(e)}function br(){let e=Kn(),{activePluginTab:o}=ct("activePluginTab"),r=fl(o);return t.useMemo(()=>no(r),[r])??e}function zt(){return f.workspace.openOwnSettings(),Promise.resolve()}var yi={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function gl(){return["completed",...Vt().filter(o=>o!=="completed")].map(o=>Ae(o))}function ao(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function hl(){for(let e of ao().listeners)e()}function wi(e,o=""){let r=ao();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==o||(r.actions=e,r.actionsOwner=e?o:void 0,hl())}function vi(e,o){e?ao().selected.set(o,e):ao().selected.delete(o),hl()}function Xp(e,o){let r=e==="main_workspace"?no(o):null,n=Rn(r??void 0),a=Te().find(i=>i.id===ao().selected.get(e));return{title:d("manifest.name"),view:n,actions:ao().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...Fn(),goBack:()=>Eo(-1),goForward:()=>Eo(1)}}}}function Zp(e){let o=ao().listeners;o.add(e);let r=_t(e),n=li(e),a=f.settings.subscribe(e);return()=>{o.delete(e),r(),n(),a()}}async function Jp(e,o,r=!1,n){if(typeof e.todoId=="string"&&!await Qe(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!jn(e,o==="main_workspace"&&no(n)!==null))throw new Error("Unsupported To-Do bookmark.");vi(typeof e.todoId=="string"?e.todoId:null,o),!r&&typeof e.todoId=="string"&&ze().request(e.todoId,"focus")}function Qp({label:e,color:o,todos:r}){let[n,a]=t.useState(!1);return t.createElement("section",{className:`todo-status-group${n?" expanded":""}`},t.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},t.createElement("span",{className:"todo-status-group-name"},t.createElement("span",{className:"props-info-dot",style:{background:o}}),e),t.createElement("span",{className:"todo-status-group-meta"},t.createElement("span",null,r.length),t.createElement(mn,null))),n&&t.createElement("div",{className:"todo-group-status-breakdown"},gl().map(i=>t.createElement("div",{className:"todo-group-status-row",key:i.id},t.createElement("span",null,i.label),t.createElement("span",null,r.filter(s=>Fe(s)===i.id).length)))))}function em(){let e=t.useSyncExternalStore(_t,Te,Te),o=We(),r=br(),n=r.kind==="smart"?d(vt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return t.createElement("div",{className:"right-panel-body props-info"},t.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...gl().map(a=>[a.label,e.filter(i=>Fe(i)===a.id).length])].map(([a,i])=>t.createElement("div",{className:"props-info-row",key:a},t.createElement("dt",{className:"props-info-key"},a),t.createElement("dd",{className:"props-info-value"},i)))),t.createElement("div",{className:"todo-status-groups"},[...xe(o),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(c=>a===null?!c.group:it([a]).has(X(c.group??""))),s=a??d("todo.chip.noGroup");return t.createElement(Qp,{key:a??"ungrouped",label:s,color:a?ve(Se(a,o)):"var(--text-tertiary)",todos:i})})))}function tm(){let e=t.useSyncExternalStore(_t,Te,Te),o=We(),r=br();return t.createElement("div",{className:"right-panel-body props-info"},t.createElement(yr,{embedded:!0,todos:e,groups:o,names:xe(o),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>hr(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Me),onOpenSettings:zt}))}function bl(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>va(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>Xp(n,a),subscribe:Zp,restore:(a,i,s)=>Jp(a,n,s?.background,i)},{stateSchema:yi,itemStateSchema:{...yi,required:[...yi.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Pr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Qe(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>t.createElement(em,null)})),r.push(e.interop.extensions.provide(Pr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>at().map(n=>({id:n.id,label:n.name,value:Te().filter(a=>it([n.name]).has(X(a.group??""))).length,readOnly:!0})),render:()=>t.createElement(tm,null)})),()=>r.forEach(n=>n())}function yl(e,o,r){let n=new Date().toISOString();return{id:Bt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:o,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function wl(e){let o=e.split("/"),r=o[o.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function Do(e,o,r="main_workspace"){let n=t.useRef(Pe()).current,[a,i]=t.useState(Te()),[s,c]=t.useState(null),[u,l]=t.useState(null),[p,g]=t.useState(null),[b,m]=t.useState(!0),[k,T]=t.useState(0),[F,_]=t.useState(!1),{pendingIds:P,isPending:x,setPending:w}=pl(),M=t.useRef(!1),Y=t.useRef(0),$=t.useRef({sortField:e,sortDir:o});$.current={sortField:e,sortDir:o};let V=t.useRef([]),K=t.useMemo(()=>{let G=new Map(a.map(ee=>[ee.id,ee])),J=new Set(V.current),le=[];for(let ee of V.current){let te=G.get(ee);te&&le.push(te)}for(let ee of a)J.has(ee.id)||le.push(ee);return le},[a,k]),se=t.useCallback(G=>{let J=++Y.current;G&&m(!0),Je(n).then(le=>{if(n.assertActive(),J===Y.current){if(G){let{sortField:ee,sortDir:te}=$.current;V.current=ko(le,ee,te).map(ne=>ne.id)}else{let ee=new Set(le.map(y=>y.id)),te=V.current.filter(y=>ee.has(y)),ne=new Set(te),{sortField:S,sortDir:O}=$.current,R=ko(le.filter(y=>!ne.has(y.id)),S,O).map(y=>y.id);V.current=[...R,...te]}Tt(le),m(!1)}}).catch(()=>{J===Y.current&&m(!1)})},[n]);t.useEffect(()=>(se(!0),()=>{Y.current++}),[se]),t.useEffect(()=>xo(()=>se(!1)),[se]);let ce=t.useRef(!0);t.useEffect(()=>{if(ce.current){ce.current=!1;return}V.current=ko(Te(),e,o).map(G=>G.id),T(G=>G+1)},[e,o]),t.useEffect(()=>_t(G=>i(G)),[]);let oe=t.useCallback(()=>c(null),[]),A=t.useCallback(G=>{vi(G,r),g(G)},[r]),E=t.useCallback(()=>g(null),[]),z=t.useCallback(async(G,J,le)=>{if(M.current)return null;let ee=G.trim();if(!ee)return null;let te={...yl(ee,J),...le?.patch};M.current=!0,_(!0),V.current=[te.id,...V.current],Tt([te,...Te()]),c(te.id);let ne=()=>{V.current=V.current.filter(S=>S!==te.id),Tt(Te().filter(S=>S.id!==te.id)),c(S=>S===te.id?null:S)};try{let S=await Zr(te);return S||ne(),S?te:null}catch{return ne(),null}finally{M.current=!1,_(!1)}},[]),h=t.useCallback(async(G,J,le)=>{if(x(G))return!1;let ee=Te().find(ne=>ne.id===G);if(!ee)return!1;let te={...ee,...J,updatedAt:new Date().toISOString()};w(G,!0),Tt(Te().map(ne=>ne.id===G?te:ne));try{return await Lt(G,te,ee.updatedAt,le)?!0:(Tt(Te().map(S=>S.id===G?ee:S)),!1)}catch{return Tt(Te().map(ne=>ne.id===G?ee:ne)),!1}finally{w(G,!1)}},[x,w]),v=t.useCallback(async G=>{if(x(G))return;let J=Te().find(ee=>ee.id===G);if(!J)return;w(G,!0),V.current=V.current.filter(ee=>ee!==G),Tt(Te().filter(ee=>ee.id!==G)),c(ee=>ee===G?null:ee),p===G&&g(null);let le=()=>{V.current.includes(G)||V.current.push(G),Te().some(ee=>ee.id===G)||Tt([...Te(),J])};try{await Jr(G)||le()}catch{le()}finally{w(G,!1)}},[p,x,w]);return{todos:a,loading:b,ordered:K,lastCreatedId:s,clearLastCreated:oe,menuId:u,setMenuId:l,editingId:p,openDetail:A,closeDetail:E,pendingIds:P,creating:F,create:z,patchTodo:h,removeTodo:v}}var om=[".ttf",".otf",".woff",".woff2"],rm=[".csv"],nm=[".base"],am=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],im=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],sm=[...am,...im,".ico",".flavicon"];var dm=[".pdf"],lm=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],cm=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],um=[".srt",".vtt",".ass"],pm=[".stl",".obj",".glb",".gltf"],mm=[".bin",".mtl"];function xi(e){let o=e.split("/").pop()??e,r=o.lastIndexOf(".");return r>0?o.slice(r).toLowerCase():""}var fm={type:"core",id:"valley"},q=(e,o,r,n,a={})=>({kind:e,icon:o,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:fm,...a});function gm(e){let o={};for(let[r,n]of e)for(let a of r)o[a]=n;return o}var hm=gm([[[".mermaid",".mmd"],q("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],q("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],q("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],q("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],q("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[om,q("font","font","font","media")],[[".epub",".mobi",".azw3"],q("ebook","ebook","ebook","documents")],[[".djvu"],q("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],q("comic","comic","comic","documents")],[[".md",".markdown"],q("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],q("text","text","text","notes")],[[".json"],q("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],q("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[rm,q("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[nm,q("base","base","fallback","data")],[sm,q("image","image","image","media",{information:["identity","dimensions","exif"]})],[dm,q("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[lm,q("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[cm,q("video","video","video","media",{information:["identity","media","video-codec"]})],[um,q("text","subtitle","text","media")],[pm,q("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[mm,q("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],q("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],q("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],q("docx","word","opendocument","documents")],[[".ods"],q("csv","excel","opendocument","data")],[[".odp"],q("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],q("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],q("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],q("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],q("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],q("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],q("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],q("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],q("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],q("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],q("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],q("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],q("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],q("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],q("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],q("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],q("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],q("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],q("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],q("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],q("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],q("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],q("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],q("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],q("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],q("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],q("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],q("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),bm=q("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function ym(e){return hm[xi(e)]??bm}function wr(e){return ym(e).kind}var vl="valley-realm",xl="asset";function kl(e){return`${vl}://${xl}/${encodeURIComponent(e)}`}var wm={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function vm(e){if(!Number.isFinite(e)||e<0)return"";let o=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<o.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${o[n]}`}function ki(e){let o=wm[wr(e)];if(o)return d(o);let r=xi(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var xm={image:hn,audio:bn,video:yn},Tl=({relPath:e,onRemove:o})=>{let[r,n]=t.useState(null),a=wr(e),i=e.split("/").pop()??e,s=xm[a]??wt;t.useEffect(()=>{let p=!1;return f.realm.fileInfo(e).then(g=>{p||n(g?.size??null)}),()=>{p=!0}},[e]);let[c,u]=t.useState(0);t.useEffect(()=>f.realm.onChanged(()=>u(p=>p+1)),[]);let l=a==="image"?`${kl(e)}?v=${c}`:null;return t.createElement("div",{className:"todo-attach-card"},t.createElement("button",{className:"todo-attach-open",type:"button",onClick:p=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(p)}),title:e},t.createElement("span",{className:"todo-attach-copy"},t.createElement("span",{className:"todo-attach-name"},i),t.createElement("span",{className:"todo-attach-meta"},ki(e),r!==null&&` \xB7 ${vm(r)}`)),t.createElement("span",{className:"todo-attach-thumb"},l?t.createElement("img",{src:l,alt:"",loading:"lazy"}):t.createElement(s,null))),o&&t.createElement("button",{className:"todo-attach-remove",type:"button",onClick:o,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},t.createElement(Ee,null)))};var km={image:hn,audio:bn,video:yn};function Ti({onPick:e,onCancel:o,placeholder:r,autoFocus:n=!0}){let a=t.useRef(null),[i,s]=t.useState([]),[c,u]=t.useState(0),[l,p]=t.useState("idle"),g=t.useRef(null),b=t.useRef(0);t.useEffect(()=>{n&&a.current?.focus()},[n]),t.useEffect(()=>()=>{g.current!==null&&window.clearTimeout(g.current)},[]);let m=T=>{g.current!==null&&window.clearTimeout(g.current);let F=++b.current;if(!T.trim()){s([]),p("idle");return}p("searching"),g.current=window.setTimeout(()=>{f.resources.search({query:T.trim(),kinds:["attachment"],limit:6}).then(_=>{F===b.current&&(s(_),u(0),p("done"))},()=>{F===b.current&&(s([]),p("done"))})},150)},k=T=>(T.value??T.id).trim();return t.createElement("div",{className:"todo-file-search"},t.createElement("div",{className:"todo-location-field"},t.createElement(bt,{className:"todo-location-field-icon"}),t.createElement("input",{ref:a,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:T=>m(T.currentTarget.value),onKeyDown:T=>{T.nativeEvent.isComposing||(T.key==="ArrowDown"&&i.length?(T.preventDefault(),u(F=>(F+1)%i.length)):T.key==="ArrowUp"&&i.length?(T.preventDefault(),u(F=>F<=0?i.length-1:F-1)):T.key==="Enter"?(T.preventDefault(),i[c]&&e(k(i[c]))):T.key==="Escape"&&(T.preventDefault(),T.stopPropagation(),o?.()))}}),o&&t.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:o},t.createElement(Ee,null))),l!=="idle"&&t.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},l==="searching"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!i.length&&t.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),i.map((T,F)=>{let _=k(T),P=km[wr(_)]??wt,x=_.includes("/")?_.slice(0,_.lastIndexOf("/")):"";return t.createElement("li",{key:T.id,role:"option","aria-selected":F===c},t.createElement("button",{type:"button",className:"todo-file-search-hit"+(F===c?" is-active":""),onMouseDown:w=>w.preventDefault(),onMouseEnter:()=>u(F),onClick:()=>e(_)},t.createElement(P,{className:"todo-file-search-glyph"}),t.createElement("span",{className:"todo-file-search-text"},t.createElement("span",{className:"todo-file-search-name"},T.label||_.split("/").pop()),x&&t.createElement("span",{className:"todo-file-search-folder"},x))))})))}var Tm=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],Sl=e=>{let[o,r]=(e||be(new Date)).split("-").map(Number);return new Date(o,r-1,1)};function io({value:e,onChange:o}){let[r,n]=t.useState(()=>Sl(e)),a=f.ui.language(),i=Math.max(0,Tm.indexOf(String(f.getState().weekStart??"monday").toLowerCase())),s=be(new Date),c=r.getFullYear(),u=r.getMonth(),l=(new Date(c,u,1).getDay()-i+7)%7,p=Array.from({length:42},(k,T)=>new Date(c,u,1-l+T)),g=Array.from({length:7},(k,T)=>new Intl.DateTimeFormat(a,{weekday:"narrow"}).format(new Date(2024,0,7+(i+T)%7))),b=new Intl.DateTimeFormat(a,{month:"long",year:"numeric"}).format(r),m=k=>n(new Date(c,u+k,1));return t.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},t.createElement("div",{className:"todo-calendar-head"},t.createElement("span",{className:"todo-calendar-title"},b),t.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>m(-1)},t.createElement(xn,null)),t.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>m(1)},t.createElement(kn,null))),t.createElement("div",{className:"todo-calendar-grid"},g.map((k,T)=>t.createElement("span",{key:`w${T}`,className:"todo-calendar-weekday"},k)),p.map(k=>{let T=be(k),F=k.getMonth()!==u;return t.createElement("button",{key:T,type:"button",className:"todo-calendar-day"+(F?" is-outside":"")+(T===s?" is-today":"")+(T===e?" is-selected":""),"aria-pressed":T===e,"aria-label":new Intl.DateTimeFormat(a,{dateStyle:"full"}).format(k),onClick:()=>o(T)},k.getDate())})),t.createElement("div",{className:"todo-calendar-foot"},t.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>o("")},d("todo.calendar.clear")),t.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(Sl(s)),o(s)}},d("todo.due.today"))))}function Sm(e){let o=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(o);if(!r)return null;let n=Number(r[1]),a=Number(r[2]);return n>23||a>59?null:`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function vr({value:e,onChange:o,ariaLabel:r,placeholder:n,disabled:a}){let[i,s]=t.useState(e),[c,u]=t.useState(!1);t.useEffect(()=>{s(e),u(!1)},[e]);let l=()=>{if(!i.trim()){u(!1),e&&o("");return}let p=Sm(i);if(!p){u(!0);return}u(!1),s(p),p!==e&&o(p)};return t.createElement("input",{className:"settings-control todo-clock-input"+(c?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:i,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":c||void 0,title:c?d("todo.time.invalid"):void 0,disabled:a,autoComplete:"off",spellCheck:!1,onChange:p=>{let g=p.currentTarget.value.replace(/[^\d:]/g,""),b=g.indexOf(":");s(b<0?g:g.slice(0,b+1)+g.slice(b+1).replace(/:/g,"")),u(!1)},onBlur:l,onKeyDown:p=>{p.key==="Enter"&&(p.preventDefault(),l())}})}function Bn(e){return f.markdown.render(e,{inline:!0})}var Am={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Em=["tomorrow","weekend","pick"];function Dm(e=be(new Date)){let o=Ba(e);if(!o)return e;let r=o.getDay(),n=r===6?1:(6-r+7)%7||7;return Pt(e,n)}function Hn(e,o=be(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?Pt(o,1):s==="weekend"?Dm(o):null,a=new Set,i=[];for(let s of Em){let c=n(s);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:s,labelKey:Am[s],date:c})}return i}function Al(e,{todo:o,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:s,disabled:c=!1}){let u=Fe(o);n(o.id);let l=Hn(o.dueDate??"",be(new Date));return f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:t.createElement(Ye,{className:"todo-menu-action-icon"}),enabled:!c,submenu:mt().map(p=>({label:p.label,icon:t.createElement(ke,{status:p.status,dotCls:p.cls,color:p.color}),type:"radio",checked:p.status===null?u==="open":u===p.status,onSelect:()=>i(Ne(p.status))}))},{label:d("todo.menu.reschedule"),icon:t.createElement(lt,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(p=>p.date).map(p=>({label:d(p.labelKey),icon:p.id==="tomorrow"?t.createElement(lr,{className:"todo-menu-action-icon"}):p.id==="weekend"?t.createElement(vn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:p.date})}))},{label:d(o.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:t.createElement(Oe,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:o.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:t.createElement(Od,{className:"todo-menu-action-icon"}),enabled:!c,submenu:qe.map(p=>({label:Ze(p.id),type:"radio",checked:o.priority===p.id,onSelect:()=>i({priority:p.id})}))},{label:d("todo.menu.moveGroup"),icon:t.createElement(fn,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!o.group,onSelect:()=>i({group:void 0})},...r.map(p=>({label:p,type:"radio",checked:o.group===p,onSelect:()=>i({group:p})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:t.createElement(Md,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:t.createElement(yt,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function Wn(e,o){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),Al({x:e.clientX,y:e.clientY},o))}var qn=({todo:e,groupNames:o,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>t.createElement("div",{className:"todo-menu-wrap"},t.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:c=>{c.stopPropagation(),Al({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:o,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s})}},t.createElement(Cd,null)));function Cm(e,o,r=.55){return o<=0?0:e*o*r/(o+r*Math.abs(e))}function Im(e,o=.998){return e/1e3*o/(1-o)}function El(e,o=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=o));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function Dl(e,o,r){if(o<=0)return 0;let n=Math.abs(e);if(n<=o)return e;let a=Math.max(20,r-o);return Math.sign(e)*(o+Cm(n-o,a,.2))}function Cl(e){if(e.committed)return{target:0,commit:!0};let o=e.openWidth;if(o<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-o,Math.min(o,Im(e.velocity*r))),i=n+a;return{target:Math.abs(i-o)<Math.abs(i)?r*o:0,commit:!1}}function Il(e,o,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,u=2*i*Math.sqrt(c),l=o+(-c*(e-r)-u*o)*s,p=e+l*s,g=Math.abs(p-r)<.5&&Math.abs(l)<20;return{value:g?r:p,velocity:g?0:l,done:g}}function Si(e,o,r){let n=o.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...o))+22),c=n*s<=i+(r?24:0),u=c?s:48,l=Math.min(n*u,Math.max(i,n*32)),p=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:u,labelled:c,openWidth:l,commitPoint:p}}var Nl=.22,Ll=.18,Nm=.8,Yn=.9,Lm=400,Pm=80,Om=10,Mm=5,_m=4,zm=3,Fm=.5,Gm=6,$m=["left","right"],Pl={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Rm(e,o,r,n,a,i){return{kind:e,pointerId:o,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function jm(e,o){let r={today:t.createElement(lr,null),tomorrow:t.createElement(lr,null),weekend:t.createElement(vn,null),pick:t.createElement(lt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?o.reschedule(n.date):o.pickDate(a)}}))}var kr=null;function Ol(e){if(kr===e)return;let o=kr;kr=e,o?.close()}function Ml(e){kr===e&&(kr=null)}var Co;function _l(e,o){if(Co===void 0)try{Co=document.createElement("canvas").getContext("2d")}catch{Co=null}return Co?(Co.font=o,Co.measureText(e).width):e.length*7}var Km=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,xr=e=>e>0?"left":e<0?"right":null,zl=({todo:e,disabled:o,actions:r,onEngage:n,children:a})=>{let i=t.useRef(null),s=t.useRef(null),c=t.useRef({left:null,right:null}),u=t.useRef(0),l=t.useRef(null),p=t.useRef(null),g=t.useRef([]),b=t.useRef(!1),m=t.useRef(null),k=t.useRef(null),T=t.useRef({velocity:0,target:0,response:Nl,damping:Yn}),F=t.useRef({left:"",right:""}),_=t.useMemo(()=>jm(Hn(e.dueDate??"",be(new Date)),r),[e.dueDate,r]),P=t.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:t.createElement(Oe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:t.createElement(Id,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:t.createElement(yt,null),run:()=>r.remove()}],[r,e.flagged]),x={left:_,right:P},[w,M]=t.useState(()=>({rowWidth:0,left:Pl,right:Pl})),Y=t.useRef(w);Y.current=w;let $=()=>{let S=i.current?.querySelector(".todo-swipe-action");if(!S||typeof getComputedStyle!="function")return"13px sans-serif";let O=getComputedStyle(S);return`${O.fontWeight} ${O.fontSize} ${O.fontFamily}`},V=()=>{let S=i.current?.clientWidth??0,O=$(),R=Y.current,y={rowWidth:S,left:Si(S,_.map(W=>_l(W.label,O)),R.left.labelled),right:Si(S,P.map(W=>_l(W.label,O)),R.right.labelled)};Y.current=y;let L=W=>R[W].openWidth!==y[W].openWidth||R[W].labelled!==y[W].labelled;return(R.rowWidth!==S||L("left")||L("right"))&&M(y),y},K=t.useRef(V);K.current=V,t.useEffect(()=>{K.current()},[_,P]);let se=S=>{let O=xr(S);return!O||O!==p.current?!1:Math.abs(S)>=Y.current[O].commitPoint},ce=(S,O=!1)=>{u.current=S,O&&S!==0?Ol(h.current):S===0&&Ml(h.current);let R=i.current,y=s.current;if(!R||!y)return;y.style.transform=S?`translate3d(${S}px, 0, 0)`:"";let L=xr(S),W=Y.current,ue=se(S);R.classList.toggle("open",S!==0),R.classList.toggle("committed",ue);for(let B of $m){let U=c.current[B];if(!U)continue;let ae=L===B;U.classList.toggle("committed",ae&&ue);let De=ae?ue?"100%":`${Math.max(W[B].openWidth,Math.abs(S))}px`:`${S===0?W[B].openWidth:0}px`,$e=`${De}|${ae}`;F.current[B]!==$e&&(F.current[B]=$e,U.style.width=De,U.setAttribute("aria-hidden",String(!ae)))}};t.useLayoutEffect(()=>ce(u.current));let oe=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},A=(S,O,R,y)=>{if(oe(),S!==0&&Ol(h.current),u.current===S||Km()||typeof requestAnimationFrame!="function"){ce(S);return}T.current={velocity:O,target:S,response:R,damping:y};let L=0,W=ue=>{let B=L?(ue-L)/1e3:.016666666666666666;L=ue;let U=T.current,ae=Il(u.current,U.velocity,U.target,B,U.response,U.damping);U.velocity=ae.velocity,ce(ae.value),m.current=ae.done?null:requestAnimationFrame(W)};m.current=requestAnimationFrame(W)},E=t.useRef(()=>{});E.current=()=>{l.current=null,A(0,0,Ll,Yn)};let z=t.useCallback(()=>E.current(),[]),h=t.useRef({close:()=>E.current()}),v=()=>{oe(),l.current=null,k.current!=null&&window.clearTimeout(k.current),k.current=null,ce(0)},C=t.useRef(v);C.current=v;let G=S=>{let O=Y.current,R=xr(S);if(!R)return 0;let y=l.current?.origin;if(y&&R!==y)return 0;let L=O[R],W=R===p.current?L.commitPoint:L.openWidth;return Dl(S,W,O.rowWidth)},J=(S,O,R,y,L)=>{oe(),V();let W=u.current,ue=xr(W),B=Math.abs(W)>8?ue:null;p.current=ue&&Math.abs(W)>=Y.current[ue].openWidth-1?ue:null,l.current=Rm(S,O,R,y,W,B),g.current=[{x:W,t:L}]},le=(S,O)=>{let R=l.current;!R||R.ended||(R.live||(R.live=!0,oe(),n?.()),g.current.push({x:S,t:O}),g.current.length>Gm&&g.current.shift(),ce(G(S),!0),se(u.current)&&(R.crossed=!0))},ee=S=>{let O=l.current;if(!O||O.ended)return;if(O.ended=!0,!O.live){l.current=null;return}let R=()=>{O.kind==="pointer"&&(l.current=null)},y=El(g.current),L=u.current,W=xr(L);if(!W){R(),ce(0);return}let ue=Y.current[W],B=S&&se(L),U=Cl({offset:L,velocity:y,openWidth:ue.openWidth,committed:B});if(R(),U.commit){let ae=W==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",De=i.current?.querySelector(ae),$e=x[W],Xe=W==="left"?$e[0]:$e[$e.length-1];A(0,y,Ll,Yn),Xe?.run(De??i.current);return}A(U.target,y,Nl,Math.abs(y)>Lm?Nm:Yn)};t.useEffect(()=>z(),[e.dueDate,e.flagged,z]),t.useEffect(()=>{let S=h.current;return()=>{oe(),k.current!=null&&window.clearTimeout(k.current),Ml(S)}},[]),t.useEffect(()=>{let S=i.current,O=S?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!S||!O)return;let R=0,y=new O(()=>{let L=S.clientWidth,W=R!==L;R=L,K.current(),W&&u.current!==0&&C.current()});return y.observe(S),()=>y.disconnect()},[]);let te=t.useRef({disabled:o,begin:J,move:le,end:ee});te.current={disabled:o,begin:J,move:le,end:ee},t.useEffect(()=>{let S=i.current;if(!S)return;let O=()=>{k.current!=null&&window.clearTimeout(k.current),k.current=null},R=()=>{k.current=null,l.current?.kind==="wheel"&&(te.current.end(!0),l.current=null)},y=L=>{let W=te.current;if(W.disabled||Math.abs(L.deltaX)<=Math.abs(L.deltaY)||L.deltaX===0)return;L.preventDefault();let ue=L.deltaMode===WheelEvent.DOM_DELTA_LINE?16:L.deltaMode===WheelEvent.DOM_DELTA_PAGE?S.clientWidth:1,B=-L.deltaX*ue,U=l.current;(!U||U.kind!=="wheel")&&(W.begin("wheel",-1,0,0,L.timeStamp),U=l.current),O(),k.current=window.setTimeout(R,Pm);let ae=Math.abs(B),De=U.previous;U.previous=ae;let $e=U.live&&(U.ended||U.origin!==null&&u.current===0),Xe=ae>=De+Mm,Gt=U.distance!==0&&Math.sign(B)!==Math.sign(U.distance)&&ae>=_m;if($e&&(Xe||Gt)&&(W.end(!1),W.begin("wheel",-1,0,0,L.timeStamp),U=l.current,U.previous=ae),U.ended)return;if(U.decay=ae<De?U.decay+1:0,U.peak=Math.max(U.peak,ae),U.distance+=B,U.live&&U.peak>=Om&&U.decay>=zm&&ae<U.peak*Fm){W.end(U.crossed);return}!U.live&&Math.abs(U.distance)<8||W.move(U.base+U.distance,L.timeStamp)};return S.addEventListener("wheel",y,{passive:!1}),()=>{S.removeEventListener("wheel",y),O()}},[]);let ne=(S,O)=>t.createElement("div",{ref:R=>{c.current[S]=R},className:`todo-swipe-tray todo-swipe-tray-${S} ${w[S].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${w[S].openWidth}px`}},O.map(R=>t.createElement("button",{key:R.key,type:"button",className:R.cls,tabIndex:-1,title:R.label,"aria-label":R.label,onClick:y=>{y.stopPropagation(),z(),R.run(y.currentTarget)}},R.icon,t.createElement("span",null,R.label))));return t.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:S=>{o||S.pointerType==="mouse"&&S.button!==0||S.target.closest(".todo-swipe-tray")||J("pointer",S.pointerId,S.clientX,S.clientY,S.timeStamp)},onPointerMove:S=>{let O=l.current;if(!O||O.kind!=="pointer"||O.pointerId!==S.pointerId)return;let R=S.clientX-O.originX,y=S.clientY-O.originY;if(!O.live){if(Math.abs(y)>Math.abs(R)){S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),l.current=null;return}if(Math.abs(R)<8)return;b.current=!0,S.currentTarget.setPointerCapture?.(S.pointerId)}S.preventDefault(),le(O.base+R,S.timeStamp)},onPointerUp:S=>{let O=l.current;!O||O.kind!=="pointer"||O.pointerId!==S.pointerId||(S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),O.live&&le(O.base+(S.clientX-O.originX),S.timeStamp),ee(!0))},onPointerCancel:S=>{let O=l.current;!O||O.kind!=="pointer"||O.pointerId!==S.pointerId||(S.currentTarget.hasPointerCapture?.(S.pointerId)&&S.currentTarget.releasePointerCapture(S.pointerId),z())},onClickCapture:S=>{let O=!!S.target.closest(".todo-swipe-tray");if(O&&(b.current=!1),b.current&&!O){b.current=!1,S.stopPropagation(),S.preventDefault();return}u.current&&!O&&(S.stopPropagation(),S.preventDefault(),z())}},_.length>0&&ne("left",_),t.createElement("div",{ref:s,className:"todo-swipe-surface"},a),P.length>0&&ne("right",P))};function Tr(e,o,r){let n=Fe(o);f.ui.openMenu(mt().map(a=>({label:a.label,icon:t.createElement(ke,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ne(a.status))})),{anchor:e})}function Um({status:e,style:o}){let r=Ae(e);return o==="filled"?t.createElement("span",{className:"todo-status-pill","data-status":e},nt(e)):t.createElement("span",{className:`todo-status-text ${r.cls}`},t.createElement(ke,{status:e==="open"?null:e,dotCls:r.cls}),nt(e))}function Fl({status:e}){return t.createElement(Um,{status:e,style:Ps()})}var Vm=2;function Ei(e,o){let r=Fe(e),n=o.pendingIds.has(e.id),a=t.useRef(null),i=t.useRef(null),s=t.useRef(!1),c=t.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return t.useEffect(()=>c,[c]),{check:t.createElement("span",{className:"todo-check-wrap"},t.createElement("input",{ref:a,className:"todo-check","data-status":r,type:"checkbox",checked:r==="completed","aria-disabled":n||void 0,onPointerDown:()=>{n||(s.current=!1,c(),i.current=window.setTimeout(()=>{s.current=!0;let l=a.current;l&&f.ui.openMenu(mt().map(p=>({label:p.label,icon:t.createElement(ke,{status:p.status,dotCls:p.cls,color:p.color}),type:"radio",checked:p.status===null?r==="open":p.status===r,enabled:!n,onSelect:()=>o.patchTodo(e.id,Ne(p.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{s.current&&l.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:l=>{if(s.current){s.current=!1;return}o.patchTodo(e.id,Ne(l.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),r!=="open"&&r!=="completed"&&t.createElement("span",{className:"todo-check-glyph"},t.createElement(ke,{status:r,dotCls:Ae(r).cls}))),cancelHold:c}}var Gl=({todo:e,groups:o,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let s=t.useRef(null);t.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[c,u]=t.useState("");t.useEffect(()=>{let h=!0;return u(""),Bn(e.title).then(v=>{h&&u(v)}).catch(()=>{h&&u("")}),()=>{h=!1}},[e.title]);let l=(h,v)=>f.workspace.openFile(h,void 0,{newTab:v}),p=qe.find(h=>h.id===e.priority)??qe[0],g=xe(o),b=Fe(e),m=[e.filePath,...e.attachments??[]].filter(h=>!!h),[k,T]=t.useState(!1),F=k?m:m.slice(0,Vm),_=m.length-F.length,P=e.urls?.length??0,x=r&&m.length>0,w=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||P>0||x||e.status&&e.status!=="open"&&!Ae(e.status).done||e.priority!=="normal"),M=n.pendingIds.has(e.id),Y=be(new Date),$=e.dueDate&&!a?st(e.dueDate,Y,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",V=e.dueDate?Ve(e.dueDate,f.getState().dateFormat):"",K=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<Y,se=t.useRef(null);t.useEffect(()=>se.current?zr(e.id,se.current):void 0,[e.id]);let{check:ce,cancelHold:oe}=Ei(e,n),A=()=>{sl(e)||n.openDetail(e.id)},E=h=>n.patchTodo(e.id,h),z=t.useMemo(()=>({reschedule:h=>{n.patchTodo(e.id,{dueDate:h})},pickDate:h=>{f.ui.openPopover(v=>t.createElement("div",{className:"todo-swipe-datepick"},t.createElement(io,{value:e.dueDate?.slice(0,10)??"",onChange:C=>{n.patchTodo(e.id,{dueDate:C}),v.close()}})),{anchor:h},{ariaLabel:d("todo.swipe.date")})},setStatus:h=>Tr(h,e,E),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{ft(e,n.removeTodo)}}),[e,n]);return t.createElement(zl,{todo:e,disabled:M,actions:z,onEngage:oe},t.createElement("article",{ref:se,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,"data-status":b,tabIndex:0,onContextMenu:h=>Wn(h,{todo:e,groupNames:g,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:E,onRequestDelete:()=>ft(e,n.removeTodo),disabled:M}),onKeyDown:h=>{if(h.target===h.currentTarget){if(h.key==="ArrowDown"||h.key==="ArrowUp"){h.preventDefault(),i?.(h.key==="ArrowDown"?1:-1);return}if(h.key==="Escape"){h.currentTarget.blur();return}h.key==="Enter"&&(h.preventDefault(),n.openDetail(e.id))}},onClick:h=>{h.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||h.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,A()},220))},onDoubleClick:h=>{s.current&&(clearTimeout(s.current),s.current=null),!h.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},ce,t.createElement("div",{className:"todo-row-main"},t.createElement("h4",null,p.symbol&&t.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},p.symbol," "),c?t.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:c}}):t.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&t.createElement("div",{className:"todo-notes is-plain"},e.note),(w||!r&&!!e.tags?.length)&&t.createElement("div",{className:"todo-view-meta"},e.group&&t.createElement("span",{className:"todo-group-text",style:{color:ve(Se(e.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Ae(e.status).done&&t.createElement(Fl,{status:e.status}),e.priority!=="normal"&&t.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},t.createElement("span",{className:"todo-meta-icon"},t.createElement(eo,null)),Es(e.priority)),$&&t.createElement("button",{className:`todo-date${K?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:V||$}),onClick:h=>{h.stopPropagation(),A()}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(lt,null)),t.createElement("span",{className:"todo-date-day"},$),V&&V!==$&&t.createElement("span",{className:"todo-date-full"},V)),e.startTime&&t.createElement("span",{className:"todo-clock-text"},t.createElement("span",{className:"todo-meta-icon"},t.createElement(zd,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&t.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:h=>{h.stopPropagation(),cr(e.location)}},t.createElement("span",{className:"todo-meta-icon"},t.createElement(et,null)),e.location.name),x&&t.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},t.createElement("span",{className:"todo-meta-icon"},t.createElement(Mt,null)),m.length),P>0&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},t.createElement(to,null),P>1&&P),e.remindAt&&!e.reminderFiredAt&&t.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},t.createElement(_d,null),e.remindAt.slice(11,16)),!r&&e.tags?.slice(0,3).map(h=>t.createElement("span",{key:h,className:"todo-tag-text"},"#",h)),!r&&(e.tags?.length??0)>3&&t.createElement("span",{className:"todo-tag-more",title:e.tags.slice(3).map(h=>`#${h}`).join(" ")},"+",e.tags.length-3))),t.createElement("div",{className:"todo-row-actions"},e.flagged&&t.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},t.createElement(Oe,null)),t.createElement(qn,{todo:e,groupNames:g,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:E,onRequestDelete:()=>ft(e,n.removeTodo),disabled:M})),!r&&m.length>0&&t.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},F.map(h=>t.createElement("button",{key:h,className:"todo-file-card",title:h,onClick:v=>{v.stopPropagation(),l(h,f.ui.hasModKey(v))},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},h===e.filePath?t.createElement(wt,null):t.createElement(Mt,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},wl(h)),t.createElement("span",{className:"todo-file-card-kind"},ki(h))))),(_>0||k)&&t.createElement("button",{className:`todo-file-card todo-file-card-more${k?" open":""}`,title:k?d("todo.fewerFiles"):d("todo.moreFiles",{p0:_}),"aria-expanded":k,onClick:h=>{h.stopPropagation(),T(v=>!v)},type:"button"},t.createElement("span",{className:"todo-file-card-icon"},t.createElement(mn,null)),t.createElement("span",{className:"todo-file-card-copy"},t.createElement("span",{className:"todo-file-card-name"},k?d("todo.fewerFiles"):d("todo.moreFiles",{p0:_})))))))};function Xn({value:e,onChange:o,autoFocus:r=!1,disabled:n=!1,bare:a=!1}){let i=t.useRef(null),s=c=>{let u=c.split(/[\s,]+/).map(p=>p.trim().replace(/^#+/,"")).filter(Boolean),l=[...e];for(let p of u)l.some(g=>g.toLowerCase()===p.toLowerCase())||l.push(p);return l.length===e.length?!1:(o(l),!0)};return t.useEffect(()=>{r&&i.current?.focus()},[r]),t.createElement("div",{className:`todo-tags-input${a?" is-bare":""}`,onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),i.current?.focus())}},e.map(c=>t.createElement("span",{key:c,className:"todo-tags-chip"},t.createElement("span",null,"#",c),t.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:c}),title:d("todo.compose.removeTag",{tag:c}),onClick:()=>{o(e.filter(u=>u!==c)),i.current?.focus()}},t.createElement(Ee,null)))),t.createElement("input",{ref:i,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let u=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&u.value.trim()?(c.preventDefault(),s(u.value)&&(u.value="")):c.key==="Backspace"&&!u.value&&e.length&&(c.preventDefault(),o(e.slice(0,-1))))},onBlur:c=>{s(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let u=c.clipboardData.getData("text/plain");/[\s,]/.test(u.trim())&&(c.preventDefault(),s(c.currentTarget.value+u),c.currentTarget.value="")}}))}function Bm(e,o){return e==="all"?o:e.filter(r=>o.includes(r))}function Zn(e,o,r){let n=Bm(e,o);return r?n:n.filter(a=>!go(a))}function Di(){let[e,o]=xt(),[r]=kt(),a=pt().map(p=>p.id),i=Zn(e,a,r),s=a.filter(p=>!go(p)),c=a.filter(p=>go(p)),u=p=>p.length===i.length&&p.every(g=>i.includes(g)),l=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:i.length===a.length,select:()=>{ro(!0),o("all")}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:u(s),select:()=>{ro(!1),o(s)}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:u(c),select:()=>{ro(!0),o(c)}}];return t.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},l.map(p=>t.createElement("button",{key:p.id,type:"button",className:`todo-status-quick-btn${p.active?" active":""}`,"aria-pressed":p.active,"aria-label":p.title,title:p.title,onClick:p.select},p.label)))}function $l(){let[e,o]=xt(),[r]=kt(),n=pt(),a=n.map(c=>c.id),i=Zn(e,a,r),s=c=>{let u=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);u.length&&(ro(u.some(l=>go(l))),o(u.length===a.length?"all":u))};return t.createElement("div",{className:"todo-status-filter-menu"},t.createElement(Di,null),t.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let u=i.includes(c.id);return t.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":u,key:c.id,onClick:()=>s(c.id)},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(ke,{status:c.id==="open"?null:c.id,dotCls:c.cls})),t.createElement("span",null,c.label))}))}var Kl=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],Hm=["title","due","priority","group","note"],Ci=[10,20,30,40,50,100,200,500],No=qe.map(e=>e.id).reverse(),Ul=Kl.map(e=>e.id),Io={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function so(e,o,r){let n=e.ownerDocument.createElement("span");n.className=o,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var lo=e=>e.replace(/[&<>"]/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[o]);function Wm(e){let[o,r]=t.useState({due:Io.due,priority:Io.priority,flagged:Io.flagged,mins:{...Qn}}),n=f.getState().dateFormat,a=f.ui.language();return t.useLayoutEffect(()=>{let i=e.current;if(!i)return;let s=be(new Date),c={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},u=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(T,F)=>st(`2030-${String(F+1).padStart(2,"0")}-28`,s,c,a,n))],l=Math.max(...u.map(T=>so(i,"todo-table-cell-btn is-overdue",`<span>${lo(T)}</span><span class="todo-table-time">23:59</span>`)),so(i,"todo-table-sort active",`<span>${lo(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),p=Math.max(...No.map(T=>so(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${lo(Ze(T))}</span>`)),so(i,"todo-table-sort active",`<span>${lo(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=so(i,"todo-table-sort active",`<span>${lo(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),b=T=>so(i,"todo-table-sort active",`<span>${lo(d(T))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(Ni.map(T=>[T,Math.max(Qn[T],b(T==="title"?"todo.table.title":Ii[T]))])),k={due:Math.max(l+10,96),priority:Math.max(p+10,72),flagged:Math.max(g+10,48),mins:m};r(T=>JSON.stringify(T)===JSON.stringify(k)?T:k)},[e,n,a]),o}var qm=360;function Ym(e,o){let[r,n]=t.useState(Io.tags),a=[...new Set(o.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],i=a.join("\0");return t.useLayoutEffect(()=>{let s=e.current;if(!s)return;let c=Math.max(0,...a.map(u=>so(s,"",u.split(`
`).map(l=>`<span class="todo-table-tag">#${lo(l)}</span>`).join(""))));n(Math.min(qm,Math.max(Io.tags,c+12)))},[e,i]),r}var Xm=240,Zm=82,Ii=Object.fromEntries(Kl.map(e=>[e.id,e.labelKey]));function Jm(e){if(!Array.isArray(e))return Hm;let o=[...new Set(e)].filter(r=>r==="title"||Ul.includes(r));return o.includes("title")?o:["title",...o]}function Qm(e){return Array.isArray(e)?No.filter(o=>e.includes(o)):[]}function ef(e){return Ci.includes(e)?e:Ci[0]}function Jn(e,o){let[r,n]=t.useState(()=>o(f.settings.get()[e]));t.useEffect(()=>f.settings.subscribe(()=>n(o(f.settings.get()[e]))),[e,o]);let a=t.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var Vl=()=>Jn("pageColumns",Jm),Bl=e=>e==="title"?"todo.table.title":Ii[e],ea=()=>Jn("pagePriorityFilter",Qm),Ft=({priority:e})=>t.createElement(e==="high"?ti:e==="medium"?$d:e==="low"?oi:Ud,{className:`todo-table-priority-icon todo-priority-${e}`});function tf({label:e,active:o,icon:r,onOpen:n}){return t.createElement("button",{type:"button",className:`todo-page-appbar-btn${o?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function of(){let[e]=xt(),[o]=kt(),n=pt().map(c=>c.id),a=Zn(e,n,o),i=e!=="all"&&a.length!==n.length,s=d("todo.filters.statuses");return t.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":s,title:s,onClick:c=>{f.ui.openPopover(()=>t.createElement($l,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},t.createElement(Ye,null))}function rf(){let[e,o]=ea();return t.createElement("div",{className:"todo-status-filter-menu"},No.map(r=>{let n=e.includes(r);return t.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>o(n?e.filter(a=>a!==r):No.filter(a=>e.includes(a)||a===r))},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(Ft,{priority:r})),t.createElement("span",null,Ze(r)))}))}function Hl(){let[e]=ea();return t.createElement(tf,{label:d("todo.table.priority"),active:e.length>0,icon:t.createElement(eo,null),onOpen:o=>{f.ui.openPopover(()=>t.createElement(rf,null),{anchor:o,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function nf(){let[e,o]=Vl(),r=[...e,...Ul.filter(u=>!e.includes(u))],[n,a]=t.useState(null),[i,s]=t.useState(null),c=(u,l,p)=>{if(u===l)return;let g=r.filter(b=>b!==u);g.splice(g.indexOf(l)+(p?1:0),0,u),o(g.filter(b=>e.includes(b)))};return t.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),s(null)}},t.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),t.createElement("div",{className:"todo-filter-divider"}),r.map((u,l)=>{let p=e.includes(u),g=u==="title",b=d(Bl(u));return t.createElement("div",{key:u,className:`todo-column-option${g?" is-locked":""}${n===u?" is-dragging":""}${i?.id===u?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let k=m.currentTarget.getBoundingClientRect();s({id:u,after:m.clientY>k.top+k.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),s(null)}},t.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:b}),title:d("todo.table.reorderColumn",{p0:b}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",u);let k=m.currentTarget.parentElement;k&&m.dataTransfer.setDragImage(k,12,k.offsetHeight/2),a(u)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let k=r[l+(m.key==="ArrowUp"?-1:1)];k&&c(u,k,m.key==="ArrowDown")}},t.createElement(nr,null)),t.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":p,disabled:g,onClick:()=>o(r.filter(m=>m===u?!p:e.includes(m)))},t.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),t.createElement("span",null,b)))}))}function Wl(){return t.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>t.createElement(nf,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},t.createElement(Kd,null))}function Rl({field:e,label:o,className:r,sort:n,onSort:a,width:i,resize:s,thProps:c}){let u=n.field===e,l=u?n.dir==="asc"?ti:oi:ei;return t.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":u?n.dir==="asc"?"ascending":"descending":"none"},t.createElement("button",{type:"button",className:`todo-table-sort${u?" active":""}`,"aria-label":o,title:o,onClick:()=>a(u?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},t.createElement("span",null,o),t.createElement(l,null)),s)}var Ni=["title","note","group","location","tags"],Qn={title:180,note:120,group:104,location:104,tags:96},ql=900;function af(e){let o=e&&typeof e=="object"?e:{},r={};for(let n of Ni){let a=o[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(ql,Math.max(Qn[n],a))))}return r}function sf({id:e,label:o,min:r,onDrag:n,onCommit:a,onReset:i}){let s=t.useRef(null),c=u=>Math.round(Math.min(ql,Math.max(r,u)));return t.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:o}),title:d("todo.table.resizeColumn",{p0:o}),onClick:u=>u.stopPropagation(),onDoubleClick:u=>{u.stopPropagation(),i(e)},onPointerDown:u=>{if(u.button!==0)return;u.preventDefault(),u.stopPropagation();let l=u.currentTarget.parentElement,p=l?l.getBoundingClientRect().width:Qn[e];s.current={startX:u.clientX,startWidth:p,width:p},u.currentTarget.setPointerCapture?.(u.pointerId),u.currentTarget.classList.add("is-dragging")},onPointerMove:u=>{if(!s.current)return;let l=c(s.current.startWidth+u.clientX-s.current.startX);s.current.width=l,n(e,l)},onPointerUp:u=>{s.current&&(u.currentTarget.classList.remove("is-dragging"),u.currentTarget.releasePointerCapture?.(u.pointerId),a(e,s.current.width),s.current=null)},onPointerCancel:u=>{u.currentTarget.classList.remove("is-dragging"),s.current=null}})}function df({todo:e,onPatch:o}){let[r,n]=t.useState(e.dueDate?.slice(0,10)??""),[a,i]=t.useState(e.startTime??"");return t.createElement("div",{className:"todo-cell-editor"},t.createElement(io,{value:r,onChange:s=>{n(s),s||i(""),o(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),t.createElement(vr,{value:a,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{i(s),o({startTime:s||void 0})}}))}function Yl({initial:e,onInput:o,onDone:r}){return t.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>o(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Xl({todo:e,onPatch:o}){let[r,n]=t.useState(e.tags??[]);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(Xn,{value:r,autoFocus:!0,onChange:a=>{n(a),o({tags:a})}}))}function Zl({todo:e,onPatch:o}){let[r,n]=t.useState(e.location);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(So,{value:r,autoFocus:!0,onChange:a=>{n(a),o({location:a})}}))}var jl='input, button, a, textarea, [contenteditable="true"]';function ta(e){return e.split(`
`).map(o=>o.trim()).find(Boolean)??""}function lf({todo:e,groups:o,columns:r,c:n,selected:a,onPick:i}){let s=t.useRef(null);t.useEffect(()=>s.current?zr(e.id,s.current):void 0,[e.id]);let[c,u]=t.useState("");t.useEffect(()=>{let h=!0;return u(""),Bn(e.title).then(v=>{h&&u(v)}).catch(()=>{h&&u("")}),()=>{h=!1}},[e.title]);let l=ta(e.note),{check:p}=Ei(e,n),g=Fe(e),b=n.pendingIds.has(e.id),m=h=>n.patchTodo(e.id,h),k=be(new Date),T=f.getState().dateFormat,F=e.dueDate?st(e.dueDate,k,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),T):"",_=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<k,[P,x]=t.useState(!1),w=t.useRef(null);t.useEffect(()=>()=>{w.current&&clearTimeout(w.current)},[]);let[M,Y]=t.useState(e.title),$=()=>{let h=M.trim();x(!1),h&&h!==e.title&&m({title:h})},[V,K]=t.useState(null),se=(h,v)=>{K(h),v.catch(()=>{}).finally(()=>K(C=>C===h?null:C))},ce=(h,v,C,G,J=260)=>{se(h,f.ui.openPopover(G,{anchor:v,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:C,width:J}))},oe=(h,v,C)=>V===h?t.createElement("span",{className:"todo-table-placeholder"},v,t.createElement("span",null,C)):null,A=h=>`todo-table-${h}${V===h?" is-editing":""}`,E=h=>{let v=e.note,C=()=>{v!==e.note&&m({note:v})};K("note"),f.ui.openPopover(({close:G})=>t.createElement(Yl,{initial:e.note,onInput:J=>{v=J},onDone:()=>{C(),G()}}),{anchor:h,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(C(),!0)}).catch(()=>{}).finally(()=>K(G=>G==="note"?null:G))},z=h=>{switch(h){case"note":return t.createElement("td",{className:A("note"),title:l||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:v=>E(v.currentTarget)},l?t.createElement("span",{className:"todo-table-note-text"},l):oe("note",null,d("todo.table.note"))));case"group":return t.createElement("td",{className:A("group")},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:v=>se("group",f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>m({group:void 0})},...xe(o).map(C=>({label:C,type:"radio",checked:e.group===C,color:Se(C,o),onSelect:()=>m({group:C})}))],{anchor:v.currentTarget,align:"start"}))},e.group?t.createElement("span",{className:"todo-table-group-pill",title:e.group,style:{"--todo-group-color":ve(Se(e.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),t.createElement("span",{className:"todo-table-group-name"},e.group)):oe("group",null,d("todo.table.group"))));case"priority":return t.createElement("td",{className:A("priority")},t.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:b,title:d("todo.table.priority"),onClick:v=>se("priority",f.ui.openMenu(No.map(C=>({label:Ze(C),icon:t.createElement(Ft,{priority:C}),type:"radio",checked:e.priority===C,onSelect:()=>m({priority:C})})),{anchor:v.currentTarget}))},t.createElement(Ft,{priority:e.priority}),t.createElement("span",null,Ze(e.priority))));case"due":return t.createElement("td",{className:A("due")},t.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${_?" is-overdue":""}`,disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:e.dueDate?Ve(e.dueDate,T):d("todo.field.dueDate"),onClick:v=>ce("due",v.currentTarget,d("todo.field.dueDate"),()=>t.createElement(df,{todo:e,onPatch:C=>{m(C)}}),240)},t.createElement("span",null,F),e.startTime&&t.createElement("span",{className:"todo-table-time"},e.startTime)));case"flagged":return t.createElement("td",{className:A("flagged")},t.createElement("button",{type:"button",className:`todo-table-flag-btn${e.flagged?" on":""}`,"aria-pressed":!!e.flagged,disabled:b,"aria-label":d("todo.flag"),title:d(e.flagged?"todo.flagged":"todo.flag"),onClick:()=>m({flagged:!e.flagged})},t.createElement(Oe,null)));case"location":return t.createElement("td",{className:A("location")},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:e.location?.name??d("todo.field.location"),onClick:v=>ce("location",v.currentTarget,d("todo.field.location"),()=>t.createElement(Zl,{todo:e,onPatch:C=>{m(C)}}),300)},e.location?t.createElement(t.Fragment,null,t.createElement(et,null),t.createElement("span",null,e.location.name)):oe("location",t.createElement(et,null),d("todo.field.location"))));case"tags":return t.createElement("td",{className:A("tags"),title:e.tags?.map(v=>`#${v}`).join(" ")||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:b,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:v=>ce("tags",v.currentTarget,d("todo.edit.tags"),()=>t.createElement(Xl,{todo:e,onPatch:C=>{m(C)}}),280)},e.tags?.length?e.tags.map(v=>t.createElement("span",{key:v,className:"todo-table-tag"},"#",v)):oe("tags",null,d("todo.table.tags"))))}};return t.createElement("tr",{ref:s,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}${V?" is-editing":""}`,"data-todo-id":e.id,"data-status":g,"aria-selected":a,tabIndex:0,onContextMenu:h=>Wn(h,{todo:e,groupNames:xe(o),setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>ft(e,n.removeTodo),disabled:b}),onKeyDown:h=>{if(h.target===h.currentTarget)if(h.key==="ArrowDown"||h.key==="ArrowUp"){h.preventDefault();let v=h.key==="ArrowDown"?h.currentTarget.nextElementSibling:h.currentTarget.previousElementSibling;for(;v&&!v.classList.contains("todo-table-row");)v=h.key==="ArrowDown"?v.nextElementSibling:v.previousElementSibling;v?.focus()}else h.key==="Enter"?(h.preventDefault(),n.openDetail(e.id)):h.key===" "?(h.preventDefault(),i(!1)):h.key==="Escape"&&h.currentTarget.blur()},onClick:h=>{h.target.closest(jl)||(f.ui.hasModKey(h)||h.shiftKey)&&i(h.shiftKey)},onDoubleClick:h=>{let v=!!h.target.closest(".todo-table-title-btn");v&&w.current&&(clearTimeout(w.current),w.current=null),!(!v&&h.target.closest(jl)||f.ui.hasModKey(h)||h.shiftKey)&&n.openDetail(e.id)}},t.createElement("td",{className:"todo-table-select"},p),r.map(h=>t.createElement(t.Fragment,{key:h},h==="title"?t.createElement("td",{className:"todo-table-title"},P?t.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:M,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:v=>Y(v.target.value),onBlur:$,onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="Enter"?(v.preventDefault(),$()):v.key==="Escape"&&(v.preventDefault(),Y(e.title),x(!1)))}}):t.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:b,"aria-label":d("todo.table.editTitle",{p0:e.title}),onClick:v=>{if(f.ui.hasModKey(v)||v.shiftKey){i(v.shiftKey);return}v.detail>1||(w.current&&clearTimeout(w.current),w.current=setTimeout(()=>{w.current=null,Y(e.title),x(!0)},220))}},c?t.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:c}}):t.createElement("span",{className:"todo-table-title-text"},e.title))):z(h))),t.createElement("td",{className:"todo-table-actions"},e.flagged&&!r.includes("flagged")&&t.createElement("span",{className:"todo-table-flag",title:d("todo.flagged")},t.createElement(Oe,null)),t.createElement(qn,{todo:e,groupNames:xe(o),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>ft(e,n.removeTodo),disabled:b})))}function cf(e){return e.split(/\r?\n/).map(o=>o.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Jl({todos:e,groups:o,c:r,sort:n,onSort:a,resetKey:i,empty:s,sectionOf:c,composeSignal:u=0,newTaskPatch:l}){let[p,g]=Vl(),b=p.filter(D=>D!=="title"),[m,k]=t.useState(null),[T,F]=t.useState(null),_=D=>({className:`${m===D?" is-dragging":""}${T?.id===D?T.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:I=>{if(I.target.closest(".todo-col-resize")){I.preventDefault();return}I.dataTransfer.effectAllowed="move",I.dataTransfer.setData("text/plain",D);let j=I.currentTarget.ownerDocument,Q=j.createElement("div");Q.className="todo-col-drag-chip",Q.textContent=d(Bl(D)),j.body.appendChild(Q),I.dataTransfer.setDragImage?.(Q,Math.round(Q.offsetWidth/2),Math.round(Q.offsetHeight/2)),window.setTimeout(()=>Q.remove(),0),k(D)},onDragOver:I=>{if(!m||m===D)return;I.preventDefault(),I.dataTransfer.dropEffect="move";let j=I.currentTarget.getBoundingClientRect();F({id:D,after:I.clientX>j.left+j.width/2})},onDrop:I=>{if(I.preventDefault(),m&&T&&m!==T.id){let j=p.filter(Q=>Q!==m);j.splice(j.indexOf(T.id)+(T.after?1:0),0,m),g(j)}k(null),F(null)},onDragEnd:()=>{k(null),F(null)}}}),P=t.useRef(null),x=Wm(P),[w,M]=Jn("pageColumnWidths",af),[Y,$]=t.useState({}),V=Ym(P,e),K=Object.fromEntries(Object.entries({tags:V,...w,...Y}).map(([D,I])=>[D,Math.max(I,x.mins[D])])),se=D=>D==="due"?x.due:D==="priority"?x.priority:D==="flagged"?x.flagged:K[D]??Io[D],[ce,oe]=Jn("pageRowsPerPage",ef),[A,E]=t.useState(!1),[z,h]=t.useState(""),[v,C]=t.useState({}),G=t.useRef(null),J=t.useRef(null),le=t.useRef(!1),[ee,te]=t.useState(!0),ne=t.useRef(null);t.useEffect(()=>{u&&(E(!0),ae(0),ne.current?.scrollTo?.({top:0}),window.setTimeout(()=>G.current?.focus(),0))},[u]);let S=async D=>{let I=be(new Date);for(let j of D){let Q=an(j,I);if(!Q.title)continue;let ye=Q.dueDate||v.dueDate;await r.create(Q.title,void 0,{patch:{...l?.(),priority:Q.priority!=="normal"?Q.priority:v.priority??Q.priority,...ye?{dueDate:ye}:{},...v.group?{group:v.group}:{},...v.flagged?{flagged:!0}:{},...v.note?.trim()?{note:v.note}:{},...v.location?{location:v.location}:{},...v.tags?.length?{tags:v.tags}:{},...v.status?Ne(v.status):{}}})}h(""),G.current?.focus()},O=()=>{h(""),C({}),te(!0),E(!1)},R=!z.trim()&&!Object.values(v).some(D=>Array.isArray(D)?D.length>0:D!=null&&D!==""),y=()=>{window.setTimeout(()=>{let D=J.current?.ownerDocument;le.current||!D||!D.hasFocus()||J.current?.contains(D.activeElement)||(R?O():te(!1))},0)};t.useEffect(()=>{if(!A)return;let D=j=>{le.current||J.current?.contains(j.target)||(R?O():te(!1))},I=J.current?.ownerDocument;return I?.addEventListener("pointerdown",D,!0),()=>I?.removeEventListener("pointerdown",D,!0)});let L=D=>{le.current=!0,D.catch(()=>{}).finally(()=>{le.current=!1,G.current?.focus()})},W=D=>{switch(D){case"due":{let I=v.dueDate,j=I?st(I,be(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"";return t.createElement("td",{key:D,className:"todo-table-due"},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:Q=>L(f.ui.openPopover(({close:ye})=>t.createElement("div",{className:"todo-cell-editor"},t.createElement(io,{value:I??"",onChange:uo=>{C(At=>({...At,dueDate:uo||void 0})),ye()}})),{anchor:Q.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},j?t.createElement("span",null,j):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let I=v.priority??"normal";return t.createElement("td",{key:D,className:"todo-table-priority"},t.createElement("button",{type:"button",className:`todo-table-cell-btn${I==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:j=>L(f.ui.openMenu(No.map(Q=>({label:Ze(Q),icon:t.createElement(Ft,{priority:Q}),type:"radio",checked:I===Q,onSelect:()=>C(ye=>({...ye,priority:Q}))})),{anchor:j.currentTarget}))},t.createElement(Ft,{priority:I}),t.createElement("span",null,Ze(I))))}case"group":return t.createElement("td",{key:D,className:"todo-table-group"},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:I=>L(f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!v.group,onSelect:()=>C(j=>({...j,group:void 0}))},...xe(o).map(j=>({label:j,type:"radio",checked:v.group===j,color:Se(j,o),onSelect:()=>C(Q=>({...Q,group:j}))}))],{anchor:I.currentTarget,align:"start"}))},v.group?t.createElement("span",{className:"todo-table-group-pill",title:v.group,style:{"--todo-group-color":ve(Se(v.group,o))}},t.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),t.createElement("span",{className:"todo-table-group-name"},v.group)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return t.createElement("td",{key:D,className:"todo-table-flagged"},t.createElement("button",{type:"button",className:`todo-table-flag-btn${v.flagged?" on":""}`,"aria-pressed":!!v.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>C(I=>({...I,flagged:!I.flagged||void 0}))},t.createElement(Oe,null)));case"note":return t.createElement("td",{key:D,className:"todo-table-note",title:v.note||void 0},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:I=>{let j=v.note??"",Q=()=>C(ye=>({...ye,note:j||void 0}));L(f.ui.openPopover(({close:ye})=>t.createElement(Yl,{initial:v.note??"",onInput:uo=>{j=uo},onDone:()=>{Q(),ye()}}),{anchor:I.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(Q(),!0)}))}},v.note?t.createElement("span",{className:"todo-table-note-text"},ta(v.note)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return t.createElement("td",{key:D,className:"todo-table-location"},t.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:I=>L(f.ui.openPopover(()=>t.createElement(Zl,{todo:{location:v.location},onPatch:j=>C(Q=>({...Q,location:j.location}))}),{anchor:I.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},v.location?t.createElement(t.Fragment,null,t.createElement(et,null),t.createElement("span",null,v.location.name)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return t.createElement("td",{key:D,className:"todo-table-tags"},t.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:I=>L(f.ui.openPopover(()=>t.createElement(Xl,{todo:{tags:v.tags??[]},onPatch:j=>C(Q=>({...Q,tags:j.tags}))}),{anchor:I.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},v.tags?.length?v.tags.map(I=>t.createElement("span",{key:I,className:"todo-table-tag"},"#",I)):t.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return t.createElement("td",{key:D,className:`todo-table-${D}`})}},ue=v.status?mt().find(D=>D.status===v.status):void 0,B=D=>L(f.ui.openMenu(mt().map(I=>({label:I.label,icon:t.createElement(ke,{status:I.status,dotCls:I.cls,color:I.color}),type:"radio",checked:I.status===null?!v.status:I.status===v.status,onSelect:()=>C(j=>({...j,status:I.status}))})),{anchor:D})),[U,ae]=t.useState(0),[De,$e]=t.useState(i);De!==i&&($e(i),ae(0));let[Xe,Gt]=t.useState(()=>new Set),Po=t.useRef(null),ot=Math.max(1,Math.ceil(e.length/ce)),Re=Math.min(U,ot-1),St=e.slice(Re*ce,(Re+1)*ce),rt=t.useMemo(()=>e.filter(D=>Xe.has(D.id)),[e,Xe]),Sr=t.useMemo(()=>e.reduce((D,I)=>D+(I.completed?1:0),0),[e]),Oo=ze(),Mo=t.useSyncExternalStore(Oo.subscribe,Oo.get,Oo.get),_o=t.useCallback(D=>{let I=e.findIndex(j=>j.id===D);I>=0&&ae(Math.floor(I/ce))},[e,ce]);t.useLayoutEffect(()=>{Mo?.todoId&&_o(Mo.todoId)},[Mo,_o]),t.useLayoutEffect(()=>{r.editingId&&_o(r.editingId)},[r.editingId]);let co=(D,I)=>{Gt(j=>{let Q=new Set(j);for(let ye of D)I?Q.add(ye):Q.delete(ye);return Q})},zi=(D,I)=>{let j=St.findIndex(ye=>ye.id===D),Q=I?St.findIndex(ye=>ye.id===Po.current):-1;Q>=0?co(St.slice(Math.min(Q,j),Math.max(Q,j)+1).map(ye=>ye.id),!0):co([D],!Xe.has(D)),Po.current=D},ia=()=>{for(let D of rt)r.patchTodo(D.id,Ne("completed"));Gt(new Set)},Ar=async()=>{let D=rt.map(j=>j.id);await f.ui.confirm({title:d("todo.table.deleteTitle",{count:D.length}),message:d("todo.table.deleteMessage",{count:D.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(D.map(j=>r.removeTodo(j))),Gt(new Set))},zo=(D,I)=>t.createElement(sf,{id:D,label:I,min:x.mins[D],onDrag:(j,Q)=>$(ye=>({...ye,[j]:Q})),onCommit:(j,Q)=>{$({}),M({...w,[j]:Q})},onReset:j=>{$({});let Q={...w};delete Q[j],M(Q)}}),Er=D=>{let I=d(Ii[D]),j=Ni.includes(D);return t.createElement(Rl,{field:D==="note"?"notes":D,label:I,className:`todo-table-${D}${_(D).className}`,thProps:_(D).props,sort:n,onSort:a,width:j?K[D]:void 0,resize:j?zo(D,I):void 0})},N=3+b.length,H=t.useMemo(()=>{if(!c)return null;let D=new Map;for(let I of e){let j=c(I);D.set(j,(D.get(j)??0)+1)}return D},[e,c]),pe=[],Ge=null;for(let D of St){let I=c?.(D)??null;I&&I!==Ge&&pe.push(t.createElement("tr",{className:`todo-table-section todo-table-section-${I}`,key:`section:${I}`},t.createElement("td",{className:"todo-table-select"},t.createElement("span",{className:"todo-table-section-text"},t.createElement("span",{className:"todo-table-section-label"},d(cd[I])),t.createElement("span",{className:"todo-table-section-count"},H?.get(I)??0))),p.map(j=>t.createElement("td",{key:j,className:`todo-table-${j}`})),t.createElement("td",{className:"todo-table-actions"}))),Ge=I,pe.push(t.createElement(lf,{key:D.id,todo:D,groups:o,columns:p,c:r,selected:Xe.has(D.id),onPick:j=>zi(D.id,j)}))}return t.createElement("div",{className:"todo-table-shell"},t.createElement("div",{className:"todo-table-scroll",ref:ne},t.createElement("table",{ref:P,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:Zm+(K.title??Xm)+b.reduce((D,I)=>D+se(I),0),"--todo-due-width":`${x.due}px`,"--todo-priority-width":`${x.priority}px`,"--todo-flagged-width":`${x.flagged}px`}},t.createElement("thead",null,t.createElement("tr",null,t.createElement("th",{className:"todo-table-select"},t.createElement(of,null)),p.map(D=>t.createElement(t.Fragment,{key:D},D==="title"?t.createElement(Rl,{field:"name",label:d("todo.table.title"),className:`todo-table-title${_("title").className}`,thProps:_("title").props,sort:n,onSort:a,width:K.title,resize:zo("title",d("todo.table.title"))}):Er(D))),t.createElement("th",{className:"todo-table-actions",style:K.title?{width:"auto",minWidth:48}:void 0}))),t.createElement("tbody",null,A&&t.createElement("tr",{className:"todo-table-new-row"+(ee?"":" is-idle"),ref:J,onBlur:y,onFocus:()=>te(!0)},t.createElement("td",{className:"todo-table-select"},t.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:ue?.label??d("todo.table.status"),onClick:D=>B(D.currentTarget)},ue?t.createElement(ke,{status:ue.status,dotCls:ue.cls}):t.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),p.map(D=>D==="title"?t.createElement("td",{key:D,className:"todo-table-title"},t.createElement("input",{ref:G,className:"todo-table-new-input",value:z,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:I=>h(I.target.value),onKeyDown:I=>{I.nativeEvent.isComposing||(I.key==="Enter"?(I.preventDefault(),z.trim()?S([z]):O()):I.key==="Escape"&&(I.preventDefault(),O()))},onPaste:I=>{let j=I.clipboardData.getData("text/plain");/\r?\n/.test(j.trim())&&(I.preventDefault(),S(cf(`${z}${j}`)))}})):W(D)),t.createElement("td",{className:"todo-table-actions"})),pe)),!St.length&&!A&&t.createElement("div",{className:"todo-table-empty-state"},s)),t.createElement("div",{className:"todo-table-footer"},t.createElement("div",{className:"todo-table-selection"},t.createElement("span",null,rt.length?d("todo.table.selectedCount",{count:rt.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!rt.length&&t.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:Sr})),rt.length>0&&t.createElement(t.Fragment,null,t.createElement("button",{type:"button",className:"todo-table-bulk",onClick:ia},d("todo.table.complete")),t.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{Ar()}},d("auto.f6fdbe48dc54")))),t.createElement("div",{className:"todo-table-pagination"},t.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),t.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:D=>{f.ui.openMenu(Ci.map(I=>({label:String(I),type:"radio",checked:I===ce,onSelect:()=>{oe(I),ae(0)}})),{anchor:D.currentTarget,align:"start"})}},t.createElement("span",null,ce),t.createElement(ei,null)),ot>1&&t.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:Re+1,pages:ot})),ot>1&&t.createElement("div",{className:"todo-table-pager"},t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:Re===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>ae(0)},t.createElement(Rd,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:Re===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>ae(Re-1)},t.createElement(xn,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:Re>=ot-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>ae(Re+1)},t.createElement(kn,null)),t.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:Re>=ot-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>ae(ot-1)},t.createElement(jd,null))))))}function Li(e,o=500,r){let n=t.useRef(e);n.current=e;let a=t.useRef(null),i=t.useRef(!1),s=t.useRef(null),c=t.useRef(0),u=t.useRef(r);u.current=r;let l=t.useCallback(async()=>{if(i.current)return;let p=a.current;if(p!==null){a.current=null,i.current=!0;try{let g=await n.current(p);!g&&a.current===null&&(a.current=p),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=p),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?s.current=window.setTimeout(()=>{l()},250):a.current!==null&&u.current?.()}}},[]);return t.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),l()},[l]),t.useCallback(p=>{a.current=p,c.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,l()},o)},[l,o])}function uf({value:e,onCommit:o,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,c]=t.useState(e),u=t.useRef(!1);t.useEffect(()=>{u.current||c(e)},[e]);let l=()=>{s!==e&&o(s)};return t.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{u.current=!0},onChange:p=>c(p.target.value),onBlur:()=>{u.current=!1,l()},onKeyDown:p=>{p.key==="Enter"&&p.currentTarget.blur(),p.key==="Escape"&&(c(e),p.currentTarget.blur())}})}function pf(e){let o=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=o.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},o.set(e,r)),r}var mf=({todoId:e,c:o,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=f.ui.settings,[c,u]=t.useState(Te);t.useEffect(()=>_t(u),[]);let l=c.find(y=>y.id===e),p=Hs(e),g=We(),[b,m]=t.useState(!1),[k,T]=t.useState(!1),[F,_]=t.useState(!1),[P,x]=t.useState(!1),w=t.useRef(null),[M,Y]=t.useState(""),$=pf(e),V=t.useSyncExternalStore(t.useCallback(y=>($.listeners.add(y),()=>{$.listeners.delete(y)}),[$]),()=>$.value,()=>$.value),K=t.useCallback(y=>{$.value={...$.value,...y};for(let L of $.listeners)L()},[$]),se=V.title,ce=y=>K({title:y}),oe=()=>K({error:d("todo.error.saveDraft")});t.useEffect(()=>{$.revision||$.loadingRevision||($.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(y=>{y&&!$.revision&&($.revision={expectedRevision:y.revision,realmGeneration:y.realmGeneration})}).catch(()=>{K({error:d("todo.error.saveDraft")})}).finally(()=>{$.loadingRevision=void 0}))},[$,e,K]);let A=async y=>($.revision||await $.loadingRevision,$.revision?o.patchTodo(e,y,$.revision):!1),E=Li(async y=>{let L=y.trim()?await A({title:y}):!0;return L&&$.value.title===y&&K({title:null,error:""}),L},500,oe),z=Li(async y=>{let L=await A({note:y});return L&&$.value.note===y&&K({note:null,error:""}),L},500,oe),h=Li(async y=>{let L=JSON.parse(y),W=await A({tags:L});return W&&JSON.stringify($.value.tags)===y&&K({tags:null,error:""}),W},0,oe);if(t.useEffect(()=>{!l&&!o.loading&&r()},[l,o.loading,r]),!l)return null;let v=y=>{A(y).then(L=>{L||oe()})},C=y=>{K({tags:y}),h(JSON.stringify(y))},G=y=>v({attachments:y.length?y:void 0}),J=y=>v({urls:y.length?y:void 0}),le=xe(g);w.current||(w.current=structuredClone(l));let ee=()=>{let y=w.current;y&&(E(y.title),z(y.note),v({tags:y.tags,status:y.status,completed:y.completed,priority:y.priority,dueDate:y.dueDate,startTime:y.startTime,endTime:y.endTime,group:y.group,location:y.location,flagged:y.flagged,attachments:y.attachments,urls:y.urls,filePath:y.filePath})),K({title:null,note:null,tags:null,error:""}),r()},te=Fe(l),ne=bf(),S=l.dueDate?`${st(l.dueDate.slice(0,10),ne,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat)}${l.startTime?` \xB7 ${l.startTime}${l.endTime?`\u2013${l.endTime}`:""}`:""}`:"",O=(y,L,W,ue=300)=>{f.ui.openPopover(W,{anchor:y,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:L,width:ue})},R=(y,L,W,ue,B,U="")=>t.createElement("button",{key:y,type:"button",className:`todo-sheet-chip${W?"":" is-empty"}${U?` ${U}`:""}`,"aria-label":W?`${ue}: ${W}`:ue,title:y==="place"&&l.location?l.location.name:void 0,onClick:ae=>B(ae.currentTarget)},L,t.createElement("span",null,W||ue));return t.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:t.createElement("div",{className:"todo-detail-footer"},t.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),ft(l,o.removeTodo).then(y=>{y||o.openDetail(l.id)})}},t.createElement(yt,null),d("auto.f6fdbe48dc54")),t.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:ee},d("auto.77dfd2135f4d")),t.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},t.createElement("div",{className:"todo-sheet"},V.error&&t.createElement("p",{role:"alert"},V.error),t.createElement("div",{className:"todo-sheet-head"},t.createElement("button",{type:"button",className:"todo-sheet-status","data-status":te,title:nt(te),"aria-label":`${d("auto.bae7d5be7082")}: ${nt(te)}`,onClick:y=>Tr(y.currentTarget,l,L=>v(L))},t.createElement(ke,{status:te==="open"?null:te,dotCls:Ae(te).cls})),t.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:se??l.title,"aria-label":d("auto.c5e8306a511f"),onChange:y=>{ce(y.target.value),E(y.target.value)},onBlur:()=>{se===l.title&&ce(null)},onKeyDown:y=>{y.key==="Enter"&&r()}}),t.createElement("button",{className:`todo-sheet-flag${l.flagged?" on":""}`,type:"button",onClick:()=>v({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},t.createElement(Oe,null))),t.createElement("textarea",{className:"todo-sheet-notes",value:V.note??l.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:y=>{let L=y.target.value;K({note:L}),z(L)}}),t.createElement("div",{className:"todo-sheet-chips"},R("status",t.createElement(ke,{status:te==="open"?null:te,dotCls:Ae(te).cls}),te==="open"?"":nt(te),d("auto.bae7d5be7082"),y=>Tr(y,l,L=>v(L))),R("due",t.createElement(lt,null),S,d("todo.sheet.date"),y=>O(y,d("todo.edit.schedule"),()=>t.createElement(ff,{todo:l,onPatch:v}),280),l.dueDate&&l.dueDate.slice(0,10)<ne&&!l.completed?"is-overdue":""),R("group",t.createElement("span",{className:"todo-sheet-dot",style:l.group?{background:ve(Se(l.group,g))}:void 0}),l.group??"",d("todo.edit.group"),y=>{f.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!l.group,onSelect:()=>v({group:void 0})},...le.map(L=>({label:L,type:"radio",checked:l.group===L,color:Se(L,g),onSelect:()=>v({group:L})}))],{anchor:y,align:"start"})}),R("place",t.createElement(et,null),l.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),y=>O(y,d("todo.location"),()=>t.createElement(gf,{todo:l,onPatch:v}),320)),R("priority",t.createElement(Ft,{priority:l.priority}),l.priority==="normal"?"":Ze(l.priority),d("auto.886cbff9d9df"),y=>{f.ui.openMenu(qe.map(L=>({label:Ze(L.id),icon:t.createElement(Ft,{priority:L.id}),type:"radio",checked:l.priority===L.id,onSelect:()=>v({priority:L.id})})),{anchor:y,align:"start"})})),t.createElement(Xn,{value:V.tags??l.tags??[],onChange:C,bare:!0}),((l.attachments??[]).length>0||b)&&t.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(l.attachments??[]).map(y=>t.createElement(Tl,{key:y,relPath:y,onRemove:()=>G((l.attachments??[]).filter(L=>L!==y))})),b&&t.createElement(Ti,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>m(!1),onPick:y=>{(l.attachments??[]).includes(y)||G([...l.attachments??[],y]),m(!1)}})),((l.urls??[]).length>0||k||l.filePath||F)&&t.createElement("div",{className:"todo-sheet-section"},l.filePath&&t.createElement("div",{className:"todo-detail-url-card"},t.createElement("button",{className:"todo-detail-url-open",type:"button",title:l.filePath,onClick:y=>f.workspace.openFile(l.filePath,void 0,{newTab:f.ui.hasModKey(y)})},t.createElement(wt,null),t.createElement("span",null,l.filePath.split("/").pop()),t.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),t.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>v({filePath:void 0})},t.createElement(Ee,null))),F&&!l.filePath&&t.createElement(Ti,{placeholder:d("todo.file.searchLinked"),onCancel:()=>_(!1),onPick:y=>{v({filePath:y}),_(!1)}}),(l.urls??[]).map(y=>t.createElement("div",{className:"todo-detail-url-card",key:y},t.createElement("button",{className:"todo-detail-url-open",type:"button",title:y,onClick:L=>{let W=wo(y);W?f.workspace.openFile(W,void 0,{newTab:f.ui.hasModKey(L)}):f.files.openExternalUrl(y)}},t.createElement(to,null),t.createElement("span",null,hf(y))),t.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:y}),onClick:()=>J((l.urls??[]).filter(L=>L!==y))},t.createElement(Ee,null)))),k&&t.createElement(uf,{className:"todo-detail-link-input todo-detail-url",value:M,onCommit:y=>{let L=qr(y);L&&!(l.urls??[]).includes(L)&&J([...l.urls??[],L]),Y(""),T(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),P&&p.length>0&&t.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...p].reverse().map((y,L)=>t.createElement("li",{key:`${y.changedAt}:${L}`},t.createElement("span",null,nt(y.from)," \u2192 ",nt(y.to)),t.createElement("time",{dateTime:y.changedAt},new Date(y.changedAt).toLocaleString(f.ui.language()))))),t.createElement("div",{className:"todo-sheet-adds"},t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},t.createElement(Mt,null)," ",d("todo.sheet.attachment")),t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>T(!0)},t.createElement(to,null)," ",d("todo.sheet.link")),!l.filePath&&t.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>_(!0)},t.createElement(wt,null)," ",d("todo.linkedFile")),p.length>0&&t.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":P,onClick:()=>x(y=>!y)},d("todo.activity")," (",p.length,")"))))};function ff({todo:e,onPatch:o}){let[r,n]=t.useState(e.dueDate?.slice(0,10)??""),[a,i]=t.useState(e.startTime??""),[s,c]=t.useState(e.endTime??"");return t.createElement("div",{className:"todo-cell-editor"},t.createElement(io,{value:r,onChange:u=>{n(u),u||(i(""),c("")),o(u?{dueDate:u}:{dueDate:"",startTime:void 0,endTime:void 0})}}),t.createElement("div",{className:"todo-sheet-times"},t.createElement(vr,{value:a,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:u=>{i(u),o({startTime:u||void 0,...u?{}:{endTime:void 0}}),u||c("")}}),t.createElement(vr,{value:s,disabled:!a,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:u=>{if(u&&a&&u<=a){c(s);return}c(u),o({endTime:u||void 0})}})))}function gf({todo:e,onPatch:o}){let[r,n]=t.useState(e.location);return t.createElement("div",{className:"todo-cell-editor"},t.createElement(So,{value:r,autoFocus:!0,onChange:a=>{n(a),o({location:a})}}))}function hf(e){try{let o=new URL(e),r=`${o.pathname==="/"?"":o.pathname}${o.search}${o.hash}`;return`${o.hostname.replace(/^www\./,"")}${r}`}catch{return e}}function bf(){let e=new Date,o=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${o}-${r}`}var Lo=({c:e})=>e.editingId?t.createElement(mf,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function yf(e){for(let o=e;o;o=o.parentElement)if(/(auto|scroll)/.test(getComputedStyle(o).overflowY)&&(!o.clientHeight||o.scrollHeight>o.clientHeight+1))return o;return e.ownerDocument.scrollingElement??e}function wf(e,o,r=320){let n=o.top-r,a=o.top+o.height+r,i=0,s=e.length;for(;i<s;){let u=i+s>>>1;e[u].start+e[u].height<n?i=u+1:s=u}let c=i;for(s=e.length;i<s;){let u=i+s>>>1;e[u].start<=a?i=u+1:s=u}return[c,i]}function oa(e,o){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=o,s=o.enabled??r.length>80,c=e.useRef(null),u=e.useRef(new Map),[l,p]=e.useReducer(E=>E+1,0),[g,b]=e.useState({top:0,height:600}),[m,k]=e.useState(null),[T,F]=e.useState(null),_=e.useRef(null),P=e.useRef(null),x=e.useRef(null),w=e.useMemo(()=>{let E=0;return r.map((z,h)=>{let v=u.current.get(z)??(typeof n=="number"?n:n(z,h)),C={id:z,height:v,start:E};return E+=v,C})},[r,n,l]),M=w.length?w[w.length-1].start+w[w.length-1].height:0,Y=e.useRef({rows:w,viewport:g});Y.current={rows:w,viewport:g};let $=e.useCallback(()=>{let E=c.current,z=_.current;if(!E||!z)return;let h=E.getBoundingClientRect(),v=z.getBoundingClientRect(),C=z.clientHeight||v.height||600,G=z===E?z.scrollTop:v.top-h.top;b(J=>J.top===G&&J.height===C?J:{top:G,height:C})},[]),V=e.useCallback(()=>{P.current===null&&(P.current=(x.current??window).requestAnimationFrame(()=>{P.current=null,$()}))},[$]);e.useLayoutEffect(()=>{let E=c.current;if(!E||!s)return;let z=yf(E);_.current=z;let h=E.ownerDocument.defaultView??window;x.current=h;let v=E.style.overflowAnchor;E.style.overflowAnchor="none";let C=!0,G=()=>{if(!C)return;let te=E.ownerDocument.activeElement,ne=te instanceof HTMLElement?te:null;for(;ne&&ne.parentElement!==E;)ne=ne.parentElement;k(ne?.dataset.visibleKey??null)},J=()=>{queueMicrotask(G)};z.addEventListener("scroll",V,{passive:!0}),h.addEventListener("resize",V),E.addEventListener("focusin",G),E.addEventListener("focusout",J);let le=E.clientWidth,ee=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{E.clientWidth!==le&&(le=E.clientWidth,u.current.clear(),p()),V()});return ee?.observe(z),z!==E&&ee?.observe(E),$(),()=>{C=!1,E.style.overflowAnchor==="none"&&(E.style.overflowAnchor=v),z.removeEventListener("scroll",V),h.removeEventListener("resize",V),E.removeEventListener("focusin",G),E.removeEventListener("focusout",J),ee?.disconnect(),P.current!==null&&h.cancelAnimationFrame(P.current),P.current=null,_.current=null,x.current=null}},[s,$,V]),e.useLayoutEffect(()=>{let E=new Set(r);for(let z of u.current.keys())E.has(z)||u.current.delete(z);$()},[r,$]),e.useLayoutEffect(()=>{u.current.clear(),p()},[i]),e.useLayoutEffect(()=>{let E=c.current;if(!E||!s)return;let z=C=>{let G=0,J=!1,{rows:le,viewport:ee}=Y.current,te=new Map(le.map(ne=>[ne.id,ne]));for(let ne of C){let S=ne.dataset.visibleKey,O=S?te.get(S):void 0,R=ne.getBoundingClientRect().height;!S||!O||R<=0||Math.abs(R-O.height)<.5||(u.current.set(S,R),O.start+O.height<=ee.top&&(G+=R-O.height),J=!0)}if(J){let ne=_.current,S=E.closest('[data-visible-sections="true"]'),O=E;for(;O&&O.parentElement!==S;)O=O.parentElement;let R=S&&S!==E&&O&&ne&&O.getBoundingClientRect().bottom<=ne.getBoundingClientRect().top;G&&ne&&!R&&(ne.scrollTop+=G),p(),V()}},h=Array.from(E.children).filter(C=>C.hasAttribute("data-visible-key")),v=typeof ResizeObserver>"u"?void 0:new ResizeObserver(C=>z(C.map(G=>G.target)));return h.forEach(C=>v?.observe(C)),z(h),()=>v?.disconnect()}),e.useLayoutEffect(()=>{if(!T)return;let E=Array.from(c.current?.children??[]).find(z=>z.dataset.visibleKey===T.id);E&&(E.scrollIntoView?.({block:"nearest"}),T.selector&&(E.matches(T.selector)?E:E.querySelector(T.selector))?.focus(),$(),F(null))},[T,w,$]);let K=e.useCallback((E,z)=>{F({id:E,selector:z})},[]),[se,ce]=s?wf(w,g):[0,w.length],oe=new Set;for(let E=se;E<ce;E++)oe.add(E);let A=new Set([...a,m,T?.id].filter(Boolean));return A.size&&w.forEach((E,z)=>{A.has(E.id)&&oe.add(z)}),{ref:c,show:K,render(E){let z=[],h=0;for(let v of[...oe].sort((C,G)=>C-G)){let C=w[v];C.start>h&&z.push(e.createElement("div",{key:`space:${C.id}`,"aria-hidden":!0,style:{height:C.start-h,flex:"0 0 auto",pointerEvents:"none"}})),z.push(e.createElement(e.Fragment,{key:C.id},E(v))),h=C.start+C.height}return M>h&&z.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:M-h,flex:"0 0 auto",pointerEvents:"none"}})),z}}}var Ql=({todos:e,groups:o,compact:r,hideDate:n=!1,c:a})=>{let i=ze(),s=t.useSyncExternalStore(i.subscribe,i.get,i.get),c=t.useMemo(()=>e.map(g=>g.id),[e]),u=oa(t,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),l=u.show;t.useLayoutEffect(()=>{s&&c.includes(s.todoId)&&l(s.todoId)},[s,c,l]);let p=t.useCallback((g,b)=>{let m=e[Math.max(0,Math.min(e.length-1,g+b))];m&&l(m.id,".todo-row")},[e,l]);return t.createElement("div",{className:"todo-list-rows",ref:u.ref},u.render(g=>t.createElement(Gl,{key:e[g].id,todo:e[g],groups:o,compact:r,c:a,hideDate:n,onMoveFocus:b=>p(g,b)})))};function ec({sections:e,c:o,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let c=ze(),u=t.useSyncExternalStore(c.subscribe,c.get,c.get),l=t.useMemo(()=>e.map(_=>_.key),[e]),[p,g]=t.useState(null),b=new Set([o.editingId,o.menuId,o.lastCreatedId,u?.todoId,p].filter(Boolean)),m=e.filter(_=>_.todos.some(P=>b.has(P.id))).map(_=>_.key),k=t.useCallback((_,P)=>a?.(e[P])??32+e[P].todos.length*(r?52:84),[e,r,a]),T=oa(t,{ids:l,estimate:k,pinned:m,layoutKey:i??r}),F=T.show;return t.useLayoutEffect(()=>{if(!u)return;let _=e.find(P=>P.todos.some(x=>x.id===u.todoId));_&&F(_.key)},[u,e,F]),t.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:T.ref,onDragStartCapture:_=>g(_.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},T.render(_=>t.cloneElement(s(e[_]),{"data-visible-key":l[_]})))}function vf(e,o,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return Zt(`${o}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=Zt(o),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:dd(i),p0:`${rn(o,a,n)} \u2013 ${rn(dt(s),a,n)}`})}return o===Pt(r,-1)?d("todo.due.yesterday"):o===r?d("todo.due.today"):o===Pt(r,1)?d("todo.due.tomorrow"):rn(o,a,n)}function ra({todos:e,groups:o,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let c=dt(),{shortDateFormat:u}=ct("shortDateFormat"),l=f.ui.language(),p=t.useMemo(()=>{if(!s)return qa(e,a,tr(i));let g=new Map(e.map(m=>[m,Ha(m)])),b=[...e].sort((m,k)=>g.get(k).localeCompare(g.get(m)));return qa(b,a,tr(i),{dateOf:m=>Wa(g.get(m))})},[a,s,e,i]);return t.createElement(ec,{className:"todo-panel-date-sections",sections:p,c:n,compact:r},g=>t.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},t.createElement("div",{className:"todo-panel-date-head"},vf(g.kind,g.key,c,u,l)),t.createElement(Ql,{todos:g.todos,groups:o,compact:r,c:n})))}function na(e){return e==="flagged"?t.createElement(Oe,null):e==="priority"?t.createElement(eo,null):e==="due"?t.createElement(sr,null):e==="updated"?t.createElement(Nd,null):e==="created"?t.createElement(Ld,null):t.createElement(Pd,null)}function xf(){return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-filter-section-label"},d("todo.filters.show")),t.createElement(Di,null))}function Pi({sortField:e,setSortField:o,sortDir:r,setSortDir:n}){let[a,i]=t.useState(e),[s,c]=t.useState(r),u=Object.entries(er);return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-sort-heading"},t.createElement("span",null,d("todo.filters.sort")),t.createElement("div",{className:"todo-sort-directions"},t.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{c("desc"),n("desc")}},t.createElement(ir,null)),t.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{c("asc"),n("asc")}},t.createElement(ar,null)))),t.createElement("div",{className:"todo-sort-options"},u.map(([l,p])=>t.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),o(l)}},na(l),t.createElement("span",null,d(p))))))}function yr({todos:e,groups:o,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:c,embedded:u=!1}){let[l,p]=t.useState(a),[g,b]=t.useState(i),m=u?a:l,k=u?i:g,T=m.length===r.length&&(!n||k),F=[...r.map(w=>m.some(M=>M.toLowerCase()===w.toLowerCase())),...n?[k]:[]],_=(w,M)=>w?` active${F[M-1]?"":" selection-run-start"}${F[M+1]?"":" selection-run-end"}`:"",P=(w,M)=>{p(w),b(M),s(w,M)},x=w=>{let M=e.filter(V=>w===null?!V.group:it([w]).has(X(V.group??""))),Y=w??d("todo.chip.noGroup"),$=w===null?k:m.some(V=>X(V)===X(w));return t.createElement("div",{className:"todo-group-filter-item",key:w??"ungrouped"},t.createElement("div",{className:"props-info-row"},t.createElement("dt",{className:"props-info-key"},w&&t.createElement("span",{className:"props-info-dot",style:{background:ve(Se(w,o))}}),Y),t.createElement("dd",{className:"props-info-value props-info-filter-value"},t.createElement("span",null,M.length),t.createElement(f.ui.settings.Toggle,{label:Y,checked:$,onChange:()=>P(w===null?m:$?m.filter(V=>X(V)!==X(w)):[...m,w],w===null?!k:k)}))))};return u?t.createElement("div",{className:"props-info"},t.createElement("div",{className:"props-info-actions"},t.createElement("button",{type:"button",onClick:c},d("todo.properties.manageGroups")),(r.length>0||n)&&t.createElement("button",{type:"button",onClick:()=>P(T?[]:r,T?!1:n)},d(T?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("dl",{className:"props-info-table"},r.map(w=>x(w)),n&&x(null))):t.createElement("div",{className:"todo-group-filter-popover"},t.createElement("div",{className:"todo-group-filter-head"},t.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},d("todo.edit.group")),t.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>P(T?[]:r,T?!1:n)},d(T?"todo.group.deselectAll":"todo.group.selectAll"))),t.createElement("div",{className:"todo-group-filter-list"},r.map((w,M)=>{let Y=F[M];return t.createElement("button",{key:w,type:"button",className:`todo-group-filter-row${_(Y,M)}`,"aria-pressed":Y,onClick:()=>P(Y?l.filter($=>$.toLowerCase()!==w.toLowerCase()):[...l,w],g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},Y?"\u2713":""),t.createElement("span",{className:"todo-tree-dot",style:{background:ve(Se(w,o))}}),t.createElement("span",{className:"todo-tree-label"},w),t.createElement("span",{className:"todo-tree-count"},Dn(e,w)))}),n&&t.createElement("button",{type:"button",className:`todo-group-filter-row${_(g,r.length)}`,"aria-pressed":g,onClick:()=>P(l,!g)},t.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),t.createElement("span",{className:"todo-tree-dot no-group"}),t.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),t.createElement("span",{className:"todo-tree-count"},Dn(e,null)))))}var tc={scheduled:()=>t.createElement(sr,null),today:()=>t.createElement(dr,null),week:()=>t.createElement(Tn,null),flagged:()=>t.createElement(Oe,null),all:()=>t.createElement(wn,null),completed:()=>t.createElement(Ye,null)},kf=()=>{let{activePluginTab:e,dateFormat:o}=ct("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Vn(),a=We(),i=br(),[s,c]=t.useState(""),[u,l]=t.useState(""),[p,g]=t.useState(""),[b,m]=t.useState({}),[k,T]=t.useState(!1),[F,_]=t.useState(!1),[P,x]=t.useState(!1),[w,M]=t.useState(!1),{DateField:Y,TimeField:$}=f.ui.settings,[V,K]=t.useState(!1),[se,ce]=$n(),[oe]=kt(),[A,E]=Pn("todo"),{sortField:z,sortDir:h,compact:v}=A,[C,G]=xt(),J=pt(),le=On(),ee=Gn(),te=t.useMemo(()=>Wd(ee),[ee]),ne=e?.pluginId===f.pluginId,S=t.useRef(null),O=t.useRef(null),R=t.useRef(null),y=Do(z,h,"left_sidebar");fo(y.openDetail);let L=be(new Date),W=t.useMemo(()=>qd(y.todos,L),[y.todos,L]),ue=t.useMemo(()=>xe(a),[a]),B=t.useMemo(()=>y.todos.some(N=>!N.group),[y.todos]),U=i.kind==="groups"?i.names:ue,ae=i.kind==="groups"?i.includeUngrouped===!0:B,De=U.length===ue.length&&(!B||ae),$e=t.useMemo(()=>{let N=y.ordered.filter(H=>En(H,i,oe,L));if(C!=="all"&&(N=N.filter(H=>yo(H,C))),se.trim()){let H=qt(se);N=N.filter(pe=>H(pe.tags??[],pe.title,pe.note,pe.group??""))}return n?N=N.filter(H=>{let pe=H.dueDate?.slice(0,10);return!!pe&&pe>=n.start&&pe<=n.end}):r&&(N=N.filter(H=>H.dueDate?.slice(0,10)===r)),N},[y.ordered,i,oe,C,se,r,n,L]),Xe=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Gt=async()=>{if(y.creating)return;let N=an(s,L),H=N.title;if(!H){ot();return}let pe=Xe;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let I=await f.ui.openMenu([...i.names.map((j,Q)=>({id:`group:${Q}`,label:j})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:S.current??R.current,align:"start"});if(I===null)return;pe=I.startsWith("group:")?i.names[Number(I.slice(6))]:void 0}M(!1);let Ge={note:u.trim(),tags:[...new Set([...b.tags??[],...p.split(/[\s,]+/).map(I=>I.replace(/^#+/,"")).filter(Boolean)])],priority:N.priority,...pe?{group:pe}:{}};i.kind==="smart"&&i.id==="flagged"&&(Ge.flagged=!0),Object.assign(Ge,{...b,tags:Ge.tags}),N.dueDate&&(Ge.dueDate=N.dueDate),await y.create(H,void 0,{patch:Ge})?(M(!1),c(""),l(""),g(""),m({}),T(!1),_(!1),x(!1),S.current?.focus()):M(!0)},Po=()=>{K(!0),window.setTimeout(()=>S.current?.focus(),0)},ot=()=>{c(""),K(!1),l(""),g(""),m({}),T(!1),_(!1),x(!1),M(!1)},Re=ze(),St=t.useSyncExternalStore(Re.subscribe,Re.get,Re.get);t.useEffect(()=>{St?.mode==="create"&&(K(!0),Re.clear())},[St,Re]),t.useEffect(()=>{V&&!y.creating&&S.current?.focus()},[V,ne,y.creating]),t.useLayoutEffect(()=>{O.current&&(O.current.style.height="auto",O.current.style.height=`${O.current.scrollHeight}px`)},[u,V]);let rt=b.dueDate??"",Sr=V&&t.createElement("form",{className:"todo-compose",onSubmit:N=>{N.preventDefault(),Gt()},onKeyDown:N=>{N.key==="Escape"&&!N.defaultPrevented&&!y.creating&&(N.preventDefault(),ot())}},t.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),t.createElement("input",{ref:S,className:"todo-compose-title",value:s,onChange:N=>c(N.target.value),placeholder:Xe?d("todo.newTodoIn",{p0:Xe}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:y.creating}),t.createElement("textarea",{ref:O,className:"todo-compose-note",rows:1,value:u,onChange:N=>l(N.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:y.creating}),t.createElement("div",{className:"todo-compose-tags"},(b.tags??[]).map(N=>t.createElement("span",{className:"todo-compose-token",key:N},t.createElement("span",null,"#",N),t.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:N}),disabled:y.creating,onClick:()=>m(H=>({...H,tags:H.tags?.filter(pe=>pe!==N)}))},t.createElement(Ee,null)))),t.createElement("input",{value:p,onChange:N=>{let H=N.target.value;if(!("isComposing"in N.nativeEvent&&N.nativeEvent.isComposing)&&/[\s,]/.test(H)){let pe=H.split(/[\s,]+/),Ge=pe.pop()??"";m(D=>({...D,tags:[...new Set([...D.tags??[],...pe.map(I=>I.replace(/^#+/,"")).filter(Boolean)])]})),g(Ge)}else g(H)},onKeyDown:N=>{N.nativeEvent.isComposing||(N.key==="Enter"&&p.trim()&&(N.preventDefault(),m(H=>({...H,tags:[...new Set([...H.tags??[],p.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),N.key==="Backspace"&&!p&&m(H=>({...H,tags:H.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:y.creating})),F&&t.createElement("div",{className:"todo-compose-schedule"},t.createElement(Y,{className:"todo-compose-date-field",value:rt,onChange:N=>m(H=>({...H,dueDate:N})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:y.creating}),t.createElement($,{className:"todo-compose-time-field",value:b.startTime??"",onChange:N=>m(H=>({...H,startTime:N||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:y.creating})),P&&t.createElement("div",{className:"todo-compose-location"},t.createElement(So,{value:b.location,disabled:y.creating,onChange:N=>m(H=>({...H,location:N}))})),(k||!!b.attachments?.length)&&t.createElement("div",{className:"todo-compose-attachments"},(b.attachments??[]).map(N=>t.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:N,title:N},t.createElement(Mt,null),t.createElement("span",null,N.split("/").pop()),t.createElement("button",{type:"button",disabled:y.creating,"aria-label":`${d("todo.removeAttachment")}: ${N}`,onClick:()=>m(H=>({...H,attachments:H.attachments?.filter(pe=>pe!==N)}))},t.createElement(Ee,null)))),k&&t.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:y.creating,onChange:N=>{N&&(m(H=>({...H,attachments:[...new Set([...H.attachments??[],N])]})),T(!1))}})),t.createElement("div",{className:"todo-compose-controls"},t.createElement("button",{type:"button",className:`todo-compose-chip${rt?" has-value":""}`,"aria-pressed":F,disabled:y.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>_(N=>!N)},t.createElement(lt,null),rt&&t.createElement("span",null,st(rt,L,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),o),b.startTime?` ${b.startTime}`:"")),t.createElement("button",{type:"button",className:`todo-compose-chip${b.location?" has-value":""}`,"aria-pressed":P,disabled:y.creating,"aria-label":d("todo.compose.addPlace"),title:b.location?.name??d("todo.compose.addPlace"),onClick:()=>x(N=>!N)},t.createElement(et,null)),t.createElement("button",{type:"button",className:`todo-compose-chip${b.attachments?.length?" has-value":""}`,"aria-pressed":k,disabled:y.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>T(N=>!N)},t.createElement(Mt,null),!!b.attachments?.length&&t.createElement("span",null,b.attachments.length)),t.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${b.priority&&b.priority!=="normal"?" has-value":""}`,disabled:y.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async N=>{let H=await f.ui.openMenu(qe.map(pe=>({id:pe.id,label:d(pe.labelKey),checked:pe.id===(b.priority??"normal")})),{anchor:N.currentTarget,align:"start"});H&&m(pe=>({...pe,priority:H}))}},t.createElement(eo,null),b.priority&&b.priority!=="normal"&&t.createElement("span",null,d(`todo.priority.${b.priority}`))),t.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(N=>({...N,flagged:!(N.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":b.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:y.creating},t.createElement(Oe,null)),t.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||y.creating},d("todo.group.add"))),w&&t.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),t.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:ot,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:y.creating},t.createElement(Ee,null))),Oo=N=>{f.ui.openPopover(({close:H})=>t.createElement("div",{className:"todo-filter-popover-stack"},t.createElement(xf,null),(ue.length>0||B)&&t.createElement(t.Fragment,null,t.createElement("div",{className:"todo-filter-divider"}),t.createElement(yr,{todos:y.todos,groups:a,names:ue,hasUngrouped:B,selected:U,includeUngrouped:ae,onChange:(pe,Ge)=>He(pe.length===ue.length&&(!B||Ge)?Me:{kind:"groups",names:pe,includeUngrouped:Ge}),onOpenSettings:()=>{H(),zt()}}))),{anchor:N,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.title"),width:248})},Mo=N=>{f.ui.openPopover(()=>t.createElement(Pi,{sortField:z,setSortField:H=>E({sortField:H}),sortDir:h,setSortDir:H=>E({sortDir:H})}),{anchor:N,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},_o=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},co=(N,H,pe,Ge,D,I,j,Q)=>{let ye=Cn(i,H),uo=H.kind==="groups"&&H.names.length===1&&!H.includeUngrouped&&i.kind==="groups"?i.names.some(At=>X(At)===X(H.names[0])):ye;return t.createElement("button",{key:tt(H),type:"button",className:`todo-tree-row${D?" nested":""}${I?` todo-${I}-chip`:""}${uo?" active":""}`,"aria-current":ye?"true":void 0,"aria-label":I?`${N} ${pe}`:void 0,title:I?N:void 0,"aria-pressed":H.kind==="groups"?uo:void 0,style:j?{"--todo-chip-color":ve(j),"--todo-chip-on":Q??Ct(j)}:void 0,onClick:At=>hr(H,ml(At)),onAuxClick:At=>{At.button===1&&(At.preventDefault(),hr(H,!0))}},Ge&&t.createElement("span",{className:"todo-tree-icon"},Ge),D&&t.createElement("span",{className:"todo-tree-dot",style:{background:ve(D)},"aria-hidden":"true"}),t.createElement("span",{className:"todo-tree-label"},N),t.createElement("span",{className:"todo-tree-count"},pe))},ia=!!(se||r||n||C!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),Ar=n?`${Ve(n.start,o)} \u2013 ${Ve(n.end,o)}`:r?Ve(r,o):null,zo=C==="all"?null:`${d("auto.bae7d5be7082")}: ${C.length===1?J.find(N=>N.id===C[0])?.label??d("todo.chip.all"):d("todo.filters.statusCount",{count:C.length})}`,Er=d("todo.fab.newTodo");return t.createElement("div",{className:"todo-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),t.createElement("div",{className:"todo-header-actions"},!ne&&t.createElement(t.Fragment,null,t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${oe||C!=="all"||!De?" active":""}`,"aria-label":d("todo.filters.title"),title:d("todo.filters.title"),type:"button",onClick:N=>Oo(N.currentTarget)},t.createElement(Vd,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":v,title:v?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>E({compact:!v})},v?t.createElement(un,null):t.createElement(pn,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${h==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(er[z])}`,type:"button",onClick:N=>Mo(N.currentTarget)},h==="asc"?t.createElement(ar,null):t.createElement(ir,null),na(z))),t.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>f.workspace.openMainTab()}))),t.createElement("div",{className:"search-field-row"},t.createElement("div",{className:"todo-tree-search search-field"},t.createElement(bt,{className:"search-field-icon"}),t.createElement("input",{className:"search-field-input",value:se,onChange:N=>ce(N.target.value),onKeyDown:N=>{N.key==="Escape"&&ce("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),se&&t.createElement("button",{className:"search-field-action",onClick:()=>ce(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},t.createElement(Ee,null)))),ne?t.createElement("div",{className:"todo-tree todo-active-navigation"},Sr,t.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},te.map(N=>co(d(N.labelKey),{kind:"smart",id:N.id},W[N.id],tc[N.id](),void 0,"smart",N.color,pr(N,Ct)))),t.createElement("div",{className:"todo-navigation-groups"},t.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),ue.map(N=>co(N,{kind:"groups",names:[N]},Dn(y.todos,N),void 0,Se(N,a))))):t.createElement(t.Fragment,null,!se&&t.createElement("div",{className:"todo-tree"},t.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},Ar?t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:_o},t.createElement("span",{className:"todo-tree-icon"},t.createElement(dr,null)),t.createElement("span",{className:"todo-tree-label"},Ar),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(Ee,null))):te.map(N=>co(d(N.labelKey),{kind:"smart",id:N.id},W[N.id],tc[N.id](),void 0,"smart",N.color,pr(N,Ct)))),zo&&t.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>G("all")},t.createElement("span",{className:"todo-tree-label"},zo),t.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},t.createElement(Ee,null)))),t.createElement("div",{className:"todo-list"},Sr,y.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):$e.length?t.createElement(ra,{todos:$e,groups:a,compact:v,controller:y,mode:le,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,ia)))),!V&&t.createElement("button",{ref:R,className:"todo-fab",type:"button","aria-label":Er,title:Er,disabled:y.creating,onClick:Po},t.createElement(Qt,null)),t.createElement(Lo,{c:y}))},oc=()=>t.createElement(kf,null);function Tf({showCompleted:e,setShowCompleted:o,filter:r,setFilter:n}){let a=pt(),[i,s]=t.useState(e),[c,u]=t.useState(r),l=a.map(m=>m.id),p=c==="all"?l:c,g=m=>{s(m),o(m)},b=m=>{let k=p.includes(m)?p.filter(F=>F!==m):l.filter(F=>p.includes(F)||F===m);if(!k.length)return;let T=k.length===l.length?"all":k;u(T),n(T)};return t.createElement("div",{className:"todo-filter-popover-body"},t.createElement("div",{className:"todo-completed-row"},t.createElement("span",null,d("todo.filters.completed")),t.createElement("div",{className:"todo-completed-choices"},t.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},d("todo.completed.hide")),t.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},d("todo.completed.showAll")))),t.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>t.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":p.includes(m.id),onClick:()=>b(m.id)},t.createElement("span",{className:"todo-status-filter-check"},p.includes(m.id)?"\u2713":""),t.createElement("span",{className:"todo-status-filter-glyph"},t.createElement(ke,{status:m.id==="open"?null:m.id,dotCls:m.cls})),t.createElement("span",null,m.label)))))}var rc=()=>{let{activePath:e,weekStart:o}=ct("activePath","weekStart"),r=$t(e)??"",n=We(),a=On(),[i,s]=Pn("attachment"),{showCompleted:c,statusFilter:u,compact:l,sortField:p,sortDir:g,groupNames:b,includeUngrouped:m}=i,k=K=>s({showCompleted:K}),T=K=>s({statusFilter:K}),F=K=>s({sortField:K}),_=K=>s({sortDir:K}),P=Do(p,g,"right_sidebar");fo(P.openDetail);let x=t.useMemo(()=>xe(n),[n]),w=t.useMemo(()=>P.todos.some(K=>!K.group),[P.todos]),M=t.useMemo(()=>P.ordered.filter(K=>!($t(K.filePath)===r||(K.attachments??[]).some(ce=>$t(ce)===r))||!c&&K.completed||(b.length||m)&&(!K.group&&!m||K.group&&!it(b).has(X(K.group)))?!1:yo(K,u)),[P.ordered,r,c,u,b,m]),Y=K=>{f.ui.openPopover(({close:se})=>t.createElement(yr,{todos:P.todos,groups:n,names:x,hasUngrouped:w,selected:b,includeUngrouped:m,onChange:(ce,oe)=>s({groupNames:ce,includeUngrouped:oe}),onOpenSettings:()=>{se(),zt()}}),{anchor:K,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},$=K=>{f.ui.openPopover(()=>t.createElement(Tf,{showCompleted:c,setShowCompleted:k,filter:u,setFilter:T}),{anchor:K,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},V=K=>{f.ui.openPopover(()=>t.createElement(Pi,{sortField:p,setSortField:F,sortDir:g,setSortDir:_}),{anchor:K,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return t.createElement("div",{className:"todo-panel note-tasks-panel"},t.createElement("header",{className:"panel-header"},t.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),t.createElement("div",{className:"todo-header-actions"},t.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${b.length||m?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:K=>Y(K.currentTarget)},t.createElement(gn,null)),t.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||u!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:K=>$(K.currentTarget)},t.createElement(Ye,null)),t.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!l})},l?t.createElement(un,null):t.createElement(pn,null)),t.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${g==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(er[p])}`,onClick:K=>V(K.currentTarget)},g==="asc"?t.createElement(ar,null):t.createElement(ir,null),na(p)))),t.createElement("div",{className:"todo-list"},P.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):r?M.length?t.createElement(ra,{todos:M,groups:n,compact:l,controller:P,mode:a,weekStart:o}):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.none"))):t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("todo.attachmentTasks.noFile")))),t.createElement(Lo,{c:P}))};var Sf={group:e=>e.group??void 0,notes:e=>ta(e.note)||void 0,status:e=>Vt().indexOf(Fe(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},nc=({navigation:e,instanceId:o})=>{let{dateFormat:r,activePluginTab:n}=ct("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=Vn(),s=We(),c=Kn(),u=t.useMemo(()=>no(o),[o]),l=u??c,p=n?.pluginId===f.pluginId&&n.instanceId===o,g=Fn();t.useEffect(()=>{if(!u)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>Eo(-1),goForward:()=>Eo(1)}),()=>e.setController(null)},[e,u,g.canGoBack,g.canGoForward]);let[b,m]=$n(),[k,T]=t.useState(()=>!!b.trim()),F=t.useRef(null),_=()=>{T(!0),window.setTimeout(()=>F.current?.focus(),0)},P=()=>{m(""),T(!1)},[x,w]=al(),{field:M,dir:Y}=x,[$]=kt(),[V,K]=xt(),[se,ce]=ea(),oe=Do("due","asc");fo(oe.openDetail),t.useEffect(()=>{if(!(oe.loading||u))if(l.kind==="groups"){let B=new Set(xe(s));!l.includeUngrouped&&!l.names.some(U=>B.has(U))&&He(Me)}else l.kind==="tag"&&(oe.todos.some(B=>B.tags?.includes(l.name))||He(Me))},[oe.loading,oe.todos,s,l,u]);let A=dt(),E=Gn(),z=l.kind==="smart"?vt(l.id,E):null,h=hi(l),v=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?ve(Se(l.names[0],s)):"var(--accent-color)":l.kind==="tag"?"var(--accent-color)":l.kind==="nogroup"?"var(--text-color)":ve(z.color)||"var(--text-color)",C=t.useMemo(()=>{let B=oe.todos.filter(U=>En(U,l,$,A));if(V!=="all"&&(B=B.filter(U=>yo(U,V))),se.length&&(B=B.filter(U=>se.includes(U.priority))),b.trim()){let U=qt(b);B=B.filter(ae=>U(ae.tags??[],ae.title,ae.note,ae.group??""))}return i?B=B.filter(U=>{let ae=U.dueDate?.slice(0,10);return!!ae&&ae>=i.start&&ae<=i.end}):a&&(B=B.filter(U=>U.dueDate?.slice(0,10)===a)),B},[oe.todos,l,$,V,se,b,a,i,A]),{ordered:G,sectionOf:J}=t.useMemo(()=>{let B=Sf[M];if(B)return{ordered:sd(C,B,Y),sectionOf:void 0};if(M!=="auto")return{ordered:ko(C,M,Y),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:ud(C).flatMap(De=>De.todos),sectionOf:void 0};let U=nn(C,A),ae=new Map;for(let De of or)for(let $e of U[De])ae.set($e.id,De);return{ordered:or.flatMap(De=>U[De]),sectionOf:De=>ae.get(De.id)??"someday"}},[C,M,Y,l,A]),le=!!b.trim()||se.length>0||V!=="all",ee=()=>{m(""),ce([]),K("all")},te=[tt(l),b,JSON.stringify(V),se.join(),$,M,Y,a??"",i?.start??"",i?.end??""].join("|"),ne=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[S,O]=t.useState(0),R=()=>O(B=>B+1),y=()=>{let B={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(B.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(B.dueDate=A),l.kind==="smart"&&l.id==="flagged"&&(B.flagged=!0),B},L=xe(s),W=[{label:d("todo.fab.newTodo"),icon:t.createElement(Qt,null),onSelect:R},...L.length?[{label:d("todo.fab.newTodoIn"),icon:t.createElement(fn,null),submenu:L.map(B=>({label:B,onSelect:U=>{let ae={kind:"groups",names:[B]};U?.newTab||u?(bi(ae,U?.newTab===!0),ss()):(He(ae),R())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:t.createElement(gn,null),onSelect:()=>{zt()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:t.createElement(to,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Rn(l)))}},{label:d("auto.c7f73bb54d92"),icon:t.createElement(Fd,null),onSelect:()=>f.workspace.openOwnSettings()}],ue=o??"";return t.useEffect(()=>{(p||n?.pluginId!==f.pluginId)&&wi(W,ue)}),t.useEffect(()=>()=>wi(null,ue),[ue]),t.createElement("div",{className:"todo-page"},t.createElement("div",{className:`todo-page-appbar${k?" is-searching":""}`},k?t.createElement("div",{className:"todo-page-search"},t.createElement(bt,{className:"todo-page-search-icon"}),t.createElement("input",{ref:F,className:"todo-page-search-input",value:b,onChange:B=>m(B.target.value),onKeyDown:B=>{B.key==="Escape"&&(B.preventDefault(),P())},onBlur:()=>{b.trim()||T(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):t.createElement("h1",{className:"todo-page-appbar-title",style:{color:v}},h),(i||a)&&t.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:ne},t.createElement("span",null,i?`${Ve(i.start,r)} \u2013 ${Ve(i.end,r)}`:Ve(a,r)),t.createElement(Ee,null)),t.createElement("div",{className:"todo-page-appbar-actions"},t.createElement("button",{type:"button",className:`todo-page-appbar-btn${!k&&b.trim()?" active":""}`,"aria-label":k?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:k?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:B=>{k&&B.preventDefault()},onClick:k?P:_},k?t.createElement(Ee,null):t.createElement(bt,null)),t.createElement(Hl,null),le&&t.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.reset"),title:d("todo.table.reset"),onClick:ee},t.createElement(Bd,null)),t.createElement(Wl,null),t.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:R},t.createElement(Qt,null)))),oe.loading?t.createElement("div",{className:"right-sidebar-empty"},t.createElement("p",null,d("auto.b5868978587a"))):t.createElement(Jl,{todos:G,groups:s,c:oe,sort:x,onSort:w,resetKey:te,empty:d("todo.table.empty"),sectionOf:J,composeSignal:S,newTaskPatch:y}),t.createElement(Lo,{c:oe}))};var sc=10080;function ac(e){let o=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!o)return null;let r=Number(o[1])*60+Number(o[2]);return r<=sc?r:null}function ic(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function dc(){let e=()=>{let m=f.settings.get().reminderOffsets;return Array.isArray(m)?m.filter(k=>Number.isInteger(k)&&k>=0&&k<=sc).slice(0,1):[10]},[o,r]=t.useState(e);t.useEffect(()=>f.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:a,SelectField:i}=f.ui.settings,s=o.length?"custom":"off",[c,u]=t.useState(()=>ic(o[0]??10)),[l,p]=t.useState(!1);t.useEffect(()=>{o.length&&(u(ic(o[0])),p(!1))},[o[0]]);let g=m=>{r(m),f.settings.set("reminderOffsets",m)},b=()=>{let m=ac(c);if(m===null){p(!0);return}p(!1),m!==o[0]&&g([m])};return t.createElement(a,{title:d("reminders.title")},t.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},t.createElement(i,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:m=>g(m==="off"?[]:[ac(c)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&t.createElement(n,{title:d("reminders.timeBefore"),description:l?t.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},t.createElement("input",{className:`settings-control todo-reminder-time${l?" invalid":""}`,type:"text",inputMode:"numeric",value:c,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":l||void 0,maxLength:6,onChange:m=>{u(m.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),p(!1)},onBlur:b,onKeyDown:m=>{m.key==="Enter"&&(m.preventDefault(),b())}})))}var Af={scheduled:()=>t.createElement(sr,null),today:()=>t.createElement(dr,null),week:()=>t.createElement(Tn,null),flagged:()=>t.createElement(Oe,null),all:()=>t.createElement(wn,null),completed:()=>t.createElement(Ye,null)};function cc(e){let[o,r]=t.useState(e);return t.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[o,r]}function Ef(){let{ColorField:e,Section:o,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,s]=cc(Nn),c=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],u=m=>{s(m),tl(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,p=i.order.map(m=>vt(m,i)),g=a({items:p,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>d(m.labelKey),onReorder:m=>u({...i,order:m.map(k=>k.id)})}),b=(m,k)=>{if(k){u({...i,hidden:i.hidden.filter(_=>_!==m)});return}if(l<=1)return;let T={...i,hidden:[...i.hidden,m]};u(T);let F=oo();F.kind==="smart"&&F.id===m&&He({kind:"smart",id:T.order.find(_=>!T.hidden.includes(_))})};return t.createElement(o,{title:d("todo.settings.smartLists")},t.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),t.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},t.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},t.createElement("span",null),t.createElement("span",null),t.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),t.createElement("span",null,d("todo.settings.colColor")),t.createElement("span",null,d("todo.settings.colText")),t.createElement("span",null,d("todo.settings.colShow"))),p.map((m,k)=>{let T=i.hidden.includes(m.id),F=`${m.id}@${k}`,_=g.getHandleProps(m),P=d(m.labelKey);return t.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(T?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},t.createElement("button",{..._,className:(_.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},t.createElement(nr,null)),t.createElement("span",{className:"todo-settings-chip",style:{background:ve(m.color),color:pr(m,Ct)},"aria-hidden":"true"},Af[m.id]()),t.createElement("span",{className:"todo-settings-name"},P),t.createElement(e,{key:`color:${F}`,value:m.color,onChange:x=>u({...i,colors:{...i.colors,[m.id]:x}}),ariaLabel:d("todo.settings.smartListColor",{p0:P}),allowCustom:!1}),t.createElement(r,{key:`text:${F}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:d("todo.settings.statusText",{p0:P}),onChange:x=>{let w={...i.textColors};x==="auto"?delete w[m.id]:w[m.id]=x,u({...i,textColors:w})}}),t.createElement(n,{key:`show:${F}`,checked:!T,disabled:!T&&l<=1,label:d("todo.settings.smartListShow",{p0:P}),onChange:x=>b(m.id,x)}))})),g.liveRegion)}function aa({initial:e,onCommit:o,onType:r,onEnter:n,placeholder:a,ariaLabel:i,disabled:s}){let c=t.useRef(!1);return t.createElement("input",{className:"settings-control todo-settings-text",type:"text",defaultValue:e,placeholder:a,"aria-label":i,disabled:s,autoComplete:"off",spellCheck:!1,onChange:u=>r?.(u.currentTarget.value),onBlur:u=>{if(c.current){c.current=!1;return}o(u.currentTarget.value)},onKeyDown:u=>{if(u.key==="Enter"){if(u.preventDefault(),n){o(u.currentTarget.value),n();return}u.currentTarget.blur()}else u.key==="Escape"&&(u.preventDefault(),u.currentTarget.value=e,c.current=!0,u.currentTarget.blur())}})}function Df({name:e}){let o=cn(),r=e?o[e]:void 0;return r?t.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):t.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function lc({current:e,onPick:o}){let r=cn(),n=Object.keys(r).sort((a,i)=>a.localeCompare(i));return t.createElement("div",{className:"todo-icon-picker"},t.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(a=>t.createElement("button",{key:a,type:"button",role:"option","aria-selected":e===a,className:`todo-icon-picker-item${e===a?" is-active":""}`,title:a,"aria-label":a,onClick:()=>o(e===a?void 0:a)},t.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[a]}})))),t.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:Ja})))}function Cf(){let{Button:e,ColorField:o,IconButton:r,Section:n,Toggle:a,useReorderDrag:i}=f.ui.settings,[s,c]=cc(Ue);cn();let u=t.useRef(""),[l,p]=t.useState(0),[g,b]=t.useState(!1),m=A=>{let E=Ur(A);c(E),Ns(E)},k=s.active.map(A=>Ae(A,s)),T=i({items:k,indicatorOnly:!0,getId:A=>A.id,getLabel:A=>A.label,onReorder:A=>m({...s,active:A.map(E=>E.id)})}),F=(A,E)=>{E!==s.active.includes(A)&&m({...s,active:E?[...s.active,A]:s.active.filter(z=>z!==A)})},_=A=>A.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Kr),[P,x]=t.useState({strike:!1,color:we("teal"),done:!1,show:!0}),w=()=>{let A=_(u.current);if(!A||s.custom.length>=jr)return;let E=Is();m({...s,custom:[...s.custom,{id:E,label:A,done:P.done}],active:P.show?[...s.active,E]:s.active,strikethrough:{...s.strikethrough,[E]:P.strike},colors:{...s.colors,[E]:P.color},icons:P.icon?{...s.icons,[E]:P.icon}:s.icons}),u.current="",b(!1),x({strike:!1,color:we("teal"),done:!1,show:!0}),p(z=>z+1)},M=(A,E)=>{let z=_(E);if(ut(A)){if(!z)return;m({...s,custom:s.custom.map(h=>h.id===A?{...h,label:z}:h)})}else{let h={...s.labels};z&&z!==As(A)?h[A]=z:delete h[A],m({...s,labels:h})}},Y=async(A,E)=>{ut(A)?m({...s,custom:s.custom.map(h=>h.id===A?{...h,done:E}:h)}):m({...s,done:{...s.done,[A]:E}});let z=(await Je()).filter(h=>h.status===A);await Promise.all(z.map(h=>ja(h.id,A)))},$=(A,E)=>{let z=Ue(),h={...z.icons};E?h[A]=E:delete h[A],m({...z,icons:h})},V=(A,E)=>{f.ui.openPopover(({close:z})=>t.createElement(lc,{current:s.icons[E],onPick:h=>{$(E,h),z()}}),{anchor:A,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},K=async A=>{let E=Ae(A,s).label,z=(await Je()).filter(C=>C.status===A);if(await f.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:E}),message:z.length?d("todo.settings.statusDeleteMoves",{count:z.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(z.map(C=>ja(C.id,"open")));let v=Ue();ut(A)?m({...v,custom:v.custom.filter(C=>C.id!==A),active:v.active.filter(C=>C!==A)}):m({...v,removed:[...v.removed,A],active:v.active.filter(C=>C!==A)})},se=(A,E,z)=>{let h=A.id,v=`${h}@${z}`,C=A.label,G=E==="shown"?T.getHandleProps(A):null,J=E==="locked";return t.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(J?" locked":"")+(E==="off"?" is-off":"")+(E==="shown"&&T.overId===h?" drop-"+(T.dropPosition??"before"):""),key:h,...E==="shown"?T.getItemProps(A):{}},G?t.createElement("button",{...G,className:(G.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},t.createElement(nr,null)):t.createElement("span",{className:"todo-settings-handle is-static",title:J?d("todo.settings.statusLocked"):void 0},J&&t.createElement(Dd,null)),J?t.createElement("span",{className:`todo-settings-glyph ${A.cls}`},t.createElement(ke,{status:h==="open"?null:h,dotCls:A.cls})):t.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${A.cls}`,title:d("todo.settings.statusIconOf",{p0:C}),"aria-label":d("todo.settings.statusIconOf",{p0:C}),onClick:le=>V(le.currentTarget,h)},t.createElement(ke,{status:h,dotCls:A.cls})),t.createElement("span",{className:"todo-settings-name todo-settings-name-field"},t.createElement(aa,{key:`name:${v}:${C}`,initial:C,ariaLabel:d("todo.settings.statusName"),onCommit:le=>M(h,le)})),t.createElement(r,{key:`strike:${v}`,className:"todo-settings-strike",pressed:s.strikethrough[h],"aria-pressed":s.strikethrough[h],ariaLabel:d("todo.settings.statusStrike",{p0:C}),title:d("todo.settings.statusStrike",{p0:C}),onClick:()=>m({...s,strikethrough:{...s.strikethrough,[h]:!s.strikethrough[h]}})},t.createElement(Sn,null)),t.createElement(o,{key:`color:${v}`,value:s.colors[h],onChange:le=>m({...s,colors:{...s.colors,[h]:le}}),ariaLabel:d("todo.settings.statusColor",{p0:C}),allowCustom:!1}),t.createElement(r,{key:`done:${v}`,className:"todo-settings-strike",pressed:A.done,"aria-pressed":A.done,disabled:J,ariaLabel:d("todo.settings.statusDone",{p0:C}),title:d("todo.settings.statusDone",{p0:C}),onClick:()=>{J||Y(h,!A.done)}},t.createElement(Ye,null)),J?t.createElement("span",null):t.createElement(a,{key:`show:${v}`,checked:E!=="off",label:d("todo.settings.statusShow",{p0:C}),onChange:le=>F(h,le)}),J?t.createElement("span",null):t.createElement(r,{key:`delete:${v}`,ariaLabel:d("todo.settings.statusDelete",{p0:C}),title:d("todo.settings.statusDelete",{p0:C}),onClick:()=>{K(h)}},t.createElement(yt,null)))},ce=[...Vo.filter(A=>!s.active.includes(A)&&!s.removed.includes(A)),...s.custom.map(A=>A.id).filter(A=>!s.active.includes(A))].map(A=>Ae(A,s)),oe=s.custom.length>=jr;return t.createElement(n,{title:d("todo.settings.statuses")},t.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),t.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},t.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},t.createElement("span",null),t.createElement("span",null,d("todo.settings.colIcon")),t.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),t.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},t.createElement(Sn,null)),t.createElement("span",null,d("todo.settings.colColor")),t.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},t.createElement(Ye,null)),t.createElement("span",null,d("todo.settings.colShow")),t.createElement("span",null)),se(Ae("open",s),"locked",0),se(Ae("completed",s),"locked",1),k.map((A,E)=>se(A,"shown",2+E)),ce.map((A,E)=>se(A,"off",2+k.length+E)),t.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},t.createElement("span",{className:"todo-settings-handle is-static"}),t.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:ve(P.color)},disabled:oe,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:A=>{f.ui.openPopover(({close:E})=>t.createElement(lc,{current:P.icon,onPick:z=>{x(h=>({...h,icon:z})),E()}}),{anchor:A.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},t.createElement(Df,{name:P.icon})),t.createElement("span",{className:"todo-settings-name todo-settings-name-field"},t.createElement(aa,{key:`add:${l}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:oe,onType:A=>{u.current=A,!!_(A)!==g&&b(!g)},onCommit:A=>{u.current=A},onEnter:w})),t.createElement(r,{className:"todo-settings-strike",pressed:P.strike,"aria-pressed":P.strike,disabled:oe,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>x(A=>({...A,strike:!A.strike}))},t.createElement(Sn,null)),t.createElement(o,{key:`add-color:${l}`,value:P.color,onChange:A=>x(E=>({...E,color:A})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),t.createElement(r,{className:"todo-settings-strike",pressed:P.done,"aria-pressed":P.done,disabled:oe,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>x(A=>({...A,done:!A.done}))},t.createElement(Ye,null)),t.createElement(a,{key:`add-show:${l}`,checked:P.show,disabled:oe,label:d("todo.settings.colShow"),onChange:A=>x(E=>({...E,show:A}))}),t.createElement(r,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:oe||!g,onClick:w},t.createElement(Qt,null)))),T.liveRegion,s.removed.length>0&&t.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>m({...s,removed:[],active:[...s.active,...s.removed]})},d("todo.settings.statusRestore",{count:s.removed.length})))}function If(){let{Row:e,Section:o,SelectField:r}=f.ui.settings,[n,a]=t.useState(In);return t.createElement(t.Fragment,null,t.createElement(o,{title:d("todo.settings.display")},t.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},t.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let s=i;a(s),f.settings.set(di,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),t.createElement(dc,null))}function Nf(){let{Button:e,ColorField:o,IconButton:r,Section:n,SelectField:a}=f.ui.settings,i=od(),s=We(),c=s.filter(x=>!i.some(w=>w.id===x.id)),u=t.useRef(""),[l,p]=t.useState(0),[g,b]=t.useState(""),m=(x,w)=>s.some(M=>M.id!==w&&[M.name,...M.aliases??[]].some(Y=>X(Y)===X(x))),k=x=>{td(x)},T=()=>{let x=u.current.trim().slice(0,Jo);!x||m(x)||i.length>=Qr||(k([...i,{id:Zs(),name:x,color:Aa(s)}]),u.current="",b(""),p(w=>w+1))},F=(x,w)=>{!w.trim()||w.trim()===x.name||m(w,x.id)||k(i.map(M=>M.id===x.id?Js(M,w):M))},_=async x=>{let w=new Set([x.name,...x.aliases??[]].map(X)),M=(await Je()).filter($=>$.group&&w.has(X($.group)));await f.ui.confirm({title:d("todo.settings.localGroupDeleteTitle",{p0:x.name}),message:M.length?d("todo.settings.localGroupDeleteMoves",{count:M.length}):d("todo.settings.localGroupDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(M.map($=>qs($.id,void 0))),k(Yt().filter($=>$.id!==x.id)))},P=[{value:"",label:d("todo.settings.localGroupNoParent")},...c.map(x=>({value:x.id,label:x.name,color:x.color}))];return t.createElement(n,{title:d("todo.settings.localGroups")},t.createElement("p",{className:"todo-settings-desc"},d("todo.settings.localGroupsDesc")),i.length>0&&t.createElement("div",{className:"todo-settings-list todo-local-groups",role:"list"},t.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},t.createElement("span",null,d("todo.settings.colColor")),t.createElement("span",null,d("todo.settings.localGroupName")),t.createElement("span",null,d("todo.settings.localGroupParent")),t.createElement("span",null)),i.map(x=>t.createElement("div",{role:"listitem",className:"todo-settings-item",key:x.id},t.createElement(o,{value:x.color,onChange:w=>k(i.map(M=>M.id===x.id?{...M,color:w}:M)),ariaLabel:d("todo.settings.localGroupColor",{p0:x.name})}),t.createElement(aa,{key:`name:${x.id}:${x.name}`,initial:x.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:w=>F(x,w)}),t.createElement(a,{value:x.parent??"",options:P,ariaLabel:d("todo.settings.localGroupParentOf",{p0:x.name}),onChange:w=>k(i.map(M=>{if(M.id!==x.id)return M;let{parent:Y,...$}=M;return w?{...$,parent:w}:$}))}),t.createElement(r,{ariaLabel:d("todo.settings.localGroupDelete",{p0:x.name}),title:d("todo.settings.localGroupDelete",{p0:x.name}),onClick:()=>{_(x)}},t.createElement(yt,null))))),t.createElement("div",{className:"todo-status-add"},t.createElement(aa,{key:`add:${l}`,initial:"",placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:x=>{u.current=x;let w=x.trim();w!==g&&(!w||!g)&&b(w)},onCommit:x=>{u.current=x,b(x.trim())}}),t.createElement(e,{type:"button",disabled:!g||i.length>=Qr,onClick:T},d("todo.settings.localGroupAdd"))))}function uc({section:e}){return e==="statuses"?t.createElement(Cf,null):e==="lists"?t.createElement(t.Fragment,null,t.createElement(Ef,null),t.createElement(f.ui.settings.Section,null,t.createElement(f.ui.settings.GroupsEditor,null)),t.createElement(Nf,null)):t.createElement(If,null)}var pc="reminder:";function mc(){let e=Pe();return f.notifications.onAction(({key:o,action:r,targetItemId:n})=>{if(r!=="click"||!o.startsWith(pc))return;let a=n??o.slice(pc.length).split(":")[0];Je(e).then(i=>{e.assertActive();let s=i.find(c=>c.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var Oi=(e,o=[])=>({type:"object",properties:e,required:o,additionalProperties:!1}),Mi=e=>({type:"string",description:e});async function _i(e,o,r,n){let a=await e.commands.executeOwn(o,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function fc(e){return fa([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Oi({}),sideEffect:"read",commandId:"list",run:async(o,r)=>{let a=(await _i(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Oi({title:Mi("Task title"),due:Mi("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(o,r)=>{let n=String(o.title??"");return`Added todo "${(await _i(e,"add",{title:n,due:String(o.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Oi({id:Mi("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(o,r)=>{let n=String(o.id??"");return`Completed "${(await _i(e,"complete",{query:n},r)).title||n}".`}}])}function Lf(e){xs(e);let o=is(e),r=ds(),n=Os(),a=Ad(),i=!1,s=e.backend.on("records.eventDeliveryFailed",()=>{i||(i=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{i=!1}))});el();let c=e.workspace.onOpenOwnLink(P=>{jn(P)});e.registerView("todo.panel",oc),e.registerView("todo.file",rc),e.registerView("todo.page",nc),e.registerView("todo.settings",uc);let u=yd(e),l=bl(e),p=e.interop.services.provide(ga,fc(e)),g=Td(),b=ll(),m=e.interop.services.subscribe(Kt,()=>{}),k=e.interop.services.subscribe(Kt,()=>{}),T=ul(e),F=mc(),_=rd();return()=>{s(),o(),u(),l(),p(),g(),b(),m(),k(),T(),F(),_(),c(),n(),a(),r()}}var Pf={register:Lf},pT=Pf;export{pT as default,Lf as register};

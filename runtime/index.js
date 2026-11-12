var ft="valley";var uf=`.${ft}`,pf=`app.${ft}`;function Jl(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Ql=/^[a-zA-Z]:/;function Io(e){if(typeof e!="string")return"";let t=Jl(e);return!t||t==="."||Ql.test(t)||t.split("/").some(r=>r==="..")?"":t}function Nt(e){if(typeof e=="string")return Io(e)||void 0}var xe=`.${ft}`,ec="plugins",No=`${xe}/${ec}`,hr=`${No}/packages`,gf=`${hr}/core`,hf=`${hr}/github`,bf=`${hr}/local`,yf=`${hr}/community`,wf=`${No}/community.json`,vf=`${No}/data`;var xf=`${No}/enabled.json`,kf=`${No}/sources.json`,Tf=`${xe}/state`,Ae=`${xe}/settings`,Di=`${xe}/data`,Bn=`${xe}/recovery`;var Hn=`${xe}/accounts`,so=`${xe}/ai`,Sf=`${so}/connections.json`,Af=`${so}/defaults.json`,Ef=`${so}/budgets.json`,Df=`${so}/usage.sqlite`,Cf=`${so}/security/guards.json`,If=`${so}/security/activity.sqlite`,Nf=`${Hn}/providers`,Lf=`${Hn}/providers.lock.json`,tc=`${xe}/trash`,Pf=`${tc}/items`,Wn=`${xe}/cache`,Of=`${Wn}/accounts`,oc=`${Wn}/search`,Mf=`${Wn}/providers`;var _f=`${oc}/index.jsonl`,zf=`${Bn}/drafts`,Ff=`${Bn}/transactions`,Gf=`${Bn}/retired`;var gt="design",rc="themes",Ci=`${xe}/${gt}/${rc}`,$f=`${Ci}/local`,Rf=`${Ci}/community`,jf={app:`${Ae}/app.json`,appearance:`${xe}/${gt}/appearance.json`,"icon-rail":`${xe}/${gt}/icon-rail.json`,"footer-rail":`${xe}/${gt}/footer-rail.json`,"plugin-startup":`${xe}/${gt}/right-sidebar-startup.json`,"new-tab":`${xe}/${gt}/new-tab.json`,pallette:`${xe}/${gt}/palette.json`,group:`${Di}/groups.json`,units:`${Di}/units.json`,metadata:`${Ae}/file-viewers.json`,notification:`${Ae}/notification.json`,"notification-settings":`${Ae}/notification-settings.json`,preferences:`${Ae}/preferences.json`,"link-actions":`${Ae}/link-actions.json`,markdown:`${Ae}/markdown.json`,editor:`${Ae}/editor.json`,"editor-vim":`${Ae}/editor-vim.json`,"markdown-todo":`${Ae}/markdown-todo.json`,"markdown-codeblocks":`${Ae}/markdown-codeblocks.json`,"markdown-template":`${Ae}/markdown-template.json`,"markdown-embeed":`${Ae}/markdown-embeed.json`,files:`${Ae}/file.json`,"file-sorter":`${Ae}/file-sorter.json`,"file-sym-link":`${Ae}/file-sym-link.json`,search:`${Ae}/search.json`,"search-tag":`${Ae}/search-tag.json`,"search-content":`${Ae}/search-content.json`,design:`${xe}/${gt}/appearance.json`,accounts:`${Hn}/connections.json`};var Ii=ft,Ni="open";var nc=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Li=16384;var Pi=new Set(["__proto__","prototype","constructor"]);function Oi(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function br(e){let t=new WeakSet,r=0,n=(i,d)=>{if(++r>8192||d>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Oi(i)>Li)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let c=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!c&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let l=Reflect.ownKeys(i);if(l.length+r>8192||l.some(h=>typeof h=="string"&&Pi.has(h)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(i);if(c){let h=u.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(m,A)=>{let S=u[String(A)];return S&&"value"in S?n(S.value,d+1)??null:null})}let g={};for(let h of Object.keys(u).sort()){if(Pi.has(h))throw new Error("Invalid bookmark state key");let m=u[h];if(!m.enumerable||!("value"in m)){r++;continue}let A=n(m.value,d+1);A!==void 0&&(g[h]=A)}return g}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Oi(JSON.stringify(a))>Li)throw new Error("Bookmark state is too large");return a}function zi(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=Io(e);if(!t)throw new Error("Invalid bookmark path");return t}function qn(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Mi(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function Yn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!nc.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=br(t.state);return r.path!==void 0&&(r.path=zi(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var ac=/^[A-Za-z0-9_-]{1,64}$/;function _i(e,t){if(typeof e!="string"||!ac.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Fi(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=qn(t.title,512,"title"),n={...t.description===void 0?{}:{description:qn(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:qn(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:_i(t.group,"group")};if(t.groupId!==void 0){let c=_i(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:c,...n}}if(t.target!==void 0){let c={folderPath:"",title:r,target:Yn(t.target),...n,...a};return{...c,searchText:Mi(c)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let d={folderPath:zi(t.folderPath),title:r,...n,...a};return{...d,searchText:Mi(d)}}function Lt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,d)=>{if(++t>2048||d>32||!r(i)||typeof i.type!="string")return!1;let c=(...p)=>Object.keys(i).every(l=>l==="type"||p.includes(l));return["unknown","null","boolean","number","string","function"].includes(i.type)?c():i.type==="literal"?c("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?c("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,d+1):i.type==="tuple"?c("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,d+1)):i.type==="union"?c("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,d+1)):i.type==="object"?c("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,l])=>n(p)&&a(l,d+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function yr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(d,c,p)=>{if(--n<0||p>64)return!1;if(d.type==="unknown")return!0;if(d.type==="null")return c===null;if(d.type==="literal")return c===d.value;if(d.type==="union")return d.anyOf.some(l=>i(l,c,p+1));if(d.type==="number")return typeof c=="number"&&Number.isFinite(c);if(d.type==="string"||d.type==="boolean"||d.type==="function")return typeof c===d.type;if(!c||typeof c!="object"||a.has(c))return!1;a.add(c);try{return d.type==="array"?Array.isArray(c)&&c.length<=(d.maxItems??1e5)&&c.every(l=>i(d.items,l,p+1)):d.type==="tuple"?Array.isArray(c)&&c.length>=(d.minItems??d.items.length)&&c.length<=d.items.length&&c.every((l,u)=>i(d.items[u],l,p+1)):d.type==="object"?Array.isArray(c)||d.required?.some(l=>!Object.hasOwn(c,l))?!1:Object.entries(c).every(([l,u])=>Object.hasOwn(d.properties,l)?i(d.properties[l],u,p+1):d.additionalProperties===!0):!1}finally{a.delete(c)}};return i(e,t,0)}var ic=new Map;function fe(e,t,r,n,a,i,d,c,p="owner"){let l=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:d,serviceMetadata:c});return ic.set(`${t}:${e}@${r}`,l),l}var Zn=256;function Jn(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var J=e=>!!e&&typeof e=="object"&&!Array.isArray(e),he=(e,t)=>typeof e[t]=="function",Pt=e=>e===void 0,lo=e=>typeof e=="boolean",oe=e=>typeof e=="string",Fe=e=>e===void 0||oe(e),sc=e=>e===void 0||typeof e=="number",dc=e=>e===void 0||typeof e=="boolean",me=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Pe=e=>J(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Gi=e=>J(e),Ri=e=>J(e)&&oe(e.id)&&oe(e.title)&&oe(e.date)&&(e.documentRef===void 0||J(e.documentRef)&&oe(e.documentRef.pluginId)&&oe(e.documentRef.sourceId)&&oe(e.documentRef.itemId)),lc=e=>J(e)&&oe(e.date)&&Fe(e.startTime)&&Fe(e.endTime)&&Fe(e.sourceId)&&Fe(e.itemId),cc=e=>J(e)&&oe(e.url)&&Fe(e.title)&&dc(e.newTab),uc=e=>J(e)&&oe(e.query),ji=e=>J(e)&&oe(e.name)&&Fe(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),pc=e=>Array.isArray(e)&&e.every(ji),mc=e=>e===null||ji(e),fc=e=>e===void 0||J(e)&&Fe(e.approvalToken)&&(e.cancellation===void 0||J(e.cancellation)),gc=e=>typeof e=="string"||J(e)&&typeof e.text=="string",hc=e=>J(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&J(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Fe(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ki=e=>J(e)&&oe(e.id)&&oe(e.label)&&Fe(e.labelKey)&&Fe(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ki)),Ui={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ri)},create:{args:e=>me(e,[oe,Gi]),result:lo},update:{args:e=>me(e,[oe,Gi]),result:lo},remove:{args:e=>me(e,[oe]),result:lo},open:{args:e=>me(e,[oe]),result:Pt},configure:{args:e=>e.length===0,result:Pt},actions:{args:e=>me(e,[oe]),result:e=>Array.isArray(e)&&e.every(Ki)},runAction:{args:e=>me(e,[oe,oe]),result:lo}},Vi=e=>J(e)&&oe(e.name)&&oe(e.version)&&Fe(e.description)&&Fe(e.author)&&(e.localized===void 0||J(e.localized)&&Object.values(e.localized).every(t=>J(t)&&oe(t.name)&&Fe(t.description))),bc=fe("calendar.itemSource","service","1.3.0","many",e=>J(e)&&he(e,"list")&&(e.integration===void 0||Vi(e.integration)),void 0,Ui,e=>e.integration),wr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,Xn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,yc=e=>J(e)&&wr(e.startDate)&&wr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=Zn&&(e.cursor===void 0||Xn(e.cursor)),wc=e=>J(e)&&Xn(e.revision)&&(e.cursor===void 0||Xn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=Zn&&e.items.every(t=>Ri(t)&&wr(t.date)&&(t.endDate===void 0||wr(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,Ot=fe("calendar.itemSource","service","2.0.0","many",e=>J(e)&&he(e,"list")&&(e.integration===void 0||Vi(e.integration)),void 0,{...Ui,list:{args:e=>me(e,[yc]),result:wc}},e=>e.integration),Lo=fe("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),vc=fe("calendar.navigator","service","1.0.0","one",e=>J(e)&&he(e,"openDate"),void 0,{openDate:{args:e=>me(e,[lc]),result:Pt}}),vr=fe("calendar.panelSelection","state","1.0.0","one",e=>J(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),xc=fe("web.activeContext","state","1.0.0","one",e=>J(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function $i(e){return J(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>J(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var kc=fe("contacts.directory","service","1.0.0","one",e=>J(e)&&["search","resolveEmails","open"].every(t=>he(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every($i)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>J(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every($i))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||J(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Pt}}),Tc=fe("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Sc=fe("web.navigator","service","1.0.0","one",e=>J(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[cc]),result:Pt}}),Ac=fe("selection.textAction","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&he(e,"run"),e=>[e.id]),Ec=fe("geo.navigator","service","1.0.0","one",e=>J(e)&&he(e,"open"),void 0,{open:{args:e=>me(e,[uc]),result:Pt}}),Dc=fe("geo.search","service","1.0.0","one",e=>J(e)&&he(e,"search")&&he(e,"reverse"),void 0,{search:{args:e=>me(e,[oe]),result:pc},reverse:{args:e=>me(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:mc}}),Qn=fe("agent.toolProvider","service","1.0.0","many",e=>J(e)&&Array.isArray(e.tools)&&e.tools.every(hc)&&he(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>me(e,[oe,J,fc]),result:gc}},e=>({tools:e.tools}),"global"),Cc=fe("guard.runtime","service","1.0.0","one",e=>J(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>he(e,t)),void 0,{resolve:{args:e=>me(e,[J]),result:J},requestApproval:{args:e=>me(e,[J]),result:lo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&oe(e[0])&&Fe(e[1]),result:lo},audit:{args:e=>me(e,[J]),result:Pt}}),Ic=fe("browser.automation","service","1.0.0","one",e=>J(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>he(e,t)),void 0,{list:{args:e=>e.length===0,result:Pe},open:{args:e=>me(e,[oe]),result:Pe},switch:{args:e=>me(e,[oe]),result:Pe},close:{args:e=>me(e,[oe]),result:Pe},snapshot:{args:e=>me(e,[oe]),result:Pe},readText:{args:e=>e.length>=1&&e.length<=2&&oe(e[0])&&sc(e[1]),result:Pe},readHtml:{args:e=>me(e,[oe]),result:Pe},screenshot:{args:e=>me(e,[oe]),result:Pe},click:{args:e=>me(e,[oe,t=>typeof t=="number"]),result:Pe},type:{args:e=>e.length>=3&&e.length<=4&&oe(e[0])&&typeof e[1]=="number"&&oe(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Pe},select:{args:e=>me(e,[oe,t=>typeof t=="number",oe]),result:Pe},scroll:{args:e=>me(e,[oe,t=>typeof t=="number",t=>typeof t=="number"]),result:Pe},pressKey:{args:e=>me(e,[oe,oe]),result:Pe},navigate:{args:e=>me(e,[oe,oe]),result:Pe},back:{args:e=>me(e,[oe]),result:Pe},forward:{args:e=>me(e,[oe]),result:Pe},reload:{args:e=>me(e,[oe]),result:Pe}}),Nc=fe("fileTree.contextItem","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Fe(e.labelKey)&&he(e,"run"),e=>[e.id]),Lc=fe("newTab.entry","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"run"),e=>[e.id]),ea=fe("search.resultAction","extension","1.0.0","many",e=>J(e)&&typeof e.cardKind=="string"&&he(e,"open"),e=>[e.cardKind]),Pc=fe("search.resultCard","extension","1.0.0","many",e=>J(e)&&typeof e.cardKind=="string"&&he(e,"render")&&he(e,"open"),e=>[e.cardKind]),xr=fe("metadataPanel.segment","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"render"),e=>[e.id]),ta=fe("workspace.surface","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&he(e,"getSnapshot")&&he(e,"subscribe")&&he(e,"restore"),e=>[e.id]),Oc=fe("metadata.plugin","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&he(e,"facts"),e=>[e.id]),Mc=fe("workspace.viewState","extension","1.0.0","many",e=>J(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&he(e,"capture")&&he(e,"restore")&&he(e,"subscribe"),e=>[e.id]);var kr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},oa=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Bi=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Hi=e=>oa(e)&&typeof e.surface=="string"&&Bi.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function Po(e){let t=kr(e);if(!Hi(t))throw new Error("Invalid bookmark descriptor");let r=Yn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Fi({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function ra(e){try{let t=Po(e),r=kr(e);return JSON.stringify(t.state)===JSON.stringify(br(r.state))}catch{return!1}}function _c(e){try{let t=kr(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:Po(t.bookmark)}}catch{}return{status:"invalid"}}var zc=e=>{try{let t=kr(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&ra(t.bookmark)}catch{return!1}},Fc=e=>oa(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Wi=fe("workspace.bookmark","service","1.0.0","many",e=>oa(e)&&typeof e.id=="string"&&Bi.has(String(e.surface))&&Lt(e.stateSchema)&&(e.itemStateSchema===void 0||Lt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Hi(e[0]),result:zc,sanitizeResult:_c},restore:{args:e=>e.length===1&&ra(e[0]),result:Fc}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function na(e,t,r){if(!Lt(r.stateSchema)||r.itemStateSchema!==void 0&&!Lt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(l,u,g=!1)=>yr(g&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,l,8192)&&(!r.validate||r.validate(l,u)),i=(l,u,g)=>{let h=g?void 0:r.primary?r.primary(l):l.item,m=br(h?.state??l.view);if(!a(m,u,!!h))throw new Error("Invalid bookmark state");return Po({...u,title:h?.title??l.title,description:r.description(l,!!h),state:m,...h?{itemId:h.id}:{}})},d={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(l.instanceId),l,!1)}}catch{return{status:"invalid"}}},async restore(l){if(!n||l.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=Po(l),!a(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},c=e.interop.services.provide(Wi,d),p;try{p=e.interop.extensions.provide(ta,{...t,getSnapshot(l){let u=t.getSnapshot(l),g={surface:t.surface,...l===void 0?{}:{instanceId:l}},h,m;try{h=i(u,g,!1)}catch{}try{m=i(u,g,!0)}catch{}return{...u,bookmark:h,bookmarkView:m}}})}catch(l){throw n=!1,c(),l}return()=>{n=!1,p(),c()}}var Oo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),qi=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Yi(e){if(!Oo(e)||!qi(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!Oo(r)||!qi(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!Oo(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!Oo(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!Oo(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var Gc=fe("workspace.details","extension","1.0.0","many",Yi,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var bg=[xe,`${xe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Lg=1024*1024;var Mg=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var _g=globalThis.Buffer;var Rc=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,Tr=new Map,Sr;function Ce(){return Sr}function Ar(e,t){let r=Tr.get(e)??new Set;return r.add(t),Tr.set(e,r),()=>{r.delete(t),r.size||Tr.delete(e)}}function Xi(e){Sr?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return Sr={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},Sr.dispose}var jc=1800;function co(e){let t=Oe();o.useEffect(()=>{let r=null,n=null,a=null,i=0,d=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},c=u=>{if(u.mode==="create")return;i=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let g=Date.now()+2500,h=()=>{if(r=null,i!==u.nonce)return;let m=[...Tr.get(u.todoId)??[]].find(A=>A.isConnected);if(!m){Date.now()<g?r=setTimeout(h,40):t.get()?.nonce===u.nonce&&t.clear();return}m.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),d(),m.classList.add("todo-reveal-target"),a=m,n=setTimeout(d,jc),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(h,0)},p=t.subscribe(()=>{let u=t.get();u&&c(u)}),l=t.get();return l&&c(l),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),d()}},[t,e])}function Oe(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function Zi(){Oe().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var Kc=`
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

`,aa="notes-todo-styles";function Ji(){let e=document.getElementById(aa);return e||(e=document.createElement("style"),e.id=aa,document.head.appendChild(e)),e.textContent=Kc,()=>{document.getElementById(aa)===e&&e.remove()}}var ne="#12120f",ge="#ffffff",sa=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ne,onDark:ne},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ge,onDark:ge},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ne,onDark:ne},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ge,onDark:ne},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ne,onDark:ne},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ge,onDark:ne},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ge,onDark:ne},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ge,onDark:ne},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ge,onDark:ne},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ge,onDark:ge},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ne,onDark:ne},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ge,onDark:ne},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ge,onDark:ne},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ne,onDark:ne},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ge,onDark:ne},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ge,onDark:ne},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ge,onDark:ne},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ge,onDark:ne},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ne,onDark:ne},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ne,onDark:ne},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ge,onDark:ne},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ge,onDark:ne},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ge,onDark:ne},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ge,onDark:ne},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ge,onDark:ne},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ge,onDark:ne},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ne,onDark:ne},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ne,onDark:ne},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ge,onDark:ne},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ne,onDark:ne},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ge,onDark:ne},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ge,onDark:ne},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ne,onDark:ne},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ge,onDark:ne},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ge,onDark:ne},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ge,onDark:ne}],Uc=["semantic","muted","accent","categorical"];var Th=new Map(sa.map(e=>[e.id,e])),Vc={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Bc=new Map(sa.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Hc=/^[a-z][a-z0-9-]{0,47}$/,Wc={version:4,families:Uc.map(e=>({id:e,name:Vc[e]})),colors:sa.map(e=>({id:e.id,familyId:e.family,name:Bc.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},qc=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var Yc=qc(Wc);function Qi(){return Yc}var ia=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Er="palette:",Xc=/^#[0-9a-f]{6}$/i;function Dr(e){return e.startsWith(Er)&&Hc.test(e.slice(Er.length))}function we(e){return`${Er}${e}`}function Mo(e){return Dr(e)?e.slice(Er.length):void 0}function es(e){if(typeof e!="string")return;let t=e.trim();return Dr(t)?t:Xc.test(t)?t.toLowerCase():void 0}function Ee(e){let t=Mo(e);return t?`var(--color-${t})`:e}function ht(e){let t=Mo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function da(e){let t=new Set(e.map(r=>Mo(r)??r.toLowerCase()));return we(ia.find(r=>!t.has(r))??ia[0])}function ts(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=ia;return we(r[Math.abs(t)%r.length])}function Y(e){return e.trim().toLowerCase()}function Zc(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",d=Y(i);!d||d===Y(t)||r.has(d)||(r.add(d),n.push(i))}return n}function os(e){return`group_${Y(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Mt(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",d=Y(i);if(!i||r.has(d))continue;r.add(d);let c=typeof a.id=="string"&&a.id.trim()?a.id.trim():os(i),p=es(a.color)??da(t.map(u=>u.color)),l=Zc(a.aliases,i,r);t.push({id:c,name:i,color:p,...l.length?{aliases:l}:{}})}return t}function _o(e,t){let r=Y(t??"");if(r)return e.find(n=>Y(n.name)===r||(n.aliases??[]).some(a=>Y(a)===r))}function Cr(e,t){return _o(t,e)?.name}function ze(e,t){let r=Y(e??"");return r?_o(t,e)?.color??ts(r):we("primary-blue")}function la(e){return da(e.map(t=>t.color))}function ca(e){let t={};for(let r of e){let n=Y(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var rs={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists","todo.settings.section.statuses":"Statuses","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.statusAppearance":"Appearance","todo.settings.statusStyle":"Status style","todo.settings.statusStyleDesc":"Filled shows each status as a badge in its color; Text shows a colored label.","todo.settings.styleFilled":"Filled","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Preview","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.filters.show":"Show","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusesDescCustom":"To do and Completed are always available. Drag the others to reorder them, switch one off to archive it, or add your own below.","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusShowCustom":"Show {{p0}} (off archives it)","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do groups","todo.settings.localGroupsDesc":"Groups only To-Do uses, beside the shared groups above. Put one under a shared group to include its tasks in that group.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Under shared group","todo.settings.localGroupParentOf":"Shared group of {{p0}}","todo.settings.localGroupNoParent":"None","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupDeleteTitle":"Delete the group \u201C{{p0}}\u201D?","todo.settings.localGroupDeleteMoves":"{{count}} tasks in this group will have no group.","todo.settings.localGroupDeleteUnused":"No task uses this group.","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add group","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text."};var ns={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen","todo.settings.section.statuses":"Status","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.statusAppearance":"Darstellung","todo.settings.statusStyle":"Statusdarstellung","todo.settings.statusStyleDesc":"Gef\xFCllt zeigt jeden Status als Badge in seiner Farbe; Text zeigt eine farbige Beschriftung.","todo.settings.styleFilled":"Gef\xFCllt","todo.settings.styleText":"Text","todo.settings.colStatus":"Status","todo.settings.colPreview":"Vorschau","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.filters.show":"Anzeigen","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusesDescCustom":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen, zum Archivieren ausschalten oder unten um eigene erg\xE4nzen.","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusShowCustom":"{{p0}} einblenden (aus archiviert ihn)","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"To-Do-Gruppen","todo.settings.localGroupsDesc":"Gruppen nur f\xFCr To-Do, neben den geteilten Gruppen oben. Unter einer geteilten Gruppe z\xE4hlen ihre Aufgaben zu dieser Gruppe.","todo.settings.localGroupName":"Name","todo.settings.localGroupParent":"Unter geteilter Gruppe","todo.settings.localGroupParentOf":"Geteilte Gruppe von {{p0}}","todo.settings.localGroupNoParent":"Keine","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupDeleteTitle":"Gruppe \u201E{{p0}}\u201C l\xF6schen?","todo.settings.localGroupDeleteMoves":"{{count}} Aufgaben dieser Gruppe haben danach keine Gruppe.","todo.settings.localGroupDeleteUnused":"Keine Aufgabe verwendet diese Gruppe.","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Gruppe hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text."};var as={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas","todo.settings.section.statuses":"Estados","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.statusAppearance":"Apariencia","todo.settings.statusStyle":"Estilo de estado","todo.settings.statusStyleDesc":"Relleno muestra cada estado como una etiqueta de su color; Texto muestra un r\xF3tulo coloreado.","todo.settings.styleFilled":"Relleno","todo.settings.styleText":"Texto","todo.settings.colStatus":"Estado","todo.settings.colPreview":"Vista previa","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.filters.show":"Mostrar","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusesDescCustom":"Pendiente y Completada siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos, desactiva uno para archivarlo o a\xF1ade los tuyos abajo.","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusShowCustom":"Mostrar {{p0}} (desactivado se archiva)","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos de To-Do","todo.settings.localGroupsDesc":"Grupos solo de To-Do, junto a los grupos compartidos de arriba. Bajo un grupo compartido, sus tareas cuentan en ese grupo.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupParent":"Bajo el grupo compartido","todo.settings.localGroupParentOf":"Grupo compartido de {{p0}}","todo.settings.localGroupNoParent":"Ninguno","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupDeleteTitle":"\xBFEliminar el grupo \xAB{{p0}}\xBB?","todo.settings.localGroupDeleteMoves":"{{count}} tareas de este grupo quedar\xE1n sin grupo.","todo.settings.localGroupDeleteUnused":"Ninguna tarea usa este grupo.","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir grupo","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto."};var is={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes","todo.settings.section.statuses":"Statuts","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.statusAppearance":"Apparence","todo.settings.statusStyle":"Style des statuts","todo.settings.statusStyleDesc":"Plein affiche chaque statut comme un badge de sa couleur ; Texte affiche un libell\xE9 color\xE9.","todo.settings.styleFilled":"Plein","todo.settings.styleText":"Texte","todo.settings.colStatus":"Statut","todo.settings.colPreview":"Aper\xE7u","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.filters.show":"Afficher","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusesDescCustom":"\xC0 faire et Termin\xE9 sont toujours disponibles. Faites glisser les autres pour les r\xE9organiser, d\xE9sactivez-en un pour l\u2019archiver ou ajoutez les v\xF4tres ci-dessous.","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusShowCustom":"Afficher {{p0}} (d\xE9sactiv\xE9, il est archiv\xE9)","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes To-Do","todo.settings.localGroupsDesc":"Groupes propres \xE0 To-Do, \xE0 c\xF4t\xE9 des groupes partag\xE9s ci-dessus. Plac\xE9 sous un groupe partag\xE9, un groupe y ajoute ses t\xE2ches.","todo.settings.localGroupName":"Nom","todo.settings.localGroupParent":"Sous le groupe partag\xE9","todo.settings.localGroupParentOf":"Groupe partag\xE9 de {{p0}}","todo.settings.localGroupNoParent":"Aucun","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupDeleteTitle":"Supprimer le groupe \xAB {{p0}} \xBB ?","todo.settings.localGroupDeleteMoves":"{{count}} t\xE2ches de ce groupe n\u2019auront plus de groupe.","todo.settings.localGroupDeleteUnused":"Aucune t\xE2che n\u2019utilise ce groupe.","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter un groupe","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte."};var ss={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868","todo.settings.section.statuses":"\u72B6\u6001","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.statusAppearance":"\u5916\u89C2","todo.settings.statusStyle":"\u72B6\u6001\u6837\u5F0F","todo.settings.statusStyleDesc":"\u586B\u5145\u5C06\u6BCF\u4E2A\u72B6\u6001\u663E\u793A\u4E3A\u5176\u989C\u8272\u7684\u5FBD\u7AE0\uFF1B\u6587\u672C\u663E\u793A\u5F69\u8272\u6807\u7B7E\u3002","todo.settings.styleFilled":"\u586B\u5145","todo.settings.styleText":"\u6587\u672C","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colPreview":"\u9884\u89C8","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.filters.show":"\u663E\u793A","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusesDescCustom":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u53EF\u91CD\u65B0\u6392\u5E8F\uFF0C\u5173\u95ED\u5373\u53EF\u5F52\u6863\uFF0C\u4E5F\u53EF\u4EE5\u5728\u4E0B\u65B9\u6DFB\u52A0\u81EA\u5DF1\u7684\u72B6\u6001\u3002","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusShowCustom":"\u663E\u793A {{p0}}\uFF08\u5173\u95ED\u5373\u5F52\u6863\uFF09","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5F85\u529E\u4F7F\u7528\u7684\u5206\u7EC4\uFF0C\u4E0E\u4E0A\u65B9\u7684\u5171\u4EAB\u5206\u7EC4\u5E76\u5217\u3002\u653E\u5728\u67D0\u4E2A\u5171\u4EAB\u5206\u7EC4\u4E0B\uFF0C\u5176\u4EFB\u52A1\u4E5F\u4F1A\u8BA1\u5165\u8BE5\u5206\u7EC4\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupParent":"\u6240\u5C5E\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupParentOf":"{{p0}} \u7684\u5171\u4EAB\u5206\u7EC4","todo.settings.localGroupNoParent":"\u65E0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupDeleteTitle":"\u5220\u9664\u5206\u7EC4\u201C{{p0}}\u201D\uFF1F","todo.settings.localGroupDeleteMoves":"\u6B64\u5206\u7EC4\u4E2D\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u4E0D\u518D\u5C5E\u4E8E\u4EFB\u4F55\u5206\u7EC4\u3002","todo.settings.localGroupDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4\u3002","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0\u5206\u7EC4","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002"};var ds={en:rs,de:ns,es:as,fr:is,"zh-CN":ss};function ls(e,t){return(ds.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var cs=ls;function us(e){e.ui.registerCatalogs(ds),cs=(t,r)=>{let n=e.ui.t(t,r);return n===t?ls(t,r):n}}function s(e,t){return cs(e,t)}var ru={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},nu={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},au={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},ps=()=>{};function ms(e){ps=e}function at(e,t=""){if(e===null||e==="open")return s("todo.status.todo");let r=ru[e];return r?s(r):ps(e)??(t||e)}function _t(e){return s(nu[e])}function fs(e){return s(au[e])}var iu=["auto","white","black"],Lr=40,ua=40,su=["completed","canceled"],gs="statuses",zo=[{id:"open",labelKey:"todo.status.todo",color:we("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:we("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:we("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:we("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:we("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:we("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:we("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:we("red"),done:!0,cls:"todo-st-canceled",locked:!1}],pa=we("teal");var ma=zo.map(e=>e.id),Pr=zo.filter(e=>!e.locked).map(e=>e.id),jh=zo.filter(e=>e.done).map(e=>e.id),Ir=new Map(zo.map(e=>[e.id,e])),du=new Set(Pr);function zt(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function hs(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function lu(e){if(typeof e!="string"||!Dr(e))return!1;let t=Mo(e);if(!t)return!1;let r=Qi();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function cu(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.label=="string"?a.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,ua):"";if(!(!zt(a.id)||t.has(a.id)||!i)&&(t.add(a.id),r.push({id:a.id,label:i,done:a.done===!0}),r.length>=Lr))break}return r}function Or(e){let t=e&&typeof e=="object"?e:{},r=cu(t.custom),n=new Set(r.map(S=>S.id)),a=Array.isArray(t.active)?t.active:Pr,i=[];for(let S of a)typeof S!="string"||!(du.has(S)||n.has(S))||i.includes(S)||i.push(S);let d=[...ma,...r.map(S=>S.id)],c=S=>S&&typeof S=="object"?S:{},p=c(t.colors),l=Object.fromEntries(d.map(S=>{let _=Ir.get(S)?.color??pa;return[S,lu(p[S])?p[S]:_]})),u=c(t.textColors),g=Object.fromEntries(d.map(S=>[S,iu.includes(u[S])?u[S]:"auto"])),h=c(t.strikethrough),m=Object.fromEntries(d.map(S=>[S,typeof h[S]=="boolean"?h[S]:su.includes(S)||r.some(_=>_.id===S&&_.done)])),A=t.style==="text"?"text":"filled";return{active:i,custom:r,colors:l,textColors:g,strikethrough:m,style:A}}function Ve(){return Or(f?.settings.get()[gs])}function bs(e){f.settings.set(gs,Or(e))}ms(e=>Ve().custom.find(t=>t.id===e)?.label);function Ft(e=Ve()){return[...ma,...e.custom.map(t=>t.id)]}function uo(e,t=Ve()){return Ir.has(e)?Ir.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function uu(e){return`todo-st-${e}`}function pu(e,t=Ve()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":ht(t.colors[e]??pa)}function Ie(e,t=Ve()){let r=e&&zt(e)?t.custom.find(a=>a.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??pa,done:r.done,cls:uu(r.id),locked:!1,custom:!0};let n=e&&Ir.get(e)||zo[0];return{...n,label:at(n.id),color:t.colors[n.id],custom:!1}}function Nr(e=Ve()){return[Ie("open",e),Ie("completed",e),...e.active.map(t=>Ie(t,e))]}function bt(){return Nr().map(e=>e.id)}function ys(e){return e==="open"||e==="completed"||Ve().active.includes(e)}function it(){let[e,t]=o.useState(()=>Nr());return o.useEffect(()=>f.settings.subscribe(()=>t(Nr())),[]),e}function po(e,t=bt()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function mo(e,t){return t==="all"||t.includes(Ne(e))}function Mr(e){if(typeof e=="string")return ma.includes(e)||zt(e)?e:void 0}function Ne(e){return e.status??(e.completed?"completed":"open")}function ke(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:uo(e,t),status:e}}function fo(){return Nr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:Ee(e.color)}))}function mu(){let e=Ve();return Ft(e).map(t=>{let r=Ie(t,e),n=Ee(r.color),a=pu(t,e),i=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${a}}`+i}).join("")}function ws(){let[e,t]=o.useState(()=>Ve().style);return o.useEffect(()=>f.settings.subscribe(()=>t(Ve().style)),[]),e}function vs(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=mu()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function xs(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let d=t.slice(i,i+20),c=new Map;for(;d.length;){r();let p=await a.aggregate({where:{taskId:{in:d},or:["completed","canceled"].map(u=>({to:u,from:{in:Ft().filter(g=>g!==u)}})),...c.size?{and:[{or:d.map(u=>({taskId:u,position:{lt:c.get(u)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let l=await a.query({select:["taskId","changedAt"],where:{or:p.map(u=>({taskId:u.taskId,position:u.position}))},limit:20});r(),d=[];for(let u of l.rows){let g=String(u.taskId);if(typeof u.changedAt=="string"&&u.changedAt)n.set(g,{changedAt:u.changedAt});else{let h=p.find(m=>m.taskId===g)?.position;if(typeof h!="number"||!Number.isInteger(h))throw new Error("Invalid completion position");c.set(g,h),d.push(g)}}}}return n}function Fo(e){return"historyLoaded"in e&&e.historyLoaded===!1}function Ge(e,t=""){return typeof e=="string"?e:t}function _r(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zr(e){let t=Ge(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function ks(e){let t=Ge(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var fu=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],Wh=Object.fromEntries(fu.map(e=>[e,{destination:"ask",recognize:!0}]));var gu=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",ft]);function hu(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function Go(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=hu(e);if(!t||gu.has(t)||t.startsWith(`${ft}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var bu=16384,yu=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function wu(e){if(!e||e.length>bu||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function vu(e){try{let t=new URL(e);if(t.protocol!==`${Ii}:`||t.hostname!==Ni)return null;let r=t.searchParams.get("realm")??"",n=Io(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!yu.test(a))return null;let i=wu(t.searchParams.get("state")??""),d=t.searchParams.get("surface");if(d&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(d))return null;let c=t.searchParams.get("instance");return c&&c.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...d?{surface:d}:{},...c?{instanceId:c}:{}}:null}catch{return null}}function go(e){let t=vu(e);return t?.kind==="file"?t.relPath:null}function Ts(e){return Go(e)!==null}function Gt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var xu=["normal","low","medium","high"];function Ss(e){return e===!0}function ku(e){return typeof e=="string"&&xu.includes(e)?e:"normal"}function Fr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function As(e){return Array.isArray(e)?e.filter(t=>_r(t)).map(t=>({startedAt:Ge(t.startedAt),endedAt:Ge(t.endedAt),activeMinutes:Fr(t.activeMinutes)??0,pauseMinutes:Fr(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function fa(e){return Array.isArray(e)?e.filter(t=>_r(t)).map(t=>({from:Mr(t.from),to:Mr(t.to),changedAt:Ge(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Tu(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function Gr(e){if(typeof e!="string")return;let t=e.trim();if(t)return go(t)||Ts(t)?t:void 0}function Su(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>Gr(n)).filter(n=>!!n))];return r.length?r:void 0}function Au(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>Nt(r)).filter(r=>!!r))];return t.length?t:void 0}function Eu(e){if(!_r(e))return;let t=Ge(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function $o(e){let t=new Date().toISOString(),r=Ge(e.id,Gt("todo")),n=Ge(e.createdAt,t),a=As(e.history),i=fa(e.statusHistory),d=Mr(zt(e.customStatus)?e.customStatus:e.status);return{id:r,title:Ge(e.title).trim(),completed:Ss(e.completed)||d==="completed"||d==="canceled",priority:ku(e.priority),dueDate:Ge(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:zr(e.reminderTime),startTime:zr(e.startTime),endTime:zr(e.endTime),color:ks(e.color),note:Ge(e.note),tags:Array.isArray(e.tags)?e.tags.filter(c=>typeof c=="string"&&!!c.trim()).map(c=>c.trim()):[],estimatedMinutes:Fr(e.estimatedMinutes),actualMinutes:Fr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:d,filePath:Nt(e.filePath),group:Ge(e.group).trim()||void 0,flagged:Ss(e.flagged)||void 0,urls:Su(e.urls),attachments:Au(e.attachments),location:Eu(e.location),remindAt:Tu(e.remindAt),reminderFiredAt:Ge(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Ge(e.updatedAt,n)}}function ga(e,t,r){let n=(l,u=!1)=>{let g=new Map;for(let h of l){let m=g.get(h.taskId);m?m.push(h):g.set(h.taskId,[h])}if(u)for(let h of g.values())h.sort((m,A)=>Number(m.position)-Number(A.position));return g},a=n(t.tags),i=n(t.links,!0),d=n(t.attachments,!0),c=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(l=>$o({...l,tags:(a.get(l.id)??[]).map(u=>u.tag),urls:(i.get(l.id)??[]).map(u=>u.url),attachments:(d.get(l.id)??[]).map(u=>u.path),history:c.get(l.id)??[],statusHistory:p.get(l.id)??[]})).map(l=>({...l,group:Cr(l.group,r)??l.group})).filter(l=>l.title)}var $r="todo.tasks",wa="todo.task_tags",va="todo.task_links",xa="todo.task_attachments",Is="todo.focus_sessions",ho="todo.status_history",Ro=[$r,wa,va,xa],Du=[...Ro,Is,ho],ka=[...Ro,ho];function Cu(e,t){let r=Ce(),n=e.map(d=>r.api.data.dataset(d).subscribe(t)),a=()=>n.forEach(d=>d()),i=r.onDispose(a);return()=>{i(),a()}}function bo(e){return Cu(ka,e)}function Ns(e){let t=Ro.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function yt(e,t,r=Ce()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function Iu(e,t=!0,r=!0,n=Ce()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?yt(wa,a,n):[],yt(va,a,n),yt(xa,a,n),t?yt(Is,a,n):[],t?yt(ho,a,n):[]]),[d,c,p,l,u]=i.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return{tags:d,links:c,attachments:p,sessions:l,statusHistory:u}}async function ya(e,t,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([yt($r,n,e),Iu(r,t,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),ga(a.value,i.value,Mt(e.api.getState().groups))}var Es=new WeakMap;function Rr(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=Es.get(e);i||(i=new Map,Es.set(e,i));let d=i.get(t);if(!d){d={revision:0,pending:new Map};let p=d,l=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{l.forEach(u=>u()),i.clear()}),i.set(t,d)}let c=d.pending.get(n);return c||(c=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=d.revision,l=await a();if(e.assertActive(),p===d.revision)return l}})().finally(()=>{d.pending.delete(n)}),d.pending.set(n,c)),c}function Ls(e,t){let r=Ce();return Rr(r,e?"full":"calendar",e?Du:Ro,t??"",()=>ya(r,e,t))}var Ps=200;function Nu(e,t){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Ps)return null;let n=t===$r?"id":"taskId",a=[];for(let i of r){let d=i?.[n];if(typeof d!="string"||!d)return null;a.push(d)}return a}var ha=new WeakMap;function Lu(e){let t=ha.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=ka.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let d=i?Nu(i,a):null;if(!d){r.full=!0,r.dirty.clear();return}for(let c of d)r.dirty.add(c);r.dirty.size>Ps&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),ha.delete(e)}),ha.set(e,r),t=r,t}async function Ds(e,t){let r;if(!t)r=await ya(e,!1);else{r=[];for(let a=0;a<t.length;a+=100)r.push(...await ya(e,!1,t.slice(a,a+100)))}let n=await xs(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function Ye(e=Ce()){let t=Lu(e);return Rr(e,"list",ka,"",async()=>{let r=JSON.stringify(Mt(e.api.getState().groups));if(t.full||!t.value||t.groups!==r){t.full=!1,t.dirty.clear();try{t.value=await Ds(e),t.groups=r}catch(p){throw t.full=!0,p}return t.value}if(!t.dirty.size)return t.value;let n=[...t.dirty];t.dirty.clear();let a;try{a=await Ds(e,n)}catch(p){for(let l of n)t.dirty.add(l);throw p}let i=new Map(a.map(p=>[p.id,p])),d=new Set(n),c=[];for(let p of t.value)if(!d.has(p.id))c.push(p);else{let l=i.get(p.id);l&&(c.push(l),i.delete(p.id))}return c.push(...i.values()),t.value=c,c})}var Cs=new WeakMap,Pu=0;function Ou(e,t){let r=Cs.get(e);r||(r=new Map,Cs.set(e,r));let n=r.get(t);if(!n){let d={users:0,key:String(++Pu),scope:{...e,assertActive:()=>{if(e.assertActive(),!d.users)throw new Error("To-Do selection disposed")}}};n=d,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function Mu(e,t,r){return Rr(e,"statusHistory",[ho],r.key,async()=>{let n=await yt(ho,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),fa(n)})}function Os(e){let t=Ce(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=Ou(t,e),d=0,c=!1,p=()=>{let h=++d;Mu(t,e,a).then(m=>{!c&&h===d&&n({scope:t,id:e,history:m})}).catch(()=>{})},l=t.api.data.dataset(ho).subscribe(h=>{(!h.keys||h.keys.some(m=>m.taskId===e))&&p()}),u=()=>{c=!0,l(),i()},g=t.onDispose(u);return p(),()=>{g(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function wt(){return Ls(!0)}async function Xe(e){return e?(await Ls(!0,e))[0]??null:null}function Ms(e,t,r,n){let a=Ce();return Rr(a,"calendarPage",Ro,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset($r).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let d=async g=>{let h=[];for(let m=0;m<i.rows.length;m+=100)h.push(...await yt(g,{taskId:{in:i.rows.slice(m,m+100).map(A=>String(A.id))}},a));return h},c=await Promise.allSettled([d(wa),d(va),d(xa)]),[p,l,u]=c.map(g=>{if(g.status==="rejected")throw g.reason;return g.value});return a.assertActive(),{todos:ga(i.rows,{tags:p,links:l,attachments:u,sessions:[],statusHistory:[]},Mt(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function $t(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function Ta(e,t,r,n,a=!1){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??t:null}catch{return null}}async function ba(e,t,r,n){return await Ta(e,t,r,n)!==null}function Sa(e,t,r){return Ta(e,t,r)}async function jo(e,t){return await Ta(e,t,void 0,void 0,!0)!==null}async function Rt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function jr(e){if(!e.id||!e.title.trim())return!1;let t=await $t(e);return t&&f.undo.push({label:s("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Rt(e.id)}),redo:async()=>({ok:await $t(e)})}),t}async function vt(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await Xe(e),i=Fo(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;Fo(i)&&(delete i.historyLoaded,delete i.completionSummary);let d=await ba(e,i,r,n);return d&&a&&f.undo.push({label:s("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await ba(e,a)}),redo:async()=>({ok:await ba(e,i)})}),d}async function Kr(e){let t=await Xe(e),r=await Rt(e);return r&&t&&f.undo.push({label:s("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await $t(t)}),redo:async()=>({ok:await Rt(e)})}),r}async function st(e,t){await f.ui.confirm({title:s("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${s("todo.delete.message")}`),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await t(e.id)}async function Aa(e,t){let r=await Xe(e);return r?vt(e,{...r,...ke(t),updatedAt:new Date().toISOString()}):!1}async function _s(e,t){let r=await Xe(e);return r?vt(e,{...r,group:t,updatedAt:new Date().toISOString()}):!1}function _u(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function jt(e){let t=_u(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}function ve(e=[]){return e.map(t=>Cr(t.name,e)??t.name)}var zs=e=>[e];function Fs(e){zs=e}function tt(e){return new Set(e.flatMap(t=>zs(t)).map(t=>Y(t)))}var Ea="localGroups",Ur=200,Uo=60,Ko=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function Gs(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Da(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(d=>[d.name,...d.aliases??[]]).map(Y)),n=new Set(t.map(d=>d.id)),a=new Set,i=[];for(let d of e){if(!d||typeof d!="object")continue;let c=d,p=Ko(c.id,64),l=Ko(c.name,Uo),u=Ko(c.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(p)||a.has(p)||!l||r.has(Y(l))||!u)continue;let g=Array.isArray(c.aliases)?[...new Set(c.aliases.map(m=>Ko(m,Uo)).filter(m=>m&&Y(m)!==Y(l)&&!r.has(Y(m))))].slice(0,20):[],h=typeof c.parent=="string"&&n.has(c.parent)?c.parent:void 0;if(a.add(p),r.add(Y(l)),g.forEach(m=>r.add(Y(m))),i.push({id:p,name:l,color:u,...g.length?{aliases:g}:{},...h?{parent:h}:{}}),i.length>=Ur)break}return i}function $s(e,t){let r=Ko(t,Uo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(a=>Y(a)!==Y(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Rs(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{}}))]}function js(e,t,r){let n=t.find(a=>Y(a.name)===Y(e)||(a.aliases??[]).some(i=>Y(i)===Y(e)));return n?[e,...r.filter(a=>a.parent===n.id).flatMap(a=>[a.name,...a.aliases??[]])]:[e]}function Vr(){return Mt(f.getState().groups)}function Kt(){return Da(f?.settings.get()[Ea],Vr())}async function Ks(e){await f.settings.set(Ea,Da(e,Vr()))}function Je(){return Rs(Vr(),Kt())}Fs(e=>js(e,Vr(),Kt()));function Br(e){let t=f.subscribe(e),r=f.settings.subscribe(e);return()=>{t(),r()}}function Be(){let[e,t]=o.useState(Je);return o.useEffect(()=>Br(()=>t(Je())),[]),e}function Us(){let[e,t]=o.useState(Kt);return o.useEffect(()=>Br(()=>t(Kt())),[]),e}function Vs(){let e=Ce(),t=!1,r=()=>{Ye(e).then(a=>{if(e.assertActive(),t)return;let i=new Set(Kt().flatMap(d=>[d.name,...d.aliases??[]]).map(Y));e.api.workspace.reportGroupUsage(ca(a.map(d=>d.group).filter(d=>!d||!i.has(Y(d)))))}).catch(()=>{})};r();let n=bo(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function zu(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Fu(e){let t=e.toLowerCase();return zu(t)?t:"yyyy-mm-dd"}function Bs(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Fu(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Gu="ddd d mmm",$u=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Ru(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(d=>!$u.has(d)))return!1;let r=t.filter(d=>d==="d"||d==="dd"),n=t.filter(d=>d==="ddd"||d==="dddd"),a=t.filter(d=>d==="mmm"||d==="mmmm"),i=t.filter(d=>d==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function ju(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return Ru(t)?t:Gu}var Vo=new Map;function Ku(e,t,r){let n=`${r??""}:${t}`,a=Vo.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Vo.size>=64&&Vo.delete(Vo.keys().next().value),Vo.set(n,a)),a.format(e)}function Hs(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,d]=n,c=new Date(Number(a),Number(i)-1,Number(d),12);return ju(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(d)):p==="dd"?d:p==="yyyy"?a:Ku(c,p,r))}var He=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Bo={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},Hr={high:3,medium:2,low:1,normal:0},Ws=new Intl.Collator(void 0,{sensitivity:"base"});function Ut(e,t){return Ws.compare(e.title,t.title)}function Uu(e,t,r){if(r==="name")return Ut(e,t);if(r==="priority"){let i=Hr[t.priority]-Hr[e.priority];return i!==0?i:dt(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:dt(e,t)}if(r==="due"){let i=e.dueDate||"",d=t.dueDate||"";if(!i&&!d)return dt(e,t);if(!i)return-1;if(!d)return 1;let c=i.localeCompare(d);return c!==0?c:dt(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Ut(e,t)}function Ca(e,t){let r=Hr[t.priority]-Hr[e.priority];return r!==0?r:Ut(e,t)}function dt(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Ca(e,t)}function qs(e,t,r){let n=new Map(e.map(i=>[i,t(i)])),a=i=>i===void 0||i==="";return[...e].sort((i,d)=>{let c=n.get(i),p=n.get(d);if(a(c)!==a(p))return a(c)?1:-1;let l=0;return!a(c)&&!a(p)&&(l=typeof c=="number"&&typeof p=="number"?c-p:Ws.compare(String(c),String(p))),l!==0?r==="asc"?l:-l:Ut(i,d)})}function yo(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let d=n.dueDate||"",c=a.dueDate||"";if(!d&&!c)return dt(n,a);if(!d)return-1;if(!c)return 1;let p=c.localeCompare(d);return p!==0?p:dt(n,a)}let i=Uu(n,a,t);return r==="asc"?i:-i})}function je(e,t="dd-mm-yyyy"){return e?Bs(e,t):""}function Te(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Ia(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function xt(e,t){let r=Ia(e);return r?(r.setDate(r.getDate()+t),Te(r)):e}function Wr(e,t,r="ddd d mmm"){return Hs(e.slice(0,10),r,t)}function Vt(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[d,c,p]=i.split("-").map(Number),[l,u,g]=t.split("-").map(Number);if(!d||!c||!p||!l||!u||!g)return je(e,a);let h=new Date(d,c-1,p),m=new Date(l,u-1,g),A=Math.round((h.getTime()-m.getTime())/864e5);return A===1?r.tomorrow:A===-1?r.yesterday:A>1&&A<7?h.toLocaleDateString(n,{weekday:"long"}):je(e,a)}var zb=new Date(2023,0,1,12);var Vu={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Ho(e){return Vu[e??""]??1}function Ys(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Bu(e,t){return(e.getDay()-t+7)%7}function Xs(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Bu(e,t))}function Bt(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var Wo=["overdue","today","upcoming","someday","completed"],Zs={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function ot(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function qr(e,t=ot()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||dt(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(dt),r.someday.sort(Ca),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Ut(a,i)),r}function Na(e){return Fo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function La(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):ot(t)}function Js(e){let t=new Map(e.map(a=>[a,Na(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||Ut(a,i)),n=new Map;for(let a of r){let i=La(t.get(a)),d=n.get(i);d?d.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function Pa(e,t,r=1,n){let a=n?.dateOf??(c=>c.dueDate?.slice(0,10)??""),i=c=>c?t==="monthly"?c.slice(0,7):t==="daily"?c:ot(Xs(Bt(c),r)):"",d=new Map;for(let c of e){let p=i(a(c)),l=d.get(p);l?l.push(c):d.set(p,[c])}return[...d.entries()].sort(([c],[p])=>c===""?-1:p===""?1:p.localeCompare(c)).map(([c,p])=>({key:c,kind:c?t:"none",todos:p}))}function Yr(e,t=ot()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(d,c,p)=>{let l=p.toLowerCase();if(l==="today")r=t;else if(l==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=ot(u)}else r=p;return c}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(d,c,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",c)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var Ke={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},Hu={open:Ke,get:Ke,"edit-fields":Ke,add:Ke,complete:Ke,done:Ke,reopen:Ke,cancel:Ke,pause:Ke,status:Ke,edit:Ke,"open-page":{type:"null"},search:{type:"array",items:Ke,maxItems:20},list:{type:"array",items:Ke,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:Ke,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},De=e=>typeof e=="string"?e:"",rd=e=>De(e?.query).trim(),Jr=["normal","low","medium","high"];function wo(){return new Date().toISOString()}function Qs(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function ed(e){let t=e.trim();if(!t)return;let r=_o(Je(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function td(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return Qs();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),Qs(t)}return e}function Wu(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function Xr(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Oa(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,d)=>`  ${d+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var Zr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=rd(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function qo(e,t,r){let n=Oa(await wt(),e),a=t(n),i=await Sa(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await jo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await jo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function od(e){return qo(e,t=>({...t,completed:!0,status:"completed",updatedAt:wo()}),t=>`Complete \u201C${t.title}\u201D`)}var Ht={type:"string"},nd={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Ht])),priority:{type:"string",enum:Jr},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Ht}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Ht,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function qu(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in nd.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!Jr.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!bt().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function Yu(e,t,r){let a=(await wt()).find(c=>c.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!ve(Je()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=$o({...a,...t,...t.status?ke(t.status):t.completed!==void 0?ke(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:wo()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let c of["urls","attachments"])if(t[c]?.some(p=>!i[c]?.includes(p)))throw new Error(`Invalid task ${c}.`);let d=await Sa(e,i,a.updatedAt);if(!d)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await jo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await jo(e,d))throw new Error("Could not reapply the task edit.")}}}}async function lt(e){let t=e??{},r=t.id??t.query,n={groups:Je(),statuses:bt()};if(!r)return n;let a=await wt(),i=Oa(a,r);return{...n,records:[i]}}function ad(e){let t=n=>{let a=Hu[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Ht,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=De(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Xe(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Oe().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Ht},required:["id"],additionalProperties:!1},parse:n=>{let a=De(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Xe(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Ht,values:nd,expectedUpdatedAt:Ht},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=De(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:qu(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>Yu(n,a,i),revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=De(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:De(a.due),priority:De(a.priority),status:De(a.status),note:De(a.note),group:De(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:d,note:c,group:p})=>{let l=bt();if(d&&!l.includes(d))throw new Error(`Status "${d}" is not enabled. One of: ${l.join(", ")}`);let u=$o({title:n,priority:i||"normal",status:d||void 0,dueDate:td(a),note:c,group:ed(p)});if(!await $t(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Rt(u.id)},reapply:async()=>{await $t(u)}}}},formatCli:n=>`Added: ${Xr(n)}`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Zr,run:({query:n})=>od(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Zr,run:({query:n})=>od(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=rd(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=jt(n);return(await wt()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(Xr).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Zr,run:({query:n})=>qo(n,a=>({...a,completed:!1,status:"open",updatedAt:wo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>lt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Zr,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!ys(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return qo(a,d=>({...d,...ke(i),updatedAt:wo()}),d=>`${n==="cancel"?"Cancel":"Hold"} \u201C${d.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>lt(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=De(a.query).trim(),d=De(a.status),c=bt();if(!i||!c.includes(d))throw new Error(`Usage: todo status "<id or title>" <${c.join("|")}>`);return{query:i,status:d}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>qo(n,i=>({...i,...ke(a),updatedAt:wo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=De(a.query).trim(),d=De(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(d&&!Jr.includes(d))throw new Error(`Invalid priority "${d}". One of: ${Jr.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:d||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?Wu(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:d,note:c,tags:p,group:l})=>qo(n,u=>({...u,title:a??u.title,priority:i??u.priority,dueDate:d===void 0?u.dueDate:td(d),note:c??u.note,tags:p??u.tags,group:l===void 0?u.group:ed(l),updatedAt:wo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${Xr(n)}`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=De(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await wt(),d=Oa(i,n);if(!a)return{value:{deleted:!1,todo:d,deletedCount:0},revert:null};if(!await Rt(d.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:d,deletedCount:1},revert:{label:`Delete \u201C${d.title}\u201D`,run:async()=>{await $t(d)},reapply:async()=>{await Rt(d.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>lt(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:De(a.section),q:De(a.q)}},fromCli:(n,a)=>({section:De(a.section),q:De(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await wt();if(a){let d=jt(a);i=i.filter(c=>d(c.tags,c.title,c.note))}return n&&Wo.includes(n)?qr(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(Xr).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await wt(),a=Je();return ve(a).map(i=>({name:i,count:n.filter(d=>Y(d.group??"")===Y(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var id={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var Zu=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Ju=/^-\s+(.*)$/,Qu=/^[A-Za-z][\w+.-]*:\/\//;function sd(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(Ju);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let d=Qu.test(a)?null:a.match(Zu);if(d){let c=d[1].trim().toLowerCase(),p=d[2].trim();p===""?(r=c,t.lists[c]=t.lists[c]??[]):(r=null,t.values[c]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function dd(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Ma="notes-todo-fence-styles";function ep(){if(document.getElementById(Ma))return;let e=document.createElement("style");e.id=Ma,e.textContent=`
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
`,document.head.appendChild(e)}var ld=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},tp=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function op(e,t){let r=ld(),n=tp(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(d=>d.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,d)=>(i.dueDate||"9999").localeCompare(d.dueDate||"9999")).slice(0,t.limit)}var rp=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=Ce(),g=!0,h=()=>{Ye(u).then(A=>{u.assertActive(),g&&r(A)}).catch(()=>{})};h();let m=bo(h);return()=>{g=!1,m()}},[]);let n=sd(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),d={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:dd(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},s("auto.33ce417454bf"));let c=op(t,d),p=ld(),l=u=>{let g={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(h=>h&&h.map(m=>m.id===u.id?g:m)),vt(u.id,g)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>f.workspace.openMainTab({newTab:f.ui.hasModKey(u)}),title:s("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",d.tag?` \xB7 #${d.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},c.length,d.due?` \xB7 ${d.due}`:"")),c.length===0&&o.createElement("div",{className:"todo-fence-empty"},s("auto.a93c9cdad41c")),c.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>l(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},He.find(g=>g.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(g=>o.createElement("span",{key:g,className:"tag"},"#",g.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function cd(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(ep(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(rp,{code:t}))),{examples:id.todo});return()=>{e(),document.getElementById(Ma)?.remove()}}var X=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),kt=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),np=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),ap=e=>o.createElement(kt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),ip=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),sp=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),dp=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),lp=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),cp=e=>o.createElement(kt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),up={inprogress:ip,waiting:sp,onhold:ap,delegated:dp,deferred:lp,completed:cp,canceled:np},$e=({status:e,dotCls:t,color:r})=>{let n=e?up[e]:void 0,a=r?{color:r}:void 0;return n?o.createElement(n,{className:`todo-status-menu-svg ${t}`,style:a}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:a})},Tt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),Wt=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),Se=e=>o.createElement(X,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Yo=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),ud=e=>o.createElement(X,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),pd=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),md=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Qr=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),en=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Xo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Zo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),fd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),gd=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),hd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),tn=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Me=e=>o.createElement(X,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),bd=e=>o.createElement(kt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),yd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),on=e=>o.createElement(X,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),Qe=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),qt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),wd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),vd=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),Yt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Xt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),xd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),rn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),kd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),et=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),St=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),nn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),Td=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Sd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),Ad=e=>o.createElement(X,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Jo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Qo=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),At=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),an=e=>o.createElement(X,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),er=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),sn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),_a=e=>o.createElement(X,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),za=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),Fa=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),Ed=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),Dd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),Cd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),Id=e=>o.createElement(X,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Nd=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"}));var Ld=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Pd=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14"})),Od=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),dn=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),Ga=e=>o.createElement(X,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"})),Md=e=>o.createElement(X,{...e},o.createElement("path",{d:"M13 13.5V20l-4-2v-4.5L3 6V4h18v2l-2.5 3M17 14l4 4M21 14l-4 4"}));function tr(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var vo=({value:e,onChange:t,disabled:r=!1})=>{let n=o.useRef(null),[a,i]=o.useState([]),[d,c]=o.useState("idle"),[p,l]=o.useState(-1),[u,g]=o.useState(!1),h=o.useRef(null),m=o.useRef(0),A=o.useRef(!1);o.useEffect(()=>{n.current&&document.activeElement!==n.current&&(n.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{h.current!==null&&window.clearTimeout(h.current)},[]);let S=E=>{h.current!==null&&window.clearTimeout(h.current);let x=++m.current;if(E.trim().length<2){i([]),c("idle"),g(!1);return}g(!0),c("searching"),h.current=window.setTimeout(()=>{f.resources.search({query:E.trim(),kinds:["place"],limit:8}).then(v=>{x===m.current&&(i(v),l(v.length?0:-1),c("done"))},()=>{x===m.current&&(i([]),l(-1),c("failed"))})},250)},_=E=>{let x=Number(E.metadata?.longitude),v=Number(E.metadata?.latitude),O=(E.value??E.label).trim();A.current=!0,m.current++,n.current&&(n.current.value=O),g(!1),i([]),t({name:O,...Number.isFinite(x)&&Number.isFinite(v)?{lng:x,lat:v}:{}})},N=()=>{let E=n.current?.value.trim()??"";if(m.current++,g(!1),A.current){A.current=!1;return}E!==(e?.name??"")&&t(E?{name:E}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(Wt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:n,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:s("todo.locationPlaceholder"),"aria-label":s("todo.location"),"aria-autocomplete":"list","aria-expanded":u,disabled:r,autoComplete:"off",spellCheck:!1,onChange:E=>{A.current=!1,S(E.currentTarget.value)},onFocus:E=>{E.currentTarget.value.trim().length>=2&&a.length&&g(!0)},onBlur:N,onKeyDown:E=>{E.nativeEvent.isComposing||(E.key==="ArrowDown"&&a.length?(E.preventDefault(),g(!0),l(x=>(x+1)%a.length)):E.key==="ArrowUp"&&a.length?(E.preventDefault(),l(x=>x<=0?a.length-1:x-1)):E.key==="Enter"?(E.preventDefault(),u&&a[p]?_(a[p]):N()):E.key==="Escape"&&u&&(E.preventDefault(),E.stopPropagation(),m.current++,g(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:s("todo.openLocation"),"aria-label":s("todo.openLocationOf",{p0:e.name}),onClick:()=>tr(e)},o.createElement(kd,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:s("todo.removeLocation"),"aria-label":s("todo.removeLocation"),onMouseDown:E=>E.preventDefault(),onClick:()=>{m.current++,n.current&&(n.current.value=""),i([]),g(!1),t(void 0)}},o.createElement(Se,null)))),u&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":s("todo.location")},d==="searching"&&!a.length&&o.createElement("li",{className:"todo-location-status"},s("todo.location.searching")),d==="done"&&!a.length&&o.createElement("li",{className:"todo-location-status"},s("todo.location.noResults")),d==="failed"&&o.createElement("li",{className:"todo-location-status"},s("todo.location.failed")),a.map((E,x)=>o.createElement("li",{key:E.id,role:"option","aria-selected":x===p},o.createElement("button",{type:"button",className:"todo-location-hit"+(x===p?" is-active":""),onMouseDown:v=>v.preventDefault(),onMouseEnter:()=>l(x),onClick:()=>_(E)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(et,null),E.label),E.description&&o.createElement("span",{className:"todo-location-hit-context"},E.description))))))};function pp(){try{return Ho(f?.getState().weekStart)}catch{return 1}}function _d(e,t=pp()){let r=Bt(e).getDay();return xt(e,6-(r-t+7)%7)}var Le={kind:"smart",id:"all"},ln=[{id:"scheduled",labelKey:"todo.view.scheduled",color:we("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:we("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:we("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:we("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:we("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:we("green"),dated:!1}],or=ln.map(e=>e.id);function $a(e){let t=e&&typeof e=="object"?e:{},r=[];for(let l of Array.isArray(t.order)?t.order:[])typeof l=="string"&&or.includes(l)&&!r.includes(l)&&r.push(l);or.forEach((l,u)=>{if(r.includes(l))return;let g=or.slice(0,u).reverse().find(h=>r.includes(h));r.splice(g?r.indexOf(g)+1:0,0,l)});let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(l=>n.includes(l));a.length===r.length&&a.shift();let i=t.colors&&typeof t.colors=="object"?t.colors:{},d={};for(let l of or){let u=i[l];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(d[l]=u)}let c=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let l of or){let u=c[l];(u==="white"||u==="black")&&(p[l]=u)}return{order:r,hidden:a,colors:d,textColors:p}}function zd(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>ct(t,e))}function ct(e,t){let r=ln.find(i=>i.id===e)??ln.find(i=>i.id==="all"),n=t?.colors[r.id],a=t?.textColors?.[r.id];return n||a?{...r,...n?{color:n}:{},...a?{textColor:a}:{}}:r}function rr(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}function mp(e,t,r=Te(new Date)){if(t.kind==="groups")return e.group?tt(t.names).has(Y(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=_d(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function cn(e,t,r,n=Te(new Date)){return mp(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Fd(e,t=Te(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=_d(t);for(let a of e){if(a.completed){r.completed++;continue}r.all++,a.flagged&&r.flagged++;let i=a.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++,i<=n&&r.week++)}return r}function un(e,t){let r=t===null?null:tt([t]);return e.filter(n=>!n.completed&&(r===null?!n.group:r.has(Y(n.group??"")))).length}function Ze(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var fp=ln.map(e=>e.id);function nr(e){if(typeof e!="string")return Le;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Le}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Le}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Le;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(d=>typeof d=="string"&&!!d.trim()).map(d=>d.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Le}catch{return Le}return fp.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Le}function pn(e,t){return Ze(e)===Ze(t)}var gp=["group","notes","status","location","tags"],hp="todo.view",bp="todo.showCompleted",yp="todo.statusFilter",wp="todo.search",vp="todo.pageSort",Ua="panelChip",$d="pageShowCompleted",Ra="statusFilter",Va="dateBreakdown",Rd="smartLists",ar="pageSearch",jd="pageSort",xp={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Kd=["due","priority","flagged","updated","created","name"];function Gd(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Kd.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:po(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function hn(e){let t=xp[e],r=o.useCallback(()=>Gd(f.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(d=>{a(c=>{let p=Gd({...c,...d});return f.settings.set(t,p),p})},[t]);return[n,i]}function mn(){let e=f.settings.get()[Va];return e==="weekly"||e==="daily"?e:"monthly"}function bn(){let[e,t]=o.useState(mn);return o.useEffect(()=>f.settings.subscribe(()=>t(mn())),[]),e}function xo(){return f.runtime.getOrCreate(hp,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function yn(){return f.runtime.getOrCreate(bp,()=>({show:null,listeners:new Set}))}function wn(){return f.runtime.getOrCreate(yp,()=>({filter:null,listeners:new Set}))}function ir(){return f.runtime.getOrCreate(wp,()=>({query:null,listeners:new Set}))}function vn(){return f.runtime.getOrCreate(vp,()=>({value:null,listeners:new Set}))}function Zt(){let e=xo();return e.view||(e.view=nr(f.settings.get()[Ua]),e.history=[e.view],e.historyIndex=0),e.view}function Ue(e){let t=xo();if(Zt(),t.view&&pn(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(Ua,Ze(e));for(let n of t.listeners)n(e)}function xn(){let e=xo();return Zt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function ko(e){let t=xo();Zt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(Ua,Ze(t.view));for(let n of t.listeners)n(t.view)}}function Ba(e){let t=xo();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function Ud(){let e=xo();e.view=null,e.history=[],e.historyIndex=-1,yn().show=null,wn().filter=null,ir().query=null,vn().value=null}function fn(){return $a(f.settings.get()[Rd])}function Vd(e){f.settings.set(Rd,$a(e))}function kn(){let[e,t]=o.useState(fn);return o.useEffect(()=>f.settings.subscribe(()=>t(fn())),[]),e}function Bd(e){let t=ir(),r=e.slice(0,500);if(t.query!==r){t.query=r,f.settings.set(ar,r);for(let n of t.listeners)n(r)}}function Tn(){let e=()=>{let n=ir();return n.query===null&&(n.query=typeof f.settings.get()[ar]=="string"?String(f.settings.get()[ar]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=ir();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,Bd]}function Ha(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||gp.includes(t.field)||Kd.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function Hd(){let e=vn();return e.value||(e.value=Ha(f.settings.get()[jd])),e.value}function Wd(e){let t=vn(),r=Ha(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(jd,r);for(let n of t.listeners)n(r)}}function qd(){let[e,t]=o.useState(Hd);return o.useEffect(()=>{let r=vn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,Wd]}function Sn(e=Zt()){return{v:1,view:Ze(e),showCompleted:Ka(),statusFilter:gn(),search:ir().query??(typeof f.settings.get()[ar]=="string"?String(f.settings.get()[ar]).slice(0,500):""),sort:Hd()}}function An(e,t=!1){return e.v!==1?!1:(t||Ue(nr(e.view)),Jt(e.showCompleted===!0),ja(po(e.statusFilter)),Bd(typeof e.search=="string"?e.search:""),Wd(Ha(e.sort)),!0)}function gn(){let e=wn();if(e.filter===null){let t=f.settings.get()[Ra];e.filter=po(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(Ra,e.filter)}return e.filter}function ja(e){let t=wn(),r=po(e),n=t.filter??gn();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,f.settings.set(Ra,r);for(let a of t.listeners)a(r)}}function ut(){let[e,t]=o.useState(gn);return o.useEffect(()=>{let r=wn();r.listeners.add(t);let n=f.settings.subscribe(()=>{let a=po(r.filter??gn());ja(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,ja]}function En(){let[e,t]=o.useState(Zt);return o.useEffect(()=>Ba(t),[]),e}function Ka(){let e=yn();return e.show===null&&(e.show=f.settings.get()[$d]===!0),e.show}function Jt(e){let t=yn();if(t.show!==e){t.show=e,f.settings.set($d,e);for(let r of t.listeners)r(e)}}function pt(){let[e,t]=o.useState(Ka);return o.useEffect(()=>{let r=yn();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Jt(!Ka())]}function Xd(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(Ot).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var kp=["normal","low","medium","high"];function Zd(e,t){return e&&kp.includes(e)?e:t}function Tp(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Sp(e,t){return e.dueDate?{badges:Tp(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:ze(e.group,t)}:{}}:null}function Ap(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Zd(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:ke(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Dn(e){return Xe(e)}function Yd(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var Wa="attachment:",qa="url:";function Ep(){return!0}function Dp(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Yd(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${Wa}${i}`,label:Yd(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${qa}${i}`,label:i,icon:"link"}))}),e.location&&Ep()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Cp(e,t){if(t.startsWith(Wa)){let r=t.slice(Wa.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(qa)){let r=t.slice(qa.length);if(!(e.urls??[]).includes(r))return!1;let n=go(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Ue(e.completed?{kind:"smart",id:"completed"}:Le),Oe().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(tr(e.location),!0):!1;default:return!1}}function Jd(){let e=Ce(),t=Gt("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:l,endDate:u,limit:g,cursor:h})=>{let m,A=()=>`${t}:${r}`;if(h){let x;try{x=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!x||x.startDate!==l||x.endDate!==u||x.limit!==g||x.revision!==A()||typeof x.cursor!="string"||!x.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");m=x.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let S=A(),_=await Ms(l,u,g,m);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&S!==A())throw new Error("Calendar source cursor is stale; restart the range.");let N=Je(),E=A();return{items:_.todos.map(x=>Sp(x,N)).filter(x=>!!x),revision:E,..._.cursor?{cursor:JSON.stringify({startDate:l,endDate:u,limit:g,revision:E,cursor:_.cursor})}:{}}},create:async(l,u)=>{if(u.endDate&&u.endDate!==l)return!1;let g=u.title?.trim();if(!g)return!1;let h=new Date().toISOString();return jr({id:Gt("todo"),title:g,completed:u.completed??!1,priority:Zd(u.priority,"normal"),dueDate:l,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:h,updatedAt:h})},update:async(l,u)=>{let g=await Dn(l);return g&&u.endDate&&u.endDate!==(u.date??g.dueDate)?!1:g?vt(g.id,Ap(g,u),g.updatedAt):!1},remove:l=>Kr(l),open:async l=>{let u=await Dn(l);await f.workspace.revealOwnPanel("left_sidebar"),u&&(Ue(u.completed?{kind:"smart",id:"completed"}:Le),Oe().request(u.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async l=>{let u=await Dn(l);return u?Dp(u):[]},runAction:async(l,u)=>{let g=await Dn(l);return g?Cp(g,u):!1}},i=()=>{f.interop.state.publish(Lo,++r)};f.interop.state.publish(Lo,r);let d=Ns(i),c=Br(i),p=f.interop.services.provide(Ot,a);return()=>{n=!1,d(),c(),p(),f.interop.state.publish(Lo,null)}}var Ya=e=>typeof e=="string"?e:"";function Qd(e){let t=Ya(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function el(e){let t={cardKind:"todo",open:async(r,n)=>{if(Ya(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:Ya(r.id)}),!0;let a=Qd(r.filePath)||Qd(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(ea,t)}function rt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>f.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function Cn(){let e=o.useCallback(i=>f.interop.state.subscribe(vr,i),[]),t=o.useCallback(()=>f.interop.state.get(vr),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function tl(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,d)=>{let c=new Set(r.current);d?c.add(i):c.delete(i),r.current=c,t(c)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var Ip="todo.sharedTodos";function Xa(){return f.runtime.getOrCreate(Ip,()=>({todos:[],listeners:new Set}))}function ye(){return Xa().todos}function mt(e){let t=Xa();t.todos=e;for(let r of t.listeners)r(e)}function Et(e){let t=Xa();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var Za="list:",ol=e=>f.ui.hasModKey(e)||e.button===1,Np=e=>`${Za}${Ze(e)}`;function Qt(e){return e?.startsWith(Za)?nr(e.slice(Za.length)):null}var rl=e=>e?.pluginId===f.pluginId?e.instanceId:void 0;function Ja(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:s("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?s("todo.chip.noGroup"):s(ct(e.id).labelKey)}function Qa(e,t){f.workspace.openMainTab({instanceId:Np(e),title:Ja(e),newTab:t})}function sr(e,t=!1){t||Qt(rl(f.getState().activePluginTab))?Qa(e,t):Ue(e)}function dr(){let e=En(),{activePluginTab:t}=rt("activePluginTab"),r=rl(t);return o.useMemo(()=>Qt(r),[r])??e}function Dt(){return f.workspace.openOwnSettings(),Promise.resolve()}var ei={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function nl(){return["completed",...Ft().filter(t=>t!=="completed")].map(t=>Ie(t))}function eo(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function al(){for(let e of eo().listeners)e()}function ti(e,t=""){let r=eo();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,al())}function oi(e,t){e?eo().selected.set(t,e):eo().selected.delete(t),al()}function Lp(e,t){let r=e==="main_workspace"?Qt(t):null,n=Sn(r??void 0),a=ye().find(i=>i.id===eo().selected.get(e));return{title:s("manifest.name"),view:n,actions:eo().actions??[],...a?{item:{id:a.id,title:a.title,state:{...n,todoId:a.id}}}:{},...r?{}:{navigation:{...xn(),goBack:()=>ko(-1),goForward:()=>ko(1)}}}}function Pp(e){let t=eo().listeners;t.add(e);let r=Et(e),n=Ba(e),a=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function Op(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Xe(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!An(e,t==="main_workspace"&&Qt(n)!==null))throw new Error("Unsupported To-Do bookmark.");oi(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Oe().request(e.todoId,"focus")}function Mp({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(tn,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},nl().map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,i.label),o.createElement("span",null,r.filter(d=>Ne(d)===i.id).length)))))}function _p(){let e=o.useSyncExternalStore(Et,ye,ye),t=Be(),r=dr(),n=r.kind==="smart"?s(ct(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[s("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:s("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[s("todo.properties.view"),n],[s("todo.properties.tasks"),e.length],...nl().map(a=>[a.label,e.filter(i=>Ne(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...ve(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(c=>a===null?!c.group:tt([a]).has(Y(c.group??""))),d=a??s("todo.chip.noGroup");return o.createElement(Mp,{key:a??"ungrouped",label:d,color:a?Ee(ze(a,t)):"var(--text-tertiary)",todos:i})})))}function zp(){let e=o.useSyncExternalStore(Et,ye,ye),t=Be(),r=dr();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(lr,{embedded:!0,todos:e,groups:t,names:ve(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>sr(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Le),onOpenSettings:Dt}))}function il(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>na(e,{id:`todo.${n}`,surface:n,getSnapshot:a=>Lp(n,a),subscribe:Pp,restore:(a,i,d)=>Op(a,n,d?.background,i)},{stateSchema:ei,itemStateSchema:{...ei,required:[...ei.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:s(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(xr,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Xe(n.item.id):null;return a?Object.entries(a).map(([i,d])=>({id:i,label:s(`todo.field.${i}`),value:d??null,readOnly:!0})):[]},render:()=>o.createElement(_p,null)})),r.push(e.interop.extensions.provide(xr,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>Je().map(n=>({id:n.id,label:n.name,value:ye().filter(a=>tt([n.name]).has(Y(a.group??""))).length,readOnly:!0})),render:()=>o.createElement(zp,null)})),()=>r.forEach(n=>n())}function sl(e,t,r){let n=new Date().toISOString();return{id:Gt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function dl(e,t){let r=e.trim();if(!r)return;let n=t.trim();return n?`${r}T${n}`:r}function ll(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function To(e,t,r="main_workspace"){let n=o.useRef(Ce()).current,[a,i]=o.useState(ye()),[d,c]=o.useState(null),[p,l]=o.useState(null),[u,g]=o.useState(null),[h,m]=o.useState(!0),[A,S]=o.useState(0),[_,N]=o.useState(!1),{pendingIds:E,isPending:x,setPending:v}=tl(),O=o.useRef(!1),K=o.useRef(0),W=o.useRef({sortField:e,sortDir:t});W.current={sortField:e,sortDir:t};let R=o.useRef([]),j=o.useMemo(()=>{let C=new Map(a.map(b=>[b.id,b])),re=new Set(R.current),ie=[];for(let b of R.current){let $=C.get(b);$&&ie.push($)}for(let b of a)re.has(b.id)||ie.push(b);return ie},[a,A]),ee=o.useCallback(C=>{let re=++K.current;C&&m(!0),Ye(n).then(ie=>{if(n.assertActive(),re===K.current){if(C){let{sortField:b,sortDir:$}=W.current;R.current=yo(ie,b,$).map(Z=>Z.id)}else{let b=new Set(ie.map(M=>M.id)),$=R.current.filter(M=>b.has(M)),Z=new Set($),{sortField:k,sortDir:P}=W.current,G=yo(ie.filter(M=>!Z.has(M.id)),k,P).map(M=>M.id);R.current=[...G,...$]}mt(ie),m(!1)}}).catch(()=>{re===K.current&&m(!1)})},[n]);o.useEffect(()=>(ee(!0),()=>{K.current++}),[ee]),o.useEffect(()=>bo(()=>ee(!1)),[ee]);let de=o.useRef(!0);o.useEffect(()=>{if(de.current){de.current=!1;return}R.current=yo(ye(),e,t).map(C=>C.id),S(C=>C+1)},[e,t]),o.useEffect(()=>Et(C=>i(C)),[]);let ae=o.useCallback(()=>c(null),[]),le=o.useCallback(C=>{oi(C,r),g(C)},[r]),w=o.useCallback(()=>g(null),[]),L=o.useCallback(async(C,re,ie)=>{if(O.current)return null;let b=C.trim();if(!b)return null;let $={...sl(b,re),...ie?.patch};O.current=!0,N(!0),R.current=[$.id,...R.current],mt([$,...ye()]),c($.id);let Z=()=>{R.current=R.current.filter(k=>k!==$.id),mt(ye().filter(k=>k.id!==$.id)),c(k=>k===$.id?null:k)};try{let k=await jr($);return k||Z(),k?$:null}catch{return Z(),null}finally{O.current=!1,N(!1)}},[]),y=o.useCallback(async(C,re,ie)=>{if(x(C))return!1;let b=ye().find(Z=>Z.id===C);if(!b)return!1;let $={...b,...re,updatedAt:new Date().toISOString()};v(C,!0),mt(ye().map(Z=>Z.id===C?$:Z));try{return await vt(C,$,b.updatedAt,ie)?!0:(mt(ye().map(k=>k.id===C?b:k)),!1)}catch{return mt(ye().map(Z=>Z.id===C?b:Z)),!1}finally{v(C,!1)}},[x,v]),T=o.useCallback(async C=>{if(x(C))return;let re=ye().find(b=>b.id===C);if(!re)return;v(C,!0),R.current=R.current.filter(b=>b!==C),mt(ye().filter(b=>b.id!==C)),c(b=>b===C?null:b),u===C&&g(null);let ie=()=>{R.current.includes(C)||R.current.push(C),ye().some(b=>b.id===C)||mt([...ye(),re])};try{await Kr(C)||ie()}catch{ie()}finally{v(C,!1)}},[u,x,v]);return{todos:a,loading:h,ordered:j,lastCreatedId:d,clearLastCreated:ae,menuId:p,setMenuId:l,editingId:u,openDetail:le,closeDetail:w,pendingIds:E,creating:_,create:L,patchTodo:y,removeTodo:T}}function ri({value:e,onChange:t,timed:r=!0,time:n="",onTimeChange:a,defaults:i=!1}){let{NumberField:d,SelectField:c,Button:p,IconButton:l,TimeField:u}=f.ui.settings,[g,h]=o.useState({}),[m,A]=o.useState(!1),S=e===void 0?"default":e.length?"custom":"off",_=N=>{let E=N.some(x=>!Number.isInteger(x)||x<0||x>10080)||new Set(N).size!==N.length;A(E),E||t(N)};return o.createElement("div",{className:"todo-reminder-offsets"},o.createElement(c,{className:"todo-reminder-mode",ariaLabel:s("reminders.title"),value:S,onChange:N=>{A(!1),h({}),t(N==="off"?[]:N==="default"?void 0:[10])},options:[...i?[]:[{value:"default",label:s("reminders.default")}],{value:"off",label:s("reminders.off")},{value:"custom",label:s("reminders.custom")}]}),e?.map((N,E)=>{let x=g[E]??(N>0&&N%60===0);return o.createElement("div",{key:E,className:"todo-reminder-line"},o.createElement(d,{className:"todo-reminder-number",frameClassName:"todo-reminder-number-frame",min:0,max:x?168:10080,value:x?N/60:N,ariaLabel:s(x?"reminders.hours":"reminders.minutes"),onChange:v=>{v!==null&&_(e.map((O,K)=>K===E?v*(x?60:1):O))}}),o.createElement(c,{className:"todo-reminder-unit",value:x?"hours":"minutes",ariaLabel:s("reminders.title"),options:[{value:"minutes",label:s("reminders.minutes")},{value:"hours",label:s("reminders.hours")}],onChange:v=>{h(O=>({...O,[E]:v==="hours"})),_(e.map((O,K)=>K===E?(x?N/60:N)*(v==="hours"?60:1):O))}}),o.createElement(l,{onClick:()=>{h({}),_(e.filter((v,O)=>O!==E))},ariaLabel:s("reminders.remove"),title:s("reminders.remove")},o.createElement(Se,null)))}),S==="custom"&&(e?.length??0)<16&&o.createElement(p,{className:"todo-reminder-add",onClick:()=>{let N=10;for(;e?.includes(N);)N+=5;_([...e??[],N])}},s("reminders.add")),!r&&S!=="off"&&a&&o.createElement(u,{value:n,onChange:a,ariaLabel:s("reminders.time")}),!r&&!n&&S!=="off"&&o.createElement("span",{className:"todo-reminder-note"},s("reminders.timeRequired")),m&&o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},s("reminders.invalid")))}function cl(){let[e,t]=o.useState(()=>f.settings.get().reminderOffsets??[10]);o.useEffect(()=>f.settings.subscribe(()=>t(f.settings.get().reminderOffsets??[10])),[]);let{Row:r,Section:n}=f.ui.settings;return o.createElement(n,{title:s("reminders.title")},o.createElement(r,{title:s("reminders.defaultTitle"),description:s("reminders.defaultDesc")},o.createElement(ri,{value:e,defaults:!0,onChange:a=>{f.settings.set("reminderOffsets",a??[10])}})))}function ni({value:e,onChange:t,disabled:r}){let n=f.ui.ResourcePicker;return o.createElement(n,{value:e,onChange:t,kinds:["attachment"],placeholder:s("auto.e7de9576dc00"),disabled:r,ariaLabel:s("auto.8410192cbb1f"),allowCustom:!1})}var Fp=[".ttf",".otf",".woff",".woff2"],Gp=[".csv"],$p=[".base"],Rp=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],jp=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],Kp=[...Rp,...jp,".ico",".flavicon"];var Up=[".pdf"],Vp=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Bp=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Hp=[".srt",".vtt",".ass"],Wp=[".stl",".obj",".glb",".gltf"],qp=[".bin",".mtl"];function ai(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Yp={type:"core",id:"valley"},H=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Yp,...a});function Xp(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Zp=Xp([[[".mermaid",".mmd"],H("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],H("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],H("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],H("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],H("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Fp,H("font","font","font","media")],[[".epub",".mobi",".azw3"],H("ebook","ebook","ebook","documents")],[[".djvu"],H("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],H("comic","comic","comic","documents")],[[".md",".markdown"],H("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],H("text","text","text","notes")],[[".json"],H("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],H("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Gp,H("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[$p,H("base","base","fallback","data")],[Kp,H("image","image","image","media",{information:["identity","dimensions","exif"]})],[Up,H("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Vp,H("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Bp,H("video","video","video","media",{information:["identity","media","video-codec"]})],[Hp,H("text","subtitle","text","media")],[Wp,H("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[qp,H("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],H("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],H("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],H("docx","word","opendocument","documents")],[[".ods"],H("csv","excel","opendocument","data")],[[".odp"],H("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],H("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],H("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],H("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],H("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],H("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],H("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],H("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],H("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],H("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],H("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],H("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],H("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],H("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],H("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],H("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],H("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],H("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],H("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],H("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],H("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],H("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],H("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],H("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],H("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],H("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],H("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],H("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Jp=H("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Qp(e){return Zp[ai(e)]??Jp}function cr(e){return Qp(e).kind}var ul="valley-realm",pl="asset";function In(e){return`${ul}://${pl}/${encodeURIComponent(e)}`}var em={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function tm(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function ii(e){let t=em[cr(e)];if(t)return s(t);let r=ai(e).replace(".","").toUpperCase();return r?s("todo.fileKind.generic",{p0:r}):s("todo.fileKind.file")}var om={image:Td,audio:Sd,video:Ad},ml=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=cr(e),i=e.split("/").pop()??e,d=om[a]??nn;o.useEffect(()=>{let u=!1;return f.realm.fileInfo(e).then(g=>{u||n(g?.size??null)}),()=>{u=!0}},[e]);let[c,p]=o.useState(0);o.useEffect(()=>f.realm.onChanged(()=>p(u=>u+1)),[]);let l=a==="image"?`${In(e)}?v=${c}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},ii(e),r!==null&&` \xB7 ${tm(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},l?o.createElement("img",{src:l,alt:"",loading:"lazy"}):o.createElement(d,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:s("todo.removeAttachment"),"aria-label":s("todo.removeAttachmentOf",{p0:i})},o.createElement(Se,null)))};function si(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),d=o.useRef(null),c=o.useRef(0),p=o.useRef(r);p.current=r;let l=o.useCallback(async()=>{if(i.current)return;let u=a.current;if(u!==null){a.current=null,i.current=!0;try{let g=await n.current(u);!g&&a.current===null&&(a.current=u),g?c.current=0:c.current+=1}catch{a.current===null&&(a.current=u),c.current+=1}finally{i.current=!1,a.current!==null&&c.current<3?d.current=window.setTimeout(()=>{l()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{d.current!=null&&window.clearTimeout(d.current),l()},[l]),o.useCallback(u=>{a.current=u,c.current=0,d.current!=null&&window.clearTimeout(d.current),d.current=window.setTimeout(()=>{d.current=null,l()},t)},[l,t])}function rm({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[d,c]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||c(e)},[e]);let l=()=>{d!==e&&t(d)};return o.createElement("input",{className:i,type:a,value:d,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>c(u.target.value),onBlur:()=>{p.current=!1,l()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(c(e),u.currentTarget.blur())}})}function nm(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var am=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:d}=f.ui.settings,[c,p]=o.useState(ye);o.useEffect(()=>Et(p),[]);let l=c.find(b=>b.id===e),u=Os(e),g=Be(),[h,m]=o.useState(!1),[A,S]=o.useState(""),[_,N]=o.useState(!1),[E,x]=o.useState(""),v=nm(e),O=o.useSyncExternalStore(o.useCallback(b=>(v.listeners.add(b),()=>{v.listeners.delete(b)}),[v]),()=>v.value,()=>v.value),K=o.useCallback(b=>{v.value={...v.value,...b};for(let $ of v.listeners)$()},[v]),W=O.title,R=b=>K({title:b}),j=()=>K({error:s("todo.error.saveDraft")});o.useEffect(()=>{v.revision||v.loadingRevision||(v.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(b=>{b&&!v.revision&&(v.revision={expectedRevision:b.revision,realmGeneration:b.realmGeneration})}).catch(()=>{K({error:s("todo.error.saveDraft")})}).finally(()=>{v.loadingRevision=void 0}))},[v,e,K]);let ee=async b=>(v.revision||await v.loadingRevision,v.revision?t.patchTodo(e,b,v.revision):!1),de=si(async b=>{let $=b.trim()?await ee({title:b}):!0;return $&&v.value.title===b&&K({title:null,error:""}),$},500,j),ae=si(async b=>{let $=await ee({note:b});return $&&v.value.note===b&&K({note:null,error:""}),$},500,j),le=si(async b=>{let $=JSON.parse(b),Z=await ee({tags:$});return Z&&JSON.stringify(v.value.tags)===b&&K({tags:null,error:""}),Z},0,j);if(o.useEffect(()=>{!l&&!t.loading&&r()},[l,t.loading,r]),!l)return null;let w=b=>{ee(b).then($=>{$||j()})},L=b=>{K({tags:b}),le(JSON.stringify(b))},y=b=>w({attachments:b.length?b:void 0}),T=b=>w({urls:b.length?b:void 0}),I=l.remindAt?.slice(0,10)??"",C=l.remindAt?.slice(11,16)??"",re=(b,$)=>w({remindAt:dl(b,$),reminderFiredAt:void 0}),ie=ve(g);return o.createElement(f.ui.Modal,{title:s("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{st(l,t.removeTodo)}},s("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},s("todo.edit.done")))},o.createElement("div",{className:"todo-detail-content"},O.error&&o.createElement("p",{role:"alert"},O.error),o.createElement("div",{className:"todo-detail-title-row"},o.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:W??l.title,"aria-label":s("auto.c5e8306a511f"),onChange:b=>{R(b.target.value),de(b.target.value)},onBlur:()=>{W===l.title&&R(null)},onKeyDown:b=>{b.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-detail-flag${l.flagged?" on":""}`,type:"button",onClick:()=>w({flagged:l.flagged?void 0:!0}),"aria-pressed":!!l.flagged,title:s("todo.flag"),"aria-label":s("todo.flag")},o.createElement(Me,null))),o.createElement("div",{className:"todo-detail-cols"},o.createElement("div",{className:"todo-detail-col"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.edit.notes")),o.createElement("div",{className:"todo-detail-notes"},o.createElement("textarea",{className:"todo-detail-note-input",value:O.note??l.note,"aria-label":s("todo.edit.notes"),placeholder:s("todo.edit.notes"),rows:7,onChange:b=>{let $=b.target.value;K({note:$}),ae($)}}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.edit.tags")),o.createElement(f.ui.TagInput,{value:O.tags??l.tags??[],onChange:L})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(St,null)," ",s("todo.attachments")),(l.attachments??[]).map(b=>o.createElement(ml,{key:b,relPath:b,onRemove:()=>y((l.attachments??[]).filter($=>$!==b))})),h?o.createElement(ni,{value:A,onChange:b=>{S(b),b&&((l.attachments??[]).includes(b)||y([...l.attachments??[],b]),S(""),m(!1))}}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(Tt,null)," ",s("todo.addAttachment"))),o.createElement("div",{className:"todo-detail-block todo-detail-links-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Xt,null)," ",s("todo.links")),o.createElement("label",{className:"todo-linked-file-control"},o.createElement("span",null,s("todo.linkedFile")),o.createElement(ni,{value:l.filePath??"",onChange:b=>w({filePath:b.trim()||void 0})})),(l.urls??[]).map(b=>o.createElement("div",{className:"todo-detail-url-card",key:b},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:b,onClick:$=>{let Z=go(b);Z?f.workspace.openFile(Z,void 0,{newTab:f.ui.hasModKey($)}):f.files.openExternalUrl(b)}},o.createElement(Xt,null),o.createElement("span",null,b)),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:s("todo.removeUrl"),"aria-label":s("todo.removeUrlOf",{p0:b}),onClick:()=>T((l.urls??[]).filter($=>$!==b))},o.createElement(Se,null)))),_?o.createElement(rm,{className:"todo-detail-link-input todo-detail-url",value:E,onCommit:b=>{let $=Gr(b);$&&!(l.urls??[]).includes($)&&T([...l.urls??[],$]),x(""),N(!1)},placeholder:s("todo.urlPlaceholder"),ariaLabel:s("todo.url")}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>N(!0)},o.createElement(Tt,null)," ",s("todo.addWebAppLink")))),o.createElement("div",{className:"todo-detail-col todo-detail-rail"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.edit.properties")),o.createElement("label",{className:"todo-detail-field","data-status":Ne(l)},o.createElement("span",{className:"todo-detail-label"},s("auto.bae7d5be7082")),o.createElement(a,{className:"todo-detail-select",value:Ne(l),onChange:b=>w(ke(b==="open"?null:b)),ariaLabel:s("auto.bae7d5be7082"),options:bt().map(b=>({value:b,label:at(b)}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},s("auto.886cbff9d9df")),o.createElement("div",{className:"todo-detail-priority",role:"group","aria-label":s("auto.886cbff9d9df")},He.map(b=>o.createElement("button",{key:b.id,type:"button","aria-pressed":l.priority===b.id,title:s(b.labelKey),onClick:()=>w({priority:b.id})},b.symbol||s("todo.priorityNone"))))),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},s("todo.edit.group")),o.createElement(f.ui.ComboField,{className:"todo-detail-combo",value:l.group??"",onChange:b=>w({group:b.trim()||void 0}),options:ie.map(b=>({value:b,label:b})),ariaLabel:s("todo.edit.group"),clearLabel:s("todo.chip.noGroup"),allowCustom:!1}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.edit.schedule")),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},s("auto.145caf292855")),o.createElement(i,{className:"todo-detail-inline-date",value:l.dueDate,ariaLabel:s("auto.4c1aeebc433b"),onChange:b=>w({dueDate:b})})),o.createElement("div",{className:"todo-detail-times"},o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},s("auto.88d8206d586a")),o.createElement(d,{className:"todo-detail-time-input",value:l.startTime??"",ariaLabel:s("auto.88d8206d586a"),onChange:b=>w({startTime:b||void 0})})),o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},s("auto.cd7800da7f4f")),o.createElement(d,{className:"todo-detail-time-input",value:l.endTime??"",ariaLabel:s("auto.cd7800da7f4f"),onChange:b=>w({endTime:b||void 0})})))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("reminders.title")),o.createElement(ri,{value:l.reminderOffsets,onChange:b=>w({reminderOffsets:b,remindAt:void 0,reminderFiredAt:void 0}),timed:!!l.startTime,time:l.reminderTime,onTimeChange:b=>w({reminderTime:b})})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.remindMe")),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},s("todo.onADay")),o.createElement("span",{className:"todo-detail-row-end"},I&&o.createElement(i,{className:"todo-detail-inline-date",value:I,ariaLabel:s("todo.remindDate"),clearable:!1,onChange:b=>re(b,C)}),o.createElement(n,{checked:!!I,onChange:b=>re(b?l.dueDate||im():"",b?C:""),label:s("todo.onADay")}))),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},s("todo.atATime")),o.createElement("span",{className:"todo-detail-row-end"},C&&o.createElement(d,{className:"todo-detail-inline-input",value:C,ariaLabel:s("todo.remindTime"),clearable:!1,onChange:b=>re(I,b)}),o.createElement(n,{checked:!!C,disabled:!I,onChange:b=>re(I,b?"09:00":""),label:s("todo.atATime")}))),I&&o.createElement("p",{className:"todo-detail-hint"},s("todo.reminderAppOpenHint"))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(et,null)," ",s("todo.location")),o.createElement(vo,{value:l.location,onChange:b=>w({location:b})})),o.createElement("div",{className:"todo-detail-block todo-activity-block"},o.createElement("div",{className:"todo-detail-group-label"},s("todo.activity")),u.length?o.createElement("ol",{className:"todo-activity-list"},[...u].reverse().map((b,$)=>o.createElement("li",{key:`${b.changedAt}:${$}`},o.createElement("span",null,at(b.from)," \u2192 ",at(b.to)),o.createElement("time",{dateTime:b.changedAt},new Date(b.changedAt).toLocaleString(f.ui.language()))))):o.createElement("p",{className:"todo-detail-hint"},s("todo.activity.empty")))))))};function im(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var So=({c:e})=>e.editingId?o.createElement(am,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function sm(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function dm(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,d=e.length;for(;i<d;){let p=i+d>>>1;e[p].start+e[p].height<n?i=p+1:d=p}let c=i;for(d=e.length;i<d;){let p=i+d>>>1;e[p].start<=a?i=p+1:d=p}return[c,i]}function Nn(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,d=t.enabled??r.length>80,c=e.useRef(null),p=e.useRef(new Map),[l,u]=e.useReducer(w=>w+1,0),[g,h]=e.useState({top:0,height:600}),[m,A]=e.useState(null),[S,_]=e.useState(null),N=e.useRef(null),E=e.useRef(null),x=e.useRef(null),v=e.useMemo(()=>{let w=0;return r.map((L,y)=>{let T=p.current.get(L)??(typeof n=="number"?n:n(L,y)),I={id:L,height:T,start:w};return w+=T,I})},[r,n,l]),O=v.length?v[v.length-1].start+v[v.length-1].height:0,K=e.useRef({rows:v,viewport:g});K.current={rows:v,viewport:g};let W=e.useCallback(()=>{let w=c.current,L=N.current;if(!w||!L)return;let y=w.getBoundingClientRect(),T=L.getBoundingClientRect(),I=L.clientHeight||T.height||600,C=L===w?L.scrollTop:T.top-y.top;h(re=>re.top===C&&re.height===I?re:{top:C,height:I})},[]),R=e.useCallback(()=>{E.current===null&&(E.current=(x.current??window).requestAnimationFrame(()=>{E.current=null,W()}))},[W]);e.useLayoutEffect(()=>{let w=c.current;if(!w||!d)return;let L=sm(w);N.current=L;let y=w.ownerDocument.defaultView??window;x.current=y;let T=w.style.overflowAnchor;w.style.overflowAnchor="none";let I=!0,C=()=>{if(!I)return;let $=w.ownerDocument.activeElement,Z=$ instanceof HTMLElement?$:null;for(;Z&&Z.parentElement!==w;)Z=Z.parentElement;A(Z?.dataset.visibleKey??null)},re=()=>{queueMicrotask(C)};L.addEventListener("scroll",R,{passive:!0}),y.addEventListener("resize",R),w.addEventListener("focusin",C),w.addEventListener("focusout",re);let ie=w.clientWidth,b=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{w.clientWidth!==ie&&(ie=w.clientWidth,p.current.clear(),u()),R()});return b?.observe(L),L!==w&&b?.observe(w),W(),()=>{I=!1,w.style.overflowAnchor==="none"&&(w.style.overflowAnchor=T),L.removeEventListener("scroll",R),y.removeEventListener("resize",R),w.removeEventListener("focusin",C),w.removeEventListener("focusout",re),b?.disconnect(),E.current!==null&&y.cancelAnimationFrame(E.current),E.current=null,N.current=null,x.current=null}},[d,W,R]),e.useLayoutEffect(()=>{let w=new Set(r);for(let L of p.current.keys())w.has(L)||p.current.delete(L);W()},[r,W]),e.useLayoutEffect(()=>{p.current.clear(),u()},[i]),e.useLayoutEffect(()=>{let w=c.current;if(!w||!d)return;let L=I=>{let C=0,re=!1,{rows:ie,viewport:b}=K.current,$=new Map(ie.map(Z=>[Z.id,Z]));for(let Z of I){let k=Z.dataset.visibleKey,P=k?$.get(k):void 0,G=Z.getBoundingClientRect().height;!k||!P||G<=0||Math.abs(G-P.height)<.5||(p.current.set(k,G),P.start+P.height<=b.top&&(C+=G-P.height),re=!0)}if(re){let Z=N.current,k=w.closest('[data-visible-sections="true"]'),P=w;for(;P&&P.parentElement!==k;)P=P.parentElement;let G=k&&k!==w&&P&&Z&&P.getBoundingClientRect().bottom<=Z.getBoundingClientRect().top;C&&Z&&!G&&(Z.scrollTop+=C),u(),R()}},y=Array.from(w.children).filter(I=>I.hasAttribute("data-visible-key")),T=typeof ResizeObserver>"u"?void 0:new ResizeObserver(I=>L(I.map(C=>C.target)));return y.forEach(I=>T?.observe(I)),L(y),()=>T?.disconnect()}),e.useLayoutEffect(()=>{if(!S)return;let w=Array.from(c.current?.children??[]).find(L=>L.dataset.visibleKey===S.id);w&&(w.scrollIntoView?.({block:"nearest"}),S.selector&&(w.matches(S.selector)?w:w.querySelector(S.selector))?.focus(),W(),_(null))},[S,v,W]);let j=e.useCallback((w,L)=>{_({id:w,selector:L})},[]),[ee,de]=d?dm(v,g):[0,v.length],ae=new Set;for(let w=ee;w<de;w++)ae.add(w);let le=new Set([...a,m,S?.id].filter(Boolean));return le.size&&v.forEach((w,L)=>{le.has(w.id)&&ae.add(L)}),{ref:c,show:j,render(w){let L=[],y=0;for(let T of[...ae].sort((I,C)=>I-C)){let I=v[T];I.start>y&&L.push(e.createElement("div",{key:`space:${I.id}`,"aria-hidden":!0,style:{height:I.start-y,flex:"0 0 auto",pointerEvents:"none"}})),L.push(e.createElement(e.Fragment,{key:I.id},w(T))),y=I.start+I.height}return O>y&&L.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:O-y,flex:"0 0 auto",pointerEvents:"none"}})),L}}}function Ln(e){return f.markdown.render(e,{inline:!0})}function fl({todo:e,c:t}){let[r,n]=o.useState({source:"",html:""}),a=o.useRef(null);o.useEffect(()=>{let d=!0;return f.markdown.render(e.note).then(c=>{d&&n({source:e.note,html:c})}).catch(()=>{d&&n({source:"",html:""})}),()=>{d=!1}},[e.note]),o.useEffect(()=>{a.current?.querySelectorAll("img.md-embed[data-embed], img.md-asset[data-src]").forEach(d=>{let c=d.dataset.embed??d.dataset.src??"",p=f.workspace.resolveWikilink(c);if(p&&cr(p)==="image")d.src=In(p),d.loading="lazy";else{let l=d.ownerDocument.createElement("a");l.dataset.wikilink=c,l.textContent=d.alt||c,l.href="#",d.replaceWith(l)}})},[r]);let i=d=>{let c=d.target,p=c.closest("input.md-task-checkbox");if(p){d.stopPropagation();let h=e.note.split(`
`),m=Number(p.dataset.taskLine);if(!Number.isInteger(m)||!h[m]||t.pendingIds.has(e.id)){d.preventDefault();return}let A=p.checked;h[m]=h[m].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[^\]](\])/,`$1${p.checked?"x":" "}$2`),t.patchTodo(e.id,{note:h.join(`
`)}).then(S=>{!S&&p.isConnected&&(p.checked=!A)});return}let l=c.closest("a");if(!l)return;d.preventDefault(),d.stopPropagation();let u=l.dataset.wikilink,g=l.getAttribute("href")??"";if(u){let h=f.workspace.resolveWikilink(u);h&&f.workspace.openFile(h,void 0,{newTab:f.ui.hasModKey(d)})}else if(Go(g))f.links.open(g);else if(g&&!/^[a-z][a-z\d+.-]*:/i.test(g)&&!g.startsWith("#")){let h=f.workspace.resolveWikilink(g);h&&f.workspace.openFile(h,void 0,{newTab:f.ui.hasModKey(d)})}};return o.createElement("div",{ref:a,className:r.source===e.note?"todo-notes is-rendered":"todo-notes",onClick:i,...r.source===e.note?{dangerouslySetInnerHTML:{__html:r.html}}:{children:e.note}})}var lm={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},cm=["tomorrow","weekend","pick"];function um(e=Te(new Date)){let t=Ia(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return xt(e,n)}function Pn(e,t=Te(new Date)){let r=e.slice(0,10),n=d=>d==="tomorrow"?xt(t,1):d==="weekend"?um(t):null,a=new Set,i=[];for(let d of cm){let c=n(d);if(c!==null){if(c===r||a.has(c))continue;a.add(c)}i.push({id:d,labelKey:lm[d],date:c})}return i}function gl(e,{todo:t,groupNames:r,setOpenId:n,onEdit:a,onPatch:i,onRequestDelete:d,disabled:c=!1}){let p=Ne(t);n(t.id);let l=Pn(t.dueDate??"",Te(new Date));return f.ui.openMenu([{label:s("auto.bae7d5be7082"),icon:o.createElement(Qe,{className:"todo-menu-action-icon"}),enabled:!c,submenu:fo().map(u=>({label:u.label,icon:o.createElement($e,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>i(ke(u.status))}))},{label:s("todo.menu.reschedule"),icon:o.createElement(At,{className:"todo-menu-action-icon"}),enabled:!c,submenu:l.filter(u=>u.date).map(u=>({label:s(u.labelKey),icon:u.id==="tomorrow"?o.createElement(er,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(sn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:u.date})}))},{label:s(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Me,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:()=>i({flagged:t.flagged?void 0:!0})},{label:s("auto.886cbff9d9df"),icon:o.createElement(bd,{className:"todo-menu-action-icon"}),enabled:!c,submenu:He.map(u=>({label:_t(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>i({priority:u.id})}))},{label:s("todo.menu.moveGroup"),icon:o.createElement(on,{className:"todo-menu-action-icon"}),enabled:!c,submenu:[{label:s("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>i({group:void 0})},...r.map(u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>i({group:u})}))]},{type:"separator"},{label:s("auto.5301648dcf6b"),icon:o.createElement(yd,{className:"todo-menu-action-icon"}),enabled:!c,onSelect:a},{type:"separator"},{label:s("auto.f6fdbe48dc54"),icon:o.createElement(qt,{className:"todo-menu-action-icon"}),enabled:!c,danger:!0,onSelect:d}],e).then(()=>{}).finally(()=>n(null))}function On(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),gl({x:e.clientX,y:e.clientY},t))}var Mn=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:d=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":s("auto.047d10fd5b0e"),title:s("auto.6bf5da9c080b"),disabled:d,onClick:c=>{c.stopPropagation(),gl({anchor:c.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:d})}},o.createElement(pd,null)));function pm(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function mm(e,t=.998){return e/1e3*t/(1-t)}function hl(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function bl(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+pm(n-t,a,.2))}function yl(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,mm(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function wl(e,t,r,n,a,i){let d=Math.min(Math.max(n,.008333333333333333),.03333333333333333),c=(2*Math.PI/a)**2,p=2*i*Math.sqrt(c),l=t+(-c*(e-r)-p*t)*d,u=e+l*d,g=Math.abs(u-r)<.5&&Math.abs(l)<20;return{value:g?r:u,velocity:g?0:l,done:g}}function di(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,d=Math.max(56,Math.ceil(Math.max(...t))+22),c=n*d<=i+(r?24:0),p=c?d:48,l=Math.min(n*p,Math.max(i,n*32)),u=a?Math.min(Math.max(e*.8,l+56),e-24):l+56;return{buttonWidth:p,labelled:c,openWidth:l,commitPoint:u}}var vl=.22,xl=.18,fm=.8,_n=.9,gm=400,hm=80,bm=10,ym=5,wm=4,vm=3,xm=.5,km=6,Tm=["left","right"],kl={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Sm(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function Am(e,t){let r={today:o.createElement(er,null),tomorrow:o.createElement(er,null),weekend:o.createElement(sn,null),pick:o.createElement(At,null)};return e.map(n=>({key:n.id,label:s(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var pr=null;function Tl(e){if(pr===e)return;let t=pr;pr=e,t?.close()}function Sl(e){pr===e&&(pr=null)}var Ao;function Al(e,t){if(Ao===void 0)try{Ao=document.createElement("canvas").getContext("2d")}catch{Ao=null}return Ao?(Ao.font=t,Ao.measureText(e).width):e.length*7}var Em=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,ur=e=>e>0?"left":e<0?"right":null,El=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),d=o.useRef(null),c=o.useRef({left:null,right:null}),p=o.useRef(0),l=o.useRef(null),u=o.useRef(null),g=o.useRef([]),h=o.useRef(!1),m=o.useRef(null),A=o.useRef(null),S=o.useRef({velocity:0,target:0,response:vl,damping:_n}),_=o.useRef({left:"",right:""}),N=o.useMemo(()=>Am(Pn(e.dueDate??"",Te(new Date)),r),[e.dueDate,r]),E=o.useMemo(()=>[{key:"flag",label:s(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Me,null),run:()=>r.toggleFlag()},{key:"details",label:s("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(md,null),run:()=>r.openDetails()},{key:"delete",label:s("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(qt,null),run:()=>r.remove()}],[r,e.flagged]),x={left:N,right:E},[v,O]=o.useState(()=>({rowWidth:0,left:kl,right:kl})),K=o.useRef(v);K.current=v;let W=()=>{let k=i.current?.querySelector(".todo-swipe-action");if(!k||typeof getComputedStyle!="function")return"13px sans-serif";let P=getComputedStyle(k);return`${P.fontWeight} ${P.fontSize} ${P.fontFamily}`},R=()=>{let k=i.current?.clientWidth??0,P=W(),G=K.current,M={rowWidth:k,left:di(k,N.map(Q=>Al(Q.label,P)),G.left.labelled),right:di(k,E.map(Q=>Al(Q.label,P)),G.right.labelled)};K.current=M;let q=Q=>G[Q].openWidth!==M[Q].openWidth||G[Q].labelled!==M[Q].labelled;return(G.rowWidth!==k||q("left")||q("right"))&&O(M),M},j=o.useRef(R);j.current=R,o.useEffect(()=>{j.current()},[N,E]);let ee=k=>{let P=ur(k);return!P||P!==u.current?!1:Math.abs(k)>=K.current[P].commitPoint},de=(k,P=!1)=>{p.current=k,P&&k!==0?Tl(y.current):k===0&&Sl(y.current);let G=i.current,M=d.current;if(!G||!M)return;M.style.transform=k?`translate3d(${k}px, 0, 0)`:"";let q=ur(k),Q=K.current,ce=ee(k);G.classList.toggle("open",k!==0),G.classList.toggle("committed",ce);for(let V of Tm){let F=c.current[V];if(!F)continue;let se=q===V;F.classList.toggle("committed",se&&ce);let be=se?ce?"100%":`${Math.max(Q[V].openWidth,Math.abs(k))}px`:`${k===0?Q[V].openWidth:0}px`,_e=`${be}|${se}`;_.current[V]!==_e&&(_.current[V]=_e,F.style.width=be,F.setAttribute("aria-hidden",String(!se)))}};o.useLayoutEffect(()=>de(p.current));let ae=()=>{m.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(m.current),m.current=null},le=(k,P,G,M)=>{if(ae(),k!==0&&Tl(y.current),p.current===k||Em()||typeof requestAnimationFrame!="function"){de(k);return}S.current={velocity:P,target:k,response:G,damping:M};let q=0,Q=ce=>{let V=q?(ce-q)/1e3:.016666666666666666;q=ce;let F=S.current,se=wl(p.current,F.velocity,F.target,V,F.response,F.damping);F.velocity=se.velocity,de(se.value),m.current=se.done?null:requestAnimationFrame(Q)};m.current=requestAnimationFrame(Q)},w=o.useRef(()=>{});w.current=()=>{l.current=null,le(0,0,xl,_n)};let L=o.useCallback(()=>w.current(),[]),y=o.useRef({close:()=>w.current()}),T=()=>{ae(),l.current=null,A.current!=null&&window.clearTimeout(A.current),A.current=null,de(0)},I=o.useRef(T);I.current=T;let C=k=>{let P=K.current,G=ur(k);if(!G)return 0;let M=l.current?.origin;if(M&&G!==M)return 0;let q=P[G],Q=G===u.current?q.commitPoint:q.openWidth;return bl(k,Q,P.rowWidth)},re=(k,P,G,M,q)=>{ae(),R();let Q=p.current,ce=ur(Q),V=Math.abs(Q)>8?ce:null;u.current=ce&&Math.abs(Q)>=K.current[ce].openWidth-1?ce:null,l.current=Sm(k,P,G,M,Q,V),g.current=[{x:Q,t:q}]},ie=(k,P)=>{let G=l.current;!G||G.ended||(G.live||(G.live=!0,ae(),n?.()),g.current.push({x:k,t:P}),g.current.length>km&&g.current.shift(),de(C(k),!0),ee(p.current)&&(G.crossed=!0))},b=k=>{let P=l.current;if(!P||P.ended)return;if(P.ended=!0,!P.live){l.current=null;return}let G=()=>{P.kind==="pointer"&&(l.current=null)},M=hl(g.current),q=p.current,Q=ur(q);if(!Q){G(),de(0);return}let ce=K.current[Q],V=k&&ee(q),F=yl({offset:q,velocity:M,openWidth:ce.openWidth,committed:V});if(G(),F.commit){let se=Q==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",be=i.current?.querySelector(se),_e=x[Q],nt=Q==="left"?_e[0]:_e[_e.length-1];le(0,M,xl,_n),nt?.run(be??i.current);return}le(F.target,M,vl,Math.abs(M)>gm?fm:_n)};o.useEffect(()=>L(),[e.dueDate,e.flagged,L]),o.useEffect(()=>{let k=y.current;return()=>{ae(),A.current!=null&&window.clearTimeout(A.current),Sl(k)}},[]),o.useEffect(()=>{let k=i.current,P=k?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!k||!P)return;let G=0,M=new P(()=>{let q=k.clientWidth,Q=G!==q;G=q,j.current(),Q&&p.current!==0&&I.current()});return M.observe(k),()=>M.disconnect()},[]);let $=o.useRef({disabled:t,begin:re,move:ie,end:b});$.current={disabled:t,begin:re,move:ie,end:b},o.useEffect(()=>{let k=i.current;if(!k)return;let P=()=>{A.current!=null&&window.clearTimeout(A.current),A.current=null},G=()=>{A.current=null,l.current?.kind==="wheel"&&($.current.end(!0),l.current=null)},M=q=>{let Q=$.current;if(Q.disabled||Math.abs(q.deltaX)<=Math.abs(q.deltaY)||q.deltaX===0)return;q.preventDefault();let ce=q.deltaMode===WheelEvent.DOM_DELTA_LINE?16:q.deltaMode===WheelEvent.DOM_DELTA_PAGE?k.clientWidth:1,V=-q.deltaX*ce,F=l.current;(!F||F.kind!=="wheel")&&(Q.begin("wheel",-1,0,0,q.timeStamp),F=l.current),P(),A.current=window.setTimeout(G,hm);let se=Math.abs(V),be=F.previous;F.previous=se;let _e=F.live&&(F.ended||F.origin!==null&&p.current===0),nt=se>=be+ym,Do=F.distance!==0&&Math.sign(V)!==Math.sign(F.distance)&&se>=wm;if(_e&&(nt||Do)&&(Q.end(!1),Q.begin("wheel",-1,0,0,q.timeStamp),F=l.current,F.previous=se),F.ended)return;if(F.decay=se<be?F.decay+1:0,F.peak=Math.max(F.peak,se),F.distance+=V,F.live&&F.peak>=bm&&F.decay>=vm&&se<F.peak*xm){Q.end(F.crossed);return}!F.live&&Math.abs(F.distance)<8||Q.move(F.base+F.distance,q.timeStamp)};return k.addEventListener("wheel",M,{passive:!1}),()=>{k.removeEventListener("wheel",M),P()}},[]);let Z=(k,P)=>o.createElement("div",{ref:G=>{c.current[k]=G},className:`todo-swipe-tray todo-swipe-tray-${k} ${v[k].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${v[k].openWidth}px`}},P.map(G=>o.createElement("button",{key:G.key,type:"button",className:G.cls,tabIndex:-1,title:G.label,"aria-label":G.label,onClick:M=>{M.stopPropagation(),L(),G.run(M.currentTarget)}},G.icon,o.createElement("span",null,G.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:k=>{t||k.pointerType==="mouse"&&k.button!==0||k.target.closest(".todo-swipe-tray")||re("pointer",k.pointerId,k.clientX,k.clientY,k.timeStamp)},onPointerMove:k=>{let P=l.current;if(!P||P.kind!=="pointer"||P.pointerId!==k.pointerId)return;let G=k.clientX-P.originX,M=k.clientY-P.originY;if(!P.live){if(Math.abs(M)>Math.abs(G)){k.currentTarget.hasPointerCapture?.(k.pointerId)&&k.currentTarget.releasePointerCapture(k.pointerId),l.current=null;return}if(Math.abs(G)<8)return;h.current=!0,k.currentTarget.setPointerCapture?.(k.pointerId)}k.preventDefault(),ie(P.base+G,k.timeStamp)},onPointerUp:k=>{let P=l.current;!P||P.kind!=="pointer"||P.pointerId!==k.pointerId||(k.currentTarget.hasPointerCapture?.(k.pointerId)&&k.currentTarget.releasePointerCapture(k.pointerId),P.live&&ie(P.base+(k.clientX-P.originX),k.timeStamp),b(!0))},onPointerCancel:k=>{let P=l.current;!P||P.kind!=="pointer"||P.pointerId!==k.pointerId||(k.currentTarget.hasPointerCapture?.(k.pointerId)&&k.currentTarget.releasePointerCapture(k.pointerId),L())},onClickCapture:k=>{let P=!!k.target.closest(".todo-swipe-tray");if(P&&(h.current=!1),h.current&&!P){h.current=!1,k.stopPropagation(),k.preventDefault();return}p.current&&!P&&(k.stopPropagation(),k.preventDefault(),L())}},N.length>0&&Z("left",N),o.createElement("div",{ref:d,className:"todo-swipe-surface"},a),E.length>0&&Z("right",E))};function Dl(e,t,r){let n=Ne(t);f.ui.openMenu(fo().map(a=>({label:a.label,icon:o.createElement($e,{status:a.status,dotCls:a.cls,color:a.color}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(ke(a.status))})),{anchor:e})}function ci({status:e,style:t}){let r=Ie(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},at(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement($e,{status:e==="open"?null:e,dotCls:r.cls}),at(e))}function Cl({status:e}){return o.createElement(ci,{status:e,style:ws()})}var Dm=2;function ui(e,t){let r=Ne(e),n=t.pendingIds.has(e.id),a=o.useRef(null),i=o.useRef(null),d=o.useRef(!1),c=o.useCallback(()=>{i.current!=null&&(window.clearTimeout(i.current),i.current=null)},[]);return o.useEffect(()=>c,[c]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:a,className:"todo-check","data-status":r,type:"checkbox",checked:r==="completed","aria-disabled":n||void 0,onPointerDown:()=>{n||(d.current=!1,c(),i.current=window.setTimeout(()=>{d.current=!0;let l=a.current;l&&f.ui.openMenu(fo().map(u=>({label:u.label,icon:o.createElement($e,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?r==="open":u.status===r,enabled:!n,onSelect:()=>t.patchTodo(e.id,ke(u.status))})),{anchor:l})},450))},onPointerUp:c,onPointerLeave:c,onClick:l=>{d.current&&l.preventDefault()},onKeyDown:()=>{d.current=!1},onChange:l=>{if(d.current){d.current=!1;return}t.patchTodo(e.id,ke(l.target.checked?"completed":null))},"aria-label":s("auto.13816aca9c25",{p0:e.title})}),r!=="open"&&r!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement($e,{status:r,dotCls:Ie(r).cls}))),cancelHold:c}}var Il=({todo:e,groups:t,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let d=o.useRef(null);o.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]);let[c,p]=o.useState("");o.useEffect(()=>{let y=!0;return p(""),Ln(e.title).then(T=>{y&&p(T)}).catch(()=>{y&&p("")}),()=>{y=!1}},[e.title]);let l=(y,T)=>f.workspace.openFile(y,void 0,{newTab:T}),u=He.find(y=>y.id===e.priority)??He[0],g=ve(t),h=Ne(e),m=[e.filePath,...e.attachments??[]].filter(y=>!!y),[A,S]=o.useState(!1),_=A?m:m.slice(0,Dm),N=m.length-_.length,E=e.urls?.length??0,x=r&&m.length>0,v=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||E>0||x||e.status&&e.status!=="open"&&!Ie(e.status).done||e.priority!=="normal"),O=n.pendingIds.has(e.id),K=Te(new Date),W=e.dueDate&&!a?Vt(e.dueDate,K,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",R=e.dueDate?je(e.dueDate,f.getState().dateFormat):"",j=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<K,ee=o.useRef(null);o.useEffect(()=>ee.current?Ar(e.id,ee.current):void 0,[e.id]);let{check:de,cancelHold:ae}=ui(e,n),le=()=>{Xd(e)||n.openDetail(e.id)},w=y=>n.patchTodo(e.id,y),L=o.useMemo(()=>({reschedule:y=>{n.patchTodo(e.id,{dueDate:y})},pickDate:y=>{let{DateField:T}=f.ui.settings;f.ui.openPopover(I=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(T,{value:e.dueDate,ariaLabel:s("todo.swipe.date"),onChange:C=>{n.patchTodo(e.id,{dueDate:C}),I.close()}})),{anchor:y},{ariaLabel:s("todo.swipe.date")})},setStatus:y=>Dl(y,e,w),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{st(e,n.removeTodo)}}),[e,n]);return o.createElement(El,{todo:e,disabled:O,actions:L,onEngage:ae},o.createElement("article",{ref:ee,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,"data-status":h,tabIndex:0,onContextMenu:y=>On(y,{todo:e,groupNames:g,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:w,onRequestDelete:()=>st(e,n.removeTodo),disabled:O}),onKeyDown:y=>{if(y.target===y.currentTarget){if(y.key==="ArrowDown"||y.key==="ArrowUp"){y.preventDefault(),i?.(y.key==="ArrowDown"?1:-1);return}if(y.key==="Escape"){y.currentTarget.blur();return}y.key==="Enter"&&(y.preventDefault(),n.openDetail(e.id))}},onClick:y=>{y.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||y.detail>1||(d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{d.current=null,le()},220))},onDoubleClick:y=>{d.current&&(clearTimeout(d.current),d.current=null),!y.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},de,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,u.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},u.symbol," "),c?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:c}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement(fl,{todo:e,c:n}),(v||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:Ee(ze(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Ie(e.status).done&&o.createElement(Cl,{status:e.status}),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Yt,null)),fs(e.priority)),W&&o.createElement("button",{className:`todo-date${j?" is-overdue":""}`,type:"button",title:s("todo.openInCalendar",{p0:R||W}),onClick:y=>{y.stopPropagation(),le()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(At,null)),o.createElement("span",{className:"todo-date-day"},W),R&&R!==W&&o.createElement("span",{className:"todo-date-full"},R)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(vd,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:s("todo.openLocationOf",{p0:e.location.name}),onClick:y=>{y.stopPropagation(),tr(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(et,null)),e.location.name),x&&o.createElement("span",{className:"todo-attach-count",title:s("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(St,null)),m.length),E>0&&o.createElement("span",{className:"todo-meta-glyph",title:s("todo.url")},o.createElement(Xt,null),E>1&&E),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:s("todo.reminderSet")},o.createElement(wd,null),e.remindAt.slice(11,16)),!r&&e.tags?.slice(0,3).map(y=>o.createElement("span",{key:y,className:"todo-tag-text"},"#",y)),!r&&(e.tags?.length??0)>3&&o.createElement("span",{className:"todo-tag-more",title:e.tags.slice(3).map(y=>`#${y}`).join(" ")},"+",e.tags.length-3))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:s("todo.flagged")},o.createElement(Me,null)),o.createElement(Mn,{todo:e,groupNames:g,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:w,onRequestDelete:()=>st(e,n.removeTodo),disabled:O})),!r&&m.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":s("auto.c509ffcf5b5c")},_.map(y=>o.createElement("button",{key:y,className:"todo-file-card",title:y,onClick:T=>{T.stopPropagation(),l(y,f.ui.hasModKey(T))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},y===e.filePath?o.createElement(nn,null):o.createElement(St,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},ll(y)),o.createElement("span",{className:"todo-file-card-kind"},ii(y))))),(N>0||A)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${A?" open":""}`,title:A?s("todo.fewerFiles"):s("todo.moreFiles",{p0:N}),"aria-expanded":A,onClick:y=>{y.stopPropagation(),S(T=>!T)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(tn,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},A?s("todo.fewerFiles"):s("todo.moreFiles",{p0:N})))))))};var Nl=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=Oe(),d=o.useSyncExternalStore(i.subscribe,i.get,i.get),c=o.useMemo(()=>e.map(g=>g.id),[e]),p=Nn(o,{ids:c,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,d?.todoId]}),l=p.show;o.useLayoutEffect(()=>{d&&c.includes(d.todoId)&&l(d.todoId)},[d,c,l]);let u=o.useCallback((g,h)=>{let m=e[Math.max(0,Math.min(e.length-1,g+h))];m&&l(m.id,".todo-row")},[e,l]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(g=>o.createElement(Il,{key:e[g].id,todo:e[g],groups:t,compact:r,c:a,hideDate:n,onMoveFocus:h=>u(g,h)})))};function Ll({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:d}){let c=Oe(),p=o.useSyncExternalStore(c.subscribe,c.get,c.get),l=o.useMemo(()=>e.map(N=>N.key),[e]),[u,g]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),m=e.filter(N=>N.todos.some(E=>h.has(E.id))).map(N=>N.key),A=o.useCallback((N,E)=>a?.(e[E])??32+e[E].todos.length*(r?52:84),[e,r,a]),S=Nn(o,{ids:l,estimate:A,pinned:m,layoutKey:i??r}),_=S.show;return o.useLayoutEffect(()=>{if(!p)return;let N=e.find(E=>E.todos.some(x=>x.id===p.todoId));N&&_(N.key)},[p,e,_]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:S.ref,onDragStartCapture:N=>g(N.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>g(null)},S.render(N=>o.cloneElement(d(e[N]),{"data-visible-key":l[N]})))}function Cm(e,t,r,n,a){if(e==="none")return s("todo.breakdown.noDate");if(e==="monthly")return Bt(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=Bt(t),d=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return s("todo.breakdown.weekLabel",{count:Ys(i),p0:`${Wr(t,a,n)} \u2013 ${Wr(ot(d),a,n)}`})}return t===xt(r,-1)?s("todo.due.yesterday"):t===r?s("todo.due.today"):t===xt(r,1)?s("todo.due.tomorrow"):Wr(t,a,n)}function zn({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:d=!1}){let c=ot(),{shortDateFormat:p}=rt("shortDateFormat"),l=f.ui.language(),u=o.useMemo(()=>{if(!d)return Pa(e,a,Ho(i));let g=new Map(e.map(m=>[m,Na(m)])),h=[...e].sort((m,A)=>g.get(A).localeCompare(g.get(m)));return Pa(h,a,Ho(i),{dateOf:m=>La(g.get(m))})},[a,d,e,i]);return o.createElement(Ll,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},g=>o.createElement("section",{className:"todo-panel-date-section",key:`${g.kind}:${g.key}`},o.createElement("div",{className:"todo-panel-date-head"},Cm(g.kind,g.key,c,p,l)),o.createElement(Nl,{todos:g.todos,groups:t,compact:r,c:n})))}function Im(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function Fn(e,t,r){let n=Im(e,t);return r?n:n.filter(a=>!uo(a))}function pi(){let[e,t]=ut(),[r]=pt(),a=it().map(u=>u.id),i=Fn(e,a,r),d=a.filter(u=>!uo(u)),c=a.filter(u=>uo(u)),p=u=>u.length===i.length&&u.every(g=>i.includes(g)),l=[{id:"all",label:s("todo.chip.all"),title:s("todo.filters.quickAll"),active:i.length===a.length,select:()=>{Jt(!0),t("all")}},{id:"open",label:s("todo.status.todo"),title:s("todo.filters.quickOpen"),active:p(d),select:()=>{Jt(!1),t(d)}},{id:"done",label:s("todo.status.completed"),title:s("todo.filters.quickDone"),active:p(c),select:()=>{Jt(!0),t(c)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":s("todo.filters.statuses")},l.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Pl(){let[e,t]=ut(),[r]=pt(),n=it(),a=n.map(c=>c.id),i=Fn(e,a,r),d=c=>{let p=i.includes(c)?i.filter(l=>l!==c):a.filter(l=>i.includes(l)||l===c);p.length&&(Jt(p.some(l=>uo(l))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(pi,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(c=>{let p=i.includes(c.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:c.id,onClick:()=>d(c.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement($e,{status:c.id==="open"?null:c.id,dotCls:c.cls})),o.createElement("span",null,c.label))}))}function Gn(e){return e==="flagged"?o.createElement(Me,null):e==="priority"?o.createElement(Yt,null):e==="due"?o.createElement(Jo,null):e==="updated"?o.createElement(fd,null):e==="created"?o.createElement(gd,null):o.createElement(hd,null)}function Nm(){return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-filter-section-label"},s("todo.filters.show")),o.createElement(pi,null))}function mi({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[d,c]=o.useState(r),p=Object.entries(Bo);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,s("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${d==="desc"?" active":""}`,type:"button","aria-label":s("auto.01e635f27ec2"),title:s("auto.01e635f27ec2"),"aria-pressed":d==="desc",onClick:()=>{c("desc"),n("desc")}},o.createElement(Zo,null)),o.createElement("button",{className:`todo-sort-direction${d==="asc"?" active":""}`,type:"button","aria-label":s("auto.4fee0a06b6e4"),title:s("auto.4fee0a06b6e4"),"aria-pressed":d==="asc",onClick:()=>{c("asc"),n("asc")}},o.createElement(Xo,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([l,u])=>o.createElement("button",{key:l,type:"button",className:`todo-sort-option${a===l?" active":""}`,"aria-pressed":a===l,onClick:()=>{i(l),t(l)}},Gn(l),o.createElement("span",null,s(u))))))}function lr({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:d,onOpenSettings:c,embedded:p=!1}){let[l,u]=o.useState(a),[g,h]=o.useState(i),m=p?a:l,A=p?i:g,S=m.length===r.length&&(!n||A),_=[...r.map(v=>m.some(O=>O.toLowerCase()===v.toLowerCase())),...n?[A]:[]],N=(v,O)=>v?` active${_[O-1]?"":" selection-run-start"}${_[O+1]?"":" selection-run-end"}`:"",E=(v,O)=>{u(v),h(O),d(v,O)},x=v=>{let O=e.filter(R=>v===null?!R.group:tt([v]).has(Y(R.group??""))),K=v??s("todo.chip.noGroup"),W=v===null?A:m.some(R=>Y(R)===Y(v));return o.createElement("div",{className:"todo-group-filter-item",key:v??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},v&&o.createElement("span",{className:"props-info-dot",style:{background:Ee(ze(v,t))}}),K),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,O.length),o.createElement(f.ui.settings.Toggle,{label:K,checked:W,onChange:()=>E(v===null?m:W?m.filter(R=>Y(R)!==Y(v)):[...m,v],v===null?!A:A)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:c},s("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>E(S?[]:r,S?!1:n)},s(S?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(v=>x(v)),n&&x(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:c},s("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>E(S?[]:r,S?!1:n)},s(S?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((v,O)=>{let K=_[O];return o.createElement("button",{key:v,type:"button",className:`todo-group-filter-row${N(K,O)}`,"aria-pressed":K,onClick:()=>E(K?l.filter(W=>W.toLowerCase()!==v.toLowerCase()):[...l,v],g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},K?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Ee(ze(v,t))}}),o.createElement("span",{className:"todo-tree-label"},v),o.createElement("span",{className:"todo-tree-count"},un(e,v)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${N(g,r.length)}`,"aria-pressed":g,onClick:()=>E(l,!g)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},g?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},s("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},un(e,null)))))}var Ol={scheduled:()=>o.createElement(Jo,null),today:()=>o.createElement(Qo,null),week:()=>o.createElement(dn,null),flagged:()=>o.createElement(Me,null),all:()=>o.createElement(an,null),completed:()=>o.createElement(Qe,null)},Lm=()=>{let{activePluginTab:e,dateFormat:t}=rt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Cn(),a=Be(),i=dr(),[d,c]=o.useState(""),[p,l]=o.useState(""),[u,g]=o.useState(""),[h,m]=o.useState({}),[A,S]=o.useState(!1),[_,N]=o.useState(!1),[E,x]=o.useState(!1),[v,O]=o.useState(!1),{DateField:K,TimeField:W}=f.ui.settings,[R,j]=o.useState(!1),[ee,de]=Tn(),[ae]=pt(),[le,w]=hn("todo"),{sortField:L,sortDir:y,compact:T}=le,[I,C]=ut(),re=it(),ie=bn(),b=kn(),$=o.useMemo(()=>zd(b),[b]),Z=e?.pluginId===f.pluginId,k=o.useRef(null),P=o.useRef(null),G=o.useRef(null),M=To(L,y,"left_sidebar");co(M.openDetail);let q=Te(new Date),Q=o.useMemo(()=>Fd(M.todos,q),[M.todos,q]),ce=o.useMemo(()=>ve(a),[a]),V=o.useMemo(()=>M.todos.some(D=>!D.group),[M.todos]),F=i.kind==="groups"?i.names:ce,se=i.kind==="groups"?i.includeUngrouped===!0:V,be=F.length===ce.length&&(!V||se),_e=o.useMemo(()=>{let D=M.ordered.filter(B=>cn(B,i,ae,q));if(I!=="all"&&(D=D.filter(B=>mo(B,I))),ee.trim()){let B=jt(ee);D=D.filter(pe=>B(pe.tags??[],pe.title,pe.note,pe.group??""))}return n?D=D.filter(B=>{let pe=B.dueDate?.slice(0,10);return!!pe&&pe>=n.start&&pe<=n.end}):r&&(D=D.filter(B=>B.dueDate?.slice(0,10)===r)),D},[M.ordered,i,ae,I,ee,r,n,q]),nt=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,Do=async()=>{if(M.creating)return;let D=Yr(d,q),B=D.title;if(!B){ro();return}let pe=nt;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let qe=await f.ui.openMenu([...i.names.map((Co,Vn)=>({id:`group:${Vn}`,label:Co})),...i.includeUngrouped?[{id:"ungrouped",label:s("todo.chip.noGroup")}]:[]],{anchor:k.current??G.current,align:"start"});if(qe===null)return;pe=qe.startsWith("group:")?i.names[Number(qe.slice(6))]:void 0}O(!1);let Re={note:p.trim(),tags:[...new Set([...h.tags??[],...u.split(/[\s,]+/).map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])],priority:D.priority,...pe?{group:pe}:{}};i.kind==="smart"&&(i.id==="today"||i.id==="week")&&(Re.dueDate=q),i.kind==="smart"&&i.id==="flagged"&&(Re.flagged=!0),Object.assign(Re,{...h,tags:Re.tags}),D.dueDate&&(Re.dueDate=D.dueDate),await M.create(B,void 0,{patch:Re})?(O(!1),c(""),l(""),g(""),m({}),S(!1),N(!1),x(!1),k.current?.focus()):O(!0)},fr=()=>{j(!0),window.setTimeout(()=>k.current?.focus(),0)},ro=()=>{c(""),j(!1),l(""),g(""),m({}),S(!1),N(!1),x(!1),O(!1)},Ct=Oe(),Un=o.useSyncExternalStore(Ct.subscribe,Ct.get,Ct.get);o.useEffect(()=>{Un?.mode==="create"&&(j(!0),Ct.clear())},[Un,Ct]),o.useEffect(()=>{R&&!M.creating&&k.current?.focus()},[R,Z,M.creating]),o.useLayoutEffect(()=>{P.current&&(P.current.style.height="auto",P.current.style.height=`${P.current.scrollHeight}px`)},[p,R]);let no=h.dueDate??(i.kind==="smart"&&(i.id==="today"||i.id==="week")?q:""),ao=R&&o.createElement("form",{className:"todo-compose",onSubmit:D=>{D.preventDefault(),Do()},onKeyDown:D=>{D.key==="Escape"&&!D.defaultPrevented&&!M.creating&&(D.preventDefault(),ro())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:k,className:"todo-compose-title",value:d,onChange:D=>c(D.target.value),placeholder:nt?s("todo.newTodoIn",{p0:nt}):s("auto.c274dabfd0fe"),"aria-label":s("auto.184c39d1837f"),disabled:M.creating}),o.createElement("textarea",{ref:P,className:"todo-compose-note",rows:1,value:p,onChange:D=>l(D.target.value),placeholder:s("todo.edit.notes"),"aria-label":s("todo.edit.notes"),disabled:M.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(D=>o.createElement("span",{className:"todo-compose-token",key:D},o.createElement("span",null,"#",D),o.createElement("button",{type:"button","aria-label":s("todo.compose.removeTag",{tag:D}),disabled:M.creating,onClick:()=>m(B=>({...B,tags:B.tags?.filter(pe=>pe!==D)}))},o.createElement(Se,null)))),o.createElement("input",{value:u,onChange:D=>{let B=D.target.value;if(!("isComposing"in D.nativeEvent&&D.nativeEvent.isComposing)&&/[\s,]/.test(B)){let pe=B.split(/[\s,]+/),Re=pe.pop()??"";m(It=>({...It,tags:[...new Set([...It.tags??[],...pe.map(qe=>qe.replace(/^#+/,"")).filter(Boolean)])]})),g(Re)}else g(B)},onKeyDown:D=>{D.nativeEvent.isComposing||(D.key==="Enter"&&u.trim()&&(D.preventDefault(),m(B=>({...B,tags:[...new Set([...B.tags??[],u.trim().replace(/^#+/,"")].filter(Boolean))]})),g("")),D.key==="Backspace"&&!u&&m(B=>({...B,tags:B.tags?.slice(0,-1)})))},placeholder:s("todo.compose.addTags"),"aria-label":s("todo.edit.tags"),disabled:M.creating})),_&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(K,{className:"todo-compose-date-field",value:no,onChange:D=>m(B=>({...B,dueDate:D})),placeholder:s("todo.compose.addDate"),ariaLabel:s("todo.field.dueDate"),disabled:M.creating}),o.createElement(W,{className:"todo-compose-time-field",value:h.startTime??"",onChange:D=>m(B=>({...B,startTime:D||void 0})),placeholder:s("todo.compose.time"),ariaLabel:s("todo.field.startTime"),disabled:M.creating})),E&&o.createElement("div",{className:"todo-compose-location"},o.createElement(vo,{value:h.location,disabled:M.creating,onChange:D=>m(B=>({...B,location:D}))})),(A||!!h.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(D=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:D,title:D},o.createElement(St,null),o.createElement("span",null,D.split("/").pop()),o.createElement("button",{type:"button",disabled:M.creating,"aria-label":`${s("todo.removeAttachment")}: ${D}`,onClick:()=>m(B=>({...B,attachments:B.attachments?.filter(pe=>pe!==D)}))},o.createElement(Se,null)))),A&&o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:s("todo.addAttachment"),placeholder:s("todo.addAttachment"),disabled:M.creating,onChange:D=>{D&&(m(B=>({...B,attachments:[...new Set([...B.attachments??[],D])]})),S(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${no?" has-value":""}`,"aria-pressed":_,disabled:M.creating,"aria-label":s("todo.compose.addDate"),title:s("todo.compose.addDate"),onClick:()=>N(D=>!D)},o.createElement(At,null),no&&o.createElement("span",null,Vt(no,q,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),t),h.startTime?` ${h.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${h.location?" has-value":""}`,"aria-pressed":E,disabled:M.creating,"aria-label":s("todo.compose.addPlace"),title:h.location?.name??s("todo.compose.addPlace"),onClick:()=>x(D=>!D)},o.createElement(et,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${h.attachments?.length?" has-value":""}`,"aria-pressed":A,disabled:M.creating,"aria-label":s("todo.addAttachment"),title:s("todo.addAttachment"),onClick:()=>S(D=>!D)},o.createElement(St,null),!!h.attachments?.length&&o.createElement("span",null,h.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${h.priority&&h.priority!=="normal"?" has-value":""}`,disabled:M.creating,"aria-label":s("todo.field.priority"),title:s("todo.field.priority"),onClick:async D=>{let B=await f.ui.openMenu(He.map(pe=>({id:pe.id,label:s(pe.labelKey),checked:pe.id===(h.priority??"normal")})),{anchor:D.currentTarget,align:"start"});B&&m(pe=>({...pe,priority:B}))}},o.createElement(Yt,null),h.priority&&h.priority!=="normal"&&o.createElement("span",null,s(`todo.priority.${h.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>m(D=>({...D,flagged:!(D.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":s("todo.flag"),title:s("todo.flag"),"aria-pressed":h.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:M.creating},o.createElement(Me,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!d.trim()||M.creating},s("todo.group.add"))),v&&o.createElement("div",{className:"todo-compose-error",role:"alert"},s("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:ro,"aria-label":s("todo.group.cancel"),title:s("todo.group.cancel"),disabled:M.creating},o.createElement(Se,null))),gr=D=>{f.ui.openPopover(({close:B})=>o.createElement("div",{className:"todo-filter-popover-stack"},o.createElement(Nm,null),(ce.length>0||V)&&o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-filter-divider"}),o.createElement(lr,{todos:M.todos,groups:a,names:ce,hasUngrouped:V,selected:F,includeUngrouped:se,onChange:(pe,Re)=>Ue(pe.length===ce.length&&(!V||Re)?Le:{kind:"groups",names:pe,includeUngrouped:Re}),onOpenSettings:()=>{B(),Dt()}}))),{anchor:D,align:"end"},{className:"todo-filter-popover",ariaLabel:s("todo.filters.title"),width:248})},z=D=>{f.ui.openPopover(()=>o.createElement(mi,{sortField:L,setSortField:B=>w({sortField:B}),sortDir:y,setSortDir:B=>w({sortDir:B})}),{anchor:D,align:"end"},{className:"todo-sort-popover",ariaLabel:s("auto.63e08dc2a4e3")})},U=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},te=(D,B,pe,Re,It,qe,Co,Vn)=>{let Ai=pn(i,B),Ei=B.kind==="groups"&&B.names.length===1&&!B.includeUngrouped&&i.kind==="groups"?i.names.some(io=>Y(io)===Y(B.names[0])):Ai;return o.createElement("button",{key:Ze(B),type:"button",className:`todo-tree-row${It?" nested":""}${qe?` todo-${qe}-chip`:""}${Ei?" active":""}`,"aria-current":Ai?"true":void 0,"aria-label":qe?`${D} ${pe}`:void 0,title:qe?D:void 0,"aria-pressed":B.kind==="groups"?Ei:void 0,style:Co?{"--todo-chip-color":Ee(Co),"--todo-chip-on":Vn??ht(Co)}:void 0,onClick:io=>sr(B,ol(io)),onAuxClick:io=>{io.button===1&&(io.preventDefault(),sr(B,!0))}},Re&&o.createElement("span",{className:"todo-tree-icon"},Re),It&&o.createElement("span",{className:"todo-tree-dot",style:{background:Ee(It)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},D),o.createElement("span",{className:"todo-tree-count"},pe))},We=!!(ee||r||n||I!=="all")?s("auto.006b85a57ddf"):s("auto.cec28cbe4204"),ki=n?`${je(n.start,t)} \u2013 ${je(n.end,t)}`:r?je(r,t):null,Ti=I==="all"?null:`${s("auto.bae7d5be7082")}: ${I.length===1?re.find(D=>D.id===I[0])?.label??s("todo.chip.all"):s("todo.filters.statusCount",{count:I.length})}`,Si=s("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},s("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!Z&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${ae||I!=="all"||!be?" active":""}`,"aria-label":s("todo.filters.title"),title:s("todo.filters.title"),type:"button",onClick:D=>gr(D.currentTarget)},o.createElement(Od,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":s("auto.e3719eae891e"),"aria-pressed":T,title:T?s("auto.e3719eae891e"):s("auto.d2f76731e1e1"),type:"button",onClick:()=>w({compact:!T})},T?o.createElement(Qr,null):o.createElement(en,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":s("auto.63e08dc2a4e3"),title:`${y==="asc"?s("auto.4fee0a06b6e4"):s("auto.01e635f27ec2")} \xB7 ${s(Bo[L])}`,type:"button",onClick:D=>z(D.currentTarget)},y==="asc"?o.createElement(Xo,null):o.createElement(Zo,null),Gn(L))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":s("auto.25097a85052b"),title:s("auto.25097a85052b"),onClick:()=>f.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(Wt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:ee,onChange:D=>de(D.target.value),onKeyDown:D=>{D.key==="Escape"&&de("")},placeholder:s("auto.7be377261c61"),"aria-label":s("auto.e0345e9d3092")}),ee&&o.createElement("button",{className:"search-field-action",onClick:()=>de(""),"aria-label":s("auto.67300d0fed7c"),type:"button"},o.createElement(Se,null)))),Z?o.createElement("div",{className:"todo-tree todo-active-navigation"},ao,o.createElement("nav",{className:"todo-smart-grid","aria-label":s("auto.fdebf6672120")},$.map(D=>te(s(D.labelKey),{kind:"smart",id:D.id},Q[D.id],Ol[D.id](),void 0,"smart",D.color,rr(D,ht)))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},s("todo.view.myLists")),ce.map(D=>te(D,{kind:"groups",names:[D]},un(M.todos,D),void 0,ze(D,a))))):o.createElement(o.Fragment,null,!ee&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":s("auto.fdebf6672120")},ki?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:s("auto.f93fb4b1ab19"),onClick:U},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Qo,null)),o.createElement("span",{className:"todo-tree-label"},ki),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Se,null))):$.map(D=>te(s(D.labelKey),{kind:"smart",id:D.id},Q[D.id],Ol[D.id](),void 0,"smart",D.color,rr(D,ht)))),Ti&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>C("all")},o.createElement("span",{className:"todo-tree-label"},Ti),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(Se,null)))),o.createElement("div",{className:"todo-list"},ao,M.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):_e.length?o.createElement(zn,{todos:_e,groups:a,compact:T,controller:M,mode:ie,weekStart:f.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,We)))),!R&&o.createElement("button",{ref:G,className:"todo-fab",type:"button","aria-label":Si,title:Si,disabled:M.creating,onClick:fr},o.createElement(Tt,null)),o.createElement(So,{c:M}))},Ml=()=>o.createElement(Lm,null);function Pm({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=it(),[i,d]=o.useState(e),[c,p]=o.useState(r),l=a.map(m=>m.id),u=c==="all"?l:c,g=m=>{d(m),t(m)},h=m=>{let A=u.includes(m)?u.filter(_=>_!==m):l.filter(_=>u.includes(_)||_===m);if(!A.length)return;let S=A.length===l.length?"all":A;p(S),n(S)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,s("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>g(!1)},s("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>g(!0)},s("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(m=>o.createElement("button",{key:m.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(m.id),onClick:()=>h(m.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(m.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement($e,{status:m.id==="open"?null:m.id,dotCls:m.cls})),o.createElement("span",null,m.label)))))}var _l=()=>{let{activePath:e,weekStart:t}=rt("activePath","weekStart"),r=Nt(e)??"",n=Be(),a=bn(),[i,d]=hn("attachment"),{showCompleted:c,statusFilter:p,compact:l,sortField:u,sortDir:g,groupNames:h,includeUngrouped:m}=i,A=j=>d({showCompleted:j}),S=j=>d({statusFilter:j}),_=j=>d({sortField:j}),N=j=>d({sortDir:j}),E=To(u,g,"right_sidebar");co(E.openDetail);let x=o.useMemo(()=>ve(n),[n]),v=o.useMemo(()=>E.todos.some(j=>!j.group),[E.todos]),O=o.useMemo(()=>E.ordered.filter(j=>!(Nt(j.filePath)===r||(j.attachments??[]).some(de=>Nt(de)===r))||!c&&j.completed||(h.length||m)&&(!j.group&&!m||j.group&&!tt(h).has(Y(j.group)))?!1:mo(j,p)),[E.ordered,r,c,p,h,m]),K=j=>{f.ui.openPopover(({close:ee})=>o.createElement(lr,{todos:E.todos,groups:n,names:x,hasUngrouped:v,selected:h,includeUngrouped:m,onChange:(de,ae)=>d({groupNames:de,includeUngrouped:ae}),onOpenSettings:()=>{ee(),Dt()}}),{anchor:j,align:"end"},{className:"todo-groups-popover",ariaLabel:s("todo.view.groups")})},W=j=>{f.ui.openPopover(()=>o.createElement(Pm,{showCompleted:c,setShowCompleted:A,filter:p,setFilter:S}),{anchor:j,align:"end"},{className:"todo-filter-popover",ariaLabel:s("todo.filters.statusAndCompleted")})},R=j=>{f.ui.openPopover(()=>o.createElement(mi,{sortField:u,setSortField:_,sortDir:g,setSortDir:N}),{anchor:j,align:"end"},{className:"todo-sort-popover",ariaLabel:s("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},s("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||m?" active":""}`,type:"button","aria-label":s("todo.view.groups"),title:s("todo.view.groups"),onClick:j=>K(j.currentTarget)},o.createElement(rn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${c||p!=="all"?" active":""}`,type:"button","aria-label":s("todo.filters.statusAndCompleted"),title:s("todo.filters.statusAndCompleted"),onClick:j=>W(j.currentTarget)},o.createElement(Qe,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":l,"aria-label":s("auto.e3719eae891e"),onClick:()=>d({compact:!l})},l?o.createElement(Qr,null):o.createElement(en,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":s("auto.63e08dc2a4e3"),title:`${g==="asc"?s("auto.4fee0a06b6e4"):s("auto.01e635f27ec2")} \xB7 ${s(Bo[u])}`,onClick:j=>R(j.currentTarget)},g==="asc"?o.createElement(Xo,null):o.createElement(Zo,null),Gn(u)))),o.createElement("div",{className:"todo-list"},E.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):r?O.length?o.createElement(zn,{todos:O,groups:n,compact:l,controller:E,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("todo.attachmentTasks.noFile")))),o.createElement(So,{c:E}))};var Gl=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],Om=["title","due","priority","group","note"],fi=[10,20,30,40,50,100,200,500],mr=He.map(e=>e.id).reverse(),$l=Gl.map(e=>e.id),Eo={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function to(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let a=n.getBoundingClientRect().width;return n.remove(),Math.ceil(a)}var oo=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Mm(e){let[t,r]=o.useState({due:Eo.due,priority:Eo.priority,flagged:Eo.flagged,mins:{...Rn}}),n=f.getState().dateFormat,a=f.ui.language();return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let d=Te(new Date),c={today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},p=[c.today,c.tomorrow,c.yesterday,...Array.from({length:12},(S,_)=>Vt(`2030-${String(_+1).padStart(2,"0")}-28`,d,c,a,n))],l=Math.max(...p.map(S=>to(i,"todo-table-cell-btn is-overdue",`<span>${oo(S)}</span><span class="todo-table-time">23:59</span>`)),to(i,"todo-table-sort active",`<span>${oo(s("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...mr.map(S=>to(i,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${oo(_t(S))}</span>`)),to(i,"todo-table-sort active",`<span>${oo(s("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),g=to(i,"todo-table-sort active",`<span>${oo(s("todo.flagged"))}</span><svg width="12" height="12"></svg>`),h=S=>to(i,"todo-table-sort active",`<span>${oo(s(S))}</span><svg width="12" height="12"></svg>`)+16,m=Object.fromEntries(bi.map(S=>[S,Math.max(Rn[S],h(S==="title"?"todo.table.title":hi[S]))])),A={due:Math.max(l+10,96),priority:Math.max(u+10,72),flagged:Math.max(g+10,48),mins:m};r(S=>JSON.stringify(S)===JSON.stringify(A)?S:A)},[e,n,a]),t}var _m=360;function zm(e,t){let[r,n]=o.useState(Eo.tags),a=[...new Set(t.map(d=>(d.tags??[]).join(`
`)).filter(Boolean))],i=a.join("\0");return o.useLayoutEffect(()=>{let d=e.current;if(!d)return;let c=Math.max(0,...a.map(p=>to(d,"",p.split(`
`).map(l=>`<span class="todo-table-tag">#${oo(l)}</span>`).join(""))));n(Math.min(_m,Math.max(Eo.tags,c+12)))},[e,i]),r}var Fm=240,Gm=82,hi=Object.fromEntries(Gl.map(e=>[e.id,e.labelKey]));function $m(e){if(!Array.isArray(e))return Om;let t=[...new Set(e)].filter(r=>r==="title"||$l.includes(r));return t.includes("title")?t:["title",...t]}function Rm(e){return Array.isArray(e)?mr.filter(t=>e.includes(t)):[]}function jm(e){return fi.includes(e)?e:fi[0]}function $n(e,t){let[r,n]=o.useState(()=>t(f.settings.get()[e]));o.useEffect(()=>f.settings.subscribe(()=>n(t(f.settings.get()[e]))),[e,t]);let a=o.useCallback(i=>{n(i),f.settings.set(e,i)},[e]);return[r,a]}var Rl=()=>$n("pageColumns",$m),jl=e=>e==="title"?"todo.table.title":hi[e],jn=()=>$n("pagePriorityFilter",Rm),gi=({priority:e})=>o.createElement(e==="high"?za:e==="medium"?Ed:e==="low"?Fa:Pd,{className:`todo-table-priority-icon todo-priority-${e}`});function Km({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:a=>n(a.currentTarget)},r)}function Um(){let[e]=ut(),[t]=pt(),n=it().map(c=>c.id),a=Fn(e,n,t),i=e!=="all"&&a.length!==n.length,d=s("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${i?" active":""}`,"aria-label":d,title:d,onClick:c=>{f.ui.openPopover(()=>o.createElement(Pl,null),{anchor:c.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d})}},o.createElement(Qe,null))}function Vm(){let[e,t]=jn();return o.createElement("div",{className:"todo-status-filter-menu"},mr.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):mr.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(gi,{priority:r})),o.createElement("span",null,_t(r)))}))}function Kl(){let[e]=jn();return o.createElement(Km,{label:s("todo.table.priority"),active:e.length>0,icon:o.createElement(Yt,null),onOpen:t=>{f.ui.openPopover(()=>o.createElement(Vm,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:s("todo.table.priority"),width:168})}})}function Bm(){let[e,t]=Rl(),r=[...e,...$l.filter(p=>!e.includes(p))],[n,a]=o.useState(null),[i,d]=o.useState(null),c=(p,l,u)=>{if(p===l)return;let g=r.filter(h=>h!==p);g.splice(g.indexOf(l)+(u?1:0),0,p),t(g.filter(h=>e.includes(h)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{a(null),d(null)}},o.createElement("div",{className:"todo-table-menu-label"},s("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,l)=>{let u=e.includes(p),g=p==="title",h=s(jl(p));return o.createElement("div",{key:p,className:`todo-column-option${g?" is-locked":""}${n===p?" is-dragging":""}${i?.id===p?i.after?" drop-after":" drop-before":""}`,onDragOver:m=>{if(!n)return;m.preventDefault();let A=m.currentTarget.getBoundingClientRect();d({id:p,after:m.clientY>A.top+A.height/2})},onDrop:m=>{m.preventDefault(),n&&i&&c(n,i.id,i.after),a(null),d(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":s("todo.table.reorderColumn",{p0:h}),title:s("todo.table.reorderColumn",{p0:h}),onDragStart:m=>{m.dataTransfer.effectAllowed="move",m.dataTransfer.setData("text/plain",p);let A=m.currentTarget.parentElement;A&&m.dataTransfer.setDragImage(A,12,A.offsetHeight/2),a(p)},onKeyDown:m=>{if(!m.altKey||m.key!=="ArrowUp"&&m.key!=="ArrowDown")return;m.preventDefault();let A=r[l+(m.key==="ArrowUp"?-1:1)];A&&c(p,A,m.key==="ArrowDown")}},o.createElement(Yo,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:g,onClick:()=>t(r.filter(m=>m===p?!u:e.includes(m)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,h)))}))}function Ul(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":s("todo.table.toggleColumns"),title:s("todo.table.toggleColumns"),onClick:e=>{f.ui.openPopover(()=>o.createElement(Bm,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:s("todo.table.toggleColumns"),width:196})}},o.createElement(Ld,null))}function zl({field:e,label:t,className:r,sort:n,onSort:a,width:i,resize:d,thProps:c}){let p=n.field===e,l=p?n.dir==="asc"?za:Fa:_a;return o.createElement("th",{...c,className:r,style:i===void 0?void 0:{width:i},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>a(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(l,null)),d)}var bi=["title","note","group","location","tags"],Rn={title:180,note:120,group:104,location:104,tags:96},Vl=900;function Hm(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of bi){let a=t[n];typeof a=="number"&&Number.isFinite(a)&&(r[n]=Math.round(Math.min(Vl,Math.max(Rn[n],a))))}return r}function Wm({id:e,label:t,min:r,onDrag:n,onCommit:a,onReset:i}){let d=o.useRef(null),c=p=>Math.round(Math.min(Vl,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":s("todo.table.resizeColumn",{p0:t}),title:s("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),i(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let l=p.currentTarget.parentElement,u=l?l.getBoundingClientRect().width:Rn[e];d.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!d.current)return;let l=c(d.current.startWidth+p.clientX-d.current.startX);d.current.width=l,n(e,l)},onPointerUp:p=>{d.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),a(e,d.current.width),d.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),d.current=null}})}function qm({todo:e,onPatch:t}){let{DateField:r,TimeField:n}=f.ui.settings,[a,i]=o.useState(e.dueDate?.slice(0,10)??""),[d,c]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(r,{value:a,ariaLabel:s("todo.field.dueDate"),onChange:p=>{i(p),p||c(""),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(n,{value:d,disabled:!a,ariaLabel:s("todo.field.startTime"),onChange:p=>{c(p),t({startTime:p||void 0})}}))}function Ym({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":s("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&f.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Xm({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]),a=o.useRef(null),i=c=>{n(c),t({tags:c})},d=c=>{let p=c.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),l=[...r];for(let u of p)l.some(g=>g.toLowerCase()===u.toLowerCase())||l.push(u);return l.length===r.length?!1:(i(l),!0)};return o.useEffect(()=>{a.current?.focus()},[]),o.createElement("div",{className:"todo-cell-editor"},o.createElement("div",{className:"todo-tags-input",onMouseDown:c=>{c.target===c.currentTarget&&(c.preventDefault(),a.current?.focus())}},r.map(c=>o.createElement("span",{key:c,className:"todo-tags-chip"},o.createElement("span",null,"#",c),o.createElement("button",{type:"button",className:"todo-tags-chip-remove","aria-label":s("todo.compose.removeTag",{tag:c}),title:s("todo.compose.removeTag",{tag:c}),onClick:()=>{i(r.filter(p=>p!==c)),a.current?.focus()}},o.createElement(Se,null)))),o.createElement("input",{ref:a,className:"todo-tags-field",type:"text",placeholder:r.length?"":s("todo.compose.addTags"),"aria-label":s("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:c=>{let p=c.currentTarget;c.nativeEvent.isComposing||(c.key==="Enter"||c.key===","||c.key===" "&&p.value.trim()?(c.preventDefault(),d(p.value)&&(p.value="")):c.key==="Backspace"&&!p.value&&r.length&&(c.preventDefault(),i(r.slice(0,-1))))},onBlur:c=>{d(c.currentTarget.value)&&(c.currentTarget.value="")},onPaste:c=>{let p=c.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(c.preventDefault(),d(c.currentTarget.value+p),c.currentTarget.value="")}})))}function Zm({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(vo,{value:r,onChange:a=>{n(a),t({location:a})}}))}var Fl='input, button, a, textarea, [contenteditable="true"]';function yi(e){for(let t of e.split(`
`)){if(t.trim().startsWith("```"))continue;let r=t.trim().replace(/^(?:>\s*)+/,"").replace(/^#{1,6}\s+/,"").replace(/^(?:[-*+]|\d+[.)])\s+(?:\[.\]\s+)?/,"").replace(/!?\[\[([^\]|#]+)[^\]|]*(?:\|([^\]]+))?\]\]/g,(n,a,i)=>i??a.split("/").pop()??a).replace(/!?\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/(?<!\w)(\*\*|__|\*|_|~~|`)(?=\S)(.+?)(?<=\S)\1(?!\w)/g,"$2").replace(/^\||\|$/g,"").replace(/\s*\|\s*/g," \xB7 ").trim();if(/[\p{L}\p{N}]/u.test(r))return r}return""}function Jm({todo:e,groups:t,columns:r,c:n,selected:a,onPick:i}){let d=o.useRef(null);o.useEffect(()=>d.current?Ar(e.id,d.current):void 0,[e.id]);let[c,p]=o.useState("");o.useEffect(()=>{let y=!0;return p(""),Ln(e.title).then(T=>{y&&p(T)}).catch(()=>{y&&p("")}),()=>{y=!1}},[e.title]);let l=yi(e.note),{check:u}=ui(e,n),g=Ne(e),h=n.pendingIds.has(e.id),m=y=>n.patchTodo(e.id,y),A=Te(new Date),S=f.getState().dateFormat,_=e.dueDate?Vt(e.dueDate,A,{today:s("todo.due.today"),tomorrow:s("todo.due.tomorrow"),yesterday:s("todo.due.yesterday")},f.ui.language(),S):"",N=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<A,[E,x]=o.useState(!1),v=o.useRef(null);o.useEffect(()=>()=>{v.current&&clearTimeout(v.current)},[]);let[O,K]=o.useState(e.title),W=()=>{let y=O.trim();x(!1),y&&y!==e.title&&m({title:y})},[R,j]=o.useState(null),ee=(y,T)=>{j(y),T.catch(()=>{}).finally(()=>j(I=>I===y?null:I))},de=(y,T,I,C,re=260)=>{ee(y,f.ui.openPopover(C,{anchor:T,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:I,width:re}))},ae=(y,T,I)=>R===y?o.createElement("span",{className:"todo-table-placeholder"},T,o.createElement("span",null,I)):null,le=y=>`todo-table-${y}${R===y?" is-editing":""}`,w=y=>{let T=e.note,I=()=>{T!==e.note&&m({note:T})};j("note"),f.ui.openPopover(({close:C})=>o.createElement(Ym,{initial:e.note,onInput:re=>{T=re},onDone:()=>{I(),C()}}),{anchor:y,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:s("todo.edit.notes"),width:360,beforeDismiss:()=>(I(),!0)}).catch(()=>{}).finally(()=>j(C=>C==="note"?null:C))},L=y=>{switch(y){case"note":return o.createElement("td",{className:le("note"),title:l||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":s("todo.table.editCell",{p0:s("todo.table.note")}),onClick:T=>w(T.currentTarget)},l?o.createElement("span",{className:"todo-table-note-text"},l):ae("note",null,s("todo.table.note"))));case"group":return o.createElement("td",{className:le("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":s("todo.table.editCell",{p0:s("todo.table.group")}),onClick:T=>ee("group",f.ui.openMenu([{label:s("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>m({group:void 0})},...ve(t).map(I=>({label:I,type:"radio",checked:e.group===I,color:ze(I,t),onSelect:()=>m({group:I})}))],{anchor:T.currentTarget,align:"start"}))},e.group?o.createElement("span",{className:"todo-table-group-pill",title:e.group,style:{"--todo-group-color":Ee(ze(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},e.group)):ae("group",null,s("todo.table.group"))));case"priority":return o.createElement("td",{className:le("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:h,title:s("todo.table.priority"),onClick:T=>ee("priority",f.ui.openMenu(mr.map(I=>({label:_t(I),icon:o.createElement(gi,{priority:I}),type:"radio",checked:e.priority===I,onSelect:()=>m({priority:I})})),{anchor:T.currentTarget}))},o.createElement(gi,{priority:e.priority}),o.createElement("span",null,_t(e.priority))));case"due":return o.createElement("td",{className:le("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${N?" is-overdue":""}`,disabled:h,"aria-label":s("todo.table.editCell",{p0:s("todo.table.due")}),title:e.dueDate?je(e.dueDate,S):s("todo.field.dueDate"),onClick:T=>de("due",T.currentTarget,s("todo.field.dueDate"),()=>o.createElement(qm,{todo:e,onPatch:I=>{m(I)}}),240)},o.createElement("span",null,_),e.startTime&&o.createElement("span",{className:"todo-table-time"},e.startTime)));case"flagged":return o.createElement("td",{className:le("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${e.flagged?" on":""}`,"aria-pressed":!!e.flagged,disabled:h,"aria-label":s("todo.flag"),title:s(e.flagged?"todo.flagged":"todo.flag"),onClick:()=>m({flagged:!e.flagged})},o.createElement(Me,null)));case"location":return o.createElement("td",{className:le("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:h,"aria-label":s("todo.table.editCell",{p0:s("todo.table.location")}),title:e.location?.name??s("todo.field.location"),onClick:T=>de("location",T.currentTarget,s("todo.field.location"),()=>o.createElement(Zm,{todo:e,onPatch:I=>{m(I)}}),300)},e.location?o.createElement(o.Fragment,null,o.createElement(et,null),o.createElement("span",null,e.location.name)):ae("location",o.createElement(et,null),s("todo.field.location"))));case"tags":return o.createElement("td",{className:le("tags"),title:e.tags?.map(T=>`#${T}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:h,"aria-label":s("todo.table.editCell",{p0:s("todo.table.tags")}),onClick:T=>de("tags",T.currentTarget,s("todo.edit.tags"),()=>o.createElement(Xm,{todo:e,onPatch:I=>{m(I)}}),280)},e.tags?.length?e.tags.map(T=>o.createElement("span",{key:T,className:"todo-table-tag"},"#",T)):ae("tags",null,s("todo.table.tags"))))}};return o.createElement("tr",{ref:d,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}${R?" is-editing":""}`,"data-todo-id":e.id,"data-status":g,"aria-selected":a,tabIndex:0,onContextMenu:y=>On(y,{todo:e,groupNames:ve(t),setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>st(e,n.removeTodo),disabled:h}),onKeyDown:y=>{if(y.target===y.currentTarget)if(y.key==="ArrowDown"||y.key==="ArrowUp"){y.preventDefault();let T=y.key==="ArrowDown"?y.currentTarget.nextElementSibling:y.currentTarget.previousElementSibling;for(;T&&!T.classList.contains("todo-table-row");)T=y.key==="ArrowDown"?T.nextElementSibling:T.previousElementSibling;T?.focus()}else y.key==="Enter"?(y.preventDefault(),n.openDetail(e.id)):y.key===" "?(y.preventDefault(),i(!1)):y.key==="Escape"&&y.currentTarget.blur()},onClick:y=>{y.target.closest(Fl)||(f.ui.hasModKey(y)||y.shiftKey)&&i(y.shiftKey)},onDoubleClick:y=>{let T=!!y.target.closest(".todo-table-title-btn");T&&v.current&&(clearTimeout(v.current),v.current=null),!(!T&&y.target.closest(Fl)||f.ui.hasModKey(y)||y.shiftKey)&&n.openDetail(e.id)}},o.createElement("td",{className:"todo-table-select"},u),r.map(y=>o.createElement(o.Fragment,{key:y},y==="title"?o.createElement("td",{className:"todo-table-title"},E?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:O,autoFocus:!0,"aria-label":s("todo.table.title"),onChange:T=>K(T.target.value),onBlur:W,onKeyDown:T=>{T.nativeEvent.isComposing||(T.key==="Enter"?(T.preventDefault(),W()):T.key==="Escape"&&(T.preventDefault(),K(e.title),x(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:h,"aria-label":s("todo.table.editTitle",{p0:e.title}),onClick:T=>{if(f.ui.hasModKey(T)||T.shiftKey){i(T.shiftKey);return}T.detail>1||(v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{v.current=null,K(e.title),x(!0)},220))}},c?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:c}}):o.createElement("span",{className:"todo-table-title-text"},e.title))):L(y))),o.createElement("td",{className:"todo-table-actions"},e.flagged&&!r.includes("flagged")&&o.createElement("span",{className:"todo-table-flag",title:s("todo.flagged")},o.createElement(Me,null)),o.createElement(Mn,{todo:e,groupNames:ve(t),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:m,onRequestDelete:()=>st(e,n.removeTodo),disabled:h})))}function Qm(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Bl({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:d,sectionOf:c,composeSignal:p=0,newTaskPatch:l}){let[u,g]=Rl(),h=u.filter(z=>z!=="title"),[m,A]=o.useState(null),[S,_]=o.useState(null),N=z=>({className:`${m===z?" is-dragging":""}${S?.id===z?S.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:U=>{if(U.target.closest(".todo-col-resize")){U.preventDefault();return}U.dataTransfer.effectAllowed="move",U.dataTransfer.setData("text/plain",z);let te=U.currentTarget.ownerDocument,ue=te.createElement("div");ue.className="todo-col-drag-chip",ue.textContent=s(jl(z)),te.body.appendChild(ue),U.dataTransfer.setDragImage?.(ue,Math.round(ue.offsetWidth/2),Math.round(ue.offsetHeight/2)),window.setTimeout(()=>ue.remove(),0),A(z)},onDragOver:U=>{if(!m||m===z)return;U.preventDefault(),U.dataTransfer.dropEffect="move";let te=U.currentTarget.getBoundingClientRect();_({id:z,after:U.clientX>te.left+te.width/2})},onDrop:U=>{if(U.preventDefault(),m&&S&&m!==S.id){let te=u.filter(ue=>ue!==m);te.splice(te.indexOf(S.id)+(S.after?1:0),0,m),g(te)}A(null),_(null)},onDragEnd:()=>{A(null),_(null)}}}),E=o.useRef(null),x=Mm(E),[v,O]=$n("pageColumnWidths",Hm),[K,W]=o.useState({}),R=zm(E,e),j=Object.fromEntries(Object.entries({tags:R,...v,...K}).map(([z,U])=>[z,Math.max(U,x.mins[z])])),ee=z=>z==="due"?x.due:z==="priority"?x.priority:z==="flagged"?x.flagged:j[z]??Eo[z],[de,ae]=$n("pageRowsPerPage",jm),[le,w]=o.useState(!1),[L,y]=o.useState(""),T=o.useRef(null),I=o.useRef(null);o.useEffect(()=>{p&&(w(!0),b(0),I.current?.scrollTo?.({top:0}),window.setTimeout(()=>T.current?.focus(),0))},[p]);let C=async z=>{let U=Te(new Date);for(let te of z){let ue=Yr(te,U);ue.title&&await r.create(ue.title,void 0,{patch:{...l?.(),priority:ue.priority,...ue.dueDate?{dueDate:ue.dueDate}:{}}})}y(""),T.current?.focus()},re=()=>{y(""),w(!1)},[ie,b]=o.useState(0),[$,Z]=o.useState(i);$!==i&&(Z(i),b(0));let[k,P]=o.useState(()=>new Set),G=o.useRef(null),M=Math.max(1,Math.ceil(e.length/de)),q=Math.min(ie,M-1),Q=e.slice(q*de,(q+1)*de),ce=o.useMemo(()=>e.filter(z=>k.has(z.id)),[e,k]),V=o.useMemo(()=>e.reduce((z,U)=>z+(U.completed?1:0),0),[e]),F=Oe(),se=o.useSyncExternalStore(F.subscribe,F.get,F.get),be=o.useCallback(z=>{let U=e.findIndex(te=>te.id===z);U>=0&&b(Math.floor(U/de))},[e,de]);o.useLayoutEffect(()=>{se?.todoId&&be(se.todoId)},[se,be]),o.useLayoutEffect(()=>{r.editingId&&be(r.editingId)},[r.editingId]);let _e=(z,U)=>{P(te=>{let ue=new Set(te);for(let We of z)U?ue.add(We):ue.delete(We);return ue})},nt=(z,U)=>{let te=Q.findIndex(We=>We.id===z),ue=U?Q.findIndex(We=>We.id===G.current):-1;ue>=0?_e(Q.slice(Math.min(ue,te),Math.max(ue,te)+1).map(We=>We.id),!0):_e([z],!k.has(z)),G.current=z},Do=()=>{for(let z of ce)r.patchTodo(z.id,ke("completed"));P(new Set)},fr=async()=>{let z=ce.map(te=>te.id);await f.ui.confirm({title:s("todo.table.deleteTitle",{count:z.length}),message:s("todo.table.deleteMessage",{count:z.length}),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(z.map(te=>r.removeTodo(te))),P(new Set))},ro=(z,U)=>o.createElement(Wm,{id:z,label:U,min:x.mins[z],onDrag:(te,ue)=>W(We=>({...We,[te]:ue})),onCommit:(te,ue)=>{W({}),O({...v,[te]:ue})},onReset:te=>{W({});let ue={...v};delete ue[te],O(ue)}}),Ct=z=>{let U=s(hi[z]),te=bi.includes(z);return o.createElement(zl,{field:z==="note"?"notes":z,label:U,className:`todo-table-${z}${N(z).className}`,thProps:N(z).props,sort:n,onSort:a,width:te?j[z]:void 0,resize:te?ro(z,U):void 0})},Un=3+h.length,no=o.useMemo(()=>{if(!c)return null;let z=new Map;for(let U of e){let te=c(U);z.set(te,(z.get(te)??0)+1)}return z},[e,c]),ao=[],gr=null;for(let z of Q){let U=c?.(z)??null;U&&U!==gr&&ao.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${U}`,key:`section:${U}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},s(Zs[U])),o.createElement("span",{className:"todo-table-section-count"},no?.get(U)??0))),u.map(te=>o.createElement("td",{key:te,className:`todo-table-${te}`})),o.createElement("td",{className:"todo-table-actions"}))),gr=U,ao.push(o.createElement(Jm,{key:z.id,todo:z,groups:t,columns:u,c:r,selected:k.has(z.id),onPick:te=>nt(z.id,te)}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:I},o.createElement("table",{ref:E,className:"todo-table","data-dragging-col":m??void 0,style:{minWidth:Gm+(j.title??Fm)+h.reduce((z,U)=>z+ee(U),0),"--todo-due-width":`${x.due}px`,"--todo-priority-width":`${x.priority}px`,"--todo-flagged-width":`${x.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(Um,null)),u.map(z=>o.createElement(o.Fragment,{key:z},z==="title"?o.createElement(zl,{field:"name",label:s("todo.table.title"),className:`todo-table-title${N("title").className}`,thProps:N("title").props,sort:n,onSort:a,width:j.title,resize:ro("title",s("todo.table.title"))}):Ct(z))),o.createElement("th",{className:"todo-table-actions",style:j.title?{width:"auto",minWidth:48}:void 0}))),o.createElement("tbody",null,le&&o.createElement("tr",{className:"todo-table-new-row"},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"})),u.map(z=>z==="title"?o.createElement("td",{key:z,className:"todo-table-title"},o.createElement("input",{ref:T,className:"todo-table-new-input",value:L,disabled:r.creating,placeholder:s("todo.table.newRow"),"aria-label":s("auto.184c39d1837f"),onChange:U=>y(U.target.value),onKeyDown:U=>{U.nativeEvent.isComposing||(U.key==="Enter"?(U.preventDefault(),L.trim()?C([L]):re()):U.key==="Escape"&&(U.preventDefault(),re()))},onPaste:U=>{let te=U.clipboardData.getData("text/plain");/\r?\n/.test(te.trim())&&(U.preventDefault(),C(Qm(`${L}${te}`)))},onBlur:()=>{L.trim()||w(!1)}})):o.createElement("td",{key:z,className:`todo-table-${z}`})),o.createElement("td",{className:"todo-table-actions"})),ao)),!Q.length&&!le&&o.createElement("div",{className:"todo-table-empty-state"},d)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,ce.length?s("todo.table.selectedCount",{count:ce.length}):s(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!ce.length&&o.createElement("span",{className:"todo-table-done-count"},s("todo.table.completedCount",{count:V})),ce.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:Do},s("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{fr()}},s("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},s("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":s("todo.table.rowsPerPage"),onClick:z=>{f.ui.openMenu(fi.map(U=>({label:String(U),type:"radio",checked:U===de,onSelect:()=>{ae(U),b(0)}})),{anchor:z.currentTarget,align:"start"})}},o.createElement("span",null,de),o.createElement(_a,null)),M>1&&o.createElement("span",{className:"todo-table-page"},s("todo.table.page",{page:q+1,pages:M})),M>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:q===0,"aria-label":s("todo.table.firstPage"),title:s("todo.table.firstPage"),onClick:()=>b(0)},o.createElement(Id,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:q===0,"aria-label":s("todo.table.previousPage"),title:s("todo.table.previousPage"),onClick:()=>b(q-1)},o.createElement(Dd,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:q>=M-1,"aria-label":s("todo.table.nextPage"),title:s("todo.table.nextPage"),onClick:()=>b(q+1)},o.createElement(Cd,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:q>=M-1,"aria-label":s("todo.table.lastPage"),title:s("todo.table.lastPage"),onClick:()=>b(M-1)},o.createElement(Nd,null))))))}var ef={group:e=>e.group??void 0,notes:e=>yi(e.note)||void 0,status:e=>Ft().indexOf(Ne(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},Hl=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=rt("dateFormat","activePluginTab"),{selectedDate:a,selectedDateRange:i}=Cn(),d=Be(),c=En(),p=o.useMemo(()=>Qt(t),[t]),l=p??c,u=n?.pluginId===f.pluginId&&n.instanceId===t,g=xn();o.useEffect(()=>{if(!p)return e.setController({canGoBack:g.canGoBack,canGoForward:g.canGoForward,goBack:()=>ko(-1),goForward:()=>ko(1)}),()=>e.setController(null)},[e,p,g.canGoBack,g.canGoForward]);let[h,m]=Tn(),[A,S]=o.useState(()=>!!h.trim()),_=o.useRef(null),N=()=>{S(!0),window.setTimeout(()=>_.current?.focus(),0)},E=()=>{m(""),S(!1)},[x,v]=qd(),{field:O,dir:K}=x,[W]=pt(),[R,j]=ut(),[ee,de]=jn(),ae=To("due","asc");co(ae.openDetail),o.useEffect(()=>{if(!(ae.loading||p))if(l.kind==="groups"){let V=new Set(ve(d));!l.includeUngrouped&&!l.names.some(F=>V.has(F))&&Ue(Le)}else l.kind==="tag"&&(ae.todos.some(V=>V.tags?.includes(l.name))||Ue(Le))},[ae.loading,ae.todos,d,l,p]);let le=ot(),w=kn(),L=l.kind==="smart"?ct(l.id,w):null,y=Ja(l),T=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?Ee(ze(l.names[0],d)):"var(--accent-color)":l.kind==="tag"?"var(--accent-color)":l.kind==="nogroup"?"var(--text-color)":Ee(L.color)||"var(--text-color)",I=o.useMemo(()=>{let V=ae.todos.filter(F=>cn(F,l,W,le));if(R!=="all"&&(V=V.filter(F=>mo(F,R))),ee.length&&(V=V.filter(F=>ee.includes(F.priority))),h.trim()){let F=jt(h);V=V.filter(se=>F(se.tags??[],se.title,se.note,se.group??""))}return i?V=V.filter(F=>{let se=F.dueDate?.slice(0,10);return!!se&&se>=i.start&&se<=i.end}):a&&(V=V.filter(F=>F.dueDate?.slice(0,10)===a)),V},[ae.todos,l,W,R,ee,h,a,i,le]),{ordered:C,sectionOf:re}=o.useMemo(()=>{let V=ef[O];if(V)return{ordered:qs(I,V,K),sectionOf:void 0};if(O!=="auto")return{ordered:yo(I,O,K),sectionOf:void 0};if(l.kind==="smart"&&l.id==="completed")return{ordered:Js(I).flatMap(be=>be.todos),sectionOf:void 0};let F=qr(I,le),se=new Map;for(let be of Wo)for(let _e of F[be])se.set(_e.id,be);return{ordered:Wo.flatMap(be=>F[be]),sectionOf:be=>se.get(be.id)??"someday"}},[I,O,K,l,le]),ie=!!h.trim()||ee.length>0||R!=="all",b=()=>{m(""),de([]),j("all")},$=[Ze(l),h,JSON.stringify(R),ee.join(),W,O,K,a??"",i?.start??"",i?.end??""].join("|"),Z=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[k,P]=o.useState(0),G=()=>P(V=>V+1),M=()=>{let V={};return l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped&&(V.group=l.names[0]),l.kind==="smart"&&(l.id==="today"||l.id==="week")&&(V.dueDate=le),l.kind==="smart"&&l.id==="flagged"&&(V.flagged=!0),V},q=ve(d),Q=[{label:s("todo.fab.newTodo"),icon:o.createElement(Tt,null),onSelect:G},...q.length?[{label:s("todo.fab.newTodoIn"),icon:o.createElement(on,null),submenu:q.map(V=>({label:V,onSelect:F=>{let se={kind:"groups",names:[V]};F?.newTab||p?(Qa(se,F?.newTab===!0),Zi()):(Ue(se),G())}}))}]:[],{type:"separator"},{label:s("todo.group.manage"),icon:o.createElement(rn,null),onSelect:()=>{Dt()}},{type:"separator"},{label:s("auto.fb3a16f382f8"),icon:o.createElement(Xt,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Sn(l)))}},{label:s("auto.c7f73bb54d92"),icon:o.createElement(xd,null),onSelect:()=>f.workspace.openOwnSettings()}],ce=t??"";return o.useEffect(()=>{(u||n?.pluginId!==f.pluginId)&&ti(Q,ce)}),o.useEffect(()=>()=>ti(null,ce),[ce]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${A?" is-searching":""}`},A?o.createElement("div",{className:"todo-page-search"},o.createElement(Wt,{className:"todo-page-search-icon"}),o.createElement("input",{ref:_,className:"todo-page-search-input",value:h,onChange:V=>m(V.target.value),onKeyDown:V=>{V.key==="Escape"&&(V.preventDefault(),E())},onBlur:()=>{h.trim()||S(!1)},placeholder:s("todo.table.filterPlaceholder"),"aria-label":s("auto.e0345e9d3092")})):o.createElement("h1",{className:"todo-page-appbar-title",style:{color:T}},y),(i||a)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:s("auto.f93fb4b1ab19"),onClick:Z},o.createElement("span",null,i?`${je(i.start,r)} \u2013 ${je(i.end,r)}`:je(a,r)),o.createElement(Se,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!A&&h.trim()?" active":""}`,"aria-label":A?s("auto.67300d0fed7c"):s("auto.e0345e9d3092"),title:A?s("auto.67300d0fed7c"):s("auto.e0345e9d3092"),onMouseDown:V=>{A&&V.preventDefault()},onClick:A?E:N},A?o.createElement(Se,null):o.createElement(Wt,null)),o.createElement(Kl,null),ie&&o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":s("todo.table.reset"),title:s("todo.table.reset"),onClick:b},o.createElement(Md,null)),o.createElement(Ul,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":s("todo.fab.newTodo"),title:s("todo.fab.newTodo"),onClick:G},o.createElement(Tt,null)))),ae.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,s("auto.b5868978587a"))):o.createElement(Bl,{todos:C,groups:d,c:ae,sort:x,onSort:v,resetKey:$,empty:s("todo.table.empty"),sectionOf:re,composeSignal:k,newTaskPatch:M}),o.createElement(So,{c:ae}))};function tf(e){let t=of(e);return t?{"--todo-segmented-width":`${t}px`}:void 0}function of(e){let t=getComputedStyle(document.documentElement),r=t.getPropertyValue("--interface-font").trim()||getComputedStyle(document.body).fontFamily,n=document.createElement("canvas").getContext("2d");if(!n)return 0;let a=(parseFloat(t.fontSize)||16)*.75,i=Math.max(...[r,"system-ui, -apple-system, sans-serif"].map(d=>(n.font=`${a}px ${d}`,e.reduce((c,p)=>c+n.measureText(p).width,0))));return Math.ceil(i+e.length*20+(e.length-1)+2)+4}var rf={scheduled:()=>o.createElement(Jo,null),today:()=>o.createElement(Qo,null),week:()=>o.createElement(dn,null),flagged:()=>o.createElement(Me,null),all:()=>o.createElement(an,null),completed:()=>o.createElement(Qe,null)};function Wl(e){let[t,r]=o.useState(e);return o.useEffect(()=>f.settings.subscribe(()=>r(e())),[e]),[t,r]}function nf(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:a}=f.ui.settings,[i,d]=Wl(fn),c=[{value:"auto",label:s("todo.settings.textAuto")},{value:"white",label:s("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:s("todo.settings.textBlack"),color:"#000000"}],p=m=>{d(m),Vd(m)},l=i.order.filter(m=>!i.hidden.includes(m)).length,u=i.order.map(m=>ct(m,i)),g=a({items:u,indicatorOnly:!0,getId:m=>m.id,getLabel:m=>s(m.labelKey),onReorder:m=>p({...i,order:m.map(A=>A.id)})}),h=(m,A)=>{if(A){p({...i,hidden:i.hidden.filter(N=>N!==m)});return}if(l<=1)return;let S={...i,hidden:[...i.hidden,m]};p(S);let _=Zt();_.kind==="smart"&&_.id===m&&Ue({kind:"smart",id:S.order.find(N=>!S.hidden.includes(N))})};return o.createElement(t,{title:s("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},s("todo.settings.colList")),o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.colText")),o.createElement("span",null,s("todo.settings.colShow"))),u.map((m,A)=>{let S=i.hidden.includes(m.id),_=`${m.id}@${A}`,N=g.getHandleProps(m),E=s(m.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(S?" is-off":"")+(g.overId===m.id?" drop-"+(g.dropPosition??"before"):""),key:m.id,...g.getItemProps(m)},o.createElement("button",{...N,className:(N.className??"")+" todo-settings-handle",title:s("todo.settings.smartListReorder")},o.createElement(Yo,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:Ee(m.color),color:rr(m,ht)},"aria-hidden":"true"},rf[m.id]()),o.createElement("span",{className:"todo-settings-name"},E),o.createElement(e,{key:`color:${_}`,value:m.color,onChange:x=>p({...i,colors:{...i.colors,[m.id]:x}}),ariaLabel:s("todo.settings.smartListColor",{p0:E}),allowCustom:!1}),o.createElement(r,{key:`text:${_}`,className:"todo-settings-text-select",value:m.textColor??"auto",options:c,ariaLabel:s("todo.settings.statusText",{p0:E}),onChange:x=>{let v={...i.textColors};x==="auto"?delete v[m.id]:v[m.id]=x,p({...i,textColors:v})}}),o.createElement(n,{key:`show:${_}`,checked:!S,disabled:!S&&l<=1,label:s("todo.settings.smartListShow",{p0:E}),onChange:x=>h(m.id,x)}))})),g.liveRegion)}function Kn({initial:e,onCommit:t,onType:r,placeholder:n,ariaLabel:a,disabled:i}){let d=o.useRef(!1);return o.createElement("input",{className:"settings-control todo-settings-text",type:"text",defaultValue:e,placeholder:n,"aria-label":a,disabled:i,autoComplete:"off",spellCheck:!1,onChange:c=>r?.(c.currentTarget.value),onBlur:c=>{if(d.current){d.current=!1;return}t(c.currentTarget.value)},onKeyDown:c=>{c.key==="Enter"?(c.preventDefault(),c.currentTarget.blur()):c.key==="Escape"&&(c.preventDefault(),c.currentTarget.value=e,d.current=!0,c.currentTarget.blur())}})}function af(){let{Button:e,ColorField:t,IconButton:r,Row:n,Section:a,Segmented:i,SelectField:d,Toggle:c,useReorderDrag:p}=f.ui.settings,[l,u]=Wl(Ve),g=o.useRef(""),[h,m]=o.useState(0),[A,S]=o.useState(!1),_=w=>{let L=Or(w);u(L),bs(L)},N=l.active.map(w=>Ie(w,l)),E=p({items:N,indicatorOnly:!0,getId:w=>w.id,getLabel:w=>w.label,onReorder:w=>_({...l,active:w.map(L=>L.id)})}),x=(w,L)=>{L!==l.active.includes(w)&&_({...l,active:L?[...l.active,w]:l.active.filter(y=>y!==w)})},v=w=>w.replace(/[\u0000-\u001f]/g," ").trim().slice(0,ua),O=()=>{let w=v(g.current);if(!w||l.custom.length>=Lr)return;let L=hs();_({...l,custom:[...l.custom,{id:L,label:w,done:!1}],active:[...l.active,L]}),g.current="",S(!1),m(y=>y+1)},K=(w,L)=>{let y=v(L);y&&_({...l,custom:l.custom.map(T=>T.id===w?{...T,label:y}:T)})},W=async(w,L)=>{_({...l,custom:l.custom.map(T=>T.id===w?{...T,done:L}:T)});let y=(await Ye()).filter(T=>T.status===w);await Promise.all(y.map(T=>Aa(T.id,w)))},R=async w=>{let L=Ie(w,l).label,y=(await Ye()).filter(C=>C.status===w);if(await f.ui.confirm({title:s("todo.settings.statusDeleteTitle",{p0:L}),message:y.length?s("todo.settings.statusDeleteMoves",{count:y.length,p0:s("todo.status.todo")}):s("todo.settings.statusDeleteUnused"),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(y.map(C=>Aa(C.id,"open")));let I=Ve();_({...I,custom:I.custom.filter(C=>C.id!==w),active:I.active.filter(C=>C!==w)})},j=[{value:"auto",label:s("todo.settings.textAuto")},{value:"white",label:s("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:s("todo.settings.textBlack"),color:"#000000"}],ee=(w,L,y)=>{let T=w.id,I=`${T}@${y}`,C=w.label,re=L==="shown"?E.getHandleProps(w):null,ie=zt(T)?T:null;return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(L==="locked"?" locked":"")+(L==="off"?" is-off":"")+(L==="shown"&&E.overId===T?" drop-"+(E.dropPosition??"before"):""),key:T,...L==="shown"?E.getItemProps(w):{}},re?o.createElement("button",{...re,className:(re.className??"")+" todo-settings-handle",title:s("todo.settings.statusReorder")},o.createElement(Yo,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:L==="locked"?s("todo.settings.statusLocked"):void 0},L==="locked"&&o.createElement(ud,null)),o.createElement("span",{className:"todo-settings-glyph"},o.createElement($e,{status:T==="open"?null:T,dotCls:w.cls})),ie?o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(Kn,{key:`name:${I}:${C}`,initial:C,ariaLabel:s("todo.settings.statusName"),onCommit:b=>K(ie,b)})):o.createElement("span",{className:"todo-settings-name"},C),o.createElement("span",{className:"todo-settings-preview"},o.createElement(ci,{status:T,style:l.style})),o.createElement(r,{key:`strike:${I}`,className:"todo-settings-strike",pressed:l.strikethrough[T],"aria-pressed":l.strikethrough[T],ariaLabel:s("todo.settings.statusStrike",{p0:C}),title:s("todo.settings.statusStrike",{p0:C}),onClick:()=>_({...l,strikethrough:{...l.strikethrough,[T]:!l.strikethrough[T]}})},o.createElement(Ga,null)),o.createElement(t,{key:`color:${I}`,value:l.colors[T],onChange:b=>_({...l,colors:{...l.colors,[T]:b}}),ariaLabel:s("todo.settings.statusColor",{p0:C}),allowCustom:!1}),o.createElement(d,{key:`text:${I}`,className:"todo-settings-text-select",value:l.textColors[T],options:j,disabled:l.style!=="filled",ariaLabel:s("todo.settings.statusText",{p0:C}),onChange:b=>_({...l,textColors:{...l.textColors,[T]:b}})}),o.createElement(c,{key:`show:${I}`,checked:L!=="off",disabled:L==="locked",label:s(ie?"todo.settings.statusShowCustom":"todo.settings.statusShow",{p0:C}),onChange:b=>x(T,b)}),o.createElement("span",{className:"todo-settings-row-actions"},ie&&o.createElement(o.Fragment,null,o.createElement(r,{key:`done:${I}`,className:"todo-settings-strike",pressed:w.done,"aria-pressed":w.done,ariaLabel:s("todo.settings.statusDone",{p0:C}),title:s("todo.settings.statusDone",{p0:C}),onClick:()=>{W(ie,!w.done)}},o.createElement(Qe,null)),o.createElement(r,{key:`delete:${I}`,ariaLabel:s("todo.settings.statusDelete",{p0:C}),title:s("todo.settings.statusDelete",{p0:C}),onClick:()=>{R(ie)}},o.createElement(qt,null)))))},de=[...Pr.filter(w=>!l.active.includes(w)),...l.custom.map(w=>w.id).filter(w=>!l.active.includes(w))].map(w=>Ie(w,l)),ae=[{value:"filled",label:s("todo.settings.styleFilled")},{value:"text",label:s("todo.settings.styleText")}],le=l.custom.length>=Lr;return o.createElement(o.Fragment,null,o.createElement(a,{title:s("todo.settings.statusAppearance")},o.createElement(n,{title:s("todo.settings.statusStyle"),description:s("todo.settings.statusStyleDesc")},o.createElement("div",{className:"todo-settings-end",style:tf(ae.map(w=>w.label))},o.createElement(i,{value:l.style,ariaLabel:s("todo.settings.statusStyle"),options:ae,onChange:w=>_({...l,style:w})})))),o.createElement(a,{title:s("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.statusesDescCustom")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},s("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-preview"},s("todo.settings.colPreview")),o.createElement("span",{className:"todo-settings-head-glyph",title:s("todo.settings.colStrike")},o.createElement(Ga,null)),o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.colText")),o.createElement("span",null,s("todo.settings.colShow")),o.createElement("span",null)),ee(Ie("open",l),"locked",0),ee(Ie("completed",l),"locked",1),N.map((w,L)=>ee(w,"shown",2+L)),de.map((w,L)=>ee(w,"off",2+N.length+L))),E.liveRegion,o.createElement("div",{className:"todo-status-add"},o.createElement(Kn,{key:`add:${h}`,initial:"",placeholder:s("todo.settings.statusNewPlaceholder"),ariaLabel:s("todo.settings.statusNew"),disabled:le,onType:w=>{g.current=w,!!v(w)!==A&&S(!A)},onCommit:w=>{g.current=w}}),o.createElement(e,{type:"button",disabled:le||!A,onClick:O},s("todo.settings.statusAdd")))))}function sf(){let{Row:e,Section:t,SelectField:r}=f.ui.settings,[n,a]=o.useState(mn);return o.createElement(o.Fragment,null,o.createElement(t,{title:s("todo.settings.display")},o.createElement(e,{title:s("todo.settings.dateBreakdown"),description:s("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:i=>{let d=i;a(d),f.settings.set(Va,d)},ariaLabel:s("todo.settings.dateBreakdown"),options:[{value:"monthly",label:s("todo.breakdown.monthly")},{value:"weekly",label:s("todo.breakdown.weekly")},{value:"daily",label:s("todo.breakdown.daily")}]}))),o.createElement(cl,null))}function df(){let{Button:e,ColorField:t,IconButton:r,Section:n,SelectField:a}=f.ui.settings,i=Us(),d=Be(),c=d.filter(x=>!i.some(v=>v.id===x.id)),p=o.useRef(""),[l,u]=o.useState(0),[g,h]=o.useState(""),m=(x,v)=>d.some(O=>O.id!==v&&[O.name,...O.aliases??[]].some(K=>Y(K)===Y(x))),A=x=>{Ks(x)},S=()=>{let x=p.current.trim().slice(0,Uo);!x||m(x)||i.length>=Ur||(A([...i,{id:Gs(),name:x,color:la(d)}]),p.current="",h(""),u(v=>v+1))},_=(x,v)=>{!v.trim()||v.trim()===x.name||m(v,x.id)||A(i.map(O=>O.id===x.id?$s(O,v):O))},N=async x=>{let v=new Set([x.name,...x.aliases??[]].map(Y)),O=(await Ye()).filter(W=>W.group&&v.has(Y(W.group)));await f.ui.confirm({title:s("todo.settings.localGroupDeleteTitle",{p0:x.name}),message:O.length?s("todo.settings.localGroupDeleteMoves",{count:O.length}):s("todo.settings.localGroupDeleteUnused"),actions:[{label:s("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:s("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(O.map(W=>_s(W.id,void 0))),A(Kt().filter(W=>W.id!==x.id)))},E=[{value:"",label:s("todo.settings.localGroupNoParent")},...c.map(x=>({value:x.id,label:x.name,color:x.color}))];return o.createElement(n,{title:s("todo.settings.localGroups")},o.createElement("p",{className:"todo-settings-desc"},s("todo.settings.localGroupsDesc")),i.length>0&&o.createElement("div",{className:"todo-settings-list todo-local-groups",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null,s("todo.settings.colColor")),o.createElement("span",null,s("todo.settings.localGroupName")),o.createElement("span",null,s("todo.settings.localGroupParent")),o.createElement("span",null)),i.map(x=>o.createElement("div",{role:"listitem",className:"todo-settings-item",key:x.id},o.createElement(t,{value:x.color,onChange:v=>A(i.map(O=>O.id===x.id?{...O,color:v}:O)),ariaLabel:s("todo.settings.localGroupColor",{p0:x.name})}),o.createElement(Kn,{key:`name:${x.id}:${x.name}`,initial:x.name,ariaLabel:s("todo.settings.localGroupName"),onCommit:v=>_(x,v)}),o.createElement(a,{value:x.parent??"",options:E,ariaLabel:s("todo.settings.localGroupParentOf",{p0:x.name}),onChange:v=>A(i.map(O=>{if(O.id!==x.id)return O;let{parent:K,...W}=O;return v?{...W,parent:v}:W}))}),o.createElement(r,{ariaLabel:s("todo.settings.localGroupDelete",{p0:x.name}),title:s("todo.settings.localGroupDelete",{p0:x.name}),onClick:()=>{N(x)}},o.createElement(qt,null))))),o.createElement("div",{className:"todo-status-add"},o.createElement(Kn,{key:`add:${l}`,initial:"",placeholder:s("todo.settings.localGroupNew"),ariaLabel:s("todo.settings.localGroupNew"),onType:x=>{p.current=x;let v=x.trim();v!==g&&(!v||!g)&&h(v)},onCommit:x=>{p.current=x,h(x.trim())}}),o.createElement(e,{type:"button",disabled:!g||i.length>=Ur,onClick:S},s("todo.settings.localGroupAdd"))))}function ql({section:e}){return e==="statuses"?o.createElement(af,null):e==="lists"?o.createElement(o.Fragment,null,o.createElement(nf,null),o.createElement(f.ui.settings.Section,null,o.createElement(f.ui.settings.GroupsEditor,null)),o.createElement(df,null)):o.createElement(sf,null)}var Yl="reminder:";function Xl(){let e=Ce();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(Yl))return;let a=n??t.slice(Yl.length).split(":")[0];Ye(e).then(i=>{e.assertActive();let d=i.find(c=>c.id===a);d?.filePath?e.api.workspace.openFile(d.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var wi=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),vi=e=>({type:"string",description:e});async function xi(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Zl(e){return Jn([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:wi({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await xi(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:wi({title:vi("Task title"),due:vi("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await xi(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:wi({id:vi("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await xi(e,"complete",{query:n},r)).title||n}".`}}])}function lf(e){us(e);let t=Xi(e),r=Ji(),n=vs(),a=!1,i=e.backend.on("records.eventDeliveryFailed",()=>{a||(a=!0,e.ui.confirm({title:s("workflow.delivery.title"),message:s("workflow.delivery.message"),actions:[{label:s("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{a=!1}))});Ud();let d=e.workspace.onOpenOwnLink(N=>{An(N)});e.registerView("todo.panel",Ml),e.registerView("todo.file",_l),e.registerView("todo.page",Hl),e.registerView("todo.settings",ql);let c=ad(e),p=il(e),l=e.interop.services.provide(Qn,Zl(e)),u=cd(),g=Jd(),h=e.interop.services.subscribe(Ot,()=>{}),m=e.interop.services.subscribe(Ot,()=>{}),A=el(e),S=Xl(),_=Vs();return()=>{i(),t(),c(),p(),l(),u(),g(),h(),m(),A(),S(),_(),d(),n(),r()}}var cf={register:lf},wk=cf;export{wk as default,lf as register};

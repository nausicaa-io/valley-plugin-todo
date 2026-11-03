var at="valley";var up=`.${at}`,pp=`app.${at}`;function Dd(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Id=/^[a-zA-Z]:/;function go(e){if(typeof e!="string")return"";let t=Dd(e);return!t||t==="."||Id.test(t)||t.split("/").some(r=>r==="..")?"":t}function xt(e){if(typeof e=="string")return go(e)||void 0}var ye=`.${at}`,Cd="plugins",ho=`${ye}/${Cd}`,Yo=`${ho}/packages`,gp=`${Yo}/core`,hp=`${Yo}/github`,yp=`${Yo}/local`,bp=`${Yo}/community`,wp=`${ho}/community.json`,vp=`${ho}/data`;var xp=`${ho}/enabled.json`,kp=`${ho}/sources.json`,Tp=`${ye}/state`,be=`${ye}/settings`,ka=`${ye}/data`,dn=`${ye}/recovery`;var ln=`${ye}/accounts`,jt=`${ye}/ai`,Sp=`${jt}/connections.json`,Ap=`${jt}/defaults.json`,Ep=`${jt}/budgets.json`,Dp=`${jt}/usage.sqlite`,Ip=`${jt}/security/guards.json`,Cp=`${jt}/security/activity.sqlite`,Np=`${ln}/providers`,Lp=`${ln}/providers.lock.json`,Nd=`${ye}/trash`,Op=`${Nd}/items`,cn=`${ye}/cache`,Pp=`${cn}/accounts`,Ld=`${cn}/search`,_p=`${cn}/providers`;var Mp=`${Ld}/index.jsonl`,Fp=`${dn}/drafts`,zp=`${dn}/transactions`,Rp=`${dn}/retired`;var it="design",Od="themes",Ta=`${ye}/${it}/${Od}`,$p=`${Ta}/local`,jp=`${Ta}/community`,Gp={app:`${be}/app.json`,appearance:`${ye}/${it}/appearance.json`,"icon-rail":`${ye}/${it}/icon-rail.json`,"footer-rail":`${ye}/${it}/footer-rail.json`,"plugin-startup":`${ye}/${it}/right-sidebar-startup.json`,"new-tab":`${ye}/${it}/new-tab.json`,pallette:`${ye}/${it}/palette.json`,group:`${ka}/groups.json`,units:`${ka}/units.json`,metadata:`${be}/file-viewers.json`,notification:`${be}/notification.json`,"notification-settings":`${be}/notification-settings.json`,preferences:`${be}/preferences.json`,"link-actions":`${be}/link-actions.json`,markdown:`${be}/markdown.json`,editor:`${be}/editor.json`,"editor-vim":`${be}/editor-vim.json`,"markdown-todo":`${be}/markdown-todo.json`,"markdown-codeblocks":`${be}/markdown-codeblocks.json`,"markdown-template":`${be}/markdown-template.json`,"markdown-embeed":`${be}/markdown-embeed.json`,files:`${be}/file.json`,"file-sorter":`${be}/file-sorter.json`,"file-sym-link":`${be}/file-sym-link.json`,search:`${be}/search.json`,"search-tag":`${be}/search-tag.json`,"search-content":`${be}/search-content.json`,design:`${ye}/${it}/appearance.json`,accounts:`${ln}/connections.json`};var Sa=at,Aa="open";var Pd=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Ea=16384;var Da=new Set(["__proto__","prototype","constructor"]);function Ia(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function Zo(e){let t=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Ia(i)>Ea)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let l=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let u=Reflect.ownKeys(i);if(u.length+r>8192||u.some(h=>typeof h=="string"&&Da.has(h)))throw new Error("Invalid or excessive bookmark state keys");let c=Object.getOwnPropertyDescriptors(i);if(l){let h=c.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(y,E)=>{let P=c[String(E)];return P&&"value"in P?n(P.value,s+1)??null:null})}let f={};for(let h of Object.keys(c).sort()){if(Da.has(h))throw new Error("Invalid bookmark state key");let y=c[h];if(!y.enumerable||!("value"in y)){r++;continue}let E=n(y.value,s+1);E!==void 0&&(f[h]=E)}return f}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Ia(JSON.stringify(a))>Ea)throw new Error("Bookmark state is too large");return a}function La(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=go(e);if(!t)throw new Error("Invalid bookmark path");return t}function un(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Ca(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function pn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Pd.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=Zo(t.state);return r.path!==void 0&&(r.path=La(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var _d=/^[A-Za-z0-9_-]{1,64}$/;function Na(e,t){if(typeof e!="string"||!_d.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Oa(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=un(t.title,512,"title"),n={...t.description===void 0?{}:{description:un(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:un(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:Na(t.group,"group")};if(t.groupId!==void 0){let l=Na(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:pn(t.target),...n,...a};return{...l,searchText:Ca(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:La(t.folderPath),title:r,...n,...a};return{...s,searchText:Ca(s)}}function kt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++t>2048||s>32||!r(i)||typeof i.type!="string")return!1;let l=(...p)=>Object.keys(i).every(u=>u==="type"||p.includes(u));return["unknown","null","boolean","number","string","function"].includes(i.type)?l():i.type==="literal"?l("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?l("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?l("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,s+1)):i.type==="union"?l("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,s+1)):i.type==="object"?l("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,u])=>n(p)&&a(u,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Xo(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,l,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return l===null;if(s.type==="literal")return l===s.value;if(s.type==="union")return s.anyOf.some(u=>i(u,l,p+1));if(s.type==="number")return typeof l=="number"&&Number.isFinite(l);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof l===s.type;if(!l||typeof l!="object"||a.has(l))return!1;a.add(l);try{return s.type==="array"?Array.isArray(l)&&l.length<=(s.maxItems??1e5)&&l.every(u=>i(s.items,u,p+1)):s.type==="tuple"?Array.isArray(l)&&l.length>=(s.minItems??s.items.length)&&l.length<=s.items.length&&l.every((u,c)=>i(s.items[c],u,p+1)):s.type==="object"?Array.isArray(l)||s.required?.some(u=>!Object.hasOwn(l,u))?!1:Object.entries(l).every(([u,c])=>Object.hasOwn(s.properties,u)?i(s.properties[u],c,p+1):s.additionalProperties===!0):!1}finally{a.delete(l)}};return i(e,t,0)}var Md=new Map;function de(e,t,r,n,a,i,s,l,p="owner"){let u=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:s,serviceMetadata:l});return Md.set(`${t}:${e}@${r}`,u),u}var fn=256;function gn(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var V=e=>!!e&&typeof e=="object"&&!Array.isArray(e),ue=(e,t)=>typeof e[t]=="function",Tt=e=>e===void 0,Gt=e=>typeof e=="boolean",H=e=>typeof e=="string",Ne=e=>e===void 0||H(e),Fd=e=>e===void 0||typeof e=="number",zd=e=>e===void 0||typeof e=="boolean",ie=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Se=e=>V(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Pa=e=>V(e),Ma=e=>V(e)&&H(e.id)&&H(e.title)&&H(e.date)&&(e.documentRef===void 0||V(e.documentRef)&&H(e.documentRef.pluginId)&&H(e.documentRef.sourceId)&&H(e.documentRef.itemId)),Rd=e=>V(e)&&H(e.date)&&Ne(e.startTime)&&Ne(e.endTime)&&Ne(e.sourceId)&&Ne(e.itemId),$d=e=>V(e)&&H(e.url)&&Ne(e.title)&&zd(e.newTab),jd=e=>V(e)&&H(e.query),Fa=e=>V(e)&&H(e.name)&&Ne(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Gd=e=>Array.isArray(e)&&e.every(Fa),Kd=e=>e===null||Fa(e),Ud=e=>e===void 0||V(e)&&Ne(e.approvalToken)&&(e.cancellation===void 0||V(e.cancellation)),Vd=e=>typeof e=="string"||V(e)&&typeof e.text=="string",Bd=e=>V(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&V(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ne(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),za=e=>V(e)&&H(e.id)&&H(e.label)&&Ne(e.labelKey)&&Ne(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(za)),Ra={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ma)},create:{args:e=>ie(e,[H,Pa]),result:Gt},update:{args:e=>ie(e,[H,Pa]),result:Gt},remove:{args:e=>ie(e,[H]),result:Gt},open:{args:e=>ie(e,[H]),result:Tt},configure:{args:e=>e.length===0,result:Tt},actions:{args:e=>ie(e,[H]),result:e=>Array.isArray(e)&&e.every(za)},runAction:{args:e=>ie(e,[H,H]),result:Gt}},$a=e=>V(e)&&H(e.name)&&H(e.version)&&Ne(e.description)&&Ne(e.author)&&(e.localized===void 0||V(e.localized)&&Object.values(e.localized).every(t=>V(t)&&H(t.name)&&Ne(t.description))),Hd=de("calendar.itemSource","service","1.3.0","many",e=>V(e)&&ue(e,"list")&&(e.integration===void 0||$a(e.integration)),void 0,Ra,e=>e.integration),Jo=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,mn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Wd=e=>V(e)&&Jo(e.startDate)&&Jo(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=fn&&(e.cursor===void 0||mn(e.cursor)),qd=e=>V(e)&&mn(e.revision)&&(e.cursor===void 0||mn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=fn&&e.items.every(t=>Ma(t)&&Jo(t.date)&&(t.endDate===void 0||Jo(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,St=de("calendar.itemSource","service","2.0.0","many",e=>V(e)&&ue(e,"list")&&(e.integration===void 0||$a(e.integration)),void 0,{...Ra,list:{args:e=>ie(e,[Wd]),result:qd}},e=>e.integration),yo=de("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Yd=de("calendar.navigator","service","1.0.0","one",e=>V(e)&&ue(e,"openDate"),void 0,{openDate:{args:e=>ie(e,[Rd]),result:Tt}}),Qo=de("calendar.panelSelection","state","1.0.0","one",e=>V(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Zd=de("web.activeContext","state","1.0.0","one",e=>V(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function _a(e){return V(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>V(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Xd=de("contacts.directory","service","1.0.0","one",e=>V(e)&&["search","resolveEmails","open"].every(t=>ue(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(_a)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>V(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(_a))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||V(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Tt}}),Jd=de("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Qd=de("web.navigator","service","1.0.0","one",e=>V(e)&&ue(e,"open"),void 0,{open:{args:e=>ie(e,[$d]),result:Tt}}),el=de("selection.textAction","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&ue(e,"run"),e=>[e.id]),tl=de("geo.navigator","service","1.0.0","one",e=>V(e)&&ue(e,"open"),void 0,{open:{args:e=>ie(e,[jd]),result:Tt}}),ol=de("geo.search","service","1.0.0","one",e=>V(e)&&ue(e,"search")&&ue(e,"reverse"),void 0,{search:{args:e=>ie(e,[H]),result:Gd},reverse:{args:e=>ie(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Kd}}),hn=de("agent.toolProvider","service","1.0.0","many",e=>V(e)&&Array.isArray(e.tools)&&e.tools.every(Bd)&&ue(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>ie(e,[H,V,Ud]),result:Vd}},e=>({tools:e.tools}),"global"),rl=de("guard.runtime","service","1.0.0","one",e=>V(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>ue(e,t)),void 0,{resolve:{args:e=>ie(e,[V]),result:V},requestApproval:{args:e=>ie(e,[V]),result:Gt},consumeToken:{args:e=>e.length>=1&&e.length<=2&&H(e[0])&&Ne(e[1]),result:Gt},audit:{args:e=>ie(e,[V]),result:Tt}}),nl=de("browser.automation","service","1.0.0","one",e=>V(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>ue(e,t)),void 0,{list:{args:e=>e.length===0,result:Se},open:{args:e=>ie(e,[H]),result:Se},switch:{args:e=>ie(e,[H]),result:Se},close:{args:e=>ie(e,[H]),result:Se},snapshot:{args:e=>ie(e,[H]),result:Se},readText:{args:e=>e.length>=1&&e.length<=2&&H(e[0])&&Fd(e[1]),result:Se},readHtml:{args:e=>ie(e,[H]),result:Se},screenshot:{args:e=>ie(e,[H]),result:Se},click:{args:e=>ie(e,[H,t=>typeof t=="number"]),result:Se},type:{args:e=>e.length>=3&&e.length<=4&&H(e[0])&&typeof e[1]=="number"&&H(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Se},select:{args:e=>ie(e,[H,t=>typeof t=="number",H]),result:Se},scroll:{args:e=>ie(e,[H,t=>typeof t=="number",t=>typeof t=="number"]),result:Se},pressKey:{args:e=>ie(e,[H,H]),result:Se},navigate:{args:e=>ie(e,[H,H]),result:Se},back:{args:e=>ie(e,[H]),result:Se},forward:{args:e=>ie(e,[H]),result:Se},reload:{args:e=>ie(e,[H]),result:Se}}),al=de("fileTree.contextItem","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ne(e.labelKey)&&ue(e,"run"),e=>[e.id]),il=de("newTab.entry","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ue(e,"run"),e=>[e.id]),yn=de("search.resultAction","extension","1.0.0","many",e=>V(e)&&typeof e.cardKind=="string"&&ue(e,"open"),e=>[e.cardKind]),sl=de("search.resultCard","extension","1.0.0","many",e=>V(e)&&typeof e.cardKind=="string"&&ue(e,"render")&&ue(e,"open"),e=>[e.cardKind]),er=de("metadataPanel.segment","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ue(e,"render"),e=>[e.id]),bn=de("workspace.surface","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&ue(e,"getSnapshot")&&ue(e,"subscribe")&&ue(e,"restore"),e=>[e.id]),dl=de("metadata.plugin","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&ue(e,"facts"),e=>[e.id]),ll=de("workspace.viewState","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&ue(e,"capture")&&ue(e,"restore")&&ue(e,"subscribe"),e=>[e.id]);var tr=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},wn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),ja=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Ga=e=>wn(e)&&typeof e.surface=="string"&&ja.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function bo(e){let t=tr(e);if(!Ga(t))throw new Error("Invalid bookmark descriptor");let r=pn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Oa({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function vn(e){try{let t=bo(e),r=tr(e);return JSON.stringify(t.state)===JSON.stringify(Zo(r.state))}catch{return!1}}function cl(e){try{let t=tr(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:bo(t.bookmark)}}catch{}return{status:"invalid"}}var ul=e=>{try{let t=tr(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&vn(t.bookmark)}catch{return!1}},pl=e=>wn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Ka=de("workspace.bookmark","service","1.0.0","many",e=>wn(e)&&typeof e.id=="string"&&ja.has(String(e.surface))&&kt(e.stateSchema)&&(e.itemStateSchema===void 0||kt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Ga(e[0]),result:ul,sanitizeResult:cl},restore:{args:e=>e.length===1&&vn(e[0]),result:pl}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function xn(e,t,r){if(!kt(r.stateSchema)||r.itemStateSchema!==void 0&&!kt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(u,c,f=!1)=>Xo(f&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,u,8192)&&(!r.validate||r.validate(u,c)),i=(u,c,f)=>{let h=f?void 0:r.primary?r.primary(u):u.item,y=Zo(h?.state??u.view);if(!a(y,c,!!h))throw new Error("Invalid bookmark state");return bo({...c,title:h?.title??u.title,description:r.description(u,!!h),state:y,...h?{itemId:h.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(u.instanceId),u,!1)}}catch{return{status:"invalid"}}},async restore(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};let c;try{if(c=bo(u),!a(c.state,c,c.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(c.state,c.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(Ka,s),p;try{p=e.interop.extensions.provide(bn,{...t,getSnapshot(u){let c=t.getSnapshot(u),f={surface:t.surface,...u===void 0?{}:{instanceId:u}},h,y;try{h=i(c,f,!1)}catch{}try{y=i(c,f,!0)}catch{}return{...c,bookmark:h,bookmarkView:y}}})}catch(u){throw n=!1,l(),u}return()=>{n=!1,p(),l()}}var wo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Ua=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Va(e){if(!wo(e)||!Ua(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!wo(r)||!Ua(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!wo(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!wo(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!wo(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var ml=de("workspace.details","extension","1.0.0","many",Va,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var ym=[ye,`${ye}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Lm=1024*1024;var _m=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var Mm=globalThis.Buffer;var gl=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,m,or=new Map,rr;function ke(){return rr}function Ba(e,t){let r=or.get(e)??new Set;return r.add(t),or.set(e,r),()=>{r.delete(t),r.size||or.delete(e)}}function Ha(e){rr?.dispose(),m=e,o=e.React;let t=!0,r=new Set;return rr={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},rr.dispose}var hl=1800;function Kt(e){let t=Le();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},l=c=>{if(c.mode==="create")return;i=c.nonce,c.mode==="edit"&&(t.clear(),e(c.todoId)),r!==null&&clearTimeout(r);let f=Date.now()+2500,h=()=>{if(r=null,i!==c.nonce)return;let y=[...or.get(c.todoId)??[]].find(E=>E.isConnected);if(!y){Date.now()<f?r=setTimeout(h,40):t.get()?.nonce===c.nonce&&t.clear();return}y.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),y.classList.add("todo-reveal-target"),a=y,n=setTimeout(s,hl),t.get()?.nonce===c.nonce&&t.clear()};r=setTimeout(h,0)},p=t.subscribe(()=>{let c=t.get();c&&l(c)}),u=t.get();return u&&l(u),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function Le(){return m.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function nr(){Le().request("","create"),m.workspace.revealOwnPanel("left_sidebar")}var yl=`
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
  gap: 8px;
  margin: 8px;
  padding: 10px;
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
.todo-compose-token { display: inline-flex; align-items: center; gap: 3px; max-width: 100%; padding: 2px 3px 2px 6px; border-radius: var(--radius-sm); background: var(--hover-bg); color: var(--text-secondary); font-size: var(--small-font-size); }
.todo-compose-token > span { min-width: 0; overflow-wrap: anywhere; }
.todo-compose-token > button { display: grid; place-items: center; flex: 0 0 20px; width: 20px; height: 22px; padding: 0; border: 0; border-radius: var(--radius-sm); color: var(--text-tertiary); background: transparent; cursor: pointer; }
.todo-compose-token > button:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-compose-token svg { width: 12px; height: 12px; flex-shrink: 0; }
.todo-compose-attachment > span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.todo-compose-schedule { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 116px), 1fr)); gap: 6px; }
.todo-compose-date-field, .todo-compose-time-field { width: 100%; min-width: 0; height: 30px; border: 1px solid var(--border-light); background: transparent; border-radius: var(--radius-sm); box-sizing: border-box; }
.todo-compose-date-field .date-field-input, .todo-compose-time-field .time-field-input { min-width: 0; font-size: var(--small-font-size); }
.todo-compose-controls { display: flex; align-items: center; gap: 6px; padding-top: 8px; border-top: 1px solid var(--border-light); }
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

.todo-smart-list-setting-row::after,
.todo-status-setting-row:not(.locked)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: calc(var(--space-1) + 1px);
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
  margin: 0;
  background: var(--drop-indicator-fill);
  pointer-events: none;
}

.todo-smart-list-setting-row.drop-before::before { top: calc(-1px - var(--space-1) / 2); transform: translateY(-50%); }
.todo-smart-list-setting-row.drop-after::before { bottom: calc(-1px - var(--space-1) / 2); transform: translateY(50%); }

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

.todo-status-settings[data-drop-zone] .todo-status-setting-row::before { content: none; }

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
[data-reorder-active="true"] > .todo-status-setting-handle { outline: none; }
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
  margin: 0;
  background: var(--drop-indicator-fill);
  pointer-events: none;
}
.todo-status-setting-row.drop-before::before { top: calc(-1px - var(--space-1) / 2); transform: translateY(-50%); }
.todo-status-setting-row.drop-after::before { bottom: calc(-1px - var(--space-1) / 2); transform: translateY(50%); }

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
`,kn="notes-todo-styles";function Wa(){let e=document.getElementById(kn);return e||(e=document.createElement("style"),e.id=kn,document.head.appendChild(e)),e.textContent=yl,()=>{document.getElementById(kn)===e&&e.remove()}}var W="#12120f",le="#ffffff",Sn=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:W,onDark:W},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:le,onDark:le},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:W,onDark:W},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:le,onDark:W},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:W,onDark:W},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:le,onDark:W},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:le,onDark:W},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:le,onDark:W},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:le,onDark:W},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:le,onDark:le},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:W,onDark:W},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:le,onDark:W},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:le,onDark:W},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:W,onDark:W},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:le,onDark:W},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:le,onDark:W},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:le,onDark:W},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:le,onDark:W},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:W,onDark:W},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:W,onDark:W},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:le,onDark:W},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:le,onDark:W},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:le,onDark:W},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:le,onDark:W},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:le,onDark:W},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:le,onDark:W},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:W,onDark:W},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:W,onDark:W},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:le,onDark:W},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:W,onDark:W},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:le,onDark:W},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:le,onDark:W},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:W,onDark:W},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:le,onDark:W},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:le,onDark:W},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:le,onDark:W}],bl=["semantic","muted","accent","categorical"];var Sf=new Map(Sn.map(e=>[e.id,e])),wl={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},vl=new Map(Sn.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),xl=/^[a-z][a-z0-9-]{0,47}$/,kl={version:4,families:bl.map(e=>({id:e,name:wl[e]})),colors:Sn.map(e=>({id:e.id,familyId:e.family,name:vl.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},Tl=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var Sl=Tl(kl);function qa(){return Sl}var Tn=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],ar="palette:",Al=/^#[0-9a-f]{6}$/i;function ir(e){return e.startsWith(ar)&&xl.test(e.slice(ar.length))}function we(e){return`${ar}${e}`}function vo(e){return ir(e)?e.slice(ar.length):void 0}function Ya(e){if(typeof e!="string")return;let t=e.trim();return ir(t)?t:Al.test(t)?t.toLowerCase():void 0}function Me(e){let t=vo(e);return t?`var(--color-${t})`:e}function Za(e){let t=vo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function Xa(e){let t=new Set(e.map(r=>vo(r)??r.toLowerCase()));return we(Tn.find(r=>!t.has(r))??Tn[0])}function Ja(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=Tn;return we(r[Math.abs(t)%r.length])}function te(e){return e.trim().toLowerCase()}function El(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=te(i);!s||s===te(t)||r.has(s)||(r.add(s),n.push(i))}return n}function Qa(e){return`group_${te(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function At(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=te(i);if(!i||r.has(s))continue;r.add(s);let l=typeof a.id=="string"&&a.id.trim()?a.id.trim():Qa(i),p=Ya(a.color)??Xa(t.map(c=>c.color)),u=El(a.aliases,i,r);t.push({id:l,name:i,color:p,...u.length?{aliases:u}:{}})}return t}function xo(e,t){let r=te(t??"");if(r)return e.find(n=>te(n.name)===r||(n.aliases??[]).some(a=>te(a)===r))}function sr(e,t){return xo(t,e)?.name}function Re(e,t){let r=te(e??"");return r?xo(t,e)?.color??Ja(r):we("primary-blue")}function An(e){let t={};for(let r of e){let n=te(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var ei="statuses",Qe=[{id:"open",labelKey:"todo.status.todo",color:we("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:we("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:we("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:we("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:we("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:we("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:we("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:we("red"),done:!0,cls:"todo-st-canceled",locked:!1}],En=Qe,lr=Qe.map(e=>e.id),ko=Qe.filter(e=>!e.locked).map(e=>e.id),Et=Qe.filter(e=>e.done).map(e=>e.id),ti=new Map(Qe.map(e=>[e.id,e])),Dl=new Set(ko);function Il(e){if(typeof e!="string"||!ir(e))return!1;let t=vo(e);if(!t)return!1;let r=qa();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function oi(e){let t=e&&typeof e=="object"?e:{},r=Array.isArray(t.active)?t.active:ko,n=[];for(let s of r)typeof s!="string"||!Dl.has(s)||n.includes(s)||n.push(s);let a=t.colors&&typeof t.colors=="object"?t.colors:{},i=Object.fromEntries(lr.map(s=>{let l=ti.get(s).color;return[s,Il(a[s])?a[s]:l]}));return{active:n,colors:i}}function Ut(){return oi(m?.settings.get()[ei])}function ri(e){m.settings.set(ei,oi(e))}function $e(e){let t=e&&ti.get(e)||Qe[0];return{...t,color:Ut().colors[t.id]}}function dr(){let e=Ut();return[Qe[0],Qe[1],...e.active.map(t=>$e(t))]}function st(){return dr().map(e=>e.id)}function ni(e){return e==="open"||e==="completed"||Ut().active.includes(e)}function dt(){let[e,t]=o.useState(dr);return o.useEffect(()=>m.settings.subscribe(()=>t(dr())),[]),e}function Vt(e,t=st()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function Bt(e,t){return t==="all"||t.includes(je(e))}function cr(e){if(typeof e=="string")return lr.includes(e)?e:void 0}function je(e){return e.status??(e.completed?"completed":"open")}function Ae(e){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:Et.includes(e),status:e}}function Ht(){return dr().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,cls:e.cls}))}function Cl(){return Qe.map(e=>{let t=$e(e.id),r=Me(t.color);return`.${t.cls}{color:${r}}.todo-detail-field[data-status="${t.id}"] .select-field-value{color:${r}}`}).join("")}function ai(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Cl()};r();let n=m.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function ii(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let s=t.slice(i,i+20),l=new Map;for(;s.length;){r();let p=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(c=>({to:c,from:{in:lr.filter(f=>f!==c)}})),...l.size?{and:[{or:s.map(c=>({taskId:c,position:{lt:l.get(c)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let u=await a.query({select:["taskId","changedAt"],where:{or:p.map(c=>({taskId:c.taskId,position:c.position}))},limit:20});r(),s=[];for(let c of u.rows){let f=String(c.taskId);if(typeof c.changedAt=="string"&&c.changedAt)n.set(f,{changedAt:c.changedAt});else{let h=p.find(y=>y.taskId===f)?.position;if(typeof h!="number"||!Number.isInteger(h))throw new Error("Invalid completion position");l.set(f,h),s.push(f)}}}}return n}function To(e){return"historyLoaded"in e&&e.historyLoaded===!1}var si={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Reorder the To-Do navigation or hide lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are fixed but can be recolored. Reorder or recolor optional statuses, and drag them between Show and Hide.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation."};var di={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Ordne die To-Do-Navigation neu oder blende nicht verwendete Listen aus.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind fixiert, k\xF6nnen aber eingef\xE4rbt werden. Optionale Status k\xF6nnen neu angeordnet, eingef\xE4rbt und zwischen Einblenden und Ausblenden verschoben werden.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation."};var li={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Reordena la navegaci\xF3n de tareas u oculta las listas que no utilices.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado son fijos, pero sus colores se pueden cambiar. Reordena o cambia el color de los estados opcionales y arr\xE1stralos entre Mostrar y Ocultar.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation."};var ci={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"R\xE9ordonnez la navigation To-Do ou masquez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont fixes, mais leur couleur reste modifiable. R\xE9ordonnez ou recolorez les statuts facultatifs et faites-les glisser entre Afficher et Masquer.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation."};var ui={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u91CD\u65B0\u6392\u5E8F\u5F85\u529E\u5BFC\u822A\u6216\u9690\u85CF\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u72B6\u6001\u56FA\u5B9A\u542F\u7528\uFF0C\u4F46\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3002\u53EF\u91CD\u65B0\u6392\u5E8F\u6216\u66F4\u6539\u53EF\u9009\u72B6\u6001\u7684\u989C\u8272\uFF0C\u5E76\u5728\u663E\u793A\u548C\u9690\u85CF\u4E4B\u95F4\u62D6\u52A8\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation."};var pi={en:si,de:di,es:li,fr:ci,"zh-CN":ui};function mi(e,t){return(pi.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var fi=mi;function gi(e){e.ui.registerCatalogs(pi),fi=(t,r)=>{let n=e.ui.t(t,r);return n===t?mi(t,r):n}}function d(e,t){return fi(e,t)}var Ml={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Fl={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},zl={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"};function Wt(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=Ml[e];return r?d(r):t||e}function hi(e){return d(Fl[e])}function yi(e){return d(zl[e])}function Oe(e,t=""){return typeof e=="string"?e:t}function ur(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function pr(e){let t=Oe(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function bi(e){let t=Oe(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var Rl=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],Hf=Object.fromEntries(Rl.map(e=>[e,{destination:"ask",recognize:!0}]));var $l=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",at]);function jl(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function So(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=jl(e);if(!t||$l.has(t)||t.startsWith(`${at}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Gl=16384,Kl=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Ul(e){if(!e||e.length>Gl||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function Vl(e){try{let t=new URL(e);if(t.protocol!==`${Sa}:`||t.hostname!==Aa)return null;let r=go(t.searchParams.get("file"));if(r)return{kind:"file",relPath:r};let n=t.searchParams.get("plugin")??"";if(!Kl.test(n))return null;let a=Ul(t.searchParams.get("state")??""),i=t.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let s=t.searchParams.get("instance");return s&&s.length>512?null:a?{kind:"plugin",pluginId:n,state:a,...i?{surface:i}:{},...s?{instanceId:s}:{}}:null}catch{return null}}function qt(e){let t=Vl(e);return t?.kind==="file"?t.relPath:null}function wi(e){return So(e)!==null}function Dt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var Bl=["normal","low","medium","high"];function vi(e){return e===!0}function Hl(e){return typeof e=="string"&&Bl.includes(e)?e:"normal"}function mr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function xi(e){return Array.isArray(e)?e.filter(t=>ur(t)).map(t=>({startedAt:Oe(t.startedAt),endedAt:Oe(t.endedAt),activeMinutes:mr(t.activeMinutes)??0,pauseMinutes:mr(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function Dn(e){return Array.isArray(e)?e.filter(t=>ur(t)).map(t=>({from:cr(t.from),to:cr(t.to),changedAt:Oe(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Wl(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function fr(e){if(typeof e!="string")return;let t=e.trim();if(t)return qt(t)||wi(t)?t:void 0}function ql(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>fr(n)).filter(n=>!!n))];return r.length?r:void 0}function Yl(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>xt(r)).filter(r=>!!r))];return t.length?t:void 0}function Zl(e){if(!ur(e))return;let t=Oe(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function Ao(e){let t=new Date().toISOString(),r=Oe(e.id,Dt("todo")),n=Oe(e.createdAt,t),a=xi(e.history),i=Dn(e.statusHistory),s=cr(e.status);return{id:r,title:Oe(e.title).trim(),completed:vi(e.completed)||s==="completed"||s==="canceled",priority:Hl(e.priority),dueDate:Oe(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:pr(e.reminderTime),startTime:pr(e.startTime),endTime:pr(e.endTime),color:bi(e.color),note:Oe(e.note),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],estimatedMinutes:mr(e.estimatedMinutes),actualMinutes:mr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:xt(e.filePath),group:Oe(e.group).trim()||void 0,flagged:vi(e.flagged)||void 0,urls:ql(e.urls),attachments:Yl(e.attachments),location:Zl(e.location),remindAt:Wl(e.remindAt),reminderFiredAt:Oe(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Oe(e.updatedAt,n)}}function In(e,t,r){let n=(u,c=!1)=>{let f=new Map;for(let h of u){let y=f.get(h.taskId);y?y.push(h):f.set(h.taskId,[h])}if(c)for(let h of f.values())h.sort((y,E)=>Number(y.position)-Number(E.position));return f},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(u=>Ao({...u,tags:(a.get(u.id)??[]).map(c=>c.tag),urls:(i.get(u.id)??[]).map(c=>c.url),attachments:(s.get(u.id)??[]).map(c=>c.path),history:l.get(u.id)??[],statusHistory:p.get(u.id)??[]})).map(u=>({...u,group:sr(u.group,r)??u.group})).filter(u=>u.title)}var gr="todo.tasks",On="todo.task_tags",Pn="todo.task_links",_n="todo.task_attachments",Ai="todo.focus_sessions",Yt="todo.status_history",Eo=[gr,On,Pn,_n],Xl=[...Eo,Ai,Yt],Mn=[...Eo,Yt];function Jl(e,t){let r=ke(),n=e.map(s=>r.api.data.dataset(s).subscribe(t)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function Zt(e){return Jl(Mn,e)}function Ei(e){let t=Eo.map(r=>m.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function lt(e,t,r=ke()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function Ql(e,t=!0,r=!0,n=ke()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?lt(On,a,n):[],lt(Pn,a,n),lt(_n,a,n),t?lt(Ai,a,n):[],t?lt(Yt,a,n):[]]),[s,l,p,u,c]=i.map(f=>{if(f.status==="rejected")throw f.reason;return f.value});return{tags:s,links:l,attachments:p,sessions:u,statusHistory:c}}async function Ln(e,t,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([lt(gr,n,e),Ql(r,t,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),In(a.value,i.value,At(e.api.getState().groups))}var ki=new WeakMap;function hr(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=ki.get(e);i||(i=new Map,ki.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let p=s,u=r.map(c=>e.api.data.dataset(c).subscribe(()=>{p.revision++}));e.onDispose(()=>{u.forEach(c=>c()),i.clear()}),i.set(t,s)}let l=s.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,u=await a();if(e.assertActive(),p===s.revision)return u}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,l)),l}function Di(e,t){let r=ke();return hr(r,e?"full":"calendar",e?Xl:Eo,t??"",()=>Ln(r,e,t))}var Ii=200;function ec(e,t){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Ii)return null;let n=t===gr?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var Cn=new WeakMap;function tc(e){let t=Cn.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=Mn.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=i?ec(i,a):null;if(!s){r.full=!0,r.dirty.clear();return}for(let l of s)r.dirty.add(l);r.dirty.size>Ii&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),Cn.delete(e)}),Cn.set(e,r),t=r,t}async function Ti(e,t){let r;if(!t)r=await Ln(e,!1);else{r=[];for(let a=0;a<t.length;a+=100)r.push(...await Ln(e,!1,t.slice(a,a+100)))}let n=await ii(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function ct(e=ke()){let t=tc(e);return hr(e,"list",Mn,"",async()=>{let r=JSON.stringify(At(e.api.getState().groups));if(t.full||!t.value||t.groups!==r){t.full=!1,t.dirty.clear();try{t.value=await Ti(e),t.groups=r}catch(p){throw t.full=!0,p}return t.value}if(!t.dirty.size)return t.value;let n=[...t.dirty];t.dirty.clear();let a;try{a=await Ti(e,n)}catch(p){for(let u of n)t.dirty.add(u);throw p}let i=new Map(a.map(p=>[p.id,p])),s=new Set(n),l=[];for(let p of t.value)if(!s.has(p.id))l.push(p);else{let u=i.get(p.id);u&&(l.push(u),i.delete(p.id))}return l.push(...i.values()),t.value=l,l})}var Si=new WeakMap,oc=0;function rc(e,t){let r=Si.get(e);r||(r=new Map,Si.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++oc),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function nc(e,t,r){return hr(e,"statusHistory",[Yt],r.key,async()=>{let n=await lt(Yt,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Dn(n)})}function Ci(e){let t=ke(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=rc(t,e),s=0,l=!1,p=()=>{let h=++s;nc(t,e,a).then(y=>{!l&&h===s&&n({scope:t,id:e,history:y})}).catch(()=>{})},u=t.api.data.dataset(Yt).subscribe(h=>{(!h.keys||h.keys.some(y=>y.taskId===e))&&p()}),c=()=>{l=!0,u(),i()},f=t.onDispose(c);return p(),()=>{f(),c()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function ut(){return Di(!0)}async function Xe(e){return e?(await Di(!0,e))[0]??null:null}function Ni(e,t,r,n){let a=ke();return hr(a,"calendarPage",Eo,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(gr).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async f=>{let h=[];for(let y=0;y<i.rows.length;y+=100)h.push(...await lt(f,{taskId:{in:i.rows.slice(y,y+100).map(E=>String(E.id))}},a));return h},l=await Promise.allSettled([s(On),s(Pn),s(_n)]),[p,u,c]=l.map(f=>{if(f.status==="rejected")throw f.reason;return f.value});return a.assertActive(),{todos:In(i.rows,{tags:p,links:u,attachments:c,sessions:[],statusHistory:[]},At(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function It(e){try{return await m.backend.call("records.append",{record:e})}catch{return!1}}async function Fn(e,t,r,n,a=!1){try{let i=await m.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??t:null}catch{return null}}async function Nn(e,t,r,n){return await Fn(e,t,r,n)!==null}function zn(e,t,r){return Fn(e,t,r)}async function Do(e,t){return await Fn(e,t,void 0,void 0,!0)!==null}async function Ct(e){try{return await m.backend.call("records.delete",{id:e})}catch{return!1}}async function yr(e){if(!e.id||!e.title.trim())return!1;let t=await It(e);return t&&m.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Ct(e.id)}),redo:async()=>({ok:await It(e)})}),t}async function Xt(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await Xe(e),i=To(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;To(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await Nn(e,i,r,n);return s&&a&&m.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Nn(e,a)}),redo:async()=>({ok:await Nn(e,i)})}),s}async function br(e){let t=await Xe(e),r=await Ct(e);return r&&t&&m.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await It(t)}),redo:async()=>({ok:await Ct(e)})}),r}async function Io(e,t){await m.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await t(e.id)}function ac(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Nt(e,t,...r){let n=ac(e);if(!n.tags.length&&!n.text)return!0;let a=t.map(i=>i.toLowerCase());for(let i of n.tags)if(!a.some(s=>s.startsWith(i)))return!1;return!(n.text&&!r.map(s=>s.toLowerCase()).some(s=>s.includes(n.text)))}function Ee(e=[]){return e.map(t=>sr(t.name,e)??t.name)}function ic(){return At(m.getState().groups)}function He(){return ic()}function Li(e){return m.subscribe(e)}function We(){let[e,t]=o.useState(He);return o.useEffect(()=>m.subscribe(()=>t(He())),[]),e}function Oi(){let e=ke(),t=!1,r=()=>{ct(e).then(a=>{e.assertActive(),t||e.api.workspace.reportGroupUsage(An(a.map(i=>i.group)))}).catch(()=>{})};r();let n=Zt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function sc(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function dc(e){let t=e.toLowerCase();return sc(t)?t:"yyyy-mm-dd"}function Pi(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return dc(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var lc="ddd d mmm",cc=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function uc(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!cc.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function pc(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return uc(t)?t:lc}var Co=new Map;function mc(e,t,r){let n=`${r??""}:${t}`,a=Co.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Co.size>=64&&Co.delete(Co.keys().next().value),Co.set(n,a)),a.format(e)}function _i(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,l=new Date(Number(a),Number(i)-1,Number(s),12);return pc(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?a:mc(l,p,r))}var Ye=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Lt={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},wr={high:3,medium:2,low:1,normal:0};function Jt(e,t){return e.title.localeCompare(t.title,void 0,{sensitivity:"base"})}function fc(e,t,r){if(r==="name")return Jt(e,t);if(r==="priority"){let i=wr[t.priority]-wr[e.priority];return i!==0?i:qe(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:qe(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return qe(e,t);if(!i)return-1;if(!s)return 1;let l=i.localeCompare(s);return l!==0?l:qe(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Jt(e,t)}function Rn(e,t){let r=wr[t.priority]-wr[e.priority];return r!==0?r:Jt(e,t)}function qe(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Rn(e,t)}function Qt(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",l=a.dueDate||"";if(!s&&!l)return qe(n,a);if(!s)return-1;if(!l)return 1;let p=l.localeCompare(s);return p!==0?p:qe(n,a)}let i=fc(n,a,t);return r==="asc"?i:-i})}function Ke(e,t="dd-mm-yyyy"){return e?Pi(e,t):""}function De(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function vr(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function eo(e,t){let r=vr(e);return r?(r.setDate(r.getDate()+t),De(r)):e}function et(e,t,r="ddd d mmm"){return _i(e.slice(0,10),r,t)}function Mi(e,t,r={}){let n=vr(`${e}-01`);if(!n)return e;let a=r.now??new Date,i=n.getFullYear()===a.getFullYear(),s=n.toLocaleDateString(t,i?{month:"long"}:{month:"long",year:"numeric"});return r.partial&&r.restOfLabel?r.restOfLabel.replace("{{p0}}",s):s}function Fi(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,l,p]=i.split("-").map(Number),[u,c,f]=t.split("-").map(Number);if(!s||!l||!p||!u||!c||!f)return Ke(e,a);let h=new Date(s,l-1,p),y=new Date(u,c-1,f),E=Math.round((h.getTime()-y.getTime())/864e5);return E===1?r.tomorrow:E===-1?r.yesterday:E>1&&E<7?h.toLocaleDateString(n,{weekday:"long"}):Ke(e,a)}var Pg=new Date(2023,0,1,12);var gc={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function $n(e){return gc[e??""]??1}function zi(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function hc(e,t){return(e.getDay()-t+7)%7}function Ri(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-hc(e,t))}function No(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var to=["overdue","today","upcoming","someday","completed"],ji={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function Ue(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Lo(e,t=Ue()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||qe(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(qe),r.someday.sort(Rn),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Jt(a,i)),r}function Gi(e,t=Ue()){let r=new Map;for(let n of e){let a=n.dueDate?.slice(0,10)??"",i=r.get(a);i?i.push(n):r.set(a,[n])}return[...r.entries()].sort(([n],[a])=>n===""?1:a===""?-1:n.localeCompare(a)).map(([n,a])=>({key:n,overdue:!!n&&n<t,todos:a.sort(qe)}))}function Ot(e){return To(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function jn(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):Ue(t)}function Ki(e){let t=[...e].sort((n,a)=>Ot(a).localeCompare(Ot(n))||Jt(n,a)),r=new Map;for(let n of t){let a=jn(Ot(n)),i=r.get(a);i?i.push(n):r.set(a,[n])}return[...r.entries()].sort(([n],[a])=>a.localeCompare(n)).map(([n,a])=>({key:n,kind:"daily",todos:a}))}function Gn(e,t,r=1,n){let a=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),i=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:Ue(Ri(No(l),r)):"",s=new Map;for(let l of e){let p=i(a(l)),u=s.get(p);u?u.push(l):s.set(p,[l])}return[...s.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}var yc=["untimed","morning","afternoon","tonight"],Ui={untimed:"",morning:"todo.timeOfDay.morning",afternoon:"todo.timeOfDay.afternoon",tonight:"todo.timeOfDay.tonight"};function bc(e){if(!e)return"untimed";let t=Number(e.slice(0,2));return Number.isFinite(t)?t<12?"morning":t<18?"afternoon":"tonight":"untimed"}function Vi(e){let t=new Map;for(let r of e){let n=bc(r.startTime),a=t.get(n);a?a.push(r):t.set(n,[r])}return yc.filter(r=>t.has(r)).map(r=>({id:r,todos:t.get(r).sort(qe)}))}var wc=14;function $i(e){return e.slice(0,7)}function Bi(e,t,r=wc){let n=vc(t,r),a=[],i=[];for(let u of e)!u.key||u.key<=n?a.push(u):i.push(u);let s=new Map;for(let u of i){let c=$i(u.key),f=s.get(c);f?f.push(u):s.set(c,[u])}let l=$i(t),p=[...s.entries()].sort(([u],[c])=>u.localeCompare(c)).map(([u,c])=>({key:u,days:c,partial:u===l}));return{near:a,months:p}}function vc(e,t){let[r,n,a]=e.split("-").map(Number),i=new Date(r,(n||1)-1,(a||1)+t);return Ue(i)}function xr(e,t=Ue()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,p)=>{let u=p.toLowerCase();if(u==="today")r=t;else if(u==="tomorrow"){let c=new Date(`${t}T00:00:00`);c.setDate(c.getDate()+1),r=Ue(c)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var Fe={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},to:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},xc={open:Fe,get:Fe,"edit-fields":Fe,add:Fe,complete:Fe,done:Fe,reopen:Fe,cancel:Fe,pause:Fe,status:Fe,edit:Fe,"open-page":{type:"null"},search:{type:"array",items:Fe,maxItems:20},list:{type:"array",items:Fe,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:Fe,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},ve=e=>typeof e=="string"?e:"",Zi=e=>ve(e?.query).trim(),Sr=["normal","low","medium","high"];function oo(){return new Date().toISOString()}function Hi(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Wi(e){let t=e.trim();if(!t)return;let r=xo(He(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function qi(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return Hi();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),Hi(t)}return e}function kc(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function kr(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Kn(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var Tr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=Zi(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Oo(e,t,r){let n=Kn(await ut(),e),a=t(n),i=await zn(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await Do(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Do(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function Yi(e){return Oo(e,t=>({...t,completed:!0,status:"completed",updatedAt:oo()}),t=>`Complete \u201C${t.title}\u201D`)}var Pt={type:"string"},Xi={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Pt])),priority:{type:"string",enum:Sr},status:{type:"string",enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Pt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Pt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Tc(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in Xi.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!Sr.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!st().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function Sc(e,t,r){let a=(await ut()).find(l=>l.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!Ee(He()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=Ao({...a,...t,...t.status?Ae(t.status):t.completed!==void 0?Ae(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:oo()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let l of["urls","attachments"])if(t[l]?.some(p=>!i[l]?.includes(p)))throw new Error(`Invalid task ${l}.`);let s=await zn(e,i,a.updatedAt);if(!s)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await Do(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Do(e,s))throw new Error("Could not reapply the task edit.")}}}}async function tt(e){let t=e??{},r=t.id??t.query,n={groups:He(),statuses:st()};if(!r)return n;let a=await ut(),i=Kn(a,r);return{...n,records:[i]}}function Ji(e){let t=n=>{let a=xc[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Pt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=ve(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await Xe(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Le().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Pt},required:["id"],additionalProperties:!1},parse:n=>{let a=ve(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await Xe(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Pt,values:Xi,expectedUpdatedAt:Pt},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=ve(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:Tc(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>Sc(n,a,i),revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"open-page",label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=ve(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:ve(a.due),priority:ve(a.priority),status:ve(a.status),note:ve(a.note),group:ve(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:l,group:p})=>{let u=st();if(s&&!u.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${u.join(", ")}`);let c=Ao({title:n,priority:i||"normal",status:s||void 0,dueDate:qi(a),note:l,group:Wi(p)});if(!await It(c))throw new Error("Failed to add todo.");return{value:c,revert:{label:`Add todo \u201C${c.title}\u201D`,run:async()=>{await Ct(c.id)},reapply:async()=>{await It(c)}}}},formatCli:n=>`Added: ${kr(n)}`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Tr,run:({query:n})=>Yi(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Tr,run:({query:n})=>Yi(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=Zi(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>(await ut()).filter(a=>Nt(n,a.tags,a.title,a.note)).slice(0,20),formatCli:n=>n.length?n.map(kr).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Tr,run:({query:n})=>Oo(n,a=>({...a,completed:!1,status:"open",updatedAt:oo()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>tt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Tr,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!ni(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return Oo(a,s=>({...s,...Ae(i),updatedAt:oo()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>tt(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=ve(a.query).trim(),s=ve(a.status),l=st();if(!i||!l.includes(s))throw new Error(`Usage: todo status "<id or title>" <${l.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>Oo(n,i=>({...i,...Ae(a),updatedAt:oo()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=ve(a.query).trim(),s=ve(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!Sr.includes(s))throw new Error(`Invalid priority "${s}". One of: ${Sr.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?kc(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:l,tags:p,group:u})=>Oo(n,c=>({...c,title:a??c.title,priority:i??c.priority,dueDate:s===void 0?c.dueDate:qi(s),note:l??c.note,tags:p??c.tags,group:u===void 0?c.group:Wi(u),updatedAt:oo()}),c=>`Edit \u201C${c.title}\u201D`),formatCli:n=>`Edited: ${kr(n)}`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=ve(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await ut(),s=Kn(i,n);if(!a)return{value:{deleted:!1,todo:s,deletedCount:0},revert:null};if(!await Ct(s.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:s,deletedCount:1},revert:{label:`Delete \u201C${s.title}\u201D`,run:async()=>{await It(s)},reapply:async()=>{await Ct(s.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>tt(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:ve(a.section),q:ve(a.q)}},fromCli:(n,a)=>({section:ve(a.section),q:ve(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await ut();return a&&(i=i.filter(s=>Nt(a,s.tags,s.title,s.note))),n&&to.includes(n)?Lo(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(kr).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await ut(),a=He();return Ee(a).map(i=>({name:i,count:n.filter(s=>te(s.group??"")===te(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var Qi={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var Ec=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Dc=/^-\s+(.*)$/,Ic=/^[A-Za-z][\w+.-]*:\/\//;function es(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(Dc);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=Ic.test(a)?null:a.match(Ec);if(s){let l=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function ts(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Un="notes-todo-fence-styles";function Cc(){if(document.getElementById(Un))return;let e=document.createElement("style");e.id=Un,e.textContent=`
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
`,document.head.appendChild(e)}var os=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},Nc=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function Lc(e,t){let r=os(),n=Nc(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Oc=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let c=ke(),f=!0,h=()=>{ct(c).then(E=>{c.assertActive(),f&&r(E)}).catch(()=>{})};h();let y=Zt(h);return()=>{f=!1,y()}},[]);let n=es(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:ts(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=Lc(t,s),p=os(),u=c=>{let f={...c,completed:!c.completed,status:c.completed?"open":"completed"};r(h=>h&&h.map(y=>y.id===c.id?f:y)),Xt(c.id,f)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:c=>m.workspace.openMainTab({newTab:m.ui.hasModKey(c)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(c=>o.createElement("div",{key:c.id,className:`todo-fence-row ${c.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:c.completed,onChange:()=>u(c),"aria-label":c.title}),c.priority!=="normal"&&o.createElement("span",{className:`pri pri-${c.priority}`},Ye.find(f=>f.id===c.priority)?.symbol),o.createElement("span",{className:"t"},c.title),c.tags.slice(0,2).map(f=>o.createElement("span",{key:f,className:"tag"},"#",f.replace(/^#/,""))),c.dueDate&&o.createElement("span",{className:`due ${!c.completed&&c.dueDate<p?"overdue":""}`},c.dueDate))))};function rs(){let e=m.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Cc(),r.classList.add("todo-fence"),m.ui.renderReact(r,o.createElement(Oc,{code:t}))),{examples:Qi.todo});return()=>{e(),document.getElementById(Un)?.remove()}}var Q=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),pt=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Pc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),_c=e=>o.createElement(pt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),Mc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Fc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),zc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Rc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),$c=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),jc={inprogress:Mc,waiting:Fc,onhold:_c,delegated:zc,deferred:Rc,completed:$c,canceled:Pc},Ie=({status:e,dotCls:t})=>{let r=e?jc[e]:void 0;return r?o.createElement(r,{className:`todo-status-menu-svg ${t}`}):o.createElement("span",{className:`todo-status-menu-dot ${t}`})},Ve=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),Ar=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),xe=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Er=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),ns=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),as=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),is=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Dr=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),Ir=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Po=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),_o=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),ss=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),ds=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),ls=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),ot=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),ze=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),cs=e=>o.createElement(pt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),us=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Cr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),rt=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),Nr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),ps=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),ms=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),Mo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),_t=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),fs=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),ro=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),gs=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Lr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),mt=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),Or=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),hs=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),ys=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),bs=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Fo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),zo=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),no=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),Pr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Ro=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),_r=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"}));function $o(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;m.links.open({category:"location",value:t})}var Mr=({value:e,onChange:t,disabled:r=!1})=>{let n=m.ui.ResourcePicker;return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-input-slot"},o.createElement(n,{className:"todo-location-input",disabled:r,value:e?.name??"",placeholder:d("todo.locationPlaceholder"),ariaLabel:d("todo.location"),kinds:["place"],allowCustom:!0,onChange:(a,i)=>{let s=Number(i?.metadata?.longitude),l=Number(i?.metadata?.latitude);t(a?{name:a,...Number.isFinite(s)&&Number.isFinite(l)?{lng:s,lat:l}:{}}:void 0)}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>$o(e)},o.createElement(gs,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onClick:()=>{t(void 0)}},o.createElement(xe,null)))))};var Te={kind:"smart",id:"all"},Fr=[{id:"scheduled",labelKey:"todo.view.scheduled",color:we("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:we("primary-blue"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:we("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:we("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:we("green"),dated:!1}],ws=Fr.map(e=>e.id);function Vn(e){let t=e&&typeof e=="object"?e:{},r=[];for(let i of Array.isArray(t.order)?t.order:[])typeof i=="string"&&ws.includes(i)&&!r.includes(i)&&r.push(i);for(let i of ws)r.includes(i)||r.push(i);let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(i=>n.includes(i));return a.length===r.length&&a.shift(),{order:r,hidden:a}}function vs(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>gt(t))}function gt(e){return Fr.find(t=>t.id===e)??Fr[3]}function xs(e,t,r=De(new Date)){if(t.kind==="groups")return e.group?new Set(t.names.map(te)).has(te(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function zr(e,t,r,n=De(new Date)){return xs(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function ks(e,t,r=De(new Date)){return e.filter(n=>{if(!n.completed)return!1;if(t.kind==="groups")return xs(n,t,r);if(t.kind==="tag")return(n.tags??[]).some(a=>a.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!n.group;switch(t.id){case"scheduled":return!!n.dueDate;case"today":return!!n.dueDate&&n.dueDate.slice(0,10)<=r;case"flagged":return!!n.flagged;default:return!0}}).length}function Ts(e,t=De(new Date)){let r={scheduled:0,today:0,flagged:0,all:0,completed:0};for(let n of e){if(n.completed){r.completed++;continue}r.all++,n.flagged&&r.flagged++;let a=n.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=t&&r.today++)}return r}function Rr(e,t){let r=t===null?null:te(t);return e.filter(n=>!n.completed&&(r===null?!n.group:te(n.group??"")===r)).length}function ft(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Gc=Fr.map(e=>e.id);function Bn(e){if(typeof e!="string")return Te;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Te}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Te}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Te;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Te}catch{return Te}return Gc.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Te}function $r(e,t){return ft(e)===ft(t)}var Kc="todo.view",Uc="todo.showCompleted",Vc="todo.statusFilter",Bc="todo.search",Hc="todo.pageSort",Yn="panelChip",As="pageShowCompleted",Hn="statusFilter",Zn="dateBreakdown",Es="smartLists",jo="pageSearch",Ds="pageSort",Wc={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Is=["due","priority","flagged","updated","created","name"];function Ss(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Is.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Vt(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function Kr(e){let t=Wc[e],r=o.useCallback(()=>Ss(m.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>m.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(l=>{let p=Ss({...l,...s});return m.settings.set(t,p),p})},[t]);return[n,i]}function jr(){let e=m.settings.get()[Zn];return e==="weekly"||e==="daily"?e:"monthly"}function Ur(){let[e,t]=o.useState(jr);return o.useEffect(()=>m.settings.subscribe(()=>t(jr())),[]),e}function ao(){return m.runtime.getOrCreate(Kc,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function Vr(){return m.runtime.getOrCreate(Uc,()=>({show:null,listeners:new Set}))}function Br(){return m.runtime.getOrCreate(Vc,()=>({filter:null,listeners:new Set}))}function Go(){return m.runtime.getOrCreate(Bc,()=>({query:null,listeners:new Set}))}function Hr(){return m.runtime.getOrCreate(Hc,()=>({value:null,listeners:new Set}))}function Mt(){let e=ao();return e.view||(e.view=Bn(m.settings.get()[Yn]),e.history=[e.view],e.historyIndex=0),e.view}function Pe(e){let t=ao();if(Mt(),t.view&&$r(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,m.settings.set(Yn,ft(e));for(let n of t.listeners)n(e)}function Wr(){let e=ao();return Mt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function io(e){let t=ao();Mt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],m.settings.set(Yn,ft(t.view));for(let n of t.listeners)n(t.view)}}function Xn(e){let t=ao();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function Cs(){let e=ao();e.view=null,e.history=[],e.historyIndex=-1,Vr().show=null,Br().filter=null,Go().query=null,Hr().value=null}function Ko(){return Vn(m.settings.get()[Es])}function Ns(e){m.settings.set(Es,Vn(e))}function Ls(){let[e,t]=o.useState(Ko);return o.useEffect(()=>m.settings.subscribe(()=>t(Ko())),[]),e}function Os(e){let t=Go(),r=e.slice(0,500);if(t.query!==r){t.query=r,m.settings.set(jo,r);for(let n of t.listeners)n(r)}}function qr(){let e=()=>{let n=Go();return n.query===null&&(n.query=typeof m.settings.get()[jo]=="string"?String(m.settings.get()[jo]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=Go();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,Os]}function Jn(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||Is.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function Ps(){let e=Hr();return e.value||(e.value=Jn(m.settings.get()[Ds])),e.value}function _s(e){let t=Hr(),r=Jn(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,m.settings.set(Ds,r);for(let n of t.listeners)n(r)}}function Ms(){let[e,t]=o.useState(Ps);return o.useEffect(()=>{let r=Hr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,_s]}function Yr(){return{v:1,view:ft(Mt()),showCompleted:qn(),statusFilter:Gr(),search:Go().query??(typeof m.settings.get()[jo]=="string"?String(m.settings.get()[jo]).slice(0,500):""),sort:Ps()}}function Zr(e){return e.v!==1?!1:(Pe(Bn(e.view)),Rt(e.showCompleted===!0),Wn(Vt(e.statusFilter)),Os(typeof e.search=="string"?e.search:""),_s(Jn(e.sort)),!0)}function Gr(){let e=Br();if(e.filter===null){let t=m.settings.get()[Hn];e.filter=Vt(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&m.settings.set(Hn,e.filter)}return e.filter}function Wn(e){let t=Br(),r=Vt(e),n=t.filter??Gr();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,m.settings.set(Hn,r);for(let a of t.listeners)a(r)}}function Ft(){let[e,t]=o.useState(Gr);return o.useEffect(()=>{let r=Br();r.listeners.add(t);let n=m.settings.subscribe(()=>{let a=Vt(r.filter??Gr());Wn(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,Wn]}function zt(){let[e,t]=o.useState(Mt);return o.useEffect(()=>Xn(t),[]),e}function qn(){let e=Vr();return e.show===null&&(e.show=m.settings.get()[As]===!0),e.show}function Rt(e){let t=Vr();if(t.show!==e){t.show=e,m.settings.set(As,e);for(let r of t.listeners)r(e)}}function ht(){let[e,t]=o.useState(qn);return o.useEffect(()=>{let r=Vr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Rt(!qn())]}function zs(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=m.interop.services.providers(St).find(n=>n.owner===m.pluginId)?.providerId;return m.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var qc=["normal","low","medium","high"];function Rs(e,t){return e&&qc.includes(e)?e:t}function Yc(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Zc(e,t){return e.dueDate?{badges:Yc(e),icon:"list-todo",id:e.id,documentRef:{pluginId:m.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Re(e.group,t)}:{}}:null}function Xc(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Rs(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ae(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Xr(e){return Xe(e)}function Fs(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var Qn="attachment:",ea="url:";function Jc(){return!0}function Qc(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Fs(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${Qn}${i}`,label:Fs(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${ea}${i}`,label:i,icon:"link"}))}),e.location&&Jc()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function eu(e,t){if(t.startsWith(Qn)){let r=t.slice(Qn.length);return(e.attachments??[]).includes(r)?(m.workspace.openFile(r),!0):!1}if(t.startsWith(ea)){let r=t.slice(ea.length);if(!(e.urls??[]).includes(r))return!1;let n=qt(r);return n?m.workspace.openFile(n):m.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await m.workspace.revealOwnPanel("left_sidebar"),Pe(e.completed?{kind:"smart",id:"completed"}:Te),Le().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(m.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?($o(e.location),!0):!1;default:return!1}}function $s(){let e=ke(),t=Dt("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:u,endDate:c,limit:f,cursor:h})=>{let y,E=()=>`${t}:${r}`;if(h){let C;try{C=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!C||C.startDate!==u||C.endDate!==c||C.limit!==f||C.revision!==E()||typeof C.cursor!="string"||!C.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");y=C.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let P=E(),_=await Ni(u,c,f,y);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&P!==E())throw new Error("Calendar source cursor is stale; restart the range.");let O=He(),b=E();return{items:_.todos.map(C=>Zc(C,O)).filter(C=>!!C),revision:b,..._.cursor?{cursor:JSON.stringify({startDate:u,endDate:c,limit:f,revision:b,cursor:_.cursor})}:{}}},create:async(u,c)=>{if(c.endDate&&c.endDate!==u)return!1;let f=c.title?.trim();if(!f)return!1;let h=new Date().toISOString();return yr({id:Dt("todo"),title:f,completed:c.completed??!1,priority:Rs(c.priority,"normal"),dueDate:u,startTime:c.startTime,endTime:c.endTime,note:c.note??"",location:c.location,urls:c.urls,attachments:c.attachments,group:c.group,tags:c.tags??[],filePath:c.filePath,createdAt:h,updatedAt:h})},update:async(u,c)=>{let f=await Xr(u);return f&&c.endDate&&c.endDate!==(c.date??f.dueDate)?!1:f?Xt(f.id,Xc(f,c),f.updatedAt):!1},remove:u=>br(u),open:async u=>{let c=await Xr(u);await m.workspace.revealOwnPanel("left_sidebar"),c&&(Pe(c.completed?{kind:"smart",id:"completed"}:Te),Le().request(c.id,"focus"))},configure:()=>m.workspace.openOwnSettings(),actions:async u=>{let c=await Xr(u);return c?Qc(c):[]},runAction:async(u,c)=>{let f=await Xr(u);return f?eu(f,c):!1}},i=()=>{m.interop.state.publish(yo,++r)};m.interop.state.publish(yo,r);let s=Ei(i),l=Li(i),p=m.interop.services.provide(St,a);return()=>{n=!1,s(),l(),p(),m.interop.state.publish(yo,null)}}var ta=e=>typeof e=="string"?e:"";function js(e){let t=ta(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Gs(e){let t={cardKind:"todo",open:async(r,n)=>{if(ta(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ta(r.id)}),!0;let a=js(r.filePath)||js(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(yn,t)}function yt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>m.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,m.getState,m.getState)}function Jr(){let e=o.useCallback(i=>m.interop.state.subscribe(Qo,i),[]),t=o.useCallback(()=>m.interop.state.get(Qo),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function Ks(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let l=new Set(r.current);s?l.add(i):l.delete(i),r.current=l,t(l)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var tu="todo.sharedTodos";function oa(){return m.runtime.getOrCreate(tu,()=>({todos:[],listeners:new Set}))}function ge(){return oa().todos}function nt(e){let t=oa();t.todos=e;for(let r of t.listeners)r(e)}function bt(e){let t=oa();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function wt(){return m.workspace.openOwnSettings(),Promise.resolve()}var ra={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1},Us=[En.find(e=>e.id==="completed"),...En.filter(e=>e.id!=="completed")];function $t(){return m.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function Vs(){for(let e of $t().listeners)e()}function na(e){$t().actions=e,Vs()}function aa(e,t){e?$t().selected.set(t,e):$t().selected.delete(t),Vs()}function ou(e){let t=Yr(),r=ge().find(n=>n.id===$t().selected.get(e));return{title:d("manifest.name"),view:t,actions:$t().actions??[],...r?{item:{id:r.id,title:r.title,state:{...t,todoId:r.id}}}:{},navigation:{...Wr(),goBack:()=>io(-1),goForward:()=>io(1)}}}function ru(e){let t=$t().listeners;t.add(e);let r=bt(e),n=Xn(e),a=m.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function nu(e,t,r=!1){if(typeof e.todoId=="string"&&!await Xe(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Zr(e))throw new Error("Unsupported To-Do bookmark.");aa(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Le().request(e.todoId,"focus")}function au({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(ot,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},Us.map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,d(i.labelKey)),o.createElement("span",null,r.filter(s=>je(s)===i.id).length)))))}function iu(){let e=o.useSyncExternalStore(bt,ge,ge),t=We(),r=zt(),n=r.kind==="smart"?d(gt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...Us.map(a=>[d(a.labelKey),e.filter(i=>je(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...Ee(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(l=>a===null?!l.group:te(l.group??"")===te(a)),s=a??d("todo.chip.noGroup");return o.createElement(au,{key:a??"ungrouped",label:s,color:a?Me(Re(a,t)):"var(--text-tertiary)",todos:i})})))}function su(){let e=o.useSyncExternalStore(bt,ge,ge),t=We(),r=zt();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(Uo,{embedded:!0,todos:e,groups:t,names:Ee(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>Pe(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Te),onOpenSettings:wt}))}function Bs(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>xn(e,{id:`todo.${n}`,surface:n,getSnapshot:()=>ou(n),subscribe:ru,restore:(a,i,s)=>nu(a,n,s?.background)},{stateSchema:ra,itemStateSchema:{...ra,required:[...ra.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(er,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await Xe(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(iu,null)})),r.push(e.interop.extensions.provide(er,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>He().map(n=>({id:n.id,label:n.name,value:ge().filter(a=>te(a.group??"")===te(n.name)).length,readOnly:!0})),render:()=>o.createElement(su,null)})),()=>r.forEach(n=>n())}function Hs(e,t,r){let n=new Date().toISOString();return{id:Dt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function Ws(e,t){let r=e.trim();if(!r)return;let n=t.trim();return n?`${r}T${n}`:r}function qs(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function so(e,t,r="main_workspace"){let n=o.useRef(ke()).current,[a,i]=o.useState(ge()),[s,l]=o.useState(null),[p,u]=o.useState(null),[c,f]=o.useState(null),[h,y]=o.useState(!0),[E,P]=o.useState(0),[_,O]=o.useState(!1),{pendingIds:b,isPending:C,setPending:v}=Ks(),F=o.useRef(!1),R=o.useRef(0),q=o.useRef({sortField:e,sortDir:t});q.current={sortField:e,sortDir:t};let G=o.useRef([]),N=o.useMemo(()=>{let A=new Map(a.map(g=>[g.id,g])),Z=new Set(G.current),J=[];for(let g of G.current){let M=A.get(g);M&&J.push(M)}for(let g of a)Z.has(g.id)||J.push(g);return J},[a,E]),Y=o.useCallback(A=>{let Z=++R.current;A&&y(!0),ct(n).then(J=>{if(n.assertActive(),Z===R.current){if(A){let{sortField:g,sortDir:M}=q.current;G.current=Qt(J,g,M).map(I=>I.id)}else{let g=new Set(J.map(U=>U.id)),M=G.current.filter(U=>g.has(U)),I=new Set(M),{sortField:w,sortDir:D}=q.current,L=Qt(J.filter(U=>!I.has(U.id)),w,D).map(U=>U.id);G.current=[...L,...M]}nt(J),y(!1)}}).catch(()=>{Z===R.current&&y(!1)})},[n]);o.useEffect(()=>(Y(!0),()=>{R.current++}),[Y]),o.useEffect(()=>Zt(()=>Y(!1)),[Y]);let ae=o.useRef(!0);o.useEffect(()=>{if(ae.current){ae.current=!1;return}G.current=Qt(ge(),e,t).map(A=>A.id),P(A=>A+1)},[e,t]),o.useEffect(()=>bt(A=>i(A)),[]);let ne=o.useCallback(()=>l(null),[]),pe=o.useCallback(A=>{aa(A,r),f(A)},[r]),S=o.useCallback(()=>f(null),[]),K=o.useCallback(async(A,Z,J)=>{if(F.current)return null;let g=A.trim();if(!g)return null;let M={...Hs(g,Z),...J?.patch};F.current=!0,O(!0),G.current=[M.id,...G.current],nt([M,...ge()]),l(M.id);let I=()=>{G.current=G.current.filter(w=>w!==M.id),nt(ge().filter(w=>w.id!==M.id)),l(w=>w===M.id?null:w)};try{let w=await yr(M);return w||I(),w?M:null}catch{return I(),null}finally{F.current=!1,O(!1)}},[]),oe=o.useCallback(async(A,Z,J)=>{if(C(A))return!1;let g=ge().find(I=>I.id===A);if(!g)return!1;let M={...g,...Z,updatedAt:new Date().toISOString()};v(A,!0),nt(ge().map(I=>I.id===A?M:I));try{return await Xt(A,M,g.updatedAt,J)?!0:(nt(ge().map(w=>w.id===A?g:w)),!1)}catch{return nt(ge().map(I=>I.id===A?g:I)),!1}finally{v(A,!1)}},[C,v]),re=o.useCallback(async A=>{if(C(A))return;let Z=ge().find(g=>g.id===A);if(!Z)return;v(A,!0),G.current=G.current.filter(g=>g!==A),nt(ge().filter(g=>g.id!==A)),l(g=>g===A?null:g),c===A&&f(null);let J=()=>{G.current.includes(A)||G.current.push(A),ge().some(g=>g.id===A)||nt([...ge(),Z])};try{await br(A)||J()}catch{J()}finally{v(A,!1)}},[c,C,v]);return{todos:a,loading:h,ordered:N,lastCreatedId:s,clearLastCreated:ne,menuId:p,setMenuId:u,editingId:c,openDetail:pe,closeDetail:S,pendingIds:b,creating:_,create:K,patchTodo:oe,removeTodo:re}}function ia({value:e,onChange:t,timed:r=!0,time:n="",onTimeChange:a,defaults:i=!1}){let{NumberField:s,SelectField:l,Button:p,TimeField:u}=m.ui.settings,[c,f]=o.useState({}),[h,y]=o.useState(!1),E=e===void 0?"default":e.length?"custom":"off",P=_=>{let O=_.some(b=>!Number.isInteger(b)||b<0||b>10080)||new Set(_).size!==_.length;y(O),O||t(_)};return o.createElement("div",{style:{display:"grid",gap:8}},o.createElement(l,{ariaLabel:d("reminders.title"),value:E,onChange:_=>{y(!1),f({}),t(_==="off"?[]:_==="default"?void 0:[10])},options:[...i?[]:[{value:"default",label:d("reminders.default")}],{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]}),e?.map((_,O)=>{let b=c[O]??(_>0&&_%60===0);return o.createElement("div",{key:O,style:{display:"flex",alignItems:"center",gap:8}},o.createElement(s,{min:0,max:b?168:10080,value:b?_/60:_,ariaLabel:d(b?"reminders.hours":"reminders.minutes"),onChange:C=>{C!==null&&P(e.map((v,F)=>F===O?C*(b?60:1):v))}}),o.createElement(l,{value:b?"hours":"minutes",ariaLabel:d("reminders.title"),options:[{value:"minutes",label:d("reminders.minutes")},{value:"hours",label:d("reminders.hours")}],onChange:C=>{f(v=>({...v,[O]:C==="hours"})),P(e.map((v,F)=>F===O?(b?_/60:_)*(C==="hours"?60:1):v))}}),o.createElement(p,{onClick:()=>{f({}),P(e.filter((C,v)=>v!==O))},"aria-label":d("reminders.remove")},"\xD7"))}),E==="custom"&&(e?.length??0)<16&&o.createElement(p,{onClick:()=>{let _=10;for(;e?.includes(_);)_+=5;P([...e??[],_])}},d("reminders.add")),!r&&E!=="off"&&a&&o.createElement(u,{value:n,onChange:a,ariaLabel:d("reminders.time")}),!r&&!n&&E!=="off"&&o.createElement("span",null,d("reminders.timeRequired")),h&&o.createElement("span",{role:"alert"},d("reminders.invalid")))}function Ys(){let[e,t]=o.useState(()=>m.settings.get().reminderOffsets??[10]);return o.useEffect(()=>m.settings.subscribe(()=>t(m.settings.get().reminderOffsets??[10])),[]),o.createElement(m.ui.settings.Section,{title:d("reminders.title")},o.createElement(ia,{value:e,defaults:!0,onChange:r=>{m.settings.set("reminderOffsets",r??[10])}}))}function sa({value:e,onChange:t,disabled:r}){let n=m.ui.ResourcePicker;return o.createElement(n,{value:e,onChange:t,kinds:["attachment"],placeholder:d("auto.e7de9576dc00"),disabled:r,ariaLabel:d("auto.8410192cbb1f"),allowCustom:!1})}var du=[".ttf",".otf",".woff",".woff2"],lu=[".csv"],cu=[".base"],uu=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],pu=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],mu=[...uu,...pu,".ico",".flavicon"];var fu=[".pdf"],gu=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],hu=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],yu=[".srt",".vtt",".ass"],bu=[".stl",".obj",".glb",".gltf"],wu=[".bin",".mtl"];function da(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var vu={type:"core",id:"valley"},$=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:vu,...a});function xu(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var ku=xu([[[".mermaid",".mmd"],$("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],$("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],$("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],$("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],$("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[du,$("font","font","font","media")],[[".epub",".mobi",".azw3"],$("ebook","ebook","ebook","documents")],[[".djvu"],$("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],$("comic","comic","comic","documents")],[[".md",".markdown"],$("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],$("text","text","text","notes")],[[".json"],$("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],$("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[lu,$("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[cu,$("base","base","fallback","data")],[mu,$("image","image","image","media",{information:["identity","dimensions","exif"]})],[fu,$("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[gu,$("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[hu,$("video","video","video","media",{information:["identity","media","video-codec"]})],[yu,$("text","subtitle","text","media")],[bu,$("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[wu,$("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],$("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],$("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],$("docx","word","opendocument","documents")],[[".ods"],$("csv","excel","opendocument","data")],[[".odp"],$("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],$("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],$("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],$("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],$("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],$("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],$("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],$("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],$("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],$("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],$("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],$("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],$("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],$("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],$("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],$("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],$("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],$("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],$("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],$("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],$("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],$("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],$("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],$("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],$("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],$("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],$("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],$("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Tu=$("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Su(e){return ku[da(e)]??Tu}function Vo(e){return Su(e).kind}var Zs="valley-vault",Xs="asset";function Qr(e){return`${Zs}://${Xs}/${encodeURIComponent(e)}`}var Au={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function Eu(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function la(e){let t=Au[Vo(e)];if(t)return d(t);let r=da(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var Du={image:hs,audio:ys,video:bs},Js=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=Vo(e),i=e.split("/").pop()??e,s=Du[a]??Or;o.useEffect(()=>{let c=!1;return m.vault.fileInfo(e).then(f=>{c||n(f?.size??null)}),()=>{c=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>m.vault.onChanged(()=>p(c=>c+1)),[]);let u=a==="image"?`${Qr(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:c=>m.workspace.openFile(e,void 0,{newTab:m.ui.hasModKey(c)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},la(e),r!==null&&` \xB7 ${Eu(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},u?o.createElement("img",{src:u,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},o.createElement(xe,null)))};function ca(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let u=o.useCallback(async()=>{if(i.current)return;let c=a.current;if(c!==null){a.current=null,i.current=!0;try{let f=await n.current(c);!f&&a.current===null&&(a.current=c),f?l.current=0:l.current+=1}catch{a.current===null&&(a.current=c),l.current+=1}finally{i.current=!1,a.current!==null&&l.current<3?s.current=window.setTimeout(()=>{u()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),u()},[u]),o.useCallback(c=>{a.current=c,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,u()},t)},[u,t])}function Iu({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let u=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:c=>l(c.target.value),onBlur:()=>{p.current=!1,u()},onKeyDown:c=>{c.key==="Enter"&&c.currentTarget.blur(),c.key==="Escape"&&(l(e),c.currentTarget.blur())}})}function Cu(e){let t=m.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Nu=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=m.ui.settings,[l,p]=o.useState(ge);o.useEffect(()=>bt(p),[]);let u=l.find(g=>g.id===e),c=Ci(e),f=We(),[h,y]=o.useState(!1),[E,P]=o.useState(""),[_,O]=o.useState(!1),[b,C]=o.useState(""),v=Cu(e),F=o.useSyncExternalStore(o.useCallback(g=>(v.listeners.add(g),()=>{v.listeners.delete(g)}),[v]),()=>v.value,()=>v.value),R=o.useCallback(g=>{v.value={...v.value,...g};for(let M of v.listeners)M()},[v]),q=F.title,G=g=>R({title:g}),N=()=>R({error:d("todo.error.saveDraft")});o.useEffect(()=>{v.revision||v.loadingRevision||(v.loadingRevision=m.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(g=>{g&&!v.revision&&(v.revision={expectedRevision:g.revision,vaultGeneration:g.vaultGeneration})}).catch(()=>{R({error:d("todo.error.saveDraft")})}).finally(()=>{v.loadingRevision=void 0}))},[v,e,R]);let Y=async g=>(v.revision||await v.loadingRevision,v.revision?t.patchTodo(e,g,v.revision):!1),ae=ca(async g=>{let M=g.trim()?await Y({title:g}):!0;return M&&v.value.title===g&&R({title:null,error:""}),M},500,N),ne=ca(async g=>{let M=await Y({note:g});return M&&v.value.note===g&&R({note:null,error:""}),M},500,N),pe=ca(async g=>{let M=JSON.parse(g),I=await Y({tags:M});return I&&JSON.stringify(v.value.tags)===g&&R({tags:null,error:""}),I},0,N);if(o.useEffect(()=>{!u&&!t.loading&&r()},[u,t.loading,r]),!u)return null;let S=g=>{Y(g).then(M=>{M||N()})},K=g=>{R({tags:g}),pe(JSON.stringify(g))},oe=g=>S({attachments:g.length?g:void 0}),re=g=>S({urls:g.length?g:void 0}),k=u.remindAt?.slice(0,10)??"",A=u.remindAt?.slice(11,16)??"",Z=(g,M)=>S({remindAt:Ws(g,M),reminderFiredAt:void 0}),J=Ee(f);return o.createElement(m.ui.Modal,{title:d("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{Io(u,t.removeTodo)}},d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-detail-content"},F.error&&o.createElement("p",{role:"alert"},F.error),o.createElement("div",{className:"todo-detail-title-row"},o.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:q??u.title,"aria-label":d("auto.c5e8306a511f"),onChange:g=>{G(g.target.value),ae(g.target.value)},onBlur:()=>{q===u.title&&G(null)},onKeyDown:g=>{g.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-detail-flag${u.flagged?" on":""}`,type:"button",onClick:()=>S({flagged:u.flagged?void 0:!0}),"aria-pressed":!!u.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(ze,null))),o.createElement("div",{className:"todo-detail-cols"},o.createElement("div",{className:"todo-detail-col"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.notes")),o.createElement("div",{className:"todo-detail-notes"},o.createElement("textarea",{className:"todo-detail-note-input",value:F.note??u.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.edit.notes"),rows:7,onChange:g=>{let M=g.target.value;R({note:M}),ne(M)}}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.tags")),o.createElement(m.ui.TagInput,{value:F.tags??u.tags??[],onChange:K})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(mt,null)," ",d("todo.attachments")),(u.attachments??[]).map(g=>o.createElement(Js,{key:g,relPath:g,onRemove:()=>oe((u.attachments??[]).filter(M=>M!==g))})),h?o.createElement(sa,{value:E,onChange:g=>{P(g),g&&((u.attachments??[]).includes(g)||oe([...u.attachments??[],g]),P(""),y(!1))}}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>y(!0)},o.createElement(Ve,null)," ",d("todo.addAttachment"))),o.createElement("div",{className:"todo-detail-block todo-detail-links-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(_t,null)," ",d("todo.links")),o.createElement("label",{className:"todo-linked-file-control"},o.createElement("span",null,d("todo.linkedFile")),o.createElement(sa,{value:u.filePath??"",onChange:g=>S({filePath:g.trim()||void 0})})),(u.urls??[]).map(g=>o.createElement("div",{className:"todo-detail-url-card",key:g},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:g,onClick:M=>{let I=qt(g);I?m.workspace.openFile(I,void 0,{newTab:m.ui.hasModKey(M)}):m.files.openExternalUrl(g)}},o.createElement(_t,null),o.createElement("span",null,g)),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:g}),onClick:()=>re((u.urls??[]).filter(M=>M!==g))},o.createElement(xe,null)))),_?o.createElement(Iu,{className:"todo-detail-link-input todo-detail-url",value:b,onCommit:g=>{let M=fr(g);M&&!(u.urls??[]).includes(M)&&re([...u.urls??[],M]),C(""),O(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>O(!0)},o.createElement(Ve,null)," ",d("todo.addWebAppLink")))),o.createElement("div",{className:"todo-detail-col todo-detail-rail"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.properties")),o.createElement("label",{className:"todo-detail-field","data-status":je(u)},o.createElement("span",{className:"todo-detail-label"},d("auto.bae7d5be7082")),o.createElement(a,{className:"todo-detail-select",value:je(u),onChange:g=>S(Ae(g==="open"?null:g)),ariaLabel:d("auto.bae7d5be7082"),options:st().map(g=>({value:g,label:Wt(g)}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.886cbff9d9df")),o.createElement("div",{className:"todo-detail-priority",role:"group","aria-label":d("auto.886cbff9d9df")},Ye.map(g=>o.createElement("button",{key:g.id,type:"button","aria-pressed":u.priority===g.id,title:d(g.labelKey),onClick:()=>S({priority:g.id})},g.symbol||d("todo.priorityNone"))))),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("todo.edit.group")),o.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:u.group??"",onChange:g=>S({group:g.trim()||void 0}),options:J.map(g=>({value:g,label:g})),ariaLabel:d("todo.edit.group"),clearLabel:d("todo.chip.noGroup"),allowCustom:!1}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.schedule")),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.145caf292855")),o.createElement(i,{className:"todo-detail-inline-date",value:u.dueDate,ariaLabel:d("auto.4c1aeebc433b"),onChange:g=>S({dueDate:g})})),o.createElement("div",{className:"todo-detail-times"},o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.88d8206d586a")),o.createElement(s,{className:"todo-detail-time-input",value:u.startTime??"",ariaLabel:d("auto.88d8206d586a"),onChange:g=>S({startTime:g||void 0})})),o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.cd7800da7f4f")),o.createElement(s,{className:"todo-detail-time-input",value:u.endTime??"",ariaLabel:d("auto.cd7800da7f4f"),onChange:g=>S({endTime:g||void 0})})))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("reminders.title")),o.createElement(ia,{value:u.reminderOffsets,onChange:g=>S({reminderOffsets:g,remindAt:void 0,reminderFiredAt:void 0}),timed:!!u.startTime,time:u.reminderTime,onTimeChange:g=>S({reminderTime:g})})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.remindMe")),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.onADay")),o.createElement("span",{className:"todo-detail-row-end"},k&&o.createElement(i,{className:"todo-detail-inline-date",value:k,ariaLabel:d("todo.remindDate"),clearable:!1,onChange:g=>Z(g,A)}),o.createElement(n,{checked:!!k,onChange:g=>Z(g?u.dueDate||Lu():"",g?A:""),label:d("todo.onADay")}))),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.atATime")),o.createElement("span",{className:"todo-detail-row-end"},A&&o.createElement(s,{className:"todo-detail-inline-input",value:A,ariaLabel:d("todo.remindTime"),clearable:!1,onChange:g=>Z(k,g)}),o.createElement(n,{checked:!!A,disabled:!k,onChange:g=>Z(k,g?"09:00":""),label:d("todo.atATime")}))),k&&o.createElement("p",{className:"todo-detail-hint"},d("todo.reminderAppOpenHint"))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Lr,null)," ",d("todo.location")),o.createElement(Mr,{value:u.location,onChange:g=>S({location:g})})),o.createElement("div",{className:"todo-detail-block todo-activity-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.activity")),c.length?o.createElement("ol",{className:"todo-activity-list"},[...c].reverse().map((g,M)=>o.createElement("li",{key:`${g.changedAt}:${M}`},o.createElement("span",null,Wt(g.from)," \u2192 ",Wt(g.to)),o.createElement("time",{dateTime:g.changedAt},new Date(g.changedAt).toLocaleString(m.ui.language()))))):o.createElement("p",{className:"todo-detail-hint"},d("todo.activity.empty")))))))};function Lu(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var lo=({c:e})=>e.editingId?o.createElement(Nu,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function Ou(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Pu(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let p=i+s>>>1;e[p].start+e[p].height<n?i=p+1:s=p}let l=i;for(s=e.length;i<s;){let p=i+s>>>1;e[p].start<=a?i=p+1:s=p}return[l,i]}function en(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[u,c]=e.useReducer(S=>S+1,0),[f,h]=e.useState({top:0,height:600}),[y,E]=e.useState(null),[P,_]=e.useState(null),O=e.useRef(null),b=e.useRef(null),C=e.useRef(null),v=e.useMemo(()=>{let S=0;return r.map((K,oe)=>{let re=p.current.get(K)??(typeof n=="number"?n:n(K,oe)),k={id:K,height:re,start:S};return S+=re,k})},[r,n,u]),F=v.length?v[v.length-1].start+v[v.length-1].height:0,R=e.useRef({rows:v,viewport:f});R.current={rows:v,viewport:f};let q=e.useCallback(()=>{let S=l.current,K=O.current;if(!S||!K)return;let oe=S.getBoundingClientRect(),re=K.getBoundingClientRect(),k=K.clientHeight||re.height||600,A=K===S?K.scrollTop:re.top-oe.top;h(Z=>Z.top===A&&Z.height===k?Z:{top:A,height:k})},[]),G=e.useCallback(()=>{b.current===null&&(b.current=(C.current??window).requestAnimationFrame(()=>{b.current=null,q()}))},[q]);e.useLayoutEffect(()=>{let S=l.current;if(!S||!s)return;let K=Ou(S);O.current=K;let oe=S.ownerDocument.defaultView??window;C.current=oe;let re=S.style.overflowAnchor;S.style.overflowAnchor="none";let k=!0,A=()=>{if(!k)return;let M=S.ownerDocument.activeElement,I=M instanceof HTMLElement?M:null;for(;I&&I.parentElement!==S;)I=I.parentElement;E(I?.dataset.visibleKey??null)},Z=()=>{queueMicrotask(A)};K.addEventListener("scroll",G,{passive:!0}),oe.addEventListener("resize",G),S.addEventListener("focusin",A),S.addEventListener("focusout",Z);let J=S.clientWidth,g=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{S.clientWidth!==J&&(J=S.clientWidth,p.current.clear(),c()),G()});return g?.observe(K),K!==S&&g?.observe(S),q(),()=>{k=!1,S.style.overflowAnchor==="none"&&(S.style.overflowAnchor=re),K.removeEventListener("scroll",G),oe.removeEventListener("resize",G),S.removeEventListener("focusin",A),S.removeEventListener("focusout",Z),g?.disconnect(),b.current!==null&&oe.cancelAnimationFrame(b.current),b.current=null,O.current=null,C.current=null}},[s,q,G]),e.useLayoutEffect(()=>{let S=new Set(r);for(let K of p.current.keys())S.has(K)||p.current.delete(K);q()},[r,q]),e.useLayoutEffect(()=>{p.current.clear(),c()},[i]),e.useLayoutEffect(()=>{let S=l.current;if(!S||!s)return;let K=k=>{let A=0,Z=!1,{rows:J,viewport:g}=R.current,M=new Map(J.map(I=>[I.id,I]));for(let I of k){let w=I.dataset.visibleKey,D=w?M.get(w):void 0,L=I.getBoundingClientRect().height;!w||!D||L<=0||Math.abs(L-D.height)<.5||(p.current.set(w,L),D.start+D.height<=g.top&&(A+=L-D.height),Z=!0)}if(Z){let I=O.current,w=S.closest('[data-visible-sections="true"]'),D=S;for(;D&&D.parentElement!==w;)D=D.parentElement;let L=w&&w!==S&&D&&I&&D.getBoundingClientRect().bottom<=I.getBoundingClientRect().top;A&&I&&!L&&(I.scrollTop+=A),c(),G()}},oe=Array.from(S.children).filter(k=>k.hasAttribute("data-visible-key")),re=typeof ResizeObserver>"u"?void 0:new ResizeObserver(k=>K(k.map(A=>A.target)));return oe.forEach(k=>re?.observe(k)),K(oe),()=>re?.disconnect()}),e.useLayoutEffect(()=>{if(!P)return;let S=Array.from(l.current?.children??[]).find(K=>K.dataset.visibleKey===P.id);S&&(S.scrollIntoView?.({block:"nearest"}),P.selector&&(S.matches(P.selector)?S:S.querySelector(P.selector))?.focus(),q(),_(null))},[P,v,q]);let N=e.useCallback((S,K)=>{_({id:S,selector:K})},[]),[Y,ae]=s?Pu(v,f):[0,v.length],ne=new Set;for(let S=Y;S<ae;S++)ne.add(S);let pe=new Set([...a,y,P?.id].filter(Boolean));return pe.size&&v.forEach((S,K)=>{pe.has(S.id)&&ne.add(K)}),{ref:l,show:N,render(S){let K=[],oe=0;for(let re of[...ne].sort((k,A)=>k-A)){let k=v[re];k.start>oe&&K.push(e.createElement("div",{key:`space:${k.id}`,"aria-hidden":!0,style:{height:k.start-oe,flex:"0 0 auto",pointerEvents:"none"}})),K.push(e.createElement(e.Fragment,{key:k.id},S(re))),oe=k.start+k.height}return F>oe&&K.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:F-oe,flex:"0 0 auto",pointerEvents:"none"}})),K}}}function Qs(e){return m.markdown.render(e,{inline:!0})}function ed({todo:e,c:t}){let[r,n]=o.useState({source:"",html:""}),a=o.useRef(null);o.useEffect(()=>{let s=!0;return m.markdown.render(e.note).then(l=>{s&&n({source:e.note,html:l})}).catch(()=>{s&&n({source:"",html:""})}),()=>{s=!1}},[e.note]),o.useEffect(()=>{a.current?.querySelectorAll("img.md-embed[data-embed], img.md-asset[data-src]").forEach(s=>{let l=s.dataset.embed??s.dataset.src??"",p=m.workspace.resolveWikilink(l);if(p&&Vo(p)==="image")s.src=Qr(p),s.loading="lazy";else{let u=s.ownerDocument.createElement("a");u.dataset.wikilink=l,u.textContent=s.alt||l,u.href="#",s.replaceWith(u)}})},[r]);let i=s=>{let l=s.target,p=l.closest("input.md-task-checkbox");if(p){s.stopPropagation();let h=e.note.split(`
`),y=Number(p.dataset.taskLine);if(!Number.isInteger(y)||!h[y]||t.pendingIds.has(e.id)){s.preventDefault();return}let E=p.checked;h[y]=h[y].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[^\]](\])/,`$1${p.checked?"x":" "}$2`),t.patchTodo(e.id,{note:h.join(`
`)}).then(P=>{!P&&p.isConnected&&(p.checked=!E)});return}let u=l.closest("a");if(!u)return;s.preventDefault(),s.stopPropagation();let c=u.dataset.wikilink,f=u.getAttribute("href")??"";if(c){let h=m.workspace.resolveWikilink(c);h&&m.workspace.openFile(h,void 0,{newTab:m.ui.hasModKey(s)})}else if(So(f))m.links.open(f);else if(f&&!/^[a-z][a-z\d+.-]*:/i.test(f)&&!f.startsWith("#")){let h=m.workspace.resolveWikilink(f);h&&m.workspace.openFile(h,void 0,{newTab:m.ui.hasModKey(s)})}};return o.createElement("div",{ref:a,className:"todo-notes",onClick:i,...r.source===e.note?{dangerouslySetInnerHTML:{__html:r.html}}:{children:e.note}})}var _u={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Mu=["tomorrow","weekend","pick"];function Fu(e=De(new Date)){let t=vr(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return eo(e,n)}function tn(e,t=De(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?eo(t,1):s==="weekend"?Fu(t):null,a=new Set,i=[];for(let s of Mu){let l=n(s);if(l!==null){if(l===r||a.has(l))continue;a.add(l)}i.push({id:s,labelKey:_u[s],date:l})}return i}var td=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>{let l=je(e);return o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:p=>{p.stopPropagation(),r(e.id);let u=tn(e.dueDate??"",De(new Date));m.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(rt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Ht().map(c=>({label:d(c.labelKey),icon:o.createElement(Ie,{status:c.status,dotCls:c.cls}),type:"radio",checked:c.status===null?l==="open":l===c.status,onSelect:()=>a(Ae(c.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(no,{className:"todo-menu-action-icon"}),enabled:!s,submenu:u.filter(c=>c.date).map(c=>({label:d(c.labelKey),icon:c.id==="tomorrow"?o.createElement(Ro,{className:"todo-menu-action-icon"}):c.id==="weekend"?o.createElement(_r,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:c.date})}))},{label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(ze,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:()=>a({flagged:e.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(cs,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Ye.map(c=>({label:hi(c.id),type:"radio",checked:e.priority===c.id,onSelect:()=>a({priority:c.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Cr,{className:"todo-menu-action-icon"}),enabled:!s,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>a({group:void 0})},...t.map(c=>({label:c,type:"radio",checked:e.group===c,onSelect:()=>a({group:c})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(us,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:n},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(Nr,{className:"todo-menu-action-icon"}),enabled:!s,danger:!0,onSelect:i}],{anchor:p.currentTarget,align:"end"}).finally(()=>r(null))}},o.createElement(as,null)))};function zu(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Ru(e,t=.998){return e/1e3*t/(1-t)}function od(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function rd(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+zu(n-t,a,.2))}function nd(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,Ru(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function ad(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/a)**2,p=2*i*Math.sqrt(l),u=t+(-l*(e-r)-p*t)*s,c=e+u*s,f=Math.abs(c-r)<.5&&Math.abs(u)<20;return{value:f?r:c,velocity:f?0:u,done:f}}function ua(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*s<=i+(r?24:0),p=l?s:48,u=Math.min(n*p,Math.max(i,n*32)),c=a?Math.min(Math.max(e*.8,u+56),e-24):u+56;return{buttonWidth:p,labelled:l,openWidth:u,commitPoint:c}}var id=.22,sd=.18,$u=.8,on=.9,ju=400,Gu=80,Ku=10,Uu=5,Vu=4,Bu=3,Hu=.5,Wu=6,qu=["left","right"],dd={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Yu(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function Zu(e,t){let r={today:o.createElement(Ro,null),tomorrow:o.createElement(Ro,null),weekend:o.createElement(_r,null),pick:o.createElement(no,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var Ho=null;function ld(e){if(Ho===e)return;let t=Ho;Ho=e,t?.close()}function cd(e){Ho===e&&(Ho=null)}var co;function ud(e,t){if(co===void 0)try{co=document.createElement("canvas").getContext("2d")}catch{co=null}return co?(co.font=t,co.measureText(e).width):e.length*7}var Xu=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,Bo=e=>e>0?"left":e<0?"right":null,pd=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),u=o.useRef(null),c=o.useRef(null),f=o.useRef([]),h=o.useRef(!1),y=o.useRef(null),E=o.useRef(null),P=o.useRef({velocity:0,target:0,response:id,damping:on}),_=o.useRef({left:"",right:""}),O=o.useMemo(()=>Zu(tn(e.dueDate??"",De(new Date)),r),[e.dueDate,r]),b=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(ze,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(is,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(Nr,null),run:()=>r.remove()}],[r,e.flagged]),C={left:O,right:b},[v,F]=o.useState(()=>({rowWidth:0,left:dd,right:dd})),R=o.useRef(v);R.current=v;let q=()=>{let w=i.current?.querySelector(".todo-swipe-action");if(!w||typeof getComputedStyle!="function")return"13px sans-serif";let D=getComputedStyle(w);return`${D.fontWeight} ${D.fontSize} ${D.fontFamily}`},G=()=>{let w=i.current?.clientWidth??0,D=q(),L=R.current,U={rowWidth:w,left:ua(w,O.map(X=>ud(X.label,D)),L.left.labelled),right:ua(w,b.map(X=>ud(X.label,D)),L.right.labelled)};R.current=U;let ee=X=>L[X].openWidth!==U[X].openWidth||L[X].labelled!==U[X].labelled;return(L.rowWidth!==w||ee("left")||ee("right"))&&F(U),U},N=o.useRef(G);N.current=G,o.useEffect(()=>{N.current()},[O,b]);let Y=w=>{let D=Bo(w);return!D||D!==c.current?!1:Math.abs(w)>=R.current[D].commitPoint},ae=(w,D=!1)=>{p.current=w,D&&w!==0?ld(oe.current):w===0&&cd(oe.current);let L=i.current,U=s.current;if(!L||!U)return;U.style.transform=w?`translate3d(${w}px, 0, 0)`:"";let ee=Bo(w),X=R.current,he=Y(w);L.classList.toggle("open",w!==0),L.classList.toggle("committed",he);for(let fe of qu){let B=l.current[fe];if(!B)continue;let me=ee===fe;B.classList.toggle("committed",me&&he);let Be=me?he?"100%":`${Math.max(X[fe].openWidth,Math.abs(w))}px`:`${w===0?X[fe].openWidth:0}px`,Ce=`${Be}|${me}`;_.current[fe]!==Ce&&(_.current[fe]=Ce,B.style.width=Be,B.setAttribute("aria-hidden",String(!me)))}};o.useLayoutEffect(()=>ae(p.current));let ne=()=>{y.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(y.current),y.current=null},pe=(w,D,L,U)=>{if(ne(),w!==0&&ld(oe.current),p.current===w||Xu()||typeof requestAnimationFrame!="function"){ae(w);return}P.current={velocity:D,target:w,response:L,damping:U};let ee=0,X=he=>{let fe=ee?(he-ee)/1e3:.016666666666666666;ee=he;let B=P.current,me=ad(p.current,B.velocity,B.target,fe,B.response,B.damping);B.velocity=me.velocity,ae(me.value),y.current=me.done?null:requestAnimationFrame(X)};y.current=requestAnimationFrame(X)},S=o.useRef(()=>{});S.current=()=>{u.current=null,pe(0,0,sd,on)};let K=o.useCallback(()=>S.current(),[]),oe=o.useRef({close:()=>S.current()}),re=()=>{ne(),u.current=null,E.current!=null&&window.clearTimeout(E.current),E.current=null,ae(0)},k=o.useRef(re);k.current=re;let A=w=>{let D=R.current,L=Bo(w);if(!L)return 0;let U=u.current?.origin;if(U&&L!==U)return 0;let ee=D[L],X=L===c.current?ee.commitPoint:ee.openWidth;return rd(w,X,D.rowWidth)},Z=(w,D,L,U,ee)=>{ne(),G();let X=p.current,he=Bo(X),fe=Math.abs(X)>8?he:null;c.current=he&&Math.abs(X)>=R.current[he].openWidth-1?he:null,u.current=Yu(w,D,L,U,X,fe),f.current=[{x:X,t:ee}]},J=(w,D)=>{let L=u.current;!L||L.ended||(L.live||(L.live=!0,ne(),n?.()),f.current.push({x:w,t:D}),f.current.length>Wu&&f.current.shift(),ae(A(w),!0),Y(p.current)&&(L.crossed=!0))},g=w=>{let D=u.current;if(!D||D.ended)return;if(D.ended=!0,!D.live){u.current=null;return}let L=()=>{D.kind==="pointer"&&(u.current=null)},U=od(f.current),ee=p.current,X=Bo(ee);if(!X){L(),ae(0);return}let he=R.current[X],fe=w&&Y(ee),B=nd({offset:ee,velocity:U,openWidth:he.openWidth,committed:fe});if(L(),B.commit){let me=X==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Be=i.current?.querySelector(me),Ce=C[X],x=X==="left"?Ce[0]:Ce[Ce.length-1];pe(0,U,sd,on),x?.run(Be??i.current);return}pe(B.target,U,id,Math.abs(U)>ju?$u:on)};o.useEffect(()=>K(),[e.dueDate,e.flagged,K]),o.useEffect(()=>{let w=oe.current;return()=>{ne(),E.current!=null&&window.clearTimeout(E.current),cd(w)}},[]),o.useEffect(()=>{let w=i.current,D=w?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!w||!D)return;let L=0,U=new D(()=>{let ee=w.clientWidth,X=L!==ee;L=ee,N.current(),X&&p.current!==0&&k.current()});return U.observe(w),()=>U.disconnect()},[]);let M=o.useRef({disabled:t,begin:Z,move:J,end:g});M.current={disabled:t,begin:Z,move:J,end:g},o.useEffect(()=>{let w=i.current;if(!w)return;let D=()=>{E.current!=null&&window.clearTimeout(E.current),E.current=null},L=()=>{E.current=null,u.current?.kind==="wheel"&&(M.current.end(!0),u.current=null)},U=ee=>{let X=M.current;if(X.disabled||Math.abs(ee.deltaX)<=Math.abs(ee.deltaY)||ee.deltaX===0)return;ee.preventDefault();let he=ee.deltaMode===WheelEvent.DOM_DELTA_LINE?16:ee.deltaMode===WheelEvent.DOM_DELTA_PAGE?w.clientWidth:1,fe=-ee.deltaX*he,B=u.current;(!B||B.kind!=="wheel")&&(X.begin("wheel",-1,0,0,ee.timeStamp),B=u.current),D(),E.current=window.setTimeout(L,Gu);let me=Math.abs(fe),Be=B.previous;B.previous=me;let Ce=B.live&&(B.ended||B.origin!==null&&p.current===0),x=me>=Be+Uu,j=B.distance!==0&&Math.sign(fe)!==Math.sign(B.distance)&&me>=Vu;if(Ce&&(x||j)&&(X.end(!1),X.begin("wheel",-1,0,0,ee.timeStamp),B=u.current,B.previous=me),B.ended)return;if(B.decay=me<Be?B.decay+1:0,B.peak=Math.max(B.peak,me),B.distance+=fe,B.live&&B.peak>=Ku&&B.decay>=Bu&&me<B.peak*Hu){X.end(B.crossed);return}!B.live&&Math.abs(B.distance)<8||X.move(B.base+B.distance,ee.timeStamp)};return w.addEventListener("wheel",U,{passive:!1}),()=>{w.removeEventListener("wheel",U),D()}},[]);let I=(w,D)=>o.createElement("div",{ref:L=>{l.current[w]=L},className:`todo-swipe-tray todo-swipe-tray-${w} ${v[w].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${v[w].openWidth}px`}},D.map(L=>o.createElement("button",{key:L.key,type:"button",className:L.cls,tabIndex:-1,title:L.label,"aria-label":L.label,onClick:U=>{U.stopPropagation(),K(),L.run(U.currentTarget)}},L.icon,o.createElement("span",null,L.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:w=>{t||w.pointerType==="mouse"&&w.button!==0||w.target.closest(".todo-swipe-tray")||Z("pointer",w.pointerId,w.clientX,w.clientY,w.timeStamp)},onPointerMove:w=>{let D=u.current;if(!D||D.kind!=="pointer"||D.pointerId!==w.pointerId)return;let L=w.clientX-D.originX,U=w.clientY-D.originY;if(!D.live){if(Math.abs(U)>Math.abs(L)){w.currentTarget.hasPointerCapture?.(w.pointerId)&&w.currentTarget.releasePointerCapture(w.pointerId),u.current=null;return}if(Math.abs(L)<8)return;h.current=!0,w.currentTarget.setPointerCapture?.(w.pointerId)}w.preventDefault(),J(D.base+L,w.timeStamp)},onPointerUp:w=>{let D=u.current;!D||D.kind!=="pointer"||D.pointerId!==w.pointerId||(w.currentTarget.hasPointerCapture?.(w.pointerId)&&w.currentTarget.releasePointerCapture(w.pointerId),D.live&&J(D.base+(w.clientX-D.originX),w.timeStamp),g(!0))},onPointerCancel:w=>{let D=u.current;!D||D.kind!=="pointer"||D.pointerId!==w.pointerId||(w.currentTarget.hasPointerCapture?.(w.pointerId)&&w.currentTarget.releasePointerCapture(w.pointerId),K())},onClickCapture:w=>{let D=!!w.target.closest(".todo-swipe-tray");if(D&&(h.current=!1),h.current&&!D){h.current=!1,w.stopPropagation(),w.preventDefault();return}p.current&&!D&&(w.stopPropagation(),w.preventDefault(),K())}},O.length>0&&I("left",O),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),b.length>0&&I("right",b))};function md(e,t,r){let n=je(t);m.ui.openMenu(Ht().map(a=>({label:d(a.labelKey),icon:o.createElement(Ie,{status:a.status,dotCls:a.cls}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(Ae(a.status))})),{anchor:e})}var Ju=2,fd=({todo:e,groups:t,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let s=o.useRef(null);o.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[l,p]=o.useState("");o.useEffect(()=>{let k=!0;return p(""),Qs(e.title).then(A=>{k&&p(A)}).catch(()=>{k&&p("")}),()=>{k=!1}},[e.title]);let u=(k,A)=>m.workspace.openFile(k,void 0,{newTab:A}),c=Ye.find(k=>k.id===e.priority)??Ye[0],f=Ee(t),h=je(e),y=[e.filePath,...e.attachments??[]].filter(k=>!!k),[E,P]=o.useState(!1),_=E?y:y.slice(0,Ju),O=y.length-_.length,b=e.urls?.length??0,C=r&&y.length>0,v=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||b>0||C||e.status&&e.status!=="open"&&!$e(e.status).done||e.priority!=="normal"),F=n.pendingIds.has(e.id),R=De(new Date),q=e.dueDate&&!a?Fi(e.dueDate,R,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},m.ui.language(),m.getState().dateFormat):"",G=e.dueDate?Ke(e.dueDate,m.getState().dateFormat):"",N=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<R,Y=o.useRef(null),ae=o.useRef(null);o.useEffect(()=>ae.current?Ba(e.id,ae.current):void 0,[e.id]);let ne=o.useRef(null),pe=o.useRef(!1),S=o.useCallback(()=>{ne.current!=null&&(window.clearTimeout(ne.current),ne.current=null)},[]);o.useEffect(()=>S,[S]);let K=()=>{zs(e)||n.openDetail(e.id)},oe=k=>n.patchTodo(e.id,k),re=o.useMemo(()=>({reschedule:k=>{n.patchTodo(e.id,{dueDate:k})},pickDate:k=>{let{DateField:A}=m.ui.settings;m.ui.openPopover(Z=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(A,{value:e.dueDate,ariaLabel:d("todo.swipe.date"),onChange:J=>{n.patchTodo(e.id,{dueDate:J}),Z.close()}})),{anchor:k},{ariaLabel:d("todo.swipe.date")})},setStatus:k=>md(k,e,oe),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{Io(e,n.removeTodo)}}),[e,n]);return o.createElement(pd,{todo:e,disabled:F,actions:re,onEngage:S},o.createElement("article",{ref:ae,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,tabIndex:0,onKeyDown:k=>{if(k.target===k.currentTarget){if(k.key==="ArrowDown"||k.key==="ArrowUp"){k.preventDefault(),i?.(k.key==="ArrowDown"?1:-1);return}if(k.key==="Escape"){k.currentTarget.blur();return}k.key==="Enter"&&(k.preventDefault(),n.openDetail(e.id))}},onClick:k=>{k.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||k.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,K()},220))},onDoubleClick:k=>{s.current&&(clearTimeout(s.current),s.current=null),!k.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:Y,className:"todo-check","data-status":h,type:"checkbox",checked:h==="completed","aria-disabled":F||void 0,onPointerDown:()=>{F||(pe.current=!1,S(),ne.current=window.setTimeout(()=>{pe.current=!0;let k=Y.current;k&&m.ui.openMenu(Ht().map(A=>({label:d(A.labelKey),icon:o.createElement(Ie,{status:A.status,dotCls:A.cls}),type:"radio",checked:A.status===null?h==="open":A.status===h,enabled:!F,onSelect:()=>n.patchTodo(e.id,Ae(A.status))})),{anchor:k})},450))},onPointerUp:S,onPointerLeave:S,onClick:k=>{pe.current&&(k.preventDefault(),pe.current=!1)},onChange:k=>{n.patchTodo(e.id,Ae(k.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),h!=="open"&&h!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(Ie,{status:h,dotCls:$e(h).cls}))),o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,c.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},c.symbol," "),l?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:l}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement(ed,{todo:e,c:n}),(v||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:Me(Re(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!$e(e.status).done&&o.createElement("span",{className:`todo-status-text ${$e(e.status).cls}`},o.createElement(Ie,{status:e.status,dotCls:$e(e.status).cls}),Wt(e.status)),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Mo,null)),yi(e.priority)),q&&o.createElement("button",{className:`todo-date${N?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:G||q}),onClick:k=>{k.stopPropagation(),K()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(no,null)),o.createElement("span",{className:"todo-date-day"},q),G&&G!==q&&o.createElement("span",{className:"todo-date-full"},G)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ms,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:k=>{k.stopPropagation(),$o(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Lr,null)),e.location.name),C&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(mt,null)),y.length),b>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(_t,null),b>1&&b),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(ps,null),e.remindAt.slice(11,16)),!r&&e.tags?.map(k=>o.createElement("span",{key:k,className:"todo-tag-text"},"#",k)))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(ze,null)),o.createElement(td,{todo:e,groupNames:f,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:oe,onRequestDelete:()=>Io(e,n.removeTodo),disabled:F})),!r&&y.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},_.map(k=>o.createElement("button",{key:k,className:"todo-file-card",title:k,onClick:A=>{A.stopPropagation(),u(k,m.ui.hasModKey(A))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},k===e.filePath?o.createElement(Or,null):o.createElement(mt,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},qs(k)),o.createElement("span",{className:"todo-file-card-kind"},la(k))))),(O>0||E)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${E?" open":""}`,title:E?d("todo.fewerFiles"):d("todo.moreFiles",{p0:O}),"aria-expanded":E,onClick:k=>{k.stopPropagation(),P(A=>!A)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(ot,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},E?d("todo.fewerFiles"):d("todo.moreFiles",{p0:O})))))))};var Je=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=Le(),s=o.useSyncExternalStore(i.subscribe,i.get,i.get),l=o.useMemo(()=>e.map(f=>f.id),[e]),p=en(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),u=p.show;o.useLayoutEffect(()=>{s&&l.includes(s.todoId)&&u(s.todoId)},[s,l,u]);let c=o.useCallback((f,h)=>{let y=e[Math.max(0,Math.min(e.length-1,f+h))];y&&u(y.id,".todo-row")},[e,u]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(f=>o.createElement(fd,{key:e[f].id,todo:e[f],groups:t,compact:r,c:a,hideDate:n,onMoveFocus:h=>c(f,h)})))};function uo({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let l=Le(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),u=o.useMemo(()=>e.map(O=>O.key),[e]),[c,f]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,c].filter(Boolean)),y=e.filter(O=>O.todos.some(b=>h.has(b.id))).map(O=>O.key),E=o.useCallback((O,b)=>a?.(e[b])??32+e[b].todos.length*(r?52:84),[e,r,a]),P=en(o,{ids:u,estimate:E,pinned:y,layoutKey:i??r}),_=P.show;return o.useLayoutEffect(()=>{if(!p)return;let O=e.find(b=>b.todos.some(C=>C.id===p.todoId));O&&_(O.key)},[p,e,_]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:P.ref,onDragStartCapture:O=>f(O.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>f(null)},P.render(O=>o.cloneElement(s(e[O]),{"data-visible-key":u[O]})))}function Qu(e,t,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return No(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=No(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:zi(i),p0:`${et(t,a,n)} \u2013 ${et(Ue(s),a,n)}`})}return t===eo(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===eo(r,1)?d("todo.due.tomorrow"):et(t,a,n)}function rn({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let l=Ue(),{shortDateFormat:p}=yt("shortDateFormat"),u=m.ui.language(),c=o.useMemo(()=>{if(!s)return Gn(e,a,$n(i));let f=[...e].sort((h,y)=>Ot(y).localeCompare(Ot(h)));return Gn(f,a,$n(i),{dateOf:h=>jn(Ot(h))})},[a,s,e,i]);return o.createElement(uo,{className:"todo-panel-date-sections",sections:c,c:n,compact:r},f=>o.createElement("section",{className:"todo-panel-date-section",key:`${f.kind}:${f.key}`},o.createElement("div",{className:"todo-panel-date-head"},Qu(f.kind,f.key,l,p,u)),o.createElement(Je,{todos:f.todos,groups:t,compact:r,c:n})))}function ep(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function gd(e,t,r){let n=ep(e,t);return r?n:n.filter(a=>!Et.includes(a))}function tp(){let[e,t]=Ft(),[r]=ht(),n=dt(),a=n.map(l=>l.id),i=gd(e,a,r),s=l=>{let p=i.includes(l)?i.filter(u=>u!==l):a.filter(u=>i.includes(u)||u===l);p.length&&(Rt(p.some(u=>Et.includes(u))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":i.length===a.length,onClick:()=>{Rt(!0),t("all")}},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},i.length===a.length?"\u2713":""),o.createElement("span",null,d("todo.chip.all"))),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=i.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>s(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ie,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,d(l.labelKey)))}))}function nn({filter:e,className:t=""}){let[r]=ht(),n=dt(),a=n.map(l=>l.id),i=gd(e,a,r),s=e==="all"&&r?d("todo.chip.all"):i.length===1?d(n.find(l=>l.id===i[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:i.length});return o.createElement("button",{type:"button",className:"todo-status-filter-select "+t,"aria-label":d("todo.filters.statuses"),onClick:l=>{m.ui.openPopover(()=>o.createElement(tp,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.filters.statuses")})}},o.createElement("span",null,s),o.createElement(ot,null))}function an(e){return e==="flagged"?o.createElement(ze,null):e==="priority"?o.createElement(Mo,null):e==="due"?o.createElement(Fo,null):e==="updated"?o.createElement(ss,null):e==="created"?o.createElement(ds,null):o.createElement(ls,null)}function op(){let[e]=ht(),[t,r]=Ft(),a=dt().map(s=>s.id),i=s=>{if(t!=="all"){let l=t.filter(c=>a.includes(c)),p=s?a.filter(c=>l.includes(c)||c==="completed"):l.filter(c=>!Et.includes(c)),u=p.length?p:a.filter(c=>!Et.includes(c));r(u.length===a.length?"all":u)}Rt(s)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,"aria-pressed":!e,onClick:()=>i(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,"aria-pressed":e,onClick:()=>i(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-filter-control-row status"},o.createElement("span",null,d("todo.filters.statuses")),o.createElement(nn,{filter:t})))}function ma({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,l]=o.useState(r),p=Object.entries(Lt);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(_o,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement(Po,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([u,c])=>o.createElement("button",{key:u,type:"button",className:`todo-sort-option${a===u?" active":""}`,"aria-pressed":a===u,onClick:()=>{i(u),t(u)}},an(u),o.createElement("span",null,d(c))))))}function Uo({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:l,embedded:p=!1}){let[u,c]=o.useState(a),[f,h]=o.useState(i),y=p?a:u,E=p?i:f,P=y.length===r.length&&(!n||E),_=[...r.map(v=>y.some(F=>F.toLowerCase()===v.toLowerCase())),...n?[E]:[]],O=(v,F)=>v?` active${_[F-1]?"":" selection-run-start"}${_[F+1]?"":" selection-run-end"}`:"",b=(v,F)=>{c(v),h(F),s(v,F)},C=v=>{let F=e.filter(G=>v===null?!G.group:te(G.group??"")===te(v)),R=v??d("todo.chip.noGroup"),q=v===null?E:y.some(G=>te(G)===te(v));return o.createElement("div",{className:"todo-group-filter-item",key:v??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},v&&o.createElement("span",{className:"props-info-dot",style:{background:Me(Re(v,t))}}),R),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,F.length),o.createElement(m.ui.settings.Toggle,{label:R,checked:q,onChange:()=>b(v===null?y:q?y.filter(G=>te(G)!==te(v)):[...y,v],v===null?!E:E)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:l},d("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>b(P?[]:r,P?!1:n)},d(P?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(v=>C(v)),n&&C(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>b(P?[]:r,P?!1:n)},d(P?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((v,F)=>{let R=_[F];return o.createElement("button",{key:v,type:"button",className:`todo-group-filter-row${O(R,F)}`,"aria-pressed":R,onClick:()=>b(R?u.filter(q=>q.toLowerCase()!==v.toLowerCase()):[...u,v],f)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},R?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Me(Re(v,t))}}),o.createElement("span",{className:"todo-tree-label"},v),o.createElement("span",{className:"todo-tree-count"},Rr(e,v)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${O(f,r.length)}`,"aria-pressed":f,onClick:()=>b(u,!f)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},f?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Rr(e,null)))))}var hd={scheduled:()=>o.createElement(Fo,null),today:()=>o.createElement(zo,null),flagged:()=>o.createElement(ze,null),all:()=>o.createElement(Pr,null),completed:()=>o.createElement(rt,null)},rp=()=>{let{activePluginTab:e,dateFormat:t}=yt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Jr(),a=We(),i=zt(),[s,l]=o.useState(""),[p,u]=o.useState(""),[c,f]=o.useState(""),[h,y]=o.useState({}),[E,P]=o.useState(!1),[_,O]=o.useState(!1),{DateField:b,TimeField:C}=m.ui.settings,[v,F]=o.useState(!1),[R,q]=qr(),[G]=ht(),[N,Y]=Kr("todo"),{sortField:ae,sortDir:ne,compact:pe}=N,[S,K]=Ft(),oe=dt(),re=Ur(),k=Ls(),A=o.useMemo(()=>vs(k),[k]),Z=e?.pluginId===m.pluginId,J=o.useRef(null),g=o.useRef(null),M=o.useRef(null),I=so(ae,ne,"left_sidebar");Kt(I.openDetail);let w=De(new Date),D=o.useMemo(()=>Ts(I.todos,w),[I.todos,w]),L=o.useMemo(()=>Ee(a),[a]),U=o.useMemo(()=>I.todos.some(T=>!T.group),[I.todos]),ee=i.kind==="groups"?i.names:L,X=i.kind==="groups"?i.includeUngrouped===!0:U,he=ee.length===L.length&&(!U||X),fe=o.useMemo(()=>{let T=I.ordered.filter(z=>zr(z,i,G,w));return S!=="all"&&(T=T.filter(z=>Bt(z,S))),R.trim()&&(T=T.filter(z=>Nt(R,z.tags??[],z.title,z.note,z.group??""))),n?T=T.filter(z=>{let ce=z.dueDate?.slice(0,10);return!!ce&&ce>=n.start&&ce<=n.end}):r&&(T=T.filter(z=>z.dueDate?.slice(0,10)===r)),T},[I.ordered,i,G,S,R,r,n,w]),B=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,me=async()=>{if(I.creating)return;let T=xr(s,w),z=T.title;if(!z){Ce();return}let ce=B;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let Ze=await m.ui.openMenu([...i.names.map((fo,qo)=>({id:`group:${qo}`,label:fo})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:J.current??M.current,align:"start"});if(Ze===null)return;ce=Ze.startsWith("group:")?i.names[Number(Ze.slice(6))]:void 0}O(!1);let _e={note:p.trim(),tags:[...new Set([...h.tags??[],...c.split(/[\s,]+/).map(Ze=>Ze.replace(/^#+/,"")).filter(Boolean)])],priority:T.priority,...ce?{group:ce}:{}};i.kind==="smart"&&i.id==="today"&&(_e.dueDate=w),i.kind==="smart"&&i.id==="flagged"&&(_e.flagged=!0),Object.assign(_e,{...h,tags:_e.tags}),T.dueDate&&(_e.dueDate=T.dueDate),await I.create(z,void 0,{patch:_e})?(O(!1),l(""),u(""),f(""),y({}),P(!1),J.current?.focus()):O(!0)},Be=()=>{F(!0),window.setTimeout(()=>J.current?.focus(),0)},Ce=()=>{l(""),F(!1),u(""),f(""),y({}),P(!1),O(!1)},x=Le(),j=o.useSyncExternalStore(x.subscribe,x.get,x.get);o.useEffect(()=>{j?.mode==="create"&&(F(!0),x.clear())},[j,x]),o.useEffect(()=>{v&&!I.creating&&J.current?.focus()},[v,Z,I.creating]),o.useLayoutEffect(()=>{g.current&&(g.current.style.height="auto",g.current.style.height=`${g.current.scrollHeight}px`)},[p,v]);let se=v&&o.createElement("form",{className:"todo-compose",onSubmit:T=>{T.preventDefault(),me()},onKeyDown:T=>{T.key==="Escape"&&!T.defaultPrevented&&!I.creating&&(T.preventDefault(),Ce())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:J,className:"todo-compose-title",value:s,onChange:T=>l(T.target.value),placeholder:B?d("todo.newTodoIn",{p0:B}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:I.creating}),o.createElement("textarea",{ref:g,className:"todo-compose-note",rows:1,value:p,onChange:T=>u(T.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:I.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(T=>o.createElement("span",{className:"todo-compose-token",key:T},o.createElement("span",null,"#",T),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:T}),disabled:I.creating,onClick:()=>y(z=>({...z,tags:z.tags?.filter(ce=>ce!==T)}))},o.createElement(xe,null)))),o.createElement("input",{value:c,onChange:T=>{let z=T.target.value;if(!("isComposing"in T.nativeEvent&&T.nativeEvent.isComposing)&&/[\s,]/.test(z)){let ce=z.split(/[\s,]+/),_e=ce.pop()??"";y(vt=>({...vt,tags:[...new Set([...vt.tags??[],...ce.map(Ze=>Ze.replace(/^#+/,"")).filter(Boolean)])]})),f(_e)}else f(z)},onKeyDown:T=>{T.nativeEvent.isComposing||(T.key==="Enter"&&c.trim()&&(T.preventDefault(),y(z=>({...z,tags:[...new Set([...z.tags??[],c.trim().replace(/^#+/,"")].filter(Boolean))]})),f("")),T.key==="Backspace"&&!c&&y(z=>({...z,tags:z.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:I.creating})),o.createElement("div",{className:"todo-compose-schedule"},o.createElement(b,{className:"todo-compose-date-field",value:h.dueDate??(i.kind==="smart"&&i.id==="today"?w:""),onChange:T=>y(z=>({...z,dueDate:T})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:I.creating}),o.createElement(C,{className:"todo-compose-time-field",value:h.startTime??"",onChange:T=>y(z=>({...z,startTime:T||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:I.creating})),o.createElement("div",{className:"todo-compose-location"},o.createElement(Mr,{value:h.location,disabled:I.creating,onChange:T=>y(z=>({...z,location:T}))})),o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(T=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:T,title:T},o.createElement(mt,null),o.createElement("span",null,T.split("/").pop()),o.createElement("button",{type:"button",disabled:I.creating,"aria-label":`${d("todo.removeAttachment")}: ${T}`,onClick:()=>y(z=>({...z,attachments:z.attachments?.filter(ce=>ce!==T)}))},o.createElement(xe,null)))),E?o.createElement(m.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:I.creating,onChange:T=>{T&&(y(z=>({...z,attachments:[...new Set([...z.attachments??[],T])]})),P(!1))}}):o.createElement("button",{type:"button",className:"todo-compose-attach","aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),disabled:I.creating,onClick:()=>P(!0)},h.attachments?.length?o.createElement(Ve,null):o.createElement(o.Fragment,null,o.createElement(mt,null),o.createElement("span",null,d("todo.addAttachment"))))),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-priority",disabled:I.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async T=>{let z=await m.ui.openMenu(Ye.map(ce=>({id:ce.id,label:d(ce.labelKey),checked:ce.id===(h.priority??"normal")})),{anchor:T.currentTarget,align:"start"});z&&y(ce=>({...ce,priority:z}))}},o.createElement(Mo,null),o.createElement("span",null,h.priority&&h.priority!=="normal"?d(`todo.priority.${h.priority}`):d("todo.field.priority"))),o.createElement("button",{type:"button",className:"todo-compose-chip",onClick:()=>y(T=>({...T,flagged:!(T.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":h.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:I.creating},o.createElement(ze,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||I.creating},d("todo.group.add"))),_&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:Ce,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:I.creating},o.createElement(xe,null))),Ge=T=>{m.ui.openPopover(()=>o.createElement(op,null),{anchor:T,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},Wo=T=>{m.ui.openPopover(()=>o.createElement(ma,{sortField:ae,setSortField:z=>Y({sortField:z}),sortDir:ne,setSortDir:z=>Y({sortDir:z})}),{anchor:T,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},po=T=>{m.ui.openPopover(({close:z})=>o.createElement(Uo,{todos:I.todos,groups:a,names:L,hasUngrouped:U,selected:ee,includeUngrouped:X,onChange:(ce,_e)=>Pe(ce.length===L.length&&(!U||_e)?Te:{kind:"groups",names:ce,includeUngrouped:_e}),onOpenSettings:()=>{z(),wt()}}),{anchor:T,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},sn=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},mo=(T,z,ce,_e,vt,Ze,fo)=>{let qo=$r(i,z),xa=z.kind==="groups"&&z.names.length===1&&!z.includeUngrouped&&i.kind==="groups"?i.names.some(Ed=>te(Ed)===te(z.names[0])):qo;return o.createElement("button",{key:ft(z),type:"button",className:`todo-tree-row${vt?" nested":""}${Ze?` todo-${Ze}-chip`:""}${xa?" active":""}`,"aria-current":qo?"true":void 0,"aria-pressed":z.kind==="groups"?xa:void 0,style:fo?{"--todo-chip-color":Me(fo),"--todo-chip-on":Za(fo)}:void 0,onClick:()=>Pe(z)},_e&&o.createElement("span",{className:"todo-tree-icon"},_e),vt&&o.createElement("span",{className:"todo-tree-dot",style:{background:Me(vt)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},T),o.createElement("span",{className:"todo-tree-count"},ce))},Ad=!!(R||r||n||S!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),ba=n?`${Ke(n.start,t)} \u2013 ${Ke(n.end,t)}`:r?Ke(r,t):null,wa=S==="all"?null:`${d("auto.bae7d5be7082")}: ${S.length===1?d(oe.find(T=>T.id===S[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:S.length})}`,va=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!Z&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${he?"":" active"}`,"aria-label":d("todo.view.groups"),title:d("todo.view.groups"),type:"button",onClick:T=>po(T.currentTarget)},o.createElement(ro,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${G||S!=="all"?" active":""}`,"aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),type:"button",onClick:T=>Ge(T.currentTarget)},o.createElement(rt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":pe,title:pe?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>Y({compact:!pe})},pe?o.createElement(Dr,null):o.createElement(Ir,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${ne==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Lt[ae])}`,type:"button",onClick:T=>Wo(T.currentTarget)},ne==="asc"?o.createElement(Po,null):o.createElement(_o,null),an(ae))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>m.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(Ar,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:R,onChange:T=>q(T.target.value),onKeyDown:T=>{T.key==="Escape"&&q("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),R&&o.createElement("button",{className:"search-field-action",onClick:()=>q(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(xe,null)))),Z?o.createElement("div",{className:"todo-tree todo-active-navigation"},se,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},A.map(T=>mo(d(T.labelKey),{kind:"smart",id:T.id},D[T.id],hd[T.id](),void 0,"smart",T.color))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),L.map(T=>mo(T,{kind:"groups",names:[T]},Rr(I.todos,T),void 0,Re(T,a))))):o.createElement(o.Fragment,null,!R&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},ba?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:sn},o.createElement("span",{className:"todo-tree-icon"},o.createElement(zo,null)),o.createElement("span",{className:"todo-tree-label"},ba),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(xe,null))):A.map(T=>mo(d(T.labelKey),{kind:"smart",id:T.id},D[T.id],hd[T.id](),void 0,"smart",T.color))),wa&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>K("all")},o.createElement("span",{className:"todo-tree-label"},wa),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(xe,null)))),o.createElement("div",{className:"todo-list"},se,I.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):fe.length?o.createElement(rn,{todos:fe,groups:a,compact:pe,controller:I,mode:re,weekStart:m.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,Ad)))),!v&&o.createElement("button",{ref:M,className:"todo-fab",type:"button","aria-label":va,title:va,disabled:I.creating,onClick:Be},o.createElement(Ve,null)),o.createElement(lo,{c:I}))},yd=()=>o.createElement(rp,null);function np({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=dt(),[i,s]=o.useState(e),[l,p]=o.useState(r),u=a.map(y=>y.id),c=l==="all"?u:l,f=y=>{s(y),t(y)},h=y=>{let E=c.includes(y)?c.filter(_=>_!==y):u.filter(_=>c.includes(_)||_===y);if(!E.length)return;let P=E.length===u.length?"all":E;p(P),n(P)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>f(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>f(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(y=>o.createElement("button",{key:y.id,type:"button",className:"todo-status-filter-option","aria-pressed":c.includes(y.id),onClick:()=>h(y.id)},o.createElement("span",{className:"todo-status-filter-check"},c.includes(y.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ie,{status:y.id==="open"?null:y.id,dotCls:y.cls})),o.createElement("span",null,d(y.labelKey))))))}var bd=()=>{let{activePath:e,weekStart:t}=yt("activePath","weekStart"),r=xt(e)??"",n=We(),a=Ur(),[i,s]=Kr("attachment"),{showCompleted:l,statusFilter:p,compact:u,sortField:c,sortDir:f,groupNames:h,includeUngrouped:y}=i,E=N=>s({showCompleted:N}),P=N=>s({statusFilter:N}),_=N=>s({sortField:N}),O=N=>s({sortDir:N}),b=so(c,f,"right_sidebar");Kt(b.openDetail);let C=o.useMemo(()=>Ee(n),[n]),v=o.useMemo(()=>b.todos.some(N=>!N.group),[b.todos]),F=o.useMemo(()=>b.ordered.filter(N=>!(xt(N.filePath)===r||(N.attachments??[]).some(ae=>xt(ae)===r))||!l&&N.completed||(h.length||y)&&(!N.group&&!y||N.group&&!new Set(h.map(te)).has(te(N.group)))?!1:Bt(N,p)),[b.ordered,r,l,p,h,y]),R=N=>{m.ui.openPopover(({close:Y})=>o.createElement(Uo,{todos:b.todos,groups:n,names:C,hasUngrouped:v,selected:h,includeUngrouped:y,onChange:(ae,ne)=>s({groupNames:ae,includeUngrouped:ne}),onOpenSettings:()=>{Y(),wt()}}),{anchor:N,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},q=N=>{m.ui.openPopover(()=>o.createElement(np,{showCompleted:l,setShowCompleted:E,filter:p,setFilter:P}),{anchor:N,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},G=N=>{m.ui.openPopover(()=>o.createElement(ma,{sortField:c,setSortField:_,sortDir:f,setSortDir:O}),{anchor:N,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||y?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:N=>R(N.currentTarget)},o.createElement(ro,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:N=>q(N.currentTarget)},o.createElement(rt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":u,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!u})},u?o.createElement(Dr,null):o.createElement(Ir,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${f==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Lt[c])}`,onClick:N=>G(N.currentTarget)},f==="asc"?o.createElement(Po,null):o.createElement(_o,null),an(c)))),o.createElement("div",{className:"todo-list"},b.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?F.length?o.createElement(rn,{todos:F,groups:n,compact:u,controller:b,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(lo,{c:b}))};var fa="pageCollapsed";function ap(){let e=m.settings.get()[fa];return Array.isArray(e)?new Set(e.filter(t=>to.includes(t))):new Set(["completed"])}var wd=({navigation:e})=>{let{dateFormat:t,shortDateFormat:r}=yt("dateFormat","shortDateFormat"),{selectedDate:n,selectedDateRange:a}=Jr(),{SelectField:i}=m.ui.settings,s=We(),l=zt(),p=Wr();o.useEffect(()=>(e.setController({canGoBack:p.canGoBack,canGoForward:p.canGoForward,goBack:()=>io(-1),goForward:()=>io(1)}),()=>e.setController(null)),[e,p.canGoBack,p.canGoForward]);let[u,c]=o.useState(""),[f,h]=qr(),[y,E]=Ms(),{field:P,dir:_}=y,[O,b]=o.useState(ap),[C,v]=o.useState(new Set),[F,R]=ht(),[q]=Ft(),G=o.useRef(null),N=so("due","asc");Kt(N.openDetail),o.useEffect(()=>{if(!N.loading)if(l.kind==="groups"){let x=new Set(Ee(s));!l.includeUngrouped&&!l.names.some(j=>x.has(j))&&Pe(Te)}else l.kind==="tag"&&(N.todos.some(x=>x.tags?.includes(l.name))||Pe(Te))},[N.loading,N.todos,s,l]),o.useEffect(()=>{F&&b(x=>{if(!x.has("completed"))return x;let j=new Set(x);return j.delete("completed"),m.settings.set(fa,[...j]),j})},[F]);let Y=Ue(),ae=l.kind==="smart"?gt(l.id):null,ne=!!ae?.dated,pe=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?l.names[0]:d("todo.view.selectedGroups",{count:l.names.length+(l.includeUngrouped?1:0)}):l.kind==="tag"?`#${l.name}`:l.kind==="nogroup"?d("todo.chip.noGroup"):d(ae.labelKey),S=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?Me(Re(l.names[0],s)):"var(--accent-color)":l.kind==="tag"?"var(--accent-color)":l.kind==="nogroup"?"var(--text-color)":Me(ae.color)||"var(--text-color)",K=o.useMemo(()=>{let x=N.todos.filter(j=>zr(j,l,F,Y));return q!=="all"&&(x=x.filter(j=>Bt(j,q))),f.trim()&&(x=x.filter(j=>Nt(f,j.tags??[],j.title,j.note,j.group??""))),a?x=x.filter(j=>{let se=j.dueDate?.slice(0,10);return!!se&&se>=a.start&&se<=a.end}):n&&(x=x.filter(j=>j.dueDate?.slice(0,10)===n)),x},[N.todos,l,F,q,f,n,a,Y]),oe=o.useMemo(()=>ks(N.todos,l,Y),[N.todos,l,Y]),re=K,k=o.useMemo(()=>ne?Gi(re.filter(x=>!x.completed),Y):[],[ne,re,Y]),A=k.filter(x=>!!x.key&&x.key<Y),Z=k.find(x=>x.key===Y),J=ne?re.filter(x=>x.completed):[],g=o.useMemo(()=>Z?Vi(Z.todos):[],[Z]),{near:M,months:I}=o.useMemo(()=>Bi(k.filter(x=>!x.key||x.key>Y),Y),[k,Y]),w=o.useMemo(()=>I.map(x=>({...x,todos:x.days.flatMap(j=>j.todos)})),[I]),D=o.useMemo(()=>{if(ne)return null;let x=Lo(re,Y);if(P!=="auto")for(let j of to)x[j]=Qt(x[j],P,_);return x},[ne,re,Y,P,_]),L=o.useMemo(()=>l.kind==="smart"&&l.id==="completed"?Ki(re):null,[l,re]),U=N.lastCreatedId?re.find(x=>x.id===N.lastCreatedId)??N.todos.find(x=>x.id===N.lastCreatedId):void 0,ee=x=>{v(j=>{let se=new Set(j);return se.has(x)?se.delete(x):se.add(x),se})},X=x=>{b(j=>{let se=new Set(j);return se.has(x)?se.delete(x):se.add(x),m.settings.set(fa,[...se]),se})},he=l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped?l.names[0]:void 0,fe=async x=>{let j=xr(u,Y);if(!j.title){G.current?.focus();return}let se=x?.group??he;if(!x?.group&&l.kind==="groups"&&l.names.length+(l.includeUngrouped?1:0)>1){let po=await m.ui.openMenu([...l.names.map((sn,mo)=>({id:`group:${mo}`,label:sn})),...l.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:G.current,align:"start"});if(po===null)return;se=po.startsWith("group:")?l.names[Number(po.slice(6))]:void 0}c("");let Ge=j.dueDate||(l.kind==="smart"&&l.id==="today"?Y:"");if(!await N.create(j.title,void 0,{patch:{dueDate:Ge,priority:j.priority,...se?{group:se}:{},...l.kind==="smart"&&l.id==="flagged"?{flagged:!0}:{}}})){c(u);return}},B=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},me=Ee(s),Be=[{label:d("todo.fab.newTodo"),icon:o.createElement(Ve,null),onSelect:nr},...me.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Cr,null),submenu:me.map(x=>({label:x,onSelect:()=>{Pe({kind:"groups",names:[x]}),nr()}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(ro,null),onSelect:()=>{wt()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(_t,null),onSelect:()=>{navigator.clipboard.writeText(m.workspace.buildOwnLink(Yr()))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(fs,null),onSelect:()=>m.workspace.openOwnSettings()}];o.useEffect(()=>{na(Be)}),o.useEffect(()=>()=>na(null),[]);let Ce=u.trim()||N.creating?d("auto.9c0410f3884e"):d("todo.fab.menu");return o.createElement("div",{className:"todo-page"},o.createElement("div",{className:"todo-page-appbar"},o.createElement("div",{className:"todo-page-appbar-title",style:{color:S}},pe)),o.createElement("div",{className:"todo-page-scroll hidescrollbar"},o.createElement("div",{className:"todo-page-column"},o.createElement("header",{className:"todo-page-header"},o.createElement("h1",{className:"todo-page-view-title",style:{color:S}},pe),o.createElement("div",{className:"todo-page-view-sub"},o.createElement("span",null,d("todo.page.completedCount",{count:oe})),o.createElement("button",{type:"button",className:"todo-page-view-toggle",style:{color:S},"aria-pressed":F,onClick:R},d(F?"todo.completed.hide":"todo.completed.showAll")))),o.createElement("form",{className:"todo-page-quickadd",onSubmit:x=>{x.preventDefault(),fe()}},o.createElement(Ve,{className:"todo-page-quickadd-icon"}),o.createElement("input",{ref:G,value:u,onChange:x=>c(x.target.value),placeholder:he?d("todo.newTodoIn",{p0:he}):d("auto.d0e6e1dca756"),"aria-label":d("auto.81df98734775"),disabled:N.creating})),o.createElement("div",{className:"todo-page-toolbar"},o.createElement("div",{className:"todo-search-wrap search-field"},o.createElement(Ar,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:f,onChange:x=>h(x.target.value),placeholder:d("auto.f4ade25164a5"),"aria-label":d("auto.e0345e9d3092")}),f&&o.createElement("button",{className:"search-field-action",type:"button",onClick:()=>h(""),"aria-label":d("auto.67300d0fed7c")},o.createElement(xe,null))),o.createElement(i,{className:"flagged-notes-sort-select",value:P,ariaLabel:d("auto.63e08dc2a4e3"),onChange:x=>E({...y,field:x}),options:[{value:"auto",label:d("auto.c614ba7c453c")},...Object.entries(Lt).map(([x,j])=>({value:x,label:d(j)}))]}),P!=="auto"&&o.createElement("button",{className:"flagged-notes-sort-dir",type:"button","aria-label":d("auto.44b8af7351fe",{p0:_==="asc"?"descending":"ascending"}),onClick:()=>E({...y,dir:_==="asc"?"desc":"asc"})},_==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")),o.createElement(nn,{filter:q}),(a||n)&&o.createElement("button",{type:"button",className:"todo-due-chip active todo-date-chip",title:d("auto.f93fb4b1ab19"),onClick:B},a?`${Ke(a.start,t)} \u2013 ${Ke(a.end,t)}`:Ke(n,t)," ",o.createElement(xe,null))),N.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):L?L.length?o.createElement(uo,{className:"todo-completed-timeline",sections:L,c:N},x=>o.createElement("section",{className:"todo-schedule-block",key:x.key},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,et(x.key,m.ui.language(),r)),o.createElement("span",{className:"todo-page-section-count"},x.todos.length)),o.createElement(Je,{todos:x.todos,groups:s,compact:!1,c:N}))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.cec28cbe4204"))):ne?k.length||J.length?o.createElement(o.Fragment,null,J.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,d("todo.view.completed")),o.createElement("span",{className:"todo-page-section-count"},J.length)),o.createElement(Je,{todos:J,groups:s,compact:!1,c:N})),A.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-overdue"},o.createElement("span",null,d("todo.due.overdue")),o.createElement("span",{className:"todo-page-section-count"},A.reduce((x,j)=>x+j.todos.length,0))),o.createElement(uo,{sections:A,c:N},x=>o.createElement("div",{key:x.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head is-overdue"},et(x.key,m.ui.language(),r)),o.createElement(Je,{todos:x.todos,groups:s,compact:!1,hideDate:!0,c:N})))),Z&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-today"},o.createElement("span",null,d("todo.due.today")),o.createElement("span",{className:"todo-page-section-count"},Z.todos.length)),g.map(x=>o.createElement("div",{key:x.id,className:"todo-page-days"},x.id!=="untimed"&&o.createElement("h3",{className:"todo-timeofday-head"},d(Ui[x.id])),o.createElement(Je,{todos:x.todos,groups:s,compact:!1,hideDate:!0,c:N})))),M.map(x=>o.createElement("section",{key:x.key||"nodate",className:"todo-page-days"},o.createElement("h2",{className:"todo-day-head"},x.key?et(x.key,m.ui.language(),r):d("todo.due.noDeadline")),o.createElement(Je,{todos:x.todos,groups:s,compact:!1,hideDate:!0,c:N}))),o.createElement(uo,{sections:w,c:N,layoutKey:C,estimate:x=>C.has(x.key)?48+x.days.length*32+x.todos.length*84:48},x=>{let j=!C.has(x.key),se=x.days.reduce((Ge,Wo)=>Ge+Wo.todos.length,0);return o.createElement("section",{key:x.key,className:`todo-month${j?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-month-head","aria-expanded":!j,onClick:()=>ee(x.key)},o.createElement(ot,{className:"todo-page-section-chevron"}),o.createElement("span",{className:"todo-month-label"},Mi(x.key,m.ui.language(),{partial:x.partial,restOfLabel:d("todo.month.restOf")})),o.createElement("span",{className:"todo-page-section-count"},se)),!j&&x.days.map(Ge=>o.createElement("div",{key:Ge.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head"},et(Ge.key,m.ui.language(),r)),o.createElement(Je,{todos:Ge.todos,groups:s,compact:!1,hideDate:!0,c:N}))))})):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.cec28cbe4204"))):to.map(x=>{let j=D[x];U&&!j.some(Ge=>Ge.id===U.id)&&Lo([U],Y)[x].length&&(j=[U,...j]);let se=O.has(x);return!j.length&&x!=="today"?null:o.createElement("section",{key:x,className:`todo-page-section${se?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-page-section-head","aria-expanded":!se,onClick:()=>X(x)},o.createElement(ot,{className:"todo-page-section-chevron"}),o.createElement("span",{className:`todo-page-section-label todo-page-section-${x}`},d(ji[x])),o.createElement("span",{className:"todo-page-section-count"},j.length)),!se&&o.createElement("div",{className:"todo-page-section-body"},j.length?o.createElement(Je,{todos:j,groups:s,compact:!1,c:N}):o.createElement("div",{className:"todo-page-section-empty"},d("auto.346d73d6f5b6"))))}))),o.createElement("button",{className:"todo-fab",type:"button","aria-label":Ce,title:Ce,disabled:N.creating,onClick:()=>{u.trim()?fe():nr()}},o.createElement(Ve,null)),o.createElement(lo,{c:N}))};var vd={scheduled:()=>o.createElement(Fo,null),today:()=>o.createElement(zo,null),flagged:()=>o.createElement(ze,null),all:()=>o.createElement(Pr,null),completed:()=>o.createElement(rt,null)};function ip(){let{Button:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Ko);o.useEffect(()=>m.settings.subscribe(()=>a(Ko())),[]);let i=c=>{a(c),Ns(c)},s=n.order.filter(c=>!n.hidden.includes(c)),l=s.map(gt),p=r({items:l,indicatorOnly:!0,getId:c=>c.id,getLabel:c=>d(c.labelKey),onReorder:c=>{let f=c.map(y=>y.id),h=0;i({...n,order:n.order.map(y=>n.hidden.includes(y)?y:f[h++])})}}),u=c=>{if(s.length<=1)return;let f={...n,hidden:[...n.hidden,c]};i(f);let h=Mt();if(h.kind==="smart"&&h.id===c){let y=f.order.find(E=>!f.hidden.includes(E));Pe({kind:"smart",id:y})}};return o.createElement(m.ui.settings.Section,{title:d("todo.settings.smartLists")},o.createElement("div",{className:"todo-smart-list-settings"},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.smartListsDesc")),l.map(c=>{let f=p.getHandleProps(c);return o.createElement("div",{className:"todo-smart-list-setting-row"+(p.overId===c.id?" drop-"+(p.dropPosition??"before"):""),key:c.id,...p.getItemProps(c)},o.createElement("button",{...f,className:(f.className??"")+" todo-status-setting-handle",title:d("todo.settings.smartListReorder")},o.createElement(Er,null)),o.createElement("span",{className:"todo-smart-list-setting-glyph"},vd[c.id]()),o.createElement("span",{className:"todo-status-setting-name"},d(c.labelKey)),o.createElement(t,{onClick:()=>u(c.id),disabled:s.length<=1,ariaLabel:d("todo.settings.smartListHide",{p0:d(c.labelKey)}),title:d("todo.settings.smartListHide",{p0:d(c.labelKey)})},o.createElement(xe,null)))}),n.hidden.length>0&&o.createElement("div",{className:"todo-smart-list-hidden"},o.createElement("span",{className:"todo-smart-list-hidden-title"},d("todo.settings.smartListsHidden")),n.hidden.map(c=>{let f=gt(c);return o.createElement("div",{className:"todo-smart-list-hidden-row",key:c},o.createElement("span",{className:"todo-smart-list-setting-glyph"},vd[c]()),o.createElement("span",null,d(f.labelKey)),o.createElement(e,{onClick:()=>i({...n,hidden:n.hidden.filter(h=>h!==c)})},d("todo.settings.smartListRestore")))})),p.liveRegion))}function sp(){let{ColorField:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Ut),[i,s]=o.useState(null);o.useEffect(()=>m.settings.subscribe(()=>a(Ut())),[]);let l=b=>{a(b),ri(b)},p=n.active.map(b=>$e(b)),u=ko.filter(b=>!n.active.includes(b)).map(b=>$e(b)),c=[...p,...u],f=r({items:c,indicatorOnly:!0,getId:b=>b.id,getLabel:b=>d(b.labelKey),onReorder:(b,C)=>{let v=n.active.includes(C.activeId),F=n.active.includes(C.overId);if(v&&F){let R=new Set(n.active);l({...n,active:b.filter(q=>R.has(q.id)).map(q=>q.id)})}else if(v)l({...n,active:n.active.filter(R=>R!==C.activeId)});else if(F){let R=[...n.active],q=R.indexOf(C.overId);R.splice(q+(C.position==="after"?1:0),0,C.activeId),l({...n,active:R})}}}),h=b=>{l({...n,active:n.active.filter(C=>C!==b)})},y=b=>{n.active.includes(b)||l({...n,active:[...n.active,b]})},E=(b,C)=>{if(!f.activeId)return;C.preventDefault(),C.dataTransfer.dropEffect="move";let v=C.target.closest(".todo-status-setting-row");s(v&&!v.classList.contains("locked")?null:b)},P=b=>{b.currentTarget.contains(b.relatedTarget)||s(null)},_=(b,C)=>{let v=C.target.closest(".todo-status-setting-row");if(v&&!v.classList.contains("locked"))return;let F=C.dataTransfer.getData("text/plain");ko.includes(F)&&(C.preventDefault(),b==="show"?y(F):h(F),f.cancel(),s(null))},O=[$e("open"),$e("completed")];return o.createElement(m.ui.settings.Section,{title:d("todo.settings.statuses")},o.createElement("div",{className:"todo-status-settings","data-drop-zone":i??void 0,onDragEndCapture:()=>s(null)},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.statusesDesc")),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesShow")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-show${i==="show"?" accepts-drop":""}`,onDragOver:b=>E("show",b),onDragLeave:P,onDrop:b=>_("show",b)},O.map(b=>o.createElement("div",{className:"todo-status-setting-row locked",key:b.id},o.createElement("span",{className:"todo-status-setting-handle",title:d("todo.settings.statusLocked")},o.createElement(ns,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:b.id==="open"?null:b.id,dotCls:b.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(b.labelKey)),o.createElement(e,{value:n.colors[b.id],onChange:C=>l({...n,colors:{...n.colors,[b.id]:C}}),ariaLabel:d("todo.settings.statusColor",{p0:d(b.labelKey)}),allowCustom:!1}),o.createElement("span",{className:"todo-status-setting-action","aria-hidden":"true"}))),p.map(b=>{let C=f.getHandleProps(b);return o.createElement("div",{className:"todo-status-setting-row"+(f.overId===b.id?" drop-"+(f.dropPosition??"before"):""),key:b.id,...f.getItemProps(b)},o.createElement("button",{...C,draggable:!0,className:(C.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:v=>{C.onDragStart?.(v),v.dataTransfer.setData("text/plain",b.id)}},o.createElement(Er,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:b.id,dotCls:b.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(b.labelKey)),o.createElement(e,{value:n.colors[b.id],onChange:v=>l({...n,colors:{...n.colors,[b.id]:v}}),ariaLabel:d("todo.settings.statusColor",{p0:d(b.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>h(b.id),ariaLabel:d("todo.settings.statusHide",{p0:d(b.labelKey)}),title:d("todo.settings.statusHide",{p0:d(b.labelKey)})},o.createElement(xe,null)))})),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesHide")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-hide${i==="hide"?" accepts-drop":""}`,onDragOver:b=>E("hide",b),onDragLeave:P,onDrop:b=>_("hide",b)},u.map(b=>{let C=f.getHandleProps(b);return o.createElement("div",{className:"todo-status-setting-row"+(f.overId===b.id?" drop-"+(f.dropPosition??"before"):""),key:b.id,...f.getItemProps(b)},o.createElement("button",{...C,draggable:!0,className:(C.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:v=>{C.onDragStart?.(v),v.dataTransfer.setData("text/plain",b.id)}},o.createElement(Er,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:b.id,dotCls:b.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(b.labelKey)),o.createElement(e,{value:n.colors[b.id],onChange:v=>l({...n,colors:{...n.colors,[b.id]:v}}),ariaLabel:d("todo.settings.statusColor",{p0:d(b.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>y(b.id),ariaLabel:d("todo.settings.statusShow",{p0:d(b.labelKey)}),title:d("todo.settings.statusShow",{p0:d(b.labelKey)})},o.createElement(Ve,null)))}),!u.length&&o.createElement("span",{className:"todo-status-visibility-empty"},d("todo.settings.statusesHideEmpty"))),f.liveRegion))}function xd(){let{Button:e,Row:t,Section:r,SelectField:n}=m.ui.settings,[a,i]=o.useState(jr);return o.createElement(o.Fragment,null,o.createElement(r,{title:d("todo.settings.display")},o.createElement(t,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(n,{className:"todo-date-breakdown-select",value:a,onChange:s=>{let l=s;i(l),m.settings.set(Zn,l)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(Ys,null),o.createElement(ip,null),o.createElement(r,null,o.createElement(m.ui.settings.GroupsEditor,null)),o.createElement(sp,null))}var kd="reminder:";function Td(){let e=ke();return m.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(kd))return;let a=n??t.slice(kd.length).split(":")[0];ct(e).then(i=>{e.assertActive();let s=i.find(l=>l.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var ga=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),ha=e=>({type:"string",description:e});async function ya(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Sd(e){return gn([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:ga({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await ya(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:ga({title:ha("Task title"),due:ha("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await ya(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:ga({id:ha("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await ya(e,"complete",{query:n},r)).title||n}".`}}])}function dp(e){gi(e);let t=Ha(e),r=Wa(),n=ai(),a=!1,i=e.backend.on("records.eventDeliveryFailed",()=>{a||(a=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{a=!1}))});Cs();let s=e.workspace.onOpenOwnLink(O=>{Zr(O)});e.registerView("todo.panel",yd),e.registerView("todo.file",bd),e.registerView("todo.page",wd),e.registerView("todo.settings",xd);let l=Ji(e),p=Bs(e),u=e.interop.services.provide(hn,Sd(e)),c=rs(),f=$s(),h=e.interop.services.subscribe(St,()=>{}),y=e.interop.services.subscribe(St,()=>{}),E=Gs(e),P=Td(),_=Oi();return()=>{i(),t(),l(),p(),u(),c(),f(),h(),y(),E(),P(),_(),s(),n(),r()}}var lp={register:dp},Ev=lp;export{Ev as default,dp as register};

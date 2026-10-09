var it="valley";var Qu=`.${it}`,ep=`app.${it}`;function vd(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var wd=/^[a-zA-Z]:/;function mo(e){if(typeof e!="string")return"";let t=vd(e);return!t||t==="."||wd.test(t)||t.split("/").some(r=>r==="..")?"":t}function xt(e){if(typeof e=="string")return mo(e)||void 0}var ye=`.${it}`,xd="plugins",go=`${ye}/${xd}`,Bo=`${go}/packages`,rp=`${Bo}/core`,np=`${Bo}/github`,ip=`${Bo}/local`,ap=`${Bo}/community`,sp=`${go}/community.json`,dp=`${go}/data`;var lp=`${go}/enabled.json`,cp=`${go}/sources.json`,up=`${ye}/state`,be=`${ye}/settings`,pi=`${ye}/data`,fi=`${ye}/recovery`;var rn=`${ye}/accounts`,$t=`${ye}/ai`,pp=`${$t}/connections.json`,fp=`${$t}/defaults.json`,mp=`${$t}/budgets.json`,gp=`${$t}/usage.sqlite`,hp=`${$t}/security/guards.json`,yp=`${$t}/security/activity.sqlite`,bp=`${rn}/providers`,vp=`${rn}/providers.lock.json`,kd=`${ye}/trash`,wp=`${kd}/items`,nn=`${ye}/cache`,xp=`${nn}/accounts`,Td=`${nn}/search`,kp=`${nn}/providers`;var Tp=`${Td}/index.jsonl`,Sp=`${fi}/drafts`,Ap=`${fi}/transactions`;var at="design",Sd="themes",mi=`${ye}/${at}/${Sd}`,Ep=`${mi}/local`,Dp=`${mi}/community`,Ip={app:`${be}/app.json`,appearance:`${ye}/${at}/appearance.json`,"icon-rail":`${ye}/${at}/icon-rail.json`,"footer-rail":`${ye}/${at}/footer-rail.json`,"plugin-startup":`${ye}/${at}/right-sidebar-startup.json`,"new-tab":`${ye}/${at}/new-tab.json`,pallette:`${ye}/${at}/palette.json`,group:`${pi}/groups.json`,units:`${pi}/units.json`,metadata:`${be}/file-viewers.json`,notification:`${be}/notification.json`,"notification-settings":`${be}/notification-settings.json`,preferences:`${be}/preferences.json`,"link-actions":`${be}/link-actions.json`,markdown:`${be}/markdown.json`,editor:`${be}/editor.json`,"editor-vim":`${be}/editor-vim.json`,"markdown-todo":`${be}/markdown-todo.json`,"markdown-codeblocks":`${be}/markdown-codeblocks.json`,"markdown-template":`${be}/markdown-template.json`,"markdown-embeed":`${be}/markdown-embeed.json`,files:`${be}/file.json`,"file-sorter":`${be}/file-sorter.json`,"file-sym-link":`${be}/file-sym-link.json`,search:`${be}/search.json`,"search-tag":`${be}/search-tag.json`,"search-content":`${be}/search-content.json`,design:`${ye}/${at}/appearance.json`,accounts:`${rn}/connections.json`};var gi=it,hi="open";var Ad=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),yi=16384;var bi=new Set(["__proto__","prototype","constructor"]);function vi(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function qo(e){let t=new WeakSet,r=0,n=(a,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(a===null||typeof a=="boolean")return a;if(typeof a=="string"){if(vi(a)>yi)throw new Error("Bookmark state is too large");return a}if(typeof a=="number")return Number.isFinite(a)?Object.is(a,-0)?0:a:void 0;if(!a||typeof a!="object"||t.has(a))return;let l=Array.isArray(a),p=Object.getPrototypeOf(a);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(a);try{let u=Reflect.ownKeys(a);if(u.length+r>8192||u.some(h=>typeof h=="string"&&bi.has(h)))throw new Error("Invalid or excessive bookmark state keys");let c=Object.getOwnPropertyDescriptors(a);if(l){let h=c.length?.value;if(!Number.isSafeInteger(h)||h>8192)throw new Error("Bookmark state is too complex");return Array.from({length:h},(v,D)=>{let M=c[String(D)];return M&&"value"in M?n(M.value,s+1)??null:null})}let m={};for(let h of Object.keys(c).sort()){if(bi.has(h))throw new Error("Invalid bookmark state key");let v=c[h];if(!v.enumerable||!("value"in v)){r++;continue}let D=n(v.value,s+1);D!==void 0&&(m[h]=D)}return m}finally{t.delete(a)}}},i=n(e,0);if(!i||typeof i!="object"||Array.isArray(i))throw new Error("Invalid bookmark state");if(vi(JSON.stringify(i))>yi)throw new Error("Bookmark state is too large");return i}function ki(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=mo(e);if(!t)throw new Error("Invalid bookmark path");return t}function an(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function wi(e){let r=(e.target?["path","filePath","file"].flatMap(i=>typeof e.target.state[i]=="string"?[e.target.state[i]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function sn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Ad.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=qo(t.state);return r.path!==void 0&&(r.path=ki(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Ed=/^[A-Za-z0-9_-]{1,64}$/;function xi(e,t){if(typeof e!="string"||!Ed.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Ti(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=an(t.title,512,"title"),n={...t.description===void 0?{}:{description:an(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:an(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},i=t.group===void 0?{}:{group:xi(t.group,"group")};if(t.groupId!==void 0){let l=xi(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:sn(t.target),...n,...i};return{...l,searchText:wi(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:ki(t.folderPath),title:r,...n,...i};return{...s,searchText:wi(s)}}function kt(e){let t=0,r=a=>!!(a&&typeof a=="object"&&!Array.isArray(a)),n=a=>a.length>0&&a.length<=256&&!["__proto__","prototype","constructor"].includes(a),i=(a,s)=>{if(++t>2048||s>32||!r(a)||typeof a.type!="string")return!1;let l=(...p)=>Object.keys(a).every(u=>u==="type"||p.includes(u));return["unknown","null","boolean","number","string","function"].includes(a.type)?l():a.type==="literal"?l("value")&&(a.value===null||["string","boolean"].includes(typeof a.value)||typeof a.value=="number"&&Number.isFinite(a.value)):a.type==="array"?l("items","maxItems")&&(a.maxItems===void 0||Number.isSafeInteger(a.maxItems)&&a.maxItems>=0&&a.maxItems<=1e5)&&i(a.items,s+1):a.type==="tuple"?l("items","minItems")&&Array.isArray(a.items)&&a.items.length<=64&&(a.minItems===void 0||Number.isSafeInteger(a.minItems)&&a.minItems>=0&&a.minItems<=a.items.length)&&a.items.every(p=>i(p,s+1)):a.type==="union"?l("anyOf")&&Array.isArray(a.anyOf)&&a.anyOf.length>0&&a.anyOf.length<=32&&a.anyOf.every(p=>i(p,s+1)):a.type==="object"?l("properties","required","additionalProperties")&&r(a.properties)&&Object.entries(a.properties).every(([p,u])=>n(p)&&i(u,s+1))&&(a.required===void 0||Array.isArray(a.required)&&a.required.every(p=>typeof p=="string"&&Object.hasOwn(a.properties,p)))&&(a.additionalProperties===void 0||typeof a.additionalProperties=="boolean"):!1};return i(e,0)}function Wo(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),i=new WeakSet,a=(s,l,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return l===null;if(s.type==="literal")return l===s.value;if(s.type==="union")return s.anyOf.some(u=>a(u,l,p+1));if(s.type==="number")return typeof l=="number"&&Number.isFinite(l);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof l===s.type;if(!l||typeof l!="object"||i.has(l))return!1;i.add(l);try{return s.type==="array"?Array.isArray(l)&&l.length<=(s.maxItems??1e5)&&l.every(u=>a(s.items,u,p+1)):s.type==="tuple"?Array.isArray(l)&&l.length>=(s.minItems??s.items.length)&&l.length<=s.items.length&&l.every((u,c)=>a(s.items[c],u,p+1)):s.type==="object"?Array.isArray(l)||s.required?.some(u=>!Object.hasOwn(l,u))?!1:Object.entries(l).every(([u,c])=>Object.hasOwn(s.properties,u)?a(s.properties[u],c,p+1):s.additionalProperties===!0):!1}finally{i.delete(l)}};return a(e,t,0)}var Dd=new Map;function le(e,t,r,n,i,a,s,l,p="owner"){let u=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:i,identities:a,identityScope:p,serviceCalls:s,serviceMetadata:l});return Dd.set(`${t}:${e}@${r}`,u),u}var ln=256;function cn(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,i)=>{let a=t.get(r);if(!a)throw new Error(`Unknown provider-owned agent tool: ${r}`);return a.run(n,i)}}}var V=e=>!!e&&typeof e=="object"&&!Array.isArray(e),pe=(e,t)=>typeof e[t]=="function",Tt=e=>e===void 0,Rt=e=>typeof e=="boolean",B=e=>typeof e=="string",Ce=e=>e===void 0||B(e),Id=e=>e===void 0||typeof e=="number",Nd=e=>e===void 0||typeof e=="boolean",se=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Se=e=>V(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Si=e=>V(e),Ei=e=>V(e)&&B(e.id)&&B(e.title)&&B(e.date)&&(e.documentRef===void 0||V(e.documentRef)&&B(e.documentRef.pluginId)&&B(e.documentRef.sourceId)&&B(e.documentRef.itemId)),Cd=e=>V(e)&&B(e.date)&&Ce(e.startTime)&&Ce(e.endTime)&&Ce(e.sourceId)&&Ce(e.itemId),Ld=e=>V(e)&&B(e.url)&&Ce(e.title)&&Nd(e.newTab),Pd=e=>V(e)&&B(e.query),Di=e=>V(e)&&B(e.name)&&Ce(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Od=e=>Array.isArray(e)&&e.every(Di),_d=e=>e===null||Di(e),Md=e=>e===void 0||V(e)&&Ce(e.approvalToken)&&(e.cancellation===void 0||V(e.cancellation)),Fd=e=>typeof e=="string"||V(e)&&typeof e.text=="string",zd=e=>V(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&V(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ce(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Ii=e=>V(e)&&B(e.id)&&B(e.label)&&Ce(e.labelKey)&&Ce(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Ii)),Ni={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ei)},create:{args:e=>se(e,[B,Si]),result:Rt},update:{args:e=>se(e,[B,Si]),result:Rt},remove:{args:e=>se(e,[B]),result:Rt},open:{args:e=>se(e,[B]),result:Tt},configure:{args:e=>e.length===0,result:Tt},actions:{args:e=>se(e,[B]),result:e=>Array.isArray(e)&&e.every(Ii)},runAction:{args:e=>se(e,[B,B]),result:Rt}},Ci=e=>V(e)&&B(e.name)&&B(e.version)&&Ce(e.description)&&Ce(e.author)&&(e.localized===void 0||V(e.localized)&&Object.values(e.localized).every(t=>V(t)&&B(t.name)&&Ce(t.description))),$d=le("calendar.itemSource","service","1.3.0","many",e=>V(e)&&pe(e,"list")&&(e.integration===void 0||Ci(e.integration)),void 0,Ni,e=>e.integration),Yo=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,dn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Rd=e=>V(e)&&Yo(e.startDate)&&Yo(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=ln&&(e.cursor===void 0||dn(e.cursor)),jd=e=>V(e)&&dn(e.revision)&&(e.cursor===void 0||dn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=ln&&e.items.every(t=>Ei(t)&&Yo(t.date)&&(t.endDate===void 0||Yo(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,St=le("calendar.itemSource","service","2.0.0","many",e=>V(e)&&pe(e,"list")&&(e.integration===void 0||Ci(e.integration)),void 0,{...Ni,list:{args:e=>se(e,[Rd]),result:jd}},e=>e.integration),ho=le("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),Gd=le("calendar.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"openDate"),void 0,{openDate:{args:e=>se(e,[Cd]),result:Tt}}),Xo=le("calendar.panelSelection","state","1.0.0","one",e=>V(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Kd=le("web.activeContext","state","1.0.0","one",e=>V(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Ai(e){return V(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>V(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Vd=le("contacts.directory","service","1.0.0","one",e=>V(e)&&["search","resolveEmails","open"].every(t=>pe(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Ai)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>V(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Ai))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||V(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Tt}}),Ud=le("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Hd=le("web.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[Ld]),result:Tt}}),Bd=le("selection.textAction","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&pe(e,"run"),e=>[e.id]),qd=le("geo.navigator","service","1.0.0","one",e=>V(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[Pd]),result:Tt}}),Wd=le("geo.search","service","1.0.0","one",e=>V(e)&&pe(e,"search")&&pe(e,"reverse"),void 0,{search:{args:e=>se(e,[B]),result:Od},reverse:{args:e=>se(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:_d}}),un=le("agent.toolProvider","service","1.0.0","many",e=>V(e)&&Array.isArray(e.tools)&&e.tools.every(zd)&&pe(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>se(e,[B,V,Md]),result:Fd}},e=>({tools:e.tools}),"global"),Yd=le("guard.runtime","service","1.0.0","one",e=>V(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>pe(e,t)),void 0,{resolve:{args:e=>se(e,[V]),result:V},requestApproval:{args:e=>se(e,[V]),result:Rt},consumeToken:{args:e=>e.length>=1&&e.length<=2&&B(e[0])&&Ce(e[1]),result:Rt},audit:{args:e=>se(e,[V]),result:Tt}}),Xd=le("browser.automation","service","1.0.0","one",e=>V(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>pe(e,t)),void 0,{list:{args:e=>e.length===0,result:Se},open:{args:e=>se(e,[B]),result:Se},switch:{args:e=>se(e,[B]),result:Se},close:{args:e=>se(e,[B]),result:Se},snapshot:{args:e=>se(e,[B]),result:Se},readText:{args:e=>e.length>=1&&e.length<=2&&B(e[0])&&Id(e[1]),result:Se},readHtml:{args:e=>se(e,[B]),result:Se},screenshot:{args:e=>se(e,[B]),result:Se},click:{args:e=>se(e,[B,t=>typeof t=="number"]),result:Se},type:{args:e=>e.length>=3&&e.length<=4&&B(e[0])&&typeof e[1]=="number"&&B(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Se},select:{args:e=>se(e,[B,t=>typeof t=="number",B]),result:Se},scroll:{args:e=>se(e,[B,t=>typeof t=="number",t=>typeof t=="number"]),result:Se},pressKey:{args:e=>se(e,[B,B]),result:Se},navigate:{args:e=>se(e,[B,B]),result:Se},back:{args:e=>se(e,[B]),result:Se},forward:{args:e=>se(e,[B]),result:Se},reload:{args:e=>se(e,[B]),result:Se}}),Zd=le("fileTree.contextItem","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ce(e.labelKey)&&pe(e,"run"),e=>[e.id]),Jd=le("newTab.entry","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"run"),e=>[e.id]),pn=le("search.resultAction","extension","1.0.0","many",e=>V(e)&&typeof e.cardKind=="string"&&pe(e,"open"),e=>[e.cardKind]),Qd=le("search.resultCard","extension","1.0.0","many",e=>V(e)&&typeof e.cardKind=="string"&&pe(e,"render")&&pe(e,"open"),e=>[e.cardKind]),Zo=le("metadataPanel.segment","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"render"),e=>[e.id]),fn=le("workspace.surface","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&pe(e,"getSnapshot")&&pe(e,"subscribe")&&pe(e,"restore"),e=>[e.id]),el=le("metadata.plugin","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"facts"),e=>[e.id]),tl=le("workspace.viewState","extension","1.0.0","many",e=>V(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&pe(e,"capture")&&pe(e,"restore")&&pe(e,"subscribe"),e=>[e.id]);var Jo=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let i of n){if(typeof i!="string")continue;if(["__proto__","prototype","constructor"].includes(i))throw new Error("Invalid bookmark key");let a=Object.getOwnPropertyDescriptor(e,i);a?.enumerable&&"value"in a&&(r[i]=a.value)}return r},mn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Li=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Pi=e=>mn(e)&&typeof e.surface=="string"&&Li.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function yo(e){let t=Jo(e);if(!Pi(t))throw new Error("Invalid bookmark descriptor");let r=sn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Ti({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function gn(e){try{let t=yo(e),r=Jo(e);return JSON.stringify(t.state)===JSON.stringify(qo(r.state))}catch{return!1}}function ol(e){try{let t=Jo(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:yo(t.bookmark)}}catch{}return{status:"invalid"}}var rl=e=>{try{let t=Jo(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&gn(t.bookmark)}catch{return!1}},nl=e=>mn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Oi=le("workspace.bookmark","service","1.0.0","many",e=>mn(e)&&typeof e.id=="string"&&Li.has(String(e.surface))&&kt(e.stateSchema)&&(e.itemStateSchema===void 0||kt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Pi(e[0]),result:rl,sanitizeResult:ol},restore:{args:e=>e.length===1&&gn(e[0]),result:nl}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function hn(e,t,r){if(!kt(r.stateSchema)||r.itemStateSchema!==void 0&&!kt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,i=(u,c,m=!1)=>Wo(m&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,u,8192)&&(!r.validate||r.validate(u,c)),a=(u,c,m)=>{let h=m?void 0:r.primary?r.primary(u):u.item,v=qo(h?.state??u.view);if(!i(v,c,!!h))throw new Error("Invalid bookmark state");return yo({...c,title:h?.title??u.title,description:r.description(u,!!h),state:v,...h?{itemId:h.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:a(t.getSnapshot(u.instanceId),u,!1)}}catch{return{status:"invalid"}}},async restore(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};let c;try{if(c=yo(u),!i(c.state,c,c.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(c.state,c.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(Oi,s),p;try{p=e.interop.extensions.provide(fn,{...t,getSnapshot(u){let c=t.getSnapshot(u),m={surface:t.surface,...u===void 0?{}:{instanceId:u}},h,v;try{h=a(c,m,!1)}catch{}try{v=a(c,m,!0)}catch{}return{...c,bookmark:h,bookmarkView:v}}})}catch(u){throw n=!1,l(),u}return()=>{n=!1,p(),l()}}var _i=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Mi=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Fi(e){if(!_i(e)||!Mi(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!_i(r)||!Mi(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var il=le("workspace.details","extension","1.0.0","many",Fi,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var nf=[ye,`${ye}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var hf=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var sl=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,f,Qo=new Map,er;function ke(){return er}function zi(e,t){let r=Qo.get(e)??new Set;return r.add(t),Qo.set(e,r),()=>{r.delete(t),r.size||Qo.delete(e)}}function $i(e){er?.dispose(),f=e,o=e.React;let t=!0,r=new Set;return er={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},er.dispose}var dl=1800;function jt(e){let t=Le();o.useEffect(()=>{let r=null,n=null,i=null,a=0,s=()=>{i&&i.classList.remove("todo-reveal-target"),i=null},l=c=>{if(c.mode==="create")return;a=c.nonce,c.mode==="edit"&&(t.clear(),e(c.todoId)),r!==null&&clearTimeout(r);let m=Date.now()+2500,h=()=>{if(r=null,a!==c.nonce)return;let v=[...Qo.get(c.todoId)??[]].find(D=>D.isConnected);if(!v){Date.now()<m?r=setTimeout(h,40):t.get()?.nonce===c.nonce&&t.clear();return}v.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),v.classList.add("todo-reveal-target"),i=v,n=setTimeout(s,dl),t.get()?.nonce===c.nonce&&t.clear()};r=setTimeout(h,0)},p=t.subscribe(()=>{let c=t.get();c&&l(c)}),u=t.get();return u&&l(u),()=>{p(),a=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function Le(){return f.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,i)=>{e+=1,r.value={todoId:n,mode:i,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function tr(){Le().request("","create"),f.workspace.revealOwnPanel("left_sidebar")}var ll=`
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
`,yn="notes-todo-styles";function Ri(){let e=document.getElementById(yn);return e||(e=document.createElement("style"),e.id=yn,document.head.appendChild(e)),e.textContent=ll,()=>{document.getElementById(yn)===e&&e.remove()}}var W="#12120f",ce="#ffffff",vn=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:W,onDark:W},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ce,onDark:ce},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:W,onDark:W},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ce,onDark:W},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:W,onDark:W},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ce,onDark:W},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ce,onDark:W},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ce,onDark:W},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ce,onDark:W},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ce,onDark:ce},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:W,onDark:W},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ce,onDark:W},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ce,onDark:W},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:W,onDark:W},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ce,onDark:W},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ce,onDark:W},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ce,onDark:W},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ce,onDark:W},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:W,onDark:W},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:W,onDark:W},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ce,onDark:W},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ce,onDark:W},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ce,onDark:W},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ce,onDark:W},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ce,onDark:W},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ce,onDark:W},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:W,onDark:W},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:W,onDark:W},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ce,onDark:W},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:W,onDark:W},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ce,onDark:W},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ce,onDark:W},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:W,onDark:W},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ce,onDark:W},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ce,onDark:W},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ce,onDark:W}],cl=["semantic","muted","accent","categorical"];var Jf=new Map(vn.map(e=>[e.id,e])),ul={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},pl=new Map(vn.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),fl=/^[a-z][a-z0-9-]{0,47}$/,ml={version:4,families:cl.map(e=>({id:e,name:ul[e]})),colors:vn.map(e=>({id:e.id,familyId:e.family,name:pl.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},gl=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var hl=gl(ml);function ji(){return hl}var bn=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],or="palette:",yl=/^#[0-9a-f]{6}$/i;function rr(e){return e.startsWith(or)&&fl.test(e.slice(or.length))}function ve(e){return`${or}${e}`}function bo(e){return rr(e)?e.slice(or.length):void 0}function Gi(e){if(typeof e!="string")return;let t=e.trim();return rr(t)?t:yl.test(t)?t.toLowerCase():void 0}function Me(e){let t=bo(e);return t?`var(--color-${t})`:e}function Ki(e){let t=bo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function Vi(e){let t=new Set(e.map(r=>bo(r)??r.toLowerCase()));return ve(bn.find(r=>!t.has(r))??bn[0])}function Ui(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=bn;return ve(r[Math.abs(t)%r.length])}function oe(e){return e.trim().toLowerCase()}function bl(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let i of e){let a=typeof i=="string"?i.trim():"",s=oe(a);!s||s===oe(t)||r.has(s)||(r.add(s),n.push(a))}return n}function Hi(e){return`group_${oe(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function Gt(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let i=n,a=typeof i.name=="string"?i.name.trim():"",s=oe(a);if(!a||r.has(s))continue;r.add(s);let l=typeof i.id=="string"&&i.id.trim()?i.id.trim():Hi(a),p=Gi(i.color)??Vi(t.map(c=>c.color)),u=bl(i.aliases,a,r);t.push({id:l,name:a,color:p,...u.length?{aliases:u}:{}})}return t}function vo(e,t){let r=oe(t??"");if(r)return e.find(n=>oe(n.name)===r||(n.aliases??[]).some(i=>oe(i)===r))}function nr(e,t){return vo(t,e)?.name}function ze(e,t){let r=oe(e??"");return r?vo(t,e)?.color??Ui(r):ve("primary-blue")}function wn(e){let t={};for(let r of e){let n=oe(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var Bi="statuses",Qe=[{id:"open",labelKey:"todo.status.todo",color:ve("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ve("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ve("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ve("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ve("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ve("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ve("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ve("red"),done:!0,cls:"todo-st-canceled",locked:!1}],xn=Qe,ar=Qe.map(e=>e.id),wo=Qe.filter(e=>!e.locked).map(e=>e.id),At=Qe.filter(e=>e.done).map(e=>e.id),qi=new Map(Qe.map(e=>[e.id,e])),vl=new Set(wo);function wl(e){if(typeof e!="string"||!rr(e))return!1;let t=bo(e);if(!t)return!1;let r=ji();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function Wi(e){let t=e&&typeof e=="object"?e:{},r=Array.isArray(t.active)?t.active:wo,n=[];for(let s of r)typeof s!="string"||!vl.has(s)||n.includes(s)||n.push(s);let i=t.colors&&typeof t.colors=="object"?t.colors:{},a=Object.fromEntries(ar.map(s=>{let l=qi.get(s).color;return[s,wl(i[s])?i[s]:l]}));return{active:n,colors:a}}function Kt(){return Wi(f?.settings.get()[Bi])}function Yi(e){f.settings.set(Bi,Wi(e))}function $e(e){let t=e&&qi.get(e)||Qe[0];return{...t,color:Kt().colors[t.id]}}function ir(){let e=Kt();return[Qe[0],Qe[1],...e.active.map(t=>$e(t))]}function st(){return ir().map(e=>e.id)}function Xi(e){return e==="open"||e==="completed"||Kt().active.includes(e)}function dt(){let[e,t]=o.useState(ir);return o.useEffect(()=>f.settings.subscribe(()=>t(ir())),[]),e}function Vt(e,t=st()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(i=>r.includes(i));return n.length?n:"all"}function Ut(e,t){return t==="all"||t.includes(Re(e))}function sr(e){if(typeof e=="string")return ar.includes(e)?e:void 0}function Re(e){return e.status??(e.completed?"completed":"open")}function Ae(e){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:At.includes(e),status:e}}function Ht(){return ir().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,cls:e.cls}))}function xl(){return Qe.map(e=>{let t=$e(e.id),r=Me(t.color);return`.${t.cls}{color:${r}}.todo-detail-field[data-status="${t.id}"] .select-field-value{color:${r}}`}).join("")}function Zi(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=xl()};r();let n=f.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function Ji(e,t,r){let n=new Map,i=e.data.dataset("todo.status_history");for(let a=0;a<t.length;a+=20){let s=t.slice(a,a+20),l=new Map;for(;s.length;){r();let p=await i.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(c=>({to:c,from:{in:ar.filter(m=>m!==c)}})),...l.size?{and:[{or:s.map(c=>({taskId:c,position:{lt:l.get(c)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let u=await i.query({select:["taskId","changedAt"],where:{or:p.map(c=>({taskId:c.taskId,position:c.position}))},limit:20});r(),s=[];for(let c of u.rows){let m=String(c.taskId);if(typeof c.changedAt=="string"&&c.changedAt)n.set(m,{changedAt:c.changedAt});else{let h=p.find(v=>v.taskId===m)?.position;if(typeof h!="number"||!Number.isInteger(h))throw new Error("Invalid completion position");l.set(m,h),s.push(m)}}}}return n}function xo(e){return"historyLoaded"in e&&e.historyLoaded===!1}var Qi={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0a8adac9d6d5":"Schedule","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.73d64a823b7d":"Add tag\u2026","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9acc52f8cf89":"Remove tag {{p0}}","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e0db2991e37a":"Add tag","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (vault path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Reorder the To-Do navigation or hide lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are fixed but can be recolored. Reorder or recolor optional statuses, and drag them between Show and Hide.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item"};var ea={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0a8adac9d6d5":"Zeitplan","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.73d64a823b7d":"Tag hinzuf\xFCgen\u2026","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9acc52f8cf89":"Tag entfernen {{p0}}","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e0db2991e37a":"Tag hinzuf\xFCgen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Tresorpfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"Aufgaben: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Ordne die To-Do-Navigation neu oder blende nicht verwendete Listen aus.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind fixiert, k\xF6nnen aber eingef\xE4rbt werden. Optionale Status k\xF6nnen neu angeordnet, eingef\xE4rbt und zwischen Einblenden und Ausblenden verschoben werden.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag"};var ta={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0a8adac9d6d5":"Horario","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.73d64a823b7d":"Agregar etiqueta\u2026","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9acc52f8cf89":"Eliminar etiqueta {{p0}}","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e0db2991e37a":"Agregar etiqueta","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta de la b\xF3veda)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"Tareas: Editar campos de la tarea","todo.command.get":"Tareas: Obtener tarea","todo.command.openTask":"Tareas: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Reordena la navegaci\xF3n de tareas u oculta las listas que no utilices.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado son fijos, pero sus colores se pueden cambiar. Reordena o cambia el color de los estados opcionales y arr\xE1stralos entre Mostrar y Ocultar.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado"};var oa={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0a8adac9d6d5":"Horaire","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.73d64a823b7d":"Ajouter une balise\u2026","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9acc52f8cf89":"Supprimer la balise {{p0}}","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e0db2991e37a":"Ajouter une balise","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du coffre-fort)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"T\xE2ches : Modifier les champs d\u2019une t\xE2che","todo.command.get":"T\xE2ches : Lire une t\xE2che","todo.command.openTask":"T\xE2ches : Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"R\xE9ordonnez la navigation To-Do ou masquez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont fixes, mais leur couleur reste modifiable. R\xE9ordonnez ou recolorez les statuts facultatifs et faites-les glisser entre Afficher et Masquer.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB\xA0{{title}}\xA0\xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9"};var ra={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0a8adac9d6d5":"\u65F6\u95F4\u8868","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.73d64a823b7d":"\u6DFB\u52A0\u6807\u7B7E\u2026","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9acc52f8cf89":"\u5220\u9664\u6807\u7B7E {{p0}}","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e0db2991e37a":"\u6DFB\u52A0\u6807\u7B7E","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u91CD\u65B0\u6392\u5E8F\u5F85\u529E\u5BFC\u822A\u6216\u9690\u85CF\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u72B6\u6001\u56FA\u5B9A\u542F\u7528\uFF0C\u4F46\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3002\u53EF\u91CD\u65B0\u6392\u5E8F\u6216\u66F4\u6539\u53EF\u9009\u72B6\u6001\u7684\u989C\u8272\uFF0C\u5E76\u5728\u663E\u793A\u548C\u9690\u85CF\u4E4B\u95F4\u62D6\u52A8\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE"};var na={en:Qi,de:ea,es:ta,fr:oa,"zh-CN":ra};function ia(e,t){return(na.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,i)=>String(t?.[i]??""))}var aa=ia;function sa(e){e.ui.registerCatalogs(na),aa=(t,r)=>{let n=e.ui.t(t,r);return n===t?ia(t,r):n}}function d(e,t){return aa(e,t)}var Dl={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Il={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},Nl={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"};function Bt(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=Dl[e];return r?d(r):t||e}function da(e){return d(Il[e])}function la(e){return d(Nl[e])}function Pe(e,t=""){return typeof e=="string"?e:t}function dr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function lr(e){let t=Pe(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function ca(e){let t=Pe(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var Cl=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],wm=Object.fromEntries(Cl.map(e=>[e,{destination:"ask",recognize:!0}]));var Ll=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",it]);function Pl(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function ko(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=Pl(e);if(!t||Ll.has(t)||t.startsWith(`${it}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Ol=16384,_l=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Ml(e){if(!e||e.length>Ol||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,a=>a.charCodeAt(0)),i=JSON.parse(new TextDecoder().decode(n));return i.v!==1||!i.state||typeof i.state!="object"||Array.isArray(i.state)?null:i.state}catch{return null}}function Fl(e){try{let t=new URL(e);if(t.protocol!==`${gi}:`||t.hostname!==hi)return null;let r=mo(t.searchParams.get("file"));if(r)return{kind:"file",relPath:r};let n=t.searchParams.get("plugin")??"";if(!_l.test(n))return null;let i=Ml(t.searchParams.get("state")??""),a=t.searchParams.get("surface");if(a&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(a))return null;let s=t.searchParams.get("instance");return s&&s.length>512?null:i?{kind:"plugin",pluginId:n,state:i,...a?{surface:a}:{},...s?{instanceId:s}:{}}:null}catch{return null}}function qt(e){let t=Fl(e);return t?.kind==="file"?t.relPath:null}function ua(e){return ko(e)!==null}var zl=["normal","low","medium","high"];function pa(e){return e===!0}function $l(e){return typeof e=="string"&&zl.includes(e)?e:"normal"}function cr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function fa(e){return Array.isArray(e)?e.filter(t=>dr(t)).map(t=>({startedAt:Pe(t.startedAt),endedAt:Pe(t.endedAt),activeMinutes:cr(t.activeMinutes)??0,pauseMinutes:cr(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function kn(e){return Array.isArray(e)?e.filter(t=>dr(t)).map(t=>({from:sr(t.from),to:sr(t.to),changedAt:Pe(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Rl(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function ur(e){if(typeof e!="string")return;let t=e.trim();if(t)return qt(t)||ua(t)?t:void 0}function jl(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>ur(n)).filter(n=>!!n))];return r.length?r:void 0}function Gl(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>xt(r)).filter(r=>!!r))];return t.length?t:void 0}function Kl(e){if(!dr(e))return;let t=Pe(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function To(e){let t=new Date().toISOString(),r=Pe(e.id,`todo_${Date.now().toString(36)}`),n=Pe(e.createdAt,t),i=fa(e.history),a=kn(e.statusHistory),s=sr(e.status);return{id:r,title:Pe(e.title).trim(),completed:pa(e.completed)||s==="completed"||s==="canceled",priority:$l(e.priority),dueDate:Pe(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:lr(e.reminderTime),startTime:lr(e.startTime),endTime:lr(e.endTime),color:ca(e.color),note:Pe(e.note),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],estimatedMinutes:cr(e.estimatedMinutes),actualMinutes:cr(e.actualMinutes),history:i.length?i:void 0,statusHistory:a.length?a:void 0,status:s,filePath:xt(e.filePath),group:Pe(e.group).trim()||void 0,flagged:pa(e.flagged)||void 0,urls:jl(e.urls),attachments:Gl(e.attachments),location:Kl(e.location),remindAt:Rl(e.remindAt),reminderFiredAt:Pe(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Pe(e.updatedAt,n)}}function Tn(e,t,r){let n=(u,c=!1)=>{let m=new Map;for(let h of u){let v=m.get(h.taskId);v?v.push(h):m.set(h.taskId,[h])}if(c)for(let h of m.values())h.sort((v,D)=>Number(v.position)-Number(D.position));return m},i=n(t.tags),a=n(t.links,!0),s=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(u=>To({...u,tags:(i.get(u.id)??[]).map(c=>c.tag),urls:(a.get(u.id)??[]).map(c=>c.url),attachments:(s.get(u.id)??[]).map(c=>c.path),history:l.get(u.id)??[],statusHistory:p.get(u.id)??[]})).map(u=>({...u,group:nr(u.group,r)??u.group})).filter(u=>u.title)}var Sn="todo.tasks",An="todo.task_tags",En="todo.task_links",Dn="todo.task_attachments",ha="todo.focus_sessions",Wt="todo.status_history",So=[Sn,An,En,Dn],Vl=[...So,ha,Wt],ya=[...So,Wt];function Ul(e,t){let r=ke(),n=e.map(s=>r.api.data.dataset(s).subscribe(t)),i=()=>n.forEach(s=>s()),a=r.onDispose(i);return()=>{a(),i()}}function Yt(e){return Ul(ya,e)}function ba(e){let t=So.map(r=>f.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function lt(e,t,r=ke()){let n=[],i;do{r.assertActive();let a=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:i});r.assertActive(),n.push(...a.rows),i=a.cursor}while(i);return n}async function Hl(e,t=!0,r=!0,n=ke()){let i=e?{taskId:e}:void 0,a=await Promise.allSettled([r?lt(An,i,n):[],lt(En,i,n),lt(Dn,i,n),t?lt(ha,i,n):[],t?lt(Wt,i,n):[]]),[s,l,p,u,c]=a.map(m=>{if(m.status==="rejected")throw m.reason;return m.value});return{tags:s,links:l,attachments:p,sessions:u,statusHistory:c}}async function va(e,t,r){let[n,i]=await Promise.allSettled([lt(Sn,r?{id:r}:void 0,e),Hl(r,t,!0,e)]);if(n.status==="rejected")throw n.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),Tn(n.value,i.value,Gt(e.api.getState().groups))}var ma=new WeakMap;function pr(e,t,r,n,i){try{e.assertActive()}catch(p){return Promise.reject(p)}let a=ma.get(e);a||(a=new Map,ma.set(e,a));let s=a.get(t);if(!s){s={revision:0,pending:new Map};let p=s,u=r.map(c=>e.api.data.dataset(c).subscribe(()=>{p.revision++}));e.onDispose(()=>{u.forEach(c=>c()),a.clear()}),a.set(t,s)}let l=s.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,u=await i();if(e.assertActive(),p===s.revision)return u}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,l)),l}function wa(e,t){let r=ke();return pr(r,e?"full":"calendar",e?Vl:So,t??"",()=>va(r,e,t))}function ct(e=ke()){return pr(e,"list",ya,"",async()=>{let t=await va(e,!1),r=await Ji(e.api,t.map(n=>n.id),e.assertActive);return t.map(n=>({...n,historyLoaded:!1,completionSummary:r.get(n.id)??null}))})}var ga=new WeakMap,Bl=0;function ql(e,t){let r=ga.get(e);r||(r=new Map,ga.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++Bl),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let i=n,a=!0;return{reader:n,release:()=>{a&&(a=!1,i.users--,i.users||r.delete(t))}}}function Wl(e,t,r){return pr(e,"statusHistory",[Wt],r.key,async()=>{let n=await lt(Wt,{taskId:t},r.scope);return n.sort((i,a)=>Number(i.position)-Number(a.position)),kn(n)})}function xa(e){let t=ke(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:i,release:a}=ql(t,e),s=0,l=!1,p=()=>{let h=++s;Wl(t,e,i).then(v=>{!l&&h===s&&n({scope:t,id:e,history:v})}).catch(()=>{})},u=t.api.data.dataset(Wt).subscribe(h=>{(!h.keys||h.keys.some(v=>v.taskId===e))&&p()}),c=()=>{l=!0,u(),a()},m=t.onDispose(c);return p(),()=>{m(),c()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function ut(){return wa(!0)}async function Ze(e){return e?(await wa(!0,e))[0]??null:null}function ka(e,t,r,n){let i=ke();return pr(i,"calendarPage",So,JSON.stringify([e,t,r,n]),async()=>{i.assertActive();let a=await i.api.data.dataset(Sn).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});i.assertActive();let s=async m=>{let h=[];for(let v=0;v<a.rows.length;v+=100)h.push(...await lt(m,{taskId:{in:a.rows.slice(v,v+100).map(D=>String(D.id))}},i));return h},l=await Promise.allSettled([s(An),s(En),s(Dn)]),[p,u,c]=l.map(m=>{if(m.status==="rejected")throw m.reason;return m.value});return i.assertActive(),{todos:Tn(a.rows,{tags:p,links:u,attachments:c,sessions:[],statusHistory:[]},Gt(i.api.getState().groups)),...a.cursor?{cursor:a.cursor}:{}}})}async function Et(e){try{return await f.backend.call("records.append",{record:e})}catch{return!1}}async function Xe(e,t,r,n){try{let i=await f.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok}catch{return!1}}async function Dt(e){try{return await f.backend.call("records.delete",{id:e})}catch{return!1}}async function fr(e){if(!e.id||!e.title.trim())return!1;let t=await Et(e);return t&&f.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Dt(e.id)}),redo:async()=>({ok:await Et(e)})}),t}async function Xt(e,t,r,n){if(!e||!t.title.trim())return!1;let i=await Ze(e),a=xo(t)?{...t,history:t.history===void 0?i?.history:t.history}:t;xo(a)&&(delete a.historyLoaded,delete a.completionSummary);let s=await Xe(e,a,r,n);return s&&i&&f.undo.push({label:d("todo.undo.edit",{title:i.title}),undo:async()=>({ok:await Xe(e,i)}),redo:async()=>({ok:await Xe(e,a)})}),s}async function mr(e){let t=await Ze(e),r=await Dt(e);return r&&t&&f.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await Et(t)}),redo:async()=>({ok:await Dt(e)})}),r}async function Ao(e,t){await f.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await t(e.id)}function Yl(e){let t=[],r=e.replace(/#(\S+)/g,(n,i)=>(t.push(i.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function It(e,t,...r){let n=Yl(e);if(!n.tags.length&&!n.text)return!0;let i=t.map(a=>a.toLowerCase());for(let a of n.tags)if(!i.some(s=>s.startsWith(a)))return!1;return!(n.text&&!r.map(s=>s.toLowerCase()).some(s=>s.includes(n.text)))}function Ee(e=[]){return e.map(t=>nr(t.name,e)??t.name)}function Xl(){return Gt(f.getState().groups)}function He(){return Xl()}function Ta(e){return f.subscribe(e)}function Be(){let[e,t]=o.useState(He);return o.useEffect(()=>f.subscribe(()=>t(He())),[]),e}function Sa(){let e=ke(),t=!1,r=()=>{ct(e).then(i=>{e.assertActive(),t||e.api.workspace.reportGroupUsage(wn(i.map(a=>a.group)))}).catch(()=>{})};r();let n=Yt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function Zl(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Jl(e){let t=e.toLowerCase();return Zl(t)?t:"yyyy-mm-dd"}function Aa(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,i,a]=r;return Jl(t).replace("yyyy",n).replace("mm",i).replace("dd",a)}var Ql="ddd d mmm",ec=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function tc(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!ec.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),i=t.filter(s=>s==="mmm"||s==="mmmm"),a=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&i.length===1&&a.length<=1&&new Set(t).size===t.length}function oc(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return tc(t)?t:Ql}function Ea(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,i,a,s]=n,l=new Date(Number(i),Number(a)-1,Number(s),12),p={d:String(Number(s)),dd:s,ddd:new Intl.DateTimeFormat(r,{weekday:"short"}).format(l),dddd:new Intl.DateTimeFormat(r,{weekday:"long"}).format(l),mmm:new Intl.DateTimeFormat(r,{month:"short"}).format(l),mmmm:new Intl.DateTimeFormat(r,{month:"long"}).format(l),yyyy:i};return oc(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,u=>p[u])}var We=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var Nt={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},gr={high:3,medium:2,low:1,normal:0};function Zt(e,t){return e.title.localeCompare(t.title,void 0,{sensitivity:"base"})}function rc(e,t,r){if(r==="name")return Zt(e,t);if(r==="priority"){let a=gr[t.priority]-gr[e.priority];return a!==0?a:qe(e,t)}if(r==="flagged"){let a=+!!t.flagged-+!!e.flagged;return a!==0?a:qe(e,t)}if(r==="due"){let a=e.dueDate||"",s=t.dueDate||"";if(!a&&!s)return qe(e,t);if(!a)return-1;if(!s)return 1;let l=a.localeCompare(s);return l!==0?l:qe(e,t)}let n=r==="created"?"createdAt":"updatedAt",i=e[n].localeCompare(t[n]);return i!==0?i:Zt(e,t)}function In(e,t){let r=gr[t.priority]-gr[e.priority];return r!==0?r:Zt(e,t)}function qe(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let i=r.localeCompare(n);if(i!==0)return i}else{if(r)return-1;if(n)return 1}return In(e,t)}function Jt(e,t,r){return[...e].sort((n,i)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",l=i.dueDate||"";if(!s&&!l)return qe(n,i);if(!s)return-1;if(!l)return 1;let p=l.localeCompare(s);return p!==0?p:qe(n,i)}let a=rc(n,i,t);return r==="asc"?a:-a})}function Ge(e,t="dd-mm-yyyy"){return e?Aa(e,t):""}function De(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function hr(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));if(!t||!r||!n)return null;let i=new Date(t,r-1,n);return i.setHours(0,0,0,0),i}function Qt(e,t){let r=hr(e);return r?(r.setDate(r.getDate()+t),De(r)):e}function et(e,t,r="ddd d mmm"){return Ea(e.slice(0,10),r,t)}function Da(e,t,r={}){let n=hr(`${e}-01`);if(!n)return e;let i=r.now??new Date,a=n.getFullYear()===i.getFullYear(),s=n.toLocaleDateString(t,a?{month:"long"}:{month:"long",year:"numeric"});return r.partial&&r.restOfLabel?r.restOfLabel.replace("{{p0}}",s):s}function Ia(e,t,r,n,i="dd-mm-yyyy"){if(!e)return"";let a=e.slice(0,10);if(a===t)return r.today;let[s,l,p]=a.split("-").map(Number),[u,c,m]=t.split("-").map(Number);if(!s||!l||!p||!u||!c||!m)return Ge(e,i);let h=new Date(s,l-1,p),v=new Date(u,c-1,m),D=Math.round((h.getTime()-v.getTime())/864e5);return D===1?r.tomorrow:D===-1?r.yesterday:D>1&&D<7?h.toLocaleDateString(n,{weekday:"long"}):Ge(e,i)}var ig=new Date(2023,0,1,12);var nc={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Nn(e){return nc[e??""]??1}function Na(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function ic(e,t){return(e.getDay()-t+7)%7}function Ca(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-ic(e,t))}function Eo(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));return new Date(t,(r||1)-1,n||1)}var eo=["overdue","today","upcoming","someday","completed"],Pa={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"};function Ke(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Do(e,t=Ke()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let i of e){if(i.completed){r.completed.push(i);continue}let a=i.dueDate?.slice(0,10)??"";a?a<t?r.overdue.push(i):a===t?r.today.push(i):r.upcoming.push(i):r.someday.push(i)}let n=(i,a)=>i.dueDate.localeCompare(a.dueDate)||qe(i,a);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(qe),r.someday.sort(In),r.completed.sort((i,a)=>a.updatedAt.localeCompare(i.updatedAt)||Zt(i,a)),r}function Oa(e,t=Ke()){let r=new Map;for(let n of e){let i=n.dueDate?.slice(0,10)??"",a=r.get(i);a?a.push(n):r.set(i,[n])}return[...r.entries()].sort(([n],[i])=>n===""?1:i===""?-1:n.localeCompare(i)).map(([n,i])=>({key:n,overdue:!!n&&n<t,todos:i.sort(qe)}))}function Ct(e){return xo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Cn(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):Ke(t)}function _a(e){let t=[...e].sort((n,i)=>Ct(i).localeCompare(Ct(n))||Zt(n,i)),r=new Map;for(let n of t){let i=Cn(Ct(n)),a=r.get(i);a?a.push(n):r.set(i,[n])}return[...r.entries()].sort(([n],[i])=>i.localeCompare(n)).map(([n,i])=>({key:n,kind:"daily",todos:i}))}function Ln(e,t,r=1,n){let i=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),a=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:Ke(Ca(Eo(l),r)):"",s=new Map;for(let l of e){let p=a(i(l)),u=s.get(p);u?u.push(l):s.set(p,[l])}return[...s.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}var ac=["untimed","morning","afternoon","tonight"],Ma={untimed:"",morning:"todo.timeOfDay.morning",afternoon:"todo.timeOfDay.afternoon",tonight:"todo.timeOfDay.tonight"};function sc(e){if(!e)return"untimed";let t=Number(e.slice(0,2));return Number.isFinite(t)?t<12?"morning":t<18?"afternoon":"tonight":"untimed"}function Fa(e){let t=new Map;for(let r of e){let n=sc(r.startTime),i=t.get(n);i?i.push(r):t.set(n,[r])}return ac.filter(r=>t.has(r)).map(r=>({id:r,todos:t.get(r).sort(qe)}))}var dc=14;function La(e){return e.slice(0,7)}function za(e,t,r=dc){let n=lc(t,r),i=[],a=[];for(let u of e)!u.key||u.key<=n?i.push(u):a.push(u);let s=new Map;for(let u of a){let c=La(u.key),m=s.get(c);m?m.push(u):s.set(c,[u])}let l=La(t),p=[...s.entries()].sort(([u],[c])=>u.localeCompare(c)).map(([u,c])=>({key:u,days:c,partial:u===l}));return{near:i,months:p}}function lc(e,t){let[r,n,i]=e.split("-").map(Number),a=new Date(r,(n||1)-1,(i||1)+t);return Ke(a)}function yr(e,t=Ke()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,p)=>{let u=p.toLowerCase();if(u==="today")r=t;else if(u==="tomorrow"){let c=new Date(`${t}T00:00:00`);c.setDate(c.getDate()+1),r=Ke(c)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var we=e=>typeof e=="string"?e:"",Ka=e=>we(e?.query).trim(),wr=["normal","low","medium","high"];function to(){return new Date().toISOString()}function $a(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function Ra(e){let t=e.trim();if(!t)return;let r=vo(He(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function ja(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return $a();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),$a(t)}return e}function cc(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function br(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Pn(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(a=>a.id===r);if(n)return n;let i=e.filter(a=>a.title.toLowerCase().includes(r.toLowerCase()));if(i.length===0)throw new Error(`No todo matching "${r}".`);if(i.length===1)return i[0];throw new Error(`Multiple todos match "${r}":
${i.map((a,s)=>`  ${s+1}. ${a.title} [${a.id}]`).join(`
`)}
Re-run with the exact id.`)}var vr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=Ka(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Io(e,t,r){let n=Pn(await ut(),e),i=t(n);if(!await Xe(n.id,i,n.updatedAt))throw new Error("Failed to update todo.");return{value:i,revert:{label:r(n),run:async()=>{await Xe(n.id,n)},reapply:async()=>{await Xe(n.id,i)}}}}async function Ga(e){return Io(e,t=>({...t,completed:!0,status:"completed",updatedAt:to()}),t=>`Complete \u201C${t.title}\u201D`)}var Lt={type:"string"},Va={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Lt])),priority:{type:"string",enum:wr},status:{type:"string",enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Lt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Lt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function uc(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in Va.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(i=>typeof i=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let i=n;if(typeof i.name!="string"||Object.keys(i).some(a=>!["name","lng","lat"].includes(a))||i.lng!==void 0&&(typeof i.lng!="number"||!Number.isFinite(i.lng)||Math.abs(i.lng)>180)||i.lat!==void 0&&(typeof i.lat!="number"||!Number.isFinite(i.lat)||Math.abs(i.lat)>90)||i.lng===void 0!=(i.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!wr.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!st().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function pc(e,t,r){let i=(await ut()).find(s=>s.id===e);if(!i)throw new Error("The task no longer exists.");if(r!==void 0&&i.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!Ee(He()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let a=To({...i,...t,...t.status?Ae(t.status):t.completed!==void 0?Ae(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:to()});if(t.filePath&&a.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(t[s]?.some(l=>!a[s]?.includes(l)))throw new Error(`Invalid task ${s}.`);if(!await Xe(e,a,i.updatedAt))throw new Error("Could not save the task.");return{value:a,revert:{label:`Edit \u201C${i.title}\u201D`,run:async()=>{if(!await Xe(e,i))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await Xe(e,a))throw new Error("Could not reapply the task edit.")}}}}async function tt(e){let t=e??{},r=t.id??t.query,n={groups:He(),statuses:st()};if(!r)return n;let i=await ut(),a=Pn(i,r);return{...n,records:[a]}}function Ua(e){let t=[e.commands.register({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Lt},required:["id"],additionalProperties:!1},parse:r=>{let n=we(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=await Ze(r);if(!n)throw new Error("The task no longer exists. Open To-Do to choose another task.");return e.workspace.openMainTab(),Le().request(r,"edit"),n}}),e.commands.register({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Lt},required:["id"],additionalProperties:!1},parse:r=>{let n=we(r?.id).trim();if(!n)throw new Error("Expected a task id.");return{id:n}}},run:async({id:r})=>{let n=await Ze(r);if(!n)throw new Error("The task no longer exists.");return n}}),e.commands.register({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Lt,values:Va,expectedUpdatedAt:Lt},required:["id","values"],additionalProperties:!1},parse:r=>{let n=r,i=we(n?.id).trim();if(!i||n.expectedUpdatedAt!==void 0&&typeof n.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:uc(n.values),expectedUpdatedAt:n.expectedUpdatedAt}}},run:({id:r,values:n,expectedUpdatedAt:i})=>pc(r,n,i),revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"open-page",label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>{e.workspace.openMainTab()},formatCli:()=>"Opened To-Do page."}),e.commands.register({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:r=>{let n=r??{},i=we(n.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:we(n.due),priority:we(n.priority),status:we(n.status),note:we(n.note),group:we(n.group)}},fromCli:(r,n)=>({title:r.join(" ").trim(),due:n.due,priority:n.priority,status:n.status,note:n.note,group:n.group})},run:async({title:r,due:n,priority:i,status:a,note:s,group:l})=>{let p=st();if(a&&!p.includes(a))throw new Error(`Status "${a}" is not enabled. One of: ${p.join(", ")}`);let u=To({title:r,priority:i||"normal",status:a||void 0,dueDate:ja(n),note:s,group:Ra(l)});if(!await Et(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await Dt(u.id)},reapply:async()=>{await Et(u)}}}},formatCli:r=>`Added: ${br(r)}`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:vr,run:({query:r})=>Ga(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:vr,run:({query:r})=>Ga(r),formatCli:r=>`Completed: ${r.title}`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=Ka(r);if(!n)throw new Error('Usage: todo search "<query>"');return{query:n}},fromCli:r=>({query:r.join(" ").trim()})},run:async({query:r})=>(await ut()).filter(n=>It(r,n.tags,n.title,n.note)).slice(0,20),formatCli:r=>r.length?r.map(br).join(`
`):"No matching todos."}),e.commands.register({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:vr,run:({query:r})=>Io(r,n=>({...n,completed:!1,status:"open",updatedAt:to()}),n=>`Reopen \u201C${n.title}\u201D`),formatCli:r=>`Reopened: ${r.title}`,revision:r=>tt(r),preview:r=>({changes:r})}),...["cancel","pause"].map(r=>e.commands.register({id:r,label:`To-Do: ${r==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:vr,run:({query:n})=>{let i=r==="cancel"?"canceled":"onhold";if(!Xi(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return Io(n,a=>({...a,...Ae(i),updatedAt:to()}),a=>`${r==="cancel"?"Cancel":"Hold"} \u201C${a.title}\u201D`)},formatCli:n=>`${r==="cancel"?"Canceled":"On hold"}: ${n.title}`,revision:n=>tt(n),preview:n=>({changes:n})})),e.commands.register({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:r=>{let n=r??{},i=we(n.query).trim(),a=we(n.status),s=st();if(!i||!s.includes(a))throw new Error(`Usage: todo status "<id or title>" <${s.join("|")}>`);return{query:i,status:a}},fromCli:r=>({query:r.slice(0,-1).join(" "),status:r.at(-1)})},run:({query:r,status:n})=>Io(r,i=>({...i,...Ae(n),updatedAt:to()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:r=>`${r.title} \u2192 ${r.status}`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},i=we(n.query).trim(),a=we(n.priority);if(!i)throw new Error("Expected a todo id or title.");if(a&&!wr.includes(a))throw new Error(`Invalid priority "${a}". One of: ${wr.join(", ")}`);return{query:i,title:typeof n.title=="string"?n.title:void 0,priority:a||void 0,due:typeof n.due=="string"?n.due:void 0,note:typeof n.note=="string"?n.note:void 0,tags:typeof n.tags=="string"?cc(n.tags):void 0,group:typeof n.group=="string"?n.group:void 0}},fromCli:(r,n)=>({query:r.join(" "),title:n.title,priority:n.priority,due:n.due,note:n.note,tags:n.tag,group:n.group})},run:({query:r,title:n,priority:i,due:a,note:s,tags:l,group:p})=>Io(r,u=>({...u,title:n??u.title,priority:i??u.priority,dueDate:a===void 0?u.dueDate:ja(a),note:s??u.note,tags:l??u.tags,group:p===void 0?u.group:Ra(p),updatedAt:to()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:r=>`Edited: ${br(r)}`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:r=>{let n=r??{},i=we(n.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:n.confirm===!0||n.confirm==="true"}},fromCli:(r,n)=>({query:r.join(" "),confirm:n.confirm})},run:async({query:r,confirm:n})=>{let i=await ut(),a=Pn(i,r);if(!n)return{value:{deleted:!1,todo:a,deletedCount:0},revert:null};if(!await Dt(a.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:a,deletedCount:1},revert:{label:`Delete \u201C${a.title}\u201D`,run:async()=>{await Et(a)},reapply:async()=>{await Dt(a.id)}}}},formatCli:({deleted:r,todo:n,deletedCount:i})=>r?`Deleted: ${n.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${n.title}" [${n.id}]. Re-run with --confirm to delete.`,revision:r=>tt(r),preview:r=>({changes:r})}),e.commands.register({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:r=>{let n=r??{};return{section:we(n.section),q:we(n.q)}},fromCli:(r,n)=>({section:we(n.section),q:we(n.q??n.search)})},run:async({section:r,q:n})=>{let i=await ut();return n&&(i=i.filter(a=>It(n,a.tags,a.title,a.note))),r&&eo.includes(r)?Do(i)[r]:i},formatCli:r=>r.length===0?"No matching todos.":r.map(br).join(`
`)}),e.commands.register({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let r=await ut(),n=He();return Ee(n).map(i=>({name:i,count:r.filter(a=>oe(a.group??"")===oe(i)).length}))},formatCli:r=>r.length?r.map(n=>`${n.name} (${n.count})`).join(`
`):"No groups."})];return()=>t.forEach(r=>r())}var Ha={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var mc=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,gc=/^-\s+(.*)$/,hc=/^[A-Za-z][\w+.-]*:\/\//;function Ba(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let i=n.trim();if(!i||i.startsWith("#"))continue;let a=i.match(gc);if(a){r?t.lists[r].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let s=hc.test(i)?null:i.match(mc);if(s){let l=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=i)}return t}function qa(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let i=Number.parseInt(n,10);return!Number.isFinite(i)||i<1?null:Math.min(i,r)}var On="notes-todo-fence-styles";function yc(){if(document.getElementById(On))return;let e=document.createElement("style");e.id=On,e.textContent=`
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
`,document.head.appendChild(e)}var Wa=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},bc=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function vc(e,t){let r=Wa(),n=bc(7),i=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(a=>!(t.status==="open"&&a.completed||t.status==="completed"&&!a.completed||i&&!a.tags.some(s=>s.replace(/^#/,"").toLowerCase()===i)||t.due==="today"&&a.dueDate!==r||t.due==="week"&&(!a.dueDate||a.dueDate>n)||t.due==="overdue"&&(!a.dueDate||a.dueDate>=r||a.completed))).sort((a,s)=>(a.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var wc=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let c=ke(),m=!0,h=()=>{ct(c).then(D=>{c.assertActive(),m&&r(D)}).catch(()=>{})};h();let v=Yt(h);return()=>{m=!1,v()}},[]);let n=Ba(e),i=(n.values.status??"open").toLowerCase(),a=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:i==="completed"?"completed":i==="all"?"all":"open",due:a==="today"||a==="week"||a==="overdue"?a:null,limit:qa(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=vc(t,s),p=Wa(),u=c=>{let m={...c,completed:!c.completed,status:c.completed?"open":"completed"};r(h=>h&&h.map(v=>v.id===c.id?m:v)),Xt(c.id,m)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:c=>f.workspace.openMainTab({newTab:f.ui.hasModKey(c)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(c=>o.createElement("div",{key:c.id,className:`todo-fence-row ${c.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:c.completed,onChange:()=>u(c),"aria-label":c.title}),c.priority!=="normal"&&o.createElement("span",{className:`pri pri-${c.priority}`},We.find(m=>m.id===c.priority)?.symbol),o.createElement("span",{className:"t"},c.title),c.tags.slice(0,2).map(m=>o.createElement("span",{key:m,className:"tag"},"#",m.replace(/^#/,""))),c.dueDate&&o.createElement("span",{className:`due ${!c.completed&&c.dueDate<p?"overdue":""}`},c.dueDate))))};function Ya(){let e=f.markdown.registerCodeBlockRenderer("todo",(t,r)=>(yc(),r.classList.add("todo-fence"),f.ui.renderReact(r,o.createElement(wc,{code:t}))),{examples:Ha.todo});return()=>{e(),document.getElementById(On)?.remove()}}var Q=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),pt=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),xc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),kc=e=>o.createElement(pt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),Tc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Sc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Ac=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Ec=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Dc=e=>o.createElement(pt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Ic={inprogress:Tc,waiting:Sc,onhold:kc,delegated:Ac,deferred:Ec,completed:Dc,canceled:xc},Ie=({status:e,dotCls:t})=>{let r=e?Ic[e]:void 0;return r?o.createElement(r,{className:`todo-status-menu-svg ${t}`}):o.createElement("span",{className:`todo-status-menu-dot ${t}`})},Ve=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),xr=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),xe=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),kr=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),Xa=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Za=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Ja=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Tr=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),Sr=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),No=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Co=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Qa=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),es=e=>o.createElement(Q,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),ts=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),ot=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Fe=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),os=e=>o.createElement(pt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),rs=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Ar=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),rt=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),Er=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),ns=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),is=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),Lo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Pt=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),as=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),oo=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),ss=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Dr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),ft=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),Ir=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),ds=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),ls=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),cs=e=>o.createElement(Q,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Po=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Oo=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),ro=e=>o.createElement(Q,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),Nr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),_o=e=>o.createElement(Q,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),Cr=e=>o.createElement(Q,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"}));function Mo(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;f.links.open({category:"location",value:t})}var Lr=({value:e,onChange:t,disabled:r=!1})=>{let n=f.ui.ResourcePicker;return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-input-slot"},o.createElement(n,{className:"todo-location-input",disabled:r,value:e?.name??"",placeholder:d("todo.locationPlaceholder"),ariaLabel:d("todo.location"),kinds:["place"],allowCustom:!0,onChange:(i,a)=>{let s=Number(a?.metadata?.longitude),l=Number(a?.metadata?.latitude);t(i?{name:i,...Number.isFinite(s)&&Number.isFinite(l)?{lng:s,lat:l}:{}}:void 0)}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>Mo(e)},o.createElement(ss,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onClick:()=>{t(void 0)}},o.createElement(xe,null)))))};var Te={kind:"smart",id:"all"},Pr=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ve("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ve("primary-blue"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ve("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ve("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ve("green"),dated:!1}],us=Pr.map(e=>e.id);function _n(e){let t=e&&typeof e=="object"?e:{},r=[];for(let a of Array.isArray(t.order)?t.order:[])typeof a=="string"&&us.includes(a)&&!r.includes(a)&&r.push(a);for(let a of us)r.includes(a)||r.push(a);let n=Array.isArray(t.hidden)?t.hidden:[],i=r.filter(a=>n.includes(a));return i.length===r.length&&i.shift(),{order:r,hidden:i}}function ps(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>gt(t))}function gt(e){return Pr.find(t=>t.id===e)??Pr[3]}function fs(e,t,r=De(new Date)){if(t.kind==="groups")return e.group?new Set(t.names.map(oe)).has(oe(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function Or(e,t,r,n=De(new Date)){return fs(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function ms(e,t,r=De(new Date)){return e.filter(n=>{if(!n.completed)return!1;if(t.kind==="groups")return fs(n,t,r);if(t.kind==="tag")return(n.tags??[]).some(i=>i.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!n.group;switch(t.id){case"scheduled":return!!n.dueDate;case"today":return!!n.dueDate&&n.dueDate.slice(0,10)<=r;case"flagged":return!!n.flagged;default:return!0}}).length}function gs(e,t=De(new Date)){let r={scheduled:0,today:0,flagged:0,all:0,completed:0};for(let n of e){if(n.completed){r.completed++;continue}r.all++,n.flagged&&r.flagged++;let i=n.dueDate?.slice(0,10)??"";i&&(r.scheduled++,i<=t&&r.today++)}return r}function _r(e,t){let r=t===null?null:oe(t);return e.filter(n=>!n.completed&&(r===null?!n.group:oe(n.group??"")===r)).length}function mt(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Nc=Pr.map(e=>e.id);function Mn(e){if(typeof e!="string")return Te;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Te}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Te}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Te;let n=r,i=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],a=n.includeUngrouped===!0;return i.length||a?{kind:"groups",names:i,includeUngrouped:a}:Te}catch{return Te}return Nc.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Te}function Mr(e,t){return mt(e)===mt(t)}var Cc="todo.view",Lc="todo.showCompleted",Pc="todo.statusFilter",Oc="todo.search",_c="todo.pageSort",Rn="panelChip",ys="pageShowCompleted",Fn="statusFilter",jn="dateBreakdown",bs="smartLists",Fo="pageSearch",vs="pageSort",Mc={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},ws=["due","priority","flagged","updated","created","name"];function hs(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:ws.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Vt(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function $r(e){let t=Mc[e],r=o.useCallback(()=>hs(f.settings.get()[t]),[t]),[n,i]=o.useState(r);o.useEffect(()=>f.settings.subscribe(()=>i(r())),[r]);let a=o.useCallback(s=>{i(l=>{let p=hs({...l,...s});return f.settings.set(t,p),p})},[t]);return[n,a]}function Fr(){let e=f.settings.get()[jn];return e==="weekly"||e==="daily"?e:"monthly"}function Rr(){let[e,t]=o.useState(Fr);return o.useEffect(()=>f.settings.subscribe(()=>t(Fr())),[]),e}function no(){return f.runtime.getOrCreate(Cc,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function jr(){return f.runtime.getOrCreate(Lc,()=>({show:null,listeners:new Set}))}function Gr(){return f.runtime.getOrCreate(Pc,()=>({filter:null,listeners:new Set}))}function zo(){return f.runtime.getOrCreate(Oc,()=>({query:null,listeners:new Set}))}function Kr(){return f.runtime.getOrCreate(_c,()=>({value:null,listeners:new Set}))}function Ot(){let e=no();return e.view||(e.view=Mn(f.settings.get()[Rn]),e.history=[e.view],e.historyIndex=0),e.view}function Oe(e){let t=no();if(Ot(),t.view&&Mr(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,f.settings.set(Rn,mt(e));for(let n of t.listeners)n(e)}function Vr(){let e=no();return Ot(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function io(e){let t=no();Ot();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],f.settings.set(Rn,mt(t.view));for(let n of t.listeners)n(t.view)}}function Gn(e){let t=no();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function xs(){let e=no();e.view=null,e.history=[],e.historyIndex=-1,jr().show=null,Gr().filter=null,zo().query=null,Kr().value=null}function $o(){return _n(f.settings.get()[bs])}function ks(e){f.settings.set(bs,_n(e))}function Ts(){let[e,t]=o.useState($o);return o.useEffect(()=>f.settings.subscribe(()=>t($o())),[]),e}function Ss(e){let t=zo(),r=e.slice(0,500);if(t.query!==r){t.query=r,f.settings.set(Fo,r);for(let n of t.listeners)n(r)}}function Ur(){let e=()=>{let n=zo();return n.query===null&&(n.query=typeof f.settings.get()[Fo]=="string"?String(f.settings.get()[Fo]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=zo();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,Ss]}function Kn(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||ws.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function As(){let e=Kr();return e.value||(e.value=Kn(f.settings.get()[vs])),e.value}function Es(e){let t=Kr(),r=Kn(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,f.settings.set(vs,r);for(let n of t.listeners)n(r)}}function Ds(){let[e,t]=o.useState(As);return o.useEffect(()=>{let r=Kr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,Es]}function Hr(){return{v:1,view:mt(Ot()),showCompleted:$n(),statusFilter:zr(),search:zo().query??(typeof f.settings.get()[Fo]=="string"?String(f.settings.get()[Fo]).slice(0,500):""),sort:As()}}function Br(e){return e.v!==1?!1:(Oe(Mn(e.view)),Ft(e.showCompleted===!0),zn(Vt(e.statusFilter)),Ss(typeof e.search=="string"?e.search:""),Es(Kn(e.sort)),!0)}function zr(){let e=Gr();if(e.filter===null){let t=f.settings.get()[Fn];e.filter=Vt(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&f.settings.set(Fn,e.filter)}return e.filter}function zn(e){let t=Gr(),r=Vt(e),n=t.filter??zr();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((i,a)=>i===r[a]))){t.filter=r,f.settings.set(Fn,r);for(let i of t.listeners)i(r)}}function _t(){let[e,t]=o.useState(zr);return o.useEffect(()=>{let r=Gr();r.listeners.add(t);let n=f.settings.subscribe(()=>{let i=Vt(r.filter??zr());zn(i)});return()=>{r.listeners.delete(t),n()}},[]),[e,zn]}function Mt(){let[e,t]=o.useState(Ot);return o.useEffect(()=>Gn(t),[]),e}function $n(){let e=jr();return e.show===null&&(e.show=f.settings.get()[ys]===!0),e.show}function Ft(e){let t=jr();if(t.show!==e){t.show=e,f.settings.set(ys,e);for(let r of t.listeners)r(e)}}function ht(){let[e,t]=o.useState($n);return o.useEffect(()=>{let r=jr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Ft(!$n())]}function Ro(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Ns(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=f.interop.services.providers(St).find(n=>n.owner===f.pluginId)?.providerId;return f.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var Fc=["normal","low","medium","high"];function Cs(e,t){return e&&Fc.includes(e)?e:t}function zc(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function $c(e,t){return e.dueDate?{badges:zc(e),icon:"list-todo",id:e.id,documentRef:{pluginId:f.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:ze(e.group,t)}:{}}:null}function Rc(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Cs(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ae(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function qr(e){return Ze(e)}function Is(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var Vn="attachment:",Un="url:";function jc(){return!0}function Gc(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Is(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(a=>({id:`${Vn}${a}`,label:Is(a),description:a,icon:"attachment"}))});let i=e.urls??[];return i.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:i.map(a=>({id:`${Un}${a}`,label:a,icon:"link"}))}),e.location&&jc()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Kc(e,t){if(t.startsWith(Vn)){let r=t.slice(Vn.length);return(e.attachments??[]).includes(r)?(f.workspace.openFile(r),!0):!1}if(t.startsWith(Un)){let r=t.slice(Un.length);if(!(e.urls??[]).includes(r))return!1;let n=qt(r);return n?f.workspace.openFile(n):f.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await f.workspace.revealOwnPanel("left_sidebar"),Oe(e.completed?{kind:"smart",id:"completed"}:Te),Le().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(f.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Mo(e.location),!0):!1;default:return!1}}function Ls(){let e=ke(),t=Ro("calendar-source"),r=0,n=!0,i={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:u,endDate:c,limit:m,cursor:h})=>{let v,D=()=>`${t}:${r}`;if(h){let S;try{S=JSON.parse(h)}catch{throw new Error("Invalid Calendar source cursor.")}if(!S||S.startDate!==u||S.endDate!==c||S.limit!==m||S.revision!==D()||typeof S.cursor!="string"||!S.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");v=S.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let M=D(),R=await ka(u,c,m,v);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(h&&M!==D())throw new Error("Calendar source cursor is stale; restart the range.");let O=He(),y=D();return{items:R.todos.map(S=>$c(S,O)).filter(S=>!!S),revision:y,...R.cursor?{cursor:JSON.stringify({startDate:u,endDate:c,limit:m,revision:y,cursor:R.cursor})}:{}}},create:async(u,c)=>{if(c.endDate&&c.endDate!==u)return!1;let m=c.title?.trim();if(!m)return!1;let h=new Date().toISOString();return fr({id:Ro("todo"),title:m,completed:c.completed??!1,priority:Cs(c.priority,"normal"),dueDate:u,startTime:c.startTime,endTime:c.endTime,note:c.note??"",location:c.location,urls:c.urls,attachments:c.attachments,group:c.group,tags:c.tags??[],filePath:c.filePath,createdAt:h,updatedAt:h})},update:async(u,c)=>{let m=await qr(u);return m&&c.endDate&&c.endDate!==(c.date??m.dueDate)?!1:m?Xt(m.id,Rc(m,c),m.updatedAt):!1},remove:u=>mr(u),open:async u=>{let c=await qr(u);await f.workspace.revealOwnPanel("left_sidebar"),c&&(Oe(c.completed?{kind:"smart",id:"completed"}:Te),Le().request(c.id,"focus"))},configure:()=>f.workspace.openOwnSettings(),actions:async u=>{let c=await qr(u);return c?Gc(c):[]},runAction:async(u,c)=>{let m=await qr(u);return m?Kc(m,c):!1}},a=()=>{f.interop.state.publish(ho,++r)};f.interop.state.publish(ho,r);let s=ba(a),l=Ta(a),p=f.interop.services.provide(St,i);return()=>{n=!1,s(),l(),p(),f.interop.state.publish(ho,null)}}var Hn=e=>typeof e=="string"?e:"";function Ps(e){let t=Hn(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Os(e){let t={cardKind:"todo",open:async(r,n)=>{if(Hn(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:Hn(r.id)}),!0;let i=Ps(r.filePath)||Ps(n.path);return i?e.workspace.openFile(i,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(pn,t)}function yt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(i=>f.subscribeState(r,i),[r]);return o.useSyncExternalStore(n,f.getState,f.getState)}function Wr(){let e=o.useCallback(a=>f.interop.state.subscribe(Xo,a),[]),t=o.useCallback(()=>f.interop.state.get(Xo),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,i=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&i?{start:n,end:i}:null}),[i,n,r?.selectedDate])}function _s(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((a,s)=>{let l=new Set(r.current);s?l.add(a):l.delete(a),r.current=l,t(l)},[]),i=o.useCallback(a=>r.current.has(a),[]);return{pendingIds:e,isPending:i,setPending:n}}var Vc="todo.sharedTodos";function Bn(){return f.runtime.getOrCreate(Vc,()=>({todos:[],listeners:new Set}))}function ge(){return Bn().todos}function nt(e){let t=Bn();t.todos=e;for(let r of t.listeners)r(e)}function bt(e){let t=Bn();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function vt(){return f.workspace.openOwnSettings(),Promise.resolve()}var qn={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1},Ms=[xn.find(e=>e.id==="completed"),...xn.filter(e=>e.id!=="completed")];function zt(){return f.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function Fs(){for(let e of zt().listeners)e()}function Wn(e){zt().actions=e,Fs()}function Yn(e,t){e?zt().selected.set(t,e):zt().selected.delete(t),Fs()}function Uc(e){let t=Hr(),r=ge().find(n=>n.id===zt().selected.get(e));return{title:d("manifest.name"),view:t,actions:zt().actions??[],...r?{item:{id:r.id,title:r.title,state:{...t,todoId:r.id}}}:{},navigation:{...Vr(),goBack:()=>io(-1),goForward:()=>io(1)}}}function Hc(e){let t=zt().listeners;t.add(e);let r=bt(e),n=Gn(e),i=f.settings.subscribe(e);return()=>{t.delete(e),r(),n(),i()}}async function Bc(e,t,r=!1){if(typeof e.todoId=="string"&&!await Ze(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Br(e))throw new Error("Unsupported To-Do bookmark.");Yn(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Le().request(e.todoId,"focus")}function qc({label:e,color:t,todos:r}){let[n,i]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>i(a=>!a)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(ot,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},Ms.map(a=>o.createElement("div",{className:"todo-group-status-row",key:a.id},o.createElement("span",null,d(a.labelKey)),o.createElement("span",null,r.filter(s=>Re(s)===a.id).length)))))}function Wc(){let e=o.useSyncExternalStore(bt,ge,ge),t=Be(),r=Mt(),n=r.kind==="smart"?d(gt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...Ms.map(i=>[d(i.labelKey),e.filter(a=>Re(a)===i.id).length])].map(([i,a])=>o.createElement("div",{className:"props-info-row",key:i},o.createElement("dt",{className:"props-info-key"},i),o.createElement("dd",{className:"props-info-value"},a)))),o.createElement("div",{className:"todo-status-groups"},[...Ee(t),...e.some(i=>!i.group)?[null]:[]].map(i=>{let a=e.filter(l=>i===null?!l.group:oe(l.group??"")===oe(i)),s=i??d("todo.chip.noGroup");return o.createElement(qc,{key:i??"ungrouped",label:s,color:i?Me(ze(i,t)):"var(--text-tertiary)",todos:a})})))}function Yc(){let e=o.useSyncExternalStore(bt,ge,ge),t=Be(),r=Mt();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(jo,{embedded:!0,todos:e,groups:t,names:Ee(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,i)=>Oe(n.length||i?{kind:"groups",names:n,includeUngrouped:i}:Te),onOpenSettings:vt}))}function zs(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>hn(e,{id:`todo.${n}`,surface:n,getSnapshot:()=>Uc(n),subscribe:Hc,restore:(i,a,s)=>Bc(i,n,s?.background)},{stateSchema:qn,itemStateSchema:{...qn,required:[...qn.required,"todoId"]},description:(i,a)=>typeof i.view.path=="string"&&i.view.path?i.view.path:d(a?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Zo,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let i=n?.item?.id?await Ze(n.item.id):null;return i?Object.entries(i).map(([a,s])=>({id:a,label:d(`todo.field.${a}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(Wc,null)})),r.push(e.interop.extensions.provide(Zo,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>He().map(n=>({id:n.id,label:n.name,value:ge().filter(i=>oe(i.group??"")===oe(n.name)).length,readOnly:!0})),render:()=>o.createElement(Yc,null)})),()=>r.forEach(n=>n())}function $s(e,t,r){let n=new Date().toISOString();return{id:Ro("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function Rs(e,t){let r=e.trim();if(!r)return;let n=t.trim();return n?`${r}T${n}`:r}function js(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function ao(e,t,r="main_workspace"){let n=o.useRef(ke()).current,[i,a]=o.useState(ge()),[s,l]=o.useState(null),[p,u]=o.useState(null),[c,m]=o.useState(null),[h,v]=o.useState(!0),[D,M]=o.useState(0),[R,O]=o.useState(!1),{pendingIds:y,isPending:S,setPending:x}=_s(),F=o.useRef(!1),_=o.useRef(0),Y=o.useRef({sortField:e,sortDir:t});Y.current={sortField:e,sortDir:t};let q=o.useRef([]),E=o.useMemo(()=>{let A=new Map(i.map(g=>[g.id,g])),ee=new Set(q.current),J=[];for(let g of q.current){let P=A.get(g);P&&J.push(P)}for(let g of i)ee.has(g.id)||J.push(g);return J},[i,D]),X=o.useCallback(A=>{let ee=++_.current;A&&v(!0),ct(n).then(J=>{if(n.assertActive(),ee===_.current){if(A){let{sortField:g,sortDir:P}=Y.current;q.current=Jt(J,g,P).map(L=>L.id)}else{let g=new Set(J.map(K=>K.id)),P=q.current.filter(K=>g.has(K)),L=new Set(P),{sortField:b,sortDir:C}=Y.current,z=Jt(J.filter(K=>!L.has(K.id)),b,C).map(K=>K.id);q.current=[...z,...P]}nt(J),v(!1)}}).catch(()=>{ee===_.current&&v(!1)})},[n]);o.useEffect(()=>(X(!0),()=>{_.current++}),[X]),o.useEffect(()=>Yt(()=>X(!1)),[X]);let re=o.useRef(!0);o.useEffect(()=>{if(re.current){re.current=!1;return}q.current=Jt(ge(),e,t).map(A=>A.id),M(A=>A+1)},[e,t]),o.useEffect(()=>bt(A=>a(A)),[]);let ne=o.useCallback(()=>l(null),[]),N=o.useCallback(A=>{Yn(A,r),m(A)},[r]),I=o.useCallback(()=>m(null),[]),ie=o.useCallback(async(A,ee,J)=>{if(F.current)return null;let g=A.trim();if(!g)return null;let P={...$s(g,ee),...J?.patch};F.current=!0,O(!0),q.current=[P.id,...q.current],nt([P,...ge()]),l(P.id);let L=()=>{q.current=q.current.filter(b=>b!==P.id),nt(ge().filter(b=>b.id!==P.id)),l(b=>b===P.id?null:b)};try{let b=await fr(P);return b||L(),b?P:null}catch{return L(),null}finally{F.current=!1,O(!1)}},[]),ae=o.useCallback(async(A,ee,J)=>{if(S(A))return!1;let g=ge().find(L=>L.id===A);if(!g)return!1;let P={...g,...ee,updatedAt:new Date().toISOString()};x(A,!0),nt(ge().map(L=>L.id===A?P:L));try{return await Xt(A,P,g.updatedAt,J)?!0:(nt(ge().map(b=>b.id===A?g:b)),!1)}catch{return nt(ge().map(L=>L.id===A?g:L)),!1}finally{x(A,!1)}},[S,x]),H=o.useCallback(async A=>{if(S(A))return;let ee=ge().find(g=>g.id===A);if(!ee)return;x(A,!0),q.current=q.current.filter(g=>g!==A),nt(ge().filter(g=>g.id!==A)),l(g=>g===A?null:g),c===A&&m(null);let J=()=>{q.current.includes(A)||q.current.push(A),ge().some(g=>g.id===A)||nt([...ge(),ee])};try{await mr(A)||J()}catch{J()}finally{x(A,!1)}},[c,S,x]);return{todos:i,loading:h,ordered:E,lastCreatedId:s,clearLastCreated:ne,menuId:p,setMenuId:u,editingId:c,openDetail:N,closeDetail:I,pendingIds:y,creating:R,create:ie,patchTodo:ae,removeTodo:H}}function Xn({value:e,onChange:t,timed:r=!0,time:n="",onTimeChange:i,defaults:a=!1}){let{NumberField:s,SelectField:l,Button:p,TimeField:u}=f.ui.settings,[c,m]=o.useState({}),[h,v]=o.useState(!1),D=e===void 0?"default":e.length?"custom":"off",M=R=>{let O=R.some(y=>!Number.isInteger(y)||y<0||y>10080)||new Set(R).size!==R.length;v(O),O||t(R)};return o.createElement("div",{style:{display:"grid",gap:8}},o.createElement(l,{ariaLabel:d("reminders.title"),value:D,onChange:R=>{v(!1),m({}),t(R==="off"?[]:R==="default"?void 0:[10])},options:[...a?[]:[{value:"default",label:d("reminders.default")}],{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]}),e?.map((R,O)=>{let y=c[O]??(R>0&&R%60===0);return o.createElement("div",{key:O,style:{display:"flex",alignItems:"center",gap:8}},o.createElement(s,{min:0,max:y?168:10080,value:y?R/60:R,ariaLabel:d(y?"reminders.hours":"reminders.minutes"),onChange:S=>{S!==null&&M(e.map((x,F)=>F===O?S*(y?60:1):x))}}),o.createElement(l,{value:y?"hours":"minutes",ariaLabel:d("reminders.title"),options:[{value:"minutes",label:d("reminders.minutes")},{value:"hours",label:d("reminders.hours")}],onChange:S=>{m(x=>({...x,[O]:S==="hours"})),M(e.map((x,F)=>F===O?(y?R/60:R)*(S==="hours"?60:1):x))}}),o.createElement(p,{onClick:()=>{m({}),M(e.filter((S,x)=>x!==O))},"aria-label":d("reminders.remove")},"\xD7"))}),D==="custom"&&(e?.length??0)<16&&o.createElement(p,{onClick:()=>{let R=10;for(;e?.includes(R);)R+=5;M([...e??[],R])}},d("reminders.add")),!r&&D!=="off"&&i&&o.createElement(u,{value:n,onChange:i,ariaLabel:d("reminders.time")}),!r&&!n&&D!=="off"&&o.createElement("span",null,d("reminders.timeRequired")),h&&o.createElement("span",{role:"alert"},d("reminders.invalid")))}function Gs(){let[e,t]=o.useState(()=>f.settings.get().reminderOffsets??[10]);return o.useEffect(()=>f.settings.subscribe(()=>t(f.settings.get().reminderOffsets??[10])),[]),o.createElement(f.ui.settings.Section,{title:d("reminders.title")},o.createElement(Xn,{value:e,defaults:!0,onChange:r=>{f.settings.set("reminderOffsets",r??[10])}}))}function Zn({value:e,onChange:t,disabled:r}){let n=f.ui.ResourcePicker;return o.createElement(n,{value:e,onChange:t,kinds:["attachment"],placeholder:d("auto.e7de9576dc00"),disabled:r,ariaLabel:d("auto.8410192cbb1f"),allowCustom:!1})}var Xc=[".ttf",".otf",".woff",".woff2"],Zc=[".csv"],Jc=[".base"],Qc=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],eu=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],tu=[...Qc,...eu,".ico",".flavicon"];var ou=[".pdf"],ru=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],nu=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],iu=[".srt",".vtt",".ass"],au=[".stl",".obj",".glb",".gltf"],su=[".bin",".mtl"];function Jn(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var du={type:"core",id:"valley"},j=(e,t,r,n,i={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:du,...i});function lu(e){let t={};for(let[r,n]of e)for(let i of r)t[i]=n;return t}var cu=lu([[[".mermaid",".mmd"],j("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],j("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],j("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],j("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],j("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Xc,j("font","font","font","media")],[[".epub",".mobi",".azw3"],j("ebook","ebook","ebook","documents")],[[".djvu"],j("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],j("comic","comic","comic","documents")],[[".md",".markdown"],j("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],j("text","text","text","notes")],[[".json"],j("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],j("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Zc,j("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Jc,j("base","base","fallback","data")],[tu,j("image","image","image","media",{information:["identity","dimensions","exif"]})],[ou,j("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[ru,j("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[nu,j("video","video","video","media",{information:["identity","media","video-codec"]})],[iu,j("text","subtitle","text","media")],[au,j("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[su,j("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],j("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],j("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],j("docx","word","opendocument","documents")],[[".ods"],j("csv","excel","opendocument","data")],[[".odp"],j("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],j("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],j("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],j("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],j("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],j("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],j("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],j("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],j("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],j("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],j("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],j("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],j("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],j("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],j("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],j("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],j("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],j("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],j("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],j("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],j("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],j("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],j("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],j("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],j("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],j("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],j("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],j("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),uu=j("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function pu(e){return cu[Jn(e)]??uu}function Go(e){return pu(e).kind}var Ks="valley-vault",Vs="asset";function Yr(e){return`${Ks}://${Vs}/${encodeURIComponent(e)}`}var fu={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function mu(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let i=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(i)} ${t[n]}`}function Qn(e){let t=fu[Go(e)];if(t)return d(t);let r=Jn(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var gu={image:ds,audio:ls,video:cs},Us=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),i=Go(e),a=e.split("/").pop()??e,s=gu[i]??Ir;o.useEffect(()=>{let c=!1;return f.vault.fileInfo(e).then(m=>{c||n(m?.size??null)}),()=>{c=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>f.vault.onChanged(()=>p(c=>c+1)),[]);let u=i==="image"?`${Yr(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:c=>f.workspace.openFile(e,void 0,{newTab:f.ui.hasModKey(c)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},a),o.createElement("span",{className:"todo-attach-meta"},Qn(e),r!==null&&` \xB7 ${mu(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},u?o.createElement("img",{src:u,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:a})},o.createElement(xe,null)))};function ei(e,t=500,r){let n=o.useRef(e);n.current=e;let i=o.useRef(null),a=o.useRef(!1),s=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let u=o.useCallback(async()=>{if(a.current)return;let c=i.current;if(c!==null){i.current=null,a.current=!0;try{let m=await n.current(c);!m&&i.current===null&&(i.current=c),m?l.current=0:l.current+=1}catch{i.current===null&&(i.current=c),l.current+=1}finally{a.current=!1,i.current!==null&&l.current<3?s.current=window.setTimeout(()=>{u()},250):i.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),u()},[u]),o.useCallback(c=>{i.current=c,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,u()},t)},[u,t])}function hu({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:i="text",className:a}){let[s,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let u=()=>{s!==e&&t(s)};return o.createElement("input",{className:a,type:i,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:c=>l(c.target.value),onBlur:()=>{p.current=!1,u()},onKeyDown:c=>{c.key==="Enter"&&c.currentTarget.blur(),c.key==="Escape"&&(l(e),c.currentTarget.blur())}})}function yu(e){let t=f.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var bu=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:i,DateField:a,TimeField:s}=f.ui.settings,[l,p]=o.useState(ge);o.useEffect(()=>bt(p),[]);let u=l.find(g=>g.id===e),c=xa(e),m=Be(),[h,v]=o.useState(!1),[D,M]=o.useState(""),[R,O]=o.useState(!1),[y,S]=o.useState(""),x=yu(e),F=o.useSyncExternalStore(o.useCallback(g=>(x.listeners.add(g),()=>{x.listeners.delete(g)}),[x]),()=>x.value,()=>x.value),_=o.useCallback(g=>{x.value={...x.value,...g};for(let P of x.listeners)P()},[x]),Y=F.title,q=g=>_({title:g}),E=()=>_({error:d("todo.error.saveDraft")});o.useEffect(()=>{x.revision||x.loadingRevision||(x.loadingRevision=f.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(g=>{g&&!x.revision&&(x.revision={expectedRevision:g.revision,vaultGeneration:g.vaultGeneration})}).catch(()=>{_({error:d("todo.error.saveDraft")})}).finally(()=>{x.loadingRevision=void 0}))},[x,e,_]);let X=async g=>(x.revision||await x.loadingRevision,x.revision?t.patchTodo(e,g,x.revision):!1),re=ei(async g=>{let P=g.trim()?await X({title:g}):!0;return P&&x.value.title===g&&_({title:null,error:""}),P},500,E),ne=ei(async g=>{let P=await X({note:g});return P&&x.value.note===g&&_({note:null,error:""}),P},500,E),N=ei(async g=>{let P=JSON.parse(g),L=await X({tags:P});return L&&JSON.stringify(x.value.tags)===g&&_({tags:null,error:""}),L},0,E);if(o.useEffect(()=>{u||r()},[u,r]),!u)return null;let I=g=>{X(g).then(P=>{P||E()})},ie=g=>{_({tags:g}),N(JSON.stringify(g))},ae=g=>I({attachments:g.length?g:void 0}),H=g=>I({urls:g.length?g:void 0}),T=u.remindAt?.slice(0,10)??"",A=u.remindAt?.slice(11,16)??"",ee=(g,P)=>I({remindAt:Rs(g,P),reminderFiredAt:void 0}),J=Ee(m);return o.createElement(f.ui.Modal,{title:d("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{Ao(u,t.removeTodo)}},d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-detail-content"},F.error&&o.createElement("p",{role:"alert"},F.error),o.createElement("div",{className:"todo-detail-title-row"},o.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:Y??u.title,"aria-label":d("auto.c5e8306a511f"),onChange:g=>{q(g.target.value),re(g.target.value)},onBlur:()=>{Y===u.title&&q(null)},onKeyDown:g=>{g.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-detail-flag${u.flagged?" on":""}`,type:"button",onClick:()=>I({flagged:u.flagged?void 0:!0}),"aria-pressed":!!u.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(Fe,null))),o.createElement("div",{className:"todo-detail-cols"},o.createElement("div",{className:"todo-detail-col"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.notes")),o.createElement("div",{className:"todo-detail-notes"},o.createElement("textarea",{className:"todo-detail-note-input",value:F.note??u.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.edit.notes"),rows:7,onChange:g=>{let P=g.target.value;_({note:P}),ne(P)}}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.tags")),o.createElement(f.ui.TagInput,{value:F.tags??u.tags??[],onChange:ie})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(ft,null)," ",d("todo.attachments")),(u.attachments??[]).map(g=>o.createElement(Us,{key:g,relPath:g,onRemove:()=>ae((u.attachments??[]).filter(P=>P!==g))})),h?o.createElement(Zn,{value:D,onChange:g=>{M(g),g&&((u.attachments??[]).includes(g)||ae([...u.attachments??[],g]),M(""),v(!1))}}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>v(!0)},o.createElement(Ve,null)," ",d("todo.addAttachment"))),o.createElement("div",{className:"todo-detail-block todo-detail-links-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Pt,null)," ",d("todo.links")),o.createElement("label",{className:"todo-linked-file-control"},o.createElement("span",null,d("todo.linkedFile")),o.createElement(Zn,{value:u.filePath??"",onChange:g=>I({filePath:g.trim()||void 0})})),(u.urls??[]).map(g=>o.createElement("div",{className:"todo-detail-url-card",key:g},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:g,onClick:P=>{let L=qt(g);L?f.workspace.openFile(L,void 0,{newTab:f.ui.hasModKey(P)}):f.files.openExternalUrl(g)}},o.createElement(Pt,null),o.createElement("span",null,g)),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:g}),onClick:()=>H((u.urls??[]).filter(P=>P!==g))},o.createElement(xe,null)))),R?o.createElement(hu,{className:"todo-detail-link-input todo-detail-url",value:y,onCommit:g=>{let P=ur(g);P&&!(u.urls??[]).includes(P)&&H([...u.urls??[],P]),S(""),O(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>O(!0)},o.createElement(Ve,null)," ",d("todo.addWebAppLink")))),o.createElement("div",{className:"todo-detail-col todo-detail-rail"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.properties")),o.createElement("label",{className:"todo-detail-field","data-status":Re(u)},o.createElement("span",{className:"todo-detail-label"},d("auto.bae7d5be7082")),o.createElement(i,{className:"todo-detail-select",value:Re(u),onChange:g=>I(Ae(g==="open"?null:g)),ariaLabel:d("auto.bae7d5be7082"),options:st().map(g=>({value:g,label:Bt(g)}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.886cbff9d9df")),o.createElement("div",{className:"todo-detail-priority",role:"group","aria-label":d("auto.886cbff9d9df")},We.map(g=>o.createElement("button",{key:g.id,type:"button","aria-pressed":u.priority===g.id,title:d(g.labelKey),onClick:()=>I({priority:g.id})},g.symbol||d("todo.priorityNone"))))),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("todo.edit.group")),o.createElement(f.ui.ComboField,{className:"todo-detail-combo",value:u.group??"",onChange:g=>I({group:g.trim()||void 0}),options:J.map(g=>({value:g,label:g})),ariaLabel:d("todo.edit.group"),clearLabel:d("todo.chip.noGroup"),allowCustom:!1}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.schedule")),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.145caf292855")),o.createElement(a,{className:"todo-detail-inline-date",value:u.dueDate,ariaLabel:d("auto.4c1aeebc433b"),onChange:g=>I({dueDate:g})})),o.createElement("div",{className:"todo-detail-times"},o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.88d8206d586a")),o.createElement(s,{className:"todo-detail-time-input",value:u.startTime??"",ariaLabel:d("auto.88d8206d586a"),onChange:g=>I({startTime:g||void 0})})),o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.cd7800da7f4f")),o.createElement(s,{className:"todo-detail-time-input",value:u.endTime??"",ariaLabel:d("auto.cd7800da7f4f"),onChange:g=>I({endTime:g||void 0})})))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("reminders.title")),o.createElement(Xn,{value:u.reminderOffsets,onChange:g=>I({reminderOffsets:g,remindAt:void 0,reminderFiredAt:void 0}),timed:!!u.startTime,time:u.reminderTime,onTimeChange:g=>I({reminderTime:g})})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.remindMe")),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.onADay")),o.createElement("span",{className:"todo-detail-row-end"},T&&o.createElement(a,{className:"todo-detail-inline-date",value:T,ariaLabel:d("todo.remindDate"),clearable:!1,onChange:g=>ee(g,A)}),o.createElement(n,{checked:!!T,onChange:g=>ee(g?u.dueDate||vu():"",g?A:""),label:d("todo.onADay")}))),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.atATime")),o.createElement("span",{className:"todo-detail-row-end"},A&&o.createElement(s,{className:"todo-detail-inline-input",value:A,ariaLabel:d("todo.remindTime"),clearable:!1,onChange:g=>ee(T,g)}),o.createElement(n,{checked:!!A,disabled:!T,onChange:g=>ee(T,g?"09:00":""),label:d("todo.atATime")}))),T&&o.createElement("p",{className:"todo-detail-hint"},d("todo.reminderAppOpenHint"))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Dr,null)," ",d("todo.location")),o.createElement(Lr,{value:u.location,onChange:g=>I({location:g})})),o.createElement("div",{className:"todo-detail-block todo-activity-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.activity")),c.length?o.createElement("ol",{className:"todo-activity-list"},[...c].reverse().map((g,P)=>o.createElement("li",{key:`${g.changedAt}:${P}`},o.createElement("span",null,Bt(g.from)," \u2192 ",Bt(g.to)),o.createElement("time",{dateTime:g.changedAt},new Date(g.changedAt).toLocaleString(f.ui.language()))))):o.createElement("p",{className:"todo-detail-hint"},d("todo.activity.empty")))))))};function vu(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var so=({c:e})=>e.editingId?o.createElement(bu,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function wu(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function xu(e,t,r=320){let n=t.top-r,i=t.top+t.height+r,a=0,s=e.length;for(;a<s;){let p=a+s>>>1;e[p].start+e[p].height<n?a=p+1:s=p}let l=a;for(s=e.length;a<s;){let p=a+s>>>1;e[p].start<=i?a=p+1:s=p}return[l,a]}function Xr(e,t){let{ids:r,estimate:n,pinned:i=[],layoutKey:a}=t,s=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[u,c]=e.useReducer(N=>N+1,0),[m,h]=e.useState({top:0,height:600}),[v,D]=e.useState(null),[M,R]=e.useState(null),O=e.useRef(null),y=e.useRef(null),S=e.useMemo(()=>{let N=0;return r.map((I,ie)=>{let ae=p.current.get(I)??(typeof n=="number"?n:n(I,ie)),H={id:I,height:ae,start:N};return N+=ae,H})},[r,n,u]),x=S.length?S[S.length-1].start+S[S.length-1].height:0,F=e.useRef({rows:S,viewport:m});F.current={rows:S,viewport:m};let _=e.useCallback(()=>{let N=l.current,I=O.current;if(!N||!I)return;let ie=N.getBoundingClientRect(),ae=I.getBoundingClientRect(),H=I.clientHeight||ae.height||600,T=I===N?I.scrollTop:ae.top-ie.top;h(A=>A.top===T&&A.height===H?A:{top:T,height:H})},[]),Y=e.useCallback(()=>{y.current===null&&(y.current=requestAnimationFrame(()=>{y.current=null,_()}))},[_]);e.useLayoutEffect(()=>{let N=l.current;if(!N||!s)return;let I=wu(N);O.current=I;let ie=N.style.overflowAnchor;N.style.overflowAnchor="none";let ae=!0,H=()=>{if(!ae)return;let J=N.ownerDocument.activeElement,g=J instanceof HTMLElement?J:null;for(;g&&g.parentElement!==N;)g=g.parentElement;D(g?.dataset.visibleKey??null)},T=()=>{queueMicrotask(H)};I.addEventListener("scroll",Y,{passive:!0}),window.addEventListener("resize",Y),N.addEventListener("focusin",H),N.addEventListener("focusout",T);let A=N.clientWidth,ee=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{N.clientWidth!==A&&(A=N.clientWidth,p.current.clear(),c()),Y()});return ee?.observe(I),I!==N&&ee?.observe(N),_(),()=>{ae=!1,N.style.overflowAnchor==="none"&&(N.style.overflowAnchor=ie),I.removeEventListener("scroll",Y),window.removeEventListener("resize",Y),N.removeEventListener("focusin",H),N.removeEventListener("focusout",T),ee?.disconnect(),y.current!==null&&cancelAnimationFrame(y.current),y.current=null,O.current=null}},[s,_,Y]),e.useLayoutEffect(()=>{let N=new Set(r);for(let I of p.current.keys())N.has(I)||p.current.delete(I);_()},[r,_]),e.useLayoutEffect(()=>{p.current.clear(),c()},[a]),e.useLayoutEffect(()=>{let N=l.current;if(!N||!s)return;let I=H=>{let T=0,A=!1,{rows:ee,viewport:J}=F.current,g=new Map(ee.map(P=>[P.id,P]));for(let P of H){let L=P.dataset.visibleKey,b=L?g.get(L):void 0,C=P.getBoundingClientRect().height;!L||!b||C<=0||Math.abs(C-b.height)<.5||(p.current.set(L,C),b.start+b.height<=J.top&&(T+=C-b.height),A=!0)}if(A){let P=O.current,L=N.closest('[data-visible-sections="true"]'),b=N;for(;b&&b.parentElement!==L;)b=b.parentElement;let C=L&&L!==N&&b&&P&&b.getBoundingClientRect().bottom<=P.getBoundingClientRect().top;T&&P&&!C&&(P.scrollTop+=T),c(),Y()}},ie=Array.from(N.children).filter(H=>H.hasAttribute("data-visible-key")),ae=typeof ResizeObserver>"u"?void 0:new ResizeObserver(H=>I(H.map(T=>T.target)));return ie.forEach(H=>ae?.observe(H)),I(ie),()=>ae?.disconnect()}),e.useLayoutEffect(()=>{if(!M)return;let N=Array.from(l.current?.children??[]).find(I=>I.dataset.visibleKey===M.id);N&&(N.scrollIntoView?.({block:"nearest"}),M.selector&&(N.matches(M.selector)?N:N.querySelector(M.selector))?.focus(),_(),R(null))},[M,S,_]);let q=e.useCallback((N,I)=>{R({id:N,selector:I})},[]),[E,X]=s?xu(S,m):[0,S.length],re=new Set;for(let N=E;N<X;N++)re.add(N);let ne=new Set([...i,v,M?.id].filter(Boolean));return ne.size&&S.forEach((N,I)=>{ne.has(N.id)&&re.add(I)}),{ref:l,show:q,render(N){let I=[],ie=0;for(let ae of[...re].sort((H,T)=>H-T)){let H=S[ae];H.start>ie&&I.push(e.createElement("div",{key:`space:${H.id}`,"aria-hidden":!0,style:{height:H.start-ie,flex:"0 0 auto",pointerEvents:"none"}})),I.push(e.createElement(e.Fragment,{key:H.id},N(ae))),ie=H.start+H.height}return x>ie&&I.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:x-ie,flex:"0 0 auto",pointerEvents:"none"}})),I}}}function Hs(e){return f.markdown.render(e,{inline:!0})}function Bs({todo:e,c:t}){let[r,n]=o.useState({source:"",html:""}),i=o.useRef(null);o.useEffect(()=>{let s=!0;return f.markdown.render(e.note).then(l=>{s&&n({source:e.note,html:l})}).catch(()=>{s&&n({source:"",html:""})}),()=>{s=!1}},[e.note]),o.useEffect(()=>{i.current?.querySelectorAll("img.md-embed[data-embed], img.md-asset[data-src]").forEach(s=>{let l=s.dataset.embed??s.dataset.src??"",p=f.workspace.resolveWikilink(l);if(p&&Go(p)==="image")s.src=Yr(p),s.loading="lazy";else{let u=s.ownerDocument.createElement("a");u.dataset.wikilink=l,u.textContent=s.alt||l,u.href="#",s.replaceWith(u)}})},[r]);let a=s=>{let l=s.target,p=l.closest("input.md-task-checkbox");if(p){s.stopPropagation();let h=e.note.split(`
`),v=Number(p.dataset.taskLine);if(!Number.isInteger(v)||!h[v]||t.pendingIds.has(e.id)){s.preventDefault();return}let D=p.checked;h[v]=h[v].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[^\]](\])/,`$1${p.checked?"x":" "}$2`),t.patchTodo(e.id,{note:h.join(`
`)}).then(M=>{!M&&p.isConnected&&(p.checked=!D)});return}let u=l.closest("a");if(!u)return;s.preventDefault(),s.stopPropagation();let c=u.dataset.wikilink,m=u.getAttribute("href")??"";if(c){let h=f.workspace.resolveWikilink(c);h&&f.workspace.openFile(h,void 0,{newTab:f.ui.hasModKey(s)})}else if(ko(m))f.links.open(m);else if(m&&!/^[a-z][a-z\d+.-]*:/i.test(m)&&!m.startsWith("#")){let h=f.workspace.resolveWikilink(m);h&&f.workspace.openFile(h,void 0,{newTab:f.ui.hasModKey(s)})}};return o.createElement("div",{ref:i,className:"todo-notes",onClick:a,...r.source===e.note?{dangerouslySetInnerHTML:{__html:r.html}}:{children:e.note}})}var ku={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Tu=["tomorrow","weekend","pick"];function Su(e=De(new Date)){let t=hr(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return Qt(e,n)}function Zr(e,t=De(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?Qt(t,1):s==="weekend"?Su(t):null,i=new Set,a=[];for(let s of Tu){let l=n(s);if(l!==null){if(l===r||i.has(l))continue;i.add(l)}a.push({id:s,labelKey:ku[s],date:l})}return a}var qs=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:i,onRequestDelete:a,disabled:s=!1})=>{let l=Re(e);return o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:p=>{p.stopPropagation(),r(e.id);let u=Zr(e.dueDate??"",De(new Date));f.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(rt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Ht().map(c=>({label:d(c.labelKey),icon:o.createElement(Ie,{status:c.status,dotCls:c.cls}),type:"radio",checked:c.status===null?l==="open":l===c.status,onSelect:()=>i(Ae(c.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(ro,{className:"todo-menu-action-icon"}),enabled:!s,submenu:u.filter(c=>c.date).map(c=>({label:d(c.labelKey),icon:c.id==="tomorrow"?o.createElement(_o,{className:"todo-menu-action-icon"}):c.id==="weekend"?o.createElement(Cr,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>i({dueDate:c.date})}))},{label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Fe,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:()=>i({flagged:e.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(os,{className:"todo-menu-action-icon"}),enabled:!s,submenu:We.map(c=>({label:da(c.id),type:"radio",checked:e.priority===c.id,onSelect:()=>i({priority:c.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Ar,{className:"todo-menu-action-icon"}),enabled:!s,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>i({group:void 0})},...t.map(c=>({label:c,type:"radio",checked:e.group===c,onSelect:()=>i({group:c})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(rs,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:n},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(Er,{className:"todo-menu-action-icon"}),enabled:!s,danger:!0,onSelect:a}],{anchor:p.currentTarget,align:"end"}).finally(()=>r(null))}},o.createElement(Za,null)))};function Au(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Eu(e,t=.998){return e/1e3*t/(1-t)}function Ws(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let a=e.length-1;a>=0&&(n=e[a],!(r.t-n.t>=t));a--);let i=r.t-n.t;return i>0?(r.x-n.x)/i*1e3:0}function Ys(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let i=Math.max(20,r-t);return Math.sign(e)*(t+Au(n-t,i,.2))}function Xs(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),i=Math.max(-t,Math.min(t,Eu(e.velocity*r))),a=n+i;return{target:Math.abs(a-t)<Math.abs(a)?r*t:0,commit:!1}}function Zs(e,t,r,n,i,a){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/i)**2,p=2*a*Math.sqrt(l),u=t+(-l*(e-r)-p*t)*s,c=e+u*s,m=Math.abs(c-r)<.5&&Math.abs(u)<20;return{value:m?r:c,velocity:m?0:u,done:m}}function ti(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let i=e>88,a=i?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*s<=a+(r?24:0),p=l?s:48,u=Math.min(n*p,Math.max(a,n*32)),c=i?Math.min(Math.max(e*.8,u+56),e-24):u+56;return{buttonWidth:p,labelled:l,openWidth:u,commitPoint:c}}var Js=.22,Qs=.18,Du=.8,Jr=.9,Iu=400,Nu=80,Cu=10,Lu=5,Pu=4,Ou=3,_u=.5,Mu=6,Fu=["left","right"],ed={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function zu(e,t,r,n,i,a){return{kind:e,pointerId:t,originX:r,originY:n,base:i,origin:a,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function $u(e,t){let r={today:o.createElement(_o,null),tomorrow:o.createElement(_o,null),weekend:o.createElement(Cr,null),pick:o.createElement(ro,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:i=>{n.date?t.reschedule(n.date):t.pickDate(i)}}))}var Vo=null;function td(e){if(Vo===e)return;let t=Vo;Vo=e,t?.close()}function od(e){Vo===e&&(Vo=null)}var lo;function rd(e,t){if(lo===void 0)try{lo=document.createElement("canvas").getContext("2d")}catch{lo=null}return lo?(lo.font=t,lo.measureText(e).width):e.length*7}var Ru=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,Ko=e=>e>0?"left":e<0?"right":null,nd=({todo:e,disabled:t,actions:r,onEngage:n,children:i})=>{let a=o.useRef(null),s=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),u=o.useRef(null),c=o.useRef(null),m=o.useRef([]),h=o.useRef(!1),v=o.useRef(null),D=o.useRef(null),M=o.useRef({velocity:0,target:0,response:Js,damping:Jr}),R=o.useRef({left:"",right:""}),O=o.useMemo(()=>$u(Zr(e.dueDate??"",De(new Date)),r),[e.dueDate,r]),y=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Fe,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(Ja,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(Er,null),run:()=>r.remove()}],[r,e.flagged]),S={left:O,right:y},[x,F]=o.useState(()=>({rowWidth:0,left:ed,right:ed})),_=o.useRef(x);_.current=x;let Y=()=>{let b=a.current?.querySelector(".todo-swipe-action");if(!b||typeof getComputedStyle!="function")return"13px sans-serif";let C=getComputedStyle(b);return`${C.fontWeight} ${C.fontSize} ${C.fontFamily}`},q=()=>{let b=a.current?.clientWidth??0,C=Y(),z=_.current,K={rowWidth:b,left:ti(b,O.map(Z=>rd(Z.label,C)),z.left.labelled),right:ti(b,y.map(Z=>rd(Z.label,C)),z.right.labelled)};_.current=K;let te=Z=>z[Z].openWidth!==K[Z].openWidth||z[Z].labelled!==K[Z].labelled;return(z.rowWidth!==b||te("left")||te("right"))&&F(K),K},E=o.useRef(q);E.current=q,o.useEffect(()=>{E.current()},[O,y]);let X=b=>{let C=Ko(b);return!C||C!==c.current?!1:Math.abs(b)>=_.current[C].commitPoint},re=(b,C=!1)=>{p.current=b,C&&b!==0?td(ae.current):b===0&&od(ae.current);let z=a.current,K=s.current;if(!z||!K)return;K.style.transform=b?`translate3d(${b}px, 0, 0)`:"";let te=Ko(b),Z=_.current,he=X(b);z.classList.toggle("open",b!==0),z.classList.toggle("committed",he);for(let me of Fu){let U=l.current[me];if(!U)continue;let fe=te===me;U.classList.toggle("committed",fe&&he);let Ue=fe?he?"100%":`${Math.max(Z[me].openWidth,Math.abs(b))}px`:`${b===0?Z[me].openWidth:0}px`,Ne=`${Ue}|${fe}`;R.current[me]!==Ne&&(R.current[me]=Ne,U.style.width=Ue,U.setAttribute("aria-hidden",String(!fe)))}};o.useLayoutEffect(()=>re(p.current));let ne=()=>{v.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(v.current),v.current=null},N=(b,C,z,K)=>{if(ne(),b!==0&&td(ae.current),p.current===b||Ru()||typeof requestAnimationFrame!="function"){re(b);return}M.current={velocity:C,target:b,response:z,damping:K};let te=0,Z=he=>{let me=te?(he-te)/1e3:.016666666666666666;te=he;let U=M.current,fe=Zs(p.current,U.velocity,U.target,me,U.response,U.damping);U.velocity=fe.velocity,re(fe.value),v.current=fe.done?null:requestAnimationFrame(Z)};v.current=requestAnimationFrame(Z)},I=o.useRef(()=>{});I.current=()=>{u.current=null,N(0,0,Qs,Jr)};let ie=o.useCallback(()=>I.current(),[]),ae=o.useRef({close:()=>I.current()}),H=()=>{ne(),u.current=null,D.current!=null&&window.clearTimeout(D.current),D.current=null,re(0)},T=o.useRef(H);T.current=H;let A=b=>{let C=_.current,z=Ko(b);if(!z)return 0;let K=u.current?.origin;if(K&&z!==K)return 0;let te=C[z],Z=z===c.current?te.commitPoint:te.openWidth;return Ys(b,Z,C.rowWidth)},ee=(b,C,z,K,te)=>{ne(),q();let Z=p.current,he=Ko(Z),me=Math.abs(Z)>8?he:null;c.current=he&&Math.abs(Z)>=_.current[he].openWidth-1?he:null,u.current=zu(b,C,z,K,Z,me),m.current=[{x:Z,t:te}]},J=(b,C)=>{let z=u.current;!z||z.ended||(z.live||(z.live=!0,ne(),n?.()),m.current.push({x:b,t:C}),m.current.length>Mu&&m.current.shift(),re(A(b),!0),X(p.current)&&(z.crossed=!0))},g=b=>{let C=u.current;if(!C||C.ended)return;if(C.ended=!0,!C.live){u.current=null;return}let z=()=>{C.kind==="pointer"&&(u.current=null)},K=Ws(m.current),te=p.current,Z=Ko(te);if(!Z){z(),re(0);return}let he=_.current[Z],me=b&&X(te),U=Xs({offset:te,velocity:K,openWidth:he.openWidth,committed:me});if(z(),U.commit){let fe=Z==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Ue=a.current?.querySelector(fe),Ne=S[Z],w=Z==="left"?Ne[0]:Ne[Ne.length-1];N(0,K,Qs,Jr),w?.run(Ue??a.current);return}N(U.target,K,Js,Math.abs(K)>Iu?Du:Jr)};o.useEffect(()=>ie(),[e.dueDate,e.flagged,ie]),o.useEffect(()=>{let b=ae.current;return()=>{ne(),D.current!=null&&window.clearTimeout(D.current),od(b)}},[]),o.useEffect(()=>{let b=a.current,C=b?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!b||!C)return;let z=0,K=new C(()=>{let te=b.clientWidth,Z=z!==te;z=te,E.current(),Z&&p.current!==0&&T.current()});return K.observe(b),()=>K.disconnect()},[]);let P=o.useRef({disabled:t,begin:ee,move:J,end:g});P.current={disabled:t,begin:ee,move:J,end:g},o.useEffect(()=>{let b=a.current;if(!b)return;let C=()=>{D.current!=null&&window.clearTimeout(D.current),D.current=null},z=()=>{D.current=null,u.current?.kind==="wheel"&&(P.current.end(!0),u.current=null)},K=te=>{let Z=P.current;if(Z.disabled||Math.abs(te.deltaX)<=Math.abs(te.deltaY)||te.deltaX===0)return;te.preventDefault();let he=te.deltaMode===WheelEvent.DOM_DELTA_LINE?16:te.deltaMode===WheelEvent.DOM_DELTA_PAGE?b.clientWidth:1,me=-te.deltaX*he,U=u.current;(!U||U.kind!=="wheel")&&(Z.begin("wheel",-1,0,0,te.timeStamp),U=u.current),C(),D.current=window.setTimeout(z,Nu);let fe=Math.abs(me),Ue=U.previous;U.previous=fe;let Ne=U.live&&(U.ended||U.origin!==null&&p.current===0),w=fe>=Ue+Lu,G=U.distance!==0&&Math.sign(me)!==Math.sign(U.distance)&&fe>=Pu;if(Ne&&(w||G)&&(Z.end(!1),Z.begin("wheel",-1,0,0,te.timeStamp),U=u.current,U.previous=fe),U.ended)return;if(U.decay=fe<Ue?U.decay+1:0,U.peak=Math.max(U.peak,fe),U.distance+=me,U.live&&U.peak>=Cu&&U.decay>=Ou&&fe<U.peak*_u){Z.end(U.crossed);return}!U.live&&Math.abs(U.distance)<8||Z.move(U.base+U.distance,te.timeStamp)};return b.addEventListener("wheel",K,{passive:!1}),()=>{b.removeEventListener("wheel",K),C()}},[]);let L=(b,C)=>o.createElement("div",{ref:z=>{l.current[b]=z},className:`todo-swipe-tray todo-swipe-tray-${b} ${x[b].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${x[b].openWidth}px`}},C.map(z=>o.createElement("button",{key:z.key,type:"button",className:z.cls,tabIndex:-1,title:z.label,"aria-label":z.label,onClick:K=>{K.stopPropagation(),ie(),z.run(K.currentTarget)}},z.icon,o.createElement("span",null,z.label))));return o.createElement("div",{ref:a,className:"todo-swipe","data-visible-key":e.id,onPointerDown:b=>{t||b.pointerType==="mouse"&&b.button!==0||b.target.closest(".todo-swipe-tray")||ee("pointer",b.pointerId,b.clientX,b.clientY,b.timeStamp)},onPointerMove:b=>{let C=u.current;if(!C||C.kind!=="pointer"||C.pointerId!==b.pointerId)return;let z=b.clientX-C.originX,K=b.clientY-C.originY;if(!C.live){if(Math.abs(K)>Math.abs(z)){b.currentTarget.hasPointerCapture?.(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId),u.current=null;return}if(Math.abs(z)<8)return;h.current=!0,b.currentTarget.setPointerCapture?.(b.pointerId)}b.preventDefault(),J(C.base+z,b.timeStamp)},onPointerUp:b=>{let C=u.current;!C||C.kind!=="pointer"||C.pointerId!==b.pointerId||(b.currentTarget.hasPointerCapture?.(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId),C.live&&J(C.base+(b.clientX-C.originX),b.timeStamp),g(!0))},onPointerCancel:b=>{let C=u.current;!C||C.kind!=="pointer"||C.pointerId!==b.pointerId||(b.currentTarget.hasPointerCapture?.(b.pointerId)&&b.currentTarget.releasePointerCapture(b.pointerId),ie())},onClickCapture:b=>{let C=!!b.target.closest(".todo-swipe-tray");if(C&&(h.current=!1),h.current&&!C){h.current=!1,b.stopPropagation(),b.preventDefault();return}p.current&&!C&&(b.stopPropagation(),b.preventDefault(),ie())}},O.length>0&&L("left",O),o.createElement("div",{ref:s,className:"todo-swipe-surface"},i),y.length>0&&L("right",y))};function id(e,t,r){let n=Re(t);f.ui.openMenu(Ht().map(i=>({label:d(i.labelKey),icon:o.createElement(Ie,{status:i.status,dotCls:i.cls}),type:"radio",checked:i.status===null?n==="open":i.status===n,onSelect:()=>r(Ae(i.status))})),{anchor:e})}var ju=2,ad=({todo:e,groups:t,compact:r,c:n,hideDate:i=!1,onMoveFocus:a})=>{let s=o.useRef(null);o.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[l,p]=o.useState("");o.useEffect(()=>{let T=!0;return p(""),Hs(e.title).then(A=>{T&&p(A)}).catch(()=>{T&&p("")}),()=>{T=!1}},[e.title]);let u=(T,A)=>f.workspace.openFile(T,void 0,{newTab:A}),c=We.find(T=>T.id===e.priority)??We[0],m=Ee(t),h=Re(e),v=[e.filePath,...e.attachments??[]].filter(T=>!!T),[D,M]=o.useState(!1),R=D?v:v.slice(0,ju),O=v.length-R.length,y=e.urls?.length??0,S=r&&v.length>0,x=!!(e.dueDate&&!i||e.startTime||e.remindAt||e.location||e.group||y>0||S||e.status&&e.status!=="open"&&!$e(e.status).done||e.priority!=="normal"),F=n.pendingIds.has(e.id),_=De(new Date),Y=e.dueDate&&!i?Ia(e.dueDate,_,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},f.ui.language(),f.getState().dateFormat):"",q=e.dueDate?Ge(e.dueDate,f.getState().dateFormat):"",E=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<_,X=o.useRef(null),re=o.useRef(null);o.useEffect(()=>re.current?zi(e.id,re.current):void 0,[e.id]);let ne=o.useRef(null),N=o.useRef(!1),I=o.useCallback(()=>{ne.current!=null&&(window.clearTimeout(ne.current),ne.current=null)},[]);o.useEffect(()=>I,[I]);let ie=()=>{Ns(e)||n.openDetail(e.id)},ae=T=>n.patchTodo(e.id,T),H=o.useMemo(()=>({reschedule:T=>{n.patchTodo(e.id,{dueDate:T})},pickDate:T=>{let{DateField:A}=f.ui.settings;f.ui.openPopover(ee=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(A,{value:e.dueDate,ariaLabel:d("todo.swipe.date"),onChange:J=>{n.patchTodo(e.id,{dueDate:J}),ee.close()}})),{anchor:T},{ariaLabel:d("todo.swipe.date")})},setStatus:T=>id(T,e,ae),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{Ao(e,n.removeTodo)}}),[e,n]);return o.createElement(nd,{todo:e,disabled:F,actions:H,onEngage:I},o.createElement("article",{ref:re,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,tabIndex:0,onKeyDown:T=>{if(T.target===T.currentTarget){if(T.key==="ArrowDown"||T.key==="ArrowUp"){T.preventDefault(),a?.(T.key==="ArrowDown"?1:-1);return}if(T.key==="Escape"){T.currentTarget.blur();return}T.key==="Enter"&&(T.preventDefault(),n.openDetail(e.id))}},onClick:T=>{T.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||T.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,ie()},220))},onDoubleClick:T=>{s.current&&(clearTimeout(s.current),s.current=null),!T.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:X,className:"todo-check","data-status":h,type:"checkbox",checked:h==="completed",disabled:F,onPointerDown:()=>{F||(N.current=!1,I(),ne.current=window.setTimeout(()=>{N.current=!0;let T=X.current;T&&f.ui.openMenu(Ht().map(A=>({label:d(A.labelKey),icon:o.createElement(Ie,{status:A.status,dotCls:A.cls}),type:"radio",checked:A.status===null?h==="open":A.status===h,enabled:!F,onSelect:()=>n.patchTodo(e.id,Ae(A.status))})),{anchor:T})},450))},onPointerUp:I,onPointerLeave:I,onClick:T=>{N.current&&(T.preventDefault(),N.current=!1)},onChange:T=>{n.patchTodo(e.id,Ae(T.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),h!=="open"&&h!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(Ie,{status:h,dotCls:$e(h).cls}))),o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,c.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},c.symbol," "),l?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:l}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement(Bs,{todo:e,c:n}),(x||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:Me(ze(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!$e(e.status).done&&o.createElement("span",{className:`todo-status-text ${$e(e.status).cls}`},o.createElement(Ie,{status:e.status,dotCls:$e(e.status).cls}),Bt(e.status)),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Lo,null)),la(e.priority)),Y&&o.createElement("button",{className:`todo-date${E?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:q||Y}),onClick:T=>{T.stopPropagation(),ie()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ro,null)),o.createElement("span",{className:"todo-date-day"},Y),q&&q!==Y&&o.createElement("span",{className:"todo-date-full"},q)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(is,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:T=>{T.stopPropagation(),Mo(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Dr,null)),e.location.name),S&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ft,null)),v.length),y>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(Pt,null),y>1&&y),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(ns,null),e.remindAt.slice(11,16)),!r&&e.tags?.map(T=>o.createElement("span",{key:T,className:"todo-tag-text"},"#",T)))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(Fe,null)),o.createElement(qs,{todo:e,groupNames:m,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:ae,onRequestDelete:()=>Ao(e,n.removeTodo),disabled:F})),!r&&v.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},R.map(T=>o.createElement("button",{key:T,className:"todo-file-card",title:T,onClick:A=>{A.stopPropagation(),u(T,f.ui.hasModKey(A))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},T===e.filePath?o.createElement(Ir,null):o.createElement(ft,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},js(T)),o.createElement("span",{className:"todo-file-card-kind"},Qn(T))))),(O>0||D)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${D?" open":""}`,title:D?d("todo.fewerFiles"):d("todo.moreFiles",{p0:O}),"aria-expanded":D,onClick:T=>{T.stopPropagation(),M(A=>!A)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(ot,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},D?d("todo.fewerFiles"):d("todo.moreFiles",{p0:O})))))))};var Je=({todos:e,groups:t,compact:r,hideDate:n=!1,c:i})=>{let a=Le(),s=o.useSyncExternalStore(a.subscribe,a.get,a.get),l=o.useMemo(()=>e.map(m=>m.id),[e]),p=Xr(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[i.editingId,i.menuId,i.lastCreatedId,s?.todoId]}),u=p.show;o.useLayoutEffect(()=>{s&&l.includes(s.todoId)&&u(s.todoId)},[s,l,u]);let c=o.useCallback((m,h)=>{let v=e[Math.max(0,Math.min(e.length-1,m+h))];v&&u(v.id,".todo-row")},[e,u]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(m=>o.createElement(ad,{key:e[m].id,todo:e[m],groups:t,compact:r,c:i,hideDate:n,onMoveFocus:h=>c(m,h)})))};function co({sections:e,c:t,compact:r=!1,className:n,estimate:i,layoutKey:a,children:s}){let l=Le(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),u=o.useMemo(()=>e.map(O=>O.key),[e]),[c,m]=o.useState(null),h=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,c].filter(Boolean)),v=e.filter(O=>O.todos.some(y=>h.has(y.id))).map(O=>O.key),D=o.useCallback((O,y)=>i?.(e[y])??32+e[y].todos.length*(r?52:84),[e,r,i]),M=Xr(o,{ids:u,estimate:D,pinned:v,layoutKey:a??r}),R=M.show;return o.useLayoutEffect(()=>{if(!p)return;let O=e.find(y=>y.todos.some(S=>S.id===p.todoId));O&&R(O.key)},[p,e,R]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:M.ref,onDragStartCapture:O=>m(O.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>m(null)},M.render(O=>o.cloneElement(s(e[O]),{"data-visible-key":u[O]})))}function Gu(e,t,r,n,i){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return Eo(`${t}-01`).toLocaleDateString(void 0,{month:"long",year:"numeric"});if(e==="weekly"){let a=Eo(t),s=new Date(a.getFullYear(),a.getMonth(),a.getDate()+6);return d("todo.breakdown.weekLabel",{count:Na(a),p0:`${et(t,i,n)} \u2013 ${et(Ke(s),i,n)}`})}return t===Qt(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===Qt(r,1)?d("todo.due.tomorrow"):et(t,i,n)}function Qr({todos:e,groups:t,compact:r,controller:n,mode:i,weekStart:a,timeline:s=!1}){let l=Ke(),{shortDateFormat:p}=yt("shortDateFormat"),u=f.ui.language(),c=o.useMemo(()=>{if(!s)return Ln(e,i,Nn(a));let m=[...e].sort((h,v)=>Ct(v).localeCompare(Ct(h)));return Ln(m,i,Nn(a),{dateOf:h=>Cn(Ct(h))})},[i,s,e,a]);return o.createElement(co,{className:"todo-panel-date-sections",sections:c,c:n,compact:r},m=>o.createElement("section",{className:"todo-panel-date-section",key:`${m.kind}:${m.key}`},o.createElement("div",{className:"todo-panel-date-head"},Gu(m.kind,m.key,l,p,u)),o.createElement(Je,{todos:m.todos,groups:t,compact:r,c:n})))}function Ku(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function sd(e,t,r){let n=Ku(e,t);return r?n:n.filter(i=>!At.includes(i))}function Vu(){let[e,t]=_t(),[r]=ht(),n=dt(),i=n.map(l=>l.id),a=sd(e,i,r),s=l=>{let p=a.includes(l)?a.filter(u=>u!==l):i.filter(u=>a.includes(u)||u===l);p.length&&(Ft(p.some(u=>At.includes(u))),t(p.length===i.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":a.length===i.length,onClick:()=>{Ft(!0),t("all")}},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},a.length===i.length?"\u2713":""),o.createElement("span",null,d("todo.chip.all"))),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=a.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>s(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ie,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,d(l.labelKey)))}))}function en({filter:e,className:t=""}){let[r]=ht(),n=dt(),i=n.map(l=>l.id),a=sd(e,i,r),s=e==="all"&&r?d("todo.chip.all"):a.length===1?d(n.find(l=>l.id===a[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:a.length});return o.createElement("button",{type:"button",className:"todo-status-filter-select "+t,"aria-label":d("todo.filters.statuses"),onClick:l=>{f.ui.openPopover(()=>o.createElement(Vu,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.filters.statuses")})}},o.createElement("span",null,s),o.createElement(ot,null))}function tn(e){return e==="flagged"?o.createElement(Fe,null):e==="priority"?o.createElement(Lo,null):e==="due"?o.createElement(Po,null):e==="updated"?o.createElement(Qa,null):e==="created"?o.createElement(es,null):o.createElement(ts,null)}function Uu(){let[e]=ht(),[t,r]=_t(),i=dt().map(s=>s.id),a=s=>{if(t!=="all"){let l=t.filter(c=>i.includes(c)),p=s?i.filter(c=>l.includes(c)||c==="completed"):l.filter(c=>!At.includes(c)),u=p.length?p:i.filter(c=>!At.includes(c));r(u.length===i.length?"all":u)}Ft(s)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,"aria-pressed":!e,onClick:()=>a(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,"aria-pressed":e,onClick:()=>a(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-filter-control-row status"},o.createElement("span",null,d("todo.filters.statuses")),o.createElement(en,{filter:t})))}function ri({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[i,a]=o.useState(e),[s,l]=o.useState(r),p=Object.entries(Nt);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(Co,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement(No,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([u,c])=>o.createElement("button",{key:u,type:"button",className:`todo-sort-option${i===u?" active":""}`,"aria-pressed":i===u,onClick:()=>{a(u),t(u)}},tn(u),o.createElement("span",null,d(c))))))}function jo({todos:e,groups:t,names:r,hasUngrouped:n,selected:i,includeUngrouped:a,onChange:s,onOpenSettings:l,embedded:p=!1}){let[u,c]=o.useState(i),[m,h]=o.useState(a),v=p?i:u,D=p?a:m,M=v.length===r.length&&(!n||D),R=[...r.map(x=>v.some(F=>F.toLowerCase()===x.toLowerCase())),...n?[D]:[]],O=(x,F)=>x?` active${R[F-1]?"":" selection-run-start"}${R[F+1]?"":" selection-run-end"}`:"",y=(x,F)=>{c(x),h(F),s(x,F)},S=x=>{let F=e.filter(q=>x===null?!q.group:oe(q.group??"")===oe(x)),_=x??d("todo.chip.noGroup"),Y=x===null?D:v.some(q=>oe(q)===oe(x));return o.createElement("div",{className:"todo-group-filter-item",key:x??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},x&&o.createElement("span",{className:"props-info-dot",style:{background:Me(ze(x,t))}}),_),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,F.length),o.createElement(f.ui.settings.Toggle,{label:_,checked:Y,onChange:()=>y(x===null?v:Y?v.filter(q=>oe(q)!==oe(x)):[...v,x],x===null?!D:D)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:l},d("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>y(M?[]:r,M?!1:n)},d(M?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(x=>S(x)),n&&S(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>y(M?[]:r,M?!1:n)},d(M?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((x,F)=>{let _=R[F];return o.createElement("button",{key:x,type:"button",className:`todo-group-filter-row${O(_,F)}`,"aria-pressed":_,onClick:()=>y(_?u.filter(Y=>Y.toLowerCase()!==x.toLowerCase()):[...u,x],m)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},_?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Me(ze(x,t))}}),o.createElement("span",{className:"todo-tree-label"},x),o.createElement("span",{className:"todo-tree-count"},_r(e,x)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${O(m,r.length)}`,"aria-pressed":m,onClick:()=>y(u,!m)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},m?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},_r(e,null)))))}var dd={scheduled:()=>o.createElement(Po,null),today:()=>o.createElement(Oo,null),flagged:()=>o.createElement(Fe,null),all:()=>o.createElement(Nr,null),completed:()=>o.createElement(rt,null)},Hu=()=>{let{activePluginTab:e,dateFormat:t}=yt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Wr(),i=Be(),a=Mt(),[s,l]=o.useState(""),[p,u]=o.useState(""),[c,m]=o.useState(""),[h,v]=o.useState({}),[D,M]=o.useState(!1),[R,O]=o.useState(!1),{DateField:y,TimeField:S}=f.ui.settings,[x,F]=o.useState(!1),[_,Y]=Ur(),[q]=ht(),[E,X]=$r("todo"),{sortField:re,sortDir:ne,compact:N}=E,[I,ie]=_t(),ae=dt(),H=Rr(),T=Ts(),A=o.useMemo(()=>ps(T),[T]),ee=e?.pluginId===f.pluginId,J=o.useRef(null),g=o.useRef(null),P=o.useRef(null),L=ao(re,ne,"left_sidebar");jt(L.openDetail);let b=De(new Date),C=o.useMemo(()=>gs(L.todos,b),[L.todos,b]),z=o.useMemo(()=>Ee(i),[i]),K=o.useMemo(()=>L.todos.some(k=>!k.group),[L.todos]),te=a.kind==="groups"?a.names:z,Z=a.kind==="groups"?a.includeUngrouped===!0:K,he=te.length===z.length&&(!K||Z),me=o.useMemo(()=>{let k=L.ordered.filter($=>Or($,a,q,b));return I!=="all"&&(k=k.filter($=>Ut($,I))),_.trim()&&(k=k.filter($=>It(_,$.tags??[],$.title,$.note,$.group??""))),n?k=k.filter($=>{let ue=$.dueDate?.slice(0,10);return!!ue&&ue>=n.start&&ue<=n.end}):r&&(k=k.filter($=>$.dueDate?.slice(0,10)===r)),k},[L.ordered,a,q,I,_,r,n,b]),U=a.kind==="groups"&&a.names.length===1&&!a.includeUngrouped?a.names[0]:void 0,fe=async()=>{if(L.creating)return;let k=yr(s,b),$=k.title;if(!$){Ne();return}let ue=U;if(a.kind==="groups"&&a.names.length+(a.includeUngrouped?1:0)>1){let Ye=await f.ui.openMenu([...a.names.map((fo,Ho)=>({id:`group:${Ho}`,label:fo})),...a.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:J.current??P.current,align:"start"});if(Ye===null)return;ue=Ye.startsWith("group:")?a.names[Number(Ye.slice(6))]:void 0}O(!1);let _e={note:p.trim(),tags:[...new Set([...h.tags??[],...c.split(/[\s,]+/).map(Ye=>Ye.replace(/^#+/,"")).filter(Boolean)])],priority:k.priority,...ue?{group:ue}:{}};a.kind==="smart"&&a.id==="today"&&(_e.dueDate=b),a.kind==="smart"&&a.id==="flagged"&&(_e.flagged=!0),Object.assign(_e,{...h,tags:_e.tags}),k.dueDate&&(_e.dueDate=k.dueDate),await L.create($,void 0,{patch:_e})?(O(!1),l(""),u(""),m(""),v({}),M(!1),J.current?.focus()):O(!0)},Ue=()=>{F(!0),window.setTimeout(()=>J.current?.focus(),0)},Ne=()=>{l(""),F(!1),u(""),m(""),v({}),M(!1),O(!1)},w=Le(),G=o.useSyncExternalStore(w.subscribe,w.get,w.get);o.useEffect(()=>{G?.mode==="create"&&(F(!0),w.clear())},[G,w]),o.useEffect(()=>{x&&!L.creating&&J.current?.focus()},[x,ee,L.creating]),o.useLayoutEffect(()=>{g.current&&(g.current.style.height="auto",g.current.style.height=`${g.current.scrollHeight}px`)},[p,x]);let de=x&&o.createElement("form",{className:"todo-compose",onSubmit:k=>{k.preventDefault(),fe()},onKeyDown:k=>{k.key==="Escape"&&!k.defaultPrevented&&!L.creating&&(k.preventDefault(),Ne())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:J,className:"todo-compose-title",value:s,onChange:k=>l(k.target.value),placeholder:U?d("todo.newTodoIn",{p0:U}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:L.creating}),o.createElement("textarea",{ref:g,className:"todo-compose-note",rows:1,value:p,onChange:k=>u(k.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:L.creating}),o.createElement("div",{className:"todo-compose-tags"},(h.tags??[]).map(k=>o.createElement("span",{className:"todo-compose-token",key:k},o.createElement("span",null,"#",k),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:k}),disabled:L.creating,onClick:()=>v($=>({...$,tags:$.tags?.filter(ue=>ue!==k)}))},o.createElement(xe,null)))),o.createElement("input",{value:c,onChange:k=>{let $=k.target.value;if(!("isComposing"in k.nativeEvent&&k.nativeEvent.isComposing)&&/[\s,]/.test($)){let ue=$.split(/[\s,]+/),_e=ue.pop()??"";v(wt=>({...wt,tags:[...new Set([...wt.tags??[],...ue.map(Ye=>Ye.replace(/^#+/,"")).filter(Boolean)])]})),m(_e)}else m($)},onKeyDown:k=>{k.nativeEvent.isComposing||(k.key==="Enter"&&c.trim()&&(k.preventDefault(),v($=>({...$,tags:[...new Set([...$.tags??[],c.trim().replace(/^#+/,"")].filter(Boolean))]})),m("")),k.key==="Backspace"&&!c&&v($=>({...$,tags:$.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:L.creating})),o.createElement("div",{className:"todo-compose-schedule"},o.createElement(y,{className:"todo-compose-date-field",value:h.dueDate??(a.kind==="smart"&&a.id==="today"?b:""),onChange:k=>v($=>({...$,dueDate:k})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:L.creating}),o.createElement(S,{className:"todo-compose-time-field",value:h.startTime??"",onChange:k=>v($=>({...$,startTime:k||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:L.creating})),o.createElement("div",{className:"todo-compose-location"},o.createElement(Lr,{value:h.location,disabled:L.creating,onChange:k=>v($=>({...$,location:k}))})),o.createElement("div",{className:"todo-compose-attachments"},(h.attachments??[]).map(k=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:k,title:k},o.createElement(ft,null),o.createElement("span",null,k.split("/").pop()),o.createElement("button",{type:"button",disabled:L.creating,"aria-label":`${d("todo.removeAttachment")}: ${k}`,onClick:()=>v($=>({...$,attachments:$.attachments?.filter(ue=>ue!==k)}))},o.createElement(xe,null)))),D?o.createElement(f.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:L.creating,onChange:k=>{k&&(v($=>({...$,attachments:[...new Set([...$.attachments??[],k])]})),M(!1))}}):o.createElement("button",{type:"button",className:"todo-compose-attach","aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),disabled:L.creating,onClick:()=>M(!0)},h.attachments?.length?o.createElement(Ve,null):o.createElement(o.Fragment,null,o.createElement(ft,null),o.createElement("span",null,d("todo.addAttachment"))))),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-priority",disabled:L.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async k=>{let $=await f.ui.openMenu(We.map(ue=>({id:ue.id,label:d(ue.labelKey),checked:ue.id===(h.priority??"normal")})),{anchor:k.currentTarget,align:"start"});$&&v(ue=>({...ue,priority:$}))}},o.createElement(Lo,null),o.createElement("span",null,h.priority&&h.priority!=="normal"?d(`todo.priority.${h.priority}`):d("todo.field.priority"))),o.createElement("button",{type:"button",className:"todo-compose-chip",onClick:()=>v(k=>({...k,flagged:!(k.flagged??(a.kind==="smart"&&a.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":h.flagged??(a.kind==="smart"&&a.id==="flagged"),disabled:L.creating},o.createElement(Fe,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||L.creating},d("todo.group.add"))),R&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:Ne,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:L.creating},o.createElement(xe,null))),je=k=>{f.ui.openPopover(()=>o.createElement(Uu,null),{anchor:k,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},Uo=k=>{f.ui.openPopover(()=>o.createElement(ri,{sortField:re,setSortField:$=>X({sortField:$}),sortDir:ne,setSortDir:$=>X({sortDir:$})}),{anchor:k,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},uo=k=>{f.ui.openPopover(({close:$})=>o.createElement(jo,{todos:L.todos,groups:i,names:z,hasUngrouped:K,selected:te,includeUngrouped:Z,onChange:(ue,_e)=>Oe(ue.length===z.length&&(!K||_e)?Te:{kind:"groups",names:ue,includeUngrouped:_e}),onOpenSettings:()=>{$(),vt()}}),{anchor:k,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},on=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},po=(k,$,ue,_e,wt,Ye,fo)=>{let Ho=Mr(a,$),ui=$.kind==="groups"&&$.names.length===1&&!$.includeUngrouped&&a.kind==="groups"?a.names.some(bd=>oe(bd)===oe($.names[0])):Ho;return o.createElement("button",{key:mt($),type:"button",className:`todo-tree-row${wt?" nested":""}${Ye?` todo-${Ye}-chip`:""}${ui?" active":""}`,"aria-current":Ho?"true":void 0,"aria-pressed":$.kind==="groups"?ui:void 0,style:fo?{"--todo-chip-color":Me(fo),"--todo-chip-on":Ki(fo)}:void 0,onClick:()=>Oe($)},_e&&o.createElement("span",{className:"todo-tree-icon"},_e),wt&&o.createElement("span",{className:"todo-tree-dot",style:{background:Me(wt)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},k),o.createElement("span",{className:"todo-tree-count"},ue))},yd=!!(_||r||n||I!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),di=n?`${Ge(n.start,t)} \u2013 ${Ge(n.end,t)}`:r?Ge(r,t):null,li=I==="all"?null:`${d("auto.bae7d5be7082")}: ${I.length===1?d(ae.find(k=>k.id===I[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:I.length})}`,ci=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!ee&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${he?"":" active"}`,"aria-label":d("todo.view.groups"),title:d("todo.view.groups"),type:"button",onClick:k=>uo(k.currentTarget)},o.createElement(oo,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${q||I!=="all"?" active":""}`,"aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),type:"button",onClick:k=>je(k.currentTarget)},o.createElement(rt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":N,title:N?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>X({compact:!N})},N?o.createElement(Tr,null):o.createElement(Sr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${ne==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Nt[re])}`,type:"button",onClick:k=>Uo(k.currentTarget)},ne==="asc"?o.createElement(No,null):o.createElement(Co,null),tn(re))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>f.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(xr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:_,onChange:k=>Y(k.target.value),onKeyDown:k=>{k.key==="Escape"&&Y("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),_&&o.createElement("button",{className:"search-field-action",onClick:()=>Y(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(xe,null)))),ee?o.createElement("div",{className:"todo-tree todo-active-navigation"},de,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},A.map(k=>po(d(k.labelKey),{kind:"smart",id:k.id},C[k.id],dd[k.id](),void 0,"smart",k.color))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),z.map(k=>po(k,{kind:"groups",names:[k]},_r(L.todos,k),void 0,ze(k,i))))):o.createElement(o.Fragment,null,!_&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},di?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:on},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Oo,null)),o.createElement("span",{className:"todo-tree-label"},di),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(xe,null))):A.map(k=>po(d(k.labelKey),{kind:"smart",id:k.id},C[k.id],dd[k.id](),void 0,"smart",k.color))),li&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>ie("all")},o.createElement("span",{className:"todo-tree-label"},li),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(xe,null)))),o.createElement("div",{className:"todo-list"},de,L.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):me.length?o.createElement(Qr,{todos:me,groups:i,compact:N,controller:L,mode:H,weekStart:f.getState().weekStart,timeline:a.kind==="smart"&&a.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,yd)))),!x&&o.createElement("button",{ref:P,className:"todo-fab",type:"button","aria-label":ci,title:ci,disabled:L.creating,onClick:Ue},o.createElement(Ve,null)),o.createElement(so,{c:L}))},ld=()=>o.createElement(Hu,null);function Bu({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let i=dt(),a=i.map(p=>p.id),s=r==="all"?a:r,l=p=>{let u=s.includes(p)?s.filter(c=>c!==p):a.filter(c=>s.includes(c)||c===p);u.length&&n(u.length===a.length?"all":u)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,onClick:()=>t(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,onClick:()=>t(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},i.map(p=>o.createElement("button",{key:p.id,type:"button",className:"todo-status-filter-option","aria-pressed":s.includes(p.id),onClick:()=>l(p.id)},o.createElement("span",{className:"todo-status-filter-check"},s.includes(p.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ie,{status:p.id==="open"?null:p.id,dotCls:p.cls})),o.createElement("span",null,d(p.labelKey))))))}var cd=()=>{let{activePath:e,weekStart:t}=yt("activePath","weekStart"),r=xt(e)??"",n=Be(),i=Rr(),[a,s]=$r("attachment"),{showCompleted:l,statusFilter:p,compact:u,sortField:c,sortDir:m,groupNames:h,includeUngrouped:v}=a,D=E=>s({showCompleted:E}),M=E=>s({statusFilter:E}),R=E=>s({sortField:E}),O=E=>s({sortDir:E}),y=ao(c,m,"right_sidebar");jt(y.openDetail);let S=o.useMemo(()=>Ee(n),[n]),x=o.useMemo(()=>y.todos.some(E=>!E.group),[y.todos]),F=o.useMemo(()=>y.ordered.filter(E=>!(xt(E.filePath)===r||(E.attachments??[]).some(re=>xt(re)===r))||!l&&E.completed||(h.length||v)&&(!E.group&&!v||E.group&&!new Set(h.map(oe)).has(oe(E.group)))?!1:Ut(E,p)),[y.ordered,r,l,p,h,v]),_=E=>{f.ui.openPopover(({close:X})=>o.createElement(jo,{todos:y.todos,groups:n,names:S,hasUngrouped:x,selected:h,includeUngrouped:v,onChange:(re,ne)=>s({groupNames:re,includeUngrouped:ne}),onOpenSettings:()=>{X(),vt()}}),{anchor:E,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},Y=E=>{f.ui.openPopover(()=>o.createElement(Bu,{showCompleted:l,setShowCompleted:D,filter:p,setFilter:M}),{anchor:E,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},q=E=>{f.ui.openPopover(()=>o.createElement(ri,{sortField:c,setSortField:R,sortDir:m,setSortDir:O}),{anchor:E,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${h.length||v?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:E=>_(E.currentTarget)},o.createElement(oo,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:E=>Y(E.currentTarget)},o.createElement(rt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":u,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!u})},u?o.createElement(Tr,null):o.createElement(Sr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${m==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Nt[c])}`,onClick:E=>q(E.currentTarget)},m==="asc"?o.createElement(No,null):o.createElement(Co,null),tn(c)))),o.createElement("div",{className:"todo-list"},y.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?F.length?o.createElement(Qr,{todos:F,groups:n,compact:u,controller:y,mode:i,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(so,{c:y}))};var ni="pageCollapsed";function qu(){let e=f.settings.get()[ni];return Array.isArray(e)?new Set(e.filter(t=>eo.includes(t))):new Set(["completed"])}var ud=({navigation:e})=>{let{dateFormat:t,shortDateFormat:r}=yt("dateFormat","shortDateFormat"),{selectedDate:n,selectedDateRange:i}=Wr(),{SelectField:a}=f.ui.settings,s=Be(),l=Mt(),p=Vr();o.useEffect(()=>(e.setController({canGoBack:p.canGoBack,canGoForward:p.canGoForward,goBack:()=>io(-1),goForward:()=>io(1)}),()=>e.setController(null)),[e,p.canGoBack,p.canGoForward]);let[u,c]=o.useState(""),[m,h]=Ur(),[v,D]=Ds(),{field:M,dir:R}=v,[O,y]=o.useState(qu),[S,x]=o.useState(new Set),[F,_]=ht(),[Y]=_t(),q=o.useRef(null),E=ao("due","asc");jt(E.openDetail),o.useEffect(()=>{if(!E.loading)if(l.kind==="groups"){let w=new Set(Ee(s));!l.includeUngrouped&&!l.names.some(G=>w.has(G))&&Oe(Te)}else l.kind==="tag"&&(E.todos.some(w=>w.tags?.includes(l.name))||Oe(Te))},[E.loading,E.todos,s,l]),o.useEffect(()=>{F&&y(w=>{if(!w.has("completed"))return w;let G=new Set(w);return G.delete("completed"),f.settings.set(ni,[...G]),G})},[F]);let X=Ke(),re=l.kind==="smart"?gt(l.id):null,ne=!!re?.dated,N=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?l.names[0]:d("todo.view.selectedGroups",{count:l.names.length+(l.includeUngrouped?1:0)}):l.kind==="tag"?`#${l.name}`:l.kind==="nogroup"?d("todo.chip.noGroup"):d(re.labelKey),I=l.kind==="groups"?l.names.length===1&&!l.includeUngrouped?Me(ze(l.names[0],s)):"var(--accent-color)":l.kind==="tag"?"var(--accent-color)":l.kind==="nogroup"?"var(--text-color)":Me(re.color)||"var(--text-color)",ie=o.useMemo(()=>{let w=E.todos.filter(G=>Or(G,l,F,X));return Y!=="all"&&(w=w.filter(G=>Ut(G,Y))),m.trim()&&(w=w.filter(G=>It(m,G.tags??[],G.title,G.note,G.group??""))),i?w=w.filter(G=>{let de=G.dueDate?.slice(0,10);return!!de&&de>=i.start&&de<=i.end}):n&&(w=w.filter(G=>G.dueDate?.slice(0,10)===n)),w},[E.todos,l,F,Y,m,n,i,X]),ae=o.useMemo(()=>ms(E.todos,l,X),[E.todos,l,X]),H=ie,T=o.useMemo(()=>ne?Oa(H.filter(w=>!w.completed),X):[],[ne,H,X]),A=T.filter(w=>!!w.key&&w.key<X),ee=T.find(w=>w.key===X),J=ne?H.filter(w=>w.completed):[],g=o.useMemo(()=>ee?Fa(ee.todos):[],[ee]),{near:P,months:L}=o.useMemo(()=>za(T.filter(w=>!w.key||w.key>X),X),[T,X]),b=o.useMemo(()=>L.map(w=>({...w,todos:w.days.flatMap(G=>G.todos)})),[L]),C=o.useMemo(()=>{if(ne)return null;let w=Do(H,X);if(M!=="auto")for(let G of eo)w[G]=Jt(w[G],M,R);return w},[ne,H,X,M,R]),z=o.useMemo(()=>l.kind==="smart"&&l.id==="completed"?_a(H):null,[l,H]),K=E.lastCreatedId?H.find(w=>w.id===E.lastCreatedId)??E.todos.find(w=>w.id===E.lastCreatedId):void 0,te=w=>{x(G=>{let de=new Set(G);return de.has(w)?de.delete(w):de.add(w),de})},Z=w=>{y(G=>{let de=new Set(G);return de.has(w)?de.delete(w):de.add(w),f.settings.set(ni,[...de]),de})},he=l.kind==="groups"&&l.names.length===1&&!l.includeUngrouped?l.names[0]:void 0,me=async w=>{let G=yr(u,X);if(!G.title){q.current?.focus();return}let de=w?.group??he;if(!w?.group&&l.kind==="groups"&&l.names.length+(l.includeUngrouped?1:0)>1){let uo=await f.ui.openMenu([...l.names.map((on,po)=>({id:`group:${po}`,label:on})),...l.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:q.current,align:"start"});if(uo===null)return;de=uo.startsWith("group:")?l.names[Number(uo.slice(6))]:void 0}c("");let je=G.dueDate||(l.kind==="smart"&&l.id==="today"?X:"");if(!await E.create(G.title,void 0,{patch:{dueDate:je,priority:G.priority,...de?{group:de}:{},...l.kind==="smart"&&l.id==="flagged"?{flagged:!0}:{}}})){c(u);return}},U=()=>{f.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},fe=Ee(s),Ue=[{label:d("todo.fab.newTodo"),icon:o.createElement(Ve,null),onSelect:tr},...fe.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Ar,null),submenu:fe.map(w=>({label:w,onSelect:()=>{Oe({kind:"groups",names:[w]}),tr()}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(oo,null),onSelect:()=>{vt()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(Pt,null),onSelect:()=>{navigator.clipboard.writeText(f.workspace.buildOwnLink(Hr()))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(as,null),onSelect:()=>f.workspace.openOwnSettings()}];o.useEffect(()=>{Wn(Ue)}),o.useEffect(()=>()=>Wn(null),[]);let Ne=u.trim()||E.creating?d("auto.9c0410f3884e"):d("todo.fab.menu");return o.createElement("div",{className:"todo-page"},o.createElement("div",{className:"todo-page-appbar"},o.createElement("div",{className:"todo-page-appbar-title",style:{color:I}},N)),o.createElement("div",{className:"todo-page-scroll hidescrollbar"},o.createElement("div",{className:"todo-page-column"},o.createElement("header",{className:"todo-page-header"},o.createElement("h1",{className:"todo-page-view-title",style:{color:I}},N),o.createElement("div",{className:"todo-page-view-sub"},o.createElement("span",null,d("todo.page.completedCount",{count:ae})),o.createElement("button",{type:"button",className:"todo-page-view-toggle",style:{color:I},"aria-pressed":F,onClick:_},d(F?"todo.completed.hide":"todo.completed.showAll")))),o.createElement("form",{className:"todo-page-quickadd",onSubmit:w=>{w.preventDefault(),me()}},o.createElement(Ve,{className:"todo-page-quickadd-icon"}),o.createElement("input",{ref:q,value:u,onChange:w=>c(w.target.value),placeholder:he?d("todo.newTodoIn",{p0:he}):d("auto.d0e6e1dca756"),"aria-label":d("auto.81df98734775"),disabled:E.creating})),o.createElement("div",{className:"todo-page-toolbar"},o.createElement("div",{className:"todo-search-wrap search-field"},o.createElement(xr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:m,onChange:w=>h(w.target.value),placeholder:d("auto.f4ade25164a5"),"aria-label":d("auto.e0345e9d3092")}),m&&o.createElement("button",{className:"search-field-action",type:"button",onClick:()=>h(""),"aria-label":d("auto.67300d0fed7c")},o.createElement(xe,null))),o.createElement(a,{className:"flagged-notes-sort-select",value:M,ariaLabel:d("auto.63e08dc2a4e3"),onChange:w=>D({...v,field:w}),options:[{value:"auto",label:d("auto.c614ba7c453c")},...Object.entries(Nt).map(([w,G])=>({value:w,label:d(G)}))]}),M!=="auto"&&o.createElement("button",{className:"flagged-notes-sort-dir",type:"button","aria-label":d("auto.44b8af7351fe",{p0:R==="asc"?"descending":"ascending"}),onClick:()=>D({...v,dir:R==="asc"?"desc":"asc"})},R==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")),o.createElement(en,{filter:Y}),(i||n)&&o.createElement("button",{type:"button",className:"todo-due-chip active todo-date-chip",title:d("auto.f93fb4b1ab19"),onClick:U},i?`${Ge(i.start,t)} \u2013 ${Ge(i.end,t)}`:Ge(n,t)," ",o.createElement(xe,null))),E.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):z?z.length?o.createElement(co,{className:"todo-completed-timeline",sections:z,c:E},w=>o.createElement("section",{className:"todo-schedule-block",key:w.key},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,et(w.key,f.ui.language(),r)),o.createElement("span",{className:"todo-page-section-count"},w.todos.length)),o.createElement(Je,{todos:w.todos,groups:s,compact:!1,c:E}))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.cec28cbe4204"))):ne?T.length||J.length?o.createElement(o.Fragment,null,J.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-completed"},o.createElement("span",null,d("todo.view.completed")),o.createElement("span",{className:"todo-page-section-count"},J.length)),o.createElement(Je,{todos:J,groups:s,compact:!1,c:E})),A.length>0&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-overdue"},o.createElement("span",null,d("todo.due.overdue")),o.createElement("span",{className:"todo-page-section-count"},A.reduce((w,G)=>w+G.todos.length,0))),o.createElement(co,{sections:A,c:E},w=>o.createElement("div",{key:w.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head is-overdue"},et(w.key,f.ui.language(),r)),o.createElement(Je,{todos:w.todos,groups:s,compact:!1,hideDate:!0,c:E})))),ee&&o.createElement("section",{className:"todo-schedule-block"},o.createElement("h2",{className:"todo-schedule-head todo-schedule-today"},o.createElement("span",null,d("todo.due.today")),o.createElement("span",{className:"todo-page-section-count"},ee.todos.length)),g.map(w=>o.createElement("div",{key:w.id,className:"todo-page-days"},w.id!=="untimed"&&o.createElement("h3",{className:"todo-timeofday-head"},d(Ma[w.id])),o.createElement(Je,{todos:w.todos,groups:s,compact:!1,hideDate:!0,c:E})))),P.map(w=>o.createElement("section",{key:w.key||"nodate",className:"todo-page-days"},o.createElement("h2",{className:"todo-day-head"},w.key?et(w.key,f.ui.language(),r):d("todo.due.noDeadline")),o.createElement(Je,{todos:w.todos,groups:s,compact:!1,hideDate:!0,c:E}))),o.createElement(co,{sections:b,c:E,layoutKey:S,estimate:w=>S.has(w.key)?48+w.days.length*32+w.todos.length*84:48},w=>{let G=!S.has(w.key),de=w.days.reduce((je,Uo)=>je+Uo.todos.length,0);return o.createElement("section",{key:w.key,className:`todo-month${G?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-month-head","aria-expanded":!G,onClick:()=>te(w.key)},o.createElement(ot,{className:"todo-page-section-chevron"}),o.createElement("span",{className:"todo-month-label"},Da(w.key,f.ui.language(),{partial:w.partial,restOfLabel:d("todo.month.restOf")})),o.createElement("span",{className:"todo-page-section-count"},de)),!G&&w.days.map(je=>o.createElement("div",{key:je.key,className:"todo-page-days"},o.createElement("h3",{className:"todo-day-head"},et(je.key,f.ui.language(),r)),o.createElement(Je,{todos:je.todos,groups:s,compact:!1,hideDate:!0,c:E}))))})):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.cec28cbe4204"))):eo.map(w=>{let G=C[w];K&&!G.some(je=>je.id===K.id)&&Do([K],X)[w].length&&(G=[K,...G]);let de=O.has(w);return!G.length&&w!=="today"?null:o.createElement("section",{key:w,className:`todo-page-section${de?" collapsed":""}`},o.createElement("button",{type:"button",className:"todo-page-section-head","aria-expanded":!de,onClick:()=>Z(w)},o.createElement(ot,{className:"todo-page-section-chevron"}),o.createElement("span",{className:`todo-page-section-label todo-page-section-${w}`},d(Pa[w])),o.createElement("span",{className:"todo-page-section-count"},G.length)),!de&&o.createElement("div",{className:"todo-page-section-body"},G.length?o.createElement(Je,{todos:G,groups:s,compact:!1,c:E}):o.createElement("div",{className:"todo-page-section-empty"},d("auto.346d73d6f5b6"))))}))),o.createElement("button",{className:"todo-fab",type:"button","aria-label":Ne,title:Ne,disabled:E.creating,onClick:()=>{u.trim()?me():tr()}},o.createElement(Ve,null)),o.createElement(so,{c:E}))};var pd={scheduled:()=>o.createElement(Po,null),today:()=>o.createElement(Oo,null),flagged:()=>o.createElement(Fe,null),all:()=>o.createElement(Nr,null),completed:()=>o.createElement(rt,null)};function Wu(){let{Button:e,IconButton:t,useReorderDrag:r}=f.ui.settings,[n,i]=o.useState($o);o.useEffect(()=>f.settings.subscribe(()=>i($o())),[]);let a=c=>{i(c),ks(c)},s=n.order.filter(c=>!n.hidden.includes(c)),l=s.map(gt),p=r({items:l,indicatorOnly:!0,getId:c=>c.id,getLabel:c=>d(c.labelKey),onReorder:c=>{let m=c.map(v=>v.id),h=0;a({...n,order:n.order.map(v=>n.hidden.includes(v)?v:m[h++])})}}),u=c=>{if(s.length<=1)return;let m={...n,hidden:[...n.hidden,c]};a(m);let h=Ot();if(h.kind==="smart"&&h.id===c){let v=m.order.find(D=>!m.hidden.includes(D));Oe({kind:"smart",id:v})}};return o.createElement(f.ui.settings.Section,{title:d("todo.settings.smartLists")},o.createElement("div",{className:"todo-smart-list-settings"},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.smartListsDesc")),l.map(c=>{let m=p.getHandleProps(c);return o.createElement("div",{className:"todo-smart-list-setting-row"+(p.overId===c.id?" drop-"+(p.dropPosition??"before"):""),key:c.id,...p.getItemProps(c)},o.createElement("button",{...m,className:(m.className??"")+" todo-status-setting-handle",title:d("todo.settings.smartListReorder")},o.createElement(kr,null)),o.createElement("span",{className:"todo-smart-list-setting-glyph"},pd[c.id]()),o.createElement("span",{className:"todo-status-setting-name"},d(c.labelKey)),o.createElement(t,{onClick:()=>u(c.id),disabled:s.length<=1,ariaLabel:d("todo.settings.smartListHide",{p0:d(c.labelKey)}),title:d("todo.settings.smartListHide",{p0:d(c.labelKey)})},o.createElement(xe,null)))}),n.hidden.length>0&&o.createElement("div",{className:"todo-smart-list-hidden"},o.createElement("span",{className:"todo-smart-list-hidden-title"},d("todo.settings.smartListsHidden")),n.hidden.map(c=>{let m=gt(c);return o.createElement("div",{className:"todo-smart-list-hidden-row",key:c},o.createElement("span",{className:"todo-smart-list-setting-glyph"},pd[c]()),o.createElement("span",null,d(m.labelKey)),o.createElement(e,{onClick:()=>a({...n,hidden:n.hidden.filter(h=>h!==c)})},d("todo.settings.smartListRestore")))})),p.liveRegion))}function Yu(){let{ColorField:e,IconButton:t,useReorderDrag:r}=f.ui.settings,[n,i]=o.useState(Kt),[a,s]=o.useState(null);o.useEffect(()=>f.settings.subscribe(()=>i(Kt())),[]);let l=y=>{i(y),Yi(y)},p=n.active.map(y=>$e(y)),u=wo.filter(y=>!n.active.includes(y)).map(y=>$e(y)),c=[...p,...u],m=r({items:c,indicatorOnly:!0,getId:y=>y.id,getLabel:y=>d(y.labelKey),onReorder:(y,S)=>{let x=n.active.includes(S.activeId),F=n.active.includes(S.overId);if(x&&F){let _=new Set(n.active);l({...n,active:y.filter(Y=>_.has(Y.id)).map(Y=>Y.id)})}else if(x)l({...n,active:n.active.filter(_=>_!==S.activeId)});else if(F){let _=[...n.active],Y=_.indexOf(S.overId);_.splice(Y+(S.position==="after"?1:0),0,S.activeId),l({...n,active:_})}}}),h=y=>{l({...n,active:n.active.filter(S=>S!==y)})},v=y=>{n.active.includes(y)||l({...n,active:[...n.active,y]})},D=(y,S)=>{if(!m.activeId)return;S.preventDefault(),S.dataTransfer.dropEffect="move";let x=S.target.closest(".todo-status-setting-row");s(x&&!x.classList.contains("locked")?null:y)},M=y=>{y.currentTarget.contains(y.relatedTarget)||s(null)},R=(y,S)=>{let x=S.target.closest(".todo-status-setting-row");if(x&&!x.classList.contains("locked"))return;let F=S.dataTransfer.getData("text/plain");wo.includes(F)&&(S.preventDefault(),y==="show"?v(F):h(F),m.cancel(),s(null))},O=[$e("open"),$e("completed")];return o.createElement(f.ui.settings.Section,{title:d("todo.settings.statuses")},o.createElement("div",{className:"todo-status-settings","data-drop-zone":a??void 0,onDragEndCapture:()=>s(null)},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.statusesDesc")),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesShow")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-show${a==="show"?" accepts-drop":""}`,onDragOver:y=>D("show",y),onDragLeave:M,onDrop:y=>R("show",y)},O.map(y=>o.createElement("div",{className:"todo-status-setting-row locked",key:y.id},o.createElement("span",{className:"todo-status-setting-handle",title:d("todo.settings.statusLocked")},o.createElement(Xa,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:y.id==="open"?null:y.id,dotCls:y.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(y.labelKey)),o.createElement(e,{value:n.colors[y.id],onChange:S=>l({...n,colors:{...n.colors,[y.id]:S}}),ariaLabel:d("todo.settings.statusColor",{p0:d(y.labelKey)}),allowCustom:!1}),o.createElement("span",{className:"todo-status-setting-action","aria-hidden":"true"}))),p.map(y=>{let S=m.getHandleProps(y);return o.createElement("div",{className:"todo-status-setting-row"+(m.overId===y.id?" drop-"+(m.dropPosition??"before"):""),key:y.id,...m.getItemProps(y)},o.createElement("button",{...S,draggable:!0,className:(S.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:x=>{S.onDragStart?.(x),x.dataTransfer.setData("text/plain",y.id)}},o.createElement(kr,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:y.id,dotCls:y.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(y.labelKey)),o.createElement(e,{value:n.colors[y.id],onChange:x=>l({...n,colors:{...n.colors,[y.id]:x}}),ariaLabel:d("todo.settings.statusColor",{p0:d(y.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>h(y.id),ariaLabel:d("todo.settings.statusHide",{p0:d(y.labelKey)}),title:d("todo.settings.statusHide",{p0:d(y.labelKey)})},o.createElement(xe,null)))})),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesHide")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-hide${a==="hide"?" accepts-drop":""}`,onDragOver:y=>D("hide",y),onDragLeave:M,onDrop:y=>R("hide",y)},u.map(y=>{let S=m.getHandleProps(y);return o.createElement("div",{className:"todo-status-setting-row"+(m.overId===y.id?" drop-"+(m.dropPosition??"before"):""),key:y.id,...m.getItemProps(y)},o.createElement("button",{...S,draggable:!0,className:(S.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:x=>{S.onDragStart?.(x),x.dataTransfer.setData("text/plain",y.id)}},o.createElement(kr,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(Ie,{status:y.id,dotCls:y.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(y.labelKey)),o.createElement(e,{value:n.colors[y.id],onChange:x=>l({...n,colors:{...n.colors,[y.id]:x}}),ariaLabel:d("todo.settings.statusColor",{p0:d(y.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>v(y.id),ariaLabel:d("todo.settings.statusShow",{p0:d(y.labelKey)}),title:d("todo.settings.statusShow",{p0:d(y.labelKey)})},o.createElement(Ve,null)))}),!u.length&&o.createElement("span",{className:"todo-status-visibility-empty"},d("todo.settings.statusesHideEmpty"))),m.liveRegion))}function fd(){let{Button:e,Row:t,Section:r,SelectField:n}=f.ui.settings,[i,a]=o.useState(Fr);return o.createElement(o.Fragment,null,o.createElement(r,{title:d("todo.settings.display")},o.createElement(t,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(n,{className:"todo-date-breakdown-select",value:i,onChange:s=>{let l=s;a(l),f.settings.set(jn,l)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(Gs,null),o.createElement(Wu,null),o.createElement(r,null,o.createElement(f.ui.settings.GroupsEditor,null)),o.createElement(Yu,null))}var md="reminder:";function gd(){let e=ke();return f.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(md))return;let i=n??t.slice(md.length).split(":")[0];ct(e).then(a=>{e.assertActive();let s=a.find(l=>l.id===i);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var ii=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),ai=e=>({type:"string",description:e});async function si(e,t,r,n){let i=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!i.ok)throw new Error(i.error.message);return i.value}function hd(e){return cn([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:ii({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let i=(await si(e,"list",{section:"",q:""},r)).filter(a=>a.completed!==!0&&a.status!=="completed");return i.length?i.map(a=>`- [${a.status||"open"}] ${a.title??""} (${a.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:ii({title:ai("Task title"),due:ai("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await si(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:ii({id:ai("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await si(e,"complete",{query:n},r)).title||n}".`}}])}function Xu(e){sa(e);let t=$i(e),r=Ri(),n=Zi(),i=!1,a=e.backend.on("records.eventDeliveryFailed",()=>{i||(i=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{i=!1}))});xs();let s=e.workspace.onOpenOwnLink(O=>{Br(O)});e.registerView("todo.panel",ld),e.registerView("todo.file",cd),e.registerView("todo.page",ud),e.registerView("todo.settings",fd);let l=Ua(e),p=zs(e),u=e.interop.services.provide(un,hd(e)),c=Ya(),m=Ls(),h=e.interop.services.subscribe(St,()=>{}),v=e.interop.services.subscribe(St,()=>{}),D=Os(e),M=gd(),R=Sa();return()=>{a(),t(),l(),p(),u(),c(),m(),h(),v(),D(),M(),R(),s(),n(),r()}}var Zu={register:Xu},Qv=Zu;export{Qv as default,Xu as register};

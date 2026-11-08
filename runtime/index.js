var nt="valley";var Np=`.${nt}`,Pp=`app.${nt}`;function Ud(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Vd=/^[a-zA-Z]:/;function ao(e){if(typeof e!="string")return"";let t=Ud(e);return!t||t==="."||Vd.test(t)||t.split("/").some(r=>r==="..")?"":t}function bt(e){if(typeof e=="string")return ao(e)||void 0}var pe=`.${nt}`,Hd="plugins",io=`${pe}/${Hd}`,$o=`${io}/packages`,Mp=`${$o}/core`,_p=`${$o}/github`,Fp=`${$o}/local`,zp=`${$o}/community`,Rp=`${io}/community.json`,$p=`${io}/data`;var jp=`${io}/enabled.json`,Gp=`${io}/sources.json`,Kp=`${pe}/state`,ge=`${pe}/settings`,La=`${pe}/data`,dn=`${pe}/recovery`;var ln=`${pe}/accounts`,_t=`${pe}/ai`,Up=`${_t}/connections.json`,Vp=`${_t}/defaults.json`,Hp=`${_t}/budgets.json`,Bp=`${_t}/usage.sqlite`,Wp=`${_t}/security/guards.json`,qp=`${_t}/security/activity.sqlite`,Yp=`${ln}/providers`,Zp=`${ln}/providers.lock.json`,Bd=`${pe}/trash`,Xp=`${Bd}/items`,cn=`${pe}/cache`,Jp=`${cn}/accounts`,Wd=`${cn}/search`,Qp=`${cn}/providers`;var em=`${Wd}/index.jsonl`,tm=`${dn}/drafts`,om=`${dn}/transactions`,rm=`${dn}/retired`;var at="design",qd="themes",Oa=`${pe}/${at}/${qd}`,nm=`${Oa}/local`,am=`${Oa}/community`,im={app:`${ge}/app.json`,appearance:`${pe}/${at}/appearance.json`,"icon-rail":`${pe}/${at}/icon-rail.json`,"footer-rail":`${pe}/${at}/footer-rail.json`,"plugin-startup":`${pe}/${at}/right-sidebar-startup.json`,"new-tab":`${pe}/${at}/new-tab.json`,pallette:`${pe}/${at}/palette.json`,group:`${La}/groups.json`,units:`${La}/units.json`,metadata:`${ge}/file-viewers.json`,notification:`${ge}/notification.json`,"notification-settings":`${ge}/notification-settings.json`,preferences:`${ge}/preferences.json`,"link-actions":`${ge}/link-actions.json`,markdown:`${ge}/markdown.json`,editor:`${ge}/editor.json`,"editor-vim":`${ge}/editor-vim.json`,"markdown-todo":`${ge}/markdown-todo.json`,"markdown-codeblocks":`${ge}/markdown-codeblocks.json`,"markdown-template":`${ge}/markdown-template.json`,"markdown-embeed":`${ge}/markdown-embeed.json`,files:`${ge}/file.json`,"file-sorter":`${ge}/file-sorter.json`,"file-sym-link":`${ge}/file-sym-link.json`,search:`${ge}/search.json`,"search-tag":`${ge}/search-tag.json`,"search-content":`${ge}/search-content.json`,design:`${pe}/${at}/appearance.json`,accounts:`${ln}/connections.json`};var Ma=nt,_a="open";var Yd=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Fa=16384;var za=new Set(["__proto__","prototype","constructor"]);function Ra(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function jo(e){let t=new WeakSet,r=0,n=(i,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(i===null||typeof i=="boolean")return i;if(typeof i=="string"){if(Ra(i)>Fa)throw new Error("Bookmark state is too large");return i}if(typeof i=="number")return Number.isFinite(i)?Object.is(i,-0)?0:i:void 0;if(!i||typeof i!="object"||t.has(i))return;let l=Array.isArray(i),p=Object.getPrototypeOf(i);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(i);try{let u=Reflect.ownKeys(i);if(u.length+r>8192||u.some(y=>typeof y=="string"&&za.has(y)))throw new Error("Invalid or excessive bookmark state keys");let c=Object.getOwnPropertyDescriptors(i);if(l){let y=c.length?.value;if(!Number.isSafeInteger(y)||y>8192)throw new Error("Bookmark state is too complex");return Array.from({length:y},(b,A)=>{let L=c[String(A)];return L&&"value"in L?n(L.value,s+1)??null:null})}let f={};for(let y of Object.keys(c).sort()){if(za.has(y))throw new Error("Invalid bookmark state key");let b=c[y];if(!b.enumerable||!("value"in b)){r++;continue}let A=n(b.value,s+1);A!==void 0&&(f[y]=A)}return f}finally{t.delete(i)}}},a=n(e,0);if(!a||typeof a!="object"||Array.isArray(a))throw new Error("Invalid bookmark state");if(Ra(JSON.stringify(a))>Fa)throw new Error("Bookmark state is too large");return a}function Ga(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=ao(e);if(!t)throw new Error("Invalid bookmark path");return t}function un(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function $a(e){let r=(e.target?["path","filePath","file"].flatMap(a=>typeof e.target.state[a]=="string"?[e.target.state[a]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function pn(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Yd.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=jo(t.state);return r.path!==void 0&&(r.path=Ga(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Zd=/^[A-Za-z0-9_-]{1,64}$/;function ja(e,t){if(typeof e!="string"||!Zd.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Ka(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=un(t.title,512,"title"),n={...t.description===void 0?{}:{description:un(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:un(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},a=t.group===void 0?{}:{group:ja(t.group,"group")};if(t.groupId!==void 0){let l=ja(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:pn(t.target),...n,...a};return{...l,searchText:$a(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:Ga(t.folderPath),title:r,...n,...a};return{...s,searchText:$a(s)}}function yt(e){let t=0,r=i=>!!(i&&typeof i=="object"&&!Array.isArray(i)),n=i=>i.length>0&&i.length<=256&&!["__proto__","prototype","constructor"].includes(i),a=(i,s)=>{if(++t>2048||s>32||!r(i)||typeof i.type!="string")return!1;let l=(...p)=>Object.keys(i).every(u=>u==="type"||p.includes(u));return["unknown","null","boolean","number","string","function"].includes(i.type)?l():i.type==="literal"?l("value")&&(i.value===null||["string","boolean"].includes(typeof i.value)||typeof i.value=="number"&&Number.isFinite(i.value)):i.type==="array"?l("items","maxItems")&&(i.maxItems===void 0||Number.isSafeInteger(i.maxItems)&&i.maxItems>=0&&i.maxItems<=1e5)&&a(i.items,s+1):i.type==="tuple"?l("items","minItems")&&Array.isArray(i.items)&&i.items.length<=64&&(i.minItems===void 0||Number.isSafeInteger(i.minItems)&&i.minItems>=0&&i.minItems<=i.items.length)&&i.items.every(p=>a(p,s+1)):i.type==="union"?l("anyOf")&&Array.isArray(i.anyOf)&&i.anyOf.length>0&&i.anyOf.length<=32&&i.anyOf.every(p=>a(p,s+1)):i.type==="object"?l("properties","required","additionalProperties")&&r(i.properties)&&Object.entries(i.properties).every(([p,u])=>n(p)&&a(u,s+1))&&(i.required===void 0||Array.isArray(i.required)&&i.required.every(p=>typeof p=="string"&&Object.hasOwn(i.properties,p)))&&(i.additionalProperties===void 0||typeof i.additionalProperties=="boolean"):!1};return a(e,0)}function Go(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),a=new WeakSet,i=(s,l,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return l===null;if(s.type==="literal")return l===s.value;if(s.type==="union")return s.anyOf.some(u=>i(u,l,p+1));if(s.type==="number")return typeof l=="number"&&Number.isFinite(l);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof l===s.type;if(!l||typeof l!="object"||a.has(l))return!1;a.add(l);try{return s.type==="array"?Array.isArray(l)&&l.length<=(s.maxItems??1e5)&&l.every(u=>i(s.items,u,p+1)):s.type==="tuple"?Array.isArray(l)&&l.length>=(s.minItems??s.items.length)&&l.length<=s.items.length&&l.every((u,c)=>i(s.items[c],u,p+1)):s.type==="object"?Array.isArray(l)||s.required?.some(u=>!Object.hasOwn(l,u))?!1:Object.entries(l).every(([u,c])=>Object.hasOwn(s.properties,u)?i(s.properties[u],c,p+1):s.additionalProperties===!0):!1}finally{a.delete(l)}};return i(e,t,0)}var Xd=new Map;function ie(e,t,r,n,a,i,s,l,p="owner"){let u=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:a,identities:i,identityScope:p,serviceCalls:s,serviceMetadata:l});return Xd.set(`${t}:${e}@${r}`,u),u}var fn=256;function gn(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,a)=>{let i=t.get(r);if(!i)throw new Error(`Unknown provider-owned agent tool: ${r}`);return i.run(n,a)}}}var U=e=>!!e&&typeof e=="object"&&!Array.isArray(e),le=(e,t)=>typeof e[t]=="function",wt=e=>e===void 0,Ft=e=>typeof e=="boolean",H=e=>typeof e=="string",Ie=e=>e===void 0||H(e),Jd=e=>e===void 0||typeof e=="number",Qd=e=>e===void 0||typeof e=="boolean",ne=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Ae=e=>U(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Ua=e=>U(e),Ha=e=>U(e)&&H(e.id)&&H(e.title)&&H(e.date)&&(e.documentRef===void 0||U(e.documentRef)&&H(e.documentRef.pluginId)&&H(e.documentRef.sourceId)&&H(e.documentRef.itemId)),el=e=>U(e)&&H(e.date)&&Ie(e.startTime)&&Ie(e.endTime)&&Ie(e.sourceId)&&Ie(e.itemId),tl=e=>U(e)&&H(e.url)&&Ie(e.title)&&Qd(e.newTab),ol=e=>U(e)&&H(e.query),Ba=e=>U(e)&&H(e.name)&&Ie(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),rl=e=>Array.isArray(e)&&e.every(Ba),nl=e=>e===null||Ba(e),al=e=>e===void 0||U(e)&&Ie(e.approvalToken)&&(e.cancellation===void 0||U(e.cancellation)),il=e=>typeof e=="string"||U(e)&&typeof e.text=="string",sl=e=>U(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&U(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Ie(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Wa=e=>U(e)&&H(e.id)&&H(e.label)&&Ie(e.labelKey)&&Ie(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Wa)),qa={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Ha)},create:{args:e=>ne(e,[H,Ua]),result:Ft},update:{args:e=>ne(e,[H,Ua]),result:Ft},remove:{args:e=>ne(e,[H]),result:Ft},open:{args:e=>ne(e,[H]),result:wt},configure:{args:e=>e.length===0,result:wt},actions:{args:e=>ne(e,[H]),result:e=>Array.isArray(e)&&e.every(Wa)},runAction:{args:e=>ne(e,[H,H]),result:Ft}},Ya=e=>U(e)&&H(e.name)&&H(e.version)&&Ie(e.description)&&Ie(e.author)&&(e.localized===void 0||U(e.localized)&&Object.values(e.localized).every(t=>U(t)&&H(t.name)&&Ie(t.description))),dl=ie("calendar.itemSource","service","1.3.0","many",e=>U(e)&&le(e,"list")&&(e.integration===void 0||Ya(e.integration)),void 0,qa,e=>e.integration),Ko=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,mn=e=>typeof e=="string"&&e.length>0&&e.length<=8192,ll=e=>U(e)&&Ko(e.startDate)&&Ko(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=fn&&(e.cursor===void 0||mn(e.cursor)),cl=e=>U(e)&&mn(e.revision)&&(e.cursor===void 0||mn(e.cursor))&&Array.isArray(e.items)&&e.items.length<=fn&&e.items.every(t=>Ha(t)&&Ko(t.date)&&(t.endDate===void 0||Ko(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,vt=ie("calendar.itemSource","service","2.0.0","many",e=>U(e)&&le(e,"list")&&(e.integration===void 0||Ya(e.integration)),void 0,{...qa,list:{args:e=>ne(e,[ll]),result:cl}},e=>e.integration),so=ie("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),ul=ie("calendar.navigator","service","1.0.0","one",e=>U(e)&&le(e,"openDate"),void 0,{openDate:{args:e=>ne(e,[el]),result:wt}}),Uo=ie("calendar.panelSelection","state","1.0.0","one",e=>U(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),pl=ie("web.activeContext","state","1.0.0","one",e=>U(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function Va(e){return U(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>U(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var ml=ie("contacts.directory","service","1.0.0","one",e=>U(e)&&["search","resolveEmails","open"].every(t=>le(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(Va)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>U(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(Va))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||U(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:wt}}),fl=ie("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),gl=ie("web.navigator","service","1.0.0","one",e=>U(e)&&le(e,"open"),void 0,{open:{args:e=>ne(e,[tl]),result:wt}}),hl=ie("selection.textAction","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&le(e,"run"),e=>[e.id]),bl=ie("geo.navigator","service","1.0.0","one",e=>U(e)&&le(e,"open"),void 0,{open:{args:e=>ne(e,[ol]),result:wt}}),yl=ie("geo.search","service","1.0.0","one",e=>U(e)&&le(e,"search")&&le(e,"reverse"),void 0,{search:{args:e=>ne(e,[H]),result:rl},reverse:{args:e=>ne(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:nl}}),hn=ie("agent.toolProvider","service","1.0.0","many",e=>U(e)&&Array.isArray(e.tools)&&e.tools.every(sl)&&le(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>ne(e,[H,U,al]),result:il}},e=>({tools:e.tools}),"global"),wl=ie("guard.runtime","service","1.0.0","one",e=>U(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>le(e,t)),void 0,{resolve:{args:e=>ne(e,[U]),result:U},requestApproval:{args:e=>ne(e,[U]),result:Ft},consumeToken:{args:e=>e.length>=1&&e.length<=2&&H(e[0])&&Ie(e[1]),result:Ft},audit:{args:e=>ne(e,[U]),result:wt}}),vl=ie("browser.automation","service","1.0.0","one",e=>U(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>le(e,t)),void 0,{list:{args:e=>e.length===0,result:Ae},open:{args:e=>ne(e,[H]),result:Ae},switch:{args:e=>ne(e,[H]),result:Ae},close:{args:e=>ne(e,[H]),result:Ae},snapshot:{args:e=>ne(e,[H]),result:Ae},readText:{args:e=>e.length>=1&&e.length<=2&&H(e[0])&&Jd(e[1]),result:Ae},readHtml:{args:e=>ne(e,[H]),result:Ae},screenshot:{args:e=>ne(e,[H]),result:Ae},click:{args:e=>ne(e,[H,t=>typeof t=="number"]),result:Ae},type:{args:e=>e.length>=3&&e.length<=4&&H(e[0])&&typeof e[1]=="number"&&H(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Ae},select:{args:e=>ne(e,[H,t=>typeof t=="number",H]),result:Ae},scroll:{args:e=>ne(e,[H,t=>typeof t=="number",t=>typeof t=="number"]),result:Ae},pressKey:{args:e=>ne(e,[H,H]),result:Ae},navigate:{args:e=>ne(e,[H,H]),result:Ae},back:{args:e=>ne(e,[H]),result:Ae},forward:{args:e=>ne(e,[H]),result:Ae},reload:{args:e=>ne(e,[H]),result:Ae}}),xl=ie("fileTree.contextItem","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Ie(e.labelKey)&&le(e,"run"),e=>[e.id]),kl=ie("newTab.entry","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"run"),e=>[e.id]),bn=ie("search.resultAction","extension","1.0.0","many",e=>U(e)&&typeof e.cardKind=="string"&&le(e,"open"),e=>[e.cardKind]),Tl=ie("search.resultCard","extension","1.0.0","many",e=>U(e)&&typeof e.cardKind=="string"&&le(e,"render")&&le(e,"open"),e=>[e.cardKind]),Vo=ie("metadataPanel.segment","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"render"),e=>[e.id]),yn=ie("workspace.surface","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&le(e,"getSnapshot")&&le(e,"subscribe")&&le(e,"restore"),e=>[e.id]),Sl=ie("metadata.plugin","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&le(e,"facts"),e=>[e.id]),Al=ie("workspace.viewState","extension","1.0.0","many",e=>U(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&le(e,"capture")&&le(e,"restore")&&le(e,"subscribe"),e=>[e.id]);var Ho=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let a of n){if(typeof a!="string")continue;if(["__proto__","prototype","constructor"].includes(a))throw new Error("Invalid bookmark key");let i=Object.getOwnPropertyDescriptor(e,a);i?.enumerable&&"value"in i&&(r[a]=i.value)}return r},wn=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Za=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Xa=e=>wn(e)&&typeof e.surface=="string"&&Za.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function lo(e){let t=Ho(e);if(!Xa(t))throw new Error("Invalid bookmark descriptor");let r=pn({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Ka({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function vn(e){try{let t=lo(e),r=Ho(e);return JSON.stringify(t.state)===JSON.stringify(jo(r.state))}catch{return!1}}function El(e){try{let t=Ho(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:lo(t.bookmark)}}catch{}return{status:"invalid"}}var Dl=e=>{try{let t=Ho(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&vn(t.bookmark)}catch{return!1}},Cl=e=>wn(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Ja=ie("workspace.bookmark","service","1.0.0","many",e=>wn(e)&&typeof e.id=="string"&&Za.has(String(e.surface))&&yt(e.stateSchema)&&(e.itemStateSchema===void 0||yt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Xa(e[0]),result:Dl,sanitizeResult:El},restore:{args:e=>e.length===1&&vn(e[0]),result:Cl}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function xn(e,t,r){if(!yt(r.stateSchema)||r.itemStateSchema!==void 0&&!yt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,a=(u,c,f=!1)=>Go(f&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,u,8192)&&(!r.validate||r.validate(u,c)),i=(u,c,f)=>{let y=f?void 0:r.primary?r.primary(u):u.item,b=jo(y?.state??u.view);if(!a(b,c,!!y))throw new Error("Invalid bookmark state");return lo({...c,title:y?.title??u.title,description:r.description(u,!!y),state:b,...y?{itemId:y.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:i(t.getSnapshot(u.instanceId),u,!1)}}catch{return{status:"invalid"}}},async restore(u){if(!n||u.surface!==t.surface)return{status:"unavailable"};let c;try{if(c=lo(u),!a(c.state,c,c.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(c.state,c.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(Ja,s),p;try{p=e.interop.extensions.provide(yn,{...t,getSnapshot(u){let c=t.getSnapshot(u),f={surface:t.surface,...u===void 0?{}:{instanceId:u}},y,b;try{y=i(c,f,!1)}catch{}try{b=i(c,f,!0)}catch{}return{...c,bookmark:y,bookmarkView:b}}})}catch(u){throw n=!1,l(),u}return()=>{n=!1,p(),l()}}var co=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Qa=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function ei(e){if(!co(e)||!Qa(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!co(r)||!Qa(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!co(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!co(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!co(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(a=>!["type","integer","maxLength"].includes(a))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var Il=ie("workspace.details","extension","1.0.0","many",ei,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Fm=[pe,`${pe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Zm=1024*1024;var Qm=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var ef=globalThis.Buffer;var Pl=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,m,Bo=new Map,Wo;function ve(){return Wo}function qo(e,t){let r=Bo.get(e)??new Set;return r.add(t),Bo.set(e,r),()=>{r.delete(t),r.size||Bo.delete(e)}}function ti(e){Wo?.dispose(),m=e,o=e.React;let t=!0,r=new Set;return Wo={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},Wo.dispose}var Ll=1800;function zt(e){let t=Ee();o.useEffect(()=>{let r=null,n=null,a=null,i=0,s=()=>{a&&a.classList.remove("todo-reveal-target"),a=null},l=c=>{if(c.mode==="create")return;i=c.nonce,c.mode==="edit"&&(t.clear(),e(c.todoId)),r!==null&&clearTimeout(r);let f=Date.now()+2500,y=()=>{if(r=null,i!==c.nonce)return;let b=[...Bo.get(c.todoId)??[]].find(A=>A.isConnected);if(!b){Date.now()<f?r=setTimeout(y,40):t.get()?.nonce===c.nonce&&t.clear();return}b.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),b.classList.add("todo-reveal-target"),a=b,n=setTimeout(s,Ll),t.get()?.nonce===c.nonce&&t.clear()};r=setTimeout(y,0)},p=t.subscribe(()=>{let c=t.get();c&&l(c)}),u=t.get();return u&&l(u),()=>{p(),i=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function Ee(){return m.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,a)=>{e+=1,r.value={todoId:n,mode:a,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function Yo(){Ee().request("","create"),m.workspace.revealOwnPanel("left_sidebar")}var Ol=`
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
  gap: var(--space-2);
  height: var(--app-bar-height);
  box-sizing: border-box;
  flex: 0 0 auto;
  min-width: 0;
  padding: 0 calc(var(--plugin-actions-offset, 0px) + 10px) 0 calc(var(--plugin-navigation-offset, 0px) + 10px);
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
.todo-page-appbar-btn svg { width: 15px; height: 15px; }

/* Faceted filters: dashed until they filter, then the selection rides along
   as badges. */
.todo-facet-btn,
.todo-facet-reset,
.todo-view-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  min-width: 0;
  height: var(--search-field-height, 26px);
  box-sizing: border-box;
  padding: 0 var(--space-2);
  border: 1px dashed var(--border-medium);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  white-space: nowrap;
  cursor: pointer;
}
.todo-view-btn { border-style: solid; }
.todo-facet-reset { border-color: transparent; color: var(--text-secondary); }
.todo-facet-btn svg,
.todo-facet-reset svg,
.todo-view-btn svg { width: 14px; height: 14px; flex-shrink: 0; color: var(--text-secondary); }
.todo-facet-btn:hover,
.todo-facet-reset:hover,
.todo-view-btn:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-facet-btn:focus-visible,
.todo-facet-reset:focus-visible,
.todo-view-btn:focus-visible,
.todo-table-sort:focus-visible,
.todo-table-cell-btn:focus-visible,
.todo-table-page-btn:focus-visible,
.todo-table-bulk:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -1px;
}
.todo-facet-sep {
  width: 1px;
  height: 14px;
  background: var(--border-medium);
}
.todo-facet-badge {
  padding: 1px 5px;
  border-radius: 2px;
  background: var(--hover-bg);
  font-size: var(--smaller-font-size);
  font-weight: 400;
}
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
  height: 40px;
  padding: 0 var(--space-2);
  border-bottom: 1px solid var(--border-light);
  background: var(--surface-color-alt);
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  text-align: left;
}
.todo-table td {
  height: 44px;
  padding: 0 var(--space-2);
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}
.todo-table th:first-child,
.todo-table td:first-child { padding-left: 12px; }
.todo-table th:last-child,
.todo-table td:last-child { padding-right: 10px; }
.todo-table-row { cursor: default; outline: none; }
.todo-table-row:hover td { background: var(--hover-bg); }
.todo-table-row.selected td { background: color-mix(in srgb, var(--accent-color) 10%, transparent); }
.todo-table-row:focus-visible td { box-shadow: inset 0 1px 0 var(--accent-color), inset 0 -1px 0 var(--accent-color); }
.todo-table-row.todo-reveal-target td { animation: todo-reveal-pulse 1.8s var(--ease-out); }

.todo-table-select { width: 40px; padding-right: 0 !important; }
.todo-table-status { width: 140px; }
.todo-table-priority { width: 112px; }
.todo-table-due { width: 150px; }
.todo-table-actions { width: 44px; text-align: right; }
.todo-table-checkbox {
  display: block;
  width: 15px;
  height: 15px;
  margin: 0;
  accent-color: var(--accent-color);
  cursor: pointer;
}

.todo-table-sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin-left: calc(-1 * var(--space-2));
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.todo-table-sort:hover { background: var(--hover-bg); color: var(--text-color); }
.todo-table-sort.active { color: var(--text-color); }
.todo-table-sort svg { width: 13px; height: 13px; }

.todo-table-title-inner {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}
.todo-table-badge {
  flex: 0 0 auto;
  max-width: 160px;
  overflow: hidden;
  padding: 1px 7px;
  border: 1px solid color-mix(in srgb, var(--todo-badge-color, var(--border-medium)) 45%, transparent);
  border-radius: var(--radius-sm);
  color: var(--todo-badge-color, var(--text-color));
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-table-title-text {
  flex: 1 1 auto;
  min-width: 64px;
  overflow: hidden;
  color: var(--title-color, var(--text-color));
  font-weight: var(--font-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-table-title-text p { display: inline; margin: 0; }
.todo-table-row.completed .todo-table-title-text { color: var(--text-tertiary); }
.todo-table-tag {
  flex-shrink: 0;
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  white-space: nowrap;
}
.todo-table-flag {
  display: inline-grid;
  flex-shrink: 0;
  color: var(--color-orange);
}
.todo-table-flag svg { width: 13px; height: 13px; }

.todo-table-cell-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  max-width: 100%;
  height: 28px;
  margin-left: calc(-1 * var(--space-2));
  padding: 0 var(--space-2);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
}
.todo-table-cell-btn > span { overflow: hidden; text-overflow: ellipsis; }
.todo-table-cell-btn:hover:not(:disabled) { background: var(--hover-bg); }
.todo-table-cell-btn:disabled { cursor: default; opacity: 0.6; }
.todo-table-cell-btn.muted,
.todo-table-none { color: var(--text-tertiary); }
.todo-table-cell-btn.is-overdue { color: var(--negative-color); }
.todo-table-cell-btn svg,
.todo-table-cell-btn .todo-status-menu-dot { flex-shrink: 0; }
.todo-table-cell-btn .todo-status-menu-svg,
.todo-table-priority-icon { width: 15px; height: 15px; }
.todo-table-priority-icon.todo-priority-normal { color: var(--text-tertiary); }
.todo-table-time { color: var(--text-tertiary); font-variant-numeric: tabular-nums; }
.todo-table-actions .todo-menu-wrap { display: inline-flex; }
.todo-table-empty {
  height: 96px !important;
  color: var(--text-tertiary);
  text-align: center;
}

/* The bottom bar mirrors the header grid: 37px content + a 1px line. */
.todo-table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex: 0 0 auto;
  height: var(--app-bar-height);
  box-sizing: border-box;
  padding: 0 10px 0 12px;
  border-top: 1px solid var(--border-light);
  background: var(--surface-color-alt);
  overflow: hidden;
  white-space: nowrap;
  font-family: var(--interface-font);
  font-size: var(--small-font-size);
}
.todo-table-selection {
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  color: var(--text-secondary);
}
.todo-table-bulk {
  height: 26px;
  padding: 0 var(--space-2);
  border: 1px solid var(--border-medium);
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
  gap: var(--space-3);
  margin-left: auto;
  color: var(--text-color);
  font-weight: var(--font-medium);
}
.todo-table-page-size {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  min-width: 64px;
  height: var(--search-field-height, 26px);
  box-sizing: border-box;
  padding: 0 6px 0 var(--space-2);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  font: inherit;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.todo-table-page-size:hover { background: var(--hover-bg); }
.todo-table-page-size:focus-visible { outline: 2px solid var(--accent-color); outline-offset: -1px; }
.todo-table-page-size svg { width: 13px; height: 13px; color: var(--text-secondary); }
.todo-table-page { min-width: 92px; text-align: center; font-variant-numeric: tabular-nums; }
.todo-table-pager { display: flex; gap: var(--space-1); }
.todo-table-page-btn {
  display: grid;
  place-items: center;
  width: var(--search-field-height, 26px);
  height: var(--search-field-height, 26px);
  padding: 0;
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
}
.todo-table-page-btn svg { width: 14px; height: 14px; }
.todo-table-page-btn:hover:not(:disabled) { background: var(--hover-bg); }
.todo-table-page-btn:disabled { opacity: 0.4; cursor: default; }

/* A narrow pane keeps every column but drops the words its icons already
   carry, so the title keeps the room. */
@container (max-width: 760px) {
  .todo-table-status { width: 44px; }
  .todo-table-priority { width: 44px; }
  .todo-table-due { width: 112px; }
  .todo-table-status .todo-table-cell-btn > span,
  .todo-table-priority .todo-table-cell-btn > span,
  .todo-table-time { display: none; }
  .todo-table-status .todo-table-th,
  .todo-table-priority .todo-table-sort > span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .todo-table-rows-label { display: none; }
}
@media (max-width: 640px) {
  .todo-view-btn > span,
  .todo-facet-reset { font-size: 0; gap: 0; }
  .todo-view-btn > span { display: none; }
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
`,kn="notes-todo-styles";function oi(){let e=document.getElementById(kn);return e||(e=document.createElement("style"),e.id=kn,document.head.appendChild(e)),e.textContent=Ol,()=>{document.getElementById(kn)===e&&e.remove()}}var W="#12120f",se="#ffffff",Sn=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:W,onDark:W},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:se,onDark:se},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:W,onDark:W},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:se,onDark:W},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:W,onDark:W},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:se,onDark:W},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:se,onDark:W},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:se,onDark:W},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:se,onDark:W},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:se,onDark:se},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:W,onDark:W},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:se,onDark:W},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:se,onDark:W},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:W,onDark:W},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:se,onDark:W},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:se,onDark:W},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:se,onDark:W},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:se,onDark:W},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:W,onDark:W},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:W,onDark:W},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:se,onDark:W},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:se,onDark:W},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:se,onDark:W},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:se,onDark:W},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:se,onDark:W},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:se,onDark:W},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:W,onDark:W},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:W,onDark:W},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:se,onDark:W},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:W,onDark:W},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:se,onDark:W},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:se,onDark:W},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:W,onDark:W},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:se,onDark:W},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:se,onDark:W},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:se,onDark:W}],Ml=["semantic","muted","accent","categorical"];var Uf=new Map(Sn.map(e=>[e.id,e])),_l={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Fl=new Map(Sn.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),zl=/^[a-z][a-z0-9-]{0,47}$/,Rl={version:4,families:Ml.map(e=>({id:e,name:_l[e]})),colors:Sn.map(e=>({id:e.id,familyId:e.family,name:Fl.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},$l=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var jl=$l(Rl);function ri(){return jl}var Tn=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],Zo="palette:",Gl=/^#[0-9a-f]{6}$/i;function Xo(e){return e.startsWith(Zo)&&zl.test(e.slice(Zo.length))}function he(e){return`${Zo}${e}`}function uo(e){return Xo(e)?e.slice(Zo.length):void 0}function ni(e){if(typeof e!="string")return;let t=e.trim();return Xo(t)?t:Gl.test(t)?t.toLowerCase():void 0}function De(e){let t=uo(e);return t?`var(--color-${t})`:e}function ai(e){let t=uo(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function ii(e){let t=new Set(e.map(r=>uo(r)??r.toLowerCase()));return he(Tn.find(r=>!t.has(r))??Tn[0])}function si(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=Tn;return he(r[Math.abs(t)%r.length])}function ee(e){return e.trim().toLowerCase()}function Kl(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let a of e){let i=typeof a=="string"?a.trim():"",s=ee(i);!s||s===ee(t)||r.has(s)||(r.add(s),n.push(i))}return n}function di(e){return`group_${ee(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function xt(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let a=n,i=typeof a.name=="string"?a.name.trim():"",s=ee(i);if(!i||r.has(s))continue;r.add(s);let l=typeof a.id=="string"&&a.id.trim()?a.id.trim():di(i),p=ni(a.color)??ii(t.map(c=>c.color)),u=Kl(a.aliases,i,r);t.push({id:l,name:i,color:p,...u.length?{aliases:u}:{}})}return t}function po(e,t){let r=ee(t??"");if(r)return e.find(n=>ee(n.name)===r||(n.aliases??[]).some(a=>ee(a)===r))}function Jo(e,t){return po(t,e)?.name}function Ne(e,t){let r=ee(e??"");return r?po(t,e)?.color??si(r):he("primary-blue")}function An(e){let t={};for(let r of e){let n=ee(r??"");n&&(t[n]=(t[n]??0)+1)}return t}var li="statuses",Xe=[{id:"open",labelKey:"todo.status.todo",color:he("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:he("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:he("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:he("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:he("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:he("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:he("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:he("red"),done:!0,cls:"todo-st-canceled",locked:!1}],En=Xe,er=Xe.map(e=>e.id),mo=Xe.filter(e=>!e.locked).map(e=>e.id),kt=Xe.filter(e=>e.done).map(e=>e.id),ci=new Map(Xe.map(e=>[e.id,e])),Ul=new Set(mo);function Vl(e){if(typeof e!="string"||!Xo(e))return!1;let t=uo(e);if(!t)return!1;let r=ri();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function ui(e){let t=e&&typeof e=="object"?e:{},r=Array.isArray(t.active)?t.active:mo,n=[];for(let s of r)typeof s!="string"||!Ul.has(s)||n.includes(s)||n.push(s);let a=t.colors&&typeof t.colors=="object"?t.colors:{},i=Object.fromEntries(er.map(s=>{let l=ci.get(s).color;return[s,Vl(a[s])?a[s]:l]}));return{active:n,colors:i}}function Rt(){return ui(m?.settings.get()[li])}function pi(e){m.settings.set(li,ui(e))}function Pe(e){let t=e&&ci.get(e)||Xe[0];return{...t,color:Rt().colors[t.id]}}function Qo(){let e=Rt();return[Xe[0],Xe[1],...e.active.map(t=>Pe(t))]}function it(){return Qo().map(e=>e.id)}function mi(e){return e==="open"||e==="completed"||Rt().active.includes(e)}function Ve(){let[e,t]=o.useState(Qo);return o.useEffect(()=>m.settings.subscribe(()=>t(Qo())),[]),e}function $t(e,t=it()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(a=>r.includes(a));return n.length?n:"all"}function jt(e,t){return t==="all"||t.includes(Le(e))}function tr(e){if(typeof e=="string")return er.includes(e)?e:void 0}function Le(e){return e.status??(e.completed?"completed":"open")}function be(e){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:kt.includes(e),status:e}}function Gt(){return Qo().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,cls:e.cls}))}function Hl(){return Xe.map(e=>{let t=Pe(e.id),r=De(t.color);return`.${t.cls}{color:${r}}.todo-detail-field[data-status="${t.id}"] .select-field-value{color:${r}}`}).join("")}function fi(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Hl()};r();let n=m.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}async function gi(e,t,r){let n=new Map,a=e.data.dataset("todo.status_history");for(let i=0;i<t.length;i+=20){let s=t.slice(i,i+20),l=new Map;for(;s.length;){r();let p=await a.aggregate({where:{taskId:{in:s},or:["completed","canceled"].map(c=>({to:c,from:{in:er.filter(f=>f!==c)}})),...l.size?{and:[{or:s.map(c=>({taskId:c,position:{lt:l.get(c)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!p.length)break;let u=await a.query({select:["taskId","changedAt"],where:{or:p.map(c=>({taskId:c.taskId,position:c.position}))},limit:20});r(),s=[];for(let c of u.rows){let f=String(c.taskId);if(typeof c.changedAt=="string"&&c.changedAt)n.set(f,{changedAt:c.changedAt});else{let y=p.find(b=>b.taskId===f)?.position;if(typeof y!="number"||!Number.isInteger(y))throw new Error("Invalid completion position");l.set(f,y),s.push(f)}}}}return n}function fo(e){return"historyLoaded"in e&&e.historyLoaded===!1}var hi={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.145caf292855":"Due","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.346d73d6f5b6":"Nothing due today \u2014 clear runway.","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.44b8af7351fe":"Sort {{p0}}","auto.496cd6a42238":"To-Do: Search tasks","auto.4c1aeebc433b":"Due date","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.81df98734775":"Quick add a task","auto.8410192cbb1f":"Linked file path","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.9c0410f3884e":"Create todo","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d0e6e1dca756":"Add a task\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.e7de9576dc00":"Linked file (realm path)\u2026","auto.edbe7ad07b4a":"Open To-Do","auto.f4ade25164a5":"Search\u2026 (#tag)","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.activity.empty":"No status changes yet","todo.actual":"Actual","todo.addAttachment":"Add attachment","todo.addUrl":"Add link\u2026","todo.addWebAppLink":"Add web or app link","todo.atATime":"At a Time","todo.attachmentCount":"{{p0}} attachments","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.barLabel":"Filter todos","todo.chip.dueToday":"Due today","todo.chip.dueTomorrow":"Due tomorrow","todo.chip.next7Days":"Next 7 days","todo.chip.noGroup":"No group","todo.chip.overdue":"Overdue","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.detailsFor":"Details for {{p0}}","todo.due.dueToday":"Due today","todo.due.dueTomorrow":"Due tomorrow","todo.due.next7Days":"Next 7 days","todo.due.noDeadline":"No deadline","todo.due.overdue":"Overdue","todo.due.thisMonth":"This month","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.properties":"Properties","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.estimated":"Est.","todo.fab.menu":"New todo","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.compact":"Compact view","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statusCount":"{{count}} statuses","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.color":"Group color","todo.group.colorOf":"Color of {{p0}}","todo.group.create":"Create","todo.group.delete":"Delete group","todo.group.deleteBlocked":"Still used by {{p0}} todos \u2014 empty the group to delete it","todo.group.deleteHint":"A group can only be deleted once nothing is in it.","todo.group.deleteOf":"Delete {{p0}}","todo.group.deselectAll":"Deselect all","todo.group.duplicate":"That group already exists.","todo.group.empty":"No groups yet.","todo.group.global":"Global","todo.group.manage":"Manage groups","todo.group.name":"Group name","todo.group.nameOf":"Name of {{p0}}","todo.group.namePlaceholder":"e.g. Fungi","todo.group.new":"New group","todo.group.selectAll":"Select all","todo.group.settingsDesc":"Rename a group, change its colour, or drag to reorder. Renaming carries over to every todo in it.","todo.linkedFile":"Linked file","todo.links":"Links","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.month.restOf":"Rest of {{p0}}","todo.moreFiles":"+{{p0}} more","todo.nav.back":"Back","todo.nav.forward":"Forward","todo.nav.more":"More actions","todo.newTodoIn":"New todo in {{p0}}","todo.noteTasks.allDone":"All tasks done","todo.noteTasks.hideCompleted":"Show open tasks only","todo.noteTasks.noFile":"Open a note to see its tasks","todo.noteTasks.none":"No tasks in this note","todo.noteTasks.notMarkdown":"This file has no checkbox tasks","todo.noteTasks.title":"Tasks in this note","todo.onADay":"On a Day","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.page.completedCount":"{{count}} Completed","todo.page.hide":"Hide","todo.page.show":"Show","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.priorityNone":"None","todo.properties.manageGroups":"Manage groups","todo.properties.tasks":"Tasks","todo.properties.view":"View","todo.remindDate":"Reminder date","todo.remindMe":"Remind me","todo.remindTime":"Reminder time","todo.reminderAppOpenHint":"Reminders fire even with every window closed, but not while Valley is quit.","todo.reminderBody":"Reminder","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.search.toggle":"Search","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.groups":"Groups","todo.settings.groupsDesc":"Shared groups are created and managed in the central Groups settings.","todo.settings.smartListHide":"Hide {{p0}}","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartListRestore":"Restore","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Reorder the To-Do navigation or hide lists you do not use.","todo.settings.smartListsHidden":"Hidden","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusHide":"Hide {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusRemove":"Remove {{p0}}","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are fixed but can be recolored. Reorder or recolor optional statuses, and drag them between Show and Hide.","todo.settings.statusesHide":"Hide","todo.settings.statusesHideEmpty":"No hidden statuses","todo.settings.statusesShow":"Show","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.clear":"Clear status","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.status":"Status","todo.swipe.thisWeekend":"This weekend","todo.swipe.today":"Today","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.timeOfDay.afternoon":"Afternoon","todo.timeOfDay.morning":"Morning","todo.timeOfDay.tonight":"Tonight","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"My Lists","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.visibility.hide":"Hide","todo.visibility.show":"Show","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.hours":"Hours before","reminders.minutes":"Minutes before","reminders.time":"Reminder time","reminders.add":"Add reminder","reminders.remove":"Remove reminder","reminders.timeRequired":"Choose a time for this date-only item.","reminders.invalid":"Each offset must be unique and between 0 and 10080 minutes.","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.view":"View","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.reset":"Reset","todo.table.clearFilter":"Clear filter","todo.table.selectedCount":"{{count}} selected","todo.table.selectAll":"Select all","todo.table.selectRow":"Select {{title}}","todo.table.selected":"{{count}} of {{total}} row(s) selected.","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results."};var bi={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.145caf292855":"F\xE4llig","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.346d73d6f5b6":"Heute ist nichts f\xE4llig \u2013 freie Landebahn.","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.44b8af7351fe":"Sortieren {{p0}}","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4c1aeebc433b":"F\xE4lligkeitsdatum","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.81df98734775":"F\xFCgen Sie schnell eine Aufgabe hinzu","auto.8410192cbb1f":"Pfad der verkn\xFCpften Datei","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.9c0410f3884e":"Aufgaben erstellen","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c614ba7c453c":"Auto","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d0e6e1dca756":"Eine Aufgabe hinzuf\xFCgen\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.e7de9576dc00":"Verkn\xFCpfte Datei (Realm-Pfad)\u2026","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f4ade25164a5":"Suche\u2026 (#tag)","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.activity.empty":"Noch keine Status\xE4nderungen","todo.actual":"Tats\xE4chlich","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.addUrl":"Link hinzuf\xFCgen\u2026","todo.addWebAppLink":"Web- oder App-Link hinzuf\xFCgen","todo.atATime":"Zu einer Uhrzeit","todo.attachmentCount":"{{p0}} Anh\xE4nge","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.barLabel":"Aufgaben filtern","todo.chip.dueToday":"F\xE4llig heute","todo.chip.dueTomorrow":"F\xE4llig morgen","todo.chip.next7Days":"N\xE4chste 7 Tage","todo.chip.noGroup":"Ohne Gruppe","todo.chip.overdue":"\xDCberf\xE4llig","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.detailsFor":"Details zu {{p0}}","todo.due.dueToday":"Heute f\xE4llig","todo.due.dueTomorrow":"F\xE4llig morgen","todo.due.next7Days":"N\xE4chste 7 Tage","todo.due.noDeadline":"Keine Frist","todo.due.overdue":"\xDCberf\xE4llig","todo.due.thisMonth":"Diesen Monat","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.properties":"Eigenschaften","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.estimated":"Gesch.","todo.fab.menu":"Neue Aufgabe","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.compact":"Kompakte Ansicht","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statusCount":"{{count}} Status","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.color":"Gruppenfarbe","todo.group.colorOf":"Farbe von {{p0}}","todo.group.create":"Erstellen","todo.group.delete":"Gruppe l\xF6schen","todo.group.deleteBlocked":"Wird noch von {{p0}} Aufgaben verwendet \u2014 Gruppe zuerst leeren","todo.group.deleteHint":"Eine Gruppe kann erst gel\xF6scht werden, wenn nichts mehr darin ist.","todo.group.deleteOf":"{{p0}} l\xF6schen","todo.group.deselectAll":"Auswahl aufheben","todo.group.duplicate":"Diese Gruppe gibt es schon.","todo.group.empty":"Noch keine Gruppen.","todo.group.global":"Global","todo.group.manage":"Gruppen verwalten","todo.group.name":"Gruppenname","todo.group.nameOf":"Name von {{p0}}","todo.group.namePlaceholder":"z. B. Fungi","todo.group.new":"Neue Gruppe","todo.group.selectAll":"Alle ausw\xE4hlen","todo.group.settingsDesc":"Gruppe umbenennen, Farbe \xE4ndern oder zum Sortieren ziehen. Eine Umbenennung wird auf jede Aufgabe der Gruppe \xFCbertragen.","todo.linkedFile":"Verkn\xFCpfte Datei","todo.links":"Links","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.month.restOf":"Rest von {{p0}}","todo.moreFiles":"+{{p0}} weitere","todo.nav.back":"Zur\xFCck","todo.nav.forward":"Vorw\xE4rts","todo.nav.more":"Weitere Aktionen","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.noteTasks.allDone":"Alle Aufgaben erledigt","todo.noteTasks.hideCompleted":"Nur offene Aufgaben zeigen","todo.noteTasks.noFile":"\xD6ffne eine Notiz, um ihre Aufgaben zu sehen","todo.noteTasks.none":"Keine Aufgaben in dieser Notiz","todo.noteTasks.notMarkdown":"Diese Datei hat keine Aufgaben","todo.noteTasks.title":"Aufgaben in dieser Notiz","todo.onADay":"An einem Tag","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.page.completedCount":"{{count}} abgeschlossen","todo.page.hide":"Ausblenden","todo.page.show":"Einblenden","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.priorityNone":"Keine","todo.properties.manageGroups":"Gruppen verwalten","todo.properties.tasks":"Aufgaben","todo.properties.view":"Ansicht","todo.remindDate":"Erinnerungsdatum","todo.remindMe":"Erinnere mich","todo.remindTime":"Erinnerungszeit","todo.reminderAppOpenHint":"Erinnerungen werden auch bei geschlossenen Fenstern ausgel\xF6st, aber nicht wenn Valley beendet ist.","todo.reminderBody":"Erinnerung","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.search.toggle":"Suchen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.groups":"Gruppen","todo.settings.groupsDesc":"Gemeinsame Gruppen werden in den zentralen Gruppeneinstellungen erstellt und verwaltet.","todo.settings.smartListHide":"{{p0}} ausblenden","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartListRestore":"Wiederherstellen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Ordne die To-Do-Navigation neu oder blende nicht verwendete Listen aus.","todo.settings.smartListsHidden":"Ausgeblendet","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusHide":"{{p0}} ausblenden","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusRemove":"{{p0}} entfernen","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind fixiert, k\xF6nnen aber eingef\xE4rbt werden. Optionale Status k\xF6nnen neu angeordnet, eingef\xE4rbt und zwischen Einblenden und Ausblenden verschoben werden.","todo.settings.statusesHide":"Ausblenden","todo.settings.statusesHideEmpty":"Keine ausgeblendeten Status","todo.settings.statusesShow":"Einblenden","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.clear":"Status l\xF6schen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.status":"Status","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.today":"Heute","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.timeOfDay.afternoon":"Nachmittag","todo.timeOfDay.morning":"Morgen","todo.timeOfDay.tonight":"Abend","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Meine Listen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.visibility.hide":"Ausblenden","todo.visibility.show":"Einblenden","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.hours":"Stunden vorher","reminders.minutes":"Minuten vorher","reminders.time":"Erinnerungszeit","reminders.add":"Erinnerung hinzuf\xFCgen","reminders.remove":"Erinnerung entfernen","reminders.timeRequired":"W\xE4hle f\xFCr diesen ganzt\xE4gigen Eintrag eine Uhrzeit.","reminders.invalid":"Jeder Abstand muss eindeutig sein und zwischen 0 und 10080 Minuten liegen.","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.view":"Ansicht","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.reset":"Zur\xFCcksetzen","todo.table.clearFilter":"Filter l\xF6schen","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.selectAll":"Alle ausw\xE4hlen","todo.table.selectRow":"{{title}} ausw\xE4hlen","todo.table.selected":"{{count}} von {{total}} Zeile(n) ausgew\xE4hlt.","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse."};var yi={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.145caf292855":"Vencimiento","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.346d73d6f5b6":"No hay fecha prevista para hoy: pista despejada.","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.44b8af7351fe":"Ordenar {{p0}}","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4c1aeebc433b":"Fecha de vencimiento","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.81df98734775":"Agregar r\xE1pidamente una tarea","auto.8410192cbb1f":"Ruta del archivo vinculado","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.9c0410f3884e":"Crear tarea","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c614ba7c453c":"Autom\xE1tico","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d0e6e1dca756":"Agregar una tarea\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.e7de9576dc00":"Archivo vinculado (ruta del realm)\u2026","auto.edbe7ad07b4a":"Abierto To-Do","auto.f4ade25164a5":"Buscar\u2026 (#etiqueta)","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.activity.empty":"A\xFAn no hay cambios de estado","todo.actual":"Real","todo.addAttachment":"A\xF1adir adjunto","todo.addUrl":"A\xF1adir enlace\u2026","todo.addWebAppLink":"A\xF1adir enlace web o de aplicaci\xF3n","todo.atATime":"A una hora","todo.attachmentCount":"{{p0}} adjuntos","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.barLabel":"Filtrar tareas","todo.chip.dueToday":"Vencen hoy","todo.chip.dueTomorrow":"Vencen ma\xF1ana","todo.chip.next7Days":"Pr\xF3ximos 7 d\xEDas","todo.chip.noGroup":"Sin grupo","todo.chip.overdue":"Vencidas","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.detailsFor":"Detalles de {{p0}}","todo.due.dueToday":"Vencimiento hoy","todo.due.dueTomorrow":"Vencimiento ma\xF1ana","todo.due.next7Days":"Los pr\xF3ximos 7 d\xEDas","todo.due.noDeadline":"Sin fecha l\xEDmite","todo.due.overdue":"Atrasado","todo.due.thisMonth":"este mes","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.properties":"Propiedades","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.estimated":"Est.","todo.fab.menu":"Nueva tarea","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.compact":"Vista compacta","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statusCount":"{{count}} estados","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.color":"Color del grupo","todo.group.colorOf":"Color de {{p0}}","todo.group.create":"Crear","todo.group.delete":"Eliminar grupo","todo.group.deleteBlocked":"Todav\xEDa lo usan {{p0}} tareas: vac\xEDa el grupo para eliminarlo","todo.group.deleteHint":"Un grupo solo puede eliminarse cuando ya no queda nada en \xE9l.","todo.group.deleteOf":"Eliminar {{p0}}","todo.group.deselectAll":"Deseleccionar todo","todo.group.duplicate":"Ese grupo ya existe.","todo.group.empty":"A\xFAn no hay grupos.","todo.group.global":"Global","todo.group.manage":"Gestionar grupos","todo.group.name":"Nombre del grupo","todo.group.nameOf":"Nombre de {{p0}}","todo.group.namePlaceholder":"p. ej. Fungi","todo.group.new":"Nuevo grupo","todo.group.selectAll":"Seleccionar todo","todo.group.settingsDesc":"Cambia el nombre de un grupo, su color, o arrastra para reordenar. El cambio de nombre se aplica a todas sus tareas.","todo.linkedFile":"Archivo vinculado","todo.links":"Enlaces","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.month.restOf":"Resto de {{p0}}","todo.moreFiles":"+{{p0}} m\xE1s","todo.nav.back":"Volver","todo.nav.forward":"Adelante","todo.nav.more":"M\xE1s acciones","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.noteTasks.allDone":"Todas las tareas hechas","todo.noteTasks.hideCompleted":"Mostrar solo tareas abiertas","todo.noteTasks.noFile":"Abre una nota para ver sus tareas","todo.noteTasks.none":"No hay tareas en esta nota","todo.noteTasks.notMarkdown":"Este archivo no tiene tareas","todo.noteTasks.title":"Tareas en esta nota","todo.onADay":"Un d\xEDa","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.page.completedCount":"{{count}} completadas","todo.page.hide":"Ocultar","todo.page.show":"Mostrar","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.priorityNone":"Ninguna","todo.properties.manageGroups":"Gestionar grupos","todo.properties.tasks":"Tareas","todo.properties.view":"Vista","todo.remindDate":"Fecha del recordatorio","todo.remindMe":"Recordarme","todo.remindTime":"Hora del recordatorio","todo.reminderAppOpenHint":"Los recordatorios se activan incluso con todas las ventanas cerradas, pero no si Valley est\xE1 cerrado.","todo.reminderBody":"Recordatorio","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.search.toggle":"Buscar","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.groups":"Grupos","todo.settings.groupsDesc":"Los grupos compartidos se crean y gestionan en la configuraci\xF3n central de Grupos.","todo.settings.smartListHide":"Ocultar {{p0}}","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartListRestore":"Restaurar","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Reordena la navegaci\xF3n de tareas u oculta las listas que no utilices.","todo.settings.smartListsHidden":"Ocultas","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusHide":"Ocultar {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusRemove":"Eliminar {{p0}}","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado son fijos, pero sus colores se pueden cambiar. Reordena o cambia el color de los estados opcionales y arr\xE1stralos entre Mostrar y Ocultar.","todo.settings.statusesHide":"Ocultar","todo.settings.statusesHideEmpty":"No hay estados ocultos","todo.settings.statusesShow":"Mostrar","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.clear":"Borrar estado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.status":"Estado","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.today":"Hoy","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.timeOfDay.afternoon":"Tarde","todo.timeOfDay.morning":"Ma\xF1ana","todo.timeOfDay.tonight":"Noche","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Mis listas","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.visibility.hide":"Ocultar","todo.visibility.show":"Mostrar","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.hours":"Horas antes","reminders.minutes":"Minutos antes","reminders.time":"Hora del recordatorio","reminders.add":"A\xF1adir recordatorio","reminders.remove":"Eliminar recordatorio","reminders.timeRequired":"Elige una hora para este elemento sin hora.","reminders.invalid":"Cada intervalo debe ser \xFAnico y estar entre 0 y 10080 minutos.","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.view":"Vista","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.reset":"Restablecer","todo.table.clearFilter":"Borrar filtro","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.selectAll":"Seleccionar todo","todo.table.selectRow":"Seleccionar {{title}}","todo.table.selected":"{{count}} de {{total}} fila(s) seleccionadas.","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados."};var wi={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.145caf292855":"\xC9ch\xE9ance","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.346d73d6f5b6":"Rien \xE0 pr\xE9voir aujourd'hui \u2013 piste d\xE9gag\xE9e.","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.44b8af7351fe":"Trier {{p0}}","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4c1aeebc433b":"Date d'\xE9ch\xE9ance","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.81df98734775":"Ajouter rapidement une t\xE2che","auto.8410192cbb1f":"Chemin du fichier li\xE9","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.9c0410f3884e":"Cr\xE9er une t\xE2che","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c614ba7c453c":"Automatique","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d0e6e1dca756":"Ajouter une t\xE2che\u2026 (@aujourd'hui, @demain, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.e7de9576dc00":"Fichier li\xE9 (chemin du realm)\u2026","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f4ade25164a5":"Rechercher\u2026 (#tag)","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.activity.empty":"Aucun changement de statut","todo.actual":"R\xE9el","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.addUrl":"Ajouter un lien\u2026","todo.addWebAppLink":"Ajouter un lien web ou d\u2019application","todo.atATime":"\xC0 une heure","todo.attachmentCount":"{{p0}} pi\xE8ces jointes","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.barLabel":"Filtrer les t\xE2ches","todo.chip.dueToday":"Pour aujourd'hui","todo.chip.dueTomorrow":"Pour demain","todo.chip.next7Days":"7 prochains jours","todo.chip.noGroup":"Sans groupe","todo.chip.overdue":"En retard","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.detailsFor":"D\xE9tails de {{p0}}","todo.due.dueToday":"\xC0 rendre aujourd'hui","todo.due.dueTomorrow":"\xC0 rendre demain","todo.due.next7Days":"7 prochains jours","todo.due.noDeadline":"Pas de date limite","todo.due.overdue":"En retard","todo.due.thisMonth":"Ce mois-ci","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.properties":"Propri\xE9t\xE9s","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.estimated":"Est.","todo.fab.menu":"Nouvelle t\xE2che","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.compact":"Vue compacte","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statusCount":"{{count}} statuts","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.color":"Couleur du groupe","todo.group.colorOf":"Couleur de {{p0}}","todo.group.create":"Cr\xE9er","todo.group.delete":"Supprimer le groupe","todo.group.deleteBlocked":"Encore utilis\xE9 par {{p0}} t\xE2ches \u2014 videz le groupe pour le supprimer","todo.group.deleteHint":"Un groupe ne peut \xEAtre supprim\xE9 que lorsqu\u2019il est vide.","todo.group.deleteOf":"Supprimer {{p0}}","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.duplicate":"Ce groupe existe d\xE9j\xE0.","todo.group.empty":"Aucun groupe pour le moment.","todo.group.global":"Global","todo.group.manage":"G\xE9rer les groupes","todo.group.name":"Nom du groupe","todo.group.nameOf":"Nom de {{p0}}","todo.group.namePlaceholder":"p. ex. Fungi","todo.group.new":"Nouveau groupe","todo.group.selectAll":"Tout s\xE9lectionner","todo.group.settingsDesc":"Renommez un groupe, changez sa couleur ou glissez pour r\xE9ordonner. Le renommage s\u2019applique \xE0 toutes ses t\xE2ches.","todo.linkedFile":"Fichier li\xE9","todo.links":"Liens","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.month.restOf":"Reste de {{p0}}","todo.moreFiles":"+{{p0}} de plus","todo.nav.back":"Retour","todo.nav.forward":"Avant","todo.nav.more":"Plus d\u2019actions","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.noteTasks.allDone":"Toutes les t\xE2ches sont faites","todo.noteTasks.hideCompleted":"Afficher seulement les t\xE2ches ouvertes","todo.noteTasks.noFile":"Ouvrez une note pour voir ses t\xE2ches","todo.noteTasks.none":"Aucune t\xE2che dans cette note","todo.noteTasks.notMarkdown":"Ce fichier n'a pas de t\xE2ches","todo.noteTasks.title":"T\xE2ches dans cette note","todo.onADay":"Un jour","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.page.completedCount":"{{count}} termin\xE9es","todo.page.hide":"Masquer","todo.page.show":"Afficher","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.priorityNone":"Aucune","todo.properties.manageGroups":"G\xE9rer les groupes","todo.properties.tasks":"T\xE2ches","todo.properties.view":"Vue","todo.remindDate":"Date du rappel","todo.remindMe":"Me rappeler","todo.remindTime":"Heure du rappel","todo.reminderAppOpenHint":"Les rappels se d\xE9clenchent m\xEAme toutes fen\xEAtres ferm\xE9es, mais pas lorsque Valley est quitt\xE9.","todo.reminderBody":"Rappel","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.search.toggle":"Rechercher","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.groups":"Groupes","todo.settings.groupsDesc":"Les groupes partag\xE9s sont cr\xE9\xE9s et g\xE9r\xE9s dans les r\xE9glages centraux des groupes.","todo.settings.smartListHide":"Masquer {{p0}}","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartListRestore":"Restaurer","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"R\xE9ordonnez la navigation To-Do ou masquez les listes inutilis\xE9es.","todo.settings.smartListsHidden":"Masqu\xE9es","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusHide":"Masquer {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusRemove":"Supprimer {{p0}}","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont fixes, mais leur couleur reste modifiable. R\xE9ordonnez ou recolorez les statuts facultatifs et faites-les glisser entre Afficher et Masquer.","todo.settings.statusesHide":"Masquer","todo.settings.statusesHideEmpty":"Aucun statut masqu\xE9","todo.settings.statusesShow":"Afficher","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.clear":"Effacer le statut","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.status":"Statut","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.today":"Aujourd'hui","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.timeOfDay.afternoon":"Apr\xE8s-midi","todo.timeOfDay.morning":"Matin","todo.timeOfDay.tonight":"Soir","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Mes listes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.visibility.hide":"Masquer","todo.visibility.show":"Afficher","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.hours":"Heures avant","reminders.minutes":"Minutes avant","reminders.time":"Heure du rappel","reminders.add":"Ajouter un rappel","reminders.remove":"Supprimer le rappel","reminders.timeRequired":"Choisissez une heure pour cet \xE9l\xE9ment sans heure.","reminders.invalid":"Chaque d\xE9lai doit \xEAtre unique et compris entre 0 et 10080 minutes.","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.view":"Affichage","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.reset":"R\xE9initialiser","todo.table.clearFilter":"Effacer le filtre","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.selectAll":"Tout s\xE9lectionner","todo.table.selectRow":"S\xE9lectionner {{title}}","todo.table.selected":"{{count}} sur {{total}} ligne(s) s\xE9lectionn\xE9e(s).","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat."};var vi={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.145caf292855":"\u5230\u671F","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.346d73d6f5b6":"\u4ECA\u5929\u6CA1\u6709\u4EFB\u4F55\u5230\u671F\u7684\u4E8B\u60C5\u2014\u2014\u6E05\u7406\u8DD1\u9053\u3002","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.44b8af7351fe":"\u6392\u5E8F {{p0}}","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4c1aeebc433b":"\u622A\u6B62\u65E5\u671F","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.81df98734775":"\u5FEB\u901F\u6DFB\u52A0\u4EFB\u52A1","auto.8410192cbb1f":"\u94FE\u63A5\u6587\u4EF6\u8DEF\u5F84","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.9c0410f3884e":"\u521B\u5EFA\u5F85\u529E\u4E8B\u9879","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c614ba7c453c":"\u81EA\u52A8","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d0e6e1dca756":"\u6DFB\u52A0\u4EFB\u52A1\u2026 (@today, @tomorrow, @2026-07-01, !, !!, !!!)","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.e7de9576dc00":"\u94FE\u63A5\u6587\u4EF6\uFF08\u5E93\u8DEF\u5F84\uFF09\u2026","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f4ade25164a5":"\u641C\u7D22\u2026\uFF08#tag\uFF09","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.activity.empty":"\u6682\u65E0\u72B6\u6001\u53D8\u66F4","todo.actual":"\u5B9E\u9645","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.addUrl":"\u6DFB\u52A0\u94FE\u63A5\u2026","todo.addWebAppLink":"\u6DFB\u52A0\u7F51\u9875\u6216\u5E94\u7528\u94FE\u63A5","todo.atATime":"\u5728\u67D0\u4E2A\u65F6\u95F4","todo.attachmentCount":"{{p0}} \u4E2A\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.barLabel":"\u7B5B\u9009\u5F85\u529E","todo.chip.dueToday":"\u4ECA\u5929\u5230\u671F","todo.chip.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.chip.next7Days":"\u672A\u6765 7 \u5929","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.chip.overdue":"\u5DF2\u903E\u671F","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.detailsFor":"{{p0}} \u7684\u8BE6\u7EC6\u4FE1\u606F","todo.due.dueToday":"\u4ECA\u5929\u5230\u671F","todo.due.dueTomorrow":"\u660E\u5929\u5230\u671F","todo.due.next7Days":"\u672A\u6765 7 \u5929","todo.due.noDeadline":"\u65E0\u622A\u6B62\u65E5\u671F","todo.due.overdue":"\u903E\u671F","todo.due.thisMonth":"\u672C\u6708","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.properties":"\u5C5E\u6027","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.estimated":"\u9884\u8BA1","todo.fab.menu":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.compact":"\u7D27\u51D1\u89C6\u56FE","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statusCount":"{{count}} \u4E2A\u72B6\u6001","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.color":"\u5206\u7EC4\u989C\u8272","todo.group.colorOf":"{{p0}} \u7684\u989C\u8272","todo.group.create":"\u521B\u5EFA","todo.group.delete":"\u5220\u9664\u5206\u7EC4","todo.group.deleteBlocked":"\u4ECD\u6709 {{p0}} \u6761\u5F85\u529E\u5728\u4F7F\u7528 \u2014 \u6E05\u7A7A\u540E\u624D\u80FD\u5220\u9664","todo.group.deleteHint":"\u53EA\u6709\u5F53\u5206\u7EC4\u4E3A\u7A7A\u65F6\u624D\u80FD\u5220\u9664\u3002","todo.group.deleteOf":"\u5220\u9664 {{p0}}","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.duplicate":"\u8BE5\u5206\u7EC4\u5DF2\u5B58\u5728\u3002","todo.group.empty":"\u8FD8\u6CA1\u6709\u5206\u7EC4\u3002","todo.group.global":"\u5168\u5C40","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.name":"\u5206\u7EC4\u540D\u79F0","todo.group.nameOf":"{{p0}} \u7684\u540D\u79F0","todo.group.namePlaceholder":"\u4F8B\u5982 Fungi","todo.group.new":"\u65B0\u5EFA\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.group.settingsDesc":"\u91CD\u547D\u540D\u5206\u7EC4\u3001\u66F4\u6539\u989C\u8272\uFF0C\u6216\u62D6\u52A8\u6392\u5E8F\u3002\u91CD\u547D\u540D\u4F1A\u540C\u6B65\u5230\u8BE5\u5206\u7EC4\u7684\u6240\u6709\u5F85\u529E\u3002","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.links":"\u94FE\u63A5","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.month.restOf":"{{p0}}\u5269\u4F59","todo.moreFiles":"+{{p0}} \u4E2A","todo.nav.back":"\u8FD4\u56DE","todo.nav.forward":"\u524D\u8FDB","todo.nav.more":"\u66F4\u591A\u64CD\u4F5C","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.noteTasks.allDone":"\u6240\u6709\u4EFB\u52A1\u5DF2\u5B8C\u6210","todo.noteTasks.hideCompleted":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u4EFB\u52A1","todo.noteTasks.noFile":"\u6253\u5F00\u7B14\u8BB0\u4EE5\u67E5\u770B\u5176\u4EFB\u52A1","todo.noteTasks.none":"\u672C\u7B14\u8BB0\u4E2D\u6CA1\u6709\u4EFB\u52A1","todo.noteTasks.notMarkdown":"\u6B64\u6587\u4EF6\u6CA1\u6709\u590D\u9009\u6846\u4EFB\u52A1","todo.noteTasks.title":"\u672C\u7B14\u8BB0\u4E2D\u7684\u4EFB\u52A1","todo.onADay":"\u5728\u67D0\u5929","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.page.completedCount":"\u5DF2\u5B8C\u6210 {{count}}","todo.page.hide":"\u9690\u85CF","todo.page.show":"\u663E\u793A","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.priorityNone":"\u65E0","todo.properties.manageGroups":"\u7BA1\u7406\u5206\u7EC4","todo.properties.tasks":"\u4EFB\u52A1","todo.properties.view":"\u89C6\u56FE","todo.remindDate":"\u63D0\u9192\u65E5\u671F","todo.remindMe":"\u63D0\u9192\u6211","todo.remindTime":"\u63D0\u9192\u65F6\u95F4","todo.reminderAppOpenHint":"\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u63D0\u9192\uFF0C\u4F46\u9000\u51FA Valley \u540E\u4E0D\u4F1A\u3002","todo.reminderBody":"\u63D0\u9192","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.search.toggle":"\u641C\u7D22","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.groups":"\u5206\u7EC4","todo.settings.groupsDesc":"\u5171\u4EAB\u5206\u7EC4\u5728\u4E2D\u592E\u5206\u7EC4\u8BBE\u7F6E\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u3002","todo.settings.smartListHide":"\u9690\u85CF {{p0}}","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartListRestore":"\u6062\u590D","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u91CD\u65B0\u6392\u5E8F\u5F85\u529E\u5BFC\u822A\u6216\u9690\u85CF\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.smartListsHidden":"\u5DF2\u9690\u85CF","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusHide":"\u9690\u85CF {{p0}}","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusRemove":"\u79FB\u9664 {{p0}}","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u72B6\u6001\u56FA\u5B9A\u542F\u7528\uFF0C\u4F46\u53EF\u4EE5\u66F4\u6539\u989C\u8272\u3002\u53EF\u91CD\u65B0\u6392\u5E8F\u6216\u66F4\u6539\u53EF\u9009\u72B6\u6001\u7684\u989C\u8272\uFF0C\u5E76\u5728\u663E\u793A\u548C\u9690\u85CF\u4E4B\u95F4\u62D6\u52A8\u3002","todo.settings.statusesHide":"\u9690\u85CF","todo.settings.statusesHideEmpty":"\u6CA1\u6709\u9690\u85CF\u72B6\u6001","todo.settings.statusesShow":"\u663E\u793A","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.clear":"\u6E05\u9664\u72B6\u6001","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.status":"\u72B6\u6001","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.today":"\u4ECA\u5929","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.timeOfDay.afternoon":"\u4E0B\u5348","todo.timeOfDay.morning":"\u4E0A\u5348","todo.timeOfDay.tonight":"\u665A\u4E0A","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u6211\u7684\u5217\u8868","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.visibility.hide":"\u9690\u85CF","todo.visibility.show":"\u663E\u793A","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.hours":"\u5C0F\u65F6\u524D","reminders.minutes":"\u5206\u949F\u524D","reminders.time":"\u63D0\u9192\u65F6\u95F4","reminders.add":"\u6DFB\u52A0\u63D0\u9192","reminders.remove":"\u79FB\u9664\u63D0\u9192","reminders.timeRequired":"\u8BF7\u4E3A\u8FD9\u4E2A\u5168\u5929\u9879\u76EE\u9009\u62E9\u63D0\u9192\u65F6\u95F4\u3002","reminders.invalid":"\u6BCF\u4E2A\u63D0\u524D\u91CF\u5FC5\u987B\u552F\u4E00\uFF0C\u4E14\u4ECB\u4E8E 0 \u5230 10080 \u5206\u949F\u4E4B\u95F4\u3002","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.43d60f3c1715":"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag.","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.ac7698ff3a44":"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.baad6921b848":"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario.","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.ebd72c2a4304":"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier.","auto.ee2df65649f7":"a task title","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.view":"\u89C6\u56FE","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.reset":"\u91CD\u7F6E","todo.table.clearFilter":"\u6E05\u9664\u7B5B\u9009","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.selectAll":"\u5168\u9009","todo.table.selectRow":"\u9009\u62E9 {{title}}","todo.table.selected":"\u5DF2\u9009\u62E9 {{count}} / {{total}} \u884C\u3002","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002"};var xi={en:hi,de:bi,es:yi,fr:wi,"zh-CN":vi};function ki(e,t){return(xi.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,a)=>String(t?.[a]??""))}var Ti=ki;function Si(e){e.ui.registerCatalogs(xi),Ti=(t,r)=>{let n=e.ui.t(t,r);return n===t?ki(t,r):n}}function d(e,t){return Ti(e,t)}var Xl={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Jl={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},Ql={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"};function Je(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=Xl[e];return r?d(r):t||e}function Tt(e){return d(Jl[e])}function Ai(e){return d(Ql[e])}function Oe(e,t=""){return typeof e=="string"?e:t}function or(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rr(e){let t=Oe(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function Ei(e){let t=Oe(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var ec=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],ug=Object.fromEntries(ec.map(e=>[e,{destination:"ask",recognize:!0}]));var tc=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",nt]);function oc(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function go(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=oc(e);if(!t||tc.has(t)||t.startsWith(`${nt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var rc=16384,nc=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function ac(e){if(!e||e.length>rc||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,i=>i.charCodeAt(0)),a=JSON.parse(new TextDecoder().decode(n));return a.v!==1||!a.state||typeof a.state!="object"||Array.isArray(a.state)?null:a.state}catch{return null}}function ic(e){try{let t=new URL(e);if(t.protocol!==`${Ma}:`||t.hostname!==_a)return null;let r=t.searchParams.get("realm")??"",n=ao(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let a=t.searchParams.get("plugin")??"";if(!nc.test(a))return null;let i=ac(t.searchParams.get("state")??""),s=t.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let l=t.searchParams.get("instance");return l&&l.length>512?null:i?{kind:"plugin",pluginId:a,state:i,...s?{surface:s}:{},...l?{instanceId:l}:{}}:null}catch{return null}}function Kt(e){let t=ic(e);return t?.kind==="file"?t.relPath:null}function Di(e){return go(e)!==null}function St(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var sc=["normal","low","medium","high"];function Ci(e){return e===!0}function dc(e){return typeof e=="string"&&sc.includes(e)?e:"normal"}function nr(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Ii(e){return Array.isArray(e)?e.filter(t=>or(t)).map(t=>({startedAt:Oe(t.startedAt),endedAt:Oe(t.endedAt),activeMinutes:nr(t.activeMinutes)??0,pauseMinutes:nr(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function Dn(e){return Array.isArray(e)?e.filter(t=>or(t)).map(t=>({from:tr(t.from),to:tr(t.to),changedAt:Oe(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function lc(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function ar(e){if(typeof e!="string")return;let t=e.trim();if(t)return Kt(t)||Di(t)?t:void 0}function cc(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>ar(n)).filter(n=>!!n))];return r.length?r:void 0}function uc(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>bt(r)).filter(r=>!!r))];return t.length?t:void 0}function pc(e){if(!or(e))return;let t=Oe(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function ho(e){let t=new Date().toISOString(),r=Oe(e.id,St("todo")),n=Oe(e.createdAt,t),a=Ii(e.history),i=Dn(e.statusHistory),s=tr(e.status);return{id:r,title:Oe(e.title).trim(),completed:Ci(e.completed)||s==="completed"||s==="canceled",priority:dc(e.priority),dueDate:Oe(e.dueDate),reminderOffsets:Array.isArray(e.reminderOffsets)?e.reminderOffsets:void 0,reminderTime:rr(e.reminderTime),startTime:rr(e.startTime),endTime:rr(e.endTime),color:Ei(e.color),note:Oe(e.note),tags:Array.isArray(e.tags)?e.tags.filter(l=>typeof l=="string"&&!!l.trim()).map(l=>l.trim()):[],estimatedMinutes:nr(e.estimatedMinutes),actualMinutes:nr(e.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:s,filePath:bt(e.filePath),group:Oe(e.group).trim()||void 0,flagged:Ci(e.flagged)||void 0,urls:cc(e.urls),attachments:uc(e.attachments),location:pc(e.location),remindAt:lc(e.remindAt),reminderFiredAt:Oe(e.reminderFiredAt)||void 0,createdAt:n,updatedAt:Oe(e.updatedAt,n)}}function Cn(e,t,r){let n=(u,c=!1)=>{let f=new Map;for(let y of u){let b=f.get(y.taskId);b?b.push(y):f.set(y.taskId,[y])}if(c)for(let y of f.values())y.sort((b,A)=>Number(b.position)-Number(A.position));return f},a=n(t.tags),i=n(t.links,!0),s=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(u=>ho({...u,tags:(a.get(u.id)??[]).map(c=>c.tag),urls:(i.get(u.id)??[]).map(c=>c.url),attachments:(s.get(u.id)??[]).map(c=>c.path),history:l.get(u.id)??[],statusHistory:p.get(u.id)??[]})).map(u=>({...u,group:Jo(u.group,r)??u.group})).filter(u=>u.title)}var ir="todo.tasks",Ln="todo.task_tags",On="todo.task_links",Mn="todo.task_attachments",Oi="todo.focus_sessions",Ut="todo.status_history",bo=[ir,Ln,On,Mn],mc=[...bo,Oi,Ut],_n=[...bo,Ut];function fc(e,t){let r=ve(),n=e.map(s=>r.api.data.dataset(s).subscribe(t)),a=()=>n.forEach(s=>s()),i=r.onDispose(a);return()=>{i(),a()}}function Vt(e){return fc(_n,e)}function Mi(e){let t=bo.map(r=>m.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}async function st(e,t,r=ve()){let n=[],a;do{r.assertActive();let i=await r.api.data.dataset(e).query({where:t,limit:1e3,cursor:a});r.assertActive(),n.push(...i.rows),a=i.cursor}while(a);return n}async function gc(e,t=!0,r=!0,n=ve()){let a=e?{taskId:typeof e=="string"?e:{in:e}}:void 0,i=await Promise.allSettled([r?st(Ln,a,n):[],st(On,a,n),st(Mn,a,n),t?st(Oi,a,n):[],t?st(Ut,a,n):[]]),[s,l,p,u,c]=i.map(f=>{if(f.status==="rejected")throw f.reason;return f.value});return{tags:s,links:l,attachments:p,sessions:u,statusHistory:c}}async function Pn(e,t,r){let n=r?{id:typeof r=="string"?r:{in:r}}:void 0,[a,i]=await Promise.allSettled([st(ir,n,e),gc(r,t,!0,e)]);if(a.status==="rejected")throw a.reason;if(i.status==="rejected")throw i.reason;return e.assertActive(),Cn(a.value,i.value,xt(e.api.getState().groups))}var Ni=new WeakMap;function sr(e,t,r,n,a){try{e.assertActive()}catch(p){return Promise.reject(p)}let i=Ni.get(e);i||(i=new Map,Ni.set(e,i));let s=i.get(t);if(!s){s={revision:0,pending:new Map};let p=s,u=r.map(c=>e.api.data.dataset(c).subscribe(()=>{p.revision++}));e.onDispose(()=>{u.forEach(c=>c()),i.clear()}),i.set(t,s)}let l=s.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,u=await a();if(e.assertActive(),p===s.revision)return u}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,l)),l}function _i(e,t){let r=ve();return sr(r,e?"full":"calendar",e?mc:bo,t??"",()=>Pn(r,e,t))}var Fi=200;function hc(e,t){let r=e.keys;if(!Array.isArray(r)||!r.length||r.length>Fi)return null;let n=t===ir?"id":"taskId",a=[];for(let i of r){let s=i?.[n];if(typeof s!="string"||!s)return null;a.push(s)}return a}var In=new WeakMap;function bc(e){let t=In.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=_n.map(a=>e.api.data.dataset(a).subscribe(i=>{if(r.full)return;let s=i?hc(i,a):null;if(!s){r.full=!0,r.dirty.clear();return}for(let l of s)r.dirty.add(l);r.dirty.size>Fi&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(a=>a()),In.delete(e)}),In.set(e,r),t=r,t}async function Pi(e,t){let r;if(!t)r=await Pn(e,!1);else{r=[];for(let a=0;a<t.length;a+=100)r.push(...await Pn(e,!1,t.slice(a,a+100)))}let n=await gi(e.api,r.map(a=>a.id),e.assertActive);return r.map(a=>({...a,historyLoaded:!1,completionSummary:n.get(a.id)??null}))}function dt(e=ve()){let t=bc(e);return sr(e,"list",_n,"",async()=>{let r=JSON.stringify(xt(e.api.getState().groups));if(t.full||!t.value||t.groups!==r){t.full=!1,t.dirty.clear();try{t.value=await Pi(e),t.groups=r}catch(p){throw t.full=!0,p}return t.value}if(!t.dirty.size)return t.value;let n=[...t.dirty];t.dirty.clear();let a;try{a=await Pi(e,n)}catch(p){for(let u of n)t.dirty.add(u);throw p}let i=new Map(a.map(p=>[p.id,p])),s=new Set(n),l=[];for(let p of t.value)if(!s.has(p.id))l.push(p);else{let u=i.get(p.id);u&&(l.push(u),i.delete(p.id))}return l.push(...i.values()),t.value=l,l})}var Li=new WeakMap,yc=0;function wc(e,t){let r=Li.get(e);r||(r=new Map,Li.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++yc),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let a=n,i=!0;return{reader:n,release:()=>{i&&(i=!1,a.users--,a.users||r.delete(t))}}}function vc(e,t,r){return sr(e,"statusHistory",[Ut],r.key,async()=>{let n=await st(Ut,{taskId:t},r.scope);return n.sort((a,i)=>Number(a.position)-Number(i.position)),Dn(n)})}function zi(e){let t=ve(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:a,release:i}=wc(t,e),s=0,l=!1,p=()=>{let y=++s;vc(t,e,a).then(b=>{!l&&y===s&&n({scope:t,id:e,history:b})}).catch(()=>{})},u=t.api.data.dataset(Ut).subscribe(y=>{(!y.keys||y.keys.some(b=>b.taskId===e))&&p()}),c=()=>{l=!0,u(),i()},f=t.onDispose(c);return p(),()=>{f(),c()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function lt(){return _i(!0)}async function He(e){return e?(await _i(!0,e))[0]??null:null}function Ri(e,t,r,n){let a=ve();return sr(a,"calendarPage",bo,JSON.stringify([e,t,r,n]),async()=>{a.assertActive();let i=await a.api.data.dataset(ir).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});a.assertActive();let s=async f=>{let y=[];for(let b=0;b<i.rows.length;b+=100)y.push(...await st(f,{taskId:{in:i.rows.slice(b,b+100).map(A=>String(A.id))}},a));return y},l=await Promise.allSettled([s(Ln),s(On),s(Mn)]),[p,u,c]=l.map(f=>{if(f.status==="rejected")throw f.reason;return f.value});return a.assertActive(),{todos:Cn(i.rows,{tags:p,links:u,attachments:c,sessions:[],statusHistory:[]},xt(a.api.getState().groups)),...i.cursor?{cursor:i.cursor}:{}}})}async function At(e){try{return await m.backend.call("records.append",{record:e})}catch{return!1}}async function Fn(e,t,r,n,a=!1){try{let i=await m.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...a?{exactStatusHistory:a}:{}});return i.ok&&n&&i.documentRevision&&Object.assign(n,i.documentRevision),i.ok?i.record??t:null}catch{return null}}async function Nn(e,t,r,n){return await Fn(e,t,r,n)!==null}function zn(e,t,r){return Fn(e,t,r)}async function yo(e,t){return await Fn(e,t,void 0,void 0,!0)!==null}async function Et(e){try{return await m.backend.call("records.delete",{id:e})}catch{return!1}}async function dr(e){if(!e.id||!e.title.trim())return!1;let t=await At(e);return t&&m.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await Et(e.id)}),redo:async()=>({ok:await At(e)})}),t}async function Ht(e,t,r,n){if(!e||!t.title.trim())return!1;let a=await He(e),i=fo(t)?{...t,history:t.history===void 0?a?.history:t.history}:t;fo(i)&&(delete i.historyLoaded,delete i.completionSummary);let s=await Nn(e,i,r,n);return s&&a&&m.undo.push({label:d("todo.undo.edit",{title:a.title}),undo:async()=>({ok:await Nn(e,a)}),redo:async()=>({ok:await Nn(e,i)})}),s}async function lr(e){let t=await He(e),r=await Et(e);return r&&t&&m.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await At(t)}),redo:async()=>({ok:await Et(e)})}),r}async function Dt(e,t){await m.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&await t(e.id)}function xc(e){let t=[],r=e.replace(/#(\S+)/g,(n,a)=>(t.push(a.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function Ct(e){let t=xc(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let a of t.tags)if(!r.some(i=>i.toLowerCase().startsWith(a)))return!1;return!t.text||n.some(a=>a.toLowerCase().includes(t.text))}}function ye(e=[]){return e.map(t=>Jo(t.name,e)??t.name)}function kc(){return xt(m.getState().groups)}function je(){return kc()}function $i(e){return m.subscribe(e)}function Ge(){let[e,t]=o.useState(je);return o.useEffect(()=>m.subscribe(()=>t(je())),[]),e}function ji(){let e=ve(),t=!1,r=()=>{dt(e).then(a=>{e.assertActive(),t||e.api.workspace.reportGroupUsage(An(a.map(i=>i.group)))}).catch(()=>{})};r();let n=Vt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function Tc(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Sc(e){let t=e.toLowerCase();return Tc(t)?t:"yyyy-mm-dd"}function Gi(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,a,i]=r;return Sc(t).replace("yyyy",n).replace("mm",a).replace("dd",i)}var Ac="ddd d mmm",Ec=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function Dc(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!Ec.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),a=t.filter(s=>s==="mmm"||s==="mmmm"),i=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&a.length===1&&i.length<=1&&new Set(t).size===t.length}function Cc(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return Dc(t)?t:Ac}var wo=new Map;function Ic(e,t,r){let n=`${r??""}:${t}`,a=wo.get(n);return a||(a=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),wo.size>=64&&wo.delete(wo.keys().next().value),wo.set(n,a)),a.format(e)}function Ki(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,a,i,s]=n,l=new Date(Number(a),Number(i)-1,Number(s),12);return Cc(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?a:Ic(l,p,r))}var Re=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}];var vo={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"},cr={high:3,medium:2,low:1,normal:0},Nc=new Intl.Collator(void 0,{sensitivity:"base"});function Bt(e,t){return Nc.compare(e.title,t.title)}function Pc(e,t,r){if(r==="name")return Bt(e,t);if(r==="priority"){let i=cr[t.priority]-cr[e.priority];return i!==0?i:Qe(e,t)}if(r==="flagged"){let i=+!!t.flagged-+!!e.flagged;return i!==0?i:Qe(e,t)}if(r==="due"){let i=e.dueDate||"",s=t.dueDate||"";if(!i&&!s)return Qe(e,t);if(!i)return-1;if(!s)return 1;let l=i.localeCompare(s);return l!==0?l:Qe(e,t)}let n=r==="created"?"createdAt":"updatedAt",a=e[n].localeCompare(t[n]);return a!==0?a:Bt(e,t)}function Rn(e,t){let r=cr[t.priority]-cr[e.priority];return r!==0?r:Bt(e,t)}function Qe(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let a=r.localeCompare(n);if(a!==0)return a}else{if(r)return-1;if(n)return 1}return Rn(e,t)}function Wt(e,t,r){return[...e].sort((n,a)=>{if(t==="due"&&r==="desc"){let s=n.dueDate||"",l=a.dueDate||"";if(!s&&!l)return Qe(n,a);if(!s)return-1;if(!l)return 1;let p=l.localeCompare(s);return p!==0?p:Qe(n,a)}let i=Pc(n,a,t);return r==="asc"?i:-i})}function Fe(e,t="dd-mm-yyyy"){return e?Gi(e,t):""}function xe(e){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function $n(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));if(!t||!r||!n)return null;let a=new Date(t,r-1,n);return a.setHours(0,0,0,0),a}function qt(e,t){let r=$n(e);return r?(r.setDate(r.getDate()+t),xe(r)):e}function ur(e,t,r="ddd d mmm"){return Ki(e.slice(0,10),r,t)}function pr(e,t,r,n,a="dd-mm-yyyy"){if(!e)return"";let i=e.slice(0,10);if(i===t)return r.today;let[s,l,p]=i.split("-").map(Number),[u,c,f]=t.split("-").map(Number);if(!s||!l||!p||!u||!c||!f)return Fe(e,a);let y=new Date(s,l-1,p),b=new Date(u,c-1,f),A=Math.round((y.getTime()-b.getTime())/864e5);return A===1?r.tomorrow:A===-1?r.yesterday:A>1&&A<7?y.toLocaleDateString(n,{weekday:"long"}):Fe(e,a)}var Jg=new Date(2023,0,1,12);var Lc={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function jn(e){return Lc[e??""]??1}function Ui(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Oc(e,t){return(e.getDay()-t+7)%7}function Vi(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Oc(e,t))}function xo(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));return new Date(t,(r||1)-1,n||1)}var mr=["overdue","today","upcoming","someday","completed"];function Be(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function fr(e,t=Be()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]};for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let n=(a,i)=>a.dueDate.localeCompare(i.dueDate)||Qe(a,i);return r.overdue.sort(n),r.upcoming.sort(n),r.today.sort(Qe),r.someday.sort(Rn),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||Bt(a,i)),r}function Gn(e){return fo(e)?e.completionSummary?.changedAt||e.updatedAt||e.createdAt:[...e.statusHistory??[]].reverse().find(r=>r.to==="completed"||r.to==="canceled")?.changedAt||e.updatedAt||e.createdAt}function Kn(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):Be(t)}function Hi(e){let t=new Map(e.map(a=>[a,Gn(a)])),r=[...e].sort((a,i)=>t.get(i).localeCompare(t.get(a))||Bt(a,i)),n=new Map;for(let a of r){let i=Kn(t.get(a)),s=n.get(i);s?s.push(a):n.set(i,[a])}return[...n.entries()].sort(([a],[i])=>i.localeCompare(a)).map(([a,i])=>({key:a,kind:"daily",todos:i}))}function Un(e,t,r=1,n){let a=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),i=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:Be(Vi(xo(l),r)):"",s=new Map;for(let l of e){let p=i(a(l)),u=s.get(p);u?u.push(l):s.set(p,[l])}return[...s.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}function Bi(e,t=Be()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,p)=>{let u=p.toLowerCase();if(u==="today")r=t;else if(u==="tomorrow"){let c=new Date(`${t}T00:00:00`);c.setDate(c.getDate()+1),r=Be(c)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var ze={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},parentId:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},to:{enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},Mc={open:ze,get:ze,"edit-fields":ze,add:ze,complete:ze,done:ze,reopen:ze,cancel:ze,pause:ze,status:ze,edit:ze,"open-page":{type:"null"},search:{type:"array",items:ze,maxItems:20},list:{type:"array",items:ze,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:ze,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},we=e=>typeof e=="string"?e:"",Xi=e=>we(e?.query).trim(),br=["normal","low","medium","high"];function Yt(){return new Date().toISOString()}function Wi(e=new Date){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}function qi(e){let t=e.trim();if(!t)return;let r=po(je(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function Yi(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return Wi();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),Wi(t)}return e}function _c(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function gr(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Vn(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(i=>i.id===r);if(n)return n;let a=e.filter(i=>i.title.toLowerCase().includes(r.toLowerCase()));if(a.length===0)throw new Error(`No todo matching "${r}".`);if(a.length===1)return a[0];throw new Error(`Multiple todos match "${r}":
${a.map((i,s)=>`  ${s+1}. ${i.title} [${i.id}]`).join(`
`)}
Re-run with the exact id.`)}var hr={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=Xi(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function ko(e,t,r){let n=Vn(await lt(),e),a=t(n),i=await zn(n.id,a,n.updatedAt);if(!i)throw new Error("Failed to update todo.");return{value:a,revert:{label:r(n),run:async()=>{if(!await yo(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await yo(n.id,i))throw new Error("Could not reapply the task change.")}}}}async function Zi(e){return ko(e,t=>({...t,completed:!0,status:"completed",updatedAt:Yt()}),t=>`Complete \u201C${t.title}\u201D`)}var It={type:"string"},Ji={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,It])),priority:{type:"string",enum:br},status:{type:"string",enum:["open","inprogress","waiting","onhold","delegated","deferred","completed","canceled"]},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:It}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:It,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Fc(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in Ji.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(a=>typeof a=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let a=n;if(typeof a.name!="string"||Object.keys(a).some(i=>!["name","lng","lat"].includes(i))||a.lng!==void 0&&(typeof a.lng!="number"||!Number.isFinite(a.lng)||Math.abs(a.lng)>180)||a.lat!==void 0&&(typeof a.lat!="number"||!Number.isFinite(a.lat)||Math.abs(a.lat)>90)||a.lng===void 0!=(a.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!br.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!it().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}async function zc(e,t,r){let a=(await lt()).find(l=>l.id===e);if(!a)throw new Error("The task no longer exists.");if(r!==void 0&&a.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&!ye(je()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=ho({...a,...t,...t.status?be(t.status):t.completed!==void 0?be(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:Yt()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let l of["urls","attachments"])if(t[l]?.some(p=>!i[l]?.includes(p)))throw new Error(`Invalid task ${l}.`);let s=await zn(e,i,a.updatedAt);if(!s)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${a.title}\u201D`,run:async()=>{if(!await yo(e,a))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await yo(e,s))throw new Error("Could not reapply the task edit.")}}}}async function et(e){let t=e??{},r=t.id??t.query,n={groups:je(),statuses:it()};if(!r)return n;let a=await lt(),i=Vn(a,r);return{...n,records:[i]}}function Qi(e){let t=n=>{let a=Mc[n.id];if(!a)throw new Error(`Missing result contract for ${n.id}.`);let i={...n,outputSchema:a,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(i)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:It,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let a=n,i=we(a?.id).trim();if(!i)throw new Error("Expected a task id.");if(a.newTab!==void 0&&typeof a.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return a.newTab===!0?{id:i,newTab:!0}:{id:i}}},run:async({id:n,newTab:a})=>{let i=await He(n);if(!i)throw new Error("The task no longer exists. Open To-Do to choose another task.");return a?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Ee().request(n,"edit"),i}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:It},required:["id"],additionalProperties:!1},parse:n=>{let a=we(n?.id).trim();if(!a)throw new Error("Expected a task id.");return{id:a}}},run:async({id:n})=>{let a=await He(n);if(!a)throw new Error("The task no longer exists.");return a}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:It,values:Ji,expectedUpdatedAt:It},required:["id","values"],additionalProperties:!1},parse:n=>{let a=n,i=we(a?.id).trim();if(!i||a.expectedUpdatedAt!==void 0&&typeof a.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:i,values:Fc(a.values),expectedUpdatedAt:a.expectedUpdatedAt}}},run:({id:n,values:a,expectedUpdatedAt:i})=>zc(n,a,i),revision:n=>et(n),preview:n=>({changes:n})}),t({id:"open-page",label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let a=n??{},i=we(a.title).trim();if(!i)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:i,due:we(a.due),priority:we(a.priority),status:we(a.status),note:we(a.note),group:we(a.group)}},fromCli:(n,a)=>({title:n.join(" ").trim(),due:a.due,priority:a.priority,status:a.status,note:a.note,group:a.group})},run:async({title:n,due:a,priority:i,status:s,note:l,group:p})=>{let u=it();if(s&&!u.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${u.join(", ")}`);let c=ho({title:n,priority:i||"normal",status:s||void 0,dueDate:Yi(a),note:l,group:qi(p)});if(!await At(c))throw new Error("Failed to add todo.");return{value:c,revert:{label:`Add todo \u201C${c.title}\u201D`,run:async()=>{await Et(c.id)},reapply:async()=>{await At(c)}}}},formatCli:n=>`Added: ${gr(n)}`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:hr,run:({query:n})=>Zi(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:hr,run:({query:n})=>Zi(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=Xi(n);if(!a)throw new Error('Usage: todo search "<query>"');return{query:a}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let a=Ct(n);return(await lt()).filter(i=>a(i.tags,i.title,i.note)).slice(0,20)},formatCli:n=>n.length?n.map(gr).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:hr,run:({query:n})=>ko(n,a=>({...a,completed:!1,status:"open",updatedAt:Yt()}),a=>`Reopen \u201C${a.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>et(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:hr,run:({query:a})=>{let i=n==="cancel"?"canceled":"onhold";if(!mi(i))throw new Error(`Status "${i}" is disabled in To-Do settings.`);return ko(a,s=>({...s,...be(i),updatedAt:Yt()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:a=>`${n==="cancel"?"Canceled":"On hold"}: ${a.title}`,revision:a=>et(a),preview:a=>({changes:a})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let a=n??{},i=we(a.query).trim(),s=we(a.status),l=it();if(!i||!l.includes(s))throw new Error(`Usage: todo status "<id or title>" <${l.join("|")}>`);return{query:i,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:a})=>ko(n,i=>({...i,...be(a),updatedAt:Yt()}),i=>`Set status for \u201C${i.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=we(a.query).trim(),s=we(a.priority);if(!i)throw new Error("Expected a todo id or title.");if(s&&!br.includes(s))throw new Error(`Invalid priority "${s}". One of: ${br.join(", ")}`);return{query:i,title:typeof a.title=="string"?a.title:void 0,priority:s||void 0,due:typeof a.due=="string"?a.due:void 0,note:typeof a.note=="string"?a.note:void 0,tags:typeof a.tags=="string"?_c(a.tags):void 0,group:typeof a.group=="string"?a.group:void 0}},fromCli:(n,a)=>({query:n.join(" "),title:a.title,priority:a.priority,due:a.due,note:a.note,tags:a.tag,group:a.group})},run:({query:n,title:a,priority:i,due:s,note:l,tags:p,group:u})=>ko(n,c=>({...c,title:a??c.title,priority:i??c.priority,dueDate:s===void 0?c.dueDate:Yi(s),note:l??c.note,tags:p??c.tags,group:u===void 0?c.group:qi(u),updatedAt:Yt()}),c=>`Edit \u201C${c.title}\u201D`),formatCli:n=>`Edited: ${gr(n)}`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let a=n??{},i=we(a.query).trim();if(!i)throw new Error("Expected a todo id or title.");return{query:i,confirm:a.confirm===!0||a.confirm==="true"}},fromCli:(n,a)=>({query:n.join(" "),confirm:a.confirm})},run:async({query:n,confirm:a})=>{let i=await lt(),s=Vn(i,n);if(!a)return{value:{deleted:!1,todo:s,deletedCount:0},revert:null};if(!await Et(s.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:s,deletedCount:1},revert:{label:`Delete \u201C${s.title}\u201D`,run:async()=>{await At(s)},reapply:async()=>{await Et(s.id)}}}},formatCli:({deleted:n,todo:a,deletedCount:i})=>n?`Deleted: ${a.title}${i>1?` (${i} tasks)`:""}`:`Would delete "${a.title}" [${a.id}]. Re-run with --confirm to delete.`,revision:n=>et(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let a=n??{};return{section:we(a.section),q:we(a.q)}},fromCli:(n,a)=>({section:we(a.section),q:we(a.q??a.search)})},run:async({section:n,q:a})=>{let i=await lt();if(a){let s=Ct(a);i=i.filter(l=>s(l.tags,l.title,l.note))}return n&&mr.includes(n)?fr(i)[n]:i},formatCli:n=>n.length===0?"No matching todos.":n.map(gr).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await lt(),a=je();return ye(a).map(i=>({name:i,count:n.filter(s=>ee(s.group??"")===ee(i)).length}))},formatCli:n=>n.length?n.map(a=>`${a.name} (${a.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var es={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var $c=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,jc=/^-\s+(.*)$/,Gc=/^[A-Za-z][\w+.-]*:\/\//;function ts(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let a=n.trim();if(!a||a.startsWith("#"))continue;let i=a.match(jc);if(i){r?t.lists[r].push(i[1].trim()):t.bare===null&&(t.bare=i[1].trim());continue}let s=Gc.test(a)?null:a.match($c);if(s){let l=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=a)}return t}function os(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let a=Number.parseInt(n,10);return!Number.isFinite(a)||a<1?null:Math.min(a,r)}var Hn="notes-todo-fence-styles";function Kc(){if(document.getElementById(Hn))return;let e=document.createElement("style");e.id=Hn,e.textContent=`
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
`,document.head.appendChild(e)}var rs=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},Uc=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function Vc(e,t){let r=rs(),n=Uc(7),a=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(i=>!(t.status==="open"&&i.completed||t.status==="completed"&&!i.completed||a&&!i.tags.some(s=>s.replace(/^#/,"").toLowerCase()===a)||t.due==="today"&&i.dueDate!==r||t.due==="week"&&(!i.dueDate||i.dueDate>n)||t.due==="overdue"&&(!i.dueDate||i.dueDate>=r||i.completed))).sort((i,s)=>(i.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Hc=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let c=ve(),f=!0,y=()=>{dt(c).then(A=>{c.assertActive(),f&&r(A)}).catch(()=>{})};y();let b=Vt(y);return()=>{f=!1,b()}},[]);let n=ts(e),a=(n.values.status??"open").toLowerCase(),i=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:a==="completed"?"completed":a==="all"?"all":"open",due:i==="today"||i==="week"||i==="overdue"?i:null,limit:os(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=Vc(t,s),p=rs(),u=c=>{let f={...c,completed:!c.completed,status:c.completed?"open":"completed"};r(y=>y&&y.map(b=>b.id===c.id?f:b)),Ht(c.id,f)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:c=>m.workspace.openMainTab({newTab:m.ui.hasModKey(c)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(c=>o.createElement("div",{key:c.id,className:`todo-fence-row ${c.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:c.completed,onChange:()=>u(c),"aria-label":c.title}),c.priority!=="normal"&&o.createElement("span",{className:`pri pri-${c.priority}`},Re.find(f=>f.id===c.priority)?.symbol),o.createElement("span",{className:"t"},c.title),c.tags.slice(0,2).map(f=>o.createElement("span",{key:f,className:"tag"},"#",f.replace(/^#/,""))),c.dueDate&&o.createElement("span",{className:`due ${!c.completed&&c.dueDate<p?"overdue":""}`},c.dueDate))))};function ns(){let e=m.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Kc(),r.classList.add("todo-fence"),m.ui.renderReact(r,o.createElement(Hc,{code:t}))),{examples:es.todo});return()=>{e(),document.getElementById(Hn)?.remove()}}var K=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),ct=e=>o.createElement("svg",{className:e.className,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Bc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Wc=e=>o.createElement(ct,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),qc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Yc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Zc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Xc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Jc=e=>o.createElement(ct,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Qc={inprogress:qc,waiting:Yc,onhold:Wc,delegated:Zc,deferred:Xc,completed:Jc,canceled:Bc},ke=({status:e,dotCls:t})=>{let r=e?Qc[e]:void 0;return r?o.createElement(r,{className:`todo-status-menu-svg ${t}`}):o.createElement("span",{className:`todo-status-menu-dot ${t}`})},Ke=e=>o.createElement(K,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),yr=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),me=e=>o.createElement(K,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),wr=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),as=e=>o.createElement(K,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),is=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),ss=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),vr=e=>o.createElement(K,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),xr=e=>o.createElement(K,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),To=e=>o.createElement(K,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),So=e=>o.createElement(K,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),ds=e=>o.createElement(K,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),ls=e=>o.createElement(K,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),cs=e=>o.createElement(K,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),Zt=e=>o.createElement(K,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),Ce=e=>o.createElement(K,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),us=e=>o.createElement(ct,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),ps=e=>o.createElement(K,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),kr=e=>o.createElement(K,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),tt=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),Tr=e=>o.createElement(K,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),ms=e=>o.createElement(K,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),fs=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),Ao=e=>o.createElement(K,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Nt=e=>o.createElement(K,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),gs=e=>o.createElement(K,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),Xt=e=>o.createElement(K,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),hs=e=>o.createElement(K,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),Sr=e=>o.createElement(K,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),ut=e=>o.createElement(K,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),Ar=e=>o.createElement(K,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),bs=e=>o.createElement(K,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),ys=e=>o.createElement(K,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),ws=e=>o.createElement(K,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Eo=e=>o.createElement(K,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Do=e=>o.createElement(K,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),Jt=e=>o.createElement(K,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),Er=e=>o.createElement(K,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Co=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),Dr=e=>o.createElement(K,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),Bn=e=>o.createElement(K,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Wn=e=>o.createElement(K,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),qn=e=>o.createElement(K,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),vs=e=>o.createElement(K,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),xs=e=>o.createElement(K,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),ks=e=>o.createElement(K,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),Ts=e=>o.createElement(K,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),Ss=e=>o.createElement(K,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"})),As=e=>o.createElement(K,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M8 12h8M12 8v8"})),Es=e=>o.createElement(K,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Ds=e=>o.createElement(K,{...e},o.createElement("path",{d:"M5 12h14"}));function Io(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;m.links.open({category:"location",value:t})}var Cr=({value:e,onChange:t,disabled:r=!1})=>{let n=m.ui.ResourcePicker;return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-input-slot"},o.createElement(n,{className:"todo-location-input",disabled:r,value:e?.name??"",placeholder:d("todo.locationPlaceholder"),ariaLabel:d("todo.location"),kinds:["place"],allowCustom:!0,onChange:(a,i)=>{let s=Number(i?.metadata?.longitude),l=Number(i?.metadata?.latitude);t(a?{name:a,...Number.isFinite(s)&&Number.isFinite(l)?{lng:s,lat:l}:{}}:void 0)}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>Io(e)},o.createElement(hs,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onClick:()=>{t(void 0)}},o.createElement(me,null)))))};var Te={kind:"smart",id:"all"},Ir=[{id:"scheduled",labelKey:"todo.view.scheduled",color:he("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:he("primary-blue"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:he("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:he("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:he("green"),dated:!1}],Cs=Ir.map(e=>e.id);function Yn(e){let t=e&&typeof e=="object"?e:{},r=[];for(let i of Array.isArray(t.order)?t.order:[])typeof i=="string"&&Cs.includes(i)&&!r.includes(i)&&r.push(i);for(let i of Cs)r.includes(i)||r.push(i);let n=Array.isArray(t.hidden)?t.hidden:[],a=r.filter(i=>n.includes(i));return a.length===r.length&&a.shift(),{order:r,hidden:a}}function Is(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>pt(t))}function pt(e){return Ir.find(t=>t.id===e)??Ir[3]}function eu(e,t,r=xe(new Date)){if(t.kind==="groups")return e.group?new Set(t.names.map(ee)).has(ee(e.group)):t.includeUngrouped===!0;if(t.kind==="tag")return(e.tags??[]).some(n=>n.replace(/^#/,"").toLowerCase()===t.name.toLowerCase());if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function Nr(e,t,r,n=xe(new Date)){return eu(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Ns(e,t=xe(new Date)){let r={scheduled:0,today:0,flagged:0,all:0,completed:0};for(let n of e){if(n.completed){r.completed++;continue}r.all++,n.flagged&&r.flagged++;let a=n.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=t&&r.today++)}return r}function Pr(e,t){let r=t===null?null:ee(t);return e.filter(n=>!n.completed&&(r===null?!n.group:ee(n.group??"")===r)).length}function We(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var tu=Ir.map(e=>e.id);function Zn(e){if(typeof e!="string")return Te;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Te}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Te}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Te;let n=r,a=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],i=n.includeUngrouped===!0;return a.length||i?{kind:"groups",names:a,includeUngrouped:i}:Te}catch{return Te}return tu.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Te}function Lr(e,t){return We(e)===We(t)}var ou="todo.view",ru="todo.showCompleted",nu="todo.statusFilter",au="todo.search",iu="todo.pageSort",ea="panelChip",Ls="pageShowCompleted",Xn="statusFilter",ta="dateBreakdown",Os="smartLists",No="pageSearch",Ms="pageSort",su={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},_s=["due","priority","flagged","updated","created","name"];function Ps(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:_s.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:$t(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function _r(e){let t=su[e],r=o.useCallback(()=>Ps(m.settings.get()[t]),[t]),[n,a]=o.useState(r);o.useEffect(()=>m.settings.subscribe(()=>a(r())),[r]);let i=o.useCallback(s=>{a(l=>{let p=Ps({...l,...s});return m.settings.set(t,p),p})},[t]);return[n,i]}function Or(){let e=m.settings.get()[ta];return e==="weekly"||e==="daily"?e:"monthly"}function Fr(){let[e,t]=o.useState(Or);return o.useEffect(()=>m.settings.subscribe(()=>t(Or())),[]),e}function Qt(){return m.runtime.getOrCreate(ou,()=>({view:null,history:[],historyIndex:-1,listeners:new Set}))}function zr(){return m.runtime.getOrCreate(ru,()=>({show:null,listeners:new Set}))}function Rr(){return m.runtime.getOrCreate(nu,()=>({filter:null,listeners:new Set}))}function Po(){return m.runtime.getOrCreate(au,()=>({query:null,listeners:new Set}))}function $r(){return m.runtime.getOrCreate(iu,()=>({value:null,listeners:new Set}))}function Pt(){let e=Qt();return e.view||(e.view=Zn(m.settings.get()[ea]),e.history=[e.view],e.historyIndex=0),e.view}function Me(e){let t=Qt();if(Pt(),t.view&&Lr(t.view,e))return;let r=t.history.slice(0,t.historyIndex+1);t.history=[...r,e].slice(-20),t.historyIndex=t.history.length-1,t.view=e,m.settings.set(ea,We(e));for(let n of t.listeners)n(e)}function jr(){let e=Qt();return Pt(),{canGoBack:e.historyIndex>0,canGoForward:e.historyIndex<e.history.length-1}}function eo(e){let t=Qt();Pt();let r=t.historyIndex+e;if(!(r<0||r>=t.history.length)){t.historyIndex=r,t.view=t.history[r],m.settings.set(ea,We(t.view));for(let n of t.listeners)n(t.view)}}function oa(e){let t=Qt();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function Fs(){let e=Qt();e.view=null,e.history=[],e.historyIndex=-1,zr().show=null,Rr().filter=null,Po().query=null,$r().value=null}function Lo(){return Yn(m.settings.get()[Os])}function zs(e){m.settings.set(Os,Yn(e))}function Rs(){let[e,t]=o.useState(Lo);return o.useEffect(()=>m.settings.subscribe(()=>t(Lo())),[]),e}function $s(e){let t=Po(),r=e.slice(0,500);if(t.query!==r){t.query=r,m.settings.set(No,r);for(let n of t.listeners)n(r)}}function Gr(){let e=()=>{let n=Po();return n.query===null&&(n.query=typeof m.settings.get()[No]=="string"?String(m.settings.get()[No]).slice(0,500):""),n.query},[t,r]=o.useState(e);return o.useEffect(()=>{let n=Po();return n.listeners.add(r),()=>{n.listeners.delete(r)}},[]),[t,$s]}function ra(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||_s.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function js(){let e=$r();return e.value||(e.value=ra(m.settings.get()[Ms])),e.value}function Gs(e){let t=$r(),r=ra(e);if(!(t.value?.field===r.field&&t.value.dir===r.dir)){t.value=r,m.settings.set(Ms,r);for(let n of t.listeners)n(r)}}function Ks(){let[e,t]=o.useState(js);return o.useEffect(()=>{let r=$r();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,Gs]}function Kr(){return{v:1,view:We(Pt()),showCompleted:Qn(),statusFilter:Mr(),search:Po().query??(typeof m.settings.get()[No]=="string"?String(m.settings.get()[No]).slice(0,500):""),sort:js()}}function Ur(e){return e.v!==1?!1:(Me(Zn(e.view)),Ot(e.showCompleted===!0),Jn($t(e.statusFilter)),$s(typeof e.search=="string"?e.search:""),Gs(ra(e.sort)),!0)}function Mr(){let e=Rr();if(e.filter===null){let t=m.settings.get()[Xn];e.filter=$t(t),typeof t=="string"&&t!=="all"&&e.filter!=="all"&&m.settings.set(Xn,e.filter)}return e.filter}function Jn(e){let t=Rr(),r=$t(e),n=t.filter??Mr();if(!(n==="all"&&r==="all")&&!(n!=="all"&&r!=="all"&&n.length===r.length&&n.every((a,i)=>a===r[i]))){t.filter=r,m.settings.set(Xn,r);for(let a of t.listeners)a(r)}}function ot(){let[e,t]=o.useState(Mr);return o.useEffect(()=>{let r=Rr();r.listeners.add(t);let n=m.settings.subscribe(()=>{let a=$t(r.filter??Mr());Jn(a)});return()=>{r.listeners.delete(t),n()}},[]),[e,Jn]}function Lt(){let[e,t]=o.useState(Pt);return o.useEffect(()=>oa(t),[]),e}function Qn(){let e=zr();return e.show===null&&(e.show=m.settings.get()[Ls]===!0),e.show}function Ot(e){let t=zr();if(t.show!==e){t.show=e,m.settings.set(Ls,e);for(let r of t.listeners)r(e)}}function qe(){let[e,t]=o.useState(Qn);return o.useEffect(()=>{let r=zr();return r.listeners.add(t),()=>{r.listeners.delete(t)}},[]),[e,()=>Ot(!Qn())]}function Hr(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=m.interop.services.providers(vt).find(n=>n.owner===m.pluginId)?.providerId;return m.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}var du=["normal","low","medium","high"];function Vs(e,t){return e&&du.includes(e)?e:t}function lu(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function cu(e,t){return e.dueDate?{badges:lu(e),icon:"list-todo",id:e.id,documentRef:{pluginId:m.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Ne(e.group,t)}:{}}:null}function uu(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Vs(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:be(t.completed?"completed":null),updatedAt:new Date().toISOString()}}async function Vr(e){return He(e)}function Us(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var na="attachment:",aa="url:";function pu(){return!0}function mu(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Us(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(i=>({id:`${na}${i}`,label:Us(i),description:i,icon:"attachment"}))});let a=e.urls??[];return a.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:a.map(i=>({id:`${aa}${i}`,label:i,icon:"link"}))}),e.location&&pu()&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function fu(e,t){if(t.startsWith(na)){let r=t.slice(na.length);return(e.attachments??[]).includes(r)?(m.workspace.openFile(r),!0):!1}if(t.startsWith(aa)){let r=t.slice(aa.length);if(!(e.urls??[]).includes(r))return!1;let n=Kt(r);return n?m.workspace.openFile(n):m.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await m.workspace.revealOwnPanel("left_sidebar"),Me(e.completed?{kind:"smart",id:"completed"}:Te),Ee().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(m.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Io(e.location),!0):!1;default:return!1}}function Hs(){let e=ve(),t=St("calendar-source"),r=0,n=!0,a={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:u,endDate:c,limit:f,cursor:y})=>{let b,A=()=>`${t}:${r}`;if(y){let x;try{x=JSON.parse(y)}catch{throw new Error("Invalid Calendar source cursor.")}if(!x||x.startDate!==u||x.endDate!==c||x.limit!==f||x.revision!==A()||typeof x.cursor!="string"||!x.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");b=x.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let L=A(),P=await Ri(u,c,f,b);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(y&&L!==A())throw new Error("Calendar source cursor is stale; restart the range.");let N=je(),g=A();return{items:P.todos.map(x=>cu(x,N)).filter(x=>!!x),revision:g,...P.cursor?{cursor:JSON.stringify({startDate:u,endDate:c,limit:f,revision:g,cursor:P.cursor})}:{}}},create:async(u,c)=>{if(c.endDate&&c.endDate!==u)return!1;let f=c.title?.trim();if(!f)return!1;let y=new Date().toISOString();return dr({id:St("todo"),title:f,completed:c.completed??!1,priority:Vs(c.priority,"normal"),dueDate:u,startTime:c.startTime,endTime:c.endTime,note:c.note??"",location:c.location,urls:c.urls,attachments:c.attachments,group:c.group,tags:c.tags??[],filePath:c.filePath,createdAt:y,updatedAt:y})},update:async(u,c)=>{let f=await Vr(u);return f&&c.endDate&&c.endDate!==(c.date??f.dueDate)?!1:f?Ht(f.id,uu(f,c),f.updatedAt):!1},remove:u=>lr(u),open:async u=>{let c=await Vr(u);await m.workspace.revealOwnPanel("left_sidebar"),c&&(Me(c.completed?{kind:"smart",id:"completed"}:Te),Ee().request(c.id,"focus"))},configure:()=>m.workspace.openOwnSettings(),actions:async u=>{let c=await Vr(u);return c?mu(c):[]},runAction:async(u,c)=>{let f=await Vr(u);return f?fu(f,c):!1}},i=()=>{m.interop.state.publish(so,++r)};m.interop.state.publish(so,r);let s=Mi(i),l=$i(i),p=m.interop.services.provide(vt,a);return()=>{n=!1,s(),l(),p(),m.interop.state.publish(so,null)}}var ia=e=>typeof e=="string"?e:"";function Bs(e){let t=ia(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Ws(e){let t={cardKind:"todo",open:async(r,n)=>{if(ia(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ia(r.id)}),!0;let a=Bs(r.filePath)||Bs(n.path);return a?e.workspace.openFile(a,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(bn,t)}function mt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(a=>m.subscribeState(r,a),[r]);return o.useSyncExternalStore(n,m.getState,m.getState)}function Br(){let e=o.useCallback(i=>m.interop.state.subscribe(Uo,i),[]),t=o.useCallback(()=>m.interop.state.get(Uo),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,a=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&a?{start:n,end:a}:null}),[a,n,r?.selectedDate])}function qs(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((i,s)=>{let l=new Set(r.current);s?l.add(i):l.delete(i),r.current=l,t(l)},[]),a=o.useCallback(i=>r.current.has(i),[]);return{pendingIds:e,isPending:a,setPending:n}}var gu="todo.sharedTodos";function sa(){return m.runtime.getOrCreate(gu,()=>({todos:[],listeners:new Set}))}function ce(){return sa().todos}function rt(e){let t=sa();t.todos=e;for(let r of t.listeners)r(e)}function ft(e){let t=sa();return t.listeners.add(e),()=>{t.listeners.delete(e)}}function gt(){return m.workspace.openOwnSettings(),Promise.resolve()}var da={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1},Ys=[En.find(e=>e.id==="completed"),...En.filter(e=>e.id!=="completed")];function Mt(){return m.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function Zs(){for(let e of Mt().listeners)e()}function la(e){Mt().actions=e,Zs()}function ca(e,t){e?Mt().selected.set(t,e):Mt().selected.delete(t),Zs()}function hu(e){let t=Kr(),r=ce().find(n=>n.id===Mt().selected.get(e));return{title:d("manifest.name"),view:t,actions:Mt().actions??[],...r?{item:{id:r.id,title:r.title,state:{...t,todoId:r.id}}}:{},navigation:{...jr(),goBack:()=>eo(-1),goForward:()=>eo(1)}}}function bu(e){let t=Mt().listeners;t.add(e);let r=ft(e),n=oa(e),a=m.settings.subscribe(e);return()=>{t.delete(e),r(),n(),a()}}async function yu(e,t,r=!1){if(typeof e.todoId=="string"&&!await He(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!Ur(e))throw new Error("Unsupported To-Do bookmark.");ca(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Ee().request(e.todoId,"focus")}function wu({label:e,color:t,todos:r}){let[n,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":n,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(Zt,null))),n&&o.createElement("div",{className:"todo-group-status-breakdown"},Ys.map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,d(i.labelKey)),o.createElement("span",null,r.filter(s=>Le(s)===i.id).length)))))}function vu(){let e=o.useSyncExternalStore(ft,ce,ce),t=Ge(),r=Lt(),n=r.kind==="smart"?d(pt(r.id).labelKey):r.kind==="groups"?[...r.names,...r.includeUngrouped?[d("todo.chip.noGroup")]:[]].join(", "):r.kind==="tag"?`#${r.name}`:d("todo.chip.noGroup");return o.createElement("div",{className:"right-panel-body props-info"},o.createElement("dl",{className:"props-info-table todo-overall-summary"},[[d("todo.properties.view"),n],[d("todo.properties.tasks"),e.length],...Ys.map(a=>[d(a.labelKey),e.filter(i=>Le(i)===a.id).length])].map(([a,i])=>o.createElement("div",{className:"props-info-row",key:a},o.createElement("dt",{className:"props-info-key"},a),o.createElement("dd",{className:"props-info-value"},i)))),o.createElement("div",{className:"todo-status-groups"},[...ye(t),...e.some(a=>!a.group)?[null]:[]].map(a=>{let i=e.filter(l=>a===null?!l.group:ee(l.group??"")===ee(a)),s=a??d("todo.chip.noGroup");return o.createElement(wu,{key:a??"ungrouped",label:s,color:a?De(Ne(a,t)):"var(--text-tertiary)",todos:i})})))}function xu(){let e=o.useSyncExternalStore(ft,ce,ce),t=Ge(),r=Lt();return o.createElement("div",{className:"right-panel-body props-info"},o.createElement(Oo,{embedded:!0,todos:e,groups:t,names:ye(t),hasUngrouped:e.some(n=>!n.group),selected:r.kind==="groups"?r.names:[],includeUngrouped:r.kind==="nogroup"||r.kind==="groups"&&r.includeUngrouped===!0,onChange:(n,a)=>Me(n.length||a?{kind:"groups",names:n,includeUngrouped:a}:Te),onOpenSettings:gt}))}function Xs(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>xn(e,{id:`todo.${n}`,surface:n,getSnapshot:()=>hu(n),subscribe:bu,restore:(a,i,s)=>yu(a,n,s?.background)},{stateSchema:da,itemStateSchema:{...da,required:[...da.required,"todoId"]},description:(a,i)=>typeof a.view.path=="string"&&a.view.path?a.view.path:d(i?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Vo,{id:"todo.properties",label:"To-Do",labelKey:"manifest.name",icon:"list-todo",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let a=n?.item?.id?await He(n.item.id):null;return a?Object.entries(a).map(([i,s])=>({id:i,label:d(`todo.field.${i}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(vu,null)})),r.push(e.interop.extensions.provide(Vo,{id:"todo.groups",label:"Groups",labelKey:"todo.view.groups",icon:"group",pluginSurfaces:["main_workspace"],inspect:()=>je().map(n=>({id:n.id,label:n.name,value:ce().filter(a=>ee(a.group??"")===ee(n.name)).length,readOnly:!0})),render:()=>o.createElement(xu,null)})),()=>r.forEach(n=>n())}function Js(e,t,r){let n=new Date().toISOString();return{id:St("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function Qs(e,t){let r=e.trim();if(!r)return;let n=t.trim();return n?`${r}T${n}`:r}function ed(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function to(e,t,r="main_workspace"){let n=o.useRef(ve()).current,[a,i]=o.useState(ce()),[s,l]=o.useState(null),[p,u]=o.useState(null),[c,f]=o.useState(null),[y,b]=o.useState(!0),[A,L]=o.useState(0),[P,N]=o.useState(!1),{pendingIds:g,isPending:x,setPending:w}=qs(),z=o.useRef(!1),O=o.useRef(0),V=o.useRef({sortField:e,sortDir:t});V.current={sortField:e,sortDir:t};let j=o.useRef([]),G=o.useMemo(()=>{let D=new Map(a.map(h=>[h.id,h])),X=new Set(j.current),J=[];for(let h of j.current){let _=D.get(h);_&&J.push(_)}for(let h of a)X.has(h.id)||J.push(h);return J},[a,A]),te=o.useCallback(D=>{let X=++O.current;D&&b(!0),dt(n).then(J=>{if(n.assertActive(),X===O.current){if(D){let{sortField:h,sortDir:_}=V.current;j.current=Wt(J,h,_).map(I=>I.id)}else{let h=new Set(J.map(q=>q.id)),_=j.current.filter(q=>h.has(q)),I=new Set(_),{sortField:v,sortDir:C}=V.current,M=Wt(J.filter(q=>!I.has(q.id)),v,C).map(q=>q.id);j.current=[...M,..._]}rt(J),b(!1)}}).catch(()=>{X===O.current&&b(!1)})},[n]);o.useEffect(()=>(te(!0),()=>{O.current++}),[te]),o.useEffect(()=>Vt(()=>te(!1)),[te]);let oe=o.useRef(!0);o.useEffect(()=>{if(oe.current){oe.current=!1;return}j.current=Wt(ce(),e,t).map(D=>D.id),L(D=>D+1)},[e,t]),o.useEffect(()=>ft(D=>i(D)),[]);let ae=o.useCallback(()=>l(null),[]),de=o.useCallback(D=>{ca(D,r),f(D)},[r]),k=o.useCallback(()=>f(null),[]),E=o.useCallback(async(D,X,J)=>{if(z.current)return null;let h=D.trim();if(!h)return null;let _={...Js(h,X),...J?.patch};z.current=!0,N(!0),j.current=[_.id,...j.current],rt([_,...ce()]),l(_.id);let I=()=>{j.current=j.current.filter(v=>v!==_.id),rt(ce().filter(v=>v.id!==_.id)),l(v=>v===_.id?null:v)};try{let v=await dr(_);return v||I(),v?_:null}catch{return I(),null}finally{z.current=!1,N(!1)}},[]),F=o.useCallback(async(D,X,J)=>{if(x(D))return!1;let h=ce().find(I=>I.id===D);if(!h)return!1;let _={...h,...X,updatedAt:new Date().toISOString()};w(D,!0),rt(ce().map(I=>I.id===D?_:I));try{return await Ht(D,_,h.updatedAt,J)?!0:(rt(ce().map(v=>v.id===D?h:v)),!1)}catch{return rt(ce().map(I=>I.id===D?h:I)),!1}finally{w(D,!1)}},[x,w]),Z=o.useCallback(async D=>{if(x(D))return;let X=ce().find(h=>h.id===D);if(!X)return;w(D,!0),j.current=j.current.filter(h=>h!==D),rt(ce().filter(h=>h.id!==D)),l(h=>h===D?null:h),c===D&&f(null);let J=()=>{j.current.includes(D)||j.current.push(D),ce().some(h=>h.id===D)||rt([...ce(),X])};try{await lr(D)||J()}catch{J()}finally{w(D,!1)}},[c,x,w]);return{todos:a,loading:y,ordered:G,lastCreatedId:s,clearLastCreated:ae,menuId:p,setMenuId:u,editingId:c,openDetail:de,closeDetail:k,pendingIds:g,creating:P,create:E,patchTodo:F,removeTodo:Z}}function ua({value:e,onChange:t,timed:r=!0,time:n="",onTimeChange:a,defaults:i=!1}){let{NumberField:s,SelectField:l,Button:p,TimeField:u}=m.ui.settings,[c,f]=o.useState({}),[y,b]=o.useState(!1),A=e===void 0?"default":e.length?"custom":"off",L=P=>{let N=P.some(g=>!Number.isInteger(g)||g<0||g>10080)||new Set(P).size!==P.length;b(N),N||t(P)};return o.createElement("div",{style:{display:"grid",gap:8}},o.createElement(l,{ariaLabel:d("reminders.title"),value:A,onChange:P=>{b(!1),f({}),t(P==="off"?[]:P==="default"?void 0:[10])},options:[...i?[]:[{value:"default",label:d("reminders.default")}],{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]}),e?.map((P,N)=>{let g=c[N]??(P>0&&P%60===0);return o.createElement("div",{key:N,style:{display:"flex",alignItems:"center",gap:8}},o.createElement(s,{min:0,max:g?168:10080,value:g?P/60:P,ariaLabel:d(g?"reminders.hours":"reminders.minutes"),onChange:x=>{x!==null&&L(e.map((w,z)=>z===N?x*(g?60:1):w))}}),o.createElement(l,{value:g?"hours":"minutes",ariaLabel:d("reminders.title"),options:[{value:"minutes",label:d("reminders.minutes")},{value:"hours",label:d("reminders.hours")}],onChange:x=>{f(w=>({...w,[N]:x==="hours"})),L(e.map((w,z)=>z===N?(g?P/60:P)*(x==="hours"?60:1):w))}}),o.createElement(p,{onClick:()=>{f({}),L(e.filter((x,w)=>w!==N))},"aria-label":d("reminders.remove")},"\xD7"))}),A==="custom"&&(e?.length??0)<16&&o.createElement(p,{onClick:()=>{let P=10;for(;e?.includes(P);)P+=5;L([...e??[],P])}},d("reminders.add")),!r&&A!=="off"&&a&&o.createElement(u,{value:n,onChange:a,ariaLabel:d("reminders.time")}),!r&&!n&&A!=="off"&&o.createElement("span",null,d("reminders.timeRequired")),y&&o.createElement("span",{role:"alert"},d("reminders.invalid")))}function td(){let[e,t]=o.useState(()=>m.settings.get().reminderOffsets??[10]);return o.useEffect(()=>m.settings.subscribe(()=>t(m.settings.get().reminderOffsets??[10])),[]),o.createElement(m.ui.settings.Section,{title:d("reminders.title")},o.createElement(ua,{value:e,defaults:!0,onChange:r=>{m.settings.set("reminderOffsets",r??[10])}}))}function pa({value:e,onChange:t,disabled:r}){let n=m.ui.ResourcePicker;return o.createElement(n,{value:e,onChange:t,kinds:["attachment"],placeholder:d("auto.e7de9576dc00"),disabled:r,ariaLabel:d("auto.8410192cbb1f"),allowCustom:!1})}var ku=[".ttf",".otf",".woff",".woff2"],Tu=[".csv"],Su=[".base"],Au=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Eu=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],Du=[...Au,...Eu,".ico",".flavicon"];var Cu=[".pdf"],Iu=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus"],Nu=[".mp4",".mov",".m4v",".mkv",".webm",".ogv"],Pu=[".srt",".vtt",".ass"],Lu=[".stl",".obj",".glb",".gltf"],Ou=[".bin",".mtl"];function ma(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Mu={type:"core",id:"valley"},$=(e,t,r,n,a={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Mu,...a});function _u(e){let t={};for(let[r,n]of e)for(let a of r)t[a]=n;return t}var Fu=_u([[[".mermaid",".mmd"],$("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],$("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],$("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],$("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],$("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[ku,$("font","font","font","media")],[[".epub",".mobi",".azw3"],$("ebook","ebook","ebook","documents")],[[".djvu"],$("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],$("comic","comic","comic","documents")],[[".md",".markdown"],$("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],$("text","text","text","notes")],[[".json"],$("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],$("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Tu,$("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Su,$("base","base","fallback","data")],[Du,$("image","image","image","media",{information:["identity","dimensions","exif"]})],[Cu,$("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Iu,$("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Nu,$("video","video","video","media",{information:["identity","media","video-codec"]})],[Pu,$("text","subtitle","text","media")],[Lu,$("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[Ou,$("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],$("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],$("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],$("docx","word","opendocument","documents")],[[".ods"],$("csv","excel","opendocument","data")],[[".odp"],$("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],$("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],$("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],$("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],$("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],$("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],$("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],$("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],$("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],$("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],$("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],$("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],$("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],$("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],$("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],$("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],$("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],$("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],$("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],$("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],$("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],$("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],$("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],$("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],$("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],$("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],$("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],$("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),zu=$("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Ru(e){return Fu[ma(e)]??zu}function Mo(e){return Ru(e).kind}var od="valley-realm",rd="asset";function Wr(e){return`${od}://${rd}/${encodeURIComponent(e)}`}var $u={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function ju(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let a=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(a)} ${t[n]}`}function fa(e){let t=$u[Mo(e)];if(t)return d(t);let r=ma(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var Gu={image:bs,audio:ys,video:ws},nd=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),a=Mo(e),i=e.split("/").pop()??e,s=Gu[a]??Ar;o.useEffect(()=>{let c=!1;return m.realm.fileInfo(e).then(f=>{c||n(f?.size??null)}),()=>{c=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>m.realm.onChanged(()=>p(c=>c+1)),[]);let u=a==="image"?`${Wr(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:c=>m.workspace.openFile(e,void 0,{newTab:m.ui.hasModKey(c)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},i),o.createElement("span",{className:"todo-attach-meta"},fa(e),r!==null&&` \xB7 ${ju(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},u?o.createElement("img",{src:u,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:i})},o.createElement(me,null)))};function ga(e,t=500,r){let n=o.useRef(e);n.current=e;let a=o.useRef(null),i=o.useRef(!1),s=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let u=o.useCallback(async()=>{if(i.current)return;let c=a.current;if(c!==null){a.current=null,i.current=!0;try{let f=await n.current(c);!f&&a.current===null&&(a.current=c),f?l.current=0:l.current+=1}catch{a.current===null&&(a.current=c),l.current+=1}finally{i.current=!1,a.current!==null&&l.current<3?s.current=window.setTimeout(()=>{u()},250):a.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),u()},[u]),o.useCallback(c=>{a.current=c,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,u()},t)},[u,t])}function Ku({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:a="text",className:i}){let[s,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let u=()=>{s!==e&&t(s)};return o.createElement("input",{className:i,type:a,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:c=>l(c.target.value),onBlur:()=>{p.current=!1,u()},onKeyDown:c=>{c.key==="Enter"&&c.currentTarget.blur(),c.key==="Escape"&&(l(e),c.currentTarget.blur())}})}function Uu(e){let t=m.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Vu=({todoId:e,c:t,close:r})=>{let{Toggle:n,SelectField:a,DateField:i,TimeField:s}=m.ui.settings,[l,p]=o.useState(ce);o.useEffect(()=>ft(p),[]);let u=l.find(h=>h.id===e),c=zi(e),f=Ge(),[y,b]=o.useState(!1),[A,L]=o.useState(""),[P,N]=o.useState(!1),[g,x]=o.useState(""),w=Uu(e),z=o.useSyncExternalStore(o.useCallback(h=>(w.listeners.add(h),()=>{w.listeners.delete(h)}),[w]),()=>w.value,()=>w.value),O=o.useCallback(h=>{w.value={...w.value,...h};for(let _ of w.listeners)_()},[w]),V=z.title,j=h=>O({title:h}),G=()=>O({error:d("todo.error.saveDraft")});o.useEffect(()=>{w.revision||w.loadingRevision||(w.loadingRevision=m.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(h=>{h&&!w.revision&&(w.revision={expectedRevision:h.revision,realmGeneration:h.realmGeneration})}).catch(()=>{O({error:d("todo.error.saveDraft")})}).finally(()=>{w.loadingRevision=void 0}))},[w,e,O]);let te=async h=>(w.revision||await w.loadingRevision,w.revision?t.patchTodo(e,h,w.revision):!1),oe=ga(async h=>{let _=h.trim()?await te({title:h}):!0;return _&&w.value.title===h&&O({title:null,error:""}),_},500,G),ae=ga(async h=>{let _=await te({note:h});return _&&w.value.note===h&&O({note:null,error:""}),_},500,G),de=ga(async h=>{let _=JSON.parse(h),I=await te({tags:_});return I&&JSON.stringify(w.value.tags)===h&&O({tags:null,error:""}),I},0,G);if(o.useEffect(()=>{!u&&!t.loading&&r()},[u,t.loading,r]),!u)return null;let k=h=>{te(h).then(_=>{_||G()})},E=h=>{O({tags:h}),de(JSON.stringify(h))},F=h=>k({attachments:h.length?h:void 0}),Z=h=>k({urls:h.length?h:void 0}),T=u.remindAt?.slice(0,10)??"",D=u.remindAt?.slice(11,16)??"",X=(h,_)=>k({remindAt:Qs(h,_),reminderFiredAt:void 0}),J=ye(f);return o.createElement(m.ui.Modal,{title:d("todo.edit.title"),size:"large",bodyClassName:"todo-detail-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"btn-danger todo-detail-delete",onClick:()=>{Dt(u,t.removeTodo)}},d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-detail-content"},z.error&&o.createElement("p",{role:"alert"},z.error),o.createElement("div",{className:"todo-detail-title-row"},o.createElement("input",{className:"todo-detail-title","data-modal-initial-focus":"true",value:V??u.title,"aria-label":d("auto.c5e8306a511f"),onChange:h=>{j(h.target.value),oe(h.target.value)},onBlur:()=>{V===u.title&&j(null)},onKeyDown:h=>{h.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-detail-flag${u.flagged?" on":""}`,type:"button",onClick:()=>k({flagged:u.flagged?void 0:!0}),"aria-pressed":!!u.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(Ce,null))),o.createElement("div",{className:"todo-detail-cols"},o.createElement("div",{className:"todo-detail-col"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.notes")),o.createElement("div",{className:"todo-detail-notes"},o.createElement("textarea",{className:"todo-detail-note-input",value:z.note??u.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.edit.notes"),rows:7,onChange:h=>{let _=h.target.value;O({note:_}),ae(_)}}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.tags")),o.createElement(m.ui.TagInput,{value:z.tags??u.tags??[],onChange:E})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(ut,null)," ",d("todo.attachments")),(u.attachments??[]).map(h=>o.createElement(nd,{key:h,relPath:h,onRemove:()=>F((u.attachments??[]).filter(_=>_!==h))})),y?o.createElement(pa,{value:A,onChange:h=>{L(h),h&&((u.attachments??[]).includes(h)||F([...u.attachments??[],h]),L(""),b(!1))}}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>b(!0)},o.createElement(Ke,null)," ",d("todo.addAttachment"))),o.createElement("div",{className:"todo-detail-block todo-detail-links-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Nt,null)," ",d("todo.links")),o.createElement("label",{className:"todo-linked-file-control"},o.createElement("span",null,d("todo.linkedFile")),o.createElement(pa,{value:u.filePath??"",onChange:h=>k({filePath:h.trim()||void 0})})),(u.urls??[]).map(h=>o.createElement("div",{className:"todo-detail-url-card",key:h},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:h,onClick:_=>{let I=Kt(h);I?m.workspace.openFile(I,void 0,{newTab:m.ui.hasModKey(_)}):m.files.openExternalUrl(h)}},o.createElement(Nt,null),o.createElement("span",null,h)),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:h}),onClick:()=>Z((u.urls??[]).filter(_=>_!==h))},o.createElement(me,null)))),P?o.createElement(Ku,{className:"todo-detail-link-input todo-detail-url",value:g,onCommit:h=>{let _=ar(h);_&&!(u.urls??[]).includes(_)&&Z([...u.urls??[],_]),x(""),N(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")}):o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>N(!0)},o.createElement(Ke,null)," ",d("todo.addWebAppLink")))),o.createElement("div",{className:"todo-detail-col todo-detail-rail"},o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.properties")),o.createElement("label",{className:"todo-detail-field","data-status":Le(u)},o.createElement("span",{className:"todo-detail-label"},d("auto.bae7d5be7082")),o.createElement(a,{className:"todo-detail-select",value:Le(u),onChange:h=>k(be(h==="open"?null:h)),ariaLabel:d("auto.bae7d5be7082"),options:it().map(h=>({value:h,label:Je(h)}))})),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.886cbff9d9df")),o.createElement("div",{className:"todo-detail-priority",role:"group","aria-label":d("auto.886cbff9d9df")},Re.map(h=>o.createElement("button",{key:h.id,type:"button","aria-pressed":u.priority===h.id,title:d(h.labelKey),onClick:()=>k({priority:h.id})},h.symbol||d("todo.priorityNone"))))),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("todo.edit.group")),o.createElement(m.ui.ComboField,{className:"todo-detail-combo",value:u.group??"",onChange:h=>k({group:h.trim()||void 0}),options:J.map(h=>({value:h,label:h})),ariaLabel:d("todo.edit.group"),clearLabel:d("todo.chip.noGroup"),allowCustom:!1}))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.edit.schedule")),o.createElement("label",{className:"todo-detail-field"},o.createElement("span",{className:"todo-detail-label"},d("auto.145caf292855")),o.createElement(i,{className:"todo-detail-inline-date",value:u.dueDate,ariaLabel:d("auto.4c1aeebc433b"),onChange:h=>k({dueDate:h})})),o.createElement("div",{className:"todo-detail-times"},o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.88d8206d586a")),o.createElement(s,{className:"todo-detail-time-input",value:u.startTime??"",ariaLabel:d("auto.88d8206d586a"),onChange:h=>k({startTime:h||void 0})})),o.createElement("label",{className:"todo-detail-time"},o.createElement("span",{className:"todo-detail-label"},d("auto.cd7800da7f4f")),o.createElement(s,{className:"todo-detail-time-input",value:u.endTime??"",ariaLabel:d("auto.cd7800da7f4f"),onChange:h=>k({endTime:h||void 0})})))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("reminders.title")),o.createElement(ua,{value:u.reminderOffsets,onChange:h=>k({reminderOffsets:h,remindAt:void 0,reminderFiredAt:void 0}),timed:!!u.startTime,time:u.reminderTime,onTimeChange:h=>k({reminderTime:h})})),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.remindMe")),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.onADay")),o.createElement("span",{className:"todo-detail-row-end"},T&&o.createElement(i,{className:"todo-detail-inline-date",value:T,ariaLabel:d("todo.remindDate"),clearable:!1,onChange:h=>X(h,D)}),o.createElement(n,{checked:!!T,onChange:h=>X(h?u.dueDate||Hu():"",h?D:""),label:d("todo.onADay")}))),o.createElement("div",{className:"todo-detail-row"},o.createElement("span",{className:"todo-detail-label"},d("todo.atATime")),o.createElement("span",{className:"todo-detail-row-end"},D&&o.createElement(s,{className:"todo-detail-inline-input",value:D,ariaLabel:d("todo.remindTime"),clearable:!1,onChange:h=>X(T,h)}),o.createElement(n,{checked:!!D,disabled:!T,onChange:h=>X(T,h?"09:00":""),label:d("todo.atATime")}))),T&&o.createElement("p",{className:"todo-detail-hint"},d("todo.reminderAppOpenHint"))),o.createElement("div",{className:"todo-detail-block"},o.createElement("div",{className:"todo-detail-group-label"},o.createElement(Sr,null)," ",d("todo.location")),o.createElement(Cr,{value:u.location,onChange:h=>k({location:h})})),o.createElement("div",{className:"todo-detail-block todo-activity-block"},o.createElement("div",{className:"todo-detail-group-label"},d("todo.activity")),c.length?o.createElement("ol",{className:"todo-activity-list"},[...c].reverse().map((h,_)=>o.createElement("li",{key:`${h.changedAt}:${_}`},o.createElement("span",null,Je(h.from)," \u2192 ",Je(h.to)),o.createElement("time",{dateTime:h.changedAt},new Date(h.changedAt).toLocaleString(m.ui.language()))))):o.createElement("p",{className:"todo-detail-hint"},d("todo.activity.empty")))))))};function Hu(){let e=new Date,t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}var oo=({c:e})=>e.editingId?o.createElement(Vu,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function Bu(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Wu(e,t,r=320){let n=t.top-r,a=t.top+t.height+r,i=0,s=e.length;for(;i<s;){let p=i+s>>>1;e[p].start+e[p].height<n?i=p+1:s=p}let l=i;for(s=e.length;i<s;){let p=i+s>>>1;e[p].start<=a?i=p+1:s=p}return[l,i]}function qr(e,t){let{ids:r,estimate:n,pinned:a=[],layoutKey:i}=t,s=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[u,c]=e.useReducer(k=>k+1,0),[f,y]=e.useState({top:0,height:600}),[b,A]=e.useState(null),[L,P]=e.useState(null),N=e.useRef(null),g=e.useRef(null),x=e.useRef(null),w=e.useMemo(()=>{let k=0;return r.map((E,F)=>{let Z=p.current.get(E)??(typeof n=="number"?n:n(E,F)),T={id:E,height:Z,start:k};return k+=Z,T})},[r,n,u]),z=w.length?w[w.length-1].start+w[w.length-1].height:0,O=e.useRef({rows:w,viewport:f});O.current={rows:w,viewport:f};let V=e.useCallback(()=>{let k=l.current,E=N.current;if(!k||!E)return;let F=k.getBoundingClientRect(),Z=E.getBoundingClientRect(),T=E.clientHeight||Z.height||600,D=E===k?E.scrollTop:Z.top-F.top;y(X=>X.top===D&&X.height===T?X:{top:D,height:T})},[]),j=e.useCallback(()=>{g.current===null&&(g.current=(x.current??window).requestAnimationFrame(()=>{g.current=null,V()}))},[V]);e.useLayoutEffect(()=>{let k=l.current;if(!k||!s)return;let E=Bu(k);N.current=E;let F=k.ownerDocument.defaultView??window;x.current=F;let Z=k.style.overflowAnchor;k.style.overflowAnchor="none";let T=!0,D=()=>{if(!T)return;let _=k.ownerDocument.activeElement,I=_ instanceof HTMLElement?_:null;for(;I&&I.parentElement!==k;)I=I.parentElement;A(I?.dataset.visibleKey??null)},X=()=>{queueMicrotask(D)};E.addEventListener("scroll",j,{passive:!0}),F.addEventListener("resize",j),k.addEventListener("focusin",D),k.addEventListener("focusout",X);let J=k.clientWidth,h=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{k.clientWidth!==J&&(J=k.clientWidth,p.current.clear(),c()),j()});return h?.observe(E),E!==k&&h?.observe(k),V(),()=>{T=!1,k.style.overflowAnchor==="none"&&(k.style.overflowAnchor=Z),E.removeEventListener("scroll",j),F.removeEventListener("resize",j),k.removeEventListener("focusin",D),k.removeEventListener("focusout",X),h?.disconnect(),g.current!==null&&F.cancelAnimationFrame(g.current),g.current=null,N.current=null,x.current=null}},[s,V,j]),e.useLayoutEffect(()=>{let k=new Set(r);for(let E of p.current.keys())k.has(E)||p.current.delete(E);V()},[r,V]),e.useLayoutEffect(()=>{p.current.clear(),c()},[i]),e.useLayoutEffect(()=>{let k=l.current;if(!k||!s)return;let E=T=>{let D=0,X=!1,{rows:J,viewport:h}=O.current,_=new Map(J.map(I=>[I.id,I]));for(let I of T){let v=I.dataset.visibleKey,C=v?_.get(v):void 0,M=I.getBoundingClientRect().height;!v||!C||M<=0||Math.abs(M-C.height)<.5||(p.current.set(v,M),C.start+C.height<=h.top&&(D+=M-C.height),X=!0)}if(X){let I=N.current,v=k.closest('[data-visible-sections="true"]'),C=k;for(;C&&C.parentElement!==v;)C=C.parentElement;let M=v&&v!==k&&C&&I&&C.getBoundingClientRect().bottom<=I.getBoundingClientRect().top;D&&I&&!M&&(I.scrollTop+=D),c(),j()}},F=Array.from(k.children).filter(T=>T.hasAttribute("data-visible-key")),Z=typeof ResizeObserver>"u"?void 0:new ResizeObserver(T=>E(T.map(D=>D.target)));return F.forEach(T=>Z?.observe(T)),E(F),()=>Z?.disconnect()}),e.useLayoutEffect(()=>{if(!L)return;let k=Array.from(l.current?.children??[]).find(E=>E.dataset.visibleKey===L.id);k&&(k.scrollIntoView?.({block:"nearest"}),L.selector&&(k.matches(L.selector)?k:k.querySelector(L.selector))?.focus(),V(),P(null))},[L,w,V]);let G=e.useCallback((k,E)=>{P({id:k,selector:E})},[]),[te,oe]=s?Wu(w,f):[0,w.length],ae=new Set;for(let k=te;k<oe;k++)ae.add(k);let de=new Set([...a,b,L?.id].filter(Boolean));return de.size&&w.forEach((k,E)=>{de.has(k.id)&&ae.add(E)}),{ref:l,show:G,render(k){let E=[],F=0;for(let Z of[...ae].sort((T,D)=>T-D)){let T=w[Z];T.start>F&&E.push(e.createElement("div",{key:`space:${T.id}`,"aria-hidden":!0,style:{height:T.start-F,flex:"0 0 auto",pointerEvents:"none"}})),E.push(e.createElement(e.Fragment,{key:T.id},k(Z))),F=T.start+T.height}return z>F&&E.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:z-F,flex:"0 0 auto",pointerEvents:"none"}})),E}}}function Yr(e){return m.markdown.render(e,{inline:!0})}function ad({todo:e,c:t}){let[r,n]=o.useState({source:"",html:""}),a=o.useRef(null);o.useEffect(()=>{let s=!0;return m.markdown.render(e.note).then(l=>{s&&n({source:e.note,html:l})}).catch(()=>{s&&n({source:"",html:""})}),()=>{s=!1}},[e.note]),o.useEffect(()=>{a.current?.querySelectorAll("img.md-embed[data-embed], img.md-asset[data-src]").forEach(s=>{let l=s.dataset.embed??s.dataset.src??"",p=m.workspace.resolveWikilink(l);if(p&&Mo(p)==="image")s.src=Wr(p),s.loading="lazy";else{let u=s.ownerDocument.createElement("a");u.dataset.wikilink=l,u.textContent=s.alt||l,u.href="#",s.replaceWith(u)}})},[r]);let i=s=>{let l=s.target,p=l.closest("input.md-task-checkbox");if(p){s.stopPropagation();let y=e.note.split(`
`),b=Number(p.dataset.taskLine);if(!Number.isInteger(b)||!y[b]||t.pendingIds.has(e.id)){s.preventDefault();return}let A=p.checked;y[b]=y[b].replace(/^(\s*(?:[-*+]|\d+[.)])\s+\[)[^\]](\])/,`$1${p.checked?"x":" "}$2`),t.patchTodo(e.id,{note:y.join(`
`)}).then(L=>{!L&&p.isConnected&&(p.checked=!A)});return}let u=l.closest("a");if(!u)return;s.preventDefault(),s.stopPropagation();let c=u.dataset.wikilink,f=u.getAttribute("href")??"";if(c){let y=m.workspace.resolveWikilink(c);y&&m.workspace.openFile(y,void 0,{newTab:m.ui.hasModKey(s)})}else if(go(f))m.links.open(f);else if(f&&!/^[a-z][a-z\d+.-]*:/i.test(f)&&!f.startsWith("#")){let y=m.workspace.resolveWikilink(f);y&&m.workspace.openFile(y,void 0,{newTab:m.ui.hasModKey(s)})}};return o.createElement("div",{ref:a,className:"todo-notes",onClick:i,...r.source===e.note?{dangerouslySetInnerHTML:{__html:r.html}}:{children:e.note}})}var qu={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},Yu=["tomorrow","weekend","pick"];function Zu(e=xe(new Date)){let t=$n(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return qt(e,n)}function Zr(e,t=xe(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?qt(t,1):s==="weekend"?Zu(t):null,a=new Set,i=[];for(let s of Yu){let l=n(s);if(l!==null){if(l===r||a.has(l))continue;a.add(l)}i.push({id:s,labelKey:qu[s],date:l})}return i}var Xr=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:a,onRequestDelete:i,disabled:s=!1})=>{let l=Le(e);return o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:p=>{p.stopPropagation(),r(e.id);let u=Zr(e.dueDate??"",xe(new Date));m.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(tt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Gt().map(c=>({label:d(c.labelKey),icon:o.createElement(ke,{status:c.status,dotCls:c.cls}),type:"radio",checked:c.status===null?l==="open":l===c.status,onSelect:()=>a(be(c.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(Jt,{className:"todo-menu-action-icon"}),enabled:!s,submenu:u.filter(c=>c.date).map(c=>({label:d(c.labelKey),icon:c.id==="tomorrow"?o.createElement(Co,{className:"todo-menu-action-icon"}):c.id==="weekend"?o.createElement(Dr,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:c.date})}))},{label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(Ce,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:()=>a({flagged:e.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(us,{className:"todo-menu-action-icon"}),enabled:!s,submenu:Re.map(c=>({label:Tt(c.id),type:"radio",checked:e.priority===c.id,onSelect:()=>a({priority:c.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(kr,{className:"todo-menu-action-icon"}),enabled:!s,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!e.group,onSelect:()=>a({group:void 0})},...t.map(c=>({label:c,type:"radio",checked:e.group===c,onSelect:()=>a({group:c})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(ps,{className:"todo-menu-action-icon"}),enabled:!s,onSelect:n},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(Tr,{className:"todo-menu-action-icon"}),enabled:!s,danger:!0,onSelect:i}],{anchor:p.currentTarget,align:"end"}).finally(()=>r(null))}},o.createElement(is,null)))};function Xu(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Ju(e,t=.998){return e/1e3*t/(1-t)}function id(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let i=e.length-1;i>=0&&(n=e[i],!(r.t-n.t>=t));i--);let a=r.t-n.t;return a>0?(r.x-n.x)/a*1e3:0}function sd(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let a=Math.max(20,r-t);return Math.sign(e)*(t+Xu(n-t,a,.2))}function dd(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),a=Math.max(-t,Math.min(t,Ju(e.velocity*r))),i=n+a;return{target:Math.abs(i-t)<Math.abs(i)?r*t:0,commit:!1}}function ld(e,t,r,n,a,i){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/a)**2,p=2*i*Math.sqrt(l),u=t+(-l*(e-r)-p*t)*s,c=e+u*s,f=Math.abs(c-r)<.5&&Math.abs(u)<20;return{value:f?r:c,velocity:f?0:u,done:f}}function ha(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let a=e>88,i=a?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*s<=i+(r?24:0),p=l?s:48,u=Math.min(n*p,Math.max(i,n*32)),c=a?Math.min(Math.max(e*.8,u+56),e-24):u+56;return{buttonWidth:p,labelled:l,openWidth:u,commitPoint:c}}var cd=.22,ud=.18,Qu=.8,Jr=.9,ep=400,tp=80,op=10,rp=5,np=4,ap=3,ip=.5,sp=6,dp=["left","right"],pd={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function lp(e,t,r,n,a,i){return{kind:e,pointerId:t,originX:r,originY:n,base:a,origin:i,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function cp(e,t){let r={today:o.createElement(Co,null),tomorrow:o.createElement(Co,null),weekend:o.createElement(Dr,null),pick:o.createElement(Jt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:a=>{n.date?t.reschedule(n.date):t.pickDate(a)}}))}var Fo=null;function md(e){if(Fo===e)return;let t=Fo;Fo=e,t?.close()}function fd(e){Fo===e&&(Fo=null)}var ro;function gd(e,t){if(ro===void 0)try{ro=document.createElement("canvas").getContext("2d")}catch{ro=null}return ro?(ro.font=t,ro.measureText(e).width):e.length*7}var up=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,_o=e=>e>0?"left":e<0?"right":null,hd=({todo:e,disabled:t,actions:r,onEngage:n,children:a})=>{let i=o.useRef(null),s=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),u=o.useRef(null),c=o.useRef(null),f=o.useRef([]),y=o.useRef(!1),b=o.useRef(null),A=o.useRef(null),L=o.useRef({velocity:0,target:0,response:cd,damping:Jr}),P=o.useRef({left:"",right:""}),N=o.useMemo(()=>cp(Zr(e.dueDate??"",xe(new Date)),r),[e.dueDate,r]),g=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(Ce,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(ss,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(Tr,null),run:()=>r.remove()}],[r,e.flagged]),x={left:N,right:g},[w,z]=o.useState(()=>({rowWidth:0,left:pd,right:pd})),O=o.useRef(w);O.current=w;let V=()=>{let v=i.current?.querySelector(".todo-swipe-action");if(!v||typeof getComputedStyle!="function")return"13px sans-serif";let C=getComputedStyle(v);return`${C.fontWeight} ${C.fontSize} ${C.fontFamily}`},j=()=>{let v=i.current?.clientWidth??0,C=V(),M=O.current,q={rowWidth:v,left:ha(v,N.map(Y=>gd(Y.label,C)),M.left.labelled),right:ha(v,g.map(Y=>gd(Y.label,C)),M.right.labelled)};O.current=q;let Q=Y=>M[Y].openWidth!==q[Y].openWidth||M[Y].labelled!==q[Y].labelled;return(M.rowWidth!==v||Q("left")||Q("right"))&&z(q),q},G=o.useRef(j);G.current=j,o.useEffect(()=>{G.current()},[N,g]);let te=v=>{let C=_o(v);return!C||C!==c.current?!1:Math.abs(v)>=O.current[C].commitPoint},oe=(v,C=!1)=>{p.current=v,C&&v!==0?md(F.current):v===0&&fd(F.current);let M=i.current,q=s.current;if(!M||!q)return;q.style.transform=v?`translate3d(${v}px, 0, 0)`:"";let Q=_o(v),Y=O.current,Se=te(v);M.classList.toggle("open",v!==0),M.classList.toggle("committed",Se);for(let fe of dp){let B=l.current[fe];if(!B)continue;let ue=Q===fe;B.classList.toggle("committed",ue&&Se);let Ye=ue?Se?"100%":`${Math.max(Y[fe].openWidth,Math.abs(v))}px`:`${v===0?Y[fe].openWidth:0}px`,$e=`${Ye}|${ue}`;P.current[fe]!==$e&&(P.current[fe]=$e,B.style.width=Ye,B.setAttribute("aria-hidden",String(!ue)))}};o.useLayoutEffect(()=>oe(p.current));let ae=()=>{b.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(b.current),b.current=null},de=(v,C,M,q)=>{if(ae(),v!==0&&md(F.current),p.current===v||up()||typeof requestAnimationFrame!="function"){oe(v);return}L.current={velocity:C,target:v,response:M,damping:q};let Q=0,Y=Se=>{let fe=Q?(Se-Q)/1e3:.016666666666666666;Q=Se;let B=L.current,ue=ld(p.current,B.velocity,B.target,fe,B.response,B.damping);B.velocity=ue.velocity,oe(ue.value),b.current=ue.done?null:requestAnimationFrame(Y)};b.current=requestAnimationFrame(Y)},k=o.useRef(()=>{});k.current=()=>{u.current=null,de(0,0,ud,Jr)};let E=o.useCallback(()=>k.current(),[]),F=o.useRef({close:()=>k.current()}),Z=()=>{ae(),u.current=null,A.current!=null&&window.clearTimeout(A.current),A.current=null,oe(0)},T=o.useRef(Z);T.current=Z;let D=v=>{let C=O.current,M=_o(v);if(!M)return 0;let q=u.current?.origin;if(q&&M!==q)return 0;let Q=C[M],Y=M===c.current?Q.commitPoint:Q.openWidth;return sd(v,Y,C.rowWidth)},X=(v,C,M,q,Q)=>{ae(),j();let Y=p.current,Se=_o(Y),fe=Math.abs(Y)>8?Se:null;c.current=Se&&Math.abs(Y)>=O.current[Se].openWidth-1?Se:null,u.current=lp(v,C,M,q,Y,fe),f.current=[{x:Y,t:Q}]},J=(v,C)=>{let M=u.current;!M||M.ended||(M.live||(M.live=!0,ae(),n?.()),f.current.push({x:v,t:C}),f.current.length>sp&&f.current.shift(),oe(D(v),!0),te(p.current)&&(M.crossed=!0))},h=v=>{let C=u.current;if(!C||C.ended)return;if(C.ended=!0,!C.live){u.current=null;return}let M=()=>{C.kind==="pointer"&&(u.current=null)},q=id(f.current),Q=p.current,Y=_o(Q);if(!Y){M(),oe(0);return}let Se=O.current[Y],fe=v&&te(Q),B=dd({offset:Q,velocity:q,openWidth:Se.openWidth,committed:fe});if(M(),B.commit){let ue=Y==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",Ye=i.current?.querySelector(ue),$e=x[Y],Ze=Y==="left"?$e[0]:$e[$e.length-1];de(0,q,ud,Jr),Ze?.run(Ye??i.current);return}de(B.target,q,cd,Math.abs(q)>ep?Qu:Jr)};o.useEffect(()=>E(),[e.dueDate,e.flagged,E]),o.useEffect(()=>{let v=F.current;return()=>{ae(),A.current!=null&&window.clearTimeout(A.current),fd(v)}},[]),o.useEffect(()=>{let v=i.current,C=v?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!v||!C)return;let M=0,q=new C(()=>{let Q=v.clientWidth,Y=M!==Q;M=Q,G.current(),Y&&p.current!==0&&T.current()});return q.observe(v),()=>q.disconnect()},[]);let _=o.useRef({disabled:t,begin:X,move:J,end:h});_.current={disabled:t,begin:X,move:J,end:h},o.useEffect(()=>{let v=i.current;if(!v)return;let C=()=>{A.current!=null&&window.clearTimeout(A.current),A.current=null},M=()=>{A.current=null,u.current?.kind==="wheel"&&(_.current.end(!0),u.current=null)},q=Q=>{let Y=_.current;if(Y.disabled||Math.abs(Q.deltaX)<=Math.abs(Q.deltaY)||Q.deltaX===0)return;Q.preventDefault();let Se=Q.deltaMode===WheelEvent.DOM_DELTA_LINE?16:Q.deltaMode===WheelEvent.DOM_DELTA_PAGE?v.clientWidth:1,fe=-Q.deltaX*Se,B=u.current;(!B||B.kind!=="wheel")&&(Y.begin("wheel",-1,0,0,Q.timeStamp),B=u.current),C(),A.current=window.setTimeout(M,tp);let ue=Math.abs(fe),Ye=B.previous;B.previous=ue;let $e=B.live&&(B.ended||B.origin!==null&&p.current===0),Ze=ue>=Ye+rp,zo=B.distance!==0&&Math.sign(fe)!==Math.sign(B.distance)&&ue>=np;if($e&&(Ze||zo)&&(Y.end(!1),Y.begin("wheel",-1,0,0,Q.timeStamp),B=u.current,B.previous=ue),B.ended)return;if(B.decay=ue<Ye?B.decay+1:0,B.peak=Math.max(B.peak,ue),B.distance+=fe,B.live&&B.peak>=op&&B.decay>=ap&&ue<B.peak*ip){Y.end(B.crossed);return}!B.live&&Math.abs(B.distance)<8||Y.move(B.base+B.distance,Q.timeStamp)};return v.addEventListener("wheel",q,{passive:!1}),()=>{v.removeEventListener("wheel",q),C()}},[]);let I=(v,C)=>o.createElement("div",{ref:M=>{l.current[v]=M},className:`todo-swipe-tray todo-swipe-tray-${v} ${w[v].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${w[v].openWidth}px`}},C.map(M=>o.createElement("button",{key:M.key,type:"button",className:M.cls,tabIndex:-1,title:M.label,"aria-label":M.label,onClick:q=>{q.stopPropagation(),E(),M.run(q.currentTarget)}},M.icon,o.createElement("span",null,M.label))));return o.createElement("div",{ref:i,className:"todo-swipe","data-visible-key":e.id,onPointerDown:v=>{t||v.pointerType==="mouse"&&v.button!==0||v.target.closest(".todo-swipe-tray")||X("pointer",v.pointerId,v.clientX,v.clientY,v.timeStamp)},onPointerMove:v=>{let C=u.current;if(!C||C.kind!=="pointer"||C.pointerId!==v.pointerId)return;let M=v.clientX-C.originX,q=v.clientY-C.originY;if(!C.live){if(Math.abs(q)>Math.abs(M)){v.currentTarget.hasPointerCapture?.(v.pointerId)&&v.currentTarget.releasePointerCapture(v.pointerId),u.current=null;return}if(Math.abs(M)<8)return;y.current=!0,v.currentTarget.setPointerCapture?.(v.pointerId)}v.preventDefault(),J(C.base+M,v.timeStamp)},onPointerUp:v=>{let C=u.current;!C||C.kind!=="pointer"||C.pointerId!==v.pointerId||(v.currentTarget.hasPointerCapture?.(v.pointerId)&&v.currentTarget.releasePointerCapture(v.pointerId),C.live&&J(C.base+(v.clientX-C.originX),v.timeStamp),h(!0))},onPointerCancel:v=>{let C=u.current;!C||C.kind!=="pointer"||C.pointerId!==v.pointerId||(v.currentTarget.hasPointerCapture?.(v.pointerId)&&v.currentTarget.releasePointerCapture(v.pointerId),E())},onClickCapture:v=>{let C=!!v.target.closest(".todo-swipe-tray");if(C&&(y.current=!1),y.current&&!C){y.current=!1,v.stopPropagation(),v.preventDefault();return}p.current&&!C&&(v.stopPropagation(),v.preventDefault(),E())}},N.length>0&&I("left",N),o.createElement("div",{ref:s,className:"todo-swipe-surface"},a),g.length>0&&I("right",g))};function Qr(e,t,r){let n=Le(t);m.ui.openMenu(Gt().map(a=>({label:d(a.labelKey),icon:o.createElement(ke,{status:a.status,dotCls:a.cls}),type:"radio",checked:a.status===null?n==="open":a.status===n,onSelect:()=>r(be(a.status))})),{anchor:e})}var pp=2,bd=({todo:e,groups:t,compact:r,c:n,hideDate:a=!1,onMoveFocus:i})=>{let s=o.useRef(null);o.useEffect(()=>()=>{s.current&&clearTimeout(s.current)},[]);let[l,p]=o.useState("");o.useEffect(()=>{let T=!0;return p(""),Yr(e.title).then(D=>{T&&p(D)}).catch(()=>{T&&p("")}),()=>{T=!1}},[e.title]);let u=(T,D)=>m.workspace.openFile(T,void 0,{newTab:D}),c=Re.find(T=>T.id===e.priority)??Re[0],f=ye(t),y=Le(e),b=[e.filePath,...e.attachments??[]].filter(T=>!!T),[A,L]=o.useState(!1),P=A?b:b.slice(0,pp),N=b.length-P.length,g=e.urls?.length??0,x=r&&b.length>0,w=!!(e.dueDate&&!a||e.startTime||e.remindAt||e.location||e.group||g>0||x||e.status&&e.status!=="open"&&!Pe(e.status).done||e.priority!=="normal"),z=n.pendingIds.has(e.id),O=xe(new Date),V=e.dueDate&&!a?pr(e.dueDate,O,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},m.ui.language(),m.getState().dateFormat):"",j=e.dueDate?Fe(e.dueDate,m.getState().dateFormat):"",G=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<O,te=o.useRef(null),oe=o.useRef(null);o.useEffect(()=>oe.current?qo(e.id,oe.current):void 0,[e.id]);let ae=o.useRef(null),de=o.useRef(!1),k=o.useCallback(()=>{ae.current!=null&&(window.clearTimeout(ae.current),ae.current=null)},[]);o.useEffect(()=>k,[k]);let E=()=>{Hr(e)||n.openDetail(e.id)},F=T=>n.patchTodo(e.id,T),Z=o.useMemo(()=>({reschedule:T=>{n.patchTodo(e.id,{dueDate:T})},pickDate:T=>{let{DateField:D}=m.ui.settings;m.ui.openPopover(X=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(D,{value:e.dueDate,ariaLabel:d("todo.swipe.date"),onChange:J=>{n.patchTodo(e.id,{dueDate:J}),X.close()}})),{anchor:T},{ariaLabel:d("todo.swipe.date")})},setStatus:T=>Qr(T,e,F),toggleFlag:()=>{n.patchTodo(e.id,{flagged:!e.flagged})},openDetails:()=>n.openDetail(e.id),remove:()=>{Dt(e,n.removeTodo)}}),[e,n]);return o.createElement(hd,{todo:e,disabled:z,actions:Z,onEngage:k},o.createElement("article",{ref:oe,className:`todo-row todo-row-navigable${e.completed?" completed":""}${r?" compact":""}${e.flagged?" flagged":""}`,"data-todo-id":e.id,tabIndex:0,onKeyDown:T=>{if(T.target===T.currentTarget){if(T.key==="ArrowDown"||T.key==="ArrowUp"){T.preventDefault(),i?.(T.key==="ArrowDown"?1:-1);return}if(T.key==="Escape"){T.currentTarget.blur();return}T.key==="Enter"&&(T.preventDefault(),n.openDetail(e.id))}},onClick:T=>{T.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||T.detail>1||(s.current&&clearTimeout(s.current),s.current=setTimeout(()=>{s.current=null,E()},220))},onDoubleClick:T=>{s.current&&(clearTimeout(s.current),s.current=null),!T.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&n.openDetail(e.id)}},o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:te,className:"todo-check","data-status":y,type:"checkbox",checked:y==="completed","aria-disabled":z||void 0,onPointerDown:()=>{z||(de.current=!1,k(),ae.current=window.setTimeout(()=>{de.current=!0;let T=te.current;T&&m.ui.openMenu(Gt().map(D=>({label:d(D.labelKey),icon:o.createElement(ke,{status:D.status,dotCls:D.cls}),type:"radio",checked:D.status===null?y==="open":D.status===y,enabled:!z,onSelect:()=>n.patchTodo(e.id,be(D.status))})),{anchor:T})},450))},onPointerUp:k,onPointerLeave:k,onClick:T=>{de.current&&(T.preventDefault(),de.current=!1)},onChange:T=>{n.patchTodo(e.id,be(T.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),y!=="open"&&y!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(ke,{status:y,dotCls:Pe(y).cls}))),o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,c.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${e.priority}`},c.symbol," "),l?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:l}}):o.createElement("span",{className:"todo-title-md"},e.title)),!r&&e.note.trim()&&o.createElement(ad,{todo:e,c:n}),(w||!r&&!!e.tags?.length)&&o.createElement("div",{className:"todo-view-meta"},e.group&&o.createElement("span",{className:"todo-group-text",style:{color:De(Ne(e.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),e.group),e.status&&e.status!=="open"&&!Pe(e.status).done&&o.createElement("span",{className:`todo-status-text ${Pe(e.status).cls}`},o.createElement(ke,{status:e.status,dotCls:Pe(e.status).cls}),Je(e.status)),e.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${e.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Ao,null)),Ai(e.priority)),V&&o.createElement("button",{className:`todo-date${G?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:j||V}),onClick:T=>{T.stopPropagation(),E()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Jt,null)),o.createElement("span",{className:"todo-date-day"},V),j&&j!==V&&o.createElement("span",{className:"todo-date-full"},j)),e.startTime&&o.createElement("span",{className:"todo-clock-text"},o.createElement("span",{className:"todo-meta-icon"},o.createElement(fs,null)),e.startTime,e.endTime?`\u2013${e.endTime}`:""),e.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:e.location.name}),onClick:T=>{T.stopPropagation(),Io(e.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Sr,null)),e.location.name),x&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(ut,null)),b.length),g>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(Nt,null),g>1&&g),e.remindAt&&!e.reminderFiredAt&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(ms,null),e.remindAt.slice(11,16)),!r&&e.tags?.map(T=>o.createElement("span",{key:T,className:"todo-tag-text"},"#",T)))),o.createElement("div",{className:"todo-row-actions"},e.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(Ce,null)),o.createElement(Xr,{todo:e,groupNames:f,openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:F,onRequestDelete:()=>Dt(e,n.removeTodo),disabled:z})),!r&&b.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},P.map(T=>o.createElement("button",{key:T,className:"todo-file-card",title:T,onClick:D=>{D.stopPropagation(),u(T,m.ui.hasModKey(D))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},T===e.filePath?o.createElement(Ar,null):o.createElement(ut,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},ed(T)),o.createElement("span",{className:"todo-file-card-kind"},fa(T))))),(N>0||A)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${A?" open":""}`,title:A?d("todo.fewerFiles"):d("todo.moreFiles",{p0:N}),"aria-expanded":A,onClick:T=>{T.stopPropagation(),L(D=>!D)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(Zt,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},A?d("todo.fewerFiles"):d("todo.moreFiles",{p0:N})))))))};var yd=({todos:e,groups:t,compact:r,hideDate:n=!1,c:a})=>{let i=Ee(),s=o.useSyncExternalStore(i.subscribe,i.get,i.get),l=o.useMemo(()=>e.map(f=>f.id),[e]),p=qr(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[a.editingId,a.menuId,a.lastCreatedId,s?.todoId]}),u=p.show;o.useLayoutEffect(()=>{s&&l.includes(s.todoId)&&u(s.todoId)},[s,l,u]);let c=o.useCallback((f,y)=>{let b=e[Math.max(0,Math.min(e.length-1,f+y))];b&&u(b.id,".todo-row")},[e,u]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(f=>o.createElement(bd,{key:e[f].id,todo:e[f],groups:t,compact:r,c:a,hideDate:n,onMoveFocus:y=>c(f,y)})))};function wd({sections:e,c:t,compact:r=!1,className:n,estimate:a,layoutKey:i,children:s}){let l=Ee(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),u=o.useMemo(()=>e.map(N=>N.key),[e]),[c,f]=o.useState(null),y=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,c].filter(Boolean)),b=e.filter(N=>N.todos.some(g=>y.has(g.id))).map(N=>N.key),A=o.useCallback((N,g)=>a?.(e[g])??32+e[g].todos.length*(r?52:84),[e,r,a]),L=qr(o,{ids:u,estimate:A,pinned:b,layoutKey:i??r}),P=L.show;return o.useLayoutEffect(()=>{if(!p)return;let N=e.find(g=>g.todos.some(x=>x.id===p.todoId));N&&P(N.key)},[p,e,P]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:L.ref,onDragStartCapture:N=>f(N.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>f(null)},L.render(N=>o.cloneElement(s(e[N]),{"data-visible-key":u[N]})))}function mp(e,t,r,n,a){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return xo(`${t}-01`).toLocaleDateString(a,{month:"long",year:"numeric"});if(e==="weekly"){let i=xo(t),s=new Date(i.getFullYear(),i.getMonth(),i.getDate()+6);return d("todo.breakdown.weekLabel",{count:Ui(i),p0:`${ur(t,a,n)} \u2013 ${ur(Be(s),a,n)}`})}return t===qt(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===qt(r,1)?d("todo.due.tomorrow"):ur(t,a,n)}function en({todos:e,groups:t,compact:r,controller:n,mode:a,weekStart:i,timeline:s=!1}){let l=Be(),{shortDateFormat:p}=mt("shortDateFormat"),u=m.ui.language(),c=o.useMemo(()=>{if(!s)return Un(e,a,jn(i));let f=new Map(e.map(b=>[b,Gn(b)])),y=[...e].sort((b,A)=>f.get(A).localeCompare(f.get(b)));return Un(y,a,jn(i),{dateOf:b=>Kn(f.get(b))})},[a,s,e,i]);return o.createElement(wd,{className:"todo-panel-date-sections",sections:c,c:n,compact:r},f=>o.createElement("section",{className:"todo-panel-date-section",key:`${f.kind}:${f.key}`},o.createElement("div",{className:"todo-panel-date-head"},mp(f.kind,f.key,l,p,u)),o.createElement(yd,{todos:f.todos,groups:t,compact:r,c:n})))}function fp(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function tn(e,t,r){let n=fp(e,t);return r?n:n.filter(a=>!kt.includes(a))}function ya(){let[e,t]=ot(),[r]=qe(),n=Ve(),a=n.map(l=>l.id),i=tn(e,a,r),s=l=>{let p=i.includes(l)?i.filter(u=>u!==l):a.filter(u=>i.includes(u)||u===l);p.length&&(Ot(p.some(u=>kt.includes(u))),t(p.length===a.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":i.length===a.length,onClick:()=>{Ot(!0),t("all")}},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},i.length===a.length?"\u2713":""),o.createElement("span",null,d("todo.chip.all"))),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=i.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>s(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(ke,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,d(l.labelKey)))}))}function vd({filter:e,className:t=""}){let[r]=qe(),n=Ve(),a=n.map(l=>l.id),i=tn(e,a,r),s=e==="all"&&r?d("todo.chip.all"):i.length===1?d(n.find(l=>l.id===i[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:i.length});return o.createElement("button",{type:"button",className:"todo-status-filter-select "+t,"aria-label":d("todo.filters.statuses"),onClick:l=>{m.ui.openPopover(()=>o.createElement(ya,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.filters.statuses")})}},o.createElement("span",null,s),o.createElement(Zt,null))}function on(e){return e==="flagged"?o.createElement(Ce,null):e==="priority"?o.createElement(Ao,null):e==="due"?o.createElement(Eo,null):e==="updated"?o.createElement(ds,null):e==="created"?o.createElement(ls,null):o.createElement(cs,null)}function gp(){let[e]=qe(),[t,r]=ot(),a=Ve().map(s=>s.id),i=s=>{if(t!=="all"){let l=t.filter(c=>a.includes(c)),p=s?a.filter(c=>l.includes(c)||c==="completed"):l.filter(c=>!kt.includes(c)),u=p.length?p:a.filter(c=>!kt.includes(c));r(u.length===a.length?"all":u)}Ot(s)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${e?"":" active"}`,"aria-pressed":!e,onClick:()=>i(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${e?" active":""}`,"aria-pressed":e,onClick:()=>i(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-filter-control-row status"},o.createElement("span",null,d("todo.filters.statuses")),o.createElement(vd,{filter:t})))}function wa({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[a,i]=o.useState(e),[s,l]=o.useState(r),p=Object.entries(vo);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(So,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement(To,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([u,c])=>o.createElement("button",{key:u,type:"button",className:`todo-sort-option${a===u?" active":""}`,"aria-pressed":a===u,onClick:()=>{i(u),t(u)}},on(u),o.createElement("span",null,d(c))))))}function Oo({todos:e,groups:t,names:r,hasUngrouped:n,selected:a,includeUngrouped:i,onChange:s,onOpenSettings:l,embedded:p=!1}){let[u,c]=o.useState(a),[f,y]=o.useState(i),b=p?a:u,A=p?i:f,L=b.length===r.length&&(!n||A),P=[...r.map(w=>b.some(z=>z.toLowerCase()===w.toLowerCase())),...n?[A]:[]],N=(w,z)=>w?` active${P[z-1]?"":" selection-run-start"}${P[z+1]?"":" selection-run-end"}`:"",g=(w,z)=>{c(w),y(z),s(w,z)},x=w=>{let z=e.filter(j=>w===null?!j.group:ee(j.group??"")===ee(w)),O=w??d("todo.chip.noGroup"),V=w===null?A:b.some(j=>ee(j)===ee(w));return o.createElement("div",{className:"todo-group-filter-item",key:w??"ungrouped"},o.createElement("div",{className:"props-info-row"},o.createElement("dt",{className:"props-info-key"},w&&o.createElement("span",{className:"props-info-dot",style:{background:De(Ne(w,t))}}),O),o.createElement("dd",{className:"props-info-value props-info-filter-value"},o.createElement("span",null,z.length),o.createElement(m.ui.settings.Toggle,{label:O,checked:V,onChange:()=>g(w===null?b:V?b.filter(j=>ee(j)!==ee(w)):[...b,w],w===null?!A:A)}))))};return p?o.createElement("div",{className:"props-info"},o.createElement("div",{className:"props-info-actions"},o.createElement("button",{type:"button",onClick:l},d("todo.properties.manageGroups")),(r.length>0||n)&&o.createElement("button",{type:"button",onClick:()=>g(L?[]:r,L?!1:n)},d(L?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("dl",{className:"props-info-table"},r.map(w=>x(w)),n&&x(null))):o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>g(L?[]:r,L?!1:n)},d(L?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((w,z)=>{let O=P[z];return o.createElement("button",{key:w,type:"button",className:`todo-group-filter-row${N(O,z)}`,"aria-pressed":O,onClick:()=>g(O?u.filter(V=>V.toLowerCase()!==w.toLowerCase()):[...u,w],f)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},O?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:De(Ne(w,t))}}),o.createElement("span",{className:"todo-tree-label"},w),o.createElement("span",{className:"todo-tree-count"},Pr(e,w)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${N(f,r.length)}`,"aria-pressed":f,onClick:()=>g(u,!f)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},f?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Pr(e,null)))))}var xd={scheduled:()=>o.createElement(Eo,null),today:()=>o.createElement(Do,null),flagged:()=>o.createElement(Ce,null),all:()=>o.createElement(Er,null),completed:()=>o.createElement(tt,null)},hp=()=>{let{activePluginTab:e,dateFormat:t}=mt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=Br(),a=Ge(),i=Lt(),[s,l]=o.useState(""),[p,u]=o.useState(""),[c,f]=o.useState(""),[y,b]=o.useState({}),[A,L]=o.useState(!1),[P,N]=o.useState(!1),{DateField:g,TimeField:x}=m.ui.settings,[w,z]=o.useState(!1),[O,V]=Gr(),[j]=qe(),[G,te]=_r("todo"),{sortField:oe,sortDir:ae,compact:de}=G,[k,E]=ot(),F=Ve(),Z=Fr(),T=Rs(),D=o.useMemo(()=>Is(T),[T]),X=e?.pluginId===m.pluginId,J=o.useRef(null),h=o.useRef(null),_=o.useRef(null),I=to(oe,ae,"left_sidebar");zt(I.openDetail);let v=xe(new Date),C=o.useMemo(()=>Ns(I.todos,v),[I.todos,v]),M=o.useMemo(()=>ye(a),[a]),q=o.useMemo(()=>I.todos.some(S=>!S.group),[I.todos]),Q=i.kind==="groups"?i.names:M,Y=i.kind==="groups"?i.includeUngrouped===!0:q,Se=Q.length===M.length&&(!q||Y),fe=o.useMemo(()=>{let S=I.ordered.filter(R=>Nr(R,i,j,v));if(k!=="all"&&(S=S.filter(R=>jt(R,k))),O.trim()){let R=Ct(O);S=S.filter(re=>R(re.tags??[],re.title,re.note,re.group??""))}return n?S=S.filter(R=>{let re=R.dueDate?.slice(0,10);return!!re&&re>=n.start&&re<=n.end}):r&&(S=S.filter(R=>R.dueDate?.slice(0,10)===r)),S},[I.ordered,i,j,k,O,r,n,v]),B=i.kind==="groups"&&i.names.length===1&&!i.includeUngrouped?i.names[0]:void 0,ue=async()=>{if(I.creating)return;let S=Bi(s,v),R=S.title;if(!R){$e();return}let re=B;if(i.kind==="groups"&&i.names.length+(i.includeUngrouped?1:0)>1){let Ue=await m.ui.openMenu([...i.names.map((no,Ro)=>({id:`group:${Ro}`,label:no})),...i.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:J.current??_.current,align:"start"});if(Ue===null)return;re=Ue.startsWith("group:")?i.names[Number(Ue.slice(6))]:void 0}N(!1);let _e={note:p.trim(),tags:[...new Set([...y.tags??[],...c.split(/[\s,]+/).map(Ue=>Ue.replace(/^#+/,"")).filter(Boolean)])],priority:S.priority,...re?{group:re}:{}};i.kind==="smart"&&i.id==="today"&&(_e.dueDate=v),i.kind==="smart"&&i.id==="flagged"&&(_e.flagged=!0),Object.assign(_e,{...y,tags:_e.tags}),S.dueDate&&(_e.dueDate=S.dueDate),await I.create(R,void 0,{patch:_e})?(N(!1),l(""),u(""),f(""),b({}),L(!1),J.current?.focus()):N(!0)},Ye=()=>{z(!0),window.setTimeout(()=>J.current?.focus(),0)},$e=()=>{l(""),z(!1),u(""),f(""),b({}),L(!1),N(!1)},Ze=Ee(),zo=o.useSyncExternalStore(Ze.subscribe,Ze.get,Ze.get);o.useEffect(()=>{zo?.mode==="create"&&(z(!0),Ze.clear())},[zo,Ze]),o.useEffect(()=>{w&&!I.creating&&J.current?.focus()},[w,X,I.creating]),o.useLayoutEffect(()=>{h.current&&(h.current.style.height="auto",h.current.style.height=`${h.current.scrollHeight}px`)},[p,w]);let an=w&&o.createElement("form",{className:"todo-compose",onSubmit:S=>{S.preventDefault(),ue()},onKeyDown:S=>{S.key==="Escape"&&!S.defaultPrevented&&!I.creating&&(S.preventDefault(),$e())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:J,className:"todo-compose-title",value:s,onChange:S=>l(S.target.value),placeholder:B?d("todo.newTodoIn",{p0:B}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:I.creating}),o.createElement("textarea",{ref:h,className:"todo-compose-note",rows:1,value:p,onChange:S=>u(S.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:I.creating}),o.createElement("div",{className:"todo-compose-tags"},(y.tags??[]).map(S=>o.createElement("span",{className:"todo-compose-token",key:S},o.createElement("span",null,"#",S),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:S}),disabled:I.creating,onClick:()=>b(R=>({...R,tags:R.tags?.filter(re=>re!==S)}))},o.createElement(me,null)))),o.createElement("input",{value:c,onChange:S=>{let R=S.target.value;if(!("isComposing"in S.nativeEvent&&S.nativeEvent.isComposing)&&/[\s,]/.test(R)){let re=R.split(/[\s,]+/),_e=re.pop()??"";b(ht=>({...ht,tags:[...new Set([...ht.tags??[],...re.map(Ue=>Ue.replace(/^#+/,"")).filter(Boolean)])]})),f(_e)}else f(R)},onKeyDown:S=>{S.nativeEvent.isComposing||(S.key==="Enter"&&c.trim()&&(S.preventDefault(),b(R=>({...R,tags:[...new Set([...R.tags??[],c.trim().replace(/^#+/,"")].filter(Boolean))]})),f("")),S.key==="Backspace"&&!c&&b(R=>({...R,tags:R.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:I.creating})),o.createElement("div",{className:"todo-compose-schedule"},o.createElement(g,{className:"todo-compose-date-field",value:y.dueDate??(i.kind==="smart"&&i.id==="today"?v:""),onChange:S=>b(R=>({...R,dueDate:S})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:I.creating}),o.createElement(x,{className:"todo-compose-time-field",value:y.startTime??"",onChange:S=>b(R=>({...R,startTime:S||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:I.creating})),o.createElement("div",{className:"todo-compose-location"},o.createElement(Cr,{value:y.location,disabled:I.creating,onChange:S=>b(R=>({...R,location:S}))})),o.createElement("div",{className:"todo-compose-attachments"},(y.attachments??[]).map(S=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:S,title:S},o.createElement(ut,null),o.createElement("span",null,S.split("/").pop()),o.createElement("button",{type:"button",disabled:I.creating,"aria-label":`${d("todo.removeAttachment")}: ${S}`,onClick:()=>b(R=>({...R,attachments:R.attachments?.filter(re=>re!==S)}))},o.createElement(me,null)))),A?o.createElement(m.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:I.creating,onChange:S=>{S&&(b(R=>({...R,attachments:[...new Set([...R.attachments??[],S])]})),L(!1))}}):o.createElement("button",{type:"button",className:"todo-compose-attach","aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),disabled:I.creating,onClick:()=>L(!0)},y.attachments?.length?o.createElement(Ke,null):o.createElement(o.Fragment,null,o.createElement(ut,null),o.createElement("span",null,d("todo.addAttachment"))))),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-priority",disabled:I.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async S=>{let R=await m.ui.openMenu(Re.map(re=>({id:re.id,label:d(re.labelKey),checked:re.id===(y.priority??"normal")})),{anchor:S.currentTarget,align:"start"});R&&b(re=>({...re,priority:R}))}},o.createElement(Ao,null),o.createElement("span",null,y.priority&&y.priority!=="normal"?d(`todo.priority.${y.priority}`):d("todo.field.priority"))),o.createElement("button",{type:"button",className:"todo-compose-chip",onClick:()=>b(S=>({...S,flagged:!(S.flagged??(i.kind==="smart"&&i.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":y.flagged??(i.kind==="smart"&&i.id==="flagged"),disabled:I.creating},o.createElement(Ce,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!s.trim()||I.creating},d("todo.group.add"))),P&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:$e,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:I.creating},o.createElement(me,null))),zd=S=>{m.ui.openPopover(()=>o.createElement(gp,null),{anchor:S,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},Rd=S=>{m.ui.openPopover(()=>o.createElement(wa,{sortField:oe,setSortField:R=>te({sortField:R}),sortDir:ae,setSortDir:R=>te({sortDir:R})}),{anchor:S,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},$d=S=>{m.ui.openPopover(({close:R})=>o.createElement(Oo,{todos:I.todos,groups:a,names:M,hasUngrouped:q,selected:Q,includeUngrouped:Y,onChange:(re,_e)=>Me(re.length===M.length&&(!q||_e)?Te:{kind:"groups",names:re,includeUngrouped:_e}),onOpenSettings:()=>{R(),gt()}}),{anchor:S,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},jd=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},sn=(S,R,re,_e,ht,Ue,no)=>{let Ro=Lr(i,R),Pa=R.kind==="groups"&&R.names.length===1&&!R.includeUngrouped&&i.kind==="groups"?i.names.some(Kd=>ee(Kd)===ee(R.names[0])):Ro;return o.createElement("button",{key:We(R),type:"button",className:`todo-tree-row${ht?" nested":""}${Ue?` todo-${Ue}-chip`:""}${Pa?" active":""}`,"aria-current":Ro?"true":void 0,"aria-pressed":R.kind==="groups"?Pa:void 0,style:no?{"--todo-chip-color":De(no),"--todo-chip-on":ai(no)}:void 0,onClick:()=>Me(R)},_e&&o.createElement("span",{className:"todo-tree-icon"},_e),ht&&o.createElement("span",{className:"todo-tree-dot",style:{background:De(ht)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},S),o.createElement("span",{className:"todo-tree-count"},re))},Gd=!!(O||r||n||k!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),Ca=n?`${Fe(n.start,t)} \u2013 ${Fe(n.end,t)}`:r?Fe(r,t):null,Ia=k==="all"?null:`${d("auto.bae7d5be7082")}: ${k.length===1?d(F.find(S=>S.id===k[0])?.labelKey??"todo.chip.all"):d("todo.filters.statusCount",{count:k.length})}`,Na=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!X&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${Se?"":" active"}`,"aria-label":d("todo.view.groups"),title:d("todo.view.groups"),type:"button",onClick:S=>$d(S.currentTarget)},o.createElement(Xt,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${j||k!=="all"?" active":""}`,"aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),type:"button",onClick:S=>zd(S.currentTarget)},o.createElement(tt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":de,title:de?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>te({compact:!de})},de?o.createElement(vr,null):o.createElement(xr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${ae==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(vo[oe])}`,type:"button",onClick:S=>Rd(S.currentTarget)},ae==="asc"?o.createElement(To,null):o.createElement(So,null),on(oe))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:()=>m.workspace.openMainTab()}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(yr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:O,onChange:S=>V(S.target.value),onKeyDown:S=>{S.key==="Escape"&&V("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),O&&o.createElement("button",{className:"search-field-action",onClick:()=>V(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(me,null)))),X?o.createElement("div",{className:"todo-tree todo-active-navigation"},an,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},D.map(S=>sn(d(S.labelKey),{kind:"smart",id:S.id},C[S.id],xd[S.id](),void 0,"smart",S.color))),o.createElement("div",{className:"todo-navigation-groups"},o.createElement("div",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),M.map(S=>sn(S,{kind:"groups",names:[S]},Pr(I.todos,S),void 0,Ne(S,a))))):o.createElement(o.Fragment,null,!O&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},Ca?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:jd},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Do,null)),o.createElement("span",{className:"todo-tree-label"},Ca),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(me,null))):D.map(S=>sn(d(S.labelKey),{kind:"smart",id:S.id},C[S.id],xd[S.id](),void 0,"smart",S.color))),Ia&&o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-status-chip active",onClick:()=>E("all")},o.createElement("span",{className:"todo-tree-label"},Ia),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(me,null)))),o.createElement("div",{className:"todo-list"},an,I.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):fe.length?o.createElement(en,{todos:fe,groups:a,compact:de,controller:I,mode:Z,weekStart:m.getState().weekStart,timeline:i.kind==="smart"&&i.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,Gd)))),!w&&o.createElement("button",{ref:_,className:"todo-fab",type:"button","aria-label":Na,title:Na,disabled:I.creating,onClick:Ye},o.createElement(Ke,null)),o.createElement(oo,{c:I}))},kd=()=>o.createElement(hp,null);function bp({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let a=Ve(),[i,s]=o.useState(e),[l,p]=o.useState(r),u=a.map(b=>b.id),c=l==="all"?u:l,f=b=>{s(b),t(b)},y=b=>{let A=c.includes(b)?c.filter(P=>P!==b):u.filter(P=>c.includes(P)||P===b);if(!A.length)return;let L=A.length===u.length?"all":A;p(L),n(L)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${i?"":" active"}`,onClick:()=>f(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${i?" active":""}`,onClick:()=>f(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},a.map(b=>o.createElement("button",{key:b.id,type:"button",className:"todo-status-filter-option","aria-pressed":c.includes(b.id),onClick:()=>y(b.id)},o.createElement("span",{className:"todo-status-filter-check"},c.includes(b.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(ke,{status:b.id==="open"?null:b.id,dotCls:b.cls})),o.createElement("span",null,d(b.labelKey))))))}var Td=()=>{let{activePath:e,weekStart:t}=mt("activePath","weekStart"),r=bt(e)??"",n=Ge(),a=Fr(),[i,s]=_r("attachment"),{showCompleted:l,statusFilter:p,compact:u,sortField:c,sortDir:f,groupNames:y,includeUngrouped:b}=i,A=G=>s({showCompleted:G}),L=G=>s({statusFilter:G}),P=G=>s({sortField:G}),N=G=>s({sortDir:G}),g=to(c,f,"right_sidebar");zt(g.openDetail);let x=o.useMemo(()=>ye(n),[n]),w=o.useMemo(()=>g.todos.some(G=>!G.group),[g.todos]),z=o.useMemo(()=>g.ordered.filter(G=>!(bt(G.filePath)===r||(G.attachments??[]).some(oe=>bt(oe)===r))||!l&&G.completed||(y.length||b)&&(!G.group&&!b||G.group&&!new Set(y.map(ee)).has(ee(G.group)))?!1:jt(G,p)),[g.ordered,r,l,p,y,b]),O=G=>{m.ui.openPopover(({close:te})=>o.createElement(Oo,{todos:g.todos,groups:n,names:x,hasUngrouped:w,selected:y,includeUngrouped:b,onChange:(oe,ae)=>s({groupNames:oe,includeUngrouped:ae}),onOpenSettings:()=>{te(),gt()}}),{anchor:G,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},V=G=>{m.ui.openPopover(()=>o.createElement(bp,{showCompleted:l,setShowCompleted:A,filter:p,setFilter:L}),{anchor:G,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},j=G=>{m.ui.openPopover(()=>o.createElement(wa,{sortField:c,setSortField:P,sortDir:f,setSortDir:N}),{anchor:G,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${y.length||b?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:G=>O(G.currentTarget)},o.createElement(Xt,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:G=>V(G.currentTarget)},o.createElement(tt,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":u,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!u})},u?o.createElement(vr,null):o.createElement(xr,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${f==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(vo[c])}`,onClick:G=>j(G.currentTarget)},f==="asc"?o.createElement(To,null):o.createElement(So,null),on(c)))),o.createElement("div",{className:"todo-list"},g.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?z.length?o.createElement(en,{todos:z,groups:n,compact:u,controller:g,mode:a,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(oo,{c:g}))};var xa=[{id:"group",labelKey:"todo.table.group"},{id:"status",labelKey:"todo.table.status"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"tags",labelKey:"todo.table.tags"}],yp=["group","status","priority","due"],ka=[10,20,30,40,50],rn=Re.map(e=>e.id).reverse();function wp(e){return Array.isArray(e)?xa.map(t=>t.id).filter(t=>e.includes(t)):yp}function vp(e){return Array.isArray(e)?rn.filter(t=>e.includes(t)):[]}function xp(e){return ka.includes(e)?e:ka[0]}function Sa(e,t){let[r,n]=o.useState(()=>t(m.settings.get()[e]));o.useEffect(()=>m.settings.subscribe(()=>n(t(m.settings.get()[e]))),[e,t]);let a=o.useCallback(i=>{n(i),m.settings.set(e,i)},[e]);return[r,a]}var Ad=()=>Sa("pageColumns",wp),nn=()=>Sa("pagePriorityFilter",vp),Ta=({priority:e})=>o.createElement(e==="high"?Wn:e==="medium"?vs:e==="low"?qn:Ds,{className:`todo-table-priority-icon todo-priority-${e}`});function Ed({label:e,badges:t,onOpen:r}){return o.createElement("button",{type:"button",className:`todo-facet-btn${t.length?" active":""}`,"aria-label":e,title:e,onClick:n=>r(n.currentTarget)},o.createElement(As,null),o.createElement("span",null,e),t.length>0&&o.createElement("span",{className:"todo-facet-sep","aria-hidden":"true"}),t.map(n=>o.createElement("span",{key:n,className:"todo-facet-badge"},n)))}function Dd(){let[e]=ot(),[t]=qe(),n=Ve().map(s=>s.id),a=tn(e,n,t),i=e==="all"||a.length===n.length?[]:a.length>2?[d("todo.filters.statusCount",{count:a.length})]:a.map(s=>Je(s));return o.createElement(Ed,{label:d("todo.table.status"),badges:i,onOpen:s=>{m.ui.openPopover(()=>o.createElement(ya,null),{anchor:s,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.filters.statuses")})}})}function kp(){let[e,t]=nn();return o.createElement("div",{className:"todo-status-filter-menu"},rn.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(a=>a!==r):rn.filter(a=>e.includes(a)||a===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ta,{priority:r})),o.createElement("span",null,Tt(r)))}),e.length>0&&o.createElement("div",{className:"todo-filter-divider"}),e.length>0&&o.createElement("button",{type:"button",className:"todo-status-filter-option todo-filter-clear",onClick:()=>t([])},d("todo.table.clearFilter")))}function Cd(){let[e]=nn(),t=e.length>2?[d("todo.table.selectedCount",{count:e.length})]:e.map(r=>Tt(r));return o.createElement(Ed,{label:d("todo.table.priority"),badges:t,onOpen:r=>{m.ui.openPopover(()=>o.createElement(kp,null),{anchor:r,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.table.priority")})}})}function Tp(){let[e,t]=Ad();return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),xa.map(r=>{let n=e.includes(r.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option all","aria-pressed":n,key:r.id,onClick:()=>t(n?e.filter(a=>a!==r.id):xa.map(a=>a.id).filter(a=>e.includes(a)||a===r.id))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",null,d(r.labelKey)))}))}function Id(){return o.createElement("button",{type:"button",className:"todo-view-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{m.ui.openPopover(()=>o.createElement(Tp,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover",ariaLabel:d("todo.table.toggleColumns")})}},o.createElement(Es,null),o.createElement("span",null,d("todo.table.view")))}function va({field:e,label:t,className:r,sort:n,onSort:a}){let i=n.field===e,s=i?n.dir==="asc"?Wn:qn:Bn;return o.createElement("th",{className:r,"aria-sort":i?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${i?" active":""}`,onClick:()=>a(i?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(s,null)))}var Sd='input, button, a, textarea, [contenteditable="true"]';function Sp({todo:e,groups:t,columns:r,c:n,selected:a,onSelect:i}){let s=o.useRef(null);o.useEffect(()=>s.current?qo(e.id,s.current):void 0,[e.id]);let l=o.useRef(null);o.useEffect(()=>()=>{l.current&&clearTimeout(l.current)},[]);let[p,u]=o.useState("");o.useEffect(()=>{let x=!0;return u(""),Yr(e.title).then(w=>{x&&u(w)}).catch(()=>{x&&u("")}),()=>{x=!1}},[e.title]);let c=Le(e),f=Pe(c),y=n.pendingIds.has(e.id),b=x=>n.patchTodo(e.id,x),A=()=>{Hr(e)||n.openDetail(e.id)},L=xe(new Date),P=m.getState().dateFormat,N=e.dueDate?pr(e.dueDate,L,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},m.ui.language(),P):"",g=!!e.dueDate&&!e.completed&&e.dueDate.slice(0,10)<L;return o.createElement("tr",{ref:s,className:`todo-table-row${e.completed?" completed":""}${a?" selected":""}`,"data-todo-id":e.id,"aria-selected":a,tabIndex:0,onKeyDown:x=>{x.target===x.currentTarget&&(x.key==="ArrowDown"||x.key==="ArrowUp"?(x.preventDefault(),(x.key==="ArrowDown"?x.currentTarget.nextElementSibling:x.currentTarget.previousElementSibling)?.focus()):x.key==="Enter"?(x.preventDefault(),n.openDetail(e.id)):x.key===" "?(x.preventDefault(),i(!a)):x.key==="Escape"&&x.currentTarget.blur())},onClick:x=>{x.target.closest(Sd)||x.detail>1||(l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{l.current=null,A()},220))},onDoubleClick:x=>{l.current&&(clearTimeout(l.current),l.current=null),!x.target.closest(Sd)&&n.openDetail(e.id)}},o.createElement("td",{className:"todo-table-select"},o.createElement("input",{type:"checkbox",className:"todo-table-checkbox",checked:a,onChange:x=>i(x.target.checked),"aria-label":d("todo.table.selectRow",{title:e.title})})),o.createElement("td",{className:"todo-table-title"},o.createElement("div",{className:"todo-table-title-inner"},r.includes("group")&&e.group&&o.createElement("span",{className:"todo-table-badge",style:{"--todo-badge-color":De(Ne(e.group,t))}},e.group),p?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:p}}):o.createElement("span",{className:"todo-table-title-text"},e.title),r.includes("tags")&&e.tags?.map(x=>o.createElement("span",{key:x,className:"todo-table-tag"},"#",x)),e.flagged&&o.createElement("span",{className:"todo-table-flag",title:d("todo.flagged")},o.createElement(Ce,null)))),r.includes("status")&&o.createElement("td",{className:"todo-table-status"},o.createElement("button",{type:"button",className:"todo-table-cell-btn",disabled:y,title:d("todo.table.status"),onClick:x=>Qr(x.currentTarget,e,b)},o.createElement(ke,{status:c==="open"?null:c,dotCls:f.cls}),o.createElement("span",null,Je(c)))),r.includes("priority")&&o.createElement("td",{className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${e.priority==="normal"?" muted":""}`,disabled:y,title:d("todo.table.priority"),onClick:x=>{m.ui.openMenu(rn.map(w=>({label:Tt(w),icon:o.createElement(Ta,{priority:w}),type:"radio",checked:e.priority===w,onSelect:()=>b({priority:w})})),{anchor:x.currentTarget})}},o.createElement(Ta,{priority:e.priority}),o.createElement("span",null,Tt(e.priority)))),r.includes("due")&&o.createElement("td",{className:"todo-table-due"},N?o.createElement("button",{type:"button",className:`todo-table-cell-btn${g?" is-overdue":""}`,title:d("todo.openInCalendar",{p0:Fe(e.dueDate,P)}),onClick:A},o.createElement("span",null,N),e.startTime&&o.createElement("span",{className:"todo-table-time"},e.startTime)):o.createElement("span",{className:"todo-table-none","aria-hidden":"true"},"\u2014")),o.createElement("td",{className:"todo-table-actions"},o.createElement(Xr,{todo:e,groupNames:ye(t),openId:n.menuId,setOpenId:n.setMenuId,onEdit:()=>n.openDetail(e.id),onPatch:b,onRequestDelete:()=>Dt(e,n.removeTodo),disabled:y})))}function Nd({todos:e,groups:t,c:r,sort:n,onSort:a,resetKey:i,empty:s}){let[l]=Ad(),[p,u]=Sa("pageRowsPerPage",xp),[c,f]=o.useState(0),[y,b]=o.useState(i);y!==i&&(b(i),f(0));let[A,L]=o.useState(()=>new Set),P=o.useRef(null),N=Math.max(1,Math.ceil(e.length/p)),g=Math.min(c,N-1),x=e.slice(g*p,(g+1)*p),w=o.useMemo(()=>e.filter(k=>A.has(k.id)),[e,A]),z=x.filter(k=>A.has(k.id)).length,O=x.length>0&&z===x.length;o.useEffect(()=>{P.current&&(P.current.indeterminate=z>0&&!O)},[z,O]);let V=Ee(),j=o.useSyncExternalStore(V.subscribe,V.get,V.get),G=o.useCallback(k=>{let E=e.findIndex(F=>F.id===k);E>=0&&f(Math.floor(E/p))},[e,p]);o.useLayoutEffect(()=>{j?.todoId&&G(j.todoId)},[j,G]),o.useLayoutEffect(()=>{r.editingId&&G(r.editingId)},[r.editingId]);let te=(k,E)=>{L(F=>{let Z=new Set(F);for(let T of k)E?Z.add(T):Z.delete(T);return Z})},oe=()=>{for(let k of w)r.patchTodo(k.id,be("completed"));L(new Set)},ae=async()=>{let k=w.map(F=>F.id);await m.ui.confirm({title:d("todo.table.deleteTitle",{count:k.length}),message:d("todo.table.deleteMessage",{count:k.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(k.map(F=>r.removeTodo(F))),L(new Set))},de=3+l.filter(k=>k==="status"||k==="priority"||k==="due").length;return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll"},o.createElement("table",{className:"todo-table"},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement("input",{ref:P,type:"checkbox",className:"todo-table-checkbox",checked:O,disabled:!x.length,onChange:k=>te(x.map(E=>E.id),k.target.checked),"aria-label":d("todo.table.selectAll")})),o.createElement(va,{field:"name",label:d("todo.table.title"),className:"todo-table-title",sort:n,onSort:a}),l.includes("status")&&o.createElement("th",{className:"todo-table-status"},o.createElement("span",{className:"todo-table-th"},d("todo.table.status"))),l.includes("priority")&&o.createElement(va,{field:"priority",label:d("todo.table.priority"),className:"todo-table-priority",sort:n,onSort:a}),l.includes("due")&&o.createElement(va,{field:"due",label:d("todo.table.due"),className:"todo-table-due",sort:n,onSort:a}),o.createElement("th",{className:"todo-table-actions"}))),o.createElement("tbody",null,x.length?x.map(k=>o.createElement(Sp,{key:k.id,todo:k,groups:t,columns:l,c:r,selected:A.has(k.id),onSelect:E=>te([k.id],E)})):o.createElement("tr",{className:"todo-table-empty-row"},o.createElement("td",{colSpan:de,className:"todo-table-empty"},s))))),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,d("todo.table.selected",{count:w.length,total:e.length})),w.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:oe},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{ae()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:k=>{m.ui.openMenu(ka.map(E=>({label:String(E),type:"radio",checked:E===p,onSelect:()=>{u(E),f(0)}})),{anchor:k.currentTarget,align:"start"})}},o.createElement("span",null,p),o.createElement(Bn,null)),o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:g+1,pages:N})),o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:g===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>f(0)},o.createElement(Ts,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:g===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>f(g-1)},o.createElement(xs,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:g>=N-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>f(g+1)},o.createElement(ks,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:g>=N-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>f(N-1)},o.createElement(Ss,null))))))}var Pd=({navigation:e})=>{let{dateFormat:t}=mt("dateFormat"),{selectedDate:r,selectedDateRange:n}=Br(),a=Ge(),i=Lt(),s=jr();o.useEffect(()=>(e.setController({canGoBack:s.canGoBack,canGoForward:s.canGoForward,goBack:()=>eo(-1),goForward:()=>eo(1)}),()=>e.setController(null)),[e,s.canGoBack,s.canGoForward]);let[l,p]=Gr(),[u,c]=Ks(),{field:f,dir:y}=u,[b]=qe(),[A,L]=ot(),[P,N]=nn(),g=to("due","asc");zt(g.openDetail),o.useEffect(()=>{if(!g.loading)if(i.kind==="groups"){let E=new Set(ye(a));!i.includeUngrouped&&!i.names.some(F=>E.has(F))&&Me(Te)}else i.kind==="tag"&&(g.todos.some(E=>E.tags?.includes(i.name))||Me(Te))},[g.loading,g.todos,a,i]);let x=Be(),w=i.kind==="smart"?pt(i.id):null,z=i.kind==="groups"?i.names.length===1&&!i.includeUngrouped?i.names[0]:d("todo.view.selectedGroups",{count:i.names.length+(i.includeUngrouped?1:0)}):i.kind==="tag"?`#${i.name}`:i.kind==="nogroup"?d("todo.chip.noGroup"):d(w.labelKey),O=i.kind==="groups"?i.names.length===1&&!i.includeUngrouped?De(Ne(i.names[0],a)):"var(--accent-color)":i.kind==="tag"?"var(--accent-color)":i.kind==="nogroup"?"var(--text-color)":De(w.color)||"var(--text-color)",V=o.useMemo(()=>{let E=g.todos.filter(F=>Nr(F,i,b,x));if(A!=="all"&&(E=E.filter(F=>jt(F,A))),P.length&&(E=E.filter(F=>P.includes(F.priority))),l.trim()){let F=Ct(l);E=E.filter(Z=>F(Z.tags??[],Z.title,Z.note,Z.group??""))}return n?E=E.filter(F=>{let Z=F.dueDate?.slice(0,10);return!!Z&&Z>=n.start&&Z<=n.end}):r&&(E=E.filter(F=>F.dueDate?.slice(0,10)===r)),E},[g.todos,i,b,A,P,l,r,n,x]),j=o.useMemo(()=>{if(f!=="auto")return Wt(V,f,y);if(i.kind==="smart"&&i.id==="completed")return Hi(V).flatMap(F=>F.todos);let E=fr(V,x);return mr.flatMap(F=>E[F])},[V,f,y,i,x]),G=!!l.trim()||P.length>0||A!=="all",te=()=>{p(""),N([]),L("all")},oe=[We(i),l,JSON.stringify(A),P.join(),b,f,y,r??"",n?.start??"",n?.end??""].join("|"),ae=()=>{m.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},de=ye(a),k=[{label:d("todo.fab.newTodo"),icon:o.createElement(Ke,null),onSelect:Yo},...de.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(kr,null),submenu:de.map(E=>({label:E,onSelect:()=>{Me({kind:"groups",names:[E]}),Yo()}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(Xt,null),onSelect:()=>{gt()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(Nt,null),onSelect:()=>{navigator.clipboard.writeText(m.workspace.buildOwnLink(Kr()))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(gs,null),onSelect:()=>m.workspace.openOwnSettings()}];return o.useEffect(()=>{la(k)}),o.useEffect(()=>()=>la(null),[]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:"todo-page-appbar"},o.createElement("h1",{className:"todo-page-appbar-title",style:{color:O}},z),o.createElement("div",{className:"todo-search-wrap search-field"},o.createElement(yr,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:l,onChange:E=>p(E.target.value),onKeyDown:E=>{E.key==="Escape"&&p("")},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")}),l&&o.createElement("button",{className:"search-field-action",type:"button",onClick:()=>p(""),"aria-label":d("auto.67300d0fed7c")},o.createElement(me,null))),o.createElement(Dd,null),o.createElement(Cd,null),G&&o.createElement("button",{type:"button",className:"todo-facet-reset",onClick:te},d("todo.table.reset"),o.createElement(me,null)),(n||r)&&o.createElement("button",{type:"button",className:"todo-facet-btn active",title:d("auto.f93fb4b1ab19"),onClick:ae},o.createElement("span",null,n?`${Fe(n.start,t)} \u2013 ${Fe(n.end,t)}`:Fe(r,t)),o.createElement(me,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement(Id,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:Yo},o.createElement(Ke,null)))),g.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(Nd,{todos:j,groups:a,c:g,sort:u,onSort:c,resetKey:oe,empty:d("todo.table.empty")}),o.createElement(oo,{c:g}))};var Ld={scheduled:()=>o.createElement(Eo,null),today:()=>o.createElement(Do,null),flagged:()=>o.createElement(Ce,null),all:()=>o.createElement(Er,null),completed:()=>o.createElement(tt,null)};function Ap(){let{Button:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Lo);o.useEffect(()=>m.settings.subscribe(()=>a(Lo())),[]);let i=c=>{a(c),zs(c)},s=n.order.filter(c=>!n.hidden.includes(c)),l=s.map(pt),p=r({items:l,indicatorOnly:!0,getId:c=>c.id,getLabel:c=>d(c.labelKey),onReorder:c=>{let f=c.map(b=>b.id),y=0;i({...n,order:n.order.map(b=>n.hidden.includes(b)?b:f[y++])})}}),u=c=>{if(s.length<=1)return;let f={...n,hidden:[...n.hidden,c]};i(f);let y=Pt();if(y.kind==="smart"&&y.id===c){let b=f.order.find(A=>!f.hidden.includes(A));Me({kind:"smart",id:b})}};return o.createElement(m.ui.settings.Section,{title:d("todo.settings.smartLists")},o.createElement("div",{className:"todo-smart-list-settings"},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.smartListsDesc")),l.map(c=>{let f=p.getHandleProps(c);return o.createElement("div",{className:"todo-smart-list-setting-row"+(p.overId===c.id?" drop-"+(p.dropPosition??"before"):""),key:c.id,...p.getItemProps(c)},o.createElement("button",{...f,className:(f.className??"")+" todo-status-setting-handle",title:d("todo.settings.smartListReorder")},o.createElement(wr,null)),o.createElement("span",{className:"todo-smart-list-setting-glyph"},Ld[c.id]()),o.createElement("span",{className:"todo-status-setting-name"},d(c.labelKey)),o.createElement(t,{onClick:()=>u(c.id),disabled:s.length<=1,ariaLabel:d("todo.settings.smartListHide",{p0:d(c.labelKey)}),title:d("todo.settings.smartListHide",{p0:d(c.labelKey)})},o.createElement(me,null)))}),n.hidden.length>0&&o.createElement("div",{className:"todo-smart-list-hidden"},o.createElement("span",{className:"todo-smart-list-hidden-title"},d("todo.settings.smartListsHidden")),n.hidden.map(c=>{let f=pt(c);return o.createElement("div",{className:"todo-smart-list-hidden-row",key:c},o.createElement("span",{className:"todo-smart-list-setting-glyph"},Ld[c]()),o.createElement("span",null,d(f.labelKey)),o.createElement(e,{onClick:()=>i({...n,hidden:n.hidden.filter(y=>y!==c)})},d("todo.settings.smartListRestore")))})),p.liveRegion))}function Ep(){let{ColorField:e,IconButton:t,useReorderDrag:r}=m.ui.settings,[n,a]=o.useState(Rt),[i,s]=o.useState(null);o.useEffect(()=>m.settings.subscribe(()=>a(Rt())),[]);let l=g=>{a(g),pi(g)},p=n.active.map(g=>Pe(g)),u=mo.filter(g=>!n.active.includes(g)).map(g=>Pe(g)),c=[...p,...u],f=r({items:c,indicatorOnly:!0,getId:g=>g.id,getLabel:g=>d(g.labelKey),onReorder:(g,x)=>{let w=n.active.includes(x.activeId),z=n.active.includes(x.overId);if(w&&z){let O=new Set(n.active);l({...n,active:g.filter(V=>O.has(V.id)).map(V=>V.id)})}else if(w)l({...n,active:n.active.filter(O=>O!==x.activeId)});else if(z){let O=[...n.active],V=O.indexOf(x.overId);O.splice(V+(x.position==="after"?1:0),0,x.activeId),l({...n,active:O})}}}),y=g=>{l({...n,active:n.active.filter(x=>x!==g)})},b=g=>{n.active.includes(g)||l({...n,active:[...n.active,g]})},A=(g,x)=>{if(!f.activeId)return;x.preventDefault(),x.dataTransfer.dropEffect="move";let w=x.target.closest(".todo-status-setting-row");s(w&&!w.classList.contains("locked")?null:g)},L=g=>{g.currentTarget.contains(g.relatedTarget)||s(null)},P=(g,x)=>{let w=x.target.closest(".todo-status-setting-row");if(w&&!w.classList.contains("locked"))return;let z=x.dataTransfer.getData("text/plain");mo.includes(z)&&(x.preventDefault(),g==="show"?b(z):y(z),f.cancel(),s(null))},N=[Pe("open"),Pe("completed")];return o.createElement(m.ui.settings.Section,{title:d("todo.settings.statuses")},o.createElement("div",{className:"todo-status-settings","data-drop-zone":i??void 0,onDragEndCapture:()=>s(null)},o.createElement("p",{className:"todo-status-settings-desc"},d("todo.settings.statusesDesc")),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesShow")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-show${i==="show"?" accepts-drop":""}`,onDragOver:g=>A("show",g),onDragLeave:L,onDrop:g=>P("show",g)},N.map(g=>o.createElement("div",{className:"todo-status-setting-row locked",key:g.id},o.createElement("span",{className:"todo-status-setting-handle",title:d("todo.settings.statusLocked")},o.createElement(as,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ke,{status:g.id==="open"?null:g.id,dotCls:g.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(g.labelKey)),o.createElement(e,{value:n.colors[g.id],onChange:x=>l({...n,colors:{...n.colors,[g.id]:x}}),ariaLabel:d("todo.settings.statusColor",{p0:d(g.labelKey)}),allowCustom:!1}),o.createElement("span",{className:"todo-status-setting-action","aria-hidden":"true"}))),p.map(g=>{let x=f.getHandleProps(g);return o.createElement("div",{className:"todo-status-setting-row"+(f.overId===g.id?" drop-"+(f.dropPosition??"before"):""),key:g.id,...f.getItemProps(g)},o.createElement("button",{...x,draggable:!0,className:(x.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:w=>{x.onDragStart?.(w),w.dataTransfer.setData("text/plain",g.id)}},o.createElement(wr,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ke,{status:g.id,dotCls:g.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(g.labelKey)),o.createElement(e,{value:n.colors[g.id],onChange:w=>l({...n,colors:{...n.colors,[g.id]:w}}),ariaLabel:d("todo.settings.statusColor",{p0:d(g.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>y(g.id),ariaLabel:d("todo.settings.statusHide",{p0:d(g.labelKey)}),title:d("todo.settings.statusHide",{p0:d(g.labelKey)})},o.createElement(me,null)))})),o.createElement("span",{className:"todo-status-visibility-title"},d("todo.settings.statusesHide")),o.createElement("div",{className:`todo-status-visibility-zone todo-status-hide${i==="hide"?" accepts-drop":""}`,onDragOver:g=>A("hide",g),onDragLeave:L,onDrop:g=>P("hide",g)},u.map(g=>{let x=f.getHandleProps(g);return o.createElement("div",{className:"todo-status-setting-row"+(f.overId===g.id?" drop-"+(f.dropPosition??"before"):""),key:g.id,...f.getItemProps(g)},o.createElement("button",{...x,draggable:!0,className:(x.className??"")+" todo-status-setting-handle",title:d("todo.settings.statusReorder"),onDragStart:w=>{x.onDragStart?.(w),w.dataTransfer.setData("text/plain",g.id)}},o.createElement(wr,null)),o.createElement("span",{className:"todo-status-setting-glyph"},o.createElement(ke,{status:g.id,dotCls:g.cls})),o.createElement("span",{className:"todo-status-setting-name"},d(g.labelKey)),o.createElement(e,{value:n.colors[g.id],onChange:w=>l({...n,colors:{...n.colors,[g.id]:w}}),ariaLabel:d("todo.settings.statusColor",{p0:d(g.labelKey)}),allowCustom:!1}),o.createElement(t,{className:"todo-status-setting-action",onClick:()=>b(g.id),ariaLabel:d("todo.settings.statusShow",{p0:d(g.labelKey)}),title:d("todo.settings.statusShow",{p0:d(g.labelKey)})},o.createElement(Ke,null)))}),!u.length&&o.createElement("span",{className:"todo-status-visibility-empty"},d("todo.settings.statusesHideEmpty"))),f.liveRegion))}function Od(){let{Button:e,Row:t,Section:r,SelectField:n}=m.ui.settings,[a,i]=o.useState(Or);return o.createElement(o.Fragment,null,o.createElement(r,{title:d("todo.settings.display")},o.createElement(t,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(n,{className:"todo-date-breakdown-select",value:a,onChange:s=>{let l=s;i(l),m.settings.set(ta,l)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(td,null),o.createElement(Ap,null),o.createElement(r,null,o.createElement(m.ui.settings.GroupsEditor,null)),o.createElement(Ep,null))}var Md="reminder:";function _d(){let e=ve();return m.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(Md))return;let a=n??t.slice(Md.length).split(":")[0];dt(e).then(i=>{e.assertActive();let s=i.find(l=>l.id===a);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var Aa=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ea=e=>({type:"string",description:e});async function Da(e,t,r,n){let a=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!a.ok)throw new Error(a.error.message);return a.value}function Fd(e){return gn([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Aa({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let a=(await Da(e,"list",{section:"",q:""},r)).filter(i=>i.completed!==!0&&i.status!=="completed");return a.length?a.map(i=>`- [${i.status||"open"}] ${i.title??""} (${i.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Aa({title:Ea("Task title"),due:Ea("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Da(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Aa({id:Ea("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Da(e,"complete",{query:n},r)).title||n}".`}}])}function Dp(e){Si(e);let t=ti(e),r=oi(),n=fi(),a=!1,i=e.backend.on("records.eventDeliveryFailed",()=>{a||(a=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{a=!1}))});Fs();let s=e.workspace.onOpenOwnLink(N=>{Ur(N)});e.registerView("todo.panel",kd),e.registerView("todo.file",Td),e.registerView("todo.page",Pd),e.registerView("todo.settings",Od);let l=Qi(e),p=Xs(e),u=e.interop.services.provide(hn,Fd(e)),c=ns(),f=Hs(),y=e.interop.services.subscribe(vt,()=>{}),b=e.interop.services.subscribe(vt,()=>{}),A=Ws(e),L=_d(),P=ji();return()=>{i(),t(),l(),p(),u(),c(),f(),y(),b(),A(),L(),P(),s(),n(),r()}}var Cp={register:Dp},n0=Cp;export{n0 as default,Dp as register};

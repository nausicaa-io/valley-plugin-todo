var Lt="valley";var hb=`.${Lt}`,bb=`app.${Lt}`;function jp(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var Vp=/^[a-zA-Z]:/;function ir(e){if(typeof e!="string")return"";let t=jp(e);return!t||t==="."||Vp.test(t)||t.split("/").some(r=>r==="..")?"":t}function Jt(e){if(typeof e=="string")return ir(e)||void 0}var xe=`.${Lt}`,Bp="plugins",dr=`${xe}/${Bp}`,Zr=`${dr}/packages`,vb=`${Zr}/core`,xb=`${Zr}/github`,Tb=`${Zr}/local`,kb=`${Zr}/community`,Sb=`${dr}/community.json`,Eb=`${dr}/data`;var Ab=`${dr}/enabled.json`,Cb=`${dr}/sources.json`,Db=`${xe}/state`,Ne=`${xe}/settings`,qi=`${xe}/data`,Za=`${xe}/recovery`;var Ja=`${xe}/accounts`,xo=`${xe}/ai`,Ib=`${xo}/connections.json`,Nb=`${xo}/defaults.json`,Pb=`${xo}/budgets.json`,Lb=`${xo}/usage.sqlite`,Ob=`${xo}/security/guards.json`,Mb=`${xo}/security/activity.sqlite`,_b=`${Ja}/providers`,Gb=`${Ja}/providers.lock.json`,Hp=`${xe}/trash`,Rb=`${Hp}/items`,Qa=`${xe}/cache`,zb=`${Qa}/accounts`,Wp=`${Qa}/search`,Fb=`${Qa}/providers`;var $b=`${Wp}/index.jsonl`,Ub=`${Za}/drafts`,Kb=`${Za}/transactions`,jb=`${Za}/retired`;var Ot="design",qp="themes",Yi=`${xe}/${Ot}/${qp}`,Vb=`${Yi}/local`,Bb=`${Yi}/community`;var Hb={app:`${Ne}/app.json`,appearance:`${xe}/${Ot}/appearance.json`,"icon-rail":`${xe}/${Ot}/icon-rail.json`,"footer-rail":`${xe}/${Ot}/footer-rail.json`,"plugin-startup":`${xe}/${Ot}/right-sidebar-startup.json`,"new-tab":`${xe}/${Ot}/new-tab.json`,pallette:`${xe}/${Ot}/palette.json`,group:`${qi}/groups.json`,units:`${qi}/units.json`,metadata:`${Ne}/file-viewers.json`,notification:`${Ne}/notification-types.json`,"notification-settings":`${Ne}/notification.json`,preferences:`${Ne}/preferences.json`,"link-actions":`${Ne}/link-actions.json`,markdown:`${Ne}/markdown.json`,editor:`${Ne}/editor.json`,"editor-vim":`${Ne}/editor-vim.json`,"markdown-todo":`${Ne}/markdown-todo.json`,"markdown-codeblocks":`${Ne}/markdown-codeblocks.json`,"markdown-template":`${Ne}/markdown-template.json`,"markdown-embeed":`${Ne}/markdown-embeed.json`,files:`${Ne}/file.json`,"file-sorter":`${Ne}/file-sorter.json`,search:`${Ne}/search.json`,"search-tag":`${Ne}/search-tag.json`,"search-content":`${Ne}/search-content.json`,design:`${xe}/${Ot}/appearance.json`,accounts:`${Ja}/connections.json`};var Xi=Lt,Zi="open";var Yp=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Ji=16384;var Qi=new Set(["__proto__","prototype","constructor"]);function ed(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function Jr(e){let t=new WeakSet,r=0,n=(a,i)=>{if(++r>8192||i>32)throw new Error("Bookmark state is too complex");if(a===null||typeof a=="boolean")return a;if(typeof a=="string"){if(ed(a)>Ji)throw new Error("Bookmark state is too large");return a}if(typeof a=="number")return Number.isFinite(a)?Object.is(a,-0)?0:a:void 0;if(!a||typeof a!="object"||t.has(a))return;let l=Array.isArray(a),p=Object.getPrototypeOf(a);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(a);try{let c=Reflect.ownKeys(a);if(c.length+r>8192||c.some(b=>typeof b=="string"&&Qi.has(b)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(a);if(l){let b=u.length?.value;if(!Number.isSafeInteger(b)||b>8192)throw new Error("Bookmark state is too complex");return Array.from({length:b},(h,w)=>{let k=u[String(w)];return k&&"value"in k?n(k.value,i+1)??null:null})}let m={};for(let b of Object.keys(u).sort()){if(Qi.has(b))throw new Error("Invalid bookmark state key");let h=u[b];if(!h.enumerable||!("value"in h)){r++;continue}let w=n(h.value,i+1);w!==void 0&&(m[b]=w)}return m}finally{t.delete(a)}}},s=n(e,0);if(!s||typeof s!="object"||Array.isArray(s))throw new Error("Invalid bookmark state");if(ed(JSON.stringify(s))>Ji)throw new Error("Bookmark state is too large");return s}function rd(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=ir(e);if(!t)throw new Error("Invalid bookmark path");return t}function es(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function td(e){let r=(e.target?["path","filePath","file"].flatMap(s=>typeof e.target.state[s]=="string"?[e.target.state[s]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function ts(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!Yp.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=Jr(t.state);return r.path!==void 0&&(r.path=rd(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Xp=/^[A-Za-z0-9_-]{1,64}$/;function od(e,t){if(typeof e!="string"||!Xp.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function nd(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=es(t.title,512,"title"),n={...t.description===void 0?{}:{description:es(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:es(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},s=t.group===void 0?{}:{group:od(t.group,"group")};if(t.groupId!==void 0){let l=od(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:ts(t.target),...n,...s};return{...l,searchText:td(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let i={folderPath:rd(t.folderPath),title:r,...n,...s};return{...i,searchText:td(i)}}function Qt(e){let t=0,r=a=>!!(a&&typeof a=="object"&&!Array.isArray(a)),n=a=>a.length>0&&a.length<=256&&!["__proto__","prototype","constructor"].includes(a),s=(a,i)=>{if(++t>2048||i>32||!r(a)||typeof a.type!="string")return!1;let l=(...p)=>Object.keys(a).every(c=>c==="type"||p.includes(c));return["unknown","null","boolean","number","string","function"].includes(a.type)?l():a.type==="literal"?l("value")&&(a.value===null||["string","boolean"].includes(typeof a.value)||typeof a.value=="number"&&Number.isFinite(a.value)):a.type==="array"?l("items","maxItems")&&(a.maxItems===void 0||Number.isSafeInteger(a.maxItems)&&a.maxItems>=0&&a.maxItems<=1e5)&&s(a.items,i+1):a.type==="tuple"?l("items","minItems")&&Array.isArray(a.items)&&a.items.length<=64&&(a.minItems===void 0||Number.isSafeInteger(a.minItems)&&a.minItems>=0&&a.minItems<=a.items.length)&&a.items.every(p=>s(p,i+1)):a.type==="union"?l("anyOf")&&Array.isArray(a.anyOf)&&a.anyOf.length>0&&a.anyOf.length<=32&&a.anyOf.every(p=>s(p,i+1)):a.type==="object"?l("properties","required","additionalProperties")&&r(a.properties)&&Object.entries(a.properties).every(([p,c])=>n(p)&&s(c,i+1))&&(a.required===void 0||Array.isArray(a.required)&&a.required.every(p=>typeof p=="string"&&Object.hasOwn(a.properties,p)))&&(a.additionalProperties===void 0||typeof a.additionalProperties=="boolean"):!1};return s(e,0)}function Qr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),s=new WeakSet,a=(i,l,p)=>{if(--n<0||p>64)return!1;if(i.type==="unknown")return!0;if(i.type==="null")return l===null;if(i.type==="literal")return l===i.value;if(i.type==="union")return i.anyOf.some(c=>a(c,l,p+1));if(i.type==="number")return typeof l=="number"&&Number.isFinite(l);if(i.type==="string"||i.type==="boolean"||i.type==="function")return typeof l===i.type;if(!l||typeof l!="object"||s.has(l))return!1;s.add(l);try{return i.type==="array"?Array.isArray(l)&&l.length<=(i.maxItems??1e5)&&l.every(c=>a(i.items,c,p+1)):i.type==="tuple"?Array.isArray(l)&&l.length>=(i.minItems??i.items.length)&&l.length<=i.items.length&&l.every((c,u)=>a(i.items[u],c,p+1)):i.type==="object"?Array.isArray(l)||i.required?.some(c=>!Object.hasOwn(l,c))?!1:Object.entries(l).every(([c,u])=>Object.hasOwn(i.properties,c)?a(i.properties[c],u,p+1):i.additionalProperties===!0):!1}finally{s.delete(l)}};return a(e,t,0)}var Zp=new Map;function le(e,t,r,n,s,a,i,l,p="owner"){let c=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:s,identities:a,identityScope:p,serviceCalls:i,serviceMetadata:l});return Zp.set(`${t}:${e}@${r}`,c),c}var rs=256;function ns(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,s)=>{let a=t.get(r);if(!a)throw new Error(`Unknown provider-owned agent tool: ${r}`);return a.run(n,s)}}}var oe=e=>!!e&&typeof e=="object"&&!Array.isArray(e),me=(e,t)=>typeof e[t]=="function",eo=e=>e===void 0,To=e=>typeof e=="boolean",re=e=>typeof e=="string",$e=e=>e===void 0||re(e),Jp=e=>e===void 0||typeof e=="number",Qp=e=>e===void 0||typeof e=="boolean",de=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Pe=e=>oe(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),ad=e=>oe(e),id=e=>oe(e)&&re(e.id)&&re(e.title)&&re(e.date)&&(e.documentRef===void 0||oe(e.documentRef)&&re(e.documentRef.pluginId)&&re(e.documentRef.sourceId)&&re(e.documentRef.itemId)),em=e=>oe(e)&&re(e.date)&&$e(e.startTime)&&$e(e.endTime)&&$e(e.sourceId)&&$e(e.itemId),tm=e=>oe(e)&&re(e.url)&&$e(e.title)&&Qp(e.newTab),om=e=>oe(e)&&re(e.query),dd=e=>oe(e)&&re(e.name)&&$e(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),rm=e=>Array.isArray(e)&&e.every(dd),nm=e=>e===null||dd(e),am=e=>e===void 0||oe(e)&&$e(e.approvalToken)&&(e.cancellation===void 0||oe(e.cancellation)),sm=e=>typeof e=="string"||oe(e)&&typeof e.text=="string",im=e=>oe(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&oe(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&$e(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),ld=e=>oe(e)&&re(e.id)&&re(e.label)&&$e(e.labelKey)&&$e(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(ld)),cd={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(id)},create:{args:e=>de(e,[re,ad]),result:To},update:{args:e=>de(e,[re,ad]),result:To},remove:{args:e=>de(e,[re]),result:To},open:{args:e=>de(e,[re]),result:eo},configure:{args:e=>e.length===0,result:eo},actions:{args:e=>de(e,[re]),result:e=>Array.isArray(e)&&e.every(ld)},runAction:{args:e=>de(e,[re,re]),result:To}},ud=e=>oe(e)&&re(e.name)&&re(e.version)&&$e(e.description)&&$e(e.author)&&(e.localized===void 0||oe(e.localized)&&Object.values(e.localized).every(t=>oe(t)&&re(t.name)&&$e(t.description))),dm=le("calendar.itemSource","service","1.3.0","many",e=>oe(e)&&me(e,"list")&&(e.integration===void 0||ud(e.integration)),void 0,cd,e=>e.integration),en=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,os=e=>typeof e=="string"&&e.length>0&&e.length<=8192,lm=e=>oe(e)&&en(e.startDate)&&en(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=rs&&(e.cursor===void 0||os(e.cursor)),cm=e=>oe(e)&&os(e.revision)&&(e.cursor===void 0||os(e.cursor))&&Array.isArray(e.items)&&e.items.length<=rs&&e.items.every(t=>id(t)&&en(t.date)&&(t.endDate===void 0||en(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,ko=le("calendar.itemSource","service","2.0.0","many",e=>oe(e)&&me(e,"list")&&(e.integration===void 0||ud(e.integration)),void 0,{...cd,list:{args:e=>de(e,[lm]),result:cm}},e=>e.integration),lr=le("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),um=le("calendar.navigator","service","1.0.0","one",e=>oe(e)&&me(e,"openDate"),void 0,{openDate:{args:e=>de(e,[em]),result:eo}}),tn=le("calendar.panelSelection","state","1.0.0","one",e=>oe(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),pm=le("web.activeContext","state","1.0.0","one",e=>oe(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function sd(e){return oe(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>oe(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var mm=le("contacts.directory","service","1.0.0","one",e=>oe(e)&&["search","resolveEmails","open"].every(t=>me(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(sd)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>oe(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(sd))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||oe(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:eo}}),fm=le("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),gm=le("web.navigator","service","1.0.0","one",e=>oe(e)&&me(e,"open"),void 0,{open:{args:e=>de(e,[tm]),result:eo}}),hm=le("selection.textAction","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&me(e,"run"),e=>[e.id]),bm=le("geo.navigator","service","1.0.0","one",e=>oe(e)&&me(e,"open"),void 0,{open:{args:e=>de(e,[om]),result:eo}}),ym=le("geo.search","service","1.0.0","one",e=>oe(e)&&me(e,"search")&&me(e,"reverse"),void 0,{search:{args:e=>de(e,[re]),result:rm},reverse:{args:e=>de(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:nm}}),as=le("agent.toolProvider","service","1.0.0","many",e=>oe(e)&&Array.isArray(e.tools)&&e.tools.every(im)&&me(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>de(e,[re,oe,am]),result:sm}},e=>({tools:e.tools}),"global"),wm=le("guard.runtime","service","1.0.0","one",e=>oe(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>me(e,t)),void 0,{resolve:{args:e=>de(e,[oe]),result:oe},requestApproval:{args:e=>de(e,[oe]),result:To},consumeToken:{args:e=>e.length>=1&&e.length<=2&&re(e[0])&&$e(e[1]),result:To},audit:{args:e=>de(e,[oe]),result:eo}}),vm=le("browser.automation","service","1.0.0","one",e=>oe(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>me(e,t)),void 0,{list:{args:e=>e.length===0,result:Pe},open:{args:e=>de(e,[re]),result:Pe},switch:{args:e=>de(e,[re]),result:Pe},close:{args:e=>de(e,[re]),result:Pe},snapshot:{args:e=>de(e,[re]),result:Pe},readText:{args:e=>e.length>=1&&e.length<=2&&re(e[0])&&Jp(e[1]),result:Pe},readHtml:{args:e=>de(e,[re]),result:Pe},screenshot:{args:e=>de(e,[re]),result:Pe},click:{args:e=>de(e,[re,t=>typeof t=="number"]),result:Pe},type:{args:e=>e.length>=3&&e.length<=4&&re(e[0])&&typeof e[1]=="number"&&re(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Pe},select:{args:e=>de(e,[re,t=>typeof t=="number",re]),result:Pe},scroll:{args:e=>de(e,[re,t=>typeof t=="number",t=>typeof t=="number"]),result:Pe},pressKey:{args:e=>de(e,[re,re]),result:Pe},navigate:{args:e=>de(e,[re,re]),result:Pe},back:{args:e=>de(e,[re]),result:Pe},forward:{args:e=>de(e,[re]),result:Pe},reload:{args:e=>de(e,[re]),result:Pe}}),xm=le("fileTree.contextItem","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.label=="string"&&$e(e.labelKey)&&me(e,"run"),e=>[e.id]),Tm=le("newTab.entry","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&me(e,"run"),e=>[e.id]),ss=le("search.resultAction","extension","1.0.0","many",e=>oe(e)&&typeof e.cardKind=="string"&&me(e,"open"),e=>[e.cardKind]),km=le("search.resultCard","extension","1.0.0","many",e=>oe(e)&&typeof e.cardKind=="string"&&me(e,"render")&&me(e,"open"),e=>[e.cardKind]),on=le("metadataPanel.segment","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&me(e,"render"),e=>[e.id]),is=le("workspace.surface","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&me(e,"getSnapshot")&&me(e,"subscribe")&&me(e,"restore"),e=>[e.id]),Sm=le("metadata.plugin","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&me(e,"facts"),e=>[e.id]),Em=le("workspace.viewState","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&me(e,"capture")&&me(e,"restore")&&me(e,"subscribe"),e=>[e.id]);var rn=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let s of n){if(typeof s!="string")continue;if(["__proto__","prototype","constructor"].includes(s))throw new Error("Invalid bookmark key");let a=Object.getOwnPropertyDescriptor(e,s);a?.enumerable&&"value"in a&&(r[s]=a.value)}return r},ds=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),pd=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),md=e=>ds(e)&&typeof e.surface=="string"&&pd.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function cr(e){let t=rn(e);if(!md(t))throw new Error("Invalid bookmark descriptor");let r=ts({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=nd({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function ls(e){try{let t=cr(e),r=rn(e);return JSON.stringify(t.state)===JSON.stringify(Jr(r.state))}catch{return!1}}function Am(e){try{let t=rn(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:cr(t.bookmark)}}catch{}return{status:"invalid"}}var Cm=e=>{try{let t=rn(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&ls(t.bookmark)}catch{return!1}},Dm=e=>ds(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),fd=le("workspace.bookmark","service","1.0.0","many",e=>ds(e)&&typeof e.id=="string"&&pd.has(String(e.surface))&&Qt(e.stateSchema)&&(e.itemStateSchema===void 0||Qt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&md(e[0]),result:Cm,sanitizeResult:Am},restore:{args:e=>e.length===1&&ls(e[0]),result:Dm}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function cs(e,t,r){if(!Qt(r.stateSchema)||r.itemStateSchema!==void 0&&!Qt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,s=(c,u,m=!1)=>Qr(m&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,c,8192)&&(!r.validate||r.validate(c,u)),a=(c,u,m)=>{let b=m?void 0:r.primary?r.primary(c):c.item,h=Jr(b?.state??c.view);if(!s(h,u,!!b))throw new Error("Invalid bookmark state");return cr({...u,title:b?.title??c.title,description:r.description(c,!!b),state:h,...b?{itemId:b.id}:{}})},i={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:a(t.getSnapshot(c.instanceId),c,!1)}}catch{return{status:"invalid"}}},async restore(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=cr(c),!s(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(fd,i),p;try{p=e.interop.extensions.provide(is,{...t,getSnapshot(c){let u=t.getSnapshot(c),m={surface:t.surface,...c===void 0?{}:{instanceId:c}},b,h;try{b=a(u,m,!1)}catch{}try{h=a(u,m,!0)}catch{}return{...u,bookmark:b,bookmarkView:h}}})}catch(c){throw n=!1,l(),c}return()=>{n=!1,p(),l()}}var ur=e=>!!e&&typeof e=="object"&&!Array.isArray(e),gd=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function hd(e){if(!ur(e)||!gd(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!ur(r)||!gd(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!ur(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!ur(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!ur(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(s=>!["type","integer","maxLength"].includes(s))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var us=le("workspace.details","extension","1.0.0","many",hd,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Ty=[xe,`${xe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var Fy=1024*1024;var Ky=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var jy=globalThis.Buffer;var Nm=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,g,nn=new Map,an;function ye(){return an}function sn(e,t){let r=nn.get(e)??new Set;return r.add(t),nn.set(e,r),()=>{r.delete(t),r.size||nn.delete(e)}}function bd(e){an?.dispose(),g=e,o=e.React;let t=!0,r=new Set;return an={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},an.dispose}var Pm=1800;function So(e){let t=Le();o.useEffect(()=>{let r=null,n=null,s=null,a=0,i=()=>{s&&s.classList.remove("todo-reveal-target"),s=null},l=u=>{if(u.mode==="create")return;a=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let m=Date.now()+2500,b=()=>{if(r=null,a!==u.nonce)return;let h=[...nn.get(u.todoId)??[]].find(w=>w.isConnected);if(!h){Date.now()<m?r=setTimeout(b,40):t.get()?.nonce===u.nonce&&t.clear();return}h.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),i(),h.classList.add("todo-reveal-target"),s=h,n=setTimeout(i,Pm),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(b,0)},p=t.subscribe(()=>{let u=t.get();u&&l(u)}),c=t.get();return c&&l(c),()=>{p(),a=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),i()}},[t,e])}function Le(){return g.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,s)=>{e+=1,r.value={todoId:n,mode:s,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function yd(){Le().request("","create"),g.workspace.revealOwnPanel("left_sidebar")}var wd=`
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

`;var vd=`/* \u2500\u2500 Todo panel (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

.todo-header-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
  -webkit-app-region: no-drag;
}

/* horizontally scrollable due-date filter chips (mode="all") */

.todo-smart-chip {
  box-sizing: border-box;
  height: 28px;
  padding: 0 10px;
  border: 1px solid var(--border-light);
  border-radius: 999px;
  font-size: var(--small-font-size);
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

/* sort row (shared .flagged-notes-sort), scoped narrower for the todo panel */
.todo-panel .flagged-notes-sort {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}
/* Calendar-day filter chip: text + a clear (\xD7) icon. */

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
.todo-compose-chip, .todo-compose-submit {
  min-height: 28px; padding: 5px 7px; display: inline-flex; gap: 5px; align-items: center; justify-content: center;
  border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary);
  font: inherit; font-size: var(--small-font-size); cursor: pointer;
}
.todo-compose-chip:hover { background: var(--hover-bg); }
.todo-compose-chip svg { width: 14px; height: 14px; flex-shrink: 0; }
.todo-compose-chip[aria-pressed='true'] { color: var(--color-yellow); background: var(--hover-bg); }
.todo-compose-submit { margin-left: auto; padding-inline: 12px; background: var(--accent-color); color: var(--accent-button-text); }
.todo-compose button:disabled { opacity: 0.4; cursor: default; }
.todo-compose-error { color: var(--negative-color-highlight); font-size: var(--small-font-size); }
.todo-compose-attachment-picker .resource-picker-field { min-height: 30px; box-sizing: border-box; padding: 0 8px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); background: transparent; gap: 6px; }
.todo-compose-attachment-picker .resource-picker-field input, .todo-compose-attachment-picker .resource-picker-field input:focus { width: 100%; min-width: 0; border: 0 !important; outline: 0 !important; box-shadow: none !important; background: transparent; padding: 4px 0; font: inherit; color: var(--text-color); }
.todo-compose-attachment-picker .resource-picker-field > svg { width: 14px; height: 14px; flex-shrink: 0; }
.todo-active-navigation { padding-bottom: 64px; }

`;var xd=`/* \u2500\u2500 Swipe \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var Td=`/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
.todo-attach-count,
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

`;var kd=`/* Tint the status label by its meaning, off the --todo-st-* scale above rather
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

.todo-row textarea {
  min-height: 38px;
  padding: var(--space-1) var(--space-2);
  resize: vertical;
  color: var(--text-secondary);
  font-size: var(--smaller-font-size);
}

.todo-row textarea:focus {
  border-color: var(--border-medium);
}

`;var Sd=`/* \u2500\u2500 Todo clock badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */


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

`;var Ed=`/* \u2500\u2500 To-Do page (main_workspace \u2014 Things-style sections) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
.todo-detail-footer { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-2); width: 100%; }
.todo-detail-footer > button { min-height: 30px; padding: 5px 12px; border: 0; border-radius: var(--radius-sm); font: inherit; font-size: var(--small-font-size); cursor: pointer; }
.todo-detail-footer > .btn-primary { background: var(--accent-color); color: var(--accent-button-text); }

/* Hairline-separated groups, mirroring the settings kit's Section rhythm. */

.todo-detail-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  min-height: 26px;
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

.todo-detail-url-open {
  flex: 1;
  min-width: 0;
  color: var(--accent-color);
  font-size: var(--smaller-font-size);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
`;var Cd=`/* \u2500\u2500 Edit sheet: one column, title, notes, then every property as a chip \u2500\u2500 */
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

`;var Dd=`/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

.todo-filter-divider {
  height: 1px;
  background: var(--border-light);
}

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
.todo-settings-name-field { min-width: 0; }
.todo-settings-text { box-sizing: border-box; width: 100%; min-width: 0; }
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
.todo-settings-item.is-off .todo-settings-chip { opacity: 0.45; }
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
.todo-settings-text-select { width: 104px; min-width: 0; }
.todo-settings-item > :nth-child(n + 5) { justify-self: center; }
.todo-smart-list-settings .todo-settings-item > :nth-child(n + 4) { justify-self: center; }
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
}
.todo-reminder-mode { width: 100%; }
.todo-reminder-time { box-sizing: border-box; width: 96px; font-variant-numeric: tabular-nums; text-align: center; }
.todo-reminder-time.invalid { border-color: var(--negative-color); }
.todo-reminder-note { color: var(--text-secondary); font-size: var(--smaller-font-size); }
.todo-reminder-note.is-error { color: var(--negative-color); }

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

`;var Pd=`/* \u2500\u2500 Status badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
/* Rendered Markdown carries its own line breaks; pre-wrap turned the
   newlines between its blocks into empty lines. */
.todo-notes.is-rendered { white-space: normal; }
.todo-notes.is-rendered > :is(p, ul, ol, blockquote, pre) + :is(p, ul, ol, blockquote, pre) { margin-top: 2px; }
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

`;var Ld=`/* \u2500\u2500 Main table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
/* It is the one tinted row until it is left: leaving saves it as a task, or drops it without a title. */
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
.todo-table-new-hint { color: var(--text-tertiary); font-size: var(--smaller-font-size); }
.todo-table-new-row .todo-table-cell-btn.muted,
.todo-table-new-row .todo-table-flag-btn:not(.on) { opacity: 1; }
.todo-table-new-status { display: inline-grid; place-items: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: 50%; background: transparent; cursor: pointer; }
.todo-table-new-status:hover:not(:disabled) .todo-table-new-circle { border-color: var(--text-secondary); }

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
/* The main group a subgroup sits under: same pill, quieter. */
.todo-table-group-parent { opacity: 0.7; }
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

`;var Od=`
.todo-task-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  user-select: text;
}
.todo-task-title {
  margin: 0;
  color: var(--title-color, var(--text-color));
  font-size: 1.25rem;
  font-weight: var(--font-bold, 700);
  line-height: 1.25;
  overflow-wrap: anywhere;
}
.todo-task-title.is-struck { color: var(--text-secondary); text-decoration: line-through; }
/* Status, priority, flag and group in one wrapping row under the title. */
.todo-task-facts { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px; min-width: 0; font-size: var(--smaller-font-size); }
.todo-task-fact { display: inline-flex; align-items: center; gap: 4px; color: var(--text-secondary); white-space: nowrap; }
.todo-task-fact svg { width: 14px; height: 14px; }
.todo-task-flag { color: var(--color-orange); }
.todo-task-flag svg { fill: currentColor; }
.todo-task-facts .todo-table-group-pill { max-width: 100%; }
.todo-task-tags { display: flex; flex-wrap: wrap; gap: 4px 8px; }
.todo-task-tag { color: var(--accent-color); font-size: var(--smaller-font-size); }
.todo-task-note {
  margin: 0;
  color: var(--text-color);
  font-size: var(--small-font-size);
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.todo-task-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: var(--text-secondary);
  font-size: var(--small-font-size);
  line-height: 18px;
}
.todo-task-line svg { flex: 0 0 auto; width: 14px; height: 14px; margin-top: 2px; }
.todo-task-line span { min-width: 0; overflow-wrap: anywhere; }
.todo-task-line.is-overdue { color: var(--negative-color); }
.todo-task-map {
  position: relative;
  display: block;
  width: 100%;
  height: 180px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--hover-bg);
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.todo-task-map.is-dragging { cursor: grabbing; }
.todo-task-map-tile { position: absolute; width: 256px; height: 256px; max-width: none; pointer-events: none; user-select: none; }
/* The one map has light tiles: in Dark they are turned dark, hues kept. */
.todo-task-map.is-dark .todo-task-map-tile { filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.9) saturate(0.6); }
.todo-task-map-pin {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  /* The pin's tip, not its middle, marks the place. */
  transform: translate(-50%, -100%);
  color: var(--accent-color);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
}
.todo-task-map-pin svg { display: block; width: 26px; height: 26px; fill: currentColor; stroke: #fff; stroke-width: 1.5; }
.todo-task-map-pin svg circle { fill: #fff; stroke: none; }
/* + and \u2212 sit on the map, top right, one pill. */
.todo-task-map-zoom {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--pane-bg);
}
.todo-task-map-zoom-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
}
.todo-task-map-zoom-btn + .todo-task-map-zoom-btn { border-top: 1px solid var(--border-light); }
.todo-task-map-zoom-btn:hover:not(:disabled) { background: var(--hover-bg); }
.todo-task-map-zoom-btn:disabled { opacity: 0.4; cursor: default; }
.todo-task-map-zoom-btn svg { width: 14px; height: 14px; }
/* The address and each link are lines that open what they name. */
.todo-task-link {
  align-self: flex-start;
  max-width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font: inherit;
  font-size: var(--small-font-size);
  text-align: left;
  cursor: pointer;
}
.todo-task-link:hover span { text-decoration: underline; }
.todo-task-map-credit {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1px 5px;
  border-top-left-radius: 4px;
  background: color-mix(in srgb, var(--pane-bg, #fff) 78%, transparent);
  color: var(--text-secondary);
  font-size: calc(var(--smaller-font-size) * 0.85);
  line-height: 1.4;
}
`;var Om=wd+vd+xd+Td+kd+Sd+Ed+Ad+Cd+Dd+`

`+Id+Nd+Pd+Ld+Od,ps="notes-todo-styles";function Md(){let e=document.getElementById(ps);return e||(e=document.createElement("style"),e.id=ps,document.head.appendChild(e)),e.textContent=Om,()=>{document.getElementById(ps)===e&&e.remove()}}var ne="#12120f",ue="#ffffff",fs=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ne,onDark:ne},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ue,onDark:ue},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ne,onDark:ne},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ue,onDark:ne},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ne,onDark:ne},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ue,onDark:ne},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ue,onDark:ne},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ue,onDark:ne},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ue,onDark:ne},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ue,onDark:ue},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ne,onDark:ne},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ue,onDark:ne},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ue,onDark:ne},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ne,onDark:ne},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ue,onDark:ne},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ue,onDark:ne},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ue,onDark:ne},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ue,onDark:ne},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ne,onDark:ne},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ne,onDark:ne},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ue,onDark:ne},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ue,onDark:ne},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ue,onDark:ne},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ue,onDark:ne},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ue,onDark:ne},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ue,onDark:ne},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ne,onDark:ne},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ne,onDark:ne},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ue,onDark:ne},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ne,onDark:ne},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ue,onDark:ne},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ue,onDark:ne},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ne,onDark:ne},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ue,onDark:ne},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ue,onDark:ne},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ue,onDark:ne}],Mm=["semantic","muted","accent","categorical"];var cv=new Map(fs.map(e=>[e.id,e])),_m={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},Gm=new Map(fs.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),Rm=/^[a-z][a-z0-9-]{0,47}$/,zm={version:4,families:Mm.map(e=>({id:e,name:_m[e]})),colors:fs.map(e=>({id:e.id,familyId:e.family,name:Gm.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},Fm=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var $m=Fm(zm);function gs(){return $m}var ms=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],dn="palette:",Um=/^#[0-9a-f]{6}$/i;function ln(e){return e.startsWith(dn)&&Rm.test(e.slice(dn.length))}function ge(e){return`${dn}${e}`}function pr(e){return ln(e)?e.slice(dn.length):void 0}function _d(e){if(typeof e!="string")return;let t=e.trim();return ln(t)?t:Um.test(t)?t.toLowerCase():void 0}function Te(e){let t=pr(e);return t?`var(--color-${t})`:e}function Mt(e){let t=pr(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function hs(e){let t=new Set(e.map(r=>pr(r)??r.toLowerCase()));return ge(ms.find(r=>!t.has(r))??ms[0])}function Gd(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=ms;return ge(r[Math.abs(t)%r.length])}function J(e){return e.trim().toLowerCase()}function Km(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let s of e){let a=typeof s=="string"?s.trim():"",i=J(a);!i||i===J(t)||r.has(i)||(r.add(i),n.push(a))}return n}function jm(e){return`group_${J(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function qe(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let s=n,a=typeof s.name=="string"?s.name.trim():"",i=J(a);if(!a||r.has(i))continue;r.add(i);let l=typeof s.id=="string"&&s.id.trim()?s.id.trim():jm(a),p=_d(s.color)??hs(t.map(m=>m.color)),c=Km(s.aliases,a,r),u=typeof s.parent=="string"?s.parent.trim():"";t.push({id:l,name:a,color:p,...c.length?{aliases:c}:{},...u?{parent:u}:{}})}return Eo(t)}function Eo(e){let t=new Map;for(let a of e)t.has(a.id)||t.set(a.id,a);let r=a=>{let i=a.parent?t.get(a.parent):void 0;return i&&i.id!==a.id?i:void 0},n=a=>{let i=r(a);return i!==void 0&&r(i)===void 0},s=[];for(let a of e)if(!n(a)){if(a.parent===void 0)s.push(a);else{let{parent:i,...l}=a;s.push(l)}for(let i of e)i.parent===a.id&&i.id!==a.id&&n(i)&&s.push(i)}return s}function bs(e,t){return e.filter(r=>r.parent===t)}function ys(e,t){return[t,...bs(e,t.id)]}function Ao(e,t,r,n,s){let a=Eo(e);if(!a.find(I=>I.id===t))return null;let l=a.some(I=>I.parent===t),p=a.filter(I=>I.id!==t&&I.parent!==t),c=p.findIndex(I=>I.id===r);if(c<0)return null;let u=n==="before"?c:c+1,m=p[u-1],b=p[u],h=m?m.parent??m.id:null,w=h!==null&&b?.parent===h;return!l&&h!==null&&(w||s)?{parent:h,before:w?b.id:null}:{parent:null,before:p.slice(u).find(I=>I.parent===void 0)?.id??null}}function mr(e,t,r){let n=Eo(e),s=n.find(m=>m.id===t);if(!s)throw new Error("Group no longer exists");let a=n.filter(m=>m.id===t||m.parent===t),i=n.filter(m=>m.id!==t&&m.parent!==t),{parent:l,...p}=s;if(r.parent!==null){let m=i.find(I=>I.id===r.parent);if(!m||m.parent!==void 0||a.length>1)throw new Error("A subgroup cannot have subgroups");let b=i.filter(I=>I.parent===m.id),h=r.before===null?void 0:b.find(I=>I.id===r.before);if(r.before!==null&&!h)throw new Error("Groups changed; refresh before moving");let w=h??i[i.indexOf(b.at(-1)??m)+1],k=w?i.indexOf(w):i.length;return[...i.slice(0,k),{...p,parent:m.id},...i.slice(k)]}let c=r.before===null?void 0:i.find(m=>m.id===r.before&&m.parent===void 0);if(r.before!==null&&!c)throw new Error("Groups changed; refresh before moving");let u=c?i.indexOf(c):i.length;return[...i.slice(0,u),p,...a.slice(1),...i.slice(u)]}function Rd(e,t,r,n){let s=Eo(e),a=s.find(u=>u.id===t);if(!a)return null;let i=s.filter(u=>u.parent===a.parent),l=i.indexOf(a),p=r==="before"?n?0:l-1:n?i.length-1:l+1;if(p===l||p<0||p>=i.length)return null;let c=i.filter(u=>u.id!==t);return{parent:a.parent??null,before:c[p]?.id??null}}function rt(e,t){let r=J(t??"");if(r)return e.find(n=>J(n.name)===r||(n.aliases??[]).some(s=>J(s)===r))}function Co(e,t){return rt(t,e)?.name}function zd(e,t){let r=J(e??"");return r?rt(t,e)?.color??Gd(r):ge("primary-blue")}function Do(e){return hs(e.map(t=>t.color))}function ws(e){let t={};for(let r of e){let n=J(r??"");n&&(t[n]=(t[n]??0)+1)}return t}function Fd(e,t){return new Set(ys(e,t).flatMap(r=>[r.name,...r.aliases??[]]).map(J))}function Ue(e,t=""){return typeof e=="string"?e:t}function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function un(e){let t=Ue(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function $d(e){let t=Ue(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var Vm=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],hv=Object.fromEntries(Vm.map(e=>[e,{destination:"ask",recognize:!0}]));var Bm=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",Lt]);function Hm(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function vs(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=Hm(e);if(!t||Bm.has(t)||t.startsWith(`${Lt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Wm=16384,qm=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function Ym(e){if(!e||e.length>Wm||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,a=>a.charCodeAt(0)),s=JSON.parse(new TextDecoder().decode(n));return s.v!==1||!s.state||typeof s.state!="object"||Array.isArray(s.state)?null:s.state}catch{return null}}function Xm(e){try{let t=new URL(e);if(t.protocol!==`${Xi}:`||t.hostname!==Zi)return null;let r=t.searchParams.get("realm")??"",n=ir(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let s=t.searchParams.get("plugin")??"";if(!qm.test(s))return null;let a=Ym(t.searchParams.get("state")??""),i=t.searchParams.get("surface");if(i&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(i))return null;let l=t.searchParams.get("instance");return l&&l.length>512?null:a?{kind:"plugin",pluginId:s,state:a,...i?{surface:i}:{},...l?{instanceId:l}:{}}:null}catch{return null}}function _t(e){let t=Xm(e);return t?.kind==="file"?t.relPath:null}function Ud(e){return vs(e)!==null}function to(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var xs=["auto","white","black"],fr=40,No=40;var Kd=["completed","canceled"],pn="statuses",gr=[{id:"open",labelKey:"todo.status.todo",color:ge("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:ge("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:ge("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:ge("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:ge("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:ge("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:ge("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:ge("red"),done:!0,cls:"todo-st-canceled",locked:!1}],mn=ge("teal"),Ts=gr,Po=gr.map(e=>e.id),oo=gr.filter(e=>!e.locked).map(e=>e.id),Zm=gr.filter(e=>e.done).map(e=>e.id),Io=new Map(gr.map(e=>[e.id,e])),ks=new Set(oo);function nt(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function Ss(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function fn(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let s=n,a=typeof s.label=="string"?s.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,No):"";if(!(!nt(s.id)||t.has(s.id)||!a)&&(t.add(s.id),r.push({id:s.id,label:a,done:s.done===!0}),r.length>=fr))break}return r}function Es(e,t){return Io.has(e)?t.done?.[e]??Io.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function hr(e){if(typeof e=="string")return Po.includes(e)||nt(e)?e:void 0}function ke(e){return e.status??(e.completed?"completed":"open")}function jd(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:Es(e,t),status:e}}var ht="todo.tasks",Gt="todo.task_tags",ro="todo.task_links",no="todo.task_attachments",Lo="todo.focus_sessions",at="todo.status_history";async function gn(e,t,r={},n){let s=[],a=r.cursor;do{n?.();let i=await e.data.dataset(t).query(r.select?{select:r.select,where:r.where,limit:1e3,cursor:a}:{where:r.where,limit:1e3,cursor:a});n?.(),s.push(...i.rows),a=i.cursor}while(a);return s}var Jm=200;function Vd(e,t=ht){let r=e?.keys;if(!Array.isArray(r)||!r.length||r.length>Jm)return null;let n=t===ht?"id":"taskId",s=[];for(let a of r){let i=a?.[n];if(typeof i!="string"||!i)return null;s.push(i)}return s}var ao=["normal","low","medium","high"];function hn(e){return typeof e=="string"&&ao.includes(e)}function Bd(e){return/^([01]\d|2[0-3]):[0-5]\d$/.test(e)}function Hd(e){return e===!0}function Qm(e){return hn(e)?e:"normal"}function bn(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function ef(e){return Array.isArray(e)?e.filter(t=>cn(t)).map(t=>({startedAt:Ue(t.startedAt),endedAt:Ue(t.endedAt),activeMinutes:bn(t.activeMinutes)??0,pauseMinutes:bn(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function As(e){return Array.isArray(e)?e.filter(t=>cn(t)).map(t=>({from:hr(t.from),to:hr(t.to),changedAt:Ue(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function tf(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function Cs(e){if(typeof e!="string")return;let t=e.trim();if(t)return _t(t)||Ud(t)?t:void 0}function of(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>Cs(n)).filter(n=>!!n))];return r.length?r:void 0}function rf(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>Jt(r)).filter(r=>!!r))];return t.length?t:void 0}function nf(e){if(!cn(e))return;let t=Ue(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function yn(e){let t=e,r=new Date().toISOString(),n=Ue(t.id,to("todo")),s=Ue(t.createdAt,r),a=ef(t.history),i=As(t.statusHistory),l=hr(nt(t.customStatus)?t.customStatus:t.status);return{id:n,title:Ue(t.title).trim(),completed:Hd(t.completed)||l==="completed"||l==="canceled",priority:Qm(t.priority),dueDate:Ue(t.dueDate),reminderOffsets:Array.isArray(t.reminderOffsets)?t.reminderOffsets:void 0,reminderTime:un(t.reminderTime),startTime:un(t.startTime),endTime:un(t.endTime),color:$d(t.color),note:Ue(t.note),tags:Array.isArray(t.tags)?t.tags.filter(p=>typeof p=="string"&&!!p.trim()).map(p=>p.trim()):[],estimatedMinutes:bn(t.estimatedMinutes),actualMinutes:bn(t.actualMinutes),history:a.length?a:void 0,statusHistory:i.length?i:void 0,status:l,filePath:Jt(t.filePath),group:Ue(t.group).trim()||void 0,flagged:Hd(t.flagged)||void 0,urls:of(t.urls),attachments:rf(t.attachments),location:nf(t.location),remindAt:tf(t.remindAt),reminderFiredAt:Ue(t.reminderFiredAt)||void 0,createdAt:s,updatedAt:Ue(t.updatedAt,s)}}function Rt(e,t,r){let n=(c,u=!1)=>{let m=new Map;for(let b of c){let h=m.get(b.taskId);h?h.push(b):m.set(b.taskId,[b])}if(u)for(let b of m.values())b.sort((h,w)=>Number(h.position)-Number(w.position));return m},s=n(t.tags),a=n(t.links,!0),i=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(c=>yn({...c,tags:(s.get(c.id)??[]).map(u=>u.tag),urls:(a.get(c.id)??[]).map(u=>u.url),attachments:(i.get(c.id)??[]).map(u=>u.path),history:l.get(c.id)??[],statusHistory:p.get(c.id)??[]})).map(c=>({...c,group:Co(c.group,r)??c.group})).filter(c=>c.title)}var br=[ht,Gt,ro,no],af=[...br,Lo,at],wn=br;function sf(e,t){let r=ye(),n=!0,s=!1,a=()=>{s||(s=!0,queueMicrotask(()=>{s=!1,n&&t()}))},i=e.map(c=>r.api.data.dataset(c).subscribe(a)),l=()=>{n=!1,i.forEach(c=>c())},p=r.onDispose(l);return()=>{p(),l()}}function zt(e){return sf(wn,e)}function Yd(e){let t=br.map(r=>g.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}function Ds(e,t,r=ye(),n){return gn(r.api,e,{where:t,cursor:n},r.assertActive)}var df=e=>!!e&&typeof e=="object"&&"code"in e&&e.code==="limit-exceeded";async function lf(e,t){let r=e.map(()=>[]),n=e.map((s,a)=>({...s,index:a,cursor:void 0}));for(;n.length;){t.assertActive();let s=n.map(i=>({operation:"query",dataset:i.dataset,query:{where:i.where,limit:1e3,cursor:i.cursor}})),a;try{a=(await t.api.data.snapshot(s)).values}catch(i){if(!df(i))throw i;(await Promise.allSettled(n.map(p=>Ds(p.dataset,p.where,t,p.cursor)))).forEach((p,c)=>{if(p.status==="rejected")throw p.reason;r[n[c].index].push(...p.value)});break}t.assertActive(),n=n.flatMap((i,l)=>{r[i.index].push(...a[l].rows);let p=a[l].cursor;return p?[{...i,cursor:p}]:[]})}return r}async function Is(e,t,r){let n=r?typeof r=="string"?r:{in:r}:void 0,s=n===void 0?void 0:{taskId:n},a=[ro,no,...t?[Lo,at]:[]],[i,l,p,c,u=[],m=[]]=await lf([{dataset:ht,where:n===void 0?void 0:{id:n}},{dataset:Gt,where:s},...a.map(b=>({dataset:b,where:s}))],e);return e.assertActive(),{tasks:i,relations:{tags:l,links:p,attachments:c,sessions:u,statusHistory:m}}}async function cf(e,t,r){let{tasks:n,relations:s}=await Is(e,t,r);return Rt(n,s,qe(e.api.getState().groups))}var Wd=new WeakMap;function yr(e,t,r,n,s){try{e.assertActive()}catch(p){return Promise.reject(p)}let a=Wd.get(e);a||(a=new Map,Wd.set(e,a));let i=a.get(t);if(!i){i={revision:0,pending:new Map};let p=i,c=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{c.forEach(u=>u()),a.clear()}),a.set(t,i)}let l=i.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=i.revision,c=await s();if(e.assertActive(),p===i.revision)return c}})().finally(()=>{i.pending.delete(n)}),i.pending.set(n,l)),l}function Xd(e,t){let r=ye();return yr(r,e?"full":"calendar",e?af:br,t??"",()=>cf(r,e,t))}var qd=new WeakMap,uf=0;function pf(e,t){let r=qd.get(e);r||(r=new Map,qd.set(e,r));let n=r.get(t);if(!n){let i={users:0,key:String(++uf),scope:{...e,assertActive:()=>{if(e.assertActive(),!i.users)throw new Error("To-Do selection disposed")}}};n=i,r.set(t,n)}n.users++;let s=n,a=!0;return{reader:n,release:()=>{a&&(a=!1,s.users--,s.users||r.delete(t))}}}function mf(e,t,r){return yr(e,"statusHistory",[at],r.key,async()=>{let n=await Ds(at,{taskId:t},r.scope);return n.sort((s,a)=>Number(s.position)-Number(a.position)),As(n)})}function Zd(e){let t=ye(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:s,release:a}=pf(t,e),i=0,l=!1,p=()=>{let b=++i;mf(t,e,s).then(h=>{!l&&b===i&&n({scope:t,id:e,history:h})}).catch(()=>{})},c=t.api.data.dataset(at).subscribe(b=>{(!b.keys||b.keys.some(h=>h.taskId===e))&&p()}),u=()=>{l=!0,c(),a()},m=t.onDispose(u);return p(),()=>{m(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function Ns(){return Xd(!0)}async function Ke(e){return e?(await Xd(!0,e))[0]??null:null}function Jd(e,t,r,n){let s=ye();return yr(s,"calendarPage",br,JSON.stringify([e,t,r,n]),async()=>{s.assertActive();let a=await s.api.data.dataset(ht).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});s.assertActive();let i=async m=>{let b=[];for(let h=0;h<a.rows.length;h+=100)b.push(...await Ds(m,{taskId:{in:a.rows.slice(h,h+100).map(w=>String(w.id))}},s));return b},l=await Promise.allSettled([i(Gt),i(ro),i(no)]),[p,c,u]=l.map(m=>{if(m.status==="rejected")throw m.reason;return m.value});return s.assertActive(),{todos:Rt(a.rows,{tags:p,links:c,attachments:u,sessions:[],statusHistory:[]},qe(s.api.getState().groups)),...a.cursor?{cursor:a.cursor}:{}}})}async function Ft(e){try{return await g.backend.call("records.append",{record:e})}catch{return!1}}async function Ps(e,t,r,n,s=!1){try{let a=await g.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...s?{exactStatusHistory:s}:{}});return a.ok&&n&&a.documentRevision&&Object.assign(n,a.documentRevision),a.ok?a:null}catch{return null}}async function Ls(e,t,r,n,s=!1){let a=await Ps(e,t,r,n,s);return a?a.record??t:null}async function Os(e,t,r,n){return await Ls(e,t,r,n)!==null}function Ms(e,t,r){return Ls(e,t,r)}async function wr(e,t){return await Ls(e,t,void 0,void 0,!0)!==null}async function $t(e){try{return await g.backend.call("records.delete",{id:e})}catch{return!1}}function vr(e){let t=[],r=e.replace(/#(\S+)/g,(n,s)=>(t.push(s.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function _s(e){let t=vr(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let s of t.tags)if(!r.some(a=>a.toLowerCase().startsWith(s)))return!1;return!t.text||n.some(s=>s.toLowerCase().includes(t.text))}}var Qd=new WeakMap;function ff(e){let t=Qd.get(e);if(!t){let r=e.title.toLowerCase(),n=e.note.toLowerCase();t={tags:(e.tags??[]).map(s=>s.toLowerCase()),withGroup:[r,n,(e.group??"").toLowerCase()],withoutGroup:[r,n]},Qd.set(e,t)}return t}function el(e,t=!0){let r=vr(e);return!r.tags.length&&!r.text?()=>!0:n=>{let s=ff(n);for(let a of r.tags)if(!s.tags.some(i=>i.startsWith(a)))return!1;return!r.text||(t?s.withGroup:s.withoutGroup).some(a=>a.includes(r.text))}}var Gs=100;function Ut(e,t,r,n,s){return gn(e,t,{select:r,where:n},s)}var gf={tags:[],links:[],attachments:[],sessions:[],statusHistory:[]};async function tl(e,t,r){let[n,s]=await Promise.all([Ut(e,ht,t,r.where,r.assertActive),r.withTags?Ut(e,Gt,["taskId","tag"],void 0,r.assertActive):[]]);return Rt(n,{...gf,tags:s},r.groups)}async function ol(e,t,r){let n=[...new Set(t)],s=new Map;for(let a=0;a<n.length;a+=Gs){let i=n.slice(a,a+Gs),l={taskId:{in:i}},[p,c,u,m,b,h]=await Promise.all([Ut(e,ht,void 0,{id:{in:i}},r.assertActive),Ut(e,Gt,void 0,l,r.assertActive),Ut(e,ro,void 0,l,r.assertActive),Ut(e,no,void 0,l,r.assertActive),Ut(e,Lo,void 0,l,r.assertActive),Ut(e,at,void 0,l,r.assertActive)]);for(let w of Rt(p,{tags:c,links:u,attachments:m,sessions:b,statusHistory:h},r.groups))s.set(w.id,w)}return n.flatMap(a=>s.get(a)??[])}var rl=Gs;function Ae(e=[]){return e.map(t=>Co(t.name,e)??t.name)}var nl=()=>[];function al(e){nl=e}var sl=()=>[],il=0,xr=null;function dl(e){sl=e,Tr()}function Tr(){xr=null,il++}function ll(){return il}function bt(e){if(!xr){xr=new Map;let r=sl();for(let n of r){if(n.parent||!r.some(a=>a.parent===n.id))continue;let s=Fd(r,n);for(let a of[n.name,...n.aliases??[]])xr.set(J(a),s)}}let t=J(e);return xr.get(t)??new Set([t])}function vn(e,t){return rt(t,e)?.parent!==void 0}function Rs(e,t){let r=rt(t,e)?.parent;return r?t.find(n=>n.id===r)?.name:void 0}function xn(e,t){let r=Rs(e,t);return r?`${r} \xB7 ${e}`:e}function Ce(e,t){return zd(e,rt(t,e)?t:nl())}async function cl(e,t,r,n){let s=new Map,a=e.data.dataset(at);for(let i=0;i<t.length;i+=20){let l=t.slice(i,i+20),p=new Map;for(;l.length;){r();let c=await a.aggregate({where:{taskId:{in:l},or:["completed","canceled"].map(m=>({to:m,from:{in:n().filter(b=>b!==m)}})),...p.size?{and:[{or:l.map(m=>({taskId:m,position:{lt:p.get(m)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!c.length)break;let u=await a.query({select:["taskId","changedAt"],where:{or:c.map(m=>({taskId:m.taskId,position:m.position}))},limit:20});r(),l=[];for(let m of u.rows){let b=String(m.taskId);if(typeof m.changedAt=="string"&&m.changedAt)s.set(b,{changedAt:m.changedAt});else{let h=c.find(w=>w.taskId===b)?.position;if(typeof h!="number"||!Number.isInteger(h))throw new Error("Invalid completion position");p.set(b,h),l.push(b)}}}}return s}function Tn(e){return"historyLoaded"in e&&e.historyLoaded===!1}var ul={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.496cd6a42238":"To-Do: Search tasks","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.edbe7ad07b4a":"Open To-Do","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.addAttachment":"Add attachment","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.noGroup":"No group","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.due.overdue":"Overdue","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.deselectAll":"Deselect all","todo.group.manage":"Manage groups","todo.group.selectAll":"Select all","todo.linkedFile":"Linked file","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.moreFiles":"+{{p0}} more","todo.newTodoIn":"New todo in {{p0}}","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.thisWeekend":"This weekend","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"Groups","todo.view.expandGroup":"Show the subgroups of {{p0}}","todo.view.collapseGroup":"Hide the subgroups of {{p0}}","todo.view.expandAllGroups":"Expand all groups","todo.view.collapseAllGroups":"Collapse all groups","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.time":"Reminder time","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists and statuses","todo.settings.section.groups":"Groups","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.colStatus":"Status","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do-only groups","todo.settings.localGroupsDesc":"Private to To-Do: create, rename, colour and reorder them here.","todo.settings.useSharedGroups":"Shared groups","todo.settings.useSharedGroupsDesc":"Groups that Calendar, Contacts and Workspace use too. A change here changes them everywhere.","todo.settings.useLocalGroups":"To-Do-only groups","todo.settings.useLocalGroupsDesc":"Groups that exist only in To-Do. No other plugin sees them.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupRemove":"Remove group","todo.settings.localGroupRemoveBlocked":"Still used by {{count}} tasks \u2014 move them to another group to delete it","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.settings.collapsedGroupsSetting":"Collapsed sidebar groups","todo.settings.groupOrderSetting":"Order of the sidebar groups","todo.settings.localGroupUsage":"{{count}} tasks use this group","todo.settings.localGroupNewColor":"Color of the new group","todo.settings.localGroupDuplicate":"A group with that name already exists.","todo.settings.localSubgroupAdd":"Add subgroup","todo.settings.localSubgroupAddTo":"Add subgroup to {{p0}}","todo.settings.localSubgroupNew":"New subgroup","todo.settings.localGroupRemoveSubgroups":"Still has subgroups \u2014 remove or move them first","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.info.todayTodo":"Today to do","todo.info.todayCompleted":"Today completed","todo.info.weekTodo":"This week to do","todo.info.weekCompleted":"This week completed","todo.info.allTodo":"All to do","todo.info.allCompleted":"All completed","todo.task.tab":"Task","todo.task.empty":"Select a task in the table to see it here.","todo.task.mapCredit":"\xA9 OpenStreetMap contributors","todo.task.mapOf":"Map of {{p0}}","todo.task.zoomIn":"Zoom in","todo.task.zoomOut":"Zoom out"};var pl={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.noGroup":"Ohne Gruppe","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.due.overdue":"\xDCberf\xE4llig","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.deselectAll":"Auswahl aufheben","todo.group.manage":"Gruppen verwalten","todo.group.selectAll":"Alle ausw\xE4hlen","todo.linkedFile":"Verkn\xFCpfte Datei","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.moreFiles":"+{{p0}} weitere","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Gruppen","todo.view.expandGroup":"Untergruppen von {{p0}} einblenden","todo.view.collapseGroup":"Untergruppen von {{p0}} ausblenden","todo.view.expandAllGroups":"Alle Gruppen ausklappen","todo.view.collapseAllGroups":"Alle Gruppen einklappen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.time":"Erinnerungszeit","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen und Status","todo.settings.section.groups":"Gruppen","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.colStatus":"Status","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.localGroupsDesc":"Geh\xF6ren nur zu Aufgaben: hier erstellen, umbenennen, einf\xE4rben und neu ordnen.","todo.settings.useSharedGroups":"Gemeinsame Gruppen","todo.settings.useSharedGroupsDesc":"Gruppen, die auch Kalender, Kontakte und Arbeitsbereiche verwenden. Eine \xC4nderung hier \xE4ndert sie \xFCberall.","todo.settings.useLocalGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.useLocalGroupsDesc":"Gruppen, die es nur in Aufgaben gibt. Kein anderes Plugin sieht sie.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupRemove":"Gruppe entfernen","todo.settings.localGroupRemoveBlocked":"Wird noch von {{count}} Aufgaben verwendet \u2014 Aufgaben zuerst in eine andere Gruppe verschieben","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.settings.collapsedGroupsSetting":"Eingeklappte Gruppen in der Seitenleiste","todo.settings.groupOrderSetting":"Reihenfolge der Gruppen in der Seitenleiste","todo.settings.localGroupUsage":"{{count}} Aufgaben verwenden diese Gruppe","todo.settings.localGroupNewColor":"Farbe der neuen Gruppe","todo.settings.localGroupDuplicate":"Eine Gruppe mit diesem Namen existiert bereits.","todo.settings.localSubgroupAdd":"Untergruppe hinzuf\xFCgen","todo.settings.localSubgroupAddTo":"Untergruppe zu {{p0}} hinzuf\xFCgen","todo.settings.localSubgroupNew":"Neue Untergruppe","todo.settings.localGroupRemoveSubgroups":"Hat noch Untergruppen \u2014 zuerst entfernen oder verschieben","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.info.todayTodo":"Heute offen","todo.info.todayCompleted":"Heute erledigt","todo.info.weekTodo":"Diese Woche offen","todo.info.weekCompleted":"Diese Woche erledigt","todo.info.allTodo":"Alle offen","todo.info.allCompleted":"Alle erledigt","todo.task.tab":"Aufgabe","todo.task.empty":"W\xE4hle in der Tabelle eine Aufgabe aus, um sie hier zu sehen.","todo.task.mapCredit":"\xA9 OpenStreetMap-Mitwirkende","todo.task.mapOf":"Karte von {{p0}}","todo.task.zoomIn":"Vergr\xF6ssern","todo.task.zoomOut":"Verkleinern"};var ml={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.edbe7ad07b4a":"Abierto To-Do","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.addAttachment":"A\xF1adir adjunto","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.noGroup":"Sin grupo","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.due.overdue":"Atrasado","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.deselectAll":"Deseleccionar todo","todo.group.manage":"Gestionar grupos","todo.group.selectAll":"Seleccionar todo","todo.linkedFile":"Archivo vinculado","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.moreFiles":"+{{p0}} m\xE1s","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Grupos","todo.view.expandGroup":"Mostrar los subgrupos de {{p0}}","todo.view.collapseGroup":"Ocultar los subgrupos de {{p0}}","todo.view.expandAllGroups":"Desplegar todos los grupos","todo.view.collapseAllGroups":"Plegar todos los grupos","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.time":"Hora del recordatorio","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas y estados","todo.settings.section.groups":"Grupos","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.colStatus":"Estado","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos solo de Tareas","todo.settings.localGroupsDesc":"Privados de Tareas: cr\xE9alos, ren\xF3mbralos, color\xE9alos y reord\xE9nalos aqu\xED.","todo.settings.useSharedGroups":"Grupos compartidos","todo.settings.useSharedGroupsDesc":"Grupos que tambi\xE9n usan Calendario, Contactos y Espacios de trabajo. Un cambio aqu\xED los cambia en todas partes.","todo.settings.useLocalGroups":"Grupos solo de Tareas","todo.settings.useLocalGroupsDesc":"Grupos que solo existen en Tareas. Ning\xFAn otro plugin los ve.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupRemove":"Quitar grupo","todo.settings.localGroupRemoveBlocked":"Todav\xEDa lo usan {{count}} tareas: mu\xE9velas a otro grupo para eliminarlo","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.settings.collapsedGroupsSetting":"Grupos plegados de la barra lateral","todo.settings.groupOrderSetting":"Orden de los grupos de la barra lateral","todo.settings.localGroupUsage":"{{count}} tareas usan este grupo","todo.settings.localGroupNewColor":"Color del nuevo grupo","todo.settings.localGroupDuplicate":"Ya existe un grupo con ese nombre.","todo.settings.localSubgroupAdd":"A\xF1adir subgrupo","todo.settings.localSubgroupAddTo":"A\xF1adir subgrupo a {{p0}}","todo.settings.localSubgroupNew":"Nuevo subgrupo","todo.settings.localGroupRemoveSubgroups":"A\xFAn tiene subgrupos \u2014 elim\xEDnalos o mu\xE9velos primero","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.info.todayTodo":"Hoy por hacer","todo.info.todayCompleted":"Hoy completadas","todo.info.weekTodo":"Esta semana por hacer","todo.info.weekCompleted":"Esta semana completadas","todo.info.allTodo":"Todas por hacer","todo.info.allCompleted":"Todas completadas","todo.task.tab":"Tarea","todo.task.empty":"Selecciona una tarea en la tabla para verla aqu\xED.","todo.task.mapCredit":"\xA9 Colaboradores de OpenStreetMap","todo.task.mapOf":"Mapa de {{p0}}","todo.task.zoomIn":"Acercar","todo.task.zoomOut":"Alejar"};var fl={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.noGroup":"Sans groupe","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.due.overdue":"En retard","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.manage":"G\xE9rer les groupes","todo.group.selectAll":"Tout s\xE9lectionner","todo.linkedFile":"Fichier li\xE9","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.moreFiles":"+{{p0}} de plus","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Groupes","todo.view.expandGroup":"Afficher les sous-groupes de {{p0}}","todo.view.collapseGroup":"Masquer les sous-groupes de {{p0}}","todo.view.expandAllGroups":"D\xE9plier tous les groupes","todo.view.collapseAllGroups":"Replier tous les groupes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.time":"Heure du rappel","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes et statuts","todo.settings.section.groups":"Groupes","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.colStatus":"Statut","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.localGroupsDesc":"R\xE9serv\xE9s \xE0 T\xE2ches : cr\xE9ez-les, renommez-les, colorez-les et r\xE9organisez-les ici.","todo.settings.useSharedGroups":"Groupes partag\xE9s","todo.settings.useSharedGroupsDesc":"Groupes qu\u2019utilisent aussi Calendrier, Contacts et Espaces de travail. Une modification ici les modifie partout.","todo.settings.useLocalGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.useLocalGroupsDesc":"Groupes qui n\u2019existent que dans T\xE2ches. Aucun autre plugin ne les voit.","todo.settings.localGroupName":"Nom","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupRemove":"Supprimer le groupe","todo.settings.localGroupRemoveBlocked":"Encore utilis\xE9 par {{count}} t\xE2ches \u2014 d\xE9placez-les dans un autre groupe pour le supprimer","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.settings.collapsedGroupsSetting":"Groupes repli\xE9s de la barre lat\xE9rale","todo.settings.groupOrderSetting":"Ordre des groupes de la barre lat\xE9rale","todo.settings.localGroupUsage":"{{count}} t\xE2ches utilisent ce groupe","todo.settings.localGroupNewColor":"Couleur du nouveau groupe","todo.settings.localGroupDuplicate":"Un groupe portant ce nom existe d\xE9j\xE0.","todo.settings.localSubgroupAdd":"Ajouter un sous-groupe","todo.settings.localSubgroupAddTo":"Ajouter un sous-groupe \xE0 {{p0}}","todo.settings.localSubgroupNew":"Nouveau sous-groupe","todo.settings.localGroupRemoveSubgroups":"Contient encore des sous-groupes \u2014 supprimez-les ou d\xE9placez-les d\u2019abord","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.info.todayTodo":"Aujourd\u2019hui \xE0 faire","todo.info.todayCompleted":"Aujourd\u2019hui termin\xE9es","todo.info.weekTodo":"Cette semaine \xE0 faire","todo.info.weekCompleted":"Cette semaine termin\xE9es","todo.info.allTodo":"Toutes \xE0 faire","todo.info.allCompleted":"Toutes termin\xE9es","todo.task.tab":"T\xE2che","todo.task.empty":"S\xE9lectionnez une t\xE2che dans le tableau pour la voir ici.","todo.task.mapCredit":"\xA9 Contributeurs OpenStreetMap","todo.task.mapOf":"Carte de {{p0}}","todo.task.zoomIn":"Zoom avant","todo.task.zoomOut":"Zoom arri\xE8re"};var gl={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.due.overdue":"\u903E\u671F","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.moreFiles":"+{{p0}} \u4E2A","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u5206\u7EC4","todo.view.expandGroup":"\u663E\u793A {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.collapseGroup":"\u9690\u85CF {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.expandAllGroups":"\u5C55\u5F00\u6240\u6709\u5206\u7EC4","todo.view.collapseAllGroups":"\u6298\u53E0\u6240\u6709\u5206\u7EC4","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.time":"\u63D0\u9192\u65F6\u95F4","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868\u548C\u72B6\u6001","todo.settings.section.groups":"\u5206\u7EC4","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5C5E\u4E8E\u5F85\u529E\u4E8B\u9879\uFF1A\u5728\u6B64\u521B\u5EFA\u3001\u91CD\u547D\u540D\u3001\u7740\u8272\u548C\u6392\u5E8F\u3002","todo.settings.useSharedGroups":"\u5171\u4EAB\u5206\u7EC4","todo.settings.useSharedGroupsDesc":"\u65E5\u5386\u3001\u8054\u7CFB\u4EBA\u548C\u5DE5\u4F5C\u533A\u4E5F\u4F1A\u4F7F\u7528\u7684\u5206\u7EC4\u3002\u5728\u6B64\u5904\u7684\u66F4\u6539\u4F1A\u540C\u6B65\u5230\u6240\u6709\u5730\u65B9\u3002","todo.settings.useLocalGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.useLocalGroupsDesc":"\u4EC5\u5B58\u5728\u4E8E\u5F85\u529E\u4E8B\u9879\u4E2D\u7684\u5206\u7EC4\u3002\u5176\u4ED6\u63D2\u4EF6\u90FD\u770B\u4E0D\u5230\u5B83\u4EEC\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupRemove":"\u79FB\u9664\u5206\u7EC4","todo.settings.localGroupRemoveBlocked":"\u4ECD\u6709 {{count}} \u4E2A\u4EFB\u52A1\u5728\u4F7F\u7528 \u2014 \u5C06\u5B83\u4EEC\u79FB\u5230\u5176\u4ED6\u5206\u7EC4\u540E\u624D\u80FD\u5220\u9664","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.settings.collapsedGroupsSetting":"\u4FA7\u8FB9\u680F\u4E2D\u6298\u53E0\u7684\u5206\u7EC4","todo.settings.groupOrderSetting":"\u4FA7\u8FB9\u680F\u5206\u7EC4\u7684\u987A\u5E8F","todo.settings.localGroupUsage":"{{count}} \u4E2A\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4","todo.settings.localGroupNewColor":"\u65B0\u5206\u7EC4\u7684\u989C\u8272","todo.settings.localGroupDuplicate":"\u5DF2\u5B58\u5728\u540C\u540D\u5206\u7EC4\u3002","todo.settings.localSubgroupAdd":"\u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupAddTo":"\u4E3A {{p0}} \u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupNew":"\u65B0\u5B50\u5206\u7EC4","todo.settings.localGroupRemoveSubgroups":"\u4ECD\u6709\u5B50\u5206\u7EC4 \u2014 \u8BF7\u5148\u79FB\u9664\u6216\u79FB\u52A8\u5B83\u4EEC","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.info.todayTodo":"\u4ECA\u5929\u5F85\u529E","todo.info.todayCompleted":"\u4ECA\u5929\u5DF2\u5B8C\u6210","todo.info.weekTodo":"\u672C\u5468\u5F85\u529E","todo.info.weekCompleted":"\u672C\u5468\u5DF2\u5B8C\u6210","todo.info.allTodo":"\u5168\u90E8\u5F85\u529E","todo.info.allCompleted":"\u5168\u90E8\u5DF2\u5B8C\u6210","todo.task.tab":"\u4EFB\u52A1","todo.task.empty":"\u5728\u8868\u683C\u4E2D\u9009\u62E9\u4E00\u4E2A\u4EFB\u52A1\u5373\u53EF\u5728\u6B64\u67E5\u770B\u3002","todo.task.mapCredit":"\xA9 OpenStreetMap \u8D21\u732E\u8005","todo.task.mapOf":"{{p0}} \u7684\u5730\u56FE","todo.task.zoomIn":"\u653E\u5927","todo.task.zoomOut":"\u7F29\u5C0F"};var hl={en:ul,de:pl,es:ml,fr:fl,"zh-CN":gl};function zs(e,t){return(hl.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,s)=>String(t?.[s]??""))}var bl=zs,yl=zs;function wl(e){e.ui.registerCatalogs(hl),yl=(t,r)=>{let n=e.ui.t(t,r);return n===t?zs(t,r):n}}function d(e,t){return yl(e,t)}var vl={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},xf={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},Tf={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},xl=()=>{};function Tl(e){xl=e}function kl(e){let t=vl[e];return t?d(t):e}function st(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=xl(e);if(r)return r;let n=vl[e];return n?d(n):t||e}function Oe(e){return d(xf[e])}function Sl(e){return d(Tf[e])}function kf(e){if(typeof e!="string"||!ln(e))return!1;let t=pr(e);if(!t)return!1;let r=gs();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function Sn(e){let t=e&&typeof e=="object"?e:{},r=fn(t.custom),n=new Set(r.map(T=>T.id)),s=Array.isArray(t.active)?t.active:oo,a=[];for(let T of s)typeof T!="string"||!(ks.has(T)||n.has(T))||a.includes(T)||a.push(T);let i=[...Po,...r.map(T=>T.id)],l=T=>T&&typeof T=="object"?T:{},p=l(t.colors),c=Object.fromEntries(i.map(T=>{let F=Io.get(T)?.color??mn;return[T,kf(p[T])?p[T]:F]})),u=l(t.textColors),m=Object.fromEntries(i.map(T=>[T,xs.includes(u[T])?u[T]:"auto"])),b=l(t.strikethrough),h=Object.fromEntries(i.map(T=>[T,typeof b[T]=="boolean"?b[T]:Kd.includes(T)||r.some(F=>F.id===T&&F.done)])),w="text",k=(T,F)=>typeof T=="string"?T.replace(/[\u0000-\u001f]/g," ").trim().slice(0,F):"",I=(Array.isArray(t.removed)?t.removed:[]).filter(T=>typeof T=="string"&&ks.has(T)),M=Object.fromEntries(i.map(T=>[T,k(l(t.labels)[T],No)]).filter(([,T])=>T)),A=Object.fromEntries(i.filter(T=>T!=="open"&&T!=="completed").map(T=>[T,k(l(t.icons)[T],80)]).filter(([,T])=>T&&/^[^/\\]+$/.test(T))),S=Object.fromEntries(oo.map(T=>[T,l(t.done)[T]]).filter(([T,F])=>typeof F=="boolean"&&F!==Io.get(T)?.done));return{active:a.filter(T=>!I.includes(T)),custom:r,colors:c,textColors:m,strikethrough:h,style:w,labels:M,icons:A,done:S,removed:[...new Set(I)]}}var kr=null;function De(){let e=g?.settings.get()[pn],t=gs();if(kr&&kr.raw===e&&kr.palette===t)return kr.value;let r=Sn(e);return kr={raw:e,palette:t,value:r},r}function El(e){g.settings.set(pn,Sn(e))}Tl(e=>{let t=De();return t.labels[e]??t.custom.find(r=>r.id===e)?.label});function so(e=De()){return[...Po,...e.custom.map(t=>t.id)]}function Kt(e,t=De()){return Es(e,t)}function Ee(e,t){return jd(e,t??De())}function Sf(e){return`todo-st-${e}`}function Ef(e,t=De()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":Mt(t.colors[e]??mn)}function Se(e,t=De()){let r=e&&nt(e)?t.custom.find(s=>s.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??mn,done:r.done,cls:Sf(r.id),locked:!1,custom:!0};let n=e&&Io.get(e)||Ts[0];return{...n,label:t.labels[n.id]??st(n.id),done:t.done[n.id]??n.done,color:t.colors[n.id],custom:!1}}function kn(e=De()){return[Se("open",e),Se("completed",e),...e.active.map(t=>Se(t,e))]}function io(){return kn().map(e=>e.id)}function Al(e){return e==="open"||e==="completed"||De().active.includes(e)}function it(){let[e,t]=o.useState(()=>kn());return o.useEffect(()=>g.settings.subscribe(()=>t(kn())),[]),e}function Sr(e,t=io()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(s=>r.includes(s));return n.length?n:"all"}function En(e,t){return t==="all"||t.includes(ke(e))}function yt(){return kn().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:Te(e.color)}))}function Af(){let e=De();return so(e).map(t=>{let r=Se(t,e),n=Te(r.color),s=Ef(t,e),a=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${s}}`+a}).join("")}function Cl(){let[e,t]=o.useState(()=>De().style);return o.useEffect(()=>g.settings.subscribe(()=>t(De().style)),[]),e}function Dl(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=Af()};r();let n=g.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}var Cf=200,Fs=new WeakMap;function Df(e){let t=Fs.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=wn.map(s=>e.api.data.dataset(s).subscribe(a=>{if(r.full)return;let i=Vd(a,s);if(!i){r.full=!0,r.dirty.clear();return}for(let l of i)r.dirty.add(l);r.dirty.size>Cf&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(s=>s()),Fs.delete(e)}),Fs.set(e,r),t=r,t}var An=new WeakMap;function If(e){let t=An.get(e);if(!t){let r=e.api.backend.call("records.completionReady").then(n=>n===!0,()=>!1);r.then(n=>{!n&&An.get(e)===r&&An.delete(e)}),An.set(e,r),t=r}return t}async function Il(e,t,r){let n=[],s=new Map,a=qe(e.api.getState().groups);for(let p=0;p<(r?.length??1);p+=100){let{tasks:c,relations:u}=await Is(e,!1,r?.slice(p,p+100));for(let m of c)typeof m.completedAt=="string"&&m.completedAt&&s.set(String(m.id),m.completedAt);n.push(...Rt(c,u,a))}let i=t?[]:n.filter(p=>!s.has(p.id)).map(p=>p.id),l=i.length?await cl(e.api,i,e.assertActive,()=>so()):new Map;return n.map(p=>{let c=s.get(p.id);return{...p,historyLoaded:!1,completionSummary:c?{changedAt:c}:l.get(p.id)??null}})}function Ye(e=ye()){try{e.assertActive()}catch(t){return Promise.reject(t)}return If(e).then(t=>Nf(e,t))}function Nf(e,t){let r=Df(e);return yr(e,"list",wn,"",async()=>{let n=JSON.stringify(qe(e.api.getState().groups));if(r.full||!r.value||r.groups!==n){r.full=!1,r.dirty.clear();try{r.value=await Il(e,t),r.groups=n}catch(c){throw r.full=!0,c}return r.value}if(!r.dirty.size)return r.value;let s=[...r.dirty];r.dirty.clear();let a;try{a=await Il(e,t,s)}catch(c){for(let u of s)r.dirty.add(u);throw c}let i=new Map(a.map(c=>[c.id,c])),l=new Set(s),p=[];for(let c of r.value)if(!l.has(c.id))p.push(c);else{let u=i.get(c.id);u&&(p.push(u),i.delete(c.id))}return p.push(...i.values()),r.value=p,p})}var $s="localGroups",Er=200,Mo=60,Oo=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function Us(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ks(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(a=>[a.name,...a.aliases??[]]).map(J)),n=new Set,s=[];for(let a of e){if(!a||typeof a!="object")continue;let i=a,l=Oo(i.id,64),p=Oo(i.name,Mo),c=Oo(i.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(l)||n.has(l)||!p||r.has(J(p))||!c)continue;let u=Array.isArray(i.aliases)?[...new Set(i.aliases.map(b=>Oo(b,Mo)).filter(b=>b&&J(b)!==J(p)&&!r.has(J(b))))].slice(0,20):[];n.add(l),r.add(J(p)),u.forEach(b=>r.add(J(b)));let m=Oo(i.parent,64);if(s.push({id:l,name:p,color:c,...u.length?{aliases:u}:{},.../^local-[a-z0-9]{1,32}$/.test(m)?{parent:m}:{}}),s.length>=Er)break}return Eo(s)}function Nl(e,t){let r=Oo(t,Mo);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(s=>J(s)!==J(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function js(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{},...r.parent?{parent:r.parent}:{}}))]}var Ys="useSharedGroups",Xs="useLocalGroups";function Bs(){let e=g?.settings.get()??{};return{shared:e[Ys]!==!1,local:e[Xs]!==!1}}function Cn(){return qe(g?.getState().groups)}var Ol=()=>Ks(g?.settings.get()[$s],Cn()),Zs=null,Hs=new Set;function Pl(e){Zs=e,Tr();for(let t of[...Hs])t()}function _o(){return Zs?.groups??Ol()}async function Js(e){let t={groups:Ks(e,Cn())};Pl(t);let r=()=>{Zs===t&&Pl(null)};try{await g.settings.set($s,t.groups)}catch(i){throw r(),i}if(JSON.stringify(Ol())===JSON.stringify(t.groups)){r();return}let n=()=>{s(),clearTimeout(a),r()},s=g.settings.subscribe(n),a=setTimeout(n,2e3)}var Ml="groupOrder";function _l(e){let t=g?.settings.get()[Ml],r=Array.isArray(t)?t.filter(s=>typeof s=="string"):[];if(!r.length)return e;let n=new Map(r.map((s,a)=>[s,a]));return e.filter(s=>s.parent===void 0).map((s,a)=>({group:s,at:n.get(s.id)??r.length+a})).sort((s,a)=>s.at-a.at).flatMap(({group:s})=>[s,...e.filter(a=>a.parent===s.id)])}function lo(){return _l(js(Cn(),_o()))}function Je(){let e=Bs();return _l(js(e.shared?Cn():[],e.local?_o():[]))}al(lo);var Ll;dl(()=>(g&&Ll!==g&&(Ll=g,g.subscribe(Tr),g.settings.subscribe(Tr)),g?lo():[]));function Ar(e){let t=g.subscribe(e),r=g.settings.subscribe(e);return Hs.add(e),()=>{t(),r(),Hs.delete(e)}}function Qe(){let[e,t]=o.useState(Je);return o.useEffect(()=>Ar(()=>t(Je())),[]),e}function Gl(){let[e,t]=o.useState(lo);return o.useEffect(()=>Ar(()=>t(lo())),[]),e}function Rl(){let[e,t]=o.useState(Bs);return o.useEffect(()=>g.settings.subscribe(()=>t(Bs())),[]),e}function zl(){let[e,t]=o.useState(_o);return o.useEffect(()=>Ar(()=>t(_o())),[]),e}var Ws="collapsedGroups";function Vs(){let e=g?.settings.get()[Ws];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fl(){let[e,t]=o.useState(Vs);o.useEffect(()=>g.settings.subscribe(()=>t(s=>{let a=Vs();return a.length===s.length&&a.every((i,l)=>i===s[l])?s:a})),[]);let r=o.useCallback(s=>{let a=Vs(),i=a.includes(s)?a.filter(l=>l!==s):[...a,s];t(i),g.settings.set(Ws,i)},[]),n=o.useCallback(s=>{t(s),g.settings.set(Ws,s)},[]);return[o.useMemo(()=>new Set(e),[e]),r,n]}var qs=e=>/^local-[a-z0-9]{1,32}$/.test(e);function $l(e,t,r,n,s=!1){let a=Je(),i=a.find(b=>b.id===e);if(!i)return null;let l=n>0||n===0&&i.parent!==void 0,p=s&&r==="after"?a.filter(b=>b.parent===t).at(-1):void 0,c=p?Ao(a,e,p.id,"after",!1):Ao(a,e,t,r,l);if(!c||c.parent===null||qs(c.parent)===qs(e))return c;let u=a.filter(b=>b.id!==e&&b.parent!==e);return{parent:null,before:u.slice(u.findIndex(b=>b.id===c.parent)+1).find(b=>b.parent===void 0)?.id??null}}async function Qs(e,t){let r=async i=>{qs(e)?await Js(mr(_o(),e,i)):await g.sharedState.mutateGroup({kind:"move",id:e,...i})};if(t.parent!==null){await r(t);return}let n=lo(),s=n.filter(i=>i.parent===void 0&&i.id!==e).map(i=>i.id),a=t.before===null?-1:s.indexOf(t.before);s.splice(a<0?s.length:a,0,e),await g.settings.set(Ml,s),n.find(i=>i.id===e)?.parent!==void 0&&await r({parent:null,before:null})}function Ul(){let e=ye(),t=!1,r=()=>{Ye(e).then(s=>{if(e.assertActive(),t)return;let a=new Set(_o().flatMap(i=>[i.name,...i.aliases??[]]).map(J));e.api.workspace.reportGroupUsage(ws(s.map(i=>i.group).filter(i=>!i||!a.has(J(i)))))}).catch(()=>{})};r();let n=zt(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function Pf(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function Lf(e){let t=e.toLowerCase();return Pf(t)?t:"yyyy-mm-dd"}function Kl(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,s,a]=r;return Lf(t).replace("yyyy",n).replace("mm",s).replace("dd",a)}var Of="ddd d mmm",Mf=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function _f(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(i=>!Mf.has(i)))return!1;let r=t.filter(i=>i==="d"||i==="dd"),n=t.filter(i=>i==="ddd"||i==="dddd"),s=t.filter(i=>i==="mmm"||i==="mmmm"),a=t.filter(i=>i==="yyyy");return r.length===1&&n.length<=1&&s.length===1&&a.length<=1&&new Set(t).size===t.length}function Gf(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return _f(t)?t:Of}var Cr=new Map;function Rf(e,t,r){let n=`${r??""}:${t}`,s=Cr.get(n);return s||(s=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),Cr.size>=64&&Cr.delete(Cr.keys().next().value),Cr.set(n,s)),s.format(e)}function jl(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,s,a,i]=n,l=new Date(Number(s),Number(a)-1,Number(i),12);return Gf(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(i)):p==="dd"?i:p==="yyyy"?s:Rf(l,p,r))}function se(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function Dn(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));if(!t||!r||!n)return null;let s=new Date(t,r-1,n);return s.setHours(0,0,0,0),s}function wt(e,t){let r=Dn(e);return r?(r.setDate(r.getDate()+t),se(r)):e}var Ro=new Intl.Collator(void 0,{sensitivity:"base"}),zo={high:3,medium:2,low:1,normal:0},Bl=/^\d{4}-\d{2}-\d{2}$/,zf=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,Ff=/^\d{2}:\d{2}$/,$f=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,Hl=(e,t)=>1+Number(e.slice(t,t+2))*100+Number(e.slice(t+3,t+5));function In(e){return Bl.test(e)?Number(e.slice(0,4))*1e4+Number(e.slice(5,7))*100+Number(e.slice(8,10)):NaN}function Uf(e){return e?Bl.test(e)?In(e)*1e4:zf.test(e)?In(e.slice(0,10))*1e4+Hl(e,11):NaN:-1}function Nn(e){return $f.test(e)?Date.parse(e):NaN}var Vl=new WeakMap;function Wl(e){let t=Vl.get(e);if(t===void 0){let r=e.startTime?Ff.test(e.startTime)?Hl(e.startTime,0):NaN:0,n={due:Uf(e.dueDate||""),start:r,priority:zo[e.priority],flagged:e.flagged?1:0,completed:e.completed?1:0,created:Nn(e.createdAt),updated:Nn(e.updatedAt)};t=typeof e.title=="string"&&Object.values(n).every(Number.isFinite)?n:null,Vl.set(e,t)}return t}var Pn=1024,Kf=64,jf=2e5,Ve=[],ut=new Map,Go=0;function Vf(){Ve.forEach((e,t)=>{e.names.key=t*Pn})}function Bf(e){let t=0,r=Ve.length;for(;t<r;){let i=t+r>>>1,l=Ro.compare(e,Ve[i].title);if(l===0){ut.set(e,Ve[i].names);return}l<0?r=i:t=i+1}let n=t>0?Ve[t-1].names.key:null,s=t<Ve.length?Ve[t].names.key:null,a={key:n===null?s===null?0:s-Pn:s===null?n+Pn:(n+s)/2};Ve.splice(t,0,{title:e,names:a}),ut.set(e,a),(n!==null&&a.key<=n||s!==null&&a.key>=s)&&Vf()}function Hf(e){let t=[...ut.keys(),...e].sort(Ro.compare);Ve=[],ut.clear(),Go++;for(let r of t){let n=Ve[Ve.length-1];if(n&&Ro.compare(n.title,r)===0)ut.set(r,n.names);else{let s={key:Ve.length*Pn};Ve.push({title:r,names:s}),ut.set(r,s)}}}function ql(e,t){ut.size>jf&&Wf();let r=null;for(let n=0;n<t.length;n++){let s=t[n];if(s.namesEpoch===Go)continue;let a=ut.get(e[n].title);a?(s.names=a,s.namesEpoch=Go):(r??(r=new Set)).add(e[n].title)}if(r){if(r.size>Kf)Hf(r);else for(let n of r)Bf(n);for(let n=0;n<t.length;n++){let s=t[n];s.namesEpoch!==Go&&(s.names=ut.get(e[n].title),s.namesEpoch=Go)}}}function Wf(){Ve=[],ut.clear(),Go++}var qf={name:0,priority:1,flagged:2,due:3,created:4,updated:5,sections:6,completion:7,stamp:8},Xl=9,Yf=5,Xf=32,Zf=1e5,Zl="order",Jf=["order_rows","order_run","order_output","order_sections","order_reset"],ei=null;function Yl(e){ei=e}async function Qf(e){let t={},r=await e.wasm.instantiate(Zl,{env:t}),n=t.memory;if(!n)throw new Error("order module memory was not handed over");for(let a of Jf)if(typeof r.exports[a]!="function")throw new Error(`order module lacks ${a}`);let s=r.exports;return(a,i,l,p,c)=>{let u=s.order_rows(a);if(i(new Float64Array(n.buffer,u,a*Xl)),!s.order_run(a,l,p?1:0,c))return null;let m=s.order_output(),b=s.order_sections();return{order:new Uint32Array(n.buffer,m,a),sections:new Uint32Array(n.buffer,b,Yf)}}}function Jl(e){let t=!1;return e.wasm?.list().some(r=>r.id===Zl)&&Qf(e).then(r=>{t||Yl(r)},r=>console.warn("To-Do order kernel unavailable; sorting in TypeScript",r)),()=>{t=!0,Yl(null)}}function Fo(e,t,r={}){let n=e.length;if(!ei||n<Xf||n>Zf)return null;let s=t==="sections"?In(r.today??""):0;if(Number.isNaN(s))return null;let a=new Array(n),i=r.stamp;for(let c=0;c<n;c++){let u=Wl(e[c]);if(!u)return null;if(a[c]=u,!i)continue;let m=i(e[c]);if(u.stampText!==m&&(u.stampText=m,u.stamp=Nn(m)),Number.isNaN(u.stamp))return null}ql(e,a);let l=ei(n,c=>{for(let u=0,m=0;u<n;u++,m+=Xl){let b=a[u];c[m]=b.due,c[m+1]=b.start,c[m+2]=b.priority,c[m+3]=b.flagged,c[m+4]=b.completed,c[m+5]=b.created,c[m+6]=b.updated,c[m+7]=i?b.stamp:0,c[m+8]=b.names.key}},qf[t],r.descending===!0,s);if(!l)return null;let p=new Array(n);for(let c=0;c<n;c++)p[c]=e[l.order[c]];return{ordered:p,sections:[...l.sections]}}var Xe=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}],$o={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"};function co(e,t){return Ro.compare(e.title,t.title)}function Ql(e,t,r){if(r==="name")return co(e,t);if(r==="priority"){let a=zo[t.priority]-zo[e.priority];return a!==0?a:uo(e,t)}if(r==="flagged"){let a=+!!t.flagged-+!!e.flagged;return a!==0?a:uo(e,t)}if(r==="due")return ec(e,t);let n=r==="created"?"createdAt":"updatedAt",s=e[n].localeCompare(t[n]);return s!==0?s:co(e,t)}function ec(e,t,r=!1){let n=e.dueDate||"",s=t.dueDate||"";if(!n&&!s)return uo(e,t);if(!n)return-1;if(!s)return 1;let a=r?s.localeCompare(n):n.localeCompare(s);return a!==0?a:uo(e,t)}function ti(e,t){let r=zo[t.priority]-zo[e.priority];return r!==0?r:co(e,t)}function uo(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let s=r.localeCompare(n);if(s!==0)return s}else{if(r)return-1;if(n)return 1}return ti(e,t)}function tc(e,t,r){let n=new Map(e.map(a=>[a,t(a)])),s=a=>a===void 0||a==="";return[...e].sort((a,i)=>{let l=n.get(a),p=n.get(i);if(s(l)!==s(p))return s(l)?1:-1;let c=0;return!s(l)&&!s(p)&&(c=typeof l=="number"&&typeof p=="number"?l-p:Ro.compare(String(l),String(p))),c!==0?r==="asc"?c:-c:co(a,i)})}function Uo(e,t,r){let n=Fo(e,t,{descending:r==="desc"});return n?n.ordered:t==="due"&&r==="desc"?[...e].sort((s,a)=>ec(s,a,!0)):[...e].sort(r==="asc"?(s,a)=>Ql(s,a,t):(s,a)=>-Ql(s,a,t))}function Me(e,t="dd-mm-yyyy"){return e?Kl(e,t):""}function Ln(e,t,r="ddd d mmm"){return jl(e.slice(0,10),r,t)}function Be(e,t,r,n,s="dd-mm-yyyy"){if(!e)return"";let a=e.slice(0,10);if(a===t)return r.today;let[i,l,p]=a.split("-").map(Number),[c,u,m]=t.split("-").map(Number);if(!i||!l||!p||!c||!u||!m)return Me(e,s);let b=new Date(i,l-1,p),h=new Date(c,u-1,m),w=Math.round((b.getTime()-h.getTime())/864e5);return w===1?r.tomorrow:w===-1?r.yesterday:w>1&&w<7?b.toLocaleDateString(n,{weekday:"long"}):Me(e,s)}var Xx=new Date(2023,0,1,12);var eg={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Dr(e){return eg[e??""]??1}function oc(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function tg(e,t){return(e.getDay()-t+7)%7}function rc(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-tg(e,t))}function po(e){let[t,r,n]=e.split("-").map(s=>parseInt(s,10));return new Date(t,(r||1)-1,n||1)}var Ko=["overdue","today","upcoming","someday","completed"],nc={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"},pt=(e=new Date)=>se(e);function On(e,t=pt()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]},n=Fo(e,"sections",{today:t});if(n){let a=0;return Ko.forEach((i,l)=>{r[i]=n.ordered.slice(a,a+=n.sections[l])}),r}for(let a of e){if(a.completed){r.completed.push(a);continue}let i=a.dueDate?.slice(0,10)??"";i?i<t?r.overdue.push(a):i===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let s=(a,i)=>a.dueDate.localeCompare(i.dueDate)||uo(a,i);return r.overdue.sort(s),r.upcoming.sort(s),r.today.sort(uo),r.someday.sort(ti),r.completed.sort((a,i)=>i.updatedAt.localeCompare(a.updatedAt)||co(a,i)),r}function oi(e){if(Tn(e))return e.completionSummary?.changedAt||e.updatedAt||e.createdAt;let t=e.statusHistory??[];for(let r=t.length-1;r>=0;r--){let{to:n,changedAt:s}=t[r];if(n==="completed"||n==="canceled")return s||e.updatedAt||e.createdAt}return e.updatedAt||e.createdAt}function ri(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):pt(t)}function ac(e,t){return Fo(e,"stamp",{stamp:r=>t.get(r)})?.ordered??[...e].sort((r,n)=>t.get(n).localeCompare(t.get(r)))}function sc(e){let t=new Map(e.map(s=>[s,oi(s)])),r=Fo(e,"completion",{stamp:s=>t.get(s)})?.ordered??[...e].sort((s,a)=>t.get(a).localeCompare(t.get(s))||co(s,a)),n=new Map;for(let s of r){let a=ri(t.get(s)),i=n.get(a);i?i.push(s):n.set(a,[s])}return[...n.entries()].sort(([s],[a])=>a.localeCompare(s)).map(([s,a])=>({key:s,kind:"daily",todos:a}))}function ni(e,t,r=1,n){let s=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),a=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:pt(rc(po(l),r)):"",i=new Map;for(let l of e){let p=a(s(l)),c=i.get(p);c?c.push(l):i.set(p,[l])}return[...i.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}function Mn(e,t=pt()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(i,l,p)=>{let c=p.toLowerCase();if(c==="today")r=t;else if(c==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=pt(u)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(i,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var He={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},ic={open:He,get:He,"edit-fields":He,add:He,complete:He,done:He,reopen:He,cancel:He,pause:He,status:He,edit:He,"open-page":{type:"null"},search:{type:"array",items:He,maxItems:20},list:{type:"array",items:He,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:He,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},jt={type:"string"},ai={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,jt])),priority:{type:"string",enum:ao},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:jt}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:jt,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function dc(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in ai.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(s=>typeof s=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let s=n;if(typeof s.name!="string"||Object.keys(s).some(a=>!["name","lng","lat"].includes(a))||s.lng!==void 0&&(typeof s.lng!="number"||!Number.isFinite(s.lng)||Math.abs(s.lng)>180)||s.lat!==void 0&&(typeof s.lat!="number"||!Number.isFinite(s.lat)||Math.abs(s.lat)>90)||s.lng===void 0!=(s.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!ao.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!io().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!Bd(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}var Ie=e=>typeof e=="string"?e:"",pc=e=>Ie(e?.query).trim();function jo(){return new Date().toISOString()}function lc(e){let t=e.trim();if(!t)return;let r=rt(Je(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function cc(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return se();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),se(t)}return e}function og(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function _n(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function rg(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(a=>a.id===r);if(n)return n;let s=e.filter(a=>a.title.toLowerCase().includes(r.toLowerCase()));if(s.length===0)throw new Error(`No todo matching "${r}".`);if(s.length===1)return s[0];throw new Error(`Multiple todos match "${r}":
${s.map((a,i)=>`  ${i+1}. ${a.title} [${a.id}]`).join(`
`)}
Re-run with the exact id.`)}function Rn(){let e=ye(),t={groups:qe(e.api.getState().groups),assertActive:e.assertActive};return{light:(r,n={})=>tl(e.api,r,{...t,...n}),byIds:r=>ol(e.api,r,t)}}async function si(e){let t=e.trim();if(!t)throw new Error("Expected a todo id or title.");let r=Rn(),n=await r.light(["id","title"],{where:{id:t}}),s=rg(n.length?n:await r.light(["id","title"]),e),[a]=await r.byIds([s.id]);if(!a)throw new Error(`No todo matching "${t}".`);return a}var Gn={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=pc(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Ir(e,t,r){let n=await si(e),s=t(n),a=await Ms(n.id,s,n.updatedAt);if(!a)throw new Error("Failed to update todo.");return{value:s,revert:{label:r(n),run:async()=>{if(!await wr(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await wr(n.id,a))throw new Error("Could not reapply the task change.")}}}}async function uc(e){return Ir(e,t=>({...t,completed:!0,status:"completed",updatedAt:jo()}),t=>`Complete \u201C${t.title}\u201D`)}async function ng(e,t,r){let n=await Ke(e);if(!n)throw new Error("The task no longer exists.");if(r!==void 0&&n.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&t.group!==n.group&&!Ae(Je()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let s=yn({...n,...t,...t.status?Ee(t.status):t.completed!==void 0?Ee(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:jo()});if(t.filePath&&s.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let i of["urls","attachments"])if(t[i]?.some(l=>!s[i]?.includes(l)))throw new Error(`Invalid task ${i}.`);let a=await Ms(e,s,n.updatedAt);if(!a)throw new Error("Could not save the task.");return{value:s,revert:{label:`Edit \u201C${n.title}\u201D`,run:async()=>{if(!await wr(e,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await wr(e,a))throw new Error("Could not reapply the task edit.")}}}}async function vt(e){let t=e??{},r=t.id??t.query,n={groups:Je(),statuses:io()};if(!r)return n;let s=await si(r);return{...n,records:[s]}}function mc(e){let t=n=>{let s=ic[n.id];if(!s)throw new Error(`Missing result contract for ${n.id}.`);let a={...n,outputSchema:s,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(a)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:jt,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let s=n,a=Ie(s?.id).trim();if(!a)throw new Error("Expected a task id.");if(s.newTab!==void 0&&typeof s.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return s.newTab===!0?{id:a,newTab:!0}:{id:a}}},run:async({id:n,newTab:s})=>{let a=await Ke(n);if(!a)throw new Error("The task no longer exists. Open To-Do to choose another task.");return s?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Le().request(n,"edit"),a}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:jt},required:["id"],additionalProperties:!1},parse:n=>{let s=Ie(n?.id).trim();if(!s)throw new Error("Expected a task id.");return{id:s}}},run:async({id:n})=>{let s=await Ke(n);if(!s)throw new Error("The task no longer exists.");return s}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:jt,values:ai,expectedUpdatedAt:jt},required:["id","values"],additionalProperties:!1},parse:n=>{let s=n,a=Ie(s?.id).trim();if(!a||s.expectedUpdatedAt!==void 0&&typeof s.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:a,values:dc(s.values),expectedUpdatedAt:s.expectedUpdatedAt}}},run:({id:n,values:s,expectedUpdatedAt:a})=>ng(n,s,a),revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let s=n??{},a=Ie(s.title).trim();if(!a)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:a,due:Ie(s.due),priority:Ie(s.priority),status:Ie(s.status),note:Ie(s.note),group:Ie(s.group)}},fromCli:(n,s)=>({title:n.join(" ").trim(),due:s.due,priority:s.priority,status:s.status,note:s.note,group:s.group})},run:async({title:n,due:s,priority:a,status:i,note:l,group:p})=>{let c=io();if(i&&!c.includes(i))throw new Error(`Status "${i}" is not enabled. One of: ${c.join(", ")}`);let u=yn({title:n,priority:a||"normal",status:i||void 0,dueDate:cc(s),note:l,group:lc(p)});if(!await Ft(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await $t(u.id)},reapply:async()=>{await Ft(u)}}}},formatCli:n=>`Added: ${_n(n)}`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:Gn,run:({query:n})=>uc(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:Gn,run:({query:n})=>uc(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let s=pc(n);if(!s)throw new Error('Usage: todo search "<query>"');return{query:s}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let s=_s(n),a=Rn(),i=await a.light(["id","title","note"],{withTags:vr(n).tags.length>0});return a.byIds(i.filter(l=>s(l.tags,l.title,l.note)).slice(0,20).map(l=>l.id))},formatCli:n=>n.length?n.map(_n).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:Gn,run:({query:n})=>Ir(n,s=>({...s,completed:!1,status:"open",updatedAt:jo()}),s=>`Reopen \u201C${s.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>vt(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:Gn,run:({query:s})=>{let a=n==="cancel"?"canceled":"onhold";if(!Al(a))throw new Error(`Status "${a}" is disabled in To-Do settings.`);return Ir(s,i=>({...i,...Ee(a),updatedAt:jo()}),i=>`${n==="cancel"?"Cancel":"Hold"} \u201C${i.title}\u201D`)},formatCli:s=>`${n==="cancel"?"Canceled":"On hold"}: ${s.title}`,revision:s=>vt(s),preview:s=>({changes:s})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let s=n??{},a=Ie(s.query).trim(),i=Ie(s.status),l=io();if(!a||!l.includes(i))throw new Error(`Usage: todo status "<id or title>" <${l.join("|")}>`);return{query:a,status:i}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:s})=>Ir(n,a=>({...a,...Ee(s),updatedAt:jo()}),a=>`Set status for \u201C${a.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let s=n??{},a=Ie(s.query).trim(),i=Ie(s.priority);if(!a)throw new Error("Expected a todo id or title.");if(i&&!ao.includes(i))throw new Error(`Invalid priority "${i}". One of: ${ao.join(", ")}`);return{query:a,title:typeof s.title=="string"?s.title:void 0,priority:i||void 0,due:typeof s.due=="string"?s.due:void 0,note:typeof s.note=="string"?s.note:void 0,tags:typeof s.tags=="string"?og(s.tags):void 0,group:typeof s.group=="string"?s.group:void 0}},fromCli:(n,s)=>({query:n.join(" "),title:s.title,priority:s.priority,due:s.due,note:s.note,tags:s.tag,group:s.group})},run:({query:n,title:s,priority:a,due:i,note:l,tags:p,group:c})=>Ir(n,u=>({...u,title:s??u.title,priority:a??u.priority,dueDate:i===void 0?u.dueDate:cc(i),note:l??u.note,tags:p??u.tags,group:c===void 0?u.group:lc(c),updatedAt:jo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${_n(n)}`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let s=n??{},a=Ie(s.query).trim();if(!a)throw new Error("Expected a todo id or title.");return{query:a,confirm:s.confirm===!0||s.confirm==="true"}},fromCli:(n,s)=>({query:n.join(" "),confirm:s.confirm})},run:async({query:n,confirm:s})=>{let a=await si(n);if(!s)return{value:{deleted:!1,todo:a,deletedCount:0},revert:null};if(!await $t(a.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:a,deletedCount:1},revert:{label:`Delete \u201C${a.title}\u201D`,run:async()=>{await Ft(a)},reapply:async()=>{await $t(a.id)}}}},formatCli:({deleted:n,todo:s,deletedCount:a})=>n?`Deleted: ${s.title}${a>1?` (${a} tasks)`:""}`:`Would delete "${s.title}" [${s.id}]. Re-run with --confirm to delete.`,revision:n=>vt(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let s=n??{};return{section:Ie(s.section),q:Ie(s.q)}},fromCli:(n,s)=>({section:Ie(s.section),q:Ie(s.q??s.search)})},run:async({section:n,q:s})=>{let a;if(s){let i=_s(s),l=vr(s);if(l.tags.length||l.text){let p=Rn(),c=(await p.light(["id","title","note"],{withTags:l.tags.length>0})).filter(u=>i(u.tags,u.title,u.note)).map(u=>u.id);c.length<=rl&&(a=await p.byIds(c))}a??(a=(await Ns()).filter(p=>i(p.tags,p.title,p.note)))}return a??(a=await Ns()),n&&Ko.includes(n)?On(a)[n]:a},formatCli:n=>n.length===0?"No matching todos.":n.map(_n).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Rn().light(["id","title","group"]),s=Je();return Ae(s).map(a=>({name:a,count:n.filter(i=>bt(a).has(J(i.group??""))).length}))},formatCli:n=>n.length?n.map(s=>`${s.name} (${s.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var fc={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var sg=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,ig=/^-\s+(.*)$/,dg=/^[A-Za-z][\w+.-]*:\/\//;function gc(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let s=n.trim();if(!s||s.startsWith("#"))continue;let a=s.match(ig);if(a){r?t.lists[r].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let i=dg.test(s)?null:s.match(sg);if(i){let l=i[1].trim().toLowerCase(),p=i[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=s)}return t}function hc(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let s=Number.parseInt(n,10);return!Number.isFinite(s)||s<1?null:Math.min(s,r)}async function zn(e){if(!e.id||!e.title.trim())return!1;let t=await Ft(e);return t&&g.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await $t(e.id)}),redo:async()=>({ok:await Ft(e)})}),t}async function mo(e,t,r,n){if(!e||!t.title.trim())return!1;let s=Tn(t),a=s?{...t}:t;s&&(delete a.historyLoaded,delete a.completionSummary);let i=await Ps(e,a,r,n),l=i?.previous,p=l?.title?{...l,group:Co(l.group,qe(g.getState().groups))??l.group}:null,c=s?{...a,history:t.history===void 0?p?.history:t.history}:t,u=i!==null;return u&&p&&g.undo.push({label:d("todo.undo.edit",{title:p.title}),undo:async()=>({ok:await Os(e,p)}),redo:async()=>({ok:await Os(e,c)})}),u}async function Fn(e){let t=await Ke(e),r=await $t(e);return r&&t&&g.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await Ft(t)}),redo:async()=>({ok:await $t(e)})}),r}async function Vt(e,t){return await g.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function ii(e,t){let r=await Ke(e);return r?mo(e,{...r,...Ee(t),updatedAt:new Date().toISOString()}):!1}var di="notes-todo-fence-styles";function lg(){if(document.getElementById(di))return;let e=document.createElement("style");e.id=di,e.textContent=`
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
`,document.head.appendChild(e)}var bc=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},cg=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function ug(e,t){let r=bc(),n=cg(7),s=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(a=>!(t.status==="open"&&a.completed||t.status==="completed"&&!a.completed||s&&!a.tags.some(i=>i.replace(/^#/,"").toLowerCase()===s)||t.due==="today"&&a.dueDate!==r||t.due==="week"&&(!a.dueDate||a.dueDate>n)||t.due==="overdue"&&(!a.dueDate||a.dueDate>=r||a.completed))).sort((a,i)=>(a.dueDate||"9999").localeCompare(i.dueDate||"9999")).slice(0,t.limit)}var pg=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=ye(),m=!0,b=()=>{Ye(u).then(w=>{u.assertActive(),m&&r(w)}).catch(()=>{})};b();let h=zt(b);return()=>{m=!1,h()}},[]);let n=gc(e),s=(n.values.status??"open").toLowerCase(),a=(n.values.due??"").toLowerCase(),i={tag:n.values.tag??n.bare??null,status:s==="completed"?"completed":s==="all"?"all":"open",due:a==="today"||a==="week"||a==="overdue"?a:null,limit:hc(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=ug(t,i),p=bc(),c=u=>{let m={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(b=>b&&b.map(h=>h.id===u.id?m:h)),mo(u.id,m)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>g.workspace.openMainTab({newTab:g.ui.hasModKey(u)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",i.tag?` \xB7 #${i.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,i.due?` \xB7 ${i.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>c(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},Xe.find(m=>m.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(m=>o.createElement("span",{key:m,className:"tag"},"#",m.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function yc(){let e=g.markdown.registerCodeBlockRenderer("todo",(t,r)=>(lg(),r.classList.add("todo-fence"),g.ui.renderReact(r,o.createElement(pg,{code:t}))),{examples:fc.todo});return()=>{e(),document.getElementById(di)?.remove()}}var ci=".valley/assets/icons/todo-icon",mg=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),fg=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function gg(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let t=new DOMParser().parseFromString(e,"image/svg+xml"),r=t.documentElement;if(r.localName!=="svg"||t.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!mg.has(n.tagName)){n.remove();continue}for(let s of[...n.attributes])(!fg.has(s.name)||/url\s*\(|javascript:|expression\s*\(/i.test(s.value))&&n.removeAttribute(s.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function hg(e,t){let n=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;for(let l of n.querySelectorAll("*"))for(let p of["stroke","fill"]){let c=l.getAttribute(p);c&&c!=="none"&&l.setAttribute(p,"#000")}let s=n.getAttribute("fill")==="none"?"none":"#000",a=[...n.childNodes].map(l=>new XMLSerializer().serializeToString(l)).join(""),i=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${s}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${a}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${i})"/></svg>`}function $n(){return g.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function li(){let e=$n();return e.pending||(e.pending=g.backend.call("taskIcons",{}).then(t=>{let r={};for(let[n,s]of Object.entries(t?.icons??{})){let a=gg(s);a&&(r[n]=hg(n,a))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function wc(){return $n().revision}function vc(e){return e?$n().icons[e]:void 0}function Un(){let e=$n();return o.useEffect(()=>{e.loaded||li()},[e]),o.useSyncExternalStore(o.useCallback(t=>(e.listeners.add(t),()=>{e.listeners.delete(t)}),[e]),()=>e.revision),e.icons}function xc(){li();let e,t=g.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${ci}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{li()},150))});return()=>{window.clearTimeout(e),t()}}function Tc(e){let r=g?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var Z=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Bt=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),bg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),yg=e=>o.createElement(Bt,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),wg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),vg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),xg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Tg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),kg=e=>o.createElement(Bt,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Sg={inprogress:wg,waiting:vg,onhold:yg,delegated:xg,deferred:Tg,completed:kg,canceled:bg},we=({status:e,dotCls:t,color:r})=>{let n=r?{color:r}:void 0,s=vc(Tc(e??"open"));if(s)return o.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${t}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:s}});let a=e?Sg[e]:void 0;return a?o.createElement(a,{className:`todo-status-menu-svg ${t}`,style:n}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:n})},dt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),xt=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),be=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Ht=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),kc=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),Sc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),Ec=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),Kn=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),jn=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),Vo=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Bo=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),Ac=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),Cc=e=>o.createElement(Z,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),Dc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),Ho=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),ve=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),Ic=e=>o.createElement(Bt,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),Nc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Vn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),Pc=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"})),je=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),Wt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),Bn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),Hn=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),qt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),Tt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),Lc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),Wn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),Oc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),_e=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),Yt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),kt=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),qn=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Yn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),Xn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),Wo=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Nr=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),mt=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),Pr=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Lr=e=>o.createElement(Z,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),Zn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),Mc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m7 20 5-5 5 5M7 4l5 5 5-5"})),qo=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Jn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),Qn=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),_c=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),Gc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),ea=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),Rc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),zc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"})),Fc=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),ta=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M5 12h14"})),$c=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),oa=e=>o.createElement(Z,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),ra=e=>o.createElement(Z,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"}));function fo(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;g.links.open({category:"location",value:t})}var Yo=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let s=o.useRef(null),[a,i]=o.useState([]),[l,p]=o.useState("idle"),[c,u]=o.useState(-1),[m,b]=o.useState(!1),h=o.useRef(null),w=o.useRef(0),k=o.useRef(!1);o.useEffect(()=>{s.current&&document.activeElement!==s.current&&(s.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{h.current!==null&&window.clearTimeout(h.current)},[]),o.useEffect(()=>{n&&s.current?.focus()},[n]);let I=S=>{h.current!==null&&window.clearTimeout(h.current);let T=++w.current;if(S.trim().length<2){i([]),p("idle"),b(!1);return}b(!0),p("searching"),h.current=window.setTimeout(()=>{g.resources.search({query:S.trim(),kinds:["place"],limit:8}).then(F=>{T===w.current&&(i(F),u(F.length?0:-1),p("done"))},()=>{T===w.current&&(i([]),u(-1),p("failed"))})},250)},M=S=>{let T=Number(S.metadata?.longitude),F=Number(S.metadata?.latitude),q=(S.value??S.label).trim();k.current=!0,w.current++,s.current&&(s.current.value=q),b(!1),i([]),t({name:q,...Number.isFinite(T)&&Number.isFinite(F)?{lng:T,lat:F}:{}})},A=()=>{let S=s.current?.value.trim()??"";if(w.current++,b(!1),k.current){k.current=!1;return}S!==(e?.name??"")&&t(S?{name:S}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(xt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:s,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":m,disabled:r,autoComplete:"off",spellCheck:!1,onChange:S=>{k.current=!1,I(S.currentTarget.value)},onFocus:S=>{S.currentTarget.value.trim().length>=2&&a.length&&b(!0)},onBlur:A,onKeyDown:S=>{S.nativeEvent.isComposing||(S.key==="ArrowDown"&&a.length?(S.preventDefault(),b(!0),u(T=>(T+1)%a.length)):S.key==="ArrowUp"&&a.length?(S.preventDefault(),u(T=>T<=0?a.length-1:T-1)):S.key==="Enter"?(S.preventDefault(),m&&a[c]?M(a[c]):A()):S.key==="Escape"&&m&&(S.preventDefault(),S.stopPropagation(),w.current++,b(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>fo(e)},o.createElement(Oc,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:S=>S.preventDefault(),onClick:()=>{w.current++,s.current&&(s.current.value=""),i([]),b(!1),t(void 0)}},o.createElement(be,null)))),m&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},l==="searching"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),l==="failed"&&o.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),a.map((S,T)=>o.createElement("li",{key:S.id,role:"option","aria-selected":T===c},o.createElement("button",{type:"button",className:"todo-location-hit"+(T===c?" is-active":""),onMouseDown:F=>F.preventDefault(),onMouseEnter:()=>u(T),onClick:()=>M(S)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(_e,null),S.label),S.description&&o.createElement("span",{className:"todo-location-hit-context"},S.description))))))};function Eg(){try{return Dr(g?.getState().weekStart)}catch{return 1}}function sa(e,t=Eg()){if(na.today!==e||na.weekStart!==t){let r=po(e).getDay();na={today:e,weekStart:t,end:wt(e,6-(r-t+7)%7)}}return na.end}var na={today:"",weekStart:-1,end:""},Ge={kind:"smart",id:"all"},aa=[{id:"scheduled",labelKey:"todo.view.scheduled",color:ge("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:ge("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:ge("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:ge("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:ge("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:ge("green"),dated:!1}],Or=aa.map(e=>e.id);function ui(e){let t=e&&typeof e=="object"?e:{},r=[];for(let c of Array.isArray(t.order)?t.order:[])typeof c=="string"&&Or.includes(c)&&!r.includes(c)&&r.push(c);Or.forEach((c,u)=>{if(r.includes(c))return;let m=Or.slice(0,u).reverse().find(b=>r.includes(b));r.splice(m?r.indexOf(m)+1:0,0,c)});let n=Array.isArray(t.hidden)?t.hidden:[],s=r.filter(c=>n.includes(c));s.length===r.length&&s.shift();let a=t.colors&&typeof t.colors=="object"?t.colors:{},i={};for(let c of Or){let u=a[c];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(i[c]=u)}let l=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let c of Or){let u=l[c];(u==="white"||u==="black")&&(p[c]=u)}return{order:r,hidden:s,colors:i,textColors:p}}function Kc(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>Mr(t,e))}function Mr(e,t){let r=aa.find(a=>a.id===e)??aa.find(a=>a.id==="all"),n=t?.colors[r.id],s=t?.textColors?.[r.id];return n||s?{...r,...n?{color:n}:{},...s?{textColor:s}:{}}:r}function _r(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}var Uc=new WeakMap;function Ag(e){let t=Uc.get(e),r=ll();if(t&&t.names===e.names&&t.count===e.names.length&&t.revision===r)return t.keys;let n=new Set(e.names.flatMap(s=>[...bt(s)]));return Uc.set(e,{names:e.names,count:e.names.length,revision:r,keys:n}),n}function Cg(e,t,r=se(new Date)){if(t.kind==="groups")return e.group?Ag(t).has(J(e.group)):t.includeUngrouped===!0;if(t.kind==="tag"){let n=t.name.toLowerCase();return e.tags?.some(s=>(s.charCodeAt(0)===35?s.slice(1):s).toLowerCase()===n)===!0}if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=sa(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function jc(e,t,r,n=se(new Date)){return Cg(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Vc(e,t=se(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=sa(t);for(let s of e){if(s.completed){r.completed++;continue}r.all++,s.flagged&&r.flagged++;let a=s.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=t&&r.today++,a<=n&&r.week++)}return r}function ia(e,t=!0){let r=new Map,n=0;for(let s of e){if(t&&s.completed)continue;let a=J(s.group??"");r.set(a,(r.get(a)??0)+1),s.group||n++}return{byKey:r,ungrouped:n}}function Gr(e,t){if(t===null)return e.ungrouped;let r=0;for(let n of bt(t))r+=e.byKey.get(n)??0;return r}function lt(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var Dg=aa.map(e=>e.id);function Rr(e){if(typeof e!="string")return Ge;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Ge}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Ge}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Ge;let n=r,s=Array.isArray(n.names)?[...new Set(n.names.filter(i=>typeof i=="string"&&!!i.trim()).map(i=>i.trim()))]:[],a=n.includeUngrouped===!0;return s.length||a?{kind:"groups",names:s,includeUngrouped:a}:Ge}catch{return Ge}return Dg.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Ge}function da(e,t){return lt(e)===lt(t)}function Fr(e,t,r){let n=()=>g.runtime.getOrCreate(e,()=>({value:null,listeners:new Set,...r?.()})),s=()=>{let i=n();return i.value===null&&(i.value=t()),i.value},a=i=>{let l=n();return l.listeners.add(i),()=>{l.listeners.delete(i)}};return{cell:n,get:s,peek:()=>n().value,set:i=>{let l=n();l.value=i;for(let p of l.listeners)p(i)},subscribe:a,reset:()=>{n().value=null},use:()=>{let[i,l]=o.useState(s);return o.useEffect(()=>a(l),[]),i}}}var Ig=300,Ng=["group","notes","status","location","tags"],Hc="panelChip",Wc="pageShowCompleted",pi="statusFilter",gi="dateBreakdown",qc="smartLists",mi="pageSearch",Yc="pageSort",Pg={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Xc=["due","priority","flagged","updated","created","name"];function Bc(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Xc.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:Sr(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function pa(e){let t=Pg[e],r=o.useCallback(()=>Bc(g.settings.get()[t]),[t]),[n,s]=o.useState(r);o.useEffect(()=>g.settings.subscribe(()=>s(r())),[r]);let a=o.useCallback(i=>{s(l=>{let p=Bc({...l,...i});return g.settings.set(t,p),p})},[t]);return[n,a]}function la(){let e=g.settings.get()[gi];return e==="weekly"||e==="daily"?e:"monthly"}function ma(){let[e,t]=o.useState(la);return o.useEffect(()=>g.settings.subscribe(()=>t(la())),[]),e}var $r=e=>g.settings.get()[e],Zc=()=>{let e=$r(mi);return typeof e=="string"?e.slice(0,500):""},St=Fr("todo.view",()=>Rr($r(Hc)),()=>({history:[],historyIndex:-1})),Xo=Fr("todo.showCompleted",()=>$r(Wc)===!0),Zo=Fr("todo.statusFilter",()=>{let e=$r(pi),t=Sr(e);return typeof e=="string"&&e!=="all"&&t!=="all"&&g.settings.set(pi,t),t}),Jo=Fr("todo.search",Zc),zr=Fr("todo.pageSort",()=>hi($r(Yc)));function Et(){let e=St.get(),t=St.cell();return t.historyIndex<0&&(t.history=[e],t.historyIndex=0),e}function Jc(e){St.set(e),g.settings.set(Hc,lt(e))}function et(e){if(da(Et(),e))return;let t=St.cell();t.history=[...t.history.slice(0,t.historyIndex+1),e].slice(-20),t.historyIndex=t.history.length-1,Jc(e)}function fa(){Et();let{history:e,historyIndex:t}=St.cell();return{canGoBack:t>0,canGoForward:t<e.length-1}}function Qo(e){Et();let t=St.cell(),r=t.historyIndex+e;r<0||r>=t.history.length||(t.historyIndex=r,Jc(t.history[r]))}var Ur=St.subscribe;function Qc(){ua();let e=St.cell();e.history=[],e.historyIndex=-1;for(let t of[St,Xo,Zo,Jo,zr])t.reset()}function ca(){return ui(g.settings.get()[qc])}function eu(e){g.settings.set(qc,ui(e))}function tu(){let[e,t]=o.useState(ca);return o.useEffect(()=>g.settings.subscribe(()=>t(ca())),[]),e}function ua(){let e=Jo.cell(),t=e.pending;t&&(e.pending=void 0,clearTimeout(t.timer),t.forget(),e.value!==null&&t.write(e.value))}function ga(e){let t=Jo.cell(),r=e.slice(0,500);if(t.value===r)return;if(Jo.set(r),r===""){t.pending&&(clearTimeout(t.pending.timer),t.pending.forget(),t.pending=void 0),g.settings.set(mi,r);return}t.pending&&clearTimeout(t.pending.timer);let n=g,s=i=>{n.settings.set(mi,i).catch(()=>{})},a=t.pending?.forget??ye()?.onDispose(ua)??(()=>{});t.pending={timer:setTimeout(ua,Ig),write:s,forget:a}}function ha(){return[Jo.use(),ga]}function hi(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||Ng.includes(t.field)||Xc.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function ou(e){let t=hi(e),r=zr.peek();r?.field===t.field&&r.dir===t.dir||(zr.set(t),g.settings.set(Yc,t))}function ru(){return[zr.use(),ou]}function ba(e=Et()){return{v:1,view:lt(e),showCompleted:Xo.get(),statusFilter:Zo.get(),search:Jo.peek()??Zc(),sort:zr.get()}}function ya(e,t=!1){return e.v!==1?!1:(t||et(Rr(e.view)),Ct(e.showCompleted===!0),fi(Sr(e.statusFilter)),ga(typeof e.search=="string"?e.search:""),ua(),ou(hi(e.sort)),!0)}function fi(e){let t=Sr(e),r=Zo.get();r==="all"&&t==="all"||r!=="all"&&t!=="all"&&r.length===t.length&&r.every((n,s)=>n===t[s])||(Zo.set(t),g.settings.set(pi,t))}function At(){let e=Zo.use();return o.useEffect(()=>g.settings.subscribe(()=>fi(Zo.get())),[]),[e,fi]}function wa(){let[e,t]=o.useState(Et);return o.useEffect(()=>Ur(t),[]),e}function Ct(e){Xo.peek()!==e&&(Xo.set(e),g.settings.set(Wc,e))}function Dt(){return[Xo.use(),()=>Ct(!Xo.get())]}function au(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=g.interop.services.providers(ko).find(n=>n.owner===g.pluginId)?.providerId;return g.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}function su(e,t){return hn(e)?e:t}function Lg(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function Og(e,t){return e.dueDate?{badges:Lg(e),icon:"list-todo",id:e.id,documentRef:{pluginId:g.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Ce(e.group,t)}:{}}:null}function Mg(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:su(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Ee(t.completed?"completed":null),updatedAt:new Date().toISOString()}}function nu(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var bi="attachment:",yi="url:";function _g(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:nu(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(a=>({id:`${bi}${a}`,label:nu(a),description:a,icon:"attachment"}))});let s=e.urls??[];return s.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:s.map(a=>({id:`${yi}${a}`,label:a,icon:"link"}))}),e.location&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function Gg(e,t){if(t.startsWith(bi)){let r=t.slice(bi.length);return(e.attachments??[]).includes(r)?(g.workspace.openFile(r),!0):!1}if(t.startsWith(yi)){let r=t.slice(yi.length);if(!(e.urls??[]).includes(r))return!1;let n=_t(r);return n?g.workspace.openFile(n):g.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await g.workspace.revealOwnPanel("left_sidebar"),et(e.completed?{kind:"smart",id:"completed"}:Ge),Le().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(g.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(fo(e.location),!0):!1;default:return!1}}function iu(){let e=ye(),t=to("calendar-source"),r=0,n=!0,s={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:c,endDate:u,limit:m,cursor:b})=>{let h,w=()=>`${t}:${r}`;if(b){let S;try{S=JSON.parse(b)}catch{throw new Error("Invalid Calendar source cursor.")}if(!S||S.startDate!==c||S.endDate!==u||S.limit!==m||S.revision!==w()||typeof S.cursor!="string"||!S.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");h=S.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let k=w(),I=await Jd(c,u,m,h);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(b&&k!==w())throw new Error("Calendar source cursor is stale; restart the range.");let M=Je(),A=w();return{items:I.todos.map(S=>Og(S,M)).filter(S=>!!S),revision:A,...I.cursor?{cursor:JSON.stringify({startDate:c,endDate:u,limit:m,revision:A,cursor:I.cursor})}:{}}},create:async(c,u)=>{if(u.endDate&&u.endDate!==c)return!1;let m=u.title?.trim();if(!m)return!1;let b=new Date().toISOString();return zn({id:to("todo"),title:m,completed:u.completed??!1,priority:su(u.priority,"normal"),dueDate:c,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:b,updatedAt:b})},update:async(c,u)=>{let m=await Ke(c);return m&&u.endDate&&u.endDate!==(u.date??m.dueDate)?!1:m?mo(m.id,Mg(m,u),m.updatedAt):!1},remove:c=>Fn(c),open:async c=>{let u=await Ke(c);await g.workspace.revealOwnPanel("left_sidebar"),u&&(et(u.completed?{kind:"smart",id:"completed"}:Ge),Le().request(u.id,"focus"))},configure:()=>g.workspace.openOwnSettings(),actions:async c=>{let u=await Ke(c);return u?_g(u):[]},runAction:async(c,u)=>{let m=await Ke(c);return m?Gg(m,u):!1}},a=()=>{g.interop.state.publish(lr,++r)};g.interop.state.publish(lr,r);let i=Yd(a),l=Ar(a),p=g.interop.services.provide(ko,s);return()=>{n=!1,i(),l(),p(),g.interop.state.publish(lr,null)}}var wi=e=>typeof e=="string"?e:"";function du(e){let t=wi(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function lu(e){let t={cardKind:"todo",open:async(r,n)=>{if(wi(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:wi(r.id)}),!0;let s=du(r.filePath)||du(n.path);return s?e.workspace.openFile(s,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(ss,t)}function tt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(s=>g.subscribeState(r,s),[r]);return o.useSyncExternalStore(n,g.getState,g.getState)}function va(){let e=o.useCallback(a=>g.interop.state.subscribe(tn,a),[]),t=o.useCallback(()=>g.interop.state.get(tn),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,s=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&s?{start:n,end:s}:null}),[s,n,r?.selectedDate])}function cu(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((a,i)=>{let l=new Set(r.current);i?l.add(a):l.delete(a),r.current=l,t(l)},[]),s=o.useCallback(a=>r.current.has(a),[]);return{pendingIds:e,isPending:s,setPending:n}}var Rg="todo.sharedTodos";function vi(){return g.runtime.getOrCreate(Rg,()=>({todos:[],listeners:new Set}))}function he(){return vi().todos}function It(e){let t=vi();t.todos=e;for(let r of t.listeners)r(e)}function ct(e){let t=vi();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var xi="list:",xa=e=>g.ui.hasModKey(e)||e.button===1,zg=e=>`${xi}${lt(e)}`;function go(e){return e?.startsWith(xi)?Rr(e.slice(xi.length)):null}var uu=e=>e?.pluginId===g.pluginId?e.instanceId:void 0;function Ta(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(Mr(e.id).labelKey)}function er(e,t){g.workspace.openMainTab({instanceId:zg(e),title:Ta(e),newTab:t})}function Kr(e,t=!1){t||go(uu(g.getState().activePluginTab))?er(e,t):et(e)}function pu(){let e=wa(),{activePluginTab:t}=tt("activePluginTab"),r=uu(t);return o.useMemo(()=>go(r),[r])??e}function mu(){let e=t=>g.workspace.setMainTabTitle(Ta(t));return e(Et()),Ur(e)}var Fg=["today","week","all"],fu=Fg.flatMap(e=>[`${e}Todo`,`${e}Completed`]),$g=e=>({id:e,label:bl(`todo.info.${e}`),labelKey:`todo.info.${e}`,kind:"text"});function Ug(e,t){let r=sa(t),n={todayTodo:0,todayCompleted:0,weekTodo:0,weekCompleted:0,allTodo:0,allCompleted:0};for(let a of e){let i=a.completed?"Completed":"Todo";n[`all${i}`]++;let l=a.dueDate?a.dueDate.slice(0,10):"";l&&(l<=t&&n[`today${i}`]++,l<=r&&n[`week${i}`]++)}let s={};for(let a of fu){let i=n[a];s[a]={text:`${d(`todo.info.${a}`)} \xB7 ${i}`,value:i}}return s}function gu(){let e=new Set,t=null,r={id:"todo.details",label:"To-Do",labelKey:"manifest.name",pluginViews:!0,items:[{id:"title",label:"Title",labelKey:"details.item.title",kind:"text"},...fu.map($g)],defaultItems:["title"],subscribe:i=>(e.add(i),()=>{e.delete(i)}),getSnapshot:()=>{let i=he(),l=se(),p=g.ui.language();return(!t||t.todos!==i||t.today!==l||t.language!==p)&&(t={todos:i,today:l,language:p,snapshot:{items:Ug(i,l)}}),t.snapshot}},n=g.interop.extensions.provide(us,r),s=()=>{for(let i of[...e])i()},a=[ct(s),g.subscribeState(["activePluginTab"],s)];return()=>{for(let i of a)i();n(),e.clear()}}function Kg({status:e,style:t}){let r=Se(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},st(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(we,{status:e==="open"?null:e,dotCls:r.cls}),st(e))}function ka({status:e}){return o.createElement(Kg,{status:e,style:Cl()})}var jg=[".ttf",".otf",".woff",".woff2"],Vg=[".csv"],Bg=[".base"],Hg=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Wg=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],qg=[...Hg,...Wg,".ico",".flavicon"];var Yg=[".pdf"],Xg=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus",".m4b",".mka",".weba",".3ga"],Zg=[".mp4",".mov",".m4v",".mkv",".webm",".ogv",".3gp",".3g2",".f4v"],Jg=[".srt",".vtt",".ass"],Qg=[".stl",".obj",".glb",".gltf"],eh=[".bin",".mtl"];function Ti(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var th={type:"core",id:"valley"},X=(e,t,r,n,s={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:th,...s});function oh(e){let t={};for(let[r,n]of e)for(let s of r)t[s]=n;return t}var rh=oh([[[".mermaid",".mmd"],X("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],X("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],X("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],X("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],X("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[jg,X("font","font","font","media")],[[".epub",".mobi",".azw3"],X("ebook","ebook","ebook","documents")],[[".djvu"],X("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],X("comic","comic","comic","documents")],[[".md",".markdown"],X("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],X("text","text","text","notes")],[[".json"],X("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],X("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Vg,X("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Bg,X("base","base","fallback","data")],[qg,X("image","image","image","media",{information:["identity","dimensions","exif"]})],[Yg,X("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Xg,X("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Zg,X("video","video","video","media",{information:["identity","media","video-codec"]})],[Jg,X("text","subtitle","text","media")],[Qg,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[eh,X("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],X("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],X("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],X("docx","word","opendocument","documents")],[[".ods"],X("csv","excel","opendocument","data")],[[".odp"],X("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],X("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],X("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],X("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],X("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],X("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],X("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],X("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],X("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],X("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],X("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],X("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],X("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],X("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],X("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],X("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],X("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],X("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],X("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],X("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],X("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],X("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],X("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],X("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],X("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],X("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],X("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],X("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),nh=X("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function ah(e){return rh[Ti(e)]??nh}function jr(e){return ah(e).kind}var hu="valley-realm",bu="asset";function yu(e){return`${hu}://${bu}/${encodeURIComponent(e)}`}var sh={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function ih(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let s=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(s)} ${t[n]}`}function ki(e){let t=sh[jr(e)];if(t)return d(t);let r=Ti(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var dh={image:qn,audio:Yn,video:Xn},Sa=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),s=jr(e),a=e.split("/").pop()??e,i=dh[s]??kt;o.useEffect(()=>{let u=!1;return g.realm.fileInfo(e).then(m=>{u||n(m?.size??null)}),()=>{u=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>g.realm.onChanged(()=>p(u=>u+1)),[]);let c=s==="image"?`${yu(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>g.workspace.openFile(e,void 0,{newTab:g.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},a),o.createElement("span",{className:"todo-attach-meta"},ki(e),r!==null&&` \xB7 ${ih(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},c?o.createElement("img",{src:c,alt:"",loading:"lazy"}):o.createElement(i,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:a})},o.createElement(be,null)))};function Ea({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:s=!1}){let a=o.useRef(null),i=l=>{let p=l.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),c=[...e];for(let u of p)c.some(m=>m.toLowerCase()===u.toLowerCase())||c.push(u);return c.length===e.length?!1:(t(c),!0)};return o.useEffect(()=>{r&&a.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${s?" is-bare":""}`,onMouseDown:l=>{l.target===l.currentTarget&&(l.preventDefault(),a.current?.focus())}},e.map(l=>o.createElement("span",{key:l,className:"todo-tags-chip"},o.createElement("span",null,"#",l),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:l}),title:d("todo.compose.removeTag",{tag:l}),onClick:()=>{t(e.filter(p=>p!==l)),a.current?.focus()}},o.createElement(be,null)))),o.createElement("input",{ref:a,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:l=>{let p=l.currentTarget;l.nativeEvent.isComposing||(l.key==="Enter"||l.key===","||l.key===" "&&p.value.trim()?(l.preventDefault(),i(p.value)&&(p.value="")):l.key==="Backspace"&&!p.value&&e.length&&(l.preventDefault(),t(e.slice(0,-1))))},onBlur:l=>{i(l.currentTarget.value)&&(l.currentTarget.value="")},onPaste:l=>{let p=l.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(l.preventDefault(),i(l.currentTarget.value+p),l.currentTarget.value="")}}))}var Ze=({priority:e})=>o.createElement(e==="high"?Jn:e==="medium"?_c:e==="low"?Qn:ta,{className:`todo-table-priority-icon todo-priority-${e}`});function tr({name:e,groups:t}){let r=Rs(e,t);return o.createElement("span",{className:"todo-table-group-pill",title:xn(e,t),style:{"--todo-group-color":Te(Ce(e,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},r&&o.createElement("span",{className:"todo-table-group-parent"},r," \xB7 "),e))}function wu({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[s,a]=o.useState(e.startTime??""),{DateTimePicker:i,TimeField:l}=g.ui.settings;return o.createElement("div",{className:"todo-cell-editor"},o.createElement(i,{mode:"date",value:r,ariaLabel:d("todo.field.dueDate"),autoFocus:!0,onChange:p=>{n(p),p||a(""),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(l,{value:s,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:p=>{a(p),t({startTime:p||void 0})}}))}function Aa({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&g.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function Ca({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Ea,{value:r,autoFocus:!0,onChange:s=>{n(s),t({tags:s})}}))}function Da({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Yo,{value:r,autoFocus:!0,onChange:s=>{n(s),t({location:s})}}))}function or(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}var lh={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},ch=["tomorrow","weekend","pick"];function uh(e=se(new Date)){let t=Dn(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return wt(e,n)}function Ia(e,t=se(new Date)){let r=e.slice(0,10),n=i=>i==="tomorrow"?wt(t,1):i==="weekend"?uh(t):null,s=new Set,a=[];for(let i of ch){let l=n(i);if(l!==null){if(l===r||s.has(l))continue;s.add(l)}a.push({id:i,labelKey:lh[i],date:l})}return a}function Nt(e,t,r){let n=new Set(e.map(J)),s=t.filter(i=>n.has(J(i.name)));return[...s.filter(i=>!i.parent||!s.some(l=>l.id===i.parent)).map(i=>{let l=r(i.name),p=s.filter(u=>u.parent===i.id).map(u=>r(u.name));if(!p.length)return l;let c=[l,...p];return{label:i.name,..."color"in l?{color:l.color}:{},...l.type==="radio"?{type:"radio",checked:c.some(u=>u.checked===!0)}:{},submenu:c}}),...e.filter(i=>!rt(t,i)).map(r)]}function vu(e,{todo:t,groupNames:r,setOpenId:n,onEdit:s,onPatch:a,onRequestDelete:i,disabled:l=!1}){let p=ke(t);n(t.id);let c=Ia(t.dueDate??"",se(new Date));return g.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(je,{className:"todo-menu-action-icon"}),enabled:!l,submenu:yt().map(u=>({label:u.label,icon:o.createElement(we,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>a(Ee(u.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(mt,{className:"todo-menu-action-icon"}),enabled:!l,submenu:c.filter(u=>u.date).map(u=>({label:d(u.labelKey),icon:u.id==="tomorrow"?o.createElement(Lr,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(Zn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:u.date})}))},{label:d(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(ve,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:()=>a({flagged:t.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(Ic,{className:"todo-menu-action-icon"}),enabled:!l,submenu:Xe.map(u=>({label:Oe(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>a({priority:u.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Vn,{className:"todo-menu-action-icon"}),enabled:!l,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>a({group:void 0})},...Nt(r,Je(),u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>a({group:u})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(Nc,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:s},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(Wt,{className:"todo-menu-action-icon"}),enabled:!l,danger:!0,onSelect:i}],e).then(()=>{}).finally(()=>n(null))}function Na(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),vu({x:e.clientX,y:e.clientY},t))}var xu=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:s,onRequestDelete:a,disabled:i=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:i,onClick:l=>{l.stopPropagation(),vu({anchor:l.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:s,onRequestDelete:a,disabled:i})}},o.createElement(Sc,null)));var ph={image:qn,audio:Yn,video:Xn};function Si({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let s=o.useRef(null),[a,i]=o.useState([]),[l,p]=o.useState(0),[c,u]=o.useState("idle"),m=o.useRef(null),b=o.useRef(0);o.useEffect(()=>{n&&s.current?.focus()},[n]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]);let h=k=>{m.current!==null&&window.clearTimeout(m.current);let I=++b.current;if(!k.trim()){i([]),u("idle");return}u("searching"),m.current=window.setTimeout(()=>{g.resources.search({query:k.trim(),kinds:["attachment"],limit:6}).then(M=>{I===b.current&&(i(M),p(0),u("done"))},()=>{I===b.current&&(i([]),u("done"))})},150)},w=k=>(k.value??k.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(xt,{className:"todo-location-field-icon"}),o.createElement("input",{ref:s,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:k=>h(k.currentTarget.value),onKeyDown:k=>{k.nativeEvent.isComposing||(k.key==="ArrowDown"&&a.length?(k.preventDefault(),p(I=>(I+1)%a.length)):k.key==="ArrowUp"&&a.length?(k.preventDefault(),p(I=>I<=0?a.length-1:I-1)):k.key==="Enter"?(k.preventDefault(),a[l]&&e(w(a[l]))):k.key==="Escape"&&(k.preventDefault(),k.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:t},o.createElement(be,null))),c!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},c==="searching"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),a.map((k,I)=>{let M=w(k),A=ph[jr(M)]??kt,S=M.includes("/")?M.slice(0,M.lastIndexOf("/")):"";return o.createElement("li",{key:k.id,role:"option","aria-selected":I===l},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(I===l?" is-active":""),onMouseDown:T=>T.preventDefault(),onMouseEnter:()=>p(I),onClick:()=>e(M)},o.createElement(A,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},k.label||M.split("/").pop()),S&&o.createElement("span",{className:"todo-file-search-folder"},S))))})))}function mh(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function fh(e,t=.998){return e/1e3*t/(1-t)}function Tu(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let a=e.length-1;a>=0&&(n=e[a],!(r.t-n.t>=t));a--);let s=r.t-n.t;return s>0?(r.x-n.x)/s*1e3:0}function ku(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let s=Math.max(20,r-t);return Math.sign(e)*(t+mh(n-t,s,.2))}function Su(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),s=Math.max(-t,Math.min(t,fh(e.velocity*r))),a=n+s;return{target:Math.abs(a-t)<Math.abs(a)?r*t:0,commit:!1}}function Eu(e,t,r,n,s,a){let i=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/s)**2,p=2*a*Math.sqrt(l),c=t+(-l*(e-r)-p*t)*i,u=e+c*i,m=Math.abs(u-r)<.5&&Math.abs(c)<20;return{value:m?r:u,velocity:m?0:c,done:m}}function Ei(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let s=e>88,a=s?e-88:n*48,i=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*i<=a+(r?24:0),p=l?i:48,c=Math.min(n*p,Math.max(a,n*32)),u=s?Math.min(Math.max(e*.8,c+56),e-24):c+56;return{buttonWidth:p,labelled:l,openWidth:c,commitPoint:u}}var Au=.22,Cu=.18,gh=.8,Pa=.9,hh=400,bh=80,yh=10,wh=5,vh=4,xh=3,Th=.5,kh=6,Sh=["left","right"],Du={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function Eh(e,t,r,n,s,a){return{kind:e,pointerId:t,originX:r,originY:n,base:s,origin:a,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function Ah(e,t){let r={today:o.createElement(Lr,null),tomorrow:o.createElement(Lr,null),weekend:o.createElement(Zn,null),pick:o.createElement(mt,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:s=>{n.date?t.reschedule(n.date):t.pickDate(s)}}))}var Br=null;function Iu(e){if(Br===e)return;let t=Br;Br=e,t?.close()}function Nu(e){Br===e&&(Br=null)}var rr;function Pu(e,t){if(rr===void 0)try{rr=document.createElement("canvas").getContext("2d")}catch{rr=null}return rr?(rr.font=t,rr.measureText(e).width):e.length*7}var Ch=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,Vr=e=>e>0?"left":e<0?"right":null,Lu=({todo:e,disabled:t,actions:r,onEngage:n,children:s})=>{let a=o.useRef(null),i=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),c=o.useRef(null),u=o.useRef(null),m=o.useRef([]),b=o.useRef(!1),h=o.useRef(null),w=o.useRef(null),k=o.useRef({velocity:0,target:0,response:Au,damping:Pa}),I=o.useRef({left:"",right:""}),M=o.useMemo(()=>Ah(Ia(e.dueDate??"",se(new Date)),r),[e.dueDate,r]),A=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(ve,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(Ec,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(Wt,null),run:()=>r.remove()}],[r,e.flagged]),S={left:M,right:A},[T,F]=o.useState(()=>({rowWidth:0,left:Du,right:Du})),q=o.useRef(T);q.current=T;let W=()=>{let f=a.current?.querySelector(".todo-swipe-action");if(!f||typeof getComputedStyle!="function")return"13px sans-serif";let L=getComputedStyle(f);return`${L.fontWeight} ${L.fontSize} ${L.fontFamily}`},Q=()=>{let f=a.current?.clientWidth??0,L=W(),E=q.current,z={rowWidth:f,left:Ei(f,M.map(ee=>Pu(ee.label,L)),E.left.labelled),right:Ei(f,A.map(ee=>Pu(ee.label,L)),E.right.labelled)};q.current=z;let H=ee=>E[ee].openWidth!==z[ee].openWidth||E[ee].labelled!==z[ee].labelled;return(E.rowWidth!==f||H("left")||H("right"))&&F(z),z},$=o.useRef(Q);$.current=Q,o.useEffect(()=>{$.current()},[M,A]);let j=f=>{let L=Vr(f);return!L||L!==u.current?!1:Math.abs(f)>=q.current[L].commitPoint},G=(f,L=!1)=>{p.current=f,L&&f!==0?Iu(K.current):f===0&&Nu(K.current);let E=a.current,z=i.current;if(!E||!z)return;z.style.transform=f?`translate3d(${f}px, 0, 0)`:"";let H=Vr(f),ee=q.current,ie=j(f);E.classList.toggle("open",f!==0),E.classList.toggle("committed",ie);for(let ce of Sh){let te=l.current[ce];if(!te)continue;let fe=H===ce;te.classList.toggle("committed",fe&&ie);let We=fe?ie?"100%":`${Math.max(ee[ce].openWidth,Math.abs(f))}px`:`${f===0?ee[ce].openWidth:0}px`,Re=`${We}|${fe}`;I.current[ce]!==Re&&(I.current[ce]=Re,te.style.width=We,te.setAttribute("aria-hidden",String(!fe)))}};o.useLayoutEffect(()=>G(p.current));let v=()=>{h.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(h.current),h.current=null},D=(f,L,E,z)=>{if(v(),f!==0&&Iu(K.current),p.current===f||Ch()||typeof requestAnimationFrame!="function"){G(f);return}k.current={velocity:L,target:f,response:E,damping:z};let H=0,ee=ie=>{let ce=H?(ie-H)/1e3:.016666666666666666;H=ie;let te=k.current,fe=Eu(p.current,te.velocity,te.target,ce,te.response,te.damping);te.velocity=fe.velocity,G(fe.value),h.current=fe.done?null:requestAnimationFrame(ee)};h.current=requestAnimationFrame(ee)},C=o.useRef(()=>{});C.current=()=>{c.current=null,D(0,0,Cu,Pa)};let O=o.useCallback(()=>C.current(),[]),K=o.useRef({close:()=>C.current()}),U=()=>{v(),c.current=null,w.current!=null&&window.clearTimeout(w.current),w.current=null,G(0)},V=o.useRef(U);V.current=U;let B=f=>{let L=q.current,E=Vr(f);if(!E)return 0;let z=c.current?.origin;if(z&&E!==z)return 0;let H=L[E],ee=E===u.current?H.commitPoint:H.openWidth;return ku(f,ee,L.rowWidth)},P=(f,L,E,z,H)=>{v(),Q();let ee=p.current,ie=Vr(ee),ce=Math.abs(ee)>8?ie:null;u.current=ie&&Math.abs(ee)>=q.current[ie].openWidth-1?ie:null,c.current=Eh(f,L,E,z,ee,ce),m.current=[{x:ee,t:H}]},_=(f,L)=>{let E=c.current;!E||E.ended||(E.live||(E.live=!0,v(),n?.()),m.current.push({x:f,t:L}),m.current.length>kh&&m.current.shift(),G(B(f),!0),j(p.current)&&(E.crossed=!0))},N=f=>{let L=c.current;if(!L||L.ended)return;if(L.ended=!0,!L.live){c.current=null;return}let E=()=>{L.kind==="pointer"&&(c.current=null)},z=Tu(m.current),H=p.current,ee=Vr(H);if(!ee){E(),G(0);return}let ie=q.current[ee],ce=f&&j(H),te=Su({offset:H,velocity:z,openWidth:ie.openWidth,committed:ce});if(E(),te.commit){let fe=ee==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",We=a.current?.querySelector(fe),Re=S[ee],ot=ee==="left"?Re[0]:Re[Re.length-1];D(0,z,Cu,Pa),ot?.run(We??a.current);return}D(te.target,z,Au,Math.abs(z)>hh?gh:Pa)};o.useEffect(()=>O(),[e.dueDate,e.flagged,O]),o.useEffect(()=>{let f=K.current;return()=>{v(),w.current!=null&&window.clearTimeout(w.current),Nu(f)}},[]),o.useEffect(()=>{let f=a.current,L=f?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!f||!L)return;let E=0,z=new L(()=>{let H=f.clientWidth,ee=E!==H;E=H,$.current(),ee&&p.current!==0&&V.current()});return z.observe(f),()=>z.disconnect()},[]);let x=o.useRef({disabled:t,begin:P,move:_,end:N});x.current={disabled:t,begin:P,move:_,end:N},o.useEffect(()=>{let f=a.current;if(!f)return;let L=()=>{w.current!=null&&window.clearTimeout(w.current),w.current=null},E=()=>{w.current=null,c.current?.kind==="wheel"&&(x.current.end(!0),c.current=null)},z=H=>{let ee=x.current;if(ee.disabled||Math.abs(H.deltaX)<=Math.abs(H.deltaY)||H.deltaX===0)return;H.preventDefault();let ie=H.deltaMode===WheelEvent.DOM_DELTA_LINE?16:H.deltaMode===WheelEvent.DOM_DELTA_PAGE?f.clientWidth:1,ce=-H.deltaX*ie,te=c.current;(!te||te.kind!=="wheel")&&(ee.begin("wheel",-1,0,0,H.timeStamp),te=c.current),L(),w.current=window.setTimeout(E,bh);let fe=Math.abs(ce),We=te.previous;te.previous=fe;let Re=te.live&&(te.ended||te.origin!==null&&p.current===0),ot=fe>=We+wh,ze=te.distance!==0&&Math.sign(ce)!==Math.sign(te.distance)&&fe>=vh;if(Re&&(ot||ze)&&(ee.end(!1),ee.begin("wheel",-1,0,0,H.timeStamp),te=c.current,te.previous=fe),te.ended)return;if(te.decay=fe<We?te.decay+1:0,te.peak=Math.max(te.peak,fe),te.distance+=ce,te.live&&te.peak>=yh&&te.decay>=xh&&fe<te.peak*Th){ee.end(te.crossed);return}!te.live&&Math.abs(te.distance)<8||ee.move(te.base+te.distance,H.timeStamp)};return f.addEventListener("wheel",z,{passive:!1}),()=>{f.removeEventListener("wheel",z),L()}},[]);let y=(f,L)=>o.createElement("div",{ref:E=>{l.current[f]=E},className:`todo-swipe-tray todo-swipe-tray-${f} ${T[f].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${T[f].openWidth}px`}},L.map(E=>o.createElement("button",{key:E.key,type:"button",className:E.cls,tabIndex:-1,title:E.label,"aria-label":E.label,onClick:z=>{z.stopPropagation(),O(),E.run(z.currentTarget)}},E.icon,o.createElement("span",null,E.label))));return o.createElement("div",{ref:a,className:"todo-swipe","data-visible-key":e.id,onPointerDown:f=>{t||f.pointerType==="mouse"&&f.button!==0||f.target.closest(".todo-swipe-tray")||P("pointer",f.pointerId,f.clientX,f.clientY,f.timeStamp)},onPointerMove:f=>{let L=c.current;if(!L||L.kind!=="pointer"||L.pointerId!==f.pointerId)return;let E=f.clientX-L.originX,z=f.clientY-L.originY;if(!L.live){if(Math.abs(z)>Math.abs(E)){f.currentTarget.hasPointerCapture?.(f.pointerId)&&f.currentTarget.releasePointerCapture(f.pointerId),c.current=null;return}if(Math.abs(E)<8)return;b.current=!0,f.currentTarget.setPointerCapture?.(f.pointerId)}f.preventDefault(),_(L.base+E,f.timeStamp)},onPointerUp:f=>{let L=c.current;!L||L.kind!=="pointer"||L.pointerId!==f.pointerId||(f.currentTarget.hasPointerCapture?.(f.pointerId)&&f.currentTarget.releasePointerCapture(f.pointerId),L.live&&_(L.base+(f.clientX-L.originX),f.timeStamp),N(!0))},onPointerCancel:f=>{let L=c.current;!L||L.kind!=="pointer"||L.pointerId!==f.pointerId||(f.currentTarget.hasPointerCapture?.(f.pointerId)&&f.currentTarget.releasePointerCapture(f.pointerId),O())},onClickCapture:f=>{let L=!!f.target.closest(".todo-swipe-tray");if(L&&(b.current=!1),b.current&&!L){b.current=!1,f.stopPropagation(),f.preventDefault();return}p.current&&!L&&(f.stopPropagation(),f.preventDefault(),O())}},M.length>0&&y("left",M),o.createElement("div",{ref:i,className:"todo-swipe-surface"},s),A.length>0&&y("right",A))};function Hr(e,t,r){let n=ke(t);g.ui.openMenu(yt().map(s=>({label:s.label,icon:o.createElement(we,{status:s.status,dotCls:s.cls,color:s.color}),type:"radio",checked:s.status===null?n==="open":s.status===n,onSelect:()=>r(Ee(s.status))})),{anchor:e})}function Ci(e,t=500,r){let n=o.useRef(e);n.current=e;let s=o.useRef(null),a=o.useRef(!1),i=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let c=o.useCallback(async()=>{if(a.current)return;let u=s.current;if(u!==null){s.current=null,a.current=!0;try{let m=await n.current(u);!m&&s.current===null&&(s.current=u),m?l.current=0:l.current+=1}catch{s.current===null&&(s.current=u),l.current+=1}finally{a.current=!1,s.current!==null&&l.current<3?i.current=window.setTimeout(()=>{c()},250):s.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{i.current!=null&&window.clearTimeout(i.current),c()},[c]),o.useCallback(u=>{s.current=u,l.current=0,i.current!=null&&window.clearTimeout(i.current),i.current=window.setTimeout(()=>{i.current=null,c()},t)},[c,t])}function Dh({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:s="text",className:a}){let[i,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let c=()=>{i!==e&&t(i)};return o.createElement("input",{className:a,type:s,value:i,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>l(u.target.value),onBlur:()=>{p.current=!1,c()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(l(e),u.currentTarget.blur())}})}function Ih(e){let t=g.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var Nh=({todoId:e,c:t,close:r})=>{let[n,s]=o.useState(he);o.useEffect(()=>ct(s),[]);let a=n.find(y=>y.id===e),i=Zd(e),l=Qe(),[p,c]=o.useState(!1),[u,m]=o.useState(!1),[b,h]=o.useState(!1),[w,k]=o.useState(!1),I=o.useRef(null),[M,A]=o.useState(""),S=Ih(e),T=o.useSyncExternalStore(o.useCallback(y=>(S.listeners.add(y),()=>{S.listeners.delete(y)}),[S]),()=>S.value,()=>S.value),F=o.useCallback(y=>{S.value={...S.value,...y};for(let f of S.listeners)f()},[S]),q=T.title,W=y=>F({title:y}),Q=()=>F({error:d("todo.error.saveDraft")});o.useEffect(()=>{S.revision||S.loadingRevision||(S.loadingRevision=g.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(y=>{y&&!S.revision&&(S.revision={expectedRevision:y.revision,realmGeneration:y.realmGeneration})}).catch(()=>{F({error:d("todo.error.saveDraft")})}).finally(()=>{S.loadingRevision=void 0}))},[S,e,F]);let $=async y=>(S.revision||await S.loadingRevision,S.revision?t.patchTodo(e,y,S.revision):!1),j=Ci(async y=>{let f=y.trim()?await $({title:y}):!0;return f&&S.value.title===y&&F({title:null,error:""}),f},500,Q),G=Ci(async y=>{let f=await $({note:y});return f&&S.value.note===y&&F({note:null,error:""}),f},500,Q),v=Ci(async y=>{let f=JSON.parse(y),L=await $({tags:f});return L&&JSON.stringify(S.value.tags)===y&&F({tags:null,error:""}),L},0,Q);if(o.useEffect(()=>{!a&&!t.loading&&r()},[a,t.loading,r]),!a)return null;let D=y=>{$(y).then(f=>{f||Q()})},C=y=>{F({tags:y}),v(JSON.stringify(y))},O=y=>D({attachments:y.length?y:void 0}),K=y=>D({urls:y.length?y:void 0}),U=Ae(l);I.current||(I.current=structuredClone(a));let V=()=>{let y=I.current;y&&(j(y.title),G(y.note),D({tags:y.tags,status:y.status,completed:y.completed,priority:y.priority,dueDate:y.dueDate,startTime:y.startTime,endTime:y.endTime,group:y.group,location:y.location,flagged:y.flagged,attachments:y.attachments,urls:y.urls,filePath:y.filePath})),F({title:null,note:null,tags:null,error:""}),r()},B=ke(a),P=se(),_=a.dueDate?`${Be(a.dueDate.slice(0,10),P,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},g.ui.language(),g.getState().dateFormat)}${a.startTime?` \xB7 ${a.startTime}${a.endTime?`\u2013${a.endTime}`:""}`:""}`:"",N=(y,f,L,E=300)=>{g.ui.openPopover(L,{anchor:y,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:f,width:E})},x=(y,f,L,E,z,H="")=>o.createElement("button",{key:y,type:"button",className:`todo-sheet-chip${L?"":" is-empty"}${H?` ${H}`:""}`,"aria-label":L?`${E}: ${L}`:E,title:y==="place"&&a.location?a.location.name:void 0,onClick:ee=>z(ee.currentTarget)},f,o.createElement("span",null,L||E));return o.createElement(g.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),Vt(a,t.removeTodo).then(y=>{y||t.openDetail(a.id)})}},o.createElement(Wt,null),d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:V},d("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},T.error&&o.createElement("p",{role:"alert"},T.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":B,title:st(B),"aria-label":`${d("auto.bae7d5be7082")}: ${st(B)}`,onClick:y=>Hr(y.currentTarget,a,f=>D(f))},o.createElement(we,{status:B==="open"?null:B,dotCls:Se(B).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:q??a.title,"aria-label":d("auto.c5e8306a511f"),onChange:y=>{W(y.target.value),j(y.target.value)},onBlur:()=>{q===a.title&&W(null)},onKeyDown:y=>{y.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${a.flagged?" on":""}`,type:"button",onClick:()=>D({flagged:a.flagged?void 0:!0}),"aria-pressed":!!a.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(ve,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:T.note??a.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:y=>{let f=y.target.value;F({note:f}),G(f)}}),o.createElement("div",{className:"todo-sheet-chips"},x("status",o.createElement(we,{status:B==="open"?null:B,dotCls:Se(B).cls}),B==="open"?"":st(B),d("auto.bae7d5be7082"),y=>Hr(y,a,f=>D(f))),x("due",o.createElement(mt,null),_,d("todo.sheet.date"),y=>N(y,d("todo.edit.schedule"),()=>o.createElement(Ph,{todo:a,onPatch:D}),280),a.dueDate&&a.dueDate.slice(0,10)<P&&!a.completed?"is-overdue":""),x("group",o.createElement("span",{className:"todo-sheet-dot",style:a.group?{background:Te(Ce(a.group,l))}:void 0}),a.group??"",d("todo.edit.group"),y=>{g.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!a.group,onSelect:()=>D({group:void 0})},...Nt(U,l,f=>({label:f,type:"radio",checked:a.group===f,color:Ce(f,l),onSelect:()=>D({group:f})}))],{anchor:y,align:"start"})}),x("place",o.createElement(_e,null),a.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),y=>N(y,d("todo.location"),()=>o.createElement(Lh,{todo:a,onPatch:D}),320)),x("priority",o.createElement(Ze,{priority:a.priority}),a.priority==="normal"?"":Oe(a.priority),d("auto.886cbff9d9df"),y=>{g.ui.openMenu(Xe.map(f=>({label:Oe(f.id),icon:o.createElement(Ze,{priority:f.id}),type:"radio",checked:a.priority===f.id,onSelect:()=>D({priority:f.id})})),{anchor:y,align:"start"})})),o.createElement(Ea,{value:T.tags??a.tags??[],onChange:C,bare:!0}),((a.attachments??[]).length>0||p)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(a.attachments??[]).map(y=>o.createElement(Sa,{key:y,relPath:y,onRemove:()=>O((a.attachments??[]).filter(f=>f!==y))})),p&&o.createElement(Si,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>c(!1),onPick:y=>{(a.attachments??[]).includes(y)||O([...a.attachments??[],y]),c(!1)}})),((a.urls??[]).length>0||u||a.filePath||b)&&o.createElement("div",{className:"todo-sheet-section"},a.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:a.filePath,onClick:y=>g.workspace.openFile(a.filePath,void 0,{newTab:g.ui.hasModKey(y)})},o.createElement(kt,null),o.createElement("span",null,a.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>D({filePath:void 0})},o.createElement(be,null))),b&&!a.filePath&&o.createElement(Si,{placeholder:d("todo.file.searchLinked"),onCancel:()=>h(!1),onPick:y=>{D({filePath:y}),h(!1)}}),(a.urls??[]).map(y=>o.createElement("div",{className:"todo-detail-url-card",key:y},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:y,onClick:f=>{let L=_t(y);L?g.workspace.openFile(L,void 0,{newTab:g.ui.hasModKey(f)}):g.files.openExternalUrl(y)}},o.createElement(Tt,null),o.createElement("span",null,Di(y))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:y}),onClick:()=>K((a.urls??[]).filter(f=>f!==y))},o.createElement(be,null)))),u&&o.createElement(Dh,{className:"todo-detail-link-input todo-detail-url",value:M,onCommit:y=>{let f=Cs(y);f&&!(a.urls??[]).includes(f)&&K([...a.urls??[],f]),A(""),m(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),w&&i.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...i].reverse().map((y,f)=>o.createElement("li",{key:`${y.changedAt}:${f}`},o.createElement("span",null,st(y.from)," \u2192 ",st(y.to)),o.createElement("time",{dateTime:y.changedAt},new Date(y.changedAt).toLocaleString(g.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>c(!0)},o.createElement(Yt,null)," ",d("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(Tt,null)," ",d("todo.sheet.link")),!a.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>h(!0)},o.createElement(kt,null)," ",d("todo.linkedFile")),i.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":w,onClick:()=>k(y=>!y)},d("todo.activity")," (",i.length,")"))))};function Ph({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[s,a]=o.useState(e.startTime??""),[i,l]=o.useState(e.endTime??""),{DateTimePicker:p,TimeField:c}=g.ui.settings;return o.createElement("div",{className:"todo-cell-editor"},o.createElement(p,{mode:"date",value:r,ariaLabel:d("todo.field.dueDate"),autoFocus:!0,onChange:u=>{n(u),u||(a(""),l("")),t(u?{dueDate:u}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(c,{value:s,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:u=>{a(u),t({startTime:u||void 0,...u?{}:{endTime:void 0}}),u||l("")}}),o.createElement(c,{value:i,disabled:!s,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:u=>{if(u&&s&&u<=s){l(i);return}l(u),t({endTime:u||void 0})}})))}function Lh({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Yo,{value:r,autoFocus:!0,onChange:s=>{n(s),t({location:s})}}))}function Di(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}var nr=({c:e})=>e.editingId?o.createElement(Nh,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;var Oa="todo.task",_u=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z"/></svg>')}`,Xt=256,La=15,Gu=2,Ru=19,Ou=180,Mu=330;function zu(){return g.runtime.getOrCreate("todo.taskMap",()=>({tiles:new Map,places:new Map}))}function Oh(e,t,r){let{tiles:n}=zu(),s=`${e}/${t}/${r}`,a=n.get(s);return a||(a=g.backend.call("map.tile",{z:e,x:t,y:r}).then(i=>`data:image/png;base64,${i}`),a.catch(()=>{n.get(s)===a&&n.delete(s)}),n.set(s,a),n.size>160&&n.delete(n.keys().next().value)),a}function Mh(e){let{places:t}=zu(),r=t.get(e);return r||(r=g.resources.search({query:e,kinds:["place"],limit:1}).then(n=>{let s=Number(n[0]?.metadata?.longitude),a=Number(n[0]?.metadata?.latitude);return Number.isFinite(s)&&Number.isFinite(a)?{lat:a,lng:s}:null},()=>null),t.set(e,r)),r}function Ii({lat:e,lng:t},r){let n=Xt*2**r,s=Math.max(-85.0511,Math.min(85.0511,e))*Math.PI/180;return{x:(t+180)/360*n,y:(1-Math.log(Math.tan(s)+1/Math.cos(s))/Math.PI)/2*n}}function Ni(e){let t=e.documentElement,r=t.style.colorScheme.trim()||t.getAttribute("data-theme")||"";return r==="dark"||r==="light"?r==="dark":e.defaultView?.matchMedia?.("(prefers-color-scheme: dark)").matches===!0}function _h({z:e,x:t,y:r,style:n}){let[s,a]=o.useState("");return o.useEffect(()=>{let i=!0;return a(""),Oh(e,t,r).then(l=>{i&&a(l)},()=>{}),()=>{i=!1}},[e,t,r]),s?o.createElement("img",{className:"todo-task-map-tile",src:s,alt:"",draggable:!1,style:n}):null}function Pi(e,t){let r=Math.max(Gu,Math.min(Ru,e.zoom+t)),n=2**(r-e.zoom);return{zoom:r,x:e.x*n,y:e.y*n}}function Gh({location:e,point:t}){let r=o.useRef(null),[n,s]=o.useState(()=>Ni(document)),[a,i]=o.useState(()=>({zoom:La,...Ii(t,La)}));o.useEffect(()=>i({zoom:La,...Ii(t,La)}),[t.lat,t.lng]),o.useLayoutEffect(()=>{let w=r.current?.ownerDocument;if(!w)return;s(Ni(w));let k=w.defaultView?.MutationObserver??MutationObserver,I=new k(()=>s(Ni(w)));return I.observe(w.documentElement,{attributes:!0,attributeFilter:["style","data-theme"]}),()=>I.disconnect()},[]),o.useEffect(()=>{let w=r.current;if(!w)return;let k=0,I=M=>{if(!M.ctrlKey||(M.preventDefault(),k+=M.deltaY,Math.abs(k)<12))return;let A=k<0?1:-1;k=0,i(S=>Pi(S,A))};return w.addEventListener("wheel",I,{passive:!1}),()=>w.removeEventListener("wheel",I)},[]);let l=o.useRef(null),[p,c]=o.useState(!1),u=Xt*2**a.zoom,m=2**a.zoom,b=Ii(t,a.zoom),h=[];for(let w=Math.floor((a.y-Ou/2)/Xt);w<=Math.floor((a.y+Ou/2)/Xt);w++)if(!(w<0||w>=m))for(let k=Math.floor((a.x-Mu)/Xt);k<=Math.floor((a.x+Mu)/Xt);k++){let I=(k%m+m)%m;h.push(o.createElement(_h,{key:`${a.zoom}/${k}/${w}`,z:a.zoom,x:I,y:w,style:{left:`calc(50% + ${Math.round(k*Xt-a.x)}px)`,top:`calc(50% + ${Math.round(w*Xt-a.y)}px)`}}))}return o.createElement("div",{ref:r,className:`todo-task-map${n?" is-dark":""}${p?" is-dragging":""}`,role:"group","aria-label":d("todo.task.mapOf",{p0:e.name}),onPointerDown:w=>{w.button!==0||w.target.closest("button")||(l.current={pointer:w.pointerId,x:w.clientX,y:w.clientY},w.currentTarget.setPointerCapture?.(w.pointerId),c(!0))},onPointerMove:w=>{let k=l.current;if(!k||k.pointer!==w.pointerId)return;let I=w.clientX-k.x,M=w.clientY-k.y;l.current={...k,x:w.clientX,y:w.clientY},i(A=>({...A,x:A.x-I,y:Math.max(0,Math.min(u,A.y-M))}))},onPointerUp:()=>{l.current=null,c(!1)},onPointerCancel:()=>{l.current=null,c(!1)}},h,o.createElement("span",{className:"todo-task-map-pin","aria-hidden":"true",style:{left:`calc(50% + ${Math.round(b.x-a.x)}px)`,top:`calc(50% + ${Math.round(b.y-a.y)}px)`}},o.createElement(_e,null)),o.createElement("div",{className:"todo-task-map-zoom"},o.createElement("button",{type:"button",className:"todo-task-map-zoom-btn",disabled:a.zoom>=Ru,title:d("todo.task.zoomIn"),"aria-label":d("todo.task.zoomIn"),onClick:()=>i(w=>Pi(w,1))},o.createElement(dt,null)),o.createElement("button",{type:"button",className:"todo-task-map-zoom-btn",disabled:a.zoom<=Gu,title:d("todo.task.zoomOut"),"aria-label":d("todo.task.zoomOut"),onClick:()=>i(w=>Pi(w,-1))},o.createElement(ta,null))),o.createElement("span",{className:"todo-task-map-credit"},d("todo.task.mapCredit")))}function Rh({location:e}){let t=e.lat!==void 0&&e.lng!==void 0?{lat:e.lat,lng:e.lng}:null,[r,n]=o.useState(null);o.useEffect(()=>{if(n(null),t)return;let a=!0;return Mh(e.name).then(i=>{a&&n(i)}),()=>{a=!1}},[e.name,t?.lat,t?.lng]);let s=t??r;return o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-task-line todo-task-link",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>fo({...e,...s??{}})},o.createElement(_e,null),o.createElement("span",null,e.name)),s&&o.createElement(Gh,{location:e,point:s}))}function Fu(){let e=Ma("main_workspace"),t=o.useSyncExternalStore(ct,he,he),r=Qe();it();let{dateFormat:n}=tt("dateFormat"),s=e?t.find(h=>h.id===e):void 0;if(!s)return o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.task.empty")));let a=ke(s),i=s.dueDate?Be(s.dueDate,se(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},g.ui.language(),n):"",l=s.dueDate?Me(s.dueDate,n):"",p=[s.startTime,s.endTime].filter(Boolean).join(" \u2013 "),c=[i,i!==l?l:"",p].filter(Boolean).join(" \xB7 "),u=!!s.dueDate&&!s.completed&&s.dueDate.slice(0,10)<se(new Date),m=s.remindAt&&!s.reminderFiredAt?s.remindAt.slice(11,16):"",b=[s.filePath,...s.attachments??[]].filter(h=>!!h);return o.createElement("div",{className:"todo-properties-frame","data-plugin-widget-layout":"fill"},o.createElement(g.ui.ScrollPanel,{fill:!0},o.createElement("div",{className:"right-panel-body todo-task-card","data-todo-id":s.id},o.createElement("h2",{className:`todo-task-title${De().strikethrough[a]?" is-struck":""}`},s.title),c&&o.createElement("div",{className:`todo-task-line${u?" is-overdue":""}`},o.createElement(Hn,null),o.createElement("span",null,c)),m&&o.createElement("div",{className:"todo-task-line",title:d("todo.reminderSet")},o.createElement(Bn,null),o.createElement("span",null,m)),s.note?.trim()&&o.createElement("p",{className:"todo-task-note"},s.note.trim()),o.createElement("div",{className:"todo-task-facts"},o.createElement(ka,{status:a}),s.priority!=="normal"&&o.createElement("span",{className:"todo-task-fact"},o.createElement(Ze,{priority:s.priority}),Oe(s.priority)),s.flagged&&o.createElement("span",{className:"todo-task-fact todo-task-flag",role:"img",title:d("todo.flagged"),"aria-label":d("todo.flagged")},o.createElement(ve,null)),s.group&&o.createElement(tr,{name:s.group,groups:r})),s.location&&o.createElement(Rh,{location:s.location}),!!s.tags?.length&&o.createElement("div",{className:"todo-task-tags"},s.tags.map(h=>o.createElement("span",{key:h,className:"todo-task-tag"},"#",h))),(s.urls??[]).map(h=>o.createElement("button",{key:h,type:"button",className:"todo-task-line todo-task-link",title:h,onClick:w=>{let k=_t(h);k?g.workspace.openFile(k,void 0,{newTab:g.ui.hasModKey(w)}):g.files.openExternalUrl(h)}},o.createElement(Tt,null),o.createElement("span",null,Di(h)))),b.map(h=>o.createElement(Sa,{key:h,relPath:h})))))}var Li={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function zh(){return["completed",...so().filter(t=>t!=="completed")].map(t=>Se(t))}function ft(){return g.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function Uu(){for(let e of ft().listeners)e()}function Oi(e,t=""){let r=ft();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,Uu())}function ho(e,t){(ft().selected.get(t)??null)!==e&&(e?ft().selected.set(t,e):ft().selected.delete(t),Uu())}function Ma(e){let t=o.useCallback(n=>{let s=ft().listeners;return s.add(n),()=>{s.delete(n)}},[]),r=()=>ft().selected.get(e)??null;return o.useSyncExternalStore(t,r,r)}function Fh(e,t){let r=e==="main_workspace"?go(t):null,n=ba(r??void 0),s=he().find(a=>a.id===ft().selected.get(e));return{title:d("manifest.name"),view:n,actions:ft().actions??[],...s?{item:{id:s.id,title:s.title,state:{...n,todoId:s.id}}}:{},...r?{}:{navigation:{...fa(),goBack:()=>Qo(-1),goForward:()=>Qo(1)}}}}function $h(e){let t=ft().listeners;t.add(e);let r=ct(e),n=Ur(e),s=g.settings.subscribe(e);return()=>{t.delete(e),r(),n(),s()}}async function Uh(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Ke(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!ya(e,t==="main_workspace"&&go(n)!==null))throw new Error("Unsupported To-Do bookmark.");ho(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Le().request(e.todoId,"focus")}function Kh({label:e,color:t,todos:r,sub:n}){let[s,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" todo-status-subgroup":""}${s?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":s,onClick:()=>a(i=>!i)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(Ho,null))),s&&o.createElement("div",{className:"todo-group-status-breakdown"},zh().map(i=>o.createElement("div",{className:"todo-group-status-row",key:i.id},o.createElement("span",null,i.label),o.createElement("span",null,r.filter(l=>ke(l)===i.id).length)))))}function jh(){let e=o.useSyncExternalStore(ct,he,he),t=Qe();return o.createElement("div",{className:"todo-properties-frame","data-plugin-widget-layout":"fill"},o.createElement(g.ui.ScrollPanel,{fill:!0},o.createElement("div",{className:"right-panel-body props-info todo-groups-properties"},o.createElement("div",{className:"todo-status-groups"},[...Ae(t),...e.some(r=>!r.group)?[null]:[]].map(r=>{let n=e.filter(a=>r===null?!a.group:bt(r).has(J(a.group??""))),s=r??d("todo.chip.noGroup");return o.createElement(Kh,{key:r??"ungrouped",label:s,sub:r!==null&&vn(r,t),color:r?Te(Ce(r,t)):"var(--text-tertiary)",todos:n})})))))}async function $u({subject:e}){let t=e?.item?.id?await Ke(e.item.id):null;return t?Object.entries(t).map(([r,n])=>({id:r,label:d(`todo.field.${r}`),value:n??null,readOnly:!0})):[]}function Ku(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>cs(e,{id:`todo.${n}`,surface:n,getSnapshot:s=>Fh(n,s),subscribe:$h,restore:(s,a,i)=>Uh(s,n,i?.background,a)},{stateSchema:Li,itemStateSchema:{...Li,required:[...Li.required,"todoId"]},description:(s,a)=>typeof s.view.path=="string"&&s.view.path?s.view.path:d(a?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(on,{id:Oa,label:"Task",labelKey:"todo.task.tab",icon:_u,pluginSurfaces:["main_workspace"],inspect:$u,render:()=>o.createElement(Fu,null)})),r.push(e.interop.extensions.provide(on,{id:"todo.properties",label:"Groups",labelKey:"todo.view.myLists",icon:"group",pluginSurfaces:["main_workspace"],inspect:$u,render:()=>o.createElement(jh,null)})),r.push(gu()),()=>r.forEach(n=>n())}function ju(e,t,r){let n=new Date().toISOString();return{id:to("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function Vu(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function ar(e,t,r="main_workspace"){let n=o.useRef(ye()).current,[s,a]=o.useState(he()),[i,l]=o.useState(null),[p,c]=o.useState(null),[u,m]=o.useState(null),b=o.useRef(u);b.current=u;let[h,w]=o.useState(!0),[k,I]=o.useState(0),[M,A]=o.useState(!1),{pendingIds:S,isPending:T,setPending:F}=cu(),q=o.useRef(!1),W=o.useRef(0),Q=o.useRef({sortField:e,sortDir:t});Q.current={sortField:e,sortDir:t};let $=o.useRef([]),j=o.useMemo(()=>{let P=new Map(s.map(x=>[x.id,x])),_=new Set($.current),N=[];for(let x of $.current){let y=P.get(x);y&&N.push(y)}for(let x of s)_.has(x.id)||N.push(x);return N},[s,k]),G=o.useCallback(P=>{let _=++W.current;P&&w(!0),Ye(n).then(N=>{if(n.assertActive(),_===W.current){if(P){let{sortField:x,sortDir:y}=Q.current;$.current=Uo(N,x,y).map(f=>f.id)}else{let x=new Set(N.map(H=>H.id)),y=$.current.filter(H=>x.has(H)),f=new Set(y),{sortField:L,sortDir:E}=Q.current,z=Uo(N.filter(H=>!f.has(H.id)),L,E).map(H=>H.id);$.current=[...z,...y]}It(N),w(!1)}}).catch(()=>{_===W.current&&w(!1)})},[n]);o.useEffect(()=>(G(!0),()=>{W.current++}),[G]),o.useEffect(()=>zt(()=>G(!1)),[G]);let v=o.useRef(!0);o.useEffect(()=>{if(v.current){v.current=!1;return}$.current=Uo(he(),e,t).map(P=>P.id),I(P=>P+1)},[e,t]),o.useEffect(()=>ct(P=>a(P)),[]);let D=o.useCallback(()=>l(null),[]),C=o.useCallback(P=>{ho(P,r),m(P)},[r]),O=o.useCallback(()=>m(null),[]),K=o.useCallback(async(P,_,N)=>{let x=!N?.background;if(x&&q.current)return null;let y=P.trim();if(!y)return null;let f={...ju(y,_),...N?.patch};x&&(q.current=!0,A(!0)),$.current=[f.id,...$.current],It([f,...he()]),l(f.id);let L=()=>{$.current=$.current.filter(E=>E!==f.id),It(he().filter(E=>E.id!==f.id)),l(E=>E===f.id?null:E)};try{let E=await zn(f);return E||L(),E?f:null}catch{return L(),null}finally{x&&(q.current=!1,A(!1))}},[]),U=o.useCallback(async(P,_,N)=>{if(T(P))return!1;let x=he().find(f=>f.id===P);if(!x)return!1;let y={...x,..._,updatedAt:new Date().toISOString()};F(P,!0),It(he().map(f=>f.id===P?y:f));try{return await mo(P,y,x.updatedAt,N)?!0:(It(he().map(L=>L.id===P?x:L)),!1)}catch{return It(he().map(f=>f.id===P?x:f)),!1}finally{F(P,!1)}},[T,F]),V=o.useCallback(async P=>{if(T(P))return;let _=he().find(x=>x.id===P);if(!_)return;F(P,!0),$.current=$.current.filter(x=>x!==P),It(he().filter(x=>x.id!==P)),l(x=>x===P?null:x),b.current===P&&m(null);let N=()=>{$.current.includes(P)||$.current.push(P),he().some(x=>x.id===P)||It([...he(),_])};try{await Fn(P)||N()}catch{N()}finally{F(P,!1)}},[T,F]),B=o.useMemo(()=>({patchTodo:U,removeTodo:V,openDetail:C,setMenuId:c}),[U,V,C]);return o.useMemo(()=>({todos:s,loading:h,ordered:j,lastCreatedId:i,clearLastCreated:D,menuId:p,setMenuId:c,editingId:u,openDetail:C,closeDetail:O,pendingIds:S,creating:M,create:K,patchTodo:U,removeTodo:V,actions:B}),[s,h,j,i,D,p,u,C,O,S,M,K,U,V,B])}function Vh(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function Bh(e,t,r=320){let n=t.top-r,s=t.top+t.height+r,a=0,i=e.length;for(;a<i;){let p=a+i>>>1;e[p].start+e[p].height<n?a=p+1:i=p}let l=a;for(i=e.length;a<i;){let p=a+i>>>1;e[p].start<=s?a=p+1:i=p}return[l,a]}function _a(e,t){let{ids:r,estimate:n,pinned:s=[],layoutKey:a}=t,i=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[c,u]=e.useReducer(C=>C+1,0),[m,b]=e.useState({top:0,height:600}),[h,w]=e.useState(null),[k,I]=e.useState(null),M=e.useRef(null),A=e.useRef(null),S=e.useRef(null),T=e.useMemo(()=>{let C=0;return r.map((O,K)=>{let U=p.current.get(O)??(typeof n=="number"?n:n(O,K)),V={id:O,height:U,start:C};return C+=U,V})},[r,n,c]),F=T.length?T[T.length-1].start+T[T.length-1].height:0,q=e.useRef({rows:T,viewport:m});q.current={rows:T,viewport:m};let W=e.useCallback(()=>{let C=l.current,O=M.current;if(!C||!O)return;let K=C.getBoundingClientRect(),U=O.getBoundingClientRect(),V=O.clientHeight||U.height||600,B=O===C?O.scrollTop:U.top-K.top;b(P=>P.top===B&&P.height===V?P:{top:B,height:V})},[]),Q=e.useCallback(()=>{A.current===null&&(A.current=(S.current??window).requestAnimationFrame(()=>{A.current=null,W()}))},[W]);e.useLayoutEffect(()=>{let C=l.current;if(!C||!i)return;let O=Vh(C);M.current=O;let K=C.ownerDocument.defaultView??window;S.current=K;let U=C.style.overflowAnchor;C.style.overflowAnchor="none";let V=!0,B=()=>{if(!V)return;let x=C.ownerDocument.activeElement,y=x instanceof HTMLElement?x:null;for(;y&&y.parentElement!==C;)y=y.parentElement;w(y?.dataset.visibleKey??null)},P=()=>{queueMicrotask(B)};O.addEventListener("scroll",Q,{passive:!0}),K.addEventListener("resize",Q),C.addEventListener("focusin",B),C.addEventListener("focusout",P);let _=C.clientWidth,N=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{C.clientWidth!==_&&(_=C.clientWidth,p.current.clear(),u()),Q()});return N?.observe(O),O!==C&&N?.observe(C),W(),()=>{V=!1,C.style.overflowAnchor==="none"&&(C.style.overflowAnchor=U),O.removeEventListener("scroll",Q),K.removeEventListener("resize",Q),C.removeEventListener("focusin",B),C.removeEventListener("focusout",P),N?.disconnect(),A.current!==null&&K.cancelAnimationFrame(A.current),A.current=null,M.current=null,S.current=null}},[i,W,Q]),e.useLayoutEffect(()=>{let C=new Set(r);for(let O of p.current.keys())C.has(O)||p.current.delete(O);W()},[r,W]),e.useLayoutEffect(()=>{p.current.clear(),u()},[a]),e.useLayoutEffect(()=>{let C=l.current;if(!C||!i)return;let O=V=>{let B=0,P=!1,{rows:_,viewport:N}=q.current,x=new Map(_.map(y=>[y.id,y]));for(let y of V){let f=y.dataset.visibleKey,L=f?x.get(f):void 0,E=y.getBoundingClientRect().height;!f||!L||E<=0||Math.abs(E-L.height)<.5||(p.current.set(f,E),L.start+L.height<=N.top&&(B+=E-L.height),P=!0)}if(P){let y=M.current,f=C.closest('[data-visible-sections="true"]'),L=C;for(;L&&L.parentElement!==f;)L=L.parentElement;let E=f&&f!==C&&L&&y&&L.getBoundingClientRect().bottom<=y.getBoundingClientRect().top;B&&y&&!E&&(y.scrollTop+=B),u(),Q()}},K=Array.from(C.children).filter(V=>V.hasAttribute("data-visible-key")),U=typeof ResizeObserver>"u"?void 0:new ResizeObserver(V=>O(V.map(B=>B.target)));return K.forEach(V=>U?.observe(V)),O(K),()=>U?.disconnect()}),e.useLayoutEffect(()=>{if(!k)return;let C=Array.from(l.current?.children??[]).find(O=>O.dataset.visibleKey===k.id);C&&(C.scrollIntoView?.({block:"nearest"}),k.selector&&(C.matches(k.selector)?C:C.querySelector(k.selector))?.focus(),W(),I(null))},[k,T,W]);let $=e.useCallback((C,O)=>{I({id:C,selector:O})},[]),[j,G]=i?Bh(T,m):[0,T.length],v=new Set;for(let C=j;C<G;C++)v.add(C);let D=new Set([...s,h,k?.id].filter(Boolean));return D.size&&T.forEach((C,O)=>{D.has(C.id)&&v.add(O)}),{ref:l,show:$,render(C){let O=[],K=0;for(let U of[...v].sort((V,B)=>V-B)){let V=T[U];V.start>K&&O.push(e.createElement("div",{key:`space:${V.id}`,"aria-hidden":!0,style:{height:V.start-K,flex:"0 0 auto",pointerEvents:"none"}})),O.push(e.createElement(e.Fragment,{key:V.id},C(U))),K=V.start+V.height}return F>K&&O.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:F-K,flex:"0 0 auto",pointerEvents:"none"}})),O}}}function Bu(e){return g.markdown.render(e,{inline:!0})}var Hh=2;function Ga(){let e=se(new Date),t=g.getState().dateFormat,r=g.ui.language(),n=De(),s=wc(),a=JSON.stringify(lo());return o.useMemo(()=>({today:e,dateFormat:t,language:r,statuses:n,icons:s,groupColors:a}),[e,t,r,n,s,a])}function Mi(e){let t=new WeakMap;return r=>{let n=t.get(o)??o.memo(e);return t.set(o,n),o.createElement(n,r)}}function Ra(e){let t=o.useRef(null);if(t.current?.value===e)return t.current.value;let r=JSON.stringify(e);return t.current?.json!==r&&(t.current={value:e,json:r}),t.current.value}var Wh=500;function Wu(){return g.runtime.getOrCreate("todo.titleHtml",()=>({html:new Map,pending:new Map}))}function Hu(e){let t=Wu().html,r=t.get(e);if(r!==void 0)return t.delete(e),t.set(e,r),r}function qh(e){let t=Wu(),r=t.pending.get(e);return r||(r=Bu(e).then(n=>(t.html.set(e,n),t.html.size>Wh&&t.html.delete(t.html.keys().next().value),n)).finally(()=>{t.pending.delete(e)}),t.pending.set(e,r)),r}function _i(e){let[t,r]=o.useState(()=>Hu(e)??"");return o.useEffect(()=>{let n=Hu(e);if(n!==void 0){r(n);return}let s=!0;return r(""),qh(e).then(a=>{s&&r(a)}).catch(()=>{s&&r("")}),()=>{s=!1}},[e]),t}function Gi(e,t,r){let n=ke(e),s=o.useRef(null),a=o.useRef(null),i=o.useRef(!1),l=o.useCallback(()=>{a.current!=null&&(window.clearTimeout(a.current),a.current=null)},[]);return o.useEffect(()=>l,[l]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:s,className:"todo-check","data-status":n,type:"checkbox",checked:n==="completed","aria-disabled":t||void 0,onPointerDown:()=>{t||(i.current=!1,l(),a.current=window.setTimeout(()=>{i.current=!0;let c=s.current;c&&g.ui.openMenu(yt().map(u=>({label:u.label,icon:o.createElement(we,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?n==="open":u.status===n,enabled:!t,onSelect:()=>r(e.id,Ee(u.status))})),{anchor:c})},450))},onPointerUp:l,onPointerLeave:l,onClick:c=>{i.current&&c.preventDefault()},onKeyDown:()=>{i.current=!1},onChange:c=>{if(i.current){i.current=!1;return}r(e.id,Ee(c.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),n!=="open"&&n!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(we,{status:n,dotCls:Se(n).cls}))),cancelHold:l}}var qu=Mi(function({todo:t,groups:r,compact:n,actions:s,pending:a,env:i,hideDate:l=!1,onMoveFocus:p}){let c=o.useRef(null);o.useEffect(()=>()=>{c.current&&clearTimeout(c.current)},[]);let u=_i(t.title),m=(_,N)=>g.workspace.openFile(_,void 0,{newTab:N}),b=Xe.find(_=>_.id===t.priority)??Xe[0],h=Ae(r),w=ke(t),k=[t.filePath,...t.attachments??[]].filter(_=>!!_),[I,M]=o.useState(!1),A=I?k:k.slice(0,Hh),S=k.length-A.length,T=t.urls?.length??0,F=n&&k.length>0,q=!!t.remindAt&&!t.reminderFiredAt,W=!!t.status&&t.status!=="open"&&!Se(t.status,i.statuses).done,Q=t.tags?.length??0,$=i.today,j=t.dueDate&&!l?Be(t.dueDate,$,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},i.language,i.dateFormat):"",G=t.dueDate?Me(t.dueDate,i.dateFormat):"",v=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<$,D=!!(j||t.startTime||q||t.group),C=!!(W||t.priority!=="normal"||t.location||T>0||F),O=o.useRef(null);o.useEffect(()=>O.current?sn(t.id,O.current):void 0,[t.id]);let{check:K,cancelHold:U}=Gi(t,a,s.patchTodo),V=()=>{au(t)||s.openDetail(t.id)},B=_=>s.patchTodo(t.id,_),P=o.useMemo(()=>({reschedule:_=>{s.patchTodo(t.id,{dueDate:_})},pickDate:_=>{g.ui.pickDateTime({mode:"date",value:t.dueDate?.slice(0,10)??"",ariaLabel:d("todo.swipe.date")},{anchor:_}).then(N=>{N!==null&&s.patchTodo(t.id,{dueDate:N})})},setStatus:_=>Hr(_,t,B),toggleFlag:()=>{s.patchTodo(t.id,{flagged:!t.flagged})},openDetails:()=>s.openDetail(t.id),remove:()=>{Vt(t,s.removeTodo)}}),[t,s]);return o.createElement(Lu,{todo:t,disabled:a,actions:P,onEngage:U},o.createElement("article",{ref:O,className:`todo-row todo-row-navigable${t.completed?" completed":""}${n?" compact":""}${t.flagged?" flagged":""}`,"data-todo-id":t.id,"data-status":w,tabIndex:0,onContextMenu:_=>Na(_,{todo:t,groupNames:h,setOpenId:s.setMenuId,onEdit:()=>s.openDetail(t.id),onPatch:B,onRequestDelete:()=>Vt(t,s.removeTodo),disabled:a}),onKeyDown:_=>{if(_.target===_.currentTarget){if(_.key==="ArrowDown"||_.key==="ArrowUp"){_.preventDefault(),p?.(t.id,_.key==="ArrowDown"?1:-1);return}if(_.key==="Escape"){_.currentTarget.blur();return}_.key==="Enter"&&(_.preventDefault(),s.openDetail(t.id))}},onClick:_=>{_.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||_.detail>1||(c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{c.current=null,V()},220))},onDoubleClick:_=>{c.current&&(clearTimeout(c.current),c.current=null),!_.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&s.openDetail(t.id)}},K,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,b.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${t.priority}`},b.symbol," "),u?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:u}}):o.createElement("span",{className:"todo-title-md"},t.title)),!n&&t.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},t.note),(D||C||!n&&Q>0)&&o.createElement("div",{className:"todo-view-meta"},D&&o.createElement("div",{className:"todo-meta-line todo-meta-when"},o.createElement("span",{className:"todo-meta-cluster"},j&&o.createElement("button",{className:`todo-date${v?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:G||j}),onClick:_=>{_.stopPropagation(),V()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(mt,null)),o.createElement("span",{className:"todo-date-day"},j),G&&G!==j&&o.createElement("span",{className:"todo-date-full"},G)),t.startTime&&o.createElement("span",{className:"todo-clock-text"},!j&&o.createElement("span",{className:"todo-meta-icon"},o.createElement(Hn,null)),t.startTime,t.endTime?`\u2013${t.endTime}`:""),q&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(Bn,null),t.remindAt.slice(11,16))),t.group&&o.createElement("span",{className:"todo-group-text",title:t.group,style:{color:Te(Ce(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-meta-ellipsis"},t.group))),C&&o.createElement("div",{className:"todo-meta-line todo-meta-details"},W&&o.createElement(ka,{status:t.status}),t.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${t.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(qt,null)),Sl(t.priority)),t.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:t.location.name}),onClick:_=>{_.stopPropagation(),fo(t.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(_e,null)),o.createElement("span",{className:"todo-meta-ellipsis"},t.location.name)),F&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Yt,null)),k.length),T>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(Tt,null),T>1&&T)),!n&&Q>0&&o.createElement("div",{className:"todo-meta-line todo-meta-tags"},t.tags.slice(0,3).map(_=>o.createElement("button",{key:_,className:"todo-tag-text",type:"button",onClick:N=>{N.stopPropagation(),ga(`#${_}`)}},"#",_)),Q>3&&o.createElement("span",{className:"todo-tag-more",title:t.tags.slice(3).map(_=>`#${_}`).join(" ")},"+",Q-3)))),o.createElement("div",{className:"todo-row-actions"},t.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(ve,null)),o.createElement(xu,{todo:t,groupNames:h,setOpenId:s.setMenuId,onEdit:()=>s.openDetail(t.id),onPatch:B,onRequestDelete:()=>Vt(t,s.removeTodo),disabled:a})),!n&&k.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},A.map(_=>o.createElement("button",{key:_,className:"todo-file-card",title:_,onClick:N=>{N.stopPropagation(),m(_,g.ui.hasModKey(N))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},_===t.filePath?o.createElement(kt,null):o.createElement(Yt,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},Vu(_)),o.createElement("span",{className:"todo-file-card-kind"},ki(_))))),(S>0||I)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${I?" open":""}`,title:I?d("todo.fewerFiles"):d("todo.moreFiles",{p0:S}),"aria-expanded":I,onClick:_=>{_.stopPropagation(),M(N=>!N)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(Ho,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},I?d("todo.fewerFiles"):d("todo.moreFiles",{p0:S})))))))});var Yu=({todos:e,groups:t,compact:r,hideDate:n=!1,c:s})=>{let a=Le(),i=o.useSyncExternalStore(a.subscribe,a.get,a.get),l=o.useMemo(()=>e.map(w=>w.id),[e]),p=_a(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[s.editingId,s.menuId,s.lastCreatedId,i?.todoId]}),c=p.show;o.useLayoutEffect(()=>{i&&l.includes(i.todoId)&&c(i.todoId)},[i,l,c]);let u=Ga(),m=Ra(t),b=o.useRef(e);b.current=e;let h=o.useCallback((w,k)=>{let I=b.current,M=I.findIndex(S=>S.id===w),A=I[Math.max(0,Math.min(I.length-1,M+k))];A&&c(A.id,".todo-row")},[c]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(w=>o.createElement(qu,{key:e[w].id,todo:e[w],groups:m,compact:r,actions:s.actions,pending:s.pendingIds.has(e[w].id),env:u,hideDate:n,onMoveFocus:h})))};function Xu({sections:e,c:t,compact:r=!1,className:n,estimate:s,layoutKey:a,children:i}){let l=Le(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),c=o.useMemo(()=>e.map(M=>M.key),[e]),[u,m]=o.useState(null),b=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),h=e.filter(M=>M.todos.some(A=>b.has(A.id))).map(M=>M.key),w=o.useCallback((M,A)=>s?.(e[A])??32+e[A].todos.length*(r?52:84),[e,r,s]),k=_a(o,{ids:c,estimate:w,pinned:h,layoutKey:a??r}),I=k.show;return o.useLayoutEffect(()=>{if(!p)return;let M=e.find(A=>A.todos.some(S=>S.id===p.todoId));M&&I(M.key)},[p,e,I]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:k.ref,onDragStartCapture:M=>m(M.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>m(null)},k.render(M=>o.cloneElement(i(e[M]),{"data-visible-key":c[M]})))}function Yh(e,t,r,n,s){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return po(`${t}-01`).toLocaleDateString(s,{month:"long",year:"numeric"});if(e==="weekly"){let a=po(t),i=new Date(a.getFullYear(),a.getMonth(),a.getDate()+6);return d("todo.breakdown.weekLabel",{count:oc(a),p0:`${Ln(t,s,n)} \u2013 ${Ln(pt(i),s,n)}`})}return t===wt(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===wt(r,1)?d("todo.due.tomorrow"):Ln(t,s,n)}function za({todos:e,groups:t,compact:r,controller:n,mode:s,weekStart:a,timeline:i=!1}){let l=pt(),{shortDateFormat:p}=tt("shortDateFormat"),c=g.ui.language(),u=o.useMemo(()=>{if(!i)return ni(e,s,Dr(a));let m=new Map(e.map(b=>[b,oi(b)]));return ni(ac(e,m),s,Dr(a),{dateOf:b=>ri(m.get(b))})},[s,i,e,a]);return o.createElement(Xu,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},m=>o.createElement("section",{className:"todo-panel-date-section",key:`${m.kind}:${m.key}`},o.createElement("div",{className:"todo-panel-date-head"},Yh(m.kind,m.key,l,p,c)),o.createElement(Yu,{todos:m.todos,groups:t,compact:r,c:n})))}function Zu(e){return e.kind==="groups"?{names:e.names,includeUngrouped:e.includeUngrouped===!0}:{names:[],includeUngrouped:e.kind==="nogroup"}}function Ju(e){return e.names.length||e.includeUngrouped?{kind:"groups",names:e.names,includeUngrouped:e.includeUngrouped}:Ge}function Qu(e,t){return e.some(r=>J(r)===J(t))?e.filter(r=>J(r)!==J(t)):[...e,t]}function Xh(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function sr(e,t,r){let n=Xh(e,t);return r?n:n.filter(s=>!Kt(s))}function Zh(){let[e,t]=At(),[r]=Dt(),s=it().map(u=>u.id),a=sr(e,s,r),i=s.filter(u=>!Kt(u)),l=s.filter(u=>Kt(u)),p=u=>u.length===a.length&&u.every(m=>a.includes(m)),c=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:a.length===s.length,select:()=>{Ct(!0),t("all")}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:p(l),select:()=>{Ct(!0),t(l)}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:p(i),select:()=>{Ct(!1),t(i)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},c.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function ep(){let[e,t]=At(),[r]=Dt(),n=it(),s=n.map(l=>l.id),a=sr(e,s,r),i=l=>{let p=a.includes(l)?a.filter(c=>c!==l):s.filter(c=>a.includes(c)||c===l);p.length&&(Ct(p.some(c=>Kt(c))),t(p.length===s.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(Zh,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=a.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>i(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(we,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,l.label))}))}function Fa(e,t){let{view:r,showCompleted:n,today:s,statusFilter:a,priorities:i}=t,l=t.search.trim()?el(t.search):null,p=t.selectedDateRange?.start??t.selectedDate,c=t.selectedDateRange?.end??t.selectedDate;return e.filter(u=>{if(!jc(u,r,n,s)||a!=="all"&&!En(u,a)||i?.length&&!i.includes(u.priority)||l&&!l(u))return!1;if(!p||!c)return!0;let m=u.dueDate?.slice(0,10);return!!m&&m>=p&&m<=c})}function tp({c:e,view:t,today:r,dateFormat:n,pageActive:s}){let[a,i]=o.useState(""),[l,p]=o.useState(""),[c,u]=o.useState(""),[m,b]=o.useState({}),[h,w]=o.useState(!1),[k,I]=o.useState(!0),[M,A]=o.useState(!1),[S,T]=o.useState(!1),{DateField:F,TimeField:q}=g.ui.settings,[W,Q]=o.useState(!1),$=o.useRef(null),j=o.useRef(null),G=o.useRef(null),v=t.kind==="groups"&&t.names.length===1&&!t.includeUngrouped?t.names[0]:void 0,D=async()=>{if(e.creating)return;let P=Mn(a,r),_=P.title;if(!_){O();return}let N=v;if(t.kind==="groups"&&t.names.length+(t.includeUngrouped?1:0)>1){let f=await g.ui.openMenu([...t.names.map((L,E)=>({id:`group:${E}`,label:L})),...t.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:$.current??G.current,align:"start"});if(f===null)return;N=f.startsWith("group:")?t.names[Number(f.slice(6))]:void 0}T(!1);let x={note:l.trim(),tags:[...new Set([...m.tags??[],...c.split(/[\s,]+/).map(f=>f.replace(/^#+/,"")).filter(Boolean)])],priority:P.priority,...N?{group:N}:{}};t.kind==="smart"&&t.id==="flagged"&&(x.flagged=!0),Object.assign(x,{...m,tags:x.tags}),P.dueDate&&(x.dueDate=P.dueDate),await e.create(_,void 0,{patch:x})?(T(!1),i(""),p(""),u(""),b({}),w(!1),I(!0),A(!1),$.current?.focus()):T(!0)},C=()=>{Q(!0),window.setTimeout(()=>$.current?.focus(),0)},O=()=>{i(""),Q(!1),p(""),u(""),b({}),w(!1),I(!0),A(!1),T(!1)},K=Le(),U=o.useSyncExternalStore(K.subscribe,K.get,K.get);o.useEffect(()=>{U?.mode==="create"&&(Q(!0),K.clear())},[U,K]),o.useEffect(()=>{W&&!e.creating&&$.current?.focus()},[W,s,e.creating]),o.useLayoutEffect(()=>{j.current&&(j.current.style.height="auto",j.current.style.height=`${j.current.scrollHeight}px`)},[l,W]);let V=m.dueDate??"",B=W&&o.createElement("form",{className:"todo-compose",onSubmit:P=>{P.preventDefault(),D()},onKeyDown:P=>{P.key==="Escape"&&!P.defaultPrevented&&!e.creating&&(P.preventDefault(),O())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:$,className:"todo-compose-title",value:a,onChange:P=>i(P.target.value),placeholder:v?d("todo.newTodoIn",{p0:v}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:e.creating}),o.createElement("textarea",{ref:j,className:"todo-compose-note",rows:1,value:l,onChange:P=>p(P.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:e.creating}),o.createElement("div",{className:"todo-compose-tags"},(m.tags??[]).map(P=>o.createElement("span",{className:"todo-compose-token",key:P},o.createElement("span",null,"#",P),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:P}),disabled:e.creating,onClick:()=>b(_=>({..._,tags:_.tags?.filter(N=>N!==P)}))},o.createElement(be,null)))),o.createElement("input",{value:c,onChange:P=>{let _=P.target.value;if(!("isComposing"in P.nativeEvent&&P.nativeEvent.isComposing)&&/[\s,]/.test(_)){let N=_.split(/[\s,]+/),x=N.pop()??"";b(y=>({...y,tags:[...new Set([...y.tags??[],...N.map(f=>f.replace(/^#+/,"")).filter(Boolean)])]})),u(x)}else u(_)},onKeyDown:P=>{P.nativeEvent.isComposing||(P.key==="Enter"&&c.trim()&&(P.preventDefault(),b(_=>({..._,tags:[...new Set([..._.tags??[],c.trim().replace(/^#+/,"")].filter(Boolean))]})),u("")),P.key==="Backspace"&&!c&&b(_=>({..._,tags:_.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:e.creating})),k&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(F,{className:"todo-compose-date-field",value:V,onChange:P=>b(_=>({..._,dueDate:P})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:e.creating}),o.createElement(q,{className:"todo-compose-time-field",value:m.startTime??"",onChange:P=>b(_=>({..._,startTime:P||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:e.creating})),M&&o.createElement("div",{className:"todo-compose-location"},o.createElement(Yo,{value:m.location,disabled:e.creating,onChange:P=>b(_=>({..._,location:P}))})),(h||!!m.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(m.attachments??[]).map(P=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:P,title:P},o.createElement(Yt,null),o.createElement("span",null,P.split("/").pop()),o.createElement("button",{type:"button",disabled:e.creating,"aria-label":`${d("todo.removeAttachment")}: ${P}`,onClick:()=>b(_=>({..._,attachments:_.attachments?.filter(N=>N!==P)}))},o.createElement(be,null)))),h&&o.createElement(g.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:e.creating,onChange:P=>{P&&(b(_=>({..._,attachments:[...new Set([..._.attachments??[],P])]})),w(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${V?" has-value":""}`,"aria-pressed":k,disabled:e.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>I(P=>!P)},o.createElement(mt,null),V&&o.createElement("span",null,Be(V,r,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},g.ui.language(),n),m.startTime?` ${m.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${m.location?" has-value":""}`,"aria-pressed":M,disabled:e.creating,"aria-label":d("todo.compose.addPlace"),title:m.location?.name??d("todo.compose.addPlace"),onClick:()=>A(P=>!P)},o.createElement(_e,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${m.attachments?.length?" has-value":""}`,"aria-pressed":h,disabled:e.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>w(P=>!P)},o.createElement(Yt,null),!!m.attachments?.length&&o.createElement("span",null,m.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${m.priority&&m.priority!=="normal"?" has-value":""}`,disabled:e.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async P=>{let _=await g.ui.openMenu(Xe.map(N=>({id:N.id,label:d(N.labelKey),checked:N.id===(m.priority??"normal")})),{anchor:P.currentTarget,align:"start"});_&&b(N=>({...N,priority:_}))}},o.createElement(qt,null),m.priority&&m.priority!=="normal"&&o.createElement("span",null,d(`todo.priority.${m.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>b(P=>({...P,flagged:!(P.flagged??(t.kind==="smart"&&t.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":m.flagged??(t.kind==="smart"&&t.id==="flagged"),disabled:e.creating},o.createElement(ve,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!a.trim()||e.creating},d("todo.group.add"))),S&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:O,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:e.creating},o.createElement(be,null)));return{composing:W,open:C,form:B,fabRef:G}}function op({groups:e,row:t}){let[r,n,s]=Fl(),a=o.useMemo(()=>e.filter(m=>e.some(b=>b.parent===m.id)).map(m=>m.id),[e]),i=a.length>0&&a.every(m=>r.has(m)),l=o.useRef(null),p=o.useRef(null),[c,u]=o.useState(null);return o.createElement("div",{className:"todo-navigation-groups",onDragOver:m=>{l.current&&p.current&&m.preventDefault()},onDrop:m=>{let b=l.current,h=p.current;l.current=null,p.current=null,u(null),!(!b||!h)&&(m.preventDefault(),Qs(b.id,h).catch(()=>{}))}},o.createElement("div",{className:"todo-navigation-groups-head"},o.createElement("span",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),a.length>0&&o.createElement("button",{type:"button",className:"panel-tool-btn todo-groups-fold-all","aria-label":d(i?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),title:d(i?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),onClick:()=>s(i?[]:a)},i?o.createElement(qo,null):o.createElement(Mc,null))),e.filter(m=>!(m.parent&&r.has(m.parent))).map((m,b,h)=>{let w=e.some(A=>A.parent===m.id),k=w&&r.has(m.id),I=(A,S)=>{let T=A.currentTarget.getBoundingClientRect(),F=(Number.isFinite(A.clientX)?A.clientX:S.x)-S.x;return $l(S.id,m.id,A.clientY<T.top+T.height/2?"before":"after",F>20?1:F<-20?-1:0,k)},M=(A,S)=>{let T=h.filter(W=>W.id!==S&&W.parent!==S),F=A.parent!==null&&!r.has(A.parent);if(A.before!==null&&T.some(W=>W.id===A.before))return{id:A.before,position:"before",nested:F};let q=A.parent===null?T.at(-1):T.filter(W=>W.id===A.parent||W.parent===A.parent).at(-1);return q?{id:q.id,position:"after",nested:F}:null};return o.createElement("div",{key:m.id,className:`todo-group-nav-row${c?.id===m.id?` drop-${c.position}${c.nested?" drop-nested":""}`:""}`,draggable:!0,onDragStart:A=>{l.current={id:m.id,x:Number.isFinite(A.clientX)?A.clientX:0},A.dataTransfer.effectAllowed="move",A.dataTransfer.setData("text/plain",m.id)},onDragOver:A=>{let S=l.current;if(!S)return;let T=I(A,S),F=T?M(T,S.id):null;if(p.current=F?T:null,!F){c&&u(null);return}A.preventDefault(),A.dataTransfer.dropEffect="move",(c?.id!==F.id||c.position!==F.position||c.nested!==F.nested)&&u(F)},onDrop:A=>{let S=l.current,T=S?I(A,S):null;l.current=null,p.current=null,u(null),A.stopPropagation(),!(!S||!T)&&(A.preventDefault(),Qs(S.id,T).catch(()=>{}))},onDragEnd:()=>{l.current=null,p.current=null,u(null)}},w&&o.createElement("button",{type:"button",className:"todo-group-toggle","aria-expanded":!k,"aria-label":d(k?"todo.view.expandGroup":"todo.view.collapseGroup",{p0:m.name}),onClick:()=>n(m.id)},k?o.createElement(ea,null):o.createElement(Ho,null)),t(m))}))}function Wr(e){return e==="flagged"?o.createElement(ve,null):e==="priority"?o.createElement(qt,null):e==="due"?o.createElement(Wo,null):e==="updated"?o.createElement(Ac,null):e==="created"?o.createElement(Cc,null):o.createElement(Dc,null)}function $a({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[s,a]=o.useState(e),[i,l]=o.useState(r),p=Object.entries($o);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${i==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":i==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(Bo,null)),o.createElement("button",{className:`todo-sort-direction${i==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":i==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement(Vo,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([c,u])=>o.createElement("button",{key:c,type:"button",className:`todo-sort-option${s===c?" active":""}`,"aria-pressed":s===c,onClick:()=>{a(c),t(c)}},Wr(c),o.createElement("span",null,d(u))))))}function rp({todos:e,groups:t,names:r,hasUngrouped:n,selected:s,includeUngrouped:a,onChange:i,onOpenSettings:l}){let[p,c]=o.useState(s),[u,m]=o.useState(a),b=p.length===r.length&&(!n||u),h=[...r.map(M=>p.some(A=>A.toLowerCase()===M.toLowerCase())),...n?[u]:[]],w=(M,A)=>M?` active${h[A-1]?"":" selection-run-start"}${h[A+1]?"":" selection-run-end"}`:"",k=o.useMemo(()=>ia(e),[e]),I=(M,A)=>{c(M),m(A),i(M,A)};return o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>I(b?[]:r,b?!1:n)},d(b?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((M,A)=>{let S=h[A];return o.createElement("button",{key:M,type:"button",className:`todo-group-filter-row${vn(M,t)?" todo-subgroup":""}${w(S,A)}`,"aria-pressed":S,onClick:()=>I(S?p.filter(T=>T.toLowerCase()!==M.toLowerCase()):[...p,M],u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},S?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:Te(Ce(M,t))}}),o.createElement("span",{className:"todo-tree-label"},M),o.createElement("span",{className:"todo-tree-count"},Gr(k,M)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${w(u,r.length)}`,"aria-pressed":u,onClick:()=>I(p,!u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Gr(k,null)))))}var np={scheduled:()=>o.createElement(Wo,null),today:()=>o.createElement(Nr,null),week:()=>o.createElement(oa,null),flagged:()=>o.createElement(ve,null),all:()=>o.createElement(Pr,null),completed:()=>o.createElement(je,null)},Jh=()=>{let{activePluginTab:e,dateFormat:t}=tt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=va(),s=Qe(),a=pu(),[i,l]=ha(),[p]=Dt(),[c,u]=pa("todo"),{sortField:m,sortDir:b,compact:h}=c,[w,k]=At(),I=it(),M=ma(),A=tu(),S=o.useMemo(()=>Kc(A),[A]),T=e?.pluginId===g.pluginId,F=ar(m,b,"left_sidebar");So(F.openDetail);let q=se(new Date),W=o.useMemo(()=>Vc(F.todos,q),[F.todos,q]),Q=o.useMemo(()=>ia(F.todos),[F.todos]),$=o.useMemo(()=>Fa(F.ordered,{view:a,showCompleted:p,today:q,statusFilter:w,search:i,selectedDate:r,selectedDateRange:n}),[F.ordered,a,p,w,i,r,n,q]),j=tp({c:F,view:a,today:q,dateFormat:t,pageActive:T}),G=I.map(E=>E.id),v=sr(w,G,p),D=G.filter(E=>Kt(E)),C=E=>E.length===v.length&&E.every(z=>v.includes(z)),O=C(G)?"all":C(D)?"completed":C(G.filter(E=>!Kt(E)))?"todo":null,K={all:o.createElement(Pr,null),completed:o.createElement(je,null),todo:o.createElement(Pc,null)},U={all:d("todo.chip.all"),completed:d("todo.view.completed"),todo:d("todo.status.todo")},V=E=>{g.ui.openMenu(["all","completed","todo"].map(z=>({label:U[z],icon:K[z],type:"radio",checked:O===z,onSelect:()=>{Ct(z!=="todo"),k(z==="completed"&&D.length?D:"all")}})),{anchor:E,align:"end"})},B=E=>{g.ui.openPopover(()=>o.createElement($a,{sortField:m,setSortField:z=>u({sortField:z}),sortDir:b,setSortDir:z=>u({sortDir:z})}),{anchor:E,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},P=()=>{g.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},_=(E,z)=>{if(z.shiftKey){let H=Zu(a);Kr(Ju({...H,names:Qu(H.names,E)}))}else Kr({kind:"groups",names:[E]})},N=(E,z,H,ee,ie,ce,te,fe,We)=>{let Re=da(a,z),ot=z.kind==="groups"&&z.names.length===1&&!z.includeUngrouped&&a.kind==="groups"?a.names.some(ze=>J(ze)===J(z.names[0])):Re;return o.createElement("button",{key:lt(z),type:"button",className:`todo-tree-row${ie?" nested":""}${We?" todo-subgroup":""}${ce?` todo-${ce}-chip`:""}${ot?" active":""}`,"aria-current":Re?"true":void 0,"aria-label":ce?`${E} ${H}`:void 0,title:ce?E:void 0,"aria-pressed":z.kind==="groups"?ot:void 0,style:te?{"--todo-chip-color":Te(te),"--todo-chip-on":fe??Mt(te)}:void 0,onClick:ze=>{xa(ze)||z.kind!=="groups"||z.names.length!==1?Kr(z,xa(ze)):_(z.names[0],ze)},onAuxClick:ze=>{ze.button===1&&(ze.preventDefault(),Kr(z,!0))}},ee&&o.createElement("span",{className:"todo-tree-icon"},ee),ie&&o.createElement("span",{className:"todo-tree-dot",style:{background:Te(ie)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},E),o.createElement("span",{className:"todo-tree-count"},H))},y=!!(i||r||n||w!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),f=n?`${Me(n.start,t)} \u2013 ${Me(n.end,t)}`:r?Me(r,t):null,L=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!T&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${O==="todo"?"":" active"}`,"aria-label":d("todo.filters.title"),"aria-haspopup":"menu",title:O?`${d("todo.filters.title")}: ${U[O]}`:d("todo.filters.title"),type:"button",onClick:E=>V(E.currentTarget)},O?K[O]:o.createElement($c,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":h,title:h?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>u({compact:!h})},h?o.createElement(Kn,null):o.createElement(jn,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${b==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d($o[m])}`,type:"button",onClick:E=>B(E.currentTarget)},b==="asc"?o.createElement(Vo,null):o.createElement(Bo,null),Wr(m))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:E=>xa(E)?er(a,!0):g.workspace.openMainTab(),onAuxClick:E=>{E.button===1&&(E.preventDefault(),er(a,!0))}}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(xt,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:i,onChange:E=>l(E.target.value),onKeyDown:E=>{E.key==="Escape"&&l("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),i&&o.createElement("button",{className:"search-field-action",onClick:()=>l(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(be,null)))),T?o.createElement("div",{className:"todo-tree todo-active-navigation"},j.form,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},S.map(E=>N(d(E.labelKey),{kind:"smart",id:E.id},W[E.id],np[E.id](),void 0,"smart",E.color,_r(E,Mt)))),o.createElement(op,{groups:s,row:E=>N(E.name,{kind:"groups",names:[E.name]},Gr(Q,E.name),void 0,Ce(E.name,s),void 0,void 0,void 0,E.parent!==void 0)})):o.createElement(o.Fragment,null,!i&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},f?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:P},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Nr,null)),o.createElement("span",{className:"todo-tree-label"},f),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(be,null))):S.map(E=>N(d(E.labelKey),{kind:"smart",id:E.id},W[E.id],np[E.id](),void 0,"smart",E.color,_r(E,Mt))))),o.createElement("div",{className:"todo-list"},j.form,F.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):$.length?o.createElement(za,{todos:$,groups:s,compact:h,controller:F,mode:M,weekStart:g.getState().weekStart,timeline:a.kind==="smart"&&a.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,y)))),!j.composing&&o.createElement("button",{ref:j.fabRef,className:"todo-fab",type:"button","aria-label":L,title:L,disabled:F.creating,onClick:j.open},o.createElement(dt,null)),o.createElement(nr,{c:F}))},ap=()=>o.createElement(Jh,null);function Ua(){return g.workspace.openOwnSettings("groups"),Promise.resolve()}function Qh({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let s=it(),[a,i]=o.useState(e),[l,p]=o.useState(r),c=s.map(h=>h.id),u=l==="all"?c:l,m=h=>{i(h),t(h)},b=h=>{let w=u.includes(h)?u.filter(I=>I!==h):c.filter(I=>u.includes(I)||I===h);if(!w.length)return;let k=w.length===c.length?"all":w;p(k),n(k)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${a?"":" active"}`,onClick:()=>m(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${a?" active":""}`,onClick:()=>m(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},s.map(h=>o.createElement("button",{key:h.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(h.id),onClick:()=>b(h.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(h.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(we,{status:h.id==="open"?null:h.id,dotCls:h.cls})),o.createElement("span",null,h.label)))))}var sp=()=>{let{activePath:e,weekStart:t}=tt("activePath","weekStart"),r=Jt(e)??"",n=Qe(),s=ma(),[a,i]=pa("attachment"),{showCompleted:l,statusFilter:p,compact:c,sortField:u,sortDir:m,groupNames:b,includeUngrouped:h}=a,w=$=>i({showCompleted:$}),k=$=>i({statusFilter:$}),I=$=>i({sortField:$}),M=$=>i({sortDir:$}),A=ar(u,m,"right_sidebar");So(A.openDetail);let S=o.useMemo(()=>Ae(n),[n]),T=o.useMemo(()=>A.todos.some($=>!$.group),[A.todos]),F=o.useMemo(()=>A.ordered.filter($=>!(Jt($.filePath)===r||($.attachments??[]).some(G=>Jt(G)===r))||!l&&$.completed||(b.length||h)&&(!$.group&&!h||$.group&&!b.some(G=>bt(G).has(J($.group??""))))?!1:En($,p)),[A.ordered,r,l,p,b,h]),q=$=>{g.ui.openPopover(({close:j})=>o.createElement(rp,{todos:A.todos,groups:n,names:S,hasUngrouped:T,selected:b,includeUngrouped:h,onChange:(G,v)=>i({groupNames:G,includeUngrouped:v}),onOpenSettings:()=>{j(),Ua()}}),{anchor:$,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},W=$=>{g.ui.openPopover(()=>o.createElement(Qh,{showCompleted:l,setShowCompleted:w,filter:p,setFilter:k}),{anchor:$,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},Q=$=>{g.ui.openPopover(()=>o.createElement($a,{sortField:u,setSortField:I,sortDir:m,setSortDir:M}),{anchor:$,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${b.length||h?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:$=>q($.currentTarget)},o.createElement(Wn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:$=>W($.currentTarget)},o.createElement(je,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":c,"aria-label":d("auto.e3719eae891e"),onClick:()=>i({compact:!c})},c?o.createElement(Kn,null):o.createElement(jn,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${m==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d($o[u])}`,onClick:$=>Q($.currentTarget)},m==="asc"?o.createElement(Vo,null):o.createElement(Bo,null),Wr(u)))),o.createElement("div",{className:"todo-list"},A.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?F.length?o.createElement(za,{todos:F,groups:n,compact:c,controller:A,mode:s,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(nr,{c:A}))};var ip=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],eb=["title","due","priority","group","note"],Ka=[10,20,30,40,50,100,200,500],Pt=Xe.map(e=>e.id).reverse(),Ri=ip.map(e=>e.id),wo={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function bo(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let s=n.getBoundingClientRect().width;return n.remove(),Math.ceil(s)}var yo=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function dp(e){let[t,r]=o.useState({due:wo.due,priority:wo.priority,flagged:wo.flagged,mins:{...qr}}),n=g.getState().dateFormat,s=g.ui.language();return o.useLayoutEffect(()=>{let a=e.current;if(!a)return;let i=se(new Date),l={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},p=[l.today,l.tomorrow,l.yesterday,...Array.from({length:12},(k,I)=>Be(`2030-${String(I+1).padStart(2,"0")}-28`,i,l,s,n))],c=Math.max(...p.map(k=>bo(a,"todo-table-cell-btn is-overdue",`<span>${yo(k)}</span><span class="todo-table-time">23:59</span>`)),bo(a,"todo-table-sort active",`<span>${yo(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...Pt.map(k=>bo(a,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${yo(Oe(k))}</span>`)),bo(a,"todo-table-sort active",`<span>${yo(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),m=bo(a,"todo-table-sort active",`<span>${yo(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),b=k=>bo(a,"todo-table-sort active",`<span>${yo(d(k))}</span><svg width="12" height="12"></svg>`)+16,h=Object.fromEntries(Ha.map(k=>[k,Math.max(qr[k],b(k==="title"?"todo.table.title":ja[k]))])),w={due:Math.max(c+10,96),priority:Math.max(u+10,72),flagged:Math.max(m+10,48),mins:h};r(k=>JSON.stringify(k)===JSON.stringify(w)?k:w)},[e,n,s]),t}var tb=360;function lp(e,t){let[r,n]=o.useState(wo.tags),s=o.useMemo(()=>[...new Set(t.map(i=>(i.tags??[]).join(`
`)).filter(Boolean))],[t]),a=s.join("\0");return o.useLayoutEffect(()=>{let i=e.current;if(!i)return;let l=Math.max(0,...s.map(p=>bo(i,"",p.split(`
`).map(c=>`<span class="todo-table-tag">#${yo(c)}</span>`).join(""))));n(Math.min(tb,Math.max(wo.tags,l+12)))},[e,a]),r}var cp=240,up=82,ja=Object.fromEntries(ip.map(e=>[e.id,e.labelKey]));function ob(e){if(!Array.isArray(e))return eb;let t=[...new Set(e)].filter(r=>r==="title"||Ri.includes(r));return t.includes("title")?t:["title",...t]}function rb(e){return Array.isArray(e)?Pt.filter(t=>e.includes(t)):[]}function pp(e){return Ka.includes(e)?e:Ka[0]}function Yr(e,t){let[r,n]=o.useState(()=>t(g.settings.get()[e]));o.useEffect(()=>g.settings.subscribe(()=>{let a=t(g.settings.get()[e]);n(i=>JSON.stringify(i)===JSON.stringify(a)?i:a)}),[e,t]);let s=o.useCallback(a=>{n(a),g.settings.set(e,a)},[e]);return[r,s]}var Va=()=>Yr("pageColumns",ob),Ba=e=>e==="title"?"todo.table.title":ja[e],Xr=()=>Yr("pagePriorityFilter",rb),Ha=["title","note","group","location","tags"],qr={title:180,note:120,group:104,location:104,tags:96},zi=900;function mp(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of Ha){let s=t[n];typeof s=="number"&&Number.isFinite(s)&&(r[n]=Math.round(Math.min(zi,Math.max(qr[n],s))))}return r}function nb({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:s=>n(s.currentTarget)},r)}function fp(){let[e]=At(),[t]=Dt(),n=it().map(l=>l.id),s=sr(e,n,t),a=e!=="all"&&s.length!==n.length,i=d("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${a?" active":""}`,"aria-label":i,title:i,onClick:l=>{g.ui.openPopover(()=>o.createElement(ep,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:i})}},o.createElement(je,null))}function ab(){let[e,t]=Xr();return o.createElement("div",{className:"todo-status-filter-menu"},Pt.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(s=>s!==r):Pt.filter(s=>e.includes(s)||s===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(Ze,{priority:r})),o.createElement("span",null,Oe(r)))}))}function gp(){let[e]=Xr();return o.createElement(nb,{label:d("todo.table.priority"),active:e.length>0,icon:o.createElement(qt,null),onOpen:t=>{g.ui.openPopover(()=>o.createElement(ab,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function sb(){let[e,t]=Va(),r=[...e,...Ri.filter(p=>!e.includes(p))],[n,s]=o.useState(null),[a,i]=o.useState(null),l=(p,c,u)=>{if(p===c)return;let m=r.filter(b=>b!==p);m.splice(m.indexOf(c)+(u?1:0),0,p),t(m.filter(b=>e.includes(b)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{s(null),i(null)}},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,c)=>{let u=e.includes(p),m=p==="title",b=d(Ba(p));return o.createElement("div",{key:p,className:`todo-column-option${m?" is-locked":""}${n===p?" is-dragging":""}${a?.id===p?a.after?" drop-after":" drop-before":""}`,onDragOver:h=>{if(!n)return;h.preventDefault();let w=h.currentTarget.getBoundingClientRect();i({id:p,after:h.clientY>w.top+w.height/2})},onDrop:h=>{h.preventDefault(),n&&a&&l(n,a.id,a.after),s(null),i(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:b}),title:d("todo.table.reorderColumn",{p0:b}),onDragStart:h=>{h.dataTransfer.effectAllowed="move",h.dataTransfer.setData("text/plain",p);let w=h.currentTarget.parentElement;w&&h.dataTransfer.setDragImage(w,12,w.offsetHeight/2),s(p)},onKeyDown:h=>{if(!h.altKey||h.key!=="ArrowUp"&&h.key!=="ArrowDown")return;h.preventDefault();let w=r[c+(h.key==="ArrowUp"?-1:1)];w&&l(p,w,h.key==="ArrowDown")}},o.createElement(Ht,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:m,onClick:()=>t(r.filter(h=>h===p?!u:e.includes(h)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,b)))}))}function hp(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{g.ui.openPopover(()=>o.createElement(sb,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},o.createElement(Fc,null))}function Fi({field:e,label:t,className:r,sort:n,onSort:s,width:a,resize:i,thProps:l}){let p=n.field===e,c=p?n.dir==="asc"?Jn:Qn:qo;return o.createElement("th",{...l,className:r,style:a===void 0?void 0:{width:a},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>s(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(c,null)),i)}function bp({id:e,label:t,min:r,onDrag:n,onCommit:s,onReset:a}){let i=o.useRef(null),l=p=>Math.round(Math.min(zi,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:t}),title:d("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),a(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let c=p.currentTarget.parentElement,u=c?c.getBoundingClientRect().width:qr[e];i.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!i.current)return;let c=l(i.current.startWidth+p.clientX-i.current.startX);i.current.width=c,n(e,c)},onPointerUp:p=>{i.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),s(e,i.current.width),i.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),i.current=null}})}var yp='input, button, a, textarea, [contenteditable="true"]',wp=Mi(function({todo:t,groups:r,columns:n,actions:s,pending:a,env:i,selected:l,current:p,onPick:c,onSelect:u,onMove:m,onClear:b}){let h=o.useRef(null);o.useEffect(()=>h.current?sn(t.id,h.current):void 0,[t.id]);let w=_i(t.title),k=or(t.note),{check:I}=Gi(t,a,s.patchTodo),M=ke(t),A=N=>s.patchTodo(t.id,N),S=i.today,T=i.dateFormat,F=t.dueDate?Be(t.dueDate,S,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},i.language,T):"",q=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<S,W=o.useRef(p);W.current=p;let[Q,$]=o.useState(!1),j=o.useRef(null);o.useEffect(()=>()=>{j.current&&clearTimeout(j.current)},[]);let[G,v]=o.useState(t.title),D=()=>{let N=G.trim();$(!1),N&&N!==t.title&&A({title:N})},[C,O]=o.useState(null),K=(N,x)=>{O(N),x.catch(()=>{}).finally(()=>O(y=>y===N?null:y))},U=(N,x,y,f,L=260)=>{K(N,g.ui.openPopover(f,{anchor:x,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:y,width:L}))},V=(N,x,y)=>C===N?o.createElement("span",{className:"todo-table-placeholder"},x,o.createElement("span",null,y)):null,B=N=>`todo-table-${N}${C===N?" is-editing":""}`,P=N=>{let x=t.note,y=()=>{x!==t.note&&A({note:x})};O("note"),g.ui.openPopover(({close:f})=>o.createElement(Aa,{initial:t.note,onInput:L=>{x=L},onDone:()=>{y(),f()}}),{anchor:N,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(y(),!0)}).catch(()=>{}).finally(()=>O(f=>f==="note"?null:f))},_=N=>{switch(N){case"note":return o.createElement("td",{className:B("note"),title:k||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:x=>P(x.currentTarget)},k?o.createElement("span",{className:"todo-table-note-text"},k):V("note",null,d("todo.table.note"))));case"group":return o.createElement("td",{className:B("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:x=>K("group",g.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>A({group:void 0})},...Nt(Ae(r),r,y=>({label:y,type:"radio",checked:t.group===y,color:Ce(y,r),onSelect:()=>A({group:y})}))],{anchor:x.currentTarget,align:"start"}))},t.group?o.createElement(tr,{name:t.group,groups:r}):V("group",null,d("todo.table.group"))));case"priority":return o.createElement("td",{className:B("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${t.priority==="normal"?" muted":""}`,disabled:a,title:d("todo.table.priority"),onClick:x=>K("priority",g.ui.openMenu(Pt.map(y=>({label:Oe(y),icon:o.createElement(Ze,{priority:y}),type:"radio",checked:t.priority===y,onSelect:()=>A({priority:y})})),{anchor:x.currentTarget}))},o.createElement(Ze,{priority:t.priority}),o.createElement("span",null,Oe(t.priority))));case"due":return o.createElement("td",{className:B("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${q?" is-overdue":""}`,disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:t.dueDate?Me(t.dueDate,T):d("todo.field.dueDate"),onClick:x=>U("due",x.currentTarget,d("todo.field.dueDate"),()=>o.createElement(wu,{todo:t,onPatch:y=>{A(y)}}),272)},o.createElement("span",null,F),t.startTime&&o.createElement("span",{className:"todo-table-time"},t.startTime)));case"flagged":return o.createElement("td",{className:B("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${t.flagged?" on":""}`,"aria-pressed":!!t.flagged,disabled:a,"aria-label":d("todo.flag"),title:d(t.flagged?"todo.flagged":"todo.flag"),onClick:()=>A({flagged:!t.flagged})},o.createElement(ve,null)));case"location":return o.createElement("td",{className:B("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:t.location?.name??d("todo.field.location"),onClick:x=>U("location",x.currentTarget,d("todo.field.location"),()=>o.createElement(Da,{todo:t,onPatch:y=>{A(y)}}),300)},t.location?o.createElement(o.Fragment,null,o.createElement(_e,null),o.createElement("span",null,t.location.name)):V("location",o.createElement(_e,null),d("todo.field.location"))));case"tags":return o.createElement("td",{className:B("tags"),title:t.tags?.map(x=>`#${x}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:x=>U("tags",x.currentTarget,d("todo.edit.tags"),()=>o.createElement(Ca,{todo:t,onPatch:y=>{A(y)}}),280)},t.tags?.length?t.tags.map(x=>o.createElement("span",{key:x,className:"todo-table-tag"},"#",x)):V("tags",null,d("todo.table.tags"))))}};return o.createElement("tr",{ref:h,className:`todo-table-row${t.completed?" completed":""}${l?" selected":""}${C||Q?" is-editing":""}`,"data-todo-id":t.id,"data-status":M,"aria-selected":l,tabIndex:0,onContextMenu:N=>Na(N,{todo:t,groupNames:Ae(r),setOpenId:s.setMenuId,onEdit:()=>s.openDetail(t.id),onPatch:A,onRequestDelete:()=>Vt(t,s.removeTodo),disabled:a}),onKeyDown:N=>{N.target===N.currentTarget&&(N.key==="ArrowDown"||N.key==="ArrowUp"?(N.preventDefault(),m(t.id,N.key==="ArrowDown"?1:-1)):N.key==="Enter"?(N.preventDefault(),s.openDetail(t.id)):N.key===" "?(N.preventDefault(),c(t.id,!1)):N.key==="Escape"&&(b(),N.currentTarget.blur()))},onClickCapture:N=>{p||g.ui.hasModKey(N)||N.shiftKey||N.target.closest(".todo-table-select, .todo-table-flag-btn")||(N.stopPropagation(),u(t.id),N.currentTarget.focus({preventScroll:!0}))},onClick:N=>{N.target.closest(yp)||(g.ui.hasModKey(N)||N.shiftKey)&&c(t.id,N.shiftKey)},onDoubleClick:N=>{let x=!!N.target.closest(".todo-table-title-btn");x&&j.current&&(clearTimeout(j.current),j.current=null),!(!x&&N.target.closest(yp)||g.ui.hasModKey(N)||N.shiftKey)&&s.openDetail(t.id)}},o.createElement("td",{className:"todo-table-select"},I),n.map(N=>o.createElement(o.Fragment,{key:N},N==="title"?o.createElement("td",{className:"todo-table-title"},Q?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:G,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:x=>v(x.target.value),onBlur:D,onKeyDown:x=>{x.nativeEvent.isComposing||(x.key==="Enter"?(x.preventDefault(),D()):x.key==="Escape"&&(x.preventDefault(),v(t.title),$(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:a,"aria-label":d("todo.table.editTitle",{p0:t.title}),onClick:x=>{if(g.ui.hasModKey(x)||x.shiftKey){c(t.id,x.shiftKey);return}x.detail>1||(j.current&&clearTimeout(j.current),j.current=setTimeout(()=>{j.current=null,W.current&&(v(t.title),$(!0))},220))}},w?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:w}}):o.createElement("span",{className:"todo-table-title-text"},t.title))):_(N))),o.createElement("td",{className:"todo-table-actions"}))});function ib(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function vp({order:e,groups:t,c:r,newTaskPatch:n,active:s,onActivate:a,onRemove:i}){let[l,p]=o.useState(""),[c,u]=o.useState({}),m=o.useRef(null),b=o.useRef(null),h=o.useRef(!1);o.useEffect(()=>{let G=()=>{let D=m.current;D&&(!D.ownerDocument.hasFocus()&&!/jsdom/i.test(navigator.userAgent)&&D.ownerDocument.defaultView?.focus(),D.focus())};G();let v=window.setTimeout(G,60);return()=>window.clearTimeout(v)},[]);let w=o.useRef({draft:l,draftFields:c,create:r.create,newTaskPatch:n});w.current={draft:l,draftFields:c,create:r.create,newTaskPatch:n};let k=o.useRef(!1),I=o.useRef(!1),M=async(G,v)=>{let{draftFields:D,create:C,newTaskPatch:O}=w.current,K=se(new Date);for(let U of G){let V=Mn(U,K);if(!V.title)continue;let B=V.dueDate||D.dueDate;await C(V.title,void 0,{background:v,patch:{...O?.(),priority:V.priority!=="normal"?V.priority:D.priority??V.priority,...B?{dueDate:B}:{},...D.group?{group:D.group}:{},...D.flagged?{flagged:!0}:{},...D.note?.trim()?{note:D.note}:{},...D.location?{location:D.location}:{},...D.tags?.length?{tags:D.tags}:{},...D.status?Ee(D.status):{}}})}},A=async G=>{k.current=!0;try{await M(G,!1)}finally{k.current=!1}p(""),m.current?.focus()},S=()=>{I.current=!0,i()},T=()=>{if(I.current||k.current)return;I.current=!0;let G=w.current.draft;G.trim()&&M([G],!0),i()};o.useEffect(()=>()=>{I.current||k.current||!w.current.draft.trim()||(I.current=!0,M([w.current.draft],!0))},[]);let F=()=>{window.setTimeout(()=>{let G=b.current?.ownerDocument;h.current||!G||!G.hasFocus()||b.current?.contains(G.activeElement)||T()},0)};o.useEffect(()=>{let G=D=>{h.current||b.current?.contains(D.target)||T()},v=b.current?.ownerDocument;return v?.addEventListener("pointerdown",G,!0),()=>v?.removeEventListener("pointerdown",G,!0)});let q=o.useRef(s);o.useEffect(()=>{q.current&&!s&&T(),q.current=s});let W=G=>{h.current=!0,G.catch(()=>{}).finally(()=>{h.current=!1,m.current?.focus()})},Q=G=>{switch(G){case"due":{let v=c.dueDate,D=v?Be(v,se(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},g.ui.language(),g.getState().dateFormat):"";return o.createElement("td",{key:G,className:"todo-table-due"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:C=>W(g.ui.pickDateTime({mode:"date",value:v??"",ariaLabel:d("todo.field.dueDate")},{anchor:C.currentTarget,align:"start",gap:4}).then(O=>{O!==null&&u(K=>({...K,dueDate:O||void 0}))}))},D?o.createElement("span",null,D):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let v=c.priority??"normal";return o.createElement("td",{key:G,className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${v==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:D=>W(g.ui.openMenu(Pt.map(C=>({label:Oe(C),icon:o.createElement(Ze,{priority:C}),type:"radio",checked:v===C,onSelect:()=>u(O=>({...O,priority:C}))})),{anchor:D.currentTarget}))},o.createElement(Ze,{priority:v}),o.createElement("span",null,Oe(v))))}case"group":return o.createElement("td",{key:G,className:"todo-table-group"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:v=>W(g.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!c.group,onSelect:()=>u(D=>({...D,group:void 0}))},...Nt(Ae(t),t,D=>({label:D,type:"radio",checked:c.group===D,color:Ce(D,t),onSelect:()=>u(C=>({...C,group:D}))}))],{anchor:v.currentTarget,align:"start"}))},c.group?o.createElement(tr,{name:c.group,groups:t}):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return o.createElement("td",{key:G,className:"todo-table-flagged"},o.createElement("button",{type:"button",className:`todo-table-flag-btn${c.flagged?" on":""}`,"aria-pressed":!!c.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>u(v=>({...v,flagged:!v.flagged||void 0}))},o.createElement(ve,null)));case"note":return o.createElement("td",{key:G,className:"todo-table-note",title:c.note||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:v=>{let D=c.note??"",C=()=>u(O=>({...O,note:D||void 0}));W(g.ui.openPopover(({close:O})=>o.createElement(Aa,{initial:c.note??"",onInput:K=>{D=K},onDone:()=>{C(),O()}}),{anchor:v.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(C(),!0)}))}},c.note?o.createElement("span",{className:"todo-table-note-text"},or(c.note)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return o.createElement("td",{key:G,className:"todo-table-location"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:v=>W(g.ui.openPopover(()=>o.createElement(Da,{todo:{location:c.location},onPatch:D=>u(C=>({...C,location:D.location}))}),{anchor:v.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},c.location?o.createElement(o.Fragment,null,o.createElement(_e,null),o.createElement("span",null,c.location.name)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return o.createElement("td",{key:G,className:"todo-table-tags"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:v=>W(g.ui.openPopover(()=>o.createElement(Ca,{todo:{tags:c.tags??[]},onPatch:D=>u(C=>({...C,tags:D.tags}))}),{anchor:v.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},c.tags?.length?c.tags.map(v=>o.createElement("span",{key:v,className:"todo-table-tag"},"#",v)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return o.createElement("td",{key:G,className:`todo-table-${G}`})}},$=c.status?yt().find(G=>G.status===c.status):void 0,j=G=>W(g.ui.openMenu(yt().map(v=>({label:v.label,icon:o.createElement(we,{status:v.status,dotCls:v.cls,color:v.color}),type:"radio",checked:v.status===null?!c.status:v.status===c.status,onSelect:()=>u(D=>({...D,status:v.status}))})),{anchor:G}));return o.createElement("tr",{className:"todo-table-new-row",ref:b,onBlur:F,onFocus:a},o.createElement("td",{className:"todo-table-select"},o.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:$?.label??d("todo.table.status"),onClick:G=>j(G.currentTarget)},$?o.createElement(we,{status:$.status,dotCls:$.cls}):o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),e.map(G=>G==="title"?o.createElement("td",{key:G,className:"todo-table-title"},o.createElement("input",{ref:m,className:"todo-table-new-input",value:l,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:v=>p(v.target.value),onKeyDown:v=>{v.nativeEvent.isComposing||(v.key==="Enter"?(v.preventDefault(),l.trim()?A([l]):S()):v.key==="Escape"&&(v.preventDefault(),S()))},onPaste:v=>{let D=v.clipboardData.getData("text/plain");/\r?\n/.test(D.trim())&&(v.preventDefault(),A(ib(`${l}${D}`)))}})):Q(G)),o.createElement("td",{className:"todo-table-actions"}))}function xp({todos:e,groups:t,c:r,sort:n,onSort:s,resetKey:a,empty:i,sectionOf:l,composeSignal:p=0,newTaskPatch:c,instanceId:u}){let[m,b]=Va(),h=m.filter(R=>R!=="title"),[w,k]=o.useState(null),[I,M]=o.useState(null),A=R=>({className:`${w===R?" is-dragging":""}${I?.id===R?I.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:Y=>{if(Y.target.closest(".todo-col-resize")){Y.preventDefault();return}Y.dataTransfer.effectAllowed="move",Y.dataTransfer.setData("text/plain",R);let ae=Y.currentTarget.ownerDocument,pe=ae.createElement("div");pe.className="todo-col-drag-chip",pe.textContent=d(Ba(R)),ae.body.appendChild(pe),Y.dataTransfer.setDragImage?.(pe,Math.round(pe.offsetWidth/2),Math.round(pe.offsetHeight/2)),window.setTimeout(()=>pe.remove(),0),k(R)},onDragOver:Y=>{if(!w||w===R)return;Y.preventDefault(),Y.dataTransfer.dropEffect="move";let ae=Y.currentTarget.getBoundingClientRect();M({id:R,after:Y.clientX>ae.left+ae.width/2})},onDrop:Y=>{if(Y.preventDefault(),w&&I&&w!==I.id){let ae=m.filter(pe=>pe!==w);ae.splice(ae.indexOf(I.id)+(I.after?1:0),0,w),b(ae)}k(null),M(null)},onDragEnd:()=>{k(null),M(null)}}}),S=o.useRef(null),T=dp(S),[F,q]=Yr("pageColumnWidths",mp),[W,Q]=o.useState({}),$=lp(S,e),j=Object.fromEntries(Object.entries({tags:$,...F,...W}).map(([R,Y])=>[R,Math.max(Y,T.mins[R])])),G=R=>R==="due"?T.due:R==="priority"?T.priority:R==="flagged"?T.flagged:j[R]??wo[R],[v,D]=Yr("pageRowsPerPage",pp),[C,O]=o.useState([]),[K,U]=o.useState(null),V=o.useRef(1),B=o.useRef(null);o.useEffect(()=>{if(!p)return;let R=V.current++;O(Y=>[R,...Y]),U(R),N(0),B.current?.scrollTo?.({top:0})},[p]);let P=R=>O(Y=>Y.filter(ae=>ae!==R)),[_,N]=o.useState(0),[x,y]=o.useState(a);x!==a&&(y(a),N(0));let[f,L]=o.useState(()=>new Set),E=o.useRef(null),z=Math.max(1,Math.ceil(e.length/v)),H=Math.min(_,z-1),ee=e.slice(H*v,(H+1)*v),ie=o.useMemo(()=>e.filter(R=>f.has(R.id)),[e,f]),ce=o.useMemo(()=>e.reduce((R,Y)=>R+(Y.completed?1:0),0),[e]),te=Le(),fe=o.useSyncExternalStore(te.subscribe,te.get,te.get),We=o.useCallback(R=>{let Y=e.findIndex(ae=>ae.id===R);Y>=0&&N(Math.floor(Y/v))},[e,v]);o.useLayoutEffect(()=>{fe?.todoId&&We(fe.todoId)},[fe,We]),o.useLayoutEffect(()=>{r.editingId&&We(r.editingId)},[r.editingId]);let Re=(R,Y)=>{L(ae=>{let pe=new Set(ae);for(let Fe of R)Y?pe.add(Fe):pe.delete(Fe);return pe})},ot=Ma("main_workspace"),ze=o.useRef({rows:ee,selection:f,todos:e,pageSize:v,currentId:ot,instanceId:u});ze.current={rows:ee,selection:f,todos:e,pageSize:v,currentId:ot,instanceId:u};let ji=o.useCallback((R,Y)=>{let{rows:ae,selection:pe,currentId:Fe}=ze.current,gt=ae.findIndex(Zt=>Zt.id===R),Xa=Y?ae.findIndex(Zt=>Zt.id===E.current):-1;!pe.size&&Fe&&Fe!==R&&ae.some(Zt=>Zt.id===Fe)&&Re([Fe],!0),Xa>=0?Re(ae.slice(Math.min(Xa,gt),Math.max(Xa,gt)+1).map(Zt=>Zt.id),!0):Re([R],!pe.has(R)),E.current=R},[]),_p=o.useCallback(R=>{L(Y=>Y.size?new Set:Y),E.current=R,ho(R,"main_workspace"),g.workspace.showProperties(ze.current.instanceId,{segmentId:Oa})},[]),[qa,Vi]=o.useState(null),Gp=o.useCallback((R,Y)=>{let{todos:ae,pageSize:pe}=ze.current,Fe=ae[ae.findIndex(gt=>gt.id===R)+Y];!Fe||!ae.some(gt=>gt.id===R)||(L(gt=>gt.size?new Set:gt),E.current=Fe.id,ho(Fe.id,"main_workspace"),N(Math.floor(ae.indexOf(Fe)/pe)),Vi(Fe.id))},[]);o.useLayoutEffect(()=>{if(!qa)return;let R=[...S.current?.querySelectorAll(".todo-table-row")??[]].find(Y=>Y.dataset.todoId===qa);R&&(R.focus({preventScroll:!0}),R.scrollIntoView?.({block:"nearest"}),Vi(null))},[qa,ee]);let Bi=o.useCallback(()=>{L(R=>R.size?new Set:R),ho(null,"main_workspace")},[]),Rp=Ga(),zp=Ra(t),Fp=()=>{for(let R of ie)r.patchTodo(R.id,Ee("completed"));L(new Set)},$p=async()=>{let R=ie.map(ae=>ae.id);await g.ui.confirm({title:d("todo.table.deleteTitle",{count:R.length}),message:d("todo.table.deleteMessage",{count:R.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(R.map(ae=>r.removeTodo(ae))),L(new Set))},Hi=(R,Y)=>o.createElement(bp,{id:R,label:Y,min:T.mins[R],onDrag:(ae,pe)=>Q(Fe=>({...Fe,[ae]:pe})),onCommit:(ae,pe)=>{Q({}),q({...F,[ae]:pe})},onReset:ae=>{Q({});let pe={...F};delete pe[ae],q(pe)}}),Up=R=>{let Y=d(ja[R]),ae=Ha.includes(R);return o.createElement(Fi,{field:R==="note"?"notes":R,label:Y,className:`todo-table-${R}${A(R).className}`,thProps:A(R).props,sort:n,onSort:s,width:ae?j[R]:void 0,resize:ae?Hi(R,Y):void 0})},Kp=o.useMemo(()=>{if(!l)return null;let R=new Map;for(let Y of e){let ae=l(Y);R.set(ae,(R.get(ae)??0)+1)}return R},[e,l]),Ya=[],Wi=null;for(let R of ee){let Y=l?.(R)??null;Y&&Y!==Wi&&Ya.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${Y}`,key:`section:${Y}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},d(nc[Y])),o.createElement("span",{className:"todo-table-section-count"},Kp?.get(Y)??0))),m.map(ae=>o.createElement("td",{key:ae,className:`todo-table-${ae}`})),o.createElement("td",{className:"todo-table-actions"}))),Wi=Y,Ya.push(o.createElement(wp,{key:R.id,todo:R,groups:zp,columns:m,actions:r.actions,pending:r.pendingIds.has(R.id),env:Rp,selected:f.has(R.id)||ot===R.id,current:ot===R.id,onPick:ji,onSelect:_p,onMove:Gp,onClear:Bi}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:B,onClick:R=>{R.target.closest("tr, button, input")||Bi()}},o.createElement("table",{ref:S,className:"todo-table","data-dragging-col":w??void 0,style:{minWidth:up+(j.title??cp)+h.reduce((R,Y)=>R+G(Y),0),"--todo-due-width":`${T.due}px`,"--todo-priority-width":`${T.priority}px`,"--todo-flagged-width":`${T.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(fp,null)),m.map(R=>o.createElement(o.Fragment,{key:R},R==="title"?o.createElement(Fi,{field:"name",label:d("todo.table.title"),className:`todo-table-title${A("title").className}`,thProps:A("title").props,sort:n,onSort:s,width:j.title,resize:Hi("title",d("todo.table.title"))}):Up(R))),o.createElement("th",{className:"todo-table-actions",style:j.title?{width:"auto",minWidth:24}:void 0}))),o.createElement("tbody",null,C.map(R=>o.createElement(vp,{key:R,order:m,groups:t,c:r,newTaskPatch:c,active:K===R,onActivate:()=>U(R),onRemove:()=>P(R)})),Ya)),!ee.length&&!C.length&&o.createElement("div",{className:"todo-table-empty-state"},i)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,ie.length?d("todo.table.selectedCount",{count:ie.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!ie.length&&o.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:ce})),ie.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:Fp},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{$p()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:R=>{g.ui.openMenu(Ka.map(Y=>({label:String(Y),type:"radio",checked:Y===v,onSelect:()=>{D(Y),N(0)}})),{anchor:R.currentTarget,align:"start"})}},o.createElement("span",null,v),o.createElement(qo,null)),z>1&&o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:H+1,pages:z})),z>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:H===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>N(0)},o.createElement(Rc,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:H===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>N(H-1)},o.createElement(Gc,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:H>=z-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>N(H+1)},o.createElement(ea,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:H>=z-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>N(z-1)},o.createElement(zc,null))))))}var db={group:e=>e.group??void 0,notes:e=>or(e.note)||void 0,status:e=>so().indexOf(ke(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},Tp=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=tt("dateFormat","activePluginTab"),{selectedDate:s,selectedDateRange:a}=va(),i=Qe(),l=wa(),p=o.useMemo(()=>go(t),[t]),c=p??l,u=n?.pluginId===g.pluginId&&n.instanceId===t,m=fa();o.useEffect(()=>{if(!p)return e.setController({canGoBack:m.canGoBack,canGoForward:m.canGoForward,goBack:()=>Qo(-1),goForward:()=>Qo(1)}),()=>e.setController(null)},[e,p,m.canGoBack,m.canGoForward]);let[b,h]=ha(),[w,k]=o.useState(()=>!!b.trim()),I=o.useRef(null),M=()=>{k(!0),window.setTimeout(()=>I.current?.focus(),0)},A=()=>{h(""),k(!1)},[S,T]=ru(),{field:F,dir:q}=S,[W]=Dt(),[Q]=At(),[$]=Xr(),j=ar("due","asc");So(j.openDetail),o.useEffect(()=>{if(!(j.loading||p))if(c.kind==="groups"){let f=new Set(Ae(i));!c.includeUngrouped&&!c.names.some(L=>f.has(L))&&et(Ge)}else c.kind==="tag"&&(j.todos.some(f=>f.tags?.includes(c.name))||et(Ge))},[j.loading,j.todos,i,c,p]);let G=pt(),v=Ta(c);o.useEffect(()=>{g.workspace.setMainTabTitle(v,t)},[v,t]);let D=o.useMemo(()=>Fa(j.todos,{view:c,showCompleted:W,today:G,statusFilter:Q,priorities:$,search:b,selectedDate:s,selectedDateRange:a}),[j.todos,c,W,Q,$,b,s,a,G]),{ordered:C,sectionOf:O}=o.useMemo(()=>{let f=F==="group"?z=>z.group?xn(z.group,i):void 0:db[F];if(f)return{ordered:tc(D,f,q),sectionOf:void 0};if(F!=="auto")return{ordered:Uo(D,F,q),sectionOf:void 0};if(c.kind==="smart"&&c.id==="completed")return{ordered:sc(D).flatMap(z=>z.todos),sectionOf:void 0};let L=On(D,G),E=new Map;for(let z of Ko)for(let H of L[z])E.set(H.id,z);return{ordered:Ko.flatMap(z=>L[z]),sectionOf:z=>E.get(z.id)??"someday"}},[D,F,q,c,G,i]),K=[lt(c),b,JSON.stringify(Q),$.join(),W,F,q,s??"",a?.start??"",a?.end??""].join("|"),U=()=>{g.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[V,B]=o.useState(0),P=()=>B(f=>f+1),_=()=>{let f={};return c.kind==="groups"&&c.names.length===1&&!c.includeUngrouped&&(f.group=c.names[0]),c.kind==="smart"&&(c.id==="today"||c.id==="week")&&(f.dueDate=G),c.kind==="smart"&&c.id==="flagged"&&(f.flagged=!0),f},N=Ae(i),x=[{label:d("todo.fab.newTodo"),icon:o.createElement(dt,null),onSelect:P},...N.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Vn,null),submenu:Nt(N,i,f=>({label:f,onSelect:L=>{let E={kind:"groups",names:[f]};L?.newTab||p?(er(E,L?.newTab===!0),yd()):(et(E),P())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(Wn,null),onSelect:()=>{Ua()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(Tt,null),onSelect:()=>{navigator.clipboard.writeText(g.workspace.buildOwnLink(ba(c)))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(Lc,null),onSelect:()=>g.workspace.openOwnSettings()}],y=t??"";return o.useEffect(()=>{(u||n?.pluginId!==g.pluginId)&&Oi(x,y)}),o.useEffect(()=>()=>Oi(null,y),[y]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${w?" is-searching":""}`},w?o.createElement("div",{className:"todo-page-search"},o.createElement(xt,{className:"todo-page-search-icon"}),o.createElement("input",{ref:I,className:"todo-page-search-input",value:b,onChange:f=>h(f.target.value),onKeyDown:f=>{f.key==="Escape"&&(f.preventDefault(),A())},onBlur:()=>{b.trim()||k(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):o.createElement("span",{className:"todo-page-appbar-spacer","aria-hidden":"true"}),(a||s)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:U},o.createElement("span",null,a?`${Me(a.start,r)} \u2013 ${Me(a.end,r)}`:Me(s,r)),o.createElement(be,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!w&&b.trim()?" active":""}`,"aria-label":w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:f=>{w&&f.preventDefault()},onClick:w?A:M},w?o.createElement(be,null):o.createElement(xt,null)),o.createElement(gp,null),o.createElement(hp,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:P},o.createElement(dt,null)))),j.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(xp,{todos:C,groups:i,c:j,sort:S,onSort:T,resetKey:K,empty:d("todo.table.empty"),sectionOf:O,composeSignal:V,newTaskPatch:_,instanceId:t}),o.createElement(nr,{c:j}))};var Ep=10080;function kp(e){let t=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!t)return null;let r=Number(t[1])*60+Number(t[2]);return r<=Ep?r:null}function Sp(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function Ap(){let e=()=>{let h=g.settings.get().reminderOffsets;return Array.isArray(h)?h.filter(w=>Number.isInteger(w)&&w>=0&&w<=Ep).slice(0,1):[10]},[t,r]=o.useState(e);o.useEffect(()=>g.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:s,SelectField:a}=g.ui.settings,i=t.length?"custom":"off",[l,p]=o.useState(()=>Sp(t[0]??10)),[c,u]=o.useState(!1);o.useEffect(()=>{t.length&&(p(Sp(t[0])),u(!1))},[t[0]]);let m=h=>{r(h),g.settings.set("reminderOffsets",h)},b=()=>{let h=kp(l);if(h===null){u(!0);return}u(!1),h!==t[0]&&m([h])};return o.createElement(s,{title:d("reminders.title")},o.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},o.createElement(a,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:i,onChange:h=>m(h==="off"?[]:[kp(l)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),i==="custom"&&o.createElement(n,{title:d("reminders.timeBefore"),description:c?o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},o.createElement("input",{className:`settings-control todo-reminder-time${c?" invalid":""}`,type:"text",inputMode:"numeric",value:l,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":c||void 0,maxLength:6,onChange:h=>{p(h.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),u(!1)},onBlur:b,onKeyDown:h=>{h.key==="Enter"&&(h.preventDefault(),b())}})))}function Wa(e){let[t,r]=o.useState(e);return o.useEffect(()=>g.settings.subscribe(()=>r(e())),[e]),[t,r]}function vo({initial:e,onCommit:t,onType:r,onEnter:n,placeholder:s,ariaLabel:a,disabled:i,className:l="todo-settings-text",invalid:p}){let c=o.useRef(!1);return o.createElement("input",{className:`settings-control ${l}${p?" invalid":""}`,"aria-invalid":p||void 0,type:"text",defaultValue:e,placeholder:s,"aria-label":a,disabled:i,autoComplete:"off",spellCheck:!1,onChange:u=>r?.(u.currentTarget.value),onBlur:u=>{if(c.current){c.current=!1;return}t(u.currentTarget.value)},onKeyDown:u=>{if(u.key==="Enter"){if(u.preventDefault(),n){t(u.currentTarget.value),n();return}u.currentTarget.blur()}else u.key==="Escape"&&(u.preventDefault(),u.currentTarget.value=e,r?.(e),c.current=!0,u.currentTarget.blur())}})}var lb={scheduled:()=>o.createElement(Wo,null),today:()=>o.createElement(Nr,null),week:()=>o.createElement(oa,null),flagged:()=>o.createElement(ve,null),all:()=>o.createElement(Pr,null),completed:()=>o.createElement(je,null)};function Cp(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:s}=g.ui.settings,[a,i]=Wa(ca),l=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],p=h=>{i(h),eu(h)},c=a.order.filter(h=>!a.hidden.includes(h)).length,u=a.order.map(h=>Mr(h,a)),m=s({items:u,indicatorOnly:!0,getId:h=>h.id,getLabel:h=>d(h.labelKey),onReorder:h=>p({...a,order:h.map(w=>w.id)})}),b=(h,w)=>{if(w){p({...a,hidden:a.hidden.filter(M=>M!==h)});return}if(c<=1)return;let k={...a,hidden:[...a.hidden,h]};p(k);let I=Et();I.kind==="smart"&&I.id===h&&et({kind:"smart",id:k.order.find(M=>!k.hidden.includes(M))})};return o.createElement(t,{title:d("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.colText")),o.createElement("span",null,d("todo.settings.colShow"))),u.map((h,w)=>{let k=a.hidden.includes(h.id),I=`${h.id}@${w}`,M=m.getHandleProps(h),A=d(h.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(k?" is-off":"")+(m.overId===h.id?" drop-"+(m.dropPosition??"before"):""),key:h.id,...m.getItemProps(h)},o.createElement("button",{...M,className:(M.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},o.createElement(Ht,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:Te(h.color),color:_r(h,Mt)},"aria-hidden":"true"},lb[h.id]()),o.createElement("span",{className:"todo-settings-name"},A),o.createElement(e,{key:`color:${I}`,value:h.color,onChange:S=>p({...a,colors:{...a.colors,[h.id]:S}}),ariaLabel:d("todo.settings.smartListColor",{p0:A}),allowCustom:!1}),o.createElement(r,{key:`text:${I}`,className:"todo-settings-text-select",value:h.textColor??"auto",options:l,ariaLabel:d("todo.settings.statusText",{p0:A}),onChange:S=>{let T={...a.textColors};S==="auto"?delete T[h.id]:T[h.id]=S,p({...a,textColors:T})}}),o.createElement(n,{key:`show:${I}`,checked:!k,disabled:!k&&c<=1,label:d("todo.settings.smartListShow",{p0:A}),onChange:S=>b(h.id,S)}))})),m.liveRegion)}function cb({name:e}){let t=Un(),r=e?t[e]:void 0;return r?o.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):o.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function Dp({current:e,onPick:t}){let r=Un(),n=Object.keys(r).sort((s,a)=>s.localeCompare(a));return o.createElement("div",{className:"todo-icon-picker"},o.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(s=>o.createElement("button",{key:s,type:"button",role:"option","aria-selected":e===s,className:`todo-icon-picker-item${e===s?" is-active":""}`,title:s,"aria-label":s,onClick:()=>t(e===s?void 0:s)},o.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[s]}})))),o.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:ci})))}function Ip(){let{ColorField:e,IconButton:t,Section:r,Toggle:n,useReorderDrag:s}=g.ui.settings,[a,i]=Wa(De);Un();let l=o.useRef(""),[p,c]=o.useState(0),[u,m]=o.useState(!1),b=v=>{let D=Sn(v);i(D),El(D)},h=a.active.map(v=>Se(v,a)),w=s({items:h,indicatorOnly:!0,getId:v=>v.id,getLabel:v=>v.label,onReorder:v=>b({...a,active:v.map(D=>D.id)})}),k=(v,D)=>{D!==a.active.includes(v)&&b({...a,active:D?[...a.active,v]:a.active.filter(C=>C!==v)})},I=v=>v.replace(/[\u0000-\u001f]/g," ").trim().slice(0,No),[M,A]=o.useState({strike:!1,color:ge("teal"),done:!1,show:!0}),S=()=>{let v=I(l.current);if(!v||a.custom.length>=fr)return;let D=Ss();b({...a,custom:[...a.custom,{id:D,label:v,done:M.done}],active:M.show?[...a.active,D]:a.active,strikethrough:{...a.strikethrough,[D]:M.strike},colors:{...a.colors,[D]:M.color},icons:M.icon?{...a.icons,[D]:M.icon}:a.icons}),l.current="",m(!1),A({strike:!1,color:ge("teal"),done:!1,show:!0}),c(C=>C+1)},T=(v,D)=>{let C=I(D);if(nt(v)){if(!C)return;b({...a,custom:a.custom.map(O=>O.id===v?{...O,label:C}:O)})}else{let O={...a.labels};C&&C!==kl(v)?O[v]=C:delete O[v],b({...a,labels:O})}},F=async(v,D)=>{nt(v)?b({...a,custom:a.custom.map(O=>O.id===v?{...O,done:D}:O)}):b({...a,done:{...a.done,[v]:D}});let C=(await Ye()).filter(O=>O.status===v);await Promise.all(C.map(O=>ii(O.id,v)))},q=(v,D)=>{let C=De(),O={...C.icons};D?O[v]=D:delete O[v],b({...C,icons:O})},W=(v,D)=>{g.ui.openPopover(({close:C})=>o.createElement(Dp,{current:a.icons[D],onPick:O=>{q(D,O),C()}}),{anchor:v,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},Q=async v=>{let D=Se(v,a).label,C=(await Ye()).filter(U=>U.status===v);if(await g.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:D}),message:C.length?d("todo.settings.statusDeleteMoves",{count:C.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(C.map(U=>ii(U.id,"open")));let K=De();nt(v)?b({...K,custom:K.custom.filter(U=>U.id!==v),active:K.active.filter(U=>U!==v)}):b({...K,removed:[...K.removed,v],active:K.active.filter(U=>U!==v)})},$=(v,D,C)=>{let O=v.id,K=`${O}@${C}`,U=v.label,V=D==="shown"?w.getHandleProps(v):null,B=D==="locked";return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(B?" locked":"")+(D==="off"?" is-off":"")+(D==="shown"&&w.overId===O?" drop-"+(w.dropPosition??"before"):""),key:O,...D==="shown"?w.getItemProps(v):{}},V?o.createElement("button",{...V,className:(V.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},o.createElement(Ht,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:B?d("todo.settings.statusLocked"):void 0},B&&o.createElement(kc,null)),B?o.createElement("span",{className:`todo-settings-glyph ${v.cls}`},o.createElement(we,{status:O==="open"?null:O,dotCls:v.cls})):o.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${v.cls}`,title:d("todo.settings.statusIconOf",{p0:U}),"aria-label":d("todo.settings.statusIconOf",{p0:U}),onClick:P=>W(P.currentTarget,O)},o.createElement(we,{status:O,dotCls:v.cls})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(vo,{key:`name:${K}:${U}`,initial:U,ariaLabel:d("todo.settings.statusName"),onCommit:P=>T(O,P)})),o.createElement(t,{key:`strike:${K}`,className:"todo-settings-strike",pressed:a.strikethrough[O],"aria-pressed":a.strikethrough[O],ariaLabel:d("todo.settings.statusStrike",{p0:U}),title:d("todo.settings.statusStrike",{p0:U}),onClick:()=>b({...a,strikethrough:{...a.strikethrough,[O]:!a.strikethrough[O]}})},o.createElement(ra,null)),o.createElement(e,{key:`color:${K}`,value:a.colors[O],onChange:P=>b({...a,colors:{...a.colors,[O]:P}}),ariaLabel:d("todo.settings.statusColor",{p0:U}),allowCustom:!1}),o.createElement(t,{key:`done:${K}`,className:"todo-settings-strike",pressed:v.done,"aria-pressed":v.done,disabled:B,ariaLabel:d("todo.settings.statusDone",{p0:U}),title:d("todo.settings.statusDone",{p0:U}),onClick:()=>{B||F(O,!v.done)}},o.createElement(je,null)),B?o.createElement("span",null):o.createElement(n,{key:`show:${K}`,checked:D!=="off",label:d("todo.settings.statusShow",{p0:U}),onChange:P=>k(O,P)}),B?o.createElement("span",null):o.createElement(t,{key:`delete:${K}`,ariaLabel:d("todo.settings.statusDelete",{p0:U}),title:d("todo.settings.statusDelete",{p0:U}),onClick:()=>{Q(O)}},o.createElement(Wt,null)))},j=[...oo.filter(v=>!a.active.includes(v)&&!a.removed.includes(v)),...a.custom.map(v=>v.id).filter(v=>!a.active.includes(v))].map(v=>Se(v,a)),G=a.custom.length>=fr;return o.createElement(r,{title:d("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null,d("todo.settings.colIcon")),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},o.createElement(ra,null)),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},o.createElement(je,null)),o.createElement("span",null,d("todo.settings.colShow")),o.createElement("span",null)),$(Se("open",a),"locked",0),$(Se("completed",a),"locked",1),h.map((v,D)=>$(v,"shown",2+D)),j.map((v,D)=>$(v,"off",2+h.length+D)),o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},o.createElement("span",{className:"todo-settings-handle is-static"}),o.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:Te(M.color)},disabled:G,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:v=>{g.ui.openPopover(({close:D})=>o.createElement(Dp,{current:M.icon,onPick:C=>{A(O=>({...O,icon:C})),D()}}),{anchor:v.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},o.createElement(cb,{name:M.icon})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(vo,{key:`add:${p}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:G,onType:v=>{l.current=v,!!I(v)!==u&&m(!u)},onCommit:v=>{l.current=v},onEnter:S})),o.createElement(t,{className:"todo-settings-strike",pressed:M.strike,"aria-pressed":M.strike,disabled:G,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>A(v=>({...v,strike:!v.strike}))},o.createElement(ra,null)),o.createElement(e,{key:`add-color:${p}`,value:M.color,onChange:v=>A(D=>({...D,color:v})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),o.createElement(t,{className:"todo-settings-strike",pressed:M.done,"aria-pressed":M.done,disabled:G,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>A(v=>({...v,done:!v.done}))},o.createElement(je,null)),o.createElement(n,{key:`add-show:${p}`,checked:M.show,disabled:G,label:d("todo.settings.colShow"),onChange:v=>A(D=>({...D,show:v}))}),o.createElement(t,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:G||!u,onClick:S},o.createElement(dt,null)))),w.liveRegion,a.removed.length>0&&o.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>b({...a,removed:[],active:[...a.active,...a.removed]})},d("todo.settings.statusRestore",{count:a.removed.length})))}function ub(){let{Button:e,ColorField:t,IconButton:r,Section:n,useReorderDrag:s}=g.ui.settings,a=zl(),i=Gl(),l=pb(),p=o.useRef(""),[c,u]=o.useState(0),[m,b]=o.useState(()=>Do(i)),[h,w]=o.useState(!1),k=(x,y)=>i.some(f=>f.id!==y&&[f.name,...f.aliases??[]].some(L=>J(L)===J(x))),I=x=>{Js(x)},M=x=>{let y=new Set([x.name,...x.aliases??[]].map(J));return l.filter(f=>y.has(J(f))).length},A=x=>ys(a,x).reduce((y,f)=>y+M(f),0),S=28,[T,F]=o.useState(!1),[q,W]=o.useState(null),[Q,$]=o.useState(()=>Do(i)),[j,G]=o.useState(!1),v=o.useRef(null);o.useEffect(()=>{q&&v.current?.querySelector("input")?.focus()},[q]);let D=(x,y)=>{if(!y)return;let f;try{f=mr(a,x,y)}catch{return}f.every((L,E)=>L.id===a[E]?.id&&L.parent===a[E]?.parent)||I(f)},C=s({items:a,indicatorOnly:!0,getId:x=>x.id,getLabel:x=>x.name,onReorder:(x,y)=>{let f=y.position==="before"?a[0]?.id:a.at(-1)?.id;D(y.activeId,Rd(a,y.activeId,y.position,y.overId===f))}}),O=x=>x.clientX>x.currentTarget.getBoundingClientRect().left+S,K=x=>{let y=C.getItemProps(x);return{...y,onDragOver:f=>{y.onDragOver?.(f),F(O(f))},onDrop:f=>{let L=C.activeId??f.dataTransfer.getData("text/plain");if(!L)return;f.preventDefault();let E=f.currentTarget.getBoundingClientRect();D(L,Ao(a,L,x.id,f.clientY<E.top+E.height/2?"before":"after",O(f))),C.cancel()}}},U=C.activeId&&C.overId&&C.dropPosition?Ao(a,C.activeId,C.overId,C.dropPosition,T):null,V=(x,y)=>{if(!U)return"";let f=U.parent!==null?" drop-nested":"";return U.before!==null?U.before===x.id?" drop-before"+f:"":((U.parent===null?a:a.filter(z=>z.id===U.parent||z.parent===U.parent)).filter(z=>z.id!==C.activeId&&z.parent!==C.activeId).at(-1)??a[y]).id===x.id?" drop-after"+f:""},B=()=>{G(!1),$(Do(i))},P=x=>{let y=x.trim().slice(0,Mo);if(!q||!y||a.length>=Er){W(null);return}if(k(y)){G(!0);return}let f={id:Us(),name:y,color:Q};try{I(mr([...a,f],f.id,{parent:q,before:null}))}catch{}W(null)},_=()=>{let x=p.current.trim().slice(0,Mo);if(!x||a.length>=Er)return;if(k(x)){w(!0);return}let y={id:Us(),name:x,color:m};I([...a,y]),p.current="",w(!1),b(Do([...i,y])),u(f=>f+1)},N=(x,y)=>{!y.trim()||y.trim()===x.name||k(y,x.id)||I(a.map(f=>f.id===x.id?Nl(f,y):f))};return o.createElement(n,null,o.createElement("div",{className:"settings-path-row settings-groups-row"},o.createElement("span",{className:"settings-toggle-text"},o.createElement("span",{className:"settings-toggle-title"},d("todo.settings.localGroups")),o.createElement("span",{className:"settings-toggle-desc"},d("todo.settings.localGroupsDesc"))),o.createElement("div",{className:"settings-colorrules settings-groups todo-local-groups",role:"list","aria-label":d("todo.settings.localGroups")},a.map((x,y)=>{let f=`${x.id}@${y}`,L=C.getHandleProps(x),E=bs(a,x.id).length,z=x.parent?M(x):A(x),H=z>0||E>0,ee=q!==null&&(a[y+1]?.parent??null)!==q&&(x.id===q||x.parent===q);return o.createElement(o.Fragment,{key:x.id},o.createElement("div",{role:"listitem",className:"settings-colorrule-row"+(x.parent?" settings-group-sub":"")+V(x,y),...K(x)},o.createElement("button",{...L,className:(L.className??"")+" settings-colorrule-grip"},o.createElement(Ht,null)),o.createElement(vo,{key:`name:${x.id}:${x.name}`,className:"settings-colorrule-key",initial:x.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:ie=>N(x,ie)}),o.createElement(t,{key:`color:${f}`,value:x.color,onChange:ie=>I(a.map(ce=>ce.id===x.id?{...ce,color:ie}:ce)),ariaLabel:d("todo.settings.localGroupColor",{p0:x.name})}),x.parent?o.createElement("span",{"aria-hidden":"true"}):o.createElement(r,{key:`addsub:${f}`,className:"settings-group-addsub",ariaLabel:d("todo.settings.localSubgroupAddTo",{p0:x.name}),title:d("todo.settings.localSubgroupAdd"),onClick:()=>{B(),W(x.id)}},o.createElement(dt,null)),o.createElement("span",{className:"settings-group-usage","aria-label":d("todo.settings.localGroupUsage",{count:z}),title:d("todo.settings.localGroupUsage",{count:z})},z),o.createElement(r,{key:`remove:${f}`,className:"settings-colormap-remove","aria-disabled":H||void 0,ariaLabel:d("todo.settings.localGroupDelete",{p0:x.name}),title:z>0?d("todo.settings.localGroupRemoveBlocked",{count:z}):E>0?d("todo.settings.localGroupRemoveSubgroups"):d("todo.settings.localGroupRemove"),onClick:()=>{H||I(a.filter(ie=>ie.id!==x.id))}},o.createElement(be,null))),ee&&o.createElement("div",{ref:v,className:"settings-colorrule-row settings-group-sub"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(vo,{className:"settings-colorrule-key",initial:"",invalid:j,placeholder:d("todo.settings.localSubgroupNew"),ariaLabel:d("todo.settings.localSubgroupNew"),onType:()=>G(!1),onCommit:P}),o.createElement(t,{key:`sub-color:${q}`,value:Q,onChange:$,ariaLabel:d("todo.settings.localGroupNewColor")})))}),C.liveRegion,o.createElement("div",{className:"settings-colorrule-row settings-colorrule-add"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(vo,{key:`add:${c}`,className:"settings-colorrule-key",initial:"",invalid:h,placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:x=>{p.current=x,w(!1)},onCommit:x=>{p.current=x},onEnter:_}),o.createElement(t,{key:`add-color:${c}`,value:m,onChange:b,ariaLabel:d("todo.settings.localGroupNewColor")}),o.createElement("span",{"aria-hidden":"true"}),o.createElement("span",{className:"settings-colorrule-add-action"},o.createElement("span",{className:"settings-button settings-button--medium settings-colorrule-add-sizer","aria-hidden":"true"},d("todo.settings.localGroupAdd")),o.createElement(e,{type:"button",className:"settings-colormap-add-btn",disabled:a.length>=Er,onClick:_},d("todo.settings.localGroupAdd")))),(h||j)&&o.createElement("span",{className:"settings-empty-text"},d("todo.settings.localGroupDuplicate")))))}function Np(){let{GroupsEditor:e,Row:t,Section:r,Toggle:n}=g.ui.settings,s=Rl();return o.createElement(o.Fragment,null,o.createElement(r,null,o.createElement(t,{title:d("todo.settings.useSharedGroups"),description:d("todo.settings.useSharedGroupsDesc")},o.createElement(n,{checked:s.shared,label:d("todo.settings.useSharedGroups"),onChange:a=>{g.settings.set(Ys,a)}})),o.createElement(t,{title:d("todo.settings.useLocalGroups"),description:d("todo.settings.useLocalGroupsDesc")},o.createElement(n,{checked:s.local,label:d("todo.settings.useLocalGroups"),onChange:a=>{g.settings.set(Xs,a)}}))),s.shared&&o.createElement(r,null,o.createElement(e,null)),s.local&&o.createElement(ub,null))}function pb(){let[e,t]=o.useState([]);return o.useEffect(()=>{let r=!0,n=()=>{Ye().then(a=>{r&&t(a.flatMap(i=>i.group?[i.group]:[]))}).catch(()=>{})};n();let s=zt(n);return()=>{r=!1,s()}},[]),e}function mb(){let{Row:e,Section:t,SelectField:r}=g.ui.settings,[n,s]=o.useState(la);return o.createElement(o.Fragment,null,o.createElement(t,{title:d("todo.settings.display")},o.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:a=>{let i=a;s(i),g.settings.set(gi,i)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(Ap,null))}function Pp({section:e}){return e==="lists"?o.createElement(o.Fragment,null,o.createElement(Cp,null),o.createElement(Ip,null)):e==="groups"?o.createElement(Np,null):o.createElement(mb,null)}var Lp="reminder:";function Op(){let e=ye();return g.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(Lp))return;let s=n??t.slice(Lp.length).split(":")[0];Ye(e).then(a=>{e.assertActive();let i=a.find(l=>l.id===s);i?.filePath?e.api.workspace.openFile(i.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var $i=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),Ui=e=>({type:"string",description:e});async function Ki(e,t,r,n){let s=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!s.ok)throw new Error(s.error.message);return s.value}function Mp(e){return ns([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:$i({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let s=(await Ki(e,"list",{section:"",q:""},r)).filter(a=>a.completed!==!0&&a.status!=="completed");return s.length?s.map(a=>`- [${a.status||"open"}] ${a.title??""} (${a.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:$i({title:Ui("Task title"),due:Ui("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Ki(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:$i({id:Ui("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Ki(e,"complete",{query:n},r)).title||n}".`}}])}function fb(e){wl(e);let t=bd(e),r=Md(),n=Dl(),s=xc(),a=mu(),i=Jl(e),l=!1,p=e.backend.on("records.eventDeliveryFailed",()=>{l||(l=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{l=!1}))});Qc();let c=e.workspace.onOpenOwnLink(S=>{ya(S)});e.registerView("todo.panel",ap),e.registerView("todo.file",sp),e.registerView("todo.page",Tp),e.registerView("todo.settings",Pp);let u=mc(e),m=Ku(e),b=e.interop.services.provide(as,Mp(e)),h=yc(),w=iu(),k=e.interop.services.subscribe(ko,()=>{}),I=lu(e),M=Op(),A=Ul();return()=>{p(),t(),u(),m(),b(),h(),w(),k(),I(),M(),A(),c(),n(),s(),a(),i(),r()}}var gb={register:fb},KD=gb;export{KD as default,fb as register};

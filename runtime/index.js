var Dt="valley";var jh=`.${Dt}`,Vh=`app.${Dt}`;function yp(e){return e.trim().replace(/\\/g,"/").replace(/\/{2,}/g,"/").replace(/^\.?\/+/,"").replace(/\/+$/,"")}var wp=/^[a-zA-Z]:/;function nr(e){if(typeof e!="string")return"";let t=yp(e);return!t||t==="."||wp.test(t)||t.split("/").some(r=>r==="..")?"":t}function Wt(e){if(typeof e=="string")return nr(e)||void 0}var xe=`.${Dt}`,vp="plugins",ar=`${xe}/${vp}`,Xr=`${ar}/packages`,Wh=`${Xr}/core`,qh=`${Xr}/github`,Yh=`${Xr}/local`,Xh=`${Xr}/community`,Zh=`${ar}/community.json`,Jh=`${ar}/data`;var Qh=`${ar}/enabled.json`,eb=`${ar}/sources.json`,tb=`${xe}/state`,De=`${xe}/settings`,Ls=`${xe}/data`,za=`${xe}/recovery`;var $a=`${xe}/accounts`,ho=`${xe}/ai`,ob=`${ho}/connections.json`,rb=`${ho}/defaults.json`,nb=`${ho}/budgets.json`,ab=`${ho}/usage.sqlite`,ib=`${ho}/security/guards.json`,sb=`${ho}/security/activity.sqlite`,db=`${$a}/providers`,lb=`${$a}/providers.lock.json`,xp=`${xe}/trash`,cb=`${xp}/items`,Ua=`${xe}/cache`,ub=`${Ua}/accounts`,Tp=`${Ua}/search`,pb=`${Ua}/providers`;var mb=`${Tp}/index.jsonl`,fb=`${za}/drafts`,gb=`${za}/transactions`,hb=`${za}/retired`;var It="design",Sp="themes",Ps=`${xe}/${It}/${Sp}`,bb=`${Ps}/local`,yb=`${Ps}/community`;var wb={app:`${De}/app.json`,appearance:`${xe}/${It}/appearance.json`,"icon-rail":`${xe}/${It}/icon-rail.json`,"footer-rail":`${xe}/${It}/footer-rail.json`,"plugin-startup":`${xe}/${It}/right-sidebar-startup.json`,"new-tab":`${xe}/${It}/new-tab.json`,pallette:`${xe}/${It}/palette.json`,group:`${Ls}/groups.json`,units:`${Ls}/units.json`,metadata:`${De}/file-viewers.json`,notification:`${De}/notification-types.json`,"notification-settings":`${De}/notification.json`,preferences:`${De}/preferences.json`,"link-actions":`${De}/link-actions.json`,markdown:`${De}/markdown.json`,editor:`${De}/editor.json`,"editor-vim":`${De}/editor-vim.json`,"markdown-todo":`${De}/markdown-todo.json`,"markdown-codeblocks":`${De}/markdown-codeblocks.json`,"markdown-template":`${De}/markdown-template.json`,"markdown-embeed":`${De}/markdown-embeed.json`,files:`${De}/file.json`,"file-sorter":`${De}/file-sorter.json`,search:`${De}/search.json`,"search-tag":`${De}/search-tag.json`,"search-content":`${De}/search-content.json`,design:`${xe}/${It}/appearance.json`,accounts:`${$a}/connections.json`};var Os=Dt,Ms="open";var kp=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),_s=16384;var Gs=new Set(["__proto__","prototype","constructor"]);function Rs(e){let t=0;for(let r of e){let n=r.codePointAt(0);t+=n<=127?1:n<=2047?2:n<=65535?3:4}return t}function Zr(e){let t=new WeakSet,r=0,n=(a,s)=>{if(++r>8192||s>32)throw new Error("Bookmark state is too complex");if(a===null||typeof a=="boolean")return a;if(typeof a=="string"){if(Rs(a)>_s)throw new Error("Bookmark state is too large");return a}if(typeof a=="number")return Number.isFinite(a)?Object.is(a,-0)?0:a:void 0;if(!a||typeof a!="object"||t.has(a))return;let l=Array.isArray(a),p=Object.getPrototypeOf(a);if(!(!l&&p!==null&&(Object.getPrototypeOf(p)!==null||typeof Object.getOwnPropertyDescriptor(p,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(p,"constructor").value)!=="function Object() { [native code] }"))){t.add(a);try{let c=Reflect.ownKeys(a);if(c.length+r>8192||c.some(f=>typeof f=="string"&&Gs.has(f)))throw new Error("Invalid or excessive bookmark state keys");let u=Object.getOwnPropertyDescriptors(a);if(l){let f=u.length?.value;if(!Number.isSafeInteger(f)||f>8192)throw new Error("Bookmark state is too complex");return Array.from({length:f},(b,w)=>{let T=u[String(w)];return T&&"value"in T?n(T.value,s+1)??null:null})}let m={};for(let f of Object.keys(u).sort()){if(Gs.has(f))throw new Error("Invalid bookmark state key");let b=u[f];if(!b.enumerable||!("value"in b)){r++;continue}let w=n(b.value,s+1);w!==void 0&&(m[f]=w)}return m}finally{t.delete(a)}}},i=n(e,0);if(!i||typeof i!="object"||Array.isArray(i))throw new Error("Invalid bookmark state");if(Rs(JSON.stringify(i))>_s)throw new Error("Bookmark state is too large");return i}function $s(e){if(typeof e!="string"||e.length>4096||/[\u0000-\u001f]/.test(e)||/^(?:[\\/]|[A-Za-z]:)/.test(e))throw new Error("Invalid bookmark path");let t=nr(e);if(!t)throw new Error("Invalid bookmark path");return t}function Ka(e,t,r){if(typeof e!="string"||e.length>t||/[\u0000-\u001f]/.test(e))throw new Error(`Invalid bookmark ${r}`);return e.trim().normalize("NFC")}function Fs(e){let r=(e.target?["path","filePath","file"].flatMap(i=>typeof e.target.state[i]=="string"?[e.target.state[i]]:[]):[e.folderPath]).join(" "),n=/\.[^./]+$/.exec(r)?.[0]??"";return[e.title,e.description,r,n,e.providerName,e.target?.pluginId].filter(Boolean).join(" ").normalize("NFC").toLowerCase()}function ja(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid plugin bookmark");let t=e;if(t.kind!=="plugin"||typeof t.pluginId!="string"||!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(t.pluginId)||!kp.has(t.surface))throw new Error("Invalid plugin bookmark target");if(t.instanceId!==void 0&&(typeof t.instanceId!="string"||t.instanceId.length>512))throw new Error("Invalid bookmark instance");if(t.itemId!==void 0&&(typeof t.itemId!="string"||!t.itemId||t.itemId.length>2048||/[\u0000-\u001f]/.test(t.itemId)))throw new Error("Invalid bookmark item");if(!t.state||typeof t.state!="object"||Array.isArray(t.state))throw new Error("Invalid bookmark state");let r=Zr(t.state);return r.path!==void 0&&(r.path=$s(r.path)),{kind:"plugin",pluginId:t.pluginId,surface:t.surface,state:r,...t.instanceId===void 0?{}:{instanceId:t.instanceId},...t.itemId===void 0?{}:{itemId:t.itemId}}}var Ep=/^[A-Za-z0-9_-]{1,64}$/;function zs(e,t){if(typeof e!="string"||!Ep.test(e))throw new Error(`Invalid bookmark ${t}`);return e}function Us(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark");let t=e,r=Ka(t.title,512,"title"),n={...t.description===void 0?{}:{description:Ka(t.description,1024,"description")},...t.providerName===void 0?{}:{providerName:Ka(t.providerName,256,"provider name")},...typeof t.createdAt=="number"&&Number.isSafeInteger(t.createdAt)&&t.createdAt>=0?{createdAt:t.createdAt}:{}},i=t.group===void 0?{}:{group:zs(t.group,"group")};if(t.groupId!==void 0){let l=zs(t.groupId,"group id");if(!r||t.target!==void 0)throw new Error("Invalid bookmark group");return{folderPath:"",title:r,groupId:l,...n}}if(t.target!==void 0){let l={folderPath:"",title:r,target:ja(t.target),...n,...i};return{...l,searchText:Fs(l)}}if(typeof t.folderPath!="string")throw new Error("Invalid bookmark path");let s={folderPath:$s(t.folderPath),title:r,...n,...i};return{...s,searchText:Fs(s)}}function qt(e){let t=0,r=a=>!!(a&&typeof a=="object"&&!Array.isArray(a)),n=a=>a.length>0&&a.length<=256&&!["__proto__","prototype","constructor"].includes(a),i=(a,s)=>{if(++t>2048||s>32||!r(a)||typeof a.type!="string")return!1;let l=(...p)=>Object.keys(a).every(c=>c==="type"||p.includes(c));return["unknown","null","boolean","number","string","function"].includes(a.type)?l():a.type==="literal"?l("value")&&(a.value===null||["string","boolean"].includes(typeof a.value)||typeof a.value=="number"&&Number.isFinite(a.value)):a.type==="array"?l("items","maxItems")&&(a.maxItems===void 0||Number.isSafeInteger(a.maxItems)&&a.maxItems>=0&&a.maxItems<=1e5)&&i(a.items,s+1):a.type==="tuple"?l("items","minItems")&&Array.isArray(a.items)&&a.items.length<=64&&(a.minItems===void 0||Number.isSafeInteger(a.minItems)&&a.minItems>=0&&a.minItems<=a.items.length)&&a.items.every(p=>i(p,s+1)):a.type==="union"?l("anyOf")&&Array.isArray(a.anyOf)&&a.anyOf.length>0&&a.anyOf.length<=32&&a.anyOf.every(p=>i(p,s+1)):a.type==="object"?l("properties","required","additionalProperties")&&r(a.properties)&&Object.entries(a.properties).every(([p,c])=>n(p)&&i(c,s+1))&&(a.required===void 0||Array.isArray(a.required)&&a.required.every(p=>typeof p=="string"&&Object.hasOwn(a.properties,p)))&&(a.additionalProperties===void 0||typeof a.additionalProperties=="boolean"):!1};return i(e,0)}function Jr(e,t,r=1e5){let n=Math.max(1,Math.min(1e6,Math.floor(r))),i=new WeakSet,a=(s,l,p)=>{if(--n<0||p>64)return!1;if(s.type==="unknown")return!0;if(s.type==="null")return l===null;if(s.type==="literal")return l===s.value;if(s.type==="union")return s.anyOf.some(c=>a(c,l,p+1));if(s.type==="number")return typeof l=="number"&&Number.isFinite(l);if(s.type==="string"||s.type==="boolean"||s.type==="function")return typeof l===s.type;if(!l||typeof l!="object"||i.has(l))return!1;i.add(l);try{return s.type==="array"?Array.isArray(l)&&l.length<=(s.maxItems??1e5)&&l.every(c=>a(s.items,c,p+1)):s.type==="tuple"?Array.isArray(l)&&l.length>=(s.minItems??s.items.length)&&l.length<=s.items.length&&l.every((c,u)=>a(s.items[u],c,p+1)):s.type==="object"?Array.isArray(l)||s.required?.some(c=>!Object.hasOwn(l,c))?!1:Object.entries(l).every(([c,u])=>Object.hasOwn(s.properties,c)?a(s.properties[c],u,p+1):s.additionalProperties===!0):!1}finally{i.delete(l)}};return a(e,t,0)}var Ap=new Map;function le(e,t,r,n,i,a,s,l,p="owner"){let c=Object.freeze({id:e,kind:t,version:r,cardinality:n,validate:i,identities:a,identityScope:p,serviceCalls:s,serviceMetadata:l});return Ap.set(`${t}:${e}@${r}`,c),c}var Ba=256;function Ha(e){let t=new Map(e.map(r=>[r.name,r]));return{tools:e.map(({run:r,...n})=>Object.freeze({...n})),execute:async(r,n,i)=>{let a=t.get(r);if(!a)throw new Error(`Unknown provider-owned agent tool: ${r}`);return a.run(n,i)}}}var oe=e=>!!e&&typeof e=="object"&&!Array.isArray(e),pe=(e,t)=>typeof e[t]=="function",Yt=e=>e===void 0,bo=e=>typeof e=="boolean",re=e=>typeof e=="string",Me=e=>e===void 0||re(e),Cp=e=>e===void 0||typeof e=="number",Dp=e=>e===void 0||typeof e=="boolean",se=(e,t)=>e.length===t.length&&t.every((r,n)=>r(e[n])),Ne=e=>oe(e)&&typeof e.ok=="boolean"&&(e.error===void 0||typeof e.error=="string"),Ks=e=>oe(e),Vs=e=>oe(e)&&re(e.id)&&re(e.title)&&re(e.date)&&(e.documentRef===void 0||oe(e.documentRef)&&re(e.documentRef.pluginId)&&re(e.documentRef.sourceId)&&re(e.documentRef.itemId)),Ip=e=>oe(e)&&re(e.date)&&Me(e.startTime)&&Me(e.endTime)&&Me(e.sourceId)&&Me(e.itemId),Np=e=>oe(e)&&re(e.url)&&Me(e.title)&&Dp(e.newTab),Lp=e=>oe(e)&&re(e.query),Bs=e=>oe(e)&&re(e.name)&&Me(e.context)&&Number.isFinite(e.lng)&&Number.isFinite(e.lat),Pp=e=>Array.isArray(e)&&e.every(Bs),Op=e=>e===null||Bs(e),Mp=e=>e===void 0||oe(e)&&Me(e.approvalToken)&&(e.cancellation===void 0||oe(e.cancellation)),_p=e=>typeof e=="string"||oe(e)&&typeof e.text=="string",Gp=e=>oe(e)&&typeof e.name=="string"&&e.name.trim().length>0&&typeof e.description=="string"&&oe(e.parameters)&&(e.sideEffect==="read"||e.sideEffect==="write")&&Me(e.commandId)&&(e.commandDispatch===void 0||e.commandDispatch==="dynamic")&&(e.timeoutMs===void 0||Number.isSafeInteger(e.timeoutMs)&&Number(e.timeoutMs)>0&&Number(e.timeoutMs)<=3e5),Hs=e=>oe(e)&&re(e.id)&&re(e.label)&&Me(e.labelKey)&&Me(e.description)&&(e.danger===void 0||typeof e.danger=="boolean")&&(e.enabled===void 0||typeof e.enabled=="boolean")&&(e.submenu===void 0||Array.isArray(e.submenu)&&e.submenu.every(Hs)),Ws={list:{args:e=>e.length===0,result:e=>Array.isArray(e)&&e.every(Vs)},create:{args:e=>se(e,[re,Ks]),result:bo},update:{args:e=>se(e,[re,Ks]),result:bo},remove:{args:e=>se(e,[re]),result:bo},open:{args:e=>se(e,[re]),result:Yt},configure:{args:e=>e.length===0,result:Yt},actions:{args:e=>se(e,[re]),result:e=>Array.isArray(e)&&e.every(Hs)},runAction:{args:e=>se(e,[re,re]),result:bo}},qs=e=>oe(e)&&re(e.name)&&re(e.version)&&Me(e.description)&&Me(e.author)&&(e.localized===void 0||oe(e.localized)&&Object.values(e.localized).every(t=>oe(t)&&re(t.name)&&Me(t.description))),Rp=le("calendar.itemSource","service","1.3.0","many",e=>oe(e)&&pe(e,"list")&&(e.integration===void 0||qs(e.integration)),void 0,Ws,e=>e.integration),Qr=e=>typeof e=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(e)&&Number.isFinite(Date.parse(`${e}T00:00:00Z`))&&new Date(`${e}T00:00:00Z`).toISOString().slice(0,10)===e,Va=e=>typeof e=="string"&&e.length>0&&e.length<=8192,Fp=e=>oe(e)&&Qr(e.startDate)&&Qr(e.endDate)&&e.startDate<=e.endDate&&typeof e.limit=="number"&&Number.isInteger(e.limit)&&e.limit>0&&e.limit<=Ba&&(e.cursor===void 0||Va(e.cursor)),zp=e=>oe(e)&&Va(e.revision)&&(e.cursor===void 0||Va(e.cursor))&&Array.isArray(e.items)&&e.items.length<=Ba&&e.items.every(t=>Vs(t)&&Qr(t.date)&&(t.endDate===void 0||Qr(t.endDate)&&t.endDate>=t.date))&&new Set(e.items.map(t=>t.id)).size===e.items.length,yo=le("calendar.itemSource","service","2.0.0","many",e=>oe(e)&&pe(e,"list")&&(e.integration===void 0||qs(e.integration)),void 0,{...Ws,list:{args:e=>se(e,[Fp]),result:zp}},e=>e.integration),ir=le("calendar.itemSourceRevision","state","1.0.0","many",e=>typeof e=="number"&&Number.isSafeInteger(e)&&e>=0),$p=le("calendar.navigator","service","1.0.0","one",e=>oe(e)&&pe(e,"openDate"),void 0,{openDate:{args:e=>se(e,[Ip]),result:Yt}}),en=le("calendar.panelSelection","state","1.0.0","one",e=>oe(e)&&(e.selectedDate===null||typeof e.selectedDate=="string")&&(e.rangeStart===null||typeof e.rangeStart=="string")&&(e.rangeEnd===null||typeof e.rangeEnd=="string")),Up=le("web.activeContext","state","1.0.0","one",e=>oe(e)&&typeof e.instanceId=="string"&&typeof e.url=="string"&&typeof e.title=="string");function js(e){return oe(e)&&typeof e.id=="string"&&typeof e.displayName=="string"&&(e.avatarUrl===void 0||typeof e.avatarUrl=="string")&&Array.isArray(e.emails)&&e.emails.every(t=>oe(t)&&typeof t.address=="string"&&(t.label===void 0||typeof t.label=="string"))}var Kp=le("contacts.directory","service","1.0.0","one",e=>oe(e)&&["search","resolveEmails","open"].every(t=>pe(e,t)),void 0,{search:{args:e=>e.length===2&&typeof e[0]=="string"&&e[0].length<=1e3&&Number.isInteger(e[1])&&Number(e[1])>0&&Number(e[1])<=50,result:e=>Array.isArray(e)&&e.length<=50&&e.every(js)},resolveEmails:{args:e=>e.length===1&&Array.isArray(e[0])&&e[0].length<=200&&e[0].every(t=>typeof t=="string"&&t.length<=1e3),result:e=>Array.isArray(e)&&e.every(t=>oe(t)&&typeof t.address=="string"&&Array.isArray(t.contacts)&&t.contacts.every(js))},open:{args:e=>e.length>=1&&e.length<=2&&typeof e[0]=="string"&&(e[1]===void 0||oe(e[1])&&(e[1].newTab===void 0||typeof e[1].newTab=="boolean")),result:Yt}}),jp=le("contacts.directoryRevision","state","1.0.0","one",e=>Number.isSafeInteger(e)&&Number(e)>=0),Vp=le("web.navigator","service","1.0.0","one",e=>oe(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[Np]),result:Yt}}),Bp=le("selection.textAction","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&typeof e.label=="string"&&Array.isArray(e.surfaces)&&pe(e,"run"),e=>[e.id]),Hp=le("geo.navigator","service","1.0.0","one",e=>oe(e)&&pe(e,"open"),void 0,{open:{args:e=>se(e,[Lp]),result:Yt}}),Wp=le("geo.search","service","1.0.0","one",e=>oe(e)&&pe(e,"search")&&pe(e,"reverse"),void 0,{search:{args:e=>se(e,[re]),result:Pp},reverse:{args:e=>se(e,[t=>Number.isFinite(t),t=>Number.isFinite(t)]),result:Op}}),Wa=le("agent.toolProvider","service","1.0.0","many",e=>oe(e)&&Array.isArray(e.tools)&&e.tools.every(Gp)&&pe(e,"execute"),e=>e.tools.map(t=>t.name),{execute:{args:e=>se(e,[re,oe,Mp]),result:_p}},e=>({tools:e.tools}),"global"),qp=le("guard.runtime","service","1.0.0","one",e=>oe(e)&&["resolve","requestApproval","consumeToken","audit"].every(t=>pe(e,t)),void 0,{resolve:{args:e=>se(e,[oe]),result:oe},requestApproval:{args:e=>se(e,[oe]),result:bo},consumeToken:{args:e=>e.length>=1&&e.length<=2&&re(e[0])&&Me(e[1]),result:bo},audit:{args:e=>se(e,[oe]),result:Yt}}),Yp=le("browser.automation","service","1.0.0","one",e=>oe(e)&&["list","open","switch","close","snapshot","readText","readHtml","screenshot","navigate","back","forward","reload","click","type","select","scroll","pressKey"].every(t=>pe(e,t)),void 0,{list:{args:e=>e.length===0,result:Ne},open:{args:e=>se(e,[re]),result:Ne},switch:{args:e=>se(e,[re]),result:Ne},close:{args:e=>se(e,[re]),result:Ne},snapshot:{args:e=>se(e,[re]),result:Ne},readText:{args:e=>e.length>=1&&e.length<=2&&re(e[0])&&Cp(e[1]),result:Ne},readHtml:{args:e=>se(e,[re]),result:Ne},screenshot:{args:e=>se(e,[re]),result:Ne},click:{args:e=>se(e,[re,t=>typeof t=="number"]),result:Ne},type:{args:e=>e.length>=3&&e.length<=4&&re(e[0])&&typeof e[1]=="number"&&re(e[2])&&(e[3]===void 0||typeof e[3]=="boolean"),result:Ne},select:{args:e=>se(e,[re,t=>typeof t=="number",re]),result:Ne},scroll:{args:e=>se(e,[re,t=>typeof t=="number",t=>typeof t=="number"]),result:Ne},pressKey:{args:e=>se(e,[re,re]),result:Ne},navigate:{args:e=>se(e,[re,re]),result:Ne},back:{args:e=>se(e,[re]),result:Ne},forward:{args:e=>se(e,[re]),result:Ne},reload:{args:e=>se(e,[re]),result:Ne}}),Xp=le("fileTree.contextItem","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.label=="string"&&Me(e.labelKey)&&pe(e,"run"),e=>[e.id]),Zp=le("newTab.entry","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"run"),e=>[e.id]),qa=le("search.resultAction","extension","1.0.0","many",e=>oe(e)&&typeof e.cardKind=="string"&&pe(e,"open"),e=>[e.cardKind]),Jp=le("search.resultCard","extension","1.0.0","many",e=>oe(e)&&typeof e.cardKind=="string"&&pe(e,"render")&&pe(e,"open"),e=>[e.cardKind]),Ya=le("metadataPanel.segment","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"render"),e=>[e.id]),Xa=le("workspace.surface","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace","footer"].includes(String(e.surface))&&pe(e,"getSnapshot")&&pe(e,"subscribe")&&pe(e,"restore"),e=>[e.id]),Qp=le("metadata.plugin","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&typeof e.labelKey=="string"&&pe(e,"facts"),e=>[e.id]),em=le("workspace.viewState","extension","1.0.0","many",e=>oe(e)&&typeof e.id=="string"&&["left_sidebar","right_sidebar","main_workspace"].includes(String(e.surface))&&pe(e,"capture")&&pe(e,"restore")&&pe(e,"subscribe"),e=>[e.id]);var tn=e=>{if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Invalid bookmark data");let t=Object.getPrototypeOf(e);if(t!==null&&(Object.getPrototypeOf(t)!==null||typeof Object.getOwnPropertyDescriptor(t,"constructor")?.value!="function"||Function.prototype.toString.call(Object.getOwnPropertyDescriptor(t,"constructor").value)!=="function Object() { [native code] }"))throw new Error("Invalid bookmark prototype");let r=Object.create(null),n=Reflect.ownKeys(e);if(n.length>32)throw new Error("Invalid bookmark descriptor");for(let i of n){if(typeof i!="string")continue;if(["__proto__","prototype","constructor"].includes(i))throw new Error("Invalid bookmark key");let a=Object.getOwnPropertyDescriptor(e,i);a?.enumerable&&"value"in a&&(r[i]=a.value)}return r},Za=e=>!!(e&&typeof e=="object"&&!Array.isArray(e)),Ys=new Set(["main_workspace","left_sidebar","right_sidebar","footer"]),Xs=e=>Za(e)&&typeof e.surface=="string"&&Ys.has(e.surface)&&(e.instanceId===void 0||typeof e.instanceId=="string"&&e.instanceId.length<=512&&!/[\u0000-\u001f]/.test(e.instanceId));function sr(e){let t=tn(e);if(!Xs(t))throw new Error("Invalid bookmark descriptor");let r=ja({kind:"plugin",pluginId:"provider",surface:t.surface,instanceId:t.instanceId,itemId:t.itemId,state:t.state}),n=Us({folderPath:"",title:t.title,description:t.description,target:r});if(!n.title||typeof n.description!="string")throw new Error("Bookmark presentation is required");return{surface:r.surface,title:n.title,description:n.description,state:r.state,...r.instanceId===void 0?{}:{instanceId:r.instanceId},...r.itemId===void 0?{}:{itemId:r.itemId}}}function Ja(e){try{let t=sr(e),r=tn(e);return JSON.stringify(t.state)===JSON.stringify(Zr(r.state))}catch{return!1}}function tm(e){try{let t=tn(e);if(t.status==="unavailable"||t.status==="invalid")return{status:t.status};if(t.status==="ready")return{status:"ready",bookmark:sr(t.bookmark)}}catch{}return{status:"invalid"}}var om=e=>{try{let t=tn(e);return t.status==="unavailable"||t.status==="invalid"||t.status==="ready"&&Ja(t.bookmark)}catch{return!1}},rm=e=>Za(e)&&["restored","missing","unavailable","invalid"].includes(String(e.status)),Zs=le("workspace.bookmark","service","1.0.0","many",e=>Za(e)&&typeof e.id=="string"&&Ys.has(String(e.surface))&&qt(e.stateSchema)&&(e.itemStateSchema===void 0||qt(e.itemStateSchema))&&typeof e.capture=="function"&&typeof e.restore=="function",e=>[e.surface],{capture:{args:e=>e.length===1&&Xs(e[0]),result:om,sanitizeResult:tm},restore:{args:e=>e.length===1&&Ja(e[0]),result:rm}},e=>({surface:e.surface,stateSchema:e.stateSchema,...e.itemStateSchema?{itemStateSchema:e.itemStateSchema}:{}}));function Qa(e,t,r){if(!qt(r.stateSchema)||r.itemStateSchema!==void 0&&!qt(r.itemStateSchema))throw new Error("Invalid bookmark state schema");let n=!0,i=(c,u,m=!1)=>Jr(m&&r.itemStateSchema?r.itemStateSchema:r.stateSchema,c,8192)&&(!r.validate||r.validate(c,u)),a=(c,u,m)=>{let f=m?void 0:r.primary?r.primary(c):c.item,b=Zr(f?.state??c.view);if(!i(b,u,!!f))throw new Error("Invalid bookmark state");return sr({...u,title:f?.title??c.title,description:r.description(c,!!f),state:b,...f?{itemId:f.id}:{}})},s={id:t.id,surface:t.surface,stateSchema:r.stateSchema,...r.itemStateSchema?{itemStateSchema:r.itemStateSchema}:{},capture(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};try{return{status:"ready",bookmark:a(t.getSnapshot(c.instanceId),c,!1)}}catch{return{status:"invalid"}}},async restore(c){if(!n||c.surface!==t.surface)return{status:"unavailable"};let u;try{if(u=sr(c),!i(u.state,u,u.itemId!==void 0))return{status:"invalid"}}catch{return{status:"invalid"}}try{return await t.restore(u.state,u.instanceId),{status:n?"restored":"unavailable"}}catch{return{status:"missing"}}}},l=e.interop.services.provide(Zs,s),p;try{p=e.interop.extensions.provide(Xa,{...t,getSnapshot(c){let u=t.getSnapshot(c),m={surface:t.surface,...c===void 0?{}:{instanceId:c}},f,b;try{f=a(u,m,!1)}catch{}try{b=a(u,m,!0)}catch{}return{...u,bookmark:f,bookmarkView:b}}})}catch(c){throw n=!1,l(),c}return()=>{n=!1,p(),l()}}var dr=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Js=e=>typeof e=="string"&&/^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(e);function Qs(e){if(!dr(e)||!Js(e.id)||typeof e.label!="string"||!e.label.trim()||e.label.length>256||e.labelKey!==void 0&&typeof e.labelKey!="string"||!Array.isArray(e.items)||e.items.length>128||!Array.isArray(e.defaultItems)||typeof e.getSnapshot!="function"||typeof e.subscribe!="function"||e.invoke!==void 0&&typeof e.invoke!="function"||e.invokeAutomation!==void 0&&typeof e.invokeAutomation!="function"||e.pluginViews!==void 0&&typeof e.pluginViews!="boolean"||e.fileExtensions!==void 0&&(!Array.isArray(e.fileExtensions)||!e.fileExtensions.every(r=>typeof r=="string"&&/^\.[a-zA-Z0-9][a-zA-Z0-9.+_-]{0,63}$/.test(r))))return!1;let t=new Set;for(let r of e.items){if(!dr(r)||!Js(r.id)||t.has(r.id)||typeof r.label!="string"||!r.label.trim()||r.label.length>256||r.labelKey!==void 0&&typeof r.labelKey!="string"||r.available!==void 0&&typeof r.available!="boolean"||!["text","badge","button","select","toggle","range","thumbnail"].includes(String(r.kind)))return!1;t.add(r.id)}if(e.automation!==void 0){if(!dr(e.automation)||Object.keys(e.automation).some(r=>r!=="actions")||!dr(e.automation.actions)||typeof e.invokeAutomation!="function"||Object.keys(e.automation.actions).length>128)return!1;for(let[r,n]of Object.entries(e.automation.actions))if(!t.has(r)||!dr(n)||!["button","number","string","boolean"].includes(String(n.type))||Object.keys(n).some(i=>!["type","integer","maxLength"].includes(i))||n.integer!==void 0&&(n.type!=="number"||typeof n.integer!="boolean")||n.maxLength!==void 0&&(n.type!=="string"||!Number.isSafeInteger(n.maxLength)||Number(n.maxLength)<1||Number(n.maxLength)>65536))return!1}return e.defaultItems.every(r=>typeof r=="string"&&t.has(r))&&new Set(e.defaultItems).size===e.defaultItems.length}var ei=le("workspace.details","extension","1.0.0","many",Qs,e=>[`provider:${e.id}`,...e.items.map(t=>`item:${t.id}`)]);var Yb=[xe,`${xe}/**/secrets.json`,".git","node_modules","**/.env","**/.env.*"];var py=1024*1024;var gy=Object.freeze({activePerBackend:8,retainedPerBackend:32,activePerClient:4,retainedPerClient:16,active:64,retained:256,valueBytes:4190208,retainedBytes:67108864,controlRequests:17,controlTimeoutMs:5e3,pollMs:1e3});var hy=globalThis.Buffer;var am=Object.freeze({schemaBytes:65536,schemaNodes:4096,schemaDepth:32,valueBytes:10485760,handles:256,pending:32,timeoutMs:2e3});var o,h,on=new Map,rn;function be(){return rn}function nn(e,t){let r=on.get(e)??new Set;return r.add(t),on.set(e,r),()=>{r.delete(t),r.size||on.delete(e)}}function ed(e){rn?.dispose(),h=e,o=e.React;let t=!0,r=new Set;return rn={api:e,assertActive:()=>{if(!t)throw new Error("To-Do read scope disposed")},onDispose:n=>(t?r.add(n):n(),()=>{r.delete(n)}),dispose:()=>{if(t){t=!1;for(let n of r)n();r.clear()}}},rn.dispose}var im=1800;function wo(e){let t=Le();o.useEffect(()=>{let r=null,n=null,i=null,a=0,s=()=>{i&&i.classList.remove("todo-reveal-target"),i=null},l=u=>{if(u.mode==="create")return;a=u.nonce,u.mode==="edit"&&(t.clear(),e(u.todoId)),r!==null&&clearTimeout(r);let m=Date.now()+2500,f=()=>{if(r=null,a!==u.nonce)return;let b=[...on.get(u.todoId)??[]].find(w=>w.isConnected);if(!b){Date.now()<m?r=setTimeout(f,40):t.get()?.nonce===u.nonce&&t.clear();return}b.scrollIntoView({behavior:"smooth",block:"center"}),n!==null&&clearTimeout(n),s(),b.classList.add("todo-reveal-target"),i=b,n=setTimeout(s,im),t.get()?.nonce===u.nonce&&t.clear()};r=setTimeout(f,0)},p=t.subscribe(()=>{let u=t.get();u&&l(u)}),c=t.get();return c&&l(c),()=>{p(),a=0,r!==null&&clearTimeout(r),n!==null&&clearTimeout(n),s()}},[t,e])}function Le(){return h.runtime.getOrCreate("todo.revealRequest",()=>{let e=0,t=()=>{for(let n of[...r.listeners])n()},r={value:null,listeners:new Set,get:()=>r.value,request:(n,i)=>{e+=1,r.value={todoId:n,mode:i,nonce:e},t()},clear:()=>{r.value&&(r.value=null,t())},subscribe:n=>(r.listeners.add(n),()=>r.listeners.delete(n))};return r})}function td(){Le().request("","create"),h.workspace.revealOwnPanel("left_sidebar")}var od=`
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

`;var rd=`/* \u2500\u2500 Todo panel (ported from core App.css) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

`;var nd=`/* \u2500\u2500 Swipe \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var ad=`/* \u2500\u2500 Rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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

`;var id=`/* Tint the status label by its meaning, off the --todo-st-* scale above rather
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

`;var sd=`/* \u2500\u2500 Todo clock badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */


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

`;var dd=`/* \u2500\u2500 To-Do page (main_workspace \u2014 Things-style sections) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

`;var ld=`/* \u2500\u2500 Detail modal body (api.ui.Modal, bodyClassName) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`;var cd=`/* \u2500\u2500 Edit sheet: one column, title, notes, then every property as a chip \u2500\u2500 */
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

`;var ud=`/* \u2500\u2500 Sidebar tree \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
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
`;var pd=`/* \u2500\u2500 Filter surfaces \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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
`;var md=`/* \u2500\u2500 Settings: one bordered list per section, rows split by hairlines \u2500\u2500\u2500\u2500\u2500
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

`;var fd=`/* \u2500\u2500 Status badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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

`;var gd=`/* \u2500\u2500 Main table \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
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
/* The trailing column holds only the flag of a row whose Flagged column is hidden. It scrolls with the table and has
   no surface of its own, so it never covers the last column and takes the row's hover, selection and editing colour. */
.todo-table .todo-table-actions { width: 24px; }

`;var dm=od+rd+nd+ad+id+sd+dd+ld+cd+ud+`

`+pd+md+fd+gd,ti="notes-todo-styles";function hd(){let e=document.getElementById(ti);return e||(e=document.createElement("style"),e.id=ti,document.head.appendChild(e)),e.textContent=dm,()=>{document.getElementById(ti)===e&&e.remove()}}var ne="#12120f",ue="#ffffff",ri=[{id:"green",family:"semantic",labelKey:"color.green",light:"#549c83",dark:"#549c83",onLight:ne,onDark:ne},{id:"red",family:"semantic",labelKey:"color.red",light:"#d33542",dark:"#d33542",onLight:ue,onDark:ue},{id:"amber",family:"semantic",labelKey:"color.amber",light:"#ff9f0a",dark:"#ff9f0a",onLight:ne,onDark:ne},{id:"blue",family:"semantic",labelKey:"color.blue",light:"#0075b2",dark:"#90cfff",onLight:ue,onDark:ne},{id:"yellow",family:"semantic",labelKey:"color.yellow",light:"#ad8500",dark:"#e6c45c",onLight:ne,onDark:ne},{id:"orange",family:"semantic",labelKey:"color.orange",light:"#bf5200",dark:"#fc8c50",onLight:ue,onDark:ne},{id:"purple",family:"semantic",labelKey:"color.purple",light:"#8149c0",dark:"#c095fc",onLight:ue,onDark:ne},{id:"pink",family:"semantic",labelKey:"color.pink",light:"#c52f9a",dark:"#da3aaa",onLight:ue,onDark:ne},{id:"brown",family:"semantic",labelKey:"color.brown",light:"#78490b",dark:"#c7925c",onLight:ue,onDark:ne},{id:"black",family:"semantic",labelKey:"color.black",light:"#0d0d0f",dark:"#3a3a3c",onLight:ue,onDark:ue},{id:"white",family:"semantic",labelKey:"color.white",light:"#fbfbfd",dark:"#f4f4f6",onLight:ne,onDark:ne},{id:"gray",family:"semantic",labelKey:"color.gray",light:"#717881",dark:"#c3cbd5",onLight:ue,onDark:ne},{id:"violet",family:"semantic",labelKey:"color.violet",light:"#873aa6",dark:"#c17fde",onLight:ue,onDark:ne},{id:"cyan",family:"semantic",labelKey:"color.cyan",light:"#008e9b",dark:"#68dfed",onLight:ne,onDark:ne},{id:"magenta",family:"semantic",labelKey:"color.magenta",light:"#b02184",dark:"#ec7bc0",onLight:ue,onDark:ne},{id:"indigo",family:"semantic",labelKey:"color.indigo",light:"#5140b4",dark:"#9b97f7",onLight:ue,onDark:ne},{id:"muted-green",family:"muted",labelKey:"color.mutedGreen",light:"#325c4c",dark:"#99ccaa",onLight:ue,onDark:ne},{id:"muted-red",family:"muted",labelKey:"color.mutedRed",light:"#9f5c54",dark:"#e4a197",onLight:ue,onDark:ne},{id:"muted-gold",family:"muted",labelKey:"color.mutedGold",light:"#918349",dark:"#ddce93",onLight:ne,onDark:ne},{id:"muted-blue",family:"muted",labelKey:"color.mutedBlue",light:"#5a7ea3",dark:"#84acd6",onLight:ne,onDark:ne},{id:"muted-violet",family:"muted",labelKey:"color.mutedViolet",light:"#826299",dark:"#c7aade",onLight:ue,onDark:ne},{id:"primary-blue",family:"accent",labelKey:"color.primaryBlue",light:"#2a66db",dark:"#90b7ff",onLight:ue,onDark:ne},{id:"teal",family:"accent",labelKey:"color.teal",light:"#007066",dark:"#5dcdbf",onLight:ue,onDark:ne},{id:"gold",family:"accent",labelKey:"color.gold",light:"#866200",dark:"#d8b262",onLight:ue,onDark:ne},{id:"rose",family:"accent",labelKey:"color.rose",light:"#861a50",dark:"#dd7aa1",onLight:ue,onDark:ne},{id:"maroon",family:"categorical",labelKey:"color.maroon",light:"#75061c",dark:"#e66d71",onLight:ue,onDark:ne},{id:"coral",family:"categorical",labelKey:"color.coral",light:"#d6673f",dark:"#ffad90",onLight:ne,onDark:ne},{id:"sand",family:"categorical",labelKey:"color.sand",light:"#a8885e",dark:"#f2d6b1",onLight:ne,onDark:ne},{id:"olive",family:"categorical",labelKey:"color.olive",light:"#636d11",dark:"#b0be60",onLight:ue,onDark:ne},{id:"lime",family:"categorical",labelKey:"color.lime",light:"#5b9a25",dark:"#a8eb7a",onLight:ne,onDark:ne},{id:"forest",family:"categorical",labelKey:"color.forest",light:"#215e29",dark:"#6caa71",onLight:ue,onDark:ne},{id:"mint",family:"categorical",labelKey:"color.mint",light:"#00856d",dark:"#a4f0dc",onLight:ue,onDark:ne},{id:"sky",family:"categorical",labelKey:"color.sky",light:"#3397c7",dark:"#aae0ff",onLight:ne,onDark:ne},{id:"navy",family:"categorical",labelKey:"color.navy",light:"#223f94",dark:"#6f92e5",onLight:ue,onDark:ne},{id:"plum",family:"categorical",labelKey:"color.plum",light:"#a552a3",dark:"#f1a6ee",onLight:ue,onDark:ne},{id:"slate",family:"categorical",labelKey:"color.slate",light:"#50627a",dark:"#aab9cc",onLight:ue,onDark:ne}],lm=["semantic","muted","accent","categorical"];var _w=new Map(ri.map(e=>[e.id,e])),cm={semantic:"Semantic",muted:"Muted",accent:"Accent & brand",categorical:"Categorical"},um=new Map(ri.map(e=>[e.id,e.labelKey.replace(/^color\./,"").replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase())])),pm=/^[a-z][a-z0-9-]{0,47}$/,mm={version:4,families:lm.map(e=>({id:e,name:cm[e]})),colors:ri.map(e=>({id:e.id,familyId:e.family,name:um.get(e.id)??e.id,light:e.light,dark:e.dark})),archived:[]},fm=e=>({version:4,families:e.families.map(t=>({...t})),colors:e.colors.map(t=>({...t})),archived:e.archived.map(t=>({...t}))});var gm=fm(mm);function ni(){return gm}var oi=["primary-blue","yellow","green","violet","orange","mint","rose","cyan","lime","brown","gold","blue","magenta","olive","navy","gray","teal","indigo","coral","sky","purple","forest","plum","sand","slate","pink","red"],an="palette:",hm=/^#[0-9a-f]{6}$/i;function sn(e){return e.startsWith(an)&&pm.test(e.slice(an.length))}function fe(e){return`${an}${e}`}function lr(e){return sn(e)?e.slice(an.length):void 0}function bd(e){if(typeof e!="string")return;let t=e.trim();return sn(t)?t:hm.test(t)?t.toLowerCase():void 0}function ye(e){let t=lr(e);return t?`var(--color-${t})`:e}function Nt(e){let t=lr(e);return t?`var(--color-${t}-on)`:"var(--title-color)"}function ai(e){let t=new Set(e.map(r=>lr(r)??r.toLowerCase()));return fe(oi.find(r=>!t.has(r))??oi[0])}function yd(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;let r=oi;return fe(r[Math.abs(t)%r.length])}function Z(e){return e.trim().toLowerCase()}function bm(e,t,r){if(!Array.isArray(e))return[];let n=[];for(let i of e){let a=typeof i=="string"?i.trim():"",s=Z(a);!s||s===Z(t)||r.has(s)||(r.add(s),n.push(a))}return n}function ym(e){return`group_${Z(e).replace(/[^a-z0-9_-]+/g,"-").replace(/^-+|-+$/g,"")||"group"}`}function je(e){if(!Array.isArray(e))return[];let t=[],r=new Set;for(let n of e){if(!n||typeof n!="object")continue;let i=n,a=typeof i.name=="string"?i.name.trim():"",s=Z(a);if(!a||r.has(s))continue;r.add(s);let l=typeof i.id=="string"&&i.id.trim()?i.id.trim():ym(a),p=bd(i.color)??ai(t.map(m=>m.color)),c=bm(i.aliases,a,r),u=typeof i.parent=="string"?i.parent.trim():"";t.push({id:l,name:a,color:p,...c.length?{aliases:c}:{},...u?{parent:u}:{}})}return vo(t)}function vo(e){let t=new Map;for(let a of e)t.has(a.id)||t.set(a.id,a);let r=a=>{let s=a.parent?t.get(a.parent):void 0;return s&&s.id!==a.id?s:void 0},n=a=>{let s=r(a);return s!==void 0&&r(s)===void 0},i=[];for(let a of e)if(!n(a)){if(a.parent===void 0)i.push(a);else{let{parent:s,...l}=a;i.push(l)}for(let s of e)s.parent===a.id&&s.id!==a.id&&n(s)&&i.push(s)}return i}function ii(e,t){return e.filter(r=>r.parent===t)}function si(e,t){return[t,...ii(e,t.id)]}function xo(e,t,r,n,i){let a=vo(e);if(!a.find(P=>P.id===t))return null;let l=a.some(P=>P.parent===t),p=a.filter(P=>P.id!==t&&P.parent!==t),c=p.findIndex(P=>P.id===r);if(c<0)return null;let u=n==="before"?c:c+1,m=p[u-1],f=p[u],b=m?m.parent??m.id:null,w=b!==null&&f?.parent===b;return!l&&b!==null&&(w||i)?{parent:b,before:w?f.id:null}:{parent:null,before:p.slice(u).find(P=>P.parent===void 0)?.id??null}}function cr(e,t,r){let n=vo(e),i=n.find(m=>m.id===t);if(!i)throw new Error("Group no longer exists");let a=n.filter(m=>m.id===t||m.parent===t),s=n.filter(m=>m.id!==t&&m.parent!==t),{parent:l,...p}=i;if(r.parent!==null){let m=s.find(P=>P.id===r.parent);if(!m||m.parent!==void 0||a.length>1)throw new Error("A subgroup cannot have subgroups");let f=s.filter(P=>P.parent===m.id),b=r.before===null?void 0:f.find(P=>P.id===r.before);if(r.before!==null&&!b)throw new Error("Groups changed; refresh before moving");let w=b??s[s.indexOf(f.at(-1)??m)+1],T=w?s.indexOf(w):s.length;return[...s.slice(0,T),{...p,parent:m.id},...s.slice(T)]}let c=r.before===null?void 0:s.find(m=>m.id===r.before&&m.parent===void 0);if(r.before!==null&&!c)throw new Error("Groups changed; refresh before moving");let u=c?s.indexOf(c):s.length;return[...s.slice(0,u),p,...a.slice(1),...s.slice(u)]}function wd(e,t,r,n){let i=vo(e),a=i.find(u=>u.id===t);if(!a)return null;let s=i.filter(u=>u.parent===a.parent),l=s.indexOf(a),p=r==="before"?n?0:l-1:n?s.length-1:l+1;if(p===l||p<0||p>=s.length)return null;let c=s.filter(u=>u.id!==t);return{parent:a.parent??null,before:c[p]?.id??null}}function rt(e,t){let r=Z(t??"");if(r)return e.find(n=>Z(n.name)===r||(n.aliases??[]).some(i=>Z(i)===r))}function To(e,t){return rt(t,e)?.name}function vd(e,t){let r=Z(e??"");return r?rt(t,e)?.color??yd(r):fe("primary-blue")}function So(e){return ai(e.map(t=>t.color))}function di(e){let t={};for(let r of e){let n=Z(r??"");n&&(t[n]=(t[n]??0)+1)}return t}function xd(e,t){return new Set(si(e,t).flatMap(r=>[r.name,...r.aliases??[]]).map(Z))}function _e(e,t=""){return typeof e=="string"?e:t}function dn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ln(e){let t=_e(e).trim();return/^([01]\d|2[0-3]):[0-5]\d$/.test(t)?t:void 0}function Td(e){let t=_e(e).trim().toLowerCase();return/^#[0-9a-f]{6}$/.test(t)?t:void 0}var wm=["website","email","location","phone","sms","date","datetime","time","duration","app","subscription"],Uw=Object.fromEntries(wm.map(e=>[e,{destination:"ask",recognize:!0}]));var vm=new Set(["javascript","vbscript","data","file","blob","about","chrome","chrome-extension","devtools","view-source",Dt]);function xm(e){return/^([a-z][a-z\d+.-]*):/i.exec(e)?.[1].toLowerCase()??""}function li(e){if(typeof e!="string"||e.length>16384||/[\u0000-\u0020\u007f]/.test(e))return null;let t=xm(e);if(!t||vm.has(t)||t.startsWith(`${Dt}-`))return null;try{let n=new URL(e);if(["http","https"].includes(t)&&(!n.hostname||n.username||n.password))return null}catch{return null}return{category:["http","https"].includes(t)?"website":t==="mailto"?"email":["geo","maps"].includes(t)?"location":["tel","callto"].includes(t)?"phone":["sms","smsto"].includes(t)?"sms":["webcal","webcals"].includes(t)?"subscription":"app",value:e}}var Tm=16384,Sm=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;function km(e){if(!e||e.length>Tm||!/^[A-Za-z0-9_-]+$/.test(e))return null;try{let t=e.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-e.length%4)%4),r=atob(t),n=Uint8Array.from(r,a=>a.charCodeAt(0)),i=JSON.parse(new TextDecoder().decode(n));return i.v!==1||!i.state||typeof i.state!="object"||Array.isArray(i.state)?null:i.state}catch{return null}}function Em(e){try{let t=new URL(e);if(t.protocol!==`${Os}:`||t.hostname!==Ms)return null;let r=t.searchParams.get("realm")??"",n=nr(t.searchParams.get("file"));if(n)return r?{kind:"file",relPath:n,realm:r}:{kind:"file",relPath:n};if(r)return{kind:"realm",realm:r};let i=t.searchParams.get("plugin")??"";if(!Sm.test(i))return null;let a=km(t.searchParams.get("state")??""),s=t.searchParams.get("surface");if(s&&!["main_workspace","left_sidebar","right_sidebar","footer"].includes(s))return null;let l=t.searchParams.get("instance");return l&&l.length>512?null:a?{kind:"plugin",pluginId:i,state:a,...s?{surface:s}:{},...l?{instanceId:l}:{}}:null}catch{return null}}function ko(e){let t=Em(e);return t?.kind==="file"?t.relPath:null}function Sd(e){return li(e)!==null}function Xt(e){return`${e}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}var ci=["auto","white","black"],ur=40,Ao=40;var kd=["completed","canceled"],cn="statuses",pr=[{id:"open",labelKey:"todo.status.todo",color:fe("gray"),done:!1,cls:"todo-st-open",locked:!0},{id:"completed",labelKey:"todo.status.completed",color:fe("green"),done:!0,cls:"todo-st-completed",locked:!0},{id:"inprogress",labelKey:"todo.status.inProgress",color:fe("primary-blue"),done:!1,cls:"todo-st-inprogress",locked:!1},{id:"waiting",labelKey:"todo.status.waiting",color:fe("yellow"),done:!1,cls:"todo-st-waiting",locked:!1},{id:"onhold",labelKey:"todo.status.onHold",color:fe("orange"),done:!1,cls:"todo-st-onhold",locked:!1},{id:"delegated",labelKey:"todo.status.delegated",color:fe("mint"),done:!1,cls:"todo-st-delegated",locked:!1},{id:"deferred",labelKey:"todo.status.deferred",color:fe("violet"),done:!1,cls:"todo-st-deferred",locked:!1},{id:"canceled",labelKey:"todo.status.canceled",color:fe("red"),done:!0,cls:"todo-st-canceled",locked:!1}],un=fe("teal"),ui=pr,Co=pr.map(e=>e.id),Zt=pr.filter(e=>!e.locked).map(e=>e.id),Am=pr.filter(e=>e.done).map(e=>e.id),Eo=new Map(pr.map(e=>[e.id,e])),pi=new Set(Zt);function Je(e){return typeof e=="string"&&/^custom-[a-z0-9]{1,32}$/.test(e)}function mi(){return`custom-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function pn(e){if(!Array.isArray(e))return[];let t=new Set,r=[];for(let n of e){if(!n||typeof n!="object")continue;let i=n,a=typeof i.label=="string"?i.label.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Ao):"";if(!(!Je(i.id)||t.has(i.id)||!a)&&(t.add(i.id),r.push({id:i.id,label:a,done:i.done===!0}),r.length>=ur))break}return r}function fi(e,t){return Eo.has(e)?t.done?.[e]??Eo.get(e).done:t.custom.some(r=>r.id===e&&r.done)}function mr(e){if(typeof e=="string")return Co.includes(e)||Je(e)?e:void 0}function Ie(e){return e.status??(e.completed?"completed":"open")}function Ed(e,t){return e===null||e==="open"?{completed:!1,status:void 0}:{completed:fi(e,t),status:e}}var lt="todo.tasks",Lt="todo.task_tags",Jt="todo.task_links",Qt="todo.task_attachments",Do="todo.focus_sessions",Qe="todo.status_history";async function mn(e,t,r={},n){let i=[],a=r.cursor;do{n?.();let s=await e.data.dataset(t).query(r.select?{select:r.select,where:r.where,limit:1e3,cursor:a}:{where:r.where,limit:1e3,cursor:a});n?.(),i.push(...s.rows),a=s.cursor}while(a);return i}var Cm=200;function Ad(e,t=lt){let r=e?.keys;if(!Array.isArray(r)||!r.length||r.length>Cm)return null;let n=t===lt?"id":"taskId",i=[];for(let a of r){let s=a?.[n];if(typeof s!="string"||!s)return null;i.push(s)}return i}var eo=["normal","low","medium","high"];function fn(e){return typeof e=="string"&&eo.includes(e)}function Cd(e){return/^([01]\d|2[0-3]):[0-5]\d$/.test(e)}function Dd(e){return e===!0}function Dm(e){return fn(e)?e:"normal"}function gn(e){if(typeof e=="number"&&Number.isFinite(e)&&e>=0)return Math.round(e)}function Im(e){return Array.isArray(e)?e.filter(t=>dn(t)).map(t=>({startedAt:_e(t.startedAt),endedAt:_e(t.endedAt),activeMinutes:gn(t.activeMinutes)??0,pauseMinutes:gn(t.pauseMinutes)??0})).filter(t=>t.startedAt&&t.endedAt):[]}function gi(e){return Array.isArray(e)?e.filter(t=>dn(t)).map(t=>({from:mr(t.from),to:mr(t.to),changedAt:_e(t.changedAt)})).filter(t=>!!t.from&&!!t.to&&!!t.changedAt&&t.from!==t.to):[]}function Nm(e){if(typeof e!="string")return;let t=e.trim();return/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/.test(t)?t:void 0}function hi(e){if(typeof e!="string")return;let t=e.trim();if(t)return ko(t)||Sd(t)?t:void 0}function Lm(e){let t=Array.isArray(e)?e:[],r=[...new Set(t.map(n=>hi(n)).filter(n=>!!n))];return r.length?r:void 0}function Pm(e){if(!Array.isArray(e))return;let t=[...new Set(e.map(r=>Wt(r)).filter(r=>!!r))];return t.length?t:void 0}function Om(e){if(!dn(e))return;let t=_e(e.name).trim();if(!t)return;let r=Number(e.lng),n=Number(e.lat);return Number.isFinite(r)&&Number.isFinite(n)&&Math.abs(r)<=180&&Math.abs(n)<=90?{name:t,lng:r,lat:n}:{name:t}}function hn(e){let t=e,r=new Date().toISOString(),n=_e(t.id,Xt("todo")),i=_e(t.createdAt,r),a=Im(t.history),s=gi(t.statusHistory),l=mr(Je(t.customStatus)?t.customStatus:t.status);return{id:n,title:_e(t.title).trim(),completed:Dd(t.completed)||l==="completed"||l==="canceled",priority:Dm(t.priority),dueDate:_e(t.dueDate),reminderOffsets:Array.isArray(t.reminderOffsets)?t.reminderOffsets:void 0,reminderTime:ln(t.reminderTime),startTime:ln(t.startTime),endTime:ln(t.endTime),color:Td(t.color),note:_e(t.note),tags:Array.isArray(t.tags)?t.tags.filter(p=>typeof p=="string"&&!!p.trim()).map(p=>p.trim()):[],estimatedMinutes:gn(t.estimatedMinutes),actualMinutes:gn(t.actualMinutes),history:a.length?a:void 0,statusHistory:s.length?s:void 0,status:l,filePath:Wt(t.filePath),group:_e(t.group).trim()||void 0,flagged:Dd(t.flagged)||void 0,urls:Lm(t.urls),attachments:Pm(t.attachments),location:Om(t.location),remindAt:Nm(t.remindAt),reminderFiredAt:_e(t.reminderFiredAt)||void 0,createdAt:i,updatedAt:_e(t.updatedAt,i)}}function Pt(e,t,r){let n=(c,u=!1)=>{let m=new Map;for(let f of c){let b=m.get(f.taskId);b?b.push(f):m.set(f.taskId,[f])}if(u)for(let f of m.values())f.sort((b,w)=>Number(b.position)-Number(w.position));return m},i=n(t.tags),a=n(t.links,!0),s=n(t.attachments,!0),l=n(t.sessions,!0),p=n(t.statusHistory,!0);return e.map(c=>hn({...c,tags:(i.get(c.id)??[]).map(u=>u.tag),urls:(a.get(c.id)??[]).map(u=>u.url),attachments:(s.get(c.id)??[]).map(u=>u.path),history:l.get(c.id)??[],statusHistory:p.get(c.id)??[]})).map(c=>({...c,group:To(c.group,r)??c.group})).filter(c=>c.title)}var fr=[lt,Lt,Jt,Qt],Mm=[...fr,Do,Qe],bn=fr;function _m(e,t){let r=be(),n=!0,i=!1,a=()=>{i||(i=!0,queueMicrotask(()=>{i=!1,n&&t()}))},s=e.map(c=>r.api.data.dataset(c).subscribe(a)),l=()=>{n=!1,s.forEach(c=>c())},p=r.onDispose(l);return()=>{p(),l()}}function Ot(e){return _m(bn,e)}function Ld(e){let t=fr.map(r=>h.data.dataset(r).subscribe(e));return()=>t.forEach(r=>r())}function bi(e,t,r=be(),n){return mn(r.api,e,{where:t,cursor:n},r.assertActive)}var Gm=e=>!!e&&typeof e=="object"&&"code"in e&&e.code==="limit-exceeded";async function Rm(e,t){let r=e.map(()=>[]),n=e.map((i,a)=>({...i,index:a,cursor:void 0}));for(;n.length;){t.assertActive();let i=n.map(s=>({operation:"query",dataset:s.dataset,query:{where:s.where,limit:1e3,cursor:s.cursor}})),a;try{a=(await t.api.data.snapshot(i)).values}catch(s){if(!Gm(s))throw s;(await Promise.allSettled(n.map(p=>bi(p.dataset,p.where,t,p.cursor)))).forEach((p,c)=>{if(p.status==="rejected")throw p.reason;r[n[c].index].push(...p.value)});break}t.assertActive(),n=n.flatMap((s,l)=>{r[s.index].push(...a[l].rows);let p=a[l].cursor;return p?[{...s,cursor:p}]:[]})}return r}async function yi(e,t,r){let n=r?typeof r=="string"?r:{in:r}:void 0,i=n===void 0?void 0:{taskId:n},a=[Jt,Qt,...t?[Do,Qe]:[]],[s,l,p,c,u=[],m=[]]=await Rm([{dataset:lt,where:n===void 0?void 0:{id:n}},{dataset:Lt,where:i},...a.map(f=>({dataset:f,where:i}))],e);return e.assertActive(),{tasks:s,relations:{tags:l,links:p,attachments:c,sessions:u,statusHistory:m}}}async function Fm(e,t,r){let{tasks:n,relations:i}=await yi(e,t,r);return Pt(n,i,je(e.api.getState().groups))}var Id=new WeakMap;function gr(e,t,r,n,i){try{e.assertActive()}catch(p){return Promise.reject(p)}let a=Id.get(e);a||(a=new Map,Id.set(e,a));let s=a.get(t);if(!s){s={revision:0,pending:new Map};let p=s,c=r.map(u=>e.api.data.dataset(u).subscribe(()=>{p.revision++}));e.onDispose(()=>{c.forEach(u=>u()),a.clear()}),a.set(t,s)}let l=s.pending.get(n);return l||(l=(async()=>{for(await Promise.resolve();;){e.assertActive();let p=s.revision,c=await i();if(e.assertActive(),p===s.revision)return c}})().finally(()=>{s.pending.delete(n)}),s.pending.set(n,l)),l}function Pd(e,t){let r=be();return gr(r,e?"full":"calendar",e?Mm:fr,t??"",()=>Fm(r,e,t))}var Nd=new WeakMap,zm=0;function $m(e,t){let r=Nd.get(e);r||(r=new Map,Nd.set(e,r));let n=r.get(t);if(!n){let s={users:0,key:String(++zm),scope:{...e,assertActive:()=>{if(e.assertActive(),!s.users)throw new Error("To-Do selection disposed")}}};n=s,r.set(t,n)}n.users++;let i=n,a=!0;return{reader:n,release:()=>{a&&(a=!1,i.users--,i.users||r.delete(t))}}}function Um(e,t,r){return gr(e,"statusHistory",[Qe],r.key,async()=>{let n=await bi(Qe,{taskId:t},r.scope);return n.sort((i,a)=>Number(i.position)-Number(a.position)),gi(n)})}function Od(e){let t=be(),[r,n]=o.useState(null);return o.useEffect(()=>{let{reader:i,release:a}=$m(t,e),s=0,l=!1,p=()=>{let f=++s;Um(t,e,i).then(b=>{!l&&f===s&&n({scope:t,id:e,history:b})}).catch(()=>{})},c=t.api.data.dataset(Qe).subscribe(f=>{(!f.keys||f.keys.some(b=>b.taskId===e))&&p()}),u=()=>{l=!0,c(),a()},m=t.onDispose(u);return p(),()=>{m(),u()}},[e,t]),r?.id===e&&r.scope===t?r.history:[]}function wi(){return Pd(!0)}async function Ge(e){return e?(await Pd(!0,e))[0]??null:null}function Md(e,t,r,n){let i=be();return gr(i,"calendarPage",fr,JSON.stringify([e,t,r,n]),async()=>{i.assertActive();let a=await i.api.data.dataset(lt).query({where:{and:[{dueDate:{gte:e}},{dueDate:{lt:`${t}\uFFFF`}}]},orderBy:[{field:"dueDate",direction:"asc"},{field:"id",direction:"asc"}],limit:r,cursor:n});i.assertActive();let s=async m=>{let f=[];for(let b=0;b<a.rows.length;b+=100)f.push(...await bi(m,{taskId:{in:a.rows.slice(b,b+100).map(w=>String(w.id))}},i));return f},l=await Promise.allSettled([s(Lt),s(Jt),s(Qt)]),[p,c,u]=l.map(m=>{if(m.status==="rejected")throw m.reason;return m.value});return i.assertActive(),{todos:Pt(a.rows,{tags:p,links:c,attachments:u,sessions:[],statusHistory:[]},je(i.api.getState().groups)),...a.cursor?{cursor:a.cursor}:{}}})}async function Mt(e){try{return await h.backend.call("records.append",{record:e})}catch{return!1}}async function vi(e,t,r,n,i=!1){try{let a=await h.backend.call("records.update",{id:e,record:t,expectedUpdatedAt:r,documentRevision:n,...i?{exactStatusHistory:i}:{}});return a.ok&&n&&a.documentRevision&&Object.assign(n,a.documentRevision),a.ok?a:null}catch{return null}}async function xi(e,t,r,n,i=!1){let a=await vi(e,t,r,n,i);return a?a.record??t:null}async function Ti(e,t,r,n){return await xi(e,t,r,n)!==null}function Si(e,t,r){return xi(e,t,r)}async function hr(e,t){return await xi(e,t,void 0,void 0,!0)!==null}async function _t(e){try{return await h.backend.call("records.delete",{id:e})}catch{return!1}}function br(e){let t=[],r=e.replace(/#(\S+)/g,(n,i)=>(t.push(i.toLowerCase())," ")).replace(/\s+/g," ").trim().toLowerCase();return{tags:t,text:r}}function ki(e){let t=br(e);return!t.tags.length&&!t.text?()=>!0:(r,...n)=>{for(let i of t.tags)if(!r.some(a=>a.toLowerCase().startsWith(i)))return!1;return!t.text||n.some(i=>i.toLowerCase().includes(t.text))}}var _d=new WeakMap;function Km(e){let t=_d.get(e);if(!t){let r=e.title.toLowerCase(),n=e.note.toLowerCase();t={tags:(e.tags??[]).map(i=>i.toLowerCase()),withGroup:[r,n,(e.group??"").toLowerCase()],withoutGroup:[r,n]},_d.set(e,t)}return t}function Gd(e,t=!0){let r=br(e);return!r.tags.length&&!r.text?()=>!0:n=>{let i=Km(n);for(let a of r.tags)if(!i.tags.some(s=>s.startsWith(a)))return!1;return!r.text||(t?i.withGroup:i.withoutGroup).some(a=>a.includes(r.text))}}var Ei=100;function Gt(e,t,r,n,i){return mn(e,t,{select:r,where:n},i)}var jm={tags:[],links:[],attachments:[],sessions:[],statusHistory:[]};async function Rd(e,t,r){let[n,i]=await Promise.all([Gt(e,lt,t,r.where,r.assertActive),r.withTags?Gt(e,Lt,["taskId","tag"],void 0,r.assertActive):[]]);return Pt(n,{...jm,tags:i},r.groups)}async function Fd(e,t,r){let n=[...new Set(t)],i=new Map;for(let a=0;a<n.length;a+=Ei){let s=n.slice(a,a+Ei),l={taskId:{in:s}},[p,c,u,m,f,b]=await Promise.all([Gt(e,lt,void 0,{id:{in:s}},r.assertActive),Gt(e,Lt,void 0,l,r.assertActive),Gt(e,Jt,void 0,l,r.assertActive),Gt(e,Qt,void 0,l,r.assertActive),Gt(e,Do,void 0,l,r.assertActive),Gt(e,Qe,void 0,l,r.assertActive)]);for(let w of Pt(p,{tags:c,links:u,attachments:m,sessions:f,statusHistory:b},r.groups))i.set(w.id,w)}return n.flatMap(a=>i.get(a)??[])}var zd=Ei;function Ee(e=[]){return e.map(t=>To(t.name,e)??t.name)}var $d=()=>[];function Ud(e){$d=e}var Kd=()=>[],jd=0,yr=null;function Vd(e){Kd=e,wr()}function wr(){yr=null,jd++}function Bd(){return jd}function ct(e){if(!yr){yr=new Map;let r=Kd();for(let n of r){if(n.parent||!r.some(a=>a.parent===n.id))continue;let i=xd(r,n);for(let a of[n.name,...n.aliases??[]])yr.set(Z(a),i)}}let t=Z(e);return yr.get(t)??new Set([t])}function yn(e,t){return rt(t,e)?.parent!==void 0}function Ae(e,t){return vd(e,rt(t,e)?t:$d())}async function Hd(e,t,r,n){let i=new Map,a=e.data.dataset(Qe);for(let s=0;s<t.length;s+=20){let l=t.slice(s,s+20),p=new Map;for(;l.length;){r();let c=await a.aggregate({where:{taskId:{in:l},or:["completed","canceled"].map(m=>({to:m,from:{in:n().filter(f=>f!==m)}})),...p.size?{and:[{or:l.map(m=>({taskId:m,position:{lt:p.get(m)}}))}]}:{}},groupBy:["taskId"],metrics:{position:{operation:"max",field:"position"}}});if(r(),!c.length)break;let u=await a.query({select:["taskId","changedAt"],where:{or:c.map(m=>({taskId:m.taskId,position:m.position}))},limit:20});r(),l=[];for(let m of u.rows){let f=String(m.taskId);if(typeof m.changedAt=="string"&&m.changedAt)i.set(f,{changedAt:m.changedAt});else{let b=c.find(w=>w.taskId===f)?.position;if(typeof b!="number"||!Number.isInteger(b))throw new Error("Invalid completion position");p.set(f,b),l.push(f)}}}}return i}function wn(e){return"historyLoaded"in e&&e.historyLoaded===!1}var Wd={"auto.006b85a57ddf":"No matching todos","auto.01e635f27ec2":"Desc","auto.0379f3c75faa":"To-Do: Edit a task","auto.047d10fd5b0e":"Todo options","auto.090ec5f560fc":"Tasks","auto.0b2982c66cec":"Task tags","auto.112f17ac556e":"To-Do: List tasks","auto.13816aca9c25":"Complete {{p0}}","auto.184c39d1837f":"New todo title","auto.25097a85052b":"Open To-Do page","auto.2fb86192bd77":"To-Do: Complete a task","auto.303631ca5c86":"Searches your todo titles, notes and tags.","auto.3218ad8a4865":"Task links","auto.33ce417454bf":"Loading\u2026","auto.34656b383dd3":"To-Do: List groups","auto.34d1bc4daccf":"To-Do: Add a task","auto.3fc72a0701ff":"To-Do: Complete a task (done)","auto.496cd6a42238":"To-Do: Search tasks","auto.4fee0a06b6e4":"Asc","auto.5301648dcf6b":"Edit","auto.584186da6898":"Task attachments","auto.63e08dc2a4e3":"Sort todos by","auto.664764d2200b":"To-Do: Set task status","auto.67300d0fed7c":"Clear search","auto.6bf5da9c080b":"Options","auto.70ceb3f38ee9":"Status history","auto.77dfd2135f4d":"Cancel","auto.798b29fa6c05":"To-Do: Delete a task","auto.7be377261c61":"Search todos\u2026 (#tag)","auto.886cbff9d9df":"Priority","auto.88d8206d586a":"Start time","auto.a93c9cdad41c":"Nothing here \u2014 all clear.","auto.b5868978587a":"Loading todos","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"New todo","auto.c509ffcf5b5c":"Todo files","auto.c5e8306a511f":"Todo title","auto.c7f73bb54d92":"Settings","auto.cd7800da7f4f":"End time","auto.cec28cbe4204":"No todos","auto.cf3d0c76d559":"To-Do: Reopen a task","auto.d2f76731e1e1":"Comfortable view","auto.e0345e9d3092":"Search todos","auto.e3719eae891e":"Compact view","auto.edbe7ad07b4a":"Open To-Do","auto.f6fdbe48dc54":"Delete","auto.f783bdbe8fa8":"Focus sessions","auto.f93fb4b1ab19":"Clear the calendar date filter","auto.fb3a16f382f8":"Copy Valley link","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Ask for writes","guard.preset.blocked":"Blocked","guard.preset.read-only":"Read-only","guard.preset.recommended":"Recommended","manifest.description":"Structured task manager with smart lists, multi-group filters, statuses, swipe actions, attachment-linked panels, and timestamped activity.","manifest.name":"To-Do","markdown.examples.allTasks":"All tasks","markdown.examples.completedTasks":"Completed tasks","markdown.examples.dayTasks":"Tasks due today","markdown.examples.filtered":"Filtered results","markdown.examples.openTasks":"Open tasks","markdown.examples.overdueTasks":"Overdue tasks","markdown.examples.weekTasks":"Tasks due this week","plugin.todo.notification.reminder":"Todo reminder","plugin.todo.notification.reminderDesc":"Announces a dated todo at its reminder time, including with every window closed.","todo.action.edit":"Edit","todo.action.openAttachment":"Attachment","todo.action.openInTodo":"Open in To-Do","todo.action.openLink":"Link","todo.action.openNote":"Open note","todo.action.showOnMap":"Show on map","todo.activity":"Activity","todo.addAttachment":"Add attachment","todo.attachmentTasks.noFile":"Open an attachment to see its to-dos","todo.attachmentTasks.none":"No to-dos for this attachment","todo.attachmentTasks.title":"To-Do","todo.attachments":"Attachments","todo.breakdown.daily":"Daily","todo.breakdown.monthly":"Monthly","todo.breakdown.noDate":"No date","todo.breakdown.weekLabel":"Week {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Weekly","todo.chip.all":"All","todo.chip.noGroup":"No group","todo.command.editFields":"To-Do: Edit task fields","todo.command.get":"To-Do: Get task","todo.command.openTask":"To-Do: Open task","todo.completed.hide":"Hide completed","todo.completed.show":"Show completed","todo.completed.showAll":"Show all","todo.delete.message":"will be permanently deleted.","todo.delete.title":"Delete todo?","todo.details":"Details","todo.due.overdue":"Overdue","todo.due.today":"Today","todo.due.tomorrow":"Tomorrow","todo.due.yesterday":"Yesterday","todo.edit.done":"Done","todo.edit.group":"Group","todo.edit.notes":"Notes","todo.edit.schedule":"Schedule","todo.edit.tags":"Tags","todo.edit.title":"Edit todo","todo.error.saveDraft":"Could not save the task. Your draft is preserved; edit it to retry.","todo.fab.newTodo":"New todo","todo.fab.newTodoIn":"New todo in\u2026","todo.fewerFiles":"Show less","todo.field.actualMinutes":"Tracked minutes","todo.field.attachments":"Attachments","todo.field.color":"Color","todo.field.completed":"Completed","todo.field.createdAt":"Created","todo.field.dueDate":"Due date","todo.field.endTime":"End time","todo.field.estimatedMinutes":"Estimated minutes","todo.field.filePath":"Linked file","todo.field.flagged":"Flagged","todo.field.group":"Group","todo.field.history":"Time history","todo.field.id":"Task ID","todo.field.location":"Location","todo.field.note":"Notes","todo.field.priority":"Priority","todo.field.remindAt":"Reminder","todo.field.reminderFiredAt":"Reminder delivered","todo.field.startTime":"Start time","todo.field.status":"Status","todo.field.statusHistory":"Status history","todo.field.tags":"Tags","todo.field.title":"Title","todo.field.updatedAt":"Updated","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Source File","todo.fileKind.csv":"Spreadsheet","todo.fileKind.file":"File","todo.fileKind.generic":"{{p0}} File","todo.fileKind.image":"Image","todo.fileKind.json":"JSON File","todo.fileKind.model3d":"3D Model","todo.fileKind.pdf":"PDF Document","todo.fileKind.powerpoint":"Presentation","todo.fileKind.text":"Text Document","todo.fileKind.video":"Video","todo.fileKind.word":"Word Document","todo.filters":"Filters","todo.filters.completed":"Completed","todo.filters.sort":"Sort by","todo.filters.statusAndCompleted":"Status and completed","todo.filters.statuses":"Statuses","todo.flag":"Flag","todo.flagged":"Flagged","todo.group.add":"Add","todo.group.cancel":"Cancel","todo.group.deselectAll":"Deselect all","todo.group.manage":"Manage groups","todo.group.selectAll":"Select all","todo.linkedFile":"Linked file","todo.location":"Location","todo.locationPlaceholder":"Search for a place\u2026","todo.menu.moveGroup":"Move to group","todo.menu.reschedule":"Reschedule","todo.moreFiles":"+{{p0}} more","todo.newTodoIn":"New todo in {{p0}}","todo.openInCalendar":"Show {{p0}} in the calendar","todo.openLocation":"Show on map","todo.openLocationOf":"Show {{p0}} on the map","todo.priority.high":"High","todo.priority.highMeta":"High priority","todo.priority.low":"Low","todo.priority.lowMeta":"Low priority","todo.priority.medium":"Medium","todo.priority.mediumMeta":"Medium priority","todo.priority.none":"None","todo.priority.noneMeta":"No priority","todo.reminderSet":"Reminder set","todo.removeAttachment":"Remove attachment","todo.removeAttachmentOf":"Remove {{p0}}","todo.removeLocation":"Remove location","todo.removeUrl":"Remove link","todo.removeUrlOf":"Remove link {{p0}}","todo.section.someday":"Someday","todo.section.upcoming":"Upcoming","todo.settings.dateBreakdown":"Date breakdown","todo.settings.dateBreakdownDesc":"Organize the narrow To-Do panels by month, calendar week, or day.","todo.settings.display":"Display","todo.settings.smartListReorder":"Reorder smart list","todo.settings.smartLists":"Smart lists","todo.settings.smartListsDesc":"Drag to reorder, pick a color, and switch off lists you do not use.","todo.settings.statusAdd":"Add status","todo.settings.statusColor":"Color of {{p0}}","todo.settings.statusLocked":"Locked status","todo.settings.statusReorder":"Reorder status","todo.settings.statusShow":"Show {{p0}}","todo.settings.statuses":"Statuses","todo.settings.statusesDesc":"To do and Completed are always available. Drag the others to reorder them, or switch them off.","todo.sort.created":"Created","todo.sort.due":"Due","todo.sort.name":"Name","todo.sort.priority":"Priority","todo.sort.updated":"Updated","todo.status.canceled":"Canceled","todo.status.completed":"Completed","todo.status.deferred":"Deferred","todo.status.delegated":"Delegated","todo.status.inProgress":"In Progress","todo.status.onHold":"On Hold","todo.status.todo":"To do","todo.status.waiting":"Waiting","todo.swipe.date":"Date & Time","todo.swipe.delete":"Delete","todo.swipe.flag":"Flag","todo.swipe.thisWeekend":"This weekend","todo.swipe.tomorrow":"Tomorrow","todo.swipe.unflag":"Unflag","todo.undo.add":"Add todo \u201C{{title}}\u201D","todo.undo.delete":"Delete todo \u201C{{title}}\u201D","todo.undo.edit":"Edit todo \u201C{{title}}\u201D","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"All","todo.view.completed":"Completed","todo.view.flagged":"Flagged","todo.view.groups":"Groups","todo.view.myLists":"Groups","todo.view.expandGroup":"Show the subgroups of {{p0}}","todo.view.collapseGroup":"Hide the subgroups of {{p0}}","todo.view.expandAllGroups":"Expand all groups","todo.view.collapseAllGroups":"Collapse all groups","todo.view.scheduled":"Scheduled","todo.view.selectedGroups":"{{count}} groups","todo.view.today":"Today","todo.compose.addTags":"Add tags","todo.compose.addDate":"Add date","todo.compose.time":"Time","todo.compose.removeTag":"Remove tag {{tag}}","workflow.delivery.title":"Workflow event unavailable","workflow.delivery.message":"Your changes were saved and can be undone. A workflow trigger could not be delivered, so automatic actions may not have run.","workflow.delivery.close":"Close","reminders.title":"Reminders","reminders.default":"Plugin default","reminders.off":"Off","reminders.custom":"Custom","reminders.time":"Reminder time","notification.open":"Open","notification.complete":"Mark complete","notification.snooze":"Snooze","notification.minutes":"{{count}} minutes","notification.reminder":"Event reminder","bookmark.view":"Tasks and filters","bookmark.item":"Selected item","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Title","todo.table.status":"Status","todo.table.priority":"Priority","todo.table.due":"Due","todo.table.group":"Group","todo.table.tags":"Tags","todo.table.note":"Notes","todo.table.location":"Location","todo.table.taskCount":"{{count}} tasks","todo.table.oneTask":"1 task","todo.table.toggleColumns":"Toggle columns","todo.table.filterPlaceholder":"Filter tasks\u2026","todo.table.selectedCount":"{{count}} selected","todo.table.complete":"Complete","todo.table.deleteTitle":"Delete {{count}} tasks?","todo.table.deleteMessage":"The {{count}} selected tasks will be permanently deleted.","todo.table.rowsPerPage":"Rows per page","todo.table.page":"Page {{page}} of {{pages}}","todo.table.firstPage":"Go to first page","todo.table.previousPage":"Go to previous page","todo.table.nextPage":"Go to next page","todo.table.lastPage":"Go to last page","todo.table.empty":"No results.","todo.settings.section.lists":"Lists and statuses","todo.settings.section.groups":"Groups","todo.settings.smartListColor":"Color of {{p0}}","todo.settings.smartListShow":"Show {{p0}}","todo.settings.statusText":"Text color of {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"White","todo.settings.textBlack":"Black","todo.settings.colStatus":"Status","todo.settings.colColor":"Color","todo.settings.colText":"Text","todo.settings.colShow":"Show","reminders.defaultTitle":"Default reminder","reminders.defaultDesc":"Used for tasks with a time unless a task sets its own.","todo.filters.title":"Filter","todo.view.week":"This Week","todo.settings.colList":"List","todo.settings.statusStrike":"Strike through {{p0}}","todo.settings.colStrike":"Strikethrough","todo.table.reorderColumn":"Reorder {{p0}}","todo.filters.quickAll":"Show every status","todo.filters.quickOpen":"Show only unfinished statuses","todo.filters.quickDone":"Show only Completed and Canceled","todo.table.resizeColumn":"Resize {{p0}} (double-click to reset)","todo.table.newRow":"New task \u2014 type, or paste several lines","todo.table.completedCount":"{{count}} completed","todo.table.editTitle":"Edit title of {{p0}}","todo.table.editCell":"Edit {{p0}}","todo.compose.addPlace":"Add place","todo.settings.statusNew":"New status name","todo.settings.statusNewPlaceholder":"New status","todo.settings.statusName":"Status name","todo.settings.statusDone":"{{p0}} counts as done","todo.settings.statusDelete":"Delete {{p0}}","todo.settings.statusDeleteTitle":"Delete the status \u201C{{p0}}\u201D?","todo.settings.statusDeleteMoves":"{{count}} tasks in this status will move to {{p0}}.","todo.settings.statusDeleteUnused":"No task uses this status.","todo.settings.localGroups":"To-Do-only groups","todo.settings.localGroupsDesc":"Private to To-Do: create, rename, colour and reorder them here.","todo.settings.useSharedGroups":"Shared groups","todo.settings.useSharedGroupsDesc":"Groups that Calendar, Contacts and Workspace use too. A change here changes them everywhere.","todo.settings.useLocalGroups":"To-Do-only groups","todo.settings.useLocalGroupsDesc":"Groups that exist only in To-Do. No other plugin sees them.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Color of {{p0}}","todo.settings.localGroupDelete":"Delete {{p0}}","todo.settings.localGroupRemove":"Remove group","todo.settings.localGroupRemoveBlocked":"Still used by {{count}} tasks \u2014 move them to another group to delete it","todo.settings.localGroupNew":"New To-Do group","todo.settings.localGroupAdd":"Add","todo.settings.localGroupsSetting":"Individual To-Do groups","todo.settings.collapsedGroupsSetting":"Collapsed sidebar groups","todo.settings.groupOrderSetting":"Order of the sidebar groups","todo.settings.localGroupUsage":"{{count}} tasks use this group","todo.settings.localGroupNewColor":"Color of the new group","todo.settings.localGroupDuplicate":"A group with that name already exists.","todo.settings.localSubgroupAdd":"Add subgroup","todo.settings.localSubgroupAddTo":"Add subgroup to {{p0}}","todo.settings.localSubgroupNew":"New subgroup","todo.settings.localGroupRemoveSubgroups":"Still has subgroups \u2014 remove or move them first","todo.location.searching":"Searching\u2026","todo.location.noResults":"No places found. Press Enter to keep the text.","todo.location.failed":"Place search is unavailable. Press Enter to keep the text.","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Place","todo.sheet.attachment":"Attachment","todo.sheet.link":"Link","todo.sheet.unlinkFile":"Unlink file","todo.file.searchAttachment":"Find a file to attach","todo.file.searchLinked":"Find the file this task belongs to","todo.file.noResults":"No matching files.","todo.settings.statusIcon":"Status icon","todo.settings.statusIconOf":"Icon of {{p0}}","todo.settings.statusIconHint":"Click the chosen icon again to go back to the status\u2019s own icon. Add SVG files to {{p0}}; the file name is the icon name.","todo.settings.statusesDescAll":"To do and Completed always come first, keep their own icons and cannot be deleted. Every status can be renamed and recoloured; the others can also get an icon, be marked done, reordered, switched off or deleted.","todo.settings.colIcon":"Icon","todo.settings.colDone":"Counts as done","todo.settings.statusRestore":"Restore {{count}} deleted built-in statuses","reminders.timeBefore":"Time before (hh:mm)","reminders.timeBeforeDesc":"How long before the task starts, for example 00:10 or 01:30.","reminders.timeInvalid":"Enter hours and minutes like 00:10 (minutes 00\u201359, at most 168:00).","todo.calendar.clear":"Clear","todo.calendar.prev":"Previous month","todo.calendar.next":"Next month","todo.time.invalid":"Enter a time like 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Today to do","todo.info.todayCompleted":"Today completed","todo.info.weekTodo":"This week to do","todo.info.weekCompleted":"This week completed","todo.info.allTodo":"All to do","todo.info.allCompleted":"All completed"};var qd={"auto.006b85a57ddf":"Keine passenden Aufgaben","auto.01e635f27ec2":"Abst.","auto.0379f3c75faa":"To-Do: Eine Aufgabe bearbeiten","auto.047d10fd5b0e":"Todo-Optionen","auto.090ec5f560fc":"Aufgaben","auto.0b2982c66cec":"Aufgaben-Tags","auto.112f17ac556e":"To-Do: Aufgaben auflisten","auto.13816aca9c25":"Schlie\xDFe {{p0}} ab","auto.184c39d1837f":"Neuer Aufgabentitel","auto.25097a85052b":"To-Do-Seite \xF6ffnen","auto.2fb86192bd77":"To-Do: Erledige eine Aufgabe","auto.303631ca5c86":"Durchsucht deine Todo-Titel, Notizen und Tags.","auto.3218ad8a4865":"Aufgabenlinks","auto.33ce417454bf":"Laden\u2026","auto.34656b383dd3":"To-Do: Gruppen auflisten","auto.34d1bc4daccf":"To-Do: Eine Aufgabe hinzuf\xFCgen","auto.3fc72a0701ff":"To-Do: Eine Aufgabe abschlie\xDFen (erledigt)","auto.496cd6a42238":"To-Do: Aufgaben suchen","auto.4fee0a06b6e4":"Aufst.","auto.5301648dcf6b":"Bearbeiten","auto.584186da6898":"Aufgabenanh\xE4nge","auto.63e08dc2a4e3":"Sortieren Sie die Aufgaben nach","auto.664764d2200b":"To-Do: Aufgabenstatus festlegen","auto.67300d0fed7c":"Suche l\xF6schen","auto.6bf5da9c080b":"Optionen","auto.70ceb3f38ee9":"Statusverlauf","auto.77dfd2135f4d":"Abbrechen","auto.798b29fa6c05":"To-Do: Eine Aufgabe l\xF6schen","auto.7be377261c61":"Todos durchsuchen\u2026 (#tag)","auto.886cbff9d9df":"Priorit\xE4t","auto.88d8206d586a":"Startzeit","auto.a93c9cdad41c":"Hier ist nichts \u2013 alles klar.","auto.b5868978587a":"Aufgaben werden geladen","auto.bae7d5be7082":"Status","auto.c274dabfd0fe":"Neue Aufgaben","auto.c509ffcf5b5c":"Dateien der Aufgabe","auto.c5e8306a511f":"Todo-Titel","auto.c7f73bb54d92":"Einstellungen","auto.cd7800da7f4f":"Endzeit","auto.cec28cbe4204":"Keine Aufgaben","auto.cf3d0c76d559":"To-Do: Eine Aufgabe erneut \xF6ffnen","auto.d2f76731e1e1":"Komfortable Aussicht","auto.e0345e9d3092":"Nach Aufgaben suchen","auto.e3719eae891e":"Kompaktansicht","auto.edbe7ad07b4a":"To-Do \xF6ffnen","auto.f6fdbe48dc54":"L\xF6schen","auto.f783bdbe8fa8":"Fokussitzungen","auto.f93fb4b1ab19":"L\xF6schen Sie den Kalenderdatumsfilter","auto.fb3a16f382f8":"Valley-Link kopieren","auto.fdebf6672120":"Todo","guard.preset.ask-for-writes":"Bei \xC4nderungen fragen","guard.preset.blocked":"Blockiert","guard.preset.read-only":"Nur lesen","guard.preset.recommended":"Empfohlen","manifest.description":"Strukturierte Aufgabenverwaltung: Browser in der linken Seitenleiste, Liste pro Datei rechts, ein Fokus-Timer in der Fu\xDFzeile und eine vollst\xE4ndige Arbeitsbereichsseite mit einklappbaren Abschnitten f\xFCr \xDCberf\xE4llig/Heute/Demn\xE4chst.","manifest.name":"Aufgaben","markdown.examples.allTasks":"Alle Aufgaben","markdown.examples.completedTasks":"Erledigte Aufgaben","markdown.examples.dayTasks":"Heute f\xE4llige Aufgaben","markdown.examples.filtered":"Gefilterte Ergebnisse","markdown.examples.openTasks":"Offene Aufgaben","markdown.examples.overdueTasks":"\xDCberf\xE4llige Aufgaben","markdown.examples.weekTasks":"Diese Woche f\xE4llige Aufgaben","plugin.todo.notification.reminder":"Todo-Erinnerung","plugin.todo.notification.reminderDesc":"Meldet ein datiertes Todo zur Erinnerungszeit, auch bei geschlossenen Fenstern.","todo.action.edit":"Bearbeiten","todo.action.openAttachment":"Anhang","todo.action.openInTodo":"In To-Do \xF6ffnen","todo.action.openLink":"Link","todo.action.openNote":"Notiz \xF6ffnen","todo.action.showOnMap":"Auf Karte anzeigen","todo.activity":"Aktivit\xE4t","todo.addAttachment":"Anhang hinzuf\xFCgen","todo.attachmentTasks.noFile":"\xD6ffne einen Anhang, um seine To-Dos zu sehen","todo.attachmentTasks.none":"Keine To-Dos f\xFCr diesen Anhang","todo.attachmentTasks.title":"Aufgaben","todo.attachments":"Anh\xE4nge","todo.breakdown.daily":"T\xE4glich","todo.breakdown.monthly":"Monatlich","todo.breakdown.noDate":"Ohne Datum","todo.breakdown.weekLabel":"Woche {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"W\xF6chentlich","todo.chip.all":"Alle","todo.chip.noGroup":"Ohne Gruppe","todo.command.editFields":"To-Do: Aufgabenfelder bearbeiten","todo.command.get":"To-Do: Aufgabe abrufen","todo.command.openTask":"To-Do: Aufgabe \xF6ffnen","todo.completed.hide":"Erledigte ausblenden","todo.completed.show":"Erledigte einblenden","todo.completed.showAll":"Alle anzeigen","todo.delete.message":"wird dauerhaft gel\xF6scht.","todo.delete.title":"Todo l\xF6schen?","todo.details":"Details","todo.due.overdue":"\xDCberf\xE4llig","todo.due.today":"Heute","todo.due.tomorrow":"Morgen","todo.due.yesterday":"Gestern","todo.edit.done":"Fertig","todo.edit.group":"Gruppe","todo.edit.notes":"Notizen","todo.edit.schedule":"Termin","todo.edit.tags":"Tags","todo.edit.title":"Todo bearbeiten","todo.error.saveDraft":"Die Aufgabe konnte nicht gespeichert werden. Dein Entwurf bleibt erhalten. Bearbeite ihn, um es erneut zu versuchen.","todo.fab.newTodo":"Neue Aufgabe","todo.fab.newTodoIn":"Neue Aufgabe in\u2026","todo.fewerFiles":"Weniger anzeigen","todo.field.actualMinutes":"Erfasste Minuten","todo.field.attachments":"Anh\xE4nge","todo.field.color":"Farbe","todo.field.completed":"Abgeschlossen","todo.field.createdAt":"Erstellt","todo.field.dueDate":"F\xE4lligkeitsdatum","todo.field.endTime":"Endzeit","todo.field.estimatedMinutes":"Gesch\xE4tzte Minuten","todo.field.filePath":"Verkn\xFCpfte Datei","todo.field.flagged":"Markiert","todo.field.group":"Gruppe","todo.field.history":"Zeitverlauf","todo.field.id":"Aufgaben-ID","todo.field.location":"Ort","todo.field.note":"Notizen","todo.field.priority":"Priorit\xE4t","todo.field.remindAt":"Erinnerung","todo.field.reminderFiredAt":"Erinnerung gesendet","todo.field.startTime":"Startzeit","todo.field.status":"Status","todo.field.statusHistory":"Statusverlauf","todo.field.tags":"Tags","todo.field.title":"Titel","todo.field.updatedAt":"Aktualisiert","todo.field.urls":"Links","todo.fileKind.audio":"Audio","todo.fileKind.code":"Quelldatei","todo.fileKind.csv":"Tabelle","todo.fileKind.file":"Datei","todo.fileKind.generic":"{{p0}}-Datei","todo.fileKind.image":"Bild","todo.fileKind.json":"JSON-Datei","todo.fileKind.model3d":"3D-Modell","todo.fileKind.pdf":"PDF-Dokument","todo.fileKind.powerpoint":"Pr\xE4sentation","todo.fileKind.text":"Textdokument","todo.fileKind.video":"Video","todo.fileKind.word":"Word-Dokument","todo.filters":"Filter","todo.filters.completed":"Abgeschlossen","todo.filters.sort":"Sortieren nach","todo.filters.statusAndCompleted":"Status und Erledigte","todo.filters.statuses":"Status","todo.flag":"Markieren","todo.flagged":"Markiert","todo.group.add":"Hinzuf\xFCgen","todo.group.cancel":"Abbrechen","todo.group.deselectAll":"Auswahl aufheben","todo.group.manage":"Gruppen verwalten","todo.group.selectAll":"Alle ausw\xE4hlen","todo.linkedFile":"Verkn\xFCpfte Datei","todo.location":"Ort","todo.locationPlaceholder":"Nach einem Ort suchen\u2026","todo.menu.moveGroup":"In Gruppe verschieben","todo.menu.reschedule":"Neu planen","todo.moreFiles":"+{{p0}} weitere","todo.newTodoIn":"Neue Aufgabe in {{p0}}","todo.openInCalendar":"{{p0}} im Kalender anzeigen","todo.openLocation":"Auf Karte zeigen","todo.openLocationOf":"{{p0}} auf der Karte zeigen","todo.priority.high":"Hoch","todo.priority.highMeta":"Hohe Priorit\xE4t","todo.priority.low":"Niedrig","todo.priority.lowMeta":"Niedrige Priorit\xE4t","todo.priority.medium":"Mittel","todo.priority.mediumMeta":"Mittlere Priorit\xE4t","todo.priority.none":"Keine","todo.priority.noneMeta":"Keine Priorit\xE4t","todo.reminderSet":"Erinnerung gesetzt","todo.removeAttachment":"Anhang entfernen","todo.removeAttachmentOf":"{{p0}} entfernen","todo.removeLocation":"Ort entfernen","todo.removeUrl":"Link entfernen","todo.removeUrlOf":"Link {{p0}} entfernen","todo.section.someday":"Irgendwann","todo.section.upcoming":"Demn\xE4chst","todo.settings.dateBreakdown":"Datumsaufteilung","todo.settings.dateBreakdownDesc":"Ordnet die schmalen To-Do-Bereiche nach Monat, Kalenderwoche oder Tag.","todo.settings.display":"Darstellung","todo.settings.smartListReorder":"Intelligente Liste neu anordnen","todo.settings.smartLists":"Intelligente Listen","todo.settings.smartListsDesc":"Zum Neuordnen ziehen, eine Farbe w\xE4hlen und nicht ben\xF6tigte Listen ausschalten.","todo.settings.statusAdd":"Status hinzuf\xFCgen","todo.settings.statusColor":"Farbe von {{p0}}","todo.settings.statusLocked":"Gesperrter Status","todo.settings.statusReorder":"Status neu anordnen","todo.settings.statusShow":"{{p0}} einblenden","todo.settings.statuses":"Status","todo.settings.statusesDesc":"Zu erledigen und Abgeschlossen sind immer verf\xFCgbar. Die \xFCbrigen lassen sich per Ziehen neu ordnen oder ausschalten.","todo.sort.created":"Erstellt","todo.sort.due":"F\xE4llig","todo.sort.name":"Name","todo.sort.priority":"Priorit\xE4t","todo.sort.updated":"Aktualisiert","todo.status.canceled":"Abgebrochen","todo.status.completed":"Abgeschlossen","todo.status.deferred":"Zur\xFCckgestellt","todo.status.delegated":"Delegiert","todo.status.inProgress":"In Arbeit","todo.status.onHold":"Pausiert","todo.status.todo":"Zu erledigen","todo.status.waiting":"Wartet","todo.swipe.date":"Datum & Uhrzeit","todo.swipe.delete":"L\xF6schen","todo.swipe.flag":"Markieren","todo.swipe.thisWeekend":"Dieses Wochenende","todo.swipe.tomorrow":"Morgen","todo.swipe.unflag":"Markierung entfernen","todo.undo.add":"Aufgabe \u201E{{title}}\u201C hinzuf\xFCgen","todo.undo.delete":"Aufgabe \u201E{{title}}\u201C l\xF6schen","todo.undo.edit":"Bearbeiten Sie die Aufgabe \u201E{{title}}\u201C","todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Alle","todo.view.completed":"Abgeschlossen","todo.view.flagged":"Markiert","todo.view.groups":"Gruppen","todo.view.myLists":"Gruppen","todo.view.expandGroup":"Untergruppen von {{p0}} einblenden","todo.view.collapseGroup":"Untergruppen von {{p0}} ausblenden","todo.view.expandAllGroups":"Alle Gruppen ausklappen","todo.view.collapseAllGroups":"Alle Gruppen einklappen","todo.view.scheduled":"Geplant","todo.view.selectedGroups":"{{count}} Gruppen","todo.view.today":"Heute","todo.compose.addTags":"Tags hinzuf\xFCgen","todo.compose.addDate":"Datum hinzuf\xFCgen","todo.compose.time":"Zeit","todo.compose.removeTag":"Tag {{tag}} entfernen","workflow.delivery.title":"Workflow-Ereignis nicht verf\xFCgbar","workflow.delivery.message":"Deine \xC4nderungen wurden gespeichert und k\xF6nnen r\xFCckg\xE4ngig gemacht werden. Ein Workflow-Ausl\xF6ser konnte nicht \xFCbermittelt werden. Automatische Aktionen wurden m\xF6glicherweise nicht ausgef\xFChrt.","workflow.delivery.close":"Schlie\xDFen","reminders.title":"Erinnerungen","reminders.default":"Plugin-Standard","reminders.off":"Aus","reminders.custom":"Benutzerdefiniert","reminders.time":"Erinnerungszeit","notification.open":"\xD6ffnen","notification.complete":"Als erledigt markieren","notification.snooze":"Sp\xE4ter erinnern","notification.minutes":"{{count}} Minuten","notification.reminder":"Terminerinnerung","bookmark.view":"Aufgaben und Filter","bookmark.item":"Ausgew\xE4hlter Eintrag","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titel","todo.table.status":"Status","todo.table.priority":"Priorit\xE4t","todo.table.due":"F\xE4llig","todo.table.group":"Gruppe","todo.table.tags":"Tags","todo.table.note":"Notizen","todo.table.location":"Ort","todo.table.taskCount":"{{count}} Aufgaben","todo.table.oneTask":"1 Aufgabe","todo.table.toggleColumns":"Spalten ein- und ausblenden","todo.table.filterPlaceholder":"Aufgaben filtern \u2026","todo.table.selectedCount":"{{count}} ausgew\xE4hlt","todo.table.complete":"Erledigen","todo.table.deleteTitle":"{{count}} Aufgaben l\xF6schen?","todo.table.deleteMessage":"Die {{count}} ausgew\xE4hlten Aufgaben werden endg\xFCltig gel\xF6scht.","todo.table.rowsPerPage":"Zeilen pro Seite","todo.table.page":"Seite {{page}} von {{pages}}","todo.table.firstPage":"Zur ersten Seite","todo.table.previousPage":"Zur vorherigen Seite","todo.table.nextPage":"Zur n\xE4chsten Seite","todo.table.lastPage":"Zur letzten Seite","todo.table.empty":"Keine Ergebnisse.","todo.settings.section.lists":"Listen und Status","todo.settings.section.groups":"Gruppen","todo.settings.smartListColor":"Farbe von {{p0}}","todo.settings.smartListShow":"{{p0}} anzeigen","todo.settings.statusText":"Textfarbe von {{p0}}","todo.settings.textAuto":"Automatisch","todo.settings.textWhite":"Weiss","todo.settings.textBlack":"Schwarz","todo.settings.colStatus":"Status","todo.settings.colColor":"Farbe","todo.settings.colText":"Text","todo.settings.colShow":"Anzeigen","reminders.defaultTitle":"Standarderinnerung","reminders.defaultDesc":"Gilt f\xFCr Aufgaben mit Uhrzeit, sofern eine Aufgabe keine eigene festlegt.","todo.filters.title":"Filter","todo.view.week":"Diese Woche","todo.settings.colList":"Liste","todo.settings.statusStrike":"{{p0}} durchstreichen","todo.settings.colStrike":"Durchgestrichen","todo.table.reorderColumn":"{{p0}} verschieben","todo.filters.quickAll":"Alle Status anzeigen","todo.filters.quickOpen":"Nur offene Status anzeigen","todo.filters.quickDone":"Nur Abgeschlossen und Abgebrochen anzeigen","todo.table.resizeColumn":"Breite von {{p0}} \xE4ndern (Doppelklick setzt zur\xFCck)","todo.table.newRow":"Neue Aufgabe \u2013 tippen oder mehrere Zeilen einf\xFCgen","todo.table.completedCount":"{{count}} abgeschlossen","todo.table.editTitle":"Titel von {{p0}} bearbeiten","todo.table.editCell":"{{p0}} bearbeiten","todo.compose.addPlace":"Ort hinzuf\xFCgen","todo.settings.statusNew":"Name des neuen Status","todo.settings.statusNewPlaceholder":"Neuer Status","todo.settings.statusName":"Statusname","todo.settings.statusDone":"{{p0}} gilt als erledigt","todo.settings.statusDelete":"{{p0}} l\xF6schen","todo.settings.statusDeleteTitle":"Status \u201E{{p0}}\u201C l\xF6schen?","todo.settings.statusDeleteMoves":"{{count}} Aufgaben mit diesem Status wechseln zu {{p0}}.","todo.settings.statusDeleteUnused":"Keine Aufgabe verwendet diesen Status.","todo.settings.localGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.localGroupsDesc":"Geh\xF6ren nur zu Aufgaben: hier erstellen, umbenennen, einf\xE4rben und neu ordnen.","todo.settings.useSharedGroups":"Gemeinsame Gruppen","todo.settings.useSharedGroupsDesc":"Gruppen, die auch Kalender, Kontakte und Arbeitsbereiche verwenden. Eine \xC4nderung hier \xE4ndert sie \xFCberall.","todo.settings.useLocalGroups":"Gruppen nur f\xFCr Aufgaben","todo.settings.useLocalGroupsDesc":"Gruppen, die es nur in Aufgaben gibt. Kein anderes Plugin sieht sie.","todo.settings.localGroupName":"Name","todo.settings.localGroupColor":"Farbe von {{p0}}","todo.settings.localGroupDelete":"{{p0}} l\xF6schen","todo.settings.localGroupRemove":"Gruppe entfernen","todo.settings.localGroupRemoveBlocked":"Wird noch von {{count}} Aufgaben verwendet \u2014 Aufgaben zuerst in eine andere Gruppe verschieben","todo.settings.localGroupNew":"Neue To-Do-Gruppe","todo.settings.localGroupAdd":"Hinzuf\xFCgen","todo.settings.localGroupsSetting":"Eigene To-Do-Gruppen","todo.settings.collapsedGroupsSetting":"Eingeklappte Gruppen in der Seitenleiste","todo.settings.groupOrderSetting":"Reihenfolge der Gruppen in der Seitenleiste","todo.settings.localGroupUsage":"{{count}} Aufgaben verwenden diese Gruppe","todo.settings.localGroupNewColor":"Farbe der neuen Gruppe","todo.settings.localGroupDuplicate":"Eine Gruppe mit diesem Namen existiert bereits.","todo.settings.localSubgroupAdd":"Untergruppe hinzuf\xFCgen","todo.settings.localSubgroupAddTo":"Untergruppe zu {{p0}} hinzuf\xFCgen","todo.settings.localSubgroupNew":"Neue Untergruppe","todo.settings.localGroupRemoveSubgroups":"Hat noch Untergruppen \u2014 zuerst entfernen oder verschieben","todo.location.searching":"Suche \u2026","todo.location.noResults":"Keine Orte gefunden. Mit Enter bleibt der Text.","todo.location.failed":"Ortssuche nicht verf\xFCgbar. Mit Enter bleibt der Text.","todo.sheet.notesPlaceholder":"Notizen","todo.sheet.date":"Datum","todo.sheet.place":"Ort","todo.sheet.attachment":"Anhang","todo.sheet.link":"Link","todo.sheet.unlinkFile":"Datei l\xF6sen","todo.file.searchAttachment":"Datei zum Anh\xE4ngen suchen","todo.file.searchLinked":"Datei suchen, zu der die Aufgabe geh\xF6rt","todo.file.noResults":"Keine passenden Dateien.","todo.settings.statusIcon":"Statussymbol","todo.settings.statusIconOf":"Symbol von {{p0}}","todo.settings.statusIconHint":"Klicke das gew\xE4hlte Symbol erneut an, um zum eigenen Symbol des Status zur\xFCckzukehren. F\xFCge SVG-Dateien zu {{p0}} hinzu; der Dateiname ist der Symbolname.","todo.settings.statusesDescAll":"Zu erledigen und Abgeschlossen stehen immer zuerst, behalten ihre eigenen Symbole und lassen sich nicht l\xF6schen. Jeder Status l\xE4sst sich umbenennen und umf\xE4rben; die \xFCbrigen erhalten zudem ein Symbol und lassen sich als erledigt markieren, umsortieren, ausblenden oder l\xF6schen.","todo.settings.colIcon":"Symbol","todo.settings.colDone":"Gilt als erledigt","todo.settings.statusRestore":"{{count}} gel\xF6schte Standardstatus wiederherstellen","reminders.timeBefore":"Zeit davor (hh:mm)","reminders.timeBeforeDesc":"Wie lange vor Beginn der Aufgabe, zum Beispiel 00:10 oder 01:30.","reminders.timeInvalid":"Stunden und Minuten wie 00:10 eingeben (Minuten 00\u201359, h\xF6chstens 168:00).","todo.calendar.clear":"L\xF6schen","todo.calendar.prev":"Vorheriger Monat","todo.calendar.next":"N\xE4chster Monat","todo.time.invalid":"Gib eine Uhrzeit wie 09:30 ein (00:00\u201323:59).","todo.info.todayTodo":"Heute offen","todo.info.todayCompleted":"Heute erledigt","todo.info.weekTodo":"Diese Woche offen","todo.info.weekCompleted":"Diese Woche erledigt","todo.info.allTodo":"Alle offen","todo.info.allCompleted":"Alle erledigt"};var Yd={"auto.006b85a57ddf":"No hay tareas coincidentes","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: editar una tarea","auto.047d10fd5b0e":"Opciones de todo","auto.090ec5f560fc":"Tareas","auto.0b2982c66cec":"Etiquetas de tarea","auto.112f17ac556e":"To-Do: enumerar tareas","auto.13816aca9c25":"Completa {{p0}}","auto.184c39d1837f":"Nuevo t\xEDtulo de tareas pendientes","auto.25097a85052b":"Abrir p\xE1gina To-Do","auto.2fb86192bd77":"To-Do: completar una tarea","auto.303631ca5c86":"Busca en los t\xEDtulos, notas y etiquetas de tus tareas.","auto.3218ad8a4865":"Enlaces de tareas","auto.33ce417454bf":"Cargando\u2026","auto.34656b383dd3":"To-Do: listar grupos","auto.34d1bc4daccf":"To-Do: agregar una tarea","auto.3fc72a0701ff":"To-Do: completar una tarea (hecha)","auto.496cd6a42238":"To-Do: tareas de b\xFAsqueda","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Editar","auto.584186da6898":"Adjuntos de tareas","auto.63e08dc2a4e3":"Ordenar tareas por","auto.664764d2200b":"To-Do: establecer el estado de la tarea","auto.67300d0fed7c":"Borrar b\xFAsqueda","auto.6bf5da9c080b":"Opciones","auto.70ceb3f38ee9":"Historial de estado","auto.77dfd2135f4d":"Cancelar","auto.798b29fa6c05":"To-Do: eliminar una tarea","auto.7be377261c61":"Buscar en todos\u2026 (#etiqueta)","auto.886cbff9d9df":"Prioridad","auto.88d8206d586a":"Hora de inicio","auto.a93c9cdad41c":"Nada aqu\xED, todo claro.","auto.b5868978587a":"Cargando tareas","auto.bae7d5be7082":"Estado","auto.c274dabfd0fe":"Nuevo todo","auto.c509ffcf5b5c":"Archivos de la tarea","auto.c5e8306a511f":"Todo t\xEDtulo","auto.c7f73bb54d92":"Configuraci\xF3n","auto.cd7800da7f4f":"Hora de finalizaci\xF3n","auto.cec28cbe4204":"No hay tareas","auto.cf3d0c76d559":"To-Do: reabrir una tarea","auto.d2f76731e1e1":"Vista c\xF3moda","auto.e0345e9d3092":"Buscar tareas","auto.e3719eae891e":"Vista compacta","auto.edbe7ad07b4a":"Abierto To-Do","auto.f6fdbe48dc54":"Eliminar","auto.f783bdbe8fa8":"Sesiones de enfoque","auto.f93fb4b1ab19":"Borrar el filtro de fecha del calendario","auto.fb3a16f382f8":"Copiar enlace de Valley","auto.fdebf6672120":"Hacer","guard.preset.ask-for-writes":"Preguntar antes de escribir","guard.preset.blocked":"Bloqueado","guard.preset.read-only":"Solo lectura","guard.preset.recommended":"Recomendado","manifest.description":"Gestor de tareas estructurado: navegador en la barra lateral izquierda, lista por archivo a la derecha, un temporizador de enfoque en el pie y una p\xE1gina completa con secciones plegables de Vencidas/Hoy/Pr\xF3ximas.","manifest.name":"Tareas","markdown.examples.allTasks":"Todas las tareas","markdown.examples.completedTasks":"Tareas completadas","markdown.examples.dayTasks":"Tareas de hoy","markdown.examples.filtered":"Resultados filtrados","markdown.examples.openTasks":"Tareas abiertas","markdown.examples.overdueTasks":"Tareas vencidas","markdown.examples.weekTasks":"Tareas de esta semana","plugin.todo.notification.reminder":"Recordatorio de tarea","plugin.todo.notification.reminderDesc":"Anuncia una tarea con fecha a su hora de recordatorio, incluso con todas las ventanas cerradas.","todo.action.edit":"Editar","todo.action.openAttachment":"Adjunto","todo.action.openInTodo":"Abrir en To-Do","todo.action.openLink":"Enlace","todo.action.openNote":"Abrir nota","todo.action.showOnMap":"Mostrar en el mapa","todo.activity":"Actividad","todo.addAttachment":"A\xF1adir adjunto","todo.attachmentTasks.noFile":"Abre un adjunto para ver sus tareas","todo.attachmentTasks.none":"No hay tareas para este adjunto","todo.attachmentTasks.title":"Tareas","todo.attachments":"Adjuntos","todo.breakdown.daily":"Diario","todo.breakdown.monthly":"Mensual","todo.breakdown.noDate":"Sin fecha","todo.breakdown.weekLabel":"Semana {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Semanal","todo.chip.all":"Todas","todo.chip.noGroup":"Sin grupo","todo.command.editFields":"To-Do: Editar campos de la tarea","todo.command.get":"To-Do: Obtener tarea","todo.command.openTask":"To-Do: Abrir tarea","todo.completed.hide":"Ocultar completadas","todo.completed.show":"Mostrar completadas","todo.completed.showAll":"Mostrar todo","todo.delete.message":"se eliminar\xE1 permanentemente.","todo.delete.title":"\xBFEliminar tarea?","todo.details":"Detalles","todo.due.overdue":"Atrasado","todo.due.today":"Hoy","todo.due.tomorrow":"Ma\xF1ana","todo.due.yesterday":"Ayer","todo.edit.done":"Listo","todo.edit.group":"Grupo","todo.edit.notes":"Notas","todo.edit.schedule":"Programaci\xF3n","todo.edit.tags":"Etiquetas","todo.edit.title":"Editar tarea","todo.error.saveDraft":"No se pudo guardar la tarea. Tu borrador se conserva; ed\xEDtalo para reintentar.","todo.fab.newTodo":"Nueva tarea","todo.fab.newTodoIn":"Nueva tarea en\u2026","todo.fewerFiles":"Mostrar menos","todo.field.actualMinutes":"Minutos registrados","todo.field.attachments":"Adjuntos","todo.field.color":"Color","todo.field.completed":"Completado","todo.field.createdAt":"Creado","todo.field.dueDate":"Fecha de vencimiento","todo.field.endTime":"Hora de finalizaci\xF3n","todo.field.estimatedMinutes":"Minutos estimados","todo.field.filePath":"Archivo vinculado","todo.field.flagged":"Marcado","todo.field.group":"Grupo","todo.field.history":"Historial de tiempo","todo.field.id":"ID de tarea","todo.field.location":"Ubicaci\xF3n","todo.field.note":"Notas","todo.field.priority":"Prioridad","todo.field.remindAt":"Recordatorio","todo.field.reminderFiredAt":"Recordatorio entregado","todo.field.startTime":"Hora de inicio","todo.field.status":"Estado","todo.field.statusHistory":"Historial de estado","todo.field.tags":"Etiquetas","todo.field.title":"T\xEDtulo","todo.field.updatedAt":"Actualizado","todo.field.urls":"Enlaces","todo.fileKind.audio":"Audio","todo.fileKind.code":"Archivo de c\xF3digo","todo.fileKind.csv":"Hoja de c\xE1lculo","todo.fileKind.file":"Archivo","todo.fileKind.generic":"Archivo {{p0}}","todo.fileKind.image":"Imagen","todo.fileKind.json":"Archivo JSON","todo.fileKind.model3d":"Modelo 3D","todo.fileKind.pdf":"Documento PDF","todo.fileKind.powerpoint":"Presentaci\xF3n","todo.fileKind.text":"Documento de texto","todo.fileKind.video":"V\xEDdeo","todo.fileKind.word":"Documento de Word","todo.filters":"Filtros","todo.filters.completed":"Completado","todo.filters.sort":"Ordenar por","todo.filters.statusAndCompleted":"Estados y completadas","todo.filters.statuses":"Estados","todo.flag":"Marcar","todo.flagged":"Marcada","todo.group.add":"A\xF1adir","todo.group.cancel":"Cancelar","todo.group.deselectAll":"Deseleccionar todo","todo.group.manage":"Gestionar grupos","todo.group.selectAll":"Seleccionar todo","todo.linkedFile":"Archivo vinculado","todo.location":"Ubicaci\xF3n","todo.locationPlaceholder":"Buscar un lugar\u2026","todo.menu.moveGroup":"Mover al grupo","todo.menu.reschedule":"Reprogramar","todo.moreFiles":"+{{p0}} m\xE1s","todo.newTodoIn":"Nueva tarea en {{p0}}","todo.openInCalendar":"Ver {{p0}} en el calendario","todo.openLocation":"Ver en el mapa","todo.openLocationOf":"Ver {{p0}} en el mapa","todo.priority.high":"Alta","todo.priority.highMeta":"Prioridad alta","todo.priority.low":"Baja","todo.priority.lowMeta":"Prioridad baja","todo.priority.medium":"Media","todo.priority.mediumMeta":"Prioridad media","todo.priority.none":"Ninguna","todo.priority.noneMeta":"Sin prioridad","todo.reminderSet":"Recordatorio activado","todo.removeAttachment":"Quitar adjunto","todo.removeAttachmentOf":"Quitar {{p0}}","todo.removeLocation":"Eliminar ubicaci\xF3n","todo.removeUrl":"Eliminar enlace","todo.removeUrlOf":"Eliminar el enlace {{p0}}","todo.section.someday":"Alg\xFAn d\xEDa","todo.section.upcoming":"Pr\xF3ximamente","todo.settings.dateBreakdown":"Desglose por fecha","todo.settings.dateBreakdownDesc":"Organiza los paneles estrechos por mes, semana natural o d\xEDa.","todo.settings.display":"Vista","todo.settings.smartListReorder":"Reordenar lista inteligente","todo.settings.smartLists":"Listas inteligentes","todo.settings.smartListsDesc":"Arrastra para reordenar, elige un color y desactiva las listas que no uses.","todo.settings.statusAdd":"A\xF1adir estado","todo.settings.statusColor":"Color de {{p0}}","todo.settings.statusLocked":"Estado bloqueado","todo.settings.statusReorder":"Reordenar estado","todo.settings.statusShow":"Mostrar {{p0}}","todo.settings.statuses":"Estados","todo.settings.statusesDesc":"Por hacer y Completado siempre est\xE1n disponibles. Arrastra los dem\xE1s para reordenarlos o desact\xEDvalos.","todo.sort.created":"Creado","todo.sort.due":"Pendiente","todo.sort.name":"Nombre","todo.sort.priority":"Prioridad","todo.sort.updated":"Actualizado","todo.status.canceled":"Cancelado","todo.status.completed":"Completado","todo.status.deferred":"Aplazado","todo.status.delegated":"Delegado","todo.status.inProgress":"En curso","todo.status.onHold":"En pausa","todo.status.todo":"Por hacer","todo.status.waiting":"En espera","todo.swipe.date":"Fecha y hora","todo.swipe.delete":"Eliminar","todo.swipe.flag":"Marcar","todo.swipe.thisWeekend":"Este fin de semana","todo.swipe.tomorrow":"Ma\xF1ana","todo.swipe.unflag":"Quitar marca","todo.undo.add":"Agregar todo \u201C{{title}}\u201D","todo.undo.delete":"Eliminar todo \u201C{{title}}\u201D","todo.undo.edit":'Editar todo "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Todo","todo.view.completed":"Completado","todo.view.flagged":"Marcado","todo.view.groups":"Grupos","todo.view.myLists":"Grupos","todo.view.expandGroup":"Mostrar los subgrupos de {{p0}}","todo.view.collapseGroup":"Ocultar los subgrupos de {{p0}}","todo.view.expandAllGroups":"Desplegar todos los grupos","todo.view.collapseAllGroups":"Plegar todos los grupos","todo.view.scheduled":"Programado","todo.view.selectedGroups":"{{count}} grupos","todo.view.today":"Hoy","todo.compose.addTags":"A\xF1adir etiquetas","todo.compose.addDate":"A\xF1adir fecha","todo.compose.time":"Hora","todo.compose.removeTag":"Eliminar etiqueta {{tag}}","workflow.delivery.title":"Evento de flujo no disponible","workflow.delivery.message":"Los cambios se guardaron y se pueden deshacer. No se pudo entregar un disparador del flujo, por lo que es posible que las acciones autom\xE1ticas no se hayan ejecutado.","workflow.delivery.close":"Cerrar","reminders.title":"Recordatorios","reminders.default":"Predeterminado del plugin","reminders.off":"Desactivado","reminders.custom":"Personalizado","reminders.time":"Hora del recordatorio","notification.open":"Abrir","notification.complete":"Marcar completado","notification.snooze":"Posponer","notification.minutes":"{{count}} minutos","notification.reminder":"Recordatorio de evento","bookmark.view":"Tareas y filtros","bookmark.item":"Elemento seleccionado","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"T\xEDtulo","todo.table.status":"Estado","todo.table.priority":"Prioridad","todo.table.due":"Vence","todo.table.group":"Grupo","todo.table.tags":"Etiquetas","todo.table.note":"Notas","todo.table.location":"Ubicaci\xF3n","todo.table.taskCount":"{{count}} tareas","todo.table.oneTask":"1 tarea","todo.table.toggleColumns":"Mostrar u ocultar columnas","todo.table.filterPlaceholder":"Filtrar tareas\u2026","todo.table.selectedCount":"{{count}} seleccionadas","todo.table.complete":"Completar","todo.table.deleteTitle":"\xBFEliminar {{count}} tareas?","todo.table.deleteMessage":"Las {{count}} tareas seleccionadas se eliminar\xE1n de forma permanente.","todo.table.rowsPerPage":"Filas por p\xE1gina","todo.table.page":"P\xE1gina {{page}} de {{pages}}","todo.table.firstPage":"Ir a la primera p\xE1gina","todo.table.previousPage":"Ir a la p\xE1gina anterior","todo.table.nextPage":"Ir a la p\xE1gina siguiente","todo.table.lastPage":"Ir a la \xFAltima p\xE1gina","todo.table.empty":"Sin resultados.","todo.settings.section.lists":"Listas y estados","todo.settings.section.groups":"Grupos","todo.settings.smartListColor":"Color de {{p0}}","todo.settings.smartListShow":"Mostrar {{p0}}","todo.settings.statusText":"Color del texto de {{p0}}","todo.settings.textAuto":"Autom\xE1tico","todo.settings.textWhite":"Blanco","todo.settings.textBlack":"Negro","todo.settings.colStatus":"Estado","todo.settings.colColor":"Color","todo.settings.colText":"Texto","todo.settings.colShow":"Mostrar","reminders.defaultTitle":"Recordatorio predeterminado","reminders.defaultDesc":"Se usa en tareas con hora salvo que la tarea defina el suyo.","todo.filters.title":"Filtrar","todo.view.week":"Esta semana","todo.settings.colList":"Lista","todo.settings.statusStrike":"Tachar {{p0}}","todo.settings.colStrike":"Tachado","todo.table.reorderColumn":"Reordenar {{p0}}","todo.filters.quickAll":"Mostrar todos los estados","todo.filters.quickOpen":"Mostrar solo estados sin terminar","todo.filters.quickDone":"Mostrar solo Completado y Cancelado","todo.table.resizeColumn":"Cambiar el ancho de {{p0}} (doble clic para restablecer)","todo.table.newRow":"Nueva tarea: escribe o pega varias l\xEDneas","todo.table.completedCount":"{{count}} completadas","todo.table.editTitle":"Editar el t\xEDtulo de {{p0}}","todo.table.editCell":"Editar {{p0}}","todo.compose.addPlace":"A\xF1adir lugar","todo.settings.statusNew":"Nombre del nuevo estado","todo.settings.statusNewPlaceholder":"Nuevo estado","todo.settings.statusName":"Nombre del estado","todo.settings.statusDone":"{{p0}} cuenta como completada","todo.settings.statusDelete":"Eliminar {{p0}}","todo.settings.statusDeleteTitle":"\xBFEliminar el estado \xAB{{p0}}\xBB?","todo.settings.statusDeleteMoves":"{{count}} tareas con este estado pasar\xE1n a {{p0}}.","todo.settings.statusDeleteUnused":"Ninguna tarea usa este estado.","todo.settings.localGroups":"Grupos solo de Tareas","todo.settings.localGroupsDesc":"Privados de Tareas: cr\xE9alos, ren\xF3mbralos, color\xE9alos y reord\xE9nalos aqu\xED.","todo.settings.useSharedGroups":"Grupos compartidos","todo.settings.useSharedGroupsDesc":"Grupos que tambi\xE9n usan Calendario, Contactos y Espacios de trabajo. Un cambio aqu\xED los cambia en todas partes.","todo.settings.useLocalGroups":"Grupos solo de Tareas","todo.settings.useLocalGroupsDesc":"Grupos que solo existen en Tareas. Ning\xFAn otro plugin los ve.","todo.settings.localGroupName":"Nombre","todo.settings.localGroupColor":"Color de {{p0}}","todo.settings.localGroupDelete":"Eliminar {{p0}}","todo.settings.localGroupRemove":"Quitar grupo","todo.settings.localGroupRemoveBlocked":"Todav\xEDa lo usan {{count}} tareas: mu\xE9velas a otro grupo para eliminarlo","todo.settings.localGroupNew":"Nuevo grupo de To-Do","todo.settings.localGroupAdd":"A\xF1adir","todo.settings.localGroupsSetting":"Grupos individuales de To-Do","todo.settings.collapsedGroupsSetting":"Grupos plegados de la barra lateral","todo.settings.groupOrderSetting":"Orden de los grupos de la barra lateral","todo.settings.localGroupUsage":"{{count}} tareas usan este grupo","todo.settings.localGroupNewColor":"Color del nuevo grupo","todo.settings.localGroupDuplicate":"Ya existe un grupo con ese nombre.","todo.settings.localSubgroupAdd":"A\xF1adir subgrupo","todo.settings.localSubgroupAddTo":"A\xF1adir subgrupo a {{p0}}","todo.settings.localSubgroupNew":"Nuevo subgrupo","todo.settings.localGroupRemoveSubgroups":"A\xFAn tiene subgrupos \u2014 elim\xEDnalos o mu\xE9velos primero","todo.location.searching":"Buscando\u2026","todo.location.noResults":"No se encontraron lugares. Pulsa Intro para conservar el texto.","todo.location.failed":"La b\xFAsqueda de lugares no est\xE1 disponible. Pulsa Intro para conservar el texto.","todo.sheet.notesPlaceholder":"Notas","todo.sheet.date":"Fecha","todo.sheet.place":"Lugar","todo.sheet.attachment":"Adjunto","todo.sheet.link":"Enlace","todo.sheet.unlinkFile":"Desvincular archivo","todo.file.searchAttachment":"Buscar un archivo para adjuntar","todo.file.searchLinked":"Buscar el archivo de esta tarea","todo.file.noResults":"No hay archivos coincidentes.","todo.settings.statusIcon":"Icono del estado","todo.settings.statusIconOf":"Icono de {{p0}}","todo.settings.statusIconHint":"Vuelve a hacer clic en el icono elegido para recuperar el icono propio del estado. A\xF1ade archivos SVG a {{p0}}; el nombre del archivo es el nombre del icono.","todo.settings.statusesDescAll":"Por hacer y Completado van siempre primero, conservan sus propios iconos y no se pueden eliminar. Todos los estados se pueden renombrar y cambiar de color; los dem\xE1s tambi\xE9n pueden recibir un icono, marcarse como hechos, reordenarse, desactivarse o eliminarse.","todo.settings.colIcon":"Icono","todo.settings.colDone":"Cuenta como completada","todo.settings.statusRestore":"Restaurar {{count}} estados integrados eliminados","reminders.timeBefore":"Tiempo antes (hh:mm)","reminders.timeBeforeDesc":"Cu\xE1nto antes de que empiece la tarea, por ejemplo 00:10 o 01:30.","reminders.timeInvalid":"Escribe horas y minutos como 00:10 (minutos 00\u201359, como m\xE1ximo 168:00).","todo.calendar.clear":"Borrar","todo.calendar.prev":"Mes anterior","todo.calendar.next":"Mes siguiente","todo.time.invalid":"Introduce una hora como 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Hoy por hacer","todo.info.todayCompleted":"Hoy completadas","todo.info.weekTodo":"Esta semana por hacer","todo.info.weekCompleted":"Esta semana completadas","todo.info.allTodo":"Todas por hacer","todo.info.allCompleted":"Todas completadas"};var Xd={"auto.006b85a57ddf":"Aucune t\xE2che correspondante","auto.01e635f27ec2":"Desc.","auto.0379f3c75faa":"To-Do: Modifier une t\xE2che","auto.047d10fd5b0e":"Options de t\xE2ches","auto.090ec5f560fc":"T\xE2ches","auto.0b2982c66cec":"Balises de t\xE2che","auto.112f17ac556e":"To-Do: lister les t\xE2ches","auto.13816aca9c25":"Termin\xE9 {{p0}}","auto.184c39d1837f":"Nouveau titre de t\xE2che","auto.25097a85052b":"Ouvrir la page To-Do","auto.2fb86192bd77":"To-Do: terminer une t\xE2che","auto.303631ca5c86":"Recherche dans les titres, notes et \xE9tiquettes de vos t\xE2ches.","auto.3218ad8a4865":"Liens vers les t\xE2ches","auto.33ce417454bf":"Chargement\u2026","auto.34656b383dd3":"To-Do: lister des groupes","auto.34d1bc4daccf":"To-Do: Ajouter une t\xE2che","auto.3fc72a0701ff":"To-Do: terminer une t\xE2che (termin\xE9e)","auto.496cd6a42238":"To-Do: T\xE2ches de recherche","auto.4fee0a06b6e4":"Asc.","auto.5301648dcf6b":"Modifier","auto.584186da6898":"Pi\xE8ces jointes aux t\xE2ches","auto.63e08dc2a4e3":"Trier les t\xE2ches par","auto.664764d2200b":"To-Do: d\xE9finir le statut de la t\xE2che","auto.67300d0fed7c":"Effacer la recherche","auto.6bf5da9c080b":"Possibilit\xE9s","auto.70ceb3f38ee9":"Historique du statut","auto.77dfd2135f4d":"Annuler","auto.798b29fa6c05":"To-Do: Supprimer une t\xE2che","auto.7be377261c61":"Rechercher des t\xE2ches\u2026 (#tag)","auto.886cbff9d9df":"Priorit\xE9","auto.88d8206d586a":"Heure de d\xE9but","auto.a93c9cdad41c":"Rien ici \u2013 tout est clair.","auto.b5868978587a":"Chargement des t\xE2ches","auto.bae7d5be7082":"Statut","auto.c274dabfd0fe":"Nouvelle t\xE2che","auto.c509ffcf5b5c":"Fichiers de la t\xE2che","auto.c5e8306a511f":"Titre de la t\xE2che","auto.c7f73bb54d92":"Param\xE8tres","auto.cd7800da7f4f":"Heure de fin","auto.cec28cbe4204":"Aucune t\xE2che","auto.cf3d0c76d559":"To-Do: rouvrir une t\xE2che","auto.d2f76731e1e1":"Vue confortable","auto.e0345e9d3092":"Rechercher des t\xE2ches","auto.e3719eae891e":"Vue compacte","auto.edbe7ad07b4a":"Ouvrir To-Do","auto.f6fdbe48dc54":"Supprimer","auto.f783bdbe8fa8":"S\xE9ances de concentration","auto.f93fb4b1ab19":"Effacer le filtre de date du calendrier","auto.fb3a16f382f8":"Copier le lien Valley","auto.fdebf6672120":"\xC0 faire","guard.preset.ask-for-writes":"Demander avant d\u2019\xE9crire","guard.preset.blocked":"Bloqu\xE9","guard.preset.read-only":"Lecture seule","guard.preset.recommended":"Recommand\xE9","manifest.description":"Gestionnaire de t\xE2ches structur\xE9 : navigateur dans la barre lat\xE9rale gauche, liste par fichier \xE0 droite, minuteur de concentration en pied de page et une page compl\xE8te avec des sections repliables En retard/Aujourd\u2019hui/\xC0 venir.","manifest.name":"T\xE2ches","markdown.examples.allTasks":"Toutes les t\xE2ches","markdown.examples.completedTasks":"T\xE2ches termin\xE9es","markdown.examples.dayTasks":"T\xE2ches du jour","markdown.examples.filtered":"R\xE9sultats filtr\xE9s","markdown.examples.openTasks":"T\xE2ches ouvertes","markdown.examples.overdueTasks":"T\xE2ches en retard","markdown.examples.weekTasks":"T\xE2ches de cette semaine","plugin.todo.notification.reminder":"Rappel de t\xE2che","plugin.todo.notification.reminderDesc":"Annonce une t\xE2che dat\xE9e \xE0 l\u2019heure de son rappel, m\xEAme toutes fen\xEAtres ferm\xE9es.","todo.action.edit":"Modifier","todo.action.openAttachment":"Pi\xE8ce jointe","todo.action.openInTodo":"Ouvrir dans To-Do","todo.action.openLink":"Lien","todo.action.openNote":"Ouvrir la note","todo.action.showOnMap":"Afficher sur la carte","todo.activity":"Activit\xE9","todo.addAttachment":"Ajouter une pi\xE8ce jointe","todo.attachmentTasks.noFile":"Ouvrez une pi\xE8ce jointe pour voir ses t\xE2ches","todo.attachmentTasks.none":"Aucune t\xE2che pour cette pi\xE8ce jointe","todo.attachmentTasks.title":"T\xE2ches","todo.attachments":"Pi\xE8ces jointes","todo.breakdown.daily":"Quotidien","todo.breakdown.monthly":"Mensuel","todo.breakdown.noDate":"Sans date","todo.breakdown.weekLabel":"Semaine {{count}} \xB7 {{p0}}","todo.breakdown.weekly":"Hebdomadaire","todo.chip.all":"Toutes","todo.chip.noGroup":"Sans groupe","todo.command.editFields":"To-Do: Modifier les champs d\u2019une t\xE2che","todo.command.get":"To-Do: Lire une t\xE2che","todo.command.openTask":"To-Do: Ouvrir une t\xE2che","todo.completed.hide":"Masquer les termin\xE9es","todo.completed.show":"Afficher les termin\xE9es","todo.completed.showAll":"Tout afficher","todo.delete.message":"sera d\xE9finitivement supprim\xE9e.","todo.delete.title":"Supprimer la t\xE2che ?","todo.details":"D\xE9tails","todo.due.overdue":"En retard","todo.due.today":"Aujourd'hui","todo.due.tomorrow":"Demain","todo.due.yesterday":"Hier","todo.edit.done":"Termin\xE9","todo.edit.group":"Groupe","todo.edit.notes":"Notes","todo.edit.schedule":"Planification","todo.edit.tags":"\xC9tiquettes","todo.edit.title":"Modifier la t\xE2che","todo.error.saveDraft":"Impossible d\u2019enregistrer la t\xE2che. Votre brouillon est conserv\xE9 ; modifiez-le pour r\xE9essayer.","todo.fab.newTodo":"Nouvelle t\xE2che","todo.fab.newTodoIn":"Nouvelle t\xE2che dans\u2026","todo.fewerFiles":"Afficher moins","todo.field.actualMinutes":"Minutes suivies","todo.field.attachments":"Pi\xE8ces jointes","todo.field.color":"Couleur","todo.field.completed":"Termin\xE9","todo.field.createdAt":"Cr\xE9\xE9","todo.field.dueDate":"Date d'\xE9ch\xE9ance","todo.field.endTime":"Heure de fin","todo.field.estimatedMinutes":"Minutes estim\xE9es","todo.field.filePath":"Fichier li\xE9","todo.field.flagged":"Marqu\xE9","todo.field.group":"Groupe","todo.field.history":"Historique du temps","todo.field.id":"Identifiant de la t\xE2che","todo.field.location":"Lieu","todo.field.note":"Notes","todo.field.priority":"Priorit\xE9","todo.field.remindAt":"Rappel","todo.field.reminderFiredAt":"Rappel envoy\xE9","todo.field.startTime":"Heure de d\xE9but","todo.field.status":"Statut","todo.field.statusHistory":"Historique du statut","todo.field.tags":"\xC9tiquettes","todo.field.title":"Titre","todo.field.updatedAt":"Mis \xE0 jour","todo.field.urls":"Liens","todo.fileKind.audio":"Audio","todo.fileKind.code":"Fichier source","todo.fileKind.csv":"Feuille de calcul","todo.fileKind.file":"Fichier","todo.fileKind.generic":"Fichier {{p0}}","todo.fileKind.image":"Image","todo.fileKind.json":"Fichier JSON","todo.fileKind.model3d":"Mod\xE8le 3D","todo.fileKind.pdf":"Document PDF","todo.fileKind.powerpoint":"Pr\xE9sentation","todo.fileKind.text":"Document texte","todo.fileKind.video":"Vid\xE9o","todo.fileKind.word":"Document Word","todo.filters":"Filtres","todo.filters.completed":"Accompli","todo.filters.sort":"Trier par","todo.filters.statusAndCompleted":"Statuts et termin\xE9es","todo.filters.statuses":"Statuts","todo.flag":"Marquer","todo.flagged":"Marqu\xE9e","todo.group.add":"Ajouter","todo.group.cancel":"Annuler","todo.group.deselectAll":"Tout d\xE9s\xE9lectionner","todo.group.manage":"G\xE9rer les groupes","todo.group.selectAll":"Tout s\xE9lectionner","todo.linkedFile":"Fichier li\xE9","todo.location":"Lieu","todo.locationPlaceholder":"Rechercher un lieu\u2026","todo.menu.moveGroup":"D\xE9placer vers le groupe","todo.menu.reschedule":"Replanifier","todo.moreFiles":"+{{p0}} de plus","todo.newTodoIn":"Nouvelle t\xE2che dans {{p0}}","todo.openInCalendar":"Afficher {{p0}} dans le calendrier","todo.openLocation":"Afficher sur la carte","todo.openLocationOf":"Afficher {{p0}} sur la carte","todo.priority.high":"\xC9lev\xE9e","todo.priority.highMeta":"Priorit\xE9 \xE9lev\xE9e","todo.priority.low":"Faible","todo.priority.lowMeta":"Priorit\xE9 faible","todo.priority.medium":"Moyenne","todo.priority.mediumMeta":"Priorit\xE9 moyenne","todo.priority.none":"Aucune","todo.priority.noneMeta":"Sans priorit\xE9","todo.reminderSet":"Rappel d\xE9fini","todo.removeAttachment":"Retirer la pi\xE8ce jointe","todo.removeAttachmentOf":"Retirer {{p0}}","todo.removeLocation":"Supprimer le lieu","todo.removeUrl":"Supprimer le lien","todo.removeUrlOf":"Supprimer le lien {{p0}}","todo.section.someday":"Un jour","todo.section.upcoming":"\xC0 venir","todo.settings.dateBreakdown":"R\xE9partition par date","todo.settings.dateBreakdownDesc":"Organise les panneaux \xE9troits par mois, semaine civile ou jour.","todo.settings.display":"Affichage","todo.settings.smartListReorder":"R\xE9ordonner la liste intelligente","todo.settings.smartLists":"Listes intelligentes","todo.settings.smartListsDesc":"Faites glisser pour r\xE9ordonner, choisissez une couleur et d\xE9sactivez les listes inutilis\xE9es.","todo.settings.statusAdd":"Ajouter un statut","todo.settings.statusColor":"Couleur de {{p0}}","todo.settings.statusLocked":"Statut verrouill\xE9","todo.settings.statusReorder":"R\xE9ordonner le statut","todo.settings.statusShow":"Afficher {{p0}}","todo.settings.statuses":"Statuts","todo.settings.statusesDesc":"\xC0 faire et Accompli sont toujours disponibles. Faites glisser les autres pour les r\xE9ordonner ou d\xE9sactivez-les.","todo.sort.created":"Cr\xE9\xE9","todo.sort.due":"Exigible","todo.sort.name":"Nom","todo.sort.priority":"Priorit\xE9","todo.sort.updated":"Mis \xE0 jour","todo.status.canceled":"Annul\xE9","todo.status.completed":"Accompli","todo.status.deferred":"Report\xE9","todo.status.delegated":"D\xE9l\xE9gu\xE9","todo.status.inProgress":"En cours","todo.status.onHold":"En pause","todo.status.todo":"\xC0 faire","todo.status.waiting":"En attente","todo.swipe.date":"Date et heure","todo.swipe.delete":"Supprimer","todo.swipe.flag":"Marquer","todo.swipe.thisWeekend":"Ce week-end","todo.swipe.tomorrow":"Demain","todo.swipe.unflag":"Retirer la marque","todo.undo.add":'Ajouter la t\xE2che "{{title}}"',"todo.undo.delete":"Supprimer la t\xE2che \xAB {{title}} \xBB","todo.undo.edit":'Modifier la t\xE2che "{{title}}"',"todo.url":"URL","todo.urlPlaceholder":"https://\u2026","todo.view.all":"Tout","todo.view.completed":"Termin\xE9","todo.view.flagged":"Marqu\xE9","todo.view.groups":"Groupes","todo.view.myLists":"Groupes","todo.view.expandGroup":"Afficher les sous-groupes de {{p0}}","todo.view.collapseGroup":"Masquer les sous-groupes de {{p0}}","todo.view.expandAllGroups":"D\xE9plier tous les groupes","todo.view.collapseAllGroups":"Replier tous les groupes","todo.view.scheduled":"Planifi\xE9","todo.view.selectedGroups":"{{count}} groupes","todo.view.today":"Aujourd'hui","todo.compose.addTags":"Ajouter des tags","todo.compose.addDate":"Ajouter une date","todo.compose.time":"Heure","todo.compose.removeTag":"Supprimer le tag {{tag}}","workflow.delivery.title":"\xC9v\xE9nement du workflow indisponible","workflow.delivery.message":"Vos modifications ont \xE9t\xE9 enregistr\xE9es et peuvent \xEAtre annul\xE9es. Un d\xE9clencheur du workflow n\u2019a pas pu \xEAtre transmis ; les actions automatiques peuvent ne pas avoir \xE9t\xE9 ex\xE9cut\xE9es.","workflow.delivery.close":"Fermer","reminders.title":"Rappels","reminders.default":"Par d\xE9faut du plugin","reminders.off":"D\xE9sactiv\xE9","reminders.custom":"Personnalis\xE9","reminders.time":"Heure du rappel","notification.open":"Ouvrir","notification.complete":"Marquer termin\xE9","notification.snooze":"Reporter","notification.minutes":"{{count}} minutes","notification.reminder":"Rappel d\u2019\xE9v\xE9nement","bookmark.view":"T\xE2ches et filtres","bookmark.item":"\xC9l\xE9ment s\xE9lectionn\xE9","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"Titre","todo.table.status":"Statut","todo.table.priority":"Priorit\xE9","todo.table.due":"\xC9ch\xE9ance","todo.table.group":"Groupe","todo.table.tags":"\xC9tiquettes","todo.table.note":"Notes","todo.table.location":"Lieu","todo.table.taskCount":"{{count}} t\xE2ches","todo.table.oneTask":"1 t\xE2che","todo.table.toggleColumns":"Afficher ou masquer les colonnes","todo.table.filterPlaceholder":"Filtrer les t\xE2ches\u2026","todo.table.selectedCount":"{{count}} s\xE9lectionn\xE9es","todo.table.complete":"Terminer","todo.table.deleteTitle":"Supprimer {{count}} t\xE2ches ?","todo.table.deleteMessage":"Les {{count}} t\xE2ches s\xE9lectionn\xE9es seront d\xE9finitivement supprim\xE9es.","todo.table.rowsPerPage":"Lignes par page","todo.table.page":"Page {{page}} sur {{pages}}","todo.table.firstPage":"Aller \xE0 la premi\xE8re page","todo.table.previousPage":"Aller \xE0 la page pr\xE9c\xE9dente","todo.table.nextPage":"Aller \xE0 la page suivante","todo.table.lastPage":"Aller \xE0 la derni\xE8re page","todo.table.empty":"Aucun r\xE9sultat.","todo.settings.section.lists":"Listes et statuts","todo.settings.section.groups":"Groupes","todo.settings.smartListColor":"Couleur de {{p0}}","todo.settings.smartListShow":"Afficher {{p0}}","todo.settings.statusText":"Couleur du texte de {{p0}}","todo.settings.textAuto":"Auto","todo.settings.textWhite":"Blanc","todo.settings.textBlack":"Noir","todo.settings.colStatus":"Statut","todo.settings.colColor":"Couleur","todo.settings.colText":"Texte","todo.settings.colShow":"Afficher","reminders.defaultTitle":"Rappel par d\xE9faut","reminders.defaultDesc":"Utilis\xE9 pour les t\xE2ches avec une heure, sauf si la t\xE2che d\xE9finit le sien.","todo.filters.title":"Filtrer","todo.view.week":"Cette semaine","todo.settings.colList":"Liste","todo.settings.statusStrike":"Barrer {{p0}}","todo.settings.colStrike":"Barr\xE9","todo.table.reorderColumn":"R\xE9ordonner {{p0}}","todo.filters.quickAll":"Afficher tous les statuts","todo.filters.quickOpen":"Afficher uniquement les statuts non termin\xE9s","todo.filters.quickDone":"Afficher uniquement Accompli et Annul\xE9","todo.table.resizeColumn":"Redimensionner {{p0}} (double-clic pour r\xE9initialiser)","todo.table.newRow":"Nouvelle t\xE2che \u2014 saisissez ou collez plusieurs lignes","todo.table.completedCount":"{{count}} accomplies","todo.table.editTitle":"Modifier le titre de {{p0}}","todo.table.editCell":"Modifier {{p0}}","todo.compose.addPlace":"Ajouter un lieu","todo.settings.statusNew":"Nom du nouveau statut","todo.settings.statusNewPlaceholder":"Nouveau statut","todo.settings.statusName":"Nom du statut","todo.settings.statusDone":"{{p0}} compte comme termin\xE9","todo.settings.statusDelete":"Supprimer {{p0}}","todo.settings.statusDeleteTitle":"Supprimer le statut \xAB {{p0}} \xBB ?","todo.settings.statusDeleteMoves":"{{count}} t\xE2ches avec ce statut passeront \xE0 {{p0}}.","todo.settings.statusDeleteUnused":"Aucune t\xE2che n\u2019utilise ce statut.","todo.settings.localGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.localGroupsDesc":"R\xE9serv\xE9s \xE0 T\xE2ches : cr\xE9ez-les, renommez-les, colorez-les et r\xE9organisez-les ici.","todo.settings.useSharedGroups":"Groupes partag\xE9s","todo.settings.useSharedGroupsDesc":"Groupes qu\u2019utilisent aussi Calendrier, Contacts et Espaces de travail. Une modification ici les modifie partout.","todo.settings.useLocalGroups":"Groupes propres \xE0 T\xE2ches","todo.settings.useLocalGroupsDesc":"Groupes qui n\u2019existent que dans T\xE2ches. Aucun autre plugin ne les voit.","todo.settings.localGroupName":"Nom","todo.settings.localGroupColor":"Couleur de {{p0}}","todo.settings.localGroupDelete":"Supprimer {{p0}}","todo.settings.localGroupRemove":"Supprimer le groupe","todo.settings.localGroupRemoveBlocked":"Encore utilis\xE9 par {{count}} t\xE2ches \u2014 d\xE9placez-les dans un autre groupe pour le supprimer","todo.settings.localGroupNew":"Nouveau groupe To-Do","todo.settings.localGroupAdd":"Ajouter","todo.settings.localGroupsSetting":"Groupes To-Do individuels","todo.settings.collapsedGroupsSetting":"Groupes repli\xE9s de la barre lat\xE9rale","todo.settings.groupOrderSetting":"Ordre des groupes de la barre lat\xE9rale","todo.settings.localGroupUsage":"{{count}} t\xE2ches utilisent ce groupe","todo.settings.localGroupNewColor":"Couleur du nouveau groupe","todo.settings.localGroupDuplicate":"Un groupe portant ce nom existe d\xE9j\xE0.","todo.settings.localSubgroupAdd":"Ajouter un sous-groupe","todo.settings.localSubgroupAddTo":"Ajouter un sous-groupe \xE0 {{p0}}","todo.settings.localSubgroupNew":"Nouveau sous-groupe","todo.settings.localGroupRemoveSubgroups":"Contient encore des sous-groupes \u2014 supprimez-les ou d\xE9placez-les d\u2019abord","todo.location.searching":"Recherche\u2026","todo.location.noResults":"Aucun lieu trouv\xE9. Appuyez sur Entr\xE9e pour garder le texte.","todo.location.failed":"Recherche de lieux indisponible. Appuyez sur Entr\xE9e pour garder le texte.","todo.sheet.notesPlaceholder":"Notes","todo.sheet.date":"Date","todo.sheet.place":"Lieu","todo.sheet.attachment":"Pi\xE8ce jointe","todo.sheet.link":"Lien","todo.sheet.unlinkFile":"Dissocier le fichier","todo.file.searchAttachment":"Rechercher un fichier \xE0 joindre","todo.file.searchLinked":"Rechercher le fichier li\xE9 \xE0 cette t\xE2che","todo.file.noResults":"Aucun fichier correspondant.","todo.settings.statusIcon":"Ic\xF4ne du statut","todo.settings.statusIconOf":"Ic\xF4ne de {{p0}}","todo.settings.statusIconHint":"Cliquez \xE0 nouveau sur l\u2019ic\xF4ne choisie pour revenir \xE0 l\u2019ic\xF4ne propre au statut. Ajoutez des fichiers SVG dans {{p0}} ; le nom du fichier est le nom de l\u2019ic\xF4ne.","todo.settings.statusesDescAll":"\xC0 faire et Accompli viennent toujours en premier, gardent leurs propres ic\xF4nes et ne peuvent pas \xEAtre supprim\xE9s. Chaque statut peut \xEAtre renomm\xE9 et changer de couleur ; les autres peuvent aussi recevoir une ic\xF4ne, compter comme termin\xE9s, \xEAtre r\xE9ordonn\xE9s, d\xE9sactiv\xE9s ou supprim\xE9s.","todo.settings.colIcon":"Ic\xF4ne","todo.settings.colDone":"Compte comme termin\xE9","todo.settings.statusRestore":"Restaurer {{count}} statuts int\xE9gr\xE9s supprim\xE9s","reminders.timeBefore":"D\xE9lai avant (hh:mm)","reminders.timeBeforeDesc":"Combien de temps avant le d\xE9but de la t\xE2che, par exemple 00:10 ou 01:30.","reminders.timeInvalid":"Saisissez heures et minutes comme 00:10 (minutes 00\u201359, au plus 168:00).","todo.calendar.clear":"Effacer","todo.calendar.prev":"Mois pr\xE9c\xE9dent","todo.calendar.next":"Mois suivant","todo.time.invalid":"Saisissez une heure comme 09:30 (00:00\u201323:59).","todo.info.todayTodo":"Aujourd\u2019hui \xE0 faire","todo.info.todayCompleted":"Aujourd\u2019hui termin\xE9es","todo.info.weekTodo":"Cette semaine \xE0 faire","todo.info.weekCompleted":"Cette semaine termin\xE9es","todo.info.allTodo":"Toutes \xE0 faire","todo.info.allCompleted":"Toutes termin\xE9es"};var Zd={"auto.006b85a57ddf":"\u6CA1\u6709\u5339\u914D\u7684\u5F85\u529E\u4E8B\u9879","auto.01e635f27ec2":"\u964D\u5E8F","auto.0379f3c75faa":"To-Do\uFF1A\u7F16\u8F91\u4EFB\u52A1","auto.047d10fd5b0e":"\u5F85\u529E\u4E8B\u9879\u9009\u9879","auto.090ec5f560fc":"\u4EFB\u52A1","auto.0b2982c66cec":"\u4EFB\u52A1\u6807\u7B7E","auto.112f17ac556e":"To-Do\uFF1A\u5217\u51FA\u4EFB\u52A1","auto.13816aca9c25":"\u5B8C\u6210{{p0}}","auto.184c39d1837f":"\u65B0\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.25097a85052b":"\u6253\u5F00To-Do\u9875\u9762","auto.2fb86192bd77":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1","auto.303631ca5c86":"\u641C\u7D22\u4F60\u7684\u5F85\u529E\u6807\u9898\u3001\u5907\u6CE8\u548C\u6807\u7B7E\u3002","auto.3218ad8a4865":"\u4EFB\u52A1\u94FE\u63A5","auto.33ce417454bf":"\u52A0\u8F7D\u4E2D\u2026","auto.34656b383dd3":"To-Do\uFF1A\u5217\u51FA\u7EC4","auto.34d1bc4daccf":"To-Do\uFF1A\u6DFB\u52A0\u4EFB\u52A1","auto.3fc72a0701ff":"To-Do\uFF1A\u5B8C\u6210\u4EFB\u52A1\uFF08\u5B8C\u6210\uFF09","auto.496cd6a42238":"To-Do\uFF1A\u641C\u7D22\u4EFB\u52A1","auto.4fee0a06b6e4":"\u5347\u5E8F","auto.5301648dcf6b":"\u7F16\u8F91","auto.584186da6898":"\u4EFB\u52A1\u9644\u4EF6","auto.63e08dc2a4e3":"\u5BF9\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6392\u5E8F","auto.664764d2200b":"To-Do\uFF1A\u8BBE\u7F6E\u4EFB\u52A1\u72B6\u6001","auto.67300d0fed7c":"\u6E05\u9664\u641C\u7D22","auto.6bf5da9c080b":"\u9009\u9879","auto.70ceb3f38ee9":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","auto.77dfd2135f4d":"\u53D6\u6D88","auto.798b29fa6c05":"To-Do\uFF1A\u5220\u9664\u4EFB\u52A1","auto.7be377261c61":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879\u2026 (#tag)","auto.886cbff9d9df":"\u4F18\u5148\u7EA7","auto.88d8206d586a":"\u5F00\u59CB\u65F6\u95F4","auto.a93c9cdad41c":"\u8FD9\u91CC\u4EC0\u4E48\u90FD\u6CA1\u6709\u2014\u2014\u4E00\u5207\u90FD\u6E05\u695A\u4E86\u3002","auto.b5868978587a":"\u52A0\u8F7D\u5F85\u529E\u4E8B\u9879","auto.bae7d5be7082":"\u72B6\u6001","auto.c274dabfd0fe":"\u65B0\u5F85\u529E\u4E8B\u9879","auto.c509ffcf5b5c":"\u5F85\u529E\u4E8B\u9879\u6587\u4EF6","auto.c5e8306a511f":"\u5F85\u529E\u4E8B\u9879\u6807\u9898","auto.c7f73bb54d92":"\u8BBE\u7F6E","auto.cd7800da7f4f":"\u7ED3\u675F\u65F6\u95F4","auto.cec28cbe4204":"\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","auto.cf3d0c76d559":"To-Do\uFF1A\u91CD\u65B0\u6253\u5F00\u4EFB\u52A1","auto.d2f76731e1e1":"\u8212\u9002\u7684\u89C6\u91CE","auto.e0345e9d3092":"\u641C\u7D22\u5F85\u529E\u4E8B\u9879","auto.e3719eae891e":"\u7D27\u51D1\u89C6\u56FE","auto.edbe7ad07b4a":"\u6253\u5F00To-Do","auto.f6fdbe48dc54":"\u5220\u9664","auto.f783bdbe8fa8":"\u7126\u70B9\u4F1A\u8BAE","auto.f93fb4b1ab19":"\u6E05\u9664\u65E5\u5386\u65E5\u671F\u8FC7\u6EE4\u5668","auto.fb3a16f382f8":"\u590D\u5236 Valley \u94FE\u63A5","auto.fdebf6672120":"\u5F85\u529E\u4E8B\u9879","guard.preset.ask-for-writes":"\u5199\u5165\u524D\u8BE2\u95EE","guard.preset.blocked":"\u5DF2\u963B\u6B62","guard.preset.read-only":"\u53EA\u8BFB","guard.preset.recommended":"\u63A8\u8350","manifest.description":"\u7ED3\u6784\u5316\u4EFB\u52A1\u7BA1\u7406\uFF1A\u5DE6\u4FA7\u680F\u6D4F\u89C8\u5668\u3001\u53F3\u4FA7\u680F\u6309\u6587\u4EF6\u5217\u8868\u3001\u9875\u811A\u4E13\u6CE8\u8BA1\u65F6\u5668\uFF0C\u4EE5\u53CA\u5E26\u53EF\u6298\u53E0\u7684\u903E\u671F/\u4ECA\u5929/\u5373\u5C06\u5230\u6765\u5206\u533A\u7684\u5B8C\u6574\u5DE5\u4F5C\u533A\u9875\u9762\u3002","manifest.name":"\u5F85\u529E\u4E8B\u9879","markdown.examples.allTasks":"\u6240\u6709\u4EFB\u52A1","markdown.examples.completedTasks":"\u5DF2\u5B8C\u6210\u4EFB\u52A1","markdown.examples.dayTasks":"\u4ECA\u65E5\u5230\u671F\u4EFB\u52A1","markdown.examples.filtered":"\u7B5B\u9009\u7ED3\u679C","markdown.examples.openTasks":"\u672A\u5B8C\u6210\u4EFB\u52A1","markdown.examples.overdueTasks":"\u903E\u671F\u4EFB\u52A1","markdown.examples.weekTasks":"\u672C\u5468\u5230\u671F\u4EFB\u52A1","plugin.todo.notification.reminder":"\u5F85\u529E\u63D0\u9192","plugin.todo.notification.reminderDesc":"\u5728\u63D0\u9192\u65F6\u95F4\u63D0\u793A\u5E26\u65E5\u671F\u7684\u5F85\u529E\uFF0C\u5373\u4F7F\u5173\u95ED\u6240\u6709\u7A97\u53E3\u4E5F\u4F1A\u89E6\u53D1\u3002","todo.action.edit":"\u7F16\u8F91","todo.action.openAttachment":"\u9644\u4EF6","todo.action.openInTodo":"\u5728\u5F85\u529E\u4E2D\u6253\u5F00","todo.action.openLink":"\u94FE\u63A5","todo.action.openNote":"\u6253\u5F00\u7B14\u8BB0","todo.action.showOnMap":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.activity":"\u6D3B\u52A8","todo.addAttachment":"\u6DFB\u52A0\u9644\u4EF6","todo.attachmentTasks.noFile":"\u6253\u5F00\u9644\u4EF6\u4EE5\u67E5\u770B\u5176\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.none":"\u6B64\u9644\u4EF6\u6CA1\u6709\u5F85\u529E\u4E8B\u9879","todo.attachmentTasks.title":"\u5F85\u529E\u4E8B\u9879","todo.attachments":"\u9644\u4EF6","todo.breakdown.daily":"\u6309\u65E5","todo.breakdown.monthly":"\u6309\u6708","todo.breakdown.noDate":"\u65E0\u65E5\u671F","todo.breakdown.weekLabel":"\u7B2C {{count}} \u5468 \xB7 {{p0}}","todo.breakdown.weekly":"\u6309\u5468","todo.chip.all":"\u5168\u90E8","todo.chip.noGroup":"\u65E0\u5206\u7EC4","todo.command.editFields":"\u5F85\u529E\uFF1A\u7F16\u8F91\u4EFB\u52A1\u5B57\u6BB5","todo.command.get":"\u5F85\u529E\uFF1A\u83B7\u53D6\u4EFB\u52A1","todo.command.openTask":"\u5F85\u529E\uFF1A\u6253\u5F00\u4EFB\u52A1","todo.completed.hide":"\u9690\u85CF\u5DF2\u5B8C\u6210","todo.completed.show":"\u663E\u793A\u5DF2\u5B8C\u6210","todo.completed.showAll":"\u663E\u793A\u5168\u90E8","todo.delete.message":"\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.delete.title":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\uFF1F","todo.details":"\u8BE6\u7EC6\u4FE1\u606F","todo.due.overdue":"\u903E\u671F","todo.due.today":"\u4ECA\u5929","todo.due.tomorrow":"\u660E\u5929","todo.due.yesterday":"\u6628\u5929","todo.edit.done":"\u5B8C\u6210","todo.edit.group":"\u5206\u7EC4","todo.edit.notes":"\u5907\u6CE8","todo.edit.schedule":"\u65E5\u7A0B","todo.edit.tags":"\u6807\u7B7E","todo.edit.title":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879","todo.error.saveDraft":"\u65E0\u6CD5\u4FDD\u5B58\u4EFB\u52A1\u3002\u60A8\u7684\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF1B\u8BF7\u7F16\u8F91\u540E\u91CD\u8BD5\u3002","todo.fab.newTodo":"\u65B0\u5EFA\u5F85\u529E","todo.fab.newTodoIn":"\u65B0\u5EFA\u5F85\u529E\u4E8E\u2026","todo.fewerFiles":"\u6536\u8D77","todo.field.actualMinutes":"\u5DF2\u8BB0\u5F55\u5206\u949F\u6570","todo.field.attachments":"\u9644\u4EF6","todo.field.color":"\u989C\u8272","todo.field.completed":"\u5DF2\u5B8C\u6210","todo.field.createdAt":"\u5DF2\u521B\u5EFA","todo.field.dueDate":"\u622A\u6B62\u65E5\u671F","todo.field.endTime":"\u7ED3\u675F\u65F6\u95F4","todo.field.estimatedMinutes":"\u9884\u8BA1\u5206\u949F\u6570","todo.field.filePath":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.field.flagged":"\u5DF2\u6807\u8BB0","todo.field.group":"\u5206\u7EC4","todo.field.history":"\u65F6\u95F4\u8BB0\u5F55","todo.field.id":"\u4EFB\u52A1\u6807\u8BC6","todo.field.location":"\u5730\u70B9","todo.field.note":"\u5907\u6CE8","todo.field.priority":"\u4F18\u5148\u4E8B\u9879","todo.field.remindAt":"\u63D0\u9192","todo.field.reminderFiredAt":"\u63D0\u9192\u5DF2\u53D1\u9001","todo.field.startTime":"\u5F00\u59CB\u65F6\u95F4","todo.field.status":"\u72B6\u6001","todo.field.statusHistory":"\u72B6\u6001\u5386\u53F2\u8BB0\u5F55","todo.field.tags":"\u6807\u7B7E","todo.field.title":"\u6807\u9898","todo.field.updatedAt":"\u5DF2\u66F4\u65B0","todo.field.urls":"\u94FE\u63A5","todo.fileKind.audio":"\u97F3\u9891","todo.fileKind.code":"\u6E90\u4EE3\u7801\u6587\u4EF6","todo.fileKind.csv":"\u7535\u5B50\u8868\u683C","todo.fileKind.file":"\u6587\u4EF6","todo.fileKind.generic":"{{p0}} \u6587\u4EF6","todo.fileKind.image":"\u56FE\u7247","todo.fileKind.json":"JSON \u6587\u4EF6","todo.fileKind.model3d":"3D \u6A21\u578B","todo.fileKind.pdf":"PDF \u6587\u6863","todo.fileKind.powerpoint":"\u6F14\u793A\u6587\u7A3F","todo.fileKind.text":"\u6587\u672C\u6587\u6863","todo.fileKind.video":"\u89C6\u9891","todo.fileKind.word":"Word \u6587\u6863","todo.filters":"\u7B5B\u9009","todo.filters.completed":"\u5DF2\u5B8C\u6210","todo.filters.sort":"\u6392\u5E8F\u65B9\u5F0F","todo.filters.statusAndCompleted":"\u72B6\u6001\u548C\u5DF2\u5B8C\u6210","todo.filters.statuses":"\u72B6\u6001","todo.flag":"\u6807\u8BB0","todo.flagged":"\u5DF2\u6807\u8BB0","todo.group.add":"\u6DFB\u52A0","todo.group.cancel":"\u53D6\u6D88","todo.group.deselectAll":"\u53D6\u6D88\u5168\u9009","todo.group.manage":"\u7BA1\u7406\u5206\u7EC4","todo.group.selectAll":"\u5168\u9009","todo.linkedFile":"\u94FE\u63A5\u7684\u6587\u4EF6","todo.location":"\u5730\u70B9","todo.locationPlaceholder":"\u641C\u7D22\u5730\u70B9\u2026","todo.menu.moveGroup":"\u79FB\u81F3\u5206\u7EC4","todo.menu.reschedule":"\u91CD\u65B0\u5B89\u6392","todo.moreFiles":"+{{p0}} \u4E2A","todo.newTodoIn":"\u5728 {{p0}} \u4E2D\u65B0\u5EFA\u5F85\u529E","todo.openInCalendar":"\u5728\u65E5\u5386\u4E2D\u663E\u793A {{p0}}","todo.openLocation":"\u5728\u5730\u56FE\u4E0A\u663E\u793A","todo.openLocationOf":"\u5728\u5730\u56FE\u4E0A\u663E\u793A {{p0}}","todo.priority.high":"\u9AD8","todo.priority.highMeta":"\u9AD8\u4F18\u5148\u7EA7","todo.priority.low":"\u4F4E","todo.priority.lowMeta":"\u4F4E\u4F18\u5148\u7EA7","todo.priority.medium":"\u4E2D","todo.priority.mediumMeta":"\u4E2D\u4F18\u5148\u7EA7","todo.priority.none":"\u65E0","todo.priority.noneMeta":"\u65E0\u4F18\u5148\u7EA7","todo.reminderSet":"\u5DF2\u8BBE\u7F6E\u63D0\u9192","todo.removeAttachment":"\u79FB\u9664\u9644\u4EF6","todo.removeAttachmentOf":"\u79FB\u9664 {{p0}}","todo.removeLocation":"\u79FB\u9664\u5730\u70B9","todo.removeUrl":"\u79FB\u9664\u94FE\u63A5","todo.removeUrlOf":"\u79FB\u9664\u94FE\u63A5 {{p0}}","todo.section.someday":"\u67D0\u5929","todo.section.upcoming":"\u5373\u5C06\u5230\u6765","todo.settings.dateBreakdown":"\u65E5\u671F\u5206\u7EC4","todo.settings.dateBreakdownDesc":"\u6309\u6708\u3001\u65E5\u5386\u5468\u6216\u65E5\u671F\u6574\u7406\u7A84\u7248\u5F85\u529E\u9762\u677F\u3002","todo.settings.display":"\u663E\u793A","todo.settings.smartListReorder":"\u91CD\u65B0\u6392\u5E8F\u667A\u80FD\u5217\u8868","todo.settings.smartLists":"\u667A\u80FD\u5217\u8868","todo.settings.smartListsDesc":"\u62D6\u52A8\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u9009\u62E9\u989C\u8272\uFF0C\u5E76\u5173\u95ED\u4E0D\u4F7F\u7528\u7684\u5217\u8868\u3002","todo.settings.statusAdd":"\u6DFB\u52A0\u72B6\u6001","todo.settings.statusColor":"{{p0}} \u7684\u989C\u8272","todo.settings.statusLocked":"\u5DF2\u9501\u5B9A\u72B6\u6001","todo.settings.statusReorder":"\u91CD\u65B0\u6392\u5E8F\u72B6\u6001","todo.settings.statusShow":"\u663E\u793A {{p0}}","todo.settings.statuses":"\u72B6\u6001","todo.settings.statusesDesc":"\u5F85\u529E\u548C\u5DF2\u5B8C\u6210\u59CB\u7EC8\u53EF\u7528\u3002\u62D6\u52A8\u5176\u4ED6\u72B6\u6001\u4EE5\u91CD\u65B0\u6392\u5E8F\uFF0C\u6216\u5C06\u5176\u5173\u95ED\u3002","todo.sort.created":"\u5DF2\u521B\u5EFA","todo.sort.due":"\u5230\u671F\u7684","todo.sort.name":"\u59D3\u540D","todo.sort.priority":"\u4F18\u5148\u4E8B\u9879","todo.sort.updated":"\u5DF2\u66F4\u65B0","todo.status.canceled":"\u5DF2\u53D6\u6D88","todo.status.completed":"\u5DF2\u5B8C\u6210","todo.status.deferred":"\u5DF2\u63A8\u8FDF","todo.status.delegated":"\u5DF2\u59D4\u6D3E","todo.status.inProgress":"\u8FDB\u884C\u4E2D","todo.status.onHold":"\u6682\u7F13","todo.status.todo":"\u5F85\u529E","todo.status.waiting":"\u7B49\u5F85\u4E2D","todo.swipe.date":"\u65E5\u671F\u548C\u65F6\u95F4","todo.swipe.delete":"\u5220\u9664","todo.swipe.flag":"\u6807\u8BB0","todo.swipe.thisWeekend":"\u672C\u5468\u672B","todo.swipe.tomorrow":"\u660E\u5929","todo.swipe.unflag":"\u53D6\u6D88\u6807\u8BB0","todo.undo.add":"\u6DFB\u52A0\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.delete":"\u5220\u9664\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.undo.edit":"\u7F16\u8F91\u5F85\u529E\u4E8B\u9879\u201C{{title}}\u201D","todo.url":"\u7F51\u5740","todo.urlPlaceholder":"https://\u2026","todo.view.all":"\u5168\u90E8","todo.view.completed":"\u5DF2\u5B8C\u6210","todo.view.flagged":"\u5DF2\u6807\u8BB0","todo.view.groups":"\u5206\u7EC4","todo.view.myLists":"\u5206\u7EC4","todo.view.expandGroup":"\u663E\u793A {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.collapseGroup":"\u9690\u85CF {{p0}} \u7684\u5B50\u5206\u7EC4","todo.view.expandAllGroups":"\u5C55\u5F00\u6240\u6709\u5206\u7EC4","todo.view.collapseAllGroups":"\u6298\u53E0\u6240\u6709\u5206\u7EC4","todo.view.scheduled":"\u5DF2\u8BA1\u5212","todo.view.selectedGroups":"{{count}} \u4E2A\u5206\u7EC4","todo.view.today":"\u4ECA\u5929","todo.compose.addTags":"\u6DFB\u52A0\u6807\u7B7E","todo.compose.addDate":"\u6DFB\u52A0\u65E5\u671F","todo.compose.time":"\u65F6\u95F4","todo.compose.removeTag":"\u79FB\u9664\u6807\u7B7E {{tag}}","workflow.delivery.title":"\u5DE5\u4F5C\u6D41\u4E8B\u4EF6\u4E0D\u53EF\u7528","workflow.delivery.message":"\u66F4\u6539\u5DF2\u4FDD\u5B58\uFF0C\u53EF\u4EE5\u64A4\u9500\u3002\u65E0\u6CD5\u4F20\u9012\u5DE5\u4F5C\u6D41\u89E6\u53D1\u4E8B\u4EF6\uFF0C\u56E0\u6B64\u81EA\u52A8\u64CD\u4F5C\u53EF\u80FD\u5C1A\u672A\u8FD0\u884C\u3002","workflow.delivery.close":"\u5173\u95ED","reminders.title":"\u63D0\u9192","reminders.default":"\u63D2\u4EF6\u9ED8\u8BA4\u503C","reminders.off":"\u5173\u95ED","reminders.custom":"\u81EA\u5B9A\u4E49","reminders.time":"\u63D0\u9192\u65F6\u95F4","notification.open":"\u6253\u5F00","notification.complete":"\u6807\u8BB0\u5B8C\u6210","notification.snooze":"\u7A0D\u540E\u63D0\u9192","notification.minutes":"{{count}} \u5206\u949F","notification.reminder":"\u65E5\u7A0B\u63D0\u9192","bookmark.view":"\u4EFB\u52A1\u4E0E\u7B5B\u9009","bookmark.item":"\u6240\u9009\u9879\u76EE","auto.20202e09f4e0":"Task completed. Uses committed owner data and authenticated causation.","auto.3bf3805df678":"Attachment task presentation","auto.411ea6e526e9":"Smart lists","auto.41574d6657d9":"Reminder offsets in minutes","auto.4a1a01bd2416":"Task sort","auto.4bed336194a9":"Output","auto.4ce8cd62cc16":"Sidebar task presentation","auto.4cef5a0909e0":"Status filter","auto.50b8668b08e8":"Collapsed task groups","auto.5181762f1182":"Update task. Uses committed owner data and authenticated causation.","auto.5faa59d4bc37":"Result","auto.61b1d6d25f39":"Create task. Uses committed owner data and authenticated causation.","auto.6cc253809c2c":"List tasks","auto.765923ca8842":"Scheduled date grouping","auto.786f4e1893c2":"Delete a local task only if its reviewed modification timestamp still matches. Reuses the owning backend and its reviewed revision checks.","auto.7d5a8fd14322":"Owner-managed runtime state; change it through the owning domain operation.","auto.868f6060f001":"Task updated. Uses committed owner data and authenticated causation.","auto.8db340a4c47c":"Task statuses","auto.922ab0bc03db":"Show completed tasks","auto.9df0e9dafd9b":"Get task","auto.a760f6b812c8":"Get task. Uses committed owner data and authenticated causation.","auto.af20ec58720a":"Complete task","auto.afa852bced4d":"Selected task view","auto.b568d47f2e24":"Input","auto.bb5c306dd985":"Task created. Uses committed owner data and authenticated causation.","auto.cb5e5cd36c6e":"Task search text","auto.de64ae0d4886":"Update task","auto.f0050e6494ed":"List tasks. Uses committed owner data and authenticated causation.","auto.f1f1450ff80a":"Create task","auto.f3f8f99f026e":"Delete a local task only if its reviewed modification timestamp still matches","auto.f73559510ee1":"Complete task. Uses committed owner data and authenticated causation.","todo.table.title":"\u6807\u9898","todo.table.status":"\u72B6\u6001","todo.table.priority":"\u4F18\u5148\u7EA7","todo.table.due":"\u622A\u6B62","todo.table.group":"\u5206\u7EC4","todo.table.tags":"\u6807\u7B7E","todo.table.note":"\u5907\u6CE8","todo.table.location":"\u5730\u70B9","todo.table.taskCount":"{{count}} \u4E2A\u4EFB\u52A1","todo.table.oneTask":"1 \u4E2A\u4EFB\u52A1","todo.table.toggleColumns":"\u663E\u793A\u6216\u9690\u85CF\u5217","todo.table.filterPlaceholder":"\u7B5B\u9009\u4EFB\u52A1\u2026","todo.table.selectedCount":"\u5DF2\u9009 {{count}} \u9879","todo.table.complete":"\u5B8C\u6210","todo.table.deleteTitle":"\u5220\u9664 {{count}} \u4E2A\u4EFB\u52A1\uFF1F","todo.table.deleteMessage":"\u6240\u9009\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u88AB\u6C38\u4E45\u5220\u9664\u3002","todo.table.rowsPerPage":"\u6BCF\u9875\u884C\u6570","todo.table.page":"\u7B2C {{page}} \u9875\uFF0C\u5171 {{pages}} \u9875","todo.table.firstPage":"\u8F6C\u5230\u7B2C\u4E00\u9875","todo.table.previousPage":"\u8F6C\u5230\u4E0A\u4E00\u9875","todo.table.nextPage":"\u8F6C\u5230\u4E0B\u4E00\u9875","todo.table.lastPage":"\u8F6C\u5230\u6700\u540E\u4E00\u9875","todo.table.empty":"\u65E0\u7ED3\u679C\u3002","todo.settings.section.lists":"\u5217\u8868\u548C\u72B6\u6001","todo.settings.section.groups":"\u5206\u7EC4","todo.settings.smartListColor":"{{p0}} \u7684\u989C\u8272","todo.settings.smartListShow":"\u663E\u793A {{p0}}","todo.settings.statusText":"{{p0}} \u7684\u6587\u5B57\u989C\u8272","todo.settings.textAuto":"\u81EA\u52A8","todo.settings.textWhite":"\u767D\u8272","todo.settings.textBlack":"\u9ED1\u8272","todo.settings.colStatus":"\u72B6\u6001","todo.settings.colColor":"\u989C\u8272","todo.settings.colText":"\u6587\u5B57","todo.settings.colShow":"\u663E\u793A","reminders.defaultTitle":"\u9ED8\u8BA4\u63D0\u9192","reminders.defaultDesc":"\u7528\u4E8E\u6709\u65F6\u95F4\u7684\u4EFB\u52A1\uFF0C\u9664\u975E\u4EFB\u52A1\u8BBE\u7F6E\u4E86\u81EA\u5DF1\u7684\u63D0\u9192\u3002","todo.filters.title":"\u7B5B\u9009","todo.view.week":"\u672C\u5468","todo.settings.colList":"\u5217\u8868","todo.settings.statusStrike":"\u4E3A {{p0}} \u6DFB\u52A0\u5220\u9664\u7EBF","todo.settings.colStrike":"\u5220\u9664\u7EBF","todo.table.reorderColumn":"\u91CD\u65B0\u6392\u5E8F {{p0}}","todo.filters.quickAll":"\u663E\u793A\u6240\u6709\u72B6\u6001","todo.filters.quickOpen":"\u4EC5\u663E\u793A\u672A\u5B8C\u6210\u7684\u72B6\u6001","todo.filters.quickDone":"\u4EC5\u663E\u793A\u5DF2\u5B8C\u6210\u548C\u5DF2\u53D6\u6D88","todo.table.resizeColumn":"\u8C03\u6574 {{p0}} \u5BBD\u5EA6\uFF08\u53CC\u51FB\u91CD\u7F6E\uFF09","todo.table.newRow":"\u65B0\u4EFB\u52A1 \u2014 \u8F93\u5165\u6216\u7C98\u8D34\u591A\u884C","todo.table.completedCount":"{{count}} \u5DF2\u5B8C\u6210","todo.table.editTitle":"\u7F16\u8F91 {{p0}} \u7684\u6807\u9898","todo.table.editCell":"\u7F16\u8F91{{p0}}","todo.compose.addPlace":"\u6DFB\u52A0\u5730\u70B9","todo.settings.statusNew":"\u65B0\u72B6\u6001\u540D\u79F0","todo.settings.statusNewPlaceholder":"\u65B0\u72B6\u6001","todo.settings.statusName":"\u72B6\u6001\u540D\u79F0","todo.settings.statusDone":"{{p0}} \u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusDelete":"\u5220\u9664 {{p0}}","todo.settings.statusDeleteTitle":"\u5220\u9664\u72B6\u6001\u201C{{p0}}\u201D\uFF1F","todo.settings.statusDeleteMoves":"\u5904\u4E8E\u6B64\u72B6\u6001\u7684 {{count}} \u4E2A\u4EFB\u52A1\u5C06\u6539\u4E3A {{p0}}\u3002","todo.settings.statusDeleteUnused":"\u6CA1\u6709\u4EFB\u52A1\u4F7F\u7528\u6B64\u72B6\u6001\u3002","todo.settings.localGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.localGroupsDesc":"\u4EC5\u5C5E\u4E8E\u5F85\u529E\u4E8B\u9879\uFF1A\u5728\u6B64\u521B\u5EFA\u3001\u91CD\u547D\u540D\u3001\u7740\u8272\u548C\u6392\u5E8F\u3002","todo.settings.useSharedGroups":"\u5171\u4EAB\u5206\u7EC4","todo.settings.useSharedGroupsDesc":"\u65E5\u5386\u3001\u8054\u7CFB\u4EBA\u548C\u5DE5\u4F5C\u533A\u4E5F\u4F1A\u4F7F\u7528\u7684\u5206\u7EC4\u3002\u5728\u6B64\u5904\u7684\u66F4\u6539\u4F1A\u540C\u6B65\u5230\u6240\u6709\u5730\u65B9\u3002","todo.settings.useLocalGroups":"\u4EC5\u9650\u5F85\u529E\u4E8B\u9879\u7684\u5206\u7EC4","todo.settings.useLocalGroupsDesc":"\u4EC5\u5B58\u5728\u4E8E\u5F85\u529E\u4E8B\u9879\u4E2D\u7684\u5206\u7EC4\u3002\u5176\u4ED6\u63D2\u4EF6\u90FD\u770B\u4E0D\u5230\u5B83\u4EEC\u3002","todo.settings.localGroupName":"\u540D\u79F0","todo.settings.localGroupColor":"{{p0}} \u7684\u989C\u8272","todo.settings.localGroupDelete":"\u5220\u9664 {{p0}}","todo.settings.localGroupRemove":"\u79FB\u9664\u5206\u7EC4","todo.settings.localGroupRemoveBlocked":"\u4ECD\u6709 {{count}} \u4E2A\u4EFB\u52A1\u5728\u4F7F\u7528 \u2014 \u5C06\u5B83\u4EEC\u79FB\u5230\u5176\u4ED6\u5206\u7EC4\u540E\u624D\u80FD\u5220\u9664","todo.settings.localGroupNew":"\u65B0\u7684\u5F85\u529E\u5206\u7EC4","todo.settings.localGroupAdd":"\u6DFB\u52A0","todo.settings.localGroupsSetting":"\u72EC\u7ACB\u5F85\u529E\u5206\u7EC4","todo.settings.collapsedGroupsSetting":"\u4FA7\u8FB9\u680F\u4E2D\u6298\u53E0\u7684\u5206\u7EC4","todo.settings.groupOrderSetting":"\u4FA7\u8FB9\u680F\u5206\u7EC4\u7684\u987A\u5E8F","todo.settings.localGroupUsage":"{{count}} \u4E2A\u4EFB\u52A1\u4F7F\u7528\u6B64\u5206\u7EC4","todo.settings.localGroupNewColor":"\u65B0\u5206\u7EC4\u7684\u989C\u8272","todo.settings.localGroupDuplicate":"\u5DF2\u5B58\u5728\u540C\u540D\u5206\u7EC4\u3002","todo.settings.localSubgroupAdd":"\u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupAddTo":"\u4E3A {{p0}} \u6DFB\u52A0\u5B50\u5206\u7EC4","todo.settings.localSubgroupNew":"\u65B0\u5B50\u5206\u7EC4","todo.settings.localGroupRemoveSubgroups":"\u4ECD\u6709\u5B50\u5206\u7EC4 \u2014 \u8BF7\u5148\u79FB\u9664\u6216\u79FB\u52A8\u5B83\u4EEC","todo.location.searching":"\u6B63\u5728\u641C\u7D22\u2026","todo.location.noResults":"\u672A\u627E\u5230\u5730\u70B9\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.location.failed":"\u5730\u70B9\u641C\u7D22\u4E0D\u53EF\u7528\u3002\u6309\u56DE\u8F66\u4FDD\u7559\u6587\u672C\u3002","todo.sheet.notesPlaceholder":"\u5907\u6CE8","todo.sheet.date":"\u65E5\u671F","todo.sheet.place":"\u5730\u70B9","todo.sheet.attachment":"\u9644\u4EF6","todo.sheet.link":"\u94FE\u63A5","todo.sheet.unlinkFile":"\u53D6\u6D88\u5173\u8054\u6587\u4EF6","todo.file.searchAttachment":"\u67E5\u627E\u8981\u9644\u52A0\u7684\u6587\u4EF6","todo.file.searchLinked":"\u67E5\u627E\u6B64\u4EFB\u52A1\u6240\u5C5E\u7684\u6587\u4EF6","todo.file.noResults":"\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6\u3002","todo.settings.statusIcon":"\u72B6\u6001\u56FE\u6807","todo.settings.statusIconOf":"{{p0}} \u7684\u56FE\u6807","todo.settings.statusIconHint":"\u518D\u6B21\u70B9\u51FB\u6240\u9009\u56FE\u6807\u5373\u53EF\u6062\u590D\u8BE5\u72B6\u6001\u81EA\u5E26\u7684\u56FE\u6807\u3002\u5C06 SVG \u6587\u4EF6\u6DFB\u52A0\u5230 {{p0}}\uFF1B\u6587\u4EF6\u540D\u5373\u56FE\u6807\u540D\u79F0\u3002","todo.settings.statusesDescAll":"\u201C\u5F85\u529E\u201D\u548C\u201C\u5DF2\u5B8C\u6210\u201D\u59CB\u7EC8\u6392\u5728\u6700\u524D\uFF0C\u4FDD\u7559\u5404\u81EA\u7684\u56FE\u6807\uFF0C\u4E14\u65E0\u6CD5\u5220\u9664\u3002\u6BCF\u4E2A\u72B6\u6001\u90FD\u53EF\u4EE5\u91CD\u547D\u540D\u548C\u66F4\u6539\u989C\u8272\uFF1B\u5176\u4ED6\u72B6\u6001\u8FD8\u53EF\u4EE5\u8BBE\u7F6E\u56FE\u6807\u3001\u6807\u8BB0\u4E3A\u5B8C\u6210\u3001\u91CD\u65B0\u6392\u5E8F\u3001\u5173\u95ED\u6216\u5220\u9664\u3002","todo.settings.colIcon":"\u56FE\u6807","todo.settings.colDone":"\u89C6\u4E3A\u5DF2\u5B8C\u6210","todo.settings.statusRestore":"\u6062\u590D {{count}} \u4E2A\u5DF2\u5220\u9664\u7684\u5185\u7F6E\u72B6\u6001","reminders.timeBefore":"\u63D0\u524D\u65F6\u95F4 (hh:mm)","reminders.timeBeforeDesc":"\u4EFB\u52A1\u5F00\u59CB\u524D\u591A\u4E45\uFF0C\u4F8B\u5982 00:10 \u6216 01:30\u3002","reminders.timeInvalid":"\u8BF7\u8F93\u5165\u5982 00:10 \u7684\u5C0F\u65F6\u548C\u5206\u949F\uFF08\u5206\u949F 00\u201359\uFF0C\u6700\u591A 168:00\uFF09\u3002","todo.calendar.clear":"\u6E05\u9664","todo.calendar.prev":"\u4E0A\u4E2A\u6708","todo.calendar.next":"\u4E0B\u4E2A\u6708","todo.time.invalid":"\u8BF7\u8F93\u5165\u5982 09:30 \u7684\u65F6\u95F4\uFF0800:00\u201323:59\uFF09\u3002","todo.info.todayTodo":"\u4ECA\u5929\u5F85\u529E","todo.info.todayCompleted":"\u4ECA\u5929\u5DF2\u5B8C\u6210","todo.info.weekTodo":"\u672C\u5468\u5F85\u529E","todo.info.weekCompleted":"\u672C\u5468\u5DF2\u5B8C\u6210","todo.info.allTodo":"\u5168\u90E8\u5F85\u529E","todo.info.allCompleted":"\u5168\u90E8\u5DF2\u5B8C\u6210"};var Jd={en:Wd,de:qd,es:Yd,fr:Xd,"zh-CN":Zd};function Ai(e,t){return(Jd.en[e]??e).replace(/\{\{([^}]+)\}\}/g,(n,i)=>String(t?.[i]??""))}var Qd=Ai,el=Ai;function tl(e){e.ui.registerCatalogs(Jd),el=(t,r)=>{let n=e.ui.t(t,r);return n===t?Ai(t,r):n}}function d(e,t){return el(e,t)}var ol={open:"todo.status.todo",inprogress:"todo.status.inProgress",waiting:"todo.status.waiting",onhold:"todo.status.onHold",delegated:"todo.status.delegated",deferred:"todo.status.deferred",completed:"todo.status.completed",canceled:"todo.status.canceled"},Ym={normal:"todo.priority.none",low:"todo.priority.low",medium:"todo.priority.medium",high:"todo.priority.high"},Xm={normal:"todo.priority.noneMeta",low:"todo.priority.lowMeta",medium:"todo.priority.mediumMeta",high:"todo.priority.highMeta"},rl=()=>{};function nl(e){rl=e}function al(e){let t=ol[e];return t?d(t):e}function et(e,t=""){if(e===null||e==="open")return d("todo.status.todo");let r=rl(e);if(r)return r;let n=ol[e];return n?d(n):t||e}function Re(e){return d(Ym[e])}function il(e){return d(Xm[e])}function Zm(e){if(typeof e!="string"||!sn(e))return!1;let t=lr(e);if(!t)return!1;let r=ni();return r.colors.some(n=>n.id===t)||r.archived.some(n=>n.id===t)}function xn(e){let t=e&&typeof e=="object"?e:{},r=pn(t.custom),n=new Set(r.map(v=>v.id)),i=Array.isArray(t.active)?t.active:Zt,a=[];for(let v of i)typeof v!="string"||!(pi.has(v)||n.has(v))||a.includes(v)||a.push(v);let s=[...Co,...r.map(v=>v.id)],l=v=>v&&typeof v=="object"?v:{},p=l(t.colors),c=Object.fromEntries(s.map(v=>{let G=Eo.get(v)?.color??un;return[v,Zm(p[v])?p[v]:G]})),u=l(t.textColors),m=Object.fromEntries(s.map(v=>[v,ci.includes(u[v])?u[v]:"auto"])),f=l(t.strikethrough),b=Object.fromEntries(s.map(v=>[v,typeof f[v]=="boolean"?f[v]:kd.includes(v)||r.some(G=>G.id===v&&G.done)])),w="text",T=(v,G)=>typeof v=="string"?v.replace(/[\u0000-\u001f]/g," ").trim().slice(0,G):"",P=(Array.isArray(t.removed)?t.removed:[]).filter(v=>typeof v=="string"&&pi.has(v)),M=Object.fromEntries(s.map(v=>[v,T(l(t.labels)[v],Ao)]).filter(([,v])=>v)),D=Object.fromEntries(s.filter(v=>v!=="open"&&v!=="completed").map(v=>[v,T(l(t.icons)[v],80)]).filter(([,v])=>v&&/^[^/\\]+$/.test(v))),x=Object.fromEntries(Zt.map(v=>[v,l(t.done)[v]]).filter(([v,G])=>typeof G=="boolean"&&G!==Eo.get(v)?.done));return{active:a.filter(v=>!P.includes(v)),custom:r,colors:c,textColors:m,strikethrough:b,style:w,labels:M,icons:D,done:x,removed:[...new Set(P)]}}var vr=null;function Pe(){let e=h?.settings.get()[cn],t=ni();if(vr&&vr.raw===e&&vr.palette===t)return vr.value;let r=xn(e);return vr={raw:e,palette:t,value:r},r}function sl(e){h.settings.set(cn,xn(e))}nl(e=>{let t=Pe();return t.labels[e]??t.custom.find(r=>r.id===e)?.label});function to(e=Pe()){return[...Co,...e.custom.map(t=>t.id)]}function Rt(e,t=Pe()){return fi(e,t)}function Se(e,t){return Ed(e,t??Pe())}function Jm(e){return`todo-st-${e}`}function Qm(e,t=Pe()){let r=t.textColors[e];return r==="white"?"#ffffff":r==="black"?"#000000":Nt(t.colors[e]??un)}function Te(e,t=Pe()){let r=e&&Je(e)?t.custom.find(i=>i.id===e):void 0;if(r)return{id:r.id,labelKey:"",label:r.label,color:t.colors[r.id]??un,done:r.done,cls:Jm(r.id),locked:!1,custom:!0};let n=e&&Eo.get(e)||ui[0];return{...n,label:t.labels[n.id]??et(n.id),done:t.done[n.id]??n.done,color:t.colors[n.id],custom:!1}}function vn(e=Pe()){return[Te("open",e),Te("completed",e),...e.active.map(t=>Te(t,e))]}function oo(){return vn().map(e=>e.id)}function dl(e){return e==="open"||e==="completed"||Pe().active.includes(e)}function ut(){let[e,t]=o.useState(()=>vn());return o.useEffect(()=>h.settings.subscribe(()=>t(vn())),[]),e}function xr(e,t=oo()){if(e==="all")return"all";let r=typeof e=="string"?[e]:Array.isArray(e)?e:[],n=t.filter(i=>r.includes(i));return n.length?n:"all"}function Tn(e,t){return t==="all"||t.includes(Ie(e))}function pt(){return vn().map(e=>({status:e.id==="open"?null:e.id,labelKey:e.labelKey,label:e.label,cls:e.cls,color:ye(e.color)}))}function ef(){let e=Pe();return to(e).map(t=>{let r=Te(t,e),n=ye(r.color),i=Qm(t,e),a=e.strikethrough[t]?`.todo-row[data-status="${t}"] h4 .todo-title-md,.todo-table-row[data-status="${t}"] .todo-table-title-text{text-decoration:line-through}`:"";return`.${r.cls}{color:${n}}.todo-detail-field[data-status="${t}"] .select-field-value{color:${n}}.todo-status-pill[data-status="${t}"]{background:${n};color:${i}}`+a}).join("")}function ll(){let[e,t]=o.useState(()=>Pe().style);return o.useEffect(()=>h.settings.subscribe(()=>t(Pe().style)),[]),e}function cl(){let e="notes-todo-status-palette",t=document.getElementById(e);t||(t=document.createElement("style"),t.id=e,document.head.appendChild(t)),t.dataset.todoStatusPalette="true";let r=()=>{t.textContent=ef()};r();let n=h.settings.subscribe(r);return()=>{n(),document.getElementById(e)===t&&t.remove()}}var tf=200,Ci=new WeakMap;function of(e){let t=Ci.get(e);if(t)return t;let r={dirty:new Set,full:!0},n=bn.map(i=>e.api.data.dataset(i).subscribe(a=>{if(r.full)return;let s=Ad(a,i);if(!s){r.full=!0,r.dirty.clear();return}for(let l of s)r.dirty.add(l);r.dirty.size>tf&&(r.full=!0,r.dirty.clear())}));return e.onDispose(()=>{n.forEach(i=>i()),Ci.delete(e)}),Ci.set(e,r),t=r,t}var Sn=new WeakMap;function rf(e){let t=Sn.get(e);if(!t){let r=e.api.backend.call("records.completionReady").then(n=>n===!0,()=>!1);r.then(n=>{!n&&Sn.get(e)===r&&Sn.delete(e)}),Sn.set(e,r),t=r}return t}async function ul(e,t,r){let n=[],i=new Map,a=je(e.api.getState().groups);for(let p=0;p<(r?.length??1);p+=100){let{tasks:c,relations:u}=await yi(e,!1,r?.slice(p,p+100));for(let m of c)typeof m.completedAt=="string"&&m.completedAt&&i.set(String(m.id),m.completedAt);n.push(...Pt(c,u,a))}let s=t?[]:n.filter(p=>!i.has(p.id)).map(p=>p.id),l=s.length?await Hd(e.api,s,e.assertActive,()=>to()):new Map;return n.map(p=>{let c=i.get(p.id);return{...p,historyLoaded:!1,completionSummary:c?{changedAt:c}:l.get(p.id)??null}})}function Ve(e=be()){try{e.assertActive()}catch(t){return Promise.reject(t)}return rf(e).then(t=>nf(e,t))}function nf(e,t){let r=of(e);return gr(e,"list",bn,"",async()=>{let n=JSON.stringify(je(e.api.getState().groups));if(r.full||!r.value||r.groups!==n){r.full=!1,r.dirty.clear();try{r.value=await ul(e,t),r.groups=n}catch(c){throw r.full=!0,c}return r.value}if(!r.dirty.size)return r.value;let i=[...r.dirty];r.dirty.clear();let a;try{a=await ul(e,t,i)}catch(c){for(let u of i)r.dirty.add(u);throw c}let s=new Map(a.map(c=>[c.id,c])),l=new Set(i),p=[];for(let c of r.value)if(!l.has(c.id))p.push(c);else{let u=s.get(c.id);u&&(p.push(u),s.delete(c.id))}return p.push(...s.values()),r.value=p,p})}var Di="localGroups",Tr=200,No=60,Io=(e,t)=>typeof e=="string"?e.replace(/[\u0000-\u001f]/g," ").trim().slice(0,t):"";function Ii(){return`local-${crypto.randomUUID().replace(/-/g,"").slice(0,12)}`}function Ni(e,t=[]){if(!Array.isArray(e))return[];let r=new Set(t.flatMap(a=>[a.name,...a.aliases??[]]).map(Z)),n=new Set,i=[];for(let a of e){if(!a||typeof a!="object")continue;let s=a,l=Io(s.id,64),p=Io(s.name,No),c=Io(s.color,64);if(!/^local-[a-z0-9]{1,32}$/.test(l)||n.has(l)||!p||r.has(Z(p))||!c)continue;let u=Array.isArray(s.aliases)?[...new Set(s.aliases.map(f=>Io(f,No)).filter(f=>f&&Z(f)!==Z(p)&&!r.has(Z(f))))].slice(0,20):[];n.add(l),r.add(Z(p)),u.forEach(f=>r.add(Z(f)));let m=Io(s.parent,64);if(i.push({id:l,name:p,color:c,...u.length?{aliases:u}:{},.../^local-[a-z0-9]{1,32}$/.test(m)?{parent:m}:{}}),i.length>=Tr)break}return vo(i)}function pl(e,t){let r=Io(t,No);if(!r||r===e.name)return e;let n=[...new Set([...e.aliases??[],e.name])].filter(i=>Z(i)!==Z(r));return{...e,name:r,...n.length?{aliases:n}:{}}}function Li(e,t){return[...e,...t.map(r=>({id:r.id,name:r.name,color:r.color,...r.aliases?{aliases:r.aliases}:{},...r.parent?{parent:r.parent}:{}}))]}var Ri="useSharedGroups",Fi="useLocalGroups";function Oi(){let e=h?.settings.get()??{};return{shared:e[Ri]!==!1,local:e[Fi]!==!1}}function kn(){return je(h?.getState().groups)}var gl=()=>Ni(h?.settings.get()[Di],kn()),zi=null,Mi=new Set;function ml(e){zi=e,wr();for(let t of[...Mi])t()}function Lo(){return zi?.groups??gl()}async function $i(e){let t={groups:Ni(e,kn())};ml(t);let r=()=>{zi===t&&ml(null)};try{await h.settings.set(Di,t.groups)}catch(s){throw r(),s}if(JSON.stringify(gl())===JSON.stringify(t.groups)){r();return}let n=()=>{i(),clearTimeout(a),r()},i=h.settings.subscribe(n),a=setTimeout(n,2e3)}var hl="groupOrder";function bl(e){let t=h?.settings.get()[hl],r=Array.isArray(t)?t.filter(i=>typeof i=="string"):[];if(!r.length)return e;let n=new Map(r.map((i,a)=>[i,a]));return e.filter(i=>i.parent===void 0).map((i,a)=>({group:i,at:n.get(i.id)??r.length+a})).sort((i,a)=>i.at-a.at).flatMap(({group:i})=>[i,...e.filter(a=>a.parent===i.id)])}function ro(){return bl(Li(kn(),Lo()))}function Ye(){let e=Oi();return bl(Li(e.shared?kn():[],e.local?Lo():[]))}Ud(ro);var fl;Vd(()=>(h&&fl!==h&&(fl=h,h.subscribe(wr),h.settings.subscribe(wr)),h?ro():[]));function Sr(e){let t=h.subscribe(e),r=h.settings.subscribe(e);return Mi.add(e),()=>{t(),r(),Mi.delete(e)}}function nt(){let[e,t]=o.useState(Ye);return o.useEffect(()=>Sr(()=>t(Ye())),[]),e}function yl(){let[e,t]=o.useState(ro);return o.useEffect(()=>Sr(()=>t(ro())),[]),e}function wl(){let[e,t]=o.useState(Oi);return o.useEffect(()=>h.settings.subscribe(()=>t(Oi())),[]),e}function vl(){let[e,t]=o.useState(Lo);return o.useEffect(()=>Sr(()=>t(Lo())),[]),e}var _i="collapsedGroups";function Pi(){let e=h?.settings.get()[_i];return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xl(){let[e,t]=o.useState(Pi);o.useEffect(()=>h.settings.subscribe(()=>t(i=>{let a=Pi();return a.length===i.length&&a.every((s,l)=>s===i[l])?i:a})),[]);let r=o.useCallback(i=>{let a=Pi(),s=a.includes(i)?a.filter(l=>l!==i):[...a,i];t(s),h.settings.set(_i,s)},[]),n=o.useCallback(i=>{t(i),h.settings.set(_i,i)},[]);return[o.useMemo(()=>new Set(e),[e]),r,n]}var Gi=e=>/^local-[a-z0-9]{1,32}$/.test(e);function Tl(e,t,r,n,i=!1){let a=Ye(),s=a.find(f=>f.id===e);if(!s)return null;let l=n>0||n===0&&s.parent!==void 0,p=i&&r==="after"?a.filter(f=>f.parent===t).at(-1):void 0,c=p?xo(a,e,p.id,"after",!1):xo(a,e,t,r,l);if(!c||c.parent===null||Gi(c.parent)===Gi(e))return c;let u=a.filter(f=>f.id!==e&&f.parent!==e);return{parent:null,before:u.slice(u.findIndex(f=>f.id===c.parent)+1).find(f=>f.parent===void 0)?.id??null}}async function Ui(e,t){let r=async s=>{Gi(e)?await $i(cr(Lo(),e,s)):await h.sharedState.mutateGroup({kind:"move",id:e,...s})};if(t.parent!==null){await r(t);return}let n=ro(),i=n.filter(s=>s.parent===void 0&&s.id!==e).map(s=>s.id),a=t.before===null?-1:i.indexOf(t.before);i.splice(a<0?i.length:a,0,e),await h.settings.set(hl,i),n.find(s=>s.id===e)?.parent!==void 0&&await r({parent:null,before:null})}function Sl(){let e=be(),t=!1,r=()=>{Ve(e).then(i=>{if(e.assertActive(),t)return;let a=new Set(Lo().flatMap(s=>[s.name,...s.aliases??[]]).map(Z));e.api.workspace.reportGroupUsage(di(i.map(s=>s.group).filter(s=>!s||!a.has(Z(s)))))}).catch(()=>{})};r();let n=Ot(r);return()=>{t=!0,n(),e.api.workspace.reportGroupUsage({})}}function af(e){let r=e.toLowerCase().match(/^(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)([^a-z])(dd|mm|yyyy)$/);if(!r)return!1;let n=[r[1],r[3],r[5]];return n.includes("dd")&&n.includes("mm")&&n.includes("yyyy")}function sf(e){let t=e.toLowerCase();return af(t)?t:"yyyy-mm-dd"}function kl(e,t){let r=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!r)return e;let[,n,i,a]=r;return sf(t).replace("yyyy",n).replace("mm",i).replace("dd",a)}var df="ddd d mmm",lf=new Set(["d","dd","ddd","dddd","mmm","mmmm","yyyy"]);function cf(e){let t=e.trim().toLowerCase().match(/[a-z]+/g);if(!t||t.some(s=>!lf.has(s)))return!1;let r=t.filter(s=>s==="d"||s==="dd"),n=t.filter(s=>s==="ddd"||s==="dddd"),i=t.filter(s=>s==="mmm"||s==="mmmm"),a=t.filter(s=>s==="yyyy");return r.length===1&&n.length<=1&&i.length===1&&a.length<=1&&new Set(t).size===t.length}function uf(e){let t=e.trim().toLowerCase().replace(/\s+/g," ");return cf(t)?t:df}var kr=new Map;function pf(e,t,r){let n=`${r??""}:${t}`,i=kr.get(n);return i||(i=new Intl.DateTimeFormat(r,t[0]==="d"?{weekday:t==="ddd"?"short":"long"}:{month:t==="mmm"?"short":"long"}),kr.size>=64&&kr.delete(kr.keys().next().value),kr.set(n,i)),i.format(e)}function El(e,t,r){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e.slice(0,10));if(!n)return e;let[,i,a,s]=n,l=new Date(Number(i),Number(a)-1,Number(s),12);return uf(t).replace(/dddd|ddd|dd|d|mmmm|mmm|yyyy/g,p=>p==="d"?String(Number(s)):p==="dd"?s:p==="yyyy"?i:pf(l,p,r))}function ie(e=new Date){let t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${e.getFullYear()}-${t}-${r}`}function En(e){let[t,r,n]=e.split("-").map(a=>parseInt(a,10));if(!t||!r||!n)return null;let i=new Date(t,r-1,n);return i.setHours(0,0,0,0),i}function mt(e,t){let r=En(e);return r?(r.setDate(r.getDate()+t),ie(r)):e}var Oo=new Intl.Collator(void 0,{sensitivity:"base"}),Mo={high:3,medium:2,low:1,normal:0},Cl=/^\d{4}-\d{2}-\d{2}$/,mf=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,ff=/^\d{2}:\d{2}$/,gf=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,Dl=(e,t)=>1+Number(e.slice(t,t+2))*100+Number(e.slice(t+3,t+5));function An(e){return Cl.test(e)?Number(e.slice(0,4))*1e4+Number(e.slice(5,7))*100+Number(e.slice(8,10)):NaN}function hf(e){return e?Cl.test(e)?An(e)*1e4:mf.test(e)?An(e.slice(0,10))*1e4+Dl(e,11):NaN:-1}function Cn(e){return gf.test(e)?Date.parse(e):NaN}var Al=new WeakMap;function Il(e){let t=Al.get(e);if(t===void 0){let r=e.startTime?ff.test(e.startTime)?Dl(e.startTime,0):NaN:0,n={due:hf(e.dueDate||""),start:r,priority:Mo[e.priority],flagged:e.flagged?1:0,completed:e.completed?1:0,created:Cn(e.createdAt),updated:Cn(e.updatedAt)};t=typeof e.title=="string"&&Object.values(n).every(Number.isFinite)?n:null,Al.set(e,t)}return t}var Dn=1024,bf=64,yf=2e5,$e=[],at=new Map,Po=0;function wf(){$e.forEach((e,t)=>{e.names.key=t*Dn})}function vf(e){let t=0,r=$e.length;for(;t<r;){let s=t+r>>>1,l=Oo.compare(e,$e[s].title);if(l===0){at.set(e,$e[s].names);return}l<0?r=s:t=s+1}let n=t>0?$e[t-1].names.key:null,i=t<$e.length?$e[t].names.key:null,a={key:n===null?i===null?0:i-Dn:i===null?n+Dn:(n+i)/2};$e.splice(t,0,{title:e,names:a}),at.set(e,a),(n!==null&&a.key<=n||i!==null&&a.key>=i)&&wf()}function xf(e){let t=[...at.keys(),...e].sort(Oo.compare);$e=[],at.clear(),Po++;for(let r of t){let n=$e[$e.length-1];if(n&&Oo.compare(n.title,r)===0)at.set(r,n.names);else{let i={key:$e.length*Dn};$e.push({title:r,names:i}),at.set(r,i)}}}function Nl(e,t){at.size>yf&&Tf();let r=null;for(let n=0;n<t.length;n++){let i=t[n];if(i.namesEpoch===Po)continue;let a=at.get(e[n].title);a?(i.names=a,i.namesEpoch=Po):(r??(r=new Set)).add(e[n].title)}if(r){if(r.size>bf)xf(r);else for(let n of r)vf(n);for(let n=0;n<t.length;n++){let i=t[n];i.namesEpoch!==Po&&(i.names=at.get(e[n].title),i.namesEpoch=Po)}}}function Tf(){$e=[],at.clear(),Po++}var Sf={name:0,priority:1,flagged:2,due:3,created:4,updated:5,sections:6,completion:7,stamp:8},Pl=9,kf=5,Ef=32,Af=1e5,Ol="order",Cf=["order_rows","order_run","order_output","order_sections","order_reset"],Ki=null;function Ll(e){Ki=e}async function Df(e){let t={},r=await e.wasm.instantiate(Ol,{env:t}),n=t.memory;if(!n)throw new Error("order module memory was not handed over");for(let a of Cf)if(typeof r.exports[a]!="function")throw new Error(`order module lacks ${a}`);let i=r.exports;return(a,s,l,p,c)=>{let u=i.order_rows(a);if(s(new Float64Array(n.buffer,u,a*Pl)),!i.order_run(a,l,p?1:0,c))return null;let m=i.order_output(),f=i.order_sections();return{order:new Uint32Array(n.buffer,m,a),sections:new Uint32Array(n.buffer,f,kf)}}}function Ml(e){let t=!1;return e.wasm?.list().some(r=>r.id===Ol)&&Df(e).then(r=>{t||Ll(r)},r=>console.warn("To-Do order kernel unavailable; sorting in TypeScript",r)),()=>{t=!0,Ll(null)}}function _o(e,t,r={}){let n=e.length;if(!Ki||n<Ef||n>Af)return null;let i=t==="sections"?An(r.today??""):0;if(Number.isNaN(i))return null;let a=new Array(n),s=r.stamp;for(let c=0;c<n;c++){let u=Il(e[c]);if(!u)return null;if(a[c]=u,!s)continue;let m=s(e[c]);if(u.stampText!==m&&(u.stampText=m,u.stamp=Cn(m)),Number.isNaN(u.stamp))return null}Nl(e,a);let l=Ki(n,c=>{for(let u=0,m=0;u<n;u++,m+=Pl){let f=a[u];c[m]=f.due,c[m+1]=f.start,c[m+2]=f.priority,c[m+3]=f.flagged,c[m+4]=f.completed,c[m+5]=f.created,c[m+6]=f.updated,c[m+7]=s?f.stamp:0,c[m+8]=f.names.key}},Sf[t],r.descending===!0,i);if(!l)return null;let p=new Array(n);for(let c=0;c<n;c++)p[c]=e[l.order[c]];return{ordered:p,sections:[...l.sections]}}var Be=[{id:"normal",labelKey:"todo.priority.none",symbol:""},{id:"low",labelKey:"todo.priority.low",symbol:"!"},{id:"medium",labelKey:"todo.priority.medium",symbol:"!!"},{id:"high",labelKey:"todo.priority.high",symbol:"!!!"}],Go={due:"todo.sort.due",priority:"todo.sort.priority",flagged:"todo.flagged",updated:"todo.sort.updated",created:"todo.sort.created",name:"todo.sort.name"};function no(e,t){return Oo.compare(e.title,t.title)}function _l(e,t,r){if(r==="name")return no(e,t);if(r==="priority"){let a=Mo[t.priority]-Mo[e.priority];return a!==0?a:ao(e,t)}if(r==="flagged"){let a=+!!t.flagged-+!!e.flagged;return a!==0?a:ao(e,t)}if(r==="due")return Gl(e,t);let n=r==="created"?"createdAt":"updatedAt",i=e[n].localeCompare(t[n]);return i!==0?i:no(e,t)}function Gl(e,t,r=!1){let n=e.dueDate||"",i=t.dueDate||"";if(!n&&!i)return ao(e,t);if(!n)return-1;if(!i)return 1;let a=r?i.localeCompare(n):n.localeCompare(i);return a!==0?a:ao(e,t)}function ji(e,t){let r=Mo[t.priority]-Mo[e.priority];return r!==0?r:no(e,t)}function ao(e,t){let r=e.startTime||"",n=t.startTime||"";if(r&&n){let i=r.localeCompare(n);if(i!==0)return i}else{if(r)return-1;if(n)return 1}return ji(e,t)}function Rl(e,t,r){let n=new Map(e.map(a=>[a,t(a)])),i=a=>a===void 0||a==="";return[...e].sort((a,s)=>{let l=n.get(a),p=n.get(s);if(i(l)!==i(p))return i(l)?1:-1;let c=0;return!i(l)&&!i(p)&&(c=typeof l=="number"&&typeof p=="number"?l-p:Oo.compare(String(l),String(p))),c!==0?r==="asc"?c:-c:no(a,s)})}function Ro(e,t,r){let n=_o(e,t,{descending:r==="desc"});return n?n.ordered:t==="due"&&r==="desc"?[...e].sort((i,a)=>Gl(i,a,!0)):[...e].sort(r==="asc"?(i,a)=>_l(i,a,t):(i,a)=>-_l(i,a,t))}function Ue(e,t="dd-mm-yyyy"){return e?kl(e,t):""}function In(e,t,r="ddd d mmm"){return El(e.slice(0,10),r,t)}function Xe(e,t,r,n,i="dd-mm-yyyy"){if(!e)return"";let a=e.slice(0,10);if(a===t)return r.today;let[s,l,p]=a.split("-").map(Number),[c,u,m]=t.split("-").map(Number);if(!s||!l||!p||!c||!u||!m)return Ue(e,i);let f=new Date(s,l-1,p),b=new Date(c,u-1,m),w=Math.round((f.getTime()-b.getTime())/864e5);return w===1?r.tomorrow:w===-1?r.yesterday:w>1&&w<7?f.toLocaleDateString(n,{weekday:"long"}):Ue(e,i)}var xx=new Date(2023,0,1,12);var If={sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};function Er(e){return If[e??""]??1}function Fl(e){let t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate())),r=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-r);let n=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t.getTime()-n.getTime())/864e5+1)/7)}function Nf(e,t){return(e.getDay()-t+7)%7}function zl(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate()-Nf(e,t))}function io(e){let[t,r,n]=e.split("-").map(i=>parseInt(i,10));return new Date(t,(r||1)-1,n||1)}var Fo=["overdue","today","upcoming","someday","completed"],$l={overdue:"todo.due.overdue",today:"todo.due.today",upcoming:"todo.section.upcoming",someday:"todo.section.someday",completed:"todo.view.completed"},it=(e=new Date)=>ie(e);function Nn(e,t=it()){let r={overdue:[],today:[],upcoming:[],someday:[],completed:[]},n=_o(e,"sections",{today:t});if(n){let a=0;return Fo.forEach((s,l)=>{r[s]=n.ordered.slice(a,a+=n.sections[l])}),r}for(let a of e){if(a.completed){r.completed.push(a);continue}let s=a.dueDate?.slice(0,10)??"";s?s<t?r.overdue.push(a):s===t?r.today.push(a):r.upcoming.push(a):r.someday.push(a)}let i=(a,s)=>a.dueDate.localeCompare(s.dueDate)||ao(a,s);return r.overdue.sort(i),r.upcoming.sort(i),r.today.sort(ao),r.someday.sort(ji),r.completed.sort((a,s)=>s.updatedAt.localeCompare(a.updatedAt)||no(a,s)),r}function Vi(e){if(wn(e))return e.completionSummary?.changedAt||e.updatedAt||e.createdAt;let t=e.statusHistory??[];for(let r=t.length-1;r>=0;r--){let{to:n,changedAt:i}=t[r];if(n==="completed"||n==="canceled")return i||e.updatedAt||e.createdAt}return e.updatedAt||e.createdAt}function Bi(e){let t=new Date(e);return Number.isNaN(t.getTime())?e.slice(0,10):it(t)}function Ul(e,t){return _o(e,"stamp",{stamp:r=>t.get(r)})?.ordered??[...e].sort((r,n)=>t.get(n).localeCompare(t.get(r)))}function Kl(e){let t=new Map(e.map(i=>[i,Vi(i)])),r=_o(e,"completion",{stamp:i=>t.get(i)})?.ordered??[...e].sort((i,a)=>t.get(a).localeCompare(t.get(i))||no(i,a)),n=new Map;for(let i of r){let a=Bi(t.get(i)),s=n.get(a);s?s.push(i):n.set(a,[i])}return[...n.entries()].sort(([i],[a])=>a.localeCompare(i)).map(([i,a])=>({key:i,kind:"daily",todos:a}))}function Hi(e,t,r=1,n){let i=n?.dateOf??(l=>l.dueDate?.slice(0,10)??""),a=l=>l?t==="monthly"?l.slice(0,7):t==="daily"?l:it(zl(io(l),r)):"",s=new Map;for(let l of e){let p=a(i(l)),c=s.get(p);c?c.push(l):s.set(p,[l])}return[...s.entries()].sort(([l],[p])=>l===""?-1:p===""?1:p.localeCompare(l)).map(([l,p])=>({key:l,kind:l?t:"none",todos:p}))}function Ln(e,t=it()){let r="",n="normal";return{title:e.replace(/(^|\s)@(today|tomorrow|\d{4}-\d{2}-\d{2})(?=\s|$)/gi,(s,l,p)=>{let c=p.toLowerCase();if(c==="today")r=t;else if(c==="tomorrow"){let u=new Date(`${t}T00:00:00`);u.setDate(u.getDate()+1),r=it(u)}else r=p;return l}).replace(/(^|\s)(!{1,3})(?=\s|$)/g,(s,l,p)=>(n=p.length>=3?"high":p.length===2?"medium":"low",l)).replace(/\s+/g," ").trim(),dueDate:r,priority:n}}var Ke={type:"object",properties:{id:{type:"string",maxLength:65536},title:{type:"string",maxLength:65536},dueDate:{type:"string",maxLength:65536},startTime:{type:"string",maxLength:65536},endTime:{type:"string",maxLength:65536},note:{type:"string",maxLength:65536},filePath:{type:"string",maxLength:65536},group:{type:"string",maxLength:65536},color:{type:"string",maxLength:65536},remindAt:{type:"string",maxLength:65536},reminderFiredAt:{type:"string",maxLength:65536},reminderTime:{type:"string",maxLength:65536},createdAt:{type:"string",maxLength:65536},updatedAt:{type:"string",maxLength:65536},completed:{type:"boolean"},flagged:{type:"boolean"},priority:{enum:["normal","low","medium","high"]},status:{type:"string",maxLength:64},tags:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},urls:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},attachments:{type:"array",items:{type:"string",maxLength:65536},maxItems:1e3},reminderOffsets:{type:"array",items:{type:"number"},maxItems:1e3},estimatedMinutes:{type:"number"},actualMinutes:{type:"number"},location:{type:"object",properties:{name:{type:"string",maxLength:65536},lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}},required:["name"],additionalProperties:!1},history:{type:"array",items:{type:"object",properties:{startedAt:{type:"string",maxLength:65536},endedAt:{type:"string",maxLength:65536},activeMinutes:{type:"number"},pauseMinutes:{type:"number"}},required:["startedAt","endedAt","activeMinutes","pauseMinutes"],additionalProperties:!1},maxItems:1e4},statusHistory:{type:"array",items:{type:"object",properties:{from:{type:"string",maxLength:64},to:{type:"string",maxLength:64},changedAt:{type:"string",maxLength:65536}},required:["from","to","changedAt"],additionalProperties:!1},maxItems:1e4}},required:["id","title","completed","priority","dueDate","note","tags","createdAt","updatedAt"],additionalProperties:!1},jl={open:Ke,get:Ke,"edit-fields":Ke,add:Ke,complete:Ke,done:Ke,reopen:Ke,cancel:Ke,pause:Ke,status:Ke,edit:Ke,"open-page":{type:"null"},search:{type:"array",items:Ke,maxItems:20},list:{type:"array",items:Ke,maxItems:1e4},delete:{type:"object",properties:{deleted:{type:"boolean"},todo:Ke,deletedCount:{type:"integer",minimum:0,maximum:1}},required:["deleted","todo","deletedCount"],additionalProperties:!1},"group-list":{type:"array",items:{type:"object",properties:{name:{type:"string",maxLength:65536},count:{type:"integer",minimum:0}},required:["name","count"],additionalProperties:!1},maxItems:1e4}},Ft={type:"string"},Wi={type:"object",additionalProperties:!1,properties:{...Object.fromEntries(["title","dueDate","startTime","endTime","note","filePath","group","remindAt"].map(e=>[e,Ft])),priority:{type:"string",enum:eo},status:{type:"string",maxLength:64},flagged:{type:"boolean"},completed:{type:"boolean"},...Object.fromEntries(["tags","urls","attachments"].map(e=>[e,{type:"array",items:Ft}])),estimatedMinutes:{type:"number",minimum:0},location:{oneOf:[{type:"null"},{type:"object",required:["name"],additionalProperties:!1,properties:{name:Ft,lng:{type:"number",minimum:-180,maximum:180},lat:{type:"number",minimum:-90,maximum:90}}}]}}};function Vl(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Expected task values.");let t=e;for(let[r,n]of Object.entries(t)){if(!(r in Wi.properties))throw new Error(`Unsupported task property "${r}".`);if(["flagged","completed"].includes(r)){if(typeof n!="boolean")throw new Error(`Expected boolean "${r}".`)}else if(["tags","urls","attachments"].includes(r)){if(!Array.isArray(n)||!n.every(i=>typeof i=="string"))throw new Error(`Expected a text list for "${r}".`)}else if(r==="estimatedMinutes"){if(typeof n!="number"||!Number.isFinite(n)||n<0)throw new Error("Invalid duration.")}else if(r==="location"){if(n!==null){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Invalid location.");let i=n;if(typeof i.name!="string"||Object.keys(i).some(a=>!["name","lng","lat"].includes(a))||i.lng!==void 0&&(typeof i.lng!="number"||!Number.isFinite(i.lng)||Math.abs(i.lng)>180)||i.lat!==void 0&&(typeof i.lat!="number"||!Number.isFinite(i.lat)||Math.abs(i.lat)>90)||i.lng===void 0!=(i.lat===void 0))throw new Error("Invalid location.")}}else if(typeof n!="string")throw new Error(`Expected text for "${r}".`)}if(typeof t.title=="string"&&!t.title.trim())throw new Error("A task title cannot be empty.");if(t.priority!==void 0&&!eo.includes(t.priority))throw new Error("Invalid priority.");if(t.status!==void 0&&!oo().includes(t.status))throw new Error("This task status is disabled.");for(let r of["startTime","endTime"])if(t[r]&&!Cd(String(t[r])))throw new Error("Invalid task time.");if(t.remindAt&&!/^\d{4}-\d{2}-\d{2}(T([01]\d|2[0-3]):[0-5]\d)?$/.test(String(t.remindAt)))throw new Error("Invalid reminder date.");return t}var Ce=e=>typeof e=="string"?e:"",ql=e=>Ce(e?.query).trim();function zo(){return new Date().toISOString()}function Bl(e){let t=e.trim();if(!t)return;let r=rt(Ye(),t);if(!r)throw new Error(`Unknown group "${t}". Create it in the To-Do or Calendar plugin settings first.`);return r.name}function Hl(e){if(typeof e!="string"||!e)return"";if(e.toLowerCase()==="today")return ie();if(e.toLowerCase()==="tomorrow"){let t=new Date;return t.setDate(t.getDate()+1),ie(t)}return e}function Lf(e){return typeof e=="string"?e.split(",").map(t=>t.trim()).filter(Boolean):[]}function Pn(e){let t=e.completed?"\u2713":e.status?`[${e.status}]`:"[ ]",r=[e.priority!=="normal"?e.priority:"",e.dueDate?`due ${e.dueDate}`:"",e.group?`group ${e.group}`:""].filter(Boolean).join(", ");return`${t} ${e.title}${r?` (${r})`:""}  [${e.id}]`}function Pf(e,t){let r=t.trim();if(!r)throw new Error("Expected a todo id or title.");let n=e.find(a=>a.id===r);if(n)return n;let i=e.filter(a=>a.title.toLowerCase().includes(r.toLowerCase()));if(i.length===0)throw new Error(`No todo matching "${r}".`);if(i.length===1)return i[0];throw new Error(`Multiple todos match "${r}":
${i.map((a,s)=>`  ${s+1}. ${a.title} [${a.id}]`).join(`
`)}
Re-run with the exact id.`)}function Mn(){let e=be(),t={groups:je(e.api.getState().groups),assertActive:e.assertActive};return{light:(r,n={})=>Rd(e.api,r,{...t,...n}),byIds:r=>Fd(e.api,r,t)}}async function qi(e){let t=e.trim();if(!t)throw new Error("Expected a todo id or title.");let r=Mn(),n=await r.light(["id","title"],{where:{id:t}}),i=Pf(n.length?n:await r.light(["id","title"]),e),[a]=await r.byIds([i.id]);if(!a)throw new Error(`No todo matching "${t}".`);return a}var On={schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:e=>{let t=ql(e);if(!t)throw new Error("Expected a todo id or title.");return{query:t}},fromCli:e=>({query:e.join(" ").trim()})};async function Ar(e,t,r){let n=await qi(e),i=t(n),a=await Si(n.id,i,n.updatedAt);if(!a)throw new Error("Failed to update todo.");return{value:i,revert:{label:r(n),run:async()=>{if(!await hr(n.id,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await hr(n.id,a))throw new Error("Could not reapply the task change.")}}}}async function Wl(e){return Ar(e,t=>({...t,completed:!0,status:"completed",updatedAt:zo()}),t=>`Complete \u201C${t.title}\u201D`)}async function Of(e,t,r){let n=await Ge(e);if(!n)throw new Error("The task no longer exists.");if(r!==void 0&&n.updatedAt!==r)throw new Error("This task changed elsewhere. Reload it before saving; your draft is preserved.");if(t.group&&t.group!==n.group&&!Ee(Ye()).includes(t.group))throw new Error("Unknown task group. Create it in shared group settings first.");let i=hn({...n,...t,...t.status?Se(t.status):t.completed!==void 0?Se(t.completed?"completed":"open"):{},...t.remindAt!==void 0?{reminderFiredAt:void 0}:{},updatedAt:zo()});if(t.filePath&&i.filePath!==t.filePath)throw new Error("Invalid task file path.");for(let s of["urls","attachments"])if(t[s]?.some(l=>!i[s]?.includes(l)))throw new Error(`Invalid task ${s}.`);let a=await Si(e,i,n.updatedAt);if(!a)throw new Error("Could not save the task.");return{value:i,revert:{label:`Edit \u201C${n.title}\u201D`,run:async()=>{if(!await hr(e,n))throw new Error("Could not restore the task.")},reapply:async()=>{if(!await hr(e,a))throw new Error("Could not reapply the task edit.")}}}}async function ft(e){let t=e??{},r=t.id??t.query,n={groups:Ye(),statuses:oo()};if(!r)return n;let i=await qi(r);return{...n,records:[i]}}function Yl(e){let t=n=>{let i=jl[n.id];if(!i)throw new Error(`Missing result contract for ${n.id}.`);let a={...n,outputSchema:i,limits:{requestBytes:1048576,responseBytes:1048576}};return e.commands.register(a)},r=[t({id:"open",label:"To-Do: Open task",labelKey:"todo.command.openTask",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Ft,newTab:{type:"boolean"}},required:["id"],additionalProperties:!1},parse:n=>{let i=n,a=Ce(i?.id).trim();if(!a)throw new Error("Expected a task id.");if(i.newTab!==void 0&&typeof i.newTab!="boolean")throw new Error("Expected newTab to be a boolean.");return i.newTab===!0?{id:a,newTab:!0}:{id:a}}},run:async({id:n,newTab:i})=>{let a=await Ge(n);if(!a)throw new Error("The task no longer exists. Open To-Do to choose another task.");return i?e.workspace.openMainTab({newTab:!0}):e.workspace.openMainTab(),Le().request(n,"edit"),a}}),t({id:"get",label:"To-Do: Get task",labelKey:"todo.command.get",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{id:Ft},required:["id"],additionalProperties:!1},parse:n=>{let i=Ce(n?.id).trim();if(!i)throw new Error("Expected a task id.");return{id:i}}},run:async({id:n})=>{let i=await Ge(n);if(!i)throw new Error("The task no longer exists.");return i}}),t({id:"edit-fields",label:"To-Do: Edit task fields",labelKey:"todo.command.editFields",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{id:Ft,values:Wi,expectedUpdatedAt:Ft},required:["id","values"],additionalProperties:!1},parse:n=>{let i=n,a=Ce(i?.id).trim();if(!a||i.expectedUpdatedAt!==void 0&&typeof i.expectedUpdatedAt!="string")throw new Error("Expected a task id and revision.");return{id:a,values:Vl(i.values),expectedUpdatedAt:i.expectedUpdatedAt}}},run:({id:n,values:i,expectedUpdatedAt:a})=>Of(n,i,a),revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"open-page",menu:!1,label:"Open To-Do page",labelKey:"auto.25097a85052b",sideEffect:"read",run:()=>(e.workspace.openMainTab(),null),formatCli:()=>"Opened To-Do page."}),t({id:"add",label:"To-Do: Add a task",labelKey:"auto.34d1bc4daccf",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{title:{type:"string"},due:{type:"string"},priority:{type:"string"},status:{type:"string"},note:{type:"string"},group:{type:"string"}},required:["title"],additionalProperties:!1},parse:n=>{let i=n??{},a=Ce(i.title).trim();if(!a)throw new Error('Usage: todo add "<title>" [--due --priority --status --note --group]');return{title:a,due:Ce(i.due),priority:Ce(i.priority),status:Ce(i.status),note:Ce(i.note),group:Ce(i.group)}},fromCli:(n,i)=>({title:n.join(" ").trim(),due:i.due,priority:i.priority,status:i.status,note:i.note,group:i.group})},run:async({title:n,due:i,priority:a,status:s,note:l,group:p})=>{let c=oo();if(s&&!c.includes(s))throw new Error(`Status "${s}" is not enabled. One of: ${c.join(", ")}`);let u=hn({title:n,priority:a||"normal",status:s||void 0,dueDate:Hl(i),note:l,group:Bl(p)});if(!await Mt(u))throw new Error("Failed to add todo.");return{value:u,revert:{label:`Add todo \u201C${u.title}\u201D`,run:async()=>{await _t(u.id)},reapply:async()=>{await Mt(u)}}}},formatCli:n=>`Added: ${Pn(n)}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"complete",label:"To-Do: Complete a task",labelKey:"auto.2fb86192bd77",paletteSafe:!1,sideEffect:"write",input:On,run:({query:n})=>Wl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"done",label:"To-Do: Complete a task (done)",labelKey:"auto.3fc72a0701ff",paletteSafe:!1,sideEffect:"write",input:On,run:({query:n})=>Wl(n),formatCli:n=>`Completed: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"search",label:"To-Do: Search tasks",labelKey:"auto.496cd6a42238",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let i=ql(n);if(!i)throw new Error('Usage: todo search "<query>"');return{query:i}},fromCli:n=>({query:n.join(" ").trim()})},run:async({query:n})=>{let i=ki(n),a=Mn(),s=await a.light(["id","title","note"],{withTags:br(n).tags.length>0});return a.byIds(s.filter(l=>i(l.tags,l.title,l.note)).slice(0,20).map(l=>l.id))},formatCli:n=>n.length?n.map(Pn).join(`
`):"No matching todos."}),t({id:"reopen",label:"To-Do: Reopen a task",labelKey:"auto.cf3d0c76d559",paletteSafe:!1,sideEffect:"write",input:On,run:({query:n})=>Ar(n,i=>({...i,completed:!1,status:"open",updatedAt:zo()}),i=>`Reopen \u201C${i.title}\u201D`),formatCli:n=>`Reopened: ${n.title}`,revision:n=>ft(n),preview:n=>({changes:n})}),...["cancel","pause"].map(n=>t({id:n,label:`To-Do: ${n==="cancel"?"Cancel":"Put a task on hold"}`,paletteSafe:!1,sideEffect:"write",input:On,run:({query:i})=>{let a=n==="cancel"?"canceled":"onhold";if(!dl(a))throw new Error(`Status "${a}" is disabled in To-Do settings.`);return Ar(i,s=>({...s,...Se(a),updatedAt:zo()}),s=>`${n==="cancel"?"Cancel":"Hold"} \u201C${s.title}\u201D`)},formatCli:i=>`${n==="cancel"?"Canceled":"On hold"}: ${i.title}`,revision:i=>ft(i),preview:i=>({changes:i})})),t({id:"status",label:"To-Do: Set task status",labelKey:"auto.664764d2200b",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},status:{type:"string"}},required:["query","status"],additionalProperties:!1},parse:n=>{let i=n??{},a=Ce(i.query).trim(),s=Ce(i.status),l=oo();if(!a||!l.includes(s))throw new Error(`Usage: todo status "<id or title>" <${l.join("|")}>`);return{query:a,status:s}},fromCli:n=>({query:n.slice(0,-1).join(" "),status:n.at(-1)})},run:({query:n,status:i})=>Ar(n,a=>({...a,...Se(i),updatedAt:zo()}),a=>`Set status for \u201C${a.title}\u201D`),formatCli:n=>`${n.title} \u2192 ${n.status}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"edit",label:"To-Do: Edit a task",labelKey:"auto.0379f3c75faa",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},title:{type:"string"},priority:{type:"string"},due:{type:"string"},note:{type:"string"},tags:{type:"string"},group:{type:"string"}},required:["query"],additionalProperties:!1},parse:n=>{let i=n??{},a=Ce(i.query).trim(),s=Ce(i.priority);if(!a)throw new Error("Expected a todo id or title.");if(s&&!eo.includes(s))throw new Error(`Invalid priority "${s}". One of: ${eo.join(", ")}`);return{query:a,title:typeof i.title=="string"?i.title:void 0,priority:s||void 0,due:typeof i.due=="string"?i.due:void 0,note:typeof i.note=="string"?i.note:void 0,tags:typeof i.tags=="string"?Lf(i.tags):void 0,group:typeof i.group=="string"?i.group:void 0}},fromCli:(n,i)=>({query:n.join(" "),title:i.title,priority:i.priority,due:i.due,note:i.note,tags:i.tag,group:i.group})},run:({query:n,title:i,priority:a,due:s,note:l,tags:p,group:c})=>Ar(n,u=>({...u,title:i??u.title,priority:a??u.priority,dueDate:s===void 0?u.dueDate:Hl(s),note:l??u.note,tags:p??u.tags,group:c===void 0?u.group:Bl(c),updatedAt:zo()}),u=>`Edit \u201C${u.title}\u201D`),formatCli:n=>`Edited: ${Pn(n)}`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"delete",label:"To-Do: Delete a task",labelKey:"auto.798b29fa6c05",paletteSafe:!1,sideEffect:"write",input:{schema:{type:"object",properties:{query:{type:"string"},confirm:{oneOf:[{type:"boolean"},{type:"string",enum:["true","false"]}]}},required:["query"],additionalProperties:!1},parse:n=>{let i=n??{},a=Ce(i.query).trim();if(!a)throw new Error("Expected a todo id or title.");return{query:a,confirm:i.confirm===!0||i.confirm==="true"}},fromCli:(n,i)=>({query:n.join(" "),confirm:i.confirm})},run:async({query:n,confirm:i})=>{let a=await qi(n);if(!i)return{value:{deleted:!1,todo:a,deletedCount:0},revert:null};if(!await _t(a.id))throw new Error("Failed to delete todo.");return{value:{deleted:!0,todo:a,deletedCount:1},revert:{label:`Delete \u201C${a.title}\u201D`,run:async()=>{await Mt(a)},reapply:async()=>{await _t(a.id)}}}},formatCli:({deleted:n,todo:i,deletedCount:a})=>n?`Deleted: ${i.title}${a>1?` (${a} tasks)`:""}`:`Would delete "${i.title}" [${i.id}]. Re-run with --confirm to delete.`,revision:n=>ft(n),preview:n=>({changes:n})}),t({id:"list",label:"To-Do: List tasks",labelKey:"auto.112f17ac556e",paletteSafe:!1,sideEffect:"read",input:{schema:{type:"object",properties:{section:{type:"string"},q:{type:"string"}},required:[],additionalProperties:!1},parse:n=>{let i=n??{};return{section:Ce(i.section),q:Ce(i.q)}},fromCli:(n,i)=>({section:Ce(i.section),q:Ce(i.q??i.search)})},run:async({section:n,q:i})=>{let a;if(i){let s=ki(i),l=br(i);if(l.tags.length||l.text){let p=Mn(),c=(await p.light(["id","title","note"],{withTags:l.tags.length>0})).filter(u=>s(u.tags,u.title,u.note)).map(u=>u.id);c.length<=zd&&(a=await p.byIds(c))}a??(a=(await wi()).filter(p=>s(p.tags,p.title,p.note)))}return a??(a=await wi()),n&&Fo.includes(n)?Nn(a)[n]:a},formatCli:n=>n.length===0?"No matching todos.":n.map(Pn).join(`
`)}),t({id:"group-list",label:"To-Do: List groups",labelKey:"auto.34656b383dd3",paletteSafe:!1,sideEffect:"read",run:async()=>{let n=await Mn().light(["id","title","group"]),i=Ye();return Ee(i).map(a=>({name:a,count:n.filter(s=>ct(a).has(Z(s.group??""))).length}))},formatCli:n=>n.length?n.map(i=>`${i.name} (${i.count})`).join(`
`):"No groups."})];return()=>r.forEach(n=>n())}var Xl={todo:[{id:"openTasks",label:"Open tasks",labelKey:"markdown.examples.openTasks",code:`status: open
limit: 10`},{id:"completedTasks",label:"Completed tasks",labelKey:"markdown.examples.completedTasks",code:`status: completed
limit: 10`},{id:"allTasks",label:"All tasks",labelKey:"markdown.examples.allTasks",code:`status: all
limit: 20`},{id:"overdueTasks",label:"Overdue tasks",labelKey:"markdown.examples.overdueTasks",code:`status: open
due: overdue`},{id:"weekTasks",label:"Tasks due this week",labelKey:"markdown.examples.weekTasks",code:`status: open
due: week`},{id:"dayTasks",label:"Tasks due today",labelKey:"markdown.examples.dayTasks",code:`status: open
due: today`},{id:"filtered",label:"Filtered results",labelKey:"markdown.examples.filtered",code:`tag: #focus
status: all
limit: 10`}]};var _f=/^([A-Za-z][\w./-]*)\s*[:=]\s*(.*)$/,Gf=/^-\s+(.*)$/,Rf=/^[A-Za-z][\w+.-]*:\/\//;function Zl(e){let t={bare:null,values:{},lists:{}},r=null;for(let n of e.split(`
`)){let i=n.trim();if(!i||i.startsWith("#"))continue;let a=i.match(Gf);if(a){r?t.lists[r].push(a[1].trim()):t.bare===null&&(t.bare=a[1].trim());continue}let s=Rf.test(i)?null:i.match(_f);if(s){let l=s[1].trim().toLowerCase(),p=s[2].trim();p===""?(r=l,t.lists[l]=t.lists[l]??[]):(r=null,t.values[l]=p);continue}r=null,t.bare===null&&(t.bare=i)}return t}function Jl(e,t,r=500){let n=e.values[t];if(n===void 0)return null;let i=Number.parseInt(n,10);return!Number.isFinite(i)||i<1?null:Math.min(i,r)}async function _n(e){if(!e.id||!e.title.trim())return!1;let t=await Mt(e);return t&&h.undo.push({label:d("todo.undo.add",{title:e.title.trim()}),undo:async()=>({ok:await _t(e.id)}),redo:async()=>({ok:await Mt(e)})}),t}async function so(e,t,r,n){if(!e||!t.title.trim())return!1;let i=wn(t),a=i?{...t}:t;i&&(delete a.historyLoaded,delete a.completionSummary);let s=await vi(e,a,r,n),l=s?.previous,p=l?.title?{...l,group:To(l.group,je(h.getState().groups))??l.group}:null,c=i?{...a,history:t.history===void 0?p?.history:t.history}:t,u=s!==null;return u&&p&&h.undo.push({label:d("todo.undo.edit",{title:p.title}),undo:async()=>({ok:await Ti(e,p)}),redo:async()=>({ok:await Ti(e,c)})}),u}async function Gn(e){let t=await Ge(e),r=await _t(e);return r&&t&&h.undo.push({label:d("todo.undo.delete",{title:t.title}),undo:async()=>({ok:await Mt(t)}),redo:async()=>({ok:await _t(e)})}),r}async function zt(e,t){return await h.ui.confirm({title:d("todo.delete.title"),message:o.createElement("span",null,o.createElement("strong",null,e.title),` ${d("todo.delete.message")}`),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete"?!1:(await t(e.id),!0)}async function Yi(e,t){let r=await Ge(e);return r?so(e,{...r,...Se(t),updatedAt:new Date().toISOString()}):!1}var Xi="notes-todo-fence-styles";function Ff(){if(document.getElementById(Xi))return;let e=document.createElement("style");e.id=Xi,e.textContent=`
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
`,document.head.appendChild(e)}var Ql=()=>{let e=new Date,t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}`},zf=e=>{let t=new Date;t.setDate(t.getDate()+e);let r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())}`};function $f(e,t){let r=Ql(),n=zf(7),i=t.tag?t.tag.replace(/^#/,"").toLowerCase():null;return e.filter(a=>!(t.status==="open"&&a.completed||t.status==="completed"&&!a.completed||i&&!a.tags.some(s=>s.replace(/^#/,"").toLowerCase()===i)||t.due==="today"&&a.dueDate!==r||t.due==="week"&&(!a.dueDate||a.dueDate>n)||t.due==="overdue"&&(!a.dueDate||a.dueDate>=r||a.completed))).sort((a,s)=>(a.dueDate||"9999").localeCompare(s.dueDate||"9999")).slice(0,t.limit)}var Uf=({code:e})=>{let[t,r]=o.useState(null);o.useEffect(()=>{let u=be(),m=!0,f=()=>{Ve(u).then(w=>{u.assertActive(),m&&r(w)}).catch(()=>{})};f();let b=Ot(f);return()=>{m=!1,b()}},[]);let n=Zl(e),i=(n.values.status??"open").toLowerCase(),a=(n.values.due??"").toLowerCase(),s={tag:n.values.tag??n.bare??null,status:i==="completed"?"completed":i==="all"?"all":"open",due:a==="today"||a==="week"||a==="overdue"?a:null,limit:Jl(n,"limit",100)??10};if(!t)return o.createElement("div",{className:"todo-fence-empty"},d("auto.33ce417454bf"));let l=$f(t,s),p=Ql(),c=u=>{let m={...u,completed:!u.completed,status:u.completed?"open":"completed"};r(f=>f&&f.map(b=>b.id===u.id?m:b)),so(u.id,m)};return o.createElement(o.Fragment,null,o.createElement("div",{className:"todo-fence-head",onClick:u=>h.workspace.openMainTab({newTab:h.ui.hasModKey(u)}),title:d("auto.edbe7ad07b4a")},o.createElement("span",{className:"t"},"To-Do",s.tag?` \xB7 #${s.tag.replace(/^#/,"")}`:""),o.createElement("span",{className:"c"},l.length,s.due?` \xB7 ${s.due}`:"")),l.length===0&&o.createElement("div",{className:"todo-fence-empty"},d("auto.a93c9cdad41c")),l.map(u=>o.createElement("div",{key:u.id,className:`todo-fence-row ${u.completed?"done":""}`},o.createElement("input",{type:"checkbox",checked:u.completed,onChange:()=>c(u),"aria-label":u.title}),u.priority!=="normal"&&o.createElement("span",{className:`pri pri-${u.priority}`},Be.find(m=>m.id===u.priority)?.symbol),o.createElement("span",{className:"t"},u.title),u.tags.slice(0,2).map(m=>o.createElement("span",{key:m,className:"tag"},"#",m.replace(/^#/,""))),u.dueDate&&o.createElement("span",{className:`due ${!u.completed&&u.dueDate<p?"overdue":""}`},u.dueDate))))};function ec(){let e=h.markdown.registerCodeBlockRenderer("todo",(t,r)=>(Ff(),r.classList.add("todo-fence"),h.ui.renderReact(r,o.createElement(Uf,{code:t}))),{examples:Xl.todo});return()=>{e(),document.getElementById(Xi)?.remove()}}var Ji=".valley/assets/icons/todo-icon",Kf=new Set(["svg","g","path","circle","ellipse","rect","line","polyline","polygon"]),jf=new Set(["xmlns","viewBox","d","x","y","width","height","x1","y1","x2","y2","cx","cy","r","rx","ry","points","fill","fill-rule","clip-rule","fill-opacity","stroke","stroke-width","stroke-linecap","stroke-linejoin","stroke-opacity","opacity","transform"]);function Vf(e){if(e.length>64e3||/<!DOCTYPE|<!ENTITY/i.test(e))return null;let t=new DOMParser().parseFromString(e,"image/svg+xml"),r=t.documentElement;if(r.localName!=="svg"||t.querySelector("parsererror"))return null;for(let n of[r,...r.querySelectorAll("*")]){if(!Kf.has(n.tagName)){n.remove();continue}for(let i of[...n.attributes])(!jf.has(i.name)||/url\s*\(|javascript:|expression\s*\(/i.test(i.value))&&n.removeAttribute(i.name)}return r.querySelector("path,circle,ellipse,rect,line,polyline,polygon")?(r.setAttribute("width","100%"),r.setAttribute("height","100%"),new XMLSerializer().serializeToString(r)):null}function Bf(e,t){let n=new DOMParser().parseFromString(t,"image/svg+xml").documentElement;for(let l of n.querySelectorAll("*"))for(let p of["stroke","fill"]){let c=l.getAttribute(p);c&&c!=="none"&&l.setAttribute(p,"#000")}let i=n.getAttribute("fill")==="none"?"none":"#000",a=[...n.childNodes].map(l=>new XMLSerializer().serializeToString(l)).join(""),s=`todo-icon-${e.toLowerCase().replace(/[^a-z0-9-]/g,"-")}`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><defs><mask id="${s}" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24"><rect width="24" height="24" fill="#fff"/><g transform="translate(12 12) scale(0.56) translate(-12 -12)" fill="${i}" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${a}</g></mask></defs><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#${s})"/></svg>`}function Rn(){return h.runtime.getOrCreate("todo.taskIcons",()=>({icons:{},revision:0,listeners:new Set,pending:null}))}function Zi(){let e=Rn();return e.pending||(e.pending=h.backend.call("taskIcons",{}).then(t=>{let r={};for(let[n,i]of Object.entries(t?.icons??{})){let a=Vf(i);a&&(r[n]=Bf(n,a))}e.icons=r,e.loaded=!0,e.revision+=1,e.listeners.forEach(n=>n())}).catch(()=>{}).finally(()=>{e.pending=null})),e.pending}function tc(){return Rn().revision}function oc(e){return e?Rn().icons[e]:void 0}function Fn(){let e=Rn();return o.useEffect(()=>{e.loaded||Zi()},[e]),o.useSyncExternalStore(o.useCallback(t=>(e.listeners.add(t),()=>{e.listeners.delete(t)}),[e]),()=>e.revision),e.icons}function rc(){Zi();let e,t=h.realm.onChanged(r=>{!r.full&&!r.changes.some(n=>n.relPath.startsWith(`${Ji}/`))||(window.clearTimeout(e),e=window.setTimeout(()=>{Zi()},150))});return()=>{window.clearTimeout(e),t()}}function nc(e){let r=h?.settings.get().statuses?.icons?.[e];return typeof r=="string"&&r?r:void 0}var X=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),$t=e=>o.createElement("svg",{className:e.className,style:e.style,width:"1em",height:"1em",viewBox:e.viewBox??"0 0 24 24",fill:"currentColor","aria-hidden":!0},e.title?o.createElement("title",null,e.title):null,e.children),Hf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"})),Wf=e=>o.createElement($t,{...e,viewBox:"2 2 20 20"},o.createElement("circle",{cx:"12",cy:"12",r:"10",fill:"#fff"}),o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})),qf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 0 16z"})),Yf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.3l3.6 2.1-.8 1.4L11 13V7z"})),Xf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM7 11h5.2l-1.9-1.9 1.4-1.4L16.2 12l-4.5 4.3-1.4-1.4 1.9-1.9H7z"})),Zf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.6 4.2a5.6 5.6 0 0 0 4.1 8.9 5.7 5.7 0 1 1-4.1-8.9z"})),Jf=e=>o.createElement($t,{...e},o.createElement("path",{d:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.2 14.3-4-4 1.4-1.4 2.6 2.6 5.6-5.6L17.8 9z"})),Qf={inprogress:qf,waiting:Yf,onhold:Wf,delegated:Xf,deferred:Zf,completed:Jf,canceled:Hf},we=({status:e,dotCls:t,color:r})=>{let n=r?{color:r}:void 0,i=oc(nc(e??"open"));if(i)return o.createElement("span",{className:`todo-status-menu-svg todo-status-asset ${t}`,style:n,"aria-hidden":"true",dangerouslySetInnerHTML:{__html:i}});let a=e?Qf[e]:void 0;return a?o.createElement(a,{className:`todo-status-menu-svg ${t}`,style:n}):o.createElement("span",{className:`todo-status-menu-dot ${t}`,style:n})},gt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M5 12h14"})),ht=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"11",cy:"11",r:"8"}),o.createElement("path",{d:"m21 21-4.3-4.3"})),ge=e=>o.createElement(X,{...e},o.createElement("path",{d:"M18 6 6 18M6 6l12 12"})),Ut=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"9",cy:"6",r:"1"}),o.createElement("circle",{cx:"15",cy:"6",r:"1"}),o.createElement("circle",{cx:"9",cy:"12",r:"1"}),o.createElement("circle",{cx:"15",cy:"12",r:"1"}),o.createElement("circle",{cx:"9",cy:"18",r:"1"}),o.createElement("circle",{cx:"15",cy:"18",r:"1"})),ac=e=>o.createElement(X,{...e},o.createElement("rect",{x:"5",y:"10",width:"14",height:"11",rx:"2"}),o.createElement("path",{d:"M8 10V7a4 4 0 0 1 8 0v3"})),ic=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"1"}),o.createElement("circle",{cx:"19",cy:"12",r:"1"}),o.createElement("circle",{cx:"5",cy:"12",r:"1"})),sc=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 11v5M12 8h.01"})),zn=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"10.5",width:"18",height:"3",rx:"1"}),o.createElement("rect",{x:"3",y:"17",width:"18",height:"3",rx:"1"})),$n=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"3",width:"18",height:"7",rx:"1.5"}),o.createElement("rect",{x:"3",y:"14",width:"18",height:"7",rx:"1.5"})),$o=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 19V5M2 8l3-3 3 3M11 7h10M11 12h7M11 17h4"})),Uo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 5v14M2 16l3 3 3-3M11 7h4M11 12h7M11 17h10"})),dc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 12a8 8 0 1 1-2.3-5.7L20 8.6"}),o.createElement("path",{d:"M20 4v4.6h-4.6M12 8v4l3 2"})),lc=e=>o.createElement(X,{...e},o.createElement("rect",{x:"3",y:"4",width:"18",height:"17",rx:"2"}),o.createElement("path",{d:"M8 2v4M16 2v4M3 9h18M12 12v6M9 15h6"})),cc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 19 9 5l6 14M5.2 14h7.6M18 8v11M16 19h4"})),Ko=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 9 6 6 6-6"})),ke=e=>o.createElement(X,{...e},o.createElement("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"}),o.createElement("path",{d:"M4 22v-7"})),uc=e=>o.createElement($t,{...e,viewBox:"0 0 192 512"},o.createElement("path",{d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"})),pc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 20h9"}),o.createElement("path",{d:"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"})),Un=e=>o.createElement(X,{...e},o.createElement("path",{d:"M2 7h7l2 3h11v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z"}),o.createElement("path",{d:"m9 14 3 3 3-3M12 17V9"})),mc=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"})),Fe=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"m8 12 3 3 5-6"})),Kt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6"}),o.createElement("path",{d:"M10 11v6M14 11v6"})),fc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"}),o.createElement("path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0"})),gc=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"9"}),o.createElement("path",{d:"M12 7v5l3 2"})),jt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M6 20v-4M12 20V10M18 20V4"})),lo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"}),o.createElement("path",{d:"M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"})),hc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"}),o.createElement("circle",{cx:"12",cy:"12",r:"3"})),Kn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 7V5c0-1.1.9-2 2-2h2M17 3h2c1.1 0 2 .9 2 2v2M21 17v2c0 1.1-.9 2-2 2h-2M7 21H5c-1.1 0-2-.9-2-2v-2"}),o.createElement("rect",{width:"7",height:"5",x:"7",y:"5",rx:"1"}),o.createElement("rect",{width:"7",height:"5",x:"10",y:"14",rx:"1"})),bc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 11l19-9-9 19-2-8-8-2z"})),He=e=>o.createElement(X,{...e},o.createElement("path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"}),o.createElement("circle",{cx:"12",cy:"10",r:"3"})),Vt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21.4 11.05 12.25 20.2a6 6 0 0 1-8.49-8.49l9.2-9.19a4 4 0 0 1 5.65 5.66l-9.2 9.19a2 2 0 0 1-2.82-2.83l8.49-8.48"})),bt=e=>o.createElement(X,{...e},o.createElement("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),o.createElement("path",{d:"M14 2v6h6"})),jn=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),o.createElement("circle",{cx:"9",cy:"9",r:"2"}),o.createElement("path",{d:"m21 15-4.6-4.6a2 2 0 0 0-2.8 0L3 21"})),Vn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M9 18V5l12-2v13"}),o.createElement("circle",{cx:"6",cy:"18",r:"3"}),o.createElement("circle",{cx:"18",cy:"16",r:"3"})),Bn=e=>o.createElement(X,{...e},o.createElement("path",{d:"m22 8-6 4 6 4V8z"}),o.createElement("rect",{width:"14",height:"12",x:"2",y:"6",rx:"2"})),jo=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"18",cy:"18",r:"4"}),o.createElement("path",{d:"M18 16.5V18l1 1"})),Cr=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("circle",{cx:"12",cy:"15",r:"2",fill:"currentColor",stroke:"none"})),st=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18"}),o.createElement("path",{d:"M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"})),Dr=e=>o.createElement(X,{...e},o.createElement("path",{d:"M22 12h-6l-2 3h-4l-2-3H2"}),o.createElement("path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"})),Ir=e=>o.createElement(X,{...e},o.createElement("circle",{cx:"12",cy:"12",r:"10"}),o.createElement("path",{d:"M12 8l4 4-4 4M8 12h8"})),Hn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 18h18"}),o.createElement("path",{d:"M5 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"}),o.createElement("path",{d:"M6 13V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"}),o.createElement("path",{d:"M4 21v-3M20 21v-3"})),yc=e=>o.createElement(X,{...e},o.createElement("path",{d:"m7 20 5-5 5 5M7 4l5 5 5-5"})),Vo=e=>o.createElement(X,{...e},o.createElement("path",{d:"m7 15 5 5 5-5M7 9l5-5 5 5"})),Wn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 19V5M5 12l7-7 7 7"})),qn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M12 5v14M19 12l-7 7-7-7"})),wc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})),Yn=e=>o.createElement(X,{...e},o.createElement("path",{d:"m15 18-6-6 6-6"})),Bo=e=>o.createElement(X,{...e},o.createElement("path",{d:"m9 18 6-6-6-6"})),vc=e=>o.createElement(X,{...e},o.createElement("path",{d:"m11 17-5-5 5-5M18 17l-5-5 5-5"})),xc=e=>o.createElement(X,{...e},o.createElement("path",{d:"m6 17 5-5-5-5M13 17l5-5-5-5"})),Tc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4"})),Sc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M5 12h14"})),kc=e=>o.createElement(X,{...e},o.createElement("path",{d:"M3 6h18M7 12h10M10 18h4"})),Xn=e=>o.createElement(X,{...e},o.createElement("rect",{width:"18",height:"18",x:"3",y:"4",rx:"2"}),o.createElement("path",{d:"M16 2v4M8 2v4M3 10h18M7 15h10"})),Zn=e=>o.createElement(X,{...e},o.createElement("path",{d:"M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16"}));function Nr(e){let t=e.lng!==void 0&&e.lat!==void 0?`${e.lat},${e.lng}`:e.name;h.links.open({category:"location",value:t})}var Ho=({value:e,onChange:t,disabled:r=!1,autoFocus:n=!1})=>{let i=o.useRef(null),[a,s]=o.useState([]),[l,p]=o.useState("idle"),[c,u]=o.useState(-1),[m,f]=o.useState(!1),b=o.useRef(null),w=o.useRef(0),T=o.useRef(!1);o.useEffect(()=>{i.current&&document.activeElement!==i.current&&(i.current.value=e?.name??"")},[e?.name]),o.useEffect(()=>()=>{b.current!==null&&window.clearTimeout(b.current)},[]),o.useEffect(()=>{n&&i.current?.focus()},[n]);let P=x=>{b.current!==null&&window.clearTimeout(b.current);let v=++w.current;if(x.trim().length<2){s([]),p("idle"),f(!1);return}f(!0),p("searching"),b.current=window.setTimeout(()=>{h.resources.search({query:x.trim(),kinds:["place"],limit:8}).then(G=>{v===w.current&&(s(G),u(G.length?0:-1),p("done"))},()=>{v===w.current&&(s([]),u(-1),p("failed"))})},250)},M=x=>{let v=Number(x.metadata?.longitude),G=Number(x.metadata?.latitude),W=(x.value??x.label).trim();T.current=!0,w.current++,i.current&&(i.current.value=W),f(!1),s([]),t({name:W,...Number.isFinite(v)&&Number.isFinite(G)?{lng:v,lat:G}:{}})},D=()=>{let x=i.current?.value.trim()??"";if(w.current++,f(!1),T.current){T.current=!1;return}x!==(e?.name??"")&&t(x?{name:x}:void 0)};return o.createElement("div",{className:"todo-location"},o.createElement("div",{className:"todo-location-row"},o.createElement("div",{className:"todo-location-field"},o.createElement(ht,{className:"todo-location-field-icon"}),o.createElement("input",{ref:i,className:"todo-location-field-input",type:"text",defaultValue:e?.name??"",placeholder:d("todo.locationPlaceholder"),"aria-label":d("todo.location"),"aria-autocomplete":"list","aria-expanded":m,disabled:r,autoComplete:"off",spellCheck:!1,onChange:x=>{T.current=!1,P(x.currentTarget.value)},onFocus:x=>{x.currentTarget.value.trim().length>=2&&a.length&&f(!0)},onBlur:D,onKeyDown:x=>{x.nativeEvent.isComposing||(x.key==="ArrowDown"&&a.length?(x.preventDefault(),f(!0),u(v=>(v+1)%a.length)):x.key==="ArrowUp"&&a.length?(x.preventDefault(),u(v=>v<=0?a.length-1:v-1)):x.key==="Enter"?(x.preventDefault(),m&&a[c]?M(a[c]):D()):x.key==="Escape"&&m&&(x.preventDefault(),x.stopPropagation(),w.current++,f(!1)))}})),e&&o.createElement(o.Fragment,null,o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.openLocation"),"aria-label":d("todo.openLocationOf",{p0:e.name}),onClick:()=>Nr(e)},o.createElement(bc,null)),o.createElement("button",{className:"todo-menu-btn",disabled:r,type:"button",title:d("todo.removeLocation"),"aria-label":d("todo.removeLocation"),onMouseDown:x=>x.preventDefault(),onClick:()=>{w.current++,i.current&&(i.current.value=""),s([]),f(!1),t(void 0)}},o.createElement(ge,null)))),m&&o.createElement("ul",{className:"todo-location-hits",role:"listbox","aria-label":d("todo.location")},l==="searching"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),l==="done"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.noResults")),l==="failed"&&o.createElement("li",{className:"todo-location-status"},d("todo.location.failed")),a.map((x,v)=>o.createElement("li",{key:x.id,role:"option","aria-selected":v===c},o.createElement("button",{type:"button",className:"todo-location-hit"+(v===c?" is-active":""),onMouseDown:G=>G.preventDefault(),onMouseEnter:()=>u(v),onClick:()=>M(x)},o.createElement("span",{className:"todo-location-hit-name"},o.createElement(He,null),x.label),x.description&&o.createElement("span",{className:"todo-location-hit-context"},x.description))))))};function eg(){try{return Er(h?.getState().weekStart)}catch{return 1}}function ea(e,t=eg()){if(Jn.today!==e||Jn.weekStart!==t){let r=io(e).getDay();Jn={today:e,weekStart:t,end:mt(e,6-(r-t+7)%7)}}return Jn.end}var Jn={today:"",weekStart:-1,end:""},Oe={kind:"smart",id:"all"},Qn=[{id:"scheduled",labelKey:"todo.view.scheduled",color:fe("red"),dated:!0},{id:"today",labelKey:"todo.view.today",color:fe("primary-blue"),dated:!0},{id:"week",labelKey:"todo.view.week",color:fe("violet"),dated:!0},{id:"flagged",labelKey:"todo.view.flagged",color:fe("yellow"),dated:!1},{id:"all",labelKey:"todo.view.all",color:fe("gray"),dated:!1},{id:"completed",labelKey:"todo.view.completed",color:fe("green"),dated:!1}],Lr=Qn.map(e=>e.id);function Qi(e){let t=e&&typeof e=="object"?e:{},r=[];for(let c of Array.isArray(t.order)?t.order:[])typeof c=="string"&&Lr.includes(c)&&!r.includes(c)&&r.push(c);Lr.forEach((c,u)=>{if(r.includes(c))return;let m=Lr.slice(0,u).reverse().find(f=>r.includes(f));r.splice(m?r.indexOf(m)+1:0,0,c)});let n=Array.isArray(t.hidden)?t.hidden:[],i=r.filter(c=>n.includes(c));i.length===r.length&&i.shift();let a=t.colors&&typeof t.colors=="object"?t.colors:{},s={};for(let c of Lr){let u=a[c];typeof u=="string"&&/^(palette:[\w-]+|#[0-9a-f]{6})$/i.test(u)&&(s[c]=u)}let l=t.textColors&&typeof t.textColors=="object"?t.textColors:{},p={};for(let c of Lr){let u=l[c];(u==="white"||u==="black")&&(p[c]=u)}return{order:r,hidden:i,colors:s,textColors:p}}function Ac(e){return e.order.filter(t=>!e.hidden.includes(t)).map(t=>Pr(t,e))}function Pr(e,t){let r=Qn.find(a=>a.id===e)??Qn.find(a=>a.id==="all"),n=t?.colors[r.id],i=t?.textColors?.[r.id];return n||i?{...r,...n?{color:n}:{},...i?{textColor:i}:{}}:r}function Or(e,t){return e.textColor==="white"?"#ffffff":e.textColor==="black"?"#000000":t(e.color)}var Ec=new WeakMap;function tg(e){let t=Ec.get(e),r=Bd();if(t&&t.names===e.names&&t.count===e.names.length&&t.revision===r)return t.keys;let n=new Set(e.names.flatMap(i=>[...ct(i)]));return Ec.set(e,{names:e.names,count:e.names.length,revision:r,keys:n}),n}function og(e,t,r=ie(new Date)){if(t.kind==="groups")return e.group?tg(t).has(Z(e.group)):t.includeUngrouped===!0;if(t.kind==="tag"){let n=t.name.toLowerCase();return e.tags?.some(i=>(i.charCodeAt(0)===35?i.slice(1):i).toLowerCase()===n)===!0}if(t.kind==="nogroup")return!e.group;switch(t.id){case"scheduled":return!!e.dueDate;case"today":return!!e.dueDate&&e.dueDate.slice(0,10)<=r;case"week":return!!e.dueDate&&e.dueDate.slice(0,10)<=ea(r);case"flagged":return!!e.flagged;case"completed":return e.completed;default:return!0}}function Cc(e,t,r,n=ie(new Date)){return og(e,t,n)?t.kind==="smart"&&t.id==="completed"?e.completed:r||!e.completed:!1}function Dc(e,t=ie(new Date)){let r={scheduled:0,today:0,week:0,flagged:0,all:0,completed:0},n=ea(t);for(let i of e){if(i.completed){r.completed++;continue}r.all++,i.flagged&&r.flagged++;let a=i.dueDate?.slice(0,10)??"";a&&(r.scheduled++,a<=t&&r.today++,a<=n&&r.week++)}return r}function ta(e,t=!0){let r=new Map,n=0;for(let i of e){if(t&&i.completed)continue;let a=Z(i.group??"");r.set(a,(r.get(a)??0)+1),i.group||n++}return{byKey:r,ungrouped:n}}function Mr(e,t){if(t===null)return e.ungrouped;let r=0;for(let n of ct(t))r+=e.byKey.get(n)??0;return r}function tt(e){switch(e.kind){case"groups":return`groups:${encodeURIComponent(JSON.stringify({names:e.names,includeUngrouped:e.includeUngrouped===!0}))}`;case"nogroup":return"nogroup";case"tag":return`tag:${e.name}`;default:return e.id}}var rg=Qn.map(e=>e.id);function _r(e){if(typeof e!="string")return Oe;let t=e.trim();if(t==="nogroup")return{kind:"nogroup"};if(t.startsWith("tag:")){let r=t.slice(4).trim();return r?{kind:"tag",name:r}:Oe}if(t.startsWith("group:")){let r=t.slice(6).trim();return r?{kind:"groups",names:[r]}:Oe}if(t.startsWith("groups:"))try{let r=JSON.parse(decodeURIComponent(t.slice(7)));if(!r||typeof r!="object")return Oe;let n=r,i=Array.isArray(n.names)?[...new Set(n.names.filter(s=>typeof s=="string"&&!!s.trim()).map(s=>s.trim()))]:[],a=n.includeUngrouped===!0;return i.length||a?{kind:"groups",names:i,includeUngrouped:a}:Oe}catch{return Oe}return rg.includes(t)?{kind:"smart",id:t}:t.startsWith("due:")?{kind:"smart",id:t==="due:today"?"today":"scheduled"}:Oe}function oa(e,t){return tt(e)===tt(t)}function Rr(e,t,r){let n=()=>h.runtime.getOrCreate(e,()=>({value:null,listeners:new Set,...r?.()})),i=()=>{let s=n();return s.value===null&&(s.value=t()),s.value},a=s=>{let l=n();return l.listeners.add(s),()=>{l.listeners.delete(s)}};return{cell:n,get:i,peek:()=>n().value,set:s=>{let l=n();l.value=s;for(let p of l.listeners)p(s)},subscribe:a,reset:()=>{n().value=null},use:()=>{let[s,l]=o.useState(i);return o.useEffect(()=>a(l),[]),s}}}var ng=300,ag=["group","notes","status","location","tags"],Nc="panelChip",Lc="pageShowCompleted",es="statusFilter",rs="dateBreakdown",Pc="smartLists",ts="pageSearch",Oc="pageSort",ig={todo:"panelPresentation",attachment:"attachmentPanelPresentation"},Mc=["due","priority","flagged","updated","created","name"];function Ic(e){let t=e&&typeof e=="object"?e:{};return{compact:t.compact!==!1,sortField:Mc.includes(t.sortField)?t.sortField:"due",sortDir:t.sortDir==="asc"?"asc":"desc",showCompleted:t.showCompleted===!0,statusFilter:xr(t.statusFilter),groupNames:Array.isArray(t.groupNames)?[...new Set(t.groupNames.filter(r=>typeof r=="string"&&r.trim().length>0).map(r=>r.trim()))]:[],includeUngrouped:t.includeUngrouped===!0}}function ia(e){let t=ig[e],r=o.useCallback(()=>Ic(h.settings.get()[t]),[t]),[n,i]=o.useState(r);o.useEffect(()=>h.settings.subscribe(()=>i(r())),[r]);let a=o.useCallback(s=>{i(l=>{let p=Ic({...l,...s});return h.settings.set(t,p),p})},[t]);return[n,a]}function ra(){let e=h.settings.get()[rs];return e==="weekly"||e==="daily"?e:"monthly"}function sa(){let[e,t]=o.useState(ra);return o.useEffect(()=>h.settings.subscribe(()=>t(ra())),[]),e}var Fr=e=>h.settings.get()[e],_c=()=>{let e=Fr(ts);return typeof e=="string"?e.slice(0,500):""},yt=Rr("todo.view",()=>_r(Fr(Nc)),()=>({history:[],historyIndex:-1})),Wo=Rr("todo.showCompleted",()=>Fr(Lc)===!0),qo=Rr("todo.statusFilter",()=>{let e=Fr(es),t=xr(e);return typeof e=="string"&&e!=="all"&&t!=="all"&&h.settings.set(es,t),t}),Yo=Rr("todo.search",_c),Gr=Rr("todo.pageSort",()=>ns(Fr(Oc)));function wt(){let e=yt.get(),t=yt.cell();return t.historyIndex<0&&(t.history=[e],t.historyIndex=0),e}function Gc(e){yt.set(e),h.settings.set(Nc,tt(e))}function Ze(e){if(oa(wt(),e))return;let t=yt.cell();t.history=[...t.history.slice(0,t.historyIndex+1),e].slice(-20),t.historyIndex=t.history.length-1,Gc(e)}function da(){wt();let{history:e,historyIndex:t}=yt.cell();return{canGoBack:t>0,canGoForward:t<e.length-1}}function Xo(e){wt();let t=yt.cell(),r=t.historyIndex+e;r<0||r>=t.history.length||(t.historyIndex=r,Gc(t.history[r]))}var zr=yt.subscribe;function Rc(){aa();let e=yt.cell();e.history=[],e.historyIndex=-1;for(let t of[yt,Wo,qo,Yo,Gr])t.reset()}function na(){return Qi(h.settings.get()[Pc])}function Fc(e){h.settings.set(Pc,Qi(e))}function zc(){let[e,t]=o.useState(na);return o.useEffect(()=>h.settings.subscribe(()=>t(na())),[]),e}function aa(){let e=Yo.cell(),t=e.pending;t&&(e.pending=void 0,clearTimeout(t.timer),t.forget(),e.value!==null&&t.write(e.value))}function la(e){let t=Yo.cell(),r=e.slice(0,500);if(t.value===r)return;if(Yo.set(r),r===""){t.pending&&(clearTimeout(t.pending.timer),t.pending.forget(),t.pending=void 0),h.settings.set(ts,r);return}t.pending&&clearTimeout(t.pending.timer);let n=h,i=s=>{n.settings.set(ts,s).catch(()=>{})},a=t.pending?.forget??be()?.onDispose(aa)??(()=>{});t.pending={timer:setTimeout(aa,ng),write:i,forget:a}}function ca(){return[Yo.use(),la]}function ns(e){let t=e&&typeof e=="object"?e:{};return{field:t.field==="auto"||ag.includes(t.field)||Mc.includes(t.field)?t.field:"auto",dir:t.dir==="desc"?"desc":"asc"}}function $c(e){let t=ns(e),r=Gr.peek();r?.field===t.field&&r.dir===t.dir||(Gr.set(t),h.settings.set(Oc,t))}function Uc(){return[Gr.use(),$c]}function ua(e=wt()){return{v:1,view:tt(e),showCompleted:Wo.get(),statusFilter:qo.get(),search:Yo.peek()??_c(),sort:Gr.get()}}function pa(e,t=!1){return e.v!==1?!1:(t||Ze(_r(e.view)),xt(e.showCompleted===!0),os(xr(e.statusFilter)),la(typeof e.search=="string"?e.search:""),aa(),$c(ns(e.sort)),!0)}function os(e){let t=xr(e),r=qo.get();r==="all"&&t==="all"||r!=="all"&&t!=="all"&&r.length===t.length&&r.every((n,i)=>n===t[i])||(qo.set(t),h.settings.set(es,t))}function vt(){let e=qo.use();return o.useEffect(()=>h.settings.subscribe(()=>os(qo.get())),[]),[e,os]}function ma(){let[e,t]=o.useState(wt);return o.useEffect(()=>zr(t),[]),e}function xt(e){Wo.peek()!==e&&(Wo.set(e),h.settings.set(Lc,e))}function Tt(){return[Wo.use(),()=>xt(!Wo.get())]}function jc(e){let t=e.dueDate?.slice(0,10);if(!t)return!1;let r=h.interop.services.providers(yo).find(n=>n.owner===h.pluginId)?.providerId;return h.links.open({category:"date",value:t,context:{startTime:e.startTime,endTime:e.endTime,sourceId:r,itemId:e.id}}),!0}function Vc(e,t){return fn(e)?e:t}function sg(e){let t=[];return e.filePath&&t.push("note"),e.attachments?.length&&t.push("attachment"),e.urls?.length&&t.push("link"),e.location&&t.push("location"),t.length>0?t:void 0}function dg(e,t){return e.dueDate?{badges:sg(e),icon:"list-todo",id:e.id,documentRef:{pluginId:h.pluginId,sourceId:"tasks",itemId:e.id},title:e.title,date:e.dueDate.slice(0,10),startTime:e.startTime,endTime:e.endTime,completed:e.completed,filePath:e.filePath,tags:e.tags,note:e.note,location:e.location,urls:e.urls,attachments:e.attachments,priority:e.priority,status:e.status,...e.group?{group:e.group}:{},...e.color?{color:e.color}:e.group?{color:Ae(e.group,t)}:{}}:null}function lg(e,t){return{...e,title:t.title?.trim()||e.title,dueDate:t.date??e.dueDate,startTime:"startTime"in t?t.startTime:e.startTime,endTime:"endTime"in t?t.endTime:e.endTime,note:"note"in t?t.note??"":e.note,location:"location"in t?t.location:e.location,urls:"urls"in t?t.urls:e.urls,attachments:"attachments"in t?t.attachments:e.attachments,group:"group"in t?t.group:e.group,tags:t.tags??e.tags,priority:Vc(t.priority,e.priority),filePath:"filePath"in t?t.filePath:e.filePath,...t.completed===void 0?{}:Se(t.completed?"completed":null),updatedAt:new Date().toISOString()}}function Kc(e){let t=e.lastIndexOf("/");return t===-1?e:e.slice(t+1)}var as="attachment:",is="url:";function cg(e){let t=[{id:"open-owner",label:"Open in To-Do",labelKey:"todo.action.openInTodo",icon:"checklist"},{id:"edit",label:"Edit",labelKey:"todo.action.edit",icon:"edit"}],r=[];e.filePath&&r.push({id:"open-note",label:"Open note",labelKey:"todo.action.openNote",description:Kc(e.filePath),icon:"note"});let n=e.attachments??[];n.length>0&&r.push({id:"open-attachment",label:"Attachment",labelKey:"todo.action.openAttachment",icon:"attachment",submenu:n.map(a=>({id:`${as}${a}`,label:Kc(a),description:a,icon:"attachment"}))});let i=e.urls??[];return i.length>0&&r.push({id:"open-link",label:"Link",labelKey:"todo.action.openLink",icon:"link",submenu:i.map(a=>({id:`${is}${a}`,label:a,icon:"link"}))}),e.location&&r.push({id:"show-on-map",label:"Show on map",labelKey:"todo.action.showOnMap",description:e.location.name,icon:"map"}),r.length>0&&t.push(...r),t}async function ug(e,t){if(t.startsWith(as)){let r=t.slice(as.length);return(e.attachments??[]).includes(r)?(h.workspace.openFile(r),!0):!1}if(t.startsWith(is)){let r=t.slice(is.length);if(!(e.urls??[]).includes(r))return!1;let n=ko(r);return n?h.workspace.openFile(n):h.files.openExternalUrl(r),!0}switch(t){case"open-owner":case"edit":return await h.workspace.revealOwnPanel("left_sidebar"),Ze(e.completed?{kind:"smart",id:"completed"}:Oe),Le().request(e.id,t==="edit"?"edit":"focus"),!0;case"open-note":return e.filePath?(h.workspace.openFile(e.filePath),!0):!1;case"show-on-map":return e.location?(Nr(e.location),!0):!1;default:return!1}}function Bc(){let e=be(),t=Xt("calendar-source"),r=0,n=!0,i={integration:{name:"To-Do",version:"2.0.0",author:"nausicaa",description:"Shows dated tasks in Calendar and its agenda. Open, edit, or complete a task directly from its calendar entry.",localized:{de:{name:"To-Do",description:"Zeigt terminierte Aufgaben im Kalender und in der Agenda. \xD6ffne, bearbeite oder erledige eine Aufgabe direkt \xFCber ihren Kalendereintrag."},es:{name:"To-Do",description:"Muestra tareas con fecha en Calendario y su agenda. Abre, edita o completa una tarea desde su entrada del calendario."},fr:{name:"To-Do",description:"Affiche les t\xE2ches dat\xE9es dans Calendrier et son agenda. Ouvrez, modifiez ou terminez une t\xE2che depuis son entr\xE9e du calendrier."},"zh-CN":{name:"To-Do",description:"\u5728\u65E5\u5386\u53CA\u5176\u65E5\u7A0B\u4E2D\u663E\u793A\u5E26\u65E5\u671F\u7684\u4EFB\u52A1\u3002\u53EF\u76F4\u63A5\u4ECE\u65E5\u5386\u6761\u76EE\u6253\u5F00\u3001\u7F16\u8F91\u6216\u5B8C\u6210\u4EFB\u52A1\u3002"}}},list:async({startDate:c,endDate:u,limit:m,cursor:f})=>{let b,w=()=>`${t}:${r}`;if(f){let x;try{x=JSON.parse(f)}catch{throw new Error("Invalid Calendar source cursor.")}if(!x||x.startDate!==c||x.endDate!==u||x.limit!==m||x.revision!==w()||typeof x.cursor!="string"||!x.cursor)throw new Error("Calendar source cursor is stale or belongs to another range.");b=x.cursor}if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");let T=w(),P=await Md(c,u,m,b);if(e.assertActive(),!n)throw new Error("Calendar source was disposed.");if(f&&T!==w())throw new Error("Calendar source cursor is stale; restart the range.");let M=Ye(),D=w();return{items:P.todos.map(x=>dg(x,M)).filter(x=>!!x),revision:D,...P.cursor?{cursor:JSON.stringify({startDate:c,endDate:u,limit:m,revision:D,cursor:P.cursor})}:{}}},create:async(c,u)=>{if(u.endDate&&u.endDate!==c)return!1;let m=u.title?.trim();if(!m)return!1;let f=new Date().toISOString();return _n({id:Xt("todo"),title:m,completed:u.completed??!1,priority:Vc(u.priority,"normal"),dueDate:c,startTime:u.startTime,endTime:u.endTime,note:u.note??"",location:u.location,urls:u.urls,attachments:u.attachments,group:u.group,tags:u.tags??[],filePath:u.filePath,createdAt:f,updatedAt:f})},update:async(c,u)=>{let m=await Ge(c);return m&&u.endDate&&u.endDate!==(u.date??m.dueDate)?!1:m?so(m.id,lg(m,u),m.updatedAt):!1},remove:c=>Gn(c),open:async c=>{let u=await Ge(c);await h.workspace.revealOwnPanel("left_sidebar"),u&&(Ze(u.completed?{kind:"smart",id:"completed"}:Oe),Le().request(u.id,"focus"))},configure:()=>h.workspace.openOwnSettings(),actions:async c=>{let u=await Ge(c);return u?cg(u):[]},runAction:async(c,u)=>{let m=await Ge(c);return m?ug(m,u):!1}},a=()=>{h.interop.state.publish(ir,++r)};h.interop.state.publish(ir,r);let s=Ld(a),l=Sr(a),p=h.interop.services.provide(yo,i);return()=>{n=!1,s(),l(),p(),h.interop.state.publish(ir,null)}}var ss=e=>typeof e=="string"?e:"";function Hc(e){let t=ss(e).replace(/\\/g,"/").replace(/^\.\//,"");return t===".valley"||t.startsWith(".valley/")?"":t}function Wc(e){let t={cardKind:"todo",open:async(r,n)=>{if(ss(r.id)&&!n.newTab)return await e.documents.open({pluginId:e.pluginId,sourceId:"tasks",itemId:ss(r.id)}),!0;let i=Hc(r.filePath)||Hc(n.path);return i?e.workspace.openFile(i,void 0,{newTab:n.newTab}):n.newTab?e.workspace.openMainTab({newTab:!0}):e.workspace.revealOwnPanel("left_sidebar"),!0}};return e.interop.extensions.provide(qa,t)}function dt(...e){let t=e.slice().sort().join("\0"),r=o.useMemo(()=>t.split("\0"),[t]),n=o.useCallback(i=>h.subscribeState(r,i),[r]);return o.useSyncExternalStore(n,h.getState,h.getState)}function fa(){let e=o.useCallback(a=>h.interop.state.subscribe(en,a),[]),t=o.useCallback(()=>h.interop.state.get(en),[]),r=o.useSyncExternalStore(e,t,t),n=r?.rangeStart??null,i=r?.rangeEnd??null;return o.useMemo(()=>({selectedDate:r?.selectedDate??null,selectedDateRange:n&&i?{start:n,end:i}:null}),[i,n,r?.selectedDate])}function qc(){let[e,t]=o.useState(new Set),r=o.useRef(new Set),n=o.useCallback((a,s)=>{let l=new Set(r.current);s?l.add(a):l.delete(a),r.current=l,t(l)},[]),i=o.useCallback(a=>r.current.has(a),[]);return{pendingIds:e,isPending:i,setPending:n}}var pg="todo.sharedTodos";function ds(){return h.runtime.getOrCreate(pg,()=>({todos:[],listeners:new Set}))}function ve(){return ds().todos}function St(e){let t=ds();t.todos=e;for(let r of t.listeners)r(e)}function kt(e){let t=ds();return t.listeners.add(e),()=>{t.listeners.delete(e)}}var ls="list:",ga=e=>h.ui.hasModKey(e)||e.button===1,mg=e=>`${ls}${tt(e)}`;function co(e){return e?.startsWith(ls)?_r(e.slice(ls.length)):null}var Yc=e=>e?.pluginId===h.pluginId?e.instanceId:void 0;function ha(e){return e.kind==="groups"?e.names.length===1&&!e.includeUngrouped?e.names[0]:d("todo.view.selectedGroups",{count:e.names.length+(e.includeUngrouped?1:0)}):e.kind==="tag"?`#${e.name}`:e.kind==="nogroup"?d("todo.chip.noGroup"):d(Pr(e.id).labelKey)}function Zo(e,t){h.workspace.openMainTab({instanceId:mg(e),title:ha(e),newTab:t})}function $r(e,t=!1){t||co(Yc(h.getState().activePluginTab))?Zo(e,t):Ze(e)}function Xc(){let e=ma(),{activePluginTab:t}=dt("activePluginTab"),r=Yc(t);return o.useMemo(()=>co(r),[r])??e}function Zc(){let e=t=>h.workspace.setMainTabTitle(ha(t));return e(wt()),zr(e)}var fg=["today","week","all"],Jc=fg.flatMap(e=>[`${e}Todo`,`${e}Completed`]),gg=e=>({id:e,label:Qd(`todo.info.${e}`),labelKey:`todo.info.${e}`,kind:"text"});function hg(e,t){let r=ea(t),n={todayTodo:0,todayCompleted:0,weekTodo:0,weekCompleted:0,allTodo:0,allCompleted:0};for(let a of e){let s=a.completed?"Completed":"Todo";n[`all${s}`]++;let l=a.dueDate?a.dueDate.slice(0,10):"";l&&(l<=t&&n[`today${s}`]++,l<=r&&n[`week${s}`]++)}let i={};for(let a of Jc){let s=n[a];i[a]={text:`${d(`todo.info.${a}`)} \xB7 ${s}`,value:s}}return i}function Qc(){let e=new Set,t=null,r={id:"todo.details",label:"To-Do",labelKey:"manifest.name",pluginViews:!0,items:[{id:"title",label:"Title",labelKey:"details.item.title",kind:"text"},...Jc.map(gg)],defaultItems:["title"],subscribe:s=>(e.add(s),()=>{e.delete(s)}),getSnapshot:()=>{let s=ve(),l=ie(),p=h.ui.language();return(!t||t.todos!==s||t.today!==l||t.language!==p)&&(t={todos:s,today:l,language:p,snapshot:{items:hg(s,l)}}),t.snapshot}},n=h.interop.extensions.provide(ei,r),i=()=>{for(let s of[...e])s()},a=[kt(i),h.subscribeState(["activePluginTab"],i)];return()=>{for(let s of a)s();n(),e.clear()}}var cs={type:"object",properties:{v:{type:"literal",value:1},view:{type:"string"},showCompleted:{type:"boolean"},statusFilter:{type:"union",anyOf:[{type:"union",anyOf:[{type:"literal",value:"all"}]},{type:"array",items:{type:"string"},maxItems:512}]},search:{type:"string"},sort:{type:"object",properties:{field:{type:"union",anyOf:[{type:"literal",value:"auto"},{type:"literal",value:"due"},{type:"literal",value:"priority"},{type:"literal",value:"flagged"},{type:"literal",value:"updated"},{type:"literal",value:"created"},{type:"literal",value:"name"}]},dir:{type:"union",anyOf:[{type:"literal",value:"asc"},{type:"literal",value:"desc"}]}},required:["field","dir"],additionalProperties:!1},todoId:{type:"string"}},required:["v","view","showCompleted","statusFilter","search","sort"],additionalProperties:!1};function bg(){return["completed",...to().filter(t=>t!=="completed")].map(t=>Te(t))}function uo(){return h.runtime.getOrCreate("todo.surfaces",()=>({actions:null,selected:new Map,listeners:new Set}))}function eu(){for(let e of uo().listeners)e()}function us(e,t=""){let r=uo();!e&&r.actionsOwner!==void 0&&r.actionsOwner!==t||(r.actions=e,r.actionsOwner=e?t:void 0,eu())}function ps(e,t){e?uo().selected.set(t,e):uo().selected.delete(t),eu()}function yg(e,t){let r=e==="main_workspace"?co(t):null,n=ua(r??void 0),i=ve().find(a=>a.id===uo().selected.get(e));return{title:d("manifest.name"),view:n,actions:uo().actions??[],...i?{item:{id:i.id,title:i.title,state:{...n,todoId:i.id}}}:{},...r?{}:{navigation:{...da(),goBack:()=>Xo(-1),goForward:()=>Xo(1)}}}}function wg(e){let t=uo().listeners;t.add(e);let r=kt(e),n=zr(e),i=h.settings.subscribe(e);return()=>{t.delete(e),r(),n(),i()}}async function vg(e,t,r=!1,n){if(typeof e.todoId=="string"&&!await Ge(e.todoId))throw new Error("The bookmarked task no longer exists.");if(!pa(e,t==="main_workspace"&&co(n)!==null))throw new Error("Unsupported To-Do bookmark.");ps(typeof e.todoId=="string"?e.todoId:null,t),!r&&typeof e.todoId=="string"&&Le().request(e.todoId,"focus")}function xg({label:e,color:t,todos:r,sub:n}){let[i,a]=o.useState(!1);return o.createElement("section",{className:`todo-status-group${n?" todo-status-subgroup":""}${i?" expanded":""}`},o.createElement("button",{className:"todo-status-group-header",type:"button","aria-expanded":i,onClick:()=>a(s=>!s)},o.createElement("span",{className:"todo-status-group-name"},o.createElement("span",{className:"props-info-dot",style:{background:t}}),e),o.createElement("span",{className:"todo-status-group-meta"},o.createElement("span",null,r.length),o.createElement(Ko,null))),i&&o.createElement("div",{className:"todo-group-status-breakdown"},bg().map(s=>o.createElement("div",{className:"todo-group-status-row",key:s.id},o.createElement("span",null,s.label),o.createElement("span",null,r.filter(l=>Ie(l)===s.id).length)))))}function Tg(){let e=o.useSyncExternalStore(kt,ve,ve),t=nt();return o.createElement("div",{className:"todo-properties-frame","data-plugin-widget-layout":"fill"},o.createElement(h.ui.ScrollPanel,{fill:!0},o.createElement("div",{className:"right-panel-body props-info todo-groups-properties"},o.createElement("div",{className:"todo-status-groups"},[...Ee(t),...e.some(r=>!r.group)?[null]:[]].map(r=>{let n=e.filter(a=>r===null?!a.group:ct(r).has(Z(a.group??""))),i=r??d("todo.chip.noGroup");return o.createElement(xg,{key:r??"ungrouped",label:i,sub:r!==null&&yn(r,t),color:r?ye(Ae(r,t)):"var(--text-tertiary)",todos:n})})))))}function tu(e){let r=["main_workspace","left_sidebar","right_sidebar"].map(n=>Qa(e,{id:`todo.${n}`,surface:n,getSnapshot:i=>yg(n,i),subscribe:wg,restore:(i,a,s)=>vg(i,n,s?.background,a)},{stateSchema:cs,itemStateSchema:{...cs,required:[...cs.required,"todoId"]},description:(i,a)=>typeof i.view.path=="string"&&i.view.path?i.view.path:d(a?"bookmark.item":"bookmark.view")}));return r.push(e.interop.extensions.provide(Ya,{id:"todo.properties",label:"Groups",labelKey:"todo.view.myLists",icon:"group",pluginSurfaces:["main_workspace"],inspect:async({subject:n})=>{let i=n?.item?.id?await Ge(n.item.id):null;return i?Object.entries(i).map(([a,s])=>({id:a,label:d(`todo.field.${a}`),value:s??null,readOnly:!0})):[]},render:()=>o.createElement(Tg,null)})),r.push(Qc()),()=>r.forEach(n=>n())}function ou(e,t,r){let n=new Date().toISOString();return{id:Xt("todo"),title:e.trim(),completed:!1,priority:"normal",dueDate:"",note:"",tags:[],filePath:t,group:r?.trim()||void 0,createdAt:n,updatedAt:n}}function ru(e){let t=e.split("/"),r=t[t.length-1]??"";return r.replace(/\.[^.]+$/,"")||r}function Jo(e,t,r="main_workspace"){let n=o.useRef(be()).current,[i,a]=o.useState(ve()),[s,l]=o.useState(null),[p,c]=o.useState(null),[u,m]=o.useState(null),f=o.useRef(u);f.current=u;let[b,w]=o.useState(!0),[T,P]=o.useState(0),[M,D]=o.useState(!1),{pendingIds:x,isPending:v,setPending:G}=qc(),W=o.useRef(!1),B=o.useRef(0),ee=o.useRef({sortField:e,sortDir:t});ee.current={sortField:e,sortDir:t};let L=o.useRef([]),R=o.useMemo(()=>{let E=new Map(i.map(N=>[N.id,N])),I=new Set(L.current),V=[];for(let N of L.current){let y=E.get(N);y&&V.push(y)}for(let N of i)I.has(N.id)||V.push(N);return V},[i,T]),$=o.useCallback(E=>{let I=++B.current;E&&w(!0),Ve(n).then(V=>{if(n.assertActive(),I===B.current){if(E){let{sortField:N,sortDir:y}=ee.current;L.current=Ro(V,N,y).map(g=>g.id)}else{let N=new Set(V.map(q=>q.id)),y=L.current.filter(q=>N.has(q)),g=new Set(y),{sortField:A,sortDir:k}=ee.current,U=Ro(V.filter(q=>!g.has(q.id)),A,k).map(q=>q.id);L.current=[...U,...y]}St(V),w(!1)}}).catch(()=>{I===B.current&&w(!1)})},[n]);o.useEffect(()=>($(!0),()=>{B.current++}),[$]),o.useEffect(()=>Ot(()=>$(!1)),[$]);let S=o.useRef(!0);o.useEffect(()=>{if(S.current){S.current=!1;return}L.current=Ro(ve(),e,t).map(E=>E.id),P(E=>E+1)},[e,t]),o.useEffect(()=>kt(E=>a(E)),[]);let z=o.useCallback(()=>l(null),[]),C=o.useCallback(E=>{ps(E,r),m(E)},[r]),_=o.useCallback(()=>m(null),[]),H=o.useCallback(async(E,I,V)=>{if(W.current)return null;let N=E.trim();if(!N)return null;let y={...ou(N,I),...V?.patch};W.current=!0,D(!0),L.current=[y.id,...L.current],St([y,...ve()]),l(y.id);let g=()=>{L.current=L.current.filter(A=>A!==y.id),St(ve().filter(A=>A.id!==y.id)),l(A=>A===y.id?null:A)};try{let A=await _n(y);return A||g(),A?y:null}catch{return g(),null}finally{W.current=!1,D(!1)}},[]),O=o.useCallback(async(E,I,V)=>{if(v(E))return!1;let N=ve().find(g=>g.id===E);if(!N)return!1;let y={...N,...I,updatedAt:new Date().toISOString()};G(E,!0),St(ve().map(g=>g.id===E?y:g));try{return await so(E,y,N.updatedAt,V)?!0:(St(ve().map(A=>A.id===E?N:A)),!1)}catch{return St(ve().map(g=>g.id===E?N:g)),!1}finally{G(E,!1)}},[v,G]),F=o.useCallback(async E=>{if(v(E))return;let I=ve().find(N=>N.id===E);if(!I)return;G(E,!0),L.current=L.current.filter(N=>N!==E),St(ve().filter(N=>N.id!==E)),l(N=>N===E?null:N),f.current===E&&m(null);let V=()=>{L.current.includes(E)||L.current.push(E),ve().some(N=>N.id===E)||St([...ve(),I])};try{await Gn(E)||V()}catch{V()}finally{G(E,!1)}},[v,G]),K=o.useMemo(()=>({patchTodo:O,removeTodo:F,openDetail:C,setMenuId:c}),[O,F,C]);return o.useMemo(()=>({todos:i,loading:b,ordered:R,lastCreatedId:s,clearLastCreated:z,menuId:p,setMenuId:c,editingId:u,openDetail:C,closeDetail:_,pendingIds:x,creating:M,create:H,patchTodo:O,removeTodo:F,actions:K}),[i,b,R,s,z,p,u,C,_,x,M,H,O,F,K])}var Sg={tomorrow:"todo.swipe.tomorrow",weekend:"todo.swipe.thisWeekend",pick:"todo.swipe.date"},kg=["tomorrow","weekend","pick"];function Eg(e=ie(new Date)){let t=En(e);if(!t)return e;let r=t.getDay(),n=r===6?1:(6-r+7)%7||7;return mt(e,n)}function ba(e,t=ie(new Date)){let r=e.slice(0,10),n=s=>s==="tomorrow"?mt(t,1):s==="weekend"?Eg(t):null,i=new Set,a=[];for(let s of kg){let l=n(s);if(l!==null){if(l===r||i.has(l))continue;i.add(l)}a.push({id:s,labelKey:Sg[s],date:l})}return a}function Et(e,t,r){let n=new Set(e.map(Z)),i=t.filter(s=>n.has(Z(s.name)));return[...i.filter(s=>!s.parent||!i.some(l=>l.id===s.parent)).map(s=>{let l=r(s.name),p=i.filter(u=>u.parent===s.id).map(u=>r(u.name));if(!p.length)return l;let c=[l,...p];return{label:s.name,..."color"in l?{color:l.color}:{},...l.type==="radio"?{type:"radio",checked:c.some(u=>u.checked===!0)}:{},submenu:c}}),...e.filter(s=>!rt(t,s)).map(r)]}function nu(e,{todo:t,groupNames:r,setOpenId:n,onEdit:i,onPatch:a,onRequestDelete:s,disabled:l=!1}){let p=Ie(t);n(t.id);let c=ba(t.dueDate??"",ie(new Date));return h.ui.openMenu([{label:d("auto.bae7d5be7082"),icon:o.createElement(Fe,{className:"todo-menu-action-icon"}),enabled:!l,submenu:pt().map(u=>({label:u.label,icon:o.createElement(we,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?p==="open":p===u.status,onSelect:()=>a(Se(u.status))}))},{label:d("todo.menu.reschedule"),icon:o.createElement(st,{className:"todo-menu-action-icon"}),enabled:!l,submenu:c.filter(u=>u.date).map(u=>({label:d(u.labelKey),icon:u.id==="tomorrow"?o.createElement(Ir,{className:"todo-menu-action-icon"}):u.id==="weekend"?o.createElement(Hn,{className:"todo-menu-action-icon"}):void 0,onSelect:()=>a({dueDate:u.date})}))},{label:d(t.flagged?"todo.swipe.unflag":"todo.swipe.flag"),icon:o.createElement(ke,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:()=>a({flagged:t.flagged?void 0:!0})},{label:d("auto.886cbff9d9df"),icon:o.createElement(uc,{className:"todo-menu-action-icon"}),enabled:!l,submenu:Be.map(u=>({label:Re(u.id),type:"radio",checked:t.priority===u.id,onSelect:()=>a({priority:u.id})}))},{label:d("todo.menu.moveGroup"),icon:o.createElement(Un,{className:"todo-menu-action-icon"}),enabled:!l,submenu:[{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>a({group:void 0})},...Et(r,Ye(),u=>({label:u,type:"radio",checked:t.group===u,onSelect:()=>a({group:u})}))]},{type:"separator"},{label:d("auto.5301648dcf6b"),icon:o.createElement(pc,{className:"todo-menu-action-icon"}),enabled:!l,onSelect:i},{type:"separator"},{label:d("auto.f6fdbe48dc54"),icon:o.createElement(Kt,{className:"todo-menu-action-icon"}),enabled:!l,danger:!0,onSelect:s}],e).then(()=>{}).finally(()=>n(null))}function ya(e,t){e.target.closest('input, textarea, [contenteditable="true"]')||(e.preventDefault(),e.stopPropagation(),nu({x:e.clientX,y:e.clientY},t))}var au=({todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:i,onRequestDelete:a,disabled:s=!1})=>o.createElement("div",{className:"todo-menu-wrap"},o.createElement("button",{className:"todo-menu-btn","aria-label":d("auto.047d10fd5b0e"),title:d("auto.6bf5da9c080b"),disabled:s,onClick:l=>{l.stopPropagation(),nu({anchor:l.currentTarget,align:"end"},{todo:e,groupNames:t,setOpenId:r,onEdit:n,onPatch:i,onRequestDelete:a,disabled:s})}},o.createElement(ic,null)));var Ag=[".ttf",".otf",".woff",".woff2"],Cg=[".csv"],Dg=[".base"],Ig=[".png",".jpg",".jpeg",".gif",".webp",".bmp",".svg",".avif"],Ng=[".crw",".cr2",".dng",".nef",".heic",".heif",".tif",".tiff"],Lg=[...Ig,...Ng,".ico",".flavicon"];var Pg=[".pdf"],Og=[".mp3",".wav",".m4a",".aac",".flac",".ogg",".oga",".opus",".m4b",".mka",".weba",".3ga"],Mg=[".mp4",".mov",".m4v",".mkv",".webm",".ogv",".3gp",".3g2",".f4v"],_g=[".srt",".vtt",".ass"],Gg=[".stl",".obj",".glb",".gltf"],Rg=[".bin",".mtl"];function ms(e){let t=e.split("/").pop()??e,r=t.lastIndexOf(".");return r>0?t.slice(r).toLowerCase():""}var Fg={type:"core",id:"valley"},Y=(e,t,r,n,i={})=>({kind:e,icon:t,viewer:r,preview:"full",information:["identity"],editable:e==="text"||e==="code",sortGroup:n,owner:Fg,...i});function zg(e){let t={};for(let[r,n]of e)for(let i of r)t[i]=n;return t}var $g=zg([[[".mermaid",".mmd"],Y("diagram","diagram","diagram","documents",{diagramFormat:"mermaid",editable:!0,codeLanguage:"Mermaid"})],[[".puml",".plantuml"],Y("diagram","diagram","diagram","documents",{diagramFormat:"plantuml",editable:!0,codeLanguage:"PlantUML"})],[[".opml"],Y("diagram","outline","diagram","documents",{diagramFormat:"opml"})],[[".mm"],Y("diagram","mindmap","diagram","documents",{diagramFormat:"freemind"})],[[".xmind"],Y("diagram","mindmap","diagram","documents",{diagramFormat:"xmind"})],[Ag,Y("font","font","font","media")],[[".epub",".mobi",".azw3"],Y("ebook","ebook","ebook","documents")],[[".djvu"],Y("djvu","djvu","djvu","documents")],[[".cbz",".cbr"],Y("comic","comic","comic","documents")],[[".md",".markdown"],Y("text","markdown","markdown","notes",{information:["identity","properties","outline"]})],[[".txt",".text"],Y("text","text","text","notes")],[[".json"],Y("json","json","json","data",{editable:!0,codeLanguage:"JSON"})],[[".jsonl"],Y("json","json","jsonl","data",{editable:!0,codeLanguage:"JSONL"})],[Cg,Y("csv","csv","csv","data",{editable:!0,codeLanguage:"CSV"})],[Dg,Y("base","base","fallback","data")],[Lg,Y("image","image","image","media",{information:["identity","dimensions","exif"]})],[Pg,Y("pdf","pdf","pdf","documents",{information:["identity","pages","outline"]})],[Og,Y("audio","audio","audio","media",{information:["identity","media","audio-tags"]})],[Mg,Y("video","video","video","media",{information:["identity","media","video-codec"]})],[_g,Y("text","subtitle","text","media")],[Gg,Y("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[Rg,Y("model3d","model3d","model3d","models",{information:["identity","geometry"]})],[[".doc",".docx"],Y("docx","word","docx","documents",{information:["identity","properties","pages"]})],[[".ppt",".pptx"],Y("pptx","powerpoint","pptx","documents",{information:["identity","properties","pages","outline"]})],[[".odt"],Y("docx","word","opendocument","documents")],[[".ods"],Y("csv","excel","opendocument","data")],[[".odp"],Y("pptx","powerpoint","opendocument","documents")],[[".ts",".mts",".cts"],Y("code","code-ts","code","code",{codeLanguage:"TypeScript"})],[[".js",".mjs",".cjs"],Y("code","code-js","code","code",{codeLanguage:"JavaScript"})],[[".tsx"],Y("code","code-react","code","code",{codeLanguage:"TSX"})],[[".jsx"],Y("code","code-react","code","code",{codeLanguage:"JSX"})],[[".py"],Y("code","code-python","code","code",{codeLanguage:"Python"})],[[".css",".scss",".less"],Y("code","code-css","code","code",{codeLanguage:"CSS"})],[[".html",".htm"],Y("code","code-html","code","code",{codeLanguage:"HTML"})],[[".sh",".zsh",".bash",".fish"],Y("code","code-shell","code","code",{codeLanguage:"Shell"})],[[".yaml",".yml"],Y("code","code","code","code",{codeLanguage:"YAML"})],[[".toml"],Y("code","code-toml","code","code",{codeLanguage:"TOML"})],[[".xml"],Y("code","code-xml","code","code",{codeLanguage:"XML"})],[[".swift"],Y("code","code-swift","code","code",{codeLanguage:"Swift"})],[[".rs"],Y("code","code-rust","code","code",{codeLanguage:"Rust"})],[[".go"],Y("code","code-go","code","code",{codeLanguage:"Go"})],[[".java"],Y("code","code-java","code","code",{codeLanguage:"Java"})],[[".c"],Y("code","code-c","code","code",{codeLanguage:"C"})],[[".h"],Y("code","code-header","code","code",{codeLanguage:"C"})],[[".cpp"],Y("code","code-cpp","code","code",{codeLanguage:"C++"})],[[".asm"],Y("code","code-asm","code","code",{codeLanguage:"Assembly"})],[[".tex",".latex"],Y("code","code-latex","code","code",{codeLanguage:"LaTeX",compiledPreview:"pdf"})],[[".sty",".cls"],Y("code","code-latex","code","code",{codeLanguage:"LaTeX"})],[[".bib"],Y("code","code-latex","code","code",{codeLanguage:"BibTeX"})],[[".typ"],Y("code","code-typst","code","code",{codeLanguage:"Typst",compiledPreview:"pdf"})],[[".canvas"],Y("unsupported","canvas","fallback","data",{preview:"metadata",editable:!1})],[[".excalidraw"],Y("unsupported","excalidraw","fallback","documents",{preview:"metadata",editable:!1})],[[".xls",".xlsx"],Y("csv","excel","csv","data",{preview:"full",editable:!1})],[[".zip",".tar",".gz",".7z",".rar"],Y("unsupported","archive","fallback","other",{preview:"metadata",editable:!1})]]),Ug=Y("unsupported","file","fallback","other",{preview:"metadata",editable:!1});function Kg(e){return $g[ms(e)]??Ug}function Ur(e){return Kg(e).kind}var iu="valley-realm",su="asset";function du(e){return`${iu}://${su}/${encodeURIComponent(e)}`}var jg={pdf:"todo.fileKind.pdf",image:"todo.fileKind.image",audio:"todo.fileKind.audio",video:"todo.fileKind.video",text:"todo.fileKind.text",code:"todo.fileKind.code",csv:"todo.fileKind.csv",json:"todo.fileKind.json",docx:"todo.fileKind.word",pptx:"todo.fileKind.powerpoint",model3d:"todo.fileKind.model3d"};function Vg(e){if(!Number.isFinite(e)||e<0)return"";let t=["B","KB","MB","GB","TB"],r=e,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;let i=n===0||r>=100?0:r>=10?1:2;return`${r.toFixed(i)} ${t[n]}`}function fs(e){let t=jg[Ur(e)];if(t)return d(t);let r=ms(e).replace(".","").toUpperCase();return r?d("todo.fileKind.generic",{p0:r}):d("todo.fileKind.file")}var Bg={image:jn,audio:Vn,video:Bn},lu=({relPath:e,onRemove:t})=>{let[r,n]=o.useState(null),i=Ur(e),a=e.split("/").pop()??e,s=Bg[i]??bt;o.useEffect(()=>{let u=!1;return h.realm.fileInfo(e).then(m=>{u||n(m?.size??null)}),()=>{u=!0}},[e]);let[l,p]=o.useState(0);o.useEffect(()=>h.realm.onChanged(()=>p(u=>u+1)),[]);let c=i==="image"?`${du(e)}?v=${l}`:null;return o.createElement("div",{className:"todo-attach-card"},o.createElement("button",{className:"todo-attach-open",type:"button",onClick:u=>h.workspace.openFile(e,void 0,{newTab:h.ui.hasModKey(u)}),title:e},o.createElement("span",{className:"todo-attach-copy"},o.createElement("span",{className:"todo-attach-name"},a),o.createElement("span",{className:"todo-attach-meta"},fs(e),r!==null&&` \xB7 ${Vg(r)}`)),o.createElement("span",{className:"todo-attach-thumb"},c?o.createElement("img",{src:c,alt:"",loading:"lazy"}):o.createElement(s,null))),t&&o.createElement("button",{className:"todo-attach-remove",type:"button",onClick:t,title:d("todo.removeAttachment"),"aria-label":d("todo.removeAttachmentOf",{p0:a})},o.createElement(ge,null)))};var Hg={image:jn,audio:Vn,video:Bn};function gs({onPick:e,onCancel:t,placeholder:r,autoFocus:n=!0}){let i=o.useRef(null),[a,s]=o.useState([]),[l,p]=o.useState(0),[c,u]=o.useState("idle"),m=o.useRef(null),f=o.useRef(0);o.useEffect(()=>{n&&i.current?.focus()},[n]),o.useEffect(()=>()=>{m.current!==null&&window.clearTimeout(m.current)},[]);let b=T=>{m.current!==null&&window.clearTimeout(m.current);let P=++f.current;if(!T.trim()){s([]),u("idle");return}u("searching"),m.current=window.setTimeout(()=>{h.resources.search({query:T.trim(),kinds:["attachment"],limit:6}).then(M=>{P===f.current&&(s(M),p(0),u("done"))},()=>{P===f.current&&(s([]),u("done"))})},150)},w=T=>(T.value??T.id).trim();return o.createElement("div",{className:"todo-file-search"},o.createElement("div",{className:"todo-location-field"},o.createElement(ht,{className:"todo-location-field-icon"}),o.createElement("input",{ref:i,className:"todo-location-field-input",type:"text",placeholder:r,"aria-label":r,autoComplete:"off",spellCheck:!1,onChange:T=>b(T.currentTarget.value),onKeyDown:T=>{T.nativeEvent.isComposing||(T.key==="ArrowDown"&&a.length?(T.preventDefault(),p(P=>(P+1)%a.length)):T.key==="ArrowUp"&&a.length?(T.preventDefault(),p(P=>P<=0?a.length-1:P-1)):T.key==="Enter"?(T.preventDefault(),a[l]&&e(w(a[l]))):T.key==="Escape"&&(T.preventDefault(),T.stopPropagation(),t?.()))}}),t&&o.createElement("button",{type:"button",className:"todo-file-search-cancel","aria-label":d("auto.77dfd2135f4d"),title:d("auto.77dfd2135f4d"),onClick:t},o.createElement(ge,null))),c!=="idle"&&o.createElement("ul",{className:"todo-file-search-hits",role:"listbox","aria-label":r},c==="searching"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.location.searching")),c==="done"&&!a.length&&o.createElement("li",{className:"todo-location-status"},d("todo.file.noResults")),a.map((T,P)=>{let M=w(T),D=Hg[Ur(M)]??bt,x=M.includes("/")?M.slice(0,M.lastIndexOf("/")):"";return o.createElement("li",{key:T.id,role:"option","aria-selected":P===l},o.createElement("button",{type:"button",className:"todo-file-search-hit"+(P===l?" is-active":""),onMouseDown:v=>v.preventDefault(),onMouseEnter:()=>p(P),onClick:()=>e(M)},o.createElement(D,{className:"todo-file-search-glyph"}),o.createElement("span",{className:"todo-file-search-text"},o.createElement("span",{className:"todo-file-search-name"},T.label||M.split("/").pop()),x&&o.createElement("span",{className:"todo-file-search-folder"},x))))})))}var Wg=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],cu=e=>{let[t,r]=(e||ie(new Date)).split("-").map(Number);return new Date(t,r-1,1)};function Bt({value:e,onChange:t}){let[r,n]=o.useState(()=>cu(e)),i=h.ui.language(),a=Math.max(0,Wg.indexOf(String(h.getState().weekStart??"monday").toLowerCase())),s=ie(new Date),l=r.getFullYear(),p=r.getMonth(),c=(new Date(l,p,1).getDay()-a+7)%7,u=Array.from({length:42},(w,T)=>new Date(l,p,1-c+T)),m=Array.from({length:7},(w,T)=>new Intl.DateTimeFormat(i,{weekday:"narrow"}).format(new Date(2024,0,7+(a+T)%7))),f=new Intl.DateTimeFormat(i,{month:"long",year:"numeric"}).format(r),b=w=>n(new Date(l,p+w,1));return o.createElement("div",{className:"todo-calendar",role:"group","aria-label":d("todo.field.dueDate")},o.createElement("div",{className:"todo-calendar-head"},o.createElement("span",{className:"todo-calendar-title"},f),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.prev"),onClick:()=>b(-1)},o.createElement(Yn,null)),o.createElement("button",{type:"button",className:"todo-calendar-nav","aria-label":d("todo.calendar.next"),onClick:()=>b(1)},o.createElement(Bo,null))),o.createElement("div",{className:"todo-calendar-grid"},m.map((w,T)=>o.createElement("span",{key:`w${T}`,className:"todo-calendar-weekday"},w)),u.map(w=>{let T=ie(w),P=w.getMonth()!==p;return o.createElement("button",{key:T,type:"button",className:"todo-calendar-day"+(P?" is-outside":"")+(T===s?" is-today":"")+(T===e?" is-selected":""),"aria-pressed":T===e,"aria-label":new Intl.DateTimeFormat(i,{dateStyle:"full"}).format(w),onClick:()=>t(T)},w.getDate())})),o.createElement("div",{className:"todo-calendar-foot"},o.createElement("button",{type:"button",className:"todo-calendar-link",disabled:!e,onClick:()=>t("")},d("todo.calendar.clear")),o.createElement("button",{type:"button",className:"todo-calendar-link",onClick:()=>{n(cu(s)),t(s)}},d("todo.due.today"))))}function qg(e){let t=e.trim(),r=/^(\d{1,2}):?(\d{2})$/.exec(t);if(!r)return null;let n=Number(r[1]),i=Number(r[2]);return n>23||i>59?null:`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function Kr({value:e,onChange:t,ariaLabel:r,placeholder:n,disabled:i}){let[a,s]=o.useState(e),[l,p]=o.useState(!1);o.useEffect(()=>{s(e),p(!1)},[e]);let c=()=>{if(!a.trim()){p(!1),e&&t("");return}let u=qg(a);if(!u){p(!0);return}p(!1),s(u),u!==e&&t(u)};return o.createElement("input",{className:"settings-control todo-clock-input"+(l?" is-invalid":""),type:"text",inputMode:"numeric",maxLength:5,value:a,placeholder:n??"hh:mm","aria-label":r,"aria-invalid":l||void 0,title:l?d("todo.time.invalid"):void 0,disabled:i,autoComplete:"off",spellCheck:!1,onChange:u=>{let m=u.currentTarget.value.replace(/[^\d:]/g,""),f=m.indexOf(":");s(f<0?m:m.slice(0,f+1)+m.slice(f+1).replace(/:/g,"")),p(!1)},onBlur:c,onKeyDown:u=>{u.key==="Enter"&&(u.preventDefault(),c())}})}function wa({value:e,onChange:t,autoFocus:r=!1,disabled:n=!1,bare:i=!1}){let a=o.useRef(null),s=l=>{let p=l.split(/[\s,]+/).map(u=>u.trim().replace(/^#+/,"")).filter(Boolean),c=[...e];for(let u of p)c.some(m=>m.toLowerCase()===u.toLowerCase())||c.push(u);return c.length===e.length?!1:(t(c),!0)};return o.useEffect(()=>{r&&a.current?.focus()},[r]),o.createElement("div",{className:`todo-tags-input${i?" is-bare":""}`,onMouseDown:l=>{l.target===l.currentTarget&&(l.preventDefault(),a.current?.focus())}},e.map(l=>o.createElement("span",{key:l,className:"todo-tags-chip"},o.createElement("span",null,"#",l),o.createElement("button",{type:"button",className:"todo-tags-chip-remove",disabled:n,"aria-label":d("todo.compose.removeTag",{tag:l}),title:d("todo.compose.removeTag",{tag:l}),onClick:()=>{t(e.filter(p=>p!==l)),a.current?.focus()}},o.createElement(ge,null)))),o.createElement("input",{ref:a,className:"todo-tags-field",type:"text",disabled:n,placeholder:e.length?"":d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),autoComplete:"off",spellCheck:!1,onKeyDown:l=>{let p=l.currentTarget;l.nativeEvent.isComposing||(l.key==="Enter"||l.key===","||l.key===" "&&p.value.trim()?(l.preventDefault(),s(p.value)&&(p.value="")):l.key==="Backspace"&&!p.value&&e.length&&(l.preventDefault(),t(e.slice(0,-1))))},onBlur:l=>{s(l.currentTarget.value)&&(l.currentTarget.value="")},onPaste:l=>{let p=l.clipboardData.getData("text/plain");/[\s,]/.test(p.trim())&&(l.preventDefault(),s(l.currentTarget.value+p),l.currentTarget.value="")}}))}var ot=({priority:e})=>o.createElement(e==="high"?Wn:e==="medium"?wc:e==="low"?qn:Sc,{className:`todo-table-priority-icon todo-priority-${e}`});function uu({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[i,a]=o.useState(e.startTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Bt,{value:r,onChange:s=>{n(s),s||a(""),t(s?{dueDate:s}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement(Kr,{value:i,disabled:!r,ariaLabel:d("todo.field.startTime"),onChange:s=>{a(s),t({startTime:s||void 0})}}))}function va({initial:e,onInput:t,onDone:r}){return o.createElement("textarea",{className:"todo-cell-notes",defaultValue:e,rows:7,autoFocus:!0,"aria-label":d("todo.edit.notes"),onChange:n=>t(n.target.value),onKeyDown:n=>{n.key==="Enter"&&h.ui.hasModKey(n)&&(n.preventDefault(),r())}})}function xa({todo:e,onPatch:t}){let[r,n]=o.useState(e.tags??[]);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(wa,{value:r,autoFocus:!0,onChange:i=>{n(i),t({tags:i})}}))}function Ta({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Ho,{value:r,autoFocus:!0,onChange:i=>{n(i),t({location:i})}}))}function Qo(e){return e.split(`
`).map(t=>t.trim()).find(Boolean)??""}function Yg(e,t,r=.55){return t<=0?0:e*t*r/(t+r*Math.abs(e))}function Xg(e,t=.998){return e/1e3*t/(1-t)}function pu(e,t=60){let r=e[e.length-1];if(!r)return 0;let n=r;for(let a=e.length-1;a>=0&&(n=e[a],!(r.t-n.t>=t));a--);let i=r.t-n.t;return i>0?(r.x-n.x)/i*1e3:0}function mu(e,t,r){if(t<=0)return 0;let n=Math.abs(e);if(n<=t)return e;let i=Math.max(20,r-t);return Math.sign(e)*(t+Yg(n-t,i,.2))}function fu(e){if(e.committed)return{target:0,commit:!0};let t=e.openWidth;if(t<=0)return{target:0,commit:!1};let r=e.offset<0?-1:1,n=Math.abs(e.offset),i=Math.max(-t,Math.min(t,Xg(e.velocity*r))),a=n+i;return{target:Math.abs(a-t)<Math.abs(a)?r*t:0,commit:!1}}function gu(e,t,r,n,i,a){let s=Math.min(Math.max(n,.008333333333333333),.03333333333333333),l=(2*Math.PI/i)**2,p=2*a*Math.sqrt(l),c=t+(-l*(e-r)-p*t)*s,u=e+c*s,m=Math.abs(u-r)<.5&&Math.abs(c)<20;return{value:m?r:u,velocity:m?0:c,done:m}}function hs(e,t,r){let n=t.length;if(!n)return{buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};let i=e>88,a=i?e-88:n*48,s=Math.max(56,Math.ceil(Math.max(...t))+22),l=n*s<=a+(r?24:0),p=l?s:48,c=Math.min(n*p,Math.max(a,n*32)),u=i?Math.min(Math.max(e*.8,c+56),e-24):c+56;return{buttonWidth:p,labelled:l,openWidth:c,commitPoint:u}}var hu=.22,bu=.18,Zg=.8,Sa=.9,Jg=400,Qg=80,eh=10,th=5,oh=4,rh=3,nh=.5,ah=6,ih=["left","right"],yu={buttonWidth:0,labelled:!1,openWidth:0,commitPoint:0};function sh(e,t,r,n,i,a){return{kind:e,pointerId:t,originX:r,originY:n,base:i,origin:a,live:!1,distance:0,peak:0,previous:0,decay:0,crossed:!1,ended:!1}}function dh(e,t){let r={today:o.createElement(Ir,null),tomorrow:o.createElement(Ir,null),weekend:o.createElement(Hn,null),pick:o.createElement(st,null)};return e.map(n=>({key:n.id,label:d(n.labelKey),cls:`todo-swipe-action todo-swipe-${n.id}`,icon:r[n.id],run:i=>{n.date?t.reschedule(n.date):t.pickDate(i)}}))}var Vr=null;function wu(e){if(Vr===e)return;let t=Vr;Vr=e,t?.close()}function vu(e){Vr===e&&(Vr=null)}var er;function xu(e,t){if(er===void 0)try{er=document.createElement("canvas").getContext("2d")}catch{er=null}return er?(er.font=t,er.measureText(e).width):e.length*7}var lh=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,jr=e=>e>0?"left":e<0?"right":null,Tu=({todo:e,disabled:t,actions:r,onEngage:n,children:i})=>{let a=o.useRef(null),s=o.useRef(null),l=o.useRef({left:null,right:null}),p=o.useRef(0),c=o.useRef(null),u=o.useRef(null),m=o.useRef([]),f=o.useRef(!1),b=o.useRef(null),w=o.useRef(null),T=o.useRef({velocity:0,target:0,response:hu,damping:Sa}),P=o.useRef({left:"",right:""}),M=o.useMemo(()=>dh(ba(e.dueDate??"",ie(new Date)),r),[e.dueDate,r]),D=o.useMemo(()=>[{key:"flag",label:d(e.flagged?"todo.swipe.unflag":"todo.swipe.flag"),cls:"todo-swipe-action todo-swipe-flag",icon:o.createElement(ke,null),run:()=>r.toggleFlag()},{key:"details",label:d("todo.details"),cls:"todo-swipe-action todo-swipe-details",icon:o.createElement(sc,null),run:()=>r.openDetails()},{key:"delete",label:d("todo.swipe.delete"),cls:"todo-swipe-action todo-swipe-delete",icon:o.createElement(Kt,null),run:()=>r.remove()}],[r,e.flagged]),x={left:M,right:D},[v,G]=o.useState(()=>({rowWidth:0,left:yu,right:yu})),W=o.useRef(v);W.current=v;let B=()=>{let g=a.current?.querySelector(".todo-swipe-action");if(!g||typeof getComputedStyle!="function")return"13px sans-serif";let A=getComputedStyle(g);return`${A.fontWeight} ${A.fontSize} ${A.fontFamily}`},ee=()=>{let g=a.current?.clientWidth??0,A=B(),k=W.current,U={rowWidth:g,left:hs(g,M.map(J=>xu(J.label,A)),k.left.labelled),right:hs(g,D.map(J=>xu(J.label,A)),k.right.labelled)};W.current=U;let q=J=>k[J].openWidth!==U[J].openWidth||k[J].labelled!==U[J].labelled;return(k.rowWidth!==g||q("left")||q("right"))&&G(U),U},L=o.useRef(ee);L.current=ee,o.useEffect(()=>{L.current()},[M,D]);let R=g=>{let A=jr(g);return!A||A!==u.current?!1:Math.abs(g)>=W.current[A].commitPoint},$=(g,A=!1)=>{p.current=g,A&&g!==0?wu(H.current):g===0&&vu(H.current);let k=a.current,U=s.current;if(!k||!U)return;U.style.transform=g?`translate3d(${g}px, 0, 0)`:"";let q=jr(g),J=W.current,ce=R(g);k.classList.toggle("open",g!==0),k.classList.toggle("committed",ce);for(let de of ih){let te=l.current[de];if(!te)continue;let me=q===de;te.classList.toggle("committed",me&&ce);let We=me?ce?"100%":`${Math.max(J[de].openWidth,Math.abs(g))}px`:`${g===0?J[de].openWidth:0}px`,ze=`${We}|${me}`;P.current[de]!==ze&&(P.current[de]=ze,te.style.width=We,te.setAttribute("aria-hidden",String(!me)))}};o.useLayoutEffect(()=>$(p.current));let S=()=>{b.current!=null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(b.current),b.current=null},z=(g,A,k,U)=>{if(S(),g!==0&&wu(H.current),p.current===g||lh()||typeof requestAnimationFrame!="function"){$(g);return}T.current={velocity:A,target:g,response:k,damping:U};let q=0,J=ce=>{let de=q?(ce-q)/1e3:.016666666666666666;q=ce;let te=T.current,me=gu(p.current,te.velocity,te.target,de,te.response,te.damping);te.velocity=me.velocity,$(me.value),b.current=me.done?null:requestAnimationFrame(J)};b.current=requestAnimationFrame(J)},C=o.useRef(()=>{});C.current=()=>{c.current=null,z(0,0,bu,Sa)};let _=o.useCallback(()=>C.current(),[]),H=o.useRef({close:()=>C.current()}),O=()=>{S(),c.current=null,w.current!=null&&window.clearTimeout(w.current),w.current=null,$(0)},F=o.useRef(O);F.current=O;let K=g=>{let A=W.current,k=jr(g);if(!k)return 0;let U=c.current?.origin;if(U&&k!==U)return 0;let q=A[k],J=k===u.current?q.commitPoint:q.openWidth;return mu(g,J,A.rowWidth)},E=(g,A,k,U,q)=>{S(),ee();let J=p.current,ce=jr(J),de=Math.abs(J)>8?ce:null;u.current=ce&&Math.abs(J)>=W.current[ce].openWidth-1?ce:null,c.current=sh(g,A,k,U,J,de),m.current=[{x:J,t:q}]},I=(g,A)=>{let k=c.current;!k||k.ended||(k.live||(k.live=!0,S(),n?.()),m.current.push({x:g,t:A}),m.current.length>ah&&m.current.shift(),$(K(g),!0),R(p.current)&&(k.crossed=!0))},V=g=>{let A=c.current;if(!A||A.ended)return;if(A.ended=!0,!A.live){c.current=null;return}let k=()=>{A.kind==="pointer"&&(c.current=null)},U=pu(m.current),q=p.current,J=jr(q);if(!J){k(),$(0);return}let ce=W.current[J],de=g&&R(q),te=fu({offset:q,velocity:U,openWidth:ce.openWidth,committed:de});if(k(),te.commit){let me=J==="left"?".todo-swipe-tray-left button":".todo-swipe-tray-right button:last-child",We=a.current?.querySelector(me),ze=x[J],Ct=J==="left"?ze[0]:ze[ze.length-1];z(0,U,bu,Sa),Ct?.run(We??a.current);return}z(te.target,U,hu,Math.abs(U)>Jg?Zg:Sa)};o.useEffect(()=>_(),[e.dueDate,e.flagged,_]),o.useEffect(()=>{let g=H.current;return()=>{S(),w.current!=null&&window.clearTimeout(w.current),vu(g)}},[]),o.useEffect(()=>{let g=a.current,A=g?.ownerDocument.defaultView?.ResizeObserver??globalThis.ResizeObserver;if(!g||!A)return;let k=0,U=new A(()=>{let q=g.clientWidth,J=k!==q;k=q,L.current(),J&&p.current!==0&&F.current()});return U.observe(g),()=>U.disconnect()},[]);let N=o.useRef({disabled:t,begin:E,move:I,end:V});N.current={disabled:t,begin:E,move:I,end:V},o.useEffect(()=>{let g=a.current;if(!g)return;let A=()=>{w.current!=null&&window.clearTimeout(w.current),w.current=null},k=()=>{w.current=null,c.current?.kind==="wheel"&&(N.current.end(!0),c.current=null)},U=q=>{let J=N.current;if(J.disabled||Math.abs(q.deltaX)<=Math.abs(q.deltaY)||q.deltaX===0)return;q.preventDefault();let ce=q.deltaMode===WheelEvent.DOM_DELTA_LINE?16:q.deltaMode===WheelEvent.DOM_DELTA_PAGE?g.clientWidth:1,de=-q.deltaX*ce,te=c.current;(!te||te.kind!=="wheel")&&(J.begin("wheel",-1,0,0,q.timeStamp),te=c.current),A(),w.current=window.setTimeout(k,Qg);let me=Math.abs(de),We=te.previous;te.previous=me;let ze=te.live&&(te.ended||te.origin!==null&&p.current===0),Ct=me>=We+th,qe=te.distance!==0&&Math.sign(de)!==Math.sign(te.distance)&&me>=oh;if(ze&&(Ct||qe)&&(J.end(!1),J.begin("wheel",-1,0,0,q.timeStamp),te=c.current,te.previous=me),te.ended)return;if(te.decay=me<We?te.decay+1:0,te.peak=Math.max(te.peak,me),te.distance+=de,te.live&&te.peak>=eh&&te.decay>=rh&&me<te.peak*nh){J.end(te.crossed);return}!te.live&&Math.abs(te.distance)<8||J.move(te.base+te.distance,q.timeStamp)};return g.addEventListener("wheel",U,{passive:!1}),()=>{g.removeEventListener("wheel",U),A()}},[]);let y=(g,A)=>o.createElement("div",{ref:k=>{l.current[g]=k},className:`todo-swipe-tray todo-swipe-tray-${g} ${v[g].labelled?"labelled":"icons"}`,"aria-hidden":!0,style:{width:`${v[g].openWidth}px`}},A.map(k=>o.createElement("button",{key:k.key,type:"button",className:k.cls,tabIndex:-1,title:k.label,"aria-label":k.label,onClick:U=>{U.stopPropagation(),_(),k.run(U.currentTarget)}},k.icon,o.createElement("span",null,k.label))));return o.createElement("div",{ref:a,className:"todo-swipe","data-visible-key":e.id,onPointerDown:g=>{t||g.pointerType==="mouse"&&g.button!==0||g.target.closest(".todo-swipe-tray")||E("pointer",g.pointerId,g.clientX,g.clientY,g.timeStamp)},onPointerMove:g=>{let A=c.current;if(!A||A.kind!=="pointer"||A.pointerId!==g.pointerId)return;let k=g.clientX-A.originX,U=g.clientY-A.originY;if(!A.live){if(Math.abs(U)>Math.abs(k)){g.currentTarget.hasPointerCapture?.(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),c.current=null;return}if(Math.abs(k)<8)return;f.current=!0,g.currentTarget.setPointerCapture?.(g.pointerId)}g.preventDefault(),I(A.base+k,g.timeStamp)},onPointerUp:g=>{let A=c.current;!A||A.kind!=="pointer"||A.pointerId!==g.pointerId||(g.currentTarget.hasPointerCapture?.(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),A.live&&I(A.base+(g.clientX-A.originX),g.timeStamp),V(!0))},onPointerCancel:g=>{let A=c.current;!A||A.kind!=="pointer"||A.pointerId!==g.pointerId||(g.currentTarget.hasPointerCapture?.(g.pointerId)&&g.currentTarget.releasePointerCapture(g.pointerId),_())},onClickCapture:g=>{let A=!!g.target.closest(".todo-swipe-tray");if(A&&(f.current=!1),f.current&&!A){f.current=!1,g.stopPropagation(),g.preventDefault();return}p.current&&!A&&(g.stopPropagation(),g.preventDefault(),_())}},M.length>0&&y("left",M),o.createElement("div",{ref:s,className:"todo-swipe-surface"},i),D.length>0&&y("right",D))};function Br(e,t,r){let n=Ie(t);h.ui.openMenu(pt().map(i=>({label:i.label,icon:o.createElement(we,{status:i.status,dotCls:i.cls,color:i.color}),type:"radio",checked:i.status===null?n==="open":i.status===n,onSelect:()=>r(Se(i.status))})),{anchor:e})}function ys(e,t=500,r){let n=o.useRef(e);n.current=e;let i=o.useRef(null),a=o.useRef(!1),s=o.useRef(null),l=o.useRef(0),p=o.useRef(r);p.current=r;let c=o.useCallback(async()=>{if(a.current)return;let u=i.current;if(u!==null){i.current=null,a.current=!0;try{let m=await n.current(u);!m&&i.current===null&&(i.current=u),m?l.current=0:l.current+=1}catch{i.current===null&&(i.current=u),l.current+=1}finally{a.current=!1,i.current!==null&&l.current<3?s.current=window.setTimeout(()=>{c()},250):i.current!==null&&p.current?.()}}},[]);return o.useEffect(()=>()=>{s.current!=null&&window.clearTimeout(s.current),c()},[c]),o.useCallback(u=>{i.current=u,l.current=0,s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{s.current=null,c()},t)},[c,t])}function ch({value:e,onCommit:t,ariaLabel:r,placeholder:n,type:i="text",className:a}){let[s,l]=o.useState(e),p=o.useRef(!1);o.useEffect(()=>{p.current||l(e)},[e]);let c=()=>{s!==e&&t(s)};return o.createElement("input",{className:a,type:i,value:s,"aria-label":r,placeholder:n,onFocus:()=>{p.current=!0},onChange:u=>l(u.target.value),onBlur:()=>{p.current=!1,c()},onKeyDown:u=>{u.key==="Enter"&&u.currentTarget.blur(),u.key==="Escape"&&(l(e),u.currentTarget.blur())}})}function uh(e){let t=h.runtime.getOrCreate("todo.detailDrafts",()=>new Map),r=t.get(e);return r||(r={value:{title:null,note:null,tags:null,error:""},listeners:new Set},t.set(e,r)),r}var ph=({todoId:e,c:t,close:r})=>{let[n,i]=o.useState(ve);o.useEffect(()=>kt(i),[]);let a=n.find(y=>y.id===e),s=Od(e),l=nt(),[p,c]=o.useState(!1),[u,m]=o.useState(!1),[f,b]=o.useState(!1),[w,T]=o.useState(!1),P=o.useRef(null),[M,D]=o.useState(""),x=uh(e),v=o.useSyncExternalStore(o.useCallback(y=>(x.listeners.add(y),()=>{x.listeners.delete(y)}),[x]),()=>x.value,()=>x.value),G=o.useCallback(y=>{x.value={...x.value,...y};for(let g of x.listeners)g()},[x]),W=v.title,B=y=>G({title:y}),ee=()=>G({error:d("todo.error.saveDraft")});o.useEffect(()=>{x.revision||x.loadingRevision||(x.loadingRevision=h.documents.read({pluginId:"todo",sourceId:"tasks",itemId:e}).then(y=>{y&&!x.revision&&(x.revision={expectedRevision:y.revision,realmGeneration:y.realmGeneration})}).catch(()=>{G({error:d("todo.error.saveDraft")})}).finally(()=>{x.loadingRevision=void 0}))},[x,e,G]);let L=async y=>(x.revision||await x.loadingRevision,x.revision?t.patchTodo(e,y,x.revision):!1),R=ys(async y=>{let g=y.trim()?await L({title:y}):!0;return g&&x.value.title===y&&G({title:null,error:""}),g},500,ee),$=ys(async y=>{let g=await L({note:y});return g&&x.value.note===y&&G({note:null,error:""}),g},500,ee),S=ys(async y=>{let g=JSON.parse(y),A=await L({tags:g});return A&&JSON.stringify(x.value.tags)===y&&G({tags:null,error:""}),A},0,ee);if(o.useEffect(()=>{!a&&!t.loading&&r()},[a,t.loading,r]),!a)return null;let z=y=>{L(y).then(g=>{g||ee()})},C=y=>{G({tags:y}),S(JSON.stringify(y))},_=y=>z({attachments:y.length?y:void 0}),H=y=>z({urls:y.length?y:void 0}),O=Ee(l);P.current||(P.current=structuredClone(a));let F=()=>{let y=P.current;y&&(R(y.title),$(y.note),z({tags:y.tags,status:y.status,completed:y.completed,priority:y.priority,dueDate:y.dueDate,startTime:y.startTime,endTime:y.endTime,group:y.group,location:y.location,flagged:y.flagged,attachments:y.attachments,urls:y.urls,filePath:y.filePath})),G({title:null,note:null,tags:null,error:""}),r()},K=Ie(a),E=ie(),I=a.dueDate?`${Xe(a.dueDate.slice(0,10),E,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},h.ui.language(),h.getState().dateFormat)}${a.startTime?` \xB7 ${a.startTime}${a.endTime?`\u2013${a.endTime}`:""}`:""}`:"",V=(y,g,A,k=300)=>{h.ui.openPopover(A,{anchor:y,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:g,width:k})},N=(y,g,A,k,U,q="")=>o.createElement("button",{key:y,type:"button",className:`todo-sheet-chip${A?"":" is-empty"}${q?` ${q}`:""}`,"aria-label":A?`${k}: ${A}`:k,title:y==="place"&&a.location?a.location.name:void 0,onClick:J=>U(J.currentTarget)},g,o.createElement("span",null,A||k));return o.createElement(h.ui.Modal,{title:d("todo.edit.title"),size:"medium",bodyClassName:"todo-detail-body todo-sheet-body",onClose:r,footer:o.createElement("div",{className:"todo-detail-footer"},o.createElement("button",{type:"button",className:"todo-sheet-delete",onClick:()=>{r(),zt(a,t.removeTodo).then(y=>{y||t.openDetail(a.id)})}},o.createElement(Kt,null),d("auto.f6fdbe48dc54")),o.createElement("button",{type:"button",className:"todo-sheet-cancel",onClick:F},d("auto.77dfd2135f4d")),o.createElement("button",{type:"button",className:"btn-primary",onClick:r},d("todo.edit.done")))},o.createElement("div",{className:"todo-sheet"},v.error&&o.createElement("p",{role:"alert"},v.error),o.createElement("div",{className:"todo-sheet-head"},o.createElement("button",{type:"button",className:"todo-sheet-status","data-status":K,title:et(K),"aria-label":`${d("auto.bae7d5be7082")}: ${et(K)}`,onClick:y=>Br(y.currentTarget,a,g=>z(g))},o.createElement(we,{status:K==="open"?null:K,dotCls:Te(K).cls})),o.createElement("input",{className:"todo-sheet-title","data-modal-initial-focus":"true",value:W??a.title,"aria-label":d("auto.c5e8306a511f"),onChange:y=>{B(y.target.value),R(y.target.value)},onBlur:()=>{W===a.title&&B(null)},onKeyDown:y=>{y.key==="Enter"&&r()}}),o.createElement("button",{className:`todo-sheet-flag${a.flagged?" on":""}`,type:"button",onClick:()=>z({flagged:a.flagged?void 0:!0}),"aria-pressed":!!a.flagged,title:d("todo.flag"),"aria-label":d("todo.flag")},o.createElement(ke,null))),o.createElement("textarea",{className:"todo-sheet-notes",value:v.note??a.note,"aria-label":d("todo.edit.notes"),placeholder:d("todo.sheet.notesPlaceholder"),rows:3,onChange:y=>{let g=y.target.value;G({note:g}),$(g)}}),o.createElement("div",{className:"todo-sheet-chips"},N("status",o.createElement(we,{status:K==="open"?null:K,dotCls:Te(K).cls}),K==="open"?"":et(K),d("auto.bae7d5be7082"),y=>Br(y,a,g=>z(g))),N("due",o.createElement(st,null),I,d("todo.sheet.date"),y=>V(y,d("todo.edit.schedule"),()=>o.createElement(mh,{todo:a,onPatch:z}),280),a.dueDate&&a.dueDate.slice(0,10)<E&&!a.completed?"is-overdue":""),N("group",o.createElement("span",{className:"todo-sheet-dot",style:a.group?{background:ye(Ae(a.group,l))}:void 0}),a.group??"",d("todo.edit.group"),y=>{h.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!a.group,onSelect:()=>z({group:void 0})},...Et(O,l,g=>({label:g,type:"radio",checked:a.group===g,color:Ae(g,l),onSelect:()=>z({group:g})}))],{anchor:y,align:"start"})}),N("place",o.createElement(He,null),a.location?.name.split(",")[0].trim()??"",d("todo.sheet.place"),y=>V(y,d("todo.location"),()=>o.createElement(fh,{todo:a,onPatch:z}),320)),N("priority",o.createElement(ot,{priority:a.priority}),a.priority==="normal"?"":Re(a.priority),d("auto.886cbff9d9df"),y=>{h.ui.openMenu(Be.map(g=>({label:Re(g.id),icon:o.createElement(ot,{priority:g.id}),type:"radio",checked:a.priority===g.id,onSelect:()=>z({priority:g.id})})),{anchor:y,align:"start"})})),o.createElement(wa,{value:v.tags??a.tags??[],onChange:C,bare:!0}),((a.attachments??[]).length>0||p)&&o.createElement("div",{className:"todo-sheet-section todo-sheet-attachments"},(a.attachments??[]).map(y=>o.createElement(lu,{key:y,relPath:y,onRemove:()=>_((a.attachments??[]).filter(g=>g!==y))})),p&&o.createElement(gs,{placeholder:d("todo.file.searchAttachment"),onCancel:()=>c(!1),onPick:y=>{(a.attachments??[]).includes(y)||_([...a.attachments??[],y]),c(!1)}})),((a.urls??[]).length>0||u||a.filePath||f)&&o.createElement("div",{className:"todo-sheet-section"},a.filePath&&o.createElement("div",{className:"todo-detail-url-card"},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:a.filePath,onClick:y=>h.workspace.openFile(a.filePath,void 0,{newTab:h.ui.hasModKey(y)})},o.createElement(bt,null),o.createElement("span",null,a.filePath.split("/").pop()),o.createElement("span",{className:"todo-sheet-muted"},d("todo.linkedFile"))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.sheet.unlinkFile"),"aria-label":d("todo.sheet.unlinkFile"),onClick:()=>z({filePath:void 0})},o.createElement(ge,null))),f&&!a.filePath&&o.createElement(gs,{placeholder:d("todo.file.searchLinked"),onCancel:()=>b(!1),onPick:y=>{z({filePath:y}),b(!1)}}),(a.urls??[]).map(y=>o.createElement("div",{className:"todo-detail-url-card",key:y},o.createElement("button",{className:"todo-detail-url-open",type:"button",title:y,onClick:g=>{let A=ko(y);A?h.workspace.openFile(A,void 0,{newTab:h.ui.hasModKey(g)}):h.files.openExternalUrl(y)}},o.createElement(lo,null),o.createElement("span",null,gh(y))),o.createElement("button",{className:"todo-detail-url-remove",type:"button",title:d("todo.removeUrl"),"aria-label":d("todo.removeUrlOf",{p0:y}),onClick:()=>H((a.urls??[]).filter(g=>g!==y))},o.createElement(ge,null)))),u&&o.createElement(ch,{className:"todo-detail-link-input todo-detail-url",value:M,onCommit:y=>{let g=hi(y);g&&!(a.urls??[]).includes(g)&&H([...a.urls??[],g]),D(""),m(!1)},placeholder:d("todo.urlPlaceholder"),ariaLabel:d("todo.url")})),w&&s.length>0&&o.createElement("ol",{className:"todo-activity-list todo-sheet-section"},[...s].reverse().map((y,g)=>o.createElement("li",{key:`${y.changedAt}:${g}`},o.createElement("span",null,et(y.from)," \u2192 ",et(y.to)),o.createElement("time",{dateTime:y.changedAt},new Date(y.changedAt).toLocaleString(h.ui.language()))))),o.createElement("div",{className:"todo-sheet-adds"},o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>c(!0)},o.createElement(Vt,null)," ",d("todo.sheet.attachment")),o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>m(!0)},o.createElement(lo,null)," ",d("todo.sheet.link")),!a.filePath&&o.createElement("button",{className:"todo-detail-add",type:"button",onClick:()=>b(!0)},o.createElement(bt,null)," ",d("todo.linkedFile")),s.length>0&&o.createElement("button",{className:"todo-detail-add todo-sheet-activity",type:"button","aria-expanded":w,onClick:()=>T(y=>!y)},d("todo.activity")," (",s.length,")"))))};function mh({todo:e,onPatch:t}){let[r,n]=o.useState(e.dueDate?.slice(0,10)??""),[i,a]=o.useState(e.startTime??""),[s,l]=o.useState(e.endTime??"");return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Bt,{value:r,onChange:p=>{n(p),p||(a(""),l("")),t(p?{dueDate:p}:{dueDate:"",startTime:void 0,endTime:void 0})}}),o.createElement("div",{className:"todo-sheet-times"},o.createElement(Kr,{value:i,disabled:!r,ariaLabel:d("auto.88d8206d586a"),placeholder:d("auto.88d8206d586a"),onChange:p=>{a(p),t({startTime:p||void 0,...p?{}:{endTime:void 0}}),p||l("")}}),o.createElement(Kr,{value:s,disabled:!i,ariaLabel:d("auto.cd7800da7f4f"),placeholder:d("auto.cd7800da7f4f"),onChange:p=>{if(p&&i&&p<=i){l(s);return}l(p),t({endTime:p||void 0})}})))}function fh({todo:e,onPatch:t}){let[r,n]=o.useState(e.location);return o.createElement("div",{className:"todo-cell-editor"},o.createElement(Ho,{value:r,autoFocus:!0,onChange:i=>{n(i),t({location:i})}}))}function gh(e){try{let t=new URL(e),r=`${t.pathname==="/"?"":t.pathname}${t.search}${t.hash}`;return`${t.hostname.replace(/^www\./,"")}${r}`}catch{return e}}var tr=({c:e})=>e.editingId?o.createElement(ph,{key:e.editingId,todoId:e.editingId,c:e,close:e.closeDetail}):null;function hh(e){for(let t=e;t;t=t.parentElement)if(/(auto|scroll)/.test(getComputedStyle(t).overflowY)&&(!t.clientHeight||t.scrollHeight>t.clientHeight+1))return t;return e.ownerDocument.scrollingElement??e}function bh(e,t,r=320){let n=t.top-r,i=t.top+t.height+r,a=0,s=e.length;for(;a<s;){let p=a+s>>>1;e[p].start+e[p].height<n?a=p+1:s=p}let l=a;for(s=e.length;a<s;){let p=a+s>>>1;e[p].start<=i?a=p+1:s=p}return[l,a]}function ka(e,t){let{ids:r,estimate:n,pinned:i=[],layoutKey:a}=t,s=t.enabled??r.length>80,l=e.useRef(null),p=e.useRef(new Map),[c,u]=e.useReducer(C=>C+1,0),[m,f]=e.useState({top:0,height:600}),[b,w]=e.useState(null),[T,P]=e.useState(null),M=e.useRef(null),D=e.useRef(null),x=e.useRef(null),v=e.useMemo(()=>{let C=0;return r.map((_,H)=>{let O=p.current.get(_)??(typeof n=="number"?n:n(_,H)),F={id:_,height:O,start:C};return C+=O,F})},[r,n,c]),G=v.length?v[v.length-1].start+v[v.length-1].height:0,W=e.useRef({rows:v,viewport:m});W.current={rows:v,viewport:m};let B=e.useCallback(()=>{let C=l.current,_=M.current;if(!C||!_)return;let H=C.getBoundingClientRect(),O=_.getBoundingClientRect(),F=_.clientHeight||O.height||600,K=_===C?_.scrollTop:O.top-H.top;f(E=>E.top===K&&E.height===F?E:{top:K,height:F})},[]),ee=e.useCallback(()=>{D.current===null&&(D.current=(x.current??window).requestAnimationFrame(()=>{D.current=null,B()}))},[B]);e.useLayoutEffect(()=>{let C=l.current;if(!C||!s)return;let _=hh(C);M.current=_;let H=C.ownerDocument.defaultView??window;x.current=H;let O=C.style.overflowAnchor;C.style.overflowAnchor="none";let F=!0,K=()=>{if(!F)return;let N=C.ownerDocument.activeElement,y=N instanceof HTMLElement?N:null;for(;y&&y.parentElement!==C;)y=y.parentElement;w(y?.dataset.visibleKey??null)},E=()=>{queueMicrotask(K)};_.addEventListener("scroll",ee,{passive:!0}),H.addEventListener("resize",ee),C.addEventListener("focusin",K),C.addEventListener("focusout",E);let I=C.clientWidth,V=typeof ResizeObserver>"u"?void 0:new ResizeObserver(()=>{C.clientWidth!==I&&(I=C.clientWidth,p.current.clear(),u()),ee()});return V?.observe(_),_!==C&&V?.observe(C),B(),()=>{F=!1,C.style.overflowAnchor==="none"&&(C.style.overflowAnchor=O),_.removeEventListener("scroll",ee),H.removeEventListener("resize",ee),C.removeEventListener("focusin",K),C.removeEventListener("focusout",E),V?.disconnect(),D.current!==null&&H.cancelAnimationFrame(D.current),D.current=null,M.current=null,x.current=null}},[s,B,ee]),e.useLayoutEffect(()=>{let C=new Set(r);for(let _ of p.current.keys())C.has(_)||p.current.delete(_);B()},[r,B]),e.useLayoutEffect(()=>{p.current.clear(),u()},[a]),e.useLayoutEffect(()=>{let C=l.current;if(!C||!s)return;let _=F=>{let K=0,E=!1,{rows:I,viewport:V}=W.current,N=new Map(I.map(y=>[y.id,y]));for(let y of F){let g=y.dataset.visibleKey,A=g?N.get(g):void 0,k=y.getBoundingClientRect().height;!g||!A||k<=0||Math.abs(k-A.height)<.5||(p.current.set(g,k),A.start+A.height<=V.top&&(K+=k-A.height),E=!0)}if(E){let y=M.current,g=C.closest('[data-visible-sections="true"]'),A=C;for(;A&&A.parentElement!==g;)A=A.parentElement;let k=g&&g!==C&&A&&y&&A.getBoundingClientRect().bottom<=y.getBoundingClientRect().top;K&&y&&!k&&(y.scrollTop+=K),u(),ee()}},H=Array.from(C.children).filter(F=>F.hasAttribute("data-visible-key")),O=typeof ResizeObserver>"u"?void 0:new ResizeObserver(F=>_(F.map(K=>K.target)));return H.forEach(F=>O?.observe(F)),_(H),()=>O?.disconnect()}),e.useLayoutEffect(()=>{if(!T)return;let C=Array.from(l.current?.children??[]).find(_=>_.dataset.visibleKey===T.id);C&&(C.scrollIntoView?.({block:"nearest"}),T.selector&&(C.matches(T.selector)?C:C.querySelector(T.selector))?.focus(),B(),P(null))},[T,v,B]);let L=e.useCallback((C,_)=>{P({id:C,selector:_})},[]),[R,$]=s?bh(v,m):[0,v.length],S=new Set;for(let C=R;C<$;C++)S.add(C);let z=new Set([...i,b,T?.id].filter(Boolean));return z.size&&v.forEach((C,_)=>{z.has(C.id)&&S.add(_)}),{ref:l,show:L,render(C){let _=[],H=0;for(let O of[...S].sort((F,K)=>F-K)){let F=v[O];F.start>H&&_.push(e.createElement("div",{key:`space:${F.id}`,"aria-hidden":!0,style:{height:F.start-H,flex:"0 0 auto",pointerEvents:"none"}})),_.push(e.createElement(e.Fragment,{key:F.id},C(O))),H=F.start+F.height}return G>H&&_.push(e.createElement("div",{key:"space:end","aria-hidden":!0,style:{height:G-H,flex:"0 0 auto",pointerEvents:"none"}})),_}}}function Su(e){return h.markdown.render(e,{inline:!0})}function yh({status:e,style:t}){let r=Te(e);return t==="filled"?o.createElement("span",{className:"todo-status-pill","data-status":e},et(e)):o.createElement("span",{className:`todo-status-text ${r.cls}`},o.createElement(we,{status:e==="open"?null:e,dotCls:r.cls}),et(e))}function ku({status:e}){return o.createElement(yh,{status:e,style:ll()})}var wh=2;function Ea(){let e=ie(new Date),t=h.getState().dateFormat,r=h.ui.language(),n=Pe(),i=tc(),a=JSON.stringify(ro());return o.useMemo(()=>({today:e,dateFormat:t,language:r,statuses:n,icons:i,groupColors:a}),[e,t,r,n,i,a])}function ws(e){let t=new WeakMap;return r=>{let n=t.get(o)??o.memo(e);return t.set(o,n),o.createElement(n,r)}}function Aa(e){let t=o.useRef(null);if(t.current?.value===e)return t.current.value;let r=JSON.stringify(e);return t.current?.json!==r&&(t.current={value:e,json:r}),t.current.value}var vh=500;function Au(){return h.runtime.getOrCreate("todo.titleHtml",()=>({html:new Map,pending:new Map}))}function Eu(e){let t=Au().html,r=t.get(e);if(r!==void 0)return t.delete(e),t.set(e,r),r}function xh(e){let t=Au(),r=t.pending.get(e);return r||(r=Su(e).then(n=>(t.html.set(e,n),t.html.size>vh&&t.html.delete(t.html.keys().next().value),n)).finally(()=>{t.pending.delete(e)}),t.pending.set(e,r)),r}function vs(e){let[t,r]=o.useState(()=>Eu(e)??"");return o.useEffect(()=>{let n=Eu(e);if(n!==void 0){r(n);return}let i=!0;return r(""),xh(e).then(a=>{i&&r(a)}).catch(()=>{i&&r("")}),()=>{i=!1}},[e]),t}function xs(e,t,r){let n=Ie(e),i=o.useRef(null),a=o.useRef(null),s=o.useRef(!1),l=o.useCallback(()=>{a.current!=null&&(window.clearTimeout(a.current),a.current=null)},[]);return o.useEffect(()=>l,[l]),{check:o.createElement("span",{className:"todo-check-wrap"},o.createElement("input",{ref:i,className:"todo-check","data-status":n,type:"checkbox",checked:n==="completed","aria-disabled":t||void 0,onPointerDown:()=>{t||(s.current=!1,l(),a.current=window.setTimeout(()=>{s.current=!0;let c=i.current;c&&h.ui.openMenu(pt().map(u=>({label:u.label,icon:o.createElement(we,{status:u.status,dotCls:u.cls,color:u.color}),type:"radio",checked:u.status===null?n==="open":u.status===n,enabled:!t,onSelect:()=>r(e.id,Se(u.status))})),{anchor:c})},450))},onPointerUp:l,onPointerLeave:l,onClick:c=>{s.current&&c.preventDefault()},onKeyDown:()=>{s.current=!1},onChange:c=>{if(s.current){s.current=!1;return}r(e.id,Se(c.target.checked?"completed":null))},"aria-label":d("auto.13816aca9c25",{p0:e.title})}),n!=="open"&&n!=="completed"&&o.createElement("span",{className:"todo-check-glyph"},o.createElement(we,{status:n,dotCls:Te(n).cls}))),cancelHold:l}}var Cu=ws(function({todo:t,groups:r,compact:n,actions:i,pending:a,env:s,hideDate:l=!1,onMoveFocus:p}){let c=o.useRef(null);o.useEffect(()=>()=>{c.current&&clearTimeout(c.current)},[]);let u=vs(t.title),m=(I,V)=>h.workspace.openFile(I,void 0,{newTab:V}),f=Be.find(I=>I.id===t.priority)??Be[0],b=Ee(r),w=Ie(t),T=[t.filePath,...t.attachments??[]].filter(I=>!!I),[P,M]=o.useState(!1),D=P?T:T.slice(0,wh),x=T.length-D.length,v=t.urls?.length??0,G=n&&T.length>0,W=!!t.remindAt&&!t.reminderFiredAt,B=!!t.status&&t.status!=="open"&&!Te(t.status,s.statuses).done,ee=t.tags?.length??0,L=s.today,R=t.dueDate&&!l?Xe(t.dueDate,L,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,s.dateFormat):"",$=t.dueDate?Ue(t.dueDate,s.dateFormat):"",S=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<L,z=!!(R||t.startTime||W||t.group),C=!!(B||t.priority!=="normal"||t.location||v>0||G),_=o.useRef(null);o.useEffect(()=>_.current?nn(t.id,_.current):void 0,[t.id]);let{check:H,cancelHold:O}=xs(t,a,i.patchTodo),F=()=>{jc(t)||i.openDetail(t.id)},K=I=>i.patchTodo(t.id,I),E=o.useMemo(()=>({reschedule:I=>{i.patchTodo(t.id,{dueDate:I})},pickDate:I=>{h.ui.openPopover(V=>o.createElement("div",{className:"todo-swipe-datepick"},o.createElement(Bt,{value:t.dueDate?.slice(0,10)??"",onChange:N=>{i.patchTodo(t.id,{dueDate:N}),V.close()}})),{anchor:I},{ariaLabel:d("todo.swipe.date")})},setStatus:I=>Br(I,t,K),toggleFlag:()=>{i.patchTodo(t.id,{flagged:!t.flagged})},openDetails:()=>i.openDetail(t.id),remove:()=>{zt(t,i.removeTodo)}}),[t,i]);return o.createElement(Tu,{todo:t,disabled:a,actions:E,onEngage:O},o.createElement("article",{ref:_,className:`todo-row todo-row-navigable${t.completed?" completed":""}${n?" compact":""}${t.flagged?" flagged":""}`,"data-todo-id":t.id,"data-status":w,tabIndex:0,onContextMenu:I=>ya(I,{todo:t,groupNames:b,setOpenId:i.setMenuId,onEdit:()=>i.openDetail(t.id),onPatch:K,onRequestDelete:()=>zt(t,i.removeTodo),disabled:a}),onKeyDown:I=>{if(I.target===I.currentTarget){if(I.key==="ArrowDown"||I.key==="ArrowUp"){I.preventDefault(),p?.(t.id,I.key==="ArrowDown"?1:-1);return}if(I.key==="Escape"){I.currentTarget.blur();return}I.key==="Enter"&&(I.preventDefault(),i.openDetail(t.id))}},onClick:I=>{I.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')||I.detail>1||(c.current&&clearTimeout(c.current),c.current=setTimeout(()=>{c.current=null,F()},220))},onDoubleClick:I=>{c.current&&(clearTimeout(c.current),c.current=null),!I.target.closest('input, button, a, textarea, [contenteditable="true"], .cm-editor')&&i.openDetail(t.id)}},H,o.createElement("div",{className:"todo-row-main"},o.createElement("h4",null,f.symbol&&o.createElement("span",{className:`todo-priority-inline todo-priority-${t.priority}`},f.symbol," "),u?o.createElement("span",{className:"todo-title-md",dangerouslySetInnerHTML:{__html:u}}):o.createElement("span",{className:"todo-title-md"},t.title)),!n&&t.note.trim()&&o.createElement("div",{className:"todo-notes is-plain"},t.note),(z||C||!n&&ee>0)&&o.createElement("div",{className:"todo-view-meta"},z&&o.createElement("div",{className:"todo-meta-line todo-meta-when"},o.createElement("span",{className:"todo-meta-cluster"},R&&o.createElement("button",{className:`todo-date${S?" is-overdue":""}`,type:"button",title:d("todo.openInCalendar",{p0:$||R}),onClick:I=>{I.stopPropagation(),F()}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(st,null)),o.createElement("span",{className:"todo-date-day"},R),$&&$!==R&&o.createElement("span",{className:"todo-date-full"},$)),t.startTime&&o.createElement("span",{className:"todo-clock-text"},!R&&o.createElement("span",{className:"todo-meta-icon"},o.createElement(gc,null)),t.startTime,t.endTime?`\u2013${t.endTime}`:""),W&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.reminderSet")},o.createElement(fc,null),t.remindAt.slice(11,16))),t.group&&o.createElement("span",{className:"todo-group-text",title:t.group,style:{color:ye(Ae(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-meta-ellipsis"},t.group))),C&&o.createElement("div",{className:"todo-meta-line todo-meta-details"},B&&o.createElement(ku,{status:t.status}),t.priority!=="normal"&&o.createElement("span",{className:`todo-priority-text todo-priority-${t.priority}`},o.createElement("span",{className:"todo-meta-icon"},o.createElement(jt,null)),il(t.priority)),t.location&&o.createElement("button",{className:"todo-location-meta",type:"button",title:d("todo.openLocationOf",{p0:t.location.name}),onClick:I=>{I.stopPropagation(),Nr(t.location)}},o.createElement("span",{className:"todo-meta-icon"},o.createElement(He,null)),o.createElement("span",{className:"todo-meta-ellipsis"},t.location.name)),G&&o.createElement("span",{className:"todo-attach-count",title:d("todo.attachments")},o.createElement("span",{className:"todo-meta-icon"},o.createElement(Vt,null)),T.length),v>0&&o.createElement("span",{className:"todo-meta-glyph",title:d("todo.url")},o.createElement(lo,null),v>1&&v)),!n&&ee>0&&o.createElement("div",{className:"todo-meta-line todo-meta-tags"},t.tags.slice(0,3).map(I=>o.createElement("button",{key:I,className:"todo-tag-text",type:"button",onClick:V=>{V.stopPropagation(),la(`#${I}`)}},"#",I)),ee>3&&o.createElement("span",{className:"todo-tag-more",title:t.tags.slice(3).map(I=>`#${I}`).join(" ")},"+",ee-3)))),o.createElement("div",{className:"todo-row-actions"},t.flagged&&o.createElement("span",{className:"todo-flag-mark",title:d("todo.flagged")},o.createElement(ke,null)),o.createElement(au,{todo:t,groupNames:b,setOpenId:i.setMenuId,onEdit:()=>i.openDetail(t.id),onPatch:K,onRequestDelete:()=>zt(t,i.removeTodo),disabled:a})),!n&&T.length>0&&o.createElement("div",{className:"todo-file-list","aria-label":d("auto.c509ffcf5b5c")},D.map(I=>o.createElement("button",{key:I,className:"todo-file-card",title:I,onClick:V=>{V.stopPropagation(),m(I,h.ui.hasModKey(V))},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},I===t.filePath?o.createElement(bt,null):o.createElement(Vt,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},ru(I)),o.createElement("span",{className:"todo-file-card-kind"},fs(I))))),(x>0||P)&&o.createElement("button",{className:`todo-file-card todo-file-card-more${P?" open":""}`,title:P?d("todo.fewerFiles"):d("todo.moreFiles",{p0:x}),"aria-expanded":P,onClick:I=>{I.stopPropagation(),M(V=>!V)},type:"button"},o.createElement("span",{className:"todo-file-card-icon"},o.createElement(Ko,null)),o.createElement("span",{className:"todo-file-card-copy"},o.createElement("span",{className:"todo-file-card-name"},P?d("todo.fewerFiles"):d("todo.moreFiles",{p0:x})))))))});var Du=({todos:e,groups:t,compact:r,hideDate:n=!1,c:i})=>{let a=Le(),s=o.useSyncExternalStore(a.subscribe,a.get,a.get),l=o.useMemo(()=>e.map(w=>w.id),[e]),p=ka(o,{ids:l,estimate:r?52:84,enabled:e.length>80,layoutKey:r,pinned:[i.editingId,i.menuId,i.lastCreatedId,s?.todoId]}),c=p.show;o.useLayoutEffect(()=>{s&&l.includes(s.todoId)&&c(s.todoId)},[s,l,c]);let u=Ea(),m=Aa(t),f=o.useRef(e);f.current=e;let b=o.useCallback((w,T)=>{let P=f.current,M=P.findIndex(x=>x.id===w),D=P[Math.max(0,Math.min(P.length-1,M+T))];D&&c(D.id,".todo-row")},[c]);return o.createElement("div",{className:"todo-list-rows",ref:p.ref},p.render(w=>o.createElement(Cu,{key:e[w].id,todo:e[w],groups:m,compact:r,actions:i.actions,pending:i.pendingIds.has(e[w].id),env:u,hideDate:n,onMoveFocus:b})))};function Iu({sections:e,c:t,compact:r=!1,className:n,estimate:i,layoutKey:a,children:s}){let l=Le(),p=o.useSyncExternalStore(l.subscribe,l.get,l.get),c=o.useMemo(()=>e.map(M=>M.key),[e]),[u,m]=o.useState(null),f=new Set([t.editingId,t.menuId,t.lastCreatedId,p?.todoId,u].filter(Boolean)),b=e.filter(M=>M.todos.some(D=>f.has(D.id))).map(M=>M.key),w=o.useCallback((M,D)=>i?.(e[D])??32+e[D].todos.length*(r?52:84),[e,r,i]),T=ka(o,{ids:c,estimate:w,pinned:b,layoutKey:a??r}),P=T.show;return o.useLayoutEffect(()=>{if(!p)return;let M=e.find(D=>D.todos.some(x=>x.id===p.todoId));M&&P(M.key)},[p,e,P]),o.createElement("div",{className:n,"data-visible-sections":e.length>80||void 0,ref:T.ref,onDragStartCapture:M=>m(M.target.closest("[data-todo-id]")?.dataset.todoId??null),onDragEndCapture:()=>m(null)},T.render(M=>o.cloneElement(s(e[M]),{"data-visible-key":c[M]})))}function Th(e,t,r,n,i){if(e==="none")return d("todo.breakdown.noDate");if(e==="monthly")return io(`${t}-01`).toLocaleDateString(i,{month:"long",year:"numeric"});if(e==="weekly"){let a=io(t),s=new Date(a.getFullYear(),a.getMonth(),a.getDate()+6);return d("todo.breakdown.weekLabel",{count:Fl(a),p0:`${In(t,i,n)} \u2013 ${In(it(s),i,n)}`})}return t===mt(r,-1)?d("todo.due.yesterday"):t===r?d("todo.due.today"):t===mt(r,1)?d("todo.due.tomorrow"):In(t,i,n)}function Ca({todos:e,groups:t,compact:r,controller:n,mode:i,weekStart:a,timeline:s=!1}){let l=it(),{shortDateFormat:p}=dt("shortDateFormat"),c=h.ui.language(),u=o.useMemo(()=>{if(!s)return Hi(e,i,Er(a));let m=new Map(e.map(f=>[f,Vi(f)]));return Hi(Ul(e,m),i,Er(a),{dateOf:f=>Bi(m.get(f))})},[i,s,e,a]);return o.createElement(Iu,{className:"todo-panel-date-sections",sections:u,c:n,compact:r},m=>o.createElement("section",{className:"todo-panel-date-section",key:`${m.kind}:${m.key}`},o.createElement("div",{className:"todo-panel-date-head"},Th(m.kind,m.key,l,p,c)),o.createElement(Du,{todos:m.todos,groups:t,compact:r,c:n})))}function Nu(e){return e.kind==="groups"?{names:e.names,includeUngrouped:e.includeUngrouped===!0}:{names:[],includeUngrouped:e.kind==="nogroup"}}function Lu(e){return e.names.length||e.includeUngrouped?{kind:"groups",names:e.names,includeUngrouped:e.includeUngrouped}:Oe}function Pu(e,t){return e.some(r=>Z(r)===Z(t))?e.filter(r=>Z(r)!==Z(t)):[...e,t]}function Sh(e,t){return e==="all"?t:e.filter(r=>t.includes(r))}function or(e,t,r){let n=Sh(e,t);return r?n:n.filter(i=>!Rt(i))}function kh(){let[e,t]=vt(),[r]=Tt(),i=ut().map(u=>u.id),a=or(e,i,r),s=i.filter(u=>!Rt(u)),l=i.filter(u=>Rt(u)),p=u=>u.length===a.length&&u.every(m=>a.includes(m)),c=[{id:"all",label:d("todo.chip.all"),title:d("todo.filters.quickAll"),active:a.length===i.length,select:()=>{xt(!0),t("all")}},{id:"done",label:d("todo.status.completed"),title:d("todo.filters.quickDone"),active:p(l),select:()=>{xt(!0),t(l)}},{id:"open",label:d("todo.status.todo"),title:d("todo.filters.quickOpen"),active:p(s),select:()=>{xt(!1),t(s)}}];return o.createElement("div",{className:"todo-status-quick",role:"group","aria-label":d("todo.filters.statuses")},c.map(u=>o.createElement("button",{key:u.id,type:"button",className:`todo-status-quick-btn${u.active?" active":""}`,"aria-pressed":u.active,"aria-label":u.title,title:u.title,onClick:u.select},u.label)))}function Ou(){let[e,t]=vt(),[r]=Tt(),n=ut(),i=n.map(l=>l.id),a=or(e,i,r),s=l=>{let p=a.includes(l)?a.filter(c=>c!==l):i.filter(c=>a.includes(c)||c===l);p.length&&(xt(p.some(c=>Rt(c))),t(p.length===i.length?"all":p))};return o.createElement("div",{className:"todo-status-filter-menu"},o.createElement(kh,null),o.createElement("div",{className:"todo-filter-divider"}),n.map(l=>{let p=a.includes(l.id);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":p,key:l.id,onClick:()=>s(l.id)},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},p?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(we,{status:l.id==="open"?null:l.id,dotCls:l.cls})),o.createElement("span",null,l.label))}))}function Da(e,t){let{view:r,showCompleted:n,today:i,statusFilter:a,priorities:s}=t,l=t.search.trim()?Gd(t.search):null,p=t.selectedDateRange?.start??t.selectedDate,c=t.selectedDateRange?.end??t.selectedDate;return e.filter(u=>{if(!Cc(u,r,n,i)||a!=="all"&&!Tn(u,a)||s?.length&&!s.includes(u.priority)||l&&!l(u))return!1;if(!p||!c)return!0;let m=u.dueDate?.slice(0,10);return!!m&&m>=p&&m<=c})}function Mu({c:e,view:t,today:r,dateFormat:n,pageActive:i}){let[a,s]=o.useState(""),[l,p]=o.useState(""),[c,u]=o.useState(""),[m,f]=o.useState({}),[b,w]=o.useState(!1),[T,P]=o.useState(!0),[M,D]=o.useState(!1),[x,v]=o.useState(!1),{DateField:G,TimeField:W}=h.ui.settings,[B,ee]=o.useState(!1),L=o.useRef(null),R=o.useRef(null),$=o.useRef(null),S=t.kind==="groups"&&t.names.length===1&&!t.includeUngrouped?t.names[0]:void 0,z=async()=>{if(e.creating)return;let E=Ln(a,r),I=E.title;if(!I){_();return}let V=S;if(t.kind==="groups"&&t.names.length+(t.includeUngrouped?1:0)>1){let g=await h.ui.openMenu([...t.names.map((A,k)=>({id:`group:${k}`,label:A})),...t.includeUngrouped?[{id:"ungrouped",label:d("todo.chip.noGroup")}]:[]],{anchor:L.current??$.current,align:"start"});if(g===null)return;V=g.startsWith("group:")?t.names[Number(g.slice(6))]:void 0}v(!1);let N={note:l.trim(),tags:[...new Set([...m.tags??[],...c.split(/[\s,]+/).map(g=>g.replace(/^#+/,"")).filter(Boolean)])],priority:E.priority,...V?{group:V}:{}};t.kind==="smart"&&t.id==="flagged"&&(N.flagged=!0),Object.assign(N,{...m,tags:N.tags}),E.dueDate&&(N.dueDate=E.dueDate),await e.create(I,void 0,{patch:N})?(v(!1),s(""),p(""),u(""),f({}),w(!1),P(!0),D(!1),L.current?.focus()):v(!0)},C=()=>{ee(!0),window.setTimeout(()=>L.current?.focus(),0)},_=()=>{s(""),ee(!1),p(""),u(""),f({}),w(!1),P(!0),D(!1),v(!1)},H=Le(),O=o.useSyncExternalStore(H.subscribe,H.get,H.get);o.useEffect(()=>{O?.mode==="create"&&(ee(!0),H.clear())},[O,H]),o.useEffect(()=>{B&&!e.creating&&L.current?.focus()},[B,i,e.creating]),o.useLayoutEffect(()=>{R.current&&(R.current.style.height="auto",R.current.style.height=`${R.current.scrollHeight}px`)},[l,B]);let F=m.dueDate??"",K=B&&o.createElement("form",{className:"todo-compose",onSubmit:E=>{E.preventDefault(),z()},onKeyDown:E=>{E.key==="Escape"&&!E.defaultPrevented&&!e.creating&&(E.preventDefault(),_())}},o.createElement("span",{className:"todo-compose-circle","aria-hidden":"true"}),o.createElement("input",{ref:L,className:"todo-compose-title",value:a,onChange:E=>s(E.target.value),placeholder:S?d("todo.newTodoIn",{p0:S}):d("auto.c274dabfd0fe"),"aria-label":d("auto.184c39d1837f"),disabled:e.creating}),o.createElement("textarea",{ref:R,className:"todo-compose-note",rows:1,value:l,onChange:E=>p(E.target.value),placeholder:d("todo.edit.notes"),"aria-label":d("todo.edit.notes"),disabled:e.creating}),o.createElement("div",{className:"todo-compose-tags"},(m.tags??[]).map(E=>o.createElement("span",{className:"todo-compose-token",key:E},o.createElement("span",null,"#",E),o.createElement("button",{type:"button","aria-label":d("todo.compose.removeTag",{tag:E}),disabled:e.creating,onClick:()=>f(I=>({...I,tags:I.tags?.filter(V=>V!==E)}))},o.createElement(ge,null)))),o.createElement("input",{value:c,onChange:E=>{let I=E.target.value;if(!("isComposing"in E.nativeEvent&&E.nativeEvent.isComposing)&&/[\s,]/.test(I)){let V=I.split(/[\s,]+/),N=V.pop()??"";f(y=>({...y,tags:[...new Set([...y.tags??[],...V.map(g=>g.replace(/^#+/,"")).filter(Boolean)])]})),u(N)}else u(I)},onKeyDown:E=>{E.nativeEvent.isComposing||(E.key==="Enter"&&c.trim()&&(E.preventDefault(),f(I=>({...I,tags:[...new Set([...I.tags??[],c.trim().replace(/^#+/,"")].filter(Boolean))]})),u("")),E.key==="Backspace"&&!c&&f(I=>({...I,tags:I.tags?.slice(0,-1)})))},placeholder:d("todo.compose.addTags"),"aria-label":d("todo.edit.tags"),disabled:e.creating})),T&&o.createElement("div",{className:"todo-compose-schedule"},o.createElement(G,{className:"todo-compose-date-field",value:F,onChange:E=>f(I=>({...I,dueDate:E})),placeholder:d("todo.compose.addDate"),ariaLabel:d("todo.field.dueDate"),disabled:e.creating}),o.createElement(W,{className:"todo-compose-time-field",value:m.startTime??"",onChange:E=>f(I=>({...I,startTime:E||void 0})),placeholder:d("todo.compose.time"),ariaLabel:d("todo.field.startTime"),disabled:e.creating})),M&&o.createElement("div",{className:"todo-compose-location"},o.createElement(Ho,{value:m.location,disabled:e.creating,onChange:E=>f(I=>({...I,location:E}))})),(b||!!m.attachments?.length)&&o.createElement("div",{className:"todo-compose-attachments"},(m.attachments??[]).map(E=>o.createElement("span",{className:"todo-compose-token todo-compose-attachment",key:E,title:E},o.createElement(Vt,null),o.createElement("span",null,E.split("/").pop()),o.createElement("button",{type:"button",disabled:e.creating,"aria-label":`${d("todo.removeAttachment")}: ${E}`,onClick:()=>f(I=>({...I,attachments:I.attachments?.filter(V=>V!==E)}))},o.createElement(ge,null)))),b&&o.createElement(h.ui.ResourcePicker,{className:"todo-compose-attachment-picker",value:"",kinds:["attachment"],ariaLabel:d("todo.addAttachment"),placeholder:d("todo.addAttachment"),disabled:e.creating,onChange:E=>{E&&(f(I=>({...I,attachments:[...new Set([...I.attachments??[],E])]})),w(!1))}})),o.createElement("div",{className:"todo-compose-controls"},o.createElement("button",{type:"button",className:`todo-compose-chip${F?" has-value":""}`,"aria-pressed":T,disabled:e.creating,"aria-label":d("todo.compose.addDate"),title:d("todo.compose.addDate"),onClick:()=>P(E=>!E)},o.createElement(st,null),F&&o.createElement("span",null,Xe(F,r,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},h.ui.language(),n),m.startTime?` ${m.startTime}`:"")),o.createElement("button",{type:"button",className:`todo-compose-chip${m.location?" has-value":""}`,"aria-pressed":M,disabled:e.creating,"aria-label":d("todo.compose.addPlace"),title:m.location?.name??d("todo.compose.addPlace"),onClick:()=>D(E=>!E)},o.createElement(He,null)),o.createElement("button",{type:"button",className:`todo-compose-chip${m.attachments?.length?" has-value":""}`,"aria-pressed":b,disabled:e.creating,"aria-label":d("todo.addAttachment"),title:d("todo.addAttachment"),onClick:()=>w(E=>!E)},o.createElement(Vt,null),!!m.attachments?.length&&o.createElement("span",null,m.attachments.length)),o.createElement("button",{type:"button",className:`todo-compose-chip todo-compose-priority${m.priority&&m.priority!=="normal"?" has-value":""}`,disabled:e.creating,"aria-label":d("todo.field.priority"),title:d("todo.field.priority"),onClick:async E=>{let I=await h.ui.openMenu(Be.map(V=>({id:V.id,label:d(V.labelKey),checked:V.id===(m.priority??"normal")})),{anchor:E.currentTarget,align:"start"});I&&f(V=>({...V,priority:I}))}},o.createElement(jt,null),m.priority&&m.priority!=="normal"&&o.createElement("span",null,d(`todo.priority.${m.priority}`))),o.createElement("button",{type:"button",className:"todo-compose-chip todo-compose-flag",onClick:()=>f(E=>({...E,flagged:!(E.flagged??(t.kind==="smart"&&t.id==="flagged"))})),"aria-label":d("todo.flag"),title:d("todo.flag"),"aria-pressed":m.flagged??(t.kind==="smart"&&t.id==="flagged"),disabled:e.creating},o.createElement(ke,null)),o.createElement("button",{type:"submit",className:"todo-compose-submit",disabled:!a.trim()||e.creating},d("todo.group.add"))),x&&o.createElement("div",{className:"todo-compose-error",role:"alert"},d("todo.error.saveDraft")),o.createElement("button",{type:"button",className:"todo-menu-btn todo-compose-cancel",onClick:_,"aria-label":d("todo.group.cancel"),title:d("todo.group.cancel"),disabled:e.creating},o.createElement(ge,null)));return{composing:B,open:C,form:K,fabRef:$}}function _u({groups:e,row:t}){let[r,n,i]=xl(),a=o.useMemo(()=>e.filter(m=>e.some(f=>f.parent===m.id)).map(m=>m.id),[e]),s=a.length>0&&a.every(m=>r.has(m)),l=o.useRef(null),p=o.useRef(null),[c,u]=o.useState(null);return o.createElement("div",{className:"todo-navigation-groups",onDragOver:m=>{l.current&&p.current&&m.preventDefault()},onDrop:m=>{let f=l.current,b=p.current;l.current=null,p.current=null,u(null),!(!f||!b)&&(m.preventDefault(),Ui(f.id,b).catch(()=>{}))}},o.createElement("div",{className:"todo-navigation-groups-head"},o.createElement("span",{className:"todo-navigation-groups-title"},d("todo.view.myLists")),a.length>0&&o.createElement("button",{type:"button",className:"panel-tool-btn todo-groups-fold-all","aria-label":d(s?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),title:d(s?"todo.view.expandAllGroups":"todo.view.collapseAllGroups"),onClick:()=>i(s?[]:a)},s?o.createElement(Vo,null):o.createElement(yc,null))),e.filter(m=>!(m.parent&&r.has(m.parent))).map((m,f,b)=>{let w=e.some(D=>D.parent===m.id),T=w&&r.has(m.id),P=(D,x)=>{let v=D.currentTarget.getBoundingClientRect(),G=(Number.isFinite(D.clientX)?D.clientX:x.x)-x.x;return Tl(x.id,m.id,D.clientY<v.top+v.height/2?"before":"after",G>20?1:G<-20?-1:0,T)},M=(D,x)=>{let v=b.filter(B=>B.id!==x&&B.parent!==x),G=D.parent!==null&&!r.has(D.parent);if(D.before!==null&&v.some(B=>B.id===D.before))return{id:D.before,position:"before",nested:G};let W=D.parent===null?v.at(-1):v.filter(B=>B.id===D.parent||B.parent===D.parent).at(-1);return W?{id:W.id,position:"after",nested:G}:null};return o.createElement("div",{key:m.id,className:`todo-group-nav-row${c?.id===m.id?` drop-${c.position}${c.nested?" drop-nested":""}`:""}`,draggable:!0,onDragStart:D=>{l.current={id:m.id,x:Number.isFinite(D.clientX)?D.clientX:0},D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",m.id)},onDragOver:D=>{let x=l.current;if(!x)return;let v=P(D,x),G=v?M(v,x.id):null;if(p.current=G?v:null,!G){c&&u(null);return}D.preventDefault(),D.dataTransfer.dropEffect="move",(c?.id!==G.id||c.position!==G.position||c.nested!==G.nested)&&u(G)},onDrop:D=>{let x=l.current,v=x?P(D,x):null;l.current=null,p.current=null,u(null),D.stopPropagation(),!(!x||!v)&&(D.preventDefault(),Ui(x.id,v).catch(()=>{}))},onDragEnd:()=>{l.current=null,p.current=null,u(null)}},w&&o.createElement("button",{type:"button",className:"todo-group-toggle","aria-expanded":!T,"aria-label":d(T?"todo.view.expandGroup":"todo.view.collapseGroup",{p0:m.name}),onClick:()=>n(m.id)},T?o.createElement(Bo,null):o.createElement(Ko,null)),t(m))}))}function Hr(e){return e==="flagged"?o.createElement(ke,null):e==="priority"?o.createElement(jt,null):e==="due"?o.createElement(jo,null):e==="updated"?o.createElement(dc,null):e==="created"?o.createElement(lc,null):o.createElement(cc,null)}function Ia({sortField:e,setSortField:t,sortDir:r,setSortDir:n}){let[i,a]=o.useState(e),[s,l]=o.useState(r),p=Object.entries(Go);return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-sort-heading"},o.createElement("span",null,d("todo.filters.sort")),o.createElement("div",{className:"todo-sort-directions"},o.createElement("button",{className:`todo-sort-direction${s==="desc"?" active":""}`,type:"button","aria-label":d("auto.01e635f27ec2"),title:d("auto.01e635f27ec2"),"aria-pressed":s==="desc",onClick:()=>{l("desc"),n("desc")}},o.createElement(Uo,null)),o.createElement("button",{className:`todo-sort-direction${s==="asc"?" active":""}`,type:"button","aria-label":d("auto.4fee0a06b6e4"),title:d("auto.4fee0a06b6e4"),"aria-pressed":s==="asc",onClick:()=>{l("asc"),n("asc")}},o.createElement($o,null)))),o.createElement("div",{className:"todo-sort-options"},p.map(([c,u])=>o.createElement("button",{key:c,type:"button",className:`todo-sort-option${i===c?" active":""}`,"aria-pressed":i===c,onClick:()=>{a(c),t(c)}},Hr(c),o.createElement("span",null,d(u))))))}function Gu({todos:e,groups:t,names:r,hasUngrouped:n,selected:i,includeUngrouped:a,onChange:s,onOpenSettings:l}){let[p,c]=o.useState(i),[u,m]=o.useState(a),f=p.length===r.length&&(!n||u),b=[...r.map(M=>p.some(D=>D.toLowerCase()===M.toLowerCase())),...n?[u]:[]],w=(M,D)=>M?` active${b[D-1]?"":" selection-run-start"}${b[D+1]?"":" selection-run-end"}`:"",T=o.useMemo(()=>ta(e),[e]),P=(M,D)=>{c(M),m(D),s(M,D)};return o.createElement("div",{className:"todo-group-filter-popover"},o.createElement("div",{className:"todo-group-filter-head"},o.createElement("button",{type:"button",className:"todo-group-filter-title",onClick:l},d("todo.edit.group")),o.createElement("button",{type:"button",className:"todo-group-filter-all",onClick:()=>P(f?[]:r,f?!1:n)},d(f?"todo.group.deselectAll":"todo.group.selectAll"))),o.createElement("div",{className:"todo-group-filter-list"},r.map((M,D)=>{let x=b[D];return o.createElement("button",{key:M,type:"button",className:`todo-group-filter-row${yn(M,t)?" todo-subgroup":""}${w(x,D)}`,"aria-pressed":x,onClick:()=>P(x?p.filter(v=>v.toLowerCase()!==M.toLowerCase()):[...p,M],u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},x?"\u2713":""),o.createElement("span",{className:"todo-tree-dot",style:{background:ye(Ae(M,t))}}),o.createElement("span",{className:"todo-tree-label"},M),o.createElement("span",{className:"todo-tree-count"},Mr(T,M)))}),n&&o.createElement("button",{type:"button",className:`todo-group-filter-row${w(u,r.length)}`,"aria-pressed":u,onClick:()=>P(p,!u)},o.createElement("span",{className:"todo-group-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",{className:"todo-tree-dot no-group"}),o.createElement("span",{className:"todo-tree-label"},d("todo.chip.noGroup")),o.createElement("span",{className:"todo-tree-count"},Mr(T,null)))))}var Ru={scheduled:()=>o.createElement(jo,null),today:()=>o.createElement(Cr,null),week:()=>o.createElement(Xn,null),flagged:()=>o.createElement(ke,null),all:()=>o.createElement(Dr,null),completed:()=>o.createElement(Fe,null)},Eh=()=>{let{activePluginTab:e,dateFormat:t}=dt("activePluginTab","dateFormat"),{selectedDate:r,selectedDateRange:n}=fa(),i=nt(),a=Xc(),[s,l]=ca(),[p]=Tt(),[c,u]=ia("todo"),{sortField:m,sortDir:f,compact:b}=c,[w,T]=vt(),P=ut(),M=sa(),D=zc(),x=o.useMemo(()=>Ac(D),[D]),v=e?.pluginId===h.pluginId,G=Jo(m,f,"left_sidebar");wo(G.openDetail);let W=ie(new Date),B=o.useMemo(()=>Dc(G.todos,W),[G.todos,W]),ee=o.useMemo(()=>ta(G.todos),[G.todos]),L=o.useMemo(()=>Da(G.ordered,{view:a,showCompleted:p,today:W,statusFilter:w,search:s,selectedDate:r,selectedDateRange:n}),[G.ordered,a,p,w,s,r,n,W]),R=Mu({c:G,view:a,today:W,dateFormat:t,pageActive:v}),$=P.map(k=>k.id),S=or(w,$,p),z=$.filter(k=>Rt(k)),C=k=>k.length===S.length&&k.every(U=>S.includes(U)),_=C($)?"all":C(z)?"completed":C($.filter(k=>!Rt(k)))?"todo":null,H={all:o.createElement(Dr,null),completed:o.createElement(Fe,null),todo:o.createElement(mc,null)},O={all:d("todo.chip.all"),completed:d("todo.view.completed"),todo:d("todo.status.todo")},F=k=>{h.ui.openMenu(["all","completed","todo"].map(U=>({label:O[U],icon:H[U],type:"radio",checked:_===U,onSelect:()=>{xt(U!=="todo"),T(U==="completed"&&z.length?z:"all")}})),{anchor:k,align:"end"})},K=k=>{h.ui.openPopover(()=>o.createElement(Ia,{sortField:m,setSortField:U=>u({sortField:U}),sortDir:f,setSortDir:U=>u({sortDir:U})}),{anchor:k,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})},E=()=>{h.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},I=(k,U)=>{if(U.shiftKey){let q=Nu(a);$r(Lu({...q,names:Pu(q.names,k)}))}else $r({kind:"groups",names:[k]})},V=(k,U,q,J,ce,de,te,me,We)=>{let ze=oa(a,U),Ct=U.kind==="groups"&&U.names.length===1&&!U.includeUngrouped&&a.kind==="groups"?a.names.some(qe=>Z(qe)===Z(U.names[0])):ze;return o.createElement("button",{key:tt(U),type:"button",className:`todo-tree-row${ce?" nested":""}${We?" todo-subgroup":""}${de?` todo-${de}-chip`:""}${Ct?" active":""}`,"aria-current":ze?"true":void 0,"aria-label":de?`${k} ${q}`:void 0,title:de?k:void 0,"aria-pressed":U.kind==="groups"?Ct:void 0,style:te?{"--todo-chip-color":ye(te),"--todo-chip-on":me??Nt(te)}:void 0,onClick:qe=>{ga(qe)||U.kind!=="groups"||U.names.length!==1?$r(U,ga(qe)):I(U.names[0],qe)},onAuxClick:qe=>{qe.button===1&&(qe.preventDefault(),$r(U,!0))}},J&&o.createElement("span",{className:"todo-tree-icon"},J),ce&&o.createElement("span",{className:"todo-tree-dot",style:{background:ye(ce)},"aria-hidden":"true"}),o.createElement("span",{className:"todo-tree-label"},k),o.createElement("span",{className:"todo-tree-count"},q))},y=!!(s||r||n||w!=="all")?d("auto.006b85a57ddf"):d("auto.cec28cbe4204"),g=n?`${Ue(n.start,t)} \u2013 ${Ue(n.end,t)}`:r?Ue(r,t):null,A=d("todo.fab.newTodo");return o.createElement("div",{className:"todo-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("auto.fdebf6672120")),o.createElement("div",{className:"todo-header-actions"},!v&&o.createElement(o.Fragment,null,o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${_==="todo"?"":" active"}`,"aria-label":d("todo.filters.title"),"aria-haspopup":"menu",title:_?`${d("todo.filters.title")}: ${O[_]}`:d("todo.filters.title"),type:"button",onClick:k=>F(k.currentTarget)},_?H[_]:o.createElement(kc,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn","aria-label":d("auto.e3719eae891e"),"aria-pressed":b,title:b?d("auto.e3719eae891e"):d("auto.d2f76731e1e1"),type:"button",onClick:()=>u({compact:!b})},b?o.createElement(zn,null):o.createElement($n,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn","aria-label":d("auto.63e08dc2a4e3"),title:`${f==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Go[m])}`,type:"button",onClick:k=>K(k.currentTarget)},f==="asc"?o.createElement($o,null):o.createElement(Uo,null),Hr(m))),o.createElement("button",{className:"plugin-open-page",type:"button","aria-label":d("auto.25097a85052b"),title:d("auto.25097a85052b"),onClick:k=>ga(k)?Zo(a,!0):h.workspace.openMainTab(),onAuxClick:k=>{k.button===1&&(k.preventDefault(),Zo(a,!0))}}))),o.createElement("div",{className:"search-field-row"},o.createElement("div",{className:"todo-tree-search search-field"},o.createElement(ht,{className:"search-field-icon"}),o.createElement("input",{className:"search-field-input",value:s,onChange:k=>l(k.target.value),onKeyDown:k=>{k.key==="Escape"&&l("")},placeholder:d("auto.7be377261c61"),"aria-label":d("auto.e0345e9d3092")}),s&&o.createElement("button",{className:"search-field-action",onClick:()=>l(""),"aria-label":d("auto.67300d0fed7c"),type:"button"},o.createElement(ge,null)))),v?o.createElement("div",{className:"todo-tree todo-active-navigation"},R.form,o.createElement("nav",{className:"todo-smart-grid","aria-label":d("auto.fdebf6672120")},x.map(k=>V(d(k.labelKey),{kind:"smart",id:k.id},B[k.id],Ru[k.id](),void 0,"smart",k.color,Or(k,Nt)))),o.createElement(_u,{groups:i,row:k=>V(k.name,{kind:"groups",names:[k.name]},Mr(ee,k.name),void 0,Ae(k.name,i),void 0,void 0,void 0,k.parent!==void 0)})):o.createElement(o.Fragment,null,!s&&o.createElement("div",{className:"todo-tree"},o.createElement("nav",{className:"todo-smart-strip","aria-label":d("auto.fdebf6672120")},g?o.createElement("button",{type:"button",className:"todo-tree-row todo-smart-chip todo-calendar-selection-chip active",title:d("auto.f93fb4b1ab19"),onClick:E},o.createElement("span",{className:"todo-tree-icon"},o.createElement(Cr,null)),o.createElement("span",{className:"todo-tree-label"},g),o.createElement("span",{className:"todo-chip-clear","aria-hidden":"true"},o.createElement(ge,null))):x.map(k=>V(d(k.labelKey),{kind:"smart",id:k.id},B[k.id],Ru[k.id](),void 0,"smart",k.color,Or(k,Nt))))),o.createElement("div",{className:"todo-list"},R.form,G.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):L.length?o.createElement(Ca,{todos:L,groups:i,compact:b,controller:G,mode:M,weekStart:h.getState().weekStart,timeline:a.kind==="smart"&&a.id==="completed"}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,y)))),!R.composing&&o.createElement("button",{ref:R.fabRef,className:"todo-fab",type:"button","aria-label":A,title:A,disabled:G.creating,onClick:R.open},o.createElement(gt,null)),o.createElement(tr,{c:G}))},Fu=()=>o.createElement(Eh,null);function Na(){return h.workspace.openOwnSettings("groups"),Promise.resolve()}function Ah({showCompleted:e,setShowCompleted:t,filter:r,setFilter:n}){let i=ut(),[a,s]=o.useState(e),[l,p]=o.useState(r),c=i.map(b=>b.id),u=l==="all"?c:l,m=b=>{s(b),t(b)},f=b=>{let w=u.includes(b)?u.filter(P=>P!==b):c.filter(P=>u.includes(P)||P===b);if(!w.length)return;let T=w.length===c.length?"all":w;p(T),n(T)};return o.createElement("div",{className:"todo-filter-popover-body"},o.createElement("div",{className:"todo-completed-row"},o.createElement("span",null,d("todo.filters.completed")),o.createElement("div",{className:"todo-completed-choices"},o.createElement("button",{type:"button",className:`todo-completed-choice${a?"":" active"}`,onClick:()=>m(!1)},d("todo.completed.hide")),o.createElement("button",{type:"button",className:`todo-completed-choice${a?" active":""}`,onClick:()=>m(!0)},d("todo.completed.showAll")))),o.createElement("div",{className:"todo-status-filter-menu local"},i.map(b=>o.createElement("button",{key:b.id,type:"button",className:"todo-status-filter-option","aria-pressed":u.includes(b.id),onClick:()=>f(b.id)},o.createElement("span",{className:"todo-status-filter-check"},u.includes(b.id)?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(we,{status:b.id==="open"?null:b.id,dotCls:b.cls})),o.createElement("span",null,b.label)))))}var zu=()=>{let{activePath:e,weekStart:t}=dt("activePath","weekStart"),r=Wt(e)??"",n=nt(),i=sa(),[a,s]=ia("attachment"),{showCompleted:l,statusFilter:p,compact:c,sortField:u,sortDir:m,groupNames:f,includeUngrouped:b}=a,w=L=>s({showCompleted:L}),T=L=>s({statusFilter:L}),P=L=>s({sortField:L}),M=L=>s({sortDir:L}),D=Jo(u,m,"right_sidebar");wo(D.openDetail);let x=o.useMemo(()=>Ee(n),[n]),v=o.useMemo(()=>D.todos.some(L=>!L.group),[D.todos]),G=o.useMemo(()=>D.ordered.filter(L=>!(Wt(L.filePath)===r||(L.attachments??[]).some($=>Wt($)===r))||!l&&L.completed||(f.length||b)&&(!L.group&&!b||L.group&&!f.some($=>ct($).has(Z(L.group??""))))?!1:Tn(L,p)),[D.ordered,r,l,p,f,b]),W=L=>{h.ui.openPopover(({close:R})=>o.createElement(Gu,{todos:D.todos,groups:n,names:x,hasUngrouped:v,selected:f,includeUngrouped:b,onChange:($,S)=>s({groupNames:$,includeUngrouped:S}),onOpenSettings:()=>{R(),Na()}}),{anchor:L,align:"end"},{className:"todo-groups-popover",ariaLabel:d("todo.view.groups")})},B=L=>{h.ui.openPopover(()=>o.createElement(Ah,{showCompleted:l,setShowCompleted:w,filter:p,setFilter:T}),{anchor:L,align:"end"},{className:"todo-filter-popover",ariaLabel:d("todo.filters.statusAndCompleted")})},ee=L=>{h.ui.openPopover(()=>o.createElement(Ia,{sortField:u,setSortField:P,sortDir:m,setSortDir:M}),{anchor:L,align:"end"},{className:"todo-sort-popover",ariaLabel:d("auto.63e08dc2a4e3")})};return o.createElement("div",{className:"todo-panel note-tasks-panel"},o.createElement("header",{className:"panel-header"},o.createElement("span",{className:"panel-title"},d("todo.attachmentTasks.title")),o.createElement("div",{className:"todo-header-actions"},o.createElement("button",{className:`todo-menu-btn todo-groups-menu-btn${f.length||b?" active":""}`,type:"button","aria-label":d("todo.view.groups"),title:d("todo.view.groups"),onClick:L=>W(L.currentTarget)},o.createElement(Kn,null)),o.createElement("button",{className:`todo-menu-btn todo-status-menu-btn${l||p!=="all"?" active":""}`,type:"button","aria-label":d("todo.filters.statusAndCompleted"),title:d("todo.filters.statusAndCompleted"),onClick:L=>B(L.currentTarget)},o.createElement(Fe,null)),o.createElement("button",{className:"todo-menu-btn todo-density-menu-btn",type:"button","aria-pressed":c,"aria-label":d("auto.e3719eae891e"),onClick:()=>s({compact:!c})},c?o.createElement(zn,null):o.createElement($n,null)),o.createElement("button",{className:"todo-menu-btn todo-sort-menu-btn",type:"button","aria-label":d("auto.63e08dc2a4e3"),title:`${m==="asc"?d("auto.4fee0a06b6e4"):d("auto.01e635f27ec2")} \xB7 ${d(Go[u])}`,onClick:L=>ee(L.currentTarget)},m==="asc"?o.createElement($o,null):o.createElement(Uo,null),Hr(u)))),o.createElement("div",{className:"todo-list"},D.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):r?G.length?o.createElement(Ca,{todos:G,groups:n,compact:c,controller:D,mode:i,weekStart:t}):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.none"))):o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("todo.attachmentTasks.noFile")))),o.createElement(tr,{c:D}))};var $u=[{id:"note",labelKey:"todo.table.note"},{id:"group",labelKey:"todo.table.group"},{id:"priority",labelKey:"todo.table.priority"},{id:"due",labelKey:"todo.table.due"},{id:"flagged",labelKey:"todo.flagged"},{id:"location",labelKey:"todo.table.location"},{id:"tags",labelKey:"todo.table.tags"}],Ch=["title","due","priority","group","note"],La=[10,20,30,40,50,100,200,500],At=Be.map(e=>e.id).reverse(),Ts=$u.map(e=>e.id),fo={note:200,group:132,priority:104,due:156,flagged:92,location:140,tags:140};function po(e,t,r){let n=e.ownerDocument.createElement("span");n.className=t,n.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;max-width:none;margin:0",n.innerHTML=r,e.appendChild(n);let i=n.getBoundingClientRect().width;return n.remove(),Math.ceil(i)}var mo=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Uu(e){let[t,r]=o.useState({due:fo.due,priority:fo.priority,flagged:fo.flagged,mins:{...Wr}}),n=h.getState().dateFormat,i=h.ui.language();return o.useLayoutEffect(()=>{let a=e.current;if(!a)return;let s=ie(new Date),l={today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},p=[l.today,l.tomorrow,l.yesterday,...Array.from({length:12},(T,P)=>Xe(`2030-${String(P+1).padStart(2,"0")}-28`,s,l,i,n))],c=Math.max(...p.map(T=>po(a,"todo-table-cell-btn is-overdue",`<span>${mo(T)}</span><span class="todo-table-time">23:59</span>`)),po(a,"todo-table-sort active",`<span>${mo(d("todo.table.due"))}</span><svg width="12" height="12"></svg>`)),u=Math.max(...At.map(T=>po(a,"todo-table-cell-btn",`<svg width="14" height="14"></svg><span>${mo(Re(T))}</span>`)),po(a,"todo-table-sort active",`<span>${mo(d("todo.table.priority"))}</span><svg width="12" height="12"></svg>`)),m=po(a,"todo-table-sort active",`<span>${mo(d("todo.flagged"))}</span><svg width="12" height="12"></svg>`),f=T=>po(a,"todo-table-sort active",`<span>${mo(d(T))}</span><svg width="12" height="12"></svg>`)+16,b=Object.fromEntries(_a.map(T=>[T,Math.max(Wr[T],f(T==="title"?"todo.table.title":Pa[T]))])),w={due:Math.max(c+10,96),priority:Math.max(u+10,72),flagged:Math.max(m+10,48),mins:b};r(T=>JSON.stringify(T)===JSON.stringify(w)?T:w)},[e,n,i]),t}var Dh=360;function Ku(e,t){let[r,n]=o.useState(fo.tags),i=o.useMemo(()=>[...new Set(t.map(s=>(s.tags??[]).join(`
`)).filter(Boolean))],[t]),a=i.join("\0");return o.useLayoutEffect(()=>{let s=e.current;if(!s)return;let l=Math.max(0,...i.map(p=>po(s,"",p.split(`
`).map(c=>`<span class="todo-table-tag">#${mo(c)}</span>`).join(""))));n(Math.min(Dh,Math.max(fo.tags,l+12)))},[e,a]),r}var ju=240,Vu=82,Pa=Object.fromEntries($u.map(e=>[e.id,e.labelKey]));function Ih(e){if(!Array.isArray(e))return Ch;let t=[...new Set(e)].filter(r=>r==="title"||Ts.includes(r));return t.includes("title")?t:["title",...t]}function Nh(e){return Array.isArray(e)?At.filter(t=>e.includes(t)):[]}function Bu(e){return La.includes(e)?e:La[0]}function qr(e,t){let[r,n]=o.useState(()=>t(h.settings.get()[e]));o.useEffect(()=>h.settings.subscribe(()=>{let a=t(h.settings.get()[e]);n(s=>JSON.stringify(s)===JSON.stringify(a)?s:a)}),[e,t]);let i=o.useCallback(a=>{n(a),h.settings.set(e,a)},[e]);return[r,i]}var Oa=()=>qr("pageColumns",Ih),Ma=e=>e==="title"?"todo.table.title":Pa[e],Yr=()=>qr("pagePriorityFilter",Nh),_a=["title","note","group","location","tags"],Wr={title:180,note:120,group:104,location:104,tags:96},Ss=900;function Hu(e){let t=e&&typeof e=="object"?e:{},r={};for(let n of _a){let i=t[n];typeof i=="number"&&Number.isFinite(i)&&(r[n]=Math.round(Math.min(Ss,Math.max(Wr[n],i))))}return r}function Lh({label:e,active:t,icon:r,onOpen:n}){return o.createElement("button",{type:"button",className:`todo-page-appbar-btn${t?" active":""}`,"aria-label":e,title:e,onClick:i=>n(i.currentTarget)},r)}function Wu(){let[e]=vt(),[t]=Tt(),n=ut().map(l=>l.id),i=or(e,n,t),a=e!=="all"&&i.length!==n.length,s=d("todo.filters.statuses");return o.createElement("button",{type:"button",className:`todo-table-status-filter${a?" active":""}`,"aria-label":s,title:s,onClick:l=>{h.ui.openPopover(()=>o.createElement(Ou,null),{anchor:l.currentTarget,align:"start",gap:4},{className:"todo-status-filter-popover",ariaLabel:s})}},o.createElement(Fe,null))}function Ph(){let[e,t]=Yr();return o.createElement("div",{className:"todo-status-filter-menu"},At.map(r=>{let n=e.includes(r);return o.createElement("button",{type:"button",className:"todo-status-filter-option","aria-pressed":n,key:r,onClick:()=>t(n?e.filter(i=>i!==r):At.filter(i=>e.includes(i)||i===r))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},n?"\u2713":""),o.createElement("span",{className:"todo-status-filter-glyph"},o.createElement(ot,{priority:r})),o.createElement("span",null,Re(r)))}))}function qu(){let[e]=Yr();return o.createElement(Lh,{label:d("todo.table.priority"),active:e.length>0,icon:o.createElement(jt,null),onOpen:t=>{h.ui.openPopover(()=>o.createElement(Ph,null),{anchor:t,align:"start",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.priority"),width:168})}})}function Oh(){let[e,t]=Oa(),r=[...e,...Ts.filter(p=>!e.includes(p))],[n,i]=o.useState(null),[a,s]=o.useState(null),l=(p,c,u)=>{if(p===c)return;let m=r.filter(f=>f!==p);m.splice(m.indexOf(c)+(u?1:0),0,p),t(m.filter(f=>e.includes(f)))};return o.createElement("div",{className:"todo-status-filter-menu todo-column-menu",onDragEnd:()=>{i(null),s(null)}},o.createElement("div",{className:"todo-table-menu-label"},d("todo.table.toggleColumns")),o.createElement("div",{className:"todo-filter-divider"}),r.map((p,c)=>{let u=e.includes(p),m=p==="title",f=d(Ma(p));return o.createElement("div",{key:p,className:`todo-column-option${m?" is-locked":""}${n===p?" is-dragging":""}${a?.id===p?a.after?" drop-after":" drop-before":""}`,onDragOver:b=>{if(!n)return;b.preventDefault();let w=b.currentTarget.getBoundingClientRect();s({id:p,after:b.clientY>w.top+w.height/2})},onDrop:b=>{b.preventDefault(),n&&a&&l(n,a.id,a.after),i(null),s(null)}},o.createElement("span",{className:"todo-column-grip",draggable:!0,role:"button",tabIndex:0,"aria-label":d("todo.table.reorderColumn",{p0:f}),title:d("todo.table.reorderColumn",{p0:f}),onDragStart:b=>{b.dataTransfer.effectAllowed="move",b.dataTransfer.setData("text/plain",p);let w=b.currentTarget.parentElement;w&&b.dataTransfer.setDragImage(w,12,w.offsetHeight/2),i(p)},onKeyDown:b=>{if(!b.altKey||b.key!=="ArrowUp"&&b.key!=="ArrowDown")return;b.preventDefault();let w=r[c+(b.key==="ArrowUp"?-1:1)];w&&l(p,w,b.key==="ArrowDown")}},o.createElement(Ut,null)),o.createElement("button",{type:"button",className:"todo-column-toggle","aria-pressed":u,disabled:m,onClick:()=>t(r.filter(b=>b===p?!u:e.includes(b)))},o.createElement("span",{className:"todo-status-filter-check","aria-hidden":"true"},u?"\u2713":""),o.createElement("span",null,f)))}))}function Yu(){return o.createElement("button",{type:"button",className:"todo-page-appbar-btn","aria-label":d("todo.table.toggleColumns"),title:d("todo.table.toggleColumns"),onClick:e=>{h.ui.openPopover(()=>o.createElement(Oh,null),{anchor:e.currentTarget,align:"end",gap:4},{className:"todo-status-filter-popover todo-compact-popover",ariaLabel:d("todo.table.toggleColumns"),width:196})}},o.createElement(Tc,null))}function ks({field:e,label:t,className:r,sort:n,onSort:i,width:a,resize:s,thProps:l}){let p=n.field===e,c=p?n.dir==="asc"?Wn:qn:Vo;return o.createElement("th",{...l,className:r,style:a===void 0?void 0:{width:a},"aria-sort":p?n.dir==="asc"?"ascending":"descending":"none"},o.createElement("button",{type:"button",className:`todo-table-sort${p?" active":""}`,"aria-label":t,title:t,onClick:()=>i(p?n.dir==="asc"?{field:e,dir:"desc"}:{field:"auto",dir:"asc"}:{field:e,dir:"asc"})},o.createElement("span",null,t),o.createElement(c,null)),s)}function Xu({id:e,label:t,min:r,onDrag:n,onCommit:i,onReset:a}){let s=o.useRef(null),l=p=>Math.round(Math.min(Ss,Math.max(r,p)));return o.createElement("span",{className:"todo-col-resize",role:"separator","aria-orientation":"vertical","aria-label":d("todo.table.resizeColumn",{p0:t}),title:d("todo.table.resizeColumn",{p0:t}),onClick:p=>p.stopPropagation(),onDoubleClick:p=>{p.stopPropagation(),a(e)},onPointerDown:p=>{if(p.button!==0)return;p.preventDefault(),p.stopPropagation();let c=p.currentTarget.parentElement,u=c?c.getBoundingClientRect().width:Wr[e];s.current={startX:p.clientX,startWidth:u,width:u},p.currentTarget.setPointerCapture?.(p.pointerId),p.currentTarget.classList.add("is-dragging")},onPointerMove:p=>{if(!s.current)return;let c=l(s.current.startWidth+p.clientX-s.current.startX);s.current.width=c,n(e,c)},onPointerUp:p=>{s.current&&(p.currentTarget.classList.remove("is-dragging"),p.currentTarget.releasePointerCapture?.(p.pointerId),i(e,s.current.width),s.current=null)},onPointerCancel:p=>{p.currentTarget.classList.remove("is-dragging"),s.current=null}})}var Zu='input, button, a, textarea, [contenteditable="true"]',Ju=ws(function({todo:t,groups:r,columns:n,actions:i,pending:a,env:s,selected:l,onPick:p}){let c=o.useRef(null);o.useEffect(()=>c.current?nn(t.id,c.current):void 0,[t.id]);let u=vs(t.title),m=Qo(t.note),{check:f}=xs(t,a,i.patchTodo),b=Ie(t),w=O=>i.patchTodo(t.id,O),T=s.today,P=s.dateFormat,M=t.dueDate?Xe(t.dueDate,T,{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},s.language,P):"",D=!!t.dueDate&&!t.completed&&t.dueDate.slice(0,10)<T,[x,v]=o.useState(!1),G=o.useRef(null);o.useEffect(()=>()=>{G.current&&clearTimeout(G.current)},[]);let[W,B]=o.useState(t.title),ee=()=>{let O=W.trim();v(!1),O&&O!==t.title&&w({title:O})},[L,R]=o.useState(null),$=(O,F)=>{R(O),F.catch(()=>{}).finally(()=>R(K=>K===O?null:K))},S=(O,F,K,E,I=260)=>{$(O,h.ui.openPopover(E,{anchor:F,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:K,width:I}))},z=(O,F,K)=>L===O?o.createElement("span",{className:"todo-table-placeholder"},F,o.createElement("span",null,K)):null,C=O=>`todo-table-${O}${L===O?" is-editing":""}`,_=O=>{let F=t.note,K=()=>{F!==t.note&&w({note:F})};R("note"),h.ui.openPopover(({close:E})=>o.createElement(va,{initial:t.note,onInput:I=>{F=I},onDone:()=>{K(),E()}}),{anchor:O,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(K(),!0)}).catch(()=>{}).finally(()=>R(E=>E==="note"?null:E))},H=O=>{switch(O){case"note":return o.createElement("td",{className:C("note"),title:m||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:F=>_(F.currentTarget)},m?o.createElement("span",{className:"todo-table-note-text"},m):z("note",null,d("todo.table.note"))));case"group":return o.createElement("td",{className:C("group")},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:F=>$("group",h.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!t.group,onSelect:()=>w({group:void 0})},...Et(Ee(r),r,K=>({label:K,type:"radio",checked:t.group===K,color:Ae(K,r),onSelect:()=>w({group:K})}))],{anchor:F.currentTarget,align:"start"}))},t.group?o.createElement("span",{className:"todo-table-group-pill",title:t.group,style:{"--todo-group-color":ye(Ae(t.group,r))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},t.group)):z("group",null,d("todo.table.group"))));case"priority":return o.createElement("td",{className:C("priority")},o.createElement("button",{type:"button",className:`todo-table-cell-btn${t.priority==="normal"?" muted":""}`,disabled:a,title:d("todo.table.priority"),onClick:F=>$("priority",h.ui.openMenu(At.map(K=>({label:Re(K),icon:o.createElement(ot,{priority:K}),type:"radio",checked:t.priority===K,onSelect:()=>w({priority:K})})),{anchor:F.currentTarget}))},o.createElement(ot,{priority:t.priority}),o.createElement("span",null,Re(t.priority))));case"due":return o.createElement("td",{className:C("due")},o.createElement("button",{type:"button",className:`todo-table-cell-btn todo-table-due-text${D?" is-overdue":""}`,disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),title:t.dueDate?Ue(t.dueDate,P):d("todo.field.dueDate"),onClick:F=>S("due",F.currentTarget,d("todo.field.dueDate"),()=>o.createElement(uu,{todo:t,onPatch:K=>{w(K)}}),240)},o.createElement("span",null,M),t.startTime&&o.createElement("span",{className:"todo-table-time"},t.startTime)));case"flagged":return o.createElement("td",{className:C("flagged")},o.createElement("button",{type:"button",className:`todo-table-flag-btn${t.flagged?" on":""}`,"aria-pressed":!!t.flagged,disabled:a,"aria-label":d("todo.flag"),title:d(t.flagged?"todo.flagged":"todo.flag"),onClick:()=>w({flagged:!t.flagged})},o.createElement(ke,null)));case"location":return o.createElement("td",{className:C("location")},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),title:t.location?.name??d("todo.field.location"),onClick:F=>S("location",F.currentTarget,d("todo.field.location"),()=>o.createElement(Ta,{todo:t,onPatch:K=>{w(K)}}),300)},t.location?o.createElement(o.Fragment,null,o.createElement(He,null),o.createElement("span",null,t.location.name)):z("location",o.createElement(He,null),d("todo.field.location"))));case"tags":return o.createElement("td",{className:C("tags"),title:t.tags?.map(F=>`#${F}`).join(" ")||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:a,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:F=>S("tags",F.currentTarget,d("todo.edit.tags"),()=>o.createElement(xa,{todo:t,onPatch:K=>{w(K)}}),280)},t.tags?.length?t.tags.map(F=>o.createElement("span",{key:F,className:"todo-table-tag"},"#",F)):z("tags",null,d("todo.table.tags"))))}};return o.createElement("tr",{ref:c,className:`todo-table-row${t.completed?" completed":""}${l?" selected":""}${L||x?" is-editing":""}`,"data-todo-id":t.id,"data-status":b,"aria-selected":l,tabIndex:0,onContextMenu:O=>ya(O,{todo:t,groupNames:Ee(r),setOpenId:i.setMenuId,onEdit:()=>i.openDetail(t.id),onPatch:w,onRequestDelete:()=>zt(t,i.removeTodo),disabled:a}),onKeyDown:O=>{if(O.target===O.currentTarget)if(O.key==="ArrowDown"||O.key==="ArrowUp"){O.preventDefault();let F=O.key==="ArrowDown"?O.currentTarget.nextElementSibling:O.currentTarget.previousElementSibling;for(;F&&!F.classList.contains("todo-table-row");)F=O.key==="ArrowDown"?F.nextElementSibling:F.previousElementSibling;F?.focus()}else O.key==="Enter"?(O.preventDefault(),i.openDetail(t.id)):O.key===" "?(O.preventDefault(),p(t.id,!1)):O.key==="Escape"&&O.currentTarget.blur()},onClick:O=>{O.target.closest(Zu)||(h.ui.hasModKey(O)||O.shiftKey)&&p(t.id,O.shiftKey)},onDoubleClick:O=>{let F=!!O.target.closest(".todo-table-title-btn");F&&G.current&&(clearTimeout(G.current),G.current=null),!(!F&&O.target.closest(Zu)||h.ui.hasModKey(O)||O.shiftKey)&&i.openDetail(t.id)}},o.createElement("td",{className:"todo-table-select"},f),n.map(O=>o.createElement(o.Fragment,{key:O},O==="title"?o.createElement("td",{className:"todo-table-title"},x?o.createElement("input",{className:"todo-table-new-input todo-table-title-input",value:W,autoFocus:!0,"aria-label":d("todo.table.title"),onChange:F=>B(F.target.value),onBlur:ee,onKeyDown:F=>{F.nativeEvent.isComposing||(F.key==="Enter"?(F.preventDefault(),ee()):F.key==="Escape"&&(F.preventDefault(),B(t.title),v(!1)))}}):o.createElement("button",{type:"button",className:"todo-table-edit-btn todo-table-title-btn",disabled:a,"aria-label":d("todo.table.editTitle",{p0:t.title}),onClick:F=>{if(h.ui.hasModKey(F)||F.shiftKey){p(t.id,F.shiftKey);return}F.detail>1||(G.current&&clearTimeout(G.current),G.current=setTimeout(()=>{G.current=null,B(t.title),v(!0)},220))}},u?o.createElement("span",{className:"todo-table-title-text",dangerouslySetInnerHTML:{__html:u}}):o.createElement("span",{className:"todo-table-title-text"},t.title))):H(O))),o.createElement("td",{className:"todo-table-actions"}))});function Mh(e){return e.split(/\r?\n/).map(t=>t.trim().replace(/^(?:[-*+•]|\d+[.)])\s+/,"").replace(/^\[[ xX]?\]\s*/,"").trim()).filter(Boolean)}function Qu({order:e,groups:t,c:r,newTaskPatch:n,active:i,onActivate:a,onRemove:s}){let[l,p]=o.useState(""),[c,u]=o.useState({}),m=o.useRef(null),f=o.useRef(null),b=o.useRef(!1),[w,T]=o.useState(!0);o.useEffect(()=>{let L=()=>{let $=m.current;$&&(!$.ownerDocument.hasFocus()&&!/jsdom/i.test(navigator.userAgent)&&$.ownerDocument.defaultView?.focus(),$.focus())};L();let R=window.setTimeout(L,60);return()=>window.clearTimeout(R)},[]);let P=async L=>{let R=ie(new Date);for(let $ of L){let S=Ln($,R);if(!S.title)continue;let z=S.dueDate||c.dueDate;await r.create(S.title,void 0,{patch:{...n?.(),priority:S.priority!=="normal"?S.priority:c.priority??S.priority,...z?{dueDate:z}:{},...c.group?{group:c.group}:{},...c.flagged?{flagged:!0}:{},...c.note?.trim()?{note:c.note}:{},...c.location?{location:c.location}:{},...c.tags?.length?{tags:c.tags}:{},...c.status?Se(c.status):{}}})}p(""),m.current?.focus()},M=s,D=!l.trim(),x=()=>{window.setTimeout(()=>{let L=f.current?.ownerDocument;b.current||!L||!L.hasFocus()||f.current?.contains(L.activeElement)||(D?M():T(!1))},0)};o.useEffect(()=>{let L=$=>{b.current||f.current?.contains($.target)||(D?M():T(!1))},R=f.current?.ownerDocument;return R?.addEventListener("pointerdown",L,!0),()=>R?.removeEventListener("pointerdown",L,!0)});let v=o.useRef(i);o.useEffect(()=>{v.current&&!i&&(D?M():T(!1)),v.current=i});let G=L=>{b.current=!0,L.catch(()=>{}).finally(()=>{b.current=!1,m.current?.focus()})},W=L=>{switch(L){case"due":{let R=c.dueDate,$=R?Xe(R,ie(new Date),{today:d("todo.due.today"),tomorrow:d("todo.due.tomorrow"),yesterday:d("todo.due.yesterday")},h.ui.language(),h.getState().dateFormat):"";return o.createElement("td",{key:L,className:"todo-table-due"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-due-text",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.due")}),onClick:S=>G(h.ui.openPopover(({close:z})=>o.createElement("div",{className:"todo-cell-editor"},o.createElement(Bt,{value:R??"",onChange:C=>{u(_=>({..._,dueDate:C||void 0})),z()}})),{anchor:S.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.dueDate"),width:260}))},$?o.createElement("span",null,$):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.due"))))}case"priority":{let R=c.priority??"normal";return o.createElement("td",{key:L,className:"todo-table-priority"},o.createElement("button",{type:"button",className:`todo-table-cell-btn${R==="normal"?" muted":""}`,disabled:r.creating,title:d("todo.table.priority"),onClick:$=>G(h.ui.openMenu(At.map(S=>({label:Re(S),icon:o.createElement(ot,{priority:S}),type:"radio",checked:R===S,onSelect:()=>u(z=>({...z,priority:S}))})),{anchor:$.currentTarget}))},o.createElement(ot,{priority:R}),o.createElement("span",null,Re(R))))}case"group":return o.createElement("td",{key:L,className:"todo-table-group"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.group")}),onClick:R=>G(h.ui.openMenu([{label:d("todo.chip.noGroup"),type:"radio",checked:!c.group,onSelect:()=>u($=>({...$,group:void 0}))},...Et(Ee(t),t,$=>({label:$,type:"radio",checked:c.group===$,color:Ae($,t),onSelect:()=>u(S=>({...S,group:$}))}))],{anchor:R.currentTarget,align:"start"}))},c.group?o.createElement("span",{className:"todo-table-group-pill",title:c.group,style:{"--todo-group-color":ye(Ae(c.group,t))}},o.createElement("span",{className:"todo-group-dot","aria-hidden":"true"}),o.createElement("span",{className:"todo-table-group-name"},c.group)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.group"))));case"flagged":return o.createElement("td",{key:L,className:"todo-table-flagged"},o.createElement("button",{type:"button",className:`todo-table-flag-btn${c.flagged?" on":""}`,"aria-pressed":!!c.flagged,disabled:r.creating,"aria-label":d("todo.flag"),onClick:()=>u(R=>({...R,flagged:!R.flagged||void 0}))},o.createElement(ke,null)));case"note":return o.createElement("td",{key:L,className:"todo-table-note",title:c.note||void 0},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.note")}),onClick:R=>{let $=c.note??"",S=()=>u(z=>({...z,note:$||void 0}));G(h.ui.openPopover(({close:z})=>o.createElement(va,{initial:c.note??"",onInput:C=>{$=C},onDone:()=>{S(),z()}}),{anchor:R.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.notes"),width:360,beforeDismiss:()=>(S(),!0)}))}},c.note?o.createElement("span",{className:"todo-table-note-text"},Qo(c.note)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.note"))));case"location":return o.createElement("td",{key:L,className:"todo-table-location"},o.createElement("button",{type:"button",className:"todo-table-cell-btn todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.location")}),onClick:R=>G(h.ui.openPopover(()=>o.createElement(Ta,{todo:{location:c.location},onPatch:$=>u(S=>({...S,location:$.location}))}),{anchor:R.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.field.location"),width:300}))},c.location?o.createElement(o.Fragment,null,o.createElement(He,null),o.createElement("span",null,c.location.name)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.field.location"))));case"tags":return o.createElement("td",{key:L,className:"todo-table-tags"},o.createElement("button",{type:"button",className:"todo-table-edit-btn",disabled:r.creating,"aria-label":d("todo.table.editCell",{p0:d("todo.table.tags")}),onClick:R=>G(h.ui.openPopover(()=>o.createElement(xa,{todo:{tags:c.tags??[]},onPatch:$=>u(S=>({...S,tags:$.tags}))}),{anchor:R.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.edit.tags"),width:280}))},c.tags?.length?c.tags.map(R=>o.createElement("span",{key:R,className:"todo-table-tag"},"#",R)):o.createElement("span",{className:"todo-table-new-hint"},d("todo.table.tags"))));default:return o.createElement("td",{key:L,className:`todo-table-${L}`})}},B=c.status?pt().find(L=>L.status===c.status):void 0,ee=L=>G(h.ui.openMenu(pt().map(R=>({label:R.label,icon:o.createElement(we,{status:R.status,dotCls:R.cls,color:R.color}),type:"radio",checked:R.status===null?!c.status:R.status===c.status,onSelect:()=>u($=>({...$,status:R.status}))})),{anchor:L}));return o.createElement("tr",{className:"todo-table-new-row"+(w&&i?"":" is-idle"),ref:f,onBlur:x,onFocus:()=>{T(!0),a()}},o.createElement("td",{className:"todo-table-select"},o.createElement("button",{type:"button",className:"todo-table-new-status",disabled:r.creating,"aria-label":d("todo.table.status"),title:B?.label??d("todo.table.status"),onClick:L=>ee(L.currentTarget)},B?o.createElement(we,{status:B.status,dotCls:B.cls}):o.createElement("span",{className:"todo-table-new-circle","aria-hidden":"true"}))),e.map(L=>L==="title"?o.createElement("td",{key:L,className:"todo-table-title"},o.createElement("input",{ref:m,className:"todo-table-new-input",value:l,disabled:r.creating,placeholder:d("todo.table.newRow"),"aria-label":d("auto.184c39d1837f"),onChange:R=>p(R.target.value),onKeyDown:R=>{R.nativeEvent.isComposing||(R.key==="Enter"?(R.preventDefault(),l.trim()?P([l]):M()):R.key==="Escape"&&(R.preventDefault(),M()))},onPaste:R=>{let $=R.clipboardData.getData("text/plain");/\r?\n/.test($.trim())&&(R.preventDefault(),P(Mh(`${l}${$}`)))}})):W(L)),o.createElement("td",{className:"todo-table-actions"}))}function ep({todos:e,groups:t,c:r,sort:n,onSort:i,resetKey:a,empty:s,sectionOf:l,composeSignal:p=0,newTaskPatch:c}){let[u,m]=Oa(),f=u.filter(j=>j!=="title"),[b,w]=o.useState(null),[T,P]=o.useState(null),M=j=>({className:`${b===j?" is-dragging":""}${T?.id===j?T.after?" col-drop-after":" col-drop-before":""}`,props:{draggable:!0,onDragStart:Q=>{if(Q.target.closest(".todo-col-resize")){Q.preventDefault();return}Q.dataTransfer.effectAllowed="move",Q.dataTransfer.setData("text/plain",j);let ae=Q.currentTarget.ownerDocument,he=ae.createElement("div");he.className="todo-col-drag-chip",he.textContent=d(Ma(j)),ae.body.appendChild(he),Q.dataTransfer.setDragImage?.(he,Math.round(he.offsetWidth/2),Math.round(he.offsetHeight/2)),window.setTimeout(()=>he.remove(),0),w(j)},onDragOver:Q=>{if(!b||b===j)return;Q.preventDefault(),Q.dataTransfer.dropEffect="move";let ae=Q.currentTarget.getBoundingClientRect();P({id:j,after:Q.clientX>ae.left+ae.width/2})},onDrop:Q=>{if(Q.preventDefault(),b&&T&&b!==T.id){let ae=u.filter(he=>he!==b);ae.splice(ae.indexOf(T.id)+(T.after?1:0),0,b),m(ae)}w(null),P(null)},onDragEnd:()=>{w(null),P(null)}}}),D=o.useRef(null),x=Uu(D),[v,G]=qr("pageColumnWidths",Hu),[W,B]=o.useState({}),ee=Ku(D,e),L=Object.fromEntries(Object.entries({tags:ee,...v,...W}).map(([j,Q])=>[j,Math.max(Q,x.mins[j])])),R=j=>j==="due"?x.due:j==="priority"?x.priority:j==="flagged"?x.flagged:L[j]??fo[j],[$,S]=qr("pageRowsPerPage",Bu),[z,C]=o.useState([]),[_,H]=o.useState(null),O=o.useRef(1),F=o.useRef(null);o.useEffect(()=>{if(!p)return;let j=O.current++;C(Q=>[j,...Q]),H(j),I(0),F.current?.scrollTo?.({top:0})},[p]);let K=j=>C(Q=>Q.filter(ae=>ae!==j)),[E,I]=o.useState(0),[V,N]=o.useState(a);V!==a&&(N(a),I(0));let[y,g]=o.useState(()=>new Set),A=o.useRef(null),k=Math.max(1,Math.ceil(e.length/$)),U=Math.min(E,k-1),q=e.slice(U*$,(U+1)*$),J=o.useMemo(()=>e.filter(j=>y.has(j.id)),[e,y]),ce=o.useMemo(()=>e.reduce((j,Q)=>j+(Q.completed?1:0),0),[e]),de=Le(),te=o.useSyncExternalStore(de.subscribe,de.get,de.get),me=o.useCallback(j=>{let Q=e.findIndex(ae=>ae.id===j);Q>=0&&I(Math.floor(Q/$))},[e,$]);o.useLayoutEffect(()=>{te?.todoId&&me(te.todoId)},[te,me]),o.useLayoutEffect(()=>{r.editingId&&me(r.editingId)},[r.editingId]);let We=(j,Q)=>{g(ae=>{let he=new Set(ae);for(let Ht of j)Q?he.add(Ht):he.delete(Ht);return he})},ze=o.useRef({rows:q,selection:y});ze.current={rows:q,selection:y};let Ct=o.useCallback((j,Q)=>{let{rows:ae,selection:he}=ze.current,Ht=ae.findIndex(rr=>rr.id===j),Fa=Q?ae.findIndex(rr=>rr.id===A.current):-1;Fa>=0?We(ae.slice(Math.min(Fa,Ht),Math.max(Fa,Ht)+1).map(rr=>rr.id),!0):We([j],!he.has(j)),A.current=j},[]),qe=Ea(),Ds=Aa(t),fp=()=>{for(let j of J)r.patchTodo(j.id,Se("completed"));g(new Set)},gp=async()=>{let j=J.map(ae=>ae.id);await h.ui.confirm({title:d("todo.table.deleteTitle",{count:j.length}),message:d("todo.table.deleteMessage",{count:j.length}),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})==="delete"&&(await Promise.all(j.map(ae=>r.removeTodo(ae))),g(new Set))},Is=(j,Q)=>o.createElement(Xu,{id:j,label:Q,min:x.mins[j],onDrag:(ae,he)=>B(Ht=>({...Ht,[ae]:he})),onCommit:(ae,he)=>{B({}),G({...v,[ae]:he})},onReset:ae=>{B({});let he={...v};delete he[ae],G(he)}}),hp=j=>{let Q=d(Pa[j]),ae=_a.includes(j);return o.createElement(ks,{field:j==="note"?"notes":j,label:Q,className:`todo-table-${j}${M(j).className}`,thProps:M(j).props,sort:n,onSort:i,width:ae?L[j]:void 0,resize:ae?Is(j,Q):void 0})},bp=o.useMemo(()=>{if(!l)return null;let j=new Map;for(let Q of e){let ae=l(Q);j.set(ae,(j.get(ae)??0)+1)}return j},[e,l]),Ra=[],Ns=null;for(let j of q){let Q=l?.(j)??null;Q&&Q!==Ns&&Ra.push(o.createElement("tr",{className:`todo-table-section todo-table-section-${Q}`,key:`section:${Q}`},o.createElement("td",{className:"todo-table-select"},o.createElement("span",{className:"todo-table-section-text"},o.createElement("span",{className:"todo-table-section-label"},d($l[Q])),o.createElement("span",{className:"todo-table-section-count"},bp?.get(Q)??0))),u.map(ae=>o.createElement("td",{key:ae,className:`todo-table-${ae}`})),o.createElement("td",{className:"todo-table-actions"}))),Ns=Q,Ra.push(o.createElement(Ju,{key:j.id,todo:j,groups:Ds,columns:u,actions:r.actions,pending:r.pendingIds.has(j.id),env:qe,selected:y.has(j.id),onPick:Ct}))}return o.createElement("div",{className:"todo-table-shell"},o.createElement("div",{className:"todo-table-scroll",ref:F},o.createElement("table",{ref:D,className:"todo-table","data-dragging-col":b??void 0,style:{minWidth:Vu+(L.title??ju)+f.reduce((j,Q)=>j+R(Q),0),"--todo-due-width":`${x.due}px`,"--todo-priority-width":`${x.priority}px`,"--todo-flagged-width":`${x.flagged}px`}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",{className:"todo-table-select"},o.createElement(Wu,null)),u.map(j=>o.createElement(o.Fragment,{key:j},j==="title"?o.createElement(ks,{field:"name",label:d("todo.table.title"),className:`todo-table-title${M("title").className}`,thProps:M("title").props,sort:n,onSort:i,width:L.title,resize:Is("title",d("todo.table.title"))}):hp(j))),o.createElement("th",{className:"todo-table-actions",style:L.title?{width:"auto",minWidth:24}:void 0}))),o.createElement("tbody",null,z.map(j=>o.createElement(Qu,{key:j,order:u,groups:t,c:r,newTaskPatch:c,active:_===j,onActivate:()=>H(j),onRemove:()=>K(j)})),Ra)),!q.length&&!z.length&&o.createElement("div",{className:"todo-table-empty-state"},s)),o.createElement("div",{className:"todo-table-footer"},o.createElement("div",{className:"todo-table-selection"},o.createElement("span",null,J.length?d("todo.table.selectedCount",{count:J.length}):d(e.length===1?"todo.table.oneTask":"todo.table.taskCount",{count:e.length})),!J.length&&o.createElement("span",{className:"todo-table-done-count"},d("todo.table.completedCount",{count:ce})),J.length>0&&o.createElement(o.Fragment,null,o.createElement("button",{type:"button",className:"todo-table-bulk",onClick:fp},d("todo.table.complete")),o.createElement("button",{type:"button",className:"todo-table-bulk danger",onClick:()=>{gp()}},d("auto.f6fdbe48dc54")))),o.createElement("div",{className:"todo-table-pagination"},o.createElement("span",{className:"todo-table-rows-label"},d("todo.table.rowsPerPage")),o.createElement("button",{type:"button",className:"todo-table-page-size","aria-label":d("todo.table.rowsPerPage"),onClick:j=>{h.ui.openMenu(La.map(Q=>({label:String(Q),type:"radio",checked:Q===$,onSelect:()=>{S(Q),I(0)}})),{anchor:j.currentTarget,align:"start"})}},o.createElement("span",null,$),o.createElement(Vo,null)),k>1&&o.createElement("span",{className:"todo-table-page"},d("todo.table.page",{page:U+1,pages:k})),k>1&&o.createElement("div",{className:"todo-table-pager"},o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:U===0,"aria-label":d("todo.table.firstPage"),title:d("todo.table.firstPage"),onClick:()=>I(0)},o.createElement(vc,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:U===0,"aria-label":d("todo.table.previousPage"),title:d("todo.table.previousPage"),onClick:()=>I(U-1)},o.createElement(Yn,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:U>=k-1,"aria-label":d("todo.table.nextPage"),title:d("todo.table.nextPage"),onClick:()=>I(U+1)},o.createElement(Bo,null)),o.createElement("button",{type:"button",className:"todo-table-page-btn",disabled:U>=k-1,"aria-label":d("todo.table.lastPage"),title:d("todo.table.lastPage"),onClick:()=>I(k-1)},o.createElement(xc,null))))))}var _h={group:e=>e.group??void 0,notes:e=>Qo(e.note)||void 0,status:e=>to().indexOf(Ie(e)),location:e=>e.location?.name||void 0,tags:e=>e.tags?.[0]},tp=({navigation:e,instanceId:t})=>{let{dateFormat:r,activePluginTab:n}=dt("dateFormat","activePluginTab"),{selectedDate:i,selectedDateRange:a}=fa(),s=nt(),l=ma(),p=o.useMemo(()=>co(t),[t]),c=p??l,u=n?.pluginId===h.pluginId&&n.instanceId===t,m=da();o.useEffect(()=>{if(!p)return e.setController({canGoBack:m.canGoBack,canGoForward:m.canGoForward,goBack:()=>Xo(-1),goForward:()=>Xo(1)}),()=>e.setController(null)},[e,p,m.canGoBack,m.canGoForward]);let[f,b]=ca(),[w,T]=o.useState(()=>!!f.trim()),P=o.useRef(null),M=()=>{T(!0),window.setTimeout(()=>P.current?.focus(),0)},D=()=>{b(""),T(!1)},[x,v]=Uc(),{field:G,dir:W}=x,[B]=Tt(),[ee]=vt(),[L]=Yr(),R=Jo("due","asc");wo(R.openDetail),o.useEffect(()=>{if(!(R.loading||p))if(c.kind==="groups"){let g=new Set(Ee(s));!c.includeUngrouped&&!c.names.some(A=>g.has(A))&&Ze(Oe)}else c.kind==="tag"&&(R.todos.some(g=>g.tags?.includes(c.name))||Ze(Oe))},[R.loading,R.todos,s,c,p]);let $=it(),S=ha(c);o.useEffect(()=>{h.workspace.setMainTabTitle(S,t)},[S,t]);let z=o.useMemo(()=>Da(R.todos,{view:c,showCompleted:B,today:$,statusFilter:ee,priorities:L,search:f,selectedDate:i,selectedDateRange:a}),[R.todos,c,B,ee,L,f,i,a,$]),{ordered:C,sectionOf:_}=o.useMemo(()=>{let g=_h[G];if(g)return{ordered:Rl(z,g,W),sectionOf:void 0};if(G!=="auto")return{ordered:Ro(z,G,W),sectionOf:void 0};if(c.kind==="smart"&&c.id==="completed")return{ordered:Kl(z).flatMap(U=>U.todos),sectionOf:void 0};let A=Nn(z,$),k=new Map;for(let U of Fo)for(let q of A[U])k.set(q.id,U);return{ordered:Fo.flatMap(U=>A[U]),sectionOf:U=>k.get(U.id)??"someday"}},[z,G,W,c,$]),H=[tt(c),f,JSON.stringify(ee),L.join(),B,G,W,i??"",a?.start??"",a?.end??""].join("|"),O=()=>{h.workspace.patchTimeControl({selectedDate:null,rangeStart:null,rangeEnd:null})},[F,K]=o.useState(0),E=()=>K(g=>g+1),I=()=>{let g={};return c.kind==="groups"&&c.names.length===1&&!c.includeUngrouped&&(g.group=c.names[0]),c.kind==="smart"&&(c.id==="today"||c.id==="week")&&(g.dueDate=$),c.kind==="smart"&&c.id==="flagged"&&(g.flagged=!0),g},V=Ee(s),N=[{label:d("todo.fab.newTodo"),icon:o.createElement(gt,null),onSelect:E},...V.length?[{label:d("todo.fab.newTodoIn"),icon:o.createElement(Un,null),submenu:Et(V,s,g=>({label:g,onSelect:A=>{let k={kind:"groups",names:[g]};A?.newTab||p?(Zo(k,A?.newTab===!0),td()):(Ze(k),E())}}))}]:[],{type:"separator"},{label:d("todo.group.manage"),icon:o.createElement(Kn,null),onSelect:()=>{Na()}},{type:"separator"},{label:d("auto.fb3a16f382f8"),icon:o.createElement(lo,null),onSelect:()=>{navigator.clipboard.writeText(h.workspace.buildOwnLink(ua(c)))}},{label:d("auto.c7f73bb54d92"),icon:o.createElement(hc,null),onSelect:()=>h.workspace.openOwnSettings()}],y=t??"";return o.useEffect(()=>{(u||n?.pluginId!==h.pluginId)&&us(N,y)}),o.useEffect(()=>()=>us(null,y),[y]),o.createElement("div",{className:"todo-page"},o.createElement("div",{className:`todo-page-appbar${w?" is-searching":""}`},w?o.createElement("div",{className:"todo-page-search"},o.createElement(ht,{className:"todo-page-search-icon"}),o.createElement("input",{ref:P,className:"todo-page-search-input",value:f,onChange:g=>b(g.target.value),onKeyDown:g=>{g.key==="Escape"&&(g.preventDefault(),D())},onBlur:()=>{f.trim()||T(!1)},placeholder:d("todo.table.filterPlaceholder"),"aria-label":d("auto.e0345e9d3092")})):o.createElement("span",{className:"todo-page-appbar-spacer","aria-hidden":"true"}),(a||i)&&o.createElement("button",{type:"button",className:"todo-page-date-filter",title:d("auto.f93fb4b1ab19"),onClick:O},o.createElement("span",null,a?`${Ue(a.start,r)} \u2013 ${Ue(a.end,r)}`:Ue(i,r)),o.createElement(ge,null)),o.createElement("div",{className:"todo-page-appbar-actions"},o.createElement("button",{type:"button",className:`todo-page-appbar-btn${!w&&f.trim()?" active":""}`,"aria-label":w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),title:w?d("auto.67300d0fed7c"):d("auto.e0345e9d3092"),onMouseDown:g=>{w&&g.preventDefault()},onClick:w?D:M},w?o.createElement(ge,null):o.createElement(ht,null)),o.createElement(qu,null),o.createElement(Yu,null),o.createElement("button",{type:"button",className:"todo-page-appbar-btn todo-page-add","aria-label":d("todo.fab.newTodo"),title:d("todo.fab.newTodo"),onClick:E},o.createElement(gt,null)))),R.loading?o.createElement("div",{className:"right-sidebar-empty"},o.createElement("p",null,d("auto.b5868978587a"))):o.createElement(ep,{todos:C,groups:s,c:R,sort:x,onSort:v,resetKey:H,empty:d("todo.table.empty"),sectionOf:_,composeSignal:F,newTaskPatch:I}),o.createElement(tr,{c:R}))};var np=10080;function op(e){let t=/^(\d{1,3}):([0-5]\d)$/.exec(e.trim());if(!t)return null;let r=Number(t[1])*60+Number(t[2]);return r<=np?r:null}function rp(e){return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}function ap(){let e=()=>{let b=h.settings.get().reminderOffsets;return Array.isArray(b)?b.filter(w=>Number.isInteger(w)&&w>=0&&w<=np).slice(0,1):[10]},[t,r]=o.useState(e);o.useEffect(()=>h.settings.subscribe(()=>r(e())),[]);let{Row:n,Section:i,SelectField:a}=h.ui.settings,s=t.length?"custom":"off",[l,p]=o.useState(()=>rp(t[0]??10)),[c,u]=o.useState(!1);o.useEffect(()=>{t.length&&(p(rp(t[0])),u(!1))},[t[0]]);let m=b=>{r(b),h.settings.set("reminderOffsets",b)},f=()=>{let b=op(l);if(b===null){u(!0);return}u(!1),b!==t[0]&&m([b])};return o.createElement(i,{title:d("reminders.title")},o.createElement(n,{title:d("reminders.defaultTitle"),description:d("reminders.defaultDesc")},o.createElement(a,{className:"todo-reminder-mode",ariaLabel:d("reminders.defaultTitle"),value:s,onChange:b=>m(b==="off"?[]:[op(l)??10]),options:[{value:"off",label:d("reminders.off")},{value:"custom",label:d("reminders.custom")}]})),s==="custom"&&o.createElement(n,{title:d("reminders.timeBefore"),description:c?o.createElement("span",{className:"todo-reminder-note is-error",role:"alert"},d("reminders.timeInvalid")):d("reminders.timeBeforeDesc")},o.createElement("input",{className:`settings-control todo-reminder-time${c?" invalid":""}`,type:"text",inputMode:"numeric",value:l,placeholder:"0:10","aria-label":d("reminders.timeBefore"),"aria-invalid":c||void 0,maxLength:6,onChange:b=>{p(b.currentTarget.value.replace(/[^\d:]/g,"").replace(/:(?=.*:)/g,"")),u(!1)},onBlur:f,onKeyDown:b=>{b.key==="Enter"&&(b.preventDefault(),f())}})))}function Ga(e){let[t,r]=o.useState(e);return o.useEffect(()=>h.settings.subscribe(()=>r(e())),[e]),[t,r]}function go({initial:e,onCommit:t,onType:r,onEnter:n,placeholder:i,ariaLabel:a,disabled:s,className:l="todo-settings-text",invalid:p}){let c=o.useRef(!1);return o.createElement("input",{className:`settings-control ${l}${p?" invalid":""}`,"aria-invalid":p||void 0,type:"text",defaultValue:e,placeholder:i,"aria-label":a,disabled:s,autoComplete:"off",spellCheck:!1,onChange:u=>r?.(u.currentTarget.value),onBlur:u=>{if(c.current){c.current=!1;return}t(u.currentTarget.value)},onKeyDown:u=>{if(u.key==="Enter"){if(u.preventDefault(),n){t(u.currentTarget.value),n();return}u.currentTarget.blur()}else u.key==="Escape"&&(u.preventDefault(),u.currentTarget.value=e,r?.(e),c.current=!0,u.currentTarget.blur())}})}var Gh={scheduled:()=>o.createElement(jo,null),today:()=>o.createElement(Cr,null),week:()=>o.createElement(Xn,null),flagged:()=>o.createElement(ke,null),all:()=>o.createElement(Dr,null),completed:()=>o.createElement(Fe,null)};function ip(){let{ColorField:e,Section:t,SelectField:r,Toggle:n,useReorderDrag:i}=h.ui.settings,[a,s]=Ga(na),l=[{value:"auto",label:d("todo.settings.textAuto")},{value:"white",label:d("todo.settings.textWhite"),color:"#ffffff"},{value:"black",label:d("todo.settings.textBlack"),color:"#000000"}],p=b=>{s(b),Fc(b)},c=a.order.filter(b=>!a.hidden.includes(b)).length,u=a.order.map(b=>Pr(b,a)),m=i({items:u,indicatorOnly:!0,getId:b=>b.id,getLabel:b=>d(b.labelKey),onReorder:b=>p({...a,order:b.map(w=>w.id)})}),f=(b,w)=>{if(w){p({...a,hidden:a.hidden.filter(M=>M!==b)});return}if(c<=1)return;let T={...a,hidden:[...a.hidden,b]};p(T);let P=wt();P.kind==="smart"&&P.id===b&&Ze({kind:"smart",id:T.order.find(M=>!T.hidden.includes(M))})};return o.createElement(t,{title:d("todo.settings.smartLists")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.smartListsDesc")),o.createElement("div",{className:"todo-settings-list todo-smart-list-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colList")),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",null,d("todo.settings.colText")),o.createElement("span",null,d("todo.settings.colShow"))),u.map((b,w)=>{let T=a.hidden.includes(b.id),P=`${b.id}@${w}`,M=m.getHandleProps(b),D=d(b.labelKey);return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-smart-list-setting-row"+(T?" is-off":"")+(m.overId===b.id?" drop-"+(m.dropPosition??"before"):""),key:b.id,...m.getItemProps(b)},o.createElement("button",{...M,className:(M.className??"")+" todo-settings-handle",title:d("todo.settings.smartListReorder")},o.createElement(Ut,null)),o.createElement("span",{className:"todo-settings-chip",style:{background:ye(b.color),color:Or(b,Nt)},"aria-hidden":"true"},Gh[b.id]()),o.createElement("span",{className:"todo-settings-name"},D),o.createElement(e,{key:`color:${P}`,value:b.color,onChange:x=>p({...a,colors:{...a.colors,[b.id]:x}}),ariaLabel:d("todo.settings.smartListColor",{p0:D}),allowCustom:!1}),o.createElement(r,{key:`text:${P}`,className:"todo-settings-text-select",value:b.textColor??"auto",options:l,ariaLabel:d("todo.settings.statusText",{p0:D}),onChange:x=>{let v={...a.textColors};x==="auto"?delete v[b.id]:v[b.id]=x,p({...a,textColors:v})}}),o.createElement(n,{key:`show:${P}`,checked:!T,disabled:!T&&c<=1,label:d("todo.settings.smartListShow",{p0:D}),onChange:x=>f(b.id,x)}))})),m.liveRegion)}function Rh({name:e}){let t=Fn(),r=e?t[e]:void 0;return r?o.createElement("span",{className:"todo-status-menu-svg todo-status-asset","aria-hidden":"true",dangerouslySetInnerHTML:{__html:r}}):o.createElement("span",{className:"todo-status-menu-dot todo-st-open","aria-hidden":"true"})}function sp({current:e,onPick:t}){let r=Fn(),n=Object.keys(r).sort((i,a)=>i.localeCompare(a));return o.createElement("div",{className:"todo-icon-picker"},o.createElement("div",{className:"todo-icon-picker-grid",role:"listbox","aria-label":d("todo.settings.statusIcon")},n.map(i=>o.createElement("button",{key:i,type:"button",role:"option","aria-selected":e===i,className:`todo-icon-picker-item${e===i?" is-active":""}`,title:i,"aria-label":i,onClick:()=>t(e===i?void 0:i)},o.createElement("span",{className:"todo-icon-picker-svg",dangerouslySetInnerHTML:{__html:r[i]}})))),o.createElement("p",{className:"todo-icon-picker-hint"},d("todo.settings.statusIconHint",{p0:Ji})))}function dp(){let{ColorField:e,IconButton:t,Section:r,Toggle:n,useReorderDrag:i}=h.ui.settings,[a,s]=Ga(Pe);Fn();let l=o.useRef(""),[p,c]=o.useState(0),[u,m]=o.useState(!1),f=S=>{let z=xn(S);s(z),sl(z)},b=a.active.map(S=>Te(S,a)),w=i({items:b,indicatorOnly:!0,getId:S=>S.id,getLabel:S=>S.label,onReorder:S=>f({...a,active:S.map(z=>z.id)})}),T=(S,z)=>{z!==a.active.includes(S)&&f({...a,active:z?[...a.active,S]:a.active.filter(C=>C!==S)})},P=S=>S.replace(/[\u0000-\u001f]/g," ").trim().slice(0,Ao),[M,D]=o.useState({strike:!1,color:fe("teal"),done:!1,show:!0}),x=()=>{let S=P(l.current);if(!S||a.custom.length>=ur)return;let z=mi();f({...a,custom:[...a.custom,{id:z,label:S,done:M.done}],active:M.show?[...a.active,z]:a.active,strikethrough:{...a.strikethrough,[z]:M.strike},colors:{...a.colors,[z]:M.color},icons:M.icon?{...a.icons,[z]:M.icon}:a.icons}),l.current="",m(!1),D({strike:!1,color:fe("teal"),done:!1,show:!0}),c(C=>C+1)},v=(S,z)=>{let C=P(z);if(Je(S)){if(!C)return;f({...a,custom:a.custom.map(_=>_.id===S?{..._,label:C}:_)})}else{let _={...a.labels};C&&C!==al(S)?_[S]=C:delete _[S],f({...a,labels:_})}},G=async(S,z)=>{Je(S)?f({...a,custom:a.custom.map(_=>_.id===S?{..._,done:z}:_)}):f({...a,done:{...a.done,[S]:z}});let C=(await Ve()).filter(_=>_.status===S);await Promise.all(C.map(_=>Yi(_.id,S)))},W=(S,z)=>{let C=Pe(),_={...C.icons};z?_[S]=z:delete _[S],f({...C,icons:_})},B=(S,z)=>{h.ui.openPopover(({close:C})=>o.createElement(sp,{current:a.icons[z],onPick:_=>{W(z,_),C()}}),{anchor:S,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})},ee=async S=>{let z=Te(S,a).label,C=(await Ve()).filter(O=>O.status===S);if(await h.ui.confirm({title:d("todo.settings.statusDeleteTitle",{p0:z}),message:C.length?d("todo.settings.statusDeleteMoves",{count:C.length,p0:d("todo.status.todo")}):d("todo.settings.statusDeleteUnused"),actions:[{label:d("auto.77dfd2135f4d"),value:"cancel",variant:"ghost"},{label:d("auto.f6fdbe48dc54"),value:"delete",variant:"danger"}]})!=="delete")return;await Promise.all(C.map(O=>Yi(O.id,"open")));let H=Pe();Je(S)?f({...H,custom:H.custom.filter(O=>O.id!==S),active:H.active.filter(O=>O!==S)}):f({...H,removed:[...H.removed,S],active:H.active.filter(O=>O!==S)})},L=(S,z,C)=>{let _=S.id,H=`${_}@${C}`,O=S.label,F=z==="shown"?w.getHandleProps(S):null,K=z==="locked";return o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row"+(K?" locked":"")+(z==="off"?" is-off":"")+(z==="shown"&&w.overId===_?" drop-"+(w.dropPosition??"before"):""),key:_,...z==="shown"?w.getItemProps(S):{}},F?o.createElement("button",{...F,className:(F.className??"")+" todo-settings-handle",title:d("todo.settings.statusReorder")},o.createElement(Ut,null)):o.createElement("span",{className:"todo-settings-handle is-static",title:K?d("todo.settings.statusLocked"):void 0},K&&o.createElement(ac,null)),K?o.createElement("span",{className:`todo-settings-glyph ${S.cls}`},o.createElement(we,{status:_==="open"?null:_,dotCls:S.cls})):o.createElement("button",{type:"button",className:`todo-settings-glyph todo-settings-icon-btn ${S.cls}`,title:d("todo.settings.statusIconOf",{p0:O}),"aria-label":d("todo.settings.statusIconOf",{p0:O}),onClick:E=>B(E.currentTarget,_)},o.createElement(we,{status:_,dotCls:S.cls})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(go,{key:`name:${H}:${O}`,initial:O,ariaLabel:d("todo.settings.statusName"),onCommit:E=>v(_,E)})),o.createElement(t,{key:`strike:${H}`,className:"todo-settings-strike",pressed:a.strikethrough[_],"aria-pressed":a.strikethrough[_],ariaLabel:d("todo.settings.statusStrike",{p0:O}),title:d("todo.settings.statusStrike",{p0:O}),onClick:()=>f({...a,strikethrough:{...a.strikethrough,[_]:!a.strikethrough[_]}})},o.createElement(Zn,null)),o.createElement(e,{key:`color:${H}`,value:a.colors[_],onChange:E=>f({...a,colors:{...a.colors,[_]:E}}),ariaLabel:d("todo.settings.statusColor",{p0:O}),allowCustom:!1}),o.createElement(t,{key:`done:${H}`,className:"todo-settings-strike",pressed:S.done,"aria-pressed":S.done,disabled:K,ariaLabel:d("todo.settings.statusDone",{p0:O}),title:d("todo.settings.statusDone",{p0:O}),onClick:()=>{K||G(_,!S.done)}},o.createElement(Fe,null)),K?o.createElement("span",null):o.createElement(n,{key:`show:${H}`,checked:z!=="off",label:d("todo.settings.statusShow",{p0:O}),onChange:E=>T(_,E)}),K?o.createElement("span",null):o.createElement(t,{key:`delete:${H}`,ariaLabel:d("todo.settings.statusDelete",{p0:O}),title:d("todo.settings.statusDelete",{p0:O}),onClick:()=>{ee(_)}},o.createElement(Kt,null)))},R=[...Zt.filter(S=>!a.active.includes(S)&&!a.removed.includes(S)),...a.custom.map(S=>S.id).filter(S=>!a.active.includes(S))].map(S=>Te(S,a)),$=a.custom.length>=ur;return o.createElement(r,{title:d("todo.settings.statuses")},o.createElement("p",{className:"todo-settings-desc"},d("todo.settings.statusesDescAll")),o.createElement("div",{className:"todo-settings-list todo-status-settings",role:"list"},o.createElement("div",{className:"todo-settings-item todo-settings-head","aria-hidden":"true"},o.createElement("span",null),o.createElement("span",null,d("todo.settings.colIcon")),o.createElement("span",{className:"todo-settings-name"},d("todo.settings.colStatus")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colStrike")},o.createElement(Zn,null)),o.createElement("span",null,d("todo.settings.colColor")),o.createElement("span",{className:"todo-settings-head-glyph",title:d("todo.settings.colDone")},o.createElement(Fe,null)),o.createElement("span",null,d("todo.settings.colShow")),o.createElement("span",null)),L(Te("open",a),"locked",0),L(Te("completed",a),"locked",1),b.map((S,z)=>L(S,"shown",2+z)),R.map((S,z)=>L(S,"off",2+b.length+z)),o.createElement("div",{role:"listitem",className:"todo-settings-item todo-status-setting-row todo-status-add-row"},o.createElement("span",{className:"todo-settings-handle is-static"}),o.createElement("button",{type:"button",className:"todo-settings-glyph todo-settings-icon-btn todo-status-add-icon",style:{color:ye(M.color)},disabled:$,title:d("todo.settings.statusIcon"),"aria-label":d("todo.settings.statusIcon"),onClick:S=>{h.ui.openPopover(({close:z})=>o.createElement(sp,{current:M.icon,onPick:C=>{D(_=>({..._,icon:C})),z()}}),{anchor:S.currentTarget,align:"start",gap:4},{className:"todo-cell-popover",ariaLabel:d("todo.settings.statusIcon"),width:300})}},o.createElement(Rh,{name:M.icon})),o.createElement("span",{className:"todo-settings-name todo-settings-name-field"},o.createElement(go,{key:`add:${p}`,initial:"",placeholder:d("todo.settings.statusNewPlaceholder"),ariaLabel:d("todo.settings.statusNew"),disabled:$,onType:S=>{l.current=S,!!P(S)!==u&&m(!u)},onCommit:S=>{l.current=S},onEnter:x})),o.createElement(t,{className:"todo-settings-strike",pressed:M.strike,"aria-pressed":M.strike,disabled:$,ariaLabel:d("todo.settings.colStrike"),title:d("todo.settings.colStrike"),onClick:()=>D(S=>({...S,strike:!S.strike}))},o.createElement(Zn,null)),o.createElement(e,{key:`add-color:${p}`,value:M.color,onChange:S=>D(z=>({...z,color:S})),ariaLabel:d("todo.settings.colColor"),allowCustom:!1}),o.createElement(t,{className:"todo-settings-strike",pressed:M.done,"aria-pressed":M.done,disabled:$,ariaLabel:d("todo.settings.colDone"),title:d("todo.settings.colDone"),onClick:()=>D(S=>({...S,done:!S.done}))},o.createElement(Fe,null)),o.createElement(n,{key:`add-show:${p}`,checked:M.show,disabled:$,label:d("todo.settings.colShow"),onChange:S=>D(z=>({...z,show:S}))}),o.createElement(t,{ariaLabel:d("todo.settings.statusAdd"),title:d("todo.settings.statusAdd"),disabled:$||!u,onClick:x},o.createElement(gt,null)))),w.liveRegion,a.removed.length>0&&o.createElement("button",{type:"button",className:"todo-detail-add todo-status-restore",onClick:()=>f({...a,removed:[],active:[...a.active,...a.removed]})},d("todo.settings.statusRestore",{count:a.removed.length})))}function Fh(){let{Button:e,ColorField:t,IconButton:r,Section:n,useReorderDrag:i}=h.ui.settings,a=vl(),s=yl(),l=zh(),p=o.useRef(""),[c,u]=o.useState(0),[m,f]=o.useState(()=>So(s)),[b,w]=o.useState(!1),T=(N,y)=>s.some(g=>g.id!==y&&[g.name,...g.aliases??[]].some(A=>Z(A)===Z(N))),P=N=>{$i(N)},M=N=>{let y=new Set([N.name,...N.aliases??[]].map(Z));return l.filter(g=>y.has(Z(g))).length},D=N=>si(a,N).reduce((y,g)=>y+M(g),0),x=28,[v,G]=o.useState(!1),[W,B]=o.useState(null),[ee,L]=o.useState(()=>So(s)),[R,$]=o.useState(!1),S=o.useRef(null);o.useEffect(()=>{W&&S.current?.querySelector("input")?.focus()},[W]);let z=(N,y)=>{if(!y)return;let g;try{g=cr(a,N,y)}catch{return}g.every((A,k)=>A.id===a[k]?.id&&A.parent===a[k]?.parent)||P(g)},C=i({items:a,indicatorOnly:!0,getId:N=>N.id,getLabel:N=>N.name,onReorder:(N,y)=>{let g=y.position==="before"?a[0]?.id:a.at(-1)?.id;z(y.activeId,wd(a,y.activeId,y.position,y.overId===g))}}),_=N=>N.clientX>N.currentTarget.getBoundingClientRect().left+x,H=N=>{let y=C.getItemProps(N);return{...y,onDragOver:g=>{y.onDragOver?.(g),G(_(g))},onDrop:g=>{let A=C.activeId??g.dataTransfer.getData("text/plain");if(!A)return;g.preventDefault();let k=g.currentTarget.getBoundingClientRect();z(A,xo(a,A,N.id,g.clientY<k.top+k.height/2?"before":"after",_(g))),C.cancel()}}},O=C.activeId&&C.overId&&C.dropPosition?xo(a,C.activeId,C.overId,C.dropPosition,v):null,F=(N,y)=>{if(!O)return"";let g=O.parent!==null?" drop-nested":"";return O.before!==null?O.before===N.id?" drop-before"+g:"":((O.parent===null?a:a.filter(U=>U.id===O.parent||U.parent===O.parent)).filter(U=>U.id!==C.activeId&&U.parent!==C.activeId).at(-1)??a[y]).id===N.id?" drop-after"+g:""},K=()=>{$(!1),L(So(s))},E=N=>{let y=N.trim().slice(0,No);if(!W||!y||a.length>=Tr){B(null);return}if(T(y)){$(!0);return}let g={id:Ii(),name:y,color:ee};try{P(cr([...a,g],g.id,{parent:W,before:null}))}catch{}B(null)},I=()=>{let N=p.current.trim().slice(0,No);if(!N||a.length>=Tr)return;if(T(N)){w(!0);return}let y={id:Ii(),name:N,color:m};P([...a,y]),p.current="",w(!1),f(So([...s,y])),u(g=>g+1)},V=(N,y)=>{!y.trim()||y.trim()===N.name||T(y,N.id)||P(a.map(g=>g.id===N.id?pl(g,y):g))};return o.createElement(n,null,o.createElement("div",{className:"settings-path-row settings-groups-row"},o.createElement("span",{className:"settings-toggle-text"},o.createElement("span",{className:"settings-toggle-title"},d("todo.settings.localGroups")),o.createElement("span",{className:"settings-toggle-desc"},d("todo.settings.localGroupsDesc"))),o.createElement("div",{className:"settings-colorrules settings-groups todo-local-groups",role:"list","aria-label":d("todo.settings.localGroups")},a.map((N,y)=>{let g=`${N.id}@${y}`,A=C.getHandleProps(N),k=ii(a,N.id).length,U=N.parent?M(N):D(N),q=U>0||k>0,J=W!==null&&(a[y+1]?.parent??null)!==W&&(N.id===W||N.parent===W);return o.createElement(o.Fragment,{key:N.id},o.createElement("div",{role:"listitem",className:"settings-colorrule-row"+(N.parent?" settings-group-sub":"")+F(N,y),...H(N)},o.createElement("button",{...A,className:(A.className??"")+" settings-colorrule-grip"},o.createElement(Ut,null)),o.createElement(go,{key:`name:${N.id}:${N.name}`,className:"settings-colorrule-key",initial:N.name,ariaLabel:d("todo.settings.localGroupName"),onCommit:ce=>V(N,ce)}),o.createElement(t,{key:`color:${g}`,value:N.color,onChange:ce=>P(a.map(de=>de.id===N.id?{...de,color:ce}:de)),ariaLabel:d("todo.settings.localGroupColor",{p0:N.name})}),N.parent?o.createElement("span",{"aria-hidden":"true"}):o.createElement(r,{key:`addsub:${g}`,className:"settings-group-addsub",ariaLabel:d("todo.settings.localSubgroupAddTo",{p0:N.name}),title:d("todo.settings.localSubgroupAdd"),onClick:()=>{K(),B(N.id)}},o.createElement(gt,null)),o.createElement("span",{className:"settings-group-usage","aria-label":d("todo.settings.localGroupUsage",{count:U}),title:d("todo.settings.localGroupUsage",{count:U})},U),o.createElement(r,{key:`remove:${g}`,className:"settings-colormap-remove","aria-disabled":q||void 0,ariaLabel:d("todo.settings.localGroupDelete",{p0:N.name}),title:U>0?d("todo.settings.localGroupRemoveBlocked",{count:U}):k>0?d("todo.settings.localGroupRemoveSubgroups"):d("todo.settings.localGroupRemove"),onClick:()=>{q||P(a.filter(ce=>ce.id!==N.id))}},o.createElement(ge,null))),J&&o.createElement("div",{ref:S,className:"settings-colorrule-row settings-group-sub"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(go,{className:"settings-colorrule-key",initial:"",invalid:R,placeholder:d("todo.settings.localSubgroupNew"),ariaLabel:d("todo.settings.localSubgroupNew"),onType:()=>$(!1),onCommit:E}),o.createElement(t,{key:`sub-color:${W}`,value:ee,onChange:L,ariaLabel:d("todo.settings.localGroupNewColor")})))}),C.liveRegion,o.createElement("div",{className:"settings-colorrule-row settings-colorrule-add"},o.createElement("span",{className:"settings-colorrule-grip settings-colorrule-grip-placeholder","aria-hidden":"true"}),o.createElement(go,{key:`add:${c}`,className:"settings-colorrule-key",initial:"",invalid:b,placeholder:d("todo.settings.localGroupNew"),ariaLabel:d("todo.settings.localGroupNew"),onType:N=>{p.current=N,w(!1)},onCommit:N=>{p.current=N},onEnter:I}),o.createElement(t,{key:`add-color:${c}`,value:m,onChange:f,ariaLabel:d("todo.settings.localGroupNewColor")}),o.createElement("span",{"aria-hidden":"true"}),o.createElement("span",{className:"settings-colorrule-add-action"},o.createElement("span",{className:"settings-button settings-button--medium settings-colorrule-add-sizer","aria-hidden":"true"},d("todo.settings.localGroupAdd")),o.createElement(e,{type:"button",className:"settings-colormap-add-btn",disabled:a.length>=Tr,onClick:I},d("todo.settings.localGroupAdd")))),(b||R)&&o.createElement("span",{className:"settings-empty-text"},d("todo.settings.localGroupDuplicate")))))}function lp(){let{GroupsEditor:e,Row:t,Section:r,Toggle:n}=h.ui.settings,i=wl();return o.createElement(o.Fragment,null,o.createElement(r,null,o.createElement(t,{title:d("todo.settings.useSharedGroups"),description:d("todo.settings.useSharedGroupsDesc")},o.createElement(n,{checked:i.shared,label:d("todo.settings.useSharedGroups"),onChange:a=>{h.settings.set(Ri,a)}})),o.createElement(t,{title:d("todo.settings.useLocalGroups"),description:d("todo.settings.useLocalGroupsDesc")},o.createElement(n,{checked:i.local,label:d("todo.settings.useLocalGroups"),onChange:a=>{h.settings.set(Fi,a)}}))),i.shared&&o.createElement(r,null,o.createElement(e,null)),i.local&&o.createElement(Fh,null))}function zh(){let[e,t]=o.useState([]);return o.useEffect(()=>{let r=!0,n=()=>{Ve().then(a=>{r&&t(a.flatMap(s=>s.group?[s.group]:[]))}).catch(()=>{})};n();let i=Ot(n);return()=>{r=!1,i()}},[]),e}function $h(){let{Row:e,Section:t,SelectField:r}=h.ui.settings,[n,i]=o.useState(ra);return o.createElement(o.Fragment,null,o.createElement(t,{title:d("todo.settings.display")},o.createElement(e,{title:d("todo.settings.dateBreakdown"),description:d("todo.settings.dateBreakdownDesc")},o.createElement(r,{className:"todo-date-breakdown-select",value:n,onChange:a=>{let s=a;i(s),h.settings.set(rs,s)},ariaLabel:d("todo.settings.dateBreakdown"),options:[{value:"monthly",label:d("todo.breakdown.monthly")},{value:"weekly",label:d("todo.breakdown.weekly")},{value:"daily",label:d("todo.breakdown.daily")}]}))),o.createElement(ap,null))}function cp({section:e}){return e==="lists"?o.createElement(o.Fragment,null,o.createElement(ip,null),o.createElement(dp,null)):e==="groups"?o.createElement(lp,null):o.createElement($h,null)}var up="reminder:";function pp(){let e=be();return h.notifications.onAction(({key:t,action:r,targetItemId:n})=>{if(r!=="click"||!t.startsWith(up))return;let i=n??t.slice(up.length).split(":")[0];Ve(e).then(a=>{e.assertActive();let s=a.find(l=>l.id===i);s?.filePath?e.api.workspace.openFile(s.filePath):e.api.commands.executeOwn("open-page",{})}).catch(()=>{})})}var Es=(e,t=[])=>({type:"object",properties:e,required:t,additionalProperties:!1}),As=e=>({type:"string",description:e});async function Cs(e,t,r,n){let i=await e.commands.executeOwn(t,r,{...n,autonomous:!0});if(!i.ok)throw new Error(i.error.message);return i.value}function mp(e){return Ha([{name:"list_todos",description:"List open tasks from the Todo plugin.",parameters:Es({}),sideEffect:"read",commandId:"list",run:async(t,r)=>{let i=(await Cs(e,"list",{section:"",q:""},r)).filter(a=>a.completed!==!0&&a.status!=="completed");return i.length?i.map(a=>`- [${a.status||"open"}] ${a.title??""} (${a.id??""})`).join(`
`):"No open todos."}},{name:"add_todo",description:"Add a task to the Todo plugin.",parameters:Es({title:As("Task title"),due:As("Optional due date YYYY-MM-DD")},["title"]),sideEffect:"write",commandId:"add",run:async(t,r)=>{let n=String(t.title??"");return`Added todo "${(await Cs(e,"add",{title:n,due:String(t.due??"")},r)).title||n}".`}},{name:"complete_todo",description:"Mark a Todo task complete by id.",parameters:Es({id:As("Todo id")},["id"]),sideEffect:"write",commandId:"complete",run:async(t,r)=>{let n=String(t.id??"");return`Completed "${(await Cs(e,"complete",{query:n},r)).title||n}".`}}])}function Uh(e){tl(e);let t=ed(e),r=hd(),n=cl(),i=rc(),a=Zc(),s=Ml(e),l=!1,p=e.backend.on("records.eventDeliveryFailed",()=>{l||(l=!0,e.ui.confirm({title:d("workflow.delivery.title"),message:d("workflow.delivery.message"),actions:[{label:d("workflow.delivery.close"),value:"close"}]}).catch(()=>{}).finally(()=>{l=!1}))});Rc();let c=e.workspace.onOpenOwnLink(x=>{pa(x)});e.registerView("todo.panel",Fu),e.registerView("todo.file",zu),e.registerView("todo.page",tp),e.registerView("todo.settings",cp);let u=Yl(e),m=tu(e),f=e.interop.services.provide(Wa,mp(e)),b=ec(),w=Bc(),T=e.interop.services.subscribe(yo,()=>{}),P=Wc(e),M=pp(),D=Sl();return()=>{p(),t(),u(),m(),f(),b(),w(),T(),P(),M(),D(),c(),n(),i(),a(),s(),r()}}var Kh={register:Uh},rD=Kh;export{rD as default,Uh as register};

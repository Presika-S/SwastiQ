
const $=s=>document.querySelector(s);
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const TODAY=ymd(new Date());

const IC={
 vol:'<path d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/>',
 wifi:'<path d="M2 9a15 15 0 0120 0M5 13a10 10 0 0114 0M8.5 16.5a5 5 0 017 0M12 20h.01"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
 bell:'<path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 004 0"/>',
 usr:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
 home:'<path d="M3 11l9-8 9 8v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
 dash:'<path d="M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z"/>',
 mic:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
 reg:'<path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7"/>',
 ppl:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3.5 3.5 0 010 7M22 20c0-3-2-5-4-5.5"/>',
 fu:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M9 16l2 2 4-4"/>',
 al:'<path d="M12 3l10 18H2zM12 10v5M12 18v.1"/>',
 rep:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
 set:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 door:'<path d="M4 21h16M6 21V5a2 2 0 012-2h8a2 2 0 012 2v16M14 11v2"/>'
};
const svg=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

/* ==================== COMPLETE 9-LANGUAGE I18N SYSTEM ==================== */
const LANG_DEFS=[
 {id:'Tamil',code:'ta-IN',short:'ta',native:'தமிழ்',greeting:'வணக்கம்',voice:'ta-IN'},
 {id:'Hindi',code:'hi-IN',short:'hi',native:'हिन्दी',greeting:'नमस्ते',voice:'hi-IN'},
 {id:'Telugu',code:'te-IN',short:'te',native:'తెలుగు',greeting:'నమస్కారం',voice:'te-IN'},
 {id:'Kannada',code:'kn-IN',short:'kn',native:'ಕನ್ನಡ',greeting:'ನಮಸ್ಕಾರ',voice:'kn-IN'},
 {id:'Malayalam',code:'ml-IN',short:'ml',native:'മലയാളം',greeting:'നമസ്കാരം',voice:'ml-IN'},
 {id:'Bengali',code:'bn-IN',short:'bn',native:'বাংলা',greeting:'নমস্কার',voice:'bn-IN'},
 {id:'Marathi',code:'mr-IN',short:'mr',native:'मराठी',greeting:'नमस्कार',voice:'mr-IN'},
 {id:'Gujarati',code:'gu-IN',short:'gu',native:'ગુજરાતી',greeting:'નમસ્તે',voice:'gu-IN'},
 {id:'English',code:'en-IN',short:'en',native:'English',greeting:'Welcome',voice:'en-IN'}
];
const LANGS=['Auto Detect',...LANG_DEFS.map(l=>l.id)];
const LC={'Auto Detect':'indic-auto',...Object.fromEntries(LANG_DEFS.map(l=>[l.id,l.code]))};

const I18N={
 English:{
  home:'Home',dash:'Dashboard',voice:'Voice Assistant',reg:'Register',ben:'Beneficiaries',fu:'Follow-ups',alerts:'Alerts',rep:'Reports',set:'Settings',
  goodMorning:'Good morning',todayVisits:'Today’s visits',totalBen:'Total beneficiaries',fuDue:'Follow-ups due',recReview:'Records to review',
  recVoiceBtn:'Record a visit by voice',pulseTitle:'Community pulse',pulseSub:'Based on overdue follow-ups, open alerts and records to review.',
  todaySched:'Today’s schedule',markDone:'Mark done',noVisitsToday:'No visits scheduled today.',weeklyAct:'Weekly visit activity',recentVisits:'Recent visit records',
  voiceTitle:'Voice assistant',liveNotice:'Live voice active. Speech recognised by Gnani Prisma, read-back by Gnani Timbre.',
  demoNotice:'How to speak a visit: Say beneficiary ID, weight and next visit date, e.g. “Beneficiary 102, weight 48 kg, next visit December 5”.',
  stIdle:'Ready',stListening:'Listening (No time limit)',stTranscribing:'Transcribing...',stUnderstanding:'Understanding...',stConfirm:'Awaiting confirmation',stSaved:'Saved successfully',stClarify:'Needs clarification',stDraft:'Offline draft',
  micHintIdleLive:'Tap microphone to record. Talk at your own pace; tap Stop when finished.',
  convTitle:'Conversation',noConv:'Your conversation will appear here.',previewTitle:'Visit record preview',
  exPatient:'Existing patient',newPatient:'New patient',benId:'Beneficiary ID',patientName:'Patient name',age:'Age',ward:'Ward',visitType:'Visit type',weight:'Weight',vaccDue:'Vaccinations due',nextVisit:'Next visit',
  updateFields:'Update fields',hideUpdate:'Hide update options',spellName:'Spell name by voice',readBack:'Read back',retry:'Retry',confirmSave:'Confirm and save',regSave:'Register patient and save visit',recAnother:'Record another visit',
  dangerReported:'Danger sign reported',referPhc:'Refer to the PHC immediately.',searchBen:'Search by ID or name',historyBtn:'View history',
  regTitle:'Digital field register',exportCsv:'Export CSV',searchReg:'Search visit or beneficiary ID',colVisit:'Visit',colId:'ID',colDate:'Date',colWeight:'Weight',colVacc:'Vaccine due',colNext:'Next visit',colStatus:'Status',colDetails:'Details',
  fuTitle:'Follow-up tracker',tabToday:'Today',tabUpcoming:'Upcoming',tabOverdue:'Overdue',tabCompleted:'Completed',reschedule:'Reschedule',
  alertTitle:'Smart alert centre',testSound:'Test alert sound',ruleNotice:'Alerts come from fixed rules, not AI guesses. SwastiQ does not diagnose or advise treatment.',seenAlert:'I have seen this alert',alertHist:'Alert history',refConfirmed:'Referral confirmed',confirmRef:'Confirm referral made',
  repTitle:'Reports',repTotalVisits:'Total visits',repFuCompleted:'Follow-ups completed',repFuPending:'Pending follow-ups',repBenVisited:'Beneficiaries visited',repVaccFu:'Vaccination follow-ups',repRefConfirmed:'Referrals confirmed',repRecReviewed:'Records reviewed',repRecToReview:'Records to review',
  setName:'Worker name',setLang:'Language',setNotif:'Desktop notifications',setSound:'Alert sound & spoken alerts',setReadback:'Read-back before saving',setOffline:'Save offline drafts',setTx:'Keep original transcript',saveSet:'Save settings',yourData:'Your data',wipeAll:'Delete all data',
  stopRec:'Stop recording',doorBtn:'Language Door',doorOpenedToast:'Language door opened',langSwitched:'Language switched to '
 },
 Tamil:{
  home:'முகப்பு',dash:'டாஷ்போர்டு',voice:'குரல் உதவியாளர்',reg:'பதிவேடு',ben:'பயனாளிகள்',fu:'பின்தொடர்தல்',alerts:'எச்சரிக்கைகள்',rep:'அறிக்கைகள்',set:'அமைப்புகள்',
  goodMorning:'வணக்கம்',todayVisits:'இன்றைய வருகைகள்',totalBen:'மொத்த பயனாளிகள்',fuDue:'நிலுவை பின்தொடர்தல்',recReview:'சரிபார்க்க வேண்டியவை',
  recVoiceBtn:'குரல் மூலம் வருகையைப் பதிவு செய்',pulseTitle:'சமூக சுகாதார நிலை',pulseSub:'நிலுவையில் உள்ள பின்தொடர்தல் மற்றும் எச்சரிக்கைகளின் அடிப்படையில்.',
  todaySched:'இன்றைய அட்டவணை',markDone:'முடிந்தது',noVisitsToday:'இன்று வருகைகள் திட்டமிடப்படவில்லை.',weeklyAct:'வாராந்திர வருகை செயல்பாடு',recentVisits:'சமீபத்திய வருகைப் பதிவுகள்',
  voiceTitle:'குரல் உதவியாளர் (ஞானி AI)',liveNotice:'நேரலை குரல் தயார். ஞானி பிரிஸ்மா v3.0 மூலம் பேச்சு அங்கீகரிக்கப்பட்டு, டிம்ப்ரே மூலம் வாசிக்கப்படுகிறது.',
  demoNotice:'வருகையை எவ்வாறு பேச வேண்டும்: பயனாளி எண், எடை, அடுத்த வருகைத் தேதி கூறவும். எ.கா: “பயனாளி 102, எடை 48 கிலோ, அடுத்த வருகை டிசம்பர் 5”.',
  stIdle:'தயார்',stListening:'கேட்கிறது (நேர வரம்பு இல்லை)',stTranscribing:'எழுத்தாக மாற்றுகிறது...',stUnderstanding:'விபரங்களைப் பிரிக்கிறது...',stConfirm:'உறுதிப்படுத்த காத்திருக்கிறது',stSaved:'வெற்றிகரமாகச் சேமிக்கப்பட்டது',stClarify:'விளக்கம் தேவை',stDraft:'ஆஃப்லைன் வரைவு',
  micHintIdleLive:'மைக்ரோஃபோனைத் தட்டிப் பேசவும். பேசி முடித்ததும் "நிறுத்து" என்பதைத் தட்டவும்.',
  convTitle:'உரையாடல்',noConv:'உங்கள் குரல் உரையாடல் இங்கு தோன்றும்.',previewTitle:'வருகைப் பதிவு முன்னோட்டம்',
  exPatient:'பழைய நோயாளி',newPatient:'புதிய நோயாளி',benId:'பயனாளி எண் (ID)',patientName:'நோயாளி பெயர்',age:'வயது',ward:'வார்டு',visitType:'வருகை வகை',weight:'எடை',vaccDue:'தடுப்பூசி நிலுவை',nextVisit:'அடுத்த வருகை',
  updateFields:'விபரங்களைத் திருத்து',hideUpdate:'திருத்தும் பகுதியை மறை',spellName:'பெயரை எழுத்துக் கூட்டிச் சொல்',readBack:'மீண்டும் படி',retry:'மீண்டும் தொடங்கு',confirmSave:'உறுதி செய்து சேமி',regSave:'புதிய நோயாளியைப் பதிவு செய்து சேமி',recAnother:'மற்றொரு வருகையைப் பதிவு செய்',
  dangerReported:'ஆபத்தான அறிகுறி கண்டறியப்பட்டது',referPhc:'உடனடியாக ஆரம்ப சுகாதார நிலையத்திற்கு (PHC) பரிந்துரைக்கவும்.',searchBen:'எண் அல்லது பெயர் மூலம் தேடவும்',historyBtn:'முழு வரலாறு',
  regTitle:'டிஜிட்டல் களப் பதிவேடு',exportCsv:'CSV ஆக ஏற்றுமதி செய்',searchReg:'வருகை அல்லது பயனாளி எண் தேடவும்',colVisit:'வருகை',colId:'எண்',colDate:'தேதி',colWeight:'எடை',colVacc:'தடுப்பூசி',colNext:'அடுத்த வருகை',colStatus:'நிலை',colDetails:'விபரம்',
  fuTitle:'பின்தொடர்தல் டிராக்கர்',tabToday:'இன்று',tabUpcoming:'வரவிருப்பவை',tabOverdue:'காலாவதியானது',tabCompleted:'முடிந்தவை',reschedule:'தேதி மாற்று',
  alertTitle:'ஸ்மார்ட் எச்சரிக்கை மையம்',testSound:'எச்சரிக்கை ஒலி சோதனை',ruleNotice:'எச்சரிக்கைகள் நிலையான சுகாதார விதிகளிலிருந்து வருகின்றன. SwastiQ தன்னிச்சையாக சிகிச்சை பரிந்துரைக்காது.',seenAlert:'நான் இந்த எச்சரிக்கையைப் பார்த்தேன்',alertHist:'எச்சரிக்கை வரலாறு',refConfirmed:'பரிந்துரை உறுதி செய்யப்பட்டது',confirmRef:'மருத்துவமனைக்கு அனுப்பியதை உறுதி செய்',
  repTitle:'அறிக்கைகள்',repTotalVisits:'மொத்த வருகைகள்',repFuCompleted:'முடிந்த பின்தொடர்தல்கள்',repFuPending:'நிலுவை பின்தொடர்தல்கள்',repBenVisited:'பயனாளிகள் எண்ணிக்கை',repVaccFu:'தடுப்பூசி பின்தொடர்தல்',repRefConfirmed:'உறுதி செய்யப்பட்ட பரிந்துரைகள்',repRecReviewed:'சரிபார்க்கப்பட்டவை',repRecToReview:'சரிபார்க்க வேண்டியவை',
  setName:'பணியாளர் பெயர்',setLang:'மொழி',setNotif:'டெஸ்க்டாப் அறிவிப்புகள்',setSound:'எச்சரிக்கை ஒலி மற்றும் குரல் எச்சரிக்கை',setReadback:'சேமிப்பதற்கு முன் வாசித்துக் காட்டுதல்',setOffline:'ஆஃப்லைன் வரைவுகளைச் சேமி',setTx:'அசல் உரை வடிவத்தைப் பாதுகாக்கவும்',saveSet:'அமைப்புகளைச் சேமி',yourData:'உங்கள் தரவு',wipeAll:'அனைத்துத் தரவையும் நீக்கு',
  stopRec:'பதிவை நிறுத்து',doorBtn:'மொழி வாசல்',doorOpenedToast:'மொழித் தேர்வு வாசல் திறக்கப்பட்டது',langSwitched:'மொழி மாற்றப்பட்டது: '
 },
 Hindi:{
  home:'होम',dash:'डैशबोर्ड',voice:'आवाज सहायक',reg:'रजिस्टर',ben:'लाभार्थी',fu:'फॉलो-अप',alerts:'चेतावनी',rep:'रिपोर्ट',set:'सेटिंग्स',
  goodMorning:'शुभ प्रभात',todayVisits:'आज के दौरे',totalBen:'कुल लाभार्थी',fuDue:'लंबित फॉलो-अप',recReview:'समीक्षा हेतु रिकॉर्ड',
  recVoiceBtn:'आवाज से विजिट रिकॉर्ड करें',pulseTitle:'सामुदायिक स्वास्थ्य स्थिति',pulseSub:'लंबित फॉलो-अप और सक्रिय चेतावनियों पर आधारित।',
  todaySched:'आज का कार्यक्रम',markDone:'पूर्ण चिह्नित करें',noVisitsToday:'आज कोई विजिट निर्धारित नहीं है।',weeklyAct:'साप्ताहिक विजिट गतिविधि',recentVisits:'हाल के विजिट रिकॉर्ड',
  voiceTitle:'आवाज सहायक (ज्ञानी AI)',liveNotice:'लाइव वॉयस सक्रिय। ज्ञानी प्रिज़्मा v3.0 द्वारा भाषण पहचान एवं टिम्ब्रे द्वारा वाचन।',
  demoNotice:'विजिट बोलने का तरीका: लाभार्थी आईडी, वजन और अगली तारीख बोलें। जैसे: “लाभार्थी 102, वजन 48 किलो, अगली विजिट 5 दिसंबर”।',
  stIdle:'तैयार',stListening:'सुन रहा है (कोई समय सीमा नहीं)',stTranscribing:'परिवर्तित कर रहा है...',stUnderstanding:'विवरण समझ रहा है...',stConfirm:'पुष्टि की प्रतीक्षा',stSaved:'सफलतापूर्वक सहेजा गया',stClarify:'स्पष्टीकरण आवश्यक',stDraft:'ऑफ़लाइन ड्राफ्ट',
  micHintIdleLive:'माइक पर टैप करके बोलें। अपनी गति से बोलें, समाप्त होने पर "रोकें" दबाएं।',
  convTitle:'बातचीत',noConv:'आपकी आवाज बातचीत यहां दिखाई देगी।',previewTitle:'विजिट रिकॉर्ड पूर्वावलोकन',
  exPatient:'मौजूदा मरीज',newPatient:'नया मरीज',benId:'लाभार्थी आईडी',patientName:'मरीज का नाम',age:'उम्र',ward:'वार्ड',visitType:'विजिट प्रकार',weight:'वजन',vaccDue:'बाकी टीके',nextVisit:'अगली विजिट',
  updateFields:'विवरण अपडेट करें',hideUpdate:'विकल्प छुपाएं',spellName:'नाम की स्पेलिंग बोलें',readBack:'दोबारा सुनें',retry:'फिर से शुरू करें',confirmSave:'पुष्टि करें और सहेजें',regSave:'नया मरीज पंजीकृत करें और सहेजें',recAnother:'एक और विजिट रिकॉर्ड करें',
  dangerReported:'खतरे का लक्षण देखा गया',referPhc:'तुरंत प्राथमिक स्वास्थ्य केंद्र (PHC) रेफर करें।',searchBen:'आईडी या नाम से खोजें',historyBtn:'इतिहास देखें',
  regTitle:'डिजिटल फील्ड रजिस्टर',exportCsv:'CSV निर्यात करें',searchReg:'विजिट या लाभार्थी आईडी खोजें',colVisit:'विजिट',colId:'आईडी',colDate:'तारीख',colWeight:'वजन',colVacc:'टीका',colNext:'अगली तारीख',colStatus:'स्थिति',colDetails:'विवरण',
  fuTitle:'फॉलो-अप ट्रैकर',tabToday:'आज',tabUpcoming:'आगामी',tabOverdue:'अतिदेय',tabCompleted:'पूर्ण',reschedule:'तारीख बदलें',
  alertTitle:'स्मार्ट अलर्ट सेंटर',testSound:'अलर्ट ध्वनि परीक्षण',ruleNotice:'अलर्ट पूर्व-निर्धारित नियमों से आते हैं, AI अनुमान से नहीं।',seenAlert:'मैंने यह अलर्ट देख लिया है',alertHist:'अलर्ट इतिहास',refConfirmed:'रेफरल की पुष्टि हुई',confirmRef:'रेफरल की पुष्टि करें',
  repTitle:'रिपोर्ट',repTotalVisits:'कुल विजिट',repFuCompleted:'पूर्ण फॉलो-अप',repFuPending:'लंबित फॉलो-अप',repBenVisited:'विजिट किए गए लाभार्थी',repVaccFu:'टीकाकरण फॉलो-अप',repRefConfirmed:'पुष्ट रेफरल',repRecReviewed:'समीक्षित रिकॉर्ड',repRecToReview:'समीक्षा हेतु रिकॉर्ड',
  setName:'कार्यकर्ता का नाम',setLang:'भाषा',setNotif:'डेस्कटॉप सूचनाएं',setSound:'अलर्ट ध्वनि और बोली जाने वाली चेतावनी',setReadback:'सहेजने से पहले पढ़कर सुनाएं',setOffline:'ऑफ़लाइन ड्राफ्ट सहेजें',setTx:'मूल प्रतिलेख रखें',saveSet:'सेटिंग्स सहेजें',yourData:'आपका डेटा',wipeAll:'सारा डेटा हटाएं',
  stopRec:'रिकॉर्डिंग रोकें',doorBtn:'भाषा द्वार',doorOpenedToast:'भाषा चयन द्वार खुला',langSwitched:'भाषा बदलकर की गई: '
 },
 Telugu:{
  home:'హోమ్',dash:'డ్యాష్‌బోర్డ్',voice:'వాయిస్ అసిస్టెంట్',reg:'రిజిస్టర్',ben:'లబ్ధిదారులు',fu:'ఫాలో-అప్‌లు',alerts:'హెచ్చరికలు',rep:'నివేదికలు',set:'సెట్టింగ్‌లు',
  goodMorning:'శుభోదయం',todayVisits:'నేటి సందర్శనలు',totalBen:'మొత్తం లబ్ధిదారులు',fuDue:'చేయవలసిన ఫాలో-అప్‌లు',recReview:'సమీక్షించాల్సిన రికార్డులు',
  recVoiceBtn:'వాయిస్ ద్వారా సందర్శనను నమోదు చేయండి',pulseTitle:'కమ్యూనిటీ ఆరోగ్యం',pulseSub:'గడువు ముగిసిన ఫాలో-అప్‌లు మరియు హెచ్చరికల ఆధారంగా.',
  todaySched:'నేటి షెడ్యూల్',markDone:'పూర్తయింది',noVisitsToday:'ఈరోజు సందర్శనలు లేవు.',weeklyAct:'వారపు కార్యాచరణ',recentVisits:'ఇటీవలి రికార్డులు',
  voiceTitle:'వాయిస్ అసిస్టెంట్',liveNotice:'లైవ్ వాయిస్ సిద్ధంగా ఉంది (జ్ఞాని ప్రిస్మా v3.0).',
  demoNotice:'ఉదాహరణ: “లబ్ధిదారుడు 102, బరువు 48 కిలోలు, తదుపరి సందర్శన డిసెంబర్ 5”.',
  stIdle:'సిద్ధంగా ఉంది',stListening:'వింటోంది (సమయ పరిమితి లేదు)',stTranscribing:'ట్రాన్స్క్రైబ్ చేస్తోంది...',stUnderstanding:'విశ్లేషిస్తోంది...',stConfirm:'ధృవీకరణ కోసం నిరీక్షణ',stSaved:'విజయవంతంగా సేవ్ చేయబడింది',stClarify:'స్పష్టత అవసరం',stDraft:'ఆఫ్‌లైన్ డ్రాఫ్ట్',
  micHintIdleLive:'మైక్ నొక్కండి మరియు మాట్లాడండి. పూర్తయినప్పుడు ఆపు నొక్కండి.',
  convTitle:'సంభాషణ',noConv:'మీ సంభాషణ ఇక్కడ కనిపిస్తుంది.',previewTitle:'రికార్డ్ ప్రివ్యూ',
  exPatient:'పాత రోగి',newPatient:'కొత్త రోగి',benId:'లబ్ధిదారు ఐడి',patientName:'రోగి పేరు',age:'వయస్సు',ward:'వార్డు',visitType:'సందర్శన రకం',weight:'బరువు',vaccDue:'టీకాలు',nextVisit:'తదుపరి సందర్శన',
  updateFields:'వివరాలు మార్చు',hideUpdate:'దాచు',spellName:'పేరు స్పెల్లింగ్ చెప్పండి',readBack:'చదివి వినిపించు',retry:'మళ్లీ ప్రయత్నించు',confirmSave:'నిర్ధారించి సేవ్ చేయి',regSave:'కొత్త రోగిని నమోదు చేసి సేవ్ చేయి',recAnother:'మరొక సందర్శన నమోదు చేయండి',
  dangerReported:'ప్రమాదకర సంకేతం నమోదైంది',referPhc:'వెంటనే PHC కి రెఫర్ చేయండి.',searchBen:'ఐడి లేదా పేరుతో వెతకండి',historyBtn:'చరిత్ర',
  regTitle:'డిజిటల్ రిజిస్టర్',exportCsv:'CSV ఎగుమతి',searchReg:'వెతకండి',colVisit:'విజిట్',colId:'ఐడి',colDate:'తేదీ',colWeight:'బరువు',colVacc:'టీకా',colNext:'తదుపరి తేదీ',colStatus:'స్థితి',colDetails:'వివరాలు',
  fuTitle:'ఫాలో-అప్ ట్రాకర్',tabToday:'నేడు',tabUpcoming:'రాబోయేవి',tabOverdue:'గడువు ముగిసినవి',tabCompleted:'పూర్తయినవి',reschedule:'తేదీ మార్చు',
  alertTitle:'హెచ్చరిక కేంద్రం',testSound:'సౌండ్ టెస్ట్',ruleNotice:'హెచ్చరికలు స్థిర నియమాల ద్వారా వస్తాయి.',seenAlert:'నేను చూశాను',alertHist:'హెచ్చరిక చరిత్ర',refConfirmed:'రెఫరల్ నిర్ధారించబడింది',confirmRef:'రెఫరల్ నిర్ధారించండి',
  repTitle:'నివేదికలు',repTotalVisits:'మొత్తం సందర్శనలు',repFuCompleted:'పూర్తయినవి',repFuPending:'పెండింగ్',repBenVisited:'సందర్శించిన లబ్ధిదారులు',repVaccFu:'టీకా ఫాలో-అప్',repRefConfirmed:'రెఫరల్స్',repRecReviewed:'సమీక్షించినవి',repRecToReview:'సమీక్షించాల్సినవి',
  setName:'కార్యకర్త పేరు',setLang:'భాష',setNotif:'డెస్క్‌టాప్ నోటిఫికేషన్‌లు',setSound:'హెచ్చరిక ధ్వని',setReadback:'చదివి వినిపించడం',setOffline:'ఆఫ్‌లైన్ డ్రాఫ్ట్',setTx:'ట్రాన్స్‌క్రిప్ట్ ఉంచు',saveSet:'సేవ్ చేయి',yourData:'మీ డేటా',wipeAll:'మొత్తం డేటా తొలగించు',
  stopRec:'ఆపు చేయండి',doorBtn:'భాషా ద్వారం',doorOpenedToast:'భాషా ద్వారం తెరవబడింది',langSwitched:'భాష మార్చబడింది: '
 },
 Kannada:{
  home:'ಮುಖಪುಟ',dash:'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',voice:'ಧ್ವನಿ ಸಹಾಯಕ',reg:'ನೋಂದಣಿ',ben:'ಫಲಾನುಭವಿಗಳು',fu:'ಫಾಲೋ-ಅಪ್',alerts:'ಎಚ್ಚರಿಕೆಗಳು',rep:'ವರದಿಗಳು',set:'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  goodMorning:'ಶುಭೋದಯ',todayVisits:'ಇಂದಿನ ಭೇಟಿಗಳು',totalBen:'ಒಟ್ಟು ಫಲಾನುಭವಿಗಳು',fuDue:'ಬಾಕಿ ಇರುವ ಭೇಟಿಗಳು',recReview:'ಪರಿಶೀಲಿಸಬೇಕಾದ ದಾಖಲೆಗಳು',
  recVoiceBtn:'ಧ್ವನಿ ಮೂಲಕ ಭೇಟಿ ದಾಖಲಿಸಿ',pulseTitle:'ಸಮುದಾಯ ಆರೋಗ್ಯ',pulseSub:'ಬಾಕಿ ಇರುವ ಭೇಟಿಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳ ಆಧಾರದ ಮೇಲೆ.',
  todaySched:'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ',markDone:'ಮುಗಿದಿದೆ',noVisitsToday:'ಇಂದು ಯಾವುದೇ ಭೇಟಿ ನಿಗದಿಯಾಗಿಲ್ಲ.',weeklyAct:'ಸಾಪ್ತಾಹಿಕ ಭೇಟಿಗಳು',recentVisits:'ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು',
  voiceTitle:'ಧ್ವನಿ ಸಹಾಯಕ',liveNotice:'ಲೈವ್ ಧ್ವನಿ ಸಿದ್ಧವಾಗಿದೆ (ಜ್ಞಾನಿ ಪ್ರಿಸ್ಮಾ v3.0).',
  demoNotice:'ಉದಾಹರಣೆ: “ಫಲಾನುಭವಿ 102, ತೂಕ 48 ಕೆಜಿ, ಮುಂದಿನ ಭೇಟಿ ಡಿಸೆಂಬರ್ 5”.',
  stIdle:'ಸಿದ್ಧವಾಗಿದೆ',stListening:'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ (ಸಮಯ ಮಿತಿ ಇಲ್ಲ)',stTranscribing:'ಪರಿವರ್ತಿಸಲಾಗುತ್ತಿದೆ...',stUnderstanding:'ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದೆ...',stConfirm:'ದೃಢೀಕರಣಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ',stSaved:'ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ',stClarify:'ಸ್ಪಷ್ಟೀಕರಣ ಅಗತ್ಯವಿದೆ',stDraft:'ಆಫ್‌ಲೈನ್ ಡ್ರಾಫ್ಟ್',
  micHintIdleLive:'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ. ಮುಗಿದ ನಂತರ "ನಿಲ್ಲಿಸು" ಒತ್ತಿ.',
  convTitle:'ಸಂಭಾಷಣೆ',noConv:'ನಿಮ್ಮ ಸಂಭಾಷಣೆ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.',previewTitle:'ದಾಖಲೆ ಮುನ್ನೋಟ',
  exPatient:'ಹಳೆಯ ರೋಗಿ',newPatient:'ಹೊಸ ರೋಗಿ',benId:'ಫಲಾನುಭವಿ ಐಡಿ',patientName:'ರೋಗಿಯ ಹೆಸರು',age:'ವಯಸ್ಸು',ward:'ವಾರ್ಡ್',visitType:'ಭೇಟಿ ಪ್ರಕಾರ',weight:'ತೂಕ',vaccDue:'ಲಸಿಕೆಗಳು',nextVisit:'ಮುಂದಿನ ಭೇಟಿ',
  updateFields:'ವಿವರಗಳನ್ನು ಬದಲಾಯಿಸಿ',hideUpdate:'ಮರೆಮಾಡಿ',spellName:'ಹೆಸರು ಉಚ್ಚರಿಸಿ',readBack:'ಮತ್ತೆ ಓದಿ',retry:'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',confirmSave:'ದೃಢೀಕರಿಸಿ ಉಳಿಸಿ',regSave:'ಹೊಸ ರೋಗಿ ನೋಂದಾಯಿಸಿ ಉಳಿಸಿ',recAnother:'ಮತ್ತೊಂದು ಭೇಟಿ ದಾಖಲಿಸಿ',
  dangerReported:'ಅಪಾಯದ ಲಕ್ಷಣ ವರದಿಯಾಗಿದೆ',referPhc:'ಕೂಡಲೇ PHC ಗೆ ಕಳುಹಿಸಿ.',searchBen:'ಐಡಿ ಅಥವಾ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ',historyBtn:'ಇತಿಹಾಸ',
  regTitle:'ಡಿಜಿಟಲ್ ರಿಜಿಸ್ಟರ್',exportCsv:'CSV ರಫ್ತು',searchReg:'ಹುಡುಕಿ',colVisit:'ಭೇಟಿ',colId:'ಐಡಿ',colDate:'ದಿನಾಂಕ',colWeight:'ತೂಕ',colVacc:'ಲಸಿಕೆ',colNext:'ಮುಂದಿನ ದಿನಾಂಕ',colStatus:'ಸ್ಥಿತಿ',colDetails:'ವಿವರ',
  fuTitle:'ಫಾಲೋ-ಅಪ್ ಟ್ರ್ಯಾಕರ್',tabToday:'ಇಂದು',tabUpcoming:'ಮುಂಬರುವ',tabOverdue:'ಅವಧಿ ಮೀರಿದ',tabCompleted:'ಪೂರ್ಣಗೊಂಡಿದೆ',reschedule:'ದಿನಾಂಕ ಬದಲಾಯಿಸಿ',
  alertTitle:'ಎಚ್ಚರಿಕೆ ಕೇಂದ್ರ',testSound:'ಧ್ವನಿ ಪರೀಕ್ಷೆ',ruleNotice:'ಎಚ್ಚರಿಕೆಗಳು ನಿಶ್ಚಿತ ನಿಯಮಗಳಿಂದ ಬರುತ್ತವೆ.',seenAlert:'ನಾನು ನೋಡಿದ್ದೇನೆ',alertHist:'ಎಚ್ಚರಿಕೆ ಇತಿಹಾಸ',refConfirmed:'ಉಲ್ಲೇಖ ದೃಢೀಕರಿಸಲಾಗಿದೆ',confirmRef:'ಉಲ್ಲೇಖ ದೃಢೀಕರಿಸಿ',
  repTitle:'ವರದಿಗಳು',repTotalVisits:'ಒಟ್ಟು ಭೇಟಿಗಳು',repFuCompleted:'ಪೂರ್ಣಗೊಂಡವು',repFuPending:'ಬಾಕಿ',repBenVisited:'ಭೇಟಿ ನೀಡಿದ ಫಲಾನುಭವಿಗಳು',repVaccFu:'ಲಸಿಕೆ ಫಾಲೋ-ಅಪ್',repRefConfirmed:'ಉಲ್ಲೇಖಗಳು',repRecReviewed:'ಪರಿಶೀಲಿಸಲಾಗಿದೆ',repRecToReview:'ಪರಿಶೀಲಿಸಬೇಕಾದವು',
  setName:'ಕಾರ್ಯಕರ್ತೆಯ ಹೆಸರು',setLang:'ಭಾಷೆ',setNotif:'ಡೆಸ್ಕ್‌ಟಾಪ್ ಅಧಿಸೂಚನೆ',setSound:'ಎಚ್ಚರಿಕೆ ಧ್ವನಿ',setReadback:'ಓದಿ ಹೇಳುವುದು',setOffline:'ಆಫ್‌ಲೈನ್ ಉಳಿಸಿ',setTx:'ಉಲ್ಲೇಖ ಉಳಿಸಿ',saveSet:'ಉಳಿಸಿ',yourData:'ನಿಮ್ಮ ಡೇಟಾ',wipeAll:'ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ',
  stopRec:'ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ',doorBtn:'ಭಾಷಾ ಬಾಗಿಲು',doorOpenedToast:'ಭಾಷಾ ಬಾಗಿಲು ತೆರೆಯಲಾಗಿದೆ',langSwitched:'ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ: '
 },
 Malayalam:{
  home:'ഹോം',dash:'ഡാഷ്‌ബോർഡ്',voice:'ശബ്ദ സഹായി',reg:'രജിസ്റ്റർ',ben:'ഗുണഭോക്താക്കൾ',fu:'ഫോളോ-അപ്പ്',alerts:'മുന്നറിയിപ്പുകൾ',rep:'റിപ്പോർട്ടുകൾ',set:'ക്രമീകരണങ്ങൾ',
  goodMorning:'സുപ്രഭാതം',todayVisits:'ഇന്നത്തെ സന്ദർശനങ്ങൾ',totalBen:'ആകെ ഗുണഭോക്താക്കൾ',fuDue:'നടത്തേണ്ട ഫോളോ-അപ്പുകൾ',recReview:'പരിശോധിക്കേണ്ട രേഖകൾ',
  recVoiceBtn:'ശബ്ദം വഴി സന്ദർശനം രേഖപ്പെടുത്തുക',pulseTitle:'കമ്മ്യൂണിറ്റി പൾസ്',pulseSub:'ബാക്കിയുള്ള ഫോളോ-അപ്പുകളുടെ അടിസ്ഥാനത്തിൽ.',
  todaySched:'ഇന്നത്തെ ഷെഡ്യൂൾ',markDone:'പൂർത്തിയായി',noVisitsToday:'ഇന്ന് സന്ദർശനങ്ങൾ ഷെഡ്യൂൾ ചെയ്തിട്ടില്ല.',weeklyAct:'പ്രതിവാര സന്ദർശനം',recentVisits:'സമീപകാല സന്ദർശനങ്ങൾ',
  voiceTitle:'ശബ്ദ സഹായി (ജ്ഞാനി AI)',liveNotice:'തത്സമയ ശബ്ദ സേവനം സജ്ജമാണ്.',
  demoNotice:'ഉദാഹരണത്തിന്: “ഗുണഭോക്താവ് 102, ഭാരം 48 കിലോഗ്രാം, അടുത്ത സന്ദർശനം ഡിസംബർ 5”.',
  stIdle:'തയ്യാറാണ്',stListening:'കേൾക്കുന്നു (സമയപരിധിയില്ല)',stTranscribing:'എഴുതുന്നു...',stUnderstanding:'മനസ്സിലാക്കുന്നു...',stConfirm:'സ്ഥിരീകരണത്തിനായി കാത്തിരിക്കുന്നു',stSaved:'വിജയകരമായി സംരക്ഷിച്ചു',stClarify:'വ്യക്തത ആവശ്യമുണ്ട്',stDraft:'ഓഫ്‌ലൈൻ ഡ്രാഫ്റ്റ്',
  micHintIdleLive:'മൈക്ക് ടാപ്പ് ചെയ്തു സംസാരിക്കുക. പൂർത്തിയാകുമ്പോൾ നിർത്തുക ടാപ്പ് ചെയ്യുക.',
  convTitle:'സംഭാഷണം',noConv:'നിങ്ങളുടെ സംഭാഷണം ഇവിടെ കാണാം.',previewTitle:'റെക്കോർഡ് പ്രിവ്യൂ',
  exPatient:'നിലവിലുള്ള രോഗി',newPatient:'പുതിയ രോഗി',benId:'ഗുണഭോക്തൃ ഐഡി',patientName:'രോഗിയുടെ പേര്',age:'പ്രായം',ward:'വാർഡ്',visitType:'സന്ദർശന തരം',weight:'ഭാരം',vaccDue:'വാക്സിനുകൾ',nextVisit:'അടുത്ത സന്ദർശനം',
  updateFields:'വിവരങ്ങൾ മാറ്റുക',hideUpdate:'മറയ്ക്കുക',spellName:'പേര് അക്ഷരം കൂട്ടി പറയുക',readBack:'വായിച്ചു കേൾക്കുക',retry:'വീണ്ടും ശ്രമിക്കുക',confirmSave:'സ്ഥിരീകരിച്ചു സംരക്ഷിക്കുക',regSave:'രോഗിയെ രജിസ്റ്റർ ചെയ്തു സേവ് ചെയ്യുക',recAnother:'മറ്റൊരു സന്ദർശനം രേഖപ്പെടുത്തുക',
  dangerReported:'അപകടകരമായ ലക്ഷണം റിപ്പോർട്ട് ചെയ്തു',referPhc:'ഉടൻ തന്നെ PHC യിലേക്ക് റഫർ ചെയ്യുക.',searchBen:'ഐഡി അല്ലെങ്കിൽ പേര് തിരയുക',historyBtn:'ചരിത്രം',
  regTitle:'ഡിജിറ്റൽ ഫീൽഡ് രജിസ്റ്റർ',exportCsv:'CSV ഡൗൺലോഡ്',searchReg:'തിരയുക',colVisit:'സന്ദർശനം',colId:'ഐഡി',colDate:'തീയതി',colWeight:'ഭാരം',colVacc:'വാക്സിൻ',colNext:'അടുത്ത തീയതി',colStatus:'നില',colDetails:'വിവരങ്ങൾ',
  fuTitle:'ഫോളോ-അപ്പ് ട്രാക്കർ',tabToday:'ഇന്ന്',tabUpcoming:'വരാനിരിക്കുന്നവ',tabOverdue:'കാലഹരണപ്പെട്ടവ',tabCompleted:'പൂർത്തിയായവ',reschedule:'തീയതി മാറ്റുക',
  alertTitle:'സ്മാർട്ട് അലർട്ട് സെന്റർ',testSound:'ശബ്ദം പരിശോധിക്കുക',ruleNotice:'മുന്നറിയിപ്പുകൾ കൃത്യമായ നിയമങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.',seenAlert:'ഞാൻ കണ്ടു',alertHist:'ചരിത്രം',refConfirmed:'റഫറൽ സ്ഥിരീകരിച്ചു',confirmRef:'റഫറൽ സ്ഥിരീകരിക്കുക',
  repTitle:'റിപ്പോർട്ടുകൾ',repTotalVisits:'ആകെ സന്ദർശനങ്ങൾ',repFuCompleted:'പൂർത്തിയായവ',repFuPending:'ബാക്കിയുള്ളവ',repBenVisited:'സന്ദർശിച്ച ഗുണഭോക്താക്കൾ',repVaccFu:'വാക്സിൻ ഫോളോ-അപ്പ്',repRefConfirmed:'റഫറലുകൾ',repRecReviewed:'പരിശോധിച്ചവ',repRecToReview:'പരിശോധിക്കേണ്ടവ',
  setName:'ആശ വർക്കറുടെ പേര്',setLang:'ഭാഷ',setNotif:'ഡെസ്ക്ടോപ്പ് അറിയിപ്പുകൾ',setSound:'മുന്നറിയിപ്പ് ശബ്ദം',setReadback:'വായിച്ചു കേൾക്കൽ',setOffline:'ഓഫ്‌ലൈൻ സേവ്',setTx:'ട്രാൻസ്ക്രിപ്റ്റ് സൂക്ഷിക്കുക',saveSet:'സേവ് ചെയ്യുക',yourData:'നിങ്ങളുടെ വിവരങ്ങൾ',wipeAll:'എല്ലാം മായ്ക്കുക',
  stopRec:'റെക്കോർഡിംഗ് നിർത്തുക',doorBtn:'ഭാഷാ വാതിൽ',doorOpenedToast:'ഭാഷാ തിരഞ്ഞെടുക്കൽ വാതിൽ തുറന്നു',langSwitched:'ഭാഷ മാറ്റി: '
 },
 Bengali:{
  home:'হোম',dash:'ড্যাশবোর্ড',voice:'ভয়েস সহকারী',reg:'রেজিস্টার',ben:'সুবিধাভোগী',fu:'ফলো-আপ',alerts:'সতর্কতা',rep:'রিপোর্ট',set:'সেটিংস',
  goodMorning:'সুপ্রভাত',todayVisits:'আজকের ভিজিট',totalBen:'মোট সুবিধাভোগী',fuDue:'বাকি ফলো-আপ',recReview:'পর্যালোচনাযোগ্য রেকর্ড',
  recVoiceBtn:'ভয়েসের মাধ্যমে ভিজিট রেকর্ড করুন',pulseTitle:'কমিউনিটি পালস',pulseSub:'বকেয়া ফলো-আপ এবং সতর্কতার উপর ভিত্তি করে।',
  todaySched:'আজকের সময়সূচী',markDone:'সম্পন্ন',noVisitsToday:'আজ কোনো ভিজিট নেই।',weeklyAct:'সাপ্তাহিক ভিজিট',recentVisits:'সাম্প্রতিক রেকর্ড',
  voiceTitle:'ভয়েস সহকারী (জ্ঞানী AI)',liveNotice:'লাইভ ভয়েস সক্রিয় (জ্ঞানী প্রিজমা v3.0)।',
  demoNotice:'উদাহরণ: “সুবিধাভোগী 102, ওজন 48 কেজি, পরবর্তী ভিজিট 5 ডিসেম্বর”।',
  stIdle:'প্রস্তুত',stListening:'শুনছে (কোনো সময়সীমা নেই)',stTranscribing:'রূপান্তর হচ্ছে...',stUnderstanding:'বোঝার চেষ্টা করছে...',stConfirm:'নিশ্চিতকরণের অপেক্ষা',stSaved:'সফলভাবে সংরক্ষিত',stClarify:'স্পষ্টকরণ প্রয়োজন',stDraft:'অফলাইন খসড়া',
  micHintIdleLive:'মাইকে ট্যাপ করে কথা বলুন। শেষ হলে "বন্ধ করুন" চাপুন।',
  convTitle:'কথোপকথন',noConv:'কথোপকথন এখানে দেখা যাবে।',previewTitle:'রেকর্ড প্রিভিউ',
  exPatient:'বিদ্যমান রোগী',newPatient:'নতুন রোগী',benId:'সুবিধাভোগী আইডি',patientName:'রোগীর নাম',age:'বয়স',ward:'ওয়ার্ড',visitType:'ভিজিটের ধরন',weight:'ওজন',vaccDue:'বাকি টিকা',nextVisit:'পরবর্তী ভিজিট',
  updateFields:'তথ্য পরিবর্তন করুন',hideUpdate:'লুকান',spellName:'নামের বানান বলুন',readBack:'পড়ে শোনান',retry:'আবার চেষ্টা করুন',confirmSave:'নিশ্চিত করুন ও সংরক্ষণ করুন',regSave:'নতুন রোগী নিবন্ধন ও সংরক্ষণ',recAnother:'আরেকটি ভিজিট রেকর্ড করুন',
  dangerReported:'বিপদ চিহ্ন সনাক্ত হয়েছে',referPhc:'অবিলম্বে PHC তে পাঠান।',searchBen:'আইডি বা নাম দিয়ে খুঁজুন',historyBtn:'ইতিহাস',
  regTitle:'ডিজিটাল রেজিস্টার',exportCsv:'CSV এক্সপোর্ট',searchReg:'অনুসন্ধান করুন',colVisit:'ভিজিট',colId:'আইডি',colDate:'তারিখ',colWeight:'ওজন',colVacc:'টিকা',colNext:'পরবর্তী তারিখ',colStatus:'অবস্থা',colDetails:'বিস্তারিত',
  fuTitle:'ফলো-আপ ট্র্যাকার',tabToday:'আজ',tabUpcoming:'আসন্ন',tabOverdue:'মেয়াদোত্তীর্ণ',tabCompleted:'সম্পন্ন',reschedule:'তারিখ পরিবর্তন',
  alertTitle:'স্মার্ট অ্যালার্ট সেন্টার',testSound:'শব্দ পরীক্ষা',ruleNotice:'সতর্কতা নির্দিষ্ট স্বাস্থ্যবিধি থেকে আসে।',seenAlert:'আমি দেখেছি',alertHist:'ইতিহাস',refConfirmed:'রেফারাল নিশ্চিত',confirmRef:'রেফারাল নিশ্চিত করুন',
  repTitle:'রিপোর্ট',repTotalVisits:'মোট ভিজিট',repFuCompleted:'সম্পন্ন',repFuPending:'বাকি',repBenVisited:'পরিদর্শিত সুবিধাভোগী',repVaccFu:'টিকাদান ফলো-আপ',repRefConfirmed:'রেফারাল',repRecReviewed:'পর্যালোচিত',repRecToReview:'পর্যালোচনাযোগ্য',
  setName:'কর্মীর নাম',setLang:'ভাষা',setNotif:'বিজ্ঞপ্তি',setSound:'সতর্কবার্তা শব্দ',setReadback:'পড়ে শোনানো',setOffline:'অফলাইন সংরক্ষণ',setTx:'প্রতিলিপি সংরক্ষণ',saveSet:'সংরক্ষণ করুন',yourData:'আপনার ডেটা',wipeAll:'সব মুছুন',
  stopRec:'রেকর্ডিং বন্ধ করুন',doorBtn:'ভাষা দরজা',doorOpenedToast:'ভাষা নির্বাচনের দরজা খোলা হয়েছে',langSwitched:'ভাষা পরিবর্তিত হয়েছে: '
 },
 Marathi:{
  home:'मुख्यपृष्ठ',dash:'डॅशबोर्ड',voice:'व्हॉइस सहाय्यक',reg:'नोंदवही',ben:'लाभार्थी',fu:'फॉलो-अप',alerts:'सूचना',rep:'अहवाल',set:'सेटिंग्ज',
  goodMorning:'शुभ सकाळ',todayVisits:'आजच्या भेटी',totalBen:'एकूण लाभार्थी',fuDue:'बाकी फॉलो-अप',recReview:'तपासायचे रेकॉर्ड',
  recVoiceBtn:'आवाजाद्वारे भेट नोंदवा',pulseTitle:'आरोग्य स्थिती',pulseSub:'बाकी फॉलो-अप आणि सक्रिय सूचनांवर आधारित.',
  todaySched:'आजचे वेळापत्रक',markDone:'पूर्ण झाले',noVisitsToday:'आज कोणतीही भेट नियोजित नाही.',weeklyAct:'साप्ताहिक हालचाली',recentVisits:'अलीकडील नोंदी',
  voiceTitle:'व्हॉइस सहाय्यक (ज्ञानी AI)',liveNotice:'लाईव्ह व्हॉइस सेवा सक्रिय आहे.',
  demoNotice:'उदाहरण: “लाभार्थी 102, वजन 48 किलो, पुढील भेट 5 डिसेंबर”.',
  stIdle:'तयार आहे',stListening:'ऐकत आहे (वेळेची मर्यादा नाही)',stTranscribing:'रूपांतरित करत आहे...',stUnderstanding:'समजून घेत आहे...',stConfirm:'पुष्टीची प्रतीक्षा',stSaved:'यशस्वीरीत्या जतन केले',stClarify:'स्पष्टीकरण आवश्यक',stDraft:'ऑफलाइन मसुदा',
  micHintIdleLive:'माईक टॅप करून बोला. पूर्ण झाल्यावर "थांबवा" टॅप करा.',
  convTitle:'संभाषण',noConv:'संभाषण येथे दिसेल.',previewTitle:'रेकॉर्ड पूर्वावलोकन',
  exPatient:'जुना रुग्ण',newPatient:'नवीन रुग्ण',benId:'लाभार्थी आयडी',patientName:'रुग्णाचे नाव',age:'वय',ward:'वॉर्ड',visitType:'भेटीचा प्रकार',weight:'वजन',vaccDue:'लसीकरण',nextVisit:'पुढील भेट',
  updateFields:'माहिती बदला',hideUpdate:'लपवा',spellName:'नावाचे स्पेलिंग सांगा',readBack:'पुन्हा ऐका',retry:'पुन्हा प्रयत्न करा',confirmSave:'पुष्टी करा आणि जतन करा',regSave:'नवीन रुग्ण नोंदवा आणि जतन करा',recAnother:'दुसरी भेट नोंदवा',
  dangerReported:'धोकादायक लक्षण आढळले',referPhc:'तातडीने PHC मध्ये पाठवा.',searchBen:'आयडी किंवा नावाने शोधा',historyBtn:'इतिहास',
  regTitle:'डिजिटल नोंदवही',exportCsv:'CSV निर्यात',searchReg:'शोधा',colVisit:'भेट',colId:'आयडी',colDate:'तारीख',colWeight:'वजन',colVacc:'लस',colNext:'पुढील तारीख',colStatus:'स्थिती',colDetails:'तपशील',
  fuTitle:'फॉलो-अप ट्रॅकर',tabToday:'आज',tabUpcoming:'आगामी',tabOverdue:'थकबाकी',tabCompleted:'पूर्ण',reschedule:'तारीख बदला',
  alertTitle:'अलर्ट केंद्र',testSound:'आवाज तपासा',ruleNotice:'सूचना पूर्व-निश्चित नियमांवर आधारित आहेत.',seenAlert:'मी पाहिले आहे',alertHist:'इतिहास',refConfirmed:'रेफरल पुष्टी झाली',confirmRef:'रेफरल पुष्टी करा',
  repTitle:'अहवाल',repTotalVisits:'एकूण भेटी',repFuCompleted:'पूर्ण',repFuPending:'प्रलंबित',repBenVisited:'भेट दिलेले लाभार्थी',repVaccFu:'लसीकरण फॉलो-अप',repRefConfirmed:'रेफरल',repRecReviewed:'तपासलेले',repRecToReview:'तपासायचे',
  setName:'सेविकेचे नाव',setLang:'भाषा',setNotif:'सूचना',setSound:'अलर्ट आवाज',setReadback:'वाचून दाखवणे',setOffline:'ऑफलाइन जतन',setTx:'रेकॉर्ड ठेवा',saveSet:'जतन करा',yourData:'तुमचा डेटा',wipeAll:'सर्व हटवा',
  stopRec:'रेकॉर्डिंग थांबवा',doorBtn:'भाषा दरवाजा',doorOpenedToast:'भाषा निवडीचा दरवाजा उघडला',langSwitched:'भाषा बदलली: '
 },
 Gujarati:{
  home:'હોમ',dash:'ડેશબોર્ડ',voice:'વોઇસ સહાયક',reg:'રજિસ્ટર',ben:'લાભાર્થીઓ',fu:'ફોલો-અપ',alerts:'ચેતવણીઓ',rep:'અહેવાલો',set:'સેટિંગ્સ',
  goodMorning:'સુપ્રભાત',todayVisits:'આજની મુલાકાતો',totalBen:'કુલ લાભાર્થીઓ',fuDue:'બાકી ફોલો-અપ',recReview:'ચકાસવા યોગ્ય રેકોર્ડ',
  recVoiceBtn:'અવાજ દ્વારા મુલાકાત નોંધો',pulseTitle:'આરોગ્ય સ્થિતિ',pulseSub:'બાકી ફોલો-અપ અને ચેતવણીઓ પર આધારિત.',
  todaySched:'આજનું શેડ્યૂલ',markDone:'પૂર્ણ થયું',noVisitsToday:'આજે કોઈ મુલાકાત નથી.',weeklyAct:'સાપ્તાહિક પ્રવૃત્તિ',recentVisits:'તાજેતરના રેકોર્ડ',
  voiceTitle:'વોઇસ સહાયક (જ્ઞાની AI)',liveNotice:'લાઇવ વૉઇસ સેવા સક્રિય છે.',
  demoNotice:'ઉદાહરણ: “લાભાર્થી 102, વજન 48 કિલો, આગલી મુલાકાત 5 ડિસેમ્બર”.',
  stIdle:'તૈયાર છે',stListening:'સાંભળી રહ્યું છે (સમય મર્યાદા નથી)',stTranscribing:'રૂપાંતરિત કરી રહ્યું છે...',stUnderstanding:'સમજી રહ્યું છે...',stConfirm:'ખાતરીની રાહ જુએ છે',stSaved:'સફળતાપૂર્વક સાચવવામાં આવ્યું',stClarify:'સ્પષ્ટતા જરૂરી',stDraft:'ઑફલાઇન ડ્રાફ્ટ',
  micHintIdleLive:'માઇક ટેપ કરો અને બોલો. પૂર્ણ થયા પછી "બંધ કરો" ટેપ કરો.',
  convTitle:'વાતચીત',noConv:'વાતચીત અહીં દેખાશે.',previewTitle:'રેકોર્ડ પૂર્વાવલોકન',
  exPatient:'હાલના દર્દી',newPatient:'નવા દર્દી',benId:'લાભાર્થી આઈડી',patientName:'દર્દીનું નામ',age:'ઉંમર',ward:'વોર્ડ',visitType:'મુલાકાત પ્રકાર',weight:'વજન',vaccDue:'રસીકરણ',nextVisit:'આગલી મુલાકાત',
  updateFields:'વિગતો સુધારો',hideUpdate:'છુપાવો',spellName:'નામના સ્પેલિંગ બોલો',readBack:'ફરીથી સાંભળો',retry:'ફરી પ્રયાસ કરો',confirmSave:'ખાતરી કરો અને સાચવો',regSave:'નવા દર્દીની નોંધણી અને સાચવો',recAnother:'બીજી મુલાકાત નોંધો',
  dangerReported:'જોખમી ચિહ્ન નોંધાયું',referPhc:'તરત જ PHC ખાતે મોકલો.',searchBen:'આઈડી અથવા નામ દ્વારા શોધો',historyBtn:'ઇતિહાસ',
  regTitle:'ડિજિટલ રજિસ્ટર',exportCsv:'CSV એક્સપોર્ટ',searchReg:'શોધો',colVisit:'મુલાકાત',colId:'આઈડી',colDate:'તારીખ',colWeight:'વજન',colVacc:'રસી',colNext:'આગલી તારીખ',colStatus:'સ્થિતિ',colDetails:'વિગતો',
  fuTitle:'ફોલો-અપ ટ્રેકર',tabToday:'આજે',tabUpcoming:'આગામી',tabOverdue:'બાકી મુદત',tabCompleted:'પૂર્ણ',reschedule:'તારીખ બદલો',
  alertTitle:'ચેતવણી કેન્દ્ર',testSound:'અવાજ ચકાસો',ruleNotice:'ચેતવણીઓ પૂર્વનિર્ધારિત નિયમોથી આવે છે.',seenAlert:'મેં જોયું છે',alertHist:'ઇતિહાસ',refConfirmed:'રેફરલ ખાતરી થઈ',confirmRef:'રેફરલ ખાતરી કરો',
  repTitle:'અહેવાલો',repTotalVisits:'કુલ મુલાકાતો',repFuCompleted:'પૂર્ણ',repFuPending:'બાકી',repBenVisited:'મુલાકાત લીધેલ લાભાર્થી',repVaccFu:'રસી ફોલો-અપ',repRefConfirmed:'રેફરલ્સ',repRecReviewed:'ચકાસાયેલ',repRecToReview:'ચકાસવા યોગ્ય',
  setName:'કાર્યકર્તાનું નામ',setLang:'ભાષા',setNotif:'સૂચનાઓ',setSound:'ચેતવણી અવાજ',setReadback:'વાંચીને સંભળાવવું',setOffline:'ઑફલાઇન સાચવો',setTx:'રેકોર્ડ રાખો',saveSet:'સાચવો',yourData:'તમારો ડેટા',wipeAll:'બધું કાઢી નાખો',
  stopRec:'રેકોર્ડિંગ બંધ કરો',doorBtn:'ભાષા દ્વાર',doorOpenedToast:'ભાષા પસંદગી દ્વાર ખોલવામાં આવ્યું',langSwitched:'ભાષા બદલાઈ: '
 }
};

const curLang=()=>S?.settings?.lang&&I18N[S.settings.lang]?S.settings.lang:'English';
const t=(k,def='')=>{const l=curLang();return(I18N[l]&&I18N[l][k])||(I18N.English&&I18N.English[k])||def||k};

/* ==================== MULTILINGUAL NUMBER & SCRIPT NORMALIZER ==================== */
const INDIC_DIGIT_MAP={
 '०':0,'१':1,'२':2,'३':3,'४':4,'५':5,'६':6,'७':7,'८':8,'९':9,
 '০':0,'১':1,'২':2,'৩':3,'৪':4,'৫':5,'৬':6,'৭':7,'৮':8,'৯':9,
 '૦':0,'૧':1,'૨':2,'૩':3,'૪':4,'૫':5,'૬':6,'૭':7,'૮':8,'૯':9,
 '௦':0,'௧':1,'௨':2,'௩':3,'௪':4,'௫':5,'௬':6,'௭':7,'௮':8,'௯':9,
 '౦':0,'౧':1,'౨':2,'౩':3,'౪':4,'౫':5,'౬':6,'౭':7,'౮':8,'౯':9,
 '೦':0,'೧':1,'೨':2,'೩':3,'೪':4,'೫':5,'೬':6,'೭':7,'೮':8,'೯':9,
 '൦':0,'൧':1,'൨':2,'൩':3,'൪':4,'൫':5,'൬':6,'൭':7,'൮':8,'൯':9
};
const NUMBER_WORDS=[
 ['நூற்று ஒன்று','101'],['நூற்று இரண்டு','102'],['நூற்று மூன்று','103'],['நூற்று நான்கு','104'],['நூற்று ஐந்து','105'],['நூற்று ஆறு','106'],
 ['நாற்பத்து எட்டு','48'],['நாற்பத்து ஏழு','47'],['நாற்பத்து ஆறு','46'],['ஐம்பத்து இரண்டு','52'],['ஐம்பத்து மூன்று','53'],['ஐம்பத்து ஏழு','57'],['ஐம்பத்து எட்டு','58'],
 ['அறுபத்து ஒன்று','61'],['அறுபது','60'],['முப்பத்து நான்கு','34'],['முப்பத்து ஒன்று','31'],['இருபத்தொன்பது','29'],['இருபத்தெட்டு','28'],['இருபத்தாறு','26'],['பதினான்கு','14'],
 ['ஒன்பது புள்ளி எட்டு','9.8'],['ஆறு புள்ளி ஒன்று','6.1'],['ஐந்து புள்ளி எட்டு','5.8'],['ஐந்து புள்ளி இரண்டு','5.2'],
 ['பத்து','10'],['ஒன்பது','9'],['எட்டு','8'],['ஏழு','7'],['ஆறு','6'],['ஐந்து','5'],['நான்கு','4'],['மூன்று','3'],['இரண்டு','2'],['ஒன்று','1'],
 ['ஒரு நூற்று இரண்டு','102'],['நூறு','100'],
 ['एक सौ एक','101'],['एक सौ दो','102'],['एक सौ तीन','103'],['एक सौ चार','104'],['एक सौ पांच','105'],['एक सौ छह','106'],
 ['अड़तालीस','48'],['सैंतालीस','47'],['छियालीस','46'],['बावन','52'],['तिरेपन','53'],['सत्तावन','57'],['अट्ठावन','58'],['साठ','60'],['इकसठ','61'],['चौंतीस','34'],['इकतीस','31'],['उनतीस','29'],['अट्ठाईस','28'],['छब्बीस','26'],['चौदह','14'],
 ['नौ दशमलव आठ','9.8'],['छह दशमलव एक','6.1'],['पाँच दशमलव आठ','5.8'],['पाँच दशमलव दो','5.2'],
 ['दस','10'],['नौ','9'],['आठ','8'],['सात','7'],['छह','6'],['पांच','5'],['पाँच','5'],['चार','4'],['तीन','3'],['दो','2'],['एक','1'],['सौ','100'],
 ['one hundred two','102'],['one zero two','102'],['one hundred three','103'],['one zero three','103'],['one hundred one','101'],['one zero one','101'],['one hundred four','104'],['one hundred five','105'],['one hundred six','106'],
 ['forty eight','48'],['forty seven','47'],['forty six','46'],['fifty two','52'],['fifty three','53'],['fifty seven','57'],['fifty eight','58'],['sixty','60'],['sixty one','61'],['thirty four','34'],['thirty one','31'],['twenty nine','29'],['twenty eight','28'],['twenty six','26'],['fourteen','14'],
 ['nine point eight','9.8'],['six point one','6.1'],['five point eight','5.8'],['five point two','5.2']
];

function normDigits(str){
 let s=String(str||'');
 s=s.replace(/[\u0966-\u096F\u09E6-\u09EF\u0AE6-\u0AEF\u0BE6-\u0BEF\u0C66-\u0C7F\u0CE6-\u0CEF\u0D66-\u0D6F]/g,c=>INDIC_DIGIT_MAP[c]!==undefined?INDIC_DIGIT_MAP[c]:c);
 for(const [w,num] of NUMBER_WORDS){
  s=s.replace(new RegExp(w,'gi'),num);
 }
 return s;
}

/* Multilingual Month names dictionary */
const MONTH_NAMES={
 january:1,feb:2,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12,
 'ஜனவரி':1,'பிப்ரவரி':2,'மார்ச்':3,'ஏப்ரல்':4,'மே':5,'ஜூன்':6,'ஜூலை':7,'ஆகஸ்ட்':8,'செப்டம்பர்':9,'அக்டோபர்':10,'நவம்பர்':11,'டிசம்பர்':12,
 'जनवरी':1,'फ़रवरी':2,'फरवरी':2,'मार्च':3,'अप्रैल':4,'मई':5,'जून':6,'जुलाई':7,'अगस्त':8,'सितम्बर':9,'सितंबर':9,'अक्टूबर':10,'नवम्बर':11,'नवंबर':11,'दिसम्बर':12,'दिसंबर':12,
 'జనవరి':1,'ఫిబ్రవరి':2,'మార్చి':3,'ఏప్రిల్':4,'మే':5,'జూన్':6,'జూలై':7,'ఆగస్టు':8,'సెప్టెంబర్':9,'అక్టోబర్':10,'నవంబర్':11,'డిసెంబర్':12,
 'ಜನವರಿ':1,'ಫೆಬ್ರವರಿ':2,'ಮಾರ್ಚ್':3,'ಏಪ್ರಿಲ್':4,'ಮೇ':5,'ಜೂನ್':6,'ಜುಲೈ':7,'ಆಗಸ್ಟ್':8,'ಸೆಪ್ಟೆಂಬರ್':9,'ಅಕ್ಟೋಬರ್':10,'ನವೆಂಬರ್':11,'ಡಿಸೆಂಬರ್':12,
 'ജനുവരി':1,'ഫെബ്രുവരി':2,'മാർച്ച്':3,'ഏപ്രിൽ':4,'മെയ്':5,'ജൂൺ':6,'ജൂലൈ':7,'ഓഗസ്റ്റ്':8,'സെപ്റ്റംബർ':9,'ഒക്ടോബർ':10,'നവംബർ':11,'ഡിസംബർ':12,
 'জানুয়ারি':1,'ফেব্রুয়ারি':2,'মার্চ':3,'এপ্রিল':4,'মে':5,'জুন':6,'জুলাই':7,'আগস্ট':8,'সেপ্টেম্বর':9,'অক্টোবর':10,'নভেম্বর':11,'ডিসেম্বর':12,
 'जानेवारी':1,'फेब्रुवारी':2,'मार्च':3,'एप्रिल':4,'मे':5,'जून':6,'जुलै':7,'ऑगस्ट':8,'सप्टेंबर':9,'ऑक्टोबर':10,'नोव्हेंबर':11,'डिसेंबर':12,
 'જાન્યુઆરી':1,'ફેબ્રુઆરી':2,'માર્ચ':3,'એપ્રિલ':4,'મે':5,'જૂન':6,'જુલાઈ':7,'ઓગસ્ટ':8,'સપ્ટેમ્બર':9,'ઓક્ટોબર':10,'નવેમ્બર':11,'ડિસેમ્બર':12
};
const MONTH_REGEX_STR=Object.keys(MONTH_NAMES).join('|');

/* Multilingual Danger Rules */
const RULES=[
 {id:'R1',re:/convuls|fits|seizure|வலிப்பு|இழுத்து|दौरे|झटके|मिर्गी|మూర్ఛ|ಸೆಳೆತ|അപസ്മാരം|খিঁচুনি|फेफरे|ખેંચ/i,sign:'Convulsions reported'},
 {id:'R2',re:/not feeding|unable to feed|stopped feeding|not able to feed|பால் குடிக்க|உணவு உட்கொள்ள|दूध नहीं पी|खाना नहीं खा|పాలు తాగ|హాಲು ಕುಡಿಯ|പാൽ കുടിക്കാൻ|খেতে পারছে না|दूध पीत नाही|દૂધ પી શકતું/i,sign:'Unable to feed reported'},
 {id:'R3',re:/unconscious|not responding|unresponsive|மயக்கம்|சுயநினைவு|பேச்சு மூச்சு|बेहोश|कोई प्रतिक्रिया नहीं|స్పృహ|ಪ್ರಜ್ಞಾಹೀನ|അബോധാവസ്ഥ|অচেতন|प्रतिसाद नाही|બેભાન/i,sign:'Unconscious / not responding reported'},
 {id:'R4',re:/heavy bleeding|bleeding heavily|ரத்தப்போக்கு|रक्तस्राव|రక్తస్రావం|ರಕ್ತಸ್ರಾವ|രക്തസ്രാവം|রক্তপাত|રક્તસ્ત્રાવ/i,sign:'Heavy bleeding reported'}
];
const dangerScan=t=>RULES.filter(r=>r.re.test(t));

/* Language Detection helper for spoken/typed text */
function detectTextLang(t){
 if(!t)return'English';
 if(/[\u0B80-\u0BFF]/.test(t)||/\b(?:panninen|irukku|aachu|vandhaen|peyar|edai|adutha)\b/i.test(t))return'Tamil';
 if(/[\u0900-\u097F]/.test(t)||/\b(?:hai|tha|thi|hua|naam|wajan|umar|agli|ka|ki|ke|aaj)\b/i.test(t))return'Hindi';
 if(/[\u0C00-\u0C7F]/.test(t))return'Telugu';
 if(/[\u0C80-\u0CFF]/.test(t))return'Kannada';
 if(/[\u0D00-\u0D7F]/.test(t))return'Malayalam';
 if(/[\u0980-\u09FF]/.test(t))return'Bengali';
 if(/[\u0A80-\u0AFF]/.test(t))return'Gujarati';
 return'English';
}

// Prefer Gnani's detected language metadata; this also handles romanised speech.
function languageFromCode(code){
 const c=String(code||'').toLowerCase().replace('_','-');
 if(!c)return null;
 if(c==='ta'||c.startsWith('ta-'))return'Tamil';
 if(c==='hi'||c.startsWith('hi-'))return'Hindi';
 if(c==='te'||c.startsWith('te-'))return'Telugu';
 if(c==='kn'||c.startsWith('kn-'))return'Kannada';
 if(c==='ml'||c.startsWith('ml-'))return'Malayalam';
 if(c==='bn'||c.startsWith('bn-'))return'Bengali';
 if(c==='mr'||c.startsWith('mr-'))return'Marathi';
 if(c==='gu'||c.startsWith('gu-'))return'Gujarati';
 if(c==='en'||c.startsWith('en-'))return'English';
 const name=LANG_DEFS.find(x=>x.id.toLowerCase()===c);
 return name?name.id:null;
}

/* ---------- State Management ---------- */
const seed=()=>({
 ben:[
  {id:'101',name:'Meena Devi',hh:'Devi household · Ward 2',age:'29 y',vacc:'Penta 3',next:'2026-11-14',st:'Reviewed',w:[52,53,53]},
  {id:'102',name:'Priya Sharma',hh:'Sharma household · Ward 4',age:'26 y',vacc:'MR booster',next:'2026-12-05',st:'Needs review',w:[46,47,47]},
  {id:'103',name:'Baby of Radhika',hh:'Nair household · Ward 1',age:'14 mo',vacc:'MR 2',next:'2026-11-09',st:'Reviewed',w:[9,9.4,9.8]},
  {id:'104',name:'Anjali Rao',hh:'Rao household · Ward 3',age:'31 y',vacc:'None due',next:'2026-11-11',st:'Reviewed',w:[58,58,57]},
  {id:'105',name:'Baby of Sunita',hh:'Das household · Ward 4',age:'3 mo',vacc:'Penta 1',next:'2026-11-18',st:'Needs review',w:[5.2,5.8,6.1]},
  {id:'106',name:'Kavitha M.',hh:'Murugan household · Ward 2',age:'34 y',vacc:'Td',next:'2026-11-08',st:'Reviewed',w:[61,60,60]}
 ],
 visits:[
  {id:'V-1001',b:'102',date:'2026-11-04',type:'Household Visit',w:47,vacc:'Next month',next:'2026-12-05',st:'Needs review',aud:['04 Nov · Created by voice']},
  {id:'V-1002',b:'101',date:'2026-11-05',type:'Household Visit',w:53,vacc:'None',next:'2026-11-14',st:'Reviewed',aud:['05 Nov · Created by voice','06 Nov · Reviewed']},
  {id:'V-1003',b:'103',date:'2026-11-06',type:'Household Visit',w:9.8,vacc:'MR 2',next:'2026-11-09',st:'Reviewed',aud:['06 Nov · Created']},
  {id:'V-1004',b:'106',date:'2026-11-07',type:'Household Visit',w:60,vacc:'Td',next:'2026-11-08',st:'Reviewed',aud:['07 Nov · Created']},
  {id:'V-1005',b:'105',date:'2026-11-09',type:'Household Visit',w:6.1,vacc:'Penta 1',next:'2026-11-18',st:'Needs review',aud:['09 Nov · Created by voice']}
 ],
 fu:[
  {id:1,b:'103',date:'2026-11-09',st:'Pending'},
  {id:2,b:'106',date:'2026-11-08',st:'Pending'},
  {id:3,b:'104',date:'2026-11-11',st:'Pending'},
  {id:4,b:'101',date:'2026-11-14',st:'Pending'},
  {id:5,b:'105',date:'2026-11-18',st:'Pending'},
  {id:6,b:'102',date:'2026-12-05',st:'Pending'}
 ],
 alerts:[
  {id:1,v:'V-1005',b:'105',rule:'R2',sign:'Unable to feed reported',ack:false,ref:false,ts:'09 Nov'}
 ],
 drafts:[],
 settings:{lang:'Tamil',name:'Lakshmi R.',notif:true,readback:true,offlineDrafts:true,save_tx:false,sound:true,vol:40,style:'soft'},
 vseq:1006
});

let S;try{S=JSON.parse(localStorage.getItem('sq2')||'null')}catch(e){}S=S||seed();
// Check URL param or stored lang
const urlLang=new URLSearchParams(location.search).get('lang');
if(urlLang&&I18N[urlLang]){S.settings.lang=urlLang;localStorage.setItem('sq_lang',urlLang)}
else{const savedL=localStorage.getItem('sq_lang');if(savedL&&I18N[savedL])S.settings.lang=savedL}

var srv=false,gn={stt:false,tts:false},liveOK=false,DID=(()=>{try{let d=localStorage.getItem('sqd');if(!d){d=crypto.randomUUID();localStorage.setItem('sqd',d)}return d}catch(e){return'anon-device'}})();
const localSave=()=>{try{localStorage.setItem('sq2',JSON.stringify(S));localStorage.setItem('sq_lang',S.settings.lang)}catch(e){}};
const save=()=>{S._ts=Date.now();S._dirty=true;localSave();checkAlerts();push()};

async function push(){paintStatus();if(!online||!S._dirty)return;const ts=S._ts;try{const r=await fetch('/api/state',{method:'PUT',headers:{'Content-Type':'application/json','X-Device-Id':DID},body:JSON.stringify({ts,json:JSON.stringify(S)})});srv=r.ok;if(r.ok&&S._ts===ts){S._dirty=false;localSave()}}catch(e){srv=false}paintStatus()}
async function initCloud(){try{const r=await fetch('/api/state',{headers:{'X-Device-Id':DID}});if(!r.ok)throw 0;const d=await r.json();srv=true;if(d.json&&!S._dirty&&d.ts>(S._ts||0)){S=JSON.parse(d.json);S._dirty=false;localSave();checkAlerts();render()}else if(!d.json||S._dirty){S._dirty=true;S._ts=S._ts||Date.now();await push()}}catch(e){srv=false}paintStatus();try{const j=await(await fetch('/api/status')).json();const ch=j.stt!==gn.stt||j.tts!==gn.tts;gn=j;if(ch&&route()=='voice'&&vs.st=='idle')render()}catch(e){}}

function paintStatus(){
 const p=$('#cs');if(!p)return;
 p.textContent=!online?('Offline · '+t('saved','Saved on device')):S._dirty?t('dirty','Waiting to sync'):srv?t('synced','Synced to server'):t('saved','Saved on device');
 p.className='pill'+(!online||S._dirty||!srv?' off':'');
 const lv=$('#lv');if(lv){lv.textContent=liveOK?'Live alerts on':'Live alerts off';lv.className='pill'+(liveOK?'':' off')}
}

let online=navigator.onLine!==false,filt={q:'',fu:'Today'},vs={st:'idle',tx:'',ex:null,log:[],lang:S.settings.lang||'Tamil',detectedLang:null,showCorr:false,cf:'auto'},seedTimer;
// An explicitly selected language is authoritative; Auto Detect is the only mode that follows STT metadata.
function lockedVoiceLanguage(){return vs.lang&&vs.lang!=='Auto Detect'&&I18N[vs.lang]?vs.lang:null;}
function responseVoiceLanguage(){return lockedVoiceLanguage()||vs.detectedLang||detectTextLang(vs.tx)||curLang();}
const ben=id=>S.ben.find(b=>b.id==id);
const fmt=d=>new Date(d+'T00:00').toLocaleDateString(curLang()=='Tamil'?'ta-IN':curLang()=='Hindi'?'hi-IN':'en-IN',{day:'numeric',month:'short',year:'numeric'});
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),3000)}
function ask(title,html,okLabel,cb){const d=$('#dlg');d.innerHTML=`<h3>${title}</h3><div style="margin:12px 0">${html}</div><div class="row" style="justify-content:flex-end"><button class="btn alt sm" id="dn">Cancel</button><button class="btn sm" id="dy">${okLabel}</button></div>`;d.showModal();d.onclick=e=>{if(e.target===d)d.close()};$('#dn').onclick=()=>d.close();$('#dy').onclick=()=>{const r=cb(d);if(r!==false)d.close()}}

/* ---------- Extraction & Validation with Full Multilingual Support ---------- */
const VTYPES=[['ANC Visit',/\banc\b|antenatal|pregnan|கர்ப்பிணி|प्रसव पूर्व/i],['PNC Visit',/\bpnc\b|postnatal|post-natal|பிரசவ|प्रसवोत्तर/i],['Newborn Visit',/newborn|new born|hbnc|பச்சிளங்குழந்தை|नवजात/i],['Immunisation Visit',/immuni[sz]ation|vaccination|தடுப்பூசி|टीकाकरण/i],['Follow-up Visit',/follow[- ]?up|பின்தொடர்தல்|फॉलो-अप/i],['Household Visit',/household|routine|home visit|வீட்டு வருகை|गृह भेंट/i]];
const VACC_RE=/\b(penta(?:valent)?|bcg|opv|ipv|hep(?:atitis)?\s*-?b|mr|measles|rubella|dpt|td|tt|rota(?:virus)?|pcv|vitamin\s*a|polio|tetanus|covid|பென்டா|பிசிஜி|போலியோ|தட்டம்மை|டிடி|पेंटा|बीसीजी|पोलियो|खसरा|टीडी)\b(?:\s*(booster|[1-9]))?/gi;
const VNAME={bcg:'BCG',opv:'OPV',ipv:'IPV',mr:'MR',dpt:'DPT',td:'Td',tt:'TT',pcv:'PCV'};
const NAME_STOP=('today the a an new patient beneficiary household visit visited weight age ward next is was and her his she he name of for with at on to from has have routine health kg kilograms kilogram kilo years year old vaccination vaccine due mr mrs ms smt shri sri my id number phone doctor asha anm phc hospital called named met register registered registering enrolled naam hai hain ka ki ke ko aur tha thi hua hui umar umr saal sal varsh vayasu vayas vajan wajan mahine maheene month months vayassu vayassu vayass vayasu vayasu வயசு வயது வயதான வயస్సు వయసు వయస్సు ವಯಸ್ಸು ವಯಸು പ്രായം വയസ്സ് বয়স বয়স ઉંમર ઉંમર peyar peru hesaru नाम नाव பெயர் పేరు ಹೆಸರು പേര് নাম નામ ਹੈ ਹਨ ਪੇਅਰ അടുത്ത ഇന്നത്തെ').split(/\s+/);

const phon=s=>String(s).toLowerCase().normalize('NFC').replace(/[^\p{L}\p{M}]/gu,'').replace(/ee|ii/g,'i').replace(/oo|uu/g,'u').replace(/aa/g,'a').replace(/ph/g,'f').replace(/[wv]/g,'v').replace(/z/g,'j').replace(/q/g,'k').replace(/[tdbkg]h/g,m=>m[0]).replace(/sh/g,'s').replace(/y$/,'i').replace(/(.)\1+/g,'$1');
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]==b[j-1]?0:1));p=c}return p[n]}
const sim=(a,b)=>{const l=Math.max(a.length,b.length);return l?1-lev(a,b)/l:0};

function fuzzyBen(t){
 const tok=String(t).split(/[^\p{L}\p{M}]+/u).filter(x=>x.length>1);if(!tok.length)return null;
 const res=S.ben.map(b=>{const nt=b.name.split(/\s+/).filter(Boolean),full=phon(nt.join('')),first=phon(nt[0]);let best=0;
  for(let i=0;i+nt.length<=tok.length;i++)best=Math.max(best,sim(phon(tok.slice(i,i+nt.length).join('')),full));
  if(nt.length>1&&first.length>=4)tok.forEach(x=>{best=Math.max(best,sim(phon(x),first)*.92)});
  return{b,score:best}}).sort((x,y)=>y.score-x.score);
 const top=res[0];if(!top||top.score<.8||(res[1]&&res[1].score>=top.score-.05))return null;return top.b;
}

function vaccList(s){
 const out=[];let m;VACC_RE.lastIndex=0;
 while((m=VACC_RE.exec(s))){
  const k=m[1].toLowerCase().replace(/\s+/g,' ');let nm=VNAME[k]||(/^hep/.test(k)?'Hepatitis B':k.replace(/^./,c=>c.toUpperCase()));
  if(m[2])nm+=' '+m[2].toLowerCase();if(!out.includes(nm))out.push(nm);
 }
 if(/next month|அடுத்த மாதம்|अगले महीने/i.test(s)&&!out.includes('Next month'))out.push('Next month');
 return out;
}

const cap=w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
function cleanName(s){if(!s)return null;
 const w=String(s).normalize('NFC').replace(/[^\p{L}\p{M}.'’ -]/gu,' ').split(/\s+/).map(x=>x.replace(/^[-.'’]+|[-.'’]+$/g,'')).filter(Boolean);
 while(w.length&&NAME_STOP.includes(w[0].toLowerCase()))w.shift();
 const out=[];for(const x of w){if(NAME_STOP.includes(x.toLowerCase()))break;out.push(x)}
 const n=out.slice(0,4).map(cap).join(' ');return n.length>=2?n:null;
}
const takeSentence=s=>{const o=[];for(const w of String(s).trim().split(/\s+/)){o.push(w);if(/[.!?]$/.test(w)&&w.replace(/[.!?]+$/,'').length>2)break}return o.join(' ')};

const NAME_KEYS='name|naam|naama|peyar|peru|hesaru|hesar|नाम|नाव|பெயர்|పేరు|ಹೆಸರು|പേര്|নাম|નામ';
const NAME_KEY_CAP=new RegExp('(?<![\\p{L}\\p{M}])(?:'+NAME_KEYS+')[\\s:=-]*((?:[\\p{L}\\p{M}.\'’\\-]+\\s*){1,6})','iu');
const STRONG_NAME=/\b(?:new\s+(?:patient|beneficiary)|register(?:ing|ed)?(?:\s+a)?(?:\s+new)?(?:\s+(?:patient|beneficiary))?|named|called|புதிய\s+நோயாளி|புதிய\s+பயனாளி|नया\s+मरीज|नया\s+लाभार्थी)(?![\p{L}\p{M}])\s*[:,-]?\s*(?:is\s+)?((?:[\p{L}\p{M}.'’\\-]+\\s*){1,4})/iu;
const WEAK_NAME=/\b(?:visited|met|patient|beneficiary|பயனாளி|நோயாளி|लाभार्थी|मरीज)(?![\p{L}\p{M}])\s*[:,-]?\s*((?:[\p{L}\p{M}.'’\\-]+\\s*){1,4})/gu;

function findName(t){
 t=String(t||'');
 let m=t.match(NAME_KEY_CAP);if(m){const n=cleanName(takeSentence(m[1]));if(n)return n}
 m=t.match(STRONG_NAME);if(m){const n=cleanName(takeSentence(m[1]));if(n)return n}
 WEAK_NAME.lastIndex=0;let x;while((x=WEAK_NAME.exec(t))){const c=x[1].trim().charAt(0);if(c&&c===c.toUpperCase()){const n=cleanName(takeSentence(x[1]));if(n)return n}}
 return null;
}

const LETTER={'ஏ':'a','बी':'b','सी':'c','डी':'d','ई':'e','एफ':'f','जी':'g','एच':'h','आई':'i','जे':'j','के':'k','एल':'l','एम':'m','एन':'n','ओ':'o','पी':'p','क्यू':'q','आर':'r','एस':'s','टी':'t','यू':'u','वी':'v','एक्स':'x','वाई':'y','जेड':'z',ay:'a',bee:'b',see:'c',sea:'c',cee:'c',dee:'d',ee:'e',ef:'f',eff:'f',gee:'g',jee:'g',aitch:'h',eye:'i',jay:'j',kay:'k',el:'l',ell:'l',em:'m',en:'n',oh:'o',pee:'p',cue:'q',queue:'q',ar:'r',ess:'s',tee:'t',vee:'v',ex:'x',why:'y',zed:'z',zee:'z'};
function spellJoin(s){const tk=String(s).replace(/[.,;:-]+/g,' ').trim().split(/\s+/).filter(Boolean);
 const sp=tk.map(x=>LETTER[x.toLowerCase()]||(/^[A-Za-z]$/.test(x)?x.toLowerCase():null)),n=sp.filter(Boolean).length;
 if(n<3||n<tk.length*.7)return null;
 const words=[];let cur='';tk.forEach((x,i)=>{if(sp[i])cur+=sp[i];else if(cur){words.push(cur);cur=''}});if(cur)words.push(cur);
 return words.slice(0,4).map(cap).join(' ')||null;
}
const nameFrom=s=>spellJoin(s)||cleanName(s);
const nextId=()=>String(Math.max(100,...S.ben.map(b=>parseInt(b.id)||0))+1);

function parseNext(t){
 const seg=(t.match(/(?:next\s+visit|அடுத்த\s+வருகை|அடுத்த\s+சந்திப்பு|अगली\s+मुलाकात|अगली\s+विजिट|వచ్చే\s+సందర్శన|ಮುಂದಿನ\s+ಭೇಟಿ|അടുത്ത\s+സന്ദർശനം)[^.]*/iu)||t.match(/(?:come back|return|review|follow[- ]?up)[^.]*/iu)||[''])[0];
 const target=seg||t;
 let mo,d,y,m;
 const re1=new RegExp('('+MONTH_REGEX_STR+')\\s*(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*,?\\s*(20\\d\\d))?','iu');
 const re2=new RegExp('(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:of\\s*|ஆம்\\s*)?('+MONTH_REGEX_STR+')(?:\\s*,?\\s*(20\\d\\d))?','iu');
 
 if((m=target.match(re1))){mo=MONTH_NAMES[m[1].toLowerCase()];d=+m[2];y=m[3]?+m[3]:null}
 else if((m=target.match(re2))){d=+m[1];mo=MONTH_NAMES[m[2].toLowerCase()];y=m[3]?+m[3]:null}
 else if((m=target.match(/(\d{1,2})[-\/](\d{1,2})[-\/](20\d\d)/))){d=+m[1];mo=+m[2];y=+m[3]}
 else return null;

 const pad=n=>String(n).padStart(2,'0');let rolled=false;
 if(!y){y=+TODAY.slice(0,4);if(`${y}-${pad(mo)}-${pad(d)}`<TODAY){y++;rolled=true}}
 return{iso:`${y}-${pad(mo)}-${pad(d)}`,rolled};
}

function validate(ex){
 const i=[];
 if(ex.mode=='new'){if(!ex.name)i.push(t('valName','Patient name is needed to register a new patient'));if(ex.id&&ben(ex.id))i.push(`ID ${ex.id} already belongs to ${ben(ex.id).name}. Change the ID or switch to Existing patient`)}
 else{if(!ex.id)i.push(t('valId','Beneficiary ID not heard. Say the ID or the patient name'));else if(!ben(ex.id))i.push(`No beneficiary with ID ${ex.id}. Correct the ID, or tap New patient`)}
 if(ex.w!=null&&(ex.w<1||ex.w>150))i.push('Weight looks out of range');
 if(ex.next&&ex.next<TODAY)i.push('Next visit is in the past');
 ex.issues=i;return ex;
}

function extract(rawT){
 const t=normDigits(String(rawT||''));
 const id=(t.match(/(?:beneficiary|patient|id|நோயாளி|பயனாளி|அடையாளம்|ஐடி|लाभार्थी|मरीज|रोगी|आईडी|లబ్ధిదారు|ఫಲಾನುಭವಿ|രോഗി|সুবিধাভোগী)\s*(?:id\s*)?(?:no\.?\s*|number\s*|எண்\.?\s*|संख्या\s*|నంబరు\s*)?(?:is\s*|ஆகும்\s*|है\s*)?(\d+)/iu)||[])[1]||(t.match(/\b(\d{3,4})\b/)||[])[1]||null;
 
 let w=(t.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilo|kilograms|கிலோ|கிலோகிராம்|किलो|किलोग्राम|కిలో|ಕಿಲೋ|കിലോ|কেজি)/iu)||t.match(/(?:weight|எடை|વજન|वजन|బరువు|ತೂಕ|ഭാരം|ওজন)\s*(?:is\s*|ஆகும்\s*|है\s*)?(\d+(?:\.\d+)?)/iu)||[])[1];
 w=w?parseFloat(w):null;

 const pn=parseNext(t),next=pn?pn.iso:null;
 const vsent=t.split(/[.;\n]+/).filter(x=>/vaccin|immuni[sz]|injection|தடுப்பூசி|टीका/iu.test(x)).join(' ');
 const vacc=/\b(no|none|nil|இல்லை|कोई नहीं)\b/iu.test(vsent)?[]:vaccList(vsent);

 const ageWords='age|years? old|umar|umr|vayasu|vayas|vayassu|ವಯಸ್ಸು|ವಯಸು|ವಯಸ್ಸಿನ|ಪ್ರಾಯ|പ്രായം|വയസ്സ്|വയസ്|വയസായ|വയസുള്ള|వయస్సు|వయసు|వయసు|वय|उम्र|साल|वर्ष|वय|வயது|வயசு|வருடம்|ময়স|বয়স|বয়স|વય|ઉંમર';
 const ageUnit='months?|mo\\b|mahine|மாதம்|महीने|वर्ष|साल|years?|yrs?|ವರಷ|ವರ್ಷ|ತಿಂಗಳು|മാസം|വർഷം|నెలలు|సంవత్సరాలు|বছর|મહિના|વર્ષ';
 const ageBefore=new RegExp('(?:^|[^\\p{L}\\p{M}])(?:'+ageWords+')(?:[^\\p{L}\\p{M}])*?(\\d{1,3})(?:\\s*('+ageUnit+'))?','iu');
 const ageAfter=new RegExp('(\\d{1,3})\\s*(?:('+ageUnit+')\\s*)?(?:'+ageWords+')(?:$|[^\\p{L}\\p{M}])','iu');
 const ageOld=/(\d{1,3})\s*(months?|mo|years?|yrs?|saal|sal|வருடம்|साल|वर्ष)\b/iu;
 const am=t.match(ageBefore)||t.match(ageAfter)||t.match(ageOld);
 let age=am?(am[1]+(/month|mo|மாதம்|महीने|ತಿಂಗಳು|മാസം|నెల|బছর|বছর|મહિના/i.test(am[2]||'')?' mo':' y')):null;

 const wm=t.match(/(?:\bward|வார்டு|वार्ड|ವಾರ್ಡ್|వార్డు)\s*(?:number\s*|no\.?\s*)?(\d+)/iu);
 const ward=wm?wm[1]:null;

 const type=(VTYPES.find(([,re])=>re.test(t))||['Household Visit'])[0];
 let name=findName(t);
 // Some STT outputs place the age immediately after the patient's name but omit the spoken age label.
 if(!age&&name){const at=t.toLocaleLowerCase().lastIndexOf(name.toLocaleLowerCase());if(at>=0){const tail=t.slice(at+name.length);const trailing=tail.match(/^\s*[,;:]?\s*(\d{1,3})\s*(?:[.!?]|$)/u);if(trailing&&trailing[1]!==String(id||''))age=trailing[1]+' y';}}
 const newIntent=/\bnew\s+(?:patient|beneficiary|registration|case)|\bregister|\benrol|புதிய\s+நோயாளி|புதிய\s+பயனாளி|नया\s+मरीज|కొత్త\s+రోగి/iu.test(t);

 let mode='existing',rid=id;
 if(id&&ben(id))mode='existing';
 else if(newIntent)mode='new';
 else if(!id&&name){
  const n=name.toLowerCase(),hit=S.ben.filter(b=>{const a=b.name.toLowerCase();return a==n||a.includes(n)});
  if(hit.length==1){mode='existing';rid=hit[0].id}else{const fz=hit.length?null:fuzzyBen(name);if(fz){mode='existing';rid=fz.id}else mode='new'}
 }
 else if(!id&&!name){const fz=fuzzyBen(t);if(fz){mode='existing';rid=fz.id}}
 else if(id&&name)mode='new';

 return validate({mode,id:rid,name:mode=='new'?name:(rid&&ben(rid)?ben(rid).name:name),age,ward,type,w,vacc,next,rolled:!!(pn&&pn.rolled),issues:[],danger:dangerScan(t)});
}

/* Multilingual speech synthesizer */
let spkSeq=0,spkAudio=null,spkUtt=null;
function stopSpeak(){spkSeq++;try{spkAudio&&spkAudio.pause()}catch(e){}spkAudio=null;try{if(spkUtt){speechSynthesis.cancel();spkUtt=null}}catch(e){}}

async function speakText(t,langName){
 if(!t)return;stopSpeak();const my=spkSeq;t=String(t).slice(0,900);
 const targetLang=langName||curLang();
 const langDef=LANG_DEFS.find(l=>l.id===targetLang)||LANG_DEFS[0];
 const langCode=langDef.code;
 
 if(gn.tts){
  try{
   const r=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:t,language:langCode,voice:langDef.voice})});
   if(!r.ok)throw 0;
   const blob=await r.blob();if(my!==spkSeq)return;
   const u=URL.createObjectURL(blob),a=new Audio(u);spkAudio=a;
   a.onended=()=>URL.revokeObjectURL(u);
   await a.play();return;
  }catch(e){if(my!==spkSeq)return}
 }
 try{
  const m=new SpeechSynthesisUtterance(t);
  m.lang=langCode;m.rate=.92;
  const voices=speechSynthesis.getVoices();
  const vMatch=voices.find(v=>v.lang===langCode||v.lang.startsWith(langDef.short));
  if(vMatch)m.voice=vMatch;
  spkUtt=m;speechSynthesis.speak(m);
 }catch(e){toast('Audio playback notice: browser speech fallback used.')}
}

/* Same-language spoken line generator */
const VISIT_TYPE_LABELS={
 Tamil:{'ANC Visit':'கர்ப்பகால வருகை','PNC Visit':'பிரசவத்திற்குப் பிந்தைய வருகை','Newborn Visit':'பச்சிளங்குழந்தை வருகை','Immunisation Visit':'தடுப்பூசி வருகை','Follow-up Visit':'பின்தொடர்தல் வருகை','Household Visit':'வீட்டு நலப் பார்வை'},
 Hindi:{'ANC Visit':'गर्भावस्था जांच','PNC Visit':'प्रसव के बाद की जांच','Newborn Visit':'नवजात शिशु की जांच','Immunisation Visit':'टीकाकरण जांच','Follow-up Visit':'फॉलो-अप जांच','Household Visit':'घर पर स्वास्थ्य जांच'},
 Telugu:{'ANC Visit':'గర్భధారణ సందర్శన','PNC Visit':'ప్రసవానంతర సందర్శన','Newborn Visit':'నవజాత శిశువు సందర్శన','Immunisation Visit':'టీకాల సందర్శన','Follow-up Visit':'తదుపరి పరిశీలన','Household Visit':'ఇంటి ఆరోగ్య సందర్శన'},
 Kannada:{'ANC Visit':'ಗರ್ಭಾವಸ್ಥೆಯ ಭೇಟಿ','PNC Visit':'ಪ್ರಸವಾನಂತರದ ಭೇಟಿ','Newborn Visit':'ನವಜಾತ ಶಿಶುವಿನ ಭೇಟಿ','Immunisation Visit':'ಲಸಿಕೆ ಭೇಟಿ','Follow-up Visit':'ಮರುಭೇಟಿ','Household Visit':'ಮನೆ ಆರೋಗ್ಯ ಭೇಟಿ'},
 Malayalam:{'ANC Visit':'ഗർഭകാല സന്ദർശനം','PNC Visit':'പ്രസവാനന്തര സന്ദർശനം','Newborn Visit':'നവജാത ശിശു സന്ദർശനം','Immunisation Visit':'പ്രതിരോധ കുത്തിവയ്പ്പ് സന്ദർശനം','Follow-up Visit':'തുടർ സന്ദർശനം','Household Visit':'വീട്ടിലെ ആരോഗ്യ സന്ദർശനം'},
 Bengali:{'ANC Visit':'গর্ভকালীন পরিদর্শন','PNC Visit':'প্রসব-পরবর্তী পরিদর্শন','Newborn Visit':'নবজাতকের পরিদর্শন','Immunisation Visit':'টিকাদান পরিদর্শন','Follow-up Visit':'ফলো-আপ পরিদর্শন','Household Visit':'বাড়িতে স্বাস্থ্য পরিদর্শন'},
 Marathi:{'ANC Visit':'गर्भावस्थेतील भेट','PNC Visit':'प्रसूतीनंतरची भेट','Newborn Visit':'नवजात बाळाची भेट','Immunisation Visit':'लसीकरण भेट','Follow-up Visit':'पुढील तपासणी','Household Visit':'घरभेट आरोग्य तपासणी'},
 Gujarati:{'ANC Visit':'ગર્ભાવસ્થા મુલાકાત','PNC Visit':'પ્રસૂતિ પછીની મુલાકાત','Newborn Visit':'નવજાત શિશુની મુલાકાત','Immunisation Visit':'રસીકરણ મુલાકાત','Follow-up Visit':'ફોલો-અપ મુલાકાત','Household Visit':'ઘરે આરોગ્ય મુલાકાત'},
 English:{'ANC Visit':'ANC visit','PNC Visit':'PNC visit','Newborn Visit':'Newborn visit','Immunisation Visit':'Immunisation visit','Follow-up Visit':'Follow-up visit','Household Visit':'Household visit'}
};
const VOICE_COPY={
 Tamil:{beneficiary:'பயனாளி',newPatient:'புதிய நோயாளி',notHeard:'கேட்கவில்லை',id:'எண்',age:'வயது',ward:'வார்டு',visitType:'வருகை வகை',weight:'எடை',kg:'கிலோகிராம்',notGiven:'குறிப்பிடப்படவில்லை',vaccines:'தடுப்பூசிகள்',none:'இல்லை',next:'அடுத்த வருகை',heard:'நான் கேட்ட விவரங்கள்',correct:'இது சரியா?',clarify:'விளக்கம் தேவை',danger:'ஆபத்தான அறிகுறி தெரிவிக்கப்பட்டுள்ளது. உடனடியாக ஆரம்ப சுகாதார நிலையத்தை அணுகவும்.',saved:'வருகைப் பதிவு வெற்றிகரமாகச் சேமிக்கப்பட்டது'},
 Hindi:{beneficiary:'लाभार्थी',newPatient:'नया मरीज',notHeard:'सुनाई नहीं दिया',id:'आईडी',age:'उम्र',ward:'वार्ड',visitType:'जांच का प्रकार',weight:'वजन',kg:'किलोग्राम',notGiven:'नहीं बताया गया',vaccines:'टीके',none:'कोई नहीं',next:'अगली मुलाकात',heard:'मैंने यह जानकारी सुनी',correct:'क्या यह सही है?',clarify:'स्पष्टीकरण चाहिए',danger:'खतरे का लक्षण बताया गया है। तुरंत प्राथमिक स्वास्थ्य केंद्र जाएं।',saved:'जांच का रिकॉर्ड सफलतापूर्वक सहेजा गया'},
 Telugu:{beneficiary:'లబ్ధిదారు',newPatient:'కొత్త రోగి',notHeard:'వినిపించలేదు',id:'ఐడి',age:'వయస్సు',ward:'వార్డు',visitType:'సందర్శన రకం',weight:'బరువు',kg:'కిలోగ్రాములు',notGiven:'చెప్పలేదు',vaccines:'టీకాలు',none:'ఏవీ లేవు',next:'తదుపరి సందర్శన',heard:'నేను విన్న వివరాలు',correct:'ఇది సరైనదేనా?',clarify:'వివరణ కావాలి',danger:'ప్రమాద సూచన తెలిపబడింది. వెంటనే ప్రాథమిక ఆరోగ్య కేంద్రాన్ని సంప్రదించండి.',saved:'సందర్శన వివరాలు విజయవంతంగా భద్రపరచబడ్డాయి'},
 Kannada:{beneficiary:'ಫಲಾನುಭವಿ',newPatient:'ಹೊಸ ರೋಗಿ',notHeard:'ಕೇಳಿಸಲಿಲ್ಲ',id:'ಐಡಿ',age:'ವಯಸ್ಸು',ward:'ವಾರ್ಡ್',visitType:'ಭೇಟಿಯ ಪ್ರಕಾರ',weight:'ತೂಕ',kg:'ಕಿಲೋಗ್ರಾಂ',notGiven:'ಹೇಳಲಾಗಿಲ್ಲ',vaccines:'ಲಸಿಕೆಗಳು',none:'ಯಾವುದೂ ಇಲ್ಲ',next:'ಮುಂದಿನ ಭೇಟಿ',heard:'ನಾನು ಕೇಳಿದ ವಿವರಗಳು',correct:'ಇದು ಸರಿಯೇ?',clarify:'ವಿವರಣೆ ಅಗತ್ಯ',danger:'ಅಪಾಯದ ಲಕ್ಷಣ ವರದಿಯಾಗಿದೆ. ತಕ್ಷಣ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.',saved:'ಭೇಟಿಯ ದಾಖಲೆ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ'},
 Malayalam:{beneficiary:'ഗുണഭോക്താവ്',newPatient:'പുതിയ രോഗി',notHeard:'കേട്ടില്ല',id:'ഐഡി',age:'പ്രായം',ward:'വാർഡ്',visitType:'സന്ദർശന തരം',weight:'ഭാരം',kg:'കിലോഗ്രാം',notGiven:'നൽകിയിട്ടില്ല',vaccines:'വാക്സിനുകൾ',none:'ഒന്നുമില്ല',next:'അടുത്ത സന്ദർശനം',heard:'ഞാൻ കേട്ട വിവരങ്ങൾ',correct:'ഇത് ശരിയാണോ?',clarify:'വ്യക്തത വേണം',danger:'അപകട സൂചന റിപ്പോർട്ട് ചെയ്തു. ഉടൻ പ്രാഥമിക ആരോഗ്യ കേന്ദ്രവുമായി ബന്ധപ്പെടുക.',saved:'സന്ദർശന രേഖ വിജയകരമായി സംരക്ഷിച്ചു'},
 Bengali:{beneficiary:'সুবিধাভোগী',newPatient:'নতুন রোগী',notHeard:'শোনা যায়নি',id:'আইডি',age:'বয়স',ward:'ওয়ার্ড',visitType:'পরিদর্শনের ধরন',weight:'ওজন',kg:'কিলোগ্রাম',notGiven:'জানানো হয়নি',vaccines:'টিকা',none:'কোনোটি নয়',next:'পরবর্তী পরিদর্শন',heard:'আমি যে তথ্য শুনেছি',correct:'এটি কি সঠিক?',clarify:'ব্যাখ্যা প্রয়োজন',danger:'বিপদের লক্ষণ জানানো হয়েছে। অবিলম্বে প্রাথমিক স্বাস্থ্যকেন্দ্রে যোগাযোগ করুন।',saved:'পরিদর্শনের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে'},
 Marathi:{beneficiary:'लाभार्थी',newPatient:'नवीन रुग्ण',notHeard:'ऐकू आले नाही',id:'आयडी',age:'वय',ward:'प्रभाग',visitType:'भेटीचा प्रकार',weight:'वजन',kg:'किलोग्रॅम',notGiven:'सांगितले नाही',vaccines:'लसी',none:'काही नाही',next:'पुढील भेट',heard:'मी ऐकलेली माहिती',correct:'हे बरोबर आहे का?',clarify:'स्पष्टीकरण आवश्यक आहे',danger:'धोक्याचे लक्षण नोंदवले आहे. त्वरित प्राथमिक आरोग्य केंद्राशी संपर्क साधा.',saved:'भेटीची नोंद यशस्वीरित्या जतन केली'},
 Gujarati:{beneficiary:'લાભાર્થી',newPatient:'નવા દર્દી',notHeard:'સાંભળાયું નથી',id:'આઈડી',age:'ઉંમર',ward:'વોર્ડ',visitType:'મુલાકાતનો પ્રકાર',weight:'વજન',kg:'કિલોગ્રામ',notGiven:'જણાવ્યું નથી',vaccines:'રસીઓ',none:'કોઈ નહીં',next:'આગલી મુલાકાત',heard:'મેં સાંભળેલી માહિતી',correct:'શું આ સાચું છે?',clarify:'સ્પષ્ટતા જરૂરી છે',danger:'જોખમનું લક્ષણ જણાવાયું છે. તાત્કાલિક પ્રાથમિક આરોગ્ય કેન્દ્રનો સંપર્ક કરો.',saved:'મુલાકાતની નોંધ સફળતાપૂર્વક સાચવાઈ'},
 English:{beneficiary:'Beneficiary',newPatient:'New patient',notHeard:'not heard',id:'ID',age:'Age',ward:'Ward',visitType:'Visit type',weight:'Weight',kg:'kilograms',notGiven:'not given',vaccines:'Vaccinations',none:'none',next:'Next visit',heard:'I heard these details',correct:'Is this correct?',clarify:'I need clarification',danger:'A danger sign was reported. Contact the primary health centre immediately.',saved:'Visit record saved successfully'}
};
function recordLine(ex,spk,langName){
 const l=langName||curLang(),c=VOICE_COPY[l]||VOICE_COPY.English,b=ex.id&&ben(ex.id);
 const dg=x=>spk?String(x).split('').join(' '):x;
 const age=ex.age||(ex.mode!=='new'&&b&&b.age!=='—'?b.age:'');
 const p=[];
 if(ex.mode==='new')p.push(c.newPatient+' '+(ex.name||c.notHeard)+(ex.id?', '+c.id+' '+dg(ex.id):''));
 else p.push(c.beneficiary+' '+(ex.id?dg(ex.id):c.notHeard)+(b?', '+b.name:''));
 if(age)p.push(c.age+' '+age);
 if(ex.mode==='new'&&ex.ward)p.push(c.ward+' '+ex.ward);
 p.push(c.visitType+' '+((VISIT_TYPE_LABELS[l]||VISIT_TYPE_LABELS.English)[ex.type]||ex.type));
 p.push(c.weight+' '+(ex.w!=null?ex.w+' '+c.kg:c.notGiven));
 p.push(c.vaccines+' '+(ex.vacc.join(', ')||c.none));
 p.push(c.next+' '+(ex.next?new Date(ex.next+'T00:00').toLocaleDateString(LANG_DEFS.find(x=>x.id===l)?.code||'en-IN',{day:'numeric',month:'long',year:'numeric'}):c.notGiven));
 return p.join(spk?'. ':', ');
}

/* Spoken read-back */
function localizeIssues(issues,lang){
 const words={
  Tamil:{name:'புதிய நோயாளியைப் பதிவு செய்ய நோயாளியின் பெயர் தேவை',id:'பயனாளி எண் கேட்கப்படவில்லை. எண் அல்லது நோயாளியின் பெயரைக் கூறவும்',unknown:'இந்த பயனாளி எண் பதிவில் இல்லை. எண்ணைச் சரிசெய்யவும் அல்லது புதிய நோயாளியைத் தேர்ந்தெடுக்கவும்',duplicate:'இந்த எண் ஏற்கனவே வேறொருவருக்குச் சொந்தமானது. எண்ணை மாற்றவும் அல்லது பழைய நோயாளியைத் தேர்ந்தெடுக்கவும்',weight:'எடை சரியான வரம்பில் இல்லை',date:'அடுத்த வருகைத் தேதி கடந்துவிட்டது'},
  Hindi:{name:'नए मरीज को दर्ज करने के लिए मरीज का नाम जरूरी है',id:'लाभार्थी की आईडी सुनाई नहीं दी। आईडी या मरीज का नाम बताएं',unknown:'यह लाभार्थी आईडी रिकॉर्ड में नहीं है। आईडी ठीक करें या नया मरीज चुनें',duplicate:'यह आईडी पहले से किसी अन्य व्यक्ति की है। आईडी बदलें या मौजूदा मरीज चुनें',weight:'वजन की सीमा सही नहीं है',date:'अगली मुलाकात की तारीख बीत चुकी है'},
  Telugu:{name:'కొత్త రోగిని నమోదు చేయడానికి పేరు అవసరం',id:'లబ్ధిదారు ఐడి వినిపించలేదు. ఐడి లేదా రోగి పేరు చెప్పండి',unknown:'ఈ ఐడి రికార్డులో లేదు. ఐడిని సరిచేయండి లేదా కొత్త రోగిని ఎంచుకోండి',duplicate:'ఈ ఐడి ఇప్పటికే మరొకరికి ఉంది. ఐడిని మార్చండి లేదా ఉన్న రోగిని ఎంచుకోండి',weight:'బరువు సరైన పరిమితిలో లేదు',date:'తదుపరి సందర్శన తేదీ గడిచిపోయింది'},
  Kannada:{name:'ಹೊಸ ರೋಗಿಯನ್ನು ನೋಂದಾಯಿಸಲು ಹೆಸರು ಅಗತ್ಯವಿದೆ',id:'ಫಲಾನುಭವಿ ಐಡಿ ಕೇಳಿಸಲಿಲ್ಲ. ಐಡಿ ಅಥವಾ ರೋಗಿಯ ಹೆಸರನ್ನು ಹೇಳಿ',unknown:'ಈ ಐಡಿ ದಾಖಲೆಯಲ್ಲಿ ಇಲ್ಲ. ಐಡಿಯನ್ನು ಸರಿಪಡಿಸಿ ಅಥವಾ ಹೊಸ ರೋಗಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',duplicate:'ಈ ಐಡಿ ಈಗಾಗಲೇ ಬೇರೊಬ್ಬರಿಗೆ ಸೇರಿದೆ. ಐಡಿ ಬದಲಿಸಿ ಅಥವಾ ಹಳೆಯ ರೋಗಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',weight:'ತೂಕದ ಮೌಲ್ಯ ಸರಿಯಾದ ಮಿತಿಯಲ್ಲಿಲ್ಲ',date:'ಮುಂದಿನ ಭೇಟಿಯ ದಿನಾಂಕ ಕಳೆದಿದೆ'},
  Malayalam:{name:'പുതിയ രോഗിയെ രജിസ്റ്റർ ചെയ്യാൻ പേര് ആവശ്യമാണ്',id:'ഗുണഭോക്തൃ ഐഡി കേട്ടില്ല. ഐഡിയോ രോഗിയുടെ പേരോ പറയുക',unknown:'ഈ ഐഡി രേഖയിൽ ഇല്ല. ഐഡി തിരുത്തുക അല്ലെങ്കിൽ പുതിയ രോഗിയെ തിരഞ്ഞെടുക്കുക',duplicate:'ഈ ഐഡി മറ്റൊരാൾക്കായി നിലവിലുണ്ട്. ഐഡി മാറ്റുക അല്ലെങ്കിൽ നിലവിലുള്ള രോഗിയെ തിരഞ്ഞെടുക്കുക',weight:'ഭാരം അനുവദനീയമായ പരിധിയിലല്ല',date:'അടുത്ത സന്ദർശന തീയതി കഴിഞ്ഞുപോയി'},
  Bengali:{name:'নতুন রোগী নথিভুক্ত করতে রোগীর নাম প্রয়োজন',id:'সুবিধাভোগীর আইডি শোনা যায়নি। আইডি বা রোগীর নাম বলুন',unknown:'এই আইডি রেকর্ডে নেই। আইডি ঠিক করুন অথবা নতুন রোগী নির্বাচন করুন',duplicate:'এই আইডি ইতিমধ্যে অন্য কারও। আইডি পরিবর্তন করুন অথবা বর্তমান রোগী নির্বাচন করুন',weight:'ওজন সঠিক সীমার মধ্যে নেই',date:'পরবর্তী পরিদর্শনের তারিখ পেরিয়ে গেছে'},
  Marathi:{name:'नवीन रुग्णाची नोंदणी करण्यासाठी नाव आवश्यक आहे',id:'लाभार्थीचा आयडी ऐकू आला नाही. आयडी किंवा रुग्णाचे नाव सांगा',unknown:'हा आयडी नोंदीत नाही. आयडी दुरुस्त करा किंवा नवीन रुग्ण निवडा',duplicate:'हा आयडी आधीच दुसऱ्या व्यक्तीचा आहे. आयडी बदला किंवा विद्यमान रुग्ण निवडा',weight:'वजन योग्य मर्यादेत नाही',date:'पुढील भेटीची तारीख निघून गेली आहे'},
  Gujarati:{name:'નવા દર્દીની નોંધણી માટે નામ જરૂરી છે',id:'લાભાર્થીનો આઈડી સંભળાયો નથી. આઈડી અથવા દર્દીનું નામ કહો',unknown:'આ આઈડી રેકોર્ડમાં નથી. આઈડી સુધારો અથવા નવા દર્દીને પસંદ કરો',duplicate:'આ આઈડી પહેલેથી અન્ય વ્યક્તિનું છે. આઈડી બદલો અથવા હાલના દર્દીને પસંદ કરો',weight:'વજન યોગ્ય મર્યાદામાં નથી',date:'આગલી મુલાકાતની તારીખ પસાર થઈ ગઈ છે'},
  English:{name:'Patient name is needed to register a new patient',id:'Beneficiary ID not heard. Say the ID or the patient name',unknown:'No beneficiary with this ID. Correct the ID or choose New patient',duplicate:'This ID already belongs to another patient. Change the ID or switch to Existing patient',weight:'Weight looks out of range',date:'Next visit is in the past'}
 };
 const w=words[lang]||words.English;
 return issues.map(x=>{
  if(/Patient name is needed/.test(x))return w.name;
  if(/Beneficiary ID not heard/.test(x))return w.id;
  if(/No beneficiary with ID (\d+)/.test(x))return x.replace(/No beneficiary with ID (\d+).*/,w.unknown+' ($1)');
  if(/already belongs to/.test(x))return w.duplicate;
  if(/Weight looks out of range/.test(x))return w.weight;
  if(/Next visit is in the past/.test(x))return w.date;
  return x;
 }).join('; ');
}

function finish(){
 const scriptLang=detectTextLang(vs.tx);
 const detectedLang=lockedVoiceLanguage()||vs.detectedLang||(scriptLang==='English'&&vs.lang&&vs.lang!=='Auto Detect'?vs.lang:scriptLang);
 const respLang=detectedLang||curLang()||'English';
 const copy=VOICE_COPY[respLang]||VOICE_COPY.English;
 const ex=vs.ex=extract(vs.tx);
 let spoken='';
 if(ex.issues.length){
  vs.st='clarify';
  const issueText=localizeIssues(ex.issues,respLang);
  const msg=copy.clarify+': '+issueText+'.';
  say(msg);spoken=msg;
 }else{
  vs.st='confirm';
  const line=recordLine(ex,false,respLang);
  const msg=copy.heard+': '+line+'. '+copy.correct;
  say(msg);
  spoken=recordLine(ex,true,respLang)+'. '+copy.correct;
 }
 if(ex.danger.length)say(copy.danger);
 render();
 if(S.settings.readback)speakText(spoken,respLang);
}

const say=t=>{vs.log.push({r:'a',t})};

/* ==================== CONTINUOUS RECORDING (NO 30S LIMIT) ==================== */
let ws,ac,node,mst,recInterval,pcm=[],mode='main',recStartTime=0,recElapsedStr='00:00';

function updateRecTimer(){
 if(vs.st!=='listening')return;
 const elapsed=Math.floor((Date.now()-recStartTime)/1000);
 const m=String(Math.floor(elapsed/60)).padStart(2,'0');
 const s=String(elapsed%60).padStart(2,'0');
 recElapsedStr=`${m}:${s}`;
 const el=$('#recTimerDisplay');
 if(el)el.textContent=recElapsedStr;
}

function teardown(){
 clearInterval(recInterval);
 try{mst&&mst.getTracks().forEach(t=>t.stop());node&&node.disconnect();ac&&ac.close()}catch(e){}
}

function wav(a){
 const n=a.length,b=new DataView(new ArrayBuffer(44+n*2)),w=(o,t)=>[...t].forEach((c,k)=>b.setUint8(o+k,c.charCodeAt(0)));
 w(0,'RIFF');b.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');b.setUint32(16,16,true);b.setUint16(20,1,true);b.setUint16(22,1,true);b.setUint32(24,16000,true);b.setUint32(28,32000,true);b.setUint16(32,2,true);b.setUint16(34,16,true);w(36,'data');b.setUint32(40,n*2,true);
 for(let k=0;k<n;k++)b.setInt16(44+k*2,a[k],true);return b.buffer;
}

async function startMic(m){
 mode=m;stopSpeak();
 try{mst=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true}})}
 catch(e){toast(t('micBlocked','Microphone blocked. Allow microphone access in your browser settings.'));return}
 
 pcm=[];recStartTime=Date.now();recElapsedStr='00:00';
 if(m=='main'){vs.tx='';vs.ex=null;vs.log=[];vs.detectedLang=null;vs.showCorr=false}
 vs.st='listening';render();

 ac=new AudioContext();const src=ac.createMediaStreamSource(mst);node=ac.createScriptProcessor(4096,1,1);const ratio=ac.sampleRate/16000;
 node.onaudioprocess=ev=>{
  const d=ev.inputBuffer.getChannelData(0);
  for(let i=0;i<d.length;i+=ratio){const v=Math.max(-1,Math.min(1,d[Math.floor(i)]));pcm.push(v<0?v*32768:v*32767)}
 };
 src.connect(node);node.connect(ac.destination);
 
 // Update live timer every second. Recording continues UNTIL MANUAL STOP! No 30s cutoff!
 recInterval=setInterval(updateRecTimer,500);
}

async function stopMic(){
 if(vs.st!='listening')return;
 teardown();vs.st='transcribing';render();let tTxt='',detLang=null;
 
 try{
  if(pcm.length>8000){
   const reqLang=(mode==='spell'?'en-IN':(lockedVoiceLanguage()?LC[lockedVoiceLanguage()]:'indic-auto'));
   const r=await fetch('/api/stt?lang='+encodeURIComponent(reqLang),{
    method:'POST',
    headers:{'Content-Type':'application/octet-stream'},
    body:wav(pcm)
   });
   const j=await r.json().catch(()=>({}));
   if(!r.ok)throw new Error(j.error||'Voice service error');
   tTxt=(j.transcript||'').trim();
   detLang=j.language||j.detected_language_code||j.language_code||null;
   vs.detectedLang=lockedVoiceLanguage()||languageFromCode(detLang)||null;
  }
 }catch(e){
  toast(e.message);say('Voice recognition service reported: '+e.message);
  vs.st='clarify';render();return;
 }

 if(mode=='corr'||mode=='spell'){
  if(!tTxt){say('I did not hear anything. Tap microphone to try again.');vs.st='clarify';render();return}
  return correct(tTxt,mode=='spell'?'name':vs.cf);
 }

 vs.tx=tTxt;
 if(!tTxt){
  vs.st='clarify';
  say(curLang()==='Tamil'?'எதுவும் கேட்கவில்லை. மைக்ரோஃபோனைத் தட்டி மீண்டும் பேசவும்.':'I did not hear anything. Tap the microphone and try again.');
  render();return;
 }

 // Voice commands check (Confirm/Save)
 if(/^(ஆம்|சரி|சேமி|பதிவு செய்|உறுதி செய்|உறுதி|ஆம் சேமி|சரியாக உள்ளது|हाँ|सही है|सेव करो|सुरक्षित करो|पुष्टि|पुष्टि करें|yes|confirm|save|save record)$/iu.test(tTxt)){
  if(vs.ex&&!vs.ex.issues.length){commit();return}
 }

 vs.st='understanding';render();setTimeout(finish,400);
}

/* Field correction */
function correct(txt,force){
 const ex=vs.ex;if(!ex)return;txt=normDigits((txt||'').trim());if(!txt)return;
 const raw=txt,tNorm=txt.toLowerCase().replace(/[:=,]/g,' ').replace(/\s+/g,' ').trim();
 const num=(tNorm.match(/(\d+(?:\.\d+)?)/)||[])[1];
 
 if(/\b(weight|எடை|வજન|वजन)\b/iu.test(tNorm)||force==='w'){
  if(num){ex.w=parseFloat(num);say(curLang()==='Tamil'?`எடை ${ex.w} கிலோ என மாற்றப்பட்டது.`:`Weight updated to ${ex.w} kg.`);}
 }else if(/\b(name|பெயர்|नाम)\b/iu.test(tNorm)||force==='name'){
  const n=nameFrom(raw);if(n){ex.name=n;say(curLang()==='Tamil'?`பெயர் ${n} என மாற்றப்பட்டது.`:`Name updated to ${n}.`);}
 }else if(/\b(id|எண்|आईडी)\b/iu.test(tNorm)||force==='id'){
  if(num){ex.id=num;say(`ID set to ${num}`);}
 }
 validate(ex);vs.st=ex.issues.length?'clarify':'confirm';render();
}

function commit(){
 const ex=vs.ex,isNew=ex.mode=='new',ts=new Date(TODAY+'T00:00').toLocaleDateString(curLang()=='Tamil'?'ta-IN':'en-IN',{day:'2-digit',month:'short'});
 if(isNew&&!ex.id)ex.id=nextId();
 if(isNew&&!String(ex.name||'').trim()){toast(VOICE_COPY[responseVoiceLanguage()]?.notHeard||'Patient name is required');return;}
 const id='V-'+(S.vseq++);
 if(isNew)S.ben.push({id:ex.id,name:ex.name,hh:`${String(ex.name||'Patient').split(' ')[0]} household · Ward ${ex.ward||'?'}`,age:ex.age||'—',vacc:ex.vacc.join(', ')||'None due',next:ex.next||TODAY,st:'Needs review',w:[]});
 const rec={id,b:ex.id,date:TODAY,type:ex.type,w:ex.w,vacc:ex.vacc.join(', ')||'None',next:ex.next||TODAY,st:'Needs review',aud:[ts+' · Created by voice']};
 
 S.visits.push(rec);
 const b=ben(rec.b);
 if(b){if(rec.w!=null)b.w.push(rec.w);if(ex&&ex.next)b.next=ex.next;if(ex&&ex.vacc&&ex.vacc.length)b.vacc=ex.vacc.join(', ')}
 if(rec.next&&rec.next!==TODAY&&!S.fu.some(f=>f.b==rec.b&&f.date==rec.next))S.fu.push({id:Date.now()+Math.random(),b:rec.b,date:rec.next,st:'Pending'});
 if(ex)ex.danger.forEach(d=>S.alerts.push({id:Date.now()+Math.random(),v:rec.id,b:rec.b,rule:d.id,sign:d.sign,ack:false,ref:false,ts:rec.aud[0].split(' · ')[0]}));
 save();
 
 vs.st='saved';
 const saveLang=responseVoiceLanguage(),saveCopy=VOICE_COPY[saveLang]||VOICE_COPY.English;
 const sMsg=(saveCopy.saved||'Visit record saved successfully')+'. '+id;
 say(sMsg);toast(sMsg);render();
 if(S.settings.readback)speakText(sMsg,saveLang);
}

/* ==================== VIEWS RENDERING ==================== */
const stat=(n,l)=>`<div class="card stat"><b>${n}</b><span>${l}</span></div>`;
const overdue=()=>S.fu.filter(f=>f.st=='Pending'&&f.date<TODAY);

function Pulse(){
 const od=overdue().length,al=S.alerts.filter(a=>!a.ack).length,rv=S.visits.filter(v=>v.st=='Needs review').length;
 const sc=Math.max(0,Math.min(100,100-od*12-al*15-rv*4)),C=2*Math.PI*46,col=sc>=75?'var(--ok)':sc>=50?'var(--amb)':'var(--red)';
 const lab=sc>=75?'Steady':sc>=50?'Needs attention':'Act today';
 const W={};
 S.ben.forEach(b=>{const k=(b.hh.match(/Ward\s*(\d+)/)||[,'?'])[1],w=W[k]=W[k]||{n:0,o:0,a:0};w.n++;w.o+=S.fu.filter(f=>f.b==b.id&&f.st=='Pending'&&f.date<TODAY).length;w.a+=S.alerts.filter(x=>x.b==b.id&&!x.ack).length});
 return`<div class="card pulse"><div class="ring"><svg viewBox="0 0 112 112"><circle cx="56" cy="56" r="46" stroke="var(--ln)"/><circle cx="56" cy="56" r="46" stroke="${col}" stroke-dasharray="${C*sc/100} ${C}"/></svg><b>${sc}</b></div>
 <div style="min-width:150px"><h3>${t('pulseTitle')}</h3><p class="mu">${t('pulseSub')}</p><svg class="ecg" viewBox="0 0 260 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M0 20h60l8-14 10 28 8-14h50l8-10 10 20 8-10h40"/></svg></div>
 <div class="wards">${Object.keys(W).sort().map(k=>{const w=W[k];return`<div class="wt ${w.a?'d':w.o?'w':''}"><b>Ward ${k}</b><span>${w.n} people</span><small>${w.a?w.a+' alert':w.o?w.o+' overdue':'All on track'}</small></div>`}).join('')}</div></div>`;
}

function Dash(){
 const due=S.fu.filter(f=>f.st=='Pending'&&f.date==TODAY),rev=S.visits.filter(v=>v.st=='Needs review').length;
 const _l=[6,5,4,3,2,1,0].map(k=>{const d=new Date(TODAY+'T00:00');d.setDate(d.getDate()-k);return d}),days=_l.map(d=>d.toLocaleDateString(curLang()=='Tamil'?'ta-IN':'en-IN',{weekday:'short'})),dates=_l.map(ymd),c=dates.map(d=>S.visits.filter(v=>v.date==d).length),mx=Math.max(...c,1);
 return`<div class="view"><div class="top"><div><h2>${t('goodMorning')}, ${esc(S.settings.name)}</h2><p class="mu">${new Date(TODAY+'T00:00').toLocaleDateString(curLang()=='Tamil'?'ta-IN':'en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p></div>
 <button class="door-pill" id="openDoorDashBtn">${svg('door')} <span>${t('doorBtn')}: ${curLang()}</span></button>
 </div>
 <div class="grid g4">${stat(S.ben.length,t('totalBen'))}${stat(due.length,t('todayVisits'))}${stat(overdue().length+due.length,t('fuDue'))}${stat(rev,t('recReview'))}</div>${Pulse()}
 <a class="btn" style="width:100%;margin:14px 0;min-height:60px;font-size:18px" href="#voice">${svg('mic').replace('<svg','<svg width="26" height="26"')} ${t('recVoiceBtn')}</a>
 <div class="two"><div class="card"><h3>${t('todaySched')}</h3><div class="list">${due.map(f=>{const b=ben(f.b);return`<div class="row sp"><div><b>${esc(b.name)}</b><div class="mu">ID ${b.id} · ${esc(b.hh)}</div></div><button class="btn sm" data-act="done" data-id="${f.id}">${t('markDone')}</button></div>`}).join('')||`<p class="mu">${t('noVisitsToday')}</p>`}</div></div>
 <div class="card" style="margin-top:12px"><h3>${t('weeklyAct')}</h3><div class="bars" style="margin-top:12px">${c.map((n,i)=>`<div><small>${n}</small><span style="height:${n/mx*100}%"></span>${days[i]}</div>`).join('')}</div></div></div>
 <div class="card" style="margin-top:12px"><h3>${t('recentVisits')}</h3><div class="list">${S.visits.slice(-3).reverse().map(v=>`<div class="row sp"><div><b>${v.id}</b> · ID ${v.b}<div class="mu">${fmt(v.date)} · ${v.w} kg</div></div><span class="chip ${v.st=='Reviewed'?'':'w'}">${v.st}</span></div>`).join('')}</div></div></div>`;
}

function Voice(){
 const stMap={idle:t('stIdle'),listening:t('stListening'),transcribing:t('stTranscribing'),understanding:t('stUnderstanding'),confirm:t('stConfirm'),saved:t('stSaved'),clarify:t('stClarify'),draft:t('stDraft')};
 const st=stMap[vs.st]||vs.st;const ex=vs.ex;
 return`<div class="view"><div class="top"><h2>${t('voiceTitle')}</h2>
 <div class="row" style="gap:8px">
  <select aria-label="Language" id="vlang" style="width:auto">${LANGS.map(l=>`<option ${l==vs.lang?'selected':''}>${l}</option>`).join('')}</select>
  <button class="door-pill" id="openDoorVoiceBtn">${svg('door')} <span>Door</span></button>
 </div>
 </div>
 <div class="card" style="border-color:var(--ok);background:var(--okbg);margin-bottom:12px"><b>Live Multilingual AI:</b> ${gn.stt?t('liveNotice'):t('demoNotice')}</div>
 <div class="two"><div>
  <div class="card micwrap">
   <button class="micbtn ${vs.st=='listening'?'on':''}" id="mic" aria-label="${vs.st=='listening'?'Stop recording':'Start recording'}">${svg('mic')}</button>
   ${vs.st=='listening'?`<div class="rec-timer"><div class="rec-dot"></div><span id="recTimerDisplay">${recElapsedStr}</span> · NO TIME LIMIT</div>`:''}
   <div class="wave ${vs.st=='listening'?'on':''}" aria-hidden="true">${'<i></i>'.repeat(22)}</div>
   <span class="chip ${vs.st=='clarify'?'d':vs.st=='confirm'||vs.st=='draft'?'w':''}">${st}</span>
   <p class="mu" style="text-align:center">${vs.st=='listening'?`<button class="btn red sm" id="stopRecBtn" style="margin-top:6px">${t('stopRec')}</button>`:t('micHintIdleLive')}</p>
   ${vs.st=='idle'?`<div class="row" style="justify-content:center;margin-top:6px">
     <button class="btn alt sm" data-act="say" data-k="Tamil">தமிழ் Sample</button>
     <button class="btn alt sm" data-act="say" data-k="Hindi">हिन्दी Sample</button>
     <button class="btn alt sm" data-act="say" data-k="English">English Sample</button>
    </div>`:''}
  </div>
  <div class="card" style="margin-top:12px"><h3>${t('convTitle')}</h3><div id="log" aria-live="polite">${vs.tx?`<div class="bub u">${esc(vs.tx)}</div>`:''}${vs.log.map(m=>`<div class="bub ${m.r}">${esc(m.t)}</div>`).join('')||(vs.tx?'':`<p class="mu">${t('noConv')}</p>`)}</div></div>
 </div>
 <div>${ex?`<div class="card"><h3>${t('previewTitle')}</h3>
  <div class="row" style="margin-top:10px;gap:6px"><button class="btn sm ${ex.mode=='new'?'alt':''}" data-act="mode" data-k="existing">${t('exPatient')}</button><button class="btn sm ${ex.mode=='new'?'':'alt'}" data-act="mode" data-k="new">${t('newPatient')}</button></div>
  <dl class="kv" style="margin-top:12px"><dt>${t('benId')}</dt><dd>${ex.id||(ex.mode=='new'?'Auto ('+nextId()+')':'—')}</dd><dt>${t('patientName')}</dt><dd>${esc(ex.mode=='new'?ex.name:(ex.id&&ben(ex.id)?ben(ex.id).name:ex.name))||'—'}</dd><dt>${t('age')}</dt><dd>${esc(ex.age||(ex.id&&ben(ex.id)?ben(ex.id).age:''))||'—'}</dd><dt>${t('visitType')}</dt><dd>${((VISIT_TYPE_LABELS[lockedVoiceLanguage()||curLang()]||VISIT_TYPE_LABELS.English)[ex.type]||ex.type)}</dd><dt>${t('weight')}</dt><dd>${ex.w!=null?ex.w+' kg':'—'}</dd><dt>${t('vaccDue')}</dt><dd>${esc(ex.vacc.join(', '))||'—'}</dd><dt>${t('nextVisit')}</dt><dd>${ex.next?fmt(ex.next):'—'}</dd></dl>
  ${ex.danger.length?`<div class="alertbar" style="margin-top:12px"><h3>${t('dangerReported')}</h3>${ex.danger.map(d=>`<p><b>${d.sign}</b> (rule ${d.id})</p>`).join('')}<p><b>${t('referPhc')}</b></p></div>`:''}
  <div class="row" style="margin-top:14px">
   <button type="button" id="voiceConfirmBtn" class="btn" style="flex:1">${ex.mode=='new'?t('regSave'):t('confirmSave')}</button>
   <button type="button" id="voiceReadBackBtn" class="btn alt sm">${t('readBack')}</button>
   <button type="button" id="voiceRetryBtn" class="btn alt sm">${t('retry')}</button>
  </div>
 </div>`:`<div class="card"><h3>${t('previewTitle')}</h3><p class="mu" style="margin-top:6px">The extracted visit details will appear here as soon as you speak.</p></div>`}
 </div></div></div>`;
}

function Ben(){
 const q=filt.q.toLowerCase(),L=S.ben.filter(b=>!q||b.id.includes(q)||b.name.toLowerCase().includes(q));
 return`<div class="view"><div class="top"><h2>${t('ben')}</h2></div><input id="q" placeholder="${t('searchBen')}" value="${esc(filt.q)}" style="margin-bottom:12px">
 <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">${L.map(b=>`<div class="card"><div class="row sp"><b>${esc(b.name)}</b><span class="chip ${b.st=='Reviewed'?'':'w'}">${b.st}</span></div><div class="mu">ID ${b.id} · ${b.age}</div><div class="mu">${esc(b.hh)}</div><p style="margin:8px 0">${t('nextVisit')} <b>${fmt(b.next)}</b><br>${t('vaccDue')}: ${b.vacc}</p><button class="btn alt sm" data-act="prof" data-id="${b.id}">${t('historyBtn')}</button></div>`).join('')||'<p class="mu">No match.</p>'}</div></div>`;
}

function Reg(){
 const q=filt.q.toLowerCase(),L=S.visits.filter(v=>!q||v.b.includes(q)||v.id.toLowerCase().includes(q)).slice().reverse();
 return`<div class="view"><div class="top"><h2>${t('regTitle')}</h2><button class="btn sm" data-act="export">${t('exportCsv')}</button></div><input id="q" placeholder="${t('searchReg')}" value="${esc(filt.q)}" style="margin-bottom:12px"><div class="card tw"><table><thead><tr><th>${t('colVisit')}</th><th>${t('colId')}</th><th>${t('colDate')}</th><th>${t('colWeight')}</th><th>${t('colVacc')}</th><th>${t('colNext')}</th><th>${t('colStatus')}</th><th></th></tr></thead><tbody>${L.map(v=>`<tr><td>${v.id}${S.alerts.some(a=>a.v==v.id)?' <span class="chip d">Alert</span>':''}</td><td>${v.b}</td><td>${fmt(v.date)}</td><td>${v.w} kg</td><td>${esc(v.vacc)}</td><td>${fmt(v.next)}</td><td><span class="chip ${v.st=='Reviewed'?'':'w'}">${v.st}</span></td><td><button class="btn alt sm" data-act="vis" data-id="${v.id}">${t('colDetails')}</button></td></tr>`).join('')}</tbody></table></div></div>`;
}

function Fu(){
 const tKey=filt.fu,P=S.fu.filter(f=>f.st=='Pending'),m={Today:P.filter(f=>f.date==TODAY),Upcoming:P.filter(f=>f.date>TODAY),Overdue:P.filter(f=>f.date<TODAY),Completed:S.fu.filter(f=>f.st=='Completed')},L=m[tKey]||[];
 return`<div class="view"><div class="top"><h2>${t('fuTitle')}</h2></div><div class="tabs" role="tablist">${Object.keys(m).map(k=>`<button class="${k==tKey?'on':''}" data-act="tab" data-k="${k}">${k} (${m[k].length})</button>`).join('')}</div><div class="card"><div class="list">${L.map(f=>{const b=ben(f.b);return`<div class="row sp"><div><b>${esc(b.name)}</b><div class="mu">ID ${b.id} · ${fmt(f.date)} ${f.date<TODAY&&f.st=='Pending'?'<span class="chip d">Overdue</span>':''}</div></div>${f.st=='Pending'?`<div class="row"><button class="btn sm" data-act="done" data-id="${f.id}">${t('markDone')}</button><button class="btn alt sm" data-act="resch" data-id="${f.id}">${t('reschedule')}</button></div>`:'<span class="chip">Completed</span>'}</div>`}).join('')||'<p class="mu">No visits in this list.</p>'}</div></div></div>`;
}

function Alerts(){
 const A=S.alerts.slice().reverse(),act=A.filter(a=>!a.ack);
 return`<div class="view"><div class="top"><h2>${t('alertTitle')}</h2><button class="btn alt sm" data-act="tsnd">${t('testSound')}</button></div><p class="mu" style="margin-bottom:12px">${t('ruleNotice')}</p>
 ${act.map(a=>`<div class="alertbar" style="margin-bottom:12px"><h3>${a.sign}</h3><p>Visit ${a.v} · Beneficiary ${a.b} · Rule ${a.rule}</p><p style="margin:8px 0"><b>${t('referPhc')}</b></p><button class="btn red" data-act="ack" data-id="${a.id}">${t('seenAlert')}</button></div>`).join('')||'<div class="card"><p>No active danger alerts.</p></div>'}
 <h3 style="margin:16px 0 8px">${t('alertHist')}</h3><div class="card"><div class="list">${A.filter(a=>a.ack).map(a=>`<div class="row sp"><div><b>${a.sign}</b><div class="mu">Visit ${a.v} · ID ${a.b} · ${a.ts}</div></div><div>${a.ref?`<span class="chip">${t('refConfirmed')}</span>`:`<button class="btn alt sm" data-act="ref" data-id="${a.id}">${t('confirmRef')}</button>`}</div></div>`).join('')||'<p class="mu">Acknowledged alerts will be listed here.</p>'}</div></div></div>`;
}

function Rep(){
 const V=S.visits,P=S.fu.filter(f=>f.st=='Pending').length,D=S.fu.filter(f=>f.st=='Completed').length,Rv=V.filter(v=>v.st=='Reviewed').length;
 return`<div class="view"><div class="top"><h2>${t('repTitle')}</h2></div><div class="grid g4">${stat(V.length,t('repTotalVisits'))}${stat(D,t('repFuCompleted'))}${stat(P,t('repFuPending'))}${stat(new Set(V.map(v=>v.b)).size,t('repBenVisited'))}${stat(V.filter(v=>/month|MR|Penta|Td/i.test(v.vacc)).length,t('repVaccFu'))}${stat(S.alerts.filter(a=>a.ref).length,t('repRefConfirmed'))}${stat(Rv,t('repRecReviewed'))}${stat(V.length-Rv,t('repRecToReview'))}</div></div>`;
}

function Set(){
 const s=S.settings;
 return`<div class="view"><div class="top"><h2>${t('set')}</h2></div><div class="card grid">
 <label>${t('setName')}<input id="sn" value="${esc(s.name)}"></label>
 <label>${t('setLang')}<select id="sl">${LANGS.map(l=>`<option ${l==s.lang?'selected':''}>${l}</option>`).join('')}</select></label>
 <button class="btn gold sm" id="openDoorSetBtn" style="margin-top:4px">${svg('door')} Open Language Door</button>
 <div class="row" style="margin-top:8px"><button class="btn" data-act="saveset">${t('saveSet')}</button></div>
 </div><div class="card grid" style="margin-top:12px"><h3>${t('yourData')}</h3><button class="btn alt" data-act="export">${t('exportCsv')}</button><button class="btn red" data-act="wipe">${t('wipeAll')}</button></div></div>`;
}

const VIEWS={dash:Dash,voice:Voice,reg:Reg,ben:Ben,fu:Fu,alerts:Alerts,rep:Rep,set:Set};
let RT=location.hash.slice(1)||'dash';function route(){return RT}
function go(h){RT=h||'dash';try{history.replaceState(null,'','#'+RT)}catch(e){}filt.q='';window.scrollTo(0,0);render()}

function AppBar(){
 const n=S.alerts.filter(a=>!a.ack).length+overdue().length;
 return`<header class="bar"><a class="logo" href="index.html" aria-label="SwastiQ home">SwastiQ</a>
 <button class="door-pill" id="openDoorTopBtn" title="Change Language">${svg('door')} <span>${curLang()}</span></button>
 <span class="row" style="gap:6px"><span class="pill" id="cs"></span></span>
 <div class="row" style="gap:8px">
  <button class="ib" id="sndb" data-act="snd" aria-label="Alert sound">${svg('vol')}</button>
  <button class="ib" data-act="theme" aria-label="Switch theme">${svg('sun')}</button>
  <button class="ib" data-act="bell" aria-label="Notifications">${svg('bell')}${n?`<i class="bd">${n}</i>`:''}</button>
  <a class="ib" href="#set" aria-label="Settings">${svg('usr')}</a>
 </div></header>`;
}

function render(){
 const r=VIEWS[route()]?route():'dash';
 $('#main').innerHTML=AppBar()+VIEWS[r]();
 // Bind the voice preview controls directly after every render so they remain reliable after language changes.
 const confirmBtn=$('#voiceConfirmBtn');
 if(confirmBtn)confirmBtn.addEventListener('click',e=>{e.preventDefault();try{if(!vs.ex){toast('No visit details to save');return}commit()}catch(err){console.error('Voice save failed:',err);toast('Could not save. Check the patient name and beneficiary ID.')}});
 const readBtn=$('#voiceReadBackBtn');
 if(readBtn)readBtn.addEventListener('click',e=>{e.preventDefault();try{if(!vs.ex){toast('No visit details to read');return}const l=responseVoiceLanguage();speakText(recordLine(vs.ex,true,l),l)}catch(err){console.error('Read-back failed:',err);toast('Could not read the visit details')}});
 const retryBtn=$('#voiceRetryBtn');
 if(retryBtn)retryBtn.addEventListener('click',e=>{e.preventDefault();const keepLang=vs.lang;vs={st:'idle',tx:'',ex:null,log:[],lang:keepLang,detectedLang:null,showCorr:false,cf:'auto'};render()});
 paintStatus();
 const NAV=[['dash',t('dash'),'dash'],['voice',t('voice'),'mic'],['reg',t('reg'),'reg'],['ben',t('ben'),'ppl'],['fu',t('fu'),'fu'],['alerts',t('alerts'),'al'],['rep',t('rep'),'rep'],['set',t('set'),'set']];
 $('#sidelinks').innerHTML=NAV.map(([k,l,i])=>`<a class="sl ${k==r?'on':''}" href="#${k}">${svg(i)}${l}${k=='alerts'&&S.alerts.some(a=>!a.ack)?' <span class="chip d">!</span>':''}</a>`).join('');
 const BOT=['dash','reg','voice','fu','alerts'];
 $('#bot').innerHTML=BOT.map(k=>{const item=NAV.find(n=>n[0]==k);return`<a class="nb ${k=='voice'?'mic-fab':''} ${k==r?'on':''}" href="#${k}" aria-label="${item[1]}">${svg(item[2])}${k=='voice'?'':item[1]}</a>`}).join('');
}

addEventListener('hashchange',()=>{const h=location.hash.slice(1)||'dash';if(h!=RT){RT=h;window.scrollTo(0,0);filt.q='';render()}});

/* ==================== CINEMATIC DOOR LOGIC ==================== */
function openDoorModal(){
 const overlay=$('#doorOverlay');
 const leaf=$('#doorLeaf');
 const inside=$('#doorInside');
 overlay.classList.add('active');
 leaf.classList.remove('open');
 inside.classList.remove('revealed');
 
 const grid=$('#langGrid');
 grid.innerHTML=LANG_DEFS.map(l=>`
  <div class="lang-card ${l.id===curLang()?'active':''}" data-lang="${l.id}">
   <b>${l.native}</b>
   <span>${l.id}</span>
   <small>${l.greeting}</small>
  </div>
 `).join('');
}

function closeDoorModal(){
 $('#doorOverlay').classList.remove('active');
}

function selectLanguage(langName){
 if(!I18N[langName])return;
 S.settings.lang=langName;
 vs.lang=langName;
 localSave();
 toast(t('langSwitched')+langName);
 closeDoorModal();
 render();
 speakText(LANG_DEFS.find(l=>l.id===langName)?.greeting||'Welcome',langName);
}

document.addEventListener('click',e=>{
 if(e.target.closest('#openDoorTopBtn,#openDoorDashBtn,#openDoorVoiceBtn,#openDoorSetBtn')){
  openDoorModal();return;
 }
 if(e.target.closest('#closeDoorBtn')){
  closeDoorModal();return;
 }
 if(e.target.closest('#doorLeaf')){
  const leaf=$('#doorLeaf');
  leaf.classList.add('open');
  setTimeout(()=>{
   $('#doorInside').classList.add('revealed');
  },400);
  return;
 }
 const langCard=e.target.closest('.lang-card');
 if(langCard){
  selectLanguage(langCard.dataset.lang);
  return;
 }
 const stopBtn=e.target.closest('#stopRecBtn');
 if(stopBtn){
  stopMic();return;
 }
 
 const el=e.target.closest('[data-act],#mic');if(!el)return;
 const a=el.dataset.act||'mic',id=el.dataset.id;
 if(a=='mic'){vs.st=='listening'?stopMic():startMic('main');return}
 if(a=='done'){const f=S.fu.find(x=>x.id==id);if(f){f.st='Completed';save();toast('Completed');render()}}
 if(a=='confirm'){commit()}
 if(a=='speak'){if(vs.ex){const l=responseVoiceLanguage();speakText(recordLine(vs.ex,true,l),l)}}
 if(a=='retry'){vs={st:'idle',tx:'',ex:null,log:[],lang:vs.lang,detectedLang:null};render()}
 if(a=='mode'){if(vs.ex){vs.ex.mode=el.dataset.k;render()}}
 if(a=='tab'){filt.fu=el.dataset.k;render()}
 if(a=='ack'){const x=S.alerts.find(z=>z.id==id);if(x){x.ack=true;save();toast('Acknowledged');render()}}
 if(a=='ref'){const x=S.alerts.find(z=>z.id==id);if(x){x.ref=true;save();toast('Referral recorded');render()}}
 if(a=='theme'){const d=document.documentElement,n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;}
 if(a=='saveset'){S.settings.name=$('#sn').value||S.settings.name;S.settings.lang=$('#sl').value;save();toast('Settings saved');render()}
 if(a=='export'){
  const rows=['visit_id,beneficiary_id,date,type,weight_kg,vaccinations_due,next_visit,status',...S.visits.map(v=>[v.id,v.b,v.date,v.type,v.w,'"'+v.vacc+'"',v.next,v.st].join(','))];
  const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));l.download='swastiq-register.csv';l.click();toast('Register exported');
 }
 if(a=='wipe'){ask('Delete all data?','Restore default demo data?','Delete',()=>{S=seed();save();toast('Data reset');render()})}
 if(a=='say'){
  const k=el.dataset.k;vs.detectedLang=k;
  if(k==='Tamil'){vs.tx='பயனாளி 104 ஐ பார்வையிட்டேன். எடை 52 கிலோ. அடுத்த வருகை டிசம்பர் 12.';}
  else if(k==='Hindi'){vs.tx='लाभार्थी 103 का दौरा पूरा हुआ। वजन 10 किलोग्राम। अगली मुलाकात 9 दिसंबर।';}
  else{vs.tx='Visited beneficiary 102 today. Weight is 48 kilograms. Next visit on December 5.';}
  vs.st='transcribing';render();
  setTimeout(()=>{vs.st='understanding';render();setTimeout(finish,500)},400);
 }
});

document.addEventListener('change',e=>{
 if(e.target.id=='vlang'){
  const val=e.target.value;
  if(val!=='Auto Detect'){selectLanguage(val);}else{vs.lang=val;toast('Language: Auto Detect')}
 }
});

initCloud();
render();

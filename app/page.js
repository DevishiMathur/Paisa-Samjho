"use client";

import { useEffect, useRef, useState } from "react";

const TECH_TERMS = {
  nav: {
    icon: "🥭",
    term: "NAV",
    hi: {
      short: "निवेश के एक हिस्से की आज की कीमत",
      explain:
        "NAV यानी Net Asset Value। आसान भाषा में, यह बताता है कि किसी निवेश योजना की एक यूनिट की आज की कीमत कितनी है।",
      analogy:
        "सोचिए एक टोकरी में अलग-अलग चीज़ें रखी हैं। पूरी टोकरी की कीमत बदलती रहती है। NAV उस टोकरी के एक हिस्से की आज की कीमत जैसा है।",
    },
    en: {
      short: "Aaj ek unit ki keemat",
      explain:
        "NAV, or Net Asset Value, batata hai ki kisi investment scheme ki ek unit ki aaj ki value kitni hai.",
      analogy:
        "Socho ek basket mein alag-alag cheezein hain. Basket ki total value roz badal sakti hai. NAV us basket ke ek hissa ki aaj ki value jaisa hai.",
    },
  },

  volatility: {
    icon: "🌪️",
    term: "Volatility",
    hi: {
      short: "कीमत का तेज़ी से ऊपर-नीचे होना",
      explain:
        "Volatility का मतलब है कि किसी निवेश की कीमत कितनी तेज़ी से और कितनी बार ऊपर-नीचे हो रही है।",
      analogy:
        "सब्ज़ी मंडी में टमाटर की कीमत कभी ₹20 तो कभी ₹50 हो सकती है। यही तेज़ उतार-चढ़ाव volatility को समझने का आसान तरीका है।",
    },
    en: {
      short: "Price ka fast upar-neeche hona",
      explain:
        "Volatility ka matlab hai investment ki price ka kitni tezi se aur kitni baar upar-neeche hona.",
      analogy:
        "Sabzi mandi mein tamatar kabhi ₹20, kabhi ₹50 ho sakta hai. Yeh fast price change volatility ko samajhne ka simple example hai.",
    },
  },

  inflation: {
    icon: "🪣",
    term: "Inflation",
    hi: {
      short: "समय के साथ चीज़ों का महँगा होना",
      explain:
        "Inflation यानी महँगाई। समय के साथ चीज़ों की कीमत बढ़ने पर वही पैसा पहले जितनी चीज़ें नहीं खरीद पाता।",
      analogy:
        "आज ₹500 में जो राशन आता है, कुछ साल बाद उसी ₹500 में कम राशन मिल सकता है। पैसा गायब नहीं हुआ; उसकी खरीदने की ताकत कम हुई।",
    },
    en: {
      short: "Mehngai badhne se paisa kam cheezein kharidta hai",
      explain:
        "Inflation ka matlab hai time ke saath cheezein mehngi hona, jiski wajah se same paisa pehle jitni cheezein nahi kharid pata.",
      analogy:
        "Aaj ₹500 mein jo ration aata hai, kuch saal baad same ₹500 mein kam ration mil sakta hai.",
    },
  },

  diversify: {
    icon: "🌱",
    term: "Diversification",
    hi: {
      short: "पैसा अलग-अलग जगह बाँटना",
      explain:
        "Diversification का मतलब है अपना सारा पैसा एक ही जगह न लगाकर अलग-अलग जगह बाँटना, ताकि एक जगह की समस्या का असर कम हो सके।",
      analogy:
        "सिर्फ़ एक फसल उगाने पर वही फसल खराब हुई तो पूरा नुकसान हो सकता है। अलग-अलग फसलें रखने से एक समस्या का असर कम हो सकता है।",
    },
    en: {
      short: "Paisa alag-alag jagah rakhna",
      explain:
        "Diversification ka matlab hai saara paisa ek hi jagah na rakhkar alag-alag jagah baantna, taaki ek jagah ki problem ka asar kam ho.",
      analogy:
        "Sirf aloo ugaya aur fasal kharab ho gayi toh poora nuksan ho sakta hai. Aloo, gehun aur sarson alag rakhne se risk baant sakte hain.",
    },
  },
};

/* =========================================================
   FIXED QUESTIONS + FIXED ANSWERS
   English = Hinglish
   Hindi = Proper Hindi
========================================================= */

const FIXED_QUESTIONS = {
  Hindi: [
    {
      question: "NAV क्या होता है?",
      answer:
        "NAV यानी Net Asset Value। आसान भाषा में, यह बताता है कि किसी निवेश योजना की एक यूनिट की आज की कीमत कितनी है।",
    },
    {
      question: "महँगाई क्या होती है?",
      answer:
        "महँगाई यानी Inflation। समय के साथ जब चीज़ों की कीमत बढ़ती है, तो उसी पैसे से पहले की तुलना में कम चीज़ें खरीदी जा सकती हैं।",
    },
    {
      question: "म्यूचुअल फंड क्या होता है?",
      answer:
        "म्यूचुअल फंड में बहुत सारे लोगों का पैसा एक साथ जमा किया जाता है और उसे अलग-अलग निवेशों में लगाया जाता है। इसका प्रबंधन एक विशेषज्ञ फंड मैनेजर करता है।",
    },
    {
      question: "SIP क्या होता है?",
      answer:
        "SIP यानी Systematic Investment Plan। इसमें आप एक तय रकम को नियमित अंतराल पर, जैसे हर महीने, निवेश करते हैं।",
    },
    {
      question: "पैसा अलग-अलग जगह क्यों रखना चाहिए?",
      answer:
        "इसे Diversification कहते हैं। सारा पैसा एक ही जगह रखने के बजाय अलग-अलग जगह रखने से किसी एक निवेश में नुकसान होने पर पूरे पैसे पर उसका असर कम हो सकता है।",
    },
    {
      question: "Nominee क्या होता है?",
      answer:
        "Nominee वह व्यक्ति होता है जिसे किसी निवेश या खाते में आपके बाद पैसा प्राप्त करने के लिए नामित किया जाता है। Nominee और अंतिम कानूनी मालिक हमेशा एक ही व्यक्ति हों, यह ज़रूरी नहीं है।",
    },
    {
      question: "UPI में सुरक्षित कैसे रहें?",
      answer:
        "UPI PIN और OTP कभी भी किसी के साथ साझा न करें। पैसा प्राप्त करने के लिए आमतौर पर UPI PIN डालने की जरूरत नहीं होती। किसी अनजान व्यक्ति के कहने पर QR कोड स्कैन या भुगतान न करें।",
    },
    {
      question: "Volatility क्या होती है?",
      answer:
        "Volatility का मतलब है किसी निवेश की कीमत का तेज़ी से ऊपर-नीचे होना। जितना अधिक उतार-चढ़ाव होगा, कीमत में बदलाव उतना ही अधिक हो सकता है।",
    },
    {
      question: "बचत क्यों ज़रूरी है?",
      answer:
        "बचत इसलिए ज़रूरी है ताकि अचानक आने वाले खर्चों के समय आपके पास पैसे उपलब्ध रहें। नियमित बचत भविष्य के लक्ष्यों के लिए भी मदद करती है।",
    },
    {
      question: "स्कैम से कैसे बचें?",
      answer:
        "जल्दी फैसला लेने का दबाव हो तो रुकें और जानकारी जाँचें। OTP, UPI PIN और पासवर्ड किसी को न दें। अनजान लिंक पर क्लिक न करें और पैसे भेजने से पहले व्यक्ति और खाते की जानकारी सत्यापित करें।",
    },
  ],

  English: [
    {
      question: "NAV kya hota hai?",
      answer:
        "NAV, yaani Net Asset Value, batata hai ki kisi investment scheme ki ek unit ki aaj ki value kitni hai. Simple words mein, ek unit ki current price samajh lo.",
    },
    {
      question: "Inflation kya hota hai?",
      answer:
        "Inflation ka matlab hai time ke saath cheezein mehngi hona. Iska matlab hai ki same paisa future mein pehle se kam cheezein kharid sakta hai.",
    },
    {
      question: "Mutual fund kya hota hai?",
      answer:
        "Mutual fund mein bahut saare logon ka paisa ek saath pool kiya jata hai aur alag-alag investments mein lagaya jata hai. Isko ek professional fund manager manage karta hai.",
    },
    {
      question: "SIP kya hota hai?",
      answer:
        "SIP, yaani Systematic Investment Plan, mein aap ek fixed amount ko regular interval par, jaise har month, invest karte ho. Isse regular investing ki habit ban sakti hai.",
    },
    {
      question: "Paisa alag-alag jagah kyun rakhna chahiye?",
      answer:
        "Isse Diversification kehte hain. Saara paisa ek hi jagah rakhne ke bajay alag-alag jagah rakhne se ek investment mein problem hone par poore paisa par impact kam ho sakta hai.",
    },
    {
      question: "Nominee kya hota hai?",
      answer:
        "Nominee woh person hota hai jise kisi investment ya account mein aapke baad paisa receive karne ke liye nominate kiya jata hai. Nominee aur final legal owner hamesha same person ho, zaroori nahi hai.",
    },
    {
      question: "UPI mein safe kaise rahein?",
      answer:
        "UPI PIN aur OTP kabhi bhi kisi ke saath share mat karo. Paisa receive karne ke liye normally UPI PIN ki zaroorat nahi hoti. Kisi unknown person ke kehne par QR code scan ya payment mat karo.",
    },
    {
      question: "Volatility kya hoti hai?",
      answer:
        "Volatility ka matlab hai investment ki price ka fast upar-neeche hona. Jitni zyada volatility, utna zyada price movement ho sakta hai.",
    },
    {
      question: "Saving kyun zaroori hai?",
      answer:
        "Saving isliye important hai taaki sudden expenses ke time aapke paas paisa available ho. Regular saving future goals ke liye bhi help karti hai.",
    },
    {
      question: "Scam se kaise bachein?",
      answer:
        "Agar koi jaldi decision lene ka pressure de raha hai toh ruk jao aur information verify karo. OTP, UPI PIN aur password kabhi share mat karo. Unknown links par click mat karo aur paisa bhejne se pehle details verify karo.",
    },
  ],
};

const UI = {
  Hindi: {
    home: "होम",
    playNav: "🎮 खेलकर सीखें",
    scam: "🛡️ स्कैम अभ्यास",
    ask: "🎙️ सवाल पूछें",
    heroEyebrow: "पैसा • अपनी भाषा • अपने तरीके से",
    heroTitle: "पैसा समझो।",
    heroTitle2: "फैसला खुद करो।",
    heroText:
      "पैसे की मुश्किल बातें सिर्फ़ परिभाषाओं से नहीं। अपनी ज़िंदगी की कहानियों और खेलों से समझो।",
    speakAsk: "बोलकर पूछें",
    listening: "सुन रहा हूँ...",
    aiGuide: "हिंदी • तय जवाब",
    scary: "डराने वाले शब्द आसान करो",
    financeLife: "“फाइनेंस” नहीं। रोज़ की ज़िंदगी।",
    clickExplain: "टेक्निकल शब्द पर टैप करें और आसान मतलब सुनें।",
    decide: "फैसला करो • बदलाव देखो",
    playSee: "सिर्फ़ पढ़ना नहीं। खेलकर देखो।",
    marketText: "बाज़ार गिरा। अब आप क्या करेंगे?",
    inflationText: "₹1,000 से 5 साल बाद क्या मिलेगा?",
    familyText: "कल दुकान किसके हाथ होगी?",
    scamText: "ठग की कहानी में सही फैसला करो।",
    volatility: "Volatility",
    inflation: "Inflation",
    nomination: "Nomination",
    realPractice: "असली ज़िंदगी का अभ्यास",
    question: "सवाल पूछें",
    guideTitle: "सवाल चुनें।",
    guideTitle2: "आसान जवाब पाएँ।",
    guideText:
      "नीचे दिए गए 10 सवालों में से किसी पर टैप करें। आपको तुरंत आसान जवाब मिलेगा।",
    typeHere: "या यहाँ लिखें...",
    ask: "पूछें →",
    navQ: "NAV क्या होता है?",
    inflationQ: "महँगाई आसान भाषा में समझाओ",
    diversifyQ: "पैसा अलग-अलग जगह क्यों रखते हैं?",
    nomineeQ: "Nominee क्या होता है?",
    back: "← वापस",
    play: "खेलें →",
    restart: "डेमो फिर से शुरू करें ↻",
  },

  English: {
    home: "Home",
    playNav: "🎮 Khelkar Sikho",
    scam: "🛡️ Scam Practice",
    ask: "🎙️ Sawaal Poocho",
    heroEyebrow: "FINANCE • APNI BHASHA • APNE TAREEKE SE",
    heroTitle: "Paisa samjho.",
    heroTitle2: "Faisla khud karo.",
    heroText:
      "Finance ki mushkil baatein sirf definitions se nahi. Apni zindagi ki kahaniyon aur games se samjho.",
    speakAsk: "Bol kar poochho",
    listening: "Sun raha hoon...",
    aiGuide: "Hinglish • Fixed answers",
    scary: "SCARY WORDS KO SIMPLE KARO",
    financeLife: "“Finance” nahi. Roz ki zindagi.",
    clickExplain: "Technical term par tap karo aur simple meaning suno.",
    decide: "DECIDE • CHANGE • SEE",
    playSee: "Sirf padhna nahi. Khel ke dekho.",
    marketText: "Bazaar gira. Ab aap kya karoge?",
    inflationText: "₹1,000 se 5 saal baad kya milega?",
    familyText: "Kal dukaan kiske haath hogi?",
    scamText: "Thag ki story mein sahi decision karo.",
    volatility: "Volatility",
    inflation: "Inflation",
    nomination: "Nomination",
    realPractice: "Real-life practice",
    question: "FIXED FINANCIAL GUIDE",
    guideTitle: "Sawaal choose karo.",
    guideTitle2: "Simple answer pao.",
    guideText:
      "Neeche diye gaye 10 questions mein se kisi par click karo. Turant simple Hinglish answer milega.",
    typeHere: "Ya yahan type karo...",
    ask: "Poocho →",
    navQ: "NAV kya hota hai?",
    inflationQ: "Mehngai simple mein samjhao",
    diversifyQ: "Paisa alag jagah kyun rakhte hain?",
    nomineeQ: "Nominee kya hota hai?",
    back: "← Back",
    play: "Play →",
    restart: "Restart demo ↻",
  },
};

const EVENTS = [
  {
    title: { hi: "🌧️ अचानक बारिश", en: "🌧️ Achanak baarish" },
    text: {
      hi: "सब्ज़ियों की सप्लाई कम हो गई। बाज़ार हिल गया।",
      en: "Sabzi ki supply kam ho gayi. Bazaar hil gaya.",
    },
    holdImpact: -150,
    sellImpact: -900,
    next: {
      hi: "आपने रुकने का फैसला किया। कुछ महीनों बाद सप्लाई सामान्य हो सकती है।",
      en: "Aapne rukne ka faisla kiya. Kuch mahine baad supply normal ho sakti hai.",
    },
  },
  {
    title: { hi: "📉 बाज़ार में गिरावट", en: "📉 Bazaar mein girawat" },
    text: {
      hi: "आपकी टोकरी की कीमत अचानक नीचे आ गई।",
      en: "Aapki basket ki keemat achanak neeche aa gayi.",
    },
    holdImpact: -250,
    sellImpact: -1100,
    next: {
      hi: "सिम्युलेशन में अगला महीना रिकवरी ला सकता है।",
      en: "Simulation mein agla mahina recovery la sakta hai.",
    },
  },
  {
    title: { hi: "☀️ अच्छी फसल", en: "☀️ Achhi fasal" },
    text: {
      hi: "सप्लाई सामान्य हुई और बाज़ार में दाम संभल गए।",
      en: "Supply normal hui aur bazaar mein daam sambhal gaye.",
    },
    holdImpact: 1100,
    sellImpact: -300,
    next: {
      hi: "आपने होल्ड किया तो रिकवरी का फायदा मिला। जल्दी बेचने पर रिकवरी छूट गई।",
      en: "Aapne hold kiya toh recovery ka fayda mila. Jaldi bechne par recovery miss hui.",
    },
  },
  {
    title: { hi: "🏪 दुकान का अच्छा महीना", en: "🏪 Dukaan ka achha mahina" },
    text: {
      hi: "किराना दुकान की बिक्री बढ़ गई।",
      en: "Kirana sales badh gayi.",
    },
    holdImpact: 850,
    sellImpact: -200,
    next: {
      hi: "आपकी टोकरी में दुकान का हिस्सा बढ़ा, इसलिए नतीजा भी बदला।",
      en: "Aapki basket mein dukaan ka hissa badha, isliye outcome bhi badla.",
    },
  },
];

export default function Home() {
  const [tab, setTab] = useState("home");
  const [language, setLanguage] = useState("Hindi");
  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const [money, setMoney] = useState(10000);
  const [allocation, setAllocation] = useState({
    gold: 2500,
    food: 2500,
    shop: 2500,
    cash: 2500,
  });
  const [event, setEvent] = useState(null);
  const [decision, setDecision] = useState(null);
  const [round, setRound] = useState(0);

  const [inflationYear, setInflationYear] = useState(0);
  const [inflationChoice, setInflationChoice] = useState(null);

  const [nominee, setNominee] = useState(null);
  const [scamData, setScamData] = useState(null);
  const [scamStep, setScamStep] = useState(0);
  const [scamScore, setScamScore] = useState(0);
  const [scamChoice, setScamChoice] = useState(null);
  const [scamStarted, setScamStarted] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [termModal, setTermModal] = useState(null);
  const [audioState, setAudioState] = useState("idle");

  const audioTextRef = useRef("");
  const audioLangRef = useRef("hi-IN");
  const speechRequestRef = useRef(0);
  const speechTimerRef = useRef(null);
  const recognitionRef = useRef(null);
  const recognitionActiveRef = useRef(false);

  const ui = UI[language];
  const speechLang = language === "Hindi" ? "hi-IN" : "en-IN";

  function stopSpeech() {
    if (typeof window === "undefined") return;
    speechRequestRef.current += 1;
    window.clearTimeout(speechTimerRef.current);
    window.speechSynthesis?.cancel();
    setAudioState("idle");
  }

  function playSpeech(text, lang = speechLang) {
    if (typeof window === "undefined" || !text?.trim()) return;

    const synth = window.speechSynthesis;
    const requestId = speechRequestRef.current + 1;
    speechRequestRef.current = requestId;
    window.clearTimeout(speechTimerRef.current);
    synth?.cancel();

    audioTextRef.current = text;
    audioLangRef.current = lang;

    speakWithBrowserVoice(text, lang, requestId);
  }

  function speakWithBrowserVoice(text, lang, requestId) {
    if (
      typeof window.SpeechSynthesisUtterance !== "function" ||
      !window.speechSynthesis
    ) return;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const languagePrefix = lang.split("-")[0].toLowerCase();
    const matchingVoice =
      voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase()) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith(`${languagePrefix}-`));
    const hindiVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("hi-"));
    const englishVoice =
      voices.find((voice) => voice.lang.toLowerCase() === "en-in") ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en-"));
    const isHindiText = /[\u0900-\u097f]/.test(text);
    const selectedVoice = isHindiText ? hindiVoice : matchingVoice || englishVoice;
    const u = new window.SpeechSynthesisUtterance(text);

    // Keep the original Devanagari text and let the browser resolve hi-IN
    // when its voice list is still loading or has no exact Hindi match.
    u.lang = selectedVoice?.lang || lang;
    if (selectedVoice) u.voice = selectedVoice;
    u.rate = 0.88;
    u.onstart = () => {
      if (speechRequestRef.current === requestId) setAudioState("playing");
    };
    u.onend = () => {
      if (speechRequestRef.current === requestId) setAudioState("idle");
    };
    u.onerror = () => {
      if (speechRequestRef.current === requestId) setAudioState("idle");
    };

    // Chromium can drop utterances queued in the same tick as cancel().
    speechTimerRef.current = window.setTimeout(() => {
      if (speechRequestRef.current !== requestId) return;
      synth.speak(u);
    }, 100);
  }

  function pauseSpeech() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (
      window.speechSynthesis.speaking &&
      !window.speechSynthesis.paused
    ) {
      window.speechSynthesis.pause();
      setAudioState("paused");
    }
  }

  function resumeSpeech() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setAudioState("playing");
    }
  }

  function repeatSpeech() {
    if (audioTextRef.current) {
      playSpeech(audioTextRef.current, audioLangRef.current);
    }
  }

  useEffect(() => {
    fetch("/content/sangyan_content.json")
      .then((r) => r.json())
      .then(setScamData)
      .catch(() => setScamData(null));
  }, []);

  /* Stop audio when language changes */
  useEffect(() => {
    stopSpeech();
    setTermModal(null);
    setAnswer("");
  }, [language]);

  /* =========================================================
     VOICE RECOGNITION
  ========================================================= */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }

    const r = new SpeechRecognition();

    r.lang = language === "Hindi" ? "hi-IN" : "en-IN";
    r.interimResults = false;
    r.continuous = false;

    r.onstart = () => {
      recognitionActiveRef.current = true;
      setListening(true);
    };

    r.onresult = (e) => {
      const text = e.results?.[0]?.[0]?.transcript || "";

      recognitionActiveRef.current = false;
      setListening(false);

      if (text.trim()) {
        setQuestion(text);
        askQuestion(text);
      }
    };

    r.onerror = () => {
      recognitionActiveRef.current = false;
      setListening(false);
    };

    r.onend = () => {
      recognitionActiveRef.current = false;
      setListening(false);
    };

    recognitionRef.current = r;

    return () => {
      try {
        r.stop();
      } catch {}

      recognitionActiveRef.current = false;
      setListening(false);
    };
  }, [language]);

  /* =========================================================
     FIXED QUESTION ANSWER
  ========================================================= */

  function askQuestion(text = question) {
    if (!text || !text.trim()) return;

    setChatLoading(true);
    setAnswer("");

    const currentQuestions = FIXED_QUESTIONS[language];

    const typed = text.toLowerCase().trim();

    let found = currentQuestions.find((item) => {
      const q = item.question.toLowerCase();

      return (
        typed === q ||
        typed.includes(q.replace("?", "")) ||
        q.includes(typed)
      );
    });

    /* Extra keyword matching for typed / spoken questions */
    if (!found) {
      const keywords = [
        ["nav", 0],
        ["एनएवी", 0],

        ["inflation", 1],
        ["महंगाई", 1],
        ["महँगाई", 1],
        ["mehngai", 1],

        ["mutual fund", 2],
        ["म्यूचुअल फंड", 2],

        ["sip", 3],
        ["एसआईपी", 3],

        ["diversification", 4],
        ["diversify", 4],
        ["अलग-अलग", 4],

        ["nominee", 5],
        ["nomination", 5],
        ["नॉमिनी", 5],

        ["upi", 6],
        ["यूपीआई", 6],
        ["otp", 6],

        ["volatility", 7],
        ["उतार-चढ़ाव", 7],

        ["saving", 8],
        ["savings", 8],
        ["बचत", 8],

        ["scam", 9],
        ["fraud", 9],
        ["ठगी", 9],
        ["स्कैम", 9],
        ["फ्रॉड", 9],
      ];

      const match = keywords.find(([keyword]) =>
        typed.includes(keyword)
      );

      if (match) {
        found = currentQuestions[match[1]];
      }
    }

    setTimeout(() => {
      const finalAnswer =
        found?.answer ||
        (language === "Hindi"
          ? "अभी मैं इन 10 सवालों के तय जवाब दे सकता हूँ। नीचे दिए गए किसी सवाल पर टैप करके जवाब देखें।"
          : "Abhi main in 10 fixed questions ke answers de sakta hoon. Neeche kisi bhi question par click karke answer dekho.");

      setAnswer(finalAnswer);
      playSpeech(finalAnswer, speechLang);
      setChatLoading(false);
    }, 250);
  }

  /* =========================================================
     MICROPHONE
  ========================================================= */

  function mic() {
    if (!recognitionRef.current) {
      const fallback = window.prompt(
        language === "Hindi"
          ? "इस ब्राउज़र में आवाज़ की सुविधा उपलब्ध नहीं है। अपना सवाल लिखें:"
          : "Voice recognition is not available. Type your question:"
      );

      if (fallback?.trim()) {
        setQuestion(fallback);
        askQuestion(fallback);
      }

      return;
    }

    if (recognitionActiveRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}

      return;
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      recognitionActiveRef.current = false;
      setListening(false);

      if (error?.name !== "InvalidStateError") {
        console.error(error);
      }
    }
  }

  function explain(topic) {
    setTermModal(topic);
    stopSpeech();
  }

  function startStorm() {
    setTab("storm");
    setEvent(null);
    setDecision(null);
    setRound((r) => r + 1);
  }

  function triggerStorm() {
    const e = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    setEvent(e);
    setDecision(null);
  }

  function stormDecision(type) {
    if (!event) return;

    const change =
      type === "sell" ? event.sellImpact : event.holdImpact;

    setMoney((m) => Math.max(0, m + change));
    setDecision(type);
  }

  const purchasingPower = Math.round(
    1000 * Math.pow(0.95, inflationYear)
  );

  function startScam() {
    setTab("scam");
    setScamStep(0);
    setScamScore(0);
    setScamChoice(null);
    setScamStarted(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizChoice(null);
  }

  function chooseScam(option) {
    setScamChoice(option);
    setScamScore((s) => s + (option.safe ? 1 : 0));
  }

  function nextScamStep() {
    if (!scamData) return;

    if (scamStep < scamData.steps.length - 1) {
      setScamStep((s) => s + 1);
      setScamChoice(null);
    } else {
      setScamStep(scamData.steps.length);
      setScamChoice(null);
    }
  }

  function answerQuiz(i) {
    if (quizChoice !== null) return;

    setQuizChoice(i);

    if (
      scamData?.recapQuiz?.[quizIndex]?.correct === i
    ) {
      setQuizScore((s) => s + 1);
    }
  }

  function nextQuiz() {
    if (
      quizIndex <
      (scamData?.recapQuiz?.length || 1) - 1
    ) {
      setQuizIndex((i) => i + 1);
      setQuizChoice(null);
    } else {
      setQuizIndex(
        scamData?.recapQuiz?.length || 1
      );
      setQuizChoice(null);
    }
  }

  function resetAll() {
    setTab("home");
    setMoney(10000);
    setAllocation({
      gold: 2500,
      food: 2500,
      shop: 2500,
      cash: 2500,
    });
    setEvent(null);
    setDecision(null);
    setRound(0);
    setInflationYear(0);
    setInflationChoice(null);
    setNominee(null);
    setScamStep(0);
    setScamScore(0);
    setScamChoice(null);
    setScamStarted(false);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizChoice(null);
    setQuestion("");
    setAnswer("");
  }

  return (
    <main>
      <nav className="nav">
        <button className="brand" onClick={resetAll}>
          <span className="brandIcon">₹</span>
          <span>
            <b>Paisa</b> Samjho
          </span>
        </button>

        <div className="navLinks">
          <button
            className={tab === "home" ? "active" : ""}
            onClick={() => setTab("home")}
          >
            {ui.home}
          </button>

          <button
            className={tab === "storm" ? "active" : ""}
            onClick={() => setTab("storm")}
          >
            {ui.playNav}
          </button>

          <button
            className={tab === "scam" ? "active" : ""}
            onClick={startScam}
          >
            {ui.scam}
          </button>

          <button
            className={tab === "ask" ? "active" : ""}
            onClick={() => setTab("ask")}
          >
            {ui.ask}
          </button>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label="Language"
        >
          <option>Hindi</option>
          <option>English</option>
        </select>
      </nav>

      {/* =====================================================
          HOME
      ===================================================== */}

      {tab === "home" && (
        <>
          <section className="hero">
            <div className="heroText">
              <div className="eyebrow">
                {ui.heroEyebrow}
              </div>

              <h1>
                {ui.heroTitle}
                <br />
                <span>{ui.heroTitle2}</span>
              </h1>

              <p>{ui.heroText}</p>

              <button
                className={
                  "micHero " +
                  (listening ? "listening" : "")
                }
                onClick={mic}
              >
                <span className="micCircle">🎙️</span>
                <span>
                  {listening
                    ? ui.listening
                    : ui.speakAsk}
                </span>
                <small>{ui.aiGuide}</small>
              </button>

              {question && (
                <div className="speechBubble">
                  <b>
                    {language === "Hindi"
                      ? "आप:"
                      : "Aap:"}
                  </b>{" "}
                  {question}
                </div>
              )}

              {answer && (
                <AudioBubble
                  text={answer}
                  language={language}
                  audioState={audioState}
                  onPlay={() =>
                    playSpeech(
                      answer,
                      speechLang
                    )
                  }
                  onPause={pauseSpeech}
                  onResume={resumeSpeech}
                  onRepeat={repeatSpeech}
                  onStop={stopSpeech}
                />
              )}
            </div>

            <div className="heroVisual">
              <div className="sun"></div>

              <div className="cardStack">
                <div className="moneyCard back">₹</div>

                <div className="moneyCard front">
                  <span>₹</span>
                  <b>
                    Samajh ke
                    <br />
                    invest karo
                  </b>
                  <small>
                    Ek decision. Ek nateeja.
                  </small>
                </div>
              </div>

              <div className="floating f1">
                🌾 Fasal
              </div>
              <div className="floating f2">
                🏪 Dukaan
              </div>
              <div className="floating f3">
                🪙 Bachat
              </div>
            </div>
          </section>

          <section className="section">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">
                  {ui.scary}
                </span>

                <h2>{ui.financeLife}</h2>

                <p className="sectionHint">
                  {ui.clickExplain}
                </p>
              </div>
            </div>

            <div className="topicGrid">
              {Object.entries(TECH_TERMS).map(
                ([key, term]) => (
                  <button
                    className="topicCard"
                    key={key}
                    onClick={() => explain(key)}
                  >
                    <div className="topicIcon">
                      {term.icon}
                    </div>

                    <div>
                      <b>{term.term}</b>
                      <small>
                        {
                          term[
                            language === "Hindi"
                              ? "hi"
                              : "en"
                          ].short
                        }
                      </small>
                    </div>

                    <span>→</span>
                  </button>
                )
              )}
            </div>
          </section>

          <section className="section gameSection">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">
                  {ui.decide}
                </span>
                <h2>{ui.playSee}</h2>
              </div>
            </div>

            <div className="gameGrid">
              <GameCard
                icon="🌪️"
                title="Market Storm"
                text={ui.marketText}
                tag={ui.volatility}
                onClick={startStorm}
              />

              <GameCard
                icon="🪣"
                title="Leaky Bucket"
                text={ui.inflationText}
                tag={ui.inflation}
                onClick={() => setTab("inflation")}
              />

              <GameCard
                icon="🛡️"
                title="Family Shield"
                text={ui.familyText}
                tag={ui.nomination}
                onClick={() => setTab("nomination")}
              />

              <GameCard
                icon="📱"
                title="Scam Dojo"
                text={ui.scamText}
                tag={ui.realPractice}
                onClick={startScam}
              />
            </div>
          </section>
        </>
      )}

      {/* =====================================================
          MARKET STORM
      ===================================================== */}

      {tab === "storm" && (
        <section className="simWrap">
          <SimHeader
            icon="🌪️"
            title={
              language === "Hindi"
                ? "मार्केट स्टॉर्म"
                : "Market Storm"
            }
            sub={
              language === "Hindi"
                ? "बाज़ार बदला। अब आपका फैसला क्या है?"
                : "Bazaar badla. Ab aapka decision kya hai?"
            }
            onBack={() => setTab("home")}
            backText={ui.back}
          />

          <div className="simGrid">
            <div className="simCard">
              <span className="eyebrow">
                {language === "Hindi"
                  ? "आपकी टोकरी"
                  : "AAPKI BASKET"}
              </span>

              <h2>
                ₹{money.toLocaleString("en-IN")}
              </h2>

              <div className="basket">
                {Object.entries({
                  gold: "🪙 Gold",
                  food: "🌾 Anaaj",
                  shop: "🏪 Kirana",
                  cash: "💵 Cash",
                }).map(([k, v]) => (
                  <div
                    className="basketRow"
                    key={k}
                  >
                    <span>{v}</span>
                    <b>
                      ₹
                      {allocation[k].toLocaleString(
                        "en-IN"
                      )}
                    </b>
                  </div>
                ))}
              </div>

              <p className="hint">
                {language === "Hindi"
                  ? "डेमो में हर टोकरी अलग जोखिम दिखाती है। असली ज़िंदगी में रिटर्न की गारंटी नहीं होती।"
                  : "Demo mein har basket alag risk dikhati hai. Real life mein returns guaranteed nahi hote."}
              </p>

              {!event && (
                <button
                  className="primary full"
                  onClick={triggerStorm}
                >
                  ⚡{" "}
                  {language === "Hindi"
                    ? "स्थिति बदलें"
                    : "Situation badlo"}
                </button>
              )}

              {event && !decision && (
                <div className="eventBox">
                  <div className="eventTitle">
                    {
                      event.title[
                        language === "Hindi"
                          ? "hi"
                          : "en"
                      ]
                    }
                  </div>

                  <p>
                    {
                      event.text[
                        language === "Hindi"
                          ? "hi"
                          : "en"
                      ]
                    }
                  </p>

                  <div className="choiceGrid">
                    <button
                      className="danger"
                      onClick={() =>
                        stormDecision("sell")
                      }
                    >
                      😰{" "}
                      {language === "Hindi"
                        ? "घबराकर बेचें"
                        : "Panic & Sell"}
                    </button>

                    <button
                      className="success"
                      onClick={() =>
                        stormDecision("hold")
                      }
                    >
                      🧘{" "}
                      {language === "Hindi"
                        ? "होल्ड करें"
                        : "Hold"}
                    </button>
                  </div>
                </div>
              )}

              {decision && (
                <Outcome
                  decision={decision}
                  money={money}
                  event={event}
                  onAgain={triggerStorm}
                  language={language}
                />
              )}
            </div>

            <div className="storyCard">
              <div className="bigEmoji">
                {event
                  ? (
                      language === "Hindi"
                        ? event.title.hi
                        : event.title.en
                    ).split(" ")[0]
                  : "🌱"}
              </div>

              <h2>
                {event
                  ? language === "Hindi"
                    ? "अब क्या होगा?"
                    : "Ab kya hoga?"
                  : language === "Hindi"
                  ? "अपना फैसला करें।"
                  : "Apna faisla karo."}
              </h2>

              <p>
                {event
                  ? language === "Hindi"
                    ? "आपका फैसला अगला नतीजा बदलेगा। फिर एक नई स्थिति आ सकती है।"
                    : "Aapka reaction agla outcome badlega. Phir ek aur situation aa sakti hai."
                  : language === "Hindi"
                  ? "बटन दबाएँ और बाज़ार को बदलते देखें।"
                  : "Button dabao. Bazaar ko badalte dekho."}
              </p>

              <div className="timeline">
                <span className="done">
                  1.{" "}
                  {language === "Hindi"
                    ? "टोकरी"
                    : "Basket"}
                </span>

                <span className={event ? "done" : ""}>
                  2.{" "}
                  {language === "Hindi"
                    ? "घटना"
                    : "Event"}
                </span>

                <span
                  className={
                    decision ? "done" : ""
                  }
                >
                  3.{" "}
                  {language === "Hindi"
                    ? "फैसला"
                    : "Decision"}
                </span>

                <span>
                  4.{" "}
                  {language === "Hindi"
                    ? "नतीजा"
                    : "Outcome"}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          SCAM
      ===================================================== */}

      {tab === "scam" && (
        <section className="simWrap">
          <SimHeader
            icon="📱"
            title={
              language === "Hindi"
                ? "स्कैम अभ्यास केंद्र"
                : "Scam Rehearsal Dojo"
            }
            sub={
              language === "Hindi"
                ? "कहानी आगे बढ़ेगी। हर फैसला अगला कदम बदलेगा।"
                : "The story changes with every decision."
            }
            onBack={() => setTab("home")}
          />

          {!scamData ? (
            <div className="simCard">
              <h2>Loading...</h2>
            </div>
          ) : scamStep < scamData.steps.length ? (
            (() => {
              const step =
                scamData.steps[scamStep];

              return (
                <div className="scamLayout">
                  <div className="scamPhone">
                    <div className="phoneTop">
                      <span>●</span> WhatsApp • Rohit
                      Sir
                    </div>

                    <div className="sceneText">
                      {
                        step.scene[
                          language === "Hindi"
                            ? "hi"
                            : "en"
                        ]
                      }
                    </div>

                    <div className="messageBubble">
                      <b>Rohit Sir</b>

                      <p>
                        {
                          step.advisorMessage[
                            language === "Hindi"
                              ? "hi"
                              : "en"
                          ]
                        }
                      </p>
                    </div>

                    <div className="progressDots">
                      {scamData.steps.map(
                        (_, i) => (
                          <span
                            key={i}
                            className={
                              i <= scamStep
                                ? "on"
                                : ""
                            }
                          ></span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="decisionPanel">
                    <span className="eyebrow">
                      {language === "Hindi"
                        ? `स्थिति ${
                            scamStep + 1
                          } / ${
                            scamData.steps.length
                          }`
                        : `SITUATION ${
                            scamStep + 1
                          } / ${
                            scamData.steps.length
                          }`}
                    </span>

                    <h2>
                      {language === "Hindi"
                        ? "आप क्या करेंगे?"
                        : "What will you do?"}
                    </h2>

                    <div className="decisionList">
                      {step.options.map(
                        (option) => (
                          <button
                            key={option.id}
                            disabled={
                              scamChoice !== null
                            }
                            className={
                              scamChoice?.id ===
                              option.id
                                ? option.safe
                                  ? "pickedSafe"
                                  : "pickedRisk"
                                : ""
                            }
                            onClick={() =>
                              chooseScam(option)
                            }
                          >
                            {
                              option.text[
                                language === "Hindi"
                                  ? "hi"
                                  : "en"
                              ]
                            }
                          </button>
                        )
                      )}
                    </div>

                    {scamChoice && (
                      <div
                        className={
                          "choiceOutcome " +
                          (scamChoice.safe
                            ? "safeOutcome"
                            : "riskOutcome")
                        }
                      >
                        <div className="outcomeBadge">
                          {scamChoice.safe
                            ? "✓"
                            : "⚠️"}
                        </div>

                        <div>
                          <b>
                            {language === "Hindi"
                              ? scamChoice.safe
                                ? "अच्छा फैसला"
                                : "जोखिम बढ़ गया"
                              : scamChoice.safe
                              ? "Good decision"
                              : "Risk increased"}
                          </b>

                          <p>
                            {
                              scamChoice.outcome[
                                language === "Hindi"
                                  ? "hi"
                                  : "en"
                              ]
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {scamChoice && (
                      <button
                        className="primary full"
                        onClick={nextScamStep}
                      >
                        {scamStep <
                        scamData.steps.length - 1
                          ? language === "Hindi"
                            ? "अगला कदम →"
                            : "Next situation →"
                          : language === "Hindi"
                          ? "नतीजा देखें →"
                          : "See final result →"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            <ScamFinish
              score={scamScore}
              total={scamData.steps.length}
              language={language}
              onRestart={startScam}
              onQuiz={() =>
                setScamStep(
                  scamData.steps.length + 1
                )
              }
            />
          )}

          {scamData &&
            scamStep > scamData.steps.length && (
              <ScamQuiz
                data={scamData}
                language={language}
                index={quizIndex}
                choice={quizChoice}
                score={quizScore}
                onAnswer={answerQuiz}
                onNext={nextQuiz}
                onDone={() => setTab("home")}
              />
            )}
        </section>
      )}

      {/* =====================================================
          INFLATION
      ===================================================== */}

      {tab === "inflation" && (
        <section className="simWrap">
          <SimHeader
            icon="🪣"
            title={
              language === "Hindi"
                ? "लीकी बकेट"
                : "Leaky Bucket"
            }
            sub={
              language === "Hindi"
                ? "पैसा वही। चीज़ें कितनी?"
                : "Paisa wahi. Cheezein kitni?"
            }
            onBack={() => setTab("home")}
            backText={ui.back}
          />

          <div className="inflationCard">
            <div className="yearBadge">
              {language === "Hindi"
                ? "साल"
                : "YEAR"}{" "}
              {inflationYear}
            </div>

            <div className="purchaseVisual">
              <div className="bag">🌾</div>

              <div>
                <b>₹1,000</b>
                <small>
                  {language === "Hindi"
                    ? "आज की खरीदने की ताकत"
                    : "Aaj ki kharidne ki taakat"}
                </small>
              </div>
            </div>

            <div className="sliderRow">
              <span>
                {language === "Hindi"
                  ? "आज"
                  : "Aaj"}
              </span>

              <input
                type="range"
                min="0"
                max="10"
                value={inflationYear}
                onChange={(e) =>
                  setInflationYear(
                    Number(e.target.value)
                  )
                }
              />

              <span>
                {language === "Hindi"
                  ? "10 साल"
                  : "10 saal"}
              </span>
            </div>

            <div className="compare">
              <div className="compareBox">
                <span>
                  🪙{" "}
                  {language === "Hindi"
                    ? "घर का डिब्बा"
                    : "Ghar ka dabba"}
                </span>

                <strong>₹1,000</strong>

                <small>
                  {language === "Hindi"
                    ? "चीज़ें महँगी होती गईं"
                    : "Cheezein mehngi hoti gayi"}
                </small>

                <div className="grainRow">
                  {Array.from({
                    length: Math.max(
                      1,
                      Math.ceil(
                        purchasingPower / 180
                      )
                    ),
                  }).map((_, i) => (
                    <span key={i}>🌾</span>
                  ))}
                </div>
              </div>

              <div className="compareBox green">
                <span>
                  🏦{" "}
                  {language === "Hindi"
                    ? "बचत"
                    : "Bachat"}
                </span>

                <strong>
                  ₹
                  {Math.round(
                    1000 + inflationYear * 55
                  ).toLocaleString("en-IN")}
                </strong>

                <small>
                  {language === "Hindi"
                    ? "सिर्फ़ उदाहरण, रिटर्न की गारंटी नहीं"
                    : "Illustrative example, guaranteed return nahi"}
                </small>

                <div className="grainRow">
                  {Array.from({
                    length: Math.max(
                      1,
                      Math.ceil(
                        (1000 +
                          inflationYear * 55) /
                          180
                      )
                    ),
                  }).map((_, i) => (
                    <span key={i}>🌾</span>
                  ))}
                </div>
              </div>
            </div>

            <h3>
              {inflationYear === 0
                ? language === "Hindi"
                  ? "स्लाइडर को आगे बढ़ाएँ।"
                  : "Slider ko aage badhao."
                : language === "Hindi"
                ? `5 साल की महँगाई के बाद, ₹1,000 की खरीदने की ताकत लगभग ₹${purchasingPower} जैसी दिखती है।`
                : `5 saal ki mehngai ke baad, ₹1,000 ki kharidne ki taakat lagbhag ₹${purchasingPower} jaisi dikhti hai.`}
            </h3>

            <button
              className="primary"
              onClick={() =>
                playSpeech(
                  language === "Hindi"
                    ? "पैसा गायब नहीं हुआ। उससे मिलने वाली चीज़ें कम हो गईं।"
                    : "Paisa gayab nahi hua. Usse milne wali cheezein kam ho gayi.",
                  speechLang
                )
              }
            >
              🔊{" "}
              {language === "Hindi"
                ? "सुनें"
                : "Suno"}
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          NOMINATION
      ===================================================== */}

      {tab === "nomination" && (
        <section className="simWrap">
          <SimHeader
            icon="🛡️"
            title={
              language === "Hindi"
                ? "फैमिली शील्ड"
                : "Family Shield"
            }
            sub={
              language === "Hindi"
                ? "छोटी तैयारी, मुश्किल समय में साफ़ रास्ता।"
                : "Ek chhoti taiyari, mushkil waqt mein clarity."
            }
            onBack={() => setTab("home")}
            backText={ui.back}
          />

          <div className="nominationCard">
            <div className="shopScene">
              🏪
              <div>
                <b>Sharma Kirana Store</b>
                <small>
                  {language === "Hindi"
                    ? "मालिक: रमेश जी"
                    : "Owner: Ramesh Ji"}
                </small>
              </div>
            </div>

            {!nominee ? (
              <>
                <h2>
                  {language === "Hindi"
                    ? "क्या रमेश जी ने nominee दर्ज किया है?"
                    : "Ramesh Ji ne nominee register kiya hai?"}
                </h2>

                <p>
                  {language === "Hindi"
                    ? "कहानी का अगला कदम आप तय करेंगे।"
                    : "Story ka next step aap decide karenge."}
                </p>

                <div className="choiceGrid">
                  <button
                    className="success"
                    onClick={() =>
                      setNominee(true)
                    }
                  >
                    🛡️{" "}
                    {language === "Hindi"
                      ? "हाँ"
                      : "Haan"}
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      setNominee(false)
                    }
                  >
                    ❌{" "}
                    {language === "Hindi"
                      ? "नहीं"
                      : "Nahi"}
                  </button>
                </div>
              </>
            ) : nominee === true ? (
              <div className="outcomeGood">
                <div className="bigEmoji">
                  🛡️
                </div>

                <h2>
                  {language === "Hindi"
                    ? "परिवार को claim process में स्पष्टता मिल सकती है।"
                    : "Family ko claim process mein clarity milti hai."}
                </h2>

                <p>
                  {language === "Hindi"
                    ? "Nominee होने से प्रक्रिया में मदद हो सकती है। लेकिन nominee और final legal ownership एक ही चीज़ नहीं हैं।"
                    : "Nominee hone se process mein madad ho sakti hai. Lekin nominee aur final legal ownership ek hi cheez nahi hain."}
                </p>

                <button
                  className="primary"
                  onClick={() =>
                    setNominee(null)
                  }
                >
                  {language === "Hindi"
                    ? "फिर से खेलें"
                    : "Phir se khelo"}
                </button>
              </div>
            ) : (
              <div className="outcomeBad">
                <div className="bigEmoji">
                  📄
                </div>

                <h2>
                  {language === "Hindi"
                    ? "अब परिवार को दस्तावेज़ और कानूनी प्रक्रिया समझनी पड़ सकती है।"
                    : "Ab family ko documents aur legal process samajhna padega."}
                </h2>

                <p>
                  {language === "Hindi"
                    ? "Nomination न होने पर प्रक्रिया अधिक जटिल हो सकती है। सही कानूनी अधिकार मामले और लागू कानून पर निर्भर करते हैं।"
                    : "Nomination na hone par process zyada complicated ho sakta hai. Exact legal rights case aur applicable law par depend karte hain."}
                </p>

                <button
                  className="primary"
                  onClick={() =>
                    setNominee(null)
                  }
                >
                  {language === "Hindi"
                    ? "फिर से खेलें"
                    : "Phir se khelo"}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          ASK / FIXED QUESTIONS
      ===================================================== */}

      {tab === "ask" && (
        <section className="askPage">
          <div className="askInner">
            <span className="eyebrow">
              {ui.question}
            </span>

            <h1>
              {ui.guideTitle}
              <br />
              <span>{ui.guideTitle2}</span>
            </h1>

            <p>{ui.guideText}</p>

            <button
              className={
                "micBig " +
                (listening ? "listening" : "")
              }
              onClick={mic}
            >
              🎙️
              <small>
                {listening
                  ? ui.listening
                  : ui.speakAsk}
              </small>
            </button>

            <div className="askInput">
              <input
                value={question}
                onChange={(e) =>
                  setQuestion(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askQuestion();
                  }
                }}
                placeholder={ui.typeHere}
              />

              <button
                onClick={() => askQuestion()}
                disabled={chatLoading}
              >
                {chatLoading
                  ? "..."
                  : ui.ask}
              </button>
            </div>

            {answer && (
              <AudioBubble
                text={answer}
                language={language}
                large
                audioState={audioState}
                onPlay={() =>
                  playSpeech(
                    answer,
                    speechLang
                  )
                }
                onPause={pauseSpeech}
                onResume={resumeSpeech}
                onRepeat={repeatSpeech}
                onStop={stopSpeech}
              />
            )}

            {/* =================================================
                ALL 10 CLICKABLE QUESTIONS
            ================================================= */}

            <div className="suggestions">
              <h3>
                {language === "Hindi"
                  ? "या कोई सवाल चुनें"
                  : "Ya koi sawaal choose karo"}
              </h3>

              <div className="suggestionGrid">
                {FIXED_QUESTIONS[
                  language
                ].map((item, index) => (
                  <button
                    key={index}
                    className="questionButton"
                    onClick={() => {
                      setQuestion(
                        item.question
                      );
                      setAnswer(
                        item.answer
                      );
                      playSpeech(
                        item.answer,
                        speechLang
                      );
                    }}
                  >

                    <span>
                      {item.question}
                    </span>

                    <span className="questionArrow">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {termModal && (
        <TermModal
          term={TECH_TERMS[termModal]}
          language={language}
          audioState={audioState}
          onClose={() => {
            stopSpeech();
            setTermModal(null);
          }}
          onPlay={(text) =>
            playSpeech(text, speechLang)
          }
          onPause={pauseSpeech}
          onResume={resumeSpeech}
          onRepeat={repeatSpeech}
          onStop={stopSpeech}
        />
      )}

      <footer>
        <b>Paisa Samjho</b>
        <span>
          Financial learning, not financial advice.
        </span>
        <button onClick={resetAll}>
          {ui.restart}
        </button>
      </footer>
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function AudioBubble({
  text,
  language,
  large = false,
  audioState,
  onPlay,
  onPause,
  onResume,
  onRepeat,
  onStop,
}) {
  return (
    <div
      className={
        "aiBubble " + (large ? "large" : "")
      }
    >
      <span>💡</span>

      <div>
        <div>{text}</div>

        <div className="audioControls">
          <button
            onClick={
              audioState === "playing"
                ? onPause
                : audioState === "paused"
                ? onResume
                : onPlay
            }
          >
            {audioState === "playing"
              ? "⏸ Pause"
              : audioState === "paused"
              ? "▶ Resume"
              : "▶ Play"}
          </button>

          <button onClick={onRepeat}>
            ↻ Repeat
          </button>

          <button onClick={onStop}>
            ■ Stop
          </button>

          <small>
            {language === "Hindi"
              ? "हिंदी आवाज़"
              : "Hinglish voice"}
          </small>
        </div>
      </div>
    </div>
  );
}

function TermModal({
  term,
  language,
  audioState,
  onClose,
  onPlay,
  onPause,
  onResume,
  onRepeat,
  onStop,
}) {
  const copy =
    term[
      language === "Hindi"
        ? "hi"
        : "en"
    ];

  return (
    <div
      className="modalBackdrop"
      onClick={onClose}
    >
      <div
        className="termModal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="modalClose"
          onClick={onClose}
        >
          ×
        </button>

        <div className="topicIcon modalIcon">
          {term.icon}
        </div>

        <span className="eyebrow">
          TECHNICAL TERM
        </span>

        <h2>{term.term}</h2>

        <p className="termShort">
          {copy.short}
        </p>

        <div className="termExplanation">
          <b>
            {language === "Hindi"
              ? "आसान मतलब"
              : "Simple meaning"}
          </b>

          <p>{copy.explain}</p>
        </div>

        <div className="termExplanation analogy">
          <b>
            {language === "Hindi"
              ? "रोज़ की ज़िंदगी का उदाहरण"
              : "Roz ki zindagi ka example"}
          </b>

          <p>{copy.analogy}</p>
        </div>

        <AudioBubble
          text={`${copy.explain} ${copy.analogy}`}
          language={language}
          audioState={audioState}
          onPlay={() =>
            onPlay(
              `${copy.explain} ${copy.analogy}`
            )
          }
          onPause={onPause}
          onResume={onResume}
          onRepeat={onRepeat}
          onStop={onStop}
        />
      </div>
    </div>
  );
}

function GameCard({
  icon,
  title,
  text,
  tag,
  onClick,
}) {
  return (
    <button
      className="gameCard"
      onClick={onClick}
    >
      <div className="gameIcon">{icon}</div>
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <b>Play →</b>
    </button>
  );
}

function SimHeader({
  icon,
  title,
  sub,
  onBack,
  backText = "← Back",
}) {
  return (
    <div className="simHeader">
      <button
        className="back"
        onClick={onBack}
      >
        {backText}
      </button>

      <div>
        <div className="simTitle">
          {icon} {title}
        </div>
        <p>{sub}</p>
      </div>
    </div>
  );
}

function Outcome({
  decision,
  money,
  event,
  onAgain,
  language,
}) {
  const gain =
    decision === "hold"
      ? event.holdImpact
      : event.sellImpact;

  const positive = gain > 0;

  return (
    <div
      className={
        "outcome " +
        (positive ? "good" : "warn")
      }
    >
      <div className="bigEmoji">
        {positive ? "🌱" : "🔀"}
      </div>

      <h3>
        {language === "Hindi"
          ? positive
            ? "इस फैसले से इस सिम्युलेशन में बैलेंस बढ़ा।"
            : "इस फैसले से इस सिम्युलेशन में बैलेंस कम हुआ।"
          : positive
          ? "Is choice ne simulation mein balance badhaya."
          : "Is choice ne simulation mein balance kam kiya."}
      </h3>

      <p>
        <b>
          {decision === "hold"
            ? language === "Hindi"
              ? "होल्ड"
              : "Hold"
            : language === "Hindi"
            ? "बेचें"
            : "Sell"}
        </b>{" "}
        {language === "Hindi"
          ? "का सिम्युलेटेड असर"
          : "ka simulated effect"}
        : {gain > 0 ? "+" : ""}₹
        {gain.toLocaleString("en-IN")}
      </p>

      <p>
        {language === "Hindi"
          ? "डेमो बैलेंस"
          : "Current demo balance"}
        :{" "}
        <b>
          ₹{money.toLocaleString("en-IN")}
        </b>
      </p>

      <p className="smallNote">
        {
          event.next[
            language === "Hindi"
              ? "hi"
              : "en"
          ]
        }
      </p>

      <button
        className="primary"
        onClick={onAgain}
      >
        ⚡{" "}
        {language === "Hindi"
          ? "अगली स्थिति"
          : "Next situation"}
      </button>
    </div>
  );
}

function ScamFinish({
  score,
  total,
  language,
  onRestart,
  onQuiz,
}) {
  const hi = language === "Hindi";

  return (
    <div className="finishCard">
      <div className="bigEmoji">
        {score >= 4
          ? "🛡️"
          : score >= 2
          ? "🟡"
          : "🚨"}
      </div>

      <span className="eyebrow">
        {hi
          ? "अभ्यास पूरा"
          : "PRACTICE COMPLETE"}
      </span>

      <h2>
        {hi
          ? `${total} में से ${score} सुरक्षित फैसले`
          : `${score} safe decisions out of ${total}`}
      </h2>

      <p>
        {hi
          ? "असली ज़िंदगी में रुकना, जाँचना और किसी भरोसेमंद व्यक्ति से बात करना आपकी सबसे बड़ी ताकत है।"
          : "In real life, pause, verify, and talk to someone you trust before sending money."}
      </p>

      <div className="finishActions">
        <button
          className="primary"
          onClick={onQuiz}
        >
          {hi
            ? "3 सवालों की चुनौती →"
            : "Take the 3-question challenge →"}
        </button>

        <button
          className="back"
          onClick={onRestart}
        >
          {hi
            ? "फिर से खेलें"
            : "Play again"}
        </button>
      </div>
    </div>
  );
}

function ScamQuiz({
  data,
  language,
  index,
  choice,
  score,
  onAnswer,
  onNext,
  onDone,
}) {
  const hi = language === "Hindi";

  if (index >= data.recapQuiz.length) {
    return (
      <div className="finishCard">
        <div className="bigEmoji">🏆</div>

        <h2>
          {hi
            ? `आपका स्कोर: ${score}/${data.recapQuiz.length}`
            : `Your score: ${score}/${data.recapQuiz.length}`}
        </h2>

        <p>
          {hi
            ? "अब आपको मुख्य लाल संकेत पहचानने की अच्छी शुरुआत हो गई है।"
            : "You now have a stronger habit of spotting the main red flags."}
        </p>

        <button
          className="primary"
          onClick={onDone}
        >
          {hi
            ? "मुख्य पेज पर जाएँ"
            : "Back to home"}
        </button>
      </div>
    );
  }

  const q = data.recapQuiz[index];

  return (
    <div className="quizCard">
      <span className="eyebrow">
        {hi
          ? `चुनौती ${index + 1} / ${data.recapQuiz.length}`
          : `CHALLENGE ${index + 1} / ${data.recapQuiz.length}`}
      </span>

      <h2>
        {q.question[
          hi ? "hi" : "en"
        ]}
      </h2>

      <div className="quizOptions">
        {q.options.map((o, i) => (
          <button
            key={i}
            disabled={choice !== null}
            className={
              choice === i
                ? i === q.correct
                  ? "quizCorrect"
                  : "quizWrong"
                : ""
            }
            onClick={() => onAnswer(i)}
          >
            {o[hi ? "hi" : "en"]}
          </button>
        ))}
      </div>

      {choice !== null && (
        <div className="quizExplain">
          <b>
            {choice === q.correct
              ? hi
                ? "सही"
                : "Correct"
              : hi
              ? "एक बार फिर सोचें"
              : "Not quite"}
          </b>

          <p>
            {q.explain[
              hi ? "hi" : "en"
            ]}
          </p>

          <button
            className="primary"
            onClick={onNext}
          >
            {index <
            data.recapQuiz.length - 1
              ? hi
                ? "अगला सवाल →"
                : "Next question →"
              : hi
              ? "स्कोर देखें →"
              : "See score →"}
          </button>
        </div>
      )}
    </div>
  );
}

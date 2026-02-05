import React, { useEffect, useState } from 'react';

export type TTSOptions = {
  lang: string;
  rate: number;
  pitch: number;
  volume: number;
};

// Multi-language meditation scripts
const SCRIPTS: Record<string, Record<string, { title: string; text: string }>> = {
  // English (US)
  'en-US': {
    anxiety: {
      title: 'Anxiety - 4-4-6 Breathing',
      text: `Let's slow things down together.\nBreathe in for four seconds.\nOne... two... three... four...\nHold the breath.\nOne... two... three... four...\nNow breathe out slowly for six seconds.\nOne... two... three... four... five... six...\nYou are safe right now. Let's repeat this together.`
    },
    sadness: {
      title: 'Sadness - Gentle Breathing',
      text: `You don't need to fix anything right now.\nJust notice your breathing.\nInhale softly...\nAnd exhale slowly.\nIt's okay to feel what you feel. I'm here with you.`
    },
    anger: {
      title: 'Anger - Box Breathing',
      text: `Let's reset the body.\nBreathe in... hold...\nBreathe out... hold...\nEach breath helps your body calm down.`
    },
    sleep: {
      title: 'Sleep - 4-7-8',
      text: `Let your body become heavy.\nBreathe in for four...\nHold for seven...\nAnd breathe out for eight...\nNothing else needs your attention. Rest is allowed.`
    },
    safety: {
      title: 'Safety escalation (use only when needed)',
      text: `I'm really glad you reached out. You deserve help and care. Please consider talking to a trusted person or a mental health professional right now. If you're in immediate danger, please contact your local emergency number or a suicide prevention helpline.`
    }
  },
  // Hindi
  'hi-IN': {
    anxiety: {
      title: 'चिंता - 4-4-6 श्वास',
      text: `चलिए, हम साथ में धीरे होते हैं।\nचार सेकंड के लिए सांस अंदर लें।\nएक... दो... तीन... चार...\nसांस रोकें।\nएक... दो... तीन... चार...\nअब धीरे से छह सेकंड के लिए सांस बाहर छोड़ें।\nएक... दो... तीन... चार... पांच... छह...\nआप अभी सुरक्षित हैं। चलिए, यह साथ में दोहराते हैं।`
    },
    sadness: {
      title: 'दुख - कोमल श्वास',
      text: `अभी आपको कुछ भी ठीक करने की जरूरत नहीं है।\nबस अपनी सांस पर ध्यान दें।\nधीरे से सांस अंदर लें...\nऔर धीरे से बाहर छोड़ें।\nजो आप महसूस कर रहे हैं, वह ठीक है। मैं आपके साथ हूं।`
    },
    anger: {
      title: 'क्रोध - बॉक्स ब्रीदिंग',
      text: `चलिए शरीर को रीसेट करते हैं।\nसांस अंदर लें... रोकें...\nसांस बाहर छोड़ें... रोकें...\nहर सांस आपके शरीर को शांत करने में मदद करती है।`
    },
    sleep: {
      title: 'नींद - 4-7-8',
      text: `अपने शरीर को भारी होने दें।\nचार के लिए सांस अंदर लें...\nसात के लिए रोकें...\nऔर आठ के लिए बाहर छोड़ें...\nकिसी और चीज़ की आपकी ध्यान देने की जरूरत नहीं है। आराम की अनुमति है।`
    },
    safety: {
      title: 'सुरक्षा (जरूरत पड़ने पर उपयोग करें)',
      text: `मुझे खुशी है कि आपने संपर्क किया। आपकी मदद और देखभाल लायक हैं। कृपया किसी विश्वसनीय व्यक्ति या मानसिक स्वास्थ्य पेशेवर से बात करने पर विचार करें। अगर आप तुरंत खतरे में हैं, तो कृपया अपने स्थानीय आपातकालीन नंबर या आत्महत्या रोकथाम हेल्पलाइन से संपर्क करें।`
    }
  },
  // Telugu
  'te-IN': {
    anxiety: {
      title: 'ఆందోళన - 4-4-6 శ్వాస',
      text: `మనం కలిసి నెమ్మదిగా మారుద్దాం.\nనాలుగు సెకన్లు శ్వాస తీసుకోండి.\nఒకటి... రెండు... మూడు... నాలుగు...\nశ్వాస నిలుపండి.\nఒకటి... రెండు... మూడు... నాలుగు...\nఇప్పుడు ఆరు సెకన్లు నెమ్మదిగా శ్వాస వదలండి.\nఒకటి... రెండు... మూడు... నాలుగు... ఐదు... ఆరు...\nమీరు ఇప్పుడు సురక్షితంగా ఉన్నారు. మనం కలిసి మళ్ళీ చేద్దాం.`
    },
    sadness: {
      title: 'బాధ - మృదువైన శ్వాస',
      text: `ఇప్పుడు మీరు ఏదైనా సరిదిద్దాల్సిన అవసరం లేదు.\nమీ శ్వాస మాత్రమే గమనించండి.\nమృదువుగా శ్వాస తీసుకోండి...\nమరియు నెమ్మదిగా వదిలండి.\nమీరు ఏది అనుభవిస్తున్నారో అది సరే. నేను మీతో ఉన్నాను.`
    },
    anger: {
      title: 'కోపం - బాక్స్ బ్రీదింగ్',
      text: `శరీరాన్ని రీసెట్ చేద్దాం.\nశ్వాస తీసుకోండి... నిలుపండి...\nశ్వాస వదిలండి... నిలుపండి...\nప్రతి శ్వాస మీ శరీరాన్ని శాంతపరుస్తుంది.`
    },
    sleep: {
      title: 'నిద్ర - 4-7-8',
      text: `మీ శరీరాన్ని బరువుగా అనిపించుకోండి.\nనాలుగు కోసం శ్వాస తీసుకోండి...\nఏడు కోసం నిలుపండి...\nమరియు ఎనిమిది కోసం వదిలండి...\nమరేకీ మీ శ్రద్ధ అవసరం లేదు. విశ్రాంతి అనుమతించబడింది.`
    },
    safety: {
      title: 'భద్రత (అవసరమైనపుడు మాత్రమే ఉపయోగించండి)',
      text: `మీరు సంప్రదించినందుకు నేను సంతోషిస్తున్నాను. మీకు సహాయం మరియు శ్రద్ధ అర్హత ఉంది. దయచేసి ఒక నమ్మకస్తుడైన వ్యక్తి లేదా మానసిక ఆరోగ్య నిపుణుడితో మాట్లాడటం పై ఆలోచించండి. మీరు తక్షణ ప్రమాదంలో ఉంటే, దయచేసి మీ స్థానीय అత్యవసర నంబర్ లేదా ఆత్మహత్య నివారణ హెల్ప్‌లైన్‌కు కాల్ చేయండి.`
    }
  },
  // Tamil
  'ta-IN': {
    anxiety: {
      title: 'கவலை - 4-4-6 சுவாசம்',
      text: `நாம் ஒன்றாக சுமுகமாக இருப்போம்.\nநான்கு நிமிடங்கள் சுவாசத்தை உள்ளே எடுப்போம்.\nஒன்று... இரண்டு... மூன்று... நான்கு...\nசுவாசத்தை நிறுத்துவோம்.\nஒன்று... இரண்டு... மூன்று... நான்கு...\nஇப்போது ஆறு நிமிடங்கள் மெதுவாக வெளியே விடுவோம்.\nஒன்று... இரண்டு... மூன்று... நான்கு... ஐந்து... ஆறு...\nநீங்கள் இப்போது பாதுகாப்பாக இருக்கிறீர்கள். நாம் ஒன்றாக மீண்டும் செய்வோம்.`
    },
    sadness: {
      title: 'வருத்தம் - மென்மையான சுவாசம்',
      text: `இப்போது நீங்கள் எதையும் சரிசெய்ய வேண்டியதில்லை.\nஉங்கள் சுவாசத்தை மட்டும் கவனியுங்கள்.\nமென்மையாக உள்ளே எடுங்கள்...\nமெதுவாக வெளியே விடுங்கள்.\nநீங்கள் என்ன உணர்கிறீர்களோ அது சரி. நான் உங்களுடன் இருக்கிறேன்.`
    },
    anger: {
      title: 'கோபம் - பாக்ஸ் ப்ரீதிங்',
      text: `உடலை மீட்டமைப்போம்.\nசுவாசம் உள்ளே... நிறுத்து...\nசுவாசம் வெளியே... நிறுத்து...\nஒவ்வொரு சுவாசமும் உடலை அமைதிப்படுத்த உதவுகிறது.`
    },
    sleep: {
      title: 'நித்திரை - 4-7-8',
      text: `உடலை கனமாக ஆக்குங்கள்.\nநான்குக்கு உள்ளே எடுங்கள்...\nஏழுக்கு நிறுத்துங்கள்...\nமற்றும் எட்டுக்கு வெளியே விடுங்கள்...\nவேறு எதற்கும் உங்கள் கவனம் தேவையில்லை. ஓய்வு அனுமதிக்கப்படுகிறது.`
    },
    safety: {
      title: 'பாதுகாப்பு (தேவைப்படும்போது மட்டும் பயன்படுத்தவும்)',
      text: `நீங்கள் தொடர்பு கொண்டதற்கு நான் மகிழ்வாக இருக்கிறேன். நீங்கள் உதவி மற்றும் கவனிப்புக்கு தகுதியானவர். தயவுசெய்து நம்பகமான ஒருவரிடமோ மன நல நிபுணரிடமோ பேசுவதை நினைக்கவும். நீங்கள் உடனடி ஆபத்தில் இருந்தால், தயவுசெய்து உங்கள் உடனடி எண்ணை அல்லது தற்கொலை தடுப்பு ஹெல்ப்லைனை அழைக்கவும்.`
    }
  },
  // Kannada
  'kn-IN': {
    anxiety: {
      title: 'ಚಿಂತೆ - 4-4-6 ಉಸಿರು',
      text: `ನಾವು ಒಟ್ಟಾಗಿ ನೆಮ್ಮದಿಯಾಗಿ ಇರುವಾಗ.\nನಾಲ್ಕು ಸೆಕೆಂಡ್‌ಗಳ ಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ.\nಒಂದು... ಎರಡು... ಮೂರು... ನಾಲ್ಕು...\nಉಸಿರು ನಿಲ್ಲಿಸಿ.\nಒಂದು... ಎರಡು... ಮೂರು... ನಾಲ್ಕು...\nಈಗ ಆರು ಸೆಕೆಂಡ್‌ಗಳ ನೆಮ್ಮದಿಯಾಗಿ ಉಸಿರು ಬಿಡಿ.\nಒಂದು... ಎರಡು... ಮೂರು... ನಾಲ್ಕು... ಐದು... ಆರು...\nನೀವು ಈಗ ಸುರಕ್ಷಿತರಾಗಿದ್ದೀರಿ. ನಾವು ಒಟ್ಟಾಗಿ ಮತ್ತೆ ಮಾಡುವಾಗ.`
    },
    sadness: {
      title: 'ದುಃಖ - ಮೃದುವಾದ ಉಸಿರು',
      text: `ಈಗ ನೀವು ಏನನ್ನಾದರೂ ಸರಿಪಡಿಸಬೇಕಾದ ಅಗತ್ಯವಿಲ್ಲ.\nನಿಮ್ಮ ಉಸಿರನ್ನು ಮಾತ್ರ ಗಮನಿಸಿ.\nಮೃದುವಾಗಿ ಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ...\nಮತ್ತು ನೆಮ್ಮದಿಯಾಗಿ ಬಿಡಿ.\nನೀವು ಏನ ಅನುಭವಿಸುತ್ತಿದ್ದೀರೋ ಅದು ಸರಿ. ನಾನು ನಿಮ್ಮೊಂದಿಗೆ ಇರುವೆ.`
    },
    anger: {
      title: 'ಕೋಪ - ಬಾಕ್ಸ್ ಬ್ರೀದಿಂಗ್',
      text: `ದೇಹವನ್ನು ಮರುಹೊಂದಿಸುವಾಗ.\nಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ... ನಿಲ್ಲಿಸಿ...\nಉಸಿರು ಬಿಡಿ... ನಿಲ್ಲಿಸಿ...\nಪ್ರತಿ ಉಸಿರು ನಿಮ್ಮ ದೇಹವನ್ನು ಶಾಂತಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.`
    },
    sleep: {
      title: 'ನಿದ್ರೆ - 4-7-8',
      text: `ನಿಮ್ಮ ದೇಹವನ್ನು ಭಾರವಾಗಿ ಮಾಡಿ.\nನಾಲ್ಕಕ್ಕೆ ಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ...\nಏಳಕ್ಕೆ ನಿಲ್ಲಿಸಿ...\nಮತ್ತು ಎಂಟಕ್ಕೆ ಬಿಡಿ...\nಬೇರೆ ಯಾವುದಕ್ಕೂ ನಿಮ್ಮ ಗಮನ ಬೇಕಾಗಿಲ್ಲ. ವಿಶ್ರಾಂತಿ ಅನುಮತಿಸಲಾಗಿದೆ.`
    },
    safety: {
      title: 'ಸುರಕ್ಷತೆ (ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ಬಳಸಿ)',
      text: `ನೀವು ಸಂಪರ್ಕಿಸಿದ್ದಕ್ಕೆ ನಾನು ಸಂತೋಷಪಡುತ್ತೇನೆ. ನೀವು ಸಹಾಯ ಮತ್ತು ಕಾಳಜಿಗೆ ಅರ್ಹರು. ದಯವಿಟ್ಟು ನಂಬಿಕಸ್ತ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ಅಥವಾ ಮಾನಸಿಕ ಆರೋಗ್ಯ ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡುವುದನ್ನು ಪರಿಗಣಿಸಿ. ನೀವು ತಕ್ಷಣದ ಅಪಾಯದಲ್ಲಿದ್ದರೆ, ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಅಗ್ನಿಸೇವೆ ಸಂಖ್ಯೆಗೆ ಅಥವಾ ಆತ್ಮಹತ್ಯೆ ತಡೆಯುವ ಹೆಲ್ಪ್‌ಲೈನ್‌ಗೆ ಕರೆ ಮಾಡಿ.`
    }
  },
  // Malayalam
  'ml-IN': {
    anxiety: {
      title: 'ഉത്കണ്ഠ - 4-4-6 ശ്വാസം',
      text: `നമ്മൾ ഒന്നിച്ച് സാവധാനത്തിലാകാം.\nനാല് സെക്കന്റ് ശ്വാസം എടുക്കാം.\nഒന്ന്... രണ്ട്... മൂന്ന്... നാല്...\nശ്വാസം നിറുത്താം.\nഒന്ന്... രണ്ട്... മൂന്ന്... നാല്...\nഇപ്പോൾ ആറ് സെക്കന്റ് സാവധാനത്തില്‍ ശ്വാസം വിടാം.\nഒന്ന്... രണ്ട്... മൂന്ന്... നാല്... അഞ്ച്... ആറ്...\nനിങ്ങൾ ഇപ്പോൾ സുരക്ഷിതരാണ്. നമ്മൾ ഒന്നിച്ച് ആവർത്തിക്കാം.`
    },
    sadness: {
      title: 'ദുഃഖം - മൃദുവായ ശ്വാസം',
      text: `ഇപ്പോൾ നിങ്ങള്‍ക്ക് എന്തെങ്കിലും ശരിയാക്കണമെന്നില്ല.\nനിങ്ങളുടെ ശ്വാസം മാത്രം ശ്രദ്ധിക്കുക.\nമൃദുവായി ശ്വാസം എടുക്കുക...\nസാവധാനത്തില്‍ വിടുക.\nനിങ്ങൾ എന്ത് അനുഭവിക്കുന്നുവോ അത് ശരിയാണ്. ഞാന്‍ നിങ്ങളുടെ കൂടെയുണ്ട്.`
    },
    anger: {
      title: 'കോപം - ബോക്സ് ബ്രീതിംഗ്',
      text: `ശരീരത്തെ പുനഃസജ്ജമാക്കാം.\nശ്വാസം എടുക്കുക... നിറുത്തുക...\nശ്വാസം വിടുക... നിറುത്തുക...\nഓരോ ശ്വാസവും നിങ്ങളുടെ ശരീരത്തെ ശാന്തമാക്കാന്‍ സഹായിക്കുന്നു.`
    },
    sleep: {
      title: ' u0000 - 4-7-8',
      text: `ശരീരത്തെ ഭാരമുള്ളതാക്കുക.\nനാലിനായി ശ്വാസം എടുക്കുക...\nഏഴിനായി നിುത്തുക...\nഎട്ടിനായി വിടുക...\nമറ്റൊന്നിനും നിങ്ങളുടെ ശ്രദ്ധ ആവശ്യമില്ല. വിശ്രമം അനുവദിച്ചിരിക്കുന്നു.`
    },
    safety: {
      title: 'സുരക്ഷ (ആവശ്യമുള്ളപ്പോഴേ ഉപയോഗിക്കുക)',
      text: `നിങ്ങൾ ബന്ധപ്പെട്ടതിന് ഞാന്‍ സന്തോഷവാനാണ്. നിങ്ങൾക്ക് സഹായവും പരിഗണനയും അര്‍ഹിക്കുന്നു. ദയവായി വിശ്വസനീയനാಯ ആരെಯೊ അല്ലെങ്കില്‍ മാനസികാരോഗ്യ വിദഗ്ധനുമായി സംസാരിക്കുന്നത് പരിഗണിക്കുക. നിങ്ങള്‍ ഉടനടി അപായത്തിലാണെങ്കില്‍, ദയവായി നിങ്ങളുടെ പ്രാദേശിക അടിയന്തര നമ്പറിലോ ആത്മഹത്യ തടയൽ ഹെല്‍പ് ലൈനിലോ വിളിക്കുക.`
    }
  }
};

export default function MeditationPlayer({ initial = 'anxiety' }: { initial?: string }) {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIndex, setVoiceIndex] = useState(0);
  const [options, setOptions] = useState<TTSOptions>({ lang: 'en-US', rate: 0.85, pitch: 1, volume: 0.9 });
  const [scriptKey, setScriptKey] = useState(initial);
  const [playing, setPlaying] = useState(false);

  // Get current script based on language selection
  const getCurrentScript = () => {
    const langScripts = SCRIPTS[options.lang as keyof typeof SCRIPTS];
    if (!langScripts) return SCRIPTS['en-US'][scriptKey] || SCRIPTS['en-US'].anxiety;
    return langScripts[scriptKey] || langScripts.anxiety || SCRIPTS['en-US'][scriptKey] || SCRIPTS['en-US'].anxiety;
  };

  // Get available scripts for current language
  const getAvailableScripts = () => {
    const langScripts = SCRIPTS[options.lang as keyof typeof SCRIPTS];
    if (!langScripts) return SCRIPTS['en-US'];
    return Object.keys(langScripts).length > 0 ? langScripts : SCRIPTS['en-US'];
  };

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices() || [];
      setAvailableVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    // prefer a voice matching the selected lang
    const idx = availableVoices.findIndex(v => v.lang.startsWith(options.lang));
    if (idx >= 0) setVoiceIndex(idx);
  }, [availableVoices, options.lang]);

  const speak = (text?: string) => {
    const currentScript = getCurrentScript();
    const msg = text ?? currentScript.text;
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not available in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(msg);
    const voice = availableVoices[voiceIndex];
    if (voice) u.voice = voice;
    u.rate = options.rate;
    u.pitch = options.pitch;
    u.volume = options.volume;
    u.lang = options.lang;
    u.onstart = () => setPlaying(true);
    u.onend = () => setPlaying(false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
  };

  const availableScripts = getAvailableScripts();
  const currentScript = getCurrentScript();

  return (
    <div className="card card-md">
      <h3>Meditation & TTS</h3>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
        <div>
          <label>Script</label>
          <select value={scriptKey} onChange={e=>setScriptKey(e.target.value)}>
            {Object.entries(availableScripts).map(([k,s])=> <option key={k} value={k}>{s.title}</option>)}
          </select>
        </div>

        <div>
          <label>Language</label>
          <select value={options.lang} onChange={e=>setOptions({...options,lang:e.target.value})}>
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="kn-IN">Kannada</option>
            <option value="ml-IN">Malayalam</option>
          </select>
        </div>

        <div>
          <label>Voice</label>
          <select value={voiceIndex} onChange={e=>setVoiceIndex(Number(e.target.value))}>
            {availableVoices.map((v, i)=> <option key={i} value={i}>{v.name} {v.lang}</option>)}
            {availableVoices.length===0 && <option>Default</option>}
          </select>
        </div>

        <div>
          <label>Rate</label>
          <input type="range" min="0.5" max="1.2" step="0.05" value={options.rate} onChange={e=>setOptions({...options,rate:Number(e.target.value)})} />
        </div>

        <div>
          <label>Pitch</label>
          <input type="range" min="0.5" max="1.5" step="0.05" value={options.pitch} onChange={e=>setOptions({...options,pitch:Number(e.target.value)})} />
        </div>

        <div>
          <button className="btn" onClick={()=>speak()} disabled={playing}>{playing? 'Playing…' : 'Play'}</button>
          <button className="btn secondary" style={{marginLeft:8}} onClick={stop}>Stop</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <p className="muted">Tip: Choose a slow rate (0.7–0.9) for calming meditations. Use the "Safety escalation" script only when necessary.</p>
      </div>
    </div>
  );
}

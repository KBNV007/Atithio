import { useState, useEffect } from 'react';

export default function App() {
  const whatsappNumber = '918826492707';

  const [language, setLanguage] = useState('en');
  const t = (en, hi) => language === 'en' ? en : hi;

  const luxuryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop"  
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const [form, setForm] = useState({
    destination: '',
    fromDate: '',
    toDate: '',
    adults: 2,
    children: 0,
    childAges: [],
    budgetPerDay: 8000, // Converted to number slider default value
  });

  // Live Notification Ticker Mock Data
  const tickerItems = [
    { textEn: "Amit K. requested a 3-Night Luxury Villa in Goa for 4 Adults", textHi: "अमित के. ने गोवा में 4 वयस्कों के लिए 3-रातों के लग्जरी विला की पूछताछ की" },
    { textEn: "Pooja S. enquired about Private Pool Resorts in Rishikesh", textHi: "पूजा एस. ने ऋषिकेश में प्राइवेट पूल रिसॉर्ट्स के बारे में पूछताछ की" },
    { textEn: "Vikram R. requested a Heritage Haveli Stay in Jaipur", textHi: "विक्रम आर. ने जयपुर में हेरिटेज हवेली स्टे की पूछताछ की" },
    { textEn: "Ananya M. booked a Premium Family Suite in Kerala", textHi: "अनन्या एम. ने केरल में प्रीमियम फैमिली सूट बुक किया" }
  ];
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4500);

    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 4000);

    return () => {
      clearInterval(bgTimer);
      clearInterval(tickerTimer);
    };
  }, []);

  const handleChange = (e) => {
    if (validationError && e.target.name === 'destination') setValidationError('');
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSliderChange = (e) => {
    setForm(prev => ({ ...prev, budgetPerDay: parseInt(e.target.value) || 4000 }));
  };

  const handleAdultsChildren = (type, value) => {
    if (type === 'adults') {
      setForm(prev => ({ ...prev, adults: parseInt(value) || 1 }));
    } else {
      const newChildren = parseInt(value) || 0;
      let newAges = [...form.childAges];
      if (newChildren > form.childAges.length) {
        newAges = [...newAges, ...Array(newChildren - form.childAges.length).fill(5)];
      } else {
        newAges = newAges.slice(0, newChildren);
      }
      setForm(prev => ({ ...prev, children: newChildren, childAges: newAges }));
    }
  };

  const updateChildAge = (index, age) => {
    const newAges = [...form.childAges];
    newAges[index] = parseInt(age);
    setForm(prev => ({ ...prev, childAges: newAges }));
  };

  const handleWhatsApp = () => {
    if (!form.destination.trim()) {
      setValidationError(t("Please enter a destination to proceed.", "कृपया आगे बढ़ने के लिए गंतव्य दर्ज करें।"));
      const element = document.getElementById('booking-form');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const childInfo = form.children > 0 
      ? `Children: ${form.children} (${form.childAges.join(', ')} yrs)` 
      : 'No children';

    const msg = `*Premium Hotel Enquiry - StaySaathi*\n\n` +
      `📍 Destination: ${form.destination}\n` +
      `📅 From: ${form.fromDate || 'Flexible'}\n` +
      `📅 Till: ${form.toDate || 'Flexible'}\n` +
      `👨‍👩‍👧 Adults: ${form.adults}\n` +
      `👦 ${childInfo}\n` +
      `💰 Budget: ₹${form.budgetPerDay} per room/day\n\n` +
      `Please suggest the best matching premium options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  // Curated Lifestyle Themes
  const travelThemes = [
    { titleEn: "Private Pool Villas", titleHi: "प्राइवेट पूल विला", descEn: "Seclusion & ultimate comfort", descHi: "एकांत और बेहतरीन आराम", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80", tag: "Villas" },
    { titleEn: "Heritage Palaces", titleHi: "हेरिटेज पैलेस", descEn: "Live like royal Indian kings", descHi: "शाही राजाओं की तरह रहें", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80", tag: "Heritage" },
    { titleEn: "Pet-Friendly Luxury", titleHi: "पेट-फ्रेंडली लग्जरी", descEn: "Don't leave your best saathi behind", descHi: "अपने पालतू जानवर को पीछे न छोड़ें", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1df0?auto=format&fit=crop&w=600&q=80", tag: "Pet Friendly" },
    { titleEn: "Experiential Glamping", titleHi: "अनुभवात्मक ग्लैम्पिंग", descEn: "Nature meets 5-star comfort", descHi: "प्रकृति और 5-स्टार आराम", img: "https://images.unsplash.com/photo-1533577116850-9cc662db0010?auto=format&fit=crop&w=600&q=80", tag: "Glamping" }
  ];

  // Dynamic Perks Engine
  const getPerksByBudget = (budget) => {
    if (budget < 6000) {
      return {
        tier: t("Boutique Premium Stay", "बुटीक प्रीमियम स्टे"),
        perks: [t("3★/4★ Curated Properties", "3★/4★ क्यूरेटेड प्रॉपर्टीज"), t("Complimentary Breakfast", "मुफ़्त नाश्ता"), t("Vetted Cleanliness Audits", "स्वच्छता ऑडिट पास")]
      };
    } else if (budget < 12000) {
      return {
        tier: t("Elite Premium Resort", "एलीट प्रीमियम रिसॉर्ट"),
        perks: [t("High-rated 4★ / 5★ Resorts", "हाई-रेटेड 4★ / 5★ रिसॉर्ट्स"), t("Free Room Upgrade (Subj to availability)", "फ्री रूम अपग्रेड की संभावना"), t("Early Check-in Privileges", "अर्ली चेक-इन की सुविधा"), t("Dedicated Saathi Concierge", "समर्पित साथी कंसीयज")]
      };
    } else {
      return {
        tier: t("Ultra-Luxury & Palaces", "अल्ट्रा-लग्जरी और पैलेस"),
        perks: [t("Iconic 5★ Luxury Brands & Villas", "प्रतिष्ठित 5★ लग्जरी ब्रांड्स और विला"), t("Private Plunge Pool / Infinity Pool Access", "प्राइवेट प्लंज पूल / इन्फिनिटी पूल"), t("Curated Chef-led Meals Included", "शेफ-लेड भोजन शामिल"), t("VIP On-Property Welcomes", "वीआईपी ऑन-प्रॉपर्टी स्वागत")]
      };
    }
  };

  const currentPerkPackage = getPerksByBudget(form.budgetPerDay);

  const popularDestinations = [
    { name: "Goa", emoji: "🏖️", desc: t("Beaches & Vibes", "समुद्र तट"), image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80" },
    { name: "Jaipur", emoji: "🏰", desc: t("Royal Heritage", "शाही विरासत"), image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" },
    { name: "Manali", emoji: "🏔️", desc: t("Mountains", "पहाड़"), image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" },
    { name: "Rishikesh", emoji: "🪷", desc: t("Yoga & Adventure", "योग और साहस"), image: "https://images.unsplash.com/photo-1603867106100-0d2039fc8757?auto=format&fit=crop&q=80&w=800" },
    { name: "Kerala", emoji: "🌴", desc: t("Backwaters", "बैकवाटर"), image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" },
    { name: "Leh Ladakh", emoji: "⛰️", desc: t("Adventure", "साहस"), image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900 font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md shadow-amber-500/20">S</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-serif tracking-tight font-bold">StaySaathi</h1>
              <p className="text-xs text-amber-600 font-medium tracking-wide -mt-0.5">{t("Book as a friend", "दोस्त की तरह बुक करें")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 text-sm border-2 font-medium border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition duration-200"
            >
              {language === 'en' ? 'हिन्दी' : 'English'}
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-600/20 text-sm md:text-base"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.633-1.025-5.101-2.89-6.968-1.866-1.867-4.348-2.895-6.983-2.896-5.442 0-9.866 4.415-9.869 9.85-.001 1.77.461 3.497 1.338 5.025l-.995 3.634 3.711-.969zm11.378-6.13c-.27-.135-1.595-.786-1.842-.876-.246-.09-.427-.135-.607.135-.18.27-.697.876-.855 1.057-.157.18-.315.202-.585.067-1.144-.572-1.928-1.008-2.693-2.316-.201-.343.201-.318.574-1.06.09-.18.045-.337-.022-.472-.067-.135-.607-1.462-.832-2.003-.219-.527-.441-.455-.607-.464-.157-.008-.337-.009-.517-.009s-.472.067-.719.337c-.247.27-.944.922-.944 2.25s.966 2.61 1.101 2.79c.135.18 1.902 2.904 4.607 4.067.643.277 1.145.443 1.535.566.646.205 1.234.176 1.7.106.52-.078 1.595-.652 1.82-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z"/></svg>
              <span className="hidden sm:inline">{t("WhatsApp Us", "व्हाट्सएप करें")}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Live Social Proof Ticker */}
      <div className="bg-amber-500 text-amber-950 font-medium py-2.5 px-4 overflow-hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm">
          <span className="inline-block bg-white text-amber-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md animate-pulse">LIVE</span>
          <div className="transition-opacity duration-500 ease-in-out text-center">
            {language === 'en' ? tickerItems[tickerIndex].textEn : tickerItems[tickerIndex].textHi}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={luxuryImages[currentImage]}
          alt="Luxury Stay"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-zinc-50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-16">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold leading-tight mb-4 drop-shadow-sm">
            {t("Luxury That Fits Your Wallet", "लग्ज़री जो आपकी जेब पर भारी न पड़े")}
          </h2>
          <p className="text-yellow-400 text-lg md:text-xl font-medium tracking-wide uppercase">
            {t("Curated • Personalized • Human Assisted", "क्यूरेटेड • पर्सनलाइज्ड • मानवीय सहायता")}
          </p>
        </div>
      </section>

      {/* Booking Form + Perks Estimator */}
      <section id="booking-form" className="max-w-6xl mx-auto px-4 md:px-6 -mt-36 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden">
          <div className="grid lg:grid-cols-12">
            
            {/* Form Side */}
            <div className="p-6 md:p-10 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-zinc-100">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-zinc-800">
                {t("Tell us your requirements", "अपनी जरूरतें बताएं")}
              </h3>
              
              <div className="mb-5">
                <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Where do you want to go?", "आप कहाँ जाना चाहते हैं?")}</label>
                <input 
                  name="destination" 
                  value={form.destination} 
                  onChange={handleChange}
                  placeholder={t("Destination (e.g. Goa, Rishikesh, Jaipur)", "गंतव्य (जैसे: गोवा, ऋषिकेश, जयपुर)")}
                  className={`w-full border-2 focus:outline-none focus:ring-4 rounded-xl p-3.5 text-base transition-all ${validationError ? 'border-red-400 focus:ring-red-100 focus:border-red-500' : 'border-zinc-200 focus:border-amber-500 focus:ring-amber-100'}`} 
                />
                {validationError && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1 font-medium">
                    ⚠️ {validationError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Check-In", "चेक-इन")}</label>
                  <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 rounded-xl p-3 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Check-Out", "चेक-आउट")}</label>
                  <input type="date" name="toDate" value={form.toDate} onChange={handleChange} className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 rounded-xl p-3 text-sm focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Adults (12+ yrs)", "वयस्क")}</label>
                  <select value={form.adults} onChange={(e) => handleAdultsChildren('adults', e.target.value)} className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:outline-none rounded-xl p-3.5 bg-white text-zinc-700">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Children (0-12 yrs)", "बच्चे")}</label>
                  <select value={form.children} onChange={(e) => handleAdultsChildren('children', e.target.value)} className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:outline-none rounded-xl p-3.5 bg-white text-zinc-700">
                    {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              {form.children > 0 && (
                <div className="mb-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-sm font-semibold text-zinc-600 mb-2.5">{t("Specify Children's Ages", "बच्चों की उम्र बताएं")}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {form.childAges.map((age, i) => (
                      <select key={i} value={age} onChange={(e) => updateChildAge(i, e.target.value)} className="border-2 border-zinc-200 rounded-xl p-2.5 bg-white text-sm focus:border-amber-500 focus:outline-none">
                        {[...Array(12)].map((_, idx) => <option key={idx} value={idx+1}>{idx+1} {t("yrs", "साल")}</option>)}
                      </select>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleWhatsApp}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white py-4 px-6 rounded-xl text-lg font-bold hover:opacity-95 transition-all shadow-xl shadow-amber-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>🚀 {t("Connecting...", "कनेक्ट हो रहा है...")}</span>
                ) : (
                  <>
                    <span>💬 {t("Get Vetted Options on WhatsApp", "व्हाट्सएप पर बेहतरीन विकल्प प्राप्त करें")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Live Perks Estimator Side */}
            <div className="p-6 md:p-10 lg:col-span-5 bg-gradient-to-b from-zinc-50 to-zinc-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💰</span>
                  <h4 className="font-serif font-bold text-xl text-zinc-800">{t("Live Luxury Perk Matcher", "लाइव लग्जरी पर्क मैचर")}</h4>
                </div>
                <p className="text-sm text-zinc-500 mb-6">{t("Slide to set your target budget per day to preview custom concierge privileges.", "कस्टमाइज़्ड सुख-सुविधाओं को देखने के लिए अपना दैनिक बजट स्लाइड करें।")}</p>

                <div className="mb-6 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{t("BUDGET PER ROOM / NIGHT", "प्रति कमरा / रात का बजट")}</span>
                    <span className="text-2xl font-black text-amber-600">₹{form.budgetPerDay.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="4000" 
                    max="25000" 
                    step="500"
                    value={form.budgetPerDay} 
                    onChange={handleSliderChange} 
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-zinc-100 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-zinc-400 mt-2">
                    <span>₹4,000</span>
                    <span>₹12,000</span>
                    <span>₹25,000+</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs uppercase tracking-wide">
                    ✨ {currentPerkPackage.tier}
                  </div>
                  <h5 className="text-sm font-bold text-zinc-700 pt-2">{t("Inclusions You Can Expect:", "अपेक्षित शामिल सुविधाएं:")}</h5>
                  <ul className="space-y-2.5">
                    {currentPerkPackage.perks.map((perk, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-zinc-600 text-sm font-medium">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-200 text-xs text-zinc-400 font-medium italic">
                💡 {t("Note: Actual inclusions adapt perfectly depending on the chosen hotel property and dynamic vacancy timelines.", "नोट: वास्तविक शामिल सुविधाएं चुनी गई होटल प्रॉपर्टी और समय के अनुसार बदल सकती हैं।")}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-24">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4">💎</div>
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("Zero Hidden Margins", "जीरो हिडन मार्जिन")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("Completely transparent pricing model. You pay actual dynamic hotel corporate rates directly.", "पूरी तरह से पारदर्शी मूल्य निर्धारण। आप सीधे वास्तविक होटल दरों पर भुगतान करते हैं।")}</p>
          </div>
          <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4">🛡️</div>
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("100% Quality Audited", "100% क्वालिटी ऑडिटेड")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("We strictly propose verified premium stays passing stringent hygiene, safety, and service logs.", "हम केवल कड़े स्वच्छता, सुरक्षा और सेवा मानदंडों को पास करने वाले होटल ही सुझाते हैं।")}</p>
          </div>
          <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4">🤝</div>
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("24/7 On-Trip Concierge", "24/7 ऑन-ट्रिप सहायता")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("Your personal friend assistance channel remains active from check-in right until absolute checkout.", "आपका व्यक्तिगत मित्र सहायता चैनल चेक-इन से लेकर चेक-आउट तक सक्रिय रहता है।")}</p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Experience Timeline */}
      <section className="bg-zinc-100/70 border-y border-zinc-200/50 py-20 px-4 md:px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-3">{t("How StaySaathi Works", "StaySaathi कैसे काम करता है")}</h3>
            <p className="text-zinc-500 font-medium">{t("No endless scrolling, no automated bots. Seamless human-assisted bespoke bookings.", "कोई अंतहीन स्क्रॉलिंग नहीं, कोई स्वचालित बॉट नहीं। निर्बाध मानव-सहायता प्राप्त बुकिंग।")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">1</span>
              <div className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("TAKES 30 SECONDS", "30 सेकंड का समय")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Share Preferences", "अपनी पसंद साझा करें")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Fill out your specific group size and comfortable daily budget parameters above and trigger WhatsApp connect.", "ऊपर अपने समूह का आकार और आरामदायक दैनिक बजट दर्ज करें और व्हाट्सएप पर कनेक्ट करें।")}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">2</span>
              <div className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("WITHIN 29 MINUTES", "29 मिनट के भीतर")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Receive Mini-Brochure", "मिनी-ब्रोशर प्राप्त करें")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Our dedicated destination expert filters local logs and delivers 3 tailored top-tier hotel options matching your exact vibe.", "हमारा समर्पित विशेषज्ञ स्थानीय स्तर पर फ़िल्टर करता है और आपके वाइब से मेल खाने वाले 3 चुनिंदा विकल्प प्रदान करता है।")}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">3</span>
              <div className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("SEAMLESS PRIVILEGES", "निर्बाध विशेषाधिकार")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Secure VIP Tariffs", "वीआईपी टैरिफ सुरक्षित करें")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Choose your favorite stay option. We secure exclusive platform discounts and add-on privileges directly for your room entry.", "अपना पसंदीदा विकल्प चुनें। हम सीधे आपके रूम एंट्री के लिए विशेष छूट और एड-ऑन विशेषाधिकार सुरक्षित करते हैं।")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-2">{t("Popular Indian Escapes", "लोकप्रिय भारतीय गंतव्य")}</h3>
          <p className="text-zinc-500 font-medium">{t("Handpicked properties loved extensively by luxury travelers across the subcontinent.", "भारतीय उपमहाद्वीप के लक्जरी यात्रियों द्वारा व्यापक रूप से पसंद की गई चुनिंदा संपत्तियां।")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {popularDestinations.map((dest, i) => (
            <div 
              key={i} 
              onClick={() => {
                setForm(prev => ({ ...prev, destination: dest.name }));
                if (validationError) setValidationError('');
                const element = document.getElementById('booking-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-60 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <div className="absolute top-4 right-4 bg-white/95 text-2xl w-11 h-11 flex items-center justify-center rounded-xl shadow-md">{dest.emoji}</div>
              </div>
              <div className="p-5">
                <h4 className="text-xl font-bold text-zinc-800 mb-1">{dest.name}</h4>
                <p className="text-amber-600 font-semibold text-sm">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Stay Collections (Themes) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-2">{t("Browse by Travel Vibe", "वाइब के अनुसार ब्राउज़ करें")}</h3>
          <p className="text-zinc-500 font-medium">{t("Select an experiential theme collection to streamline your personal holiday search setup.", "अपनी व्यक्तिगत अवकाश खोज को आसान बनाने के लिए एक थीम चुनें।")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelThemes.map((theme, i) => (
            <div 
              key={i}
              onClick={() => {
                setForm(prev => ({ ...prev, destination: language === 'en' ? theme.titleEn : theme.titleHi }));
                if (validationError) setValidationError('');
                const element = document.getElementById('booking-form');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-zinc-100"
            >
              <img src={theme.img} alt={theme.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 bg-amber-500 text-black font-bold text-[10px] uppercase rounded mb-2 tracking-wider">
                  {theme.tag}
                </span>
                <h4 className="text-lg font-bold tracking-tight">{language === 'en' ? theme.titleEn : theme.titleHi}</h4>
                <p className="text-white/80 text-xs mt-0.5 font-medium">{language === 'en' ? theme.descEn : theme.descHi}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="bg-gradient-to-b from-zinc-50 to-zinc-100 border-t border-zinc-200 py-20 px-4 md:px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-2">{t("Stories From Verified Saathis", "वेरिफाइड यात्रियों के अनुभव")}</h3>
            <p className="text-zinc-500 font-medium">{t("See how premium Indian travelers bypass automated stress using our boutique desk.", "देखें कि कैसे प्रीमियम भारतीय यात्री हमारे बुटीक डेस्क का उपयोग करके तनावमुक्त बुकिंग करते हैं।")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 text-sm leading-relaxed italic">
                "{t("Saved me nearly 4 hours of toxic review sorting across typical travel websites. The property suggested in Goa had pristine private access beaches perfect for my family layout.", "मुझे विभिन्न यात्रा वेबसाइटों पर घंटों समीक्षाएं छांटने से बचाया। गोवा में जो प्रॉपर्टी सुझाई गई थी, उसमें हमारे परिवार के लिए एकदम सही प्राइवेट बीच एक्सेस था।")}"
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-9 h-9 bg-amber-100 text-amber-800 font-bold rounded-full flex items-center justify-center text-sm">RK</div>
                <div>
                  <h5 className="text-sm font-bold text-zinc-800">Rohan Kapoor</h5>
                  <p className="text-zinc-400 text-xs font-semibold uppercase">{t("Traveled to Goa", "गोवा की यात्रा की")}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 text-sm leading-relaxed italic">
                "{t("I was highly hesitant regarding the absolute legitimacy at start. But StaySaathi directly managed room-type matching options and secured an automatic suite upgrade at Jaipur. Impeccable execution.", "शुरुआत में मैं थोड़ा हिचकिचा रही थी। लेकिन StaySaathi ने सीधे रूम-टाइप मैचिंग का प्रबंधन किया और जयपुर में एक ऑटोमैटिक सुइट अपग्रेड सुनिश्चित किया। बेहतरीन अनुभव।")}"
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-9 h-9 bg-amber-100 text-amber-800 font-bold rounded-full flex items-center justify-center text-sm">MS</div>
                <div>
                  <h5 className="text-sm font-bold text-zinc-800">Meera Sharma</h5>
                  <p className="text-zinc-400 text-xs font-semibold uppercase">{t("Traveled to Jaipur", "जयपुर की यात्रा की")}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 text-sm leading-relaxed italic">
                "{t("Traveling with a toddler and a pet dog is historically chaotic. StaySaathi hand-screened resorts in Rishikesh that welcomed pets with open arms and clean lawns. Highly recommended companion service.", "एक छोटे बच्चे और पालतू कुत्ते के साथ यात्रा करना हमेशा से चुनौतीपूर्ण रहा है। StaySaathi ने ऋषिकेश में ऐसे रिसॉर्ट्स चुने जहां पालतू जानवरों का खुले दिल से स्वागत किया गया।")}"
              </p>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-9 h-9 bg-amber-100 text-amber-800 font-bold rounded-full flex items-center justify-center text-sm">DV</div>
                <div>
                  <h5 className="text-sm font-bold text-zinc-800">Dr. Divya Verma</h5>
                  <p className="text-zinc-400 text-xs font-semibold uppercase">{t("Traveled to Rishikesh", "ऋषिकेश की यात्रा की")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 mb-16">
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10 text-zinc-800">{t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}</h3>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("How does booking payment execution work?", "पेमेंट निष्पादन कैसे काम करता है?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("You process all direct settlement payments securely directly to the specific chosen hotel property endpoint or their approved official localized distribution portals.", "आप सभी सीधे भुगतान सुरक्षित रूप से सीधे चुने गए होटल प्रॉपर्टी को या उनके स्वीकृत आधिकारिक पोर्टल पर करते हैं।")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("Is StaySaathi an independent standalone hotel asset?", "क्या StaySaathi एक स्वतंत्र होटल संपत्ति है?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("No. StaySaathi serves directly as a high-end personal human-assisted travel boutique curation platform designed to bridge personalized premium property matches for consumers.", "नहीं। StaySaathi एक प्रीमियम मानव-सहायता प्राप्त ट्रैवल बुटीक क्यूरेशन प्लेटफॉर्म के रूप में काम करता है जो उपभोक्ताओं के लिए व्यक्तिगत प्रीमियम प्रॉपर्टी मैच प्रदान करता है।")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("Can I structure custom modifications entirely via WhatsApp channels?", "क्या मैं व्हाट्सएप चैनलों के माध्यम से कस्टम संशोधन कर सकता हूं?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("Absolutely! WhatsApp serves as our flagship lightning-fast assistance highway where you talk live with real human experts without passing robot prompt queues.", "बिल्कुल! व्हाट्सएप हमारा सबसे तेज़ सहायता मार्ग है जहां आप रोबोट कतारों को पार किए बिना सीधे वास्तविक मानव विशेषज्ञों से लाइव बात करते हैं।")}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-100 py-12 px-4 md:px-6 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
            <span className="text-2xl font-serif font-bold tracking-tight">StaySaathi</span>
          </div>
          <p className="opacity-75 text-sm font-medium">Assistance Hours: 9 AM – 7 PM IST</p>
          <div className="w-16 h-0.5 bg-zinc-800 mx-auto my-6" />
          <p className="text-xs opacity-50 max-w-xl mx-auto leading-relaxed">
            Curated & Personalized Premium Hotel Assistance • Pay Directly to Property Operations. All rights reserved. © 2026 StaySaathi Desk.
          </p>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

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
    budgetPerDay: 8000, 
  });

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4500);
    return () => clearInterval(bgTimer);
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

  // Tier-2 & Tier-3 Friendly Core Assurances
  const familyAssurances = [
    {
      icon: "🥗",
      titleEn: "Nearby famous places and restaurants",
      titleHi: "आसपास के प्रसिद्ध स्थान और रेस्टोरेंट",
      descEn: "We filter hotels as per family requirement of famous places and  highly-rated family restaurants located right nearby.",
      descHi: "हम प्रसिद्ध स्थानों और पास ही में स्थित हाई-रेटेड फैमिली रेस्टोरेंट के पास आपकी पारिवारिक आवश्यकताओं के अनुसार होटल ढूंढते हैं।"
    },
    {
      icon: "👵",
      titleEn: "Children Friendly",
      titleHi: "बच्चों के अनुकूल",
      descEn: "We filter hotels basis children needs of open spaces to play",
      descHi: "हम बच्चों की ज़रूरतों के हिसाब से ऐसे होटल चुनते हैं जहाँ उनके खेलने के लिए खुले और बड़े मैदान (ओपन स्पेस) हों।"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      titleEn: "Joint Family & Group Stays",
      titleHi: "संयुक्त परिवार और ग्रुप बुकिंग",
      descEn: "Perfect connected rooms, adjacent layouts, and special direct group discounts for family reunions or celebrations.",
      descHi: "बड़े परिवारों के लिए एक साथ पास-पास कमरे, उत्सवों के लिए विशेष कस्टमाइज़्ड ग्रुप रेट्स।"
    }
  ];

  // Dynamic Perks Engine
  const getPerksByBudget = (budget) => {
    if (budget < 6000) {
      return {
        tier: t("Boutique Premium Stay", "प्रीमियम बजट स्टे"),
        perks: [t("3★/4★ Family Vetted Properties", "परिवार के लिए जांची-परखी 3★/4★ होटल"), t("Complimentary Hot Breakfast", "गर्म और स्वादिष्ट मुफ़्त नाश्ता"), t("Highly Clean & Safe Bathrooms", "साफ-सुथरे और सुरक्षित वॉशरूम्स")]
      };
    } else if (budget < 12000) {
      return {
        tier: t("Elite Premium Resort", "प्रीमियम फैमिली रिसॉर्ट"),
        perks: [t("High-rated 4★ / 5★ Resorts", "शानदार 4★ / 5★ रिसॉर्ट्स और होटल्स"), t("Free Room Upgrade (Subject to vacancy)", "कमरे के अपग्रेड होने की पूरी संभावना"), t("Early Check-in Priority for Families", "परिवारों के लिए जल्दी चेक-इन प्राथमिकता"), t("Direct Assistant Support", "समर्पित साथी फोन गाइड सहायता")]
      };
    } else {
      return {
        tier: t("Ultra-Luxury & Palaces", "अति-लग्जरी और पैलेस"),
        perks: [t("Iconic 5★ Luxury Brands & Villas", "मशहूर 5★ लग्जरी ब्रांड्स और राजसी विला"), t("Private Plunge Pool / Infinity Pool Access", "प्राइवेट पूल और बच्चों के अनुकूल वॉटर प्ले एरिया"), t("Curated Fresh Meals Included", "ताजा और कस्टमाइज़्ड भोजन व्यवस्था शामिल"), t("VIP Welcome & Luggage Handling", "वीआईपी सत्कार और सामान ले जाने की खास सुविधा")]
      };
    }
  };

  const currentPerkPackage = getPerksByBudget(form.budgetPerDay);

  const popularDestinations = [
    { name: "Goa", emoji: "🏖️", desc: t("Beaches & Vibes", "समुद्र तट और मस्ती"), image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80" },
    { name: "Jaipur", emoji: "🏰", desc: t("Royal Heritage", "शाही किला और विरासत"), image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80" },
    { name: "Manali", emoji: "🏔️", desc: t("Mountains", "पहाड़ और ठंडी वादियां"), image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" },
    { name: "Rishikesh", emoji: "🪷", desc: t("Yoga & Adventure", "पवित्र गंगा घाट और शांति"), image: "https://images.unsplash.com/photo-1603867106100-0d2039fc8757?auto=format&fit=crop&q=80&w=800" },
    { name: "Kerala", emoji: "🌴", desc: t("Backwaters", "हरे-भरे नारियल के पेड़ और पानी"), image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80" },
    { name: "Leh Ladakh", emoji: "⛰️", desc: t("Adventure", "रोमांचक पहाड़ी रास्ते"), image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" }
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
                  placeholder={t("Destination (e.g. Manali, Goa, Rishikesh, Jaipur)", "गंतव्य (जैसे: मनाली, गोवा, ऋषिकेश, जयपुर)")}
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
                    <span>💬 {t("Get best prices Options on WhatsApp", "व्हाट्सएप पर बेहतरीन विकल्प प्राप्त करें")}</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Budget Perks Estimator Side */}
            <div className="p-6 md:p-10 lg:col-span-5 bg-gradient-to-b from-zinc-50 to-zinc-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💰</span>
                  <h4 className="font-serif font-bold text-xl text-zinc-800">{t("Live Luxury Perk Matcher", "लाइव होटल सुविधा मैचर")}</h4>
                </div>
                <p className="text-sm text-zinc-500 mb-6">{t("Slide to set your target budget per day to preview custom hotel privileges.", "सुविधाओं को देखने के लिए अपना दैनिक बजट आगे-पीछे स्लाइड करें।")}</p>

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
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("Zero Hidden Margins", "जीरो हिडन चार्जेस")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("Completely transparent model. You get actual dynamic hotel tariffs without hidden agents cuts.", "पूरी तरह से पारदर्शी मूल्य निर्धारण। बिना किसी छिपे हुए अतिरिक्त कमीशन के सीधे बुकिंग।")}</p>
          </div>
          <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4">🛡️</div>
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("100% Quality Audited", "100% परखी हुई होटल्स")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("We strictly propose family-safe stays passing hygiene, safety, and hospitality audits.", "हम केवल उन होटल्स की सिफारिश करते हैं जो साफ-सफाई और पारिवारिक सुरक्षा मानकों पर खरे उतरते हैं।")}</p>
          </div>
          <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl mb-4">📞</div>
            <h4 className="text-lg font-bold text-zinc-800 mb-1">{t("9 AM - 7 PM Active Support", "9 AM से 7 PM पक्की सहायता")}</h4>
            <p className="text-sm text-zinc-500 max-w-xs">{t("We are available daily from 9:00 AM to 7:00 PM to handle all requests.", "हम आपकी सभी ज़रूरतों और बुकिंग के लिए रोज़ाना सुबह 9:00 बजे से शाम 7:00 बजे तक उपलब्ध हैं।")}</p>
          </div>
        </div>
      </section>

      {/* Family-First Assurances (Highly Appreciated in Tier 2 / Tier 3) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="bg-amber-50/60 rounded-3xl border border-amber-200/50 p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-3xl">👨‍👩‍👧‍👦</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-800 mt-2 mb-3">
              {t("Vetted Specially for Indian Families", "भारतीय परिवारों के लिए खास सुविधाएं")}
            </h3>
            <p className="text-zinc-600 text-sm font-medium">
              {t("We understand that a perfect family trip requires more than just a room. We take special care of your specific household needs.", "हम समझते हैं कि परिवार के साथ यात्रा करने में क्या महत्वपूर्ण होता है। हम आपकी हर जरूरत का पूरा ख्याल रखते हैं।")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {familyAssurances.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex flex-col items-start">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h4 className="text-lg font-bold text-zinc-800 mb-2">
                  {language === 'en' ? item.titleEn : item.titleHi}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {language === 'en' ? item.descEn : item.descHi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Experience Timeline */}
      <section className="bg-zinc-100/70 border-y border-zinc-200/50 py-20 px-4 md:px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-3">{t("How StaySaathi Works", "StaySaathi कैसे काम करता है")}</h3>
            <p className="text-zinc-500 font-medium">{t("No endless searching, no automated bots. Direct helpful human assisted booking.", "कोई अंतहीन उलझन नहीं, कोई ऑटोमैटिक रोबोटिक रिप्लाई नहीं। पक्की मानवीय सहायता।")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">1</span>
              <div className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("TAKES 30 SECONDS", "30 सेकंड का समय")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Share Preferences", "अपनी पसंद बताएं")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Fill out your specific family requirements and budget parameters above and click WhatsApp connect.", "ऊपर अपनी जरूरतें और मनमुताबिक बजट दर्ज करें और व्हाट्सएप बटन दबाएं।")}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">2</span>
              <div className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("WITHIN 2 HOURS", "2 घंटे के भीतर")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Receive Custom Options", "होटल विकल्प पाएं")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Our destination helper filters clean local properties and delivers 3 best tailored hotel choices to your chat.", "हमारे लोकल एक्सपर्ट सबसे सुरक्षित और बेहतरीन 3 विकल्प आपके व्हाट्सएप पर भेजेंगे।")}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm relative border border-zinc-200/40">
              <span className="absolute -top-5 left-6 bg-gradient-to-br from-amber-500 to-yellow-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">3</span>
              <div className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("SEAMLESS BOOKING", "आसान बुकिंग")}</div>
              <h4 className="text-lg font-bold text-zinc-800 mb-2">{t("Pay Safely Direct", "सुरक्षित भुगतान करें")}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{t("Select your preferred stay. Pay directly to the hotel or verified portal link securely with no hidden platform fees.", "पसंदीदा होटल चुनें और बिना किसी अतिरिक्त छिपे शुल्क के सीधे होटल के माध्यम से सुरक्षित भुगतान करें।")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-2">{t("Popular Indian Escapes", "लोकप्रिय भारतीय गंतव्य")}</h3>
          <p className="text-zinc-500 font-medium">{t("Handpicked destinations loved extensively by Indian families and travelers alike.", "भारतीय परिवारों और यात्रियों द्वारा सबसे ज्यादा पसंद किए जाने वाले चुनिंदा स्थान।")}</p>
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

      {/* Premium Testimonials Section */}
      <section className="bg-gradient-to-b from-zinc-50 to-zinc-100 border-t border-zinc-200 py-20 px-4 md:px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mb-2">{t("Stories From Verified Saathis", "हमारे खुश यात्रियों के अनुभव")}</h3>
            <p className="text-zinc-500 font-medium">{t("See how families and groups travel hassle-free across India with our personalized support.", "देखें कैसे भारतीय परिवार हमारे व्यक्तिगत सहयोग से बिना किसी तनाव के सुखद यात्रा करते हैं।")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm flex flex-col justify-between">
              <p className="text-zinc-600 text-sm leading-relaxed italic">
                "{t("Saved me nearly 4 hours of reading fake reviews on booking apps. The property suggested in Goa was very decent, safe, and located right near a clean beach. Perfect for my family.", "बुकिंग एप्स पर घंटों झूठे रिव्यूज पढ़ने से बच गए। गोवा में जो होटल सुझाया गया था वह बेहद पारिवारिक, सुरक्षित और साफ बीच के करीब था।")}"
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
                "{t("I was highly hesitant about online sites at first. But StaySaathi directly managed room-type matching options, extra bed for child, and guided us directly on WhatsApp with pure vegetarian restaurant locations.", "पहले मैं संकोच कर रही थी, लेकिन इन्होंने व्हाट्सएप पर ही हमारी मनपसंद शुद्ध शाकाहारी भोजन व्यवस्था वाले होटल के साथ शानदार कमरा बुक करवा दिया। बहुत ही भरोसेमंद।")}"
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
                "{t("Traveling with elderly parents can be stressful because they cannot walk much. They selected a property in Rishikesh with perfect elevator access and rooms on lower floors. Incredible human touch.", "बुजुर्ग माता-पिता के साथ यात्रा करना कठिन होता है क्योंकि वे ज्यादा चल नहीं सकते। इन्होंने ऋषिकेश में लिफ्ट सुविधा और ग्राउंड फ्लोर वाला बेहतरीन होटल ढूंढकर दिया।")}"
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
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("How does booking payment execution work?", "पेमेंट का भुगतान कैसे होता है?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("For complete financial safety, you pay directly to the verified chosen hotel property or through their official verified secure payment gateway links.", "पूर्ण वित्तीय सुरक्षा के लिए, आप सभी भुगतानों को सीधे चुने गए होटल को या उनके आधिकारिक सुरक्षित पेमेंट लिंक के माध्यम से ही पूरा करते हैं।")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("Are there any hidden platform assistance fees?", "क्या इसके लिए कोई छिपी हुई फीस ली जाती है?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("No, our assistance service is completely free of charge for travelers. We partner directly with property operators to secure customized perks for our community.", "नहीं, हमारी सहायता सेवा यात्रियों के लिए पूरी तरह से निःशुल्क है। हम होटल्स के साथ सीधे जुड़कर आपके लिए खास रियायतें तय करते हैं।")}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/60 shadow-sm">
            <strong className="text-base md:text-lg text-zinc-800 block">❓ {t("Can I call and speak to a real person directly?", "क्या मैं सीधे फोन पर बात कर सकता हूँ?")}</strong>
            <p className="mt-2.5 text-zinc-600 text-sm leading-relaxed">{t("Yes! Between 9:00 AM and 7:00 PM daily, you will connect directly with real travel assistant curators on WhatsApp or calls, with no automated robots or complex chatbot loops.", "जी हाँ! रोज सुबह 9 बजे से शाम 7 बजे के बीच आप व्हाट्सएप या कॉल पर सीधे हमारे विशेषज्ञ मार्गदर्शक से बात कर सकते हैं। कोई रोबोटिक या परेशान करने वाले बॉट सिस्टम नहीं हैं।")}</p>
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
            Curated & Personalized Premium Family Hotel Assistance • Pay Directly to Vetted Hotel Operations. All rights reserved. © 2026 StaySaathi Desk.
          </p>
        </div>
      </footer>
    </div>
  );
}

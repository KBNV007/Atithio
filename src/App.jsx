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
    budgetPerDay: '8000', 
  });

  const [filters, setFilters] = useState({
    hotel: false,
    resort: false,
    homestay: false,
    hostel: false,
    // Essential Amenities
    parking: false,
    kidsPlay: false,
    pool: false,
    wifi: false,
    // Room Types
    doubleRoom: false,
    familyRoom: false,
    balcony: false,
    bathtub: false,
    petsAllowed: false,
    bunkBed: false,
    // Meal Plan selection
    mealPlan: '', // 'breakfast', 'halfBoard' (B+L/D), 'fullBoard' (B+L+D)
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

  const handleFilterToggle = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMealPlanToggle = (plan) => {
    setFilters(prev => ({ ...prev, mealPlan: prev.mealPlan === plan ? '' : plan }));
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

    // Compile Stay Types including Hostels
    const selectedStayTypes = [];
    if (filters.hotel) selectedStayTypes.push("Hotel / होटल");
    if (filters.resort) selectedStayTypes.push("Resort / रिसॉर्ट");
    if (filters.homestay) selectedStayTypes.push("Homestay / होमस्टे");
    if (filters.hostel) selectedStayTypes.push("Hostel / हॉस्टल");
    const stayTypesText = selectedStayTypes.length > 0 
      ? `\n🏠 *Stay Type:* ${selectedStayTypes.join(', ')}` 
      : '';

    // Compile Essential Amenities
    const selectedAmenities = [];
    if (filters.parking) selectedAmenities.push("🚗 Safe Parking / सुरक्षित पार्किंग");
    if (filters.kidsPlay) selectedAmenities.push("🧸 Kids Play Area / खेलने की जगह");
    if (filters.pool) selectedAmenities.push("🏊‍♂️ Swimming Pool / स्विमिंग पूल");
    if (filters.wifi) selectedAmenities.push("📶 Free High-speed Wi-Fi / हाई-स्पीड वाई-फाई");
    const amenitiesText = selectedAmenities.length > 0 
      ? `\n⭐ *Amenities:* \n${selectedAmenities.map(item => `- ${item}`).join('\n')}` 
      : '';

    // Compile Room Types
    const selectedRoomTypes = [];
    if (filters.doubleRoom) selectedRoomTypes.push("Double Room / डबल रूम");
    if (filters.familyRoom) selectedRoomTypes.push("Family Room / फैमिली रूम");
    if (filters.balcony) selectedRoomTypes.push("Balcony / बालकनी");
    if (filters.bathtub) selectedRoomTypes.push("Bathtub / बाथटब");
    if (filters.petsAllowed) selectedRoomTypes.push("Pets Allowed / पेट्स अनुकूल");
    if (filters.bunkBed) selectedRoomTypes.push("Bunk Bed / बंक बेड");
    const roomTypesText = selectedRoomTypes.length > 0 
      ? `\n🛏️ *Room Preferences:* ${selectedRoomTypes.join(', ')}` 
      : '';

    // Compile Meal Plans
    let mealPlanText = '';
    if (filters.mealPlan === 'breakfast') {
      mealPlanText = `\n🍳 *Meal Preference:* Including Breakfast / नाश्ता शामिल`;
    } else if (filters.mealPlan === 'halfBoard') {
      mealPlanText = `\n🍛 *Meal Preference:* Breakfast + Lunch/Dinner / नाश्ता + दोपहर/रात का भोजन`;
    } else if (filters.mealPlan === 'fullBoard') {
      mealPlanText = `\n🍲 *Meal Preference:* Breakfast + Lunch + Dinner / तीनों समय का भोजन`;
    }

    const budgetFormatted = form.budgetPerDay === '20000' ? '₹15,000+' : `₹${form.budgetPerDay}`;

    const msg = `*Premium Hotel Enquiry - StaySaathi*\n\n` +
      `📍 Destination: ${form.destination}\n` +
      `📅 From: ${form.fromDate || 'Flexible'}\n` +
      `📅 Till: ${form.toDate || 'Flexible'}\n` +
      `👨‍👩‍👧 Adults: ${form.adults}\n` +
      `👦 ${childInfo}\n` +
      `💰 Budget: ${budgetFormatted} per room/day` +
      `${stayTypesText}` +
      `${amenitiesText}` +
      `${roomTypesText}` +
      `${mealPlanText}\n\n` +
      `Please suggest the best matching options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  const familyAssurances = [
    {
      icon: "🥗",
      titleEn: "Nearby famous places and restaurants",
      titleHi: "आसपास के प्रसिद्ध स्थान और रेस्टोरेंट",
      descEn: "We filter hotels as per family requirement of famous places and highly-rated family restaurants located right nearby.",
      descHi: "हम प्रसिद्ध स्थानों और पास ही में स्थित हाई-रेटेड फैमिली रेस्टोरेंट के पास आपकी पारिवारिक आवश्यकताओं के अनुसार होटल ढूंढते हैं।"
    },
    {
      icon: "🧸",
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

      {/* Booking Form + Stay Type & Amenities Filters */}
      {}
      <section id="booking-form" className="max-w-6xl mx-auto px-4 md:px-6 -mt-36 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden">
          <div className="p-6 md:p-10 border-b border-zinc-100 bg-amber-50/50">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-800">
              {t("Plan Your Perfect Vacation", "अपनी मनपसंद छुट्टी की योजना बनाएं")}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              {t("Fill in your requirements and customize your stay preferences below.", "नीचे अपनी जरूरतें भरें और रहने की पसंदीदा सुविधाओं को चुनें।")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-y-8">
            {/* Form Side */}
            <div className="p-6 md:p-10 lg:col-span-7 lg:border-r border-zinc-100">
              <h4 className="text-lg font-bold text-zinc-800 mb-5 pb-2 border-b border-zinc-100">
                📍 {t("1. Basic Details", "1. मुख्य विवरण")}
              </h4>
              
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

              <div className="grid grid-cols-2 gap-4 mb-5">
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

              <div className="mb-6">
                <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{t("Budget per room / day", "प्रति कमरा / रात का बजट")}</label>
                <select name="budgetPerDay" value={form.budgetPerDay} onChange={handleChange} className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:outline-none rounded-xl p-3.5 bg-white text-zinc-700">
                  <option value="4000">₹2,000 - ₹4,000 ({t("Budget Standard", "बजट होटल")})</option>
                  <option value="8000">₹4,000 - ₹8,000 ({t("Family Standard Premium", "प्रीमियम फैमिली स्टे")})</option>
                  <option value="12000">₹8,000 - ₹15,000 ({t("Luxury Resort", "शानदार लग्जरी रिसॉर्ट")})</option>
                  <option value="20000">₹15,000+ ({t("Ultra-Luxury/Villas", "अति-लग्जरी पैलेस / विला")})</option>
                </select>
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
            </div>

            {/* Preferred Amenities & Filters Side */}
            {}
            <div className="p-6 md:p-10 lg:col-span-5 bg-gradient-to-b from-zinc-50 to-zinc-100 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-zinc-800 mb-5 pb-2 border-b border-zinc-200">
                  ⭐ {t("2. Stay & Room Preferences", "2. रहने का प्रकार और सुविधाएं")}
                </h4>

                {/* Preferred Stay Types Group */}
                <div className="mb-5">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5">{t("Preferred Stay Type", "रहने का पसंदीदा प्रकार")}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleFilterToggle('hotel')}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border-2 transition-all ${filters.hotel ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      🏨 {t("Hotels", "होटल्स")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('resort')}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border-2 transition-all ${filters.resort ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      🏖️ {t("Resorts", "रिसॉर्ट्स")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('homestay')}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border-2 transition-all ${filters.homestay ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      🏡 {t("Homestays", "होमस्टे")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('hostel')}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border-2 transition-all ${filters.hostel ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      🎒 {t("Hostels", "हॉस्टल्स")}
                    </button>
                  </div>
                </div>

                {/* Essential Amenities List */}
                <div className="mb-5">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{t("Essential Amenities", "आवश्यक सुविधाएं")}</h5>
                  
                  <div className="space-y-2">
                    {/* Safe Parking Option */}
                    <label 
                      onClick={() => handleFilterToggle('parking')}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all ${filters.parking ? 'bg-amber-50/70 border-amber-500' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🚗</span>
                        <div>
                          <span className="block text-xs font-semibold text-zinc-800">{t("Safe Parking Available", "सुरक्षित पार्किंग व्यवस्था")}</span>
                          <span className="block text-[9px] text-zinc-500">{t("Protected parking spot for your car", "आपकी गाड़ी के लिए सुरक्षित पार्किंग स्थान")}</span>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.parking ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-300'}`}>
                        {filters.parking && <span className="text-[8px] font-bold">✓</span>}
                      </div>
                    </label>

                    {/* Kids Play Area Option */}
                    <label 
                      onClick={() => handleFilterToggle('kidsPlay')}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all ${filters.kidsPlay ? 'bg-amber-50/70 border-amber-500' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🧸</span>
                        <div>
                          <span className="block text-xs font-semibold text-zinc-800">{t("Kids Play Area / Garden", "बच्चों के खेलने की खुली जगह")}</span>
                          <span className="block text-[9px] text-zinc-500">{t("Safe lawn and recreation for toddlers", "बच्चों के लिए पार्क व खेलने की सुरक्षित जगह")}</span>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.kidsPlay ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-300'}`}>
                        {filters.kidsPlay && <span className="text-[8px] font-bold">✓</span>}
                      </div>
                    </label>

                    {/* Swimming Pool Option */}
                    <label 
                      onClick={() => handleFilterToggle('pool')}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all ${filters.pool ? 'bg-amber-50/70 border-amber-500' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">🏊‍♂️</span>
                        <div>
                          <span className="block text-xs font-semibold text-zinc-800">{t("Swimming Pool Access", "स्विमिंग पूल की सुविधा")}</span>
                          <span className="block text-[9px] text-zinc-500">{t("Clean active swimming pool on property", "होटल परिसर में स्वच्छ और सुंदर स्विमिंग पूल")}</span>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.pool ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-300'}`}>
                        {filters.pool && <span className="text-[8px] font-bold">✓</span>}
                      </div>
                    </label>

                    {/* Wifi / Internet Option */}
                    <label 
                      onClick={() => handleFilterToggle('wifi')}
                      className={`flex items-center justify-between p-2.5 rounded-xl border-2 cursor-pointer transition-all ${filters.wifi ? 'bg-amber-50/70 border-amber-500' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">📶</span>
                        <div>
                          <span className="block text-xs font-semibold text-zinc-800">{t("Free High-speed Wi-Fi", "मुफ़्त हाई-स्पीड वाई-फाई")}</span>
                          <span className="block text-[9px] text-zinc-500">{t("Fast internet connection across rooms", "कमरों और परिसर में तेज़ इंटरनेट की सुविधा")}</span>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${filters.wifi ? 'border-amber-500 bg-amber-500 text-white' : 'border-zinc-300'}`}>
                        {filters.wifi && <span className="text-[8px] font-bold">✓</span>}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Room Amenities Section */}
                <div className="mb-5">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{t("Room Amenities & Vibe", "कमरे की सुख-सुविधाएं")}</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleFilterToggle('doubleRoom')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.doubleRoom ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      🛏️ {t("Double Room", "डबल रूम")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('familyRoom')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.familyRoom ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      👨‍👩‍👧‍👦 {t("Family Room", "फैमिली रूम")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('balcony')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.balcony ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      🌅 {t("Balcony View", "बालकनी")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('bathtub')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.bathtub ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      🛁 {t("Bathtub", "बाथटब")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('petsAllowed')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.petsAllowed ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      🐾 {t("Pets Allowed", "पेट्स अनुकूल")}
                    </button>
                    <button
                      onClick={() => handleFilterToggle('bunkBed')}
                      className={`py-2 px-1 text-[11px] font-semibold rounded-xl border-2 transition-all flex items-center justify-center gap-1.5 ${filters.bunkBed ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-zinc-200 text-zinc-600'}`}
                    >
                      🛏️ {t("Bunk Bed", "बंक बेड")}
                    </button>
                  </div>
                </div>

                {/* Board / Meal Plan selection */}
                <div>
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{t("Meal Preferences (Board Plans)", "भोजन की प्राथमिकताएं")}</h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMealPlanToggle('breakfast')}
                      className={`w-full text-left p-2.5 rounded-xl border-2 text-xs font-semibold flex items-center justify-between transition-all ${filters.mealPlan === 'breakfast' ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      <span className="flex items-center gap-2">🍳 {t("Including Breakfast", "नाश्ता शामिल")}</span>
                      {filters.mealPlan === 'breakfast' && <span className="text-amber-600 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => handleMealPlanToggle('halfBoard')}
                      className={`w-full text-left p-2.5 rounded-xl border-2 text-xs font-semibold flex items-center justify-between transition-all ${filters.mealPlan === 'halfBoard' ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      <span className="flex items-center gap-2">🍛 {t("Including Breakfast + Lunch/Dinner", "नाश्ता + लंच/डिनर शामिल")}</span>
                      {filters.mealPlan === 'halfBoard' && <span className="text-amber-600 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => handleMealPlanToggle('fullBoard')}
                      className={`w-full text-left p-2.5 rounded-xl border-2 text-xs font-semibold flex items-center justify-between transition-all ${filters.mealPlan === 'fullBoard' ? 'bg-amber-100 border-amber-500 text-amber-800 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}
                    >
                      <span className="flex items-center gap-2">🍲 {t("Including Breakfast + Lunch + Dinner", "तीनों समय का भोजन शामिल")}</span>
                      {filters.mealPlan === 'fullBoard' && <span className="text-amber-600 font-bold">✓</span>}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Unified Submission Footer */}
          {}
          <div className="bg-zinc-50 border-t border-zinc-100 p-6 md:p-8 flex flex-col items-center justify-center text-center">
            <button
              onClick={handleWhatsApp}
              disabled={isSubmitting}
              className="w-full max-w-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white py-4 px-8 rounded-2xl text-lg md:text-xl font-bold hover:opacity-95 active:scale-95 transition-all shadow-xl shadow-amber-600/30 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  <span>{t("Connecting...", "कनेक्ट हो रहा है...")}</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 fill-current animate-bounce" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.633-1.025-5.101-2.89-6.968-1.866-1.867-4.348-2.895-6.983-2.896-5.442 0-9.866 4.415-9.869 9.85-.001 1.77.461 3.497 1.338 5.025l-.995 3.634 3.711-.969zm11.378-6.13c-.27-.135-1.595-.786-1.842-.876-.246-.09-.427-.135-.607.135-.18.27-.697.876-.855 1.057-.157.18-.315.202-.585.067-1.144-.572-1.928-1.008-2.693-2.316-.201-.343.201-.318.574-1.06.09-.18.045-.337-.022-.472-.067-.135-.607-1.462-.832-2.003-.219-.527-.441-.455-.607-.464-.157-.008-.337-.009-.517-.009s-.472.067-.719.337c-.247.27-.944.922-.944 2.25s.966 2.61 1.101 2.79c.135.18 1.902 2.904 4.607 4.067.643.277 1.145.443 1.535.566.646.205 1.234.176 1.7.106.52-.078 1.595-.652 1.82-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z"/>
                  </svg>
                  <span>{t("Submit to get best options on WhatsApp", "व्हाट्सएप पर बेहतरीन विकल्प पाने के लिए सबमिट करें")}</span>
                </>
              )}
            </button>
            <p className="mt-3 text-xs text-zinc-500 font-medium">
              💡 {t("No middleman fees • Your selections will instantly compile into a WhatsApp draft message.", "कोई बिचौलिया शुल्क नहीं • आपकी चुनी गई पसंदीदा सुविधाएं अपने आप व्हाट्सएप संदेश में जुड़ जाएंगी।")}
            </p>
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
              <div className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("WITHIN FEW HOURS", "कुछ घंटे के भीतर")}</div>
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

      {/* Why Us Section */}
      {}
      <section className="bg-gradient-to-b from-zinc-50 to-zinc-100 border-t border-zinc-200 py-20 px-4 md:px-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-3xl">🤝</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-zinc-800 mt-3 mb-4">
              {t("Why Choose StaySaathi?", "हम ही क्यों चुनें?")}
            </h3>
            <p className="text-zinc-600 font-medium">
              {t("We stand beside you as a true friend, ensuring your holidays are entirely stress-free and full of genuine comfort.", "हम एक सच्चे दोस्त की तरह आपके साथ खड़े हैं, ताकि आपका सफर बिना किसी तनाव और पूरी सुख-सुविधाओं के साथ पूरा हो।")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Core Point 1: Real Humans, No Robots */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/50 shadow-sm flex gap-5 hover:shadow-md transition">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 font-bold">👤</div>
              <div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2">
                  {t("Real Humans, No Confusing AI or Bots", "असली इंसानी मदद, कोई उलझाने वाले रोबोट्स नहीं")}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t("No automated robotic replies or confusing multi-search websites with fake reviews. Our dedicated destination experts handle your planning and hotel screening headache entirely.", "कोई ऑटोमैटिक रोबोटिक जवाब या उलझाने वाली ढेरों वेबसाइट्स नहीं। आपके सफर की प्लानिंग और होटल्स की बारीक से जांच करने का पूरा सिरदर्द हमारे असली एक्सपर्ट खुद लेते हैं।")}
                </p>
              </div>
            </div>

            {/* Core Point 2: Carefully Reviewed Value */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/50 shadow-sm flex gap-5 hover:shadow-md transition">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 font-bold">🔍</div>
              <div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2">
                  {t("Handpicked & Carefully Reviewed Options", "पूरी तरह परखे और जांचे गए बेहतरीन विकल्प")}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t("Get carefully hand-screened hotels that offer much better comfort, safe neighborhoods, and true value for your exact price point—none of the guesswork or fake app listings.", "अपने बजट में वो चुनिंदा होटल्स और रिसॉर्ट्स पाएं जिन्हें हमने खुद सुरक्षा और आराम के पैमानों पर परखा है। साधारण बुकिंग ऐप्स के भ्रामक वादों और अधूरी जानकारियों से बिल्कुल सुरक्षित।")}
                </p>
              </div>
            </div>

            {/* Core Point 3: Safe Direct Hotel Payments */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/50 shadow-sm flex gap-5 hover:shadow-md transition">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl shrink-0 font-bold">💳</div>
              <div>
                <h4 className="text-xl font-bold text-zinc-800 mb-2">
                  {t("Direct & Safe Hotel Payments", "सीधे और सुरक्षित भुगतान")}
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t("Enjoy complete financial peace of mind. Pay directly to the hotel's verified account or their official secure payment link with zero middleman holding risks.", "पैसों की पूरी सुरक्षा। बिना किसी बिचौलिए या अनजाने प्लेटफॉर्म के जोखिम के, सीधे होटल के वेरिफाइड बैंक खाते या सुरक्षित भुगतान लिंक पर अपना पेमेंट करें।")}
                </p>
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

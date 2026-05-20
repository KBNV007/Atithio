import { useState, useEffect } from 'react';

export default function App() {
  const whatsappNumber = '918450972317';

  const [language, setLanguage] = useState('en');
  const t = (en, hi) => language === 'en' ? en : hi;

  const luxuryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1542314831-068cd1ad952d?auto=format&fit=crop&w=1600&q=80"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    destination: '',
    fromDate: '',
    toDate: '',
    adults: 2,
    children: 0,
    childAges: [],
    budgetPerDay: '',
  });

  // Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
    if (!form.destination) {
      alert(t("Please enter destination", "कृपया गंतव्य दर्ज करें"));
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
      `💰 Budget: ₹${form.budgetPerDay || 'Not specified'} per room/day\n\n` +
      `Please suggest best options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  const popularDestinations = [
    { name: "Goa", emoji: "🏖️", desc: t("Beaches & Vibes", "समुद्र तट"), image: "https://images.unsplash.com/photo-1512343872881-5d9e2c1c2f6f?auto=format&fit=crop&w=800&q=80" },
    { name: "Jaipur", emoji: "🏰", desc: t("Royal Heritage", "शाही विरासत"), image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80" },
    { name: "Manali", emoji: "🏔️", desc: t("Mountains", "पहाड़"), image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" },
    { name: "Udaipur", emoji: "🪷", desc: t("Lakes & Romance", "झीलें"), image: "https://images.unsplash.com/photo-1580130684518-8b6d2e4c6f3a?auto=format&fit=crop&w=800&q=80" },
    { name: "Kerala", emoji: "🌴", desc: t("Backwaters", "बैकवाटर"), image: "https://images.unsplash.com/photo-1602216056096-3b6e9c0d4b8f?auto=format&fit=crop&w=800&q=80" },
    { name: "Leh Ladakh", emoji: "⛰️", desc: t("Adventure", "साहस"), image: "https://images.unsplash.com/photo-1622290291469-4f1c9c8e8b2a?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <div>
              <h1 className="text-3xl font-serif tracking-tight">StaySaathi</h1>
              <p className="text-xs text-amber-600 -mt-1">Book as a friend</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 text-sm border rounded-full hover:bg-gray-100 transition"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            <button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition"
            >
              💬 WhatsApp Us
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={luxuryImages[currentImage]}
          alt="Luxury Stay"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h2 className="text-white text-5xl md:text-6xl font-serif font-medium leading-tight mb-6">
            {t("Discover Luxury Stays in India", "भारत में लग्जरी ठहराव की खोज करें")}
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-10">
            {t("Curated • Personalized • Human Assisted", "क्यूरेटेड • पर्सनलाइज्ड • मानवीय सहायता")}
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white py-4 border-b">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium text-gray-600">
          <div>✅ Curated Booking</div>
          <div>✅ Personalized Matching</div>
          <div>✅ Pay Directly to Property</div>
          <div>✅ Real Human Assistance</div>
        </div>
      </div>

      {/* Booking Form */}
      <section id="booking-form" className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-3xl font-semibold mb-8">{t("Tell us your requirements", "अपनी जरूरतें बताएं")}</h3>
              
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder={t("Destination (City / Area)", "गंतव्य (शहर / क्षेत्र)")}
                className="w-full border border-gray-300 focus:border-amber-500 rounded-2xl p-4 text-lg mb-6"
              />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">From</label>
                  <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} className="w-full border border-gray-300 rounded-2xl p-4" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Till</label>
                  <input type="date" name="toDate" value={form.toDate} onChange={handleChange} className="w-full border border-gray-300 rounded-2xl p-4" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Budget per room per day</label>
                <input
                  name="budgetPerDay"
                  value={form.budgetPerDay}
                  onChange={handleChange}
                  placeholder="₹8000 - ₹15000"
                  className="w-full border border-gray-300 rounded-2xl p-4"
                />
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Adults</label>
                <select value={form.adults} onChange={(e) => handleAdultsChildren('adults', e.target.value)} className="w-full border border-gray-300 rounded-2xl p-4">
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Children</label>
                <select value={form.children} onChange={(e) => handleAdultsChildren('children', e.target.value)} className="w-full border border-gray-300 rounded-2xl p-4">
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {form.children > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Children's Ages</p>
                  <div className="grid grid-cols-3 gap-3">
                    {form.childAges.map((age, i) => (
                      <select key={i} value={age} onChange={(e) => updateChildAge(i, e.target.value)} className="border border-gray-300 rounded-2xl p-3">
                        {[...Array(18)].map((_, idx) => <option key={idx} value={idx+1}>{idx+1} yrs</option>)}
                      </select>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleWhatsApp}
            disabled={isSubmitting}
            className="w-full mt-10 bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-5 rounded-2xl text-xl font-medium hover:from-amber-700 hover:to-yellow-700 transition disabled:opacity-70"
          >
            {isSubmitting ? t("Opening WhatsApp...", "व्हाट्सएप खुल रहा है...") : t("Get Personalized Hotel Options on WhatsApp", "व्हाट्सएप पर पर्सनलाइज्ड होटल विकल्प प्राप्त करें")}
          </button>
        </div>
      </section>

      {/* Popular Destinations with Images */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-center text-4xl font-semibold mb-4">{t("Popular Destinations", "लोकप्रिय गंतव्य")}</h3>
        <p className="text-center text-gray-600 mb-12">{t("Loved by Indian travellers", "भारतीय यात्रियों द्वारा पसंद की गई जगहें")}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((dest, i) => (
            <div
              key={i}
              onClick={() => setForm(prev => ({ ...prev, destination: dest.name }))}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64">
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 text-3xl w-12 h-12 flex items-center justify-center rounded-2xl shadow">
                  {dest.emoji}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-semibold mb-1">{dest.name}</h4>
                <p className="text-amber-600 font-medium">{dest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-semibold text-center mb-12">{t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}</h3>
        
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow">
            <strong>{t("How does payment work?", "पेमेंट कैसे काम करता है?")}</strong>
            <p className="mt-3 text-gray-600">{t("You pay directly to the hotel or official booking provider.", "आप सीधे होटल को भुगतान करते हैं।")}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <strong>{t("Is StaySaathi a hotel?", "StaySaathi होटल है?")}</strong>
            <p className="mt-3 text-gray-600">{t("No. We are a personal hotel booking assistance service.", "नहीं। हम व्यक्तिगत होटल बुकिंग सहायता सेवा हैं।")}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow">
            <strong>{t("Can I book via WhatsApp?", "क्या WhatsApp पर बुकिंग हो सकती है?")}</strong>
            <p className="mt-3 text-gray-600">{t("Yes! WhatsApp is our fastest assistance channel.", "हाँ! WhatsApp हमारा सबसे तेज़ चैनल है।")}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold">S</div>
            <span className="text-3xl font-serif">StaySaathi</span>
          </div>
          
          <p className="opacity-75">
            {t("Assistance Hours: 9 AM – 9 PM IST", "सहायता समय: सुबह 9 बजे – रात 9 बजे IST")}
          </p>
          
          <p className="text-sm opacity-60 mt-8">
            Curated & Personalized Hotel Assistance • Pay Directly to Property
          </p>
        </div>
      </footer>
    </div>
  );
}

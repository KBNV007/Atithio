import { useState, useEffect } from 'react';

export default function App() {
  const whatsappNumber = '918450972317';

  const [language, setLanguage] = useState('en'); // 'en' or 'hi'

  const t = (en, hi) => language === 'en' ? en : hi;

  const luxuryImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80", // Luxury resort
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80", // Mountain luxury
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80", // Beach villa
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80", // Desert luxury
    "https://images.unsplash.com/photo-1542314831-068cd1ad952d?auto=format&fit=crop&w=1600&q=80"  // Palace hotel
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
    travelType: 'all'
  });

  // Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % luxuryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
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
      `💰 Budget: ₹${form.budgetPerDay || 'Not specified'} per room/day\n` +
      `🏷️ Type: ${form.travelType.toUpperCase()}\n\n` +
      `Please suggest best luxury/comfort options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900 font-sans">
      {/* Premium Header */}
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

      {/* Luxury Hero */}
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
            {t("Real human help • Personalized • Trusted", "सच्ची मानवीय मदद • व्यक्तिगत • भरोसेमंद")}
          </p>
          
          <button
            onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-black px-10 py-4 rounded-2xl text-lg font-medium hover:bg-amber-100 transition"
          >
            {t("Get Personalized Options", "व्यक्तिगत विकल्प प्राप्त करें")}
          </button>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div>
              <h3 className="text-3xl font-semibold mb-8">{t("Tell us your requirements", "अपनी जरूरतें बताएं")}</h3>
              
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder={t("Destination (City / Area)", "गंतव्य (शहर / क्षेत्र)")}
                className="w-full border border-gray-300 focus:border-amber-500 rounded-2xl p-4 text-lg mb-6 focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">From</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1.5">Till</label>
                  <input
                    type="date"
                    name="toDate"
                    value={form.toDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Budget per room per day</label>
                <input
                  name="budgetPerDay"
                  value={form.budgetPerDay}
                  onChange={handleChange}
                  placeholder="₹8000 - ₹15000"
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Right Side */}
            <div>
              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Adults</label>
                <select 
                  value={form.adults}
                  onChange={(e) => handleAdultsChildren('adults', e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500"
                >
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 mb-2">Children</label>
                <select 
                  value={form.children}
                  onChange={(e) => handleAdultsChildren('children', e.target.value)}
                  className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:border-amber-500"
                >
                  {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {form.children > 0 && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-3">Children's Ages</p>
                  <div className="grid grid-cols-3 gap-3">
                    {form.childAges.map((age, i) => (
                      <select
                        key={i}
                        value={age}
                        onChange={(e) => updateChildAge(i, e.target.value)}
                        className="border border-gray-300 rounded-2xl p-3 focus:outline-none focus:border-amber-500"
                      >
                        {[...Array(18)].map((_, idx) => (
                          <option key={idx} value={idx+1}>{idx+1} yrs</option>
                        ))}
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
            className="w-full mt-8 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white py-5 rounded-2xl text-xl font-medium transition disabled:opacity-80"
          >
            {isSubmitting 
              ? t("Opening WhatsApp...", "व्हाट्सएप खुल रहा है...") 
              : t("Get Luxury Hotel Options on WhatsApp", "व्हाट्सएप पर लग्जरी होटल विकल्प प्राप्त करें")}
          </button>
        </div>
      </section>

      {/* Travel Types */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-center text-4xl font-semibold mb-12">{t("Choose Your Vibe", "अपना मूड चुनें")}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {['Mountains', 'Sea', 'Desert'].map((type) => (
            <div 
              key={type}
              onClick={() => setForm(prev => ({...prev, travelType: type.toLowerCase()}))}
              className={`group rounded-3xl overflow-hidden shadow-lg cursor-pointer transition hover:scale-105 ${form.travelType === type.toLowerCase() ? 'ring-4 ring-amber-500' : ''}`}
            >
              <div className="h-72 bg-cover bg-center" 
                   style={{backgroundImage: `url(${type === 'Mountains' ? luxuryImages[1] : type === 'Sea' ? luxuryImages[2] : luxuryImages[3]})`}} />
              <div className="p-6 bg-white">
                <h4 className="text-2xl font-semibold">{type}</h4>
                <p className="text-gray-600 mt-2">
                  {type === 'Mountains' && t("Peaceful hill stations & luxury resorts", "शांत पहाड़ी स्टेशन और लग्जरी रिसॉर्ट")}
                  {type === 'Sea' && t("Beachfront hotels & coastal retreats", "बीचफ्रंट होटल और तटीय रिट्रीट")}
                  {type === 'Desert' && t("Royal palaces & desert camps", "शाही महल और मरुस्थल कैंप")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About, FAQ, Footer sections can be added similarly with premium styling */}

      <footer className="bg-zinc-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white font-bold">S</div>
            <span className="text-3xl font-serif">StaySaathi</span>
          </div>
          <p className="text-amber-400">📞 +91 84509 72317</p>
          <p className="mt-2 opacity-75">Assistance: 9 AM – 10 PM IST</p>
          <p className="text-sm opacity-60 mt-8">Payments are made directly to hotels • StaySaathi is a personal assistance service</p>
        </div>
      </footer>
    </div>
  );
}

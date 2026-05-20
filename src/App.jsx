import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, ShieldCheck, Star, Award, 
  MapPin, Calendar, Users, IndianRupee, 
  Globe, Mountain, Waves, Sun, CheckCircle, HelpCircle,
  Phone
} from 'lucide-react';

const translations = {
  en: {
    tagline: "Book as a friend",
    heroTitle: "Find the perfect stay in India",
    heroSub: "Real human help • Premium curation • Best prices",
    destination: "Where to?",
    from: "Check-in",
    till: "Check-out",
    adults: "Adults",
    children: "Children",
    childAge: "Age of child",
    budget: "Budget per night (₹)",
    searchBtn: "Get Options on WhatsApp",
    trust1: "Curated Stays",
    trust2: "Direct Payment",
    trust3: "9 AM to 9 PM Support",
    trust4: "Best Rates",
    vibes: "Discover your vibe",
    mountains: "Mountains",
    sea: "Sea & Beaches",
    desert: "Desert & Heritage",
    aboutTitle: "The StaySaathi Experience",
    aboutText: "StaySaathi elevates your travel experience by blending technology with personalized human touch. Whether you seek a luxurious mountain retreat or a vibrant beach resort, our experts curate options tailored to your exact preferences, delivering them instantly via WhatsApp.",
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How does the booking process work?",
    faq1A: "Once you share your requirements, our experts send you a handpicked list of hotels on WhatsApp. You choose your favorite and pay the hotel or official provider directly.",
    faq2Q: "Is there any service fee?",
    faq2A: "No, our personalized recommendation service is completely free for travelers.",
    faq3Q: "Why WhatsApp instead of a website booking?",
    faq3A: "WhatsApp allows for immediate, personalized two-way communication. We can answer specific questions, negotiate rates, and verify details in real-time.",
    footerText: "Premium hotel discovery, simplified."
  },
  hi: {
    tagline: "एक दोस्त की तरह बुक करें",
    heroTitle: "भारत में अपना सही होटल खोजें",
    heroSub: "वास्तविक मानवीय सहायता • प्रीमियम चयन • सर्वोत्तम मूल्य",
    destination: "कहाँ जाना है?",
    from: "चेक-इन",
    till: "चेक-आउट",
    adults: "वयस्क",
    children: "बच्चे",
    childAge: "बच्चे की उम्र",
    budget: "प्रति रात बजट (₹)",
    searchBtn: "WhatsApp पर विकल्प प्राप्त करें",
    trust1: "चयनित होटल",
    trust2: "सीधा भुगतान",
    trust3: "सुबह 9 बजे से रात 9 बजे तक सहायता",
    trust4: "सर्वोत्तम दरें",
    vibes: "अपना माहौल चुनें",
    mountains: "पहाड़ (Mountains)",
    sea: "समुद्र और तट (Beaches)",
    desert: "रेगिस्तान और विरासत (Heritage)",
    aboutTitle: "StaySaathi अनुभव",
    aboutText: "स्टे-साथी तकनीक और व्यक्तिगत मानवीय स्पर्श का मिश्रण करके आपके यात्रा अनुभव को बेहतर बनाता है। चाहे आप एक शानदार पहाड़ी विश्राम चाहते हों या एक जीवंत समुद्र तट रिसॉर्ट, हमारे विशेषज्ञ आपकी सटीक प्राथमिकताओं के अनुसार विकल्प तैयार करते हैं, और उन्हें तुरंत व्हाट्सएप के माध्यम से प्रदान करते हैं।",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faq1Q: "बुकिंग प्रक्रिया कैसे काम करती है?",
    faq1A: "एक बार जब आप अपनी आवश्यकताएं साझा करते हैं, तो हमारे विशेषज्ञ आपको व्हाट्सएप पर होटलों की एक चुनिंदा सूची भेजते हैं। आप अपना पसंदीदा चुनते हैं और सीधे होटल को भुगतान करते हैं।",
    faq2Q: "क्या कोई सेवा शुल्क है?",
    faq2A: "नहीं, हमारी व्यक्तिगत अनुशंसा सेवा यात्रियों के लिए पूरी तरह से निःशुल्क है।",
    faq3Q: "वेबसाइट बुकिंग के बजाय व्हाट्सएप क्यों?",
    faq3A: "व्हाट्सएप तत्काल, व्यक्तिगत दोतरफा संचार की अनुमति देता है। हम विशिष्ट प्रश्नों के उत्तर दे सकते हैं, दरों पर बातचीत कर सकते हैं और वास्तविक समय में विवरण सत्यापित कर सकते हैं।",
    footerText: "प्रीमियम होटल खोजना अब और भी आसान।"
  }
};

const images = [
  "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1600&q=80", 
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80", 
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80" 
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentImg, setCurrentImg] = useState(0);
  
  const t = translations[lang];
  const whatsappNumber = '918450972317';
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    adults: 2,
    children: 0,
    childAges: [],
    budget: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChildrenChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    const newAges = [...form.childAges];
    
    if (count > newAges.length) {
      newAges.push(...Array(count - newAges.length).fill(0));
    } else {
      newAges.length = count;
    }
    
    setForm({ ...form, children: count, childAges: newAges });
  };

  const handleAgeChange = (index, value) => {
    const newAges = [...form.childAges];
    newAges[index] = parseInt(value) || 0;
    setForm({ ...form, childAges: newAges });
  };

  const handleWhatsApp = () => {
    const childAgesStr = form.children > 0 ? `\n👶 Child Ages: ${form.childAges.join(', ')} yrs` : '';
    const msg = `*Premium Hotel Enquiry* 🏨
    
📍 Destination: ${form.destination || 'Not specified'}
📅 Check-in: ${form.checkin || 'Not specified'}
📅 Check-out: ${form.checkout || 'Not specified'}
👥 Guests: ${form.adults} Adults, ${form.children} Children${childAgesStr}
💰 Budget per night: ₹${form.budget || 'Not specified'}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100">
      {/* Floating Action Button */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 group-hover:animate-pulse" />
      </button>

      <header className="sticky top-0 bg-white/90 backdrop-blur-xl z-40 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-lg shadow-inner">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Stay<span className="text-amber-600">Saathi</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
            
            <a 
              href={`tel:+${whatsappNumber}`}
              className="hidden lg:flex items-center gap-2 text-slate-600 font-medium hover:text-slate-900 transition-colors px-2"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">Call Now</span>
            </a>
            
            <button 
              onClick={handleWhatsApp}
              className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm">WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <main>
        <section className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-32 max-w-7xl mx-auto">
          <div className="absolute inset-0 z-0 rounded-b-[3rem] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Premium Travel India"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  currentImg === idx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
              />
            ))}
          </div>

          <div className="relative z-10 text-center pt-16 pb-12">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl leading-tight">
              {t.heroTitle}
            </h2>
            <div className="inline-block bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
               <p className="text-lg md:text-xl text-slate-100 font-medium tracking-wide">
                {t.heroSub}
              </p>
            </div>
          </div>

          <div className="relative z-20 bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto border border-slate-100 transform translate-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              
              <div className="lg:col-span-4 relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-600 transition-colors" />
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder={t.destination}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium placeholder:text-slate-400 text-lg"
                />
              </div>

              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-600" />
                <input
                  name="checkin"
                  type="date"
                  value={form.checkin}
                  min={today}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium"
                />
                <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-amber-600 uppercase tracking-wider rounded-full border border-amber-100">{t.from}</span>
              </div>

              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-600" />
                <input
                  name="checkout"
                  type="date"
                  value={form.checkout}
                  min={form.checkin || today}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium"
                />
                <span className="absolute -top-2.5 left-4 bg-white px-2 text-[11px] font-bold text-amber-600 uppercase tracking-wider rounded-full border border-amber-100">{t.till}</span>
              </div>

              <div className="relative group lg:col-span-2">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-amber-600" />
                <input
                  name="budget"
                  type="number"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder={t.budget}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
              <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
                <Users className="w-5 h-5 text-amber-600" />
                Guest Details
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.adults}</label>
                  <select 
                    name="adults" 
                    value={form.adults} 
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none font-medium shadow-sm"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t.children}</label>
                  <select 
                    value={form.children} 
                    onChange={handleChildrenChange}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none font-medium shadow-sm"
                  >
                    {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                
                {form.children > 0 && (
                  <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {form.childAges.map((age, idx) => (
                      <div key={idx}>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                          {t.childAge} {idx + 1}
                        </label>
                        <select
                          value={age}
                          onChange={(e) => handleAgeChange(idx, e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none font-medium shadow-sm"
                        >
                          {[...Array(18)].map((_, i) => <option key={i} value={i}>{i} yrs</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-bold px-8 py-5 rounded-2xl transition-all shadow-xl shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-3 active:scale-[0.98] group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {t.searchBtn}
            </button>
          </div>
        </section>

        {}
        <section className="pt-24 pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, text: t.trust1, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Award, text: t.trust2, color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: MessageCircle, text: t.trust3, color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Star, text: t.trust4, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl shadow-sm border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-xl group">
                <div className={`p-4 rounded-2xl ${item.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <span className="font-bold text-slate-800">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="py-20 px-4 sm:px-6 bg-slate-100/50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-slate-900">
              {t.vibes}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mountains Card */}
              <div className="group relative h-96 rounded-3xl overflow-hidden shadow-lg cursor-pointer" onClick={handleWhatsApp}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10 transition-opacity group-hover:opacity-100"></div>
                <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" alt="Mountains in India" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <Mountain className="w-8 h-8 text-amber-400 mb-3 opacity-90" />
                  <h4 className="text-3xl font-bold text-white mb-2">{t.mountains}</h4>
                  <p className="text-slate-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">Himachal, Uttarakhand & more</p>
                </div>
              </div>

              {/* Sea & Beaches Card */}
              <div className="group relative h-96 rounded-3xl overflow-hidden shadow-lg cursor-pointer" onClick={handleWhatsApp}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10 transition-opacity group-hover:opacity-100"></div>
                <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80" alt="Beaches in India" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <Waves className="w-8 h-8 text-blue-400 mb-3 opacity-90" />
                  <h4 className="text-3xl font-bold text-white mb-2">{t.sea}</h4>
                  <p className="text-slate-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">Goa, Kerala, Andamans & more</p>
                </div>
              </div>

              {/* Desert Card */}
              <div className="group relative h-96 rounded-3xl overflow-hidden shadow-lg cursor-pointer" onClick={handleWhatsApp}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent z-10 transition-opacity group-hover:opacity-100"></div>
                <img src="https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?auto=format&fit=crop&w=800&q=80" alt="Desert in India" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <Sun className="w-8 h-8 text-orange-400 mb-3 opacity-90" />
                  <h4 className="text-3xl font-bold text-white mb-2">{t.desert}</h4>
                  <p className="text-slate-200 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">Rajasthan, Kutch & more</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
            {t.aboutTitle}
          </h3>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {}
        <section className="bg-white py-20 px-4 sm:px-6 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900 flex items-center justify-center gap-3">
              <HelpCircle className="text-amber-500 w-8 h-8" />
              {t.faqTitle}
            </h3>

            <div className="space-y-6">
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A },
              ].map((faq, idx) => (
                <div key={idx} className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                  <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-slate-600 leading-relaxed ml-9">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-2 mb-6 opacity-50">
             <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mb-2">
            Stay<span className="text-amber-500">Saathi</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8">{t.footerText}</p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-12 text-sm">
            <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-center gap-3">
               <Phone className="w-5 h-5 text-slate-300" />
               +91 {whatsappNumber.substring(2)}
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-center gap-3">
               <Calendar className="w-5 h-5 text-slate-300" />
               9 AM - 9 PM IST Support
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-sm flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <p>&copy; {new Date().getFullYear()} StaySaathi. All rights reserved.</p>
            <p>Direct payments to hotels.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

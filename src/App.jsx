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
    travelType: 'all'
  });

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
    { 
      name: "Goa", 
      emoji: "🏖️", 
      desc: t("Beaches & Vibes", "समुद्र तट"), 
      image: "https://images.unsplash.com/photo-1512343872881-5d9e2c1c2f6f?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Jaipur", 
      emoji: "🏰", 
      desc: t("Royal Heritage", "शाही विरासत"), 
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Manali", 
      emoji: "🏔️", 
      desc: t("Mountains", "पहाड़"), 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Udaipur", 
      emoji: "🪷", 
      desc: t("Lakes & Romance", "झीलें"), 
      image: "https://images.unsplash.com/photo-1580130684518-8b6d2e4c6f3a?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Kerala", 
      emoji: "🌴", 
      desc: t("Backwaters", "बैकवाटर"), 
      image: "https://images.unsplash.com/photo-1602216056096-3b6e9c0d4b8f?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      name: "Leh Ladakh", 
      emoji: "⛰️", 
      desc: t("Adventure", "साहस"), 
      image: "https://images.unsplash.com/photo-1622290291469-4f1c9c8e8b2a?auto=format&fit=crop&w=800&q=80" 
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-gray-900">
      {/* Header, Hero, Trust Bar, Booking Form remain the same as previous version */}

      {/* Popular Destinations - FIXED IMAGES */}
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

      {/* FAQ and Footer (same as before) */}
      {/* ... FAQ Section ... */}

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

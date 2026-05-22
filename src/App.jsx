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
  
  // Set default selected month to current month
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());

  const [form, setForm] = useState({
    destination: '',
    fromDate: '',
    toDate: '',
    adults: 2,
    children: 0,
    childAges: [],
    budgetPerDay: '8000', 
    customNotes: '',
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

  const seasonalGuide = [
    {
      id: 0,
      monthEn: "Jan",
      monthHi: "जनवरी",
      icon: "❄️",
      places: [
        { dest: "Manali", icon: "🏔️", titleEn: "Snowy Manali Escapes", titleHi: "बर्फबारी और मनाली की वादियां", descEn: "Perfect for winter lovers! Enjoy scenic snowfall, skiing, and cozy mountain resort fireplace rooms.", descHi: "सर्दियों के प्रेमियों के लिए! ताज़ा बर्फबारी, स्कीइंग और गर्म आरामदायक रिज़ॉर्ट्स का आनंद लें।", tagEn: "Snow Peak", tagHi: "बर्फ़ीली वादियाँ" },
        { dest: "Auli", icon: "🎿", titleEn: "Auli Skiing Meadows", titleHi: "औली स्कीइंग और देवदार के जंगल", descEn: "Breathtaking Himalayan snow slopes. Great for scenic cable-car rides with kids.", descHi: "भव्य हिमालयी बर्फ के मैदान। बच्चों के साथ केबल कार की रोमांचक सवारी के लिए सर्वश्रेष्ठ स्थान।" , tagEn: "Skiing Spot", tagHi: "स्कीइंग प्रेमी" },
        { dest: "Jaisalmer", icon: "🐪", titleEn: "Golden Desert Dunes", titleHi: "जैसलमेर का सुनहरा रेगिस्तानी कैंप", descEn: "Pleasant days for camel safaris, luxury swiss camping under stars, and cultural puppet shows.", descHi: "ऊंट की सवारी, तारों की छांव में लग्जरी स्विस कैंपिंग और सांस्कृतिक कठपुतली शो के लिए सुखद दिन।", tagEn: "Desert Magic", tagHi: "रेगिस्तान सफारी" },
        { dest: "Goa", icon: "🏖️", titleEn: "South Goa Beaches", titleHi: "शांतिपूर्ण दक्षिण गोवा के बीच", descEn: "Mild winter sun. Best for peaceful beach walks, safe kid-friendly shallow waters, and cool evening shacks.", descHi: "हल्की सर्दियों की धूप। शांतिपूर्ण सैर, सुरक्षित उथले पानी और बच्चों के साथ स्वादिष्ट भोजन के लिए उत्तम।", tagEn: "Winter Sun", tagHi: "धूप और रेत" },
        { dest: "Shimla", icon: "🚂", titleEn: "Shimla Heritage Toy Train", titleHi: "शिमला की ऐतिहासिक टॉय ट्रेन", descEn: "Enjoy snowy walking tracks along Mall Road, warm wood shopping, and historic mountain train journeys.", descHi: "मॉल रोड पर बर्फबारी के नज़ारे, लकड़ी के सुंदर हस्तशिल्प और ऐतिहासिक पहाड़ी ट्रेन का शानदार सफर।", tagEn: "Colonial Classic", tagHi: "ऐतिहासिक हिल्स" }
      ]
    },
    {
      id: 1,
      monthEn: "Feb",
      monthHi: "फरवरी",
      icon: "🏰",
      places: [
        { dest: "Jaipur", icon: "🏰", titleEn: "Pink City Royals", titleHi: "गुलाबी नगरी जयपुर की शाही सैर", descEn: "Excellent pleasant weather for exploring magnificent fort ramparts and local organic dining.", descHi: "भव्य किलों, विशाल उद्यानों और स्वादिष्ट पारंपरिक भोजन की खोज के लिए सबसे सुहावना मौसम।", tagEn: "Heritage", tagHi: "शाही इतिहास" },
        { dest: "Agra", icon: "🕌", titleEn: "Agra Taj Monument", titleHi: "आगरा का भव्य ताज महल", descEn: "Crisp cool mornings perfect for taking memorable family photographs around the beautiful Taj Mahal garden.", descHi: "सुबह की सुहानी हवा में ताजमहल के बगीचे और सुंदर ऐतिहासिक महलों को देखने का सबसे बढ़िया समय।", tagEn: "Wonders", tagHi: "ऐतिहासिक अजूबा" },
        { dest: "Jodhpur", icon: "👑", titleEn: "Sun City Blue Streets", titleHi: "जोधपुर की नीली गलियां", descEn: "Explore the giant Mehrangarh Fort and local folk puppet markets under pleasant, sweat-free skies.", descHi: "विशाल मेहरानगढ़ किले और लोक बाजारों की सुहावनी, बिना उमस वाली धूप में सैर का आनंद लें।", tagEn: "Palaces", tagHi: "शाही दुर्ग" },
        { dest: "Kutch", icon: "🌕", titleEn: "White Salt Desert Kutch", titleHi: "कच्छ का सफेद नमक का रेगिस्तान", descEn: "Experience the majestic Rann Utsav with folk musicians under the crisp winter full moon with family.", descHi: "परिजनों के साथ चांदनी रात में शानदार सफेद मरुस्थल, पारंपरिक लोक नृत्य और हस्तशिल्प उत्सव का अनुभव करें।", tagEn: "Salt Flats", tagHi: "सांस्कृतिक उत्सव" },
        { dest: "Gulmarg", icon: "🚠", titleEn: "Gulmarg Gondola Rides", titleHi: "गुलमर्ग के बर्फीले पहाड़", descEn: "Ride Asia's highest cable car over thick pine trees loaded with heavy white winter snow.", descHi: "सफेद बर्फ से लदे देवदार के पेड़ों के ऊपर एशिया की सबसे ऊंची केबल कार (गोंडोला) की अद्भुत सवारी करें।", tagEn: "Alpine Magic", tagHi: "बर्फीला रोमांच" }
      ]
    },
    {
      id: 2,
      monthEn: "Mar",
      monthHi: "मार्च",
      icon: "🪷",
      places: [
        { dest: "Rishikesh", icon: "🪷", titleEn: "Divine Ganges Ghats", titleHi: "पवित्र ऋषिकेश गंगा घाट", descEn: "Mild river breeze. Perfect for peaceful Ganga Aarti, yoga retreats, and safe family rafting.", descHi: "हल्की ठंडी हवाएं। गंगा आरती के दर्शन, योगाश्रमों में आत्मिक शांति और पारिवारिक राफ्टिंग का सही समय।", tagEn: "Spiritual Adventure", tagHi: "गंगा आरती" },
        { dest: "Vrindavan", icon: "🎨", titleEn: "Vibrant Holi Colors", titleHi: "वृंदावन की पावन होली", descEn: "Experience legendary traditional flower Holi celebrations, sweet pedas, and divine temple chantings.", descHi: "पारंपरिक फूलों की अनूठी होली, वृंदावन के मशहूर पेड़े और दिव्य भजनों के साथ अध्यात्म का अनुभव करें।", tagEn: "Devotion", tagHi: "पवित्र त्योहार" },
        { dest: "Munnar", icon: "🍃", titleEn: "Emerald Munnar Hills", titleHi: "मुन्नार के हरे-भरे चाय बागान", descEn: "Breathe in sweet tea-scented air. Explore cool mist-covered winding roads and spice plantations.", descHi: "चाय की मनमोहक खुशबू वाली ताजी हवा। कोहरे से ढकी पहाड़ियों और मसालों के बागानों की सैर करें।", tagEn: "Tea Valley", tagHi: "हरियाली और सुकून" },
        { dest: "Kaziranga", icon: "🐅", titleEn: "Kaziranga Wildlife Safaris", titleHi: "काजीरंगा वन्यजीव सफारी", descEn: "Excellent weather to spot the famous Indian One-horned Rhinoceros in lush green grasslands.", descHi: "घने जंगलों के बीच विख्यात एक सींग वाले भारतीय गैंडे और जंगली हाथियों को देखने का सबसे अनुकूल समय।", tagEn: "Nature Trail", tagHi: "जंगल सफारी" },
        { dest: "Gokarna", icon: "🌊", titleEn: "Peaceful Gokarna Bays", titleHi: "गोकर्ण के शांत रेतीले बीच", descEn: "Serene alternative to busy beaches. Great for clean sunset viewing and temples adjacent to the sea.", descHi: "भीड़भाड़ से दूर। सुंदर साफ तटों पर डूबते सूरज के नज़ारे और प्राचीन मंदिरों के शांत दर्शन का लाभ लें।", tagEn: "Quiet Escape", tagHi: "समुद्र और शांति" }
      ]
    },
    {
      id: 3,
      monthEn: "Apr",
      monthHi: "अप्रैल",
      icon: "🌸",
      places: [
        { dest: "Kashmir", icon: "🌸", titleEn: "Kashmir Tulip Blooms", titleHi: "कश्मीर के खूबसूरत ट्यूलिप बाग", descEn: "Witness millions of colorful tulips blooming in Srinagar alongside peaceful Shikara boat rides.", descHi: "डल झील में शांत शिकारा बोट की सवारी और श्रीनगर में खिले लाखों ट्यूलिप फूलों की रंगीन चादर देखें।", tagEn: "Spring Paradise", tagHi: "फूलों की घाटी" },
        { dest: "Ooty", icon: "🚂", titleEn: "Ooty Botanical Lakes", titleHi: "ऊटी के चाय बागान व झीलें", descEn: "Escape early summer heat. Ride the iconic heritage toy train through beautiful dense eucalyptus forests.", descHi: "मैदानी गर्मी से बचें। नीलगिरि के घने जंगलों के बीच प्रसिद्ध हेरिटेज टॉय ट्रेन की सवारी का आनंद लें।", tagEn: "Misty Valleys", tagHi: "नीलगिरि हिल्स" },
        { dest: "Darjeeling", icon: "🏔️", titleEn: "Darjeeling Tea Estates", titleHi: "दार्जिलिंग के हिमालयी व्यू", descEn: "Magnificent views of Mount Kanchenjunga peaks. Stay in traditional family bungalows with organic farms.", descHi: "कांचनजंगा पर्वत की बर्फ से ढकी चोटियों के अद्भुत नज़ारे। जैविक चाय बागान और आरामदायक कॉटेज का मज़ा लें।", tagEn: "Himalayan View", tagHi: "चाय के बागान" },
        { dest: "Wayanad", icon: "🌲", titleEn: "Wayanad Forest Treehouses", titleHi: "वायनाड के घने जंगलों के ट्रीहाउस", descEn: "Explore prehistoric caves, spice plantations, and treehouses nested deep inside Kerala forests.", descHi: "केरल के पहाड़ों में आदिम गुफाओं की खोज करें और घने शांत जंगलों के बीच ट्रीहाउस में ठहरें।", tagEn: "Wild Greenery", tagHi: "प्राकृतिक ट्रीहाउस" },
        { dest: "Kodaikanal", icon: "⛵", titleEn: "Kodaikanal Misty Lakes", titleHi: "कोड़ाईकनाल की खूबसूरत झीलें", descEn: "Pedal-boat on the star-shaped lake, walk in pine forests, and watch clouds rolling into deep valleys.", descHi: "तारा-आकार की ठंडी झील में बोटिंग का आनंद लें, पाइन के शांत जंगलों में टहलें और वादियों में कोहरा बहते देखें।", tagEn: "Lake Retreat", tagHi: "शांति और कोहरा" }
      ]
    },
    {
      id: 4,
      monthEn: "May",
      monthHi: "मई",
      icon: "⛰️",
      places: [
        { dest: "Munnar", icon: "⛰️", titleEn: "Cool Munnar Hills", titleHi: "मुन्नार की ठंडी वादियां", descEn: "Perfect escape from peak summers. Refresh amidst cascading cold waterfalls and cool tea gardens.", descHi: "भीषण गर्मी से बचने के लिए उत्तम पहाड़ी स्थान। ताज़े बहते ठंडे झरनों और हरे-भरे चाय के बागानों का आनंद लें।", tagEn: "Cool Escape", tagHi: "गर्मी से राहत" },
        { dest: "Shimla", icon: "🌲", titleEn: "Shimla Pine Walkways", titleHi: "शिमला की ठंडी पाइन वादियां", descEn: "Pleasant 18°C temperatures. Walk on traffic-free ridges and enjoy sweet local ice creams with family.", descDescEn: "गर्मियों में भी सुहावना 18°C तापमान। माल रोड की स्वच्छ सड़कों पर टहलें और परिवार के साथ समय बिताएं।", tagEn: "Summer Peak", tagHi: "पहाड़ों की रानी" },
        { dest: "Mount Abu", icon: "🧗", titleEn: "Mount Abu Lake Escapes", titleHi: "माउंट आबू के शांत नक्की लेक", descEn: "The only cool hill retreat in Rajasthan. Enjoy pleasant evening boating on Nakki Lake and cold mountain winds.", descHi: "राजस्थान का एकमात्र ठंडा हिल स्टेशन। नक्की झील पर बोटिंग और सनसेट पॉइंट पर ठंडी हवाओं का मज़ा लें।", tagEn: "Oasis", tagHi: "रेगिस्तानी हिल" },
        { dest: "Mussoorie", icon: "⛰️", titleEn: "Mussoorie Queen of Hills", titleHi: "मसूरी की हरी-भरी पहाड़ियां", descEn: "Visit the cascading Kempty Waterfalls and enjoy cold pine breezes overlooking the vast Doon Valley.", descHi: "प्रसिद्ध केम्प्टी फॉल्स के ठंडे पानी में नहाएं और दून घाटी का मनमोहक नज़ारा पेश करने वाले हिल रिसॉर्ट्स में ठहरें।", tagEn: "Hill Station", tagHi: "मशहूर हिल स्टेशन" },
        { dest: "Gangtok", icon: "🏔️", titleEn: "Gangtok Buddhist Trails", titleHi: "गंगटोक के बौद्ध मठ और झीलें", descEn: "Marvelous Himalayan views, clean mountain air, and colorful flower-decorated pathways with local monasteries.", descHi: "शानदार कंचनजंगा व्यू, पहाड़ों की साफ ठंडी हवा और बौद्ध भिक्षुओं की प्रार्थनाओं से गुंजायमान सुंदर मठ।", tagEn: "Monasteries", tagHi: "हिमालयन संस्कृति" }
      ]
    },
    {
      id: 5,
      monthEn: "Jun",
      monthHi: "जून",
      icon: "🏍️",
      places: [
        { dest: "Leh Ladakh", icon: "⛰️", titleEn: "Ladakh High Passes", titleHi: "लद्दाख के ऊंचे बर्फीले दर्रे", descEn: "Mountain passes open up fully. Breathtaking blue lakes, high cold deserts, and historic ancient monasteries.", descHi: "सभी बर्फीले रास्ते खुल जाते हैं। शांत नीली झीलें, ठंडी रेतीली वादियाँ और प्राचीन तिब्बती मठों का अनुभव करें।", tagEn: "High Altitude", tagHi: "रोमांचक लद्दाख" },
        { dest: "Spiti Valley", icon: "🏔️", titleEn: "Spiti Desert Mountains", titleHi: "स्पीति वैली की ठंडी मरुभूमि", descEn: "Travel to remote clean cold deserts, mud monasteries, and high-altitude safe family homestays.", descHi: "सड़क मार्ग से सुलभ होने वाली सुंदर घाटी। प्राचीन तिब्बती वास्तुकला वाले गांवों और सेब के बागानों को देखें।", tagEn: "Remote Valley", tagHi: "पहाड़ी गांव" },
        { dest: "Manali", icon: "🏔️", titleEn: "Solang Adventure Parks", titleHi: "मनाली और सोलांग वैली", descEn: "Go paragliding, visit the Rohtang Pass snow walls, and walk along gushing Beas River mountain streams.", descHi: "रोहतांग पास की विशाल बर्फ की दीवारें देखें, पैराग्लाइडिंग करें और व्यास नदी के ठंडे पानी के पास पिकनिक मनाएं।", tagEn: "Adventure", tagHi: "रोमांचक वादियां" },
        { dest: "Dharamshala", icon: "☸️", titleEn: "Dharamshala Peace Walks", titleHi: "धर्मशाला और मैक्लोडगंज के मठ", descEn: "Cool pine forests and spiritual Buddhist temples. Handpick organic green tea from beautiful local estates.", descHi: "देवदार के ठंडे जंगल और शांतिपूर्ण बौद्ध मंदिर। सुंदर तिब्बती बाजारों और स्थानीय चाय बागानों की सैर करें।", tagEn: "Tibetan Vibe", tagHi: "शांति और अध्यात्म" },
        { dest: "Gulmarg", icon: "🚠", titleEn: "Gulmarg Summer Meadows", titleHi: "गुलमर्ग के हरे-भरे घास के मैदान", descEn: "Prisinte green meadows in summer. Play family mini-golf or take scenic pony rides along peaceful valleys.", descHi: "गर्मियों में मखमली घास के मैदान। पहाड़ों के बीच बच्चों के साथ घुड़सवारी और ठंडी प्राकृतिक सैर का आनंद लें।", tagEn: "Green Slopes", tagHi: "मखमली पहाड़ियां" }
      ]
    },
    {
      id: 6,
      monthEn: "Jul",
      monthHi: "जुलाई",
      icon: "🌧️",
      places: [
        { dest: "Lonavala", icon: "🌧️", titleEn: "Monsoon Mist Lonavala", titleHi: "लोनावला के मानसून झरने", descEn: "Monsoon paradise! Clouds rolling over green hills, piping hot corn cobs, and roaring seasonal mountain waterfalls.", descHi: "हर तरफ बिखरी मानसून की हरी चादर, गरमा-गरम भुट्टे और पहाड़ों से बहते सुंदर मौसमी झरने।", tagEn: "Monsoon Magic", tagHi: "मानसून नज़ारे" },
        { dest: "Valley of Flowers", icon: "🌸", titleEn: "Himalayan Flower Bloom", titleHi: "उत्तराखंड की फूलों की घाटी", descEn: "Rare alpine flowers bloom into thousands of colors across the high meadows during early rain showers.", descHi: "मानसून की बौछारों के साथ पहाड़ों पर खिलने वाले लाखों दुर्लभ हिमालयी फूल और जादुई हरी वादियां।", tagEn: "Alpine Blooms", tagHi: "फूलों का स्वर्ग" },
        { dest: "Coorg", icon: "☕", titleEn: "Coorg Coffee Estates", titleHi: "कूर्ग के चाय व कॉफी बागान", descEn: "Watch waterfalls swelling with rainwater and breathe in fresh coffee-scented forest air under mild drizzle.", descHi: "बारिश के पानी से लबालब भरते झरने और कूर्ग के घने जंगलों के बीच कॉफी की ताज़ा भीनी-भीनी खुशबू का आनंद लें।", tagEn: "Rainforest", tagHi: "कॉफी की महक" },
        { dest: "Mahabaleshwar", icon: "🍓", titleEn: "Misty Mahabaleshwar", titleHi: "महाबलेश्वर की धुंध और घाटियां", descEn: "Beautiful valley viewpoints covered in rolling clouds. Enjoy delicious fresh organic strawberry cream desserts.", descHi: "कोहरे से ढकी सुंदर घाटियां। ताज़ा स्ट्रॉबेरी क्रीम डेसर्ट और पहाड़ों से गिरती पानी की बौछारों का आनंद लें।", tagEn: "Strawberry Hill", tagHi: "धुंध और हरियाली" },
        { dest: "Udaipur", icon: "🏰", titleEn: "Udaipur Lake Palaces", titleHi: "उदयपुर के लबालब भरे तालाब", descEn: "The lakes fill up beautifully during monsoons. Enjoy pleasant cool winds while boating near heritage palaces.", descHi: "बारिश में झीलें पानी से लबालब भर जाती हैं। झीलों के शहर में बोटिंग और महलों के शानदार दृश्यों का आनंद लें।", tagEn: "Lake Royalty", tagHi: "झीलों की नगरी" }
      ]
    },
    {
      id: 7,
      monthEn: "Aug",
      monthHi: "अगस्त",
      icon: "🌴",
      places: [
        { dest: "Kerala", icon: "🌴", titleEn: "Lush Backwater Stays", titleHi: "केरल के शांत नारियल के बाग", descEn: "Post-monsoon leaves backwaters ultra-clean and green. Stay in premium traditional houseboats safely.", descHi: "बारिश के बाद की अद्भुत चमकीली हरियाली। नारियल के पेड़ों के बीच तैरते शानदार सुरक्षित हाउसबोट का मज़ा।", tagEn: "Backwaters", tagHi: "हाउसबोट सफर" },
        { dest: "Cherrapunji", icon: "🌧️", titleEn: "Greenest Cherrapunji", titleHi: "चेरापूंजी के बादलों का घर", descEn: "Experience the majestic rain! Watch roaring waterfalls and walk on living root bridges in clean air.", descHi: "दुनिया की सबसे भारी बारिश के रोमांच, बादलों की लुका-छिपी और प्राचीन लिविंग रूट ब्रिजों की सैर का अनुभव करें।", tagEn: "Heavy Rains", tagHi: "मेघालय के बादल" },
        { dest: "Mount Abu", icon: "⛰️", titleEn: "Misty Abu Monsoons", titleHi: "माउंट आबू के मानसून झरने", descEn: "Misty lakes and waterfalls rolling over green rocks. Enjoy pleasant cool evening shopping walks.", descHi: "कोहरे से ढकी झीलें और पहाड़ों से बहते सुंदर झरने। राजस्थानी और गुजराती भोजन व शाम की ठंडी सैर का आनंद लें।", tagEn: "Rainy Oasis", tagHi: "राजस्थान के पहाड़" },
        { dest: "Coorg", icon: "🌿", titleEn: "Coorg Mist Waterfalls", titleHi: "कूर्ग के घने मानसून वन", descEn: "Spot seasonal wildlife, walk inside spice gardens, and listen to the relaxing sound of natural rain.", descHi: "इलायची और काली मिर्च के खुशबूदार बागानों में टहलें और शांत वातावरण में मानसून की फुहारों का आनंद लें।", tagEn: "Fresh Wilderness", tagHi: "हरी वादियां" },
        { dest: "Athirappilly", icon: "🌊", titleEn: "Niagara Falls of India", titleHi: "अथिरापल्ली के विशाल झरने", descEn: "Witness Kerala's largest, most majestic waterfall swelling in full capacity with dramatic roaring waters.", descHi: "भारत का सबसे विशाल और भव्य झरना जो मानसून के दौरान अपने पूरे वेग के साथ दहाड़ते हुए गिरता है।", tagEn: "Giant Waterfall", tagHi: "बाहुबली फॉल्स" }
      ]
    },
    {
      id: 8,
      monthEn: "Sep",
      monthHi: "सितंबर",
      icon: "👑",
      places: [
        { dest: "Udaipur", icon: "👑", titleEn: "Udaipur Post-Monsoon", titleHi: "उदयपुर के सुंदर हेरिटेज तालाब", descEn: "The weather clears up beautifully. Ideal for lakeside family dining and sunset heritage photography.", descHi: "बारिश के बाद आसमान साफ हो जाता है और झीलें पानी से भरी रहती हैं। झील किनारे शाही भोजन का आनंद लें।", tagEn: "Scenic Lakes", tagHi: "झीलों की सैर" },
        { dest: "Lonavala", icon: "🍃", titleEn: "Lonavala Green Meadows", titleHi: "लोनावला के शांत मखमली पहाड़", descEn: "Vast clean green rolling grasslands without heavy downpours. Enjoy pleasant weather and scenic drives.", descHi: "बिना भारी बारिश के सुहाना सुहावना मौसम। मुंबई-पुणे हाईवे के पास पहाड़ों की सुखद सैर और ट्रेकिंग।", tagEn: "Post-Rain", tagHi: "सुहावना मानसून" },
        { dest: "Valley of Flowers", icon: "🌺", titleEn: "Prisinte Valley Blooms", titleHi: "उत्तराखंड के ताज़ा मखमली मैदान", descEn: "Catch the final bloom of rare Himalayan valley flowers before the winter cold starts setting in.", descHi: "सर्दियों की दस्तक से ठीक पहले खिलने वाले सुंदर फूलों से महकते पहाड़ों पर शांतिपूर्ण ट्रैकिंग करें।", tagEn: "Autumn Bloom", tagHi: "फूलों का मेला" },
        { dest: "Rishikesh", icon: "🧗", titleEn: "Ganga River Rafting Opens", titleHi: "ऋषिकेश में एडवेंचर की शुरुआत", descEn: "Enjoy the crisp post-monsoon clean waters. Safe guides reopen family river rafting and forest camping.", descHi: "बारिश के बाद गंगा का पानी बिल्कुल साफ और वेग से भरा होता है। रिवर राफ्टिंग और कैम्पिंग की दोबारा शुरुआत।", tagEn: "Rafting Reopens", tagHi: "साहसिक खेल" },
        { dest: "Wayanad", icon: "🏡", titleEn: "Wayanad Bamboo Rafting", titleHi: "वायनाड के झरने और बांध", descEn: "Enjoy bamboo rafting on peaceful lakes and walk on eco-friendly wooden forest bridges with family.", descHi: "शांत झीलों में बांस के पारंपरिक बेड़े पर बोटिंग का आनंद लें और सुंदर इको-पार्कों में समय बिताएं।", tagEn: "Eco Travel", tagHi: "हरे-भरे जंगल" }
      ]
    },
    {
      id: 9,
      monthEn: "Oct",
      monthHi: "अक्टूबर",
      icon: "🏵️",
      places: [
        { dest: "Jaipur", icon: "🏵️", titleEn: "Jaipur Festive Markets", titleHi: "जयपुर के रंग-बिरंगे बाज़ार", descEn: "Warm pleasant evenings. Great for local festive shopping, heritage walks, and traditional food courts.", descHi: "सुहावनी शामें। दिवाली की खरीदारी, पुराने महलों की सैर और लजीज पारम्परिक खाने का आनंद लें।", tagEn: "Festivals", tagHi: "त्योहारी रौनक" },
        { dest: "Hampi", icon: "🏛️", titleEn: "Ancient Hampi Ruins", titleHi: "हम्पी के ऐतिहासिक पत्थर के मंदिर", descEn: "Mild winter sun starts. Explore magnificent stone structures, river boat rides, and heritage architecture.", descHi: "हल्की सर्दियों की शुरुआत। तुंगभद्रा नदी के पास प्राचीन पाषाण वास्तुकला और प्रसिद्ध रथ मंदिरों की सैर करें।", tagEn: "Historic Stone", tagHi: "प्राचीन धरोहर" },
        { dest: "Kolkata", icon: "🪔", titleEn: "Grand Durga Puja", titleHi: "कोलकाता की भव्य दुर्गा पूजा", descEn: "Witness spectacular artistic pandals, local sweet delicacies, and colorful lights decorated across the city.", descHi: "विशाल कलात्मक पंडालों के दर्शन, बंगाली मिठाइयों का स्वाद और पूरे शहर में जगमगाती रोशनी की धूम।", tagEn: "Culture", tagHi: "भव्य उत्सव" },
        { dest: "Varanasi", icon: "🪔", titleEn: "Varanasi Ganga Ghats", titleHi: "पवित्र वाराणसी देव दीपावली", descEn: "Crisp pleasant evenings. Experience holy boat rides watching thousands of oil lamps lighting up Varanasi ghats.", descHi: "शाम की पवित्र गंगा आरती, दीपों से जगमगाते घाट और देव दीपावली की विहंगम अलौकिक दृश्य।", tagEn: "Sacred", tagHi: "देव दीपावली" },
        { dest: "Mysore", icon: "🏰", titleEn: "Mysore Palace Dussehra", titleHi: "मैसूर पैलेस का भव्य दशहरा", descEn: "Witness the magnificent royal palace illuminated with nearly 100,000 lightbulbs and traditional grand parades.", descHi: "लाखों बल्बों की रोशनी से जगमगाता मैसूर का राजसी महल और भव्य पारंपरिक सांस्कृतिक झांकियां।", tagEn: "Royal Parade", tagHi: "शाही दशहरा" }
      ]
    },
    {
      id: 10,
      monthEn: "Nov",
      monthHi: "नवंबर",
      icon: "🐪",
      places: [
        { dest: "Jaisalmer", icon: "🐪", titleEn: "Golden Desert Swiss Tents", titleHi: "जैसलमेर का सुनहरा रेगिस्तानी कैंप", descEn: "Perfect cold desert nights. Experience camel safaris, stargazing, and traditional puppet folk dances.", descHi: "रेगिस्तान की ठंडी सुहावनी रातें। ऊंट की सवारी, राजस्थानी लोक नृत्य और शानदार लग्जरी स्विस टेंट में रहने का अनुभव।", tagEn: "Starry Nights", tagHi: "सुनहरा रेगिस्तान" },
        { dest: "Pushkar", icon: "🐫", titleEn: "Pushkar Camel Fair", titleHi: "पुष्कर का पारंपरिक मेला", descEn: "Experience the colorful cultural fair, traditional hot air balloon rides, and peaceful lakeside temple visits.", descHi: "दुनिया का सबसे अनोखा ऊंट मेला, रंग-बिरंगे पारंपरिक खेल, हॉट एयर बैलून राइड और शांत ब्रह्मा मंदिर के दर्शन।", tagEn: "Heritage Fair", tagHi: "पारंपरिक मेला" },
        { dest: "Amritsar", icon: "🕌", titleEn: "Amritsar Golden Lights", titleHi: "अमृतसर का पावन स्वर्ण मंदिर", descEn: "Pleasant chilly weather. Visit the Golden Temple illuminated with lights, and enjoy delicious hot langar meals.", descHi: "सर्दियों की सुहावनी शुरुआत। रोशनी से नहाया स्वर्ण मंदिर, वाघा बॉर्डर की परेड और लज़ीज़ परांठे व लंगर का स्वाद।", tagEn: "Devotional Lights", tagHi: "पवित्र दर्शन" },
        { dest: "Varanasi", icon: "🌅", titleEn: "Varanasi Ghat Boat Rides", titleHi: "काशी के कोहरे भरे घाट", descEn: "Pleasant early mornings to feed migratory birds on boat rides and walk around ancient sweet streets.", descHi: "सुबह-सुबह बोटिंग करते हुए प्रवासी पक्षियों को दाना खिलाएं और गरमा-गरम कचौड़ी और जलेबी का स्वाद लें।", tagEn: "Sacred Dawn", tagHi: "पवित्र बनारस" },
        { dest: "Goa", icon: "🌊", titleEn: "Goa Beach Shacks Reopen", titleHi: "गोवा के नए बीच शैक और बाजार", descEn: "Fabulous beach weather. The famous wooden beach shacks reopen with delicious family dining menus and cool breezes.", descHi: "बहुत ही सुहावना मौसम। समुद्र किनारे लकड़ी के झोपड़ीनुमा रेस्टोरेंट (शैक) ताज़े भोजन और संगीत के साथ खुल जाते हैं।", tagEn: "Beach Vibe", tagHi: "समुद्र तट और धूप" }
      ]
    },
    {
      id: 11,
      monthEn: "Dec",
      monthHi: "दिसंबर",
      icon: "🏖️",
      places: [
        { dest: "Goa", icon: "🏖️", titleEn: "Goa Beach Sunshine", titleHi: "गोवा विंटर कार्निवल", descEn: "Cool sea breeze and pleasant sunshine. Best for family beach games, watersports, and year-end carnivals.", descHi: "ठंडी समुद्री हवाएं और खिली धूप। बच्चों के साथ सैंड-कैसल बनाने, वाटर स्पोर्ट्स और विंटर कार्निवल का आनंद लें।", tagEn: "Festive Beach", tagHi: "विंटर कार्निवल" },
        { dest: "Manali", icon: "❄️", titleEn: "Snowy Manali Solang", titleHi: "मनाली के बर्फीले स्की रिज़ॉर्ट", descEn: "Witness heavy snowfall. Enjoy winter ski lessons, snow fights, and premium wooden pine cabins with fireplaces.", descHi: "सफेद बर्फ की मोटी चादर। बच्चों के साथ स्नो-मैन बनाएं, स्कीइंग करें और फायरप्लेस वाले कॉटेज का मज़ा लें।", tagEn: "Winter Snow", tagHi: "बर्फीला स्वर्ग" },
        { dest: "Auli", icon: "🎿", titleEn: "Auli High Mountain Skiing", titleHi: "औली के बर्फीले मखमली ढलान", descEn: "Breathtaking snow slopes and high peaks. Ride the safe cable car watching dense oak forests loaded with white snow.", descHi: "स्कीइंग के प्रेमियों के लिए बेस्ट। बर्फ से लदे देवदार के जंगलों के बीच रोमांचक केबल कार की सवारी करें।", tagEn: "Ski Resort", tagHi: "बर्फ पर स्कीइंग" },
        { dest: "Pondicherry", icon: "⛪", titleEn: "French Quarter Walks", titleHi: "पांडिचेरी के सुंदर फ्रेंच रास्ते", descEn: "Mild pleasant coastal breezes. Stroll along yellow-painted colonial villas, safe stone beaches, and cozy cafes.", descHi: "हल्की समुद्री हवाएं। फ्रांसीसी वास्तुकला से सजे सुंदर पीले विला, साफ गलियों और सुंदर कैफे की सैर का आनंद लें।", tagEn: "French Vibe", tagHi: "कोलोनियल विलेज" },
        { dest: "Jaisalmer", icon: "🌌", titleEn: "Desert Winter Stargazing", titleHi: "रेगिस्तान की ठंडी तारों भरी रातें", descEn: "Cozy nights around bonfire. Enjoy Rajasthani puppet shows, camel desert safaris, and clear starry night sky viewing.", descHi: "ठंडी रातों में अलाव के पास बैठकर संगीत का मज़ा लें। दिन में ऊंट की सवारी और रात को दूरबीन से सितारे देखें।", tagEn: "Desert Camp", tagHi: "अलाव और संगीत" }
      ]
    }
  ];

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

    const specialNotesText = form.customNotes.trim() 
      ? `\n📝 *Special Requests:* ${form.customNotes.trim()}` 
      : '';

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
      `${mealPlanText}` +
      `${specialNotesText}\n\n` +
      `Please suggest the best matching options.`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => setIsSubmitting(false), 1200);
  };

  const handleAutofillSeason = (destinationName) => {
    setForm(prev => ({ ...prev, destination: destinationName }));
    if (validationError) setValidationError('');
    const element = document.getElementById('booking-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      icon: "👨‍‍👧‍👦",
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

              {/* Special Request Textbox */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-zinc-600 mb-1.5">
                  📝 {t("Any Special Requests / Custom Notes?", "विशेष अनुरोध / टिप्पणी")}
                </label>
                <textarea
                  name="customNotes"
                  value={form.customNotes}
                  onChange={handleChange}
                  rows="3"
                  placeholder={t(
                    "e.g., adjacent rooms, ground floor, pure veg restaurants nearby, hot water kettle for baby, early check-in request...",
                    "जैसे: पास-पास कमरे चाहिए, ग्राउंड फ्लोर कमरा, बच्चे के लिए गर्म पानी की केतली, या जल्दी चेक-इन अनुरोध..."
                  )}
                  className="w-full border-2 border-zinc-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 rounded-xl p-3 text-sm focus:outline-none resize-none"
                />
              </div>

              {/* Safe Direct-Pay Guarantee Banner */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/80 flex items-start gap-3">
                <div className="text-2xl p-1 bg-white rounded-xl shadow-sm">🛡️</div>
                <div>
                  <h5 className="text-sm font-bold text-emerald-950">{t("100% Safe Pay-Direct Guarantee", "100% सुरक्षित डायरेक्ट भुगतान")}</h5>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    {t("Pay directly to the hotel's verified account. We never collect or hold your card details, keeping your hard-earned money completely safe.", "सीधे होटल के सत्यापित खाते में भुगतान करें। हम कभी भी आपके कार्ड का विवरण नहीं मांगते, जिससे आपके पैसे पूरी तरह सुरक्षित रहते हैं।")}
                  </p>
                </div>
              </div>
            </div>

            {/* Preferred Amenities & Filters Side */}
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

      {/* Seasonal Planner - 5 Curated Places to Visit Per Month */}
      {}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-24">
        <div className="bg-zinc-100/80 rounded-3xl border border-zinc-200/60 p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-4xl">📅</span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-zinc-800 mt-2 mb-3">
              {t("Where to Go in Which Season? (Destination Suggestions)", "मौसम के अनुसार यात्रा सुझाव")}
            </h3>
            <p className="text-zinc-600 text-sm font-medium">
              {t("Don't let bad weather ruin your trip. Select a month below to find perfect family destination suggestions recommended by Indian travel experts.", "गलत मौसम में यात्रा करके परेशान न हों। नीचे कोई भी महीना चुनें और जानें उस समय परिवार के लिए कौन से स्थान सबसे बेस्ट सुझाव रहेंगे।")}
            </p>
          </div>

          {/* Month grid selector */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-12 gap-2 mb-8">
            {seasonalGuide.map((item, idx) => {
              const isActive = selectedMonthIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMonthIndex(idx)}
                  className={`py-3 px-2 rounded-xl border font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                    isActive 
                      ? 'bg-amber-500 border-amber-600 text-white shadow-md scale-105' 
                      : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{language === 'en' ? item.monthEn : item.monthHi}</span>
                </button>
              );
            })}
          </div>

          {/* Header of selected month */}
          <div className="mb-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase bg-amber-50 px-2.5 py-1 rounded-full">
                📅 {t("RECOMMENDED SUGGESTIONS FOR", "इस महीने के लिए सर्वश्रेष्ठ सुझाव")}: {language === 'en' ? seasonalGuide[selectedMonthIndex].monthEn : seasonalGuide[selectedMonthIndex].monthHi}
              </span>
              <h4 className="text-xl md:text-2xl font-serif font-bold text-zinc-800 mt-2">
                {t("Curated Destination Suggestions", "चुनिंदा पर्यटन स्थल सुझाव")}
              </h4>
            </div>
            <p className="text-xs text-zinc-500 font-semibold max-w-sm md:text-right">
              {t("Click on any destination's Apply button to instantly load it into your travel planner.", "नीचे दी गई किसी भी जगह के 'चुनें' बटन पर क्लिक करके सीधे योजना बनाना शुरू करें।")}
            </p>
          </div>

          {/* Grid of 5 Recommended Places */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {seasonalGuide[selectedMonthIndex].places.map((place, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-zinc-200/80 p-5 shadow-sm hover:shadow-lg hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-3xl bg-amber-50 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                      {place.icon}
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {language === 'en' ? place.tagEn : place.tagHi}
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-zinc-900 mb-1 leading-snug">
                    {place.dest}
                  </h5>
                  <h6 className="text-xs font-semibold text-amber-600 mb-2 leading-tight">
                    {language === 'en' ? place.titleEn : place.titleHi}
                  </h6>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    {language === 'en' ? place.descEn : place.descHi}
                  </p>
                </div>

                <button
                  onClick={() => handleAutofillSeason(place.dest)}
                  className="w-full bg-zinc-900 hover:bg-amber-500 active:scale-95 text-white hover:text-white py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  📍 {t("Plan This Spot", "इसे चुनें")}
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Family-First Assurances */}
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
      {}
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
              <div className="text-amber-600 font-bold text-xs uppercase tracking-wider mb-2 mt-2">{t("WITHIN FEW HOURS", "कुछ ही घंटों में")}</div>
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

      {/* Why Choose Us */}
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

import { useState } from 'react'

export default function App() {
  const [form, setForm] = useState({
    destination: '',
    checkin: '',
    budget: '',
    guests: ''
  })

  const whatsappNumber = '918450972317'

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleWhatsApp = () => {
    const msg = `Hotel enquiry:
Destination: ${form.destination}
Check-in: ${form.checkin}
Budget: ${form.budget}
Guests: ${form.guests}`

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="p-6 shadow-sm sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">StaySaathi</h1>
            <p className="text-sm text-gray-500">Book as a friend</p>
          </div>

          <div className="flex gap-3 items-center">
            <a
              href="tel:+918450972317"
              className="border px-4 py-2 rounded-2xl"
            >
              📞 Call Now
            </a>

            <button
              onClick={handleWhatsApp}
              className="bg-black text-white px-5 py-2 rounded-2xl"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="mb-10 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
            alt="Himachal Mountains"
            className="w-full h-80 object-cover"
          />
        </div>

        <h2 className="text-5xl font-bold mb-6 leading-tight">
          Find the right hotel in India — with real human help on WhatsApp
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Family trips • Pilgrimages • Business travel • Weddings • Urgent stays
        </p>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            name="destination"
            onChange={handleChange}
            placeholder="Destination"
            className="border p-4 rounded-2xl"
          />

          <input
            name="checkin"
            type="date"
            onChange={handleChange}
            className="border p-4 rounded-2xl"
          />

          <input
            name="budget"
            onChange={handleChange}
            placeholder="Budget"
            className="border p-4 rounded-2xl"
          />

          <input
            name="guests"
            onChange={handleChange}
            placeholder="Guests"
            className="border p-4 rounded-2xl"
          />
        </div>

        <button
          onClick={handleWhatsApp}
          className="mt-6 bg-black text-white px-8 py-4 rounded-2xl"
        >
          Get Hotel Options on WhatsApp
        </button>

        <div className="grid md:grid-cols-4 gap-4 mt-10 text-sm font-medium">
          <div className="bg-green-50 p-4 rounded-2xl">
            ✅ Human Assistance
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl">
            ✅ Direct Hotel Payment
          </div>

          <div className="bg-yellow-50 p-4 rounded-2xl">
            ✅ WhatsApp Support
          </div>

          <div className="bg-purple-50 p-4 rounded-2xl">
            ✅ Personalized Matching
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-8">
          Popular Destinations
        </h3>

        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl shadow bg-white">Goa</div>
          <div className="p-6 rounded-2xl shadow bg-white">Jaipur</div>
          <div className="p-6 rounded-2xl shadow bg-white">Manali</div>
          <div className="p-6 rounded-2xl shadow bg-white">Haridwar</div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-6">
          About StaySaathi
        </h3>

        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          StaySaathi helps Indian travellers find suitable hotel stays with
          personal human assistance — just like asking a trusted friend.
          Whether it’s a family holiday, pilgrimage, business trip, wedding,
          or urgent stay, we help you find options quickly over WhatsApp.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>

        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <strong>How does payment work?</strong>
            <p>
              You pay the hotel directly or through the official booking provider.
              StaySaathi does not hold customer funds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <strong>Is StaySaathi a hotel?</strong>
            <p>
              No. StaySaathi is a personal hotel booking assistance service.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <strong>Can I book via WhatsApp?</strong>
            <p>
              Yes. WhatsApp is our fastest and preferred assistance channel.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white text-center p-10">
        <p className="text-xl font-semibold">StaySaathi • Book as a friend</p>

        <p className="mt-4">
          📞 +91 84509 72317 | WhatsApp Support Available
        </p>

        <p className="mt-2">
          🕘 Assistance Hours: 9 AM – 10 PM IST
        </p>

        <p className="text-sm mt-6 opacity-70 max-w-3xl mx-auto">
          StaySaathi helps customers discover suitable hotels.
          Payments are made directly to hotels or booking providers.
        </p>
      </footer>
    </div>
  )
}

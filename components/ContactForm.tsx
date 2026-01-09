'use client'

import { useState, FormEvent } from 'react'
import { Upload, Send, Check } from 'lucide-react'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carBrand: '',
    carModel: '',
    message: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', carBrand: '', carModel: '', message: '' })
      setFile(null)
    }, 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Jméno a příjmení *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white"
              placeholder="Jan Novák"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Telefon *
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white"
              placeholder="+420 123 456 789"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white"
            placeholder="jan.novak@email.cz"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="carBrand" className="block text-sm font-medium text-gray-300 mb-2">
              Značka vozidla *
            </label>
            <input
              type="text"
              id="carBrand"
              required
              value={formData.carBrand}
              onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
              className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white"
              placeholder="Škoda"
            />
          </div>

          <div>
            <label htmlFor="carModel" className="block text-sm font-medium text-gray-300 mb-2">
              Model vozidla *
            </label>
            <input
              type="text"
              id="carModel"
              required
              value={formData.carModel}
              onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
              className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white"
              placeholder="Octavia"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Popis poškození
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-2 py-2 md:px-4 px-2 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-red focus:ring-1 focus:ring-red transition-colors text-white resize-none"
            placeholder="Stručně popište poškození vašeho vozidla..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Fotografie poškození
          </label>
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-3 w-full px-4 py-6 bg-white/5 border-2 border-dashed border-white/10 rounded-lg hover:border-red hover:bg-white/10 transition-all cursor-pointer group"
            >
              <Upload size={24} className="text-gray-400 group-hover:text-red transition-colors" />
              <span className="text-gray-400 group-hover:text-white transition-colors">
                {file ? file.name : 'Klikněte pro nahrání fotografie'}
              </span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Doporučené formáty: JPG, PNG. Max. velikost: 10MB
          </p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="w-full px-8 py-4 bg-red hover:bg-red/90 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
        >
          {isSubmitted ? (
            <>
              <Check size={24} />
              Poptávka odeslána!
            </>
          ) : isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Odesílám...
            </>
          ) : (
            <>
              <Send size={20} />
              Odeslat nezávaznou poptávku
            </>
          )}
        </button>

        <p className="text-sm text-gray-400 text-center">
          Vyplněním formuláře souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky.
        </p>
      </form>
    </div>
  )
}

'use client'

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Upload, Send, Check, ChevronDown, Search } from 'lucide-react'

const countryCodes = [
  { code: 'CZ', name: 'Česká republika', dial_code: '+420' },
  { code: 'SK', name: 'Slovensko', dial_code: '+421' },
  { code: 'DE', name: 'Německo', dial_code: '+49' },
  { code: 'AT', name: 'Rakousko', dial_code: '+43' },
  { code: 'PL', name: 'Polsko', dial_code: '+48' },
  { code: 'UA', name: 'Ukrajina', dial_code: '+380' },
  { code: 'GB', name: 'Velká Británie', dial_code: '+44' },
  { code: 'US', name: 'USA', dial_code: '+1' },
  { code: 'FR', name: 'Francie', dial_code: '+33' },
  { code: 'IT', name: 'Itálie', dial_code: '+39' },
  { code: 'CH', name: 'Švýcarsko', dial_code: '+41' },
  { code: 'HU', name: 'Maďarsko', dial_code: '+36' },
  { code: 'VN', name: 'Vietnam', dial_code: '+84' },
]

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carBrand: '',
    carModel: '',
    message: '',
  })
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCountries = countryCodes.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dial_code.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    let formattedValue = ''
    for (let i = 0; i < rawValue.length; i++) {
        if (i > 0 && i % 3 === 0) {
            formattedValue += ' '
        }
        formattedValue += rawValue[i]
    }
    setPhoneNumber(formattedValue)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      
      const fullPhone = `${selectedCountry.dial_code} ${phoneNumber}`
      data.append('phone', fullPhone)
      
      data.append('carBrand', formData.carBrand)
      data.append('carModel', formData.carModel)
      data.append('message', formData.message)
      
      if (file) {
        data.append('file', file)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      })

      if (!response.ok) {
        throw new Error('Chyba při odesílání')
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
      
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', carBrand: '', carModel: '', message: '' })
        setPhoneNumber('')
        setFile(null)
        setFilePreview(null)
        setSelectedCountry(countryCodes[0])
      }, 3000)

    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      alert('Něco se pokazilo. Zkuste to prosím znovu nebo zavolejte.')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setFilePreview(objectUrl);
    }
  }

  return (
    <div className="max-w-3xl mx-auto font-sans p-4">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)] transition-colors text-white placeholder-gray-500"
              placeholder="Jan Novák"
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Telefon *
            </label>
            
            <div className="flex w-full bg-white/5 border border-white/10 rounded-lg focus-within:border-[var(--accent-red)] focus-within:ring-1 focus-within:ring-[var(--accent-red)] transition-colors overflow-hidden">
                
                <button
                    type="button"
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen)
                        setSearchQuery('')
                    }}
                    className="flex items-center justify-center gap-2 pl-3 pr-2 py-3 border-r border-white/10 hover:bg-white/5 transition-colors bg-white/[0.02] min-w-[100px]"
                >
                    <Image 
                        src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                        alt={selectedCountry.name}
                        width={24}
                        height={16}
                        className="object-cover rounded-[2px]"
                        unoptimized 
                    />
                    <span className="text-gray-300 text-sm font-medium">{selectedCountry.dial_code}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <input
                    type="tel"
                    id="phone"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 outline-none"
                    placeholder="739 522 226"
                    maxLength={12}
                />
            </div>

            {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    
                    <div className="p-2 border-b border-white/5 sticky top-0 bg-[#0f0f0f] z-10">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Vyhledat zemi..." 
                                className="w-full bg-white/5 text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white/10 transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                        setSelectedCountry(country)
                                        setIsDropdownOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors ${selectedCountry.code === country.code ? 'bg-[var(--accent-red)]/10' : ''}`}
                                >
                                    <Image 
                                        src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                        alt={country.name}
                                        width={24}
                                        height={16}
                                        className="object-cover rounded-[2px]"
                                        unoptimized
                                    />
                                    <span className={`flex-grow text-sm font-medium ${selectedCountry.code === country.code ? 'text-[var(--accent-red)]' : 'text-gray-300'}`}>
                                        {country.name}
                                    </span>
                                    <span className="text-sm opacity-50 text-gray-400">{country.dial_code}</span>
                                    {selectedCountry.code === country.code && <Check size={14} className="text-[var(--accent-red)]" />}
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                Žádná země nenalezena
                            </div>
                        )}
                    </div>
                </div>
            )}
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
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)] transition-colors text-white placeholder-gray-500"
            placeholder="jan.novak@email.cz"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)] transition-colors text-white placeholder-gray-500"
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)] transition-colors text-white placeholder-gray-500"
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
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[var(--accent-red)] focus:ring-1 focus:ring-[var(--accent-red)] transition-colors text-white resize-none placeholder-gray-500"
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
              className={`flex flex-col items-center justify-center gap-3 w-full px-4 py-6 bg-white/5 border-2 border-dashed rounded-lg transition-all cursor-pointer group ${file ? 'border-[var(--accent-red)] bg-[var(--accent-red)]/5' : 'border-white/10 hover:border-[var(--accent-red)] hover:bg-white/10'}`}
            >
              {filePreview ? (
                  <div className="relative w-full h-48 rounded-md overflow-hidden group/preview">
                      <Image 
                        src={filePreview} 
                        alt="Náhled" 
                        fill
                        className="object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity backdrop-blur-sm z-10">
                          <p className="text-white font-bold flex items-center gap-2">
                              <Upload size={18} /> Změnit fotku
                          </p>
                      </div>
                  </div>
              ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent-red)] transition-colors duration-300">
                        <Upload size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-center">
                        <span className="block text-gray-300 font-medium group-hover:text-white transition-colors">
                            Klikněte pro nahrání fotografie
                        </span>
                        <span className="text-xs text-gray-300 mt-1 block">
                            JPG, PNG (max. 10MB)
                        </span>
                    </div>
                  </>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="w-full px-8 py-4 cursor-pointer bg-[var(--accent-red)] hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-3 hover:shadow-red-900/30 active:scale-[0.98]"
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
              <p>Odeslat <span className='hidden md:inline-block'>nezávaznou</span> poptávku</p>
            </>
          )}
        </button>

        <p className="text-sm text-gray-300 text-center px-4">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů.
        </p>
      </form>
    </div>
  )
}
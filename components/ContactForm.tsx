'use client'

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Upload, ArrowRight, Check, ChevronDown, Search, AlertCircle } from 'lucide-react'
import { compressImage } from '@/lib/compressImage'

// Keep uploads under the ~4.5 MB request limit of serverless hosting.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

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
  const [error, setError] = useState<string | null>(null)
  const [isProcessingFile, setIsProcessingFile] = useState(false)
  const [honeypot, setHoneypot] = useState('')
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
    setError(null)
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
      data.append('website', honeypot)
      
      if (file) {
        data.append('file', file)
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: data,
      })

      if (response.status === 413) {
        setIsSubmitting(false)
        setError('Fotografie je příliš velká. Zkuste prosím menší fotku nebo ji pošlete na info@pscolor.cz.')
        return
      }

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
        setFilePreview((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return null
        })
        setSelectedCountry(countryCodes[0])
      }, 3000)

    } catch (error) {
      console.error(error)
      setIsSubmitting(false)
      setError('Něco se pokazilo. Zkuste to prosím znovu nebo zavolejte.')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    e.target.value = ''
    if (!selectedFile) return

    setError(null)
    setIsProcessingFile(true)
    const compressed = await compressImage(selectedFile)
    setIsProcessingFile(false)

    const finalFile = compressed ?? selectedFile
    if (finalFile.size > MAX_UPLOAD_BYTES) {
      setError('Fotografie je příliš velká. Zkuste prosím menší fotku nebo ji pošlete na info@pscolor.cz.')
      return
    }

    const canPreview = compressed !== null || /^image\/(jpeg|png|webp|gif)$/.test(selectedFile.type)
    setFile(finalFile)
    setFilePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return canPreview ? URL.createObjectURL(finalFile) : null
    })
  }


  const labelClass = 'mb-2 block text-sm font-medium text-[#d4d4d8]'

  return (
    <div className="font-sans">
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        {/* Honeypot proti spamu: lidé pole nevidí, boti ho vyplní */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Web</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="name" className={labelClass}>
              Jméno a příjmení *
            </label>
            <input
              type="text"
              id="name"
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field"
              placeholder="Jan Novák"
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <label htmlFor="phone" className={labelClass}>
              Telefon *
            </label>

            <div className="field flex !p-0 overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen)
                  setSearchQuery('')
                }}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label={`Předvolba ${selectedCountry.dial_code}`}
                className="flex min-w-[104px] items-center justify-center gap-2 border-r border-line-strong pl-3.5 pr-2.5 transition-colors hover:bg-white/[0.04]"
              >
                <Image
                  src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                  alt=""
                  width={20}
                  height={14}
                  className="rounded-[2px] object-cover"
                  unoptimized
                />
                <span className="tabular-nums text-sm text-foreground">{selectedCountry.dial_code}</span>
                <ChevronDown
                  size={14}
                  className={`text-dim transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <input
                type="tel"
                id="phone"
                required
                autoComplete="tel-national"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="w-full bg-transparent px-4 py-[0.85rem] tabular-nums text-foreground placeholder:text-dim outline-none"
                placeholder="739 522 226"
                maxLength={12}
              />
            </div>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full z-50 mt-2 w-full origin-top overflow-hidden rounded-xl border border-line-strong bg-[#151517] shadow-[0_24px_60px_rgb(0_0_0/0.5)] sm:w-80"
                  data-lenis-prevent
                >
                  <div className="border-b border-line p-2">
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
                      <input
                        type="text"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Vyhledat zemi..."
                        aria-label="Vyhledat zemi"
                        className="w-full rounded-lg bg-white/[0.05] py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-dim focus:bg-white/[0.08]"
                      />
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto" role="listbox">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => {
                        const active = selectedCountry.code === country.code
                        return (
                          <button
                            key={country.code}
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              setSelectedCountry(country)
                              setIsDropdownOpen(false)
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.05] ${
                              active ? 'bg-white/[0.04]' : ''
                            }`}
                          >
                            <Image
                              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                              alt=""
                              width={20}
                              height={14}
                              className="rounded-[2px] object-cover"
                              unoptimized
                            />
                            <span className={`flex-grow text-sm ${active ? 'text-foreground' : 'text-[#d4d4d8]'}`}>
                              {country.name}
                            </span>
                            <span className="tabular-nums text-xs text-dim">{country.dial_code}</span>
                            {active && <Check size={14} className="text-accent" />}
                          </button>
                        )
                      })
                    ) : (
                      <div className="p-4 text-center text-sm text-muted">Žádná země nenalezena</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="field"
            placeholder="jan.novak@email.cz"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="carBrand" className={labelClass}>
              Značka vozidla *
            </label>
            <input
              type="text"
              id="carBrand"
              required
              value={formData.carBrand}
              onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
              className="field"
              placeholder="Škoda"
            />
          </div>

          <div>
            <label htmlFor="carModel" className={labelClass}>
              Model vozidla *
            </label>
            <input
              type="text"
              id="carModel"
              required
              value={formData.carModel}
              onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
              className="field"
              placeholder="Octavia"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Popis poškození
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="field resize-none"
            placeholder="Stručně popište poškození vašeho vozidla..."
          />
        </div>

        <div>
          <span className={labelClass}>Fotografie poškození</span>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="peer sr-only"
          />
          <label
            htmlFor="file-upload"
            className={`group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-4 py-7 transition-colors duration-300 peer-focus-visible:border-accent ${
              file
                ? 'border-accent/60 bg-accent/[0.06]'
                : 'border-line-strong bg-sunken hover:border-white/30 hover:bg-white/[0.03]'
            }`}
          >
            {isProcessingFile ? (
              <span className="flex flex-col items-center gap-3 py-2 text-sm text-muted">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                Připravuji fotografii...
              </span>
            ) : file && !filePreview ? (
              <span className="flex flex-col items-center gap-2 text-center">
                <Check size={22} className="text-accent" />
                <span className="font-medium text-foreground">{file.name}</span>
                <span className="text-xs text-muted">Klikněte pro změnu fotografie</span>
              </span>
            ) : filePreview ? (
              <div className="group/preview relative h-48 w-full overflow-hidden rounded-lg">
                <Image src={filePreview} alt="Náhled" fill className="object-contain" />
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover/preview:opacity-100">
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <Upload size={18} /> Změnit fotku
                  </p>
                </div>
              </div>
            ) : (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-muted transition-colors duration-300 group-hover:border-white/30 group-hover:text-foreground">
                  <Upload size={18} strokeWidth={1.75} />
                </span>
                <span className="text-center">
                  <span className="block font-medium text-foreground">Klikněte pro nahrání fotografie</span>
                  <span className="mt-1 block text-xs text-muted">JPG, PNG (max. 10MB)</span>
                </span>
              </>
            )}
          </label>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 overflow-hidden text-sm text-[#ff8a84]"
            >
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting || isSubmitted || isProcessingFile}
          className="btn btn-primary !h-14 w-full !text-base disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSubmitted ? (
            <>
              <Check size={20} />
              Poptávka odeslána!
            </>
          ) : isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Odesílám...
            </>
          ) : (
            <>
              <span>
                Odeslat <span className="hidden md:inline">nezávaznou</span> poptávku
              </span>
              <ArrowRight size={18} strokeWidth={2} className="btn-arrow" />
            </>
          )}
        </button>

        <p className="text-center text-sm text-muted">
          Odesláním formuláře souhlasíte se zpracováním osobních údajů.
        </p>
      </form>
    </div>
  )
}

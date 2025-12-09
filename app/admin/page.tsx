'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AdminPage() {
const [uploading, setUploading] = useState(false)
const [file, setFile] = useState<File | null>(null)

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
    setFile(e.target.files[0])
    }
}

const handleUpload = async () => {
    if (!file) {
    alert('Nejdříve vyberte soubor!')
    return
    }

    try {
    setUploading(true)
    const fileName = `${Date.now()}-${file.name}` 

    const { error } = await supabase.storage
        .from('galerie-fotky')
        .upload(fileName, file)

    if (error) {
        throw error
    }

    alert('Fotka byla úspěšně nahrána!')
    } catch (error: any) {
    console.error('Chyba při nahrávání:', error)
    alert(`Chyba: ${error.message}`)
    } finally {
    setUploading(false)
    setFile(null)
    }
}

return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <h1 className="text-4xl font-bold mb-8">Nahrát novou fotku do galerie</h1>
    <div className="flex flex-col gap-4">
        <input 
        type="file" 
        accept="image/*"
        onChange={handleFileChange} 
        disabled={uploading}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
    <button 
        onClick={handleUpload} 
        disabled={uploading || !file}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
        {uploading ? 'Nahrávám...' : 'Nahrát fotku'}
    </button>
    </div>
    </main>
)
}
// Shrinks a photo in the browser before upload.
// Phone photos are often 3-8 MB, while serverless hosting (e.g. Vercel) caps request bodies at ~4.5 MB.
// Returns null when the browser cannot decode the file (e.g. HEIC outside Safari).

const MAX_SIDE = 2000
const QUALITY = 0.82

export async function compressImage(file: File): Promise<File | null> {
  if (typeof window === 'undefined' || !file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) {
    return null
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALITY))
    if (!blob) return null

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'foto'
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() })
  } catch {
    return null
  }
}

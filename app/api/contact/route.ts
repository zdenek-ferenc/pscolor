import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Max. velikost fotky (klient ji předem zmenšuje, tohle je pojistka).
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Escapuje uživatelský vstup, aby šel bezpečně vložit do HTML e-mailu.
const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const field = (formData: FormData, key: string, maxLength: number) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Honeypot: skryté pole vyplní jen bot. Tváříme se, že je vše OK, ale nic neposíláme.
        if (field(formData, 'website', 200)) {
            return NextResponse.json({ success: true });
        }

        const rawName = field(formData, 'name', 120);
        const rawEmail = field(formData, 'email', 200);
        const rawPhone = field(formData, 'phone', 40);
        const rawCarBrand = field(formData, 'carBrand', 80);
        const rawCarModel = field(formData, 'carModel', 80);
        const rawMessage = field(formData, 'message', 5000);
        const fileEntry = formData.get('file');
        const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

        if (!rawName || !rawPhone || !rawCarBrand || !rawCarModel || !EMAIL_RE.test(rawEmail)) {
            return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 });
        }

        if (file && (file.size > MAX_FILE_BYTES || !file.type.startsWith('image/'))) {
            return NextResponse.json({ error: 'Nepodporovaná nebo příliš velká fotografie' }, { status: 413 });
        }

        const name = escapeHtml(rawName);
        const email = escapeHtml(rawEmail);
        const phone = escapeHtml(rawPhone);
        const carBrand = escapeHtml(rawCarBrand);
        const carModel = escapeHtml(rawCarModel);
        const message = escapeHtml(rawMessage);
        const phoneHref = rawPhone.replace(/[^\d+]/g, '');

        const transporter = nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        });

        const attachments = [];
        let imageCid = ''; 

        if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        imageCid = `image-${Date.now()}@pscolor`;

        attachments.push({
            filename: file.name.replace(/[^\w.\-]/g, '_'),
            content: buffer,
            cid: imageCid 
        });
        }

        const replySubject = encodeURIComponent(`Re: Poptávka - ${rawCarBrand} ${rawCarModel}`);
        const replyBody = encodeURIComponent(`Dobrý den,\n\nS pozdravem,\nTým PS Color`);

        
        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
            <div style="background-color: #0a0a0a; padding: 20px; text-align: center; border-bottom: 3px solid #DC2626;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nová poptávka z webu</h1>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Detaily vozidla</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                <td style="padding: 8px; color: #555; width: 120px; font-weight: bold;">Vozidlo:</td>
                <td style="padding: 8px; color: #000; font-size: 16px;">${carBrand} ${carModel}</td>
                </tr>
                <tr>
                <td style="padding: 8px; color: #555; width: 120px; font-weight: bold;">Jméno:</td>
                <td style="padding: 8px; color: #000;">${name}</td>
                </tr>
                <tr>
                <td style="padding: 8px; color: #555; width: 120px; font-weight: bold;">Telefon:</td>
                <td style="padding: 8px; color: #000;"><a href="tel:${phoneHref}" style="color: #DC2626; text-decoration: none; font-weight: bold;">${phone}</a></td>
                </tr>
                <tr>
                <td style="padding: 8px; color: #555; width: 120px; font-weight: bold;">Email:</td>
                <td style="padding: 8px; color: #000;"><a href="mailto:${encodeURIComponent(rawEmail)}" style="color: #DC2626; text-decoration: none;">${email}</a></td>
                </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8f8f8; border-left: 4px solid #DC2626;">
                <p style="margin: 0; font-weight: bold; color: #333; margin-bottom: 5px;">Popis poškození:</p>
                <p style="margin: 0; color: #555; line-height: 1.5; white-space: pre-wrap;">${message || 'Bez popisu'}</p>
            </div>

            ${file ? `
            <div style="margin-top: 25px;">
                <p style="margin-bottom: 10px; font-weight: bold; color: #333;">Fotografie poškození:</p>
                <div style="background-color: #000; padding: 5px; display: inline-block;">
                <img src="cid:${imageCid}" alt="Poškození" style="max-width: 100%; height: auto; display: block; border-radius: 2px;" />
                </div>
            </div>
            ` : ''}

            <div style="margin-top: 40px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                <a href="mailto:${encodeURIComponent(rawEmail)}?subject=${replySubject}&body=${replyBody}" 
                style="background-color: #DC2626; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);">
                Odpovědět klientovi
                </a>
            </div>
            </div>
        </div>
        `;

        await transporter.sendMail({
        from: `"Web PS Color" <${process.env.SMTP_USER}>`,
        to: process.env.MY_GMAIL,
        replyTo: rawEmail,
        subject: `Poptávka: ${rawCarBrand} ${rawCarModel} (${rawName})`.replace(/[\r\n]+/g, ' '),
        html: htmlContent,
        attachments: attachments,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Chyba při odesílání emailu:', error);
        return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 500 });
    }
    }
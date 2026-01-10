import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const carBrand = formData.get('carBrand') as string;
        const carModel = formData.get('carModel') as string;
        const message = formData.get('message') as string;
        const file = formData.get('file') as File | null;

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

        if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        imageCid = `image-${Date.now()}@pscolor`;

        attachments.push({
            filename: file.name,
            content: buffer,
            cid: imageCid 
        });
        }

        const replySubject = encodeURIComponent(`Re: Poptávka - ${carBrand} ${carModel}`);
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
                <td style="padding: 8px; color: #000;"><a href="tel:${phone}" style="color: #DC2626; text-decoration: none; font-weight: bold;">${phone}</a></td>
                </tr>
                <tr>
                <td style="padding: 8px; color: #555; width: 120px; font-weight: bold;">Email:</td>
                <td style="padding: 8px; color: #000;"><a href="mailto:${email}" style="color: #DC2626; text-decoration: none;">${email}</a></td>
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
                <a href="mailto:${email}?subject=${replySubject}&body=${replyBody}" 
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
        replyTo: email, 
        subject: `Poptávka: ${carBrand} ${carModel} (${name})`, 
        html: htmlContent,
        attachments: attachments,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Chyba při odesílání emailu:', error);
        return NextResponse.json({ error: 'Chyba při odesílání' }, { status: 500 });
    }
    }
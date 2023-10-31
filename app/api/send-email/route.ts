import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import EmailTemplate from '@/email-templates/emails/emailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	const { receiversEmail, htmlTemplateType } = await req.json();

	console.log(resend, "$$$$$$$$$$$$$$$$$$");

	try {
		const mailOptions = {
			from: 'onboarding@resend.dev', // your verified domain
			to: receiversEmail, // the email address you want to send a message
			subject: `${htmlTemplateType} has a message!`,
			react: EmailTemplate(),
		};

		const data = await resend.emails.send(mailOptions);

		console.log(data);

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error });
	}
}

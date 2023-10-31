import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { render } from '@react-email/render';
import EmailTemplate from '../../../email-templates/emails/emailTemplate';
import WelcomeEmail from '../../../email-templates/emails/welcometemplate';

// Api service to send mail to given email
export async function POST(request: NextRequest) {

	const { receiversEmail, htmlTemplateType } = await request.json();

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	const mailOptions: Mail.Options = {
		from: process.env.EMAIL,
		to: receiversEmail,
		subject: `Message from (${process.env.EMAIL})`,
	};

	if (htmlTemplateType === "request") {
		mailOptions.html = render(EmailTemplate())
	} else if (htmlTemplateType === "welcomeTemplate") {
		mailOptions.html = render(WelcomeEmail({}))
	}

	console.log(render(EmailTemplate()));

	try {
		const resp = await transport.sendMail(mailOptions);
		console.log(resp);
		return NextResponse.json({ message: 'Success!', status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ message: 'Failed!', status: 500 });
	}
}

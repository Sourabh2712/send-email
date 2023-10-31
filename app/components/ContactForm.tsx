'use client';
import type { NextPage } from 'next';

const ContactEmail: NextPage = () => {

	const sendEmail = async () => {
		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				body: JSON.stringify({
					receiversEmail: 'singh171999@gmail.com',
					htmlTemplateType: 'welcomeTemplate',
				}),
			});
			console.log('Email sent:', response);
		} catch (error) {
			console.error('Email sending failed:', error);
		}
	};

	return (
		<div>
			<button className={`mb-3 text-2xl font-semibold`} onClick={sendEmail}>Send Email</button>
		</div>
	);
};

export default ContactEmail;

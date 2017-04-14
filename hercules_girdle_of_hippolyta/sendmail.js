const nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'kimalvarez88@gmail.com',
		pass: 'jmexpiczibvkezfr'
	}
});

let mailOptions = {
	from: ' "Kim Alvarez" <kimalvarez88@gmail.com>',
	to: 'crenfrow@student.42.us.org',
	subject: 'whoa',
	text: 'cr3nfr0vv',
	html: '<p>cr3nfr0vv</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message %s sent: %s', info.messageID, info.response);
});


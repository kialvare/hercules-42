'use strict';
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let transporter = nodemailer.createTransport(smtpTransport({
	host: 'smtp.42.us.org',
	port: 25
	//auth: {
		//user: 'kimalvarez88@gmail.com',
		//pass: 'dxumebeqngcylyut'
	//}
}));

//var img = require("fs").readFileSync("food-05.jpg");

let mailOptions = {
	from: ' "Kim Alvarez" <kimalvarez88@gmail.com>',
	to: 'kimalvarez88@gmail.com',
	subject: 'butts',
	//text: 'sending this with all the smtp stuff.',
	html: '<p>ahh</p>',
	//attachments: [
	//{
	//	filename: 'food-05.jpg',
	//	path: '~/Downloads/food-05.jpg',
	//	contents: img,
	//	cid: cid
	//}
	//] 
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message sent!');
});


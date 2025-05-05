import nodemailer from "nodemailer";
import {google}  from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();  // getting all env keys from here
const CLIENT_ID = process.env.CLIENT_ID; // '101234567890-abc123def456.apps.googleusercontent.com';
const CLIENT_SECRET = process.env.CLIENT_SECRET; // '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';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN; // '1//04i3g4h5j6k7l8m9n0pqrstu-vwxyz1234567890abcdefg1234567890abcdefg';

const RIDERECT_URI ='https://developers.google.com/oauthplayground';

const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,RIDERECT_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })       //Creating access Token freshly using refresh token

export async function sendMail(data) {

    try { 
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'nanthakumars156@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        // send mail with defined transport object
        const mailOptions = {
            from: `${data.name} <nanthakumars156@gmail.com>`,
            to: `${data.to}`,
            cc:`${data.cc}`,
            bcc:`${data.bcc}`,
            subject: `${data.subject}`,
            // text: `${data.message}`,
            html: `${data.message}`, // html body
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

import nodemailer from 'nodemailer';
import 'dotenv/config';

const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS){
        throw new Error("Email credentials not found in environment variables");
    }
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });
};

export const sendVerificationEmail = async (
    userEmail: string,
    userName: string,
    verificationCode: string
) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: "Verify Your Email - UniStay Portal",
        html:`
        <h3>Hello ${userName}</h3>
        <p>Thank you for registering with UniStay.</p>
        <p>Please verify your email by entering the following verification code:</p>
        <p><b>${verificationCode}</b></p>
        <p>This code is valid for 24 hours.</p>
        <p>Best regards,<br>UniStay Team</p>
        `,
    });
};

export const sendWelcomeEmail = async (to: string, name: string) => {
    const transporter = createTransporter();
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Welcome to UniStay - Your Home Away from Home",
        html: `
        <h3>Hello ${name}</h3>
        <p>Welcome to our UniStay portal. We are excited to have you on board.</p>
        <p>Best regards,<br>UniStay Team</p>
        `,
    });
}
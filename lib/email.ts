import nodemailer from 'nodemailer';

export interface SendContactEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: SendContactEmailParams): Promise<{ success: boolean; error?: string }> {
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'bbzwaqar@gmail.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (!smtpUser || !smtpPass) {
    console.warn(
      '[Email Service] SMTP credentials (SMTP_USER & SMTP_PASS) not set in .env.local. Message stored in MongoDB.'
    );
    return {
      success: false,
      error: 'SMTP credentials not set in environment variables. Please add SMTP_USER and SMTP_PASS (Gmail App Password).',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name} via Portfolio" <${smtpUser}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `[Portfolio Inquiry] ${subject || 'New Contact Form Submission'}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background-color: #ffffff;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #fee2e2; padding-bottom: 12px; margin-top: 0;">New Portfolio Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px; color: #374151;">Name:</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
              <td style="padding: 8px 0; color: #111827;">${subject || 'No Subject Provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #374151;">Time:</td>
              <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <div style="background-color: #f9fafb; border-left: 4px solid #dc2626; padding: 16px; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; color: #374151; font-size: 14px; margin-bottom: 8px;">Message Content:</p>
            <p style="margin: 0; color: #1f2937; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
            This email was sent automatically from your personal portfolio website (waqarkhan.dev).
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Direct email successfully sent to ${receiverEmail}`);
    return { success: true };
  } catch (error: any) {
    console.error('[Email Service] Failed to send email via Nodemailer:', error);
    return { success: false, error: error.message || 'Failed to dispatch email.' };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmailWithSendGrid = async (data: any) => {
  try {
    const fromEmail = process.env.SENDGRID_FROM_EMAIL!;
    const businessEmail = 'info@headupstudio.com'; // ✅ Hardcoded

    // Admin/Business Email
    const businessMsg = {
      to: businessEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: 'New Booking Inquiry - Head Up Studio',
      text: `Booking inquiry from ${data.firstName} ${data.lastName}`,
      html: `
        <h3>New Booking Inquiry</h3>
        <ul>
          <li><strong>First Name:</strong> ${data.firstName}</li>
          <li><strong>Last Name:</strong> ${data.lastName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.number}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
        <p>Please review and follow up with the client accordingly.</p>
        <p>Best regards,<br>Head Up Studio System</p>
      `,
    };

    // Client Confirmation Email
    const clientMsg = {
      to: data.email,
      from: fromEmail,
      replyTo: businessEmail,
      subject: 'Thank You for Your Booking Inquiry - Head Up Studio',
      text: `Thanks ${data.firstName}, we've received your inquiry.`,
      html: `
        <h3>Thank You, ${data.firstName}!</h3>
        <p>We've received your message:</p>
        <ul>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.number}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
        <p>Our team is reviewing your request and will contact you within 24–48 hours.</p>
        <p>Best regards,<br>The Head Up Studio Team</p>
      `,
    };

    // Send both emails in one API call
    await sgMail.send([businessMsg, clientMsg]);

    return {
      success: true,
      message: 'Emails sent to business and client.',
    };
  } catch (error: any) {
    console.error('❌ SendGrid Error:', error);
    if (error.response) console.error(error.response.body);

    return {
      success: false,
      message: 'Failed to send email.',
      error: error.message,
    };
  }
};

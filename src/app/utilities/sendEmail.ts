/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

export const sendEmail = async (data: any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const businessHtml = `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Booking Inquiry</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #006B66; text-align: center;">New Booking Inquiry Received</h2>
          <ul>
            <li><strong>First Name:</strong> ${data.firstName}</li>
            <li><strong>Last Name:</strong> ${data.lastName}</li>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.number}</li>
            <li><strong>Message:</strong> ${data.message}</li>
          </ul>
          <p>Please review and follow up with the client accordingly.</p>
          <p>Best regards,<br>Head Up Studio System</p>
        </div>
      </body>
      </html>
    `;

    const clientHtml = `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You - Head Up Studio</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #006B66; text-align: center;">Thank You for Your Inquiry!</h2>
          <p>Dear ${data.firstName} ${data.lastName},</p>
          <p>We’ve received your booking inquiry:</p>
          <ul>
            <li><strong>Email:</strong> ${data.email}</li>
            <li><strong>Phone:</strong> ${data.number}</li>
            <li><strong>Message:</strong> ${data.message}</li>
          </ul>
          <p>Our team is reviewing your request and will contact you within 24–48 hours.</p>
          <p>If you have any urgent questions, feel free to contact us directly.</p>
          <p>Best regards,<br>The Head Up Studio Team</p>
        </div>
      </body>
      </html>
    `;

    const businessText = `
New Booking Inquiry Received

First Name: ${data.firstName}
Last Name: ${data.lastName}
Email: ${data.email}
Phone: ${data.number}
Message: ${data.message}

Please review and follow up with the client accordingly.
    `;

    const clientText = `
Thank You for Your Inquiry!

Dear ${data.firstName} ${data.lastName},

We’ve received your booking inquiry:

Email: ${data.email}
Phone: ${data.number}
Message: ${data.message}

Our team is reviewing your request and will contact you within 24–48 hours.

Best regards,
The Head Up Studio Team
    `;
    // Send email to admin
    const adminResult = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: "info@headupstudio.com", // Admin address
      replyTo: data.email,
      subject: "New Booking Inquiry - Head Up Studio",
      html: businessHtml,
      text: businessText,
    });

    if (!adminResult.messageId) {
      throw new Error("Failed to send email to admin.");
    }

    // Send confirmation to client
    const clientResult = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: data.email, // Client email
      replyTo: process.env.SMTP_USERNAME,
      subject: "Thank You for Your Booking Inquiry - Head Up Studio",
      html: clientHtml,
      text: clientText,
    });

    if (!clientResult.messageId) {
      throw new Error("Failed to send confirmation to client.");
    }

    return {
      success: true,
      message: "Emails sent successfully.",
    };
  } catch (error) {
    console.error("Email send failed:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

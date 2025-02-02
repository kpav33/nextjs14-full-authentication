import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { activationTemplate } from "./emailTemplates/activation";
import { resetPasswordTemplate } from "./emailTemplates/resetPass";

// Set up types for parameters
export async function sendMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  // Check tutorial 1:58 how to setup SMTP server with gmail account
  const { SMTP_EMAIL, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;

  // Gmail
  //   const transport = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: SMTP_EMAIL,
  //       pass: SMTP_GMAIL_PASS,
  //     },
  //   });

  // Mailtrap, setup as test smtp server, not real one
  // Befree.io for email body design
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("Test Result Of Transport", testResult);
  } catch (e) {
    console.log(e);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log({ sendResult });
    return sendResult;
  } catch (e) {
    console.log(e);
  }

  //   try {
  //     const sendResult = await transport.sendMail({
  //       from: SMTP_EMAIL,
  //       to,
  //       subject,
  //       html: body,
  //     });
  //     console.log({ sendResult });
  //     return sendResult;
  //   } catch (e) {
  //     console.log(e);
  //   }
}

export function compileActivationTemplate(name: string, url: string) {
  const template = Handlebars.compile(activationTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}

export function compileResetPassTemplate(name: string, url: string) {
  const template = Handlebars.compile(resetPasswordTemplate);
  const htmlBody = template({
    name,
    url,
  });
  return htmlBody;
}

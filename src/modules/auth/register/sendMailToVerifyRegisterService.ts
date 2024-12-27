import { transporter } from "../../../services/nodemailer/transporter";

export const sendMailToVerifyRegisterService = async (
  to: string,
  link: string
) => {
  return await transporter.sendMail({
    from: process.env.NODEMAILER_GMAIL,
    to,
    subject: "Vericar email 🚀 netbutik 🚀",
    html: `<a href=${link} style="color: royalblue">Haz clic en mí para verificar su registro</a>`,
  });
};

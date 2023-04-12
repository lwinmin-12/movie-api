import config from "config";
import nodeMailer from "nodemailer";

const host = config.get<string>("email_host");
const service = config.get<string>("service");
const port = config.get<number>("email_port");
const secure = config.get<boolean>("secure");
const user = config.get<string>("user");
const pass = config.get<string>("pass");

export const sentEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodeMailer.createTransport({
      host,
      service,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
    const info = await transporter.sendMail({
      from: user,
      to: email,
      subject,
      html: `
      <div>
      <h3>Hello ${email}</h3>
      <p>To complete your account registration, please verify your email:</p>
      <a
        style="
        text-decoration: none;
          color: white;
          border: none;
          border-radius: 5px;
          background-color: #1fd995;
          padding: 5px 20px;
        "
        href=${text}
      >
        Verify Now
      </a>
    </div>
     `,
    });
    console.log("message sent" + info.messageId);
  } catch (e) {
    console.log("email not sent");
    console.log(e);
  }
};

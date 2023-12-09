const express = require("express");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const cors = require("cors");
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bajadsunil2008@gmail.com',
        pass: 'segagfdwkezywoxi',
    },
});

// Twilio configuration
const accountSid = "AC6257525feb09ab6296b44e809d23a47b"
const authToken = "3eb3e0b0124ead6c4bc49efc44bcc6f4"
const twilioClient = twilio(accountSid, authToken);

app.get('/', (req, res) => {
    res.send('hello');
});

// Serve the 'qrcodes' directory as static files
app.use(express.static("qrcodes"));

// Route to handle registration
app.post("/register", async (req, res) => {
    try {
        const { name, email, mobile, noticket } = req.body;

        // Generate QR code based on user information
        const qrcodeData = JSON.stringify({ name, email, mobile, noticket });
        const qrcodeFilename = `${name}-${Date.now()}`;
        const qrcodePath = await generateQRCode(qrcodeData, qrcodeFilename);

        if (!qrcodePath) {
            return res.status(500).json({ error: "Error generating QR code" });
        }

        // Create HTML content with embedded QR code
        const htmlContent = `
            
        <center style="width: 100%; table-layout: fixed; background-color: white">
        <table style="
              width: 100%;
              padding-top: 2em !important;
    
              padding-bottom: 0em !important;
              margin: 0 !important;
              max-width: 400px;
              background-image: linear-gradient(
                0deg,
                rgba(235, 192, 72, 1),
                rgba(255, 255, 255, 1)
              );
              border-spacing: 0;
            " width="100%">
          <tr style="">
            <td style="padding: 0; margin: 0" align="center">
              <table style="
                    border-spacing: 0;
                    padding-left: 1em !important;
                  
                  " width="100%">
                <tr align="center">
                  <td class="two-columns" style="
                        padding: 0;
                        font-size: 0;
                        max-width: 100%;
                        display: flex;
                      ">
                    <table class="column2" style="
                          border-spacing: 0;
                          display: inline-block;
                          max-width: 170px;
                          width: 100%;
                          vertical-align: top;
                          padding-bottom: 0%;
                        ">
                      <tr>
                        <td class="padding" style="padding: 0">
                          <table class="content" style="border-spacing: 0; width: 100%">
                            <tr>
                              <td style="padding: 0">
    
                                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/logo1.png"
                                  width="90%" />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="column2" style="
                          border-spacing: 0;
                          display: inline-block;
                          max-width: 600px;
                          width: 100%;
                          vertical-align: top;
                          padding-bottom: 0%;
                          margin-top: 6%;
                        ">
                      <tr>
                        <td class="padding" style="padding: 0">
                          <table class="content" style="border-spacing: 0; width: 100%">
                            <tr>
                              <td style="padding: 0">
    
                                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/helplink.png"
                                  width="50%" />
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table class="column2" style="
                          margin-top: 1%;
                          border-spacing: 0;
                          display: inline-block;
                          max-width: 100px;
                          width: 100%;
                          vertical-align: top;
                          margin-top: 3%;
                        ">
                      <tr>
                        <td class="padding" style="padding: 0">
                          <table class="content" style="border-spacing: 0; width: 100%">
                            <tr>
                              <td style="padding: 0">
                                <p style="
                                      font-size: 17.5px;
                                      font-weight: 700;
                                      margin: 0;
                                      padding: 0;
    
                                      font-family: 'Poppins', sans-serif;
                                    ">
                                  A BLOCK
                                </p>
                                <!-- <img src="./images/logo1.png" width="50%"/> -->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div>
                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/raisoni.png" class="" width="150"
                  style="max-width: 100%; margin-top: 7%" />
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div>
                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/suhani.png" class="" width="250"
                  style="max-width: 100%" />
              </div>
    
              <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/locationreddot.png" width="8" />
              <i style="
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    margin: 0;
                    padding: 0;
                  ">
                LIVE at Nagpur</i>
    
              <div>
                <i style="
                      font-family: 'Poppins', sans-serif;
                      font-size: 10px;
                      font-weight: 600;
                    ">Program to start with Orchestra by Sur Sangam.</i>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              <div>
                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/clockcalender.png" class=""
                  width="320" style="max-width: 100%; margin-top: 4%" />
              </div>
            </td>
          </tr>
    
    
          <tr>
            <td align="center">
              <div style="margin: 2em 0">
                <img src="cid:qrcode" class="" width="200"
                  style="max-width: 100%" />
              </div>
            </td>
          </tr>
    
          <tr>
            <td align="center" style="padding: 0; margin: 0">
              <div>
                <img src="https://sms.procohat.tech/wp-content/uploads/2023/12/images/suhanishah.png" class="" width="600"
                  style="max-width: 100%; margin-top: 0%" />
              </div>
            </td>
          </tr>
        </table>
      </center>
  

        `;

        // Send HTML email with embedded QR code
        const mailOptions = {
            from: 'bajadsunil2008@gmail.com',
            to: email,
            subject: "Registration Successful",
            html: htmlContent,
            attachments: [
                {
                    filename: `${qrcodeFilename}.png`,
                    path: qrcodePath,
                    cid: 'qrcode', // Content ID for embedding in HTML
                },
            ],
        };

        await transporter.sendMail(mailOptions);

        // Send WhatsApp message
        const whatsappTo = '+918446099850'; // Replace with the recipient's phone number
        await sendWhatsAppMessage(qrcodePath, whatsappTo);

        // Clean up the generated QR code
        // fs.unlinkSync(qrcodePath);

        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: "Error during registration" });
    }
});

// Function to generate and save QR code images
const generateQRCode = async (qrcodeData, filename) => {
    try {
        await QRCode.toFile(`./qrcodes/${filename}.png`, qrcodeData);
        return `./qrcodes/${filename}.png`;
    } catch (err) {
        console.error("Error generating QR code:", err);
        return null;
    }
};

// Function to send WhatsApp message using Twilio
const sendWhatsAppMessage = async (mediaUrl, to) => {
    try {
        await twilioClient.messages.create({
            from: 'whatsapp:+14155238886',
            body: 'Hello there!',
            to: `whatsapp:${to}`,
            mediaUrl: `cid:qrcode`, // Content ID for referencing the embedded image
        });
        console.log('WhatsApp message sent successfully');
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

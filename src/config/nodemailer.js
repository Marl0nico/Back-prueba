import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const brevoClient = new Brevo.TransactionalEmailsApi();

// Configurar API Key
brevoClient.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

// 👉 Configurar remitente (obligatorio haberlo verificado en Brevo)
const sender = {
  name: process.env.BREVO_SENDER_NAME || "UConnect",
  email: process.env.BREVO_SENDER_EMAIL,
};

// ======================================================
// 1) Enviar correo para verificar cuenta
// ======================================================
export const sendMailToUser = async (userMail, token) => {
  const emailData = {
    sender,
    to: [{ email: userMail }],
    subject: "Verifica tu cuenta",
    htmlContent: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #2c3e50;">Verificación de Cuenta</h2>
          <p>Hola,</p>
          <p>Para confirmar tu cuenta, haz clic en el siguiente botón:</p>
          <a href="${process.env.URL_FRONTEND}/confirmar/${encodeURIComponent(token)}" 
             style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">
             Verificar Cuenta
          </a>
          <p>Si no solicitaste esta verificación, ignora este mensaje.</p>
      </div>
    </div>
    `,
  };

  try {
    await brevoClient.sendTransacEmail(emailData);
    console.log("Correo de verificación enviado a:", userMail);
  } catch (error) {
    console.error("Error enviando correo de verificación:", error);
  }
};

// ======================================================
// 2) Enviar correo de recuperación de contraseña
// ======================================================
export const sendMailToRecoveryPassword = async (userMail, token) => {
  const emailData = {
    sender,
    to: [{ email: userMail }],
    subject: "Recuperación de Contraseña - UConnect",
    htmlContent: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <h2 style="color: #e74c3c;">Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer tu contraseña en UConnect.</p>
          <p>Haz clic en el siguiente botón para continuar con el proceso:</p>
          <a href="${process.env.URL_FRONTEND}/recuperar-password/${token}" 
             style="display: inline-block; padding: 10px 20px; background-color: #e74c3c; color: white; text-decoration: none; border-radius: 5px;">
             Restablecer Contraseña
          </a>
          <p>Si no solicitaste el cambio de contraseña, ignora este mensaje.</p>
          <hr>
          <footer style="color: #7f8c8d;">El equipo de UConnect 🚀</footer>
      </div>
    </div>
    `,
  };

  try {
    await brevoClient.sendTransacEmail(emailData);
    console.log("Correo de recuperación enviado a:", userMail);
  } catch (error) {
    console.error("Error enviando correo de recuperación:", error);
  }
};

// ======================================================
// 3) Enviar correo de bienvenida con credenciales
// ======================================================
export const sendMailToEstudiante = async (userMail, password) => {
  const emailData = {
    sender,
    to: [{ email: userMail }],
    subject: "Bienvenido a la Comunidad Universitaria 🎓",
    htmlContent: `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <h1 style="color: #2c3e50;">🎓 Uni-Connect</h1>
          <p>Hola,</p>
          <p>¡Bienvenido a Uni-Connect! Estamos emocionados de que formes parte de nuestra comunidad universitaria.</p>
          <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales:</p>
          <ul style="text-align: left; padding-left: 20px;">
              <li><strong>Email:</strong> ${userMail}</li>
              <li><strong>Contraseña:</strong> ${password}</li>
          </ul>
          <p>Para iniciar sesión, haz clic en el siguiente botón:</p>
          <a href="${process.env.URL_FRONTEND}/login" 
             style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px;">
             Iniciar sesión
          </a>
          <hr>
          <footer style="color: #7f8c8d;">
              <p>© 2025 Uni-Connect. Todos los derechos reservados.</p>
              <p>Conectando estudiantes, creando oportunidades.</p>
          </footer>
      </div>
    </div>
    `,
  };

  try {
    await brevoClient.sendTransacEmail(emailData);
    console.log("Correo de bienvenida enviado a:", userMail);
  } catch (error) {
    console.error("Error enviando correo de bienvenida:", error);
  }
};

'use server';
import nodemailer from 'nodemailer';

// Variables de entorno con logging mejorado
const MAIL_HOST = process.env.NEXT_PUBLIC_MAIL_HOST;
const MAIL_PORT = parseInt(process.env.NEXT_PUBLIC_MAIL_PORT || '465');
const MAIL_USERNAME = process.env.NEXT_PUBLIC_MAIL_USERNAME;
const MAIL_PASSWORD = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL;

// Server Action para enviar email con Nodemailer usando Amazon SES
export async function sendWaitlistEmail(formData: { email: string }) {

  try {
    const { email } = formData;

    if (!email) {
      return { 
        success: false, 
        error: 'Email is required' 
      };
    }

    // Verificar credenciales
    if (!MAIL_USERNAME || !MAIL_PASSWORD) {
      console.error('[EMAIL] Error: Credenciales no encontradas en variables de entorno');
      return {
        success: false,
        error: 'Credenciales no encontradas en variables de entorno'
      };
    }
    
    console.log(`[EMAIL] Configurando transporter con host: ${MAIL_HOST}, puerto: ${MAIL_PORT}`);
    
    // Configurar transporter para Amazon SES
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: true,
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
      debug: true,
      logger: true
    });

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('[EMAIL] Error verificando conexión SMTP:', verifyError);
      // En producción, intentados enviar de todos modos
      throw verifyError;
    }
    // Enviar email directamente al usuario que se registró
    const mailOptions = {
      from: SENDER_EMAIL,
      to: email, // Enviar al email del usuario que se registró
      subject: 'Welcome to ForkU - Safer Forklifts, Right Here.',
      text: `Welcome to ForkU! You've been added to our waitlist.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 0; border-radius: 10px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <!-- Header Image Banner -->
          <div style="width: 100%; background-color: #000; position: relative; text-align: center;">
            <img src="https://elasticbeanstalk-us-east-1-867968001024.s3.us-east-1.amazonaws.com/WhatsApp+Image+2025-03-12+at+9.29.13+PM.jpeg" alt="ForkU - Simple. Smart. Safe." style="width: 100%; max-width: 600px; display: block; margin: 0 auto;">
          </div>
      
          <!-- Main Content -->
          <div style="padding: 30px; background-color: white;">
            <p style="margin-bottom: 20px; font-size: 16px; line-height: 1.5;">You're about to unlock a platform made just for you. Safety, compliance, getting more done – all way easier from here.</p>
            
            <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.5;">We're excited to have you join our waitlist! Your email <strong style="color: #FF1493;">${email}</strong> has been registered successfully.</p>
            
            <h2 style="color: #333; font-size: 20px; margin-top: 25px; margin-bottom: 15px; border-left: 4px solid #39FF14; padding-left: 10px;">What's Next?</h2>
            
            <ul style="padding-left: 20px; margin-bottom: 20px;">
              <li style="margin-bottom: 10px; line-height: 1.5;">✅ <strong>You're officially on the waitlist</strong> – we'll keep you updated on our launch.</li>
              <li style="margin-bottom: 10px; line-height: 1.5;">✅ <strong>Early access members</strong> get exclusive insights and a chance to shape the platform.</li>
              <li style="margin-bottom: 10px; line-height: 1.5;">✅ <strong>Stay tuned</strong> for expert tips, safety best practices, and platform updates.</li>
            </ul>
            
            <p style="margin: 20px 0; padding: 15px; background-color: #f8f8f8; border-radius: 5px; line-height: 1.5; font-style: italic;">Our mission is simple: to give operators more control over their own safety and performance while making workplaces smarter and more efficient.</p>
            
            <p style="margin: 20px 0; line-height: 1.5;">Got questions? We'd love to hear from you! Just reach out at <a href="mailto:hello@forku.app" style="color: #FF1493; text-decoration: none; font-weight: bold;">hello@forku.app</a>, and our team will be happy to chat.</p>
          </div>
          
          <!-- Footer -->
          <div style="padding: 20px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #eee;">
            <p style="margin-bottom: 5px; font-weight: bold;">Welcome aboard,</p>
            <p style="margin-top: 0; color: #FF1493; font-weight: bold;">The ForkU Team</p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Email enviado con éxito:', info.messageId);

    return { 
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error: unknown) {
    const emailError = error as Error;
    
    // Manejar errores específicos
    if (emailError.message && emailError.message.includes('Invalid login')) {
      return {
        success: false,
        error: 'Error de autenticación con AWS SES. Por favor verifica las credenciales.'
      };
    }
    
    if (emailError.message && emailError.message.includes('Greeting never received')) {
      return {
        success: false,
        error: 'No se pudo conectar al servidor SMTP. Verifica la configuración del host y puerto.'
      };
    }
    
    // Manejar error de timeout
    if (emailError.message && emailError.message.includes('timeout')) {
      return {
        success: false,
        error: 'Tiempo de espera agotado al conectar con el servidor SMTP. Verifica tu red o firewall.'
      };
    }
    
    return { 
      success: false, 
      error: 'Error al enviar el email: ' + emailError.message
    };
  }


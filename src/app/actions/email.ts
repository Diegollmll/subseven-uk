'use server';
import nodemailer from 'nodemailer';

// Variables de entorno con logging mejorado
const MAIL_HOST = process.env.NEXT_PUBLIC_MAIL_HOST;
const MAIL_PORT = parseInt(process.env.NEXT_PUBLIC_MAIL_PORT || '465');
const MAIL_USERNAME = process.env.NEXT_PUBLIC_MAIL_USERNAME;
const MAIL_PASSWORD = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL;
const RECIPIENT_EMAIL = process.env.NEXT_PUBLIC_RECIPIENT_EMAIL;

// Server Action para enviar email con Nodemailer usando Amazon SES
export async function sendWaitlistEmail(formData: { email: string }) {
  console.log('[EMAIL] Iniciando proceso de envío de email');

  try {
    const { email } = formData;
    console.log(`[EMAIL] Email del usuario: ${email}`);

    if (!email) {
      console.log('[EMAIL] Error: Email no proporcionado');
      return { 
        success: false, 
        error: 'Email is required' 
      };
    }

    // Verificar credenciales
    if (!MAIL_USERNAME || !MAIL_PASSWORD) {
      console.error('[EMAIL] Error: Credenciales no encontradas en variables de entorno');
      // En producción, tratamos de continuar de todos modos
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
      secure: true, // true para puerto 465, false para otros puertos
      auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
      },
      debug: true, // Siempre activar debug para diagnóstico
      logger: true  // Activar logger de nodemailer
    });

    // Verificar la conexión antes de enviar
    try {
      console.log('[EMAIL] Verificando conexión con servidor SMTP...');
      await transporter.verify();
      console.log('[EMAIL] Conexión SMTP verificada exitosamente');
    } catch (verifyError) {
      console.error('[EMAIL] Error verificando conexión SMTP:', verifyError);
      // En producción, intentados enviar de todos modos
      throw verifyError;
    }

    const message = `New registration in ForkU Waitlist: ${email}`;
    
    // Enviar email directamente
    const mailOptions = {
      from: SENDER_EMAIL,
      to: RECIPIENT_EMAIL,
      subject: 'New registration in ForkU Waitlist',
      text: message,
      html: `<div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #FF1493;">¡Nueva inscripción en la lista de espera!</h2>
        <p>Se ha registrado un nuevo correo electrónico:</p>
        <p style="background-color: #f8f8f8; padding: 10px; border-left: 4px solid #39FF14;"><strong>${email}</strong></p>
        <p>Fecha y hora: ${new Date().toLocaleString()}</p>
        <hr style="border: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">Este es un mensaje automático del sistema ForkU.</p>
      </div>`,
    };

    console.log('[EMAIL] Intentando enviar email a través de SES...');
    console.log(`[EMAIL] Detalles: De: ${SENDER_EMAIL}, Para: ${RECIPIENT_EMAIL}`);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Email enviado con éxito:', info.messageId);

    return { 
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error: unknown) {
    const emailError = error as Error;
    console.error('[EMAIL] Error al enviar email:', emailError.message);
    console.error('[EMAIL] Stack completo:', emailError.stack);
    
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
} 
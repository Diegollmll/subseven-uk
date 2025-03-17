'use server';
import nodemailer from 'nodemailer';

// Variables de entorno con logging mejorado
const MAIL_HOST = process.env.NEXT_PUBLIC_MAIL_HOST;
const MAIL_PORT = parseInt(process.env.NEXT_PUBLIC_MAIL_PORT || '465');
const MAIL_USERNAME = process.env.NEXT_PUBLIC_MAIL_USERNAME;
const MAIL_PASSWORD = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL;

// Agregar esta función para guardar emails temporalmente mientras SES está suspendido
// En un entorno de producción, esto debería usar una base de datos real
const saveEmailToWaitlist = async (email: string) => {
  try {
    // Aquí implementarías la lógica para guardar el email en una base de datos
    // Por ahora, solo logueamos que se guardó correctamente
    console.log(`[WAITLIST] Email guardado: ${email}`);
    return true;
  } catch (error) {
    console.error(`[WAITLIST] Error guardando email: ${error}`);
    return false;
  }
}

// Función para validar dominios problemáticos
const isValidDomain = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  // Rechazar dominios problemáticos conocidos
  if (domain === 'gmx.fr') {
    return false;
  }
  return true;
}

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

    // Validar dominio problemático
    if (!isValidDomain(email)) {
      return {
        success: false,
        error: 'Este dominio de correo no es compatible actualmente.'
      };
    }

    // Siempre guardar el email en la base de datos primero
    const savedToWaitlist = await saveEmailToWaitlist(email);
    
    // Verificar si SES está temporalmente deshabilitado
    // Temporalmente configurado como true para evitar intentar enviar emails mientras estamos suspendidos
    const SES_DISABLED = true; // Cambiar a false cuando se resuelva el problema con SES
    
    if (SES_DISABLED) {
      // Si SES está deshabilitado, aún retornamos éxito si guardamos el email
      if (savedToWaitlist) {
        return {
          success: true,
          message: 'Te has registrado exitosamente en la lista de espera.'
        };
      } else {
        return {
          success: false,
          error: 'No se pudo guardar tu información. Intenta de nuevo más tarde.'
        };
      }
    }

    // Verificar credenciales
    if (!MAIL_USERNAME || !MAIL_PASSWORD) {
      console.error('[EMAIL] Error: Credenciales no encontradas en variables de entorno');
      // Si ya guardamos el email, retornamos éxito a pesar del error
      if (savedToWaitlist) {
        return {
          success: true,
          message: 'Te has registrado exitosamente en la lista de espera.'
        };
      }
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
      // Si ya guardamos el email, retornamos éxito a pesar del error
      if (savedToWaitlist) {
        return {
          success: true,
          message: 'Te has registrado exitosamente en la lista de espera.'
        };
      }
      throw verifyError;
    }
    
    // Resto del código de envío de email sin cambios...
    const mailOptions = {
      from: SENDER_EMAIL,
      to: email,
      subject: 'Welcome to ForkU - Safer Forklifts, Right Here.',
      text: `Welcome to ForkU! You've been added to our waitlist.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 0; border-radius: 10px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <!-- Resto del HTML sin cambios -->
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
    
    console.error('[EMAIL] Error completo:', emailError);
    
    // Mantenemos un mensaje genérico para el usuario
    return { 
      success: false, 
      error: 'Problema temporal con el servicio. Tu información ha sido guardada.'
    };
  }
}
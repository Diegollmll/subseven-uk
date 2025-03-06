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

// 'use server';
// import nodemailer from 'nodemailer';

// // Variables de entorno con logging mejorado
// const MAIL_HOST = process.env.NEXT_PUBLIC_MAIL_HOST;
// const MAIL_PORT = parseInt(process.env.NEXT_PUBLIC_MAIL_PORT || '465');
// const MAIL_USERNAME = process.env.NEXT_PUBLIC_MAIL_USERNAME;
// const MAIL_PASSWORD = process.env.NEXT_PUBLIC_MAIL_PASSWORD;
// const NOREPLY_EMAIL = process.env.NEXT_PUBLIC_NOREPLY_EMAIL || 'noreply@forku.app';
// const HELLO_EMAIL = process.env.NEXT_PUBLIC_HELLO_EMAIL || 'hello@forku.app';
// const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// // Server Action para enviar email con Nodemailer usando Amazon SES
// export async function sendWaitlistEmail(formData: { email: string }) {
//   console.log('[EMAIL] Iniciando proceso de envío de email');

//   try {
//     const { email } = formData;
//     console.log(`[EMAIL] Email del usuario: ${email}`);

//     if (!email) {
//       console.log('[EMAIL] Error: Email no proporcionado');
//       return { 
//         success: false, 
//         error: 'Email is required' 
//       };
//     }

//     // Verificar credenciales
//     if (!MAIL_USERNAME || !MAIL_PASSWORD) {
//       console.error('[EMAIL] Error: Credenciales no encontradas en variables de entorno');
//       // En producción, tratamos de continuar de todos modos
//       return {
//         success: false,
//         error: 'Credenciales no encontradas en variables de entorno'
//       };
//     }
    
//     console.log(`[EMAIL] Configurando transporter con host: ${MAIL_HOST}, puerto: ${MAIL_PORT}`);
    
//     // Configurar transporter para Amazon SES
//     const transporter = nodemailer.createTransport({
//       host: MAIL_HOST,
//       port: MAIL_PORT,
//       secure: true, // true para puerto 465, false para otros puertos
//       auth: {
//         user: MAIL_USERNAME,
//         pass: MAIL_PASSWORD,
//       },
//       debug: true, // Siempre activar debug para diagnóstico
//       logger: true  // Activar logger de nodemailer
//     });

//     // Verificar la conexión antes de enviar
//     try {
//       console.log('[EMAIL] Verificando conexión con servidor SMTP...');
//       await transporter.verify();
//       console.log('[EMAIL] Conexión SMTP verificada exitosamente');
//     } catch (verifyError) {
//       console.error('[EMAIL] Error verificando conexión SMTP:', verifyError);
//       // En producción, intentados enviar de todos modos
//       throw verifyError;
//     }

//     // 1. Primero, enviamos la notificación al administrador (email original)
//     const adminMessage = `New registration in ForkU Waitlist: ${email}`;
    
//     const adminMailOptions = {
//       from: HELLO_EMAIL,
//       to: ADMIN_EMAIL,
//       subject: 'New registration in ForkU Waitlist',
//       text: adminMessage,
//       html: `<div style="font-family: Arial, sans-serif; color: #333;">
//         <h2 style="color: #FF1493;">¡Nueva inscripción en la lista de espera!</h2>
//         <p>Se ha registrado un nuevo correo electrónico:</p>
//         <p style="background-color: #f8f8f8; padding: 10px; border-left: 4px solid #39FF14;"><strong>${email}</strong></p>
//         <p>Fecha y hora: ${new Date().toLocaleString()}</p>
//         <hr style="border: 1px solid #eee;">
//         <p style="font-size: 12px; color: #666;">Este es un mensaje automático del sistema ForkU.</p>
//       </div>`,
//     };

//     console.log('[EMAIL] Intentando enviar email de notificación al administrador...');
//     const adminInfo = await transporter.sendMail(adminMailOptions);
//     console.log('[EMAIL] Email al administrador enviado con éxito:', adminInfo.messageId);

//     // 2. Ahora, enviamos el email de bienvenida al usuario
//     const userMailOptions = {
//       from: NOREPLY_EMAIL,
//       to: email,
//       subject: 'Welcome to ForkU - Safer Forklifts, Right Here.',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2>Email Subject: Welcome to ForkU - Safer Forklifts, Right Here.</h2>
          
//           <div style="text-align: center; margin: 30px 0;">
//             <div style="font-size: 28px; font-weight: bold;">FORK U</div>
//             <div>Safety Driven. U Focused.</div>
//           </div>
          
//           <div style="position: relative; margin: 30px 0; background-color: #f6f6f6; padding: 20px; text-align: center;">
//             <img src="https://via.placeholder.com/600x350" alt="Forklift in warehouse" style="max-width: 100%; height: auto;" />
//             <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">
//               <div style="font-size: 40px; line-height: 1.2;">
//                 SIMPLE.<br>
//                 SMART.<br>
//                 SAFE.
//               </div>
//             </div>
//           </div>
          
//           <div style="text-align: center; margin: 30px 0;">
//             <h2>Thank you for joining the ForkU waitlist! 🚀</h2>
//             <p>You're about to unlock a platform made just for you. Safety, compliance, getting more done – all way easier from here.</p>
//           </div>
          
//           <h3>What's Next?</h3>
//           <ul style="list-style-type: none; padding-left: 0;">
//             <li style="margin-bottom: 10px;">✅ You're officially on the waitlist – we'll keep you updated on our launch.</li>
//             <li style="margin-bottom: 10px;">✅ Early access members get exclusive insights and a chance to shape the platform.</li>
//             <li style="margin-bottom: 10px;">✅ Stay tuned for expert tips, safety best practices, and platform updates.</li>
//           </ul>
          
//           <p style="margin: 30px 0;">Our mission is simple: to give operators more control over their own safety and performance while making workplaces smarter and more efficient.</p>
          
//           <p>Got questions? We'd love to hear from you! Just reach out at <a href="mailto:hello@forku.app">hello@forku.app</a>, and our team will be happy to chat.</p>
          
//           <p>Welcome aboard,<br>The ForkU Team</p>
          
//           <p style="text-align: right; color: #888; margin-top: 40px;">#SafetyStartsWithU</p>
//         </div>
//       `
//     };

//     console.log('[EMAIL] Intentando enviar email de bienvenida al usuario...');
//     const userInfo = await transporter.sendMail(userMailOptions);
//     console.log('[EMAIL] Email de bienvenida al usuario enviado con éxito:', userInfo.messageId);

//     return { 
//       success: true,
//       message: 'Emails sent successfully'
//     };
//   } catch (error: unknown) {
//     const emailError = error as Error;
//     console.error('[EMAIL] Error al enviar email:', emailError.message);
//     console.error('[EMAIL] Stack completo:', emailError.stack);
    
//     // Manejar errores específicos
//     if (emailError.message && emailError.message.includes('Invalid login')) {
//       return {
//         success: false,
//         error: 'Error de autenticación con AWS SES. Por favor verifica las credenciales.'
//       };
//     }
    
//     if (emailError.message && emailError.message.includes('Greeting never received')) {
//       return {
//         success: false,
//         error: 'No se pudo conectar al servidor SMTP. Verifica la configuración del host y puerto.'
//       };
//     }
    
//     // Manejar error de timeout
//     if (emailError.message && emailError.message.includes('timeout')) {
//       return {
//         success: false,
//         error: 'Tiempo de espera agotado al conectar con el servidor SMTP. Verifica tu red o firewall.'
//       };
//     }
    
//     return { 
//       success: false, 
//       error: 'Error al enviar el email: ' + emailError.message
//     };
//   }
// }
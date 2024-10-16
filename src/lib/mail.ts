"use server";

import { Resend } from "resend";

export type SendVerificationEmailType = {
    token: string;
    email: string;
    name: string;
};

export type SendEmailUpdateEmailType = {
    email: string;
    token: string;
    name: string;
    newEmail: string;
};

export type SendAccountUpdateEmailType = {
    email: string;
    name: string;
};

export type sendPasswordResetEmailType = {
    email: string;
    token: string;
};

export type sendTwoFactorCodeEmailType = {
    email: string;
    code: string;
};

import { orderDeliveredTemplate, orderOnTheWayTemplate, orderShippedTemplate } from "@/components/emailsTemplates";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async ({ token, email, name }: SendVerificationEmailType) => {
    const confirmLink = `${domain}/auth/account-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirmação de Conta - Canecas Bertioga",
        html: `
      <h2>Olá, ${name}</h2>
      
      <p>
        Agradecemos por se registrar na <b>Canecas Bertioga</b>! Estamos prontos para fornencer uma experiência de compra aprimorada para você.
      </p>
      
      <p>
        Para completar o processo de criação da sua conta, por favor, clique no link abaixo para confirmar sua conta.
      </p>
      
      <a href="${confirmLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Confirmar Registro
      </a>
      
      <p>📞 Caso tenha qualquer dúvida, não hesite em nos contatar diretamente através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
      
      <p>Atenciosamente,<br>Equipe Canecas Bertioga</p>`,
    });
};


export const sendEmailUpdateEmail = async ({ email, name, token, newEmail }: SendEmailUpdateEmailType) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email, newEmail],
        subject: "Atualização de E-mail - Canecas Bertioga",
        html: `
      <h2>Olá, ${name}!</h2>
      
      <p>
      Recebemos um pedido para atualizar seu e-mail para ${newEmail} em nossa plataforma <b>Canecas Bertioga</b>.
      </p>
      
      <p>
      📞 Se você não solicitou essa alteração, por favor, entre em contato com nossa equipe de suporte imediatamente através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
      </p>
      
      <p>
      Para confirmar a atualização, clique no link abaixo para definir uma nova senha segura para sua conta.
      </p>
      
      <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Criar Nova Senha
      </a>

      <p>Atenciosamente,<br>Equipe Canecas Bertioga</p>`,
    });
};


export const sendAccountUpdateEmail = async ({ email, name }: SendAccountUpdateEmailType) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Atualização de Conta - Canecas Bertioga",
        html: `
      <h2>Olá, ${name}!</h2>
      
      <p>
      Informamos que os dados da sua conta foram atualizados com sucesso em <b>Canecas Bertioga</b>.
      </p>
      
      <p>
      📞 Se você não solicitou essa atualização, por favor, entre em contato com nossa equipe de suporte imediatamente através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
      </p>
      
      <p>
      Estamos à disposição para qualquer dúvida ou assistência que você possa precisar.
      </p>
      
      <p>Atenciosamente,<br>Equipe Canecas Bertioga</p>`,
    });
};

export const sendPasswordResetEmail = async ({ email, token }: sendPasswordResetEmailType) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Redefinição de Senha - Canecas Bertioga",
        html: `
      <h2>Solicitação de Redefinição de Senha</h2>
      
      <p>
      Recebemos uma solicitação para redefinir a senha da sua conta no <b>Canecas Bertioga</b>.
      </p>
      
     <p>
      📞 Se você não fez essa solicitação, por favor, entre em contato com nossa equipe de suporte imediatamente através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
      </p>
    
      <p>
      Caso deseje redefinir sua senha, clique no link abaixo para criar uma nova senha segura.
      </p>
      
      <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
      Redefinir Senha
      </a>
      
      <p>
      Estamos à disposição para qualquer dúvida ou assistência que você possa precisar.
      </p>
      
      <p>Atenciosamente,<br>Equipe Canecas Bertioga</p>`,
    });
};

export const sendTwoFactorCodeEmail = async ({ email, code }: sendTwoFactorCodeEmailType) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Código de Autenticação 2FA - Canecas Bertioga",
        html: `
      <h2>Código de Autenticação de Dois Fatores</h2>
      
      <p>
      Seu código de autenticação de dois fatores é: <strong>${code}</strong>
      </p>
      
      <p>
      Use este código para completar o processo de login. Se você não solicitou este código, por favor, ignore este e-mail.
      </p>

      <p>
      Para qualquer dúvida, nossa equipe de suporte está à disposição através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
      </p>
      
      <p>Atenciosamente,<br>Equipe Canecas Bertioga</p>`,
    });
};

export async function sendOrderShippedEmail(email: string, name: string, orderId: string) {
    const htmlContent = orderShippedTemplate(name, orderId);

    try {
        const emailSentByFunction = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "🚀 Seu pedido foi aprovado!",
            html: htmlContent,
        });
        console.log("emailSentByFunction:", emailSentByFunction);
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

export async function sendOrderOnTheWayEmail(email: string, name: string, orderId: string) {
    const htmlContent = orderOnTheWayTemplate(name, orderId);

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "🚚 Seu pedido está a caminho!",
            html: htmlContent,
        });
        console.log("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

export async function sendOrderDeliveredEmail(email: string, name: string, orderId: string) {
    const htmlContent = orderDeliveredTemplate(name, orderId);

    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "🎉 Seu pedido foi entregue!",
            html: htmlContent,
        });
        console.log("Email enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

export const orderShippedTemplate = (name: string, orderId: string) => {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #4CAF50;">🚀 Seu pedido esta sendo preparado para entrega!</h1>
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Temos ótimas notícias: seu pedido <strong>#${orderId}</strong> foi enviado para a nossa equipe de preparação! Nossa missão é garantir que tudo seja feito com o máximo de dedicação e carinho, para que você receba seu produto em perfeitas condições.</p>
        <p>Você pode acompanhar o status do seu pedido clicando no botão abaixo:</p>
        <a href="https://example.com/rastreio/${orderId}" 
           style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           📦 Acompanhar Pedido
        </a>
        <p style="margin-top: 20px;">Estamos super dedicados para garantir que sua experiência seja perfeita. Se precisar de algo, não hesite em nos chamar.</p>
        <p>✨ <strong>Obrigado</strong> por escolher Canecas Bertioga! Estamos à disposição.</p>
        <p>Atenciosamente,<br/>Equipe Canecas Bertioga</p>
      </div>
    `;
};

export const orderOnTheWayTemplate = (name: string, orderId: string) => {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #FFA500;">🚚 Seu pedido está a caminho!</h1>
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Seu pedido já saiu para entrega e logo estará com você. Fique de olho! 👀</p>
        <p>Você pode acompanhar a entrega em tempo real clicando no botão abaixo, ou utilizando o ID de rastreio: <strong>${orderId}</strong>  </p>
        <a href="https://example.com/rastreio/${orderId}" 
           style="display: inline-block; background-color: #FFA500; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           🚛 Acompanhar Entrega
        </a>
        <p style="margin-top: 20px;">Se tiver qualquer dúvida ou precisar de mais informações, nossa equipe está aqui para ajudar.</p>
  <p>📞 Não hesite em nos contatar diretamente através do <a href="https://wa.me/5511999999999" style="color: #FFA500;">nosso WhatsApp</a>.</p>
        <p>Atenciosamente,<br/>Equipe Canecas Bertioga</p>
      </div>
    `;
};

export const orderDeliveredTemplate = (name: string, orderId: string) => {
  return `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #4CAF50;">🎉 Seu pedido foi entregue!</h1>
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Estamos muito felizes em informar que seu pedido <strong>#${orderId}</strong> foi entregue com sucesso! Esperamos que você adore seu novo produto. 😍</p>
        <p>Gostaríamos muito de ouvir sua opinião. Clique no botão abaixo e deixe uma avaliação:</p>
        <a href="https://example.com/feedback/${orderId}" 
           style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           ⭐ Deixar Avaliação
        </a>
        <p style="margin-top: 20px;">Obrigado por confiar em nós. Nos dedicamos ao máximo para oferecer a melhor experiência possível.</p>
        <p>🌟 Esperamos vê-lo novamente em breve!</p>
        <p>Atenciosamente,<br/>Equipe Canecas Bertioga</p>
      </div>
    `;
};
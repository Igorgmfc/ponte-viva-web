export const WHATSAPP_NUMBER = "5521990519733";

export const getWhatsAppLink = (message: string = "Olá! Gostaria de agendar uma conversa sobre a Estratégia Viva.") => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const openWhatsApp = (message?: string) => {
  window.open(getWhatsAppLink(message), '_blank');
};
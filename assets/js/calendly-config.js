// Configuración de Calendly para nextAI
// ==================================================

const CALENDLY_CONFIG = {
  // URL del usuario de Calendly
  username: 'bruno-fernandez-paolini',
  
  // Nombre del evento (slug) - vacío para página principal
  eventSlug: '',
  
  // Parámetros adicionales
  hideDetails: true,
  hideGdprBanner: true,
  
  // Configuración del iframe
  iframeOptions: {
    width: '100%',
    height: '100%',
    frameborder: '0',
    style: 'border-radius: 8px; background: white;'
  },
  
  // Generar URL completa
  getFullUrl() {
    const baseUrl = this.eventSlug 
      ? `https://calendly.com/${this.username}/${this.eventSlug}`
      : `https://calendly.com/${this.username}`;
    const params = [];
    
    if (this.hideDetails) params.push('hide_landing_page_details=1');
    if (this.hideGdprBanner) params.push('hide_gdpr_banner=1');
    
    return params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl;
  },
  
  // Generar HTML del iframe
  getIframeHTML() {
    return `
      <iframe src="${this.getFullUrl()}" 
              width="${this.iframeOptions.width}" 
              height="${this.iframeOptions.height}" 
              frameborder="${this.iframeOptions.frameborder}"
              style="${this.iframeOptions.style}">
      </iframe>
    `;
  }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CALENDLY_CONFIG;
} else {
  window.CALENDLY_CONFIG = CALENDLY_CONFIG;
}

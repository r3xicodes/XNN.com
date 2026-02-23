/* ============================================
   XNN UI Manager
   ============================================ */

export class UIManager {
  constructor() {
    this.toastContainer = null;
    this.modalContainer = null;
    this.init();
  }

  init() {
    this.createToastContainer();
    this.createModalContainer();
    this.setupTabs();
  }

  // Create toast container
  createToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'xnn-toast-container';
    this.toastContainer.innerHTML = `
      <style>
        .xnn-toast-container {
          position: fixed;
          top: calc(var(--header-height) + var(--space-4));
          right: var(--space-4);
          z-index: var(--z-toast);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          max-width: 400px;
        }
        
        .xnn-toast {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--xnn-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          animation: slideInRight 0.3s ease-out;
        }
        
        .xnn-toast--success {
          border-left: 4px solid var(--xnn-success);
        }
        
        .xnn-toast--error {
          border-left: 4px solid var(--xnn-error);
        }
        
        .xnn-toast--warning {
          border-left: 4px solid var(--xnn-warning);
        }
        
        .xnn-toast--info {
          border-left: 4px solid var(--xnn-info);
        }
        
        .xnn-toast__icon {
          font-size: var(--text-xl);
        }
        
        .xnn-toast--success .xnn-toast__icon { color: var(--xnn-success); }
        .xnn-toast--error .xnn-toast__icon { color: var(--xnn-error); }
        .xnn-toast--warning .xnn-toast__icon { color: var(--xnn-warning); }
        .xnn-toast--info .xnn-toast__icon { color: var(--xnn-info); }
        
        .xnn-toast__content {
          flex: 1;
        }
        
        .xnn-toast__title {
          font-weight: var(--font-semibold);
          color: var(--xnn-gray-900);
          margin-bottom: var(--space-1);
        }
        
        .xnn-toast__message {
          font-size: var(--text-sm);
          color: var(--xnn-gray-600);
        }
        
        .xnn-toast__close {
          color: var(--xnn-gray-400);
          transition: color var(--transition-fast);
        }
        
        .xnn-toast__close:hover {
          color: var(--xnn-gray-600);
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        
        .xnn-toast.hiding {
          animation: slideOutRight 0.3s ease-out forwards;
        }
        
        @media (max-width: 640px) {
          .xnn-toast-container {
            left: var(--space-4);
            right: var(--space-4);
            max-width: none;
          }
        }
      </style>
    `;
    document.body.appendChild(this.toastContainer);
  }

  // Show toast notification
  showToast(message, type = 'info', title = '', duration = 5000) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `xnn-toast xnn-toast--${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]} xnn-toast__icon"></i>
      <div class="xnn-toast__content">
        ${title ? `<div class="xnn-toast__title">${title}</div>` : ''}
        <div class="xnn-toast__message">${message}</div>
      </div>
      <button class="xnn-toast__close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Close button
    const closeBtn = toast.querySelector('.xnn-toast__close');
    closeBtn.addEventListener('click', () => this.hideToast(toast));

    this.toastContainer.appendChild(toast);

    // Auto hide
    if (duration > 0) {
      setTimeout(() => this.hideToast(toast), duration);
    }

    return toast;
  }

  // Hide toast
  hideToast(toast) {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }

  // Create modal container
  createModalContainer() {
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'xnn-modal-container';
    this.modalContainer.innerHTML = `
      <style>
        .xnn-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: var(--z-modal-backdrop);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-base);
        }
        
        .xnn-modal-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .xnn-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.95);
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          background: var(--xnn-white);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-2xl);
          z-index: var(--z-modal);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-base);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .xnn-modal.active {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }
        
        .xnn-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) var(--space-6);
          border-bottom: 1px solid var(--xnn-gray-200);
        }
        
        .xnn-modal__title {
          font-family: var(--font-heading);
          font-size: var(--text-xl);
          font-weight: var(--font-bold);
          color: var(--xnn-gray-900);
        }
        
        .xnn-modal__close {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--xnn-gray-500);
          transition: all var(--transition-fast);
        }
        
        .xnn-modal__close:hover {
          background: var(--xnn-gray-100);
          color: var(--xnn-gray-700);
        }
        
        .xnn-modal__body {
          padding: var(--space-6);
          overflow-y: auto;
          flex: 1;
        }
        
        .xnn-modal__footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          border-top: 1px solid var(--xnn-gray-200);
          background: var(--xnn-gray-50);
        }
      </style>
    `;
    document.body.appendChild(this.modalContainer);
  }

  // Show modal
  showModal(options = {}) {
    const {
      title = '',
      content = '',
      footer = '',
      onClose = null,
      closeOnOverlay = true
    } = options;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'xnn-modal-overlay';

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'xnn-modal';
    modal.innerHTML = `
      ${title ? `
        <div class="xnn-modal__header">
          <h3 class="xnn-modal__title">${title}</h3>
          <button class="xnn-modal__close">
            <i class="fas fa-times"></i>
          </button>
        </div>
      ` : ''}
      <div class="xnn-modal__body">${content}</div>
      ${footer ? `<div class="xnn-modal__footer">${footer}</div>` : ''}
    `;

    // Close handlers
    const closeModal = () => {
      modal.classList.remove('active');
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
        if (onClose) onClose();
      }, 300);
    };

    modal.querySelector('.xnn-modal__close')?.addEventListener('click', closeModal);
    
    if (closeOnOverlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    // Close on escape
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    this.modalContainer.appendChild(overlay);
    overlay.appendChild(modal);

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    });

    return { modal, overlay, close: closeModal };
  }

  // Setup tabs
  setupTabs() {
    document.querySelectorAll('.xnn-trending-tabs').forEach(tabContainer => {
      const tabs = tabContainer.querySelectorAll('.xnn-trending-tab');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetId = tab.dataset.tab;
          
          // Deactivate all tabs
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.xnn-trending-content').forEach(c => c.classList.remove('active'));
          
          // Activate clicked tab
          tab.classList.add('active');
          document.getElementById(targetId + 'Content')?.classList.add('active');
        });
      });
    });
  }

  // Show loading spinner
  showLoading(container, message = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.className = 'xnn-loading';
    spinner.innerHTML = `
      <style>
        .xnn-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-12);
          gap: var(--space-4);
        }
        
        .xnn-loading__spinner {
          width: 48px;
          height: 48px;
          border: 3px solid var(--xnn-gray-200);
          border-top-color: var(--xnn-primary);
          border-radius: var(--radius-full);
          animation: spin 1s linear infinite;
        }
        
        .xnn-loading__message {
          font-size: var(--text-sm);
          color: var(--xnn-gray-500);
        }
      </style>
      <div class="xnn-loading__spinner"></div>
      <span class="xnn-loading__message">${message}</span>
    `;
    
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    
    if (container) {
      container.innerHTML = '';
      container.appendChild(spinner);
    }
    
    return spinner;
  }

  // Show error message
  showError(container, message, retryCallback = null) {
    const error = document.createElement('div');
    error.className = 'xnn-error';
    error.innerHTML = `
      <style>
        .xnn-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-12);
          gap: var(--space-4);
          text-align: center;
        }
        
        .xnn-error__icon {
          font-size: var(--text-5xl);
          color: var(--xnn-error);
        }
        
        .xnn-error__message {
          font-size: var(--text-lg);
          color: var(--xnn-gray-700);
        }
        
        .xnn-error__retry {
          margin-top: var(--space-4);
        }
      </style>
      <i class="fas fa-exclamation-circle xnn-error__icon"></i>
      <p class="xnn-error__message">${message}</p>
      ${retryCallback ? `
        <button class="xnn-btn xnn-btn--primary xnn-error__retry">
          <i class="fas fa-redo"></i> Try Again
        </button>
      ` : ''}
    `;
    
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    
    if (container) {
      container.innerHTML = '';
      container.appendChild(error);
      
      if (retryCallback) {
        error.querySelector('.xnn-error__retry').addEventListener('click', retryCallback);
      }
    }
    
    return error;
  }

  // Confirm dialog
  confirm(message, options = {}) {
    return new Promise((resolve) => {
      const { title = 'Confirm', confirmText = 'Confirm', cancelText = 'Cancel', type = 'warning' } = options;
      
      const colors = {
        warning: 'var(--xnn-warning)',
        danger: 'var(--xnn-error)',
        info: 'var(--xnn-info)'
      };

      const { close } = this.showModal({
        title,
        content: `<p style="font-size: var(--text-base); color: var(--xnn-gray-700);">${message}</p>`,
        footer: `
          <button class="xnn-btn xnn-btn--secondary" id="modalCancel">${cancelText}</button>
          <button class="xnn-btn" id="modalConfirm" style="background: ${colors[type]}; color: white;">${confirmText}</button>
        `,
        onClose: () => resolve(false)
      });

      document.getElementById('modalCancel')?.addEventListener('click', () => {
        close();
        resolve(false);
      });

      document.getElementById('modalConfirm')?.addEventListener('click', () => {
        close();
        resolve(true);
      });
    });
  }

  // Format date
  formatDate(date, options = {}) {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    
    const {
      relative = true,
      format = 'short'
    } = options;
    
    if (relative && diff < 86400000) { // Less than 24 hours
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      
      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    return d.toLocaleDateString('en-US', {
      year: format === 'long' ? 'numeric' : undefined,
      month: format === 'short' ? 'short' : 'long',
      day: 'numeric'
    });
  }

  // Truncate text
  truncate(text, length = 100, suffix = '...') {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + suffix;
  }

  // Debounce function
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function
  throttle(func, limit = 300) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

export default UIManager;

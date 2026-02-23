/* ============================================
   XNN Ticker Manager
   ============================================ */

import { DataStore } from './data.js';

export class TickerManager {
  constructor() {
    this.data = new DataStore();
    this.isPaused = false;
    this.init();
  }

  init() {
    this.renderTicker();
    this.setupControls();
  }

  renderTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    const items = this.data.getTickerItems();
    
    // Duplicate items for seamless loop
    const allItems = [...items, ...items];
    
    track.innerHTML = allItems.map(item => `
      <a href="${item.url}" class="xnn-ticker__item">
        <span class="xnn-ticker__item-time">${item.time}</span>
        <span class="xnn-ticker__item-category">${item.category}</span>
        <span class="xnn-ticker__item-text">${item.text}</span>
      </a>
    `).join('');
  }

  setupControls() {
    const pauseBtn = document.getElementById('tickerPause');
    const closeBtn = document.getElementById('tickerClose');
    const ticker = document.getElementById('breakingTicker');
    const track = document.getElementById('tickerTrack');

    // Pause/Play button
    pauseBtn?.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      
      if (this.isPaused) {
        track.style.animationPlayState = 'paused';
        pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        pauseBtn.setAttribute('aria-label', 'Play ticker');
      } else {
        track.style.animationPlayState = 'running';
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseBtn.setAttribute('aria-label', 'Pause ticker');
      }
    });

    // Close button
    closeBtn?.addEventListener('click', () => {
      ticker?.classList.add('xnn-ticker--hidden');
      
      // Store preference
      localStorage.setItem('xnn_ticker_closed', Date.now().toString());
      
      // Adjust main content padding
      this.adjustContentPadding();
    });

    // Check if ticker was recently closed
    const closedTime = localStorage.getItem('xnn_ticker_closed');
    if (closedTime) {
      const hoursSinceClosed = (Date.now() - parseInt(closedTime)) / (1000 * 60 * 60);
      if (hoursSinceClosed < 1) {
        ticker?.classList.add('xnn-ticker--hidden');
        this.adjustContentPadding();
      }
    }
  }

  adjustContentPadding() {
    const hero = document.querySelector('.xnn-hero');
    if (hero) {
      hero.style.paddingTop = 'calc(var(--header-height) + var(--space-6))';
    }
  }

  // Add new ticker item
  addItem(item) {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    const itemHTML = `
      <a href="${item.url}" class="xnn-ticker__item">
        <span class="xnn-ticker__item-time">${item.time}</span>
        <span class="xnn-ticker__item-category">${item.category}</span>
        <span class="xnn-ticker__item-text">${item.text}</span>
      </a>
    `;

    // Insert at beginning
    track.insertAdjacentHTML('afterbegin', itemHTML);
    
    // Show ticker if hidden
    const ticker = document.getElementById('breakingTicker');
    ticker?.classList.remove('xnn-ticker--hidden');
  }

  // Update ticker type
  setType(type) {
    const ticker = document.getElementById('breakingTicker');
    if (!ticker) return;

    // Remove existing type classes
    ticker.classList.remove('xnn-ticker--info', 'xnn-ticker--warning', 'xnn-ticker--emergency');
    
    // Add new type class
    if (type !== 'breaking') {
      ticker.classList.add(`xnn-ticker--${type}`);
    }

    // Update label
    const label = ticker.querySelector('.xnn-ticker__label-text');
    if (label) {
      const labels = {
        breaking: 'Breaking',
        info: 'Update',
        warning: 'Alert',
        emergency: 'Emergency'
      };
      label.textContent = labels[type] || 'Breaking';
    }
  }
}

export default TickerManager;

/* ============================================
   XANA NATIONAL NEWS (XNN) - VERSION 5.0
   Main JavaScript Module
   ============================================ */

import { AuthManager } from './modules/auth.js';
import { DataStore } from './modules/data.js';
import { UIManager } from './modules/ui.js';
import { TickerManager } from './modules/ticker.js';

// Initialize XNN Application
class XNNApp {
  constructor() {
    this.auth = new AuthManager();
    this.data = new DataStore();
    this.ui = new UIManager();
    this.ticker = new TickerManager();
    this.init();
  }

  init() {
    this.setupHeader();
    this.setupMobileMenu();
    this.setupSearch();
    this.setupBackToTop();
    this.setupNewsletter();
    this.renderHomepage();
    this.updateUserMenu();
  }

  // Header scroll behavior
  setupHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Mobile menu
  setupMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('mobileMenuClose');
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    if (!menuBtn || !menu) return;

    const openMenu = () => {
      menu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    menuBtn.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Submenu toggles
    const submenuTriggers = menu.querySelectorAll('[data-submenu]');
    submenuTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const submenuId = trigger.dataset.submenu;
        const submenu = document.getElementById(submenuId);
        submenu?.classList.toggle('active');
        trigger.querySelector('i')?.classList.toggle('fa-chevron-down');
        trigger.querySelector('i')?.classList.toggle('fa-chevron-up');
      });
    });
  }

  // Search overlay
  setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    if (!searchBtn || !searchOverlay) return;

    const openSearch = () => {
      searchOverlay.classList.add('active');
      searchInput?.focus();
      document.body.style.overflow = 'hidden';
    };

    const closeSearch = () => {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    searchBtn.addEventListener('click', openSearch);
    searchClose?.addEventListener('click', closeSearch);

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
      }
    });

    // Close on overlay click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  // Back to top button
  setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Newsletter form
  setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      
      // Show success message
      this.ui.showToast('Thank you for subscribing!', 'success');
      form.reset();
    });
  }

  // Render homepage content
  renderHomepage() {
    this.renderFeaturedStory();
    this.renderTopStories();
    this.renderCategories();
    this.renderLatestNews();
    this.renderMilitaryNews();
    this.renderWorldNews();
    this.renderVideos();
    this.renderOpinion();
    this.renderTrending();
    this.renderMostRead();
  }

  renderFeaturedStory() {
    const container = document.getElementById('heroFeatured');
    if (!container) return;

    const featured = this.data.getFeaturedStory();
    container.innerHTML = `
      <article class="xnn-hero-card">
        <div class="xnn-hero-card__image">
          <img src="${featured.image}" alt="${featured.title}" loading="eager">
        </div>
        <div class="xnn-hero-card__overlay"></div>
        <div class="xnn-hero-card__content">
          ${featured.breaking ? `<span class="xnn-hero-card__badge xnn-hero-card__badge--breaking"><i class="fas fa-bolt"></i> Breaking News</span>` : ''}
          <span class="xnn-hero-card__category">${featured.category}</span>
          <h1 class="xnn-hero-card__title">
            <a href="${featured.url}">${featured.title}</a>
          </h1>
          <p class="xnn-hero-card__excerpt">${featured.excerpt}</p>
          <div class="xnn-hero-card__meta">
            <span class="xnn-hero-card__author">
              <img src="${featured.author.avatar}" alt="${featured.author.name}" class="xnn-hero-card__author-avatar">
              ${featured.author.name}
            </span>
            <span>•</span>
            <span>${featured.timeAgo}</span>
          </div>
        </div>
      </article>
    `;
  }

  renderTopStories() {
    const container = document.getElementById('topStories');
    if (!container) return;

    const stories = this.data.getTopStories();
    const listHtml = stories.map((story, index) => `
      <article class="xnn-top-story">
        <span class="xnn-top-story__number">${index + 1}</span>
        <div class="xnn-top-story__content">
          <span class="xnn-top-story__category">${story.category}</span>
          <h3 class="xnn-top-story__title">
            <a href="${story.url}">${story.title}</a>
          </h3>
          <div class="xnn-top-story__meta">
            <span>${story.timeAgo}</span>
          </div>
        </div>
      </article>
    `).join('');

    container.innerHTML = `
      <h2 class="xnn-hero__section-title">Top Stories</h2>
      ${listHtml}
    `;
  }

  renderCategories() {
    const container = document.getElementById('categoryGrid');
    if (!container) return;

    const categories = this.data.getCategories();
    container.innerHTML = categories.map(cat => `
      <a href="${cat.url}" class="xnn-category-card">
        <div class="xnn-category-card__icon">
          <i class="fas ${cat.icon}"></i>
        </div>
        <span class="xnn-category-card__title">${cat.name}</span>
      </a>
    `).join('');
  }

  renderLatestNews() {
    const container = document.getElementById('latestNewsGrid');
    if (!container) return;

    const articles = this.data.getLatestNews();
    container.innerHTML = articles.map(article => this.createCardHTML(article)).join('');
  }

  renderMilitaryNews() {
    const container = document.getElementById('militaryGrid');
    if (!container) return;

    const articles = this.data.getMilitaryNews();
    container.innerHTML = articles.map(article => this.createCardHTML(article, true)).join('');
  }

  renderWorldNews() {
    const container = document.getElementById('worldGrid');
    if (!container) return;

    const articles = this.data.getWorldNews();
    container.innerHTML = articles.map(article => this.createCardHTML(article)).join('');
  }

  renderVideos() {
    const container = document.getElementById('videoGrid');
    if (!container) return;

    const videos = this.data.getVideos();
    container.innerHTML = videos.map(video => this.createVideoCardHTML(video)).join('');
  }

  renderOpinion() {
    const container = document.getElementById('opinionGrid');
    if (!container) return;

    const articles = this.data.getOpinion();
    container.innerHTML = articles.map(article => this.createOpinionCardHTML(article)).join('');
  }

  renderTrending() {
    const container = document.getElementById('trendingContent');
    if (!container) return;

    const articles = this.data.getTrending();
    container.innerHTML = this.createTrendingListHTML(articles);
  }

  renderMostRead() {
    const container = document.getElementById('mostReadContent');
    if (!container) return;

    const articles = this.data.getMostRead();
    container.innerHTML = this.createTrendingListHTML(articles);
  }

  createCardHTML(article, isDark = false) {
    return `
      <article class="xnn-card xnn-card--shadow xnn-card--hover ${article.breaking ? 'xnn-card--breaking' : ''}">
        <div class="xnn-card__image">
          <img src="${article.image}" alt="${article.title}" loading="lazy">
          ${article.breaking ? '<span class="xnn-card__badge xnn-card__badge--breaking">Breaking</span>' : ''}
          ${article.exclusive ? '<span class="xnn-card__badge xnn-card__badge--exclusive">Exclusive</span>' : ''}
        </div>
        <div class="xnn-card__content">
          <div class="xnn-card__meta">
            <a href="${article.categoryUrl}" class="xnn-card__category">${article.category}</a>
            <span class="xnn-card__date">${article.timeAgo}</span>
          </div>
          <h3 class="xnn-card__title">
            <a href="${article.url}">${article.title}</a>
          </h3>
          <p class="xnn-card__excerpt">${article.excerpt}</p>
          <div class="xnn-card__footer">
            <a href="${article.author.url}" class="xnn-card__author">
              <img src="${article.author.avatar}" alt="${article.author.name}" class="xnn-card__author-avatar">
              <span class="xnn-card__author-name">${article.author.name}</span>
            </a>
            <div class="xnn-card__stats">
              <span class="xnn-card__stat"><i class="far fa-eye"></i> ${article.views}</span>
              <span class="xnn-card__stat"><i class="far fa-comment"></i> ${article.comments}</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  createVideoCardHTML(video) {
    return `
      <article class="xnn-card xnn-card--shadow xnn-card--hover xnn-card--video">
        <div class="xnn-card__image">
          <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
          <span class="xnn-card__duration">${video.duration}</span>
        </div>
        <div class="xnn-card__content">
          <div class="xnn-card__meta">
            <span class="xnn-card__category">${video.category}</span>
            <span class="xnn-card__date">${video.timeAgo}</span>
          </div>
          <h3 class="xnn-card__title">
            <a href="${video.url}">${video.title}</a>
          </h3>
        </div>
      </article>
    `;
  }

  createOpinionCardHTML(article) {
    return `
      <article class="xnn-card xnn-card--shadow xnn-card--hover xnn-card--opinion">
        <div class="xnn-card__content">
          <div class="xnn-card__meta">
            <span class="xnn-card__category">Opinion</span>
            <span class="xnn-card__date">${article.timeAgo}</span>
          </div>
          <blockquote class="xnn-card__quote">${article.quote}</blockquote>
          <div class="xnn-card__footer">
            <a href="${article.author.url}" class="xnn-card__author">
              <img src="${article.author.avatar}" alt="${article.author.name}" class="xnn-card__author-avatar">
              <span class="xnn-card__author-name">${article.author.name}</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  createTrendingListHTML(articles) {
    return `
      <div class="xnn-trending-list">
        ${articles.map((article, index) => `
          <article class="xnn-trending-item">
            <span class="xnn-trending-item__rank ${index < 3 ? 'xnn-trending-item__rank--top' : ''}">${index + 1}</span>
            <div class="xnn-trending-item__content">
              <h3 class="xnn-trending-item__title">
                <a href="${article.url}">${article.title}</a>
              </h3>
              <div class="xnn-trending-item__meta">
                <span>${article.category}</span>
                <span>•</span>
                <span>${article.timeAgo}</span>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  // Update user menu based on auth state
  updateUserMenu() {
    const user = this.auth.getCurrentUser();
    const trigger = document.getElementById('userMenuTrigger');
    if (!trigger || !user) return;

    const avatar = trigger.querySelector('.xnn-user-menu__avatar');
    const name = trigger.querySelector('.xnn-user-menu__name');
    
    if (avatar) avatar.textContent = user.firstName[0];
    if (name) name.textContent = user.firstName;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.xnnApp = new XNNApp();
});

// Export for module use
export default XNNApp;

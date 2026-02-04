/**
 * Portfolio Enhancement JavaScript
 * Handles smooth scrolling, animations, filtering, and interactive features
 */

(function() {
  'use strict';

  // ==========================================================================
  // Smooth Scrolling
  // ==========================================================================
  function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Fade-in Animations on Scroll
  // ==========================================================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  // ==========================================================================
  // Scroll to Top Button
  // ==========================================================================
  function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
      } else {
        scrollButton.classList.remove('show');
      }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Project Filtering
  // ==========================================================================
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            // Add fade-in animation
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // Mobile Menu Enhancement (if needed)
  // ==========================================================================
  function initMobileMenu() {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Close mobile menu when clicking on a link
      const navLinks = document.querySelectorAll('.masthead__menu-item a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          // Minimal Mistakes theme handles menu, but we can add enhancements
          const menuToggle = document.querySelector('.masthead__menu-item-toggle');
          if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
          }
        });
      });
    }
  }

  // ==========================================================================
  // Initialize all features when DOM is ready
  // ==========================================================================
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initSmoothScrolling();
        initScrollAnimations();
        initScrollToTop();
        initProjectFiltering();
        initMobileMenu();
      });
    } else {
      // DOM is already loaded
      initSmoothScrolling();
      initScrollAnimations();
      initScrollToTop();
      initProjectFiltering();
      initMobileMenu();
    }
  }

  // Start initialization
  init();

  // Re-initialize on window resize (for responsive features)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initMobileMenu();
    }, 250);
  });

})();

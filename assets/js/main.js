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
  // Expanded Project Feature
  // ==========================================================================
  function initExpandedProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const expandParam = urlParams.get('expand');
    
    if (!expandParam) return;

    // Get projects data from JSON
    const projectsDataEl = document.getElementById('projects-data');
    if (!projectsDataEl) return;
    
    let projects;
    try {
      projects = JSON.parse(projectsDataEl.textContent);
    } catch (e) {
      console.error('Error parsing projects data:', e);
      return;
    }
    
    const project = projects.find(p => p.slug === expandParam);
    
    if (!project) return;

    // Populate expanded project section
    const expandedSection = document.getElementById('expanded-project');
    if (!expandedSection) return;

    const titleEl = document.getElementById('expanded-title');
    const descriptionEl = document.getElementById('expanded-description');
    const categoryEl = document.getElementById('expanded-category');
    const imageEl = document.getElementById('expanded-image');
    const imageSrc = document.getElementById('expanded-image-src');
    const bodyEl = document.getElementById('expanded-body');
    const techEl = document.getElementById('expanded-technologies');
    const linksEl = document.getElementById('expanded-links');

    if (titleEl) titleEl.textContent = project.title || '';
    if (descriptionEl) descriptionEl.textContent = project.description || '';
    
    if (project.category && categoryEl) {
      categoryEl.textContent = project.category;
      categoryEl.style.display = 'inline-block';
    }

    if (project.image && imageEl && imageSrc) {
      imageSrc.src = project.image.startsWith('/') ? project.image : '/' + project.image;
      imageSrc.alt = project.title || '';
      imageEl.style.display = 'block';
    }

    // Convert markdown content to HTML (basic conversion)
    if (project.content && bodyEl) {
      // For now, just display raw content - Jekyll should have already converted it
      // But since we're getting it from JSON, it might be markdown
      bodyEl.innerHTML = project.content;
    }

    if (project.technologies && project.technologies.length > 0 && techEl) {
      techEl.innerHTML = '<h3>Technologies</h3><div class="tech-badges">' +
        project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('') +
        '</div>';
      techEl.style.display = 'block';
    }

    if (project.links && project.links.length > 0 && linksEl) {
      linksEl.innerHTML = '<h3>Links</h3><div class="project-links">' +
        project.links.map(link => 
          `<a href="${link.url}" class="project-link" target="_blank" rel="noopener noreferrer">
            <i class="${link.icon || 'fas fa-external-link-alt'}"></i> ${link.label}
          </a>`
        ).join('') +
        '</div>';
      linksEl.style.display = 'block';
    }

    // Show expanded section and scroll to it
    expandedSection.style.display = 'block';
    
    // Hide the corresponding project card in the grid
    const projectCard = document.querySelector(`[data-project-slug="${expandParam}"]`);
    if (projectCard) {
      projectCard.style.display = 'none';
    }

    // Scroll to expanded section
    setTimeout(() => {
      expandedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  // Collapse expanded project
  window.collapseProject = function() {
    const expandedSection = document.getElementById('expanded-project');
    if (expandedSection) {
      expandedSection.style.display = 'none';
    }

    // Show all project cards
    document.querySelectorAll('.project-card').forEach(card => {
      card.style.display = '';
    });

    // Remove query parameter from URL
    const url = new URL(window.location);
    url.searchParams.delete('expand');
    window.history.replaceState({}, '', url);
  };

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
        initExpandedProject();
      });
    } else {
      // DOM is already loaded
      initSmoothScrolling();
      initScrollAnimations();
      initScrollToTop();
      initProjectFiltering();
      initMobileMenu();
      initExpandedProject();
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

---
layout: archive
title: "Projects"
permalink: /projects/
---

<div class="projects-page fade-in">
  <!-- Project Filters -->
  <div class="project-filters fade-in">
    <button class="filter-btn active" data-filter="all">All Projects</button>
    {% assign categories = site.projects | map: 'category' | uniq | compact %}
    {% for category in categories %}
    <button class="filter-btn" data-filter="{{ category | downcase | replace: ' ', '-' }}">{{ category }}</button>
    {% endfor %}
  </div>

  <!-- Projects Grid -->
  <div class="entries-grid projects-grid">
    {% for project in site.projects %}
      <article class="archive__item project-card" 
               data-category="{% if project.category %}{{ project.category | downcase | replace: ' ', '-' }}{% else %}all{% endif %}">
        {% if project.image %}
        <div class="archive__item-teaser project-image">
          <a href="{{ project.url | relative_url }}">
            <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
            <div class="project-overlay">
              <span class="project-link-text">View Project <i class="fas fa-arrow-right"></i></span>
            </div>
          </a>
        </div>
        {% endif %}
        
        <div class="project-content">
          {% if project.category %}
          <span class="project-category">{{ project.category }}</span>
          {% endif %}
          
          <h2 class="archive__item-title project-title">
            <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
          </h2>
          
          {% if project.description %}
            <div class="archive__item-excerpt project-description">
              <p>{{ project.description }}</p>
            </div>
          {% endif %}

          {% if project.technologies %}
          <div class="project-technologies">
            {% for tech in project.technologies %}
            <span class="tech-badge">{{ tech }}</span>
            {% endfor %}
          </div>
          {% endif %}

          {% if project.links %}
          <div class="project-links">
            {% for link in project.links %}
            <a href="{{ link.url }}" class="project-link" target="_blank" rel="noopener noreferrer">
              <i class="{{ link.icon | default: 'fas fa-external-link-alt' }}"></i> {{ link.label }}
            </a>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  {% if site.projects.size == 0 %}
  <p class="no-projects">No projects to display yet. Check back soon!</p>
  {% endif %}
</div>
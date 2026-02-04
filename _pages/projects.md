---
layout: archive
title: "Projects"
permalink: /projects/
---

<div class="projects-page fade-in">
  <!-- Expanded Project Section (populated by JavaScript) -->
  <div class="expanded-project-section fade-in" id="expanded-project" style="display: none;">
    <div class="expanded-project-header">
      <h2 class="expanded-project-title" id="expanded-title"></h2>
      <button class="collapse-project-btn" onclick="collapseProject()" aria-label="Collapse project">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="expanded-project-image" id="expanded-image" style="display: none;">
      <img id="expanded-image-src" src="" alt="">
    </div>
    
    <div class="expanded-project-content">
      <span class="expanded-project-category" id="expanded-category" style="display: none;"></span>
      <p class="expanded-project-description" id="expanded-description"></p>
      <div class="expanded-project-body" id="expanded-body"></div>
      <div class="expanded-project-technologies" id="expanded-technologies" style="display: none;"></div>
      <div class="expanded-project-links" id="expanded-links" style="display: none;"></div>
    </div>
  </div>

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
               data-project-slug="{{ project.path | split: '/' | last | split: '.' | first }}"
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

<!-- Store project data for JavaScript -->
<script type="application/json" id="projects-data">
[
  {% for project in site.projects %}
  {
    "slug": "{{ project.path | split: '/' | last | split: '.' | first }}",
    "title": {{ project.title | jsonify }},
    "description": {{ project.description | jsonify }},
    "category": {{ project.category | jsonify }},
    "image": {{ project.image | jsonify }},
    "content": {{ project.content | jsonify }},
    "technologies": {{ project.technologies | jsonify }},
    "links": {{ project.links | jsonify }}
  }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
</script>
---
permalink: /about/
title: "About"
---

<div class="about-content fade-in">
  <div class="about-intro">
    <h2>About Me</h2>
    <p>{{ site.author.bio | markdownify }}</p>
    <p>I'm passionate about leveraging cutting-edge technology to solve complex problems in healthcare and neuroscience. My research focuses on developing innovative solutions that bridge the gap between engineering and medicine.</p>
  </div>

  <!-- Experience Timeline -->
  {% if site.data.experience %}
  <section class="experience-section fade-in">
    <h2>Education & Experience</h2>
    <div class="timeline">
      {% for item in site.data.experience %}
      <div class="timeline-item {% if item.current %}current{% endif %}">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3 class="timeline-title">{{ item.title }}</h3>
            <span class="timeline-date">
              {% if item.current %}
                {{ item.start_date }} - Present
              {% else %}
                {{ item.start_date }} - {{ item.end_date }}
              {% endif %}
            </span>
          </div>
          <p class="timeline-organization">
            <i class="fas fa-building"></i> {{ item.organization }}
            <span class="timeline-location">
              <i class="fas fa-map-marker-alt"></i> {{ item.location }}
            </span>
          </p>
          {% if item.description %}
          <p class="timeline-description">{{ item.description }}</p>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <!-- Skills Section -->
  {% if site.data.skills %}
  <section class="about-skills-section fade-in">
    <h2>Skills & Expertise</h2>
    <div class="skills-grid">
      {% for skill_category in site.data.skills %}
      <div class="skill-category">
        <h3 class="skill-category-title">{{ skill_category.category }}</h3>
        <div class="skill-items">
          {% for skill in skill_category.items %}
          <span class="skill-badge skill-{{ skill.level | downcase }}">
            {{ skill.name }}
            <span class="skill-level">{{ skill.level }}</span>
          </span>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <!-- Contact Section -->
  <section class="contact-section fade-in">
    <h2>Get In Touch</h2>
    <p>I'm always interested in discussing new opportunities, collaborations, or just having a chat about biomedical engineering, AI, or digital health.</p>
    <div class="contact-buttons">
      <a href="mailto:{{ site.email }}" class="btn btn--primary">
        <i class="fas fa-envelope"></i> Email Me
      </a>
      {% if site.author.links %}
        {% for link in site.author.links %}
        <a href="{{ link.url }}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
          <i class="{{ link.icon }}"></i> {{ link.label }}
        </a>
        {% endfor %}
      {% endif %}
    </div>
  </section>
</div>
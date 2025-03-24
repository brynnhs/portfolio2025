---
layout: archive
title: "Projects"
permalink: /projects/
---

<div class="entries-grid">
  {% for project in site.projects %}
    <article class="archive__item">
      {% if project.image %}
      <div class="archive__item-teaser" style="margin-bottom: 3px;">
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
        </a>
      </div>
      {% endif %}
      
      <h2 class="archive__item-title" style="margin-top: 3px;">
        <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      </h2>
      
      {% if project.description %}
        <div class="archive__item-excerpt" style="margin-top: 3px;">
          <p>{{ project.description }}</p>
        </div>
      {% endif %}
    </article>
  {% endfor %}
</div>
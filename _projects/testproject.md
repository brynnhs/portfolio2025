---
title: "My Project Title"
date: 2025-03-24
image: "/assets/bio-photo.jpg"
description: "A short description of the project."
---

{% assign entries_layout = 'grid' %}
<div class="entries-{{ entries_layout }}">
  {% for project in site.projects %}
    <article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">
      {% if project.image %}
        <div class="archive__item-teaser">
          <a href="{{ project.url | relative_url }}">
            <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
          </a>
        </div>
      {% endif %}
      <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
      </h2>
      {% if project.description %}
        <p>{{ project.description }}</p>
      {% endif %}
    </article>
  {% endfor %}
</div>
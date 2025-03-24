---
layout: archive
title: "Projects"
permalink: /projects/
---

Here you'll find a collection of my recent projects, work, and more.

{% assign entries_layout = 'grid' %}
<div class="entries-{{ entries_layout }}">
  {% include documents-collection.html entries=site.projects type=entries_layout %}
</div>

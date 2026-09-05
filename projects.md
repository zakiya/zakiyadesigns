---
title: Projects
permalink: /projects/
---

{%- assign projects = site.projects | sort: "year" | reverse -%}
{%- if projects.size > 0 %}
<ul class="entry-list">
  {%- for item in projects -%}
    {%- include entry.html item=item heading="h2" -%}
  {%- endfor -%}
</ul>
{%- else %}
Nothing here yet.
{%- endif -%}

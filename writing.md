---
title: Writing
permalink: /writing/
intro: Essays and notes, personal and professional.
---

{%- assign essays = site.writing | sort: "date" | reverse -%}
{%- if essays.size > 0 %}
<div class="filters" role="group" aria-label="Filter writing by kind">
  <button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>
  <button class="filter" type="button" data-filter="professional" aria-pressed="false">Professional</button>
  <button class="filter" type="button" data-filter="personal" aria-pressed="false">Personal</button>
</div>

<ul class="entry-list" id="writing-list">
  {%- for item in essays -%}
    {%- include entry.html item=item kind_badge=true heading="h2" -%}
  {%- endfor -%}
</ul>

<p class="entry-meta" id="filter-status" role="status"></p>

<script>
  // Progressive enhancement: with JS off, every piece is listed.
  (function () {
    var buttons = document.querySelectorAll('.filter');
    var items = document.querySelectorAll('#writing-list .entry');
    var status = document.getElementById('filter-status');

    function apply(kind) {
      var shown = 0;
      items.forEach(function (li) {
        var badge = li.querySelector('.badge');
        var itemKind = badge ? badge.textContent.trim() : '';
        var match = kind === 'all' || itemKind === kind;
        li.hidden = !match;
        if (match) { shown++; }
      });
      status.textContent = shown + (shown === 1 ? ' piece' : ' pieces') + ' shown.';
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        apply(btn.dataset.filter);
      });
    });
  })();
</script>
{%- else %}
Nothing here yet.
{%- endif -%}

---
title: Posts
permalink: /posts/
---

{%- include sorted-posts.html -%} {%- if posts.size > 0 %}
<div class="filters" role="group" aria-label="Filter posts by kind">
  <button class="filter" type="button" data-filter="all" aria-pressed="true">All</button>
  <button class="filter" type="button" data-filter="professional" aria-pressed="false">Professional</button>
  <button class="filter" type="button" data-filter="personal" aria-pressed="false">Personal</button>
</div>

<ul class="entry-list" id="post-list">
  {%- for item in posts -%}
    {%- include entry.html item=item heading="h2" tags=true -%}
  {%- endfor -%}
</ul>

<p class="entry-meta" id="active-topic" hidden>
  Showing posts tagged <strong id="active-topic-name"></strong>.
  <a href="#" id="clear-topic">Show all topics</a>
</p>

<p class="entry-meta" id="filter-status" role="status"></p>

<script>
  // Progressive enhancement: with JS off, every post is listed. The topic
  // links in the home page tag cloud arrive here as #tag=<slug>.
  (function () {
    var buttons = document.querySelectorAll('.filter');
    var items = document.querySelectorAll('#post-list .entry');
    var status = document.getElementById('filter-status');
    var topicBar = document.getElementById('active-topic');
    var topicName = document.getElementById('active-topic-name');
    var kind = 'all';

    function currentTopic() {
      var m = window.location.hash.match(/^#tag=(.+)$/);
      return m ? decodeURIComponent(m[1]) : '';
    }

    function apply() {
      var topic = currentTopic();
      var shown = 0;
      items.forEach(function (li) {
        var badge = li.querySelector('.badge');
        var itemKind = badge ? badge.textContent.trim() : '';
        var tags = (li.dataset.tags || '').split('|');
        var match = (kind === 'all' || itemKind === kind) &&
                    (topic === '' || tags.indexOf(topic) !== -1);
        li.hidden = !match;
        if (match) { shown++; }
      });

      if (topic) {
        // Show the tag as written, not the slug, by reading it off a match.
        var sample = null;
        items.forEach(function (li) {
          if (!sample && !li.hidden && li.dataset.tags.split('|').indexOf(topic) !== -1) { sample = li; }
        });
        topicName.textContent = topic.replace(/-/g, ' ');
        topicBar.hidden = false;
      } else {
        topicBar.hidden = true;
      }

      status.textContent = shown + (shown === 1 ? ' post' : ' posts') + ' shown.';
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        kind = btn.dataset.filter;
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        apply();
      });
    });

    document.getElementById('clear-topic').addEventListener('click', function (e) {
      e.preventDefault();
      history.replaceState(null, '', window.location.pathname);
      apply();
    });

    window.addEventListener('hashchange', apply);
    apply();
  })();
</script>
{%- else %} Nothing here yet. {%- endif -%}

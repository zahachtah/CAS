---
title: "Scientific blog"
layout: archive
author_profile: true

feature_row:
  - image_path: SciBlog.jpg
    alt: "placeholder image 1"
    title: "Scientific blog"
    excerpt: "I finally realized that knowledge not online is just temporally archived (inside me). So, for the better or worse, here is where I put thoughts and ideas to share"
    url: "/_pages/Variation"
    btn_label: "Explore"
    btn_class: "btn--inverse"
  - image_path: mywork.jpg
    alt: "placeholder image 2"
    title: "My work"
    excerpt: "I read this blog about ['Publicize, don't just publish'](https://eagereyes.org/blog/2016/publicize-dont-just-publish). I took this to heart and am going to do just that. In fact, I thought I might retroactively go backwards in time and make a short assessment of old work, particularly less cited ones"
    url: "/_pages/Scale"
    btn_label: "Explore"
    btn_class: "btn--inverse"
  - image_path: gratitude.jpg
    title: "My gratitude"
    excerpt: "Google scholar uses the famous catchfrase: 'Stand on the shoulders of giants'. I am very grateful to many scientists and open source initiatives by whom I have been inspired and helped. These blog posts are really just an ongoing recollection of some of these"
    url: "/_pages/Response"
    btn_label: "Explore"
    btn_class: "btn--inverse"
---

{% include feature_row %}


{% include base_path %}


{% for post in site.posts %} {% if post.featured != true %} {% include archive-single.html type="grid" %} {% endif %} {% endfor %}

---
title: "exploring Complex Adaptive Systems"
layout: splash
date: 2016-08-02
header:
  overlay_image: /images/cas4.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"

excerpt: "This part of my site is devoted to exploring Complex Adaptive Systems, what they are, how they work, and how one can learn to understand them. I will focus on three iconic examples:"


intro:
- image_path: /images/tom-podmore-357694.jpg
  alt: "placeholder image 1"
  title: "Complex Adaptive Systems:"
  excerpt: 'I have found it quite useful to think of complex adaptive systems by applying at least three different lenses to any problem: How is the **variation** of components expressed, what are the scales of **connections** and how do the components **respond** to these interactions. But it is when we put these ingredients together in a stew we get the dynamics of complex adaptive systems. Complex adaptive systems are localized interactions that result in selection processes which manifests in patterns at higher levels that in turn determine the nature of the local interactions. Thus, in this website I will explore both the ingrediences of complex adaptive systems as well as the resulting patterns when all processes work in concert'

feature_rowA:
  - image_path: /images/evolution.jpg
    alt: "placeholder image 1"
    title: "Biology"
    excerpt: "Evolution generates all the species on the planet, and ecology determines their distribution. These are without doubt the most profound and iconic examples of complex adaptive system"
    url: "/_pages/Variation"
    btn_label: "Explore"
    btn_class: "btn--inverse"
    
  - image_path: /images/learning.jpg
    alt: "placeholder image 2"
    title: "Learning"
    excerpt: "The evolution of the brain was in some respects an evolutionary shortcut as deadly mistakes can be avoided by anticipation and communication. Both the human and artificial intelligence show remarkable CAS characteristics"
    url: "/_pages/Scale"
    btn_label: "Explore"
    btn_class: "btn--inverse"
    
    
feature_rowB:    
  - image_path: /images/markets.jpg
    title: "Economy"
    excerpt: "Humans could not have become the most dominant force on the planet next to the sun and tectonics, without using markets and economic tools. For this a third place for iconic complex adaptive systems is awarded"
    url: "/_pages/Response"
    btn_label: "Explore"
    btn_class: "btn--inverse"
    
  - image_path: /images/robert-collins-513140-unsplash.jpg
    title: "Culture"
    excerpt: "Wether x-isms, religions, patriarchy or traditions, culture permeates the social context we make decisions in. Culture is a great example of an entity that forms the parts its made of"
    url: "/_pages/Response"
    btn_label: "Explore"
    btn_class: "btn--inverse"
    
feature_row1:
  - image_path: /images/variation.jpg
    alt: "placeholder image 1"
    title: "Variation"
    excerpt: "The 'adaptive' part of CAS requires options, something to select from, wether it is genes, organisms traits, policies, products etc. Variation, and thus options, is the prerequisite of adaptation."
    url: "/_pages/CAS/Variation"
    btn_label: "Explore"
    btn_class: "btn--inverse"

  - image_path: /images/scale.jpg
    alt: "placeholder image 2"
    title: "Connection"
    excerpt: "Scale encompasses the network of interactions among components in space time and organizational level. Cross-scale interactions are cause of some of the more unexpected dynamics"
    url: "/_pages/Scale"
    btn_label: "Explore"
    btn_class: "btn--inverse"

  - image_path: /images/photo-1500635523027-2f05e513f066.jpeg
    title: "Response"
    excerpt: "Components may respond to the interaction with other components by changing some aspect of their internal system which in turn affect the nature of this components interactions"
    url: "/_pages/Response"
    btn_label: "Explore"
    btn_class: "btn--inverse"
---
{% include feature_row id="intro" type="right" %}

{% include feature_row id="feature_row1"%}

{% include feature_row id="feature_rowA"%}

{% include feature_row id="feature_rowB"%}



{% include base_path %}

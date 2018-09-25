---
title: "Some windows from my perspective"
layout: single
author_profile: true



gallery:
  - url: https://www.youtube.com/watch?v=mMdKnZKOhwk
    image_path: /images/admin.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: /assets/images/unsplash-gallery-image-2.jpg
    image_path: /images/change2.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: /assets/images/unsplash-gallery-image-3.jpg
    image_path: /images/gratitude.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/reconnecting.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/teemu-paananen-283670-unsplash.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/photo-1500635523027-2f05e513f066.jpeg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/chloe-leis-334258-unsplash.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/tom-podmore-357694.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
  - url: /assets/images/unsplash-gallery-image-4.jpg
    image_path: /images/robert-collins-513140-unsplash.jpg
    alt: "placeholder image 4"
    title: "Image 4 title caption"
    
---
My places

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

My senses

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

My needs

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

My loves

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

<style>
* {
    box-sizing: border-box;
}

.row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
}

.column img {
    margin-top: 8px;
    vertical-align: middle;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media (max-width: 800px) {
    .column {
        flex: 50%;
        max-width: 50%;
    }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
    .column {
        flex: 100%;
        max-width: 100%;
    }
}
</style>
<div class="row"> 
  <div class="column">
    <img src="/w3images/wedding.jpg" style="width:100%">
    <img src="/w3images/rocks.jpg" style="width:100%">
    <img src="/w3images/falls2.jpg" style="width:100%">
    <img src="/w3images/paris.jpg" style="width:100%">
    <img src="/w3images/nature.jpg" style="width:100%">
    <img src="/w3images/mist.jpg" style="width:100%">
    <img src="/w3images/paris.jpg" style="width:100%">
  </div>
  <div class="column">
    <img src="/w3images/underwater.jpg" style="width:100%">
    <img src="/w3images/ocean.jpg" style="width:100%">
    <img src="/w3images/wedding.jpg" style="width:100%">
    <img src="/w3images/mountainskies.jpg" style="width:100%">
    <img src="/w3images/rocks.jpg" style="width:100%">
    <img src="/w3images/underwater.jpg" style="width:100%">
  </div>  
  <div class="column">
    <img src="/w3images/wedding.jpg" style="width:100%">
    <img src="/w3images/rocks.jpg" style="width:100%">
    <img src="/w3images/falls2.jpg" style="width:100%">
    <img src="/w3images/paris.jpg" style="width:100%">
    <img src="/w3images/nature.jpg" style="width:100%">
    <img src="/w3images/mist.jpg" style="width:100%">
    <img src="/w3images/paris.jpg" style="width:100%">
  </div>
  <div class="column">
    <img src="/w3images/underwater.jpg" style="width:100%">
    <img src="/w3images/ocean.jpg" style="width:100%">
    <img src="/w3images/wedding.jpg" style="width:100%">
    <img src="/w3images/mountainskies.jpg" style="width:100%">
    <img src="/w3images/rocks.jpg" style="width:100%">
    <img src="/w3images/underwater.jpg" style="width:100%">
  </div>
</div>

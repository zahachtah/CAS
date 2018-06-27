---
title: "A minimal model of ontogenetic growth"
last_modified_at: 2016-03-09T16:20:02-05:00
teaser: "/images/WestEtAl2001Fig2.jpg"
tags:
  - traits
  - theory
  - biology
---

One of the most important traits, if not THE most important trait, is body size. No other trait comes even close at explaining as much variation in biological structure and function. But as with most aspects in biology, there are multi-scale issues to explore. While most organisms have a maximum size as adults, the all start from small and grow over time, some reaching saturating growth rate at some size. What determines this size? What determines the rate to reach this size? These questions fall under the concept of [ontogenetic](https://en.wikipedia.org/wiki/Ontogeny) growth.

## Growth of an indivdual is determined by three main aspects:

* The source of energy and material, i.e. food or resources such as sunlight and water+nutrients
* The material and energy costs of transforming these into different cell types or tissues
* the cost of maintaining these cells and tissues

The size of the organism is given as the number of cells of type $$i$$, times the biomass $$b$$, of these celltypes, 

$$ m=\sum_{i} N_i b_i $$


The general relation of food energy and material balance is for any unit, $$u$$:

$$F^u=B^u+\frac{dE_i^u}{dt}$$

{% capture notice-2 %}
The human growth curve cannot be forced to coincide with growth curves of other organisms by any change of variables (see, for example, Figs. 16.7 and 19.6 in Brody (1945)). This is because Homo sapiens has growth efficiency ε0 from 4 to 7 times lower than other mammals and animals in general, a feature thought to be associated with brain development (Makarieva et al 2004)
{% endcapture %}
<div class="notice--info">{{ notice-2 | markdownify }}</div>

{% capture notice-1 %}
Btot can be expressed as Btot ¼ Brest þ Bact ¼ fBrest, where f is a dimensionless parameter that reflects the activity level of the organism [11]. For wild mammals and birds, the value of f ranges from 2 to 3 with an average of 2.7. For caged animals, f is usually below 2 [11]. This relationship between total and resting metabolic rate is strongly supported by empirical data (Hou et al. 2011)
{% endcapture %}
<div class="notice--info">{{ notice-1 | markdownify }}</div>

<div id="drawing"></div>

References:

Hou, Chen, Kendra M. Bolt, and Aviv Bergman. 2011. “A General Model for Ontogenetic Growth under Food Restriction.” Proceedings. Biological Sciences / The Royal Society 278 (1720): 2881–90.

Makarieva, Anastassia M., Victor G. Gorshkov, and Bai-Lian Li. 2004. “Ontogenetic Growth: Models and Theory.” Ecological Modelling 176 (1): 15–26.

Ricklefs, R. E. 2003. “Is Rate of Ontogenetic Growth Constrained by Resource Supply or Tissue Growth Potential? A Comment on West et Al.’s Model.” Functional Ecology 17 (3): 384–93.

West, G. B., J. H. Brown, and B. J. Enquist. 2001. “A General Model for Ontogenetic Growth.” Nature 413 (6856): 628–31.



 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.6.5/svg.min.js"></script>
 <script type="text/javascript" src="/assets/js/colorbrewer.min.js"></script>
<script>
  // initialize SVG.js
var draw = SVG('drawing')

// draw pink square
draw.rect(100, 100).move(100, 50).fill('#f06')
</script>
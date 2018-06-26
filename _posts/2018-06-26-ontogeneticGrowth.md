---
title: "A minimal model of ontogenetic growth"
last_modified_at: 2016-03-09T16:20:02-05:00
teaser: "images/WestEtAl2001Fig2.jpg"
mathjax: true
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

The size of the organism is given as the number of cells of type $i$ times the biomass, $b$ of these celltypes, 

$ m=\sum_{i} N_i b_i $


The general relation of food energy and material balance is for any unit, $u$:

$F^u=B^u+\frac{dE_i^u}{dt}$

{% capture notice-2 %}
The human growth curve cannot be forced to coincide with growth curves of other organisms by any change of variables (see, for example, Figs. 16.7 and 19.6 in Brody (1945)). This is because Homo sapiens has growth efficiency ε0 from 4 to 7 times lower than other mammals and animals in general, a feature thought to be associated with brain development (Makarieva et al 2004)
{% endcapture %}
<div class="notice--info">{{ notice-2 | markdownify }}</div>

References:

Makarieva, Anastassia M., Victor G. Gorshkov, and Bai-Lian Li. 2004. “Ontogenetic Growth: Models and Theory.” Ecological Modelling 176 (1): 15–26.

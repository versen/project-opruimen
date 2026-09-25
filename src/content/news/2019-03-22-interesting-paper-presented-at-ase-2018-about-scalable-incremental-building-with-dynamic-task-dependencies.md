---
title: "Papers spotlight - Interesting paper presented at ASE 2018 about scalable incremental building with dynamic task dependencies"
date: 2019-03-22
image: "/assets/img/news/interesting-paper-presented-at-ase-2018-about-scalable-incremental-building-with-dynamic-task-dependencies.png"
---

<p>Following up on <a href="https://eelcovisser.org/post/305/pie%3A-a-domain-specific-language-for-interactive-software-development-pipelines">our paper</a> about the design of the PIE build DSL, a paper at the <a href="http://www.ase2018.com/">ASE 2018</a> conference, to be presented by Gabri&euml;l Konat next week, deals with the poor scalability of the Pluto algorithm we used for the implementation of PIE. Since the algorithm inspects the entire dependency graph, even if few nodes are affected by a change, there is a large overhead that becomes significant in large projects. This paper extends the Pluto algorithm with a bottom-up traversal of the dependency graph that only visits nodes affected by a change, dramatically reducing build times in most scenarios.</p>

<p>Gabri&euml;l Konat, Sebastian Erdweg, and Eelco Visser. 2018. Scalable incremental building with dynamic task dependencies (<a href="https://doi.org/10.1145/3238147.3238196">https://doi.org/10.1145/3238147.3238196</a>). In Proceedings of the 33rd ACM/IEEE International Conference on Automated Software Engineering (ASE 2018). ACM, New York, NY, USA, 76-86. DOI: https://doi.org/10.1145/3238147.3238196</p>

<p><strong>Abstract</strong></p>

<p>Incremental build systems are essential for fast, reproducible software builds. Incremental build systems enable short feedback cycles when they capture dependencies precisely and selectively execute build tasks efficiently. A much overlooked feature of build systems is the expressiveness of the scripting language, which directly influences the maintainability of build scripts. In this paper, we present a new incremental build algorithm that allows build engineers to use a full-fledged programming language with explicit task invocation, value and file inspection facilities, and conditional and iterative language constructs. In contrast to prior work on incrementality for such programmable builds, our algorithm scales with the number of tasks affected by a change and is independent of the size of the software project being built. Specifically, our algorithm accepts a set of changed files, transitively detects and re-executes affected build tasks, but also accounts for new task dependencies discovered during building. We have evaluated the performance of our algorithm in a real-world case study and confirm its scalability.</p>

<p>Also at: <a href="https://eelcovisser.org/post/306/scalable-incremental-building-with-dynamic-task-dependencies">https://eelcovisser.org/post/306/scalable-incremental-building-with-dynamic-task-dependencies</a>&nbsp;</p>

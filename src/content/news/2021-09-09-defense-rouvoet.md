---
title: "PhD defence of Arjen Rouvoet @TUDelft"
date: 2021-09-09
---

Arjen Rouvoet will defend his PhD thesis titled "Correct by Construction Language Implementations" on October 14th at 15:00, location Aula Congress Center, Delft University of Technology.

The PhD thesis is about the design of meta-languages for the specification and implementation of typed programming languages, such that the implementation is formally proven type-correct. For language front-ends---i.e., type checkers---the thesis contributions a method for automatically obtaining sound type checkers from declarative type-system specifications. Language back-ends---i.e., interpreters and compilers---are developed in the dependently typed meta-language Agda in an intrinsically typed style so that the implementation also encompasses a type-safety proof. The contributions of the thesis there is to make it to scale these ideas from simply typed functional languages, to languages with references a la ML or concurrency and session-typed cross-thread communication, and a low-level language with labels and jumps. This is made possible by developing, among other things, an abstract, shallowly embedded separation logic in Agda, as a basis for functional abstractions (e.g., monads) that encapsulate both computational work and proof work.

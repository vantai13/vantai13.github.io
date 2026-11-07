---
layout: ../../layouts/NoteLayout.astro
title: Two kinds of uncertainty in a routing decision
description: A working research question about state information, action-response models, and the quality of a network routing decision.
category: Research question
date: '2026-11-06'
---

A routing decision uses observations of the network and a model of the response to an action. In State-Model-Regret, I treat these as separate factors: **current-state information** and **action-response model fidelity**.

## Current-state information

Telemetry collected at an earlier time can describe a state that has changed by the time the controller acts. The current study starts from an earlier backlog observation and uses a specified posterior over the current state.

The current-state benchmark receives additional oracle information, including hidden modes. This defines an information comparison within the model. Implementing a feasible telemetry refresh requires a separate evaluation.

## Action-response modeling

A response model estimates what happens after a route is kept or changed. Switching traffic changes the load on both paths, so the cost comparison depends on that response.

The current model comparison holds parameters and posterior information fixed. It compares costs obtained from mean rollouts with true expected future costs. Parameter estimation errors and structural model errors are outside this comparison.

## The question I’m exploring

The State-Model-Regret project asks how improvements in these two factors differ and interact in their effect on expected decision regret for load-changing routing actions.

The decision setting, reference policy, and probability law are specified together so the comparisons use the same objective. The [research journey note](/writing/from-digital-twins-to-routing-decisions/) explains how this connects to DT4N and defines expected decision regret.

## Where the work stands

This is ongoing exploratory research. The repository records inconclusive results, diagnostic analyses, and explanations that need reformulation. The implementation and numerical checks support further investigation; they do not confirm the hypotheses being studied.

## Research notebook

- [State-Model-Regret repository and current status](https://github.com/vantai13/state-model-regret)
- [Design, theory, and experiment notes](https://github.com/vantai13/state-model-regret/tree/main/notes)

This note introduces the research question. It does not claim a new result, publication, or novelty finding.

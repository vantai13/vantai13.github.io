---
layout: ../../layouts/NoteLayout.astro
title: Two kinds of uncertainty in a routing decision
description: A working research question about state information, action-response models, and the quality of a network routing decision.
category: Research question
date: '2026-11-06'
---

A routing controller has to decide with what it knows. Two parts of that knowledge are easy to combine in conversation, but useful to separate in an experiment.

One is the controller’s information about the **current network state**. The other is its **model of what an action will do**.

## What do we observe?

Telemetry may arrive late. Measurements may be noisy or incomplete. Even a correct observation can describe a state that has already changed by the time the controller acts.

Improving this side of the system means changing the information available about the state. That could involve freshness, measurement quality, or the way the state is represented.

## What do we expect to happen?

A response model predicts the consequences of a routing action. A controller may know the present state reasonably well while still mispredicting the load or queueing response to a route change.

Conversely, it may have a useful action-response model but feed that model stale information. These are different sources of uncertainty, and they need not have the same effect on a decision.

## The question I’m exploring

The State–Model–Regret project asks how improvements in these two factors differ and interact in their effect on expected decision regret for load-changing routing actions.

The intention is to connect information quality to decision quality, rather than using prediction accuracy alone as the final outcome. That requires a clear decision setting, a suitable reference, and an evaluation that keeps the modeling assumptions visible.

## Where the work stands

This is ongoing exploratory research. The repository records inconclusive results, diagnostic analysis, and directions that need reformulation. It is too early to present the project as a confirmed scientific contribution.

Separating the question from the claim is part of the work. A simulation can be implemented correctly while the explanation it was meant to test remains unsupported.

## Research notebook

- [State–Model–Regret repository and current status](https://github.com/vantai13/state-model-regret)
- [Design, theory, and experiment notes](https://github.com/vantai13/state-model-regret/tree/main/notes)

This note introduces the research question. It does not claim a new result, publication, or novelty finding.

---
layout: ../../layouts/NoteLayout.astro
title: From Network Digital Twins to Better Routing Decisions
description: How building an SDN digital twin connects to my ongoing questions about state information, response models, and expected routing decision regret.
category: Research note
date: '2026-11-06'
---

I built DT4N to synchronize and control an SDN testbed. In State–Model–Regret, I study how the information and response models used by a controller affect its routing decisions.

## Starting with a working system

In my undergraduate DT4N project, I connected a Mininet / Ryu SDN testbed to Eclipse Ditto. The system synchronizes network state, supports bounded what-if analysis, and carries control commands back to the testbed.

An important part of that implementation is checking what happened after a command. A message reaching the controller is one event; the resulting state returning to the twin provides evidence of the action’s effect. I describe that loop in [the DT4N systems note](/writing/digital-twins-as-control-loops/).

Evaluating the decisions made through this system introduces another question. What does the controller need to know to choose an appropriate action?

## A routing change also changes the load

Consider two paths, A and B. A controller can keep a managed flow on A or move it to B. Switching reduces the managed load on A and adds it to B, so the relevant comparison includes the network’s response to the action.

The controller relies on two kinds of information. Its observations describe a network state, potentially from an earlier time. Its response model estimates the consequences of keeping or switching the route. [The existing uncertainty note](/writing/state-information-and-model-fidelity/) explains this distinction in more detail.

A useful evaluation needs to connect both factors to the action selected and its cost. Prediction accuracy is one part of that evaluation; the question I’m pursuing concerns decision quality.

## The research question

My ongoing State–Model–Regret project asks:

> For load-changing routing actions, how do improvements in current-state information and action-response model fidelity differ and interact in their effect on expected decision regret?

The study compares decision pipelines in a controlled queueing setting. They share a plant, action set, objective, and probability law, while the available state information and representation of the action response vary.

In the current model comparison, parameters and posterior information are held fixed. The comparison concerns mean-rollout costs and true expected future costs. The current-state benchmark includes oracle information about hidden modes. These choices define the scope of the experiment; feasible telemetry and broader model errors remain separate questions.

## What expected decision regret means here

Expected decision regret compares a pipeline’s expected cost with that of the reference policy under the same decision setting. The reference has current-state and response-law information, but no access to realized future traffic. The current objective accumulates queue occupancy over a fixed decision horizon.

This definition matters when interpreting an individual run. A larger realized cost in one episode does not establish a larger expected regret. The comparison must use the specified expectation and reference, with the same objective and probability law.

## Where this leads

The work remains exploratory. The repository preserves inconclusive results, diagnostic analyses, and explanations that need reformulation. Those records help define what to investigate next and how much the existing evidence supports.

The connection to DT4N is a direction for further research: build systems whose observations and predictions can be inspected, then evaluate how those inputs affect a decision. My longer-term aim is to connect that reasoning to network systems through simulation, testbeds, and reproducible experiments.

## Project sources

- [DT4N: system design and implementation](https://github.com/vantai13/dt4n-core)
- [State–Model–Regret: current research status](https://github.com/vantai13/state-model-regret)
- [Decision setting and definitions](https://github.com/vantai13/state-model-regret/blob/main/notes/01_definitions_v1_3.md)

This note explains the connection between the projects. It reports no new experiment or confirmed scientific contribution.

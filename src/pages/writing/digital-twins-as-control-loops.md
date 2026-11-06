---
layout: ../../layouts/NoteLayout.astro
title: A network twin is a loop, not just a mirror
description: A project note on the two directions of a network digital twin, and why acknowledging a command is different from observing its effect.
category: Systems note
date: '2026-11-06'
---

A network digital twin is easiest to picture as a model that follows the network. Link state changes in the testbed; a synchronization agent updates the twin; a dashboard shows the new state.

That is a useful first direction. In DT4N, there is a second direction too: a command can travel through the twin back to the testbed. The two paths together make it possible to build a control loop.

## The two paths

The observation path runs from the Mininet testbed through the synchronization agent to Eclipse Ditto. Hosts and links are represented as Things, with a structure that the dashboard and other applications can read.

The command path runs from the dashboard or controller into a command inbox, then through a command agent to the testbed. The source documentation describes six system flows, including detection, closed-loop control, cloud integration, and what-if analysis.

The important distinction is between **a command being accepted** and **its intended effect being observed**. The former tells us that a message reached part of the system. The latter requires the resulting network state to return through the observation path.

## What-if comes before action

The what-if model can ask how a change might affect the network without applying that change. This is useful only within the model’s assumptions and operating region.

In the archived retrospective evaluation, the median absolute throughput error inside that region was approximately 0.009 Mbps. The maximum was about 0.097 Mbps. A median is a summary of the evaluated cases; it is not an upper bound on future errors.

## A result needs its context

The DT4N testbed is small and runs on one machine. A successful synchronization or control experiment on that testbed is evidence about that setup, not a guarantee for production networks.

Keeping the topology, traffic conditions, raw measurements, and evaluation scripts together makes the result easier to inspect. The same applies to the detector’s unsuccessful bandwidth-reduction and detection-delay targets: those outcomes help define what the system can currently support.

For me, this is the useful role of the twin: a place to connect observations, assumptions, predictions, and actions while keeping the gaps between them visible.

## Project sources

- [DT4N system architecture and usage](https://github.com/vantai13/dt4n-core)
- [Archived results and reproduction scripts](https://github.com/vantai13/dt4n-core/tree/main/ket-qua-bao-cao)

The measurements discussed here come from existing project artifacts. This note does not report a new experiment.

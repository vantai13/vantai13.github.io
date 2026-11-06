---
layout: ../../layouts/NoteLayout.astro
title: How the DT4N control loop works
description: A project note on the two directions of a network digital twin, and why acknowledging a command is different from observing its effect.
category: Systems note
date: '2026-11-06'
---

DT4N connects a Mininet / Ryu testbed to Eclipse Ditto. Network state travels from the testbed to the twin, while control commands travel back to the testbed.

## State and commands

The observation path runs from the Mininet testbed through the synchronization agent to Eclipse Ditto. Hosts and links are represented as Things, with a structure that the dashboard and other applications can read.

The command path runs from the dashboard or controller into a command inbox, then through a command agent to the testbed. The source documentation describes six system flows, including detection, closed-loop control, cloud integration, and what-if analysis.

A command acknowledgement shows that a message was accepted. To check its effect, the system waits for the resulting network state to return through the observation path. This keeps command delivery and state confirmation separate in the evaluation.

## What-if analysis

The what-if model estimates the effect of a change before it is applied. Its assumptions define the operating region used in the evaluation.

In the archived retrospective evaluation, the median absolute throughput error inside that region was approximately 0.009 Mbps. The maximum was about 0.097 Mbps. These figures describe the evaluated cases, rather than a bound on future error.

## Experimental scope

The DT4N testbed is small and runs on one machine. The synchronization and control measurements describe that setup. Production-scale behavior remains outside the evaluated scope.

The repository keeps the topology, traffic conditions, raw measurements, and evaluation scripts with the results. It also records the detector’s unsuccessful bandwidth-reduction and detection-delay targets. Both the successful and unsuccessful measurements matter when deciding how the system can be used.

## Project sources

- [DT4N system architecture and usage](https://github.com/vantai13/dt4n-core)
- [Archived results and reproduction scripts](https://github.com/vantai13/dt4n-core/tree/main/ket-qua-bao-cao)

The measurements discussed here come from existing project artifacts. This note does not report a new experiment.

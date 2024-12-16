# ECG Waveform Synthetic Data Generator
A tool for generating synthetic ECG waveforms, with features such as noise injection and random amplitude variations, designed to simulate ventricular fibrillation and other conditions for analysis and experimentation.

## Overview
This project generates synthetic ECG waveforms with:
* Realistic waveform shapes based on sample data. There will be 2 waveforms displayed: Original waveform and the new augmented waveform.
* Noise injection for testing anomaly detection algorithms.
* Customizable parameters such as amplitude, noise, and randomness.
* Initial focus: Ventricular Fibrillation (VF).

## Feature
* Customizable Amplitude and Noise: Generate ECG data with variable scaling and noise intensity for testing purposes.
* Dynamic Noise Injection: Simulate irregularities with 1–2 noise bursts per waveform loop.
* Grid and Indicators: A grid net for distinguising the different between the original waveform and the new augmented waveform.
* Real-Time Animation: Smooth scrolling waveforms visualized in a canvas element.

## Demo
Demo live version is here: https://ntvinh2005.github.io/Projects/ECG-waveform-synthetic-data-generator/VFib_sim.html

## Update in future (soon)
* Add slide to adjust customizable variables like amplitude scales, time scales, number of noises per loop, etc.
* Experiment with other types of waveform like AFib.

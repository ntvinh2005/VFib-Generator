# ECG Waveform Synthetic Data Generator
A tool for generating synthetic ECG waveforms, with features such as noise injection and random amplitude variations, designed to simulate ventricular fibrillation and other conditions for analysis and experimentation.

## Overview
This project generates synthetic ECG waveforms experimenting with two separate approaches:
* Realistic waveform shapes based on sample data. There will be 2 waveforms displayed: Original waveform and the new augmented waveform. Each datapoint in the sample data array represent 0.01 seconds.
* Generate original waveform by generating a random sinus waveform with random half period and random amplitude. Then adding random offset to simulate Ventricular Fibrillation waveform.
* Noise injection for testing anomaly detection algorithms.
* Customizable parameters such as amplitude, noise, and randomness.
* Initial focus: Ventricular Fibrillation (VF).

## Feature
* Customizable Amplitude and Noise: Generate ECG data with variable scaling and noise intensity for testing purposes. There will be 1 to 3 noises per loop.
* Random offset: Add random offset for each data point and common random offset for a whole section. There will be five sections in a waveform loop. Can add randomness to the width of each sections as well as the number of it later
* Random shuffle section: Shuffle randomly for different sections in the original VFib data but still keeps the overall sinus rhythm shape.
* Dynamic Noise Injection: Simulate irregularities with 1–2 noise bursts per waveform loop. A noise will last 20 second. Can add randomness to how long a noise last later. (Currently turn off since produced data is unrealistic and not general enough for machine learning)
* Grid and Indicators: A grid net for distinguising the different between the original waveform and the new augmented waveform. (Can be turned off for producing image data for machine learning)
* Scale slide: Change amplitude and time scale for better visualization.
* Real-Time Animation: Smooth scrolling waveforms visualized in a canvas element.
* Streamline the synthetic data to csv file on local in real time using simple express server.

## Demo
Demo live version is here: 
* First Approach (Augment a real life sample of VFib to create more augmented version): https://ntvinh2005.github.io/Projects/ECG-waveform-synthetic-data-generator/VFib_augmented.html. Latest update in 12/23/2024. 
* Second Approach (Generating random sinus then try to augment to simulate Ventricular Fibrillation): https://ntvinh2005.github.io/Projects/ECG-waveform-synthetic-data-generator/VFib_gen.html. Latest update in 12/26/2024.

## Update in future (soon)
* Experiment with other types of waveform like AFib.
* Try generating VFib data from scratch without the need of original data. (In progress)
* Start automatically capture the screenshot of waveform and try to train the model based on the synthetic data
* Try finding more original real data for generate augmented synthetic data.

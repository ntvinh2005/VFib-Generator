import numpy as np
import matplotlib.pyplot as plt

def generate_vfib_with_smooth_sinusoidal(steps=1000, noise_range=(-0.5, 0.5), burst_prob=0.01, burst_scale=3, smooth_factor=0.2, freq=0.01):
    baseline = 0
    alpha = 0.1
    x = [baseline]
    
    for t in range(steps - 1):
        # Random noise
        noise = np.random.uniform(*noise_range)
        
        # Introduce bursts
        if np.random.rand() < burst_prob:
            noise *= burst_scale
        
        # Mean reversion
        mean_reversion = alpha * (baseline - x[-1])
        
        # Add low-frequency sinusoidal component for smooth oscillation
        sine_wave = np.sin(2 * np.pi * freq * t) * 0.5  # Adjust 0.5 for amplitude
        next_value = x[-1] + mean_reversion + noise + sine_wave
        
        # Smooth the transition using interpolation
        smooth_value = (1 - smooth_factor) * x[-1] + smooth_factor * next_value
        x.append(smooth_value)
    
    return np.array(x)

# Generate waveform
steps = 1000
vfib_waveform = generate_vfib_with_smooth_sinusoidal(steps, noise_range=(-0.5, 0.5), burst_prob=0.01, burst_scale=3, smooth_factor=0.2)

# Plot waveform
plt.figure(figsize=(10, 4))
plt.plot(vfib_waveform, label="Smooth Synthetic VFib with Sinusoidal Component")
plt.title("Smooth Synthetic VFib Waveform with Low-Frequency Oscillations")
plt.xlabel("Time Steps")
plt.ylabel("Amplitude")
plt.legend()
plt.grid()
plt.show()

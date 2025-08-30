# Show Switcher Module

This module provides automatic switching between camera angles and overlay graphics with random timing control, replicating all features of the standalone Show Switcher web application.

## Features

- **Dual Independent Switchers**: Control camera and overlay switching independently
- **Random Timing**: Each switcher randomly selects timing within configured ranges
- **System Control**: Start/stop both switchers simultaneously or individually
- **Manual Triggers**: Instantly trigger any switcher while maintaining automatic operation
- **Dynamic Button Lists**: Add or remove buttons from rotation during operation
- **Comprehensive Feedbacks**: Visual indicators for all states and conditions
- **Variable Support**: Display countdowns, counts, and status information

## Configuration

### Camera Switcher Settings

- **Minimum Seconds**: Shortest time between camera switches (default: 15)
- **Maximum Seconds**: Longest time between camera switches (default: 30)
- **Camera Buttons**: Comma-separated list of button locations (e.g., "2/1/0, 2/1/1, 2/1/2")

### Overlay Switcher Settings

- **Minimum Seconds**: Shortest time between overlay triggers (default: 600)
- **Maximum Seconds**: Longest time between overlay triggers (default: 900)
- **Overlay Buttons**: Comma-separated list of button locations (e.g., "2/2/1, 3/0/3")

## Actions

### System Control

- **System ON**: Start both camera and overlay switchers
- **System OFF**: Stop both switchers
- **System Reset**: Stop everything and reset all counters
- **System Toggle**: Toggle system on/off state

### Camera Control

- **Camera ON**: Start camera switcher
- **Camera OFF**: Stop camera switcher
- **Camera Manual**: Trigger camera immediately (starts if stopped)
- **Camera Toggle**: Toggle camera on/off state
- **Set Camera Timer**: Set countdown to specific value
- **Set Camera Timer Range**: Adjust min/max timing range
- **Add/Remove Camera Button**: Dynamically modify button list

### Overlay Control

- **Overlay ON**: Start overlay switcher
- **Overlay OFF**: Stop overlay switcher
- **Overlay Manual**: Trigger overlay immediately (starts if stopped)
- **Overlay Toggle**: Toggle overlay on/off state
- **Set Overlay Timer**: Set countdown to specific value
- **Set Overlay Timer Range**: Adjust min/max timing range
- **Add/Remove Overlay Button**: Dynamically modify button list

### Counter Management

- **Reset Camera Counter**: Reset camera trigger count to zero
- **Reset Overlay Counter**: Reset overlay trigger count to zero

## Feedbacks

### System Feedbacks

- **System Running/Stopped**: Visual indication of system state
- **System Duration Above**: Highlight when system has been running longer than threshold

### Camera Feedbacks

- **Camera Running/Stopped**: Visual indication of camera switcher state
- **Camera Countdown Below**: Warning when countdown approaches zero
- **Camera Next Button Match**: Highlight specific button when it's next
- **Camera Count Above**: Alert when trigger count exceeds threshold

### Overlay Feedbacks

- **Overlay Running/Stopped**: Visual indication of overlay switcher state
- **Overlay Countdown Below**: Warning when countdown approaches zero
- **Overlay Next Button Match**: Highlight specific button when it's next
- **Overlay Count Above**: Alert when trigger count exceeds threshold

## Variables

### System Variables

- `$(showswitcher:system_status)` - Current system state (Started/Stopped)
- `$(showswitcher:system_duration)` - Active duration in HH:MM:SS format

### Camera Variables

- `$(showswitcher:camera_status)` - Camera switcher state (Running/Stopped)
- `$(showswitcher:camera_countdown)` - Seconds until next camera switch
- `$(showswitcher:camera_next_button)` - Next button to be triggered
- `$(showswitcher:camera_previous_button)` - Last triggered button
- `$(showswitcher:camera_trigger_count)` - Total number of camera triggers

### Overlay Variables

- `$(showswitcher:overlay_status)` - Overlay switcher state (Running/Stopped)
- `$(showswitcher:overlay_countdown)` - Seconds until next overlay
- `$(showswitcher:overlay_next_button)` - Next button to be triggered
- `$(showswitcher:overlay_previous_button)` - Last triggered button
- `$(showswitcher:overlay_trigger_count)` - Total number of overlay triggers

## Presets

The module includes ready-to-use presets organized in categories:

### System Control

- System ON/OFF buttons with status feedback
- System Reset button
- System Toggle with dynamic text

### Camera Control

- Camera ON/OFF buttons with status feedback
- Camera Manual trigger
- Camera Toggle with dynamic text

### Overlay Control

- Overlay ON/OFF buttons with status feedback
- Overlay Manual trigger
- Overlay Toggle with dynamic text

### Status Display

- Camera/Overlay countdown displays with warning colors
- System duration display
- Next button indicators
- Trigger count displays with threshold alerts

## Usage Tips

1. **Button Format**: Use "page/bank/button" format (e.g., "2/1/0" for page 2, bank 1, button 0)
2. **Manual Behavior**: Manual trigger starts the switcher if stopped and immediately triggers
3. **Random Selection**: Buttons are selected randomly from the configured list
4. **Timer Ranges**: Set appropriate min/max values for your production needs
5. **Multiple Instances**: Same button can appear multiple times for weighted selection

## MIDI Control Equivalent

While this module doesn't directly support MIDI, you can map Companion buttons to MIDI notes to achieve similar functionality:

- Notes 36-44: Map to system and individual control actions
- Notes 45-47: Map to toggle actions
- Use MIDI CC to triggers with timer set actions for dynamic countdown control

## Troubleshooting

- **No buttons triggering**: Verify button locations are correct and exist in your Companion setup
- **Switcher not starting**: Check that at least one button is configured in the button list
- **Countdown stuck**: Ensure min/max seconds are valid (min < max)
- **Variables not updating**: Check that the module instance name is correct in variable references

## Support

For issues or feature requests, please visit the GitHub repository.

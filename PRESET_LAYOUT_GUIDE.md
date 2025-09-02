# ShowSwitcher Stream Deck Layout Guide

## Optimal 8x4 Stream Deck Layout

This guide shows the recommended button layout for a standard 8x4 (32-button) Stream Deck. The presets are organized into logical rows for easy operation during a live show.

### Row 1: Main System Control (8 buttons)
1. 🔴 **Main System Start/Stop** - Master control for entire system
2. ⏸️ **System Pause/Resume** - Pause without stopping
3. ↻ **System Reset** - Double-tap to reset (safety feature)
4. 📊 **System Status** - Live status display
5. ⏱️ **Session Duration** - Current session timer
6. ∑ **Total Runtime** - All sessions combined
7. #️⃣ **Session Count** - Number of start/stop cycles
8. 💾 **Statistics Reset** - Double-tap to clear stats

### Row 2: Camera Control & Status (8 buttons)
1. 📹 **Camera Auto-Switch** - Start/stop automatic switching
2. 🎬 **Manual Camera Trigger** - Force immediate switch
3. 🔀 **Camera Mode** - Toggle Sequential/Random
4. ⏱️ **Camera Countdown** - Time to next switch
5. 📹 **Next Camera Preview** - Shows which button is next
6. 🔢 **Camera Trigger Count** - Total switches (double-tap resets)
7. 📈 **Camera Avg Interval** - Average time between switches
8. *(Empty or custom)*

### Row 3: Overlay Control & Status (8 buttons)
1. 🎨 **Overlay Auto-Switch** - Start/stop overlay switching
2. ✨ **Manual Overlay Trigger** - Force immediate switch
3. 🔀 **Overlay Mode** - Toggle Sequential/Random
4. ⏱️ **Overlay Countdown** - Time to next overlay
5. 🎨 **Next Overlay Preview** - Shows which overlay is next
6. 🔢 **Overlay Trigger Count** - Total switches (double-tap resets)
7. 📈 **Overlay Avg Interval** - Average time between overlays
8. *(Empty or custom)*

### Row 4: MIDI & Performance (8 buttons)
1. 🎹 **MIDI Connect** - Connect/disconnect MIDI device
2. 🎹 **MIDI Port** - Shows port & refreshes on press
3. ♪ **Last Note** - Display last MIDI note received
4. 🎛 **Last CC** - Display last MIDI CC received
5. 📖 **MIDI Docs** - Show setup guide (FIXED!)
6. 📊 **HTTP Success Rate** - Monitor API health
7. ❌ **HTTP Errors** - Error counter with warnings
8. 📋 **Queue Size** - Button queue (double-tap clears)

## Button Features

### Smart Toggle Buttons
Many buttons use multi-step functionality:
- **Single Tap**: Primary action (start/stop, pause/resume)
- **Double Tap**: Secondary action (reset, clear)
- **Visual Feedback**: Colors change based on state

### Color Coding
- **Green**: Active/Running
- **Red**: Stopped/Error
- **Yellow/Orange**: Warning/Paused
- **Blue**: Camera-related
- **Purple**: Overlay-related
- **Gray**: Inactive/Disconnected

### Dynamic Text
Buttons display real-time information using variables:
- Countdowns update every second
- Status changes immediately
- Statistics accumulate over time

## Tips for Use

1. **During Setup**:
   - Row 4 for MIDI configuration
   - Test with manual triggers before going live

2. **During Show**:
   - Row 1 for overall control
   - Rows 2-3 for content switching
   - Monitor performance indicators

3. **Safety Features**:
   - Reset buttons require double-tap
   - Visual confirmation on all state changes
   - Queue monitoring prevents overload

## Customization

You can rearrange these presets as needed:
1. Go to Buttons tab in Companion
2. Find the "ShowSwitcher" presets
3. Drag desired presets to your Stream Deck layout
4. Save your configuration

## MIDI Integration

The MIDI Docs button now properly displays configuration guide through variables. Press it to see:
- MIDI setup instructions
- Recommended note mappings
- CC control assignments
- Current connection status

---

*Note: This layout is optimized for the standard 32-button Stream Deck but can be adapted for other models.*
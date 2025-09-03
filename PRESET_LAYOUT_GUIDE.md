# ShowSwitcher Stream Deck Layout Guide - Version 2.0.3

## 🎯 Optimized Button Layout (Reduced from 29 to 19 buttons)

This guide shows the improved button layout optimized for a standard 8x4 (32-button) Stream Deck. The presets have been reorganized with logical grouping, consistent color coding, and combined displays for maximum efficiency.

## 🎨 Color Coding System

Our new color scheme provides instant visual feedback:
- **🟢 GREEN**: Active/Running/Go states
- **🔴 RED**: Stopped/Inactive/Critical alerts
- **🟡 YELLOW/AMBER**: Warning/Paused/Attention needed
- **🔵 BLUE**: Camera-related operations
- **🟣 PURPLE**: Overlay-related operations
- **⚫ DARK GRAY**: Inactive/Disabled states
- **⚪ LIGHT GRAY**: Information displays

## 📋 Recommended 8x4 Layout

### Row 1: Master Control (3 buttons + space for custom)
1. **🔴 Main System Start/Stop** - Master control with STATS ready indicator
2. **⏸ Pause/Resume** - Smart toggle between pause and resume
3. **↻ System Reset** - Double-tap safety feature
4. *(Custom button or space)*
5. *(Custom button or space)*
6. *(Custom button or space)*
7. *(Custom button or space)*
8. *(Custom button or space)*

### Row 2: Camera Operations (3 buttons) + Live Monitoring (5 buttons)
1. **📹 Camera Auto/Manual** - Start/stop automatic switching
2. **🎬 Manual Trigger** - Force immediate camera switch
3. **🔀 Camera Mode** - Toggle Sequential/Random
4. **⏱ Combined Countdown** - CAM & OVL timers with smart warnings
5. **🔢 Combined Counters** - CAM & OVL counts (double-tap resets both)
6. **📈 Combined Averages** - CAM & OVL average intervals
7. **👁 Next Preview** - Shows next CAM & OVL buttons
8. **📊 Session Info** - Session #, duration, and total runtime

### Row 3: Overlay Operations (3 buttons) + MIDI Control (2 buttons) + space
1. **🎨 Overlay Auto/Manual** - Start/stop overlay switching
2. **✨ Manual Trigger** - Force immediate overlay switch
3. **🔀 Overlay Mode** - Toggle Sequential/Random
4. **🎹 MIDI Status** - Connect/disconnect with visual feedback
5. **🎵 MIDI Monitor** - Shows last Note & CC received
6. *(Custom button or space)*
7. *(Custom button or space)*
8. *(Custom button or space)*

### Row 4: Performance Monitoring (3 buttons) + space for custom
1. **📊 HTTP Performance** - Success rate with error warnings
2. **📋 Queue Management** - Queue size (double-tap clears)
3. **📊 Statistics Reset** - Double-tap to reset all stats
4. *(Custom button or space)*
5. *(Custom button or space)*
6. *(Custom button or space)*
7. *(Custom button or space)*
8. *(Custom button or space)*

## 💡 Key Improvements from Previous Version

### Button Consolidation (29 → 19 buttons)
- **Combined Displays**: Merged related information into single buttons
  - Camera & Overlay countdowns in one display
  - Camera & Overlay counters combined
  - Camera & Overlay averages together
  - Next Camera & Overlay preview combined
  - Session duration, count, and total runtime merged
  - MIDI Note & CC display combined

### Text Readability Fixes
- **Larger font sizes**: 18pt for primary actions, 14pt for two-line text, 11pt for detailed info
- **Shortened text**: "CONNECTED" → "✓", eliminating word wrapping issues
- **Clear hierarchical sizing**: Important actions use larger text

### Smart Visual Feedback
- **STATS Ready**: Indicated through color change on main button (green when ready)
- **Connection Status**: Uses symbols (✓, ✗, ⟳) instead of verbose text
- **Progressive warnings**: Colors change based on thresholds (yellow → red)
- **State-based colors**: Button backgrounds change to indicate system state

### Logical Organization
1. **Priority-based ordering**: Most important controls first
2. **Function grouping**: Related operations together
3. **Color-coded sections**: Visual separation by function
4. **Consistent interaction patterns**: Double-tap for destructive actions

## 🔧 Button Features

### Multi-Step Functionality
- **Single Tap**: Primary action or display
- **Double Tap**: Reset/clear functions (with safety)
- **Visual Feedback**: Real-time color changes based on state

### Dynamic Information
- Countdowns update every second
- Status changes reflect immediately
- Statistics accumulate over sessions
- Average calculations update in real-time

## 📝 Usage Tips

### During Setup
1. Start with Row 4 for MIDI configuration
2. Test manual triggers before going live
3. Verify color feedback is working

### During Show
1. Use Row 1 for overall system control
2. Monitor combined displays in Row 2
3. Watch performance indicators for issues
4. Use manual triggers for immediate changes

### Safety Features
- Double-tap required for all resets
- Visual confirmation on state changes
- Queue monitoring prevents overload
- Color warnings for critical states

## 🚀 Migration from Old Layout

If you're upgrading from the previous 29-button layout:

### What's Changed
- **System Status Display** → Merged into Main System button
- **Separate Camera/Overlay Countdowns** → Combined Countdown
- **Individual Counters** → Combined Counter
- **Separate Averages** → Combined Averages
- **Next Camera/Overlay** → Combined Next Preview
- **Duration/Sessions/Runtime** → Session Info display
- **MIDI Port/Note/CC** → MIDI Status & Monitor
- **HTTP Success/Errors** → HTTP Performance
- **Stats Ready** → Indicated by color on Main System button

### What's New
- Consistent color coding across all buttons
- Improved text sizing and readability
- Smart toggle buttons with state awareness
- Combined displays save space
- Logical category organization

## 🎯 Customization

You can further customize this layout:
1. Navigate to the Buttons tab in Companion
2. Find "ShowSwitcher" presets (now in 5 organized categories)
3. Drag desired presets to your Stream Deck
4. Leave space for your custom buttons
5. Save your configuration

## 📊 Category Organization

Presets are now organized in priority order:
1. **1️⃣ Master Control** - Essential system controls
2. **2️⃣ Camera Operations** - Camera-specific functions
3. **3️⃣ Overlay Operations** - Overlay-specific functions
4. **4️⃣ Live Monitoring** - Combined status displays
5. **5️⃣ MIDI & Performance** - System monitoring and MIDI

---

*Note: This optimized layout reduces button count from 29 to 19 while maintaining all functionality through intelligent combining and visual feedback.*
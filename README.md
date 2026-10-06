# Calmly

Calmly is an accessible, distraction-free learning space designed for neurodivergent students, particularly those dealing with ADHD, dyslexia, or executive dysfunction.

Most online learning platforms (Moodle, Canvas, Google Classroom) are designed like administrative filing cabinets. They present students with dozens of deadlines, unread notifications, competing progress bars, and dense layouts all at once. For neurodivergent learners, this cognitive overload frequently causes decision paralysis and burnout before any actual learning starts.

Calmly takes the opposite approach: **one thing at a time**.

---

## What the project does

### 1. One thing at a time (Today view)
Instead of displaying a long list of stressful assignments, Calmly spotlights only the immediate next micro-step. Tasks planned for later in the week are neatly tucked away to keep the workspace calm and focused.

### 2. Magic De-Chunker
When students are assigned large, vague tasks (like a 10-page paper or a math problem set), starting can feel impossible. The de-chunker helps students break complex work down into realistic, 3 to 12-minute steps.

### 3. Bionic Reading and audio support
Long, dense texts can cause significant visual fatigue for dyslexic and ADHD readers. The lesson reader includes:
- **Bionic Reading mode**: bolds the initial letters of words to create visual anchors and guide eye movement.
- **Reading ruler**: a subtle translucent bar that follows the mouse or touch point to prevent accidental line-skipping.
- **Built-in text-to-speech**: allows students to listen along to lessons at adjustable speeds.

### 4. Focus room & sound machine
A clean, fullscreen workspace that pairs a Pomodoro timer with guided breathing exercises during rest periods. It includes a built-in sound generator that produces brown, pink, and white noise directly in the browser via the Web Audio API to help mask distracting ambient noise.

### 5. Botanical growth instead of punitive streaks
Many productivity apps use streak counters that reset to zero when a day is missed, which often triggers shame and abandonment. Calmly replaces this with a digital plant that grows through 5 stages as tasks are completed. It never withers or penalizes students for taking time off.

### 6. Accessibility and comfort settings
Accessible design is built into the core interface:
- Includes **OpenDyslexic** (weighted bottoms to reduce letter inversion) and **Atkinson Hyperlegible** (developed by the Braille Institute).
- Four themes engineered for legibility and reduced glare (Warm Cream, Soft Light, Calm Dark, and High Contrast).
- Full keyboard navigation with visible focus indicators.
- Respects system preferences for reduced motion (`prefers-reduced-motion`).
- Minimum touch target sizes of 44px (complying with WCAG 2.5.8).
- Includes an in-app accessibility inspector so reviewers and judges can test real-time contrast ratios and view the interface through various color-blindness simulation filters.

### 7. Zero-friction privacy
There is no registration form, password requirement, or user tracking. All preferences, energy logs, custom tasks, and progress persist safely in the browser's local storage.

---

## Technical stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Native CSS custom properties and dynamic data-attributes (no heavy external UI component libraries)
- **Audio synthesis**: Web Audio API (procedural audio noise generator without external audio files)
- **Text-to-speech**: Web Speech API (`SpeechSynthesis`)
- **Internationalization**: Lightweight custom i18n supporting English and French

---

## Getting started locally

Make sure you have Node.js installed.

1. Clone the repository:
   ```bash
   git clone https://github.com/Leandre99/Hyperbloom-October.git
   cd Hyperbloom-October
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *(Note for Windows PowerShell: if script execution policies block npm, use `npm.cmd install`)*

3. Start the development server:
   ```bash
   npm run dev
   ```
   *(Or `npm.cmd run dev` on Windows)*

4. Open `http://localhost:5173/` in your browser.

# 🌱 Calmly — Neuro-Inclusive Learning Sanctuary

> **Built for HyperBloom October 2026: UI/UX & Web Design Hackathon**  
> An open-source, gentle, and accessible learning space engineered for neurodivergent learners (ADHD, Dyslexia, Executive Dysfunction).

🔗 **Live Public Demo**: [https://leandre99.github.io/Hyperbloom-October/](https://leandre99.github.io/Hyperbloom-October/)  
🏆 **Category**: UI/UX & Web Design · Accessibility · Inclusive Digital Experiences

---

## 🎯 Executive Summary & The Problem

Mainstream Learning Management Systems (Moodle, Blackboard, Google Classroom) are built as bureaucratic file cabinets, not human learning environments. They subject students to **severe cognitive overload**:
- Dozens of concurrent deadlines blinking in alarming red.
- Overcrowded dashboards with competing visual anchors.
- Inflexible fonts and bright glaring backgrounds causing rapid ocular fatigue.

For learners with **ADHD or Dyslexia** (1 in 5 students), this visual friction leads directly to **executive dysfunction paralysis** — the cognitive inability to decide where to begin, which leads to anxiety, procrastination, and academic burnout.

> *“Mainstream platforms show me everything I haven’t finished yet. Calmly shows me only the next single step.”*

---

## ✨ 4 Winning Innovations Built into Calmly

### 1. ⚡ Bionic Reading Engine (`LessonsView.tsx`)
- Integrated visual fixation anchors directly into lessons.
- The first 40–50% of every word is automatically rendered with higher weight (`font-weight: 850`), guiding saccadic eye movements.
- Dramatically increases reading comprehension and focus stamina for ADHD readers without cognitive fatigue.
- Paired with an interactive **Reading Ruler** (floating band that tracks mouse/touch) and native browser **Text-to-Speech** (Web Speech API).

### 2. 🪄 AI ADHD Magic De-Chunker (`AddTaskModal.tsx`)
- When faced with sprawling, vague assignments (*"Write a 10-page economics paper"*), students freeze.
- Calmly features an automated **Magic De-Chunker**: with one click, it intelligently breaks complex assignments into gentle, bite-sized **3 to 12-minute micro-steps**.
- Shifts focus from monumental pressure to immediate, bite-sized wins.

### 3. ♿ Live WCAG 2.2 & Contrast Inspector (`A11yInspector.tsx`)
- A live diagnostic tool placed directly in the app for **hackathon judges & auditors**.
- Dynamically measures real-time contrast ratios across all 4 themes (up to **21.0:1 AAA Pass**).
- Includes an interactive **Vision Simulator Sandbox**: judges can simulate *Protanopia* (red-blind), *Deuteranopia* (green-blind), *Tritanopia* (blue-blind), or *Achromatopsia* (monochrome) to verify universal legibility.

### 4. 🌱 Botanical Growth Garden (`GrowthGarden.tsx`)
- Replaces toxic, shame-inducing daily streaks with **gentle, forgiving gamification**.
- Features 5 custom-designed SVG botanical evolution stages (Dormant Seed ➔ Fresh Sprout ➔ Sturdy Sapling ➔ Thriving Plant ➔ Blooming Sanctuary).
- Your plant never dies or withers when you take time off. Every completed micro-step moves the garden forward.

---

## 🧭 Complete Architecture & Feature Breakdown

| Feature | Description | Inclusive Impact |
|---|---|---|
| **Sensory Profile Onboarding** | Interactive 4-step first-run wizard. | Students configure comfortable typography, theme, and density before seeing any workload. |
| **One-Thing-at-a-Time Dashboard** | Shows only the current next step; later work is folded away. | Directly neutralises executive dysfunction and sensory overwhelm. |
| **Hard-Day Energy Check-in** | 1-tap mood barometer (Drained ➔ Great). | If energy is low, activates *Hard-Day Mode*, hiding everything except a tiny 2-min step. |
| **Focus Pomodoro & Sound Machine** | Fullscreen focus mode with animated breathing guide during breaks. | Synthesises real-time **Brown, Rain, and White noise** via Web Audio API to mute ambient audio distractions. |
| **Zero-Friction Local Storage** | No passwords, no registration walls, 100% privacy-first. | Eliminates the highest onboarding barrier for ADHD students. Data is stored safely in `localStorage`. |
| **Bilingual Seamless Switching** | Full, instant English 🇬🇧 and French 🇫🇷 translations. | Native accessibility for global students. |

---

## ♿ Accessibility (WCAG 2.2 AA Compliance)

- **Contrast**: Exceeds WCAG 2.2 AA in all themes:
  - Warm Cream: `11.8:1` (Low-glare paper simulation)
  - Soft Light: `13.2:1`
  - Calm Dark: `12.6:1`
  - High Contrast: `21.0:1` (Maximum pure OLED contrast)
- **Typography**: Embedded offline WOFF2 fonts:
  - **OpenDyslexic** (weighted bottoms prevent mental letter inversion)
  - **Atkinson Hyperlegible** (developed by the Braille Institute for low vision)
- **Touch Target Size**: Strict compliance with WCAG 2.5.8 (all clickable targets $\ge 44\text{px}$).
- **Keyboard Navigation**: 100% operable via `Tab` and `Enter`, with high-visibility focus indicators (`:focus-visible`).
- **Vestibular Safety**: Native support for `prefers-reduced-motion` to instantly disable all scale and bounce transitions.

---

## 🛠️ Technical Stack

- **Frontend**: React 19, TypeScript, Vite 8
- **Audio Synthesis**: Web Audio API (real-time brown/pink noise algorithm without external audio files)
- **Speech**: HTML5 SpeechSynthesis API (client-side text-to-speech with speed pitch modulation)
- **Styling**: Native CSS custom properties & dynamic `data-*` tokens (zero heavyweight UI libraries)
- **Deployment**: Automated GitHub Pages CI/CD workflow

---

## 💻 Local Development Setup

To run Calmly on your machine:

```powershell
# 1. Clone repository
git clone https://github.com/Leandre99/Hyperbloom-October.git
cd Hyperbloom-October

# 2. Install dependencies
npm.cmd install

# 3. Start local development server
npm.cmd run dev
```

Then open `http://localhost:5173/Hyperbloom-October/` in your browser.

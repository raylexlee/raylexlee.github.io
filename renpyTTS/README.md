# 🚀 Ren'Py Direct TTS Bridge (Edge Online Natural Voices)

A **Serverless (Flask-Free), Selenium-Free, Zero-Latency, and Memory-Direct** third-party High-Quality Text-to-Speech (TTS) solution tailored for Ren'Py engine games. 

This project leverages Microsoft Edge's native **Remote Debugging Port (Chrome DevTools Protocol - CDP)** mechanism via pure WebSockets to command premium, highly expressive, human-like **Online Natural Voices**. It features automatic character-based gender voice splitting and fluid gameplay streaming.

Perfect for games where developers completely disabled or stripped the native voice assistant/self-voicing feature (such as *Milfy City*, *Being a DIK*, etc.), restoring an immersive and high-fidelity voiced experience for players and accessibility enhancement.

---

## ✨ Core Features

- ⚡ **Zero-Latency CDP Connection**: Ditches traditional local Flask API servers and heavy Selenium automated testing frameworks. Communicates directly with the browser's engine over high-frequency WebSockets for instantaneous response.
- 🕵️ **100% Stealth & Cloud Voice Unlock**: Launches an isolated native Edge debugging sandbox via pure command-line flags. This completely erases automated testing signatures (`webdriver`), ensuring Microsoft's 334+ Online Natural Voices load successfully without safety restrictions.
- 🗣️ **Distinct Gender Voice Mapping**: Dynamically switches male/female voices according to the active speaker via a lightweight JSON mapping profile. Utilizes a "precise space boundary matching" algorithm to eliminate misidentifications (e.g., preventing `Yan` from mistakenly matching `Ryan`).
- 🔄 **On-the-Fly Tuning Sliders**: Reuses a single global `SpeechSynthesisUtterance` instance. You can drag the **Rate** and **Pitch** sliders on the webpage mid-game, and the very next dialogue line will instantly update its speed/tone without restarting!
- 🛑 **Instant Text Sanitization**: Automatically strips annoying asterisks (`*`) in visual novels (e.g., converting `*Whispered*` or `*Sigh*` into clean readable text) so the engine never awkwardly reads out the word "Asterisk".

---

## 🛠️ Requirements & Installation

### 1. Windows Native Python Environment
Ensure your Windows 11 system has **Python 3.13+** installed (The Microsoft Store version works perfectly). 
Open your Command Prompt (CMD) and run the following command to install the lightweight WebSocket routing dependency:
```bash
pip install websocket-client
```

### 2. File Deployment Checklist
Deploy the following core assets to your game directory and your GitHub Pages repository.

---

## 📦 File Structure & Deployment

### 🌐 A. Web Page Side (Upload to your GitHub Pages)
Place `tts.html`, `tts.js`, and your game profile `.json` files inside your GitHub repository folder (e.g., `https://<your-username>.github.io/renpyTTS/`):

- **`tts.html`**: The unified console dashboard containing interactive configuration sliders.
- **`tts.js`**: Controls global utterance instantiation and safeguards asynchronous voice asset arrays.
- **`[GameName].json`**: Character voice mapping file. Structure is highly streamlined; you only need to fill in the **second word** of the desired Edge Natural Voice name:
  ```json
  {
      "Narrator": "Yunxi",
      "Judy": "Yan",
      "Caroline": "Libby",
      "MC": "William"
  }
  ```

> 💡 **Utility Hint**: The repository includes a `genJSON.sh` script (for WSL/Linux). If you extract all character lists via Ren'Py into a plain text format (e.g., lines of `Judy Yan`), running `./genJSON.sh GameName` will generate the standard mapped JSON profile in seconds.

---

### 🎮 B. Game Injector Side (Place inside your Steam game directory)

1. **`game/tts_bridge.rpy`**
   Place this directly into the game's `game/` folder. This handles real-time runtime script callbacks, filters formatting tags, and dumps dialogue signals into a 10ms high-speed buffer file `tts_signal.tmp`. (Use your earliest stable working version for seamless main dialogue synchronization).

2. **`run_milfy_city.py`** (or rename to `run_game.py`)
   Place this into the game's **root directory** (same layer as the `renpy/` and `game/` folders). This acts as your unified launcher. It executes the native game `.exe`, spins up the Edge debugging profile, and manages the high-frequency background WebSocket polling loop.

---

## 🚀 How to Launch & Play

1. Open Windows CMD, and `cd` into your game's root directory.
2. Fire up the launcher script:
   ```bash
   python run_milfy_city.py
   ```
3. The script will automatically trigger a clean instance of Edge navigating to your hosted page. **[CRITICAL] Use your mouse to click anywhere on that open browser webpage once.** This manually unlocks the browser's audio context autoplay security policy.
4. Your Steam game window will pop up automatically right after. Enjoy your smooth, character-segregated high-quality voiced journey!

---

## 🖱️ Accessibility Tip: Choice Hovering & Menu Speaking

For the absolute smoothest and most responsive gameplay experience, choice hovering and button reading can be perfectly supplemented via Ren'Py's native engine behavior:

- **95% Immersive Storytelling (Default Mode)**: Keep your main dialogue flowing seamlessly with high-fidelity, distinct male and female Microsoft Edge Natural online voices.
- **5% Choice Hovering / Review Mode**: For 99% of Ren'Py games that retain native hotkey mapping, simply press **`V`** on your keyboard during dialogue selections to activate the built-in Self-Voicing engine. As you move your mouse to highlight choices or review old chats in the History Log, the native local Windows SAPI voice (e.g., David or Mark) will promptly read them out for perfect navigation. 
- Once your choice is clicked, tap **`V`** again to immediately disable it and seamlessly return to your premium, immersive cloud Natural voices!

---

## 🛡️ Disclaimer & License
This project is strictly created for educational purposes, academic research into Ren'Py process communication mechanisms, and accessibility optimization for visual novels. Not for commercial use.


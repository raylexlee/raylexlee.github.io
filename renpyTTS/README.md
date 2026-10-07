# ⚡ Ren'Py Quick Direct TTS Bridge (config.tts_function Edition)

A highly optimized, **Flask-Free, Callback-Free, and 100% Crash-Proof** universal AI voice modification framework for Ren'Py engine games (running on both Ren'Py v7 and v8+).

By hijacking the lowest-level accessibility channel **`config.tts_function`**, this project captures the final, fully translated, and managed English string **`s`** right before audio rendering. It unlocks premium, highly expressive **Microsoft Edge Online Natural Voices** for both main dialogues and interactive menu choices simultaneously.

Successfully verified and works flawlessly across complex or heavily modded multi-language titles, including:
*MILFs of Sunville*, *Milfy City*, *The Grey Dreams*, *Growing Things Up*, *Shattered Minds*, and more.

---

## ✨ Why this Architecture is Revolutionary

1. **Zero Callbacks, Zero Crashes**: Completely abandons `character_callback` hooks, bypassing the infamous `'RevertableList' object is not callable` save/load rollback exceptions forever.
2. **Unified Dialogue & Hovering**: Since menu choices and screen elements flow into the unified `tts_function`, hovering your mouse over a button or dialog option triggers premium Neural voices instantly. No more robotic Microsoft David/Mark fallbacks!
3. **Perfect String Interpolation**: Captures strings after they have passed through all internal translation dicts (such as custom `languages.json` engines). Dialogues natively arrive formatted with the full speaker name prefixed (e.g., `Ray: What the hell!`), making voice matching completely robust.
4. **Preserved Hotkey Integration**: Native `V` key toggle behavior remains perfectly intact. When toggled off, it stays beautifully silent; when toggled on, your premium cloud voices take over.

---

## 🛠️ Workspace & Automation Workflow

### Step 1: Extract the Character Manifest
Drop `get_v8_all_characters.rpy` into your game directories to securely scrape the full roster pool into `[GAME_NAME]-extracted.txt`.

### Step 2: Predictive Gender Initialization
Run the universal gender-predictive compiler in your Python environment:
```bash
python init_game_profile.py [GAME_NAME]
```
This instantly evaluates suffix structures and formats your direct mapping configuration without needing to track old manual 3-column alignments.

### Step 3: Inject the Bridge Scripts
Deploy the newly optimized universal scripts directly from the source repository:

- **🎮 Game Injector Layer (`game/qtts_bridge.rpy`)**:
  Fetches the final managed speech string and funnels it into a sub-millisecond background buffer `tts_signal.tmp`. Automatically forces the re-mapping of hotkey `V` to ensure accessibility is enabled on all platforms.
  *Source*: [qtts_bridge.rpy](https://raw.githubusercontent.com/raylexlee/raylexlee.github.io/refs/heads/master/renpyTTS/qtts_bridge.rpy)

- **🚀 System Launcher Layer (`root/qrun_game.py`)**:
  Performs smart automatic detection of the native game `.exe`, spins up the isolated Edge WebSocket CDP debugging sandbox on port `9222`, and runs the 10ms high-frequency polling routine.
  *Source*: [qrun_game.py](https://raw.githubusercontent.com/raylexlee/raylexlee.github.io/refs/heads/master/renpyTTS/qrun_game.py)

---

## 🚀 Playback Operations

1. Launch your console terminal, navigate to the game root folder, and execute:
   ```
   python qrun_game.py
   ```
2. Once the custom Edge browser window loads, **click anywhere on the webpage once** to unlock the browser's audio context security policy.
3. The game will launch automatically. **Press `V` on your keyboard to toggle the voice assistant ON.**
4. Immerse yourself in a fully voiced world where distinct male and female premium cloud actors breathe life into every single line and button selection!


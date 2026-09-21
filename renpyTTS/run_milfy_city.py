import os
import sys
import time
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager

# 配置參數
GAME_NAME = "MilfyCity"
TARGET_URL = f"https://raylexlee.github.io/renpyTTS/tts.html?game={GAME_NAME}"

print(f"[TTS 主程式] 正在啟動 Edge 瀏覽器並開啟: {TARGET_URL}")
options = webdriver.EdgeOptions()
driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()), options=options)
driver.get(TARGET_URL)

print("[TTS 主程式] 請在瀏覽器視窗內任意點擊一下以解鎖音訊權限...")
time.sleep(3) # 給玩家 3 秒鐘時間去點擊網頁

# 注入環境路徑
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# 啟動 Ren'Py 遊戲核心
print("[TTS 主程式] 正在引導 Ren'Py 遊戲啟動...")
import renpy
renpy.store.selenium_driver = driver # 強行注入控制指針

if __name__ == "__main__":
    sys.argv = [sys.argv, "game"]
    try:
        import renpy.main
        renpy.main.main()
    except KeyboardInterrupt:
        pass
    finally:
        print("[TTS 主程式] 遊戲關閉，正在回收瀏覽器資源...")
        try: driver.quit()
        except: pass


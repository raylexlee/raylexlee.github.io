init 1400 python:
    # 讓腳本在遊戲完全初始化完畢的超後期 (init 1400) 執行，確保所有角色已被註冊
    def export_all_character_names_v3():
        import os
        names_set = set()
        
        # --- 策略 A：針對 Ren'Py 8.3+ 的官方最新 API 擷取 ---
        try:
            import renpy.character
            # 8.3+ 內建直接獲取當前所有註冊角色的最優雅函數
            all_chars = renpy.character.get_present_characters()
            for c in all_chars:
                if hasattr(c, 'name') and c.name:
                    if isinstance(c.name, str) and not c.name.startswith("_"):
                        names_set.add(c.name)
        except:
            pass

        # --- 策略 B：針對新版 Python 3 沙盒 store 命名空間的遍歷 ---
        try:
            import renpy.store
            # 遍歷新版 Ren'Py 8 的專屬儲存物件字典
            for key, value in renpy.store.__dict__.items():
                if value is None: continue
                class_name = type(value).__name__
                # 8.x 代碼中，角色的類別名稱通常是 ADVCharacter
                if class_name in ('ADVCharacter', 'Character') or 'Character' in str(type(value)):
                    if hasattr(value, 'name') and value.name:
                        if isinstance(value.name, str) and not value.name.startswith("_"):
                            names_set.add(value.name)
        except:
            pass

        # --- 策略 C：老規矩後備（相容舊版 Ren'Py 7） ---
        if len(names_set) == 0:
            for key, value in globals().items():
                if value is None: continue
                try:
                    class_name = type(value).__name__
                    if class_name in ('ADVCharacter', 'Character') or 'Character' in str(type(value)):
                        if hasattr(value, 'name') and value.name:
                            if isinstance(value.name, str) and not value.name.startswith("_"):
                                names_set.add(value.name)
                except:
                    pass

        # --- 💾 智慧型自動偵測遊戲目錄並寫出 TXT ---
        # Ren'Py 8.x 有時會鎖定目前工作路徑，我們透過內建 API 確保精確寫入遊戲根目錄
        try:
            base_dir = config.gamedir
            # 回退到根目錄層級
            root_dir = os.path.dirname(base_dir) if base_dir else "."
            output_path = os.path.join(root_dir, "Reclaiming_the_Lost_extracted.txt")
            
            # 如果發現我們的萬用啟動器自動抓到了名字，就動態命名
            exe_files = [f for f in os.listdir(root_dir) if f.endswith('.exe') and f.lower() != 'python.exe' and 'run_' not in f.lower()]
            if exe_files:
                game_main_name = os.path.splitext(exe_files[0])[0]
                output_path = os.path.join(root_dir, f"{game_main_name}_extracted.txt")

            with open(output_path, "w", encoding="utf-8") as f:
                for name in sorted(names_set):
                    # 徹底移除視覺小說名字裡偶爾包含的 {b} 樣式代碼，保持 TXT 極度乾淨
                    import re
                    clean_name = re.sub(r'\{[^}]*\}', '', str(name)).strip()
                    if clean_name:
                        f.write(clean_name + "\n")
            print("==== [TTS 導出成功] 已為新版引擎生成角色文字檔 ====")
        except Exception as e:
            # 萬一高級路徑失敗，直接定點強制輸出
            try:
                with open("Reclaiming_the_Lost_extracted.txt", "w", encoding="utf-8") as f:
                    for name in sorted(names_set):
                        f.write(str(name) + "\n")
            except:
                pass

    # 綁定到啟動回調中
    config.start_callbacks.append(export_all_character_names_v3)


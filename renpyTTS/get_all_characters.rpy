init -2 python:
    # ---- 終極安全版：自動導出所有角色名字的函數 ----
    def export_all_character_names():
        import os
        names_set = set()
        
        # 遍歷 Ren'Py 全域儲存庫中的所有物件
        for key, value in globals().items():
            if value is None:
                continue
                
            is_char = False
            
            # 透過檢查物件的類別名稱（String 匹配），完美避開 Function/Class 的判定地雷
            try:
                class_name = type(value).__name__
                if class_name in ('ADVCharacter', 'Character'):
                    is_char = True
                elif hasattr(value, '__class__') and 'Character' in value.__class__.__name__:
                    is_char = True
            except:
                pass
                
            if is_char:
                # 擷取角色的顯示名稱 (display name)
                try:
                    if hasattr(value, 'name') and value.name:
                        # 排除內建的特殊系統角色
                        if isinstance(value.name, (str, unicode)) and not value.name.startswith("_"):
                            names_set.add(value.name)
                except:
                    pass
        
        # 將抓到的名字排序，並寫入到遊戲根目錄下的 txt 檔案
        try:
            with open("extracted_characters.txt", "w") as f:
                for name in sorted(names_set):
                    # 舊版 Ren'Py (Python 2) 的字串處理
                    if isinstance(name, unicode):
                        f.write(name.encode('utf-8') + "\n")
                    else:
                        f.write(str(name) + "\n")
        except:
            pass

    # 讓 Ren'Py 在遊戲完全啟動並進入主選單時，自動執行這個導出函數
    config.start_callbacks.append(export_all_character_names)


init -1 python:
    def custom_neural_tts_speak(what):

     clean_text = str(renpy.substitute(what))
     if not clean_text:
        return

     try:
        with open("tts_signal.tmp", "w") as f:
            f.write("|||" + clean_text)
     except:
        pass

init python:
    config.tts_function = custom_neural_tts_speak
init 999 python:
    # 確保 self_voicing 列表存在
    if 'self_voicing' in config.keymap:
        # 如果 K_v 不在列表中，就把它加回去
        if 'K_v' not in config.keymap['self_voicing']:
            config.keymap['self_voicing'].append('K_v')
            
        # 如果遊戲用的是小寫 'v'
        if 'v' not in config.keymap['self_voicing']:
            config.keymap['self_voicing'].append('v')


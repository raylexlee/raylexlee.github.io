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

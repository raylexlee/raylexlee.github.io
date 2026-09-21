init -1 python:
    def direct_selenium_dialogue_callback(event, interact=True, **kwargs):
        if event == "show" or event == "begin":
            try:
                who = renpy.store._last_say_who
                what = renpy.store._last_say_what
                speaker_name = who.name if (who is not None and hasattr(who, 'name')) else (str(who) if who is not None else "Narrator")
            except:
                speaker_name = "Narrator"
                what = ""

            clean_text = str(renpy.substitute(what))
            if not clean_text:
                return

            try:
                with open("tts_signal.tmp", "w") as f:
                    f.write(str(speaker_name) + "|||" + clean_text)
            except:
                pass

    if config.character_callback is None:
        config.character_callback = [direct_selenium_dialogue_callback]
    else:
        config.character_callback.append(direct_selenium_dialogue_callback)


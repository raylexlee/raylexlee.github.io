init python:
    import renpy.display.tts

    # Store the original function so we can call it when we want native TTS
    _original_tts_speak = renpy.display.tts.speak

    def _edge_tts_speak(s, translate=True, force=False):
        # Optional: Only intercept when a menu is active.
        # renpy.get_screen("choice") returns the screen object if it's showing.
        if renpy.get_screen("choice") is not None:
            # Send the choice text to your Edge TTS engine.
            # Use invoke_in_thread to avoid blocking the game loop.
            renpy.invoke_in_thread(send_to_edge_tts, s)
            # Return without calling the original function -> native voice is suppressed.
            return
        else:
            # For all other text (dialogue, etc.), pass through to native TTS.
            _original_tts_speak(s, translate=translate, force=force)

    # Replace the global speak function with our interceptor.
    renpy.display.tts.speak = _edge_tts_speak

// Backup the original function so we can still call its native logic
const _original_Bitmap_decode = Bitmap.prototype.decode;

Bitmap.prototype.decode = function() {
    switch(this._loadingState) {
        case 'requestCompleted': 
        case 'decryptCompleted':
            this._loadingState = 'loaded';
            
            // Your custom investigation injection
            if (this._url in ImageManager.caching) {
                // Check if the loading image contains character assets
                if (this._url.includes('Body') || this._url.includes('Face') || this._url.includes('PEOPLE')) {
                    console.log("🗣️ SPEAKER IMAGE DETECTED:", this._url);
                }
                
                // Keep the game's custom NLT deletion logic intact
                delete ImageManager.caching[this._url];
            }

            if (!this.__canvas) this._createBaseTexture(this._image);
            this._setDirty();
            this._callLoadListeners();
            break;

        case 'requesting': 
        case 'decrypting':
            this._decodeAfterRequest = true;
            if (!this._loader) {
                this._loader = ResourceHandler.createLoader(this._url, this._requestImage.bind(this, this._url), this._onError.bind(this));
                this._image.removeEventListener('error', this._errorListener);
                this._image.addEventListener('error', this._errorListener = this._loader);
            }
            break;

        case 'pending': 
        case 'purged': 
        case 'error':
            this._decodeAfterRequest = true;
            this._requestImage(this._url);
            break;
    }
};
console.log("✅ Modified_Bitmap_prototype_decode.js successfully loaded!");


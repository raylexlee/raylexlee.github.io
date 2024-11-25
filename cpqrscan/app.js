function onScanSuccess(decodedText, decodedResult) {
    // Handle the result here
    document.getElementById('qr-reader-results').innerHTML = `Scanned Result: ${decodedText}`;
    console.log(`Scan result: ${decodedText}`, decodedResult);
}

function onScanError(errorMessage) {
    // handle scan error
    console.error(`QR Code scan error: ${errorMessage}`);
}

// Create instance of HTML5 QR code scanner
var html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);

function shareResult() {
    const result = document.getElementById('qr-reader-results').innerText;
    if (navigator.share && result) {
        navigator.share({
            title: 'QR Code Result',
            text: result,
        }).then(() => {
            console.log('Result shared successfully');
        }).catch((error) => {
            console.error('Error sharing result:', error);
        });
    } else {
        alert('Sharing not supported or no result to share');
    }
}


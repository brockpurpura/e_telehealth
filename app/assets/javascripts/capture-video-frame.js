(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.captureVideoFrame = factory();
    }
}(this, function () {
    return function captureVideoFrame(video, format) {
        if (typeof video === 'string') {
            video = document.getElementById(video);
        }

        format = format || 'jpeg';

        if (!video || (format !== 'png' && format !== 'jpeg')) {
            return false;
        }

        var canvas = document.createElement("CANVAS");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext('2d').drawImage(video, 0, 0);

        var dataUri = canvas.toDataURL('img/' + format);
        var data = dataUri.split(',')[1];
        var mimeType = dataUri.split(';')[0].slice(5)

        var bytes = window.atob(data);
        var buf = new ArrayBuffer(bytes.length);
        var arr = new Uint8Array(buf);

        for (var i = 0; i < bytes.length; i++) {
            arr[i] = bytes.charCodeAt(i);
        }

        var blob = new Blob([ arr ], { type: mimeType });
        return { blob: blob, dataUri: dataUri, format: format };
    };
}));


function snapshot() {
var frame = captureVideoFrame('video', 'png');

// Show the image
var img = document.getElementById('my-screenshot');
img.setAttribute('src', frame.dataUri);

toggle_widget('snapshot','screenshot_button'); 

// Send a snapshot message over the tunnel, only to log the snapshot
tunnel('snapshot', null);

//var download = document.createElement('a');
//download.href = frame.dataUri; 
//download.download = 'snapshot.png';
//download.click();
}

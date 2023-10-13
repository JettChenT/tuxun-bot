(function(xhr) {
    var XHR = XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;
    var setRequestHeader = XHR.setRequestHeader;
    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        this._requestHeaders = {};
        this._startTime = (new Date()).toISOString();
        return open.apply(this, arguments);
    };
    XHR.setRequestHeader = function(header, value) {
        this._requestHeaders[header] = value;
        return setRequestHeader.apply(this, arguments);
    };
    XHR.send = function(postData) {
        this.addEventListener('load', function() {
            if(this.responseURL == "https://tuxun.fun/api/v0/tuxun/mapProxy/getGooglePanoInfoPost"){
                let retDat = JSON.parse(this.response);
                let relevant = retDat[1][0][5][0][1][0];
                document.dispatchEvent(new CustomEvent('tResponse', {
                    detail: {
                        method: this._method,
                        postData: postData,
                        response: this.response,
                        responseURL: this.responseURL,
                        coords: [relevant[2], relevant[3]],
                    }
                }));
            }
        });
        return send.apply(this, arguments);
    };

})(XMLHttpRequest);
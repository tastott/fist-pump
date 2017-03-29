const es = new EventSource("/outgoing");

es.onmessage = (event: sse.IOnMessageEvent)  => {
    document.body.innerHTML = JSON.stringify(event.data, null, 4);
};

// http://25.media.tumblr.com/fadd7fc5fc867696a287520bb06b09ae/tumblr_n037nomlwN1r8exu0o1_250.gif
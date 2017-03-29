const es = new EventSource("/outgoing");

es.onmessage = (event: sse.IOnMessageEvent)  => {
    document.body.innerHTML = JSON.stringify(event.data, null, 4);
};

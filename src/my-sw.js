self.addEventListener('fetch', (event) => {
    console.log("evenet: ", event.request.url);
});
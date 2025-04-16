const hmr = new EventSource("/__webpack_hmr");

hmr.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);
    if (message.action === "built") {
      console.log(`Reloading page: ${message.name} bundle updated`);
      location.reload();
    }
  } catch {
    //
  }
});

// Event delegation - all events eventually end up on the document (due to capturing and bubbling)
// so when there is event listener on div to say hi that is higher in the code then another
// created div element - it will not add eventListener to that newly created div

function addGlobalEventListener(type, selector, callback) {
  document.addGlobalEventListener(type, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}

// only say hi when you click on the div - the same as the above

document.addEventListener("click", (e) => {
  if (e.target.matches("div")) {
    console.log("hi");
  }
});

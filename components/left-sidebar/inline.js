const groups = [];
let current = [];

for (const li of document.querySelectorAll("ol > li")) {
  if (li.classList.contains("section")) {
    if (current.length > 0) groups.push(current);
    current = [];
  } else {
    current.push(li);
  }
}
if (current.length > 0) groups.push(current);

// Add class to groups with NO direct > details
for (const group of groups) {
  const hasDetails = group.some(li =>
    li.querySelector(":scope > details")
  );

  if (!hasDetails) {
    for (const li of group) li.classList.add("no-details-group");
  }
}

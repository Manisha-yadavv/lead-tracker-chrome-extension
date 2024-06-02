const saveEl = document.querySelector(".save-btn");
let saveLeads = [];
const ulEl = document.querySelector(".ul-el");
const inputEl = document.querySelector(".input-el");
const deleteBtn = document.querySelector(".delete-btn");
const saveTab = document.querySelector(".save-tab-btn");
const leadsfromLocalStorage = JSON.parse(localStorage.getItem("Leads"));

if (leadsfromLocalStorage) {
	saveLeads = leadsfromLocalStorage;
	render(saveLeads);
}

saveTab.addEventListener("click", function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		saveLeads.push(tabs[0].url);
		localStorage.setItem("Leads", JSON.stringify(saveLeads));
		render(saveLeads);
	});
});

function render(leads) {
	let listItems = "";
	for (let i = 0; i < leads.length; i++) {
		listItems += `<li><a target = '_blank' href='${leads[i]}' >${leads[i]}</a></li>`;
	}
	ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
	localStorage.clear();
	saveLeads = [];
	render(saveLeads);
});

saveEl.addEventListener("click", function () {
	saveLeads.push(inputEl.value);
	inputEl.value = "";
	localStorage.setItem("Leads", JSON.stringify(saveLeads));
	render(saveLeads);
});

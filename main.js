class TODO {
	constructor(form) {
		this.form = form;
		this.input = form.todoInput;
		this.table = document.getElementById("table");
		this.arrayOfTasks = [];
		this.counter = 0;
	}
	onLocalGet() {
		if (JSON.parse(localStorage.getItem("tasks")) != null) {
			this.arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
			for (let i = 0; i < this.arrayOfTasks.length; i++) {
				this.counter = i;
				this.createElement(this.arrayOfTasks[i]);
			}
		}
	}

	validate(value, minLength) {
		return value.length > minLength ? true : false;
	}
	onSubmit(e) {
		e.preventDefault();
		if (this.validate(this.input.value, 3)) {
			this.createElement(this.input.value);
			this.onLocalSet(this.input.value);
		} else {
			alert("Invalid form");
		}
	}
	createElement(value) {
		const trow = document.createElement("tr");
		trow.innerHTML = `<td class="value">${this.counter}-${value}</td><td>
        <button class="done" >Done</i></button>
        <button class="del" >Delete</button></td>`;

		this.counter++;
		this.table.appendChild(trow);
		this.onDel(trow);
		this.onDone(trow);
	}

	onDel(trow) {
		trow.childNodes[1].childNodes[3].addEventListener("click", (e) => {
			trow.parentNode.removeChild(trow);
			let rowOfTasks = trow.childNodes[0].textContent.split("");
			this.arrayOfTasks.splice(rowOfTasks[0], 1);
			if (localStorage.getItem("tasks") == null) {
				localStorage.setItem("tasks", JSON.stringify(this.arrayOfTasks));
			} else {
				localStorage.removeItem("tasks");
				localStorage.setItem("tasks", JSON.stringify(this.arrayOfTasks));
			}
		});
	}
	onDone(trow) {
		trow.childNodes[1].childNodes[1].addEventListener("click", (e) => {
			trow.childNodes[0].classList.toggle("stroke");
		});
	}
	onLocalSet(value) {
		this.arrayOfTasks.push(value);
		localStorage.setItem("tasks", JSON.stringify(this.arrayOfTasks));
	}
}

let form = new TODO(document.forms.form);

form.form.addEventListener("submit", form.onSubmit.bind(form));
window.onload = () => {
	form.onLocalGet();
};

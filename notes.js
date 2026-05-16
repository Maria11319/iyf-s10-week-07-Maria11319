function getNotes() {
    return JSON.parse(localStorage.getItem("notes")) || [];
}
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}
function renderNotes() {
    const notes = getNotes();
    const list = document.getElementById("notesList");
    list.innerHTML = "";
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes(notes);
            renderNotes();
        });
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

document.getElementById("saveBtn").addEventListener("click", function() {
    const input = document.getElementById("noteInput");
    const text = input.value.trim();
    if (!text) return;
    const notes = getNotes();
    notes.push(text);
    saveNotes(notes);
    input.value = "";
    renderNotes();
});

renderNotes();
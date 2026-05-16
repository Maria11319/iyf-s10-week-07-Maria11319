const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

function setState(updates) {
    Object.assign(state, updates);
    saveState();
    render();
}

function setFilter(filter) {
    setState({ filter });
}

function addTodo(text) {
    setState({
        todos: [...state.todos, { id: Date.now(), text, completed: false }]
    });
}

function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    });
}

function saveState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (saved) {
        Object.assign(state, JSON.parse(saved));
    }
}

function render() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    const filtered = state.todos.filter(todo => {
        if (state.filter === "active") return !todo.completed;
        if (state.filter === "completed") return todo.completed;
        return true;
    });
    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed) li.style.textDecoration = "line-through";
        li.addEventListener("click", () => toggleTodo(todo.id));
        list.appendChild(li);
    });
}

document.getElementById("addBtn").addEventListener("click", function() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;
    addTodo(text);
    input.value = "";
});

loadState();
render();
// Observer Pattern
const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listeners.forEach(listener => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        }
    };
};

// Usage
const store = createStore({ count: 0 });

const unsubscribe = store.subscribe(state => {
    console.log("State changed:", state);
});

store.setState({ count: 1 }); // logs state
store.setState({ count: 2 }); // logs state
unsubscribe(); // stop listening
store.setState({ count: 3 }); // no log
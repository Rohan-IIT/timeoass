const fs = require('fs');
const path = require('path');
const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/todos.json'));
    const todosArray = JSON.parse(jsonData);
    todosArray.forEach((element) => {
        db.set(element[0], element[1]);
    });
};
const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/todos.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (todo) => {
        const newTodo = {
            id: crypto.randomUUID(),
            text: todo.text,
        };
        db.set(newTodo.id, newTodo);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (todo) => {
        db.set(todo.id, todo);
        saveData();
    },

};

loadData();

module.exports = repo;
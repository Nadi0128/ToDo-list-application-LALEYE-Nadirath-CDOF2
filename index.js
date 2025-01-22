const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const path = require('path');


// Liste des tâches
let todos = [];

const showMenu = () => {
    console.log(`
======== TODO LIST ========
1. Add a task
2. View tasks
3. Delete a task
4. Exit
===========================
    `);
};

const addTask = () => {
    rl.question('Entrez la tâche à ajouter : ', (task) => {
        if (task.trim() === '') {

            console.log(' La tâche ne peut pas être vide !');

            console.log(' La tâche ne peut pas être vide!');
        } else {
            todos.push(task);
            console.log(` Tâche ajoutée : "${task}"`);
        }
        mainMenu();
    });
};

const showTasks = () => {
    if (todos.length === 0) {
        console.log(' Aucune tâche pour le moment!');
    } else {
        console.log(' Voici vos tâches :');
        todos.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
    mainMenu();
};

const deleteTask = () => {
    if (todos.length === 0) {
        console.log(' Aucune tâche à supprimer !');
        mainMenu();
        return;
    }
    showTasks();
    rl.question('Entrez le numéro de la tâche à supprimer : ', (number) => {
        const index = parseInt(number, 10) - 1;
        if (index >= 0 && index < todos.length) {
            const removed = todos.splice(index, 1);
            saveTasks(); // Save après ajout ou suppression
            console.log(` Tâche supprimée : "${removed[0]}"`);
        } else {
            console.log(' Numéro invalide.');
        }
        mainMenu();
    });
};

const mainMenu = () => {
    showMenu();
    rl.question('Choisissez une option (1-4) : ', (choice) => {
        switch (choice.trim()) {
            case '1':
                addTask();
                break;
            case '2':
                showTasks();
                break;
            case '3':
                deleteTask();
                break;
            case '4':
                console.log(' Au revoir :) ');
                rl.close();
                break;
            default:
                console.log(' Option invalide, essayez encore.');
                mainMenu();
                break;
        }
    });
};

// Lancer le menu principal
mainMenu();

#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";


figlet (`Todo List`, function (err, data){
    if(err){
    console.log("something went wrong...");
    console.dir(err);
    return;
    }
    console.log(chalk.green(data))
    });

let todoList: string[]=[];

async function RepeateFlow(){
    const answer = await inquirer.prompt([{
        name: "repeat",
        type: "list",
        choices: ["Yes", "No"],
        message: "Do you want another operation"
    }]);

    return (answer.repeat === "Yes")? true: false;
}
async function TodoList(){
let startAgain = true;
    do{

    
    const answer: {option:string} = await inquirer.prompt([{
        name: "option",
        type: "list",
        choices: ["Add Item", "Display", "Remove Items"],
        message: "What you want to do?"

    }]);

    if(answer.option === "Add Item"){

        const item = await inquirer.prompt([{
            name: "newItem",
            type: "input",
            message: "Enter New Item"
        }]);

        todoList.push(item.newItem);
        startAgain = await RepeateFlow();
    }
    else if (answer.option === "Display"){
        if(todoList.length == 0){
console.log(chalk.redBright("Your list is empty"));
        }
        todoList.forEach(element => console.log(element));
        startAgain = await RepeateFlow();
    }
    else if(answer.option === "Remove Items"){
        if(todoList.length == 0){
            console.log(chalk.redBright("Your list is already empty"));
                    }
        const removeItem: {remove: string} = await inquirer.prompt([{
            name: "remove",
            type: "input",
            message: "Which item you want to remove"
        }])

        let index = removeItem.remove;
    console.log(chalk.yellow(`Your item:${index}! has been removed`));
    startAgain = await RepeateFlow();
    }
}while(startAgain !== false)
}

setTimeout(() => {
    TodoList();
}, 1000);


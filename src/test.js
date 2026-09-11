import { createProject } from "./project.js";
import { createTodo } from "./todo.js";
import { saveState, loadState } from "./storagemananement.js";
import { addProject } from "./projectlist.js";

const heal = createProject("heal");

const accept = createTodo("Accept what happened","Acceptance is the key to healing. Without expectations, there's no pain.", undefined, undefined,undefined, "ongoing");

const loveYourself = createTodo("Love Yourself","Prioritizing yourself is not selfish, it's selfless.", undefined,undefined,undefined, "incoming");

heal.addTodo(accept);
heal.addTodo(loveYourself);

addProject(heal);

saveState();

loadState();

console.log(loadState());
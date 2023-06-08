//Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções
const saveTodo = (Text) => { //Essa função faz o texto descer

    const todo = document.createElement("div") //criando a div pra descer a lista. Ele está criando o que está comentado no html.
    todo.classList.add("todo")
    todo.dataset.state = 'todo' //cria um id pra cada to-do, com base no tempo atual.

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = Text
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'  //adicionando o botão, a classe e o icone
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pencil"></i>'  //adicionando o botão, a classe e o icone
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'  //adicionando o botão, a classe e o icone
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo) //coloca o const todo na lista geral.

    todoInput.value = ""; //limpa o texto do campo
    todoInput.focus(); //foca pra digitar novamente
};
const toggleForms = () => { //Essa arrow function pega a classlist do editForm e da um toggle pra esconder.
    editForm.classList.toggle("hide") //basicamente, quando ele clica em editar, ele só vê a edição, daí quando clica de novo, volta ao normal.
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3") //pega o titulo do to-do atual mapeando com o forEach

        if(todoTitle.innerText === oldInputValue){ // valida se o titulo antigo e o atual são iguais, se for, o parâmetro se torna o titulo
            todoTitle.innerText = text
        }
    })
}
//Eventos
todoForm.addEventListener("submit", (e) => { //Quando enviar o formulário executa uma função anônima, na qual vai dizer o que vai fazer com o evento.
    e.preventDefault() //aqui se usa o prevent default pq estamos trabalhando só com o frontend, então as informações não tem um destino definido.
    
    const inputValue = todoInput.value

    if(inputValue) {
        console.log(inputValue)
        saveTodo(inputValue)
    }
})
document.addEventListener("click", (e) => { //se for um elemento que eu quero, executo esse evento, se n, n
    const targetEl = e.target //faz com que eu saiba qual é o elemento
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){ //localiza o titulo, e valida se ele existe
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    if(targetEl.classList.contains("finish-todo")){ //mapeando o botão de check pra concluir a tarefa
        parentEl.classList.toggle("done"); //adiciona a classe done para os to-do's que eu clico pra descer, diferente do add, ele faz o processo, e faz o inverso caso seja acionado novamente.
        parentEl.dataset.state = parentEl.classList.contains('done') ? 'done' : 'todo'; //se o estado for todo, ele muda pra done, se for done, ele muda pra todo.
    }
    if(targetEl.classList.contains("remove-todo")){ //remove a tarefa
        parentEl.remove();
    }
    if(targetEl.classList.contains("edit-todo")){ //remove a tarefa
        toggleForms()//esconde um formulário e mostra outro

        editInput.value = todoTitle; //muda o valor do input e salva ele na memória
        oldInputValue = todoTitle; //50:24
    }
});
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleForms(); //o cancelar só vai aparecer quando o edit estiver habilitado, então a função do toggle também serve, pois ele volta a origem.
});
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue) //para o formulário, manda uma função de alteração executada e volta ao normal.

    }
    toggleForms()
})
const selectFilter = document.querySelector("#filter-select");
selectFilter.addEventListener("change", (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    
    items = document.querySelectorAll(".todo");
    items.forEach((item) => {
        console.log(item.dataset.state);
        switch(selectedValue){
            case "all":
                item.style.display = "flex";
                break;
            case "done":
                if(item.dataset.state === "done"){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "todo":
                if(item.dataset.state === "todo"){
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    })
});
//A função horaDoDia() é responsável pela seleção automática dos ícones Sol e Lua, bem como a mensagem de boas vindas no canto superior da tela.
function horaDoDia() {
  var h2 = document.querySelector("h2");
  var icone = document.getElementById("icone");
  var hora = new Date().getHours();
  
  if (hora >= 5 && hora < 12) {
    h2.innerText = 'Bom dia!';
    icone.src = 'sun.svg';
    icone.style.top = '37.5px';
    icone.style.left = '120px';
  } else if (hora < 18) {
    h2.innerText = 'Boa tarde!';
    icone.src = 'sun.svg';
    icone.style.top = '37.5px';
    icone.style.left = '132px';
  } else {
    h2.innerText = 'Boa noite!';
    icone.src = 'moon.svg';
    icone.style.left = '131px';
    icone.style.top = '34px';
  }
}
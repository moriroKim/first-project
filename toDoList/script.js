const inputContainer = document.querySelector(".input-container");
const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

let todos = []; // li(할 일)들을 저장할 배열을 생성

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const delItem = (event) => {
    const target = event.target.parentElement;

    todos = todos.filter((todo) => todo.id !== parseInt(target.id)) // target.id(지우려는 요소)가 아닌 todo.id들만 필터링
    save();

    target.remove();
};


const addItem = (todo) => { // 2-2 ~ 2-3
    if(todo.text !== '') { 
        const li = document.createElement('li'); // <li></li> 생성 후 => 상수 li에 할당
        const button = document.createElement('button');
        const span = document.createElement('span');

        span.innerText = todo.text; // <span>todo 객체의 text: inputBox.value</span>
        button.innerText = '\u00d7'; // X 문자
        button.addEventListener('click', delItem);

        li.appendChild(span);
        li.appendChild(button);
        listContainer.appendChild(li);
        li.id = todo.id;
        }
};                                            

const handler = (event) => {
    event.preventDefault(); // 2-0

    const todo = {
        id: Date.now(),
        text: inputBox.value,
    };

    todos.push(todo);

    addItem(todo); // 2-1
    save();
    inputBox.value = ''; // 2-4
};
//2-0 handler 함수는, preventDefault()로 새로고침 현상 예방.
//2-1. addItem 함수를 호출하면서 입력받은 todo를 addItem()에 넘겨준다.
//2-4. inputBox.value 값을 빈문자열로 초기화.

const init = () => {
    const userTodos = JSON.parse(localStorage.getItem('todos'));
    
    if (userTodos) {
    userTodos.forEach((todo) => {
        addItem(todo);

    if (todo.checked) {
        const listItem = document.getElementById(todo.id);
        listItem.classList.add('checked');
    }

    });

    todos = userTodos;

    }
};

// 선택된 todo의 checked 상태를 업데이트하는 함수
const updateTodoCheckedState = (todoId, isChecked) => {
    // 해당 todo 객체 찾기
    const todo = todos.find((todo) => todo.id === todoId);

    // checked 상태 업데이트
    todo.checked = isChecked;

    // 변경된 상태 저장
    save();
};

// listContainer에 클릭 이벤트 추가
listContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        // 클릭된 li 요소
        const clickedListItem = event.target;
        
        // 클래스 "checked"를 토글
        clickedListItem.classList.toggle("checked");

        // 클릭된 li 요소의 id
        const clickedTodoId = parseInt(clickedListItem.id);
        
        // 클릭된 li 요소가 클래스 "checked"를 가지고 있는지 확인하여 checked 상태 업데이트
        const isChecked = clickedListItem.classList.contains("checked");
        updateTodoCheckedState(clickedTodoId, isChecked);
    }
}, false);
        
// 선택 삭제 기능
function selectDelete() {
    let list = listContainer.querySelectorAll(".checked");
    if(list.length < 1) { // 체크 갯수가 1미만일때
        alert("항목을 체크해주세요."); 
    }
    else {
        list.forEach(function(del){ // forEach는 배열 메서드. 노드 배열에 접근
        todos = todos.filter((todo) => todo.id !== parseInt(del.id)) // del.id(지우려는 요소)가 아닌 todo.id들만 필터링
        del.remove();
        });
    }
    save();
}
// 전체 삭제
function deleteAll(){
    if(listContainer.childElementCount === 0) {
        alert("삭제할 내용이 없습니다.");
    }
    else {
        const delList = document.querySelectorAll('li');
        for ( let i = 0; i < delList.length; i++ ){
            delList[i].remove();
        }
        todos = [];
        save();
    }
}

init();
inputContainer.addEventListener('submit', handler);
// 1. form 태그에 submit 이벤트가 일어날 때, handler함수 작동.
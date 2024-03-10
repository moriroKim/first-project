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
                                        

//2-2. inputBox.value인자값이 text로 대체되고 (text = inputBox.value)
//2-3. text가 빈문자열이 아니면 li를 생성하고 ul의 자식으로 붙이는 코드를 실행.

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

    });

    todos = userTodos;

    }
    applyCheckedState();
    saveCheckedState();
};

// 체크박스 상태 저장
const saveCheckedState = () => {
    const checkedItems = Array.from(listContainer.querySelectorAll(".checked")).map(item => item.id);
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
};

// 페이지 로드될 때 저장된 체크박스 상태 불러오기
const applyCheckedState = () => {
    const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    checkedItems.forEach(itemId => {
        const item = document.getElementById(itemId);
        if(item) {
            item.classList.add("checked");
        }
    });
};


// 체크박스 버튼 이벤트 추가
listContainer.addEventListener("click", (event) => {
    if(event.target.tagName === ("LI")){ /* 만약 클릭된 타겟의 태그네임이 LI(리스트)일 경우 */
        event.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "button") {
        delItem();
        save();
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
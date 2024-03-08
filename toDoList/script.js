const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const toDoList = document.getElementsByClassName("container");

function addTask() {
    if(inputBox.value === ''){ /* input 박스의 문자열 값이 공백일 때 */
        alert("할 일을 추가해주세요!"); /* 경고 메세지를 출력한다. */
    }
    else{
        let li = document.createElement("li"); /* 유저에게 문자열 값을 제대로 입력 받았을때 li(list) 요소를 생성한다. */
        li.innerHTML = inputBox.value; /* #input-box에 유저가 입력한 값을 li요소 안의 html요소에 받아옴 */
        listContainer.appendChild(li); /* 그후, 부모요소인 listContainer(#list-container)에 li라는 자식요소를 추가함. */
        let span = document.createElement("span"); /* span 정의 후, 요소생성 메소드로 "<span>" 태그를 생성" */
        span.innerHTML = "\u00d7"; /* <span>\u00d7</span> 라는 뜻. \u00d7은 곱하기(x) 모양 */
        li.appendChild(span); /* li요소의 자식요소로 span을 추가 */
    }
    inputBox.value = ''; /* 위에 조건을 만족하면 마지막 처리로 inputBox의 문자열값을 공백으로 초기화 */
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){ /* 만약 클릭된 타겟의 태그네임이 LI(리스트)일 경우 */
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false); /* 이벤트 리스너의 버블링(부모-조상까지 이벤트click이 번짐) 현상을 방지 -> false */

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML); /* 로컬스토리지에 setItem(key, value)쌍으로 저장함. data라는 key에 listContainer.innerHTML를 저장함.*/
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function deleteAll(){
    if(listContainer.childElementCount === 0) {
        alert("삭제할 내용이 없습니다.");
    }
    else {
        listContainer.innerHTML = null;
    }
    //const delList = document.querySelectorAll('li');
    //for ( let i = 0; i < delList.length; i++ ){
        //delList[i].remove(); /* --> for문 반복은 맘에 안들어서 위 코드로 수정. */
    //}
    saveData();
}

function selectDelete() { // 선택 삭제 기능
    let list = listContainer.querySelectorAll(".checked"); // listcontainer 안에 있는 checked 클래스에 접근하고 list에 노드배열을 담음
    if(list.length < 1) { // list 배열의 갯수가 1미만일때
        alert("항목을 체크해주세요."); 
    }
    else {
        list.forEach(function(del){ // forEach는 배열 메서드. 노드 배열에 접근
        del.remove();

    });
    }
    saveData();
}

showTask();

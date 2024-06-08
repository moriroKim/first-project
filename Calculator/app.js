const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let output = '';

const calculate = (btnValue) => {
    if (btnValue === "=") {
        try {
            // Replace % with /100 only for evaluation purposes
            const sanitizedOutput = output.replace(/%/g, '/100');
            display.value = eval(sanitizedOutput);
            output = display.value;
        } catch (error) {
            display.value = "Error";
            output = '';
        }
    } else if (btnValue === "AC") {
        output = '';
        display.value = output;
    } else if (btnValue === "DEL") {
        output = output.slice(0, -1);
        display.value = output;
    } else {
        output += btnValue;
        display.value = output;
    }
};

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const targetButton = e.target.closest('button');
        if (targetButton) {
            calculate(targetButton.dataset.value);
        }
    });
});

// 키보드 입력 이벤트 처리
display.addEventListener("input", (e) => {
    // 숫자와 기본적인 연산 기호만 남기고 나머지 제거
    output = display.value.replace(/[^\d+\-*/.%]/g, '');
    display.value = output;
});

display.addEventListener("keydown", (e) => {
    // 키보드 입력으로 숫자와 몇 가지 기호만 허용
    if (!/[0-9+\-*/.%]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
        e.preventDefault();
    }
    // Enter 키를 누르면 계산
    if (e.key === 'Enter') {
        calculate('=');
    }
});

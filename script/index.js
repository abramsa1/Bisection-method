document.querySelector('#solveBtn').addEventListener('click', polov_del);

/*  Код для модального окна */
const modal = document.querySelector('#tableModal');
const btn = document.querySelector('#tableBtn');
const span = document.querySelector('.close');
btn.addEventListener('click', popupTable);
span.addEventListener('click', popupClose);
window.addEventListener('click', outClick);

function popupTable() {
    modal.style.display = 'block';
}

function popupClose() {
    modal.style.display = 'none';
}

function outClick(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
/* **** */

/* Диаграмма - график */
function Diagram(a, b, x1) {
    var chartData = {
        datasets: [{
            type: "scatter",
            label: "Найденное значение",
            data: [{'x': 2.75, 'y': func(2.75).toFixed(2)}],
            showLine: false,
            order: 2,
            backgroundColor: 'red',
            borderColor: 'red',
            pointBorderColor: 'red',
            pointBackgroundColor: 'red',
            pointRadius: 6,
            pointHoverRadius: 10,
            pointBorderWidth: 3,
            pointStyle: 'rectRounded'
        }, {
            type: 'line',
            label: 'f(x)', //Метка
            data: [],
            borderColor: 'blue', //Цвет
            borderWidth: 2, //Толщина линии
            fill: true, //Не заполнять под графиком
            showLine: true,
            order: 1
        }]
    };
    for (let x = a - 8; x <= b + 8; x += 1) {
       chartData.datasets[1].data.push({'x': x, 'y': func(x).toFixed(2)});
    }
    var options = {
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
            }],
        }
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var solveChart = Chart.Scatter(ctx, {
        data: chartData,
        options: options
    });

    console.log(solveChart.data.datasets[1].data); 
}

function pow(str) {
    let position, newStr = '',
        positionEnd;
    let k, l, value = '',
        extent = '';
    let action = ['^', 'sin', 'cos', 'tan', 'log10'];

    for (let j = 0; j < action.length; j++) {
        position = 0;
        while (position != -1) {
            position = str.indexOf(action[j], position + 1);
            if (position + 1) {
                if (j == 0) {
                    for (k = position - 1;
                        (!isNaN(str[k]) || str[k] == '.' || str[k] == '-') && k > -1; k--) {}
                    for (l = position + 1; !isNaN(str[l]) || str[l] == '.' || str[k] == '-'; l++) {}
                    positionEnd = l;
                    for (let i = k + 1; str[i] != '^'; i++) {
                        value += str[i];
                    }
                    for (let i = l - 1; str[i] != '^'; i--) {
                        extent += (str[i]);
                    }
                    for (let i = 0; i < k + 1; i++) {
                        newStr += str[i];
                    }
                } else {
                    for (let i = 0; i < position; i++) {
                        newStr += str[i];
                    }
                }
                switch (j) {
                    case 0:
                        newStr += Math.pow(value, extent);
                        break;
                    case 1:
                    case 2:
                    case 3:
                        buf = '', k = position + 4;
                        for (; str[k] != ')'; k++) {
                            buf += str[k];
                        }
                        if (j == 1) {
                            newStr += Math.sin(+(buf));
                        } else if (j == 2) {
                            newStr += Math.cos(+(buf));
                        } else if (j == 3) {
                            newStr += Math.tan(+(buf));
                        }
                        positionEnd = k + 1;
                        break;
                    default:
                        break;
                }
                for (let i = positionEnd; i < str.length; i++) {
                    newStr += str[i];
                }
                str = newStr;
                newStr = '';
            }
        }
    }
    return eval(str);
}

function func(x) //Функция вычисления значения функции
{
    let func = document.querySelector('#input-expr').value;
    let position = func.indexOf('x');
    let newFunc = '';
    while (position != -1) {
        for (let i = 0; i < position; i++) {
            newFunc += func[i];
        }
        newFunc += x;
        for (let i = position + 1; i < func.length; i++) {
            newFunc += func[i];
        }
        func = newFunc;
        newFunc = '';
        position = func.indexOf('x');
    }
    return pow(func);
}

function polov_del() //Метод половинного деления
{
    console.log("Метод половинного деления: ");
    let c = 0,
        x = 0,
        i = 1;
    let tableRow = document.querySelector('#tab');
    let E = +(document.querySelector('#input-error').value);
    let a = +(document.querySelector('#start').value);
    let b = +(document.querySelector('#end').value);
    let a1 = a,
        b1 = b;
    while (Math.abs(b - a) > 2 * E) {
        c = (a + b) / 2;
        if (func(a) * func(c) <= 0) {
            b = c;
        } else if (func(b) * func(c) <= 0) {
            a = c;
        }
        i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + ((a + b) / 2) + '</td><td >' + func((a + b) / 2) + '</td></tr>';
    }
    x = (a + b) / 2;
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, b1, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.toggle('noDisplay');
    return;
}
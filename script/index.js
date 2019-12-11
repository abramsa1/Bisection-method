//document.querySelector('#solveBtn').addEventListener('click', kombin);

/* Выдвигающееся меню */
document.getElementsByClassName('menu-btn')[0].onclick = function () {
    document.querySelector('.menu').classList.toggle('menu-active');
}
var item = document.getElementsByClassName('menu-item');
for (var i = 0; i < item.length; i++)
    item[i].addEventListener('click', showMenu);

function showMenu() {
    if (this.children.length > 1) {
        this.children[1].classList.toggle('sub-menu-active');
    }
}

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
            data: [],
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
    for (let x = a - 2; x <= b + 2; x += 1) {
        chartData.datasets[1].data.push({
            'x': x,
            'y': func(x).toFixed(2)
        });
    }
    console.log(chartData.datasets[1].data);
    chartData.datasets[0].data[0] = {
        'x': x1,
        'y': func(x1).toFixed(2)
    };
    var options = {
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
            }]
        }
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    var solveChart = Chart.Scatter(ctx, {
        data: chartData,
        options: options
    });
}

function pow(str) {
    console.log('str = '+str);
    let position, newStr = '',
        positionEnd;
    let k, l, value = '',
        extent = '';
    let action = ['^', 'sin', 'cos', 'tan', 'log10'];

    for (let j = 0; j < action.length; j++) {
        position = 0;
        while (position != -1) {
            if (position == 0) {
                position--;
            }
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
                    case 4:
                        buf = '';
                        if (j == 4) {
                            k = position + 6;
                        } else {
                            k = position + 4;
                        }
                        for (; str[k] != ')'; k++) {
                            buf += str[k];
                        }
                        if (j == 1) {
                            newStr += Math.sin(+(buf));
                        } else if (j == 2) {
                            newStr += Math.cos(+(buf));
                        } else if (j == 3) {
                            newStr += Math.tan(+(buf));
                        } else if (j == 4) {
                            newStr += Math.log10(+(buf));
                            console.log('log10 = '+newStr);
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
    console.log('str = '+str);
    console.log('evalSTR = '+eval(str));
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
    console.log(func);
    return pow(func);
}

const tableRow = document.querySelector('#tab');
function polov_del() //Метод половинного деления
{
    let c = 0,
        x = 0,
        i = 1;
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
        else {
            document.querySelector('#out').innerHTML = 'Корней на указанном интервале нет!';
            return;
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

function hord() //Метод хорд
{
    let E = +(document.querySelector('#input-error').value);
    let a = +(document.querySelector('#start').value);
    let b = +(document.querySelector('#end').value);
	let c = 0, x = 0, i = 1, y, a1 = a, b1 = b;

	if (func(a) >= 0 && func(b) <= 0)
	{
		x = b;
		c = a;
		y = a;
	}
	else if (func(b) >= 0 && func(a) <= 0)
	{
		x = a;
		c = b;
		y = b;
	}
	else
	{
        document.querySelector('#out').innerHTML = 'Ошибка в вычислениях, выберите другой метод или измените интервал!';
        return;
	}
	while (Math.abs(x - c) >= E)
	{
		c = x;
		x = c - (y - c) * func(c) / (func(y) - func(c));
        i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + x + '</td><td >' + func(x) + '</td></tr>';
	}
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, b1, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.toggle('noDisplay');
    return;
}
function zol_sech() // Метод золотого сечения
{
    let E = +(document.querySelector('#input-error').value);
    let a = +(document.querySelector('#start').value);
    let b = +(document.querySelector('#end').value);
	let x, x1, x2, z = 1.618, i = 1, a1 = a, b1 = b;

	while (Math.abs(b - a) >= E)
	{
		x1 = b - (b - a) / z;
		x2 = a + (b - a) / z;
		if ((func(a) * func(x1) <= 0))
			b = x1;
		else if ((func(x1) * func(x2) <= 0))
		{
			a = x1;
			b = x2;
		}
		else
		{
			a = x2;
		}
        i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + a + '</td><td >' + func(a) + '</td></tr>';
	}
    x = a;
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, b1, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.toggle('noDisplay');
    return;
}
function sekuch() //Метод Секущих
{
    let E = +(document.querySelector('#input-error').value);
    let x0 = +(document.querySelector('#start').value);
	let x, a = 0, i = 1, a1 = a;
	x = x0 + E + 0.0001;
	while (Math.abs(x - x0) >= E)
	{
		a = x;
		x = x - func(x) * (x - x0) / (func(x) - func(x0));
		x0 = a;
		i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + x + '</td><td >' + func(x) + '</td></tr>';
	}
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, x+2, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.toggle('noDisplay');
    return;	
}
function diff(x) {
    let h = 0.01;//шаг дифференцирования
    return (func(x+h) - func(x - h)) / (2*h);//двусторонняя разность
}
function diff2(x) {
    let h = 0.01;//шаг дифференцирования
    return (func(x + h) - 2 * func(x) + func(x - h)) / (h * h);//двусторонняя разность
}
function nuton() //Метод Ньютона
{
    let E = +(document.querySelector('#input-error').value);
    let x = +(document.querySelector('#start').value);
	let a = 0, i = 1, a1 = x;
	while (Math.abs(x - a) >= E)
	{
		a = x;
		x = x - func(x) / diff(x);
        i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + x + '</td><td >' + func(x) + '</td></tr>';
	}
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, x+2, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.toggle('noDisplay');
    return;	
}
function kombin()  //функция комбинированного метода
{
    let E = +(document.querySelector('#input-error').value);
    let a = +(document.querySelector('#start').value);
    let b = +(document.querySelector('#end').value);
    let buf, x, a1 = a, b1 = b, i = 1;  // объявляем переменные
    
	if (func(b) * diff2(b) > 0)  //условие для выбора значений a и b
	{
		x = a;  //за 'а' обозначим конец отрезка  
		a = b;	//где знак функции и второй производной совпадает
		b = x;	//за b второй конец отрезка
	}
    let x1, x2
	while (Math.abs(a - b) > E) //цикл выполнения итераций
	{
		x2 = b - ((a - b) / (func(a) - func(b))) * func(b); //сужаем отрезок со стороны 'b' методом хорд
		x1 = a - func(a) / diff(a); //сужаем отрезок со стороны 'a' методом касательных
        i++; //плюсуем итерацию
		if (func(x1) > func(x2)) {
			a = x1;
        }
        else {
            b = x2;
        }
	}
    x = a; //находим 'x'
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, b1, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.add('noDisplay');
    return;	
}
function SimpleIter() //Метод простых итераций
{
    let E = +(document.querySelector('#input-error').value);
    let x = +(document.querySelector('#start').value);
	let i = 1, buf = x + 1, a1 = x;
	while (Math.abs(x - buf) >= E)
	{
		buf = x;
		switch (action) {
		case 1:
			x = sqrt(20 * sin(x));
			break;
		case 2:
			x = 1 - tan(2 * x);
			break;
		case 3:
			x = (5 * sin(x)) / (log10(x + 7));
			break;
		default:
			break;
		}
		if (!isdigit(x)) {
			cout << "Ошибка при вычислениях, попробуйте другой метод";
			return;
		}
        i++;
        tableRow.innerHTML += '<tr><td>' + i + '</td><td>' + x + '</td><td >' + func(x) + '</td></tr>';
	}
    document.querySelector('#outChart').style.display = 'none';
    document.querySelector('#myChart').style.display = 'block';
    Diagram(a1, x+3, x);
    document.querySelector('#out').innerHTML = 'x = ' + x + '<br>Число итераций = ' + i;
    document.querySelector('#tableBtn').classList.add('noDisplay');
    return;	
}
document.querySelector('#solveBtn').addEventListener('click', polov_del);

function pow(str) {
    let position = 0, newStr = '';
    while(position != -1) {
        position = str.indexOf('^', position+1);
        if(position+1) {
            for(let i = 0; i < position-1; i++) {
                newStr += str[i];
            }
            let value = Math.pow(str[position-1], str[position+1]);
            newStr += value;
            for(let i = position+2; i < str.length; i++) {
                newStr += str[i];
            }
            str = newStr;
            newStr = '';
        } 
    }
    console.log(eval(str));
    return eval(str);
}

function func(x)//Функция вычисления значения функции
{
    let func = document.querySelector('#input-expr').value;
    let position = func.indexOf('x');
    let newFunc = '';
    while(position != -1) {
        for(let i = 0; i < position; i++) {
            newFunc += func[i];
        }
        newFunc += x;
        for(let i = position+1; i < func.length; i++) {
            newFunc += func[i];
        }
        func = newFunc;
        newFunc = '';
        position = func.indexOf('x');
    }
    console.log('функция = '+func);
    return pow(func);
}


function polov_del() //Метод половинного деления
{
    console.log("Метод половинного деления: ");
    let action3 = 1;  ///////////////
    let c = 0, x = 0, i = 1; //a = 2, b = 3
    let E = +(document.querySelector('#input-error').value);
    let a = +(document.querySelector('#start').value);
    let b = +(document.querySelector('#end').value);

	while (Math.abs(b - a) > 2 * E)
	{
        console.log('test = '+func(b)*func(c));
        c = (a + b) / 2;
		//Определение области в которой находится корень
		if (func(a)*func(c) <= 0) {
            b = c;
        }
		else if (func(b)*func(c) <= 0) {
            a = c;
        }
        i++;
	}
    x = (a + b) / 2;
    document.querySelector('#out').innerHTML = 'x = '+x+'<br>Число итераций = '+i;
    console.log("x = "+x);
    console.log("Число итераций = "+i)
    return;
}
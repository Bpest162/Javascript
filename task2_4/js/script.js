class FormValidator{ //класс для валидации формы 
    constructor(form, fieldsValidators){ //метод, для создания и инициализации объектов, созданных, с помощью класса
        this.form = form //обьект (form)
        this.fieldsValidators = fieldsValidators //обьект (fieldsValidators) 
    }
    initialize() { //инициализация методов 
        this.validateOnSubmit(); //метод для навешивания событии на форму 
        this.validateOnChange();
    }

    validateFields = event => {
        event.preventDefault();
        const name = event.target.name; //получаем имя поля по таргету и присваиваем переменную 
        const value = event.target.value; //получаем значение введенное в поле по таргету и присваиваем переменную 
        const errorMessageElement = document.querySelector(`.errorMessage[data-error-message-for="${name}"]`) //получаем элемент по дата атрибуту с соответсвующим именем поля  
        
        
        const validators = this.fieldsValidators[name]; //получаем имя поля/экземпляры классов ввиде массивов в соответствии с полем и присваиваем в переменную

        

        for (let i = 0; i < validators.length; i++) { //проходим в цикле по переменной validators со значением массив(классы)
                
            const validator = validators[i] // получаем элементы массива и присваиваем переменную validator
            const isValid = validator.validate(value) //применяем к элементу массива метод аргументом (значение введенное в поле)
                    
            if(isValid === false){ //прописываем условия при котором если условие не соблюдается добавляем к полю класс error
                event.target.classList.add('input-error');
                event.target.classList.remove('input-success');
               
                errorMessageElement.innerHTML = validator.message(); //передаем занчение(ошибку message()) в эелемент(errorMessage) при возврате фолс в соответствии с выводимой ошибкой в поле
                //(event.target.parentElement.querySelector('.errorMessage').innerHTML = validator.message();) не подходит на OnSubmit
                break
            }
            else{ //в противном случае к полю добавляем класс success
                event.target.classList.add('input-success');
                event.target.classList.remove('input-error');

                errorMessageElement.innerHTML = ''; //в случаем отсутсвия ошибку передаем эелементу значение равное пустой строке 
                //(event.target.parentElement.querySelector('.errorMessage').innerHTML = '';) не подходит на OnSubmit
            }  
        }
    }
    validateOnSubmit() { //метод отвечает для навешивания события OnSubmit
        this.form.addEventListener('submit', this.validateFields)
    }
    validateOnChange() { //метод отвечает для навешивания события Onchange
        this.form.addEventListener('change', this.validateFields)
    }
}

class EmailValidator{ //класс для валидации email-а 
    constructor(){ //метод для инициализаци обьектов 
        this.emailRex = /\S+@\S+\.\S+/; //обект со значением регулярного выражения дл я проверки валидности email-а
    }
    validate(email){ //метод для проверки валидаций email-а
        if(typeof email !== 'string') return false; //условие в котором говорится, что если тип строки не является email  то возвращаем значение 'false'
        return this.emailRex.test(email); //используем оператор return для возврата данных после выполнения функции по обрабогтке регулярного выражения email
    }
    message(){
        return 'Please enter valid email address';
    }
}
class DateValidator{ //класс для валидации date(Даты)
    constructor(){ //метод для инициализаци обьектов 
        this.dateRegex = /^\d{4}-\d{2}-\d{2}$/; //обект со значением регулярного выражения для проверки валидности date
    }
    validate(date){ //метод для проверки валидаций даты
        if(typeof date !== 'sting') return false; //условие в котором говорится, что если тип строки не является date то возвращаем значение 'false'
        return this.dateRegex.test(date) && !isNaN(Date.parse(date)); //используем оператор return для возврата данных после выполнения функции по обрабогтке регулярного выражения date
    }
    message(){
        return 'Please enter valid date';
    }
}
class RequiredValidator { //класс для валидации обязательных полей 
    validate(value){ //метод для валидации занчения введенного в поле
        if(value == '')
        return  false;/* value !== undefined && value !== null !== ''; */ //используем оператор return для возврата данных после выполнения функции, функция выполняется в условиях когда, значение не равно неопределенному значению, не равно отсутствующему обьекту  или неравно пустой строке   
    }
    message(){
        return 'Field cannot be blank';
    }
}
class PasswordValidator { //класс для валидации пароля 
    constructor(){
        this.passwordRegex = /^[a-z0-9]{6,}$/; // обект со значением регулярного выражения для проверки пароля
    }
    validate(password){ //передаем параметром поле пароляв метод

        return this.passwordRegex.test(password) //используем оператор return для возврата данных после выполнения функции по обрабогтке регулярного выражения 
    }
    message(){
        return 'Password does not match';
    }
}

class EqualValueValidator { //класс для проверки повторного ввода пароля для проверки
    constructor(passwordField){
        this.passwordField = passwordField //обьект со значением элемент из DOM поле пароля
    }
    validate(value){ //передаем значение введенное в поле параметром 
        return value === this.passwordField.value; //используем оператор return для возврата данных после выполнения функции по обрабогтке правильности введенного занчения 
    }  
    message(){
        
        return 'Enter correct your confirm password';
    }
}


const  form = document.querySelector('.form'); //достаем форму по селектору класаа и присваиваем переменную 
const passwordField = document.querySelector('#password'); //достаем поле пароля 


const  fieldsValidators = { //создаем экземпляры классов(объект, содержащий данные и поведение, описанные классом) 
    firstname: [new RequiredValidator()],
    lastname: [new RequiredValidator()],
    email: [new RequiredValidator(), new EmailValidator()],
    password: [new RequiredValidator(), new PasswordValidator()],
    conPassword: [new EqualValueValidator(passwordField)] //передаем как параметр переменную поле пароля
};

const accountForm = new FormValidator(form,  fieldsValidators); //создаем экземпляр класса FormValidator в котором передаем аргументом форму и обьект с экземплярами классов 

accountForm.initialize(); //инициализация обьекта(экземпляр класса FormValidator)


//========================================================================================================//
const slider = document.getElementById('myRange');
const output = document.getElementById('value');

output.innerHTML = slider.value;

slider.oninput = function(){
    output.innerHTML = this.value + 'K';
};



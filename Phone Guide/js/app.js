const name = document.getElementById('name');
const surname = document.getElementById('surname');
const mail = document.getElementById('mail');
const info = document.querySelector(".info");
const form = document.querySelector('.btn');
const personList = document.querySelector('.person-list');

form.addEventListener("click", save);

const tumKisilerDizi=[];
//*****************************************************************************************

function save(e) {
    e.preventDefault();

    const person = {
        name: name.value,
        surname: surname.value,
        mail: mail.value
    }

    const durum = control(person);
    bilgiolustur(durum);
   addPerson(person);

}

const addPerson = (person) => {
    const trElement = document.createElement('tr');
    trElement.innerHTML =
        `<td>${person.name}</td>
        <td>${person.surname}</td>
        <td>${person.mail}</td>
        <td>  
        <button class="btn-edit"> <i class="bi bi-pencil-square"></i></button>
        <button class="btn-delete"><i class="bi bi-trash"></i></button> 
        </td>`;

    document.querySelector(".table").appendChild(trElement);
    tumKisilerDizi.push(person);
}

function control(person) {
    let result;
    for (let info in person) {
        result = !!person[info];
    }
    return result;
}

const bilgiolustur = (durum) => {

    const olusturulanBilgi = document.createElement('div')
    olusturulanBilgi.className = 'alert';

    if (durum) {
        olusturulanBilgi.classList.add('col-sm-6');
        olusturulanBilgi.textContent = "Kayıt Başarılı";
        olusturulanBilgi.classList.add('alert-success');
    } else {
        olusturulanBilgi.classList.add('col-sm-6');
        olusturulanBilgi.textContent = "Lütfen bütün alanları doldurunuz!";
        olusturulanBilgi.classList.add('alert-danger');
    }

    document.querySelector(".main-container").appendChild(olusturulanBilgi);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 2000)
    labelCleaner();
}
const labelCleaner = () => {

}
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const mail = document.getElementById('mail');
const info = document.querySelector(".info");
const form = document.querySelector('.btn');

form.addEventListener("click", save);

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


}

function control(person) {
    let result;
    for (let info in person) {
        if (person[info]) {
            result = true;
        } else {
            result = false;
        }
    }
    return result;
}

const bilgiolustur=(durum) => {

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
    setTimeout(function (){
        document.querySelector('.alert').remove();
    },2000)
}
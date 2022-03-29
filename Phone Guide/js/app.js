class person{
    constructor(name,surname,mail) {
        this.name=name;
        this.surname=surname;
        this.mail=mail;
    }
}

class UI{
    constructor() {
        this.name=document.getElementById('name');
        this.surname=document.getElementById('surname');
        this.mail=document.getElementById('mail');
        this.ekleGuncelleeButton=document.querySelector('.btn')
        this.depo=new Depo();
    }
}

class Depo {
    constructor() {
        this.tumKisiler=[];

    }
    verileriGetir(){
        let tumKisilerLocal;
        if (localStorage.getItem('tumKisiler')===null){
       tumKisilerLocal=[];
        }else {
            tumKisilerLocal=JSON.parse(localStorage.getItem('tumKisiler'));
        }
        this.tumKisiler=tumKisilerLocal;
    }

    kisiEkle(kisi){
        const tumKisilerLocal=JSON
    }
}
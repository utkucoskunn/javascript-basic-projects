class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}
class Util{
    static bosAlanKontrolEt(...alanlar){
    let sonuc=true;
    alanlar.forEach(alan=>{
        if(alan.length===0){
            sonuc=false;
            return false;
        }
    });
    return sonuc;
    }
}
class Ekran {
    constructor() {
        this.ad = document.getElementById('.ad')
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.btn')
        this.form = document.getElementById("form-rehber").addEventListener('submit', this.kaydetGuncelle);
        this.depo = new Depo();
    }

    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc=Util.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail)
        console.log(sonuc);


    }
}

class Depo {
    constructor() {
        this.tumKisiler = [];

    }

    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisilerLocal = [];
        } else {
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }
        this.tumKisiler = tumKisilerLocal;
        return tumKisilerLocal;
    }

    kisiEkle(kisi) {
        const tumKisilerLocal = this.kisileriGetir();
        tumKisilerLocal.push(kisi);
        localStorage.setItem('tumKisiler', JSON.stringify(tumKisilerLocal))
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ekran();
});

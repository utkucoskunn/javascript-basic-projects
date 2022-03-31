class Kisi {
    constructor(ad, soyad, mail) {
        this.ad= ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

//*********************************************************************************************************************
class Util {
    static bosAlanKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            console.log("kontrol")
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}

//*********************************************************************************************************************
class Ekran {
    constructor() {
       this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.btn')
        this.form = document.getElementById('form-rehber').addEventListener('submit',this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".person-list");
        this.depo = new Depo();
    }

    kisiyiEkranaEkle(kisi) {
        console.log("ekrana ekle")
        const olusturulanTr = document.createElement('tr');
        olusturulanTr.innerHTML =
            ` <tr>
                        <td>${kisi.ad}</td>
                        <td>${kisi.soyad}</td>
                        <td>${kisi.mail}</td>
                        <td>
                            <button class="btn-edit"><i class="bi bi-pencil-square"></i></button>
                            <button class="btn-delete"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>`;
        this.kisiListesi.appendChild(olusturulanTr);
    }


    kaydetGuncelle(e) {
        e.preventDefault();
        console.log(this)
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanKontrolEt( kisi.soyad, kisi.mail)
        if (sonuc) {
            console.log(kisi)
            this.kisiyiEkranaEkle(kisi);
            this.depo.kisiEkle(kisi);
        } else {
            console.log("buralar hep boş")
        }
    }
}

//*********************************************************************************************************************
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



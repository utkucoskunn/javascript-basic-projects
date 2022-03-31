//****CLASS************************************************************************************************************>
class Kisi {
    constructor(ad, soyad, mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;
    }
}

//****CLASS************************************************************************************************************>
class Util {
    static bosAlanKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach(alan => {
            if (alan.length === 0) {
                sonuc = false;
                return false;
            }
        });
        return sonuc;
    }
}

//*********************************************************************************************************************>
class Ekran {
    constructor() {
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.btn')
        this.form = document.getElementById('form-rehber').addEventListener('submit', this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".person-list");
        this.kisiListesi.addEventListener('click', this.guncelleVeyaSil.bind(this));
        this.depo = new Depo();
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdir();
    }

    //******METHOD******************************************************************************************************>
    guncelleVeyaSil(e) {
        const tiklanmaYeri = e.target;
        if (tiklanmaYeri.classList.contains('btn-delete')) {
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.kisiyiEkrandanSil();
        } else if (tiklanmaYeri.classList.contains('btn-edit')) {

        }
    }

    //******METHOD******************************************************************************************************>
    kisiyiEkrandanSil() {
        this.secilenSatir.remove();
        const silinecekMail = this.secilenSatir.cells[2].textContent;

        this.depo.kisiSil(silinecekMail);
        this.secilenSatir = undefined;
    }

    //******METHOD******************************************************************************************************>
    kisileriEkranaYazdir() {
        this.depo.tumKisiler.forEach(kisi =>
            this.kisiyiEkranaEkle(kisi));
    }

    //******METHOD*****************************************************************************************************>
    kisiyiEkranaEkle(kisi) {
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

    //******METHOD*****************************************************************************************************>
    kaydetGuncelle(e) {
        e.preventDefault();
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);
        const sonuc = Util.bosAlanKontrolEt(kisi.ad, kisi.soyad, kisi.mail)
        if (sonuc) {
            this.kisiyiEkranaEkle(kisi);
            this.depo.kisiEkle(kisi);
        } else {
            console.log("buralar hep boş")
        }
    }
    //******METHOD******************************************************************************************************>

    //******METHOD*****************************************************************************************************>

}

//*********************************************************************************************************************>
class Depo {
    constructor() {
        this.tumKisiler = this.kisileriGetir();

    }

    //******METHOD********************************************************************************************************>
    kisileriGetir() {
        let tumKisilerLocal;
        if (localStorage.getItem('tumKisiler') === null) {
            tumKisilerLocal = [];
        } else {
            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }

        return tumKisilerLocal;
    }

    //******METHOD********************************************************************************************************>
    kisiEkle(kisi) {
        this.tumKisiler.push(kisi);
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }

    kisiSil(mail) {
        this.tumKisiler.forEach((kisi, index) => {
            if (kisi.mail === mail) {
                this.tumKisiler.splice(index, 1);
            }
        });
        localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
    }


//******METHOD******************************************************************************************************>
kisiGuncelle(guncellenmisKisi, mail)
{
    this.tumKisiler.forEach(kisi, index => {
        if (kisi.mail === mail) {
            this.tumKisiler[index] = guncellenmisKisi;
        }
    })
    localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
}
}

//******METHOD********************************************************************************************************>
document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ekran();
});



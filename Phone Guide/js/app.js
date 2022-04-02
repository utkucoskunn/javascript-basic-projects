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

//*******CLASS**********************************************************************************************************>
class Ekran {
    constructor() {
        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');
        this.ekleGuncelleButton = document.querySelector('.btn')
        this.form = document.getElementById('form-rehber');
        this.form.addEventListener('submit', this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector(".person-list");
        this.kisiListesi.addEventListener('click', this.guncelleVeyaSil.bind(this));
        this.depo = new Depo();
        this.secilenSatir = undefined;
        this.kisileriEkranaYazdir();
    }

    //******METHOD******************************************************************************************************>
    bilgiOlustur(mesaj, durum) {
        const olusturulabBilgi = document.createElement('div');
        olusturulabBilgi.textContent = mesaj;
        olusturulabBilgi.className = 'bilgi';

        if (durum) {
            olusturulabBilgi.innerHTML = `<div class="alert alert-success mt-2 alert" role="alert">
  ${mesaj}
</div>`;
            document.getElementById('form-rehber').appendChild(olusturulabBilgi);
        } else {
            olusturulabBilgi.innerHTML = `<div class="alert alert-danger mt-2" role="alert">
  ${mesaj}
</div>`;
            document.getElementById('form-rehber').appendChild(olusturulabBilgi);
        }
        setTimeout(function () {
            olusturulabBilgi.remove();
        }, 2000)
    }

    //******METHOD******************************************************************************************************>
    guncelleVeyaSil(e) {
        const tiklanmaYeri = e.target;
        if (tiklanmaYeri.classList.contains('btn-delete')) {
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.kisiyiEkrandanSil();
            this.bilgiOlustur2("Kayıt başarılı bir şekilde silindi", true)
        } else if (tiklanmaYeri.classList.contains('btn-edit')) {
            this.secilenSatir = tiklanmaYeri.parentElement.parentElement;
            this.ad.value = this.secilenSatir.cells[0].textContent;
            this.soyad.value = this.secilenSatir.cells[1].textContent;
            this.mail.value = this.secilenSatir.cells[2].textContent;

        }
    }

    //******METHOD******************************************************************************************************>
    kisiyiEkrandanGuncelle(kisi) {

        const sonuc = this.depo.kisiGuncelle(kisi, this.secilenSatir.cells[2].textContent);
        if (sonuc) {
            this.secilenSatir.cells[0].textContent = kisi.ad;
            this.secilenSatir.cells[1].textContent = kisi.soyad;
            this.secilenSatir.cells[2].textContent = kisi.mail;
            this.bilgiOlustur2("Kayıt başarılı bir şekilde güncellendi", false);
            this.secilenSatir = undefined;
        } else {
            this.bilgiOlustur("Bu mail adresi başka bir kullanıcaya ait", false);
        }
    }

    //******METHOD******************************************************************************************************>
    bilgiOlustur2(mesaj, durum) {
        const olusturulanBilgi = document.createElement('div');
        olusturulanBilgi.textContent = mesaj;
        olusturulanBilgi.className = 'bilgi';

        if (durum) {
            olusturulanBilgi.innerHTML = `<div class="alert alert-danger mt-2 alert" role="alert">
  ${mesaj}
</div>`;
            document.getElementById('form-rehber').appendChild(olusturulanBilgi);
        } else {
            olusturulanBilgi.innerHTML = `<div class="alert alert-secondary mt-2" role="alert">
  ${mesaj}
</div>`;
            document.getElementById('form-rehber').appendChild(olusturulanBilgi);
        }
        setTimeout(function () {
            olusturulanBilgi.remove();
        }, 2000)
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
            if (this.secilenSatir) {
                this.kisiyiEkrandanGuncelle(kisi);
            } else {
                const sonuc = this.depo.kisiEkle(kisi);
                if (sonuc) {
                    this.kisiyiEkranaEkle(kisi);
                    this.bilgiOlustur("Kayıt başarı ile oluşturuldu", true);
                } else {
                    this.bilgiOlustur("Bu mail kullanımda!", false);
                }

            }
        } else {
            this.bilgiOlustur("Boş alanları doldurunuz!", false);
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
    emailEssizMi(mail) {
        const sonuc = this.tumKisiler.find(kisi => {
            return kisi.mail === mail;

        });
        if (sonuc) {
            return false;
        } else {
            return true;
        }
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
        if (this.emailEssizMi(kisi.mail)) {
            this.tumKisiler.push(kisi);
            localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
            return true;
        } else {
            return false;
        }
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
    kisiGuncelle(guncellenmisKisi, mail) {

        if (this.emailEssizMi(guncellenmisKisi.mail)) {
            this.tumKisiler.forEach((kisi, index) => {
                if (kisi.mail === mail) {
                    this.tumKisiler[index] = guncellenmisKisi;
                }
            })
            localStorage.setItem('tumKisiler', JSON.stringify(this.tumKisiler));
            return true;
        }else {
            return false;
        }
    }
}

//******METHOD********************************************************************************************************>
document.addEventListener('DOMContentLoaded', function (e) {
    const ekran = new Ekran();
});



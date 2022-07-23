// java işlemleri
//elementleri seçme(butonlar vs)

//obje oluşturarak diğer dosyalardan bilgi çekiyoruz.
const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")
const github = new Github()
const ui = new UI()

eventListeners()

function eventListeners(){
    githubForm.addEventListener("submit", getData)
    clearLastUsers.addEventListener("click", clearAllSearched) //click yapar basıldığında fonksiyonumuz çalışacak.
    document.addEventListener("DOMContentLoaded", getAllSearched)
}
function getData(e){
   let username = nameInput.value.trim()//trim= sağda solda boşluk bırakırsa bunu yok sayar.

   if(username === ""){//eğer boşluk bırakırsa
      alert("Lütfen geçerli bir kullanıcı adı giriniz.")

   }else{//eğer kullanıcı adı girerse 
      github.getGithubData(username)//getGithubData'ya username gönderdik ve proje async olduğunda promise ile yakalamamız gerekiyor.
      .then(response => {
        if(response.repo.message === "Not Found"){ // repo'dan veya user'den arraydan hatalı bir giriş olursa çıkan not found uyarısını konsola  yazdırmak için kullanıyoruz.
            //Hata mesajı
            //console.log("Hata")
            ui.showError("Kullanıcı Bulunamadı") //ui'dan show fonksiyonunu çağırıp yazıyı ekrana yazdıracağız.
        } else { //kullanıcı adı düzgün girilirse ui'daki bilgiler buradan ekrana yazılacak.
            //console.log(response)
            ui.addSearchedUserUI(username) // geçmiş arananları ui arayüzüne ekledik. 
            //Storage'den önce çağırmamız gerekiyor, yoksa hata alırız. çünkü daha önce test edip eklenirse ve o username daha önce konsola eklenirse arayüze işlenmez.
            Storage.addSearchedUserToStorage(username) // storage'den arananları konsola ekledik. yukarı kod satırındada ui'de arayüze ekleyeceğiz.
            ui.showUserInfo(response.user)//ui'dan show fonksiyonunu çağırıp response yazdır dedik ve user bilgileri çağırdık.
            ui.showRepoInfo(response.repo)//ui'dan show fonksiyonunu çağırıp geçmiş aramalarımızda ki repoları altta yazdıracağız.
        }
      })//promistede bir hata olursa diye catch'de ekleyelim.
      .catch(err => ui.showError(err))
   }
   //her arama yaptığımızda kullanıcı adı bölümü temizlenecek
   ui.clearInput()
   //sayfanın yenilenmesini engellemek
   e.preventDefault()
}
function clearAllSearched(){
    //tüm arananları temizle
    if(confirm("Emin misiniz?")){//bir confirm oluşturup basınca bir soru sorduk.
       Storage.clearAllSearhedUsersFromStorage() //storagedan temizleyecek.
       //şimdi de  arayüzden temizleyeceğiz.
       ui.clearAllSearchedFromUI()
    }
}
function getAllSearched(){
    //arananları storageden al ve Uiye ekle
    // sen silmeden sayfada arananlar silinmeyecek sayfa yenilense dahi.
    let = result = "" //boş bir string oluşturduk.
    let users = Storage.getSearchedUsersFromStorage()
    //aldık arrayı artık içinde  her bir useri almak için gezebiliriz.
    users.forEach(user => {
    // 
    //şimdi result'a sürekli olarak += ile bu lileri ekleyeceğiz.
    result += `<li class="list-group-item">${user}</li>
    
    `
    
    }) //daha sonra bunları lastuser'sa yazacağız.

    lastUsers.innerHTML = result;

}


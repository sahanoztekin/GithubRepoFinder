// sadece arayüz.

class UI{
    constructor(){ //div'leri ve ul'le etiketlerini seçeceğiz.
       this.profileDiv = document.getElementById("profile")
       this.repoDiv = document.getElementById("repos")
       this.lastUsers = document.getElementById("last-users")
       this.inputField = document.getElementById("githubname")
       this.cardBody = document.querySelector(".card-body")
    }
    
    clearInput(){//burada kullanıcı adı yazdığımız input alanını temizleyeceğiz.
       this.inputField.value = ""

    }
    
    showUserInfo(user){ //app.js'ye  user bilgileri göndereceğiz.
        //json'dan alınan kullanıcı bilgileri burada görünecek.
        //user etiketi ile konsolda ki array bilgilerini bunlara işleyeceğiz. img'ye avatar eklemek gibi.
        this.profileDiv.innerHTML = ` 
        
        <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4">
            <a href="${user.html_url}" target = "_blank">
             <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
             <hr>
             <div id="fullName"><strong>${user.name}</strong></div>
             <hr>
             <div id="bio">${user.bio}</div>
            </div>
          <div class="col-md-8">
                <button class="btn btn-secondary">
                      Takipçi  <span class="badge badge-light">${user.followers}</span>
                </button>
                <button class="btn btn-info">
                     Takip Edilen  <span class="badge badge-light">${user.following}</span>
                  </button>
                <button class="btn btn-danger">
                    Repolar  <span class="badge badge-light">${user.public_repos}</span>
                </button>
                <hr>
                <li class="list-group">
                    <li class="list-group-item borderzero">
                        <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                        
                    </li>
                    <li class="list-group-item borderzero">
                        <img src="images/mail.png" width="30px"> <span id="mail">${user.email}</span>
                        
                    </li>
                    
                </div>
                   
                
          </div>
    </div>

        `
    }

    showError(message){ //hata mesajını konsoldan ekrana yazdıracak.
        const div = document.createElement("div") //dinamik oluşturduk.
        //daha sonra classname'i vereceğiz.
        div.className = "alert alert-danger"
        //daha sonra bize gönderilen mesajı belirteceğiz.
        div.textContent = message
        
        this.cardBody.appendChild(div)//seçilen cardbodynin en sonuna ekleyeceğiz.
        //daha sonra bu uyarının kalkması gerekiyor. bunun içinse bir settime kuracağız.
        setTimeout(() => {
             div.remove()
        },2000)

    }

    showRepoInfo(repos){
        this.repoDiv.innerHTML = "" //kullanıcı sorgulanmışsa ilk başta repo bilgileri sıfırlanmasını sağlıyor.

        repos.forEach(repos => { // bize gönderilen array üzerinde gezeceğiz.
        //repodiv innerhtml'ine += yaparak her seferinde üzerine eklensin diye yazıyor.
          this.repoDiv.innerHTML += ` 
            <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <a href="${repos.html_url}" target = "_blank" id = "repoName">${repos.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar  <span class="badge badge-light" id="repoStar">${repos.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forklar  <span class="badge badge-light" id ="repoFork">${repos.forks_count}</span>
                            </button>
                    
                        </div>
                </div>

                </div> 
          `

        })

    }

    addSearchedUserUI(username){ //geçmiş arananları ekrana ekleme işlemi yapacağız.
        let users = Storage.getSearchedUsersFromStorage() //stroge.js'den bu fonksiyonu çektik.
    //neden ki bu arrayi aldık? = çünkü buradada sorgu yapmamız gerekiyor. tekrardan stroge da varsa tekrardan arayüze eklememek için.
        if(users.indexOf(username)=== -1){//-1 yaptıktı daha önceden yoksa ekle demek için.
            //index.html'deki ul içerisinde ekleyeceğimiz li elementi oluşturacağız.
            // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
            const li = document.createElement("li") //li adında bir element oluşturdum.
            li.className = "list-group-item" //class ismi verdim.
            li.textContent = username //text ile içerisine username yazılacak bilgisi verdim.
            
            this.lastUsers.appendChild(li) //burada oluşturduğum li'yi çocuk misali lastusers'e ekledim.
        }

    }

    clearAllSearchedFromUI(){ //biz burada ul içerisinde olan tüm lileri silmeyece çalışacağız. yani çocuklarını.
     while(this.lastUsers.firstElementChild !== null){ //child var olmaya devam ediyorsa biz sürekli bunu siliyoruz demektir
         this.lastUsers.removeChild(this.lastUsers.firstElementChild)
                                   //hangi child'i sileceğimizi seçiyoruz.

    /* diyelim 3 çocuğumuz var.
       1. çocuğumuzda !== tarafı   null gelmeyecek ve true gelerek sağlanmış olacak.
       ve biz removeChild diyerek ilk çocuğu kaldırmış olacağız.
       sonra while sürekli döngüyü tekrarlayacağı için 2. ve 3.e dönüp aynı işlemi yapacak.
       null yani çocuk kalmadığındada ! sayesinde duracak.

     */                            
  
     } 
    }
    
}
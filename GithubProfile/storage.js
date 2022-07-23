// sadece veri depolama işlemleri olacak

class Storage {
      
    static getSearchedUsersFromStorage(){
        //storageden bilgileri almaya çalışacağız. yani tüm kullanıcıları al.
        //daha önceden yapıldığı gibi bir array oluşturulacak.
        let users; // bu array storagede oluştuysa bir tane key ile alacağız ancak yoksa boş oluşacak.
        if (localStorage.getItem("searched")=== null) { 
        //searched diye bir key  aldık array içerisinden ve eğer ki karşılığına null geliyorsa daha önceden veri yok demektir.
        //veri gelmediği için boş bir array oluşturacağız.
            users = []
        } else {
        //bu seferde searched  keyinin karşısına bir değer geliryorsa onu almaya çalışacağız.
            users = JSON.parse(localStorage.getItem("searched")) // localstorage de string olarak yazıldığından biz bunu arraya çevirmek istediğimizden json ile parse ediyoruz.
        }
        //aldıktan sonra arrayı usersi return olarak döneceğiz.
        return users

    }
    static addSearchedUserToStorage(username){//fonksiyona aslında bir username gönderiyoruz.
        //sorgulanmış kullanıcıyı geçmişe ekleyeceğiz ama daha önce aratılmışsa  iki kez eklemeyeceğiz.
        let users = this.getSearchedUsersFromStorage() // this yerine storage de kullanabiliriz ama this bu olduğu classı veya fonksiyonu gösterdiğinden getsearch içinde ki metotu kullanmış oluyoruz.
        //şimdide username'in users içerisinde kullanıp kullanmasıdığı görmek için IndexOf kullanacağız.
        //eğer -1 karlışık gelirse bu username users içeresinde yok demektir.
        if(users.indexOf(username) === -1){ //yani -1 dediğinden içerde o user yoktur böylece rahatlıkta geçmişe ekleyebiliriz.
           users.push(username)
        } //else hiç gerek yok, farklı bir durum içinde bulunursa eklenmeyecek zaten. sadece -1 olduğunda eklenecek.
        //şimdi değeri güncellememiz gerekiyor. 
        localStorage.setItem("searched", JSON.stringify(users))
    
    }
    static clearAllSearhedUsersFromStorage(){
        //geçmişi sileceğiz. 
        localStorage.removeItem("searched") //searched keyi adı altında arananları silecek. yani geçmişi.
    }

}
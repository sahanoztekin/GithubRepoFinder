// sadece gitte ki get request işlemleri gerçekleştirelecek.


class Github{

    constructor(){
        this.url = "https://api.github.com/users/"
    }

    async getGithubData(username){//nameInput'tan aldık bilgileri.
        const responseUser = await fetch(this.url + username)
        const responseRepo = await fetch(this.url + username + "/repos")

        const userData = await responseUser.json()
        const repoData = await responseRepo.json()

        return{ //object olarak return ettik ki user ve repo şeklinde görelim.
            user:userData,
            repo:repoData
        }

    }

}
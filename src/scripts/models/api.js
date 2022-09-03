export class ApiRequest {

    static baseUrl = 'https://m2-rede-social.herokuapp.com/api'
    static token = localStorage.getItem('@redeSocial:token') || ''
    static headers = {
        'Content-Type':'application/json',
        Authorization: `Token ${this.token}`
    }

    static async userLogin(body){

        const result = await fetch(`${this.baseUrl}/users/login/`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => {

            if(response?.email?.length > 0 || response?.password?.length > 0 || response?.non_field_errors){
                let btnModal = document.getElementById('btnModal')
                let modalLogin = document.getElementById('modalLogin')
                modalLogin.style.display = 'flex'
    
                window.onclick = (event) => {
                    if(event.target == modalLogin || event.target == btnModal){
                        modalLogin.style.display = 'none'
                    }
                }
                return
            }

            localStorage.setItem('@redeSocial:token', response.token)
            localStorage.setItem('@redeSocial:user_uuid', response.user_uuid)

            window.location.replace('./src/pages/home.html')
            return response
        })
        .catch((err) => {
            return err
        })
        return result
    }


    static async newUser(body){

        const result = await fetch(`${this.baseUrl}/users/`,{
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(response => {
            window.location.assign('../../index.html')
            return response
        })
        .catch((err) => console.log(err))

        return result
    }


}

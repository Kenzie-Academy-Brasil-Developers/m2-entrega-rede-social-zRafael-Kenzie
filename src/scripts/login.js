import { ApiRequest } from "../scripts/models/api.js";

export class LoginPage {
    static async loginUser(){
        const loginInput = document.getElementById('email')
        const passInput = document.getElementById('password')
    
        document.getElementById('btnLogar').addEventListener('click', (event) => {
            event.preventDefault()
    
            const data = {

                'email': loginInput.value,
                'password': passInput.value
            }
            loginInput.value = ''
            passInput.value = ''
            ApiRequest.userLogin(data)
        })
    
    }

    static changePage() {
        const btnPagSignUp = document.querySelector('.btn-secundario')

        document.querySelector('.registro').addEventListener('click', () => {
            window.location.replace('./src/pages/register.html')
        })

        btnPagSignUp.addEventListener('click', () => {
            console.log('oi')
            window.location.replace('./src/pages/register.html')
        })
    }
}
LoginPage.loginUser()
LoginPage.changePage()
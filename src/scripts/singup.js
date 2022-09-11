import { ApiRequests } from "../scripts/models/api.js";

class RegisterPage {

    static async createUser(){

        const nome = document.getElementById('nome')
        const email = document.getElementById('email')
        const password = document.getElementById('password')
        const profissao = document.getElementById('profissao')
        const urlImg = document.getElementById('urlImg')

        const btnCadastrar = document.getElementById('btnCadastrar').addEventListener('click', async (event) => {
            event.preventDefault()

            const data = {
                'username': nome.value,
                'email': email.value,
                'password': password.value,
                'work_at': profissao.value,
                'image': urlImg.value
            }
            await ApiRequests.cadastroUser(data)
        })
    }

    static changePage(){
        document.querySelector('.login').addEventListener('click', () => {
            window.location.replace('../../index.html')
        })

        document.querySelector('.btn-secundario').addEventListener('click', () => {
            window.location.replace('../../index.html')
        })
    }
}
RegisterPage.createUser()
RegisterPage.changePage()
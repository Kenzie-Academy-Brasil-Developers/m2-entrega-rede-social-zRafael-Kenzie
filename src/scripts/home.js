import { ApiRequests } from "../scripts/models/api.js";

class HomePage {
    static id = localStorage.getItem('@redeSocial:user_uuid')
    static token = localStorage.getItem("@redeSocial:token")
    static followersGroup = [];

    static async sugestions() {
    const ul = document.querySelector(".list");
    const users = await ApiRequests.sugestionsUsers(this.token);

    for (let i = 0; i < 3; i++) {
      let random = Math.random() * (users.results.length - 10) + 1;
      let user = users.results[random.toFixed(0)];
           
      const li = document.createElement('li')
      li.setAttribute("id", user.uuid); 
      const figure = document.createElement('figure')
      const img = document.createElement('img')
      const div = document.createElement('div')
      const p = document.createElement('h3')
      const span = document.createElement('p')
      const btnFollow = document.createElement('btnFollow')

      li.classList.add('card_sugestao')
      div.classList.add('edit_card')
      btnFollow.classList.add('btnFollow')

      btnFollow.id = "follow";
      btnFollow.innerText = "Seguir";
      img.src = user.image;
      p.innerText = user.username;
      span.innerText = user.work_at;


      btnFollow.addEventListener("click", async (e) => {
        e.preventDefault()
        btnFollow.classList.toggle('btnUnfollow')
            btnFollow.classList.toggle('btnFollow')

        const body = {
          following_users_uuid: li.id,
        };
    
        if (btnFollow.classList == "btnUnfollow") {
            btnFollow.innerText = 'seguindo'
            const resFollow = await ApiRequests.followUsers(this.token, body);
        } else {
            btnFollow.innerText = 'Seguir'
            this.unfollowUser()

        }
      });

      figure.appendChild(img)
        div.append(p, span)
        li.append(figure, div, btnFollow)
        ul.appendChild(li)
    }
  }


    static logout(){
        document.querySelector('.sair').addEventListener('click', () => {
            localStorage.removeItem('@redeSocial:token')
            localStorage.removeItem('@redeSocial:user_uuid')

            window.location.replace('../../index.html')
        })
    }

    static async getPosts(){
        const posts = await ApiRequests.countPosts(this.token)
        let count = posts.count
        const array = await ApiRequests.getAllPostsUser(this.token,count)
        const result = array.results
        result.reverse().forEach(element => {
            this.renderPosts(element)
        })
    }

    static async renderPosts(array){
        const listPost = document.getElementById('listPost')

        const li = document.createElement('li')
        const divHeader = document.createElement('div')
        const img = document.createElement('img')
        const divInfo = document.createElement('div')
        const name = document.createElement('h3')
        const work = document.createElement('p')
        const divBody = document.createElement('div')
        const contentTitle = document.createElement('h2')
        const content = document.createElement('p')
        const divBtn = document.createElement('div')
        const btnOpen = document.createElement('btnFollow')
        const newDiv = document.createElement('div')
        const btnFollowLike = document.createElement("img");
        const btnFollowDeslike = document.createElement("img");
        const numLikes = document.createElement('span')

        img.src = array.author.image
        name.innerText = array.author.username
        work.innerText = array.author.work_at
        contentTitle.innerText = array.title
        content.innerText = array.description
        btnOpen.innerText = 'Abrir Post'
        numLikes.innerText = array.likes.length
        btnFollowLike.src = '../assets/heartBlack.png'
        btnFollowDeslike.src = '../assets/heartRed.png'

        li.classList.add('cards_posts')
        divHeader.classList.add('header_card')
        divInfo.classList.add('info_card')
        divBody.classList.add('body_post')
        divBtn.classList.add('btn_card')
        btnOpen.classList.add('btnOpenPost')

        newDiv.className = "like";
        btnFollowDeslike.className = "btnHidden";


        btnOpen.addEventListener('click', (event) => {
            this.createModal(array)
        })

        const modalPost = document.querySelector('.modalPost')
        btnOpen.addEventListener('click', () => {
            modalPost.style.display = 'flex'
        })

        const closeModal = document.getElementById('closeModal')
        closeModal.addEventListener('click', () => {
            modalPost.style.display = 'none'
        })

        btnFollowLike.addEventListener('click', async () => {

            btnFollowDeslike.classList.toggle("btnHidden");
            btnFollowLike.classList.toggle("btnHidden");    
            numLikes.innerText = array.likes.length + 1

            let idResult = {
                'post_uuid': array.uuid
            }
            
            await ApiRequests.likePost(this.token,idResult)
        })

        btnFollowDeslike.addEventListener("click", () => {
            let newId = array.likes

            btnFollowDeslike.classList.toggle("btnHidden");
            btnFollowLike.classList.toggle("btnHidden");
            numLikes.innerText = array.likes.length;
    
            ApiRequests.dislikePost(this.token,newId)
        });


        newDiv.append(btnFollowLike, btnFollowDeslike)
        divInfo.append(name, work)
        divHeader.append(img, divInfo)
        divBody.append(contentTitle, content)
        divBtn.append(btnOpen, newDiv, numLikes)
        li.append(divHeader, divBody, divBtn)
        listPost.appendChild(li)
    }

    static async createModal(array){
        const modalIgm = document.getElementById('modalIgm')
        const nameModal = document.getElementById('nameModal')
        const workModal = document.getElementById('workModal')
        const titleModal = document.getElementById('titleModal')
        const contentModal = document.getElementById('contentModal')

        modalIgm.src = array.author.image
        nameModal.innerText = array.author.username
        workModal.innerText = array.author.work_at
        titleModal.innerText = array.title
        contentModal.innerText = array.description

    }

    static async createNewPost(){
        const inputTitle = document.getElementById('postTitulo')
        const inputContent = document.getElementById('postContent')
        const btnPost = document.getElementById('btnPost')

        btnPost.addEventListener('click', async (event) => {
            event.preventDefault()

            const newData = {
                'title':inputTitle.value,
                'description': inputContent.value
            }
            
            await ApiRequests.newPost(newData,this.token)
            window.location.reload()
        })
    }

    static async renderUser(){
        const imgUser = document.getElementById('imgUser')
        const nameUser = document.getElementById('nameUser')
        const workUser = document.getElementById('workUser')
        const followUser = document.getElementById('followUser')

        const user = await ApiRequests.getUserInfo(this.id,this.token)
        
        imgUser.src = user.image
        nameUser.innerText = user.username
        workUser.innerText = user.work_at
        followUser.innerText = `${user.followers_amount} seguidores`
    }

    static async unfollowUser(){
        const array = await ApiRequests.getUser(this.token)
        const result = array.results
        let returnId;

        for(let i = 0; i < result.length; i++){
            if(result[i].following.length != 0){
                returnId = result[i].following[0].uuid
            }
        }
        ApiRequests.unfollow(this.token,returnId)
    }
}



HomePage.sugestions()
HomePage.logout()
HomePage.getPosts()
HomePage.createNewPost()
HomePage.renderUser()


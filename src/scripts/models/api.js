export class ApiRequests {

    static async cadastroUser(body) {
        const resposta = await fetch(
            `https://m2-rede-social.herokuapp.com/api/users/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        )
            .then(res => res.json())
            .then(res => {
                window.location.replace('../../index.html')
                return res
            })
            .catch(err => console.log(err));
        return resposta;
    }

    static async loginUser(body) {
        const login = await fetch(
            "https://m2-rede-social.herokuapp.com/api/users/login/",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body),
            }
        )
            .then((res) => {
                if (res.status >= 400) {
                    let btnModal = document.getElementById('btnModal')
                    let modalLogin = document.getElementById('modalLogin')
                    modalLogin.style.display = 'flex'

                    window.onclick = (event) => {
                        if (event.target == modalLogin || event.target == btnModal) {
                            modalLogin.style.display = 'none'
                        }
                    }

                } else {
                    return res.json();
                }
            })
            .then((res) => {
                localStorage.setItem("@redeSocial:token", res.token);
                localStorage.setItem("@redeSocial:user_uuid", res.user_uuid);
                window.location.assign("/src/pages/home.html");
            })
            .catch((err) => console.log(err));
        return login;
    }

    static async getUserInfo(userId, token) {
        const user = await fetch(
            `https://m2-rede-social.herokuapp.com/api/users/${userId}/`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => res);
        return user;
    }

    static async newPost(body, token) {
        const post = await fetch(
            `https://m2-rede-social.herokuapp.com/api/posts/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((res) => console.log(res));
        return post;
    }

    static async countPosts(token) {
        const totalPosts = await fetch(
            "https://m2-rede-social.herokuapp.com/api/posts/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        ).then((res) => res.json());
        return totalPosts;
    }

    static async getAllPostsUser(token, coun) {
        const allPosts = await fetch(
            `https://m2-rede-social.herokuapp.com/api/posts/?limit=10&offset=${coun - 10
            }`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => res);
        return allPosts;
    }

    static async getUser(token) {

        const result = await fetch(`https://m2-rede-social.herokuapp.com/api/users/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
        })
            .then(response => response.json())
            .catch(err => console.log(err))

        return result
    }

    static async sugestionsUsers(token) {
        const resposta = await fetch(
            `https://m2-rede-social.herokuapp.com/api/users/?limit=1243&offset=1`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((res) => res.json())
            .then((res) => res);
        return resposta;
    }

    static async followUsers(token, body) {
        const res = await fetch(
            `https://m2-rede-social.herokuapp.com/api/users/follow/`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(body)
            }
        )
            .then((res) => res.json())
            .then((res) => res)

        return res
    }

    static async unfollow(token, id) {
        const res = await fetch(`https://m2-rede-social.herokuapp.com/api/users/unfollow/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
            .then(res => console.log(res))
        return res
    }

    static async likePost(token, body) {
        const res = await fetch("https://m2-rede-social.herokuapp.com/api/likes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(body)
        })
        return res
    }

    static async dislikePost(token, id) {
        const res = await fetch(`https://m2-rede-social.herokuapp.com/api/likes/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            }
        })
        return res
    }
}
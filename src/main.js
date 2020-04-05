import api from './api'

class App {
    constructor() {
        this.repositories = []

        this.formElement = document.getElementById('repository-form')
        this.inputElement = document.querySelector('input[name=repository]')
        this.listElement = document.getElementById('repository-list')

        this.registerHandlers()

    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event)
    }

    setLoading(loading = true) {
        if (loading === true) {
            let brElement = document.createElement('br')
            let loadingElement = document.createElement('span')
            loadingElement.appendChild(brElement)
            loadingElement.appendChild(document.createTextNode(" Loading... "))
            loadingElement.setAttribute('id', 'loading')

            this.formElement.appendChild(loadingElement)
        } else {
            document.getElementById('loading').remove()
        }

    }

    async addRepository(event) {
        event.preventDefault()

        this.setLoading()

        const repositoryImput = this.inputElement.value

        if (repositoryImput.length === 0)
            return

        try {
            const response = await api.get(`/users/${repositoryImput}`)

            const { name, repos_url, html_url, avatar_url, public_repos, followers, following, location } = response.data

            this.repositories.push({
                name,
                repos_url,
                avatar_url,
                html_url,
                public_repos,
                followers,
                following,
                location,
            })

            this.render()
        } catch (err) {
            alert('The user does not exist.')
        }
        this.setLoading(false)

    }

    render() {
        this.listElement.innerHTML = ""

        this.repositories.forEach(repository => {
            let imgElement = document.createElement('img')
            imgElement.setAttribute('src', repository.avatar_url)

            let titleElement = document.createElement('strong')
            titleElement.appendChild(document.createTextNode(repository.name + " "))

            let public_reposElement = document.createElement('p')
            public_reposElement.appendChild(document.createTextNode('Public Repository - ' + repository.public_repos))

            let followersElement = document.createElement('p')
            followersElement.appendChild(document.createTextNode('Followers - ' + repository.followers))

            let followingElement = document.createElement('p')
            followingElement.appendChild(document.createTextNode('Folowing - ' + repository.following))

            let locationElement = document.createElement('p')
            locationElement.appendChild(document.createTextNode('Localidade - ' + repository.location))

            let linkElement = document.createElement('a')
            linkElement.setAttribute('href', repository.html_url)
            linkElement.setAttribute('target', '_blank')
            linkElement.appendChild(document.createTextNode('View Profile'))

            let listLiElement = document.createElement('li')
            listLiElement.appendChild(imgElement)
            listLiElement.appendChild(titleElement)
            listLiElement.appendChild(linkElement)
            listLiElement.appendChild(public_reposElement)
            listLiElement.appendChild(followersElement)
            listLiElement.appendChild(followingElement)
            listLiElement.appendChild(locationElement)

            this.listElement.appendChild(listLiElement)

        })
    }
}

new App()
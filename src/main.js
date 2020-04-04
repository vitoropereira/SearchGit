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

    async addRepository(event) {
        event.preventDefault()

        const repositoryImput = this.inputElement.value

        if (repositoryImput.length === 0)
            return

        const response = await api.get(`/users/${repositoryImput}`)

        const { name, description, html_url, avatar_url } = response.data

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        })

        this.render()
    }

    render() {
        this.listElement.innerHTML = ""

        this.repositories.forEach(repository => {
            let imgElement = document.createElement('img')
            imgElement.setAttribute('src', repository.avatar_url)

            let titleElement = document.createElement('strong')
            titleElement.appendChild(document.createTextNode(repository.name))

            let descriptionElement = document.createElement('p')
            descriptionElement.appendChild(document.createTextNode(repository.description))

            let linkElement = document.createElement('a')
            linkElement.setAttribute('target', '_blank')
            linkElement.setAttribute('src', repository.html_url)
            linkElement.appendChild(document.createTextNode('Acessar'))

            let listLiElement = document.createElement('li')
            listLiElement.appendChild(imgElement)
            listLiElement.appendChild(titleElement)
            listLiElement.appendChild(descriptionElement)
            listLiElement.appendChild(linkElement)

            this.listElement.appendChild(listLiElement)

        })
    }
}

new App()
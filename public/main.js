const domMovieList = document.querySelector("ul.movie-list")
const domFormAdicionar = document.querySelector("form.form-adicionar")
const sendButton = domFormAdicionar.querySelector("button")

// ---✀------------------------------------------------------------------

	console.log("page reloaded")
    async function listarTodosOsFilmes() {
      const response = await fetch("/movies")
      const movies = await response.json()
      domMovieList.innerHTML = ""
      movies.forEach(movie => {
        domMovieList.innerHTML += `  
          <li>
            <div>
              <strong>title:</strong> ${movie.title}
            </div>
            <ul>
              <li>
                <strong>source:</strong> ${movie.source}
              </li>
              <li>
              <strong>description:</strong> ${movie.description}
              </li>
              <li>
              <li>
                <strong>thumb:</strong> ${movie.thumb}
              </li>
                <button class="delete-button" data-id="${movie.id}">excluir</button>
                <button class="alterar-button" data-id="${movie.id}">alterar</button>
              </li>
            </ul>
          </li>
        `
      });
    }

    listarTodosOsFilmes()

    // ---✀------------------------------------------------------------------

    domFormAdicionar.addEventListener("submit", async ev => {
      ev.preventDefault()
      ev.stopPropagation()
      ev.stopImmediatePropagation()

      const body = JSON.stringify({
        title: domFormAdicionar.title.value,
        source: domFormAdicionar.source.value,
        description: domFormAdicionar.description.value,
        thumb: domFormAdicionar.thumb.value,
      })

      if (sendButton.dataset.id) {
        console.log("botao alterar")
        const response = await fetch(`/movies?id=${sendButton.dataset.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body
        })
        sendButton.removeAttribute("data-id")
        // sendButton.innerText = "Enviar"
        domFormAdicionar.reset()
        sendButton.innerText = "Enviar"
        listarTodosOsFilmes()
        return
      }

      const response = await fetch("/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      })
      
      const result = await response.json()
      domFormAdicionar.reset()

      listarTodosOsFilmes()
    })

    domMovieList.addEventListener("click", async ev => {
      if (ev.target.classList.contains("delete-button")) {
        const response = await fetch(`/movies?id=${ev.target.dataset.id}`, {method: "DELETE"})
        // const movies = await response.json()
        listarTodosOsFilmes()
        return
      }

      if (ev.target.classList.contains("alterar-button")) {
        console.log(ev.target.dataset.id)
        const idResponse = await fetch(`/movies?id=${ev.target.dataset.id}`, {method: "GET"})
        const movieData = await idResponse.json()
        // const response = await fetch(`/movies?id=${ev.target.dataset.id}`, {method: "PUT"})
        // console.log(await response.json())
        console.log(domFormAdicionar.title.value)
        
        domFormAdicionar.title.value = movieData.title
        domFormAdicionar.source.value = movieData.source
        domFormAdicionar.description.value = movieData.description
        domFormAdicionar.thumb.value = movieData.thumb

        console.log(sendButton)
        sendButton.innerText = "Alterar"
        sendButton.dataset.id = movieData.id
        
        console.log("Did not fetch")
        console.log(ev.target.dataset.id)

        listarTodosOsFilmes()
        return
      }
    })

      
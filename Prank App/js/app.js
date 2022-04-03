class Ekran {
    constructor() {
        this.getJokeBtn = document.querySelector('.get-joke-btn')
            .addEventListener('click', () => this.getJoke());
    }

    async getJoke() {
        const randomPicture = await new UnsplashApi().randomGetPhoto();
        const randomJoke = await new Jokeapi().randomGetJoke();
        const allResult={
            randomPicture,
            randomJoke
        }

        this.printScreen(allResult)
    }
    printScreen(allResult){
        document.querySelector('.result').innerHTML=
            `  <div class="card mb-3 justify-content-center" style="max-width: 1000px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${allResult.randomPicture}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Just Smile</h5>
                            <p class="card-text">${allResult.randomJoke}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>`;
    }
}




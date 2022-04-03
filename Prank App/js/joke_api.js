class Jokeapi {
    constructor() {
        this.baseURL = 'https://api.chucknorris.io';
        this.axiosObject = axios.create({
            baseURL: this.baseURL
        });
    }

    async randomGetJoke() {
        try {
            const jokeResponse = await this.axiosObject.get('/jokes/random');
            return jokeResponse.data.value;
        }catch (error){
            console.error(error);
        }
    }
}




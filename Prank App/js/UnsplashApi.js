class UnsplashApi {
    constructor() {
        this.baseURL = 'https://api.unsplash.com';
        this.clientID= 'Client-ID BWFDXsIjCHQrnyzB9sRvQkh-JMRItrNnBfa_s3K4Qy4';
        this.axios = axios.create({
            baseURL: this.baseURL,
            headers:{
                'Authorization': this.clientID
            },
        });
    }
    async randomGetPhoto() {

            const photosResponse = await this.axios.get('/photos/random?query=funny-animal');
            return photosResponse.data.urls.regular;
    }
}

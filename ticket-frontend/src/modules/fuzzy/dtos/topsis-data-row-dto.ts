export class TopsisDataRowDto {
    movieId: number;
    name: string;
    rating: number | string;
    popularity: number | string;
    year: number | string;
    duration: number | string;
    dminus: number | string;
    dplus: number | string;
    s: number | string;

    constructor(obj: {
        movieId: number,
        name: string,
        rating: number | string,
        popularity: number | string,
        year: number | string,
        duration: number | string,
        dminus: number | string,
        dplus: number | string,
        s: number | string,
    }) {
        this.movieId = obj.movieId;
        this.name = obj.name;
        this.rating = obj.rating;
        this.popularity = obj.popularity;
        this.year = obj.year;
        this.duration = obj.duration;
        this.dminus = obj.dminus;
        this.dplus = obj.dplus;
        this.s = obj.s;
    }

    static fromObj(obj: any): TopsisDataRowDto {
        return new TopsisDataRowDto({
            movieId: obj.movieId,
            name: obj.name,
            rating: obj.rating,
            popularity: obj.popularity,
            year: obj.year,
            duration: obj.duration,
            dminus: obj.dminus,
            dplus: obj.dplus,
            s: obj.s,
        })
    }

}

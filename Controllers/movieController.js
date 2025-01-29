import connection from '../data/db.js';

function index(req, res, next) {
    const filter = req.query.filter;
    const sql = "SELECT * FROM `movies`;";
    connection.query(sql, (err, result) => {
        if (err) {
            next(new Error("Errore interno del server"));
        }
        let filmDaMostrare = result
        if (filter !== undefined) {
            filmDaMostrare = result.filter((curElem, i) => {
                let flag = false
                if ((result[i].title.includes(filter)) || (result[i].director.includes(filter)) || (result[i].title.includes(filter))) {
                    flag = true;
                }
                return flag;
            })
        }
        res.json({
            status: "Success",
            tot: filmDaMostrare.length,
            data: filmDaMostrare,
        })
    })
}

function show(req, res, next) {
    const movieId = parseInt(req.params.id);
    const sql = "SELECT * FROM `movies` WHERE `id`=?;";
    const sqlReview = `
    SELECT reviews.id, reviews.name, reviews.vote, reviews.text, reviews.created_at, reviews.updated_at
    FROM movies
    JOIN reviews
    ON reviews.movie_id=movies.id
    WHERE movies.id=?;`;
    connection.query(sql, [movieId], (err, result) => {
        if (err) {
            next(new Error("Errore interno del server"));
        }
        if (result.length === 0) {
            next(new Error("Il film che stai cercando non è presente nel Database"));
        }

        connection.query(sqlReview, [movieId], (err2, reviews) => {
            let data = {
                ...result[0]
            }

            if (reviews) {
                data.reviews = reviews
            }
            res.status(200).json({
                status: "Success",
                data
            })


        })


    })
}

export default { index, show };
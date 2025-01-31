import connection from '../data/db.js';

function index(req, res, next) {
    let sql = "SELECT * FROM `movies` ";
    let params = []
    let filters = []

    if (req.query) {
        for (const key in req.query) {
            filters.push({ key })
            filters.push(req.query[key])
        }

        for (let i = 1; i < filters.length; i = i + 2) {
            if (filters[i] !== undefined) {
                if (sql == "SELECT * FROM `movies` ") {
                    sql = sql + `WHERE ${filters[i - 1].key} LIKE ? `
                    const x = `%${filters[i]}%`
                    params.push(x)
                } else {
                    sql = sql + `AND ${filters[i - 1].key} LIKE ? `
                    const x = `%${filters[i]}%`
                    params.push(x)
                }
            }
        }
    }

    connection.query(sql, params, (err, result) => {
        if (err) {
            next(new Error("Errore interno del server"));
        }
        res.json({
            status: "Success",
            tot: result.length,
            data: result,
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
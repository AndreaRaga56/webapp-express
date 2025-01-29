const handleError = (err, req, res, next) => {
    const resObj = {
        status: "fail",
        message: err.message
    }

    if (process.env.ENVIRONMENT === "dev") {
        resObj.detail = err.stack
    }

    if (err.message==="Il film che stai cercando non è presente nel Database"){
        return res.status(404).json(resObj);
    }

    return res.status(500).json(resObj);
}

export default handleError
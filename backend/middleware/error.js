

export default (err, req, res, next) => {

    let error = {
        statusCode : err?.statusCode || 500,
        message : err?.message || "Internal Server Error",
    }


    res.statusCode(error.statusCode).json({
        message: error.message,
    })

}
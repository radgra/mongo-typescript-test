const handleValidationError = (err:any,req:any,res:any,next:any) => {
    if(err && err.name === "ValidationError" ) {
        res.send({"message":err.message})
    } else {
        next(err)
    }
}


const handleCastError = (err:any,req:any,res:any,next:any) => {
    if(err && err.name === "CastError" ) {
        res.send({"message":"Object with such key not found"})
    } else {
        next(err)
    }
}

const handleOtherErrors = (err:any,req:any,res:any,next:any) => {
    res.send(err)
}

const asyncMiddleware = (fn:any) => (req:any, res:any, next:any) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};


module.exports = {
    handleCastError,
    handleValidationError,
    handleOtherErrors,
    asyncMiddleware
}
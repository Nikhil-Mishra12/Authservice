
const {StatusCodes}=require('http-status-codes');
class AppErrors extends Error{
    constructor(
        name='AppErrors',
        message='something went wrong',
        explanation='something went wrong',
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR){
            super(message);
        this.name=name,
        this.message=message,
        this.explanation=explanation,
        this.statusCode=statusCode
    }
}
module.exports=AppErrors;
class ApiFeatures {
    constructor(query, queryStr){
        //queryStr is all that is sent after the API url
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            productName:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        } : {};

        // console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;

    }

    filter(){
        const queryCopy = {...this.queryStr};

        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key)=>delete queryCopy[key]);

        //Filter for Price and Rating

        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        console.log(queryStr);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;
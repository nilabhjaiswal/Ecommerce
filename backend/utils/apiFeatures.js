class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword
        ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        }
        : {};
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy); //use category=Laptop
        // Removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key)=> delete queryCopy[key]);

        // Filter for price and ratings
        console.log(queryCopy);
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);

        // console.log(queryCopy);
        this.query = this.query.find(JSON.parse(queryStr));
        console.log(queryStr);
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page)  || 1;

        const skip = resultPerPage * (currentPage - 1);   //currentPage = 1 , 1-1=0, 0*resultPerPage=0 , skip=0 page

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

export default ApiFeatures;
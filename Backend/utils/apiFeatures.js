class APIFeatures {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            "$or": [


                {
                    "name": {
                        $regex: this.querystr.keyword,
                        $options: 'i'
                    }
                },
                {
                    "category": {
                        $regex: this.querystr.keyword,
                        $options: 'i'
                    }
                },
                {
                    "seller": { $regex: this.querystr.keyword, $options: 'i' }
                },
            ]
        } :
            {}

        this.query = this.query.find({ ...keyword })
        return this;
    }
    pagination(resPerPage) {
        const currentPage = this.querystr.page || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;
import mongoose from 'mongoose'

const MongoDBUrl = process.env.MONGO_DB_URL!

if(!MongoDBUrl) {
    throw new Error('MONGO_DB_URL is not defined in environment variables')
}

const cached= global.mongoose || ( global.mongoose ={ connection: null , promise: null} )

export async function connectToDatabase() {
    
    if(cached.connection) return cached.connection;
    
    if( !cached.promise )
    {
        cached.promise= mongoose.connect(MongoDBUrl).then( mongoose => {return mongoose.connection})
        .catch((error) => {
            cached.promise = null   
            throw error
        })
    }
    cached.connection= await cached.promise 
    return cached.connection
}




import mongoose from 'mongoose'
const uri = "mongodb+srv://root:Password@cluster0.3iftf.mongodb.net/expressAuth?retryWrites=true&w=majority";
export default async () => await mongoose.connect(
    uri,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const refreshSchema = mongoose.model('refresh', new Schema({
    refresh_token: {type: String, require: true},
    access_token: {type: String, require: true},
    expires: {type: Date, require: true},
    userId: {type: String, require: true, unique: true}
}))

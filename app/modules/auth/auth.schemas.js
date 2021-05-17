import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const authSchema = mongoose.model('auth', new Schema({
    token: { type: String, require: true },
    id: { type: String, require: true }
}))
export const refreshSchema = mongoose.model('refresh', new Schema({
    token: { type: String, require: true },
    expires: { type: Date, require: true },
    userId: { type: String, require: true }
}))

import mongoose, {
  Schema
} from 'mongoose'
import jwt from 'jsonwebtoken'

import generateNumericString from '@lib/utils/generateNumericString'

import dotenv from 'dotenv'

dotenv.config()

const UserSchema = new Schema({
  name: String,
  email: String,
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  loginObject: {
    code: String,
    date: Date
  },
  isActive: Boolean
}, {
  timestamps: true
});

UserSchema.methods = {
  _generatePassCode() {
    return generateNumericString(4)
  },
  _createLoginObject() {
    this.loginObject = {
      code: this._generatePassCode(),
      date: new Date().toISOString()
    }
  },
  _validatCode(code) {

    try {
      if (this.loginObject.code !== code) {
        this._clearLoginObject()
        throw new Error('incorrect code')
      }

      if (new Date() - new Date(this.loginObject.date) > 200000) {
        this._clearLoginObject()
        throw new Error("time's up")
      }

    } catch (error) {
      throw error
    }
  },
  _clearLoginObject() {
    this.loginObject = null
  },
  _createToken() {
    return jwt.sign({
        _id: this._id,
      },
      process.env.JWT_SECRET
    )
  }
}

UserSchema.statics = {
  checkIfUserExists: async function (phoneNumber) {

    const thisUser = await this.findOne({
      phoneNumber
    }).lean()

    return !!thisUser
  }
}


export default mongoose.model('User', UserSchema);
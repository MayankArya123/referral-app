const mongoose = require("mongoose")
// const validator = require("validator")
// const brcypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "------jjjj---------",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    // validate(value) {
    //   if (value) {
    //     if (!validator.isEmail(value)) {
    //       throw new Error("email id invalid")
    //     }
    //   }
    // },
  },
  ReferredUser: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      default:null
    },
  IsPaymentMade:{
     type:Boolean,
     required: true,
     default: false,
  },TotalEarnings:{
    type:Number,
    required: true,
    default: 0,
  }

})

// userSchema.methods.getAuthToken = async function () {
//   const user = this

//   const token = jwt.sign({_id: user._id.toString()}, "mysecretkey")

//   user.tokens = user.tokens.concat({token})

//   await user.save()

//   return token
// }

// userSchema.methods.toJSON = function () {
//   const user = this

//   console.log("this", this)

//   const userObject = user.toObject()

//   console.log("userObject", userObject)

//   delete userObject.tokens
//   delete userObject.password

//   return userObject
// }

// userSchema.statics.verifyCrendentials = async (email, password) => {
//   try {
//     const user = await User.findOne({email})

//     if (!user) {
//       throw new Error("unable to login email not registered")
//     }

//     const isMatched = await brcypt.compare(password, user.password)

//     if (!isMatched) {
//       throw new Error("password id incorrect")
//     }

//     return user
//   } catch (err) {
//     console.log("verfiy crendentials error", err)

//     throw new Error(err)
//   }
// }

// userSchema.virtual("mytasks", {
//   ref: "Task",
//   localField: "_id",
//   foreignField: "owner",
// })

// userSchema.pre("save", async function (next) {
//   const user = this

//   if (user.isModified("password")) {
//     user.password = await brcypt.hash(user.password, 8)

//     next()
//   }
// })


// userSchema.pre("remove", async function (next) {

//   console.log('hitting middleware')
//    const user = this
//    await Task.deleteMany({owner:user._id})
//    next()
// })



const User = mongoose.model("User", userSchema)

module.exports = User

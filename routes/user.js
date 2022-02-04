const express = require("express")
const User = require("../models/user")
// const auth = require("../middleware/auth")

const mongoose = require("mongoose")

const router = new express.Router()

// const users = [{
//     name:"ss",
//     password:"kkk"
// },{
//     name:"ss2",
//     password:"kkk"
// }]

// const tasks = [{
//     description:"ss",
//     completed:true
// },{
//     description:"ss2",
//     completed:false
// }]

// const newUser = new  User ({
//     password:'Password',
//     email:'mayanksunny786@gmail.com'

// })

// newUser.save().then((succs)=>{
//         console.log('succs',succs)
//     }).catch((err)=>{
//         console.log('erroroooooooooooooooooooooooooo',err)
//     })

router.post("/add", async (req, res) => {
  const {name, email} = req.body

  const newUser = new User({
    email: email,
    name: name,
  })

  try {
    const user = await newUser.save()
    // const token = await user.getAuthToken()
    console.log("dd", user)
    res.status(201).send({newUser})
  } catch (err) {
    console.log("err", err)
    res.status(400).send(err)
  }

  // res.send('jjj')
})

router.post("/pay", async (req, res) => {
  const {userId} = req.body

  console.log("id", userId)
  try {
    const user = await User.findById({_id: new mongoose.Types.ObjectId(userId)})

    await user.populate({
      path: "ReferredUser",
      // // Get friends of friends - populate the 'friends' array for every friend
      // populate: { path: 'friends' }
    })

    const RU = await User.findByIdAndUpdate(
      {_id: new mongoose.Types.ObjectId(user.ReferredUser._id)},
      {$inc: {TotalEarnings: 10}}
    )

    //  console.log('incremented',RU)

    user.IsPaymentMade = true
    // // const token = await user.getAuthToken()
    const PaymentDone = await user.save()
    const userObject = PaymentDone.toObject()

    console.log("userObject", userObject)

    delete userObject.ReferredUser
    // console.log("dd", ReferralAdded)
    res.status(201).send(userObject)
  } catch (err) {
    console.log("err", err)
    res.status(400).send(err)
  }

  // res.send('jjj')
})

router.post("/addReferral", async (req, res) => {
  const {userId, referralId} = req.body

  console.log("id", userId)
  console.log("id", referralId)

  try {
    const user = await User.findById({_id: new mongoose.Types.ObjectId(userId)})

    if(user.ReferredUser){
      return res.status(401).send({message:"referral already added"})
    }

    user.ReferredUser = new mongoose.Types.ObjectId(referralId)
    // const token = await user.getAuthToken()
    const ReferralAdded = await user.save()
    console.log("dd", ReferralAdded)

    res.status(201).send({ReferralAdded})
  } catch (err) {
    console.log("err", err)
    res.status(400).send(err)
  }

  // res.send('jjj')
})

router.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    console.log("err", err)
    res.status(500).send(err)
  }
})

// router.get("/getUser", auth, async (req, res) => {
//   try {
//     res.send(req.user)
//   } catch (err) {
//     console.log("err", err)
//     res.status(500).send(err)
//   }
// })

// router.get("/users/:id", async (req, res) => {
//   const {id: userId} = req.params

//   console.log("id", typeof userId)

//   try {
//     const user = await User.findById({_id: userId})

//     if (!user) {
//       return res.status(404).send("user not found")
//     }

//     res.send(user)
//   } catch (err) {
//     res.status(500).send(err)
//   }
// })

// router.patch("/users/:id", auth, async (req, res) => {
//   const {id: userId} = req.params

//   console.log("id", typeof userId, req.body)

//   const updates = Object.keys(req.body)

//   const allowedOperations = ["name", "password"]

//   const IsOperationAllowed = updates.every((update) =>
//     allowedOperations.includes(update)
//   )

//   if (!IsOperationAllowed) {
//     return res.status(400).send({error: "invalid update"})
//   }

//   try {
//     // const user = await User.findById(userId)

//     // if (!req.user) {
//     //   return res.status(404).send("user not found ")
//     // }

//     updates.forEach((update) => {
//       req.user[update] = req.body[update]
//     })

//     const updateduser = await req.user.save()

//     res.send(updateduser)

//     // res.send(user)
//   } catch (err) {
//     console.log(err)
//     res.status(400).send(err)
//   }
// })

// router.get("/user/login", async (req, res) => {
//   const {email, password} = req.body

//   try {
//     const user = await User.verifyCrendentials(email, password)

//     console.log("verified", user)

//     const token = await user.getAuthToken()

//     res.send({user, token})
//   } catch (err) {
//     console.log("eorrrrrrrrrrrrrrrrrr", err)
//     res.status(400).send({error: err})
//   }
// })

// //deleting ref -------
// router.delete("/user/delete", auth ,async (req, res) => {

//   // const {email, password} = req.body

//   try {
//     const user = await User.findOneAndRemove({_id:req.user._id})

//     // console.log("verified", user)

//     // const token = await user.getAuthToken()

//     res.send({user})
//   } catch (err) {
//     console.log("eorrrrrrrrrrrrrrrrrr", err)
//     res.status(400).send({error: err})
//   }
// })

// try{

//   const task = await User.findById({_id:'61f25e32d9a84e4c41deee69'})

//   // const user = await User.findById({_id: userId})

//   await task.populate('mytasks')

//   // if(!tasks){
//   //     res.send(400)
//   // }

//   console.log('mytasks',task.mytasks)

//   res.send(task.mytasks)

// }catch(err){

//   console.log(err);
//   res.status(400).send(err)

// }

// router.get('/users',(req,res)=>{

// })

// const updateName= async (id,name)=>{
//   const user = await User.findByIdAndUpdate(id,{name})
//   console.log('user',user)
//   const  Count   =await User.countDocuments({name})
//   return Count

// }

//  updateName('61e8d597395b811686d360f1','hello').then((count)=>{
//      console.log('count',count)
//  }).catch((err)=>{
//      console.log('error',err)
//  })

// Task.updateMany({completed:true},{
//     $set:{
//         completed:false
//     }
// }).then((succs)=>{
//     console.log('all task completed',succs)
// }).catch((err)=>{
//     console.log('err',err)
// })

// // User.collection.insertMany(users).then((succs)=>{
// //     console.log('succs',succs)
// // }).catch((err)=>{
// //     console.log('err',err)
// // })

// Task.collection.insertMany(tasks).then((succs)=>{
//     console.log('succs',succs)
// }).catch((err)=>{
//     console.log('err',err)
// })

module.exports = router

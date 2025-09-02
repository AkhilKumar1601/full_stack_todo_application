import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema ({
   name : String,
   email : {type : String, unique : true},
  password : String
})

const Todo = new Schema ({
	userId : {type : ObjectId, ref: "users"},
   title : String,
   completed : Boolean
})

export const userModel = mongoose.model('users',User);
export const todoModel = mongoose.model('todo',Todo);

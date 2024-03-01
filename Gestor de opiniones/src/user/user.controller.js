'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const register = async(req, res)=>{
    try{
        let data = req.body
        if(!data) return res.status(402).send({message: 'Error sending data'})
        let user = new User(data)
        user.password = await encrypt(user.password)
        try{
            await user.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error recording data'}) 
        }
        return res.send({message: 'Registered user'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System error'}) 
    }
}

export const login = async(req, res)=>{
    try{
        let { username, password, email} = req.body
        let user = await User.findOne({
            $or: [
                {usernames: username},
                {email: email}
            ]
        })
        if(user && await checkPassword(password, user.password)){
            let loggerdUser = {
                uid: user.id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggerdUser)
            return res.send({message: `Welcome ${user.name}`,loggerdUser,token})
        }
        return res.status(401).send({message: 'Please check your details'})   
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System error'}) 
    }
}

export const update = async(req, res)=>{
    try{
        let { id } = req.user
        let data = req.body
        let updateVerify = checkUpdate(data, 'user')
        if(!updateVerify) return res.status(400).send({message: 'Some data could not be updated'})
        if(data.password){
            if(!data.passwordActual)
                return res.status(400).send({message: 'Enter your current password'})
        }
        let userCheck = await User.findOne({_id: id})        
        if(!await checkPassword(data.passwordActual, userCheck.password))
            return res.status(400).send({message: 'Invalid credentials'})
        
        data.password = await encrypt(data.password)
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updateUser) return res.status(401).send({message: 'User not found, could not update'})
        return res.send({message: 'Your data has been updated', updateUser})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'System error'}) 
    }
}
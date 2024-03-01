'use strict'

import Category from './category.model.js'

export const addCategory = async(req, res)=>{
    try{
        let data = req.body
        let category = new Category(data)
        try{
            await category.save()
        }catch(err){
            console.error(err)
            return res.status(500).send({message: 'Error save to category'}) 
        }
        return res.send({message: 'Saved category'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to addCategory'}) 
    }
}

export const updateCategory = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let categoryExiste = await Category.findOne({_id:id})
        if(!categoryExiste)
            return res.status(404).send({message: 'Category not found'})
        let categoryUpdate = await Category.findOneAndUpdate(
            {_id:id},
            data,
            {new: true})
        if(!categoryUpdate)
            return res.status(404).send({message: 'Internal error could not update'})
        return res.send({message: 'Category updated successfully', categoryUpdate})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to updateCategory'}) 
    }
}

export const deleteCategory = async(req, res)=>{
    try{
        let { id } = req.params
        let categoryExiste = await Category.findOne({_id:id})
        if(!categoryExiste)
            return res.status(404).send({message: 'Category not found'})
        let categoryDelete = await Category.findOneAndDelete({_id:id})
        if(!categoryDelete)
            return res.status(404).send({message: 'Internal error could not delete'})
        return res.send({message: `The category delete successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error connecting to deleteCategory'}) 
    }
}

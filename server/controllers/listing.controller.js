import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js"

export const createListing = async (req, res, next) => {
    let {propertyName,description,address,regularPrice,discountPrice,bathrooms,bedrooms,furnished,parking,type,offer,imageUrls,useRef} = req.body
    if(!propertyName){
        return res.status(400).json({
            message:"Please enter propertyName"
        })
    }
    if(!description){
        return res.status(400).json({
            message:"Please enter description"
        })
    }
    if(!address){
        return res.status(400).json({
            message:"Please enter address"
        })
    }
    if(!regularPrice){
        return res.status(400).json({
            message:"Please enter regularPrice"
        })
    }
    if(!discountPrice){
        return res.status(400).json({
            message:"Please enter discountPrice"
        })
    }
    if(!bathrooms){
        return res.status(400).json({
            message:"Please enter bathrooms"
        })
    }
    if(!bedrooms){
        return res.status(400).json({
            message:"Please enter bedrooms"
        })
    }
    if(!type){
        return res.status(400).json({
            message:"Please enter type"
        })
    }
    if(!offer){
        return res.status(400).json({
            message:"Please enter offer"
        })
    }
    if(!imageUrls){
        return res.status(400).json({
            message:"Please enter imageUrls"
        })
    }
    if(!useRef){
        return res.status(400).json({
            message:"Please enter useRef"
        })
    }
    try {
    const listing = await Listing.create(req.body)    
    return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}


export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if(!listing) {
        return next(errorHandler(404), 'Listing not found!')
    }

    // if(req.user.id !== listing.useRef) {
    //     return next(errorHandler(401, 'You can only delete your own listings!'))
    // }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted!')
    } catch (error) {
        next(error)
    }

}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(errorHandler(404, 'Listing not found!'))
    }
    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update ypur own listing!'))
    }

    try {
        const updateListing = await Listing.findByIdAndDelete(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json(updateListing)
    } catch (error) {
        next(error)
    }

}

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id)
        if (!listing)  {
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }

}

export const getListings = async (req, res, next) => {

    try {
        const limit = parseInt(req.query.limit) || 9
        const startIndex = parseInt(req.query.startIndex) || 0
        let offer = req.query.offer

        if(offer === undefined || offer === 'false') {
             offer = {$in: [false,true]}
        }
         
        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if(parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if(type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || ''

        const sort = req.query.sort || 'createAt'

        const order = req.query.order || 'desc'

        const listings = await Listing.find({
            name: {$regex : searchTerm, $options : 'i'},
            offer,
            furnished,
            parking,
            type,
        })
        .sort({ [sort]: order}
        ).limit(limit)
        .skip(startIndex)

        return res.status(200).json(listings)

    } catch (error) {
        next(error)
    }

}


export const getallListing = async (req, res, next) => {
    try {
        const listing = await Listing.find()
        if (!listing)  {
            return next(errorHandler(404, 'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }

}
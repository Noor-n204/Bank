const express = require('express')
const router = express.Router()
const Transaction = require('../model/transaction')
const Transactions = require('../transactions.json')

router.get('/regenerate', async function(req, res){
    await Transaction.deleteMany({})
        for (const t of Transactions) {

            const newTransactionSaved = new Transaction(t)
            await newTransactionSaved.save()
        }
        res.json({ success: true, message:"Transactions were regenerated"})
})

router.get('/', async function(req,res){
    const transactions = await Transaction.find({})
    res.send([...transactions])
})

router.get('/balance', async function(req, res){
    const result = await Transaction.aggregate(
        [{$group:{_id:null, count: {$sum: "$amount"}}}]
    )
    res.send(result)
})

router.post('/transaction', function(req, res){
    let newTransaction = req.body
    const addTransaction = new Transaction(newTransaction)
    addTransaction.save()
    res.end()
})

router.delete('/transaction/:transactionId',async function(req, res){
    let transactionID = req.params.transactionId
    let deletedTransaction = await Transaction.findByIdAndDelete(transactionID, { new: true })
    res.send(deletedTransaction)
})

router.get('/categorysum', async function(req, res){
    const result = await Transaction.aggregate(
        [{$group:{_id:"$category", count: {$sum: "$amount"}}}]
    )
    res.send(result)
})



module.exports = router
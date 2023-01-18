const billingDB = require("../billSchema/billFormat");
const hsnCode = require("../billSchema/hsn_code");
const viewhsnList = async(req,res) => {
    const data = await hsnCode.find();
    res.json(data);
}
const getProductHSNCode = async(req,res) => {

    const {type, value} =  req.params;

    if(type && value) {
        let data;
        if(type === 'particulars') {
            data = await hsnCode.findOne({particulars : value});
        } else if (type === 'hsnCode') {
            data = await hsnCode.findOne({hsnCode : value});
        }

        if(data) {
            return res.json(data);
        } else {
            return res.sendStatus(404);
        }
        
    } else{
        return res.sendStatus(400);
    }

    
}
const createHsnCode = async (req,res) =>{
    const data = new hsnCode({
        ...req.body
    })
    const savedata = await data.save();
    res.json(savedata);
}

const viewBillingData = async (req, res) => {
    const billData = await billingDB.find();
    res.json(billData);
  };
const creatBill = async(req,res) => {
    const billdata =  new billingDB({
        ...req.body
    })

    const savedata = await billdata.save();
    res.json(savedata)
}
const editBillData = async (req,res) =>{
    const editData = await billingDB.findOneAndUpdate(req.params.billNo,{$set:req.body},{new:true});
res.json({msg:"Update userdata in successfully",data:editData});
}
module.exports= {
    getProductHSNCode,
    createHsnCode,
    viewBillingData,
    creatBill,
    editBillData}
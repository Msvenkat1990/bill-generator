const express = require('express');
const { viewBillingData, creatBill, editBillData, getProductHSNCode, createHsnCode } = require('../controller/controller');
const router = express.Router();

// router.get('/products',viewhsnList);
router.post('/products',createHsnCode);
router.get('/product/:type/:value', getProductHSNCode)
router.get('/product/:type/:value', getProductHSNCode);

router.get('/view',viewBillingData);
router.post('/create',creatBill);
router.put('/update:billNo',editBillData)


module.exports = router;
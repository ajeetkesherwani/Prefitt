const mongoose = require("mongoose");

const productInventorySchema = new mongoose.Schema({

    vendor_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    service_id:{ type: mongoose.Schema.Types.ObjectId, ref: "serivce", required: true },
    category_id:{ type: mongoose.Schema.Types.ObjectId, ref: "category", required: true },
    subCategory_id:{ type: mongoose.Schema.Types.ObjectId, ref: "subCategory", required: true },
    product_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },

    inventoryData:[
        {
            variantData:[ 
                {
                    variantType_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "VariantType",
                        required: true
                    },
                    value: {
                        type: String,         
                        required: true,
                    }
                }
            ],
            add_on_price: {
                type: Number,
                default: 0
            },
            quantity:{
                type: Number,
            },
            inStock:{
                type: Boolean,
                default: true
            },
            status: {
                type:String,
                enum: ["active","inactive"],
                default: "active"
            }
        }
    ]
},{ timestamps: true });

const ProductInventory = mongoose.model("ProductInventory", productInventorySchema);

module.exports = ProductInventory;
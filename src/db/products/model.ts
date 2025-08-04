import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
    {
        title: {type: String, required: true, unique: true},
        description: {type: String, default:''},
        price: {type:Number, default: null, min: 0},
        category: {type: String, default: "uncategorized"},
        imageUrl: {
            type: String,
            validate: {
                validator: function (v: string) {
                    return /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(v);
                },
                message: (props: any) => `${props.value} is not a valid URL!`
            }
        }
    },
    {
        timestamps: true
    }
)

const Product = models.Product || model("Product", ProductSchema);
export default Product;
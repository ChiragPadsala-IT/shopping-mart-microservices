import mongoose, { Schema } from "mongoose";

const Schmema = mongoose.Schema;

const CustomerSchema = new Schmema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
    ],

    cart: [
      {
        product: {
          _id: { type: String, required: true },
          name: { type: String },
          price: { type: Number },
          banner: { type: String },
        },
        unit: { type: Number, required: true },
      },
    ],

    wishlist: [
      {
        _id: { type: String, required: true },
        name: { type: String },
        price: { type: Number },
        banner: { type: String },
        discription: { type: String },
        available: { type: Boolean },
      },
    ],

    orders: [
      {
        _id: { type: String, required: true },
        amount: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        return ret;
      },
    },
    timestamps: true,
  },
);

export default mongoose.model("Customer", CustomerSchema);

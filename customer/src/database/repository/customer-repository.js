import mongoose from "mongoose";
import { CustomerModel, AddressModel } from "../models";

//Dealing with data base operations
class CustomerRepository {
  async createCustomer({ email, password, salt, phone }) {
    const newCustomer = new CustomerModel({
      email,
      password,
      salt,
      phone,
      address: [],
    });

    const customerResult = await newCustomer.save();
    return customerResult;
  }

  async addAddress(customerId, { street, postalCode, city, country }) {
    const customerExist = await CustomerModel.findById(customerId);

    if (!customerExist) {
      throw new Error("Customer not found");
    }

    const newAddress = new AddressModel({
      street,
      postalCode,
      city,
      country,
    });

    await newAddress.save();
    customerExist.address.push(newAddress);
    return await customerExist.save();
  }

  async getCustomerByEmail(email) {
    return await CustomerModel.findOne({ email }).populate("address");
  }

  async getCustomerById(id) {
    return await CustomerModel.findById(id).populate("address");
  }

  async getWishlist(customerId) {
    const customerExist =
      await CustomerModel.findById(customerId).populate("wishlist");
    return customerExist.wishlist;
  }

  async addToWishlist(
    customerId,
    { _id, name, price, banner, discription, available },
  ) {
    const customerExist = await CustomerModel.findById(customerId);

    if (!customerExist) {
      throw new Error("Customer not found");
    }

    const productExist = customerExist.wishlist.find(
      (product) => product._id.toString() === _id.toString(),
    );

    if (productExist) {
      throw new Error("Product already in wishlist");
    }

    customerExist.wishlist.push({
      _id,
      name,
      price,
      banner,
      discription,
      available,
    });
    return await customerExist.save();
  }

  async addToCart(customerId, { _id, name, price, banner, discription }, unit) {
    const customerExist = await CustomerModel.findById(customerId);

    if (!customerExist) {
      throw new Error("Customer not found");
    }

    const productExist = customerExist.cart.find(
      (item) => item.product._id.toString() === _id.toString(),
    );

    if (productExist) {
      productExist.unit += unit;
    } else {
      customerExist.cart.push({
        product: { _id, name, price, banner, discription },
        unit,
      });
    }

    return await customerExist.save();
  }

  async AddOrder(customerId, { _id, amount }) {
    const customerExist = await CustomerModel.findById(customerId);

    if (!customerExist) {
      throw new Error("Customer not found");
    }

    customerExist.orders.push({
      _id,
      amount,
    });

    return await customerExist.save();
  }
}

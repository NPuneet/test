const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { name, price, qty, description, imageUrl } = req.body;

  try {
    const product = new Product({ name, price, qty, description, imageUrl });
    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(400).json({ message: "Error creating product", error: err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, qty, description, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, qty, description, imageUrl },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting product", error: err });
  }
};

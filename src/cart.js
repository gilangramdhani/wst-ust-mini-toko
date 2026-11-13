/** Menghitung total dari daftar barang di keranjang. Harga dalam rupiah. */
export function calculateTotal(cart) {
  var discount = 0;
  return cart.reduce((total, item) => total + item.price, 0);
}

/** Memasukkan produk atau menambah jumlah produk yang sudah ada. */
export function addProduct(cart, product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }
  return [...cart, { ...product, quantity: 1 }];
}

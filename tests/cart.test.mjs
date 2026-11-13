import test from "node:test";
import assert from "node:assert/strict";
import { addProduct, calculateTotal } from "../src/cart.js";

const mouse = { id: 1, name: "Mouse Nirkabel", price: 75000 };
const keyboard = { id: 2, name: "Papan Ketik", price: 150000 };

test("keranjang kosong memiliki total nol", () => {
  assert.equal(calculateTotal([]), 0);
});

test("satu barang dengan jumlah satu", () => {
  assert.equal(calculateTotal([{ ...mouse, quantity: 1 }]), 75000);
});

test("dua jenis barang dengan jumlah satu", () => {
  assert.equal(calculateTotal([{ ...mouse, quantity: 1 }, { ...keyboard, quantity: 1 }]), 225000);
});

test("satu jenis barang dengan jumlah dua", () => {
  assert.equal(calculateTotal([{ ...mouse, quantity: 2 }]), 150000);
});

test("dua jenis barang dengan jumlah berbeda", () => {
  assert.equal(calculateTotal([{ ...mouse, quantity: 2 }, { ...keyboard, quantity: 3 }]), 600000);
});

test("menambahkan produk baru ke keranjang kosong", () => {
  assert.deepEqual(addProduct([], mouse), [{ ...mouse, quantity: 1 }]);
});

test("menambahkan produk yang sama menambah jumlah, bukan baris", () => {
  const result = addProduct([{ ...mouse, quantity: 1 }], mouse);
  assert.deepEqual(result, [{ ...mouse, quantity: 2 }]);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { products, categoryLabels } from '../js/products.js';
import { giftSets } from '../js/gift-sets.js';
import { getProductById, getItemsTotal, formatPrice, getProductDetailUrl } from '../js/product-utils.js';

test('8 mã/giá/ảnh đúng và trường mô tả đầy đủ', async()=>{
 assert.deepEqual(products.map(p=>[p.id,p.price]),[['KC-001',45000],['KC-002',35000],['TL-001',125000],['TL-002',115000],['HL-001',35000],['HL-002',99000],['PK-001',30000],['PK-002',25000]]);
 assert.equal(new Set(products.map(p=>p.id)).size,8);
 for(const [i,p] of products.entries()){
  for(const k of ['name','description','color','size','material'])assert.ok(p[k].length);
  assert.ok(categoryLabels[p.category]);assert.equal(p.stockDemo,20);
  assert.equal(p.image,'images/product-'+(i+1)+'.webp');
  await access(new URL('../'+p.image,import.meta.url));
 }
});
test('tra đủ 8 mã và mã thiếu/sai',()=>{
 for(const p of products)assert.equal(getProductById(p.id),p);
 for(const id of [undefined,null,'',1,'kc-001','BAD'])assert.equal(getProductById(id),null);
});
test('3 bộ mẫu hợp lệ; tổng 80000/150000/129000',()=>{
 assert.equal(giftSets.length,3);
 assert.deepEqual(giftSets.map(g=>getItemsTotal(g.items)),[80000,150000,129000]);
 for(const g of giftSets){
  assert.ok(!('price' in g));assert.ok(g.items.length);
  for(const id of g.allowedProductIds)assert.ok(getProductById(id));
  for(const i of g.items){assert.ok(g.allowedProductIds.includes(i.productId));assert.ok(i.quantity<=getProductById(i.productId).stockDemo);}
 }
});
test('rỗng, lượng nhiều/mã lặp và không đổi đầu vào',()=>{
 const items=[{productId:'KC-001',quantity:2},{productId:'KC-001',quantity:1}];
 const before=JSON.stringify({items,products,giftSets});
 assert.equal(getItemsTotal([]),0);assert.equal(getItemsTotal(items),135000);
 assert.equal(before,JSON.stringify({items,products,giftSets}));
});
test('tính lại từ catalog, không dùng giá bộ lưu sẵn',()=>{
 const old=products[0].price;
 try{products[0].price=46000;assert.equal(getItemsTotal(giftSets[0].items),81000);}
 finally{products[0].price=old;}
});
test('từ chối mã/lượng sai và tràn số',()=>{
 for(const v of [null,{},'x',[null],[{}],[{productId:'BAD',quantity:1}]])assert.throws(()=>getItemsTotal(v));
 for(const quantity of [0,-1,1.5,'2',NaN,Infinity,Number.MAX_SAFE_INTEGER])assert.throws(()=>getItemsTotal([{productId:'KC-001',quantity}]));
});
test('tiền VND và hai bộ',()=>{
 assert.match(formatPrice(45000),/45\.000/);assert.match(formatPrice(45000),/₫/);
 assert.equal(getItemsTotal(giftSets[0].items)*2,160000);
});

test('link chi tiết vẫn đúng sản phẩm trước và sau khi nối trang động', async()=>{
 for(const p of products){
  const expected=p.id==='TL-001'?'product-detail.html?id=TL-001':'pages/product-details/product-'+p.id.toLowerCase()+'.html';
  assert.equal(getProductDetailUrl(p.id),expected);
  await access(new URL('../'+expected.split('?')[0],import.meta.url));
  assert.equal(getProductDetailUrl(p.id,{detailReady:true}),'product-detail.html?id='+p.id);
 }
 assert.throws(()=>getProductDetailUrl('BAD'));
});

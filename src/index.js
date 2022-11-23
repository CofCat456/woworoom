import './index.css';

import './mouse';
import { currency, calcSum } from './global';
import { recommendationData } from './mockData';
import { fetchProductList, fetchShoppingCart } from './fetch';

// --------------- Data ---------------

let copyProducts = [];

// --------------- DOM Render ---------------

const recommendationUl1 = document.querySelector('#recommendation_1');
const recommendationUl2 = document.querySelector('#recommendation_2');

function renderRecoItem(item, index) {
  return `
    <li class="flex w-full max-w-[350px] shrink-0 items-center">
      <img src=${item.productImage} alt="推薦 ${index} 照片" class="w-[96px] aspect-square object-cover" />
      <div class="flex-1 bg-white py-3 pl-4">
        <div class="mb-2 flex items-center gap-2">
          <div class="h-10 w-10 overflow-hidden rounded-full">
            <img
              src=${item.peopleImage}
              alt="推薦人 ${index} 照片"
              class="w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p class="font-style4">${item.name}</p>
            <p class="text-sm text-primary">${item.buy}</p>
          </div>
        </div>
        <p class="font-style4">${item.evaluation}</p>
      </div>
    </li>
  `;
}

function renderReco() {
  let htmlstr1 = '';
  let htmlstr2 = '';

  recommendationData.forEach((item, index) => {
    if (index <= 4) {
      htmlstr1 += renderRecoItem(item, index);
    } else {
      htmlstr2 += renderRecoItem(item, index);
    }
  });

  recommendationUl1.innerHTML = htmlstr1;
  recommendationUl2.innerHTML = htmlstr2;
}

renderReco();

// --------------- 推薦 ---------------

const productList = document.querySelector('#product-list');

function renderProductItem(item) {
  return `<li class="max-w-[255px] w-full relative">
      <img src=${item.images} alt="${item.title} 的照片" 
      class="w-full object-cover rounded-bl-2 rounded-br-2" loading="lazy" />
      <button type="button" data-id=${item.id}
      class="w-full py-[10px] text-center bg-black text-white text-xl leading-[25px] hover:bg-[#301E5F] duration-300 cursor-pointer">加入購物車</button/>
      <p class="font-style3 py-2">${item.title}</p>
      <p class="font-style3 font-sans line-through">${currency(item.origin_price, 'NT$')}</p>
      <p class="font-style2 font-sans">${currency(item.price, 'NT$')}</p>
     <p class="absolute top-[13px] -right-[5px] bg-black py-2 px-6 font-style3 text-white">新品</p>
    </li>
  `;
}

function renderProductList(products) {
  let htmlstr = '';

  products.forEach((product) => {
    htmlstr += renderProductItem(product);
  });

  productList.innerHTML = htmlstr;
}

// --------------- 產品列表 ---------------

const productOrder = document.querySelector('#product-order');

function orderProduct(e) {
  switch (e.target.value) {
    case '床架':
    case '收納':
    case '窗簾':
      renderProductList(copyProducts.filter(({ category }) => category === e.target.value));
      break;
    default:
      renderProductList(copyProducts);
      break;
  }
}

productOrder.addEventListener('change', orderProduct);

// --------------- 產品排列 ---------------

const shoppingCartTableBd = document.querySelector('#shopping_cart_table_body');

function renderShopCartItem(cart) {
  console.log(cart);
  const {
    product: { images, price, title },
    quantity,
  } = cart;
  return `
    <tr class="border-b-2 border-solid border-[#b9b9b9] text-center">
      <td class="py-5 pr-[15px] flex items-center gap-[15px] text-left text-xl font-normal leading-[30px] text-black">
        <img src=${images} alt="${title} 的照片" class="w-20 aspect-square object-cover object-center" />
        ${title}
      </td>
      <td class="py-5 align-middle text-left font-sans px-[15px] font-style3">
        ${currency(price, 'NT$')} 
      </td>
      <td class="py-5 align-middle px-[15px] text-left font-style3">
        ${quantity}
      </td>
      <td class="py-5 px-[15px] font-style3 font-sans text-left align-middle">
        ${currency(calcSum(price, quantity), 'NT$')}
      </td>
      <td class="py-5 px-[15px] font-style3 text-right align-middle">
        <button type="button" class="p-2 group">
          <span class="material-icons text-4xl group-hover:text-primary group-hover:scale-125 duration-200">
            close
          </span>
        </button>
      </td>
    </tr>
  `;
}

function renderShopCart(carts) {
  let htmlstr = '';

  carts.forEach((cart) => {
    htmlstr += renderShopCartItem(cart);
  });

  shoppingCartTableBd.innerHTML = htmlstr;
}

// --------------- 購物車列表 ---------------

const shoppingCartFinalToal = document.querySelector('#shopping_cart_final_total');

function renderShopCartFinalTotal(total) {
  shoppingCartFinalToal.textContent = currency(total, 'NT$');
}

// --------------- 購物車總金額 ---------------

(async () => {
  try {
    const responses = await Promise.all([fetchProductList(), fetchShoppingCart()]);
    const data = await Promise.all(responses.map((response) => response.json()));
    const [{ products }, { carts, finalTotal, total }] = data;
    copyProducts = await products;
    renderProductList(products);
    renderShopCart(carts);
    renderShopCartFinalTotal(finalTotal);
  } catch (err) {
    console.log(err);
  }
})();

// --------------- Call API ---------------

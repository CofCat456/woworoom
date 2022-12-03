import Swal from 'sweetalert2';

import './index.css';

import './global/mouse';
import './global/form';
import { currency, calcSum, callSwal, isReject } from './global/global';
import { recommendationData } from './global/mockData';
import {
  getProductApi,
  getShopCartApi,
  addShopCartApi,
  deleteShopCartAPi,
  deleteAllShopCartAPi,
} from './global/fetchApi';

// --------------- Data ---------------

let copyProducts = [];
let copyShopCarts = [];

// --------------- DOM Render ---------------

const recommendationUl1 = document.querySelector('#recommendation_1');
const recommendationUl2 = document.querySelector('#recommendation_2');

function renderRecoItem(item, index) {
  const { productImage, peopleImage } = item;

  return `
    <li class="flex w-full max-w-[350px] shrink-0 items-center">
      <img src=${productImage} alt="推薦 ${index} 照片" class="w-[96px] aspect-square object-cover" />
      <div class="flex-1 bg-white py-3 pl-4">
        <div class="mb-2 flex items-center gap-2">
          <div class="h-10 w-10 overflow-hidden rounded-full">
            <img
              src=${peopleImage}
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
  const { images, title, id, origin_price: originPrice, price } = item;

  return `<li class="max-w-[255px] w-full relative">
      <img src=${images} alt="${item.title} 的照片" 
      class="w-full object-cover rounded-bl-2 rounded-br-2" loading="lazy" />
      <button id="addShopCart" type="button" class="addShopCart" data-id=${id}>
        <svg class="hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        加入購物車
      </button/>
      <p class="font-style3 py-2">${title}</p>
      <p class="font-style3 font-sans line-through">${currency(originPrice, 'NT$')}</p>
      <p class="font-style2 font-sans">${currency(price, 'NT$')}</p>
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
  const {
    id,
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
        <button type="button" id="delShopCart" class="p-2 group inline-flex items-center justify-center" data-id=${id}>
          <svg class="hidden animate-spin -ml-1 mr-3 w-8 h-9 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="material-icons pointer-events-none text-4xl group-hover:text-primary group-hover:scale-125 duration-200">
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

async function getProducts() {
  const res = await getProductApi();
  const data = await res.json();
  const { products } = data;
  copyProducts = await products;
  renderProductList(products);
}

// --------------- 取得商品列表 ---------------

async function getShopCarts() {
  const res = await getShopCartApi();
  const data = await res.json();
  const { carts, finalTotal } = data;
  copyShopCarts = carts;
  renderShopCart(carts);
  renderShopCartFinalTotal(finalTotal);
}

// --------------- 取得購物車列表 ---------------

(async () => {
  try {
    await Promise.all([getProducts(), getShopCarts()]);
  } catch (err) {
    console.log(err);
  }
})();

// --------------- 載入時 Call API ---------------

const addShopCart = async (event) => {
  if (event.target.getAttribute('id') !== 'addShopCart') return;
  const { id } = event.target.dataset;
  const Loading = event.target.children[0];
  let quantity = copyShopCarts.find(({ product: { id: productId } }) => productId === id)?.quantity;

  try {
    Loading.classList.remove('hidden');
    const res = await addShopCartApi({
      data: {
        productId: id,
        quantity: quantity ? (quantity += 1) : 1,
      },
    });
    const data = await res.json();
    const { status, message = '', carts, finalTotal } = data;
    if (isReject(status)) {
      callSwal({
        status,
        title: '加入失敗 (′゜ω。‵)',
        msg: message,
      });
      return;
    }
    callSwal({
      status,
      title: '加入成功 ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
    });
    Loading.classList.add('hidden');
    copyShopCarts = carts;
    renderShopCart(carts);
    renderShopCartFinalTotal(finalTotal);
  } catch (err) {
    console.log(err);
  }
};

productList.addEventListener('click', addShopCart);

// --------------- 新增購物車 ---------------

const delShopCart = async (event) => {
  if (event.target.getAttribute('id') !== 'delShopCart') return;

  const { id } = event.target.dataset;
  const Loading = event.target.children[0];
  const originIcon = event.target.children[1];

  try {
    Loading.classList.remove('hidden');
    originIcon.classList.add('hidden');
    const res = await deleteShopCartAPi(id);
    const data = await res.json();
    const { status, message = '', carts, finalTotal } = data;
    Loading.classList.add('hidden');
    if (isReject(status)) {
      callSwal({
        status,
        title: '刪除失敗 (′゜ω。‵)',
        msg: message,
      });
      return;
    }
    callSwal({
      status,
      title: '刪除成功 ⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾',
    });
    originIcon.classList.remove('hidden');
    copyShopCarts = carts;
    renderShopCart(carts);
    renderShopCartFinalTotal(finalTotal);
  } catch (err) {
    console.log(err);
  }
};

shoppingCartTableBd.addEventListener('click', delShopCart);

// --------------- 移除購物車產品 ---------------

const shoppingCartDelAllBtn = document.querySelector('#shopping_cart_delAll_btn');

const delAllShopCart = async () => {
  try {
    const result = await Swal.fire({
      title: '確定要清空購物車嗎?',
      text: '他們將在宇宙中漂流...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確認流放',
      cancelButtonText: '再想想',
    });

    if (result.isConfirmed) {
      const res = await deleteAllShopCartAPi();
      const data = await res.json();
      const { status, message = '', carts, finalTotal } = data;
      if (isReject(status)) {
        callSwal({
          status,
          title: '刪除失敗 (′゜ω。‵)',
          msg: message,
        });
        return;
      }
      callSwal({
        status,
        title: '你將在宇宙盡頭找到他們 (☍﹏⁰)',
      });

      copyShopCarts = carts;
      renderShopCart(carts);
      renderShopCartFinalTotal(finalTotal);
    }
  } catch (err) {
    console.log(err);
  }
};

shoppingCartDelAllBtn.addEventListener('click', delAllShopCart);

// --------------- 移除全部購物車產品 ---------------

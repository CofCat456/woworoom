import './index.css';

import './mouse';

import { recommendationData1 } from './Data';

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

  recommendationData1.forEach((item, index) => {
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

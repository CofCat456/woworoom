export const recommendationData = [
  {
    name: '王六角',
    buy: 'Jodan 雙人床架',
    productImage: require('../assets/reco-product-1.png'),
    peopleImage: require('../assets/reco-people-1.png'),
    evaluation: 'CP值很高。',
  },
  {
    name: 'Leaf',
    buy: 'Antony 雙人床架',
    productImage: require('../assets/reco-product-2.png'),
    peopleImage: require('../assets/reco-people-2.png'),
    evaluation: '很喜歡～還有送三年保固～',
  },
  {
    name: '美濃鄧子琪',
    buy: 'Charles 系列儲物組合',
    productImage: require('../assets/reco-product-3.png'),
    peopleImage: require('../assets/reco-people-3.png'),
    evaluation: '廚房必備美用品！',
  },
  {
    name: 'isRaynotArray',
    buy: 'Jodan 雙人床架',
    productImage: require('../assets/reco-product-4.png'),
    peopleImage: require('../assets/reco-people-4.png'),
    evaluation: '物超所值!',
  },
  {
    name: '程鮭魚',
    buy: 'Louvre 雙人床架',
    productImage: require('../assets/reco-product-5.png'),
    peopleImage: require('../assets/reco-people-5.png'),
    evaluation: '租屋用剛剛好',
  },
  {
    name: '小杰',
    buy: 'Louvre 雙人床架',
    productImage: require('../assets/reco-product-6.png'),
    peopleImage: require('../assets/reco-people-6.png'),
    evaluation: '非常舒適，有需要會再回購',
  },
  {
    name: '江八角',
    buy: 'Charles 雙人床架',
    productImage: require('../assets/reco-product-7.png'),
    peopleImage: require('../assets/reco-people-7.png'),
    evaluation: '品質不錯～',
  },
  {
    name: 'juni讚神',
    buy: 'Antony 床邊桌',
    productImage: require('../assets/reco-product-8.png'),
    peopleImage: require('../assets/reco-people-8.png'),
    evaluation: '讚ㄉ！',
  },
  {
    name: '久安說安安',
    buy: 'Antony 單人床架',
    productImage: require('../assets/reco-product-9.png'),
    peopleImage: require('../assets/reco-people-9.png'),
    evaluation: '一個躺剛剛好。',
  },
  {
    name: 'PeiQun',
    buy: 'Antony 雙人床架',
    productImage: require('../assets/reco-product-10.png'),
    peopleImage: require('../assets/reco-people-10.png'),
    evaluation: '睡起來很舒適',
  },
];

export const formItemData = {
  name: {
    presence: {
      message: '^必填',
    },
  },
  tel: {
    presence: {
      message: '^必填',
    },
    format: {
      pattern: '^09[0-9]{8}$',
      message: '^電話 格式錯誤',
    },
  },
  email: {
    presence: {
      message: '^必填',
    },
    email: {
      message: '^Email 格式錯誤',
    },
  },
  address: {
    presence: {
      message: '^必填',
    },
  },
  payment: {
    presence: {
      message: '^必填',
    },
    inclusion: {
      within: ['ATM', 'VISA', '7-11'],
      message: '^鼻要亂來喔 öㅅö',
    },
  },
};

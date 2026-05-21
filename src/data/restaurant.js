import rawData from './next-data.json';

const app = rawData.props?.app || rawData.props?.pageProps?.app;

const clean = (str) => (str || '').trim();

const sectionsMap = {};
(app.sections || []).forEach((s) => {
  sectionsMap[s._id] = { ...s, name: clean(s.name) };
});

const categoriesList = (app.categories || []).map((c) => ({
  ...c,
  name: clean(c.name),
  description: clean(c.description),
}));

const sectionsFromMenu = {};
(app.sections || []).forEach((sec) => {
  sectionsFromMenu[sec._id] = {
    _id: sec._id,
    name: sectionsMap[sec._id]?.name || clean(sec.name),
    hurl: sec.hurl || sec._id,
    categories: {},
  };
});
app.menu.forEach((item) => {
  const secId = item.section;
  if (!sectionsFromMenu[secId]) {
    sectionsFromMenu[secId] = {
      _id: secId,
      name: sectionsMap[secId]?.name || clean(secId),
      hurl: sectionsMap[secId]?.hurl || secId,
      categories: {},
    };
  }
  const cat = categoriesList.find((c) => c._id === item.category);
  if (cat) {
    if (!sectionsFromMenu[secId].categories[cat._id]) {
      sectionsFromMenu[secId].categories[cat._id] = { ...cat, items: [] };
    }
    sectionsFromMenu[secId].categories[cat._id].items.push({
      _id: item._id,
      name: clean(item.name),
      description: clean(item.description),
      price: (item.price || 0) / 100,
      weight: item.weight || null,
      weightType: item.weightType || 'g',
      alcohol: item.alcohol || 0,
      available: item.available !== false,
      media: item.media?.[0] || null,
      hurl: item.hurl,
      categoryName: cat.name,
      categoryDescription: cat.description,
      sectionName: sectionsMap[secId]?.name || '',
    });
  }
});

export const sections = Object.values(sectionsFromMenu).filter(Boolean);

export const place = {
  name: clean(app.place?.name) || 'The River',
  type: app.place?.type || 'restaurant',
  phone: app.place?.contactInfo?.phone || '+380678287777',
  email: app.place?.contactInfo?.email || 'theriverpremium@gmail.com',
  location: app.place?.location || '1A, vul. Sahaidachnoho, Ternopil, 46002',
  coordinates: app.place?.locationPoint || { lat: 49.5533903, lng: 25.5718593 },
  social: {
    facebook: app.place?.contactInfo?.socialNetworks?.fb || 'https://facebook.com/theriver.premium',
    instagram: app.place?.contactInfo?.socialNetworks?.instagram || 'https://www.instagram.com/theriver_premium/',
  },
  currency: app.place?.currencyLabel || '₴',
  workTime: app.place?.workTime || {},
  workTimeAll: app.place?.workTimeAll || [],
};

export const allMenuItems = app.menu
  ? app.menu.map((item) => {
      const cat = categoriesList.find((c) => c._id === item.category);
      return {
        _id: item._id,
        name: clean(item.name),
        description: clean(item.description),
        price: (item.price || 0) / 100,
        weight: item.weight || null,
        weightType: item.weightType || 'g',
        alcohol: item.alcohol || 0,
        available: item.available !== false,
        media: item.media?.[0] || null,
        hurl: item.hurl,
        categoryName: cat?.name || '',
        categoryDescription: cat?.description || '',
        categoryHurl: cat?.hurl || '',
        sectionName: sectionsMap[item.section]?.name || '',
      };
    })
  : [];


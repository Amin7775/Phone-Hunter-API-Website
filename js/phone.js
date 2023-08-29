const phoneUrl = 'https://openapi.programming-hero.com/api/phones?search=iphone';

console.log('Connected to phone.js')
const loadPhone = async () => {
    const res = await fetch(phoneUrl);

    const data = await res.json();
    const phones = data.data;
    console.log(phones);
}

loadPhone();
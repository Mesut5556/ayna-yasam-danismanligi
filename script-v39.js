const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if(menuBtn && menu){
 menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();


// V3.9: no backend, no payment, no data storage. The visitor chooses whether to send the message.
(() => {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  const select = document.getElementById('bookingService');
  const price = document.getElementById('bookingPrice');
  const date = document.getElementById('bookingDate');
  const time = document.getElementById('bookingTime');
  const panel = document.getElementById('randevu');
  const offerings = {
    intro: {name:'Ön Tanışma', duration:'20 dakika, online', price:'Ücretsiz'},
    online: {name:'Bireysel Farkındalık', duration:'50 dakika, online', price:'750 TL'},
    face: {name:'Yüz Yüze Görüşme', duration:'60 dakika, yüz yüze', price:'1.000 TL'},
    package: {name:'AYNA Dört Görüşme Paketi', duration:'4 × 50 dakika, online', price:'2.600 TL'}
  };
  const today = () => {const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
  date.min = today();
  const update = () => {price.textContent = offerings[select.value].price;};
  select.addEventListener('change',update);
  document.querySelectorAll('.choose-service').forEach((link,i)=>{
    link.addEventListener('click',()=>{select.selectedIndex=i;update();panel.open=true;});
  });
  form.addEventListener('submit',e=>{
    e.preventDefault();
    if(date.value && date.value < today()) {date.setCustomValidity('Geçmiş bir tarih seçilemez.');date.reportValidity();return;}
    date.setCustomValidity('');
    const o=offerings[select.value];
    const message = ['Merhaba, AYNA Yaşam Danışmanlığı üzerinden randevu talep ediyorum.',
      'Hizmet: '+o.name, 'Süre / tür: '+o.duration, 'Ücret: '+o.price,
      'Tercih ettiğim tarih: '+(date.value||'Henüz belirlemedim'),
      'Tercih ettiğim saat: '+(time.value||'Henüz belirlemedim'),
      'Uygunluğunuzu öğrenmek istiyorum.'].join('\n');
    const url='https://wa.me/905447483471?text='+encodeURIComponent(message);
    const opened=window.open(url,'_blank','noopener,noreferrer');
    if(!opened) window.location.href=url;
  });
  date.addEventListener('change',()=>date.setCustomValidity(''));
  update();
})();

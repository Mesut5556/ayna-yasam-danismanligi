const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if(menuBtn && menu){
 menuBtn.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

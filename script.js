// Yayına almadan önce işletmeye ait gerçek e-posta adresini buraya yazın.
// Boş bırakılırsa form, mesajın otomatik gönderilmediğini açıkça belirtir.
const CONTACT_EMAIL = '';
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => { const opened=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(opened));menuBtn.setAttribute('aria-label',opened?'Menüyü kapat':'Menüyü aç'); });
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit',e=>{
 e.preventDefault(); const status=document.getElementById('formStatus');
 if(!e.currentTarget.reportValidity()) return;
 if(!CONTACT_EMAIL){status.textContent='İletişim e-posta adresi henüz tanımlanmadı. Form şu anda gönderilemiyor; lütfen site yöneticisinin iletişim bilgilerini eklemesini bekleyin.';return;}
 const name=document.getElementById('name').value.trim(), email=document.getElementById('email').value.trim(),topic=document.getElementById('topic').value,message=document.getElementById('message').value.trim();
 const subject=encodeURIComponent('AYNA bilgi talebi: '+topic);
 const body=encodeURIComponent('Ad soyad: '+name+'\nE-posta: '+email+'\nKonu: '+topic+'\n\nMesaj:\n'+message+'\n\nBu mesaj kullanıcı tarafından e-posta uygulaması üzerinden gönderilecektir.');
 status.textContent='E-posta uygulamanız açılıyor. Gönderimi uygulama içinden onaylamanız gerekir.';
 window.location.href='mailto:'+CONTACT_EMAIL+'?subject='+subject+'&body='+body;
});

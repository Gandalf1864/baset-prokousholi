'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('.filter')];
function filterProjects(category) {
  let count = 0;
  cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; if (!card.hidden) count++; });
  filters.forEach(button => { const active = button.dataset.filter === category; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  document.querySelector('#project-count').textContent = `${String(count).padStart(2, '0')} SELECTED PROJECT${count === 1 ? '' : 'S'}`;
}
filters.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
document.querySelectorAll('[data-select-filter]').forEach(link => link.addEventListener('click', () => filterProjects(link.dataset.selectFilter)));
const projectData = {
  bridge: {category:'INFRASTRUCTURE / BRIDGES', title:'32 m RCC girder bridge', location:'Khetrapasa–Jagannathpur, Sunamganj', description:'A reinforced-concrete variable girder bridge on the Moyespur–Sathal Korian route via Khetrapasa, listed in the company’s infrastructure portfolio.', client:'Local Government Engineering Department (LGED)', scope:'32 m bridge construction'},
  building: {category:'BUILDINGS / EDUCATION', title:'Sunamganj Polytechnic Institute', location:'Sadar, Sunamganj', description:'An academic facility project at Sunamganj Polytechnic Institute, including a six-storey building and associated services.', client:'Education Engineering Department (EED)', scope:'Building, sanitary, water supply and electrification works'},
  road: {category:'INFRASTRUCTURE / ROADS', title:'Mithamoin–Katkhal road', location:'Mithamoin, Kishoreganj', description:'Rehabilitation of the Mithamoin Upazila headquarters to Katkhal Growth Centre road using reinforced concrete pavement.', client:'Local Government Engineering Department (LGED)', scope:'RCC road rehabilitation, chainage 12,168.4–16,000 m'},
  river: {category:'WATERWORKS / RIVER PROTECTION', title:'Meghna riverbank protection', location:'Nolchira Union (Tofania), Hatiya, Noakhali', description:'Precautionary protective works on the right bank of the Meghna River at Polder 73/1 (A+B), listed in the company’s waterworks portfolio.', client:'Bangladesh Water Development Board (BWDB)', scope:'335 m of riverbank protective works'}
};
const dialog = document.querySelector('#project-dialog');
let lastProjectButton;
cards.forEach(button => button.addEventListener('click', () => {
  const project = projectData[button.dataset.project];
  lastProjectButton = button;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-location').textContent = project.location;
  document.querySelector('#dialog-description').textContent = project.description;
  const facts = document.querySelector('#dialog-facts'); facts.replaceChildren();
  for (const [label, value] of [['Department',project.client],['Scope',project.scope]]) { const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; facts.append(dt,dd); }
  dialog.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if(event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastProjectButton?.focus({preventScroll:true}); });
document.querySelector('#dialog-contact').addEventListener('click', () => { dialog.close(); setTimeout(() => document.querySelector('#name').focus({preventScroll:true}),100); });
document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget; if (!form.reportValidity()) return;
  const values = new FormData(form);
  const subject = `Project enquiry: ${values.get('interest')}`;
  const body = `Dear Baset Prokousholi team,\n\n${String(values.get('message')).trim()}\n\nName: ${String(values.get('name')).trim()}\nEmail: ${String(values.get('email')).trim()}\nArea of interest: ${values.get('interest')}\n`;
  const status = document.querySelector('#form-status'); status.hidden = false;
  status.textContent = 'Your email draft is ready. Review and send it in your email app. If it does not open, email info@basetprokousholiltd.com directly.';
  window.location.href = `mailto:info@basetprokousholiltd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();

async function loadTools(){
  try{
    // Eğer bir API sunuluyorsa öncelikle ona bak
    const apiRes = await fetch('/api/tools');
    if(apiRes.ok) return await apiRes.json();
  }catch(e){}
  const res = await fetch('tools.json');
  return await res.json();
}

const el = q=> document.querySelector(q);

function renderCategories(tools){
  // Kategori sayıları hesapla
  const counts = {};
  tools.forEach(t=>{
    const c = (t.category || '').trim() || 'Diğer';
    counts[c] = (counts[c] || 0) + 1;
  });
  const cats = Object.keys(counts).sort((a,b)=> a.localeCompare(b));
  const sel = el('#category'); sel.innerHTML = '<option value="">Tüm Kategoriler</option>';
  cats.forEach(cat=>{
    const o = document.createElement('option'); o.value = cat;
    o.textContent = `${cat} (${counts[cat]})`;
    sel.appendChild(o);
  });
}

function makeCard(t){
  const d = document.createElement('div'); d.className='card';
  const h = document.createElement('h3'); h.textContent = t.name; d.appendChild(h);
  const m = document.createElement('div'); m.className='meta'; m.textContent = `${t.category || ''} • ${t.tags?.join(', ')||''}`; d.appendChild(m);
  const p = document.createElement('p'); p.textContent = t.description; d.appendChild(p);
  const aWrap = document.createElement('div'); aWrap.className='actions';
  const a = document.createElement('a'); a.href=t.url; a.target='_blank'; a.textContent='Siteye Git'; aWrap.appendChild(a);
  const c = document.createElement('button'); c.textContent='Link Kopyala'; c.onclick=()=>{navigator.clipboard.writeText(t.url); c.textContent='Kopyalandı'; setTimeout(()=>c.textContent='Link Kopyala',1200)};
  aWrap.appendChild(c);
  d.appendChild(aWrap);
  return d;
}

function sortTools(list, key){
  return list.slice().sort((a,b)=> (a[key]||'').localeCompare(b[key]||''));
}

function exportCSV(list){
  const rows = [ ['name','category','tags','url','description'] ];
  list.forEach(t=> rows.push([t.name, t.category || '', (t.tags||[]).join('|'), t.url, t.description.replace(/\n/g,' ')]));
  const csv = rows.map(r=> r.map(c=> '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='osint-tools.csv'; a.click(); URL.revokeObjectURL(url);
}

function applyFilters(tools){
  const q = el('#search').value.trim().toLowerCase();
  const cat = el('#category').value;
  const sortKey = el('#sort')?.value || '';
  let out = tools.filter(t=>{
    if(cat && (t.category||'') !== cat) return false;
    if(!q) return true;
    const hay = (t.name+' '+t.description+' '+(t.tags||[]).join(' ')).toLowerCase();
    return hay.indexOf(q) !== -1;
  });
  if(sortKey) out = sortTools(out, sortKey);
  const list = el('#list'); list.innerHTML='';
  out.forEach(t=> list.appendChild(makeCard(t)));
  el('#count').textContent = `${out.length} araç gösteriliyor`;
  // store last results for export
  window._lastResults = out;
}

(async ()=>{
  const tools = await loadTools();
  renderCategories(tools);
  // ek UI elemanları
  const controls = document.querySelector('.controls');
  const sort = document.createElement('select'); sort.id='sort';
  sort.innerHTML = '<option value="">Sırala</option><option value="name">Ad (A-Z)</option><option value="category">Kategori</option>';
  controls.appendChild(sort);
  const exportBtn = document.createElement('button'); exportBtn.textContent='CSV Dışa Aktar'; exportBtn.onclick=()=>exportCSV(window._lastResults||tools);
  controls.appendChild(exportBtn);

  applyFilters(tools);
  el('#search').addEventListener('input',()=>applyFilters(tools));
  el('#category').addEventListener('change',()=>applyFilters(tools));
  el('#clear').addEventListener('click',()=>{el('#search').value='';el('#category').value='';el('#sort').value='';applyFilters(tools)});
  el('#sort').addEventListener('change',()=>applyFilters(tools));
})();

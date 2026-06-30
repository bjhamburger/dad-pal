export function initMain() {
  switchTab('tp-home')
}

export function switchTab(id) {
  document.querySelectorAll('.tp').forEach((p) => p.classList.remove('active'))
  document.getElementById(id)?.classList.add('active')

  document.querySelectorAll('.nbtn').forEach((btn) => {
    btn.classList.toggle('on', btn.dataset.tab === id)
  })

  const sb = document.getElementById('main-sb')
  if (sb) sb.classList.toggle('dark', id === 'tp-home')
}

export function filterChip(el) {
  el.closest('.chips-row')?.querySelectorAll('.chip').forEach((c) => {
    c.classList.replace('ch-on', 'ch-off')
  })
  el.classList.replace('ch-off', 'ch-on')
}

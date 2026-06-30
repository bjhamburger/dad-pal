import { ICONS } from './icons.js'

let toastTimer = null

export function showToast(msg) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600)
}

export function togglePw(inputId, btn) {
  const input = document.getElementById(inputId)
  if (!input) return
  const isHidden = input.type === 'password'
  input.type = isHidden ? 'text' : 'password'
  btn.innerHTML = isHidden ? ICONS.eyeOff : ICONS.eye
}

export function toggleCb(row) {
  row.querySelector('.cb')?.classList.toggle('on')
}

export function startClock() {
  const tick = () => {
    const now = new Date()
    const h = now.getHours()
    const m = String(now.getMinutes()).padStart(2, '0')
    document.querySelectorAll('.sb-time').forEach(el => {
      el.textContent = `${h}:${m}`
    })
  }
  tick()
  setInterval(tick, 15_000)
}

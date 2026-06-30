import { goto } from './router.js'
import { showToast } from './utils.js'
import { initMain } from './tabs.js'

export function initOTP() {
  const boxes = Array.from(document.querySelectorAll('.otp-box'))
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      box.value = box.value.replace(/\D/g, '').slice(-1)
      box.classList.toggle('filled', box.value.length > 0)
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus()
    })
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        boxes[i - 1].value = ''
        boxes[i - 1].classList.remove('filled')
        boxes[i - 1].focus()
      }
    })
  })
}

export function loginAction() {
  const email = document.querySelector('#s-login input[type="email"]')?.value.trim()
  const pw    = document.getElementById('li-pw')?.value
  if (!email) { showToast('Please enter your email'); return }
  if (!pw)    { showToast('Please enter your password'); return }
  goto('s-main')
  initMain()
}

export function signupAction() {
  const name = document.querySelector('#s-signup input[type="text"]')?.value.trim()
  const email = document.querySelector('#s-signup input[type="email"]')?.value.trim()
  const pw    = document.getElementById('su-pw')?.value
  const pw2   = document.querySelector('#s-signup input[placeholder="Repeat password"]')?.value
  if (!name)                 { showToast('Please enter your name'); return }
  if (!email)                { showToast('Please enter your email'); return }
  if (!pw || pw.length < 8)  { showToast('Password must be at least 8 characters'); return }
  if (pw !== pw2)            { showToast('Passwords do not match'); return }
  goto('s-created')
}

export function verifyOTP() {
  const boxes = Array.from(document.querySelectorAll('.otp-box'))
  const filled = boxes.filter(b => b.value.trim().length > 0)
  if (filled.length < 6) { showToast('Enter all 6 digits first'); return }
  goto('s-main')
  initMain()
}

let _resendTimer = null
export function resendCode() {
  if (_resendTimer) return
  showToast('✓ Code resent to your email')
  let secs = 30
  const link = document.getElementById('resend-link')
  if (link) link.textContent = `Resend in ${secs}s`
  _resendTimer = setInterval(() => {
    secs--
    if (link) link.textContent = secs > 0 ? `Resend in ${secs}s` : 'Resend code'
    if (secs <= 0) { clearInterval(_resendTimer); _resendTimer = null }
  }, 1000)
}

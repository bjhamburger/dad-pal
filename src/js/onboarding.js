import { goto } from './router.js'
import { initMain } from './tabs.js'

const STEP_COUNT = 6
let step = 0

export function startOb() {
  step = 0
  render()
}

export function obNext() {
  if (step < STEP_COUNT - 1) { step++; render() }
  else { goto('s-main'); initMain() }
}

export function obSkip() {
  if (step === STEP_COUNT - 1) goto('s-login')
  else { goto('s-main'); initMain() }
}

function render() {
  for (let i = 0; i < STEP_COUNT; i++) {
    document.getElementById(`ob-${i}`)?.classList.toggle('active', i === step)
  }

  document.querySelectorAll('.ob-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === step)
  })

  const nextBtn = document.getElementById('ob-next')
  const skipBtn = document.getElementById('ob-skip')
  if (!nextBtn || !skipBtn) return

  if (step === 0) {
    nextBtn.textContent = 'Get Started'
    skipBtn.textContent = 'I already have an account'
  } else if (step === STEP_COUNT - 1) {
    nextBtn.textContent = 'I Accept & Continue'
    skipBtn.textContent = 'Decline'
  } else {
    nextBtn.textContent = 'Next'
    skipBtn.textContent = 'Skip'
  }
}

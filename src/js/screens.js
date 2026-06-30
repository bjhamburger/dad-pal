import { goto } from './router.js'
import { showToast } from './utils.js'
import { ARTICLES, MEALS } from './data.js'

// ── Article reader ────────────────────────────────────────────
export function openArticle(i) {
  const a = ARTICLES[i]
  if (!a) return

  document.getElementById('art-hero').innerHTML = `
    <div class="art-rdr-hero ${a.heroClass}">
      <div class="art-rdr-ico">${a.emoji}</div>
      <div class="art-rdr-cat">${a.cat}</div>
    </div>
    <div class="ph pt-16">
      <h1 class="h1">${a.title}</h1>
      <div class="art-rdr-meta mt-8">${a.meta}</div>
    </div>
  `
  document.getElementById('art-body').innerHTML = a.body

  goto('s-article')
}

// ── Meal detail ───────────────────────────────────────────────
export function openMeal(i) {
  const m = MEALS[i]
  if (!m) return

  document.getElementById('meal-hero').innerHTML = `
    <div class="meal-rdr-hero ${m.thumbClass}">${m.emoji}</div>
    <div class="ph pt-12">
      <div class="meal-rdr-age">${m.age}</div>
      <h1 class="h1 mt-4">${m.name}</h1>
      <div class="allergen-row">
        ${m.allergens.length
          ? m.allergens.map(a => `<span class="allergen-badge allergen-warn">⚠️ ${a}</span>`).join('')
          : '<span class="allergen-badge allergen-none">✓ No major allergens</span>'
        }
      </div>
    </div>
  `

  document.getElementById('meal-body').innerHTML = `
    <div class="recipe-section">
      <div class="recipe-title">Ingredients</div>
      <div class="ingredient-list">
        ${m.ingredients.map(ing => `
          <div class="ingredient-item">
            <div class="ingredient-dot"></div>
            <span>${ing}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="recipe-section">
      <div class="recipe-title">Steps</div>
      <div class="step-list">
        ${m.steps.map((s, idx) => `
          <div class="step-item">
            <div class="step-num">${idx + 1}</div>
            <div class="step-txt">${s}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="meal-tip">
      <div class="meal-tip-label">Dad tip</div>
      ${m.tip}
    </div>

    <div class="recipe-section">
      <div class="recipe-title">Serving size</div>
      <div class="ingredient-item" style="margin-top:4px">
        <div class="ingredient-dot"></div>
        <span>${m.serving}</span>
      </div>
    </div>
  `

  document.getElementById('meal-log-btn').onclick = () => {
    goto('s-main')
    setTimeout(() => showToast(`✓ ${m.name} logged`), 200)
  }

  goto('s-meal-detail')
}

// ── Add-food bottom sheet ─────────────────────────────────────
export function openAddFood() {
  const overlay = document.getElementById('modal-add-food')
  if (!overlay) return
  overlay.classList.add('open')
  // reset form
  overlay.querySelectorAll('.food-type-btn').forEach((b, i) => {
    b.classList.toggle('selected', i === 0)
  })
  const amtInput = document.getElementById('food-amount')
  if (amtInput) amtInput.value = ''
  const noteInput = document.getElementById('food-note')
  if (noteInput) noteInput.value = ''
  const timeInput = document.getElementById('food-time')
  if (timeInput) {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    timeInput.value = `${hh}:${mm}`
  }
}

export function closeModal(event) {
  if (!event || event.target === event.currentTarget) {
    document.getElementById('modal-add-food')?.classList.remove('open')
  }
}

export function selectFoodType(btn) {
  btn.closest('.food-types')?.querySelectorAll('.food-type-btn').forEach(b => b.classList.remove('selected'))
  btn.classList.add('selected')
}

export function submitFood() {
  const type = document.querySelector('.food-type-btn.selected')?.dataset.type || 'Breast milk'
  const amount = document.getElementById('food-amount')?.value.trim()
  const time = document.getElementById('food-time')?.value || 'Now'

  if (!amount) {
    showToast('Enter an amount first')
    return
  }

  document.getElementById('modal-add-food')?.classList.remove('open')

  const emoji = { 'Breast milk': '🍼', Formula: '🍼', Puree: '🥣', Solid: '🍞' }[type] || '🍼'
  const timeLabel = formatTime(time)

  const logEl = document.createElement('div')
  logEl.className = 'log-e log-e--new'
  logEl.innerHTML = `
    <div class="log-ico">${emoji}</div>
    <div class="log-inf">
      <div class="log-name">${type}</div>
      <div class="log-meta">${amount} · ${type === 'Breast milk' || type === 'Formula' ? 'Bottle' : 'Solids'}</div>
    </div>
    <div class="log-time">${timeLabel}</div>
  `

  // Prepend to the feeding log list
  const feedList = document.querySelector('#tp-feeding .log-list')
  if (feedList) feedList.prepend(logEl)

  showToast(`✓ ${type} entry logged`)
}

function formatTime(val) {
  if (!val) return 'Now'
  const [h, m] = val.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

// ── Milestone toggle ──────────────────────────────────────────
export function toggleMs(el) {
  const check = el.querySelector('.ms-check')
  if (!check) return
  const isDone = check.classList.contains('ms-done')
  const newDone = !isDone

  setMsCheck(check, newDone)
  if (newDone) showToast('🎉 Milestone achieved!')

  const id = el.dataset.msId
  if (id) {
    document.querySelectorAll(`[data-ms-id="${id}"]`).forEach(item => {
      if (item !== el) setMsCheck(item.querySelector('.ms-check'), newDone)
    })
  }
}

function setMsCheck(check, done) {
  if (!check) return
  check.className = `ms-check ${done ? 'ms-done' : 'ms-pend'}`
  check.textContent = done ? '✓' : ''
}

// ── Dark mode ─────────────────────────────────────────────────
export function toggleDark() {
  const phone = document.querySelector('.phone')
  const on = phone.classList.toggle('dark-mode')
  const toggle = document.getElementById('dark-status')
  if (toggle) toggle.classList.toggle('on', on)
  showToast(on ? '🌙 Dark mode on' : '☀️ Dark mode off')
}

// ── Accessibility helpers ──────────────────────────────────────

function syncToggle(id, on) {
  const el = document.getElementById(id)
  if (el) el.classList.toggle('on', on)
}

export function toggleHighContrast() {
  const on = document.querySelector('.phone').classList.toggle('high-contrast')
  syncToggle('a11y-contrast-sw', on)
  showToast(on ? 'High contrast on — WCAG AA' : 'High contrast off')
}

export function toggleReduceMotion() {
  const on = document.querySelector('.phone').classList.toggle('reduce-motion')
  syncToggle('a11y-motion-sw', on)
  showToast(on ? 'Reduce motion on' : 'Reduce motion off')
}

export function toggleBoldText() {
  const on = document.querySelector('.phone').classList.toggle('bold-text')
  syncToggle('a11y-bold-sw', on)
  showToast(on ? 'Bold text on' : 'Bold text off')
}

export function toggleLargeTap() {
  const phone = document.querySelector('.phone')
  const on = phone.classList.toggle('large-tap')
  phone.classList.remove('compact')
  syncToggle('ux-tap-sw', on)
  syncToggle('ux-compact-sw', false)
  showToast(on ? 'Large tap areas on — Fitts\'s Law' : 'Standard tap areas')
}

export function toggleCompact() {
  const phone = document.querySelector('.phone')
  const on = phone.classList.toggle('compact')
  phone.classList.remove('large-tap')
  syncToggle('ux-compact-sw', on)
  syncToggle('ux-tap-sw', false)
  showToast(on ? 'Compact view on — Hick\'s Law' : 'Standard view')
}

// Text size — injects a style tag to scale key text
const TEXT_PX = { sm: [13, 11, 10], md: [15, 13, 11], lg: [17, 15, 13], xl: [19, 17, 15] }

export function setTextSize(btn, size) {
  document.querySelectorAll('.seg-btn[data-size]').forEach(b => b.classList.remove('active'))
  if (btn) btn.classList.add('active')

  let el = document.getElementById('a11y-text-style')
  if (!el) { el = document.createElement('style'); el.id = 'a11y-text-style'; document.head.appendChild(el) }

  const [body, sub, cap] = TEXT_PX[size] || TEXT_PX.md
  el.textContent = `
    .phone .log-name,.phone .act-lbl,.phone .meal-name,.phone .si-lbl,
    .phone .ms-lbl,.phone .baby-name,.phone .home-date,.phone .auth-subtitle { font-size: ${body}px !important; }
    .phone .log-meta,.phone .act-sub,.phone .meal-age,.phone .art-meta,
    .phone .log-time,.phone .ms-age,.phone .art-cat { font-size: ${sub}px !important; }
    .phone .otp-resend,.phone .auth-hint,.phone .fsl,.phone .sl { font-size: ${cap}px !important; }
  `
  showToast(`Text size: ${size.toUpperCase()}`)
}

export function openDesignPrinciples() {
  goto('s-principles')
}

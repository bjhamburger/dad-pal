import '../css/main.css'

import { goto }                                    from './router.js'
import { showToast, togglePw, toggleCb, startClock } from './utils.js'
import { initOTP, loginAction, signupAction, verifyOTP, resendCode } from './auth.js'
import { startOb, obNext, obSkip }         from './onboarding.js'
import { initMain, switchTab, filterChip } from './tabs.js'
import { openArticle, openMeal, openAddFood, closeModal, selectFoodType, submitFood, toggleMs, toggleDark, toggleHighContrast, toggleReduceMotion, toggleBoldText, toggleLargeTap, toggleCompact, setTextSize, openDesignPrinciples } from './screens.js'

// Expose to global scope for HTML onclick handlers
window.goto          = goto
window.showToast     = showToast
window.togglePw      = togglePw
window.toggleCb      = toggleCb
window.loginAction   = loginAction
window.signupAction  = signupAction
window.verifyOTP     = verifyOTP
window.resendCode    = resendCode
window.startOb       = startOb
window.obNext        = obNext
window.obSkip        = obSkip
window.initMain      = initMain
window.switchTab     = switchTab
window.filterChip    = filterChip
window.openArticle   = openArticle
window.openMeal      = openMeal
window.openAddFood   = openAddFood
window.closeModal    = closeModal
window.selectFoodType = selectFoodType
window.submitFood    = submitFood
window.toggleMs      = toggleMs
window.toggleDark            = toggleDark
window.toggleHighContrast    = toggleHighContrast
window.toggleReduceMotion    = toggleReduceMotion
window.toggleBoldText        = toggleBoldText
window.toggleLargeTap        = toggleLargeTap
window.toggleCompact         = toggleCompact
window.setTextSize           = setTextSize
window.openDesignPrinciples  = openDesignPrinciples

// Boot
startClock()
document.getElementById('s-splash').addEventListener('click', () => goto('s-login'))
setTimeout(() => goto('s-login'), 2500)
initOTP()

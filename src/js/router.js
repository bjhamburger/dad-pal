let current = 's-splash'

export function goto(id) {
  const from = document.getElementById(current)
  const to = document.getElementById(id)
  if (!to) return
  from?.classList.remove('active')
  to.classList.add('active')
  current = id
}

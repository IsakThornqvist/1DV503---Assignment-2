document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.subjectName').forEach(button => {
    button.addEventListener('click', () => {
      const subject = button.dataset.subject
      window.location.href = `/books?subject=${encodeURIComponent(subject)}`
    })
  })
})
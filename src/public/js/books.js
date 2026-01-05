/**
 * Adds click event listeners to all elements with the class 'subjectName'.
 * When clicked, redirects the browser to the books page filtered by the selected subject.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.subjectName').forEach(button => {
    button.addEventListener('click', () => {
      const subject = button.dataset.subject
      window.location.href = `/books?subject=${encodeURIComponent(subject)}`
    })
  })
})
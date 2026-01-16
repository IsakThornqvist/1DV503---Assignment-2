
/**
 * Adds click event listeners to all elements with the class 'subjectName'.
 * When clicked, redirects the browser to the books page filtered by the selected subject.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.subjectName').forEach(button => {
    button.addEventListener('click', () => {
      const clickedSubject = button.dataset.subject
      const urlParams = new URLSearchParams(window.location.search)
      
      urlParams.set('subject', clickedSubject)
      urlParams.delete('page') // filtering reset
      
      window.location.href = `/books?${urlParams.toString()}`
    })
  })

  const searchForm = document.getElementById('searchForm')
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const authorInput = document.getElementById('searchInput')
      const authorValue = authorInput.value.trim()
      
      const urlParams = new URLSearchParams(window.location.search)
      
      if (authorValue) {
        urlParams.set('author', authorValue)
      } else {
        urlParams.delete('author')
      }
      
      urlParams.delete('page')
      
      window.location.href = `/books?${urlParams.toString()}`
    })
  }
})

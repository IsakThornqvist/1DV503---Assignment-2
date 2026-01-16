
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

  const aSearchForm = document.getElementById('aSearchForm')
  if (aSearchForm) {
    aSearchForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const authorInput = document.getElementById('aSearchInput')
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
  
  const tSearchForm = document.getElementById('tSearchForm')
  if (tSearchForm) {
    tSearchForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const titleInput = document.getElementById('tSearchInput')
      const titleValue = titleInput.value.trim()
      
      const urlParams = new URLSearchParams(window.location.search)
      
      if (titleValue) {
        urlParams.set('title', titleValue)
      } else {
        urlParams.delete('title')
      }
      
      urlParams.delete('page')
      
      window.location.href = `/books?${urlParams.toString()}`
    })
  }
})


/**
 * Adds click event listeners to all elements with the class 'subjectName'.
 * When clicked, redirects the browser to the books page filtered by the selected subject.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.subjectName').forEach(button => {
    button.addEventListener('click', () => {
      const clickedSubject = button.dataset.subject
      console.log(clickedSubject)
      const urlParamSubject = new URLSearchParams(window.location.search)
      console.log(urlParamSubject)

      urlParamSubject.set('subject', clickedSubject)


      window.location.href = `/books?${urlParamSubject.toString()}`
    })
  })

/**
 * Adds click event listeners to all elements with the class 'authorName'.
 * When clicked, redirects the browser to the books page filtered by the selected author.
 */
  document.querySelectorAll('.authorName').forEach(button => {
    button.addEventListener('click', () => {
      const clickedAuthor = button.dataset.author
      console.log(clickedAuthor)
      const urlParamAuthor = new URLSearchParams(window.location.search)
      console.log(urlParamAuthor)

      urlParamAuthor.set('author', clickedAuthor)


      window.location.href = `/books?${urlParamAuthor.toString()}`
    })
  })
})

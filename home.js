function homePage() {
  const contentArticle = document.getElementById("content");
  
  console.log("Loading home page content...");
  
  const h2 = document.createElement('h2');
  h2.classList.add('content__title');
  h2.textContent = 'Welcome to our website about Pride and Prejudice.';
  
  const p1 = document.createElement('p');
  p1.textContent = 'Welcome to our website! On this website we will talk about the book "Pride and Prejudice", information on the author Jane Austen, some recommendations and lastly you can check what other people think of the book.';
  
  const p2 = document.createElement('p');
  p2.textContent = 'It is made as an assignment for the class Webtechnology, feel free to roam around on our website and enjoy!';
  
  const div = document.createElement('div');
  div.classList.add('section__centerElements');
  
  const a1 = document.createElement('a');
  a1.href = 'info.html';
  a1.classList.add('content__button');
  a1.textContent = 'Learn more about the book';
  
  const a2 = document.createElement('a');
  a2.href = 'author.html';
  a2.classList.add('content__button');
  a2.textContent = 'Learn more about the author';
  
  div.appendChild(a1);
  div.appendChild(a2);
  
  contentArticle.appendChild(h2);
  contentArticle.appendChild(p1);
  contentArticle.appendChild(p2);
  contentArticle.appendChild(div);
}
const data = [
  {
    date: '3 min ago',
    img: './assets/img/img1.jpg',
    user: 'eric',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has'
      + ' even longer.',
    comments: 64,
    likes: 304,
  },
  {
    date: '15 min ago',
    img: './assets/img/img2.jpg',
    user: 'paul',
    description: 'Even longer content than the first to show that equal height action.',
    comments: 22,
    likes: 90,
  },
  {
    date: '43 min ago',
    img: './assets/img/img3.jpg',
    user: 'john',
    description: 'Content than the first to show that equal height action.',
    comments: 5,
    likes: 43,
  },
  {
    date: '47 min ago',
    img: './assets/img/img4.jpg',
    user: 'marty',
    description: 'Supporting text below as a natural lead-in to additional content. Longer content than the first to show that'
      + ' equal height action.',
    comments: 7,
    likes: 12,
  },
  {
    date: '58 min ago',
    img: './assets/img/img5.jpg',
    user: 'steve',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has'
      + ' even longer content than the first to show that equal height action.',
    comments: 2,
    likes: 6,
  }
];

const setLike = element => {
  const likeContainer = element.querySelector('.like');
  const likes = parseInt(likeContainer.dataset.like);
  likeContainer.dataset.like = likes + 1;
}

// print all
(function() {
  const container = document.querySelector('#card-grid');
  data.forEach(entry => {
    const template = document.createElement('div');
    template.classList = 'card';
    template.innerHTML = ` 
      <img src="${entry.img}" class="card-img-top" alt="${entry.user}"/>
      <div class="card-body">
        <div class="card-top">
                <header>
          <aside>${entry.date}</aside>
          <div onclick="setLike(this)" class="bg-danger heart-container text-white">
              <i class="bi bi-heart-fill"></i>
              <span class="like" data-like="${entry.likes}"></span>
          </div>
        </header>
        <h6 class="card-title fw-bold">@${entry.user}</h6>
        </div>
        <article>
          <p class="card-text">${entry.description}</p>
          <p class="card-text">
            <small class="text-muted align-items-center d-flex">
              <i class="bi bi-chat-right me-2"></i>
              <span>Comments (${entry.comments})</span>
            </small>
          </p>
         </article>
      </div>
    `;
    container.appendChild(template);
  })
})();
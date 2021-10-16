let messageDelay;
const form = {
  name: document.querySelector('input[name="name"]'),
  price: document.querySelector('input[name="price"]'),
  image: document.querySelector('input[name="image"]'),
  description: document.querySelector('textarea[name="description"]'),
  clean () {
    Object
      .keys(this)
      .filter(key => key !== 'clean')
      .forEach(key => this[key].value = '');
  }
};

const addGuitar = e => {
  e.preventDefault();
  const errors = [];
  const cleanedData = {};
  Object.keys(form).forEach(key => {
    const { value } = form[key];
    cleanedData[key] = value;
    switch (key) {
      case 'name':
      case 'image':
      case 'description':
        if (value === '')
          errors.push(`Need valid ${ key }`);
        break;
      case 'price':
        if (value === '' || isNaN(value))
          errors.push(`Need valid ${ key }`);
        break;
    }
  });
  const isValid = errors.length === 0;
  if (!isValid)
    printUIMessage({
      message: errors.map(entry => entry + '\n').join('<br/>'),
      type: 'danger',
    });
  else {
    createNewChild(cleanedData);
    form.clean();
    printUIMessage({
      message: 'Guitar created successfuly',
      type: 'success',
    })
  }
};

const createNewChild = cleanedData => {
  const { name, price, image, description } = cleanedData;
  const template = `
      <img src="${ image }" class="card-img-top img-fluid" alt="${ name }">
      <div class="card-body">
          <h5 class="card-title">${ name }</h5>
          <p class="card-text">${ description }</p>
          <a href="#" class="btn btn-primary">$ ${ price }.-</a>
      </div>
    `;
  const container = document.querySelector('section.gridtainer');
  const content = document.createElement('div');
  content.classList.add('card', 'shadow-sm');
  content.innerHTML = template;
  container.appendChild(content);
};

const printUIMessage = ({ message, type }) => {
  const container = document.querySelector('aside.message');
  container.classList.add(type)
  container.innerHTML = message;
  if (messageDelay !== undefined) clearTimeout(messageDelay);
  messageDelay = setTimeout(() => {
    container.classList.remove(type);
    container.innerHTML = '';
  }, 3000);
}

(() => {
  const data = [
    {
      name: 'Stratocaster',
      price: 1590,
      image: 'assets/img/stratocaster.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adip',
    },
    {
      name: 'Telecaster',
      price: 2090,
      image: 'assets/img/telecaster.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adip',
    },
    {
      name: 'LesPaul',
      price: 3200,
      image: 'assets/img/lespaul.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adip',
    },
  ];
  data.forEach(cleanData => createNewChild(cleanData));
  document.querySelector('form').addEventListener('submit', addGuitar);
})();
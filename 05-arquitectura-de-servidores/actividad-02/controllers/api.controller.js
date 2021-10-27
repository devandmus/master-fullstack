import handlerError from 'http-errors';
import PostModel from '../models/post.model.js';

// 1. POST /api/posts
// - Recibe body JSON con los campos title, text y author.
// - Devuelve HTTP 201 con el detalle JSON del Post creado en la Base de Datos en memoria
// - Devuelve HTTP 400 si hay errores en la validación del body de la petición contra el esquema definido

const create = (req, res, next) => {
  // decidí programarlo como sigue para explorar otras opciones a la vista en clase
  const { title, text, author } = req.body
  const instance = new PostModel({ title, text, author });
  const error = instance.validateSync();
  if(error) {
    const errorMessage = Object
      .keys(error.errors)
      .map(key => ({
        value: key,
        message: error.errors[key].message
      }))
    return next(handlerError(400, { errors: errorMessage }));
  }
  instance.save();
  return res
    .status(201)
    .json(instance)
}


// 2. GET /api/posts
// - Devuelve HTTP 200 OK con el listado JSON de posts almacenados en la Base de Datos en memoria

const list = (req, res, next) => (
  PostModel
    .find()
    .then(posts => res.json(
      // decidí enviar desde el más reciente al más viejo por fecha de creación
      posts.sort((a, b) => {
      if(a.createdAt < b.createdAt)
        return 1
      else if (a.createdAt > b.createdAt)
        return -1
      return 0
    })))
    .catch(next)
)


// 3. GET /api/posts/<id>
// - Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria
// - Devuelve 404 si el post no existe en la Base de Datos en memoria

const detail = (req, res, next) => {
  const { id } = req.params;
  return PostModel
    .findById(id)
    .then(post => {
      if(post)
        return res
          .status(200)
          .json(post)
      throw Error(null);
    })
    .catch(() => next(handlerError(404, 'Post no existe')))
}



// 4. PATCH /api/posts/<id>
// - Recibe body JSON con alguno de los campos title, text y author.
// - Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria tras modificar sus atributos con lo indicado en el body
// - Devuelve 404 si el post no existe en la Base de Datos en memoria

const update = (req, res, next) => {
  const { id } = req.params;
  const { title, text, author } = req.body;

  return PostModel
    .findByIdAndUpdate(
      id,
      { title, text, author },
      { new: true }
    )
    .then(post => {
      if(post)
        return res
          .status(200)
          .json(post);
      throw Error(null);
    })
    .catch(() => next(handlerError(404, 'Post no existe')))
}



// 5. DELETE /api/posts/<id>
// - Devuelve HTTP 204 tras eliminar el post id == <id> de la Base de Datos en memoria
// - Devuelve 404 si el post no existe en la Base de Datos en memoria

const remove = (req, res, next) => {
  const { id } = req.params;
  return PostModel
    .findByIdAndDelete(id)
    .then(() => {
      return res
        .status(204)
        .send()
    })
    .catch(() => next(handlerError(404, 'Post no existe')));
}

export {
  create,
  list,
  detail,
  update,
  remove,
}
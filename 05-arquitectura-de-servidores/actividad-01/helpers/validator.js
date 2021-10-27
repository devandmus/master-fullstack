// Como se pidió validar, desarrollé una clase que capaz de validar
// el nombre y tipo del campo, me hubiese gustado hacerlo en typescript
// con una interface, pero supongo salía del marco
class EmployeeValidator {
  len = 8;

  constructor(obj) {
    this.obj = obj;
    this.keys = Object.keys(obj);
  }

  validate(key, prefix, object = this.obj) {
    const type = {
      a: 'object',
      n: 'number',
      o: 'object',
      s: 'string',
    }
    return key in object && (typeof object[key] === type[prefix]);
  }

  hasName() {
    return this.validate('name', 's')
  }

  hasAge() {
    return this.validate('age', 'n')
  }

  hasPhone() {
    const scope = this.obj.phone;
    return this.validate('phone', 'o') && (
      this.validate('personal', 's', scope)
      && this.validate('work', 's', scope)
      && this.validate('ext', 's', scope)
    )
  }

  hasPrivileges() {
    return this.validate('privileges', 's')
  }

  hasFavorites() {
    const scope = this.obj.favorites;
    return this.validate('favorites', 'o') && (
      this.validate('artist', 's', scope)
      && this.validate('food', 's', scope)
    )
  }

  hasFinished() {
    return this.validate('finished', 'a') && (
      this.obj.finished.every(n => typeof n === 'number')
    )
  }

  hasBadges() {
    return this.validate('badges', 'a') && (
      this.obj.badges.every(n => typeof n === 'string')
    )
  }

  hasPoints() {
    return this.validate('points', 'a') && (
      this.obj.points.every(n => (
        typeof n === 'object'
        && this.validate('points', 'n', n)
        && this.validate('bonus', 'n', n)
      ))
    )
  }

  isValid() {
    // llama los métodos que empiezan con "has", me pareció un buen
    // ejercicio
    const havingAll = this.keys.every(key => (
      this[`has${
        key.charAt(0).toUpperCase()
        + key.slice(1).toLowerCase()
      }`]()
    ));
    return this.keys.length === this.len && havingAll;
  }
}

module.exports.EmployeeValidator = EmployeeValidator;
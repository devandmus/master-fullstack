// casos de prueba
const cases = [
  '(16+4)/5-{5+8}*[1-2]',
  '5*9-3+{2-1}*(9-[24/8])',
  '[{(15-5)*5}/2]+(8-2)*{25+2}',
  '{3+5}*2/(4+4)+0*(-68+25',
  '(1 + (2-3))',
  '(1.2 + 1.3)',
];

const patternsByGroup = [['(', ')'], ['{', '}'], ['[', ']']];

const simpleInputFilter = str => {
  const allowedPatterns =
    patternsByGroup
      .reduce((prev, current) => {
        prev.push(...current);
        return prev;
      }, []);

  const allowed =
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/']
      .concat(allowedPatterns);

  const hasOnlyAllowed =
    str
      .split('')
      .every(letter => allowed.includes(letter));

  const charCounterObject =
    str
      .split('')
      .reduce((counts, char) => {
        counts[char] = (counts[char] || 0) + 1
        return counts
      }, Object.create(null));

  const simpleOnlyValidPatternsFilter =
    patternsByGroup
      .every(pattern => charCounterObject[pattern[0]] === charCounterObject[pattern[1]]);

  return (hasOnlyAllowed && simpleOnlyValidPatternsFilter);
}

const ERROR =  new Error('Syntax Error').message;

const calc = expression => {
  try {
    return (new Function(`return ${expression}`))()
  }
  catch (err) {
    return ERROR;
  }
}

const patternExist = str => {
  return patternsByGroup.some(pattern =>
    str.includes(pattern[0]) && str.includes(pattern[1])
  );
}

const scopeValidator = (str, pattern) => {
  const structure = {
    open: 0,
    close: 0,
    startAt: null,
    finishAt: null,
    findedPattern: null,
  }
  str
    .split('')
    .forEach((letter, indexLetter) => {
      if (letter === pattern[0]) {
        structure.open++;
        if (structure.startAt === null)
          structure.startAt = indexLetter + 1;
      }
      else if (letter === pattern[1]) {
        structure.close++;
        if (
          structure.startAt !== null
          && structure.finishAt === null
          && letter === pattern[1]
          && indexLetter > structure.startAt
          && structure.open === structure.close
        )
        {
          structure.finishAt = indexLetter;
          structure.findedPattern = str.slice(structure.startAt, structure.finishAt);
        }
      }
    });
  if (!patternExist(structure.findedPattern)) {
    return [
      [pattern[0], structure.findedPattern, pattern[1]].join(''),
      structure.findedPattern,
      null,
    ];
  }

  else if (structure.startAt === null || structure.finishAt === null) {
    return [null, null, true];
  }

  return [
    structure.findedPattern,
    null,
    null,
  ];
}

const resolver = str => {
  let isValid = true;
  let string = str.split(' ').join('');
  let fragment = string;

  if (!simpleInputFilter(string))
    isValid = false;

  while (patternExist(string) && isValid) {
    patternsByGroup.forEach(pattern => {
      const hasPattern = fragment.includes(pattern[0]) && fragment.includes(pattern[1]);
      if (hasPattern) {
        const [rawString, cleanedString, error] = scopeValidator(fragment, pattern);
        if (cleanedString) {
          string = string.replace(
            rawString,
            calc(cleanedString),
          );
          fragment = string;
        }
        else if (rawString)
          fragment = rawString;
        else if (error)
          isValid = false;
      }
    });
  }

  if (!isValid)
    return ERROR;
  else {
    return calc(string);
  }
}

const response = cases.map(entry => resolver(entry));

console.log(response.join('\n'));



//
// // posibles patrones expresiones regulares
// const patterns = [
//   new RegExp(/\[(.*?)]/),
//   new RegExp(/\{(.*?)}/),
//   new RegExp(/\((.*?)\)/),
// ];
//
// // helper para convertir string en función matemática
// const calc = expression => (new Function(`return ${expression}`))();
//
// // helper para verificar si existe una expresión regular en una cadena
// const regexSeach = fr => {
//   let fragment;
//   for (let i = 0; i < patterns.length; i++) {
//     fragment = fr.match(patterns[i]);
//     if (fragment) {
//       return fragment;
//     }
//   }
//   return false;
// }
//
// // main resolver
// const resolver = str => {
//   if (str.includes('.'))
//     return new Error('Error: sólo acepta números enteros').message;
//   let string = str;
//   let arrFragment = null;
//   let searching = true;
//   while (searching) {
//     if (arrFragment) {
//       const hasArrFragment = regexSeach(arrFragment[1]);
//       if (hasArrFragment)
//         arrFragment = hasArrFragment;
//       else {
//         // toma el scope de expresión regular
//         const regexString = arrFragment[0];
//         // toma la ecuación en la expresión y la calcula
//         const mathResolved = calc(arrFragment[1]);
//         string = string.replace(regexString, mathResolved);
//         arrFragment = null;
//       }
//     }
//     else {
//       // si arrFragment está vacío, intenta obtener otra expresión regular
//       arrFragment = regexSeach(string);
//       // cuando ya no quedan expresiones regulares en la cadena, deja de buscar
//       if (typeof arrFragment !== typeof []) {
//         searching = false;
//       }
//     }
//   }
//   try {
//     // evalúa toda la cadena matemáticamente
//     return calc(string);
//   }
//   catch (err) {
//     return new Error('Syntax Error').message
//   }
// };
//



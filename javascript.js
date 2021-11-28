const calc = expression => new Function(expression);

const patternMatch = str => {
 const patterns = [
  new RegExp(/\[(.*?)]/),
  new RegExp(/\{(.*?)}/),
  new RegExp(/\((.*?)\)/),
 ];

 let i = 0;
 for (;patterns.length > i; i++) {

 }

 str.

 const
};

const resolver = str => {


}

const response = resolver('(16+4)/5-{5+8}*[1-2]');

console.log(response)

const b = `
  (16+4)/5-{5+8}*[1-2] → 17
  5*9-3+{2-1}*(9-[24/8]) → 48
  [{(15-5)*5}/2]+(8-2)*{25+2} → 187
  {3+5}*2/(4+4)+0*(-68+25 → Syntax Error
 `;


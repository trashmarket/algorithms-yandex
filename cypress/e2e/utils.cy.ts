export const should = ($div:any, classreg: RegExp) => {

  const className = $div[0].className

  expect(className).to.match(classreg)
}
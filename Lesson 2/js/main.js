(function fooFunc() {
  let foo = 1;
  foo += 1;

  const bar = 10;
  foo += bar;
  return foo;
}());

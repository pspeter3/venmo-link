window.addEventListener("load", main, { once: true });

function main(): void {
  const generator = getElementById("generator", HTMLFormElement);
  const result = getElementById("result", HTMLAnchorElement);
  const copy = getElementById("copy", HTMLButtonElement);

  generator.addEventListener("submit", (event) => {
    event.preventDefault();
    render(generator, result);
  });
  generator.addEventListener("input", () => render(generator, result));
  copy.addEventListener("click", () =>
    navigator.clipboard.writeText(result.href)
  );

  render(generator, result);
}

function getElementById<T extends HTMLElement>(
  id: string,
  kind: { new (): T }
): T {
  const element = document.getElementById(id);
  if (!(element instanceof kind)) {
    throw new Error(`Could not find ${id}`);
  }
  return element;
}

function render(form: HTMLFormElement, anchor: HTMLAnchorElement): void {
  const url = new URL("https://venmo.com");
  for (const [key, value] of new FormData(form)) {
    if (value) {
      url.searchParams.set(key, value.toString());
    }
  }
  const result = url.toString();
  anchor.setAttribute("href", result);
  anchor.innerText = result;
}

function drinkForm({ drinks }) {
  return create(
    "form",
    {},
    ...drinks.map((o, i) => singleDrinkForm({ id: i + 1, ...o })),
    create(
      "div",
      {},
      create(
        "button",
        { type: "button", className: "add-button" },
        "+ Добавить напиток"
      )
    ),
    create(
      "div",
      { style: "margin-top: 30px" },
      create("button", { type: "submit", className: "submit-button" }, "Готово")
    )
  );
}

function singleDrinkForm({ id, types, milk, options }) {
  let fieldSet = create(
    "fieldset",
    { className: "beverage" },
    create("h4", (props = { className: "beverage-count" }), `Напиток №${id}`),
    create(
      "label",
      { className: "field" },
      create("span", { className: "label-text" }, "Я буду"),
      create(
        "select",
        {},
        ...types.values.map((o) =>
          option(
            { value: o.value, selected: o.value === types.selected },
            (v) => (types.selected = v),
            create("span", {}, o.text)
          )
        )
      )
    ),
    checkboxList(
      "radio",
      milk,
      (props, v) => (props.selected = v),
      (props, v) => props.selected === v
    ),
    checkboxList(
      "checkbox",
      options,
      (props, v) =>
        props.selected.includes(v)
          ? props.selected.remove(v)
          : props.selected.push(v),
      (props, v) => props.selected.includes(v)
    )
  );
  return fieldSet;
}

function checkboxList(inputType, props, changeSelected, checkSelected) {
  return create(
    "div",
    { className: "field" },
    checkboxLabel(props.label),
    ...props.values.map((o) =>
      create(
        "label",
        { className: "checkbox-field" },
        input(
          {
            type: inputType,
            name: props.name,
            value: o.value,
            checked: checkSelected(props, o.value),
          },
          (v) => changeSelected(props, v)
        ),
        create("span", {}, o.text)
      )
    )
  );
}

function checkboxLabel(text) {
  return create("span", { className: "checkbox-label" }, text);
}

/**
 * @param {HTMLElementTagNameMap['input']} props
 * @param {Function} onCheck
 */
function input(props, onCheck, ...children) {
  let elem = create("input", props, ...children);
  elem.addEventListener("changed", (e) => onCheck(e.target.value));
  return elem;
}

/**
 * @param {HTMLElementTagNameMap['option']} props
 * @param {Function} onCheck
 */
function option(props, onCheck, ...children) {
  let elem = create("option", props, ...children);
  elem.addEventListener("changed", (e) => onCheck(e.target.value));
  return elem;
}

/**'
 * @param {keyof HTMLElementTagNameMap} tagName
 * @param {HTMLElementTagNameMap[tagName]} props
 * @param {...HTMLElement[]} children
 * @returns {HTMLElementTagNameMap[tagName]}
 */
function create(tagName, props, ...children) {
  let elem = document.createElement(tagName);
  Object.keys(props).forEach((x) => (elem[x] = props[x]));
  elem.append(...children);
  return elem;
}

const defaultDrink = {
  types: {
    values: [
      {
        value: "espresso",
        text: "Эспрессо",
      },
      {
        value: "capuccino",
        text: "Капучино",
      },
      {
        value: "cacao",
        text: "Какао",
      },
    ],
    selected: "capuccino",
  },
  milk: {
    label: "Сделайте напиток на",
    name: "milk",
    values: [
      {
        value: "usual",
        text: "обычном молоке",
      },
      {
        value: "no-fat",
        text: "обезжиренном молоке",
      },
      {
        value: "soy",
        text: "соевом молоке",
      },
      {
        value: "coconut",
        text: "кокосовом молоке",
      },
    ],
    selected: "usual",
  },
  options: {
    label: "Добавьте к напитку:",
    name: "options",
    values: [
      {
        value: "espresso",
        text: "Эспрессо",
      },
      {
        value: "capuccino",
        text: "Капучино",
      },
      {
        value: "cacao",
        text: "Какао",
      },
    ],
    selected: ["capuccino"],
  },
};
drinks = [defaultDrink];

document.querySelector("body")
  .appendChild(drinkForm({ drinks }));

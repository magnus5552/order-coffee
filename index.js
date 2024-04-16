document.addEventListener("DOMContentLoaded", function () {
  let modal = document.querySelector(".modal");
  let modalContent = document.querySelector(".modal-content");
  let addButton = document.querySelector(".add-button");
  let modalClose = document.querySelector(".close");
  let beverageCount = 1;

  addButton.addEventListener("click", () => {
    beverageCount++;
    let newBeverage = createBeverageFieldset();
    addButton.parentNode.parentNode.insertBefore(newBeverage, addButton.parentNode);
  });

  addDeleteButtonListener(document.querySelector('.beverage'));

  document
    .querySelector(".submit-button")
    .addEventListener("click", (event) => {
      event.preventDefault();

      const beverages = document.querySelectorAll(".beverage");
    

      let orderText = `Заказ принят! Вы заказали ${beverageCount} ${getCorrectWordForm(
        beverageCount,
        "напиток"
      )}`;
      let tableContent = generateOrderTableContent(beverages);

      modalContent.innerHTML += `<p>${orderText}</p>${tableContent}`;
      modal.style.display = "block";
    });

  function createBeverageFieldset() {
    let newBeverage = document.querySelector("fieldset").cloneNode(true);
    newBeverage.innerHTML = newBeverage.innerHTML
      .replaceAll(`Напиток №1`, `Напиток №${beverageCount}`)
      .replaceAll("milk", `milk${beverageCount}`)
      .replaceAll("options", `options${beverageCount}`);

    addDeleteButtonListener(newBeverage);

    return newBeverage;
  }

  function addDeleteButtonListener(beverage) {
    beverage.querySelector('.delete-button').addEventListener("click", (e) => {
      if (beverageCount > 1) {
        beverageCount--;
        e.target.parentNode.remove();
      }
    });
  }

  function getCorrectWordForm(number, word) {
    if (number % 100 >= 11 && number % 100 <= 19) {
      return word + "ов";
    } else {
      switch (number % 10) {
        case 1:
          return word;
        case 2:
        case 3:
        case 4:
          return "напитка";
        default:
          return "напитков";
      }
    }
  }

  function generateOrderTableContent(beverages) {
    let content = `
        <table>
            <thead>
                <tr>
                    <th>Напиток</th>
                    <th>Молоко</th>
                    <th>Дополнительно</th>
                </tr>
            </thead>
            <tbody>
    `;

    beverages.forEach((beverage) => {
      let selectedMilk = beverage.querySelector(`input[type="radio"]:checked`)
        .nextElementSibling.textContent;
      if (selectedMilk === "обычном молоке") {
        selectedMilk = "обычное молоко";
      }
      if (selectedMilk === "обезжиренном молоке") {
        selectedMilk = "обезжиренное молоко";
      }
      if (selectedMilk === "соевом молоке") {
        selectedMilk = "соевое молоко";
      }
      if (selectedMilk === "кокосовом молоке") {
        selectedMilk = "кокосовое молоко";
      }

      let selectedOptions = [];
      beverage
        .querySelectorAll(`input[type="checkbox"]:checked`)
        .forEach((option) => {
          let optionText = option.nextElementSibling.textContent;

          if (optionText === "взбитых сливок") {
            optionText = "взбитые сливки";
          }
          if (optionText === "зефирок") {
            optionText = "зефирки";
          }
          if (optionText === "корицу") {
            optionText = "корица";
          }
          selectedOptions.push(optionText);
        });

      content += `
                <tr>
                    <td>${
                      beverage.querySelector("select").selectedOptions[0].text
                    }</td>
                    <td>${selectedMilk}</td>
                    <td>${selectedOptions.join(", ")}</td>
                </tr>
            `;
    });

    content += "</tbody></table>";

    return content;
  }
});

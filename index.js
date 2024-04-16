document.addEventListener("DOMContentLoaded", function () {
  let modal = document.querySelector(".modal");
  let modalContent = document.querySelector(".modal-content");
  let addButton = document.querySelector(".add-button");
  let modalClose = document.querySelector(".close");
  let beverageCount = 1;

  addButton.addEventListener("click", function () {
    beverageCount++;
    let newBeverage = createBeverageFieldset(beverageCount);
    addButton.parentNode.insertBefore(newBeverage, addButton);
  });

  document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    const beverages = document.querySelectorAll('.beverage');
    let totalBeverageCount = beverages.length;

    let orderText = `Заказ принят! Вы заказали ${totalBeverageCount} ${getCorrectWordForm(totalBeverageCount, 'напиток')}`;
    let tableContent = generateOrderTableContent(beverages);

    modalContent.innerHTML = `<p>${orderText}</p>${tableContent}`;
    modal.style.display = 'block';
  });

  function createBeverageFieldset(beverageCount) {
    let newBeverage = document.createElement('fieldset');
    newBeverage.classList.add('beverage');
    newBeverage.innerHTML = `
            <button class="delete-button" onclick="
                if (document.querySelectorAll('.beverage').length > 1) {
                    this.parentNode.remove();
                }
            ">❌</button>
            <h4 class="beverage-count">Напиток №${beverageCount}</h4>
            <label class="field">
                <span class="label-text">Я буду</span>
                <select>
                    <option value="espresso">Эспрессо</option>
                    <option value="capuccino" selected>Капучино</option>
                    <option value="cacao">Какао</option>
                </select>
            </label>
            <div class="field">
                <span class="checkbox-label">Сделайте напиток на</span>
                <label class="checkbox-field">
                    <input type="radio" name="milk${beverageCount}" value="usual" checked />
                    <span>обычном молоке</span>
                </label>
                <label class="checkbox-field">
                    <input type="radio" name="milk${beverageCount}" value="no-fat" />
                    <span>обезжиренном молоке</span>
                </label>
                <label class="checkbox-field">
                    <input type="radio" name="milk${beverageCount}" value="soy" />
                    <span>соевом молоке</span>
                </label>
                <label class="checkbox-field">
                    <input type="radio" name="milk${beverageCount}" value="coconut" />
                    <span>кокосовом молоке</span>
                </label>
            </div>
            <div class="field">
                <span class="checkbox-label">Добавьте к напитку:</span>
                <label class="checkbox-field">
                    <input type="checkbox" name="options${beverageCount}" value="whipped cream" />
                    <span>взбитых сливок</span>
                </label>
                <label class="checkbox-field">
                    <input type="checkbox" name="options${beverageCount}" value="marshmallow" />
                    <span>зефирок</span>
                </label>
                <label class="checkbox-field">
                    <input type="checkbox" name="options${beverageCount}" value="chocolate" />
                    <span>шоколад</span>
                </label>
                <label class="checkbox-field">
                    <input type="checkbox" name="options${beverageCount}" value="cinnamon" />
                    <span>корицу</span>
                </label>
            </div>
        `;

    return newBeverage;
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
      let selectedMilk = beverage.querySelector(`input[type="radio"]:checked`).nextElementSibling.textContent;
      if (selectedMilk === 'обычном молоке') {
        selectedMilk = 'обычное молоко';
      }
      if (selectedMilk === 'обезжиренном молоке') {
        selectedMilk = 'обезжиренное молоко';
      }
      if (selectedMilk === 'соевом молоке') {
        selectedMilk = 'соевое молоко';
      }
      if (selectedMilk === 'кокосовом молоке') {
        selectedMilk = 'кокосовое молоко';
      }

      let selectedOptions = [];
      beverage.querySelectorAll(`input[type="checkbox"]:checked`).forEach((option) => {
        let optionText = option.nextElementSibling.textContent;

        if (optionText === 'взбитых сливок') {
          optionText = 'взбитые сливки';
        }
        if (optionText === 'зефирок') {
          optionText = 'зефирки';
        }
        if (optionText === 'корицу') {
          optionText = 'корица';
        }
        selectedOptions.push(optionText);
      });

      content += `
                <tr>
                    <td>${beverage.querySelector('select').selectedOptions[0].text}</td>
                    <td>${selectedMilk}</td>
                    <td>${selectedOptions.join(', ')}</td>
                </tr>
            `;
    });

    content += '</tbody></table>';

    return content;
  }
});
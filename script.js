const images = [
    {
      image_name: 'bananas.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'birthday candles.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'blocks.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'brushes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'cakes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'cars.jpg',
      number_of_items: 2,
    },
    {
      image_name: 'crayons.jpg',
      number_of_items: 8,
    },
    {
      image_name: 'cupcakes.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'deer.jpg',
      number_of_items: 3,
    },
    {
      image_name: 'donuts.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'ducks.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'eggs.jpg',
      number_of_items: 8,
    },
    {
      image_name: 'elephants.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'hot air balloons.jpg',
      number_of_items: 5,
    },
    {
      image_name: 'jelly beans.jpg',
      number_of_items: 9,
    },
    {
      image_name: 'macaroons.jpg',
      number_of_items: 7,
    },
    {
      image_name: 'pencils.jpg',
      number_of_items: 12,
    },
    {
      image_name: 'people.jpg',
      number_of_items: 6,
    },
    {
      image_name: 'peppers.jpg',
      number_of_items: 2,
    },
    {
      image_name: 'pizza slices.jpg',
      number_of_items: 8,
    },
  ];

  const setImageSrc = (radomImageName) => {
    if (imageContainer.hasChildNodes()) {
        imageContainer.removeChild(imageContainer.firstElementChild);
    }
    const image = document.createElement("img");
    image.src = `images/${radomImageName}`;
    image.classList.add("fade");
    imageContainer.appendChild(image);
  }
  const timeSetting = 3000;
  let displayNumber = 0,
  currentImageValue = 0,
  score = 0,
  totalAvailable = images.length
  chosen = false;

  document.getElementById("statContent").style.visibility = "hidden";
  document.getElementById("currentScore").innerHTML = score;
  document.getElementById("totalAvailable").innerHTML = totalAvailable;
  document.getElementById("timeSetting").innerHTML = timeSetting / 1000;

  const match = () => {
    if (!chosen) {
        displayNumber === currentImageValue ? score++ : score--;
        document.getElementById("currentScore").innerHTML = score;
        chosen = true;
    }
  }

  const noMatch = () => {
    if (!chosen) {
        displayNumber !== currentImageValue ? score++ : score--;
        document.getElementById("currentScore").innerHTML = score;
        chosen = true;
    }
  }

  const generateDisplayNumber = (numberOfItems, plusOrMinus) => {
      const split = Math.floor(Math.random() * 2);
      if (split === 0) {
          // mostra o número correto
          document.getElementById("number").innerHTML = numberOfItems;
          displayNumber = numberOfItems;
      } else {
        // mostra número somando ou subtraíndo 1
        document.getElementById("number").innerHTML = numberOfItems + plusOrMinus;
        displayNumber = numberOfItems + plusOrMinus;
      }
  }
  const generatePlusOrMinus = () => {
      const number0to1 = Math.floor(Math.random() * 2);
      return number0to1 === 0 ? -1 : +1;
  }
  const generate = () => {
    if (images.length === 0) {
        endOfGame();
        stopTimer();
        return;
    }
    chosen = false;
    const randomNumber = Math.floor(Math.random() * images.length);
    const radomImageName = images[randomNumber].image_name;
    setImageSrc(radomImageName);
    const plusOrMinus = generatePlusOrMinus();
    const numberOfItems = images[randomNumber].number_of_items;
    currentImageValue = numberOfItems;
    generateDisplayNumber(numberOfItems, plusOrMinus);
    images.splice(randomNumber, 1);

    // document.getElementById("item-name").innerHTML = radomImageName.replace('.jpg', '');
    document.getElementById("item-name").innerHTML = radomImageName.slice(0, radomImageName.length - 4) + '?';
  };
  
  let timerRef;
  const timer = () => {
    timerRef = setInterval(generate, timeSetting);
  }

  const play = () => {
    document.getElementById("statContent").style.visibility = "visible";
    document.getElementById("message").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
      generate();
      timer();
  }

  const endOfGame = () => {
    document.getElementById("message").innerHTML = `O jogo acabou! Você acertou ${score} de ${totalAvailable} perguntas.`; 
    document.getElementById("message").style.display = "block";
    document.getElementById("imageContainer").style.display = "none";
    document.getElementById("statContent").style.display = "none";
    setTimeout(() => location.reload(), 3000);
  }

  const stopTimer = () => {
      clearInterval(timerRef);
  }
  
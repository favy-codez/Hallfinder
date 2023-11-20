// LISTING PAGE
const data = [
    {
      id: 1,
      name: "Citrine Hall",
      productDesc: "Citrine hall is adorned with exquisite decor , from luxurious chandeliers and draped fabrics to floral arrangements that enhance the ambiance and create a romantic atmosphere.",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-matheus-bertelli-16120160%201.png?updatedAt=1700382478079",
      price: 300000,
      cat: "Abuja",
      capacity: 200,
    },
    {
      id: 2,
      name: "Topaz Hall",
      productDesc: "Sophisticated lighting systems offer customizable options, allowing you to create the perfect mood and atmosphere, from romantic and intimate to vibrant and celebratory",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-rene-asmussen-13834493%201.png?updatedAt=1700382475751",
      price: 300000,
      cat: "Abuja",
      capacity: 300,
      },
    {
      id: 3,
      name: "Morganite Hall",
      productDesc: "The hall typically offers catering facilities or has partnerships with top-tier catering services to ensure a delectable dining experience for guests",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-denys-gromov-4717550%201.png?updatedAt=1700383251598",
      price: 400000,
      cat: "Abuja",
      capacity: 600,
    },
    {
      id: 4,
      name: "Golden Hall",
      productDesc: "State-of-the-art audio and visual equipment ensures that speeches, music, and video presentations can be flawlessly incorporated into the celebration.",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-antony-trivet-12882627%201.png?updatedAt=1700383453366",
      price: 700000,
      cat: "Lagos",
      capacity: 800,
    },
    {
      id: 5,
      name: "Diamond Hall",
      productDesc: "The venue offers convenient and ample parking facilities to accommodate guests, eliminating any parking-related stress.",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-rene-asmussen-13834493%201.png?updatedAt=1700382475751",
      price: 900000,
      cat: "Lagos",
      capacity: 700,
    },
    {
      id: 6,
      name: "Opal Hall",
      productDesc: "State-of-the-art audio and visual equipment ensures that speeches, music, and video presentations can be flawlessly incorporated into the celebration.",
      img: "https://ik.imagekit.io/b6b9xwu9l/Images/pexels-antony-trivet-12882627%201.png?updatedAt=1700383186481",
      price: 900000,
      cat: "Lagos",
      capacity: 600,
    },
    
  ];
  
  const productsContainer = document.querySelector(".products");
  const searchInput = document.querySelector(".search");
  const categoriesContainer = document.querySelector(".cats");
  const priceRange = document.querySelector(".priceRange");
  const priceValue = document.querySelector(".priceValue");
  const minPriceValue = document.querySelector(".minPriceValue");
  const capacityRange = document.querySelector(".capacityRange");
  const capacityValue = document.querySelector(".priceValue");
  import { Calendar } from '@jpvmrcd/calendar';

  //   to display content section
  const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map((product) => `
    <div class="product">
    <img
            src=${product.img}
            alt=""
            />
            <div class="name-sec">
                <p class="name">${product.name}</p>
                <i id="like" onclick="liked()" class="fa-regular fa-heart"></i>
            </div>
            <span class="description">${product.productDesc}</span>
            <div class="p-sec">
                <span class="price">#${product.price} per hour</span>
                <span class="price">Capacity: ${product.capacity} seats</span>
            </div>
            <a href="/halldetails.html" class="viewbtn">
                <button>View more</button>
            </a>
            <div class="location-sec">
                <div class="location">
                <i class="ri-map-pin-2-line"></i>
                <span class="name">${product.cat}</span>
                </div>
                <div class="star-sec">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                </div>
            </div>    
    </div>
    `
    // use join to not see commas
    ).join("");
  };

  displayProducts(data);

//   LIKE BUTTON FUNCTIONALITY
function liked(){
    var element = document.getElementById("like");
    element.classList.toggle("ri-heart-fill");
  }

    //search bar functionalities, keyup to listen for keyboard interactions, e listening for events
    searchInput.addEventListener('keyup', (e) => {
        // convert input to lowercase
        // console.log(e.target.value); === displays search bar input
        const value = e.target.value.toLowerCase();

        // if value exist, display our product and if product does not exist, display all items 
        if (value){
            displayProducts(data.filter(
                // if the indexOf value is -1 it means it doesn't exist . if its not -1 return those items
                (item) => item.name.toLowerCase().indexOf(value) !== -1)
                );
        }else{
            displayProducts(data);
        }
    });
    //   categories section
    const setCategories = () => {
        const allCats =  data.map((item) => item.cat);
        // use i (indexOf) to avoid repetition
        const categories = [
            // created an array and used spread operator to add ALL in front of the other catedories
            "All",
            ...allCats.filter((item,i) => {
                return allCats.indexOf(item) === i 
            })];
         // console.log(categories);
             // add categories Container
            categoriesContainer.innerHTML = categories.map((cat)=>
            `   <div class="cat-box">
                    <button class="cat">${cat}</button>
                <div/>
            `
            ).join(" ");
            // add event listeners to each category using the parent container
            categoriesContainer.addEventListener("click", (e)=>{
                const selectedCat = e.target.textContent;

                // using ternary operator to create conditions 
                selectedCat === "All" 
                ? displayProducts(data) 
                : displayProducts(data.filter((item) => item.cat === selectedCat));
            });
        };  
        // range section
        const setPrices = () => {
            const priceList = data.map((item) => item.price);
            // console.log(priceList);
            // use math method to pick minimum and maximum
            // Math.min([2,3])=NaN so  Math.min(...[2,3])
            const minPrice = Math.min(...priceList);
            const maxPrice = Math.max(...priceList);

            priceRange.min = minPrice;
            priceRange.max = maxPrice;
            priceRange.value = maxPrice;
            priceValue.textContent = "#" + maxPrice;
            minPriceValue.textContent = "#" + minPrice;

            priceRange.addEventListener("input", (e)=>{
                // to filter price
                priceValue.textContent = "#" + e.target.value;
                minPriceValue.textContent = "#" + e.target.value;
                displayProducts(data.filter((item)=>item.price <= e.target.value))
            })
        };
        setCategories ()
        setPrices()

//     priceRange.addEventListener("input", (e) => {
//       priceValue.textContent = "$" + e.target.value;
//       displayProducts(data.filter((item) => item.price <= e.target.value));
//     });
//   };
  
//   setCategories();
//   setPrices();
// FAQ section
const FAQs = document.querySelectorAll('.FAQ');
FAQs.forEach(FAQ =>{
    FAQ.addEventListener('click', function() {
        FAQ.classList.toggle('showFAQ')
    })
})

// NUMBER SECTION ON THE HOME PAGE
let displayValues = document.querySelectorAll(".num");
    // sets the interval for the counting animation to 4000 milliseconds (4 seconds).
let interval = 4000;

console.log(displayValues);

    // iterates over .num and performs a counting animation for each element.
displayValues.forEach((displayValue) => {
        // This initializes the starting value for the counting animation.
    let startValue = 0;
    let endValue = parseInt(displayValue.getAttribute("data-val"));
    console.log(endValue);
        //  This calculates the duration of each step in the counting animation by dividing the specified interval (4000 milliseconds) by the endValue and rounding down using Math.floor(). This determines how quickly the count increments.
    let duration = Math.floor( interval / endValue );
        // The setInterval function is responsible for animating the counting effect. It increases startValue by 1 in each interval until it reaches endValue, at which point it clears the interval to stop the animation for that specific element.
    let counter = setInterval(function(){
        startValue += 1;
            // This sets up a setInterval timer that increments the startValue, updates the text content of the element with the new value, and clears the interval when startValue reaches endValue.
        displayValue.textContent = startValue;
        if(startValue === endValue){
            clearInterval(counter)
        }
    }, duration);
});

// CALENDAR

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
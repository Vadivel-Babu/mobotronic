const btnSearch = document.querySelector('.search-btn')
const search = document.querySelector('.search-input') 
const slides = document.querySelectorAll('.slide');
const rightbtn = document.querySelector('.right-btn')
const leftbtn = document.querySelector('.left-btn')
const dots = document.querySelectorAll('.slider-indicator-btn')
const dotContainer = document.querySelector('.slider-indicator')
const cartPage = document.querySelector('.cart-icon')
const toolTip = document.querySelector('.tooltips')
const CartItem = document.querySelector('.cart-item')
const pageOne = document.querySelector('.intro-page');
const mobilePage = document.querySelector('.all-mobiles');
const cartContainer =document.querySelector('.cart-item-container')
const btn = document.querySelectorAll('button');
const totalcartnumber = document.querySelectorAll(".cart-para");
const range = document.querySelectorAll('.range-input input')
const progress = document.querySelector('.progress')
const rangeVal = document.querySelectorAll(".max-min input");
const grid = document.querySelector('.grid')
const err = document.querySelector('.overlay')
const errmsg = document.querySelector('.error')
const hoverCart = document.querySelector('.desktop-cart')

//error msg shown
function Errors(){
    document.querySelector('.layer').style.display = "none";
    err.style.transform = "scale(0.001)"
    errmsg.textContent = '';
}
err.children[0].addEventListener('click',Errors)

//range input value and range slider function
range.forEach( i => {
    i.addEventListener("input", (e) => {
        let minVal = parseInt(range[0].value);
        let maxVal = parseInt(range[1].value);
       rangeVal[0].value = minVal    
       rangeVal[1].value = maxVal

        if(maxVal - minVal < 850){
            if(e.target.className === "range-min"){
                range[0].value = maxVal - 850;
            }else{
                range[1].value = minVal + 850;
            }
        }else{
            progress.style.left = (minVal/range[0].max) * 100 + "%"; 
            progress.style.right = 100 - (maxVal/range[1].max) * 97 + "%";
        }  
    })
})
rangeVal.forEach( i => {
    i.addEventListener("input", (e) => {
        let minVal = parseInt(rangeVal[0].value);
        let maxVal = parseInt(rangeVal[1].value);
       rangeVal[0].value = minVal    
       rangeVal[1].value = maxVal

        if((maxVal - minVal >= 800) && maxVal <= 1500){
            if(e.target.className === "min"){
                range[0].value = minVal;
                progress.style.left = (minVal/range[0].max) * 100 + "%"; 
            }else{
                range[1].value = maxVal;
                progress.style.right = 100 - (maxVal/range[1].max) * 98.5 + "%";
            }
        }
    })
})



// show activatedot function
const activeDot = (slide) => {
    dots.forEach((dot) => {
        dot.classList.remove('current-active')
    })
    const activated = document.querySelector(`.slider-indicator-btn[data-slide="${slide}"]`)
    activated.classList.add('current-active')
}

dotContainer.addEventListener('click', (e) => {
   if(e.target.classList.contains('slider-indicator-btn')){
     const slide = e.target.dataset.slide;
     changeSlide(slide)
     activeDot(slide)
   }
})

//function to change slide
const changeSlide = (slide) => {
    slides.forEach((E,I) => {
        E.style.transform = `translateX(${100 * (I - slide)}%)`
    })
}
changeSlide(0)

let currentSlide = 0;
const totalSlide = slides.length;

//next button function
const Nextbtn = () => {
    console.log('click')
    if(currentSlide === totalSlide -1){
        currentSlide = 0
    }else{
        currentSlide++
    }    
    changeSlide(currentSlide)
    activeDot(currentSlide)
}

//previous button function
const Prevbtn = () => {
    if(currentSlide === 0){
        currentSlide = totalSlide -1
    }else{
        currentSlide--
    }  
    changeSlide(currentSlide)
    activeDot(currentSlide)
}
//Eventlistener for buttons
leftbtn.addEventListener('click', Prevbtn)
rightbtn.addEventListener('click', Nextbtn)





let Names = [];
let prices = [];



hoverCart.addEventListener('mouseover', () => {
    toolTip.style.transform = "scale(1)";
    toolTip.style.opacity="1";
    if(toolTip.childElementCount === 2){
        toolTip.children[1].textContent = "No Item in Your Cart";
    }else{
        toolTip.children[1].textContent = "Items in Your Cart";
    }
})
hoverCart.addEventListener('mouseout', () => {
    toolTip.style.transform = "scale(0)";
    toolTip.style.opacity="0";
})


//total product count and total amount
const productCount = document.querySelector('.total-products-span')



//delete item from cart
const Delete = (e, value) => {
    let removeName = e.parentElement.parentElement.children[1].children[1].textContent;
    let tipName = toolTip.children[2].children[1].children[1]; 
   
    const tooltipItems = document.querySelectorAll('.tooltip-products')
     tooltipItems.forEach(e => {
         if(removeName === e.children[1].textContent){
            tipName.parentElement.parentElement.remove();
         }
     })
    
    e.parentElement.parentElement.remove()
    let num = cartContainer.childElementCount - 1;
    totalcartnumber.forEach( e => {
        e.textContent = num;
    })
    productCount.textContent = num;
    
    if(cartContainer.childElementCount === 1){
        cartContainer.children[0].textContent = "No Item"
    }else{
        cartContainer.children[0].textContent = "Shopping Cart"
    }
    
    
    
    for(let i = 0; i < Names.length; i++){
        if(Names[i] == removeName){
            Names.splice(i,1)
            prices.splice(i,1)
        }
    }
    updateCartAmount();
   
}





const totalAmount = document.querySelector('.amount');

const updateCartAmount = () => {
    let sum = 0;
    for(let i = 0; i < prices.length; i++){
       sum = sum + prices[i];
    }
    totalAmount.textContent = `${sum} $`;
}





const add = (e) => {
  let productName = e.parentElement.parentElement.parentElement.children[1].children[1];
  let input = e.parentElement.parentElement.parentElement.children[2].children[0].children[1];
  let amount = e.parentElement.parentElement.parentElement.children[1].children[2].textContent.split(' ')[0];
  let data = e.dataset.price.split(' ')[0];
  let newTotalAmount = totalAmount.textContent.split(' ')[0];
  let inputValue = input.value;
  let newValue = parseInt(inputValue) + 1;
  input.value = newValue
  let updatedAmount = parseInt(data) * newValue;
  
   e.parentElement.parentElement.parentElement.children[1].children[2].textContent = ` ${updatedAmount} $`;
   
 
  for(let i =0; i < prices.length; i++){
      if(Names[i] === productName.textContent){
        prices[i] = (updatedAmount)
      }
  }
 
  updateCartAmount();
 
    
}

const sub = (e) => {
    let productName = e.parentElement.parentElement.parentElement.children[1].children[1];
    let input = e.parentElement.parentElement.parentElement.children[2].children[0].children[1];
    let amount = e.parentElement.parentElement.parentElement.children[1].children[2].textContent.split(' ')[0];
    let data = e.dataset.price.split(' ')[0];
    let newTotalAmount = totalAmount.textContent.split(' ')[0];
    let inputValue = input.value;
    if(input.value === 1){
        e.style.opacity = '0.3';
        input.value = 1;
        return
    }else if(input.value > 1){
      e.style.opacity = '1';
      let newValue = parseInt(inputValue) - 1;
      input.value = newValue
      let updatedAmount = parseInt(data) * newValue;
      
      e.parentElement.parentElement.parentElement.children[1].children[2].textContent = ` ${updatedAmount} $`;
      
    
      for(let i =0; i < prices.length; i++){
        if(Names[i] === productName.textContent){
          prices[i] = (updatedAmount)
        }
    }
    
     updateCartAmount();
    }
     
    
}


//add item to cart

const addCart = (e) => {
    let name = e.parentElement.children[3].textContent;
    let image = e.parentElement.children[0].getAttribute('src');
    let price = e.parentElement.children[4].textContent.split(" ")[0];
    
      
    
    for(let i =0; i < Names.length; i++){
        if(Names[i] == name){
            document.querySelector('.layer').style.display = "block";
            err.style.display = "flex";
            err.style.transform = "scale(1)"
            errmsg.textContent = 'Already in the cart';
            return
        }
    }
    
    Names.push(name)
    prices.push(parseInt(price))
    totalcartnumber.forEach( e => {
        e.textContent = cartContainer.childElementCount;
    })
    productCount.textContent = cartContainer.childElementCount;
   
    let html = `<div class="cartItem">
    <img src="${image}" alt="">
    <div class="products">
      <p class="mobile">Mobile Phones</p>
      <p class="mobile-name">${name}</p>
      <h4 >${price} $</h4>
    </div>
    <div class="btn">
      <div class="btn-quantity">
        <button class="negative" onclick="sub(this)" data-price="${price}">&#x2212;</button>
        <input class="quantity" type="number" name="" id="" value="1">
        <button class="add" onclick="add(this)" data-price="${price}">&#x2b;</button>
      </div>
      <button class="delete" onclick="Delete(this)">&#xd7;</button>
    </div>
  </div> `

  let tip = `<div class="tooltip">
  <img src="${image}" alt="">
  <div class="tooltip-products">
    <p>mobile Phones</p>
    <p>${name}</p>
  </div>
  <h4>${price} $</h4>
</div> `
  toolTip.insertAdjacentHTML("beforeend", tip)
  cartContainer.insertAdjacentHTML("beforeend", html)
  
  updateCartAmount();
  
}

//Pagenavigation

document.querySelector('body').addEventListener('click', (e) => {
        if(e.target.classList.contains('view-mobile') || e.target.classList.contains('search-btn')){
            pageOne.style.display ="none";
            CartItem.style.display='none';
            mobilePage.style.display = "flex"
        }else if(e.target.classList.contains('home') || e.target.classList.contains('brand-names')){
            pageOne.style.display ="block";
            CartItem.style.display='none';
            mobilePage.style.display = "none"
        }else if(e.target.classList.contains('cart-icon') || e.target.classList.contains('cart-svg')){
            pageOne.style.display ="none";
            CartItem.style.display='flex';
            mobilePage.style.display = "none";
            if(cartContainer.childElementCount === 1){
                cartContainer.children[0].textContent = "No Item"
            }else{
                cartContainer.children[0].textContent = "Shopping Cart"
            }
        }
    })

// fetch  mobile api

function phones(phone){
    fetch(` http://api-mobilespecs.azharimm.site/v2/search?query= ${phone}`)
    .then((response) => response.json())
    .then((data) => {
        let len = data.data.phones.length
        let ren = data.data.phones
        
        let count = grid.childElementCount
        if (count !== 0){
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
              }
        }else{
            console.log('item available')
        }
        ren.forEach(element => {
            let price = Math.floor((Math.random() * 1200) + 1);
            price = price < 800 ? 599 : price;
            let html = `<div class="products ">
            <img src="${element.image}" class="skeleton" alt="" />
            <p>Mobile Phones</p>
            <h4>${element.brand}</h4>
            <h4 class="phone-name">${element.phone_name}</h4>
            <h3 class="offer not">${price} $</h3>
            <button class="add-cart" onclick="addCart(this)">Add to cart</button>
          </div>`
            
          grid.insertAdjacentHTML("afterbegin", html)
        
       
        });
    }).catch(errs => {
        document.querySelector('.layer').style.display = "block";
        err.style.display = "flex";
        err.style.transform = "scale(1)"
        errmsg.textContent = errs.message;
    })
}


//selected brand
const selectBrand = document.querySelectorAll('.brand-name')

selectBrand.forEach( brand => {  
    brand.addEventListener('click',(e) => {
      selectBrand.forEach( a => a.classList.remove('active'))          
      e.target.classList.add('active')
      phones(e.target.textContent)
    })
})
   

//search button function 
btnSearch.addEventListener('click', (e) => {
    if(search.value.length > 0){
        phones(search.value);
        pageOne.style.display ="none";
        CartItem.style.display='none';
        mobilePage.style.display = "flex";
    }
    search.value = " ";
   
})

document.querySelector(".order").addEventListener('click', () => {
     
    if(productCount.textContent > 0){
        document.querySelector('.layer').style.display = "block";
        err.style.display = "flex";
        err.style.backgroundColor = "green"
        err.style.color = "white"
        err.style.transform = "scale(1)"
        errmsg.textContent = 'Your order Placed';
        let Cartchild = document.querySelectorAll('.cartItem')
        let toolchild = document.querySelectorAll('.tooltip')
        Cartchild.forEach(e => {
            e.remove()
        })
        toolchild.forEach(e => {
            e.remove()
        })
        totalcartnumber.forEach( e => {
            e.textContent = 0;
        })
        productCount.textContent = 0;
        cartContainer.children[0].textContent = "No Item"
       
        while(prices.length > 0){
            prices.pop();
            Names.pop();
        }
        updateCartAmount();
        pageOne.style.display ="block";
        CartItem.style.display='none';
        mobilePage.style.display = "none"
        
    }else{
        document.querySelector('.layer').style.display = "block";
        err.style.display = "flex";
        err.style.transform = "scale(1)"
        errmsg.textContent = 'No item in the cart';
    }       
    
})

const serv = document.querySelector('.service');
const ints = serv.getBoundingClientRect()
const head = document.querySelector('header')


window.addEventListener('scroll', () => {
   if(window.scrollY > ints.top){
      head.classList.add('sticky')
   }else{
       head.classList.remove('sticky')
   }
})

const email = document.querySelector('#input')
document.querySelector('.signup-btn')
.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(email.value.length)
    if(email.value.length === 0 || !email.value.includes('@') || !email.value.includes('.')){
        document.querySelector('.layer').style.display = "block";
        err.style.display = "flex";
        err.style.transform = "scale(1)"
        errmsg.textContent = 'Enter valid mail';
    }else{
        email.value = " ";
    }

})
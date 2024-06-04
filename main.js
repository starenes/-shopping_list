//* Düzenleme Seçenekleri
//* düzenleme modunda olup olmadığını belirtir
let editFlag = false; //! aşagıda fonksiyonlarda if yapısıyla inceleceğiz
let editElement; //! düzenleme yapılan öğeyi temsil eder
let editID = ""; //*Düzenleme yapılan ögenin benzersiz kimliği

// !değişkene aktarıp html elementini seçtik
// .querySelectorAll :Bu yöntem, belgenizdeki öğeleri seçme ve onlarla etkileşim kurma işlemlerinde oldukça esnek ve güçlüdür.
// ! olay izleyicisi ekleyip içindeki bilgileri alacağız
// grocery ıdsini çagır degişkene aktar
//? hergönderme olayında safya yenilenmesi engellememiz gerekiyor.(preventDefault)
// ? forma gönderme olayı nasıl eklenir ?(eventListener)
// *Gerekl HTML elementlerini seçme
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");


// ! Fonksiyonlar

const displayAlert = (text, action) => {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};
const setBackToDefault = () => {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Ekle";
};

// ! alert.textContent = ""; içini boş bıraktık veri girdikten sonra yok olacak
const addItem = (e) => {
  e.preventDefault();
  // console.log("gönderildi");
  // okuması şöyle input olan grocery içindeki value yu alacagız ve const değişkenine aktarcaz
  // sayıyı stringe çevirmek için .toString
  const value = grocery.value;
  const id = new Date().getTime().toString();
  console.log(id);
  //? önemli biz anasayfada ekleme yaparken yen bir article ekliyoruz bu dinamik hala burada getircez
  //* input boş degilse ve düzenleme modunda deilse
  //? createElement ile oluşturduk //? yaptık ve konsolda yeni bir article geldi
  //? else if düzenleme modundaysa
  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    // console.log(element);
    let attr = document.createAttribute("data-id");
    attr.value = id;
    //burada benzersiz id oluştu.
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    console.log(element);
    element.innerHTML = `
       <p class="title"> ${value} </p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fa-solid fa-user-pen"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash-can-arrow-up"></i>
                  </button>
          </div>
          `;
    //! bu butonlara olay izleyicileri ekleyebilmemiz için seçtik
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    //   console.log(deleteBtn);
    //   console.log(editBtn);
    // ! şimdi tıklanma ekleyeceğiz

    list.appendChild(element);
    displayAlert("Başarıyla Eklenildi", "success");
    //*Varsayılan değerlere döndürecek fonksiyon
    setBackToDefault();
    addToLocalStorage(id, value);
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value; //* GÜNCELLEYECEĞİMİZ elemanın içeriğini değiştirdik
    displayAlert("Başarıyla Değiştirildi", "success");
    editlocalStore(editID, value);
    setBackToDefault();
  }
};
//   buraya danger yazarsak rengi tanımladığımız gibi olur
//! SİLME BUTONUNA TIKLANILDIĞINDA ÇALIŞIR
const deleteItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  const id = element.dataset.id;
  console.log(element);
  list.removeChild(element); //* ekledğimiz ürünün list alanı içinden kaldırdık
  displayAlert("Başarıyla kaldırıldı", "danger"); //* ekranda ürün silindiğinde bildirim gelir
  removeFromLocalStorage(id);
};
// ? ekleme butonunda ekrana istediğimiz ürünü tıklayarak getiriyoruz
const editItem = (e) => {
  const element = e.target.parentElement.parentElement.parentElement;
  editElement = e.target.parentElement.parentElement.previousElementSibling; //*düzenleme yaptığımız etiketi seçtik
  grocery.value = editElement.innerText; //* düzenlediğimiz etiketin içeriğini inputa aktardık
  editFlag = true;
  editID = element.dataset.id; //* düzenlenen öğenin kimliğini gönderdik
  submitBtn.textContent = "Düzenle"; //* butonuna tıklanıldığında ekle butonu düzenle olarak değişsin.
};
const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  console.log(items);
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }
  displayAlert("Liste Boş", "danger");
  localStorage.removeItem("list");
};
// Yerel depoya öğe ekleme işlemi
const addToLocalStorage = (id, value) => {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  console.log(items);
  localStorage.setItem("list", JSON.stringify(items));
};
// Yerel depodan öğeleri alma işlemi
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
/*
şimdi createAttribute data özelliği ekleme
ardından benzersiz bir ID oluşturcaz(ileride kütüphanelerden alıcaz)
-setAttributeNode element içine data ıd yi göndercez 
-classList.add class ekleme işlemi 
-innerHTML. ile title kısmını aldık js te grocery-list içine yolayacağız
fonksiyonda bulunan elementi list te tanımlamak için appendChild kullanacaz
inner içinde bulunan item yerine ${value}
tanımladığımız alert kısmına text i degiştirme alert.textcontent ile
başarılı bir şekilde eklenildi yazısının belli bir süre sonra silinmesi 

*/

//! dışarıdan silme işlemi;
//? map ve foreach arasındaki fark : map dizi döndürüyor foreach her bir elemanı döndürür.
const editLocalStore = (id, value) => {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  console.log(items);
  localStorage.setItem("list", JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("list", JSON.stringify(items));
};
// Gönderilen id ve value(değer) sahip bir öğe oluşturan fonksiyon
const createListItem = (id, value) => {
const element = document.createElement("article");
// console.log(element);
let attr = document.createAttribute("data-id");
attr.value = id;
//burada benzersiz id oluştu.
element.setAttributeNode(attr);
element.classList.add("grocery-item");
console.log(element);
element.innerHTML = `
   <p class="title"> ${value} </p>
      <div class="btn-container">
        <button type="button" class="edit-btn">
          <i class="fa-solid fa-user-pen"></i>
        </button>
        <button type="button" class="delete-btn">
            <i class="fa-solid fa-trash-can-arrow-up"></i>
              </button>
      </div>
      `;
//! bu butonlara olay izleyicileri ekleyebilmemiz için seçtik
const deleteBtn = element.querySelector(".delete-btn");
deleteBtn.addEventListener("click", deleteItem);
const editBtn = element.querySelector(".edit-btn");
editBtn.addEventListener("click", editItem);
//   console.log(deleteBtn);
//   console.log(editBtn);
// ! şimdi tıklanma ekleyeceğiz

list.appendChild(element); 
};

const setupItems = () => {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
  }
};

// ! olay izleyicileri
form.addEventListener("submit", addItem);
//formu gönderdiğimizde addItem fonkisyonu çalışcak
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

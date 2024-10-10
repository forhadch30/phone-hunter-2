const loadAllPhones = async (status, searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`);
    const data = await res.json();
    console.log(data);
    if (status) {
        displayAllPhones(data.data);
    }
    else {
        displayAllPhones(data.data.slice(0, 6));
    }
}

const displayAllPhones = (phones) => {
    const dynamic = document.getElementById('dynamicPhones')
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card border">
  <figure class="px-5 py-5">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${phone_name}</p>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
  `
        dynamic.append(div)
    });

}

const handleShowAll = () => {
    loadAllPhones(true)
}

const spinner = document.getElementById('spinner')
const handleSearch = () => {

    const searchText = document.getElementById('search-box').value = ""
    spinner.classList.remove('hidden')

    setTimeout(() => {
        spinner.classList.add('hidden')
        loadAllPhones(false, searchText)
    }, 3000);
}

const phoneDetails = async (slugs) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await res.json();
    console.log(data.data);


    const { brand, image, slug } = data.data;
    const div = document.getElementById('my-Modal')
    div.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box text-center space-y-2">
                    <img class="mx-auto" src=${image} alt="">
                    <h3 class="text-lg  rounded-full py-2 duration-1000 hover:scale-90 hover:bg-teal-800 hover:text-white font-bold border">${brand}</h3>
                    <p class="border rounded-full py-2 duration-1000 hover:scale-90 hover:bg-teal-800 hover:text-white">${slug}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn w-full duration-700 hover:scale-90  bg-teal-800 text-white hover:text-black">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
    `

    my_modal_5.showModal()
}

loadAllPhones(false, "iphone")
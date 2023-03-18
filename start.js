// show category
const loadAllCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  try {
    const res = await fetch(url)
    const data = await res.json()
    displayAllCategory(data.data.news_category)
  } catch (error) {
    console.log(error)
  }
}
const displayAllCategory = (categories) => {
  const categoryContainer = document.getElementById('all-category')
  categories.forEach((category) => {
    const li = document.createElement('li')
    li.innerHTML = `
    <button onclick="loadCategoryId('${category.category_id}')" id="menu" >${category.category_name} </button>
    `
    categoryContainer.appendChild(li)
  })
}
const loadCategoryId = async (catId) => {
  loadNews(catId)
  spinner(true)
}
loadAllCategories()

// load news
const loadNews = async (catId) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${catId}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data)
  } catch (error) {
    console.log(error)
  }
}
const displayNews = (news) => {
  // show news number
  const numberOfNews = news.length
  const newsNumber = document.getElementById('news-number')
  newsNumber.innerText = numberOfNews

  const newsContainer = document.getElementById('news-container')
  newsContainer.innerHTML = ' '
  news.forEach((news) => {
    const newsDIv = document.createElement('div')
    newsDIv.innerHTML = `
        <div class="card card-side bg-stone-300 shadow-xl mt-5">
                <figure>
                <img src="${news.thumbnail_url}" alt="Movie">
                </figure>
                <div class="card-body">
                  <h2 class="-mt-5 text-black text-sm font-bold">${news.title}</h2>
                  <p class=" mt-5 h-16 w-96 text-gray-600 text-sm" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${news.details}</p>
                  <div class="flex justify-between">
                    <div class="flex ">
                        <label class="pt-1">
                            <div class="w-10">
                                <img class="rounded-full" src=${news.author.img} />
                            </div>
                        </label>
                        <div class="ml-2 text-gray-600">
                            <p>${news.author.name}</p>
                            <p class="text-xs">${news.author.published_date}</p>
                        </div>
                    </div>
                    <div class="flex pt-2">
                        <div class="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                        </div>
                          <p class="ml-2 text-gray-600">${news.total_view}</p>
                    </div>
                    <div class="pt-2 text-gray-600">
                        <p>Rating: ${news.rating.number}</p>
                    </div>
                    <div class="card-actions justify-end">
                      <label onclick="loadDetail('${news._id}')" for="news-detail-modal" id="btn-detail" class="btn btn-primary" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
        `
    newsContainer.appendChild(newsDIv)
  })
  spinner(false)
}

// loading spinner
const spinner = (isLoading) => {
  const loderSection = document.getElementById('loader')
  if (isLoading) {
    loderSection.classList.remove('invisible')
  } else {
    loderSection.classList.add('invisible')
  }
}

// load news detail
const loadDetail = async (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    displayNewsDetail(data.data)
  } catch (error) {
    consosle.log(error)
  }
}

const displayNewsDetail = (news) => {
  console.log(news[0])
  const modalTitle = document.getElementById('modal-title')
  modalTitle.innerHTML = news[0].title

  const publishedDate = document.getElementById('published-date')
  publishedDate.innerHTML = `
<p>Published date: ${news[0].author.published_date}</p>
`
  const newsDetail = document.getElementById('news-detail')
  console.log(news[0].author.details)
  newsDetail.innerHTML = `
<p>Details: ${news[0].details}</p>
`
}
// loadNews();
